import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

/**
 * @swagger
 * /api/privet/customers:
 *   get:
 *     tags:
 *       - customers (privet)
 *     parameters:
 *       - name: driver_id
 *         in: query
 *         required: false
 *         type: string
 *         description: driver id of the customer
 *     description: Returns all customers or one customer
 *     responses:
 *       200:
 *         description: Returns all customers or one customer
 *       500:
 *         description: Internal server error
 *
 *
 *   post:
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         full_name:
 *                             type: string
 *                             description: The full name of the customer
 *                         phone:
 *                             type: string
 *                             description: The phone number of the customer
 *                         driver_id:
 *                             type: string
 *                             description: The driver id of the customer
 *                     required :
 *                         - full_name
 *                         - phone
 *                         - driver_id
 *     tags:
 *       - customers (privet)
 *     description: Add new customer
 *     responses:
 *       200:
 *         description: The new customer was added
 *       409:
 *         description: The customer already exists
 *       500:
 *         description: Internal server error
 */

export async function GET(request) {
  const search = {};
  try {
    const searchParams = await request.nextUrl.searchParams;
    const driverId = await searchParams.get("driver_id");
    if (driverId !== null) {
      search.driver_id = driverId;
    }
    const allCustomers = await prisma.customer.findMany({
      select: {
        id: true,
        full_name: true,
        phone: true,
        driver_id: true,
        balcklist: true,
        note: true,
        num_of_res: true,
        spending: true,
      },
      where: search,
    });
    if (!allCustomers) {
      return NextResponse.json(
        {
          message: "No Customer Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(allCustomers, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: true, message: "Internal Server Erorr" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    let { full_name, phone, driver_id } = await request.json();
    const find = await prisma.customer.findUnique({
      where: { driver_id: driver_id },
    });
    if (find) {
      return NextResponse.json(
        { message: "Customer already exist" },
        { status: 409 }
      );
    }

    const customer = await prisma.customer.create({
      data: {
        full_name: full_name,
        phone: phone,
        driver_id: driver_id,
      },
    });
    return NextResponse.json(
      {
        message: "Customer successfully added",
        customer: customer.id,
      },
      { status: 200 }
    );
  } catch (error) {
    error.message = "Internal Server Erorr";

    if (error?.name === "PrismaClientValidationError") {
      error.message = "The attribute are invalid.";
    }
    return NextResponse.json(
      { error: true, message: error.message },
      { status: 500 }
    );
  }
}
