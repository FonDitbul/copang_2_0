"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToString = exports.setDateWithTimeZone = exports.stringToDate = void 0;
const stringToDate = (date) => {
    return new Date(date);
};
exports.stringToDate = stringToDate;
const setDateWithTimeZone = (date) => {
    const tempDate = new Date();
    const timezone = tempDate.getTimezoneOffset();
    const resultDate = new Date(date.getTime() - timezone * 60 * 100 * 10);
    return resultDate;
};
exports.setDateWithTimeZone = setDateWithTimeZone;
const dateToString = (date) => {
    return date.toISOString();
};
exports.dateToString = dateToString;
//# sourceMappingURL=time.js.map