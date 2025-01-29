# Jumbo Backend Assignment

## Setup Instructions

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file and add the required environment variables. (I have pushed the .env file to the repo, which is not agood practice but I have done this for easy project assessment process)
4. Run `npm run dev` to start the server.

## API Documentation

### Sample Postman Requests

#### Get Products
- **Endpoint**: `GET /products`
- **Query Parameters**:
  - `page`: (optional) Page number for pagination (default is 1)
  - `limit`: (optional) Number of products per page (default is 10)
  - `tag`: (optional) Filter by product tag
  - `minPrice`: (optional) Filter by product price lower limit
  - `maxPrice`: (optional) Filter by product price upper limit
  - `search`: (optional) Search by product name (Case sensitive)

**Example Request**:
```
GET /products?page=1&limit=10&tag=electronics
```

#### Get Product by ID
- **Endpoint**: `GET /products/:id`

**Example Request**:
```
GET /products/1
```

#### Create Product
- **Endpoint**: `POST /products`
- **Body**:
```json
{
  "name": "New Product",
  "price": 100,
  "description": "Description of the new product",
  "category": "electronics",
  "tag": "new"
}
```

**Example Request**:
```
POST /products
```

#### Update Product
- **Endpoint**: `PUT /products/:id`
- **Body**:
```json
{
  "name": "Updated Product",
  "price": 150
}
```

**Example Request**:
```
PUT /products/1
```

#### Delete Product
- **Endpoint**: `DELETE /products/:id`

**Example Request**:
```
DELETE /products/1
```

Refer to the Postman collection for API testing.

Collection Link: https://www.postman.com/garuda-api/workspace/jumbo/collection/35349355-472cbbee-d8b2-493a-b6c5-ef9eb09dae1c?action=share&creator=35349355
