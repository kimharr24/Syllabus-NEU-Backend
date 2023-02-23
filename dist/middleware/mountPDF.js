"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
// Stores PDF collected from the front-end in RAM before uploading to S3
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
// upload middleware must have same name as submission field in NewSyllabusForm
exports.default = upload.single('pdf-file');
//# sourceMappingURL=mountPDF.js.map