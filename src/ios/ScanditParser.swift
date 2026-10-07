import ScanditFrameworksCore
import ScanditFrameworksParser
import ScanditParser

struct ParserCommandArgument: CommandJSONArgument {
    let id: String
    let data: String
}

@objc(ScanditParser)
public class ScanditParser: CDVPlugin {
    var parserModule: ParserModule!
    var emitter: CordovaEventEmitter!

    override public func pluginInitialize() {
        super.pluginInitialize()
        parserModule = ParserModule()
        emitter = CordovaEventEmitter(commandDelegate: commandDelegate)

        parserModule.didStart()
    }

    public override func dispose() {
        parserModule.didStop()
        super.dispose()
    }

    @objc(getDefaults:)
    func getDefaults(command: CDVInvokedUrlCommand) {
        commandDelegate.send(.success(message: [:]), callbackId: command.callbackId)
    }

    @objc(parseString:)
    func parseString(command: CDVInvokedUrlCommand) {
        guard let args = command.defaultArgumentAsDictionary,
            let parserId = args["parserId"] as? String,
            let data = args["data"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        parserModule.parse(
            string: data,
            id: parserId,
            result: CordovaResult(commandDelegate, command.callbackId)
        )
    }

    @objc(parseRawData:)
    func parseRawData(command: CDVInvokedUrlCommand) {
        guard let args = command.defaultArgumentAsDictionary,
            let parserId = args["parserId"] as? String,
            let data = args["data"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        parserModule.parse(
            data: data,
            id: parserId,
            result: CordovaResult(commandDelegate, command.callbackId)
        )
    }

    @objc(createUpdateNativeInstance:)
    func createUpdateNativeInstance(command: CDVInvokedUrlCommand) {
        guard let args = command.defaultArgumentAsDictionary,
            let parserJson = args["parserJson"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        parserModule.createOrUpdateParser(
            parserJson: parserJson,
            result: CordovaResult(commandDelegate, command.callbackId)
        )
    }

    @objc(disposeParser:)
    func disposeParser(command: CDVInvokedUrlCommand) {
        guard let args = command.defaultArgumentAsDictionary,
            let parserId = args["parserId"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        parserModule.disposeParser(
            parserId: parserId,
            result: CordovaResult(commandDelegate, command.callbackId)
        )
    }
}
