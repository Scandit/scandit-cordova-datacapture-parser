import ScanditFrameworksCore
import ScanditFrameworksParser
import ScanditParser

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

    @objc(executeParser:)
    func executeParser(_ command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(
                .failure(with: "Invalid argument received in executeParser"),
                callbackId: command.callbackId
            )
            return
        }

        let coreModuleName = String(describing: CoreModule.self)
        guard let coreModule = DefaultServiceLocator.shared.resolve(clazzName: coreModuleName) as? CoreModule else {
            commandDelegate.send(
                .failure(with: "Unable to retrieve the CoreModule from the locator."),
                callbackId: command.callbackId
            )
            return
        }

        let result = CordovaResult(commandDelegate, emitter: emitter, command: command)
        let handled = coreModule.execute(
            CordovaMethodCall(command: command),
            result: result,
            module: self.parserModule
        )

        if !handled {
            let methodName = argsJson["methodName"] as? String ?? "unknown"
            commandDelegate.send(.failure(with: "Unknown Core method: \(methodName)"), callbackId: command.callbackId)
        }
    }
}
