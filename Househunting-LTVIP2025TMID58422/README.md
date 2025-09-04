# Househunting
# 🏠 HouseHunt: Finding Your Perfect Rental Home

**HouseHunt** is a full-stack house rental application that simplifies the experience of searching for, listing, and managing rental properties. Whether you're a renter, property owner, or administrator, HouseHunt provides a smooth and responsive platform tailored to your needs.

---

## 🌐 Live Demo

🔗 [Visit Live Website](https://lustrous-rugelach-aa4d9b.netlify.app)

---

## 💡 Project Overview

HouseHunt connects renters with property owners in an intuitive, user-friendly web app. It features:

- Detailed property listings
- Smart search filters
- Secure user authentication
- Role-based dashboards
- Admin approval system for property owners

---

## 👥 User Roles

- **Renter**: Search and book available properties
- **Owner**: Add and manage rental listings
- **Admin**: Review and approve owner accounts

---

## ✨ Features

- 🏘️ Property listing with images, location, and rent info
- 🔍 Filters for location, price, bedroom count, and more
- 📩 Contact and inquiry system between renters and owners
- 🔐 JWT-based login and registration
- 📥 Admin approval for owner account verification
- 📅 Booking confirmation and status tracking

---

## 🧪 Test Accounts

| Role   | Email                        | Password   |
|--------|------------------------------|------------|
| Renter | renter.user@example.com      | renter123  |
| Owner  | owner.user@example.com       | owner123   |
| Admin  | admin@househunt.com          | admin123   |

---

## 🛠️ Tech Stack

| Layer        | Technologies                                  |
|--------------|-----------------------------------------------|
| Frontend     | React.js, Tailwind CSS, Axios                 |
| Backend      | Node.js, Express.js, JWT Authentication       |
| Database     | MongoDB (Mongoose)                            |
| Deployment   | Netlify (Frontend), Local/Cloud backend       |

---

## 📂 Project Structure

```bash
househunt/
├── client/              # React frontend
│   ├── components/
│   ├── pages/
│   └── App.js
├── server/              # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
└── README.md
