# Backend E-Commerce Project Documentation

This documentation provides an overview of the backend APIs for an e-commerce test project. The backend is responsible for handling various operations such as user authentication, profile management, product management, order processing, etc.

## Endpoints

### User Authentication

#### POST /register

- Description: Creates a new user account.
- Request Body:

```json
{
	"status": "success",
	"message": "Successfully registered",
	"body": {
		"id": "integer",
		"email": "string"
	}
}
```

_Response (200 - OK)_

```json
{
	{
  "status": "success",
  "message": "Successfully login",
  "body": {
    "access_token": "string",
    "email": "string",
  }
}
}
```

_Response (400 - Bad Request)_

```json
{
	"status": "error",
	"messages": [
		"Email is required",
		"Password is required",
		"Password must be less than or equal to 5 characters"
	]
}
```

#### POST /login

- Description: Authenticates an existing user.
- Request Body:

```json
{
	"email": "string",
	"password": "string"
}
```

_Response (200 - OK)_

```json
{
	"status": "success",
	"message": "Successfully login",
	"body": {
		"access_token": "string",
		"email": "string"
	}
}
```

_Response (400 - Bad Request)_

```json
{
  "status": "error",
  "message": "Email is required"
}
OR
{
  "status": "error",
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
	"message": "Invalid email/password"
}
```

#### PATCH /password

- Description: Update user password.

- Headers:

```json
{
	"authorization": "string"
}
```

- Request Body :

```json
{
	"oldPassword": "string",
	"newPassword": "string"
}
```

_Response (200 - OK)_

```json
{
	"status": "success",
	"message": "Successfully reset the password"
}
```

_Response (400 - Bad Request)_

```json
{
	"status": "error",
	"messages": [
		"Password is required",
		"Password must be less than or equal to 5 characters"
	]
}
```

_Response (401 - Unauthorized)_

```json
{
	"message": "Invalid password"
}
```

### User Profiles

#### POST /profiles

- Description: Create a user profile.
- Headers:

```json
{
	"authorization": "string"
}
```

- Request Body:

```json
{
	"firstName": "string",
	"lastName": "string",
	"address": "string"
}
```

_Response (200 - OK)_

```json
{
	"status": "success",
	"message": "Successfully created the profile",
	"body": {
		"id": 2,
		"user_id": 1,
		"firstName": "Jack",
		"lastName": "Si Sparrow",
		"address": "Tortuga 27",
		"updatedAt": "2024-04-09T07:47:16.231Z",
		"createdAt": "2024-04-09T07:47:16.231Z"
	}
}
```

_Response (400 - Bad Request)_

```json
{
  "status": "error",
  "message": "User has created the profile"
}
OR
{
    "status": "error",
    "messages": [
        "First Name is required",
        "Address is required"
    ]
}
```

#### PUT /profiles

- Description: Update user profile.
- Headers:

```json
{
	"authorization": "string"
}
```

- Request Body:

```json
{
	"firstName": "string",
	"lastName": "string",
	"address": "string"
}
```

_Response (200 - OK)_

```json
{
	"status": "success",
	"message": "Successfully updated the profile",
	"body": {
		"id": 9,
		"firstName": "Jack",
		"lastName": "Sparrow",
		"address": "Tortuga 27",
		"user_id": 2,
		"createdAt": "2024-04-08T06:45:47.250Z",
		"updatedAt": "2024-04-08T06:45:50.890Z"
	}
}
```

_Response (400 - Bad Request)_

```json
{
	"status": "error",
	"messages": ["First Name is required", "Address is required"]
}
```

_Response (404 - Not Found)_

```json
{
	"status": "error",
	"message": "Profile not found"
}
```

### Products

#### POST /products

- Description: Create a new product.
- Headers:

```json
{
	"authorization": "string"
}
```

- Request Body:

