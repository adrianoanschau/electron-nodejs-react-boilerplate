"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/main/index.ts
var import_electron2 = require("electron");
var import_path = __toESM(require("path"));

// src/main/IPCManager.ts
var import_electron = require("electron");
var IPCManager = class {
  static registerService(channel, service) {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(service));
    methods.forEach((method) => {
      if (method !== "constructor") {
        import_electron.ipcMain.handle(`${channel}:${method}`, (_, ...args) => service[method](...args));
      }
    });
  }
};

// src/main/services/supabase.ts
var import_supabase_js = require("@supabase/supabase-js");
var import_config = require("dotenv/config");
var supabaseUrl = process.env.SUPABASE_URL;
var supabaseKey = process.env.SUPABASE_ANON_KEY;
var supabase = (0, import_supabase_js.createClient)(supabaseUrl, supabaseKey);

// src/main/repositories/SupabaseProductRepository.ts
var SupabaseProductRepository = class {
  async getAll() {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw new Error(error.message);
    return data;
  }
  async create(product) {
    const { data, error } = await supabase.from("products").insert(product).select();
    if (error) throw new Error(error.message);
    return data[0];
  }
};

// src/main/index.ts
var import_config2 = require("dotenv/config");
function createWindow() {
  const mainWindow = new import_electron2.BrowserWindow({
    width: 1200,
    height: 960,
    frame: false,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#1a1a1a",
      symbolColor: "#f8f8fd",
      height: 45
    },
    webPreferences: {
      preload: import_path.default.join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      sandbox: true
    }
  });
  const productRepo = new SupabaseProductRepository();
  IPCManager.registerService("products", productRepo);
  if (process.env.NODE_ENV === "development" || !import_electron2.app.isPackaged) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(import_path.default.join(__dirname, "../renderer/index.html"));
  }
}
import_electron2.app.whenReady().then(createWindow);
import_electron2.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") import_electron2.app.quit();
});
