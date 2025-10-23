'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import ProgressBar from '@/components/ui/ProgressBar';
import { FiPlus, FiTarget, FiCheckCircle, FiClock, FiTrash2, FiEdit } from 'react-icons/fi';
import { Objectif, Tache, SessionUser } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [objectifs, setObjectifs] = useState<Objectif[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedObjectif, setSelectedObjectif] = useState<Objectif | null>(null);
  const [showTachesModal, setShowTachesModal] = useState(false);
  const [taches, setTaches] = useState<Tache[]>([]);

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    situationActuelle: '',
    dateFinEstimee: '',
  });

  useEffect(() => {
    fetchUser();
    fetchObjectifs();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/objectifs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        setFormData({ titre: '', description: '', situationActuelle: '', dateFinEstimee: '' });
        fetchObjectifs();

        // Générer des tâches automatiques
        const data = await response.json();
        if (data.objectif) {
          await genererTachesAutomatiques(data.objectif.id, formData.titre);
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const genererTachesAutomatiques = async (objectifId: string, titre: string) => {
    const tachesParDefaut = [
      { titre: `Rechercher des informations sur ${titre}`, priorite: 'haute' },
      { titre: `Définir un plan d'action pour ${titre}`, priorite: 'haute' },
      { titre: `Identifier les ressources nécessaires`, priorite: 'moyenne' },
      { titre: `Établir les premières étapes concrètes`, priorite: 'moyenne' },
      { titre: `Fixer des jalons intermédiaires`, priorite: 'basse' },
    ];

    for (const tache of tachesParDefaut) {
      await fetch('/api/taches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objectifId, ...tache }),
      });
    }
  };

  const deleteObjectif = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet objectif ?')) return;

    try {
      await fetch(`/api/objectifs/${id}`, { method: 'DELETE' });
      fetchObjectifs();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const viewTaches = async (objectif: Objectif) => {
    setSelectedObjectif(objectif);
    try {
      const response = await fetch(`/api/taches?objectifId=${objectif.id}`);
      const data = await response.json();
      setTaches(data.taches || []);
      setShowTachesModal(true);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const toggleTache = async (tacheId: string, estComplete: boolean) => {
    try {
      await fetch(`/api/taches/${tacheId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estComplete: !estComplete }),
      });

      // Rafraîchir les tâches
      if (selectedObjectif) {
        const response = await fetch(`/api/taches?objectifId=${selectedObjectif.id}`);
        const data = await response.json();
        setTaches(data.taches || []);

        // Mettre à jour la progression
        const totalTaches = data.taches.length;
        const tachesCompletes = data.taches.filter((t: Tache) => t.estComplete).length;
        const progression = totalTaches > 0 ? (tachesCompletes / totalTaches) * 100 : 0;

        await fetch(`/api/objectifs/${selectedObjectif.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ progression }),
        });

        fetchObjectifs();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  const objectifsEnCours = objectifs.filter(o => o.statut === 'en_cours');
  const objectifsTermines = objectifs.filter(o => o.statut === 'termine');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête du dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue, {user?.name} !
          </h1>
          <p className="text-gray-600">
            Gérez vos objectifs et suivez votre progression
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center">
              <div className="bg-primary-100 p-3 rounded-lg">
                <FiTarget className="text-primary-600 text-2xl" />
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">Objectifs actifs</p>
                <p className="text-2xl font-bold text-gray-900">{objectifsEnCours.length}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <FiCheckCircle className="text-green-600 text-2xl" />
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">Objectifs terminés</p>
                <p className="text-2xl font-bold text-gray-900">{objectifsTermines.length}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FiClock className="text-purple-600 text-2xl" />
              </div>
              <div className="ml-4">
                <p className="text-gray-600 text-sm">Taux de réussite</p>
                <p className="text-2xl font-bold text-gray-900">
                  {objectifs.length > 0
                    ? Math.round((objectifsTermines.length / objectifs.length) * 100)
                    : 0}%
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Bouton nouvel objectif */}
        <div className="mb-6">
          <Button
            onClick={() => setShowModal(true)}
            variant="primary"
            size="lg"
            className="flex items-center gap-2"
          >
            <FiPlus /> Créer un nouvel objectif
          </Button>
        </div>

        {/* Liste des objectifs */}
        {objectifsEnCours.length === 0 && objectifsTermines.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <FiTarget className="text-gray-400 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Aucun objectif pour le moment
              </h3>
              <p className="text-gray-600 mb-6">
                Commencez par créer votre premier objectif !
              </p>
              <Button onClick={() => setShowModal(true)}>
                Créer mon premier objectif
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {objectifsEnCours.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Objectifs en cours
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {objectifsEnCours.map((objectif) => (
                    <Card key={objectif.id} hover>
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {objectif.titre}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {objectif.description}
                        </p>
                        <ProgressBar progress={objectif.progression} />
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          onClick={() => viewTaches(objectif)}
                          variant="primary"
                          size="sm"
                        >
                          Voir les tâches
                        </Button>
                        <Button
                          onClick={() => deleteObjectif(objectif.id)}
                          variant="danger"
                          size="sm"
                        >
                          <FiTrash2 />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {objectifsTermines.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Objectifs terminés
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {objectifsTermines.map((objectif) => (
                    <Card key={objectif.id}>
                      <div className="opacity-75">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {objectif.titre}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {objectif.description}
                        </p>
                        <div className="mt-4">
                          <ProgressBar progress={100} color="success" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal création objectif */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Créer un nouvel objectif"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Titre de l'objectif"
            placeholder="Ex: Apprendre le développement web"
            value={formData.titre}
            onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
            required
          />

          <Textarea
            label="Description"
            placeholder="Décrivez votre objectif en détail..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />

          <Textarea
            label="Situation actuelle"
            placeholder="Où en êtes-vous actuellement ?"
            value={formData.situationActuelle}
            onChange={(e) => setFormData({ ...formData, situationActuelle: e.target.value })}
            required
            rows={3}
          />

          <Input
            label="Date d'échéance estimée"
            type="date"
            value={formData.dateFinEstimee}
            onChange={(e) => setFormData({ ...formData, dateFinEstimee: e.target.value })}
          />

          <div className="flex gap-4">
            <Button type="submit" variant="primary" className="flex-1">
              Créer l'objectif
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowModal(false)}
              className="flex-1"
            >
              Annuler
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal tâches */}
      <Modal
        isOpen={showTachesModal}
        onClose={() => setShowTachesModal(false)}
        title={`Tâches - ${selectedObjectif?.titre}`}
      >
        <div className="space-y-3">
          {taches.length === 0 ? (
            <p className="text-gray-600 text-center py-4">
              Aucune tâche pour cet objectif
            </p>
          ) : (
            taches.map((tache) => (
              <div
                key={tache.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  tache.estComplete
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => toggleTache(tache.id, tache.estComplete)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {tache.estComplete ? (
                      <FiCheckCircle className="text-green-600 text-xl" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${tache.estComplete ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {tache.titre}
                    </p>
                    {tache.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {tache.description}
                      </p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        tache.priorite === 'haute' ? 'bg-red-100 text-red-700' :
                        tache.priorite === 'moyenne' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {tache.priorite}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-6">
          <Button
            onClick={() => setShowTachesModal(false)}
            variant="secondary"
            className="w-full"
          >
            Fermer
          </Button>
        </div>
      </Modal>
    </div>
  );
}
