"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <amd-module name="scandit-cordova-datacapture-parser.Cordova"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const CommonCordova_1 = require("scandit-cordova-datacapture-core.CommonCordova");
// tslint:disable-next-line:variable-name
exports.Cordova = {
    pluginName: 'ScanditParser',
    exec: (success, error, functionName, args) => CommonCordova_1.cordovaExec(success, error, exports.Cordova.pluginName, functionName, args),
};
const getDefaults = new Promise((resolve, reject) => {
    exports.Cordova.exec(resolve, reject, 'getDefaults', null);
});
CommonCordova_1.initializePlugin(exports.Cordova.pluginName, getDefaults);
var CordovaFunction;
(function (CordovaFunction) {
    CordovaFunction["ParseString"] = "parseString";
    CordovaFunction["ParseRawData"] = "parseRawData";
})(CordovaFunction = exports.CordovaFunction || (exports.CordovaFunction = {}));
