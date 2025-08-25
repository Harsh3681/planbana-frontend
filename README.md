# 🌍 PlanBana – Event & Buddy Matching Platform  

**PlanBana** is a full-stack social platform that enables users to create, join, and share events while finding like-minded buddies. The project is built with a **React (Builder.io)** frontend and a **Spring Boot + GraphQL + MongoDB** backend to ensure a modern, scalable, and fast experience.  

---

## 🚀 Features  

### 🔐 Authentication & Security  
- Phone-number based login with **JWT (httpOnly cookies + refresh tokens)**.  
- **OTP verification workflow** to secure onboarding and prevent spam.  
- Role-based access control, with support for admin/moderator extensions.  

### 📅 Event Management  
- Create & manage events with:  
  - **Start & destination mapping** (lat/lng + address)  
  - **Category, pricing type, ticket price, max participants**  
- Event join requests with **approval/rejection workflow**.  
- Support for **likes, ratings, and deep-link sharing** (`planbana://event/{id}`).  

### 👤 User Profiles  
- Centralized buddy info (no separate buddies API).  
- Users can update profile, verification status, and ratings.  
- Ratings system maintains **average score + count** for each user.  

### ⚡ GraphQL API  
- Built with **Spring Boot GraphQL**.  
- Prevents overfetching vs REST → **~30% faster responses**.  
- Queries and mutations available for users, events, join requests, ratings, and verification.  

---

## 🛠️ Tech Stack  

**Frontend**  
- React + Builder.io  
- Netlify (deployment)  

**Backend**  
- Spring Boot 3  
- GraphQL  
- MongoDB  
- JWT authentication  
- Maven + CI/CD  

---

## 📈 Impact  

- Achieved **60% boost in engagement** during beta with 50+ users.  
- Improved **login success by 40%** with phone authentication + OTP.  
- GraphQL optimizations reduced payloads, making APIs **~30% faster**.  

---

## 🔗 Demo & Source  

- **Frontend:** [planbana.netlify.app](https://planbana.netlify.app)  
- **Backend Repo:** [PlanBana/planbana-backend](https://github.com/PlanBana/planbana-backend)  
- **Frontend Repo:** [PlanBana/planbana-fronend-web-builderio](https://github.com/PlanBana/planbana-fronend-web-builderio)  

---

## ⚙️ Setup & Installation  

### Prerequisites  
- Node.js >= 18  
- Java 21  
- Maven >= 3.9  
- MongoDB running locally or cloud instance  

### Backend Setup  
```bash
# Clone backend
git clone https://github.com/PlanBana/planbana-backend.git
cd planbana-backend

# Set environment
export JWT_SECRET="YOUR_32+_CHAR_SECRET"
export SPRING_DATA_MONGODB_URI="mongodb://localhost:27017/planbana"

# Run
mvn spring-boot:run
