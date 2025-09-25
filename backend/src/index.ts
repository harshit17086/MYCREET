import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swagger";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routes/user.routes";


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// CORS configuration
app.use(
  cors({
    origin: [
      "*",
      process.env.FRONTEND_URI_1 || "http://localhost:5173",
      process.env.FRONTEND_URI_2 || "http://localhost:8081",

    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



/**
 * @swagger
 * /api/v1/hello:
 *   get:
 *     summary: Returns a hello message
 *     description: A simple endpoint that returns a greeting
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: A successful response with a greeting
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, World!
 */
app.get("/api/v1/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});


//routes
app.use('/api/v1/users', userRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Swagger documentation available at http://localhost:${PORT}/api-docs`
  );
});