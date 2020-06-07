const runner = require("child_process");
const path = require("path");

console.log(process.argv);

// run php scripts
var phpScriptPath = "./files-php/php.php";
var argsString = "value1,value2,value3";
runner.exec("php " + phpScriptPath + " " + argsString, function (
  err,
  phpResponse,
  stderr
) {
  if (err) console.log(err); /* log error */
  console.log(phpResponse);
});

// run javascripts
const prog = {
  list: "ls",
  copy: "cp",
  folder: "mkdir",
  node: "node",
};
const cp = runner.spawn(prog.node, ["./node/child_process/app.js"]);
cp.stdout.on("data", function (data) {
  console.log(`STDOUT: ${data.toString()}`);
});
// cp.on("close", () => {
//   console.log("Child Process has ended");
//   process.exit();
// });

// setTimeout(() => {
//   cd.stdin.write("stop");
// }, 4000);

//run c++ script
const compiler = "g++";
const version = "-std=c++11";
const out = "-o";
const infile = "./files-c++/hello.cpp";
const outfile = "./files-c++/hello.out";

const name = "Drey";

const child = runner.execFile(
  compiler,
  [version, out, outfile, infile],
  (error, out, err) => {
    if (error) throw error;
    else {
      const executable = `./${outfile}`;
      const execute = runner.execFile(executable, [name], (error, out, err) => {
        if (error) {
          throw error;
        } else {
          console.log(out);
        }
      });
    }
  }
);

// const {spawn} = require('child_process')
/**
 * Run python myscript, pass in `-u` to not buffer console output
 * @return {ChildProcess}
 */
function runScript() {
  return runner.spawn("python", [
    "-u",
    path.join(__dirname, "files-python/s.py"),
    "--foo",
    "some value for foo",
  ]);
}
const subprocess = runScript();
// print output of script
subprocess.stdout.on("data", (data) => {
  console.log(`data:${data}`);
});
subprocess.stderr.on("data", (data) => {
  console.log(`error:${data}`);
});
subprocess.stderr.on("close", () => {
  console.log("Closed");
});
