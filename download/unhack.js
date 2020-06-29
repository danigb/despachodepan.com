const stream = require("stream");
const { promisify } = require("util");
const fs = require("fs");
const got = require("got");
const { url } = require("inspector");

const pipeline = promisify(stream.pipeline);
const PREFIX = "https://depan.s3.amazonaws.com/";

main();

async function main() {
  const errors = [];
  const urls = fs
    .readFileSync("hacked.txt")
    .toString()
    .split("\n")
    .map((line) => line.slice(line.indexOf('img src="') + 9))
    .map((line) => line.slice(0, line.indexOf('"')));

  for (let url of urls) {
    const path = url.slice(url.indexOf(PREFIX) + PREFIX.length);
    const dir = "hacked/" + path.substring(0, path.lastIndexOf("/"));
    await fs.promises.mkdir(dir, { recursive: true });
    const output = "hacked/" + path;
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
