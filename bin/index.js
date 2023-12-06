#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序 Node CLI 应用入口文件必须要有这样的文件头

const program = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
program
  // 定义命令和参数
  .command("create <app-name>")
  .description("create a new project")
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, options) => {
    // 打印执行结果
    require("../lib/create.js")(name, options);
  });

program
  // 配置版本号信息
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option]");

program
  // 监听 --help 执行
  .on("--help", () => {
    console.log(
      "\r\n" +
        figlet.textSync("YangDan", {
          font: "Ghost",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 100,
          whitespaceBreak: true,
        })
    );
    // 新增说明信息
    console.log(
      `\r\nRun ${chalk.cyan(
        `yd <command> --help`
      )} for detailed usage of given command\r\n`
    );
  });

// 解析用户执行命令传入参数
program.parse(process.argv);
