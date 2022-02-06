import { Router } from "express";
const productRouter = Router();
import Producto from "../controller/productos";
import { authMiddleware } from "../middleware/authHandler";

const producto = new Producto();

productRouter.get("/", producto.getAll);
productRouter.post("/", authMiddleware, producto.create);
productRouter.put(`/:id`, authMiddleware, producto.update);
productRouter.delete(`/:id`, authMiddleware, producto.destroy);
productRouter.get("/:id?", producto.getById);

export default productRouter;
