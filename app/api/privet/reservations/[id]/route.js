import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import Validator from "@/lib/backEnd/inputValidation";

/**
 * @swagger
 * /api/privet/reservations/{id}:
 *   get:
 *     tags:
 *       - reservations (privet)
 *     summary: Get a unique reservation
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Reservation id
 *
 *     description: Returns unique reservation
 *     responses:
 *       200:
 *         description: Returns reservation informations
 *       404:
 *         description: No reservation found
 *       500:
 *         description: Internal server error
 *
 *   patch:
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         status:
 *                             type: string
 *                             description: status of reservation ==> CANCELLED
 *     tags:
 *       - reservations (privet)
 *     description: Cancel reservation
 *     summary: Cancel Reservation
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Reservation id
 *     responses:
 *       200:
 *         description: The reservation was canceled
 *       404:
 *         description: No reservation found
 *       500:
 *         description: Internal server error
 */

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    // const validation = Validator.patchCustomers({ id });
    // if (validation.error) {
    //   return NextResponse.json(
    //     { error: true, message: validation.message },
    //     { status: 400 }
    //   );
    // }
    const getReservation = await prisma.reservation.findUnique({
      where: {
        id: id,
      },
      include: {
        Car: true,
        Customer: true,
        Date_range: true,
      },
    });

    if (!getReservation) {
      return NextResponse.json(
        {
          error: true,
          message: "No Reservation Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: false,
        reservation: getReservation,
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
    const { status } = await request.json();
    const validation = Validator.patchReservation({ id, status });
    if (validation.error) {
      return NextResponse.json(
        { message: validation.message },
        { status: 400 }
      );
    }

    const reservation = await prisma.reservation.findUnique({
      where: { id: id },
      include: {
        Car: {
          select: {
            num_of_res: true,
          },
        },
        Customer: {
          select: {
            num_of_res: true,
            spending: true,
          },
        },
        Revenue: { select: { total_amount: true, total_rented_cars: true } },
      },
    });

    if (!reservation) {
      return NextResponse.json(
        { message: "No reservation found" },
        { status: 404 }
      );
    }
    if (
      (reservation.status === "CONFIRMED" && status !== "CANCELLED") ||
      (reservation.status === "CANCELLED" && status !== "CONFIRMED")
    ) {
      return NextResponse.json({ message: "No changes" }, { status: 200 });
    }
    // incase they want to restore the reservation to the previous state.
    if (status === "CONFIRMED") {
      return NextResponse.json(
        {
          message:
            "the option restoring the canceled reservation not dispo yet",
        },
        { status: 400 }
      );
    }

    // car
    await prisma.car.update({
      where: { id: reservation.car_id },
      data: { status: "AVAILABLE", num_of_res: reservation.Car.num_of_res - 1 },
    });

    // customer
    await prisma.customer.update({
      where: { id: reservation.customer_id },
      data: {
        num_of_res: reservation.Customer.num_of_res - 1,
        spending: reservation.Customer.spending - reservation.amount,
      },
    });
    //  revenue
    await prisma.revenue.update({
      where: { id: reservation.Revenue_id },
      data: {
        total_amount: reservation.Revenue.total_amount - reservation.amount,
        total_rented_cars: reservation.Revenue.total_rented_cars - 1,
      },
    });

    // date range
    await prisma.date_Range.update({
      where: { id: reservation.date_range_id },
      data: {
        status: false,
      },
    });
    // reservations

    await prisma.reservation.update({
      where: { id: id },
      data: {
        status: "CANCELLED",
      },
    });

    return NextResponse.json(
      {
        reservation,
        error: false,
        message: "Reservation was canceled successfully",
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
