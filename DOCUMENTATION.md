# MERN Product Store — Project Documentation

## Overview

This project is a simple **Product Store** built with the MERN stack. It allows users to:

- View a list of products
- Add new products
- Update existing products
- Delete products

The backend is built with **Node.js**, **Express**, and **MongoDB** (via Mongoose).  
The frontend is built with **React** and **Chakra UI** for styling, using **Zustand** for state management.

---

## Project Structure

```
mern-crash-course/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── product.model.js
│   ├── routes/
│   │   └── product.route.js
│   ├── controllers/
│   │   └── product.controller.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── ProductCard.jsx
        ├── pages/
        │   └── CreatePage.jsx
        ├── store/
        │   └── product.js
        └── App.jsx (or similar)
```

---

## Backend

### 1. `backend/server.js`

- **Purpose:** Entry point for the backend server.
- **Key Points:**
  - Loads environment variables with `dotenv`.
  - Connects to MongoDB using a function from `config/db.js`.
  - Sets up Express, JSON parsing, and product routes.
  - Starts the server on the specified port.

**Example:**

```js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
```

---

### 2. `backend/config/db.js`

- **Purpose:** Handles MongoDB connection using Mongoose.
- **Key Points:** Exports a function to connect to the database using a URI from `.env`.

---

### 3. `backend/models/product.model.js`

- **Purpose:** Defines the Product schema for MongoDB.
- **Key Points:** Specifies fields like `name`, `price`, and `image`.

---

### 4. `backend/routes/product.route.js`

- **Purpose:** Defines API endpoints for product CRUD operations.
- **Key Points:** Maps HTTP methods and paths to controller functions.

---

### 5. `backend/controllers/product.controller.js`

- **Purpose:** Contains logic for handling product CRUD operations.
- **Key Points:** Each function interacts with the database and sends JSON responses.

---

## Frontend

### 1. `frontend/src/store/product.js`

- **Purpose:** Global state management for products using Zustand.
- **Key Points:**
  - `products`: Array of product objects.
  - `setProducts`: Replace the products array.
  - `createProduct`: POSTs a new product to the backend and updates state.
  - `fetchProducts`: GETs all products from the backend and updates state.
  - `deleteProduct`: DELETEs a product and updates state.
  - `updateProduct`: PUTs updated product data and updates state.

**Example:**

```js
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    /* ... */
  },
  fetchProducts: async () => {
    /* ... */
  },
  deleteProduct: async (pid) => {
    /* ... */
  },
  updateProduct: async (pid, updatedProduct) => {
    /* ... */
  },
}));
```

---

### 2. `frontend/src/components/Navbar.jsx`

- **Purpose:** Top navigation bar.
- **Key Points:**
  - Uses Chakra UI for layout and styling.
  - Contains links to home and create product pages.
  - Includes a color mode toggle (light/dark).

---

### 3. `frontend/src/components/ProductCard.jsx`

- **Purpose:** Displays a single product with options to edit or delete.
- **Key Points:**
  - Shows product image, name, and price.
  - Edit button opens a modal to update product details.
  - Delete button removes the product.
  - Uses Chakra UI’s `useToast` for notifications.

**Example:**

```jsx
const handleUpdateProduct = async (pid, updatedProduct) => {
  const result = await updateProduct(pid, updatedProduct);
  if (result && result.success) {
    toast({
      title: "Updated",
      description: result.message || "Product updated successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  } else {
    toast({
      title: "Error",
      description: result?.message || "Update failed.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};
```

---

### 4. `frontend/src/pages/CreatePage.jsx`

- **Purpose:** Page for adding a new product.
- **Key Points:**
  - Form with inputs for name, price, and image URL.
  - On submit, calls `createProduct` from the store.
  - Shows toast notifications for success or error.

---

## How Everything Connects

- **Backend** exposes REST API endpoints for products.
- **Frontend** uses these endpoints to fetch, create, update, and delete products.
- **Zustand** manages product state globally in the frontend.
- **Chakra UI** provides a consistent, responsive UI and feedback (toasts, modals, etc.).

---

## Learning Notes

- **Zustand** is a simple alternative to Redux for state management. You use hooks to read and update global state.
- **Chakra UI** makes it easy to build accessible, responsive UIs with ready-made components.
- **React** components can use hooks (`useState`, `useEffect`, custom hooks like `useProductStore`) to manage local and global state.
- **API Calls** are made using `fetch` in the store, keeping components clean and focused on UI.
- **Toasts** provide user feedback for actions (success/error).
- **Modals** are used for editing products in place, improving UX.
- **Backend** is modular: routes, controllers, and models are separated for clarity and maintainability.

---

## Example Flow: Adding a Product

1. User fills out the form on `CreatePage.jsx` and clicks "Add Product".
2. `createProduct` in the Zustand store sends a POST request to `/api/products`.
3. Backend creates the product in MongoDB and returns the new product.
4. Zustand updates the `products` array, and the UI re-renders to show the new product.
5. A toast notification confirms success.

---

## Tips for Further Learning

- Explore Zustand’s [docs](https://docs.pmnd.rs/zustand/getting-started/introduction) for advanced patterns (middleware, persistence).
- Read Chakra UI’s [docs](https://chakra-ui.com/docs/getting-started) for more components and theming.
- Learn about React Router for navigation.
- Practice debugging by checking browser console and network tab for errors.
- Try adding authentication or more product fields as an exercise.

---
