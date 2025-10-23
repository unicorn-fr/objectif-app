'use client';

import React from 'react';
import Link from 'next/link';
import { FiTarget, FiUser, FiLogOut } from 'react-icons/fi';

interface HeaderProps {
  user?: {
    name: string;
    email: string;
  } | null;
}

export default function Header({ user }: HeaderProps) {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={user ? '/dashboard' : '/'} className="flex items-center space-x-2">
            <FiTarget className="text-primary-600 text-3xl" />
            <span className="text-2xl font-bold text-gray-900">Objectif App</span>
          </Link>

          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <FiUser />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <FiLogOut />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Inscription
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
