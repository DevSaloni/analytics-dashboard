import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Sale from "../models/Sale.js";

dotenv.config();
connectDB();

// Designed so every chart and filter has data:
// - Each month Jan–Jun has all three categories
// - Each category has a mix of completed / pending / cancelled
// - Amounts vary so charts look professional
const sampleSales = [
  // ===== January =====
  { product: "Laptop Pro",      category: "Electronics", amount: 1800, status: "completed", date: new Date("2026-01-05") },
  { product: "Office Chair",    category: "Furniture",   amount: 320,  status: "pending",   date: new Date("2026-01-10") },
  { product: "Winter Jacket",   category: "Fashion",     amount: 220,  status: "cancelled", date: new Date("2026-01-18") },

  // ===== February =====
  { product: "Smartphone",      category: "Electronics", amount: 950,  status: "completed", date: new Date("2026-02-03") },
  { product: "Desk Lamp",       category: "Furniture",   amount: 80,   status: "pending",   date: new Date("2026-02-09") },
  { product: "Running Shoes",   category: "Fashion",     amount: 140,  status: "completed", date: new Date("2026-02-15") },

  // ===== March =====
  { product: "4K TV",           category: "Electronics", amount: 1300, status: "completed", date: new Date("2026-03-04") },
  { product: "Dining Table",    category: "Furniture",   amount: 700,  status: "completed", date: new Date("2026-03-17") },
  { product: "Leather Shoes",   category: "Fashion",     amount: 190,  status: "pending",   date: new Date("2026-03-25") },

  // ===== April =====
  { product: "Tablet",          category: "Electronics", amount: 650,  status: "pending",   date: new Date("2026-04-02") },
  { product: "Sofa",            category: "Furniture",   amount: 900,  status: "cancelled", date: new Date("2026-04-14") },
  { product: "Summer Dress",    category: "Fashion",     amount: 160,  status: "completed", date: new Date("2026-04-21") },

  // ===== May =====
  { product: "Camera",          category: "Electronics", amount: 1400, status: "completed", date: new Date("2026-05-06") },
  { product: "Bookshelf",       category: "Furniture",   amount: 340,  status: "completed", date: new Date("2026-05-19") },
  { product: "Sneakers",        category: "Fashion",     amount: 130,  status: "pending",   date: new Date("2026-05-27") },

  // ===== June =====
  { product: "Gaming Console",  category: "Electronics", amount: 1100, status: "completed", date: new Date("2026-06-03") },
  { product: "Wardrobe",        category: "Furniture",   amount: 800,  status: "completed", date: new Date("2026-06-16") },
  { product: "Watch",           category: "Fashion",     amount: 210,  status: "cancelled", date: new Date("2026-06-24") },
];

const seedData = async () => {
  try {
    await Sale.deleteMany();
    await Sale.insertMany(sampleSales);
    console.log("Sample Data Inserted Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();