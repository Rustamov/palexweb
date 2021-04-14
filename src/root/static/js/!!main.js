"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

"use strict";

!function (e) {
  "function" == typeof define && define.amd ? define([], e) : "undefined" != typeof module && null !== module && module.exports ? module.exports = e : e();
}(function () {
  var e = Object.assign || window.jQuery && jQuery.extend,
      t = 8,
      n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, t) {
    return window.setTimeout(function () {
      e();
    }, 25);
  };

  !function () {
    if ("function" == typeof window.CustomEvent) return !1;

    function e(e, t) {
      t = t || {
        bubbles: !1,
        cancelable: !1,
        detail: void 0
      };
      var n = document.createEvent("CustomEvent");
      return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
    }

    e.prototype = window.Event.prototype, window.CustomEvent = e;
  }();
  var o = {
    textarea: !0,
    input: !0,
    select: !0,
    button: !0
  },
      i = {
    move: "mousemove",
    cancel: "mouseup dragstart",
    end: "mouseup"
  },
      a = {
    move: "touchmove",
    cancel: "touchend",
    end: "touchend"
  },
      c = /\s+/,
      u = {
    bubbles: !0,
    cancelable: !0
  },
      r = "function" == typeof Symbol ? Symbol("events") : {};

  function d(e) {
    return e[r] || (e[r] = {});
  }

  function m(e, t, n, o, i) {
    t = t.split(c);
    var a,
        u = d(e),
        r = t.length;

    function m(e) {
      n(e, o);
    }

    for (; r--;) {
      (u[a = t[r]] || (u[a] = [])).push([n, m]), e.addEventListener(a, m);
    }
  }

  function v(e, t, n, o) {
    t = t.split(c);
    var i,
        a,
        u,
        r = d(e),
        m = t.length;
    if (r) for (; m--;) {
      if (a = r[i = t[m]]) for (u = a.length; u--;) {
        a[u][0] === n && (e.removeEventListener(i, a[u][1]), a.splice(u, 1));
      }
    }
  }

  function f(t, n, o) {
    var i = new CustomEvent(n, u);
    o && e(i, o), t.dispatchEvent(i);
  }

  function s() {}

  function l(e) {
    e.preventDefault();
  }

  function p(e, t) {
    var n, o;
    if (e.identifiedTouch) return e.identifiedTouch(t);

    for (n = -1, o = e.length; ++n < o;) {
      if (e[n].identifier === t) return e[n];
    }
  }

  function g(e, t) {
    var n = p(e.changedTouches, t.identifier);
    if (n && (n.pageX !== t.pageX || n.pageY !== t.pageY)) return n;
  }

  function h(e, t) {
    w(e, t, e, Y);
  }

  function X(e, t) {
    Y();
  }

  function Y() {
    v(document, i.move, h), v(document, i.cancel, X);
  }

  function y(e) {
    v(document, a.move, e.touchmove), v(document, a.cancel, e.touchend);
  }

  function w(e, n, o, i) {
    var a,
        c,
        u,
        r,
        d,
        m,
        v,
        l,
        p,
        g = o.pageX - n.pageX,
        h = o.pageY - n.pageY;
    g * g + h * h < t * t || (c = n, u = o, r = g, d = h, m = i, v = (a = e).targetTouches, l = a.timeStamp - c.timeStamp, p = {
      altKey: a.altKey,
      ctrlKey: a.ctrlKey,
      shiftKey: a.shiftKey,
      startX: c.pageX,
      startY: c.pageY,
      distX: r,
      distY: d,
      deltaX: r,
      deltaY: d,
      pageX: u.pageX,
      pageY: u.pageY,
      velocityX: r / l,
      velocityY: d / l,
      identifier: c.identifier,
      targetTouches: v,
      finger: v ? v.length : 1,
      enableMove: function enableMove() {
        this.moveEnabled = !0, this.enableMove = s, a.preventDefault();
      }
    }, f(c.target, "movestart", p), m(c));
  }

  function b(e, t) {
    var n = t.timer;
    t.touch = e, t.timeStamp = e.timeStamp, n.kick();
  }

  function T(e, t) {
    var n = t.target,
        o = t.event,
        a = t.timer;
    v(document, i.move, b), v(document, i.end, T), S(n, o, a, function () {
      setTimeout(function () {
        v(n, "click", l);
      }, 0);
    });
  }

  function E(e, t) {
    var n,
        o = t.target,
        i = t.event,
        c = t.timer;
    p(e.changedTouches, i.identifier) && (n = t, v(document, a.move, n.activeTouchmove), v(document, a.end, n.activeTouchend), S(o, i, c));
  }

  function S(e, t, n, o) {
    n.end(function () {
      return f(e, "moveend", t), o && o();
    });
  }

  if (m(document, "mousedown", function (e) {
    var t;
    1 !== (t = e).which || t.ctrlKey || t.altKey || o[e.target.tagName.toLowerCase()] || (m(document, i.move, h, e), m(document, i.cancel, X, e));
  }), m(document, "touchstart", function (e) {
    if (!o[e.target.tagName.toLowerCase()]) {
      var t = e.changedTouches[0],
          n = {
        target: t.target,
        pageX: t.pageX,
        pageY: t.pageY,
        identifier: t.identifier,
        touchmove: function touchmove(e, t) {
          var n, o, i;
          (i = g(n = e, o = t)) && w(n, o, i, y);
        },
        touchend: function touchend(e, t) {
          var n;
          n = t, p(e.changedTouches, n.identifier) && y(n);
        }
      };
      m(document, a.move, n.touchmove, n), m(document, a.cancel, n.touchend, n);
    }
  }), m(document, "movestart", function (e) {
    if (!e.defaultPrevented && e.moveEnabled) {
      var t = {
        startX: e.startX,
        startY: e.startY,
        pageX: e.pageX,
        pageY: e.pageY,
        distX: e.distX,
        distY: e.distY,
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        velocityX: e.velocityX,
        velocityY: e.velocityY,
        identifier: e.identifier,
        targetTouches: e.targetTouches,
        finger: e.finger
      },
          o = {
        target: e.target,
        event: t,
        timer: new function (e) {
          var t = e,
              o = !1,
              i = !1;

          function a(e) {
            o ? (t(), n(a), i = !0, o = !1) : i = !1;
          }

          this.kick = function (e) {
            o = !0, i || a();
          }, this.end = function (e) {
            var n = t;
            e && (i ? (t = o ? function () {
              n(), e();
            } : e, o = !0) : e());
          };
        }(function (e) {
          var n, i, a, c;
          n = t, i = o.touch, a = o.timeStamp, c = a - n.timeStamp, n.distX = i.pageX - n.startX, n.distY = i.pageY - n.startY, n.deltaX = i.pageX - n.pageX, n.deltaY = i.pageY - n.pageY, n.velocityX = .3 * n.velocityX + .7 * n.deltaX / c, n.velocityY = .3 * n.velocityY + .7 * n.deltaY / c, n.pageX = i.pageX, n.pageY = i.pageY, f(o.target, "move", t);
        }),
        touch: void 0,
        timeStamp: e.timeStamp
      };
      void 0 === e.identifier ? (m(e.target, "click", l), m(document, i.move, b, o), m(document, i.end, T, o)) : (o.activeTouchmove = function (e, t) {
        var n, o, i, a, c;
        n = e, i = (o = t).event, a = o.timer, (c = g(n, i)) && (n.preventDefault(), i.targetTouches = n.targetTouches, o.touch = c, o.timeStamp = n.timeStamp, a.kick());
      }, o.activeTouchend = function (e, t) {
        E(e, t);
      }, m(document, a.move, o.activeTouchmove, o), m(document, a.end, o.activeTouchend, o));
    }
  }), window.jQuery) {
    var k = "startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY".split(" ");
    jQuery.event.special.movestart = {
      setup: function setup() {
        return m(this, "movestart", K), !1;
      },
      teardown: function teardown() {
        return v(this, "movestart", K), !1;
      },
      add: Q
    }, jQuery.event.special.move = {
      setup: function setup() {
        return m(this, "movestart", j), !1;
      },
      teardown: function teardown() {
        return v(this, "movestart", j), !1;
      },
      add: Q
    }, jQuery.event.special.moveend = {
      setup: function setup() {
        return m(this, "movestart", C), !1;
      },
      teardown: function teardown() {
        return v(this, "movestart", C), !1;
      },
      add: Q
    };
  }

  function K(e) {
    e.enableMove();
  }

  function j(e) {
    e.enableMove();
  }

  function C(e) {
    e.enableMove();
  }

  function Q(e) {
    var t = e.handler;

    e.handler = function (e) {
      for (var n, o = k.length; o--;) {
        e[n = k[o]] = e.originalEvent[n];
      }

      t.apply(this, arguments);
    };
  }
});
"use strict";

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

