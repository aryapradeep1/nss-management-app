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
const Adding = mongoose.model(
  "add",
  new mongoose.Schema({
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
  })
);

// Add Volunteer
app.post("/add-vol", async (req, res) => {
  try {
    const volunteer = await Adding.create(req.body);

    res.json({
      status: "success",
      data: volunteer,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
});

// View All Volunteers
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

// Update Volunteer
app.put("/update-vol/:id", async (req, res) => {
  try {
    const updatedVolunteer = await Adding.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      status: "updated",
      data: updatedVolunteer,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
});

// Delete Volunteer
app.delete("/delete-vol/:id", async (req, res) => {
  try {
    await Adding.findByIdAndDelete(req.params.id);

    res.json({
      status: "deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});