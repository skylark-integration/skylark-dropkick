/**
 * skylark-dropkick - A version of dropkick that ported to running on skylarkjs ui.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-dropkick/
 * @license MIT
 */
!function(e,t){var s=t.define,require=t.require,i="function"==typeof s&&s.amd,a=!i&&"undefined"!=typeof exports;if(!i&&!s){var l={};s=t.define=function(e,t,s){"function"==typeof s?(l[e]={factory:s,deps:t.map(function(t){return function(e,t){if("."!==e[0])return e;var s=t.split("/"),i=e.split("/");s.pop();for(var a=0;a<i.length;a++)"."!=i[a]&&(".."==i[a]?s.pop():s.push(i[a]));return s.join("/")}(t,e)}),resolved:!1,exports:null},require(e)):l[e]={factory:null,resolved:!0,exports:s}},require=t.require=function(e){if(!l.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var module=l[e];if(!module.resolved){var s=[];module.deps.forEach(function(e){s.push(require(e))}),module.exports=module.factory.apply(t,s)||null,module.resolved=!0}return module.exports}}if(!s)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,require){e("skylark-dropkick/utils",[],function(){const e=-1!==navigator.appVersion.indexOf("MSIE"),t={hasClass(e,t){let s=new RegExp("(^|\\s+)"+t+"(\\s+|$)");return e&&s.test(e.className)},addClass(e,t){e&&!this.hasClass(e,t)&&(e.className+=" "+t)},removeClass(e,t){let s=new RegExp("(^|\\s+)"+t+"(\\s+|$)");e&&(e.className=e.className.replace(s," "))},toggleClass(e,t){let s=this.hasClass(e,t)?"remove":"add";this[s+"Class"](e,t)},extend(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t)for(let s in t)e[s]=t[s]}),e},offset(t){let s=t.getBoundingClientRect()||{top:0,left:0},i=document.documentElement,a=e?i.scrollTop:window.pageYOffset,l=e?i.scrollLeft:window.pageXOffset;return{top:s.top+a-i.clientTop,left:s.left+l-i.clientLeft}},position(e,t){let s={top:0,left:0};for(;e&&e!==t;)s.top+=e.offsetTop,s.left+=e.offsetLeft,e=e.parentNode;return s},closest(e,t){for(;e;){if(e===t)return e;e=e.parentNode}return!1},create(e,t){let s,i=document.createElement(e);for(s in t||(t={}),t)t.hasOwnProperty(s)&&("innerHTML"===s?i.innerHTML=t[s]:i.setAttribute(s,t[s]));return i},deferred:e=>(function(){window.setTimeout(()=>{e.apply(this,arguments)},1)})};return t}),e("skylark-dropkick/defaults",[],function(){const e={initialize(){},mobile:!0,change(){},open(){},close(){},search:"strict",bubble:!0};return e}),e("skylark-dropkick/Dropkick",["skylark-langx/skylark","skylark-jquery","./utils","./defaults"],function(e,t,s,i){const a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),l=window.parent!==window.self;let o;class n{constructor(e,t){let i,a;this.sel=e;let l=window.Dropkick;for("string"==typeof this.sel&&"#"===this.sel[0]&&(this.sel=document.getElementById(e.substr(1))),i=0;i<l.uid;i++)if((a=l.cache[i])instanceof n&&a.data.select===this.sel)return s.extend(a.data.settings,t),a;if(!this.sel)throw"You must pass a select to DropKick";if(this.sel.length<1)throw`You must have options inside your <select>: ${e}`;if("SELECT"===this.sel.nodeName)return this.init(this.sel,t)}init(e,t){let d=window.Dropkick;var r,h=n.build(e,"dk"+d.uid);if(this.data={},this.data.select=e,this.data.elem=h.elem,this.data.settings=s.extend({},i,t),this.disabled=e.disabled,this.form=e.form,this.length=e.length,this.multiple=e.multiple,this.options=h.options.slice(0),this.selectedIndex=e.selectedIndex,this.selectedOptions=h.selected.slice(0),this.value=e.value,this.data.cacheID=d.uid,d.cache[this.data.cacheID]=this,this.data.settings.initialize.call(this),d.uid+=1,this._changeListener||(e.addEventListener("change",this),this._changeListener=!0),!a||this.data.settings.mobile){if(e.parentNode.insertBefore(this.data.elem,e),e.setAttribute("data-dkCacheId",this.data.cacheID),this.data.elem.addEventListener("click",this),this.data.elem.addEventListener("keydown",this),this.data.elem.addEventListener("keypress",this),this.form&&this.form.addEventListener("reset",this),!this.multiple)for(r=0;r<this.options.length;r++)this.options[r].addEventListener("mouseover",this);o||(document.addEventListener("click",n.onDocClick),l&&parent.document.addEventListener("click",n.onDocClick),o=!0)}return this}add(e,t){var i,a,l;"string"==typeof e&&(i=e,(e=document.createElement("option")).text=i),"OPTION"===e.nodeName&&(a=s.create("li",{class:"dk-option","data-value":e.value,text:e.text,innerHTML:e.innerHTML,role:"option","aria-selected":"false",id:"dk"+this.data.cacheID+"-"+(e.id||e.value.replace(" ","-"))}),s.addClass(a,e.className),this.length+=1,e.disabled&&(s.addClass(a,"dk-option-disabled"),a.setAttribute("aria-disabled","true")),e.hidden&&(s.addClass(a,"dk-option-hidden"),a.setAttribute("aria-hidden","true")),this.data.select.add(e,t),"number"==typeof t&&(t=this.item(t)),(l=this.options.indexOf(t))>-1?(t.parentNode.insertBefore(a,t),this.options.splice(l,0,a)):(this.data.elem.lastChild.appendChild(a),this.options.push(a)),a.addEventListener("mouseover",this),e.selected&&this.select(l))}item(e){return e=e<0?this.options.length+e:e,this.options[e]||null}remove(e){let t=this.item(e);t.parentNode.removeChild(t),this.options.splice(e,1),this.data.select.remove(e),this.select(this.data.select.selectedIndex),this.length-=1}close(){var e,t=this.data.elem;if(!this.isOpen||this.multiple)return!1;for(e=0;e<this.options.length;e++)s.removeClass(this.options[e],"dk-option-highlight");t.lastChild.setAttribute("aria-expanded","false"),s.removeClass(t.lastChild,"dk-select-options-highlight"),s.removeClass(t,"dk-select-open-(up|down)"),this.isOpen=!1,this.data.settings.close.call(this)}open(){let e,t,i,a,l,o,n=this.data.elem,d=n.lastChild,r=void 0!==window.pageXOffset,h="CSS1Compat"===(document.compatMode||""),c=r?window.pageYOffset:h?document.documentElement.scrollTop:document.body.scrollTop;if(l=s.offset(n).top-c,o=window.innerHeight-(l+n.offsetHeight),this.isOpen||this.multiple)return!1;d.style.display="block",e=d.offsetHeight,d.style.display="",a=(t=l>e)&&!(i=o>e)?"-up":"-down",this.isOpen=!0,s.addClass(n,"dk-select-open"+a),d.setAttribute("aria-expanded","true"),this._scrollTo(this.options.length-1),this._scrollTo(this.selectedIndex),this.data.settings.open.call(this)}disable(e,t){var i="dk-option-disabled";0!==arguments.length&&"boolean"!=typeof e||(t=void 0===e,e=this.data.elem,i="dk-select-disabled",this.disabled=t),void 0===t&&(t=!0),"number"==typeof e&&(e=this.item(e)),t?(e.setAttribute("aria-disabled",!0),s.addClass(e,i)):(e.setAttribute("aria-disabled",!1),s.removeClass(e,i))}hide(e,t){void 0===t&&(t=!0),e=this.item(e),t?(e.setAttribute("aria-hidden",!0),s.addClass(e,"dk-option-hidden")):(e.setAttribute("aria-hidden",!1),s.removeClass(e,"dk-option-hidden"))}select(e,t){var i,a,l,o,n=this.data.select;if("number"==typeof e&&(e=this.item(e)),"string"==typeof e)for(i=0;i<this.length;i++)this.options[i].getAttribute("data-value")===e&&(e=this.options[i]);return!(!e||"string"==typeof e||!t&&s.hasClass(e,"dk-option-disabled"))&&(s.hasClass(e,"dk-option")?(a=this.options.indexOf(e),l=n.options[a],this.multiple?(s.toggleClass(e,"dk-option-selected"),l.selected=!l.selected,s.hasClass(e,"dk-option-selected")?(e.setAttribute("aria-selected","true"),this.selectedOptions.push(e)):(e.setAttribute("aria-selected","false"),a=this.selectedOptions.indexOf(e),this.selectedOptions.splice(a,1))):(o=this.data.elem.firstChild,this.selectedOptions.length&&(s.removeClass(this.selectedOptions[0],"dk-option-selected"),this.selectedOptions[0].setAttribute("aria-selected","false")),s.addClass(e,"dk-option-selected"),e.setAttribute("aria-selected","true"),o.setAttribute("aria-activedescendant",e.id),o.className="dk-selected "+l.className,o.innerHTML=l.innerHTML,this.selectedOptions[0]=e,l.selected=!0),this.selectedIndex=n.selectedIndex,this.value=n.value,t||this.data.select.dispatchEvent(new CustomEvent("change",{bubbles:this.data.settings.bubble})),e):void 0)}selectOne(e,t){return this.reset(!0),this._scrollTo(e),this.select(e,t)}search(e,t){var s,i,a,l,o,n,d,r,h=this.data.select.options,c=[];if(!e)return this.options;for(t="fuzzy"===(t=t?t.toLowerCase():"strict")?2:"partial"===t?1:0,r=new RegExp((t?"":"^")+e,"i"),s=0;s<h.length;s++)if(a=h[s].text.toLowerCase(),2==t){for(i=e.toLowerCase().split(""),l=o=n=d=0;o<a.length;)a[o]===i[l]?(n+=1+n,l++):n=0,d+=n,o++;l===i.length&&c.push({e:this.options[s],s:d,i:s})}else r.test(a)&&c.push(this.options[s]);return 2===t&&(c=c.sort(function(e,t){return t.s-e.s||e.i-t.i}).reduce(function(e,t){return e[e.length]=t.e,e},[])),c}focus(){this.disabled||(this.multiple?this.data.elem:this.data.elem.children[0]).focus()}reset(e){var t,i=this.data.select;for(this.selectedOptions.length=0,t=0;t<i.options.length;t++)i.options[t].selected=!1,s.removeClass(this.options[t],"dk-option-selected"),this.options[t].setAttribute("aria-selected","false"),!e&&i.options[t].defaultSelected&&this.select(t,!0);this.selectedOptions.length||this.multiple||this.select(0,!0)}refresh(){Object.keys(this).length>0&&(!a||this.data.settings.mobile)&&this.dispose().init(this.data.select,this.data.settings)}dispose(){let e=window.Dropkick;return Object.keys(this).length>0&&(!a||this.data.settings.mobile)&&(delete e.cache[this.data.cacheID],this.data.elem.parentNode.removeChild(this.data.elem),this.data.select.removeAttribute("data-dkCacheId")),this}handleEvent(e){if(!this.disabled)switch(e.type){case"click":this._delegate(e);break;case"keydown":this._keyHandler(e);break;case"keypress":this._searchOptions(e);break;case"mouseover":this._highlight(e);break;case"reset":this.reset();break;case"change":this.data.settings.change.call(this)}}_delegate(e){var t,i,a,l,o=e.target;if(s.hasClass(o,"dk-option-disabled"))return!1;if(this.multiple){if(s.hasClass(o,"dk-option"))if("Range"===(t=window.getSelection()).type&&t.collapseToStart(),e.shiftKey)if(a=this.options.indexOf(this.selectedOptions[0]),l=this.options.indexOf(this.selectedOptions[this.selectedOptions.length-1]),(i=this.options.indexOf(o))>a&&i<l&&(i=a),i>l&&l>a&&(l=a),this.reset(!0),l>i)for(;i<l+1;)this.select(i++);else for(;i>l-1;)this.select(i--);else e.ctrlKey||e.metaKey?this.select(o):(this.reset(!0),this.select(o))}else this[this.isOpen?"close":"open"](),s.hasClass(o,"dk-option")&&this.select(o)}_highlight(e){var t,i=e.target;if(!this.multiple){for(t=0;t<this.options.length;t++)s.removeClass(this.options[t],"dk-option-highlight");s.addClass(this.data.elem.lastChild,"dk-select-options-highlight"),s.addClass(i,"dk-option-highlight")}}_keyHandler(e){var t,i,a=this.selectedOptions,l=this.options,o=1,n={tab:9,enter:13,esc:27,space:32,up:38,down:40};switch(e.keyCode){case n.up:o=-1;case n.down:if(e.preventDefault(),t=a[a.length-1],s.hasClass(this.data.elem.lastChild,"dk-select-options-highlight"))for(s.removeClass(this.data.elem.lastChild,"dk-select-options-highlight"),i=0;i<l.length;i++)s.hasClass(l[i],"dk-option-highlight")&&(s.removeClass(l[i],"dk-option-highlight"),t=l[i]);(o=l.indexOf(t)+o)>l.length-1?o=l.length-1:o<0&&(o=0),this.data.select.options[o].disabled||(this.reset(!0),this.select(o),this._scrollTo(o));break;case n.space:if(!this.isOpen){e.preventDefault(),this.open();break}case n.tab:case n.enter:for(o=0;o<l.length;o++)s.hasClass(l[o],"dk-option-highlight")&&this.select(o);case n.esc:this.isOpen&&(e.preventDefault(),this.close())}}_searchOptions(e){var t,i=this,a=String.fromCharCode(e.keyCode||e.which);void 0===this.data.searchString&&(this.data.searchString=""),function(){i.data.searchTimeout&&clearTimeout(i.data.searchTimeout);i.data.searchTimeout=setTimeout(function(){i.data.searchString=""},1e3)}(),this.data.searchString+=a,(t=this.search(this.data.searchString,this.data.settings.search)).length&&(s.hasClass(t[0],"dk-option-disabled")||this.selectOne(t[0]))}_scrollTo(e){var t,i,a=this.data.elem.lastChild;if(-1===e||"number"!=typeof e&&!e||!this.isOpen&&!this.multiple)return!1;"number"==typeof e&&(e=this.item(e)),t=s.position(e,a).top,i=t-a.scrollTop,i+e.offsetHeight>a.offsetHeight?(t+=e.offsetHeight,a.scrollTop=t-a.offsetHeight):i<0&&(a.scrollTop=t)}}return window.Dropkick=n,window.Dropkick.cache={},window.Dropkick.uid=0,n.build=function(e,t){var i,a,l,o=[],n={elem:null,options:[],selected:[]},d=function(e){var i,a,l,o,r=[];switch(e.nodeName){case"OPTION":i=s.create("li",{class:"dk-option ","data-value":e.value,text:e.text,innerHTML:e.innerHTML,role:"option","aria-selected":"false",id:t+"-"+(e.id||e.value.replace(" ","-"))}),s.addClass(i,e.className),e.disabled&&(s.addClass(i,"dk-option-disabled"),i.setAttribute("aria-disabled","true")),e.hidden&&(s.addClass(i,"dk-option-hidden"),i.setAttribute("aria-hidden","true")),e.selected&&(s.addClass(i,"dk-option-selected"),i.setAttribute("aria-selected","true"),n.selected.push(i)),n.options.push(this.appendChild(i));break;case"OPTGROUP":for(a=s.create("li",{class:"dk-optgroup"}),e.label&&a.appendChild(s.create("div",{class:"dk-optgroup-label",innerHTML:e.label})),l=s.create("ul",{class:"dk-optgroup-options"}),o=e.children.length;o--;r.unshift(e.children[o]));e.disabled&&(a.classList.add("dk-optgroup-disabled"),r.forEach(t=>{t.disabled=e.disabled})),r.forEach(d,l),this.appendChild(a).appendChild(l)}};for(n.elem=s.create("div",{class:"dk-select"+(e.multiple?"-multi":"")}),a=s.create("ul",{class:"dk-select-options",id:t+"-listbox",role:"listbox"}),e.disabled&&(s.addClass(n.elem,"dk-select-disabled"),n.elem.setAttribute("aria-disabled",!0)),n.elem.id=t+(e.id?"-"+e.id:""),s.addClass(n.elem,e.className),e.multiple?(n.elem.setAttribute("tabindex",e.getAttribute("tabindex")||"0"),a.setAttribute("aria-multiselectable","true")):(i=e.options[e.selectedIndex],n.elem.appendChild(s.create("div",{class:"dk-selected "+(i?i.className:""),tabindex:e.tabindex||0,innerHTML:i?i.text:"&nbsp;",id:t+"-combobox","aria-live":"assertive","aria-owns":a.id,role:"combobox"})),a.setAttribute("aria-expanded","false")),l=e.children.length;l--;o.unshift(e.children[l]));return o.forEach(d,n.elem.appendChild(a)),n},n.onDocClick=function(e){var t,i;let a=window.Dropkick;if(1!==e.target.nodeType)return!1;for(i in null!==(t=e.target.getAttribute("data-dkcacheid"))&&a.cache[t].focus(),a.cache)s.closest(e.target,a.cache[i].data.elem)||i===t||a.cache[i].disabled||a.cache[i].close()},t.fn.dropkick=function(){var e=Array.prototype.slice.call(arguments);return t(this).each(function(){e[0]&&"object"!=typeof e[0]?"string"==typeof e[0]&&n.prototype[e[0]].apply(new n(this),e.slice(1)):new n(this,e[0]||{})})},e.attach("intg.Dropkick",n)}),e("skylark-dropkick/main",["./Dropkick"],function(e){return e}),e("skylark-dropkick",["skylark-dropkick/main"],function(e){return e})}(s),!i){var o=require("skylark-langx/skylark");a?module.exports=o:t.skylarkjs=o}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-dropkick.js.map
