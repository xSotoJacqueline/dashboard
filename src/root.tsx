import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse
//   data,
//   isRouteErrorResponse,
//   useLoaderData,
//   useLocation,
} from 'react-router';
import "./index.css";
import "./App.css"
import type { Route } from './+types/root';
import { rootAuthLoader } from '@clerk/react-router/ssr.server'
import { ClerkProvider } from '@clerk/react-router'
// import { getAuth } from '@clerk/react-router/ssr.server'
// import { redirect } from 'react-router'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export async function loader(args: Route.LoaderArgs) {

  // const CLERK_SIGN_IN_FORCE_REDIRECT_URL = process.env.CLERK_SIGN_IN_FORCE_REDIRECT_URL
  // const CLERK_SIGN_IN_URL = process.env.CLERK_SIGN_IN_URL

  // if (!CLERK_SIGN_IN_FORCE_REDIRECT_URL) {
  //   throw new Error('Add your Clerk Sign In Force Redirect URL to the .env file')
  // }else if (!CLERK_SIGN_IN_URL) {
  //   throw new Error('Add your Clerk Sign In URL to the .env file')
  // }

  // const { userId } = await getAuth(args)
  //   if (!userId) {
  //   console.log('User not authenticated, redirecting to sign-in')
  //   return redirect(`${CLERK_SIGN_IN_URL}/sign-in?redirect_url=${CLERK_SIGN_IN_FORCE_REDIRECT_URL}`)
  // }

  return rootAuthLoader(args)
}



export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Dashboard</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}


export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <ClerkProvider loaderData={loaderData}>
      <main>
        <Outlet />
      </main>
    </ClerkProvider>
  )
}


export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}

// export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
//   const errorCode = isRouteErrorResponse(error) ? error.status : 500;

//   if (errorCode !== 404) {
//     console.error('[RootErrorBoundary]', error);
//   }

//   return <GenericErrorLayout errorCode={errorCode} />;
// }

