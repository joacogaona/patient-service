🚀 Patient Service API

This is a backend service built with Nest.js which provides functionality for patient management and sends out emails asynchronously.

🛠 Tech Stack:

Main: Node.js, Nest.js(with TypeScript)
Database: TypeOrm (MySQL)
Caching & Message Queue: Redis, Bull
Email Service: Nodemailer

🚦 Getting Started:

- Setup Environment Variables:
  Duplicate the .env.example file and rename it to .env. Fill the variables with the appropriate values provided to you.

- Ensure Docker is Running:
  Before proceeding, make sure you have Docker running on your system.

- Build and Run with Docker:
  Execute the following commands in order:

docker-compose build
docker-compose up

This will create and initialize the MySQL database, a Redis instance, and connect them to the API.

🔍 Main Functionality:

When a request is made to the Patient controller, a new patient record is added to the MySQL database. Subsequently, an event is sent to a queue (handled by Bull and Redis) which triggers an asynchronous email sending process.

📦 Dependencies Explanation:

@nestjs-modules/mailer, nodemailer: Enables email functionality, used to send out notifications or info to users.

@nestjs/bull, bull: Provides job & message queue functionality for tasks like sending out emails asynchronously.

@nestjs/typeorm, mysql2: Allows the API to interact with the MySQL database.

dotenv: Loads environment variables from the .env file.

class-transformer, class-validator: Used for data validation and transformation in the DTOs (Data Transfer Objects).