/*!
* jquery.inputmask.bundle.js
* https://github.com/RobinHerbots/Inputmask
* Copyright (c) 2010 - 2018 Robin Herbots
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
* Version: 4.0.4
*/
(function (modules) {
  var installedModules = {};

  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }

  __webpack_require__.m = modules;
  __webpack_require__.c = installedModules;

  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
    }
  };

  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: "Module"
      });
    }

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  };

  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if (mode & 4 && _typeof2(value) === "object" && value && value.__esModule) return value;
    var ns = Object.create(null);

    __webpack_require__.r(ns);

    Object.defineProperty(ns, "default", {
      enumerable: true,
      value: value
    });
    if (mode & 2 && typeof value != "string") for (var key in value) {
      __webpack_require__.d(ns, key, function (key) {
        return value[key];
      }.bind(null, key));
    }
    return ns;
  };

  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ? function getDefault() {
      return module["default"];
    } : function getModuleExports() {
      return module;
    };

    __webpack_require__.d(getter, "a", getter);

    return getter;
  };

  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  __webpack_require__.p = "";
  return __webpack_require__(__webpack_require__.s = 0);
})([function (module, exports, __webpack_require__) {
  "use strict";

  __webpack_require__(1);

  __webpack_require__(6);

  __webpack_require__(7);

  var _inputmask = __webpack_require__(2);

  var _inputmask2 = _interopRequireDefault(_inputmask);

  var _inputmask3 = __webpack_require__(3);

  var _inputmask4 = _interopRequireDefault(_inputmask3);

  var _jquery = __webpack_require__(4);

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  if (_inputmask4.default === _jquery2.default) {
    __webpack_require__(8);
  }

  window.Inputmask = _inputmask2.default;
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  (function (factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(function (Inputmask) {
    Inputmask.extendDefinitions({
      A: {
        validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
        casing: "upper"
      },
      "&": {
        validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
        casing: "upper"
      },
      "#": {
        validator: "[0-9A-Fa-f]",
        casing: "upper"
      }
    });
    Inputmask.extendAliases({
      cssunit: {
        regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
      },
      url: {
        regex: "(https?|ftp)//.*",
        autoUnmask: false
      },
      ip: {
        mask: "i[i[i]].i[i[i]].i[i[i]].i[i[i]]",
        definitions: {
          i: {
            validator: function validator(chrs, maskset, pos, strict, opts) {
              if (pos - 1 > -1 && maskset.buffer[pos - 1] !== ".") {
                chrs = maskset.buffer[pos - 1] + chrs;

                if (pos - 2 > -1 && maskset.buffer[pos - 2] !== ".") {
                  chrs = maskset.buffer[pos - 2] + chrs;
                } else chrs = "0" + chrs;
              } else chrs = "00" + chrs;

              return new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(chrs);
            }
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          return maskedValue;
        },
        inputmode: "numeric"
      },
      email: {
        mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
        greedy: false,
        casing: "lower",
        onBeforePaste: function onBeforePaste(pastedValue, opts) {
          pastedValue = pastedValue.toLowerCase();
          return pastedValue.replace("mailto:", "");
        },
        definitions: {
          "*": {
            validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5!#$%&'*+/=?^_`{|}~-]"
          },
          "-": {
            validator: "[0-9A-Za-z-]"
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          return maskedValue;
        },
        inputmode: "email"
      },
      mac: {
        mask: "##:##:##:##:##:##"
      },
      vin: {
        mask: "V{13}9{4}",
        definitions: {
          V: {
            validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
            casing: "upper"
          }
        },
        clearIncomplete: true,
        autoUnmask: true
      }
    });
    return Inputmask;
  });
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  (function (factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(function ($, window, undefined) {
    var document = window.document,
        ua = navigator.userAgent,
        ie = ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident/") > 0,
        mobile = isInputEventSupported("touchstart"),
        iemobile = /iemobile/i.test(ua),
        iphone = /iphone/i.test(ua) && !iemobile;

    function Inputmask(alias, options, internal) {
      if (!(this instanceof Inputmask)) {
        return new Inputmask(alias, options, internal);
      }

      this.el = undefined;
      this.events = {};
      this.maskset = undefined;
      this.refreshValue = false;

      if (internal !== true) {
        if ($.isPlainObject(alias)) {
          options = alias;
        } else {
          options = options || {};
          if (alias) options.alias = alias;
        }

        this.opts = $.extend(true, {}, this.defaults, options);
        this.noMasksCache = options && options.definitions !== undefined;
        this.userOptions = options || {};
        this.isRTL = this.opts.numericInput;
        resolveAlias(this.opts.alias, options, this.opts);
      }
    }

    Inputmask.prototype = {
      dataAttribute: "data-inputmask",
      defaults: {
        placeholder: "_",
        optionalmarker: ["[", "]"],
        quantifiermarker: ["{", "}"],
        groupmarker: ["(", ")"],
        alternatormarker: "|",
        escapeChar: "\\",
        mask: null,
        regex: null,
        oncomplete: $.noop,
        onincomplete: $.noop,
        oncleared: $.noop,
        repeat: 0,
        greedy: false,
        autoUnmask: false,
        removeMaskOnSubmit: false,
        clearMaskOnLostFocus: true,
        insertMode: true,
        clearIncomplete: false,
        alias: null,
        onKeyDown: $.noop,
        onBeforeMask: null,
        onBeforePaste: function onBeforePaste(pastedValue, opts) {
          return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
        },
        onBeforeWrite: null,
        onUnMask: null,
        showMaskOnFocus: true,
        showMaskOnHover: true,
        onKeyValidation: $.noop,
        skipOptionalPartCharacter: " ",
        numericInput: false,
        rightAlign: false,
        undoOnEscape: true,
        radixPoint: "",
        _radixDance: false,
        groupSeparator: "",
        keepStatic: null,
        positionCaretOnTab: true,
        tabThrough: false,
        supportsInputType: ["text", "tel", "url", "password", "search"],
        ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
        isComplete: null,
        preValidation: null,
        postValidation: null,
        staticDefinitionSymbol: undefined,
        jitMasking: false,
        nullable: true,
        inputEventOnly: false,
        noValuePatching: false,
        positionCaretOnClick: "lvp",
        casing: null,
        inputmode: "verbatim",
        colorMask: false,
        disablePredictiveText: false,
        importDataAttributes: true,
        shiftPositions: true
      },
      definitions: {
        9: {
          validator: "[0-9\uFF11-\uFF19]",
          definitionSymbol: "*"
        },
        a: {
          validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
          definitionSymbol: "*"
        },
        "*": {
          validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]"
        }
      },
      aliases: {},
      masksCache: {},
      mask: function mask(elems) {
        var that = this;

        function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
          if (opts.importDataAttributes === true) {
            var importOption = function importOption(option, optionData) {
              optionData = optionData !== undefined ? optionData : npt.getAttribute(dataAttribute + "-" + option);

              if (optionData !== null) {
                if (typeof optionData === "string") {
                  if (option.indexOf("on") === 0) optionData = window[optionData];else if (optionData === "false") optionData = false;else if (optionData === "true") optionData = true;
                }

                userOptions[option] = optionData;
              }
            };

            var attrOptions = npt.getAttribute(dataAttribute),
                option,
                dataoptions,
                optionData,
                p;

            if (attrOptions && attrOptions !== "") {
              attrOptions = attrOptions.replace(/'/g, '"');
              dataoptions = JSON.parse("{" + attrOptions + "}");
            }

            if (dataoptions) {
              optionData = undefined;

              for (p in dataoptions) {
                if (p.toLowerCase() === "alias") {
                  optionData = dataoptions[p];
                  break;
                }
              }
            }

            importOption("alias", optionData);

            if (userOptions.alias) {
              resolveAlias(userOptions.alias, userOptions, opts);
            }

            for (option in opts) {
              if (dataoptions) {
                optionData = undefined;

                for (p in dataoptions) {
                  if (p.toLowerCase() === option.toLowerCase()) {
                    optionData = dataoptions[p];
                    break;
                  }
                }
              }

              importOption(option, optionData);
            }
          }

          $.extend(true, opts, userOptions);

          if (npt.dir === "rtl" || opts.rightAlign) {
            npt.style.textAlign = "right";
          }

          if (npt.dir === "rtl" || opts.numericInput) {
            npt.dir = "ltr";
            npt.removeAttribute("dir");
            opts.isRTL = true;
          }

          return Object.keys(userOptions).length;
        }

        if (typeof elems === "string") {
          elems = document.getElementById(elems) || document.querySelectorAll(elems);
        }

        elems = elems.nodeName ? [elems] : elems;
        $.each(elems, function (ndx, el) {
          var scopedOpts = $.extend(true, {}, that.opts);

          if (importAttributeOptions(el, scopedOpts, $.extend(true, {}, that.userOptions), that.dataAttribute)) {
            var maskset = generateMaskSet(scopedOpts, that.noMasksCache);

            if (maskset !== undefined) {
              if (el.inputmask !== undefined) {
                el.inputmask.opts.autoUnmask = true;
                el.inputmask.remove();
              }

              el.inputmask = new Inputmask(undefined, undefined, true);
              el.inputmask.opts = scopedOpts;
              el.inputmask.noMasksCache = that.noMasksCache;
              el.inputmask.userOptions = $.extend(true, {}, that.userOptions);
              el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput;
              el.inputmask.el = el;
              el.inputmask.maskset = maskset;
              $.data(el, "_inputmask_opts", scopedOpts);
              maskScope.call(el.inputmask, {
                action: "mask"
              });
            }
          }
        });
        return elems && elems[0] ? elems[0].inputmask || this : this;
      },
      option: function option(options, noremask) {
        if (typeof options === "string") {
          return this.opts[options];
        } else if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
          $.extend(this.userOptions, options);

          if (this.el && noremask !== true) {
            this.mask(this.el);
          }

          return this;
        }
      },
      unmaskedvalue: function unmaskedvalue(value) {
        this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
        return maskScope.call(this, {
          action: "unmaskedvalue",
          value: value
        });
      },
      remove: function remove() {
        return maskScope.call(this, {
          action: "remove"
        });
      },
      getemptymask: function getemptymask() {
        this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
        return maskScope.call(this, {
          action: "getemptymask"
        });
      },
      hasMaskedValue: function hasMaskedValue() {
        return !this.opts.autoUnmask;
      },
      isComplete: function isComplete() {
        this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
        return maskScope.call(this, {
          action: "isComplete"
        });
      },
      getmetadata: function getmetadata() {
        this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
        return maskScope.call(this, {
          action: "getmetadata"
        });
      },
      isValid: function isValid(value) {
        this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
        return maskScope.call(this, {
          action: "isValid",
          value: value
        });
      },
      format: function format(value, metadata) {
        this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache);
        return maskScope.call(this, {
          action: "format",
          value: value,
          metadata: metadata
        });
      },
      setValue: function setValue(value) {
        if (this.el) {
          $(this.el).trigger("setvalue", [value]);
        }
      },
      analyseMask: function analyseMask(mask, regexMask, opts) {
        var tokenizer = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?(?:\|[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,
            regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
            escaped = false,
            currentToken = new MaskToken(),
            match,
            m,
            openenings = [],
            maskTokens = [],
            openingToken,
            currentOpeningToken,
            alternator,
            lastMatch,
            groupToken;

        function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
          this.matches = [];
          this.openGroup = isGroup || false;
          this.alternatorGroup = false;
          this.isGroup = isGroup || false;
          this.isOptional = isOptional || false;
          this.isQuantifier = isQuantifier || false;
          this.isAlternator = isAlternator || false;
          this.quantifier = {
            min: 1,
            max: 1
          };
        }

        function insertTestDefinition(mtoken, element, position) {
          position = position !== undefined ? position : mtoken.matches.length;
          var prevMatch = mtoken.matches[position - 1];

          if (regexMask) {
            if (element.indexOf("[") === 0 || escaped && /\\d|\\s|\\w]/i.test(element) || element === ".") {
              mtoken.matches.splice(position++, 0, {
                fn: new RegExp(element, opts.casing ? "i" : ""),
                optionality: false,
                newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element,
                casing: null,
                def: element,
                placeholder: undefined,
                nativeDef: element
              });
            } else {
              if (escaped) element = element[element.length - 1];
              $.each(element.split(""), function (ndx, lmnt) {
                prevMatch = mtoken.matches[position - 1];
                mtoken.matches.splice(position++, 0, {
                  fn: null,
                  optionality: false,
                  newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== lmnt && prevMatch.fn !== null,
                  casing: null,
                  def: opts.staticDefinitionSymbol || lmnt,
                  placeholder: opts.staticDefinitionSymbol !== undefined ? lmnt : undefined,
                  nativeDef: (escaped ? "'" : "") + lmnt
                });
              });
            }

            escaped = false;
          } else {
            var maskdef = (opts.definitions ? opts.definitions[element] : undefined) || Inputmask.prototype.definitions[element];

            if (maskdef && !escaped) {
              mtoken.matches.splice(position++, 0, {
                fn: maskdef.validator ? typeof maskdef.validator == "string" ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
                  this.test = maskdef.validator;
                }() : new RegExp("."),
                optionality: false,
                newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
                casing: maskdef.casing,
                def: maskdef.definitionSymbol || element,
                placeholder: maskdef.placeholder,
                nativeDef: element
              });
            } else {
              mtoken.matches.splice(position++, 0, {
                fn: null,
                optionality: false,
                newBlockMarker: prevMatch === undefined ? "master" : prevMatch.def !== element && prevMatch.fn !== null,
                casing: null,
                def: opts.staticDefinitionSymbol || element,
                placeholder: opts.staticDefinitionSymbol !== undefined ? element : undefined,
                nativeDef: (escaped ? "'" : "") + element
              });
              escaped = false;
            }
          }
        }

        function verifyGroupMarker(maskToken) {
          if (maskToken && maskToken.matches) {
            $.each(maskToken.matches, function (ndx, token) {
              var nextToken = maskToken.matches[ndx + 1];

              if ((nextToken === undefined || nextToken.matches === undefined || nextToken.isQuantifier === false) && token && token.isGroup) {
                token.isGroup = false;

                if (!regexMask) {
                  insertTestDefinition(token, opts.groupmarker[0], 0);

                  if (token.openGroup !== true) {
                    insertTestDefinition(token, opts.groupmarker[1]);
                  }
                }
              }

              verifyGroupMarker(token);
            });
          }
        }

        function defaultCase() {
          if (openenings.length > 0) {
            currentOpeningToken = openenings[openenings.length - 1];
            insertTestDefinition(currentOpeningToken, m);

            if (currentOpeningToken.isAlternator) {
              alternator = openenings.pop();

              for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                if (alternator.matches[mndx].isGroup) alternator.matches[mndx].isGroup = false;
              }

              if (openenings.length > 0) {
                currentOpeningToken = openenings[openenings.length - 1];
                currentOpeningToken.matches.push(alternator);
              } else {
                currentToken.matches.push(alternator);
              }
            }
          } else {
            insertTestDefinition(currentToken, m);
          }
        }

        function reverseTokens(maskToken) {
          function reverseStatic(st) {
            if (st === opts.optionalmarker[0]) st = opts.optionalmarker[1];else if (st === opts.optionalmarker[1]) st = opts.optionalmarker[0];else if (st === opts.groupmarker[0]) st = opts.groupmarker[1];else if (st === opts.groupmarker[1]) st = opts.groupmarker[0];
            return st;
          }

          maskToken.matches = maskToken.matches.reverse();

          for (var match in maskToken.matches) {
            if (maskToken.matches.hasOwnProperty(match)) {
              var intMatch = parseInt(match);

              if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
                var qt = maskToken.matches[match];
                maskToken.matches.splice(match, 1);
                maskToken.matches.splice(intMatch + 1, 0, qt);
              }

              if (maskToken.matches[match].matches !== undefined) {
                maskToken.matches[match] = reverseTokens(maskToken.matches[match]);
              } else {
                maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
              }
            }
          }

          return maskToken;
        }

        function groupify(matches) {
          var groupToken = new MaskToken(true);
          groupToken.openGroup = false;
          groupToken.matches = matches;
          return groupToken;
        }

        if (regexMask) {
          opts.optionalmarker[0] = undefined;
          opts.optionalmarker[1] = undefined;
        }

        while (match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask)) {
          m = match[0];

          if (regexMask) {
            switch (m.charAt(0)) {
              case "?":
                m = "{0,1}";
                break;

              case "+":
              case "*":
                m = "{" + m + "}";
                break;
            }
          }

          if (escaped) {
            defaultCase();
            continue;
          }

          switch (m.charAt(0)) {
            case "(?=":
              break;

            case "(?!":
              break;

            case "(?<=":
              break;

            case "(?<!":
              break;

            case opts.escapeChar:
              escaped = true;

              if (regexMask) {
                defaultCase();
              }

              break;

            case opts.optionalmarker[1]:
            case opts.groupmarker[1]:
              openingToken = openenings.pop();
              openingToken.openGroup = false;

              if (openingToken !== undefined) {
                if (openenings.length > 0) {
                  currentOpeningToken = openenings[openenings.length - 1];
                  currentOpeningToken.matches.push(openingToken);

                  if (currentOpeningToken.isAlternator) {
                    alternator = openenings.pop();

                    for (var mndx = 0; mndx < alternator.matches.length; mndx++) {
                      alternator.matches[mndx].isGroup = false;
                      alternator.matches[mndx].alternatorGroup = false;
                    }

                    if (openenings.length > 0) {
                      currentOpeningToken = openenings[openenings.length - 1];
                      currentOpeningToken.matches.push(alternator);
                    } else {
                      currentToken.matches.push(alternator);
                    }
                  }
                } else {
                  currentToken.matches.push(openingToken);
                }
              } else defaultCase();

              break;

            case opts.optionalmarker[0]:
              openenings.push(new MaskToken(false, true));
              break;

            case opts.groupmarker[0]:
              openenings.push(new MaskToken(true));
              break;

            case opts.quantifiermarker[0]:
              var quantifier = new MaskToken(false, false, true);
              m = m.replace(/[{}]/g, "");
              var mqj = m.split("|"),
                  mq = mqj[0].split(","),
                  mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
                  mq1 = mq.length === 1 ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);

              if (mq0 === "*" || mq0 === "+") {
                mq0 = mq1 === "*" ? 0 : 1;
              }

              quantifier.quantifier = {
                min: mq0,
                max: mq1,
                jit: mqj[1]
              };
              var matches = openenings.length > 0 ? openenings[openenings.length - 1].matches : currentToken.matches;
              match = matches.pop();

              if (match.isAlternator) {
                matches.push(match);
                matches = match.matches;
                var groupToken = new MaskToken(true);
                var tmpMatch = matches.pop();
                matches.push(groupToken);
                matches = groupToken.matches;
                match = tmpMatch;
              }

              if (!match.isGroup) {
                match = groupify([match]);
              }

              matches.push(match);
              matches.push(quantifier);
              break;

            case opts.alternatormarker:
              var groupQuantifier = function groupQuantifier(matches) {
                var lastMatch = matches.pop();

                if (lastMatch.isQuantifier) {
                  lastMatch = groupify([matches.pop(), lastMatch]);
                }

                return lastMatch;
              };

              if (openenings.length > 0) {
                currentOpeningToken = openenings[openenings.length - 1];
                var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];

                if (currentOpeningToken.openGroup && (subToken.matches === undefined || subToken.isGroup === false && subToken.isAlternator === false)) {
                  lastMatch = openenings.pop();
                } else {
                  lastMatch = groupQuantifier(currentOpeningToken.matches);
                }
              } else {
                lastMatch = groupQuantifier(currentToken.matches);
              }

              if (lastMatch.isAlternator) {
                openenings.push(lastMatch);
              } else {
                if (lastMatch.alternatorGroup) {
                  alternator = openenings.pop();
                  lastMatch.alternatorGroup = false;
                } else {
                  alternator = new MaskToken(false, false, false, true);
                }

                alternator.matches.push(lastMatch);
                openenings.push(alternator);

                if (lastMatch.openGroup) {
                  lastMatch.openGroup = false;
                  var alternatorGroup = new MaskToken(true);
                  alternatorGroup.alternatorGroup = true;
                  openenings.push(alternatorGroup);
                }
              }

              break;

            default:
              defaultCase();
          }
        }

        while (openenings.length > 0) {
          openingToken = openenings.pop();
          currentToken.matches.push(openingToken);
        }

        if (currentToken.matches.length > 0) {
          verifyGroupMarker(currentToken);
          maskTokens.push(currentToken);
        }

        if (opts.numericInput || opts.isRTL) {
          reverseTokens(maskTokens[0]);
        }

        return maskTokens;
      }
    };

    Inputmask.extendDefaults = function (options) {
      $.extend(true, Inputmask.prototype.defaults, options);
    };

    Inputmask.extendDefinitions = function (definition) {
      $.extend(true, Inputmask.prototype.definitions, definition);
    };

    Inputmask.extendAliases = function (alias) {
      $.extend(true, Inputmask.prototype.aliases, alias);
    };

    Inputmask.format = function (value, options, metadata) {
      return Inputmask(options).format(value, metadata);
    };

    Inputmask.unmask = function (value, options) {
      return Inputmask(options).unmaskedvalue(value);
    };

    Inputmask.isValid = function (value, options) {
      return Inputmask(options).isValid(value);
    };

    Inputmask.remove = function (elems) {
      if (typeof elems === "string") {
        elems = document.getElementById(elems) || document.querySelectorAll(elems);
      }

      elems = elems.nodeName ? [elems] : elems;
      $.each(elems, function (ndx, el) {
        if (el.inputmask) el.inputmask.remove();
      });
    };

    Inputmask.setValue = function (elems, value) {
      if (typeof elems === "string") {
        elems = document.getElementById(elems) || document.querySelectorAll(elems);
      }

      elems = elems.nodeName ? [elems] : elems;
      $.each(elems, function (ndx, el) {
        if (el.inputmask) el.inputmask.setValue(value);else $(el).trigger("setvalue", [value]);
      });
    };

    Inputmask.escapeRegex = function (str) {
      var specials = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"];
      return str.replace(new RegExp("(\\" + specials.join("|\\") + ")", "gim"), "\\$1");
    };

    Inputmask.keyCode = {
      BACKSPACE: 8,
      BACKSPACE_SAFARI: 127,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      INSERT: 45,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38,
      X: 88,
      CONTROL: 17
    };
    Inputmask.dependencyLib = $;

    function resolveAlias(aliasStr, options, opts) {
      var aliasDefinition = Inputmask.prototype.aliases[aliasStr];

      if (aliasDefinition) {
        if (aliasDefinition.alias) resolveAlias(aliasDefinition.alias, undefined, opts);
        $.extend(true, opts, aliasDefinition);
        $.extend(true, opts, options);
        return true;
      } else if (opts.mask === null) {
        opts.mask = aliasStr;
      }

      return false;
    }

    function generateMaskSet(opts, nocache) {
      function generateMask(mask, metadata, opts) {
        var regexMask = false;

        if (mask === null || mask === "") {
          regexMask = opts.regex !== null;

          if (regexMask) {
            mask = opts.regex;
            mask = mask.replace(/^(\^)(.*)(\$)$/, "$2");
          } else {
            regexMask = true;
            mask = ".*";
          }
        }

        if (mask.length === 1 && opts.greedy === false && opts.repeat !== 0) {
          opts.placeholder = "";
        }

        if (opts.repeat > 0 || opts.repeat === "*" || opts.repeat === "+") {
          var repeatStart = opts.repeat === "*" ? 0 : opts.repeat === "+" ? 1 : opts.repeat;
          mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
        }

        var masksetDefinition,
            maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask;

        if (Inputmask.prototype.masksCache[maskdefKey] === undefined || nocache === true) {
          masksetDefinition = {
            mask: mask,
            maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
            validPositions: {},
            _buffer: undefined,
            buffer: undefined,
            tests: {},
            excludes: {},
            metadata: metadata,
            maskLength: undefined,
            jitOffset: {}
          };

          if (nocache !== true) {
            Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition;
            masksetDefinition = $.extend(true, {}, Inputmask.prototype.masksCache[maskdefKey]);
          }
        } else masksetDefinition = $.extend(true, {}, Inputmask.prototype.masksCache[maskdefKey]);

        return masksetDefinition;
      }

      var ms;

      if ($.isFunction(opts.mask)) {
        opts.mask = opts.mask(opts);
      }

      if ($.isArray(opts.mask)) {
        if (opts.mask.length > 1) {
          if (opts.keepStatic === null) {
            opts.keepStatic = "auto";

            for (var i = 0; i < opts.mask.length; i++) {
              if (opts.mask[i].charAt(0) !== opts.mask[0].charAt(0)) {
                opts.keepStatic = true;
                break;
              }
            }
          }

          var altMask = opts.groupmarker[0];
          $.each(opts.isRTL ? opts.mask.reverse() : opts.mask, function (ndx, msk) {
            if (altMask.length > 1) {
              altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0];
            }

            if (msk.mask !== undefined && !$.isFunction(msk.mask)) {
              altMask += msk.mask;
            } else {
              altMask += msk;
            }
          });
          altMask += opts.groupmarker[1];
          return generateMask(altMask, opts.mask, opts);
        } else opts.mask = opts.mask.pop();
      }

      if (opts.mask && opts.mask.mask !== undefined && !$.isFunction(opts.mask.mask)) {
        ms = generateMask(opts.mask.mask, opts.mask, opts);
      } else {
        ms = generateMask(opts.mask, opts.mask, opts);
      }

      return ms;
    }

    function isInputEventSupported(eventName) {
      var el = document.createElement("input"),
          evName = "on" + eventName,
          isSupported = evName in el;

      if (!isSupported) {
        el.setAttribute(evName, "return;");
        isSupported = typeof el[evName] === "function";
      }

      el = null;
      return isSupported;
    }

    function maskScope(actionObj, maskset, opts) {
      maskset = maskset || this.maskset;
      opts = opts || this.opts;
      var inputmask = this,
          el = this.el,
          isRTL = this.isRTL,
          undoValue,
          $el,
          skipKeyPressEvent = false,
          skipInputEvent = false,
          ignorable = false,
          maxLength,
          mouseEnter = false,
          colorMask,
          originalPlaceholder;

      function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
        var greedy = opts.greedy;
        if (clearOptionalTail) opts.greedy = false;
        minimalPos = minimalPos || 0;
        var maskTemplate = [],
            ndxIntlzr,
            pos = 0,
            test,
            testPos,
            lvp = getLastValidPosition();

        do {
          if (baseOnInput === true && getMaskSet().validPositions[pos]) {
            testPos = clearOptionalTail && getMaskSet().validPositions[pos].match.optionality === true && getMaskSet().validPositions[pos + 1] === undefined && (getMaskSet().validPositions[pos].generatedInput === true || getMaskSet().validPositions[pos].input == opts.skipOptionalPartCharacter && pos > 0) ? determineTestTemplate(pos, getTests(pos, ndxIntlzr, pos - 1)) : getMaskSet().validPositions[pos];
            test = testPos.match;
            ndxIntlzr = testPos.locator.slice();
            maskTemplate.push(includeMode === true ? testPos.input : includeMode === false ? test.nativeDef : getPlaceholder(pos, test));
          } else {
            testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
            test = testPos.match;
            ndxIntlzr = testPos.locator.slice();
            var jitMasking = noJit === true ? false : opts.jitMasking !== false ? opts.jitMasking : test.jit;

            if (jitMasking === false || jitMasking === undefined || typeof jitMasking === "number" && isFinite(jitMasking) && jitMasking > pos) {
              maskTemplate.push(includeMode === false ? test.nativeDef : getPlaceholder(pos, test));
            }
          }

          if (opts.keepStatic === "auto") {
            if (test.newBlockMarker && test.fn !== null) {
              opts.keepStatic = pos - 1;
            }
          }

          pos++;
        } while ((maxLength === undefined || pos < maxLength) && (test.fn !== null || test.def !== "") || minimalPos > pos);

        if (maskTemplate[maskTemplate.length - 1] === "") {
          maskTemplate.pop();
        }

        if (includeMode !== false || getMaskSet().maskLength === undefined) getMaskSet().maskLength = pos - 1;
        opts.greedy = greedy;
        return maskTemplate;
      }

      function getMaskSet() {
        return maskset;
      }

      function resetMaskSet(soft) {
        var maskset = getMaskSet();
        maskset.buffer = undefined;

        if (soft !== true) {
          maskset.validPositions = {};
          maskset.p = 0;
        }
      }

      function getLastValidPosition(closestTo, strict, validPositions) {
        var before = -1,
            after = -1,
            valids = validPositions || getMaskSet().validPositions;
        if (closestTo === undefined) closestTo = -1;

        for (var posNdx in valids) {
          var psNdx = parseInt(posNdx);

          if (valids[psNdx] && (strict || valids[psNdx].generatedInput !== true)) {
            if (psNdx <= closestTo) before = psNdx;
            if (psNdx >= closestTo) after = psNdx;
          }
        }

        return before === -1 || before == closestTo ? after : after == -1 ? before : closestTo - before < after - closestTo ? before : after;
      }

      function getDecisionTaker(tst) {
        var decisionTaker = tst.locator[tst.alternation];

        if (typeof decisionTaker == "string" && decisionTaker.length > 0) {
          decisionTaker = decisionTaker.split(",")[0];
        }

        return decisionTaker !== undefined ? decisionTaker.toString() : "";
      }

      function getLocator(tst, align) {
        var locator = (tst.alternation != undefined ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
        if (locator !== "") while (locator.length < align) {
          locator += "0";
        }
        return locator;
      }

      function determineTestTemplate(pos, tests) {
        pos = pos > 0 ? pos - 1 : 0;
        var altTest = getTest(pos),
            targetLocator = getLocator(altTest),
            tstLocator,
            closest,
            bestMatch;

        for (var ndx = 0; ndx < tests.length; ndx++) {
          var tst = tests[ndx];
          tstLocator = getLocator(tst, targetLocator.length);
          var distance = Math.abs(tstLocator - targetLocator);

          if (closest === undefined || tstLocator !== "" && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && bestMatch.match.newBlockMarker === "master" && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) {
            closest = distance;
            bestMatch = tst;
          }
        }

        return bestMatch;
      }

      function getTestTemplate(pos, ndxIntlzr, tstPs) {
        return getMaskSet().validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
      }

      function getTest(pos, tests) {
        if (getMaskSet().validPositions[pos]) {
          return getMaskSet().validPositions[pos];
        }

        return (tests || getTests(pos))[0];
      }

      function positionCanMatchDefinition(pos, def) {
        var valid = false,
            tests = getTests(pos);

        for (var tndx = 0; tndx < tests.length; tndx++) {
          if (tests[tndx].match && tests[tndx].match.def === def) {
            valid = true;
            break;
          }
        }

        return valid;
      }

      function getTests(pos, ndxIntlzr, tstPs) {
        var maskTokens = getMaskSet().maskToken,
            testPos = ndxIntlzr ? tstPs : 0,
            ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
            matches = [],
            insertStop = false,
            latestMatch,
            cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";

        function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
          function handleMatch(match, loopNdx, quantifierRecurse) {
            function isFirstMatch(latestMatch, tokenGroup) {
              var firstMatch = $.inArray(latestMatch, tokenGroup.matches) === 0;

              if (!firstMatch) {
                $.each(tokenGroup.matches, function (ndx, match) {
                  if (match.isQuantifier === true) firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]);else if (match.hasOwnProperty("matches")) firstMatch = isFirstMatch(latestMatch, match);
                  if (firstMatch) return false;
                });
              }

              return firstMatch;
            }

            function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
              var bestMatch, indexPos;

              if (getMaskSet().tests[pos] || getMaskSet().validPositions[pos]) {
                $.each(getMaskSet().tests[pos] || [getMaskSet().validPositions[pos]], function (ndx, lmnt) {
                  if (lmnt.mloc[alternateNdx]) {
                    bestMatch = lmnt;
                    return false;
                  }

                  var alternation = targetAlternation !== undefined ? targetAlternation : lmnt.alternation,
                      ndxPos = lmnt.locator[alternation] !== undefined ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;

                  if ((indexPos === undefined || ndxPos < indexPos) && ndxPos !== -1) {
                    bestMatch = lmnt;
                    indexPos = ndxPos;
                  }
                });
              }

              if (bestMatch) {
                var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation];
                var locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                return locator.slice((targetAlternation !== undefined ? targetAlternation : bestMatch.alternation) + 1);
              } else {
                return targetAlternation !== undefined ? resolveNdxInitializer(pos, alternateNdx) : undefined;
              }
            }

            function isSubsetOf(source, target) {
              function expand(pattern) {
                var expanded = [],
                    start,
                    end;

                for (var i = 0, l = pattern.length; i < l; i++) {
                  if (pattern.charAt(i) === "-") {
                    end = pattern.charCodeAt(i + 1);

                    while (++start < end) {
                      expanded.push(String.fromCharCode(start));
                    }
                  } else {
                    start = pattern.charCodeAt(i);
                    expanded.push(pattern.charAt(i));
                  }
                }

                return expanded.join("");
              }

              if (opts.regex && source.match.fn !== null && target.match.fn !== null) {
                return expand(target.match.def.replace(/[\[\]]/g, "")).indexOf(expand(source.match.def.replace(/[\[\]]/g, ""))) !== -1;
              }

              return source.match.def === target.match.nativeDef;
            }

            function staticCanMatchDefinition(source, target) {
              var sloc = source.locator.slice(source.alternation).join(""),
                  tloc = target.locator.slice(target.alternation).join(""),
                  canMatch = sloc == tloc;
              canMatch = canMatch && source.match.fn === null && target.match.fn !== null ? target.match.fn.test(source.match.def, getMaskSet(), pos, false, opts, false) : false;
              return canMatch;
            }

            function setMergeLocators(targetMatch, altMatch) {
              if (altMatch === undefined || targetMatch.alternation === altMatch.alternation && targetMatch.locator[targetMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation]) === -1) {
                targetMatch.mloc = targetMatch.mloc || {};
                var locNdx = targetMatch.locator[targetMatch.alternation];
                if (locNdx === undefined) targetMatch.alternation = undefined;else {
                  if (typeof locNdx === "string") locNdx = locNdx.split(",")[0];
                  if (targetMatch.mloc[locNdx] === undefined) targetMatch.mloc[locNdx] = targetMatch.locator.slice();

                  if (altMatch !== undefined) {
                    for (var ndx in altMatch.mloc) {
                      if (typeof ndx === "string") ndx = ndx.split(",")[0];
                      if (targetMatch.mloc[ndx] === undefined) targetMatch.mloc[ndx] = altMatch.mloc[ndx];
                    }

                    targetMatch.locator[targetMatch.alternation] = Object.keys(targetMatch.mloc).join(",");
                  }

                  return true;
                }
              }

              return false;
            }

            if (testPos > 500 && quantifierRecurse !== undefined) {
              throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + getMaskSet().mask;
            }

            if (testPos === pos && match.matches === undefined) {
              matches.push({
                match: match,
                locator: loopNdx.reverse(),
                cd: cacheDependency,
                mloc: {}
              });
              return true;
            } else if (match.matches !== undefined) {
              if (match.isGroup && quantifierRecurse !== match) {
                match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx, quantifierRecurse);
                if (match) return true;
              } else if (match.isOptional) {
                var optionalToken = match;
                match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);

                if (match) {
                  $.each(matches, function (ndx, mtch) {
                    mtch.match.optionality = true;
                  });
                  latestMatch = matches[matches.length - 1].match;

                  if (quantifierRecurse === undefined && isFirstMatch(latestMatch, optionalToken)) {
                    insertStop = true;
                    testPos = pos;
                  } else return true;
                }
              } else if (match.isAlternator) {
                var alternateToken = match,
                    malternateMatches = [],
                    maltMatches,
                    currentMatches = matches.slice(),
                    loopNdxCnt = loopNdx.length;
                var altIndex = ndxInitializer.length > 0 ? ndxInitializer.shift() : -1;

                if (altIndex === -1 || typeof altIndex === "string") {
                  var currentPos = testPos,
                      ndxInitializerClone = ndxInitializer.slice(),
                      altIndexArr = [],
                      amndx;

                  if (typeof altIndex == "string") {
                    altIndexArr = altIndex.split(",");
                  } else {
                    for (amndx = 0; amndx < alternateToken.matches.length; amndx++) {
                      altIndexArr.push(amndx.toString());
                    }
                  }

                  if (getMaskSet().excludes[pos]) {
                    var altIndexArrClone = altIndexArr.slice();

                    for (var i = 0, el = getMaskSet().excludes[pos].length; i < el; i++) {
                      altIndexArr.splice(altIndexArr.indexOf(getMaskSet().excludes[pos][i].toString()), 1);
                    }

                    if (altIndexArr.length === 0) {
                      getMaskSet().excludes[pos] = undefined;
                      altIndexArr = altIndexArrClone;
                    }
                  }

                  if (opts.keepStatic === true || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) altIndexArr = altIndexArr.slice(0, 1);
                  var unMatchedAlternation = false;

                  for (var ndx = 0; ndx < altIndexArr.length; ndx++) {
                    amndx = parseInt(altIndexArr[ndx]);
                    matches = [];
                    ndxInitializer = typeof altIndex === "string" ? resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice() : ndxInitializerClone.slice();
                    if (alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse)) match = true;else if (ndx === 0) {
                      unMatchedAlternation = true;
                    }
                    maltMatches = matches.slice();
                    testPos = currentPos;
                    matches = [];

                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                      var altMatch = maltMatches[ndx1],
                          dropMatch = false;
                      altMatch.match.jit = altMatch.match.jit || unMatchedAlternation;
                      altMatch.alternation = altMatch.alternation || loopNdxCnt;
                      setMergeLocators(altMatch);

                      for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                        var altMatch2 = malternateMatches[ndx2];

                        if (typeof altIndex !== "string" || altMatch.alternation !== undefined && $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr) !== -1) {
                          if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                            dropMatch = true;
                            setMergeLocators(altMatch2, altMatch);
                            break;
                          } else if (isSubsetOf(altMatch, altMatch2)) {
                            if (setMergeLocators(altMatch, altMatch2)) {
                              dropMatch = true;
                              malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                            }

                            break;
                          } else if (isSubsetOf(altMatch2, altMatch)) {
                            setMergeLocators(altMatch2, altMatch);
                            break;
                          } else if (staticCanMatchDefinition(altMatch, altMatch2)) {
                            if (setMergeLocators(altMatch, altMatch2)) {
                              dropMatch = true;
                              malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch);
                            }

                            break;
                          }
                        }
                      }

                      if (!dropMatch) {
                        malternateMatches.push(altMatch);
                      }
                    }
                  }

                  matches = currentMatches.concat(malternateMatches);
                  testPos = pos;
                  insertStop = matches.length > 0;
                  match = malternateMatches.length > 0;
                  ndxInitializer = ndxInitializerClone.slice();
                } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);

                if (match) return true;
              } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1]) {
                var qt = match;

                for (var qndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                  var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                  match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup);

                  if (match) {
                    latestMatch = matches[matches.length - 1].match;
                    latestMatch.optionalQuantifier = qndx >= qt.quantifier.min;
                    latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit;

                    if (latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                      insertStop = true;
                      testPos = pos;
                      break;
                    }

                    if (latestMatch.jit) {
                      getMaskSet().jitOffset[pos] = tokenGroup.matches.indexOf(latestMatch);
                    }

                    return true;
                  }
                }
              } else {
                match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse);
                if (match) return true;
              }
            } else {
              testPos++;
            }
          }

          for (var tndx = ndxInitializer.length > 0 ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) {
            if (maskToken.matches[tndx].isQuantifier !== true) {
              var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);

              if (match && testPos === pos) {
                return match;
              } else if (testPos > pos) {
                break;
              }
            }
          }
        }

        function mergeLocators(pos, tests) {
          var locator = [];
          if (!$.isArray(tests)) tests = [tests];

          if (tests.length > 0) {
            if (tests[0].alternation === undefined) {
              locator = determineTestTemplate(pos, tests.slice()).locator.slice();
              if (locator.length === 0) locator = tests[0].locator.slice();
            } else {
              $.each(tests, function (ndx, tst) {
                if (tst.def !== "") {
                  if (locator.length === 0) locator = tst.locator.slice();else {
                    for (var i = 0; i < locator.length; i++) {
                      if (tst.locator[i] && locator[i].toString().indexOf(tst.locator[i]) === -1) {
                        locator[i] += "," + tst.locator[i];
                      }
                    }
                  }
                }
              });
            }
          }

          return locator;
        }

        if (pos > -1) {
          if (ndxIntlzr === undefined) {
            var previousPos = pos - 1,
                test;

            while ((test = getMaskSet().validPositions[previousPos] || getMaskSet().tests[previousPos]) === undefined && previousPos > -1) {
              previousPos--;
            }

            if (test !== undefined && previousPos > -1) {
              ndxInitializer = mergeLocators(previousPos, test);
              cacheDependency = ndxInitializer.join("");
              testPos = previousPos;
            }
          }

          if (getMaskSet().tests[pos] && getMaskSet().tests[pos][0].cd === cacheDependency) {
            return getMaskSet().tests[pos];
          }

          for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
            var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);

            if (match && testPos === pos || testPos > pos) {
              break;
            }
          }
        }

        if (matches.length === 0 || insertStop) {
          matches.push({
            match: {
              fn: null,
              optionality: false,
              casing: null,
              def: "",
              placeholder: ""
            },
            locator: [],
            mloc: {},
            cd: cacheDependency
          });
        }

        if (ndxIntlzr !== undefined && getMaskSet().tests[pos]) {
          return $.extend(true, [], matches);
        }

        getMaskSet().tests[pos] = $.extend(true, [], matches);
        return getMaskSet().tests[pos];
      }

      function getBufferTemplate() {
        if (getMaskSet()._buffer === undefined) {
          getMaskSet()._buffer = getMaskTemplate(false, 1);
          if (getMaskSet().buffer === undefined) getMaskSet().buffer = getMaskSet()._buffer.slice();
        }

        return getMaskSet()._buffer;
      }

      function getBuffer(noCache) {
        if (getMaskSet().buffer === undefined || noCache === true) {
          getMaskSet().buffer = getMaskTemplate(true, getLastValidPosition(), true);
          if (getMaskSet()._buffer === undefined) getMaskSet()._buffer = getMaskSet().buffer.slice();
        }

        return getMaskSet().buffer;
      }

      function refreshFromBuffer(start, end, buffer) {
        var i, p;

        if (start === true) {
          resetMaskSet();
          start = 0;
          end = buffer.length;
        } else {
          for (i = start; i < end; i++) {
            delete getMaskSet().validPositions[i];
          }
        }

        p = start;

        for (i = start; i < end; i++) {
          resetMaskSet(true);

          if (buffer[i] !== opts.skipOptionalPartCharacter) {
            var valResult = isValid(p, buffer[i], true, true);

            if (valResult !== false) {
              resetMaskSet(true);
              p = valResult.caret !== undefined ? valResult.caret : valResult.pos + 1;
            }
          }
        }
      }

      function casing(elem, test, pos) {
        switch (opts.casing || test.casing) {
          case "upper":
            elem = elem.toUpperCase();
            break;

          case "lower":
            elem = elem.toLowerCase();
            break;

          case "title":
            var posBefore = getMaskSet().validPositions[pos - 1];

            if (pos === 0 || posBefore && posBefore.input === String.fromCharCode(Inputmask.keyCode.SPACE)) {
              elem = elem.toUpperCase();
            } else {
              elem = elem.toLowerCase();
            }

            break;

          default:
            if ($.isFunction(opts.casing)) {
              var args = Array.prototype.slice.call(arguments);
              args.push(getMaskSet().validPositions);
              elem = opts.casing.apply(this, args);
            }

        }

        return elem;
      }

      function checkAlternationMatch(altArr1, altArr2, na) {
        var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1),
            isMatch = false,
            naArr = na !== undefined ? na.split(",") : [],
            naNdx;

        for (var i = 0; i < naArr.length; i++) {
          if ((naNdx = altArr1.indexOf(naArr[i])) !== -1) {
            altArr1.splice(naNdx, 1);
          }
        }

        for (var alndx = 0; alndx < altArr1.length; alndx++) {
          if ($.inArray(altArr1[alndx], altArrC) !== -1) {
            isMatch = true;
            break;
          }
        }

        return isMatch;
      }

      function alternate(pos, c, strict, fromSetValid, rAltPos) {
        var validPsClone = $.extend(true, {}, getMaskSet().validPositions),
            lastAlt,
            alternation,
            isValidRslt = false,
            altPos,
            prevAltPos,
            i,
            validPos,
            decisionPos,
            lAltPos = rAltPos !== undefined ? rAltPos : getLastValidPosition();

        if (lAltPos === -1 && rAltPos === undefined) {
          lastAlt = 0;
          prevAltPos = getTest(lastAlt);
          alternation = prevAltPos.alternation;
        } else {
          for (; lAltPos >= 0; lAltPos--) {
            altPos = getMaskSet().validPositions[lAltPos];

            if (altPos && altPos.alternation !== undefined) {
              if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) {
                break;
              }

              lastAlt = lAltPos;
              alternation = getMaskSet().validPositions[lastAlt].alternation;
              prevAltPos = altPos;
            }
          }
        }

        if (alternation !== undefined) {
          decisionPos = parseInt(lastAlt);
          getMaskSet().excludes[decisionPos] = getMaskSet().excludes[decisionPos] || [];

          if (pos !== true) {
            getMaskSet().excludes[decisionPos].push(getDecisionTaker(prevAltPos));
          }

          var validInputsClone = [],
              staticInputsBeforePos = 0;

          for (i = decisionPos; i < getLastValidPosition(undefined, true) + 1; i++) {
            validPos = getMaskSet().validPositions[i];

            if (validPos && validPos.generatedInput !== true) {
              validInputsClone.push(validPos.input);
            } else if (i < pos) staticInputsBeforePos++;

            delete getMaskSet().validPositions[i];
          }

          while (getMaskSet().excludes[decisionPos] && getMaskSet().excludes[decisionPos].length < 10) {
            var posOffset = staticInputsBeforePos * -1,
                validInputs = validInputsClone.slice();
            getMaskSet().tests[decisionPos] = undefined;
            resetMaskSet(true);
            isValidRslt = true;

            while (validInputs.length > 0) {
              var input = validInputs.shift();

              if (!(isValidRslt = isValid(getLastValidPosition(undefined, true) + 1, input, false, fromSetValid, true))) {
                break;
              }
            }

            if (isValidRslt && c !== undefined) {
              var targetLvp = getLastValidPosition(pos) + 1;

              for (i = decisionPos; i < getLastValidPosition() + 1; i++) {
                validPos = getMaskSet().validPositions[i];

                if ((validPos === undefined || validPos.match.fn == null) && i < pos + posOffset) {
                  posOffset++;
                }
              }

              pos = pos + posOffset;
              isValidRslt = isValid(pos > targetLvp ? targetLvp : pos, c, strict, fromSetValid, true);
            }

            if (!isValidRslt) {
              resetMaskSet();
              prevAltPos = getTest(decisionPos);
              getMaskSet().validPositions = $.extend(true, {}, validPsClone);

              if (getMaskSet().excludes[decisionPos]) {
                var decisionTaker = getDecisionTaker(prevAltPos);

                if (getMaskSet().excludes[decisionPos].indexOf(decisionTaker) !== -1) {
                  isValidRslt = alternate(pos, c, strict, fromSetValid, decisionPos - 1);
                  break;
                }

                getMaskSet().excludes[decisionPos].push(decisionTaker);

                for (i = decisionPos; i < getLastValidPosition(undefined, true) + 1; i++) {
                  delete getMaskSet().validPositions[i];
                }
              } else {
                isValidRslt = alternate(pos, c, strict, fromSetValid, decisionPos - 1);
                break;
              }
            } else break;
          }
        }

        getMaskSet().excludes[decisionPos] = undefined;
        return isValidRslt;
      }

      function isValid(pos, c, strict, fromSetValid, fromAlternate, validateOnly) {
        function isSelection(posObj) {
          return isRTL ? posObj.begin - posObj.end > 1 || posObj.begin - posObj.end === 1 : posObj.end - posObj.begin > 1 || posObj.end - posObj.begin === 1;
        }

        strict = strict === true;
        var maskPos = pos;

        if (pos.begin !== undefined) {
          maskPos = isRTL ? pos.end : pos.begin;
        }

        function _isValid(position, c, strict) {
          var rslt = false;
          $.each(getTests(position), function (ndx, tst) {
            var test = tst.match;
            getBuffer(true);
            rslt = test.fn != null ? test.fn.test(c, getMaskSet(), position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && test.def !== "" ? {
              c: getPlaceholder(position, test, true) || test.def,
              pos: position
            } : false;

            if (rslt !== false) {
              var elem = rslt.c !== undefined ? rslt.c : c,
                  validatedPos = position;
              elem = elem === opts.skipOptionalPartCharacter && test.fn === null ? getPlaceholder(position, test, true) || test.def : elem;

              if (rslt.remove !== undefined) {
                if (!$.isArray(rslt.remove)) rslt.remove = [rslt.remove];
                $.each(rslt.remove.sort(function (a, b) {
                  return b - a;
                }), function (ndx, lmnt) {
                  revalidateMask({
                    begin: lmnt,
                    end: lmnt + 1
                  });
                });
              }

              if (rslt.insert !== undefined) {
                if (!$.isArray(rslt.insert)) rslt.insert = [rslt.insert];
                $.each(rslt.insert.sort(function (a, b) {
                  return a - b;
                }), function (ndx, lmnt) {
                  isValid(lmnt.pos, lmnt.c, true, fromSetValid);
                });
              }

              if (rslt !== true && rslt.pos !== undefined && rslt.pos !== position) {
                validatedPos = rslt.pos;
              }

              if (rslt !== true && rslt.pos === undefined && rslt.c === undefined) {
                return false;
              }

              if (!revalidateMask(pos, $.extend({}, tst, {
                input: casing(elem, test, validatedPos)
              }), fromSetValid, validatedPos)) {
                rslt = false;
              }

              return false;
            }
          });
          return rslt;
        }

        var result = true,
            positionsClone = $.extend(true, {}, getMaskSet().validPositions);

        if ($.isFunction(opts.preValidation) && !strict && fromSetValid !== true && validateOnly !== true) {
          result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts, getMaskSet());
        }

        if (result === true) {
          trackbackPositions(undefined, maskPos, true);

          if (maxLength === undefined || maskPos < maxLength) {
            result = _isValid(maskPos, c, strict);

            if ((!strict || fromSetValid === true) && result === false && validateOnly !== true) {
              var currentPosValid = getMaskSet().validPositions[maskPos];

              if (currentPosValid && currentPosValid.match.fn === null && (currentPosValid.match.def === c || c === opts.skipOptionalPartCharacter)) {
                result = {
                  caret: seekNext(maskPos)
                };
              } else {
                if ((opts.insertMode || getMaskSet().validPositions[seekNext(maskPos)] === undefined) && (!isMask(maskPos, true) || getMaskSet().jitOffset[maskPos])) {
                  if (getMaskSet().jitOffset[maskPos] && getMaskSet().validPositions[seekNext(maskPos)] === undefined) {
                    result = isValid(maskPos + getMaskSet().jitOffset[maskPos], c, strict);
                    if (result !== false) result.caret = maskPos;
                  } else for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++) {
                    result = _isValid(nPos, c, strict);

                    if (result !== false) {
                      result = trackbackPositions(maskPos, result.pos !== undefined ? result.pos : nPos) || result;
                      maskPos = nPos;
                      break;
                    }
                  }
                }
              }
            }
          }

          if (result === false && opts.keepStatic !== false && (opts.regex == null || isComplete(getBuffer())) && !strict && fromAlternate !== true) {
            result = alternate(maskPos, c, strict, fromSetValid);
          }

          if (result === true) {
            result = {
              pos: maskPos
            };
          }
        }

        if ($.isFunction(opts.postValidation) && result !== false && !strict && fromSetValid !== true && validateOnly !== true) {
          var postResult = opts.postValidation(getBuffer(true), pos.begin !== undefined ? isRTL ? pos.end : pos.begin : pos, result, opts);

          if (postResult !== undefined) {
            if (postResult.refreshFromBuffer && postResult.buffer) {
              var refresh = postResult.refreshFromBuffer;
              refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, postResult.buffer);
            }

            result = postResult === true ? result : postResult;
          }
        }

        if (result && result.pos === undefined) {
          result.pos = maskPos;
        }

        if (result === false || validateOnly === true) {
          resetMaskSet(true);
          getMaskSet().validPositions = $.extend(true, {}, positionsClone);
        }

        return result;
      }

      function trackbackPositions(originalPos, newPos, fillOnly) {
        var result;

        if (originalPos === undefined) {
          for (originalPos = newPos - 1; originalPos > 0; originalPos--) {
            if (getMaskSet().validPositions[originalPos]) break;
          }
        }

        for (var ps = originalPos; ps < newPos; ps++) {
          if (getMaskSet().validPositions[ps] === undefined && !isMask(ps, true)) {
            var vp = ps == 0 ? getTest(ps) : getMaskSet().validPositions[ps - 1];

            if (vp) {
              var tests = getTests(ps).slice();
              if (tests[tests.length - 1].match.def === "") tests.pop();
              var bestMatch = determineTestTemplate(ps, tests);
              bestMatch = $.extend({}, bestMatch, {
                input: getPlaceholder(ps, bestMatch.match, true) || bestMatch.match.def
              });
              bestMatch.generatedInput = true;
              revalidateMask(ps, bestMatch, true);

              if (fillOnly !== true) {
                var cvpInput = getMaskSet().validPositions[newPos].input;
                getMaskSet().validPositions[newPos] = undefined;
                result = isValid(newPos, cvpInput, true, true);
              }
            }
          }
        }

        return result;
      }

      function revalidateMask(pos, validTest, fromSetValid, validatedPos) {
        function IsEnclosedStatic(pos, valids, selection) {
          var posMatch = valids[pos];

          if (posMatch !== undefined && (posMatch.match.fn === null && posMatch.match.optionality !== true || posMatch.input === opts.radixPoint)) {
            var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && valids[pos - 1].match.fn === null && valids[pos - 1] : valids[pos - 1],
                nextMatch = selection.end > pos + 1 ? valids[pos + 1] && valids[pos + 1].match.fn === null && valids[pos + 1] : valids[pos + 1];
            return prevMatch && nextMatch;
          }

          return false;
        }

        var begin = pos.begin !== undefined ? pos.begin : pos,
            end = pos.end !== undefined ? pos.end : pos;

        if (pos.begin > pos.end) {
          begin = pos.end;
          end = pos.begin;
        }

        validatedPos = validatedPos !== undefined ? validatedPos : begin;

        if (begin !== end || opts.insertMode && getMaskSet().validPositions[validatedPos] !== undefined && fromSetValid === undefined) {
          var positionsClone = $.extend(true, {}, getMaskSet().validPositions),
              lvp = getLastValidPosition(undefined, true),
              i;
          getMaskSet().p = begin;

          for (i = lvp; i >= begin; i--) {
            if (getMaskSet().validPositions[i] && getMaskSet().validPositions[i].match.nativeDef === "+") {
              opts.isNegative = false;
            }

            delete getMaskSet().validPositions[i];
          }

          var valid = true,
              j = validatedPos,
              vps = getMaskSet().validPositions,
              needsValidation = false,
              posMatch = j,
              i = j;

          if (validTest) {
            getMaskSet().validPositions[validatedPos] = $.extend(true, {}, validTest);
            posMatch++;
            j++;
            if (begin < end) i++;
          }

          for (; i <= lvp; i++) {
            var t = positionsClone[i];

            if (t !== undefined && (i >= end || i >= begin && t.generatedInput !== true && IsEnclosedStatic(i, positionsClone, {
              begin: begin,
              end: end
            }))) {
              while (getTest(posMatch).match.def !== "") {
                if (needsValidation === false && positionsClone[posMatch] && positionsClone[posMatch].match.nativeDef === t.match.nativeDef) {
                  getMaskSet().validPositions[posMatch] = $.extend(true, {}, positionsClone[posMatch]);
                  getMaskSet().validPositions[posMatch].input = t.input;
                  trackbackPositions(undefined, posMatch, true);
                  j = posMatch + 1;
                  valid = true;
                } else if (opts.shiftPositions && positionCanMatchDefinition(posMatch, t.match.def)) {
                  var result = isValid(posMatch, t.input, true, true);
                  valid = result !== false;
                  j = result.caret || result.insert ? getLastValidPosition() : posMatch + 1;
                  needsValidation = true;
                } else {
                  valid = t.generatedInput === true || t.input === opts.radixPoint && opts.numericInput === true;
                }

                if (valid) break;

                if (!valid && posMatch > end && isMask(posMatch, true) && (t.match.fn !== null || posMatch > getMaskSet().maskLength)) {
                  break;
                }

                posMatch++;
              }

              if (getTest(posMatch).match.def == "") valid = false;
              posMatch = j;
            }

            if (!valid) break;
          }

          if (!valid) {
            getMaskSet().validPositions = $.extend(true, {}, positionsClone);
            resetMaskSet(true);
            return false;
          }
        } else if (validTest) {
          getMaskSet().validPositions[validatedPos] = $.extend(true, {}, validTest);
        }

        resetMaskSet(true);
        return true;
      }

      function isMask(pos, strict) {
        var test = getTestTemplate(pos).match;
        if (test.def === "") test = getTest(pos).match;

        if (test.fn != null) {
          return test.fn;
        }

        if (strict !== true && pos > -1) {
          var tests = getTests(pos);
          return tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0);
        }

        return false;
      }

      function seekNext(pos, newBlock) {
        var position = pos + 1;

        while (getTest(position).match.def !== "" && (newBlock === true && (getTest(position).match.newBlockMarker !== true || !isMask(position)) || newBlock !== true && !isMask(position))) {
          position++;
        }

        return position;
      }

      function seekPrevious(pos, newBlock) {
        var position = pos,
            tests;
        if (position <= 0) return 0;

        while (--position > 0 && (newBlock === true && getTest(position).match.newBlockMarker !== true || newBlock !== true && !isMask(position) && (tests = getTests(position), tests.length < 2 || tests.length === 2 && tests[1].match.def === ""))) {}

        return position;
      }

      function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
        if (event && $.isFunction(opts.onBeforeWrite)) {
          var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);

          if (result) {
            if (result.refreshFromBuffer) {
              var refresh = result.refreshFromBuffer;
              refreshFromBuffer(refresh === true ? refresh : refresh.start, refresh.end, result.buffer || buffer);
              buffer = getBuffer(true);
            }

            if (caretPos !== undefined) caretPos = result.caret !== undefined ? result.caret : caretPos;
          }
        }

        if (input !== undefined) {
          input.inputmask._valueSet(buffer.join(""));

          if (caretPos !== undefined && (event === undefined || event.type !== "blur")) {
            caret(input, caretPos);
          } else renderColorMask(input, caretPos, buffer.length === 0);

          if (triggerEvents === true) {
            var $input = $(input),
                nptVal = input.inputmask._valueGet();

            skipInputEvent = true;
            $input.trigger("input");
            setTimeout(function () {
              if (nptVal === getBufferTemplate().join("")) {
                $input.trigger("cleared");
              } else if (isComplete(buffer) === true) {
                $input.trigger("complete");
              }
            }, 0);
          }
        }
      }

      function getPlaceholder(pos, test, returnPL) {
        test = test || getTest(pos).match;

        if (test.placeholder !== undefined || returnPL === true) {
          return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
        } else if (test.fn === null) {
          if (pos > -1 && getMaskSet().validPositions[pos] === undefined) {
            var tests = getTests(pos),
                staticAlternations = [],
                prevTest;

            if (tests.length > 1 + (tests[tests.length - 1].match.def === "" ? 1 : 0)) {
              for (var i = 0; i < tests.length; i++) {
                if (tests[i].match.optionality !== true && tests[i].match.optionalQuantifier !== true && (tests[i].match.fn === null || prevTest === undefined || tests[i].match.fn.test(prevTest.match.def, getMaskSet(), pos, true, opts) !== false)) {
                  staticAlternations.push(tests[i]);
                  if (tests[i].match.fn === null) prevTest = tests[i];

                  if (staticAlternations.length > 1) {
                    if (/[0-9a-bA-Z]/.test(staticAlternations[0].match.def)) {
                      return opts.placeholder.charAt(pos % opts.placeholder.length);
                    }
                  }
                }
              }
            }
          }

          return test.def;
        }

        return opts.placeholder.charAt(pos % opts.placeholder.length);
      }

      function HandleNativePlaceholder(npt, value) {
        if (ie) {
          if (npt.inputmask._valueGet() !== value) {
            var buffer = getBuffer().slice(),
                nptValue = npt.inputmask._valueGet();

            if (nptValue !== value) {
              var lvp = getLastValidPosition();

              if (lvp === -1 && nptValue === getBufferTemplate().join("")) {
                buffer = [];
              } else if (lvp !== -1) {
                clearOptionalTail(buffer);
              }

              writeBuffer(npt, buffer);
            }
          }
        } else if (npt.placeholder !== value) {
          npt.placeholder = value;
          if (npt.placeholder === "") npt.removeAttribute("placeholder");
        }
      }

      var EventRuler = {
        on: function on(input, eventName, eventHandler) {
          var ev = function ev(e) {
            var that = this;

            if (that.inputmask === undefined && this.nodeName !== "FORM") {
              var imOpts = $.data(that, "_inputmask_opts");
              if (imOpts) new Inputmask(imOpts).mask(that);else EventRuler.off(that);
            } else if (e.type !== "setvalue" && this.nodeName !== "FORM" && (that.disabled || that.readOnly && !(e.type === "keydown" && e.ctrlKey && e.keyCode === 67 || opts.tabThrough === false && e.keyCode === Inputmask.keyCode.TAB))) {
              e.preventDefault();
            } else {
              switch (e.type) {
                case "input":
                  if (skipInputEvent === true) {
                    skipInputEvent = false;
                    return e.preventDefault();
                  }

                  if (mobile) {
                    var args = arguments;
                    setTimeout(function () {
                      eventHandler.apply(that, args);
                      caret(that, that.inputmask.caretPos, undefined, true);
                    }, 0);
                    return false;
                  }

                  break;

                case "keydown":
                  skipKeyPressEvent = false;
                  skipInputEvent = false;
                  break;

                case "keypress":
                  if (skipKeyPressEvent === true) {
                    return e.preventDefault();
                  }

                  skipKeyPressEvent = true;
                  break;

                case "click":
                  if (iemobile || iphone) {
                    var args = arguments;
                    setTimeout(function () {
                      eventHandler.apply(that, args);
                    }, 0);
                    return false;
                  }

                  break;
              }

              var returnVal = eventHandler.apply(that, arguments);

              if (returnVal === false) {
                e.preventDefault();
                e.stopPropagation();
              }

              return returnVal;
            }
          };

          input.inputmask.events[eventName] = input.inputmask.events[eventName] || [];
          input.inputmask.events[eventName].push(ev);

          if ($.inArray(eventName, ["submit", "reset"]) !== -1) {
            if (input.form !== null) $(input.form).on(eventName, ev);
          } else {
            $(input).on(eventName, ev);
          }
        },
        off: function off(input, event) {
          if (input.inputmask && input.inputmask.events) {
            var events;

            if (event) {
              events = [];
              events[event] = input.inputmask.events[event];
            } else {
              events = input.inputmask.events;
            }

            $.each(events, function (eventName, evArr) {
              while (evArr.length > 0) {
                var ev = evArr.pop();

                if ($.inArray(eventName, ["submit", "reset"]) !== -1) {
                  if (input.form !== null) $(input.form).off(eventName, ev);
                } else {
                  $(input).off(eventName, ev);
                }
              }

              delete input.inputmask.events[eventName];
            });
          }
        }
      };
      var EventHandlers = {
        keydownEvent: function keydownEvent(e) {
          var input = this,
              $input = $(input),
              k = e.keyCode,
              pos = caret(input);

          if (k === Inputmask.keyCode.BACKSPACE || k === Inputmask.keyCode.DELETE || iphone && k === Inputmask.keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === Inputmask.keyCode.X && !isInputEventSupported("cut")) {
            e.preventDefault();
            handleRemove(input, k, pos);
            writeBuffer(input, getBuffer(true), getMaskSet().p, e, input.inputmask._valueGet() !== getBuffer().join(""));
          } else if (k === Inputmask.keyCode.END || k === Inputmask.keyCode.PAGE_DOWN) {
            e.preventDefault();
            var caretPos = seekNext(getLastValidPosition());
            caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, true);
          } else if (k === Inputmask.keyCode.HOME && !e.shiftKey || k === Inputmask.keyCode.PAGE_UP) {
            e.preventDefault();
            caret(input, 0, e.shiftKey ? pos.begin : 0, true);
          } else if ((opts.undoOnEscape && k === Inputmask.keyCode.ESCAPE || k === 90 && e.ctrlKey) && e.altKey !== true) {
            checkVal(input, true, false, undoValue.split(""));
            $input.trigger("click");
          } else if (k === Inputmask.keyCode.INSERT && !(e.shiftKey || e.ctrlKey)) {
            opts.insertMode = !opts.insertMode;
            input.setAttribute("im-insert", opts.insertMode);
          } else if (opts.tabThrough === true && k === Inputmask.keyCode.TAB) {
            if (e.shiftKey === true) {
              if (getTest(pos.begin).match.fn === null) {
                pos.begin = seekNext(pos.begin);
              }

              pos.end = seekPrevious(pos.begin, true);
              pos.begin = seekPrevious(pos.end, true);
            } else {
              pos.begin = seekNext(pos.begin, true);
              pos.end = seekNext(pos.begin, true);
              if (pos.end < getMaskSet().maskLength) pos.end--;
            }

            if (pos.begin < getMaskSet().maskLength) {
              e.preventDefault();
              caret(input, pos.begin, pos.end);
            }
          }

          opts.onKeyDown.call(this, e, getBuffer(), caret(input).begin, opts);
          ignorable = $.inArray(k, opts.ignorables) !== -1;
        },
        keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
          var input = this,
              $input = $(input),
              k = e.which || e.charCode || e.keyCode;

          if (checkval !== true && !(e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) {
            if (k === Inputmask.keyCode.ENTER && undoValue !== getBuffer().join("")) {
              undoValue = getBuffer().join("");
              setTimeout(function () {
                $input.trigger("change");
              }, 0);
            }

            return true;
          } else {
            if (k) {
              if (k === 46 && e.shiftKey === false && opts.radixPoint !== "") k = opts.radixPoint.charCodeAt(0);
              var pos = checkval ? {
                begin: ndx,
                end: ndx
              } : caret(input),
                  forwardPosition,
                  c = String.fromCharCode(k),
                  offset = 0;

              if (opts._radixDance && opts.numericInput) {
                var caretPos = getBuffer().indexOf(opts.radixPoint.charAt(0)) + 1;

                if (pos.begin <= caretPos) {
                  if (k === opts.radixPoint.charCodeAt(0)) offset = 1;
                  pos.begin -= 1;
                  pos.end -= 1;
                }
              }

              getMaskSet().writeOutBuffer = true;
              var valResult = isValid(pos, c, strict);

              if (valResult !== false) {
                resetMaskSet(true);
                forwardPosition = valResult.caret !== undefined ? valResult.caret : seekNext(valResult.pos.begin ? valResult.pos.begin : valResult.pos);
                getMaskSet().p = forwardPosition;
              }

              forwardPosition = (opts.numericInput && valResult.caret === undefined ? seekPrevious(forwardPosition) : forwardPosition) + offset;

              if (writeOut !== false) {
                setTimeout(function () {
                  opts.onKeyValidation.call(input, k, valResult, opts);
                }, 0);

                if (getMaskSet().writeOutBuffer && valResult !== false) {
                  var buffer = getBuffer();
                  writeBuffer(input, buffer, forwardPosition, e, checkval !== true);
                }
              }

              e.preventDefault();

              if (checkval) {
                if (valResult !== false) valResult.forwardPosition = forwardPosition;
                return valResult;
              }
            }
          }
        },
        pasteEvent: function pasteEvent(e) {
          var input = this,
              ev = e.originalEvent || e,
              $input = $(input),
              inputValue = input.inputmask._valueGet(true),
              caretPos = caret(input),
              tempValue;

          if (isRTL) {
            tempValue = caretPos.end;
            caretPos.end = caretPos.begin;
            caretPos.begin = tempValue;
          }

          var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
              valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
          if (valueBeforeCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("")) valueBeforeCaret = "";
          if (valueAfterCaret === (isRTL ? getBufferTemplate().reverse() : getBufferTemplate()).slice(caretPos.end).join("")) valueAfterCaret = "";

          if (window.clipboardData && window.clipboardData.getData) {
            inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
          } else if (ev.clipboardData && ev.clipboardData.getData) {
            inputValue = valueBeforeCaret + ev.clipboardData.getData("text/plain") + valueAfterCaret;
          } else return true;

          var pasteValue = inputValue;

          if ($.isFunction(opts.onBeforePaste)) {
            pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts);

            if (pasteValue === false) {
              return e.preventDefault();
            }

            if (!pasteValue) {
              pasteValue = inputValue;
            }
          }

          checkVal(input, false, false, pasteValue.toString().split(""));
          writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join(""));
          return e.preventDefault();
        },
        inputFallBackEvent: function inputFallBackEvent(e) {
          function radixPointHandler(input, inputValue, caretPos) {
            if (inputValue.charAt(caretPos.begin - 1) === "." && opts.radixPoint !== "") {
              inputValue = inputValue.split("");
              inputValue[caretPos.begin - 1] = opts.radixPoint.charAt(0);
              inputValue = inputValue.join("");
            }

            return inputValue;
          }

          function ieMobileHandler(input, inputValue, caretPos) {
            if (iemobile) {
              var inputChar = inputValue.replace(getBuffer().join(""), "");

              if (inputChar.length === 1) {
                var iv = inputValue.split("");
                iv.splice(caretPos.begin, 0, inputChar);
                inputValue = iv.join("");
              }
            }

            return inputValue;
          }

          var input = this,
              inputValue = input.inputmask._valueGet();

          if (getBuffer().join("") !== inputValue) {
            var caretPos = caret(input);
            inputValue = radixPointHandler(input, inputValue, caretPos);
            inputValue = ieMobileHandler(input, inputValue, caretPos);

            if (getBuffer().join("") !== inputValue) {
              var buffer = getBuffer().join(""),
                  offset = !opts.numericInput && inputValue.length > buffer.length ? -1 : 0,
                  frontPart = inputValue.substr(0, caretPos.begin),
                  backPart = inputValue.substr(caretPos.begin),
                  frontBufferPart = buffer.substr(0, caretPos.begin + offset),
                  backBufferPart = buffer.substr(caretPos.begin + offset);
              var selection = caretPos,
                  entries = "",
                  isEntry = false;

              if (frontPart !== frontBufferPart) {
                var fpl = (isEntry = frontPart.length >= frontBufferPart.length) ? frontPart.length : frontBufferPart.length,
                    i;

                for (i = 0; frontPart.charAt(i) === frontBufferPart.charAt(i) && i < fpl; i++) {}

                if (isEntry) {
                  selection.begin = i - offset;
                  entries += frontPart.slice(i, selection.end);
                }
              }

              if (backPart !== backBufferPart) {
                if (backPart.length > backBufferPart.length) {
                  entries += backPart.slice(0, 1);
                } else {
                  if (backPart.length < backBufferPart.length) {
                    selection.end += backBufferPart.length - backPart.length;

                    if (!isEntry && opts.radixPoint !== "" && backPart === "" && frontPart.charAt(selection.begin + offset - 1) === opts.radixPoint) {
                      selection.begin--;
                      entries = opts.radixPoint;
                    }
                  }
                }
              }

              writeBuffer(input, getBuffer(), {
                begin: selection.begin + offset,
                end: selection.end + offset
              });

              if (entries.length > 0) {
                $.each(entries.split(""), function (ndx, entry) {
                  var keypress = new $.Event("keypress");
                  keypress.which = entry.charCodeAt(0);
                  ignorable = false;
                  EventHandlers.keypressEvent.call(input, keypress);
                });
              } else {
                if (selection.begin === selection.end - 1) {
                  selection.begin = seekPrevious(selection.begin + 1);

                  if (selection.begin === selection.end - 1) {
                    caret(input, selection.begin);
                  } else {
                    caret(input, selection.begin, selection.end);
                  }
                }

                var keydown = new $.Event("keydown");
                keydown.keyCode = opts.numericInput ? Inputmask.keyCode.BACKSPACE : Inputmask.keyCode.DELETE;
                EventHandlers.keydownEvent.call(input, keydown);
              }

              e.preventDefault();
            }
          }
        },
        beforeInputEvent: function beforeInputEvent(e) {
          if (e.cancelable) {
            var input = this;

            switch (e.inputType) {
              case "insertText":
                $.each(e.data.split(""), function (ndx, entry) {
                  var keypress = new $.Event("keypress");
                  keypress.which = entry.charCodeAt(0);
                  ignorable = false;
                  EventHandlers.keypressEvent.call(input, keypress);
                });
                return e.preventDefault();

              case "deleteContentBackward":
                var keydown = new $.Event("keydown");
                keydown.keyCode = Inputmask.keyCode.BACKSPACE;
                EventHandlers.keydownEvent.call(input, keydown);
                return e.preventDefault();

              case "deleteContentForward":
                var keydown = new $.Event("keydown");
                keydown.keyCode = Inputmask.keyCode.DELETE;
                EventHandlers.keydownEvent.call(input, keydown);
                return e.preventDefault();
            }
          }
        },
        setValueEvent: function setValueEvent(e) {
          this.inputmask.refreshValue = false;

          var input = this,
              value = e && e.detail ? e.detail[0] : arguments[1],
              value = value || input.inputmask._valueGet(true);

          if ($.isFunction(opts.onBeforeMask)) value = opts.onBeforeMask.call(inputmask, value, opts) || value;
          value = value.split("");
          checkVal(input, true, false, value);
          undoValue = getBuffer().join("");

          if ((opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("")) {
            input.inputmask._valueSet("");
          }
        },
        focusEvent: function focusEvent(e) {
          var input = this,
              nptValue = input.inputmask._valueGet();

          if (opts.showMaskOnFocus) {
            if (nptValue !== getBuffer().join("")) {
              writeBuffer(input, getBuffer(), seekNext(getLastValidPosition()));
            } else if (mouseEnter === false) {
              caret(input, seekNext(getLastValidPosition()));
            }
          }

          if (opts.positionCaretOnTab === true && mouseEnter === false) {
            EventHandlers.clickEvent.apply(input, [e, true]);
          }

          undoValue = getBuffer().join("");
        },
        mouseleaveEvent: function mouseleaveEvent(e) {
          var input = this;
          mouseEnter = false;

          if (opts.clearMaskOnLostFocus && document.activeElement !== input) {
            HandleNativePlaceholder(input, originalPlaceholder);
          }
        },
        clickEvent: function clickEvent(e, tabbed) {
          function doRadixFocus(clickPos) {
            if (opts.radixPoint !== "") {
              var vps = getMaskSet().validPositions;

              if (vps[clickPos] === undefined || vps[clickPos].input === getPlaceholder(clickPos)) {
                if (clickPos < seekNext(-1)) return true;
                var radixPos = $.inArray(opts.radixPoint, getBuffer());

                if (radixPos !== -1) {
                  for (var vp in vps) {
                    if (radixPos < vp && vps[vp].input !== getPlaceholder(vp)) {
                      return false;
                    }
                  }

                  return true;
                }
              }
            }

            return false;
          }

          var input = this;
          setTimeout(function () {
            if (document.activeElement === input) {
              var selectedCaret = caret(input);

              if (tabbed) {
                if (isRTL) {
                  selectedCaret.end = selectedCaret.begin;
                } else {
                  selectedCaret.begin = selectedCaret.end;
                }
              }

              if (selectedCaret.begin === selectedCaret.end) {
                switch (opts.positionCaretOnClick) {
                  case "none":
                    break;

                  case "select":
                    caret(input, 0, getBuffer().length);
                    break;

                  case "ignore":
                    caret(input, seekNext(getLastValidPosition()));
                    break;

                  case "radixFocus":
                    if (doRadixFocus(selectedCaret.begin)) {
                      var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
                      caret(input, opts.numericInput ? seekNext(radixPos) : radixPos);
                      break;
                    }

                  default:
                    var clickPosition = selectedCaret.begin,
                        lvclickPosition = getLastValidPosition(clickPosition, true),
                        lastPosition = seekNext(lvclickPosition);

                    if (clickPosition < lastPosition) {
                      caret(input, !isMask(clickPosition, true) && !isMask(clickPosition - 1, true) ? seekNext(clickPosition) : clickPosition);
                    } else {
                      var lvp = getMaskSet().validPositions[lvclickPosition],
                          tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : undefined, lvp),
                          placeholder = getPlaceholder(lastPosition, tt.match);

                      if (placeholder !== "" && getBuffer()[lastPosition] !== placeholder && tt.match.optionalQuantifier !== true && tt.match.newBlockMarker !== true || !isMask(lastPosition, opts.keepStatic) && tt.match.def === placeholder) {
                        var newPos = seekNext(lastPosition);

                        if (clickPosition >= newPos || clickPosition === lastPosition) {
                          lastPosition = newPos;
                        }
                      }

                      caret(input, lastPosition);
                    }

                    break;
                }
              }
            }
          }, 0);
        },
        cutEvent: function cutEvent(e) {
          var input = this,
              $input = $(input),
              pos = caret(input),
              ev = e.originalEvent || e;
          var clipboardData = window.clipboardData || ev.clipboardData,
              clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
          clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join(""));
          if (document.execCommand) document.execCommand("copy");
          handleRemove(input, Inputmask.keyCode.DELETE, pos);
          writeBuffer(input, getBuffer(), getMaskSet().p, e, undoValue !== getBuffer().join(""));
        },
        blurEvent: function blurEvent(e) {
          var $input = $(this),
              input = this;

          if (input.inputmask) {
            HandleNativePlaceholder(input, originalPlaceholder);

            var nptValue = input.inputmask._valueGet(),
                buffer = getBuffer().slice();

            if (nptValue !== "" || colorMask !== undefined) {
              if (opts.clearMaskOnLostFocus) {
                if (getLastValidPosition() === -1 && nptValue === getBufferTemplate().join("")) {
                  buffer = [];
                } else {
                  clearOptionalTail(buffer);
                }
              }

              if (isComplete(buffer) === false) {
                setTimeout(function () {
                  $input.trigger("incomplete");
                }, 0);

                if (opts.clearIncomplete) {
                  resetMaskSet();

                  if (opts.clearMaskOnLostFocus) {
                    buffer = [];
                  } else {
                    buffer = getBufferTemplate().slice();
                  }
                }
              }

              writeBuffer(input, buffer, undefined, e);
            }

            if (undoValue !== getBuffer().join("")) {
              undoValue = buffer.join("");
              $input.trigger("change");
            }
          }
        },
        mouseenterEvent: function mouseenterEvent(e) {
          var input = this;
          mouseEnter = true;

          if (document.activeElement !== input && opts.showMaskOnHover) {
            HandleNativePlaceholder(input, (isRTL ? getBuffer().slice().reverse() : getBuffer()).join(""));
          }
        },
        submitEvent: function submitEvent(e) {
          if (undoValue !== getBuffer().join("")) {
            $el.trigger("change");
          }

          if (opts.clearMaskOnLostFocus && getLastValidPosition() === -1 && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("")) {
            el.inputmask._valueSet("");
          }

          if (opts.clearIncomplete && isComplete(getBuffer()) === false) {
            el.inputmask._valueSet("");
          }

          if (opts.removeMaskOnSubmit) {
            el.inputmask._valueSet(el.inputmask.unmaskedvalue(), true);

            setTimeout(function () {
              writeBuffer(el, getBuffer());
            }, 0);
          }
        },
        resetEvent: function resetEvent(e) {
          el.inputmask.refreshValue = true;
          setTimeout(function () {
            $el.trigger("setvalue");
          }, 0);
        }
      };

      function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
        var inputmask = this || input.inputmask,
            inputValue = nptvl.slice(),
            charCodes = "",
            initialNdx = -1,
            result = undefined;

        function isTemplateMatch(ndx, charCodes) {
          var charCodeNdx = getMaskTemplate(true, 0, false).slice(ndx, seekNext(ndx)).join("").replace(/'/g, "").indexOf(charCodes);
          return charCodeNdx !== -1 && !isMask(ndx) && (getTest(ndx).match.nativeDef === charCodes.charAt(0) || getTest(ndx).match.fn === null && getTest(ndx).match.nativeDef === "'" + charCodes.charAt(0) || getTest(ndx).match.nativeDef === " " && (getTest(ndx + 1).match.nativeDef === charCodes.charAt(0) || getTest(ndx + 1).match.fn === null && getTest(ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
        }

        resetMaskSet();

        if (!strict && opts.autoUnmask !== true) {
          var staticInput = getBufferTemplate().slice(0, seekNext(-1)).join(""),
              matches = inputValue.join("").match(new RegExp("^" + Inputmask.escapeRegex(staticInput), "g"));

          if (matches && matches.length > 0) {
            inputValue.splice(0, matches.length * staticInput.length);
            initialNdx = seekNext(initialNdx);
          }
        } else {
          initialNdx = seekNext(initialNdx);
        }

        if (initialNdx === -1) {
          getMaskSet().p = seekNext(initialNdx);
          initialNdx = 0;
        } else getMaskSet().p = initialNdx;

        inputmask.caretPos = {
          begin: initialNdx
        };
        $.each(inputValue, function (ndx, charCode) {
          if (charCode !== undefined) {
            if (getMaskSet().validPositions[ndx] === undefined && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, true) && isValid(ndx, inputValue[ndx], true, undefined, undefined, true) === false) {
              getMaskSet().p++;
            } else {
              var keypress = new $.Event("_checkval");
              keypress.which = charCode.charCodeAt(0);
              charCodes += charCode;
              var lvp = getLastValidPosition(undefined, true);

              if (!isTemplateMatch(initialNdx, charCodes)) {
                result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, inputmask.caretPos.begin);

                if (result) {
                  initialNdx = inputmask.caretPos.begin + 1;
                  charCodes = "";
                }
              } else {
                result = EventHandlers.keypressEvent.call(input, keypress, true, false, strict, lvp + 1);
              }

              if (result) {
                writeBuffer(undefined, getBuffer(), result.forwardPosition, keypress, false);
                inputmask.caretPos = {
                  begin: result.forwardPosition,
                  end: result.forwardPosition
                };
              }
            }
          }
        });
        if (writeOut) writeBuffer(input, getBuffer(), result ? result.forwardPosition : undefined, initiatingEvent || new $.Event("checkval"), initiatingEvent && initiatingEvent.type === "input");
      }

      function unmaskedvalue(input) {
        if (input) {
          if (input.inputmask === undefined) {
            return input.value;
          }

          if (input.inputmask && input.inputmask.refreshValue) {
            EventHandlers.setValueEvent.call(input);
          }
        }

        var umValue = [],
            vps = getMaskSet().validPositions;

        for (var pndx in vps) {
          if (vps[pndx].match && vps[pndx].match.fn != null) {
            umValue.push(vps[pndx].input);
          }
        }

        var unmaskedValue = umValue.length === 0 ? "" : (isRTL ? umValue.reverse() : umValue).join("");

        if ($.isFunction(opts.onUnMask)) {
          var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
          unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
        }

        return unmaskedValue;
      }

      function caret(input, begin, end, notranslate) {
        function translatePosition(pos) {
          if (isRTL && typeof pos === "number" && (!opts.greedy || opts.placeholder !== "") && el) {
            pos = el.inputmask._valueGet().length - pos;
          }

          return pos;
        }

        var range;

        if (begin !== undefined) {
          if ($.isArray(begin)) {
            end = isRTL ? begin[0] : begin[1];
            begin = isRTL ? begin[1] : begin[0];
          }

          if (begin.begin !== undefined) {
            end = isRTL ? begin.begin : begin.end;
            begin = isRTL ? begin.end : begin.begin;
          }

          if (typeof begin === "number") {
            begin = notranslate ? begin : translatePosition(begin);
            end = notranslate ? end : translatePosition(end);
            end = typeof end == "number" ? end : begin;
            var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
            input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0;
            input.inputmask.caretPos = {
              begin: begin,
              end: end
            };

            if (input === document.activeElement) {
              if ("selectionStart" in input) {
                input.selectionStart = begin;
                input.selectionEnd = end;
              } else if (window.getSelection) {
                range = document.createRange();

                if (input.firstChild === undefined || input.firstChild === null) {
                  var textNode = document.createTextNode("");
                  input.appendChild(textNode);
                }

                range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length);
                range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length);
                range.collapse(true);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
              } else if (input.createTextRange) {
                range = input.createTextRange();
                range.collapse(true);
                range.moveEnd("character", end);
                range.moveStart("character", begin);
                range.select();
              }

              renderColorMask(input, {
                begin: begin,
                end: end
              });
            }
          }
        } else {
          if ("selectionStart" in input) {
            begin = input.selectionStart;
            end = input.selectionEnd;
          } else if (window.getSelection) {
            range = window.getSelection().getRangeAt(0);

            if (range.commonAncestorContainer.parentNode === input || range.commonAncestorContainer === input) {
              begin = range.startOffset;
              end = range.endOffset;
            }
          } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length);
            end = begin + range.text.length;
          }

          return {
            begin: notranslate ? begin : translatePosition(begin),
            end: notranslate ? end : translatePosition(end)
          };
        }
      }

      function determineLastRequiredPosition(returnDefinition) {
        var buffer = getMaskTemplate(true, getLastValidPosition(), true, true),
            bl = buffer.length,
            pos,
            lvp = getLastValidPosition(),
            positions = {},
            lvTest = getMaskSet().validPositions[lvp],
            ndxIntlzr = lvTest !== undefined ? lvTest.locator.slice() : undefined,
            testPos;

        for (pos = lvp + 1; pos < buffer.length; pos++) {
          testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
          ndxIntlzr = testPos.locator.slice();
          positions[pos] = $.extend(true, {}, testPos);
        }

        var lvTestAlt = lvTest && lvTest.alternation !== undefined ? lvTest.locator[lvTest.alternation] : undefined;

        for (pos = bl - 1; pos > lvp; pos--) {
          testPos = positions[pos];

          if ((testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && testPos.match.fn != null || testPos.match.fn === null && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && getTests(pos)[0].def !== "")) && buffer[pos] === getPlaceholder(pos, testPos.match)) {
            bl--;
          } else break;
        }

        return returnDefinition ? {
          l: bl,
          def: positions[bl] ? positions[bl].match : undefined
        } : bl;
      }

      function clearOptionalTail(buffer) {
        buffer.length = 0;
        var template = getMaskTemplate(true, 0, true, undefined, true),
            lmnt,
            validPos;

        while (lmnt = template.shift(), lmnt !== undefined) {
          buffer.push(lmnt);
        }

        return buffer;
      }

      function isComplete(buffer) {
        if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
        if (opts.repeat === "*") return undefined;
        var complete = false,
            lrp = determineLastRequiredPosition(true),
            aml = seekPrevious(lrp.l);

        if (lrp.def === undefined || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
          complete = true;

          for (var i = 0; i <= aml; i++) {
            var test = getTestTemplate(i).match;

            if (test.fn !== null && getMaskSet().validPositions[i] === undefined && test.optionality !== true && test.optionalQuantifier !== true || test.fn === null && buffer[i] !== getPlaceholder(i, test)) {
              complete = false;
              break;
            }
          }
        }

        return complete;
      }

      function handleRemove(input, k, pos, strict, fromIsValid) {
        if (opts.numericInput || isRTL) {
          if (k === Inputmask.keyCode.BACKSPACE) {
            k = Inputmask.keyCode.DELETE;
          } else if (k === Inputmask.keyCode.DELETE) {
            k = Inputmask.keyCode.BACKSPACE;
          }

          if (isRTL) {
            var pend = pos.end;
            pos.end = pos.begin;
            pos.begin = pend;
          }
        }

        if (k === Inputmask.keyCode.BACKSPACE && pos.end - pos.begin < 1) {
          pos.begin = seekPrevious(pos.begin);

          if (getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator) {
            pos.begin--;
          }
        } else if (k === Inputmask.keyCode.DELETE && pos.begin === pos.end) {
          pos.end = isMask(pos.end, true) && getMaskSet().validPositions[pos.end] && getMaskSet().validPositions[pos.end].input !== opts.radixPoint ? pos.end + 1 : seekNext(pos.end) + 1;

          if (getMaskSet().validPositions[pos.begin] !== undefined && getMaskSet().validPositions[pos.begin].input === opts.groupSeparator) {
            pos.end++;
          }
        }

        revalidateMask(pos);

        if (strict !== true && opts.keepStatic !== false || opts.regex !== null) {
          var result = alternate(true);

          if (result) {
            var newPos = result.caret !== undefined ? result.caret : result.pos ? seekNext(result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition(-1, true);

            if (k !== Inputmask.keyCode.DELETE || pos.begin > newPos) {
              pos.begin == newPos;
            }
          }
        }

        var lvp = getLastValidPosition(pos.begin, true);

        if (lvp < pos.begin || pos.begin === -1) {
          getMaskSet().p = seekNext(lvp);
        } else if (strict !== true) {
          getMaskSet().p = pos.begin;

          if (fromIsValid !== true) {
            while (getMaskSet().p < lvp && getMaskSet().validPositions[getMaskSet().p] === undefined) {
              getMaskSet().p++;
            }
          }
        }
      }

      function initializeColorMask(input) {
        var computedStyle = (input.ownerDocument.defaultView || window).getComputedStyle(input, null);

        function findCaretPos(clientx) {
          var e = document.createElement("span"),
              caretPos;

          for (var style in computedStyle) {
            if (isNaN(style) && style.indexOf("font") !== -1) {
              e.style[style] = computedStyle[style];
            }
          }

          e.style.textTransform = computedStyle.textTransform;
          e.style.letterSpacing = computedStyle.letterSpacing;
          e.style.position = "absolute";
          e.style.height = "auto";
          e.style.width = "auto";
          e.style.visibility = "hidden";
          e.style.whiteSpace = "nowrap";
          document.body.appendChild(e);

          var inputText = input.inputmask._valueGet(),
              previousWidth = 0,
              itl;

          for (caretPos = 0, itl = inputText.length; caretPos <= itl; caretPos++) {
            e.innerHTML += inputText.charAt(caretPos) || "_";

            if (e.offsetWidth >= clientx) {
              var offset1 = clientx - previousWidth;
              var offset2 = e.offsetWidth - clientx;
              e.innerHTML = inputText.charAt(caretPos);
              offset1 -= e.offsetWidth / 3;
              caretPos = offset1 < offset2 ? caretPos - 1 : caretPos;
              break;
            }

            previousWidth = e.offsetWidth;
          }

          document.body.removeChild(e);
          return caretPos;
        }

        var template = document.createElement("div");
        template.style.width = computedStyle.width;
        template.style.textAlign = computedStyle.textAlign;
        colorMask = document.createElement("div");
        input.inputmask.colorMask = colorMask;
        colorMask.className = "im-colormask";
        input.parentNode.insertBefore(colorMask, input);
        input.parentNode.removeChild(input);
        colorMask.appendChild(input);
        colorMask.appendChild(template);
        input.style.left = template.offsetLeft + "px";
        $(colorMask).on("mouseleave", function (e) {
          return EventHandlers.mouseleaveEvent.call(input, [e]);
        });
        $(colorMask).on("mouseenter", function (e) {
          return EventHandlers.mouseenterEvent.call(input, [e]);
        });
        $(colorMask).on("click", function (e) {
          caret(input, findCaretPos(e.clientX));
          return EventHandlers.clickEvent.call(input, [e]);
        });
      }

      Inputmask.prototype.positionColorMask = function (input, template) {
        input.style.left = template.offsetLeft + "px";
      };

      function renderColorMask(input, caretPos, clear) {
        var maskTemplate = [],
            isStatic = false,
            test,
            testPos,
            ndxIntlzr,
            pos = 0;

        function setEntry(entry) {
          if (entry === undefined) entry = "";

          if (!isStatic && (test.fn === null || testPos.input === undefined)) {
            isStatic = true;
            maskTemplate.push("<span class='im-static'>" + entry);
          } else if (isStatic && (test.fn !== null && testPos.input !== undefined || test.def === "")) {
            isStatic = false;
            var mtl = maskTemplate.length;
            maskTemplate[mtl - 1] = maskTemplate[mtl - 1] + "</span>";
            maskTemplate.push(entry);
          } else maskTemplate.push(entry);
        }

        function setCaret() {
          if (document.activeElement === input) {
            maskTemplate.splice(caretPos.begin, 0, caretPos.begin === caretPos.end || caretPos.end > getMaskSet().maskLength ? '<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">' : '<mark class="im-caret-select">');
            maskTemplate.splice(caretPos.end + 1, 0, "</mark>");
          }
        }

        if (colorMask !== undefined) {
          var buffer = getBuffer();

          if (caretPos === undefined) {
            caretPos = caret(input);
          } else if (caretPos.begin === undefined) {
            caretPos = {
              begin: caretPos,
              end: caretPos
            };
          }

          if (clear !== true) {
            var lvp = getLastValidPosition();

            do {
              if (getMaskSet().validPositions[pos]) {
                testPos = getMaskSet().validPositions[pos];
                test = testPos.match;
                ndxIntlzr = testPos.locator.slice();
                setEntry(buffer[pos]);
              } else {
                testPos = getTestTemplate(pos, ndxIntlzr, pos - 1);
                test = testPos.match;
                ndxIntlzr = testPos.locator.slice();

                if (opts.jitMasking === false || pos < lvp || typeof opts.jitMasking === "number" && isFinite(opts.jitMasking) && opts.jitMasking > pos) {
                  setEntry(getPlaceholder(pos, test));
                } else isStatic = false;
              }

              pos++;
            } while ((maxLength === undefined || pos < maxLength) && (test.fn !== null || test.def !== "") || lvp > pos || isStatic);

            if (isStatic) setEntry();
            setCaret();
          }

          var template = colorMask.getElementsByTagName("div")[0];
          template.innerHTML = maskTemplate.join("");
          input.inputmask.positionColorMask(input, template);
        }
      }

      function mask(elem) {
        function isElementTypeSupported(input, opts) {
          function patchValueProperty(npt) {
            var valueGet;
            var valueSet;

            function patchValhook(type) {
              if ($.valHooks && ($.valHooks[type] === undefined || $.valHooks[type].inputmaskpatch !== true)) {
                var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
                  return elem.value;
                };
                var valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                  elem.value = value;
                  return elem;
                };
                $.valHooks[type] = {
                  get: function get(elem) {
                    if (elem.inputmask) {
                      if (elem.inputmask.opts.autoUnmask) {
                        return elem.inputmask.unmaskedvalue();
                      } else {
                        var result = valhookGet(elem);
                        return getLastValidPosition(undefined, undefined, elem.inputmask.maskset.validPositions) !== -1 || opts.nullable !== true ? result : "";
                      }
                    } else return valhookGet(elem);
                  },
                  set: function set(elem, value) {
                    var $elem = $(elem),
                        result;
                    result = valhookSet(elem, value);

                    if (elem.inputmask) {
                      $elem.trigger("setvalue", [value]);
                    }

                    return result;
                  },
                  inputmaskpatch: true
                };
              }
            }

            function getter() {
              if (this.inputmask) {
                return this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : getLastValidPosition() !== -1 || opts.nullable !== true ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "";
              } else return valueGet.call(this);
            }

            function setter(value) {
              valueSet.call(this, value);

              if (this.inputmask) {
                $(this).trigger("setvalue", [value]);
              }
            }

            function installNativeValueSetFallback(npt) {
              EventRuler.on(npt, "mouseenter", function (event) {
                var $input = $(this),
                    input = this,
                    value = input.inputmask._valueGet();

                if (value !== getBuffer().join("")) {
                  $input.trigger("setvalue");
                }
              });
            }

            if (!npt.inputmask.__valueGet) {
              if (opts.noValuePatching !== true) {
                if (Object.getOwnPropertyDescriptor) {
                  if (typeof Object.getPrototypeOf !== "function") {
                    Object.getPrototypeOf = _typeof("test".__proto__) === "object" ? function (object) {
                      return object.__proto__;
                    } : function (object) {
                      return object.constructor.prototype;
                    };
                  }

                  var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : undefined;

                  if (valueProperty && valueProperty.get && valueProperty.set) {
                    valueGet = valueProperty.get;
                    valueSet = valueProperty.set;
                    Object.defineProperty(npt, "value", {
                      get: getter,
                      set: setter,
                      configurable: true
                    });
                  } else if (npt.tagName !== "INPUT") {
                    valueGet = function valueGet() {
                      return this.textContent;
                    };

                    valueSet = function valueSet(value) {
                      this.textContent = value;
                    };

                    Object.defineProperty(npt, "value", {
                      get: getter,
                      set: setter,
                      configurable: true
                    });
                  }
                } else if (document.__lookupGetter__ && npt.__lookupGetter__("value")) {
                  valueGet = npt.__lookupGetter__("value");
                  valueSet = npt.__lookupSetter__("value");

                  npt.__defineGetter__("value", getter);

                  npt.__defineSetter__("value", setter);
                }

                npt.inputmask.__valueGet = valueGet;
                npt.inputmask.__valueSet = valueSet;
              }

              npt.inputmask._valueGet = function (overruleRTL) {
                return isRTL && overruleRTL !== true ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
              };

              npt.inputmask._valueSet = function (value, overruleRTL) {
                valueSet.call(this.el, value === null || value === undefined ? "" : overruleRTL !== true && isRTL ? value.split("").reverse().join("") : value);
              };

              if (valueGet === undefined) {
                valueGet = function valueGet() {
                  return this.value;
                };

                valueSet = function valueSet(value) {
                  this.value = value;
                };

                patchValhook(npt.type);
                installNativeValueSetFallback(npt);
              }
            }
          }

          var elementType = input.getAttribute("type");
          var isSupported = input.tagName === "INPUT" && $.inArray(elementType, opts.supportsInputType) !== -1 || input.isContentEditable || input.tagName === "TEXTAREA";

          if (!isSupported) {
            if (input.tagName === "INPUT") {
              var el = document.createElement("input");
              el.setAttribute("type", elementType);
              isSupported = el.type === "text";
              el = null;
            } else isSupported = "partial";
          }

          if (isSupported !== false) {
            patchValueProperty(input);
          } else input.inputmask = undefined;

          return isSupported;
        }

        EventRuler.off(elem);
        var isSupported = isElementTypeSupported(elem, opts);

        if (isSupported !== false) {
          el = elem;
          $el = $(el);
          originalPlaceholder = el.placeholder;
          maxLength = el !== undefined ? el.maxLength : undefined;
          if (maxLength === -1) maxLength = undefined;

          if (opts.colorMask === true) {
            initializeColorMask(el);
          }

          if (mobile) {
            if ("inputmode" in el) {
              el.inputmode = opts.inputmode;
              el.setAttribute("inputmode", opts.inputmode);
            }

            if (opts.disablePredictiveText === true) {
              if ("autocorrect" in el) {
                el.autocorrect = false;
              } else {
                if (opts.colorMask !== true) {
                  initializeColorMask(el);
                }

                el.type = "password";
              }
            }
          }

          if (isSupported === true) {
            el.setAttribute("im-insert", opts.insertMode);
            EventRuler.on(el, "submit", EventHandlers.submitEvent);
            EventRuler.on(el, "reset", EventHandlers.resetEvent);
            EventRuler.on(el, "blur", EventHandlers.blurEvent);
            EventRuler.on(el, "focus", EventHandlers.focusEvent);

            if (opts.colorMask !== true) {
              EventRuler.on(el, "click", EventHandlers.clickEvent);
              EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent);
              EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent);
            }

            EventRuler.on(el, "paste", EventHandlers.pasteEvent);
            EventRuler.on(el, "cut", EventHandlers.cutEvent);
            EventRuler.on(el, "complete", opts.oncomplete);
            EventRuler.on(el, "incomplete", opts.onincomplete);
            EventRuler.on(el, "cleared", opts.oncleared);

            if (!mobile && opts.inputEventOnly !== true) {
              EventRuler.on(el, "keydown", EventHandlers.keydownEvent);
              EventRuler.on(el, "keypress", EventHandlers.keypressEvent);
            } else {
              el.removeAttribute("maxLength");
            }

            EventRuler.on(el, "input", EventHandlers.inputFallBackEvent);
            EventRuler.on(el, "beforeinput", EventHandlers.beforeInputEvent);
          }

          EventRuler.on(el, "setvalue", EventHandlers.setValueEvent);
          undoValue = getBufferTemplate().join("");

          if (el.inputmask._valueGet(true) !== "" || opts.clearMaskOnLostFocus === false || document.activeElement === el) {
            var initialValue = $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, el.inputmask._valueGet(true), opts) || el.inputmask._valueGet(true) : el.inputmask._valueGet(true);
            if (initialValue !== "") checkVal(el, true, false, initialValue.split(""));
            var buffer = getBuffer().slice();
            undoValue = buffer.join("");

            if (isComplete(buffer) === false) {
              if (opts.clearIncomplete) {
                resetMaskSet();
              }
            }

            if (opts.clearMaskOnLostFocus && document.activeElement !== el) {
              if (getLastValidPosition() === -1) {
                buffer = [];
              } else {
                clearOptionalTail(buffer);
              }
            }

            if (opts.clearMaskOnLostFocus === false || opts.showMaskOnFocus && document.activeElement === el || el.inputmask._valueGet(true) !== "") writeBuffer(el, buffer);

            if (document.activeElement === el) {
              caret(el, seekNext(getLastValidPosition()));
            }
          }
        }
      }

      var valueBuffer;

      if (actionObj !== undefined) {
        switch (actionObj.action) {
          case "isComplete":
            el = actionObj.el;
            return isComplete(getBuffer());

          case "unmaskedvalue":
            if (el === undefined || actionObj.value !== undefined) {
              valueBuffer = actionObj.value;
              valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer : valueBuffer).split("");
              checkVal.call(this, undefined, false, false, valueBuffer);
              if ($.isFunction(opts.onBeforeWrite)) opts.onBeforeWrite.call(inputmask, undefined, getBuffer(), 0, opts);
            }

            return unmaskedvalue(el);

          case "mask":
            mask(el);
            break;

          case "format":
            valueBuffer = ($.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value : actionObj.value).split("");
            checkVal.call(this, undefined, true, false, valueBuffer);

            if (actionObj.metadata) {
              return {
                value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
                metadata: maskScope.call(this, {
                  action: "getmetadata"
                }, maskset, opts)
              };
            }

            return isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");

          case "isValid":
            if (actionObj.value) {
              valueBuffer = actionObj.value.split("");
              checkVal.call(this, undefined, true, true, valueBuffer);
            } else {
              actionObj.value = getBuffer().join("");
            }

            var buffer = getBuffer();
            var rl = determineLastRequiredPosition(),
                lmib = buffer.length - 1;

            for (; lmib > rl; lmib--) {
              if (isMask(lmib)) break;
            }

            buffer.splice(rl, lmib + 1 - rl);
            return isComplete(buffer) && actionObj.value === getBuffer().join("");

          case "getemptymask":
            return getBufferTemplate().join("");

          case "remove":
            if (el && el.inputmask) {
              $.data(el, "_inputmask_opts", null);
              $el = $(el);

              el.inputmask._valueSet(opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(true));

              EventRuler.off(el);

              if (el.inputmask.colorMask) {
                colorMask = el.inputmask.colorMask;
                colorMask.removeChild(el);
                colorMask.parentNode.insertBefore(el, colorMask);
                colorMask.parentNode.removeChild(colorMask);
              }

              var valueProperty;

              if (Object.getOwnPropertyDescriptor && Object.getPrototypeOf) {
                valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value");

                if (valueProperty) {
                  if (el.inputmask.__valueGet) {
                    Object.defineProperty(el, "value", {
                      get: el.inputmask.__valueGet,
                      set: el.inputmask.__valueSet,
                      configurable: true
                    });
                  }
                }
              } else if (document.__lookupGetter__ && el.__lookupGetter__("value")) {
                if (el.inputmask.__valueGet) {
                  el.__defineGetter__("value", el.inputmask.__valueGet);

                  el.__defineSetter__("value", el.inputmask.__valueSet);
                }
              }

              el.inputmask = undefined;
            }

            return el;
            break;

          case "getmetadata":
            if ($.isArray(maskset.metadata)) {
              var maskTarget = getMaskTemplate(true, 0, false).join("");
              $.each(maskset.metadata, function (ndx, mtdt) {
                if (mtdt.mask === maskTarget) {
                  maskTarget = mtdt;
                  return false;
                }
              });
              return maskTarget;
            }

            return maskset.metadata;
        }
      }
    }

    return Inputmask;
  });
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  (function (factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(function ($) {
    return $;
  });
}, function (module, exports) {
  module.exports = jQuery;
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
    return typeof window !== "undefined" ? window : new (eval("require('jsdom').JSDOM"))("").window;
  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  (function (factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(function (Inputmask) {
    var $ = Inputmask.dependencyLib;
    var formatCode = {
      d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
      dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
        return pad(Date.prototype.getDate.call(this), 2);
      }],
      ddd: [""],
      dddd: [""],
      m: ["[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
        return Date.prototype.getMonth.call(this) + 1;
      }],
      mm: ["0[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
        return pad(Date.prototype.getMonth.call(this) + 1, 2);
      }],
      mmm: [""],
      mmmm: [""],
      yy: ["[0-9]{2}", Date.prototype.setFullYear, "year", function () {
        return pad(Date.prototype.getFullYear.call(this), 2);
      }],
      yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
        return pad(Date.prototype.getFullYear.call(this), 4);
      }],
      h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
      hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
        return pad(Date.prototype.getHours.call(this), 2);
      }],
      hhh: ["[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours],
      H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
      HH: ["[01][0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
        return pad(Date.prototype.getHours.call(this), 2);
      }],
      HHH: ["[0-9]+", Date.prototype.setHours, "hours", Date.prototype.getHours],
      M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
      MM: ["[0-5][0-9]", Date.prototype.setMinutes, "minutes", function () {
        return pad(Date.prototype.getMinutes.call(this), 2);
      }],
      s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
      ss: ["[0-5][0-9]", Date.prototype.setSeconds, "seconds", function () {
        return pad(Date.prototype.getSeconds.call(this), 2);
      }],
      l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
        return pad(Date.prototype.getMilliseconds.call(this), 3);
      }],
      L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
        return pad(Date.prototype.getMilliseconds.call(this), 2);
      }],
      t: ["[ap]"],
      tt: ["[ap]m"],
      T: ["[AP]"],
      TT: ["[AP]M"],
      Z: [""],
      o: [""],
      S: [""]
    },
        formatAlias = {
      isoDate: "yyyy-mm-dd",
      isoTime: "HH:MM:ss",
      isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
      isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

    function getTokenizer(opts) {
      if (!opts.tokenizer) {
        var tokens = [];

        for (var ndx in formatCode) {
          if (tokens.indexOf(ndx[0]) === -1) tokens.push(ndx[0]);
        }

        opts.tokenizer = "(" + tokens.join("+|") + ")+?|.";
        opts.tokenizer = new RegExp(opts.tokenizer, "g");
      }

      return opts.tokenizer;
    }

    function isValidDate(dateParts, currentResult) {
      return !isFinite(dateParts.rawday) || dateParts.day == "29" && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day ? currentResult : false;
    }

    function isDateInRange(dateParts, opts) {
      var result = true;

      if (opts.min) {
        if (dateParts["rawyear"]) {
          var rawYear = dateParts["rawyear"].replace(/[^0-9]/g, ""),
              minYear = opts.min.year.substr(0, rawYear.length);
          result = minYear <= rawYear;
        }

        if (dateParts["year"] === dateParts["rawyear"]) {
          if (opts.min.date.getTime() === opts.min.date.getTime()) {
            result = opts.min.date.getTime() <= dateParts.date.getTime();
          }
        }
      }

      if (result && opts.max && opts.max.date.getTime() === opts.max.date.getTime()) {
        result = opts.max.date.getTime() >= dateParts.date.getTime();
      }

      return result;
    }

    function parse(format, dateObjValue, opts, raw) {
      var mask = "",
          match;

      while (match = getTokenizer(opts).exec(format)) {
        if (dateObjValue === undefined) {
          if (formatCode[match[0]]) {
            mask += "(" + formatCode[match[0]][0] + ")";
          } else {
            switch (match[0]) {
              case "[":
                mask += "(";
                break;

              case "]":
                mask += ")?";
                break;

              default:
                mask += Inputmask.escapeRegex(match[0]);
            }
          }
        } else {
          if (formatCode[match[0]]) {
            if (raw !== true && formatCode[match[0]][3]) {
              var getFn = formatCode[match[0]][3];
              mask += getFn.call(dateObjValue.date);
            } else if (formatCode[match[0]][2]) mask += dateObjValue["raw" + formatCode[match[0]][2]];else mask += match[0];
          } else mask += match[0];
        }
      }

      return mask;
    }

    function pad(val, len) {
      val = String(val);
      len = len || 2;

      while (val.length < len) {
        val = "0" + val;
      }

      return val;
    }

    function analyseMask(maskString, format, opts) {
      var dateObj = {
        date: new Date(1, 0, 1)
      },
          targetProp,
          mask = maskString,
          match,
          dateOperation,
          targetValidator;

      function extendProperty(value) {
        var correctedValue = value.replace(/[^0-9]/g, "0");

        if (correctedValue != value) {
          var enteredPart = value.replace(/[^0-9]/g, ""),
              min = (opts.min && opts.min[targetProp] || value).toString(),
              max = (opts.max && opts.max[targetProp] || value).toString();
          correctedValue = enteredPart + (enteredPart < min.slice(0, enteredPart.length) ? min.slice(enteredPart.length) : enteredPart > max.slice(0, enteredPart.length) ? max.slice(enteredPart.length) : correctedValue.toString().slice(enteredPart.length));
        }

        return correctedValue;
      }

      function setValue(dateObj, value, opts) {
        dateObj[targetProp] = extendProperty(value);
        dateObj["raw" + targetProp] = value;
        if (dateOperation !== undefined) dateOperation.call(dateObj.date, targetProp == "month" ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp]);
      }

      if (typeof mask === "string") {
        while (match = getTokenizer(opts).exec(format)) {
          var value = mask.slice(0, match[0].length);

          if (formatCode.hasOwnProperty(match[0])) {
            targetValidator = formatCode[match[0]][0];
            targetProp = formatCode[match[0]][2];
            dateOperation = formatCode[match[0]][1];
            setValue(dateObj, value, opts);
          }

          mask = mask.slice(value.length);
        }

        return dateObj;
      } else if (mask && (typeof mask === "undefined" ? "undefined" : _typeof(mask)) === "object" && mask.hasOwnProperty("date")) {
        return mask;
      }

      return undefined;
    }

    Inputmask.extendAliases({
      datetime: {
        mask: function mask(opts) {
          formatCode.S = opts.i18n.ordinalSuffix.join("|");
          opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat;
          opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat;
          opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat;
          opts.placeholder = opts.placeholder !== "" ? opts.placeholder : opts.inputFormat.replace(/[\[\]]/, "");
          opts.regex = parse(opts.inputFormat, undefined, opts);
          return null;
        },
        placeholder: "",
        inputFormat: "isoDateTime",
        displayFormat: undefined,
        outputFormat: undefined,
        min: null,
        max: null,
        i18n: {
          dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          ordinalSuffix: ["st", "nd", "rd", "th"]
        },
        postValidation: function postValidation(buffer, pos, currentResult, opts) {
          opts.min = analyseMask(opts.min, opts.inputFormat, opts);
          opts.max = analyseMask(opts.max, opts.inputFormat, opts);
          var result = currentResult,
              dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);

          if (result && dateParts.date.getTime() === dateParts.date.getTime()) {
            result = isValidDate(dateParts, result);
            result = result && isDateInRange(dateParts, opts);
          }

          if (pos && result && currentResult.pos !== pos) {
            return {
              buffer: parse(opts.inputFormat, dateParts, opts),
              refreshFromBuffer: {
                start: pos,
                end: currentResult.pos
              }
            };
          }

          return result;
        },
        onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
          var input = this;

          if (e.ctrlKey && e.keyCode === Inputmask.keyCode.RIGHT) {
            var today = new Date(),
                match,
                date = "";

            while (match = getTokenizer(opts).exec(opts.inputFormat)) {
              if (match[0].charAt(0) === "d") {
                date += pad(today.getDate(), match[0].length);
              } else if (match[0].charAt(0) === "m") {
                date += pad(today.getMonth() + 1, match[0].length);
              } else if (match[0] === "yyyy") {
                date += today.getFullYear().toString();
              } else if (match[0].charAt(0) === "y") {
                date += pad(today.getYear(), match[0].length);
              }
            }

            input.inputmask._valueSet(date);

            $(input).trigger("setvalue");
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          return parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, true);
        },
        casing: function casing(elem, test, pos, validPositions) {
          if (test.nativeDef.indexOf("[ap]") == 0) return elem.toLowerCase();
          if (test.nativeDef.indexOf("[AP]") == 0) return elem.toUpperCase();
          return elem;
        },
        insertMode: false,
        shiftPositions: false
      }
    });
    return Inputmask;
  });
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  (function (factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(function (Inputmask) {
    var $ = Inputmask.dependencyLib;

    function autoEscape(txt, opts) {
      var escapedTxt = "";

      for (var i = 0; i < txt.length; i++) {
        if (Inputmask.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i)) {
          escapedTxt += "\\" + txt.charAt(i);
        } else escapedTxt += txt.charAt(i);
      }

      return escapedTxt;
    }

    function alignDigits(buffer, digits, opts) {
      if (digits > 0) {
        var radixPosition = $.inArray(opts.radixPoint, buffer);

        if (radixPosition === -1) {
          buffer.push(opts.radixPoint);
          radixPosition = buffer.length - 1;
        }

        for (var i = 1; i <= digits; i++) {
          buffer[radixPosition + i] = buffer[radixPosition + i] || "0";
        }
      }

      return buffer;
    }

    Inputmask.extendAliases({
      numeric: {
        mask: function mask(opts) {
          if (opts.repeat !== 0 && isNaN(opts.integerDigits)) {
            opts.integerDigits = opts.repeat;
          }

          opts.repeat = 0;

          if (opts.groupSeparator === opts.radixPoint && opts.digits && opts.digits !== "0") {
            if (opts.radixPoint === ".") {
              opts.groupSeparator = ",";
            } else if (opts.radixPoint === ",") {
              opts.groupSeparator = ".";
            } else opts.groupSeparator = "";
          }

          if (opts.groupSeparator === " ") {
            opts.skipOptionalPartCharacter = undefined;
          }

          opts.autoGroup = opts.autoGroup && opts.groupSeparator !== "";

          if (opts.autoGroup) {
            if (typeof opts.groupSize == "string" && isFinite(opts.groupSize)) opts.groupSize = parseInt(opts.groupSize);

            if (isFinite(opts.integerDigits)) {
              var seps = Math.floor(opts.integerDigits / opts.groupSize);
              var mod = opts.integerDigits % opts.groupSize;
              opts.integerDigits = parseInt(opts.integerDigits) + (mod === 0 ? seps - 1 : seps);

              if (opts.integerDigits < 1) {
                opts.integerDigits = "*";
              }
            }
          }

          if (opts.placeholder.length > 1) {
            opts.placeholder = opts.placeholder.charAt(0);
          }

          if (opts.positionCaretOnClick === "radixFocus" && opts.placeholder === "" && opts.integerOptional === false) {
            opts.positionCaretOnClick = "lvp";
          }

          opts.definitions[";"] = opts.definitions["~"];
          opts.definitions[";"].definitionSymbol = "~";

          if (opts.numericInput === true) {
            opts.positionCaretOnClick = opts.positionCaretOnClick === "radixFocus" ? "lvp" : opts.positionCaretOnClick;
            opts.digitsOptional = false;
            if (isNaN(opts.digits)) opts.digits = 2;
            opts.decimalProtect = false;
          }

          var mask = "[+]";
          mask += autoEscape(opts.prefix, opts);

          if (opts.integerOptional === true) {
            mask += "~{1," + opts.integerDigits + "}";
          } else mask += "~{" + opts.integerDigits + "}";

          if (opts.digits !== undefined) {
            var radixDef = opts.decimalProtect ? ":" : opts.radixPoint;
            var dq = opts.digits.toString().split(",");

            if (isFinite(dq[0]) && dq[1] && isFinite(dq[1])) {
              mask += radixDef + ";{" + opts.digits + "}";
            } else if (isNaN(opts.digits) || parseInt(opts.digits) > 0) {
              if (opts.digitsOptional) {
                mask += "[" + radixDef + ";{1," + opts.digits + "}]";
              } else mask += radixDef + ";{" + opts.digits + "}";
            }
          }

          mask += autoEscape(opts.suffix, opts);
          mask += "[-]";
          opts.greedy = false;
          return mask;
        },
        placeholder: "",
        greedy: false,
        digits: "*",
        digitsOptional: true,
        enforceDigitsOnBlur: false,
        radixPoint: ".",
        positionCaretOnClick: "radixFocus",
        groupSize: 3,
        groupSeparator: "",
        autoGroup: false,
        allowMinus: true,
        negationSymbol: {
          front: "-",
          back: ""
        },
        integerDigits: "+",
        integerOptional: true,
        prefix: "",
        suffix: "",
        rightAlign: true,
        decimalProtect: true,
        min: null,
        max: null,
        step: 1,
        insertMode: true,
        autoUnmask: false,
        unmaskAsNumber: false,
        inputType: "text",
        inputmode: "numeric",
        preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset) {
          if (c === "-" || c === opts.negationSymbol.front) {
            if (opts.allowMinus !== true) return false;
            opts.isNegative = opts.isNegative === undefined ? true : !opts.isNegative;
            if (buffer.join("") === "") return true;
            return {
              caret: maskset.validPositions[pos] ? pos : undefined,
              dopost: true
            };
          }

          if (isSelection === false && c === opts.radixPoint && opts.digits !== undefined && (isNaN(opts.digits) || parseInt(opts.digits) > 0)) {
            var radixPos = $.inArray(opts.radixPoint, buffer);

            if (radixPos !== -1 && maskset.validPositions[radixPos] !== undefined) {
              if (opts.numericInput === true) {
                return pos === radixPos;
              }

              return {
                caret: radixPos + 1
              };
            }
          }

          return true;
        },
        postValidation: function postValidation(buffer, pos, currentResult, opts) {
          function buildPostMask(buffer, opts) {
            var postMask = "";
            postMask += "(" + opts.groupSeparator + "*{" + opts.groupSize + "}){*}";

            if (opts.radixPoint !== "") {
              var radixSplit = buffer.join("").split(opts.radixPoint);

              if (radixSplit[1]) {
                postMask += opts.radixPoint + "*{" + radixSplit[1].match(/^\d*\??\d*/)[0].length + "}";
              }
            }

            return postMask;
          }

          var suffix = opts.suffix.split(""),
              prefix = opts.prefix.split("");
          if (currentResult.pos === undefined && currentResult.caret !== undefined && currentResult.dopost !== true) return currentResult;
          var caretPos = currentResult.caret !== undefined ? currentResult.caret : currentResult.pos;
          var maskedValue = buffer.slice();

          if (opts.numericInput) {
            caretPos = maskedValue.length - caretPos - 1;
            maskedValue = maskedValue.reverse();
          }

          var charAtPos = maskedValue[caretPos];

          if (charAtPos === opts.groupSeparator) {
            caretPos += 1;
            charAtPos = maskedValue[caretPos];
          }

          if (caretPos === maskedValue.length - opts.suffix.length - 1 && charAtPos === opts.radixPoint) return currentResult;

          if (charAtPos !== undefined) {
            if (charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back) {
              maskedValue[caretPos] = "?";

              if (opts.prefix.length > 0 && caretPos >= (opts.isNegative === false ? 1 : 0) && caretPos < opts.prefix.length - 1 + (opts.isNegative === false ? 1 : 0)) {
                prefix[caretPos - (opts.isNegative === false ? 1 : 0)] = "?";
              } else if (opts.suffix.length > 0 && caretPos >= maskedValue.length - opts.suffix.length - (opts.isNegative === false ? 1 : 0)) {
                suffix[caretPos - (maskedValue.length - opts.suffix.length - (opts.isNegative === false ? 1 : 0))] = "?";
              }
            }
          }

          prefix = prefix.join("");
          suffix = suffix.join("");
          var processValue = maskedValue.join("").replace(prefix, "");
          processValue = processValue.replace(suffix, "");
          processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
          processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), "");
          processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");

          if (isNaN(opts.placeholder)) {
            processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.placeholder), "g"), "");
          }

          if (processValue.length > 1 && processValue.indexOf(opts.radixPoint) !== 1) {
            if (charAtPos === "0") {
              processValue = processValue.replace(/^\?/g, "");
            }

            processValue = processValue.replace(/^0/g, "");
          }

          if (processValue.charAt(0) === opts.radixPoint && opts.radixPoint !== "" && opts.numericInput !== true) {
            processValue = "0" + processValue;
          }

          if (processValue !== "") {
            processValue = processValue.split("");

            if ((!opts.digitsOptional || opts.enforceDigitsOnBlur && currentResult.event === "blur") && isFinite(opts.digits)) {
              var radixPosition = $.inArray(opts.radixPoint, processValue);
              var rpb = $.inArray(opts.radixPoint, maskedValue);

              if (radixPosition === -1) {
                processValue.push(opts.radixPoint);
                radixPosition = processValue.length - 1;
              }

              for (var i = 1; i <= opts.digits; i++) {
                if ((!opts.digitsOptional || opts.enforceDigitsOnBlur && currentResult.event === "blur") && (processValue[radixPosition + i] === undefined || processValue[radixPosition + i] === opts.placeholder.charAt(0))) {
                  processValue[radixPosition + i] = currentResult.placeholder || opts.placeholder.charAt(0);
                } else if (rpb !== -1 && maskedValue[rpb + i] !== undefined) {
                  processValue[radixPosition + i] = processValue[radixPosition + i] || maskedValue[rpb + i];
                }
              }
            }

            if (opts.autoGroup === true && opts.groupSeparator !== "" && (charAtPos !== opts.radixPoint || currentResult.pos !== undefined || currentResult.dopost)) {
              var addRadix = processValue[processValue.length - 1] === opts.radixPoint && currentResult.c === opts.radixPoint;
              processValue = Inputmask(buildPostMask(processValue, opts), {
                numericInput: true,
                jitMasking: true,
                definitions: {
                  "*": {
                    validator: "[0-9?]",
                    cardinality: 1
                  }
                }
              }).format(processValue.join(""));
              if (addRadix) processValue += opts.radixPoint;

              if (processValue.charAt(0) === opts.groupSeparator) {
                processValue.substr(1);
              }
            } else processValue = processValue.join("");
          }

          if (opts.isNegative && currentResult.event === "blur") {
            opts.isNegative = processValue !== "0";
          }

          processValue = prefix + processValue;
          processValue += suffix;

          if (opts.isNegative) {
            processValue = opts.negationSymbol.front + processValue;
            processValue += opts.negationSymbol.back;
          }

          processValue = processValue.split("");

          if (charAtPos !== undefined) {
            if (charAtPos !== opts.radixPoint && charAtPos !== opts.negationSymbol.front && charAtPos !== opts.negationSymbol.back) {
              caretPos = $.inArray("?", processValue);

              if (caretPos > -1) {
                processValue[caretPos] = charAtPos;
              } else caretPos = currentResult.caret || 0;
            } else if (charAtPos === opts.radixPoint || charAtPos === opts.negationSymbol.front || charAtPos === opts.negationSymbol.back) {
              var newCaretPos = $.inArray(charAtPos, processValue);
              if (newCaretPos !== -1) caretPos = newCaretPos;
            }
          }

          if (opts.numericInput) {
            caretPos = processValue.length - caretPos - 1;
            processValue = processValue.reverse();
          }

          var rslt = {
            caret: (charAtPos === undefined || currentResult.pos !== undefined) && caretPos !== undefined ? caretPos + (opts.numericInput ? -1 : 1) : caretPos,
            buffer: processValue,
            refreshFromBuffer: currentResult.dopost || buffer.join("") !== processValue.join("")
          };
          return rslt.refreshFromBuffer ? rslt : currentResult;
        },
        onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
          function parseMinMaxOptions(opts) {
            if (opts.parseMinMaxOptions === undefined) {
              if (opts.min !== null) {
                opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                if (opts.radixPoint === ",") opts.min = opts.min.replace(opts.radixPoint, ".");
                opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN;
                if (isNaN(opts.min)) opts.min = Number.MIN_VALUE;
              }

              if (opts.max !== null) {
                opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");
                if (opts.radixPoint === ",") opts.max = opts.max.replace(opts.radixPoint, ".");
                opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN;
                if (isNaN(opts.max)) opts.max = Number.MAX_VALUE;
              }

              opts.parseMinMaxOptions = "done";
            }
          }

          if (e) {
            switch (e.type) {
              case "keydown":
                return opts.postValidation(buffer, caretPos, {
                  caret: caretPos,
                  dopost: true
                }, opts);

              case "blur":
              case "checkval":
                var unmasked;
                parseMinMaxOptions(opts);

                if (opts.min !== null || opts.max !== null) {
                  unmasked = opts.onUnMask(buffer.join(""), undefined, $.extend({}, opts, {
                    unmaskAsNumber: true
                  }));

                  if (opts.min !== null && unmasked < opts.min) {
                    opts.isNegative = opts.min < 0;
                    return opts.postValidation(opts.min.toString().replace(".", opts.radixPoint).split(""), caretPos, {
                      caret: caretPos,
                      dopost: true,
                      placeholder: "0"
                    }, opts);
                  } else if (opts.max !== null && unmasked > opts.max) {
                    opts.isNegative = opts.max < 0;
                    return opts.postValidation(opts.max.toString().replace(".", opts.radixPoint).split(""), caretPos, {
                      caret: caretPos,
                      dopost: true,
                      placeholder: "0"
                    }, opts);
                  }
                }

                return opts.postValidation(buffer, caretPos, {
                  caret: caretPos,
                  placeholder: "0",
                  event: "blur"
                }, opts);

              case "_checkval":
                return {
                  caret: caretPos
                };

              default:
                break;
            }
          }
        },
        regex: {
          integerPart: function integerPart(opts, emptyCheck) {
            return emptyCheck ? new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?") : new RegExp("[" + Inputmask.escapeRegex(opts.negationSymbol.front) + "+]?\\d+");
          },
          integerNPart: function integerNPart(opts) {
            return new RegExp("[\\d" + Inputmask.escapeRegex(opts.groupSeparator) + Inputmask.escapeRegex(opts.placeholder.charAt(0)) + "]+");
          }
        },
        definitions: {
          "~": {
            validator: function validator(chrs, maskset, pos, strict, opts, isSelection) {
              var isValid, l;

              if (chrs === "k" || chrs === "m") {
                isValid = {
                  insert: [],
                  c: 0
                };

                for (var i = 0, l = chrs === "k" ? 2 : 5; i < l; i++) {
                  isValid.insert.push({
                    pos: pos + i,
                    c: 0
                  });
                }

                isValid.pos = pos + l;
                return isValid;
              }

              isValid = strict ? new RegExp("[0-9" + Inputmask.escapeRegex(opts.groupSeparator) + "]").test(chrs) : new RegExp("[0-9]").test(chrs);

              if (isValid === true) {
                if (opts.numericInput !== true && maskset.validPositions[pos] !== undefined && maskset.validPositions[pos].match.def === "~" && !isSelection) {
                  var processValue = maskset.buffer.join("");
                  processValue = processValue.replace(new RegExp("[-" + Inputmask.escapeRegex(opts.negationSymbol.front) + "]", "g"), "");
                  processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
                  var pvRadixSplit = processValue.split(opts.radixPoint);

                  if (pvRadixSplit.length > 1) {
                    pvRadixSplit[1] = pvRadixSplit[1].replace(/0/g, opts.placeholder.charAt(0));
                  }

                  if (pvRadixSplit[0] === "0") {
                    pvRadixSplit[0] = pvRadixSplit[0].replace(/0/g, opts.placeholder.charAt(0));
                  }

                  processValue = pvRadixSplit[0] + opts.radixPoint + pvRadixSplit[1] || "";

                  var bufferTemplate = maskset._buffer.join("");

                  if (processValue === opts.radixPoint) {
                    processValue = bufferTemplate;
                  }

                  while (processValue.match(Inputmask.escapeRegex(bufferTemplate) + "$") === null) {
                    bufferTemplate = bufferTemplate.slice(1);
                  }

                  processValue = processValue.replace(bufferTemplate, "");
                  processValue = processValue.split("");

                  if (processValue[pos] === undefined) {
                    isValid = {
                      pos: pos,
                      remove: pos
                    };
                  } else {
                    isValid = {
                      pos: pos
                    };
                  }
                }
              } else if (!strict && chrs === opts.radixPoint && maskset.validPositions[pos - 1] === undefined) {
                isValid = {
                  insert: {
                    pos: pos,
                    c: 0
                  },
                  pos: pos + 1
                };
              }

              return isValid;
            },
            cardinality: 1
          },
          "+": {
            validator: function validator(chrs, maskset, pos, strict, opts) {
              return opts.allowMinus && (chrs === "-" || chrs === opts.negationSymbol.front);
            },
            cardinality: 1,
            placeholder: ""
          },
          "-": {
            validator: function validator(chrs, maskset, pos, strict, opts) {
              return opts.allowMinus && chrs === opts.negationSymbol.back;
            },
            cardinality: 1,
            placeholder: ""
          },
          ":": {
            validator: function validator(chrs, maskset, pos, strict, opts) {
              var radix = "[" + Inputmask.escapeRegex(opts.radixPoint) + "]";
              var isValid = new RegExp(radix).test(chrs);

              if (isValid && maskset.validPositions[pos] && maskset.validPositions[pos].match.placeholder === opts.radixPoint) {
                isValid = {
                  caret: pos + 1
                };
              }

              return isValid;
            },
            cardinality: 1,
            placeholder: function placeholder(opts) {
              return opts.radixPoint;
            }
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          if (unmaskedValue === "" && opts.nullable === true) {
            return unmaskedValue;
          }

          var processValue = maskedValue.replace(opts.prefix, "");
          processValue = processValue.replace(opts.suffix, "");
          processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), "");

          if (opts.placeholder.charAt(0) !== "") {
            processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0");
          }

          if (opts.unmaskAsNumber) {
            if (opts.radixPoint !== "" && processValue.indexOf(opts.radixPoint) !== -1) processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".");
            processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
            processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
            return Number(processValue);
          }

          return processValue;
        },
        isComplete: function isComplete(buffer, opts) {
          var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
          maskedValue = maskedValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-");
          maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), "");
          maskedValue = maskedValue.replace(opts.prefix, "");
          maskedValue = maskedValue.replace(opts.suffix, "");
          maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1");
          if (opts.radixPoint === ",") maskedValue = maskedValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".");
          return isFinite(maskedValue);
        },
        onBeforeMask: function onBeforeMask(initialValue, opts) {
          opts.isNegative = undefined;
          var radixPoint = opts.radixPoint || ",";

          if ((typeof initialValue == "number" || opts.inputType === "number") && radixPoint !== "") {
            initialValue = initialValue.toString().replace(".", radixPoint);
          }

          var valueParts = initialValue.split(radixPoint),
              integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
              decimalPart = valueParts.length > 1 ? valueParts[1].replace(/[^0-9]/g, "") : "";
          initialValue = integerPart + (decimalPart !== "" ? radixPoint + decimalPart : decimalPart);
          var digits = 0;

          if (radixPoint !== "") {
            digits = decimalPart.length;

            if (decimalPart !== "") {
              var digitsFactor = Math.pow(10, digits || 1);

              if (isFinite(opts.digits)) {
                digits = parseInt(opts.digits);
                digitsFactor = Math.pow(10, digits);
              }

              initialValue = initialValue.replace(Inputmask.escapeRegex(radixPoint), ".");
              if (isFinite(initialValue)) initialValue = Math.round(parseFloat(initialValue) * digitsFactor) / digitsFactor;
              initialValue = initialValue.toString().replace(".", radixPoint);
            }
          }

          if (opts.digits === 0 && initialValue.indexOf(Inputmask.escapeRegex(radixPoint)) !== -1) {
            initialValue = initialValue.substring(0, initialValue.indexOf(Inputmask.escapeRegex(radixPoint)));
          }

          return alignDigits(initialValue.toString().split(""), digits, opts).join("");
        },
        onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
          var $input = $(this);

          if (e.ctrlKey) {
            switch (e.keyCode) {
              case Inputmask.keyCode.UP:
                $input.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step));
                $input.trigger("setvalue");
                break;

              case Inputmask.keyCode.DOWN:
                $input.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step));
                $input.trigger("setvalue");
                break;
            }
          }
        }
      },
      currency: {
        prefix: "$ ",
        groupSeparator: ",",
        alias: "numeric",
        placeholder: "0",
        autoGroup: true,
        digits: 2,
        digitsOptional: false,
        clearMaskOnLostFocus: false
      },
      decimal: {
        alias: "numeric"
      },
      integer: {
        alias: "numeric",
        digits: 0,
        radixPoint: ""
      },
      percentage: {
        alias: "numeric",
        digits: 2,
        digitsOptional: true,
        radixPoint: ".",
        placeholder: "0",
        autoGroup: false,
        min: 0,
        max: 100,
        suffix: " %",
        allowMinus: false
      }
    });
    return Inputmask;
  });
}, function (module, exports, __webpack_require__) {
  "use strict";

  var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
  };

  (function (factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(function ($, Inputmask) {
    if ($.fn.inputmask === undefined) {
      $.fn.inputmask = function (fn, options) {
        var nptmask,
            input = this[0];
        if (options === undefined) options = {};

        if (typeof fn === "string") {
          switch (fn) {
            case "unmaskedvalue":
              return input && input.inputmask ? input.inputmask.unmaskedvalue() : $(input).val();

            case "remove":
              return this.each(function () {
                if (this.inputmask) this.inputmask.remove();
              });

            case "getemptymask":
              return input && input.inputmask ? input.inputmask.getemptymask() : "";

            case "hasMaskedValue":
              return input && input.inputmask ? input.inputmask.hasMaskedValue() : false;

            case "isComplete":
              return input && input.inputmask ? input.inputmask.isComplete() : true;

            case "getmetadata":
              return input && input.inputmask ? input.inputmask.getmetadata() : undefined;

            case "setvalue":
              Inputmask.setValue(input, options);
              break;

            case "option":
              if (typeof options === "string") {
                if (input && input.inputmask !== undefined) {
                  return input.inputmask.option(options);
                }
              } else {
                return this.each(function () {
                  if (this.inputmask !== undefined) {
                    return this.inputmask.option(options);
                  }
                });
              }

              break;

            default:
              options.alias = fn;
              nptmask = new Inputmask(options);
              return this.each(function () {
                nptmask.mask(this);
              });
          }
        } else if (Array.isArray(fn)) {
          options.alias = fn;
          nptmask = new Inputmask(options);
          return this.each(function () {
            nptmask.mask(this);
          });
        } else if ((typeof fn === "undefined" ? "undefined" : _typeof(fn)) == "object") {
          nptmask = new Inputmask(fn);

          if (fn.mask === undefined && fn.alias === undefined) {
            return this.each(function () {
              if (this.inputmask !== undefined) {
                return this.inputmask.option(fn);
              } else nptmask.mask(this);
            });
          } else {
            return this.each(function () {
              nptmask.mask(this);
            });
          }
        } else if (fn === undefined) {
          return this.each(function () {
            nptmask = new Inputmask(options);
            nptmask.mask(this);
          });
        }
      };
    }

    return $.fn.inputmask;
  });
}]);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? require("jquery") : window.jQuery || window.Zepto);
}(function (a) {
  var b,
      c,
      d,
      e,
      f,
      g,
      h = "Close",
      i = "BeforeClose",
      j = "AfterClose",
      k = "BeforeAppend",
      l = "MarkupParse",
      m = "Open",
      n = "Change",
      o = "mfp",
      p = "." + o,
      q = "mfp-ready",
      r = "mfp-removing",
      s = "mfp-prevent-close",
      t = function t() {},
      u = !!window.jQuery,
      v = a(window),
      w = function w(a, c) {
    b.ev.on(o + a + p, c);
  },
      x = function x(b, c, d, e) {
    var f = document.createElement("div");
    return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f;
  },
      y = function y(c, d) {
    b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
  },
      z = function z(c) {
    return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn;
  },
      A = function A() {
    a.magnificPopup.instance || (b = new t(), b.init(), a.magnificPopup.instance = b);
  },
      B = function B() {
    var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
    if (void 0 !== a.transition) return !0;

    for (; b.length;) {
      if (b.pop() + "Transition" in a) return !0;
    }

    return !1;
  };

  t.prototype = {
    constructor: t,
    init: function init() {
      var c = navigator.appVersion;
      b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {};
    },
    open: function open(c) {
      var e;

      if (c.isObj === !1) {
        b.items = c.items.toArray(), b.index = 0;
        var g,
            h = c.items;

        for (e = 0; e < h.length; e++) {
          if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
            b.index = e;
            break;
          }
        }
      } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;

      if (b.isOpen) return void b.updateItemHTML();
      b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function () {
        b.close();
      }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function (a) {
        b._checkIfClose(a.target) && b.close();
      }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;

      for (e = 0; e < i.length; e++) {
        var j = i[e];
        j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b);
      }

      y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function (a, b, c, d) {
        c.close_replaceWith = z(d.type);
      }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
        overflow: b.st.overflowY,
        overflowX: "hidden",
        overflowY: b.st.overflowY
      }) : b.wrap.css({
        top: v.scrollTop(),
        position: "absolute"
      }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
        height: d.height(),
        position: "absolute"
      }), b.st.enableEscapeKey && d.on("keyup" + p, function (a) {
        27 === a.keyCode && b.close();
      }), v.on("resize" + p, function () {
        b.updateSize();
      }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
      var k = b.wH = v.height(),
          n = {};

      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();

        o && (n.marginRight = o);
      }

      b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
      var r = b.st.mainClass;
      return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function () {
        b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn);
      }, 16), b.isOpen = !0, b.updateSize(k), y(m), c;
    },
    close: function close() {
      b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function () {
        b._close();
      }, b.st.removalDelay)) : b._close());
    },
    _close: function _close() {
      y(h);
      var c = r + " " + q + " ";

      if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
        var e = {
          marginRight: ""
        };
        b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e);
      }

      d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j);
    },
    updateSize: function updateSize(a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
            d = window.innerHeight * c;
        b.wrap.css("height", d), b.wH = d;
      } else b.wH = a || v.height();

      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function updateItemHTML() {
      var c = b.items[b.index];
      b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
      var d = c.type;

      if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0;
      }

      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
      b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange");
    },
    appendContent: function appendContent(a, c) {
      b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content);
    },
    parseEl: function parseEl(c) {
      var d,
          e = b.items[c];

      if (e.tagName ? e = {
        el: a(e)
      } : (d = e.type, e = {
        data: e,
        src: e.src
      }), e.el) {
        for (var f = b.types, g = 0; g < f.length; g++) {
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        }

        e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"));
      }

      return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c];
    },
    addGroup: function addGroup(a, c) {
      var d = function d(_d) {
        _d.mfpEl = this, b._openClick(_d, a, c);
      };

      c || (c = {});
      var e = "click.magnificPopup";
      c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)));
    },
    _openClick: function _openClick(c, d, e) {
      var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;

      if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
        var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
        if (g) if (a.isFunction(g)) {
          if (!g.call(b)) return !0;
        } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e);
      }
    },
    updateStatus: function updateStatus(a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
        var e = {
          status: a,
          text: d
        };
        y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function (a) {
          a.stopImmediatePropagation();
        }), b.container.addClass("mfp-s-" + a), c = a;
      }
    },
    _checkIfClose: function _checkIfClose(c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
            e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;

        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;

        return !1;
      }
    },
    _addClassToMFP: function _addClassToMFP(a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function _removeClassFromMFP(a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function _hasScrollBar(a) {
      return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height());
    },
    _setFocus: function _setFocus() {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function _onFocusIn(c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1);
    },
    _parseMarkup: function _parseMarkup(b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function (c, d) {
        if (void 0 === d || d === !1) return !0;

        if (e = c.split("_"), e.length > 1) {
          var f = b.find(p + "-" + e[0]);

          if (f.length > 0) {
            var g = e[1];
            "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d);
          }
        } else b.find(p + "-" + c).html(d);
      });
    },
    _getScrollbarSize: function _getScrollbarSize() {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a);
      }

      return b.scrollbarSize;
    }
  }, a.magnificPopup = {
    instance: null,
    proto: t.prototype,
    modules: [],
    open: function open(b, c) {
      return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b);
    },
    close: function close() {
      return a.magnificPopup.instance && a.magnificPopup.instance.close();
    },
    registerModule: function registerModule(b, c) {
      c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b);
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
      tClose: "Close (Esc)",
      tLoading: "Loading...",
      autoFocusLast: !0
    }
  }, a.fn.magnificPopup = function (c) {
    A();
    var d = a(this);
    if ("string" == typeof c) {
      if ("open" === c) {
        var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
        f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
          mfpEl: e
        }, d, f);
      } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
    } else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
    return d;
  };

  var C,
      D,
      E,
      F = "inline",
      G = function G() {
    E && (D.after(E.addClass(C)).detach(), E = null);
  };

  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found"
    },
    proto: {
      initInline: function initInline() {
        b.types.push(F), w(h + "." + F, function () {
          G();
        });
      },
      getInline: function getInline(c, d) {
        if (G(), c.src) {
          var e = b.st.inline,
              f = a(c.src);

          if (f.length) {
            var g = f[0].parentNode;
            g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), f = a("<div>");

          return c.inlineElement = f, f;
        }

        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      }
    }
  });

  var H,
      I = "ajax",
      J = function J() {
    H && a(document.body).removeClass(H);
  },
      K = function K() {
    J(), b.req && b.req.abort();
  };

  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },
    proto: {
      initAjax: function initAjax() {
        b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K);
      },
      getAjax: function getAjax(c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend({
          url: c.src,
          success: function success(d, e, f) {
            var g = {
              data: d,
              xhr: f
            };
            y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function () {
              b.wrap.addClass(q);
            }, 16), b.updateStatus("ready"), y("AjaxContentAdded");
          },
          error: function error() {
            J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src));
          }
        }, b.st.ajax.settings);
        return b.req = a.ajax(d), "";
      }
    }
  });

  var L,
      M = function M(c) {
    if (c.data && void 0 !== c.data.title) return c.data.title;
    var d = b.st.image.titleSrc;

    if (d) {
      if (a.isFunction(d)) return d.call(b, c);
      if (c.el) return c.el.attr(d) || "";
    }

    return "";
  };

  a.magnificPopup.registerModule("image", {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    proto: {
      initImage: function initImage() {
        var c = b.st.image,
            d = ".image";
        b.types.push("image"), w(m + d, function () {
          "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor);
        }), w(h + d, function () {
          c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p);
        }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function resizeImage() {
        var a = b.currItem;

        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function _onImageHasSize(a) {
        a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1));
      },
      findImageSize: function findImageSize(a) {
        var c = 0,
            d = a.img[0],
            e = function e(f) {
          L && clearInterval(L), L = setInterval(function () {
            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void (3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)));
          }, f);
        };

        e(1);
      },
      getImage: function getImage(c, d) {
        var e = 0,
            f = function f() {
          c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()));
        },
            g = function g() {
          c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0);
        },
            h = b.st.image,
            i = d.find(".mfp-img");

        if (i.length) {
          var j = document.createElement("img");
          j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1);
        }

        return b._parseMarkup(d, {
          title: M(c),
          img_replaceWith: c.img
        }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d);
      }
    }
  });

  var N,
      O = function O() {
    return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N;
  };

  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function opener(a) {
        return a.is("img") ? a : a.find("img");
      }
    },
    proto: {
      initZoom: function initZoom() {
        var a,
            c = b.st.zoom,
            d = ".zoom";

        if (c.enabled && b.supportsTransition) {
          var e,
              f,
              g = c.duration,
              j = function j(a) {
            var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
              position: "fixed",
              zIndex: 9999,
              left: 0,
              top: 0,
              "-webkit-backface-visibility": "hidden"
            },
                f = "transition";
            return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b;
          },
              k = function k() {
            b.content.css("visibility", "visible");
          };

          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
              f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function () {
                f.css(b._getOffset(!0)), e = setTimeout(function () {
                  k(), setTimeout(function () {
                    f.remove(), a = f = null, y("ZoomAnimationEnded");
                  }, 16);
                }, g);
              }, 16);
            }
          }), w(i + d, function () {
            if (b._allowZoom()) {
              if (clearTimeout(e), b.st.removalDelay = g, !a) {
                if (a = b._getItemToZoom(), !a) return;
                f = j(a);
              }

              f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function () {
                f.css(b._getOffset());
              }, 16);
            }
          }), w(h + d, function () {
            b._allowZoom() && (k(), f && f.remove(), a = null);
          });
        }
      },
      _allowZoom: function _allowZoom() {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function _getItemToZoom() {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function _getOffset(c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
            f = parseInt(d.css("padding-top"), 10),
            g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
        };
        return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h;
      }
    }
  });

  var P = "iframe",
      Q = "//about:blank",
      R = function R(a) {
    if (b.currTemplate[P]) {
      var c = b.currTemplate[P].find("iframe");
      c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"));
    }
  };

  a.magnificPopup.registerModule(P, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1"
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1"
        },
        gmaps: {
          index: "//maps.google.",
          src: "%id%&output=embed"
        }
      }
    },
    proto: {
      initIframe: function initIframe() {
        b.types.push(P), w("BeforeChange", function (a, b, c) {
          b !== c && (b === P ? R() : c === P && R(!0));
        }), w(h + "." + P, function () {
          R();
        });
      },
      getIframe: function getIframe(c, d) {
        var e = c.src,
            f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0;
        });
        var g = {};
        return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d;
      }
    }
  });

  var S = function S(a) {
    var c = b.items.length;
    return a > c - 1 ? a - c : 0 > a ? c + a : a;
  },
      T = function T(a, b, c) {
    return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
  };

  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    },
    proto: {
      initGallery: function initGallery() {
        var c = b.st.gallery,
            e = ".mfp-gallery";
        return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function () {
          c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function () {
            return b.items.length > 1 ? (b.next(), !1) : void 0;
          }), d.on("keydown" + e, function (a) {
            37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
          });
        }), w("UpdateStatus" + e, function (a, c) {
          c.text && (c.text = T(c.text, b.currItem.index, b.items.length));
        }), w(l + e, function (a, d, e, f) {
          var g = b.items.length;
          e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
        }), w("BuildControls" + e, function () {
          if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
            var d = c.arrowMarkup,
                e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
            e.click(function () {
              b.prev();
            }), f.click(function () {
              b.next();
            }), b.container.append(e.add(f));
          }
        }), w(n + e, function () {
          b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function () {
            b.preloadNearbyImages(), b._preloadTimeout = null;
          }, 16);
        }), void w(h + e, function () {
          d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null;
        })) : !1;
      },
      next: function next() {
        b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML();
      },
      prev: function prev() {
        b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML();
      },
      goTo: function goTo(a) {
        b.direction = a >= b.index, b.index = a, b.updateItemHTML();
      },
      preloadNearbyImages: function preloadNearbyImages() {
        var a,
            c = b.st.gallery.preload,
            d = Math.min(c[0], b.items.length),
            e = Math.min(c[1], b.items.length);

        for (a = 1; a <= (b.direction ? e : d); a++) {
          b._preloadItem(b.index + a);
        }

        for (a = 1; a <= (b.direction ? d : e); a++) {
          b._preloadItem(b.index - a);
        }
      },
      _preloadItem: function _preloadItem(c) {
        if (c = S(c), !b.items[c].preloaded) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function () {
            d.hasSize = !0;
          }).on("error.mfploader", function () {
            d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d);
          }).attr("src", d.src)), d.preloaded = !0;
        }
      }
    }
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function replaceSrc(a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1
    },
    proto: {
      initRetina: function initRetina() {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
              c = a.ratio;
          c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function (a, b) {
            b.img.css({
              "max-width": b.img[0].naturalWidth / c,
              width: "100%"
            });
          }), w("ElementParse." + U, function (b, d) {
            d.src = a.replaceSrc(d, c);
          }));
        }
      }
    }
  }), A();
});
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
* jquery-match-height 0.7.2 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function (t) {
  "use strict";

  "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery);
}(function (t) {
  var e = -1,
      o = -1,
      n = function n(t) {
    return parseFloat(t) || 0;
  },
      a = function a(e) {
    var o = 1,
        a = t(e),
        i = null,
        r = [];
    return a.each(function () {
      var e = t(this),
          a = e.offset().top - n(e.css("margin-top")),
          s = r.length > 0 ? r[r.length - 1] : null;
      null === s ? r.push(e) : Math.floor(Math.abs(i - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e), i = a;
    }), r;
  },
      i = function i(e) {
    var o = {
      byRow: !0,
      property: "height",
      target: null,
      remove: !1
    };
    return "object" == _typeof(e) ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0), o);
  },
      r = t.fn.matchHeight = function (e) {
    var o = i(e);

    if (o.remove) {
      var n = this;
      return this.css(o.property, ""), t.each(r._groups, function (t, e) {
        e.elements = e.elements.not(n);
      }), this;
    }

    return this.length <= 1 && !o.target ? this : (r._groups.push({
      elements: this,
      options: o
    }), r._apply(this, o), this);
  };

  r.version = "0.7.2", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null, r._afterUpdate = null, r._rows = a, r._parse = n, r._parseOptions = i, r._apply = function (e, o) {
    var s = i(o),
        h = t(e),
        l = [h],
        c = t(window).scrollTop(),
        p = t("html").outerHeight(!0),
        u = h.parents().filter(":hidden");
    return u.each(function () {
      var e = t(this);
      e.data("style-cache", e.attr("style"));
    }), u.css("display", "block"), s.byRow && !s.target && (h.each(function () {
      var e = t(this),
          o = e.css("display");
      "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"), e.data("style-cache", e.attr("style")), e.css({
        display: o,
        "padding-top": "0",
        "padding-bottom": "0",
        "margin-top": "0",
        "margin-bottom": "0",
        "border-top-width": "0",
        "border-bottom-width": "0",
        height: "100px",
        overflow: "hidden"
      });
    }), l = a(h), h.each(function () {
      var e = t(this);
      e.attr("style", e.data("style-cache") || "");
    })), t.each(l, function (e, o) {
      var a = t(o),
          i = 0;
      if (s.target) i = s.target.outerHeight(!1);else {
        if (s.byRow && a.length <= 1) return void a.css(s.property, "");
        a.each(function () {
          var e = t(this),
              o = e.attr("style"),
              n = e.css("display");
          "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
          var a = {
            display: n
          };
          a[s.property] = "", e.css(a), e.outerHeight(!1) > i && (i = e.outerHeight(!1)), o ? e.attr("style", o) : e.css("display", "");
        });
      }
      a.each(function () {
        var e = t(this),
            o = 0;
        s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += n(e.css("border-top-width")) + n(e.css("border-bottom-width")), o += n(e.css("padding-top")) + n(e.css("padding-bottom"))), e.css(s.property, i - o + "px"));
      });
    }), u.each(function () {
      var e = t(this);
      e.attr("style", e.data("style-cache") || null);
    }), r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)), this;
  }, r._applyDataApi = function () {
    var e = {};
    t("[data-match-height], [data-mh]").each(function () {
      var o = t(this),
          n = o.attr("data-mh") || o.attr("data-match-height");
      n in e ? e[n] = e[n].add(o) : e[n] = o;
    }), t.each(e, function () {
      this.matchHeight(!0);
    });
  };

  var s = function s(e) {
    r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function () {
      r._apply(this.elements, this.options);
    }), r._afterUpdate && r._afterUpdate(e, r._groups);
  };

  r._update = function (n, a) {
    if (a && "resize" === a.type) {
      var i = t(window).width();
      if (i === e) return;
      e = i;
    }

    n ? o === -1 && (o = setTimeout(function () {
      s(a), o = -1;
    }, r._throttle)) : s(a);
  }, t(r._applyDataApi);
  var h = t.fn.on ? "on" : "bind";
  t(window)[h]("load", function (t) {
    r._update(!1, t);
  }), t(window)[h]("resize orientationchange", function (t) {
    r._update(!0, t);
  });
});
"use strict";

