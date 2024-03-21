import { z } from "zod";

class Validator {
  static cardatavalidation(data, setEroor) {
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
}

export default Validator;