# Prisma Schema Documentation 🌟

## Overview 📘
This Prisma schema defines three models: `Product`, `Category`, and `Testimonial`. These models are structured to represent a basic e-commerce application where products are categorized, and testimonials are provided for the platform or products.

---

## Models 🛠️

### 1. **Product** 🛒
Represents individual products in the system.

- **Fields:**
  - `id` (Int, Primary Key): Auto-incrementing unique identifier for each product.
  - `name` (String): Name of the product.
  - `description` (String): Description of the product.
  - `price` (Float): Price of the product.
  - `categoryId` (Int): Foreign key linking the product to its category.
  - `category` (Category): Relational field representing the association with the `Category` model.
  - `createdAt` (DateTime): Timestamp of when the product was created. Defaults to the current time.
  - `updatedAt` (DateTime): Timestamp of the last update to the product. Automatically updates on change.

- **Relations:**
  - Each product belongs to one `Category`.

---

### 2. **Category** 📂
Represents product categories.

- **Fields:**
  - `id` (Int, Primary Key): Auto-incrementing unique identifier for each category.
  - `name` (String): Name of the category.
  - `products` (Product[]): Relational field representing all products within this category.

- **Relations:**
  - Each category can have multiple `Product` entries.

---

### 3. **Testimonial** 💬
Represents testimonials provided by users.

- **Fields:**
  - `id` (Int, Primary Key): Auto-incrementing unique identifier for each testimonial.
  - `photo` (String): URL or file path to the testimonial photo.
  - `createdAt` (DateTime): Timestamp of when the testimonial was created. Defaults to the current time.

- **Relations:**
  - No explicit relations defined for `Testimonial` in this schema.

---

## Features ✨
- **Relational Integrity:**
  - `Product` has a foreign key (`categoryId`) linking it to `Category`, enforcing that every product must belong to a category.
  - Cascading updates for relational fields.

- **Auto-timestamps:**
  - `createdAt` and `updatedAt` ensure that record creation and modification times are tracked.

---
