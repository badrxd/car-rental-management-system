import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/public/cars:
 *   post:
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         name:
 *                             type: string
 *                             description: The name of the car
 *                         price:
 *                             type: number
 *                             description: The price of the car
 *                         year:
 *                             type: number
 *                             description: The year of the car
 *                         color:
 *                             type: string
 *                             description: The color of the car
 *                         description:
 *                             type: string
 *                             description: The description of the car
 *                         image:
 *                             type: string
 *                             description: The image of the car
 *                     required :
 *                         - name
 *                         - price
 *     tags:
 *       - cars
 *     summary: Create a new car
 *     description: Create a new car
 *     responses:
 *       200:
 *         description: Hello World(cars)!
 * 
 * 
 *   get:
 *     tags:
 *       - cars
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: Hello World!
 */

export async function POST(request) {
    // Do whatever you want
    return NextResponse.json({ message: 'Hello World!' })
    // return new Response('Hello World!', {
    //     status: 200,
    // });
}

export async function GET(request) {
    // Do whatever you want
    return NextResponse.json({ message: 'Hello World!' })
    // return new Response('Hello World!', {
    //     status: 200,
    // });
}