# Guide de Test - Objectif App

Le serveur est maintenant lancé et 100% fonctionnel ! 🚀

## URL d'accès
**http://localhost:3000**

---

## Corrections effectuées

✅ **Routes API dynamiques** : Corrigé l'utilisation asynchrone de `params` dans Next.js 14
✅ **Variables d'environnement** : Ajout du fichier `.env.local` avec JWT_SECRET
✅ **Configuration TypeScript** : Chemins d'alias configurés (`@/*`)
✅ **Build** : Compilation réussie sans erreurs

---

## Test Complet - Étape par Étape

### 1. 📄 Landing Page
- Ouvrez http://localhost:3000
- **Testez** :
  - ✅ Navigation responsive (redimensionnez la fenêtre)
  - ✅ Clic sur "Commencer gratuitement" → redirige vers inscription
  - ✅ Clic sur "Connexion" → redirige vers login
  - ✅ Clic sur "Voir la démo" → redirige vers login

### 2. 🔐 Connexion
- Allez sur http://localhost:3000/auth/login
- **Testez avec le compte démo** :
  - Email : `demo@objectif.app`
  - Mot de passe : `password123`
- **Testez** :
  - ✅ Message d'erreur si mauvais identifiants
  - ✅ Redirection vers dashboard après connexion réussie
  - ✅ Lien vers inscription fonctionne

### 3. ✍️ Inscription (optionnel)
- Allez sur http://localhost:3000/auth/register
- **Testez** :
  - ✅ Validation des champs (nom, email, mot de passe)
  - ✅ Vérification que les mots de passe correspondent
  - ✅ Message d'erreur si email déjà utilisé
  - ✅ Connexion automatique après inscription

### 4. 🏠 Dashboard
- Après connexion, vous êtes sur http://localhost:3000/dashboard
- **Testez** :
  - ✅ Statistiques affichées (objectifs actifs, terminés, taux de réussite)
  - ✅ Bouton "Créer un nouvel objectif"
  - ✅ Header avec votre nom d'utilisateur
  - ✅ Liens vers Profil et Déconnexion

### 5. ➕ Créer un Objectif
- Cliquez sur "Créer un nouvel objectif"
- **Testez** :
  - ✅ Modal s'ouvre correctement
  - ✅ Formulaire avec tous les champs
  - Remplissez :
    - **Titre** : "Apprendre Next.js"
    - **Description** : "Maîtriser Next.js 14 et TypeScript"
    - **Situation actuelle** : "Débutant, connais React"
    - **Date d'échéance** : Choisissez une date future
  - ✅ Cliquez "Créer l'objectif"
  - ✅ Modal se ferme
  - ✅ Objectif apparaît dans la liste
  - ✅ **5 tâches générées automatiquement** !

### 6. ✅ Gérer les Tâches
- Cliquez sur "Voir les tâches" sur votre objectif
- **Testez** :
  - ✅ Modal affiche les 5 tâches générées
  - ✅ Badges de priorité (haute, moyenne, basse) affichés
  - ✅ Cliquez sur une tâche → elle devient verte avec ✓
  - ✅ Cliquez à nouveau → elle redevient non cochée
  - ✅ La barre de progression se met à jour automatiquement !
  - ✅ Cochez toutes les tâches → progression à 100%

### 7. 📊 Profil Utilisateur
- Cliquez sur votre nom dans le header → "Profil"
- Ou allez sur http://localhost:3000/profile
- **Testez** :
  - ✅ Statistiques détaillées affichées
  - ✅ Badges débloqués si vous avez créé des objectifs
  - ✅ Liste des objectifs récents
  - ✅ Boutons "Modifier le profil" et "Changer le mot de passe"

### 8. ⚙️ Paramètres
- Allez sur http://localhost:3000/settings
- **Testez** :
  - ✅ Toggle notifications (on/off)
  - ✅ Toggle notifications email
  - ✅ Toggle mode sombre
  - ✅ Sélection de langue (Français, English, Español)
  - ✅ Paramètres sauvegardés dans localStorage

