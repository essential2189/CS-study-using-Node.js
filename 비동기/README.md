# 체크리스트

### 메뉴 주문 이벤트

- [x] 직접 스레드를 만들면 안되고, Event를 처리하는 비동기 이벤트 처리하도록 구현한다.
- [x] 메뉴 주문 기계(POS)는 메뉴 주문을 연속해서 받을 수 있다.
  - [x] 메뉴 주문을 받으면 주문 대기큐(Queue)에 추가한다.
- [x] 대기큐에 들어있는 이벤트를 꺼내서 처리하는 이벤트 루퍼(Looper)를 별도 모듈/객체로 분리해서 구현한다.
- [x] 매니저(Manager)는 주기적으로 주문 대기큐에서 이벤트를 확인한다.
- [x] 주문 대기가 있을 경우, 작업을 안하고 있는 요리사에게 작업 이벤트를 전달한다.
  - [x] 필요하면 매니저(Manager)도 주문 현황판을 표시할 이벤트를 전달할 수 있다.
- [x] 요리사(Chef)는 메뉴를 한 번에 1개 메뉴를 만들 수 있다고 가정한다.
  - [x] 스레드를 생성하는 게 아니라 이벤트 큐를 받아서 처리하는 방식으로 동작해야 한다.
  - [x] 요리사는 메뉴를 만들기 시작할 때와 끝날 때 마다 이벤트를 발생한다.
- [x] 현황판(DashBoard)는 메뉴 제작 현황을 주기적으로 화면에 출력한다.
  - [x] 주문한 메뉴에 대해 대기중/요리중/완성 상태를 표시한다.
  - [x] 현황판도 이벤트를 받아서 처리하는 별도 모듈/객체로 분리해서 구현한다.
- [x] 아래 동작 예시는 이해를 돕기위한 예시일 뿐 동일하게 출력할 필요 없다. 각 요구사항을 확인하기 위해서 매니저, 대기큐, 현황판 등을 이벤트 큐와 비동기 방식으로 어떤 구조로 구분하고, 어느 모듈에서 출력할 지 고민한다.
- [x] 동작 확인을 위해서 분단위 메뉴 제조 시간을 실제로는 초단위로 처리해도 무방하다.

### 배달 시뮬레이션

- [x] 프로그램을 시작할 때 요리사, 배달 기사 인원수를 지정하도록 구현한다.
  - [x] 프로그램이 시작하면 요리사와 배달 기사가 몇 명인지 출력한다.
  - [x] 그 외 매니저는 1명이라고 가정한다.
- [x] 주문을 할 때마다 주문한 고객을 구분해서 한꺼번에 주문한 메뉴를 알고 있어야 한다.
- [x] 매니저(Manager)는 주문/배달 대기큐에서 이벤트를 받는다.
  - [x] 주문 대기가 있을 경우 작업이 비어있는 요리사에게 작업 이벤트를 전달한다. 대기중인 요리사 목록을 관리해야 한다.
  - [x] 배달 대기가 있을 경우 작업이 배달 가능한 기사에게 작업 이벤트를 전달한다. 대기중인 배달 기사 목록을 관리해야 한다.
- [x] 이제 요리사(Chef)는 메뉴를 한 번에 2개 메뉴까지 동시에 만들 수 있다고 가정한다.
  - [x] 스레드를 생성하는 게 아니라 이벤트 큐를 받아서 처리하는 방식으로 동작해야 한다.
  - [x] 요리사는 메뉴를 만들기 시작할 때와 끝날 때 마다 이벤트를 발생한다.
- [x] 배달 기사는 한 번에 1개까지 메뉴를 배달할 수 있다고 가정한다.
  - [x] 배달은 거리가 동일하게 10분씩 걸린다고 가정한다.
  - [x] 스레드를 생성하는 게 아니라 이벤트 전달 방식으로 동작해야 한다.
  - [x] 배달 기사도 메뉴를 배달 시작할 때와 끝날 때 마다 이벤트를 발생한다.

# 오피셜 체크포인트

- [x] 객체/모듈 구조와 데이터 흐름 설계 그림 첨부

- [x] 주문 담당자(POS) 모듈/객체 요구사항 구현

  - [x] 주문 메뉴 입력받아 큐에 저장 필수

- [x] 대기큐(Queue) 이벤트 모듈/객체 요구사항 구현

  - [x] 이벤트 큐 방식 동작 구현 필수

- [x] 매니저(Manager) 모듈/객체 요구사항 구현

- [x] 1단계 단일 요리사(Chef) 모듈/객체 요구사항 구현

- [x] 2단계 복수 요리사(Chef) 모듈/객체 요구사항 구현

- [x] 배달기사 모듈/객체 요구사항 구현

- [x] 각 메뉴 시작/완성 이벤트시 화면 출력

- [x] 고객별 전체 메뉴 확인 기능 구현

- [x] 현재 진행중인 메뉴 제작/배달상태 출력

- [x] 3명 이상 요리사 스케줄링 구현

# 결과

### 흐름 설계 그림 첨부

![day17.png](https://gist.githubusercontent.com/essential2189/2cc534e7ad3f2e3acb6abe1bfd0c3ff8/raw/aa4d177742e5a49e63616d0d9666ef8787a94e5b/day17.png)

### 메뉴 주문 이벤트

![mission1.png](https://gist.githubusercontent.com/essential2189/2cc534e7ad3f2e3acb6abe1bfd0c3ff8/raw/47801cbb3c94aa8897c4d2ea8ffabe685ec14dd1/mission1.png)

### 배달 시뮬레이션

![mission2.png](https://gist.githubusercontent.com/essential2189/2cc534e7ad3f2e3acb6abe1bfd0c3ff8/raw/0caa71bd050f03c58c244e301847b398011d0ce1/mission2.png)

![result.gif](https://gist.githubusercontent.com/essential2189/2cc534e7ad3f2e3acb6abe1bfd0c3ff8/raw/47801cbb3c94aa8897c4d2ea8ffabe685ec14dd1/result.gif)

**3명의 요리사**
![reulst2.gif](https://gist.githubusercontent.com/essential2189/2cc534e7ad3f2e3acb6abe1bfd0c3ff8/raw/bdd3cd5fb1aa3c0736a99f4028475b287cc24cf1/result2.gif)

# 학습 메모

비동기
https://elvanov.com/2597

setInterval
https://stackoverflow.com/questions/44119692/how-to-go-through-a-queue-with-a-loop-which-includes-a-delay-javascript
https://www.daleseo.com/js-timer/

비동기 병렬
https://wlswoo.tistory.com/36

for await of
https://velog.io/@hiro2474/understandfor-await-of

promise all
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
