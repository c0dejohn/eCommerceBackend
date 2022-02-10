import { error } from "console";
import Carrito from "../services/carrito";
import Producto from "../services/productos";
const producto = new Producto("productos.txt");
const carrito = new Carrito("carrito.txt");

class CarritoController {
	getById = async (req, res) => {
		try {
			const id = req.params.id ?? 0;
			const result = await carrito.mostrarProducto(parseInt(id, 10));

			result !== undefined
				? res.send(result)
				: res.send({ error: "producto no encontrado" });
		} catch (error) {
			res.send(error);
		}
	};

	addProduct = async (req, res) => {
		try {
			const { title, price, thumbnail, quantity, id } = await req.body;
			const data = await producto.mostrarProducto(id);
			const newStock = data?.stock || 0;
			if (newStock < 1) {
				throw error({ error: "No hay stock disponible" });
			}
			const stock = newStock - quantity;
			await producto.actualizarProducto(
				title,
				price,
				thumbnail,
				parseInt(id, 10),
				stock
			);

			const result = await carrito.agregarProducto(
				title,
				price,
				thumbnail,
				stock
			);
			result !== undefined ? res.status(201).send(result) : res.send(result);
		} catch (error) {
			res.send(error);
		}
	};

	update = async (req, res) => {
		try {
			const { title, price, thumbnail, stock } = await req.body;
			const id = await req.params.id;
			const payload = await carrito.actualizarProducto(
				title,
				price,
				thumbnail,
				stock,
				parseInt(id, 10)
			);
			res.sendStatus(200).json({ payload });
		} catch (error) {
			res.send(error);
		}
	};

	destroy = async (req, res) => {
		const id = req.params.id;
		carrito.eliminarProducto(parseInt(id, 10));
		res.sendStatus(204);
	};
}

export default CarritoController;
