import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import Validator from "@/lib/backEnd/inputValidation";

/**
 * @swagger
 * /api/privet/reservations:
 *   get:
 *     tags:
 *       - reservations (privet)
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
 *         description: Limit of reservations in the page
 *
 *       - name: reservation_number
 *         in: query
 *         required: false
 *         type: string
 *         description: Reservation number
 *     summary: Get Reservations
 *     description: Returns all reservations or one reservations
 *     responses:
 *       200:
 *         description: Returns all reservations or one reservations
 *       400:
 *         description: invalid input
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
 *                         car_id:
 *                             type: string
 *                             description: the car model id
 *                         customer_id:
 *                             type: string
 *                             description: the customer model id
 *                         amount:
 *                             type: number
 *                             description: the total rent price
 *                         start_date:
 *                             type: datetime
 *                             description: the date of the start renting ==> 2024-03-12T10:51:55.532Z
 *                         end_date:
 *                             type: datetime
 *                             description: the date of the end renting ==> 2024-03-15T10:51:55.532Z
 *                     required :
 *                         - car_id
 *                         - customer_id
 *                         - amount
 *                         - start_date
 *                         - end_date
 *     tags:
 *       - reservations (privet)
 *     description: Add new reservation
 *     summary: Add Reservations
 *     responses:
 *       200:
 *         description: The reservation was added
 *       400:
 *         description: invalid input
 *       404:
 *         description: The customer or the car not found
 *       500:
 *         description: Internal server error
 */

export async function GET(request) {
  let search = {};
  try {
    const searchParams = await request.nextUrl.searchParams;
    const page = await searchParams.get("page");
    const limit = await searchParams.get("limit");
    const reservation_number = await searchParams.get("reservation_number");
    const validation = Validator.GetReservations({
      page,
      limit,
      reservation_number,
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
        include: { Date_range: true },
      };
    } else if (reservation_number) {
      search = { where: { reservation_number: Number(reservation_number) } };
    } else {
      return NextResponse.json(
        {
          error: true,
          message: "no param was passed",
        },
        { status: 400 }
      );
    }
    const allReservation = await prisma.reservation.findMany({
      ...search,
      include: {
        Date_range: {
          select: {
            id: true,
            car_id: true,
            status: true,
            start_date: true,
            end_date: true,
          },
        },
      },
    });
    const totalReservations = await prisma.reservation.count({});
    return NextResponse.json(
      { totalReservations, allReservation },
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

export async function POST(request) {
  try {
    let { car_id, customer_id, amount, start_date, end_date } =
      await request.json();
    const validation = Validator.postReservation({
      car_id,
      customer_id,
      amount,
      start_date,
      end_date,
    });

    if (validation.error) {
      return NextResponse.json(
        { message: validation.message },
        { status: 400 }
      );
    }

    const car = await prisma.car.findUnique({
      where: { id: car_id },
    });
    if (!car || car.status === "RENTED") {
      return NextResponse.json(
        { message: "No car found, or the car is Rented" },
        { status: 404 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { id: customer_id },
    });
    if (!customer || customer.balcklist) {
      return NextResponse.json(
        { message: "No customer found, or in blacklist" },
        { status: 404 }
      );
    }

    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let revenue = await prisma.revenue.findFirst({
      where: { month: month, year: year },
    });
    if (!revenue) {
      revenue = await prisma.revenue.create({
        data: {
          month: month,
          year: year,
        },
      });
    }

    let reservation_number = await prisma.reservationNumber.findFirst({});
    if (!reservation_number) {
      reservation_number = await prisma.reservationNumber.create({
        data: { number: 100000000 },
      });
    }
    const Date_Range = await prisma.date_Range.create({
      data: {
        car_id: car_id,
        start_date: start_date,
        end_date: end_date,
      },
    });

    const Reservation = await prisma.reservation.create({
      data: {
        car_id: car_id,
        reservation_number: reservation_number.number,
        customer_id: customer_id,
        Revenue_id: revenue.id,
        date_range_id: Date_Range.id,
        amount: Number(amount),
      },
    });
    // update the customer/car/revenue information

    // car
    await prisma.car.update({
      where: { id: car_id },
      data: { status: "RENTED", num_of_res: car.num_of_res + 1 },
    });

    // customer
    await prisma.customer.update({
      where: { id: customer_id },
      data: {
        num_of_res: customer.num_of_res + 1,
        spending: customer.spending + Number(amount),
      },
    });

    //  revenue
    await prisma.revenue.update({
      where: { id: revenue.id },
      data: {
        total_amount: revenue.total_amount + Number(amount),
        total_rented_cars: revenue.total_rented_cars + 1,
      },
    });

    // reservations number
    await prisma.reservationNumber.update({
      where: { id: reservation_number.id },
      data: { number: reservation_number.number + 1 },
    });
    return NextResponse.json(
      { Reservation, message: "Reservation successfully added" },
      { status: 200 }
    );
  } catch (error) {
    // console.log(error);
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
