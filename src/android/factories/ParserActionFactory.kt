/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2020- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.parser.factories

import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.errors.InvalidActionNameError
import com.scandit.datacapture.cordova.core.factories.ActionFactory
import com.scandit.datacapture.cordova.parser.actions.ActionInjectDefaults
import com.scandit.datacapture.cordova.parser.actions.ActionParseRawData
import com.scandit.datacapture.cordova.parser.actions.ActionParseString
import com.scandit.datacapture.cordova.parser.actions.ActionParserInstanceHandler
import com.scandit.datacapture.frameworks.parser.ParserModule

class ParserActionFactory(
    private val parserModule: ParserModule,
) : ActionFactory {

    @Throws(InvalidActionNameError::class)
    override fun provideAction(actionName: String): Action {
        return when (actionName) {
            INJECT_DEFAULTS -> createActionInjectDefaults()
            PARSE_STRING -> createActionParseString()
            PARSE_RAW_DATA -> createActionParseRawData()
            ActionParserInstanceHandler.ACTION_DISPOSE_INSTANCE,
            ActionParserInstanceHandler.ACTION_CREATE_UPDATE_INSTANCE ->
                createActionParserInstanceHandler(actionName)

            else -> throw InvalidActionNameError(actionName)
        }
    }

    override fun canBeRunWithoutCameraPermission(actionName: String): Boolean =
        actionName !in ACTIONS_REQUIRING_CAMERA

    private fun createActionInjectDefaults(): Action = ActionInjectDefaults()

    private fun createActionParseString(): Action = ActionParseString(parserModule)

    private fun createActionParseRawData(): Action = ActionParseRawData(parserModule)

    private fun createActionParserInstanceHandler(actionName: String): Action =
        ActionParserInstanceHandler(parserModule, actionName)

    companion object {
        private const val INJECT_DEFAULTS = "getDefaults"
        private const val PARSE_STRING = "parseString"
        private const val PARSE_RAW_DATA = "parseRawData"

        private val ACTIONS_REQUIRING_CAMERA =
            setOf(
                ActionParserInstanceHandler.ACTION_CREATE_UPDATE_INSTANCE
            )
    }
}
