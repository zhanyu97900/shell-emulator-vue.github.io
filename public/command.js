// 1. 首先在cmd目录下创建你的命令，实现命令函数，可选实现提示函数。

// 2. 然后在这里import导入你的命令函数以及可选的提示函数。
import debug from "./cmd/debug.js";
import echo from "./cmd/echo.js";
import help from "./cmd/help.js";
import pwd from "./cmd/pwd.js";
import reboot from "./cmd/reboot.js";
import shutdown from "./cmd/shutdown.js";
import uname, { unameHint } from "./cmd/uname.js";
import uptime from "./cmd/uptime.js";

// 3. 最后将你的命令函数和可选的提示函数注册到列表中。
window.externalCommand = [
  { name: "debug", func: debug },
  { name: "echo", func: echo },
  { name: "help", func: help },
  { name: "pwd", func: pwd },
  { name: "reboot", func: reboot },
  { name: "shutdown", func: shutdown },
  { name: "uname", func: uname, hint: unameHint },
  { name: "uptime", func: uptime },
]