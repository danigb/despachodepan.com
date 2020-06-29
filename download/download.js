const fs = require("fs");

const PREFIX = "http://depan.s3.amazonaws.com/";

main();

async function main() {
  const files = fs.readFileSync("files.txt").toString().split("\n");
  console.log(files[0]);
  for (file of files.slice(0, 10)) {
    const path = file.slice(PREFIX.length);
    const dir = path.substring(0, path.lastIndexOf("/"));
    await fs.promises.mkdir(dir, { recursive: true });
    console.log(dir);
  }
}
