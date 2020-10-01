"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <amd-module name="scandit-cordova-datacapture-parser.ParsedData"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const ParsedField_1 = require("scandit-cordova-datacapture-parser.ParsedField");
class ParsedData {
    get jsonString() {
        return this._jsonString;
    }
    get fields() {
        return this._fields;
    }
    get fieldsByName() {
        return this._fieldsByName;
    }
    static fromJSON(json) {
        const data = new ParsedData();
        data._jsonString = JSON.stringify(json);
        data._fields = json.map(ParsedField_1.ParsedField.fromJSON);
        data._fieldsByName = data._fields.reduce((fieldsByName, field) => {
            fieldsByName[field.name] = field;
            return fieldsByName;
        }, {});
        return data;
    }
}
exports.ParsedData = ParsedData;
