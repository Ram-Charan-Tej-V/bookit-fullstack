import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">BookIt</Link>
          <nav>
            <Link to="/" className="mr-4">Home</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
