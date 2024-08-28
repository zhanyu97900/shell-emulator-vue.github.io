export default function ls(cwd, args, utils) {
  const { getAbsolutePath } = utils;
  const { checkDirectory, listDirectoryWithTypes } = utils.fileSystem;

  let isAll = false;
  for (const arg of args) {
    if (arg.startsWith("-") || arg.startsWith("--")) {
      if (arg === "-a") {
        isAll = true;
        continue;
      }
      return `ls: unrecognized option '${arg}'`;
    }
  }
  args = args.filter(arg => !arg.startsWith("-"));
  let error = [], result = [];
  let flag = false; // 是否换行分隔
  if (args.length === 0) {
    args.push(".");
  }
  for (const arg of args) {
    const abosolutePath = getAbsolutePath(cwd, arg);
    if (!checkDirectory(abosolutePath)) {
      error.push(`ls: cannot access '${abosolutePath}': No such file or directory`);
      continue;
    }
    let list = listDirectoryWithTypes(abosolutePath);
    if (flag) {
      result.push("");
    }
    if (args.length > 1) {
      result.push(`${abosolutePath}:`);
    }
    if (isAll) {
      list.unshift(["d", "."], ["d", ".."]);
    } else {
      list = list.filter(([type, name]) => !name.startsWith("."));
    }
    const text = [];
    for (const [type, name] of list) {
      if (type === "f") {
        text.push(name);
      } else {
        text.push(`<b>${name}</b>`);
      }
    }
    result.push(text.join("\t\t"));
    flag = true;
  }
  return error.concat(result).join("\n");
}

export function lsHint(cwd, args, utils) {
  const { directoryHint } = utils;
  const arg = args[args.length - 1];
  if (arg === undefined) {
    return [];
  }
  if (arg === "-") {
    return ["a"];
  }
  return directoryHint(cwd, arg);
}