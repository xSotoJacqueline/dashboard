import{R as s,q as F,t as O,w as T,v as Y,p as t,M as B,L as N,S as D,x as $,O as J,i as q}from"./chunk-EF7DTUVF-Bm_7-lIy.js";import{C as h}from"./index-DaQYaT3z.js";import"./index-Tx2uMN6g.js";var i=e=>`🔒 Clerk: ${e.trim()}

For more info, check out the docs: https://clerk.com/docs,
or come say hi in our discord server: https://clerk.com/discord
`,_=`Use 'rootAuthLoader' as your root loader. Then, add <ClerkProvider> to your app.
Example:

import { rootAuthLoader } from '@clerk/react-router/ssr.server'
import { ClerkProvider } from '@clerk/react-router'

export async function loader(args: Route.LoaderArgs) {
  return rootAuthLoader(args)
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <ClerkProvider loaderData={loaderData}>
      <Outlet />
    </ClerkProvider>
  )
}
`,V=i(`
You're trying to pass an invalid object in "<ClerkProvider clerkState={...}>".

${_}
`),v=i(`
Looks like you didn't pass 'clerkState' to "<ClerkProvider clerkState={...}>".

${_}
`);i(`
You're calling 'getAuth()' from a loader, without providing the loader args object.
Example:

export async function loader(args: Route.LoaderArgs) {
  const { userId } = await getAuth(args)

  // Your code here
}
`);i(`
You're returning an invalid response from the 'rootAuthLoader' inside root.tsx.
You can only return plain objects, Responses created using the React Router 'data()'helper or
custom redirect 'Response' instances (status codes in the range of 300 to 400).
If you want to return a primitive value or an array, you can always wrap the response with an object.

Example:

export async function loader(args: Route.LoaderArgs) {
  return rootAuthLoader(args, async ({ auth }) => {
    const { userId } = auth;
    const posts = await database.getPostsByUserId(userId);

    return { data: posts }
    // Or
    return data(posts, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })
}
`);i(`
A secretKey must be provided in order to use SSR and the exports from @clerk/react-router/api.');
If your runtime supports environment variables, you can add a CLERK_SECRET_KEY variable to your config.
Otherwise, you can pass a secretKey parameter to rootAuthLoader or getAuth.
`);i("Missing domain and proxyUrl. A satellite application needs to specify a domain or a proxyUrl");i(`
Invalid signInUrl. A satellite application requires a signInUrl for development instances.
Check if signInUrl is missing from your configuration or if it is not an absolute URL.`);var H=i(`
You're trying to use Clerk in React Router SPA Mode without providing a Publishable Key.
Please provide the publishableKey prop on the <ClerkProvider> component.

Example:

<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
`);function z(e){(!e||!e.__internal_clerk_state)&&console.warn(v)}function G(e){if(!e)throw new Error(v);if(e&&!e.__internal_clerk_state)throw new Error(V)}function Q(e){if(!e||typeof e!="string")throw new Error(H)}var g=()=>{var e;if(typeof window<"u"&&typeof((e=window.__reactRouterContext)==null?void 0:e.isSpaMode)<"u")return window.__reactRouterContext.isSpaMode},m=s.createContext(void 0);m.displayName="ClerkReactRouterOptionsCtx";var W=e=>{const{children:r,options:o}=e;return s.createElement(m.Provider,{value:{value:o}},r)},X=()=>{const e=F(),r=O(),o=s.useRef([]),n=()=>{o.current.forEach(a=>a()),o.current.splice(0,o.current.length)};return s.useEffect(()=>{n()},[r]),(a,u)=>new Promise(d=>{o.current.push(d),e(a,u)})},Z={name:"@clerk/react-router",version:"1.8.4"},c={current:void 0};function ee({children:e,...r}){const o=X(),n=g();s.useEffect(()=>{c.current=o},[o]);const{clerkState:a,...u}=r;h.displayName="ReactClerkProvider",typeof n<"u"&&!n&&G(a);const{__clerk_ssr_state:d,__publishableKey:k,__proxyUrl:y,__domain:x,__isSatellite:b,__clerk_debug:R,__signInUrl:S,__signUpUrl:U,__afterSignInUrl:w,__afterSignUpUrl:E,__signInForceRedirectUrl:C,__signUpForceRedirectUrl:P,__signInFallbackRedirectUrl:A,__signUpFallbackRedirectUrl:j,__clerkJSUrl:I,__clerkJSVersion:L,__telemetryDisabled:M,__telemetryDebug:K}=a?.__internal_clerk_state||{};s.useEffect(()=>{typeof n<"u"&&!n&&z(a)},[]),s.useEffect(()=>{window.__clerk_debug=R},[]);const f={publishableKey:k,proxyUrl:y,domain:x,isSatellite:b,signInUrl:S,signUpUrl:U,afterSignInUrl:w,afterSignUpUrl:E,signInForceRedirectUrl:C,signUpForceRedirectUrl:P,signInFallbackRedirectUrl:A,signUpFallbackRedirectUrl:j,clerkJSUrl:I,clerkJSVersion:L,telemetry:{disabled:M,debug:K}};return s.createElement(W,{options:f},s.createElement(h,{routerPush:p=>{var l;return(l=c.current)==null?void 0:l.call(c,p)},routerReplace:p=>{var l;return(l=c.current)==null?void 0:l.call(c,p,{replace:!0})},initialState:d,sdkMetadata:Z,...f,...u},e))}var re=({children:e,loaderData:r,...o})=>{let n;const a=g();return!a&&r?.clerkState&&(n=r.clerkState),typeof a<"u"&&a&&Q(o.publishableKey),s.createElement(ee,{...o,clerkState:n},e)};function ne({children:e}){return t.jsxs("html",{lang:"en",children:[t.jsxs("head",{children:[t.jsx("meta",{charSet:"UTF-8"}),t.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),t.jsx("title",{children:"Dashboard"}),t.jsx(B,{}),t.jsx(N,{})]}),t.jsxs("body",{children:[e,t.jsx(D,{}),t.jsx($,{})]})]})}const se=T(function({loaderData:r}){return t.jsx(re,{loaderData:r,children:t.jsx("main",{children:t.jsx(J,{})})})}),ie=Y(function({error:r}){let o="Oops!",n="An unexpected error occurred.",a;return q(r)&&(o=r.status===404?"404":"Error",n=r.status===404?"The requested page could not be found.":r.statusText||n),t.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[t.jsx("h1",{children:o}),t.jsx("p",{children:n}),a]})});export{ie as ErrorBoundary,ne as Layout,se as default};
