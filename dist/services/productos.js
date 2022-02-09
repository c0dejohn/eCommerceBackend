"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../util/logger");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Producto = /** @class */ (function () {
    function Producto(name) {
        this.name = name;
    }
    Producto.prototype.listarProducto = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.default.promises.readFile(path_1.default.join(__dirname, "../db/".concat(this.name)), "utf-8")];
                    case 1:
                        data = _a.sent();
                        result = JSON.parse(data);
                        if (result.length === 0) {
                            return [2 /*return*/, '{error: "No hay productos cargados."}'];
                        }
                        return [2 /*return*/, result];
                    case 2:
                        err_1 = _a.sent();
                        logger_1.logger.info(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Producto.prototype.mostrarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, dataJson, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fs_1.default.promises.readFile(path_1.default.join(__dirname, "../db/".concat(this.name)), "utf-8")];
                    case 1:
                        data = _a.sent();
                        dataJson = JSON.parse(data);
                        return [4 /*yield*/, dataJson.find(function (item) { return item.id === parseInt(id, 10); })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, logger_1.logger.info("[]")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Producto.prototype.agregarProducto = function (title, price, thumbnail, stock) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, result, newData, payload, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        id = void 0;
                        return [4 /*yield*/, fs_1.default.promises.readFile(path_1.default.join(__dirname, "../db/".concat(this.name)), "utf-8")];
                    case 1:
                        data = _a.sent();
                        result = JSON.parse(data);
                        if (result.length !== 0) {
                            id =
                                result
                                    .map(function (item) { return item.id; })
                                    .sort()
                                    .pop() + 1;
                        }
                        else {
                            id = 1;
                        }
                        newData = __spreadArray([], result, true);
                        payload = {
                            title: title,
                            price: price,
                            thumbnail: thumbnail,
                            id: id,
                            stock: stock,
                            timestamp: Date.now()
                        };
                        newData.push(payload);
                        return [4 /*yield*/, fs_1.default.promises.writeFile(path_1.default.join(__dirname, "../db/".concat(this.name)), JSON.stringify(newData))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, payload];
                    case 3:
                        err_3 = _a.sent();
                        logger_1.logger.info("[falla al guardar]", err_3);
                        return [4 /*yield*/, fs_1.default.promises.writeFile("./static/".concat(this.name), "[]")];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, "archivo creado, vuelve a intentar\n"];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Producto.prototype.actualizarProducto = function (title, price, thumbnail, id, stock) {
        return __awaiter(this, void 0, void 0, function () {
            var data, result, oldData, payload, indiceProd, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.default.promises.readFile(path_1.default.join(__dirname, "../db/".concat(this.name)), "utf-8")];
                    case 1:
                        data = _a.sent();
                        result = JSON.parse(data);
                        oldData = __spreadArray([], result, true);
                        payload = {
                            title: title,
                            price: price,
                            thumbnail: thumbnail,
                            id: id,
                            stock: stock,
                            timestamp: Date.now()
                        };
                        indiceProd = oldData.findIndex(function (prod) {
                            return prod.id === id;
                        });
                        oldData[indiceProd] = payload;
                        fs_1.default.promises.writeFile(path_1.default.join(__dirname, "../db/".concat(this.name)), JSON.stringify(oldData), "utf-8");
                        return [2 /*return*/, payload];
                    case 2:
                        error_1 = _a.sent();
                        logger_1.logger.info(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Producto.prototype.eliminarProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, dataJson, newData, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.default.promises.readFile(path_1.default.join(__dirname, "../db/".concat(this.name)), "utf-8")];
                    case 1:
                        data = _a.sent();
                        dataJson = JSON.parse(data);
                        newData = dataJson.filter(function (item) { return item.id !== id; });
                        return [2 /*return*/, fs_1.default.writeFileSync(path_1.default.join(__dirname, "../db/".concat(this.name)), JSON.stringify(newData))];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, logger_1.logger.info("[]")];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Producto;
}());
exports.default = Producto;
