# 🌿 Harvesta — Smart Agriculture Management Platform

A full-stack agricultural management platform with a futuristic dark UI, built with React + Express + MongoDB.

## 🏗️ Tech Stack

### Frontend
- **React 19** + **Vite 8** — Lightning-fast dev & build
- **Tailwind CSS 3** — Utility-first styling
- **Framer Motion** — Smooth page transitions & micro-animations
- **Recharts** — Data visualization (charts, sparklines)
- **Zustand** — Lightweight state management
- **Lucide React** — Beautiful consistent icons
- **React Router v7** — Client-side routing

### Backend
- **Express 5** — REST API server
- **MongoDB** + **Mongoose** — Database & ODM
- **JWT** — Authentication tokens
- **bcryptjs** — Password hashing
- **Helmet + CORS** — Security middleware

## 📦 Project Structure

```
Harvesta/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── db/             # MongoDB connection
│   │   ├── middlewares/    # Auth middleware
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API route definitions
│   │   └── server.js       # Express app entry
│   ├── .env                # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── lib/            # API client (axios)
│   │   ├── pages/          # 8 page components
│   │   ├── store/          # Zustand state stores
│   │   ├── App.jsx         # Root component
│   │   ├── index.css       # Design system
│   │   └── main.jsx        # Entry point
│   ├── .env                # Frontend env vars
│   └── package.json
└── package.json            # Root (concurrently)
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+
- **MongoDB** running locally or a MongoDB Atlas URI

### 1. Install Dependencies
```bash
npm run install:all
```
Or manually:
```bash
cd backend && npm install
cd ../frontend && npm install
cd .. && npm install
```

### 2. Configure Environment
Edit `backend/.env`:
```env
MONGODB_URI="mongodb://localhost:27017/harvesta"
JWT_SECRET="your-secret-key"
```

### 3. Run Development Servers
```bash
npm run dev
```
This starts both backend (port 5000) and frontend (port 5173) concurrently.

## 📱 Features

| Page | Description |
|------|-------------|
| **Dashboard** | Farm overview with yield charts, weather, soil health, active tasks |
| **My Fields** | CRUD for farm fields with soil types and embedded crops |
| **Inventory** | Track seeds, fertilizers, equipment with low-stock alerts |
| **Market Prices** | Live commodity rates with sparkline trends and 30-day history |
| **Community Forum** | Posts, comments, likes with category filters |
| **AI Pest ID** | Mock AI pest identification with detailed treatment plans |
| **Profile** | Account settings, password management |

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | ✗ | Register |
| POST | `/api/v1/auth/login` | ✗ | Login |
| GET | `/api/v1/auth/me` | ✓ | Get profile |
| PUT | `/api/v1/auth/me` | ✓ | Update profile |
| PUT | `/api/v1/auth/change-password` | ✓ | Change password |
| GET | `/api/v1/fields` | ✓ | List fields |
| POST | `/api/v1/fields` | ✓ | Create field |
| DELETE | `/api/v1/fields/:id` | ✓ | Delete field |
| POST | `/api/v1/fields/:id/crops` | ✓ | Add crop |
| GET | `/api/v1/inventory` | ✓ | List items |
| POST | `/api/v1/inventory` | ✓ | Add item |
| PUT | `/api/v1/inventory/:id` | ✓ | Update item |
| DELETE | `/api/v1/inventory/:id` | ✓ | Delete item |
| GET | `/api/v1/market` | ✗ | Get prices |
| GET | `/api/v1/market/:id/history` | ✗ | Price history |
| GET | `/api/v1/forum` | ✓ | List posts |
| POST | `/api/v1/forum` | ✓ | Create post |
| PUT | `/api/v1/forum/:id/like` | ✓ | Like post |
| POST | `/api/v1/forum/:id/comments` | ✓ | Add comment |
| DELETE | `/api/v1/forum/:id` | ✓ | Delete post |
| POST | `/api/v1/pest/identify` | ✗ | AI pest scan |
| GET | `/api/v1/pest/database` | ✗ | Pest database |
| GET | `/api/v1/weather` | ✗ | Weather data |
