const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, "../frontend")));

const PORT = process.env.PORT || 3000;

// Endpoint for scraping Amazon search results
app.get("/api/scrape", async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    // Send a GET request to Amazon search results page
    const response = await axios.get(
      `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`,
      {
        headers: {
          // Set a custom User-Agent header to mimic a web browser
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
        },
      }
    );

    // Parse the HTML response using JSDOM
    const dom = new JSDOM(response.data);

    // Extract relevant information from the search results
    const items = [
      ...dom.window.document.querySelectorAll(".s-result-item"),
    ].map((item) => ({
      title: item.querySelector("h2 a span")?.textContent,
      rating: item.querySelector(".a-icon-alt")?.textContent,
      reviews: item.querySelector(".a-size-base")?.textContent,
      imageUrl: item.querySelector(".s-image")?.src,
    }));

    // Filter out items without a title and send the results as JSON
    res.json(items.filter((item) => item.title));
  } catch (error) {
    // Handle any errors that occur during scraping
    console.error('Scraping error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
