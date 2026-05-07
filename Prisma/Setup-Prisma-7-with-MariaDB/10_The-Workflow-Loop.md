# 🔄 The Workflow (The "Loop")

Every time you want to add a feature to your project, follow this loop:

1. Modify Schema: Add a field to `schema.prisma` `(e.g., add email to User)`.

2. Migrate: Run `npx prisma migrate dev --name msg`. This updates the DB and the LSP types.

3. Update Service:
   Go to your `user.service.ts.` Your LSP will now autocomplete
   the new email field inside the create function!
