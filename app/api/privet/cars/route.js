import { NextResponse } from "next/server";
import prisma, { Prisma } from "@/prisma/prisma";
import { formDataToObject } from "@/lib/backEnd/formDataToObject";
import { uploadPhoto, deletePhoto } from "@/lib/backEnd/handelPhoto";
import Validator from "@/lib/backEnd/inputValidation";

/**
 * @swagger
 * /api/privet/cars:
 *   get:
 *     tags:
 *       - cars (privet)
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
 *       - name: matricule
 *         in: query
 *         required: false
 *         type: string
 *         description: Car matricule
 *     summary: Get cars
 *     description: Returns cars based on page size and limit or car matricule
 *     responses:
 *       200:
 *         description: Returns cars
 *       500:
 *         description: Internal server error
 *
 *
 *   post:
 *     requestBody:
 *         required: true
 *         content:
 *             multipart/form-data:
 *                 schema:
 *                     type: object
 *                     properties:
 *                         brand:
 *                             type: string
 *                             description: The brand of the car
 *                         model:
 *                             type: string
 *                             description: The model of the car
 *                         color:
 *                             type: string
 *                             description: The color of the car
 *                         fuels:
 *                             type: string
 *                             description: The type of fuel, must contains 'DIESEL' or 'GASOLINE'
 *                         gear_box:
 *                             type: string
 *                             description: The type of gear_box, must contains 'MANUAL' or 'AUTOMATIC'
 *                         passenger_capacity:
 *                             type: string
 *                             description: The passenger capacity of the car
 *                         rent_price:
 *                             type: number
 *                             description: The rent price per day
 *                         matricule:
 *                             type: string
 *                             description: The registration plates of the car => ([number]-[string]-[number])
 *                         image:
 *                             type: byte
 *                             description: The image of the car
 *                     required :
 *                         - brand
 *                         - model
 *                         - color
 *                         - fuels
 *                         - gear_box
 *                         - passenger_capacity
 *                         - rent_price
 *                         - matricule
 *                         - image
 *     tags:
 *       - cars (privet)
 *     summary: Add a new car
 *     description: Add new car
 *     responses:
 *       200:
 *         description: Car is successfully added
 *       409:
 *         description: The car already exists
 *       500:
 *         description: Internal server error
 *
 *
 */

export async function GET(request) {
  let search = {};
  try {
    const searchParams = await request.nextUrl.searchParams;
    const page = await searchParams.get("page");
    const limit = await searchParams.get("limit");
    const matricule = await searchParams.get("matricule");
    const validation = Validator.getCars({ page, limit, matricule });
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
    } else if (matricule) {
      search = { where: { matricule: matricule.toLowerCase() } };
    } else {
      return NextResponse.json(
        {
          error: true,
          message: "no param was passed",
        },
        { status: 400 }
      );
    }
    const allCars = await prisma.car.findMany(search);
    const total_cars = await prisma.car.count({
      where: {
        status: {
          not: "UNAVAILABLE",
        },
      },
    });
    // if (!allCars) {
    //   return NextResponse.json(
    //     {
    //       message: "No Car Found",
    //     },
    //     { status: 404 }
    //   );
    // }
    return NextResponse.json({ total_cars, allCars }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: true, message: "Internal Server Erorr" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const car = {};
  let uploded_image = null;
  try {
    const data = await request.formData();
    /*
        change data srtuctur from formData to  object
        */
    await formDataToObject(car, data);
    const {
      brand,
      model,
      image,
      color,
      fuels,
      gear_box,
      matricule,
      passenger_capacity,
      rent_price,
    } = car;
    const validation = Validator.postCars(car);
    if (validation?.error) {
      return NextResponse.json(
        { message: validation.message },
        { status: 400 }
      );
    }
    const cheak = await prisma.car.findUnique({
      where: {
        matricule: matricule,
      },
    });

    if (cheak) {
      return NextResponse.json(
        { message: "Car already exists" },
        { status: 409 }
      );
    }

    /*
    save image locally
    */
    uploded_image = await uploadPhoto(image);

    if (!uploded_image) {
      return NextResponse.json(
        { message: "No image was uploaded" },
        { status: 500 }
      );
    }

    const newCar = await prisma.car.create({
      data: {
        brand: brand,
        model: model,
        color: color,
        fuels: fuels.toUpperCase(),
        gear_box: gear_box.toUpperCase(),
        passenger_capacity: passenger_capacity,
        rent_price: parseFloat(rent_price),
        matricule: matricule.toLowerCase(),
        image: uploded_image,
      },
    });
    return NextResponse.json(
      {
        message: "Car added successfully",
        newCar: newCar.id,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      if (uploded_image !== null) {
        await deletePhoto(uploded_image);
      }
      return NextResponse.json(
        {
          message: "The required attribute is missing or invalid.",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
