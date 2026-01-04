var He = Object.defineProperty;
var Re = (t, e, n) => e in t ? He(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var re = (t, e, n) => Re(t, typeof e != "symbol" ? e + "" : e, n);
var O, x, me, A, oe, xe, ye, ve, Q, K, q, N = {}, be = [], $e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, j = Array.isArray;
function T(t, e) {
  for (var n in e) t[n] = e[n];
  return t;
}
function ee(t) {
  t && t.parentNode && t.parentNode.removeChild(t);
}
function De(t, e, n) {
  var o, l, r, s = {};
  for (r in e) r == "key" ? o = e[r] : r == "ref" ? l = e[r] : s[r] = e[r];
  if (arguments.length > 2 && (s.children = arguments.length > 3 ? O.call(arguments, 2) : n), typeof t == "function" && t.defaultProps != null) for (r in t.defaultProps) s[r] === void 0 && (s[r] = t.defaultProps[r]);
  return F(t, s, o, l, null);
}
function F(t, e, n, o, l) {
  var r = { type: t, props: e, key: n, ref: o, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: l ?? ++me, __i: -1, __u: 0 };
  return l == null && x.vnode != null && x.vnode(r), r;
}
function Pe() {
  return { current: null };
}
function z(t) {
  return t.children;
}
function P(t, e) {
  this.props = t, this.context = e;
}
function D(t, e) {
  if (e == null) return t.__ ? D(t.__, t.__i + 1) : null;
  for (var n; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) return n.__e;
  return typeof t.type == "function" ? D(t) : null;
}
function Ce(t) {
  var e, n;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++) if ((n = t.__k[e]) != null && n.__e != null) {
      t.__e = t.__c.base = n.__e;
      break;
    }
    return Ce(t);
  }
}
function ie(t) {
  (!t.__d && (t.__d = !0) && A.push(t) && !W.__r++ || oe != x.debounceRendering) && ((oe = x.debounceRendering) || xe)(W);
}
function W() {
  for (var t, e, n, o, l, r, s, a = 1; A.length; ) A.length > a && A.sort(ye), t = A.shift(), a = A.length, t.__d && (n = void 0, o = void 0, l = (o = (e = t).__v).__e, r = [], s = [], e.__P && ((n = T({}, o)).__v = o.__v + 1, x.vnode && x.vnode(n), te(e.__P, n, o, e.__n, e.__P.namespaceURI, 32 & o.__u ? [l] : null, r, l ?? D(o), !!(32 & o.__u), s), n.__v = o.__v, n.__.__k[n.__i] = n, Se(r, n, s), o.__e = o.__ = null, n.__e != l && Ce(n)));
  W.__r = 0;
}
function ke(t, e, n, o, l, r, s, a, u, _, c) {
  var i, f, d, g, v, C, m, h = o && o.__k || be, k = e.length;
  for (u = Ne(n, e, h, u, k), i = 0; i < k; i++) (d = n.__k[i]) != null && (f = d.__i == -1 ? N : h[d.__i] || N, d.__i = i, C = te(t, d, f, l, r, s, a, u, _, c), g = d.__e, d.ref && f.ref != d.ref && (f.ref && ne(f.ref, null, d), c.push(d.ref, d.__c || g, d)), v == null && g != null && (v = g), (m = !!(4 & d.__u)) || f.__k === d.__k ? u = we(d, u, t, m) : typeof d.type == "function" && C !== void 0 ? u = C : g && (u = g.nextSibling), d.__u &= -7);
  return n.__e = v, u;
}
function Ne(t, e, n, o, l) {
  var r, s, a, u, _, c = n.length, i = c, f = 0;
  for (t.__k = new Array(l), r = 0; r < l; r++) (s = e[r]) != null && typeof s != "boolean" && typeof s != "function" ? (typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? s = t.__k[r] = F(null, s, null, null, null) : j(s) ? s = t.__k[r] = F(z, { children: s }, null, null, null) : s.constructor == null && s.__b > 0 ? s = t.__k[r] = F(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : t.__k[r] = s, u = r + f, s.__ = t, s.__b = t.__b + 1, a = null, (_ = s.__i = Be(s, n, u, i)) != -1 && (i--, (a = n[_]) && (a.__u |= 2)), a == null || a.__v == null ? (_ == -1 && (l > c ? f-- : l < c && f++), typeof s.type != "function" && (s.__u |= 4)) : _ != u && (_ == u - 1 ? f-- : _ == u + 1 ? f++ : (_ > u ? f-- : f++, s.__u |= 4))) : t.__k[r] = null;
  if (i) for (r = 0; r < c; r++) (a = n[r]) != null && !(2 & a.__u) && (a.__e == o && (o = D(a)), Ee(a, a));
  return o;
}
function we(t, e, n, o) {
  var l, r;
  if (typeof t.type == "function") {
    for (l = t.__k, r = 0; l && r < l.length; r++) l[r] && (l[r].__ = t, e = we(l[r], e, n, o));
    return e;
  }
  t.__e != e && (o && (e && t.type && !e.parentNode && (e = D(t)), n.insertBefore(t.__e, e || null)), e = t.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType == 8);
  return e;
}
function Be(t, e, n, o) {
  var l, r, s, a = t.key, u = t.type, _ = e[n], c = _ != null && (2 & _.__u) == 0;
  if (_ === null && a == null || c && a == _.key && u == _.type) return n;
  if (o > (c ? 1 : 0)) {
    for (l = n - 1, r = n + 1; l >= 0 || r < e.length; ) if ((_ = e[s = l >= 0 ? l-- : r++]) != null && !(2 & _.__u) && a == _.key && u == _.type) return s;
  }
  return -1;
}
function le(t, e, n) {
  e[0] == "-" ? t.setProperty(e, n ?? "") : t[e] = n == null ? "" : typeof n != "number" || $e.test(e) ? n : n + "px";
}
function B(t, e, n, o, l) {
  var r, s;
  e: if (e == "style") if (typeof n == "string") t.style.cssText = n;
  else {
    if (typeof o == "string" && (t.style.cssText = o = ""), o) for (e in o) n && e in n || le(t.style, e, "");
    if (n) for (e in n) o && n[e] == o[e] || le(t.style, e, n[e]);
  }
  else if (e[0] == "o" && e[1] == "n") r = e != (e = e.replace(ve, "$1")), s = e.toLowerCase(), e = s in t || e == "onFocusOut" || e == "onFocusIn" ? s.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + r] = n, n ? o ? n.u = o.u : (n.u = Q, t.addEventListener(e, r ? q : K, r)) : t.removeEventListener(e, r ? q : K, r);
  else {
    if (l == "http://www.w3.org/2000/svg") e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t) try {
      t[e] = n ?? "";
      break e;
    } catch {
    }
    typeof n == "function" || (n == null || n === !1 && e[4] != "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && n == 1 ? "" : n));
  }
}
function _e(t) {
  return function(e) {
    if (this.l) {
      var n = this.l[e.type + t];
      if (e.t == null) e.t = Q++;
      else if (e.t < n.u) return;
      return n(x.event ? x.event(e) : e);
    }
  };
}
function te(t, e, n, o, l, r, s, a, u, _) {
  var c, i, f, d, g, v, C, m, h, k, w, L, S, I, H, M, G, E = e.type;
  if (e.constructor != null) return null;
  128 & n.__u && (u = !!(32 & n.__u), r = [a = e.__e = n.__e]), (c = x.__b) && c(e);
  e: if (typeof E == "function") try {
    if (m = e.props, h = "prototype" in E && E.prototype.render, k = (c = E.contextType) && o[c.__c], w = c ? k ? k.props.value : c.__ : o, n.__c ? C = (i = e.__c = n.__c).__ = i.__E : (h ? e.__c = i = new E(m, w) : (e.__c = i = new P(m, w), i.constructor = E, i.render = Ue), k && k.sub(i), i.state || (i.state = {}), i.__n = o, f = i.__d = !0, i.__h = [], i._sb = []), h && i.__s == null && (i.__s = i.state), h && E.getDerivedStateFromProps != null && (i.__s == i.state && (i.__s = T({}, i.__s)), T(i.__s, E.getDerivedStateFromProps(m, i.__s))), d = i.props, g = i.state, i.__v = e, f) h && E.getDerivedStateFromProps == null && i.componentWillMount != null && i.componentWillMount(), h && i.componentDidMount != null && i.__h.push(i.componentDidMount);
    else {
      if (h && E.getDerivedStateFromProps == null && m !== d && i.componentWillReceiveProps != null && i.componentWillReceiveProps(m, w), e.__v == n.__v || !i.__e && i.shouldComponentUpdate != null && i.shouldComponentUpdate(m, i.__s, w) === !1) {
        for (e.__v != n.__v && (i.props = m, i.state = i.__s, i.__d = !1), e.__e = n.__e, e.__k = n.__k, e.__k.some(function(R) {
          R && (R.__ = e);
        }), L = 0; L < i._sb.length; L++) i.__h.push(i._sb[L]);
        i._sb = [], i.__h.length && s.push(i);
        break e;
      }
      i.componentWillUpdate != null && i.componentWillUpdate(m, i.__s, w), h && i.componentDidUpdate != null && i.__h.push(function() {
        i.componentDidUpdate(d, g, v);
      });
    }
    if (i.context = w, i.props = m, i.__P = t, i.__e = !1, S = x.__r, I = 0, h) {
      for (i.state = i.__s, i.__d = !1, S && S(e), c = i.render(i.props, i.state, i.context), H = 0; H < i._sb.length; H++) i.__h.push(i._sb[H]);
      i._sb = [];
    } else do
      i.__d = !1, S && S(e), c = i.render(i.props, i.state, i.context), i.state = i.__s;
    while (i.__d && ++I < 25);
    i.state = i.__s, i.getChildContext != null && (o = T(T({}, o), i.getChildContext())), h && !f && i.getSnapshotBeforeUpdate != null && (v = i.getSnapshotBeforeUpdate(d, g)), M = c, c != null && c.type === z && c.key == null && (M = Le(c.props.children)), a = ke(t, j(M) ? M : [M], e, n, o, l, r, s, a, u, _), i.base = e.__e, e.__u &= -161, i.__h.length && s.push(i), C && (i.__E = i.__ = null);
  } catch (R) {
    if (e.__v = null, u || r != null) if (R.then) {
      for (e.__u |= u ? 160 : 128; a && a.nodeType == 8 && a.nextSibling; ) a = a.nextSibling;
      r[r.indexOf(a)] = null, e.__e = a;
    } else {
      for (G = r.length; G--; ) ee(r[G]);
      Y(e);
    }
    else e.__e = n.__e, e.__k = n.__k, R.then || Y(e);
    x.__e(R, e, n);
  }
  else r == null && e.__v == n.__v ? (e.__k = n.__k, e.__e = n.__e) : a = e.__e = Fe(n.__e, e, n, o, l, r, s, u, _);
  return (c = x.diffed) && c(e), 128 & e.__u ? void 0 : a;
}
function Y(t) {
  t && t.__c && (t.__c.__e = !0), t && t.__k && t.__k.forEach(Y);
}
function Se(t, e, n) {
  for (var o = 0; o < n.length; o++) ne(n[o], n[++o], n[++o]);
  x.__c && x.__c(e, t), t.some(function(l) {
    try {
      t = l.__h, l.__h = [], t.some(function(r) {
        r.call(l);
      });
    } catch (r) {
      x.__e(r, l.__v);
    }
  });
}
function Le(t) {
  return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : j(t) ? t.map(Le) : T({}, t);
}
function Fe(t, e, n, o, l, r, s, a, u) {
  var _, c, i, f, d, g, v, C = n.props || N, m = e.props, h = e.type;
  if (h == "svg" ? l = "http://www.w3.org/2000/svg" : h == "math" ? l = "http://www.w3.org/1998/Math/MathML" : l || (l = "http://www.w3.org/1999/xhtml"), r != null) {
    for (_ = 0; _ < r.length; _++) if ((d = r[_]) && "setAttribute" in d == !!h && (h ? d.localName == h : d.nodeType == 3)) {
      t = d, r[_] = null;
      break;
    }
  }
  if (t == null) {
    if (h == null) return document.createTextNode(m);
    t = document.createElementNS(l, h, m.is && m), a && (x.__m && x.__m(e, r), a = !1), r = null;
  }
  if (h == null) C === m || a && t.data == m || (t.data = m);
  else {
    if (r = r && O.call(t.childNodes), !a && r != null) for (C = {}, _ = 0; _ < t.attributes.length; _++) C[(d = t.attributes[_]).name] = d.value;
    for (_ in C) if (d = C[_], _ != "children") {
      if (_ == "dangerouslySetInnerHTML") i = d;
      else if (!(_ in m)) {
        if (_ == "value" && "defaultValue" in m || _ == "checked" && "defaultChecked" in m) continue;
        B(t, _, null, d, l);
      }
    }
    for (_ in m) d = m[_], _ == "children" ? f = d : _ == "dangerouslySetInnerHTML" ? c = d : _ == "value" ? g = d : _ == "checked" ? v = d : a && typeof d != "function" || C[_] === d || B(t, _, d, C[_], l);
    if (c) a || i && (c.__html == i.__html || c.__html == t.innerHTML) || (t.innerHTML = c.__html), e.__k = [];
    else if (i && (t.innerHTML = ""), ke(e.type == "template" ? t.content : t, j(f) ? f : [f], e, n, o, h == "foreignObject" ? "http://www.w3.org/1999/xhtml" : l, r, s, r ? r[0] : n.__k && D(n, 0), a, u), r != null) for (_ = r.length; _--; ) ee(r[_]);
    a || (_ = "value", h == "progress" && g == null ? t.removeAttribute("value") : g != null && (g !== t[_] || h == "progress" && !g || h == "option" && g != C[_]) && B(t, _, g, C[_], l), _ = "checked", v != null && v != t[_] && B(t, _, v, C[_], l));
  }
  return t;
}
function ne(t, e, n) {
  try {
    if (typeof t == "function") {
      var o = typeof t.__u == "function";
      o && t.__u(), o && e == null || (t.__u = t(e));
    } else t.current = e;
  } catch (l) {
    x.__e(l, n);
  }
}
function Ee(t, e, n) {
  var o, l;
  if (x.unmount && x.unmount(t), (o = t.ref) && (o.current && o.current != t.__e || ne(o, null, e)), (o = t.__c) != null) {
    if (o.componentWillUnmount) try {
      o.componentWillUnmount();
    } catch (r) {
      x.__e(r, e);
    }
    o.base = o.__P = null;
  }
  if (o = t.__k) for (l = 0; l < o.length; l++) o[l] && Ee(o[l], e, n || typeof t.type != "function");
  n || ee(t.__e), t.__c = t.__ = t.__e = void 0;
}
function Ue(t, e, n) {
  return this.constructor(t, n);
}
function se(t, e, n) {
  var o, l, r, s;
  e == document && (e = document.documentElement), x.__ && x.__(t, e), l = (o = !1) ? null : e.__k, r = [], s = [], te(e, t = e.__k = De(z, null, [t]), l || N, N, e.namespaceURI, l ? null : e.firstChild ? O.call(e.childNodes) : null, r, l ? l.__e : e.firstChild, o, s), Se(r, t, s);
}
O = be.slice, x = { __e: function(t, e, n, o) {
  for (var l, r, s; e = e.__; ) if ((l = e.__c) && !l.__) try {
    if ((r = l.constructor) && r.getDerivedStateFromError != null && (l.setState(r.getDerivedStateFromError(t)), s = l.__d), l.componentDidCatch != null && (l.componentDidCatch(t, o || {}), s = l.__d), s) return l.__E = l;
  } catch (a) {
    t = a;
  }
  throw t;
} }, me = 0, P.prototype.setState = function(t, e) {
  var n;
  n = this.__s != null && this.__s != this.state ? this.__s : this.__s = T({}, this.state), typeof t == "function" && (t = t(T({}, n), this.props)), t && T(n, t), t != null && this.__v && (e && this._sb.push(e), ie(this));
}, P.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), ie(this));
}, P.prototype.render = z, A = [], xe = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, ye = function(t, e) {
  return t.__v.__b - e.__v.__b;
}, W.__r = 0, ve = /(PointerCapture)$|Capture$/i, Q = 0, K = _e(!1), q = _e(!0);
var We = 0;
function p(t, e, n, o, l, r) {
  e || (e = {});
  var s, a, u = e;
  if ("ref" in u) for (a in u = {}, e) a == "ref" ? s = e[a] : u[a] = e[a];
  var _ = { type: t, props: u, key: n, ref: s, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --We, __i: -1, __u: 0, __source: l, __self: r };
  if (typeof t == "function" && (s = t.defaultProps)) for (a in s) u[a] === void 0 && (u[a] = s[a]);
  return x.vnode && x.vnode(_), _;
}
var V, y, Z, ae, J = 0, Te = [], b = x, ce = b.__b, de = b.__r, pe = b.diffed, ue = b.__c, fe = b.unmount, he = b.__;
function Ie(t, e) {
  b.__h && b.__h(y, t, J || e), J = 0;
  var n = y.__H || (y.__H = { __: [], __h: [] });
  return t >= n.__.length && n.__.push({}), n.__[t];
}
function $(t) {
  return J = 1, Ve(Ae, t);
}
function Ve(t, e, n) {
  var o = Ie(V++, 2);
  if (o.t = t, !o.__c && (o.__ = [Ae(void 0, e), function(a) {
    var u = o.__N ? o.__N[0] : o.__[0], _ = o.t(u, a);
    u !== _ && (o.__N = [_, o.__[1]], o.__c.setState({}));
  }], o.__c = y, !y.__f)) {
    var l = function(a, u, _) {
      if (!o.__c.__H) return !0;
      var c = o.__c.__H.__.filter(function(f) {
        return !!f.__c;
      });
      if (c.every(function(f) {
        return !f.__N;
      })) return !r || r.call(this, a, u, _);
      var i = o.__c.props !== a;
      return c.forEach(function(f) {
        if (f.__N) {
          var d = f.__[0];
          f.__ = f.__N, f.__N = void 0, d !== f.__[0] && (i = !0);
        }
      }), r && r.call(this, a, u, _) || i;
    };
    y.__f = !0;
    var r = y.shouldComponentUpdate, s = y.componentWillUpdate;
    y.componentWillUpdate = function(a, u, _) {
      if (this.__e) {
        var c = r;
        r = void 0, l(a, u, _), r = c;
      }
      s && s.call(this, a, u, _);
    }, y.shouldComponentUpdate = l;
  }
  return o.__N || o.__;
}
function Me(t, e) {
  var n = Ie(V++, 3);
  !b.__s && ze(n.__H, e) && (n.__ = t, n.u = e, y.__H.__h.push(n));
}
function Oe() {
  for (var t; t = Te.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(U), t.__H.__h.forEach(X), t.__H.__h = [];
  } catch (e) {
    t.__H.__h = [], b.__e(e, t.__v);
  }
}
b.__b = function(t) {
  y = null, ce && ce(t);
}, b.__ = function(t, e) {
  t && e.__k && e.__k.__m && (t.__m = e.__k.__m), he && he(t, e);
}, b.__r = function(t) {
  de && de(t), V = 0;
  var e = (y = t.__c).__H;
  e && (Z === y ? (e.__h = [], y.__h = [], e.__.forEach(function(n) {
    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
  })) : (e.__h.forEach(U), e.__h.forEach(X), e.__h = [], V = 0)), Z = y;
}, b.diffed = function(t) {
  pe && pe(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (Te.push(e) !== 1 && ae === b.requestAnimationFrame || ((ae = b.requestAnimationFrame) || je)(Oe)), e.__H.__.forEach(function(n) {
    n.u && (n.__H = n.u), n.u = void 0;
  })), Z = y = null;
}, b.__c = function(t, e) {
  e.some(function(n) {
    try {
      n.__h.forEach(U), n.__h = n.__h.filter(function(o) {
        return !o.__ || X(o);
      });
    } catch (o) {
      e.some(function(l) {
        l.__h && (l.__h = []);
      }), e = [], b.__e(o, n.__v);
    }
  }), ue && ue(t, e);
}, b.unmount = function(t) {
  fe && fe(t);
  var e, n = t.__c;
  n && n.__H && (n.__H.__.forEach(function(o) {
    try {
      U(o);
    } catch (l) {
      e = l;
    }
  }), n.__H = void 0, e && b.__e(e, n.__v));
};
var ge = typeof requestAnimationFrame == "function";
function je(t) {
  var e, n = function() {
    clearTimeout(o), ge && cancelAnimationFrame(e), setTimeout(t);
  }, o = setTimeout(n, 35);
  ge && (e = requestAnimationFrame(n));
}
function U(t) {
  var e = y, n = t.__c;
  typeof n == "function" && (t.__c = void 0, n()), y = e;
}
function X(t) {
  var e = y;
  t.__c = t.__(), y = e;
}
function ze(t, e) {
  return !t || t.length !== e.length || e.some(function(n, o) {
    return n !== t[o];
  });
}
function Ae(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function Ge() {
  const [t, e] = $({
    primaryColor: "#007bff",
    // Fallback color
    fontFamily: "inherit"
  });
  return Me(() => {
    const n = () => {
      try {
        const o = ["a", "button", ".btn", ".button"], l = {};
        let r = 0, s = "#007bff";
        const a = (f) => {
          const d = window.getComputedStyle(f), g = d.backgroundColor, v = d.color;
          g && g !== "rgba(0, 0, 0, 0)" && g !== "rgb(255, 255, 255)" && g !== "rgb(0, 0, 0)" && (l[g] = (l[g] || 0) + 1), f.tagName === "A" && v && v !== "rgb(0, 0, 0)" && v !== "rgb(255, 255, 255)" && (l[v] = (l[v] || 0) + 0.5);
        };
        o.forEach((f) => {
          const d = document.querySelectorAll(f);
          for (let g = 0; g < Math.min(d.length, 50); g++)
            a(d[g]);
        }), Object.entries(l).forEach(([f, d]) => {
          d > r && (r = d, s = f);
        });
        const u = document.querySelector("h1") || document.querySelector("h2"), _ = document.body, c = u || _;
        let i = "inherit";
        c && (i = window.getComputedStyle(c).fontFamily), e({ primaryColor: s, fontFamily: i });
      } catch (o) {
        console.warn("Kameo: Theme detection failed", o);
      }
    };
    if (document.readyState === "complete")
      n();
    else
      return window.addEventListener("load", n), () => window.removeEventListener("load", n);
    n();
  }, []), t;
}
function Ze({ isOpen: t, onClick: e, businessType: n, color: o }) {
  return /* @__PURE__ */ p(
    "div",
    {
      onClick: e,
      style: {
        backgroundColor: o,
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "transform 0.2s",
        marginTop: "auto"
      },
      onMouseEnter: (r) => {
        r.currentTarget.style.transform = "scale(1.1) translateY(-2px)", r.currentTarget.style.boxShadow = `0 12px 24px -6px ${o}80`;
      },
      onMouseLeave: (r) => {
        r.currentTarget.style.transform = "scale(1)", r.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
      },
      children: (() => {
        const r = { width: "28px", height: "28px", fill: "white" };
        if (t)
          return /* @__PURE__ */ p("span", { style: { color: "white", fontSize: "28px", fontWeight: "bold", lineHeight: "1" }, children: "×" });
        switch (n) {
          case "leaf":
          case "gardener":
            return /* @__PURE__ */ p("svg", { viewBox: "0 0 24 24", style: r, children: /* @__PURE__ */ p("path", { d: "M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,5.25,9,6.25S2,11.5,2,13.5a6.22,6.22,0,0,0,1.75,3.75C7,13,7,9,17,8Z" }) });
          case "bolt":
          case "electrician":
            return /* @__PURE__ */ p("svg", { viewBox: "0 0 24 24", style: r, children: /* @__PURE__ */ p("path", { d: "M7,2V13H10V22L17,10H14V2H7Z" }) });
          case "lock":
          case "locksmith":
            return /* @__PURE__ */ p("svg", { viewBox: "0 0 24 24", style: r, children: /* @__PURE__ */ p("path", { d: "M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" }) });
          default:
            return /* @__PURE__ */ p("svg", { viewBox: "0 0 24 24", style: r, children: /* @__PURE__ */ p("path", { d: "M13.78,5.37C14.07,5.08 14.28,4.72 14.38,4.32C14.47,3.92 14.47,3.5 14.36,3.1L12.92,3.1C13,3.5 12.96,3.95 12.79,4.36C12.63,4.77 12.35,5.13 12,5.38L10.5,3.88L9.09,5.29L10.59,6.79C9.76,7.63 8.39,7.63 7.55,6.79C6.71,5.95 6.71,4.59 7.55,3.75L13.78,5.37M21.71,20.29L20.29,21.71C20.1,21.9 19.86,22 19.59,22C19.32,22 19.07,21.9 18.88,21.71L10.38,13.22C9.53,13.88 8.46,14.19 7.42,14.05C6.03,13.87 4.79,13.14 3.88,12.06L6.53,9.41L5.12,8L2.47,10.65C2.07,10.15 1.78,9.59 1.63,9C1.41,8.13 1.5,7.21 1.9,6.39L4.05,8.54L9,3.59L6.85,1.44C7.79,0.92 8.91,0.76 9.94,1C11.39,1.31 12.63,2.3 13.23,3.61L14.73,2.1C15.53,1.3 16.89,1.64 17.2,2.73L17.7,4.42L19.46,4.96C20.55,5.3 20.89,6.66 20.1,7.46L18.6,8.96L21.71,20.29Z" }) });
        }
      })()
    }
  );
}
class Ke extends P {
  constructor(n) {
    super(n);
    re(this, "handleKeyDown", (n) => {
      n.key === "Enter" && this.props.onSend();
    });
    this.messagesEndRef = Pe();
  }
  componentDidUpdate() {
    this.messagesEndRef.current && this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }
  render() {
    const { messages: n, inputValue: o, onInputChange: l, onSend: r, onClose: s, color: a, status: u } = this.props, _ = (c) => c.sender === "user";
    return /* @__PURE__ */ p("div", { style: {
      position: "fixed",
      bottom: "80px",
      right: "20px",
      width: "360px",
      maxWidth: "90vw",
      height: "520px",
      backgroundColor: "rgba(255, 255, 255, 0.92)",
      // Increased opacity for better visibility
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      borderRadius: "24px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.08)",
      // Stronger shadow and visible border
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      animation: "kameo-slide-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      zIndex: 99999,
      transition: "all 0.3s ease"
    }, children: [
      /* @__PURE__ */ p("style", { children: `
                    @keyframes kameo-slide-in {
                        from { opacity: 0; transform: translateY(40px) scale(0.95); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    @keyframes kameo-message-pop {
                        from { opacity: 0; transform: scale(0.95) translateY(10px); }
                        to { opacity: 1; transform: scale(1) translateY(0); }
                    }
                    /* Hide Scrollbar but keep functionality */
                    .kameo-scroll::-webkit-scrollbar { width: 4px; }
                    .kameo-scroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); borderRadius: 10px; }
                    .kameo-scroll::-webkit-scrollbar-track { background: transparent; }
                ` }),
      /* @__PURE__ */ p("div", { style: {
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(0,0,0,0.03)",
        background: "rgba(255,255,255,0.4)"
      }, children: [
        /* @__PURE__ */ p("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
          /* @__PURE__ */ p("div", { style: {
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: `linear-gradient(135deg, ${a}, ${a}dd)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            boxShadow: `0 8px 16px -4px ${a}66`
          }, children: /* @__PURE__ */ p("svg", { viewBox: "0 0 24 24", style: { width: "20px", height: "20px", fill: "currentColor" }, children: /* @__PURE__ */ p("path", { d: "M12,2A10,10 0 0,0 12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" }) }) }),
          /* @__PURE__ */ p("div", { style: { display: "flex", flexDirection: "column" }, children: [
            /* @__PURE__ */ p("span", { style: { fontWeight: 700, fontSize: "15px", color: "#1a1a1a" }, children: "Kameo Assistant" }),
            /* @__PURE__ */ p("span", { style: { fontSize: "11px", color: "#666", fontWeight: 500 }, children: u === "PROCESSING" ? "En train d'écrire..." : "En ligne" })
          ] })
        ] }),
        /* @__PURE__ */ p(
          "button",
          {
            onClick: s,
            style: {
              background: "rgba(0,0,0,0.04)",
              border: "none",
              color: "#666",
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            },
            onMouseEnter: (c) => {
              c.currentTarget.style.background = "#eee", c.currentTarget.style.color = "#000";
            },
            onMouseLeave: (c) => {
              c.currentTarget.style.background = "rgba(0,0,0,0.04)", c.currentTarget.style.color = "#666";
            },
            children: /* @__PURE__ */ p("svg", { viewBox: "0 0 24 24", style: { width: "18px", height: "18px", fill: "currentColor" }, children: /* @__PURE__ */ p("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" }) })
          }
        )
      ] }),
      /* @__PURE__ */ p("div", { className: "kameo-scroll", style: {
        flex: 1,
        overflowY: "auto",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        scrollBehavior: "smooth",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 20px, black calc(100% - 20px), transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20px, black calc(100% - 20px), transparent 100%)"
      }, children: [
        /* @__PURE__ */ p("div", { style: { height: "10px" } }),
        n.map((c, i) => /* @__PURE__ */ p("div", { style: {
          fontSize: "15px",
          lineHeight: "1.6",
          padding: "14px 18px",
          borderRadius: "20px",
          maxWidth: "85%",
          alignSelf: _(c) ? "flex-end" : "flex-start",
          backgroundColor: _(c) ? a : "white",
          color: _(c) ? "white" : "#1e1e1e",
          borderBottomRightRadius: _(c) ? "4px" : "20px",
          borderBottomLeftRadius: _(c) ? "20px" : "4px",
          boxShadow: _(c) ? `0 8px 16px -4px ${a}66` : "0 4px 12px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)",
          animation: "kameo-message-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          marginBottom: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }, children: [
          /* @__PURE__ */ p("div", { children: c.text }),
          c.estimate && /* @__PURE__ */ p("div", { style: {
            backgroundColor: _(c) ? "rgba(255,255,255,0.1)" : "#f8f9fa",
            padding: "12px",
            borderRadius: "12px",
            border: _(c) ? "1px solid rgba(255,255,255,0.2)" : "1px solid #e9ecef",
            marginTop: "4px"
          }, children: [
            /* @__PURE__ */ p("div", { style: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "13px", fontWeight: 500 }, children: [
              /* @__PURE__ */ p("div", { style: { width: "20px", height: "20px", borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ p("svg", { viewBox: "0 0 24 24", style: { width: "12px", height: "12px", fill: "#16a34a" }, children: /* @__PURE__ */ p("path", { d: "M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" }) }) }),
              /* @__PURE__ */ p("span", { style: { color: _(c) ? "white" : "#374151" }, children: "Intervention: Standard" })
            ] }),
            /* @__PURE__ */ p("div", { style: { display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 500 }, children: [
              /* @__PURE__ */ p("div", { style: { width: "20px", height: "20px", borderRadius: "50%", background: "#fef9c3", display: "flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ p("svg", { viewBox: "0 0 24 24", style: { width: "12px", height: "12px", fill: "#ca8a04" }, children: /* @__PURE__ */ p("path", { d: "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" }) }) }),
              /* @__PURE__ */ p("span", { style: { color: _(c) ? "white" : "#374151" }, children: [
                "Estimation: ",
                c.estimate
              ] })
            ] })
          ] }),
          c.showBooking && /* @__PURE__ */ p("div", { style: { display: "flex", gap: "8px", marginTop: "4px" }, children: [
            /* @__PURE__ */ p(
              "input",
              {
                type: "tel",
                placeholder: "06 12 34 56 78",
                onKeyDown: (f) => {
                  f.key === "Enter" && f.target.value.trim() && r(f.target.value);
                },
                style: {
                  flex: 1,
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  padding: "8px 12px",
                  fontSize: "14px",
                  outline: "none",
                  width: "100%"
                }
              }
            ),
            /* @__PURE__ */ p(
              "button",
              {
                onClick: (f) => {
                  const d = f.currentTarget.previousElementSibling;
                  d.value.trim() && r(d.value);
                },
                style: {
                  backgroundColor: a,
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                },
                children: [
                  /* @__PURE__ */ p("svg", { viewBox: "0 0 24 24", style: { width: "14px", height: "14px", fill: "currentColor" }, children: /* @__PURE__ */ p("path", { d: "M20,15.5C18.8,15.5 17.5,15.3 16.4,14.9C16,14.8 15.6,14.9 15.3,15.2L13.2,17.3C10.5,15.9 8.1,13.5 6.7,10.8L8.8,8.7C9.1,8.4 9.2,8 9.1,7.6C8.7,6.4 8.5,5.2 8.5,4C8.5,3.5 8,3 7.5,3H4C3.5,3 3,3.5 3,4C3,13.4 10.6,21 20,21C20.5,21 21,20.5 21,20V16.5C21,16 20.5,15.5 20,15.5M19,12H21C21,7 17,3 12,3V5C15.9,5 19,8.1 19,12M15,12H17C17,9.2 14.8,7 12,7V9C13.7,9 15,10.3 15,12Z" }) }),
                  "Réserver"
                ]
              }
            )
          ] })
        ] }, i)),
        /* @__PURE__ */ p("div", { ref: this.messagesEndRef, style: { height: "10px" } })
      ] }),
      /* @__PURE__ */ p("div", { style: {
        padding: "20px",
        background: "linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)"
      }, children: [
        /* @__PURE__ */ p("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "white",
          padding: "6px",
          borderRadius: "30px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
          transition: "box-shadow 0.2s"
        }, children: [
          /* @__PURE__ */ p(
            "input",
            {
              value: o,
              onInput: l,
              onKeyDown: this.handleKeyDown,
              placeholder: "Votre message...",
              disabled: u === "PROCESSING",
              style: {
                flex: 1,
                padding: "12px 16px",
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "15px",
                color: "#1a1a1a"
              }
            }
          ),
          /* @__PURE__ */ p(
            "button",
            {
              onClick: r,
              disabled: u === "PROCESSING" || !o.trim(),
              style: {
                backgroundColor: u === "PROCESSING" || !o.trim() ? "#f0f0f0" : a,
                color: u === "PROCESSING" || !o.trim() ? "#999" : "white",
                border: "none",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: u === "PROCESSING" || !o.trim() ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                boxShadow: u === "PROCESSING" || !o.trim() ? "none" : `0 4px 12px ${a}66`
              },
              onMouseEnter: (c) => !c.currentTarget.disabled && (c.currentTarget.style.transform = "scale(1.1)"),
              onMouseLeave: (c) => !c.currentTarget.disabled && (c.currentTarget.style.transform = "scale(1)"),
              children: /* @__PURE__ */ p("svg", { viewBox: "0 0 24 24", style: { width: "20px", height: "20px", fill: "currentColor", transform: u === "PROCESSING" || !o.trim() ? "none" : "translateX(1px)" }, children: /* @__PURE__ */ p("path", { d: "M2,21L23,12L2,3V10L17,12L2,14V21Z" }) })
            }
          )
        ] }),
        /* @__PURE__ */ p("div", { style: { textAlign: "center", marginTop: "10px" }, children: /* @__PURE__ */ p("span", { style: { fontSize: "10px", color: "#999", fontWeight: 500, letterSpacing: "0.5px" }, children: "POWERED BY KAMEO AI" }) })
      ] })
    ] });
  }
}
function qe({ artisanId: t, proxyUrl: e }) {
  const [n, o] = $(!1), [l, r] = $([]), [s, a] = $(""), [u, _] = $("IDLE"), [c, i] = $("generic"), { primaryColor: f, fontFamily: d } = Ge();
  Me(() => {
    v("Bonjour, je suis l'assistant virtuel. Une urgence ou un devis ?"), g();
  }, [t]);
  const g = async () => {
    if (t)
      try {
        console.log("Fetching details for:", t);
      } catch (h) {
        console.error(h);
      }
  }, v = (h) => {
    r((k) => [...k, { sender: "bot", text: h }]);
  }, C = (h) => {
    r((k) => [...k, { sender: "user", text: h }]);
  }, m = async (h = null) => {
    const k = h || s;
    if (k.trim()) {
      if (C(k), a(""), _("PROCESSING"), v("Analyse en cours..."), t === "TEST_DEV_ID") {
        setTimeout(() => {
          const w = {
            reply: "Bien reçu ! D'après votre description, il s'agit d'une fuite standard.",
            estimate: "80€ - 120€"
          }, L = {
            sender: "bot",
            text: w.reply,
            estimate: w.estimate,
            showBooking: !0
          };
          r((S) => [...S.filter((I) => !I.loading), L]), _("ESTIMATE");
        }, 1500);
        return;
      }
      try {
        const L = await fetch(`${e || "http://localhost:54321/functions/v1"}/kameo-process`, {
          method: "POST",
          body: JSON.stringify({ message: k, artisan_id: t || "TEST_ID" }),
          headers: { "Content-Type": "application/json" }
        });
        if (!L.ok) throw new Error("Network response was not ok");
        const S = await L.json(), I = {
          sender: "bot",
          text: S.reply
        };
        S.estimate ? (I.estimate = S.estimate, I.showBooking = !0, _("ESTIMATE")) : _("IDLE"), r((H) => [...H.filter((M) => !M.loading), I]);
      } catch (w) {
        console.error(w), r((L) => [...L.filter((S) => !S.loading), { sender: "bot", text: "Désolé, je n'arrive pas à joindre le cerveau." }]), _("IDLE");
      }
    }
  };
  return /* @__PURE__ */ p("div", { style: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    fontFamily: `${d}, sans-serif`
  }, children: [
    n && /* @__PURE__ */ p(
      Ke,
      {
        messages: l,
        inputValue: s,
        onInputChange: (h) => a(h.target.value),
        onSend: m,
        onClose: () => o(!1),
        color: f,
        status: u
      }
    ),
    /* @__PURE__ */ p(
      Ze,
      {
        isOpen: n,
        onClick: () => o(!n),
        color: f,
        businessType: c
      }
    )
  ] });
}
class Ye extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback(e, n, o) {
    n !== o && this.render();
  }
  static get observedAttributes() {
    return ["data-id"];
  }
  render() {
    const e = this.getAttribute("data-id"), n = this.getAttribute("proxy-url") || "https://kameo-api.fly.dev";
    se(/* @__PURE__ */ p(qe, { artisanId: e, proxyUrl: n, host: this }), this.shadowRoot);
  }
  disconnectedCallback() {
    se(null, this.shadowRoot);
  }
}
customElements.get("kameo-widget") || customElements.define("kameo-widget", Ye);
