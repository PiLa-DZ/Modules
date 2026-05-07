# Environment Variables

```bash
touch .env .env.example
nvim .env

# .env
DATABASE_URL="mysql://admin:your_password@localhost:3306/workout_db"
DATABASE_HOST="localhost"
DATABASE_USER="admin"
DATABASE_PASSWORD="your_password"
DATABASE_NAME="workout_db"
DATABASE_PORT=3306
# NOTE: Don't forget to edit all (admin, your_password, workout_db) this is just examples
# WARN: Don't forget to add .evn to .gitignore
echo ".env" >> .gitignore
```
