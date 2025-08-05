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
cap-table-app/
├── app/
│   ├── layout.tsx              # Layout principal avec AuthProvider
│   ├── page.tsx                # Page d'accueil avec redirection
│   ├── login/page.tsx          # Page de connexion
│   ├── admin/dashboard/        # Dashboard administrateur
│   └── shareholder/dashboard/  # Dashboard actionnaire
├── components/
│   ├── ui/                     # Composants Shadcn UI
│   ├── AddShareholderModal.tsx # Modal d'ajout d'actionnaire
│   └── IssueSharesModal.tsx    # Modal d'émission d'actions
├── context/
│   └── AuthContext.tsx         # Contexte d'authentification
├── lib/
│   ├── auth.ts                 # Logique d'authentification
│   └── utils.ts                # Utilitaires
├── mocks/
│   ├── shareholders.ts         # Données mockées des actionnaires
│   ├── issuances.ts            # Données mockées des émissions
│   └── users.ts                # Données mockées des utilisateurs
├── types/
│   └── index.ts                # Types TypeScript
├── utils/
│   └── storage.ts              # Gestion du localStorage
└── __tests__/
    └── IssueSharesModal.test.tsx # Tests unitaires
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
```

3. **Démarrer en mode développement**

```bash
npm run dev
```

4. **Ouvrir dans le navigateur**

```
http://localhost:3000
```

## 🧪 Tests

### Lancer les tests

```bash
npm test
```

### Lancer les tests en mode watch

```bash
npm run test:watch
```

### Tests disponibles

- Tests unitaires pour `IssueSharesModal`
- Validation des formulaires
- Gestion des états de chargement
- Tests d'intégration des composants

## 🔐 Comptes de test

### Administrateur

- **Email:** admin@captable.com
- **Rôle:** admin

### Actionnaires

- **Email:** jean.dupont@example.com
- **Rôle:** shareholder

- **Email:** marie.martin@example.com
- **Rôle:** shareholder

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
npm run build    # Build de production
npm run start    # Démarrage en production
npm run lint     # Vérification ESLint
npm test         # Lancement des tests
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

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
