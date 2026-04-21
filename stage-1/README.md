# Stage-1: Profile Classification API

A comprehensive REST API that classifies user profiles by analyzing gender, age, and nationality using multiple third-party APIs (Genderize.io, Agify.io, Nationalize.io) and stores the results in MongoDB.

## Author/Contact Information

**Author:** [Your Name]
**Email:** [your.email@example.com]
**GitHub:** [your-github-profile]

## Link to Bug Tracker

[Bug Tracker](https://github.com/Klausgrey/HNG-14/issues)

## Known Issues

- None currently identified

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

The server will run on `http://localhost:8080` by default.

You should see:

```
Server is running
Connected to MongoDB
```

## API Endpoints

### 1. Create Profile

**POST** `/api/profiles`

Creates a new profile with gender, age, and nationality predictions.

#### Using Postman:

1. Set request method to **POST**
2. URL: `http://localhost:8080/api/profiles`
3. Go to **Body** tab → select **raw** → choose **JSON**
4. Enter:

```json
{
	"name": "John"
}
```

5. Click **Send**

#### Response (Success):

```json
{
	"status": "success",
	"data": {
		"name": "John",
		"gender": "male",
		"age": 35,
		"nationality": "US",
		"probability": 0.92,
		"processed_at": "2026-04-18T10:30:00.000Z"
	}
}
```

#### Response (Profile Already Exists):

```json
{
  "status": "success",
  "message": "Profile already exists",
  "data": { ... }
}
```

### 2. Get All Profiles

**POST** `/api/profiles`

Retrieves all stored profiles.

#### Using Postman:

1. Set request method to **POST**
2. URL: `http://localhost:8080/api/profiles`
3. Click **Send**

### 3. Get Profile by ID

**POST** `/api/profiles/:id`

Retrieves a specific profile by ID.

#### Using Postman:

1. Set request method to **POST**
2. URL: `http://localhost:8080/api/profiles/[PROFILE_ID]`
3. Click **Send**

### 4. Delete Profile

**POST** `/api/profiles/:id`

Deletes a specific profile.

#### Using Postman:

1. Set request method to **POST**
2. URL: `http://localhost:8080/api/profiles/[PROFILE_ID]`
3. Click **Send**

## Instructions to Run Test Suite(s)

Currently, no automated test suite is configured. To test the API:

1. Start the server: `npm start`
2. Open **Postman**
3. Test each endpoint as described above
4. Verify responses match expected format

## Dependencies

- **express**: Web framework
- **cors**: Cross-Origin Resource Sharing
- **mongoose**: MongoDB object modeling
- **dotenv**: Environment variable management
- **mongodb**: MongoDB driver
- **uuidv7**: UUID generation
models/
  user.js
  doctor.js
  appointment.js
routes/
  authRoutes.js
  doctorRoutes.js
  appointmentRoutes.js
controllers/
  authController.js
  doctorController.js
  appointmentController.js
middleware/
  auth.js
  roleCheck.js
app.js
server.js