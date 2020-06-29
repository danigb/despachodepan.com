const stream = require("stream");
const { promisify } = require("util");
const fs = require("fs");
const got = require("got");

const pipeline = promisify(stream.pipeline);
const PREFIX = "http://depan.s3.amazonaws.com/";

main();

async function main() {
  const errors = [];
  const urls = fs.readFileSync("urls-all.txt").toString().split("\n");
  for (url of urls) {
    const path = url.slice(PREFIX.length);
    const dir = "images/" + path.substring(0, path.lastIndexOf("/"));
    await fs.promises.mkdir(dir, { recursive: true });
    const output = "images/" + path;
    console.log(output);
    try {
      await pipeline(got.stream(url), fs.createWriteStream(output));
    } catch (error) {
      console.log("ERROR", url);
      errors.push(url);
    }
  }
  console.log(urls.length, errors.length);
  console.log(errors);
}
