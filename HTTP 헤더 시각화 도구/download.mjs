import https from "https";
import http from "http";
import fs from "fs";

export function download(url, filePath) {
  const proto = !url.charAt(4).localeCompare("s") ? https : http;

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);

    let fileInfo = null;

    global.start_wait = new Date();
    const request = proto.get(url, (response) => {
      if (response.statusCode !== 200) {
        fs.unlink(filePath, () => {
          reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        });
        return;
      }

      fileInfo = {
        mime: response.headers["content-type"],
        size: parseInt(response.headers["content-length"], 10),
      };

      response.pipe(file);
    });

    file.on("finish", () => resolve(fileInfo));

    request.on("error", (err) => {
      fs.unlink(filePath, () => reject(err));
    });

    file.on("error", (err) => {
      fs.unlink(filePath, () => reject(err));
    });

    request.end();
    global.end_wait = new Date();
  });
}

export function getData(data) {
  let data_list = [];
  let js = /\<{1}script[\s]{1}[\w]*[\s]?(src=)+\"{1}https?:\/\/[\w\-\.\\\/]+(\.js){1}/gim;
  let css = /\<{1}script[\s]{1}[\w]*[\s]?(src=)+\"{1}https?:\/\/[\w\-\.\\\/]+(\.css){1}/gim;
  let png = /\<{1}img[\s]{1}(src=)+\"{1}https?:\/\/[\w\-\.\\\/]+(\.png){1}/gim;
  let jpeg = /\<{1}img[\s]{1}(src=)+\"{1}https?:\/\/[\w\-\.\\\/]+(\.jpeg){1}/gm;
  let gif = /\<{1}img[\s]{1}(src=)+\"{1}https?:\/\/[\w\-\.\\\/]+(\.gif){1}/gim;

  if (data.match(js) !== null) data_list.push(data.match(js));
  if (data.match(css) !== null) data_list.push(data.match(css));
  if (data.match(png) !== null) data_list.push(data.match(png));
  if (data.match(jpeg) !== null) data_list.push(data.match(jpeg));
  if (data.match(gif) !== null) data_list.push(data.match(gif));

  return data_list.flat(Infinity);
}
