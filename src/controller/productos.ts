import Producto from "../services/productos";
const producto = new Producto("productos.txt");

class ProductoController {
	getAll = async (req, res) => {
		try {
			const result = await producto.listarProducto();
			result === undefined
				? res.send({ error: "no hay productos cargados" })
				: res.send(result);
		} catch (error) {
			res.send(error);
		}
	};

	create = async (req, res) => {
		try {
			const { title, price, thumbnail } = await req.body;
			const result = await producto.agregarProducto(title, price, thumbnail);
			result !== undefined ? res.status(201).send(result) : res.send(null);
		} catch (error) {
			res.send(error);
		}
	};

	update = async (req, res) => {
		try {
			const { title, price, thumbnail } = await req.body;
			const id = parseInt(req.params.id, 10);
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
	};

	destroy = async (req, res) => {
		const id = await req.params.id;
		await producto.eliminarProducto(parseInt(id, 10));
		res.sendStatus(204);
	};

	getById = async (req, res) => {
		try {
			const id = req.params.id ?? "0";
			const result = await producto.mostrarProducto(parseInt(id, 10));

			result !== undefined
				? res.send(result)
				: res.send({ error: "producto no encontrado" });
		} catch (error) {
			res.send(error);
		}
	};
}

export default ProductoController;
