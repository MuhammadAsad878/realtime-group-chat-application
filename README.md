# Realtime-group-chat-application-backend
# Chat Application

This is a real-time chat application consisting of a **frontend (chat-frontend)** built with Next.js and a **backend (chat-backend)** powered by Node.js, Express, and Socket.io. The backend also integrates a database MongoDB for storing chat history.

---
## High-Level Architecture

### **1. Frontend (chat-frontend)**
- Built with **HTML, CSS, JavaScript and Next.js**
- Uses **Socket.io client** to communicate with the backend
- Displays real-time chat messages
- Provides a responsive UI with message input, display, and logout functionality

### **2. Backend (chat-backend)**
- Built using **Node.js and Express.js**
- Uses **Socket.io** for real-time bidirectional communication
- Stores chat messages in a **JSON file (for quick access)** and a **MongoDB database (for persistence)**
- Fetches chat history from a local file if available, otherwise queries the database

### **3. Database**
- **MongoDB** is used for long-term message storage
- Chat messages are stored with `username`  `userid`, `message content as text`, and `timestamp`

---
## Key Design Decisions

### **1. Real-time Communication with Socket.io**
- Chosen for its efficiency in handling WebSocket-based real-time updates
- Ensures seamless message exchange between clients

### **2. Hybrid Data Storage Approach**
- **JSON file caching**: For quick retrieval of recent chat history
- **MongoDB database**: For long-term message persistence
- If the JSON file exists, messages are retrieved from it; otherwise, the database is queried

### **3. Optimized CSS for Performance**
- The frontend styles are optimized for responsiveness and maintainability
- Uses **Flexbox** for layout and **CSS transitions** for smooth interactions

### **4. Error Handling & Robustness**
- Uses **try-catch** blocks to handle file read errors in the backend
- Ensures the application does not crash if the JSON file is missing or corrupted
- Also handled database Errors efficiently 

---
## Setup & Running the Project

### **1. Clone both the Repositories **
```sh
git clone https://github.com/MuhammadAsad878/realtime-group-chat-application-frontend.git
```
```sh
git clone https://github.com/MuhammadAsad878/realtime-group-chat-application-backend.git
```

### **2. Backend Setup (chat-backend)**
#### **Prerequisites:**
- Install [Node.js](https://nodejs.org/) (LTS recommended)
- Install [MongoDB](https://www.mongodb.com/try/download/community) (if using a local database)

#### **Installation & Running**
```sh
cd chat-backend
npm install  # Install dependencies
npm start or     # Start the backend server
node / nodemon server.js
```
By default, the backend runs on `http://localhost:5000`.

---
### **3. Frontend Setup (chat-frontend)**
#### **Installation & Running**

```sh
cd chat-frontend
cd group-chat-app
npm install
npm run dev
```
Ensure the frontend correctly connects to the backend WebSocket server.

---
## Features
- **Real-time messaging** with Socket.io
- **Basic authentication** (basic username-based chat)
- **Chat history persistence** using JSON & MongoDB
- **Optimized UI** with responsive chat messages
- **Efficient data handling**  & database integration

---
## Future Improvements
- Add user authentication with JWT
- Implement message reactions & typing indicators
- Deploy the app on **Vercel (frontend)** and **Heroku/AWS (backend)**

---
## License
MIT License. Feel free to use and modify the project!

ation
