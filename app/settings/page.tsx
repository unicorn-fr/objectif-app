'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { FiBell, FiLock, FiGlobe, FiMoon, FiUser } from 'react-icons/fi';
import { SessionUser } from '@/lib/types';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    darkMode: false,
    language: 'fr',
  });

  useEffect(() => {
    fetchUser();
    loadSettings();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        router.push('/auth/login');
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const saveSettings = (newSettings: typeof settings) => {
    setSettings(newSettings);
    localStorage.setItem('appSettings', JSON.stringify(newSettings));
  };

  const handleToggle = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    saveSettings(newSettings);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
          <p className="text-gray-600">Gérez vos préférences et paramètres de compte</p>
        </div>

        {/* Profil */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <FiUser className="text-primary-600 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-900">Informations du profil</h2>
          </div>

          <div className="space-y-4">
            <Input label="Nom complet" value={user?.name || ''} disabled />
            <Input label="Email" type="email" value={user?.email || ''} disabled />
            <p className="text-sm text-gray-500">
              Pour modifier vos informations, contactez le support.
            </p>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <FiBell className="text-primary-600 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Notifications push</h3>
                <p className="text-sm text-gray-600">
                  Recevez des notifications pour les tâches et les objectifs
                </p>
              </div>
              <button
                onClick={() => handleToggle('notifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Notifications par email</h3>
                <p className="text-sm text-gray-600">
                  Recevez des résumés hebdomadaires par email
                </p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* Apparence */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <FiMoon className="text-primary-600 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-900">Apparence</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Mode sombre</h3>
                <p className="text-sm text-gray-600">
                  Activez le thème sombre pour un confort visuel accru
                </p>
              </div>
              <button
                onClick={() => handleToggle('darkMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.darkMode ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* Langue */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <FiGlobe className="text-primary-600 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-900">Langue et région</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Langue de l'interface
              </label>
              <select
                value={settings.language}
                onChange={(e) => saveSettings({ ...settings, language: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Sécurité */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <FiLock className="text-primary-600 text-2xl" />
            <h2 className="text-xl font-semibold text-gray-900">Sécurité</h2>
          </div>

          <div className="space-y-4">
            <Button variant="secondary" className="w-full">
              Changer le mot de passe
            </Button>
            <Button variant="danger" className="w-full">
              Supprimer mon compte
            </Button>
          </div>
        </Card>

        {/* Sauvegarder */}
        <div className="flex gap-4">
          <Button variant="primary" className="flex-1">
            Enregistrer les modifications
          </Button>
          <Button variant="ghost" className="flex-1" onClick={() => router.push('/dashboard')}>
            Annuler
          </Button>
        </div>
      </main>
    </div>
  );
}
