(self.webpackChunkmeasurement=self.webpackChunkmeasurement||[]).push([[3727,9815],{8262:(e,t,r)=>{"use strict";var n=r(3586);function o(){}function a(){}a.resetWarningCache=o,e.exports=function(){function e(e,t,r,o,a,i){if(i!==n){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:o};return r.PropTypes=r,r}},3980:(e,t,r)=>{e.exports=r(8262)()},3586:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},3727:(e,t,r)=>{"use strict";r.r(t),r.d(t,{MemoryRouter:()=>n.MemoryRouter,Prompt:()=>n.Prompt,Redirect:()=>n.Redirect,Route:()=>n.Route,Router:()=>n.Router,StaticRouter:()=>n.StaticRouter,Switch:()=>n.Switch,generatePath:()=>n.generatePath,matchPath:()=>n.matchPath,useHistory:()=>n.useHistory,useLocation:()=>n.useLocation,useParams:()=>n.useParams,useRouteMatch:()=>n.useRouteMatch,withRouter:()=>n.withRouter,BrowserRouter:()=>f,HashRouter:()=>p,Link:()=>d,NavLink:()=>w});var n=r(6550),o=r(5307),a=r(2212),i=r.n(a),c=r(809),u=r(7560),s=r(8283),l=r(9356),f=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(t=e.call.apply(e,[this].concat(n))||this).history=(0,c.createBrowserHistory)(t.props),t}return(0,o.Z)(t,e),t.prototype.render=function(){return i().createElement(n.Router,{history:this.history,children:this.props.children})},t}(i().Component),p=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(t=e.call.apply(e,[this].concat(n))||this).history=(0,c.createHashHistory)(t.props),t}return(0,o.Z)(t,e),t.prototype.render=function(){return i().createElement(n.Router,{history:this.history,children:this.props.children})},t}(i().Component),h=function(e,t){return"function"==typeof e?e(t):e},y=function(e,t){return"string"==typeof e?(0,c.createLocation)(e,null,null,t):e},m=function(e){return e},v=i().forwardRef;void 0===v&&(v=m);var R=v((function(e,t){var r=e.innerRef,n=e.navigate,o=e.onClick,a=(0,s.Z)(e,["innerRef","navigate","onClick"]),c=a.target,l=(0,u.Z)({},a,{onClick:function(e){try{o&&o(e)}catch(t){throw e.preventDefault(),t}e.defaultPrevented||0!==e.button||c&&"_self"!==c||function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}(e)||(e.preventDefault(),n())}});return l.ref=m!==v&&t||r,i().createElement("a",l)})),d=v((function(e,t){var r=e.component,o=void 0===r?R:r,a=e.replace,c=e.to,f=e.innerRef,p=(0,s.Z)(e,["component","replace","to","innerRef"]);return i().createElement(n.__RouterContext.Consumer,null,(function(e){e||(0,l.Z)(!1);var r=e.history,n=y(h(c,e.location),e.location),s=n?r.createHref(n):"",R=(0,u.Z)({},p,{href:s,navigate:function(){var t=h(c,e.location);(a?r.replace:r.push)(t)}});return m!==v?R.ref=t||f:R.innerRef=f,i().createElement(o,R)}))})),g=function(e){return e},C=i().forwardRef;void 0===C&&(C=g);var w=C((function(e,t){var r=e["aria-current"],o=void 0===r?"page":r,a=e.activeClassName,c=void 0===a?"active":a,f=e.activeStyle,p=e.className,m=e.exact,v=e.isActive,R=e.location,w=e.sensitive,P=e.strict,_=e.style,k=e.to,E=e.innerRef,b=(0,s.Z)(e,["aria-current","activeClassName","activeStyle","className","exact","isActive","location","sensitive","strict","style","to","innerRef"]);return i().createElement(n.__RouterContext.Consumer,null,(function(e){e||(0,l.Z)(!1);var r=R||e.location,a=y(h(k,r),r),s=a.pathname,Z=s&&s.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1"),S=Z?(0,n.matchPath)(r.pathname,{path:Z,exact:m,sensitive:w,strict:P}):null,T=!!(v?v(S,r):S),x=T?function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((function(e){return e})).join(" ")}(p,c):p,O=T?(0,u.Z)({},_,{},f):_,H=(0,u.Z)({"aria-current":T&&o||null,className:x,style:O,to:a},b);return g!==C?H.ref=t||E:H.innerRef=E,i().createElement(d,H)}))}))}}]);