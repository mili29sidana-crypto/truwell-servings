import { Router } from "express";
import { db } from "@workspace/db";
import { productsTable } from "@workspace/db";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await db.select().from(productsTable);
    const formatted = products.map((p) => ({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      price: parseFloat(p.price),
      originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : undefined,
      quantity: p.quantity,
      fibre: p.fibre ?? undefined,
      sugar: p.sugar ?? undefined,
      calories: p.calories ?? undefined,
      inStock: p.inStock,
      imageUrl: p.imageUrl ?? undefined,
      badge: p.badge ?? undefined,
    }));
    res.json(formatted);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch products");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
