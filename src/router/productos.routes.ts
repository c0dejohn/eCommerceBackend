import { Router, Request, Response } from "express";
const productRouter = Router();
import Producto from "../controller/productos";
import { authMiddleware } from "../middleware/authHandler";

// function authMiddleware(request: Request, response: Response, next) {
// 	if (isAdmin === "false") {
// 		response
// 			.status(403)
// 			.send(
// 				`{error : -1 description:'${request.path}' method '${request.method}' ACCESS_DENIED }`
// 			);
// 		throw Error;
// 	}

// 	next();
// }

const producto = new Producto("productos.txt");

productRouter.get("/", async (req, res) => {
	try {
		const result = await producto.listarProducto();
		result === undefined
			? res.send({ error: "no hay productos cargados" })
			: res.send(result);
	} catch (error) {
		res.send(error);
	}
});

productRouter.post("/", authMiddleware, async (req: any, res: any) => {
	try {
		const { title, price, thumbnail } = await req.body;
		const result = await producto.agregarProducto(title, price, thumbnail);
		result !== undefined ? res.status(201).send(result) : res.send(null);
	} catch (error) {
		res.send(error);
	}
});

productRouter.put(`/:id`, authMiddleware, async (req: any, res: any) => {
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

productRouter.delete(`/:id`, authMiddleware, async (req: any, res: any) => {
	const id = await req.params.id;
	const payload = await producto.eliminarProducto(parseInt(id, 10));
	res.send(payload);
});

productRouter.get("/:id?", async (req, res) => {
	try {
		const id = req.params.id ?? "0";
		const result = await producto.mostrarProducto(parseInt(id, 10));

		result !== undefined
			? res.send(result)
			: res.send({ error: "producto no encontrado" });
	} catch (error) {
		res.send(error);
	}
});

export default productRouter;
