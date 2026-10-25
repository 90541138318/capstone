# TaskFlow

A simple task manager built with React and Firebase. Create lists, add tasks to each list with a priority, tick them off as you go, and watch your progress. Everything syncs in real time through Cloud Firestore.

## Features

- Create and delete lists
- Add tasks to a list with a priority (High, Medium, Low)
- Tasks are sorted by priority and color coded
- Mark tasks complete or undo them
- Show or hide completed tasks
- Progress bar showing how much of a list is done
- Real-time updates with Firestore (changes appear without refreshing)
- Responsive layout that works on desktop and mobile

## Tech Stack

- [React](https://react.dev/) with [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) for navigation
- [React Bootstrap](https://react-bootstrap.github.io/) and Bootstrap 5 for UI
- [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore) for the database
- React Context API for shared state

## Project Structure

```
src/
  components/
    Card.jsx
    Footer.jsx
    Listform.jsx
    Navbar.jsx
  context/
    firebase.js         # Firebase initialization
    firebaseCrud.js     # Firestore read/write functions
    Listcontext.jsx     # React context provider
  pages/
    Home.jsx
    Lists.jsx           # All lists
    Listpage.jsx        # One list and its tasks
  App.jsx               # Routes and layout
  main.jsx              # App entry point
  index.css             # Global styles
```

## Data Model

Tasks are stored as a subcollection inside each list:

```
lists/{listId}
  name: string
  createdAt: timestamp

lists/{listId}/items/{itemId}
  task: string
  priority: "High" | "Medium" | "Low"
  completed: boolean
  createdAt: timestamp
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- A Firebase project with Firestore enabled

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Add your Firebase configuration in `src/context/firebase.js`:
   ```js
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT.firebasestorage.app",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   ```
   You can find these values in the Firebase console under Project settings, then Your apps.

4. In the Firebase console, go to Build, then Firestore Database, and create a database in the `(default)` location.

5. Start the dev server:
   ```bash
   npm run dev
   ```
   Open the URL shown in the terminal (usually http://localhost:5173).

### Firestore Rules

For development, you can use these rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /lists/{listId} {
      allow read, write: if true;
      match /items/{itemId} {
        allow read, write: if true;
      }
    }
  }
}
```

These rules let anyone read and write your data. Use them for testing only, and add authentication before deploying publicly.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Roadmap

- User login with Firebase Authentication
- Per-user lists and stricter security rules
- Due dates and task descriptions
- Edit existing tasks and rename lists
- Dark mode

## License

This project is for learning purposes. Add a license of your choice if you plan to share it.