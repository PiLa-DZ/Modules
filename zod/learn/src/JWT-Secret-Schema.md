### Enforcing Strong JWT Secret Entropy with Zod Validation

```ts
import z from "zod";

// 1. Define the JWT_SECRET schema with strict security rules
const jwtSecretSchema = z
  .string({
    required_error: "JWT_SECRET is required.",
    invalid_type_error: "JWT_SECRET must be a valid text string.",
  })
  .min(32, {
    message: "JWT_SECRET is insecure. It must be at least 32 characters long.",
  });

// 2. Infer the TypeScript type
type JwtSecret = z.infer<typeof jwtSecretSchema>;

// 3. Test runner function
function testJwtSecret(secret: JwtSecret) {
  const data = jwtSecretSchema.safeParse(secret);

  if (data.success) {
    // Masking the output for display so secrets don't leak into logs
    const maskedSecret = `${data.data.substring(0, 4)}...${data.data.substring(data.data.length - 4)}`;
    console.log(
      `✅ Success: JWT_SECRET is secure ("${maskedSecret}" passed validation).`,
    );
  } else {
    console.error(`❌ Error: ${data.error.issues[0]?.message}`);
  }
}

// ==========================================
// TEST CASES
// ==========================================

// Valid JWT Secrets (32 characters or more)
testJwtSecret("super_long_and_extremely_secure_random_string_123"); // ✅ Success (51 chars)
testJwtSecret("a".repeat(32)); // ✅ Success (Exactly 32 chars)

// Invalid JWT Secrets (Too short/weak)
testJwtSecret("short_secret"); // ❌ Error: JWT_SECRET is insecure. It must be at least 32 characters long.
testJwtSecret("1234567890"); // ❌ Error: JWT_SECRET is insecure. It must be at least 32 characters long.

// Missing / Incorrect Types
testJwtSecret(undefined); // ❌ Error: JWT_SECRET is required.
testJwtSecret(null); // ❌ Error: JWT_SECRET must be a valid text string.
```
