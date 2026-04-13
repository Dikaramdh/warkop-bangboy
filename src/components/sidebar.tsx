'use client';

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavigationItem {
  navigation: {
    name: string;
    href: string;
  }[]
}

export default function Sidebar({ navigation }: NavigationItem) {
  const pathname = usePathname()
  const router = useRouter()

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Redirect ke halaman login atau home setelah logout
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-amber-950 via-amber-900 to-amber-950 text-amber-50 flex flex-col justify-between border-r border-amber-700/40">
      <div>
        <div className="p-6 border-b border-amber-600/25">
          <h1 className="text-2xl font-semibold tracking-wide">Warkop Bangboy</h1>
          <p className="text-sm text-amber-200/80 mt-1">Admin Dashboard</p>
        </div>
        <nav className="mt-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'block mx-3 mb-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-amber-700/40',
                pathname === item.href ? 'bg-amber-600/55 text-amber-50' : 'text-amber-100/85'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6">
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