### 9. 🗑️ Supprimer un Objectif
- Retournez au Dashboard
- **Testez** :
  - ✅ Cliquez sur l'icône poubelle rouge
  - ✅ Confirmation demandée
  - ✅ Objectif supprimé
  - ✅ Statistiques mises à jour

### 10. 🚪 Déconnexion
- Cliquez sur "Déconnexion" dans le header
- **Testez** :
  - ✅ Redirection vers la landing page
  - ✅ Impossible d'accéder au dashboard sans connexion
  - ✅ Réessayez de vous reconnecter

---

## Tests Responsive

### Mobile (< 768px)
- Ouvrez les DevTools (F12)
- Activez le mode responsive
- **Testez** :
  - ✅ Header s'adapte
  - ✅ Grilles passent en 1 colonne
  - ✅ Boutons restent lisibles
  - ✅ Formulaires utilisables

### Tablette (768px - 1024px)
- **Testez** :
  - ✅ Grilles en 2 colonnes
  - ✅ Navigation fluide

### Desktop (> 1024px)
- **Testez** :
  - ✅ Grilles en 3 colonnes
  - ✅ Layout optimal

---

## Fonctionnalités Avancées à Tester

### 11. 📈 Progression Automatique
1. Créez un objectif
2. Ouvrez les tâches
3. Cochez 2 tâches sur 5
4. Fermez le modal
5. **Vérifiez** : La barre de progression affiche 40% ✅

### 12. 🏆 Système de Badges
1. Créez votre 1er objectif → Badge "Premier Objectif" 🎯
2. Marquez un objectif comme terminé → Badge "Première Réussite" ✅
3. Créez 5 objectifs terminés → Badge "Champion" 🏆
4. Créez 10 objectifs → Badge "Super Utilisateur" ⭐

### 13. 💾 Persistance des Données
- **Actuellement** : Base de données en mémoire
- **Comportement** :
  - Les données persistent pendant que le serveur tourne
  - Si vous redémarrez le serveur, les données créées sont perdues
  - Le compte démo reste toujours disponible

---

## Vérification de Sécurité

✅ **Mots de passe hashés** avec bcryptjs
✅ **Sessions JWT** avec expiration 7 jours
✅ **Cookies HTTP-only** pour la sécurité
✅ **Routes API protégées** (nécessite authentification)
✅ **Validation des données** côté serveur

---

## Problèmes Possibles et Solutions

### Le serveur ne démarre pas
```bash
# Vérifiez que le port 3000 est libre
lsof -ti:3000 | xargs kill -9

# Relancez
npm run dev
```

### Erreur "Module not found"
```bash
# Réinstallez les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Les modifications ne s'affichent pas
- Videz le cache du navigateur (Ctrl+Shift+R)
- Vérifiez que le serveur est bien lancé

---

## État du Serveur

🟢 **SERVEUR ACTIF** : http://localhost:3000
⚡ **Next.js 14.1.0** en mode développement
🔐 **Variables d'environnement** : .env.local chargé
✅ **Build** : Compilation réussie sans erreurs

---

## Prochaines Étapes

Pour une utilisation en production :

1. **Base de données persistante** :
   - Migrer vers Prisma + PostgreSQL
   - Ou utiliser MongoDB avec Mongoose

2. **Déploiement** :
   - Vercel (recommandé pour Next.js)
   - Netlify
   - Railway
   - AWS/Azure/GCP

3. **Fonctionnalités futures** :
   - Notifications push réelles
   - Graphiques de progression
   - Mode collaboratif
   - Application mobile

---

🎉 **Bon test !** 🎉

Tous les boutons et fonctionnalités sont maintenant opérationnels. N'hésitez pas à explorer et tester toutes les features !
