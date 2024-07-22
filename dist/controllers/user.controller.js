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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const asyncHandler_1 = __importDefault(require("../Utils/asyncHandler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.registerUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(500).json({
                message: "Please fill all fields",
            });
        }
        const isUserExist = yield user_model_1.default.aggregate([{ $match: { email: email } }]);
        if (!isUserExist || isUserExist.length === 0) {
            return res.json({ message: "User already exist" });
        }
        const hashPassword = bcryptjs_1.default.genSalt(10, password);
        const user = yield user_model_1.default.create({ name, email, hashPassword });
        if (!user) {
            return res.status(500).json({
                message: "some error occur !user",
            });
        }
        return res.status(200).json({ message: "user created" });
    }
    catch (error) {
        return res.json({
            message: "catch error user creation",
        });
    }
}));
exports.loginUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const user = yield user_model_1.default.aggregate([{ $match: { email: email } }]);
        if (!user || user.length === 0) {
            return res.json({
                message: "user not found",
            });
        }
        const comparePassword = yield bcryptjs_1.default.compare(password, user[0].password);
        if (!comparePassword) {
            return res.json({ message: "password not match" });
        }
        return res.status(200).json({
            message: "Login success",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "catch error user creation",
        });
    }
}));
