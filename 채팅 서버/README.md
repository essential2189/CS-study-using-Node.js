# [학습 정리](https://essential-2189.notion.site/b50e3c17b9734932987e3d6bf4762f48)

# 체크리스트

- [x] 0.0.0.0 (ANY) 주소와 2022 포트 번호를 bind 하는 서버를 구현한다.

- [x] 서버 역할을 담당하는 클래스(또는 모듈)을 구현한다.

- [x] reuse를 위한 소켓 옵션을 지정한다.

- [x] client가 접속하면 최소 4자리 / 최대 1024 크기만큼 읽고, 받은 문자열을 그대로 다시 전송한다.

- [x] 새로운 client가 접속하면 어떤 IP와 Port 번호에서 접속했는지 client 정보를 콘솔 로그로 출력한다.

- [x] 서버에서 받았던 문자열을 전송 완료하고 소켓 연결을 disconnect 끊는다.

- [x] TCP 클라이언트를 별도로 구현하지 않고, 터미널에서 telnet 명령으로 접속해서 테스트한다.

- **checkin**
- [x] 클라이언트는 서버에 처음 연결하고 나면 checkin 요청을 보내야 한다

  - [x] checkin 데이터로 campId를 문자열로 전달한다

  - [x] 캠프아이디 범위는 J001 에서 J384 까지로 제한한다.

  - [x] 범위를 벗어나는 경우는 응답으로 실패를 알려줘야 한다

  - [x] 클라이언트는 캠프아이디가 범위를 벗어난 경우 재입력할 수 있어야 한다

  - [x] 이미 checkin 한 상태에서는 checkin을 할 수 없다

- [x] checkin을 할 때 서버에서는 그룹을 할당한다.

  - [x] 그룹은 최대 4명까지 가능해서 5명부터는 다른 그룹에 할당한다

  - [x] 그룹에서 빠져나가서 4명보다 작은 경우에는 재할당할 수 있다 (어떤 방식으로 구현해도 된다)

- [x] checkin 응답으로는 배정된 그룹 번호를 정수형으로 알려준다

- **checkout**
- [x] 특정 클라이언트가 checkout 요청을 보내면 이전에 checkin 했던 그룹에서 퇴장한다
- [x] 만약 해당 그룹에 다른 캠퍼가 한 명이라도 남아있다면, 누군가 퇴장했다는 것을 message로 알려준다
- [x] 클라이언트는 checkout 요청 후 응답을 받으면 연결을 끊는다.
- [x] 서버는 클라이언트가 checkout을 하지 않고 TCP 연결이 끊어져도 해당 연결은 checkout으로 동일하게 처리한다

- **mission**
- [x] 체크인 이후에는 mission요청을 보내서 키워드를 받을 수 있다

- [x] 데이터로는 day 몇 번째 미션인지 정수형으로 받는다

- [x] 서버에서는 정수형을 확인해서 다음과 같은 내용을 응답한다

- **peersession**
- [x] 피어세션 요청을 보내면 같은 그룹에 있는 사람들과 브로드캐스트를 할 수 있다

- [x] 요청 데이터로는 maxCount를 정수형으로 보낼 수 있다.

- [x] 사람들과 주고받을 수 있는 메시지 개수는 maxCount보다 클 수 없다

- [x] 최대 메시지 개수를 넘어가면 누군가 메시지를 보내도 서로에게 전달되지 않는다

- **complete**
- [x] 피어세션 요청을 보낸 캠퍼가 complete를 보내면 피어세션을 멈출 수 있다

- [x] 다시 브로드캐스트를 할 수 없다

- **message**
- [x] 메시지 요청을 보내면 peersession 진행중인 경우는 그룹의 모두에게 브로드캐스트 되지만, 그렇지 않을 경우는 무시된다

- [x] 메시지 요청의 데이터는 text로 문자열을 받을 수 있다

- **direct**
- [x] 직접 특정한 캠퍼에서 메시지를 보낼 수 있는 기능이다.

- [x] 다이렉트 요청의 데이터로는 campId, text를 문자열로 받는다

- [x] 만약 수신할 대상 캠퍼가 체크인을 하지 않은 경우는 보내지 않는다

- [x] 체크인을 한 상태라면 text 메시지를 전달한다

# 오피셜 체크리스트

**에코 서버 관련**

- [x] TCP 에코 서버 bind
- [x] 클라이언트 접속 후 정보 출력
- [x] 클라이언트에서 보낸 데이터 재전송
      **챌린지 서버 관련**
- [x] checkin 요청 구현
  - [x] 캠프 아이디 범위 확인 + 응답
  - [x] 그룹 할당 후 그룹 번호 전달
- [x] checkout 요청 구현
  - [x] 그룹 내 다른 캠퍼에게 퇴장 안내
  - [x] TCP 연결 종료시 checkout 처리
- [x] mission 요청 구현
  - [x] day 확인후 키워드 전송
- [x] peersession 요청 구현
  - [x] 그룹내 브로드캐스트 시작
- [x] complete 요청 구현
  - [x] 그룹내 브로드캐스트 종료
- [x] message
  - [x] 피어세션 진행중에 그룹내 브로드캐스트
  - [x] 그 외에는 무시
- [x] direct 요청 구현
  - [x] 특정 캠퍼에게 전송
        **챌린지 클라이언트 관련**
- [x] 캠프아이디 입력 후 checkin 요청 campId 전송
  - [x] 활동 시각 저장
- [x] checkout 전송후 연결 해재
  - [x] 체크인부터 체크아웃까지 활동 시간 출력
- [x] peersession 요청 maxCount 전송
- [x] complete 요청 전송
- [x] message 요청 text 전송
- [x] direct 요청 campId, text 전송

# 결과

### TCP 에코 서버

`mission.mjs`

![mission1.png](https://gist.githubusercontent.com/essential2189/b2b60a851f6cbe79db4f23f22b4de65f/raw/b52d6848c08a1bb80e16a72e4d96374e51123040/mission1.png)

### 챌린지 서버 만들기

`client.mjs` `server.mjs`

![mission2.png](https://gist.githubusercontent.com/essential2189/b2b60a851f6cbe79db4f23f22b4de65f/raw/b52d6848c08a1bb80e16a72e4d96374e51123040/mission2.png)

:exclamation:
콘솔 입력이 일정 수치를 넘으면 나타나는 경고 문구입니다. 경고일뿐 해당 문구가 나타나도 정상 작동합니다. (학습메모 참고)

![warning.png](https://gist.githubusercontent.com/essential2189/b2b60a851f6cbe79db4f23f22b4de65f/raw/b52d6848c08a1bb80e16a72e4d96374e51123040/warning.png)

# 학습 메모

telnet
https://velog.io/@stthunderl/telnet-%EB%A7%A5%EB%B6%81%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EC%98%88%EC%A0%9C

tcp socket
https://gist.github.com/graphicbeacon/10422384
https://mylko72.gitbooks.io/node-js/content/chapter8/chapter8_3.html

warning: possible EventEmitter memory leak detected. 11 listeners added. Use emitter.setMaxListeners() to increase limit.
https://stackoverflow.com/questions/9768444/possible-eventemitter-memory-leak-detected
