const runner = require("child_process");
const path = require("path");

const prog = {
  list: "ls",
  node: "node",
};

// List the scripts
// const child_pro = runner.spawn(prog.list, { cwd: "./node/child_process" });
// child_pro.stdout.on("data", (data) => {
//   console.log(`data:\n${data}`);
// });

// run php scripts
var phpScriptPath = "./scripts/php.php";
var argsString = "value1,value2,value3";
runner.exec("php " + phpScriptPath + " " + argsString, function (
  err,
  phpResponse,
  stderr
) {
  if (err) console.log(err);
  console.log(phpResponse);
});

// run javascripts
const cp = runner.spawn(prog.node, ["./scripts/app.js"]);
cp.stdout.on("data", (data) => console.log(`${data}`));

//run c++ script
const compiler = "g++",
  version = "-std=c++11",
  out = "-o",
  infile = "./scripts/hello.cpp",
  outfile = "./scripts/hello.out",
  name = "C++";

const child = runner.execFile(
  compiler,
  [version, out, outfile, infile],
  (error, out, err) => {
    if (error) throw error;
    else {
      const executable = `./${outfile}`;
      const execute = runner.execFile(executable, [name], (error, out, err) => {
        if (error) throw error;
        else console.log(out);
      });
    }
  }
);

//Run python script
function runScript() {
  return runner.spawn("python", [
    "-u",
    path.join(__dirname, "./scripts/s.py"),
    "--foo",
    "some value for foo",
  ]);
}
const subprocess = runScript();
// print output of script
subprocess.stdout.on("data", (data) => console.log(`data:${data}`));