```json
{
	"title": "string",
	"description": "string",
	"price": "integer",
	"stock": "integer",
	"brand": "string",
	"category": "string",
	"thumbnail": "string"
}
```

_Response (200 - OK)_

```json
{
	"status": "success",
	"message": "Successfully add new product",
	"body": {
		"id": 93,
		"title": "iPhone 111",
		"description": "An apple mobile which is nothing like apple",
		"price": 549,
		"stock": 94,
		"brand": "Apple",
		"category": "smartphones",
		"thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
		"updatedAt": "2024-04-08T20:17:45.799Z",
		"createdAt": "2024-04-08T20:17:45.799Z"
	}
}
```

_Response (400 - Bad Request)_

```json
{
	"status": "error",
	"messages": [
		"Title is required",
		"Description is required",
		"Price is required"
		"Stock is required"
		"Brand is required"
		"Category is required"
		"Thumbnail is required"
	]
}
```

#### GET /products

- Description: Get all products.
- Headers:

```json
{
	"authorization": "string"
}
```

_Response (200 - OK)_

```json
{
    "status": "success",
    "message": "Successfully get all products",
    "body": [
        {
            "id": 1,
            "title": "iPhone 9",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
            "createdAt": "2024-04-07T16:24:57.581Z",
            "updatedAt": "2024-04-07T16:24:57.581Z"
        },
        {
            "id": 2,
            "title": "iPhone X",
            "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
            "price": 899,
            "stock": 34,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
            "createdAt": "2024-04-07T16:24:57.581Z",
            "updatedAt": "2024-04-07T16:24:57.581Z"
        },
        ...
    ]
}
```

#### GET /products/:id

- Description: Get product by ID.
- Headers:

```json
{
	"authorization": "string"
}
```

- Params:

```json
{
	"id": "integer"
}
```

_Response (200 - OK)_

```json
{
	"status": "success",
	"message": "Successfully get all products",
	"body": {
		"id": 1,
		"title": "iPhone 9",
		"description": "An apple mobile which is nothing like apple",
		"price": 549,
		"stock": 94,
		"brand": "Apple",
		"category": "smartphones",
		"thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
		"createdAt": "2024-04-07T16:24:57.581Z",
		"updatedAt": "2024-04-07T16:24:57.581Z"
	}
}
```

_Response (404 - Not Found)_

```json
{
	"status": "error",
	"message": "Product not found"
}
```

#### PUT /products/:id

- Description: Update product by ID.
- Headers:

```json
{
	"authorization": "string"
}
```

- Params:

```json
{
	"id": "integer"
}
```

- Request Body:

```json
{
	"title": "string",
	"description": "string",
	"price": "integer",
	"stock": "integer",
	"brand": "string",
	"category": "string",
	"thumbnail": "string"
}
```

_Response (200 - OK)_

```json
{
	"status": "success",
	"message": "Successfully update product",
	"body": {
		"id": 93,
		"title": "iPhone 111",
		"description": "An apple mobile which is nothing like apple",
		"price": 549,
		"stock": 94,
		"brand": "Apple",
		"category": "smartphones",
		"thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
		"updatedAt": "2024-04-08T20:17:45.799Z",
		"createdAt": "2024-04-08T20:17:45.799Z"
	}
}
```

_Response (400 - Bad Request)_

```json
{
	"status": "error",
	"messages": [
		"Title is required",
		"Description is required",
		"Price is required"
		"Stock is required"
		"Brand is required"
		"Category is required"
		"Thumbnail is required"
	]
}
```

_Response (404 - Not Found)_

```json
{
	"status": "error",
	"message": "Product not found"
}
```

#### DELETE /products/:id

- Description: Delete product by ID.
- Headers:

```json
{
	"authorization": "string"
}
```

- Params:

```json
{
	"id": "integer"
}
```

_Response (200 - OK)_

```json
{
	"status": "success",
	"message": "Successfully deleted the product"
}
```

_Response (404 - Not Found)_

