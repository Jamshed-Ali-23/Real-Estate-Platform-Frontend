# ⚛️ Real Estate Platform - Frontend

Modern React frontend for the Real Estate Platform built with Vite.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=https://your-backend.herokuapp.com/api
VITE_SOCKET_URL=https://your-backend.herokuapp.com
VITE_APP_ENV=development
```

## 🚀 Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel deploy
```

### Option 2: Connect GitHub
1. Push to GitHub
2. Import project in Vercel Dashboard
3. Set environment variables
4. Deploy automatically on push

### Environment Variables in Vercel
Set these in Vercel Dashboard → Settings → Environment Variables:
- `VITE_API_URL` = Your Heroku backend URL
- `VITE_SOCKET_URL` = Your Heroku backend URL

## 📁 Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── chat/
│   │   ├── forms/
│   │   ├── layout/
│   │   └── ui/
│   ├── config/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Properties/
│   │   ├── Buy/
│   │   ├── Rent/
│   │   ├── Contact/
│   │   └── Admin/
│   ├── services/
│   ├── stores/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🛠 Tech Stack

- React 18
- Vite 5
- React Router DOM 6
- Zustand (State Management)
- TailwindCSS 3
- Framer Motion
- React Hook Form + Yup
- Axios
- Recharts
- React Hot Toast

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
