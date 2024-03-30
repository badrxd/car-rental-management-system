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
        status: z.enum(["CONFIRMED", "CANCELLED"]),
      });
      reservation.parse(data);
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
          status: z.enum(["RENTED", "AVAILABLE", "UNAVAILABLE"]).optional(),
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
            .regex(/^[a-z\s]+$/i, "Invalid color name, or onr lowercase")
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
  static getCustomers(data) {
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
        driver_id: z
          .string()
          .min(6)
          .max(30)
          .nullable()
          .refine((value) => value === null || /^[a-zA-Z0-9/-]+$/.test(value), {
            message: "Invalid license driver",
          }),
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
  static postCustomers(data) {
    try {
      const customer = z
        .object({
          full_name: z.string().min(6).max(20),
          phone: z
            .string()
            .min(10)
            .max(14)
            .regex(/^\d+$/, "Invalid phone number"),
          driver_id: z
            .string()
            .min(6)
            .max(30)
            .regex(/^[a-zA-Z0-9/-]+$/, "Invalid license driver"),
        })
        .strict();
      customer.parse(data);
      return { error: false };
    } catch (error) {
      return {
        error: true,
        message: `ERROR in ${error?.errors[0].path[0]} variable: ${error?.errors[0].message}`,
      };
    }
  }
  static patchCustomers(data) {
    try {
      const customer = z
        .object({
          id: z.string().regex(/^[0-9a-f]{24}$/, "Invalid id"),
          full_name: z.string().min(6).max(20).optional(),
          phone: z
            .string()
            .min(10)
            .max(14)
            .regex(/^\d+$/, "Invalid phone number")
            .optional(),
          driver_id: z
            .string()
            .min(6)
            .max(30)
            .regex(/^[a-zA-Z0-9/-]+$/, "Invalid license driver")
            .optional(),
          blacklist: z.boolean().optional(),
          note: z.string().min(6).max(200).optional(),
        })
        .strict();
      customer.parse(data);
      return { error: false };
    } catch (error) {
      return {
        error: true,
        message: `ERROR in ${error?.errors[0].path[0]} variable: ${error?.errors[0].message}`,
      };
    }
  }
  static GetReservations(data) {
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

        reservation_number: z
          .string()
          .nullable()
          .refine((value) => value === null || /^\d{9}$/.test(value), {
            message: "Reservation number must have 9 digits",
          })
          .refine(
            (val) => {
              const num = Number(val);
              return val === null || (num >= 100000000 && num <= 999999999);
            },
            {
              message:
                "Reservation number must be between 100000000 and 999999999",
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
}
export default Validator;
