import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/privet/users:
 *   get:
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: Hello World!
 */
export async function GET(request) {
    // Do whatever you want
    return NextResponse.json({ message: 'Hello World!' })
    // return new Response('Hello World!', {
    //     status: 200,
    // });
}