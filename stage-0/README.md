# Stage-0 Gender Classifier API

A simple Express.js API that classifies names by gender using the Genderize.io API.

## Features

- RESTful API endpoint for gender classification
- Returns gender predictions with confidence metrics
- CORS enabled for cross-origin requests
- Error handling and validation

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Build Instructions

No build step required. This is a runtime Node.js application.

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Run Instructions

Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000`

### API Endpoint

**GET** `/api/classify`

#### Query Parameters

- `name` (required): The name to classify

#### Response Example

```json
{
	"status": "success",
	"data": {
		"name": "John",
		"gender": "male",
		"probability": 0.92,
		"sample_size": 1500,
		"is_confident": true,
		"processed_at": "2026-04-13T10:30:00.000Z"
	}
}
```

#### Error Response

```json
{
	"status": "error",
	"message": "name is missing"
}
```

## Error Codes

- `400`: Missing or invalid query parameters
- `422`: Wrong data type for parameters
- `500`: Server error

## Dependencies

- **express**: Web framework
- **cors**: Cross-Origin Resource Sharing middleware
