# 체크리스트

### ❗체크리스트를 하나씩 완료할 때마다 소스와 실행 결과는 gist에 commit한다.

## 가상머신 리눅스 - run.sh

- [x]  **Day01 버그 수정**
  
- [x]  **가상 환경에 리눅스 설치**

![ubuntu.png](https://gist.githubusercontent.com/essential2189/01c5c4c2f67ae11e977753c443ff2e8d/raw/95042c6c77c612e456539493149df69e016b629d/ubuntu.png)

- [x]  **ssh 설정**

![ssh.png](https://gist.githubusercontent.com/essential2189/01c5c4c2f67ae11e977753c443ff2e8d/raw/95042c6c77c612e456539493149df69e016b629d/ssh.png)

- [x]  **root 계정 이외에 본인이 접속할 계정 추가**

![add_user.png](https://gist.githubusercontent.com/essential2189/01c5c4c2f67ae11e977753c443ff2e8d/raw/95042c6c77c612e456539493149df69e016b629d/add_user.png)

- [x]  **본인 계정에 대한 패스워드 설정**
- [x]  **로컬 컴퓨터에서 가상 환결 리모트 컴퓨터에 ssh로 접속해서 본인 계정으로 로그인**

![ssh_login.png](https://gist.githubusercontent.com/essential2189/01c5c4c2f67ae11e977753c443ff2e8d/raw/95042c6c77c612e456539493149df69e016b629d/ssh_login.png)

- [x]  **본인 계정에서 `/monitoring` 디렉토리를 생성하고 `764` 모드로 접근 권한을 바꿔서, 본인 계정으로 쓸 수 있도록 설정**

![mkdir_monitoring.png](https://gist.githubusercontent.com/essential2189/01c5c4c2f67ae11e977753c443ff2e8d/raw/95042c6c77c612e456539493149df69e016b629d/mkdir_monitoring.png)

- [x]  **가상 환경에서 터미널을 열고 `/monitoring` 경로에 대해 권한을 확인하는 화면을 캡처**

![monitoring.png](https://gist.githubusercontent.com/essential2189/01c5c4c2f67ae11e977753c443ff2e8d/raw/95042c6c77c612e456539493149df69e016b629d/monitoring.png)

- [x]  **가상 환경에 오늘 날짜 + 서울 시간대로 지정해서 로컬과 가상 환경이 동일하도록 맞춘다**
- [x]  **가상 환경에서 터미널을 열고 date 명령으로 오늘 날짜를 출력한 상태로, 화면을 캡처**

![date.png](https://gist.githubusercontent.com/essential2189/01c5c4c2f67ae11e977753c443ff2e8d/raw/95042c6c77c612e456539493149df69e016b629d/date.png)

- [x]  **가상 환경에 node.js 를 설치하고 버전을 확인**

![nodejs.png](https://gist.githubusercontent.com/essential2189/01c5c4c2f67ae11e977753c443ff2e8d/raw/95042c6c77c612e456539493149df69e016b629d/nodejs.png)

- [x]  **어제 작성한 day1 미션 js파일을 복사해서 실행한다**

![scp.png](https://gist.githubusercontent.com/essential2189/01c5c4c2f67ae11e977753c443ff2e8d/raw/0fcddf256a323c3b1443978b5620846f4e481101/scp.png)

![sh.png](https://gist.githubusercontent.com/essential2189/01c5c4c2f67ae11e977753c443ff2e8d/raw/42c00295cb5ae7a2c3cdb7f09ba654a46e12bb61/sh.png)

***

## 쉘 스크립트 - cpu_check.sh
- [x] **CPU 사용률을 cat 명령으로 가져와서 user 모드 사용률을 계산한 후 환경 변수에 저장하는 스크립트를 만든다**

- [x] **crontab 동작 방식을 확인하고 아래 조건을 설정한다**

- [x] **위에 작성한 걸 활용해서 매 1분마다 실행하도록 자동화한다**

- [x] **3번 연속으로 CPU 사용률이 70%가 넘으면 한 번만 다음 명령을 실행한다**

- [x] **알림을 보낼 때 마다 /monitoring 폴더에 YYYYMMDD-HHMMSS 형식으로 빈파일을 생성한다**

- [x] **CPU 사용률을 강제로 70% 이상 높이는 방법을 찾아서 확인한다**

### 설계 방법

1. 먼저 read를 통해 /proc/stat의 모든 정보를 갖고온다.
2. 그 후에 활성도와 전체를 구분해 나누어줌으로서 사용률을 구한다.
3. 그 후에 사용률이 70을 넘을 경우 check.txt 파일에 0을 추가한다.
4. 만약 check.txt 파일의 0의 갯수가 3을 넘길 경우.
   1. curl 명령어를 실행한다.
   2. /monitoring 풀더에 로그를 YYYYMMDD-HHMMSS.txt 형식으로 저장.
   3. 그 후에 check.txt를 초기화해준다.
5. 이를 crontab을 통해 1분마다 반복한다.

ref.https://stackoverflow.com/questions/26791240/how-to-get-percentage-of-processor-use-with-bash

### 결과
**cpu stress를 10분간 주어 3분마다 총 3개의 log가 나왔다.**

![cpu_result.png](https://gist.githubusercontent.com/essential2189/01c5c4c2f67ae11e977753c443ff2e8d/raw/986ed0de0d58c1a0174fe93dcf0db940d6524d92/cpu_result.png)
![slack.png](https://gist.githubusercontent.com/essential2189/01c5c4c2f67ae11e977753c443ff2e8d/raw/d19d5bae371c418b27a60f48072c5fb8bdf9f8f1/slack.png)

***

# 학습 메모

M1에 ubuntu 설치하기
https://ssunw.tistory.com/entry/M1-mac-%EA%B0%80%EC%83%81%ED%99%98%EA%B2%BD%EC%97%90-Linux-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0UTM-Ubuntu

ubuntu 접근 권한
https://mans-daily.tistory.com/entry/%EB%A6%AC%EB%88%85%EC%8A%A4UbuntuCentOS-Permission%EC%A0%91%EA%B7%BC%EC%A0%9C%EC%96%B4-%EC%A0%91%EA%B7%BC%EA%B6%8C%ED%95%9C-%ED%99%95%EC%9D%B8-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0-%EB%B0%8F-%EC%86%8C%EC%9C%A0%EA%B6%8C%EC%9E%90-%EC%86%8C%EC%9C%A0%EA%B7%B8%EB%A3%B9-%ED%99%95%EC%9D%B8-%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0

파일 또는 풀더 소유자 변경
https://itworld.gmax8.com/24

CPU 부하 주는법
https://medium.com/sjk5766/linux-cpu-%EA%B0%95%EC%A0%9C%EB%A1%9C-%EB%86%92%EC%9D%B4%EB%8A%94-%EB%B0%A9%EB%B2%95-8f47843acf9d

CPU 사용률 스크립트 예시
https://stackoverflow.com/questions/26791240/how-to-get-percentage-of-processor-use-with-bash

쉘 스크립트 여러 문법
https://codechacha.com/ko/category/bash/

string lenght
https://www.geeksforgeeks.org/how-to-find-length-of-string-in-bash-script/

crontab
https://wlsvud84.tistory.com/32
https://asufi.tistory.com/entry/Linux-%ED%81%AC%EB%A1%A0-Cron-%ED%81%AC%EB%A1%A0%ED%83%ADCrontab-%EC%82%AC%EC%9A%A9%EB%B2%95

리눅스 파일명 날짜로 하는법
https://webisfree.com/2020-07-01/%EB%A6%AC%EB%88%85%EC%8A%A4-%EC%98%A4%EB%8A%98-%EB%82%A0%EC%A7%9C%EC%9D%98-%ED%8C%8C%EC%9D%BC-%EC%83%9D%EC%84%B1%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-%EB%B0%8F-%EC%98%88%EC%A0%9C

쉘 스크립트 string to int
https://unix.stackexchange.com/questions/232384/argument-string-to-integer-in-bash