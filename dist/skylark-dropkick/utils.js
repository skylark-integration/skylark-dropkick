/**
 * skylark-dropkick - A version of dropkick that ported to running on skylarkjs ui.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-dropkick/
 * @license MIT
 */
define([],function(){const e=-1!==navigator.appVersion.indexOf("MSIE");return{hasClass(e,t){let s=new RegExp("(^|\\s+)"+t+"(\\s+|$)");return e&&s.test(e.className)},addClass(e,t){e&&!this.hasClass(e,t)&&(e.className+=" "+t)},removeClass(e,t){let s=new RegExp("(^|\\s+)"+t+"(\\s+|$)");e&&(e.className=e.className.replace(s," "))},toggleClass(e,t){this[(this.hasClass(e,t)?"remove":"add")+"Class"](e,t)},extend(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t)for(let s in t)e[s]=t[s]}),e},offset(t){let s=t.getBoundingClientRect()||{top:0,left:0},n=document.documentElement,o=e?n.scrollTop:window.pageYOffset,r=e?n.scrollLeft:window.pageXOffset;return{top:s.top+o-n.clientTop,left:s.left+r-n.clientLeft}},position(e,t){let s={top:0,left:0};for(;e&&e!==t;)s.top+=e.offsetTop,s.left+=e.offsetLeft,e=e.parentNode;return s},closest(e,t){for(;e;){if(e===t)return e;e=e.parentNode}return!1},create(e,t){let s,n=document.createElement(e);for(s in t||(t={}),t)t.hasOwnProperty(s)&&("innerHTML"===s?n.innerHTML=t[s]:n.setAttribute(s,t[s]));return n},deferred:e=>(function(){window.setTimeout(()=>{e.apply(this,arguments)},1)})}});
//# sourceMappingURL=sourcemaps/utils.js.map
