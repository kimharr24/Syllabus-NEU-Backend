"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const EnvStatus_1 = require("./EnvStatus");
const andMap_1 = require("./andMap");
dotenv_1.default.config();
const validateDynamoVariables = () => {
    const accessKey = (0, EnvStatus_1.validateEnvironmentVariable)(process.env.DYNAMO_ACCESS_KEY);
    const secretAccessKey = (0, EnvStatus_1.validateEnvironmentVariable)(process.env.DYNAMO_SECRET_ACCESS_KEY);
    const region = (0, EnvStatus_1.validateEnvironmentVariable)(process.env.DYNAMO_AWS_REGION);
    const tableName = (0, EnvStatus_1.validateEnvironmentVariable)(process.env.DYNAMO_TABLE_NAME);
    if (!(0, andMap_1.andMap)(accessKey.valid, secretAccessKey.valid, region.valid, tableName.valid)) {
        throw new Error('Check missing/incorrect DynamoDB environment variables in .env');
    }
    else {
        return {
            dynamoAccessKey: accessKey.data,
            dynamoSecretAccessKey: secretAccessKey.data,
            dynamoRegion: region.data,
            dynamoTableName: tableName.data,
        };
    }
};
exports.default = validateDynamoVariables;
//# sourceMappingURL=validateDynamoVariables.js.map