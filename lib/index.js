var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// src/index.ts
__markAsModule(exports);
__export(exports, {
  activate: () => activate
});
var import_coc2 = __toModule(require("coc.nvim"));

// src/lists.ts
var import_coc = __toModule(require("coc.nvim"));
var DemoList = class extends import_coc.BasicList {
  constructor(nvim) {
    super(nvim);
    this.name = "demo_list";
    this.description = "CocList for coc-mozc";
    this.defaultAction = "open";
    this.actions = [];
    this.addAction("open", (item) => {
      import_coc.window.showMessage(`${item.label}, ${item.data.name}`);
    });
  }
  async loadItems(context) {
    return [
      {
        label: "coc-mozc list item 1",
        data: {name: "list item 1"}
      },
      {
        label: "coc-mozc list item 2",
        data: {name: "list item 2"}
      }
    ];
  }
};
var lists_default = DemoList;

// src/index.ts
async function activate(context) {
  import_coc2.window.showMessage(`coc-mozc works!`);
  context.subscriptions.push(import_coc2.commands.registerCommand("coc-mozc.Command", async () => {
    import_coc2.window.showMessage(`coc-mozc Commands works!`);
  }), import_coc2.listManager.registerList(new lists_default(import_coc2.workspace.nvim)), import_coc2.sources.createSource({
    name: "coc-mozc completion source",
    doComplete: async () => {
      const items = await getCompletionItems();
      return items;
    }
  }), import_coc2.workspace.registerKeymap(["n"], "mozc-keymap", async () => {
    import_coc2.window.showMessage(`registerKeymap`);
  }, {sync: false}), import_coc2.workspace.registerAutocmd({
    event: "InsertLeave",
    request: true,
    callback: () => {
      import_coc2.window.showMessage(`registerAutocmd on InsertLeave`);
    }
  }));
}
async function getCompletionItems() {
  return {
    items: [
      {
        word: "TestCompletionItem 1",
        menu: "[coc-mozc]"
      },
      {
        word: "TestCompletionItem 2",
        menu: "[coc-mozc]"
      }
    ]
  };
}
