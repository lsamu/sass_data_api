function getCamelCaseOfUnderlineName(aName) {
  const characters = [...aName];
  characters[0] = characters[0].toUpperCase();
  aName = characters.join("");

  if (aName.toUpperCase() === aName)
    return aName;

  let res = aName;
  while (res.indexOf('-') >= 0) {
    const s = res;
    const po = s.indexOf('-');
    const s1 = s.substring(0, po);
    let s2 = s.substr(po + 1);
    if (s2.length > 0)
      s2 = s2.charAt(0).toUpperCase() + s2.substr(1);
    res = s1 + s2;
  }
  return res;
}

function loadComponent(Vue, opts, requireComponents, prefix: string = "Box") {
  const install = function (Vue, opts = {}) {
    for (let fileName in requireComponents) {
      try {
        const componentConfig = requireComponents[fileName];
        const component = componentConfig.default || componentConfig;
        // let componentName = (
        //   component["extendOptions"] ? component["extendOptions"] : component
        // ).name;
        let arr = fileName.split("/")
        let componentName = arr[arr.length - 2];

        componentName = getCamelCaseOfUnderlineName(componentName)
        if (false == componentName.includes(prefix)) {
          componentName = prefix + componentName;
        }
        Vue.component(componentName, component);
      } catch (error) {
        console.log(error, fileName)
      }
    }
  };
  install(Vue, opts);
}

const install = function (Vue, opts = { option: false }) {
  const requireComponents = import.meta.glob("./**/index.vue", { eager: true });
  loadComponent(Vue, opts, requireComponents, "BoxMagic");
};

export default {
  install,
};
