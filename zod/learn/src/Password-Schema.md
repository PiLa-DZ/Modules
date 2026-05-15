### Check out this clean Zod schema

Customized the error messages for type mismatches
(like null or arrays) so the feedback is super clear for users

Let me know what you think!

> [!NOTE]
> This is `zod version 3.25.76`

```ts
import z from "zod";

const passwordSchema = z
  .string({
    required_error: "Password is required.",
    invalid_type_error: "Password must be a valid text string.",
  })

  .min(8, { message: "Password must be at least 8 characters long." })
  .max(20, { message: "Password cannot exceed 20 characters." })

  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter (A-Z).",
  })

  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter (a-z).",
  })

  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number (0-9).",
  })

  .refine((password) => /[!@#$%^&*?]/.test(password), {
    message:
      "Password must contain at least one special character (!@#$%^&*?).",
  });

function testPassword(password: string) {
  const data = passwordSchema.safeParse(password);

  if (data.success) {
    console.log(`Success: "${data.data}" is a valid password.`);
  } else {
    console.log(data.error.issues[0]?.message);
  }
}

testPassword("0!StrongPass"); // Success: "0!StrongPass" is a valid password.
testPassword("Short"); // Password must be at least 8 characters long.
testPassword("1! don't have captal"); // Password must contain at least one uppercase letter (A-Z).
testPassword("1! DON'T HAVE SMALL"); // Password must contain at least one lowercase letter (a-z).
testPassword("1 Don't have symbols"); // Password must contain at least one special character (!@#$%^&*?).
testPassword("ThisPasswordIsWayTooLong"); // Password cannot exceed 20 characters.
testPassword(); // Password is required.
testPassword(undefined); // Password is required.
testPassword(null); // Password must be a valid text string.
testPassword(["a", "b", "c"]); // Password must be a valid text string.
```
