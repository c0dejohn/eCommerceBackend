import express from "express";
import productRouter from "./router/productos.routes";
import cartRouter from "./router/carrito.routes";
import config from "./config/globals";
const app = express();

import { logger } from "./util/logger";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);

const { PORT } = config;

app.listen(PORT, () => {
	logger.info(`server listening on port ${PORT}`);
});
