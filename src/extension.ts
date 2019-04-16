// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { codeLensProvider } from "./codeLensProvider";
import * as cache from "./commands/cache";
import { switchDefaultLanguage } from "./commands/language";
import * as plugin from "./commands/plugin";
import * as session from "./commands/session";
import * as show from "./commands/show";
import * as submit from "./commands/submit";
import * as test from "./commands/test";
import { LeetCodeNode } from "./explorer/LeetCodeNode";
import { LeetCodeTreeDataProvider } from "./explorer/LeetCodeTreeDataProvider";
import { leetCodeChannel } from "./leetCodeChannel";
import { leetCodeExecutor } from "./leetCodeExecutor";
import { leetCodeManager } from "./leetCodeManager";
import { leetCodeStatusBarController } from "./statusbar/leetCodeStatusBarController";
import { DialogType, promptForOpenOutputChannel } from "./utils/uiUtils";
import { leetCodePreviewProvider } from "./webview/leetCodePreviewProvider";
import { leetCodeSolutionProvider } from "./webview/leetCodeSolutionProvider";
import { leetCodeSubmissionProvider } from "./webview/leetCodeSubmissionProvider";
import { markdownEngine } from "./webview/markdownEngine";

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    try {
        if (!await leetCodeExecutor.meetRequirements()) {
            throw new Error("The environment doesn't meet requirements.");
        }

        leetCodeManager.on("statusChanged", () => {
            leetCodeStatusBarController.updateStatusBar(leetCodeManager.getStatus(), leetCodeManager.getUser());
            leetCodeTreeDataProvider.refresh();
        });

        const leetCodeTreeDataProvider: LeetCodeTreeDataProvider = new LeetCodeTreeDataProvider(context);

        context.subscriptions.push(
            leetCodeStatusBarController,
            leetCodeChannel,
            leetCodePreviewProvider,
            leetCodeSubmissionProvider,
            leetCodeSolutionProvider,
            leetCodeExecutor,
            markdownEngine,
            vscode.window.createTreeView("leetCodeExplorer", { treeDataProvider: leetCodeTreeDataProvider, showCollapseAll: true }),
            vscode.languages.registerCodeLensProvider({ scheme: "file" }, codeLensProvider),
            vscode.commands.registerCommand("leetcode.deleteCache", () => cache.deleteCache()),
            vscode.commands.registerCommand("leetcode.toggleLeetCodeCn", () => plugin.switchEndpoint()),
            vscode.commands.registerCommand("leetcode.signin", () => leetCodeManager.signIn()),
            vscode.commands.registerCommand("leetcode.signout", () => leetCodeManager.signOut()),
            vscode.commands.registerCommand("leetcode.selectSessions", () => session.selectSession()),
            vscode.commands.registerCommand("leetcode.createSession", () => session.createSession()),
            vscode.commands.registerCommand("leetcode.previewProblem", (node: LeetCodeNode) => leetCodePreviewProvider.show(node)),
            vscode.commands.registerCommand("leetcode.showProblem", (node: LeetCodeNode) => show.showProblem(node)),
            vscode.commands.registerCommand("leetcode.searchProblem", () => show.searchProblem()),
            vscode.commands.registerCommand("leetcode.showSolution", (node: LeetCodeNode) => show.showSolution(node)),
            vscode.commands.registerCommand("leetcode.refreshExplorer", () => leetCodeTreeDataProvider.refresh()),
            vscode.commands.registerCommand("leetcode.testSolution", (uri?: vscode.Uri) => test.testSolution(uri)),
            vscode.commands.registerCommand("leetcode.submitSolution", (uri?: vscode.Uri) => submit.submitSolution(uri)),
            vscode.commands.registerCommand("leetcode.switchDefaultLanguage", () => switchDefaultLanguage()),
        );

        await leetCodeExecutor.switchEndpoint(plugin.getLeetCodeEndpoint());
        leetCodeManager.getLoginStatus();
    } catch (error) {
        leetCodeChannel.appendLine(error.toString());
        promptForOpenOutputChannel("Extension initialization failed. Please open output channel for details.", DialogType.error);
    }
}

export function deactivate(): void {
    // Do nothing.
}
