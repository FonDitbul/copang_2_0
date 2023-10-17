"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const object_util_1 = require("./object.util");
describe('object util test', () => {
    describe('isEmptyObject 함수 테스트', () => {
        it('해당 객체가 비어있어 true를 반환하는 경우', () => {
            const givenObject = {};
            const result = (0, object_util_1.isEmptyObject)(givenObject);
            expect(result).toBeTruthy();
        });
        it('해당 객체가 비어있지 않아 false 를 반환하는 경우', () => {
            const givenObject = { test: true };
            const result = (0, object_util_1.isEmptyObject)(givenObject);
            expect(result).toBeFalsy();
        });
    });
    describe('isContainKeyInObject 함수 테스트', () => {
        it('object 안에 해당 key 값의 데이터가 존재하여 true를 반환 하는 경우', () => {
            const givenObject = {
                test: 'test',
            };
            const result = (0, object_util_1.isContainKeyInObject)(givenObject, 'test');
            expect(result).toBeTruthy();
        });
        it('object 안에 해당 key 값의 데이터가 존재하지 않아 false를 반환하는 경우', () => {
            const givenObject = { testNotihing: true };
            const result = (0, object_util_1.isContainKeyInObject)(givenObject, 'test');
            expect(result).toBeFalsy();
        });
    });
    describe('isNotContainKeyInObject 함수 테스트', () => {
        it('object 안에 해당 key 값의 데이터가 존재하지않아 true를 반환 하는 경우', () => {
            const givenObject = {
                testNotContain: 'test',
            };
            const result = (0, object_util_1.isNotContainKeyInObject)(givenObject, 'test');
            expect(result).toBeTruthy();
        });
        it('object 안에 해당 key 값의 데이터가 존재하여 false를 반환하는 경우', () => {
            const givenObject = { test: true };
            const result = (0, object_util_1.isNotContainKeyInObject)(givenObject, 'test');
            expect(result).toBeFalsy();
        });
    });
});
//# sourceMappingURL=object.util.spec.js.map