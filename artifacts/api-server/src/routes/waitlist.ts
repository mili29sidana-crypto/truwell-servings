import { Router } from "express";
import { db, waitlistTable } from "@workspace/db";
import { JoinWaitlistBody } from "@workspace/api-zod";
import { sendWaitlistConfirmation } from "../email.js";

const router = Router();

router.post("/", async (req, res) => {
  const parsed = JoinWaitlistBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { email, name, product } = parsed.data;

  try {
    const inserted = await db
      .insert(waitlistTable)
      .values({ email, name, product })
      .returning();

    const entry = inserted[0];

    sendWaitlistConfirmation({
      name,
      email,
      productName: product,
    }).catch((err) => req.log.error({ err }, "Failed to send waitlist confirmation email"));

    res.status(201).json({
      id: entry.id,
      email: entry.email,
      name: entry.name,
      product: entry.product,
      createdAt: entry.createdAt.toISOString(),
    });
  } catch (err: unknown) {
    const pgErr = err as { code?: string };
    if (pgErr.code === "23505") {
      res.status(409).json({ error: "Email already on waitlist" });
      return;
    }
    req.log.error({ err }, "Failed to join waitlist");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
