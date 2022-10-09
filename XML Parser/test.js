const str = "<!DOCTYPE html>" + '<HTML lang="ko">' + "<BODY>" + "<P>" + "BOOST" + '<IMG SRC="codesquad.kr">' + "</IMG>" + "<BR/>" + "</P>" + "</BODY>" + "</HTML>";

const str2 =
  "<HTML>" +
  "<HEAD>" +
  "<TITLE>Your Title Here</TITLE>" +
  "</HEAD>" +
  '<BODY BGCOLOR="FFFFFF">' +
  '<CENTER><IMG SRC="clouds.jpg" ALIGN="BOTTOM"> </CENTER>' +
  "<HR>" +
  '<a href="http://somegreatsite.com">Link Name</a>' +
  "is a link to another nifty site" +
  "<H1>This is a Header</H1>" +
  "<H2>This is a Medium Header</H2>" +
  'Send me mail at <a href="mailto:support@yourcompany.com">' +
  "support@yourcompany.com</a>." +
  "<P> This is a new paragraph!" +
  "<P> <B>This is a new paragraph!</B>" +
  "<BR> <B><I>This is a new sentence without a paragraph break, in bold italics.</I></B>" +
  "<HR>" +
  "</BODY>" +
  "</HTML>";

const str3 =
  '<?xml version="1.0" encoding="utf-8"?>\
<vector xmlns:android="http://schemas.android.com/apk/res/android"\
    android:height="64dp"\
    android:width="64dp"\
    android:viewportHeight="600"\
    android:viewportWidth="600" >\
<group\
        android:name="rotationGroup"\
        android:pivotX="300.0"\
        android:pivotY="300.0"\
        android:rotation="45.0" >\
        <path\
            android:fillColor="#000000"\
            android:pathData="M300,70 l 0,-70 70,70 0,0 -70,70z" />\
</group>\
<group\
        android:name="horizontalGroup"\
        android:pivotX="200.0"\
        android:pivotY="200.0"\
        android:rotation="180.0" >\
        <path\
            android:fillColor="#111111"\
            android:pathData="M300,70 l 0,-70 70,70 0,0 -70,70z" />\
</group>\
</vector>';

const NOT_NEED_END_TAG_LIST = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source"];
const CAN_SKIP_END_TAG_LIST = ["li", "dt", "dd", "p", "rt", "rp", "optgroup", "optioni", "thead", "tfoot", "tr", "td", "th"];

// AST의 노드
class ASTNode {
  constructor() {
    this.element = null;
    this.text = null;
    this.attributes = null;
    this.children = [];
  }
}

// XML 파서
class XMLParser {
  constructor(str) {
    this.root = this.parser(str);
    this.elapsed_idx = 0;
    this.lexedArr = [];
    this.elements = [];
  }

  parse(start_idx, depth) {
    if (start_idx >= this.lexedArr.length) return;

    let node = new ASTNode();

    node.element = this.lexedArr[start_idx].tagName;
    node.attributes = this.lexedArr[start_idx].attrs;

    for (let i = start_idx + 1; i < this.lexedArr.length; i++) {
      let item = this.lexedArr[i];

      if (item.tagName == "text") {
        // 텍스트면 노드에 텍스트라고 적어줌
        // console.log('텍스트 저장')
        node.text = item.text;
      } else {
        // 태그면
        if (item.status == "start") {
          // 시작태그면 재귀 호출
          if (NOT_NEED_END_TAG_LIST.includes(item.tagName.toLowerCase()) || CAN_SKIP_END_TAG_LIST.includes(item.tagName.toLowerCase())) {
            let isSelfClose = true; // 종료 태그가 없지만 없이 쓸 수 있는 태그인 경우
            // console.log('hihi')
            for (let j = i + 1; j < this.lexedArr.length; j++) {
              if (this.lexedArr[j].tagName == item.tagName && this.lexedArr[j].status == "end") {
                isSelfClose = false;
                break;
              }
            }

            if (isSelfClose) {
              let temp = { element: item.tagName };
              if (item.attrs.length != 0) temp.attributes = item.attrs;
              node.children.push(temp);
              continue;
            }
          }

          // console.log('시작태그: '+node.element+'의 자식으로 넣을'+ item.tagName +'을 재귀호출함')
          node.children.push(this.parse(i, node.element, depth + 1));
          i = this.elapsed_idx; // 현재까지 진행한 idx 갱신
        } else if (item.status == "self-close") {
          // 셀프 종료 태그면 children에 넣어줌
          // console.log('self-close 태그 저장')
          let temp = { element: item.tagName };
          if (item.attrs.length != 0) temp.attributes = item.attrs;
          node.children.push(temp);
        } else {
          // 종료태그면 유효성 검사
          // console.log('종료태그')
          // console.log(node.element + ' ' + item.tagName)
          this.elapsed_idx = i; // 현재까지 진행한 idx 갱신

          if (node.attributes.length == 0) delete node.attributes;
          if (node.text == null) delete node.text;
          if (node.children.length == 0) delete node.children;
          console.log("node", node);
          return node;
        }
      }
    }
  }

