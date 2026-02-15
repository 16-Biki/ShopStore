# 🛒 ShopStore – MERN Multi-Vendor E-Commerce App

ShopStore is a full-stack MERN e-commerce application with Admin & User roles, product management, cart system, and order handling.

Admins can upload products and manage orders.  
Users can browse products, add to cart, and place orders.

Live Demo: https://shop-store-eta.vercel.app

---

## 🚀 Features

### 👤 Authentication
- Register / Login
- JWT + Cookies authentication
- Role based access (User / Admin)

### 🛍 User Features
- Browse products
- Add to cart
- Remove cart items
- Checkout with shipping address
- Place orders

### 🛠 Admin Features
- Add products with image upload
- Edit product price
- Delete products
- View own orders
- Mark orders completed

---

## 💾 Tech Stack

### Frontend
- React + Vite
- Zustand
- Axios
- React Router

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (image upload)

---

## 📂 Project Structure

ShopStore
│
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── middlewares
│ ├── utils
│ └── index.js
│
└── frontend
├── src
│ ├── components
│ ├── pages
│ ├── store
│ └── api


---

## ⚙️ Environment Variables

Create `.env` inside backend folder:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
----


---

## 🔐 Roles

During registration choose:

- user → Shopping access  
- admin → Dashboard access  

Admin dashboard:

/admin


---

## 📦 API Routes

### Auth

POST /api/auth/register
POST /api/auth/login


### Products

GET /api/products
POST /api/products (admin)
PUT /api/products/:id (admin)
DELETE /api/products/:id (admin)


### Orders

POST /api/orders
GET /api/orders (admin)
PUT /api/orders/complete/:id


---

## 🚀 Deployment

Frontend: Vercel  
Backend: Render  
Database: MongoDB Atlas  

---


---

## ⭐ Future Improvements

- Quantity support
- Payment gateway
- Product categories
- Admin analytics dashboard
- Order status instead of delete
- Cloudinary image upload

---
