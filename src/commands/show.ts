// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import * as fse from "fs-extra";
import * as path from "path";
import * as vscode from "vscode";
import { LeetCodeNode } from "../explorer/LeetCodeNode";
import { leetCodeChannel } from "../leetCodeChannel";
import { leetCodeExecutor } from "../leetCodeExecutor";
import { leetCodeManager } from "../leetCodeManager";
import { IProblem, IQuickItemEx, languages, ProblemState } from "../shared";
import { DialogOptions, DialogType, promptForOpenOutputChannel, promptForSignIn } from "../utils/uiUtils";
import { selectWorkspaceFolder } from "../utils/workspaceUtils";
import * as wsl from "../utils/wslUtils";
import * as list from "./list";

export async function showProblem(node?: LeetCodeNode): Promise<void> {
    if (!node) {
        return;
    }
    await showProblemInternal(node);
}

export async function searchProblem(): Promise<void> {
    if (!leetCodeManager.getUser()) {
        promptForSignIn();
        return;
    }
    const choice: IQuickItemEx<IProblem> | undefined = await vscode.window.showQuickPick(
        parseProblemsToPicks(list.listProblems()),
        {
            matchOnDetail: true,
            placeHolder: "Select one problem",
        },
    );
    if (!choice) {
        return;
    }
    await showProblemInternal(choice.value);
}

async function showProblemInternal(node: IProblem): Promise<void> {
    try {
        const leetCodeConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("leetcode");
        let defaultLanguage: string | undefined = leetCodeConfig.get<string>("defaultLanguage");
        if (defaultLanguage && languages.indexOf(defaultLanguage) < 0) {
            defaultLanguage = undefined;
        }
        const language: string | undefined = defaultLanguage || await vscode.window.showQuickPick(languages, { placeHolder: "Select the language you want to use" });
        if (!language) {
            return;
        }

        let outDir: string = await selectWorkspaceFolder();
        let relativePath: string = (leetCodeConfig.get<string>("outputFolder") || "").trim();
        const matchResult: RegExpMatchArray | null = relativePath.match(/\$\{(.*?)\}/);
        if (matchResult) {
            const resolvedPath: string | undefined = await resolveRelativePath(matchResult[1].toLocaleLowerCase(), node, language);
            if (!resolvedPath) {
                leetCodeChannel.appendLine("Showing problem canceled by user.");
                return;
            }
            relativePath = resolvedPath;
        }

        outDir = path.join(outDir, relativePath);
        await fse.ensureDir(outDir);

        const originFilePath: string = await leetCodeExecutor.showProblem(node, language, outDir);
        const filePath: string = wsl.useWsl() ? await wsl.toWinPath(originFilePath) : originFilePath;
        await vscode.window.showTextDocument(vscode.Uri.file(filePath), { preview: false });

        if (!defaultLanguage && leetCodeConfig.get<boolean>("showSetDefaultLanguageHint")) {
            const choice: vscode.MessageItem | undefined = await vscode.window.showInformationMessage(
                `Would you like to set '${language}' as your default language?`,
                DialogOptions.yes,
                DialogOptions.no,
                DialogOptions.never,
            );
            if (choice === DialogOptions.yes) {
                leetCodeConfig.update("defaultLanguage", language, true /* UserSetting */);
            } else if (choice === DialogOptions.never) {
                leetCodeConfig.update("showSetDefaultLanguageHint", false, true /* UserSetting */);
            }
        }
    } catch (error) {
        await promptForOpenOutputChannel("Failed to show the problem. Please open the output channel for details.", DialogType.error);
    }
}

async function parseProblemsToPicks(p: Promise<IProblem[]>): Promise<Array<IQuickItemEx<IProblem>>> {
    return new Promise(async (resolve: (res: Array<IQuickItemEx<IProblem>>) => void): Promise<void> => {
        const picks: Array<IQuickItemEx<IProblem>> = (await p).map((problem: IProblem) => Object.assign({}, {
            label: `${parseProblemDecorator(problem.state, problem.locked)}${problem.id}.${problem.name}`,
            description: "",
            detail: `AC rate: ${problem.passRate}, Difficulty: ${problem.difficulty}`,
            value: problem,
        }));
        resolve(picks);
    });
}

function parseProblemDecorator(state: ProblemState, locked: boolean): string {
    switch (state) {
        case ProblemState.AC:
            return "$(check) ";
        case ProblemState.NotAC:
            return "$(x) ";
        default:
            return locked ? "$(lock) " : "";
    }
}

async function resolveRelativePath(value: string, node: IProblem, selectedLanguage: string): Promise<string | undefined> {
    switch (value) {
        case "tag":
            if (node.tags.length === 1) {
                return node.tags[0];
            }
            return await vscode.window.showQuickPick(
                node.tags,
                {
                    matchOnDetail: true,
                    placeHolder: "Multiple tags available, please select one",
                    ignoreFocusOut: true,
                },
            );
        case "language":
            return selectedLanguage;
        case "difficulty":
            return node.difficulty;
        default:
            const errorMsg: string = `The config '${value}' is not supported.`;
            leetCodeChannel.appendLine(errorMsg);
            throw new Error(errorMsg);
    }
}
