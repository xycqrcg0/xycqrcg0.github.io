---
title: "关于go-redis"
description: "go-redis"
keywords: "go,redis"

date: 2025-04-24T12:36:52+08:00
lastmod: 2025-04-24T12:36:52+08:00

math: false
mermaid: false

tags:
  - go
  - redis
---
# 关于 TxPipelined
## redis里的事务？
首先，和sql（如mysql）不同，redis的事务不支持回滚操作，就只是一次性，顺序性执行一个队列中存放的一系列命令。  
- 相关命令：  
```
MULTI    :开启事务
EXEC     :提交事务
DISCARD  :取消事务
WATCH    :监听一个（多个）键，如果事务执行前监听的键被修改，则事务取消
UNWATCH  :取消监听
```
redis的原子性：**事务里的命令，要么全部执行，要么全部不执行。(不是全部成功,,,)**  
~~（不行，不能回滚保证全部成功的原子性好抽象QAQ ,但毕竟redis主打一个快嘛）~~  
如果一组命令里有语法错误，redis会放弃事务里所有任务，其他很少情况下整个事务会被丢弃。  

## Pipeline / Pipelined / TxPipelined

管道会把一系列命令打包起来一起发送，能减少网络往返次数，提高性能。管道里的命令会顺序执行。  

- Pipeline : 会返回一个pipeliner，手动添加命令，手动pipe.Exec()并处理返回的错误  
```go
pipe := rdb.Pipeline()
pipe.Set("key","value",time.Second*5)
if _,err := pipe.Exec() ; err != nil {
	//错误处理
}
```
- Pipelined：把pipeline封装了一下，不用手动提交Exec()   
```go
_,err := rdb.Pipelined(func(pipe redis.Pipeliner) error {  
    pipe.Set("key","value",time.Second*5)  
    return nil  
})  
if err != nil {  
    //错误处理  
}
```
- TxPipelined：加了事务的管道，也能保证这一组命令不被其他客户端打断；可以使用WATCH监听键  
```go
_,err := rdb.TxPipelined(func(pipe redis.Pipeliner) error {  
    pipe.Set("key","value",time.Second*5)  
    return nil  
})  
if err != nil {  
    //错误处理  
}
```

## 分析
看看这个代码：  
```go
lll := "默认"  
_,err := rdb.TxPipelined(func(pipe redis.Pipeliner) error {  
    pipe.Set("key","value",time.Second*5)  
    pipe.Incr("k")  
    _,lll = pipe.Get("k").Result()  
    return nil  
})  
if err != nil {  
    //错误处理  
}  
fmt.Println(lll)
```
输出的`lll`会是什么呢?  
首先，如果Incr()一个不存在的键，会自动生成一个对应的，ttl为-1(不过期)的键值对再执行自增操作。  
所以？嘿嘿不是1，而是“” 空字符串。  
在事务/管道里使用Result()是没有意义的，在事务里，命令都还没有真正执行，都只是先被塞到队列里，但是Result()总得返回点东西吧，就返回的默认的""并把"默认"覆盖了。要真想要这个值，要么把这个命令从事务里拿出来，要么接收一下TxPipelined返回的cmd，从里面读取（这里面放的是各个命令返回的结果）。  
所以所以，**不要在事务里用Result()** ~~~  

