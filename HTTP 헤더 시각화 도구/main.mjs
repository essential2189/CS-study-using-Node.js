import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { printReulst, printFinal } from "./utils.mjs";
import { download, getData } from "./download.mjs";
import promptSync from "prompt-sync";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main(data) {
  fs.mkdirSync(path.join(__dirname, "/downloads"), { recursive: true });
  let data_list = getData(data);

  let image_count = 0;
  let code_count = 0;
  let domain_list = [];
  let size_sum = 0;
  let start = new Date();
  let redirect = 1;
  let max_size = 0;
  let max_wait = 0;
  let max_download = 0;
  let max_size_url = "";
  let max_wait_url = "";
  let max_download_url = "";

  for (let i = 0; i < data_list.length; i++) {
    let url = data_list[i].split("src=")[1].slice(1);
    let filename = url.split("/").slice(-1)[0];
    let domain = url.split("//")[1].split("/")[0];
    let ext = url.split(".").slice(-1)[0];

    if (url.includes("http")) {
      if (ext === "js" || ext === "css") code_count++;
      else image_count++;

      if (!domain_list.includes(domain)) domain_list.push(domain);

      global.start_download = new Date();
      await download(url, __dirname + "/downloads/" + filename)
        .then((res) => {
          size_sum += res.size;
          global.end_download = new Date();

          let wait_time = global.end_wait - global.start_wait;
          let download_time = global.end_download - global.start_download;

          printReulst(url, filename, domain, ext, wait_time, download_time, res.size);
          if (res.size > max_size) {
            max_size = res.size;
            max_size_url = filename;
          }
          if (wait_time > max_wait) {
            max_wait = wait_time;
            max_wait_url = domain;
          }
          if (download_time > max_download) {
            max_download = download_time;
            max_download_url = domain;
          }
        })
        .catch((err) => console.log(err));
    }
  }

  let end = new Date();
  let total_time = end - start;

  printFinal(domain_list, data_list, image_count, code_count, size_sum, total_time, max_size, max_size_url, max_wait, max_wait_url, max_download, max_download_url, redirect, undefined);
}

function getInput() {
  const prompt = promptSync();

  const url = prompt("URL > ");

  return url;
}

https
  .get(getInput(), (resp) => {
    let data = "";
    resp.on("data", (chunk) => {
      data += chunk;
    });

    resp.on("end", () => {
      main(data);
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
