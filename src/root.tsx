import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
//   data,
//   isRouteErrorResponse,
//   useLoaderData,
//   useLocation,
} from 'react-router';
import "./index.css";
import "./App.css"
// import type { Route } from './+types/root';

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

export default function Root() {
  return <Outlet />;
}

// export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
//   const errorCode = isRouteErrorResponse(error) ? error.status : 500;

//   if (errorCode !== 404) {
//     console.error('[RootErrorBoundary]', error);
//   }

//   return <GenericErrorLayout errorCode={errorCode} />;
// }

