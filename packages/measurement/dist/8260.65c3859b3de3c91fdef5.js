(self.webpackChunkmeasurement=self.webpackChunkmeasurement||[]).push([[8260],{4659:(e,t,n)=>{"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}n.d(t,{Z:()=>r})},4730:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(3408);function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(0,r.Z)(o.key),o)}}function i(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}},1119:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(3408);function o(e,t,n){return(t=(0,r.Z)(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},8283:(e,t,n)=>{"use strict";function r(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}n.d(t,{Z:()=>r})},3408:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(929);function o(e){var t=function(e,t){if("object"!==(0,r.Z)(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==(0,r.Z)(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===(0,r.Z)(t)?t:String(t)}},929:(e,t,n)=>{"use strict";function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}n.d(t,{Z:()=>r})},8260:(e,t,n)=>{"use strict";n.r(t),n.d(t,{I18nContext:()=>I,I18nextProvider:()=>ue,Trans:()=>Q,Translation:()=>se,composeInitialProps:()=>z,date:()=>me,getDefaults:()=>D,getI18n:()=>T,getInitialProps:()=>L,initReactI18next:()=>A,number:()=>ge,plural:()=>be,select:()=>ve,selectOrdinal:()=>he,setDefaults:()=>Z,setI18n:()=>C,time:()=>ye,useSSR:()=>le,useTranslation:()=>ne,withSSR:()=>de,withTranslation:()=>ae});var r=n(8283);function o(e,t){if(null==e)return{};var n,o,i=(0,r.Z)(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var i=n(929),a=n(1119),c=n(5206),s=n.n(c),u=n(4896),l=n.n(u),f=/\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;function p(e){var t={type:"tag",name:"",voidElement:!1,attrs:{},children:[]},n=e.match(/<\/?([^\s]+?)[/\s>]/);if(n&&(t.name=n[1],(l()[n[1]]||"/"===e.charAt(e.length-2))&&(t.voidElement=!0),t.name.startsWith("!--"))){var r=e.indexOf("--\x3e");return{type:"comment",comment:-1!==r?e.slice(4,r):""}}for(var o=new RegExp(f),i=null;null!==(i=o.exec(e));)if(i[0].trim())if(i[1]){var a=i[1].trim(),c=[a,""];a.indexOf("=")>-1&&(c=a.split("=")),t.attrs[c[0]]=c[1],o.lastIndex--}else i[2]&&(t.attrs[i[2]]=i[3].trim().substring(1,i[3].length-1));return t}var d=/<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g,m=/^\s*$/,y=Object.create(null);function g(e,t){switch(t.type){case"text":return e+t.content;case"tag":return e+="<"+t.name+(t.attrs?function(e){var t=[];for(var n in e)t.push(n+'="'+e[n]+'"');return t.length?" "+t.join(" "):""}(t.attrs):"")+(t.voidElement?"/>":">"),t.voidElement?e:e+t.children.reduce(g,"")+"</"+t.name+">";case"comment":return e+"\x3c!--"+t.comment+"--\x3e"}}var v={parse:function(e,t){t||(t={}),t.components||(t.components=y);var n,r=[],o=[],i=-1,a=!1;if(0!==e.indexOf("<")){var c=e.indexOf("<");r.push({type:"text",content:-1===c?e:e.substring(0,c)})}return e.replace(d,(function(c,s){if(a){if(c!=="</"+n.name+">")return;a=!1}var u,l="/"!==c.charAt(1),f=c.startsWith("\x3c!--"),d=s+c.length,y=e.charAt(d);if(f){var g=p(c);return i<0?(r.push(g),r):((u=o[i]).children.push(g),r)}if(l&&(i++,"tag"===(n=p(c)).type&&t.components[n.name]&&(n.type="component",a=!0),n.voidElement||a||!y||"<"===y||n.children.push({type:"text",content:e.slice(d,e.indexOf("<",d))}),0===i&&r.push(n),(u=o[i-1])&&u.children.push(n),o[i]=n),(!l||n.voidElement)&&(i>-1&&(n.voidElement||n.name===c.slice(2,-1))&&(i--,n=-1===i?r:o[i]),!a&&"<"!==y&&y)){u=-1===i?r:o[i].children;var v=e.indexOf("<",d),b=e.slice(d,-1===v?void 0:v);m.test(b)&&(b=" "),(v>-1&&i+u.length>=0||" "!==b)&&u.push({type:"text",content:b})}})),r},stringify:function(e){return e.reduce((function(e,t){return e+g("",t)}),"")}};const b=v;var h="".replace,O=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g,j={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"'};function w(e){return j[e]}var P=n(4659),E=n(4730);function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var k,N={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0},I=s().createContext();function Z(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};N=x(x({},N),e)}function D(){return N}var R=function(){function e(){(0,P.Z)(this,e),this.usedNamespaces={}}return(0,E.Z)(e,[{key:"addUsedNamespaces",value:function(e){var t=this;e.forEach((function(e){t.usedNamespaces[e]||(t.usedNamespaces[e]=!0)}))}},{key:"getUsedNamespaces",value:function(){return Object.keys(this.usedNamespaces)}}]),e}();function C(e){k=e}function T(){return k}var A={type:"3rdParty",init:function(e){Z(e.options.react),C(e)}};function z(e){return function(t){return new Promise((function(n){var r=L();e.getInitialProps?e.getInitialProps(t).then((function(e){n(x(x({},e),r))})):n(r)}))}}function L(){var e=T(),t=e.reportNamespaces?e.reportNamespaces.getUsedNamespaces():[],n={},r={};return e.languages.forEach((function(n){r[n]={},t.forEach((function(t){r[n][t]=e.getResourceBundle(n,t)||{}}))})),n.initialI18nStore=r,n.initialLanguage=e.language,n}function B(){if(console&&console.warn){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];"string"==typeof n[0]&&(n[0]="react-i18next:: ".concat(n[0])),(e=console).warn.apply(e,n)}}var U={};function H(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];"string"==typeof t[0]&&U[t[0]]||("string"==typeof t[0]&&(U[t[0]]=new Date),B.apply(void 0,t))}function K(e,t,n){e.loadNamespaces(t,(function(){e.isInitialized?n():e.on("initialized",(function t(){setTimeout((function(){e.off("initialized",t)}),0),n()}))}))}function V(e){return e.displayName||e.name||("string"==typeof e&&e.length>0?e:"Unknown")}var F=["format"],W=["children","count","parent","i18nKey","context","tOptions","values","defaults","components","ns","i18n","t","shouldUnescape"];function M(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function $(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?M(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):M(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function q(e,t){if(!e)return!1;var n=e.props?e.props.children:e.children;return t?n.length>0:!!n}function Y(e){return e?e&&e.children?e.children:e.props&&e.props.children:[]}function G(e){return Array.isArray(e)?e:[e]}function J(e,t){if(!e)return"";var n="",r=G(e),a=t.transSupportBasicHtmlNodes&&t.transKeepBasicHtmlNodesFor?t.transKeepBasicHtmlNodesFor:[];return r.forEach((function(e,r){if("string"==typeof e)n+="".concat(e);else if(s().isValidElement(e)){var c=Object.keys(e.props).length,u=a.indexOf(e.type)>-1,l=e.props.children;if(!l&&u&&0===c)n+="<".concat(e.type,"/>");else if(l||u&&0===c)if(e.props.i18nIsDynamicList)n+="<".concat(r,"></").concat(r,">");else if(u&&1===c&&"string"==typeof l)n+="<".concat(e.type,">").concat(l,"</").concat(e.type,">");else{var f=J(l,t);n+="<".concat(r,">").concat(f,"</").concat(r,">")}else n+="<".concat(r,"></").concat(r,">")}else if(null===e)B("Trans: the passed in value is invalid - seems you passed in a null child.");else if("object"===(0,i.Z)(e)){var p=e.format,d=o(e,F),m=Object.keys(d);if(1===m.length){var y=p?"".concat(m[0],", ").concat(p):m[0];n+="{{".concat(y,"}}")}else B("react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.",e)}else B("Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.",e)})),n}function Q(e){var t=e.children,n=e.count,r=e.parent,a=e.i18nKey,u=e.context,l=e.tOptions,f=void 0===l?{}:l,p=e.values,d=e.defaults,m=e.components,y=e.ns,g=e.i18n,v=e.t,j=e.shouldUnescape,P=o(e,W),E=(0,c.useContext)(I)||{},S=E.i18n,x=E.defaultNS,k=g||S||T();if(!k)return H("You will need to pass in an i18next instance by using i18nextReactModule"),t;var N=v||k.t.bind(k)||function(e){return e};u&&(f.context=u);var Z=$($({},D()),k.options&&k.options.react),R=y||N.ns||x||k.options&&k.options.defaultNS;R="string"==typeof R?[R]:R||["translation"];var C=d||J(t,Z)||Z.transEmptyNodeValue||a,A=Z.hashTransKey,z=a||(A?A(C):C),L=p?f.interpolation:{interpolation:$($({},f.interpolation),{},{prefix:"#$?",suffix:"?$#"})},B=$($($($({},f),{},{count:n},p),L),{},{defaultValue:C,ns:R}),U=function(e,t,n,r,o,a){if(""===t)return[];var c=r.transKeepBasicHtmlNodesFor||[],u=t&&new RegExp(c.join("|")).test(t);if(!e&&!u)return[t];var l={};!function e(t){G(t).forEach((function(t){"string"!=typeof t&&(q(t)?e(Y(t)):"object"!==(0,i.Z)(t)||s().isValidElement(t)||Object.assign(l,t))}))}(e);var f=b.parse("<0>".concat(t,"</0>")),p=$($({},l),o);function d(e,t,n){var r=Y(e),o=y(r,t.children,n);return function(e){return"[object Array]"===Object.prototype.toString.call(e)&&e.every((function(e){return s().isValidElement(e)}))}(r)&&0===o.length?r:o}function m(e,t,n,r,o){e.dummy&&(e.children=t),n.push(s().cloneElement(e,$($({},e.props),{},{key:r}),o?void 0:t))}function y(t,o,l){var f=G(t);return G(o).reduce((function(t,o,g){var v,b,j,P,E=o.children&&o.children[0]&&o.children[0].content&&n.services.interpolator.interpolate(o.children[0].content,p,n.language);if("tag"===o.type){var S=f[parseInt(o.name,10)];!S&&1===l.length&&l[0][o.name]&&(S=l[0][o.name]),S||(S={});var x=0!==Object.keys(o.attrs).length?(b={props:o.attrs},(P=$({},j=S)).props=Object.assign(b.props,j.props),P):S,k=s().isValidElement(x),N=k&&q(o,!0)&&!o.voidElement,I=u&&"object"===(0,i.Z)(x)&&x.dummy&&!k,Z="object"===(0,i.Z)(e)&&null!==e&&Object.hasOwnProperty.call(e,o.name);if("string"==typeof x){var D=n.services.interpolator.interpolate(x,p,n.language);t.push(D)}else if(q(x)||N)m(x,d(x,o,l),t,g);else if(I){var R=y(f,o.children,l);t.push(s().cloneElement(x,$($({},x.props),{},{key:g}),R))}else if(Number.isNaN(parseFloat(o.name)))if(Z)m(x,d(x,o,l),t,g,o.voidElement);else if(r.transSupportBasicHtmlNodes&&c.indexOf(o.name)>-1)if(o.voidElement)t.push(s().createElement(o.name,{key:"".concat(o.name,"-").concat(g)}));else{var C=y(f,o.children,l);t.push(s().createElement(o.name,{key:"".concat(o.name,"-").concat(g)},C))}else if(o.voidElement)t.push("<".concat(o.name," />"));else{var T=y(f,o.children,l);t.push("<".concat(o.name,">").concat(T,"</").concat(o.name,">"))}else if("object"!==(0,i.Z)(x)||k)1===o.children.length&&E?t.push(s().cloneElement(x,$($({},x.props),{},{key:g}),E)):t.push(s().cloneElement(x,$($({},x.props),{},{key:g})));else{var A=o.children[0]?E:null;A&&t.push(A)}}else if("text"===o.type){var z=r.transWrapTextNodes,L=a?(v=n.services.interpolator.interpolate(o.content,p,n.language),h.call(v,O,w)):n.services.interpolator.interpolate(o.content,p,n.language);z?t.push(s().createElement(z,{key:"".concat(o.name,"-").concat(g)},L)):t.push(L)}return t}),[])}return Y(y([{dummy:!0,children:e||[]}],f,G(e||[]))[0])}(m||t,z?N(z,B):C,k,Z,B,j),K=void 0!==r?r:Z.defaultTransParent;return K?s().createElement(K,P,U):U}function X(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,a,c=[],s=!0,u=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;s=!1}else for(;!(s=(r=i.call(n)).done)&&(c.push(r.value),c.length!==t);s=!0);}catch(e){u=!0,o=e}finally{try{if(!s&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(u)throw o}}return c}}(e,t)||function(e,t){if(e){if("string"==typeof e)return X(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?X(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ee(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function te(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ee(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ee(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ne(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.i18n,r=(0,c.useContext)(I)||{},o=r.i18n,i=r.defaultNS,a=n||o||T();if(a&&!a.reportNamespaces&&(a.reportNamespaces=new R),!a){H("You will need to pass in an i18next instance by using initReactI18next");var s=function(e){return Array.isArray(e)?e[e.length-1]:e},u=[s,{},!1];return u.t=s,u.i18n={},u.ready=!1,u}a.options.react&&void 0!==a.options.react.wait&&H("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");var l=te(te(te({},D()),a.options.react),t),f=l.useSuspense,p=l.keyPrefix,d=e||i||a.options&&a.options.defaultNS;d="string"==typeof d?[d]:d||["translation"],a.reportNamespaces.addUsedNamespaces&&a.reportNamespaces.addUsedNamespaces(d);var m=(a.isInitialized||a.initializedStoreOnce)&&d.every((function(e){return function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t.languages||!t.languages.length)return H("i18n.languages were undefined or empty",t.languages),!0;var r=t.languages[0],o=!!t.options&&t.options.fallbackLng,i=t.languages[t.languages.length-1];if("cimode"===r.toLowerCase())return!0;var a=function(e,n){var r=t.services.backendConnector.state["".concat(e,"|").concat(n)];return-1===r||2===r};return!(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!a(t.isLanguageChangingTo,e)||!t.hasResourceBundle(r,e)&&t.services.backendConnector.backend&&(!a(r,e)||o&&!a(i,e)))}(e,a,l)}));function y(){return a.getFixedT(null,"fallback"===l.nsMode?d:d[0],p)}var g=_((0,c.useState)(y),2),v=g[0],b=g[1],h=(0,c.useRef)(!0);(0,c.useEffect)((function(){var e=l.bindI18n,t=l.bindI18nStore;function n(){h.current&&b(y)}return h.current=!0,m||f||K(a,d,(function(){h.current&&b(y)})),e&&a&&a.on(e,n),t&&a&&a.store.on(t,n),function(){h.current=!1,e&&a&&e.split(" ").forEach((function(e){return a.off(e,n)})),t&&a&&t.split(" ").forEach((function(e){return a.store.off(e,n)}))}}),[a,d.join()]);var O=(0,c.useRef)(!0);(0,c.useEffect)((function(){h.current&&!O.current&&b(y),O.current=!1}),[a]);var j=[v,a,m];if(j.t=v,j.i18n=a,j.ready=m,m)return j;if(!m&&!f)return j;throw new Promise((function(e){K(a,d,(function(){e()}))}))}var re=["forwardedRef"];function oe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ie(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?oe(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):oe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ae(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(n){function r(r){var i=r.forwardedRef,a=o(r,re),c=_(ne(e,a),3),u=c[0],l=c[1],f=c[2],p=ie(ie({},a),{},{t:u,i18n:l,tReady:f});return t.withRef&&i?p.ref=i:!t.withRef&&i&&(p.forwardedRef=i),s().createElement(n,p)}return r.displayName="withI18nextTranslation(".concat(V(n),")"),r.WrappedComponent=n,t.withRef?s().forwardRef((function(e,t){return s().createElement(r,Object.assign({},e,{forwardedRef:t}))})):r}}var ce=["ns","children"];function se(e){var t=e.ns,n=e.children,r=_(ne(t,o(e,ce)),3),i=r[0],a=r[1],c=r[2];return n(i,{i18n:a,lng:a.language},c)}function ue(e){var t=e.i18n,n=e.defaultNS,r=e.children,o=(0,c.useMemo)((function(){return{i18n:t,defaultNS:n}}),[t,n]);return(0,c.createElement)(I.Provider,{value:o},r)}function le(e,t){var n=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}).i18n,r=((0,c.useContext)(I)||{}).i18n,o=n||r||T();o.options&&o.options.isClone||(e&&!o.initializedStoreOnce&&(o.services.resourceStore.data=e,o.options.ns=Object.values(e).reduce((function(e,t){return Object.keys(t).forEach((function(t){e.indexOf(t)<0&&e.push(t)})),e}),o.options.ns),o.initializedStoreOnce=!0,o.isInitialized=!0),t&&!o.initializedLanguageOnce&&(o.changeLanguage(t),o.initializedLanguageOnce=!0))}var fe=["initialI18nStore","initialLanguage"];function pe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function de(){return function(e){function t(t){var n=t.initialI18nStore,r=t.initialLanguage,i=o(t,fe);return le(n,r),s().createElement(e,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?pe(Object(n),!0).forEach((function(t){(0,a.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):pe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},i))}return t.getInitialProps=z(e),t.displayName="withI18nextSSR(".concat(V(e),")"),t.WrappedComponent=e,t}}var me=function(){return""},ye=function(){return""},ge=function(){return""},ve=function(){return""},be=function(){return""},he=function(){return""}},4896:e=>{e.exports={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0}}}]);