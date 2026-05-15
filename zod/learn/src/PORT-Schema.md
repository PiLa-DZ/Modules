### Type-Safe Network Port Validation with Zod Coercion

A robust configuration schema for validating network PORT variables in backend applications.
Because environment variables loaded from `.env` files are inherently treated as strings,
this snippet utilizes `z.coerce.number()` to safely convert string representations (like "8080")
into native JavaScript integers at runtime.
It enforces strict networking constraints—guaranteeing the value is an integer
falling strictly within the legal `TCP/UDP` port range of 1 to 65535
to catch deployment issues before binding to a network socket.

```ts
import z from "zod";

// 1. Define the PORT schema using Zod Coercion
const portSchema = z.coerce // Automatically converts string inputs (like "3000") into a number
  .number({
    required_error: "PORT is required.",
    invalid_type_error: "PORT must be a valid number or numeric string.",
  })
  .int({ message: "PORT must be an integer." })
  .min(1, { message: "PORT must be greater than 0." })
  .max(65535, {
    message: "PORT cannot exceed the maximum network limit of 65535.",
  });

// 2. Infer the TypeScript type (will be: number)
type Port = z.infer<typeof portSchema>;

// 3. Test runner function
function testPort(port: unknown) {
  const data = portSchema.safeParse(port);

  if (data.success) {
    console.log(
      `✅ Success: Port is validly set to ${data.data} (Type: ${typeof data.data}).`,
    );
  } else {
    console.error(`❌ Error: ${data.error.issues[0]?.message}`);
  }
}

// ==========================================
// TEST CASES
// ==========================================

// Valid Ports
testPort(3000); // ✅ Success: Number 3000
testPort("8080"); // ✅ Success: String "8080" gets safely coerced into number 8080
testPort("  5432  "); // ✅ Success: Coercion handles standard spacing beautifully

// Invalid Ports
testPort(0); // ❌ Error: PORT must be greater than 0.
testPort(70000); // ❌ Error: PORT cannot exceed the maximum network limit of 65535.
testPort(3000.5); // ❌ Error: PORT must be an integer.
testPort("not-a-port"); // ❌ Error: PORT must be a valid number...

// Missing / Incorrect Types
testPort(undefined); // ❌ Error: PORT is required.
testPort(null); // ❌ Error: PORT must be a valid number...
```
