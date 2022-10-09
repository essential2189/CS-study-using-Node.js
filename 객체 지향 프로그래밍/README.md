## ❗ 실행시 주의 사항

- 본 프로젝트는 `prompt-sync` 를 사용했습니다.
- 본 프로젝트는 `import`을 사용했습니다.
- package.json에 `"type": "module"`을 추가해주세요
- 터미널에 `npm install package.json`을 하시면 손쉽게 설치 가능합니다.
- 또는 `npm install prompt-sync`를 이용하세요. [공식 사이트](https://www.npmjs.com/package/prompt-sync)

- [`package.json`](https://gist.githubusercontent.com/essential2189/9b3522cfe5f8a3ef279d487b15c6dd29/raw/f93a410a75888e3c7c4e3d4db9931a3c136796e1/package.json)

- `main.js`에서 실행 가능합니다.

# 체크포인트

- [x] Board는 현재 있는 말을 확인해서 흑과 백 점수를 출력한다.
  - [x] 색상별로 Pawn 1점, Bishop와 Knight 3점, Rook 5점, Queen은 9점으로 계산한다.
- [x] Board는 모든 말의 위치를 간접적으로 알 수 있다. display() 함수는 적절한 데이터 구조로 1-rank부터 8-rank까지 rank 전체를 리턴한다.
- [x] Board에서 return한 데이터 구조를 바탕으로 출력 형식을 담당하는 객체(혹은 모듈)에서 문자열 배열 바꾸고 체스판을 출력하도록 전달한다.
  - [x] 흑색 Pawn는 ♟ U+265F, Knight는 ♞ U+265E, Biship은 ♝ U+265D, Rook는 ♜ U+265C, Queen은 ♛ U+265B를 빈 곳은 "."을 표시한다.
  - [x] 백색 Pawn는 ♙ U+2659, Knight는 ♘ U+2658, Biship은 ♗ U+2657, Rook는 ♖ U+2656, Queen은 ♕ U+2655를 빈 곳은 "."을 표시한다.
  - [x] 예를 들어 초기화 상태에 Rook, Knight, Bishop, Queen이 있는 경우 1-rank는 **"♜♞♝.♛♝♞♜"** 가 된다.
- [x] 특정 위치에 특정 말을 생성하는 initPiece(type, position) 함수를 구현한다.
  - [x] 초기화할 때 1,2-rank는 흑백 체스말이, 7,8-rank는 백색 체스말이 위치한다.
  - [x] 체스말 초기 위치가 아니면 생성하지 않는다.
  - [x] 이미 해당 위치에 다른 말이 있으면 생성하지 않는다.
  - [x] 체스말 종류별로 최대 개수보다 많이 생성할 수는 없다.
  - [x] Pawn는 색상별로 8개. Knight, Bishop, Rook는 색상별로 2개, Queen는 색상별로 1개만 가능하다.
  - [x] 생성하지 않는 경우는 exception 예외처리로 상위에서 어떤 예외상황인지 판단한다.
- [x] 특정 위치에 특정 말을 생성하는 setPiece(type, position) 함수를 구현한다.
  - [x] initPiece()와 다르게 체스말은 어느 위치에 놓아도 상관없다.
  - [x] 이미 해당 위치에 다른 말이 있으면 생성하지 않는다.
  - [x] 체스말 최대 개수도 고려하지 않는다.
- [x] 특정 말을 옮길 때는 Board에서 제공하는 move(from, to) 함수를 사용한다.
  - [x] 같은 색상의 말이 to 위치에 다른 말이 이미 있으면 옮길 수 없다.
  - [x] 말을 옮길 수 있으면 true, 옮길 수 없으면 false를 리턴한다.
  - [x] 만약, 다른 색상의 말이 to 위치에 있는 경우는 기존에 있던 말을 제거하고 이동한다.
  - [x] 다른 색상의 말을 제거한 경우는 흑과 백 점수를 출력한다.

### **체스말 공통**

- [x] 체스말은 위치값을 Position 타입으로 갖는다.
  - [x] 꼭 Position 값을 다루기 위한 데이터 구조를 별도로 만든다.
  - [x] Position은 file은 A부터 H까지, rank는 1부터 8까지 입력이 가능하다.
  - [x] file과 rank 값은 enum으로 선언한다.
- [x] 체스말은 흑Black 또는 백White 둘 중에 하나여야 한다.
  - [x] 상태값으로 지정한다면 생성할 때 결정하고 변경할 수 없어야 한다.
  - [x] 타입으로 구분한다면 다형성으로 동작하도록 한다.
- [x] 체스말은 현재 위치 Position을 기준으로 이동할 수 있는 모든 위치를 리턴하는 possiblePositions() 함수를 제공한다.

### **Pawn 타입 요구사항**

- [x] 생성 위치는 흑색은 2-rank 또는 백색 7-rank에만 가능하다.
- [x] 백색은 더 작은 rank로 움직일 수 있고, 흑색은 더 큰 rank로 움직일 수 있다.
- [x] 체스 게임과 달리 처음에도 1칸만 움직일 수 있고, 다른 말을 잡을 때도 대각선이 아니라 직선으로 움직일 때 잡는다고 가정한다.
- [x] Pawn이 상대편 Rank에 도착하면 같은 색 Queen으로 변신한다.
  - 흑색 Pawn이 2-rank에서 시작해서 8-rank에 도착할 경우
  - 백색 Pawn이 7-rank에서 시작해서 1-rank에 도착할 경우

### **Bishop 타입 요구사항**

- [x] 생성 위치는 흑색은 C-1 과 F-1 에만 가능하고, 백색은 C-8 과 F-8 에만 가능하다.
- [x] 모든 색상이 놓여진 칸을 기준으로 대각선으로만 움직일 수 있다.

### **Rook 타입 요구사항**

- [x] 생성 위치는 흑색은 A-1 과 H-1 에만 가능하고, 백색은 A-8 과 H-8 에만 가능하다.
- [x] 모든 색상이 놓여진 칸을 기준으로 좌-우 또는 위-아래 방향으로 움직일 수 있다.

### **Queen 타입 요구사항**

- [x] 생성 위치는 흑색은 E-1에만 가능하고, 백색은 E-8 에만 가능하다.
- [x] 모든 색상이 놓여진 칸을 기준으로 대각선이 좌-우, 위-아래 방향으로 움직일 수 있다.

### **Knight 타입 요구사항**

- [x] 생성 위치는 흑색은 B-1 과 G-1 에만 가능하고, 백색은 B-8 과 G-8 에만 가능하다.
- [x] 모든 색상이 놓여진 칸을 기준으로 전진1칸+대각선1칸으로만 움직일 수 있다.
- [x] 체스 게임과 달리 전진하는 칸이 막혀있으면 움직일 수 없다.

# 결과

### 오피셜 체크포인트

- [x] Board 클래스 initPiece()와 setPiece() 구현
- [x] Board 클래스 move(from, to) 구현
- [x] Board 클래스 display() 구현 및 출력
- [x] Board 클래스 score() 점수 확인 구현
      <br/>
      ![board.png](https://gist.githubusercontent.com/essential2189/a0fc4a7611e59934f28a0961fb97eb0f/raw/d5f48d96af5ee2217e1bd5abc9adbf6dc414bba7/board.png)
      <br/>
- [x] 체스말 타입별 possiblePositions() 상속 또는 다형성으로 구현
  - 각 `Pawn.js`, `Rook.js`, `Queen.js`, `Knight.js`, `Bishop.js`의 코드 확인
- [x] Pawn 클래스 동작 구현
- [x] Pawn 클래스 상대편 Rank에서 Queen으로 변신 구현
      <br/>
      ![queen_code.png](https://gist.githubusercontent.com/essential2189/a0fc4a7611e59934f28a0961fb97eb0f/raw/d5f48d96af5ee2217e1bd5abc9adbf6dc414bba7/queen_code.png)
      <br/>
      white score : pawn(1) + rook(5) = 6
      <br/>
      black score : pawn(1) + rook(5) = 6
      <br/>
      ![queen.png](https://gist.githubusercontent.com/essential2189/a0fc4a7611e59934f28a0961fb97eb0f/raw/86ce5ea48e2708eec25c0f6a8aa1452e65b8bf71/queen.png)
      <br/>
- [x] Rook 클래스 동작 구현
- [x] Bishop 클래스 동작 구현
- [x] Queen 클래스 동작 구현
- [x] Knight 클래스 동작 구현
- [x] 프로그램 구조를 입력, 검증, 처리, 형식, 출력 단계로 구분해서 객체나 모듈로 구분
  - 입력 : `main.js` getInput() + main()
  - 검증 : `Pawn.js`, `Rook.js`, `Queen.js`, `Knight.js`, `Bishop.js`
  - 처리 : `Board.js` + `main.js`
  - 형식 : `Board.js` this.display() + const Dict
  - 출력 : `main.js` main()

### 예상결과 및 동작예시

![result.png](https://gist.githubusercontent.com/essential2189/a0fc4a7611e59934f28a0961fb97eb0f/raw/86ce5ea48e2708eec25c0f6a8aa1452e65b8bf71/result.png)

# 학습 메모

try-catch
https://ko.javascript.info/try-catch

기본값 매개변수
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Default_parameters

JS에서 enum 사용하는 법 -> `Object.freeze` 사용
https://sewonzzang.tistory.com/28

find, findindex, indexof
https://bbaktaeho-95.tistory.com/40
https://gurtn.tistory.com/78
https://www.techiedelight.com/ko/find-index-element-array-javascript/
