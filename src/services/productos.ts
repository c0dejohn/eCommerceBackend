import { logger } from "../util/logger";
import fs from "fs";
import path from "path";

class Producto {
	name: string;

	constructor(name: string) {
		this.name = name;
	}

	async listarProducto() {
		try {
			const data = await fs.promises.readFile(
				path.join(__dirname, `../db/${this.name}`),
				"utf-8"
			);

			const result = JSON.parse(data);

			if (result.length === 0) {
				return '{error: "No hay productos cargados."}';
			}
			return result;
		} catch (err) {
			logger.info(err);
		}
	}

	async mostrarProducto(id) {
		try {
			const data = await fs.promises.readFile(
				path.join(__dirname, `../db/${this.name}`),
				"utf-8"
			);
			const dataJson = JSON.parse(data);
			const result = await dataJson.find(
				(item) => item.id === parseInt(id, 10)
			);
			return result;
		} catch (err) {
			return logger.info("[]");
		}
	}
	async agregarProducto(title, price, thumbnail) {
		try {
			let id: number;
			const data = await fs.promises.readFile(
				path.join(__dirname, `../db/${this.name}`),
				"utf-8"
			);
			const result = JSON.parse(data);
			if (result.length !== 0) {
				id =
					result
						.map((item) => item.id)
						.sort()
						.pop() + 1;
			} else {
				id = 1;
			}
			const newData = [...result];
			const payload = {
				title,
				price,
				thumbnail,
				id,
				timestamp: Date.now()
			};
			newData.push(payload);
			await fs.promises.writeFile(
				path.join(__dirname, `../db/${this.name}`),
				JSON.stringify(newData)
			);
			return payload;
		} catch (err) {
			logger.info("[falla al guardar]", err);
			await fs.promises.writeFile(`./static/${this.name}`, "[]");
			return "archivo creado, vuelve a intentar\n";
		}
	}

	async actualizarProducto(
		title: string,
		price: number,
		thumbnail: string,
		id: number
	) {
		try {
			const data = await fs.promises.readFile(
				path.join(__dirname, `../db/${this.name}`),
				"utf-8"
			);
			const result = JSON.parse(data);
			const oldData = [...result];
			const payload = {
				title,
				price,
				thumbnail,
				id,
				timestamp: Date.now()
			};

			const indiceProd = oldData.findIndex((prod) => {
				return prod.id === id;
			});

			oldData[indiceProd] = payload;

			fs.promises.writeFile(
				path.join(__dirname, `../db/${this.name}`),
				JSON.stringify(oldData),
				"utf-8"
			);

			return payload;
		} catch (error) {
			logger.info(error);
		}
	}

	async eliminarProducto(id) {
		try {
			const data = await fs.promises.readFile(
				path.join(__dirname, `../db/${this.name}`),
				"utf-8"
			);
			const dataJson = JSON.parse(data);
			// const oldData = [...result];
			const newData = dataJson.filter((item) => item.id !== id);
			return fs.writeFileSync(
				path.join(__dirname, `../db/${this.name}`),
				JSON.stringify(newData)
			);
		} catch (err) {
			return logger.info("[]");
		}
	}
}

export default Producto;
