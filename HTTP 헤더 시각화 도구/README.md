## ❗  실행시 주의 사항

- 첨부된 [`package.json`](https://gist.githubusercontent.com/essential2189/bc016d5caf87544fd5a9badebdd837b9/raw/d30c9e47b87f106da4011414b3aa11946f06053b/package.json)을 이용해주세요.
- 터미널에 `npm install package.json`을 하시면 손쉽게 설치 가능합니다.

- cache 테스트할 떈 `test_cache.mjs`에서 임의의 중복된 URL을 갖고옵니다.

  - 동일한 URL이 잘 안나와서 일관된 결과 출력을 위해 사용했습니다.

- URL을 통해 다운로드된 항목들은 실행 시 생긴 `downloads` 디렉토리에서 확인 가능합니다.
  <br/><br/><br/>

# 체크리스트

요청 처리 관련

- [x] 웹 브라우저처럼 URL을 입력하면 해당 주소로 요청을 보낸다.

- [x] http/https 모듈을 활용해서 요청을 보내고 응답을 받는다.

  - [x] 멀티 스레드 환경이 아니라 서버와 연결을 하나만 사용한다고 가정하고 순차적으로 진행한다

- [x] HTTP 모듈을 활용해서 응답에 포함된 HTML 을 분석한다.

  - [x] HTML에 포함된 요소들 중에서 script 태그의 src 속성, img 태그의 src 속성에 있는 주소도 다시 요청을 보내서 받는다.

- [x] 모든 요청을 보낸 시각, 요청에 대한 응답을 받은 시각, 다운로드가 끝난 종료 시각을 모두 기록한다.

  - [x] 요청을 보내고 응답을 받을 때까지 시간을 응답 대기 시간으로 표기한다.

  - [x] 응답 시작부터 마지막 바이트까지 다 받은 시간을 다운로드 시간으로 표기한다.

메모리 캐싱 관련

- [x] 요청 URL을 기준으로 이미지(png, gif, jpg)와 코드(css, js) 파일들은 메모리에 캐싱한다.

- [x] 동일한 URL을 다시 요청하는 경우는 메모리에 있는 캐시 데이터를 표시한다.

- [x] 캐시 데이터를 사용하면 로딩이 얼마나 빨라지는 지 비교한다.

- [x] 캐시 방식에 대해서는 LRU 캐시 말고 다른 방식으로 스스로 판단하고 결정한다.

# 오피셜 체크리스트

- [x] URL 입력 후 HTTP 요청 보내기 구현

- [x] HTML 파싱 - src 속성 탐색 구현

- [x] 응답 대기 시간 측정 및 출력

- [x] 다운로드 시간 측정 및 출력

- [x] 요청 도메인 개수 측정 및 출력

- [x] 전체 요청 개수 측정 및 출력

- [x] 전체 이미지 개수 측정 및 출력

- [x] 전체 코드 개수 측정 및 출력

- [x] 전체 전송 용량 측정 및 출력

- [x] 리다이렉트 개수 측정 및 출력

- [x] 응답 - 리소스 메모리 캐싱 구현

- [x] 캐싱 데이터 측정 및 출력

# 결과

### No Cache

![no_cache.png](https://gist.githubusercontent.com/essential2189/bc016d5caf87544fd5a9badebdd837b9/raw/864cbe923b803b529bc556e35585235bcf6a15f7/no_cache.png)

### Cache

- `test_cache.mjs` 에서 임의의 중복된 URL을 갖고옵니다.
  - 15개의 동일한 URL이 4번 반복됩니다.
  - `MAX_CACHE` = 15로 줬을 때, 첫 15개를 캐시에 저장 후, 그 후엔 캐시에서 꺼내 쓰므로 캐시 데이터 개수가 60 - 15 = 45가 나오는 걸 확인 할 수 있습니다.

![cache.png](https://gist.githubusercontent.com/essential2189/bc016d5caf87544fd5a9badebdd837b9/raw/864cbe923b803b529bc556e35585235bcf6a15f7/cache.png)

### Download

![download_list.png](https://gist.githubusercontent.com/essential2189/bc016d5caf87544fd5a9badebdd837b9/raw/b18ef51fd03f854df0038206260bdd8ae29c747d/download_list.png)

### 속도 비교

- No Cache = 전체 요청 개수 32개 | 전송 용량 : 886.823 KB | 총 로딩 시간 : 433ms
- Cache 　　= 전체 요청 개수 60개 | 전송 용량 : 826.685 KB | 총 로딩 시간 : 286ms

# 학습 메모

createWriteStream
https://programmingsummaries.tistory.com/362

get file size
https://attacomsian.com/blog/nodejs-get-file-size

download file using https
https://stackoverflow.com/questions/27483090/how-to-download-a-file-with-node-js-using-https

실행시간 측정
https://hianna.tistory.com/392

LFU cache
https://blog.lmerza.com/2019/01/24/lfu-and-lru-caching-in-javascript/
