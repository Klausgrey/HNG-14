# Stage 2: Profile Search API with NLP

A RESTful API built with Express.js and MongoDB that enables advanced profile searching using both structured queries and natural language processing (NLP).

## Features

- **Profile Management**: Fetch profiles with advanced filtering and sorting capabilities
- **NLP Search**: Parse natural language queries to extract filtering criteria
- **Flexible Filtering**: Filter by gender, age, age group, and country
- **Pagination**: Efficient data retrieval with configurable page size (max 50)
- **Sorting**: Sort results by any profile attribute
- **MongoDB Integration**: Persistent data storage with Mongoose ODM

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the following variables:

```
MONGO_URI=mongodb://your-mongodb-uri
PORT=8080
```

3. Seed the database with initial profile data:

```bash
npm run seed
```

## Usage

### Start the server:

```bash
npm start
```

The server will run on `http://localhost:8080` (or the port specified in `.env`)

## API Endpoints

### GET `/api/profiles`

Retrieve profiles with advanced filtering and sorting.

**Query Parameters:**

- `gender` (string): Filter by gender ("male" or "female")
- `min_age` (number): Minimum age filter
- `max_age` (number): Maximum age filter
- `age_group` (string): Filter by age group ("child", "teenager", "adult", "senior")
- `country_id` (string): Filter by country ISO code
- `min_gender_probability` (number): Minimum gender prediction confidence (0-1)
- `min_country_probability` (number): Minimum country prediction confidence (0-1)
- `sort_by` (string): Field to sort by (default: none)
- `order` (string): Sort order ("asc" or "desc", default: "asc")
- `page` (number): Page number (default: 1)
- `limit` (number): Results per page, max 50 (default: 10)

**Example:**

```bash
curl "http://localhost:8080/api/profiles?gender=female&min_age=25&max_age=35&page=1&limit=10"
```

**Response:**

```json
{
	"status": "success",
	"page": 1,
	"limit": 10,
	"total": 150,
	"data": [
		{
			"_id": "uuid-string",
			"name": "John Doe",
			"gender": "male",
			"gender_probability": 0.95,
			"age": 28,
			"age_group": "adult",
			"country_id": "US",
			"country_name": "United States",
			"country_probability": 0.87,
			"created_at": "2024-04-21T10:30:00.000Z"
		}
	]
}
```

### GET `/api/profiles/search`

Search profiles using natural language queries.

**Query Parameters:**

- `q` (string, **required**): Natural language search query
- `page` (number): Page number (default: 1)
- `limit` (number): Results per page, max 50 (default: 10)

**Supported Query Patterns:**

- Gender: "male", "female"
- Age groups: "child", "teenager", "adult", "senior"
- Age ranges: "above 18", "below 30", "young" (16-24)
- Countries: "from [country name]"

**Examples:**

```bash
# Find female adults from Nigeria
curl "http://localhost:8080/api/profiles/search?q=female%20adult%20from%20Nigeria"

# Find males above 25
curl "http://localhost:8080/api/profiles/search?q=male%20above%2025"

# Find young females from Canada
curl "http://localhost:8080/api/profiles/search?q=young%20female%20from%20Canada"
```

## Project Structure

```
stage-2/
├── app.js                    # Express app configuration
├── server.js                 # Server entry point
├── seed.js                   # Database seeding script
├── package.json              # Project dependencies
├── profiles.json             # Initial profile data
├── .env                      # Environment variables (not in repo)
├── controls/
│   └── profileController.js  # Route handlers
├── models/
│   └── profileDb.js          # Mongoose schema
├── routers/
│   └── profileRoute.js       # Route definitions
└── utils/
    └── nlpParser.js          # Natural language query parser
```

## Technologies Used

- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **i18n-iso-countries**: Country name to ISO code mapping
- **uuidv7**: UUID generation for unique identifiers

## Scripts

- `npm start`: Start the server
- `npm run seed`: Seed the database with initial profile data

## Error Handling

The API returns consistent error responses:

```json
{
	"status": "error",
	"message": "Error description"
}
```

Common error scenarios:

- `400 Bad Request`: Missing or invalid parameters (e.g., missing `q` parameter in search)
- `500 Internal Server Error`: Server-side errors

## Limitations

- Maximum results per page is capped at 50
- Minimum results per page is 1
- Search query interpretation may fail for ambiguous inputs
- Country filtering requires valid ISO country names

## Natural Language Parsing Approach

The `/api/profiles/search` endpoint uses a rule-based parser (`nlpParser.js`)
with no AI or LLMs. It works by scanning the query string for specific keywords
and patterns using `.includes()` and regex.

### Keyword Mappings

| Query Pattern | Filter Applied |
|---|---|
| "male" / "males" | gender = male |
| "female" / "females" | gender = female |
| "young" | min_age = 16, max_age = 24 |
| "above X" | min_age = X |
| "below X" | max_age = X |
| "child" / "children" | age_group = child |
| "teenager" / "teenagers" | age_group = teenager |
| "adult" / "adults" | age_group = adult |
| "senior" / "seniors" | age_group = senior |
| "from [country]" | country_id = ISO code |

### Parser Limitations

- Multi-word country names ("south africa", "united states") are not supported
  — the regex only captures one word after "from"
- "young" is not a stored age group, it maps to min_age/max_age only
- No synonym support ("elderly" won't map to senior)
- Queries with no recognizable keywords return an error
- Country matching is case-insensitive but spelling must be exact