!function (t) {
  t.fn.twentytwenty = function (e) {
    e = t.extend({
      default_offset_pct: .5,
      orientation: "horizontal",
      before_label: "Before",
      after_label: "After",
      no_overlay: !1,
      move_slider_on_hover: !1,
      move_with_handle_only: !0,
      click_to_move: !1
    }, e);
    return this.each(function () {
      var n = e.default_offset_pct,
          i = t(this),
          a = e.orientation;

      if (i.wrap("<div class='twentytwenty-wrapper twentytwenty-" + a + "'></div>"), !e.no_overlay) {
        i.append("<div class='twentytwenty-overlay'></div>");
        var o = i.find(".twentytwenty-overlay");
        o.append("<div class='twentytwenty-before-label' data-content='" + e.before_label + "'></div>"), o.append("<div class='twentytwenty-after-label' data-content='" + e.after_label + "'></div>");
      }

      var s = i.find("img:first"),
          r = i.find("img:last");
      i.append("<div class='twentytwenty-handle'></div>");
      var d = i.find(".twentytwenty-handle");
      d.append("<div class='twentytwenty-handle__wrapper'></div>"), d.append("<i class='material-icons'>keyboard_arrow_left</i>"), d.append("<i class='material-icons'>keyboard_arrow_right</i>"), i.addClass("twentytwenty-container"), s.addClass("twentytwenty-before"), r.addClass("twentytwenty-after");

      var l = function l(t) {
        var e,
            n,
            o,
            l,
            c = (e = t, n = s.width(), o = s.height(), {
          w: n + "px",
          h: o + "px",
          cw: e * n + "px",
          ch: e * o + "px"
        });
        d.css("vertical" === a ? "top" : "left", "vertical" === a ? c.ch : c.cw), l = c, "vertical" === a ? (s.css("clip", "rect(0," + l.w + "," + l.ch + ",0)"), r.css("clip", "rect(" + l.ch + "," + l.w + "," + l.h + ",0)")) : (s.css("clip", "rect(0," + l.cw + "," + l.h + ",0)"), r.css("clip", "rect(0," + l.w + "," + l.h + "," + l.cw + ")")), i.css("height", l.h);
      },
          c = function c(t, e) {
        var n, i, o;
        return n = "vertical" === a ? (e - f) / p : (t - w) / v, i = 0, o = 1, Math.max(i, Math.min(o, n));
      };

      t(window).on("resize.twentytwenty", function (t) {
        l(n);
      });

      var w = 0,
          f = 0,
          v = 0,
          p = 0,
          y = function y(t) {
        (t.distX > t.distY && t.distX < -t.distY || t.distX < t.distY && t.distX > -t.distY) && "vertical" !== a ? t.preventDefault() : (t.distX < t.distY && t.distX < -t.distY || t.distX > t.distY && t.distX > -t.distY) && "vertical" === a && t.preventDefault(), i.addClass("active"), w = i.offset().left, f = i.offset().top, v = s.width(), p = s.height();
      },
          h = function h(t) {
        i.hasClass("active") && (n = c(t.pageX, t.pageY), l(n));
      },
          _ = function _() {
        i.removeClass("active");
      },
          u = e.move_with_handle_only ? d : i;

      u.on("movestart", y), u.on("move", h), u.on("moveend", _), e.move_slider_on_hover && (i.on("mouseenter", y), i.on("mousemove", h), i.on("mouseleave", _)), d.on("touchmove", function (t) {
        t.preventDefault();
      }), i.find("img").on("mousedown", function (t) {
        t.preventDefault();
      }), e.click_to_move && i.on("click", function (t) {
        w = i.offset().left, f = i.offset().top, v = s.width(), p = s.height(), n = c(t.pageX, t.pageY), l(n);
      }), t(window).trigger("resize.twentytwenty");
    });
  };
}(jQuery);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function (a, b, c, d) {
  function e(b, c) {
    this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: {
        start: null,
        current: null
      },
      direction: null
    }, this._states = {
      current: {},
      tags: {
        initializing: ["busy"],
        animating: ["busy"],
        dragging: ["interacting"]
      }
    }, a.each(["onResize", "onThrottledResize"], a.proxy(function (b, c) {
      this._handlers[c] = a.proxy(this[c], this);
    }, this)), a.each(e.Plugins, a.proxy(function (a, b) {
      this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
    }, this)), a.each(e.Workers, a.proxy(function (b, c) {
      this._pipe.push({
        filter: c.filter,
        run: a.proxy(c.run, this)
      });
    }, this)), this.setup(), this.initialize();
  }

  e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    checkVisibility: !0,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    slideTransition: "",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab"
  }, e.Width = {
    Default: "default",
    Inner: "inner",
    Outer: "outer"
  }, e.Type = {
    Event: "event",
    State: "state"
  }, e.Plugins = {}, e.Workers = [{
    filter: ["width", "settings"],
    run: function run() {
      this._width = this.$element.width();
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run(a) {
      a.current = this._items && this._items[this.relative(this._current)];
    }
  }, {
    filter: ["items", "settings"],
    run: function run() {
      this.$stage.children(".cloned").remove();
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run(a) {
      var b = this.settings.margin || "",
          c = !this.settings.autoWidth,
          d = this.settings.rtl,
          e = {
        width: "auto",
        "margin-left": d ? b : "",
        "margin-right": d ? "" : b
      };
      !c && this.$stage.children().css(e), a.css = e;
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run(a) {
      var b = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
          c = null,
          d = this._items.length,
          e = !this.settings.autoWidth,
          f = [];

      for (a.items = {
        merge: !1,
        width: b
      }; d--;) {
        c = this._mergers[d], c = this.settings.mergeFit && Math.min(c, this.settings.items) || c, a.items.merge = c > 1 || a.items.merge, f[d] = e ? b * c : this._items[d].width();
      }

      this._widths = f;
    }
  }, {
    filter: ["items", "settings"],
    run: function run() {
      var b = [],
          c = this._items,
          d = this.settings,
          e = Math.max(2 * d.items, 4),
          f = 2 * Math.ceil(c.length / 2),
          g = d.loop && c.length ? d.rewind ? e : Math.max(e, f) : 0,
          h = "",
          i = "";

      for (g /= 2; g > 0;) {
        b.push(this.normalize(b.length / 2, !0)), h += c[b[b.length - 1]][0].outerHTML, b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)), i = c[b[b.length - 1]][0].outerHTML + i, g -= 1;
      }

      this._clones = b, a(h).addClass("cloned").appendTo(this.$stage), a(i).addClass("cloned").prependTo(this.$stage);
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run() {
      for (var a = this.settings.rtl ? 1 : -1, b = this._clones.length + this._items.length, c = -1, d = 0, e = 0, f = []; ++c < b;) {
        d = f[c - 1] || 0, e = this._widths[this.relative(c)] + this.settings.margin, f.push(d + e * a);
      }

      this._coordinates = f;
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run() {
      var a = this.settings.stagePadding,
          b = this._coordinates,
          c = {
        width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
        "padding-left": a || "",
        "padding-right": a || ""
      };
      this.$stage.css(c);
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run(a) {
      var b = this._coordinates.length,
          c = !this.settings.autoWidth,
          d = this.$stage.children();
      if (c && a.items.merge) for (; b--;) {
        a.css.width = this._widths[this.relative(b)], d.eq(b).css(a.css);
      } else c && (a.css.width = a.items.width, d.css(a.css));
    }
  }, {
    filter: ["items"],
    run: function run() {
      this._coordinates.length < 1 && this.$stage.removeAttr("style");
    }
  }, {
    filter: ["width", "items", "settings"],
    run: function run(a) {
      a.current = a.current ? this.$stage.children().index(a.current) : 0, a.current = Math.max(this.minimum(), Math.min(this.maximum(), a.current)), this.reset(a.current);
    }
  }, {
    filter: ["position"],
    run: function run() {
      this.animate(this.coordinates(this._current));
    }
  }, {
    filter: ["width", "position", "items", "settings"],
    run: function run() {
      var a,
          b,
          c,
          d,
          e = this.settings.rtl ? 1 : -1,
          f = 2 * this.settings.stagePadding,
          g = this.coordinates(this.current()) + f,
          h = g + this.width() * e,
          i = [];

      for (c = 0, d = this._coordinates.length; c < d; c++) {
        a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
      }

      this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center");
    }
  }], e.prototype.initializeStage = function () {
    this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = a("<" + this.settings.stageElement + ">", {
      class: this.settings.stageClass
    }).wrap(a("<div/>", {
      class: this.settings.stageOuterClass
    })), this.$element.append(this.$stage.parent()));
  }, e.prototype.initializeItems = function () {
    var b = this.$element.find(".owl-item");
    if (b.length) return this._items = b.get().map(function (b) {
      return a(b);
    }), this._mergers = this._items.map(function () {
      return 1;
    }), void this.refresh();
    this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass);
  }, e.prototype.initialize = function () {
    if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
      var a, b, c;
      a = this.$element.find("img"), b = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, c = this.$element.children(b).width(), a.length && c <= 0 && this.preloadAutoWidthImages(a);
    }

    this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized");
  }, e.prototype.isVisible = function () {
    return !this.settings.checkVisibility || this.$element.is(":visible");
  }, e.prototype.setup = function () {
    var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
    c ? (a.each(c, function (a) {
      a <= b && a > d && (d = Number(a));
    }), e = a.extend({}, this.options, c[d]), "function" == typeof e.stagePadding && (e.stagePadding = e.stagePadding()), delete e.responsive, e.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + d))) : e = a.extend({}, this.options), this.trigger("change", {
      property: {
        name: "settings",
        value: e
      }
    }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
      property: {
        name: "settings",
        value: this.settings
      }
    });
  }, e.prototype.optionsLogic = function () {
    this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1);
  }, e.prototype.prepare = function (b) {
    var c = this.trigger("prepare", {
      content: b
    });
    return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(b)), this.trigger("prepared", {
      content: c.data
    }), c.data;
  }, e.prototype.update = function () {
    for (var b = 0, c = this._pipe.length, d = a.proxy(function (a) {
      return this[a];
    }, this._invalidated), e = {}; b < c;) {
      (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
    }

    this._invalidated = {}, !this.is("valid") && this.enter("valid");
  }, e.prototype.width = function (a) {
    switch (a = a || e.Width.Default) {
      case e.Width.Inner:
      case e.Width.Outer:
        return this._width;

      default:
        return this._width - 2 * this.settings.stagePadding + this.settings.margin;
    }
  }, e.prototype.refresh = function () {
    this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed");
  }, e.prototype.onThrottledResize = function () {
    b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
  }, e.prototype.onResize = function () {
    return !!this._items.length && this._width !== this.$element.width() && !!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")));
  }, e.prototype.registerEventHandlers = function () {
    a.support.transition && this.$stage.on(a.support.transition.end + ".owl.core", a.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(b, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
      return !1;
    })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", a.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", a.proxy(this.onDragEnd, this)));
  }, e.prototype.onDragStart = function (b) {
    var d = null;
    3 !== b.which && (a.support.transform ? (d = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), d = {
      x: d[16 === d.length ? 12 : 4],
      y: d[16 === d.length ? 13 : 5]
    }) : (d = this.$stage.position(), d = {
      x: this.settings.rtl ? d.left + this.$stage.width() - this.width() + this.settings.margin : d.left,
      y: d.top
    }), this.is("animating") && (a.support.transform ? this.animate(d.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === b.type), this.speed(0), this._drag.time = new Date().getTime(), this._drag.target = a(b.target), this._drag.stage.start = d, this._drag.stage.current = d, this._drag.pointer = this.pointer(b), a(c).on("mouseup.owl.core touchend.owl.core", a.proxy(this.onDragEnd, this)), a(c).one("mousemove.owl.core touchmove.owl.core", a.proxy(function (b) {
      var d = this.difference(this._drag.pointer, this.pointer(b));
      a(c).on("mousemove.owl.core touchmove.owl.core", a.proxy(this.onDragMove, this)), Math.abs(d.x) < Math.abs(d.y) && this.is("valid") || (b.preventDefault(), this.enter("dragging"), this.trigger("drag"));
    }, this)));
  }, e.prototype.onDragMove = function (a) {
    var b = null,
        c = null,
        d = null,
        e = this.difference(this._drag.pointer, this.pointer(a)),
        f = this.difference(this._drag.stage.start, e);
    this.is("dragging") && (a.preventDefault(), this.settings.loop ? (b = this.coordinates(this.minimum()), c = this.coordinates(this.maximum() + 1) - b, f.x = ((f.x - b) % c + c) % c + b) : (b = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), c = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), d = this.settings.pullDrag ? -1 * e.x / 5 : 0, f.x = Math.max(Math.min(f.x, b + d), c + d)), this._drag.stage.current = f, this.animate(f.x));
  }, e.prototype.onDragEnd = function (b) {
    var d = this.difference(this._drag.pointer, this.pointer(b)),
        e = this._drag.stage.current,
        f = d.x > 0 ^ this.settings.rtl ? "left" : "right";
    a(c).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== d.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = f, (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
      return !1;
    })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
  }, e.prototype.closest = function (b, c) {
    var e = -1,
        f = 30,
        g = this.width(),
        h = this.coordinates();
    return this.settings.freeDrag || a.each(h, a.proxy(function (a, i) {
      return "left" === c && b > i - f && b < i + f ? e = a : "right" === c && b > i - g - f && b < i - g + f ? e = a + 1 : this.op(b, "<", i) && this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) && (e = "left" === c ? a + 1 : a), -1 === e;
    }, this)), this.settings.loop || (this.op(b, ">", h[this.minimum()]) ? e = b = this.minimum() : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())), e;
  }, e.prototype.animate = function (b) {
    var c = this.speed() > 0;
    this.is("animating") && this.onTransitionEnd(), c && (this.enter("animating"), this.trigger("translate")), a.support.transform3d && a.support.transition ? this.$stage.css({
      transform: "translate3d(" + b + "px,0px,0px)",
      transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
    }) : c ? this.$stage.animate({
      left: b + "px"
    }, this.speed(), this.settings.fallbackEasing, a.proxy(this.onTransitionEnd, this)) : this.$stage.css({
      left: b + "px"
    });
  }, e.prototype.is = function (a) {
    return this._states.current[a] && this._states.current[a] > 0;
  }, e.prototype.current = function (a) {
    if (a === d) return this._current;
    if (0 === this._items.length) return d;

    if (a = this.normalize(a), this._current !== a) {
      var b = this.trigger("change", {
        property: {
          name: "position",
          value: a
        }
      });
      b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
        property: {
          name: "position",
          value: this._current
        }
      });
    }

    return this._current;
  }, e.prototype.invalidate = function (b) {
    return "string" === a.type(b) && (this._invalidated[b] = !0, this.is("valid") && this.leave("valid")), a.map(this._invalidated, function (a, b) {
      return b;
    });
  }, e.prototype.reset = function (a) {
    (a = this.normalize(a)) !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]));
  }, e.prototype.normalize = function (a, b) {
    var c = this._items.length,
        e = b ? 0 : this._clones.length;
    return !this.isNumeric(a) || c < 1 ? a = d : (a < 0 || a >= c + e) && (a = ((a - e / 2) % c + c) % c + e / 2), a;
  }, e.prototype.relative = function (a) {
    return a -= this._clones.length / 2, this.normalize(a, !0);
  }, e.prototype.maximum = function (a) {
    var b,
        c,
        d,
        e = this.settings,
        f = this._coordinates.length;
    if (e.loop) f = this._clones.length / 2 + this._items.length - 1;else if (e.autoWidth || e.merge) {
      if (b = this._items.length) for (c = this._items[--b].width(), d = this.$element.width(); b-- && !((c += this._items[b].width() + this.settings.margin) > d);) {
        ;
      }
      f = b + 1;
    } else f = e.center ? this._items.length - 1 : this._items.length - e.items;
    return a && (f -= this._clones.length / 2), Math.max(f, 0);
  }, e.prototype.minimum = function (a) {
    return a ? 0 : this._clones.length / 2;
  }, e.prototype.items = function (a) {
    return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a]);
  }, e.prototype.mergers = function (a) {
    return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a]);
  }, e.prototype.clones = function (b) {
    var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function f(a) {
      return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2;
    };

    return b === d ? a.map(this._clones, function (a, b) {
      return f(b);
    }) : a.map(this._clones, function (a, c) {
      return a === b ? f(c) : null;
    });
  }, e.prototype.speed = function (a) {
    return a !== d && (this._speed = a), this._speed;
  }, e.prototype.coordinates = function (b) {
    var c,
        e = 1,
        f = b - 1;
    return b === d ? a.map(this._coordinates, a.proxy(function (a, b) {
      return this.coordinates(b);
    }, this)) : (this.settings.center ? (this.settings.rtl && (e = -1, f = b + 1), c = this._coordinates[b], c += (this.width() - c + (this._coordinates[f] || 0)) / 2 * e) : c = this._coordinates[f] || 0, c = Math.ceil(c));
  }, e.prototype.duration = function (a, b, c) {
    return 0 === c ? 0 : Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed);
  }, e.prototype.to = function (a, b) {
    var c = this.current(),
        d = null,
        e = a - this.relative(c),
        f = (e > 0) - (e < 0),
        g = this._items.length,
        h = this.minimum(),
        i = this.maximum();
    this.settings.loop ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g), a = c + e, (d = ((a - h) % g + g) % g + h) !== a && d - e <= i && d - e > 0 && (c = d - e, a = d, this.reset(c))) : this.settings.rewind ? (i += 1, a = (a % i + i) % i) : a = Math.max(h, Math.min(i, a)), this.speed(this.duration(c, a, b)), this.current(a), this.isVisible() && this.update();
  }, e.prototype.next = function (a) {
    a = a || !1, this.to(this.relative(this.current()) + 1, a);
  }, e.prototype.prev = function (a) {
    a = a || !1, this.to(this.relative(this.current()) - 1, a);
  }, e.prototype.onTransitionEnd = function (a) {
    if (a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))) return !1;
    this.leave("animating"), this.trigger("translated");
  }, e.prototype.viewport = function () {
    var d;
    return this.options.responsiveBaseElement !== b ? d = a(this.options.responsiveBaseElement).width() : b.innerWidth ? d = b.innerWidth : c.documentElement && c.documentElement.clientWidth ? d = c.documentElement.clientWidth : console.warn("Can not detect viewport width."), d;
  }, e.prototype.replace = function (b) {
    this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function () {
      return 1 === this.nodeType;
    }).each(a.proxy(function (a, b) {
      b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
    }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items");
  }, e.prototype.add = function (b, c) {
    var e = this.relative(this._current);
    c = c === d ? this._items.length : this.normalize(c, !0), b = b instanceof jQuery ? b : a(b), this.trigger("add", {
      content: b,
      position: c
    }), b = this.prepare(b), 0 === this._items.length || c === this._items.length ? (0 === this._items.length && this.$stage.append(b), 0 !== this._items.length && this._items[c - 1].after(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b), this._items.splice(c, 0, b), this._mergers.splice(c, 0, 1 * b.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[e] && this.reset(this._items[e].index()), this.invalidate("items"), this.trigger("added", {
      content: b,
      position: c
    });
  }, e.prototype.remove = function (a) {
    (a = this.normalize(a, !0)) !== d && (this.trigger("remove", {
      content: this._items[a],
      position: a
    }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
      content: null,
      position: a
    }));
  }, e.prototype.preloadAutoWidthImages = function (b) {
    b.each(a.proxy(function (b, c) {
      this.enter("pre-loading"), c = a(c), a(new Image()).one("load", a.proxy(function (a) {
        c.attr("src", a.target.src), c.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh();
      }, this)).attr("src", c.attr("src") || c.attr("data-src") || c.attr("data-src-retina"));
    }, this));
  }, e.prototype.destroy = function () {
    this.$element.off(".owl.core"), this.$stage.off(".owl.core"), a(c).off(".owl.core"), !1 !== this.settings.responsive && (b.clearTimeout(this.resizeTimer), this.off(b, "resize", this._handlers.onThrottledResize));

    for (var d in this._plugins) {
      this._plugins[d].destroy();
    }

    this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel");
  }, e.prototype.op = function (a, b, c) {
    var d = this.settings.rtl;

    switch (b) {
      case "<":
        return d ? a > c : a < c;

      case ">":
        return d ? a < c : a > c;

      case ">=":
        return d ? a <= c : a >= c;

      case "<=":
        return d ? a >= c : a <= c;
    }
  }, e.prototype.on = function (a, b, c, d) {
    a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c);
  }, e.prototype.off = function (a, b, c, d) {
    a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c);
  }, e.prototype.trigger = function (b, c, d, f, g) {
    var h = {
      item: {
        count: this._items.length,
        index: this.current()
      }
    },
        i = a.camelCase(a.grep(["on", b, d], function (a) {
      return a;
    }).join("-").toLowerCase()),
        j = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
      relatedTarget: this
    }, h, c));
    return this._supress[b] || (a.each(this._plugins, function (a, b) {
      b.onTrigger && b.onTrigger(j);
    }), this.register({
      type: e.Type.Event,
      name: b
    }), this.$element.trigger(j), this.settings && "function" == typeof this.settings[i] && this.settings[i].call(this, j)), j;
  }, e.prototype.enter = function (b) {
    a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
      this._states.current[b] === d && (this._states.current[b] = 0), this._states.current[b]++;
    }, this));
  }, e.prototype.leave = function (b) {
    a.each([b].concat(this._states.tags[b] || []), a.proxy(function (a, b) {
      this._states.current[b]--;
    }, this));
  }, e.prototype.register = function (b) {
    if (b.type === e.Type.Event) {
      if (a.event.special[b.name] || (a.event.special[b.name] = {}), !a.event.special[b.name].owl) {
        var c = a.event.special[b.name]._default;
        a.event.special[b.name]._default = function (a) {
          return !c || !c.apply || a.namespace && -1 !== a.namespace.indexOf("owl") ? a.namespace && a.namespace.indexOf("owl") > -1 : c.apply(this, arguments);
        }, a.event.special[b.name].owl = !0;
      }
    } else b.type === e.Type.State && (this._states.tags[b.name] ? this._states.tags[b.name] = this._states.tags[b.name].concat(b.tags) : this._states.tags[b.name] = b.tags, this._states.tags[b.name] = a.grep(this._states.tags[b.name], a.proxy(function (c, d) {
      return a.inArray(c, this._states.tags[b.name]) === d;
    }, this)));
  }, e.prototype.suppress = function (b) {
    a.each(b, a.proxy(function (a, b) {
      this._supress[b] = !0;
    }, this));
  }, e.prototype.release = function (b) {
    a.each(b, a.proxy(function (a, b) {
      delete this._supress[b];
    }, this));
  }, e.prototype.pointer = function (a) {
    var c = {
      x: null,
      y: null
    };
    return a = a.originalEvent || a || b.event, a = a.touches && a.touches.length ? a.touches[0] : a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : a, a.pageX ? (c.x = a.pageX, c.y = a.pageY) : (c.x = a.clientX, c.y = a.clientY), c;
  }, e.prototype.isNumeric = function (a) {
    return !isNaN(parseFloat(a));
  }, e.prototype.difference = function (a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y
    };
  }, a.fn.owlCarousel = function (b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var d = a(this),
          f = d.data("owl.carousel");
      f || (f = new e(this, "object" == _typeof(b) && b), d.data("owl.carousel", f), a.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (b, c) {
        f.register({
          type: e.Type.Event,
          name: c
        }), f.$element.on(c + ".owl.carousel.core", a.proxy(function (a) {
          a.namespace && a.relatedTarget !== this && (this.suppress([c]), f[c].apply(this, [].slice.call(arguments, 1)), this.release([c]));
        }, f));
      })), "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
    });
  }, a.fn.owlCarousel.Constructor = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function e(b) {
    this._core = b, this._interval = null, this._visible = null, this._handlers = {
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoRefresh && this.watch();
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers);
  };

  e.Defaults = {
    autoRefresh: !0,
    autoRefreshInterval: 500
  }, e.prototype.watch = function () {
    this._interval || (this._visible = this._core.isVisible(), this._interval = b.setInterval(a.proxy(this.refresh, this), this._core.settings.autoRefreshInterval));
  }, e.prototype.refresh = function () {
    this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
  }, e.prototype.destroy = function () {
    var a, c;
    b.clearInterval(this._interval);

    for (a in this._handlers) {
      this._core.$element.off(a, this._handlers[a]);
    }

    for (c in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[c] && (this[c] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function e(b) {
    this._core = b, this._loaded = [], this._handlers = {
      "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(function (b) {
        if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
          var c = this._core.settings,
              e = c.center && Math.ceil(c.items / 2) || c.items,
              f = c.center && -1 * e || 0,
              g = (b.property && b.property.value !== d ? b.property.value : this._core.current()) + f,
              h = this._core.clones().length,
              i = a.proxy(function (a, b) {
            this.load(b);
          }, this);

          for (c.lazyLoadEager > 0 && (e += c.lazyLoadEager, c.loop && (g -= c.lazyLoadEager, e++)); f++ < e;) {
            this.load(h / 2 + this._core.relative(g)), h && a.each(this._core.clones(this._core.relative(g)), i), g++;
          }
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers);
  };

  e.Defaults = {
    lazyLoad: !1,
    lazyLoadEager: 0
  }, e.prototype.load = function (c) {
    var d = this._core.$stage.children().eq(c),
        e = d && d.find(".owl-lazy");

    !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function (c, d) {
      var e,
          f = a(d),
          g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src") || f.attr("data-srcset");
      this._core.trigger("load", {
        element: f,
        url: g
      }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function () {
        f.css("opacity", 1), this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy");
      }, this)).attr("src", g) : f.is("source") ? f.one("load.owl.lazy", a.proxy(function () {
        this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy");
      }, this)).attr("srcset", g) : (e = new Image(), e.onload = a.proxy(function () {
        f.css({
          "background-image": 'url("' + g + '")',
          opacity: "1"
        }), this._core.trigger("loaded", {
          element: f,
          url: g
        }, "lazy");
      }, this), e.src = g);
    }, this)), this._loaded.push(d.get(0)));
  }, e.prototype.destroy = function () {
    var a, b;

    for (a in this.handlers) {
      this._core.$element.off(a, this.handlers[a]);
    }

    for (b in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[b] && (this[b] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.Lazy = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function e(c) {
    this._core = c, this._previousHeight = null, this._handlers = {
      "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoHeight && this.update();
      }, this),
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoHeight && "position" === a.property.name && this.update();
      }, this),
      "loaded.owl.lazy": a.proxy(function (a) {
        a.namespace && this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
    var d = this;
    a(b).on("load", function () {
      d._core.settings.autoHeight && d.update();
    }), a(b).resize(function () {
      d._core.settings.autoHeight && (null != d._intervalId && clearTimeout(d._intervalId), d._intervalId = setTimeout(function () {
        d.update();
      }, 250));
    });
  };

  e.Defaults = {
    autoHeight: !1,
    autoHeightClass: "owl-height"
  }, e.prototype.update = function () {
    var b = this._core._current,
        c = b + this._core.settings.items,
        d = this._core.settings.lazyLoad,
        e = this._core.$stage.children().toArray().slice(b, c),
        f = [],
        g = 0;

    a.each(e, function (b, c) {
      f.push(a(c).height());
    }), g = Math.max.apply(null, f), g <= 1 && d && this._previousHeight && (g = this._previousHeight), this._previousHeight = g, this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass);
  }, e.prototype.destroy = function () {
    var a, b;

    for (a in this._handlers) {
      this._core.$element.off(a, this._handlers[a]);
    }

    for (b in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[b] && (this[b] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function e(b) {
    this._core = b, this._videos = {}, this._playing = null, this._handlers = {
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.register({
          type: "state",
          name: "playing",
          tags: ["interacting"]
        });
      }, this),
      "resize.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.video && this.isInFullScreen() && a.preventDefault();
      }, this),
      "refreshed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
      }, this),
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && "position" === a.property.name && this._playing && this.stop();
      }, this),
      "prepared.owl.carousel": a.proxy(function (b) {
        if (b.namespace) {
          var c = a(b.content).find(".owl-video");
          c.length && (c.css("display", "none"), this.fetch(c, a(b.content)));
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function (a) {
      this.play(a);
    }, this));
  };

  e.Defaults = {
    video: !1,
    videoHeight: !1,
    videoWidth: !1
  }, e.prototype.fetch = function (a, b) {
    var c = function () {
      return a.attr("data-vimeo-id") ? "vimeo" : a.attr("data-vzaar-id") ? "vzaar" : "youtube";
    }(),
        d = a.attr("data-vimeo-id") || a.attr("data-youtube-id") || a.attr("data-vzaar-id"),
        e = a.attr("data-width") || this._core.settings.videoWidth,
        f = a.attr("data-height") || this._core.settings.videoHeight,
        g = a.attr("href");

    if (!g) throw new Error("Missing video URL.");
    if (d = g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";else if (d[3].indexOf("vimeo") > -1) c = "vimeo";else {
      if (!(d[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
      c = "vzaar";
    }
    d = d[6], this._videos[g] = {
      type: c,
      id: d,
      width: e,
      height: f
    }, b.attr("data-video", g), this.thumbnail(a, this._videos[g]);
  }, e.prototype.thumbnail = function (b, c) {
    var d,
        e,
        f,
        g = c.width && c.height ? "width:" + c.width + "px;height:" + c.height + "px;" : "",
        h = b.find("img"),
        i = "src",
        j = "",
        k = this._core.settings,
        l = function l(c) {
      e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? a("<div/>", {
        class: "owl-video-tn " + j,
        srcType: c
      }) : a("<div/>", {
        class: "owl-video-tn",
        style: "opacity:1;background-image:url(" + c + ")"
      }), b.after(d), b.after(e);
    };

    if (b.wrap(a("<div/>", {
      class: "owl-video-wrapper",
      style: g
    })), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length) return l(h.attr(i)), h.remove(), !1;
    "youtube" === c.type ? (f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type ? a.ajax({
      type: "GET",
      url: "//vimeo.com/api/v2/video/" + c.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function success(a) {
        f = a[0].thumbnail_large, l(f);
      }
    }) : "vzaar" === c.type && a.ajax({
      type: "GET",
      url: "//vzaar.com/api/videos/" + c.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function success(a) {
        f = a.framegrab_url, l(f);
      }
    });
  }, e.prototype.stop = function () {
    this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video");
  }, e.prototype.play = function (b) {
    var c,
        d = a(b.target),
        e = d.closest("." + this._core.settings.itemClass),
        f = this._videos[e.attr("data-video")],
        g = f.width || "100%",
        h = f.height || this._core.$stage.height();

    this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), e = this._core.items(this._core.relative(e.index())), this._core.reset(e.index()), c = a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'), c.attr("height", h), c.attr("width", g), "youtube" === f.type ? c.attr("src", "//www.youtube.com/embed/" + f.id + "?autoplay=1&rel=0&v=" + f.id) : "vimeo" === f.type ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1") : "vzaar" === f.type && c.attr("src", "//view.vzaar.com/" + f.id + "/player?autoplay=true"), a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")), this._playing = e.addClass("owl-video-playing"));
  }, e.prototype.isInFullScreen = function () {
    var b = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
    return b && a(b).parent().hasClass("owl-video-frame");
  }, e.prototype.destroy = function () {
    var a, b;

    this._core.$element.off("click.owl.video");

    for (a in this._handlers) {
      this._core.$element.off(a, this._handlers[a]);
    }

    for (b in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[b] && (this[b] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.Video = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function e(b) {
    this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
      "change.owl.carousel": a.proxy(function (a) {
        a.namespace && "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value);
      }, this),
      "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function (a) {
        a.namespace && (this.swapping = "translated" == a.type);
      }, this),
      "translate.owl.carousel": a.proxy(function (a) {
        a.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
      }, this)
    }, this.core.$element.on(this.handlers);
  };

  e.Defaults = {
    animateOut: !1,
    animateIn: !1
  }, e.prototype.swap = function () {
    if (1 === this.core.settings.items && a.support.animation && a.support.transition) {
      this.core.speed(0);
      var b,
          c = a.proxy(this.clear, this),
          d = this.core.$stage.children().eq(this.previous),
          e = this.core.$stage.children().eq(this.next),
          f = this.core.settings.animateIn,
          g = this.core.settings.animateOut;
      this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.one(a.support.animation.end, c).css({
        left: b + "px"
      }).addClass("animated owl-animated-out").addClass(g)), f && e.one(a.support.animation.end, c).addClass("animated owl-animated-in").addClass(f));
    }
  }, e.prototype.clear = function (b) {
    a(b.target).css({
      left: ""
    }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd();
  }, e.prototype.destroy = function () {
    var a, b;

    for (a in this.handlers) {
      this.core.$element.off(a, this.handlers[a]);
    }

    for (b in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[b] && (this[b] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.Animate = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  var e = function e(b) {
    this._core = b, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && "settings" === a.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : a.namespace && "position" === a.property.name && this._paused && (this._time = 0);
      }, this),
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.autoplay && this.play();
      }, this),
      "play.owl.autoplay": a.proxy(function (a, b, c) {
        a.namespace && this.play(b, c);
      }, this),
      "stop.owl.autoplay": a.proxy(function (a) {
        a.namespace && this.stop();
      }, this),
      "mouseover.owl.autoplay": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
      }, this),
      "mouseleave.owl.autoplay": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
      }, this),
      "touchstart.owl.core": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
      }, this),
      "touchend.owl.core": a.proxy(function () {
        this._core.settings.autoplayHoverPause && this.play();
      }, this)
    }, this._core.$element.on(this._handlers), this._core.options = a.extend({}, e.Defaults, this._core.options);
  };

  e.Defaults = {
    autoplay: !1,
    autoplayTimeout: 5e3,
    autoplayHoverPause: !1,
    autoplaySpeed: !1
  }, e.prototype._next = function (d) {
    this._call = b.setTimeout(a.proxy(this._next, this, d), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || c.hidden || this._core.next(d || this._core.settings.autoplaySpeed);
  }, e.prototype.read = function () {
    return new Date().getTime() - this._time;
  }, e.prototype.play = function (c, d) {
    var e;
    this._core.is("rotating") || this._core.enter("rotating"), c = c || this._core.settings.autoplayTimeout, e = Math.min(this._time % (this._timeout || c), c), this._paused ? (this._time = this.read(), this._paused = !1) : b.clearTimeout(this._call), this._time += this.read() % c - e, this._timeout = c, this._call = b.setTimeout(a.proxy(this._next, this, d), c - e);
  }, e.prototype.stop = function () {
    this._core.is("rotating") && (this._time = 0, this._paused = !0, b.clearTimeout(this._call), this._core.leave("rotating"));
  }, e.prototype.pause = function () {
    this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, b.clearTimeout(this._call));
  }, e.prototype.destroy = function () {
    var a, b;
    this.stop();

    for (a in this._handlers) {
      this._core.$element.off(a, this._handlers[a]);
    }

    for (b in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[b] && (this[b] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.autoplay = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  "use strict";

  var e = function e(b) {
    this._core = b, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
    }, this._handlers = {
      "prepared.owl.carousel": a.proxy(function (b) {
        b.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
      }, this),
      "added.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 0, this._templates.pop());
      }, this),
      "remove.owl.carousel": a.proxy(function (a) {
        a.namespace && this._core.settings.dotsData && this._templates.splice(a.position, 1);
      }, this),
      "changed.owl.carousel": a.proxy(function (a) {
        a.namespace && "position" == a.property.name && this.draw();
      }, this),
      "initialized.owl.carousel": a.proxy(function (a) {
        a.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"));
      }, this),
      "refreshed.owl.carousel": a.proxy(function (a) {
        a.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers);
  };

  e.Defaults = {
    nav: !1,
    navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
    navSpeed: !1,
    navElement: 'button type="button" role="presentation"',
    navContainer: !1,
    navContainerClass: "owl-nav",
    navClass: ["owl-prev", "owl-next"],
    slideBy: 1,
    dotClass: "owl-dot",
    dotsClass: "owl-dots",
    dots: !0,
    dotsEach: !1,
    dotsData: !1,
    dotsSpeed: !1,
    dotsContainer: !1
  }, e.prototype.initialize = function () {
    var b,
        c = this._core.settings;
    this._controls.$relative = (c.navContainer ? a(c.navContainer) : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = a("<" + c.navElement + ">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click", a.proxy(function (a) {
      this.prev(c.navSpeed);
    }, this)), this._controls.$next = a("<" + c.navElement + ">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click", a.proxy(function (a) {
      this.next(c.navSpeed);
    }, this)), c.dotsData || (this._templates = [a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]), this._controls.$absolute = (c.dotsContainer ? a(c.dotsContainer) : a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", a.proxy(function (b) {
      var d = a(b.target).parent().is(this._controls.$absolute) ? a(b.target).index() : a(b.target).parent().index();
      b.preventDefault(), this.to(d, c.dotsSpeed);
    }, this));

    for (b in this._overrides) {
      this._core[b] = a.proxy(this[b], this);
    }
  }, e.prototype.destroy = function () {
    var a, b, c, d, e;
    e = this._core.settings;

    for (a in this._handlers) {
      this.$element.off(a, this._handlers[a]);
    }

    for (b in this._controls) {
      "$relative" === b && e.navContainer ? this._controls[b].html("") : this._controls[b].remove();
    }

    for (d in this.overides) {
      this._core[d] = this._overrides[d];
    }

    for (c in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[c] && (this[c] = null);
    }
  }, e.prototype.update = function () {
    var a,
        b,
        c,
        d = this._core.clones().length / 2,
        e = d + this._core.items().length,
        f = this._core.maximum(!0),
        g = this._core.settings,
        h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;

    if ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)), g.dots || "page" == g.slideBy) for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
      if (b >= h || 0 === b) {
        if (this._pages.push({
          start: Math.min(f, a - d),
          end: a - d + h - 1
        }), Math.min(f, a - d) === f) break;
        b = 0, ++c;
      }

      b += this._core.mergers(this._core.relative(a));
    }
  }, e.prototype.draw = function () {
    var b,
        c = this._core.settings,
        d = this._core.items().length <= c.items,
        e = this._core.relative(this._core.current()),
        f = c.loop || c.rewind;

    this._controls.$relative.toggleClass("disabled", !c.nav || d), c.nav && (this._controls.$previous.toggleClass("disabled", !f && e <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !f && e >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !c.dots || d), c.dots && (b = this._pages.length - this._controls.$absolute.children().length, c.dotsData && 0 !== b ? this._controls.$absolute.html(this._templates.join("")) : b > 0 ? this._controls.$absolute.append(new Array(b + 1).join(this._templates[0])) : b < 0 && this._controls.$absolute.children().slice(b).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(a.inArray(this.current(), this._pages)).addClass("active"));
  }, e.prototype.onTrigger = function (b) {
    var c = this._core.settings;
    b.page = {
      index: a.inArray(this.current(), this._pages),
      count: this._pages.length,
      size: c && (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items)
    };
  }, e.prototype.current = function () {
    var b = this._core.relative(this._core.current());

    return a.grep(this._pages, a.proxy(function (a, c) {
      return a.start <= b && a.end >= b;
    }, this)).pop();
  }, e.prototype.getPosition = function (b) {
    var c,
        d,
        e = this._core.settings;
    return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c;
  }, e.prototype.next = function (b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
  }, e.prototype.prev = function (b) {
    a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
  }, e.prototype.to = function (b, c, d) {
    var e;
    !d && this._pages.length ? (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c)) : a.proxy(this._overrides.to, this._core)(b, c);
  }, a.fn.owlCarousel.Constructor.Plugins.Navigation = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  "use strict";

  var e = function e(c) {
    this._core = c, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
      "initialized.owl.carousel": a.proxy(function (c) {
        c.namespace && "URLHash" === this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation");
      }, this),
      "prepared.owl.carousel": a.proxy(function (b) {
        if (b.namespace) {
          var c = a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
          if (!c) return;
          this._hashes[c] = b.content;
        }
      }, this),
      "changed.owl.carousel": a.proxy(function (c) {
        if (c.namespace && "position" === c.property.name) {
          var d = this._core.items(this._core.relative(this._core.current())),
              e = a.map(this._hashes, function (a, b) {
            return a === d ? b : null;
          }).join();

          if (!e || b.location.hash.slice(1) === e) return;
          b.location.hash = e;
        }
      }, this)
    }, this._core.options = a.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function (a) {
      var c = b.location.hash.substring(1),
          e = this._core.$stage.children(),
          f = this._hashes[c] && e.index(this._hashes[c]);

      f !== d && f !== this._core.current() && this._core.to(this._core.relative(f), !1, !0);
    }, this));
  };

  e.Defaults = {
    URLhashListener: !1
  }, e.prototype.destroy = function () {
    var c, d;
    a(b).off("hashchange.owl.navigation");

    for (c in this._handlers) {
      this._core.$element.off(c, this._handlers[c]);
    }

    for (d in Object.getOwnPropertyNames(this)) {
      "function" != typeof this[d] && (this[d] = null);
    }
  }, a.fn.owlCarousel.Constructor.Plugins.Hash = e;
}(window.Zepto || window.jQuery, window, document), function (a, b, c, d) {
  function e(b, c) {
    var e = !1,
        f = b.charAt(0).toUpperCase() + b.slice(1);
    return a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
      if (g[b] !== d) return e = !c || b, !1;
    }), e;
  }

  function f(a) {
    return e(a, !0);
  }

  var g = a("<support>").get(0).style,
      h = "Webkit Moz O ms".split(" "),
      i = {
    transition: {
      end: {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        transition: "transitionend"
      }
    },
    animation: {
      end: {
        WebkitAnimation: "webkitAnimationEnd",
        MozAnimation: "animationend",
        OAnimation: "oAnimationEnd",
        animation: "animationend"
      }
    }
  },
      j = {
    csstransforms: function csstransforms() {
      return !!e("transform");
    },
    csstransforms3d: function csstransforms3d() {
      return !!e("perspective");
    },
    csstransitions: function csstransitions() {
      return !!e("transition");
    },
    cssanimations: function cssanimations() {
      return !!e("animation");
    }
  };
  j.csstransitions() && (a.support.transition = new String(f("transition")), a.support.transition.end = i.transition.end[a.support.transition]), j.cssanimations() && (a.support.animation = new String(f("animation")), a.support.animation.end = i.animation.end[a.support.animation]), j.csstransforms() && (a.support.transform = new String(f("transform")), a.support.transform3d = j.csstransforms3d());
}(window.Zepto || window.jQuery, window, document);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module) module.exports = t();else if ("function" == typeof define && define.amd) define([], t);else {
    ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Parallax = t();
  }
}(function () {
  return function t(e, i, n) {
    function o(r, a) {
      if (!i[r]) {
        if (!e[r]) {
          var l = "function" == typeof require && require;
          if (!a && l) return l(r, !0);
          if (s) return s(r, !0);
          var h = new Error("Cannot find module '" + r + "'");
          throw h.code = "MODULE_NOT_FOUND", h;
        }

        var u = i[r] = {
          exports: {}
        };
        e[r][0].call(u.exports, function (t) {
          var i = e[r][1][t];
          return o(i || t);
        }, u, u.exports, t, e, i, n);
      }

      return i[r].exports;
    }

    for (var s = "function" == typeof require && require, r = 0; r < n.length; r++) {
      o(n[r]);
    }

    return o;
  }({
    1: [function (t, e, i) {
      "use strict";

      function n(t) {
        if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(t);
      }

      var o = Object.getOwnPropertySymbols,
          s = Object.prototype.hasOwnProperty,
          r = Object.prototype.propertyIsEnumerable;
      e.exports = function () {
        try {
          if (!Object.assign) return !1;
          var t = new String("abc");
          if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;

          for (var e = {}, i = 0; i < 10; i++) {
            e["_" + String.fromCharCode(i)] = i;
          }

          if ("0123456789" !== Object.getOwnPropertyNames(e).map(function (t) {
            return e[t];
          }).join("")) return !1;
          var n = {};
          return "abcdefghijklmnopqrst".split("").forEach(function (t) {
            n[t] = t;
          }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("");
        } catch (t) {
          return !1;
        }
      }() ? Object.assign : function (t, e) {
        for (var i, a, l = n(t), h = 1; h < arguments.length; h++) {
          i = Object(arguments[h]);

          for (var u in i) {
            s.call(i, u) && (l[u] = i[u]);
          }

          if (o) {
            a = o(i);

            for (var c = 0; c < a.length; c++) {
              r.call(i, a[c]) && (l[a[c]] = i[a[c]]);
            }
          }
        }

        return l;
      };
    }, {}],
    2: [function (t, e, i) {
      (function (t) {
        (function () {
          var i, n, o, s, r, a;
          "undefined" != typeof performance && null !== performance && performance.now ? e.exports = function () {
            return performance.now();
          } : void 0 !== t && null !== t && t.hrtime ? (e.exports = function () {
            return (i() - r) / 1e6;
          }, n = t.hrtime, s = (i = function i() {
            var t;
            return 1e9 * (t = n())[0] + t[1];
          })(), a = 1e9 * t.uptime(), r = s - a) : Date.now ? (e.exports = function () {
            return Date.now() - o;
          }, o = Date.now()) : (e.exports = function () {
            return new Date().getTime() - o;
          }, o = new Date().getTime());
        }).call(this);
      }).call(this, t("_process"));
    }, {
      _process: 3
    }],
    3: [function (t, e, i) {
      function n() {
        throw new Error("setTimeout has not been defined");
      }

      function o() {
        throw new Error("clearTimeout has not been defined");
      }

      function s(t) {
        if (c === setTimeout) return setTimeout(t, 0);
        if ((c === n || !c) && setTimeout) return c = setTimeout, setTimeout(t, 0);

        try {
          return c(t, 0);
        } catch (e) {
          try {
            return c.call(null, t, 0);
          } catch (e) {
            return c.call(this, t, 0);
          }
        }
      }

      function r(t) {
        if (d === clearTimeout) return clearTimeout(t);
        if ((d === o || !d) && clearTimeout) return d = clearTimeout, clearTimeout(t);

        try {
          return d(t);
        } catch (e) {
          try {
            return d.call(null, t);
          } catch (e) {
            return d.call(this, t);
          }
        }
      }

      function a() {
        v && p && (v = !1, p.length ? f = p.concat(f) : y = -1, f.length && l());
      }

      function l() {
        if (!v) {
          var t = s(a);
          v = !0;

          for (var e = f.length; e;) {
            for (p = f, f = []; ++y < e;) {
              p && p[y].run();
            }

            y = -1, e = f.length;
          }

          p = null, v = !1, r(t);
        }
      }

      function h(t, e) {
        this.fun = t, this.array = e;
      }

      function u() {}

      var c,
          d,
          m = e.exports = {};
      !function () {
        try {
          c = "function" == typeof setTimeout ? setTimeout : n;
        } catch (t) {
          c = n;
        }

        try {
          d = "function" == typeof clearTimeout ? clearTimeout : o;
        } catch (t) {
          d = o;
        }
      }();
      var p,
          f = [],
          v = !1,
          y = -1;
      m.nextTick = function (t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) {
          e[i - 1] = arguments[i];
        }
        f.push(new h(t, e)), 1 !== f.length || v || s(l);
      }, h.prototype.run = function () {
        this.fun.apply(null, this.array);
      }, m.title = "browser", m.browser = !0, m.env = {}, m.argv = [], m.version = "", m.versions = {}, m.on = u, m.addListener = u, m.once = u, m.off = u, m.removeListener = u, m.removeAllListeners = u, m.emit = u, m.prependListener = u, m.prependOnceListener = u, m.listeners = function (t) {
        return [];
      }, m.binding = function (t) {
        throw new Error("process.binding is not supported");
      }, m.cwd = function () {
        return "/";
      }, m.chdir = function (t) {
        throw new Error("process.chdir is not supported");
      }, m.umask = function () {
        return 0;
      };
    }, {}],
    4: [function (t, e, i) {
      (function (i) {
        for (var n = t("performance-now"), o = "undefined" == typeof window ? i : window, s = ["moz", "webkit"], r = "AnimationFrame", a = o["request" + r], l = o["cancel" + r] || o["cancelRequest" + r], h = 0; !a && h < s.length; h++) {
          a = o[s[h] + "Request" + r], l = o[s[h] + "Cancel" + r] || o[s[h] + "CancelRequest" + r];
        }

        if (!a || !l) {
          var u = 0,
              c = 0,
              d = [];
          a = function a(t) {
            if (0 === d.length) {
              var e = n(),
                  i = Math.max(0, 1e3 / 60 - (e - u));
              u = i + e, setTimeout(function () {
                var t = d.slice(0);
                d.length = 0;

                for (var e = 0; e < t.length; e++) {
                  if (!t[e].cancelled) try {
                    t[e].callback(u);
                  } catch (t) {
                    setTimeout(function () {
                      throw t;
                    }, 0);
                  }
                }
              }, Math.round(i));
            }

            return d.push({
              handle: ++c,
              callback: t,
              cancelled: !1
            }), c;
          }, l = function l(t) {
            for (var e = 0; e < d.length; e++) {
              d[e].handle === t && (d[e].cancelled = !0);
            }
          };
        }

        e.exports = function (t) {
          return a.call(o, t);
        }, e.exports.cancel = function () {
          l.apply(o, arguments);
        }, e.exports.polyfill = function () {
          o.requestAnimationFrame = a, o.cancelAnimationFrame = l;
        };
      }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
    }, {
      "performance-now": 2
    }],
    5: [function (t, e, i) {
      "use strict";

      function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }

      var o = function () {
        function t(t, e) {
          for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
          }
        }

        return function (e, i, n) {
          return i && t(e.prototype, i), n && t(e, n), e;
        };
      }(),
          s = t("raf"),
          r = t("object-assign"),
          a = {
        propertyCache: {},
        vendors: [null, ["-webkit-", "webkit"], ["-moz-", "Moz"], ["-o-", "O"], ["-ms-", "ms"]],
        clamp: function clamp(t, e, i) {
          return e < i ? t < e ? e : t > i ? i : t : t < i ? i : t > e ? e : t;
        },
        data: function data(t, e) {
          return a.deserialize(t.getAttribute("data-" + e));
        },
        deserialize: function deserialize(t) {
          return "true" === t || "false" !== t && ("null" === t ? null : !isNaN(parseFloat(t)) && isFinite(t) ? parseFloat(t) : t);
        },
        camelCase: function camelCase(t) {
          return t.replace(/-+(.)?/g, function (t, e) {
            return e ? e.toUpperCase() : "";
          });
        },
        accelerate: function accelerate(t) {
          a.css(t, "transform", "translate3d(0,0,0) rotate(0.0001deg)"), a.css(t, "transform-style", "preserve-3d"), a.css(t, "backface-visibility", "hidden");
        },
        transformSupport: function transformSupport(t) {
          for (var e = document.createElement("div"), i = !1, n = null, o = !1, s = null, r = null, l = 0, h = a.vendors.length; l < h; l++) {
            if (null !== a.vendors[l] ? (s = a.vendors[l][0] + "transform", r = a.vendors[l][1] + "Transform") : (s = "transform", r = "transform"), void 0 !== e.style[r]) {
              i = !0;
              break;
            }
          }

          switch (t) {
            case "2D":
              o = i;
              break;

            case "3D":
              if (i) {
                var u = document.body || document.createElement("body"),
                    c = document.documentElement,
                    d = c.style.overflow,
                    m = !1;
                document.body || (m = !0, c.style.overflow = "hidden", c.appendChild(u), u.style.overflow = "hidden", u.style.background = ""), u.appendChild(e), e.style[r] = "translate3d(1px,1px,1px)", o = void 0 !== (n = window.getComputedStyle(e).getPropertyValue(s)) && n.length > 0 && "none" !== n, c.style.overflow = d, u.removeChild(e), m && (u.removeAttribute("style"), u.parentNode.removeChild(u));
              }

          }

          return o;
        },
        css: function css(t, e, i) {
          var n = a.propertyCache[e];
          if (!n) for (var o = 0, s = a.vendors.length; o < s; o++) {
            if (n = null !== a.vendors[o] ? a.camelCase(a.vendors[o][1] + "-" + e) : e, void 0 !== t.style[n]) {
              a.propertyCache[e] = n;
              break;
            }
          }
          t.style[n] = i;
        }
      },
          l = {
        relativeInput: !1,
        clipRelativeInput: !1,
        inputElement: null,
        hoverOnly: !1,
        calibrationThreshold: 100,
        calibrationDelay: 500,
        supportDelay: 500,
        calibrateX: !1,
        calibrateY: !0,
        invertX: !0,
        invertY: !0,
        limitX: !1,
        limitY: !1,
        scalarX: 10,
        scalarY: 10,
        frictionX: .1,
        frictionY: .1,
        originX: .5,
        originY: .5,
        pointerEvents: !1,
        precision: 1,
        onReady: null,
        selector: null
      },
          h = function () {
        function t(e, i) {
          n(this, t), this.element = e;
          var o = {
            calibrateX: a.data(this.element, "calibrate-x"),
            calibrateY: a.data(this.element, "calibrate-y"),
            invertX: a.data(this.element, "invert-x"),
            invertY: a.data(this.element, "invert-y"),
            limitX: a.data(this.element, "limit-x"),
            limitY: a.data(this.element, "limit-y"),
            scalarX: a.data(this.element, "scalar-x"),
            scalarY: a.data(this.element, "scalar-y"),
            frictionX: a.data(this.element, "friction-x"),
            frictionY: a.data(this.element, "friction-y"),
            originX: a.data(this.element, "origin-x"),
            originY: a.data(this.element, "origin-y"),
            pointerEvents: a.data(this.element, "pointer-events"),
            precision: a.data(this.element, "precision"),
            relativeInput: a.data(this.element, "relative-input"),
            clipRelativeInput: a.data(this.element, "clip-relative-input"),
            hoverOnly: a.data(this.element, "hover-only"),
            inputElement: document.querySelector(a.data(this.element, "input-element")),
            selector: a.data(this.element, "selector")
          };

          for (var s in o) {
            null === o[s] && delete o[s];
          }

          r(this, l, o, i), this.inputElement || (this.inputElement = this.element), this.calibrationTimer = null, this.calibrationFlag = !0, this.enabled = !1, this.depthsX = [], this.depthsY = [], this.raf = null, this.bounds = null, this.elementPositionX = 0, this.elementPositionY = 0, this.elementWidth = 0, this.elementHeight = 0, this.elementCenterX = 0, this.elementCenterY = 0, this.elementRangeX = 0, this.elementRangeY = 0, this.calibrationX = 0, this.calibrationY = 0, this.inputX = 0, this.inputY = 0, this.motionX = 0, this.motionY = 0, this.velocityX = 0, this.velocityY = 0, this.onMouseMove = this.onMouseMove.bind(this), this.onDeviceOrientation = this.onDeviceOrientation.bind(this), this.onDeviceMotion = this.onDeviceMotion.bind(this), this.onOrientationTimer = this.onOrientationTimer.bind(this), this.onMotionTimer = this.onMotionTimer.bind(this), this.onCalibrationTimer = this.onCalibrationTimer.bind(this), this.onAnimationFrame = this.onAnimationFrame.bind(this), this.onWindowResize = this.onWindowResize.bind(this), this.windowWidth = null, this.windowHeight = null, this.windowCenterX = null, this.windowCenterY = null, this.windowRadiusX = null, this.windowRadiusY = null, this.portrait = !1, this.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), this.motionSupport = !!window.DeviceMotionEvent && !this.desktop, this.orientationSupport = !!window.DeviceOrientationEvent && !this.desktop, this.orientationStatus = 0, this.motionStatus = 0, this.initialise();
        }

        return o(t, [{
          key: "initialise",
          value: function value() {
            void 0 === this.transform2DSupport && (this.transform2DSupport = a.transformSupport("2D"), this.transform3DSupport = a.transformSupport("3D")), this.transform3DSupport && a.accelerate(this.element), "static" === window.getComputedStyle(this.element).getPropertyValue("position") && (this.element.style.position = "relative"), this.pointerEvents || (this.element.style.pointerEvents = "none"), this.updateLayers(), this.updateDimensions(), this.enable(), this.queueCalibration(this.calibrationDelay);
          }
        }, {
          key: "doReadyCallback",
          value: function value() {
            this.onReady && this.onReady();
          }
        }, {
          key: "updateLayers",
          value: function value() {
            this.selector ? this.layers = this.element.querySelectorAll(this.selector) : this.layers = this.element.children, this.layers.length || console.warn("ParallaxJS: Your scene does not have any layers."), this.depthsX = [], this.depthsY = [];

            for (var t = 0; t < this.layers.length; t++) {
              var e = this.layers[t];
              this.transform3DSupport && a.accelerate(e), e.style.position = t ? "absolute" : "relative", e.style.display = "block", e.style.left = 0, e.style.top = 0;
              var i = a.data(e, "depth") || 0;
              this.depthsX.push(a.data(e, "depth-x") || i), this.depthsY.push(a.data(e, "depth-y") || i);
            }
          }
        }, {
          key: "updateDimensions",
          value: function value() {
            this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight, this.windowCenterX = this.windowWidth * this.originX, this.windowCenterY = this.windowHeight * this.originY, this.windowRadiusX = Math.max(this.windowCenterX, this.windowWidth - this.windowCenterX), this.windowRadiusY = Math.max(this.windowCenterY, this.windowHeight - this.windowCenterY);
          }
        }, {
          key: "updateBounds",
          value: function value() {
            this.bounds = this.inputElement.getBoundingClientRect(), this.elementPositionX = this.bounds.left, this.elementPositionY = this.bounds.top, this.elementWidth = this.bounds.width, this.elementHeight = this.bounds.height, this.elementCenterX = this.elementWidth * this.originX, this.elementCenterY = this.elementHeight * this.originY, this.elementRangeX = Math.max(this.elementCenterX, this.elementWidth - this.elementCenterX), this.elementRangeY = Math.max(this.elementCenterY, this.elementHeight - this.elementCenterY);
          }
        }, {
          key: "queueCalibration",
          value: function value(t) {
            clearTimeout(this.calibrationTimer), this.calibrationTimer = setTimeout(this.onCalibrationTimer, t);
          }
        }, {
          key: "enable",
          value: function value() {
            this.enabled || (this.enabled = !0, this.orientationSupport ? (this.portrait = !1, window.addEventListener("deviceorientation", this.onDeviceOrientation), this.detectionTimer = setTimeout(this.onOrientationTimer, this.supportDelay)) : this.motionSupport ? (this.portrait = !1, window.addEventListener("devicemotion", this.onDeviceMotion), this.detectionTimer = setTimeout(this.onMotionTimer, this.supportDelay)) : (this.calibrationX = 0, this.calibrationY = 0, this.portrait = !1, window.addEventListener("mousemove", this.onMouseMove), this.doReadyCallback()), window.addEventListener("resize", this.onWindowResize), this.raf = s(this.onAnimationFrame));
          }
        }, {
          key: "disable",
          value: function value() {
            this.enabled && (this.enabled = !1, this.orientationSupport ? window.removeEventListener("deviceorientation", this.onDeviceOrientation) : this.motionSupport ? window.removeEventListener("devicemotion", this.onDeviceMotion) : window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("resize", this.onWindowResize), s.cancel(this.raf));
          }
        }, {
          key: "calibrate",
          value: function value(t, e) {
            this.calibrateX = void 0 === t ? this.calibrateX : t, this.calibrateY = void 0 === e ? this.calibrateY : e;
          }
        }, {
          key: "invert",
          value: function value(t, e) {
            this.invertX = void 0 === t ? this.invertX : t, this.invertY = void 0 === e ? this.invertY : e;
          }
        }, {
          key: "friction",
          value: function value(t, e) {
            this.frictionX = void 0 === t ? this.frictionX : t, this.frictionY = void 0 === e ? this.frictionY : e;
          }
        }, {
          key: "scalar",
          value: function value(t, e) {
            this.scalarX = void 0 === t ? this.scalarX : t, this.scalarY = void 0 === e ? this.scalarY : e;
          }
        }, {
          key: "limit",
          value: function value(t, e) {
            this.limitX = void 0 === t ? this.limitX : t, this.limitY = void 0 === e ? this.limitY : e;
          }
        }, {
          key: "origin",
          value: function value(t, e) {
            this.originX = void 0 === t ? this.originX : t, this.originY = void 0 === e ? this.originY : e;
          }
        }, {
          key: "setInputElement",
          value: function value(t) {
            this.inputElement = t, this.updateDimensions();
          }
        }, {
          key: "setPosition",
          value: function value(t, e, i) {
            e = e.toFixed(this.precision) + "px", i = i.toFixed(this.precision) + "px", this.transform3DSupport ? a.css(t, "transform", "translate3d(" + e + "," + i + ",0)") : this.transform2DSupport ? a.css(t, "transform", "translate(" + e + "," + i + ")") : (t.style.left = e, t.style.top = i);
          }
        }, {
          key: "onOrientationTimer",
          value: function value() {
            this.orientationSupport && 0 === this.orientationStatus ? (this.disable(), this.orientationSupport = !1, this.enable()) : this.doReadyCallback();
          }
        }, {
          key: "onMotionTimer",
          value: function value() {
            this.motionSupport && 0 === this.motionStatus ? (this.disable(), this.motionSupport = !1, this.enable()) : this.doReadyCallback();
          }
        }, {
          key: "onCalibrationTimer",
          value: function value() {
            this.calibrationFlag = !0;
          }
        }, {
          key: "onWindowResize",
          value: function value() {
            this.updateDimensions();
          }
        }, {
          key: "onAnimationFrame",
          value: function value() {
            this.updateBounds();
            var t = this.inputX - this.calibrationX,
                e = this.inputY - this.calibrationY;
            (Math.abs(t) > this.calibrationThreshold || Math.abs(e) > this.calibrationThreshold) && this.queueCalibration(0), this.portrait ? (this.motionX = this.calibrateX ? e : this.inputY, this.motionY = this.calibrateY ? t : this.inputX) : (this.motionX = this.calibrateX ? t : this.inputX, this.motionY = this.calibrateY ? e : this.inputY), this.motionX *= this.elementWidth * (this.scalarX / 100), this.motionY *= this.elementHeight * (this.scalarY / 100), isNaN(parseFloat(this.limitX)) || (this.motionX = a.clamp(this.motionX, -this.limitX, this.limitX)), isNaN(parseFloat(this.limitY)) || (this.motionY = a.clamp(this.motionY, -this.limitY, this.limitY)), this.velocityX += (this.motionX - this.velocityX) * this.frictionX, this.velocityY += (this.motionY - this.velocityY) * this.frictionY;

            for (var i = 0; i < this.layers.length; i++) {
              var n = this.layers[i],
                  o = this.depthsX[i],
                  r = this.depthsY[i],
                  l = this.velocityX * (o * (this.invertX ? -1 : 1)),
                  h = this.velocityY * (r * (this.invertY ? -1 : 1));
              this.setPosition(n, l, h);
            }

            this.raf = s(this.onAnimationFrame);
          }
        }, {
          key: "rotate",
          value: function value(t, e) {
            var i = (t || 0) / 30,
                n = (e || 0) / 30,
                o = this.windowHeight > this.windowWidth;
            this.portrait !== o && (this.portrait = o, this.calibrationFlag = !0), this.calibrationFlag && (this.calibrationFlag = !1, this.calibrationX = i, this.calibrationY = n), this.inputX = i, this.inputY = n;
          }
        }, {
          key: "onDeviceOrientation",
          value: function value(t) {
            var e = t.beta,
                i = t.gamma;
            null !== e && null !== i && (this.orientationStatus = 1, this.rotate(e, i));
          }
        }, {
          key: "onDeviceMotion",
          value: function value(t) {
            var e = t.rotationRate.beta,
                i = t.rotationRate.gamma;
            null !== e && null !== i && (this.motionStatus = 1, this.rotate(e, i));
          }
        }, {
          key: "onMouseMove",
          value: function value(t) {
            var e = t.clientX,
                i = t.clientY;
            if (this.hoverOnly && (e < this.elementPositionX || e > this.elementPositionX + this.elementWidth || i < this.elementPositionY || i > this.elementPositionY + this.elementHeight)) return this.inputX = 0, void (this.inputY = 0);
            this.relativeInput ? (this.clipRelativeInput && (e = Math.max(e, this.elementPositionX), e = Math.min(e, this.elementPositionX + this.elementWidth), i = Math.max(i, this.elementPositionY), i = Math.min(i, this.elementPositionY + this.elementHeight)), this.elementRangeX && this.elementRangeY && (this.inputX = (e - this.elementPositionX - this.elementCenterX) / this.elementRangeX, this.inputY = (i - this.elementPositionY - this.elementCenterY) / this.elementRangeY)) : this.windowRadiusX && this.windowRadiusY && (this.inputX = (e - this.windowCenterX) / this.windowRadiusX, this.inputY = (i - this.windowCenterY) / this.windowRadiusY);
          }
        }, {
          key: "destroy",
          value: function value() {
            this.disable(), clearTimeout(this.calibrationTimer), clearTimeout(this.detectionTimer), this.element.removeAttribute("style");

            for (var t = 0; t < this.layers.length; t++) {
              this.layers[t].removeAttribute("style");
            }

            delete this.element, delete this.layers;
          }
        }, {
          key: "version",
          value: function value() {
            return "3.1.0";
          }
        }]), t;
      }();

      e.exports = h;
    }, {
      "object-assign": 1,
      raf: 4
    }]
  }, {}, [5])(5);
});
"use strict";

