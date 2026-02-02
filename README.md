# React + FastAPI Items - Frontend

Small React application built with Vite that consumes a FastAPI backend.
Allows listing and creating items with basic UI state handling.

## Tech Stack
- React
- Vite
- JavaScript
- Fetch API

## Features
- List items from backend (GET /items)
- Create new items (POST /items)
- Basic UI states:
    - loading
    - error (network & backend)
    - validation (required fields)
- Controlled form inputs
- Simple and clean structure

## Requirements
- Node.js 18+ recommended
- npm

## Setup
Install Dependecies:

```bash
npm install

Run
Start the development server:
npm run dev

The app will be available at:
http://localhost:5173

Backend
The frontend expects the FastAPI backend to be running at:
http://127.0.0.1:8000

The API base url is configured in:
src/api/itemsApi.js

Project Structure
src/
 ├─ api/
 │   └─ itemsApi.js
 ├─ components/
 │   └─ ItemsList.jsx
 ├─ App.jsx
 └─ main.jsx


Notes
* All inputs are controlled via React state
* UI actions are disabled during async operations to avoid race conditions
* Errors are handled separately for list and create actions