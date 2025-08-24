# 📡 Real-time Chat App

A responsive real-time chat application built with React.js (frontend), Node.js + WebSockets (backend), MongoDB (persistence), and JWT (authentication).

## 🚀 Features

- 🔑 **User Authentication** - Register & Login with JWT
- 💬 **Real-time Messaging** - Using WebSockets for instant communication
- 🏠 **Chat Rooms** - Multiple rooms with persistent message history
- 🗂️ **MongoDB Storage** - Persistent storage for messages and users
- 📱 **Responsive Design** - Works on desktop & mobile devices
- 🔄 **Auto-reconnect** - Automatic reconnection on network issues
- ⌨️ **Typing Indicators** - See when others are typing
- 👥 **Online Users** - View who's currently online in each room

## 📂 Project Structure

```
chat-app/
├── server/                 # Node.js WebSocket + Express backend
│   ├── models/            # MongoDB models (User, Message)
│   │   ├── User.js        # User schema with authentication
│   │   └── Message.js     # Message schema for chat history
│   ├── routes/            # API routes
│   │   └── auth.js        # Authentication endpoints
│   ├── middleware/        # Custom middleware
│   │   └── auth.js        # JWT authentication middleware
│   ├── .env               # Environment variables
│   ├── package.json       # Server dependencies
│   └── index.js           # Main server file with WebSocket
│
├── client/                # React.js frontend
│   ├── public/
│   │   └── index.html     # HTML template
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ChatSidebar.js     # Room list and online users
│   │   │   ├── MessageList.js     # Message display component
│   │   │   └── MessageInput.js    # Message input with typing
│   │   ├── pages/         # Main application pages
│   │   │   ├── Login.js           # Login page
│   │   │   ├── Register.js        # Registration page
│   │   │   └── Chat.js            # Main chat interface
│   │   ├── context/       # React Context for state management
│   │   │   └── AuthContext.js     # Authentication context
│   │   ├── hooks/         # Custom React hooks
│   │   │   └── useSocket.js       # WebSocket connection hook
│   │   ├── App.js         # Main app component with routing
│   │   └── index.js       # React entry point
│   └── package.json       # Client dependencies
│
└── README.md              # This file
```

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd omran-social-app
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret_change_this_in_production
PORT=5000
NODE_ENV=development
```

**Important**: Change the `JWT_SECRET` to a secure random string in production!

Start the backend server:

```bash
npm start
# or for development with auto-restart:
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the client directory:

```bash
cd client
npm install
npm start
```

The React app will open at `http://localhost:3000`

## 🛠 Usage

1. **Register** a new account with username, email, and password
2. **Login** with your credentials
3. **Select a room** from the sidebar (general, random, tech, gaming, music)
4. **Create new rooms** by clicking the "+" button
5. **Start chatting** - messages are saved and synced in real-time
6. **See online users** in the sidebar
7. **Typing indicators** show when others are typing

## 🔧 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Health Check

- `GET /api/health` - Server health status

## 🌐 WebSocket Events

### Client → Server

- `join_room` - Join a chat room
- `leave_room` - Leave a chat room
- `send_message` - Send a message
- `typing_start` - Start typing indicator
- `typing_stop` - Stop typing indicator
- `get_room_users` - Get online users in room

### Server → Client

- `room_messages` - Receive room message history
- `new_message` - Receive new message
- `user_joined` - User joined room notification
- `user_left` - User left room notification
- `room_users` - List of online users
- `user_typing` - Typing indicator updates

## 📦 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - WebSocket implementation
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React.js** - UI framework
- **React Router** - Client-side routing
- **Socket.IO Client** - WebSocket client
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. Build the React app:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the `build/` folder to your hosting service

### Backend (Render/Heroku)

1. Set environment variables in your hosting service
2. Deploy the `server/` directory
3. Ensure MongoDB connection string is updated for production

### Database (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Update `MONGO_URI` in your environment variables
3. Whitelist your server's IP address

## 🔮 Future Enhancements

- ✅ **Docker Compose** setup for easy deployment
- ✅ **File & Image Uploads** in messages
- ✅ **User Avatars** and profiles
- ✅ **Private 1-on-1 Chats**
- ✅ **Message Reactions** (like, love, etc.)
- ✅ **Push Notifications** for new messages
- ✅ **Message Search** functionality
- ✅ **Dark Mode** theme toggle

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or check Atlas connection string
   - Verify network connectivity and firewall settings

2. **WebSocket Connection Failed**
   - Check if backend server is running on port 5000
   - Verify CORS settings in server configuration

3. **Authentication Issues**
   - Clear browser localStorage and try logging in again
   - Check JWT_SECRET configuration

4. **Port Already in Use**
   - Kill existing processes: `npx kill-port 3000` or `npx kill-port 5000`
   - Or change ports in configuration files

## 👨‍💻 Author

**Omran Khan** ✨

Built with ❤️ using modern web technologies

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