$(document).ready(function () {
  if ($(window).width() < 769) {
    $('.advantages-items').addClass('owl-carousel');
    var adItems = $('.advantages-items');
    adItems.owlCarousel({
      items: 1,
      nav: false,
      dots: true
    });
  }
});
"use strict";

$(document).ready(function () {
  if ($('#map').length) {
    var myMap;
    var myPlacemark;

    var init = function init() {
      myMap = new ymaps.Map("map", {
        center: [$('#map').attr('data-center-lat'), $('#map').attr('data-center-lon')],
        zoom: $('#map').attr('data-zoom'),
        controls: []
      });
      myMap.behaviors.disable('scrollZoom');
      var myPlacemark = new ymaps.Placemark([$('#map').attr('data-lat'), $('#map').attr('data-lon')], {}, {
        iconLayout: 'default#image',
        iconImageHref: '/static/img/assets/contacts/marker.svg',
        iconImageSize: [35, 35],
        iconImageOffset: [-3, -42]
      });
      myMap.geoObjects.add(myPlacemark);
    };

    ymaps.ready(init);
  }
});
"use strict";

$(document).ready(function () {
  $('.context-item').matchHeight();
});
"use strict";

$(document).ready(function () {
  $('.ct-cause__title').matchHeight();

  if (window.innerWidth < 1200) {
    $('.ct-cause__item').matchHeight();
    var ctCause = $('.ct-cause__row');
    $(ctCause).addClass('owl-carousel');
    ctCause.owlCarousel({
      items: 1,
      nav: false,
      dots: true,
      responsive: {
        576: {
          items: 2
        },
        769: {
          items: 2
        }
      }
    });
  }
});
"use strict";

