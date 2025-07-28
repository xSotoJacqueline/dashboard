import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/pepe')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/pepe"!</div>
}
