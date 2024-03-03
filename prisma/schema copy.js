// // This is your Prisma schema file,
// // learn more about it in the docs: https://pris.ly/d/prisma-schema

// // Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// // Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "mongodb"
//   url      = env("DATABASE_URL")
// }

// model Accounts {
//   id         String   @id @default(auto()) @map("_id") @db.ObjectId
//   full_name  String   @unique
//   email      String   @unique
//   phone      String   @unique
//   secret_key Int?
//   is_blocked Boolean  @default(false)
//   role       Role     @default(STAFF)
//   createdAt  DateTime @default(now())
//   updatedAt  DateTime @updatedAt
//   v          Int      @default(0) @map("__v")
// }

// model Customer {
//   id          String        @id @default(auto()) @map("_id") @db.ObjectId
//   full_name   String
//   phone       String
//   card_id     String        @unique
//   driver_id   String        @unique
//   balcklist   Boolean       @default(false)
//   note        String        @default("...")
//   reservation Reservation[]
//   createdAt   DateTime      @default(now())
//   updatedAt   DateTime      @updatedAt
//   v           Int           @default(0) @map("__v")
// }

// model Car {
//   id                 String        @id @default(auto()) @map("_id") @db.ObjectId
//   brand              String
//   model              String
//   image              String
//   color              String
//   fuel               String
//   matricule          String        @unique
//   transmission       String
//   mileage            Int
//   passenger_capacity Int
//   vedange            Json?
//   rent_price         Float
//   Reservation        Reservation[]
//   availability       Boolean       @default(true)
//   createdAt          DateTime      @default(now())
//   updatedAt          DateTime      @updatedAt
//   v                  Int           @default(0) @map("__v")
// }

// model Reservation {
//   id          String       @id @default(auto()) @map("_id") @db.ObjectId
//   Car         Car          @relation(fields: [car_id], references: [id])
//   car_id      String       @db.ObjectId
//   Customer    Customer     @relation(fields: [customer_id], references: [id])
//   customer_id String       @db.ObjectId
//   date_range  Date_Range[]
//   status      Boolean      @default(true)
//   createdAt   DateTime     @default(now())
//   updatedAt   DateTime     @updatedAt
//   v           Int          @default(0) @map("__v")
// }

// model Date_Range {
//   id             String       @id @default(auto()) @map("_id") @db.ObjectId
//   car_id         String       @db.ObjectId
//   reservation_id String       @db.ObjectId
//   Reservation    Reservation? @relation(fields: [reservation_id], references: [id])
//   status         Boolean      @default(true)
//   start_date     DateTime
//   end_date       DateTime
//   createdAt      DateTime     @default(now())
//   updatedAt      DateTime     @updatedAt
//   v              Int          @default(0) @map("__v")
// }

// model Month_Revenue {
//   id           String   @id @default(auto()) @map("_id") @db.ObjectId
//   total_amount Float
//   createdAt    DateTime @default(now())
//   updatedAt    DateTime @updatedAt
//   v            Int      @default(0) @map("__v")
// }

// enum Role {
//   STAFF
//   ADMIN
//   DEV
// }
