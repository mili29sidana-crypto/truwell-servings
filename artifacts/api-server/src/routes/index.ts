import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import ordersRouter from "./orders";
import waitlistRouter from "./waitlist";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/products", productsRouter);
router.use("/orders", ordersRouter);
router.use("/waitlist", waitlistRouter);

export default router;
