import express, { json } from "express";
import router from "./routes/routes.js";
import "./db/mongoose.js";
import cors from "cors";
const app = express();

app.use(json());
app.use(cors());
app.use("/api", router);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
