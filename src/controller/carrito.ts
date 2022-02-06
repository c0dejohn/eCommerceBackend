import Carrito from "../services/carrito";
const producto = new Carrito("carrito.txt");

class CarritoController {
	getById = async (req, res) => {
		try {
			const id = req.params.id ?? 0;
			const result = await producto.mostrarProducto(parseInt(id, 10));

			result !== undefined
				? res.send(result)
				: res.send({ error: "producto no encontrado" });
		} catch (error) {
			res.send(error);
		}
	};

	addProduct = async (req: any, res: any) => {
		try {
			const { id, title, price } = await req.body;
			const result = await producto.agregarProducto(id, title, price);
			result !== undefined ? res.status(201).send(result) : res.send(result);
		} catch (error) {
			res.send(error);
		}
	};

	update = async (req: any, res: any) => {
		try {
			const { title, price, thumbnail } = await req.body;
			const id = await req.params.id;
			const payload = await producto.actualizarProducto(
				title,
				price,
				thumbnail,
				parseInt(id, 10)
			);
			res.sendStatus(200).json({ payload });
		} catch (error) {
			res.send(error);
		}
	};

	destroy = async (req: any, res: any) => {
		const id = req.params.id;
		producto.eliminarProducto(parseInt(id, 10));
		res.sendStatus(204);
	};
}

export default CarritoController;
