import express, { Router } from "express";
const productRouter = Router();
import Producto from "../controller/productos";
import dotenv from "dotenv";
dotenv.config();
const isAdmin = process.env.ADMIN || "true";

function authMiddleware(
	request: express.Request,
	response: express.Response,
	next
) {
	if (isAdmin === "false") {
		response
			.status(403)
			.send(
				`{error : -1 description:'${request.path}' method '${request.method}' ACCESS_DENIED }`
			);
		throw Error;
	}

	next();
}

const producto = new Producto("productos.txt");

productRouter.get("/listar", async (req, res) => {
	try {
		const result = await producto.listarProducto();
		result === undefined
			? res.send({ error: "no hay productos cargados" })
			: res.send(result);
	} catch (error) {
		res.send(error);
	}
});

productRouter.post("/agregar", authMiddleware, async (req: any, res: any) => {
	try {
		const { title, price, thumbnail } = await req.body;
		const result = await producto.agregarProducto(title, price, thumbnail);
		result !== undefined ? res.status(201).send(result) : res.send(null);
	} catch (error) {
		res.send(error);
	}
});

productRouter.put(
	`/actualizar/:id`,
	authMiddleware,
	async (req: any, res: any) => {
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
	}
);

productRouter.delete(
	`/borrar/:id`,
	authMiddleware,
	async (req: any, res: any) => {
		const id = await req.params.id;
		const payload = await producto.eliminarProducto(id);
		res.send(payload);
	}
);

productRouter.get("/listar/:id?", async (req, res) => {
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

export default productRouter;
