"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var isAdmin = process.env.ADMIN || "true";
exports.authMiddleware = function (request, response, next) {
    if (isAdmin === "false") {
        response
            .status(403)
            .send("{error : -1 description:'".concat(request.path, "' method '").concat(request.method, "' ACCESS_DENIED }"));
        throw Error;
    }
    next();
};
