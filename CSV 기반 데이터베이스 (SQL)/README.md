# 체크리스트

- **CREATE TABLE 구문**
- [x] 테이블을 생성할 때 테이블 이름(table_name)과 동일한 CSV 파일을 생성한다.
- [x] 지원하는 datatype은 숫자 Numeric, 문자열 String 만 지원한다.
- [x] 컬럼은 1개부터 최대 9개까지만 지원한다. 멀티라인은 지원하지 않아도 된다.
- [x] 내부적으로 중복을 허용하지 않도록 Numeric 타입 id 컬럼을 추가한다. 다른 값은 중복 가능하다고 가정한다.
- [x] 컬럼 이름은 띄어쓰기를 지원하지 않고, id라는 컬럼은 추가할 수 없다.
- [x] 모든 컬럼은 not null로 가정한다.
- [x] 만약 이미 파일이 있으면 실패 메시지를 표시한다.
- [x] CSV 파일은 콤마(,) 로 분리된 텍스트 포맷 데이터 파일이다.

  - [x] 순수 데이터만 있거나 헤더 또는 헤더와 밑줄이 있는 경우가 있지만, 여기서는 아래 포맷을 가진다고 가정한다.
  - [x] 문자열에 따옴표를 붙이지 않아도 된다.

- **INSERT INTO 구문**
- [x] 모든 컬럼은 not null로 가정하고 테이블에 컬럼 갯수와 일치하지 않으면 실패 메시지를 표시한다.
- [x] id 값은 1부터 시작해서 INSERT 할 때마다 자동으로 +1 하나씩 증가한다.
- [x] 숫자는 따옴표가 없고, 문자열은 따옴표가 있어야 한다.
- [x] 성공한 경우는 레코드 전체값을 출력한다.

- **DELETE FROM 구문**
- [x] 테이블에서 condition 조건이 맞는 **`모든`** 레코드를 삭제한다.
- [x] condition 은 컬럼 중에 하나만 넣을 수 있다. (AND, OR 등 복잡한 조건은 지원하지 않아도 된다)
- [x] 조건에 맞는 레코드가 없으면 실패 메시지를 표시한다.
- [x] 성공한 경우는 삭제한 레코드 전체값을 출력한다.
- [x] **`삭제를 진행한 경우 id 값들을 1부터 다시 재정렬 해준다.`**

  - id 값들을 재졍렬 해주는게 더 자연스러운거 같아서 추가 했습니다.

- **UPDATE 구문**
- [x] 테이블에서 condition 조건이 맞는 레코드에 특정 컬럼 값을 변경한다. 이 때 컬럼은 1개만 지정할 수 있다.
- [x] condition 은 컬럼 중에 하나만 넣을 수 있다.
- [x] 조건에 맞는 레코드가 없으면 실패 메시지를 출력한다.
- [x] 성공한 경우는 레코드 전체값을 출력한다.

- **SELECT FROM 구문**
- [x] 테이블에서 condition 조건이 맞는 레코드에 모든 레코드의 모든 컬럼을 출력한다.
- [x] condition 조건은 = 필수적으로, >, < 선택적으로 구현한다.
- [x] condition 은 컬럼 중에 하나만 넣을 수 있다.
- [x] 다음과 같이 조건에 맞는 레코드 개수를 표시한다.

- **DROP TABLE 구문**
- [x] 테이블 이름(table_name)과 동일한 CSV 파일도 같이 삭제한다.

- **REPORT TABLE 구문**
- [x] 테이블에 대한 요약 리포트를 출력한다.

  - [x] 최초 레코드는 id 값 중에서 가장 작은 값을, 마지막 레코드는 id 값 중에서 가장 큰 값을 출력한다.

- **EXPORT 구문**
- [x] 테이블에 대한 SELECT 처럼 조건에 맞는 레코드만 file_name CSV 파일로 저장한다.

  - [x] 기존에 같은 파일이 있어도 덮어쓰기한다.
  - [x] 조건에 맞는 데이터가 없을 경우 파일에 저장하지 않는다.

- **IMPORT 구문**
- [x] 기존의 CSV 파일에서 데이터를 가져와서 INSERT 한다.
  - [x] 만약 컬럼 개수가 일치하지 않으면 추가하지 않는다
  - [x] 기존에 데이터와 겹치는 항목은 추가하지 않아야 한다

# 오피셜 체크포인트

- [x] CREATE TABLE 구현 및 출력

- [x] CSV 파일 생성 및 저장

- [x] INSERT INTO 구현 및 출력

- [x] DELETE FROM 구현 및 출력

- [x] UPDATE 구현 및 출력

- [x] SELECT FROM 구현 및 출력

- [x] DROP TABLE 구현 및 출력

- [x] REPORT TABLE 구현 및 출력

- [x] EXPORT 구현 및 출력

- [x] IMPORT 구현 및 출력

- [x] 정상 동작을 구현한 구문에 대해서 실패에 대한 예외 처리 지원여부

# 결과

![mission1.png](https://gist.githubusercontent.com/essential2189/853e3a44f88cfaffd90929800f772ebf/raw/e58dc77c9fe1589650dc5d65c4e71647954221ad/mission1.png)

![mission2.png](https://gist.githubusercontent.com/essential2189/853e3a44f88cfaffd90929800f772ebf/raw/26694d066b51aa34e685469c48b034f36656963d/mission2.png)

# 학습 메모

csv
https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
https://velog.io/@azi_zero/write-csv-file
https://stackoverflow.com/questions/10227107/write-to-a-csv-in-node-js

fs
https://3dmpengines.tistory.com/1971

int string split using map
https://stackoverflow.com/questions/9914216/how-do-i-separate-an-integer-into-separate-digits-in-an-array-in-javascript

fs.unlink 파일 삭제
https://any-ting.tistory.com/21
