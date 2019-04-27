# LeetCode

> 在 VS Code 中练习 LeetCode

<p align="center">
  <img src="https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/resources/LeetCode.png" alt="">
</p>
<p align="center">
  <a href="https://travis-ci.org/jdneo/vscode-leetcode">
    <img src="https://img.shields.io/travis/jdneo/vscode-leetcode.svg?style=flat-square" alt="">
  </a>
  <a href="https://gitter.im/vscode-leetcode/Lobby">
    <img src="https://img.shields.io/gitter/room/jdneo/vscode-leetcode.svg?style=flat-square" alt="">
  </a>
  <a href="https://marketplace.visualstudio.com/items?itemName=shengchen.vscode-leetcode">
    <img src="https://img.shields.io/visual-studio-marketplace/d/shengchen.vscode-leetcode.svg?style=flat-square" alt="">
  </a>
  <a href="https://github.com/jdneo/vscode-leetcode/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/jdneo/vscode-leetcode.svg?style=flat-square" alt="">
  </a>
</p>

## 赞助
[![coding](https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/docs/imgs/sponsor_coding.png)](https://coding.net/?utm_source=leetcode)

- [English Document](#Requirements)
- [中文文档](https://github.com/jdneo/vscode-leetcode/blob/master/docs/README_zh-CN.md)

## 运行条件
- [VS Code 1.23.0+](https://code.visualstudio.com/)
- [Node.js 8+](https://nodejs.org)
    > 注意：请确保`Node`在`PATH`环境变量中。您也可以通过设定 `leetcode.nodePath` 选项来指定 `Node.js` 可执行文件的路径。

## 快速开始

![demo](https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/docs/gifs/demo.gif)

## 功能

### 登入登出
<p align="center">
  <img src="https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/docs/imgs/sign_in.png" alt="登入登出" />
</p>

- 点击 `LeetCode Explorer` 中的 `Sign in to LeetCode` 即可登入。

- 你也可以使用下来命令登入或登出:
  - **LeetCode: Sign in**
  - **LeetCode: Sign out**

---

### 切换 LeetCode 版本
<p align="center">
  <img src="https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/docs/imgs/endpoint.png" alt="切换 LeetCode 版本" />
</p>

- LeetCode 目前有**英文版**和**中文版**两种版本。点击 `LeetCode Explorer` 导航栏中的 ![btn_endpoint](https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/docs/imgs/btn_endpoint.png) 按钮可切换版本。

- 目前可切换的版本有:
  - **leetcode.com**
  - **leetcode-cn.com**

  > 注意：两种版本的 LeetCode 账户并**不通用**，请确保当前激活的版本是正确的。插件默认激活的是**英文版**。

---

### 选择题目
<p align="center">
  <img src="https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/docs/imgs/pick_problem.png" alt="选择题目" />
</p>

- 直接点击题目或者在 `LeetCode Explorer` 中**右键**题目并选择 `Preview Problem` 可查看题目描述
- 选择 `Show Problem` 可直接进行答题。

  > 注意：若当前 VS Code 没有已打开的文件夹，则生成的题目文件会存储于 **$HOME/.leetcode/** 目录下。

  > 注意：你可以通过更新配置项 `leetcode.showCommentDescription` 来指定是否要在注释中包含题目描述。

  > 注意：你可以通过 `LeetCode: Switch Default Language` 命令变更答题时默认使用编程语言。

---

### 查看高票解答
<p align="center">
  <img src="https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/docs/imgs/solution.png" alt="高票解答" />
</p>

- 选择 `Show Top Voted Solution` 可查看该题目在讨论区内的高票解答。

---

### 提交答案
<p align="center">
  <img src="https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/docs/imgs/submit.png" alt="提交答案" />
</p>

- 通过点击文件最下方的 `Submit` 可提交答案。 你也可以在编辑区内右键并选择 `Submit to LeetCode`，将**当前**文件提交。

> 如果你不希望在编辑器中显示**测试**和**提交**的快捷方式，可以将配置项 `leetcode.enableShortcuts` 设置为 `false`。

---

### 测试答案
<p align="center">
  <img src="https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/docs/imgs/test.png" alt="测试答案" />
</p>

- 通过点击文件最下方的 `Test` 可测试答案。你也可以在编辑区内右键并选择 `Test in LeetCode`，对**当前**文件进行测试。

- 有下列三种测试集来源：
  - **默认测试集**：Test with the default cases
  - **在输入框内输入测试集**：Write test cases in input box
  - **提供自定义测试集文件**：Test with the written cases in file

---

### 通过关键字搜索题目
<p align="center">
  <img src="https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/docs/imgs/search.png" alt="通过关键字搜索题目" />
</p>

- 点击 `LeetCode Explorer` 导航栏中的 ![btn_search](https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/docs/imgs/btn_search.png) 按钮可按照关键字搜索题目。

---

### 管理存档
<p align="center">
  <img src="https://raw.githubusercontent.com/jdneo/vscode-leetcode/master/docs/imgs/session.png" alt="管理存档" />
</p>

- 点击位于 VS Code 底部状态栏的 `LeetCode: ***` 管理 `LeetCode 存档`。你可以**切换**存档或者**创建**新的存档。


## 插件配置项
| 配置项名称                 | 描述                                                                                                                                                                                                                                | 默认值     |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `leetcode.hideSolved`      | 指定是否要隐藏已解决的问题                                                                                                                                                                                                          | `false`    |
| `leetcode.showLocked`      | 指定是否显示付费题目，只有付费账户才可以打开付费题目                                                                                                                                                                                | `false`    |
| `leetcode.defaultLanguage` | 指定答题时使用的默认语言，可选语言有：`bash`, `c`, `cpp`, `csharp`, `golang`, `java`, `javascript`, `kotlin`, `mysql`, `php`, `python`,`python3`,`ruby`, `rust`, `scala`,`swift`                                                    | `N/A`      |
| `leetcode.useWsl`          | 指定是否启用 WSL                                                                                                                                                                                                                    | `false`    |
| `leetcode.endpoint`        | 指定使用的终端，可用终端有：`leetcode`, `leetcode-cn`                                                                                                                                                                               | `leetcode` |
| `leetcode.outputFolder`    | 指定保存文件时所用的相对文件夹路径。除了用户自定义路径外，也可以使用保留项，包括：<ul><li>`${tag}`: 根据题目的类别进行分类。<li>`${language}`: 根据题目的语言进行分类。</li><li>`${difficulty}`: 根据题目的难度进行分类。</li></ul> | N/A        |
| `leetcode.enableStatusBar` | 指定是否在 VS Code 下方显示插件状态栏。                                                                                                                                                                                             | `true`     |
| `leetcode.enableShortcuts` | 指定是否在 VS Code 编辑文件下方显示提交和测试的快捷按钮。                                                                                                                                                                           | `true`     |
| `leetcode.enableSideMode`  | 指定在解决一道题时，是否将`问题预览`、`高票答案`与`提交结果`窗口集中在编辑器的第二栏。                                                                                                                                              | `true`     |
| `leetcode.nodePath`        | 指定 `Node.js` 可执行文件的路径。                                                                                                                                                                                                   | `node`     |

## 需要帮助？
在遇到任何问题时，可以先查看一下[疑难解答](https://github.com/jdneo/vscode-leetcode/wiki/%E7%96%91%E9%9A%BE%E8%A7%A3%E7%AD%94)以及[常见问题](https://github.com/jdneo/vscode-leetcode/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)寻求帮助。

如果您的问题依然没有解决，可以在 [Gitter Channel](https://gitter.im/vscode-leetcode/Lobby) 联系我们，或者您也可以[记录一个新的 issue](https://github.com/jdneo/vscode-leetcode/issues/new/choose)。

## 更新日志

请参考[更新日志](https://github.com/jdneo/vscode-leetcode/blob/master/CHANGELOG.md)

## 鸣谢

- 本插件基于[@skygragon](https://github.com/skygragon)的[leetcode-cli](https://github.com/skygragon/leetcode-cli)开源项目制作。
- 特别鸣谢这些[贡献者们](https://github.com/jdneo/vscode-leetcode/blob/master/ACKNOWLEDGEMENTS.md)。
