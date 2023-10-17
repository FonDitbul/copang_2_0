"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listToMapAddValue = exports.listToMap = void 0;
const listToMap = (array, keyFunc) => {
    const map = new Map();
    for (const value of array) {
        const key = keyFunc(value);
        map.set(key, value);
    }
    return map;
};
exports.listToMap = listToMap;
const listToMapAddValue = (array, keyFunc, addValue) => {
    const map = new Map();
    for (const value of array) {
        const key = keyFunc(value);
        const newValue = Object.assign(value, addValue);
        map.set(key, newValue);
    }
    return map;
};
exports.listToMapAddValue = listToMapAddValue;
//# sourceMappingURL=map-util.js.map