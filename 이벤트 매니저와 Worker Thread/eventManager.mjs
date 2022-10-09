import { ModelDataChanged, viewUpdated, DidShakeMotion, AllDataChanged, allEvent } from "./utils.mjs";

//싱글톤
export class sharedInstance {
  constructor(name) {
    this.name = name;
    this.events = {};
  }
  // 싱글톤 객체를 리턴할 비공개 함수
  subscription(eventName, func) {
    return {
      // Subscriber 추가 함수 구현 (여러 조건 수용)
      subscribe: () => {
        if (this.events[eventName]) this.events[eventName].push(func);
        else this.events[eventName] = [func];
      },
      //Subscriber 제거 함수 구현 (여러 조건 수용)
      unsubscribe: () => {
        this.events = {};
      },
    };
  }

  publish(eventName, ...args) {
    const funcs = this.events[eventName];

    if (Array.isArray(funcs)) {
      funcs.forEach((func) => {
        let data = func.apply(null, args);
        console.log(this.name + ": " + eventName[0] + " event from " + eventName[1] + " userData =", data);
      });
    } else {
      console.log(this.name + ": " + eventName[0] + " event from " + eventName[1] + " userData =", args[0]);
    }
  }

  stringify() {
    for (let k in this.events) {
      let k_split = k.split(",");
      if (k_split[1] === "") console.log("Subscriber : event name = " + k_split[0] + ", sender = " + undefined);
      else console.log("Subscriber : event name = " + k_split[0] + ", sender = " + k_split[1]);
    }
  }

  getInstance() {
    return [this.name, this.events];
  }
}

export function add() {
  // closure
  return function handler(subscriber, eventName, sender, handler) {
    if (eventName === '""') subscriber.subscription(['""', sender], allEvent).subscribe();
    else subscriber.subscription([eventName, sender], handler).subscribe();
  };
}

export const remove = (subscriber) => {
  subscriber.subscription("remove", "all").unsubscribe();
};

export const postEvent = (eventName, sender, userData) => {
  for (let i = 0; i < subscriber_list.length; i++) {
    let instance = subscriber_list[i].getInstance();
    let object = instance[1];

    for (let key in object) {
      let key_split = key.split(",");
      if ((key_split[0] === eventName || key_split[0] === '""') && (key_split[1] === sender || key_split[1] === "")) {
        subscriber_list[i].publish([eventName, sender], userData);
      }
    }
  }
};

export const stringify = () => {
  for (let i = 0; i < subscriber_list.length; i++) {
    subscriber_list[i].stringify();
  }
};

//구독자 생성
export const subscriberA = new sharedInstance("subscriberA");
export const subscriberB = new sharedInstance("subscriberB");
export const subscriberC = new sharedInstance("subscriberC");
export const subscriberD = new sharedInstance("subscriberD");

export const subscriber_list = [subscriberA, subscriberB, subscriberC, subscriberD];

export const add_ = add();

// 구독자 추가
add_(subscriberA, "ModelDataChanged", "albumModel", ModelDataChanged);
add_(subscriberB, '""', "albumView", allEvent);
add_(subscriberC, "DidShakeMotion", "albumController", DidShakeMotion);
add_(subscriberC, "AllDataChanged", undefined, AllDataChanged);
add_(subscriberD, '""', undefined, allEvent);
