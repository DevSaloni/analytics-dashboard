import Sale from "../models/Sale.js";

export const getSales = async (req, res) => {
  try {
    const { startDate, endDate, category, status } = req.query;

    let filter = {};

    // Date filtering (support either start, end or both)
   if (startDate || endDate) {
  filter.date = {};

  if (startDate) {
    filter.date.$gte = new Date(startDate + "T00:00:00.000Z");
  }

  if (endDate) {
    filter.date.$lte = new Date(endDate + "T23:59:59.999Z");
  }
}

    // Category filtering
    if (category && category !== "All Categories") {
      filter.category = category;
    }

    // Status filtering (normalize to lowercase to match enum/seed data)
    if (status && status !== "All Status") {
      filter.status = status.toLowerCase();
    }

    const sales = await Sale.find(filter);

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};