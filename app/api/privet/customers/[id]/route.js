import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

/**
 * @swagger
 * /api/privet/customers/{id}:
 *   get:
 *     tags:
 *       - customers (privet)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Echo this name
 *
 *     description: Returns unique customer
 *     responses:
 *       200:
 *         description: Returns customer informations
 *       404:
 *         description: No customer found
 *       500:
 *         description: Internal server error
 *
 *
 *   patch:
 *     requestBody:
 *         required: true
 *         content:
 *             multipart/form-data:
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
 *     tags:
 *       - customers (privet)
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Echo this name
 *
 *     description: Update unique customer information
 *     responses:
 *       200:
 *         description: Customer Info was Updated successfully
 *       404:
 *         description: No customer found
 *       500:
 *         description: Internal server error
 */

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          message: "Car id is required",
        },
        { status: 400 }
      );
    }
    const getCustomer = await prisma.customer.findUnique({
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
      where: {
        id: id,
      },
    });

    if (!getCustomer) {
      return NextResponse.json(
        {
          message: "No Customer Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        customer: getCustomer,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Internal Server Erorr" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const update_info = await request.json();
    if (!id) {
      return NextResponse.json(
        {
          message: "Customer id is required",
        },
        { status: 400 }
      );
    }

    if (Object.keys(update_info).length === 0) {
      return NextResponse.json({}, { status: 200 });
    }
    const getCustomer = await prisma.customer.findUnique({
      where: {
        id: id,
      },
    });

    if (!getCustomer) {
      return NextResponse.json(
        {
          message: "No customer Found",
        },
        { status: 404 }
      );
    }

    await prisma.customer.update({
      where: { id: id },
      data: update_info,
    });

    return NextResponse.json(
      {
        error: false,
        message: "Customer Info was Updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    error.message = "Internal Server Erorr";

    if (error?.code === "P2002")
      error.message = "Driver id belong to another customer";

    if (error?.name === "PrismaClientValidationError") {
      error.message = "The attribute are invalid.";
    }
    return NextResponse.json(
      { error: true, message: error.message },
      { status: 500 }
    );
  }
}
