# Stage-1 Project

## Description

Gender classifier API built with Express.js and Genderize.io API integration.



## Instructions to Build

No build process required. This is a Node.js Express application that runs directly.

1. Ensure Node.js (v14+) and npm are installed
2. Install dependencies:

```bash
npm install
```

## Instructions to Run

Start the server:

```bash
npm start
```

Or run directly with Node:

```bash
node index.js
```

The server will start on `http://localhost:3000` by default.

### API Endpoint

**GET** `/api/classify?name=<name>`

#### Example Request

```bash
curl "http://localhost:3000/api/classify?name=John"
```

#### Example Response

```json
{
	"status": "success",
	"data": {
		"name": "John",
		"gender": "male",
		"probability": 0.92,
		"sample_size": 1500,
		"is_confident": true,
		"processed_at": "2026-04-16T10:30:00.000Z"
	}
}
```

## Instructions to Run Test Suite(s)

Currently, no automated test suite is configured. To test the API manually:

1. Start the server: `npm start`
2. Use curl, Postman, or any HTTP client to test the `/api/classify` endpoint
3. Test with different name parameters to verify responses

To add tests in the future, install a testing framework (e.g., Jest or Mocha) and create test files.
