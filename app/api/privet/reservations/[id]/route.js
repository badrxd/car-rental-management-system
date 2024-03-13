import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import Validator from "@/lib/backEnd/inputValidation";

/**
 * @swagger
 * /api/privet/reservations:
 *   get:
 */

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          message: "Reservation id is required",
        },
        { status: 400 }
      );
    }
    const reservation = await prisma.reservation.findUnique({
      where: { id: id },
      include: {
        Customer: {
          select: {
            num_of_res: true,
            spending: true,
          },
        },
        Revenue: { select: { total_amount: true } },
      },
    });

    const { status } = await request.json();

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
        { status: 200 }
      );
    }

    // car
    await prisma.car.update({
      where: { id: reservation.car_id },
      data: { status: "AVAILABLE" },
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
