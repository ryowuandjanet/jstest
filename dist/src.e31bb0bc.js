// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"data/logic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logic = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

// import db from './db.js';
function isObject(varirable) {
  return _typeof(varirable) === 'object';
}

var id = 0;

function generateId() {
  return ++id;
}

function listItems() {
  return JSON.parse(JSON.stringify(db));
}

function createItem(item) {
  if (!isObject(item) || !(item !== null && item !== void 0 && item.description) || !(item !== null && item !== void 0 && item.datetime)) {
    throw new Error("Item is invalid");
  }

  item.id = generateId();
  db.push(item);
  return item;
}

function readItem() {
  return {};
}

function updateItem(id) {
  return {};
}

function deleteItem() {
  return {};
}

var logic = {
  listItems: listItems,
  createItem: createItem,
  readItem: readItem,
  updateItem: updateItem,
  deleteItem: deleteItem
};
exports.logic = logic;
},{}],"data/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = void 0;

var _logic = require("./logic.js");

function listItems() {
  return _logic.logic.listItems();
}

function createItem(item) {
  return {};
}

function readItem(id) {
  return {};
}

function updateItem(id, item) {
  return false;
}

function deleteItem(id) {
  return false;
}

var api = {
  listItems: listItems,
  createItem: createItem,
  readItem: readItem,
  updateItem: updateItem,
  deleteItem: deleteItem
};
exports.api = api;
},{"./logic.js":"data/logic.js"}],"helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseHTML = parseHTML;

function parseHTML(string) {
  var parser = new DOMParser();
  return parser.parseFromString(string, 'text/html').body.childNodes[0];
}
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _index = require("./data/index.js");

var _helpers = require("./helpers.js");

renderList();

function renderList() {
  var listElement = document.querySelector('.list');
  listElement.innerHTML = "";

  _index.api.listItems().forEach(function (item) {
    listElement.append("\n      <div class=\"list-item\">\n        <div class=\"description\">\n          ".concat(item.description, "\n        </div>\n        <div class=\"datetime\">\n          ").concat(item.datetime, "\n        </div>\n      </div>\n    "));
  });
}
},{"./data/index.js":"data/index.js","./helpers.js":"helpers.js"}]