import express from "express";
import Customer from "../models/Customer.js";

const router = express.Router();

// Add customer
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const customer = await Customer.create({ name });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
