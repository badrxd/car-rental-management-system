import { z } from "zod";

class Validator {
  static cardatavalidation(data) {
    try {
      const isImageMimeType = (mimeType) => {
        return mimeType.startsWith("image/");
      };

      const isImageFile = (file) => {
        return isImageMimeType(file.type);
      };
      const cars = z
        .object({
          brand: z.string().min(2).max(20).nullable().optional(),
          model: z.string().min(2).max(20).nullable().optional(),
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
            .nullable()
            .optional(),
          color: z.string().min(2).max(20).nullable().optional(),
          fuels: z.enum(["DIESEL", "GASOLINE"]).nullable().optional(),
          gear_box: z.enum(["MANUAL", "AUTOMATIC"]).nullable().optional(),
          matricule: z
            .string()
            .regex(
              /^\d+-[a-z]-\d+$/,
              "Invalid matricule format or the text not lowercase"
            )
            .nullable()
            .optional(),
          passenger_capacity: z
            .string()
            .regex(/^\d+$/, "Invalid passenger capacity ")
            .nullable()
            .optional(),
          rent_price: z
            .string()
            .regex(/^\d+$/, "Invalid rental price")
            .nullable()
            .optional(),
        })
        .strict();
      cars.parse(data);
      return { error: false };
    } catch (error) {
      const err = {};
      error?.errors?.forEach((e) => {
        err[e.path[0]] = e.message;
      });
      return err;
    }
  }
  static profilevalidation(data) {
    try {
      const profileData = z
        .object({
          fullName: z.string().min(2, { message: "Full name cannot be empty" }),
          driverId: z
            .string()
            .min(6, { message: "Driver ID must be exactly 6 characters long" }),
          phoneNumber: z
            .string()
            .regex(/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, {
              message: "Invalid phone number format",
            }),
        })
        .strict();
      profileData.parse(data);
      return { error: false };
    } catch (error) {
      const err = {};
      error?.errors?.forEach((e) => {
        err[e.path[0]] = e.message;
      });
      return err;
    }
  }
  static addCarValidation(data) {
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
          color: z.string().min(2).max(20),
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
      const err = {};
      error?.errors?.forEach((e) => {
        err[e.path[0]] = e.message;
      });
      return err;
    }
  }
  static findCusByLicId(data) {
    try {
      const customer = z
        .object({
          driver_id: z
            .string()
            .min(6, "Input must contain at least 6 character(s)")
            .max(30)
            .regex(/^[a-zA-Z0-9/-]+$/, "Invalid license driver"),
        })
        .strict();
      customer.parse(data);
      return { error: false };
    } catch (error) {
      return { message: error.errors[0].message };
    }
  }
}

export default Validator;
