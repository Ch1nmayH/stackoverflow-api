# StackOverflow API - Question Management

This API allows you to manage StackOverflow questions by fetching, filtering, updating, and deleting them. The data is fetched from StackExchange’s API and stored in a database for easy access and manipulation.

## Live API

The API is hosted at:

```yaml
https://api.stackoverflow.chinmayh.me
```

---

## Endpoints

### 1. **Load Fresh Questions**
  **POST** `/questions/load`
  - Usage  : Use tools like postman to test the api ```http://localhost:5000/api/stackOverFlow``` using POST request add the endpoint ```/questions/load``` and it will load 100 questions and store it in the MongoDB.
  - This endpoint loads fresh questions from StackOverflow and stores them in the database. It fetches 100 questions from StackExchange using the following URL:
    ```yaml
    https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow&pagesize=100&page=1
    ```
    
---

### 2. **Get All Questions / Get Question by ID**

**GET** `/questions/:id?`

This endpoint retrieves questions from the database. You can filter and paginate the questions based on the query parameters.

#### Query Parameters:
- **`is_answered`**: Filter questions by whether they are answered (`true`/`false`).
- **`answers_count__gt`**: Filter questions with more than a specified number of answers.
- **`answers_count__lt`**: Filter questions with fewer than a specified number of answers.
- **`sort`**: Sort questions by `score` (trending) or `created_at` (latest).
- **`page`**: The page number for pagination.
- **`limit`**: The number of results per page.
  
Example:
```yaml
GET http://localhost:5000/api/stackOverFlow/questions?is_answered=true&answers_count__gt=5&answers_count__lt=10&sort=score&page=1
```

---

### 3. **Update Question by ID**

**PUT** `/questions/:id?`

This endpoint updates an existing question based on the ID provided. The request should include the fields you want to update (e.g., `title`, `tags`, etc.). If the ID is invalid or the fields are missing, an error will be returned.

Example:

```yaml
PUT http://localhost:5000/api/stackOverFlow/questions/:id { "title": "Updated Title", "tags": ["javascript", "node.js"] }
```

---

### 4. **Delete Question by ID**

**DELETE** `/questions/:id?`

This endpoint deletes a question by its ID. If the ID is invalid or not found, an error will be returned.

Example:
```yaml
DELETE http://localhost:5000/api/stackOverFlow/questions/:id
```

---

## How It Works

1. **Load Fresh Questions**:
   - The `POST /questions/load` endpoint fetches questions from the StackExchange API and stores them in the database. Duplicate questions are avoided by checking the existing questions before adding new ones.

2. **Filtering & Sorting**:
   - The `GET /questions` endpoint supports multiple filtering and sorting options like:
     - **Filter by answered status** (`is_answered`)
     - **Filter by answer count** (`answers_count__gt`, `answers_count__lt`)
     - **Sort by score** (Trending) or **created_at** (Latest)
     - Pagination support with `page` and `limit` query parameters

3. **Updating Questions**:
   - The `PUT /questions/:id` endpoint allows updating specific fields of a question. It checks for the ID and ensures at least one field is provided for updating.

4. **Deleting Questions**:
   - The `DELETE /questions/:id` endpoint removes a question based on the provided ID. It ensures the ID exists before performing the deletion.

---

## Example Request

To get questions filtered by answered status and sorted by score with pagination:
```yaml
GET http://localhost:5000/api/stackOverFlow/questions?is_answered=true&answers_count__gt=5&answers_count__lt=10&sort=score&page=1
```

**To update a question's title and tags:**
```yaml
PUT http://localhost:5000/api/stackOverFlow/questions/:id { "title": "Updated Question Title", "tags": ["node.js", "express"] }
```

**To delete a question:**
```yaml
DELETE http://localhost:5000/api/stackOverFlow/questions/:id
```

---

## Error Handling

- Invalid ID or missing ID in update and delete operations will return a **404 Not Found** error.
- Invalid or missing fields during updates will return a **400 Bad Request** error.

---

## Conclusion

This API enables users to manage StackOverflow questions effectively, providing filtering, sorting, and pagination options for easy retrieval of questions. You can also update and delete questions as needed. The API is live at `https://api.stackoverflow.chinmayh.me`.



