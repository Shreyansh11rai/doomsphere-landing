import { parsePhoneNumberFromString } from "libphonenumber-js";
import z from "zod";

export const phoneValidator = z
  .string()
  .refine((val) => parsePhoneNumberFromString(val)?.isValid() ?? false, {
    message: "Invalid phone number",
  });

export const uuidValidator = z.uuid({ version: "v4" });
