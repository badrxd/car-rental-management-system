# Overview

This repository contains the code for a car rental management system, which provides functionality for managing cars, customers, reservations, and more. The system is built using Next.js for the frontend and api router, Prisma for database interactions, and MongoDB as the database. and Zod for input validation and nextAuth for authentication,third party service cloudinary to save images on It also utilizes environment variables for configuration.

## Screenshots

![Home Page](https://raw.githubusercontent.com/badrxd/car-rental-management-system/main/public/images/Home%20Page.png)

![Cars](https://raw.githubusercontent.com/badrxd/car-rental-management-system/main/public/images/Cars.png)

![Swagger](https://raw.githubusercontent.com/badrxd/car-rental-management-system/main/public/images/Swagger.png)

![Dashboard](https://raw.githubusercontent.com/badrxd/car-rental-management-system/main/public/images/Dashboard.png)

## Requirements

- Node.js (v18 or higher)
- MongoDB
- Environment variables (in a .env file)
- cloudinary

## Installation

- Clone this repository to your local machine.
- Install dependencies by running npm install.
- Create a .env file in the root directory of the project.
- Define the following environment variables in the .env file:

## Environment Variables

```
############## DataBase ##################

DATABASE_URL="mongo db url"

NEXTAUTH_URL="http://localhost:3000/"
NEXT_PUBLIC_URL="http://localhost:3000/"

############## JWT ##################
NEXTAUTH_SECRET=""

############## Google ##################

GOOGLE_ID=""
GOOGLE_SECRET=""

############## Cloudnary ##################
CLOUD_NAME= ""
API_KEY=""
API_SECRET=""
NEXT_PUBLIC_IMAGE_URL="https://res.cloudinary.com/dcsk9sza4/image/upload/v1711035184"
NEXT_IMAGE_URL="https://res.cloudinary.com/dcsk9sza4/image/upload/v1711035184"

```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

You can accses to the Swagger page in `http://localhost:3000/api-doc`.

## Credits
Developed by:
- Badr Eddine Ouydir (Back-End)
- Assoul Jaouad (Front-End)
- Soukaina Elkhaloufi (Front-End)