  parser(str) {
    const tokenizedDocument = this.tokenizer(str);
    this.lexedArr = this.lexer(tokenizedDocument);
    let node = this.parse(0, 0);

    return node;
  }

  tokenizer(str) {
    return str.split(/(<[^>]+>)/g).filter((item) => {
      return item != "";
    }); // 태그, 텍스트 단위로 split
  }

  lexer(tokens) {
    let arr = [];

    tokens.forEach((item) => {
      if (item.match(/^</)) {
        // 태그면
        const list = item
          .replace(/<|>/g, "")
          .trim()
          .split(/(?<=^\S+)\s/); // attr 분리(replace: 꺽쇠 제거, split: 첫번째 공백 기준 split)

        if (list[0].match(/!|\?/g)) return; // comment면 continue

        let tagName = list.shift();
        let attrs = [];
        let status = !tagName.match(/\//g) ? "start" : tagName.indexOf("/") == 0 ? "end" : "self-close";
        tagName = tagName.replace(/\//g, "");

        list.forEach((item) => {
          const temp = item.split(/=\"|\"\s/g); // split 구분자: '="', '" '

          for (let i = 0; i < temp.length / 2; i++) {
            if (temp[i * 2] == "/") {
              // 닫힘 태그 없는 경우
              status = "self-close";
              break;
            }
            attrs.push({
              name: temp[i * 2],
              value: temp[i * 2 + 1].replace(/"/g, ""), // 큰따옴표 제거
            });
          }
        });

        arr.push({ tagName, attrs, status });
      } else {
        // 텍스트인 경우
        arr.push({
          tagName: "text",
          text: item,
          attrs: [],
        });
      }
    });

    return arr;
  }

  stringify() {
    return JSON.stringify(this.root, null, 2);
  }

  elementByAttribute(name, value) {
    this.elements = [];
    this.findElementByAttribute(this.root, name, value);
    return this.elements;
  }

  findElementByAttribute(node, name, value) {
    if (node.attributes != undefined) {
      for (let item of node.attributes) {
        if (item.name.localeCompare(name, undefined, { sensitivity: "base" }) == 0 && item.value.localeCompare(value, undefined, { sensitivity: "base" }) == 0) {
          this.elements.push(node);
          break;
        }
      }
    }

    if (node.children != undefined) {
      for (let child of node.children) {
        this.findElementByAttribute(child, name, value);
      }
    }
  }

  elementsByTag(tagName) {
    this.elements = [];
    this.findElementsByTag(this.root, tagName);
    return this.elements;
  }

  findElementsByTag(node, tagName) {
    if (node.element.localeCompare(tagName, undefined, { sensitivity: "base" }) == 0) {
      this.elements.push(node);
    }

    if (node.children != undefined) {
      for (let child of node.children) {
        this.findElementsByTag(child, tagName);
      }
    }
  }

  findXPath(xpath) {
    this.elements = [];
    let arr = xpath.split("/").filter((item) => {
      return item != "";
    });
    console.log(arr);

    this.findPath(arr, 0, this.root);

    return this.elements;
  }

  findPath(arr, idx, node) {
    if (idx >= arr.length) return;

    if (!arr[idx].match(/[A-Za-z]+\[[0-9]+\]/)) {
      // 필터표현식 없는 경우
      if (node.element == arr[idx]) {
        if (idx == arr.length - 1) {
          this.elements.push(node);
          return;
        } else {
          if (node.children != undefined) {
            for (let child of node.children) {
              this.findPath(arr, idx + 1, child);
            }
          }
        }
      } else {
        return;
      }
    } else {
      // 필터표현식 있는 경우
      const num = arr[idx].replace(/[A-Za-z]+\[|\]/g, "");

      if (node.children != undefined) {
        console.log(node);
        let child = node.children[num - 1];
        if (child == undefined) {
          throw new Error("찾으려는 경로가 없습니다.");
        } else {
          this.elements.push(child);
        }
      }
    }
  }
}

const dom = new XMLParser(str);
console.log(dom.stringify());

console.log("====================================================================================");

console.log("elementByAttribute 결과: ");
let oElement = dom.elementByAttribute("lang", "ko");
console.log(oElement);

console.log("====================================================================================");

console.log("elementsByTag 결과: ");
let qElement = dom.elementsByTag("img");
console.log(qElement);

console.log("====================================================================================");

console.log("findXPath 결과: ");
let pElement = dom.findXPath("/vector/group[2]/path");
console.log(pElement);
