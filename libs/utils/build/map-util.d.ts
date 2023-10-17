export declare const listToMap: <T, U>(array: T[], keyFunc: (value: T) => U) => Map<U, T>;
export declare const listToMapAddValue: <T, U, Y>(array: T[], keyFunc: (value: T) => U, addValue: Y) => Map<U, T & Y>;
