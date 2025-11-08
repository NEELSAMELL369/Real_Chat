<h1 align=center>
   💬 Real_Chat 
</h1>

<p align="center">
  A real-time chat application built using the MERN stack (MongoDB, Express.js, React, Node.js) with Socket.io for live communication. Users can register, log in securely using JWT + HttpOnly cookies, and send/receive messages instantly.
</p>

<p align="center">
  <a href="https://real-chat-azure.vercel.app">
    <img src="https://img.shields.io/badge/Frontend-Live%20Demo-blue?style=for-the-badge&logo=react" alt="Frontend Live Demo">
  </a>
  <a href="https://real-chat-n6ob.onrender.com">
    <img src="https://img.shields.io/badge/Backend-Live%20API-green?style=for-the-badge&logo=node.js" alt="Backend Live API">
  </a>
</p>


---

## Features ✨

- User Authentication (Signup/Login/Logout) with JWT
- Real-time chat using **Socket.io**
- Online/offline user status
- Message timestamps
- Responsive UI
- Toast notifications for actions
- Simple and scalable folder structure
- Zustand for global state management

---

## 🛠 Tech Stack

| **Frontend**                               | **Backend**                |
| ------------------------------------------ | -------------------------- |
| React ^19.1.1                              | Node.js                    |
| React Router DOM ^7.9.5                    | Express.js ^5.1.0          |
| Tailwind CSS ^4.1.17 (+ @tailwindcss/vite) | MongoDB + Mongoose ^8.19.3 |
| Axios ^1.13.2                              | JWT (jsonwebtoken ^9.0.2)  |
| React Hot Toast ^2.6.0                     | bcryptjs ^3.0.3            |
| Lucide React ^0.553.0                      | dotenv ^17.2.3             |
| Zustand ^5.0.8                             | cors ^2.8.5                |
| Socket.io-client ^4.8.1                    | cookie-parser ^1.4.7       |
|                                            | cloudinary ^2.8.0          |
|                                            | nodemon ^3.1.10            |


---

## 📂 Folder Structure

```
REAL_CHAT/
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   ├── cloudinary.js
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   │
│   │   ├── middlewares/
│   │   │   └── protectRoute.js
│   │   │
│   │   ├── models/
│   │   │   ├── message.model.js
│   │   │   └── user.model.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   │
│   │   ├── socket/
│   │   │   └── socket.js
│   │   │
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Chat/
│   │   │   │   ├── ChatHeader.jsx
│   │   │   │   ├── MessageInput.jsx
│   │   │   │   └── MessageList.jsx
│   │   │   │
│   │   │   ├── Sidebar/
│   │   │   │   ├── UserList.jsx
│   │   │   │   └── Navbar.jsx
│   │   │
│   │   ├── lib/
│   │   │   ├── axios.js
│   │   │   └── socket.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── store/
│   │   │   ├── useAuthStore.js
│   │   │   └── useChatStore.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
├── .gitignore
└── README.md

```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 📦 Installation & Setup

1️⃣ **Clone the repository**

```bash
git clone https://github.com/NEELSAMELL369/Real_Chat.git
cd expense-tracker
```

2️⃣ **Install dependencies**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3️⃣ **Run the application**

```bash
# Backend
npm start

# Frontend
npm run dev
```
