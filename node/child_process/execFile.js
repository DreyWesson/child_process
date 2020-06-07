const cp = require("child_process");

const compiler = "g++";
const version = "-std=c++11";
const out = "-o";
const infile = "./hello.cpp";
const outfile = "hello.out";

const name = "Drey";

const child = cp.execFile(
  compiler,
  [version, out, outfile, infile],
  (error, out, err) => {
    if (error) throw error;
    else {
      const executable = `./${outfile}`;
      const runner = cp.execFile(executable, [name], (error, out, err) => {
        if (error) {
          throw error;
        } else {
          console.log(out);
        }
      });
    }
  }
);
