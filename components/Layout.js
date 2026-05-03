import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <Link href="/" className="text-2xl font-semibold text-gray-900">
            SafeHome
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        {children}
      </main>

      <footer className="border-t border-gray-100 mt-12">
        <div className="max-w-2xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          <p>Keeping your loved ones safe at home, with privacy in mind.</p>
        </div>
      </footer>
    </div>
  )
}
