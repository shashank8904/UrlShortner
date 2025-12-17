# 🔗 URL Shortener

A modern URL shortener application built with React and Node.js, featuring real-time analytics and a beautiful UI.

## Features

- ✅ Shorten long URLs
- 📊 Track click analytics
- 📋 One-click copy to clipboard
- 🎨 Modern, responsive UI
- ⚡ Real-time visit tracking

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- ShortID for generating unique IDs

### Frontend
- React.js
- Modern CSS with gradient backgrounds
- Responsive design

## Installation

### Prerequisites
- Node.js installed
- MongoDB running

### Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB (if not already running):
```bash
brew services start mongodb/brew/mongodb-community
```

3. Start the backend server:
```bash
npm start
```

Backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Start the React development server:
```bash
npm start
```

Frontend will run on `http://localhost:3001` (or next available port)

## API Endpoints

### POST `/url`
Create a shortened URL
```json
{
  "url": "https://www.example.com"
}
```

Response:
```json
{
  "id": "abc123"
}
```

### GET `/:shortId`
Redirect to the original URL and track visit

### GET `/url/analytics/:shortId`
Get analytics for a shortened URL

Response:
```json
{
  "totalClicks": 5,
  "analytics": [
    {
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

## Usage

1. Enter a long URL in the input field
2. Click "Shorten URL"
3. Copy the shortened URL
4. Click "View Analytics" to see visit statistics
5. Share your shortened URL!

## Project Structure

```
urlShortner/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.js         # Main component
│   │   ├── App.css        # Styles
│   │   └── index.js       # Entry point
│   └── package.json
├── controllers/
│   └── url.js             # URL controller
├── models/
│   └── url.js             # Mongoose schema
├── routes/
│   └── url.js             # API routes
├── connection.js          # MongoDB connection
├── index.js               # Express server
└── package.json

```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

---

Made with ❤️ using React & Node.js

