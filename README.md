# Objectif App - Plateforme SaaS de Gestion d'Objectifs

Une plateforme web moderne et complète pour gérer vos objectifs, suivre votre progression et atteindre vos ambitions.

## Fonctionnalités

### Authentification
- Inscription et connexion sécurisées
- Gestion de session avec JWT
- Hashage des mots de passe avec bcryptjs
- Compte de démonstration inclus

### Gestion d'Objectifs
- Créer, modifier et supprimer des objectifs
- Définir une situation actuelle et une date d'échéance
- Suivi de progression en temps réel
- Statuts : en cours, terminé, abandonné

### Système de Tâches
- Génération automatique de tâches intelligentes
- Système de priorités (haute, moyenne, basse)
- Cocher/décocher les tâches pour suivre l'avancement
- Mise à jour automatique de la progression

### Dashboard
- Vue d'ensemble de tous vos objectifs
- Statistiques en temps réel
- Taux de réussite calculé automatiquement
- Interface intuitive et moderne

### Profil Utilisateur
- Statistiques détaillées
- Système de badges et réalisations
- Historique des objectifs
- Visualisation de la progression

### Paramètres
- Gestion des notifications
- Préférences d'apparence (mode sombre)
- Choix de la langue
- Sécurité du compte

## Technologies Utilisées

- **Framework**: Next.js 14 (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Authentification**: JWT + Cookies HTTP-only
- **Icônes**: React Icons (Feather Icons)
- **Sécurité**: bcryptjs pour le hashage

## Installation

1. Cloner le repository :
\`\`\`bash
git clone https://github.com/unicorn-fr/objectif-app.git
cd objectif-app
\`\`\`

2. Installer les dépendances :
\`\`\`bash
npm install
\`\`\`

3. Lancer le serveur de développement :
\`\`\`bash
npm run dev
\`\`\`

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Compte de Démonstration

Pour tester rapidement l'application :
- **Email**: demo@objectif.app
- **Mot de passe**: password123

## Structure du Projet

\`\`\`
objectif-app/
├── app/
│   ├── api/              # Routes API
│   │   ├── auth/         # Authentification
│   │   ├── objectifs/    # CRUD objectifs
│   │   └── taches/       # CRUD tâches
│   ├── auth/             # Pages authentification
│   ├── dashboard/        # Page dashboard
│   ├── profile/          # Page profil
│   ├── settings/         # Page paramètres
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Landing page
├── components/
│   ├── layout/           # Composants de mise en page
│   └── ui/               # Composants UI réutilisables
├── lib/
│   ├── auth.ts           # Utilitaires authentification
│   ├── db.ts             # Simulation base de données
│   └── types/            # Types TypeScript
└── public/               # Assets statiques
\`\`\`

## Scripts Disponibles

- \`npm run dev\` - Lancer le serveur de développement
- \`npm run build\` - Créer un build de production
- \`npm run start\` - Lancer le serveur de production

## Prochaines Évolutions

- [ ] Intégration d'une vraie base de données (Prisma + PostgreSQL)
- [ ] Système de notifications push
- [ ] Partage d'objectifs avec d'autres utilisateurs
- [ ] Graphiques de progression avancés
- [ ] Application mobile (React Native)
- [ ] Intégration IA pour suggestions de tâches personnalisées
- [ ] Export de données (PDF, CSV)
- [ ] Mode collaboratif pour objectifs d'équipe

## Base de Données

Actuellement, l'application utilise une base de données en mémoire pour simplifier le développement. Pour passer en production, il est recommandé de :

1. Configurer Prisma avec PostgreSQL
2. Créer les schémas de base de données
3. Migrer les fonctions de \`lib/db.ts\` vers Prisma

## Sécurité

- Les mots de passe sont hashés avec bcryptjs (10 rounds)
- Les sessions utilisent JWT avec expiration de 7 jours
- Les cookies sont HTTP-only et sécurisés en production
- Validation des données côté serveur

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

MIT

## Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

Développé avec ❤️ par Claude Code
