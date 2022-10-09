## ❗  실행시 주의 사항

- `Window` 환경에선 동작 안 할 수도 있습니다.
- 만약 동작 안할 경우, 슬랙 메시지 주시면 원격 열어드리겠습니다.
- 직관적인 결과 확인을 위해 `.gif` 첨부했습니다.

# 체크리스트

### **init 명령어 요구사항**

명령 형식은 `mit init 디렉토리명` 이다.

- [x] 디렉토리 아래에 `.mit` 하위 디렉토리를 만든다.
  - [x] 오브젝트 : `디렉토리명/.mit/objects/` 또는 윈도우 `디렉토리명\.mit\objects\`
  - [x] 인덱스 : `디렉토리명/.mit/index/` 또는 윈도우 `디렉토리명\.mit\index\`

### **commit 명령어 요구사항**

명령 형식은 `mit commit 디렉토리명` 이다.

- [x] 디렉토리에서 전체 파일 목록을 탐색하고, 각 파일 내용에 대한 sha256 해시 값을 비교한다.
- [x] 처음 commit 이거나 해시값이 달라진 경우는 아래 동작을 진행한다.

**<blob 오브젝트>**

- [x] 파일별로 blob 오브젝트를 생성한다.
  - [x] 해시값 앞에 8자리를 objects 하위 디렉토리로 생성한다.
  - [x] 나머지 부분을 파일명으로 (위에서 만든 해시값 앞자리 디렉토리에) 저장한다.
  - [x] blob 오브젝트 파일 내용은 원본 파일을 zlib로 압축해서 저장한다.

**<tree 오브젝트>**

- [x] blob 파일에 대한 기록은 tree 오브젝트를 objects 아래에 blob 규칙과 동일하게 생성한다.
  - [x] tree 오브젝트는 blob마다 `blob해시값, 압축후 파일크기, 파일명` 순서로 한 줄씩 문자열로 기록한다.
  - [x] 변경된 파일이 3개면 3줄이 생겨야 한다 .
  - [x] 작성한 tree 오브젝트 내용을 기준으로 sha256 해시값으로 blob와 동일하게 파일명을 만든다.

**<commit 오브젝트>**

- [x] 커밋할 때마다 이전 트리와 현재 트리를 포함하는 commit 오브젝트를 objects 아래에 생성한다.
  - [x] commit 오브젝트는 2가지 정보를 포함한다.
  - [x] 1번째줄은 `이전 tree 해시값, 현재 tree 해시값`
  - [x] 2번째줄은 `날짜`
  - [x] 작성한 commit 오브젝트 내용을 기준으로 sha256 해시값으로 blob와 동일하게 파일명을 만든다.
- [x] 커밋 기록을 index에 기록한다.
  - [x] `.mit/index/commits` 파일에 시간 역순으로 커밋 해시값을 한 줄씩 기록한다. 마지막 커밋이 스택 형태로 위에 추가한다.

### **log 명령어 요구사항**

명령 형식은 `mit log 디렉토리명` 이다.

- [x] `디렉토리명/.mit/index/commits` 에서 커밋을 찾아서 이력을 출력한다.
- [x] commit 마다 현재 tree를 확인해서 변경된 파일명을 함께 표시한다.

# 결과

용량때문에 3번에 나눠서 올립니다.

`mit init`

![init.gif](https://gist.githubusercontent.com/essential2189/a4c6813214ce940f67c37abed4eb139d/raw/4a18f577b87582dbe8f7c6b61b0ba6db482433e8/init.gif)

---

`mit commit` -> `mit log ` -> `파일 수정` -> `mit commit` -> `mit log `

![commit.gif](https://gist.githubusercontent.com/essential2189/a4c6813214ce940f67c37abed4eb139d/raw/4a18f577b87582dbe8f7c6b61b0ba6db482433e8/commit.gif)

---

1. `mit init` : 풀더 생성
2. apple.txt, test.txt 풀더에 넣기
3. `mit commit` : 새로 추가한 파일 커밋
4. `mit log ` : 로그 확인
5. `mit commit` : 변경 사항 없음
6. test.txt 파일 내용 수정
7. `mit commit` : test.txt 커밋
8. `mit log ` : 로그 확인

![result.gif](https://gist.githubusercontent.com/essential2189/a4c6813214ce940f67c37abed4eb139d/raw/bebe736ebffcf67b6887ce8102d4e826bf648a23/result.gif)

# 학습 메모

crypto
https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-crypto-%EB%AA%A8%EB%93%88-%EC%95%94%ED%98%B8%ED%99%94#%EC%96%91%EB%B0%A9%ED%96%A5_%EC%95%94%ED%98%B8%ED%99%94_%EB%B0%A9%EB%B2%95

mkdir
https://www.geeksforgeeks.org/node-js-fs-mkdir-method/

\_\_dirname is not defined in ES module scope
https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope

모든 파일 갖고오기
https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j/54387221#54387221

파일의 hash 값 얻기
https://ilikekillnerds.com/2020/04/how-to-get-the-hash-of-a-file-in-node-js/

파일 쓰기, 삭제
https://3dmpengines.tistory.com/1971
https://any-ting.tistory.com/21

풀더 만들면서 파일 쓰기
https://codezup.com/create-directory-using-file-system-node-js-tutorial/

파일 사이즈 구하기
https://stackoverflow.com/questions/42363140/how-to-find-the-size-of-the-file-in-node-js

zlib
https://bluebreeze.co.kr/1172
https://stackoverflow.com/questions/7625251/compression-and-decompression-of-data-using-zlib-in-nodejs

buffer
https://hak0205.tistory.com/151
https://webruden.tistory.com/946

object deep copy
https://velog.io/@sdg9670/JavaScript-%EA%B0%9D%EC%B2%B4-%EB%B3%B5%EC%82%AC-Object-Copy

현재 날짜 구하기
https://hianna.tistory.com/325

파일 맨위에 쓰기
https://stackoverflow.com/questions/17586831/node-js-how-to-insert-string-to-beginning-of-file-but-not-replace-the-original-t

set utf8
https://stackoverflow.com/questions/46175144/how-to-set-file-encoding-in-node-js
