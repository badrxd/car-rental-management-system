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
}
export default Validator;
