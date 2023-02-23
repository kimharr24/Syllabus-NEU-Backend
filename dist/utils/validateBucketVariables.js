"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const EnvStatus_1 = require("./EnvStatus");
const andMap_1 = require("./andMap");
dotenv_1.default.config();
const validateBucketVariables = () => {
    const bucketName = (0, EnvStatus_1.validateEnvironmentVariable)(process.env.BUCKET_NAME);
    const bucketRegion = (0, EnvStatus_1.validateEnvironmentVariable)(process.env.BUCKET_REGION);
    const bucketAccessKey = (0, EnvStatus_1.validateEnvironmentVariable)(process.env.BUCKET_ACCESS_KEY);
    const bucketSecretAccessKey = (0, EnvStatus_1.validateEnvironmentVariable)(process.env.BUCKET_SECRET_ACCESS_KEY);
    if (!(0, andMap_1.andMap)(bucketName.valid, bucketRegion.valid, bucketAccessKey.valid, bucketSecretAccessKey.valid)) {
        throw new Error('Check missing/incorrect S3 environment variables in .env');
    }
    else {
        return {
            bucketName: bucketName.data,
            bucketRegion: bucketRegion.data,
            bucketAccessKey: bucketAccessKey.data,
            bucketSecretAccessKey: bucketSecretAccessKey.data,
        };
    }
};
exports.default = validateBucketVariables;
//# sourceMappingURL=validateBucketVariables.js.map