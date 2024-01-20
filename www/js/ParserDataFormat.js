"use strict";
/// <amd-module name="scandit-cordova-datacapture-parser.ParserDataFormat"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserDataFormat = void 0;
var ParserDataFormat;
(function (ParserDataFormat) {
    ParserDataFormat["GS1AI"] = "gs1ai";
    ParserDataFormat["HIBC"] = "hibc";
    /**
     * @deprecated ParserDataFormat.DLID
     * Use ID Capture instead.
     */
    ParserDataFormat["DLID"] = "dlid";
    /**
     * @deprecated ParserDataFormat.MRTD
     * Use ID Capture instead.
     */
    ParserDataFormat["MRTD"] = "mrtd";
    ParserDataFormat["SwissQR"] = "swissQr";
    ParserDataFormat["VIN"] = "vin";
    /**
     * @deprecated ParserDataFormat.UsUsid
     * Use ID Capture instead.
     */
    ParserDataFormat["UsUsid"] = "usUsid";
})(ParserDataFormat = exports.ParserDataFormat || (exports.ParserDataFormat = {}));