$(document).ready(function () {
  $('.cl-clients__wrapper').on('click', function () {
    $(this).toggleClass('active');
    $(this).find('.cl-clients__right p').slideToggle();
  });
});
"use strict";

$(document).ready(function () {
  var ctSlides = $('.ct-example__slides');
  ctSlides.owlCarousel({
    items: 1,
    nav: false
  });
});
"use strict";

$(document).ready(function () {
  $('.apple-mockup__item').twentytwenty();
  var IndexActive = $('.apple-item__wrapper.active').index();
  var WrappersLength = $('.apple-item__wrapper').length;
  var lastElement = WrappersLength - 1;
  $('.apple-controller__right').on('click', function () {
    IndexActive++;

    if (IndexActive == WrappersLength) {
      IndexActive = 0;
      $('.apple-item__wrapper.active').removeClass('active');
      $('.example-left__wrapper.active').removeClass('active');
      $('.apple-item__wrapper').eq(0).addClass('active');
      $('.example-left__wrapper').eq(0).addClass('active');
      $('.oracle-difference.active').removeClass('active');
      $('.oracle-difference').eq(0).addClass('active');
    } else {
      $('.apple-item__wrapper.active').removeClass('active');
      $('.example-left__wrapper.active').removeClass('active');
      $('.apple-item__wrapper').eq(IndexActive).addClass('active');
      $('.example-left__wrapper').eq(IndexActive).addClass('active');
      $('.oracle-difference.active').removeClass('active');
      $('.oracle-difference').eq(IndexActive).addClass('active');
    }
  });
  $('.apple-controller__left').on('click', function () {
    IndexActive--;

    if (IndexActive == -1) {
      $('.apple-item__wrapper.active').removeClass('active');
      $('.example-left__wrapper.active').removeClass('active');
      $('.oracle-difference.active').removeClass('active');
      $('.apple-item__wrapper').eq(lastElement).addClass('active');
      $('.example-left__wrapper').eq(lastElement).addClass('active');
      $('.oracle-difference').eq(lastElement).addClass('active');
      IndexActive = lastElement;
    } else {
      $('.apple-item__wrapper.active').removeClass('active');
      $('.example-left__wrapper.active').removeClass('active');
      $('.apple-item__wrapper').eq(IndexActive).addClass('active');
      $('.example-left__wrapper').eq(IndexActive).addClass('active');
      $('.oracle-difference.active').removeClass('active');
      $('.oracle-difference').eq(IndexActive).addClass('active');
    }
  });
});
"use strict";
"use strict";

