# Car Insurance Calculator

This app consists of 3 APIs that allow users to calculate car value, find out their risk rating, and finally get an insurance premium quote.

---

### Endpoints

1. Post/carvalue
   This endpoint calculate `car value`:

---

2. Post/riskrating
   This endpoint calcuate `risk rating`

---

3. POST /quote

This endpoint calculates the insurance `premium` based on the provided `car_value` and `risk_rating`.

Request Body:

```
   {
   "car_value": <number>,
   "risk_rating": <number>
   }
```

Response (Success, 200 OK):

```
{
  "monthly_premium": <number>,
  "yearly_premium": <number>
}
```

Example Request:

```
{
  "car_value": 5000,
  "risk_rating": 1
}
```

Example Response:

```
{
  "monthly_premium": 4.17,
  "yearly_premium": 50
}
```

Response (Error, 400 Bad Request):

- If car_value is missing, not a number, negative:

```
{ "error": "message will handle cases specifically" }
```

- If risk_rating is missing, not a number, or out of range (not between 1 and 5):

```
{ "error": "message will handle cases specifically" }
```

---

### Running the Project

1. Clone the repository:

```
git clone <repo-url>
cd <project-directory>
```

2. Install dependencies:

```
npm install
```

3. Run the server:

```
npm run dev
```

4. The API will be available at http://localhost:3000.

---

### Running Tests

To run the tests for the API, use Jest:

1. Install dependencies (if not already done):

```
npm install
```

2. Run tests:

```
npm test:api1
npm test:api2
npm test:api3
```

---

### Project Structure

```js

- src/api/

  - api1/

    - controllers/ - Contains logic for handling API requests.
    - models/ - Contains the business logic for calculating premiums.
    - routes/ - Defines API routes.
    - app.ts - Initializes the Express app and middleware.

  - api2/

    - controllers/ - Contains logic for handling API requests.
    - models/ - Contains the business logic for calculating premiums.
    - routes/ - Defines API routes.
    - app.ts - Initializes the Express app and middleware.

  - api3/

    - controllers/ - Contains logic for handling API requests.
    - models/ - Contains the business logic for calculating premiums.
    - routes/ - Defines API routes.
    - app.ts - Initializes the Express app and middleware.
```

---

### Technologies Stack

- Express for the web framework.
- TypeScript for static typing and development
- Jest for unit testing
- Supertest for HTTP testing

### END of Document
