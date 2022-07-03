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
})({"data/db.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [// {
  //   id: 1235,
  //   description: 'Chores',
  //   datetime: '29 Apr 2022 16:00'
  // },
  // {
  //   id: 1235,
  //   description: 'Chores',
  //   datetime: '29 Apr 2022 16:00'
  // },
  // {
  //   id: 1235,
  //   description: 'Chores',
  //   datetime: '29 Apr 2022 16:00'
  // },
  // {
  //   id: 1235,
  //   description: 'Chores',
  //   datetime: '29 Apr 2022 16:00'
  // }
];
exports.default = _default;
},{}],"data/logic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logic = void 0;

var _db = _interopRequireDefault(require("./db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function loadTestData() {
  [{
    description: 'Janet',
    datetime: '29 Apr 2022 16:00'
  }, {
    description: 'Ryowu',
    datetime: '29 Apr 2022 16:00'
  }, {
    description: 'Rita',
    datetime: '29 Apr 2022 16:00'
  }, {
    description: 'Lawrence',
    datetime: '29 Apr 2022 16:00'
  }].forEach(createItem);
})();

function isObject(variable) {
  return _typeof(variable) === 'object';
}

var uniqueId = 1;

function generateId() {
  if (!uniqueId) uniqueId = 1;
  return uniqueId++;
}

function deref(variable) {
  return JSON.parse(JSON.stringify(variable));
}

function listItems() {
  return deref(_db.default);
}

function createItem(item) {
  if (!isObject(item) || !(item !== null && item !== void 0 && item.description)) {
    throw new Error("Item is invalid");
  }

  item.id = generateId();

  _db.default.push(item);

  return item;
}

function readItem(id) {
  return deref(_db.default.find(function (item) {
    return item.id == id;
  }));
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
},{"./db.js":"data/db.js"}],"data/index.js":[function(require,module,exports) {
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
  return _logic.logic.createItem(item);
}

function readItem(id) {
  return _logic.logic.readItem(id);
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
attachEventListeners();

function renderList() {
  var listElement = document.querySelector('.list');
  listElement.innerHTML = "";

  _index.api.listItems().forEach(function (item) {
    listElement.append((0, _helpers.parseHTML)("\n      <div class=\"list-item\" data-item-id=\"".concat(item.id, "\">\n        <div class=\"description\">\n          ").concat(item.description, "\n        </div>\n        <div class=\"datetime\">\n          ").concat(item.datetime, "\n        </div>\n      </div>\n    ")));
  });
}

function attachEventListeners() {
  document.getElementById("add-new-button").onclick = function () {
    document.getElementById("create-item-dialog").show();
  };

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('dialog-close')) {
      e.preventDefault();
      e.target.closest('dialog').close();
      return false;
    }

    if (e.target.closest('.list-item')) {
      e.preventDefault();
      var dialog = document.getElementById("read-item-dialog");
      dialog.show();
      var itemId = e.target.closest('.list-item').dataset["item-id"];

      var itemData = _index.api.readItem(itemId);

      console.log({
        itemData: itemData
      });
      dialog.querySelector('.description').innerHTML = itemData.description;
      dialog.querySelector('.datetime').innerHTML = itemData.datetime;
      return false;
    }
  });

  document.getElementById("create-item").onclick = function () {
    var item = {
      description: document.getElementById('description').value,
      datetime: document.getElementById("datetime").value
    };

    try {
      _index.api.createItem(item);
    } catch (error) {
      alert(error);
    }

    renderList();
    document.getElementById('create-item-dialog').close();
  };
}
},{"./data/index.js":"data/index.js","./helpers.js":"helpers.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41007" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map