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
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const util_dynamodb_1 = require("@aws-sdk/util-dynamodb");
const validateDynamoVariables_1 = __importDefault(require("../utils/validateDynamoVariables"));
const router = (0, express_1.Router)();
const dynamoConfigs = (0, validateDynamoVariables_1.default)();
const dynamo = new client_dynamodb_1.DynamoDBClient({
    region: dynamoConfigs.dynamoRegion,
    credentials: {
        accessKeyId: dynamoConfigs.dynamoAccessKey,
        secretAccessKey: dynamoConfigs.dynamoSecretAccessKey,
    },
});
router.get('/dynamo/objects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const params = {
        TableName: dynamoConfigs.dynamoTableName,
    };
    const command = new client_dynamodb_1.ScanCommand(params);
    const dynamoOutput = yield dynamo.send(command);
    const marshalledObjectArray = (_a = dynamoOutput.Items) !== null && _a !== void 0 ? _a : [];
    const unmarshalledObjects = marshalledObjectArray.map((record) => (0, util_dynamodb_1.unmarshall)(record));
    if (marshalledObjectArray.length > 0) {
        res.send(unmarshalledObjects);
    }
    else {
        res.send([]);
    }
}));
router.post('/dynamo/objects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        TableName: dynamoConfigs.dynamoTableName,
        Item: (0, util_dynamodb_1.marshall)({
            id: req.body.id,
            credits: req.body.credits,
            description: req.body.description,
            professor: {
                fullName: req.body.professor.fullName,
                email: req.body.professor.email,
            },
            courseNumber: req.body.courseNumber,
            courseTitle: req.body.courseTitle,
            semester: req.body.semester,
            syllabusURL: '',
        }),
    };
    const command = new client_dynamodb_1.PutItemCommand(params);
    yield dynamo.send(command);
    res.status(201);
    res.send({});
}));
exports.default = router;
//# sourceMappingURL=DynamoRouter.js.map