import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const isAdmin = process.env.ADMIN || "true";

export const authMiddleware = (request: Request, response: Response, next) => {
	if (isAdmin === "false") {
		response
			.status(403)
			.send(
				`{error : -1 description:'${request.path}' method '${request.method}' ACCESS_DENIED }`
			);
		throw Error;
	}

	next();
};
