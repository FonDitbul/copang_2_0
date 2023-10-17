"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_util_1 = require("./list-util");
describe('list-util test', function () {
    describe('mapKeyValueArray 함수 테스트', () => {
        it('map 에 아무것도 존재하지 않을 시', function () {
            const givenMap = new Map();
            const actual = (0, list_util_1.mapKeyValueArray)(givenMap, 1, 'test1');
            expect(actual.size).toEqual(1);
            expect(actual.get(1).length).toEqual(1);
            expect(actual.get(1)[0]).toEqual('test1');
        });
        it('map 에 이미 데이터가 존재할 때 해당 array에 push 하는 경우', function () {
            const givenMap = new Map();
            givenMap.set(1, ['test1']);
            const actual = (0, list_util_1.mapKeyValueArray)(givenMap, 1, 'test2');
            expect(actual.size).toEqual(1);
            expect(actual.get(1).length).toEqual(2);
            expect(actual.get(1).find((value) => value === 'test2')).toEqual('test2');
        });
    });
});
//# sourceMappingURL=list-util.spec.js.map