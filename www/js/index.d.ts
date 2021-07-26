declare module Scandit {

 type ParsedDataJSON = [ParsedFieldJSON];
interface PrivateParsedData {
    fromJSON(json: ParsedDataJSON): ParsedData;
}
export class ParsedData {
    private _jsonString;
    readonly jsonString: string;
    private _fields;
    readonly fields: ParsedField[];
    private _fieldsByName;
    readonly fieldsByName: {
        [key: string]: ParsedField;
    };
    private static fromJSON;
}


export interface ParsedFieldJSON {
    name: string;
    parsed: any;
    rawString: string;
    issues?: string[];
}
interface PrivateParsedField {
    fromJSON(json: ParsedFieldJSON): ParsedField;
}
export class ParsedField {
    private _name;
    readonly name: string;
    private _parsed;
    readonly parsed: any;
    private _rawString;
    readonly rawString: string;
    private _issues;
    readonly issues: string[];
    private static fromJSON;
}


interface PrivateParser extends PrivateDataCaptureComponent {
    dataFormat: ParserDataFormat;
    options: {
        [key: string]: any;
    };
    proxy: ParserProxy;
    isInitialized: boolean;
    waitingForInitialization: [() => void];
    waitForInitialization: Promise<void>;
}
export class Parser implements DataCaptureComponent {
    private type;
    private dataFormat;
    private options;
    private _id;
    readonly id: string;
    private _context;
    private isInitialized;
    private waitingForInitialization;
    private _proxy;
    private readonly proxy;
    static forContextAndFormat(context: DataCaptureContext, dataFormat: ParserDataFormat): Promise<Parser>;
    private constructor();
    setOptions(options: {
        [key: string]: any;
    }): Promise<void>;
    parseString(data: string): Promise<ParsedData>;
    parseRawData(data: string): Promise<ParsedData>;
    private waitForInitialization;
}


export enum ParserDataFormat {
    GS1AI = "gs1ai",
    HIBC = "hibc",
    DLID = "dlid",
    MRTD = "mrtd",
    SwissQR = "swissQr",
    VIN = "vin",
    UsUsid = "usUsid"
}

}
