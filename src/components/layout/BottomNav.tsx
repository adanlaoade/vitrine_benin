import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Accueil', icon: '🏠' },
  { to: '/trouver', label: 'Trouver', icon: '🔍' },
  { to: '/demandes', label: 'Demandes', icon: '📋' },
  { to: '/mon-espace', label: 'Mon espace', icon: '👤' },
] as const

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface safe-bottom"
      aria-label="Navigation principale"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around">
        {navItems.map((item) => (
          <li key={item.to} className="flex-1">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                [
                  'flex min-h-14 flex-col items-center justify-center gap-0.5 px-2 py-2 text-xs font-medium transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-text-muted hover:text-primary',
                ].join(' ')
              }
              end={item.to === '/'}
            >
              <span className="text-lg" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
