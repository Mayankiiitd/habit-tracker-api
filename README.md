# 📘 Daily Habit Tracker API

A RESTful API for tracking daily habits built with **Node.js**, **Express**, and **MongoDB**. This API allows users to create, update, mark, and analyze their daily habits. It includes full authentication using JWT and includes Swagger UI for complete documentation.

---

## 🚀 Features

* ✅ User Authentication (Register/Login)
* 🧠 Create / Read / Update / Delete (CRUD) habits
* ✅ Mark habits as completed per day
* 📈 Track habit streaks
* 📊 Daily summaries & analytics
* 🔐 JWT-based authentication
* 🧪 Postman Collection & Swagger UI for testing

---

## 🔥 Bonus Features (Implemented)

* 🧾 Users now track their activity with:

  * `createdHabits` — all habits they created
  * `completedHabits` — all marked as done
  * `deletedHabits` — deleted habits tracked too
* 🎯 Analytics and Daily Summary only analyze **created habits** (not all in DB)
* 📄 Swagger UI at `/api-docs` to interact with and test the API

---

## 📁 Project Structure

```
├── config/               # MongoDB connection
├── controllers/          # Logic for Auth and Habit routes
├── middlewares/          # JWT authentication middleware
├── models/               # Mongoose schemas for User & Habit
├── routes/               # Express routers (Auth & Habit)
├── utils/                # Streak calculation logic
├── swagger.js            # Swagger specification generator
├── .env.example          # Example environment variables
├── README.md             # This file
├── app.js                # Express app setup
├── server.js             # Entry point
├── package.json
```

---

## 📦 Installation

```bash
# Clone the repo
https://github.com/yourusername/habit-tracker-api.git
cd habit-tracker-api

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Fill your `.env` file with:

```env
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## 🚴 Run the App

```bash
# Start in dev mode
npm run dev

# or start normally
npm start
```

API will run at:

```
http://localhost:4000
```

Swagger Docs:

```
http://localhost:4000/api-docs
```

---

## 🛠️ Available Routes

### ✅ Auth Routes

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login & get JWT     |

### 📌 Habit Routes (JWT Required)

| Method | Endpoint                    | Description                       |
| ------ | --------------------------- | --------------------------------- |
| POST   | `/api/habits`               | Create a new habit                |
| GET    | `/api/habits`               | Get all user's habits             |
| PUT    | `/api/habits/:id`           | Update a habit                    |
| DELETE | `/api/habits/:id`           | Delete a habit                    |
| POST   | `/api/habits/:id/mark`      | Mark habit as completed for today |
| GET    | `/api/habits/:id/history`   | Get completion history & streak   |
| GET    | `/api/habits/summary/today` | Daily summary of completions      |
| GET    | `/api/habits/analytics`     | Habit performance stats           |

---

## 🧪 Postman Collection

You can import the full testing flow via:

* ✅ Register ➝ Login ➝ Create ➝ Mark ➝ Analytics

🔗 Import this collection: `Habit_Tracker_Run_All.postman_collection.json`

---

## 📄 Swagger UI

Interact with your API visually at:

```
http://localhost:4000/api-docs
```

All routes are grouped with example requests/responses.

---

## 🤝 Contributors

* Mayank Gautam ([@mayank22283](mailto:mayank22283@iiitd.ac.in))

---

## 📜 License

This project is for educational use (DevifyX assignment) and is MIT licensed.
