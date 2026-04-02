import { Link, useLocation } from 'react-router'

export function TopNav() {
  const location = useLocation()
  if (location.pathname === '/') return null

  return (
    <>
      <nav className="flex justify-between items-center w-full px-6 py-4 bg-black fixed top-0 z-40">
        <Link
          to="/"
          viewTransition
          className="text-2xl font-black text-white tracking-tighter font-headline uppercase"
        >
          TECHTALK
        </Link>
      </nav>
      <div className="h-16" />
    </>
  )
}

export function BottomNav() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isArtists =
    location.pathname.startsWith('/artists')
  const isReleases =
    location.pathname.startsWith('/releases') ||
    location.pathname.startsWith('/tracks')

  return (
    <nav className="fixed bottom-0 w-full flex justify-around items-center py-4 bg-black z-50">
      <NavItem to="/" label="HOME" icon="home" active={isHome} />
      <NavItem
        to="/artists"
        label="ARTISTS"
        icon="group"
        active={isArtists}
      />
      <NavItem
        to="/releases"
        label="RELEASES"
        icon="album"
        active={isReleases}
      />
    </nav>
  )
}

function NavItem({
  to,
  label,
  icon,
  active,
}: {
  to: string
  label: string
  icon: string
  active: boolean
}) {
  return (
    <Link
      to={to}
      viewTransition
      className={`flex flex-col items-center justify-center transition-transform duration-75 ${
        active
          ? 'text-white scale-110'
          : 'text-neutral-600 hover:text-white scale-95'
      }`}
    >
      <span
        className="material-symbols-outlined mb-1"
        style={
          active
            ? { fontVariationSettings: "'FILL' 1" }
            : undefined
        }
      >
        {icon}
      </span>
      <span className="font-headline font-bold text-[10px] tracking-widest uppercase">
        {label}
      </span>
    </Link>
  )
}
