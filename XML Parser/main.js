import { tokenizer } from "./tokenizer.js";
import { parser } from "./parser.js";

import { check_xml } from "./check_xml.js";

const str = '<!DOCTYPE html><HTML lang="ko"><BODY><P>BOOST<IMG SRC="codesquad.kr"></IMG><BR/></P></BODY></HTML>';
const str2 = '<!DOCTYPE html><HTML lang="ko"><BODY></HTML></BODY>';
const str3 = `<HTML><HEAD><TITLE>Your Title Here</TITLE></HEAD><BODY BGCOLOR="FFFFFF"><CENTER><IMG SRC="clouds.jpg" ALIGN="BOTTOM"></CENTER><HR><a href="http://somegreatsite.com">Link Name</a>is a link to another nifty site<H1>This is a Header</H1><H2>This is a Medium Header</H2>Send me mail at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>.<P>This is a new paragraph!<P><B>This is a new paragraph!</B><BR><B><I>This is a new sentence without a paragraph break, in bold italics.</I></B><HR></BODY></HTML> */}`;
const dom = new tokenizer(str3);

function token(dom) {
  let token = dom.xml.xml_result;
  token.shift();
  return token;
}

// XMLParser
console.log("=================XMLParser=================");

let token_result = token(dom);
let check = check_xml(token_result);
if (check == false) {
  console.log("ERROR: 올바른 XML 형식이 아닙니다.");
  process.exit(0);
}
console.log(token_result);

let result = parser(token_result);
console.log(result);
console.log("=========================================");
console.log();
console.log();

// XMLPath
console.log("=================XMLPath=================");
console.log("elementByAttribute");
let attr_result = dom.xml.elementByAttribute("lang", "ko");
console.log(attr_result);
result = parser(token_result);
console.log(result);

console.log("----------------------------------------");

console.log("elementsByTag");
let tag_result = dom.xml.elementsByTag("P");
console.log(tag_result);
result = parser(token_result);
console.log(result);
console.log("----------------------------------------");

console.log("XPath");
let xpath_result = dom.xml.XPath("/HTML/BODY/P[1]");
console.log(xpath_result);
result = parser(token_result);
console.log(result);
console.log("=========================================");
