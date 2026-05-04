import { Router } from "express";
import { db, ordersTable, productsTable } from "@workspace/db";
import { CreateOrderBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";
import { sendOrderConfirmation } from "../email.js";

const router = Router();

router.post("/", async (req, res) => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { productId, quantity, name, email, phone, address, city, pincode } = parsed.data;

  try {
    const products = await db.select().from(productsTable).where(eq(productsTable.id, productId));
    if (products.length === 0) {
      res.status(400).json({ error: "Product not found" });
      return;
    }

    const product = products[0];
    const totalAmount = parseFloat(product.price) * quantity;

    const inserted = await db
      .insert(ordersTable)
      .values({
        productId,
        quantity,
        name,
        email,
        phone,
        address,
        city,
        pincode,
        totalAmount: totalAmount.toString(),
        status: "pending",
      })
      .returning();

    const order = inserted[0];

    sendOrderConfirmation({
      name,
      email,
      productName: product.name,
      quantity,
      totalAmount,
      address,
      city,
      pincode,
    }).catch((err) => req.log.error({ err }, "Failed to send order confirmation email"));

    res.status(201).json({
      id: order.id,
      productId: order.productId,
      quantity: order.quantity,
      name: order.name,
      email: order.email,
      phone: order.phone,
      address: order.address,
      city: order.city,
      pincode: order.pincode,
      totalAmount: parseFloat(order.totalAmount),
      status: order.status,
      createdAt: order.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create order");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
