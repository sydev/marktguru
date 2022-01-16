"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { search } = require('../src/index');
test('search for `Cola`', () => __awaiter(void 0, void 0, void 0, function* () {
    const offers = yield search('Cola');
    expect(offers).toBeInstanceOf(Array);
    for (let i = 0; i < offers.length; i += 1) {
        const offer = offers[i];
        expect(offer).toHaveProperty('price');
    }
}));
test('search for `Cola Light`', () => __awaiter(void 0, void 0, void 0, function* () {
    const offers = yield search('Cola Light');
    expect(offers).toBeInstanceOf(Array);
    for (let i = 0; i < offers.length; i += 1) {
        const offer = offers[i];
        expect(offer).toHaveProperty('price');
    }
}));
