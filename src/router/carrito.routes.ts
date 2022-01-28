import { Router } from "express";
const cartRouter = Router();
import Carrito from "../controller/carrito";

const producto = new Carrito("carrito.txt");

cartRouter.get("/listar", async (req, res) => {
	try {
		const result = await producto.listarProducto();
		result === undefined
			? res.send({ error: "no hay productos cargados" })
			: res.send(result);
	} catch (error) {
		res.send(error);
	}
});

cartRouter.get("/listar/:id?", async (req, res) => {
	try {
		const id = req.params.id ?? "0";
		const result = await producto.mostrarProducto(id);

		result !== undefined
			? res.send(result)
			: res.send({ error: "producto no encontrado" });
	} catch (error) {
		res.send(error);
	}
});

cartRouter.post("/agregar", async (req: any, res: any) => {
	try {
		const { id, title, price } = await req.body;
		const result = await producto.agregarProducto(id, title, price);
		result !== undefined ? res.status(201).send(result) : res.send(null);
	} catch (error) {
		res.send(error);
	}
});

cartRouter.delete(`/borrar/:id`, (req: any, res: any) => {
	const id = req.params.id;
	res.send(producto.eliminarProducto(id));
});
export default cartRouter;
