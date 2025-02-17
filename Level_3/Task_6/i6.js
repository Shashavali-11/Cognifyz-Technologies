// const axios = require('axios');
// const cheerio = require('cheerio');

// async function scrapeWebsite(url) {
//     try {
//         const { data } = await axios.get(url);
//         const $ = cheerio.load(data);
//         const title = $("title").text();
//         console.log("Page Title:", title);
//     } catch (error) {
//         console.error("Error scraping:", error);
//     }
// }

// // Example Usage
// scrapeWebsite("https://example.com");






const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

// Create an interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to scrape the website
async function scrapeWebsite(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title = $("title").text();
        console.log("Page Title:", title);
    } catch (error) {
        console.error("Error scraping:", error.message);
    } finally {
        rl.close();
    }
}

// Ask the user for a URL
rl.question("Enter a website URL: ", (url) => {
    scrapeWebsite(url);
});
