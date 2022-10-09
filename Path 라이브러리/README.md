## ❗  실행시 주의 사항

- 첨부된 [`package.json`](https://gist.githubusercontent.com/essential2189/fb87b0eeef1319ad21da3f1cdacda11b/raw/d5d6bcad2103f271c5c2ecdf3ed5108133bce150/package.json)을 이용해주세요.
- 터미널에 `npm install package.json`을 하시면 손쉽게 설치 가능합니다.
  <br/><br/><br/>

# 체크리스트

### Path 라이브러리 만들기

- [x] Path에 포함될 수 없는 특수문자가 포함된 경우나 필수적인 항목이 없으면 throw 처리한다.
  - [x] 한글이나 공백도 지원해야 한다.
- [x] Path가 /usr/bin:/usr/local/bin 값처럼 여러 Path를 포함하는 경우 Path배열을 리턴하는 생성자를 별도로 구현한다
  - [x] Path 요소가 하나인 경우와 어떻게 구분할 지 스스로 판단한다.
- [x] Path 파싱을 위해서 정규표현식(regular expression)을 학습하고 필수적으로 사용한다.
- [x] 다음과 같은 Path 요소에 접근해서 읽고, 변경할 수 있어야 한다.
  - [x] root : String
  - [x] base : String
  - [x] name : String
  - [x] ext : String
  - [x] lastDirectory : String
  - [x] components : [String]
  - [x] absoluteString : String
  - get[something]을 이용해 갖고오고 set[something]을 이용해 변경할 수 있다.

### Path 단위 테스트

- [x] Path Components 관련
  - [x] pathComponents는 읽기만 가능하도록 만들고 변경하는 것은 메소드를 만든다.
  - [x] 경로에 요소를 추가하는 메소드 : appendComponent()
  - [x] base를 제외한 마지막 경로 제거하는 메소드 : deleteLastComponent()
- [x] Path 비교 관련

  - [x] relative(to) 현재 Path 속성과 to Path 속성을 비교한다.
  - [x] 리턴값은 현재 Path에서 to까지 이동한다고 가정했을 때 상대 경로를 문자열로 생성한다.

- [x] jest 사용하여 10가지 테스트 진행

# 결과

![mission1.png](https://gist.githubusercontent.com/essential2189/fb87b0eeef1319ad21da3f1cdacda11b/raw/d5d6bcad2103f271c5c2ecdf3ed5108133bce150/mission1.png)
![mission2.png](https://gist.githubusercontent.com/essential2189/fb87b0eeef1319ad21da3f1cdacda11b/raw/d5d6bcad2103f271c5c2ecdf3ed5108133bce150/mission2.png)

![test.png](https://gist.githubusercontent.com/essential2189/fb87b0eeef1319ad21da3f1cdacda11b/raw/d5d6bcad2103f271c5c2ecdf3ed5108133bce150/test.png)

# 학습 메모

window 파일 이름으로 사용할 수 없는 문자
https://zetawiki.com/wiki/%ED%8C%8C%EC%9D%BC_%EC%9D%B4%EB%A6%84%EC%97%90%EB%8A%94_%EB%8B%A4%EC%9D%8C_%EB%AC%B8%EC%9E%90%EB%A5%BC_%EC%82%AC%EC%9A%A9%ED%95%A0_%EC%88%98_%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4

unix 파일 디렉토리 이름 규칙
https://m.cafe.daum.net/koreamedicina/jRKy/4?

includes 여러개
https://wakestand.tistory.com/302

정규식 테스트 사이트
https://regexr.com/6qtr3

jest 설정
https://velog.io/@okyungjin/Jest-Cannot-use-import-statement-outside-a-module-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0
https://velog.io/@stampid/JEST-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9C%A0%EB%8B%9B-%ED%85%8C%EC%8A%A4%ED%8A%B8-ykk5krj31z
https://velog.io/@flexing1010/TILJavascript%EC%97%90%EC%84%9C-%EB%8B%A8%EC%9C%84-%ED%85%8C%EC%8A%A4%ED%8A%B8%ED%95%98%EA%B8%B0Jest-%EA%B8%B0%EB%B3%B8-%EC%82%AC%EC%9A%A9%EB%B2%95
