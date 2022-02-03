import { Router } from "express";
const cartRouter = Router();
import Carrito from "../controller/carrito";

const producto = new Carrito("carrito.txt");

cartRouter.get("/:id/productos", async (req, res) => {
	try {
		const id = req.params.id ?? 0;
		const result = await producto.mostrarProducto(parseInt(id, 10));

		result !== undefined
			? res.send(result)
			: res.send({ error: "producto no encontrado" });
	} catch (error) {
		res.send(error);
	}
});

cartRouter.post("/", async (req: any, res: any) => {
	try {
		const { id, title, price } = await req.body;
		const result = await producto.agregarProducto(id, title, price);
		result !== undefined ? res.status(201).send(result) : res.send(result);
	} catch (error) {
		res.send(error);
	}
});

cartRouter.put(`/:id`, async (req: any, res: any) => {
	try {
		const { title, price, thumbnail } = await req.body;
		const id = await req.params.id;
		const payload = await producto.actualizarProducto(
			title,
			price,
			thumbnail,
			id
		);
		res.send(payload);
	} catch (error) {
		res.send(error);
	}
});

cartRouter.delete(`/:id`, (req: any, res: any) => {
	const id = req.params.id;
	res.send(producto.eliminarProducto(parseInt(id, 10)));
});
export default cartRouter;
