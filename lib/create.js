const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const Factory = require("./factory");

module.exports = async function (name, options) {
  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetCwd = path.join(cwd, name);
  // 判断在目录的位置是否存在相同的目录了
  // 如果存在相同的目录
  if (fs.existsSync(targetCwd)) {
    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetCwd);
    } else {
      console.log("是否需要覆盖");
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "Target directory already exists Pick an action:",
          choices: [
            {
              name: "Overwrite",
              value: "overwrite",
            },
            {
              name: "Cancel",
              value: false,
            },
          ],
        },
      ]);

      if (!action) {
        return;
      } else if (action === "overwrite") {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`);
        await fs.remove(targetCwd);
      }
    }
  }

  const factory = new Factory(name, targetCwd);
  // 开始创建项目
  factory.create();
};
