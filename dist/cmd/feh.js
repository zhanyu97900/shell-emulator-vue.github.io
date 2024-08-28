export default function feh(cwd,args,utils){
	const { getAbsolutePath } = utils;
  const { checkDirectory, checkFile, getFileContent } = utils.fileSystem;
	for (const arg in args){
	if  (arg.startsWith("-") || arg.startsWith("--")){
	return `ls: unrecognized option '${arg}'`
	
	}	
	}
	const result = []
	if (args.length === 0) {
    return "请传入图片文件"
	}
	for (const arg of args) {
    const abosolutePath = getAbsolutePath(cwd, arg);
    if (checkDirectory(abosolutePath)) {
      result.push(`feh: ${abosolutePath}: Is a directory`);
      continue;
    }
    if (!checkFile(abosolutePath)) {
      result.push(`feh: ${arg}: No such file or directory`);
      continue;
    }
    const file = getFileContent(abosolutePath);
    const img = "<img src= " +file+ "style='width: 560px;object-fit: contain;'>" 
    result.push(img);
  }
  return result.join("\n");


}


export function fehHint(cwd,args,utils){
  const { directoryHint } = utils;
  const arg = args[args.length - 1];
  if (arg === undefined) {
    return [];
  }
  if (arg.startsWith("-")) {
    return [];
  }
  return directoryHint(cwd, arg);


}
