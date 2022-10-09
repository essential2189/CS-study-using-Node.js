# 체크리스트

## ❗ 실행시 주의 사항

- 본 프로젝트는 import을 사용했습니다.
- package.json에 `"type": "module"`을 추가해주세요
- 또는 첨부된 [`package.json`](https://gist.githubusercontent.com/essential2189/9b3522cfe5f8a3ef279d487b15c6dd29/raw/f93a410a75888e3c7c4e3d4db9931a3c136796e1/package.json)을 이용해주세요.

## XML Parser

- [x] 기존에 구현된 XML 분석을 도와주는 xmldom 나 유사한 라이브러리와 node 모듈을 사용할 수 없으며, 이와 유사한 파싱을 처리해주는 외부 라이브러리를 모두 사용할 수 없다.
- [x] 정규표현식은 token을 추출하고 분석하기 위한 용도로 사용할 수 있다. (선택사항이라 사용하지 않아도 된다.)
- [x] 문자열 분석을 위해서 단계별로 역할을 나눠서 처리한다.
- [x] tokenizer, lexer, parser 를 처리하는 메서드를 각각 만든다.
- [x] 함수가 길어지거나 너무 많은 역할을 하지않도록 하위 함수로 나눈다.
- [x] 태그 중첩을 처리하기 위해서 Stack 동작을 직접 구현해야 한다.
- [x] 약 태그가 제대로 닫히지 않으면 stringify() 결과는 "올바른 XML 형식이 아닙니다."를 리턴한다.

## XMLPath

- [x] Tokenizer
  - [x] elementByAttribute()
    - [x] 태그의 속성과 값을 비교해서 해당 요소를 찾는 함수를 구현한다.
  - [x] elementByTag()
    - [x] 태그로 모든 해당 요소를 찾아 배열로 리턴하는 함수를 구현한다.
  - [x] XPath()
    - [x] 경로가 너무 깊어지면 찾기 어렵기 때문에 XPath 라는 형식으로 원하는 요소를 지정할 수 있다.
    - [x] P 요소가 여러 개일 때 XPath가 "/HTML/BODY/P" 형태로 인덱스가 주어지지 않으면 항상 첫 번째 요소를 의미한다.
    - [x] 태그 대소문자는 구분하지 않아도 된다. HTML 이나 html 은 동일하게 처리한다.
- [x] Lexer
- [x] Parser
- [ ] Refactoring

# 결과

![result.png](https://gist.githubusercontent.com/essential2189/9b3522cfe5f8a3ef279d487b15c6dd29/raw/d29f7c3db2ce9c226714bb4560e0372cd81fe191/result.png)

# 학습 메모

XML Parser 라이브러리 코드 참고
https://github.com/MauriceConrad/XML-Parser

join
https://www.codingfactory.net/10450

includes string
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/includes
https://bobbyhadz.com/blog/javascript-typeerror-includes-is-not-a-function

정규표현식
https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions
https://curryyou.tistory.com/234

JavaScript array remove
(자바스크립트에는 파이썬의 remove가 없다)
https://dgkim5360.tistory.com/entry/deleting-an-item-in-array-javascript

JavaScript filter (배열에서 빈 값 제거)
https://webisfree.com/2020-03-07/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B0%B0%EC%97%B4%EC%97%90%EC%84%9C-%EB%B9%88-%EA%B0%92%EB%A7%8C-%EC%A0%9C%EA%B1%B0%ED%95%98%EA%B8%B0

key가 dictionary에 있는지 확인
https://stackoverflow.com/questions/1098040/checking-if-a-key-exists-in-a-javascript-object

stack
https://helloworldjavascript.net/pages/282-data-structures.html

Recursive string parsing into object
https://www.tutorialspoint.com/recursive-string-parsing-into-object-javascript
