import express from "express";
import morgan from "morgan";
import postRoute from "./routes/postRoute"
import userRoute from "./routes/userRoute"
import connectDB from "./config/db"

const app = express();
const port = process.env.APP_PORT || 8080;

// connect to database
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :response-time ms'));

app.get("/ping", (_, res) => {
  res.status(200).send("🏓 pong!");
});

// routes
app.use('/api/blog', postRoute);
app.use('/api/author', userRoute);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
