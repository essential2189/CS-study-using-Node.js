function getParser(string) {
  let flag = false;
  let xml = "";
  let not_xml = "";
  let xml_list = [];
  for (var i = 0; i < string.length; i++) {
    if (string[i] == "<") {
      xml += "<";
      if (not_xml != "") {
        xml_list.push(not_xml.toUpperCase());
        not_xml = "";
      }

      flag = true;
      continue;
    } else if (string[i] == ">") {
      xml += ">";
      flag = false;
      xml_list.push(xml.toUpperCase());
      xml = "";
      continue;
    }
    if (flag == true) {
      xml += string[i];
    } else {
      not_xml += string[i];
    }
  }
  return xml_list;
}

export function tokenizer(string) {
  var self = this;
  let xml_list = getParser(string);
  self.xml = {
    xml_result: xml_list,
    elementByAttribute,
    elementsByTag,
    XPath,
  };

  function XPath(path) {
    let path_split = path.split("/");
    path_split = path_split[path_split.length - 1];

    let count = 1;
    const regex = /\[\d\]/gi;
    let key = path_split.match(regex);
    if (key != null) {
      count = Number(key[0].slice(1, -1));
    }

    let flag = false;
    let temp_list = [];
    let loop_cnt = 0;
    for (var i = 0; i < this.xml_result.length; i++) {
      let temp = this.xml_result[i].slice(1, -1);
      if (path_split.includes(temp.split(" ")[0])) {
        loop_cnt++;
        flag = true;
      }
      if (flag == true && loop_cnt <= count) {
        if (
          temp_list[0] != undefined &&
          "/" + temp_list[0].slice(1, -1).split(" ")[0] == temp
        ) {
          temp_list.push(this.xml_result[i]);
          flag = false;
        } else {
          temp_list.push(this.xml_result[i]);
        }
      }
    }
    return temp_list;
  } // XPath

  function elementsByTag(tag) {
    tag = tag.toUpperCase();
    let flag = false;
    let temp_list = [];
    for (var i = 0; i < this.xml_result.length; i++) {
      let temp = this.xml_result[i].slice(1, -1);
      if (temp == tag) {
        flag = true;
      }
      if (flag == true) {
        if (temp == "/" + tag) {
          temp_list.push(this.xml_result[i]);
          flag = false;
        } else {
          temp_list.push(this.xml_result[i]);
        }
      }
    }
    return temp_list;
  } // elementsByTag

  function elementByAttribute(name, value) {
    name = name.toUpperCase();
    value = value.toUpperCase();
    let flag = false;
    let temp_list = [];
    for (var i = 0; i < this.xml_result.length; i++) {
      let temp = this.xml_result[i].slice(1, -1);

      if (temp.includes(name) && temp.includes(value)) {
        flag = true;
      }
      if (flag == true) {
        if (
          temp_list[0] != undefined &&
          temp_list[0].slice(1, -1).split(" ")[0] == temp.slice(1)
        ) {
          temp_list.push(this.xml_result[i]);
          flag = false;
        } else {
          temp_list.push(this.xml_result[i]);
        }
      }
    }
    return temp_list;
  } // elementByAttribute
}
