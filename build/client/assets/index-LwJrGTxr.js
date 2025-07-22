import{a as r,p as g,A as E}from"./chunk-EF7DTUVF-Bm_7-lIy.js";import{a as A}from"./index-Tx2uMN6g.js";import{c as P,u as M}from"./utils-DHvMMC6N.js";/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),b=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,n,o)=>o?o.toUpperCase():n.toLowerCase()),x=t=>{const e=b(t);return e.charAt(0).toUpperCase()+e.slice(1)},S=(...t)=>t.filter((e,n,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===n).join(" ").trim(),O=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=r.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:n=2,absoluteStrokeWidth:o,className:s="",children:c,iconNode:a,...i},u)=>r.createElement("svg",{ref:u,..._,width:e,height:e,stroke:t,strokeWidth:o?Number(n)*24/Number(e):n,className:S("lucide",s),...!c&&!O(i)&&{"aria-hidden":"true"},...i},[...a.map(([l,d])=>r.createElement(l,d)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=(t,e)=>{const n=r.forwardRef(({className:o,...s},c)=>r.createElement($,{ref:c,iconNode:e,className:S(`lucide-${R(x(t))}`,`lucide-${t}`,o),...s}));return n.displayName=x(t),n};/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],X=w("calendar",k);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Y=w("chevron-down",I);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],z=w("chevron-right",U);/**
 * @license lucide-react v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],ee=w("user",T);var L=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],te=L.reduce((t,e)=>{const n=P(`Primitive.${e}`),o=r.forwardRef((s,c)=>{const{asChild:a,...i}=s,u=a?n:e;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),g.jsx(u,{...i,ref:c})});return o.displayName=`Primitive.${e}`,{...t,[e]:o}},{});function ne(t,e){t&&A.flushSync(()=>t.dispatchEvent(e))}function oe(t,e,{checkForDefaultPrevented:n=!0}={}){return function(s){if(t?.(s),n===!1||!s.defaultPrevented)return e?.(s)}}function re(t,e){const n=r.createContext(e),o=c=>{const{children:a,...i}=c,u=r.useMemo(()=>i,Object.values(i));return g.jsx(n.Provider,{value:u,children:a})};o.displayName=t+"Provider";function s(c){const a=r.useContext(n);if(a)return a;if(e!==void 0)return e;throw new Error(`\`${c}\` must be used within \`${t}\``)}return[o,s]}function se(t,e=[]){let n=[];function o(c,a){const i=r.createContext(a),u=n.length;n=[...n,a];const l=f=>{const{scope:p,children:m,...v}=f,N=p?.[t]?.[u]||i,y=r.useMemo(()=>v,Object.values(v));return g.jsx(N.Provider,{value:y,children:m})};l.displayName=c+"Provider";function d(f,p){const m=p?.[t]?.[u]||i,v=r.useContext(m);if(v)return v;if(a!==void 0)return a;throw new Error(`\`${f}\` must be used within \`${c}\``)}return[l,d]}const s=()=>{const c=n.map(a=>r.createContext(a));return function(i){const u=i?.[t]||c;return r.useMemo(()=>({[`__scope${t}`]:{...i,[t]:u}}),[i,u])}};return s.scopeName=t,[o,j(s,...e)]}function j(...t){const e=t[0];if(t.length===1)return e;const n=()=>{const o=t.map(s=>({useScope:s(),scopeName:s.scopeName}));return function(c){const a=o.reduce((i,{useScope:u,scopeName:l})=>{const f=u(c)[`__scope${l}`];return{...i,...f}},{});return r.useMemo(()=>({[`__scope${e.scopeName}`]:a}),[a])}};return n.scopeName=e.scopeName,n}var C=globalThis?.document?r.useLayoutEffect:()=>{},D=E[" useId ".trim().toString()]||(()=>{}),W=0;function ce(t){const[e,n]=r.useState(D());return C(()=>{n(o=>o??String(W++))},[t]),t||(e?`radix-${e}`:"")}var F=E[" useInsertionEffect ".trim().toString()]||C;function ie({prop:t,defaultProp:e,onChange:n=()=>{},caller:o}){const[s,c,a]=B({defaultProp:e,onChange:n}),i=t!==void 0,u=i?t:s;{const d=r.useRef(t!==void 0);r.useEffect(()=>{const f=d.current;f!==i&&console.warn(`${o} is changing from ${f?"controlled":"uncontrolled"} to ${i?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),d.current=i},[i,o])}const l=r.useCallback(d=>{if(i){const f=H(d)?d(t):d;f!==t&&a.current?.(f)}else c(d)},[i,t,c,a]);return[u,l]}function B({defaultProp:t,onChange:e}){const[n,o]=r.useState(t),s=r.useRef(n),c=r.useRef(e);return F(()=>{c.current=e},[e]),r.useEffect(()=>{s.current!==n&&(c.current?.(n),s.current=n)},[n,s]),[n,o,c]}function H(t){return typeof t=="function"}function q(t,e){return r.useReducer((n,o)=>e[n][o]??n,t)}var Z=t=>{const{present:e,children:n}=t,o=K(e),s=typeof n=="function"?n({present:o.isPresent}):r.Children.only(n),c=M(o.ref,V(s));return typeof n=="function"||o.isPresent?r.cloneElement(s,{ref:c}):null};Z.displayName="Presence";function K(t){const[e,n]=r.useState(),o=r.useRef(null),s=r.useRef(t),c=r.useRef("none"),a=t?"mounted":"unmounted",[i,u]=q(a,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return r.useEffect(()=>{const l=h(o.current);c.current=i==="mounted"?l:"none"},[i]),C(()=>{const l=o.current,d=s.current;if(d!==t){const p=c.current,m=h(l);t?u("MOUNT"):m==="none"||l?.display==="none"?u("UNMOUNT"):u(d&&p!==m?"ANIMATION_OUT":"UNMOUNT"),s.current=t}},[t,u]),C(()=>{if(e){let l;const d=e.ownerDocument.defaultView??window,f=m=>{const N=h(o.current).includes(m.animationName);if(m.target===e&&N&&(u("ANIMATION_END"),!s.current)){const y=e.style.animationFillMode;e.style.animationFillMode="forwards",l=d.setTimeout(()=>{e.style.animationFillMode==="forwards"&&(e.style.animationFillMode=y)})}},p=m=>{m.target===e&&(c.current=h(o.current))};return e.addEventListener("animationstart",p),e.addEventListener("animationcancel",f),e.addEventListener("animationend",f),()=>{d.clearTimeout(l),e.removeEventListener("animationstart",p),e.removeEventListener("animationcancel",f),e.removeEventListener("animationend",f)}}else u("ANIMATION_END")},[e,u]),{isPresent:["mounted","unmountSuspended"].includes(i),ref:r.useCallback(l=>{o.current=l?getComputedStyle(l):null,n(l)},[])}}function h(t){return t?.animationName||"none"}function V(t){let e=Object.getOwnPropertyDescriptor(t.props,"ref")?.get,n=e&&"isReactWarning"in e&&e.isReactWarning;return n?t.ref:(e=Object.getOwnPropertyDescriptor(t,"ref")?.get,n=e&&"isReactWarning"in e&&e.isReactWarning,n?t.props.ref:t.props.ref||t.ref)}export{z as C,te as P,ee as U,oe as a,ie as b,w as c,ne as d,se as e,ce as f,Z as g,re as h,Y as i,X as j,C as u};
