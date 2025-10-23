'use client';

import React from 'react';
import Link from 'next/link';
import { FiTarget, FiCheckCircle, FiTrendingUp, FiUsers, FiZap, FiAward } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FiTarget className="text-primary-600 text-3xl" />
              <span className="text-2xl font-bold text-gray-900">Objectif App</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Connexion
              </Link>
              <Link
                href="/auth/register"
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
              >
                Commencer gratuitement
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Atteignez vos objectifs avec confiance
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              La plateforme intelligente qui transforme vos ambitions en réalisations concrètes grâce à un suivi personnalisé et des tâches adaptées.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl"
              >
                Démarrer maintenant
              </Link>
              <Link
                href="/auth/login"
                className="bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white"
              >
                Voir la démo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Objectif App ?
            </h2>
            <p className="text-xl text-gray-600">
              Des outils puissants pour vous accompagner vers le succès
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTarget className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Définissez vos objectifs</h3>
              <p className="text-gray-600">
                Clarifiez vos ambitions et créez un plan d'action personnalisé pour les atteindre.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tâches intelligentes</h3>
              <p className="text-gray-600">
                Recevez des tâches quotidiennes adaptées à votre objectif et votre progression.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="text-purple-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suivez votre progression</h3>
              <p className="text-gray-600">
                Visualisez vos progrès en temps réel avec des statistiques détaillées.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiZap className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Restez motivé</h3>
              <p className="text-gray-600">
                Des rappels et encouragements pour maintenir votre motivation au quotidien.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="text-yellow-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Célébrez vos réussites</h3>
              <p className="text-gray-600">
                Débloquez des badges et suivez votre parcours de réussite.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-red-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Communauté engagée</h3>
              <p className="text-gray-600">
                Rejoignez une communauté de personnes ambitieuses comme vous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à transformer vos rêves en réalité ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Rejoignez des milliers d'utilisateurs qui ont déjà atteint leurs objectifs.
          </p>
          <Link
            href="/auth/register"
            className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl inline-block"
          >
            Créer mon compte gratuitement
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FiTarget className="text-primary-600 text-3xl" />
              <span className="text-2xl font-bold text-white">Objectif App</span>
            </div>
            <p className="text-gray-500">
              © 2024 Objectif App. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
