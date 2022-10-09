## ❗ 실행시 주의 사항

- 첨부된 [`package.json`](https://gist.githubusercontent.com/essential2189/f1eb82448a9a5d83c95c0b8213f856f8/raw/94efb490f46856580a1cbb3ed45e56dbd8be1340/package.json)을 이용해주세요.
- 터미널에 `npm install package.json`을 하시면 손쉽게 설치 가능합니다.

처음에 init()랑 setSize() 후에 나머지 작동해주세요.

# 체크리스트

- [x] 함수 동작을 확인하기 위한 상위 프로그램을 작성했다.

`init(stackSize, heapSize)`

- [x] 스택영역 크기와 힙영역 크기를 지정하면 프로세스 공간을 위한 기본 주소(base address)를 리턴한다.
  - [x] 이번 미션에서는 일반적인 프로세스 메모리 모델(배경 지식 참조)중에서 스택과 힙 영역을 위주로 구현한다. 다른 영역은 무시한다.
  - [x] 아래 함수들에서 사용하는 포인터 주소들은 이 함수에서 리턴하는 기본 주소에서 얼마나 떨어진지 상대 주소로 표현한다.

`setSize(type, length)`

- [x] type 별로 고유한 사이즈를 가지도록 등록한다.
  - [x] 예시 : `setSize("int", 8)` //int 타입을 8바이트 길이로 지정한다.
  - [x] 메모리 시뮬레이션을 위해 스스로 필요한 타입을 지정해야 한다.
  - [x] 이미 등록한 타입은 다시 사이즈를 바꿀 수 없다.
  - [x] 사이즈는 1,2,4,8,16,32 중에 하나만 가능하다.

`malloc(type, count)`

- [x] 이미 등록된 type에 대해 count만큼 반복해서 메모리를 할당하고 시작 위치 고유한 주소를 스택 영역에 추가하고, 스택 주소값을 리턴한다.
  - [x] 만약 해당 타입 크기가 8바이트 보다 작은 경우는 패딩을 붙여서 8바이트로 만든 후, count만큼 반복한다.
  - [x] 예를 들어 boolean 타입을 1로 등록했고 malloc("boolean", 4)를 호출한다면 패딩을 붙여서 8바이트 단위로 4개 = 총 32바이트를 할당한다.

`free(pointer)`

- [x] malloc 할 때 할당했던 스택 주소값을 입력으로 받는다. 스택 주소값에 있는 힙영역 고유 주소를 찾아서 해제하고 반환한다.

`call(name, paramCount)`

- [x] 마지막 스택 위치를 알려주는 `스택 포인터`에 포인터 변수를 paramCount만큼 반복해서 생성하고 `스택 포인터`를 증가시킨다.
  - [x] paramCount는 0부터 10이하 값이다.
  - [x] name은 최대 8자까지만 가능하다.
  - [x] call 실행할 때마다 name값을 스택에 기록하고 아래 callstack()에서 활용한다.

`returnFrom(name)`

- [x] 증가했던 스택 공간을 비우고 이전 호출 위치로 이동한다.
  - [x] 이 때 name값은 call() 호출로 가장 최근에 호출한 name과 동일해야 한다.
  - [x] 가장 최근보다 이전에 호출한 name이면 에러값을 throw 한다.
  - [x] 만약 call() 호출 이후에 malloc()으로 생성한 stack 영역에 포인터 값이 있다면 같이 비운다.
  - [x] 단, malloc()으로 생성된 힙 영역의 메모리는 free()할 수 없고 스택에 있던 포인터 변수만 삭제한다.
  - [x] call()을 호출한 경우가 없을 경우 아무런 동작을 하지 않는다.

`usage()`

- [x] 스택 영역 전체크기, 사용중인 용량, 남은 용량, 힙 영역 전체크기, 사용중인 용량, 남은 용량을 순서대로 배열로 리턴한다.

`callstack()`

- [x] 현재 스택에 쌓여있는 호출 스택을 문자열로 리턴한다.
  - [x] 예를 들어 call("foo", 0), call("bar", 1), call("dap", 2) 순서로 호출한 경우는 `foo() 0xAF00 -> bar() 0xB100 -> dap() 0xBF00` 형태로 함수 이름과 스택의 주소를 리턴한다.
  - [x] 그 후에 returnFrom("dap") 호출한 경우는 `foo() 0xAF00 -> bar() 0xB100` 형태로 dap을 리턴하고 남은 함수 이름과 스택의 주소를 리턴한다.

`heapdump()`

- [x] 힙영역에서 사용중인 상태를 문자열 배열로 표현해서 리턴한다.
  - [x] 힙 영역에 정보는 타입과 크기, 해당 주소를 참조하는 스택 포인터 변수 정보도 포함한다.

`garbageCollect()`

- [x] 힙영역에 할당된 타입들 중에서 스택에 포인터 변수가 없는 경우를 찾아서 해제하는 동작을 한다.

`reset()`

- [x] 모든 stack과 heap 공간을 비우고 init했을 때와 동일하게 초기상태로 만든다.

# 실행 결과

![1.png](https://gist.githubusercontent.com/essential2189/06d7cf2739efeecb13c67b9218a4306a/raw/870697ad4b922289e40a13b6ea510df7491b68d7/1.init.png)
![2.png](https://gist.githubusercontent.com/essential2189/06d7cf2739efeecb13c67b9218a4306a/raw/870697ad4b922289e40a13b6ea510df7491b68d7/2.setSize.png)
![3.png](https://gist.githubusercontent.com/essential2189/06d7cf2739efeecb13c67b9218a4306a/raw/870697ad4b922289e40a13b6ea510df7491b68d7/3.malloc.png)
![4.png](https://gist.githubusercontent.com/essential2189/06d7cf2739efeecb13c67b9218a4306a/raw/870697ad4b922289e40a13b6ea510df7491b68d7/4.call.png)
![5.png](https://gist.githubusercontent.com/essential2189/06d7cf2739efeecb13c67b9218a4306a/raw/870697ad4b922289e40a13b6ea510df7491b68d7/5.free.png)
![6.png](https://gist.githubusercontent.com/essential2189/06d7cf2739efeecb13c67b9218a4306a/raw/870697ad4b922289e40a13b6ea510df7491b68d7/6.malloc.png)
![7.png](https://gist.githubusercontent.com/essential2189/06d7cf2739efeecb13c67b9218a4306a/raw/870697ad4b922289e40a13b6ea510df7491b68d7/7.returnFrom.png)
![8.png](https://gist.githubusercontent.com/essential2189/06d7cf2739efeecb13c67b9218a4306a/raw/870697ad4b922289e40a13b6ea510df7491b68d7/8.usage.png)
![9.png](https://gist.githubusercontent.com/essential2189/06d7cf2739efeecb13c67b9218a4306a/raw/870697ad4b922289e40a13b6ea510df7491b68d7/9.callstack.png)
![10.png](https://gist.githubusercontent.com/essential2189/06d7cf2739efeecb13c67b9218a4306a/raw/870697ad4b922289e40a13b6ea510df7491b68d7/10.heapdump.png)
![11.png](https://gist.githubusercontent.com/essential2189/06d7cf2739efeecb13c67b9218a4306a/raw/870697ad4b922289e40a13b6ea510df7491b68d7/11.garbageCollect.png)
![12.png](https://gist.githubusercontent.com/essential2189/06d7cf2739efeecb13c67b9218a4306a/raw/870697ad4b922289e40a13b6ea510df7491b68d7/12.reset.png)

# 학습 메모

malloc
https://gist.github.com/DmitrySoshnikov/c8d416624b65ece5ecbb893706d8865b

stack
https://javascript.plainenglish.io/how-to-implement-a-stack-in-node-js-e7b43af282d4

heap
https://blog.bitsrc.io/implementing-heaps-in-javascript-c3fbf1cb2e65

memory access
https://dev.to/arthurbiensur/kind-of-getting-the-memory-address-of-a-javascript-object-2mnd

javascript memory
https://medium.com/su-s-daily-log/js-memory-model-119257cda77b

const var let
https://60sec.tistory.com/205

베열 길이 설정
https://hianna.tistory.com/366

return object로 하는법
https://www.javascripttutorial.net/javascript-return-multiple-values/

배열 추가 삭제
https://gent.tistory.com/295

메모리 이해
https://www.baeldung.com/java-stack-heap

for key, value in dictionary
https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
