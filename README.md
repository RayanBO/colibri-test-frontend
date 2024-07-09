# TODOLIST

Test technique de Rayan RAVELONIRINA

## Table des matières

- [TODOLIST](#todolist)
  - [Table des matières](#table-des-matières)
  - [Introduction](#introduction)
  - [Fonctionnalités](#fonctionnalités)
  - [Installation](#installation)
  - [Points d'API](#points-dapi)
  - [Utilisation](#utilisation)
  - [Déploiement](#déploiement)
  - [Contributions](#contributions)
  - [Structure du projet](#structure-du-projet)
  - [Licence](#licence)

## Introduction

Bienvenue dans le projet Todo List ! Ce projet est une application de liste de tâches simple mais puissante, construite avec des technologies web modernes. L'application permet aux utilisateurs de créer, lire, mettre à jour et supprimer des tâches de manière efficace.

- **URL du projet :** [https://todo-colibri.web.app](https://todo-colibri.web.app)
- **Dépôt GitHub :** [https://github.com/RayanBO/colibri-test-frontend](https://github.com/RayanBO/colibri-test-frontend)

## Fonctionnalités

- Créer de nouvelles tâches
- Lire les tâches existantes
- Mettre à jour les tâches
- Supprimer les tâches

## Installation

1. Clonez le dépôt GitHub :

    ```bash
    git clone https://github.com/RayanBO/colibri-test-frontend.git
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd colibri-test-frontend
    ```

3. Installez les dépendances :

    ```bash
    npm install
    ```

## Points d'API

- **GET /api/todos** - Récupère toutes les tâches
- **POST /api/todos** - Crée une nouvelle tâche
- **PUT /api/todos/:id** - Met à jour une tâche existante
- **DELETE /api/todos/:id** - Supprime une tâche

```typescript
import { Todo } from '../types';

const apiUrl = 'https://sandy-zest-peach.glitch.me/api/todos';

export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch(apiUrl);
    return await response.json();
};

export const createTodo = async (todo: Partial<Todo>): Promise<Todo> => {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    return await response.json();
};

export const updateTodo = async (todo: Partial<Todo>): Promise<Todo> => {
    const response = await fetch(`${apiUrl}/${todo.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    return await response.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });
};
```

## Utilisation

1. Lancez le serveur de développement :

    ```bash
    npm start
    ```

2. Ouvrez votre navigateur et accédez à [http://localhost:3000](http://localhost:3000).

## Déploiement

Le projet est déployé sur Firebase à l'URL suivante : [https://todo-colibri.web.app](https://todo-colibri.web.app).

- **Console du projet :** [https://console.firebase.google.com/project/todo-colibri/overview](https://console.firebase.google.com/project/todo-colibri/overview)

Tout merge vers la branche `main` sera automatiquement déployé sur Firebase.

## Contributions

Les contributions sont les bienvenues ! Veuillez soumettre une pull request via GitHub.

## Structure du projet

```
colibri-test-frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   └── index.tsx
├── .gitignore
├── package.json
└── README.md
```

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails

---

ps : by Rayan Rav. ;)
