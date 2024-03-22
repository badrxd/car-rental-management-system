const { z } = require("zod");
const reservation = z
  .object({
    car_id: z.string().regex(/^[0-9a-f]{24}$/, "Invalid id"),
    customer_id: z.string().regex(/^[0-9a-f]{24}$/, "Invalid id"),
    amount: z.number().min(0),
    start_date: z.string().datetime(),
    end_date: z.string().datetime().optional(),
  })
  .strict();

class Validator {
  static getReservation(reservation_number) {
    try {
      const reservation = z.object({
        reservation_number: z
          .string()
          .refine((val) => /^\d{9}$/.test(val), {
            message: "Reservation number must have 9 digits",
          })
          .refine(
            (val) => {
              const num = Number(val);
              return num >= 100000000 && num <= 999999999;
            },
            {
              message:
                "Reservation number must be between 100000000 and 999999999",
            }
          ),
      });
      reservation.parse({ reservation_number });
      return { error: false };
    } catch (error) {
      return {
        error: true,
        message: `ERROR in ${error?.errors[0].path[0]} variable: ${error?.errors[0].message}`,
      };
    }
  }
  static postReservation(data) {
    try {
      reservation.parse(data);
      return { error: false };
    } catch (error) {
      return {
        error: true,
        message: `ERROR in ${error?.errors[0].path[0]} variable: ${error?.errors[0].message}`,
      };
    }
  }
  static patchReservation(data) {
    try {
      const reservation = z.object({
        id: z.string().regex(/^[0-9a-f]{24}$/, "Invalid id"),
        status: z.string(),
      });
      return { error: false };
    } catch (error) {
      return {
        error: true,
        message: `ERROR in ${error?.errors[0].path[0]} variable: ${error?.errors[0].message}`,
      };
    }
  }
  static getCars(data) {
    try {
      const cars = z.object({
        page: z
          .string()
          .nullable()
          .refine((value) => value === null || /^\d+$/.test(value), {
            message: "Page must be a digit",
          }),
        limit: z
          .string()
          .nullable()
          .refine((value) => value === null || /^\d+$/.test(value), {
            message: "Limit must be a digit",
          }),
        matricule: z
          .string()
          .nullable()
          .refine(
            (value) => value === null || /^\d+-[A-Za-z]-\d+$/.test(value),
            {
              message: "Invalid matricule format",
            }
          ),
      });
      cars.parse(data);
      return { error: false };
    } catch (error) {
      return {
        error: true,
        message: `ERROR in ${error?.errors[0].path[0]} variable: ${error?.errors[0].message}`,
      };
    }
  }
  static patchCars(data) {
    try {
      const isImageMimeType = (mimeType) => {
        return mimeType.startsWith("image/");
      };

      const isImageFile = (file) => {
        return isImageMimeType(file.type);
      };
      const cars = z
        .object({
          brand: z.string().min(2).max(20).optional(),
          model: z.string().min(2).max(20).optional(),
          image: z
            .object({
              size: z.number(),
              type: z.string(),
              name: z.string(),
              lastModified: z.number(),
            })
            .refine(isImageFile, {
              message: "Invalid image format",
            })
            .optional(),
          color: z.string().min(2).max(20).optional(),
          fuels: z.enum(["DIESEL", "GASOLINE"]).optional(),
          gear_box: z.enum(["MANUAL", "AUTOMATIC"]).optional(),
          matricule: z
            .string()
            .regex(/^\d+-[A-Za-z]-\d+$/, "Invalid matricule format")
            .optional(),
          passenger_capacity: z
            .string()
            .regex(/^\d+$/, "Invalid passenger capacity ")
            .optional(),
          rent_price: z
            .string()
            .regex(/^\d+$/, "Invalid rental price")
            .optional(),
        })
        .strict();
      cars.parse(data);
      return { error: false };
    } catch (error) {
      return {
        error: true,
        message: `ERROR in ${error?.errors[0].path[0]} variable: ${error?.errors[0].message}`,
      };
    }
  }
  static postCars(data) {
    try {
      const isImageMimeType = (mimeType) => {
        return mimeType.startsWith("image/");
      };

      const isImageFile = (file) => {
        return isImageMimeType(file.type);
      };
      const cars = z
        .object({
          brand: z.string().min(2).max(20),
          model: z.string().min(2).max(20),
          image: z
            .object({
              size: z.number(),
              type: z.string(),
              name: z.string(),
              lastModified: z.number(),
            })
            .refine(isImageFile, {
              message: "Invalid image format",
            }),
          color: z
            .string()
            .regex(/^\w+$/, "Invalid color name, just letters and in lowercase")
            .min(2)
            .max(20),
          fuels: z.enum(["DIESEL", "GASOLINE"]),
          gear_box: z.enum(["MANUAL", "AUTOMATIC"]),
          matricule: z
            .string()
            .regex(
              /^\d+-[a-z]-\d+$/,
              "Invalid matricule format or the text not lowercase"
            ),
          passenger_capacity: z
            .string()
            .regex(/^\d+$/, "Invalid passenger capacity "),
          rent_price: z.string().regex(/^\d+$/, "Invalid rental price"),
        })
        .strict();
      cars.parse(data);
      return { error: false };
    } catch (error) {
      return {
        error: true,
        message: `ERROR in ${error?.errors[0].path[0]} variable: ${error?.errors[0].message}`,
      };
    }
  }
}
export default Validator;
