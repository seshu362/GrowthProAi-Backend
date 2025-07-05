const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
const cors = require("cors");

let db;
const app = express();
app.use(express.json());
app.use(cors());

// Static headlines for simulation
const seoHeadlines = [
    "Why {businessName} is {location}'s Hidden Gem in 2025",
    "The Ultimate Guide to {businessName} in {location}",
    "{businessName}: Your Go-To Destination in {location}",
    "Discover Why {businessName} is {location}'s Best Kept Secret",
    "Experience Excellence at {businessName} in {location}",
    "{businessName} - Where Quality Meets Service in {location}",
    "Top Reasons to Visit {businessName} in {location} Today",
    "Why {businessName} is {location}'s Premier Choice",
    "{businessName}: Setting New Standards in {location}",
    "The Story Behind {location}'s Favorite - {businessName}"
];

const initializeDBandServer = async () => {
    try {
        db = await open({
            filename: path.join(__dirname, "business.db"),
            driver: sqlite3.Database,
        });
        
        // Create businesses table if it doesn't exist
        await db.exec(`
            CREATE TABLE IF NOT EXISTS businesses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                location TEXT NOT NULL,
                rating REAL DEFAULT 4.3,
                reviews INTEGER DEFAULT 127,
                headline TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000/");
        });
    } catch (error) {
        console.log(`Database error is ${error.message}`);
        process.exit(1);
    }
};

initializeDBandServer();

// Helper function to generate random rating between 3.5 and 5.0
const generateRandomRating = () => {
    return Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
};

// Helper function to generate random review count between 50 and 300
const generateRandomReviews = () => {
    return Math.floor(Math.random() * 251) + 50;
};

// Helper function to generate headline
const generateHeadline = (businessName, location) => {
    const randomIndex = Math.floor(Math.random() * seoHeadlines.length);
    return seoHeadlines[randomIndex]
        .replace(/{businessName}/g, businessName)
        .replace(/{location}/g, location);
};

// POST /business-data - Create business data
app.post("/business-data", async (req, res) => {
    const { name, location } = req.body;
    
    if (!name || !location) {
        return res.status(400).json({ error: "Business name and location are required" });
    }
    
    try {
        const rating = generateRandomRating();
        const reviews = generateRandomReviews();
        const headline = generateHeadline(name, location);
        
        const result = await db.run(
            "INSERT INTO businesses (name, location, rating, reviews, headline) VALUES (?, ?, ?, ?, ?)",
            [name, location, rating, reviews, headline]
        );
        
        res.json({
            id: result.lastID,
            name,
            location,
            rating,
            reviews,
            headline,
            createdAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Error creating business data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET /regenerate-headline - Generate new headline
app.get("/regenerate-headline", async (req, res) => {
    const { name, location } = req.query;
    
    if (!name || !location) {
        return res.status(400).json({ error: "Business name and location are required as query parameters" });
    }
    
    try {
        const newHeadline = generateHeadline(name, location);
        res.json({
            headline: newHeadline
        });
    } catch (error) {
        console.error("Error generating headline:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET /api/businesses - Retrieve all businesses (bonus endpoint)
app.get("/api/businesses", async (req, res) => {
    try {
        const businesses = await db.all("SELECT * FROM businesses ORDER BY createdAt DESC");
        res.json(businesses);
    } catch (error) {
        console.error("Error retrieving businesses:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE /api/businesses/:id - Delete a business by ID (bonus endpoint)
app.delete("/api/businesses/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await db.run("DELETE FROM businesses WHERE id = ?", [id]);
        if (result.changes === 0) {
            res.status(404).json({ error: "Business not found" });
        } else {
            res.json({ message: "Business deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting business:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});