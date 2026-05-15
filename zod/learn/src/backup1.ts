import z from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "message for min" })
  .max(30, { message: "message for max" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "message for A to Z",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "message for a to z",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "message for 0 to 9",
  })
  .refine((password) => /[!@#$%^&*?]/.test(password), {
    message: "message for symbols",
  });

function input(password: string) {
  try {
    const validatePassword = passwordSchema.parse(password);
    console.log(`Success password --> ${validatePassword} <--`);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error(err.issues[0]?.message);
    }
  }
}

input("0! Strong Password"); // Success password --> 0! Strong Password <--
input("Short"); // message for min
input("This password longer than 20"); // message for symbols
input("1! don't have captal"); // message for A to Z
input("1! DON'T HAVE SMALL"); // message for a to z
input("1 Don't have symbols"); // message for symbols

/*
 * email
 * password
 * uuid
 * jwt
 * url
 *
 * hash("sha256")
 * iso.datetime()
 * coerce.number()
 */

// const emailSchema = z.string().trim().toLowerCase().email();
// const email = emailSchema.parse("user@gmail.com");
// console.log(email);
