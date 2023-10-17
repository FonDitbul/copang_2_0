"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapKeyValueArray = void 0;
const mapKeyValueArray = (map, key, value) => {
    var _a;
    const copy = new Map(map);
    const valueArr = (_a = copy.get(key)) !== null && _a !== void 0 ? _a : [];
    valueArr.push(value);
    copy.set(key, valueArr);
    return copy;
};
exports.mapKeyValueArray = mapKeyValueArray;
//# sourceMappingURL=list-util.js.map