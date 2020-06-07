const runner = require("child_process");
const path = require("path");
const fileSystem=require("fs");

const prog = {
  list: "ls",
  node: "node",
};

let dir="scripts";
let files=fileSystem.readdirSync(dir);
let output;
files.forEach(file => {
  switch (file.substring(file.lastIndexOf(".")+1)) {
    case "php":
      output=handlePHP(file);
      break;
    case "js":
      output=handleJS(file);
      break;
    case "py":
      output=handlePY(file);
      break;
    case "cpp":
      output=handleCPP(file)
      break;
    default:
      break;
  }
});

// run php scripts
function handlePHP(fileName) {
  var phpScriptPath = `./scripts/${fileName}`;
  var argsString = "value1,value2,value3";
  runner.exec("php " + phpScriptPath + " " + argsString, function (
    err,
    phpResponse,
    stderr
  ) {
    if (err) console.log(err);
    console.log(phpResponse);
    return phpResponse;
  });
}

// run javascripts
function handleJS(fileName) {
  const cp = runner.spawn(prog.node, [`./scripts/${fileName}`]);
  cp.stdout.on("data", (data) =>{
    console.log(`${data}`);
    return `${data}`;
  });
  
}

//run c++ script
function handleCPP(inputFile) {
  const compiler = "g++",
    version = "-std=c++11",
    out = "-o",
    infile = `./scripts/${inputFile}`,
    outfile = "./scripts/hello.out",
    name = "C++";

  const child = runner.execFile(
    compiler,
    [version, out, outfile, infile],
    (error, out, err) => {
      if (error) throw error;
      else {
        const executable = `./${outfile}`;
        const execute = runner.execFile(
          executable,
          [name],
          (error, out, err) => {
            if (error) throw error;
            else{
              console.log(out);
              return out;
            }
          }
        );
      }
    }
  );
}

//Run python script
function handlePY(fileName) {
  function runScript() {
    return runner.spawn("python", [
      "-u",
      path.join(__dirname, `./scripts/${fileName}`),
      "--foo",
      "some value for foo",
    ]);
  }
  const subprocess = runScript();
  // print output of script
  subprocess.stdout.on("data", (data) => {
    console.log(`${data}`);
    return `${data}`;
  });
}
