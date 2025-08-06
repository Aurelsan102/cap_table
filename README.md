# Cap Table - Application de Gestion de Table de Capitalisation

Une application Next.js moderne pour la gestion de table de capitalisation (cap-table) avec authentification et rôles utilisateur.

## 🚀 Technologies utilisées

- **Next.js 15** avec App Router
- **React 19** avec hooks modernes
- **TypeScript** pour le typage statique
- **Tailwind CSS 4** pour le styling
- **Shadcn UI** pour les composants
- **Recharts** pour les graphiques
- **Jest + React Testing Library** pour les tests
- **Axios** pour les requêtes HTTP (préparé pour l'API)

## IA pour le développement

- **ChatGPT** pour le brainstorming
- **Cursor AI** pour le développement

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
├── app/                        # Dossier principal de l'application Next.js
│   ├── layout.tsx              # Layout principal de l'application
│   ├── page.tsx                # Page d'accueil
│   ├── dashboard/              # Dashboard
│   │   ├── admin/              # Dashboard administrateur
│   │   └── shareholder/        # Dashboard actionnaire
│   ├── login/                  # Authentification
│   │   └── page.tsx            # Page de connexion
│   └── globals.css             # Styles globaux
│
├── components/                 # Composants React
│   ├── ui/                     # Composants UI Shadcn
│   └── (autres composants personnalisés)
│
├── context/                    # Contextes React
│   └── AuthContext.tsx         # Contexte d'authentification
│
├── hooks/                      # Hooks personnalisés
│   └── use-mobile.ts           # Détection des appareils mobiles
│
├── lib/                        # Bibliothèques et outils
│   ├── auth.ts                 # Logique d'authentification
│   └── utils.ts                # Utilitaires
│
├── mocks/                      # Données de test
│   ├── issuances.ts            # Données des émissions
│   ├── shareholders.ts         # Données des actionnaires
│   └── users.ts                # Données des utilisateurs
│
├── utils/                      # Utilitaires
│   └── storage.ts              # Stockage sécurisé
│
├── __tests__/                  # Tests unitaires
│   └── IssueSharesModal.test.tsx     # Tests unitaires
│
├── .gitignore                  # Fichiers ignorés par Git
├── components.json             # Configuration des composants Shadcn
├── jest.config.js              # Configuration de Jest
├── jest.setup.js               # Configuration des tests
├── next.config.js              # Configuration Next.js
├── package.json                # Dépendances et scripts
└── README.md                   # Ce fichier
```

## 🛠️ Installation et démarrage

1. **Cloner le projet**

```bash
git clone <repository-url>
cd captable
```

2. **Installer les dépendances**

```bash
npm install
pnpm install
```

3. **Démarrer en mode développement**

```bash
npm run dev
pnpm dev
```

4. **Ouvrir dans le navigateur**

```
http://localhost:3000
```

## 🧪 Tests

### Lancer les tests

```bash
npm test
pnpm test
```

### Lancer les tests en mode watch

```bash
npm run test:watch
pnpm run test:watch
```

### Tests disponibles

- Tests unitaires pour `IssueSharesModal`
- Validation des formulaires
- Gestion des états de chargement
- Tests d'intégration des composants

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

## 🎨 Interface utilisateur

- Design moderne avec Tailwind CSS
- Composants réutilisables avec Shadcn UI
- Graphiques interactifs avec Recharts
- Responsive design pour mobile et desktop
- États de chargement et gestion d'erreurs

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