$(document).ready(function () {
  $('.label-controll').on('focus', function () {
    $(this).parent().addClass('not-empty');
  });
  $('.label-controll').on('focusout', function () {
    if ($(this).val() == "") {
      $(this).parent().removeClass('not-empty');
    }
  });
  $("input[type='tel']").inputmask("+7 (999) 999-99-99");
});
"use strict";

$(document).ready(function () {
  $("ul.steeps-list").on("click", "a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault(); //забираем идентификатор бока с атрибута href

    var id = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
    top = $(id).offset().top;
    top = top + 80; //анимируем переход на расстояние - top за 1500 мс

    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
  console.log($(window).width());

  if ($(window).width()) {
    $('.header-nav').on('click', function () {
      $(this).toggleClass('active');
      $(this).children().children('.header-burger').children('.ham').toggleClass('active');
    });
  }
});
"use strict";
"use strict";

$(document).ready(function () {
  $('.letters-items').owlCarousel({
    items: 4,
    margin: 30,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      769: {
        items: 3
      },
      993: {
        items: 4
      }
    }
  });
  $('.letters-items .owl-item').matchHeight();
  $('.zoom-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    closeBtnInside: false,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS

    }
  });
});
"use strict";

$(document).ready(function () {
  $('.img-pop').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    // class to remove default margin from left and right side
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS

    }
  });

  if (window.innerWidth < 993) {
    var lookItem = $('.look-items');
    $(lookItem).addClass('owl-carousel');
    lookItem.owlCarousel({
      items: 2,
      responsive: {
        0: {
          items: 1
        },
        480: {
          items: 2
        }
      }
    });
  }

  if (window.innerWidth < 769) {
    var netI = $('.networks-items');
    $(netI).addClass('owl-carousel');
    netI.owlCarousel({
      items: 1,
      dots: true,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        }
      }
    });
    $('.networks-items .owl-item').matchHeight();
  }

  /*if (window.innerWidth < 576) {
    var location = $('.location-items');
    $(location).addClass('owl-carousel');
    location.owlCarousel({
      items: 3,
      responsive: {
        0: {
          items: 2
        },
        480: {
          items: 3
        }
      }
    });
  }*/
});
"use strict";

