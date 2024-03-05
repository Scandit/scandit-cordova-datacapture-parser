/// <amd-module name="scandit-cordova-datacapture-parser.Cordova" />
export declare const Cordova: {
    pluginName: string;
    exec: (success: Function | null, error: Function | null, functionName: string, args: [any] | null) => void;
};
export declare enum CordovaFunction {
    ParseString = "parseString",
    ParseRawData = "parseRawData"
}
