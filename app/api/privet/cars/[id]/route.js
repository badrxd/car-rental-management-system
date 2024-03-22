import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { formDataToObject } from "@/lib/backEnd/formDataToObject";
import {
  uploadPhoto,
  deletePhoto,
  handeErrors,
} from "@/lib/backEnd/handelPhoto";
import Validator from "@/lib/backEnd/inputValidation";

/**
 * @swagger
 * /api/privet/cars/{id}:
 *   get:
 *     tags:
 *       - cars (privet)
 *     summary: Get a unique car
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Car id
 *
 *     description: Returns unique car
 *     responses:
 *       200:
 *         description: Returns car informations
 *       404:
 *         description: No car found
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
 *     tags:
 *       - cars (privet)
 *     summary: Udpate a unique car information
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: Car id
 *
 *     description: Udpate a unique car information
 *     responses:
 *       200:
 *         description: Car information updated
 *       409:
 *         description: The car already exists
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
    const getCar = await prisma.car.findUnique({
      where: {
        id: id,
      },
    });

    if (!getCar) {
      return NextResponse.json(
        {
          message: "No Car Found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        ...getCar,
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
  const update_info = {};
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        {
          message: "Car is is required",
        },
        { status: 404 }
      );
    }
    const changes = await request.formData();
    await formDataToObject(update_info, changes);
    const validation = Validator.patchCars(update_info);
    if (validation.error) {
      return NextResponse.json(
        { message: validation.message },
        { status: 400 }
      );
    }
    const getCar = await prisma.car.findUnique({
      where: {
        id: id,
      },
    });

    if (!getCar) {
      return NextResponse.json(
        {
          message: "No Car Found",
        },
        { status: 404 }
      );
    }

    if (update_info?.image) {
      const image = await uploadPhoto(update_info.image);
      if (image === false) {
        return NextResponse.json(
          { error: "No image was uploaded" },
          { status: 400 }
        );
      }
      update_info.image = image;
    }
    if (update_info?.rent_price) {
      update_info.rent_price = parseInt(update_info.rent_price);
    }

    if (update_info?.matricule) {
      update_info.matricule = update_info.matricule.toLowerCase();
    }
    const b = await prisma.car.update({
      where: { id: id },
      data: update_info,
    });

    await deletePhoto(getCar.image);
    return NextResponse.json(
      {
        error: false,
        b: b,
        message: "Car Info was Updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    error.message = "Internal Server Erorr";

    if (error?.code === "P2002")
      error.message = "Matricule belong to another car";

    if (error?.name === "PrismaClientValidationError") {
      error.message = "The attribute are invalid.";
    }
    if ("image" in update_info) {
      await deletePhoto(update_info.image);
    }
    return NextResponse.json(
      { error: true, message: `${error.message}` },
      { status: 500 }
    );
  }
}
