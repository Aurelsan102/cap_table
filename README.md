# Cap Table - Application de Gestion de Table de Capitalisation

Une application Next.js moderne pour la gestion de table de capitalisation (cap-table) avec authentification et rôles utilisateur.

## 🧑‍💻 Aperçu technique & décisions architecturales

- **Architecture monolithique Next.js** avec App Router, séparation claire des rôles (admin/shareholder) via context et middleware.
- **Design System** : Shadcn UI pour la cohérence visuelle, Tailwind CSS pour le responsive et la rapidité de prototypage.
- **Gestion d’état** : Context API pour l’authentification, hooks personnalisés pour la détection mobile.
- **Mock Data** : Utilisation de mocks pour les actionnaires, émissions et utilisateurs, facilitant le développement sans backend.
- **Sécurité** : Stockage local sécurisé pour l’auth, protection des routes côté client et middleware Next.js.

## ⚙️ Conditions préalables

- Node.js >= 18
- pnpm ou npm installé
- Accès à un navigateur moderne

## 🛠️ Installation et démarrage LOCAL

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd captable
   ```

````
2. **Installer les dépendances**
   ```bash
pnpm install
# ou
npm install
````

3. **Démarrer le serveur de développement**
   ```bash
   pnpm dev
   ```

# ou

npm run dev

```
4. **Accéder à l’application**
```

http://localhost:3000

```

## 🤖 Outils d’IA utilisés

- **Cursor’s Chat** (génération de code, accélération des tâches)
- **GitHub Copilot** (autocomplétion, génération de composants)
- **ChatGPT** (brainstorming, documentation)
- **Gemini Avancé** (payloads, structuration des tests)

## ⚡ Instructions clés pour accélérer le travail

- Génération automatique de composants UI avec Shadcn CLI (`npx shadcn-ui@latest add <component>`)
- Prompts structurés pour la génération de hooks, contextes et tests unitaires
- Instructions pour la création de payloads mockés et la validation des formulaires
- Utilisation de la commande `Copilot: Generate tests for file` pour accélérer la couverture de tests

## 🎨 Système de design et règles pour l’IA

- **Design tokens** : Tailwind CSS & Shadcn UI pour la cohérence des couleurs, typographies et espacements.
- **Structure des composants** : Tous les composants UI sont générés via Shadcn et organisés dans `/components/ui`.
- **Règles pour l’IA** : Générer des composants réutilisables, respecter la structure du dossier, utiliser le typage TypeScript strict, et suivre les conventions de nommage.

## 📦 Payloads attendus du backend (frontend uniquement)

- **Actionnaires** : `{ id, name, email, totalShares, percentage }`
- **Émissions** : `{ id, shareholderId, numberOfShares, date, price, certificateUrl }`
- **Utilisateurs** : `{ id, email, role, name }`

---

## 🚀 Autres Technologies utilisées

- **Recharts** pour les graphiques
- **Jest + React Testing Library** pour les tests
- **Axios** pour les requêtes HTTP (préparé pour l'API)

## 👥 Fonctionnalités

### Authentification

- Connexion avec email et rôle (admin/shareholder)
- Stockage sécurisé dans localStorage
- Redirection automatique selon le rôle
- Protection des routes avec middleware

### Dashboard Administrateur

- Vue d'ensemble de tous les actionnaires
- Graphique en camembert de la répartition des actions
- Ajout de nouveaux actionnaires
- Émission de nouvelles actions
- Historique complet des émissions
- Calculs automatiques de dilution

### Dashboard Actionnaire

- Informations personnelles
- Vue de ses participations
- Historique de ses émissions
- Téléchargement de certificats simulés

## 📁 Structure du projet

```

captable/
├── app/ # Dossier principal de l'application Next.js
│ ├── layout.tsx # Layout principal de l'application
│ ├── page.tsx # Page d'accueil
│ ├── dashboard/ # Dashboard
│ │ ├── admin/ # Dashboard administrateur
│ │ └── shareholder/ # Dashboard actionnaire
│ ├── login/ # Authentification
│ │ └── page.tsx # Page de connexion
│ └── globals.css # Styles globaux
│
├── components/ # Composants React
│ ├── ui/ # Composants UI Shadcn
│ └── (autres composants personnalisés)
│
├── context/ # Contextes React
│ └── AuthContext.tsx # Contexte d'authentification
│
├── hooks/ # Hooks personnalisés
│ └── use-mobile.ts # Détection des appareils mobiles
│
├── lib/ # Bibliothèques et outils
│ ├── auth.ts # Logique d'authentification
│ └── utils.ts # Utilitaires
│
├── mocks/ # Données de test
│ ├── issuances.ts # Données des émissions
│ ├── shareholders.ts # Données des actionnaires
│ └── users.ts # Données des utilisateurs
│
├── utils/ # Utilitaires
│ └── storage.ts # Stockage sécurisé
│
├── **tests**/ # Tests unitaires
│ └── IssueSharesModal.test.tsx # Tests unitaires
│
├── .gitignore # Fichiers ignorés par Git
├── components.json # Configuration des composants Shadcn
├── jest.config.js # Configuration de Jest
├── jest.setup.js # Configuration des tests
├── next.config.js # Configuration Next.js
├── package.json # Dépendances et scripts
└── README.md # Ce fichier

````

## 🔐 Comptes de test

### Administrateur

- **Email:** admin@captable.com
- **Rôle:** administrateur

### Actionnaires

- **Email:** jean.dupont@example.com
- **Rôle:** actionnaire

- **Email:** marie.martin@example.com
- **Rôle:** actionnaire

## 📊 Données mockées

Le projet utilise des données mockées pour le développement :

### Actionnaires

- 8 actionnaires avec des participations variées
- Calculs automatiques de pourcentages
- Gestion de la dilution lors de nouvelles émissions

### Émissions

- Historique des émissions d'actions
- Prix et dates d'émission
- Certificats simulés pour téléchargement


## 🔧 Scripts disponibles

```bash
npm run dev      # Démarrage en mode développement
pnpm run dev      # Démarrage en mode développement
npm run build    # Build de production
pnpm run build    # Build de production
npm run start    # Démarrage en production
pnpm run start    # Démarrage en production
npm run lint     # Vérification ESLint
pnpm run lint     # Vérification ESLint
npm test         # Lancement des tests
pnpm test         # Lancement des tests
```

## 🚀 Déploiement

L'application est prête pour le déploiement sur Vercel ou toute autre plateforme supportant Next.js.

## 📝 Prochaines améliorations

- [ ] Intégration d'une vraie API backend
- [ ] Base de données persistante
- [ ] Notifications en temps réel
- [ ] Export PDF des rapports
- [ ] Gestion des droits d'action
- [ ] Historique des transactions plus détaillé
- [ ] Graphiques avancés et analytics
````
