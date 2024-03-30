import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import Validator from "@/lib/backEnd/inputValidation";

/**
 * @swagger
 * /api/privet/customers:
 *   get:
 *     tags:
 *       - customers (privet)
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         type: string
 *         description: Page number
 *
 *       - name: limit
 *         in: query
 *         required: false
 *         type: string
 *         description: Limit of cars in the page
 *
 *       - name: driver_id
 *         in: query
 *         required: false
 *         type: string
 *         description: Customer licence driver
 *     summary: Get all customers or one customer
 *     description: Returns all customers or one customer
 *     responses:
 *       200:
 *         description: Returns all customers or one customer
 *       409:
 *         description: No customer found
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
 *     summary: Add customer
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
  let search = {};
  try {
    const searchParams = await request.nextUrl.searchParams;
    const page = await searchParams.get("page");
    const limit = await searchParams.get("limit");
    const driverId = await searchParams.get("driver_id");
    const validation = Validator.getCustomers({
      page,
      limit,
      driver_id: driverId,
    });
    if (validation.error) {
      return NextResponse.json(
        { error: true, message: validation.message },
        { status: 400 }
      );
    }
    if (parseInt(page) && parseInt(limit)) {
      search = {
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        orderBy: {
          createdAt: "desc",
        },
      };
    } else if (driverId) {
      search = { where: { driver_id: driverId.toLowerCase() } };
    } else {
      return NextResponse.json(
        {
          error: true,
          message: "no param was passed",
        },
        { status: 400 }
      );
    }
    const allCustomers = await prisma.customer.findMany({
      select: {
        id: true,
        full_name: true,
        phone: true,
        driver_id: true,
        blacklist: true,
        note: true,
        num_of_res: true,
        spending: true,
      },
      ...search,
    });
    const totalCustomers = await prisma.customer.count({});

    return NextResponse.json({ totalCustomers, allCustomers }, { status: 200 });
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
    const validation = Validator.postCustomers({
      full_name,
      phone,
      driver_id,
    });
    if (validation.error) {
      return NextResponse.json(
        { error: true, message: validation.message },
        { status: 400 }
      );
    }
    const find = await prisma.customer.findUnique({
      where: { driver_id: driver_id.toLowerCase() },
    });
    if (find) {
      return NextResponse.json(
        { error: true, message: "Customer already exist" },
        { status: 409 }
      );
    }

    const customer = await prisma.customer.create({
      data: {
        full_name: full_name,
        phone: phone,
        driver_id: driver_id.toLowerCase(),
      },
    });
    return NextResponse.json(
      {
        error: true,
        message: "Customer successfully added",
        customer: customer.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
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
