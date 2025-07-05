# GrowthProAI - Local Business Dashboard

A full-stack web application that simulates how small businesses might view their SEO content and Google Business data. Built with React, Tailwind CSS, Node.js, Express, and SQLite.

## Features

- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, professional design with Tailwind CSS
- 🚀 **Real-time Data**: Simulated business ratings, reviews, and AI-generated SEO headlines
- 💾 **Data Persistence**: SQLite database for storing business information
- 🔄 **Dynamic Headlines**: Regenerate SEO headlines with a single click
- ✨ **Loading States**: Smooth loading animations and user feedback
- 🎯 **Form Validation**: Client-side validation for better user experience

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Modern JavaScript (ES6+)
- Responsive Design
- Custom animations

### Backend
- Node.js
- Express.js
- SQLite Database
- CORS enabled
- RESTful API design

## Project Structure

```
GrowthProAI-Dashboard/
├── backend/
│   ├── server.js              # Express server with API endpoints
│   ├── package.json           # Backend dependencies
│   └── business.db            # SQLite database (created automatically)
├── frontend/
│   ├── public/
│   │   └── index.html         # Main HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputForm.js   # Business information form
│   │   │   └── DisplayCard.js # Business data display
│   │   ├── App.js             # Main application component
│   │   ├── App.css            # Application styles
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Global styles
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── postcss.config.js      # PostCSS configuration
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd GrowthProAI-Dashboard
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```
   The backend server will run on `http://localhost:3000`

3. **Set up the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend will run on `http://localhost:3001`

### Development Setup

For development, you can run both servers simultaneously:

**Backend (Terminal 1):**
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm start
```

## API Endpoints

### POST /business-data
Creates business data with simulated metrics.

**Request Body:**
```json
{
  "name": "Cake & Co",
  "location": "Mumbai"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "Cake & Co",
  "location": "Mumbai",
  "rating": 4.3,
  "reviews": 127,
  "headline": "Why Cake & Co is Mumbai's Sweetest Spot in 2025",
  "createdAt": "2025-01-15T10:30:00.000Z"
}
```

### GET /regenerate-headline
Generates a new SEO headline for the business.

**Query Parameters:**
- `name`: Business name
- `location`: Business location

**Response:**
```json
{
  "headline": "Experience Excellence at Cake & Co in Mumbai"
}
```

## Usage

1. **Enter Business Information**: Fill in the business name and location in the form
2. **View Business Insights**: See simulated Google rating, review count, and AI-generated headline
3. **Regenerate Headlines**: Click the "Regenerate SEO Headline" button to get new headline suggestions
4. **Responsive Experience**: Use the app on any device - it's fully responsive

## Features in Detail

### Form Validation
- Required field validation
- Minimum length validation
- Real-time error feedback
- User-friendly error messages

### Loading States
- Animated loading spinners
- Disabled buttons during requests
- Visual feedback for all user actions

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Accessible color contrast

### Error Handling
- Network error handling
- User-friendly error messages
- Graceful fallbacks

## Customization

### Adding New Headlines
Edit the `seoHeadlines` array in `backend/server.js`:

```javascript
const seoHeadlines = [
    "Your custom headline template for {businessName} in {location}",
    // Add more templates...
];
```

### Styling Changes
Modify `frontend/tailwind.config.js` to customize the design system:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom color palette
        }
      }
    }
  }
}
```

## Performance Optimizations

- Lazy loading for components
- Optimized bundle size
- Efficient re-renders
- Minimal API calls
- Compressed assets
