## ❗ 실행시 주의 사항

- 본 프로젝트는 `import`을 사용했습니다.
- package.json에 `"type": "module"`을 추가해주세요.
- - [`package.json`](https://gist.githubusercontent.com/essential2189/22514c9ca3cfb5b02aee13884fc602f2/raw/2ef1ee254e9c270bc885d1c48e7d2a2a1d357ebe/package.json)

# 체크포인트

### 프로세스 스케줄링 시각화

- [x] 프로세스 종류를 A부터 F까지 6개 정하고, 프로세스 마다 최대 동작 시간을 겹치지 않도록 결정한다.
- [x] 우리가 목표로 하는 운영체제는 한 번에 프로세스 하나씩만 1초동안만 실행할 수 있다. 해당 프로세스 외 다른 프로세스는 실행하지 않는다.
- [x] 1초 이후에는 같은 프로세스가 아니라 다른 프로세스를 실행해야 한다. 만약 프로세스가 1개만 남은 경우 반복해서 같은 프로세스를 실행할 수 있다.
- [x] 프로세스 상태
  - [x] 준비ready
  - [x] 실행running
  - [x] 대기waiting
  - [x] 종료terminated
- [x] 이 프로그램을 시작하면, 랜덤으로 프로세스 3개를 생성하고 대기 큐에 추가한다.
  - [x] 프로세스는 ready 또는 waiting 상태에서만 실행상태로 바뀔 수 있다.
  - [x] 누적 동작 시간이 최대 동작 시간만큼 실행한 프로세스는 terminated 상태로 바뀐다.
  - [x] 누적 동작 시간이 최대 동작 시간보다 작으면 다시 waiting 상태가 된다.
- [x] 프로세스마다 작업 정보를 포함하는 데이터 구조 또는 타입을 선언한다.
  - [x] 단지 출력을 하기 위한 프로그램을 작성하는 게 아니라, 프로세스 타입을 선언하고 프로세스마다 1초씩 동작하는 구조를 구현해야 한다.
- [x] 프로그램은 1초마다 전체 프로세스 상태와 대기 시간과 누적 실행 시간을 표시한다.
- [x] 프로그램은 모든 프로세스가 종료 상태가 되면 종료한다.
- [x] 프로그램에서 구현해야 하는 스케줄링 방식은 다음과 같다.
  - [x] 기한부 스케줄링 (deadline scheduling)
  - [x] 고정 우선순위 스케줄링 (static priority scheduling)
  - [x] 라운드 로빈 스케줄링 (Round Robin scheduling)

### 스레드 스케줄링

- [x] 이전 단계 요구사항을 만족한 상태로 스레드가 추가되는 방식으로 구현해야 한다.
- [x] 각 프로세스는 스레드를 만들 수 있고, 스레드가 있으면 스레드마다 실행 시간을 2초 단축하는 효과가 있다고 가정한다.
- [x] 프로그램을 시작할 때 프로세스 별로 최대 작업 시간을 2로 나눴을 때 몫만큼 스레드를 생성한다.
- [x] 프로그램이 시작하면 랜덤으로 프로세스 3개를 생성하고, 스레드 개수도 표시한다.
- [x] 프로그램은 모든 프로세스 작업이 끝나면 종료한다.
- [x] 글로벌 변수 설정

# 결과

<details>
<summary>프로세스 스케줄링 시각화</summary>
비교를 위해 동일한 프로세스로 설정하여 실행했습니다. 실제로는 랜덤 프로세스로 작동합니다.

![setting](https://gist.githubusercontent.com/essential2189/bc22890f5f301c17e51c5eeb8109fe76/raw/900876d281c49a27c065f4b2d5ef7febcaae2f54/setting.png)
![roundrobin_result.png](https://gist.githubusercontent.com/essential2189/bc22890f5f301c17e51c5eeb8109fe76/raw/900876d281c49a27c065f4b2d5ef7febcaae2f54/roundrobin_result.png)
![deadline_result.png](https://gist.githubusercontent.com/essential2189/bc22890f5f301c17e51c5eeb8109fe76/raw/900876d281c49a27c065f4b2d5ef7febcaae2f54/deadline_result.png)
![priority_result.png](https://gist.githubusercontent.com/essential2189/bc22890f5f301c17e51c5eeb8109fe76/raw/900876d281c49a27c065f4b2d5ef7febcaae2f54/priority_result.png)

</details>

<details>
<summary>스레드 스케줄링</summary>

![RR_thread.png](https://gist.githubusercontent.com/essential2189/bc22890f5f301c17e51c5eeb8109fe76/raw/55e139f887d89e47b03e1c2982116845727b4dea/RR_thread.png)
![DL_thread.png](https://gist.githubusercontent.com/essential2189/bc22890f5f301c17e51c5eeb8109fe76/raw/55e139f887d89e47b03e1c2982116845727b4dea/DL_thread.png)
![PR_thread.png](https://gist.githubusercontent.com/essential2189/bc22890f5f301c17e51c5eeb8109fe76/raw/55e139f887d89e47b03e1c2982116845727b4dea/PR_thread.png)

</details>

# 학슴 메모

random
https://hianna.tistory.com/454

if (function === true)
https://bobbyhadz.com/blog/javascript-check-if-function-returns-true

object.values()
https://mine-it-record.tistory.com/376

sleep(), wait()
https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90-sleep-wait-%EB%8C%80%EA%B8%B0-%ED%95%A8%EC%88%98-%EC%93%B0%EA%B8%B0

소수점 처리
https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=k97b1114&logNo=220508740594

sort by value
https://kyounghwan01.github.io/blog/JS/JSbasic/object-sort/#for-in%E1%84%86%E1%85%AE%E1%86%AB-%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC-array-%E1%84%83%E1%85%A1%E1%84%89%E1%85%B5-%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%B3%E1%86%AF%E1%84%80%E1%85%B5

worker
https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-workerthreads-%EB%AA%A8%EB%93%88
https://codingcoding.tistory.com/1310

worker간의 global variable
https://stackoverflow.com/questions/21892985/is-there-any-way-to-share-variables-between-multiple-workers-in-nodejs
https://stackoverflow.com/questions/39583958/conditional-export-in-es2015
https://stackabuse.com/using-global-variables-in-node-js/

싱글톤
https://seunghyunson.tistory.com/28
