"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.andMap = void 0;
// eslint-disable-next-line import/prefer-default-export
function andMap(...args) {
    let result = true;
    args.forEach((arg) => {
        result = result && arg;
    });
    return result;
}
exports.andMap = andMap;
//# sourceMappingURL=andMap.js.map