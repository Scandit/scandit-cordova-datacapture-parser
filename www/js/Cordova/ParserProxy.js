"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserProxy = void 0;
/// <amd-module name="scandit-cordova-datacapture-parser.ParserProxy"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const ParsedData_1 = require("scandit-cordova-datacapture-parser.ParsedData");
const Cordova_1 = require("scandit-cordova-datacapture-parser.Cordova");
class ParserProxy {
    static forParser(parser) {
        const proxy = new ParserProxy();
        proxy.parser = parser;
        return proxy;
    }
    parseString(data) {
        return new Promise((resolve, reject) => this.parser.waitForInitialization().then(() => ParserProxy.cordovaExec((parsedData) => resolve(ParsedData_1.ParsedData.fromJSON(JSON.parse(parsedData))), reject, Cordova_1.CordovaFunction.ParseString, [{
                id: this.parser.id,
                data,
            }])));
    }
    parseRawData(data) {
        return new Promise((resolve, reject) => this.parser.waitForInitialization().then(() => ParserProxy.cordovaExec((parsedData) => resolve(ParsedData_1.ParsedData.fromJSON(JSON.parse(parsedData))), reject, Cordova_1.CordovaFunction.ParseRawData, [{
                id: this.parser.id,
                data,
            }])));
    }
}
exports.ParserProxy = ParserProxy;
ParserProxy.cordovaExec = Cordova_1.Cordova.exec;
