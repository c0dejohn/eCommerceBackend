import winston from "winston";

const format = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
	winston.format.colorize({ all: true }),
	winston.format.printf(
		(info) => `${info.timestamp} ${info.level}: ${info.message}`
	)
);

export const logger = winston.createLogger({
	level: "info",
	format: winston.format.simple(),
	transports: [new winston.transports.Console({ level: "verbose" })]
});
