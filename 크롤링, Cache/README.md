## 🔴 실행시 주의 사항

- 첨부된 [`package.json`](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/6ea890f84ade304c7b296dbcb229d89093e5f9a6/package.json)을 이용해주세요.
- 터미널에 `npm install package.json`을 하시면 손쉽게 설치 가능합니다.
<br/><br/><br/>

- 검색 프로그램(main.js) 실행시 키워드 입력은 크롤링이 완료된 후에 해주세요.
  - 너무 빠르게 연속적으로 입력하면 입력이 꼬입니다.
- 검색 프로그램(main.js)은 exit로 종료할 수 있습니다.
<br/>

- Max keyword : cache에 저장될 최대 keyword 갯수.
- Max data : 크롤링할 최대 데이터 갯수.

# 체크리스트

## 키워드 검색 크롤링
 - [x] 개발 언어와 개발 환경에 맞춰서, 검색 서비스에서 검색 결과를 크롤링하는 방법, 모듈을 찾아서 학습한다.
 - [X] node.js 기반 크롤링 처리 도구 또는 모듈을 활용한다.
 - [x] 검색 결과 HTML에서 제목, 링크 주소, 미리보기 내용을 추출하도록 구현한다.

## 검색 프로그램
 - [x] 검색한 키워드는 최근에 검색한 단어를 남기기 위해서 LRU 캐시에 저장한다.
 - [x] LRU 캐시 저장할 수 있는 키워드 개수와 키워드별 데이터 개수는 생성 또는 초기화 시점에 지정할 수 있어야 한다.
   - [x] LRU 캐시가 최근에 검색한 단어는 5개, 데이터는 10개까지 기록하도록 초기화한다.
   - [x] LRU 캐시 기록은 정책적으로 변경할 수 있도록 구현하고 바꿔가면서 확인해본다.
 - [x] 캐시는 set 동작과 get 동작을 모두 구현한다.
   - [x] 캐시에서 get 할 때마다 hit가 되면 hitCount를 증가시킨다.
   - [x] 캐시에 set할 때는 이전에 동일한 키가 있으면 업데이트한다.
   - [x] 키가 없으면 LRU 캐시에서 가장 오래전에 검색한 것을 지우고 새로 추가한다.
 - [x] 캐시에 저장할 때는 키워드와 결과가 1:n 구조를 가지도록 저장할 데이터 구조에 대해 정리한다.
 - [x] LRU 캐시를 저장된 단어인지 우선 확인하고, 있을 경우는 저장된 내용을 이용해서 표시한다.
 - [x] 캐시에서 찾아서 표시하는 경우는 캐시된 정보라는 것을 표시한다.
 - [x] 키워드에 $cache를 입력하면 현재 LRU 캐시에 저장된 키워드 목록과 hitCount를 출력한다.

 - [x] 리펙토링
   - [x] 가독성 높이기
   - [x] 주석 달기
   - [x] 파일 분리하기
  
## 결과
키워드 검색 크롤링 - [crawling.js](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/243b523a3bcafcc06c76a1be6baeb10c820d73ad/crawling.js)
![craw_result.png](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/72d73b83e6176df66ea0c11e6696cd34d18f533b/craw_result.png)


검색 프로그램 - [main.js](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/72d73b83e6176df66ea0c11e6696cd34d18f533b/main.js) , [lru_cache.js](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/5dcb1f83851f86d4835626e4605dadd6c62b2a6c/lru_cache.js) , [web_crawling.js](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/5dcb1f83851f86d4835626e4605dadd6c62b2a6c/web_crawling.js)
![result1.png](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/72d73b83e6176df66ea0c11e6696cd34d18f533b/result1.png)
![result2.png](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/72d73b83e6176df66ea0c11e6696cd34d18f533b/result2.png)
![result3.png](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/72d73b83e6176df66ea0c11e6696cd34d18f533b/result3.png)


LRU 실행 예시 - 가독성을 위해 아래 사진은 apple, google, naver 순으로 검색한 후의 사진입니다. (첫 $cache 결과 확인)
```
(LRU size : 3)

apple, google, naver 순으로 검색 시.

[apple(1)] ← [google(1)] ← [naver(1)] 형식으로 저장됩니다.

여기서 google 검색 시. 새로 검색한 google이 맨 뒤로 가게됩니다.
그 결과,
[apple(1)] ← [naver(1)] ← [google(2)] 형식으로 바뀌게됩니다.

그리고 new를 검색하게 되면, 
가장 오래된 apple(1)이 삭제되고 new가 맨뒤에 추가됩니다.

[naver(1)] ← [google(2)] ← [new(1)] 형식으로 바뀌게됩니다.

```
![LRU.png](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/0dd55132f543b983bbcc26f694f40242fdeb48fc/LRU.png)


# 학습 메모

nodejs 크롤링
https://goodmemory.tistory.com/83

https://velog.io/@yesdoing/Node.js-%EC%97%90%EC%84%9C-%EC%9B%B9-%ED%81%AC%EB%A1%A4%EB%A7%81%ED%95%98%EA%B8%B0-wtjugync1m

https://blog.uniony.me/nodejs/crawler/

https://thisisprogrammingworld.tistory.com/136


node js undefined 처리
https://mrb18.tistory.com/entry/%EC%9E%90%EC%A3%BC-%ED%97%B7%EA%B0%88%EB%A6%AC%EB%8A%94-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-if%EB%AC%B8%EC%9C%BC%EB%A1%9C-undefined-%EC%B2%B4%ED%81%AC%ED%95%A0%EB%95%8C-%EB%B2%88%EC%99%B8-Null%EC%B2%B4%ED%81%AC

nodejs dictionary
https://ourcstory.tistory.com/158

문자열 자르기
https://gent.tistory.com/414


require vs import
https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-require-%E2%9A%94%EF%B8%8F-import-CommonJs%EC%99%80-ES6-%EC%B0%A8%EC%9D%B4-1

class 상속
https://fenderist.tistory.com/313

module
https://abbo.tistory.com/151

https://velog.io/@grinding_hannah/JavaScript-Import-Export%EB%A1%9C-%EB%AA%A8%EB%93%88%ED%99%94%ED%95%98%EA%B8%B0