"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHexHash = void 0;
/* eslint-disable import/prefer-default-export */
const crypto_1 = __importDefault(require("crypto"));
const generateHexHash = (bytes = 32) => {
    return crypto_1.default.randomBytes(bytes).toString('hex');
};
exports.generateHexHash = generateHexHash;
//# sourceMappingURL=generateRandomHash.js.map