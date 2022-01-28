import dotenv from "dotenv";
import express from "express";
import productRouter from "./router/productos.routes";
import cartRouter from "./router/carrito.routes";
dotenv.config();
const app = express();

import { logger } from "./util/logger";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/productos", productRouter);
app.use("/carrito", cartRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	logger.info(`server listening on port ${PORT}`);
});
