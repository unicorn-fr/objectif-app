'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FiUser, FiMail, FiCalendar, FiAward, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { SessionUser, Objectif, Statistique } from '@/lib/types';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [objectifs, setObjectifs] = useState<Objectif[]>([]);
  const [stats, setStats] = useState<Statistique | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
    fetchObjectifs();
  }, []);

  useEffect(() => {
    if (objectifs.length > 0) {
      calculateStats();
    }
  }, [objectifs]);

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
    }
  };

  const fetchObjectifs = async () => {
    try {
      const response = await fetch('/api/objectifs');
      const data = await response.json();
      setObjectifs(data.objectifs || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const totalObjectifs = objectifs.length;
    const objectifsTermines = objectifs.filter(o => o.statut === 'termine').length;
    const objectifsEnCours = objectifs.filter(o => o.statut === 'en_cours').length;
    const tauxReussite = totalObjectifs > 0 ? (objectifsTermines / totalObjectifs) * 100 : 0;

    setStats({
      totalObjectifs,
      objectifsTermines,
      objectifsEnCours,
      totalTaches: 0,
      tachesCompletes: 0,
      tauxReussite,
      joursActifs: Math.floor((Date.now() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
    });
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Profil</h1>
          <p className="text-gray-600">Consultez vos informations et vos statistiques</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations personnelles */}
          <div className="lg:col-span-1">
            <Card>
              <div className="text-center">
                <div className="bg-primary-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiUser className="text-primary-600 text-4xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</h2>
                <div className="flex items-center justify-center gap-2 text-gray-600 mb-6">
                  <FiMail className="text-sm" />
                  <p className="text-sm">{user?.email}</p>
                </div>
                <Button variant="secondary" className="w-full mb-3">
                  Modifier le profil
                </Button>
                <Button variant="ghost" className="w-full">
                  Changer le mot de passe
                </Button>
              </div>
            </Card>
          </div>

          {/* Statistiques */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Mes Statistiques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 p-3 rounded-lg">
                    <FiTarget className="text-primary-600 text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total d'objectifs</p>
                    <p className="text-3xl font-bold text-gray-900">{stats?.totalObjectifs || 0}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FiAward className="text-green-600 text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Objectifs terminés</p>
                    <p className="text-3xl font-bold text-gray-900">{stats?.objectifsTermines || 0}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FiTrendingUp className="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Objectifs en cours</p>
                    <p className="text-3xl font-bold text-gray-900">{stats?.objectifsEnCours || 0}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FiCalendar className="text-purple-600 text-2xl" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Taux de réussite</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {Math.round(stats?.tauxReussite || 0)}%
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Badges et réalisations */}
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Badges & Réalisations</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats && stats.totalObjectifs >= 1 && (
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-3xl mb-2">🎯</div>
                    <p className="text-sm font-semibold text-gray-900">Premier Objectif</p>
                  </div>
                )}

                {stats && stats.objectifsTermines >= 1 && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl mb-2">✅</div>
                    <p className="text-sm font-semibold text-gray-900">Première Réussite</p>
                  </div>
                )}

                {stats && stats.objectifsTermines >= 5 && (
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-3xl mb-2">🏆</div>
                    <p className="text-sm font-semibold text-gray-900">Champion</p>
                  </div>
                )}

                {stats && stats.totalObjectifs >= 10 && (
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl mb-2">⭐</div>
                    <p className="text-sm font-semibold text-gray-900">Super Utilisateur</p>
                  </div>
                )}
              </div>

              {(!stats || stats.totalObjectifs === 0) && (
                <div className="text-center py-8 text-gray-500">
                  Créez des objectifs pour débloquer des badges !
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Objectifs récents */}
        {objectifs.length > 0 && (
          <div className="mt-8">
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Objectifs Récents</h3>
              <div className="space-y-4">
                {objectifs.slice(0, 5).map((objectif) => (
                  <div
                    key={objectif.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{objectif.titre}</h4>
                      <p className="text-sm text-gray-600">{objectif.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          objectif.statut === 'termine'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {objectif.statut === 'termine' ? 'Terminé' : 'En cours'}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        {Math.round(objectif.progression)}% complété
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