$(document).ready(function () {
  $('.y-pop').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
  var revSlider = $('.reviews-slides');
  revSlider.owlCarousel({
    items: 1,
    dots: false,
    nav: true
  });
});
"use strict";

$(document).ready(function () {
  if ($('#scene1').length) {
    var scene1 = document.getElementById('scene1');
    var parallaxInstance = new Parallax(scene1);
  }

  if ($('#scene2').length) {
    var scene2 = document.getElementById('scene2');
    var parallaxInstance = new Parallax(scene2);
  }

  if ($('#scene3').length) {
    var scene2 = document.getElementById('scene3');
    var parallaxInstance = new Parallax(scene2);
  }
});
"use strict";

$(document).ready(function () {
  var seoSlides = $('.seo-slides');
  seoSlides.owlCarousel({
    items: 1,
    dots: false,
    nav: true,
    navContainer: '#seo-nav'
  });
  seoSlides.on('changed.owl.carousel', function (event) {
    var index = event.item.index;
    $('.seo-slider__top .puncted-title .h4').removeClass('active');
    $('.seo-slider__top .puncted-title .h4').eq(index).addClass('active');
  });
});
"use strict";

$(document).ready(function () {
  if (window.innerWidth < 993) {
    var seoPrice = $('.seo-price__row');
    seoPrice.addClass('owl-carousel');
    seoPrice.owlCarousel({
      items: 2,
      dots: true,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        }
      }
    });

    var seoPrice = $('.cservice-item-list');
    seoPrice.addClass('owl-carousel');
    seoPrice.owlCarousel({
      items: 2,
      dots: true,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        }
      }
    });
  }
});
"use strict";

$(document).ready(function () {
  if (window.innerWidth < 769) {
    $('.seo-steps__row').addClass('owl-carousel');
    var seoSteps = $('.seo-steps__row');
    seoSteps.owlCarousel({
      items: 1
    });
  }
});
"use strict";

$(document).ready(function () {
  $('.services-item__title').matchHeight();
  $('.services-item__list').matchHeight();
  $('#want .form-title').matchHeight();

  if ($(window).width() < 992) {
    $('.services-row').addClass('owl-carousel');
    var servicesItems = $('.services-row');
    servicesItems.owlCarousel({
      items: 1,
      dots: true,
      nav: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        }
      }
    });
  }
});
"use strict";

$(document).ready(function () {
  $('.stage-item').on('click', function () {
    $(this).toggleClass('active');
    $(this).children('.stage-item__answer').slideToggle();
  });
});
"use strict";

$(document).ready(function () {
  if ($(window).width() < 992) {
    $('.whyus-item').matchHeight();
    $('.whyus-row').addClass('owl-carousel');
    var whyUs = $('.whyus-row');
    whyUs.owlCarousel({
      items: 2,
      nav: false,
      dots: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        }
      }
    });
  }
});