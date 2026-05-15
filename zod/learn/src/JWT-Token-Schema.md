### Robust JWT Format Validation with Zod & TypeScript

> [!WARNING]
> It's important to remember that `Zod's .jwt()` method
> only validates the format structural rules
> (checking that it looks like a validly encoded 3-part string).

- It does not:
  - Check if the token is expired.
  - Verify if the signature matches your secret key.

> [!NOTE]
> This is `zod version 3.25.76`
> Install `jsonwebtoken` module
> Install `@types/jsonwebtoken` module

```ts
import z from "zod";
import jwt from "jsonwebtoken";

// 1. Define the JWT Schema with custom validation messages
const jwtTokenSchema = z
  .string({
    required_error: "JWT token is required.",
    invalid_type_error: "JWT token must be a valid text string.",
  })
  .trim() // Clear out any accidental spacing from headers or input fields
  .jwt({ message: "Invalid JWT token format." }); // Enforces the 3-part header.payload.signature structure

// 2. Infer the TypeScript type
type JwtToken = z.infer<typeof jwtTokenSchema>;

// 3. Test runner function
function testJwtToken(jwtToken: JwtToken) {
  const data = jwtTokenSchema.safeParse(jwtToken);

  if (data.success) {
    console.log(`Success: Valid JWT format.`);
  } else {
    console.error(data.error.issues[0]?.message);
  }
}

// ==========================================
// TEST CASES
// ==========================================
testJwtToken(jwt.sign({ foo: "bar" }, "secretOrPrivateKey")); // Success: Valid JWT format.

// Valid JWT Format Example (Header.Payload.Signature encoded strings)
const mockJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
testJwtToken(mockJwt); // Success: Valid JWT format.
testJwtToken(`  ${mockJwt}  `); // Success: Trims spaces cleanly.

// Invalid JWT Formats
testJwtToken("not-a-jwt-token"); // Invalid JWT format.
testJwtToken("a.b"); // Invalid JWT format. (Missing the third section)
testJwtToken("a.b.c.d"); // Invalid JWT format. (Too many sections)

// Testing with a UUID (This will now give your custom error!)
testJwtToken("123e4567-e89b-12d3-a456-426614174000"); // Invalid JWT format.

// Missing / Incorrect Types
testJwtToken(undefined); // JWT token is required.
testJwtToken(null); // JWT token must be a valid text string.
```
