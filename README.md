# Realtime Group Chat Application Backend

## Chat Application
This is a real-time chat application consisting of a **frontend (chat-frontend)** built with Next.js and a **backend (chat-backend)** powered by Node.js, Express, and Socket.io. The backend also integrates a MongoDB database for storing chat history.

---
## High-Level Architecture

### **1. Frontend (chat-frontend)**
- Built with **HTML, CSS, JavaScript, and Next.js**
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
- Chat messages are stored with `username`, `userid`, `message content`, and `timestamp`

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
- Efficiently handles database errors

---
## Setup & Running the Project

### **1. Clone Both Repositories**
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
npm start    # Start the backend server
# OR
node / nodemon server.js
```
By default, the backend runs on `http://localhost:5000`.

---
### **3. Frontend Setup (chat-frontend)**
#### **Installation & Running**
```sh
cd chat-frontend
git checkout group-chat-app
npm install
npm run dev
```
Ensure the frontend correctly connects to the backend WebSocket server.

---
## Features
- **Real-time messaging** with Socket.io
- **Basic authentication** (username-based chat)
- **Chat history persistence** using JSON & MongoDB
- **Optimized UI** with responsive chat messages
- **Efficient data handling** & database integration

---
## Future Improvements
- Add user authentication with JWT
- Implement message reactions & typing indicators
- Deploy the app on **Vercel (frontend)** and **Heroku/AWS (backend)**

---
## Application Screenshots
Below are screenshots showcasing the application's functionality:

### **1. Chat Interface**
In first Muhammad Asad username is written in center on that specific user profile who is sending message Hi , What's going on
**![Screenshot 2025-03-06 135404](https://github.com/user-attachments/assets/18d1c899-8bb8-47e5-b421-70f64edb1eeb)

In Second Arslan Ahmad is seeing this message on realtime message come from Muhammad Asad and above in green showing that user own messages 
![Screenshot 2025-03-06 135345](https://github.com/user-attachments/assets/0a81fa1a-0c14-4b72-bbb4-7e57d4616906)

### **2. Backend Console (WebSocket Connections)**
*![image](https://github.com/user-attachments/assets/519b7609-e77a-4082-80ea-320b70a028a5)
*

### **3. Database (MongoDB Chat Storage)**
*![image](https://github.com/user-attachments/assets/20ca2988-af61-4f69-80cc-22d07df66d93)
*

---
## License
MIT License. Feel free to use and modify the project!

