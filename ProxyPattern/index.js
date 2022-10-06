const person = {
  name: "junseo",
  age: 26,
  nationality: "Korean",
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log("없는 속성입니다.");
      return;
    }
    console.log(`${prop}의 값은 ${obj[prop]} 입니다.`);
  },

  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log("age는 숫자만 입력할 수 있습니다.");
      return;
    }

    if (prop === "name" && value.length < 2) {
      console.log("유효한 이름을 입력해주세요.");
      return;
    }

    console.log(`${prop}의 값이 ${obj[prop]}에서 ${value}로 변경됩니다.`);
    obj[prop] = value;
  },
});

personProxy.age = 10;
personProxy["hi"];
personProxy.name = "3";

const personProxyWithReflect = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`${prop}의 값은 ${Reflect.get(obj, prop)}입니다.`);
  },

  set: (obj, prop, value) => {
    console.log(`${prop}의 값이 ${obj[prop]}에서 ${value}로 변경됩니다.`);
    Reflect.set(obj, prop, value);
  },
});
