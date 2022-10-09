import { subscriberD, remove, postEvent, stringify } from "./eventManager.mjs";

function main() {
  console.log("> stringify()");
  stringify();

  console.log('\n\n// albumModel post "ModelDataChanged"');
  postEvent("ModelDataChanged", "albumModel", { data: "abc" });

  console.log('\n\n// albumView post "ViewUpdated"');
  postEvent("ViewUpdated", "albumView", { view: "xxx" });

  console.log('\n\n// albumController post "DidShakeMotion"');
  postEvent("DidShakeMotion", "albumController", { from: "blue" });

  console.log('\n\n// dummy post "AllDataChanged"');
  postEvent("AllDataChanged", "dummy", {});

  console.log('\n\n// remove subscriberD & dummy post "AllDataChanged"');
  remove(subscriberD);
  postEvent("AllDataChanged", "dummy", {});
}

main();
