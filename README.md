# AI DevOps Issue Tracker 

A professional, AI-powered DevOps Issue Tracking platform built with the MERN stack.

## 🚀 Features

- **AI Diagnostics**: Automatic issue classification and log analysis using Gemini/OpenAI.
- **Bento Dashboard**: Modern, high-end UI with real-time system health metrics.
- **Kanban Board**: Drag-and-drop issue management with AI-generated summaries.
- **AI Console**: Interactive terminal-style chat for deployment troubleshooting.
- **Real-time Updates**: Live notifications and board sync via Socket.io.
- **DevOps Integration**: Tracking CI/CD pipelines and service health.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Redux Toolkit, Framer Motion.
- **Backend**: Node.js, Express, MongoDB, Socket.io.
- **AI**: Google Gemini API / OpenAI API.
- **Infrastructure**: Docker, Docker Compose.

## 📦 Setup & Installation

### 1. Prerequisites
- Node.js (v20+)
- MongoDB (Local or Atlas)
- Gemini API Key (Optional but recommended for AI features)

### 2. Environment Configuration
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
```

### 3. Install Dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

### 4. Run the Project
```bash
# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev
```

### 5. Docker Deployment
```bash
docker-compose up --build
```

## 🏗️ Folder Structure
- `client/`: React frontend application.
- `server/`: Node.js backend API.
- `docker-compose.yml`: Multi-container orchestration.

## 👤 Author

Priyanka Sangamkar
Email: priyankasangamkar@gmail.com
GitHub: https://github.com/Priyanka010802
