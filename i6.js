const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title = $("title").text();
        console.log("Page Title:", title);
    } catch (error) {
        console.error("Error scraping:", error);
    }
}

// Example Usage
scrapeWebsite("https://example.com");
