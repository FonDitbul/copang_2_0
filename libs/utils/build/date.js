"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBiggerLeftDate = void 0;
const date_fns_1 = require("date-fns");
function isBiggerLeftDate(left, right) {
    return (0, date_fns_1.compareAsc)(left, right) > 0;
}
exports.isBiggerLeftDate = isBiggerLeftDate;
//# sourceMappingURL=date.js.map