"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_util_1 = require("./json.util");
describe('json util 테스트', () => {
    test('undefiend 키 삭제하기', () => {
        const testJson = {
            temp1: 'test',
            temp2: undefined,
        };
        const result = (0, json_util_1.removeUndefinedKey)(testJson);
        expect(result.temp2).not.toBeDefined();
        expect(result.temp2).toBeUndefined();
    });
});
//# sourceMappingURL=json.util.spec.js.map