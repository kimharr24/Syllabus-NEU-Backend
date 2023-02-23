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
const express_1 = require("express");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const validateBucketVariables_1 = __importDefault(require("../utils/validateBucketVariables"));
const mountPDF_1 = __importDefault(require("../middleware/mountPDF"));
const generateRandomHash_1 = require("../utils/generateRandomHash");
const router = (0, express_1.Router)();
const configs = (0, validateBucketVariables_1.default)();
const s3 = new client_s3_1.S3Client({
    region: configs.bucketRegion,
    credentials: {
        accessKeyId: configs.bucketAccessKey,
        secretAccessKey: configs.bucketSecretAccessKey,
    },
});
router.get('/s3/objects/unsignedURL/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const params = {
        Bucket: configs.bucketName,
        Key: id,
    };
    const command = new client_s3_1.GetObjectCommand(params);
    const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: 300 });
    res.send(url);
}));
router.post('/s3/objects', mountPDF_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const key = (0, generateRandomHash_1.generateHexHash)();
    const params = {
        Bucket: configs.bucketName,
        Key: key,
        Body: (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer,
        ContentType: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
    };
    const command = new client_s3_1.PutObjectCommand(params);
    yield s3.send(command);
    res.status(201);
    res.send({ objectKey: key });
}));
exports.default = router;
//# sourceMappingURL=S3Router.js.map