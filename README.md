<<<<<<< HEAD
# 🎬 TMDB Movie App (React)

A simple movie browser app built with React, using The Movie Database (TMDB) API. Features include login via TMDB credentials, session-based authentication, movie list, search, pagination, and logout. Built with clean MVVM architecture and dependency injection.

---

## 🧩 Features

- ✅ Login with TMDB credentials
- ✅ Form validation with Formik & Yup
- ✅ Session-based auth using `session_id` from TMDB
- ✅ Movie list display (with posters)
- ✅ Pagination & search movies
- ✅ MVVM architecture pattern
- ✅ Global API instance with Axios & interceptors
- ✅ Logout & auth guard
- ✅ Responsive grid layout

---

## 📦 Tech Stack

- **React 18+**
- **React Router v6**
- **Axios** with interceptors
- **Zustand** for global auth state
- **Formik + Yup** for form & validation
- **MVVM Pattern** (Models, ViewModels, Views)
- **TMDB API** integration

---

## 📁 Project Structure (Simplified)

```
src/
├── api/               # Axios instance with interceptors
├── components/        # Reusable components (Navbar, etc)
├── di/                # Dependency injection container
├── models/            # sessionModel: API call logic
├── services/          # Service abstractions (if any)
├── store/             # Zustand store (authStore)
├── viewmodels/        # loginVM: business logic
├── views/             # LoginView, HomeView
└── App.jsx            # Router & global layout
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/react-tmdb-app.git
cd react-tmdb-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

### 4. Run the project

```bash
npm run dev
```

> App will be running on `http://localhost:5173`

---

## 🔐 Authentication Flow

1. User logs in with **TMDB username & password**
2. `request_token` is requested from `/authentication/token/new`
3. Token is validated with login (`/token/validate_with_login`)
4. If successful, `session_id` is created and stored in `localStorage`
5. All further requests include `session_id`

---

## 🧪 Development Tips

- All TMDB requests go through Axios instance in `src/api/tmdbApi.js`
- Auth state is globally handled in `authStore.js`
- DI via `useDI()` hook in components/views
- Movie listing uses `sessionModel.getMovieList(...)`

---

## 📝 License

MIT © [Indramawan, Buyung]
=======
# react_tmdb_movieapp