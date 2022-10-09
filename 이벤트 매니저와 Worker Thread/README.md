# 체크리스트

- [x] sharedInstance() 싱글톤으로 접근하도록 함수를 구현한다. 여러 번 호출해도 한 번 생성한 동일한 인스턴스를 반환한다.
- [x] add(subscriber, eventName, sender, handler) Subscriber를 추가할 때는 subscriber 객체와 이벤트 이름, 이벤트 발행 객체를 모두 합쳐서 고유한 키로 봐야한다.
  - [x] subscriber 와 sender 모두 객체 인스턴스를 인자값으로 전달한다
  - [x] eventName 은 이벤트를 지칭하는 이름이다. "" 빈값도 가능하다
  - [x] handler는 클로저로 이벤트를 받을 때 실행되어야 한다. 매개변수로 이벤트를 전달 받는다.
- [x] remove(subscriber
  - [x] subscriber를 제거할 때는 subscriber로 등록된 모든 조건을 제거한다.
- [x] postEvent()
  - [x] 이벤트를 발행할 때는 이벤트 이름을 꼭 명시해야 한다.
  - [x] 이벤트를 발생하고 전송하는 Publisher 객체 인스턴스를 꼭 넘겨야한다.
  - [x] Object 타입으로 userData를 전달할 수 있다. undefined으로 생략가능하다.
  - [x] 내부에서 Event 객체를 생성하고 구독 핸들러에 전달한다.
- [x] stringify()
  - [x] 모든 Subscriber 조건을 표시하는 문자열을 리턴한다.
- [x] EventManager 구현한 파일과 별도로, 위의 동작 예시처럼 이벤트 이름과 발행 객체 조건을 모두 확인할 수 있도록 실행하는 main 프로그램을 작성한다.
- [x] 모든 Subscriber 조건과 실행 결과도 함께 출력해서 gist에 저장한다.
- [x] 모든 Publisher 타입도 stringify() 함수로 자신을 설명할 수 있어야 한다.
- [x] EventManager 내부에는 그림처럼 이벤트 조건을 비교할 수 있는 규칙 데이터가 있어야 한다. 이벤트가 발생했을 때 Subscriber 구독자를 찾기 위한 데이터 구조와 표를 readme에 추가한다
- [x] 특정한 PublisherA가 EventManager를 호출했을 때 다른 PublisherB도 호출할 수 있도록 Worker Thread를 구현한다.
- [x] node 라이브러리 중에서 Worker Thread를 활용해서 동작을 분리한다
- [x] worker thread는 PublisherA 이벤트 전송 조건을 확인해서 모든 구독자를 호출할 때까지 담당한다

# 오피셜 체크리스트

- [x] EventManager 싱글톤 인스턴스 구현
- [x] Subscriber 추가 함수 구현 (여러 조건 수용)
- [x] Subscriber 제거 함수 구현 (여러 조건 수용)
- [x] postEvent 함수 구현
- [x] Worker Thread 동작 분리
- [x] 조건별 매칭한 subscriber 핸들러 동작
- [ ] 핸들러 내 completed flag 지원 여부
- [x] 구독 조건들 출력 함수 구현
- [ ] 비동기 async방식 postEvent 동작 구현
- [ ] 지연 delay방식 postEvent 동작 구현
- [ ] Subscriber 핸들러 처리 Event Emitter 동작 구현

# Subscriber 표

![subscriber_list](https://gist.githubusercontent.com/essential2189/aa27f3d720a9cb46623d0fc2a45d7abb/raw/ce7f9db10e4b554142bc8e97922dcd513522260e/subscriber_list.png)

# 결과

![mission1](https://gist.githubusercontent.com/essential2189/aa27f3d720a9cb46623d0fc2a45d7abb/raw/2943521e9cd976d81a38b71407e39c9fcf812a95/mission1.png)

Multi thread라 출력 순서가 불안정할 수 있습니다.
![mission1_multi](https://gist.githubusercontent.com/essential2189/aa27f3d720a9cb46623d0fc2a45d7abb/raw/c29a7142d01e556414e3a170c38b39eb0bb27ae3/mission1_thread.png)

# 학습 메모

싱글톤
https://velog.io/@ggong/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%EC%8B%B1%EA%B8%80%ED%86%A4-%ED%8C%A8%ED%84%B4-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0

pub/sub
https://velog.io/@gyrbs22/node.js-Subscriber-Publisher
https://blog.sessionstack.com/how-javascript-works-the-publisher-subscriber-pattern-9edc62ef1a68

클로저
https://hanamon.kr/javascript-%ED%81%B4%EB%A1%9C%EC%A0%80/

worker
https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-workerthreads-%EB%AA%A8%EB%93%88
