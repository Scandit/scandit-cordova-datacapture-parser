"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsedField = void 0;
class ParsedField {
    get name() {
        return this._name;
    }
    get parsed() {
        return this._parsed;
    }
    get rawString() {
        return this._rawString;
    }
    get issues() {
        return this._issues;
    }
    static fromJSON(json) {
        const field = new ParsedField();
        field._name = json.name;
        field._parsed = json.parsed;
        field._rawString = json.rawString;
        field._issues = json.issues || [];
        return field;
    }
}
exports.ParsedField = ParsedField;
