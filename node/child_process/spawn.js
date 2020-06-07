const { spawn } = require("child_process");

const prog = {
  list: "ls",
  copy: "cp",
  folder: "mkdir",
  node: "node",
};

// const child = spawn(prog.list, { cwd: "../../Navigations" });
// child.stdout.on("data", (data) => {
//   console.log(`data:\n${data}`);
// });

function name(params) {
  const reg = /[.py]$/.test(params);
  console.log(reg);
  if (reg) {
    console.log("Not my type");
  } else {
    handleJS("s.py");
  }
}
name("app.js");

function handleJS(params) {
  const cp = spawn(prog.node, [params]);
  cp.stdout.on("data", function (data) {
    console.log(`STDOUT: ${data.toString()}`);
  });
  cp.on("close", () => {
    console.log("Child Process has ended");
    process.exit();
  });

  setTimeout(() => {
    cd.stdin.write("stop");
  }, 4000);
}
