## ❗  실행시 주의 사항

- 첨부된 [`package.json`](https://gist.githubusercontent.com/essential2189/000456a89356a2415b31df39aa50056e/raw/0458fca654abee091e919bf6feaed9f48968c5dd/package.json)을 이용해주세요.
- 터미널에 `npm install package.json`을 하시면 손쉽게 설치 가능합니다.

- 통신할 때 출력이 겹쳐서 2개로 나눴습니다.
  - 전송 계층 : `send_main.mjs`(출력) <-> `send(reciver).mjs`
  - 수신 계층 : `recive_main.mjs` <-> `recive.mjs`(출력)
- 서로 대칭되는 파일은 같은 파일이며 출력을 어디 기준으로 하는가 차이입니다.

  - `send_main.mjs`==`recive_main.mjs` `send(reciver).mjs`==`recive.mjs`

- 내용이 있는 `.txt` 파일을 생성 후 입력과정에서 파일명을 입력해주세요.
  <br/><br/><br/>

# 체크포인트

### 전송 계층

1. 물리 계층 (Physical Layer)

- [x] 전송하는 프레임을 바이트 단위로 변경해서 물리적으로 전송되는 것을 16진수 문자열을 생성한다.
- [x] 생성한 문자열 내용을 출력해야 한다
- [x] 물리 계층에서 생성한 값을 다음 단계Rx 모듈의 물리 계층 입력으로 전달한다

2. 데이터링크 계층 (Data Link Layer)

- [x] MAC 계층의 동작을 구현해야 한다.
- [x] 다음과 같은 순서로 MAC 헤더 붙여서 프레임을 물리 계층으로 전달한다.
  - [x] 수신 Destination MAC 주소
  - [x] 발신 Source MAC 주소
- [x] 데이터 링크 계층 값을 출력해야 한다

3. 네트워크 계층 (Network Layer)

- [x] IP 계층의 동작을 구현해야 한다. 자신의 IP를 발신용 Source IP로 지정한다. 수신용 Destination IP는 Rx IP 주소를 고정한다.
- [x] IP 헤더 값은 다음과 같이 구성한다.
  - [x] 발신 IP 주소 문자열
  - [x] 수신 IP 주소 문자열
- [x] 아래처럼 4계층에서 받은 값과 IP 헤더를 포함해서 데이터링크 계층으로 전달한다.
  - [x] 출력 형식은 세그먼트와 헤더를 구분할 수 있으면 어떤 형태로든 무방하다.

4. 전송 계층 (Transport Layer)

- [x] TCP 계층의 동작을 구현해야 한다. 발신용 Source 포트번호를 10,000번부터 연속된 번호로 하나씩 사용한다. 수신 Destination 포트번호는 1000 이하 숫자로 하나를 고정한다.
- [x] TCP 계층은 다른 TCP 계층에 데이터를 보내려면 우선 연결을 해야 한다.
  - [x] 연결 과정은 데이터 없이 SYN, SYN+ACK, ACK 를 3-way Handshake 방식으로 주고 받아야 한다.
  - [x] SYN에 포함된 발신자 연속 번호보다 SYN+ACK 받을 때 Ack 번호는 +1 되어 있어야 한다.
  - [x] SYN+ACK 이후 ACK를 보낼 때 연속 번호는 앞서 받은 SYN+ACK의 Ack 번호와 동일하고, Ack 번호는 SYN+ACK의 연속번호보다 +1 되어 있어야 한다.
- [x] 전송하려는 데이터가 100보다 크면 100단위로 세그먼트(segment)로 나눠서 네트워크 계층으로 전달한다. 각 세그먼트마다 TCP 헤더를 붙여야 한다.
- [x] TCP 헤더 값은 다음과 같이 구성한다.
  - [x] 발신 Source 포트 번호
  - [x] 수신 Destination 포트 번호
  - [x] 고유한 연속 번호 Sequence Number
  - [x] 고유한 확인 번호 Ack Number
  - [x] 패킷 종류 : SYN , SYN+ACK , ACK , DATA
  - [x] DATA 세그먼트 여부 : True(세그먼트로 나눠진 경우), False(세그먼트 마지막인 경우)
  - [x] 헤더 제외한 데이터 길이 Content-Length

5. 세션 계층 (Session Layer)

- [x] 세션 계층에서는 고유한 UUID를 생성해서 전송하려는 데이터에 Session-Id 항목을 추가한다.
- [x] Title 보다 아래 첨부파일을 구분하는 "\r\n" 사이에 추가한다.
- [x] UUID Vesion4 규격으로 생성하는 규칙을 찾아서 학습하고 생성하는 모듈 또는 라이브러리로 생성한다.

6. 표현 계층 (Presentation Layer)

- [x] 이 계층에서는 첨부 파일 부분만 BASE64로 인코딩해서 표현해야 한다. BASE64 인코딩을 직접 바닐라 자바스크립트로 구현한다.
- [x] 인코딩 이후 MAIL 데이터를 표시한다.

7. 응용 계층 (Application Layer)

- [x] 프로그램을 시작하면 아래처럼 from 주소, to 주소, title 제목과 첨부 파일 이름을 입력한다.
- [x] 입력한 from, to, title, file은 다음과 같은 순서로 합쳐서 표현하기 위해서 표현 계층으로 전달한다.
- [x] 입력하는 메일 도메인 주소는 TCP/IP 주소를 찾는 용도가 아니라 내용을 전달하기 위한 수단으로만 사용한다.
- [x] 첨부 파일 내용은 이미지처럼 문자열로 표현할 수 없는 바이너리가 포함될 수 있어서, 표현 계층에서 인코딩을 해서 합쳐야 한다.
  - [x] 꼭 첨부파일 내용을 그대로 출력할 필요는 없고, 파일 크기 정도만 출력해도 된다.
  - [x] 아래 예제에서 \r, \n, \t 등은 컨트롤 문자로 ASCII 코드로 \r => 0x0D, \n => 0x0A, \t => 0x09 값이다.

### 수신 계층

1. 물리 계층 (Physical Layer)

- [x] 전달받은 16진수 바이트와 문자열로 변환해서 출력하고, 데이터 링크 계층으로 전달한다.

2. 데이터링크 계층 (Data Link Layer)

- [x] MAC 계층의 동작을 구현해야 한다.
- [x] 헤더를 제거하고 상위 계층으로 전달한다.
- [x] 만약 헤더에 포함된 Destination MAC 주소가 Rx 고유한 주소가 아니라면 해당 프레임은 무시해야 한다.

3. 네트워크 계층 (Network Layer)

- [x] IP 계층의 동작을 구현해야 한다.
- [x] IP 헤더를 확인하고 자신의 IP가 맞는지 확인한다. 자신의 Tx IP 주소가 아니라면 해당 패킷은 무시해야 한다.
  - [x] 무시한 패킷에 대한 별도 안내도 출력한다.

4. 전송 계층 (Transport Layer)

- [x] TCP 계층의 동작을 구현해야 한다.
- [x] SYN 패킷을 받으면 SYN+ACK를 보낸다.
  - [x] 연속 번호와 ACK 번호 규칙을 지켜야 한다.
- [x] DATA 패킷을 받으면 ACK를 보낸다.
  - [x] 연속 번호와 ACK 번호 규칙을 지켜야 한다.
- [x] 세그먼트가 나눠져 있으면 여러 번 나눠받고 마지막 데이터를 받아서 합쳐서 다음 계층으로 전달한다.

5. 세션 계층 (Session Layer)

- [x] 세션 계층에서는 받은 데이터에 Session-Id 항목을 확인해서 출력한다.

6. 표현 계층 (Presentation Layer)

- [x] 이 계층에서는 첨부 파일 부분만 BASE64로 디코딩해서 다시 복원해서 파일로 저장한다.
- [x] 저장한 파일이 보낸 첨부 내용과 일치하는 지 확인한다.

7. 응용 계층 (Application Layer)

- [x] 최종적으로 from 주소, to 주소, title 제목과 첨부 파일 이름을 출력한다.

# 오피셜 체크포인트

- [x] 전송 응용 계층 메일 입력 구현

- [x] 전송 표현 계층 BASE64 인코딩 구현

- [x] 전송 세션 계층 UUID 추가 구현

- [x] 전송 계층 3-way 핸드쉐이크 (SYN, ACK, DATA) 구현

- [x] 전송 계층 세그멘트 나누기 처리 구현

- [x] 네트워크 계층 헤더 포함 구현

- [x] 데이터링크 계층 헤더 포함 구현

- [x] 물리계층 문자열-16진수-문자열 변환 구현

- [x] 수신 데이터링크 계층 헤더 제거, MAC 주소 비교 구현

- [x] 수신 네트워크 계층 헤더 제거, IP 주소 비교 구현

- [x] 수신 전송 계층 3-way 핸드쉐이크 (SYN+ACK, DATA+ACK) 구현

- [x] 수신 전송 계층 세그멘트 합치기 처리 구현

- [x] 수신 UUID 출력 세션 계층 구현

- [x] 수신 표현 계층 BASE64 디코딩 구현

- [x] 수신 응용 계층 메일 출력, 파일 저장 구현

# 결과 (콘솔 입력 과정 생략 & sleep(500ms)가 걸려 있음)

### Sender

![sender.gif](https://gist.githubusercontent.com/essential2189/ecf165c9372a814f1509b7200c9b1568/raw/4d36bc576bd421de9d031e9ff0b6be178f00160a/sender.gif)

### Reciver

![revice.gif](https://gist.githubusercontent.com/essential2189/ecf165c9372a814f1509b7200c9b1568/raw/4d36bc576bd421de9d031e9ff0b6be178f00160a/recive.gif)

# 학습 메모

base64 encoding, decoding
https://jsikim1.tistory.com/167

uuid
https://velog.io/@hojin9622/uuid%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EA%B3%A0%EC%9C%A0%ED%95%9C-%EA%B0%92-%EC%83%9D%EC%84%B1

ArrayBuffer to Hex
https://stackoverflow.com/questions/40031688/javascript-arraybuffer-to-hex

multi dimention array to string
https://stackoverflow.com/questions/48287178/nested-array-to-string-javascript
