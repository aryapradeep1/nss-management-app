const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb://arya:arya2004@ac-rtuowj3-shard-00-00.m6m4y2b.mongodb.net:27017,ac-rtuowj3-shard-00-01.m6m4y2b.mongodb.net:27017,ac-rtuowj3-shard-00-02.m6m4y2b.mongodb.net:27017/labdb?ssl=true&replicaSet=atlas-6j27x5-shard-0&authSource=admin&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

// Schema
const volunteerSchema = new mongoose.Schema({
  volunteerId: String,
  fullName: String,
  department: String,
  yearOfStudy: String,
  email: String,
  phone: String,
  dateOfBirth: String,
  gender: String,
  address: String,
  bloodGroup: String,
  campName: String,
  hoursCompleted: String,
  unitNumber: String,
});

const Adding = mongoose.model("Volunteer", volunteerSchema);

// =================== ADD ===================
app.post("/add-vol", async (req, res) => {
  try {
    const volunteer = await Adding.create(req.body);

    res.json({
      status: "success",
      message: "Volunteer Added Successfully",
      data: volunteer,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
});

// =================== VIEW ===================
app.post("/view-vol", async (req, res) => {
  try {
    const volunteers = await Adding.find();

    res.json(volunteers);
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
});





app.listen(3000, () => {
  console.log("Server started on port 3000");
});