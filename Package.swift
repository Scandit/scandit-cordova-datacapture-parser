// swift-tools-version: 5.9
// Copyright (c) 2026 Scandit AG. All rights reserved.

import Foundation
import PackageDescription

// Find the shared/ios frameworks directory from the package directory path.
func findSharedFrameworksPath() -> String? {
    let packageDir = Context.packageDirectory

    if let range = packageDir.range(of: "/frameworks/cordova/") {
        return String(packageDir[..<range.lowerBound]) + "/frameworks/shared/ios"
    }

    let base = (packageDir as NSString).deletingLastPathComponent
    let candidatePath = (base as NSString).appendingPathComponent("shared/ios")
    if FileManager.default.fileExists(atPath: candidatePath) {
        return candidatePath
    }

    return nil
}

// Read version from package.json
func getVersion() -> String {
    let packageJSONPath = Context.packageDirectory + "/package.json"
    guard let data = try? Data(contentsOf: URL(fileURLWithPath: packageJSONPath)),
        let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
        let version = json["version"] as? String
    else {
        fatalError("Could not read version from package.json at \(packageJSONPath)")
    }
    return version
}

let version = getVersion()

var dependencies: [Package.Dependency] = [
    .package(url: "https://github.com/apache/cordova-ios.git", from: "8.0.0"),
    .package(path: "../scandit-cordova-datacapture-core"),
]

let parserFrameworksPath = findSharedFrameworksPath().map {
    "\($0)/scandit-datacapture-frameworks-parser"
}

if let localPath = parserFrameworksPath {
    dependencies.append(.package(path: localPath))
} else {
    dependencies.append(
        .package(
            url: "https://github.com/Scandit/scandit-datacapture-frameworks-parser.git",
            exact: Version(stringLiteral: version)
        )
    )
}

let package = Package(
    name: "scandit-cordova-datacapture-parser",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "scandit-cordova-datacapture-parser",
            targets: ["ScanditCordovaDatacaptureParser"]
        )
    ],
    dependencies: dependencies,
    targets: [
        .target(
            name: "ScanditCordovaDatacaptureParser",
            dependencies: [
                .product(name: "Cordova", package: "cordova-ios"),
                .product(name: "ScanditFrameworksParser", package: "scandit-datacapture-frameworks-parser"),
                .product(name: "scandit-cordova-datacapture-core", package: "scandit-cordova-datacapture-core"),
            ],
            path: "src/ios"
        )
    ]
)
