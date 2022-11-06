"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const authentication = async (req) => {
    await req.jwtVerify();
};
exports.authentication = authentication;
