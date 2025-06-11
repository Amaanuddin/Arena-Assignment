# Arena-Assignment

# Decentralized Social Media MVP

A full-stack decentralized social media app built with **NestJS + TypeORM + Supabase** (backend) and **Next.js + Tailwind + RainbowKit** (frontend).

---

## 🚀 Feature Overview

- **Wallet-based Authentication:**  
  Login/signup with any Ethereum wallet (RainbowKit + Wagmi).
- **JWT-secured API:**  
  Secure all API routes with wallet-based JWTs.
- **User Profiles:**  
  Users can set their username, bio (280 chars), and profile picture.
- **Feed:**  
  See all posts in reverse chronological order, with like and comment counts.
- **Create Posts:**  
  Users can post content (280 chars max).
- **Like Posts:**  
  Like posts (1 like per user per post).
- **Comment on Posts:**  
  Add comments (280 chars) to posts.
- **Full Post View:**  
  Click a post to see its details, all comments, and add a like or comment.
- **Edit Profile:**  
  Users can update their username, bio, and profile picture.
- **Protected Routes:**  
  Only authenticated users can create posts, like, comment, or edit profiles.
- **Profile Completion:**  
  First-time users are prompted to set their profile.

---

## 🖥️ How to Use the Application

### 1. **Sign Up / Login**
- Connect your Ethereum wallet using the **Connect Wallet** button in the navbar.
- Sign a message to authenticate (no gas or transaction required).
- First-time users will be prompted to set a **username, bio, and profile picture**.

### 2. **Feed & Posts**
- The home page shows the latest posts from all users.
- Click **Create Post** in the navbar (or use the composer on the home page) to write a new post (max 280 characters).

### 3. **View Post Details**
- Click on any post in the feed to view it in detail.
- See all comments and likes for that post.

### 4. **Like & Comment**
- Click **Like** to like a post (only once per post).
- Add a comment at the bottom of the post details page (max 280 chars).

### 5. **Edit Your Profile**
- Go to **Profile** in the navbar.
- Edit your username, bio, or profile picture, and click **Save**.

### 6. **Logout**
- Use the **Logout** button in the navbar to log out and disconnect your session.

---

## 🏁 Quick Start

### 1. **Clone the repo**

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo

---

## 🏁 Quick Start

### 1. **Clone the repo**

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

# Backend Setup (/backend)

# 1. Install dependencies

```bash
cd backend
npm install
```
# 2. Setup your .env file

Copy .env.example to .env and fill in your values:
```bash 
# Database (Supabase/Postgres)
DB_HOST=your-db-host.supabase.co
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=postgres

# JWT secret
JWT_SECRET=your_super_secret_jwt_key
```

# 3. Run TypeORM migrations
⚠️ Make sure your env vars are set and database is empty for first-time setup.

```bash
npm run build        # builds TypeScript
npx typeorm-ts-node-commonjs migration:generate -d src/data-source.ts src/migrations/InitSchema
npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
```

# 4. Start the backend
```bash
npm run start:dev
```

# 🎨 Frontend Setup (/frontend)
# 1. Install dependencies
```bash
cd frontend
npm install
```
# 2. Setup your .env file
Copy .env.example to .env and fill:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WALLET_CONNECT_PROECT_ID =  'YOUR_WALLET_PROJECT_ID'
```

# 3. Start the frontend
```bash
npm run dev
```
The app will run at http://localhost:3000

# ⚡ Project Structure
```bash
/backend  - NestJS API, migrations, entities
/frontend - Next.js app (RainbowKit, Tailwind, etc)
```
# 🏦 Database Migrations
## Generate a new migration after changing entities:

```bash
npx typeorm-ts-node-commonjs migration:generate -d src/data-source.ts src/migrations/YourMigrationName
```
## Run migrations:

```bash
npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
```
# 🛠️ Useful Scripts
## Backend (/backend/package.json):

```json 
"scripts": {
  "start:dev": "nest start --watch",
  "build": "nest build",
  "typeorm": "typeorm-ts-node-commonjs",
  "migration:generate": "npx typeorm-ts-node-commonjs migration:generate -d src/data-source.ts src/migrations/Auto",
  "migration:run": "npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts"
}
```
## Frontend (/frontend/package.json):

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start"
}
```