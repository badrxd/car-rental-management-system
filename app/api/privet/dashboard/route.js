import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import Validator from "@/lib/backEnd/inputValidation";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/privet/dashboard:
 *   get:
 *     tags:
 *       - dashboard (privet)
 *     summary: Get dashboard data
 *     description: Returns needed dashboard data
 *     responses:
 *       200:
 *         description: Returns needed dashboard data
 *       500:
 *         description: Internal server error
 */

export async function GET(request) {
  const dash = {
    month: {
      1: null,
      2: null,
      3: null,
      4: null,
      5: null,
      6: null,
      7: null,
      8: null,
      9: null,
      11: null,
      12: null,
    },
    year_earnings: 0,
    year_reservations: 0,
    total_cars: 0,
    total_customers: 0,
    top_customers: [],
    top_cars: [],
  };

  try {
    const result = await prisma.revenue.findMany({
      where: {
        year: 2024,
      },
    });
    result.forEach((e) => {
      const i = e.month;
      dash.month[i] = e;
      dash.year_earnings += e.total_amount;
      dash.year_reservations += e.total_rented_cars;
    });

    //car
    dash.total_cars = await prisma.car.count({
      where: {
        status: {
          not: "UNAVAILABLE",
        },
      },
    });

    dash.top_cars = await prisma.car.findMany({
      orderBy: [{ num_of_res: "desc" }],
      take: 6,
    });

    //customer
    dash.total_customers = await prisma.customer.count();

    dash.top_customers = await prisma.customer.findMany({
      orderBy: [{ num_of_res: "desc" }, { spending: "desc" }],
      take: 6,
    });

    return NextResponse.json({ error: false, ...dash }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: true, message: "Internal Server Erorr" },
      { status: 500 }
    );
  }
}
