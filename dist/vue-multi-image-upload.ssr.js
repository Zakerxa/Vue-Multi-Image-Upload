'use strict';var vue=require('vue');function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : String(i);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = /*#__PURE__*/vue.defineComponent({
  name: "VueUploadZakerxa",
  data: function data() {
    return {
      dragBoxStyle: false,
      local: {
        max: 'Maximun',
        select: 'Selected',
        ready: 'Ready'
      },
      alertS: false,
      alertH: '',
      alertB: '',
      inputImages: [],
      imagesLivePreview: [],
      imagesRender: [],
      global: new ZakerxaImage(),
      dataClear: {
        clear: false
      },
      img: 'data:image/png;base64,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'
    };
  },
  emits: ['dataImage'],
  props: {
    max: {
      type: Number,
      default: 6
    },
    accept: {
      type: Array,
      default: ['image/jpeg', 'image/png', 'image/gif']
    },
    imageSize: {
      type: Number,
      default: 4e6
    },
    dataReset: Object,
    options: Object,
    preview: {
      type: Object,
      default: {
        w: 100,
        h: 100,
        keepRatio: false
      }
    },
    resize: Object,
    alertTimeout: {
      type: Number,
      default: 3e3
    }
  },
  methods: {
    myAlert: function myAlert(title, body, timer) {
      var _this = this;
      this.alertH = title, this.alertB = body, this.alertS = !0, setTimeout(function () {
        return _this.alertS = !1;
      }, timer);
    },
    dragging: function dragging(e) {
      e.preventDefault();
      e.stopPropagation();
      this.dragBoxStyle = true;
    },
    onDrop: function onDrop(e) {
      e.preventDefault(), e.stopPropagation(), this.dragBoxStyle = !1, e.dataTransfer.files ? this.imageDetect(e, !0) : console.log("No Data");
    },
    loadImagePreview: function loadImagePreview() {
      var _this2 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _loop, i;
        return _regeneratorRuntime().wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(_this2.imagesLivePreview.length > 0)) {
                _context2.next = 8;
                break;
              }
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(i) {
                return _regeneratorRuntime().wrap(function _loop$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _this2.global.resizeImage(_this2.imagesLivePreview[i], _this2.preview).then(function (e) {
                        _this2.$refs["image".concat(_this2.imagesLivePreview[i].name)][0].src = URL.createObjectURL(e[0]);
                      });
                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }, _loop);
              });
              i = 0;
            case 3:
              if (!(i < _this2.imagesLivePreview.length)) {
                _context2.next = 8;
                break;
              }
              return _context2.delegateYield(_loop(i), "t0", 5);
            case 5:
              i++;
              _context2.next = 3;
              break;
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee);
      }))();
    },
    removeImgPreview: function removeImgPreview(e) {
      var item = this.inputImages.find(function (i) {
        return i.name == e;
      });
      this.inputImages.remove(item), this.imagesLivePreview.remove(item);
      var name = e.toLowerCase();
      this.resize && (e.endsWith(".webp") || e.endsWith(".jpeg") ? name = name.slice(0, -4) + "jpg" : (e.endsWith(".png") || e.endsWith(".svg") || e.endsWith(".gif") || e.endsWith(".psd") || e.endsWith(".pdf"), name = name.slice(0, -3) + "jpg"));
      var rederitem = this.imagesRender.find(function (i) {
        return i.name.toLowerCase() == name;
      });
      this.imagesRender.remove(rederitem), this.$emit("dataImage", this.imagesRender);
    },
    imageValidation: function imageValidation(container, maxsize) {
      var _this3 = this;
      if (0 == this.inputImages.length && parseInt(container.length) > this.max) {
        var e = "The maximun number of file limit is " + this.max + " & we will remove the other file.";
        this.myAlert("File Limit Reached !", e, this.alertTimeout);
        var t = [];
        for (var i = 0; i < this.max; i++) t.push(container[i]);
        container = t;
      } else {
        var sameFile = this.inputImages.filter(function (e) {
          for (var n = 0; n < container.length; n++) if (e.name == container[n].name) return !0;
          return null;
        });
        if (sameFile.length > 0) for (var _i = 0; _i < sameFile.length; _i++) this.inputImages.remove(sameFile[_i]);
        var ilength = this.inputImages.length,
          totalFile = container.length + ilength;
        if (totalFile > this.max) {
          var _e = [],
            _i2 = this.max - ilength;
          for (var _t = 0; _t < _i2; _t++) _e.push(container[_t]);
          var m = "The maximun number of file limit is " + this.max + " & we will remove the other files.";
          this.myAlert("File Limit Reached !", m, this.alertTimeout), container = _e;
        }
      }
      var valid = this.accept.map(function (e) {
          return e.toString().replace("image/", " ");
        }),
        jpeg = valid.some(function (e) {
          return e.includes("jpeg");
        });
      jpeg && (valid = valid.filter(function (e) {
        return " jpeg" != e.toString();
      }));
      var imagesTypeInvalid = container.filter(function (e) {
        return !_this3.accept.includes(e.type) && (_this3.myAlert("Invalid File Type !", "We only allow " + valid + (jpeg ? " & jpg" : "") + ".\n", _this3.alertTimeout), !0);
      });
      var imagesSize = container.filter(function (e) {
        if (e.size >= maxsize) return !0;
      });
      if (imagesSize.length >= 1) {
        this.myAlert("Exceed File Size!", "".concat(imagesSize[0].name, " size exceeds the maximun.We will remove all of exceed file."), this.alertTimeout);
        for (var _e2 = 0; _e2 < imagesSize.length; _e2++) container.remove(imagesSize[_e2]);
      }
      if (imagesTypeInvalid.length > 0) {
        for (var _i3 = 0; _i3 < imagesTypeInvalid.length; _i3++) container.remove(imagesTypeInvalid[_i3]);
        return container;
      }
      return container;
    },
    imageDetect: function imageDetect(e, drop) {
      var _this4 = this;
      if (window.File && window.FileList && window.FileReader) {
        if (0 == this.inputImages.length) {
          var i = [];
          i = e.target.files || e.dataTransfer.files, drop && (i = e.dataTransfer.files), i = Array.prototype.slice.call(i);
          this.imageValidation(i, this.imageSize).map(function (i) {
            return _this4.inputImages.push(i);
          }), this.imagesLivePreview = this.inputImages;
          var s = [];
          this.inputImages.map( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(i) {
              return _regeneratorRuntime().wrap(function _callee2$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!_this4.resize) {
                      _context3.next = 8;
                      break;
                    }
                    _context3.t0 = s;
                    _context3.next = 4;
                    return _this4.global.fileResize(i, _this4.resize);
                  case 4:
                    _context3.t1 = _context3.sent;
                    _context3.t0.push.call(_context3.t0, _context3.t1);
                    _context3.next = 9;
                    break;
                  case 8:
                    s.push(i);
                  case 9:
                    _this4.imagesRender = s;
                    _this4.$emit("dataImage", _this4.imagesRender);
                  case 11:
                  case "end":
                    return _context3.stop();
                }
              }, _callee2);
            }));
            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }());
        } else {
          var t = [];
          t = e.target.files || e.dataTransfer.files, drop && (t = e.dataTransfer.files), t = Array.prototype.slice.call(t), (t = this.imageValidation(t, this.imageSize)).map(function (i) {
            return _this4.inputImages.push(i);
          }), this.imagesLivePreview = this.inputImages;
          var a = [];
          this.inputImages.map( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(i) {
              return _regeneratorRuntime().wrap(function _callee3$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!_this4.resize) {
                      _context4.next = 8;
                      break;
                    }
                    _context4.t0 = a;
                    _context4.next = 4;
                    return _this4.global.fileResize(i, _this4.resize);
                  case 4:
                    _context4.t1 = _context4.sent;
                    _context4.t0.push.call(_context4.t0, _context4.t1);
                    _context4.next = 9;
                    break;
                  case 8:
                    a.push(i);
                  case 9:
                    _this4.imagesRender = a;
                    _this4.$emit("dataImage", _this4.imagesRender);
                  case 11:
                  case "end":
                    return _context4.stop();
                }
              }, _callee3);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }());
        }
      } else console.log("Your browser is not supports files format.");
    },
    clearProperty: function clearProperty() {
      this.dataReset.clear && (this.inputImages = [], this.imagesLivePreview = [], this.imagesRender = [], this.$emit("dataImage", this.imagesRender), this.dataReset.clear = !1);
    }
  },
  created: function created() {
    this.dataReset && (this.dataClear = this.dataReset), Array.prototype.remove = function () {
      for (var t, e, i = arguments, s = i.length; s && this.length;) for (t = i[--s]; -1 !== (e = this.indexOf(t));) this.splice(e, 1);
      return this;
    };
  },
  mounted: function mounted() {
    var blob = this.global.dataURItoBlob(this.img);
    this.$refs.camera.src = URL.createObjectURL(blob);
    this.$refs.zakerxaDragBox.addEventListener('dragleave', function (e) {
      this.dragBoxStyle = false;
    }.bind(this));
  }
});
var ZakerxaImage = /*#__PURE__*/function () {
  function ZakerxaImage() {
    _classCallCheck(this, ZakerxaImage);
  }
  _createClass(ZakerxaImage, [{
    key: "makeId",
    value: function makeId(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
      return result;
    }
  }, {
    key: "fileResize",
    value: function fileResize(file, resize) {
      var _this5 = this;
      return new Promise(function (resolve, reject) {
        file ? _this5.resizeImage(file, resize).then(function (e) {
          var i = file.name;
          i.endsWith(".webp") || i.endsWith(".jpeg") ? i = i.slice(0, -5) : (i.endsWith(".png") || i.endsWith(".svg") || i.endsWith(".gif") || i.endsWith(".psd") || i.endsWith(".pdf"), i = i.slice(0, -4));
          var s = new File([e[0]], i + ".jpg", {
            lastModified: new Date().getTime(),
            size: e[0].size,
            type: "image/jpeg"
          });
          resolve(s);
        }) : reject(Error("No file detect"));
      });
    }
  }, {
    key: "dataURItoBlob",
    value: function dataURItoBlob(dataURI) {
      var bytes = dataURI.toString().split(',')[0].indexOf('base64') >= 0 ? atob(dataURI.split(',')[1]) : unescape(dataURI.split(',')[1]);
      var mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var max = bytes.length;
      var ia = new Uint8Array(max);
      for (var i = 0; i < max; i += 1) ia[i] = bytes.charCodeAt(i);
      return new Blob([ia], {
        type: mime
      });
    }
  }, {
    key: "reSize",
    value: function reSize(image, resize) {
      var _resize$keepRatio;
      var canvas = document.createElement("canvas");
      var _ref3 = [resize.w, resize.h],
        maxWidth = _ref3[0],
        maxHeight = _ref3[1],
        _ref4 = [image.naturalWidth, image.naturalHeight],
        imgWidth = _ref4[0],
        imgHeight = _ref4[1];
      var ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
      var fw = imgWidth * ratio,
        fh = imgHeight * ratio;
      ((_resize$keepRatio = resize.keepRatio) !== null && _resize$keepRatio !== void 0 ? _resize$keepRatio : resize.keepRatio = !1) || (fw = resize.w, fh = resize.h), canvas.width = fw, canvas.height = fh, canvas.getContext("2d").drawImage(image, 0, 0, fw, fh);
      var dataUrl = canvas.toDataURL("image/jpeg", 1);
      return [this.dataURItoBlob(dataUrl), fw, fh];
    }
  }, {
    key: "resizeImage",
    value: function resizeImage(file, resize) {
      var _this6 = this;
      var reader = new FileReader();
      var image = new Image();
      return new Promise(function (a, e) {
        if (!file.type.match(/image.*/)) {
          e(Error("Not an image"));
          return;
        }
        reader.onload = function (e) {
          image.onload = function () {
            return a(_this6.reSize(image, resize));
          }, image.src = e.target.result;
        }, reader.readAsDataURL(file);
      });
    }
  }]);
  return ZakerxaImage;
}();var _withScopeId = function _withScopeId(n) {
  return vue.pushScopeId("data-v-32103c56"), n = n(), vue.popScopeId(), n;
};
var _hoisted_1 = {
  key: 0,
  class: "zakerxaMultipleImageAlertOverlay"
};
var _hoisted_2 = {
  class: "zakerxaMultipleImageAlertpopup"
};
var _hoisted_3 = {
  class: "content",
  style: {
    "padding": "5px 2px"
  }
};
var _hoisted_4 = {
  class: "zakerxa-upload"
};
var _hoisted_5 = {
  class: "file-select-button"
};
var _hoisted_6 = {
  class: "file-image",
  ref: "camera"
};
var _hoisted_7 = {
  key: 0,
  class: "file-ready"
};
var _hoisted_8 = {
  key: 1,
  class: "file-ready"
};
var _hoisted_9 = {
  key: 0,
  style: {
    "font-size": "15px",
    "padding-left": "10px",
    "color": "#555"
  }
};
var _hoisted_10 = {
  key: 0
};
var _hoisted_11 = {
  key: 1
};
var _hoisted_12 = {
  key: 1,
  style: {
    "letter-spacing": "2px",
    "color": "#777",
    "padding-left": "7px",
    "text-align": "center"
  }
};
var _hoisted_13 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/vue.createElementVNode("input", {
    type: "file",
    accept: "image/*",
    multiple: ""
  }, null, -1);
});
var _hoisted_14 = [_hoisted_13];
var _hoisted_15 = ["onload"];
var _hoisted_16 = ["onload"];
var _hoisted_17 = {
  class: "imghover"
};
var _hoisted_18 = ["title", "onClick", "alt"];
var _hoisted_19 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _ctx$max;
  return vue.openBlock(), vue.createElementBlock("div", {
    onDragover: [_cache[2] || (_cache[2] = function () {
      return _ctx.dragging && _ctx.dragging.apply(_ctx, arguments);
    }), _cache[4] || (_cache[4] = vue.withModifiers(function () {}, ["prevent"]))],
    onDrop: _cache[3] || (_cache[3] = function () {
      return _ctx.onDrop && _ctx.onDrop.apply(_ctx, arguments);
    }),
    ref: "zakerxaDragBox"
  }, [_ctx.alertS ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [vue.createElementVNode("div", _hoisted_2, [vue.createElementVNode("h4", null, vue.toDisplayString(_ctx.alertH), 1), vue.createElementVNode("a", {
    class: "close",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.alertS = false;
    })
  }, "×"), vue.createElementVNode("div", _hoisted_3, vue.toDisplayString(_ctx.alertB), 1)])])) : vue.createCommentVNode("", true), vue.createElementVNode("div", _hoisted_4, [vue.createElementVNode("div", {
    class: "file-select",
    style: vue.normalizeStyle([_ctx.dragBoxStyle ? 'border:4px dotted #ddd;padding:2px;height:80px;' : ''])
  }, [vue.createElementVNode("div", _hoisted_5, [vue.createElementVNode("img", _hoisted_6, null, 512), vue.createTextVNode(), !_ctx.inputImages.length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, vue.toDisplayString(_ctx.dragBoxStyle ? 'Dragging' : ''), 1)) : vue.createCommentVNode("", true), vue.createTextVNode(), _ctx.inputImages.length ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, vue.toDisplayString(_ctx.inputImages.length ? _ctx.options && _ctx.options.ready ? _ctx.options.ready : _ctx.local.ready : " "), 1)) : vue.createCommentVNode("", true)]), _ctx.inputImages.length >= 1 ? (vue.openBlock(), vue.createElementBlock("b", _hoisted_9, [vue.createTextVNode(vue.toDisplayString(_ctx.inputImages.length) + " ", 1), _ctx.inputImages.length == 1 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10, "file")) : vue.createCommentVNode("", true), _ctx.inputImages.length > 1 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_11, "files")) : vue.createCommentVNode("", true), vue.createTextVNode(" " + vue.toDisplayString(_ctx.options && _ctx.options.select ? _ctx.options.select : _ctx.local.select) + ". ", 1)])) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_12, vue.toDisplayString(_ctx.options && _ctx.options.max ? _ctx.options.max : _ctx.local.max) + " " + vue.toDisplayString((_ctx$max = _ctx.max) !== null && _ctx$max !== void 0 ? _ctx$max : ' . . .'), 1)), vue.createElementVNode("div", {
    onChange: _cache[1] || (_cache[1] = function () {
      return _ctx.imageDetect && _ctx.imageDetect.apply(_ctx, arguments);
    })
  }, _hoisted_14, 32)], 4)]), vue.createElementVNode("div", {
    onload: _ctx.clearProperty()
  }, null, 8, _hoisted_15), vue.createElementVNode("div", {
    class: "rowc",
    onload: _ctx.loadImagePreview()
  }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.imagesLivePreview, function (img, key) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: "colc-4",
      style: {
        "padding": "10px 2px",
        "margin-top": "20px"
      },
      key: key
    }, [vue.createElementVNode("div", _hoisted_17, [vue.createElementVNode("img", {
      draggable: "false",
      title: 'remove-' + img.name,
      onClick: function onClick($event) {
        return _ctx.removeImgPreview(img.name);
      },
      ref_for: true,
      ref: 'image' + img.name,
      alt: img.name,
      class: "imgPreview"
    }, null, 8, _hoisted_18), vue.createElementVNode("i", {
      onClick: function onClick($event) {
        return _ctx.removeImgPreview(img.name);
      },
      class: "delIcon"
    }, "ⓧ", 8, _hoisted_19)])]);
  }), 128))], 8, _hoisted_16)], 544);
}function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z = "\n.closebtn[data-v-32103c56],.delIcon[data-v-32103c56],.file-select[data-v-32103c56],.imgPreview[data-v-32103c56],input[type=file][data-v-32103c56]{cursor:pointer}.colc-4[data-v-32103c56]{width:33.33%}*[data-v-32103c56]{box-sizing:border-box}.rowc[data-v-32103c56]{display:table;border-radius:5px;padding-top:5px;-webkit-user-drag:none;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}@media only screen and (max-width:476px){[class*=colc-][data-v-32103c56]{display:inline;width:33.33%}}@media only screen and (min-width:476px) and (max-width:768px){[class*=colc-][data-v-32103c56]{display:inline;width:25%}}@media only screen and (min-width:769px){[class*=colc-][data-v-32103c56]{display:inline;width:20%}}.closebtn[data-v-32103c56]{margin-left:15px;color:#fff;font-weight:700;float:right;font-size:22px;line-height:20px;transition:.3s}.closebtn[data-v-32103c56]:hover{color:#000}.imghover[data-v-32103c56]{border:2px solid #dfd4d4;position:relative;display:inline-block}.imghover[data-v-32103c56]:hover{box-shadow:2px 2px 5px #4594e4;transition:.2s ease-in-out;-moz-transition:.2s ease-in-out;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out}.zakerxa-upload[data-v-32103c56]{align-items:center;display:block;text-align:center;font-family:sans-serif;font-size:14px;position:relative;max-height:400px;width:100%}.file-select[data-v-32103c56],.file-select-button[data-v-32103c56]{align-items:center;display:flex;position:relative}.file-select[data-v-32103c56]{border:2px solid #dce4ec;color:#243342;height:42px;border-radius:8px;text-align:left;background:#f8f8f8;overflow:hidden;width:100%}.file-select-button[data-v-32103c56]{height:100%;background:#dce4ec;padding:12px 5px 12px 14px;font-weight:700}.file-ready[data-v-32103c56]{padding:0 5px 0 10px}.file-image[data-v-32103c56]{width:27px}.zakerxa-upload-input[data-v-32103c56],input[type=file][data-v-32103c56]{height:100%;width:100%;top:0;opacity:0;left:0;position:absolute}.zakerxa-upload .file-select[data-v-32103c56]:hover{border-color:#80a3c5;transition:.3s ease-in-out;-moz-transition:.3s ease-in-out;-webkit-transition:.3s ease-in-out;-o-transition:.3s ease-in-out}.zakerxa-upload .file-select:hover .file-select-button[data-v-32103c56]{background:#65a5e6;transition:.2s ease-in-out;-moz-transition:.2s ease-in-out;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out}.zakerxa-upload .file-select:hover .file-ready[data-v-32103c56]{background:#65a5e6;color:#f8f8f8;transition:.2s ease-in-out;-moz-transition:.2s ease-in-out;-webkit-transition:.2s ease-in-out;-o-transition:.2s ease-in-out}.zakerxa-upload-input[data-v-32103c56]{z-index:101}input[type=file][data-v-32103c56]{z-index:100}.zakerxa-upload .file-select.file-select-disabled[data-v-32103c56]{opacity:.65}.zakerxa-upload .file-select.file-select-disabled[data-v-32103c56]:hover{display:block;border:2px solid #dce4ec;color:#34495e;cursor:pointer;height:40px;line-height:40px;margin-top:5px;text-align:left;background:#fff;overflow:hidden;position:relative}.zakerxa-upload .file-select.file-select-disabled:hover .file-select-button[data-v-32103c56]{background:#dce4ec;color:#666;padding:0 10px;display:inline-block;height:40px;line-height:40px}.zakerxa-upload .file-select.file-select-disabled:hover .file-select-name[data-v-32103c56]{line-height:40px;display:inline-block;padding:0 10px}.delIcon[data-v-32103c56]{position:absolute;display:inline-block;top:-2px;right:3px;font-size:18px;font-style:normal;font-weight:bolder;color:#e71414}.zakerxaMultipleImageAlertOverlay[data-v-32103c56]{position:fixed;display:flex;align-items:center;z-index:9999;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.7);transition:opacity .5s;visibility:visible;opacity:1}.zakerxaMultipleImageAlertpopup[data-v-32103c56]{margin:70px auto;padding:20px;background:#fff;border-radius:5px;width:30%;position:relative;transition:.5s ease-in}.zakerxaMultipleImageAlertpopup h4[data-v-32103c56]{margin-top:0;color:#d55656;font-family:Tahoma,Arial,sans-serif}.zakerxaMultipleImageAlertpopup .close[data-v-32103c56]{position:absolute;top:3px;right:15px;transition:.2s;font-size:30px;font-weight:700;text-decoration:none;color:#333}.zakerxaMultipleImageAlertpopup .close[data-v-32103c56]:hover{color:#466ccd}.zakerxaMultipleImageAlertpopup .content[data-v-32103c56]{max-height:30%;overflow:auto}@media screen and (max-width:700px){.box[data-v-32103c56],.zakerxaMultipleImageAlertpopup[data-v-32103c56]{width:80%}}\n";
styleInject(css_248z);script.render = render;
script.__scopeId = "data-v-32103c56";// install function executed by Vue.use()
var install = function installVueMultiImageUpload(app) {
  Object.entries(script).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];
    app.component(componentName, component);
  });
};var components=/*#__PURE__*/Object.freeze({__proto__:null,'default':install,VueMultiImageUpload:script});// Attach named exports directly to plugin. IIFE/CJS will
// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)
Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    componentName = _ref2[0],
    component = _ref2[1];
  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;