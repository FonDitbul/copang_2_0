"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotContainKeyInObject = exports.isContainKeyInObject = exports.isEmptyObject = void 0;
const isEmptyObject = (object) => {
    return JSON.stringify(object) === '{}';
};
exports.isEmptyObject = isEmptyObject;
const isContainKeyInObject = (object, key) => {
    return object[key] !== undefined;
};
exports.isContainKeyInObject = isContainKeyInObject;
const isNotContainKeyInObject = (object, key) => {
    return object[key] == undefined;
};
exports.isNotContainKeyInObject = isNotContainKeyInObject;
//# sourceMappingURL=object.util.js.map