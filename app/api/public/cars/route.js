import { NextResponse } from "next/server";
import prisma, { Prisma } from "@/prisma/prisma";
import { revalidateTag } from "next/cache";

/**
 * @swagger
 * /api/public/cars:
 *   get:
 *     tags:
 *       - cars (public)
 *     description: Returns all cars and top cars
 *     responses:
 *       200:
 *         description: Returns all cars and top cars
 *       500:
 *         description: Internal server error
 */

export async function GET(request) {
  try {
    const top_cars = await prisma.car.findMany({
      where: {
        status: "AVAILABLE",
      },
      orderBy: [{ num_of_res: "desc" }],
      take: 3,
    });
    // const allCars = await prisma.car.findMany(search);
    const allCars = await prisma.car.findMany({
      where: {
        status: "AVAILABLE",
      },
    });
    revalidateTag("home");
    return NextResponse.json(
      { revalidated: true, now: Date.now(), top_cars, allCars },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: true, message: "Internal Server Erorr" },
      { status: 500 }
    );
  }
}
