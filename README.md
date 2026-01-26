# 📱 Mobile Monitoring System (Real-Time Device Monitoring)

The **Mobile Monitoring System** is a full-stack real-time web application that allows users and administrators to monitor registered mobile devices through a centralized dashboard.

It provides secure authentication, live telemetry updates, role-based access control, and an admin panel for managing users and device permissions.

---

## 🚀 Project Objective

The purpose of this system is to provide centralized monitoring of mobile devices including:

- 📍 Live Location Tracking  
- 🎥 Live Video Streaming  
- 🔋 Battery Status  
- 📡 Network Speed Monitoring  
- 📱 Motion & Orientation Tracking  
- 👥 User/Admin Role Access  

---

## ✨ Key Features

### 👤 User Features
- Secure Signup & Login (JWT)
- Client-side validation with error messages
- View only assigned devices
- Active / Inactive device status display
- Real-time device dashboard for active devices
- Unauthorized access protection (403 Page)

### 🛠️ Admin Features
- Admin Dashboard access
- Approve / Reject newly registered users
- Assign devices to users dynamically
- Manage user permissions
- Search, filter, and pagination support
- Real-time updates of user/device data

---

## 🖥️ Device Dashboard (Real-Time Monitoring)

When a user selects an active device, the dashboard displays:

- 📍 Live Location Map  
- 📱 Motion Status (Moving/Stationary)  
- 🧭 Orientation (Tilt/Rotation)  
- 🎥 Live Video Feed  
- 🔋 Battery Percentage  
- 📡 Network Speed Meter  

All updates happen in real time using **Socket.io**.

---

## 🧰 Technology Stack

### Frontend
- Angular  
- Angular Material + Bootstrap + CSS  
- Leaflet / Google Maps API  
- Socket.io Client  
- JWT Authentication  

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Socket.io  
- JWT Security  
- Bcrypt Password Hashing  

---

## 📂 Project Folder Structure

DEVICE_MONITORING_SYSTEM/
│
├── backend/ # Node.js Backend
│ ├── config/
│ │ └── dbconnection.js
│ │
│ ├── Controller/
│ │ ├── Admin.js
│ │ ├── auth.js
│ │ ├── device.js
│ │ └── users.js
│ │
│ ├── model/
│ │ ├── devicemodel.js
│ │ └── usermodel.js
│ │
│ ├── routes/
│ │ ├── AdminRoute.js
│ │ ├── AuthRoute.js
│ │ ├── DeviceRoute.js
│ │ └── userRouter.js
│ │
│ ├── servicess/
│ │ └── usersdata.js
│ │
│ ├── public/
│ │ ├── assets/
│ │ └── screen.html
│ │
│ ├── package.json
│ └── server.js
│
├── Frontend/ # Angular Frontend
│ ├── src/
│ │ ├── app/
│ │ │ ├── auth/
│ │ │ │ ├── login/
│ │ │ │ └── signup/
│ │ │ │
│ │ │ ├── dashboard/
│ │ │ ├── services/
│ │ │ ├── unauthorized/
│ │ │ ├── page-not-found/
│ │ │ ├── guards/
│ │ │ └── interceptors/
│ │ │
│ │ └── assets/
│ │
│ ├── angular.json
│ └── package.json
│
├── README.md
└── .gitignore



---

## 📡 REST API Endpoints

### Authentication APIs

| Method | Endpoint           | Description        |
|--------|-------------------|--------------------|
| POST   | `/api/auth/signup`| Register new user  |
| POST   | `/api/auth/login` | Login + JWT Token  |

### Admin APIs

| Method | Endpoint            | Description                |
|--------|--------------------|----------------------------|
| GET    | `/api/admin/:page` | Fetch users (pagination)   |
| PATCH  | `/api/admin/:id`   | Update user approval status|

---

## 🔌 Socket.io Real-Time Events

Devices continuously send telemetry data:

- `location`
- `battery`
- `videostream`
- `deviceorientation`
- `devicemotion`
- `netinfo`
- `speedmbps`

Backend forwards data instantly to dashboard (live monitoring).

---

## ▶️ Installation & Setup Guide

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/mobile-monitoring-system.git
cd DEVICE_MONITORING_SYSTEM
cd backend
npm install
npm start
http://localhost:5000

open new terminal
cd Frontend
npm install
ng serve
http://localhost:4200
