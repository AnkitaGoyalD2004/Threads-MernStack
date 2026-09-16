 ## Live Demo
    
    Experience the app live in your browser:  
    **https://threads-mernstack.onrender.com**
    
    ---
    
    ## ✨ Features
    
    ### Threads & Posts
    - **Create Posts**: Post thoughts with text and image attachments uploaded to **Cloudinary**.
    - **Engagement**: Like and unlike posts in real-time.
    - **Replies**: Leave replies and participate in threaded discussions.
    - **Delete Posts**: Easily manage and delete your own posts.
    
    ### User Discovery & Following
    - **Suggested Users**: Discover recommended users right on your homepage sidebar and mobile view.
    - **Follow / Unfollow**: Toggle follow state seamlessly; your feed automatically updates with the posts of users you follow.
    - **User Profiles**: Visit any user's profile (`/:username`) to see their posts, follower count, and bio.
    - **Profile Management**: Update your name, username, bio, and avatar.
    - **Freeze Account**: Temporarily freeze your account and reactivate upon login.
    
    ###  Real-Time Messaging
    - **1-on-1 Chat**: Instant messaging powered by **Socket.io**.
    - **Online Indicators**: See which users are currently online in real-time.
    - **Seen Status**: Read receipts that update as soon as the recipient views the message.
    - **Media in Chat**: Send images within chat conversations.
    
    ### UI & UX
    - **Dark & Light Mode**: Smooth theme toggling with Chakra UI color mode.
    - **Responsive Layout**: Designed for mobile, tablet, and desktop screens.
    - **Skeleton Loaders**: Polished loading states while content is being fetched.
    
    ---
    
    ## 🛠️ Tech Stack
    
    | Layer | Technologies |
    | :--- | :--- |
    | **Frontend** | React 18, Vite, Chakra UI, Recoil, React Router v6, React Icons |
    | **Backend** | Node.js, Express.js |
    | **Database** | MongoDB Atlas, Mongoose ODM |
    | **Real-Time** | Socket.io, Socket.io-client |
    | **Authentication** | JSON Web Tokens (JWT) stored in HTTP-Only Cookies, Bcrypt.js |
    | **Image Storage** | Cloudinary API |
    | **Deployment** | Render (Unified Single-Service Full-Stack) |
    
    ---
    
    ## 📁 Project Structure
    
    ```text
    Threads/
    ├── backend/
    │   ├── controllers/      # Logic for users, posts, and messages
    │   ├── db/               # Database connection setup
    │   ├── middlewares/      # Authentication & route protection
    │   ├── models/           # Mongoose schemas (User, Post, Message, Conversation)
    │   ├── routes/           # Express API endpoints
    │   ├── socket/           # Real-time WebSocket connection handling
    │   ├── utils/            # JWT cookie generation helper
    │   └── server.js         # Express server & static asset serving
    ├── frontend/
    │   ├── public/           # Static icons & logos
    │   └── src/
    │       ├── atoms/        # Recoil global state atoms
    │       ├── components/   # Reusable UI components (Post, SuggestedUsers, etc.)
    │       ├── context/      # Socket context provider
    │       ├── hooks/        # Custom React hooks (useFollowUnfollow, etc.)
    │       ├── pages/        # Views (HomePage, UserPage, ChatPage, Settings)
    │       ├── App.jsx       # Routing & container setup
    │       └── main.jsx      # React DOM entrypoint & theme provider
    └── package.json          # Root deployment & build scripts
  ──────
  ##  Getting Started Locally

  ### 1. Clone the repository

    git clone https://github.com/AnkitaGoyalD2004/Threads-MernStack.git
    cd Threads-MernStack

  ### 2. Environment Variables

  Create a .env file inside the backend/ directory:

    PORT=4500
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

  ### 3. Install Dependencies

    # Install backend dependencies
    cd backend && npm install
    
    # Install frontend dependencies
    cd ../frontend && npm install

  ### 4. Run Locally

  • Start Backend:
    cd backend
    npm run dev
  (Runs on http://localhost:4500)
  • Start Frontend:
    cd frontend
    npm run dev
  (Runs on http://localhost:3000)
  ──────
  ##  Deployment

  The project is configured for automated single-service deployment on Render:
  • The backend serves the Vite production build (frontend/dist) statically.
  • WebSockets and Cookies operate seamlessly on the same origin.
  • Build Command: npm run build
  • Start Command: npm start
