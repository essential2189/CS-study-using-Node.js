## ❗ 실행시 주의 사항

- 본 프로젝트는 `import`을 사용했습니다.
- package.json에 `"type": "module"`을 추가해주세요
- [`package.json`](https://gist.githubusercontent.com/essential2189/948a988173fcb86cf6b07837f25d2029/raw/3e1ef31db3281fce226f299e5ab73f7a2e9ce851/package.json)

# 체크 리스트

## 함수형 코드로 구현하기

1. BoostSet

- [x] 불변 타입으로 초기화할 때만 배열로 값을 넘길 수 있다. 추가나 삭제는 되지 않는다.
- [x] 수학에서 집합 개념을 지원하여, 요소가 중복되서는 안된다.
- [x] `sum(other)` : BoostSet에 다른other BoostSet 요소들을 더해서 합집합을 리턴한다. 이미 같은 값이 있으면 추가하지 않는다.
- [x] `complement(other)` : BoostSet에서 다른other BoostSet 요소를 빼서 여집합을 리턴한다. 값이 포함되어 있지 않으면 아무런 변화도 없다.
- [x] `intersect(other)` : BoostSet와 다른other BoostSet 값과 비교해서, 두 집합에 모두 있는 원소 - 교집합을 리턴한다.
- [x] `resultAll()` : 모든 요소를 1차원 배열로 리턴한다.

3. CountSet

- [x] 불변 타입으로 초기화할 때 Object 또는 HashMap으로 값을 넘길 수 있다.
  - [x] 새로운 요소를 추가하거나 삭제하면 새로운 CountSet를 리턴한다.
- [x] BoostSet과 달리 요소가 중복해서 있을 수 있고, 요소별 Count 값을 가지고 있다.
- [x] `append(element)` : 새로운 요소를 추가하고 새로운 CountSet을 리턴한다. 이미 있는 경우는 Count만 증가하고 리턴한다.
- [x] `remove(element)` : 기존에 요소가 있으면 Count를 줄인다. 만약 0이되면 제거한 CountSet을 리턴한다.
- [x] `countFor(element)` : 특정 요소에 대한 Count 값을 리턴한다.
- [x] `sum(other)` : CountSet에 다른other CountSet 요소들을 더해서 합집합을 리턴한다. 이미 같은 값이 있으면 합쳐서 카운트를 올린다.
- [x] `complement(other)` : CountSet에서 다른other CountSet 요소를 빼서 여집합을 리턴한다. 값이 포함되어 있지 않으면 아무런 변화도 없다. 만약 현재 CountSet보다 빼려는 other CountSet 요소 Count가 더 큰 경우는 제거한다. (Count는 마이너스가 되지 않고 0보다 같거나 작으면 제거한다.)
- [x] `intersect(other)` : Set와 다른other CountSet 값과 비교해서, 두 집합에 모두 있는 원소 - 교집합을 리턴한다. 교집합 Count는 모두 1로 리턴한다.
- [x] `resultAll()` : 모든 요소와 Count를 Object 형태로 리턴한다.

## 고차함수 활용하기

- [x] 콘솔에 출력을 위해 display() 메소드를 추가한다.

  - [x] 매개변수로 클로저(또는 람다)를 넘기고 반복문 대신 reduce를 활용해서 출력해야 한다.
  - [x] 클로저 내부에서 콘솔 출력을 처리하도록 구현한다.

- [x] 반드시 내부 구현에서도 반복문 대신에 map, filter, reduce 고차 함수를 활용한다.
- [x] 새로 추가한 동작 확인을 위한 테스트 프로그램도 개선하고 동작을 확인한다.

# 결과

![result.png](https://gist.githubusercontent.com/essential2189/948a988173fcb86cf6b07837f25d2029/raw/8b7dda68882599fe12f942422e8092b26eb71443/result.png)

# 학습 정리

array spread
https://paperblock.tistory.com/62

중복 제거
https://jsikim1.tistory.com/227

함수형 프로그래밍
https://www.zerocho.com/category/JavaScript/post/576cafb45eb04d4c1aa35078

불변성
https://developer-talk.tistory.com/112

for (k, v in dict\_)
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

count element in array
https://stackoverflow.com/questions/6120931/how-to-count-certain-elements-in-array

array 원소 삭제
https://dgkim5360.tistory.com/entry/deleting-an-item-in-array-javascript
