import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function printReulst(url, filename, domain, ext, wait_time, download_time, size) {
  console.log(">> " + filename);
  console.log("도메인 " + domain);
  if (url.slice(0, 5) === "https") console.log("스킴 " + "https");
  else console.log("스킴 " + "https");
  console.log("경로 " + "/" + url.split("//")[1].split("/").slice(1).join("/"));
  console.log("종류 " + ext);
  console.log("용량 " + size / 1024 + "KB");
  console.log("대기 시간 " + wait_time + "ms");
  console.log("다운로드 시간 " + download_time + "ms\n\n");
}

export function printFinal(domain_list, data_list, image_count, code_count, size_sum, total_time, max_size, max_size_url, max_wait, max_wait_url, max_download, max_download_url, redirect, count_cache) {
  console.log("\n\n===============\n\n");
  console.log("도메인 개수 : " + domain_list.length + "개");
  console.log("요청 개수 : " + data_list.length + "개");
  console.log("이미지(png, gif, jpg) 개수 : " + image_count + "개");
  console.log("코드(css, js) 개수 : " + code_count + "개");
  console.log("전송 용량 : " + size_sum / 1024 + "KB");
  console.log("리다이렉트 개수 : " + redirect + "개");
  if (count_cache !== undefined) console.log("캐시 데이터 개수 : " + count_cache + "개");
  console.log("전체 로딩 시간 : " + total_time + "ms\n");

  console.log("가장 큰 용량 : " + max_size_url + " " + max_size / 1024 + "KB");
  console.log("가장 오랜 대기 시간 : " + max_wait_url + " " + max_wait + "ms");
  console.log("가장 오랜 다운로드 시간 : " + max_download_url + " " + max_download + "ms");
}
