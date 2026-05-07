```bash

# NOTE:  In Development (dev)
npx prisma migrate dev --name init

# NOTE: In Production (deploy)
npx prisma migrate deploy

# NOTE: If you want to clean the database
# WARN: It deletes all tables, data, and indexes.
# WARN: NEVER use it in Production
npx prisma migrate reset

# NOTE: You have to drop database if exists
# WARN: This is just for learning
# WARN: Don't do this in real projects
mariadb -u admin -p"your_password" -e "DROP DATABASE IF EXISTS workout_db"
```
