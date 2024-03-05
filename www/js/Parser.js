"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const Serializeable_1 = require("scandit-cordova-datacapture-core.Serializeable");
const ParserProxy_1 = require("scandit-cordova-datacapture-parser.ParserProxy");
class Parser extends Serializeable_1.DefaultSerializeable {
    get id() {
        return this._id;
    }
    get proxy() {
        if (!this._proxy) {
            this._proxy = ParserProxy_1.ParserProxy.forParser(this);
        }
        return this._proxy;
    }
    static forContextAndFormat(context, dataFormat) {
        const parser = new Parser();
        parser.dataFormat = dataFormat;
        return context.addComponent(parser)
            .then(() => {
            parser.isInitialized = true;
            parser.waitingForInitialization.forEach(f => f());
            return parser;
        });
    }
    constructor() {
        super();
        this.type = 'parser';
        this.options = {};
        this._id = `${Date.now()}`;
        this.isInitialized = false;
        this.waitingForInitialization = [];
    }
    setOptions(options) {
        this.options = options;
        return this._context.update();
    }
    parseString(data) {
        return this.proxy.parseString(data);
    }
    parseRawData(data) {
        return this.proxy.parseRawData(data);
    }
    waitForInitialization() {
        if (this.isInitialized) {
            return Promise.resolve();
        }
        else {
            return new Promise(resolve => this.waitingForInitialization.push(resolve));
        }
    }
}
__decorate([
    (0, Serializeable_1.nameForSerialization)('id')
], Parser.prototype, "_id", void 0);
__decorate([
    Serializeable_1.ignoreFromSerialization
], Parser.prototype, "_context", void 0);
__decorate([
    Serializeable_1.ignoreFromSerialization
], Parser.prototype, "isInitialized", void 0);
__decorate([
    Serializeable_1.ignoreFromSerialization
], Parser.prototype, "waitingForInitialization", void 0);
__decorate([
    Serializeable_1.ignoreFromSerialization
], Parser.prototype, "_proxy", void 0);
exports.Parser = Parser;
