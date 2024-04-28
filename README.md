# Scraper App

## Overview
This application scrapes product details from Amazon search results. It uses Node.js for the backend and plain HTML/CSS/JavaScript for the frontend.

## Requirements
- Node.js
- NPM

## Installation
1. **Clone the Repository**
   ```bash
   git clone **this repo**
   cd amazon-scraper
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```

***Running the Application***


## Flow
1. Start: 'npm install' should put up what you need.
2. Second: !important. 'npm run start' should initialize the server that get the amazon productos that you want to scrap from the html front.
2. Input: Now you have to go to ./frontend/index.html and start the 'Live Server' to serve the page locally.
**Note**: Alternatively, you can use any static server. For example, using http-server:
   ```bash
   npm install -g http-server
   http-server .
   ```
3. Processing: The app processes the input data according to a specific algorithm or logic (fetch to the amazon API)
4. Output: It return whatever you put in the search field. Awesome.

