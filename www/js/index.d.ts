declare module Scandit {

type ParsedDataJSON = [ParsedFieldJSON];
interface PrivateParsedData {
    fromJSON(json: ParsedDataJSON): ParsedData;
}
export class ParsedData {
    private _jsonString;
    get jsonString(): string;
    private _fields;
    get fields(): ParsedField[];
    private _fieldsByName;
    get fieldsByName(): {
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
    get name(): string;
    private _parsed;
    get parsed(): any;
    private _rawString;
    get rawString(): string;
    private _issues;
    get issues(): string[];
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
    get id(): string;
    private _context;
    private isInitialized;
    private waitingForInitialization;
    private _proxy;
    private get proxy();
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
    /**
     * @deprecated ParserDataFormat.DLID
     * Use ID Capture instead.
     */
    DLID = "dlid",
    /**
     * @deprecated ParserDataFormat.MRTD
     * Use ID Capture instead.
     */
    MRTD = "mrtd",
    SwissQR = "swissQr",
    VIN = "vin",
    /**
     * @deprecated ParserDataFormat.UsUsid
     * Use ID Capture instead.
     */
    UsUsid = "usUsid"
}

}
