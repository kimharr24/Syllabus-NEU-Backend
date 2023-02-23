"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnvironmentVariable = void 0;
const validateEnvironmentVariable = (key) => {
    return key ? { valid: true, data: key } : { valid: false, data: '' };
};
exports.validateEnvironmentVariable = validateEnvironmentVariable;
//# sourceMappingURL=EnvStatus.js.map