import { Router } from "express";
const cartRouter = Router();
import Carrito from "../controller/carrito";

const carrito = new Carrito();

cartRouter.get("/:id/productos", carrito.getById);
cartRouter.post("/", carrito.addProduct);
cartRouter.put(`/:id`, carrito.update);
cartRouter.delete(`/:id`, carrito.destroy);

export default cartRouter;
