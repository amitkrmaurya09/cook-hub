# 🍳 CookHub – Recipe Sharing Platform

A modern, modular **React-based recipe sharing platform** with a powerful **authentication system (Login, Register, OTP, Reset Password)** and a clean UI for creating and exploring recipes.

---

## ✨ Features

### 🔐 Authentication System

* Login / Register flow
* OTP Verification
* Forgot & Reset Password
* Token-based authentication (stored in localStorage)
* Smart navigation between auth states
  → handled centrally via 

---

### 🧠 Smart Auth Modal System

* Single modal handles all auth views
* Dynamic rendering (Login, Register, OTP, Profile, Create)
* Controlled via `AuthContainer`
  → 

---

### 👤 User Profile

* View & edit profile
* Update name, city, image
* View stats (recipes, likes)
* Logout functionality
  → 

---

### 🍲 Recipe Features

* Create new recipes (title, cuisine, time, veg, image, ingredients)
* Recipe cards UI
* Like system (frontend demo)
* Category filtering (UI-ready)
  → 

---

### 🏠 Home Page

* Hero section + stats
* Category filters
* Recipe grid layout
* Featured banner
  → 

---

### 🧭 Navbar System

* Auth-aware UI (Login / Profile toggle)
* Protected "Create" action
* Modal-based navigation (no page reloads)
  → 

---

## 🏗️ Project Structure

```
src/
│
├── auth/
│   ├── AuthContainer.jsx
│   ├── AuthFlow.jsx
│   ├── AuthModel.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── OtpVerify.jsx
│   ├── ForgotPassword.jsx
│   └── ResetPassword.jsx
│
├── components/
│   ├── Navbar.jsx
│   └── RecipeCard.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Profile.jsx
│   └── Create.jsx
│
├── api/
│   └── api.js / axios config
```

---

## ⚙️ Tech Stack

* **Frontend:** React + Vite
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **State Management:** React Hooks
* **API Handling:** Axios

---

## 🔁 Auth Flow Logic

All authentication logic is centralized:

```
User Action → handleAuthFlow → API → Response → UI Update
```

Example:

* Login success → store token → redirect
* User not found → switch to Register
* Register → OTP screen
* Forgot → Reset password

👉 Managed inside: 

---

## 🔐 Token Handling

```js
localStorage.setItem("token", res.token);
```

* Used to detect login state
* Controls protected actions (like Create recipe)

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/cookhub.git
cd cookhub
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the project

```bash
npm run dev
```

---

## 🔮 Future Improvements

* Backend integration (replace dummy data)
* Image upload instead of URL
* Comments & reviews system
* Recipe search & filters
* Dark mode persistence
* JWT refresh tokens

---

## 💡 Key Design Idea

Instead of multiple pages for auth, this project uses:

> 🧩 **Single Modal + Dynamic Views = Clean UX + Scalable Code**

---
