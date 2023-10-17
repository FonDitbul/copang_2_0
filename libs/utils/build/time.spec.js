"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_1 = require("./time");
describe('time util test', () => {
    describe('setDateWithTimeZone 테스트 ', function () {
        it('date 에 timeZone이 적용된 date가 return 된 경우', () => {
            const givenDate = new Date('2023-09-01T09:00:00.000Z');
            const result = (0, time_1.setDateWithTimeZone)(givenDate);
            expect(result).toEqual(new Date('2023-09-01T18:00:00.000Z'));
        });
    });
    describe('dateToString 테스트 ', function () {
        it('date가 string으로 변환된 경우', () => {
            const givenDate = new Date('2023-09-01T00:00:00.000Z');
            const result = (0, time_1.dateToString)(givenDate);
            expect(result).toEqual('2023-09-01T00:00:00.000Z');
        });
    });
    describe('stringToDate 테스트 ', function () {
        it('string이 Date로 변환된 경우', () => {
            const givenDate = '2023-09-01T00:00:00.000Z';
            const result = (0, time_1.stringToDate)(givenDate);
            expect(result instanceof Date).toBeTruthy();
        });
    });
});
//# sourceMappingURL=time.spec.js.map