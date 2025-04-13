(()=>{var y=(s,n)=>()=>(n||s((n={exports:{}}).exports,n),n.exports);var p=y(h=>{window.throttle=(s,n)=>{let l,i;return(...a)=>{let e=h;!i||Date.now()-i>=n?(s.apply(e,a),i=Date.now()):(clearTimeout(l),l=setTimeout(()=>{s.apply(e,a),i=Date.now()},n-(Date.now()-i)))}};(function(){[Element,Document,Window].forEach(e=>{e.prototype._addEventListener=e.prototype.addEventListener,e.prototype._removeEventListener=e.prototype.removeEventListener,e.prototype.addEventListener=e.prototype.on=function(r,t,o){this.__listeners__=this.__listeners__||{},this.__listeners__[r]=this.__listeners__[r]||[];for(let[m,d]of this.__listeners__[r])if(m===t&&JSON.stringify(d)===JSON.stringify(o))return this;return this.__listeners__[r].push([t,o]),this._addEventListener(r,t,o),this},e.prototype.removeEventListener=e.prototype.off=function(r,t,o){return!this.__listeners__||!this.__listeners__[r]?this:t?(this._removeEventListener(r,t,o),this.__listeners__[r]=this.__listeners__[r].filter(([m,d])=>m!==t||JSON.stringify(d)!==JSON.stringify(o)),this.__listeners__[r].length===0&&delete this.__listeners__[r],this):(this.__listeners__[r].forEach(([m,d])=>{this.removeEventListener(r,m,d)}),delete this.__listeners__[r],this)}}),window._$=e=>document.querySelector(e),window._$$=e=>document.querySelectorAll(e);let s=document.createElement("a");s.className="nav-icon dark-mode-btn",_$("#sub-nav").append(s);let n=window.matchMedia("(prefers-color-scheme: dark)").matches;function l(e){let t=e==="true"||e==="auto"&&n;document.documentElement.setAttribute("data-theme",t?"dark":null),localStorage.setItem("dark_mode",e),s.id=`nav-${e==="true"?"moon":e==="false"?"sun":"circle-half-stroke"}-btn`,document.body.dispatchEvent(new CustomEvent(`${t?"dark":"light"}-theme-set`))}let i=localStorage.getItem("dark_mode")||document.documentElement.getAttribute("data-theme-mode")||"auto";l(i),s.addEventListener("click",throttle(()=>{let e=["auto","false","true"],r=e[(e.indexOf(localStorage.getItem("dark_mode"))+1)%3];l(r)},1e3));let a=0;if(document.addEventListener("scroll",()=>{let e=document.documentElement.scrollTop||document.body.scrollTop,r=e-a;window.diffY=r,a=e,r<0?_$("#header-nav")?.classList.remove("header-nav-hidden"):_$("#header-nav")?.classList.add("header-nav-hidden")}),window.Pace&&Pace.on("done",()=>{Pace.sources[0].elements=[]}),window.materialTheme){let e=new materialTheme.ColorThemeExtractor({needTransition:!1});async function r(t){let o=await e.generateThemeSchemeFromImage(t);if(document.documentElement.style.setProperty("--md-sys-color-primary-light",e.hexFromArgb(o.schemes.light.props.primary)),document.documentElement.style.setProperty("--md-sys-color-primary-dark",e.hexFromArgb(o.schemes.dark.props.primary)),_$("#reimu-generated-theme-style"))return;let d=`
    :root {
      --red-0: var(--md-sys-color-primary-light);
      --red-1: color-mix(in srgb, var(--md-sys-color-primary-light) 90%, white);
      --red-2: color-mix(in srgb, var(--md-sys-color-primary-light) 75%, white);
      --red-3: color-mix(in srgb, var(--md-sys-color-primary-light) 55%, white);
      --red-4: color-mix(in srgb, var(--md-sys-color-primary-light) 40%, white);
      --red-5: color-mix(in srgb, var(--md-sys-color-primary-light) 15%, white);
      --red-5-5: color-mix(in srgb, var(--md-sys-color-primary-light) 10%, white);
      --red-6: color-mix(in srgb, var(--md-sys-color-primary-light) 5%, white);
    
      --color-border: var(--red-3);
      --color-link: var(--red-1);
      --color-meta-shadow: var(--red-6);
      --color-h2-after: var(--red-1);
      --color-red-6-shadow: var(--red-2);
      --color-red-3-shadow: var(--red-3);
    }
    
    [data-theme="dark"]:root {
      --red-0: var(--red-1);
      --red-1: color-mix(in srgb, var(--md-sys-color-primary-dark) 90%, white);
      --red-2: color-mix(in srgb, var(--md-sys-color-primary-dark) 80%, white);
      --red-3: color-mix(in srgb, var(--md-sys-color-primary-dark) 75%, white);
      --red-4: color-mix(in srgb, var(--md-sys-color-primary-dark) 30%, transparent);
      --red-5: color-mix(in srgb, var(--md-sys-color-primary-dark) 20%, transparent);
      --red-5-5: color-mix(in srgb, var(--md-sys-color-primary-dark) 10%, transparent);
      --red-6: color-mix(in srgb, var(--md-sys-color-primary-dark) 5%, transparent);
      
      --color-border: var(--red-5);
    }
    `,c=document.createElement("style");c.id="reimu-generated-theme-style",c.textContent=d,document.body.appendChild(c)}window.generateSchemeHandler=()=>{if(window.bannerElement?.src)window.bannerElement.complete?r(bannerElement):window.bannerElement.addEventListener("load",()=>{r(bannerElement)},{once:!0});else if(window.bannerElement?.style.background){let t=window.bannerElement.style.background.match(/\d+/g),o=e.generateThemeScheme({r:parseInt(t[0]),g:parseInt(t[1]),b:parseInt(t[2])});document.documentElement.style.setProperty("--md-sys-color-primary-light",e.hexFromArgb(o.schemes.light.props.primary)),document.documentElement.style.setProperty("--md-sys-color-primary-dark",e.hexFromArgb(o.schemes.dark.props.primary))}}}})();window.safeImport=async(s,n)=>{if(!n)return import(s);let i=await(await fetch(s)).text(),a=await crypto.subtle.digest("SHA-384",new TextEncoder().encode(i));if("sha384-"+btoa(String.fromCharCode(...new Uint8Array(a)))!==n)throw new Error(`Integrity check failed for ${s}`);let r=new Blob([i],{type:"application/javascript"}),t=URL.createObjectURL(r),o=await import(t);return URL.revokeObjectURL(t),o}});p();})();