```json
{
	"status": "error",
	"message": "Product not found"
}
```

### Orders

#### POST /orders

- Description: Place a new order.
- Headers:

```json
{
	"authorization": "string"
}
```

- Request Body:

```json
{
	"items": [
		{
			"id": "integer",
			"quantity": "integer"
		},
		{
			"id": "integer",
			"quantity": "integer"
		}
	]
}
```

_Response (200 - OK)_

```json
{
	"status": "success",
	"message": "Successfully created the order"
}
```

_Response (400 - Bad Request)_

```json
{
	"status": "error",
	"message": "Products is required"
}
OR
{
    "status": "error",
    "message": "Insufficient stock for product 2"
}
```

#### GET /orders/:id

- Description: Get order details by ID.
- Headers:

```json
{
	"authorization": "string"
}
```

- Params:

```json
{
	"id": "integer"
}
```

_Response (200 - OK)_

```json
{
	"status": "success",
	"message": "Successfully get the order",
	"body": {
		"id": 1,
		"user_id": 2,
		"total_amount": 5593,
		"status": "pending",
		"createdAt": "2024-04-09T06:44:17.271Z",
		"updatedAt": "2024-04-09T06:44:17.271Z",
		"user": {
			"email": "jack1@gmail.com",
			"role": "buyer",
			"profile": {
				"id": 1,
				"firstName": "Jack",
				"lastName": "Si Sparrow",
				"address": "Tortuga 27",
				"user_id": 2
			}
		},
		"items": [
			{
				"id": 1,
				"order_id": 1,
				"product_id": 1,
				"quantity": 2,
				"createdAt": "2024-04-09T06:44:17.274Z",
				"updatedAt": "2024-04-09T06:44:17.274Z",
				"product": {
					"id": 1,
					"title": "iPhone 9",
					"description": "An apple mobile which is nothing like apple",
					"price": 549,
					"stock": 92,
					"brand": "Apple",
					"category": "smartphones",
					"thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
				}
			},
			{
				"id": 2,
				"order_id": 1,
				"product_id": 2,
				"quantity": 5,
				"createdAt": "2024-04-09T06:44:17.283Z",
				"updatedAt": "2024-04-09T06:44:17.283Z",
				"product": {
					"id": 2,
					"title": "iPhone X",
					"description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
					"price": 899,
					"stock": 29,
					"brand": "Apple",
					"category": "smartphones",
					"thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
				}
			}
		]
	}
}
```

_Response (404 - Not Found)_

```json
{
	"status": "error",
	"message": "Order not found"
}
```

#### PATCH /orders/:id/status

- Description: Update order status.
- Headers:

```json
{
	"authorization": "string"
}
```

- Request Body:

```json
{
  "status": "pending" || "processing" || "delivered"
}
```

- Params:

```json
{
	"id": "integer"
}
```

_Response (200 - OK)_

```json
{
	"status": "success",
	"message": "Successfully updated status order"
}
```

_Response (404 - Not Found)_

```json
{
	"status": "error",
	"message": "Order not found"
}
```

## Environment Variables

- **PORT**: Port on which the server should run.
- **DB_HOST**: Hostname for the PostgreSQL database.
- **DB_NAME**: Name of the PostgreSQL database.
- **DB_USERNAME**: Username for authenticating to the PostgreSQL database.
- **DB_PASSWORD**: Password for authenticating to the PostgreSQL database.
- **JWT_SECRET_KEY**: Secret key for generating JWT tokens.
- **ADMIN_EMAIL**: Email for user admin.
- **ADMIN_PASSWORD**: Password for user admin.

## Database Configuration

The backend uses PostgreSQL as the database. Sequelize is used for database migration.

## Setup server

- Run `npm run setup_DB`

## Running the Server

- Install dependencies: `npm install`
- Start the server: `npm run dev`

Make sure to set up the environment variables in a `.env` file before running the server.
