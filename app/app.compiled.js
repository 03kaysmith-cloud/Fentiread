(function (React, ReactDOM, FRStore) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* global React, ReactDOM, FRStore */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useCallback = _React.useCallback,
  useMemo = _React.useMemo;

// -- Constants --
var FONTS = [{
  id: 'serif',
  label: 'Serif',
  family: '"Source Serif 4", Georgia, serif'
}, {
  id: 'georgia',
  label: 'Georgia',
  family: 'Georgia, "Times New Roman", serif'
}, {
  id: 'sans',
  label: 'Sans',
  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
}, {
  id: 'mono',
  label: 'Mono',
  family: '"JetBrains Mono", monospace'
}];
var DEFAULT_SETTINGS = {
  wpm: 300,
  fontSize: 110,
  bionicBold: true,
  bionicRatio: 0.4,
  focusMarks: true,
  multiWord: false,
  font: 'serif',
  commaMult: 1.5,
  fullstopMult: 2.0,
  paragraphPauseMult: 2.0,
  semicolonMult: 1.3,
  ellipsisMult: 2.5,
  longWordMs: 10,
  longWordThreshold: 9,
  statMode: 0
};
var APP_SETTINGS_KEY = 'fentiread-app-settings-v1';
function normalizeSettings(value) {
  return _objectSpread(_objectSpread({}, DEFAULT_SETTINGS), value || {});
}
function readCachedAppSettings() {
  try {
    var raw = localStorage.getItem(APP_SETTINGS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}
function cacheAppSettings(value) {
  try {
    localStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(value));
  } catch (_) {
    // IndexedDB remains the canonical store when localStorage is unavailable.
  }
}

// -- Theme --
function useTheme(dark) {
  return useMemo(function () {
    return dark ? {
      bg: '#0a0a0a',
      ink: '#fff',
      dim: 'rgba(255,255,255,0.55)',
      faint: 'rgba(255,255,255,0.18)',
      hairline: 'rgba(255,255,255,0.15)',
      rowDiv: 'rgba(255,255,255,0.08)',
      highlight: '#222',
      invertedBg: '#fff',
      invertedInk: '#000'
    } : {
      bg: '#fff',
      ink: '#000',
      dim: 'rgba(0,0,0,0.55)',
      faint: 'rgba(0,0,0,0.18)',
      hairline: 'rgba(0,0,0,0.12)',
      rowDiv: 'rgba(0,0,0,0.08)',
      highlight: '#e9e9e9',
      invertedBg: '#000',
      invertedInk: '#fff'
    };
  }, [dark]);
}
function getFontFamily(fontId) {
  return (FONTS.find(function (f) {
    return f.id === fontId;
  }) || FONTS[0]).family;
}

// -- Bionic --
function bionicSplit(word) {
  var ratio = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.4;
  if (!word) return ['', ''];
  var stripped = word.replace(/(?:[\0-&\(-\/:-@\[-`\{-\xA9\xAB-\xB1\xB4\xB6-\xB8\xBB\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u036F\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482-\u0489\u0530\u0557\u0558\u055A-\u055F\u0589-\u05CF\u05EB-\u05EE\u05F3-\u061F\u064B-\u065F\u066A-\u066D\u0670\u06D4\u06D6-\u06E4\u06E7-\u06ED\u06FD\u06FE\u0700-\u070F\u0711\u0730-\u074C\u07A6-\u07B0\u07B2-\u07BF\u07EB-\u07F3\u07F6-\u07F9\u07FB-\u07FF\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u083F\u0859-\u085F\u086B-\u086F\u0888\u0890-\u089F\u08CA-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962-\u0965\u0970\u0981-\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA-\u09BC\u09BE-\u09CD\u09CF-\u09DB\u09DE\u09E2-\u09E5\u09F2\u09F3\u09FA\u09FB\u09FD-\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A-\u0A58\u0A5D\u0A5F-\u0A65\u0A70\u0A71\u0A75-\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA-\u0ABC\u0ABE-\u0ACF\u0AD1-\u0ADF\u0AE2-\u0AE5\u0AF0-\u0AF8\u0AFA-\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A-\u0B3C\u0B3E-\u0B5B\u0B5E\u0B62-\u0B65\u0B70\u0B78-\u0B82\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BCF\u0BD1-\u0BE5\u0BF3-\u0C04\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C3E-\u0C57\u0C5B\u0C5E\u0C5F\u0C62-\u0C65\u0C70-\u0C77\u0C7F\u0C81-\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA-\u0CBC\u0CBE-\u0CDB\u0CDF\u0CE2-\u0CE5\u0CF0\u0CF3-\u0D03\u0D0D\u0D11\u0D3B\u0D3C\u0D3E-\u0D4D\u0D4F-\u0D53\u0D57\u0D62-\u0D65\u0D79\u0D80-\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DE5\u0DF0-\u0E00\u0E31\u0E34-\u0E3F\u0E47-\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EB1\u0EB4-\u0EBC\u0EBE\u0EBF\u0EC5\u0EC7-\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F1F\u0F34-\u0F3F\u0F48\u0F6D-\u0F87\u0F8D-\u0FFF\u102B-\u103E\u104A-\u104F\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B-\u1368\u137D-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u1712-\u171E\u1732-\u173F\u1752-\u175F\u176D\u1771-\u177F\u17B4-\u17D6\u17D8-\u17DB\u17DD-\u17DF\u17EA-\u17EF\u17FA-\u180F\u181A-\u181F\u1879-\u187F\u1885\u1886\u18A9\u18AB-\u18AF\u18F6-\u18FF\u191F-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19FF\u1A17-\u1A1F\u1A55-\u1A7F\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1B04\u1B34-\u1B44\u1B4D-\u1B4F\u1B5A-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BFF\u1C24-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C8B-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1CFB-\u1CFF\u1DC0-\u1DFF\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u206F\u2072\u2073\u207A-\u207E\u208A-\u208F\u209D-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A-\u245F\u249C-\u24E9\u2500-\u2775\u2794-\u2BFF\u2CE5-\u2CEA\u2CEF-\u2CF1\u2CF4-\u2CFC\u2CFE\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7F\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF-\u2E2E\u2E30-\u3004\u3008-\u3020\u302A-\u3030\u3036\u3037\u303D-\u3040\u3097-\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u3191\u3196-\u319F\u31C0-\u31EF\u3200-\u321F\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA66F-\uA67E\uA69E\uA69F\uA6F0-\uA716\uA720\uA721\uA789\uA78A\uA7DD-\uA7F0\uA802\uA806\uA80B\uA823-\uA82F\uA836-\uA83F\uA874-\uA881\uA8B4-\uA8CF\uA8DA-\uA8F1\uA8F8-\uA8FA\uA8FC\uA8FF\uA926-\uA92F\uA947-\uA95F\uA97D-\uA983\uA9B3-\uA9CE\uA9DA-\uA9DF\uA9E5\uA9FF\uAA29-\uAA3F\uAA43\uAA4C-\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAC3-\uAADA\uAADE\uAADF\uAAEB-\uAAF1\uAAF5-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABE3-\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB1E\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD06\uDD34-\uDD3F\uDD79-\uDD89\uDD8C-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEE0\uDEFC-\uDEFF\uDF24-\uDF2C\uDF4B-\uDF4F\uDF76-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6F\uDD7B\uDD8B\uDD93\uDD96\uDDA2\uDDB2\uDDBA\uDDBD-\uDDBF\uDDF4-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDF7F\uDF86\uDFB1\uDFBB-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC57\uDC77\uDC78\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1F\uDD3A-\uDD3F\uDD5A-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE01-\uDE0F\uDE14\uDE18\uDE36-\uDE3F\uDE49-\uDE5F\uDE7F\uDEA0-\uDEBF\uDEC8\uDEE5-\uDEEA\uDEF0-\uDEFF\uDF36-\uDF3F\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDFA8\uDFB0-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD24-\uDD2F\uDD3A-\uDD3F\uDD66-\uDD6E\uDD86-\uDE5F\uDE7F\uDEAA-\uDEAF\uDEB2-\uDEC1\uDEC8-\uDEFF\uDF28-\uDF2F\uDF46-\uDF50\uDF55-\uDF6F\uDF82-\uDFAF\uDFCC-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC00-\uDC02\uDC38-\uDC51\uDC70\uDC73\uDC74\uDC76-\uDC82\uDCB0-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDD02\uDD27-\uDD35\uDD40-\uDD43\uDD45\uDD46\uDD48-\uDD4F\uDD73-\uDD75\uDD77-\uDD82\uDDB3-\uDDC0\uDDC5-\uDDCF\uDDDB\uDDDD-\uDDE0\uDDF5-\uDDFF\uDE12\uDE2C-\uDE3E\uDE41-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEDF-\uDEEF\uDEFA-\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A-\uDF3C\uDF3E-\uDF4F\uDF51-\uDF5C\uDF62-\uDF7F\uDF8A\uDF8C\uDF8D\uDF8F\uDFB6\uDFB8-\uDFD0\uDFD2\uDFD4-\uDFFF]|\uD805[\uDC35-\uDC46\uDC4B-\uDC4F\uDC5A-\uDC5E\uDC62-\uDC7F\uDCB0-\uDCC3\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDAF-\uDDD7\uDDDC-\uDDFF\uDE30-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEAB-\uDEB7\uDEB9-\uDEBF\uDECA-\uDECF\uDEE4-\uDEFF\uDF1B-\uDF2F\uDF3C-\uDF3F\uDF47-\uDFFF]|\uD806[\uDC2C-\uDC9F\uDCF3-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD30-\uDD3E\uDD40\uDD42-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD1-\uDDE0\uDDE2\uDDE4-\uDDFF\uDE01-\uDE0A\uDE33-\uDE39\uDE3B-\uDE4F\uDE51-\uDE5B\uDE8A-\uDE9C\uDE9E-\uDEAF\uDEF9-\uDFBF\uDFE1-\uDFEF\uDFFA-\uDFFF]|\uD807[\uDC09\uDC2F-\uDC3F\uDC41-\uDC4F\uDC6D-\uDC71\uDC90-\uDCFF\uDD07\uDD0A\uDD31-\uDD45\uDD47-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8A-\uDD97\uDD99-\uDD9F\uDDAA-\uDDAF\uDDDC-\uDDDF\uDDEA-\uDEDF\uDEF3-\uDF01\uDF03\uDF11\uDF34-\uDF4F\uDF5A-\uDFAF\uDFB1-\uDFBF\uDFD5-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD812-\uD817\uD819\uD824-\uD82A\uD82D\uD82E\uD830-\uD832\uD836\uD83D\uD83F\uD87C\uD87D\uD87F\uD88E-\uDBFF][\uDC00-\uDFFF]|\uD80B[\uDC00-\uDF8F\uDFF1-\uDFFF]|\uD80D[\uDC30-\uDC40\uDC47-\uDC5F]|\uD810[\uDFFB-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD818[\uDC00-\uDCFF\uDD1E-\uDD2F\uDD3A-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6F\uDEBF\uDECA-\uDECF\uDEEE-\uDEFF\uDF30-\uDF3F\uDF44-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDD3F\uDD6D-\uDD6F\uDD7A-\uDE3F\uDE97-\uDE9F\uDEB9\uDEBA\uDED4-\uDEFF\uDF4B-\uDF4F\uDF51-\uDF92\uDFA0-\uDFDF\uDFE2\uDFE4-\uDFF1\uDFF7-\uDFFF]|\uD823[\uDCD6-\uDCFE\uDD1F-\uDD7F\uDDF3-\uDFFF]|\uD82B[\uDC00-\uDFEF\uDFF4\uDFFC\uDFFF]|\uD82C[\uDD23-\uDD31\uDD33-\uDD4F\uDD53\uDD54\uDD56-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDFFF]|\uD833[\uDC00-\uDCEF\uDCFA-\uDFFF]|\uD834[\uDC00-\uDEBF\uDED4-\uDEDF\uDEF4-\uDF5F\uDF79-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD837[\uDC00-\uDEFF\uDF1F-\uDF24\uDF2B-\uDFFF]|\uD838[\uDC00-\uDC2F\uDC6E-\uDCFF\uDD2D-\uDD36\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDE8F\uDEAE-\uDEBF\uDEEC-\uDEEF\uDEFA-\uDFFF]|\uD839[\uDC00-\uDCCF\uDCEC-\uDCEF\uDCFA-\uDDCF\uDDEE\uDDEF\uDDFB-\uDEBF\uDEDF\uDEE3\uDEE6\uDEEE\uDEEF\uDEF5-\uDEFD\uDF00-\uDFDF\uDFE7\uDFEC\uDFEF\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD0-\uDCFF\uDD44-\uDD4A\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDC70\uDCAC\uDCB0\uDCB5-\uDD00\uDD2E\uDD3E-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDCFF\uDD0D-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEE0-\uDEFF]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEAE\uDEAF]|\uD87A[\uDFE1-\uDFEF]|\uD87B[\uDE5E-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDF4F]|\uD88D[\uDC7A-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g, '');
  var len = stripped.length || 1;
  var n = Math.max(1, Math.min(len - 1, Math.ceil(len * ratio)));
  var count = 0;
  for (var i = 0; i < word.length; i++) {
    if (/(?:['0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD40-\uDD59\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDD40-\uDD65\uDD6F-\uDD85\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC7\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDED0-\uDEE3\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0\uDFF0-\uDFF9]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDDB0-\uDDDB\uDDE0-\uDDE9\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD822\uD840-\uD868\uD86A-\uD86D\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD88C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D\uDD30-\uDD39]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDD70-\uDD79\uDE40-\uDE96\uDEA0-\uDEB8\uDEBB-\uDED3\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3\uDFF2-\uDFF6]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD1E\uDD80-\uDDF2]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD833[\uDCF0-\uDCF9]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDDD0-\uDDED\uDDF0-\uDDFA\uDEC0-\uDEDE\uDEE0-\uDEE2\uDEE4\uDEE5\uDEE7-\uDEED\uDEF0-\uDEF4\uDEFE\uDEFF\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEAD\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD88D[\uDC00-\uDC79])/.test(word[i])) {
      count++;
      if (count === n) return [word.slice(0, i + 1), word.slice(i + 1)];
    }
  }
  return [word, ''];
}
function FocusWord(_ref) {
  var word = _ref.word,
    size = _ref.size,
    color = _ref.color,
    _ref$ratio = _ref.ratio,
    ratio = _ref$ratio === void 0 ? 0.4 : _ref$ratio,
    _ref$bionic = _ref.bionic,
    bionic = _ref$bionic === void 0 ? true : _ref$bionic,
    fontFamily = _ref.fontFamily;
  if (!bionic) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: fontFamily,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: -1,
        color: color,
        fontWeight: 400
      }
    }, word);
  }
  var _bionicSplit = bionicSplit(word || '', ratio),
    _bionicSplit2 = _slicedToArray(_bionicSplit, 2),
    head = _bionicSplit2[0],
    tail = _bionicSplit2[1];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: fontFamily,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: -1,
      color: color
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, head), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 300
    }
  }, tail));
}

// -- Relative time --
function relativeTime(epoch) {
  if (!epoch) return '';
  var diff = Date.now() - epoch;
  var sec = Math.floor(diff / 1000);
  if (sec < 60) return 'just now';
  var min = Math.floor(sec / 60);
  if (min < 60) return min + 'm ago';
  var hr = Math.floor(min / 60);
  if (hr < 24) return hr + 'h ago';
  var days = Math.floor(hr / 24);
  if (days < 7) return days + 'd ago';
  return new Date(epoch).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
}

// -- Icons --
var I = {
  plus: function plus() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    }));
  },
  folder: function folder() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
    }));
  },
  back: function back() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 18;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        overflow: 'visible',
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M15 18l-6-6 6-6"
    }));
  },
  page: function page() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 18;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        overflow: 'visible',
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "5",
      y: "4",
      width: "14",
      height: "16"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "9",
      x2: "16",
      y2: "9"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "13",
      x2: "16",
      y2: "13"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "17",
      x2: "13",
      y2: "17"
    }));
  },
  gear: function gear() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 18;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        overflow: 'visible',
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }));
  },
  sun: function sun() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
    }));
  },
  moon: function moon() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
    }));
  },
  trash: function trash() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 14;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"
    }));
  },
  text: function text() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M4 7V4h16v3M9 20h6M12 4v16"
    }));
  },
  image: function image() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 14;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "8.5",
      cy: "8.5",
      r: "1.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 15l-5-5L5 21"
    }));
  },
  send: function send() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M22 2L11 13M22 2l-7 20-4-9-9-4z"
    }));
  },
  clipboard: function clipboard() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "8",
      y: "2",
      width: "8",
      height: "4",
      rx: "1"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
    }));
  },
  help: function help() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.25",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "17",
      x2: "12.01",
      y2: "17"
    }));
  },
  play: function play() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      stroke: "none"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M8 5v14l11-7z"
    }));
  },
  check: function check() {
    var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;
    return /*#__PURE__*/React.createElement("svg", {
      width: s,
      height: s,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5"
    }));
  }
};

// -- Shared components --
var Mono = function Mono(_ref2) {
  var children = _ref2.children,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 10 : _ref2$size,
    _ref2$opacity = _ref2.opacity,
    opacity = _ref2$opacity === void 0 ? 1 : _ref2$opacity,
    style = _ref2.style;
  return /*#__PURE__*/React.createElement("span", {
    style: _objectSpread({
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: size,
      letterSpacing: 1.3,
      textTransform: 'uppercase',
      opacity: opacity
    }, style)
  }, children);
};
var Pill = function Pill(_ref3) {
  var children = _ref3.children,
    theme = _ref3.theme,
    style = _ref3.style;
  return /*#__PURE__*/React.createElement("span", {
    style: _objectSpread({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 20,
      padding: '0 9px',
      borderRadius: 10,
      border: "0.75px solid ".concat(theme.ink),
      background: theme.bg,
      color: theme.ink,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10,
      letterSpacing: 0.8,
      fontWeight: 500
    }, style)
  }, children);
};
function CoverImg(_ref4) {
  var book = _ref4.book,
    theme = _ref4.theme,
    height = _ref4.height;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    url = _useState2[0],
    setUrl = _useState2[1];
  useEffect(function () {
    if (book.cover) {
      var u = URL.createObjectURL(book.cover);
      setUrl(u);
      return function () {
        return URL.revokeObjectURL(u);
      };
    }
  }, [book.cover]);
  if (url) {
    return /*#__PURE__*/React.createElement("img", {
      src: url,
      alt: book.title,
      style: {
        width: '100%',
        aspectRatio: '2 / 3',
        objectFit: 'cover',
        display: 'block',
        border: "0.75px solid ".concat(theme.ink)
      }
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      aspectRatio: '2 / 3',
      border: "0.75px solid ".concat(theme.ink),
      background: theme.bg,
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      color: theme.ink
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 18,
      lineHeight: 1.05,
      fontWeight: 600,
      textWrap: 'pretty'
    }
  }, book.title), /*#__PURE__*/React.createElement(Mono, {
    size: 9,
    opacity: 0.55,
    style: {
      marginTop: 10
    }
  }, book.author));
}
function Slider(_ref5) {
  var value = _ref5.value,
    min = _ref5.min,
    max = _ref5.max,
    _ref5$step = _ref5.step,
    step = _ref5$step === void 0 ? 1 : _ref5$step,
    onChange = _ref5.onChange,
    theme = _ref5.theme;
  var pct = (value - min) / (max - min);
  var ref = useRef(null);
  var setFromEvent = function setFromEvent(e) {
    var r = ref.current.getBoundingClientRect();
    var x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    onChange(Math.round((min + x * (max - min)) / step) * step);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onPointerDown: function onPointerDown(e) {
      e.currentTarget.setPointerCapture(e.pointerId);
      setFromEvent(e);
    },
    onPointerMove: function onPointerMove(e) {
      if (e.buttons) setFromEvent(e);
    },
    style: {
      position: 'relative',
      height: 22,
      cursor: 'pointer',
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: '50%',
      height: 1,
      background: theme.ink,
      opacity: 0.18
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: '50%',
      height: 1,
      background: theme.ink,
      width: "".concat(pct * 100, "%")
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: "".concat(pct * 100, "%"),
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: theme.ink,
      border: "2px solid ".concat(theme.bg),
      boxShadow: "0 0 0 1px ".concat(theme.ink)
    }
  }));
}
function Toggle(_ref6) {
  var on = _ref6.on,
    onChange = _ref6.onChange,
    theme = _ref6.theme;
  return /*#__PURE__*/React.createElement("button", {
    className: "fr-toggle".concat(on ? ' on' : ''),
    style: {
      color: theme.ink,
      '--fr-bg': theme.bg
    },
    onClick: function onClick() {
      return onChange(!on);
    }
  });
}
function ToggleGroup(_ref7) {
  var options = _ref7.options,
    value = _ref7.value,
    onChange = _ref7.onChange,
    theme = _ref7.theme;
  return /*#__PURE__*/React.createElement("div", {
    className: "fr-toggle-group",
    style: {
      color: theme.ink
    }
  }, options.map(function (opt) {
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      className: value === opt.value ? 'active' : '',
      style: value === opt.value ? {
        background: theme.ink,
        color: theme.bg
      } : {},
      onClick: function onClick() {
        return onChange(opt.value);
      }
    }, opt.label);
  }));
}
var primaryBtn = function primaryBtn(theme) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '14px 22px',
    background: theme.invertedBg,
    color: theme.invertedInk,
    border: 'none',
    borderRadius: 26,
    cursor: 'pointer',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase'
  };
};
var secondaryBtn = function secondaryBtn(theme) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '13px 21px',
    background: 'transparent',
    color: theme.ink,
    border: "0.75px solid ".concat(theme.ink),
    borderRadius: 26,
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase'
  };
};
var iconBtn = function iconBtn(theme) {
  return {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: theme.ink,
    padding: 0,
    flexShrink: 0
  };
};

// -- Tokenizer --
// Converts chapter text into structured tokens for the RSVP engine.
// Token types: word, paragraph_break, chapter_heading

// Split words joined by hyphens, en-dashes, or em-dashes into separate tokens.
// Dashes stay attached to the preceding part (twenty- six- year- old, sky— a).
function splitDashes(word) {
  // Split on em-dash or en-dash, keeping the dash on the preceding part
  var emParts = word.split(/([\u2014\u2013]+)/).filter(Boolean);
  if (emParts.length > 1) {
    var result = [];
    for (var i = 0; i < emParts.length; i++) {
      if (/^[\u2014\u2013]+$/.test(emParts[i])) {
        // Attach dash to the previous part
        if (result.length > 0) result[result.length - 1] += emParts[i];else result.push(emParts[i]);
      } else {
        // Split this segment on hyphens too
        result.push.apply(result, _toConsumableArray(splitHyphens(emParts[i])));
      }
    }
    return result.filter(Boolean);
  }
  return splitHyphens(word);
}
function splitHyphens(word) {
  // Only split if there are internal hyphens (not leading/trailing)
  if (!/.\-./.test(word)) return [word];
  var parts = word.split('-');
  var result = [];
  for (var i = 0; i < parts.length; i++) {
    if (!parts[i]) continue;
    // Keep hyphen on all parts except the last
    result.push(i < parts.length - 1 ? parts[i] + '-' : parts[i]);
  }
  return result.length ? result : [word];
}
function classifyPunctuation(word) {
  var clean = (word || '').trim().replace(/\s*[*"'’”)\]}]+$/g, '');
  if (/\.{2,}$/.test(clean) || /\u2026$/.test(clean)) return 'ellipsis';
  if (/[.!?]$/.test(clean)) return 'fullstop';
  if (/,$/.test(clean)) return 'comma';
  if (/[;:]$/.test(clean)) return 'semicolon';
  return null;
}
var LEADING_STANDALONE_PUNCT = /^[*•‣◦▪▫·\-–—]+$/;
var CLOSING_STANDALONE_PUNCT = /^[,.;:!?*"'’”)\]}]+$/;
var OPENING_STANDALONE_PUNCT = /^[*"'‘“([{]+$/;
var ENUMERATOR_STANDALONE = /^([A-Za-z]\)|\d+[.)])$/;
var APOSTROPHE_CONTINUATION = /^['\u2019](?:s|t|m|d|ll|re|ve|em|cause)$/i;
function normalizeSpacedApostropheContinuations(text) {
  return (text || '').replace(/\b((?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0345\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD40-\uDD59\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDD40-\uDD65\uDD6F-\uDD85\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC7\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDED0-\uDEE3\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0\uDFF0-\uDFF9]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDDB0-\uDDDB\uDDE0-\uDDE9\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD822\uD840-\uD868\uD86A-\uD86D\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD88C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D\uDD30-\uDD39]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDD70-\uDD79\uDE40-\uDE96\uDEA0-\uDEB8\uDEBB-\uDED3\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3\uDFF2-\uDFF6]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD1E\uDD80-\uDDF2]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD833[\uDCF0-\uDCF9]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDDD0-\uDDED\uDDF0-\uDDFA\uDEC0-\uDEDE\uDEE0-\uDEE2\uDEE4\uDEE5\uDEE7-\uDEED\uDEF0-\uDEF4\uDEFE\uDEFF\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEAD\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD88D[\uDC00-\uDC79])+)[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+(['\u2019])[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*([s\u017F]|t|m|d|ll|re|ve|em|cau[s\u017F]e)\b/gi, '$1$2$3');
}
function normalizeReadableWord(word) {
  return (word || '').replace(/\s+(['\u2019](?:s|t|m|d|ll|re|ve|em|cause)\b)/gi, '$1').replace(/\s+([,.;:!?])/g, '$1').replace(/([([{‘“])\s+/g, '$1');
}
function splitReadableWords(text) {
  var raw = normalizeSpacedApostropheContinuations(text).split(/\s+/).filter(Boolean);
  var merged = [];
  for (var i = 0; i < raw.length; i++) {
    var w = raw[i];
    var prev = merged.length ? merged[merged.length - 1] : null;
    var next = raw.slice(i + 1).find(Boolean);
    if (ENUMERATOR_STANDALONE.test(w)) {
      if (next) raw[i + 1] = w + ' ' + raw[i + 1];
      continue;
    }
    if (LEADING_STANDALONE_PUNCT.test(w)) {
      if (prev && (!next || paragraphEndsSentence(prev))) {
        merged[merged.length - 1] = prev + ' ' + w;
      } else if (next) {
        raw[i + 1] = w + ' ' + raw[i + 1];
      }
      continue;
    }
    if (APOSTROPHE_CONTINUATION.test(w) && prev) {
      merged[merged.length - 1] = normalizeReadableWord(prev + ' ' + w);
      continue;
    }
    if (CLOSING_STANDALONE_PUNCT.test(w) && prev) {
      merged[merged.length - 1] = normalizeReadableWord(prev + ' ' + w);
      continue;
    }
    if (OPENING_STANDALONE_PUNCT.test(w) && next) {
      raw[i + 1] = w + ' ' + raw[i + 1];
      continue;
    }
    var parts = splitDashes(w);
    var _iterator = _createForOfIteratorHelper(parts),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var part = _step.value;
        if (LEADING_STANDALONE_PUNCT.test(part) || CLOSING_STANDALONE_PUNCT.test(part) || OPENING_STANDALONE_PUNCT.test(part)) {
          if (merged.length) merged[merged.length - 1] = normalizeReadableWord(merged[merged.length - 1] + ' ' + part);
        } else {
          merged.push(normalizeReadableWord(part));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return merged.map(normalizeReadableWord);
}
function applyInlineMarkdownWordStyles(words) {
  var styled = [];
  var strong = false;
  var _iterator2 = _createForOfIteratorHelper(words),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var word = _step2.value;
      var nextStrong = strong;
      var tokenStrong = strong;
      if (/(\*\*|__)/.test(word)) {
        var markers = word.match(/(\*\*|__)/g) || [];
        if (markers.length >= 2) tokenStrong = true;
        if (markers.length % 2 === 1) nextStrong = !strong;
        word = word.replace(/(\*\*|__)/g, '');
      }
      if (word) styled.push({
        text: word,
        strong: tokenStrong || nextStrong
      });
      strong = nextStrong;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return styled;
}
function isTrailingPunctuationToken(token) {
  return (token === null || token === void 0 ? void 0 : token.type) === 'word' && (/^[,.;:!?]+$/.test(token.text || '') || APOSTROPHE_CONTINUATION.test(token.text || ''));
}
function withAttachedTrailingPunctuation(token, nextToken) {
  if (!token || token.type !== 'word' || !isTrailingPunctuationToken(nextToken)) return token;
  return _objectSpread(_objectSpread({}, token), {}, {
    text: normalizeReadableWord(token.text + nextToken.text),
    punctuation: classifyPunctuation(token.text + nextToken.text)
  });
}
function paragraphEndsSentence(text) {
  return /[.!?]["')\]]*$/.test((text || '').trim());
}
function paragraphStartsContinuation(text) {
  var first = ((text || '').trim().match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD40-\uDD59\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDD40-\uDD65\uDD6F-\uDD85\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC7\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDED0-\uDEE3\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0\uDFF0-\uDFF9]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDDB0-\uDDDB\uDDE0-\uDDE9\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD822\uD840-\uD868\uD86A-\uD86D\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD88C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D\uDD30-\uDD39]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDD70-\uDD79\uDE40-\uDE96\uDEA0-\uDEB8\uDEBB-\uDED3\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3\uDFF2-\uDFF6]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD1E\uDD80-\uDDF2]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD833[\uDCF0-\uDCF9]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDDD0-\uDDED\uDDF0-\uDDFA\uDEC0-\uDEDE\uDEE0-\uDEE2\uDEE4\uDEE5\uDEE7-\uDEED\uDEF0-\uDEF4\uDEFE\uDEFF\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEAD\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD88D[\uDC00-\uDC79])/) || [])[0];
  return !!first && first === first.toLowerCase() && first !== first.toUpperCase();
}
function normalizeImageBreaks(paragraphs, imagesByParagraph) {
  var normalized = {};
  for (var key in imagesByParagraph) {
    var _normalized$pi;
    var pi = Number(key);
    var current = paragraphs[pi] || '';
    var next = paragraphs[pi + 1] || '';
    if (next && !paragraphEndsSentence(current) && paragraphStartsContinuation(next)) {
      pi += 1;
    }
    if (!normalized[pi]) normalized[pi] = [];
    (_normalized$pi = normalized[pi]).push.apply(_normalized$pi, _toConsumableArray(imagesByParagraph[key]));
  }
  return normalized;
}
var FR_APP_NUMBER_WORDS = new Set(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'thirty', 'forty', 'fifty']);
function normalizeAppSplitNumberLines(text) {
  return (text || '').replace(/(^|\n)([A-Z])\s+([a-z][A-Za-z-]*)(?=\n|$)/g, function (match, prefix, first, rest) {
    var joined = first + rest;
    return FR_APP_NUMBER_WORDS.has(joined.toLowerCase()) ? prefix + joined : match;
  });
}
function tokenizeChapters(chapters) {
  var tokens = [];
  var chapterStarts = [];
  if (!chapters) return {
    tokens: tokens,
    chapterStarts: chapterStarts
  };
  for (var ci = 0; ci < chapters.length; ci++) {
    chapterStarts.push(tokens.length);
    var ch = chapters[ci];
    // Chapter heading token
    if (ch.title) {
      tokens.push({
        type: 'chapter_heading',
        text: ch.title,
        chapter: ci
      });
    }
    // Build a set of paragraph indices that have images after them
    var imagesByParagraph = {};
    if (ch.images) {
      var _iterator3 = _createForOfIteratorHelper(ch.images),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var img = _step3.value;
          var pi = img.afterParagraph || 0;
          if (!imagesByParagraph[pi]) imagesByParagraph[pi] = [];
          imagesByParagraph[pi].push(img.dataUrl);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    // Split into paragraphs, then words
    var paragraphs = normalizeAppSplitNumberLines(ch.text).split(/\n\s*\n/);
    var normalizedImages = normalizeImageBreaks(paragraphs, imagesByParagraph);
    for (var _pi = 0; _pi < paragraphs.length; _pi++) {
      if (_pi > 0) tokens.push({
        type: 'paragraph_break'
      });
      var words = applyInlineMarkdownWordStyles(splitReadableWords(paragraphs[_pi]));
      var _iterator4 = _createForOfIteratorHelper(words),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var word = _step4.value;
          tokens.push({
            type: 'word',
            text: word.text,
            strong: word.strong,
            punctuation: classifyPunctuation(word.text)
          });
        }
        // Insert image tokens after this paragraph
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      if (normalizedImages[_pi]) {
        var _iterator5 = _createForOfIteratorHelper(normalizedImages[_pi]),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var dataUrl = _step5.value;
            tokens.push({
              type: 'image',
              dataUrl: dataUrl
            });
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
    }
  }
  return {
    tokens: tokens,
    chapterStarts: chapterStarts
  };
}

// Get only the word tokens (for word-based indexing in PageView)
function flatWords(chapters) {
  var words = [];
  var chapterStarts = [];
  if (!chapters) return {
    words: words,
    chapterStarts: chapterStarts
  };
  var _iterator6 = _createForOfIteratorHelper(chapters),
    _step6;
  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      var ch = _step6.value;
      chapterStarts.push(words.length);
      var paragraphs = normalizeAppSplitNumberLines(ch.text).split(/\n\s*\n/);
      var _iterator7 = _createForOfIteratorHelper(paragraphs),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var paragraph = _step7.value;
          var _iterator8 = _createForOfIteratorHelper(applyInlineMarkdownWordStyles(splitReadableWords(paragraph))),
            _step8;
          try {
            for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
              var word = _step8.value;
              words.push(word.text);
            }
          } catch (err) {
            _iterator8.e(err);
          } finally {
            _iterator8.f();
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }
  return {
    words: words,
    chapterStarts: chapterStarts
  };
}

// -- Tokenization cache (survives Reader mount/unmount) --
var _tokenCache = new Map();
var _flatWordCache = new Map();
function cachedTokenize(bookId, chapters) {
  if (_tokenCache.has(bookId)) return _tokenCache.get(bookId);
  var result = tokenizeChapters(chapters);
  _tokenCache.set(bookId, result);
  return result;
}
function cachedFlatWords(bookId, chapters) {
  if (_flatWordCache.has(bookId)) return _flatWordCache.get(bookId);
  var result = flatWords(chapters);
  _flatWordCache.set(bookId, result);
  return result;
}

// -- Multi-word grouping --
function collectMultiWordGroup(tokens, startIdx, measureFn, containerWidth) {
  if (!measureFn || !containerWidth) return [tokens[startIdx]];
  var group = [];
  var totalWidth = 0;
  var spaceWidth = measureFn(' ');
  for (var i = startIdx; i < tokens.length; i++) {
    var token = tokens[i];
    if (token.type !== 'word') break;
    var wordWidth = measureFn(token.text);
    var newTotal = totalWidth + (group.length > 0 ? spaceWidth : 0) + wordWidth;
    if (group.length > 0 && newTotal > containerWidth) break;
    group.push(token);
    totalWidth = newTotal;
  }
  return group.length > 0 ? group : [tokens[startIdx]];
}
function calculateDelay(token, wpm, settings) {
  var _settings$paragraphPa, _settings$longWordThr, _settings$longWordMs;
  var base = 60000 / wpm;
  if (token.type === 'paragraph_break') return base * ((_settings$paragraphPa = settings.paragraphPauseMult) !== null && _settings$paragraphPa !== void 0 ? _settings$paragraphPa : DEFAULT_SETTINGS.paragraphPauseMult);
  if (token.type === 'chapter_heading') return base * 5;
  if (token.type !== 'word') return base;
  var mult = 1;
  if (token.punctuation === 'fullstop') mult *= settings.fullstopMult;else if (token.punctuation === 'comma') mult *= settings.commaMult;else if (token.punctuation === 'semicolon') mult *= settings.semicolonMult;else if (token.punctuation === 'ellipsis') mult *= settings.ellipsisMult;
  var extra = 0;
  var threshold = (_settings$longWordThr = settings.longWordThreshold) !== null && _settings$longWordThr !== void 0 ? _settings$longWordThr : 9;
  if (token.text.length > threshold) extra = (token.text.length - threshold) * ((_settings$longWordMs = settings.longWordMs) !== null && _settings$longWordMs !== void 0 ? _settings$longWordMs : 10);
  return base * mult + extra;
}

// -- Delete modal (replaces confirm()) --
function DeleteModal(_ref8) {
  var book = _ref8.book,
    theme = _ref8.theme,
    onArchive = _ref8.onArchive,
    onDelete = _ref8.onDelete,
    onCancel = _ref8.onCancel;
  useEffect(function () {
    var onKey = function onKey(e) {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return function () {
      return window.removeEventListener('keydown', onKey);
    };
  }, [onCancel]);
  var hasElectron = !!window.electronBooks;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onCancel,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      width: 440,
      maxWidth: '90vw',
      background: theme.bg,
      border: "0.75px solid ".concat(theme.ink),
      padding: 28,
      color: theme.ink
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 22,
      fontWeight: 600,
      marginBottom: 12
    }
  }, "Remove book?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.5,
      opacity: 0.7,
      marginBottom: hasElectron ? 16 : 28
    }
  }, "\"", book.title, "\" will be removed from your library."), hasElectron && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.5,
      opacity: 0.5,
      marginBottom: 28
    }
  }, "Archive moves the file to books/archive. Delete removes it permanently."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: secondaryBtn(theme)
  }, "Cancel"), hasElectron && /*#__PURE__*/React.createElement("button", {
    onClick: onArchive,
    style: secondaryBtn(theme)
  }, "Archive"), /*#__PURE__*/React.createElement("button", {
    onClick: onDelete,
    style: _objectSpread(_objectSpread({}, primaryBtn(theme)), {}, {
      background: '#c33',
      color: '#fff',
      borderColor: '#c33'
    })
  }, "Delete"))));
}

// -- Empty library / welcome --
function EmptyLibrary(_ref9) {
  var theme = _ref9.theme,
    onPick = _ref9.onPick,
    onPickInput = _ref9.onPickInput,
    supported = _ref9.supported,
    busy = _ref9.busy,
    progress = _ref9.progress;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: 40,
      textAlign: 'center',
      background: theme.bg,
      color: theme.ink
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 56,
      fontWeight: 600,
      letterSpacing: -1.5,
      marginBottom: 12
    }
  }, "FentiRead"), /*#__PURE__*/React.createElement(Mono, {
    size: 11,
    opacity: 0.55
  }, "Speed reader"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60,
      maxWidth: 500,
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 17,
      lineHeight: 1.6,
      opacity: 0.75
    }
  }, "Choose a folder containing your ", /*#__PURE__*/React.createElement(Mono, {
    size: 12
  }, ".epub"), ", ", /*#__PURE__*/React.createElement(Mono, {
    size: 12
  }, ".mobi"), " or ", /*#__PURE__*/React.createElement(Mono, {
    size: 12
  }, ".azw3"), " files, or pick individual files."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, supported && /*#__PURE__*/React.createElement("button", {
    onClick: onPick,
    disabled: busy,
    style: primaryBtn(theme)
  }, I.folder(14), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 10
    }
  }, "Choose folder")), /*#__PURE__*/React.createElement("label", {
    style: _objectSpread(_objectSpread({}, secondaryBtn(theme)), {}, {
      cursor: busy ? 'wait' : 'pointer'
    })
  }, I.plus(14), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 10
    }
  }, "Pick files"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".epub,.mobi,.azw,.azw3",
    multiple: true,
    onChange: onPickInput,
    style: {
      display: 'none'
    },
    disabled: busy
  }))), !supported && /*#__PURE__*/React.createElement(Mono, {
    size: 9,
    opacity: 0.45,
    style: {
      marginTop: 20,
      maxWidth: 480
    }
  }, "Folder picker requires Chrome/Edge. On Safari/Firefox use \"Pick files\"."), busy && progress && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      opacity: 0.65
    }
  }, "Indexing ", progress.i + 1, "/", progress.total, " - ", progress.name));
}

// -- Library --
function Library(_ref0) {
  var theme = _ref0.theme,
    books = _ref0.books,
    _onOpen = _ref0.onOpen,
    onAdd = _ref0.onAdd,
    onAddInput = _ref0.onAddInput,
    _onDelete = _ref0.onDelete,
    _onCoverChange = _ref0.onCoverChange,
    supported = _ref0.supported,
    busy = _ref0.busy,
    progress = _ref0.progress;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflow: 'auto',
      padding: '32px 8vw 80px',
      background: theme.bg,
      color: theme.ink
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      maxWidth: 1200,
      margin: '0 auto 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 10,
    opacity: 0.55
  }, "Library - ", books.length, " ", books.length === 1 ? 'title' : 'titles'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 40,
      fontWeight: 600,
      letterSpacing: -1,
      marginTop: 6
    }
  }, "Your Books")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, supported && /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    disabled: busy,
    style: secondaryBtn(theme)
  }, I.folder(14), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 10
    }
  }, "Folder")), /*#__PURE__*/React.createElement("label", {
    style: _objectSpread(_objectSpread({}, primaryBtn(theme)), {}, {
      cursor: busy ? 'wait' : 'pointer'
    })
  }, I.plus(14), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 10
    }
  }, "Add"), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".epub,.mobi,.azw,.azw3",
    multiple: true,
    onChange: onAddInput,
    style: {
      display: 'none'
    },
    disabled: busy
  })))), busy && progress && /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto 24px',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      opacity: 0.65
    }
  }, "Indexing ", progress.i + 1, "/", progress.total, " - ", progress.name), function () {
    var isFinished = function isFinished(b) {
      var _b$progress;
      return b.totalWords ? Math.round((((_b$progress = b.progress) === null || _b$progress === void 0 ? void 0 : _b$progress.wordIndex) || 0) / b.totalWords * 100) >= 100 : false;
    };
    var unfinished = books.filter(function (b) {
      return !isFinished(b);
    });
    var finished = books.filter(function (b) {
      return isFinished(b);
    });
    var card = function card(b) {
      return /*#__PURE__*/React.createElement(BookCard, {
        key: b.id,
        book: b,
        theme: theme,
        onOpen: function onOpen() {
          return _onOpen(b);
        },
        onDelete: function onDelete() {
          return _onDelete(b);
        },
        onCoverChange: function onCoverChange(file) {
          return _onCoverChange(b, file);
        }
      });
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        columnGap: 28,
        rowGap: 40,
        maxWidth: 1200,
        margin: '0 auto'
      }
    }, unfinished.map(card)), finished.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '48px auto 40px',
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: '0.75px',
        background: theme.ink,
        opacity: 0.2
      }
    }), /*#__PURE__*/React.createElement(Mono, {
      size: 10,
      opacity: 0.4
    }, "Finished"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: '0.75px',
        background: theme.ink,
        opacity: 0.2
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        columnGap: 28,
        rowGap: 40,
        maxWidth: 1200,
        margin: '0 auto'
      }
    }, finished.map(card))));
  }());
}
function BookCard(_ref1) {
  var _book$progress;
  var book = _ref1.book,
    theme = _ref1.theme,
    onOpen = _ref1.onOpen,
    onDelete = _ref1.onDelete,
    onCoverChange = _ref1.onCoverChange;
  var pct = book.totalWords ? Math.round((((_book$progress = book.progress) === null || _book$progress === void 0 ? void 0 : _book$progress.wordIndex) || 0) / book.totalWords * 100) : 0;
  var coverInputRef = useRef(null);
  return /*#__PURE__*/React.createElement("div", {
    className: "book-card",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onOpen,
    style: {
      cursor: book.unsupported ? 'not-allowed' : 'pointer',
      opacity: book.unsupported ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(CoverImg, {
    book: book,
    theme: theme
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      left: 8
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    theme: theme
  }, pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 8,
      right: 8
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    theme: theme
  }, book.format)), /*#__PURE__*/React.createElement("input", {
    ref: coverInputRef,
    type: "file",
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: function onChange(e) {
      var _e$target$files;
      var f = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
      if (f) onCoverChange(f);
      e.target.value = '';
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick(e) {
      var _coverInputRef$curren;
      e.stopPropagation();
      (_coverInputRef$curren = coverInputRef.current) === null || _coverInputRef$curren === void 0 || _coverInputRef$curren.click();
    },
    title: "Change cover",
    className: "book-del",
    style: {
      position: 'absolute',
      bottom: 8,
      left: 8,
      width: 26,
      height: 26,
      borderRadius: 13,
      border: "0.75px solid ".concat(theme.ink),
      background: theme.bg,
      color: theme.ink,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      opacity: 0,
      transition: 'opacity 150ms'
    }
  }, I.image(12))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.25,
      textWrap: 'pretty'
    }
  }, book.title), /*#__PURE__*/React.createElement(Mono, {
    size: 9,
    opacity: 0.55,
    style: {
      marginTop: 4,
      display: 'block'
    }
  }, book.author)), /*#__PURE__*/React.createElement("button", {
    onClick: onDelete,
    title: "Remove",
    className: "book-del",
    style: {
      position: 'absolute',
      top: 8,
      right: 8,
      width: 26,
      height: 26,
      borderRadius: 13,
      border: "0.75px solid ".concat(theme.ink),
      background: theme.bg,
      color: theme.ink,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      opacity: 0,
      transition: 'opacity 150ms'
    }
  }, I.trash(12)));
}

// -- Reader --
function Reader(_ref10) {
  var _book$chapters$curren;
  var theme = _ref10.theme,
    book = _ref10.book,
    onClose = _ref10.onClose,
    settings = _ref10.settings,
    onSettings = _ref10.onSettings,
    onProgressChange = _ref10.onProgressChange,
    _ref10$escapeToClose = _ref10.escapeToClose,
    escapeToClose = _ref10$escapeToClose === void 0 ? false : _ref10$escapeToClose,
    onEscapeClose = _ref10.onEscapeClose,
    _ref10$showTopChrome = _ref10.showTopChrome,
    showTopChrome = _ref10$showTopChrome === void 0 ? true : _ref10$showTopChrome;
  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    paused = _useState4[0],
    setPaused = _useState4[1];
  var _useState5 = useState(settings.wpm),
    _useState6 = _slicedToArray(_useState5, 2),
    wpm = _useState6[0],
    setWpm = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    showSettings = _useState8[0],
    setShowSettings = _useState8[1];
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    showPageView = _useState0[0],
    setShowPageView = _useState0[1];
  var _useState1 = useState(false),
    _useState10 = _slicedToArray(_useState1, 2),
    showHelp = _useState10[0],
    setShowHelp = _useState10[1];
  var _useState11 = useState(0),
    _useState12 = _slicedToArray(_useState11, 2),
    statMode = _useState12[0],
    setStatMode = _useState12[1]; // 0=%, 1=pages left, 2=time left

  var fontFamily = getFontFamily(settings.font);

  // Tokenize chapters (cached across mount/unmount)
  var _useMemo = useMemo(function () {
      return cachedTokenize(book.id, book.chapters);
    }, [book.id]),
    tokens = _useMemo.tokens,
    chapterStarts = _useMemo.chapterStarts;

  // Also keep flat words for PageView
  var _useMemo2 = useMemo(function () {
      return cachedFlatWords(book.id, book.chapters);
    }, [book.id]),
    flatWordList = _useMemo2.words,
    wordChapterStarts = _useMemo2.chapterStarts;

  // Pre-build O(1) lookup: token index -> word count
  var tokenWordIndex = useMemo(function () {
    var map = new Int32Array(tokens.length);
    var count = 0;
    for (var i = 0; i < tokens.length; i++) {
      map[i] = count;
      if (tokens[i].type === 'word') count++;
    }
    return map;
  }, [tokens]);
  var wordTokenIndices = useMemo(function () {
    var indices = [];
    for (var i = 0; i < tokens.length; i++) {
      if (tokens[i].type === 'word') indices.push(i);
    }
    return indices;
  }, [tokens]);
  var wordIndexToTokenIndex = useCallback(function (wordIdx) {
    if (wordTokenIndices.length === 0) return 0;
    var clamped = Math.max(0, Math.min(wordTokenIndices.length - 1, wordIdx));
    return wordTokenIndices[clamped];
  }, [wordTokenIndices]);

  // Compute initial token index synchronously from saved word position
  var initialIdx = useMemo(function () {
    var _book$progress2;
    var savedWordIdx = ((_book$progress2 = book.progress) === null || _book$progress2 === void 0 ? void 0 : _book$progress2.wordIndex) || 0;
    // If no saved progress but book has a startChapter, jump to that chapter
    if (savedWordIdx <= 0 && book.startChapter > 0 && chapterStarts.length > book.startChapter) {
      return chapterStarts[book.startChapter];
    }
    if (savedWordIdx <= 0 || wordTokenIndices.length === 0) return 0;
    var clamped = Math.max(0, Math.min(wordTokenIndices.length - 1, savedWordIdx));
    return wordTokenIndices[clamped];
  }, [book.id, wordTokenIndices, chapterStarts]);
  var _useState13 = useState(initialIdx),
    _useState14 = _slicedToArray(_useState13, 2),
    idx = _useState14[0],
    setIdx = _useState14[1];

  // Sync idx when book changes (switching books)
  var prevBookIdRef = useRef(book.id);
  useEffect(function () {
    if (prevBookIdRef.current !== book.id) {
      prevBookIdRef.current = book.id;
      setIdx(initialIdx);
    }
  }, [book.id, initialIdx]);

  // Current word index - O(1) via lookup table
  var currentWordIndex = idx < tokens.length ? tokenWordIndex[idx] : tokenWordIndex[tokens.length - 1] || 0;
  var totalWordCount = book.totalWords || flatWordList.length;

  // Current chapter
  var currentChapter = useMemo(function () {
    var c = 0;
    for (var i = 0; i < chapterStarts.length; i++) {
      if (chapterStarts[i] <= idx) c = i;else break;
    }
    return c;
  }, [idx, chapterStarts]);
  var currentChapterPct = useMemo(function () {
    var start = chapterStarts[currentChapter] || 0;
    var next = chapterStarts[currentChapter + 1] || tokens.length || 1;
    return (idx - start) / Math.max(1, next - start);
  }, [idx, currentChapter, chapterStarts, tokens.length]);

  // Canvas measurement for multi-word mode
  var canvasRef = useRef(null);
  var rsvpContainerRef = useRef(null);
  var measureWidth = useCallback(function (text) {
    if (!canvasRef.current) canvasRef.current = document.createElement('canvas');
    var ctx = canvasRef.current.getContext('2d');
    ctx.font = "".concat(settings.fontSize, "px ").concat(fontFamily);
    return ctx.measureText(text).width;
  }, [settings.fontSize, fontFamily]);

  // Compute current display group
  var displayGroup = useMemo(function () {
    var _rsvpContainerRef$cur;
    if (idx >= tokens.length) return [];
    var token = tokens[idx];
    if (isTrailingPunctuationToken(token)) {
      var prev = tokens[idx - 1];
      return (prev === null || prev === void 0 ? void 0 : prev.type) === 'word' ? [withAttachedTrailingPunctuation(prev, token)] : [];
    }
    if (token.type !== 'word') return [token];
    if (!settings.multiWord) return [withAttachedTrailingPunctuation(token, tokens[idx + 1])];
    var containerWidth = (_rsvpContainerRef$cur = rsvpContainerRef.current) !== null && _rsvpContainerRef$cur !== void 0 && _rsvpContainerRef$cur.offsetWidth ? rsvpContainerRef.current.offsetWidth * 0.85 : 600;
    var group = collectMultiWordGroup(tokens, idx, measureWidth, containerWidth);
    if (group.length === 1) return [withAttachedTrailingPunctuation(group[0], tokens[idx + 1])];
    return group.map(function (t, i) {
      return i === group.length - 1 ? withAttachedTrailingPunctuation(t, tokens[idx + group.length]) : t;
    });
  }, [idx, tokens, settings.multiWord, settings.fontSize, measureWidth]);

  // Helper: advance index past paragraph breaks, stopping on words, images, or chapter headings
  var skipToNextVisible = useCallback(function (fromIdx) {
    var next = fromIdx;
    while (next < tokens.length && tokens[next].type === 'paragraph_break') next++;
    return Math.min(tokens.length - 1, next);
  }, [tokens]);
  var nextVisibleIndex = useCallback(function (fromIdx, dir) {
    var step = dir > 0 ? 1 : -1;
    var target = fromIdx + step;
    while (target >= 0 && target < tokens.length && tokens[target].type === 'paragraph_break') {
      target += step;
    }
    return Math.max(0, Math.min(tokens.length - 1, target));
  }, [tokens]);

  // RSVP timer - requestAnimationFrame loop for consistent timing
  var rafRef = useRef(null);
  var advanceAtRef = useRef(0);
  var scheduledIdxRef = useRef(null);
  var preloadedImageUrlsRef = useRef(new Set());
  useEffect(function () {
    if (!tokens.length) return;
    var found = 0;
    for (var i = idx; i < tokens.length && found < 4; i++) {
      var _token = tokens[i];
      if (_token.type !== 'image' || !_token.dataUrl) continue;
      if (preloadedImageUrlsRef.current.has(_token.dataUrl)) {
        found++;
        continue;
      }
      preloadedImageUrlsRef.current.add(_token.dataUrl);
      var img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = _token.dataUrl;
      found++;
    }
  }, [idx, tokens]);
  useEffect(function () {
    if (paused || idx >= tokens.length) {
      advanceAtRef.current = 0;
      scheduledIdxRef.current = null;
      return;
    }
    var token = tokens[idx];

    // Immediately skip paragraph breaks
    if (token.type === 'paragraph_break') {
      setIdx(skipToNextVisible(idx));
      return;
    }

    // Image or chapter heading: user just resumed, advance past it
    if (token.type === 'image' || token.type === 'chapter_heading') {
      var next = idx + 1;
      while (next < tokens.length && tokens[next].type === 'paragraph_break') next++;
      // If the next visible token is also a pause-type, go to it and pause again
      if (next < tokens.length && (tokens[next].type === 'image' || tokens[next].type === 'chapter_heading')) {
        setIdx(next);
        setPaused(true);
      } else {
        setIdx(Math.min(tokens.length - 1, next));
      }
      return;
    }

    // Calculate display duration
    var delay;
    {
      var advance = displayGroup.length || 1;
      var displayConsumesTrailingPunctuation = isTrailingPunctuationToken(tokens[idx + advance]);
      if (settings.multiWord && displayGroup.length > 1) {
        delay = displayGroup.reduce(function (sum, t) {
          return sum + calculateDelay(t, wpm, settings);
        }, 0);
      } else {
        delay = calculateDelay(displayGroup[0] || token, wpm, settings);
      }
      var nextRaw = idx + advance + (displayConsumesTrailingPunctuation ? 1 : 0);
      if (nextRaw < tokens.length && tokens[nextRaw].type === 'paragraph_break') {
        var _settings$paragraphPa2;
        delay = Math.max(delay, 60000 / wpm * ((_settings$paragraphPa2 = settings.paragraphPauseMult) !== null && _settings$paragraphPa2 !== void 0 ? _settings$paragraphPa2 : DEFAULT_SETTINGS.paragraphPauseMult));
      }
    }

    // Chain from previous target to prevent cumulative drift
    var now = performance.now();
    if (scheduledIdxRef.current === idx && advanceAtRef.current > now) {
      // WPM/settings changes can rerun this effect while the same word is still
      // displayed. Keep the existing target so arrow-key speed changes feel live.
    } else if (advanceAtRef.current === 0) {
      advanceAtRef.current = now + delay;
    } else {
      advanceAtRef.current += delay;
      if (advanceAtRef.current < now - 30) {
        advanceAtRef.current = now + 10;
      }
    }
    scheduledIdxRef.current = idx;
    var targetTime = advanceAtRef.current;
    var _tick = function tick() {
      if (performance.now() >= targetTime) {
        var adv = displayGroup.length || 1;
        var nextIdx = idx + adv + (isTrailingPunctuationToken(tokens[idx + adv]) ? 1 : 0);
        // Check if the next visible token is an image or chapter heading, auto-pause on it
        var landed = nextIdx;
        while (landed < tokens.length && tokens[landed].type === 'paragraph_break') landed++;
        if (landed < tokens.length && (tokens[landed].type === 'image' || tokens[landed].type === 'chapter_heading')) {
          setIdx(landed);
          setPaused(true);
        } else {
          setIdx(skipToNextVisible(nextIdx));
        }
      } else {
        rafRef.current = requestAnimationFrame(_tick);
      }
    };
    rafRef.current = requestAnimationFrame(_tick);
    return function () {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, wpm, idx, tokens, settings, displayGroup, skipToNextVisible]);

  // Persist progress (debounced)
  useEffect(function () {
    var t = setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var fresh, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            if (!onProgressChange) {
              _context.n = 2;
              break;
            }
            _context.n = 1;
            return onProgressChange({
              wordIndex: currentWordIndex,
              totalWords: totalWordCount,
              complete: totalWordCount > 0 && currentWordIndex >= totalWordCount - 1
            });
          case 1:
            return _context.a(2);
          case 2:
            _context.n = 3;
            return FRStore.dbGet('books', book.id);
          case 3:
            fresh = _context.v;
            if (!fresh) {
              _context.n = 4;
              break;
            }
            fresh.progress = {
              wordIndex: currentWordIndex
            };
            fresh.lastReadAt = Date.now();
            _context.n = 4;
            return FRStore.dbPut('books', fresh);
          case 4:
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[0, 5]]);
    })), 400);
    return function () {
      return clearTimeout(t);
    };
  }, [currentWordIndex, totalWordCount, book.id, onProgressChange]);

  // Sync WPM changes back to persisted settings
  useEffect(function () {
    if (wpm !== settings.wpm) {
      var t = setTimeout(function () {
        return onSettings({
          wpm: wpm
        });
      }, 300);
      return function () {
        return clearTimeout(t);
      };
    }
  }, [wpm]);
  var jumpBy = useCallback(function (dir) {
    setIdx(function (i) {
      var _tokens$target;
      var target = nextVisibleIndex(i, dir);
      var landed = (_tokens$target = tokens[target]) === null || _tokens$target === void 0 ? void 0 : _tokens$target.type;
      if (landed === 'image' || landed === 'chapter_heading') setPaused(true);
      return target;
    });
  }, [nextVisibleIndex, tokens]);
  var jumpChapter = useCallback(function (dir) {
    setIdx(function (i) {
      var _chapterStarts$c, _chapterStarts$target;
      var c = 0;
      for (var k = 0; k < chapterStarts.length; k++) {
        if (chapterStarts[k] <= i) c = k;else break;
      }
      var target = dir < 0 ? i > ((_chapterStarts$c = chapterStarts[c]) !== null && _chapterStarts$c !== void 0 ? _chapterStarts$c : 0) + 3 ? c : Math.max(0, c - 1) : Math.min(chapterStarts.length - 1, c + 1);
      return (_chapterStarts$target = chapterStarts[target]) !== null && _chapterStarts$target !== void 0 ? _chapterStarts$target : 0;
    });
  }, [chapterStarts]);

  // Global 'L' for library (works from any sub-view)
  useEffect(function () {
    var onKey = function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'l' || e.key === 'L') onClose();
    };
    window.addEventListener('keydown', onKey);
    return function () {
      return window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Keyboard
  useEffect(function () {
    if (showPageView) return;
    var onKey = function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      var ctrl = e.ctrlKey || e.metaKey;
      if (e.code === 'Space') {
        e.preventDefault();
        setPaused(function (p) {
          return !p;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setWpm(function (v) {
          return Math.min(900, v + 20);
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setWpm(function (v) {
          return Math.max(100, v - 20);
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        ctrl ? jumpChapter(-1) : jumpBy(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        ctrl ? jumpChapter(1) : jumpBy(1);
      } else if (e.key === ',') setIdx(function (i) {
        var _tokens$n;
        var n = nextVisibleIndex(i, -1);
        var t = (_tokens$n = tokens[n]) === null || _tokens$n === void 0 ? void 0 : _tokens$n.type;
        if (t === 'image' || t === 'chapter_heading') setPaused(true);
        return n;
      });else if (e.key === '.') setIdx(function (i) {
        var _tokens$n2;
        var n = nextVisibleIndex(i, 1);
        var t = (_tokens$n2 = tokens[n]) === null || _tokens$n2 === void 0 ? void 0 : _tokens$n2.type;
        if (t === 'image' || t === 'chapter_heading') setPaused(true);
        return n;
      });else if (e.key === 'Escape') {
        setPaused(true);
        setShowSettings(false);
        (onEscapeClose || onClose)();
      } else if (e.key === 's' || e.key === 'S') setShowSettings(function (s) {
        return !s;
      });else if (e.key === 'p' || e.key === 'P') {
        setPaused(true);
        setShowPageView(true);
      } else if (e.key === '?') setShowHelp(function (h) {
        return !h;
      });
    };
    window.addEventListener('keydown', onKey);
    return function () {
      return window.removeEventListener('keydown', onKey);
    };
  }, [tokens, onClose, onEscapeClose, showSettings, showPageView, jumpBy, jumpChapter, nextVisibleIndex, escapeToClose]);
  useEffect(function () {
    try {
      window.focus();
    } catch (_) {}
  }, []);

  // Unsupported book
  if (book.unsupported) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: theme.bg,
        color: theme.ink,
        padding: 40,
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: '"Source Serif 4", Georgia, serif',
        fontSize: 32,
        fontWeight: 600
      }
    }, book.title), /*#__PURE__*/React.createElement(Mono, {
      size: 11,
      opacity: 0.55,
      style: {
        marginTop: 8
      }
    }, book.format, " couldn't be parsed"), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 460,
        marginTop: 24,
        fontSize: 16,
        lineHeight: 1.6,
        opacity: 0.75
      }
    }, book.unsupportedReason || 'Unknown error.', " If this is an Amazon file (KF8/AZW3 with HUFF/CDIC or DRM), convert it with Calibre and re-add."), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: _objectSpread(_objectSpread({}, secondaryBtn(theme)), {}, {
        marginTop: 32
      })
    }, I.back(14), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 10
      }
    }, "Back to library")));
  }
  if (!tokens.length) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.bg,
        color: theme.ink
      }
    }, /*#__PURE__*/React.createElement(Mono, null, "Empty book"));
  }
  var token = tokens[idx];
  var overall = idx / Math.max(1, tokens.length - 1);
  var wordsLeft = Math.max(0, totalWordCount - currentWordIndex);
  var pagesLeft = Math.ceil(wordsLeft / 250);

  // Render RSVP display
  var renderDisplay = function renderDisplay() {
    if (!token) return null;
    if (token.type === 'paragraph_break') return null;
    if (token.type === 'image') {
      return /*#__PURE__*/React.createElement("img", {
        src: token.dataUrl,
        alt: "",
        style: {
          maxWidth: '95%',
          maxHeight: '85vh',
          objectFit: 'contain',
          borderRadius: 4
        }
      });
    }
    if (token.type === 'chapter_heading') {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12
        }
      }, /*#__PURE__*/React.createElement(Mono, {
        size: 11,
        opacity: 0.45
      }, "Chapter"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: fontFamily,
          fontSize: settings.fontSize,
          lineHeight: 1,
          letterSpacing: -1,
          fontWeight: 600,
          color: theme.ink
        }
      }, token.text));
    }
    if (settings.multiWord && displayGroup.length > 1) {
      return /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: fontFamily,
          fontSize: settings.fontSize,
          lineHeight: 1,
          letterSpacing: -1,
          color: theme.ink
        }
      }, displayGroup.map(function (t, i) {
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: i
        }, i > 0 && /*#__PURE__*/React.createElement("span", {
          className: "mw-space"
        }, ' '), t.strong ? /*#__PURE__*/React.createElement("span", {
          style: {
            fontWeight: 700
          }
        }, t.text) : settings.bionicBold ? function () {
          var _bionicSplit3 = bionicSplit(t.text, settings.bionicRatio),
            _bionicSplit4 = _slicedToArray(_bionicSplit3, 2),
            head = _bionicSplit4[0],
            tail = _bionicSplit4[1];
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
            style: {
              fontWeight: 700
            }
          }, head), /*#__PURE__*/React.createElement("span", {
            style: {
              fontWeight: 300
            }
          }, tail));
        }() : t.text);
      }));
    }
    if (token.strong) {
      return /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: fontFamily,
          fontSize: settings.fontSize,
          lineHeight: 1,
          letterSpacing: -1,
          color: theme.ink,
          fontWeight: 700
        }
      }, token.text);
    }
    return /*#__PURE__*/React.createElement(FocusWord, {
      word: token.text,
      size: settings.fontSize,
      color: theme.ink,
      ratio: settings.bionicRatio,
      bionic: settings.bionicBold,
      fontFamily: fontFamily
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setPaused(function (p) {
        return !p;
      });
    },
    style: {
      height: '100%',
      background: theme.bg,
      color: theme.ink,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      cursor: 'pointer',
      userSelect: 'none'
    }
  }, showTopChrome && (token === null || token === void 0 ? void 0 : token.type) !== 'image' && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      padding: '20px 28px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      opacity: paused ? 1 : 0,
      transition: 'opacity 200ms',
      pointerEvents: paused ? 'auto' : 'none',
      zIndex: 5
    },
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: iconBtn(theme)
  }, I.back(18)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 14,
      fontWeight: 600
    }
  }, book.title), /*#__PURE__*/React.createElement(Mono, {
    size: 9,
    opacity: 0.55,
    style: {
      marginTop: 2,
      display: 'block'
    }
  }, ((_book$chapters$curren = book.chapters[currentChapter]) === null || _book$chapters$curren === void 0 ? void 0 : _book$chapters$curren.title) || 'Ch ' + (currentChapter + 1), " - ", Math.round(overall * 100), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setPaused(true);
      setShowPageView(true);
    },
    title: "Page view",
    style: iconBtn(theme)
  }, I.page(18)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowHelp(function (h) {
        return !h;
      });
    },
    title: "Keyboard shortcuts",
    style: iconBtn(theme)
  }, I.help(18)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowSettings(function (s) {
        return !s;
      });
    },
    title: "Settings",
    style: iconBtn(theme)
  }, I.gear(18)))), /*#__PURE__*/React.createElement("div", {
    ref: rsvpContainerRef,
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: (token === null || token === void 0 ? void 0 : token.type) === 'image' ? 0 : 18,
      padding: (token === null || token === void 0 ? void 0 : token.type) === 'image' ? '0 8px' : '0 40px'
    }
  }, settings.focusMarks && (token === null || token === void 0 ? void 0 : token.type) !== 'image' && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 24,
      background: theme.ink,
      opacity: 0.85
    }
  }), renderDisplay(), settings.focusMarks && (token === null || token === void 0 ? void 0 : token.type) !== 'image' && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 24,
      background: theme.ink,
      opacity: 0.85
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 28px 28px',
      display: (token === null || token === void 0 ? void 0 : token.type) === 'image' && !paused ? 'none' : 'block'
    },
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      opacity: paused ? 1 : 0,
      visibility: paused ? 'visible' : 'hidden',
      transition: 'opacity 200ms',
      pointerEvents: paused ? 'auto' : 'none'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPaused(function (p) {
        return !p;
      });
    },
    style: {
      width: 56,
      height: 56,
      borderRadius: 28,
      background: 'transparent',
      border: "1.5px solid ".concat(theme.ink),
      color: theme.ink,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, paused ? /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 5v14l12-7z"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "6",
    y: "5",
    width: "4",
    height: "14"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "5",
    width: "4",
    height: "14"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    opacity: 0.55
  }, "Speed"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 14
    }
  }, wpm, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      opacity: 0.55
    }
  }, "WPM"))), /*#__PURE__*/React.createElement(Slider, {
    value: wpm,
    min: 100,
    max: 900,
    step: 10,
    onChange: setWpm,
    theme: theme
  }))), /*#__PURE__*/React.createElement(ChapterTickProgress, {
    chapterWordCounts: book.chapters.map(function (c) {
      return c.wordCount;
    }),
    currentChapter: currentChapter,
    chapterPct: currentChapterPct,
    color: theme.ink,
    expanded: paused,
    totalWords: totalWordCount,
    wordsRead: currentWordIndex,
    wpm: wpm,
    statMode: statMode,
    onStatClick: function onStatClick() {
      return setStatMode(function (m) {
        return (m + 1) % 3;
      });
    }
  })), showSettings && /*#__PURE__*/React.createElement(SettingsPanel, {
    theme: theme,
    settings: settings,
    onSettings: onSettings,
    onClose: function onClose() {
      return setShowSettings(false);
    }
  }), showHelp && /*#__PURE__*/React.createElement(HelpModal, {
    theme: theme,
    onClose: function onClose() {
      return setShowHelp(false);
    }
  }), /*#__PURE__*/React.createElement(PageView, {
    theme: theme,
    bookId: book.id,
    words: flatWordList,
    chapterStarts: wordChapterStarts,
    chapters: book.chapters,
    currentIdx: currentWordIndex,
    visible: showPageView,
    onPick: function onPick(newWordIdx) {
      setIdx(wordIndexToTokenIndex(newWordIdx));
      setShowPageView(false);
    },
    onBookmark: function onBookmark(newWordIdx) {
      setIdx(wordIndexToTokenIndex(newWordIdx));
      setTimeout(function () {
        return setShowPageView(false);
      }, 900);
    },
    onClose: function onClose() {
      return setShowPageView(false);
    },
    onEscape: onEscapeClose || onClose
  }));
}

// -- Chapter tick progress --
function ChapterTickProgress(_ref12) {
  var chapterWordCounts = _ref12.chapterWordCounts,
    currentChapter = _ref12.currentChapter,
    chapterPct = _ref12.chapterPct,
    color = _ref12.color,
    expanded = _ref12.expanded,
    totalWords = _ref12.totalWords,
    wordsRead = _ref12.wordsRead,
    wpm = _ref12.wpm,
    statMode = _ref12.statMode,
    onStatClick = _ref12.onStatClick;
  var chapters = chapterWordCounts.length || 1;

  // Cumulative word positions for each chapter boundary (0 to 1)
  var cumulative = useMemo(function () {
    var total = chapterWordCounts.reduce(function (s, w) {
      return s + w;
    }, 0) || 1;
    var positions = [0];
    var sum = 0;
    var _iterator9 = _createForOfIteratorHelper(chapterWordCounts),
      _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var wc = _step9.value;
        sum += wc;
        positions.push(sum / total);
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
    return positions;
  }, [chapterWordCounts]);

  // Overall position: interpolate within current chapter's proportional range
  var chStart = cumulative[currentChapter] || 0;
  var chEnd = cumulative[currentChapter + 1] || 1;
  var overall = chStart + chapterPct * (chEnd - chStart);
  var wordsLeft = Math.max(0, totalWords - wordsRead);
  var minLeft = wpm ? Math.round(wordsLeft / wpm) : 0;
  var totalPages = Math.ceil(totalWords / 250);
  var currentPage = Math.min(totalPages, Math.ceil(wordsRead / 250) + 1);
  var pagesLeft = Math.max(0, totalPages - currentPage);
  var pct = Math.round(overall * 100);
  var statText = statMode === 0 ? pct + '% done' : statMode === 1 ? '~' + pagesLeft + ' pg left' : '~' + minLeft + 'm remaining';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, expanded && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 11,
    opacity: 0.55
  }, "ch ", String(currentChapter + 1).padStart(2, '0'), " / ", String(chapters).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    onClick: onStatClick,
    style: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 13,
      color: color,
      letterSpacing: 0.4,
      cursor: 'pointer',
      userSelect: 'none'
    }
  }, statText)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 18,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: '50%',
      height: 1,
      background: color,
      opacity: 0.18
    }
  }), cumulative.map(function (pos, i) {
    var passed = i <= currentChapter;
    var isEndpoint = i === 0 || i === chapters;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: "".concat(pos * 100, "%"),
        transform: 'translateX(-50%)',
        width: 1,
        height: isEndpoint ? 12 : 7,
        background: color,
        opacity: passed ? 0.85 : 0.28,
        alignSelf: 'center',
        top: '50%',
        marginTop: isEndpoint ? -6 : -3.5
      }
    });
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: "".concat(overall * 100, "%"),
      top: 0,
      bottom: 0,
      transform: 'translateX(-50%)',
      width: 2,
      background: color
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 11,
    opacity: 0.45
  }, currentPage, " / ", totalPages)));
}

// -- Pagination cache --
function savePaginationCache(bookId, layoutKey, pageModel) {
  try {
    var chapterImgCounters = {};
    var slim = pageModel.pages.map(function (p) {
      return {
        ci: p.chapterIdx,
        pi: p.pageIdx,
        sw: p.startWord,
        ew: p.endWord,
        items: p.items.map(function (it) {
          if (it.type === 'heading') return {
            t: 'h'
          };
          if (it.type === 'image') {
            if (!chapterImgCounters[p.chapterIdx]) chapterImgCounters[p.chapterIdx] = 0;
            return {
              t: 'i',
              ii: chapterImgCounters[p.chapterIdx]++
            };
          }
          return {
            t: 'p',
            a: it.absStartWordIdx,
            f: it.fromWord,
            to: it.toWord
          };
        })
      };
    });
    localStorage.setItem('pg-cache-' + bookId, JSON.stringify({
      layoutKey: layoutKey,
      slim: slim,
      cfp: pageModel.chapterFirstPages
    }));
  } catch (_) {}
}
function loadPaginationCache(bookId, layoutKey) {
  try {
    var raw = localStorage.getItem('pg-cache-' + bookId);
    if (!raw) return null;
    var data = JSON.parse(raw);
    if (data.layoutKey !== layoutKey) return null;
    return data;
  } catch (_) {
    return null;
  }
}
function reconstructPageModel(cache, chapters, chapterStarts, words, buildContentItems) {
  var contentByChapter = {};
  var getContent = function getContent(ci) {
    if (!contentByChapter[ci]) {
      var _chapterStarts$ci, _chapterStarts;
      var cs = (_chapterStarts$ci = chapterStarts[ci]) !== null && _chapterStarts$ci !== void 0 ? _chapterStarts$ci : 0;
      var ce = (_chapterStarts = chapterStarts[ci + 1]) !== null && _chapterStarts !== void 0 ? _chapterStarts : words.length;
      contentByChapter[ci] = buildContentItems(ci, cs, ce);
    }
    return contentByChapter[ci];
  };
  var pages = cache.slim.map(function (sp, gi) {
    var content = getContent(sp.ci);
    var paraMap = {};
    var _iterator0 = _createForOfIteratorHelper(content),
      _step0;
    try {
      for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
        var it = _step0.value;
        if (it.type === 'paragraph') paraMap[it.absStartWordIdx] = it.words;
      }
    } catch (err) {
      _iterator0.e(err);
    } finally {
      _iterator0.f();
    }
    var contentImages = content.filter(function (it) {
      return it.type === 'image';
    });
    var items = sp.items.map(function (it) {
      var _chapters$sp$ci, _it$ii;
      if (it.t === 'h') return {
        type: 'heading',
        text: ((_chapters$sp$ci = chapters[sp.ci]) === null || _chapters$sp$ci === void 0 ? void 0 : _chapters$sp$ci.title) || ''
      };
      if (it.t === 'i') return contentImages[(_it$ii = it.ii) !== null && _it$ii !== void 0 ? _it$ii : 0] || {
        type: 'image',
        dataUrl: ''
      };
      return {
        type: 'paragraph',
        words: paraMap[it.a] || [],
        absStartWordIdx: it.a,
        fromWord: it.f,
        toWord: it.to
      };
    });
    return {
      chapterIdx: sp.ci,
      pageIdx: sp.pi,
      globalPageIdx: gi,
      items: items,
      startWord: sp.sw,
      endWord: sp.ew
    };
  });
  return {
    layoutKey: cache.layoutKey,
    complete: true,
    pages: pages,
    chapterFirstPages: cache.cfp
  };
}

// -- Page view --
function PageView(_ref13) {
  var _ref14, _leftEntry$chapterIdx, _chapters$displayChId;
  var theme = _ref13.theme,
    bookId = _ref13.bookId,
    words = _ref13.words,
    chapterStarts = _ref13.chapterStarts,
    chapters = _ref13.chapters,
    currentIdx = _ref13.currentIdx,
    onPick = _ref13.onPick,
    onBookmark = _ref13.onBookmark,
    onClose = _ref13.onClose,
    onEscape = _ref13.onEscape,
    _ref13$visible = _ref13.visible,
    visible = _ref13$visible === void 0 ? true : _ref13$visible;
  var chOf = useCallback(function (wordIdx) {
    var c = 0;
    for (var i = 0; i < chapterStarts.length; i++) {
      if (chapterStarts[i] <= wordIdx) c = i;else break;
    }
    return c;
  }, [chapterStarts]);
  var currentIdxRef = useRef(currentIdx);
  currentIdxRef.current = currentIdx;
  var _useState15 = useState(0),
    _useState16 = _slicedToArray(_useState15, 2),
    spreadIdx = _useState16[0],
    setSpreadIdx = _useState16[1];
  var _useState17 = useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    toast = _useState18[0],
    setToast = _useState18[1];
  var _useState19 = useState(null),
    _useState20 = _slicedToArray(_useState19, 2),
    longPressIdx = _useState20[0],
    setLongPressIdx = _useState20[1];
  var _useState21 = useState({
      w: 0,
      h: 0
    }),
    _useState22 = _slicedToArray(_useState21, 2),
    containerSize = _useState22[0],
    setContainerSize = _useState22[1];
  var _useState23 = useState(null),
    _useState24 = _slicedToArray(_useState23, 2),
    pageModel = _useState24[0],
    setPageModel = _useState24[1];
  var initialScrollDone = useRef(false);
  var fullModelAppliedRef = useRef(null);
  var activePageIdentityRef = useRef({
    chapterIdx: chOf(currentIdx),
    pageIdx: 0
  });
  var spreadIdxRef = useRef(0);
  var displayChIdxRef = useRef(chOf(currentIdx));
  var buildContentItems = useCallback(function (chIdx, windowStart, windowEnd) {
    var _chapterStarts$chIdx;
    var ch = chapters[chIdx];
    if (!ch) return [];
    var items = [];
    var imagesByParagraph = {};
    if (ch.images) {
      var _iterator1 = _createForOfIteratorHelper(ch.images),
        _step1;
      try {
        for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
          var img = _step1.value;
          var pi = img.afterParagraph || 0;
          if (!imagesByParagraph[pi]) imagesByParagraph[pi] = [];
          imagesByParagraph[pi].push(img.dataUrl);
        }
      } catch (err) {
        _iterator1.e(err);
      } finally {
        _iterator1.f();
      }
    }
    var paragraphs = normalizeAppSplitNumberLines(ch.text).split(/\n\s*\n/);
    var normalizedImages = normalizeImageBreaks(paragraphs, imagesByParagraph);
    var wordIdx = 0;
    var chStart = (_chapterStarts$chIdx = chapterStarts[chIdx]) !== null && _chapterStarts$chIdx !== void 0 ? _chapterStarts$chIdx : 0;
    for (var _pi2 = 0; _pi2 < paragraphs.length; _pi2++) {
      var expanded = applyInlineMarkdownWordStyles(splitReadableWords(paragraphs[_pi2])).map(function (w) {
        return w.text;
      });
      if (expanded.length > 0) {
        var paraStart = chStart + wordIdx;
        var from = Math.max(0, windowStart - paraStart);
        var to = Math.min(expanded.length, windowEnd - paraStart);
        if (from < to) {
          items.push({
            type: 'paragraph',
            words: expanded.slice(from, to),
            absStartWordIdx: paraStart + from
          });
        }
        wordIdx += expanded.length;
      }
      if (normalizedImages[_pi2]) {
        var imageAnchor = chStart + wordIdx;
        if (imageAnchor >= windowStart && imageAnchor <= windowEnd) {
          var _iterator10 = _createForOfIteratorHelper(normalizedImages[_pi2]),
            _step10;
          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var dataUrl = _step10.value;
              items.push({
                type: 'image',
                dataUrl: dataUrl
              });
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }
        }
      }
    }
    return items;
  }, [chapters, chapterStarts]);
  var spreadContainerRef = useRef(null);
  var measurerRef = useRef(null);
  useEffect(function () {
    if (!spreadContainerRef.current) return;
    var measure = function measure() {
      var el = spreadContainerRef.current;
      if (!el) return;
      var r = el.getBoundingClientRect();
      setContainerSize({
        w: Math.floor((r.width - 1) / 2),
        h: Math.floor(r.height)
      });
    };
    measure();
    var ro = new ResizeObserver(measure);
    ro.observe(spreadContainerRef.current);
    return function () {
      return ro.disconnect();
    };
  }, []);

  // Auto font size: fit ~28-32 lines in the available height
  var autoFontSize = useMemo(function () {
    if (containerSize.h === 0) return 18;
    var padding = 96; // 48px top + 48px bottom
    return Math.max(14, Math.min(24, Math.floor((containerSize.h - padding) / 48)));
  }, [containerSize.h]);

  // Max image height in pixels (40% of page height), used in both measurement and render
  var imgMaxH = useMemo(function () {
    return Math.max(200, Math.floor(containerSize.h * 0.4));
  }, [containerSize.h]);
  var layoutKey = useMemo(function () {
    if (!containerSize.w || !containerSize.h) return null;
    return ['v1', 'w' + containerSize.w, 'h' + containerSize.h, 'fs' + autoFontSize, 'lh165', 'img' + imgMaxH, 'chapters' + chapters.length, 'words' + words.length].join('-');
  }, [containerSize.w, containerSize.h, autoFontSize, imgMaxH, chapters.length, words.length]);
  var paginateChapter = useCallback(function (chapterIdx, windowStart, windowEnd) {
    var _chapterStarts$chapte, _chapters$chapterIdx;
    if (containerSize.w === 0 || containerSize.h === 0 || chapters.length === 0) return [];
    var m = measurerRef.current;
    if (!m) return [];
    m.style.width = containerSize.w + 'px';
    m.style.height = 'auto';
    m.style.fontSize = autoFontSize + 'px';
    var maxH = containerSize.h;

    // Helper: how many words fit given baseHTML already on the page
    var fitWords = function fitWords(words, baseHTML) {
      m.innerHTML = baseHTML + '<p style="margin:0 0 0.6em 0;">' + words.join(' ') + ' </p>';
      if (m.scrollHeight <= maxH) return words.length;
      var lo = 0,
        hi = words.length;
      while (lo + 1 < hi) {
        var mid = lo + hi >> 1;
        m.innerHTML = baseHTML + '<p style="margin:0 0 0.6em 0;">' + words.slice(0, mid).join(' ') + ' </p>';
        if (m.scrollHeight > maxH) hi = mid;else lo = mid;
      }
      return lo;
    };
    var contentItems = buildContentItems(chapterIdx, windowStart, windowEnd);
    var pages = [];
    var page = [];
    var html = '';
    var pushPage = function pushPage() {
      if (page.length > 0) {
        pages.push(page);
        page = [];
        html = '';
      }
    };
    var chapterStart = (_chapterStarts$chapte = chapterStarts[chapterIdx]) !== null && _chapterStarts$chapte !== void 0 ? _chapterStarts$chapte : 0;

    // Chapter heading only belongs to the real first page of the chapter.
    if ((_chapters$chapterIdx = chapters[chapterIdx]) !== null && _chapters$chapterIdx !== void 0 && _chapters$chapterIdx.title && windowStart <= chapterStart) {
      var safe = chapters[chapterIdx].title.replace(/</g, '&lt;');
      html = '<div style="font-size:1.5em;font-weight:600;margin:0 0 0.8em 0;line-height:1.25;text-align:left">' + safe + '</div>';
      page.push({
        type: 'heading',
        text: chapters[chapterIdx].title
      });
    }
    var _iterator11 = _createForOfIteratorHelper(contentItems),
      _step11;
    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var item = _step11.value;
        if (item.type === 'image') {
          var imgH = '<div style="text-align:center;margin:0.8em 0"><div style="width:100%;height:' + imgMaxH + 'px"></div></div>';
          m.innerHTML = html + imgH;
          if (page.length > 0 && m.scrollHeight > maxH) pushPage();
          page.push({
            type: 'image',
            dataUrl: item.dataUrl
          });
          html += imgH;
          continue;
        }

        // Paragraph, fill current page and overflow to new pages
        var from = 0;
        while (from < item.words.length) {
          var slice = item.words.slice(from);
          var fit = fitWords(slice, html);
          if (fit === 0 && page.length === 0) fit = 1;
          if (fit === 0) {
            pushPage();
            continue;
          }
          var to = from + fit;
          var pH = '<p style="margin:0 0 0.6em 0;">' + item.words.slice(from, to).join(' ') + ' </p>';
          page.push({
            type: 'paragraph',
            words: item.words,
            absStartWordIdx: item.absStartWordIdx,
            fromWord: from,
            toWord: to
          });
          html += pH;
          from = to;
          if (from < item.words.length) pushPage();
        }
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
    if (page.length > 0) pages.push(page);
    return pages;
  }, [containerSize, autoFontSize, chapters, chapterStarts, buildContentItems, imgMaxH]);
  var pageWordRange = useCallback(function (pageItems, fallbackWord) {
    var start = Infinity;
    var end = -Infinity;
    var _iterator12 = _createForOfIteratorHelper(pageItems || []),
      _step12;
    try {
      for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
        var item = _step12.value;
        if (item.type !== 'paragraph' && item.type !== 'partial') continue;
        start = Math.min(start, item.absStartWordIdx + item.fromWord);
        end = Math.max(end, item.absStartWordIdx + item.toWord);
      }
    } catch (err) {
      _iterator12.e(err);
    } finally {
      _iterator12.f();
    }
    if (!Number.isFinite(start) || !Number.isFinite(end)) return {
      start: fallbackWord,
      end: fallbackWord
    };
    return {
      start: start,
      end: end
    };
  }, []);
  useEffect(function () {
    if (!layoutKey || !measurerRef.current || containerSize.w === 0 || containerSize.h === 0) return;
    var cancelled = false;
    var activeChapter = chOf(currentIdxRef.current);
    initialScrollDone.current = false;
    fullModelAppliedRef.current = null;
    setPageModel(null);

    // Try cached pagination first
    var cached = loadPaginationCache(bookId, layoutKey);
    if (cached) {
      var restored = reconstructPageModel(cached, chapters, chapterStarts, words, buildContentItems);
      if (!cancelled && restored.pages.length > 0) {
        setPageModel(restored);
        return;
      }
    }
    var buildChapterEntries = function buildChapterEntries(chapterIdx) {
      var _chapterStarts$chapte2, _chapterStarts2;
      var basePage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var chapterStart = (_chapterStarts$chapte2 = chapterStarts[chapterIdx]) !== null && _chapterStarts$chapte2 !== void 0 ? _chapterStarts$chapte2 : 0;
      var chapterEnd = (_chapterStarts2 = chapterStarts[chapterIdx + 1]) !== null && _chapterStarts2 !== void 0 ? _chapterStarts2 : words.length;
      var chapterPageItems = paginateChapter(chapterIdx, chapterStart, chapterEnd);
      return chapterPageItems.map(function (items, pageIdx) {
        var range = pageWordRange(items, chapterStart);
        return {
          chapterIdx: chapterIdx,
          pageIdx: pageIdx,
          globalPageIdx: basePage + pageIdx,
          items: items,
          startWord: range.start,
          endWord: range.end
        };
      });
    };
    var activeEntries = buildChapterEntries(activeChapter, 0);
    if (!cancelled) {
      setPageModel({
        layoutKey: layoutKey,
        complete: false,
        pages: activeEntries,
        chapterFirstPages: _defineProperty({}, activeChapter, 0),
        activeChapter: activeChapter
      });
    }
    var pages = [];
    var chapterFirstPages = [];
    var chapterIdx = 0;
    var _buildNextChapter = function buildNextChapter() {
      if (cancelled) return;
      chapterFirstPages[chapterIdx] = pages.length;
      pages.push.apply(pages, _toConsumableArray(buildChapterEntries(chapterIdx, pages.length)));
      chapterIdx++;
      if (chapterIdx < chapters.length) {
        setTimeout(_buildNextChapter, 0);
        return;
      }
      if (!cancelled) {
        var fullModel = {
          layoutKey: layoutKey,
          complete: true,
          pages: pages,
          chapterFirstPages: chapterFirstPages
        };
        setPageModel(fullModel);
        savePaginationCache(bookId, layoutKey, fullModel);
      }
    };
    setTimeout(_buildNextChapter, 0);
    return function () {
      cancelled = true;
    };
  }, [layoutKey, containerSize.w, containerSize.h, chapters.length, chapterStarts, words.length, chOf, paginateChapter, pageWordRange, bookId, buildContentItems]);
  var pagesReady = !!pageModel && pageModel.layoutKey === layoutKey && pageModel.pages.length > 0;
  var fullPagesReady = pagesReady && pageModel.complete;
  var pages = pagesReady ? pageModel.pages : [];

  // Re-scroll when becoming visible or when pages become ready
  var prevVisibleRef = useRef(visible);
  useEffect(function () {
    var justBecameVisible = visible && !prevVisibleRef.current;
    prevVisibleRef.current = visible;
    if (!pagesReady) return;
    if (initialScrollDone.current && !justBecameVisible) return;
    var targetPage = 0;
    var wordIdx = currentIdxRef.current;
    for (var i = 0; i < pages.length; i++) {
      if (pages[i].endWord > wordIdx) {
        targetPage = i;
        break;
      }
    }
    var targetEntry = pages[targetPage];
    if (targetEntry) {
      activePageIdentityRef.current = {
        chapterIdx: targetEntry.chapterIdx,
        pageIdx: targetEntry.pageIdx
      };
    }
    var nextSpread = Math.floor(targetPage / 2);
    spreadIdxRef.current = nextSpread;
    setSpreadIdx(nextSpread);
    initialScrollDone.current = true;
  }, [pagesReady, pages, visible]);
  useEffect(function () {
    spreadIdxRef.current = spreadIdx;
  }, [spreadIdx]);
  var leftPageIdx = spreadIdx * 2;
  var rightPageIdx = spreadIdx * 2 + 1;
  var leftEntry = pages[leftPageIdx];
  var rightEntry = pages[rightPageIdx];
  var leftPage = (leftEntry === null || leftEntry === void 0 ? void 0 : leftEntry.items) || [];
  var rightPage = (rightEntry === null || rightEntry === void 0 ? void 0 : rightEntry.items) || [];
  var displayChIdx = (rightEntry === null || rightEntry === void 0 ? void 0 : rightEntry.pageIdx) === 0 ? rightEntry.chapterIdx : (_ref14 = (_leftEntry$chapterIdx = leftEntry === null || leftEntry === void 0 ? void 0 : leftEntry.chapterIdx) !== null && _leftEntry$chapterIdx !== void 0 ? _leftEntry$chapterIdx : rightEntry === null || rightEntry === void 0 ? void 0 : rightEntry.chapterIdx) !== null && _ref14 !== void 0 ? _ref14 : chOf(currentIdx);
  var hasMorePages = pagesReady && leftPageIdx + 2 < pages.length;
  var prevDisabled = !pagesReady || spreadIdx === 0;
  useEffect(function () {
    if (!fullPagesReady || fullModelAppliedRef.current === layoutKey) return;
    var active = activePageIdentityRef.current;
    var targetPage = pages.findIndex(function (p) {
      return p.chapterIdx === active.chapterIdx && p.pageIdx === active.pageIdx;
    });
    if (targetPage < 0) {
      targetPage = pages.findIndex(function (p) {
        return p.endWord > currentIdxRef.current;
      });
    }
    if (targetPage < 0) targetPage = 0;
    var nextSpread = Math.floor(targetPage / 2);
    spreadIdxRef.current = nextSpread;
    setSpreadIdx(nextSpread);
    fullModelAppliedRef.current = layoutKey;
  }, [fullPagesReady, layoutKey, pages]);
  useEffect(function () {
    var activeEntry = leftEntry || rightEntry;
    if (activeEntry) {
      activePageIdentityRef.current = {
        chapterIdx: activeEntry.chapterIdx,
        pageIdx: activeEntry.pageIdx
      };
    }
  }, [leftEntry, rightEntry]);
  useEffect(function () {
    displayChIdxRef.current = displayChIdx;
  }, [displayChIdx]);
  var goPrev = useCallback(function () {
    if (spreadIdxRef.current <= 0) return;
    var nextSpread = spreadIdxRef.current - 1;
    spreadIdxRef.current = nextSpread;
    setSpreadIdx(nextSpread);
  }, []);
  var goNext = useCallback(function () {
    if (!pagesReady || spreadIdxRef.current * 2 + 2 >= pages.length) return;
    var nextSpread = spreadIdxRef.current + 1;
    spreadIdxRef.current = nextSpread;
    setSpreadIdx(nextSpread);
  }, [pagesReady, pages.length]);
  var goChapter = useCallback(function (dir) {
    var _pageModel$chapterFir;
    if (!fullPagesReady) return;
    var nextCh = Math.max(0, Math.min(chapters.length - 1, displayChIdxRef.current + dir));
    var firstPage = (_pageModel$chapterFir = pageModel.chapterFirstPages[nextCh]) !== null && _pageModel$chapterFir !== void 0 ? _pageModel$chapterFir : 0;
    var nextSpread = Math.floor(firstPage / 2);
    spreadIdxRef.current = nextSpread;
    displayChIdxRef.current = nextCh;
    setSpreadIdx(nextSpread);
  }, [fullPagesReady, chapters.length, pageModel]);
  useEffect(function () {
    if (!visible) return;
    var onKey = function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      var ctrl = e.ctrlKey || e.metaKey;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        ctrl ? goChapter(-1) : goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        ctrl ? goChapter(1) : goNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return function () {
      return window.removeEventListener('keydown', onKey);
    };
  }, [visible, onClose, onEscape, goPrev, goNext, goChapter]);
  useEffect(function () {
    try {
      window.focus();
    } catch (_) {}
  }, []);
  var pressTimer = useRef(null);
  var startPress = function startPress(absIdx) {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    pressTimer.current = setTimeout(function () {
      setLongPressIdx(absIdx);
      onBookmark(absIdx);
      setToast('Bookmarked, will resume here next time');
      setTimeout(function () {
        return setToast(null);
      }, 1800);
      pressTimer.current = null;
    }, 600);
  };
  var endPress = function endPress(absIdx) {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
      onPick(absIdx);
    }
  };
  var cancelPress = function cancelPress() {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };
  var renderWord = function renderWord(w, absIdx) {
    var isCurrent = absIdx === currentIdx;
    var isBookmark = absIdx === longPressIdx;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: absIdx
    }, /*#__PURE__*/React.createElement("span", {
      onPointerDown: function onPointerDown(e) {
        e.preventDefault();
        startPress(absIdx);
      },
      onPointerUp: function onPointerUp() {
        return endPress(absIdx);
      },
      onPointerLeave: cancelPress,
      onPointerCancel: cancelPress,
      onContextMenu: function onContextMenu(e) {
        return e.preventDefault();
      },
      style: {
        cursor: 'pointer',
        background: isBookmark ? theme.invertedBg : isCurrent ? theme.highlight : 'transparent',
        color: isBookmark ? theme.invertedInk : 'inherit',
        padding: isBookmark || isCurrent ? '2px 4px' : '2px 0',
        borderRadius: 2,
        transition: 'background 120ms',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }
    }, w), ' ');
  };
  var PAGE_PADDING = '48px 56px';
  var PAGE_FONT = {
    fontFamily: '"Source Serif 4", Georgia, serif',
    fontSize: autoFontSize,
    lineHeight: 1.65,
    textAlign: 'justify',
    hyphens: 'auto'
  };
  var pageStyle = _objectSpread(_objectSpread({
    flex: 1,
    padding: PAGE_PADDING
  }, PAGE_FONT), {}, {
    overflow: 'hidden',
    minWidth: 0,
    boxSizing: 'border-box'
  });
  var chapterTitle = ((_chapters$displayChId = chapters[displayChIdx]) === null || _chapters$displayChId === void 0 ? void 0 : _chapters$displayChId.title) || 'Chapter ' + (displayChIdx + 1);

  // Render a page from its content items
  var renderPage = function renderPage(pageItems) {
    if (!pageItems || pageItems.length === 0) return null;
    var elements = [];
    var paraCount = 0;
    var _loop = function _loop() {
      var item = pageItems[ii];
      if (item.type === 'heading') {
        elements.push(/*#__PURE__*/React.createElement("div", {
          key: "ch-heading",
          style: {
            fontSize: '1.5em',
            fontWeight: 600,
            marginBottom: '0.8em',
            lineHeight: 1.25,
            textAlign: 'left'
          }
        }, item.text));
      } else if (item.type === 'image') {
        elements.push(/*#__PURE__*/React.createElement("div", {
          key: 'img' + ii,
          style: {
            textAlign: 'center',
            margin: '0.8em 0'
          }
        }, /*#__PURE__*/React.createElement("img", {
          src: item.dataUrl,
          alt: "",
          style: {
            maxWidth: '100%',
            maxHeight: imgMaxH,
            objectFit: 'contain',
            borderRadius: 2
          }
        })));
      } else if (item.type === 'paragraph' || item.type === 'partial') {
        var indent = paraCount > 0 ? '1.5em' : 0;
        var wordSlice = item.words.slice(item.fromWord, item.toWord);
        elements.push(/*#__PURE__*/React.createElement("p", {
          key: 'p' + ii,
          style: {
            margin: '0 0 0.6em 0',
            textIndent: indent
          }
        }, wordSlice.map(function (w, wi) {
          return renderWord(w, item.absStartWordIdx + item.fromWord + wi);
        })));
        paraCount++;
      }
    };
    for (var ii = 0; ii < pageItems.length; ii++) {
      _loop();
    }
    return elements;
  };
  var chapterNum = displayChIdx + 1;
  var spreadWordRange = useMemo(function () {
    var _chapterStarts$displa, _leftRange$start, _rightRange$start, _leftRange$end, _rightRange$end;
    var fallback = (_chapterStarts$displa = chapterStarts[displayChIdx]) !== null && _chapterStarts$displa !== void 0 ? _chapterStarts$displa : 0;
    var leftRange = leftEntry ? {
      start: leftEntry.startWord,
      end: leftEntry.endWord
    } : null;
    var rightRange = rightEntry ? {
      start: rightEntry.startWord,
      end: rightEntry.endWord
    } : null;
    var start = Math.min((_leftRange$start = leftRange === null || leftRange === void 0 ? void 0 : leftRange.start) !== null && _leftRange$start !== void 0 ? _leftRange$start : Infinity, (_rightRange$start = rightRange === null || rightRange === void 0 ? void 0 : rightRange.start) !== null && _rightRange$start !== void 0 ? _rightRange$start : Infinity);
    var end = Math.max((_leftRange$end = leftRange === null || leftRange === void 0 ? void 0 : leftRange.end) !== null && _leftRange$end !== void 0 ? _leftRange$end : -Infinity, (_rightRange$end = rightRange === null || rightRange === void 0 ? void 0 : rightRange.end) !== null && _rightRange$end !== void 0 ? _rightRange$end : -Infinity);
    if (!Number.isFinite(start) || !Number.isFinite(end)) return {
      start: fallback,
      end: fallback
    };
    return {
      start: start,
      end: end
    };
  }, [leftEntry, rightEntry, chapterStarts, displayChIdx]);
  var spreadProgressWord = Math.max(0, Math.min(words.length, spreadWordRange.start));
  var chapterProgressPct = useMemo(function () {
    var _chapterStarts$displa2, _chapterStarts3;
    var start = (_chapterStarts$displa2 = chapterStarts[displayChIdx]) !== null && _chapterStarts$displa2 !== void 0 ? _chapterStarts$displa2 : 0;
    var end = (_chapterStarts3 = chapterStarts[displayChIdx + 1]) !== null && _chapterStarts3 !== void 0 ? _chapterStarts3 : words.length;
    var span = Math.max(1, end - start);
    var visibleStart = Math.max(start, Math.min(end, spreadProgressWord));
    return Math.max(0, Math.min(1, (visibleStart - start) / span));
  }, [chapterStarts, displayChIdx, words.length, spreadProgressWord]);
  var spreadLabel = fullPagesReady ? leftPageIdx + 1 + '-' + Math.min(rightPageIdx + 1, pages.length) + ' / ' + pages.length : pagesReady ? 'spread ' + (spreadIdx + 1) + ' / indexing' : 'paginating';
  return /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      position: 'absolute',
      inset: 0,
      background: theme.bg,
      color: theme.ink,
      display: 'flex',
      flexDirection: 'column',
      zIndex: visible ? 20 : -1,
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 24px',
      borderBottom: "0.5px solid ".concat(theme.hairline),
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: _objectSpread(_objectSpread({}, iconBtn(theme)), {}, {
      width: 'auto',
      padding: '0 12px',
      display: 'flex',
      gap: 8
    })
  }, I.back(16), " ", /*#__PURE__*/React.createElement(Mono, {
    size: 10
  }, "Read")), /*#__PURE__*/React.createElement(Mono, {
    size: 10,
    opacity: 0.55,
    style: {
      flex: 1,
      textAlign: 'center'
    }
  }, chapterTitle), /*#__PURE__*/React.createElement(Mono, {
    size: 10,
    opacity: 0.55,
    style: {
      width: 140,
      textAlign: 'right'
    }
  }, "ch.", chapterNum, '  ', spreadLabel)), /*#__PURE__*/React.createElement("div", {
    ref: spreadContainerRef,
    style: {
      flex: 1,
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: pageStyle
  }, renderPage(leftPage)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: theme.hairline,
      margin: '40px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: pageStyle
  }, renderPage(rightPage)), !pagesReady && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 22,
      fontWeight: 600,
      marginBottom: 8
    }
  }, "Preparing page view"), /*#__PURE__*/React.createElement(Mono, {
    size: 10,
    opacity: 0.45
  }, "Paginating current chapter"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 160,
      height: 1,
      background: theme.hairline,
      margin: '18px auto 0',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 1,
      background: theme.ink,
      animation: 'indeterminate 1100ms ease-in-out infinite'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    ref: measurerRef,
    "aria-hidden": "true",
    style: _objectSpread(_objectSpread({
      position: 'absolute',
      visibility: 'hidden',
      pointerEvents: 'none',
      top: 0,
      left: -99999,
      width: containerSize.w || '50%',
      padding: PAGE_PADDING
    }, PAGE_FONT), {}, {
      boxSizing: 'border-box',
      whiteSpace: 'normal',
      wordBreak: 'normal'
    })
  }), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Previous page",
    onClick: goPrev,
    disabled: prevDisabled,
    style: navZone(theme, 'left', prevDisabled)
  }, I.back(20)), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Next page",
    onClick: goNext,
    disabled: !hasMorePages,
    style: navZone(theme, 'right', !hasMorePages)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      transform: 'scaleX(-1)'
    }
  }, I.back(20)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 24px 12px',
      borderTop: "0.5px solid ".concat(theme.hairline),
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto 6px'
    }
  }, /*#__PURE__*/React.createElement(ChapterTickProgress, {
    chapterWordCounts: chapters.map(function (c) {
      return c.wordCount;
    }),
    currentChapter: displayChIdx,
    chapterPct: chapterProgressPct,
    color: theme.ink,
    expanded: false,
    totalWords: words.length,
    wordsRead: spreadProgressWord
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 10,
    opacity: 0.5
  }, "tap a word to read from there"))), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 80,
      left: '50%',
      transform: 'translateX(-50%)',
      background: theme.invertedBg,
      color: theme.invertedInk,
      padding: '10px 18px',
      borderRadius: 22,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 11,
      letterSpacing: 0.8,
      zIndex: 30,
      animation: 'fadeUp 200ms ease-out'
    }
  }, toast));
}
function navZone(theme, side, disabled) {
  var _ref15;
  return _ref15 = {
    position: 'absolute',
    top: 0,
    bottom: 0
  }, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_ref15, side, 0), "width", 56), "background", 'transparent'), "border", 'none'), "cursor", disabled ? 'default' : 'pointer'), "display", 'flex'), "alignItems", 'center'), "justifyContent", 'center'), "color", theme.ink), "opacity", disabled ? 0.15 : 0.4), _defineProperty(_ref15, "transition", 'opacity 150ms');
}

// -- Settings panel --
function SettingsPanel(_ref16) {
  var _FONTS$find, _settings$paragraphPa3, _settings$paragraphPa4, _settings$longWordThr2, _settings$longWordThr3, _settings$longWordMs2, _settings$longWordMs3;
  var theme = _ref16.theme,
    settings = _ref16.settings,
    onSettings = _ref16.onSettings,
    onClose = _ref16.onClose;
  var stop = function stop(e) {
    return e.stopPropagation();
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: stop,
    style: {
      width: 520,
      maxWidth: '90vw',
      maxHeight: '85vh',
      overflow: 'auto',
      background: theme.bg,
      border: "0.75px solid ".concat(theme.ink),
      padding: 28,
      color: theme.ink
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 24,
      fontWeight: 600
    }
  }, "Settings"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: iconBtn(theme)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12"
  })))), /*#__PURE__*/React.createElement(Mono, {
    size: 10,
    opacity: 0.45,
    style: {
      display: 'block',
      marginBottom: 12
    }
  }, "Reading"), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Font",
    sub: (_FONTS$find = FONTS.find(function (f) {
      return f.id === settings.font;
    })) === null || _FONTS$find === void 0 ? void 0 : _FONTS$find.label
  }, /*#__PURE__*/React.createElement(ToggleGroup, {
    options: FONTS.map(function (f) {
      return {
        value: f.id,
        label: f.label
      };
    }),
    value: settings.font,
    onChange: function onChange(v) {
      return onSettings({
        font: v
      });
    },
    theme: theme
  })), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Font size",
    sub: settings.fontSize + ' px'
  }, /*#__PURE__*/React.createElement(Slider, {
    value: settings.fontSize,
    min: 48,
    max: 220,
    step: 4,
    theme: theme,
    onChange: function onChange(v) {
      return onSettings({
        fontSize: v
      });
    }
  })), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Bionic bold"
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: settings.bionicBold,
    onChange: function onChange(v) {
      return onSettings({
        bionicBold: v
      });
    },
    theme: theme
  })), settings.bionicBold && /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Bionic ratio",
    sub: 'bold first ' + Math.round(settings.bionicRatio * 100) + '%'
  }, /*#__PURE__*/React.createElement(Slider, {
    value: settings.bionicRatio * 100,
    min: 20,
    max: 60,
    step: 5,
    theme: theme,
    onChange: function onChange(v) {
      return onSettings({
        bionicRatio: v / 100
      });
    }
  })), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Focus marks"
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: settings.focusMarks,
    onChange: function onChange(v) {
      return onSettings({
        focusMarks: v
      });
    },
    theme: theme
  })), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Word mode"
  }, /*#__PURE__*/React.createElement(ToggleGroup, {
    options: [{
      value: false,
      label: 'Single'
    }, {
      value: true,
      label: 'Multi'
    }],
    value: settings.multiWord,
    onChange: function onChange(v) {
      return onSettings({
        multiWord: v
      });
    },
    theme: theme
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 20
    }
  }), /*#__PURE__*/React.createElement(Mono, {
    size: 10,
    opacity: 0.45,
    style: {
      display: 'block',
      marginBottom: 12
    }
  }, "Speed"), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Default WPM",
    sub: settings.wpm + ' wpm'
  }, /*#__PURE__*/React.createElement(Slider, {
    value: settings.wpm,
    min: 100,
    max: 900,
    step: 10,
    theme: theme,
    onChange: function onChange(v) {
      return onSettings({
        wpm: v
      });
    }
  })), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Comma pause",
    sub: settings.commaMult.toFixed(1) + 'x'
  }, /*#__PURE__*/React.createElement(Slider, {
    value: settings.commaMult * 10,
    min: 10,
    max: 30,
    step: 1,
    theme: theme,
    onChange: function onChange(v) {
      return onSettings({
        commaMult: v / 10
      });
    }
  })), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Full stop pause",
    sub: settings.fullstopMult.toFixed(1) + 'x'
  }, /*#__PURE__*/React.createElement(Slider, {
    value: settings.fullstopMult * 10,
    min: 10,
    max: 40,
    step: 1,
    theme: theme,
    onChange: function onChange(v) {
      return onSettings({
        fullstopMult: v / 10
      });
    }
  })), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Paragraph pause",
    sub: '+' + ((_settings$paragraphPa3 = settings.paragraphPauseMult) !== null && _settings$paragraphPa3 !== void 0 ? _settings$paragraphPa3 : DEFAULT_SETTINGS.paragraphPauseMult).toFixed(1) + 'x before break'
  }, /*#__PURE__*/React.createElement(Slider, {
    value: ((_settings$paragraphPa4 = settings.paragraphPauseMult) !== null && _settings$paragraphPa4 !== void 0 ? _settings$paragraphPa4 : DEFAULT_SETTINGS.paragraphPauseMult) * 10,
    min: 0,
    max: 30,
    step: 1,
    theme: theme,
    onChange: function onChange(v) {
      return onSettings({
        paragraphPauseMult: v / 10
      });
    }
  })), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Semicolon pause",
    sub: settings.semicolonMult.toFixed(1) + 'x'
  }, /*#__PURE__*/React.createElement(Slider, {
    value: settings.semicolonMult * 10,
    min: 10,
    max: 25,
    step: 1,
    theme: theme,
    onChange: function onChange(v) {
      return onSettings({
        semicolonMult: v / 10
      });
    }
  })), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Ellipsis pause",
    sub: settings.ellipsisMult.toFixed(1) + 'x'
  }, /*#__PURE__*/React.createElement(Slider, {
    value: settings.ellipsisMult * 10,
    min: 10,
    max: 40,
    step: 1,
    theme: theme,
    onChange: function onChange(v) {
      return onSettings({
        ellipsisMult: v / 10
      });
    }
  })), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Long word threshold",
    sub: 'after ' + ((_settings$longWordThr2 = settings.longWordThreshold) !== null && _settings$longWordThr2 !== void 0 ? _settings$longWordThr2 : 9) + ' characters'
  }, /*#__PURE__*/React.createElement(Slider, {
    value: (_settings$longWordThr3 = settings.longWordThreshold) !== null && _settings$longWordThr3 !== void 0 ? _settings$longWordThr3 : 9,
    min: 5,
    max: 15,
    step: 1,
    theme: theme,
    onChange: function onChange(v) {
      return onSettings({
        longWordThreshold: v
      });
    }
  })), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "Long word delay",
    sub: '+' + ((_settings$longWordMs2 = settings.longWordMs) !== null && _settings$longWordMs2 !== void 0 ? _settings$longWordMs2 : 10) + 'ms per extra char'
  }, /*#__PURE__*/React.createElement(Slider, {
    value: (_settings$longWordMs3 = settings.longWordMs) !== null && _settings$longWordMs3 !== void 0 ? _settings$longWordMs3 : 10,
    min: 0,
    max: 30,
    step: 1,
    theme: theme,
    onChange: function onChange(v) {
      return onSettings({
        longWordMs: v
      });
    }
  })), /*#__PURE__*/React.createElement(Mono, {
    size: 10,
    opacity: 0.45,
    style: {
      display: 'block',
      marginTop: 24,
      marginBottom: 12
    }
  }, "Integrations"), /*#__PURE__*/React.createElement(SetRow, {
    theme: theme,
    label: "OpenAI API key",
    sub: "Auto-generates paste session titles"
  }, /*#__PURE__*/React.createElement(ApiKeyInput, {
    theme: theme
  }))));
}
var OPENAI_KEY_STORAGE = 'fentiread-openai-key';
function ApiKeyInput(_ref17) {
  var theme = _ref17.theme;
  var _useState25 = useState(function () {
      return localStorage.getItem(OPENAI_KEY_STORAGE) || '';
    }),
    _useState26 = _slicedToArray(_useState25, 2),
    key = _useState26[0],
    setKey = _useState26[1];
  var _useState27 = useState(false),
    _useState28 = _slicedToArray(_useState27, 2),
    show = _useState28[0],
    setShow = _useState28[1];
  var save = function save(v) {
    setKey(v);
    if (v.trim()) localStorage.setItem(OPENAI_KEY_STORAGE, v.trim());else localStorage.removeItem(OPENAI_KEY_STORAGE);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: show ? 'text' : 'password',
    value: key,
    onChange: function onChange(e) {
      return save(e.target.value);
    },
    placeholder: "sk-...",
    style: {
      flex: 1,
      minWidth: 0,
      padding: '6px 10px',
      border: "0.75px solid ".concat(theme.hairline),
      borderRadius: 4,
      background: theme.bg,
      color: theme.ink,
      fontSize: 12,
      fontFamily: '"JetBrains Mono", monospace',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShow(function (s) {
        return !s;
      });
    },
    style: _objectSpread(_objectSpread({}, iconBtn(theme)), {}, {
      width: 28,
      height: 28,
      fontSize: 10
    })
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 8
  }, show ? 'Hide' : 'Show')));
}
function generatePasteTitle(_x) {
  return _generatePasteTitle.apply(this, arguments);
}
function _generatePasteTitle() {
  _generatePasteTitle = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(text) {
    var key, _data$choices, snippet, resp, data, _t1;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.p = _context20.n) {
        case 0:
          key = localStorage.getItem(OPENAI_KEY_STORAGE);
          if (key) {
            _context20.n = 1;
            break;
          }
          return _context20.a(2, null);
        case 1:
          _context20.p = 1;
          snippet = text.slice(0, 1000);
          _context20.n = 2;
          return fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + key
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              max_tokens: 20,
              messages: [{
                role: 'system',
                content: 'Generate a short title (3-5 words) for this pasted text. Return only the title, no quotes or punctuation.'
              }, {
                role: 'user',
                content: snippet
              }]
            })
          });
        case 2:
          resp = _context20.v;
          if (resp.ok) {
            _context20.n = 3;
            break;
          }
          return _context20.a(2, null);
        case 3:
          _context20.n = 4;
          return resp.json();
        case 4:
          data = _context20.v;
          return _context20.a(2, ((_data$choices = data.choices) === null || _data$choices === void 0 || (_data$choices = _data$choices[0]) === null || _data$choices === void 0 || (_data$choices = _data$choices.message) === null || _data$choices === void 0 || (_data$choices = _data$choices.content) === null || _data$choices === void 0 ? void 0 : _data$choices.trim()) || null);
        case 5:
          _context20.p = 5;
          _t1 = _context20.v;
          return _context20.a(2, null);
      }
    }, _callee20, null, [[1, 5]]);
  }));
  return _generatePasteTitle.apply(this, arguments);
}
function SetRow(_ref18) {
  var theme = _ref18.theme,
    label = _ref18.label,
    sub = _ref18.sub,
    children = _ref18.children;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 0',
      borderBottom: "0.5px solid ".concat(theme.rowDiv),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 15,
      fontWeight: 500
    }
  }, label), sub && /*#__PURE__*/React.createElement(Mono, {
    size: 10,
    opacity: 0.5,
    style: {
      marginTop: 2,
      display: 'block'
    }
  }, sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 120
    }
  }, children));
}

// -- Help modal --
function HelpModal(_ref19) {
  var theme = _ref19.theme,
    onClose = _ref19.onClose;
  useEffect(function () {
    var onKey = function onKey(e) {
      if (e.key === 'Escape' || e.key === '?') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return function () {
      return window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);
  var Section = function Section(_ref20) {
    var title = _ref20.title,
      children = _ref20.children;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement(Mono, {
      size: 10,
      opacity: 0.45,
      style: {
        display: 'block',
        marginBottom: 8
      }
    }, title), children);
  };
  var Key = function Key(_ref21) {
    var k = _ref21.k,
      label = _ref21.label;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '5px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 80,
        display: 'flex',
        gap: 4,
        justifyContent: 'flex-end'
      }
    }, k.split('+').map(function (part, i) {
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        style: {
          display: 'inline-block',
          padding: '2px 7px',
          borderRadius: 4,
          border: "1px solid ".concat(theme.hairline),
          background: theme.bg,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          lineHeight: 1.6
        }
      }, part);
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: '"Source Serif 4", Georgia, serif',
        fontSize: 13,
        opacity: 0.75
      }
    }, label));
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      width: 480,
      maxWidth: '90vw',
      maxHeight: '85vh',
      overflow: 'auto',
      background: theme.bg,
      border: "0.75px solid ".concat(theme.ink),
      padding: 28,
      color: theme.ink
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 24,
      fontWeight: 600
    }
  }, "Keyboard shortcuts"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: iconBtn(theme)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12"
  })))), /*#__PURE__*/React.createElement(Section, {
    title: "Reader"
  }, /*#__PURE__*/React.createElement(Key, {
    k: "Space",
    label: "Play / pause"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "Up",
    label: "Speed up (+20 wpm)"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "Down",
    label: "Slow down (-20 wpm)"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "Left",
    label: "Previous word"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "Right",
    label: "Next word"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "Ctrl+Left",
    label: "Previous chapter"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "Ctrl+Right",
    label: "Next chapter"
  }), /*#__PURE__*/React.createElement(Key, {
    k: ",",
    label: "Step back one token"
  }), /*#__PURE__*/React.createElement(Key, {
    k: ".",
    label: "Step forward one token"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "P",
    label: "Open page view"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "S",
    label: "Toggle settings"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "Esc",
    label: "Back to library"
  })), /*#__PURE__*/React.createElement(Section, {
    title: "Page view"
  }, /*#__PURE__*/React.createElement(Key, {
    k: "Left",
    label: "Previous page"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "Right",
    label: "Next page"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "Ctrl+Left",
    label: "Previous chapter"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "Ctrl+Right",
    label: "Next chapter"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "Esc",
    label: "Back to reader"
  })), /*#__PURE__*/React.createElement(Section, {
    title: "Library"
  }, /*#__PURE__*/React.createElement(Key, {
    k: "Ctrl+V",
    label: "Paste text into session"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "N",
    label: "New paste session"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "L",
    label: "Back to library (from reader)"
  }), /*#__PURE__*/React.createElement(Key, {
    k: "?",
    label: "Toggle this help"
  }))));
}

// -- Pastes View --
function EditableSessionTitle(_ref22) {
  var theme = _ref22.theme,
    value = _ref22.value,
    onSave = _ref22.onSave,
    style = _ref22.style,
    inputStyle = _ref22.inputStyle,
    _ref22$title = _ref22.title,
    title = _ref22$title === void 0 ? 'Rename session' : _ref22$title;
  var _useState29 = useState(false),
    _useState30 = _slicedToArray(_useState29, 2),
    editing = _useState30[0],
    setEditing = _useState30[1];
  var _useState31 = useState(value || ''),
    _useState32 = _slicedToArray(_useState31, 2),
    draft = _useState32[0],
    setDraft = _useState32[1];
  var inputRef = useRef(null);
  useEffect(function () {
    if (!editing) setDraft(value || '');
  }, [value, editing]);
  useEffect(function () {
    if (editing) {
      requestAnimationFrame(function () {
        var _inputRef$current, _inputRef$current2;
        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
        (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.select();
      });
    }
  }, [editing]);
  var commit = useCallback(function () {
    var next = draft.trim() || 'New paste';
    setEditing(false);
    if (next !== value) onSave(next);
  }, [draft, value, onSave]);
  if (editing) {
    return /*#__PURE__*/React.createElement("input", {
      ref: inputRef,
      value: draft,
      onChange: function onChange(e) {
        return setDraft(e.target.value);
      },
      onBlur: commit,
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      onKeyDown: function onKeyDown(e) {
        e.stopPropagation();
        if (e.key === 'Enter') commit();
        if (e.key === 'Escape') {
          setDraft(value || '');
          setEditing(false);
        }
      },
      style: _objectSpread(_objectSpread({}, inputStyle), {}, {
        background: 'transparent',
        color: theme.ink,
        border: "0.75px solid ".concat(theme.hairline),
        outline: 'none',
        padding: '2px 4px'
      })
    });
  }
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick(e) {
      e.stopPropagation();
      setEditing(true);
    },
    title: title,
    style: _objectSpread(_objectSpread({}, style), {}, {
      border: 'none',
      background: 'transparent',
      color: theme.ink,
      padding: 0,
      cursor: 'text',
      textAlign: 'left'
    })
  }, value);
}
function PasteSidebar(_ref23) {
  var theme = _ref23.theme,
    sessions = _ref23.sessions,
    activeId = _ref23.activeId,
    onSelect = _ref23.onSelect,
    onNew = _ref23.onNew,
    onRename = _ref23.onRename,
    onSettings = _ref23.onSettings,
    onDelete = _ref23.onDelete,
    onHelp = _ref23.onHelp;
  var sidebarBg = theme.bg === '#fff' ? '#fafaf7' : '#0d0d0d';
  var _useState33 = useState(''),
    _useState34 = _slicedToArray(_useState33, 2),
    query = _useState34[0],
    setQuery = _useState34[1];
  var _useState35 = useState(true),
    _useState36 = _slicedToArray(_useState35, 2),
    collapsed = _useState36[0],
    setCollapsed = _useState36[1];
  var filtered = sessions.filter(function (s) {
    return s.title.toLowerCase().includes(query.trim().toLowerCase());
  });
  if (collapsed) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48,
        flexShrink: 0,
        borderRight: "0.75px solid ".concat(theme.hairline),
        background: sidebarBg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        padding: '16px 0',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setCollapsed(false);
      },
      title: "Expand pastes",
      style: _objectSpread(_objectSpread({}, iconBtn(theme)), {}, {
        width: 32,
        height: 32
      })
    }, I.clipboard(16)), /*#__PURE__*/React.createElement("button", {
      onClick: onNew,
      title: "New paste",
      style: _objectSpread(_objectSpread({}, iconBtn(theme)), {}, {
        width: 32,
        height: 32
      })
    }, I.plus(14)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: onHelp,
      title: "Keyboard shortcuts",
      style: _objectSpread(_objectSpread({}, iconBtn(theme)), {}, {
        width: 32,
        height: 32
      })
    }, I.help(16)), /*#__PURE__*/React.createElement("button", {
      onClick: onSettings,
      title: "Settings",
      style: _objectSpread(_objectSpread({}, iconBtn(theme)), {}, {
        width: 32,
        height: 32
      })
    }, I.gear(16)));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 280,
      flexShrink: 0,
      borderRight: "0.75px solid ".concat(theme.hairline),
      background: sidebarBg,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 16px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 8,
    opacity: 0.42,
    style: {
      flex: 1
    }
  }, "FentiRead"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setCollapsed(true);
    },
    title: "Collapse sidebar",
    style: _objectSpread(_objectSpread({}, iconBtn(theme)), {}, {
      width: 24,
      height: 24
    })
  }, I.back(14))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 12px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onNew,
    style: _objectSpread(_objectSpread({}, primaryBtn(theme)), {}, {
      width: '100%',
      justifyContent: 'center',
      padding: '11px 16px',
      fontSize: 9,
      borderRadius: 18
    })
  }, I.plus(12), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8
    }
  }, "New paste"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 28,
      border: "0.75px solid ".concat(theme.hairline),
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      padding: '0 9px',
      gap: 8,
      background: theme.bg
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      border: "1px solid ".concat(theme.dim),
      borderRadius: 9,
      display: 'inline-block',
      position: 'relative',
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      width: 4,
      height: 1,
      background: theme.dim,
      right: -3,
      bottom: -1,
      transform: 'rotate(45deg)'
    }
  })), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: function onChange(e) {
      return setQuery(e.target.value);
    },
    placeholder: "Search pastes",
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: theme.ink,
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 12
    }
  }), /*#__PURE__*/React.createElement(Mono, {
    size: 7,
    opacity: 0.35
  }, "Ctrl K"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px 7px'
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 9,
    opacity: 0.4
  }, "Recents")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '0 8px 12px'
    }
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 8px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 9,
    opacity: 0.35
  }, sessions.length ? 'No matches' : 'No paste sessions yet')), filtered.map(function (s) {
    var isActive = s.id === activeId;
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      onClick: function onClick() {
        return onSelect(s.id);
      },
      style: {
        padding: '9px 10px',
        borderRadius: 5,
        cursor: 'pointer',
        marginBottom: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: isActive ? theme.bg === '#fff' ? '#e9e8e4' : 'rgba(255,255,255,0.08)' : 'transparent'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: '"Source Serif 4", Georgia, serif',
        fontSize: 13,
        fontWeight: 600,
        lineHeight: 1.25,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, s.title), /*#__PURE__*/React.createElement(Mono, {
      size: 8,
      opacity: 0.45,
      style: {
        marginTop: 4,
        display: 'block'
      }
    }, s.pasteIds.length, " ", s.pasteIds.length === 1 ? 'paste' : 'pastes', " \xB7 ", relativeTime(s.updatedAt))), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        onDelete(s.id);
      },
      title: "Delete session",
      style: _objectSpread(_objectSpread({}, iconBtn(theme)), {}, {
        width: 22,
        height: 22,
        flexShrink: 0,
        opacity: 0.4
      })
    }, I.trash(12)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "0.75px solid ".concat(theme.hairline),
      padding: '13px 16px 14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onHelp,
    title: "Keyboard shortcuts",
    style: _objectSpread(_objectSpread({}, iconBtn(theme)), {}, {
      width: 32,
      height: 32
    })
  }, I.help(16)), /*#__PURE__*/React.createElement("button", {
    onClick: onSettings,
    title: "Settings",
    style: _objectSpread(_objectSpread({}, iconBtn(theme)), {}, {
      width: 32,
      height: 32
    })
  }, I.gear(16))));
}
function PasteComposer(_ref24) {
  var theme = _ref24.theme;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "0.75px solid ".concat(theme.hairline),
      padding: '12px 24px 14px',
      background: theme.bg,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "0.75px solid ".concat(theme.ink),
      borderRadius: 10,
      padding: '13px 15px',
      background: theme.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 13.5,
      color: theme.ink
    }
  }, "Press Ctrl+V to paste text into this session"), /*#__PURE__*/React.createElement(Mono, {
    size: 8,
    opacity: 0.45,
    style: {
      flexShrink: 0
    }
  }, "Clipboard only"))));
}
function EmptyChatHero(_ref25) {
  var theme = _ref25.theme;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: 430,
      paddingBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 50,
      height: 50,
      borderRadius: 25,
      border: "1.25px solid ".concat(theme.dim),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      color: theme.ink
    }
  }, I.clipboard(22)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 25,
      fontWeight: 600,
      color: theme.ink
    }
  }, "Paste anything to read"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 14,
      opacity: 0.55,
      marginTop: 14,
      lineHeight: 1.5,
      color: theme.ink
    }
  }, "Each session keeps related pastes together. Add more in this chat to keep context, or start a new one for a fresh topic.")));
}
function pasteToReaderBook(paste, session) {
  var _window$FRStore;
  var words = getPasteWords(paste);
  var text = getPasteReaderText(paste);
  var images = paste.images || (paste.contentType === 'markdown' && (_window$FRStore = window.FRStore) !== null && _window$FRStore !== void 0 && _window$FRStore.markdownToReaderContent ? window.FRStore.markdownToReaderContent(paste.rawText || '').images : []);
  var title = (session === null || session === void 0 ? void 0 : session.title) || 'Pasted text';
  return {
    id: 'paste:' + paste.id,
    format: 'PASTE',
    title: title,
    author: 'Pasted text',
    chapters: [{
      id: 'paste',
      title: null,
      text: text,
      images: images,
      wordCount: words.length
    }],
    totalWords: words.length,
    cover: null,
    addedAt: paste.createdAt,
    progress: {
      wordIndex: Math.min(paste.readIdx || 0, Math.max(0, words.length - 1))
    }
  };
}
function pickReadablePasteId(pastes) {
  var _ref26;
  return ((_ref26 = pastes.find(function (p) {
    return !p.readAt && p.readIdx > 0;
  }) || pastes.find(function (p) {
    return !p.readAt;
  }) || pastes[0] || null) === null || _ref26 === void 0 ? void 0 : _ref26.id) || null;
}
function getPasteReadableText(paste) {
  var _window$FRStore2;
  if (paste !== null && paste !== void 0 && paste.plainText) return paste.plainText;
  if ((paste === null || paste === void 0 ? void 0 : paste.contentType) === 'markdown' && (_window$FRStore2 = window.FRStore) !== null && _window$FRStore2 !== void 0 && _window$FRStore2.markdownToPlainText) {
    return window.FRStore.markdownToPlainText(paste.rawText || '');
  }
  return (paste === null || paste === void 0 ? void 0 : paste.rawText) || '';
}
function getPasteReaderText(paste) {
  var _window$FRStore3;
  if (paste !== null && paste !== void 0 && paste.readerText) return paste.readerText;
  if ((paste === null || paste === void 0 ? void 0 : paste.contentType) === 'markdown' && (_window$FRStore3 = window.FRStore) !== null && _window$FRStore3 !== void 0 && _window$FRStore3.markdownToReaderContent) {
    return window.FRStore.markdownToReaderContent(paste.rawText || '').readerText;
  }
  return getPasteReadableText(paste);
}
function getPasteWords(paste) {
  var _paste$words;
  if ((paste === null || paste === void 0 ? void 0 : paste.contentType) === 'markdown') return getPasteReaderText(paste).trim().split(/\s+/).filter(Boolean);
  if (paste !== null && paste !== void 0 && (_paste$words = paste.words) !== null && _paste$words !== void 0 && _paste$words.length) return paste.words;
  return getPasteReaderText(paste).trim().split(/\s+/).filter(Boolean);
}
function trimText(text, max) {
  return text.length > max ? text.slice(0, max).trimEnd() + '...' : text;
}
function renderInlineMarkdown(text) {
  var keyPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'md';
  var parts = [];
  var re = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  var last = 0;
  var idx = 0;
  var _iterator13 = _createForOfIteratorHelper(text.matchAll(re)),
    _step13;
  try {
    for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
      var match = _step13.value;
      if (match.index > last) parts.push(text.slice(last, match.index));
      var token = match[0];
      if (token.startsWith('**') || token.startsWith('__')) {
        parts.push(/*#__PURE__*/React.createElement("strong", {
          key: "".concat(keyPrefix, "-b-").concat(idx++)
        }, token.slice(2, -2)));
      } else if (token.startsWith('`')) {
        parts.push(/*#__PURE__*/React.createElement("code", {
          key: "".concat(keyPrefix, "-c-").concat(idx++)
        }, token.slice(1, -1)));
      } else {
        var _token$match;
        var label = ((_token$match = token.match(/^\[([^\]]+)\]/)) === null || _token$match === void 0 ? void 0 : _token$match[1]) || token;
        parts.push(/*#__PURE__*/React.createElement("span", {
          key: "".concat(keyPrefix, "-l-").concat(idx++)
        }, label));
      }
      last = match.index + token.length;
    }
  } catch (err) {
    _iterator13.e(err);
  } finally {
    _iterator13.f();
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
function MarkdownPreview(_ref27) {
  var text = _ref27.text,
    theme = _ref27.theme,
    _ref27$maxLines = _ref27.maxLines,
    maxLines = _ref27$maxLines === void 0 ? 14 : _ref27$maxLines;
  var lines = (text || '').replace(/\r\n?/g, '\n').split('\n');
  var nodes = [];
  var shown = 0;
  var inFence = false;
  for (var i = 0; i < lines.length && shown < maxLines; i++) {
    var line = lines[i];
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (!line.trim()) {
      nodes.push(/*#__PURE__*/React.createElement("div", {
        key: "gap-".concat(i),
        style: {
          height: 7
        }
      }));
      continue;
    }
    if (/^\s{0,3}---+\s*$/.test(line)) {
      nodes.push(/*#__PURE__*/React.createElement("div", {
        key: "hr-".concat(i),
        style: {
          borderTop: "0.75px solid ".concat(theme.hairline),
          margin: '10px 0'
        }
      }));
      shown++;
      continue;
    }
    if (/^\s*!\[[^\]]*\]\([^)]+\)\s*$/.test(line)) {
      nodes.push(/*#__PURE__*/React.createElement(Mono, {
        key: "img-".concat(i),
        size: 8,
        opacity: 0.45,
        style: {
          display: 'block',
          margin: '6px 0'
        }
      }, "[Image]"));
      shown++;
      continue;
    }
    var heading = line.match(/^\s{0,3}(#{1,6})\s+(.+)$/);
    if (heading) {
      nodes.push(/*#__PURE__*/React.createElement("div", {
        key: "h-".concat(i),
        style: {
          fontFamily: '"Source Serif 4", Georgia, serif',
          fontSize: heading[1].length <= 2 ? 16 : 14,
          fontWeight: 700,
          margin: '9px 0 4px'
        }
      }, renderInlineMarkdown(heading[2], "h-".concat(i))));
      shown++;
      continue;
    }
    var bullet = line.match(/^\s{0,3}([-*+]|\d+[.)])\s+(.+)$/);
    if (bullet) {
      nodes.push(/*#__PURE__*/React.createElement("div", {
        key: "li-".concat(i),
        style: {
          display: 'flex',
          gap: 8,
          margin: '3px 0'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          opacity: 0.55
        }
      }, /^\d/.test(bullet[1]) ? bullet[1] : '*'), /*#__PURE__*/React.createElement("span", null, renderInlineMarkdown(bullet[2], "li-".concat(i)))));
      shown++;
      continue;
    }
    nodes.push(/*#__PURE__*/React.createElement("p", {
      key: "p-".concat(i),
      style: {
        margin: '0 0 7px'
      }
    }, renderInlineMarkdown(line.trim(), "p-".concat(i))));
    shown++;
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 13.5,
      lineHeight: 1.55,
      color: theme.ink
    }
  }, nodes);
}
function PasteChatCard(_ref28) {
  var theme = _ref28.theme,
    paste = _ref28.paste,
    index = _ref28.index,
    onRead = _ref28.onRead,
    onDelete = _ref28.onDelete,
    highlighted = _ref28.highlighted;
  var cardRef = useRef(null);
  var accent = theme.bg === '#fff' ? '#c96442' : '#d97759';
  var words = getPasteWords(paste);
  var readableText = getPasteReadableText(paste);
  var pct = words.length ? Math.round(paste.readIdx / words.length * 100) : 0;
  var isRead = !!paste.readAt;
  var isInProgress = !isRead && paste.readIdx > 0;
  var preview = trimText(readableText, 280);
  var readMins = Math.max(1, Math.round(words.length / 300));
  var status = isRead ? 'Read' : isInProgress ? "".concat(pct, "%") : 'Queued';
  useEffect(function () {
    var _cardRef$current;
    if (!highlighted) return;
    (_cardRef$current = cardRef.current) === null || _cardRef$current === void 0 || _cardRef$current.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    });
  }, [highlighted]);
  return /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    style: {
      border: "0.75px solid ".concat(highlighted ? accent : isInProgress ? accent : theme.hairline),
      boxShadow: highlighted ? "0 0 0 1px ".concat(accent) : 'none',
      borderRadius: 6,
      padding: '12px 14px 10px',
      opacity: isRead ? 0.62 : 1,
      background: theme.bg,
      transition: 'border-color 180ms, opacity 180ms'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 10,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: isRead ? theme.ink : 'transparent',
      color: isRead ? theme.bg : theme.ink,
      border: isRead ? 'none' : "1px solid ".concat(theme.dim),
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 9
    }
  }, isRead ? I.check(11) : index + 1), /*#__PURE__*/React.createElement(Mono, {
    size: 8,
    opacity: 0.45
  }, relativeTime(paste.createdAt), " - pasted text")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 8,
    opacity: 0.45
  }, words.length, "w - ~", readMins, "m"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return onDelete === null || onDelete === void 0 ? void 0 : onDelete(paste);
    },
    style: {
      width: 26,
      height: 26,
      borderRadius: 13,
      border: "1px solid ".concat(theme.hairline),
      background: theme.bg,
      color: theme.dim,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    },
    "aria-label": "Delete paste",
    title: "Delete paste"
  }, I.trash(10)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return onRead === null || onRead === void 0 ? void 0 : onRead(paste);
    },
    style: {
      width: 26,
      height: 26,
      borderRadius: 13,
      border: "1px solid ".concat(theme.dim),
      background: theme.bg,
      color: theme.ink,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    },
    "aria-label": "Read paste"
  }, I.play(10)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 12
    }
  }, paste.contentType === 'markdown' ? /*#__PURE__*/React.createElement(MarkdownPreview, {
    text: paste.rawText,
    theme: theme,
    maxLines: 12
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 13.5,
      lineHeight: 1.55,
      color: theme.ink
    }
  }, preview)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 2,
      background: theme.hairline,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "".concat(isRead ? 100 : pct, "%"),
      height: '100%',
      background: isRead ? theme.ink : isInProgress ? accent : 'transparent',
      transition: 'width 250ms'
    }
  })), /*#__PURE__*/React.createElement(Mono, {
    size: 8,
    opacity: 0.5
  }, status)));
}
function PasteChatPane(_ref29) {
  var theme = _ref29.theme,
    session = _ref29.session,
    pastes = _ref29.pastes,
    onReadPaste = _ref29.onReadPaste,
    onDeletePaste = _ref29.onDeletePaste,
    onRenameSession = _ref29.onRenameSession,
    highlightedPasteId = _ref29.highlightedPasteId;
  var totalWords = pastes.reduce(function (s, p) {
    return s + p.words.length;
  }, 0);
  var minutes = Math.max(1, Math.round(totalWords / 300));
  var isEmpty = pastes.length === 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 28px 16px',
      borderBottom: "0.75px solid ".concat(theme.hairline),
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Mono, {
    size: 8,
    opacity: 0.42
  }, "Paste session - ", relativeTime(session.createdAt)), /*#__PURE__*/React.createElement(EditableSessionTitle, {
    theme: theme,
    value: session.title,
    onSave: function onSave(title) {
      return onRenameSession(session.id, title);
    },
    style: {
      display: 'block',
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 22,
      fontWeight: 600,
      marginTop: 6
    },
    inputStyle: {
      display: 'block',
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 22,
      fontWeight: 600,
      marginTop: 6,
      minWidth: 260
    }
  }), !isEmpty && /*#__PURE__*/React.createElement(Mono, {
    size: 8,
    opacity: 0.45,
    style: {
      marginTop: 7,
      display: 'block'
    }
  }, pastes.length, " ", pastes.length === 1 ? 'paste' : 'pastes', " - ", totalWords, " words - ~", minutes, " min total")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      border: 'none',
      background: 'transparent',
      color: theme.dim,
      padding: 4,
      cursor: 'pointer',
      fontSize: 18,
      lineHeight: 1
    },
    "aria-label": "Session options"
  }, "..."))), isEmpty ? /*#__PURE__*/React.createElement(EmptyChatHero, {
    theme: theme
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '20px 24px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, pastes.map(function (paste, i) {
    return /*#__PURE__*/React.createElement(PasteChatCard, {
      key: paste.id,
      theme: theme,
      paste: paste,
      index: i,
      onRead: onReadPaste,
      onDelete: onDeletePaste,
      highlighted: paste.id === highlightedPasteId
    });
  }))));
}
function PasteDeckSessionList(_ref30) {
  var theme = _ref30.theme,
    sessions = _ref30.sessions,
    activeSessionId = _ref30.activeSessionId,
    onSelectSession = _ref30.onSelectSession,
    onNewSession = _ref30.onNewSession,
    onRenameSession = _ref30.onRenameSession;
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 224,
      flexShrink: 0,
      borderRight: "0.75px solid ".concat(theme.hairline),
      padding: '28px 12px',
      overflow: 'auto',
      background: theme.bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      margin: '0 0 18px 2px'
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 8,
    opacity: 0.5
  }, "Sessions"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onNewSession,
    style: {
      width: 24,
      height: 24,
      borderRadius: 12,
      border: "0.75px solid ".concat(theme.hairline),
      background: theme.bg,
      color: theme.ink,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    },
    "aria-label": "New session",
    title: "New session"
  }, I.plus(12))), sessions.map(function (session) {
    var isActive = session.id === activeSessionId;
    return /*#__PURE__*/React.createElement("button", {
      key: session.id,
      type: "button",
      onClick: function onClick() {
        return onSelectSession(session.id);
      },
      style: {
        width: '100%',
        border: 'none',
        borderLeft: isActive ? "2px solid ".concat(theme.ink) : '2px solid transparent',
        background: isActive ? theme.bg === '#fff' ? '#efeee9' : 'rgba(255,255,255,0.08)' : 'transparent',
        color: theme.ink,
        textAlign: 'left',
        padding: '9px 10px',
        marginBottom: 4,
        borderRadius: 4,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(EditableSessionTitle, {
      theme: theme,
      value: session.title,
      onSave: function onSave(title) {
        return onRenameSession(session.id, title);
      },
      style: {
        display: 'block',
        width: '100%',
        fontFamily: '"Source Serif 4", Georgia, serif',
        fontSize: 13,
        fontWeight: 600,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      inputStyle: {
        width: '100%',
        fontFamily: '"Source Serif 4", Georgia, serif',
        fontSize: 13,
        fontWeight: 600
      }
    }), /*#__PURE__*/React.createElement(Mono, {
      size: 8,
      opacity: 0.45,
      style: {
        display: 'block',
        marginTop: 3
      }
    }, relativeTime(session.updatedAt)));
  }));
}
function PasteDeckQueue(_ref31) {
  var theme = _ref31.theme,
    pastes = _ref31.pastes,
    activePasteId = _ref31.activePasteId,
    onSelectPaste = _ref31.onSelectPaste,
    onDeletePaste = _ref31.onDeletePaste;
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 260,
      flexShrink: 0,
      borderLeft: "0.75px solid ".concat(theme.hairline),
      padding: '28px 14px',
      overflow: 'auto',
      background: theme.bg
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 8,
    opacity: 0.5,
    style: {
      display: 'block',
      marginBottom: 18
    }
  }, "Pastes in session"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, pastes.map(function (paste, i) {
    var words = getPasteWords(paste);
    var readableText = getPasteReadableText(paste);
    var pct = words.length ? Math.round(paste.readIdx / words.length * 100) : 0;
    var isRead = !!paste.readAt;
    var isActive = paste.id === activePasteId;
    var label = isRead ? 'Read' : paste.readIdx > 0 ? "".concat(pct, "%") : isActive ? "".concat(pct, "%") : 'Queued';
    var preview = trimText(readableText, 120);
    return /*#__PURE__*/React.createElement("div", {
      key: paste.id,
      role: "button",
      tabIndex: 0,
      onClick: function onClick() {
        return onSelectPaste(paste.id);
      },
      onKeyDown: function onKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectPaste(paste.id);
        }
      },
      style: {
        border: "0.75px solid ".concat(isActive ? theme.ink : theme.hairline),
        borderLeft: "3px solid ".concat(isActive ? theme.ink : 'transparent'),
        borderRadius: 6,
        background: isActive ? theme.bg === '#fff' ? '#faf9f5' : 'rgba(255,255,255,0.05)' : theme.bg,
        color: theme.ink,
        textAlign: 'left',
        padding: '10px 11px',
        cursor: 'pointer',
        opacity: isRead && !isActive ? 0.65 : 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement(Mono, {
      size: 8,
      opacity: 0.55
    }, String(i + 1).padStart(2, '0'), " - ", words.length, "w"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Mono, {
      size: 8,
      opacity: 0.55
    }, label), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick(e) {
        e.stopPropagation();
        onDeletePaste === null || onDeletePaste === void 0 || onDeletePaste(paste);
      },
      style: {
        border: 'none',
        background: 'transparent',
        color: theme.dim,
        padding: 2,
        cursor: 'pointer',
        display: 'flex'
      },
      "aria-label": "Delete paste",
      title: "Delete paste"
    }, I.trash(10)))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: '"Source Serif 4", Georgia, serif',
        fontSize: 12.5,
        lineHeight: 1.45,
        color: theme.ink
      }
    }, preview), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 2,
        background: theme.hairline,
        marginTop: 9,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "".concat(isRead ? 100 : pct, "%"),
        height: '100%',
        background: theme.ink
      }
    })));
  })));
}
function PasteReaderDeck(_ref32) {
  var theme = _ref32.theme,
    sessions = _ref32.sessions,
    session = _ref32.session,
    pastes = _ref32.pastes,
    activePaste = _ref32.activePaste,
    settings = _ref32.settings,
    onSettings = _ref32.onSettings,
    onProgressChange = _ref32.onProgressChange,
    onSelectSession = _ref32.onSelectSession,
    onNewSession = _ref32.onNewSession,
    onRenameSession = _ref32.onRenameSession,
    onSelectPaste = _ref32.onSelectPaste,
    onPasteMore = _ref32.onPasteMore,
    onDeletePaste = _ref32.onDeletePaste,
    onEndSession = _ref32.onEndSession;
  var activeIndex = pastes.findIndex(function (p) {
    return p.id === activePaste.id;
  });
  var book = pasteToReaderBook(activePaste, session);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      background: theme.bg,
      color: theme.ink,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(PasteDeckSessionList, {
    theme: theme,
    sessions: sessions,
    activeSessionId: session.id,
    onSelectSession: onSelectSession,
    onNewSession: onNewSession,
    onRenameSession: onRenameSession
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      borderRight: "0 solid ".concat(theme.hairline)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 92,
      flexShrink: 0,
      borderBottom: "0.75px solid ".concat(theme.hairline),
      padding: '22px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 8,
    opacity: 0.48
  }, "Now reading - paste ", String(activeIndex + 1).padStart(2, '0'), " of ", String(pastes.length).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 18,
      fontWeight: 600,
      marginTop: 5,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, session.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Mono, {
    size: 8,
    opacity: 0.45
  }, "Press Ctrl+V to add paste"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(Reader, {
    theme: theme,
    book: book,
    onClose: onEndSession,
    settings: settings,
    onSettings: onSettings,
    onProgressChange: onProgressChange,
    escapeToClose: true,
    onEscapeClose: onPasteMore,
    showTopChrome: false
  }))), /*#__PURE__*/React.createElement(PasteDeckQueue, {
    theme: theme,
    pastes: pastes,
    activePasteId: activePaste.id,
    onSelectPaste: onSelectPaste,
    onDeletePaste: onDeletePaste
  }));
}

