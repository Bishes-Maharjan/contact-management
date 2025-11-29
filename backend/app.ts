import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { connectToDatabase } from "./libs/mongoose.connection";
import contactRoutes from "./routes/contacts.route";
import userRoutes from "./routes/user.route";
dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const app = express();

//essestials
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.get("/", (_req, res) => {
  res.send("API is running...");
});
//global error handler
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);
    res
      .status(err?.status || 500)
      .json({ error: err?.message || "Internal Server Error" });
  }
);

let server: http.Server | undefined;

async function start() {
  try {
    await connectToDatabase();
    server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
    process.exit(1);
  }
}

start();
