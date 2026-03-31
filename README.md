# 🍱 Cyberpunk Canteen System | Digital Requisition Platform

A full-stack, "high-tech" canteen pre-order system with a premium Cyberpunk aesthetic. Built for modern campus efficiency with real-time telemetry and a professional triple-theme architecture.

---

## 🚀 Key Features

- **🌐 Triple-Theme Engine:** Seamlessly switch between **Light**, **Dark**, and **Cyberpunk** themes.
- **⚡ Real-Time Telemetry:** Live order tracking using Socket.io and Framer Motion animations.
- **🏛️ Strategic Control Dashboards:** Dedicated, high-end interfaces for **Admin**, **Staff**, and **Students**.
- **🔒 Secure Architecture:** JWT-based authentication with role-based mission access.
- **📦 Digital Requisition:** Automated cart system with scheduled pickup windows.

---

## 🧱 Tech Stack

| Layer      | Technology                              |
|------------|------------------------------------------|
| **Frontend** | React (Vite), Framer Motion, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js, Socket.io, JWT      |
| **Database** | **MongoDB Atlas** (Mongoose)             |
| **DevOps**   | Render Blueprint (Static + Web Services) |

---

## 📁 Project Structure

```
canteen-preorder-system/
├── client/          # Vite Frontend (React + Framer Motion)
├── server/          # Express Backend (Node.js + Socket.io)
├── render.yaml      # Automated Render Deployment Blueprint
├── .env.example     # Production Environment Template
└── README.md
```

---

## ⚙️ Operational Setup

### 1. Database (MongoDB)
This project uses **MongoDB**. For local development, ensure `mongodb://localhost:27017` is active. For production, use **MongoDB Atlas**.
- **Seeding:** Run `node server/seed.js` to initialize the mission-critical test accounts (Admin, Staff, Student).

### 2. Environment Configuration
Create a `.env` file in both `client/` and `server/` using the [.env.example](file:///c:/Users/kabir/Desktop/Canteen-preorder-system/.env.example) as a guide.

- **Server Variables:** `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`
- **Client Variables:** `VITE_API_URL`, `VITE_SOCKET_URL`

### 3. Launch Commands
**Backend:**
```bash
cd server && npm install && npm run dev
```
**Frontend:**
```bash
cd client && npm install && npm run dev
```

---

## 🧪 Mission Credentials (Test Data)

| Role    | Email                    | Password   |
|---------|--------------------------|------------|
| **Admin** | `admin@canteen.com`      | `test1234` |
| **Staff** | `staff@canteen.com`      | `test1234` |
| **Student** | `student@college.com`    | `test1234` |

---

## ☁️ Deployment (Render)

I have included a **[render.yaml](file:///c:/Users/kabir/Desktop/Canteen-preorder-system/render.yaml)** Blueprint.
1. Push this repository to GitHub.
2. Connect the repo to **Render**.
3. Render will detect the Blueprint and automatically provision:
    - **canteen-backend:** Node.js Web Service.
    - **canteen-frontend:** React Static Site.
4. Set the environment variables in the Render Dashboard as specified in the [Deployment Plan](file:///c:/Users/kabir/.gemini/antigravity/brain/222380b3-ea60-4158-afa3-4af8143b73b9/deployment_plan.md).

---

## 🔄 Real-Time Mission Flow
1. **Requisition:** Student places an order via the "Active Terminal".
2. **Telemetry:** Backend emits a `new_order` socket event.
3. **Control:** Staff dashboard receives live notification with haptic feedback.
4. **Processing:** Status updates (Pending → Preparing → Ready) sync in real-time.
5. **Finalization:** Student collects payload at the designated time slot.

---

> Built with a focus on **Visual Excellence** and **Operational Efficiency**.
