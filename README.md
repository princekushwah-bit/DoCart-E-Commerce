DoCart - AI-Powered MERN E-Commerce Store
DoCart is a modern, full-stack e-commerce platform built with the MERN (MongoDB, Express, React, Node.js) stack. It features an advanced AI Chatbot that assists users with inventory queries, order tracking, and personalized shopping recommendations.

🚀 Key Features
🤖 Smart AI Assistant: Powered by Groq (Llama 3.3-70B) for real-time customer support.

Inventory Search: Find products by name, category, or price.

Order Tracking: Trace orders simply by providing the checkout name.

Best Sellers & Stock Alerts: AI highlights trending items and low-stock warnings.

Multilingual: Supports both Professional English and Hinglish.

🛍️ Full E-Commerce Flow: Product listing, shopping cart, and secure checkout.

📱 Responsive UI: Fully optimized for mobile and desktop using Tailwind CSS.

🔒 Secure Authentication: User login and signup functionality.

🛠️ Admin Dashboard: Management of products, categories, and order statuses.

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS, React Context API, Axios.

Backend: Node.js, Express.js.

Database: MongoDB Atlas (Mongoose ODM).

AI Engine: Groq SDK (Llama-3.3-70b-versatile).

Deployment: Render (Backend) & Vercel (Frontend).

📂 Project Structure (Monorepo)
Plaintext
DoShopAI-main/
├── backend/        # Node.js API, Groq Integration, Models & Controllers
├── frontend/       # React App, Tailwind Styling, Context API
└── README.md       # Project Documentation
🔧 Installation & Setup
Clone the Repository:

Bash
git clone https://github.com/your-username/DoCart-FullStack.git
cd DoCart-FullStack
Backend Setup:

Navigate to /backend and run npm install.

Create a .env file and add:

Code snippet
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
PORT=4000
Run npm start.

Frontend Setup:

Navigate to /frontend and run npm install.

Run npm run dev.

👨‍💻 About the Developer
Prince Kushwah 4th-year B.Tech Computer Science Engineering

MANIT Bhopal (Maulana Azad National Institute of Technology)

Scholar Number: 2211201362

DoCart was developed as a high-performance project to demonstrate the integration of Generative AI within traditional e-commerce workflows.