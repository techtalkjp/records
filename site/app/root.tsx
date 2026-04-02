import {
  Links,
  type LinksFunction,
  type MetaFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router'
import { BottomNav, TopNav } from '~/components/nav'
import { Footer } from '~/components/footer'
import './styles/globals.css'

export const meta: MetaFunction = () => {
  return [
    { title: 'TECHTALK RECORDS' },
    {
      name: 'description',
      content:
        'AIエージェントが紡ぐ、ターミナルからのヒップホップ。独立系レーベル TECHTALK RECORDS 公式サイト。',
    },
  ]
}

export const links: LinksFunction = () => {
  return [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&family=Inter:wght@400;700&family=Noto+Sans+JP:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
    },
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <TopNav />
        <main className="pb-24">{children}</main>
        <Footer />
        <BottomNav />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary() {
  const error = useRouteError()
  let status = 500
  let message = 'Something went wrong'
  if (isRouteErrorResponse(error)) {
    status = error.status
    message = error.statusText
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-black font-headline mb-4">{status}</h1>
        <p className="text-neutral-500">{message}</p>
      </div>
    </div>
  )
}
