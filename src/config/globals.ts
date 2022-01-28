import * as dotenv from "dotenv";
dotenv.config();

const globals = {
	PORT: process.env.PORT || 8080,
	NODE_ENV: process.env.NODE_ENV || "development"
};

export default globals;