// -- Top bar --
function TopBar(_ref33) {
  var theme = _ref33.theme,
    dark = _ref33.dark,
    setDark = _ref33.setDark,
    title = _ref33.title;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 48,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      borderBottom: "0.75px solid ".concat(theme.hairline),
      background: theme.bg,
      color: theme.ink,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '"Source Serif 4", Georgia, serif',
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, "FentiRead"), title && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 16,
      opacity: 0.55,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10,
      letterSpacing: 1.3,
      textTransform: 'uppercase'
    }
  }, "- ", title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 4,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setDark(!dark);
    },
    style: _objectSpread(_objectSpread({}, iconBtn(theme)), {}, {
      width: 32,
      height: 32
    })
  }, dark ? I.sun(16) : I.moon(16))));
}

// -- App --
function App() {
  var _useState37 = useState([]),
    _useState38 = _slicedToArray(_useState37, 2),
    books = _useState38[0],
    setBooks = _useState38[1];
  var _useState39 = useState(null),
    _useState40 = _slicedToArray(_useState39, 2),
    openBookId = _useState40[0],
    setOpenBookId = _useState40[1];
  var _useState41 = useState(function () {
      var _cached$dark;
      var cached = readCachedAppSettings();
      return (_cached$dark = cached === null || cached === void 0 ? void 0 : cached.dark) !== null && _cached$dark !== void 0 ? _cached$dark : false;
    }),
    _useState42 = _slicedToArray(_useState41, 2),
    dark = _useState42[0],
    setDark = _useState42[1];
  var _useState43 = useState(false),
    _useState44 = _slicedToArray(_useState43, 2),
    busy = _useState44[0],
    setBusy = _useState44[1];
  var _useState45 = useState(null),
    _useState46 = _slicedToArray(_useState45, 2),
    progress = _useState46[0],
    setProgress = _useState46[1];
  var _useState47 = useState(DEFAULT_SETTINGS),
    _useState48 = _slicedToArray(_useState47, 2),
    settings = _useState48[0],
    setSettings = _useState48[1];
  var _useState49 = useState(null),
    _useState50 = _slicedToArray(_useState49, 2),
    deleteTarget = _useState50[0],
    setDeleteTarget = _useState50[1];
  var _useState51 = useState([]),
    _useState52 = _slicedToArray(_useState51, 2),
    pasteSessions = _useState52[0],
    setPasteSessions = _useState52[1];
  var _useState53 = useState(null),
    _useState54 = _slicedToArray(_useState53, 2),
    activeSessionId = _useState54[0],
    setActiveSessionId = _useState54[1];
  var _useState55 = useState([]),
    _useState56 = _slicedToArray(_useState55, 2),
    activePastes = _useState56[0],
    setActivePastes = _useState56[1];
  var _useState57 = useState(null),
    _useState58 = _slicedToArray(_useState57, 2),
    activePasteId = _useState58[0],
    setActivePasteId = _useState58[1];
  var _useState59 = useState(false),
    _useState60 = _slicedToArray(_useState59, 2),
    showAppSettings = _useState60[0],
    setShowAppSettings = _useState60[1];
  var _useState61 = useState(false),
    _useState62 = _slicedToArray(_useState61, 2),
    showAppHelp = _useState62[0],
    setShowAppHelp = _useState62[1];
  var _useState63 = useState(null),
    _useState64 = _slicedToArray(_useState63, 2),
    highlightedPasteId = _useState64[0],
    setHighlightedPasteId = _useState64[1];
  var supported = !!window.showDirectoryPicker;
  var theme = useTheme(dark);
  useEffect(function () {
    _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var list, s, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            _context3.p = 0;
            _context3.n = 1;
            return FRStore.dbAll('books');
          case 1:
            list = _context3.v;
            list.sort(function (a, b) {
              return (b.lastReadAt || b.addedAt || 0) - (a.lastReadAt || a.addedAt || 0);
            });
            setBooks(list);
            _context3.n = 2;
            return FRStore.dbGet('settings', 'app');
          case 2:
            s = _context3.v;
            if (s) {
              setSettings(function (prev) {
                return _objectSpread(_objectSpread({}, prev), s.value);
              });
              if (s.value.dark != null) setDark(!!s.value.dark);
            }
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t3 = _context3.v;
            console.error(_t3);
          case 4:
            // Scan for new books in background (after UI is visible)
            setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
              var result, updated, _t2;
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.p = _context2.n) {
                  case 0:
                    _context2.p = 0;
                    _context2.n = 1;
                    return FRStore.autoScanLibrary();
                  case 1:
                    result = _context2.v;
                    if (!(result && result.added > 0)) {
                      _context2.n = 3;
                      break;
                    }
                    _context2.n = 2;
                    return FRStore.dbAll('books');
                  case 2:
                    updated = _context2.v;
                    updated.sort(function (a, b) {
                      return (b.addedAt || 0) - (a.addedAt || 0);
                    });
                    setBooks(updated);
                  case 3:
                    _context2.n = 5;
                    break;
                  case 4:
                    _context2.p = 4;
                    _t2 = _context2.v;
                  case 5:
                    return _context2.a(2);
                }
              }, _callee2, null, [[0, 4]]);
            })), 50);
          case 5:
            return _context3.a(2);
        }
      }, _callee3, null, [[0, 3]]);
    }))();
  }, []);

  // Pre-tokenize books in background so opening is instant
  useEffect(function () {
    if (!books.length) return;
    var i = 0;
    var _next2 = function next() {
      if (i >= books.length) return;
      var b = books[i++];
      if (b.chapters && !_tokenCache.has(b.id)) {
        cachedTokenize(b.id, b.chapters);
        cachedFlatWords(b.id, b.chapters);
      }
      setTimeout(_next2, 0);
    };
    setTimeout(_next2, 100);
  }, [books]);
  useEffect(function () {
    var combined = _objectSpread(_objectSpread({}, settings), {}, {
      dark: dark
    });
    cacheAppSettings(combined);
    FRStore.dbPut('settings', {
      key: 'app',
      value: combined
    })["catch"](function () {});
  }, [settings, dark]);
  var refresh = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var list, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return FRStore.autoScanLibrary();
        case 1:
          _context4.n = 3;
          break;
        case 2:
          _context4.p = 2;
          _t4 = _context4.v;
        case 3:
          _context4.n = 4;
          return FRStore.dbAll('books');
        case 4:
          list = _context4.v;
          list.sort(function (a, b) {
            return (b.lastReadAt || b.addedAt || 0) - (a.lastReadAt || a.addedAt || 0);
          });
          setBooks(list);
        case 5:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 2]]);
  })), []);
  var refreshPasteSessions = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
    var list;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.n = 1;
          return FRStore.listPasteSessions();
        case 1:
          list = _context5.v;
          setPasteSessions(list);
          return _context5.a(2, list);
      }
    }, _callee5);
  })), []);
  useEffect(function () {
    refreshPasteSessions()["catch"](console.error);
  }, [refreshPasteSessions]);
  useEffect(function () {
    if (!activeSessionId) {
      setActivePastes([]);
      return;
    }
    FRStore.getPastesBySession(activeSessionId).then(setActivePastes)["catch"](console.error);
  }, [activeSessionId]);

  // Clean up empty sessions when navigating away
  var cleanupEmptySession = useCallback(/*#__PURE__*/function () {
    var _ref38 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(sessionId) {
      var pastes, _t5;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            if (sessionId) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2);
          case 1:
            _context6.p = 1;
            _context6.n = 2;
            return FRStore.getPastesBySession(sessionId);
          case 2:
            pastes = _context6.v;
            if (!(pastes.length === 0)) {
              _context6.n = 3;
              break;
            }
            _context6.n = 3;
            return FRStore.deletePasteSession(sessionId);
          case 3:
            _context6.n = 5;
            break;
          case 4:
            _context6.p = 4;
            _t5 = _context6.v;
          case 5:
            return _context6.a(2);
        }
      }, _callee6, null, [[1, 4]]);
    }));
    return function (_x2) {
      return _ref38.apply(this, arguments);
    };
  }(), []);
  var handleNewPasteSession = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
    var prevId, session;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          prevId = activeSessionId;
          _context7.n = 1;
          return FRStore.createPasteSession();
        case 1:
          session = _context7.v;
          setActivePasteId(null);
          setHighlightedPasteId(null);
          setActiveSessionId(session.id);
          _context7.n = 2;
          return cleanupEmptySession(prevId);
        case 2:
          _context7.n = 3;
          return refreshPasteSessions();
        case 3:
          return _context7.a(2);
      }
    }, _callee7);
  })), [activeSessionId, cleanupEmptySession, refreshPasteSessions]);
  var handleRenamePasteSession = useCallback(/*#__PURE__*/function () {
    var _ref40 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(sessionId, title) {
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            _context8.n = 1;
            return FRStore.updatePasteSession(sessionId, {
              title: title
            });
          case 1:
            _context8.n = 2;
            return refreshPasteSessions();
          case 2:
            return _context8.a(2);
        }
      }, _callee8);
    }));
    return function (_x3, _x4) {
      return _ref40.apply(this, arguments);
    };
  }(), [refreshPasteSessions]);
  var handleDeletePasteSession = useCallback(/*#__PURE__*/function () {
    var _ref41 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(sessionId) {
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            _context9.n = 1;
            return FRStore.deletePasteSession(sessionId);
          case 1:
            if (activeSessionId === sessionId) {
              setActiveSessionId(null);
              setActivePasteId(null);
              setActivePastes([]);
            }
            _context9.n = 2;
            return refreshPasteSessions();
          case 2:
            return _context9.a(2);
        }
      }, _callee9);
    }));
    return function (_x5) {
      return _ref41.apply(this, arguments);
    };
  }(), [activeSessionId, refreshPasteSessions]);
  var handlePasteSubmit = useCallback(/*#__PURE__*/function () {
    var _ref42 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(text) {
      var sessionId, isNewSession, session, paste, updatedPastes;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            sessionId = activeSessionId;
            isNewSession = false;
            if (sessionId) {
              _context1.n = 2;
              break;
            }
            _context1.n = 1;
            return FRStore.createPasteSession();
          case 1:
            session = _context1.v;
            sessionId = session.id;
            setActiveSessionId(sessionId);
            isNewSession = true;
          case 2:
            _context1.n = 3;
            return FRStore.addPaste(sessionId, text);
          case 3:
            paste = _context1.v;
            if (paste) {
              _context1.n = 4;
              break;
            }
            return _context1.a(2, null);
          case 4:
            _context1.n = 5;
            return FRStore.getPastesBySession(sessionId);
          case 5:
            updatedPastes = _context1.v;
            setActivePastes(updatedPastes);
            _context1.n = 6;
            return refreshPasteSessions();
          case 6:
            // Auto-generate title on first paste in session
            if (isNewSession || updatedPastes.length === 1) {
              generatePasteTitle(text).then(/*#__PURE__*/function () {
                var _ref43 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(title) {
                  return _regenerator().w(function (_context0) {
                    while (1) switch (_context0.n) {
                      case 0:
                        if (!title) {
                          _context0.n = 2;
                          break;
                        }
                        _context0.n = 1;
                        return FRStore.updatePasteSession(sessionId, {
                          title: title
                        });
                      case 1:
                        _context0.n = 2;
                        return refreshPasteSessions();
                      case 2:
                        return _context0.a(2);
                    }
                  }, _callee0);
                }));
                return function (_x7) {
                  return _ref43.apply(this, arguments);
                };
              }());
            }
            return _context1.a(2, paste);
        }
      }, _callee1);
    }));
    return function (_x6) {
      return _ref42.apply(this, arguments);
    };
  }(), [activeSessionId, refreshPasteSessions]);
  var handlePasteProgress = useCallback(/*#__PURE__*/function () {
    var _ref45 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(_ref44) {
      var wordIndex, totalWords, complete, readIdx, updates, _t6;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            wordIndex = _ref44.wordIndex, totalWords = _ref44.totalWords, complete = _ref44.complete;
            if (!(!activePasteId || !activeSessionId)) {
              _context10.n = 1;
              break;
            }
            return _context10.a(2);
          case 1:
            readIdx = complete ? totalWords : Math.min(wordIndex, totalWords);
            updates = {
              readIdx: readIdx
            };
            if (complete) updates.readAt = Date.now();
            _context10.n = 2;
            return FRStore.updatePaste(activePasteId, updates);
          case 2:
            _t6 = setActivePastes;
            _context10.n = 3;
            return FRStore.getPastesBySession(activeSessionId);
          case 3:
            _t6(_context10.v);
          case 4:
            return _context10.a(2);
        }
      }, _callee10);
    }));
    return function (_x8) {
      return _ref45.apply(this, arguments);
    };
  }(), [activePasteId, activeSessionId]);
  var handleDeletePaste = useCallback(/*#__PURE__*/function () {
    var _ref46 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(paste) {
      var sessionId, updated, _t7;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.n) {
          case 0:
            if (paste) {
              _context11.n = 1;
              break;
            }
            return _context11.a(2);
          case 1:
            sessionId = paste.sessionId || activeSessionId;
            _context11.n = 2;
            return FRStore.deletePaste(paste.id);
          case 2:
            if (!sessionId) {
              _context11.n = 4;
              break;
            }
            _context11.n = 3;
            return FRStore.getPastesBySession(sessionId);
          case 3:
            _t7 = _context11.v;
            _context11.n = 5;
            break;
          case 4:
            _t7 = [];
          case 5:
            updated = _t7;
            setActivePastes(updated);
            _context11.n = 6;
            return refreshPasteSessions();
          case 6:
            if (activePasteId === paste.id) {
              setActivePasteId(pickReadablePasteId(updated));
            }
            if (highlightedPasteId === paste.id) setHighlightedPasteId(null);
          case 7:
            return _context11.a(2);
        }
      }, _callee11);
    }));
    return function (_x9) {
      return _ref46.apply(this, arguments);
    };
  }(), [activePasteId, activeSessionId, highlightedPasteId, refreshPasteSessions]);
  var onRefreshLibrary = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
    var _t8;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          setBusy(true);
          _context12.p = 1;
          _context12.n = 2;
          return FRStore.autoScanLibrary(function (p) {
            return setProgress(p);
          });
        case 2:
          _context12.n = 3;
          return refresh();
        case 3:
          _context12.n = 5;
          break;
        case 4:
          _context12.p = 4;
          _t8 = _context12.v;
          console.error('Refresh failed:', _t8);
        case 5:
          _context12.p = 5;
          setBusy(false);
          setProgress(null);
          return _context12.f(5);
        case 6:
          return _context12.a(2);
      }
    }, _callee12, null, [[1, 4, 5, 6]]);
  })), [refresh]);
  var onPickFolder = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
    var _t9;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          setBusy(true);
          _context13.p = 1;
          _context13.n = 2;
          return FRStore.pickFolder(function (p) {
            return setProgress(p);
          });
        case 2:
          _context13.n = 3;
          return refresh();
        case 3:
          _context13.n = 5;
          break;
        case 4:
          _context13.p = 4;
          _t9 = _context13.v;
          if (_t9.name !== 'AbortError') console.error('Folder pick failed:', _t9);
        case 5:
          _context13.p = 5;
          setBusy(false);
          setProgress(null);
          return _context13.f(5);
        case 6:
          return _context13.a(2);
      }
    }, _callee13, null, [[1, 4, 5, 6]]);
  })), [refresh]);
  var onPickInput = useCallback(/*#__PURE__*/function () {
    var _ref49 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(e) {
      var fileList, entries, _t0;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.p = _context14.n) {
          case 0:
            fileList = Array.from(e.target.files || []);
            if (fileList.length) {
              _context14.n = 1;
              break;
            }
            return _context14.a(2);
          case 1:
            setBusy(true);
            _context14.p = 2;
            entries = fileList.map(function (f) {
              return {
                name: f.name,
                file: f
              };
            });
            _context14.n = 3;
            return FRStore.ingestFiles(entries, function (p) {
              return setProgress(p);
            });
          case 3:
            _context14.n = 4;
            return refresh();
          case 4:
            _context14.n = 6;
            break;
          case 5:
            _context14.p = 5;
            _t0 = _context14.v;
            console.error('Ingestion failed:', _t0);
          case 6:
            _context14.p = 6;
            setBusy(false);
            setProgress(null);
            e.target.value = '';
            return _context14.f(6);
          case 7:
            return _context14.a(2);
        }
      }, _callee14, null, [[2, 5, 6, 7]]);
    }));
    return function (_x0) {
      return _ref49.apply(this, arguments);
    };
  }(), [refresh]);
  var onCoverChange = useCallback(/*#__PURE__*/function () {
    var _ref50 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(book, file) {
      var resized, fresh;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.n) {
          case 0:
            _context15.n = 1;
            return FRStore.resizeCover(file);
          case 1:
            resized = _context15.v;
            _context15.n = 2;
            return FRStore.dbGet('books', book.id);
          case 2:
            fresh = _context15.v;
            if (!fresh) {
              _context15.n = 4;
              break;
            }
            fresh.cover = resized;
            _context15.n = 3;
            return FRStore.dbPut('books', fresh);
          case 3:
            _context15.n = 4;
            return refresh();
          case 4:
            return _context15.a(2);
        }
      }, _callee15);
    }));
    return function (_x1, _x10) {
      return _ref50.apply(this, arguments);
    };
  }(), [refresh]);
  var findBookFile = useCallback(function (book) {
    if (!window.electronBooks) return null;
    if (book.fileName) return book.fileName;
    // Match by title/author in the books directory
    var epubs = window.electronBooks.listEpubs();
    var needle = (book.title || '').toLowerCase();
    var match = epubs.find(function (ep) {
      return ep.name.toLowerCase().includes(needle);
    });
    return match ? match.name : null;
  }, []);
  var onDeleteBook = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
    var fileName, targetId;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.n) {
        case 0:
          if (deleteTarget) {
            _context16.n = 1;
            break;
          }
          return _context16.a(2);
        case 1:
          fileName = findBookFile(deleteTarget);
          if (fileName && window.electronBooks) {
            // Permanently delete: archive first as safety net, then delete the archive
            window.electronBooks.deleteBook(fileName);
          }
          _context16.n = 2;
          return FRStore.dbDelete('books', deleteTarget.id);
        case 2:
          targetId = deleteTarget.id;
          setDeleteTarget(null);
          setBooks(function (prev) {
            return prev.filter(function (b) {
              return b.id !== targetId;
            });
          });
        case 3:
          return _context16.a(2);
      }
    }, _callee16);
  })), [deleteTarget, findBookFile]);
  var onArchiveBook = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
    var fileName, targetId;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.n) {
        case 0:
          if (deleteTarget) {
            _context17.n = 1;
            break;
          }
          return _context17.a(2);
        case 1:
          fileName = findBookFile(deleteTarget);
          if (fileName && window.electronBooks) {
            window.electronBooks.archiveBook(fileName);
          }
          _context17.n = 2;
          return FRStore.dbDelete('books', deleteTarget.id);
        case 2:
          targetId = deleteTarget.id;
          setDeleteTarget(null);
          setBooks(function (prev) {
            return prev.filter(function (b) {
              return b.id !== targetId;
            });
          });
        case 3:
          return _context17.a(2);
      }
    }, _callee17);
  })), [deleteTarget, findBookFile]);

  // Main-shell hotkeys: Escape returns from chat to library, N creates a paste session.
  useEffect(function () {
    var onKey = function onKey(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (openBookId) return; // don't intercept while reading
      if (activePasteId) return;
      if ((e.key === 'Escape' || e.key === 'l' || e.key === 'L') && activeSessionId) {
        setActivePasteId(null);
        setHighlightedPasteId(null);
        setActiveSessionId(null);
      } else if (e.key === 'n' || e.key === 'N') handleNewPasteSession();else if (e.key === '?') setShowAppHelp(function (h) {
        return !h;
      });
    };
    window.addEventListener('keydown', onKey);
    return function () {
      return window.removeEventListener('keydown', onKey);
    };
  }, [openBookId, activePasteId, activeSessionId, handleNewPasteSession]);
  useEffect(function () {
    var onPaste = /*#__PURE__*/function () {
      var _ref53 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(e) {
        var _e$clipboardData;
        var text, paste;
        return _regenerator().w(function (_context18) {
          while (1) switch (_context18.n) {
            case 0:
              if (!(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
                _context18.n = 1;
                break;
              }
              return _context18.a(2);
            case 1:
              if (!(openBookId || !activeSessionId)) {
                _context18.n = 2;
                break;
              }
              return _context18.a(2);
            case 2:
              text = (_e$clipboardData = e.clipboardData) === null || _e$clipboardData === void 0 ? void 0 : _e$clipboardData.getData('text/plain');
              if (text !== null && text !== void 0 && text.trim()) {
                _context18.n = 3;
                break;
              }
              return _context18.a(2);
            case 3:
              e.preventDefault();
              _context18.n = 4;
              return handlePasteSubmit(text);
            case 4:
              paste = _context18.v;
              if (paste && activePasteId) {
                setHighlightedPasteId(null);
                setActivePasteId(paste.id);
              }
            case 5:
              return _context18.a(2);
          }
        }, _callee18);
      }));
      return function onPaste(_x11) {
        return _ref53.apply(this, arguments);
      };
    }();
    window.addEventListener('paste', onPaste);
    return function () {
      return window.removeEventListener('paste', onPaste);
    };
  }, [openBookId, activeSessionId, activePasteId, handlePasteSubmit]);
  var openBook = books.find(function (b) {
    return b.id === openBookId;
  });
  var activeSession = pasteSessions.find(function (s) {
    return s.id === activeSessionId;
  });
  var activePaste = activePastes.find(function (p) {
    return p.id === activePasteId;
  });
  var content;
  if (openBook) {
    content = /*#__PURE__*/React.createElement(Reader, {
      theme: theme,
      book: openBook,
      onClose: function onClose() {
        setOpenBookId(null);
        refresh();
      },
      settings: settings,
      onSettings: function onSettings(patch) {
        return setSettings(function (s) {
          return _objectSpread(_objectSpread({}, s), patch);
        });
      }
    });
  } else if (activePaste && activeSession) {
    content = /*#__PURE__*/React.createElement(PasteReaderDeck, {
      theme: theme,
      sessions: pasteSessions,
      session: activeSession,
      pastes: activePastes,
      activePaste: activePaste,
      settings: settings,
      onSettings: function onSettings(patch) {
        return setSettings(function (s) {
          return _objectSpread(_objectSpread({}, s), patch);
        });
      },
      onProgressChange: handlePasteProgress,
      onSelectSession: (/*#__PURE__*/function () {
        var _ref54 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(id) {
          var nextPastes;
          return _regenerator().w(function (_context19) {
            while (1) switch (_context19.n) {
              case 0:
                setActiveSessionId(id);
                _context19.n = 1;
                return FRStore.getPastesBySession(id);
              case 1:
                nextPastes = _context19.v;
                setActivePastes(nextPastes);
                setActivePasteId(pickReadablePasteId(nextPastes));
              case 2:
                return _context19.a(2);
            }
          }, _callee19);
        }));
        return function (_x12) {
          return _ref54.apply(this, arguments);
        };
      }()),
      onNewSession: handleNewPasteSession,
      onRenameSession: handleRenamePasteSession,
      onSelectPaste: setActivePasteId,
      onPasteMore: function onPasteMore() {
        setHighlightedPasteId(activePasteId);
        setActivePasteId(null);
      },
      onDeletePaste: handleDeletePaste,
      onEndSession: function onEndSession() {
        setActivePasteId(null);
        setActiveSessionId(null);
      }
    });
  } else {
    var mainPane;
    if (activeSession) {
      mainPane = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PasteChatPane, {
        theme: theme,
        session: activeSession,
        pastes: activePastes,
        onReadPaste: function onReadPaste(paste) {
          return setActivePasteId(paste.id);
        },
        onDeletePaste: handleDeletePaste,
        onRenameSession: handleRenamePasteSession,
        highlightedPasteId: highlightedPasteId
      }), /*#__PURE__*/React.createElement(PasteComposer, {
        theme: theme
      }));
    } else if (books.length === 0) {
      mainPane = /*#__PURE__*/React.createElement(EmptyLibrary, {
        theme: theme,
        onPick: onPickFolder,
        onPickInput: onPickInput,
        supported: supported,
        busy: busy,
        progress: progress
      });
    } else {
      mainPane = /*#__PURE__*/React.createElement(Library, {
        theme: theme,
        books: books,
        onOpen: function onOpen(b) {
          return setOpenBookId(b.id);
        },
        onAdd: onPickFolder,
        onAddInput: onPickInput,
        onDelete: function onDelete(b) {
          return setDeleteTarget(b);
        },
        onCoverChange: onCoverChange,
        supported: supported,
        busy: busy,
        progress: progress
      });
    }
    content = /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        height: '100%',
        minHeight: 0,
        background: theme.bg,
        color: theme.ink
      }
    }, /*#__PURE__*/React.createElement(PasteSidebar, {
      theme: theme,
      sessions: pasteSessions,
      activeId: activeSessionId,
      onSelect: function onSelect(id) {
        var prev = activeSessionId;
        setActivePasteId(null);
        setActiveSessionId(id);
        cleanupEmptySession(prev).then(refreshPasteSessions);
      },
      onNew: handleNewPasteSession,
      onRename: handleRenamePasteSession,
      onDelete: handleDeletePasteSession,
      onHelp: function onHelp() {
        return setShowAppHelp(true);
      },
      onSettings: function onSettings() {
        return setShowAppSettings(true);
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column'
      }
    }, mainPane));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: theme.bg,
      color: theme.ink
    }
  }, openBook && /*#__PURE__*/React.createElement(TopBar, {
    theme: theme,
    dark: dark,
    setDark: setDark,
    title: openBook.title
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0
    }
  }, content), deleteTarget && /*#__PURE__*/React.createElement(DeleteModal, {
    book: deleteTarget,
    theme: theme,
    onArchive: onArchiveBook,
    onDelete: onDeleteBook,
    onCancel: function onCancel() {
      return setDeleteTarget(null);
    }
  }), showAppSettings && /*#__PURE__*/React.createElement(SettingsPanel, {
    theme: theme,
    settings: settings,
    onSettings: function onSettings(patch) {
      return setSettings(function (s) {
        return _objectSpread(_objectSpread({}, s), patch);
      });
    },
    onClose: function onClose() {
      return setShowAppSettings(false);
    }
  }), showAppHelp && /*#__PURE__*/React.createElement(HelpModal, {
    theme: theme,
    onClose: function onClose() {
      return setShowAppHelp(false);
    }
  }));
}
window.FRApp = App;
var rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render(/*#__PURE__*/React.createElement(App, null));
  var bootStatus = document.getElementById('boot-status');
  if (bootStatus) bootStatus.remove();
}
})(window.React, window.ReactDOM, window.FRStore);
