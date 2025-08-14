# 🏋️‍♂️ Fitness AI

Fitness AI is a microservices-based fitness application that uses AI to provide personalized workout recommendations, track activity, and manage user data securely.

---

## Features
- **User Service** – Manages user profiles, authentication, and preferences.
- **Activity Service** – Tracks workouts and fitness activities.
- **AI Service** – Generates personalized recommendations using AI.
- **Gateway** – Central API Gateway for routing requests.
- **Configuration Server** – Centralized configuration for all services.
- **Service Discovery** – Eureka server for service registration and discovery.
- **Frontend** – React-based user interface.

---

## Tech Stack
- **Backend:** Java Spring Boot, Spring Cloud
- **Frontend:** React.js
- **Database:** MongoDB
- **Messaging:** RabbitMQ
- **AI Integration:** Google Gemini API
- **Authentication:** Keycloak + OAuth2
- **Service Discovery:** Eureka
- **Config Management:** Spring Cloud Config Server
- **API Gateway:** Spring Cloud Gateway

---

## Getting Started

###  Clone the repository
```bash
git clone https://github.com/Ammadkk/Fitness_AI.git
cd Fitness_AI

Run the backend services

Start Configuration Server

Start Eureka Server

Start Gateway

Start other microservices

mvn spring-boot:run


Run the frontend
cd fitness-app-frontend
npm install
npm start
