const express =  require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express();
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");

app.use(cors());
app.use(express.json())
app.use("/api/tasks", taskRoutes);

app.get("/", ( req, res )=>{
     res.send("Todo API is running");
} )

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });