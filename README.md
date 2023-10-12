# Web Scraping and PDF Generation

This Node.js application enables web scraping of blog entries from a website using Puppeteer and generates PDF reports from the scraped data. It includes sentiment analysis, word counting, and PDF report creation.

## Features

- **Scraping Blog Entries:** The application scrapes blog entries from a website, including details such as title, short description, author, date, and sentiment analysis.

- **Sentiment Analysis:** It analyzes the sentiment of each blog entry, categorizing it as positive, negative, or neutral based on predefined keywords.

- **Word Count:** The application counts the number of words in each blog entry, providing insights into the content's length.

- **PDF Generation:** It generates a PDF report with the scraped data, including the title, short description, author, sentiment, word count, and a link to the original blog entry.

## Technical Choices

- **Puppeteer:** The application uses Puppeteer, a headless browser automation tool, for web scraping. It launches a headless Chromium browser to navigate web pages and extract data.

- **Cheerio:** Cheerio is employed for parsing HTML content. It simplifies the extraction of data from the web page's HTML structure.

- **Styled-Components:** The application utilizes styled-components for styling, allowing the definition of styles directly within the JavaScript code.

- **TypeScript:** The codebase is written in TypeScript, providing static type checking for enhanced code quality and maintainability.

- **Express:** The application uses Express, a popular Node.js framework, to set up a REST API with proper routing and handling.

- **CORS:** CORS middleware is implemented to handle cross-origin resource sharing, making the API accessible from different domains.

- **Body Parser:** The application uses the body-parser middleware to parse JSON data from requests.

- **Scraping Router:** Routing is organized using the `scrapeRouter` module to handle web scraping requests.
