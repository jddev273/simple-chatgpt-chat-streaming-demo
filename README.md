# Streamed ChatGPT API Demo

This repository contains a simple web application that provides a simple Node.JS chat application using the ChatGPT API through the streamed-chatgpt-api node library. Chat messages for each user are stored in memory.

## Video Demo

[![Streaming Chat Demo](https://img.youtube.com/vi/Rc2kJ9LcgMg/0.jpg)](https://www.youtube.com/watch?v=Rc2kJ9LcgMg)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (LTS or higher)
- [npm](https://www.npmjs.com/get-npm) (comes bundled with Node.js)

## Installation

1. Clone this repository:

```
git clone https://github.com/jddev273/simple-chatgpt-chat-streaming-demo.git
```


2. Navigate to the project directory:

```
cd streamed-chatgpt-demo
```

3. Install the required dependencies:

```
npm install
```

## Configuration

Set the OPENAPI_KEY environment variable.  Ex. Linux/Unix.

```
Export OPENAI_API_KEY=your_openai_api_key_here
```

Or justset the apiKey variable to your api key in the chat route.

## Usage

1. Start the server:

npm start


2. Open your browser and visit `http://localhost:3000` to interact with the AI assistant.

## Application Structure

- `app.js`: The main entry point of the application, containing the server setup and route definitions.
- `public/`: A folder containing the static assets served by the application, such as the `index.html` file and any client-side scripts or styles.

## License

MIT Licensed

## Author

Johann Dowa
