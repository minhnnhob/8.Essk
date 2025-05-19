var Fu = Object.defineProperty;
var Ru = (V, x, Et) =>
  x in V
    ? Fu(V, x, { enumerable: !0, configurable: !0, writable: !0, value: Et })
    : (V[x] = Et);
var o = (V, x, Et) => (Ru(V, typeof x != "symbol" ? x + "" : x, Et), Et);
(function (V, x) {
  typeof exports == "object" && typeof module < "u"
    ? x(exports)
    : typeof define == "function" && define.amd
    ? define(["exports"], x)
    : ((V = typeof globalThis < "u" ? globalThis : V || self),
      x((V["xo-webcomponents"] = {})));
})(this, function (V) {
  var sa,
    ia,
    oa,
    na,
    ra,
    aa,
    la,
    ca,
    da,
    Fe,
    ii,
    oi,
    ni,
    ri,
    Vo,
    ai,
    Bo,
    li,
    ci,
    di,
    hi,
    ui,
    pi,
    ha,
    ua,
    pa,
    ma,
    fa,
    xa,
    ga,
    ba,
    ya,
    va,
    Ea,
    wa,
    Ca,
    Sa,
    He,
    Pa,
    Aa,
    fi,
    xi,
    Ve,
    gi,
    bi,
    yi,
    vi,
    Ei,
    wi,
    Ci,
    Si,
    Pi;
  ("use strict");
  /*! (c) Andrea Giammarchi @webreflection ISC */ (function () {
    var r = function (P, w) {
      var A = function (z) {
          for (var O = 0, H = z.length; O < H; O++) I(z[O]);
        },
        I = function (z) {
          var O = z.target,
            H = z.attributeName,
            ot = z.oldValue;
          O.attributeChangedCallback(H, ot, O.getAttribute(H));
        };
      return function (N, z) {
        var O = N.constructor.observedAttributes;
        return (
          O &&
            P(z).then(function () {
              new w(A).observe(N, {
                attributes: !0,
                attributeOldValue: !0,
                attributeFilter: O,
              });
              for (var H = 0, ot = O.length; H < ot; H++)
                N.hasAttribute(O[H]) &&
                  I({ target: N, attributeName: O[H], oldValue: null });
            }),
          N
        );
      };
    };
    function i(P, w) {
      if (!!P) {
        if (typeof P == "string") return t(P, w);
        var A = Object.prototype.toString.call(P).slice(8, -1);
        if (
          (A === "Object" && P.constructor && (A = P.constructor.name),
          A === "Map" || A === "Set")
        )
          return Array.from(P);
        if (
          A === "Arguments" ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(A)
        )
          return t(P, w);
      }
    }
    function t(P, w) {
      (w == null || w > P.length) && (w = P.length);
      for (var A = 0, I = new Array(w); A < w; A++) I[A] = P[A];
      return I;
    }
    function e(P, w) {
      var A = (typeof Symbol < "u" && P[Symbol.iterator]) || P["@@iterator"];
      if (!A) {
        if (
          Array.isArray(P) ||
          (A = i(P)) ||
          (w && P && typeof P.length == "number")
        ) {
          A && (P = A);
          var I = 0,
            N = function () {};
          return {
            s: N,
            n: function () {
              return I >= P.length ? { done: !0 } : { done: !1, value: P[I++] };
            },
            e: function (ot) {
              throw ot;
            },
            f: N,
          };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var z = !0,
        O = !1,
        H;
      return {
        s: function () {
          A = A.call(P);
        },
        n: function () {
          var ot = A.next();
          return (z = ot.done), ot;
        },
        e: function (ot) {
          (O = !0), (H = ot);
        },
        f: function () {
          try {
            !z && A.return != null && A.return();
          } finally {
            if (O) throw H;
          }
        },
      };
    }
    /*! (c) Andrea Giammarchi - ISC */ var s = !0,
      n = !1,
      a = "querySelectorAll",
      l = function (w) {
        var A =
            arguments.length > 1 && arguments[1] !== void 0
              ? arguments[1]
              : document,
          I =
            arguments.length > 2 && arguments[2] !== void 0
              ? arguments[2]
              : MutationObserver,
          N =
            arguments.length > 3 && arguments[3] !== void 0
              ? arguments[3]
              : ["*"],
          z = function ot(jt, Qt, ft, F, J, nt) {
            var gt = e(jt),
              me;
            try {
              for (gt.s(); !(me = gt.n()).done; ) {
                var ht = me.value;
                (nt || a in ht) &&
                  (J
                    ? ft.has(ht) || (ft.add(ht), F.delete(ht), w(ht, J))
                    : F.has(ht) || (F.add(ht), ft.delete(ht), w(ht, J)),
                  nt || ot(ht[a](Qt), Qt, ft, F, J, s));
              }
            } catch (an) {
              gt.e(an);
            } finally {
              gt.f();
            }
          },
          O = new I(function (ot) {
            if (N.length) {
              var jt = N.join(","),
                Qt = new Set(),
                ft = new Set(),
                F = e(ot),
                J;
              try {
                for (F.s(); !(J = F.n()).done; ) {
                  var nt = J.value,
                    gt = nt.addedNodes,
                    me = nt.removedNodes;
                  z(me, jt, Qt, ft, n, n), z(gt, jt, Qt, ft, s, n);
                }
              } catch (ht) {
                F.e(ht);
              } finally {
                F.f();
              }
            }
          }),
          H = O.observe;
        return (
          (O.observe = function (ot) {
            return H.call(O, ot, { subtree: s, childList: s });
          })(A),
          O
        );
      },
      d = "querySelectorAll",
      h = self,
      u = h.document,
      p = h.Element,
      m = h.MutationObserver,
      f = h.Set,
      b = h.WeakMap,
      y = function (w) {
        return d in w;
      },
      E = [].filter,
      C = function (P) {
        var w = new b(),
          A = function (F) {
            for (var J = 0, nt = F.length; J < nt; J++) w.delete(F[J]);
          },
          I = function () {
            for (var F = jt.takeRecords(), J = 0, nt = F.length; J < nt; J++)
              O(E.call(F[J].removedNodes, y), !1),
                O(E.call(F[J].addedNodes, y), !0);
          },
          N = function (F) {
            return F.matches || F.webkitMatchesSelector || F.msMatchesSelector;
          },
          z = function (F, J) {
            var nt;
            if (J)
              for (var gt, me = N(F), ht = 0, an = H.length; ht < an; ht++)
                me.call(F, (gt = H[ht])) &&
                  (w.has(F) || w.set(F, new f()),
                  (nt = w.get(F)),
                  nt.has(gt) || (nt.add(gt), P.handle(F, J, gt)));
            else
              w.has(F) &&
                ((nt = w.get(F)),
                w.delete(F),
                nt.forEach(function (Ou) {
                  P.handle(F, J, Ou);
                }));
          },
          O = function (F) {
            for (
              var J =
                  arguments.length > 1 && arguments[1] !== void 0
                    ? arguments[1]
                    : !0,
                nt = 0,
                gt = F.length;
              nt < gt;
              nt++
            )
              z(F[nt], J);
          },
          H = P.query,
          ot = P.root || u,
          jt = l(z, ot, m, H),
          Qt = p.prototype.attachShadow;
        return (
          Qt &&
            (p.prototype.attachShadow = function (ft) {
              var F = Qt.call(this, ft);
              return jt.observe(F), F;
            }),
          H.length && O(ot[d](H)),
          { drop: A, flush: I, observer: jt, parse: O }
        );
      },
      S = self,
      k = S.document,
      $ = S.Map,
      L = S.MutationObserver,
      Q = S.Object,
      st = S.Set,
      lt = S.WeakMap,
      At = S.Element,
      $t = S.HTMLElement,
      Yt = S.Node,
      Be = S.Error,
      Mt = S.TypeError,
      mt = S.Reflect,
      Gt = Q.defineProperty,
      Zo = Q.keys,
      Ko = Q.getOwnPropertyNames,
      ze = Q.setPrototypeOf,
      _e = !self.customElements,
      Ta = function (w) {
        for (
          var A = Zo(w), I = [], N = new st(), z = A.length, O = 0;
          O < z;
          O++
        ) {
          I[O] = w[A[O]];
          try {
            delete w[A[O]];
          } catch {
            N.add(O);
          }
        }
        return function () {
          for (var H = 0; H < z; H++) N.has(H) || (w[A[H]] = I[H]);
        };
      };
    if (_e) {
      var Jo = function () {
          var w = this.constructor;
          if (!tn.has(w)) throw new Mt("Illegal constructor");
          var A = tn.get(w);
          if (Ti) return La(Ti, A);
          var I = ka.call(k, A);
          return La(ze(I, w.prototype), A);
        },
        ka = k.createElement,
        tn = new $(),
        Ai = new $(),
        $a = new $(),
        We = new $(),
        Ma = [],
        Eu = function (w, A, I) {
          var N = $a.get(I);
          if (A && !N.isPrototypeOf(w)) {
            var z = Ta(w);
            Ti = ze(w, N);
            try {
              new N.constructor();
            } finally {
              (Ti = null), z();
            }
          }
          var O = "".concat(A ? "" : "dis", "connectedCallback");
          O in N && w[O]();
        },
        wu = C({ query: Ma, handle: Eu }),
        Cu = wu.parse,
        Ti = null,
        en = function (w) {
          if (!Ai.has(w)) {
            var A,
              I = new Promise(function (N) {
                A = N;
              });
            Ai.set(w, { $: I, _: A });
          }
          return Ai.get(w).$;
        },
        La = r(en, L);
      (self.customElements = {
        define: function (w, A) {
          if (We.has(w))
            throw new Be(
              'the name "'.concat(
                w,
                '" has already been used with this registry'
              )
            );
          tn.set(A, w),
            $a.set(w, A.prototype),
            We.set(w, A),
            Ma.push(w),
            en(w).then(function () {
              Cu(k.querySelectorAll(w));
            }),
            Ai.get(w)._(A);
        },
        get: function (w) {
          return We.get(w);
        },
        whenDefined: en,
      }),
        Gt((Jo.prototype = $t.prototype), "constructor", { value: Jo }),
        (self.HTMLElement = Jo),
        (k.createElement = function (P, w) {
          var A = w && w.is,
            I = A ? We.get(A) : We.get(P);
          return I ? new I() : ka.call(k, P);
        }),
        "isConnected" in Yt.prototype ||
          Gt(Yt.prototype, "isConnected", {
            configurable: !0,
            get: function () {
              return !(
                this.ownerDocument.compareDocumentPosition(this) &
                this.DOCUMENT_POSITION_DISCONNECTED
              );
            },
          });
    } else if (((_e = !self.customElements.get("extends-br")), _e))
      try {
        var Ia = function P() {
          return self.Reflect.construct(HTMLBRElement, [], P);
        };
        Ia.prototype = HTMLLIElement.prototype;
        var Da = "extends-br";
        self.customElements.define("extends-br", Ia, { extends: "br" }),
          (_e = k.createElement("br", { is: Da }).outerHTML.indexOf(Da) < 0);
        var Na = self.customElements,
          Su = Na.get,
          Pu = Na.whenDefined;
        self.customElements.whenDefined = function (P) {
          var w = this;
          return Pu.call(this, P).then(function (A) {
            return A || Su.call(w, P);
          });
        };
      } catch {}
    if (_e) {
      var Oa = function (w) {
          var A = sn.get(w);
          Va(A.querySelectorAll(this), w.isConnected);
        },
        Lt = self.customElements,
        Fa = k.createElement,
        Au = Lt.define,
        Tu = Lt.get,
        ku = Lt.upgrade,
        $u = mt || {
          construct: function (w) {
            return w.call(this);
          },
        },
        Mu = $u.construct,
        sn = new lt(),
        on = new st(),
        ki = new $(),
        $i = new $(),
        Ra = new $(),
        Mi = new $(),
        qa = [],
        Li = [],
        Ha = function (w) {
          return Mi.get(w) || Tu.call(Lt, w);
        },
        Lu = function (w, A, I) {
          var N = Ra.get(I);
          if (A && !N.isPrototypeOf(w)) {
            var z = Ta(w);
            Ii = ze(w, N);
            try {
              new N.constructor();
            } finally {
              (Ii = null), z();
            }
          }
          var O = "".concat(A ? "" : "dis", "connectedCallback");
          O in N && w[O]();
        },
        Iu = C({ query: Li, handle: Lu }),
        Va = Iu.parse,
        Du = C({
          query: qa,
          handle: function (w, A) {
            sn.has(w) &&
              (A ? on.add(w) : on.delete(w), Li.length && Oa.call(Li, w));
          },
        }),
        Nu = Du.parse,
        Ba = At.prototype.attachShadow;
      Ba &&
        (At.prototype.attachShadow = function (P) {
          var w = Ba.call(this, P);
          return sn.set(this, w), w;
        });
      var nn = function (w) {
          if (!$i.has(w)) {
            var A,
              I = new Promise(function (N) {
                A = N;
              });
            $i.set(w, { $: I, _: A });
          }
          return $i.get(w).$;
        },
        rn = r(nn, L),
        Ii = null;
      Ko(self)
        .filter(function (P) {
          return /^HTML.*Element$/.test(P);
        })
        .forEach(function (P) {
          var w = self[P];
          function A() {
            var I = this.constructor;
            if (!ki.has(I)) throw new Mt("Illegal constructor");
            var N = ki.get(I),
              z = N.is,
              O = N.tag;
            if (z) {
              if (Ii) return rn(Ii, z);
              var H = Fa.call(k, O);
              return H.setAttribute("is", z), rn(ze(H, I.prototype), z);
            } else return Mu.call(this, w, [], I);
          }
          Gt((A.prototype = w.prototype), "constructor", { value: A }),
            Gt(self, P, { value: A });
        }),
        (k.createElement = function (P, w) {
          var A = w && w.is;
          if (A) {
            var I = Mi.get(A);
            if (I && ki.get(I).tag === P) return new I();
          }
          var N = Fa.call(k, P);
          return A && N.setAttribute("is", A), N;
        }),
        (Lt.get = Ha),
        (Lt.whenDefined = nn),
        (Lt.upgrade = function (P) {
          var w = P.getAttribute("is");
          if (w) {
            var A = Mi.get(w);
            if (A) {
              rn(ze(P, A.prototype), w);
              return;
            }
          }
          ku.call(Lt, P);
        }),
        (Lt.define = function (P, w, A) {
          if (Ha(P))
            throw new Be(
              "'".concat(P, "' has already been defined as a custom element")
            );
          var I,
            N = A && A.extends;
          ki.set(w, N ? { is: P, tag: N } : { is: "", tag: P }),
            N
              ? ((I = "".concat(N, '[is="').concat(P, '"]')),
                Ra.set(I, w.prototype),
                Mi.set(P, w),
                Li.push(I))
              : (Au.apply(Lt, arguments), qa.push((I = P))),
            nn(P).then(function () {
              N
                ? (Va(k.querySelectorAll(I)), on.forEach(Oa, [I]))
                : Nu(k.querySelectorAll(I));
            }),
            $i.get(P)._(w);
        });
    }
  })();
  const x = {
    get: (r, i) => (r.getAttribute(i) === "false" ? !1 : r.hasAttribute(i)),
    set: (r, i, t) => {
      t ? r.setAttribute(i, "") : r.removeAttribute(i);
    },
  };
  function Et(r, i) {
    var t;
    if ((t = window.xbEditor) != null && t.designMode)
      console.warn(`${r}

${
  i
    ? `Example:
${i}`
    : ""
}`);
    else
      throw new Error(`${r}

${
  i
    ? `Example:
${i}`
    : ""
}`);
  }
  function G(r, i, t) {
    t ||
      Et(
        `${r} must have a \`${i}\` attribute.`,
        `
<${r} ${i}="..."></${r}>
    `
      );
  }
  function Z(r, i, t) {
    return Math.min(Math.max(r, i), t);
  }
  function oe(r) {
    return Object.prototype.toString.call(r).slice(8, -1).toLowerCase();
  }
  function za(r) {
    return r === null || (typeof r != "function" && typeof r != "object");
  }
  oe.primitive = za;
  function fe(r) {
    if (oe(r) === "array") return r.map((i) => fe(i));
    if (oe(r) === "object") {
      const i = {};
      for (const t in r) i[t] = fe(r[t]);
      return i;
    } else return r;
  }
  function v(r, i) {
    for (let t = 0; t < r.length; t++) i(r[t], t, r);
  }
  const bt = (r) => Object.keys(r);
  function _(r, i) {
    v(bt(r), (t) => {
      customElements.get(t) || customElements.define(t, r[t], i);
    });
  }
  function T(r = 0) {
    return new Promise((i) => {
      const t = window.setTimeout(() => {
        i(() => window.clearTimeout(t)), clearTimeout(t);
      }, r);
    });
  }
  function Rt(r, i) {
    const t = [];
    for (let e = 0; e < r.length; e++) i(r[e], e, r) && t.push(r[e]);
    return t;
  }
  class xe {
    constructor() {
      o(this, "id");
      o(this, "events");
      (this.id = 0), (this.events = {});
    }
    on(i, t) {
      return (
        this.id++,
        (this.events = {
          ...this.events,
          [i]: [...(this.events[i] || []), { listener: t, id: this.id }],
        }),
        this.id
      );
    }
    off(i) {
      for (const t in this.events)
        this.events = {
          ...this.events,
          [t]: Rt(this.events[t], (e) => e.id !== i),
        };
    }
    emit(i, t) {
      this.events[i] &&
        v(this.events[i], ({ listener: e }) => {
          e(t);
        });
    }
  }
  function W() {
    const r = new xe();
    let i = -1,
      t = -1,
      e = -1,
      s = 0,
      n = -1,
      a = -1;
    function l({
      to: d,
      from: h,
      duration: u = 1e3,
      friction: p = 1,
      reverseEasing: m = !1,
      easing: f,
      onStart: b,
      onUpdate: y,
      onEnd: E,
    }) {
      let C = null;
      (s = h),
        b == null || b(s),
        (async () => (await T(), r.emit("start", s)))(),
        cancelAnimationFrame(a);
      function S(k) {
        C || (C = k);
        const $ = k - C,
          L = Math.min($ / u, 1);
        (s = h + (d - h) * L * p),
          typeof f == "function" &&
            (m ? (s = h + (d - h) * (1 - f(1 - L))) : (s = h + (d - h) * f(L))),
          r.emit("update", s),
          y == null || y(s),
          L < 1 && (a = requestAnimationFrame(S));
      }
      return (
        (a = requestAnimationFrame(S)),
        (n = window.setTimeout(() => {
          cancelAnimationFrame(a),
            clearTimeout(n),
            (s = d),
            y == null || y(s),
            E == null || E(s),
            r.emit("update", s),
            r.emit("end", s);
        }, u)),
        () => {
          clearTimeout(n), cancelAnimationFrame(a);
        }
      );
    }
    return (
      (l.onStart = (d) => ((i = r.on("start", d)), () => r.off(i))),
      (l.onUpdate = (d) => ((t = r.on("update", d)), () => r.off(t))),
      (l.onEnd = (d) => ((e = r.on("end", d)), () => r.off(e))),
      (l.off = () => {
        r.off(i), r.off(t), r.off(e), cancelAnimationFrame(a), clearTimeout(n);
      }),
      (l.getValue = () => s),
      l
    );
  }
  function Ue(r) {
    let i = 5381,
      t = r.length;
    for (; t; ) i = (i * 33) ^ r.charCodeAt(--t);
    return i >>> 0;
  }
  function ln(r) {
    return r.replace(/\s+/g, " ").trim();
  }
  function Xe(r = "global") {
    return (i, ...t) => {
      let e = ln(
        i.reduce((n, a, l) => (t[l] == null ? n + a : n + a + t[l]), "")
      );
      const s = {};
      return (
        r === "scope" &&
          (e = ln(
            e.replace(
              /(:global\(|)(?:[\.]{1})([a-zA-Z_]+[\w-_\\\[\]\+\=\{\}\?\*\!\(\)]*)(?:[\s\.\,\{\>#\:]{0})/gim,
              (n) => {
                if (n.includes(":global(")) {
                  const d = n.replace(/:global\(\s*\.|\)$/g, "");
                  return (s[d] = d), `.${d}`;
                }
                const a = n.trim().replace(/^\./g, ""),
                  l = `xo-${a}-${Ue(e)}`;
                return (s[a] = l), `.${l}`;
              }
            )
          )),
        { classes: s, cssText: e }
      );
    };
  }
  function cn(r, i) {
    var e;
    const t = i.querySelector(".xo-styles");
    if (t)
      t.textContent &&
        !((e = t.textContent) != null && e.includes(r)) &&
        (t.textContent += r);
    else {
      const s = document.createElement("style");
      s.classList.add("xo-styles"), (s.textContent = r), i.appendChild(s);
    }
  }
  function rt(r, i = 300) {
    let t = -1;
    return function (...s) {
      const n = this;
      clearTimeout(t),
        (t = window.setTimeout(() => {
          r.apply(n, s);
        }, i));
    };
  }
  function ne(r) {
    /comp|inter/.test(document.readyState)
      ? r()
      : "addEventListener" in document
      ? document.addEventListener("DOMContentLoaded", r)
      : document.attachEvent("onreadystatechange", () => {
          document.readyState === "complete" && r();
        });
  }
  const R = {
    linear: (r) => r,
    ease: (r) => 0.5 * (1 - Math.cos(Math.PI * r)),
    easeInQuad: (r) => r * r,
    easeOutQuad: (r) => r * (2 - r),
    easeInOutQuad: (r) => (r < 0.5 ? 2 * r * r : -1 + (4 - 2 * r) * r),
    easeInCubic: (r) => r * r * r,
    easeOutCubic: (r) => --r * r * r + 1,
    easeInOutCubic: (r) =>
      r < 0.5 ? 4 * r * r * r : (r - 1) * (2 * r - 2) * (2 * r - 2) + 1,
    easeInQuart: (r) => r * r * r * r,
    easeOutQuart: (r) => 1 - --r * r * r * r,
    easeInOutQuart: (r) =>
      r < 0.5 ? 8 * r * r * r * r : 1 - 8 * --r * r * r * r,
    easeInQuint: (r) => r * r * r * r * r,
    easeOutQuint: (r) => 1 + --r * r * r * r * r,
    easeInOutQuint: (r) =>
      r < 0.5 ? 16 * r * r * r * r * r : 1 + 16 * --r * r * r * r * r,
    easeOutBounce: (r) =>
      r < 1 / 2.75
        ? 7.5625 * r * r
        : r < 2 / 2.75
        ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75
        : r < 2.5 / 2.75
        ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375
        : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375,
    easeInBounce: (r) => 1 - R.easeOutBounce(1 - r),
    easeOutBack: (r) => 1 + 2.70158 * (r - 1) ** 3 + 1.70158 * (r - 1) ** 2,
    easeInBack: (r) => 2.70158 * r * r * r - 1.70158 * r * r,
    easeInOut: (r) =>
      r < 0.5 ? R.easeInBack(r * 2) / 2 : R.easeOutBack(r * 2 - 1) / 2 + 0.5,
    easeInElastic: (r) => {
      const i = (2 * Math.PI) / 3;
      return r === 0
        ? 0
        : r === 1
        ? 1
        : -(2 ** (10 * r - 10)) * Math.sin((r * 10 - 10.75) * i);
    },
    easeOutElastic: (r) => {
      const i = (2 * Math.PI) / 3;
      return r === 0
        ? 0
        : r === 1
        ? 1
        : 2 ** (-10 * r) * Math.sin((r * 10 - 0.75) * i) + 1;
    },
    easeInExpo: (r) => (r === 0 ? 0 : 2 ** (10 * r - 10)),
    easeOutExpo: (r) => (r === 1 ? 1 : 1 - 2 ** (-10 * r)),
    spring: (r) => 1 - Math.cos(r * 4.5 * Math.PI) * Math.exp(-r * 6),
    decay: (r) => 1 - Math.exp(-r * 6),
  };
  function It(r, i) {
    if (oe.primitive(r) || oe.primitive(r) || r == null || i == null)
      return r === i;
    const t = Object.keys(r),
      e = Object.keys(i);
    if (t.length !== e.length) return !1;
    for (const s of t) {
      const n = r[s],
        a = i[s];
      if (typeof n == "object" && typeof a == "object") {
        if (!It(n, a)) return !1;
      } else if (n !== a) return !1;
    }
    return !0;
  }
  function Di(r, i) {
    for (let t = 0; t < r.length; t++) if (i(r[t], t, r)) return t;
    return -1;
  }
  function ct(r, i) {
    const t = [];
    for (let e = 0; e < r.length; e++) t.push(i(r[e], e, r));
    return t;
  }
  function wt(r, i, t) {
    let e = t;
    for (let s = 0; s < r.length; s++) e = i(e, r[s], s, r);
    return e;
  }
  class _a {
    constructor() {
      o(this, "frameId");
      o(this, "keepAliveFrameId");
      o(this, "lastTimestamp");
      o(this, "frames");
      o(this, "keepAliveFrames");
      o(this, "defaultTimestep");
      o(this, "handleFrameLoop", (i) => {
        if (this.lastTimestamp) {
          const t = i - this.lastTimestamp;
          v(this.keepAliveFrames, (e) =>
            e.call(this, { delta: t, timestamp: i })
          );
        }
        (this.lastTimestamp = i),
          this.keepAliveFrameId && cancelAnimationFrame(this.keepAliveFrameId),
          (this.keepAliveFrameId = requestAnimationFrame(this.handleFrameLoop));
      });
      o(this, "handleFrame", (i) => {
        v(this.frames, (t) =>
          t.call(this, { delta: this.defaultTimestep, timestamp: i })
        );
      });
      o(this, "getFrames", () => this.frames);
      o(
        this,
        "add",
        (i, t = !1) => (
          this.cancelFrame(),
          this.frames.includes(i) || this.frames.push(i),
          t &&
            !this.keepAliveFrames.includes(i) &&
            this.keepAliveFrames.push(i),
          this.start(),
          this
        )
      );
      o(this, "start", () => {
        (this.frameId = requestAnimationFrame(this.handleFrame)),
          (this.keepAliveFrameId = requestAnimationFrame(this.handleFrameLoop));
      });
      o(this, "cancelFrame", () => {
        this.frameId != null &&
          (cancelAnimationFrame(this.frameId), (this.frameId = null)),
          this.keepAliveFrameId != null &&
            (cancelAnimationFrame(this.keepAliveFrameId),
            (this.keepAliveFrameId = null));
      });
      o(this, "stopFrame", (i, t) => {
        const e = i.indexOf(t);
        e !== -1 && i.splice(e, 1),
          i.length === 0 && (this.cancelFrame(), (this.lastTimestamp = null));
      });
      o(
        this,
        "remove",
        (i) => (
          this.stopFrame(this.frames, i),
          this.stopFrame(this.keepAliveFrames, i),
          this
        )
      );
      o(
        this,
        "clear",
        () => (
          (this.frames = []),
          (this.keepAliveFrames = []),
          this.cancelFrame(),
          (this.lastTimestamp = null),
          this
        )
      );
      (this.frameId = null),
        (this.keepAliveFrameId = null),
        (this.lastTimestamp = null),
        (this.frames = []),
        (this.keepAliveFrames = []),
        (this.defaultTimestep = (1 / 60) * 1e3);
    }
  }
  const K = new _a();
  function Wa(r) {
    return r.replace(/([_]\w)/g, (i) => i[1].toUpperCase());
  }
  function Ua(r) {
    return r
      .replace(/(\-\w|\_\w)/g, (i) => i[1].toUpperCase())
      .replace(/^(\w)/, (i) => i[0].toUpperCase());
  }
  function dn(r) {
    return r.replace(/[A-Z]/g, (i) => `_${i.toLowerCase()}`);
  }
  function Xa(r) {
    return r.replace(/^(\w)/, (i) => i[0].toUpperCase());
  }
  function Ya(r) {
    return dn(r).replace(/^_/g, "");
  }
  function Ga(r) {
    return r.replace(/^(\w)/, (i) => i[0].toLowerCase());
  }
  function ja(r) {
    return r.replace(/([-]\w)/g, (i) => i[1].toUpperCase());
  }
  function Qa(r) {
    return r
      .replace(/([-]\w)/g, (i) => i[1].toUpperCase())
      .replace(/^(\w)/, (i) => i[0].toUpperCase());
  }
  function hn(r) {
    return r.replace(/[A-Z]/g, (i) => `-${i.toLowerCase()}`);
  }
  function Za(r) {
    return hn(r).replace(/^-/g, "");
  }
  const Zt = {
    snakeToCamel: Wa,
    snakeToPascal: Ua,
    camelToSnake: dn,
    camelToPascal: Xa,
    pascalToSnake: Ya,
    pascalToCamel: Ga,
    kebabToCamel: ja,
    kebabToPascal: Qa,
    camelToKebab: hn,
    pascalToKebab: Za,
  };
  function dt(r) {
    const i = r.trim();
    if (/^{|\[/g.test(i))
      try {
        const e = new Function(`return ${i}`)();
        return JSON.parse(JSON.stringify(e));
      } catch {
        return /^\[/g.test(i) ? [] : {};
      }
    else return {};
  }
  function Ka(r, i) {
    switch (i) {
      case "string":
        return r;
      case "number":
        return Number(r);
      case "string | number": {
        const t = Number(r);
        return isNaN(t) ? r : t;
      }
      case "boolean":
        return r === "true" || r === "";
      case "object":
        return dt(r);
      case "array":
        return dt(r);
      default:
        return r;
    }
  }
  function M(
    r,
    { pick: i, types: t, camelCase: e = !0, propTransformer: s } = {}
  ) {
    let n = {};
    if (r == null) return n;
    const a = Array.from(r.attributes);
    i == null && (i = ct(a, (l) => l.name));
    for (const l of a) {
      let d = e ? Zt.kebabToCamel(l.name) : l.name;
      const h = t == null ? void 0 : t[d];
      l.value != null &&
        (i == null ? void 0 : i.includes(d)) &&
        (typeof s == "function" && (d = s(d)),
        !!t && h != null
          ? (n = { ...n, [d]: Ka(l.value, h) })
          : (n = { ...n, [d]: l.value }));
    }
    return n;
  }
  function Ni(r, { width: i, height: t } = {}) {
    const e = r.replace(/(\?|&)width=\d*/g, ""),
      s = e.includes("?") ? "&" : "?",
      n = i ? `${s}width=${i}` : "",
      a = t ? `${s}height=${t}` : "";
    return `${e}${n}${a}`;
  }
  function D({
    inputRange: r,
    outputRange: i,
    value: t,
    easing: e = (a) => a,
    reverseEasing: s = !1,
    extrapolate: n = "extend",
  }) {
    const a = ct(r, (m, f) => ({ input: r[f], output: i[f] })).sort(
        (m, f) => m.input - f.input
      ),
      l = ct(a, ({ input: m }) => m),
      d = ct(a, ({ output: m }) => m);
    if (t <= l[0]) return d[0];
    if (t >= l[l.length - 1]) return d[d.length - 1];
    let h = 0;
    for (const m of l) m < t && h++;
    const u = h - 1;
    let p = (t - l[u]) / (l[h] - l[u]);
    return (
      typeof e == "function" && (s ? (p = 1 - e(1 - p)) : (p = e(p))),
      n === "clamp" && (p = Math.max(Math.min(p, 1), 0)),
      d[u] * (1 - p) + d[h] * p
    );
  }
  const j = {
    android: !!navigator.userAgent.match(/Android/i),
    blackBerry: !!navigator.userAgent.match(/BlackBerry/i),
    ipad: !!navigator.userAgent.match(/iPad/i),
    iOS: !!navigator.userAgent.match(/iPhone|iPad|iPod/i),
    opera: !!navigator.userAgent.match(/Opera Mini/i),
    windows: !!navigator.userAgent.match(/Windows Phone/i),
    amazonePhone: !!navigator.userAgent.match(
      /(?:SD4930UR|\\bSilk(?:.+)Mobile\\b)/i
    ),
    amazoneTablet: !!navigator.userAgent.match(/Silk/i),
    any: !!navigator.userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|Windows Phone|(?:SD4930UR|\bSilk(?:.+)Mobile\b)|Silk/i
    ),
  };
  ne(() => {
    const r = document.documentElement;
    j.any ? r.classList.add("is-mobile") : r.classList.add("is-desktop");
  });
  const re = (r) => Object.values(r);
  function Ja(r) {
    return r.nodeType === 9 && r.defaultView;
  }
  function Y(r) {
    const i = r == null ? void 0 : r.ownerDocument,
      t = i.documentElement,
      e = Ja(i);
    let s = { top: 0, left: 0 };
    return i
      ? (typeof r.getBoundingClientRect < "u" &&
          (s = r.getBoundingClientRect()),
        {
          top: s.top + e.scrollY - t.clientTop,
          left: s.left + e.scrollX - t.clientLeft,
        })
      : { top: 0, left: 0 };
  }
  class tl {
    constructor(i) {
      o(this, "dx");
      o(this, "dy");
      o(this, "vx", 0);
      o(this, "vy", 0);
      o(this, "isStart", !1);
      o(this, "startX", 0);
      o(this, "startX2", 0);
      o(this, "startY", 0);
      o(this, "startY2", 0);
      o(this, "options");
      o(this, "handleMouseDown", (i) => {
        const { onStart: t } = this.options;
        if (
          (i.type === "touchstart" && i.touches.length > 1) ||
          (i.type === "mousedown" && i.button !== 0)
        )
          return;
        const e = i.target;
        !j.any && (e.closest("a") || e.closest("img")) && i.preventDefault(),
          (this.isStart = !0),
          i.type === "touchstart"
            ? ((this.startX = i.touches[0].clientX),
              (this.startY = i.touches[0].clientY),
              (this.startX2 = i.touches[0].clientX),
              (this.startY2 = i.touches[0].clientY))
            : ((this.startX = i.clientX),
              (this.startY = i.clientY),
              (this.startX2 = i.clientX),
              (this.startY2 = i.clientY)),
          t == null || t(i),
          document.addEventListener("mousemove", this.handleMouseMove),
          document.addEventListener("touchmove", this.handleMouseMove, {
            passive: !1,
          }),
          document.addEventListener("mouseup", this.handleMouseUp),
          document.addEventListener("touchend", this.handleMouseUp);
      });
      o(this, "handleMouseMove", (i) => {
        const { onMove: t } = this.options;
        if (
          (i.type === "touchmove" && i.touches.length > 1) ||
          (i.type === "mousemove" && i.button !== 0) ||
          (j.any || i.preventDefault(), !this.isStart)
        )
          return;
        let e, s;
        i.type === "touchmove"
          ? ((e = i.touches[0].clientX), (s = i.touches[0].clientY))
          : ((e = i.clientX), (s = i.clientY));
        const n = e - this.startX,
          a = s - this.startY;
        (this.startX = e),
          (this.startY = s),
          (this.dx += n),
          (this.dy += a),
          (this.vx = n),
          (this.vy = a),
          t == null ||
            t(
              {
                dx: this.dx,
                dy: this.dy,
                vx: this.vx,
                vy: this.vy,
                isHorizontalSwipe:
                  Math.abs(e - this.startX2) > Math.abs(s - this.startY2),
              },
              i
            );
      });
      o(this, "handleEnd", (i, t) => {
        const { onEnd: e } = this.options;
        !this.isStart ||
          ((this.isStart = !1),
          t &&
            ((this.dx = t.dx),
            (this.dy = t.dy),
            (this.vx = t.vx),
            (this.vy = t.vy)),
          e == null ||
            e({ dx: this.dx, dy: this.dy, vx: this.vx, vy: this.vy }, i),
          document.removeEventListener("mousemove", this.handleMouseMove),
          document.removeEventListener("touchmove", this.handleMouseMove),
          document.removeEventListener("mouseup", this.handleMouseUp),
          document.removeEventListener("touchend", this.handleMouseUp));
      });
      o(this, "handleMouseUp", (i) => {
        j.any || i.preventDefault(), this.handleEnd(i);
      });
      o(this, "setValue", ({ dx: i, dy: t }) => {
        i != null && (this.dx = i), t != null && (this.dy = t);
      });
      o(this, "destroy", () => {
        this.options.element.removeEventListener(
          "mousedown",
          this.handleMouseDown
        ),
          this.options.element.removeEventListener(
            "touchstart",
            this.handleMouseDown
          ),
          document.removeEventListener("mousemove", this.handleMouseMove),
          document.removeEventListener("touchmove", this.handleMouseMove),
          document.removeEventListener("mouseup", this.handleMouseUp),
          document.removeEventListener("touchend", this.handleMouseUp);
      });
      (this.options = i),
        (this.dx = i.dx || 0),
        (this.dy = i.dy || 0),
        i.element.addEventListener("mousedown", this.handleMouseDown),
        j.any && i.element.addEventListener("touchstart", this.handleMouseDown);
    }
  }
  function Kt(r) {
    return new tl(r);
  }
  class el {
    constructor(i, t) {
      o(this, "target");
      o(this, "options");
      o(this, "top");
      o(this, "left");
      o(this, "handlePlacement", () => {
        const { element: i, placement: t, offset: e } = this.options,
          { offsetWidth: s, offsetHeight: n } = this.target,
          { top: a, left: l } = Y(this.target),
          { offsetWidth: d, offsetHeight: h } = i;
        switch (t) {
          case "top-left":
            (this.top = a - h - e), (this.left = l);
            break;
          case "top-center":
            (this.top = a - h - e), (this.left = l + s / 2 - d / 2);
            break;
          case "top-right":
            (this.top = a - h - e), (this.left = l + s - d);
            break;
          case "bottom-left":
            (this.top = a + n + e), (this.left = l);
            break;
          case "bottom-center":
            (this.top = a + n + e), (this.left = l + s / 2 - d / 2);
            break;
          case "bottom-right":
            (this.top = a + n + e), (this.left = l + s - d);
            break;
          case "left-top":
            (this.top = a), (this.left = l - d - e);
            break;
          case "left-center":
            (this.top = a + n / 2 - h / 2), (this.left = l - d - e);
            break;
          case "left-bottom":
            (this.top = a + n - h), (this.left = l - d - e);
            break;
          case "right-top":
            (this.top = a), (this.left = l + s + e);
            break;
          case "right-center":
            (this.top = a + n / 2 - h / 2), (this.left = l + s + e);
            break;
          case "right-bottom":
            (this.top = a + n - h), (this.left = l + s + e);
            break;
        }
      });
      o(this, "checkBoundary", () => {
        const { element: i } = this.options,
          { offsetWidth: t, offsetHeight: e } = i,
          { clientWidth: s, clientHeight: n } = document.documentElement;
        this.top < window.scrollY
          ? (this.top = window.scrollY)
          : this.top + e > n + window.scrollY &&
            (this.top = n + window.scrollY - e),
          this.left < 0
            ? (this.left = window.scrollX)
            : this.left + t > s + window.scrollX &&
              (this.left = s + window.scrollX - t);
      });
      o(this, "init", () => {
        const { element: i } = this.options,
          { width: t, height: e } = i.getBoundingClientRect();
        return (
          this.handlePlacement(),
          this.checkBoundary(),
          { top: this.top, left: this.left, width: t, height: e }
        );
      });
      (this.target = i), (this.options = t), (this.top = 0), (this.left = 0);
    }
  }
  function un(
    r,
    { element: i, placement: t = "bottom-center", offset: e = 0 }
  ) {
    return new el(r, { element: i, placement: t, offset: e }).init();
  }
  function sl(r, i = !1) {
    const t = i ? {} : [],
      e = new URLSearchParams(r);
    for (const s of e.entries())
      if (i) {
        const [n, a] = s;
        t[n] = a;
      } else t.push([s[0], s[1]]);
    return t;
  }
  function il(r) {
    return new URLSearchParams(r)
      .toString()
      .replace(
        /&/g,
        `&
`
      )
      .replace(/\w.*=&?$/gm, "")
      .replace(/\n+/g, "")
      .replace(/&$/g, "");
  }
  const yt = { parse: sl, stringify: il };
  function pn(r, i, t = 0.55) {
    return (r * i * t) / (i + t * r);
  }
  function mn(r, i, t, e) {
    return t < r
      ? -pn(r - t, i - r, e) + r
      : t > i
      ? pn(t - i, i - r, e) + i
      : t;
  }
  function ol() {
    let r = !1;
    const i = () => {
      if (!r) {
        r = !0;
        const s = "@xoLocalStorageCheck";
        try {
          return (
            window.localStorage.setItem(s, s),
            window.localStorage.removeItem(s),
            !0
          );
        } catch {
          return !1;
        }
      }
      return !0;
    };
    return (() =>
      i()
        ? window.localStorage
        : {
            getItem() {
              return null;
            },
            setItem() {},
            removeItem() {},
            clear() {},
            key() {
              return null;
            },
            length: 0,
          })();
  }
  const ae = ol();
  class Ye {
    constructor(i = {}) {
      o(this, "_store");
      o(this, "_prevStore");
      o(this, "_options");
      o(this, "_listeners");
      o(this, "_storageRegisters");
      o(this, "_useDeepEquals");
      o(this, "_handleListeners", (i) => {
        if (this._listeners[i]) {
          const t = this.get(i);
          for (let e = 0; e < this._listeners[i].length; e++) {
            const { equal: s, listener: n } = this._listeners[i][e];
            if (!s) n(t);
            else {
              const a = fe(this._prevStore[i]);
              s(a, t) || n(t);
            }
          }
        }
      });
      o(this, "_getState", (i, t) => {
        const { storagePrefix: e } = this._options,
          s = ae.getItem(`${e}${i}`);
        return s != null && s !== void 0 && this._storageRegisters[i]
          ? JSON.parse(s)
          : t;
      });
      o(this, "_setStorage", (i, t) => {
        if (!!i && t !== void 0 && this._storageRegisters[i]) {
          const { storagePrefix: e } = this._options,
            s = JSON.stringify(t);
          ae.setItem(`${e}${i}`, s);
        }
      });
      o(this, "_set", (i, t) => {
        const { logger: e, loggerCollapsed: s } = this._options;
        return (this._useDeepEquals[i]
          ? !It(this._store[i], t)
          : this._store[i] !== t) &&
          ((this._prevStore[i] = fe(this._store[i])),
          (this._store[i] = t),
          this._setStorage(i, t),
          this._handleListeners(i),
          e)
          ? (a) => {
              Ye.logger(a, t, i, s, this._prevStore, this._store);
            }
          : () => {};
      });
      o(
        this,
        "create",
        (i, { initialState: t, useStorage: e, useDeepEqual: s }) => {
          const {
            logger: n,
            loggerCollapsed: a,
            storagePrefix: l,
          } = this._options;
          this._store[i] ||
            ((this._storageRegisters[i] = e),
            this._getState(i, t) || this._setStorage(i, t),
            (this._store[i] = this._getState(i, t)),
            e || ae.removeItem(`${l}${i}`),
            this._handleListeners(i),
            n && Ye.logger("@store/initialState", t, i, a)),
            this._useDeepEquals[i] || (this._useDeepEquals[i] = !!s);
        }
      );
      (this._store = {}),
        (this._prevStore = {}),
        (this._listeners = {}),
        (this._storageRegisters = {}),
        (this._options = {
          logger: i.logger || !1,
          loggerCollapsed: i.loggerCollapsed || !1,
          storagePrefix: i.storagePrefix ? `${i.storagePrefix}/` : "",
        }),
        (this._useDeepEquals = {});
    }
    static logger(i, t, e, s = !1, n, a) {
      const d = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        h = e,
        u =
          h.length < 9
            ? Array(9 - h.length)
                .fill(" ")
                .join("")
            : "";
      console[s ? "groupCollapsed" : "group"](
        `%c XOStore: ${i}`,
        "color: #614eff",
        `@${d}`
      ),
        n && console.log("%c Prev Store ", "color: #999; font-weight: 600", n),
        console.log(`%c ${h}  ${u}`, "color: #44b0e2; font-weight: 600", t),
        a &&
          console.log("%c Next Store ", "color: #7ac143; font-weight: 600", a),
        console.groupEnd();
    }
    get(i) {
      return i ? this._store[i] : this._store;
    }
    set(i, t) {
      if (typeof t == "function") {
        const e = t,
          s = this._store[i];
        return this._set(i, e(s));
      }
      return this._set(i, t);
    }
    subscribe(i, t, e) {
      if (
        ((this._listeners[i] = this._listeners[i] || []),
        this._listeners[i].push({ listener: t, equal: e }),
        Object.keys(this._store).includes(i))
      ) {
        const s = this.get(i),
          n = fe(this._prevStore[i]);
        (e && e(n, s)) || t(s);
      }
      return () => {
        this._listeners[i] = Rt(
          this._listeners[i],
          ({ listener: s }) => s !== t
        );
      };
    }
  }
  let fn = null;
  function xn() {
    if (!document.body || document.body.scrollHeight <= window.innerHeight)
      return 0;
    const r = document.createElement("div"),
      i = 100;
    return (
      (r.style.display = "block"),
      (r.style.width = `${i}px`),
      (r.style.height = `${i}px`),
      (r.style.overflow = "scroll"),
      (r.style.position = "fixed"),
      (r.style.top = "-9999px"),
      document.body.appendChild(r),
      (fn = i - r.clientWidth),
      document.body.removeChild(r),
      fn
    );
  }
  function qt(r) {
    if (r == null) return;
    const i = bt(r || {}),
      t = wt(
        i,
        (e, s, n) => {
          var d, h;
          const a = parseInt(s.toString()) || 0,
            l = parseInt(
              ((h = (d = i[n - 1]) == null ? void 0 : d.toString) == null
                ? void 0
                : h.call(d)) || "0"
            );
          return window.innerWidth > l && window.innerWidth <= a
            ? { ...e, ...r[s] }
            : e;
        },
        {}
      );
    if (!!bt(t).length) return t;
  }
  function ge(r, i) {
    let t = window.innerWidth,
      e = window.innerHeight;
    return function (...n) {
      var l;
      const a = this;
      (l = window.xbEditor) != null && l.designMode
        ? i.apply(a, n)
        : (r === "x"
            ? t !== window.innerWidth && i.apply(a, n)
            : r === "y" && e !== window.innerHeight && i.apply(a, n),
          (t = window.innerWidth),
          (e = window.innerHeight));
    };
  }
  const nl = ({
      file: r,
      content: i,
      insertPosition: t = "beforeend",
      id: e,
      parentElement: s = document.head,
    }) => {
      if (e) {
        const n = document.getElementById(e);
        n == null || n.remove();
      }
      if (r) {
        const n = document.createElement("link");
        return (
          e && (n.id = e),
          (n.rel = "stylesheet"),
          (n.href = r),
          s.insertAdjacentElement(t, n),
          n
        );
      }
      if (i) {
        const n = document.createElement("style");
        return (
          e && (n.id = e), (n.textContent = i), s.insertAdjacentElement(t, n), n
        );
      }
    },
    Oi = async ({
      file: r,
      content: i,
      insertPosition: t = "beforeend",
      id: e,
      parentElement: s = document.head,
      type: n,
    }) => {
      if (e) {
        const l = document.getElementById(e);
        l == null || l.remove();
      }
      const a = document.createElement("script");
      return (
        e && (a.id = e),
        r && ((a.src = r), n && (a.type = n)),
        i && (a.textContent = i),
        !!r || !!i
          ? (s.insertAdjacentElement(t, a),
            new Promise((l) => {
              a.onload = () => {
                l(a);
              };
            }))
          : new Promise((l) => {
              l(a);
            })
      );
    };
  function rl(r, i, t = 1) {
    const e = Math.ceil((i - r) / t);
    return Array.from({ length: e }, (s, n) => r + n * t);
  }
  class Fi {
    static toArray(i) {
      const t = [],
        e = i.match(/[a-df-z][^a-df-z]*/gi);
      if (!e) return t;
      for (let s = 0; s < e.length; s++) {
        const n = e[s],
          a = n.charAt(0),
          l = n
            .substring(1)
            .split(/[\s,]+|(?=\s?[+\-])/)
            .map((d) => +d);
        t.push({ type: a, values: l });
      }
      return t;
    }
    static toString(i) {
      let t = "";
      for (let e = 0; e < i.length; e++) {
        const s = i[e],
          n = s.type,
          a = s.values;
        t += n;
        for (let l = 0; l < a.length; l++) {
          const d = a[l];
          t += d + (l < a.length - 1 ? " " : "");
        }
      }
      return t;
    }
  }
  function Ge(r, i, t) {
    let e = t - i + 1;
    return (((r - i) % e) + e) % e;
  }
  class q extends HTMLElement {
    constructor() {
      super();
      o(this, "$attributeObserver$", null);
      o(this, "props", {});
      o(this, "state", {});
      o(this, "_setProps", () => {
        const t = this.__proto__.constructor.propTypes,
          e = this.__proto__.constructor.defaultProps,
          s = M(this, { pick: Object.keys(t), types: t });
        this.props = { ...e, ...s };
      });
      o(this, "handlePropUpdate", () => {
        const t = this.__proto__.constructor.observedProps;
        !t ||
          !t.length ||
          ((this.$attributeObserver$ = new MutationObserver((e) => {
            e.forEach((s) => {
              const n = s.attributeName;
              if (n && s.type === "attributes") {
                const a = Zt.kebabToCamel(n),
                  l = s.oldValue,
                  d = this.getAttribute(n);
                t.includes(a) &&
                  l !== d &&
                  (this._setProps(),
                  this.propUpdate({ name: a, prevProp: l, nextProp: d }));
              }
            });
          })),
          this.$attributeObserver$.observe(this, {
            attributes: !0,
            attributeOldValue: !0,
            attributeFilter: t.map((e) => Zt.camelToKebab(e)),
          }));
      });
    }
    setState(t) {
      const e = this.state;
      typeof t == "object" && !Array.isArray(t) && t !== null
        ? (this.state = { ...this.state, ...t })
        : typeof t == "function" && (this.state = { ...this.state, ...t(e) }),
        this.stateUpdate(e);
    }
    setProps(t) {
      const e = this.props;
      typeof t == "object" && !Array.isArray(t) && t !== null
        ? (this.props = { ...this.props, ...t })
        : typeof t == "function" && (this.props = { ...this.props, ...t(e) }),
        Object.entries(this.props).forEach(([n, a]) => {
          const l = n.includes("-") ? n : Zt.camelToKebab(n);
          typeof a == "boolean"
            ? x.set(this, l, a)
            : a == null
            ? this.removeAttribute(l)
            : this.setAttribute(
                l,
                typeof a == "string" ? a : JSON.stringify(a)
              );
        });
    }
    connectedCallback() {
      this._setProps(),
        this.setProps({}),
        this.mount(),
        this.handlePropUpdate();
    }
    disconnectedCallback() {
      var t;
      (t = this.$attributeObserver$) == null || t.disconnect(), this.unmount();
    }
    emit(t, e) {
      const s = new CustomEvent(t, e);
      return this.dispatchEvent(s), s;
    }
    stateUpdate(t) {}
    propUpdate({ name: t, prevProp: e, nextProp: s }) {}
    mount() {}
    unmount() {}
  }
  o(q, "defaultProps", {}), o(q, "propTypes", {}), o(q, "observedProps", []);
  function U(r, i) {
    return (t) => {
      window.customElements.get(r) || window.customElements.define(r, t, i);
    };
  }
  function gn(r) {
    return new Promise((i) => {
      r.length === 0 && i();
      let t = 0;
      r.forEach((e) => {
        const s = new Image(),
          n = () => {
            (t += 1), t === r.length && i();
          };
        (s.onload = n),
          (s.onerror = (a) => {
            console.error(a), n();
          }),
          (s.src = e);
      });
    });
  }
  function al(r, i) {
    var e;
    const t = r.closest("section[xo-preset]");
    if (t && ((e = window.xbEditor) == null ? void 0 : e.designMode)) {
      const s = new MutationObserver(() => {
        i();
      });
      return (
        s.observe(t, { attributes: !0, attributeFilter: ["xo-preset"] }),
        s.disconnect
      );
    }
    return () => {};
  }
  function je() {
    return typeof HTMLDialogElement == "function";
  }
  function Qe(r) {
    var i;
    !je() ||
      (r.hasAttribute("popover") &&
        ((i = r == null ? void 0 : r.showPopover) == null || i.call(r)));
  }
  function be(r) {
    var i;
    !je() ||
      (r.hasAttribute("popover") &&
        ((i = r == null ? void 0 : r.hidePopover) == null || i.call(r)));
  }
  function Ze(r) {
    return r.search(/^https?:\/\/(www|)\.youtube\.com/g) !== -1;
  }
  function Ke(r) {
    return r.search(/^https?:\/\/(player\.|)vimeo\.com/g) !== -1;
  }
  function bn(r, i) {
    var e, s;
    const t = typeof i == "string" ? document.querySelector(i) : i;
    t &&
      (t.tagName === "VIDEO"
        ? t[r]()
        : t.tagName === "IFRAME" && Ze(t.src)
        ? (e = t.contentWindow) == null ||
          e.postMessage(
            `{"event":"command","func":"${r}Video","args":[],"id":1,"channel":"widget"}`,
            "*"
          )
        : t.tagName === "IFRAME" &&
          Ke(t.src) &&
          ((s = t.contentWindow) == null ||
            s.postMessage({ method: r, value: {} }, "*")));
  }
  function ll(r) {
    bn("play", r);
  }
  function yn(r) {
    bn("pause", r);
  }
  function ut(r) {
    return r.closest(".shopify-section").id.replace(/^shopify-section-/g, "");
  }
  function Ri(r) {
    var t, e;
    const i =
      (e = (t = window.Shopify) == null ? void 0 : t.routes) == null
        ? void 0
        : e.root;
    return i &&
      r &&
      !r.includes(":") &&
      !r.startsWith(i.replace(/\/$/g, "")) &&
      r.startsWith("/") &&
      !r.startsWith("//")
      ? `${i}${r.replace(/^\//g, "")}`
      : r;
  }
  function Je(r, i) {
    typeof r == "string" && (r = r.replace(".", ""));
    let t = "";
    const e = /\{\{\s*(\w+)\s*\}\}/,
      s = i || "{{amount}}";
    function n(l, d, h = ",", u = ".") {
      if (isNaN(l) || l == null) return "0";
      l = Number((l / 100).toFixed(d));
      const p = l.toString().split("."),
        m = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, h),
        f = p[1] ? u + p[1] : "";
      return m + f;
    }
    const a = s.match(e);
    if (!a) return s;
    switch (a[1]) {
      case "amount":
        t = n(Number(r), 2);
        break;
      case "amount_no_decimals":
        t = n(Number(r), 0);
        break;
      case "amount_with_comma_separator":
        t = n(Number(r), 2, ".", ",");
        break;
      case "amount_no_decimals_with_comma_separator":
        t = n(Number(r), 0, ".", ",");
        break;
      default:
        return s;
    }
    return s.replace(e, t);
  }
  const vn = "width",
    cl =
      (sa = window == null ? void 0 : window.xoImgDevicePixelRatio) != null
        ? sa
        : 1.5,
    dl =
      (ia = window == null ? void 0 : window.xoImgDevicePixelRatio) != null
        ? ia
        : 1.5,
    hl = 2e3;
  function En(r, i, t, e) {
    const s = r;
    if (!s) return "";
    if (s.includes("data:")) return s;
    const n = s
        .replace(/(\?|&)(w|width)=\d*/g, "")
        .replace(new RegExp(`(\\?|&)${vn}=\\d*`, "g"), ""),
      a = Z(window.devicePixelRatio, cl, dl),
      l = Z(Math.min(Math.round(i * a), hl), t, e);
    if (l === 0) return s;
    const d = `${vn}=${l}`;
    return n.includes("?") ? `${n}&${d}` : `${n}?${d}`;
  }
  function ul(r) {
    const i =
        Number(r.getAttribute("xo-intrinsic-width")) ||
        Number(r.getAttribute("data-intrinsic-width")) ||
        0,
      t =
        Number(r.getAttribute("xo-intrinsic-height")) ||
        Number(r.getAttribute("data-intrinsic-height")) ||
        0;
    return { intrinsicWidth: i, intrinsicHeight: t };
  }
  function pl(r) {
    return (
      Number(r.getAttribute("xo-fallback-width")) ||
      Number(r.getAttribute("data-fallback-width")) ||
      400
    );
  }
  function ml(r) {
    return (
      r.hasAttribute("xo-width-range") || r.hasAttribute("data-width-range")
    );
  }
  function wn(r) {
    return dt(
      r.getAttribute("xo-width-range") ||
        r.getAttribute("data-width-range") ||
        "[200, 1920]"
    );
  }
  function fl(r) {
    return r.intrinsicWidth > 0 && r.intrinsicHeight > 0;
  }
  function Cn(r) {
    const i = ul(r),
      t = pl(r),
      { width: e, height: s } = r.getBoundingClientRect(),
      n = r.parentElement,
      a = ml(r) ? e : Math.max(e, t);
    if (!n) return a;
    if (fl(i)) {
      const { intrinsicWidth: l, intrinsicHeight: d } = i,
        h = l / d,
        u = a / s;
      return h > u ? Math.round(s * h) : Math.round(a);
    }
    return a;
  }
  const c = {
      CircleBar: "xo-circle-bar",
      ScrollX: "xo-scroll-x",
      ScrollXInner: "xo-scroll-x-inner",
      ScrollXItem: "xo-scroll-x-item",
      Toggle: "xo-toggle",
      ToggleTrigger: "xo-toggle-trigger",
      Modal: "xo-modal",
      ModalTrigger: "xo-modal-trigger",
      ModalInner: "xo-modal-inner",
      ModalContent: "xo-modal-content",
      ModalBackdrop: "xo-modal-backdrop",
      ModalPan: "xo-modal-pan",
      Toast: "xo-toast",
      ToastPortal: "xo-toast-portal",
      ToastContent: "xo-toast-content",
      ToastCloseButton: "xo-toast-close-button",
      Popover: "xo-popover",
      PopoverTrigger: "xo-popover-trigger",
      BuilderPopover: "xo-builder-popover",
      BuilderPopoverContent: "xo-builder-popover-content",
      Tooltip: "xo-tooltip",
      TooltipContent: "xo-tooltip-content",
      TooltipTrigger: "xo-tooltip-trigger",
      Sticky: "xo-sticky",
      StickyInner: "xo-sticky-inner",
      StickyContent: "xo-sticky-content",
      StickySpace: "xo-sticky-space",
      StickyHidden: "xo-sticky-hidden",
      Collapse: "xo-collapse",
      CollapseTrigger: "xo-collapse-trigger",
      CollapseProvider: "xo-collapse-provider",
      List: "xo-list",
      ListTrigger: "xo-list-trigger",
      ListPortal: "xo-list-portal",
      ListItem: "xo-list-item",
      Tabs: "xo-tabs",
      TabsPane: "xo-tabs-pane",
      TabsTrigger: "xo-tabs-trigger",
      TabsActive: "xo-tabs-active",
      Parallax: "xo-parallax",
      ParallaxScroll: "xo-parallax-scroll",
      ParallaxHover: "xo-parallax-hover",
      ParallaxHoverInner: "xo-parallax-hover-inner",
      Carousel: "xo-carousel",
      CarouselThumbnail: "xo-carousel-thumbnail",
      CarouselList: "xo-carousel-list",
      CarouselInner: "xo-carousel-inner",
      CarouselSlide: "xo-carousel-slide",
      CarouselNext: "xo-carousel-next",
      CarouselPrev: "xo-carousel-prev",
      CarouselPagination: "xo-carousel-pagination",
      CarouselBullet: "xo-carousel-bullet",
      CarouselSize: "xo-carousel-size",
      CarouselPage: "xo-carousel-page",
      CarouselTrigger: "xo-carousel-trigger",
      ScrollCarousel: "xo-scroll-carousel",
      ScrollCarouselNext: "xo-scroll-carousel-next",
      ScrollCarouselPrev: "xo-scroll-carousel-prev",
      Range: "xo-range",
      RangePrice: "xo-range-price",
      RangeTrack: "xo-range-track",
      RangeThumb: "xo-range-thumb",
      RangeProgress: "xo-range-progress",
      Filters: "xo-filters",
      FiltersMobile: "xo-filters-mobile",
      FiltersField: "xo-filters-field",
      FiltersContent: "xo-filters-content",
      FiltersRefine: "xo-filters-refine",
      FiltersClear: "xo-filters-clear",
      FiltersFallback: "xo-filters-fallback",
      FiltersCount: "xo-filters-count",
      FiltersActiveSize: "xo-filters-active-size",
      FiltersPaginate: "xo-filters-paginate",
      FiltersTop: "xo-filters-top",
      FiltersSortBySelected: "xo-filters-sort-by-selected",
      FiltersRefineClearIcon: "xo-filters-refine-clear-icon",
      Gallery: "xo-gallery",
      GalleryItem: "xo-gallery-item",
      GalleryPortal: "xo-gallery-portal",
      GalleryNext: "xo-gallery-next",
      GalleryPrev: "xo-gallery-prev",
      GalleryCounter: "xo-gallery-counter",
      Cart: "xo-cart",
      CartMini: "xo-cart-mini",
      CartSize: "xo-cart-size",
      CartAdd: "xo-cart-add",
      CartFly: "xo-cart-fly",
      CartRemove: "xo-cart-remove",
      CartChangeFallback: "xo-cart-change-fallback",
      CartQuantity: "xo-cart-quantity",
      CartQuantityMinus: "xo-cart-quantity-minus",
      CartQuantityPlus: "xo-cart-quantity-plus",
      CartQuantityTrigger: "xo-cart-quantity-trigger",
      CartNote: "xo-cart-note",
      CartNoteSubmit: "xo-cart-note-submit",
      CartShippingRates: "xo-cart-shipping-rates",
      CartShippingRatesField: "xo-cart-shipping-rates-field",
      CartShippingRatesSubmit: "xo-cart-shipping-rates-submit",
      CartShippingRatesError: "xo-cart-shipping-rates-error",
      CartDiscount: "xo-cart-discount",
      CartDiscountSubmit: "xo-cart-discount-submit",
      CartScroll: "xo-cart-scroll",
      CartAddError: "xo-cart-add-error",
      CartAddErrorMessage: "xo-cart-add-error-message",
      CartWillChange: "xo-cart-will-change",
      Product: "xo-product",
      ProductWillChange: "xo-product-will-change",
      ProductVariant: "xo-product-variant",
      ProductVariantActive: "xo-product-variant-active",
      ProductData: "xo-product-data",
      ProductPickupAvailability: "xo-product-pickup-availability",
      ProductPickupAvailabilityList: "xo-product-pickup-availability-list",
      ProductQuickView: "xo-product-quick-view",
      ProductQuickViewTrigger: "xo-product-quick-view-trigger",
      ProductQuickViewVariant: "xo-product-quick-view-variant",
      ProductLiquidStatic: "xo-product-liquid-static",
      ProductVariantSelected: "xo-product-variant-selected",
      ProductRecipientForm: "xo-product-recipient-form",
      ProductRecipientFormError: "xo-product-recipient-form-error",
      ProductRecommendations: "xo-product-recommendations",
      ProductMedia: "xo-product-media",
      ProductCompareAdd: "xo-product-compare-add",
      ProductCompareRemove: "xo-product-compare-remove",
      ProductCompareClear: "xo-product-compare-clear",
      ProductCompareSize: "xo-product-compare-size",
      BundleProvider: "xo-bundle-provider",
      BundleAdd: "xo-bundle-add",
      BundleRemove: "xo-bundle-remove",
      BundleContent: "xo-bundle-content",
      BundlePrice: "xo-bundle-price",
      BundleSize: "xo-bundle-size",
      BundlePlaceholder: "xo-bundle-placeholder",
      BundleProgress: "xo-bundle-progress",
      BundleStep: "xo-bundle-step",
      MarqueeScrollTransform: "xo-marquee-scroll-transform",
      Marquee: "xo-marquee",
      MarqueeItem: "xo-marquee-item",
      Group: "xo-group",
      GroupButton: "xo-group-button",
      Animate: "xo-animate",
      AnimateItem: "xo-animate-item",
      ImageZoom: "xo-image-zoom",
      ImageZoomInner: "xo-image-zoom-inner",
      ImageZoomItem: "xo-image-zoom-item",
      ImageZoomThumb: "xo-image-zoom-thumb",
      ImageZoomManual: "xo-image-zoom-manual",
      Countdown: "xo-countdown",
      CountdownDay: "xo-countdown-day",
      CountdownHour: "xo-countdown-hour",
      CountdownMinute: "xo-countdown-minute",
      CountdownSecond: "xo-countdown-second",
      Countto: "xo-countto",
      CounttoNumber: "xo-countto-number",
      VideoCover: "xo-video-cover",
      VideoCoverButton: "xo-video-cover-button",
      VideoCoverItem: "xo-video-cover-item",
      Ripple: "xo-ripple",
      RippleItem: "xo-ripple-item",
      Typing: "xo-typing",
      TypingInner: "xo-typing-inner",
      TypingContent: "xo-typing-content",
      ImageComparison: "xo-image-comparison",
      Instagram: "xo-instagram",
      InstagramTemplate: "xo-instagram-template",
      InstagramItem: "xo-instagram-item",
      InstagramNext: "xo-instagram-next",
      InstagramPrev: "xo-instagram-prev",
      DarkMode: "xo-dark-mode",
      MegaMenu: "xo-mega-menu",
      Masonry: "xo-masonry",
      MasonryItem: "xo-masonry-item",
      Lazyload: "xo-lazyload",
      Cursor: "xo-cursor",
      CursorItem: "xo-cursor-item",
      VirtualScroll: "xo-virtual-scroll",
      Drr: "xo-drr",
      Drr2: "xo-drr-2",
      DrrAction: "xo-drr-action",
      Xo360Viewer: "xo-360-viewer",
      Xo360ViewerContent: "xo-360-viewer-content",
      Xo360ViewerNext: "xo-360-viewer-next",
      Xo360ViewerPrev: "xo-360-viewer-prev",
      Xo360ViewerPlay: "xo-360-viewer-play",
      Xo360ViewerPause: "xo-360-viewer-pause",
      Magnetic: "xo-magnetic",
      MagneticContent: "xo-magnetic-content",
      LineChart: "xo-line-chart",
      ScrollScene: "xo-scroll-scene",
      ScrollSceneInner: "xo-scroll-scene-inner",
      ScrollSceneItem: "xo-scroll-scene-item",
      CollectionTabs: "xo-collection-tabs",
      CollectionTabsTrigger: "xo-collection-tabs-trigger",
      CollectionTabsContent: "xo-collection-tabs-content",
      IntersectionVideo: "xo-intersection-video",
      ProductsFetcher: "xo-products-fetcher",
      ProductsFetcherAdd: "xo-products-fetcher-add",
      ProductsFetcherRemove: "xo-products-fetcher-remove",
      ProductsFetcherClear: "xo-products-fetcher-clear",
      ProductsFetcherSize: "xo-products-fetcher-size",
      ProductsFetcherPaginate: "xo-products-fetcher-paginate",
    },
    qi = new Map();
  class xl extends HTMLImageElement {
    constructor() {
      super(...arguments);
      o(this, "prevSrc", "");
      o(this, "removeOverlay", async () => {
        var e;
        const t =
          (e = this.parentElement) == null
            ? void 0
            : e.querySelector(".xo-lazyload-overlay");
        t == null || t.remove(),
          qi.set(this.prevSrc, this.src),
          x.set(this, "xo-loaded", !0),
          this.style.removeProperty("--fallback");
      });
      o(this, "handleLoad", () => {
        this.removeEventListener("load", this.handleLoad), this.removeOverlay();
      });
      o(this, "init", async () => {
        const t =
            this.getAttribute("xo-src") ||
            this.getAttribute("data-src") ||
            this.src,
          [e, s] = wn(this);
        this.loading !== "lazy" && (this.loading = "lazy");
        const n = this.closest(c.CarouselSlide),
          a = () => {
            const l = Cn(this),
              d = En(t, l, e, s);
            t &&
              ((this.prevSrc = t),
              (this.src = d),
              this.style.setProperty("--fallback", `url('${this.prevSrc}')`)),
              this.srcset && (this.srcset = `${d} ${l}w`),
              (this.complete || qi.has(this.src)) && this.removeOverlay(),
              this.addEventListener("load", this.handleLoad);
          };
        n && (qi.has(this.src) || (await T(50))), a();
      });
      o(
        this,
        "handleResize",
        rt(() => this.init(), 500)
      );
    }
    static get observedAttributes() {
      return ["xo-src", "data-src"];
    }
    connectedCallback() {
      this.init(), window.addEventListener("resize", this.handleResize, !1);
    }
    disconnectedCallback() {
      this.removeEventListener("load", this.handleLoad),
        window.removeEventListener("resize", this.handleResize, !1);
    }
    async attributeChangedCallback(t, e, s) {
      e !== s && this.init();
    }
  }
  function gl(r) {
    const i = r.replace(/url\(["']|["']\)/g, "");
    return i === window.location.href.replace(/\?.*/g, "") || i === "none"
      ? ""
      : i;
  }
  let Tt = null;
  function bl(r) {
    function i(t) {
      const e =
        gl(window.getComputedStyle(t).backgroundImage) ||
        t.getAttribute("xo-src") ||
        t.getAttribute("data-src") ||
        "";
      if (e) {
        const [s, n] = wn(t),
          a = En(e, Cn(t), s, n),
          l = t.querySelector(".xo-lazyload-overlay");
        t.tagName.toLowerCase() === c.ParallaxScroll &&
          t.addEventListener("xo:parallax-scroll:init", () => {
            (t.style.backgroundImage = `url('${a}')`), l == null || l.remove();
          }),
          (t.style.backgroundImage = `url('${a}')`),
          l == null || l.remove();
      }
    }
    "IntersectionObserver" in window
      ? (Tt == null || Tt.disconnect(),
        (Tt = new IntersectionObserver((t) => {
          t.forEach(async (e) => {
            if ((await T(window.XO_DEV ? 1e3 : 50), e.isIntersecting)) {
              const s = e.target;
              i(s), Tt == null || Tt.unobserve(s);
            }
          });
        })),
        r.forEach((t) => {
          Tt == null || Tt.observe(t);
        }))
      : r.forEach(i);
  }
  function ye(r = document) {
    const i = Array.from(r.querySelectorAll(".xo-background-lazyload"));
    bl(i);
  }
  ne(ye),
    document.addEventListener("shopify:section:load", (r) => ye(r.target)),
    document.addEventListener("shopify:section:reorder", (r) => ye(r.target)),
    window.addEventListener(
      "resize",
      rt(() => ye(), 500)
    );
  const yl = Array.from(document.querySelectorAll(c.MegaMenu)),
    Sn = new Map();
  v(yl, (r) => {
    const i = r.closest("li");
    i &&
      i.addEventListener("mouseenter", () => {
        Sn.get(i) || (ye(), Sn.set(i, !0));
      });
  });
  const qu = "";
  customElements.get(c.Lazyload) ||
    customElements.define(c.Lazyload, xl, { extends: "img" });
  const Hu = "",
    Vu = "";
  function vl() {
    var r;
    ((r = window.xbEditor) != null && r.designMode) ||
      window.addEventListener("click", (i) => {
        const e = i.target.closest("[xb-href]"),
          s = e == null ? void 0 : e.getAttribute("xb-href");
        s &&
          (i.preventDefault(),
          e.getAttribute("xb-target") === "_blank" || i.ctrlKey || i.metaKey
            ? window.open(Ri(s), "_blank")
            : (window.location.href = Ri(s)));
      });
  }
  vl();
  const Jt = (r, i, t) => r + (i - r) * t,
    tt = "===empty===",
    El = 1e3 / 60,
    Pn = 0,
    An = 100,
    Hi =
      /(px|%|vh|vw|em|rem|pt|cm|mm|in|pc|ex|ch|vmin|vmax|lh|rlh|vb|vi|svw|svh|lvw|lvh|dvw|dvh|deg)/g;
  class wl {
    constructor(i, t, e) {
      o(this, "el");
      o(this, "cloneEl");
      o(this, "options");
      o(this, "contextOptions");
      o(this, "currentValue");
      o(this, "targetValue");
      o(this, "handleFrameSyncUpdate", ({ delta: i }) => {
        const { lerpEase: t } = this.contextOptions;
        if (Math.abs(this.targetValue - this.currentValue) < 0.001) return;
        let s = i / El;
        const n = Math.round(s);
        n >= 1 && (s = n);
        const a = Jt(this.currentValue, this.targetValue, t * s);
        this.setStyles(this.el, a), (this.currentValue = a);
      });
      o(this, "destroy", () => {
        if (this.el) {
          const { style: i } = this.cloneEl;
          this.el.removeAttribute("style"),
            v(Array.from(i), (t) => {
              const e = i[t];
              this.el.style[t] = e;
            }),
            K.remove(this.handleFrameSyncUpdate);
        }
      });
      o(this, "getElement", () => this.el);
      (this.el = i),
        (this.cloneEl = this.el.cloneNode()),
        (this.options = t),
        (this.contextOptions = e),
        (this.currentValue = 0),
        (this.targetValue = 0),
        K.add(this.handleFrameSyncUpdate, !0);
    }
    getInputRange() {
      const { keyframes: i } = this.options;
      return wt(
        bt(i),
        (t, e) => {
          const s = Number(e.replace("%", ""));
          return isNaN(s) ? t : [...t, s];
        },
        []
      ).sort((t, e) => t - e);
    }
    getKeyframesByProp(i) {
      const { keyframes: t } = this.options,
        e = this.getInputRange();
      Math.max(...e) > 100 &&
        Et("Max value of input range must be less than 100%");
      let s = null;
      return wt(
        e,
        (n, a) => {
          const l = `${a}%`,
            d = t[l][i];
          return (
            d != null && n.push(String(d)),
            (s = n[n.length - 1]),
            d == null && s != null && n.push(s),
            n
          );
        },
        []
      );
    }
    getDefaultUnit(i) {
      switch (i) {
        case "x":
        case "y":
        case "width":
        case "height":
        case "backgroundPositionY":
        case "blur":
        case "borderRadius":
          return "px";
        case "rotate":
        case "rotateX":
        case "rotateY":
        case "skew":
        case "skewX":
        case "skewY":
        case "hueRotate":
          return "deg";
        case "backgroundSizeX":
        case "backgroundSizeY":
        case "grayscale":
          return "%";
        case "scale":
        case "scaleX":
        case "scaleY":
        case "opacity":
        case "videoTime":
        case "brightness":
        case "contrast":
        default:
          return "";
      }
    }
    interpolate(i, t) {
      const e = this.getKeyframesByProp(t),
        s = String(e[0]).replace(/[0-9.,-]/g, ""),
        n = e.map((l) => Number(String(l).replace(Hi, "")));
      return e.length === 0
        ? tt
        : `${D({
            value: i,
            inputRange: this.getInputRange(),
            outputRange: n,
          })}${s || this.getDefaultUnit(t)}`;
    }
    setStyles(i, t) {
      const { setStyles: e } = this.contextOptions,
        s = this.interpolate(t, "x"),
        n = this.interpolate(t, "y"),
        a = this.interpolate(t, "rotate"),
        l = this.interpolate(t, "rotateX"),
        d = this.interpolate(t, "rotateY"),
        h = this.interpolate(t, "scale"),
        u = this.interpolate(t, "scaleX"),
        p = this.interpolate(t, "scaleY"),
        m = this.interpolate(t, "skew"),
        f = this.interpolate(t, "skewX"),
        b = this.interpolate(t, "skewY"),
        y = this.interpolate(t, "opacity"),
        E = this.interpolate(t, "borderRadius"),
        C = this.interpolate(t, "width"),
        S = this.interpolate(t, "height"),
        k = this.interpolate(t, "brightness"),
        $ = this.interpolate(t, "contrast"),
        L = this.interpolate(t, "hueRotate"),
        Q = this.interpolate(t, "blur"),
        st = this.interpolate(t, "grayscale"),
        lt = this.interpolate(t, "backgroundPositionY"),
        At = this.interpolate(t, "backgroundSizeX"),
        $t = this.interpolate(t, "backgroundSizeY"),
        Yt = this.interpolate(t, "videoTime"),
        Be = this.interpolate(t, "groupImg"),
        Mt = [];
      if (
        ((i.style.transform = Rt(
          [
            `translateX(${s})`,
            `translateY(${n})`,
            `rotate(${a})`,
            `rotateX(${l})`,
            `rotateY(${d})`,
            `scale(${h})`,
            `scaleX(${u})`,
            `scaleY(${p})`,
            `skew(${m})`,
            `skewX(${f})`,
            `skewY(${b})`,
          ],
          (mt) => !!mt && !mt.includes(tt)
        ).join(" ")),
        C !== tt && (i.style.width = `${C}`),
        S !== tt && (i.style.height = `${S}`),
        y !== tt && (i.style.opacity = `${y}`),
        E !== tt && (i.style.borderRadius = `${E}`),
        k !== tt && Mt.push(`brightness(${k})`),
        $ !== tt && Mt.push(`contrast(${$})`),
        L !== tt && Mt.push(`hue-rotate(${L})`),
        Q !== tt && Mt.push(`blur(${Q})`),
        st !== tt && Mt.push(`grayscale(${st})`),
        Mt.length > 0 && (i.style.filter = Mt.join(" ")),
        lt !== tt &&
          ((i.style.backgroundSize = "cover"),
          (i.style.backgroundPosition = "center"),
          j.iOS
            ? (i.style.backgroundPosition = `50% calc(${lt} * -1)`)
            : ((i.style.backgroundAttachment = "fixed"),
              (i.style.backgroundPosition = `50% ${lt}`))),
        At !== tt && $t === tt && (i.style.backgroundSize = `${At} 100%`),
        At === tt && $t !== tt && (i.style.backgroundSize = `100% ${$t}`),
        At !== tt && $t !== tt && (i.style.backgroundSize = `${At} ${$t}`),
        Yt !== tt)
      ) {
        const mt = i.querySelector("video");
        if (mt && mt.duration) {
          const Gt = D({
            value: Number(Yt.replace(Hi, "")),
            inputRange: [0, 100],
            outputRange: [0, mt.duration],
          });
          mt.currentTime = Gt;
        }
      }
      if (Be !== tt) {
        window.getComputedStyle(i).position === "static" &&
          (i.style.position = "relative");
        const mt = Array.from(i.querySelectorAll("img")),
          Gt = Math.floor(
            D({
              value: Number(Be.replace(Hi, "")),
              inputRange: [0, 100],
              outputRange: [0, mt.length - 1],
            })
          );
        v(mt, (Zo, Ko) => {
          Zo.style.opacity = Ko === Gt ? "1" : "0";
        });
      }
      e &&
        e({
          element: i,
          createValue: (mt) => this.interpolate(t, mt),
          EMPTY: tt,
        });
    }
    handleParallax() {
      const i = window.scrollY - this.getFrom(),
        t = this.getTo() - this.getFrom(),
        e = Z((i / t) * 100, Pn, An);
      e >= Pn && e <= An && (this.targetValue = e);
    }
    getFrom() {
      const { from: i } = this.options;
      return typeof i == "function" ? i() : i;
    }
    getTo() {
      const { to: i } = this.options;
      return typeof i == "function" ? i() : i;
    }
    init() {
      this.handleParallax();
    }
  }
  const bo = class {
    constructor(i) {
      o(this, "options");
      o(this, "items");
      o(this, "handlerScroll", () => {
        for (const i of this.items) i.init();
      });
      o(
        this,
        "add",
        (i, t) => (this.items.push(new wl(i, t, this.options)), this)
      );
      o(this, "remove", (i) => {
        const t = this.items.find((e) => e.getElement() === i);
        (this.items = this.items.filter((e) => e.getElement() !== i)),
          t && t.destroy();
      });
      o(this, "run", () => {
        const { targetElement: i } = this.options;
        this.handlerScroll(),
          i.removeEventListener("scroll", this.handlerScroll, !1),
          i.addEventListener("scroll", this.handlerScroll, !1);
      });
      o(this, "destroy", () => {
        const { targetElement: i } = this.options;
        i.removeEventListener("scroll", this.handlerScroll, !1);
        for (const t of this.items) t.destroy();
      });
      (this.options = { ...bo.defaultOptions, ...i }), (this.items = []);
    }
  };
  let ts = bo;
  o(ts, "defaultOptions", {
    targetElement: window,
    setStyles: void 0,
    lerpEase: 0.08,
  });
  const zu = "";
  function es(r = {}) {
    return new ts(r);
  }
  window.xoParallaxScroll = es;
  const _u = "",
    Cl = /\/(checkout|cart)/g,
    ss = (r) => {
      const i = new URL(r);
      return (
        i.origin === location.origin &&
        ["http:", "https:"].includes(i.protocol) &&
        !(i.protocol === "http:" && location.protocol === "https:") &&
        !(
          i.hash &&
          i.pathname + i.search === location.pathname + location.search
        )
      );
    },
    Tn = (r) => {
      document.body.classList.add("xo-navigate-smooth"),
        (window.location.href = r);
    },
    Sl = (r) => !!r.closest("a[href]"),
    yo = class {
      constructor(i) {
        o(this, "linksLoaded", new Set());
        o(this, "domparser", new DOMParser());
        o(this, "pages", new Map());
        o(this, "controllers", new Map());
        o(this, "options");
        o(this, "lastTouchTimestamp", 0);
        o(this, "timeId", -1);
        o(this, "getHtml", async (i) => {
          const { use: t } = this.options,
            { href: e } = i;
          if (!this.linksLoaded.has(e)) {
            this.linksLoaded.add(e),
              this.controllers.set(e, new AbortController());
            const { signal: s } = this.controllers.get(e);
            if (!this.pages.has(e))
              if (t === "SSR") {
                const n = document.createElement("link");
                (n.rel = "prefetch"),
                  (n.href = e),
                  (n.fetchPriority = "high"),
                  (n.as = "document"),
                  x.set(n, "xo-prefetch", !0),
                  (n.onload = () => {
                    x.set(i, "xo-prefetched", !0);
                  }),
                  document.head.appendChild(n);
              } else
                try {
                  const a = await (await fetch(e, { signal: s })).text(),
                    l = this.domparser.parseFromString(a, "text/html");
                  this.pages.set(e, l);
                } catch {
                  this.linksLoaded.delete(e);
                }
          }
        });
        o(this, "cancelRequest", (i) => {
          const { use: t } = this.options;
          if (this.controllers.has(i)) {
            if (t === "SSR") {
              const e = document.querySelector(
                `link[xo-prefetch][href="${i}"]`
              );
              e && e.remove();
            } else this.controllers.get(i).abort();
            this.linksLoaded.delete(i);
          }
        });
        o(this, "navigate", (i) => {
          if (Cl.test(i)) Tn(i);
          else if (ss(i)) {
            const { root: t } = this.options;
            if (this.pages.has(i) && t) {
              const e = `#${t.id}`,
                s = this.pages.get(i).querySelector(e);
              s &&
                ((t.innerHTML = s.innerHTML),
                window.history.pushState(null, "", i),
                window.scrollTo(0, 0),
                this.update());
            } else Tn(i);
          }
        });
        o(this, "handleWindowClick", async (i) => {
          const { use: t } = this.options,
            e = i.target.closest("a");
          !e ||
            (t === "CSR" &&
              Sl(e) &&
              (i.preventDefault(), this.navigate(e.href)));
        });
        o(this, "handleMouseOver", (i) => {
          if (performance.now() - this.lastTouchTimestamp < 1100) return;
          const t = i.target.closest("a");
          t &&
            ss(t.href) &&
            (this.timeId = window.setTimeout(() => {
              (this.timeId = -1), this.getHtml(t);
            }, 80));
        });
        o(this, "handleTouchStart", (i) => {
          this.lastTouchTimestamp = Date.now();
          const t = i.target.closest("a");
          t &&
            ss(t.href) &&
            (t.addEventListener("touchcancel", this.handleCancel, {
              passive: !0,
            }),
            t.addEventListener("touchend", this.handleCancel, { passive: !0 }),
            this.getHtml(t));
        });
        o(this, "handleCancel", (i) => {
          const t = i.target.closest("a");
          t &&
            ss(t.href) &&
            !x.get(t, "xo-prefetched") &&
            (this.timeId !== -1
              ? (clearTimeout(this.timeId), (this.timeId = -1))
              : this.cancelRequest(t.href));
        });
        o(this, "handlePopState", async (i) => {
          const { use: t } = this.options;
          t === "CSR" &&
            (i.preventDefault(), this.navigate(window.location.href));
        });
        o(this, "update", () => {
          this.destroy(), this.init();
        });
        o(this, "init", () => {
          window.Shopify.designMode ||
            (document.body.classList.contains("xo-navigate-smooth") ||
              document.body.classList.add("xo-using-page-speed"),
            document.addEventListener("mouseover", this.handleMouseOver, {
              capture: !0,
              passive: !0,
            }),
            document.addEventListener("mouseout", this.handleCancel, {
              passive: !0,
            }),
            document.addEventListener("touchstart", this.handleTouchStart, {
              capture: !0,
              passive: !0,
            }),
            window.addEventListener("click", this.handleWindowClick),
            window.addEventListener("popstate", this.handlePopState));
        });
        o(this, "destroy", () => {
          clearTimeout(this.timeId),
            document.removeEventListener("mouseover", this.handleMouseOver),
            document.removeEventListener("mouseout", this.handleCancel),
            document.removeEventListener("touchstart", this.handleTouchStart),
            window.removeEventListener("click", this.handleWindowClick),
            window.removeEventListener("popstate", this.handlePopState);
        });
        (this.options = { ...yo.defaultOptions, ...i }), this.init();
      }
    };
  let Vi = yo;
  o(Vi, "defaultOptions", {
    root: document.querySelector("#xo-main-content") || document.body,
    use: "SSR",
  });
  const Wu = "",
    Pl = 14,
    vo = class extends HTMLElement {
      constructor() {
        super(...arguments);
        o(this, "index", 0);
        o(this, "frameId", 0);
        o(this, "cancelDelay", () => {});
        o(this, "_options");
        o(this, "imageLoaded", !1);
        o(this, "parallax", null);
        o(this, "disconnect", () => {});
        o(this, "setOptions", () => {
          this.options = M(this, {
            pick: [
              "xoSpeed",
              "xoRtl",
              "xoPauseOnHover",
              "xoScrollEnabled",
              "xoScrollSpeed",
              "xoAutoRun",
            ],
            types: {
              xoSpeed: "number",
              xoRtl: "boolean",
              xoPauseOnHover: "boolean",
              xoScrollEnabled: "boolean",
              xoAutoRun: "boolean",
              xoScrollSpeed: "number",
            },
          });
        });
        o(this, "getChildWidth", () => {
          const t = Array.from(this.children);
          return wt(t, (s, n, a) => (a < t.length ? s + n.clientWidth : s), 0);
        });
        o(this, "setDuration", async () => {
          const e = Array.from(this.querySelectorAll("img")).map((l) => l.src);
          await gn(e);
          const { xoSpeed: s, xoRtl: n, xoAutoRun: a } = this.options;
          if (a) {
            const l = this.children[0],
              d = Z(
                l.offsetWidth * Pl - (s - 1) * l.offsetWidth,
                l.offsetWidth,
                1 / 0
              );
            this.style.setProperty("--xo-marquee-from", "0"),
              this.style.setProperty("--xo-marquee-to", n ? "100%" : "-100%"),
              this.style.setProperty("--xo-marquee-duration", `${d}ms`);
          }
        });
        o(this, "handleClone", () => {
          const { xoScrollEnabled: t, xoScrollSpeed: e } = this.options;
          this.frameId = requestAnimationFrame(() => {
            const s = Array.from(this.children);
            if (this.getChildWidth() === 0) {
              const n = this.appendChild(s[this.index].cloneNode(!0));
              x.set(n, "xo-cloned", !0),
                this.setDuration(),
                cancelAnimationFrame(this.frameId);
            } else if (
              this.getChildWidth() <=
              this.offsetWidth * (t ? 2 * Math.min(e, 3) : 1)
            ) {
              const n = this.appendChild(s[this.index].cloneNode(!0));
              x.set(n, "xo-cloned", !0),
                this.handleClone(),
                this.index === s.length - 1 ? (this.index = 0) : this.index++,
                s.length >= 200 && this.update();
            } else {
              const n = this.appendChild(s[this.index].cloneNode(!0));
              x.set(n, "xo-cloned", !0),
                this.setDuration(),
                cancelAnimationFrame(this.frameId);
            }
          });
        });
        o(this, "removeCloned", () => {
          const t = Array.from(
            this.querySelectorAll(`${c.MarqueeItem}[xo-cloned]`)
          );
          v(t, (s) => {
            s.remove();
          });
          const e = this.querySelector(c.MarqueeItem);
          if (e) {
            const s = Array.from(e.children);
            v(s, (n) => {
              this.appendChild(n);
            }),
              e.remove();
          }
        });
        o(this, "handler", async () => {
          const { xoRtl: t } = this.options,
            e = Array.from(this.children);
          if ((x.set(this, "xo-rtl", t), !this.imageLoaded)) {
            await T(500);
            const n = Array.from(this.querySelectorAll("img")).map(
              (a) => a.src
            );
            await gn(n), (this.imageLoaded = !0);
          }
          if (e[0].tagName.toLowerCase() !== c.MarqueeItem) {
            const s = document.createElement(c.MarqueeItem);
            v(e, (n) => {
              s.appendChild(n);
            }),
              this.appendChild(s);
          }
          this.handleClone(),
            requestAnimationFrame(() => {
              x.set(this, "xo-ready", !0);
            });
        });
        o(this, "handleParallax", () => {
          var d;
          const {
            xoScrollEnabled: t,
            xoScrollSpeed: e,
            xoRtl: s,
          } = this.options;
          if (!t) return;
          (d = this.parallax) == null || d.destroy(),
            (this.parallax = es({
              lerpEase: 1,
              setStyles: ({ element: h, createValue: u, EMPTY: p }) => {
                const m = u("marqueeScroll");
                m !== p &&
                  h.style.setProperty(
                    "--xo-marquee-scroll",
                    `${Number(m) * e}px`
                  );
              },
            }));
          const n = this.closest(c.MarqueeScrollTransform),
            a = () =>
              n
                ? Y(n).top - window.innerHeight
                : Y(this).top - window.innerHeight,
            l = () =>
              n
                ? Y(n).top + this.getBoundingClientRect().height
                : Y(this).top + this.getBoundingClientRect().height;
          this.parallax
            .add(this, {
              from: a,
              to: l,
              keyframes: {
                "0%": { marqueeScroll: 0 },
                "100%": { marqueeScroll: window.innerHeight * (s ? 1 : -1) },
              },
            })
            .run();
        });
        o(this, "destroy", () => {
          var t;
          (t = this.parallax) == null || t.destroy(),
            this.cancelDelay(),
            cancelAnimationFrame(this.frameId),
            (this.index = 0);
        });
        o(this, "update", async () => {
          this.destroy(),
            this.setOptions(),
            this.removeCloned(),
            await this.handler(),
            this.handleParallax();
        });
        o(this, "sectionListenerForBuilder", () => {
          this.disconnect = al(this, () => {
            this.update();
          });
        });
      }
      get options() {
        return { ...vo.defaultOptions, ...this._options };
      }
      set options(t) {
        this._options = t;
      }
      static get observedAttributes() {
        return ["xo-observed"];
      }
      async connectedCallback() {
        var t;
        (t = window.xbEditor) != null && t.designMode && (await T(100)),
          this.setOptions(),
          this.removeCloned(),
          await this.handler(),
          this.handleParallax(),
          this.sectionListenerForBuilder();
      }
      async attributeChangedCallback(t, e, s) {
        t === "xo-observed" &&
          e != null &&
          e !== s &&
          this.imageLoaded &&
          (this.cancelDelay(),
          (this.cancelDelay = await T(200)),
          this.update());
      }
      disconnectedCallback() {
        this.destroy(), this.disconnect();
      }
    };
  let is = vo;
  o(is, "defaultOptions", {
    xoSpeed: 6,
    xoRtl: getComputedStyle(document.documentElement).direction === "rtl",
    xoPauseOnHover: !1,
    xoAutoRun: !0,
    xoScrollEnabled: !1,
    xoScrollSpeed: 1,
  }),
    _({ [c.Marquee]: is });
  const it = {
      none: (r, { value: i }) => {
        r.style.visibility = i === 0 ? "hidden" : "visible";
      },
      zoom:
        (r = !1) =>
        (t, { value: e, isOpen: s, usePan: n = !1, easing: a }) => {
          if (n) (t.style.visibility = "hidden"), (t.style.opacity = "0");
          else {
            const l = s ? [0, 1] : [1, 0],
              d = !s,
              h = D({
                value: e,
                inputRange: l,
                easing: a,
                reverseEasing: d,
                outputRange: s ? [0.5, 1] : [1, 0.5],
              });
            if (r) {
              const u = D({
                value: e,
                inputRange: l,
                easing: R.ease,
                reverseEasing: d,
                outputRange: s ? [0, 1] : [1, 0],
              });
              t.style.opacity = `${u}`;
            }
            (t.style.transform = `scale(${h})`),
              (t.style.visibility = e === 0 ? "hidden" : "visible");
          }
        },
      move:
        ({ dx: r = 0, dy: i = 0, opacity: t = 0 } = {}) =>
        (s, { value: n, isOpen: a, usePan: l = !1, easing: d }) => {
          if (l) (s.style.visibility = "hidden"), (s.style.opacity = "0");
          else {
            const h = a ? [0, 1] : [1, 0],
              u = !a,
              p = D({
                value: n,
                inputRange: h,
                easing: R.ease,
                reverseEasing: u,
                outputRange: a ? [t, 1] : [1, t],
              }),
              m = (f) =>
                D({
                  value: n,
                  inputRange: h,
                  easing: d,
                  reverseEasing: u,
                  outputRange: a ? [f, 0] : [0, f],
                });
            (s.style.transform = `translate(${m(
              typeof r == "function" ? r(s) : r
            )}px, ${m(typeof i == "function" ? i(s) : i)}px)`),
              (s.style.opacity = `${p}`),
              (s.style.visibility = n === 0 ? "hidden" : "visible");
          }
        },
    },
    g = new Ye({
      logger: !1,
      loggerCollapsed: !0,
      storagePrefix:
        (oa = window.Shopify) != null && oa.shop
          ? `@xo/${Ue(window.Shopify.shop)}`
          : "",
    });
  window.xoStore = g;
  class Dt {
    constructor(i) {
      o(this, "stateName");
      o(this, "getTriggerElement", (i, t) =>
        t != null
          ? t
          : document.querySelector(`${c.PopoverTrigger}[xo-name="${i}"]`)
      );
      o(this, "toggle", (i, t) => {
        const e = this.getTriggerElement(i, t);
        g.set(this.stateName, (s) => {
          var n;
          return {
            ...s,
            trigger: { ...s.trigger, [this.stateName]: i },
            data: {
              ...s.data,
              [i]: {
                ...s.data[i],
                isOpen: !((n = s.data[i]) != null && n.isOpen),
                ...(e != null ? { triggerElement: e } : {}),
              },
            },
          };
        })(`${this.stateName}/toggle`);
      });
      o(this, "open", (i, t) => {
        const e = this.getTriggerElement(i, t);
        g.set(this.stateName, (s) => ({
          ...s,
          trigger: { ...s.trigger, [this.stateName]: i },
          data: {
            ...s.data,
            [i]: {
              ...s.data[i],
              isOpen: !0,
              ...(e != null ? { triggerElement: e } : {}),
            },
          },
        }))(`${this.stateName}/open`);
      });
      o(this, "close", (i, t) => {
        const e = t === "empty" ? t : this.getTriggerElement(i, t);
        g.set(this.stateName, (s) => ({
          ...s,
          trigger: { ...s.trigger, [this.stateName]: i },
          data: {
            ...s.data,
            [i]: {
              ...s.data[i],
              isOpen: !1,
              ...(e != null
                ? { triggerElement: e === "empty" ? null : e }
                : {}),
            },
          },
        }))(`${this.stateName}/close`);
      });
      o(this, "on", (i, t, e) =>
        g.subscribe(this.stateName, ({ data: s }) => {
          s[t] != null &&
            ((i === "open" && s[t].isOpen) ||
              (i === "close" && !s[t].isOpen)) &&
            e();
        })
      );
      this.stateName = i;
    }
  }
  const Bi =
      "button, a, input, select, textarea, summary, details, label, [tabindex], [contenteditable], [role], [aria-label], [aria-labelledby], [aria-describedby]",
    Al = Xe();
  class zi extends HTMLElement {
    constructor() {
      super();
      o(this, "unsubscribe", null);
      o(this, "sectionEl", null);
      o(this, "initialized", !1);
      o(this, "prevIsOpen", !1);
      o(this, "allA11yEls", []);
      o(this, "a11yEls", []);
      o(this, "firstA11yEl", null);
      o(this, "lastA11yEl", null);
      o(this, "firstA11yIndex", null);
      o(this, "lastA11yIndex", null);
      o(this, "focusIndex", null);
      o(this, "toggleIndex", null);
      o(this, "listener", () => {
        var e;
        const { isOpen: t } = this.state;
        this.initialized &&
          t !== this.prevIsOpen &&
          (t
            ? (x.set(this, "xo-active", !0),
              this.componentOpen(),
              this.handleAutoFocus(),
              document.addEventListener("keydown", this.handleA11y),
              (this.toggleIndex = this.focusIndex))
            : (x.set(this, "xo-active", !1),
              this.toggleIndex != null &&
                ((e = this.allA11yEls[this.toggleIndex]) == null || e.focus(),
                (this.toggleIndex = null)),
              this.componentClose(),
              document.removeEventListener("keydown", this.handleA11y)),
          (this.prevIsOpen = t)),
          this.initialized && this.subscribe();
      });
      o(this, "setState", (t) =>
        g.set(this.stateName, (e) => {
          const s = e;
          return {
            ...e,
            data: { ...s.data, ...(typeof t == "function" ? t(s.data) : t) },
          };
        })
      );
      o(this, "setCssVariables", (t, e) => {
        const { xoName: s } = this.options;
        G(this.componentName, "xo-name", s);
        let n = "";
        const a = e || this.options;
        for (const d in a) {
          const h = a[d];
          if (h != null && typeof h != "object") {
            let u = Zt.camelToKebab(d);
            u = u.includes("xo-") ? u : `xo-${u}`;
            const p = t != null ? " !important" : "";
            n += `--${u}: ${h}${p};`;
          }
        }
        const { cssText: l } = Al`
      ${this.componentName}[xo-name="${s}"] {
        ${n}
      }
    `;
        t == null
          ? cn(l, document.head)
          : cn(`@media (max-width: ${t}px) { ${l} }`, document.head);
      });
      o(this, "handleA11y", (t) => {
        const { xoEscCloseDisabled: e } = this.options,
          { isOpen: s } = this.state;
        (this.allA11yEls = Array.from(document.querySelectorAll(Bi))),
          (this.a11yEls = Array.from(this.querySelectorAll(Bi)));
        const n = t.shiftKey,
          a = t.key === "Tab";
        if (t.key === "Escape" && s && !e) {
          const { xoName: d } = this.options;
          G(this.componentName, "xo-name", d), new Dt(this.stateName).close(d);
        }
        if (!this.a11yEls.length) {
          const { isOpen: d } = this.state;
          d && t.preventDefault();
          return;
        }
        if (
          ((this.firstA11yEl = this.a11yEls[0]),
          (this.lastA11yEl = this.a11yEls[this.a11yEls.length - 1]),
          (this.firstA11yIndex = this.allA11yEls.indexOf(this.firstA11yEl)),
          (this.lastA11yIndex = this.allA11yEls.indexOf(this.lastA11yEl)),
          a)
        ) {
          const d = t.target,
            h =
              d.shadowRoot && typeof t.composedPath == "function"
                ? t.composedPath()[0]
                : d;
          let u = this.allA11yEls.indexOf(h);
          n
            ? u === this.firstA11yIndex && (u = this.lastA11yIndex + 1)
            : u === this.lastA11yIndex && (u = this.firstA11yIndex - 1),
            v(this.allA11yEls, (p, m) => {
              m === u ? p.focus() : p.blur();
            });
        }
      });
      o(this, "handleAutoFocus", async () => {
        var s;
        if (
          ((s = this.parentElement) == null
            ? void 0
            : s.tagName.toLowerCase()) === c.GalleryPortal
        )
          return;
        const { xoAutofocus: t = !1 } = this.options;
        if (
          this.componentName === "xo-modal" ||
          this.componentName === "xo-popover"
        ) {
          const n = Number(this.getAttribute("xo-duration")) || 300;
          await T(n);
        }
        if ((this.focus(), t)) {
          const n = this.querySelector(
            'input[type="text"], input[type="email"], input[type="password"], input[type="number"], input[type="tel"], input[type="url"], input[type="search"], textarea'
          );
          n == null || n.focus();
        }
      });
      o(this, "handleShopifySectionSelect", () => {
        const { xoName: t } = this.options;
        new Dt(this.stateName).open(t);
      });
      o(this, "handleShopifySectionDeselect", () => {
        const { xoName: t } = this.options;
        new Dt(this.stateName).close(t);
      });
      o(this, "handleDesignMode", () => {
        var t, e, s;
        ((t = window.Shopify) == null ? void 0 : t.designMode) &&
          !!x.get(this, "xo-section-select") &&
          ((e = this.sectionEl) == null ||
            e.addEventListener(
              "shopify:section:select",
              this.handleShopifySectionSelect
            ),
          (s = this.sectionEl) == null ||
            s.addEventListener(
              "shopify:section:deselect",
              this.handleShopifySectionDeselect
            ));
      });
      o(this, "handleFocusIn", (t) => {
        const e = Array.from(document.querySelectorAll(Bi));
        this.focusIndex = e.indexOf(t.target);
      });
      o(this, "componentOpen", () => {});
      o(this, "componentClose", () => {});
      o(this, "componentMount", () => {});
      o(this, "componentUnmount", () => {});
      o(this, "subscribe", () => {});
      o(this, "componentBeforeMount", () => {});
      this.sectionEl = this.closest(".shopify-section");
    }
    get options() {
      return M(this, {
        pick: [
          "xoName",
          "xoAutofocus",
          "xoSectionSelect",
          "xoEscCloseDisabled",
        ],
        types: {
          xoName: "string",
          xoAutofocus: "boolean",
          xoSectionSelect: "boolean",
          xoEscCloseDisabled: "boolean",
        },
      });
    }
    get state() {
      var n;
      const { xoName: t } = this.options;
      G(this.componentName, "xo-name", t);
      const e = g.get(this.stateName),
        s = (n = e == null ? void 0 : e.data) == null ? void 0 : n[t];
      return typeof s != "object" && s.isOpen == null ? {} : s;
    }
    async connectedCallback() {
      var e;
      this.componentBeforeMount();
      const { xoName: t } = this.options;
      G(this.componentName, "xo-name", t),
        x.set(this, "xo-content", !0),
        this.getAttribute("tabindex") == null &&
          ((e = this.parentElement) == null
            ? void 0
            : e.tagName.toLowerCase()) !== c.GalleryPortal &&
          (this.tabIndex = 0),
        document.addEventListener("focusin", this.handleFocusIn),
        g.set(this.stateName, (s) => {
          const n = s;
          return {
            ...n,
            data: { ...n.data, [t]: { isOpen: !1, ...n.data[t] } },
          };
        })(`${this.stateName}/mount`),
        (this.unsubscribe = g.subscribe(
          this.stateName,
          this.listener,
          (s, n) => t !== n.trigger[this.stateName]
        )),
        await T(0),
        this.componentMount(),
        this.handleDesignMode(),
        (this.initialized = !0);
    }
    disconnectedCallback() {
      var t, e, s;
      (t = this.unsubscribe) == null || t.call(this),
        this.componentUnmount(),
        document.removeEventListener("keydown", this.handleA11y),
        document.removeEventListener("focusin", this.handleFocusIn),
        (e = this.sectionEl) == null ||
          e.removeEventListener(
            "shopify:section:select",
            this.handleShopifySectionSelect
          ),
        (s = this.sectionEl) == null ||
          s.removeEventListener(
            "shopify:section:deselect",
            this.handleShopifySectionDeselect
          );
    }
  }
  class ve extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", null);
      o(this, "initialized", !1);
      o(this, "prevIsOpen", !1);
      o(this, "contentTarget", !1);
      o(this, "bindClick", () => {
        this.addEventListener("click", this.handleTrigger);
      });
      o(this, "bindHover", () => {
        const { xoName: t } = this.options,
          e = document.querySelector(`[xo-content][xo-name="${t}"]`);
        this.addEventListener("mouseenter", this.handleMouseEnter),
          this.addEventListener("mouseleave", this.handleMouseLeave),
          e &&
            (e.addEventListener("mouseenter", this.handleMouseEnter),
            e.addEventListener("mouseleave", this.handleMouseLeave));
      });
      o(this, "handleMouseEnter", (t) => {
        this.contains(t.target) || (this.contentTarget = !!t.target),
          this.state.isOpen || this.handleToggle("open");
      });
      o(this, "handleMouseLeave", async () => {
        this.state.isOpen &&
          (await T(200),
          this.contentTarget || this.handleToggle("close"),
          (this.contentTarget = !1));
      });
      o(this, "handleTrigger", async () => {
        await T(), this.handleToggle(this.actionType);
      });
      o(this, "handleToggle", (t) => {
        const { xoName: e } = this.options;
        G(this.componentName, "xo-name", e);
        const s = new Dt(this.stateName);
        t !== "none" && s[t](e), this.componentTrigger();
      });
      o(this, "listener", () => {
        const { isOpen: t } = this.state;
        this.initialized &&
          t !== this.prevIsOpen &&
          (t
            ? (x.set(this, "xo-active", !0), this.componentOpen())
            : (x.set(this, "xo-active", !1), this.componentClose()),
          (this.prevIsOpen = t));
      });
      o(this, "setState", (t) =>
        g.set(this.stateName, (e) => {
          const s = e;
          return {
            ...e,
            data: { ...s.data, ...(typeof t == "function" ? t(s.data) : t) },
          };
        })
      );
      o(this, "componentOpen", () => {});
      o(this, "componentClose", () => {});
      o(this, "componentMount", () => {});
      o(this, "componentUnmount", () => {});
      o(this, "componentTrigger", () => {});
      o(this, "componentBeforeMount", () => {});
    }
    async connectedCallback() {
      this.componentBeforeMount();
      const { xoName: t } = this.options;
      G(this.componentName, "xo-name", t),
        this.eventType === "click"
          ? this.bindClick()
          : this.eventType === "hover" &&
            (j.any ? this.bindClick() : this.bindHover()),
        (this.unsubscribe = g.subscribe(
          this.stateName,
          this.listener,
          (e, s) => t !== s.trigger[this.stateName]
        )),
        await T(0),
        this.componentMount(),
        (this.initialized = !0);
    }
    disconnectedCallback() {
      var t;
      this.removeEventListener("click", this.handleTrigger),
        j.any ||
          (this.removeEventListener("mouseenter", this.handleMouseEnter),
          this.removeEventListener("mouseleave", this.handleMouseLeave)),
        (t = this.unsubscribe) == null || t.call(this),
        this.componentUnmount();
    }
    get actionType() {
      return "toggle";
    }
    get eventType() {
      return "click";
    }
    get state() {
      var n;
      const { xoName: t } = this.options;
      G(this.componentName, "xo-name", t);
      const e = g.get(this.stateName),
        s = (n = e == null ? void 0 : e.data) == null ? void 0 : n[t];
      return typeof s != "object" && (s == null ? void 0 : s.isOpen) == null
        ? {}
        : s;
    }
    get options() {
      const t = M(this, { pick: ["xoName"], types: { xoName: "string" } }),
        e = this.closest("[xo-name]");
      return e
        ? { ...M(e, { pick: ["xoName"], types: { xoName: "string" } }), ...t }
        : t;
    }
  }
  window.xoAnimate = it;
  const kn = new Dt("xo-toggle"),
    Eo = class extends zi {
      constructor() {
        super(...arguments);
        o(this, "_options");
        o(this, "parentEl", null);
        o(this, "setOptions", () => {
          var s;
          const t = M(this, {
              pick: [
                "xoName",
                "xoAutofocus",
                "xoOutsideClickEnabled",
                "xoSectionSelect",
                "xoPortal",
                "xoParentSelector",
                "xoBreakpoints",
              ],
              types: {
                xoName: "string",
                xoAutofocus: "boolean",
                xoOutsideClickEnabled: "boolean",
                xoSectionSelect: "boolean",
                xoPortal: "boolean",
                xoParentSelector: "string",
                xoBreakpoints: "object",
              },
            }),
            e = qt((s = t.xoBreakpoints) != null ? s : {});
          this.options = {
            ...t,
            xoPortal:
              (e == null ? void 0 : e.portal) != null ? e.portal : t.xoPortal,
          };
        });
        o(this, "handleOutsideClick", (t) => {
          const { xoName: e, xoOutsideClickEnabled: s } = this.options,
            { isOpen: n } = this.state,
            a = t.target,
            l = document.querySelector(`${c.ToggleTrigger}[xo-name="${e}"]`);
          n &&
            s &&
            !this.contains(a) &&
            !(l != null && l.contains(a)) &&
            e &&
            kn.close(e);
        });
        o(this, "handleTopSelector", async () => {
          const { xoPortal: t } = this.options;
          if (!!t && this.parentEl) {
            const {
                width: e,
                height: s,
                top: n,
              } = this.parentEl.getBoundingClientRect(),
              { left: a } = Y(this.parentEl);
            this.style.setProperty("--xo-top", `${n}px`),
              this.style.setProperty("--xo-left", `${a}px`),
              this.style.setProperty("--xo-width", `${e}px`),
              this.style.setProperty("--xo-height", `${s}px`),
              await T(500),
              this.handleTopSelector();
          }
        });
        o(this, "handleScroll", () => {
          this.handleTopSelector();
        });
        o(
          this,
          "handleResize",
          rt(
            ge("x", () => {
              this.setOptions(), this.init();
            }),
            500
          )
        );
        o(this, "componentBeforeMount", () => {
          this.setOptions();
        });
        o(this, "componentOpen", async () => {
          await T();
          const { xoParentSelector: t } = this.options;
          t && (this.parentEl = document.querySelector(t)),
            this.handleTopSelector();
        });
        o(this, "init", () => {
          const { xoPortal: t, xoName: e, xoParentSelector: s } = this.options;
          s && (this.parentEl = document.querySelector(s)),
            t &&
              e &&
              s &&
              (this.setAttribute("popover", e),
              this.style.setProperty("--xo-right", `${xn()}px`),
              Qe(this),
              this.handleTopSelector(),
              window.addEventListener("scroll", this.handleScroll)),
            t ||
              (be(this),
              this.removeAttribute("popover"),
              this.style.removeProperty("--xo-top"),
              this.style.removeProperty("--xo-left"),
              this.style.removeProperty("--xo-right"),
              this.style.removeProperty("--xo-width"),
              this.style.removeProperty("--xo-height")),
            document.addEventListener("click", this.handleOutsideClick);
        });
        o(this, "componentMount", () => {
          const { xoBreakpoints: t } = this.options;
          this.init(),
            t &&
              bt(t).length > 0 &&
              window.addEventListener("resize", this.handleResize);
        });
        o(this, "componentUnmount", () => {
          document.addEventListener("click", this.handleOutsideClick),
            window.removeEventListener("scroll", this.handleScroll),
            window.removeEventListener("resize", this.handleResize),
            be(this);
        });
      }
      static get observedAttributes() {
        return ["xo-portal", "xo-breakpoints"];
      }
      get options() {
        return { ...Eo.defaultOptions, ...this._options };
      }
      get stateName() {
        return "xo-toggle";
      }
      get componentName() {
        return c.Toggle;
      }
      set options(t) {
        this._options = t;
      }
      async attributeChangedCallback(t, e, s) {
        e !== s && (await T(100), this.setOptions(), this.init());
      }
    };
  let os = Eo;
  o(os, "defaultOptions", {
    xoName: null,
    xoOutsideClickEnabled: !1,
    xoPortal: !1,
    xoParentSelector: "",
  });
  class Tl extends ve {
    get stateName() {
      return "xo-toggle";
    }
    get componentName() {
      return c.ToggleTrigger;
    }
  }
  g.create("xo-toggle", { initialState: { trigger: {}, data: {} } });
  const Gu = "",
    kl = new Dt("xo-toggle");
  (window.xoToggle = kl), _({ [c.Toggle]: os, [c.ToggleTrigger]: Tl });
  const $n =
      (r = !1) =>
      (
        t,
        { value: e, isOpen: s, triggerEl: n, dy: a = 0, modalEl: l, easing: d }
      ) => {
        if (!n) return it.zoom(r)(t, { value: e, isOpen: s, easing: d });
        const h = l.querySelector("img[xo-cropped]"),
          u = n.getBoundingClientRect(),
          p = s ? [0, 1] : [1, 0],
          m = !s,
          f = u.width / t.offsetWidth,
          b = u.height / t.offsetHeight,
          y = u.left + u.width / 2 - l.scrollWidth / 2,
          E = t.offsetHeight > l.offsetHeight ? t.offsetHeight : l.offsetHeight,
          C = u.top + u.height / 2 - E / 2 + l.scrollTop,
          S = D({
            value: e,
            inputRange: p,
            easing: d,
            reverseEasing: m,
            outputRange: s ? [f, 1] : [1, f],
          }),
          k = D({
            value: e,
            inputRange: p,
            easing: d,
            reverseEasing: m,
            outputRange: s ? [b, 1] : [1, b],
          }),
          $ = D({
            value: e,
            inputRange: p,
            easing: d,
            reverseEasing: m,
            outputRange: s ? [y, 0] : [0, y],
          }),
          L = D({
            value: e,
            inputRange: p,
            easing: d,
            reverseEasing: m,
            outputRange: s ? [C, a] : [a, C],
          });
        if (r) {
          const Q = D({
            value: e,
            inputRange: p,
            easing: R.ease,
            reverseEasing: m,
            outputRange: s ? [0, 1] : [1, 0],
          });
          t.style.opacity = `${Q}`;
        }
        (t.style.transform = `translateX(${$}px) translateY(${L}px) scaleX(${S}) scaleY(${k})`),
          (t.style.visibility = e === 0 ? "hidden" : "visible"),
          h &&
            (S > k
              ? (h.style.transform = `scaleY(${S / k})`)
              : (h.style.transform = `scaleX(${k / S})`));
      },
    Mn = {
      none: it.none,
      zoom: it.zoom(!0),
      "smart-zoom": $n(),
      "smart-fade-zoom": $n(!0),
      fade: it.move(),
      "fade-up": it.move({ dy: 100 }),
      "fade-down": it.move({ dy: -100 }),
      "fade-left": it.move({ dx: 100 }),
      "fade-right": it.move({ dx: -100 }),
      "slide-up": it.move({
        dy: (r) => {
          const { offsetTop: i } = r;
          return window.innerHeight - i;
        },
        opacity: 1,
      }),
      "slide-down": it.move({
        dy: (r) => {
          const { offsetTop: i, offsetHeight: t } = r;
          return -1 * (t + i);
        },
        opacity: 1,
      }),
      "slide-left": it.move({
        dx: (r) => {
          const { offsetLeft: i } = r;
          return window.innerWidth - i;
        },
        opacity: 1,
      }),
      "slide-right": it.move({
        dx: (r) => {
          const { offsetLeft: i, offsetWidth: t } = r;
          return -1 * (t + i);
        },
        opacity: 1,
      }),
    },
    Ln = Xe(),
    $l = (r, i) => Ln`
  ${c.ModalBackdrop} {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: ${r || "var(--xo-backdrop-color, rgba(0, 0, 0, 0.5))"};
    backdrop-filter: blur(${i ? `${i}px` : "var(--xo-backdrop-blur, 0px)"});
    pointer-events: auto;
  }
  ${c.ModalInner} {
    position: relative;
    display: flex;
    min-height: 100%;
    overflow: hidden;
  }
  ${c.ModalInner}[xo-placement="center"] {
    align-items: center;
    justify-content: center;
  }
  ${c.ModalInner}[xo-placement="top-center"] {
    justify-content: center;
  }
  ${c.ModalInner}[xo-placement="top-right"] {
    justify-content: flex-end;
  }
  ${c.ModalInner}[xo-placement="bottom-left"] {
    align-items: flex-end;
  }
  ${c.ModalInner}[xo-placement="bottom-center"] {
    align-items: flex-end;
    justify-content: center;
  }
  ${c.ModalInner}[xo-placement="bottom-right"] {
    align-items: flex-end;
    justify-content: flex-end;
  }
  ${c.ModalContent} {
    position: relative;
    z-index: 9;
    display: block;
    visibility: hidden;
    width: fit-content;
    height: fit-content;
    pointer-events: none;
  }
`,
    Ml = () => Ln`
  ${c.ModalContent} * {
    pointer-events: auto;
  }
`;
  function Ll() {
    const r = xn();
    document.body.style.setProperty("--scroll-bar-width", `${r}px`),
      document.body.classList.add("xo-modal-open");
  }
  function Il() {
    const { data: r } = g.get("xo-modal");
    re(r).some((t) => t.isOpen && t.options.xoScrollDisabled) ||
      (document.body.style.removeProperty("--scroll-bar-width"),
      document.body.classList.remove("xo-modal-open"));
  }
  const wo = class extends zi {
    constructor() {
      super(...arguments);
      o(this, "animated", W());
      o(this, "cancel", () => {});
      o(this, "shadow", this.attachShadow({ mode: "open" }));
      o(this, "dialog", document.createElement("div"));
      o(this, "_options");
      o(this, "setOptions", () => {
        var s;
        const t = M(this, {
            pick: [
              "xoName",
              "xoDuration",
              "xoEasing",
              "xoAnimate",
              "xoBackdropColor",
              "xoBackdropBlur",
              "xoBackdropDisabled",
              "xoPortal",
              "xoPlacement",
              "xoDisabled",
              "xoBreakpoints",
              "xoAutofocus",
              "xoSectionSelect",
              "xoVideoAutoplay",
              "xoScrollDisabled",
              "xoEscCloseDisabled",
              "xoBackdropCloseDisabled",
            ],
            types: {
              xoName: "string",
              xoDuration: "number",
              xoEasing: "string",
              xoAnimate: "string",
              xoBackdropColor: "string",
              xoBackdropBlur: "number",
              xoBackdropDisabled: "boolean",
              xoPortal: "boolean",
              xoPlacement: "string",
              xoDisabled: "boolean",
              xoBreakpoints: "object",
              xoAutofocus: "boolean",
              xoSectionSelect: "boolean",
              xoVideoAutoplay: "boolean",
              xoScrollDisabled: "boolean",
              xoEscCloseDisabled: "boolean",
              xoBackdropCloseDisabled: "boolean",
            },
          }),
          e = qt((s = t.xoBreakpoints) != null ? s : {});
        this.options = JSON.parse(
          JSON.stringify({
            ...t,
            xoDisabled:
              (e == null ? void 0 : e.disabled) != null
                ? e.disabled
                : t.xoDisabled,
            xoDuration:
              (e == null ? void 0 : e.duration) != null
                ? e.duration
                : t.xoDuration,
            xoEasing:
              (e == null ? void 0 : e.easing) != null ? e.easing : t.xoEasing,
            xoAnimate:
              (e == null ? void 0 : e.animate) != null
                ? e.animate
                : t.xoAnimate,
            xoBackdropColor:
              (e == null ? void 0 : e.backdropColor) != null
                ? e.backdropColor
                : t.xoBackdropColor,
            xoBackdropBlur:
              (e == null ? void 0 : e.backdropBlur) != null
                ? e.backdropBlur
                : t.xoBackdropBlur,
            xoBackdropDisabled:
              (e == null ? void 0 : e.backdropDisabled) != null
                ? e.backdropDisabled
                : t.xoBackdropDisabled,
            xoPlacement:
              (e == null ? void 0 : e.placement) != null
                ? e.placement
                : t.xoPlacement,
          })
        );
      });
      o(this, "componentOpen", () => {
        const {
          xoDuration: t,
          xoVideoAutoplay: e,
          xoScrollDisabled: s,
        } = this.options;
        if (
          (Qe(this),
          s && Ll(),
          this.cancel(),
          (this.cancel = this.animated({ from: 0, to: 1, duration: t })),
          e)
        ) {
          const n = this.querySelector("video");
          n == null || n.play();
        }
      });
      o(this, "componentClose", () => {
        const { xoDuration: t, xoVideoAutoplay: e } = this.options;
        if (
          (Il(),
          this.cancel(),
          this.animated({
            from: 1,
            to: 0,
            duration: t,
            onEnd: () => {
              be(this);
            },
          }),
          e)
        ) {
          const s = this.querySelector("video");
          s == null || s.pause();
        }
      });
      o(this, "setStyles", (t) => {
        const {
            xoAnimate: e,
            xoEasing: s,
            xoBackdropDisabled: n,
          } = this.options,
          { isOpen: a, triggerElement: l, dy: d, usePan: h = !1 } = this.state,
          u = this.shadow.querySelector(c.ModalContent),
          { cssText: p } = Ml(),
          m = this.shadow.querySelector("style");
        t === 0
          ? (this.style.removeProperty("visibility"),
            this.style.removeProperty("opacity"))
          : (n || (this.style.visibility = "visible"),
            (this.style.opacity = "1")),
          t === 1
            ? (this.style.removeProperty("pointer-events"),
              m && !m.innerText.includes(p) && (m.innerText = m.innerText + p))
            : ((this.style.pointerEvents = "none"),
              m && (m.innerText = m.innerText.replace(p, ""))),
          Mn[e] &&
            Mn[e](u, {
              value: t,
              isOpen: a,
              triggerEl: l,
              dy: d,
              modalEl: this,
              usePan: h,
              easing: R[s],
            });
      });
      o(this, "render", () => {
        const {
            xoName: t,
            xoBackdropColor: e,
            xoBackdropBlur: s,
            xoBackdropDisabled: n,
            xoPlacement: a,
            xoDisabled: l,
          } = this.options,
          { cssText: d } = $l(e, s),
          h = n
            ? ""
            : `<${c.ModalBackdrop} part="backdrop" xo-name="${t}"></${c.ModalBackdrop}>`;
        return l
          ? `
        <${c.ModalInner} part="inner" xo-placement="${a}">
          <${c.ModalContent} part="content">
            <slot name="${t}-inner"></slot>
          </${c.ModalContent}>
          ${h}
        </${c.ModalInner}>
      `
          : `
      <style>${d}</style>
      <${c.ModalInner} part="inner" xo-placement="${a}">
        <${c.ModalContent} part="content">
          <slot name="${t}-inner"></slot>
        </${c.ModalContent}>
        ${h}
      </${c.ModalInner}>
    `;
      });
      o(this, "addSlotName", (t) => {
        const e = Array.from(this.querySelectorAll(c.Modal)),
          s = Array.from(this.children);
        v(s, (n) => {
          e.includes(n) || n.setAttribute("slot", `${t}-inner`);
        });
      });
      o(this, "setOptionsState", (t) => {
        this.setState((e) => ({
          ...e,
          [t]: { ...e[t], options: this.options },
        }));
      });
      o(this, "checkSmartAnimateSupport", () => {
        const { xoAnimate: t, xoPlacement: e } = this.options;
        t.includes("smart-") &&
          e !== "center" &&
          Et(
            `[${c.Modal}] xo-placement="${e}" is not supported with xo-animate="${t}"`
          );
      });
      o(this, "handleImageCropped", () => {
        const t = this.querySelector("img[xo-cropped]");
        if (t) {
          const e = t.naturalWidth / t.naturalHeight,
            s = window.innerWidth / window.innerHeight;
          e > s
            ? ((t.style.width = "100vw"), (t.style.height = "auto"))
            : ((t.style.width = "auto"),
              (t.style.height = "100vh"),
              (t.style.maxWidth = "none"));
        }
      });
      o(this, "componentBeforeMount", () => {
        this.setOptions();
      });
      o(
        this,
        "handleResize",
        rt(
          ge("x", () => {
            const { xoName: t } = this.options;
            this.setOptions(), this.animated.off(), Ht.close(t), this.mounted();
          }),
          500
        )
      );
      o(this, "setCurrentDisabled", () => {
        const { xoDisabled: t } = this.options;
        x.set(this, "xo-current-disabled", t);
      });
      o(this, "handleDialogCancel", (t) => {
        t.preventDefault();
      });
      o(this, "mounted", () => {
        const {
          xoName: t,
          xoDisabled: e,
          xoBreakpoints: s,
          xoPortal: n,
        } = this.options;
        G(this.componentName, "xo-name", t),
          this.addSlotName(t),
          this.setCurrentDisabled(),
          n && je() && this.setAttribute("popover", t),
          (this.shadow.innerHTML = this.render()),
          this.setCssVariables(),
          s &&
            bt(s).length > 0 &&
            v(bt(s).sort(), (a) => {
              const l = s[a];
              this.setCssVariables(Number(a), l);
            }),
          e ||
            (this.setOptionsState(t),
            this.checkSmartAnimateSupport(),
            this.animated.onUpdate(this.setStyles),
            this.handleImageCropped());
      });
      o(this, "componentMount", () => {
        const { xoBreakpoints: t } = this.options;
        this.mounted(),
          t &&
            bt(t).length > 0 &&
            window.addEventListener("resize", this.handleResize);
      });
      o(this, "componentUnmount", () => {
        this.animated.off(),
          window.removeEventListener("resize", this.handleResize),
          this.dialog.removeEventListener("cancel", this.handleDialogCancel);
      });
      o(this, "handleClose", () => {
        const { xoName: t } = this.options;
        G(this.componentName, "xo-name", t),
          this.setState((e) => ({
            ...e,
            [t]: {
              ...e[t],
              triggerElement: e[t].triggerElement,
              usePan: !1,
              isOpen: !1,
            },
          }));
      });
    }
    get stateName() {
      return "xo-modal";
    }
    get componentName() {
      return c.Modal;
    }
    get options() {
      var n, a, l, d;
      const { xoPlacement: t } = this._options,
        e =
          !t || t === "center"
            ? {}
            : {
                xoDuration:
                  (a =
                    (n = window.settings) == null
                      ? void 0
                      : n.drawer_duration) != null
                    ? a
                    : 300,
                xoEasing:
                  (d =
                    (l = window.settings) == null ? void 0 : l.drawer_easing) !=
                  null
                    ? d
                    : "decay",
                xoAnimate: "smart-fade-zoom",
              },
        s = { ...wo.defaultOptions, ...e, ...this._options };
      return { ...s, xoDuration: s.xoAnimate === "none" ? 0 : s.xoDuration };
    }
    set options(t) {
      this._options = t;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    getShadow() {
      return this.shadow;
    }
    async attributeChangedCallback(t, e, s) {
      if (t === "xo-observed" && e != null && e !== s) {
        await T(100),
          this.setOptions(),
          this.componentUnmount(),
          this.componentMount(),
          this.handleClose();
        const n = Array.from(
          document.querySelectorAll(
            `${c.ModalTrigger}[xo-name="${this.options.xoName}"]`
          )
        );
        v(n, (a) => {
          a.setAttribute("xo-observed", s);
        });
      }
    }
  };
  let ns = wo;
  o(ns, "defaultOptions", {
    xoName: null,
    xoDuration:
      (ra = (na = window.settings) == null ? void 0 : na.modal_duration) != null
        ? ra
        : 300,
    xoEasing:
      (la = (aa = window.settings) == null ? void 0 : aa.modal_easing) != null
        ? la
        : "decay",
    xoAnimate:
      (da = (ca = window.settings) == null ? void 0 : ca.modal_animate) != null
        ? da
        : "smart-fade-zoom",
    xoBackdropDisabled: !1,
    xoPortal: je(),
    xoPlacement: "center",
    xoDisabled: !1,
    xoBreakpoints: {},
    xoScrollDisabled: !0,
    xoAutofocus: !1,
    xoVideoAutoplay: !1,
  });
  const In = 1e3 / 60,
    Js = class extends ve {
      constructor() {
        super(...arguments);
        o(this, "timeId", -1);
        o(this, "timeId2", -1);
        o(this, "_options");
        o(this, "setOptions", () => {
          this.options = M(this, {
            pick: ["xoName", "xoSync"],
            types: { xoName: "string", xoSync: "boolean" },
          });
        });
        o(this, "setTriggerElement", () => {
          const { xoName: t } = this.options,
            { isOpen: e } = this.state;
          G(this.componentName, "xo-name", t),
            this.setState((s) => {
              var n;
              return {
                ...s,
                [t]: {
                  ...s[t],
                  triggerElement: e
                    ? this
                    : (n = s[t]) == null
                    ? void 0
                    : n.triggerElement,
                  usePan: !1,
                },
              };
            });
        });
        o(this, "componentTrigger", () => {
          const { isOpen: t } = this.state,
            { xoSync: e } = this.options;
          this.setTriggerElement(),
            e &&
              t &&
              (this.timeId2 = window.setTimeout(() => {
                this.style.visibility = "hidden";
              }, In));
        });
        o(this, "componentBeforeMount", () => {
          this.setOptions();
        });
        o(this, "componentMount", () => {
          this.setTriggerElement();
        });
        o(this, "componentUnmount", () => {
          clearTimeout(this.timeId), clearTimeout(this.timeId2);
        });
        o(this, "componentClose", () => {
          const { xoSync: t } = this.options;
          if (t) {
            const { options: e } = this.state,
              { xoDuration: s } = e;
            this.timeId = window.setTimeout(() => {
              this.style.visibility = "visible";
            }, s - In);
          }
        });
      }
      get stateName() {
        return "xo-modal";
      }
      get componentName() {
        return c.ModalTrigger;
      }
      get options() {
        const t = this.closest("[xo-name]");
        if (t) {
          const e = M(t, { pick: ["xoName"], types: { xoName: "string" } });
          return { ...Js.defaultOptions, ...e, ...this._options };
        }
        return { ...Js.defaultOptions, ...this._options };
      }
      set options(t) {
        this._options = t;
      }
      static get observedAttributes() {
        return ["xo-observed"];
      }
      async attributeChangedCallback(t, e, s) {
        t === "xo-observed" &&
          e != null &&
          e !== s &&
          (await T(100), this.setOptions());
      }
    };
  let rs = Js;
  o(rs, "defaultOptions", { xoName: null, xoSync: !1 });
  class Dl extends ve {
    constructor() {
      super(...arguments);
      o(this, "animated", W());
      o(this, "cancel", () => {});
      o(this, "componentOpen", () => {
        const { options: t } = this.state,
          { xoDuration: e } = t;
        this.cancel(),
          (this.cancel = this.animated({
            from: 0,
            to: 1,
            duration: e,
            easing: R.decay,
          }));
      });
      o(this, "componentClose", () => {
        const { options: t, opacity: e = 1, usePan: s = !1 } = this.state,
          { xoDuration: n } = t;
        this.cancel(),
          (this.cancel = this.animated({
            from: e,
            to: 0,
            duration: s ? 0 : n,
            easing: R.decay,
          }));
      });
      o(this, "componentMount", () => {
        const { options: t } = this.state,
          { xoAnimate: e } = t;
        (this.style.visibility = "hidden"),
          this.animated.onUpdate((s) => {
            e !== "none" && (this.style.opacity = `${s}`),
              s === 0
                ? (this.style.visibility = "hidden")
                : (this.style.visibility = "visible");
          });
      });
      o(this, "componentUnmount", () => {
        this.animated.off();
      });
    }
    get stateName() {
      return "xo-modal";
    }
    get componentName() {
      return c.ModalBackdrop;
    }
    get actionType() {
      const { options: t } = this.state,
        { xoBackdropCloseDisabled: e } = t;
      return e ? "none" : "close";
    }
  }
  const te = { Idle: "idle", Target: "target", Lock: "lock" },
    ti = class extends ve {
      constructor() {
        super(...arguments);
        o(this, "animated", W());
        o(this, "panAnimated", W());
        o(this, "panCloseAnimated", W());
        o(this, "cancel", () => {});
        o(this, "modalEl", null);
        o(this, "backdropEl", null);
        o(this, "contentEl", null);
        o(this, "distance", 0);
        o(this, "opacity", 1);
        o(this, "timeId", -1);
        o(this, "pan", null);
        o(this, "axis", te.Idle);
        o(this, "componentOpen", () => {
          const { options: t } = this.state,
            { xoDuration: e } = t;
          this.cancel(),
            (this.cancel = this.animated({ from: 0, to: 1, duration: e }));
        });
        o(this, "componentClose", () => {
          const { options: t } = this.state,
            { xoDuration: e } = t;
          this.cancel(),
            (this.cancel = this.animated({ from: 1, to: 0, duration: e }));
        });
        o(this, "componentUnmount", () => {
          clearTimeout(this.timeId),
            this.pan && this.pan.destroy(),
            this.animated.off(),
            this.panAnimated.off(),
            this.panCloseAnimated.off();
        });
        o(this, "resetModalMeasure", () => {
          const { xoName: t } = this.options;
          G(this.componentName, "xo-name", t),
            this.setState((e) => ({
              ...e,
              [t]: { ...e[t], dy: 0, opacity: 1 },
            }))(`${this.stateName}/resetModalContentMeasure`);
        });
        o(this, "componentMount", () => {
          const {
              xoName: t,
              xoVertical: e,
              xoThreshold: s,
              xoIntentionalAxis: n,
            } = this.options,
            { options: a } = this.state,
            { xoEasing: l, xoAnimate: d } = a,
            h = new Dt(this.stateName);
          G(this.componentName, "xo-name", t),
            (this.pan = Kt({
              element: this,
              onMove: ({ dx: u, dy: p }) => {
                var f, b, y, E, C, S, k;
                const m = this.querySelector(c.ImageZoomItem);
                if (
                  !(
                    Number(
                      (f = m == null ? void 0 : m.getAttribute("xo-zoom")) !=
                        null
                        ? f
                        : "1"
                    ) > 1
                  )
                )
                  if (
                    ((this.modalEl = this.closest(c.Modal)),
                    (this.backdropEl =
                      (E =
                        (y =
                          (b = this.modalEl) == null ? void 0 : b.shadowRoot) ==
                        null
                          ? void 0
                          : y.querySelector) == null
                        ? void 0
                        : E.call(y, c.ModalBackdrop)),
                    (this.contentEl =
                      (k =
                        (S =
                          (C = this.modalEl) == null ? void 0 : C.shadowRoot) ==
                        null
                          ? void 0
                          : S.querySelector) == null
                        ? void 0
                        : k.call(S, c.ModalContent)),
                    this.axis === te.Idle &&
                      (Math.abs(e ? u : p) / s >= Math.abs(e ? p : u)
                        ? (this.axis = te.Target)
                        : (this.axis = te.Lock)),
                    this.axis === te.Target || !n)
                  ) {
                    this.style.touchAction = "none";
                    const $ =
                        (e
                          ? window.innerWidth - this.offsetWidth
                          : window.innerHeight - this.offsetHeight) / 2,
                      L = (e ? this.offsetWidth : this.offsetHeight) + $;
                    this.backdropEl &&
                      ((this.opacity = D({
                        value: e ? u : p,
                        inputRange: [-L, 0, L],
                        outputRange: [0, 1, 0],
                      })),
                      (this.backdropEl.style.opacity = `${this.opacity}`)),
                      this.contentEl &&
                        (d.includes("smart-")
                          ? e
                            ? (this.contentEl.style.transform = `translateX(${u}px)`)
                            : (this.contentEl.style.transform = `translateY(${p}px)`)
                          : e
                          ? (this.contentEl.style.transform = `translateX(${u}px)`)
                          : (this.contentEl.style.transform = `translateY(${p}px)`));
                  } else this.pan && this.pan.setValue({ dx: 0, dy: 0 });
              },
              onEnd: ({ dx: u, dy: p, vx: m, vy: f }) => {
                var S;
                const b = this.querySelector(c.ImageZoomItem);
                if (
                  Number(
                    (S = b == null ? void 0 : b.getAttribute("xo-zoom")) != null
                      ? S
                      : "1"
                  ) > 1
                )
                  return;
                const { options: y } = this.state,
                  { xoDuration: E, xoAnimate: C } = y;
                if (
                  (this.axis === te.Target || !n) &&
                  ((this.style.pointerEvents = "none"),
                  (this.distance = e ? u : p),
                  this.contentEl)
                ) {
                  let k = (e ? window.innerWidth : window.innerHeight) / 3;
                  n &&
                    (k =
                      (e
                        ? this.contentEl.offsetWidth
                        : this.contentEl.offsetHeight) / 2);
                  const $ =
                    Math.abs(this.distance) > k || Math.abs(e ? m : f) > 8;
                  this.setState((L) => ({
                    ...L,
                    [t]: { ...L[t], dy: p, opacity: this.opacity },
                  }))(`${this.stateName}/setModalContentMeasure`),
                    $
                      ? C.includes("smart-")
                        ? h.close(t)
                        : this.panCloseAnimated({
                            from: 0,
                            to: 1,
                            duration: 300,
                          })
                      : this.panAnimated({ from: 0, to: 1, duration: 300 }),
                    this.pan && this.pan.setValue({ dx: 0, dy: 0 }),
                    (this.timeId = window.setTimeout(() => {
                      this.resetModalMeasure(),
                        clearTimeout(this.timeId),
                        this.style.removeProperty("pointer-events");
                    }, E));
                }
                this.style.removeProperty("touch-action"),
                  (this.axis = te.Idle);
              },
            })),
            this.panAnimated.onUpdate((u) => {
              if (this.backdropEl) {
                const p = D({
                  value: u,
                  inputRange: [0, 1],
                  outputRange: [this.opacity, 1],
                });
                this.backdropEl.style.opacity = `${p}`;
              }
              if (this.contentEl) {
                const p = D({
                  value: u,
                  inputRange: [0, 1],
                  outputRange: [this.distance, 0],
                  easing: R[l],
                });
                e
                  ? (this.contentEl.style.transform = `translateX(${p}px) translateY(0px) scale(1)`)
                  : (this.contentEl.style.transform = `translateX(0px) translateY(${p}px) scale(1)`);
              }
            }),
            this.panCloseAnimated.onUpdate((u) => {
              if (this.backdropEl) {
                const p = D({
                  value: u,
                  inputRange: [0, 1],
                  outputRange: [this.opacity, 0],
                });
                this.backdropEl.style.opacity = `${p}`;
              }
              if (this.contentEl) {
                const {
                  offsetTop: p,
                  offsetLeft: m,
                  offsetWidth: f,
                  offsetHeight: b,
                } = this.contentEl;
                let y = -1 * (e ? f + m : b + p);
                this.distance >= 0 &&
                  (y = e ? window.innerWidth - m : window.innerHeight - p);
                const E = D({
                  value: u,
                  inputRange: [0, 1],
                  outputRange: [this.distance, y],
                  easing: R[l],
                });
                e
                  ? (this.contentEl.style.transform = `translateX(${E}px) translateY(0px) scale(1)`)
                  : (this.contentEl.style.transform = `translateX(0px) translateY(${E}px) scale(1)`);
              }
            }),
            this.panCloseAnimated.onEnd(() => {
              this.setState((u) => ({ ...u, [t]: { ...u[t], usePan: !0 } })),
                h.close(t);
            });
        });
      }
      get stateName() {
        return "xo-modal";
      }
      get componentName() {
        return c.ModalPan;
      }
      get actionType() {
        return "none";
      }
      get options() {
        const t = M(this, {
            pick: ["xoName", "xoVertical", "xoThreshold", "xoIntentionalAxis"],
            types: {
              xoName: "string",
              xoVertical: "boolean",
              xoThreshold: "number",
              xoIntentionalAxis: "boolean",
            },
          }),
          e = this.closest("[xo-name]");
        if (e) {
          const s = M(e, { pick: ["xoName"], types: { xoName: "string" } });
          return { ...ti.defaultOptions, ...s, ...t };
        }
        return { ...ti.defaultOptions, ...t };
      }
    };
  let as = ti;
  o(as, "defaultOptions", {
    xoName: null,
    xoVertical: !1,
    xoThreshold: 1.5,
    xoIntentionalAxis: !1,
  }),
    g.create("xo-modal", { initialState: { trigger: {}, data: {} } });
  const ju = "",
    Ht = new Dt("xo-modal");
  (window.xoModal = Ht),
    _({
      [c.Modal]: ns,
      [c.ModalTrigger]: rs,
      [c.ModalBackdrop]: Dl,
      [c.ModalPan]: as,
    });
  const Nl = Xe()`
  ${c.ScrollXInner} {
    display: block;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }
`;
  class Ol extends HTMLElement {
    constructor() {
      super();
      o(this, "shadow");
      o(this, "instance");
      o(this, "elementStyle", (t) => {
        (this.style.height = `${t * 100}vh`),
          (this.shadow.innerHTML = `
      <style>${Nl.cssText}</style>
      <${c.ScrollXInner} part="inner"><slot></slot></${c.ScrollXInner}>
    `);
      });
      o(this, "handleChild", (t, e) => {
        if (t.tagName.toLowerCase() === c.ScrollXItem && e > 0) {
          const s = Y(this).top;
          this.instance.add(t, {
            from: () =>
              s - window.innerHeight * 2 + window.innerHeight * (e + 1),
            to: () => s - window.innerHeight + window.innerHeight * (e + 1),
            keyframes: { "0%": { width: "0%" }, "100%": { width: "100%" } },
          });
        }
      });
      (this.shadow = this.attachShadow({ mode: "open" })),
        (this.instance = es({
          setStyles({ element: t, createValue: e }) {
            const s = e("width");
            t.style.width = `${s}`;
          },
        }));
    }
    connectedCallback() {
      const t = Array.from(this.children);
      this.elementStyle(t.length), v(t, this.handleChild), this.instance.run();
    }
  }
  const Zu = "";
  _({ [c.ScrollX]: Ol });
  const Ee = {
      set(r, i) {
        g.set("xo-circle-bar", (t) => ({ ...t, [r]: i }));
      },
      animate(r, { value: i, duration: t = 1e3, easing: e }) {
        const s = W();
        return (
          s({
            from: 0,
            to: i,
            duration: t,
            easing: e ? R[e] : void 0,
            onUpdate(n) {
              g.set("xo-circle-bar", (a) => ({ ...a, [r]: n }));
            },
          }),
          s.off
        );
      },
    },
    Dn = {},
    _i = new IntersectionObserver(
      (r) => {
        const i = requestAnimationFrame(() => {
          r.forEach(async (t) => {
            const e = t.target,
              {
                xoDuration: s,
                xoName: n,
                xoEasing: a,
                xoValue: l,
              } = e.getOptions();
            if (t.isIntersecting && n && l) {
              const d = Dn[n];
              d == null || d();
              const h = Ee.animate(n, { value: l, duration: s, easing: a });
              (Dn[n] = h), cancelAnimationFrame(i), _i.unobserve(e);
            }
          });
        });
      },
      { rootMargin: "0px 0px -50px 0px" }
    ),
    Co = class extends HTMLElement {
      constructor() {
        super(...arguments);
        o(this, "unsubscribe", null);
        o(this, "getOptions", () => {
          const t = M(this, {
            pick: [
              "xoName",
              "xoFill",
              "xoStrokeWidth",
              "xoSize",
              "xoTrackColor",
              "xoThumbColor",
              "xoStrokeLinecap",
              "xoAnimateOnScroll",
              "xoEasing",
              "xoValue",
              "xoDuration",
            ],
            types: {
              xoName: "string",
              xoFill: "string",
              xoStrokeWidth: "number",
              xoSize: "number",
              xoTrackColor: "string",
              xoThumbColor: "string",
              xoStrokeLinecap: "string",
              xoAnimateOnScroll: "boolean",
              xoEasing: "string",
              xoValue: "number",
              xoDuration: "number",
            },
          });
          return { ...Co.defaultOptions, ...t };
        });
        o(this, "listener", () => {
          var d;
          const { xoName: t, xoSize: e, xoStrokeWidth: s } = this.getOptions();
          this.closest(c.Carousel) || G(c.CircleBar, "xo-name", t);
          const a = this.querySelector(".circle-bar-thumb"),
            l = (d = g.get("xo-circle-bar")) == null ? void 0 : d[t];
          if (l != null) {
            const h = D({
              value: l,
              inputRange: [0, 100],
              outputRange: [e * Math.PI, s * Math.PI],
            });
            a.style.strokeDashoffset = `${h}`;
          }
        });
        o(this, "render", () => {
          const {
            xoSize: t,
            xoStrokeWidth: e,
            xoTrackColor: s,
            xoThumbColor: n,
            xoStrokeLinecap: a,
            xoFill: l,
          } = this.getOptions();
          return `
      <svg width="${t}" height="${t}" viewport="0 0 ${t} ${t}" version="1.1" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle">
        <circle
          fill="${l}"
          stroke-width="${e}"
          r="${(t - e) / 2}"
          cx="${t / 2}"
          cy="${t / 2}"
          stroke="${s}"
        >
        </circle>
        <circle
          class="circle-bar-thumb"
          stroke-width="${e}"
          r="${(t - e) / 2}"
          cx="${t / 2}"
          cy="${t / 2}"
          stroke="${n}"
          stroke-linecap="${a}"
          stroke-dashoffset="${t * Math.PI}"
          stroke-dasharray="${t * Math.PI}"
          fill="transparent"
          transform="rotate(-90)"
          transform-origin="50% 50%"
        >
        </circle>
      </svg>
    `;
        });
      }
      static get observedAttributes() {
        return ["xo-observed"];
      }
      connectedCallback() {
        const t = this.getOptions();
        (this.innerHTML = this.render()),
          (this.style.display = "block"),
          t.xoAnimateOnScroll && _i.observe(this),
          (this.unsubscribe = g.subscribe("xo-circle-bar", this.listener));
      }
      async attributeChangedCallback(t, e, s) {
        t === "xo-observed" &&
          e !== s &&
          (await T(100), this.disconnectedCallback(), this.connectedCallback());
      }
      disconnectedCallback() {
        var t;
        (t = this.unsubscribe) == null || t.call(this), _i.unobserve(this);
      }
    };
  let we = Co;
  o(we, "defaultOptions", {
    xoName: null,
    xoFill: "transparent",
    xoSize: 100,
    xoStrokeWidth: 2,
    xoTrackColor: "#ebebeb",
    xoThumbColor: "#ea5b5b",
    xoStrokeLinecap: "round",
    xoAnimateOnScroll: !1,
    xoEasing: "ease",
    xoValue: 0,
    xoDuration: 1e3,
  }),
    g.create("xo-circle-bar", { initialState: {} }),
    (window.xoCircleBar = Ee),
    _({ [c.CircleBar]: we });
  const le = new xe(),
    ei = class {
      constructor() {
        o(this, "placements", [
          "top-left",
          "top-center",
          "top-right",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ]);
        o(this, "frames", {});
        o(this, "elements", {});
        o(this, "getOptions", (i) =>
          typeof i == "string"
            ? { ...ei.defaultOptions, content: i }
            : { ...ei.defaultOptions, ...i }
        );
        o(this, "handleFrame", (i) => {
          var e;
          const t = this.elements[i];
          (t == null ? void 0 : t.innerHTML.trim()) === "" &&
            (t.removeAttribute("popover"),
            be(t),
            (e = this.frames[i]) == null || e.remove(this.handleFrames[i]),
            t.remove());
        });
        o(this, "handleFrames", {
          "top-left": () => {
            this.handleFrame("top-left");
          },
          "top-center": () => {
            this.handleFrame("top-center");
          },
          "top-right": () => {
            this.handleFrame("top-right");
          },
          "bottom-left": () => {
            this.handleFrame("bottom-left");
          },
          "bottom-center": () => {
            this.handleFrame("bottom-center");
          },
          "bottom-right": () => {
            this.handleFrame("bottom-right");
          },
        });
        o(this, "createToastRoot", (i) => {
          (this.elements[i] = document.querySelector(
            `${c.ToastPortal}[xo-placement="${i}"]`
          )),
            this.elements[i] ||
              ((this.elements[i] = document.createElement(c.ToastPortal)),
              this.elements[i].setAttribute("xo-placement", i),
              this.elements[i].setAttribute("popover", "true"),
              document.body.appendChild(this.elements[i]),
              Qe(this.elements[i]),
              (this.frames[i] = K.add(this.handleFrames[i], !0)));
        });
        o(this, "push", (i) => {
          const t = this.getOptions(i);
          for (const e of this.placements) this.createToastRoot(e);
          le.emit("toast:push", t);
        });
        o(this, "remove", (i) => {
          le.emit("toast:remove", i);
        });
      }
    };
  let ls = ei;
  o(ls, "defaultOptions", {
    name: "",
    content: "",
    duration: 200,
    delay: 2e3,
    className: "",
    style: {},
    placement: "bottom-center",
    easing: "decay",
    closeButtonDisabled: !1,
    closeButtonClassName: "",
    closeButtonPlacement: "top-right",
    onShow() {},
    onHide() {},
  });
  const Wi = new ls();
  function Fl(r) {
    return Wi.push(r);
  }
  const Ce = Object.assign(Fl, { push: Wi.push, remove: Wi.remove });
  class Rl extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "offId", -1);
      o(
        this,
        "renderCloseButton",
        (t) => `
      <${c.ToastCloseButton} class="${t.closeButtonClassName}" xo-placement="${t.closeButtonPlacement}"><svg viewBox="0 0 20 20" focusable="false" aria-hidden="true"><path d="M6.707 5.293a1 1 0 0 0-1.414 1.414l3.293 3.293-3.293 3.293a1 1 0 1 0 1.414 1.414l3.293-3.293 3.293 3.293a1 1 0 0 0 1.414-1.414l-3.293-3.293 3.293-3.293a1 1 0 0 0-1.414-1.414l-3.293 3.293-3.293-3.293Z"></path></svg></${c.ToastCloseButton}>
    `
      );
      o(this, "listener", async (t) => {
        if (t.name) {
          await T();
          const e = document.querySelector(`${c.Toast}[xo-name="${t.name}"]`);
          if (e && e.parentNode !== this) {
            const s = M(e, {
                pick: [
                  "xoDuration",
                  "xoClassName",
                  "xoDelay",
                  "xoEasing",
                  "xoPlacement",
                  "xoCloseButtonClassName",
                  "xoCloseButtonDisabled",
                  "xoCloseButtonPlacement",
                ],
                types: {
                  xoDuration: "number",
                  xoClassName: "string",
                  xoDelay: "number",
                  xoEasing: "string",
                  xoPlacement: "string",
                  xoCloseButtonClassName: "string",
                  xoCloseButtonDisabled: "boolean",
                  xoCloseButtonPlacement: "string",
                },
                propTransformer: (d) => Zt.pascalToCamel(d.replace(/^xo/, "")),
              }),
              n = { ...t, ...s },
              l = Array.from(
                this.querySelectorAll(`${c.Toast}[xo-name="${t.name}"]`)
              ).some((d) => {
                var h;
                return ((h = d.message) == null ? void 0 : h.name) === n.name;
              });
            if (n.placement === this.getAttribute("xo-placement") && !l) {
              !n.closeButtonDisabled &&
                !e.querySelector(c.ToastCloseButton) &&
                e.insertAdjacentHTML("beforeend", this.renderCloseButton(n));
              const d = e == null ? void 0 : e.cloneNode(!0);
              (e.message = n),
                (d.message = n),
                x.set(d, "xo-cloned", !0),
                n.placement.includes("top-")
                  ? this.insertAdjacentElement("beforeend", d)
                  : this.insertAdjacentElement("afterbegin", d);
            }
          }
        } else if (t.placement === this.getAttribute("xo-placement")) {
          const e = document.createElement(c.Toast);
          t.closeButtonDisabled
            ? (e.innerHTML = t.content)
            : (e.innerHTML = t.content + this.renderCloseButton(t)),
            (e.message = t),
            t.placement.includes("top-")
              ? this.insertAdjacentElement("beforeend", e)
              : this.insertAdjacentElement("afterbegin", e);
        }
      });
    }
    connectedCallback() {
      this.offId = le.on("toast:push", this.listener);
    }
    disconnectedCallback() {
      le.off(this.offId);
    }
  }
  const Nn = 20;
  class ql extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "timeId", -1);
      o(this, "animatedIn", W());
      o(this, "animatedOut", W());
      o(this, "message", null);
      o(this, "prevTimestamp", null);
      o(this, "delayFromMouseEnter", 0);
      o(this, "closeEl", null);
      o(this, "unmounted", !1);
      o(this, "offId", -1);
      o(this, "initialized", !1);
      o(this, "cleanup", () => {
        const t = this.getAttribute("xo-name"),
          e = Array.from(
            document.querySelectorAll(`${c.Toast}[xo-name="${t}"]`)
          );
        v(e, (s) => {
          s.remove();
        });
      });
      o(this, "destroy", () => {
        clearTimeout(this.timeId),
          this.animatedIn.off(),
          this.animatedOut.off(),
          this.removeEventListener("mouseenter", this.handleMouseEnter),
          this.removeEventListener("mouseleave", this.handleMouseLeave),
          this.closeEl &&
            this.closeEl.removeEventListener("click", this.handleCloseClick),
          le.off(this.offId);
      });
      o(this, "getHeight", () => {
        var l, d;
        const { placement: t } = this.message,
          { marginTop: e, marginBottom: s } = window.getComputedStyle(this),
          n = (l = parseInt(e)) != null ? l : 0,
          a = (d = parseInt(s)) != null ? d : 0;
        return t.includes("top-")
          ? this.offsetHeight + a
          : this.offsetHeight + n;
      });
      o(this, "getValueY", (t) => {
        const { placement: e } = this.message;
        return (e.includes("top-") ? -1 : 1) * (t + Nn);
      });
      o(this, "handleMouseEnter", () => {
        (this.delayFromMouseEnter = Math.max(
          0,
          this.delayFromMouseEnter - (Date.now() - this.prevTimestamp)
        )),
          clearTimeout(this.timeId);
      });
      o(this, "handleMouseLeave", () => {
        this.delayFromMouseEnter !== 1 / 0 &&
          (this.timeId = window.setTimeout(() => {
            this.unmount();
          }, this.delayFromMouseEnter)),
          (this.prevTimestamp = Date.now());
      });
      o(this, "handleCloseClick", () => {
        this.unmount();
      });
      o(this, "setStyles", () => {
        var n, a;
        const { closeButtonPlacement: t } = this.message,
          { className: e, style: s } = this.message;
        if (
          (e && (this.className = e),
          Object.assign(this.style, s),
          this.closeEl)
        ) {
          const l =
            this.closeEl.offsetWidth +
            ((n = parseInt(
              window.getComputedStyle(this.closeEl).marginRight
            )) != null
              ? n
              : 0) +
            ((a = parseInt(window.getComputedStyle(this.closeEl).marginLeft)) !=
            null
              ? a
              : 0);
          t.includes("left")
            ? (this.style.paddingLeft = `${l}px`)
            : (this.style.paddingRight = `${l}px`);
        }
      });
      o(this, "setCssVariables", () => {
        for (const t in this.message) {
          const e = this.message[t];
          e != null &&
            !/onShow|onHide|className|closeButtonClassName|style|content/g.test(
              t
            ) &&
            this.style.setProperty(
              `--xo-${Zt.camelToKebab(t)}`,
              ` ${JSON.stringify(e)}`
            );
        }
      });
      o(this, "mount", () => {
        const { duration: t, onShow: e, easing: s } = this.message,
          n = this.getHeight(),
          a = this.getValueY(n);
        (this.closeEl = this.querySelector(c.ToastCloseButton)),
          (this.prevTimestamp = Date.now()),
          e(this),
          this.setStyles(),
          this.setCssVariables(),
          this.closeEl &&
            this.closeEl.addEventListener("click", this.handleCloseClick),
          this.addEventListener("mouseenter", this.handleMouseEnter),
          this.addEventListener("mouseleave", this.handleMouseLeave),
          this.animatedIn({
            from: a,
            to: 0,
            duration: t,
            easing: R[s],
            onUpdate: (l) => {
              this.style.transform = `translateY(${l}px)`;
            },
          }),
          (this.unmounted = !1);
      });
      o(this, "unmount", () => {
        const {
            duration: t,
            placement: e,
            onHide: s,
            easing: n,
            name: a,
          } = this.message,
          l = this.getHeight();
        this.unmounted ||
          ((this.unmounted = !0),
          (this.style.pointerEvents = "none"),
          this.animatedOut({
            from: 0,
            to: 1,
            duration: t,
            onUpdate: (d) => {
              const h = D({
                  value: d,
                  inputRange: [0, 1],
                  outputRange: [0, -l],
                  easing: R[n],
                }),
                u = D({
                  value: d,
                  inputRange: [0, 1],
                  outputRange: [0, Nn],
                  easing: R[n],
                });
              e.includes("top-")
                ? ((this.style.marginTop = `${h}px`),
                  (this.style.transform = `translateY(-${u}px)`))
                : ((this.style.marginBottom = `${h}px`),
                  (this.style.transform = `translateY(${u}px)`));
            },
            onEnd: () => {
              this.style.removeProperty("pointer-events"),
                a
                  ? (this.destroy(),
                    this.closest(c.ToastPortal) && this.remove())
                  : this.remove(),
                s(this);
            },
          }));
      });
    }
    connectedCallback() {
      if (!!this.closest(c.ToastPortal) && this.message) {
        const { delay: e } = this.message;
        (this.initialized = !0),
          (this.delayFromMouseEnter = e),
          this.mount(),
          e !== 1 / 0 &&
            (this.timeId = window.setTimeout(() => {
              this.unmount();
            }, e)),
          (this.offId = le.on("toast:remove", () => {
            this.unmount();
          }));
      }
    }
    disconnectedCallback() {
      if (!x.get(this, "xo-cloned")) {
        this.cleanup();
        return;
      }
      this.initialized && (this.destroy(), this.unmount());
    }
  }
  const Ku = "";
  (window.xoToast = Ce), _({ [c.ToastPortal]: Rl, [c.Toast]: ql });
  const ce = new Dt("xo-popover"),
    On = {
      none: it.none,
      zoom: it.zoom(!0),
      fade: it.move(),
      "fade-up": it.move({ dy: 50 }),
      "fade-down": it.move({ dy: -50 }),
      "fade-left": it.move({ dx: 50 }),
      "fade-right": it.move({ dx: -50 }),
    };
  function Ui(r) {
    const i = r.closest(c.Modal),
      t = r.closest(c.Sticky);
    return typeof HTMLDialogElement == "function" && !i && !t;
  }
  const So = class extends zi {
    constructor() {
      super(...arguments);
      o(this, "animated", W());
      o(this, "canClose", !1);
      o(this, "_options");
      o(this, "setOptions", () => {
        var s;
        const t = M(this, {
            pick: [
              "xoName",
              "xoAnimate",
              "xoEasing",
              "xoDuration",
              "xoPlacement",
              "xoPortal",
              "xoDisabled",
              "xoBreakpoints",
              "xoAutofocus",
              "xoSectionSelect",
              "xoModalScrollSelector",
              "xoOffset",
            ],
            types: {
              xoName: "string",
              xoAnimate: "string",
              xoEasing: "string",
              xoDuration: "number",
              xoPlacement: "string",
              xoPortal: "boolean",
              xoDisabled: "boolean",
              xoBreakpoints: "object",
              xoAutofocus: "boolean",
              xoSectionSelect: "boolean",
              xoModalScrollSelector: "string",
              xoOffset: "number",
            },
          }),
          e = qt((s = t.xoBreakpoints) != null ? s : {});
        this.options = JSON.parse(
          JSON.stringify({
            ...t,
            xoDisabled:
              (e == null ? void 0 : e.disabled) != null
                ? e.disabled
                : t.xoDisabled,
            xoDuration:
              (e == null ? void 0 : e.duration) != null
                ? e.duration
                : t.xoDuration,
            xoEasing:
              (e == null ? void 0 : e.easing) != null ? e.easing : t.xoEasing,
            xoAnimate:
              (e == null ? void 0 : e.animate) != null
                ? e.animate
                : t.xoAnimate,
            xoPlacement:
              (e == null ? void 0 : e.placement) != null
                ? e.placement
                : t.xoPlacement,
            xoOffset:
              (e == null ? void 0 : e.offset) != null ? e.offset : t.xoOffset,
          })
        );
      });
      o(this, "handleCalTopLeft", () => {
        var a, l;
        const {
            xoPlacement: t,
            xoOffset: e,
            xoModalScrollSelector: s,
          } = this.options,
          { triggerElement: n } = this.state;
        if (n) {
          const d = un(n, { placement: t, offset: e, element: this }),
            h = this.closest(c.Modal),
            u = this.closest(`${c.Sticky}:not([xo-disabled])`);
          if (h) {
            const p =
                (a = h.shadowRoot) == null
                  ? void 0
                  : a.querySelector(c.ModalContent),
              f = (s ? h.querySelector(s) : null) || p,
              { left: b, top: y } = Y(f),
              { x: E, y: C } = this.getValueWithBoundary(d.left - b, d.top - y);
            (this.style.top = `${C}px`), (this.style.left = `${E}px`);
          } else if (u) {
            const p =
                (l = u.shadowRoot) == null
                  ? void 0
                  : l.querySelector(c.StickyContent),
              { left: m, top: f } = Y(p),
              { x: b, y } = this.getValueWithBoundary(d.left - m, d.top - f);
            (this.style.top = `${y}px`), (this.style.left = `${b}px`);
          } else {
            const { x: p, y: m } = this.getValueWithBoundary(
              d.left,
              d.top - window.scrollY
            );
            (this.style.top = `${m}px`), (this.style.left = `${p}px`);
          }
          this.style.setProperty(
            "--xo-popover-trigger-width",
            `${n.offsetWidth}px`
          );
        }
      });
      o(this, "handleScroll", () => {
        this.handleCalTopLeft();
      });
      o(this, "subscribe", () => {
        const { xoDuration: t, xoDisabled: e } = this.options,
          { triggerElement: s, isOpen: n } = this.state;
        e ||
          (this.handleCalTopLeft(),
          s && this.animated({ from: n ? 0 : 1, to: n ? 1 : 0, duration: t }));
      });
      o(this, "handleClose", () => {
        const { xoDuration: t, xoName: e } = this.options;
        this.animated({ from: 1, to: 0, duration: t }),
          e && ce.close(e, "empty");
      });
      o(this, "handleOutsideClick", (t) => {
        const { xoDisabled: e } = this.options,
          { isOpen: s, triggerElement: n } = this.state,
          a = t.target;
        this.canClose &&
          s &&
          !e &&
          !this.contains(a) &&
          !(n != null && n.contains(a)) &&
          this.handleClose();
      });
      o(this, "resetStyles", () => {
        const { xoDisabled: t } = this.options;
        t &&
          (this.style.removeProperty("top"),
          this.style.removeProperty("left"),
          this.style.removeProperty("opacity"),
          this.style.removeProperty("visibility"),
          this.style.removeProperty("transform"));
      });
      o(
        this,
        "handleResize",
        rt(() => {
          this.setOptions(),
            this.resetStyles(),
            this.handleCalTopLeft(),
            this.componentUnmount(),
            this.componentMount();
        }, 500)
      );
      o(this, "setCurrentDisabled", () => {
        const { xoDisabled: t } = this.options;
        x.set(this, "xo-current-disabled", t);
      });
      o(this, "componentOpen", () => {
        const { xoPortal: t } = this.options;
        t && Ui(this) && Qe(this);
      });
      o(this, "componentClose", () => {
        const { xoDuration: t } = this.options;
        this.animated.getValue() > 0 &&
          this.animated.getValue() < 1 &&
          (this.animated({ from: 1, to: 0, duration: t }),
          this.style.removeProperty("pointer-events"));
      });
      o(this, "componentBeforeMount", () => {
        this.setOptions();
      });
      o(this, "componentMount", async () => {
        const {
          xoName: t,
          xoAnimate: e,
          xoEasing: s,
          xoPortal: n,
          xoBreakpoints: a,
          xoModalScrollSelector: l,
        } = this.options;
        G(this.componentName, "xo-name", t),
          n && Ui(this) && this.setAttribute("popover", t),
          this.setCurrentDisabled(),
          this.setCssVariables(),
          a &&
            v(bt(a).sort(), (u) => {
              const p = a[u];
              this.setCssVariables(Number(u), p);
            });
        const d = this.closest(c.Modal),
          h = this.closest(c.Sticky);
        d || h
          ? (this.style.position = "absolute")
          : (this.style.position = "fixed"),
          document.addEventListener("click", this.handleOutsideClick),
          this.animated.onUpdate((u) => {
            const { isOpen: p } = this.state;
            (p ? u === 1 : u === 0)
              ? this.style.removeProperty("pointer-events")
              : (this.style.pointerEvents = "none"),
              On[e] && On[e](this, { isOpen: p, easing: R[s], value: u }),
              (this.canClose = u === 1);
          }),
          this.animated.onEnd(() => {
            const { isOpen: u } = this.state;
            !u && n && Ui(this) && be(this);
          }),
          window.addEventListener("resize", this.handleResize),
          d
            ? ((l && d.querySelector(l)) || window).addEventListener(
                "scroll",
                this.handleScroll
              )
            : window.addEventListener("scroll", this.handleScroll);
      });
      o(this, "componentUnmount", () => {
        const { xoModalScrollSelector: t } = this.options;
        this.animated.off(),
          document.removeEventListener("click", this.handleOutsideClick),
          window.removeEventListener("resize", this.handleResize);
        const e = this.closest(c.Modal);
        e
          ? ((t && e.querySelector(t)) || window).removeEventListener(
              "scroll",
              this.handleScroll
            )
          : window.removeEventListener("scroll", this.handleScroll);
      });
    }
    static get observedAttributes() {
      return ["xo-placement", "xo-offset", "xo-breakpoints"];
    }
    get stateName() {
      return "xo-popover";
    }
    get componentName() {
      return c.Popover;
    }
    get options() {
      return { ...So.defaultOptions, ...this._options };
    }
    set options(t) {
      this._options = t;
    }
    getValueWithBoundary(t, e) {
      const s = this.closest("[xo-popover-boundary]");
      if (s) {
        const { left: n, top: a } = s.getBoundingClientRect();
        return {
          x: Z(t, n, n + s.offsetWidth - this.offsetWidth),
          y: Z(e, a, a + s.offsetHeight - this.offsetHeight),
        };
      }
      return { x: t, y: e };
    }
    async attributeChangedCallback(t, e, s) {
      e !== s &&
        (await T(100),
        this.setOptions(),
        this.resetStyles(),
        this.handleCalTopLeft());
    }
  };
  let cs = So;
  o(cs, "defaultOptions", {
    xoName: null,
    xoAnimate: "fade-up",
    xoEasing: "decay",
    xoDuration: 300,
    xoPlacement: "bottom-center",
    xoPortal: !1,
    xoOffset: 10,
    xoDisabled: !1,
    xoBreakpoints: {},
    xoAutofocus: !1,
  });
  const si = class extends ve {
    constructor() {
      super(...arguments);
      o(this, "componentTrigger", () => {
        const { xoName: t, xoType: e } = this.options,
          { isOpen: s } = this.state;
        G(this.componentName, "xo-name", t),
          this.setState((n) => ({
            ...n,
            [t]: {
              ...n[t],
              triggerElement: s ? this : n[t].triggerElement,
              eventType: e,
            },
          }))(`${this.componentName}/setTriggerElement`);
      });
    }
    get stateName() {
      return "xo-popover";
    }
    get componentName() {
      return c.PopoverTrigger;
    }
    get eventType() {
      return this.options.xoType;
    }
    get actionType() {
      return "toggle";
    }
    get options() {
      const t = M(this, {
          pick: ["xoName", "xoType"],
          types: { xoName: "string", xoType: "string" },
        }),
        e = this.closest("[xo-name]");
      if (e) {
        const s = M(e, { pick: ["xoName"], types: { xoName: "string" } });
        return { ...si.defaultOptions, ...s, ...t };
      }
      return { ...si.defaultOptions, ...t };
    }
  };
  let ds = si;
  o(ds, "defaultOptions", { xoName: null, xoType: "click" }),
    g.create("xo-popover", { initialState: { trigger: {}, data: {} } });
  const Ju = "";
  function X(r, i, t, e) {
    var s = arguments.length,
      n =
        s < 3
          ? i
          : e === null
          ? (e = Object.getOwnPropertyDescriptor(i, t))
          : e,
      a;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
      n = Reflect.decorate(r, i, t, e);
    else
      for (var l = r.length - 1; l >= 0; l--)
        (a = r[l]) && (n = (s < 3 ? a(n) : s > 3 ? a(i, t, n) : a(i, t)) || n);
    return s > 3 && n && Object.defineProperty(i, t, n), n;
  }
  function Fn(r, i) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
      return Reflect.metadata(r, i);
  }
  typeof SuppressedError == "function" && SuppressedError;
  let Rn =
    ((Fe = class extends q {
      constructor() {
        super();
        o(this, "handleToggle", (t) => {
          t.target.closest(c.BuilderPopoverContent) ||
            this.setState({ isOpen: !this.state.isOpen });
        });
        o(this, "handleDocumentClick", (t) => {
          const e = t.target;
          this.contains(e) || this.setState({ isOpen: !1 });
        });
        o(this, "bindEvent", () => {
          const { xoType: t } = this.props;
          t === "click" &&
            (this.addEventListener("click", this.handleToggle),
            document.addEventListener("click", this.handleDocumentClick));
        });
        o(this, "addCssVars", () => {
          const { xoDuration: t } = this.props;
          this.style.setProperty("--xo-popover-duration", `${t}ms`);
        });
        this.state = { isOpen: !1 };
      }
      mount() {
        this.addCssVars(), this.bindEvent();
      }
      unmount() {
        this.removeEventListener("click", this.handleToggle);
      }
      stateUpdate(t) {
        if (t.isOpen !== this.state.isOpen) {
          const e = this.querySelector(c.BuilderPopoverContent);
          x.set(this, "xo-open", this.state.isOpen),
            e && x.set(e, "xo-open", this.state.isOpen);
        }
      }
      propUpdate({ name: t, prevProp: e, nextProp: s }) {
        t === "xoDuration" && e !== s && this.addCssVars(),
          t === "xoType" &&
            e !== s &&
            (this.removeEventListener("click", this.handleToggle),
            this.bindEvent());
      }
    }),
    o(Fe, "propTypes", {
      xoAnimate: "string",
      xoDuration: "number",
      xoPlacement: "string",
      xoType: "string",
    }),
    o(Fe, "defaultProps", {
      xoType: "click",
      xoPlacement: "bottom-center",
      xoAnimate: "fade-up",
      xoDuration: 300,
    }),
    o(Fe, "observedProps", ["xoType", "xoDuration"]),
    Fe);
  Rn = X([U(c.BuilderPopover), Fn("design:paramtypes", [])], Rn);
  const tp = "";
  (window.xoPopover = ce), _({ [c.Popover]: cs, [c.PopoverTrigger]: ds });
  const Po = class extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "contentEl", null);
      o(this, "_options");
      o(this, "intervalId", -1);
      o(this, "setOptions", () => {
        this.options = M(this, {
          pick: [
            "xoTitle",
            "xoAnimate",
            "xoDuration",
            "xoPlacement",
            "xoPortalClass",
          ],
          types: {
            xoTitle: "string",
            xoAnimate: "string",
            xoDuration: "number",
            xoPlacement: "string",
            xoPortalClass: "string",
          },
        });
      });
      o(this, "handleShow", async () => {
        var m;
        window.removeEventListener("scroll", this.handleHide, !1),
          window.addEventListener("scroll", this.handleHide, !1);
        const t =
          (m = this.closest(`${c.Popover}, ${c.Modal}`)) != null
            ? m
            : document.body;
        this.contentEl ||
          ((this.contentEl = this.createPortal()),
          t.appendChild(this.contentEl));
        const {
          xoPlacement: e,
          xoAnimate: s,
          xoDuration: n,
          xoOffset: a,
          xoTitle: l,
          xoPortalClass: d,
        } = this.options;
        (this.contentEl.innerHTML = l),
          this.contentEl.style.removeProperty("transition-duration"),
          this.contentEl.setAttribute("xo-placement", e),
          this.contentEl.setAttribute("xo-animate", s),
          d && this.contentEl.classList.add(d),
          t.tagName.toLowerCase() === c.Modal &&
            this.contentEl.setAttribute(
              "slot",
              `${t.getAttribute("xo-name")}-inner`
            );
        const h = un(this, {
          placement: e,
          offset: a,
          element: this.contentEl,
        });
        let u = `${h.top}px`,
          p = `${h.left}px`;
        if ([c.Modal, c.Popover].includes(t.tagName.toLowerCase()))
          if (t.tagName.toLowerCase() === c.Modal) {
            const f = t.getShadow().querySelector(c.ModalContent),
              { left: b, top: y } = Y(f);
            (u = `${h.top - y}px`), (p = `${h.left - b}px`);
          } else {
            const { left: f, top: b } = Y(t);
            (u = `${h.top - b}px`), (p = `${h.left - f}px`);
          }
        this.contentEl.style.top !== u && (this.contentEl.style.top = u),
          this.contentEl.style.left !== p && (this.contentEl.style.left = p),
          await T(0),
          (this.contentEl.style.transitionDuration = `${s ? n : 0}ms`),
          x.set(this.contentEl, "xo-active", !0),
          (this.intervalId = window.setInterval(() => {
            window.getComputedStyle(this).display === "none" &&
              (this.handleHide(), clearInterval(this.intervalId));
          }, 1e3));
      });
      o(this, "handleHide", async () => {
        this.contentEl &&
          (x.set(this.contentEl, "xo-active", !1),
          clearInterval(this.intervalId));
      });
      o(this, "handleTooltip", (t) => {
        this.contains(t.target) || this.handleHide();
      });
      o(this, "createPortal", () => document.createElement(c.TooltipContent));
    }
    get options() {
      return { ...Po.defaultOptions, ...this._options };
    }
    set options(t) {
      this._options = t;
    }
    connectedCallback() {
      this.setOptions(),
        this.addEventListener("mouseenter", this.handleShow, !1),
        window.addEventListener("mousemove", this.handleTooltip, !1);
    }
    disconnectedCallback() {
      var t;
      (t = this.contentEl) == null || t.remove(),
        clearInterval(this.intervalId),
        window.removeEventListener("mousemove", this.handleTooltip, !1),
        window.removeEventListener("scroll", this.handleHide, !1),
        this.removeEventListener("mouseenter", this.handleShow, !1);
    }
  };
  let hs = Po;
  o(hs, "defaultOptions", {
    xoTitle: "",
    xoAnimate: "fade-down",
    xoDuration: 400,
    xoPlacement: "top-center",
    xoPortalClass: "",
    xoOffset: 10,
  });
  const ep = "";
  _({ [c.Tooltip]: hs });
  class Hl {
    constructor() {
      o(this, "stateName", "xo-collapse");
      o(this, "toggle", (i) => {
        g.set(this.stateName, (t) => ({
          ...t,
          [i]: { ...t[i], isOpen: !t[i].isOpen },
        }))(`${this.stateName}/toggle`);
      });
      o(this, "open", (i) => {
        g.set(this.stateName, (t) => ({ ...t, [i]: { ...t[i], isOpen: !0 } }))(
          `${this.stateName}/open`
        );
      });
      o(this, "close", (i) => {
        g.set(this.stateName, (t) => ({ ...t, [i]: { ...t[i], isOpen: !1 } }))(
          `${this.stateName}/close`
        );
      });
    }
  }
  const Se = new Hl();
  function Pe(r) {
    return r && r.tagName.toLowerCase() === c.CollapseProvider;
  }
  function Vl(r) {
    return r && r.tagName.toLowerCase() === c.CollapseTrigger;
  }
  const Re = class extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "animated", W());
      o(this, "unsubscribe", null);
      o(this, "frameId", -1);
      o(this, "clear", () => {});
      o(this, "initialized", !1);
      o(this, "prevIsOpen", !1);
      o(this, "_options");
      o(this, "componentOpen", () => {
        const { xoDuration: t, xoEasing: e } = this.options,
          s = this.scrollHeight;
        this.animated({
          from: 0,
          to: s,
          duration: t,
          easing: R[e],
          onUpdate: (n) => {
            s === 0
              ? (this.style.height = "auto")
              : (this.style.height = `${n}px`);
          },
          onEnd: () => {
            this.style.height = "auto";
          },
        });
      });
      o(this, "componentClose", () => {
        const { xoDuration: t, xoEasing: e } = this.options,
          s = this.scrollHeight;
        this.animated({
          from: s,
          to: 0,
          duration: t,
          easing: R[e],
          onUpdate: (n) => {
            this.style.height = `${n}px`;
          },
        });
      });
      o(this, "listener", (t) => {
        const { xoName: e } = this.options;
        if ((G(this.componentName, "xo-name", e), t[e])) {
          const { isOpen: s } = t[e];
          this.initialized &&
            s !== this.prevIsOpen &&
            (s
              ? (x.set(this, "xo-active", !0), this.componentOpen())
              : (x.set(this, "xo-active", !1), this.componentClose()),
            (this.prevIsOpen = s));
        }
      });
      o(this, "setOptions", () => {
        const t = M(this, {
          pick: ["xoName", "xoDuration", "xoEasing"],
          types: { xoName: "string", xoDuration: "number", xoEasing: "string" },
        });
        if (Pe(this.providerElement) && Vl(this.triggerElement)) {
          const e = {
            xoName: this.triggerElement.xoNameProp,
            xoDuration: Number(
              this.providerElement.getAttribute("xo-duration") || 300
            ),
          };
          this.options = { ...Re.defaultOptions, ...e, ...t };
        } else this.options = { ...Re.defaultOptions, ...t };
      });
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    get componentName() {
      return c.Collapse;
    }
    get options() {
      return { ...Re.defaultOptions, ...this._options };
    }
    set options(t) {
      this._options = t;
    }
    get providerElement() {
      return this.closest(c.CollapseProvider);
    }
    get triggerElement() {
      return this.previousElementSibling;
    }
    async connectedCallback() {
      this.setOptions();
      const { xoName: t } = this.options;
      G(this.componentName, "xo-name", t),
        (this.initialized = !0),
        { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }
          .VITE_BUILD_MODE === "xoSections"
          ? ((this.clear = await T(200)),
            x.get(this, "xo-active") && Se.open(t))
          : x.get(this, "xo-active") && (await T(), Se.open(t)),
        (this.unsubscribe = g.subscribe("xo-collapse", this.listener));
    }
    attributeChangedCallback(t, e, s) {
      if (t === "xo-observed" && e !== s) {
        this.setOptions();
        const n = x.get(this, "xo-active");
        n ? (this.style.height = "auto") : this.style.removeProperty("height");
        const { xoName: a } = this.options;
        G(this.componentName, "xo-name", a),
          g.set("xo-collapse", (l) => ({
            ...l,
            [a]: { ...(l == null ? void 0 : l[a]), isOpen: n },
          }));
      }
    }
    disconnectedCallback() {
      var t;
      this.animated.off(),
        (t = this.unsubscribe) == null || t.call(this),
        this.clear(),
        cancelAnimationFrame(this.frameId);
    }
  };
  let us = Re;
  o(us, "defaultOptions", { xoName: null, xoDuration: 300, xoEasing: "decay" });
  let qn = 0;
  const qe = class extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "xoNameProp", "");
      o(this, "_options");
      o(this, "handleCollapseHasProvider", () => {
        const { xoName: t } = this.options;
        Pe(this.providerElement) || G(this.componentName, "xo-name", t);
        const e = Array.from(
          this.providerElement.querySelectorAll(c.CollapseTrigger)
        );
        v(e, (s) => {
          const n = s.getAttribute("xo-name") || s.xoNameProp;
          this !== s || this.hasAttribute("xo-active")
            ? x.set(s, "xo-active", !1)
            : x.set(s, "xo-active", !0),
            n &&
              g.set("xo-collapse", (a) => {
                var l;
                return {
                  ...a,
                  [n]: {
                    ...(a == null ? void 0 : a[n]),
                    isOpen:
                      this === s
                        ? !((l = a == null ? void 0 : a[n]) != null && l.isOpen)
                        : !1,
                  },
                };
              });
        });
      });
      o(this, "handleCollapse", () => {
        const { xoName: t } = this.options;
        Pe(this.providerElement) || G(this.componentName, "xo-name", t),
          x.get(this, "xo-active")
            ? x.set(this, "xo-active", !1)
            : x.set(this, "xo-active", !0),
          Se.toggle(t);
      });
      o(this, "handleClick", () => {
        var a, l;
        const { xoName: t } = this.options,
          s =
            Number(
              (a = this.providerElement) == null
                ? void 0
                : a.getAttribute("xo-duration")
            ) ||
            Number(
              (l = document.querySelector(`${c.Collapse}[xo-name="${t}"]`)) ==
                null
                ? void 0
                : l.getAttribute("xo-duration")
            ) ||
            300,
          n = Date.now();
        n - qn < s ||
          ((qn = n),
          Pe(this.providerElement)
            ? this.handleCollapseHasProvider()
            : this.handleCollapse());
      });
    }
    get componentName() {
      return c.CollapseTrigger;
    }
    get options() {
      return { ...qe.defaultOptions, ...this._options };
    }
    set options(t) {
      this._options = t;
    }
    setOptions() {
      const t = M(this, { pick: ["xoName"], types: { xoName: "string" } });
      if (Pe(this.providerElement)) {
        const e = Array.from(
            this.providerElement.querySelectorAll(c.CollapseTrigger)
          ).indexOf(this),
          s = { xoName: `${this.providerElement.xoName}-${e}` };
        this.options = { ...qe.defaultOptions, ...s, ...t };
      } else this.options = { ...qe.defaultOptions, ...t };
    }
    get providerElement() {
      return this.closest(c.CollapseProvider);
    }
    connectedCallback() {
      var e;
      if ((this.setOptions(), (e = this.providerElement) != null && e.xoName)) {
        const s = Array.from(
          this.providerElement.querySelectorAll(c.CollapseTrigger)
        ).indexOf(this);
        this.xoNameProp = `${this.providerElement.xoName}-${s}`;
      }
      const { xoName: t } = this.options;
      G(this.componentName, "xo-name", t),
        g.set("xo-collapse", (s) => {
          var n, a;
          return {
            ...s,
            [t]: {
              ...(s == null ? void 0 : s[t]),
              isOpen:
                (a =
                  (n = s == null ? void 0 : s[t]) == null
                    ? void 0
                    : n.isOpen) != null
                  ? a
                  : !1,
            },
          };
        }),
        this.addEventListener("click", this.handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleClick);
    }
  };
  let ps = qe;
  o(ps, "defaultOptions", { xoName: null });
  let Hn = 0;
  class Bl extends HTMLElement {
    constructor() {
      super();
      o(this, "xoName");
      Hn++, (this.xoName = `collapse-${Hn}`);
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    attributeChangedCallback(t, e, s) {
      if (t === "xo-observed" && e !== s) {
        const n = Array.from(this.querySelectorAll(c.CollapseTrigger)),
          a = Array.from(this.querySelectorAll(c.Collapse));
        v([...n, ...a], (l) => {
          l.setAttribute("xo-observed", s);
        });
      }
    }
  }
  g.create("xo-collapse", { initialState: {} });
  const sp = "";
  (window.xoCollapse = Se),
    _({ [c.CollapseProvider]: Bl, [c.CollapseTrigger]: ps, [c.Collapse]: us });
  function Vn(r) {
    return r && r.tagName.toLowerCase() === c.Tabs;
  }
  const Ao = class extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", null);
      o(this, "listener", (t) => {
        const { xoName: e } = this.options;
        if (
          (G(this.componentName, "xo-name", e), t[this.providerElement.xoName])
        ) {
          const { name: s } = t[this.providerElement.xoName];
          x.set(this, "xo-active", s === e);
        }
      });
    }
    get componentName() {
      return c.TabsPane;
    }
    get providerElement() {
      return this.closest(c.Tabs);
    }
    get options() {
      const t = M(this, { pick: ["xoName"], types: { xoName: "string" } });
      return { ...Ao.defaultOptions, ...t };
    }
    connectedCallback() {
      const { xoName: t } = this.options;
      G(this.componentName, "xo-name", t),
        Vn(this.providerElement) ||
          Et(
            `The ${this.componentName} component must be a child of the ${c.Tabs} component`
          ),
        (this.unsubscribe = g.subscribe("xo-tabs", this.listener));
    }
    disconnectedCallback() {
      var t;
      (t = this.unsubscribe) == null || t.call(this);
    }
  };
  let ms = Ao;
  o(ms, "defaultOptions", { xoName: null });
  function zl() {
    g.create("xo-tabs", { initialState: {} });
  }
  function Xi(r, { name: i, width: t = 0, left: e }) {
    g.set("xo-tabs", (s) => {
      var n, a, l, d;
      return {
        ...s,
        [r]: {
          ...s[r],
          name: i,
          width:
            t == null
              ? (a = (n = s[r]) == null ? void 0 : n.width) != null
                ? a
                : 0
              : t,
          left:
            e == null
              ? (d = (l = s[r]) == null ? void 0 : l.left) != null
                ? d
                : 0
              : e,
        },
      };
    });
  }
  const Bn = { active: Xi },
    To = class extends HTMLElement {
      constructor() {
        super(...arguments);
        o(this, "unsubscribe", null);
        o(this, "providerName", null);
        o(this, "_options");
        o(this, "setOptions", () => {
          this.options = M(this, {
            pick: ["xoName", "xoTrigger", "xoActive"],
            types: {
              xoName: "string",
              xoTrigger: "string",
              xoActive: "boolean",
            },
          });
        });
        o(this, "listener", (t) => {
          const { xoName: e } = this.options;
          if (
            (G(this.componentName, "xo-name", e),
            this.providerName && t[this.providerName])
          ) {
            const { name: s } = t[this.providerName];
            x.set(this, "xo-active", s === e);
          }
        });
        o(this, "handleActive", async (t) => {
          const { xoName: e } = this.options;
          if (
            (G(this.componentName, "xo-name", e), await T(0), this.providerName)
          )
            if (this.providerElement) {
              const s = this.providerElement.querySelector(c.TabsActive),
                n = s == null ? void 0 : s.parentElement,
                a = n ? Y(this).left - Y(n).left : 0;
              n &&
                window.getComputedStyle(n).position === "static" &&
                (n.style.position = "relative"),
                Xi(this.providerName, {
                  name: e,
                  left: a,
                  width: this.offsetWidth,
                });
            } else {
              const s = Array.from(document.querySelectorAll(c.ListPortal));
              v(s, (n) => {
                if (
                  t &&
                  t.target instanceof HTMLElement &&
                  n.contains(t.target)
                ) {
                  const a = t.currentTarget,
                    l = setTimeout(() => {
                      this.providerName &&
                        Xi(this.providerName, {
                          name: e,
                          width: a.offsetWidth,
                          left: a.offsetLeft,
                        }),
                        clearTimeout(l);
                    }, 0);
                }
              });
            }
        });
        o(this, "addTrigger", () => {
          this.options.xoTrigger === "hover" && !j.any
            ? this.addEventListener("mouseenter", this.handleActive)
            : this.addEventListener("click", this.handleActive);
        });
        o(this, "removeTrigger", () => {
          this.removeEventListener("mouseenter", this.handleActive),
            this.removeEventListener("click", this.handleActive);
        });
      }
      get componentName() {
        return c.TabsTrigger;
      }
      get providerElement() {
        return this.closest(c.Tabs);
      }
      get options() {
        return { ...To.defaultOptions, ...this._options };
      }
      set options(t) {
        this._options = t;
      }
      static get observedAttributes() {
        return ["xo-observed"];
      }
      connectedCallback() {
        var t;
        this.setOptions(),
          (t = this.providerElement) != null &&
            t.xoName &&
            (this.providerName = this.providerElement.xoName),
          x.get(this, "xo-active") && this.handleActive(),
          (this.unsubscribe = g.subscribe("xo-tabs", this.listener)),
          this.addTrigger();
      }
      disconnectedCallback() {
        var t;
        this.removeTrigger(), (t = this.unsubscribe) == null || t.call(this);
      }
      async attributeChangedCallback(t, e, s) {
        var n;
        t === "xo-observed" &&
          e !== s &&
          (await T(100),
          this.setOptions(),
          (n = this.providerElement) != null &&
            n.xoName &&
            (this.providerName = this.providerElement.xoName),
          x.get(this, "xo-active") && this.handleActive(),
          this.removeTrigger(),
          this.addTrigger(),
          this.listener(g.get("xo-tabs")));
      }
    };
  let fs = To;
  o(fs, "defaultOptions", { xoName: null, xoTrigger: "click" });
  let zn = 0;
  class _l extends HTMLElement {
    constructor() {
      super();
      o(this, "xoName");
      zn++, (this.xoName = `tabs-${zn}`);
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    attributeChangedCallback(t, e, s) {
      if (t === "xo-observed" && e != null && e !== s) {
        const n = Array.from(this.querySelectorAll(c.TabsActive)),
          a = Array.from(this.querySelectorAll(c.TabsTrigger)),
          l = Array.from(this.querySelectorAll(c.TabsPane));
        v([...n, ...a, ...l], (d) => {
          d.setAttribute("xo-observed", s);
        });
      }
    }
  }
  const ko = class extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "animated", W());
      o(this, "prevLeft", 0);
      o(this, "prevWidth", 0);
      o(this, "initialized", !1);
      o(this, "_options");
      o(this, "setOptions", () => {
        this.options = M(this, {
          pick: ["xoDuration", "xoEasing"],
          types: { xoDuration: "number", xoEasing: "string" },
        });
      });
      o(this, "listener", (t) => {
        const { xoDuration: e, xoEasing: s } = this.options;
        if (Vn(this.providerElement) && t[this.providerElement.xoName]) {
          const { width: n = 0, left: a = 0 } = t[this.providerElement.xoName];
          if (!this.initialized)
            (this.style.width = `${n}px`),
              (this.style.transform = `translateX(${a}px)`),
              (this.prevLeft = a),
              (this.prevWidth = n);
          else {
            const d = a + 100;
            this.animated.off(),
              this.animated({
                from: this.prevLeft,
                to: d,
                duration: e,
                onUpdate: (h) => {
                  const u = D({
                      value: h,
                      inputRange: [this.prevLeft, d],
                      outputRange: [this.prevWidth, n],
                      reverseEasing: this.prevLeft > a,
                      easing: R[s],
                    }),
                    p = D({
                      value: h,
                      inputRange: [this.prevLeft, d],
                      outputRange: [this.prevLeft, a],
                      reverseEasing: this.prevLeft > a,
                      easing: R[s],
                    });
                  (this.style.width = `${u}px`),
                    (this.style.transform = `translateX(${p}px)`);
                },
                onEnd: () => {
                  (this.prevLeft = a), (this.prevWidth = n);
                },
              });
          }
          this.initialized = !0;
        }
      });
    }
    get options() {
      return { ...ko.defaultOptions, ...this._options };
    }
    set options(t) {
      this._options = t;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    get providerElement() {
      return this.closest(c.Tabs);
    }
    connectedCallback() {
      this.setOptions(),
        (this.unsubscribe = g.subscribe("xo-tabs", this.listener));
    }
    disconnectedCallback() {
      this.unsubscribe(), this.animated.off();
    }
    attributeChangedCallback(t, e, s) {
      t === "xo-observed" &&
        e !== s &&
        (this.setOptions(),
        (this.initialized = !1),
        this.listener(g.get("xo-tabs") || {}));
    }
  };
  let xs = ko;
  o(xs, "defaultOptions", { xoDuration: 200, xoEasing: "ease" });
  const ip = "";
  zl(),
    (window.xoTabs = Bn),
    _({
      [c.Tabs]: _l,
      [c.TabsActive]: xs,
      [c.TabsTrigger]: fs,
      [c.TabsPane]: ms,
    });
  class Wl extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "keyframes", {});
      o(this, "parallax", null);
      o(this, "beautyAttr", () => {
        const t = this.getAttribute("xo-breakpoints"),
          e = this.getAttribute("xo-keyframes");
        t && this.setAttribute("xo-breakpoints", t.replace(/\s+/g, " ").trim()),
          e && this.setAttribute("xo-keyframes", e.replace(/\s+/g, " ").trim());
      });
      o(this, "init", async () => {
        const t = this.closest(`${c.Parallax}, [${c.Parallax}]`);
        if (
          (this.getAttribute("xo-keyframes") ||
            Et(
              `The ${c.ParallaxScroll} component must have the "xo-keyframes" attribute`
            ),
          t &&
            (t.tagName.toLowerCase() === c.Parallax ||
              t.hasAttribute(c.Parallax)))
        ) {
          const { xoLerpEase: e = 0.08, xoBackfaceVisibility: s = "hidden" } =
            this.getOptions();
          s === "hidden" && (this.style.backfaceVisibility = "hidden"),
            this.setKeyframes(),
            (this.parallax = es({ lerpEase: e })),
            this.beautyAttr(),
            this.parallax
              .add(this, {
                from: () => Y(t).top - window.innerHeight,
                to: () => Y(t).top + t.offsetHeight,
                keyframes: this.keyframes,
              })
              .run(),
            await T(50),
            this.dispatchEvent(
              new CustomEvent("xo:parallax-scroll:init", { bubbles: !0 })
            );
        }
      });
      o(
        this,
        "handleResize",
        rt(
          ge("x", () => {
            var t;
            (t = this.parallax) == null || t.destroy(), this.init();
          }),
          500
        )
      );
    }
    static get observedAttributes() {
      return [
        "xo-observed",
        "xo-keyframes",
        "xo-breakpoints",
        "xo-lerp-ease",
        "xo-backface-visibility",
      ];
    }
    getOptions() {
      return M(this, {
        pick: [
          "xoKeyframes",
          "xoBreakpoints",
          "xoLerpEase",
          "xoBackfaceVisibility",
        ],
        types: {
          xoKeyframes: "object",
          xoBreakpoints: "object",
          xoLerpEase: "number",
          xoBackfaceVisibility: "string",
        },
      });
    }
    setKeyframes() {
      var s;
      const { xoKeyframes: t, xoBreakpoints: e } = this.getOptions();
      this.keyframes = (s = qt(e)) != null ? s : t;
    }
    connectedCallback() {
      this.init(), window.addEventListener("resize", this.handleResize);
    }
    disconnectedCallback() {
      var t;
      (t = this.parallax) == null || t.destroy(),
        window.removeEventListener("resize", this.handleResize);
    }
    async attributeChangedCallback(t, e, s) {
      (t === "xo-observed" ||
        t === "xo-keyframes" ||
        t === "xo-breakpoints" ||
        t === "xo-lerp-ease" ||
        t === "xo-backface-visibility") &&
        e !== s &&
        (await T(100), this.disconnectedCallback(), this.connectedCallback());
    }
  }
  const Ul = 1e3 / 60,
    $o = class extends HTMLElement {
      constructor() {
        super(...arguments);
        o(this, "shadow", this.attachShadow({ mode: "open" }));
        o(this, "providerEl", null);
        o(this, "targetValueX", 0);
        o(this, "targetValueY", 0);
        o(this, "currentValueX", 0);
        o(this, "currentValueY", 0);
        o(this, "handleParallax", (t) => {
          var p;
          const { xoStrength: e, xo3d: s } = this.getOptions();
          let n = t / Ul;
          const a = Math.round(n);
          a >= 1 && (n = a);
          const l = Number(
              ((p = this.providerEl) == null
                ? void 0
                : p.getAttribute("xo-lerp-ease")) || "0.08"
            ),
            d = Jt(this.currentValueX, this.targetValueX, l * n),
            h = Jt(this.currentValueY, this.targetValueY, l * n),
            u = this.shadow.querySelector(c.ParallaxHoverInner);
          s
            ? ((u.style.transformStyle = "preserve-3d"),
              (u.style.transform = `perspective(2000px) rotateX(${
                (-h / 4) * e
              }deg) rotateY(${(d / 4) * e}deg)`))
            : (u.style.transform = `translate3d(${d * e}px, ${h * e}px, 0)`),
            (this.currentValueX = d),
            (this.currentValueY = h);
        });
        o(this, "handleFrameSyncUpdate", ({ delta: t }) => {
          const e = Math.abs(this.targetValueX - this.currentValueX),
            s = Math.abs(this.targetValueY - this.currentValueY);
          (e < 0.001 && s < 0.001) || this.handleParallax(t);
        });
        o(this, "setTargetValue", (t, e, s, n, a) => {
          const l = Y(this).left + this.offsetWidth / 2,
            d = Y(this).top + this.offsetHeight / 2;
          (this.targetValueX = D({
            value: t.pageX - e,
            inputRange: [0, l - e, n],
            outputRange: [-1, 0, 1],
          })),
            (this.targetValueY = D({
              value: t.pageY - s,
              inputRange: [0, d - s, a],
              outputRange: [-1, 0, 1],
            }));
        });
        o(this, "handleMouseMove", (t) => {
          const e = Y(this.providerEl).left,
            s = Y(this.providerEl).top,
            n = this.providerEl.offsetWidth,
            a = this.providerEl.offsetHeight;
          this.setTargetValue(t, e, s, n, a);
        });
        o(this, "handleMouseLeave", () => {
          const { xoResetPosition: t } = this.getOptions();
          t && ((this.targetValueX = 0), (this.targetValueY = 0));
        });
      }
      static get observedAttributes() {
        return [
          "xo-observed",
          "xo-strength",
          "xo-reset-position",
          "xo-3d",
          "xo-inner-width",
        ];
      }
      getOptions() {
        const t = M(this, {
          pick: ["xoStrength", "xoResetPosition", "xo3d", "xoInnerWidth"],
          types: {
            xoStrength: "number",
            xoResetPosition: "boolean",
            xo3d: "boolean",
            xoInnerWidth: "string",
          },
        });
        return { ...$o.defaultOptions, ...t };
      }
      connectedCallback() {
        if (
          (K.remove(this.handleFrameSyncUpdate),
          K.add(this.handleFrameSyncUpdate, !0),
          (this.providerEl = this.closest(`${c.Parallax}, [${c.Parallax}]`)),
          !this.providerEl)
        )
          throw new Error(
            `The ${c.ParallaxHover} component must be a child of ${c.Parallax}`
          );
        if (!this.shadow.innerHTML) {
          const { xoInnerWidth: t } = this.getOptions();
          this.shadow.innerHTML = `<${c.ParallaxHoverInner} part="inner" style="display: block; width: ${t}"><slot></slot></${c.ParallaxHoverInner}>`;
        }
        this.handleParallax((1 / 60) * 1e3),
          this.providerEl.addEventListener("mousemove", this.handleMouseMove),
          this.providerEl.addEventListener("mouseleave", this.handleMouseLeave);
      }
      disconnectedCallback() {
        var t, e;
        K.remove(this.handleFrameSyncUpdate),
          (t = this.providerEl) == null ||
            t.removeEventListener("mousemove", this.handleMouseMove),
          (e = this.providerEl) == null ||
            e.removeEventListener("mouseleave", this.handleMouseLeave);
      }
      async attributeChangedCallback(t, e, s) {
        (t === "xo-observed" ||
          t === "xo-strength" ||
          t === "xo-reset-position" ||
          t === "xo-3d" ||
          t === "xo-inner-width") &&
          e !== s &&
          (await T(100), this.disconnectedCallback(), this.connectedCallback());
      }
    };
  let gs = $o;
  o(gs, "defaultOptions", {
    xoStrength: 100,
    xoResetPosition: !0,
    xo3d: !1,
    xoInnerWidth: "fit-content",
  });
  const np = "";
  _({ [c.ParallaxScroll]: Wl, [c.ParallaxHover]: gs });
  function Xl() {
    g.create("xo-carousel", { initialState: {}, useDeepEqual: !0 });
  }
  function Yl(r, i) {
    g.set("xo-carousel", (t) => ({ ...t, [r]: { ...t[r], options: i } }));
  }
  function Gl(r, i) {
    g.set("xo-carousel", (t) => ({
      ...t,
      [r]: { ...t[r], thumbnailOptions: i },
    }));
  }
  function jl(r, i, t) {
    g.set("xo-carousel", (e) => ({
      ...e,
      [r]: { ...e[r], containerWidth: i, containerHeight: t },
    }));
  }
  function Ql(r, i) {
    g.set("xo-carousel", (t) => ({ ...t, [r]: { ...t[r], slideLength: i } }));
  }
  function Ae(r, i) {
    g.set("xo-carousel", (t) => {
      var p, m, f, b, y, E, C, S, k, $, L, Q, st, lt, At, $t, Yt;
      const e =
          (m = (p = t[r]) == null ? void 0 : p.slideLength) != null ? m : 0,
        s =
          (y =
            (b = (f = t[r]) == null ? void 0 : f.options) == null
              ? void 0
              : b.xoPerView) != null
            ? y
            : 0,
        n =
          (S =
            (C = (E = t[r]) == null ? void 0 : E.options) == null
              ? void 0
              : C.xoRewind) != null
            ? S
            : !1,
        a =
          ((L =
            ($ = (k = t[r]) == null ? void 0 : k.options) == null
              ? void 0
              : $.xoLoop) != null
            ? L
            : !1) &&
          ((st = (Q = t[r]) == null ? void 0 : Q.options) == null
            ? void 0
            : st.xoType) !== "slide",
        l =
          (At = (lt = t[r]) == null ? void 0 : lt.activeIndex) != null ? At : 0,
        d =
          (Yt = ($t = t[r]) == null ? void 0 : $t.thumbnailActiveIndex) != null
            ? Yt
            : 0;
      let h = a ? Ge(l + i, 0, e - s) : Z(l + i, 0, e - s),
        u = Z(d + i, 0, e - 1);
      return (
        n && l === e - s && (h = 0),
        n && d === e - 1 && (u = 0),
        {
          ...t,
          [r]: {
            ...t[r],
            activeIndex: h,
            thumbnailActiveIndex: u,
            useAnimated: !0,
            timestamp: Date.now(),
          },
        }
      );
    })("xo-carousel/nextSlide");
  }
  function bs(r, i) {
    g.set("xo-carousel", (t) => {
      var h, u, p, m, f, b, y, E, C, S, k, $, L, Q, st;
      const e =
          (p =
            (u = (h = t[r]) == null ? void 0 : h.options) == null
              ? void 0
              : u.xoPerView) != null
            ? p
            : 0,
        s = (f = (m = t[r]) == null ? void 0 : m.slideLength) != null ? f : e,
        n = (y = (b = t[r]) == null ? void 0 : b.activeIndex) != null ? y : 0,
        a =
          (S =
            (C = (E = t[r]) == null ? void 0 : E.options) == null
              ? void 0
              : C.xoRewind) != null
            ? S
            : !1;
      let d =
        ((L =
          ($ = (k = t[r]) == null ? void 0 : k.options) == null
            ? void 0
            : $.xoLoop) != null
          ? L
          : !1) &&
        ((st = (Q = t[r]) == null ? void 0 : Q.options) == null
          ? void 0
          : st.xoType) !== "slide"
          ? Ge(n - i, 0, s - e)
          : Math.max(n - i, 0);
      return (
        a && n === 0 && (d = s - e),
        {
          ...t,
          [r]: {
            ...t[r],
            activeIndex: d,
            thumbnailActiveIndex: d,
            useAnimated: !0,
            timestamp: Date.now(),
          },
        }
      );
    })("xo-carousel/prevSlide");
  }
  function Nt(r, i, t) {
    g.set("xo-carousel", (e) => {
      var d, h, u, p, m;
      const s =
          (u =
            (h = (d = e[r]) == null ? void 0 : d.options) == null
              ? void 0
              : h.xoPerView) != null
            ? u
            : 0,
        n = (m = (p = e[r]) == null ? void 0 : p.slideLength) != null ? m : s;
      let a = Z(i, 0, n - s),
        l = Z(i, 0, n - 1);
      return {
        ...e,
        [r]: {
          ...e[r],
          activeIndex: a,
          thumbnailActiveIndex: l,
          useAnimated: t,
          timestamp: Date.now(),
        },
      };
    })("xo-carousel/goToSlide");
  }
  function et(r) {
    var i;
    return {
      activeIndex: 0,
      thumbnailActiveIndex: 0,
      ...((i = g.get("xo-carousel")) == null ? void 0 : i[r]),
    };
  }
  function Vt(r, i, t) {
    return g.subscribe(
      "xo-carousel",
      (e) => i(e[r]),
      (e, s) =>
        t ? t(e, s) : It(e == null ? void 0 : e[r], s == null ? void 0 : s[r])
    );
  }
  const _n = {
      next: Ae,
      prev: bs,
      goTo: (r, i) => {
        const { options: t } = et(r);
        let e = i;
        t.xoLoop && (e = i + t.xoPerView * 2), Nt(r, e, !0);
      },
    },
    ys = {
      init: (r, i) => {
        r.dispatchEvent(
          new CustomEvent("xo:carousel:init", { bubbles: !0, detail: i })
        );
      },
      change: (r, i) => {
        r.dispatchEvent(
          new CustomEvent("xo:carousel:change", {
            bubbles: !0,
            detail: { activeIndex: i },
          })
        );
      },
      destroy: (r) => {
        r.dispatchEvent(
          new CustomEvent("xo:carousel:destroy", { bubbles: !0 })
        );
      },
      resize: (r, i, t) => {
        r.dispatchEvent(
          new CustomEvent("xo:carousel:resize", {
            bubbles: !0,
            detail: { width: i, height: t },
          })
        );
      },
    },
    vs = window.navigator.hardwareConcurrency === 4 ? 1e3 : 500;
  function Zl(r) {
    const i = r.offsetHeight,
      t = getComputedStyle(r),
      e = parseInt(t.marginTop || "0", 10),
      s = parseInt(t.marginBottom || "0", 10),
      { boxShadow: n } = window.getComputedStyle(r),
      [a, l, d] = n.split(" ").reverse(),
      h = parseInt(l || "0", 10) + parseInt(d || "0", 10);
    return i + e + s + h;
  }
  function Kl(r, i) {
    const t = Array.from(r.children),
      e = [...t.slice(0, i * 2), ...t.slice(0, i * 2)],
      s = [...t.slice(-i * 2), ...t.slice(-i * 2)];
    v(e, (n, a) => {
      if (a < i * 2 && n.tagName.toLowerCase() === c.CarouselSlide) {
        const l = n.cloneNode(!0);
        l.removeAttribute("xo-active"),
          l.removeAttribute("xo-visible"),
          x.set(l, "xo-cloned", !0),
          r.appendChild(l);
      }
    }),
      v(s, (n, a) => {
        if (
          a >= s.length - i * 2 &&
          n.tagName.toLowerCase() === c.CarouselSlide
        ) {
          const l = n.cloneNode(!0);
          l.removeAttribute("xo-active"),
            l.removeAttribute("xo-visible"),
            x.set(l, "xo-cloned", !0),
            r.insertBefore(l, t[0]);
        }
      });
  }
  let Wn = 0;
  function Un(r) {
    Wn = r;
  }
  function Xn() {
    return Wn;
  }
  let Yn = 0;
  const Mo = class extends HTMLElement {
    constructor() {
      super();
      o(this, "unsubscribe", () => {});
      o(this, "xoName");
      o(this, "_options");
      o(this, "prevActiveIndex", -1);
      o(this, "prevPaginationProgress", 0);
      o(this, "animated1", W());
      o(this, "animated2", W());
      o(this, "resizeObserver", null);
      o(this, "prevWidth", 0);
      o(this, "setOptions", () => {
        (this.options = M(this, {
          pick: [
            "xoName",
            "xoActiveIndex",
            "xoPerView",
            "xoPerMove",
            "xoGap",
            "xoSpeed",
            "xoEasing",
            "xoOverflow",
            "xoVertical",
            "xoAutoplay",
            "xoHoverPause",
            "xoRewind",
            "xoRtl",
            "xoBreakpoints",
            "xoRenderBullet",
            "xoAutoheight",
            "xoType",
            "xoLoop",
            "xoColumnWidth",
            "xoSnake",
            "xoStopAutoplayOnInteraction",
            "xoProgress",
          ],
          types: {
            xoName: "string",
            xoActiveIndex: "number",
            xoPerView: "number",
            xoPerMove: "number",
            xoGap: "number",
            xoSpeed: "number",
            xoEasing: "string",
            xoOverflow: "string",
            xoVertical: "boolean",
            xoAutoplay: "number",
            xoHoverPause: "boolean",
            xoRewind: "boolean",
            xoRtl: "boolean",
            xoBreakpoints: "object",
            xoRenderBullet: "string",
            xoAutoheight: "boolean",
            xoType: "string",
            xoLoop: "boolean",
            xoColumnWidth: "number",
            xoSnake: "boolean",
            xoStopAutoplayOnInteraction: "boolean",
            xoProgress: "boolean",
          },
        })),
          { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }
            .VITE_BUILD_MODE === "xoSections" &&
            (this.options = { ...this.options, xoAutoplay: 0, xoLoop: !1 });
      });
      o(this, "setOptionsForStore", () => {
        var C, S, k, $, L;
        const {
            xoBreakpoints: t,
            xoPerView: e,
            xoPerMove: s,
            xoGap: n,
            xoOverflow: a,
            xoType: l,
            xoColumnWidth: d,
            xoSnake: h,
            xoVertical: u,
          } = this.options,
          p = qt(t),
          m = l === "slide",
          f = !!this.querySelector(c.CarouselThumbnail),
          b = this.querySelector(c.CarouselInner);
        let y = {
          ...this.options,
          xoPerView: m
            ? (C = p == null ? void 0 : p.perView) != null
              ? C
              : e
            : 1,
          xoPerMove: m
            ? (S = p == null ? void 0 : p.perMove) != null
              ? S
              : Math.min(s, e)
            : 1,
          xoGap: m ? ((k = p == null ? void 0 : p.gap) != null ? k : n) : 0,
          xoAutoheight: m ? this.options.xoAutoheight : !0,
          xoOverflow: ($ = p == null ? void 0 : p.overflow) != null ? $ : a,
          xoVertical: (L = p == null ? void 0 : p.vertical) != null ? L : u,
          xoRewind: this.options.xoRewind,
          xoLoop: f ? !1 : this.options.xoLoop,
        };
        if (
          (y.xoPerView &&
            y.xoLoop &&
            b &&
            b.querySelectorAll(`${c.CarouselSlide}:not([xo-cloned])`).length <=
              y.xoPerView &&
            (y = { ...y, xoLoop: !1 }),
          d)
        ) {
          const Q = this.hasAttribute("xo-per-view"),
            st = Math.floor((this.offsetWidth + n) / (d + n)),
            lt = Q ? Math.min(e, st) : st;
          y = { ...y, xoPerView: lt, xoPerMove: Math.min(lt, s) };
        }
        h && (y = { ...y, xoPerMove: y.xoPerView }),
          Yl(this.xoName, y),
          this.style.setProperty("--xo-per-view", `${y.xoPerView}`),
          this.style.setProperty("--xo-gap", `${y.xoGap}px`),
          (l === "fade" || l === "nature" || l === "water" || l === "urban") &&
            this.style.setProperty("--xo-speed", `${y.xoSpeed}ms`);
        let E = 0;
        y.xoLoop && y.xoType === "slide" && (E = y.xoPerView * 4),
          b &&
            (Ql(
              this.xoName,
              b.querySelectorAll(`${c.CarouselSlide}:not([xo-cloned])`).length +
                E
            ),
            y.xoOverflow === "visible"
              ? (b.style.overflow = "visible")
              : (b.style.overflow = "hidden")),
          Nt(
            this.xoName,
            this.options.xoActiveIndex +
              (y.xoLoop && y.xoType === "slide" ? e * 2 : 0),
            !0
          );
      });
      o(this, "beautyBreakpoints", () => {
        const t = this.getAttribute("xo-breakpoints");
        t && this.setAttribute("xo-breakpoints", t.replace(/\s+/g, " ").trim());
      });
      o(this, "init", () => {
        this.setOptionsForStore(), ys.init(this, this.options);
      });
      o(
        this,
        "handleResize",
        rt((t) => {
          for (let e of t) {
            const s = e.contentRect.width,
              n = e.contentRect.height;
            s !== this.prevWidth &&
              (this.init(), (this.prevWidth = s), ys.resize(this, s, n));
          }
        }, vs)
      );
      Yn++,
        this.setOptions(),
        this.options.xoName
          ? (this.xoName = this.options.xoName)
          : (this.xoName = `carousel-${Yn}`);
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    get options() {
      return { ...Mo.defaultOptions, ...this._options };
    }
    set options(t) {
      this._options = t;
    }
    connectedCallback() {
      this.setOptions(),
        { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }
          .VITE_BUILD_MODE === "xoSections" &&
          this.options.xoName &&
          (this.xoName = this.options.xoName),
        this.init(),
        this.beautyBreakpoints(),
        (this.resizeObserver = new ResizeObserver(this.handleResize)),
        this.resizeObserver.observe(this),
        (this.unsubscribe = Vt(
          this.xoName,
          ({ options: t, slideLength: e, activeIndex: s }) => {
            if (this.prevActiveIndex !== s) {
              const n =
                  t.xoLoop && t.xoType === "slide" ? e - t.xoPerView * 4 : e,
                a =
                  t.xoLoop && t.xoType === "slide"
                    ? Math.min(
                        Math.max(s - t.xoPerView * 2, 0),
                        n - t.xoPerView
                      )
                    : s,
                l = D({
                  value: a,
                  inputRange: [0, n - t.xoPerView],
                  outputRange: [0, 100],
                });
              this.animated1.off(),
                this.animated1({
                  from: this.prevPaginationProgress,
                  to: l,
                  duration: this.prevPaginationProgress === 100 ? 0 : t.xoSpeed,
                  onUpdate: (d) => {
                    this.style.setProperty("--xo-pagination-progress", `${d}%`);
                  },
                  onEnd: () => {
                    this.prevPaginationProgress = l;
                  },
                }),
                t.xoAutoplay &&
                  t.xoProgress &&
                  (this.animated2.off(),
                  this.animated2({
                    from: 0,
                    to: 100,
                    duration: t.xoAutoplay,
                    onUpdate: (d) => {
                      this.style.setProperty("--xo-autoplay-progress", `${d}%`);
                    },
                  })),
                this.dispatchEvent(
                  new CustomEvent("change", {
                    bubbles: !0,
                    detail: { activeIndex: a },
                  })
                ),
                (this.prevActiveIndex = s);
            }
          }
        ));
    }
    async attributeChangedCallback(t, e, s) {
      if (t === "xo-observed" && e !== s) {
        await T(50), this.setOptions(), this.setOptionsForStore();
        const n = Array.from(this.querySelectorAll(c.CarouselList));
        v(n, (a) => {
          a.closest(c.CarouselThumbnail) || a.setAttribute("xo-observed", s);
        });
      }
    }
    disconnectedCallback() {
      var t;
      this.unsubscribe(),
        this.animated1.off(),
        this.animated2.off(),
        (t = this.resizeObserver) == null || t.disconnect(),
        ys.destroy(this);
    }
  };
  let Es = Mo;
  o(Es, "defaultOptions", {
    xoName: "",
    xoActiveIndex: 0,
    xoPerView: 1,
    xoPerMove: 1,
    xoGap: 20,
    xoSpeed: 200,
    xoEasing: "easeOutQuad",
    xoOverflow: "hidden",
    xoVertical: !1,
    xoAutoplay: 0,
    xoHoverPause: !1,
    xoRewind: !1,
    xoRtl: getComputedStyle(document.documentElement).direction === "rtl",
    xoRenderBullet: "<span></span>",
    xoBreakpoints: {},
    xoAutoheight: !1,
    xoType: "slide",
    xoLoop: !1,
    xoColumnWidth: 0,
    xoSnake: !1,
    xoStopAutoplayOnInteraction: !1,
    xoProgress: !1,
  });
  const Lo = class extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "_options");
      o(this, "resizeObserver", null);
      o(this, "prevWidth", 0);
      o(this, "setOptions", () => {
        this.options = M(this, {
          pick: [
            "xoPerView",
            "xoPerMove",
            "xoGap",
            "xoBreakpoints",
            "xoVertical",
          ],
          types: {
            xoPerView: "number",
            xoPerMove: "number",
            xoGap: "number",
            xoBreakpoints: "object",
            xoVertical: "boolean",
          },
        });
      });
      o(this, "setOptionsForStore", async () => {
        var u, p, m, f;
        const {
            xoBreakpoints: t,
            xoPerView: e,
            xoPerMove: s,
            xoGap: n,
            xoVertical: a,
          } = this.options,
          l = qt(t),
          d = {
            ...this.options,
            xoPerView: (u = l == null ? void 0 : l.perView) != null ? u : e,
            xoPerMove:
              (p = l == null ? void 0 : l.perMove) != null ? p : Math.min(s, e),
            xoGap: (m = l == null ? void 0 : l.gap) != null ? m : n,
            xoVertical: (f = l == null ? void 0 : l.vertical) != null ? f : a,
          };
        this.style.setProperty("--xo-per-view", `${d.xoPerView}`),
          this.style.setProperty("--xo-gap", `${d.xoGap}px`),
          await T(50);
        const h = this.getProviderElement();
        if (h) {
          const { xoName: b } = h;
          Gl(b, d);
        }
      });
      o(
        this,
        "handleResize",
        rt((t) => {
          for (let e of t) {
            const s = e.contentRect.width;
            s !== this.prevWidth &&
              (this.setOptionsForStore(), (this.prevWidth = s));
          }
        }, vs)
      );
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    getProviderElement() {
      return this.closest(c.Carousel);
    }
    get options() {
      return { ...Lo.defaultOptions, ...this._options };
    }
    set options(t) {
      this._options = t;
    }
    async connectedCallback() {
      this.setOptions(), this.setOptionsForStore(), await T(50);
      const t = this.getProviderElement();
      !t ||
        ((this.prevWidth = t.clientWidth),
        (this.resizeObserver = new ResizeObserver(this.handleResize)),
        this.resizeObserver.observe(t));
    }
    attributeChangedCallback(t, e, s) {
      t === "xo-observed" &&
        e !== s &&
        (this.setOptions(), this.setOptionsForStore());
    }
    disconnectedCallback() {
      var t;
      (t = this.resizeObserver) == null || t.disconnect();
    }
  };
  let ws = Lo;
  o(ws, "defaultOptions", {
    xoPerView: 5,
    xoPerMove: 1,
    xoGap: 10,
    xoBreakpoints: {},
    xoVertical: !1,
  });
  const at = { Idle: "idle", Target: "target", Lock: "lock" };
  class Jl extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "isThumbMoving", !1);
      o(this, "unsubscribe", () => {});
      o(this, "animated", W());
      o(this, "thumbAnimated", W());
      o(this, "snakeAnimated", W());
      o(this, "prevTranslate", 0);
      o(this, "prevThumbTranslate", 0);
      o(this, "axis", at.Idle);
      o(this, "pan", null);
      o(this, "thumbPan", null);
      o(this, "dEnd", 0);
      o(this, "prevDx", null);
      o(this, "prevDy", null);
      o(this, "prevThumbDx", null);
      o(this, "prevThumbDy", null);
      o(this, "isMove", !1);
      o(this, "timeoutId", -1);
      o(this, "anchorEls", []);
      o(this, "_options");
      o(this, "initialized", !1);
      o(this, "autoPlayStart", Date.now());
      o(this, "autoPlayNext", Date.now());
      o(this, "tempStop", !1);
      o(this, "prevScrollY", -1);
      o(this, "startClientX", 0);
      o(this, "isNextForSnake", !1);
      o(this, "isSnakeUpdated", !1);
      o(this, "resizeObserver", null);
      o(this, "intersectionObserver", null);
      o(this, "prevWidth", 0);
      o(this, "wheelEndTimeId", -1);
      o(this, "wheelStarting", !1);
      o(this, "isHorizontalSwipeState");
      o(this, "setOptions", () => {
        const { options: t, thumbnailOptions: e } = et(
          this.providerElement.xoName
        );
        this.isThumbnail ? (this.options = { ...t, ...e }) : (this.options = t);
      });
      o(this, "withRtl", (t) => (this.options.xoRtl ? t * -1 : t));
      o(this, "setTranslate", (t) => {
        if (this.providerElement && !isNaN(t)) {
          const { xoType: e, xoVertical: s } = this.options;
          e === "slide" &&
            (s
              ? (this.style.transform = `translate3d(0, ${t}px, 0)`)
              : (this.style.transform = `translate3d(${this.withRtl(
                  t
                )}px, 0, 0)`));
        }
      });
      o(this, "handleSlide", (t) => {
        if (!this.providerElement) return;
        const { options: e, activeIndex: s } = this,
          { slideLength: n } = et(this.providerElement.xoName),
          a = this.isThumbnail ? n : n - e.xoPerView,
          l = this.isThumbnail ? Math.floor(e.xoPerView / 2) : 0,
          d = this.isThumbnail ? e.xoPerView - l : 0,
          h = this.isThumbnail ? Z(s, l, a - d) : s;
        if (h <= a - d) {
          const p = this.isThumbnail ? Z(h - l, 0, a) : s,
            m = n > e.xoPerView ? -p * this.slideSize : 0;
          e.xoType === "slide" &&
            this.animated({
              from: this.isThumbnail
                ? this.prevThumbTranslate
                : this.prevTranslate,
              to: m,
              duration: t,
              easing: R[e.xoEasing],
              onUpdate: this.setTranslate,
              onEnd: (f) => {
                if (
                  (this.pan &&
                    (e.xoVertical
                      ? this.pan.setValue({ dy: f })
                      : this.pan.setValue({ dx: this.withRtl(f) })),
                  this.thumbPan &&
                    (e.xoVertical
                      ? this.thumbPan.setValue({ dy: f })
                      : this.thumbPan.setValue({ dx: this.withRtl(f) })),
                  this.isThumbnail
                    ? (this.prevThumbTranslate = f)
                    : (this.prevTranslate = f),
                  e.xoLoop)
                ) {
                  const b = p - e.xoPerView * 2;
                  if (b <= e.xoPerView * -1) {
                    const y = a - (e.xoPerView * 2 + e.xoPerView * -1 - b);
                    Nt(this.providerElement.xoName, y, !1);
                  } else if (b >= a - e.xoPerView * 3) {
                    const y = e.xoPerView * 2 + b - (a - e.xoPerView * 3);
                    Nt(this.providerElement.xoName, y, !1);
                  }
                }
              },
            }),
            this.handleActiveSlide(p);
        }
      });
      o(this, "handleSnake", () => {
        const { activeIndex: t, options: e } = et(this.providerElement.xoName),
          { xoSpeed: s, xoEasing: n, xoPerView: a } = e;
        this.snakeAnimated({
          from: 0,
          to: 1,
          duration: s,
          easing: R[n],
          onUpdate: (l) => {
            const d = D({
              value: l,
              inputRange: [0, 0.5, 1],
              outputRange: [0, 15, 0],
            });
            (this.style.gap = `${d}rem`),
              this.isNextForSnake
                ? (this.style.marginLeft = `-${d * t}rem`)
                : (this.style.marginLeft = `-${d * (t + a - 1)}rem`),
              (this.isSnakeUpdated = !0);
          },
          onEnd: () => {
            this.isSnakeUpdated = !1;
          },
        });
      });
      o(this, "listener", () => {
        if (this.initialized) {
          const {
              xoSpeed: t,
              xoSnake: e,
              xoPerView: s,
              xoLoop: n,
              xoType: a,
            } = this.options,
            { useAnimated: l } = et(this.providerElement.xoName);
          if (
            ((this.autoPlayStart = Date.now()),
            this.handleSlide(l ? t : 0),
            !this.isSnakeUpdated && e && this.handleSnake(),
            this.providerElement)
          ) {
            const d =
              n && a === "slide" ? this.activeIndex - s * 2 : this.activeIndex;
            ys.change(this.providerElement, d);
          }
        }
      });
      o(this, "rubberBandClamp", (t) => {
        const { slideLength: e } = et(this.providerElement.xoName),
          s = this.slideSize * e;
        return mn(this.getContainerSize() - s, 0, t, 0.2);
      });
      o(
        this,
        "lockScroll",
        (t) => (
          this.isHorizontalSwipeState == null &&
            (this.isHorizontalSwipeState = t),
          j.any ? this.isHorizontalSwipeState : !0
        )
      );
      o(
        this,
        "panMove",
        ({ dx: t, dy: e, vx: s, vy: n, isHorizontalSwipe: a }, l) => {
          if (l.target.closest("model-viewer")) return;
          const { options: h } = this;
          if (!h.xoVertical) {
            if (!this.lockScroll(a)) return;
            l.preventDefault();
          }
          if (
            ((this.isMove = !0),
            this.prevDx == null &&
              (this.prevDx = -this.slideSize * this.activeIndex),
            this.prevDy == null && (this.prevDy = 0),
            h.xoVertical
              ? (this.axis = at.Target)
              : j.any
              ? this.axis === at.Idle &&
                (Math.abs(t - this.prevDx) > Math.abs(e - this.prevDy) * 2.5
                  ? (this.axis = at.Target)
                  : (this.axis = at.Lock))
              : (this.axis = at.Target),
            this.axis === at.Target)
          ) {
            j.any &&
              window.scrollY !== this.prevScrollY &&
              this.prevScrollY !== -1 &&
              this.panEnd({ dx: t, dy: e, vx: s, vy: n }, l);
            const u = h.xoVertical ? e : this.withRtl(t),
              p = this.rubberBandClamp(u);
            h.xoSnake ? (this.isNextForSnake = !0) : this.setTranslate(p),
              (this.prevTranslate = p);
          } else j.any && this.style.removeProperty("touch-action");
        }
      );
      o(this, "magnet", (t, e, s, n, a) =>
        Z(Math.round(t + (a ? n : -n)), e, s)
      );
      o(this, "panEnd", (t, e) => {
        if (!this.providerElement) return;
        const { options: s } = this;
        if (s.xoSnake) {
          const n =
            e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
          (this.isNextForSnake = this.startClientX >= n),
            this.isNextForSnake
              ? Ae(this.providerElement.xoName, s.xoPerMove)
              : bs(this.providerElement.xoName, s.xoPerMove);
        } else {
          const { d: n, v: a } = this.getDxy(t),
            { slideLength: l, activeIndex: d } = et(
              this.providerElement.xoName
            ),
            h = this.slideSize * l,
            u = l - s.xoPerView,
            p = s.xoPerView > 2 ? s.xoPerView : 1,
            m = a === 0 ? n : this.dEnd > n ? n - a * p : n + a * p,
            f = (s.xoVertical ? t.vy : t.vx) < 0,
            y = (() =>
              s.xoType === "slide"
                ? this.magnet(
                    D({ value: m, inputRange: [0, -h], outputRange: [0, l] }),
                    0,
                    u,
                    0.4,
                    this.dEnd > n
                  )
                : s.xoLoop
                ? Ge(f ? d + 1 : d - 1, 0, u)
                : Z(f ? d + 1 : d - 1, 0, u))();
          if (
            (this.axis === at.Target && Nt(this.providerElement.xoName, y, !0),
            y > 0 && y <= u)
          ) {
            if (this.pan)
              if (this.axis === at.Target) {
                if (s.xoVertical) {
                  const E = -y * this.slideSize;
                  this.pan.setValue({ dx: 0, dy: E }),
                    (this.dEnd = E),
                    (this.prevDx = 0),
                    (this.prevDy = E);
                } else {
                  const E = this.withRtl(-y * this.slideSize);
                  this.pan.setValue({ dx: E, dy: 0 }),
                    (this.dEnd = E),
                    (this.prevDx = E),
                    (this.prevDy = 0);
                }
                this.handleAutoPlay();
              } else this.pan.setValue({ dx: this.prevDx, dy: this.prevDy });
          } else
            y === 0
              ? this.pan &&
                (this.pan.setValue({ dx: 0, dy: 0 }),
                (this.dEnd = 0),
                (this.prevDx = 0),
                (this.prevDy = 0),
                this.handleAutoPlay())
              : this.animated({
                  from: this.prevTranslate,
                  to: -(l - s.xoPerView) * this.slideSize,
                  duration: s.xoSpeed,
                  easing: R[s.xoEasing],
                  onUpdate: (E) => {
                    this.handlePause(), this.setTranslate(E);
                  },
                  onEnd: (E) => {
                    this.pan &&
                      (s.xoVertical
                        ? (this.pan.setValue({ dx: 0, dy: E }),
                          (this.dEnd = E),
                          (this.prevDx = 0),
                          (this.prevDy = E))
                        : (this.pan.setValue({ dx: this.withRtl(E), dy: 0 }),
                          (this.dEnd = this.withRtl(E)),
                          (this.prevDx = this.withRtl(E)),
                          (this.prevDy = 0)),
                      this.handleAutoPlay()),
                      (this.prevTranslate = E);
                  },
                });
          (this.axis = at.Idle),
            clearTimeout(this.timeoutId),
            (this.timeoutId = window.setTimeout(() => {
              this.style.removeProperty("touch-action");
            }, 300)),
            (this.prevScrollY = window.scrollY);
        }
      });
      o(
        this,
        "thumbPanMove",
        ({ dx: t, dy: e, vx: s, vy: n, isHorizontalSwipe: a }, l) => {
          var u, p;
          const { options: d } = this;
          if (!d.xoVertical) {
            if (!this.lockScroll(a)) return;
            l.preventDefault();
          }
          const { slideLength: h } = et(this.providerElement.xoName);
          if (
            ((this.isThumbMoving = !0),
            this.prevThumbDx == null &&
              (this.prevThumbDx = -this.slideSize * this.activeIndex),
            this.prevThumbDy == null && (this.prevThumbDy = 0),
            d.xoVertical
              ? (this.axis = at.Target)
              : j.any
              ? this.axis === at.Idle &&
                (Math.abs(t - this.prevThumbDx) >
                Math.abs(e - this.prevThumbDy) * 2.5
                  ? (this.axis = at.Target)
                  : (this.axis = at.Lock))
              : (this.axis = at.Target),
            this.axis === at.Target)
          ) {
            j.any &&
              window.scrollY !== this.prevScrollY &&
              this.thumbPanEnd({ dx: t, dy: e, vx: s, vy: n });
            const m = d.xoVertical ? e : this.withRtl(t),
              f = Z(m, -this.slideSize * (h - d.xoPerView), 0);
            this.setTranslate(f),
              d.xoVertical
                ? (u = this.thumbPan) == null || u.setValue({ dx: 0, dy: f })
                : (p = this.thumbPan) == null || p.setValue({ dx: f, dy: 0 }),
              (this.prevThumbTranslate = f);
          }
        }
      );
      o(this, "thumbPanEnd", ({ vx: t, vy: e }) => {
        const { options: s } = this,
          { slideLength: n } = et(this.providerElement.xoName),
          a = s.xoVertical ? e : this.withRtl(t);
        this.thumbAnimated({
          from: this.prevThumbTranslate,
          to: this.prevThumbTranslate + a * 10,
          duration: s.xoSpeed,
          easing: R.easeOutQuad,
          onUpdate: (l) => {
            if (this.isThumbMoving) {
              const d = Z(l, -this.slideSize * (n - s.xoPerView), 0);
              this.setTranslate(d);
            }
          },
          onEnd: (l) => {
            const d = Z(l, -this.slideSize * (n - s.xoPerView), 0);
            this.thumbPan &&
              this.isThumbMoving &&
              (s.xoVertical
                ? (this.thumbPan.setValue({ dx: 0, dy: d }),
                  (this.prevThumbDx = 0),
                  (this.prevThumbDy = d))
                : (this.thumbPan.setValue({ dx: d, dy: 0 }),
                  (this.prevThumbDx = this.withRtl(d)),
                  (this.prevThumbDy = 0))),
              (this.axis = at.Idle),
              clearTimeout(this.timeoutId),
              (this.timeoutId = window.setTimeout(() => {
                this.style.removeProperty("touch-action");
              }, 300)),
              this.isThumbMoving && (this.prevThumbTranslate = d),
              (this.isThumbMoving = !1),
              (this.prevScrollY = window.scrollY);
          },
        }),
          (this.isHorizontalSwipeState = void 0);
      });
      o(this, "frameAutoPlay", () => {
        if (this.providerElement && !this.isThumbnail) {
          const t = this.providerElement.xoName,
            { options: e } = this;
          this.tempStop
            ? (this.autoPlayStart = Date.now())
            : ((this.autoPlayNext = Date.now()),
              this.autoPlayNext - this.autoPlayStart >= e.xoAutoplay &&
                (Ae(t, e.xoPerMove), (this.autoPlayStart = Date.now())));
        }
      });
      o(this, "removeFrameAutoPlay", () => {
        K.remove(this.frameAutoPlay);
      });
      o(this, "handlePause", () => {
        (this.autoPlayNext = Date.now()), (this.tempStop = !0);
      });
      o(this, "handlePauseHover", () => {
        const { options: t } = this;
        t.xoHoverPause && this.handlePause();
      });
      o(this, "handleAutoPlay", () => {
        this.tempStop = !1;
      });
      o(this, "handleActiveSlide", (t) => {
        let e = -1,
          s = 0;
        const { options: n, activeIndex: a } = this,
          { slideLength: l } = et(this.providerElement.xoName),
          d = n.xoLoop && n.xoType === "slide" ? a - n.xoPerView * 2 : a,
          h = this.isThumbnail && t != null ? t : d;
        v(Array.from(this.children), async (u) => {
          if (
            u.tagName.toLowerCase() === c.CarouselSlide &&
            !x.get(u, "xo-cloned")
          )
            if (
              (e++,
              (u.index = e),
              u.setAttribute(
                "aria-label",
                `${e + 1} / ${
                  n.xoLoop && n.xoType === "slide" ? l - n.xoPerView * 4 : l
                }`
              ),
              u.setAttribute("role", "tabpanel"),
              d === e ? x.set(u, "xo-active", !0) : x.set(u, "xo-active", !1),
              e >= h && e < h + n.xoPerView)
            )
              if ((x.set(u, "xo-visible", !0), n.xoAutoheight)) {
                if (u.children[0] instanceof HTMLElement) {
                  t || (await T(500));
                  const p = Zl(u.children[0]);
                  if (s < p) {
                    s = p;
                    const m = this.closest(c.CarouselInner),
                      f = m == null ? void 0 : m.closest(c.CarouselThumbnail);
                    m &&
                      !f &&
                      ((m.style.height = `${s}px`),
                      (m.style.transition = `height ${n.xoSpeed}ms`));
                  }
                }
              } else {
                const p = this.closest(c.CarouselInner);
                p && !n.xoVertical && p.style.removeProperty("height");
              }
            else x.set(u, "xo-visible", !1);
        });
      });
      o(this, "setContainerSize", () => {
        this.parentElement &&
          jl(
            this.providerElement.xoName,
            this.parentElement.offsetWidth,
            this.parentElement.offsetHeight
          );
      });
      o(
        this,
        "handleResize",
        rt((t) => {
          for (let e of t) {
            const s = e.contentRect.width;
            s !== this.prevWidth &&
              (this.disconnectedCallback(),
              this.connectedCallback(),
              (this.prevWidth = s));
          }
        }, vs)
      );
      o(
        this,
        "handleWindowResize",
        rt(
          ge("x", () => {
            Nt(this.providerElement.xoName, 0, !1);
          }),
          vs
        )
      );
      o(this, "handleIntersection", (t) => {
        for (const e of t) e.isIntersecting && this.handleActiveSlide();
      });
      o(this, "handleAnchor", (t) => {
        this.isMove && t.preventDefault();
      });
      o(this, "bindAnchor", () => {
        (this.anchorEls = Array.from(this.querySelectorAll("a"))),
          v(this.anchorEls, (t) => {
            t.addEventListener("click", this.handleAnchor);
          });
      });
      o(this, "handleLoop", () => {
        const { xoPerView: t, xoLoop: e, xoType: s } = this.options;
        !e || (s === "slide" && Kl(this, t));
      });
      o(this, "removeSlideCloned", () => {
        v(Array.from(this.children), (t) => {
          t.tagName.toLowerCase() === c.CarouselSlide &&
            x.get(t, "xo-cloned") &&
            this.removeChild(t);
        });
      });
      o(this, "handleSlideClick", () => {
        this.options.xoStopAutoplayOnInteraction && this.removeFrameAutoPlay();
      });
      o(this, "handleWheel", (t) => {
        const { xoPerView: e, xoVertical: s } = this.options;
        s ||
          (!this.wheelStarting &&
            Math.abs(t.deltaX) > Math.abs(t.deltaY) &&
            (t.deltaX > 0
              ? Ae(this.providerElement.xoName, e)
              : bs(this.providerElement.xoName, e)),
          (this.wheelStarting = !0),
          clearTimeout(this.wheelEndTimeId),
          (this.wheelEndTimeId = window.setTimeout(() => {
            this.wheelStarting = !1;
          }, 50)));
      });
      o(this, "reset", () => {
        var t, e, s, n;
        this.unsubscribe(),
          this.removeFrameAutoPlay(),
          this.removeSlideCloned(),
          (t = this.pan) == null || t.destroy(),
          (e = this.thumbPan) == null || e.destroy(),
          clearTimeout(this.timeoutId),
          clearTimeout(this.wheelEndTimeId),
          this.animated.off(),
          this.snakeAnimated.off(),
          (s = this.resizeObserver) == null || s.disconnect(),
          (n = this.intersectionObserver) == null || n.disconnect(),
          this.providerElement &&
            (this.providerElement.removeEventListener(
              "click",
              this.handleSlideClick
            ),
            this.providerElement.removeEventListener(
              "mouseenter",
              this.handlePauseHover
            ),
            this.providerElement.removeEventListener(
              "mouseleave",
              this.handleAutoPlay
            ),
            this.providerElement.removeEventListener(
              "touchstart",
              this.handlePauseHover
            ),
            this.providerElement.removeEventListener(
              "touchend",
              this.handleAutoPlay
            ),
            this.providerElement.removeEventListener(
              "wheel",
              this.handleWheel
            )),
          v(this.anchorEls, (a) => {
            a.removeEventListener("click", this.handleAnchor);
          }),
          j.any ||
            window.removeEventListener("resize", this.handleWindowResize);
      });
    }
    get providerElement() {
      return this.closest(c.Carousel);
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    get slideSize() {
      const { slideLength: t } = et(this.providerElement.xoName);
      return this.options.xoVertical
        ? this.scrollHeight / t
        : this.scrollWidth / t;
    }
    getContainerSize() {
      const { containerWidth: t, containerHeight: e } = et(
        this.providerElement.xoName
      );
      return this.options.xoVertical ? e : t;
    }
    get isThumbnail() {
      return !!this.closest(c.CarouselThumbnail);
    }
    get options() {
      return this._options;
    }
    set options(t) {
      this._options = t;
    }
    get activeIndex() {
      const { activeIndex: t, thumbnailActiveIndex: e } = et(
        this.providerElement.xoName
      );
      return this.isThumbnail ? e : t;
    }
    getDxy({ dx: t, dy: e, vx: s, vy: n }) {
      return this.options.xoVertical
        ? { d: e, v: Math.abs(n) }
        : { d: this.withRtl(t), v: Math.abs(s) };
    }
    async connectedCallback() {
      if ((await T(100), !this.providerElement)) return;
      this.reset(),
        this.setOptions(),
        this.handleLoop(),
        this.setContainerSize(),
        (this.resizeObserver = new ResizeObserver(this.handleResize)),
        this.resizeObserver.observe(this.providerElement),
        j.any || window.addEventListener("resize", this.handleWindowResize),
        this.providerElement.addEventListener("click", this.handleSlideClick);
      const { options: t } = this;
      if (
        (t.xoAutoheight &&
          ((this.intersectionObserver = new IntersectionObserver(
            this.handleIntersection
          )),
          this.intersectionObserver.observe(this)),
        this.handleSlide(0),
        this.isThumbnail)
      )
        this.thumbPan = Kt({
          element: this,
          onStart: () => {
            this.style.touchAction = "none";
          },
          onMove: this.thumbPanMove,
          onEnd: this.thumbPanEnd,
        });
      else {
        const { slideLength: e } = et(this.providerElement.xoName);
        if (e <= t.xoPerView && !this.isThumbnail) return;
        this.pan = Kt({
          element: this,
          onStart: (s) => {
            s.target.closest("model-viewer") ||
              ((this.isMove = !1),
              (this.autoPlayStart = Date.now()),
              (this.tempStop = !0),
              (this.startClientX =
                s instanceof MouseEvent ? s.clientX : s.touches[0].clientX),
              (this.style.touchAction = "none"));
          },
          onMove: t.xoSnake ? void 0 : this.panMove,
          onEnd: (s, n) => {
            const a = n.target.closest(c.CarouselNext),
              l = n.target.closest(c.CarouselPrev);
            a ||
              l ||
              n.target.closest("model-viewer") ||
              (this.panEnd(s, n), (this.isHorizontalSwipeState = void 0));
          },
        });
      }
      t.xoAutoplay && K.add(this.frameAutoPlay, !0),
        this.handleActiveSlide(),
        this.bindAnchor(),
        (this.unsubscribe = Vt(this.providerElement.xoName, this.listener)),
        this.providerElement.addEventListener(
          "mouseenter",
          this.handlePauseHover
        ),
        this.providerElement.addEventListener(
          "mouseleave",
          this.handleAutoPlay
        ),
        j.any &&
          (this.providerElement.addEventListener(
            "touchstart",
            this.handlePauseHover
          ),
          this.providerElement.addEventListener(
            "touchend",
            this.handleAutoPlay
          )),
        this.providerElement.addEventListener("wheel", this.handleWheel),
        x.set(this.providerElement, "xo-initialized", !0),
        (this.initialized = !0);
    }
    async attributeChangedCallback(t, e, s) {
      t === "xo-observed" &&
        e !== s &&
        (await T(100), this.connectedCallback());
    }
    disconnectedCallback() {
      this.reset();
    }
  }
  class tc extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "index", 0);
      o(this, "handleClick", () => {
        const t = this.closest(c.CarouselList);
        if (!(t != null && t.isThumbMoving)) {
          const { xoName: e } = this.providerElement;
          Nt(e, this.index, !0);
        }
      });
    }
    get providerElement() {
      return this.closest(c.Carousel);
    }
    get isThumbnail() {
      return !!this.closest(c.CarouselThumbnail);
    }
    connectedCallback() {
      !this.providerElement ||
        (this.isThumbnail &&
          (this.tabIndex === -1 && (this.tabIndex = 0),
          j.any
            ? this.addEventListener("touchend", this.handleClick)
            : this.addEventListener("click", this.handleClick)));
    }
    disconnectedCallback() {
      !this.providerElement ||
        (this.unsubscribe(),
        this.isThumbnail &&
          (j.any
            ? this.removeEventListener("touchend", this.handleClick)
            : this.removeEventListener("click", this.handleClick)));
    }
  }
  class ec extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(
        this,
        "setAttrDisabled",
        ({ options: t, activeIndex: e, slideLength: s }) => {
          t.xoLoop ||
            (!t.xoRewind && e === s - t.xoPerView
              ? x.set(this, "xo-disabled", !0)
              : x.set(this, "xo-disabled", !1)),
            s <= t.xoPerView
              ? x.set(this, "xo-hide", !0)
              : x.set(this, "xo-hide", !1);
        }
      );
      o(this, "listener", (t) => {
        this.setAttrDisabled(t);
      });
      o(this, "nextSlide", (t) => {
        var n;
        if (!this.providerElement) return;
        this.closest("a") && t.preventDefault();
        const { options: e } = et(this.providerElement.xoName),
          s = Date.now();
        if (
          !(s - Xn() < e.xoSpeed + 100) &&
          (Un(s), Ae(this.providerElement.xoName, e.xoPerMove), e.xoSnake)
        ) {
          const a =
            (n = this.providerElement) == null
              ? void 0
              : n.querySelector(c.CarouselList);
          a && (a.isNextForSnake = !0);
        }
      });
    }
    get providerElement() {
      return this.closest(c.Carousel);
    }
    async connectedCallback() {
      var e;
      if (
        ((e = window.xbEditor) != null && e.designMode && (await T(100)),
        !this.providerElement)
      )
        return;
      const t = et(this.providerElement.xoName);
      this.setAttrDisabled(t),
        this.addEventListener("click", this.nextSlide),
        (this.unsubscribe = Vt(this.providerElement.xoName, this.listener));
    }
    disconnectedCallback() {
      this.unsubscribe(), this.removeEventListener("click", this.nextSlide);
    }
  }
  class sc extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(
        this,
        "setAttrDisabled",
        ({ options: t, activeIndex: e, slideLength: s }) => {
          t.xoLoop ||
            (!t.xoRewind && e === 0
              ? x.set(this, "xo-disabled", !0)
              : x.set(this, "xo-disabled", !1)),
            s <= t.xoPerView
              ? x.set(this, "xo-hide", !0)
              : x.set(this, "xo-hide", !1);
        }
      );
      o(this, "listener", (t) => {
        this.setAttrDisabled(t);
      });
      o(this, "prevSlide", (t) => {
        var n;
        if (!this.providerElement) return;
        this.closest("a") && t.preventDefault();
        const { options: e } = et(this.providerElement.xoName),
          s = Date.now();
        if (
          !(s - Xn() < e.xoSpeed + 100) &&
          (Un(s), bs(this.providerElement.xoName, e.xoPerMove), e.xoSnake)
        ) {
          const a =
            (n = this.providerElement) == null
              ? void 0
              : n.querySelector(c.CarouselList);
          a && (a.isNextForSnake = !1);
        }
      });
    }
    get providerElement() {
      return this.closest(c.Carousel);
    }
    connectedCallback() {
      if (!this.providerElement) return;
      const t = et(this.providerElement.xoName);
      this.setAttrDisabled(t),
        this.addEventListener("click", this.prevSlide),
        (this.unsubscribe = Vt(this.providerElement.xoName, this.listener));
    }
    disconnectedCallback() {
      this.unsubscribe(), this.removeEventListener("click", this.prevSlide);
    }
  }
  class ic extends HTMLElement {
    constructor() {
      super(...arguments);
        this.renderedOnce = false;///////////////////////////////////////////////////Minhbeo//////////////////////////////////////////////////
      o(this, "unsubscribe", () => {});
      o(this, "listener", (t) => {
        this.renderBullet(t.slideLength, t.options);
      });
      o(this, "renderBullet", (t, e) => {
        const s = e.xoLoop && e.xoType === "slide" ? t - e.xoPerView * 4 : t,
          n = Array(Math.ceil(s / e.xoPerView)).fill(0);
         
        if (s <= e.xoPerView) {
          this.innerHTML = "";
          return;
        }
        this.innerHTML = ct(
          n,
    
          (a, l) => `
        <${c.CarouselBullet} xo-index="${l}" xo-page="${
            l + 1

          }" role="button" tabindex="0">
          
          ${e.xoRenderBullet}
        </${c.CarouselBullet}>
      `
        ).join("");

        if (!this.renderedOnce) { /////////////////////////////////////////////////////////////////////////Minhbeo/////////////////////////////////////////////////////////////////////////////////////////
        this.dispatchEvent(new CustomEvent("bullet-ready", { bubbles: true }));/////////////////////////////////////////////////////////////////////////Minhbeo////////////////////////////////////////////
        this.renderedOnce = true;/////////////////////////////////////////////////////////////////////////Minhbeo////////////////////////////////////////////////////////////////////////////////////
      }
      });
    }
    get providerElement() {
      return this.closest(c.Carousel);
    }
    async connectedCallback() {
      if ((await T(100), !this.providerElement)) return;
      const t = et(this.providerElement.xoName);
      this.renderBullet(t.slideLength, t.options),
        (this.unsubscribe = Vt(
          this.providerElement.xoName,
          this.listener,
          (e, s) => {
            var n, a;
            return It(
              (n = e[this.providerElement.xoName]) == null ? void 0 : n.options,
              (a = s[this.providerElement.xoName]) == null ? void 0 : a.options
            );
          }
        ));
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  let Gn = 0;
  class oc extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "circleEl", null);
      o(this, "listener", (t) => {
        this.handler(t);
      });
      o(
        this,
        "handler",
        async ({ activeIndex: t, options: e, slideLength: s }) => {
          var h;
          const n = Number((h = this.getAttribute("xo-index")) != null ? h : 0),
            a = e.xoLoop && e.xoType === "slide" ? s - e.xoPerView * 4 : s,
            l =
              e.xoLoop && e.xoType === "slide"
                ? Math.min(t - e.xoPerView * 2, a - e.xoPerView)
                : t,
            d = Math.ceil(l / e.xoPerView);
          await T(0),
            n === d
              ? (x.set(this, "xo-active", !0),
                Ee.animate(this.getCircleBarName(), {
                  duration: e.xoAutoplay,
                  value: 100,
                }))
              : (x.set(this, "xo-active", !1),
                Ee.animate(this.getCircleBarName(), {
                  duration: e.xoAutoplay,
                  value: 0,
                }));
        }
      );
      o(this, "handleClick", () => {
        var f, b;
        const { xoName: t } = this.getProviderElement(),
          { options: e, slideLength: s, activeIndex: n } = et(t),
          a = Date.now();
        if (a - Gn < e.xoSpeed + 200) return;
        Gn = a;
        const l = s % e.xoPerView,
          d = e.xoLoop && e.xoType === "slide" ? e.xoPerView * 2 : 0,
          h =
            Number((f = this.getAttribute("xo-index")) != null ? f : 0) *
              e.xoPerView +
            d,
          u = s - 1 - (e.xoPerView === 1 ? 0 : e.xoPerView - l);
        let p = Z(h, d, u);
        const m =
          (b = this.getProviderElement()) == null
            ? void 0
            : b.querySelector(c.CarouselList);
        Nt(t, h, !0), e.xoSnake && m && (m.isNextForSnake = p > n);
      });
      o(this, "getCircleBarName", () =>
        this.getProviderElement()
          ? `${this.getProviderElement().xoName}-${this.getAttribute(
              "xo-index"
            )}`
          : ""
      );
      o(this, "handleCircleBar", () => {
        (this.circleEl = this.querySelector(c.CircleBar)),
          this.circleEl &&
            this.circleEl.setAttribute("xo-name", this.getCircleBarName());
      });
    }
    getProviderElement() {
      return this.closest(c.Carousel);
    }
    connectedCallback() {
      const t = this.getProviderElement();
      if (!t) return;
      const e = et(t.xoName);
      this.handler(e),
        this.handleCircleBar(),
        this.addEventListener("click", this.handleClick),
        (this.unsubscribe = Vt(t.xoName, this.listener));
    }
    disconnectedCallback() {
      this.unsubscribe(), this.removeEventListener("click", this.handleClick);
    }
  }
  class nc extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "listener", ({ options: t, slideLength: e }) => {
        t.xoLoop
          ? (this.innerText = `${e - t.xoPerView * 4}`)
          : (this.innerText = `${e}`);
      });
    }
    get providerElement() {
      return this.closest(c.Carousel);
    }
    connectedCallback() {
      !this.providerElement ||
        (this.unsubscribe = Vt(this.providerElement.xoName, this.listener));
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class rc extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "listener", ({ options: t, activeIndex: e, slideLength: s }) => {
        const n = t.xoLoop && t.xoType === "slide" ? s - t.xoPerView * 4 : s,
          a =
            t.xoLoop && t.xoType === "slide"
              ? Math.min(e - t.xoPerView * 2, n - t.xoPerView)
              : e,
          l = Math.ceil(a / t.xoPerView);
        this.innerText = `${l + 1}`;
      });
    }
    get providerElement() {
      return this.closest(c.Carousel);
    }
    connectedCallback() {
      !this.providerElement ||
        (this.unsubscribe = Vt(this.providerElement.xoName, this.listener));
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  let jn =
    ((ii = class extends q {
      constructor() {
        super(...arguments);
        o(this, "carouselEls", []);
        o(this, "handleCarouselChange", (t) => {
          const { xoIndex: e } = this.props,
            { activeIndex: s } = t.detail;
          this.setProps({ xoActive: e === s });
        });
        o(this, "handleChange", (t) => {
          t.preventDefault(),
            v(this.carouselEls, (e) => {
              Nt(e.xoName, this.props.xoIndex, !0);
            });
        });
      }
      mount() {
        var n;
        const { xoType: t, xoCarouselSelector: e } = this.props,
          s = (n = this.closest(".shopify-section")) != null ? n : document;
        (this.carouselEls = Array.from(s.querySelectorAll(e))),
          this.addEventListener(
            t === "click" ? "click" : "mouseenter",
            this.handleChange
          ),
          v(this.carouselEls, (a) => {
            a.addEventListener("xo:carousel:change", this.handleCarouselChange);
          });
      }
      unmount() {
        const { xoType: t } = this.props;
        this.removeEventListener(
          t === "click" ? "click" : "mouseenter",
          this.handleChange
        ),
          v(this.carouselEls, (e) => {
            e.removeEventListener(
              "xo:carousel:change",
              this.handleCarouselChange
            );
          });
      }
    }),
    o(ii, "propTypes", {
      xoIndex: "number",
      xoType: "string",
      xoCarouselSelector: "string",
      xoActive: "boolean",
    }),
    o(ii, "defaultProps", {
      xoIndex: 0,
      xoType: "click",
      xoCarouselSelector: "xo-carousel",
      xoActive: !1,
    }),
    ii);
  jn = X([U(c.CarouselTrigger)], jn);
  const rp = "";
  Xl(), (window.xoCarousel = _n);
  const ac = _n;
  _({
    [c.Carousel]: Es,
    [c.CarouselThumbnail]: ws,
    [c.CarouselSlide]: tc,
    [c.CarouselNext]: ec,
    [c.CarouselPrev]: sc,
    [c.CarouselList]: Jl,
    [c.CarouselPagination]: ic,
    [c.CarouselBullet]: oc,
    [c.CarouselSize]: nc,
    [c.CarouselPage]: rc,
  });
  const Io = class extends HTMLElement {
    constructor() {
      super();
      o(this, "inputEl1", null);
      o(this, "inputEl2", null);
      o(this, "trackEl", null);
      o(this, "thumbEl1", null);
      o(this, "thumbEl2", null);
      o(this, "progressEl", null);
      o(this, "priceEls", []);
      o(this, "valueEls", []);
      o(this, "initialized", !1);
      o(this, "resizeObserver", null);
      o(this, "prevWidth", 0);
      o(this, "_value", [0, 100]);
      o(this, "min", 0);
      o(this, "max", 100);
      o(this, "createChildComponent", (t) => document.createElement(t));
      o(this, "createRange", (t) => {
        const {
            xoName: e,
            xoMin: s,
            xoMax: n,
            xoStep: a,
            xoValue: l,
          } = this.options,
          d = document.createElement("input");
        return (
          (d.type = "range"),
          (d.name = `${e}`),
          (d.min = `${s}`),
          (d.max = `${n}`),
          (d.step = `${a}`),
          (d.value = `${l[t]}`),
          d.addEventListener("input", this.handleInput),
          d.addEventListener("click", this.handleInput),
          d.addEventListener("mouseup", this.handleChangeEnd),
          d.addEventListener("touchend", this.handleChangeEnd),
          d
        );
      });
      o(this, "handleInput", (t) => {
        var n, a, l, d;
        const e =
            (a = Number((n = this.inputEl1) == null ? void 0 : n.value)) != null
              ? a
              : 0,
          s =
            (d = Number((l = this.inputEl2) == null ? void 0 : l.value)) != null
              ? d
              : 0;
        if (this.inputEl1 && t.target === this.inputEl1 && e >= s) {
          this.inputEl1.value = `${s}`;
          return;
        }
        if (this.inputEl2 && t.target === this.inputEl2 && s <= e) {
          this.inputEl2.value = `${e}`;
          return;
        }
        this.setAttribute("xo-value", `[${e}, ${s}]`),
          this.dispatchEvent(
            new CustomEvent("change", {
              bubbles: !0,
              detail: { value: [e, s] },
            })
          );
      });
      o(this, "handler", ([t, e]) => {
        if (
          !this.inputEl1 ||
          !this.inputEl2 ||
          !this.thumbEl1 ||
          !this.thumbEl2 ||
          !this.progressEl
        )
          return;
        const {
          xoMin: s,
          xoMax: n,
          xoName: a,
          xoComponentName: l,
        } = this.options;
        this.inputEl1.setAttribute("value", `${t}`),
          (this.inputEl1.value = `${t}`),
          this.inputEl2.setAttribute("value", `${e}`),
          (this.inputEl2.value = `${e}`),
          this.inputEl1.setAttribute("name", `${a[0]}`),
          this.inputEl2.setAttribute("name", `${a[1]}`),
          v(this.priceEls, (u) => {
            var m, f, b;
            const p =
              (b =
                (f =
                  (m = u.closest(c.Filters)) == null
                    ? void 0
                    : m.getAttribute("xo-money-format")) != null
                  ? f
                  : u.getAttribute("xo-money-format")) != null
                ? b
                : "";
            u.getAttribute("xo-component-name") === l &&
              (u.getAttribute("xo-type") === "min"
                ? (u.innerHTML = p.replace(/{.*}|(\d+(,|\.)?)+/g, `${t}`))
                : u.getAttribute("xo-type") === "max" &&
                  (u.innerHTML = p.replace(/{.*}|(\d+(,|\.)?)+/g, `${e}`)));
          }),
          v(this.valueEls, (u) => {
            u.getAttribute("xo-component-name") === l &&
              (u.getAttribute("xo-type") === "min"
                ? (u.setAttribute("value", `${t}`), (u.value = `${t}`))
                : u.getAttribute("xo-type") === "max" &&
                  (u.setAttribute("value", `${e}`), (u.value = `${e}`)));
          });
        const d = D({
            value: t,
            inputRange: [s, n],
            outputRange: [0, this.offsetWidth - this.thumbEl1.offsetWidth],
          }),
          h = D({
            value: e,
            inputRange: [s, n],
            outputRange: [0, this.offsetWidth - this.thumbEl2.offsetWidth],
          });
        (this.thumbEl1.style.transform = `translateX(${d}px)`),
          (this.thumbEl2.style.transform = `translateX(${h}px)`),
          (this.progressEl.style.transform = `translateX(${d}px)`),
          (this.progressEl.style.width = `${h - d}px`);
      });
      o(this, "handleValueInput", (t) => {
        const e = t.currentTarget,
          s = Number(e.value),
          n = 10;
        if (s !== null) {
          if (e.getAttribute("xo-type") === "min") {
            const a = e.value ? Math.min(s, this.value[1] - n) : 0;
            this.value = [a, this.value[1]];
          } else if (e.getAttribute("xo-type") === "max") {
            const a = e.value ? Math.max(s, this.value[0] + n) : 0;
            this.value = [this.value[0], a];
          }
          this.handleChangeEnd();
        }
      });
      o(this, "handleChangeEnd", () => {
        this.dispatchEvent(
          new CustomEvent("changed", {
            bubbles: !0,
            detail: { value: this.value },
          })
        );
      });
      o(this, "setSize", () => {
        this.style.setProperty("--size", `${this.thumbEl1.offsetHeight}`);
      });
      this.innerHTML = "";
    }
    get options() {
      const t = M(this, {
        pick: [
          "xoComponentName",
          "xoName",
          "xoMin",
          "xoMax",
          "xoStep",
          "xoValue",
        ],
        types: {
          xoComponentName: "string",
          xoName: "array",
          xoMin: "number",
          xoMax: "number",
          xoStep: "number",
          xoValue: "array",
        },
      });
      return { ...Io.defaultOptions, ...t };
    }
    get value() {
      return this._value;
    }
    set value(t) {
      (this._value = t), this.setAttribute("xo-value", `[${t[0]}, ${t[1]}]`);
    }
    static get observedAttributes() {
      return ["xo-value", "xo-observed"];
    }
    async connectedCallback() {
      const {
        xoValue: t,
        xoMin: e,
        xoMax: s,
        xoComponentName: n,
      } = this.options;
      (this.innerHTML = ""),
        (this.inputEl1 = this.appendChild(this.createRange(0))),
        (this.inputEl2 = this.appendChild(this.createRange(1))),
        (this.trackEl = this.appendChild(
          this.createChildComponent(c.RangeTrack)
        )),
        (this.thumbEl1 = this.appendChild(
          this.createChildComponent(c.RangeThumb)
        )),
        (this.thumbEl2 = this.appendChild(
          this.createChildComponent(c.RangeThumb)
        )),
        (this.progressEl = this.trackEl.appendChild(
          this.createChildComponent(c.RangeProgress)
        )),
        await T(0),
        this.thumbEl1.setAttribute("xo-index", "0"),
        this.thumbEl2.setAttribute("xo-index", "1"),
        (this.value = t),
        this.setSize(),
        (this.min = e),
        (this.max = s),
        (this.priceEls = Array.from(
          document.querySelectorAll(`${c.RangePrice}[xo-component-name=${n}]`)
        )),
        (this.valueEls = Array.from(
          document.querySelectorAll(`input[xo-component-name=${n}]`)
        )),
        this.handler(this.value),
        v(this.valueEls, (a) => {
          a.getAttribute("xo-component-name") === n &&
            a.addEventListener("input", this.handleValueInput);
        }),
        (this.resizeObserver = new ResizeObserver((a) => {
          for (let l of a) {
            const d = l.contentRect.width;
            d !== this.prevWidth &&
              (this.setSize(), this.handler(this.value), (this.prevWidth = d));
          }
        })),
        this.resizeObserver.observe(this);
    }
    attributeChangedCallback(t, e, s) {
      if (((e != null && s != null) || t === "xo-observed") && e !== s) {
        const n = dt(s);
        (this.value = n),
          this.handler(n),
          this.initialized &&
            this.dispatchEvent(
              new CustomEvent("change", { bubbles: !0, detail: { value: n } })
            ),
          (this.initialized = !0);
      }
    }
    disconnectedCallback() {
      var t;
      !this.inputEl1 ||
        !this.inputEl2 ||
        (this.inputEl1.removeEventListener("input", this.handleInput),
        this.inputEl2.removeEventListener("input", this.handleInput),
        this.inputEl1.removeEventListener("mouseup", this.handleChangeEnd),
        this.inputEl2.removeEventListener("mouseup", this.handleChangeEnd),
        this.inputEl1.removeEventListener("touchend", this.handleChangeEnd),
        this.inputEl2.removeEventListener("touchend", this.handleChangeEnd),
        this.inputEl1.removeEventListener("click", this.handleInput),
        this.inputEl2.removeEventListener("click", this.handleInput),
        v(this.valueEls, (e) => {
          e.removeEventListener("input", this.handleValueInput);
        }),
        (t = this.resizeObserver) == null || t.disconnect());
    }
  };
  let Cs = Io;
  o(Cs, "defaultOptions", {
    xoComponentName: "xo-range",
    xoName: ["", ""],
    xoMin: 0,
    xoMax: 100,
    xoStep: 1,
    xoValue: [0, 100],
  });
  const ap = "";
  _({ [c.Range]: Cs });
  function lc() {
    g.create("xo-filters", {
      initialState: {
        fieldInfo: {},
        formData: new FormData(),
        refine: [],
        status: "idle",
        html: "",
        prevHtml: "",
        priceMax: 0,
        priceMin: 0,
        sectionId: "",
      },
    });
  }
  function cc(r, i) {
    g.set("xo-filters", (t) => ({ ...t, priceMin: r, priceMax: i }))(
      "xo-filters/setPriceMinMax"
    );
  }
  function dc(r) {
    g.set("xo-filters", (i) => ({ ...i, sectionId: r }))(
      "xo-filters/setSectionId"
    );
  }
  function hc() {
    const r = new URL(window.location.href),
      i = yt.parse(r.search),
      t = new FormData();
    v(i, ([e, s]) => {
      t.append(e, s);
    }),
      g.set(
        "xo-filters",
        (e) => (
          Number(t.get("filter.v.price.gte")) === e.priceMin &&
            Number(t.get("filter.v.price.lte")) === e.priceMax &&
            (t.delete("filter.v.price.gte"), t.delete("filter.v.price.lte")),
          { ...e, formData: ke(t) }
        )
      )("xo-filters/setDefaultFormData");
  }
  function Ss() {
    g.set("xo-filters", (r) => {
      const { formData: i } = r,
        t = Array.from(ke(i)),
        e = wt(
          Array.from(t),
          (s, [n, a]) =>
            a === "" || a == null ? s : [...s, { name: n, value: a }],
          []
        );
      return { ...r, refine: e };
    })("xo-filters/setRefine");
  }
  function uc(r) {
    const i = r instanceof FormData ? r : new FormData(r);
    g.set(
      "xo-filters",
      (t) => (
        Number(i.get("filter.v.price.gte")) === t.priceMin &&
          Number(i.get("filter.v.price.lte")) === t.priceMax &&
          (i.delete("filter.v.price.gte"), i.delete("filter.v.price.lte")),
        { ...t, formData: ke(i) }
      )
    )("xo-filters/setFormData");
  }
  function pc(r, i) {
    g.set("xo-filters", (t) => {
      const { formData: e } = t;
      return e.append(r, i), { ...t, formData: e };
    })("xo-filters/pushFormDataItem");
  }
  function Te(r, i, t) {
    g.set("xo-filters", (e) => {
      const { formData: s } = e;
      return s.set(r, i), t || s.delete("page"), { ...e, formData: s };
    })("xo-filters/updateFormDataItem");
  }
  function Ps(r, i) {
    const t = i != null;
    g.set("xo-filters", (e) => {
      const { formData: s } = e;
      s.delete("page");
      const n = Array.from(ke(s)),
        a = wt(
          n,
          (l, [d, h]) => {
            if (t) {
              if (d === r && h === i) return l;
            } else if (d === r) return l;
            return l.append(d, h), l;
          },
          new FormData()
        );
      return { ...e, formData: a };
    })("xo-filters/removeFormDataItem");
  }
  function Qn(r, i) {
    const t = i != null;
    g.set("xo-filters", (e) => ({
      ...e,
      refine: Rt(e.refine, (s) =>
        t ? !(s.name === r && s.value === i) : s.name !== r
      ),
    }))("xo-filters/removeRefineItem");
  }
  function mc() {
    g.set("xo-filters", (r) => {
      const { formData: i } = r,
        t = i.get("q"),
        e = new FormData();
      return t && e.append("q", t), { ...r, refine: [], formData: e };
    })("xo-filters/removeAllRefineAndFormData");
  }
  const de = new Map();
  async function Zn(r) {
    de.size > 10 && de.delete(de.keys().next().value);
    try {
      if (
        (g.set("xo-filters", (i) => ({ ...i, status: "request" }))(
          "xo-filters/getHtml/request"
        ),
        de.has(r))
      )
        await T(10),
          g.set("xo-filters", (i) => ({
            ...i,
            status: "success",
            html: de.get(r),
            prevHtml: i.html,
          }))("xo-filters/getHtml/success");
      else {
        const t = await (await fetch(r)).text();
        de.set(r, t),
          g.set("xo-filters", (e) => ({
            ...e,
            status: "success",
            html: t,
            prevHtml: e.html,
          }))("xo-filters/getHtml/success");
      }
    } catch {
      g.set("xo-filters", (i) => ({ ...i, status: "failure" }))(
        "xo-filters/getHtml/failure"
      );
    }
  }
  function fc() {
    g.set("xo-filters", (r) => ({ ...r, status: "idle" }))(
      "xo-filters/resetStatus"
    );
  }
  function Ct() {
    return g.get("xo-filters");
  }
  function Ot(r, i) {
    return g.subscribe("xo-filters", r, i);
  }
  const vt = {
    sort: "sort_by",
    page: "page",
    price: "['filter.v.price.gte', 'filter.v.price.lte']",
  };
  function xt(r, i) {
    if (!r) return !1;
    const t = r.tagName.toLowerCase();
    return t === "input" ? r.getAttribute("type") === i : t === i;
  }
  function xc(r) {
    if (
      r.children.length !== 1 &&
      !/input|select|xo-range/g.test(r.children[0].tagName.toLowerCase())
    )
      throw new Error(
        `${c.FiltersField}: field must have one child and it must be an input, select or ${c.Range}`
      );
  }
  function ke(r) {
    var e, s;
    if (!r.get("filter.v.price.gte")) return r;
    const i = (e = Number(r.get("filter.v.price.gte"))) != null ? e : 0,
      t = (s = Number(r.get("filter.v.price.lte"))) != null ? s : 0;
    return (
      r.delete("filter.v.price.gte"),
      r.delete("filter.v.price.lte"),
      r.set(vt.price, `[${i}, ${t}]`),
      r
    );
  }
  function Kn(r) {
    if (!r.get(vt.price)) return r;
    const i = r.get(vt.price);
    r.delete(vt.price);
    const [t, e] = dt(i);
    return (
      r.set("filter.v.price.gte", String(t)),
      r.set("filter.v.price.lte", String(e)),
      r
    );
  }
  function gc() {
    const { formData: r } = Ct(),
      i = new URL(window.location.href.replace(window.location.search, ""));
    (i.search = yt.stringify(Kn(r))),
      i.href !== window.location.href &&
        window.history.pushState(null, "", i.href);
  }
  async function Yi() {
    const { formData: r, sectionId: i } = Ct(),
      t = new URL(window.location.href.replace(window.location.search, ""));
    (t.search = yt.stringify(Kn(r))),
      await Zn(
        i
          ? t.href.includes("?")
            ? `${t.href}&section_id=${i}`
            : `${t.href}?section_id=${i}`
          : t.href
      ),
      t.href !== window.location.href &&
        window.history.pushState(null, "", t.href);
  }
  function bc(r) {
    let i = -1;
    return (
      "requestIdleCallback" in window
        ? (i = requestIdleCallback(() => {
            r(), cancelIdleCallback(i);
          }))
        : (i = setTimeout(() => {
            r(), clearTimeout(i);
          }, 0)),
      i
    );
  }
  function yc(r) {
    "requestIdleCallback" in window ? cancelIdleCallback(r) : clearTimeout(r);
  }
  function vc() {
    let r = 0;
    const i = () => {
        var l;
        const s = "::disabled",
          n = document.querySelector(c.Filters),
          a = document.querySelector(c.FiltersMobile);
        if (n && a) {
          const d = Array.from(
              a.querySelectorAll(`${c.FiltersField} input[type="radio"]`)
            ),
            h = Array.from(
              n.querySelectorAll(`${c.FiltersField} input[type="radio"]`)
            ).filter((f) => !f.closest(c.FiltersMobile)),
            p =
              (l = M(a, {
                pick: ["xoMobileMaxWidth"],
                types: { xoMobileMaxWidth: "number" },
              }).xoMobileMaxWidth) != null
                ? l
                : 767;
          window.innerWidth <= p || j.any
            ? (v(d, (f) => {
                const b = f.getAttribute("name");
                b &&
                  (f.hasAttribute("checked") && (f.checked = !0),
                  f.setAttribute("name", b.replace(s, "")));
              }),
              v(h, (f) => {
                const b = f.getAttribute("name");
                b &&
                  !b.includes(s) &&
                  ((f.checked = !1), f.setAttribute("name", b + s));
              }))
            : (v(h, (f) => {
                const b = f.getAttribute("name");
                b &&
                  (f.hasAttribute("checked") && (f.checked = !0),
                  f.setAttribute("name", b.replace(s, "")));
              }),
              v(d, (f) => {
                const b = f.getAttribute("name");
                b &&
                  !b.includes(s) &&
                  ((f.checked = !1), f.setAttribute("name", b + s));
              }));
        }
      },
      t = rt((s) => {
        for (let n of s) {
          const a = n.contentRect.width;
          a !== r && (i(), (r = a));
        }
      }, 300);
    i(), new ResizeObserver(t).observe(document.body);
  }
  const Ec = Xe()`
  ${c.StickyInner} {
    position: relative;
  }
  ${c.StickyInner}[xo-is-sticky] {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: all 0.3s;
    backface-visibility: hidden;
  }
  ${c.StickyInner}[xo-lock] {
    transform: translateY(0) !important;
  }
  ${c.StickyContent} {
    display: block;
  }
  ${c.StickyInner}[xo-hidden] {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
`;
  function wc() {
    g.create("xo-sticky", { initialState: { topNodes: [], bottomNodes: [] } });
  }
  function Bt(r) {
    const i = g.get("xo-sticky");
    return r === "top" ? i.topNodes : i.bottomNodes;
  }
  function As(r) {
    return r === "top" ? "topNodes" : "bottomNodes";
  }
  function Cc(r, i, t) {
    g.set("xo-sticky", (e) => {
      const s = Bt(t),
        n = s.find((d) => d.element === r),
        a = {
          element: r,
          height: r.offsetHeight,
          isSticky: !1,
          direction: i,
          directionDownHide: !1,
        },
        l = n ? s : t === "top" ? [...s, a] : [a, ...s];
      return { ...e, [As(t)]: l };
    });
  }
  function Sc(r, i) {
    g.set("xo-sticky", (t) => {
      const e = Bt(i),
        s = Rt(e, (n) => n.element !== r);
      return { ...t, [As(i)]: s };
    });
  }
  function zt(r, i, t) {
    g.set("xo-sticky", (e) => {
      const s = Bt(t);
      return {
        ...e,
        [As(t)]: ct(s, (n) => (n.element === r ? { ...n, isSticky: i } : n)),
      };
    });
  }
  function he(r, i, t) {
    g.set("xo-sticky", (e) => {
      const s = Bt(t);
      return {
        ...e,
        [As(t)]: ct(s, (n) =>
          n.element === r ? { ...n, directionDownHide: i } : n
        ),
      };
    });
  }
  const Jn = new Map();
  function Gi(r, i) {
    var a;
    const t = Bt(i),
      e = Di(t, (l) => l.element === r),
      s = Rt(t, (l, d) => d < e && l.isSticky),
      n = wt(s, (l, d) => l + d.height, 0);
    return Jn.set(r, n), (a = Jn.get(r)) != null ? a : 0;
  }
  function tr(r, i) {
    const t = Bt(i),
      e = Di(t, (s) => s.element === r);
    return wt(
      t,
      (s, n, a) =>
        a < e && n.direction === "up" && n.isSticky ? s + n.height : s,
      0
    );
  }
  function ji(r) {
    const i = Bt(r);
    return wt(
      i,
      (e, s) => (s.directionDownHide ? e : s.isSticky ? e + s.height : e),
      0
    );
  }
  function er(r, i) {
    return g.subscribe("xo-sticky", r, i);
  }
  const Do = class extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "frameId", -1);
      o(this, "shadow", null);
      o(this, "innerEl");
      o(this, "contentEl");
      o(this, "prevScrollY", window.scrollY);
      o(this, "_options");
      o(this, "setOptions", () => {
        this.options = M(this, {
          pick: ["xoDirection", "xoPlacement", "xoDisabled", "xoName"],
          types: {
            xoDirection: "string",
            xoPlacement: "string",
            xoDisabled: "boolean",
            xoName: "string",
          },
        });
      });
      o(this, "addSticky", () => {
        const { xoPlacement: t } = this.options,
          e = Gi(this.contentEl, t);
        x.set(this.innerEl, "xo-is-sticky", !0),
          t === "top"
            ? (this.innerEl.style.top = `${e}px`)
            : (this.innerEl.style.bottom = `${e}px`);
      });
      o(this, "removeStick", () => {
        const { xoPlacement: t } = this.options;
        x.set(this.innerEl, "xo-is-sticky", !1),
          t === "top"
            ? this.innerEl.style.removeProperty("top")
            : this.innerEl.style.removeProperty("bottom");
      });
      o(this, "handleStickyTop", () => {
        const { xoDirection: t } = this.options,
          e = Gi(this.contentEl, "top"),
          s = tr(this.contentEl, "top"),
          { top: n } = this.getBoundingClientRect(),
          a = window.scrollY < this.prevScrollY,
          l = this.contentEl.offsetHeight;
        t === "up"
          ? a
            ? (n < e - l
                ? (this.addSticky(),
                  zt(this.contentEl, !0, "top"),
                  he(this.contentEl, !1, "top"),
                  x.set(this, "xo-is-sticky", !0))
                : n >= e &&
                  (this.removeStick(),
                  zt(this.contentEl, !1, "top"),
                  he(this.contentEl, !0, "top"),
                  x.set(this, "xo-is-sticky", !1)),
              (this.innerEl.style.transform = "translateY(0px)"))
            : (n < e - l &&
                (this.innerEl.style.transform = `translateY(-${l + e}px)`),
              he(this.contentEl, !0, "top"))
          : (n < e - s
              ? (this.addSticky(),
                zt(this.contentEl, !0, "top"),
                x.set(this, "xo-is-sticky", !0))
              : n >= e &&
                (this.removeStick(),
                zt(this.contentEl, !1, "top"),
                x.set(this, "xo-is-sticky", !1)),
            a
              ? (this.innerEl.style.transform = "translateY(0px)")
              : (this.innerEl.style.transform = `translateY(-${s}px)`));
      });
      o(this, "handleStickyBottom", () => {
        const { xoDirection: t } = this.options,
          e = Gi(this.contentEl, "bottom"),
          s = tr(this.contentEl, "bottom"),
          { top: n } = this.getBoundingClientRect(),
          a = window.scrollY < this.prevScrollY,
          l = this.contentEl.offsetHeight,
          d = n - window.innerHeight + l;
        t === "up"
          ? (d < e - s + l
              ? (this.addSticky(),
                zt(this.contentEl, !0, "bottom"),
                he(this.contentEl, !1, "bottom"),
                (this.innerEl.style.transform = "translateY(0px)"),
                a && x.set(this, "xo-is-sticky", !0))
              : d >= e + l &&
                (zt(this.contentEl, !1, "bottom"),
                he(this.contentEl, !0, "bottom"),
                (this.innerEl.style.transform = `translateY(${l + e}px)`),
                x.set(this, "xo-is-sticky", !1)),
            a ||
              ((this.innerEl.style.transform = `translateY(${l + e}px)`),
              he(this.contentEl, !0, "bottom")))
          : (d < e - s
              ? (this.addSticky(),
                zt(this.contentEl, !0, "bottom"),
                x.set(this, "xo-is-sticky", !0))
              : d >= e &&
                (this.removeStick(),
                zt(this.contentEl, !1, "bottom"),
                x.set(this, "xo-is-sticky", !1)),
            a
              ? (this.innerEl.style.transform = "translateY(0px)")
              : (this.innerEl.style.transform = `translateY(${s}px)`));
      });
      o(this, "handleHidden", () => {
        const { xoName: t } = this.options,
          e = document.querySelector(`${c.StickyHidden}[xo-name="${t}"]`);
        if (e) {
          const { top: s } = e.getBoundingClientRect();
          x.set(this.innerEl, "xo-hidden", s < window.innerHeight);
        }
      });
      o(this, "handler", () => {
        this.frameId = requestAnimationFrame(() => {
          const { xoPlacement: t } = this.options,
            e = this.contentEl.offsetHeight;
          (this.contentEl.style.height = `${e}px`),
            (this.innerEl.style.height = `${e}px`),
            t === "top" ? this.handleStickyTop() : this.handleStickyBottom(),
            this.handleHidden(),
            (this.prevScrollY = window.scrollY);
        });
      });
      o(this, "render", () => {
        const { cssText: t } = Ec;
        return `
      <style>${t}</style>
      <${c.StickyInner} part="inner">
        <${c.StickyContent} part="content"><slot></slot></${c.StickyContent}>
      </${c.StickyInner}>
    `;
      });
      o(this, "init", async () => {
        const { xoDirection: t, xoPlacement: e } = this.options;
        (this.shadow = this.shadow || this.attachShadow({ mode: "open" })),
          this.shadow.innerHTML || (this.shadow.innerHTML = this.render()),
          (this.innerEl = this.shadow.querySelector(c.StickyInner)),
          (this.contentEl = this.shadow.querySelector(c.StickyContent)),
          await T(100),
          Cc(this.contentEl, t, e),
          e === "top" &&
            (this.style.height = `${this.contentEl.offsetHeight}px`),
          this.handler(),
          window.addEventListener("scroll", this.handler),
          window.addEventListener("resize", this.handler);
      });
    }
    get options() {
      return { ...Do.defaultOptions, ...this._options };
    }
    set options(t) {
      this._options = t;
    }
    static get observedAttributes() {
      return ["xo-observed", "xo-direction", "xo-placement"];
    }
    connectedCallback() {
      this.setOptions();
      const { xoDisabled: t } = this.options;
      t ||
        (this.init(),
        (this.unsubscribe = g.subscribe("xo-popover", (e) => {
          const s = re(e.data).find((d) => d.isOpen),
            n = !!(s != null && s.isOpen),
            a = s == null ? void 0 : s.triggerElement;
          (a == null ? void 0 : a.closest(c.Sticky))
            ? x.set(this.innerEl, "xo-lock", n && !!this.innerEl)
            : x.set(this.innerEl, "xo-lock", !1);
        })));
    }
    disconnectedCallback() {
      const { xoPlacement: t } = this.options;
      this.innerEl &&
        (this.innerEl.style.removeProperty("height"),
        this.innerEl.style.removeProperty("transform"),
        this.innerEl.style.removeProperty("top"),
        this.innerEl.style.removeProperty("bottom")),
        this.contentEl && this.contentEl.style.removeProperty("height"),
        this.style.removeProperty("height"),
        x.set(this, "xo-is-sticky", !1),
        this.innerEl && x.set(this.innerEl, "xo-is-sticky", !1),
        window.removeEventListener("scroll", this.handler),
        window.removeEventListener("resize", this.handler),
        cancelAnimationFrame(this.frameId),
        this.contentEl && Sc(this.contentEl, t),
        this.unsubscribe();
    }
    async attributeChangedCallback(t, e, s) {
      e !== s &&
        (this.disconnectedCallback(), await T(100), this.connectedCallback());
    }
  };
  let Ts = Do;
  o(Ts, "defaultOptions", {
    xoDirection: "up",
    xoPlacement: "top",
    xoDisabled: !1,
    xoName: "",
  });
  const No = class extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", null);
      o(this, "prevStickyHeight", 0);
    }
    get options() {
      const t = M(this, {
        pick: ["xoPlacement"],
        types: { xoPlacement: "string" },
      });
      return { ...No.defaultOptions, ...t };
    }
    connectedCallback() {
      const { xoPlacement: t } = this.options;
      this.unsubscribe = er(() => {
        const e = ji(t);
        this.prevStickyHeight !== e &&
          ((this.style.height = `${e}px`), (this.prevStickyHeight = e));
      });
    }
    disconnectedCallback() {
      var t;
      (t = this.unsubscribe) == null || t.call(this);
    }
  };
  let ks = No;
  o(ks, "defaultOptions", { xoPlacement: "top" });
  const cp = "";
  wc();
  const Qi = { subscribe: er, getStickyHeight: ji, getNodes: Bt };
  (window.xoSticky = Qi), _({ [c.Sticky]: Ts, [c.StickySpace]: ks });
  const Oo = class extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "unsubscribe2", () => {});
      o(this, "timeId", -1);
      o(this, "_options");
      o(this, "setOptions", () => {
        this.options = M(this, {
          pick: ["xoScrollTop", "xoSectionId"],
          types: { xoScrollTop: "boolean", xoSectionId: "string" },
        });
      });
      o(this, "getStickyHeight", () => {
        const t = Qi.getNodes("top");
        return wt(t, (s, n) => s + n.height, 0);
      });
      o(this, "listener", async () => {
        const { xoScrollTop: t } = this.options;
        if ((await T(100), t)) {
          const e = document.querySelector(c.FiltersTop);
          e
            ? window.scrollY > Y(e).top &&
              window.scrollTo({
                top: Y(e).top - this.getStickyHeight(),
                behavior: "smooth",
              })
            : window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
      o(this, "listener2", () => {
        const { status: t } = Ct();
        t === "request"
          ? x.set(this, "xo-loading", !0)
          : t === "success" && x.set(this, "xo-loading", !1);
      });
      o(this, "handlePopState", async (t) => {
        t.preventDefault();
        const { search: e } = window.location,
          s = yt.parse(e),
          n = new FormData();
        v(s, ([a, l]) => {
          n.append(a, l);
        }),
          uc(n),
          await Zn(window.location.href),
          Ss();
      });
      o(this, "setDefaultFieldsFromParams", () => {
        const { search: t } = window.location,
          e = yt.parse(t),
          s = new FormData();
        v(e, ([l, d]) => {
          s.append(l, d);
        });
        const n = ke(s),
          a = yt.parse(n);
        v(a, ([l, d]) => {
          const h = Array.from(
            this.querySelectorAll(
              `${c.FiltersField} [name="${l}"], ${c.FiltersField} xo-range[xo-name="${vt.price}"]`
            )
          );
          v(h, (u) => {
            if (u)
              if (
                (xt(u, "checkbox") || xt(u, "radio")) &&
                l === u.getAttribute("name")
              ) {
                const p = this.querySelector(`[name='${l}'][value='${d}']`);
                if (((p.checked = !0), xt(p, "radio"))) {
                  const m = Array.from(
                    this.querySelectorAll(c.FiltersSortBySelected)
                  );
                  v(m, (f) => {
                    var b;
                    p.name === vt.sort &&
                      (f.textContent =
                        (b = p.getAttribute("xo-label")) != null ? b : d);
                  });
                }
              } else if (xt(u, "xo-range") && l === u.getAttribute("xo-name")) {
                const [p, m] = dt(d);
                u.setAttribute("xo-value", `[${p}, ${m}]`), (u.value = [p, m]);
              } else u instanceof HTMLSelectElement && (u.value = d);
          });
        });
      });
    }
    get options() {
      return { ...Oo.defaultOptions, ...this._options };
    }
    set options(t) {
      this._options = t;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    async connectedCallback() {
      this.setOptions(),
        (this.timeId = window.setTimeout(() => {
          hc(),
            this.setDefaultFieldsFromParams(),
            Ss(),
            gc(),
            dc(this.options.xoSectionId),
            clearTimeout(this.timeId);
        }, 50)),
        window.addEventListener("popstate", this.handlePopState),
        (this.unsubscribe = Ot(
          this.listener,
          (t, e) =>
            !(
              (t != null &&
                (t == null ? void 0 : t.html) !==
                  (e == null ? void 0 : e.html) &&
                t != null) ||
              (t != null &&
                !It(
                  t == null ? void 0 : t.refine,
                  e == null ? void 0 : e.refine
                ))
            )
        )),
        (this.unsubscribe2 = Ot(
          this.listener2,
          (t, e) =>
            (t == null ? void 0 : t.status) === (e == null ? void 0 : e.status)
        ));
    }
    attributeChangedCallback(t, e, s) {
      t === "xo-observed" && e !== s && this.setOptions();
    }
    disconnectedCallback() {
      this.unsubscribe(),
        this.unsubscribe2(),
        window.removeEventListener("popstate", this.handlePopState),
        clearTimeout(this.timeId);
    }
  };
  let $s = Oo;
  o($s, "defaultOptions", { xoScrollTop: !0, xoSectionId: "" });
  class Pc extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "handleInput", async (t) => {
        var n, a;
        const e = t.target;
        if (e instanceof HTMLInputElement && e.type !== "range")
          if (xt(e, "checkbox"))
            e.checked ? pc(e.name, e.value) : Ps(e.name, e.value);
          else {
            const l = document.querySelector(c.Filters);
            if (l && xt(e, "radio")) {
              const d = e.closest(c.Popover),
                h = d == null ? void 0 : d.getAttribute("xo-name"),
                u = document.querySelector(
                  `${c.PopoverTrigger}[xo-name="${h}"]`
                ),
                p = Array.from(
                  (u != null ? u : l).querySelectorAll(c.FiltersSortBySelected)
                );
              v(p, (m) => {
                var f;
                e.name === vt.sort &&
                  (m.textContent =
                    (f = e.getAttribute("xo-label")) != null ? f : e.value);
              }),
                e.name === vt.sort && d && h && ce.close(h);
            }
            Te(e.name, e.value);
          }
        else if (e instanceof HTMLSelectElement) Te(e.name, e.value);
        else if (xt(e, "xo-range")) {
          const [l, d] = e.value,
            h = (n = Number(e.getAttribute("xo-min"))) != null ? n : 0,
            u = (a = Number(e.getAttribute("xo-max"))) != null ? a : 0;
          l === h && d === u ? Ps(vt.price) : Te(vt.price, `[${l}, ${d}]`);
        }
        const s = yt.parse(window.location.search, !0);
        s.page && Te("page", s.page), Yi(), Ss();
      });
      o(this, "handleRange", rt(this.handleInput));
      o(this, "handler", (t) => {
        var e, s;
        !t ||
          (xt(t, "xo-range")
            ? (cc(
                (e = Number(t.getAttribute("xo-min"))) != null ? e : 0,
                (s = Number(t.getAttribute("xo-max"))) != null ? s : 0
              ),
              t.addEventListener("changed", this.handleRange))
            : t.addEventListener("change", this.handleInput));
      });
    }
    connectedCallback() {
      xc(this);
      const t = Array.from(this.querySelectorAll("input, select, xo-range"));
      v(t, this.handler);
    }
    disconnectedCallback() {
      const t = Array.from(this.querySelectorAll("input, select, xo-range"));
      v(t, (e) => {
        xt(e, "xo-range")
          ? e.removeEventListener("change", this.handleRange)
          : e.removeEventListener("change", this.handleInput);
      });
    }
  }
  const Fo = class extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "listener", () => {
        const { refine: t, priceMin: e, priceMax: s } = Ct(),
          { xoName: n, xoClearAll: a } = this.options;
        if (a) {
          const l = !!Rt(t, (d) => /filter./g.test(d.name)).length;
          x.set(this, "xo-visible", l);
        } else x.set(this, "xo-visible", !1);
        v(t, (l) => {
          if (!l.name.includes("filter.v.price.") && l.name === n)
            x.set(this, "xo-visible", !0);
          else if (
            l.name.includes("filter.v.price.") &&
            n.includes("filter.v.price.")
          ) {
            const [d, h] = dt(l.value);
            (d !== e || h !== s) && x.set(this, "xo-visible", !0);
          }
        });
      });
      o(this, "resetFields", () => {
        const { xoName: t, xoValue: e, xoClearAll: s } = this.options;
        let n = Array.from(
          document.querySelectorAll(
            `${c.FiltersField} input[type="radio"][name="${t}"]${
              e ? `[value="${e}"]` : ""
            }, ${c.FiltersField} input[type="checkbox"][name="${t}"]${
              e ? `[value="${e}"]` : ""
            }, ${c.FiltersField} xo-range[xo-name="${t}"], ${
              c.FiltersField
            } select[name="${t}"]`
          )
        );
        s &&
          (n = Array.from(
            document.querySelectorAll(
              `${c.FiltersField} input[type="radio"], ${c.FiltersField} input[type="checkbox"], ${c.FiltersField} xo-range, ${c.FiltersField} select`
            )
          )),
          v(n, (a) => {
            if ((a && xt(a, "checkbox")) || xt(a, "radio"))
              a.removeAttribute("checked"), (a.checked = !1);
            else if (xt(a, "xo-range")) a.value = [a.min, a.max];
            else if (xt(a, "select")) {
              const l = a.querySelector("option");
              a.value = (l == null ? void 0 : l.value) || "";
            }
          });
      });
      o(this, "handleClick", async () => {
        const { xoName: t, xoValue: e, xoClearAll: s } = this.options;
        s
          ? mc()
          : (Qn(t, e),
            Ps(t, e),
            t.includes("filter.v.price.") && (Qn(vt.price), Ps(vt.price))),
          await Yi(),
          this.resetFields();
      });
    }
    get options() {
      const t = M(this, {
        pick: ["xoName", "xoValue", "xoClearAll"],
        types: { xoName: "string", xoValue: "string", xoClearAll: "boolean" },
      });
      return { ...Fo.defaultOptions, ...t };
    }
    connectedCallback() {
      this.addEventListener("click", this.handleClick),
        (this.unsubscribe = Ot(this.listener));
    }
    disconnectedCallback() {
      this.unsubscribe(), this.removeEventListener("click", this.handleClick);
    }
  };
  let Ms = Fo;
  o(Ms, "defaultOptions", { xoName: "", xoClearAll: !1 });
  class Ac extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "childEls", []);
      o(this, "setEmpty", () => {
        const { refine: t } = Ct(),
          e = !Rt(t, (s) => /filter./g.test(s.name)).length;
        x.set(this, "xo-empty", e);
      });
      o(this, "render", () => {
        var s, n;
        const t =
            (n =
              (s = this.closest(c.Filters)) == null
                ? void 0
                : s.getAttribute("xo-money-format")) != null
              ? n
              : "",
          { refine: e } = Ct();
        return ct(e, (a) => {
          var u, p, m;
          if (!/filter./g.test(a.name)) return "";
          const l = document.querySelector(
              `${c.FiltersField} input[type="radio"][name="${a.name}"][value="${a.value}"], ${c.FiltersField} input[type="checkbox"][name="${a.name}"][value="${a.value}"], ${c.FiltersField} xo-range[xo-name="${a.name}"]`
            ),
            d = a.name.includes("filter.v.price.")
              ? ct(dt(a.value), (f) =>
                  t.replace(/{.*}|(\d+(,|\.)?)+/g, `${f}`)
                ).join(" - ")
              : (u = l == null ? void 0 : l.getAttribute("xo-label")) != null
              ? u
              : "",
            h =
              (m =
                (p = this.querySelector(c.FiltersRefineClearIcon)) == null
                  ? void 0
                  : p.innerHTML) != null
                ? m
                : "<span>&times;</span>";
          return `
        <${c.FiltersClear} xo-name="${a.name}" xo-value="${a.value}" role="button" tabindex="0">
          ${d} ${h}
        </${c.FiltersClear}>
      `;
        });
      });
      o(this, "listener", () => {
        this.setEmpty(),
          (this.innerHTML = this.render().join("")),
          v(this.childEls, (t) => {
            this.appendChild(t);
          });
      });
    }
    connectedCallback() {
      this.childEls.length === 0 &&
        (this.childEls = Array.from(this.childNodes)),
        this.setEmpty(),
        (this.unsubscribe = Ot(this.listener));
    }
    disconnectedCallback() {
      var t;
      (t = this.unsubscribe) == null || t.call(this);
    }
  }
  const Zi = new xe();
  class Tc extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "callback", null);
      o(this, "handleContent", (t) => {
        this.callback = t;
      });
      o(this, "listener", () => {
        const { html: t, prevHtml: e, status: s } = Ct();
        if (s === "success" && t !== e) {
          const l = new DOMParser()
            .parseFromString(t, "text/html")
            .querySelector(c.FiltersContent);
          if (l) {
            const d = l.cloneNode(!0),
              h = Array.from(d.querySelectorAll('[xo-animate="scroll"]'));
            v(h, (u) => {
              u.setAttribute("xo-animate", "none");
            }),
              this.callback
                ? (this.innerHTML = this.callback(d.innerHTML))
                : (this.innerHTML = d.innerHTML),
              Zi.emit("done", void 0),
              fc();
          }
        }
      });
    }
    connectedCallback() {
      this.unsubscribe = Ot(this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class kc extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "listener", () => {
        const { status: t } = Ct();
        t === "request"
          ? x.set(this, "xo-visible", !0)
          : t === "success" && x.set(this, "xo-visible", !1);
      });
    }
    connectedCallback() {
      this.unsubscribe = Ot(this.listener, (t, e) => t.status === e.status);
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  const Ro = class extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "queueId", -1);
      o(this, "listener", () => {
        yc(this.queueId),
          (this.queueId = bc(() => {
            var l;
            const { xoUniqueId: t } = this.options,
              { html: e } = Ct(),
              a = new DOMParser()
                .parseFromString(e, "text/html")
                .querySelector(`${c.FiltersCount}[xo-unique-id="${t}"]`);
            if (a && a.textContent && this.textContent !== a.textContent) {
              const d =
                (l = Number(a.textContent.trim().replace(/\D*/g, ""))) != null
                  ? l
                  : 0;
              this.textContent = a.textContent;
              const h = this.closest(c.FiltersField);
              h && x.set(h, "xo-disabled", d === 0);
            }
          }));
      });
    }
    get options() {
      const t = M(this, {
        pick: ["xoUniqueId"],
        types: { xoUniqueId: "string" },
      });
      return { ...Ro.defaultOptions, ...t };
    }
    connectedCallback() {
      const { xoUniqueId: t } = this.options,
        e = this.closest(c.FiltersField);
      if (!t)
        throw new Error(
          `${c.FiltersCount}: Attribute xo-unique-id is required (Note: xo-unique-id is unique)`
        );
      if (!e)
        throw new Error(`${c.FiltersCount} must be inside ${c.FiltersField}`);
      this.unsubscribe = Ot(this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  };
  let Ls = Ro;
  o(Ls, "defaultOptions", { xoUniqueId: "" });
  const qo = class extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "listener", () => {
        const { xoUniqueId: t } = this.options,
          { html: e } = Ct(),
          a = new DOMParser()
            .parseFromString(e, "text/html")
            .querySelector(`${c.FiltersActiveSize}[xo-unique-id="${t}"]`);
        a && a.textContent && (this.textContent = a.textContent);
      });
    }
    get options() {
      const t = M(this, {
        pick: ["xoUniqueId"],
        types: { xoUniqueId: "string" },
      });
      return { ...qo.defaultOptions, ...t };
    }
    connectedCallback() {
      const { xoUniqueId: t } = this.options;
      if (!t)
        throw new Error(
          `${c.FiltersActiveSize}: Attribute xo-unique-id is required (Note: xo-unique-id is unique)`
        );
      this.unsubscribe = Ot(this.listener);
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  };
  let Is = qo;
  o(Is, "defaultOptions", { xoUniqueId: "" });
  class $c extends HTMLElement {
    constructor() {
      super();
      o(this, "unsubscribe", () => {});
      o(this, "anchorEls");
      o(this, "observer");
      o(this, "handleClick", (t) => {
        t.preventDefault();
        const e = new URL(t.currentTarget.href),
          s = yt.parse(e.search, !0);
        Te("page", s.page, !0), Yi(), Ss();
      });
      o(this, "listener", () => {
        const { html: t } = Ct(),
          n = new DOMParser()
            .parseFromString(t, "text/html")
            .querySelector(c.FiltersPaginate);
        n && n.innerHTML && (this.innerHTML = n.innerHTML);
      });
      (this.anchorEls = Array.from(this.querySelectorAll("a"))),
        (this.observer = new MutationObserver(() => {
          (this.anchorEls = Array.from(this.querySelectorAll("a"))),
            v(this.anchorEls, (t) => {
              t.removeEventListener("click", this.handleClick),
                t.addEventListener("click", this.handleClick);
            });
        })),
        this.observer.observe(this, { childList: !0 });
    }
    connectedCallback() {
      (this.unsubscribe = Ot(this.listener)),
        v(this.anchorEls, (t) => {
          t.removeEventListener("click", this.handleClick),
            t.addEventListener("click", this.handleClick);
        });
    }
    disconnectedCallback() {
      this.unsubscribe(),
        this.observer.disconnect(),
        v(this.anchorEls, (t) => {
          t.removeEventListener("click", this.handleClick);
        });
    }
  }
  const dp = "";
  vc(),
    lc(),
    (window.xoFilters = Zi),
    _({
      [c.Filters]: $s,
      [c.FiltersField]: Pc,
      [c.FiltersClear]: Ms,
      [c.FiltersRefine]: Ac,
      [c.FiltersContent]: Tc,
      [c.FiltersFallback]: kc,
      [c.FiltersCount]: Ls,
      [c.FiltersActiveSize]: Is,
      [c.FiltersPaginate]: $c,
    });
  const Ki = {
    arrow: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fff" x="0px" y="0px" width="18" viewBox="0 0 263.7 473.1" xml:space="preserve">
  <path d="M244.5,473.1c-4.9,0-9.8-1.9-13.6-5.6L0,236.5L230.9,5.6c7.5-7.5,19.7-7.5,27.2,0c7.5,7.5,7.5,19.7,0,27.2L54.3,236.5 l203.7,203.7c7.5,7.5,7.5,19.7,0,27.2C254.3,471.2,249.4,473.1,244.5,473.1z"/>
</svg>`,
    close: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#fff"  width="18" x="0px" y="0px" viewBox="0 0 56.213 55.962" xml:space="preserve">
  <path d="M48.82,53.907,27.483,32.572,6.146,53.907a3.6,3.6,0,0,1-5.091-5.09L22.393,27.481,1.055,6.145a3.6,3.6,0,0,1,5.09-5.09L27.483,22.391,48.82,1.055a3.6,3.6,0,0,1,5.09,5.09L32.573,27.482,53.911,48.818a3.6,3.6,0,1,1-5.09,5.09Z" transform="translate(0.747 0.5)"/>
</svg>`,
  };
  let _t = 0;
  const Ho = class extends HTMLElement {
    constructor() {
      super();
      o(this, "itemEls", []);
      o(this, "portalEl", null);
      o(this, "portalContent");
      o(this, "_options");
      o(this, "setOptions", () => {
        this.options = {
          ...M(this, {
            pick: [
              "xoAnimate",
              "xoDuration",
              "xoEasing",
              "xoBackdropColor",
              "xoSync",
              "xoPortalClass",
            ],
            types: {
              xoAnimate: "string",
              xoDuration: "number",
              xoEasing: "string",
              xoBackdropColor: "string",
              xoSync: "boolean",
              xoPortalClass: "string",
            },
          }),
        };
      });
      o(this, "renderPortal", (t, e) => {
        const {
          xoAnimate: s,
          xoDuration: n,
          xoEasing: a,
          xoBackdropColor: l,
        } = this.options;
        t.setAttribute("xo-name", `${_t}`), t.setAttribute("xo-index", `${e}`);
        const d = t.getAttribute("xo-intrinsic-width"),
          h = t.getAttribute("xo-src"),
          p = /\.(mp4|webm|ogg)$/i.test(h),
          m = d ? Ni(h, { width: d }) : h,
          f = p
            ? `<video src="${h}" controls title="Video" />`
            : `<${c.ImageZoom} xo-zoom="1" xo-zoom-src="${m}" xo-zoom-full><img xo-cropped src="${h}" alt="" width="1000" height="1000"></${c.ImageZoom}>`;
        return `
      <${c.Modal} xo-portal="false" xo-name="${_t}" xo-duration="${n}" xo-animate="${s}" xo-easing="${a}" xo-backdrop-color="${l}">
        <${c.ModalPan} xo-intentional-axis>
          ${f}
        </${c.ModalPan}>
      </${c.Modal}>
    `;
      });
      o(
        this,
        "renderContent",
        () => `
      ${this.portalContent}
      <${c.GalleryPrev}>
        ${Ki.arrow}
      </${c.GalleryPrev}>
      <${c.GalleryNext}>
        ${Ki.arrow}
      </${c.GalleryNext}>
      <${c.ModalTrigger} xo-name="${_t}">
        ${Ki.close}
      </${c.ModalTrigger}>
      <${c.GalleryCounter} xo-name="${_t}"></${c.GalleryCounter}>
    `
      );
      o(this, "handlePortal", () => {
        const { xoPortalClass: t } = this.options,
          e = document.querySelector(`${c.GalleryPortal}[xo-name="${_t}"]`);
        e && e.remove(),
          (this.itemEls = Array.from(this.querySelectorAll(c.GalleryItem))),
          (this.portalContent = ct(this.itemEls, this.renderPortal).join("")),
          (this.portalEl = document.createElement(c.GalleryPortal)),
          (this.portalEl.className = t),
          this.portalEl.setAttribute("xo-name", `${_t}`),
          (this.portalEl.innerHTML = this.renderContent()),
          document.body.appendChild(this.portalEl);
      });
      _t++;
    }
    get options() {
      return { ...Ho.defaultOptions, ...this._options };
    }
    set options(t) {
      this._options = t;
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    async connectedCallback() {
      var t;
      (t = window.xbEditor) != null && t.designMode && (await T(100)),
        this.setAttribute("xo-name", `${_t}`),
        this.setOptions(),
        this.handlePortal();
    }
    disconnectedCallback() {
      var t;
      (this.itemEls = []), (t = this.portalEl) == null || t.remove();
    }
    attributeChangedCallback(t, e, s) {
      if (t === "xo-observed" && e !== s) {
        this.setOptions(), this.handlePortal();
        const n = Array.from(this.querySelectorAll(c.GalleryItem));
        v(n, (a) => {
          a.setAttribute("xo-observed", s);
        });
      }
    }
  };
  let Ds = Ho;
  o(Ds, "defaultOptions", {
    xoAnimate: "smart-zoom",
    xoDuration: 300,
    xoEasing: "decay",
    xoBackdropColor: "rgba(0, 0, 0, 0.5)",
    xoSync: !0,
    xoPortalClass: "",
  });
  function Mc() {
    g.create("xo-gallery", { initialState: { indexes: {}, galleryName: "" } });
  }
  function ee(r, i) {
    g.set("xo-gallery", (t) => ({ ...t, indexes: { ...t.indexes, [r]: i } }));
  }
  function Lc(r) {
    g.set("xo-gallery", (i) => ({ ...i, galleryName: r }));
  }
  function Ic(r) {
    const { indexes: i } = se(),
      e = (i[r] || 0) + 1;
    ee(r, e);
  }
  function Dc(r) {
    const { indexes: i } = se(),
      e = (i[r] || 0) - 1;
    ee(r, e);
  }
  function se() {
    return g.get("xo-gallery");
  }
  function Ji(r) {
    return g.subscribe("xo-gallery", r);
  }
  class Nc extends HTMLElement {
    constructor() {
      super();
      o(this, "triggerEl");
      o(this, "unsubscribe", () => {});
      o(this, "listener", () => {
        const { indexes: t, galleryName: e } = se(),
          s = t[e],
          n = this.getAttribute("xo-name");
        (this.triggerEl.style.visibility = "visible"),
          n === e &&
            s === this.getIndex() &&
            this.triggerEl.getAttribute("xo-sync") != null &&
            (this.triggerEl.style.visibility = "hidden");
      });
      o(this, "handleClick", (t) => {
        const s = t.target.closest(c.GalleryItem),
          n = Number(s.getAttribute("xo-index")),
          a = s.getAttribute("xo-name"),
          l = document.querySelector(`${c.GalleryPortal}[xo-name="${a}"]`);
        l && l.scrollTo({ left: n * l.offsetWidth }), Lc(a), ee(a, n);
      });
      this.triggerEl = this.querySelector(c.ModalTrigger);
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    getSrc() {
      return this.getAttribute("xo-thumb-src") || "";
    }
    getName() {
      return this.getAttribute("xo-name") || "";
    }
    getIndex() {
      return Number(this.getAttribute("xo-index"));
    }
    async connectedCallback() {
      var e;
      (e = window.xbEditor) != null && e.designMode && (await T(100)),
        (this.triggerEl = this.querySelector(c.ModalTrigger));
      const t = this.closest(c.Gallery);
      if (t) {
        if (this.getSrc()) {
          const s = this.querySelector(c.ModalTrigger);
          s && s.remove(),
            this.insertAdjacentHTML(
              "afterbegin",
              `<${c.ModalTrigger} xo-name="${this.getName()}" ${
                t.options.xoSync && t.options.xoAnimate === "smart-zoom"
                  ? "xo-sync"
                  : ""
              }><img src="${this.getSrc()}" loading="lazy" alt="" width="500" height="500"></${
                c.ModalTrigger
              }>`
            );
        } else {
          if (this.children.length > 1)
            throw new Error(`${c.GalleryItem} should have only one child.`);
          const s = this.children[0],
            n = document.createElement(c.ModalTrigger);
          n.setAttribute("xo-name", this.getName()),
            n.appendChild(s),
            t.options.xoSync &&
              t.options.xoAnimate === "smart-zoom" &&
              x.set(n, "xo-sync", !0),
            this.appendChild(n);
        }
        (this.triggerEl = this.querySelector(c.ModalTrigger)),
          this.triggerEl.addEventListener("click", this.handleClick),
          (this.unsubscribe = Ji(this.listener));
      }
    }
    disconnectedCallback() {
      this.triggerEl.removeEventListener("click", this.handleClick),
        this.unsubscribe();
    }
    async attributeChangedCallback(t, e, s) {
      if (t === "xo-observed" && e !== s) {
        await T(100);
        const { galleryName: n } = se();
        ee(n, -1), this.disconnectedCallback(), this.connectedCallback();
      }
    }
  }
  class Oc extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "unsubscribe2", () => {});
      o(this, "listener", () => {
        const { indexes: t, galleryName: e } = se(),
          s = t[e],
          n = document.querySelector(`${c.Gallery}[xo-name="${e}"]`),
          a = Array.from(this.querySelectorAll(`${c.Modal} video`));
        v(a, (l, d) => {
          d === s ? l.play() : l.pause();
        }),
          s >= 0 &&
            g.set("xo-modal", (l) => ({
              ...l,
              data: {
                ...l.data,
                [this.getName()]: {
                  ...l.data[this.getName()],
                  triggerElement: n
                    .querySelectorAll(c.GalleryItem)
                    [s].querySelector(c.ModalTrigger),
                },
              },
            }));
      });
      o(this, "handleScroll", () => {
        const { indexes: t, galleryName: e } = se(),
          s = t[e],
          { scrollLeft: n } = this,
          a = Math.round(n / this.offsetWidth);
        s !== a && ee(e, a);
      });
    }
    getName() {
      return this.getAttribute("xo-name") || "";
    }
    connectedCallback() {
      this.addEventListener("scroll", this.handleScroll),
        (this.unsubscribe = g.subscribe("xo-modal", (t) => {
          var s, n;
          const e =
            (n = (s = t.data) == null ? void 0 : s[this.getName()]) == null
              ? void 0
              : n.isOpen;
          x.set(this, "xo-active", e),
            e
              ? (document.body.style.overflow = "hidden")
              : document.body.style.removeProperty("overflow");
        })),
        (this.unsubscribe2 = Ji(this.listener));
    }
    disconnectedCallback() {
      this.unsubscribe(),
        this.unsubscribe2(),
        this.removeEventListener("scroll", this.handleScroll);
    }
  }
  const Fc = 20;
  class Rc extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "handleClick", () => {
        const t = this.closest(c.GalleryPortal),
          e = t.getAttribute("xo-name") || "";
        if (t.scrollLeft - t.offsetWidth >= Fc)
          t.scrollTo(t.scrollLeft - t.offsetWidth, 0), Dc(e);
        else {
          t.scrollTo(t.scrollWidth - t.offsetWidth, 0);
          const s = Math.round((t.scrollWidth - t.offsetWidth) / t.offsetWidth);
          ee(e, s);
        }
      });
    }
    connectedCallback() {
      this.addEventListener("click", this.handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleClick);
    }
  }
  class qc extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "handleClick", () => {
        const t = this.closest(c.GalleryPortal),
          e = t.getAttribute("xo-name") || "";
        t.scrollLeft + t.offsetWidth < t.scrollWidth - t.offsetWidth
          ? (t.scrollTo(t.scrollLeft + t.offsetWidth, 0), Ic(e))
          : (t.scrollTo(0, 0), ee(e, 0));
      });
    }
    connectedCallback() {
      this.addEventListener("click", this.handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleClick);
    }
  }
  class Hc extends HTMLElement {
    constructor() {
      super();
      o(this, "unsubscribe", () => {});
      o(this, "listener", () => {
        const { indexes: t } = se(),
          e = t[this.name],
          s = document.querySelector(`${c.Gallery}[xo-name="${this.name}"]`);
        s &&
          (this.innerText = `${e + 1} / ${
            s.querySelectorAll(c.GalleryItem).length
          }`);
      });
      this.unsubscribe = Ji(this.listener);
    }
    get name() {
      return this.getAttribute("xo-name") || "";
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  const hp = "";
  Mc(),
    _({
      [c.Gallery]: Ds,
      [c.GalleryItem]: Nc,
      [c.GalleryPortal]: Oc,
      [c.GalleryPrev]: Rc,
      [c.GalleryNext]: qc,
      [c.GalleryCounter]: Hc,
    });
  const to = "quantity",
    Ns = "QUICKVIEW_FIELD_SIGNAL",
    eo = "STICKY_FIELD_SIGNAL",
    sr = "quickview",
    ir = "xo-bundle-item",
    Vc = "xo-bundle-price",
    so = "xo-binding";
  function Bc() {
    g.create("xo-cart-form", { initialState: {} });
  }
  function $e(r, i, t) {
    const e = `${r}/${i}`;
    g.set("xo-cart-form", (s) => {
      var a, l;
      const n =
        (l = (a = s == null ? void 0 : s[e]) == null ? void 0 : a[to]) != null
          ? l
          : 1;
      return {
        ...s,
        [e]: { ...(s == null ? void 0 : s[e]), [to]: Math.max(1, t(n)) },
      };
    })("xo-cart-form/setFormQuantity");
  }
  function Os(r, i, t, e) {
    const s = `${r}/${i}`;
    g.set("xo-cart-form", (n) => {
      var a;
      return {
        ...n,
        [s]: {
          ...(n == null ? void 0 : n[s]),
          variantSelected: {
            ...((a = n == null ? void 0 : n[s]) == null
              ? void 0
              : a.variantSelected),
            [t]: e,
          },
        },
      };
    })("xo-cart-form/setFormVariant");
  }
  function zc(r, i) {
    const t = `${r}/${i}`;
    g.set("xo-cart-form", (e) => {
      const { [t]: s, ...n } = e;
      return n;
    })("xo-cart-form/removeCartFormItem");
  }
  function Wt() {
    return g.get("xo-cart-form");
  }
  function Fs(r, i) {
    return g.subscribe("xo-cart-form", r, i);
  }
  function _c() {
    g.create("xo-product", {
      initialState: {
        status: "idle",
        productHtml: "",
        pickupAvailabilityHtml: "",
        quickviewProductHtml: {},
        featuredProductHtmls: {},
        productData: {},
      },
    });
  }
  function Wc(r) {
    g.set("xo-product", (i) => ({
      ...i,
      productData: { ...i.productData, [r.id]: r },
    }))("xo-product/setProductData");
  }
  async function io(r, i = !1) {
    const t = new URL(r);
    t.search = "";
    const e = t.href;
    try {
      g.set("xo-product", (n) => ({ ...n, status: "loading" }))(
        "xo-product/getProductHtml/request"
      );
      const s = await Xt.getProductHtml(r);
      g.set("xo-product", (n) => ({
        ...n,
        status: "success",
        productHtml: i ? n.productHtml : s,
        featuredProductHtmls: i
          ? { ...n.featuredProductHtmls, [e]: s }
          : n.featuredProductHtmls,
        productUrl: e,
      }))("xo-product/getProductHtml/success");
    } catch {
      g.set("xo-product", (s) => ({ ...s, status: "error" }))(
        "xo-product/getProductHtml/failure"
      );
    }
  }
  async function Uc(r, i) {
    const t = new URL(i);
    t.search = "";
    try {
      g.set("xo-product", (s) => ({ ...s, status: "loading" }))(
        "xo-product/getQuickviewProductHtml/request"
      );
      const e = await Xt.getProductHtml(i);
      g.set("xo-product", (s) => ({
        ...s,
        status: "success",
        quickviewProductHtml: { ...s.quickviewProductHtml, [r]: e },
      }))("xo-product/getQuickviewProductHtml/success");
    } catch {
      g.set("xo-product", (e) => ({ ...e, status: "error" }))(
        "xo-product/getQuickviewProductHtml/failure"
      );
    }
  }
  async function Xc(r, i) {
    try {
      const t = St(r, i),
        e = await Xt.getPickupAvailability(t);
      g.set("xo-product", (s) => ({ ...s, pickupAvailabilityHtml: e }))(
        "xo-product/getPickupAvailabilityHtml"
      );
    } catch (t) {
      console.log(t);
    }
  }
  function Ut() {
    return g.get("xo-product");
  }
  function Yc(r, i) {
    return g.subscribe("xo-product", r, i);
  }
  class Gc {
    constructor() {
      o(this, "hasFieldSignal", (i) => /\[|\]/g.test(i));
      o(this, "addFieldSignal", (i, t) =>
        this.hasFieldSignal(i) ? i : `[${t}]${i}`
      );
      o(this, "removeFieldSignal", (i) => i.replace(/^\[.*\]/g, ""));
    }
  }
  const pt = new Gc();
  function jc() {
    return window.XO_DEV ? !0 : window.location.pathname.includes("/products/");
  }
  function oo(r, i, t) {
    (r.closest(c.Cart) || r.closest(c.CartMini)) && dr(i, t);
  }
  function kt(r, i) {
    return i ? `${r}/${i}` : r;
  }
  function or(r, i) {
    const e = new DOMParser().parseFromString(r, "text/html"),
      s = e.querySelector(".shopify-section"),
      n = Array.from(e.querySelectorAll(`${c.Product}[xo-product-id]`));
    i &&
      v(n, (d) => {
        const h = d.getAttribute("xo-product-id");
        i.includes(h) || d.remove();
      });
    const a = s.querySelector(c.Cart);
    if (a) return a.innerHTML;
    const l = s.querySelector(c.CartMini);
    return l ? l.innerHTML : s.innerHTML;
  }
  function St(r, i) {
    var l, d, h, u, p;
    const t = `${r}/${i}`;
    let e = "";
    const s =
        (d = (l = Wt()) == null ? void 0 : l[t]) == null
          ? void 0
          : d.variantSelected,
      { productData: n } = Ut(),
      a = (h = n == null ? void 0 : n[i]) == null ? void 0 : h.variants;
    if (s && a) {
      const m = re(s);
      e =
        (p =
          (u = a.find((f) =>
            f.options.length === m.length
              ? It(f.options.sort(), m.sort())
              : f.options.sort().toString().includes(m.sort().toString())
          )) == null
            ? void 0
            : u.id) != null
          ? p
          : "";
    }
    return e;
  }
  function Qc(r, i, t, e) {
    var d, h, u;
    const s = `${r}/${i}`,
      n =
        (h = (d = Wt()) == null ? void 0 : d[s]) == null
          ? void 0
          : h.variantSelected,
      { productData: a } = Ut(),
      l = (u = a == null ? void 0 : a[i]) == null ? void 0 : u.variants;
    if (n && l) {
      const p = re({ ...n, [t]: e }).filter(Boolean);
      return l.some((m) => It(m.options.sort(), p.sort()) && m.available);
    }
    return !0;
  }
  function Zc(r, i, t, e) {
    var d, h, u;
    const s = `${r}/${i}`,
      n =
        (h = (d = Wt()) == null ? void 0 : d[s]) == null
          ? void 0
          : h.variantSelected,
      { productData: a } = Ut(),
      l = (u = a == null ? void 0 : a[i]) == null ? void 0 : u.variants;
    if (n && l) {
      const p = re({ ...n, [t]: e }).filter(Boolean);
      return l.some((m) => m.options.every((f) => p.includes(f)));
    }
    return !0;
  }
  function no(r, i = !0) {
    var e;
    const t = r.closest(c.Modal) || r.closest(c.Popover);
    if (
      t &&
      (t.getAttribute("xo-for-cart-mini") === null ||
        r.tagName.toLowerCase() === c.CartMini)
    ) {
      const s = (e = t.getAttribute("xo-name")) != null ? e : "";
      t.tagName.toLowerCase() === c.Modal
        ? Ht[i ? "open" : "close"](s)
        : ce[i ? "open" : "close"](s);
    }
  }
  function Me(r) {
    const i = r.closest(c.Cart) || r.closest(c.CartMini);
    if (!i) return;
    const t = r.getAttribute("xo-product-id"),
      e = Array.from(i.querySelectorAll(c.Product));
    return (
      wt(
        e,
        (l, d) => {
          const h = d.getAttribute("xo-product-id");
          return l.includes(h) ? l : [...l, h];
        },
        []
      ).indexOf(t) + 1
    );
  }
  function Rs() {
    var e, s, n, a, l, d, h, u;
    if (window.Xotiny) {
      const p = (e = document.querySelector(c.Cart)) == null ? void 0 : e.id,
        m = (s = document.querySelector(c.CartMini)) == null ? void 0 : s.id;
      return window.location.pathname.includes("/cart") ? [p, m] : [m];
    }
    const r = document.querySelector("cart-notification"),
      i =
        (l =
          (a =
            (n = document.querySelector(
              '.shopify-section[id^="shopify-section-template--"][id$="__cart-items"]'
            )) == null
              ? void 0
              : n.id) == null
            ? void 0
            : a.replace(/^shopify-section-/g, "")) != null
          ? l
          : "",
      t =
        (u =
          (h =
            (d = document.querySelector(
              '.shopify-section[id^="shopify-section-template--"][id$="__cart-footer"]'
            )) == null
              ? void 0
              : d.id) == null
            ? void 0
            : h.replace(/^shopify-section-/g, "")) != null
          ? u
          : "";
    return r
      ? window.location.pathname.includes("/cart")
        ? [i, t, "cart-icon-bubble", "cart-live-region-text"].filter(Boolean)
        : [
            "cart-notification-product",
            "cart-notification-button",
            "cart-icon-bubble",
          ]
      : window.location.pathname.includes("/cart")
      ? [i, t, "cart-icon-bubble", "cart-live-region-text"].filter(Boolean)
      : ["cart-drawer", "cart-icon-bubble"];
  }
  function Kc() {
    var s, n;
    const r = Array.from(
        document.querySelectorAll('input[name="selling_radio"]')
      ),
      i = document.querySelector('input[name="selling_plan"]'),
      t = (s = r.find((a) => a.checked)) == null ? void 0 : s.value,
      e = i ? ((n = i == null ? void 0 : i.value) != null ? n : "") : void 0;
    return { sellingRadio: t, sellingPlan: e };
  }
  function Jc(r) {
    if (!r) return;
    let i;
    const t = Array.from(
        r.querySelectorAll(
          'input[type="text"][name^="properties["], input[type="number"][name^="properties["], input[type="hidden"][name^="properties["]'
        )
      ),
      e = Array.from(
        r.querySelectorAll(
          'input[type="radio"][name^="properties["], input[type="checkbox"][name^="properties["]'
        )
      ),
      s = Array.from(r.querySelectorAll('select[name^="properties["]'));
    return (
      v(t, (n) => {
        n.value && (i = { ...i, [n.name]: n.value });
      }),
      v(e, (n) => {
        n.checked && (i = { ...i, [n.name]: n.value });
      }),
      v(s, (n) => {
        n.value && (i = { ...i, [n.name]: n.value });
      }),
      i
    );
  }
  async function td(r, i, t, e, s, n, a, l) {
    const d = new FormData();
    d.append("form_type", "product"),
      d.append("utf8", "\u2713"),
      d.append("id", r),
      d.append("quantity", `${i}`),
      d.append("product-id", t),
      n != null && d.append("selling_radio", n),
      a != null && d.append("selling_plan", a);
    const h = "properties[__shopify_send_gift_card_to_recipient]";
    if (e != null && e[h])
      for (const m in e) {
        const f = e[m];
        d.append(m, f);
      }
    if (
      (l &&
        v(Object.entries(l), ([m, f]) => {
          d.get(m) || d.append(m, f);
        }),
      d.append("sections", Rs()),
      d.append("section_url", window.location.pathname),
      s)
    )
      for (const m in s) {
        const f = s[m];
        d.append(m, f);
      }
    const u = await fetch(`${window.Shopify.routes.root}cart/add`, {
      method: "POST",
      body: d,
      headers: {
        Accept: "application/javascript",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    if ((window.XO_DEV && (await T(400)), u.status === 404))
      return Promise.reject(new Error(u.statusText));
    if (u.status === 422) {
      const m = await u.json();
      return typeof (m == null ? void 0 : m.description) == "string"
        ? Promise.reject(new Error(m.description))
        : Promise.reject(new Error(m.message));
    }
    const p = await u.json();
    return p.status ? Promise.reject(p) : p;
  }
  async function ed(r, i) {
    const e = {
        items: ct(r, (a, l) => {
          var d;
          return {
            id: a,
            quantity: i.length === 1 ? i[0] : (d = i[l]) != null ? d : 1,
          };
        }),
        sections: Rs(),
        section_url: window.location.pathname,
      },
      s = await fetch(`${window.Shopify.routes.root}cart/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e),
      });
    if ((window.XO_DEV && (await T(400)), s.status === 404))
      return Promise.reject(new Error(s.statusText));
    const n = await s.json();
    return n.errors ? Promise.reject(n) : n;
  }
  async function sd(r, i) {
    const t = await fetch(`${window.Shopify.routes.root}cart/change`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        line: r,
        quantity: i,
        sections: Rs(),
        section_url: window.location.pathname,
      }),
    });
    if ((window.XO_DEV && (await T(400)), t.status === 404))
      return Promise.reject(new Error(t.statusText));
    const e = await t.json();
    return e.errors ? Promise.reject(e) : e;
  }
  async function id(r, i) {
    const t = await fetch(`${window.Shopify.routes.root}cart/change`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: r,
        quantity: i,
        sections: Rs(),
        section_url: window.location.pathname,
      }),
    });
    if ((window.XO_DEV && (await T(400)), t.status === 404))
      return Promise.reject(new Error(t.statusText));
    const e = await t.json();
    return e.errors ? Promise.reject(e) : e;
  }
  async function od(r) {
    const i = await fetch(`${window.Shopify.routes.root}cart/update`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: r }),
    });
    return (
      window.XO_DEV && (await T(400)),
      i.status !== 200 && i.status !== 201
        ? Promise.reject(i.statusText)
        : await i.json()
    );
  }
  async function nd(r, i, t) {
    const e = await fetch(
      `${window.Shopify.routes.root}cart/shipping_rates.json?shipping_address[zip]=${r}&shipping_address[country]=${i}&shipping_address[province]=${t}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if ((window.XO_DEV && (await T(400)), e.status === 404))
      return Promise.reject(new Error(e.statusText));
    const s = await e.json();
    return s.shipping_rates ? s : Promise.reject(re(s).flatMap((n) => n));
  }
  async function rd(r) {
    const i = await fetch(r, { method: "GET" });
    return (
      window.XO_DEV && (await T(400)),
      i.status !== 200 && i.status !== 201
        ? Promise.reject(i.statusText)
        : await i.text()
    );
  }
  async function ad(r) {
    const i = await fetch(
      `${window.Shopify.routes.root}variants/${r}/?section_id=pickup-availability`,
      { method: "GET" }
    );
    return i.status !== 200 && i.status !== 201
      ? Promise.reject(i.statusText)
      : await i.text();
  }
  const Xt = {
      addCart: td,
      addCartMulti: ed,
      changeCart: sd,
      changeCartByVariantId: id,
      getProductHtml: rd,
      postCartNote: od,
      getShippingRates: nd,
      getPickupAvailability: ad,
    },
    nr = {
      "properties[__shopify_send_gift_card_to_recipient]": "",
      "properties[Message]": "",
      "properties[Recipient email]": "",
      "properties[Recipient name]": "",
      "properties[Send on]": "",
    };
  function ld() {
    g.create("xo-recipient", { initialState: nr });
  }
  function rr(r, i) {
    g.set("xo-recipient", (t) => ({ ...t, [r]: i }))(
      "xo-cart/setRecipientState"
    );
  }
  function cd() {
    g.set("xo-recipient", nr)("xo-cart/resetRecipientState");
  }
  function ar() {
    return g.get("xo-recipient");
  }
  function dd(r, i) {
    return g.subscribe("xo-recipient", r, i);
  }
  function hd() {
    g.create("xo-cart", {
      initialState: {
        addIdLoading: "",
        isAdded: !1,
        variantId: "",
        changeLineLoading: -1,
        addErrorMessage: "",
        changeErrorMessage: "",
        size: 0,
        sections: { [c.Cart]: "" },
      },
    });
  }
  function ud(r) {
    g.set("xo-cart", (i) => ({ ...i, size: r }))("xo-cart/setCartSize");
  }
  function pd(r, i) {
    const t = `${r}/${i}`;
    g.set("xo-cart", (e) => ({
      ...e,
      addIdLoading: t,
      addErrorMessage: "",
      isAdded: !1,
      variantId: "",
      productIdsForCartNotification: void 0,
    }))("xo-cart/addCartRequest");
  }
  async function md(r, i, t, e, s, n, a) {
    var d, h, u, p, m, f, b;
    const l = kt(r, i);
    try {
      let y = i;
      const E =
          (h = (d = Wt()) == null ? void 0 : d[l]) == null
            ? void 0
            : h.variantSelected,
        { productData: C } = Ut(),
        S = (u = C == null ? void 0 : C[i]) == null ? void 0 : u.variants;
      (p = S == null ? void 0 : S[0]) != null &&
        p.id &&
        (y = (m = S == null ? void 0 : S[0]) == null ? void 0 : m.id),
        (y = St(r, i) || y);
      const k = ar(),
        $ = await Xt.addCart(y, e, i, k, E, s, n, a);
      g.set("xo-cart", (L) => ({
        ...L,
        size: L.size + e,
        sections: $.sections,
        item: $,
        addIdLoading: "",
        isAdded: !0,
        variantId: y,
        productIdsForCartNotification: [`${$.id}`],
      }))("xo-cart/addCartSuccess");
    } catch (y) {
      const E = y,
        C =
          (f = E == null ? void 0 : E.description) != null
            ? f
            : E == null
            ? void 0
            : E.message;
      lr(C),
        C &&
          !t &&
          !((b = window.xbEditor) != null && b.designMode) &&
          Ce.push({
            content: C,
            className: "xo-cart-add-error",
            placement: "top-center",
            delay: 4e3,
          });
    }
  }
  async function fd(r, i, t, e, s) {
    var n, a;
    try {
      let l = i;
      e ||
        (l = i.map((u) => {
          var b, y, E;
          let p = u;
          const { productData: m } = Ut(),
            f = (b = m == null ? void 0 : m[u]) == null ? void 0 : b.variants;
          return (
            (y = f == null ? void 0 : f[0]) != null &&
              y.id &&
              (p = (E = f == null ? void 0 : f[0]) == null ? void 0 : E.id),
            (p = St(r, u) || p),
            p
          );
        }));
      const d = await Xt.addCartMulti(l, s),
        h = s.reduce((u, p) => u + p, 0);
      g.set("xo-cart", (u) => ({
        ...u,
        size: u.size + h * i.length,
        sections: d.sections,
        items: d.items,
        addIdLoading: "",
        productIdsForCartNotification: ct(l, (p) => `${p}`),
      }))("xo-cart/addCartSuccess");
    } catch (l) {
      const d = l,
        h =
          (n = d == null ? void 0 : d.description) != null
            ? n
            : d == null
            ? void 0
            : d.message;
      lr(h),
        h &&
          !t &&
          !((a = window.xbEditor) != null && a.designMode) &&
          Ce.push({
            content: h,
            className: "xo-cart-add-error",
            placement: "top-center",
            delay: 4e3,
          });
    }
  }
  function lr(r) {
    g.set("xo-cart", (i) => ({
      ...i,
      addIdLoading: "",
      addErrorMessage: r,
      isAdded: !1,
      variantId: "",
    }))("xo-cart/addCartFailure");
  }
  async function cr(r, i, t, e, s = !1, n, a, l, d, h = !1) {
    if ((pd(r, i), /^\[|\]$/g.test(i))) {
      const u = dt(i);
      await fd(r, u, e, h, n || [t]);
    } else await md(r, i, e, t, a, l, d);
    s && (window.location.href = "/checkout");
  }
  function xd(r) {
    g.set("xo-cart", (i) => ({
      ...i,
      changeLineLoading: r,
      changeErrorMessage: "",
    }))("xo-cart/changeCartRequest");
  }
  async function gd(r, i) {
    var t, e;
    try {
      const s = await Xt.changeCart(r, i);
      g.set("xo-cart", (n) => ({
        ...n,
        size: s.item_count,
        sections: s.sections,
        changeLineLoading: -1,
      }))("xo-cart/changeCartSuccess");
    } catch (s) {
      const n = s,
        a =
          (t = n == null ? void 0 : n.errors) != null
            ? t
            : s == null
            ? void 0
            : s.message;
      bd(a),
        a &&
          !((e = window.xbEditor) != null && e.designMode) &&
          Ce.push({
            content: a,
            className: "xo-cart-change-error",
            placement: "top-center",
            delay: 4e3,
          });
    }
  }
  function bd(r) {
    g.set("xo-cart", (i) => ({
      ...i,
      changeLineLoading: -1,
      changeErrorMessage: r,
    }))("xo-cart/changeCartFailure");
  }
  async function dr(r, i) {
    xd(r), await gd(r, i);
  }
  function hr() {
    return g.get("xo-cart");
  }
  function ro(r, i) {
    return g.subscribe("xo-cart", r, i);
  }
  function yd() {
    g.create("xo-cart-note", {
      initialState: { status: "idle", note: "", noteDraft: "" },
    });
  }
  function ur(r) {
    g.set("xo-cart-note", (i) => ({ ...i, noteDraft: r }))(
      "xo-cart/setCartNoteDraft"
    );
  }
  function vd() {
    g.set("xo-cart-note", (r) => ({ ...r, status: "loading" }));
  }
  async function Ed(r) {
    try {
      const i = await Xt.postCartNote(r);
      g.set("xo-cart-note", (t) => ({ ...t, status: "success", note: i.note }))(
        "xo-cart/postCartNoteSuccess"
      );
    } catch {
      wd();
    }
  }
  function wd() {
    g.set("xo-cart-note", (r) => ({ ...r, status: "error" }))(
      "xo-cart/postCartNoteFailure"
    );
  }
  async function pr(r) {
    vd(), await Ed(r);
  }
  function Cd() {
    return g.get("xo-cart-note");
  }
  function Sd(r, i) {
    return g.subscribe("xo-cart-note", r, i);
  }
  function Pd() {
    g.create("xo-cart-discount", {
      initialState: { discount: "" },
      useStorage: !0,
    });
  }
  function mr(r) {
    g.set("xo-cart-discount", (i) => ({ ...i, discount: r }))(
      "xo-cart/setCartDiscount"
    );
  }
  function Ad() {
    return g.get("xo-cart-discount");
  }
  function Td(r, i) {
    return g.subscribe("xo-cart-discount", r, i);
  }
  function kd() {
    g.create("xo-cart-shipping-rates", {
      initialState: { status: "idle", shippingRates: [], errorMessages: [] },
    });
  }
  function $d() {
    g.set("xo-cart-shipping-rates", (r) => ({ ...r, status: "loading" }));
  }
  async function Md(r, i, t) {
    try {
      const e = await Xt.getShippingRates(r, i, t);
      g.set("xo-cart-shipping-rates", (s) => ({
        ...s,
        status: "success",
        shippingRates: e.shipping_rates,
      }))("xo-cart/getCartShippingRatesSuccess");
    } catch (e) {
      Array.isArray(e) ? fr(e) : fr([e.message]);
    }
  }
  function fr(r) {
    g.set("xo-cart-shipping-rates", (i) => ({
      ...i,
      status: "error",
      errorMessages: r,
    }))("xo-cart/getCartShippingRatesFailure");
  }
  async function Ld(r, i, t) {
    $d(), await Md(r, i, t);
  }
  function Id() {
    return g.get("xo-cart-shipping-rates");
  }
  function Dd(r, i) {
    return g.subscribe("xo-cart-shipping-rates", r, i);
  }
  function Nd() {
    g.create("xo-cart-shipping-rates-form", {
      initialState: { zip: "", country: "", province: "", provinces: [] },
    });
  }
  function Od(r, i) {
    g.set("xo-cart-shipping-rates-form", (t) => ({ ...t, [r]: i }))(
      "xo-cart-shipping-rates-form/setCartShippingRatesField"
    );
  }
  function Fd(r) {
    g.set("xo-cart-shipping-rates-form", (i) => ({ ...i, provinces: r }))(
      "xo-cart-shipping-rates-form/setProvinces"
    );
  }
  function Rd() {
    return g.get("xo-cart-shipping-rates-form");
  }
  function qd(r, i) {
    return g.subscribe("xo-cart-shipping-rates-form", r, i);
  }
  function Hd() {
    g.create("xo-bundle", { initialState: { observed: 1, bundles: {} } });
  }
  function Vd(r, i, t) {
    g.set("xo-bundle", (e) => {
      var n, a;
      const s = (a = (n = e.bundles) == null ? void 0 : n[r]) != null ? a : [];
      return s.some((l) => l.productId === t.productId) || s.length >= i
        ? e
        : {
            ...e,
            observed: e.observed + 1,
            bundles: { ...e.bundles, [r]: [...s, t] },
          };
    })("xo-bundle/addBundleItem");
  }
  function Bd(r, i) {
    g.set("xo-bundle", (t) => ({
      ...t,
      observed: t.observed + 1,
      bundles: {
        ...t.bundles,
        [r]: t.bundles[r].filter((e) => e.variantId !== i),
      },
    }))("xo-bundle/removeBundleItem");
  }
  function zd(r, i, t) {
    g.set("xo-bundle", (e) => ({
      ...e,
      bundles: {
        ...e.bundles,
        [r]: e.bundles[r].map((s) =>
          s.productId !== i ? s : { ...s, quantity: Math.max(1, t) }
        ),
      },
    }))("xo-bundle/updateQuantity");
  }
  function xr(r, i, t) {
    g.set("xo-bundle", (e) => ({
      ...e,
      bundles: {
        ...e.bundles,
        [r]: e.bundles[r].map((s) =>
          s.productId !== i
            ? s
            : {
                ...s,
                quantity: Math.max(1, s.quantity + (t === "inc" ? 1 : -1)),
              }
        ),
      },
    }))("xo-bundle/updateBundleQuantityByType");
  }
  function _d(r) {
    g.set("xo-bundle", (i) => ({
      ...i,
      observed: i.observed + 1,
      bundles: { ...i.bundles, [r]: [] },
    }))("xo-bundle/clearBundle");
  }
  function Wd() {
    return g.get("xo-bundle");
  }
  function Ud(r, i) {
    return g.subscribe("xo-bundle", r, i);
  }
  function Xd() {
    hd(), Bc(), _c(), yd(), Pd(), kd(), Nd(), ld(), Hd();
  }
  const Pt = {
      cart: hr,
      cartForm: Wt,
      product: Ut,
      cartNote: Cd,
      cartDiscount: Ad,
      cartShippingRates: Id,
      cartShippingRatesForm: Rd,
      recipient: ar,
      bundle: Wd,
    },
    B = {
      cart: ro,
      cartForm: Fs,
      product: Yc,
      cartNote: Sd,
      cartDiscount: Td,
      cartShippingRates: Dd,
      cartShippingRatesForm: qd,
      recipient: dd,
      bundle: Ud,
    };
  class Yd extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
    }
    connectedCallback() {
      if (!this.id)
        throw new Error(
          `The ${c.Cart} component must have the id="{{ section.id }}" attribute`
        );
      this.unsubscribe = B.cart((t) => {
        const e = t.sections[this.id],
          s = t.changeLineLoading !== -1;
        if (e && this.innerHTML !== e && !s) {
          const n = Array.from(this.querySelectorAll(c.CartWillChange));
          if (n.length) {
            const l = new DOMParser().parseFromString(e, "text/html");
            v(n, (d) => {
              const h = d.getAttribute("xo-unique-id"),
                u = l.querySelector(`${c.CartWillChange}[xo-unique-id="${h}"]`);
              if (u && d.innerHTML !== (u == null ? void 0 : u.innerHTML)) {
                d.innerHTML = u.innerHTML;
                const p = Array.from(u.attributes);
                v(p, (m) => {
                  d.setAttribute(m.name, m.value);
                });
              }
            });
          } else this.innerHTML = or(e);
        }
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class Gd extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "_options");
      o(this, "bundleProviderEl", this.closest(c.BundleProvider));
      o(this, "getSectionId", () => {
        var e;
        return (
          ((e = this.productOptions) == null ? void 0 : e.xoSectionId) ||
          ut(this)
        );
      });
      o(this, "handleAddToCart", async (t) => {
        var y, E, C, S;
        t.preventDefault();
        const e = Pt.cart(),
          {
            xoProductId: s,
            xoProductQuantity: n,
            xoCartOpened: a = !0,
            xoCheckoutRedirection: l = !1,
            xoProductQuantities: d,
            xoTestFly: h,
            xoForBundle: u,
          } = this.options,
          p = !!(
            (y = this.closest(c.Product)) != null &&
            y.querySelector(c.CartAddError)
          ),
          m = Jc(this.closest(c.Product));
        if (!s) return;
        const f = this.getSectionId();
        if (this.productEl) {
          const k = kt(f, s),
            $ =
              (S =
                (C = (E = Pt.cartForm()) == null ? void 0 : E[k]) == null
                  ? void 0
                  : C.quantity) != null
                ? S
                : 1;
          if (e.addIdLoading !== k && s) {
            const { sellingRadio: L, sellingPlan: Q } = Kc();
            await cr(f, s, n != null ? n : $, p, l, d, L, Q, m);
          }
        } else {
          const k = kt("single", s);
          if (
            e.addIdLoading !== k &&
            s &&
            (await cr(
              "single",
              s,
              n != null ? n : 1,
              p,
              l,
              d,
              void 0,
              void 0,
              m,
              u
            ),
            this.bundleProviderEl)
          ) {
            const { xoName: $ } = this.bundleProviderEl.props;
            _d($);
          }
        }
        const b = Pt.cart();
        if (a && b.addErrorMessage === "") {
          const k = document.querySelector(c.CartMini);
          k && (await T(0), no(k));
        }
        (b.addErrorMessage === "" || h) && this.handleCartFly();
      });
      o(this, "handleCartFly", () => {
        const t = document.querySelector(c.CartFly);
        t == null || t.handle(this);
      });
    }
    get options() {
      return this._options;
    }
    set options(t) {
      this._options = t;
    }
    setOptions() {
      var e, s;
      const t = M(this, {
        pick: [
          "xoProductId",
          "xoProductQuantity",
          "xoCartOpened",
          "xoDisabled",
          "xoCheckoutRedirection",
          "xoProductQuantities",
          "xoTestFly",
          "xoForBundle",
        ],
        types: {
          xoProductId: "string",
          xoProductQuantity: "number",
          xoCartOpened: "boolean",
          xoDisabled: "boolean",
          xoCheckoutRedirection: "boolean",
          xoProductQuantities: "array",
          xoForBundle: "boolean",
          xoTestFly: "boolean",
        },
      });
      this.productEl
        ? (this.options = {
            ...t,
            xoProductId:
              (s =
                (e = this.productOptions) == null ? void 0 : e.xoProductId) !=
              null
                ? s
                : t.xoProductId,
          })
        : (this.options = t);
    }
    static get observedAttributes() {
      return ["xo-product-id", "xo-product-quantity", "xo-disabled"];
    }
    get productEl() {
      return this.closest(c.Product);
    }
    get productOptions() {
      var t;
      return (t = this.productEl) == null ? void 0 : t.options;
    }
    connectedCallback() {
      this.setOptions();
      const {
        xoProductId: t,
        xoDisabled: e = !1,
        xoForBundle: s,
      } = this.options;
      e ||
        (!t && !s) ||
        (this.addEventListener("click", this.handleAddToCart),
        s
          ? (this.unsubscribe = B.bundle(({ bundles: n }) => {
              var l;
              const a =
                (l = n == null ? void 0 : n[this.getSectionId()]) != null
                  ? l
                  : [];
              a.length === 0
                ? (this.removeAttribute("xo-quantities"),
                  this.removeAttribute("xo-product-id"),
                  x.set(this, "xo-disabled", !0))
                : (this.setAttribute(
                    "xo-quantities",
                    `[${a.map((d) => d.quantity).join(",")}]`
                  ),
                  this.setAttribute(
                    "xo-product-id",
                    `[${a.map((d) => d.variantId).join(",")}]`
                  ),
                  x.set(this, "xo-disabled", !1));
            }))
          : (this.unsubscribe = B.cart(({ addIdLoading: n }) => {
              const { xoProductId: a } = this.options;
              if (a) {
                let l = kt("single", a);
                if (this.productEl) {
                  const d = this.getSectionId();
                  l = kt(d, a);
                }
                x.set(this, "xo-loading", n === l);
              }
            })));
    }
    attributeChangedCallback(t, e, s) {
      e != null && e !== s && this.setOptions();
    }
    disconnectedCallback() {
      this.unsubscribe(),
        this.removeEventListener("click", this.handleAddToCart);
    }
  }
  class jd extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "handleClick", async (t) => {
        t.preventDefault();
        const { xoSectionId: e, xoProductId: s } = this.productOptions,
          n = Me(this.productEl);
        n && (await dr(n, 0), zc(e, s));
      });
    }
    get productEl() {
      return this.closest(c.Product);
    }
    get productOptions() {
      return this.productEl.options;
    }
    connectedCallback() {
      if (!this.productEl)
        throw new Error(`${c.CartRemove} must be inside ${c.Product}`);
      this.addEventListener("click", this.handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleClick);
    }
  }
  class Qd extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "prevSize", Number(this.innerText));
      o(this, "timeId", -1);
      o(this, "unsubscribe", () => {});
    }
    connectedCallback() {
      const t = Number(this.innerText);
      ud(t),
        (this.unsubscribe = B.cart(async (e) => {
          if (
            ((this.innerText = `${e.size}`),
            (this.prevSize !== e.size || x.get(this, "xo-test-fly")) &&
              !e.addIdLoading)
          ) {
            const s = document.querySelector("[xo-cart-fly-end]");
            if (s) {
              clearTimeout(this.timeId),
                x.set(s, "xo-cart-fly-end-animated", !1),
                await T(),
                x.set(s, "xo-cart-fly-end-animated", !0);
              const n =
                  Number(
                    window
                      .getComputedStyle(s)
                      .animationDuration.replace("s", "")
                  ) * 1e3,
                a =
                  Number(
                    window.getComputedStyle(s).animationDelay.replace("s", "")
                  ) * 1e3;
              this.timeId = window.setTimeout(() => {
                x.set(s, "xo-cart-fly-end-animated", !1);
              }, n + a);
            }
          }
          this.prevSize = e.size;
        }));
    }
    disconnectedCallback() {
      this.unsubscribe(), clearTimeout(this.timeId);
    }
  }
  class Zd extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "cartScrollEl", null);
      o(this, "scScrollTop", 0);
      o(this, "handleScroll", () => {
        var t, e;
        this.scScrollTop =
          (e = (t = this.cartScrollEl) == null ? void 0 : t.scrollTop) != null
            ? e
            : this.scScrollTop;
      });
    }
    connectedCallback() {
      var e;
      if (!this.id)
        throw new Error(
          `The ${c.CartMini} component must have the id="{{ section.id }}" attribute`
        );
      const t = this.closest(c.Modal);
      (this.cartScrollEl = this.querySelector(c.CartScroll)),
        t && x.set(t, "xo-for-cart-mini", !0),
        (e = this.cartScrollEl) == null ||
          e.addEventListener("scroll", this.handleScroll),
        (this.unsubscribe = B.cart((s) => {
          var a, l;
          const n = s.sections[this.id];
          if (n)
            if (s.changeLineLoading !== -1)
              this.scScrollTop =
                (l = (a = this.cartScrollEl) == null ? void 0 : a.scrollTop) !=
                null
                  ? l
                  : this.scScrollTop;
            else {
              const h = x.get(this, "xo-notification");
              if (this.innerHTML !== n) {
                const u = Array.from(this.querySelectorAll(c.CartWillChange));
                if (u.length) {
                  const m = new DOMParser().parseFromString(n, "text/html");
                  v(u, (f) => {
                    const b = f.getAttribute("xo-unique-id"),
                      y = m.querySelector(
                        `${c.CartWillChange}[xo-unique-id="${b}"]`
                      );
                    if (
                      y &&
                      f.innerHTML !== (y == null ? void 0 : y.innerHTML)
                    ) {
                      f.innerHTML = y.innerHTML;
                      const E = Array.from(y.attributes);
                      v(E, (C) => {
                        f.setAttribute(C.name, C.value);
                      });
                    }
                  });
                } else
                  this.innerHTML = or(
                    n,
                    h ? s.productIdsForCartNotification : void 0
                  );
                (this.cartScrollEl = this.querySelector(c.CartScroll)),
                  this.cartScrollEl &&
                    (this.cartScrollEl.scrollTop = this.scScrollTop);
              }
            }
        }));
    }
    disconnectedCallback() {
      this.unsubscribe(),
        this.cartScrollEl &&
          this.cartScrollEl.removeEventListener("scroll", this.handleScroll);
    }
  }
  class Kd extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
    }
    get productEl() {
      return this.closest(c.Product);
    }
    connectedCallback() {
      if (!this.productEl)
        throw new Error(`${c.CartChangeFallback} must be inside ${c.Product}.`);
      this.unsubscribe = B.cart(({ changeLineLoading: t }) => {
        const e = Me(this.productEl);
        e && x.set(this, "xo-visible", e === t);
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class Jd extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "inputEl", null);
      o(this, "bundleProviderEl", this.closest(c.BundleProvider));
      o(this, "handleInput", (t) => {
        var l;
        const e = t.target;
        ((l = Number(e.value)) != null ? l : 1) < 1 && (e.value = "1");
        const { xoSectionId: n, xoProductId: a } = this.productOptions;
        $e(n, a, () => Number(e.value));
      });
      o(this, "handleInputForBundle", (t) => {
        var l;
        const { xoName: e } = this.bundleProviderEl.props,
          s = t.target;
        ((l = Number(s.value)) != null ? l : 1) < 1 && (s.value = "1");
        const a = this.getAttribute("xo-product-id");
        a && zd(e, a, Number(s.value));
      });
      o(this, "handleBlur", (t) => {
        const { xoCartExclude: e = !1 } = this.productOptions,
          s = t.target,
          n = Me(this.getProductEl());
        n && !e && oo(this, n, Number(s.value));
      });
    }
    getProductEl() {
      return this.closest(c.Product);
    }
    getBundleContentEl() {
      return this.closest(c.BundleContent);
    }
    get productOptions() {
      return this.getProductEl().options;
    }
    connectedCallback() {
      var e;
      if ((e = window.xbEditor) != null && e.designMode) return;
      const t = this.getBundleContentEl();
      if (!this.getProductEl() && !t)
        throw new Error(`${c.CartQuantity} must be in ${c.Product}`);
      if (((this.inputEl = this.querySelector("input")), !this.inputEl))
        throw new Error(`${c.CartQuantity} must have an input number element`);
      if (
        ((this.inputEl.name = to),
        (this.inputEl.value == null || this.inputEl.value === "") &&
          (this.inputEl.value = "1"),
        (this.inputEl.min = "1"),
        t && this.bundleProviderEl)
      ) {
        const { xoName: s } = this.bundleProviderEl.props;
        this.inputEl.addEventListener("input", this.handleInputForBundle);
        const n = this.getAttribute("xo-product-id");
        n &&
          (this.unsubscribe = B.bundle(({ bundles: a }) => {
            var h;
            const l = ((h = a == null ? void 0 : a[s]) != null ? h : []).find(
                (u) => u.productId === n
              ),
              d = l == null ? void 0 : l.quantity;
            d != null && (this.inputEl.value = `${d}`);
          }));
      } else {
        const { xoSectionId: s, xoProductId: n } = this.productOptions;
        $e(s, n, () => {
          var a, l;
          return Number(
            (l = (a = this.inputEl) == null ? void 0 : a.value) != null ? l : 1
          );
        }),
          this.inputEl.addEventListener("input", this.handleInput),
          this.inputEl.addEventListener("blur", this.handleBlur),
          (this.unsubscribe = B.cartForm((a) => {
            var d;
            const l =
              (d = a == null ? void 0 : a[kt(s, n)]) == null
                ? void 0
                : d.quantity;
            l != null && (this.inputEl.value = `${l}`);
          }));
      }
    }
    disconnectedCallback() {
      var t;
      ((t = window.xbEditor) != null && t.designMode) ||
        (this.unsubscribe(),
        this.inputEl &&
          (this.inputEl.removeEventListener("input", this.handleInput),
          this.inputEl.removeEventListener("blur", this.handleBlur),
          this.inputEl.removeEventListener(
            "input",
            this.handleInputForBundle
          )));
    }
  }
  class th extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "quantityEl", null);
      o(this, "bundleProviderEl", this.closest(c.BundleProvider));
      o(this, "handleDecrement", () => {
        var l, d;
        const {
          xoSectionId: t,
          xoProductId: e,
          xoCartExclude: s = !1,
        } = this.productOptions;
        this.getOptions(), $e(t, e, (h) => h - 1);
        const n =
            (d = (l = Pt.cartForm()) == null ? void 0 : l[kt(t, e)]) == null
              ? void 0
              : d.quantity,
          a = Me(this.getProductEl());
        a && !s && oo(this, a, n);
      });
      o(this, "handleDecrementForBundle", () => {
        if (!this.bundleProviderEl) return;
        const { xoName: t } = this.bundleProviderEl.props,
          e = this.getQuantityEl().getAttribute("xo-product-id");
        e && xr(t, e, "dec");
      });
    }
    getProductEl() {
      return this.closest(c.Product);
    }
    getQuantityEl() {
      return this.closest(c.CartQuantity);
    }
    getBundleContentEl() {
      return this.closest(c.BundleContent);
    }
    get productOptions() {
      return this.getProductEl().options;
    }
    getOptions() {
      return M(this, {
        pick: ["xoAutoUpdateCart"],
        types: { xoAutoUpdateCart: "boolean" },
      });
    }
    connectedCallback() {
      if (((this.quantityEl = this.closest(c.CartQuantity)), !this.quantityEl))
        throw new Error(
          `${c.CartQuantityMinus} must be inside ${c.CartQuantity}`
        );
      this.getBundleContentEl()
        ? this.addEventListener("click", this.handleDecrementForBundle)
        : this.addEventListener("click", this.handleDecrement);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleDecrement),
        this.removeEventListener("click", this.handleDecrementForBundle);
    }
  }
  class eh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "quantityEl", null);
      o(this, "bundleProviderEl", this.closest(c.BundleProvider));
      o(this, "handleIncrement", () => {
        var l, d;
        const {
          xoSectionId: t,
          xoProductId: e,
          xoCartExclude: s = !1,
        } = this.productOptions;
        this.getOptions(), $e(t, e, (h) => h + 1);
        const n =
            (d = (l = Pt.cartForm()) == null ? void 0 : l[kt(t, e)]) == null
              ? void 0
              : d.quantity,
          a = Me(this.getProductEl());
        a && !s && oo(this, a, n);
      });
      o(this, "handleIncrementForBundle", () => {
        if (!this.bundleProviderEl) return;
        const { xoName: t } = this.bundleProviderEl.props,
          e = this.getQuantityEl().getAttribute("xo-product-id");
        e && xr(t, e, "inc");
      });
    }
    getProductEl() {
      return this.closest(c.Product);
    }
    getQuantityEl() {
      return this.closest(c.CartQuantity);
    }
    getBundleContentEl() {
      return this.closest(c.BundleContent);
    }
    get productOptions() {
      return this.getProductEl().options;
    }
    getOptions() {
      return M(this, {
        pick: ["xoAutoUpdateCart"],
        types: { xoAutoUpdateCart: "boolean" },
      });
    }
    connectedCallback() {
      if (((this.quantityEl = this.closest(c.CartQuantity)), !this.quantityEl))
        throw new Error(
          `${c.CartQuantityPlus} must be inside ${c.CartQuantity}`
        );
      this.getBundleContentEl()
        ? this.addEventListener("click", this.handleIncrementForBundle)
        : this.addEventListener("click", this.handleIncrement);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleIncrement),
        this.removeEventListener("click", this.handleIncrementForBundle);
    }
  }
  class sh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "textareaEl", null);
      o(this, "buttonEl", null);
      o(this, "handleInput", (t) => {
        const e = t.target;
        ur(e.value);
      });
      o(
        this,
        "handleInputDebounced",
        rt((t) => {
          const e = t.target;
          ur(e.value), pr(e.value);
        }, 600)
      );
    }
    connectedCallback() {
      if (
        ((this.textareaEl = this.querySelector('textarea[name="note"]')),
        !this.textareaEl)
      )
        throw new Error(
          `${c.CartNote} must have a textarea element with name="note"`
        );
      (this.buttonEl = this.querySelector(c.CartNoteSubmit)),
        this.buttonEl
          ? this.textareaEl.addEventListener("input", this.handleInput)
          : this.textareaEl.addEventListener(
              "input",
              this.handleInputDebounced
            ),
        (this.unsubscribe = B.cartNote(({ status: t }) => {
          x.set(this, "xo-loading", t === "loading");
        }));
    }
    disconnectedCallback() {
      this.unsubscribe(),
        this.textareaEl &&
          (this.buttonEl
            ? this.textareaEl.removeEventListener("input", this.handleInput)
            : this.textareaEl.removeEventListener(
                "input",
                this.handleInputDebounced
              ));
    }
  }
  class ih extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "cartNoteEl", null);
      o(this, "handleClick", async (t) => {
        t.preventDefault();
        const { noteDraft: e } = Pt.cartNote();
        await pr(e), no(this, !1);
      });
    }
    connectedCallback() {
      if (((this.cartNoteEl = this.closest(c.CartNote)), !this.cartNoteEl))
        throw new Error(`${c.CartNoteSubmit} must be inside ${c.CartNote}`);
      this.addEventListener("click", this.handleClick),
        (this.unsubscribe = B.cartNote(({ status: t }) => {
          x.set(this, "xo-loading", t === "loading");
        }));
    }
    disconnectedCallback() {
      this.unsubscribe(), this.removeEventListener("click", this.handleClick);
    }
  }
  class oh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "inputEl", null);
      o(this, "handleInput", (t) => {
        const e = t.target;
        mr(e.value);
      });
    }
    connectedCallback() {
      if (
        ((this.inputEl = this.querySelector(
          'input[type="text"][name="discount"]'
        )),
        !this.inputEl)
      )
        throw new Error(
          `${c.CartDiscount} must have a input element with name="discount"`
        );
      const { discount: t } = Pt.cartDiscount();
      (this.inputEl.value = t),
        this.querySelector(c.CartDiscountSubmit) ||
          this.inputEl.addEventListener("input", this.handleInput);
    }
    disconnectedCallback() {
      this.inputEl &&
        this.inputEl.removeEventListener("input", this.handleInput);
    }
  }
  class nh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "cartDiscountEl", null);
      o(this, "handleClick", (t) => {
        t.preventDefault();
        const e = this.cartDiscountEl.querySelector(
          'input[type="text"][name="discount"]'
        );
        mr(e.value), no(this, !1);
      });
    }
    connectedCallback() {
      if (
        ((this.cartDiscountEl = this.closest(c.CartDiscount)),
        !this.cartDiscountEl)
      )
        throw new Error(
          `${c.CartDiscountSubmit} must be inside ${c.CartDiscount}`
        );
      this.addEventListener("click", this.handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleClick);
    }
  }
  class rh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "fieldEl", null);
      o(this, "handleChange", (t) => {
        const e = t.target;
        this.setState(e.name, e.value);
      });
    }
    setState(t, e) {
      var n;
      const s = t.replace(/address\[|\]/g, "");
      if ((Od(s, e), s === "country")) {
        const a = this.fieldEl.querySelector(
          `option[value="${this.fieldEl.value}"]`
        );
        Fd(dt((n = a.getAttribute("data-provinces")) != null ? n : "[]"));
      }
    }
    connectedCallback() {
      if (
        ((this.fieldEl = this.querySelector('select, input[type="text"]')),
        !this.fieldEl)
      )
        throw new Error(
          `${c.CartShippingRatesField} must have a select or input element`
        );
      const t = this.fieldEl instanceof HTMLInputElement ? "input" : "change";
      this.setState(this.fieldEl.name, this.fieldEl.value),
        this.fieldEl.addEventListener(t, this.handleChange);
      const e = this.fieldEl.name.replace(/address\[|\]/g, "");
      e === "province" &&
        x.set(
          this,
          "xo-disabled",
          Pt.cartShippingRatesForm().provinces.length === 0
        ),
        (this.unsubscribe = B.cartShippingRatesForm(
          ({ provinces: s }) => {
            if (e === "province") {
              this.fieldEl.innerHTML = s
                .map(([a, l]) => `<option value="${a}">${l}</option>`)
                .join("");
              const n = this.fieldEl.querySelector("option");
              n && this.setState(this.fieldEl.name, n.value),
                x.set(this, "xo-disabled", s.length === 0);
            }
          },
          (s, n) => It(s == null ? void 0 : s.provinces, n.provinces)
        ));
    }
    disconnectedCallback() {
      if ((this.unsubscribe(), this.fieldEl)) {
        const t = this.fieldEl instanceof HTMLInputElement ? "input" : "change";
        this.fieldEl.removeEventListener(t, this.handleChange);
      }
    }
  }
  class ah extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "handleClick", async (t) => {
        t.preventDefault();
        const { zip: e, country: s, province: n } = Pt.cartShippingRatesForm();
        await Ld(e, s, n);
      });
    }
    connectedCallback() {
      this.addEventListener("click", this.handleClick),
        (this.unsubscribe = B.cartShippingRates(({ status: t }) => {
          x.set(this, "xo-loading", t === "loading");
        }));
    }
    disconnectedCallback() {
      this.unsubscribe(), this.removeEventListener("click", this.handleClick);
    }
  }
  class lh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
    }
    connectedCallback() {
      this.unsubscribe = B.cartShippingRates(
        ({ status: t, errorMessages: e }) => {
          t === "error" && (this.innerHTML = e.join(", "));
        }
      );
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class ch extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "animated", W());
    }
    connectedCallback() {
      var e;
      const t =
        (e = this.querySelector(c.CartAddErrorMessage)) != null ? e : this;
      this.unsubscribe = B.cart(async ({ addErrorMessage: s }) => {
        s
          ? ((this.style.visibility = "visible"),
            (this.style.height = "auto"),
            (t.innerHTML = s),
            await T(4e3),
            this.animated({
              from: this.offsetHeight,
              to: 0,
              duration: 300,
              onUpdate: (n) => {
                this.style.height = `${n}px`;
              },
              onEnd: () => {
                (t.innerHTML = ""), this.style.removeProperty("visibility");
              },
            }))
          : (t.innerHTML = "");
      });
    }
    disconnectedCallback() {
      this.animated.off(), this.unsubscribe();
    }
  }
  class dh extends HTMLElement {
    get options() {
      return M(this, { pick: ["xoUniqueId"], types: { xoUniqueId: "string" } });
    }
    connectedCallback() {
      const { xoUniqueId: i } = this.options;
      if (!i)
        throw new Error(
          `${c.CartWillChange}: Attribute xo-unique-id is required (Note: xo-unique-id is unique)`
        );
    }
  }
  const Ft = new xe(),
    hh = window.history.pushState,
    uh = window.history.replaceState;
  (window.history.pushState = function (r, i, t) {
    hh.call(window.history, r, i, t), Ft.emit("change", void 0);
  }),
    (window.history.replaceState = function (r, i, t) {
      uh.call(window.history, r, i, t), Ft.emit("change", void 0);
    }),
    window.addEventListener("popstate", () => {
      Ft.emit("change", void 0);
    });
  function ph(r) {
    const i = r.closest(c.Sticky);
    if (i) {
      const t = Array.from(i.querySelectorAll('input[type="radio"], select'));
      v(t, (e) => {
        const s = e.id,
          n = document.querySelector(`label[for="${s}"]`);
        (e.name = pt.addFieldSignal(e.name, eo)),
          s && (e.id = pt.addFieldSignal(s, eo)),
          n && n.setAttribute("for", pt.addFieldSignal(s, eo));
      });
    }
  }
  let ao = -1,
    gr = -1;
  const br = new Map();
  class yr extends HTMLElement {
    constructor(
      t,
      e = 'input[type="radio"]:not([xo-for-quick-view]), select:not([xo-for-quick-view])',
      s = !1
    ) {
      super();
      o(this, "fieldEls", []);
      o(this, "productEl", this.closest(c.Product));
      o(this, "fieldSelector");
      o(this, "isProductQuickViewVariant");
      o(this, "cartFormUnsubscribe", () => {});
      o(this, "getBindingElements", (t, e) => {
        if (e.includes(":")) {
          const s = e.replace(/.*:/g, "").replace(/\[.*/g, "").trim();
          return s ? Array.from(t.querySelectorAll(s)) : [t];
        }
        return [t];
      });
      o(this, "getBindingType", (t) =>
        t.includes("[")
          ? t.replace(/.*\[/g, "").replace(/\]/g, "").trim()
          : "children"
      );
      o(this, "handleBindingAttr", () => {
        var d, h, u, p, m, f;
        const { xoSectionId: t, xoProductId: e } = this.productEl.options,
          s = St(t, e),
          n = dt(
            (u =
              (h =
                (d = this.productEl) == null
                  ? void 0
                  : d.querySelector(c.ProductLiquidStatic)) == null
                ? void 0
                : h.textContent) != null
              ? u
              : "{}"
          ),
          a = n == null ? void 0 : n[s],
          l = [
            ...Array.from(this.productEl.querySelectorAll(`[${so}]`)),
            ...Array.from(
              (f =
                (m =
                  (p = this.productEl.querySelector(`template[${ir}]`)) == null
                    ? void 0
                    : p.content) == null
                  ? void 0
                  : m.querySelectorAll(`[${so}]`)) != null
                ? f
                : []
            ),
          ];
        v(l, (b) => {
          const y = b.getAttribute(so).split(",");
          v(y, (E) => {
            const C = E.replace(/:.*/g, "").trim(),
              S = this.getBindingElements(b, E),
              k = this.getBindingType(E);
            if (oe(a) === "object") {
              const $ = a[C];
              $ != null &&
                v(S, (L) => {
                  k === "children" ? (L.innerHTML = $) : L.setAttribute(k, $);
                });
            }
          });
        });
      });
      o(this, "handleChange", (t) => {
        const e = t.target,
          { value: s } = e,
          { name: n } = e,
          {
            xoSectionId: a,
            xoProductId: l,
            xoFeaturedProduct: d,
            xoProductUrl: h,
          } = this.productEl.options,
          { productUrl: u } = Pt.product(),
          p = pt.removeFieldSignal(n);
        if (
          (Os(a, l, p, s),
          this.closePopover(),
          this.condChangeVariantAndRequest())
        )
          this.handleProductInformation();
        else if (d) {
          const m = yt.stringify({ section_id: a, variant: St(a, l) }),
            f = `${h}?${m}`;
          io(f, !0), this.bindAvailable();
        } else if (u != null) {
          const m = yt.stringify({ section_id: a, variant: St(a, l) }),
            f = `${u}?${m}`;
          io(f), this.bindAvailable();
        } else this.handleBindingAttr(), this.bindAvailable();
        this.handleUnavailable();
      });
      o(this, "setFormVariantAfterLocationChange", () => {
        const { xoSectionId: t, xoProductId: e } = this.productEl.options,
          { productData: s } = Ut(),
          n = yt.parse(window.location.search, !0).variant,
          a = document.querySelector('[action*="/cart/add"] input[name="id"]');
        a && (a.value = n);
        const l = s[e].variants.find((d) => d.id == n);
        if (l) {
          const d = l.options.reduce((h, u) => {
            var p;
            return [
              ...h,
              ...Array.from(
                this.querySelectorAll(
                  `input[type="radio"]:not([xo-for-quick-view])[value="${u}"]`
                )
              ),
              ...Array.from(
                (p = this.querySelector(
                  `select:not([xo-for-quick-view])[value="${u}"]`
                )) != null
                  ? p
                  : []
              ),
            ];
          }, []);
          v(d, (h) => {
            if (h) {
              const u = pt.removeFieldSignal(h.name);
              Os(t, e, u, h.value);
            }
          }),
            this.bindAvailable();
        }
      });
      o(this, "handleLocationChange", async () => {
        const {
          xoSectionId: t,
          xoProductId: e,
          xoProductInformation: s,
        } = this.productEl.options;
        if (this.condChangeVariantAndRequest() && s) {
          this.setFormVariantAfterLocationChange(), Xc(t, e);
          const { href: n } = window.location,
            a = n.includes("?")
              ? `${n}&section_id=${t}`
              : `${n}?section_id=${t}`;
          await io(a);
        }
      });
      o(this, "handleProductVariantSelected", (t) => {
        const e = pt.removeFieldSignal(t.name),
          s = Array.from(
            this.productEl.querySelectorAll(
              `${c.ProductVariantSelected}[xo-name="${e}"]`
            )
          );
        v(s, (n) => {
          n && (n.innerHTML = t.value);
        });
      });
      o(this, "closePopover", () => {
        const t = this.closest(c.Popover),
          e = t == null ? void 0 : t.querySelector(c.Product);
        if (t && !e) {
          const s = t.getAttribute("xo-name");
          ce.close(s);
        }
      });
      o(this, "isUnavailable", () => {
        const { xoSectionId: t, xoProductId: e } = this.productEl.options,
          s = St(t, e);
        return this.children.length === 0 ? !1 : !s;
      });
      o(this, "handleUnavailable", () => {
        x.set(this.productEl, "xo-unavailable", this.isUnavailable());
      });
      o(this, "handleAvailable", (t, e) => {
        if (t instanceof HTMLInputElement) {
          const { xoSectionId: s, xoProductId: n } = this.productEl.options,
            a = pt.removeFieldSignal(t.name),
            l = Qc(s, n, a, t.value),
            d = Zc(s, n, a, t.value);
          x.set(t, "xo-disabled", !l), x.set(t, "xo-unavailable", !d);
        }
      });
      o(this, "bindAvailable", () => {
        const t = Array.from(
          this.productEl.querySelectorAll(this.fieldSelector)
        );
        v(t, this.handleAvailable), this.handleUnavailable();
      });
      o(this, "cartFormListener", () => {
        var a, l;
        const { xoSectionId: t, xoProductId: e } = this.productEl.options,
          s = kt(t, e),
          n =
            (l = (a = Wt()) == null ? void 0 : a[s]) == null
              ? void 0
              : l.variantSelected;
        n &&
          !It(br.get(s), n) &&
          v(bt(n), (d) => {
            const h = n[d];
            this.handleSyncFields(d, h);
          }),
          br.set(s, n);
      });
      (this.fieldSelector = e),
        (this.isProductQuickViewVariant = s),
        (this.productEl = t != null ? t : this.closest(c.Product)),
        gr++,
        ph(this);
    }
    condChangeVariantAndRequest() {
      const { xoProductInformation: t } = this.productEl.options,
        e = this.closest(c.ProductQuickView);
      return jc() && t && !e;
    }
    handleProductInformation() {
      const { xoSectionId: t, xoProductId: e } = this.productEl.options,
        s = St(t, e),
        n = `${window.location.pathname}${s ? `?variant=${s}` : ""}`;
      window.location.href !== n && window.history.replaceState({}, "", n);
    }
    handleSyncFields(t, e) {
      var n, a;
      const { xoProductInformation: s } = this.productEl.options;
      if (s) {
        const l = Array.from(
          (a =
            (n = this.productEl) == null
              ? void 0
              : n.querySelectorAll(
                  `input[type="radio"][name="${t}"][value="${e}"], input[type="radio"][name$="${t}"][value="${e}"], select[name="${t}"], select[name$="${t}"]`
                )) != null
            ? a
            : []
        );
        v(l, (d) => {
          if (
            !(
              d.closest(c.ProductRecommendations) ||
              d.getAttribute("xo-for-quick-view")
            )
          )
            if (d instanceof HTMLSelectElement) {
              const u = Array.from(d.querySelectorAll("option"));
              v(u, (p) => {
                p.selected = p.value === e;
              });
            } else
              d instanceof HTMLInputElement &&
                ((d.checked = !0), this.handleProductVariantSelected(d));
        });
      }
    }
    handleFirstVariant(t) {
      const { xoSectionId: e, xoProductId: s } = this.productEl.options,
        n = pt.removeFieldSignal(t.name);
      if (t instanceof HTMLInputElement)
        (t.checked ||
          (t.hasAttribute("checked") &&
            t.getAttribute("checked") !== "false")) &&
          ((t.checked = !0),
          Os(e, s, n, t.value),
          this.handleProductVariantSelected(t));
      else if (t instanceof HTMLSelectElement) {
        const a = Array.from(t.querySelectorAll("option"));
        v(a, (l) => {
          (l.selected ||
            (l.hasAttribute("selected") &&
              l.getAttribute("selected") !== "false")) &&
            ((l.selected = !0), Os(e, s, n, t.value));
        });
      }
    }
    connectedCallback() {
      var s;
      if ((s = window.xbEditor) != null && s.designMode) return;
      if (!this.productEl)
        throw new Error(`${c.CartAdd} must be in ${c.Product}`);
      const { xoProductId: t, xoProductInformation: e } =
        this.productEl.options;
      (this.fieldEls = Array.from(this.querySelectorAll(this.fieldSelector))),
        !this.isProductQuickViewVariant &&
          e &&
          (Ft.off(ao), (ao = Ft.on("change", this.handleLocationChange))),
        v(this.fieldEls, (n) => {
          (n.name = pt.addFieldSignal(n.name, `SIGNAL_${t}_${gr}`)),
            this.handleFirstVariant(n),
            n.addEventListener("change", this.handleChange);
        }),
        this.bindAvailable(),
        (this.cartFormUnsubscribe = Fs(this.cartFormListener));
    }
    disconnectedCallback() {
      var e;
      if ((e = window.xbEditor) != null && e.designMode) return;
      const { xoProductInformation: t } = this.productEl.options;
      v(this.fieldEls, (s) => {
        s.removeEventListener("change", this.handleChange);
      }),
        !this.isProductQuickViewVariant && t && Ft.off(ao),
        this.cartFormUnsubscribe();
    }
  }
  class mh extends HTMLElement {
    connectedCallback() {
      var e;
      const i = dt(this.textContent),
        { productData: t } = Pt.product();
      if (i.id) bt(t).includes(i.id.toString()) || Wc(i);
      else
        throw new Error(
          `ProductData: Invalid product data (Content: ${
            (e = this.textContent) == null ? void 0 : e.trim()
          }).`
        );
    }
  }
  class fh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
      o(this, "buyItNowEl", null);
      o(this, "productEl", this.closest(c.Product));
      o(this, "handleBuyItNow", (t) => {
        t.preventDefault();
      });
      o(this, "handleChange", (t, e, s) => {
        var y, E;
        if (!this.productEl) return;
        const { xoUniqueId: n } = this.options,
          l = new DOMParser().parseFromString(e, "text/html"),
          d = !!s;
        let h = null;
        d
          ? (h = l.querySelector(
              `${c.Product}[xo-featured-product][xo-product-url="${s}"] ${c.ProductWillChange}[xo-unique-id="${n}"]`
            ))
          : (h = l.querySelector(
              `${c.ProductWillChange}[xo-unique-id="${n}"]`
            ));
        const { xoProductUrl: u, xoSectionId: p } = this.productEl.options,
          m =
            (y = h == null ? void 0 : h.closest(c.Product)) == null
              ? void 0
              : y.getAttribute("xo-product-url"),
          f =
            (E = h == null ? void 0 : h.closest(c.Product)) == null
              ? void 0
              : E.getAttribute("xo-section-id");
        let b = h && this.innerHTML !== h.innerHTML && t === "success";
        if ((d && (b = b && u === m && p === f), b)) {
          const C = this.querySelector('[data-shopify="payment-button"]'),
            S = x.get(h, "xo-disabled");
          if ((x.set(this, "xo-disabled", S), !C)) {
            this.innerHTML = h.innerHTML;
            const k = Array.from(h.attributes);
            v(k, ($) => {
              this.setAttribute($.name, $.value);
            });
          }
        }
      });
    }
    get options() {
      return M(this, {
        pick: ["xoUniqueId", "xoDisabled"],
        types: { xoUniqueId: "string", xoDisabled: "boolean" },
      });
    }
    connectedCallback() {
      var s;
      const { xoUniqueId: t, xoDisabled: e = !1 } = this.options;
      if (!t)
        throw new Error(
          `${c.ProductWillChange}: Attribute xo-unique-id is required (Note: xo-unique-id is unique)`
        );
      if (e) {
        (this.buyItNowEl = this.querySelector(
          '[data-shopify="payment-button"]'
        )),
          (s = this.buyItNowEl) == null ||
            s.addEventListener("click", this.handleBuyItNow);
        return;
      }
      this.unsubscribe = B.product(
        ({ status: n, productHtml: a, featuredProductHtmls: l }) => {
          if (this.productEl) {
            const { xoFeaturedProduct: d } = this.productEl.options;
            d
              ? bt(l).forEach((h) => {
                  const u = l[h];
                  this.handleChange(n, u, h);
                })
              : this.handleChange(n, a);
          }
        }
      );
    }
    disconnectedCallback() {
      var t;
      this.unsubscribe(),
        (t = this.buyItNowEl) == null ||
          t.removeEventListener("click", this.handleBuyItNow);
    }
  }
  class xh extends HTMLElement {
    get options() {
      return M(this, {
        pick: [
          "xoProductId",
          "xoSectionId",
          "xoProductInformation",
          "xoFeaturedProduct",
          "xoProductUrl",
          "xoCartExclude",
        ],
        types: {
          xoProductId: "string",
          xoSectionId: "string",
          xoProductInformation: "boolean",
          xoFeaturedProduct: "boolean",
          xoProductUrl: "string",
          xoCartExclude: "boolean",
        },
      });
    }
    connectedCallback() {
      const { xoProductId: i, xoSectionId: t } = this.options;
      if (!i)
        throw new Error(`${c.Product}: Attribute xo-product-id is required.`);
      if (!t)
        throw new Error(`${c.Product}: Attribute xo-section-id is required.`);
    }
  }
  class gh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
    }
    connectedCallback() {
      this.unsubscribe = B.product(({ pickupAvailabilityHtml: t }) => {
        if (t) {
          const s = new DOMParser()
            .parseFromString(t, "text/html")
            .querySelector(`${c.ProductPickupAvailability}`);
          s
            ? this.innerHTML !== s.innerHTML && (this.innerHTML = s.innerHTML)
            : (this.innerHTML = "");
        }
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class bh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
    }
    connectedCallback() {
      this.unsubscribe = B.product(({ pickupAvailabilityHtml: t }) => {
        if (t) {
          const s = new DOMParser()
            .parseFromString(t, "text/html")
            .querySelector(c.ProductPickupAvailabilityList);
          s
            ? this.innerHTML !== s.innerHTML && (this.innerHTML = s.innerHTML)
            : (this.innerHTML = "");
        }
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class yh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "unsubscribe", () => {});
    }
    connectedCallback() {
      var e;
      const t = (e = this.getAttribute("xo-name")) != null ? e : sr;
      this.unsubscribe = B.product(({ status: s, quickviewProductHtml: n }) => {
        var y, E;
        const l = ((y = n[t]) != null ? y : "").replace(
            new RegExp(`${c.ProductVariant}(?=(\\s|>))`, "g"),
            c.ProductQuickViewVariant
          ),
          h = new DOMParser().parseFromString(l, "text/html"),
          u = Array.from(h.querySelectorAll(c.Animate));
        v(u, (C) => {
          C.setAttribute("xo-type", "none");
        });
        const p = h.querySelector("template[xo-quick-view-content]"),
          m = h.querySelector(
            `${c.Product}[xo-product-information]:not([xo-product-information="false"])`
          ),
          f = p == null ? void 0 : p.content.cloneNode(!0);
        if (
          (f == null ? void 0 : f.children.length) &&
          (f == null ? void 0 : f.children.length) > 1
        )
          throw new Error(
            "The <template xo-quick-view-content> element must have only one child node."
          );
        const b = (f == null ? void 0 : f.children[0]) || m;
        if (b && this.innerHTML === "" && s === "success") {
          const C = Array.from(
            b.querySelectorAll(
              `${c.ProductQuickViewVariant} input[type="radio"], ${c.ProductQuickViewVariant} select`
            )
          );
          v(C, (k) => {
            const $ = k.id,
              L = h.querySelector(`label[for="${$}"]`);
            (k.name = pt.addFieldSignal(k.name, Ns)),
              $ && (k.id = pt.addFieldSignal($, Ns)),
              L && L.setAttribute("for", pt.addFieldSignal($, Ns)),
              x.set(k, "xo-for-quick-view", !0);
          });
          const S = Array.from(
            b.querySelectorAll(`[xo-name]:not(${c.ProductVariantSelected})`)
          );
          v(S, (k) => {
            k.setAttribute(
              "xo-name",
              pt.addFieldSignal(k.getAttribute("xo-name"), Ns)
            );
          }),
            this.innerHTML !== b.outerHTML &&
              ((this.innerHTML = b.outerHTML),
              (E = window.Shopify.PaymentButton) == null || E.init());
        }
      });
    }
    disconnectedCallback() {
      this.unsubscribe();
    }
  }
  class vh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "handleClick", async () => {
        const {
            xoModalName: t,
            xoToggleName: e,
            xoProductUrl: s,
            xoName: n = sr,
          } = this.options,
          a = document.querySelector(c.ProductQuickView);
        a && (a.innerHTML = ""),
          x.set(this, "xo-loading", !0),
          await Uc(n, s),
          x.set(this, "xo-loading", !1),
          t && Ht.open(t),
          e && kn.open(e);
      });
    }
    get options() {
      return M(this, {
        pick: ["xoName", "xoProductUrl", "xoModalName", "xoToggleName"],
        types: {
          xoName: "string",
          xoProductUrl: "string",
          xoModalName: "string",
          xoToggleName: "string",
        },
      });
    }
    connectedCallback() {
      const { xoProductUrl: t } = this.options;
      if (!t)
        throw new Error(
          `${c.ProductQuickViewTrigger} must have a xo-product-url attribute`
        );
      this.addEventListener("click", this.handleClick);
    }
    disconnectedCallback() {
      this.removeEventListener("click", this.handleClick);
    }
  }
  class Eh extends yr {
    constructor() {
      const i = document.querySelector(`${c.ProductQuickView} ${c.Product}`);
      super(
        i,
        'input[type="radio"][xo-for-quick-view], select[xo-for-quick-view]',
        !0
      );
    }
  }
  class wh extends HTMLElement {
    connectedCallback() {
      if (!this.closest(c.Product))
        throw new Error(
          `${c.ProductLiquidStatic} must be a child of ${c.Product}}`
        );
    }
  }
  let lo = -1;
  class Ch extends HTMLElement {
    constructor() {
      super();
      o(this, "recipientFieldsLiveRegion");
      o(
        this,
        "checkboxInput",
        this.querySelector(
          'input[type="checkbox"][name="properties[__shopify_send_gift_card_to_recipient]"]'
        )
      );
      o(
        this,
        "hiddenControlField",
        this.querySelector(
          'input[type="hidden"][name="properties[__shopify_send_gift_card_to_recipient]"]'
        )
      );
      o(
        this,
        "emailInput",
        this.querySelector('input[name="properties[Recipient email]"]')
      );
      o(
        this,
        "nameInput",
        this.querySelector('input[name="properties[Recipient name]"]')
      );
      o(
        this,
        "messageInput",
        this.querySelector('textarea[name="properties[Message]"]')
      );
      o(
        this,
        "sendonInput",
        this.querySelector('input[name="properties[Send on]"]')
      );
      o(
        this,
        "offsetProperty",
        this.querySelector('input[name="properties[__shopify_offset]"]')
      );
      o(this, "currentProductVariantId", "");
      o(this, "unsubscribe", () => {});
      o(this, "handleChange", () => {
        var t;
        (t = this.checkboxInput) != null && t.checked
          ? (rr(this.checkboxInput.name, "on"),
            this.enableInputFields(),
            x.set(this, "xo-active", !0),
            this.recipientFieldsLiveRegion &&
              window.accessibilityStrings.recipientFormExpanded &&
              (this.recipientFieldsLiveRegion.innerText =
                window.accessibilityStrings.recipientFormExpanded))
          : (this.clearInputFields(),
            this.disableInputFields(),
            cd(),
            x.set(this, "xo-active", !1),
            this.recipientFieldsLiveRegion &&
              window.accessibilityStrings.recipientFormCollapsed &&
              (this.recipientFieldsLiveRegion.innerText =
                window.accessibilityStrings.recipientFormCollapsed));
      });
      o(this, "clearInputFields", () => {
        v(this.inputFields, (t) => {
          t && (t.value = "");
        });
      });
      o(this, "enableInputFields", () => {
        v(this.disableableFields, (t) => {
          t && (t.disabled = !1);
        });
      });
      o(this, "disableInputFields", () => {
        v(this.disableableFields, (t) => {
          t && (t.disabled = !0);
        });
      });
      o(this, "resetRecipientForm", () => {
        var t;
        (t = this.checkboxInput) != null &&
          t.checked &&
          ((this.checkboxInput.checked = !1),
          this.handleChange(),
          x.set(this, "xo-error", !1));
      });
      o(this, "setCurrentVariantId", () => {
        const { xoSectionId: t, xoProductId: e } = this.productEl.options,
          s = St(t, e);
        this.currentProductVariantId = s;
      });
      o(this, "handleFieldsChange", (t) => {
        const e = t.target,
          { name: s, value: n } = e;
        rr(s, n);
      });
      o(this, "bindFieldChange", () => {
        v(this.inputFields, (t) => {
          t && t.addEventListener("input", this.handleFieldsChange);
        });
      });
      (this.recipientFieldsLiveRegion = this.querySelector(
        `#Recipient-fields-live-region-${this.dataset.sectionId}`
      )),
        this.checkboxInput && (this.checkboxInput.disabled = !1),
        this.hiddenControlField && (this.hiddenControlField.disabled = !0),
        this.offsetProperty &&
          (this.offsetProperty.value = new Date()
            .getTimezoneOffset()
            .toString());
    }
    get productEl() {
      return this.closest(c.Product);
    }
    get inputFields() {
      return [
        this.emailInput,
        this.nameInput,
        this.messageInput,
        this.sendonInput,
      ];
    }
    get disableableFields() {
      return [...this.inputFields, this.offsetProperty];
    }
    connectedCallback() {
      if (!this.productEl)
        throw new Error(`${c.ProductRecipientForm} must be in ${c.Product}`);
      this.bindFieldChange(),
        this.handleChange(),
        this.addEventListener("change", this.handleChange),
        this.setCurrentVariantId(),
        Ft.off(lo),
        (lo = Ft.on("change", this.setCurrentVariantId)),
        (this.unsubscribe = B.cart(
          ({ isAdded: t, variantId: e, addErrorMessage: s }) => {
            if (s) {
              const n = this.querySelector(c.ProductRecipientFormError);
              n && ((n.innerText = s), x.set(this, "xo-error", !0));
            }
            t &&
              e === this.currentProductVariantId &&
              this.resetRecipientForm();
          }
        ));
    }
    disconnectedCallback() {
      this.removeEventListener("change", this.handleChange),
        Ft.off(lo),
        this.unsubscribe();
    }
  }
  const Sh = "intent=related";
  class Ph extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "handleIntersection", async (t, e) => {
        var s;
        try {
          if (!t[0].isIntersecting) return;
          e.unobserve(this);
          const { xoUrl: n } = this.options,
            l = await (await fetch(n)).text(),
            d = document.createElement("div");
          d.innerHTML = l;
          const h = d.querySelector(c.ProductRecommendations);
          if (h && h.innerHTML.trim().length) {
            this.innerHTML = h.innerHTML;
            const u =
              (s = this.closest('[id^="shopify-section-template--"]')) == null
                ? void 0
                : s.querySelectorAll("[xo-products-count]");
            u == null ||
              u.forEach((p, m) => {
                const f = d.querySelectorAll("[xo-products-count]")[m];
                p.setAttribute(
                  "xo-products-count",
                  `${f.getAttribute("xo-products-count")}`
                );
              });
          } else if (window.Xotiny) {
            if (n.endsWith(Sh)) {
              const u = this.closest('[id^="shopify-section-template--"]');
              u == null || u.remove();
            }
          } else {
            const u = this.closest("[data-xb-section-id]");
            u == null || u.remove();
          }
        } catch (n) {
          console.error(n);
        }
      });
    }
    get options() {
      return M(this, { pick: ["xoUrl"], types: { xoUrl: "string" } });
    }
    connectedCallback() {
      var t;
      ((t = window.xbEditor) != null && t.designMode) ||
        new IntersectionObserver(this.handleIntersection, {
          rootMargin: "0px 0px 400px 0px",
        }).observe(this);
    }
  }
  const Le = 300;
  let vr =
    ((oi = class extends q {
      constructor() {
        super(...arguments);
        o(this, "state", {
          isHover: !1,
          carouselNextContent: "",
          carouselPrevContent: "",
        });
        o(this, "productEl", this.closest(c.Product));
        o(this, "contentEl", null);
        o(this, "media");
        o(this, "animated", W());
        o(this, "delayCancel", () => {});
        o(this, "renderCarousel", () => {
          if (!this.media || this.contentEl) return "";
          const {
              xoCarouselAutoplay: t,
              xoCarouselType: e,
              xoImageLazyloadOverlayContent: s,
            } = this.props,
            { carouselNextContent: n, carouselPrevContent: a } = this.state,
            l = n && a,
            d = this.media.filter((h) => h.media_type === "image");
          return d.length <= 1
            ? ""
            : `
      <xo-carousel xo-product-media-content xo-type="${e}" xo-active-index="1" xo-rewind xo-speed="600" xo-autoplay="${t}">
        <xo-carousel-inner>
          <xo-carousel-list>
            ${d
              .map((h) => {
                var u;
                return `
                <xo-carousel-slide>
                  <div style="position: relative"><img is="xo-lazyload" src="${Ni(
                    h.src,
                    { width: 100 }
                  )}" alt="${
                  (u = h.alt) != null ? u : ""
                }" /><div class="xo-lazyload-overlay">${s}</div></div>
                </xo-carousel-slide>
              `;
              })
              .join("")}
          </xo-carousel-list>
        </xo-carousel-inner>
        ${
          l
            ? `<xo-carousel-prev style="opacity: 0">${a}</xo-carousel-prev><xo-carousel-next style="opacity: 0">${n}</xo-carousel-next>`
            : ""
        }
      </xo-carousel>
    `;
        });
        o(this, "renderVideo", () => {
          var n;
          if (!this.media || this.contentEl) return "";
          const s = (
            (n = this.media.filter((a) => a.media_type === "video")) == null
              ? void 0
              : n[0]
          ).sources
            .filter((a) => a.format === "mp4")
            .reduce(
              (a, l) =>
                l.width > a.maxWidth ? { url: l.url, maxWidth: l.width } : a,
              { url: "", maxWidth: 0 }
            ).url;
          return s
            ? `
      <xo-video-cover xo-product-media-content xo-src="${s}" style="opacity: 0"></xo-video-cover>
    `
            : "";
        });
        o(this, "handleNextElementHide", async () => {
          const { xoCarouselAutoplay: t } = this.props;
          this.delayCancel = await T(t + 100 || Le);
          const { isHover: e } = this.state;
          if (e) {
            const s = Array.from(
              this.querySelectorAll("[xo-product-media-content] ~ *")
            );
            v(s, (n) => {
              x.set(n, "xo-hidden", !0);
            });
          }
        });
        o(this, "handleNextElementShow", () => {
          const t = Array.from(
            this.querySelectorAll("[xo-product-media-content] ~ *")
          );
          v(t, (e) => {
            x.set(e, "xo-hidden", !1);
          });
        });
        o(this, "getType", () => {
          var e;
          const { xoType: t } = this.props;
          return t === "carousel"
            ? "carousel"
            : t === "video" ||
              ((e = this.media) != null &&
                e.some((n) => n.media_type === "video"))
            ? "video"
            : "carousel";
        });
        o(this, "handleMouseEnter", async () => {
          const t = this.getType();
          if ((this.setState({ isHover: !0 }), t === "carousel")) {
            this.delayCancel(),
              this.insertAdjacentHTML("afterbegin", this.renderCarousel()),
              (this.contentEl = this.querySelector(
                "[xo-product-media-content]"
              )),
              this.contentEl.addEventListener(
                "xo:carousel:init",
                this.handleNextElementHide
              ),
              await T(Le);
            const e = this.contentEl.querySelector(c.CarouselNext),
              s = this.contentEl.querySelector(c.CarouselPrev);
            e &&
              s &&
              this.animated({
                from: 0,
                to: 1,
                duration: Le,
                onUpdate: (n) => {
                  (e.style.opacity = `${n}`), (s.style.opacity = `${n}`);
                },
              });
          } else
            this.insertAdjacentHTML("afterbegin", this.renderVideo()),
              (this.contentEl = this.querySelector(
                "[xo-product-media-content]"
              )),
              this.animated({
                from: 0,
                to: 1,
                duration: Le + 100,
                onUpdate: (e) => {
                  this.contentEl.style.opacity = `${e}`;
                },
              });
        });
        o(this, "handleMouseLeave", () => {
          this.setState({ isHover: !1 }),
            this.handleNextElementShow(),
            this.delayCancel(),
            this.contentEl &&
              (this.contentEl.removeEventListener(
                "xo:carousel:init",
                this.handleNextElementHide
              ),
              this.animated.off(),
              this.animated({
                from: 1,
                to: 0,
                duration: Le,
                onUpdate: (t) => {
                  this.contentEl.style.opacity = `${t}`;
                },
                onEnd: () => {
                  this.contentEl.remove(), (this.contentEl = null);
                },
              }));
        });
      }
      async mount() {
        var l, d;
        if ((await T(), !this.productEl))
          throw new Error(`${c.ProductMedia} must be in ${c.Product}`);
        const { xoTargetSelector: t } = this.props,
          { xoProductId: e } = this.productEl.options,
          { productData: s } = Ut();
        this.media = s[e].media;
        const n = t ? this.querySelector(t) : this,
          a = n != null ? n : this;
        a.addEventListener("mouseenter", this.handleMouseEnter),
          a.addEventListener("mouseleave", this.handleMouseLeave),
          this.setState({
            carouselNextContent:
              (l = this.props.xoCarouselNextContent) != null ? l : "",
            carouselPrevContent:
              (d = this.props.xoCarouselPrevContent) != null ? d : "",
          }),
          this.setProps({
            xoCarouselNextContent: void 0,
            xoCarouselPrevContent: void 0,
          });
      }
      unmount() {
        var n, a;
        const { xoTargetSelector: t } = this.props,
          e = t ? this.querySelector(t) : this,
          s = e != null ? e : this;
        (n = this.animated) == null || n.off(),
          this.handleNextElementShow(),
          this.delayCancel(),
          s.removeEventListener("mouseenter", this.handleMouseEnter),
          s.removeEventListener("mouseleave", this.handleMouseLeave),
          (a = this.contentEl) == null ||
            a.removeEventListener(
              "xo:carousel:init",
              this.handleNextElementHide
            );
      }
    }),
    o(oi, "propTypes", {
      xoType: "string",
      xoTargetSelector: "string",
      xoCarouselAutoplay: "number",
      xoCarouselPrevContent: "string",
      xoCarouselNextContent: "string",
      xoCarouselType: "string",
      xoRtl: "boolean",
      xoImageLazyloadOverlayContent: "string",
    }),
    o(oi, "defaultProps", {
      xoType: "carousel",
      xoTargetSelector: "",
      xoCarouselAutoplay: 1500,
      xoCarouselPrevContent: "",
      xoCarouselNextContent: "",
      xoCarouselType: "fade",
      xoRtl: getComputedStyle(document.documentElement).direction === "rtl",
      xoImageLazyloadOverlayContent: "",
    }),
    oi);
  vr = X([U(c.ProductMedia)], vr);
  const Ie = 0,
    De = 100;
  let Er =
    ((ni = class extends q {
      constructor() {
        super(...arguments);
        o(this, "unsubscribe", () => {});
        o(this, "animated", W());
        o(this, "handleAnimate", (t, e) => (s) => {
          const { top: n, left: a } = Y(t),
            { width: l, height: d } = t.getBoundingClientRect(),
            { top: h, left: u } = Y(e),
            { width: p, height: m } = e.getBoundingClientRect(),
            f = D({
              inputRange: [Ie, De],
              outputRange: [n, h],
              easing: (C) => -2 * C * C * C - -3 * C * C,
              value: s,
            }),
            b = D({ inputRange: [Ie, De], outputRange: [a, u], value: s }),
            y = D({ inputRange: [Ie, De], outputRange: [l, p], value: s }),
            E = D({ inputRange: [Ie, De], outputRange: [d, m], value: s });
          (this.style.top = `${f}px`),
            (this.style.left = `${b}px`),
            (this.style.width = `${y}px`),
            (this.style.height = `${E}px`);
        });
        o(this, "handle", (t) => {
          const { xoSpeed: e, xoEasing: s } = this.props,
            n = document.querySelector("[xo-cart-fly-end]");
          n &&
            ((this.style.display = "block"),
            this.animated({
              from: Ie,
              to: De,
              duration: e,
              easing: R[s],
              onUpdate: this.handleAnimate(t, n),
              onEnd: () => {
                this.style.removeProperty("display");
              },
            }));
        });
      }
      mount() {
        this.unsubscribe = B.cart((t) => {
          var s, n;
          let e = "";
          t.item
            ? (e = (s = t.item) == null ? void 0 : s.featured_image.src)
            : t.items &&
              t.items.length > 0 &&
              (e = (n = t.items[0]) == null ? void 0 : n.featured_image.src),
            e &&
              this.style.setProperty(
                "--product-featured-image",
                `url('${Ni(e, { width: 300 })}')`
              );
        });
      }
      unmount() {
        this.unsubscribe();
      }
    }),
    o(ni, "propTypes", { xoSpeed: "number", xoEasing: "string" }),
    o(ni, "defaultProps", { xoSpeed: 1e3, xoEasing: "ease" }),
    ni);
  Er = X([U(c.CartFly)], Er);
  let wr =
    ((ri = class extends q {}),
    o(ri, "propTypes", { xoName: "string", xoDiscounts: "array" }),
    o(ri, "defaultProps", { xoDiscounts: [] }),
    ri);
  wr = X([U(c.BundleProvider)], wr);
  let Cr =
    ((Vo = class extends q {
      constructor() {
        super(...arguments);
        o(this, "providerEl", this.closest(c.BundleProvider));
        o(this, "unsubscribe", () => {});
      }
      mount() {
        if (!this.providerEl)
          throw new Error(
            `${c.BundleContent} must be a child of ${c.BundleProvider}}`
          );
        const { xoName: t } = this.providerEl.props,
          { xoGroup: e } = this.props;
        this.unsubscribe = B.bundle(
          ({ bundles: s }) => {
            var a, l;
            const n =
              (l = e
                ? (a = s[t]) == null
                  ? void 0
                  : a.filter((d) => d.group === e)
                : s[t]) != null
                ? l
                : [];
            this.setState({ bundle: n }),
              this.setProps({ xoEmpty: n.length === 0 });
          },
          (s, n) =>
            (s == null ? void 0 : s.observed) ===
            (n == null ? void 0 : n.observed)
        );
      }
      stateUpdate() {
        const { bundle: t } = this.state;
        this.innerHTML = t.map((e) => e.html).join("");
      }
      unmount() {
        this.unsubscribe();
      }
    }),
    o(Vo, "propTypes", { xoGroup: "string", xoEmpty: "boolean" }),
    Vo);
  Cr = X([U(c.BundleContent)], Cr);
  let Sr =
    ((ai = class extends q {
      constructor() {
        super(...arguments);
        o(this, "productEl", this.closest(c.Product));
        o(this, "providerEl", this.closest(c.BundleProvider));
        o(this, "unsubscribe", () => {});
        o(this, "getBundleTemplateEl", () =>
          this.productEl.querySelector(`template[${ir}]`)
        );
        o(this, "handleClick", () => {
          const { xoDiscounts: t, xoName: e } = this.providerEl.props,
            { xoGroup: s } = this.props,
            { xoProductId: n, xoSectionId: a } = this.productEl.options,
            l = St(a, n),
            d = this.getBundleTemplateEl(),
            h = d == null ? void 0 : d.getAttribute(Vc),
            u = d == null ? void 0 : d.innerHTML,
            p = Math.max(...t.map(({ minQuantity: m }) => m));
          if (u && h) {
            const m = Number(h);
            Vd(e, p, {
              group: s,
              variantId: l,
              html: u,
              productId: n,
              productPrice: m,
              quantity: 1,
              trigger: this,
            });
          }
        });
      }
      async mount() {
        if (!this.providerEl)
          throw new Error(
            `${c.BundleAdd} must be a child of ${c.BundleProvider}}`
          );
        this.addEventListener("click", this.handleClick),
          (this.unsubscribe = B.bundle(({ bundles: t }) => {
            var a;
            const { xoName: e } = this.providerEl.props,
              n = ((a = t[e]) != null ? a : []).some((l) => l.trigger === this);
            this.setProps({ xoDisabled: n });
          }));
      }
      unmount() {
        this.removeEventListener("click", this.handleClick), this.unsubscribe();
      }
    }),
    o(ai, "propTypes", { xoGroup: "string", xoDisabled: "boolean" }),
    o(ai, "defaultProps", {}),
    ai);
  Sr = X([U(c.BundleAdd)], Sr);
  let Pr =
    ((Bo = class extends q {
      constructor() {
        super(...arguments);
        o(this, "providerEl", this.closest(c.BundleProvider));
        o(this, "handleClick", () => {
          const { xoName: t } = this.providerEl.props,
            { xoProductId: e } = this.props,
            s = ut(this),
            n = St(s, e);
          Bd(t, n);
        });
      }
      mount() {
        if (!this.providerEl)
          throw new Error(
            `${c.BundleRemove} must be a child of ${c.BundleProvider}}`
          );
        this.addEventListener("click", this.handleClick);
      }
      unmount() {
        this.removeEventListener("click", this.handleClick);
      }
    }),
    o(Bo, "propTypes", { xoProductId: "string" }),
    Bo);
  Pr = X([U(c.BundleRemove)], Pr);
  let Ar =
    ((li = class extends q {
      constructor() {
        super(...arguments);
        o(this, "providerEl", this.closest(c.BundleProvider));
        o(this, "unsubscribe", () => {});
      }
      mount() {
        if (!this.providerEl)
          throw new Error(
            `${c.BundlePrice} must be a child of ${c.BundleProvider}}`
          );
        const { xoCompareAtPrice: t } = this.props,
          { xoDiscounts: e, xoName: s } = this.providerEl.props,
          n = document.documentElement.getAttribute("xo-money-format");
        if (!n)
          throw new Error(
            'xo-money-format="{{ shop.money_format }}" attribute of <html> is required'
          );
        this.unsubscribe = B.bundle(({ bundles: a }) => {
          var p;
          const l = (p = a[s]) != null ? p : [],
            d = l.reduce((m, f) => m + f.productPrice * f.quantity, 0),
            h = l.reduce((m, f) => m + f.quantity, 0),
            u = Math.min(...e.map(({ minQuantity: m }) => m));
          if (t)
            if (h >= u) {
              const m = Je(d, n);
              (this.innerHTML = m), this.setProps({ xoHidden: !1 });
            } else (this.innerHTML = ""), this.setProps({ xoHidden: !0 });
          else if (e.length)
            if (h >= u) {
              const m = e.map(({ type: b, value: y, minQuantity: E }) => {
                  if (b === "percentage") {
                    const $ = d - Math.floor((d * y) / 100),
                      L = Je($, n);
                    return { compare: $, minQuantity: E, price: L };
                  }
                  const C = d - y,
                    S = Je(C, n);
                  return { compare: C, minQuantity: E, price: S };
                }),
                { price: f } = m
                  .filter((b) => h >= b.minQuantity)
                  .sort((b, y) => b.compare - y.compare)[0];
              this.innerHTML = f;
            } else {
              const m = Je(d, n);
              this.innerHTML = m;
            }
        });
      }
      unmount() {
        this.unsubscribe();
      }
    }),
    o(li, "propTypes", {
      xoCompareAtPrice: "boolean",
      xoHidden: "boolean",
      xoDiscounts: "array",
    }),
    o(li, "defaultProps", { xoCompareAtPrice: !1, xoDiscounts: [] }),
    li);
  Ar = X([U(c.BundlePrice)], Ar);
  let Tr =
    ((ci = class extends q {
      constructor() {
        super(...arguments);
        o(this, "providerEl", this.closest(c.BundleProvider));
        o(this, "unsubscribe", () => {});
      }
      mount() {
        if (!this.providerEl)
          throw new Error(
            `${c.BundleSize} must be a child of ${c.BundleProvider}}`
          );
        const { xoName: t } = this.providerEl.props;
        this.unsubscribe = B.bundle(({ bundles: e }) => {
          var a;
          const n = ((a = e[t]) != null ? a : []).reduce(
            (l, d) => l + d.quantity,
            0
          );
          this.style.setProperty("--xo-size", `${n}`),
            this.setProps({ xoSize: n });
        });
      }
      unmount() {
        this.unsubscribe();
      }
    }),
    o(ci, "propTypes", { xoSize: "number" }),
    o(ci, "defaultProps", { xoSize: 0 }),
    ci);
  Tr = X([U(c.BundleSize)], Tr);
  let kr =
    ((di = class extends q {
      constructor() {
        super(...arguments);
        o(this, "providerEl", this.closest(c.BundleProvider));
        o(this, "unsubscribe", () => {});
      }
      mount() {
        if (!this.providerEl)
          throw new Error(
            `${c.BundlePlaceholder} must be a child of ${c.BundleProvider}}`
          );
        const { xoDiscounts: t, xoName: e } = this.providerEl.props,
          s = Math.max(...t.map(({ minQuantity: a }) => a)),
          n = this.innerHTML;
        this.unsubscribe = B.bundle(({ bundles: a }) => {
          var d;
          const l = (d = a[e]) != null ? d : [];
          this.innerHTML = rl(0, s - l.length)
            .map(() => n)
            .join("");
        });
      }
      unmount() {
        this.unsubscribe();
      }
    }),
    o(di, "propTypes", {}),
    o(di, "defaultProps", {}),
    di);
  kr = X([U(c.BundlePlaceholder)], kr);
  let $r =
    ((hi = class extends q {
      constructor() {
        super(...arguments);
        o(this, "providerEl", this.closest(c.BundleProvider));
        o(this, "unsubscribe", () => {});
      }
      mount() {
        if (!this.providerEl)
          throw new Error(
            `${c.BundleProgress} must be a child of ${c.BundleProvider}}`
          );
        const { xoDiscounts: t, xoName: e } = this.providerEl.props,
          s = Math.min(...t.map(({ minQuantity: n }) => n));
        this.unsubscribe = B.bundle(({ bundles: n }) => {
          var d;
          const l = ((d = n[e]) != null ? d : []).reduce(
            (h, u) => h + u.quantity,
            0
          );
          this.style.setProperty(
            "--xo-x",
            `${Math.min(0, 100 * (l / s) - 100)}%`
          ),
            this.setProps({ xoQualified: l >= s });
        });
      }
      unmount() {
        this.unsubscribe();
      }
    }),
    o(hi, "propTypes", { xoQualified: "boolean" }),
    o(hi, "defaultProps", {}),
    hi);
  $r = X([U(c.BundleProgress)], $r);
  let Mr =
    ((ui = class extends q {
      constructor() {
        super(...arguments);
        o(this, "providerEl", this.closest(c.BundleProvider));
        o(this, "unsubscribe", () => {});
      }
      mount() {
        if (!this.providerEl)
          throw new Error(
            `${c.BundleStep} must be a child of ${c.BundleProvider}}`
          );
        const { xoDiscounts: t, xoName: e } = this.providerEl.props,
          { xoMinQuantity: s } = this.props;
        this.unsubscribe = B.bundle(({ bundles: n }) => {
          var h;
          const a = (h = n[e]) != null ? h : [],
            l = a.reduce((u, p) => u + p.productPrice * p.quantity, 0),
            d = a.reduce((u, p) => u + p.quantity, 0);
          if (d > 0) {
            const u = t.map(({ type: p, value: m, minQuantity: f }) =>
              p === "percentage"
                ? { compare: l - Math.floor((l * m) / 100), minQuantity: f }
                : { compare: l - m, minQuantity: f }
            );
            if (u) {
              const { minQuantity: p } = u
                .filter((m) => d >= m.minQuantity)
                .sort((m, f) => m.compare - f.compare)[0];
              this.setProps({ xoQualified: p === s });
            }
          } else this.setProps({ xoQualified: !1 });
        });
      }
      unmount() {
        this.unsubscribe();
      }
    }),
    o(ui, "propTypes", { xoMinQuantity: "number", xoQualified: "boolean" }),
    o(ui, "defaultProps", {}),
    ui);
  Mr = X([U(c.BundleStep)], Mr);
  let Lr =
    ((pi = class extends q {
      constructor() {
        super(...arguments);
        o(this, "unsubscribe", () => {});
        o(this, "handleQuantity", () => {
          const { xoValue: t } = this.props,
            { xoSectionId: e, xoProductId: s } = this.productOptions;
          t && $e(e, s, () => t);
        });
      }
      getProductEl() {
        return this.closest(c.Product);
      }
      get productOptions() {
        return this.getProductEl().options;
      }
      async mount() {
        await T(),
          this.getProductEl() ||
            console.error(
              `${c.CartQuantityTrigger} must be a child of ${c.Product}}`
            );
        const { xoValue: t, xoChecked: e } = this.props,
          { xoSectionId: s, xoProductId: n } = this.productOptions;
        this.addEventListener("click", this.handleQuantity),
          (this.unsubscribe = B.cartForm((a) => {
            var d;
            const l =
              (d = a == null ? void 0 : a[kt(s, n)]) == null
                ? void 0
                : d.quantity;
            this.setProps({ xoChecked: l === t });
          })),
          e && this.handleQuantity();
      }
      unmount() {
        this.removeEventListener("click", this.handleQuantity),
          this.unsubscribe();
      }
    }),
    o(pi, "propTypes", { xoValue: "number", xoChecked: "boolean" }),
    o(pi, "defaultProps", { xoValue: 0, xoChecked: !1 }),
    pi);
  Lr = X([U(c.CartQuantityTrigger)], Lr);
  const up = "";
  Xd();
  const Ir = {
    on(r, i) {
      return B.product(({ status: e, productHtml: s }) => {
        e === r && i(s);
      });
    },
  };
  (window.xoProductQuickView = Ir),
    (window.cartFormSubscribe = Fs),
    (window.cartSubscribe = ro),
    (window.getCartFormState = Wt),
    _({
      [c.ProductData]: mh,
      [c.Product]: xh,
      [c.Cart]: Yd,
      [c.CartMini]: Zd,
      [c.CartAdd]: Gd,
      [c.CartAddError]: ch,
      [c.CartRemove]: jd,
      [c.CartSize]: Qd,
      [c.CartChangeFallback]: Kd,
      [c.CartQuantity]: Jd,
      [c.CartQuantityMinus]: th,
      [c.CartQuantityPlus]: eh,
      [c.CartNote]: sh,
      [c.CartNoteSubmit]: ih,
      [c.CartDiscount]: oh,
      [c.CartDiscountSubmit]: nh,
      [c.CartShippingRatesField]: rh,
      [c.CartShippingRatesSubmit]: ah,
      [c.CartShippingRatesError]: lh,
      [c.CartWillChange]: dh,
      [c.ProductVariant]: yr,
      [c.ProductWillChange]: fh,
      [c.ProductPickupAvailability]: gh,
      [c.ProductPickupAvailabilityList]: bh,
      [c.ProductQuickView]: yh,
      [c.ProductQuickViewTrigger]: vh,
      [c.ProductQuickViewVariant]: Eh,
      [c.ProductLiquidStatic]: wh,
      [c.ProductRecipientForm]: Ch,
      [c.ProductRecommendations]: Ph,
    });
  const co = new xe();
  class Ah extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "buttonEls", []);
      o(this, "handleClick", (t) => {
        t.preventDefault();
        const e = t.currentTarget;
        x.set(e, "xo-active", !0),
          v(this.buttonEls, (s) => {
            s !== e && x.set(s, "xo-active", !1);
          }),
          co.emit("change", { element: e, index: this.buttonEls.indexOf(e) });
      });
    }
    connectedCallback() {
      (this.buttonEls = Array.from(this.querySelectorAll(c.GroupButton))),
        v(this.buttonEls, (t) => {
          t.addEventListener("click", this.handleClick);
        });
    }
    disconnectedCallback() {
      v(this.buttonEls, (t) => {
        t.removeEventListener("click", this.handleClick);
      });
    }
  }
  const Dr = { on: co.on.bind(co) };
  (window.xoGroup = Dr), _({ [c.Group]: Ah });
  const qs = {
    easeLight: "cubic-bezier(0, 0, 0.3, 1)",
    easeInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    easeOut: "cubic-bezier(0.165, 0.84, 0.44, 1)",
    easeIn: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    easeInBack: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
    easeOutBack: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    easeInOutBack: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    easeInCirc: "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
    easeOutCirc: "cubic-bezier(0.075, 0.82, 0.165, 1)",
    easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
    easeInCubic: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
    easeOutCubic: "cubic-bezier(0.215, 0.61, 0.355, 1)",
    easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    easeInExpo: "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
    easeOutExpo: "cubic-bezier(0.19, 1, 0.22, 1)",
    easeInOutExpo: "cubic-bezier(1, 0, 0, 1)",
    easeInQuad: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
    easeOutQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    easeInOutQuad: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
    easeInQuart: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
    easeOutQuart: "cubic-bezier(0.165, 0.84, 0.44, 1)",
    easeInOutQuart: "cubic-bezier(0.77, 0, 0.175, 1)",
    easeInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    easeOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
    easeInOutQuint: "cubic-bezier(0.86, 0, 0.07, 1)",
    easeInSine: "cubic-bezier(0.47, 0, 0.745, 0.715)",
    easeOutSine: "cubic-bezier(0.39, 0.575, 0.565, 1)",
    easeInOutSine: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
    easeInBounce: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
    easeOutBounce: "cubic-bezier(0.23, 1, 0.32, 1)",
    linear: "cubic-bezier(0, 0, 1, 1)",
    spring: "cubic-bezier(.27,.79,.45,1.24)",
  };
  function Th(r) {
    const i = Array.from(
      r.querySelectorAll(
        "[xo-next-stroke-dasharray], [xo-next-stroke-dashoffset]"
      )
    );
    v(i, (t) => {
      const e = t.getAttribute("d"),
        s = t.getAttribute("xo-next-d"),
        n = t.hasAttribute("xo-prev-d"),
        a = t.getAttribute("stroke-dasharray"),
        l = t.getAttribute("xo-next-stroke-dasharray"),
        d = t.hasAttribute("xo-prev-stroke-dasharray"),
        h = t.getAttribute("stroke-dashoffset"),
        u = t.getAttribute("xo-next-stroke-dashoffset"),
        p = t.hasAttribute("xo-prev-stroke-dashoffset");
      e && s && !n && t.setAttribute("xo-prev-d", e),
        a && l && !d && t.setAttribute("xo-prev-stroke-dasharray", a),
        h && u && !p && t.setAttribute("xo-prev-stroke-dashoffset", h);
    });
  }
  function ho(r, i) {
    const { xoDuration: t } = i,
      e = Array.from(
        r.querySelectorAll(
          "[xo-next-d], [xo-next-stroke-dasharray], [xo-next-stroke-dashoffset]"
        )
      );
    v(e, (s) => {
      const n = W(),
        a = s.getAttribute("d"),
        l = s.getAttribute("xo-next-d"),
        d = s.getAttribute("stroke-dasharray"),
        h = s.getAttribute("xo-next-stroke-dasharray"),
        u = s.getAttribute("stroke-dashoffset"),
        p = s.getAttribute("xo-next-stroke-dashoffset");
      if (a && l) {
        const m = Fi.toArray(a),
          f = Fi.toArray(l);
        n({
          from: 0,
          to: 1,
          duration: t,
          easing: R.linear,
          onUpdate: (b) => {
            const y = ct(m, (E, C) => {
              const S = f[C];
              if (E.type === (S == null ? void 0 : S.type)) {
                const k = ct(E.values, ($, L) => {
                  const Q = S.values[L];
                  return D({
                    value: b,
                    inputRange: [0, 1],
                    outputRange: [$, Q],
                  });
                }).filter(Boolean);
                return { ...E, values: k };
              }
              return E;
            });
            s.setAttribute("d", Fi.toString(y));
          },
        });
      }
      if (d && h) {
        const m = d.replace(/\s+/g, " ").split(" "),
          f = h.replace(/\s+/g, " ").split(" ");
        n({
          from: 0,
          to: 1,
          duration: t,
          easing: R.linear,
          onUpdate: (b) => {
            const y = ct(m, (E, C) => {
              var $, L;
              const S = f[C];
              return D({
                value: b,
                inputRange: [0, 1],
                outputRange: [
                  Number(
                    (($ = E.match(/[\d.]*/g)) == null ? void 0 : $[0]) || 0
                  ),
                  Number(
                    ((L = S.match(/[\d.]*/g)) == null ? void 0 : L[0]) || 0
                  ),
                ],
              });
            });
            s.setAttribute("stroke-dasharray", y.join(" "));
          },
        });
      }
      if (u && p) {
        const m = u.replace(/\s+/g, " ").split(" "),
          f = p.replace(/\s+/g, " ").split(" ");
        n({
          from: 0,
          to: 1,
          duration: t,
          easing: R.linear,
          onUpdate: (b) => {
            const y = ct(m, (E, C) => {
              var $, L;
              const S = f[C];
              return D({
                value: b,
                inputRange: [0, 1],
                outputRange: [
                  Number(
                    (($ = E.match(/[\d.]*/g)) == null ? void 0 : $[0]) || 0
                  ),
                  Number(
                    ((L = S.match(/[\d.]*/g)) == null ? void 0 : L[0]) || 0
                  ),
                ],
              });
            });
            s.setAttribute("stroke-dashoffset", y.join(" "));
          },
        });
      }
    });
  }
  function Nr(r) {
    const i = Array.from(
      r.querySelectorAll(
        "[xo-prev-d], [xo-prev-stroke-dasharray], [xo-prev-stroke-dashoffset]"
      )
    );
    v(i, (t) => {
      const e = t.getAttribute("d"),
        s = t.getAttribute("xo-prev-d"),
        n = t.getAttribute("stroke-dasharray"),
        a = t.getAttribute("xo-prev-stroke-dasharray"),
        l = t.getAttribute("stroke-dashoffset"),
        d = t.getAttribute("xo-prev-stroke-dashoffset");
      s && e && t.setAttribute("d", s),
        a && n && t.setAttribute("stroke-dasharray", a),
        d && l && t.setAttribute("stroke-dashoffset", d);
    });
  }
  function kh(r) {
    const i = Array.from(
      r.querySelectorAll(
        "[xo-next-stroke-dasharray], [xo-next-stroke-dashoffset]"
      )
    );
    v(i, (t) => {
      const e = t.getAttribute("d"),
        s = t.getAttribute("xo-next-d"),
        n = t.getAttribute("stroke-dasharray"),
        a = t.getAttribute("xo-next-stroke-dasharray"),
        l = t.getAttribute("stroke-dashoffset"),
        d = t.getAttribute("xo-next-stroke-dashoffset");
      e &&
        s &&
        (t.style.setProperty("--xo-d", e),
        t.style.setProperty("--xo-next-d", s)),
        n &&
          a &&
          (t.style.setProperty("--xo-stroke-dasharray", n),
          t.style.setProperty("--xo-next-stroke-dasharray", a)),
        l &&
          d &&
          (t.style.setProperty("--xo-stroke-dashoffset", l),
          t.style.setProperty("--xo-next-stroke-dashoffset", d));
    });
  }
  function $h() {
    const r = `
    <svg class="xo-hidden">
      <defs>
        <filter id="xo-goo-1">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              1 0 1 0 0
              0 0 0 13 -6" result="goo"></feColorMatrix>
          <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
        </filter>
        <filter id="xo-goo-2">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              1 0 1 0 0
              0 0 0 12 -4" result="goo"></feColorMatrix>
          <feTurbulence type="turbulence" baseFrequency="1" numOctaves="1" seed="2" result="noise"></feTurbulence>
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
          <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
        </filter>
        <filter id="xo-goo-3">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              1 0 1 0 0
              0 0 0 15 -8" result="goo"></feColorMatrix>
          <feTurbulence type="fractalNoise" baseFrequency="0.1 0.5" numOctaves="5" seed="2" result="noise"></feTurbulence>
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
          <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
        </filter>
        <filter id="xo-goo-4">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 18 -8" result="goo"></feColorMatrix>
          <feTurbulence type="fractalNoise" baseFrequency="1 0.01" numOctaves="1" seed="1" result="noise"></feTurbulence>
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
          <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
        </filter>
        <filter id="xo-goo-5">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 14 -1" result="goo"></feColorMatrix>
          <feTurbulence type="fractalNoise" baseFrequency="0.009 1" numOctaves="1" seed="1" result="noise"></feTurbulence>
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
          <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
        </filter>
        <filter id="xo-goo-6">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              1 0 1 0 0
              0 0 0 12 -8" result="goo"></feColorMatrix>
          <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="1" seed="1" result="noise"></feTurbulence>
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
          <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
        </filter>
        <filter id="xo-goo-7">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 18 -5" result="goo"></feColorMatrix>
          <feTurbulence type="fractalNoise" baseFrequency="0.07 0.3" numOctaves="1" seed="1" result="noise"></feTurbulence>
          <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
          <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
        </filter>
      </defs>
    </svg>
  `;
    document.body.insertAdjacentHTML("beforeend", r);
  }
  const uo = {
    "xo-goo-1": { stdDeviation: { start: 50, end: 0 } },
    "xo-goo-2": {
      stdDeviation: { start: 20, end: 0 },
      scale: { start: 100, end: 0 },
      baseFrequency: { start: 0.1, end: 0.05 },
    },
    "xo-goo-3": {
      stdDeviation: { start: 40, end: 0 },
      scale: { start: 150, end: 0 },
    },
    "xo-goo-4": {
      stdDeviation: { start: 70, end: 0 },
      scale: { start: 200, end: 0 },
    },
    "xo-goo-5": {
      stdDeviation: { start: 40, end: 0 },
      scale: { start: 100, end: 0 },
    },
    "xo-goo-6": {
      stdDeviation: { start: 90, end: 0 },
      scale: { start: 300, end: 0 },
      baseFrequency: { start: 0.1, end: 0.01 },
    },
    "xo-goo-7": {
      stdDeviation: { start: 35, end: 0 },
      scale: { start: 250, end: 0 },
    },
  };
  function po(r, i, t) {
    const e = r.getAttribute("xo-type");
    if (!(e != null && e.startsWith("goo-"))) return;
    const s = `xo-${e}`,
      n = document.querySelector(`#${s} feGaussianBlur`),
      a = document.querySelector(`#${s} feTurbulence`),
      l = document.querySelector(`#${s} feDisplacementMap`);
    (r.style.filter = `url(#${s})`),
      (r.style.opacity = "0"),
      W()({
        from: 0,
        to: 1,
        duration: i + 1200,
        easing: R.easeOutExpo,
        onUpdate: (h) => {
          const u = [0, 1],
            p = uo[s].stdDeviation,
            m = uo[s].scale,
            f = uo[s].baseFrequency,
            b =
              p != null
                ? D({ value: h, inputRange: u, outputRange: [p.start, p.end] })
                : null,
            y =
              m != null
                ? D({ value: h, inputRange: u, outputRange: [m.start, m.end] })
                : null,
            E =
              f != null
                ? D({ value: h, inputRange: u, outputRange: [f.start, f.end] })
                : null;
          b && (n == null || n.setAttribute("stdDeviation", b.toString())),
            y && (l == null || l.setAttribute("scale", y.toString())),
            E && (a == null || a.setAttribute("baseFrequency", E.toString())),
            (r.style.opacity = h.toString());
        },
      });
  }
  function mo(r) {
    return (
      r.closest(`${c.Carousel}:not([xo-per-view]):not([xo-column-width])`) ||
      r.closest(`${c.Carousel}[xo-per-view="1"]:not([xo-column-width])`) ||
      r.closest(c.Toggle) ||
      r.closest(c.Modal) ||
      r.closest(c.Popover) ||
      r.closest(c.TabsPane)
    );
  }
  const Ne = new IntersectionObserver(
      (r) => {
        const i = requestAnimationFrame(() => {
          let t = -1;
          r.forEach(async (e) => {
            const s = e.target,
              {
                xoCascade: n,
                xoDuration: a,
                xoConstant: l,
                xoItemUsed: d,
              } = s.options;
            e.isIntersecting &&
              (x.set(s, "xo-visible", !0),
              s.removeAttribute("aria-disabled"),
              s.handleWidthIncrement(),
              ho(s, s.options),
              n && (t++, s.style.setProperty("--xo-order", `${t}`)),
              mo(s) || po(s, a),
              Ne.unobserve(s),
              cancelAnimationFrame(i),
              await T(a * Math.max(1, t + 1) + 500),
              d
                ? s.getItemEls().forEach((u) => {
                    u.style.opacity = "1";
                  })
                : ((s.style.animation = "none"), (s.style.opacity = "1")));
          });
        });
      },
      { rootMargin: "0px 0px -50px 0px" }
    ),
    zo = class extends HTMLElement {
      constructor() {
        super(...arguments);
        o(this, "timeId", -1);
        o(this, "cssId", "");
        o(this, "_options");
        o(this, "cancel", () => {});
        o(this, "getItemEls", () => this.querySelectorAll(c.AnimateItem));
        o(this, "handleWidthIncrement", () => {
          const { xoType: t, xoDuration: e } = this.options;
          if (t === "width-increment") {
            const s = Array.from(this.children);
            v(s, (n) => {
              (n.style.width = "var(--xo-width)"), (n.style.maxWidth = "none");
            }),
              (this.style.width = "var(--xo-width)"),
              clearTimeout(this.timeId),
              (this.timeId = window.setTimeout(() => {
                v(s, (n) => {
                  n.style.removeProperty("width"),
                    n.style.removeProperty("max-width");
                }),
                  this.style.removeProperty("width"),
                  clearTimeout(this.timeId);
              }, e));
          }
        });
        o(this, "setOptions", () => {
          this.options = M(this, {
            pick: [
              "xoDuration",
              "xoConstant",
              "xoOrder",
              "xoType",
              "xoEasing",
              "xoStrength",
              "xoCascade",
              "xoDisabled",
              "xoItemUsed",
              "xoScrollForced",
            ],
            types: {
              xoDuration: "number",
              xoConstant: "number",
              xoOrder: "number",
              xoType: "string",
              xoEasing: "string",
              xoStrength: "number",
              xoCascade: "boolean",
              xoDisabled: "boolean",
              xoItemUsed: "boolean",
              xoScrollForced: "boolean",
            },
          });
        });
      }
      static get observedAttributes() {
        return [
          "xo-observed",
          "xo-duration",
          "xo-type",
          "xo-easing",
          "xo-strength",
          "xo-cascade",
          "xo-order",
          "xo-constant",
          "xo-disabled",
          "xo-visible",
        ];
      }
      get options() {
        return { ...zo.defaultOptions, ...this._options };
      }
      set options(t) {
        this._options = t;
      }
      async connectedCallback() {
        var f, b, y;
        this.setOptions();
        const {
          xoConstant: t,
          xoOrder: e,
          xoDuration: s,
          xoEasing: n,
          xoStrength: a,
          xoType: l,
          xoCascade: d,
          xoDisabled: h,
          xoItemUsed: u,
          xoScrollForced: p,
        } = this.options;
        if (h) {
          x.set(this, "xo-visible", !1),
            this.style.removeProperty("animation"),
            this.style.removeProperty("--xo-order"),
            this.style.removeProperty("--xo-strength"),
            this.style.removeProperty("--xo-constant"),
            this.style.removeProperty("--xo-duration"),
            this.style.removeProperty("--xo-easing");
          return;
        }
        const m = p ? null : mo(this);
        if (
          (!x.get(this, "xo-visible") &&
            !m &&
            (u
              ? this.getItemEls().forEach((E) => {
                  (E.style.opacity = "0.01"),
                    E.setAttribute("aria-disabled", "true"),
                    E.setAttribute("xo-type", `${l}`);
                })
              : ((this.style.opacity = "0.01"),
                this.setAttribute("aria-disabled", "true"))),
          this.setAttribute("xo-type", `${l}`),
          this.style.setProperty("--xo-order", `${e}`),
          this.style.setProperty("--xo-strength", `${a}`),
          this.style.setProperty("--xo-constant", `${t}`),
          this.style.setProperty("--xo-duration", `${s}`),
          this.style.setProperty("--xo-easing", (f = qs[n]) != null ? f : n),
          l === "width-increment" &&
            this.offsetWidth > 0 &&
            (this.style.setProperty("--xo-width", `${this.offsetWidth}px`),
            (this.style.width = "0px")),
          await T(0),
          m)
        ) {
          if (
            ((this.style.transition = `all ${s}ms ${
              (b = qs[n]) != null ? b : n
            } calc(((var(--xo-order) * var(--xo-constant)) + var(--xo-wrap-duration, 0)) * 1ms)`),
            d)
          ) {
            const E = (y = m.getAttribute("xo-duration")) != null ? y : "300",
              C = Array.from(
                m.querySelectorAll(`${c.Animate}, [is^="${c.Animate}"]`)
              );
            v(C, (S, k) => {
              this === S &&
                (this.style.setProperty("--xo-order", `${k}`),
                this.style.setProperty(
                  "--xo-wrap-duration",
                  `${Number(E) / 3}`
                ));
            });
          }
        } else Ne.observe(this);
      }
      async attributeChangedCallback(t, e, s) {
        t === "xo-visible" &&
          this.getItemEls().forEach((n) => {
            x.set(n, "xo-visible", s != null && s !== "false");
          }),
          (t === "xo-observed" ||
            t === "xo-type" ||
            t === "xo-duration" ||
            t === "xo-easing" ||
            t === "xo-cascade" ||
            t === "xo-strength" ||
            t === "xo-order" ||
            t === "xo-disabled" ||
            t === "xo-constant") &&
            e !== s &&
            (mo(this) ||
              (x.set(this, "xo-visible", !1),
              this.style.removeProperty("animation"),
              Ne.unobserve(this),
              Ne.observe(this)),
            this.connectedCallback());
      }
      disconnectedCallback() {
        clearTimeout(this.timeId), Ne.unobserve(this), this.cancel();
      }
    };
  let Hs = zo;
  o(Hs, "defaultOptions", {
    xoDuration:
      (ua = (ha = window.settings) == null ? void 0 : ha.animate_duration) !=
      null
        ? ua
        : 500,
    xoType:
      (ma = (pa = window.settings) == null ? void 0 : pa.animate_effect) != null
        ? ma
        : "fade-up",
    xoConstant: 75,
    xoOrder: 0,
    xoStrength:
      (xa = (fa = window.settings) == null ? void 0 : fa.animate_strength) !=
      null
        ? xa
        : 1,
    xoEasing: "easeLight",
    xoCascade: !1,
    xoDisabled: !1,
    xoItemUsed: !1,
    xoScrollForced: !1,
  });
  const _o = class {
    constructor() {
      o(this, "observer");
      o(this, "mutation");
      o(this, "updateMutation");
      o(this, "timeIds", new WeakMap());
      o(this, "handleWidthIncrement", async (i) => {
        await T(10);
        const { xoType: t, xoDuration: e } = this.getOptions(i);
        if (t === "width-increment") {
          const s = Array.from(i.children);
          v(s, (a) => {
            (a.style.width = "var(--xo-width)"), (a.style.maxWidth = "none");
          }),
            (i.style.width = "var(--xo-width)"),
            clearTimeout(this.timeIds.get(i)),
            this.timeIds.delete(i);
          const n = window.setTimeout(() => {
            v(s, (a) => {
              a.style.removeProperty("width"),
                a.style.removeProperty("max-width");
            }),
              i.style.removeProperty("width"),
              clearTimeout(this.timeIds.get(i)),
              this.timeIds.delete(i);
          }, e);
          this.timeIds.set(i, n);
        }
      });
      o(this, "handleIntersection", (i, t) => {
        let e = -1;
        i.forEach((s, n) => {
          var y, E, C;
          const a = s.target,
            {
              xoAnimate: l,
              xoType: d,
              xoCascade: h,
              xoOrder: u,
              xoStrength: p,
              xoDuration: m,
              xoConstant: f,
              xoEasing: b,
            } = this.getOptions(a);
          if (
            (a.setAttribute("xo-type", `${d}`),
            a.style.setProperty("--xo-strength", `${p}`),
            a.style.setProperty("--xo-constant", `${f}`),
            a.style.setProperty("--xo-duration", `${m}`),
            a.style.setProperty("--xo-easing", (y = qs[b]) != null ? y : b),
            d === "width-increment" &&
              a.offsetWidth > 0 &&
              (a.style.setProperty("--xo-width", `${a.offsetWidth}px`),
              (a.style.width = "0px")),
            s.isIntersecting)
          ) {
            if (l === "scroll") {
              e++;
              let S = -1;
              (E = window.xbEditor) != null && E.designMode
                ? (S = h ? e : u)
                : (S = h ? n : u),
                a.style.setProperty("--xo-order", `${S}`),
                x.set(a, "xo-visible", !0),
                x.set(a, "xo-opacity", !1),
                a.removeAttribute("aria-disabled"),
                a.querySelector("svg") && ho(a, this.getOptions(a)),
                (C = a.getAttribute("xo-type")) != null &&
                  C.startsWith("goo-") &&
                  po(a, m),
                this.handleWidthIncrement(a),
                t.unobserve(a);
            }
          } else x.set(a, "xo-visible", !1);
        });
      });
      o(this, "handleMutation", (i) => {
        i.forEach(async (t) => {
          var s;
          const e = t.target;
          if (
            t.attributeName === "xo-observed" ||
            t.attributeName === "xo-animate" ||
            t.attributeName === "xo-type" ||
            t.attributeName === "xo-duration"
          ) {
            const { xoAnimate: n, xoDuration: a } = this.getOptions(e);
            n === "scroll"
              ? (x.set(e, "xo-visible", !0),
                e.querySelector("svg") && (Nr(e), ho(e, this.getOptions(e))),
                (s = e.getAttribute("xo-type")) != null &&
                  s.startsWith("xo-goo-") &&
                  po(e, a),
                this.handleWidthIncrement(e))
              : n === "svg-infinite"
              ? this.handleSingleSVG(e)
              : x.set(e, "xo-visible", !1);
          }
        });
      });
      o(this, "getEls", () => {
        var i;
        return document.querySelectorAll(
          (i = window.xbEditor) != null && i.designMode
            ? '[xo-animate="none"], [xo-animate="scroll"], [xo-animate="infinite"], [xo-animate="svg-infinite"]'
            : '[xo-animate="scroll"]'
        );
      });
      o(this, "handleSingleSVG", async (i) => {
        var s;
        const { xoDuration: t, xoEasing: e } = this.getOptions(i);
        i.querySelector("svg") &&
          (Nr(i),
          i.style.setProperty("--xo-duration", `${t}`),
          i.style.setProperty("--xo-easing", (s = qs[e]) != null ? s : e),
          i.classList.add("xo-animate-svg-none"),
          kh(i),
          await T(50),
          i.classList.remove("xo-animate-svg-none"));
      });
      o(this, "svgInfinite", () => {
        document
          .querySelectorAll('[xo-animate="svg-infinite"]')
          .forEach(this.handleSingleSVG);
      });
      o(this, "handleAllSvg", () => {
        document
          .querySelectorAll(
            '[xo-animate="scroll"], [xo-animate="svg-infinite"]'
          )
          .forEach((t) => {
            t.querySelector("svg") && Th(t);
          });
      });
      o(this, "initIntersection", () => {
        this.getEls().forEach((t) => {
          this.observer.observe(t);
        });
      });
      o(this, "first", () => {
        this.getEls().forEach((t) => {
          const { xoAnimate: e } = this.getOptions(t);
          !x.get(t, "xo-visible") &&
            e === "scroll" &&
            (x.set(t, "xo-opacity", !0),
            t.setAttribute("aria-disabled", "true"));
        });
      });
      o(this, "initMutation", () => {
        this.getEls().forEach((t) => {
          this.mutation.observe(t, {
            attributes: !0,
            attributeFilter: [
              "xo-observed",
              "xo-animate",
              "xo-type",
              "xo-duration",
            ],
          });
        });
      });
      o(this, "update", async () => {
        await T(), this.init();
      });
      (this.observer = new IntersectionObserver(this.handleIntersection, {
        rootMargin: "0px 0px -50px 0px",
      })),
        (this.mutation = new MutationObserver(this.handleMutation)),
        (this.updateMutation = new MutationObserver(this.update)),
        this.updateMutation.observe(document.body, {
          attributes: !0,
          attributeFilter: ["xo-animate-observed"],
        });
    }
    getOptions(i) {
      const t = M(i, {
        pick: [
          "xoAnimate",
          "xoDuration",
          "xoConstant",
          "xoOrder",
          "xoType",
          "xoEasing",
          "xoStrength",
          "xoCascade",
          "xoDisabled",
          "xoInfinite",
        ],
        types: {
          xoAnimate: "string",
          xoDuration: "number",
          xoConstant: "number",
          xoOrder: "number",
          xoType: "string",
          xoEasing: "string",
          xoStrength: "number",
          xoCascade: "boolean",
          xoDisabled: "boolean",
          xoInfinite: "boolean",
        },
      });
      return { ..._o.defaultOptions, ...t };
    }
    init() {
      var i;
      this.observer.disconnect(),
        this.mutation.disconnect(),
        this.first(),
        this.handleAllSvg(),
        this.svgInfinite(),
        this.initIntersection(),
        (i = window == null ? void 0 : window.xbEditor) != null &&
          i.designMode &&
          this.initMutation();
    }
  };
  let Vs = _o;
  o(Vs, "defaultOptions", {
    xoAnimate: "none",
    xoDuration:
      (ba = (ga = window.settings) == null ? void 0 : ga.animate_duration) !=
      null
        ? ba
        : 500,
    xoType:
      (va = (ya = window.settings) == null ? void 0 : ya.animate_effect) != null
        ? va
        : "fade-up",
    xoConstant: 75,
    xoOrder: 0,
    xoStrength:
      (wa = (Ea = window.settings) == null ? void 0 : Ea.animate_strength) !=
      null
        ? wa
        : 1,
    xoEasing: "easeLight",
    xoCascade: !1,
    xoDisabled: !1,
    xoInfinite: !1,
  });
  const ue = new Vs();
  let Or = !1;
  (Ca = window == null ? void 0 : window.xbEditor) != null && Ca.designMode
    ? (ue.init(),
      ne(async () => {
        Or || (await T(500), ue.init());
      }),
      document.addEventListener("xb:element:load", () => {
        (Or = !0), ue.init();
      }))
    : (ne(() => {
        ue.init();
      }),
      (Sa = window.Shopify) != null &&
        Sa.designMode &&
        (document.addEventListener("shopify:section:load", () => ue.init()),
        document.addEventListener("shopify:section:reorder", () => ue.init())));
  const pp = "";
  $h(), _({ [c.Animate]: Hs });
  function Fr(r, i) {
    if (!i) return Math.hypot(r.clientX, r.clientY);
    const t = r.clientX - i.clientX,
      e = r.clientY - i.clientY;
    return Math.hypot(t, e);
  }
  const mp = "",
    Wo = class extends HTMLElement {
      constructor() {
        super(...arguments);
        o(this, "imageZoomItemEl", null);
        o(this, "innerEl", null);
        o(this, "thumbEl", null);
        o(this, "zoomState", 4);
        o(this, "zooming", !1);
        o(this, "touchOffsetX", 0);
        o(this, "touchOffsetY", 0);
        o(this, "clientX", 0);
        o(this, "clientY", 0);
        o(this, "pan", null);
        o(this, "scale", 1);
        o(this, "initialDistance", 0);
        o(this, "mutationObserver", null);
        o(this, "imageLoaded", !1);
        o(this, "_options");
        o(this, "setOptions", () => {
          this.options = M(this, {
            pick: [
              "xoName",
              "xoZoom",
              "xoZoomSrc",
              "xoPlacement",
              "xoZoomFull",
              "xoUseWheel",
            ],
            types: {
              xoName: "string",
              xoZoom: "number",
              xoZoomSrc: "string",
              xoPlacement: "string",
              xoZoomFull: "boolean",
              xoUseWheel: "boolean",
            },
          });
        });
        o(this, "handleThumb", (t, e) => {
          const s = this.thumbEl,
            { offsetWidth: n, offsetHeight: a } = this,
            l = n / this.zoomState,
            d = a / this.zoomState,
            h = Z(e - s.offsetHeight / 2, 0, a - s.offsetHeight),
            u = Z(t - s.offsetWidth / 2, 0, n - s.offsetWidth);
          (s.style.width = `${l}px`),
            (s.style.height = `${d}px`),
            (s.style.top = `${h}px`),
            (s.style.left = `${u}px`);
        });
        o(this, "handleZoomImage", (t, e) => {
          const { xoZoomSrc: s, xoZoomFull: n } = this.options,
            a = this.imageZoomItemEl;
          n
            ? x.set(this, "xo-active", this.zoomState > 1)
            : x.set(this, "xo-active", !0);
          const l = this.querySelector("img");
          if (
            (a.setAttribute("xo-zoom", `${this.zoomState}`),
            l &&
              (this.imageLoaded
                ? (a.style.backgroundImage = `url('${s}')`)
                : (a.style.backgroundImage = `url('${l.src}')`)),
            (a.style.transform = `translate3d(${t}px, ${e}px, 0) scale(${this.zoomState})`),
            !this.imageLoaded)
          ) {
            const d = new Image();
            (d.src = s),
              (d.onload = () => {
                (a.style.backgroundImage = `url('${s}')`),
                  (this.imageLoaded = !0);
              });
          }
        });
        o(this, "resetTransform", () => {
          const t = this.imageZoomItemEl;
          (t.style.transform = "translate3d(0, 0, 0) scale(1)"),
            t.removeAttribute("xo-zoom");
        });
        o(this, "handler", (t) => {
          var y;
          const { xoPlacement: e } = this.options;
          let s = 0,
            n = 0;
          t.type === "touchmove"
            ? ((s = this.touchOffsetX), (n = this.touchOffsetY))
            : ((s = t.offsetX), (n = t.offsetY));
          const { offsetWidth: a, offsetHeight: l } = this,
            d = e === "center",
            h = a / this.zoomState,
            u = l / this.zoomState,
            p = d ? 0 : h / 2,
            m = d ? 0 : u / 2,
            f = D({
              value: s,
              inputRange: [p, a - p],
              outputRange: [0, -(a * (this.zoomState - 1))],
            }),
            b = D({
              value: n,
              inputRange: [m, l - m],
              outputRange: [0, -(l * (this.zoomState - 1))],
            });
          (y = this.pan) == null || y.setValue({ dx: f, dy: b }),
            this.handleZoomImage(f, b),
            this.handleThumb(s, n);
        });
        o(this, "handleMouseLeave", () => {
          const { xoZoom: t, xoZoomFull: e } = this.options;
          e || (x.set(this, "xo-active", !1), (this.zoomState = t));
        });
        o(this, "handleWheel", (t) => {
          t.preventDefault();
          const { deltaY: e } = t;
          (this.zoomState = Z(this.zoomState + e / 60, 1, 10)), this.handler(t);
        });
        o(this, "handleWindowClick", (t) => {
          this.contains(t.target) ||
            (x.set(this, "xo-active", !1),
            this.resetTransform(),
            (this.zoomState = this.options.xoZoom));
        });
        o(this, "handleTouchMove", (t) => {
          if (t.targetTouches[0] && t.targetTouches[1]) {
            t.preventDefault();
            const s =
              Fr(t.targetTouches[0], t.targetTouches[1]) / this.initialDistance;
            (this.zoomState = this.scale * s),
              this.zoomState > 1 ? (this.zooming = !0) : (this.zooming = !1),
              this.handler(t);
          }
        });
        o(this, "handleTouchEnd", (t) => {
          if (t.touches.length === 0) {
            const e = window.getComputedStyle(this.imageZoomItemEl).transform;
            if (e !== "none") {
              const s = new WebKitCSSMatrix(e);
              this.scale = s.a;
            }
            document.removeEventListener("touchmove", this.handleTouchMove),
              document.removeEventListener("touchend", this.handleTouchEnd);
          }
        });
        o(this, "handleTouchStart", (t) => {
          if (t.targetTouches[0] && t.targetTouches[1]) {
            this.initialDistance = Fr(t.targetTouches[0], t.targetTouches[1]);
            const e = t.target.getBoundingClientRect(),
              s = t.targetTouches[0].clientX,
              n = t.targetTouches[0].clientY,
              a = t.targetTouches[1].clientX,
              l = t.targetTouches[1].clientY;
            (this.clientX = (s + a) / 2),
              (this.clientY = (n + l) / 2),
              (this.touchOffsetX = (this.clientX - e.left) / this.scale),
              (this.touchOffsetY = (this.clientY - e.top) / this.scale),
              document.addEventListener("touchmove", this.handleTouchMove, {
                passive: !1,
              }),
              document.addEventListener("touchend", this.handleTouchEnd);
          }
        });
        o(this, "handleMutation", () => {
          const t = this.closest(c.GalleryPortal);
          x.get(t, "xo-active") ||
            ((this.scale = 1), (this.initialDistance = 0));
        });
      }
      get options() {
        return { ...Wo.defaultOptions, ...this._options };
      }
      set options(t) {
        this._options = t;
      }
      static get observedAttributes() {
        return ["xo-observed"];
      }
      createChild() {
        const { xoPlacement: t, xoName: e } = this.options;
        (this.thumbEl = document.createElement(c.ImageZoomThumb)),
          (this.imageZoomItemEl = document.createElement(c.ImageZoomItem)),
          t === "manual"
            ? (this.innerEl = document.querySelector(
                `${c.ImageZoomManual}[xo-name="${e}"]`
              ))
            : (this.innerEl = document.createElement(c.ImageZoomInner)),
          this.innerEl.appendChild(this.imageZoomItemEl),
          this.appendChild(this.innerEl),
          t !== "center" && this.appendChild(this.thumbEl);
      }
      connectedCallback() {
        this.setOptions();
        const {
          xoPlacement: t,
          xoZoom: e,
          xoZoomFull: s,
          xoUseWheel: n,
        } = this.options;
        (this.zoomState = e),
          this.setAttribute("xo-placement", t),
          this.createChild(),
          j.any
            ? s &&
              (this.addEventListener("touchstart", this.handleTouchStart),
              (this.pan = Kt({
                element: this,
                onStart: (l) => {
                  this.zooming && l.preventDefault();
                },
                onMove: (l) => {
                  this.zooming && this.handleZoomImage(l.dx, l.dy);
                },
              })))
            : (this.addEventListener("mousemove", this.handler),
              this.addEventListener("mouseleave", this.handleMouseLeave),
              n && this.addEventListener("wheel", this.handleWheel)),
          window.addEventListener("click", this.handleWindowClick);
        const a = this.closest(c.GalleryPortal);
        a &&
          ((this.mutationObserver = new MutationObserver(this.handleMutation)),
          this.mutationObserver.observe(a, {
            attributes: !0,
            attributeFilter: ["xo-active"],
          }));
      }
      attributeChangedCallback(t, e, s) {
        t === "xo-observed" &&
          e !== s &&
          (this.setOptions(), (this.zoomState = this.options.xoZoom));
      }
      disconnectedCallback() {
        var t;
        this.removeEventListener("mousemove", this.handler),
          this.removeEventListener("mouseleave", this.handleMouseLeave),
          this.removeEventListener("wheel", this.handleWheel),
          window.removeEventListener("click", this.handleWindowClick),
          this.removeEventListener("touchstart", this.handleTouchStart),
          document.removeEventListener("touchmove", this.handleTouchMove),
          document.removeEventListener("touchend", this.handleTouchEnd),
          (t = this.pan) == null || t.destroy();
      }
    };
  let Bs = Wo;
  o(Bs, "defaultOptions", {
    xoName: "",
    xoZoom: 4,
    xoZoomSrc: "",
    xoPlacement: "center",
    xoZoomFull: !1,
    xoUseWheel: !0,
  }),
    _({ [c.ImageZoom]: Bs });
  const fp = "";
  class Mh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "daysEl", null);
      o(this, "hoursEl", null);
      o(this, "minutesEl", null);
      o(this, "secondsEl", null);
      o(this, "setDefaultText", () => {
        this.daysEl && (this.daysEl.innerText = this.setZeroPad("0")),
          this.hoursEl && (this.hoursEl.innerText = this.setZeroPad("0")),
          this.minutesEl && (this.minutesEl.innerText = this.setZeroPad("0")),
          this.secondsEl && (this.secondsEl.innerText = this.setZeroPad("0"));
      });
      o(this, "handleCountdown", () => {
        const t = this.getAttribute("xo-timestamp");
        if (!t)
          throw new Error(
            `${c.Countdown}: Attribute xo-timestamp is required.`
          );
        const s = Number(t) - Date.now();
        if (
          (this.daysEl || (this.daysEl = this.querySelector(c.CountdownDay)),
          this.hoursEl || (this.hoursEl = this.querySelector(c.CountdownHour)),
          this.minutesEl ||
            (this.minutesEl = this.querySelector(c.CountdownMinute)),
          this.secondsEl ||
            (this.secondsEl = this.querySelector(c.CountdownSecond)),
          s > 0)
        ) {
          const n = this.getDays(s),
            a = this.getHours(s),
            l = this.getMinutes(s),
            d = this.getSeconds(s);
          this.daysEl &&
            Number(this.daysEl.innerText) !== n &&
            (n < 1
              ? (this.daysEl.innerText = this.setZeroPad("0"))
              : (this.daysEl.innerText = this.setZeroPad(`${n}`))),
            this.hoursEl &&
              Number(this.hoursEl.innerText) !== a &&
              (this.hoursEl.innerText = this.setZeroPad(`${a}`)),
            this.minutesEl &&
              Number(this.minutesEl.innerText) !== l &&
              (this.minutesEl.innerText = this.setZeroPad(`${l}`)),
            this.secondsEl &&
              Number(this.secondsEl.innerText) !== d &&
              (this.secondsEl.innerText = this.setZeroPad(`${d}`)),
            x.set(this, "xo-expired", !1);
        } else
          K.remove(this.handleCountdown),
            x.set(this, "xo-expired", !0),
            this.setDefaultText();
      });
    }
    static get observedAttributes() {
      return ["xo-observed"];
    }
    getDays(t) {
      return Math.floor(t / (1e3 * 60 * 60 * 24));
    }
    getHours(t) {
      return Math.floor((t % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60));
    }
    getMinutes(t) {
      return Math.floor((t % (1e3 * 60 * 60)) / (1e3 * 60));
    }
    getSeconds(t) {
      return Math.floor((t % (1e3 * 60)) / 1e3);
    }
    setZeroPad(t) {
      const e = Number(this.getAttribute("xo-zero-pad")) || 1;
      return t.padStart(e, "0");
    }
    connectedCallback() {
      K.add(this.handleCountdown, !0),
        (this.daysEl = this.querySelector(c.CountdownDay)),
        (this.hoursEl = this.querySelector(c.CountdownHour)),
        (this.minutesEl = this.querySelector(c.CountdownMinute)),
        (this.secondsEl = this.querySelector(c.CountdownSecond)),
        this.setDefaultText();
    }
    disconnectedCallback() {
      K.remove(this.handleCountdown);
    }
    async attributeChangedCallback(t, e, s) {
      t === "xo-observed" &&
        e !== s &&
        (await T(100), this.disconnectedCallback(), this.connectedCallback());
    }
  }
  _({ [c.Countdown]: Mh });
  let Rr =
    ((He = class extends q {
      constructor() {
        super(...arguments);
        o(this, "observer", null);
        o(this, "animated", W());
        o(this, "attrAnimated", W());
        o(this, "timeId", -1);
        o(this, "handleCountto", async () => {
          const {
              xoFrom: t,
              xoTo: e,
              xoDuration: s,
              xoDelay: n,
              xoEasing: a,
            } = this.props,
            l = this.querySelector(c.CounttoNumber);
          this.timeId = window.setTimeout(() => {
            this.animated({
              from: t,
              to: e,
              duration: s,
              onUpdate: (d) => {
                const h = Math.round(d).toString();
                l ? (l.textContent = h) : (this.textContent = h);
              },
            }),
              this.attrAnimated({
                from: t,
                to: e,
                duration: s,
                easing: R[a],
                onUpdate: (d) => {
                  this.style.setProperty("--xo-value", `${d}`);
                },
              });
          }, n);
        });
      }
      mount() {
        (this.observer = new IntersectionObserver(
          (t) => {
            t.forEach((e) => {
              var s;
              e.isIntersecting &&
                (this.handleCountto(),
                (s = this.observer) == null || s.unobserve(this));
            });
          },
          { rootMargin: "0px 0px -50px 0px" }
        )),
          this.observer.observe(this);
      }
      propUpdate({ name: t, prevProp: e, nextProp: s }) {
        t === "xoObserved" &&
          e != null &&
          e !== s &&
          (clearTimeout(this.timeId),
          this.animated.off(),
          this.attrAnimated.off(),
          this.handleCountto());
      }
      unmount() {
        var t;
        (t = this.observer) == null || t.unobserve(this),
          this.animated.off(),
          this.attrAnimated.off();
      }
    }),
    o(He, "propTypes", {
      xoFrom: "number",
      xoTo: "number",
      xoDuration: "number",
      xoDelay: "number",
      xoEasing: "string",
    }),
    o(He, "defaultProps", {
      xoFrom: 0,
      xoTo: 100,
      xoDuration: 2e3,
      xoDelay: 0,
      xoEasing: "ease",
    }),
    o(He, "observedProps", ["xoObserved"]),
    He);
  Rr = X([U(c.Countto)], Rr);
  function Lh(r, i = !0) {
    return `https://player.vimeo.com/video/${r.replace(
      /(^.*(video|vimeo\.com)\/)(\w*)(.*$)/g,
      "$3"
    )}?${i ? "autoplay=1&" : ""}loop=1&background=1&muted=1`;
  }
  function Ih(r, i = !0) {
    const t = r.replace(/(^.*(embed\/|(\?|&)v=))(\w*)(.*$)/g, "$4");
    return `https://www.youtube.com/embed/${t}?${i ? "autoplay=1&" : ""}loop=1&mute=1&controls=0&iv_load_policy=1&disablekb=1&playlist=${t}&modestbranding=1&playsinline=1`;
  }
  function Dh(r, i) {
    return Ke(r) ? Lh(r, i) : Ze(r) ? Ih(r, i) : r;
  }
  async function Nh(r) {
    const t = await (
      await fetch(`https://www.youtube.com/oembed?url=${r}&format=json`)
    ).json();
    return t.width / t.height;
  }
  class Oh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "_options");
      o(this, "videoRatio", 16 / 9);
      o(this, "itemEl", null);
      o(this, "videoEl", null);
      o(this, "getAutoplay", () => {
        const { xoAutoplay: t = !0 } = this.options;
        return t ? "autoplay" : "";
      });
      o(
        this,
        "renderVimeo",
        (t) => `<${c.VideoCoverItem}>
      <iframe
        src="${t}"
        title="Vimeo video"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowsInlineMediaPlayback; ${this.getAutoplay()}"
        allowfullscreen
      ></iframe>
    </${c.VideoCoverItem}>`
      );
      o(
        this,
        "renderYoutube",
        (t) => `<${c.VideoCoverItem}>
      <iframe
        src="${t}"
        title="YouTube video"
        frameborder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowsInlineMediaPlayback; ${this.getAutoplay()}"
        allowfullscreen
        allowsInlineMediaPlayback
      ></iframe>
    </${c.VideoCoverItem}>`
      );
      o(
        this,
        "renderVideo",
        (t) => `<${c.VideoCoverItem}>
      <video
        src="${t}"
        title="Video"
        ${this.getAutoplay()}
        muted
        loop
        playsinline
        preload="metadata"
      ></video>
    </${c.VideoCoverItem}>`
      );
      o(this, "setVideoSize", () => {
        if (this.itemEl) {
          const t = this.offsetWidth / this.offsetHeight;
          this.videoRatio > t
            ? ((this.itemEl.style.height = `${this.offsetHeight}px`),
              (this.itemEl.style.width = `${
                this.offsetHeight * this.videoRatio
              }px`))
            : ((this.itemEl.style.width = `${this.offsetWidth}px`),
              (this.itemEl.style.height = `${
                this.offsetWidth / this.videoRatio
              }px`));
        }
      });
      o(this, "handleVideoRatio", () => {
        this.videoEl &&
          ((this.videoRatio =
            this.videoEl.videoWidth / this.videoEl.videoHeight),
          this.setVideoSize());
      });
      o(this, "handleYoutubeRatio", async () => {
        try {
          (this.videoRatio = await Nh(this.options.xoSrc)), this.setVideoSize();
        } catch {
          console.log("error");
        }
      });
      o(this, "handleVideo", () => {
        this.videoEl instanceof HTMLVideoElement &&
          (this.videoEl.readyState >= 2
            ? this.handleVideoRatio()
            : this.videoEl.addEventListener(
                "loadedmetadata",
                this.handleVideoRatio
              ));
      });
      o(this, "assignEl", () => {
        var t;
        (this.itemEl = this.querySelector(c.VideoCoverItem)),
          (this.videoEl =
            (t = this.itemEl) == null
              ? void 0
              : t.querySelector("iframe, video"));
      });
      o(this, "init", () => {
        this.setOptions();
        const { xoSrc: t, xoAutoplay: e = !0 } = this.options,
          s = Dh(t, e);
        Ke(t)
          ? (this.insertAdjacentHTML("beforeend", this.renderVimeo(s)),
            this.assignEl(),
            this.setVideoSize())
          : Ze(t)
          ? (this.insertAdjacentHTML("beforeend", this.renderYoutube(s)),
            this.assignEl(),
            this.handleYoutubeRatio())
          : (this.insertAdjacentHTML("beforeend", this.renderVideo(s)),
            this.assignEl(),
            this.handleVideo());
      });
      o(this, "destroy", () => {
        this.videoEl instanceof HTMLVideoElement &&
          this.videoEl.removeEventListener("loadedmetadata", this.handleVideo);
      });
      o(
        this,
        "handleResize",
        rt(
          ge("x", () => {
            this.destroy(), this.init();
          }),
          400
        )
      );
    }
    static get observedAttributes() {
      return ["xo-observed", "xo-src", "xo-breakpoints", "xo-autoplay"];
    }
    get options() {
      return this._options;
    }
    set options(t) {
      this._options = t;
    }
    setOptions() {
      var s;
      const t = M(this, {
          pick: ["xoSrc", "xoBreakpoints", "xoAutoplay"],
          types: {
            xoSrc: "string",
            xoBreakpoints: "object",
            xoAutoplay: "boolean",
          },
        }),
        e = qt(t.xoBreakpoints);
      (this.options = t),
        e &&
          (this.options = {
            ...t,
            xoSrc: (s = e == null ? void 0 : e.src) != null ? s : t.xoSrc,
          });
    }
    connectedCallback() {
      this.init(),
        this.dispatchEvent(new CustomEvent("xo-video-cover:init")),
        window.addEventListener("resize", this.handleResize);
    }
    async attributeChangedCallback(t, e, s) {
      (t === "xo-observed" || t === "xo-src" || t === "xo-breakpoints") &&
        e != null &&
        e !== s &&
        (await T(0), this.destroy(), this.init());
    }
    disconnectedCallback() {
      window.removeEventListener("resize", this.handleResize), this.destroy();
    }
  }
  let qr = class extends q {
    constructor() {
      super();
      o(this, "wcVideoEl", null);
      o(this, "handleClick", () => {
        this.setState((t) => ({ isPlaying: !t.isPlaying }));
      });
      o(this, "handleVideoInit", () => {
        var e;
        const t =
          (e = this.wcVideoEl) == null ? void 0 : e.getAttribute("xo-autoplay");
        this.setState({ isPlaying: t ? t == "true" : !0 });
      });
      this.state = { isPlaying: void 0 };
    }
    mount() {
      var t;
      (this.wcVideoEl = this.closest(c.VideoCover)),
        (t = this.wcVideoEl) == null ||
          t.addEventListener("xo-video-cover:init", this.handleVideoInit),
        this.addEventListener("click", this.handleClick);
    }
    unmount() {
      var t;
      (t = this.wcVideoEl) == null ||
        t.removeEventListener("xo-video-cover:init", this.handleVideoInit),
        this.removeEventListener("click", this.handleClick);
    }
    stateUpdate(t) {
      const { isPlaying: e } = this.state;
      if (t.isPlaying !== e) {
        const s = this.closest(c.VideoCover),
          n = s == null ? void 0 : s.querySelector("video");
        n &&
          s &&
          (e
            ? (n.play(), x.set(s, "xo-playing", !0), x.set(s, "xo-paused", !1))
            : (n.pause(),
              x.set(s, "xo-paused", !0),
              x.set(s, "xo-playing", !1)));
      }
    }
  };
  qr = X([U(c.VideoCoverButton), Fn("design:paramtypes", [])], qr);
  const xp = "";
  _({ [c.VideoCover]: Oh });
  function Fh() {
    const r = `
    <svg class="xo-hidden">
    <defs>
      <filter id="xo-typing-goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
        <feColorMatrix in="blur" mode="matrix" values="	1 0 0 0 0
                  0 1 0 0 0
                  1 0 1 0 0
                  0 0 0 18 -8" result="goo"></feColorMatrix>
        <feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite>
    </filter>
    </defs>
  </svg>
  `;
    document.body.insertAdjacentHTML("beforeend", r);
  }
  const Hr = 1e3 / 60,
    Uo = class {
      constructor(i, t) {
        o(this, "el");
        o(this, "options");
        o(this, "line", 0);
        o(this, "start", Date.now());
        o(this, "cancel", () => {});
        o(this, "animated", W());
        o(this, "typingContent", null);
        o(this, "init", () => {
          const { xoDuration: i, xoDelay: t } = this.options,
            e = `<${c.TypingInner} style="--xo-duration: ${i}; --xo-delay: ${t}"><${c.TypingContent}></${c.TypingContent}></${c.TypingInner}>`;
          (this.el.innerHTML = e),
            (this.typingContent = this.el.querySelector(c.TypingContent)),
            (this.el.style.filter = "url(#xo-typing-goo)");
        });
        o(this, "handleGoo", (i) => {
          const { xoDuration: t } = this.options,
            e = document.querySelector("#xo-typing-goo feGaussianBlur");
          this.animated({
            from: i === "inc" ? 0 : 8,
            to: i === "inc" ? 8 : 0,
            duration: t,
            onUpdate(s) {
              e == null || e.setAttribute("stdDeviation", s.toString());
            },
          });
        });
        o(this, "handleFrame", async () => {
          const { xoContent: i, xoDuration: t, xoDelay: e } = this.options;
          Date.now() - this.start > e &&
            (x.set(this.el, "xo-goo", !0),
            this.handleGoo("inc"),
            (this.start = Date.now()),
            this.animated.off(),
            this.handleGoo("dec"),
            (this.cancel = await T(t - Hr)),
            x.set(this.el, "xo-goo", !1),
            (this.line = (this.line + 1) % i.length));
          const n = i[this.line],
            a = (this.line + 1) % i.length,
            l = i[a],
            d = `<span>${n}</span><span>${l}</span>`,
            h = Array.from(this.el.querySelectorAll("span"));
          v(h, (u, p) => {
            const m = u.offsetWidth;
            this.el.style.setProperty(`--xo-width-${p}`, `${m}px`);
          }),
            this.typingContent &&
              this.typingContent.innerHTML !== d &&
              (this.typingContent.innerHTML = d);
        });
        o(this, "destroy", () => {
          K.remove(this.handleFrame), this.cancel(), this.animated.off();
        });
        (this.el = i),
          (this.options = t),
          (this.el = i),
          (this.options = { ...Uo.defaultOptions, ...t }),
          K.add(this.handleFrame, !0),
          this.init();
      }
    };
  let zs = Uo;
  o(zs, "defaultOptions", {
    xoContent: [],
    xoDuration: 1e3,
    xoDelay: 2e3,
    xoEffect: "typing",
  });
  const Xo = class {
    constructor(i, t) {
      o(this, "el");
      o(this, "options");
      o(this, "line", 0);
      o(this, "start", Date.now());
      o(this, "cancel", () => {});
      o(this, "typingContent", null);
      o(this, "init", () => {
        const { xoDuration: i, xoDelay: t } = this.options,
          e = `<${c.TypingInner} style="--xo-duration: ${i}; --xo-delay: ${t}"><${c.TypingContent}></${c.TypingContent}></${c.TypingInner}>`;
        (this.el.innerHTML = e),
          (this.typingContent = this.el.querySelector(c.TypingContent));
      });
      o(this, "handleFrame", async () => {
        const { xoContent: i, xoDuration: t, xoDelay: e } = this.options;
        Date.now() - this.start > e &&
          (x.set(this.el, "xo-slide", !0),
          (this.start = Date.now()),
          (this.cancel = await T(t - Hr)),
          x.set(this.el, "xo-slide", !1),
          (this.line = (this.line + 1) % i.length));
        const n = i[this.line],
          a = (this.line + 1) % i.length,
          l = i[a],
          d = `<span>${n}</span><span>${l}</span>`,
          h = Array.from(this.el.querySelectorAll("span"));
        v(h, (u, p) => {
          const m = u.offsetWidth;
          this.el.style.setProperty(`--xo-width-${p}`, `${m}px`);
        }),
          this.typingContent &&
            this.typingContent.innerHTML !== d &&
            (this.typingContent.innerHTML = d);
      });
      o(this, "destroy", () => {
        K.remove(this.handleFrame), this.cancel();
      });
      (this.el = i),
        (this.options = t),
        (this.el = i),
        (this.options = { ...Xo.defaultOptions, ...t }),
        K.add(this.handleFrame, !0),
        this.init();
    }
  };
  let _s = Xo;
  o(_s, "defaultOptions", {
    xoContent: [],
    xoDuration: 300,
    xoDelay: 2e3,
    xoEffect: "typing",
  });
  const Yo = class {
    constructor(i, t) {
      o(this, "el");
      o(this, "options");
      o(this, "type", "");
      o(this, "line", -1);
      o(this, "minIndex", -1);
      o(this, "sameText", "");
      o(this, "index", -1);
      o(this, "start", Date.now());
      o(this, "start2", Date.now());
      o(this, "start3", Date.now());
      o(this, "increasing", !0);
      o(this, "handleFrame", () => {
        const {
          xoContent: i,
          xoDuration: t,
          xoDelay: e,
          xoCursorChar: s,
        } = this.options;
        this.index === this.minIndex &&
          ((this.line = (this.line + 1) % i.length),
          (this.increasing = !0),
          (this.sameText = ""),
          (this.minIndex = -1));
        const n = 30,
          a = i[this.line],
          l = e + (t + n) * a.length;
        if (i.length > 1) {
          const m = (this.line + 1) % i.length,
            f = i[m];
          if (!this.increasing)
            for (let b = 0; b < a.length; b++) {
              const y = a[b];
              if (new RegExp(`^${this.sameText}`, "g").test(f))
                (this.minIndex = this.sameText.length - 1),
                  (this.sameText += y);
              else break;
            }
        }
        Date.now() - this.start > t &&
          this.increasing &&
          this.index < a.length - 1 &&
          ((this.index = (this.index + 1) % a.length),
          (this.start = Date.now())),
          this.index === a.length - 1 &&
            Date.now() - this.start2 > l &&
            ((this.increasing = !1), (this.start2 = Date.now()));
        const h = Date.now() - this.start3;
        !this.increasing &&
          h > n &&
          ((this.index = this.index - 1), (this.start3 = Date.now())),
          (this.type = a.substring(0, Math.min(this.index + 1, a.length))),
          this.el.innerHTML !== this.type && (this.el.innerHTML = this.type);
        const u = this.el.offsetHeight,
          p = this.el.offsetWidth;
        u > 0 && this.el.style.setProperty("--xo-height", `${u}px`),
          this.el.style.setProperty("--xo-width", `${p}px`),
          this.el.setAttribute("xo-cursor-char", `${s}`);
      });
      o(this, "destroy", () => {
        K.remove(this.handleFrame);
      });
      (this.el = i),
        (this.options = t),
        (this.el = i),
        (this.options = { ...Yo.defaultOptions, ...t }),
        K.add(this.handleFrame, !0);
    }
  };
  let Ws = Yo;
  o(Ws, "defaultOptions", {
    xoContent: [],
    xoDuration: 100,
    xoDelay: 2e3,
    xoEffect: "typing",
    xoCursorChar: "|",
  });
  class Rh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "typing", null);
      o(this, "slide", null);
      o(this, "goo", null);
      o(this, "init", () => {
        const t = this.getOptions();
        switch (t.xoEffect) {
          case "slide":
            this.slide = new _s(this, t);
            break;
          case "goo":
            this.goo = new zs(this, t);
            break;
          case "typing":
          default:
            this.typing = new Ws(this, t);
            break;
        }
      });
      o(this, "destroy", () => {
        var t, e, s;
        (t = this.typing) == null || t.destroy(),
          (e = this.slide) == null || e.destroy(),
          (s = this.goo) == null || s.destroy();
      });
    }
    static get observedAttributes() {
      return [
        "xo-observed",
        "xo-duration",
        "xo-content",
        "xo-delay",
        "xo-effect",
        "xo-cursor-char",
      ];
    }
    getOptions() {
      return M(this, {
        pick: [
          "xoContent",
          "xoDuration",
          "xoDelay",
          "xoEffect",
          "xoCursorChar",
        ],
        types: {
          xoContent: "array",
          xoDuration: "number",
          xoDelay: "number",
          xoEffect: "string",
          xoCursorChar: "string",
        },
      });
    }
    connectedCallback() {
      this.init();
    }
    disconnectedCallback() {
      this.destroy();
    }
    async attributeChangedCallback(t, e, s) {
      (t === "xo-observed" ||
        t === "xo-duration" ||
        t === "xo-content" ||
        t === "xo-delay" ||
        t === "xo-effect" ||
        t === "xo-cursor-char") &&
        e !== s &&
        (await T(100), this.destroy(), this.init());
    }
  }
  const bp = "";
  Fh(), _({ [c.Typing]: Rh });
  const pe = { Idle: "idle", Target: "target", Lock: "lock" },
    Go = class extends HTMLElement {
      constructor() {
        super(...arguments);
        o(this, "handleEl");
        o(this, "pan");
        o(this, "animated", W());
        o(this, "prevDx", 0);
        o(this, "axis", pe.Idle);
        o(this, "setVariables", (t) => {
          this.style.setProperty("--xo-value", `${t}`),
            this.setAttribute("xo-value", `${t}`);
        });
        o(this, "handler", () => {
          const { xoDefaultPercent: t } = this.getOptions();
          this.setVariables(t),
            (this.handleEl = this.querySelector(`${c.ImageComparison}-handle`));
          const { width: e } = this.getBoundingClientRect(),
            s = 1.5;
          (this.prevDx = e * (t / 100)),
            (this.pan = Kt({
              element: this,
              dx: e * (t / 100),
              onMove: ({ dx: n, dy: a }) => {
                const { width: l } = this.getBoundingClientRect();
                if (
                  (this.axis === pe.Idle &&
                    (Math.abs(n - this.prevDx) / s >= Math.abs(a)
                      ? (this.axis = pe.Target)
                      : (this.axis = pe.Lock)),
                  this.axis === pe.Target)
                ) {
                  (this.style.touchAction = "none"),
                    (this.style.cursor = "ew-resize");
                  const d = D({
                    value: n,
                    inputRange: [0, l],
                    outputRange: [0, 100],
                  });
                  this.setVariables(d), (this.prevDx = n);
                }
              },
              onEnd: () => {
                (this.axis = pe.Idle),
                  this.pan.setValue({ dx: this.prevDx, dy: 0 }),
                  this.style.removeProperty("cursor"),
                  this.style.removeProperty("touch-action");
              },
            }));
        });
        o(this, "handleClick", (t) => {
          if (!this.handleEl.contains(t.target)) {
            const { width: e } = this.getBoundingClientRect(),
              { offsetX: s } = t,
              n = D({ value: s, inputRange: [0, e], outputRange: [0, 100] });
            this.animated({
              from: Number(this.style.getPropertyValue("--xo-value")),
              to: n,
              duration: 100,
              easing: R.decay,
              onUpdate: (a) => {
                this.setVariables(a), this.pan.setValue({ dx: e * (a / 100) });
              },
            });
          }
        });
        o(this, "init", () => {
          this.handler(),
            j.any || this.addEventListener("mousedown", this.handleClick);
        });
        o(this, "destroy", () => {
          this.pan.destroy(),
            this.animated.off(),
            j.any || this.removeEventListener("mousedown", this.handleClick);
        });
      }
      static get observedAttributes() {
        return ["xo-observed", "xo-value", "xo-default-percent"];
      }
      getOptions() {
        const t = M(this, {
          pick: ["xoDefaultPercent"],
          types: { xoDefaultPercent: "number" },
        });
        return { ...Go.defaultOptions, ...t };
      }
      connectedCallback() {
        this.init();
      }
      disconnectedCallback() {
        this.destroy();
      }
      async attributeChangedCallback(t, e, s) {
        (t === "xo-observed" || t === "xo-default-percent") &&
          e !== s &&
          (await T(100), this.destroy(), this.init());
      }
    };
  let Us = Go;
  o(Us, "defaultOptions", { xoDefaultPercent: 50 });
  const yp = "";
  _({ [c.ImageComparison]: Us });
  const qh = (r) => `xb-menu-${r.toString().slice(-8)}`;
  async function Hh(r) {
    const i = qh(r);
    return await (await fetch(`/?section_id=${i}`)).text();
  }
  const Vr = ".shopify-section",
    Vh = "StorefrontMessage::FetchSectionAssets",
    Bh = "StorefrontMessage::ReplaceSection",
    zh = "StorefrontMessage::SelectElement",
    _h = "StorefrontMessage::DeselectElement",
    ie = class extends HTMLElement {
      constructor() {
        var t;
        super();
        o(this, "linkEl", null);
        o(this, "sectionEls", []);
        o(this, "prevIndex", null);
        o(this, "sectionGidSelected", "");
        o(this, "builderMegaMenuHtml", "");
        o(this, "setPositionStatic", (t) => {
          if (!ie.isEmpty(t)) {
            const s = t.parentElement;
            s.tagName.toLowerCase() !== c.Toggle &&
              (s.style.position = "static");
          }
        });
        o(this, "handleLinkClick", (t) => {
          const s = t.target.closest("a"),
            n = s == null ? void 0 : s.getAttribute("xo-modal-name");
          n && (t.preventDefault(), Ht.open(n));
        });
        o(this, "handleMenuHamburger", () => {
          const t = this.closest(c.Modal),
            e = !ie.isEmpty(this);
          t &&
            e &&
            ((this.linkEl = t.previousElementSibling),
            this.linkEl &&
              (this.linkEl.setAttribute(
                "xo-modal-name",
                t.getAttribute("xo-name")
              ),
              this.linkEl.addEventListener("click", this.handleLinkClick)));
        });
        o(this, "renderForTheme", () => {
          const { xoIndex: t, xoName: e } = this.options,
            s = `template[xo-mega-menu-name='${e}'][xo-mega-menu-index="${t}"]`,
            n = document.querySelector(s);
          if (n && ie.isEmpty(this)) {
            const a = ut(n);
            this.setAttribute("xo-section-id", a),
              this.appendChild(n.content.cloneNode(!0));
          }
        });
        o(this, "renderForBuilder", async () => {
          try {
            const { xoName: t, xoPreviewMode: e } = this.options;
            if (e) {
              const s = `template[xo-mega-menu-name='${t}']`,
                n = document.querySelector(s);
              n &&
                ie.isEmpty(this) &&
                this.appendChild(n.content.cloneNode(!0));
            } else {
              this.builderMegaMenuHtml ||
                (this.builderMegaMenuHtml = await Hh(t));
              const s = new RegExp(
                  `(<template.*xo-mega-menu-name=['"]${t}['"]>|<\\/template>)`,
                  "g"
                ),
                n = `<xo-fragment>${this.builderMegaMenuHtml.replace(
                  s,
                  ""
                )}</xo-fragment>`,
                a = new DOMParser().parseFromString(n, "text/html"),
                l = Array.from(a.querySelectorAll("script")).filter(
                  (d) => d.type === "" || d.type === "text/javascript"
                );
              if (n && ie.isEmpty(this)) {
                v(l, (h) => {
                  h.remove();
                });
                const d = a.body.querySelector("xo-fragment");
                v(Array.from(d.children), (h) => {
                  this.appendChild(h);
                }),
                  v(l, (h) => {
                    h.src
                      ? Oi({ id: h.id || `id-${Ue(h.src)}`, file: h.src })
                      : h.textContent &&
                        Oi({
                          id: h.id || `id-${Ue(h.textContent)}`,
                          content: h.textContent,
                        });
                  });
              }
            }
          } catch {}
        });
        o(this, "render", () => {
          const { xoBuilder: t } = this.options;
          t ? this.renderForBuilder() : this.renderForTheme();
        });
        o(this, "handleMessage", async (t) => {
          var n;
          const { xoBuilder: e, xoSectionId: s } = this.options;
          if (!e) {
            if (
              (t.data.type === zh &&
                ((this.sectionEls = Array.from(
                  document.querySelectorAll("template[xo-mega-menu-name]")
                ).map((a) => a.closest(Vr))),
                (this.sectionGidSelected = t.data.payload.sectionGid),
                x.set(this, "xo-selected", this.sectionGidSelected === s)),
              t.data.type === _h && (this.prevIndex = null),
              t.data.type === Vh)
            ) {
              const a = `shopify-section-${t.data.payload.sectionGid}`,
                l = this.sectionEls.find((d) => d.id === a);
              if (l) {
                const d = l.querySelector("template");
                this.prevIndex =
                  (n =
                    d == null
                      ? void 0
                      : d.getAttribute("xo-mega-menu-index")) != null
                    ? n
                    : "";
              }
            }
            if (t.data.type === Bh) {
              const a = t.data.payload.markup,
                d = new DOMParser()
                  .parseFromString(a, "text/html")
                  .querySelector("template[xo-mega-menu-name]"),
                h = d == null ? void 0 : d.getAttribute("xo-mega-menu-index");
              if (
                !!this.querySelector(
                  `[data-id="${this.sectionGidSelected}"]`
                ) &&
                !!d
              ) {
                const p = d.cloneNode(!0);
                this.innerHTML.trim() !== p.innerHTML.trim() &&
                  (this.innerHTML = p.innerHTML);
              }
              this.prevIndex != null &&
                this.prevIndex !== h &&
                (await T(400), window.location.reload());
            }
          }
        });
        (t = window.Shopify) != null &&
          t.designMode &&
          (window.addEventListener("message", this.handleMessage),
          (this.sectionEls = Array.from(
            document.querySelectorAll("template[xo-mega-menu-name]")
          ).map((e) => e.closest(Vr))));
      }
      static get observedAttributes() {
        return ["xo-name"];
      }
      get options() {
        return M(this, {
          pick: [
            "xoIndex",
            "xoName",
            "xoSectionId",
            "xoSelected",
            "xoBuilder",
            "xoPreviewMode",
          ],
          types: {
            xoIndex: "number",
            xoName: "string",
            xoSectionId: "string",
            xoSelected: "boolean",
            xoBuilder: "boolean",
            xoPreviewMode: "boolean",
          },
        });
      }
      connectedCallback() {
        var t;
        ((t = window.xbEditor) != null && t.designMode) ||
          (this.render(),
          window.Xotiny && this.setPositionStatic(this),
          this.handleMenuHamburger());
      }
      disconnectedCallback() {
        var t;
        (t = this.linkEl) == null ||
          t.removeEventListener("click", this.handleLinkClick),
          window.removeEventListener("message", this.handleMessage);
      }
    };
  let Xs = ie;
  o(Xs, "isEmpty", (t) => t.innerHTML.trim() === ""), _({ [c.MegaMenu]: Xs });
  class Wh extends HTMLElement {
    constructor() {
      super();
      o(
        this,
        "colorSchemeIds",
        ((Pa = window.settings) == null ? void 0 : Pa.color_scheme_ids) || []
      );
      o(
        this,
        "darkModeMapping",
        (Aa = window.settings) == null ? void 0 : Aa.dark_mode_mapping
      );
      o(this, "colorSchemeMapping");
      o(this, "prevIds", new Map());
      o(this, "nextIds", new Map());
      o(this, "rootPrevId", "");
      o(this, "rootNextId", "");
      o(this, "handleToggles", []);
      if (this.darkModeMapping)
        try {
          this.colorSchemeMapping = this.darkModeMapping
            .trim()
            .split(
              `
`
            )
            .reduce((t, e) => {
              const [s, n] = e.replace(/:\s+/g, ":").split(":");
              return { ...t, [s]: n };
            }, {});
        } catch {
          this.colorSchemeMapping = {};
        }
      else this.colorSchemeMapping = {};
    }
    connectedCallback() {
      var t;
      for (let e in this.colorSchemeMapping) {
        const s = Number(e.replace(/Scheme\s/g, "")) - 1,
          n = Number(this.colorSchemeMapping[e].replace(/Scheme\s/g, "")) - 1,
          a = this.colorSchemeIds[s],
          l = this.colorSchemeIds[n],
          d = Array.from(document.querySelectorAll(`.color-${a}`));
        v(d, (m) => {
          this.prevIds.set(m, a), this.nextIds.set(m, l);
        }),
          s === 0 && ((this.rootPrevId = a), (this.rootNextId = l));
        let h =
          ((t = dt(ae.getItem("@xo/darkMode") || "{}")) == null
            ? void 0
            : t[a]) === "dark";
        const u = () => {
            this.setAttribute("xo-type", h ? "dark" : "light"),
              v(d, (m) => {
                h
                  ? (m.classList.remove(`color-${this.prevIds.get(m)}`),
                    m.classList.add(`color-${this.nextIds.get(m)}`))
                  : (m.classList.remove(`color-${this.nextIds.get(m)}`),
                    m.classList.add(`color-${this.prevIds.get(m)}`));
              }),
              s === 0 &&
                (h
                  ? (document.documentElement.classList.remove(
                      `color-${this.rootPrevId}`
                    ),
                    document.documentElement.classList.add(
                      `color-${this.rootNextId}`
                    ))
                  : (document.documentElement.classList.remove(
                      `color-${this.rootNextId}`
                    ),
                    document.documentElement.classList.add(
                      `color-${this.rootPrevId}`
                    )));
          },
          p = () => {
            h = !h;
            const m = JSON.stringify({
              ...dt(ae.getItem("@xo/darkMode") || "{}"),
              [a]: h ? "dark" : "light",
            });
            ae.setItem("@xo/darkMode", m), u();
          };
        u(), this.addEventListener("click", p), this.handleToggles.push(p);
      }
    }
    disconnectedCallback() {
      v(this.handleToggles, (t) => {
        this.removeEventListener("click", t);
      });
    }
  }
  ne(async () => {
    await T(0), _({ [c.DarkMode]: Wh });
  });
  const Uh = 300,
    mi = class extends HTMLElement {
      constructor() {
        super();
        o(this, "heights", []);
        o(this, "resized", !1);
        o(this, "debounceId", -1);
        o(this, "resizeObserver", null);
        o(this, "prevWidth", 0);
        o(this, "_options");
        o(this, "setOptions", () => {
          var s, n, a, l;
          const t = M(this, {
              pick: ["xoGap", "xoColumn", "xoBreakpoints"],
              types: {
                xoGap: "number",
                xoColumn: "number",
                xoBreakpoints: "object",
              },
            }),
            e = qt(t.xoBreakpoints);
          this.options = {
            ...t,
            xoGap:
              (n = (s = e == null ? void 0 : e.gap) != null ? s : t.xoGap) !=
              null
                ? n
                : mi.defaultOptions.xoGap,
            xoColumn:
              (l =
                (a = e == null ? void 0 : e.column) != null ? a : t.xoColumn) !=
              null
                ? l
                : mi.defaultOptions.xoColumn,
          };
        });
        o(this, "setItemStyles", (t) => {
          const { xoGap: e } = this.options,
            { xoColumn: s } = this.options;
          (t.style.position = "absolute"),
            (t.style.width = `${100 / s}%`),
            (t.style.left = `${(100 / s) * this.indexSelected}%`),
            (t.style.top = `${this.minHeight}px`),
            (t.style.padding = `${e / 2}px`),
            this.resized && (t.style.transition = "all 0.4s ease");
        });
        o(this, "handleMasonryElement", () => {
          const { xoGap: t } = this.options,
            e = Array.from(this.querySelectorAll(c.MasonryItem));
          v(e, (s) => {
            this.setItemStyles(s),
              (this.heights[this.indexSelected] += s.offsetHeight);
          }),
            (this.style.height = `${this.maxHeight}px`),
            (this.style.margin = `-${t / 2}`),
            this.debounceId && clearTimeout(this.debounceId),
            (this.debounceId = window.setTimeout(() => {
              e.forEach((s) => {
                s.style.removeProperty("transition");
              }),
                (this.resized = !1);
            }, 500));
        });
        o(this, "setDefaultHeights", () => {
          const { xoColumn: t } = this.options;
          this.heights = Array(t).fill(0);
        });
        o(this, "update", () => {
          this.setOptions(),
            this.setDefaultHeights(),
            this.handleMasonryElement();
        });
        o(
          this,
          "handleResize",
          rt((t) => {
            for (let e of t) {
              const s = e.contentRect.width;
              s !== this.prevWidth &&
                ((this.resized = !0), this.update(), (this.prevWidth = s));
            }
          }, Uh)
        );
      }
      static get observedAttributes() {
        return ["xo-observed"];
      }
      get options() {
        return this._options;
      }
      set options(t) {
        this._options = t;
      }
      get minHeight() {
        return Math.min(...this.heights);
      }
      get maxHeight() {
        return Math.max(...this.heights);
      }
      get indexSelected() {
        return Di(this.heights, (t) => t === this.minHeight);
      }
      connectedCallback() {
        this.update(),
          (this.resizeObserver = new ResizeObserver(this.handleResize)),
          this.resizeObserver.observe(this);
      }
      disconnectedCallback() {
        var t;
        clearTimeout(this.debounceId),
          (t = this.resizeObserver) == null || t.disconnect(),
          this.update();
      }
      async attributeChangedCallback(t, e, s) {
        var n;
        t === "xo-observed" &&
          e !== s &&
          (await T(100),
          clearTimeout(this.debounceId),
          (n = this.resizeObserver) == null || n.disconnect(),
          this.update());
      }
    };
  let Ys = mi;
  o(Ys, "defaultOptions", { xoGap: 30, xoColumn: 4, xoBreakpoints: {} });
  const Xh = 300;
  class Yh extends HTMLElement {
    constructor() {
      super(...arguments);
      o(this, "resizeObserver", null);
      o(this, "prevWidth", 0);
      o(this, "prevHeight", 0);
      o(this, "masonryEl", null);
      o(
        this,
        "handleResize",
        rt((t) => {
          var e;
          for (const s of t) {
            const n = s.contentRect.width,
              a = s.contentRect.height;
            (n !== this.prevWidth || a !== this.prevHeight) &&
              ((e = this.masonryEl) == null || e.update(),
              (this.prevWidth = n),
              (this.prevHeight = a));
          }
        }, Xh)
      );
    }
    connectedCallback() {
      var t;
      (this.masonryEl = this.closest(c.Masonry)),
        (this.resizeObserver = new ResizeObserver(this.handleResize)),
        this.resizeObserver.observe(this),
        (t = this.masonryEl) == null || t.update();
    }
    disconnectedCallback() {
      var e;
      const t = this.closest(c.Masonry);
      clearTimeout(t == null ? void 0 : t.debounceId),
        (e = this.resizeObserver) == null || e.disconnect();
    }
  }
  const vp = "";
  _({ [c.Masonry]: Ys, [c.MasonryItem]: Yh });
  function Gh(r, i, t, e) {
    var s = r - i,
      n = t - e;
    return Math.hypot(s, n);
  }


  const jh = 1e3 / 60,
    jo = class extends HTMLDivElement {
      constructor() {
        super(...arguments);
        o(this, "targetValueX", 0);
        o(this, "targetValueY", 0);
        o(this, "currentValueX", 0);
        o(this, "currentValueY", 0);
        o(this, "displacementX", 0);
        o(this, "displacementY", 0);
        o(this, "isHover", !1);
        o(this, "itemEl", null);
        o(this, "isStart", !1);
        o(this, "handleFrameSyncUpdate", ({ delta: t }) => {
          if (this.itemEl) {
            const e = Math.abs(this.targetValueX - this.currentValueX),
              s = Math.abs(this.targetValueY - this.currentValueY);
            if (e < 0.001 && s < 0.001) return;
            let n = t / jh;
            const a = Math.round(n);
            a >= 1 && (n = a);
            const { xoLerpEase: l } = this.options,
              d = Jt(
                this.currentValueX,
                this.targetValueX,
                (this.isHover ? l : 1) * n
              ),
              h = Jt(
                this.currentValueY,
                this.targetValueY,
                (this.isHover ? l : 1) * n
              );
            (this.itemEl.style.top = `${h}px`),
              (this.itemEl.style.left = `${d}px`),
              (this.currentValueX = d),
              (this.currentValueY = h),
              (this.isHover = !0),
              this.handleDistortion(n);
          }
        });
        o(this, "handleDistortion", (t) => {
          const { xoLerpEase: e, xoDistortion: s } = this.options;
          if (s === "none") return;
          (this.itemEl.style.filter = `url(#xo-cursor-${s})`),
            (this.displacementX = Jt(
              this.displacementX,
              this.targetValueX,
              e * t
            )),
            (this.displacementY = Jt(
              this.displacementY,
              this.targetValueY,
              e * t
            ));
          const n = Gh(
              this.displacementX,
              this.targetValueX,
              this.displacementY,
              this.targetValueY
            ),
            a = document.querySelector(`#xo-cursor-${s} feDisplacementMap`);
          a.scale.baseVal = n;
        });
        o(this, "setHoverButton", (t) => {
          const e =
            !!t.target.closest("a") ||
            !!t.target.closest("button") ||
            !!t.target.closest('[role="button"]');
          this.itemEl && x.set(this.itemEl, "xo-is-hovering-button", e);
        });
        o(this, "handleMouseMove", (t) => {
          const { xoAbsolute: e } = this.options;
          this.isStart ||
            ((this.isStart = !0), K.add(this.handleFrameSyncUpdate, !0)),
            this.setItemLeftRightEl(t),
            v(this.itemEls, (a) => {
              x.set(a, "xo-active", !1);
            }),
            this.itemEl &&
              !x.get(this.itemEl, "xo-active") &&
              x.set(this.itemEl, "xo-active", !0);
          const { scrollX: s, scrollY: n } = this.getScrollXY();
          if (e) {
            const { top: a, left: l } = Y(this);
            (this.targetValueX = t.pageX - l),
              (this.targetValueY = t.pageY - a);
          } else
            (this.targetValueX = t.pageX - s),
              (this.targetValueY = t.pageY - n);
          this.setHoverButton(t);
        });
        o(this, "handleMouseLeave", (t) => {
          t.stopPropagation(),
            this.itemEl &&
              (x.set(this.itemEl, "xo-active", !1),
              (this.isHover = !1),
              K.remove(this.handleFrameSyncUpdate));
        });
        o(this, "setItemLeftRightEl", (t) => {
          const { xoName: e } = this.options;
          if (e.startsWith("[") && e.endsWith("]")) {
            const [s, n] = dt(e);
            Y(this).left + this.offsetWidth / 2 < t.pageX
              ? (this.itemEl = this.querySelector(
                  `${c.CursorItem}[xo-name="${n}"]`
                ))
              : (this.itemEl = this.querySelector(
                  `${c.CursorItem}[xo-name="${s}"]`
                ));
          }
        });
        o(this, "handleMouseEnter", (t) => {
          t.stopPropagation(),
            this.setItemLeftRightEl(t),
            this.itemEl &&
              (this.setHoverButton(t), K.add(this.handleFrameSyncUpdate, !0));
        });
      }
      get options() {
        const t = M(this, {
          pick: ["xoName", "xoLerpEase", "xoDistortion", "xoAbsolute"],
          types: {
            xoName: "string",
            xoLerpEase: "number",
            xoDistortion: "string",
            xoAbsolute: "boolean",
          },
        });
        return { ...jo.defaultOptions, ...t };
      }
      setItemEl() {
        const { xoName: t } = this.options;
        t.startsWith("[") && t.endsWith("]") && (this.itemEl = null),
          t &&
            (this.itemEl = this.querySelector(
              `${c.CursorItem}[xo-name="${t}"]`
            )),
          (this.itemEl = this.querySelector(c.CursorItem));
      }
      get itemEls() {
        return Array.from(document.querySelectorAll(c.CursorItem));
      }
      getScrollXY() {
        const t = window.scrollX,
          e = window.scrollY;
        return { scrollX: t, scrollY: e };
      }
      connectedCallback() {
        const { top: t, left: e } = Y(this),
          { scrollX: s, scrollY: n } = this.getScrollXY();
        (this.targetValueX = e + this.offsetWidth / 2 - s),
          (this.targetValueY = t + this.offsetHeight / 2 - n),
          (this.currentValueX = this.targetValueX),
          (this.currentValueY = this.targetValueY),
          this.setItemEl(),
          this.addEventListener("mouseenter", this.handleMouseEnter, !1),
          this.addEventListener("mousemove", this.handleMouseMove, !1),
          this.addEventListener("mouseleave", this.handleMouseLeave, !1);
      }
      disconnectedCallback() {
        this.removeEventListener("mouseenter", this.handleMouseEnter, !1),
          this.removeEventListener("mousemove", this.handleMouseMove, !1),
          this.removeEventListener("mouseleave", this.handleMouseLeave, !1),
          K.remove(this.handleFrameSyncUpdate);
      }
    };
  let Gs = jo;
  o(Gs, "defaultOptions", {
    xoName: "",
    xoLerpEase: 0.1,
    xoDistortion: "none",
    xoAbsolute: !1,
  });

  
  function Qh() {
    const r = `
    <svg class="xo-hidden">
      <filter id="xo-cursor-distortion-1">
        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.003" numOctaves="5" seed="2" stitchTiles="noStitch" x="0%" y="0%" width="100%" height="100%" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" />
      </filter>
      <filter id="xo-cursor-distortion-2">
        <feTurbulence type="turbulence" baseFrequency="0.07 0.01" numOctaves="5" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="noise"></feTurbulence />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" />
      </filter>
      <filter id="xo-cursor-distortion-3">
        <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="5" seed="2" stitchTiles="noStitch" x="0%" y="0%" width="100%" height="100%" result="noise"></feTurbulence />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" />
      </filter>
      <filter id="xo-cursor-distortion-4">
        <feTurbulence type="fractalNoise" baseFrequency="0 0.04" numOctaves="5" seed="2" stitchTiles="noStitch" x="0%" y="0%" width="100%" height="100%" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" />
      </filter>
      <filter id="xo-cursor-distortion-5">
        <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="5" seed="2" stitchTiles="noStitch" x="0%" y="0%" width="100%" height="100%" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" />
      </filter>
    </svg>
  `;
    document.body.insertAdjacentHTML("beforeend", r);
  }
  const wp = "";
  Qh(),
    customElements.get(c.Cursor) ||
      customElements.define(c.Cursor, Gs, { extends: "div" });
  function Zh() {
    var r;
    if (!((r = window.xbEditor) != null && r.designMode)) {
      let i = function (e) {
        const s = { xoOffset: 0, xoDuration: 500, xoEasing: "easeInOutCubic" },
          n = M(e, {
            pick: ["xoOffset", "xoDuration", "xoEasing"],
            types: {
              xoOffset: "number",
              xoDuration: "number",
              xoEasing: "string",
            },
          });
        return { ...s, ...n };
      };
      const t = W();
      window.addEventListener("click", (e) => {
        var l, d;
        const n = e.target.closest("[xo-scroll-to]"),
          a =
            (d =
              (l = n == null ? void 0 : n.getAttribute("href")) != null
                ? l
                : n == null
                ? void 0
                : n.getAttribute("xb-href")) != null
              ? d
              : n == null
              ? void 0
              : n.getAttribute("xo-href");
        if (n && a) {
          e.preventDefault();
          const { xoOffset: h, xoDuration: u, xoEasing: p } = i(n);
          if (a === "#top")
            t({
              from: window.scrollY,
              to: 0 + h,
              duration: u,
              easing: R[p],
              onUpdate: (m) => {
                window.scrollTo({ top: m });
              },
            });
          else {
            const m = document.querySelector(a);
            if (m != null) {
              const f = window.scrollY,
                b = m.getBoundingClientRect().top + window.scrollY + h;
              t({
                from: f,
                to: b,
                duration: u,
                easing: R[p],
                onUpdate: (y) => {
                  const E = ji("top"),
                    C = D({
                      inputRange: [f, b],
                      outputRange: [0, E],
                      value: y,
                    });
                  window.scrollTo({ top: y - C });
                },
              });
            }
          }
        }
      });
    }
  }
  Zh();
  function Kh(r) {
    if (r.startsWith("[") && r.endsWith("]")) return dt(r);
    const i = [],
      [t, e] = r
        .replace(/.*{/g, "")
        .replace(/}.*/g, "")
        .replace(/\s/g, "")
        .split(","),
      s = Number(t),
      n = Number(e),
      a = t.replace(/\d/g, "0");
    for (let l = s; l <= n; l++) {
      const d = new RegExp(`(.*)(\\d{${l.toString().length}})`, "g"),
        h = a.length === 1 ? `${l}` : a.replace(d, `$1${l}`),
        u = r.replace(/{.*}/g, h);
      i.push(u);
    }
    return i;
  }
  function Jh(r) {
    return new Promise((i, t) => {
      const e = new Image();
      (e.onload = () => i(r)),
        (e.onerror = () => t("Error loading image")),
        (e.src = r);
    });
  }
  class tu {
    constructor(i = 0) {
      o(this, "listeners", []);
      o(this, "state");
      o(this, "increment", () => {
        const { index: i, max: t, min: e } = this.state;
        i === t ? this.setState({ index: e }) : this.setState({ index: i + 1 });
      });
      o(this, "decrement", () => {
        const { index: i, min: t, max: e } = this.state;
        i === t ? this.setState({ index: e }) : this.setState({ index: i - 1 });
      });
      o(this, "setIndexWrapAroundRange", (i) => {
        const { min: t, max: e } = this.getState(),
          s = Ge(Math.floor(i), t, e);
        this.setState({ index: s });
      });
      o(this, "imagesRequest", async (i) => {
        try {
          const t = Kh(i),
            s = (await Promise.allSettled(t.map((n) => Jh(n)))).reduce(
              (n, a) => (a.status === "fulfilled" && n.push(a.value), n),
              []
            );
          this.setState({ max: s.length - 1, images: s, loading: !1 });
        } catch {
          this.setState({ loading: !1 });
        }
      });
      this.state = { index: i, loading: !0, images: [], min: 0, max: 0 };
    }
    setState(i) {
      (this.state = { ...this.state, ...i }),
        this.listeners.forEach((t) => t());
    }
    getState() {
      return this.state;
    }
    subscribe(i) {
      return (
        this.listeners.push(i),
        () => {
          this.listeners = this.listeners.filter((t) => t !== i);
        }
      );
    }
  }
  const eu = 1e3,
    su = 100,
    iu = 2e3,
    Qo = class extends HTMLElement {
      constructor() {
        super(...arguments);
        o(this, "store");
        o(this, "nextEl", null);
        o(this, "prevEl", null);
        o(this, "playEl", null);
        o(this, "pauseEl", null);
        o(this, "pan", null);
        o(this, "prevDx", 0);
        o(this, "start", Date.now());
        o(this, "animated", W());
        o(this, "image", new Image());
        o(this, "unsubscribe", () => {});
        o(this, "stopAnimated", () => {});
        o(this, "getOptions", () => {
          const t = M(this, {
            pick: ["xoSpeed", "xoImages", "xoPanSpeed"],
            types: {
              xoSpeed: "number",
              xoImages: "string",
              xoPanSpeed: "number",
            },
          });
          return { ...Qo.defaultOptions, ...t };
        });
        o(this, "listener", () => {
          const { loading: t } = this.store.getState();
          t || (x.set(this, "xo-loading", !1), this.appendImage());
        });
        o(this, "appendImage", () => {
          const { index: t, images: e } = this.store.getState(),
            s = this.querySelector(c.Xo360ViewerContent);
          s &&
            ((this.image.src = e[t]),
            (this.image.alt = ""),
            s.firstChild || s.appendChild(this.image));
        });
        o(this, "handleNext", () => {
          this.store.increment();
        });
        o(this, "handlePrev", () => {
          this.store.decrement();
        });
        o(this, "handleFrameUpdate", () => {
          const { xoSpeed: t } = this.getOptions();
          Date.now() - this.start > eu / t &&
            (this.store.increment(), (this.start = Date.now()));
        });
        o(this, "handlePlay", () => {
          this.stopAnimated(),
            x.set(this, "xo-playing", !0),
            K.add(this.handleFrameUpdate, !0);
        });
        o(this, "handlePause", () => {
          x.set(this, "xo-playing", !1), K.remove(this.handleFrameUpdate);
        });
        o(this, "bindEvents", () => {
          var s, n, a, l;
          const { xoPanSpeed: t } = this.getOptions();
          (s = this.nextEl) == null ||
            s.addEventListener("click", this.handleNext),
            (n = this.prevEl) == null ||
              n.addEventListener("click", this.handlePrev),
            (a = this.playEl) == null ||
              a.addEventListener("click", this.handlePlay),
            (l = this.pauseEl) == null ||
              l.addEventListener("click", this.handlePause);
          const e = this.querySelector(c.Xo360ViewerContent);
          this.pan = Kt({
            element: e,
            onStart: () => {
              this.stopAnimated();
            },
            onMove: ({ dx: d }) => {
              Date.now() - this.start > su / t &&
                (d > this.prevDx
                  ? this.store.decrement()
                  : d < this.prevDx && this.store.increment(),
                (this.prevDx = d),
                (this.start = Date.now()));
            },
            onEnd: ({ vx: d }) => {
              const { index: h } = this.store.getState(),
                { setIndexWrapAroundRange: u } = this.store;
              this.stopAnimated = this.animated({
                from: h,
                to: h - d,
                duration: iu,
                easing: R.easeOutExpo,
                onUpdate: u,
              });
            },
          });
        });
        o(this, "initial", () => {
          (this.nextEl = this.querySelector(c.Xo360ViewerNext)),
            (this.prevEl = this.querySelector(c.Xo360ViewerPrev)),
            (this.playEl = this.querySelector(c.Xo360ViewerPlay)),
            (this.pauseEl = this.querySelector(c.Xo360ViewerPause)),
            (this.store = new tu(0)),
            (this.pan = null),
            x.set(this, "xo-loading", !0);
        });
        o(this, "renderContent", () => {
          const t = `<${c.Xo360ViewerContent}></${c.Xo360ViewerContent}>`;
          this.insertAdjacentHTML("afterbegin", t);
        });
        o(this, "loadImages", async () => {
          const { xoImages: t } = this.getOptions(),
            { imagesRequest: e } = this.store;
          await e(t), this.removeAttribute("xo-images");
        });
      }
      connectedCallback() {
        this.initial(),
          this.loadImages(),
          this.renderContent(),
          this.bindEvents(),
          (this.unsubscribe = this.store.subscribe(this.listener));
      }
      disconnectedCallback() {
        var t;
        this.unsubscribe(), (t = this.pan) == null || t.destroy();
      }
    };
  let js = Qo;
  o(js, "defaultOptions", { xoSpeed: 10, xoImages: "", xoPanSpeed: 10 });
  const Cp = "";
  _({ [c.Xo360Viewer]: js });
  const ou = 1200,
    nu = 30,
    ru = 0.3;
  let Br =
    ((fi = class extends q {
      constructor() {
        super(...arguments);
        o(this, "innerEl", this.children[0]);
        o(this, "animated", W());
        o(this, "pan", null);
        o(this, "nextEl", this.querySelector(c.ScrollCarouselNext));
        o(this, "prevEl", this.querySelector(c.ScrollCarouselPrev));
        o(this, "anchorEls", Array.from(this.querySelectorAll("a")));
        o(this, "isPanMove", !1);
        o(this, "stopAnimated", () => {});
        o(this, "state", { isDragging: !1, x: 0, navTarget: !1 });
        o(this, "getDirConstant", () => {
          const { xoRtl: t } = this.props;
          return t ? -1 : 1;
        });
        o(this, "endX", () => {
          const { xoGap: t } = this.props;
          return (
            (this.offsetWidth - this.innerEl.scrollWidth + t) *
            this.getDirConstant()
          );
        });
        o(this, "getValue", (t, e = !0) => {
          const { xoRtl: s } = this.props,
            n = s ? 0 : this.endX(),
            a = s ? this.endX() : 0;
          return e ? mn(n, a, t, ru) : Z(t, n, a);
        });
        o(this, "handlePanStart", (t) => {
          var e, s;
          (((e = this.nextEl) == null ? void 0 : e.contains(t.target)) ||
            ((s = this.prevEl) == null ? void 0 : s.contains(t.target))) &&
            this.setState({ navTarget: !0 }),
            (this.isPanMove = !1),
            this.stopAnimated();
        });
        o(this, "handlePanMove", ({ dx: t, isHorizontalSwipe: e }, s) => {
          const { isHorizontalSwipeState: n } = this.state;
          if (
            (n == null && this.setState({ isHorizontalSwipeState: e }),
            j.any ? this.state.isHorizontalSwipeState : !0)
          ) {
            s.preventDefault(), (this.isPanMove = !0);
            const l = this.getValue(t);
            this.setState({ x: l, isDragging: !0 });
          }
        });
        o(this, "handlePanEnd", ({ dx: t, vx: e }) => {
          const { isDragging: s, navTarget: n } = this.state;
          s &&
            (n || this.setState({ isDragging: !1 }),
            (this.stopAnimated = this.animated({
              from: t,
              to: this.getValue(t + e * nu, !1),
              duration: ou,
              easing: R.easeOutExpo,
              onUpdate: (a) => {
                var d;
                const l = this.getValue(a);
                this.setState({ x: l }),
                  (d = this.pan) == null || d.setValue({ dx: l });
              },
            }))),
            this.setState({ isHorizontalSwipeState: void 0, navTarget: !1 });
        });
        o(this, "handleWheel", (t) => {
          var l;
          const { deltaX: e, deltaY: s } = t;
          if (s) return;
          t.preventDefault();
          const { x: n } = this.state,
            a = Math.round(this.getValue(n - e + (e > 0 ? 1 : -1)));
          this.stopAnimated(),
            this.setState({ x: a }),
            (l = this.pan) == null || l.setValue({ dx: a });
        });
        o(this, "getFirstLastEls", () => {
          const t = Array.from(this.innerEl.children);
          let e = t.filter((s) => {
            const { left: n } = Y(s),
              a = n + s.offsetWidth;
            return n >= 0 && a < window.innerWidth;
          });
          return (
            e.length === 0 &&
              (e = t.filter((s) => {
                const n = s.getBoundingClientRect();
                return n.left + n.width >= 0 && n.left <= window.innerWidth;
              })),
            {
              firstEl: (e.length === 1 && e[0].previousElementSibling) || e[0],
              lastEl: e[e.length - 1],
            }
          );
        });
        o(this, "handleGo", (t) => {
          const { xoSpeed: e, xoEasing: s } = this.props,
            { x: n } = this.state;
          (this.stopAnimated = this.animated({
            from: n,
            to: this.getValue(t, !1),
            duration: e,
            easing: R[s],
            onUpdate: (a) => {
              var d;
              const l = this.getValue(a);
              this.setState({ x: l, navTarget: !1 }),
                (d = this.pan) == null || d.setValue({ dx: l });
            },
          })),
            this.setState({ isHorizontalSwipeState: void 0 });
        });
        o(this, "handleNext", (t) => {
          t.preventDefault();
          const { xoRtl: e } = this.props,
            { x: s, isDragging: n } = this.state;
          if ((this.setState({ isDragging: !1 }), n)) return;
          const { lastEl: a } = this.getFirstLastEls(),
            l = this.offsetWidth - a.offsetLeft,
            d = -(a.offsetLeft + a.offsetWidth),
            h = e ? l : d;
          s !== this.endX() &&
            (h === s
              ? this.handleGo(s - this.offsetWidth * this.getDirConstant())
              : this.handleGo(h));
        });
        o(this, "handlePrev", (t) => {
          t.preventDefault();
          const { xoGap: e, xoRtl: s } = this.props,
            { x: n, isDragging: a } = this.state;
          if ((this.setState({ isDragging: !1 }), a)) return;
          const { firstEl: l } = this.getFirstLastEls(),
            d = (l.offsetLeft + e) * -1,
            h = (l.offsetLeft + l.offsetWidth - this.offsetWidth - e) * -1,
            u = s ? d : h;
          n !== 0 &&
            (u === n
              ? this.handleGo(n + this.offsetWidth * this.getDirConstant())
              : this.handleGo(u));
        });
        o(this, "handleAnchor", (t) => {
          this.isPanMove && t.preventDefault();
        });
        o(this, "bindAnchor", () => {
          v(this.anchorEls, (t) => {
            t.addEventListener("click", this.handleAnchor);
          });
        });
        o(this, "unbindAnchor", () => {
          v(this.anchorEls, (t) => {
            t.removeEventListener("click", this.handleAnchor);
          });
        });
        o(this, "updateUI", () => {
          const { x: t } = this.state;
          (this.innerEl.style.transform = `translate3d(${t}px, 0, 0)`),
            this.nextEl && x.set(this.nextEl, "xo-disabled", t >= 0),
            this.prevEl && x.set(this.prevEl, "xo-disabled", t <= this.endX());
        });
      }
      mount() {
        var e, s;
        const { xoGap: t } = this.props;
        !this.innerEl ||
          (this.updateUI(),
          this.innerEl.style.setProperty("--xo-gap", `${t}px`),
          this.bindAnchor(),
          (this.pan = Kt({
            element: this,
            onStart: this.handlePanStart,
            onMove: this.handlePanMove,
            onEnd: this.handlePanEnd,
          })),
          this.addEventListener("wheel", this.handleWheel),
          (e = this.nextEl) == null ||
            e.addEventListener("click", this.handleNext),
          (s = this.prevEl) == null ||
            s.addEventListener("click", this.handlePrev));
      }
      stateUpdate() {
        this.updateUI();
      }
      unmount() {
        var t, e, s;
        (t = this.pan) == null || t.destroy(),
          this.stopAnimated(),
          this.unbindAnchor(),
          this.removeEventListener("wheel", this.handleWheel),
          (e = this.nextEl) == null ||
            e.removeEventListener("click", this.handleNext),
          (s = this.prevEl) == null ||
            s.removeEventListener("click", this.handlePrev);
      }
    }),
    o(fi, "propTypes", {
      xoSpeed: "number",
      xoGap: "number",
      xoEasing: "string",
      xoRtl: "boolean",
    }),
    o(fi, "defaultProps", {
      xoSpeed: 200,
      xoEasing: "ease",
      xoGap: 30,
      xoRtl: getComputedStyle(document.documentElement).direction === "rtl",
    }),
    fi);
  Br = X([U(c.ScrollCarousel)], Br);
  const Sp = "",
    au = "cubic-bezier(.29,.99,.53,.88)";
  let zr =
    ((xi = class extends q {
      constructor() {
        super(...arguments);
        o(this, "handleMouseMove", (t) => {
          const { xoDuration: e, xoRadius: s, xoRadiusMove: n } = this.props,
            a = this.querySelector(c.MagneticContent),
            {
              top: l,
              left: d,
              width: h,
              height: u,
            } = this.getBoundingClientRect(),
            p = d + h / 2,
            m = l + u / 2,
            f = Math.max(p - t.clientX, 0),
            b = Math.max(t.clientX - p, 0),
            y = Math.max(m - t.clientY, 0),
            E = Math.max(t.clientY - m, 0),
            C = s,
            S = 1.3,
            k = n || C;
          if (!!a)
            if (this.checkCircle(t.clientX, t.clientY, p, m, C)) {
              const $ = Math.abs(t.clientX) - p,
                L = Math.abs(t.clientY) - m,
                Q = Math.sqrt(Math.pow($, 2) + Math.pow(L, 2));
              let st = 0,
                lt = 0;
              f > 0 ? (st = f / -S) : b > 0 && (st = b / S),
                y > 0 ? (lt = y / -S) : E > 0 && (lt = E / S),
                (st = st / ((Q / C) * (C / k) + 0.5)),
                (lt = lt / ((Q / C) * (C / k) + 0.5)),
                x.set(this, "xo-active", !0),
                (a.style.transition = `${e}ms ${au}`),
                (a.style.transform = `translate(${st}px, ${lt}px)`);
            } else
              x.set(this, "xo-active", !1),
                (a.style.transform = "translate(0, 0)");
        });
        o(this, "getContainerEl", () => {
          var s;
          const { xoTarget: t } = this.props,
            e = this.closest(".shopify-section") || document.body;
          return t && (s = this.closest(t)) != null ? s : e;
        });
      }
      checkCircle(t, e, s, n, a) {
        return Math.pow(t - s, 2) + Math.pow(e - n, 2) <= Math.pow(a, 2);
      }
      mount() {
        this.getContainerEl().addEventListener(
          "mousemove",
          this.handleMouseMove
        );
      }
      unmount() {
        this.getContainerEl().removeEventListener(
          "mousemove",
          this.handleMouseMove
        );
      }
    }),
    o(xi, "propTypes", {
      xoDuration: "number",
      xoRadius: "number",
      xoRadiusMove: "number",
      xoTarget: "string",
    }),
    o(xi, "defaultProps", { xoDuration: 600, xoRadius: 100 }),
    xi);
  zr = X([U(c.Magnetic)], zr);
  const Pp = "";
  function lu(r, i, t, e, s, n = 0.5) {
    const a = r.map((d, h) => {
      const u = (h / e) * i,
        p = t - (d / s) * t;
      return { x: u, y: p };
    });
    let l = `M ${a[0].x} ${a[0].y}`;
    for (let d = 0; d < a.length - 1; d++) {
      const h = a[d - 1] || a[d],
        u = a[d],
        p = a[d + 1],
        m = a[d + 2] || a[d + 1],
        f = u.x + ((p.x - h.x) * n) / 6,
        b = u.y + ((p.y - h.y) * n) / 6,
        y = p.x - ((m.x - u.x) * n) / 6,
        E = p.y - ((m.y - u.y) * n) / 6;
      l += ` C ${f} ${b}, ${y} ${E}, ${p.x} ${p.y}`;
    }
    return { path: l, points: a };
  }
  const cu = 400;
  let _r =
    ((Ve = class extends q {
      constructor() {
        super(...arguments);
        o(this, "observer", null);
        o(this, "resizeObserver", null);
        o(this, "prevWidth", 0);
        o(this, "getAnimateEl", () => this.closest(c.Animate));
        o(this, "getChartDimensions", () => {
          const { xoMargin: t } = this.props,
            e = this.offsetHeight - t * 2,
            s = this.offsetWidth - t * 2;
          return { chartHeight: e, chartWidth: s };
        });
        o(this, "renderXLabels", () => {
          const { xoXLabels: t } = this.props,
            { chartHeight: e, chartWidth: s } = this.getChartDimensions();
          return t
            .map(
              (n, a) => `
        <text x="${(a / (t.length - 1)) * s}" y="${
                e + 20
              }" text-anchor="middle" font-size="12">${n}</text>
      `
            )
            .join("");
        });
        o(this, "renderYLabels", () => {
          const { xoYLabels: t } = this.props,
            { chartHeight: e } = this.getChartDimensions();
          return t
            .map(
              (s, n) => `
        <text x="-10" y="${
          e - (n / (t.length - 1)) * e
        }" text-anchor="end" dominant-baseline="middle" font-size="12">${s}</text>
      `
            )
            .join("");
        });
        o(this, "renderGridLines", () => {
          const {
              xoGridColor: t,
              xoGridType: e,
              xoXLabels: s,
              xoYLabels: n,
            } = this.props,
            { chartWidth: a, chartHeight: l } = this.getChartDimensions();
          return [
            ...s.map((d, h) => {
              const u = (h / (s.length - 1)) * a;
              return `
          <line x1="${u}" y1="0" x2="${u}" y2="${l}" stroke="${t}" stroke-width="1"${
                e === "dashed" ? ' stroke-dasharray="5,5"' : ""
              }></line>
        `;
            }),
            ...n.map((d, h) => {
              const u = (h / (n.length - 1)) * l;
              return `
          <line x1="0" y1="${u}" x2="${a}" y2="${u}" stroke="${t}" stroke-width="1"${
                e === "dashed" ? ' stroke-dasharray="5,5"' : ""
              }></line>
        `;
            }),
          ].join("");
        });
        o(this, "renderPoints", (t, e, s, n, a) =>
          e
            ? t
                .map(
                  (l) =>
                    `<circle cx="${l.x}" cy="${l.y}" r="${n}" fill="${s}"${
                      a && this.getAnimateEl()
                        ? ' style="transition: 1s ease 0.2s; opacity: 0;"'
                        : ""
                    }></circle>`
                )
                .join("")
            : ""
        );
        o(this, "renderLines", (t) => {
          const {
              xoDatasets: e,
              xoMax: s,
              xoYLabels: n,
              xoXLabels: a,
              xoSmoothness: l,
            } = this.props,
            { chartWidth: d, chartHeight: h } = this.getChartDimensions();
          return e
            .map((u) => {
              const {
                  data: p,
                  lineColor: m = "#3438fb",
                  lineWidth: f = 2,
                  lineCap: b = "square",
                  dotEnabled: y = !0,
                  dotColor: E,
                  dotSize: C = 4,
                } = u,
                S = a.length - 1,
                k = s != null ? s : Math.max(...n.map(Number)),
                { path: $, points: L } = lu(p, d, h, S, k, Z(l, 0, 1));
              return `
          <path d="${$}" fill="none" stroke="${m}" stroke-width="${f}" stroke-linecap="${b}"></path>
          ${this.renderPoints(L, y, E || m, C, t)}
        `;
            })
            .join("");
        });
        o(this, "renderChart", (t) => {
          const { xoMargin: e } = this.props,
            { chartWidth: s, chartHeight: n } = this.getChartDimensions();
          return `
      <svg width="${s + e * 2}" height="${
            n + e * 2
          }" version="1.1" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle">
        <g transform="translate(${e}, ${e})">
          ${this.renderXLabels()}
          ${this.renderYLabels()}
          ${this.renderGridLines()}
          ${this.renderLines(t)}
        </g>
      </svg>
    `;
        });
        o(this, "handler", (t = !1) => {
          (this.innerHTML = this.renderChart(t)),
            t && this.handleAnimate(),
            (this.resizeObserver = new ResizeObserver(this.handleResize)),
            this.resizeObserver.observe(this);
        });
        o(
          this,
          "handleResize",
          rt((t) => {
            var e;
            for (let s of t) {
              const n = s.contentRect.width;
              n !== this.prevWidth &&
                (this.prevWidth !== 0 &&
                  ((this.innerHTML = ""),
                  (e = this.observer) == null || e.disconnect(),
                  this.handler()),
                (this.prevWidth = n));
            }
          }, cu)
        );
      }
      handleAnimate() {
        const t = Array.from(this.querySelectorAll("path")),
          e = Array.from(this.querySelectorAll("circle"));
        this.getAnimateEl() &&
          (v(t, (n) => {
            const a = n.getTotalLength();
            n.setAttribute("stroke-dashoffset", String(a)),
              n.setAttribute("stroke-dasharray", String(a)),
              n.setAttribute("xo-next-stroke-dashoffset", "0");
          }),
          (this.observer = new MutationObserver((n) => {
            v(n, (a) => {
              var d;
              const l = a.target.getAttribute("stroke-dashoffset");
              (l === "0" || !l) &&
                (v(e, (h) => {
                  h.style.opacity = "1";
                }),
                (d = this.observer) == null || d.disconnect());
            });
          })),
          this.observer.observe(t[0], {
            attributes: !0,
            attributeFilter: ["stroke-dashoffset"],
          }));
      }
      destroy() {
        var t, e;
        (this.innerHTML = ""),
          (t = this.observer) == null || t.disconnect(),
          (e = this.resizeObserver) == null || e.disconnect();
      }
      mount() {
        this.handler(!0);
      }
      unmount() {
        this.destroy();
      }
      propUpdate({ prevProp: t, nextProp: e }) {
        t != null && t !== e && (this.destroy(), this.handler());
      }
    }),
    o(Ve, "propTypes", {
      xoXLabels: "array",
      xoYLabels: "array",
      xoMax: "number",
      xoDatasets: "array",
      xoGridColor: "string",
      xoGridType: "string",
      xoMargin: "number",
      xoSmoothness: "number",
    }),
    o(Ve, "defaultProps", {
      xoXLabels: [],
      xoYLabels: [],
      xoDatasets: [],
      xoGridColor: "#ddd",
      xoGridType: "dashed",
      xoMargin: 40,
      xoSmoothness: 1,
    }),
    o(Ve, "observedProps", [
      "xoXLabels",
      "xoYLabels",
      "xoDatasets",
      "xoMax",
      "xoGridColor",
      "xoGridType",
      "xoMargin",
    ]),
    Ve);
  _r = X([U(c.LineChart)], _r);
  const Ap = "";
  let Wr =
    ((gi = class extends q {
      constructor() {
        super(...arguments);
        o(this, "timeId", -1);
        o(this, "resizeObserver", null);
        o(this, "prevWidth", 0);
        o(
          this,
          "itemEls",
          Array.from(
            this.querySelectorAll(
              `:scope > ${c.ScrollSceneInner} > ${c.ScrollSceneItem}`
            )
          )
        );
        o(this, "state", { activeIndex: 0 });
        o(this, "getThreshold", () => {
          const { xoThreshold: t } = this.props;
          return /Mac/.test(navigator.userAgent) ? t + 0.3 : t;
        });
        o(this, "handleScroll", () => {
          const t = this.getThreshold(),
            { top: e } = this.getBoundingClientRect(),
            s = Math.trunc((e * -1) / (window.innerHeight * t)),
            n = Z(s, 0, this.itemEls.length - 1);
          this.setState({ activeIndex: n });
        });
        o(this, "updateUI", () => {
          var a, l;
          const { activeIndex: t } = this.state,
            e = this.itemEls[t],
            s = (a = this.itemEls) == null ? void 0 : a[t - 1],
            n = (l = this.itemEls) == null ? void 0 : l[t + 1];
          v(this.itemEls, (d) => {
            x.set(d, "xo-active", !1),
              x.set(d, "xo-prev", !1),
              x.set(d, "xo-next", !1);
          }),
            e && x.set(e, "xo-active", !0),
            s && x.set(s, "xo-prev", !0),
            n && x.set(n, "xo-next", !0);
        });
        o(
          this,
          "handleResize",
          rt((t) => {
            for (let e of t) {
              const s = e.contentRect.width;
              if (s !== this.prevWidth) {
                const { xoMobileDisabled: n, xoMobileBreakpoint: a } =
                  this.props;
                if (n && window.innerWidth < a)
                  this.style.removeProperty("height"),
                    window.removeEventListener("scroll", this.handleScroll);
                else {
                  const d = this.getThreshold();
                  window.addEventListener("scroll", this.handleScroll),
                    (this.style.height = `${
                      100 * (this.itemEls.length + 1 / d) * d
                    }vh`);
                }
                this.prevWidth = s;
              }
            }
          }, 400)
        );
      }
      setActive(t) {
        this.setState({ activeIndex: t });
      }
      mount() {
        if (this.itemEls.length <= 1) return;
        this.updateUI();
        const t = this.getThreshold();
        window.addEventListener("scroll", this.handleScroll),
          (this.style.height = `${100 * (this.itemEls.length + 1 / t) * t}vh`),
          (this.resizeObserver = new ResizeObserver(this.handleResize)),
          this.resizeObserver.observe(this);
      }
      stateUpdate(t) {
        const { activeIndex: e } = this.state;
        t.activeIndex !== e &&
          (this.updateUI(),
          this.emit("xo:scroll-scene:change", {
            bubbles: !0,
            detail: { activeIndex: e },
          }));
      }
      unmount() {
        var t;
        clearTimeout(this.timeId),
          window.removeEventListener("scroll", this.handleScroll),
          (t = this.resizeObserver) == null || t.disconnect();
      }
    }),
    o(gi, "propTypes", {
      xoThreshold: "number",
      xoMobileDisabled: "boolean",
      xoMobileBreakpoint: "number",
    }),
    o(gi, "defaultProps", {
      xoThreshold: 0.5,
      xoMobileDisabled: !1,
      xoMobileBreakpoint: 0,
    }),
    gi);
  Wr = X([U(c.ScrollScene)], Wr);
  const Tp = "";
  async function Ur(r, i) {
    const e = await (await fetch(`/collections/${r}?section_id=${i}`)).text(),
      s = new DOMParser().parseFromString(e, "text/html");
    return Array.from(s.querySelectorAll(c.CollectionTabsContent)).map((a) => {
      var l;
      return (l = a == null ? void 0 : a.innerHTML.trim()) != null ? l : "";
    });
  }
  let Xr =
    ((bi = class extends q {
      constructor() {
        super(...arguments);
        o(this, "intersectionObserver", null);
        o(this, "cache", new Map());
        o(this, "state", { isLoading: !1, contents: [] });
        o(this, "handleRequest", async (t) => {
          if (this.cache.has(t)) {
            await T(), this.setState({ contents: this.cache.get(t) });
            return;
          }
          try {
            const { xoSectionId: e } = this.props;
            this.setState({ isLoading: !0 });
            const s = await Ur(t, e);
            this.setState({ contents: s }), s && this.cache.set(t, s);
          } catch (e) {
            console.error(e);
          } finally {
            this.setState({ isLoading: !1 });
          }
        });
        o(this, "handleClick", (t) => {
          const { xoSectionId: e } = this.props,
            n = t.target.closest(
              `${c.CollectionTabs}[xo-section-id="${e}"] ${c.CollectionTabsTrigger}`
            ),
            a = Array.from(this.querySelectorAll(c.CollectionTabsTrigger));
          if (n) {
            const l = n.getAttribute("xo-handle");
            l &&
              (v(a, (d) => {
                x.set(d, "xo-active", !1);
              }),
              x.set(n, "xo-active", !0),
              this.handleRequest(l));
          }
        });
        o(this, "handleInit", async () => {
          var a;
          const e =
              (a = Array.from(
                this.querySelectorAll(c.CollectionTabsTrigger)
              ).find((l) => x.get(l, "xo-active"))) == null
                ? void 0
                : a.getAttribute("xo-handle"),
            n = Array.from(this.querySelectorAll(c.CollectionTabsContent)).map(
              (l) => {
                var d;
                return (d = l == null ? void 0 : l.innerHTML.trim()) != null
                  ? d
                  : "";
              }
            );
          e && n && this.cache.set(e, n);
        });
        o(this, "handleIntersection", async (t, e) => {
          try {
            if (!t[0].isIntersecting) return;
            e.unobserve(this);
            const { xoSectionId: s } = this.props,
              n = Array.from(this.querySelectorAll(c.CollectionTabsTrigger));
            v(n, async (a, l) => {
              if (l >= 10) return;
              const d = a.getAttribute("xo-handle"),
                h = x.get(a, "xo-active");
              if (d && !h && !this.cache.has(d)) {
                const u = await Ur(d, s);
                this.cache.set(d, u);
              }
            });
          } catch (s) {
            console.error(s);
          }
        });
      }
      mount() {
        this.handleInit(),
          window.Shopify.designMode ||
            ((this.intersectionObserver = new IntersectionObserver(
              this.handleIntersection,
              { rootMargin: "0px 0px 400px 0px" }
            )),
            this.intersectionObserver.observe(this)),
          document.addEventListener("click", this.handleClick);
      }
      stateUpdate(t) {
        const { isLoading: e, contents: s } = this.state;
        this.setProps({ xoLoading: e });
        const n = Array.from(this.querySelectorAll(c.CollectionTabsContent));
        v(n, (a, l) => {
          var u;
          const d = s[l];
          ((u = t.contents) == null ? void 0 : u[l]) !== d &&
            (a == null ? void 0 : a.innerHTML) !== d &&
            (a.innerHTML = d);
        });
      }
      unmount() {
        var t;
        (t = this.intersectionObserver) == null || t.disconnect(),
          document.removeEventListener("click", this.handleClick);
      }
    }),
    o(bi, "propTypes", { xoSectionId: "string" }),
    o(bi, "defaultProps", {}),
    bi);
  Xr = X([U(c.CollectionTabs)], Xr);
  const kp = "",
    $p = "",
    fo = {};
  let Oe = 0;
  const Qs = {};
  function du(r, i) {
    Oe === 0 &&
      window.addEventListener(
        "message",
        (s) => {
          if (!(s.origin !== "https://www.youtube.com" || !s.data))
            try {
              const n = JSON.parse(s.data);
              if (((Qs[n.id] = !0), n.event !== "onStateChange")) return;
              const a = fo[n.id];
              a == null || a(n);
            } catch (n) {
              console.error("Failed to parse message data", n);
            }
        },
        !0
      ),
      Oe++,
      (fo[Oe] = i),
      (Qs[Oe] = !1);
    const t = Oe,
      e = () => {
        [
          { event: "listening", id: t, channel: "widget" },
          {
            event: "command",
            func: "addEventListener",
            args: ["onStateChange"],
            id: t,
            channel: "widget",
          },
        ].forEach((n) => {
          var a;
          (a = r.contentWindow) == null ||
            a.postMessage(JSON.stringify(n), "https://www.youtube.com");
        });
      };
    return (
      r.addEventListener(
        "load",
        () => {
          let s = 0;
          const n = () => {
            Qs[t] ||
              (s++, s < 100 ? e() : console.warn(`Unable to subscribe ${t}`));
          };
          e(), setTimeout(n, 100);
        },
        !0
      ),
      () => {
        delete fo[t], delete Qs[t];
      }
    );
  }
  function hu(r, i) {
    window.addEventListener("message", (t) => {
      var e;
      t.origin !== "https://player.vimeo.com" ||
        r.contentWindow !== t.source ||
        (typeof t.data == "string" &&
          t.data.includes("ready") &&
          ((e = r.contentWindow) == null ||
            e.postMessage(
              { method: "addEventListener", value: "play" },
              "https://player.vimeo.com"
            )),
        t.data.event === "play" && i());
    });
  }
  let Yr =
    ((yi = class extends q {
      constructor() {
        super(...arguments);
        o(this, "intersectionObserver", null);
        o(this, "getAutoplay", (t) =>
          t
            ? t.tagName === "VIDEO"
              ? t.autoplay
              : t.tagName === "IFRAME"
              ? t.src.includes("autoplay=1")
              : !1
            : !1
        );
        o(this, "handleIntersection", (t) => {
          const { xoThreshold: e } = this.props;
          t.forEach((s) => {
            const n = s.target.querySelector("video, iframe");
            s.isIntersecting && s.intersectionRatio >= e
              ? this.getAutoplay(n) && ll(n)
              : yn(n);
          });
        });
        o(this, "handlePauseAll", () => {
          const t = this.querySelector("video, iframe"),
            e = Array.from(
              document.querySelectorAll(
                `${c.IntersectionVideo} video, ${c.IntersectionVideo} iframe`
              )
            );
          v(e, (s) => {
            s !== t && yn(s);
          });
        });
      }
      async mount() {
        const { xoThreshold: t } = this.props;
        (this.intersectionObserver = new IntersectionObserver(
          this.handleIntersection,
          { threshold: t }
        )),
          this.intersectionObserver.observe(this);
        const e = this.querySelector("video, iframe");
        Ze(e.src)
          ? du(e, (s) => {
              s.info === 1 && this.handlePauseAll();
            })
          : Ke(e.src)
          ? hu(e, () => {
              this.handlePauseAll();
            })
          : e == null ||
            e.addEventListener("play", () => {
              this.handlePauseAll();
            });
      }
      unmount() {
        var t;
        (t = this.intersectionObserver) == null || t.disconnect();
      }
    }),
    o(yi, "propTypes", { xoThreshold: "number" }),
    o(yi, "defaultProps", { xoThreshold: 0.75 }),
    yi);
  Yr = X([U(c.IntersectionVideo)], Yr);
  function uu() {
    g.create("xo-viewed-products", { initialState: [], useStorage: !0 }),
      g.create("xo-compare-products", { initialState: [], useStorage: !0 }),
      g.create("xo-wishlist-products", { initialState: [], useStorage: !0 }),
      g.create("xo-bundle-products", { initialState: {} }),
      g.create("xo-viewed-products-limit", { initialState: 50 }),
      g.create("xo-compare-products-limit", { initialState: 4 }),
      g.create("xo-wishlist-products-limit", { initialState: 1 / 0 }),
      g.create("xo-bundle-products-limit", { initialState: {} });
  }
  function xo(r, i) {
    if (r === "viewed")
      g.set("xo-viewed-products", (t) => {
        const e = g.get("xo-viewed-products-limit"),
          s = t.length >= e;
        return t.includes(i)
          ? t
          : [i, ...(s ? t.filter((n, a) => a < t.length - 1) : t)];
      });
    else if (r === "bundle") {
      const t = ut(this);
      g.set("xo-bundle-products", (e) => {
        var a, l;
        if ((a = e[t]) != null && a.includes(i))
          return { ...e, [t]: (e[t] || []).filter((d) => d !== i) };
        const s = (l = g.get("xo-bundle-products-limit")[t]) != null ? l : 3;
        return (e[t] || []).length >= s
          ? e
          : { ...e, [t]: [...(e[t] || []), i] };
      });
    } else
      g.set(`xo-${r}-products`, (t) => {
        if (t.includes(i)) return t.filter((n) => n !== i);
        const e = g.get(`xo-${r}-products-limit`);
        return t.length >= e ? t : [...t, i];
      });
  }
  function Gr(r, i) {
    if (r === "bundle") {
      const t = ut(this);
      g.set("xo-bundle-products", (e) => ({
        ...e,
        [t]: (e[t] || []).filter((s) => s !== i),
      }));
    } else g.set(`xo-${r}-products`, (t) => t.filter((e) => e !== i));
  }
  function pu(r) {
    if (r === "bundle") {
      const i = ut(this);
      g.set("xo-bundle-products", (t) => ({ ...t, [i]: [] }));
    } else g.set(`xo-${r}-products`, []);
  }
  function mu(r, i) {
    if (r === "bundle") {
      const t = ut(this);
      g.set("xo-bundle-products-limit", (e) => ({ ...e, [t]: i }));
    } else g.set(`xo-${r}-products-limit`, i);
  }
  function go(r, i, t) {
    if (t === 1 / 0) return r;
    const e = (i - 1) * t,
      s = e + t;
    return r.slice(e, s);
  }
  function Zs() {
    var i, t;
    return (t =
      (i = yt.parse(window.location.search, !0)) == null ? void 0 : i.page) !=
      null
      ? t
      : 1;
  }
  async function jr(r, i, t) {
    let e = 1;
    const s = Zs();
    t === 1 / 0 && (e = s);
    const n = go(i, s, t).reduce(
      (d, h, u) => d + `${u === 0 ? "" : " OR "}id:${h}`,
      `section_id=${r}&page=${e}&type=product&q=`
    );
    return await (await fetch(`/search?${n}`)).text();
  }
  async function fu(r, i) {
    return jr(r, i, 1 / 0);
  }
  const Ks = c.ProductsFetcher + "-order",
    xu = c.ProductsFetcher + "-scroll";
  let Qr =
    ((vi = class extends q {
      constructor() {
        super(...arguments);
        o(this, "state", { ids: [], ready: !1 });
        o(this, "intersectionObserver", null);
        o(this, "scrollEl", this.querySelector(`[${xu}]`));
        o(this, "st", 0);
        o(this, "unsubscribe", () => {});
        o(this, "removeAnimate", (t) => {
          const e = Array.from(t.querySelectorAll('[xo-animate="scroll"]')),
            s = Array.from(t.querySelectorAll(c.Animate));
          return (
            v(e, (n) => {
              n.setAttribute("xo-animate", "none");
            }),
            v(s, (n) => {
              x.set(n, "xo-disabled", !0);
            }),
            t
          );
        });
        o(this, "renderContent", async () => {
          var t, e;
          try {
            const { xoType: s, xoName: n, xoPageLimit: a } = this.props,
              l = ut(this),
              { ids: d } = this.state,
              h = await jr(l, d, a);
            let u = new DOMParser().parseFromString(h, "text/html");
            u = this.removeAnimate(u);
            const p =
              (e =
                (t = u.querySelector(
                  `${c.ProductsFetcher}[xo-type="${s}"]${
                    n ? `[xo-name="${n}"]` : ""
                  }`
                )) == null
                  ? void 0
                  : t.innerHTML.trim()) != null
                ? e
                : "";
            this.innerHTML !== p &&
              ((this.innerHTML = p),
              this.handleOrder(),
              this.scrollEl && (this.scrollEl.scrollTop = this.st)),
              this.setProps({ xoLoading: !1 });
          } catch {
            this.setProps({ xoLoading: !1 });
          }
        });
        o(this, "handleIntersection", (t) => {
          t[0].isIntersecting &&
            !this.state.ready &&
            this.setState({ ready: !0 });
        });
        o(this, "handleOrder", () => {
          const { ids: t } = this.state;
          v(t, (e, s) => {
            var a;
            const n = this.querySelector(`[${Ks}="${e}"]`);
            (a = n == null ? void 0 : n.style) == null ||
              a.setProperty("order", `${s + 1}`);
          });
        });
        o(this, "handleScroll", () => {
          var t, e;
          this.st =
            (e = (t = this.scrollEl) == null ? void 0 : t.scrollTop) != null
              ? e
              : this.st;
        });
        o(this, "autoPrev", () => {
          const t = Zs();
          if (t > 1) {
            const e = new URL(window.location.href);
            e.searchParams.set("page", `${t - 1}`),
              (window.location.href = e.href);
          }
        });
        o(this, "removeRedundant", () => {
          const { xoPageLimit: t, xoType: e } = this.props,
            { ids: s } = this.state,
            n = Zs(),
            a = go(s, n, t);
          if (!!!this.querySelector(`[${Ks}]`)) return;
          const d = Array.from(this.querySelectorAll(`[${Ks}]`)).map((u) =>
              u.getAttribute(Ks)
            ),
            h = a.filter((u) => !d.includes(u));
          h.length > 0 &&
            v(h, (u) => {
              Gr.call(this, e, u);
            });
        });
      }
      mount() {
        var n, a;
        const { xoType: t, xoLimit: e } = this.props,
          s = ut(this);
        !s ||
          (e != null && mu.call(this, t, e),
          t &&
            (this.setProps({ xoLoading: !0 }),
            (this.intersectionObserver = new IntersectionObserver(
              this.handleIntersection,
              { rootMargin: "0px 0px 400px 0px" }
            )),
            this.intersectionObserver.observe(
              (n = this.closest('[id^="shopify-section-template--"]')) != null
                ? n
                : this
            ),
            t === "bundle"
              ? (this.unsubscribe = g.subscribe("xo-bundle-products", (l) => {
                  var h;
                  const d = (h = l[s]) != null ? h : [];
                  this.setState({ ids: d });
                }))
              : (this.unsubscribe = g.subscribe(`xo-${t}-products`, (l) => {
                  this.setState({ ids: l });
                })),
            (a = this.scrollEl) == null ||
              a.addEventListener("scroll", this.handleScroll)));
      }
      async stateUpdate() {
        const { xoModalName: t, xoPageLimit: e } = this.props,
          { ids: s, ready: n } = this.state;
        if (!n) return;
        const a = Zs();
        go(s, a, e).length === 0
          ? (this.autoPrev(), this.setProps({ xoEmpty: !0 }), t && Ht.close(t))
          : (this.setProps({ xoEmpty: !1 }), t && Ht.open(t)),
          await this.renderContent(),
          this.removeRedundant();
      }
      unmount() {
        var t, e;
        this.unsubscribe(),
          (t = this.intersectionObserver) == null || t.disconnect(),
          (e = this.scrollEl) == null ||
            e.removeEventListener("scroll", this.handleScroll);
      }
    }),
    o(vi, "propTypes", {
      xoType: "string",
      xoEmpty: "boolean",
      xoLoading: "boolean",
      xoName: "string",
      xoModalName: "string",
      xoLimit: "number",
      xoPageLimit: "number",
    }),
    o(vi, "defaultProps", { xoEmpty: !1, xoLoading: !1, xoPageLimit: 1 / 0 }),
    vi);
  Qr = X([U(c.ProductsFetcher)], Qr);
  let Zr =
    ((Ei = class extends q {
      constructor() {
        super(...arguments);
        o(this, "state", { active: !1, limit: 0, size: 0 });
        o(this, "productEl", this.closest(c.Product));
        o(this, "unsubscribe", () => {});
        o(this, "unsubscribe2", () => {});
        o(this, "handleClick", () => {
          const { xoProductId: t } = this.productEl.options,
            { xoType: e } = this.props;
          xo.call(this, e, t);
        });
      }
      mount() {
        if (!this.productEl)
          throw new Error(`${c.ProductsFetcherAdd} must be in ${c.Product}`);
        const { xoType: t } = this.props;
        if (!t) return;
        const { xoProductId: e } = this.productEl.options,
          s = ut(this);
        this.addEventListener("click", this.handleClick),
          t === "bundle"
            ? ((this.unsubscribe = g.subscribe("xo-bundle-products", (n) => {
                var l;
                const a = (l = n[s]) != null ? l : [];
                this.setState({ active: a.includes(e), size: a.length });
              })),
              (this.unsubscribe2 = g.subscribe(
                "xo-bundle-products-limit",
                (n) => {
                  var l;
                  const a = (l = n[s]) != null ? l : 3;
                  this.setState({ limit: a });
                }
              )))
            : ((this.unsubscribe = g.subscribe(`xo-${t}-products`, (n) => {
                this.setState({ active: n.includes(e), size: n.length });
              })),
              (this.unsubscribe2 = g.subscribe(
                `xo-${t}-products-limit`,
                (n) => {
                  this.setState({ limit: n });
                }
              )));
      }
      stateUpdate(t) {
        const { active: e, limit: s, size: n } = this.state;
        t.active !== e && this.setProps({ xoAdded: e }),
          this.setProps({ xoLimited: n >= s });
      }
      unmount() {
        this.removeEventListener("click", this.handleClick),
          this.unsubscribe(),
          this.unsubscribe2();
      }
    }),
    o(Ei, "propTypes", {
      xoType: "string",
      xoAdded: "boolean",
      xoLimited: "boolean",
    }),
    o(Ei, "defaultProps", { xoAdded: !1, xoLimited: !1 }),
    Ei);
  Zr = X([U(c.ProductsFetcherAdd)], Zr);
  let Kr =
    ((wi = class extends q {
      constructor() {
        super(...arguments);
        o(this, "productEl", this.closest(c.Product));
        o(this, "handleClick", () => {
          const { xoType: t } = this.props,
            { xoProductId: e } = this.productEl.options;
          this.setProps({ xoLoading: !0 }), Gr.call(this, t, e);
        });
      }
      mount() {
        if (!this.productEl)
          throw new Error(`${c.ProductsFetcherRemove} must be in ${c.Product}`);
        const { xoType: t } = this.props;
        !t || this.addEventListener("click", this.handleClick);
      }
      unmount() {
        this.removeEventListener("click", this.handleClick);
      }
    }),
    o(wi, "propTypes", { xoType: "string", xoLoading: "boolean" }),
    o(wi, "defaultProps", {}),
    wi);
  Kr = X([U(c.ProductsFetcherRemove)], Kr);
  let Jr =
    ((Ci = class extends q {
      constructor() {
        super(...arguments);
        o(this, "unsubscribe", () => {});
        o(this, "handleClick", () => {
          const { xoType: t } = this.props;
          pu.call(this, t);
        });
      }
      mount() {
        const { xoType: t } = this.props;
        if (!t) return;
        const e = ut(this);
        this.addEventListener("click", this.handleClick),
          t === "bundle"
            ? (this.unsubscribe = g.subscribe("xo-bundle-products", (s) => {
                var a;
                const n = (a = s[e]) != null ? a : [];
                this.setProps({ xoEmpty: n.length === 0 });
              }))
            : (this.unsubscribe = g.subscribe(`xo-${t}-products`, (s) => {
                this.setProps({ xoEmpty: s.length === 0 });
              }));
      }
      unmount() {
        this.removeEventListener("click", this.handleClick), this.unsubscribe();
      }
    }),
    o(Ci, "propTypes", { xoType: "string", xoEmpty: "boolean" }),
    o(Ci, "defaultProps", { xoEmpty: !1 }),
    Ci);
  Jr = X([U(c.ProductsFetcherClear)], Jr);
  let ta =
    ((Si = class extends q {
      constructor() {
        super(...arguments);
        o(this, "unsubscribe", () => {});
      }
      mount() {
        const { xoType: t } = this.props;
        if (!t) return;
        const e = ut(this);
        t === "bundle"
          ? (this.unsubscribe = g.subscribe("xo-bundle-products", (s) => {
              var a;
              const n = (a = s[e]) != null ? a : [];
              (this.innerHTML = `${n.length}`),
                this.setProps({ xoEmpty: n.length === 0 });
            }))
          : (this.unsubscribe = g.subscribe(`xo-${t}-products`, (s) => {
              (this.innerHTML = `${s.length}`),
                this.setProps({ xoEmpty: s.length === 0 });
            }));
      }
      unmount() {
        this.unsubscribe();
      }
    }),
    o(Si, "propTypes", { xoType: "string", xoEmpty: "boolean" }),
    o(Si, "defaultProps", { xoEmpty: !1 }),
    Si);
  ta = X([U(c.ProductsFetcherSize)], ta);
  let ea =
    ((Pi = class extends q {
      constructor() {
        super(...arguments);
        o(this, "state", { ids: [] });
        o(this, "unsubscribe", () => {});
        o(this, "renderContent", async () => {
          var t, e;
          try {
            const s = ut(this),
              { ids: n } = this.state,
              a = await fu(s, n),
              d =
                (e =
                  (t = new DOMParser()
                    .parseFromString(a, "text/html")
                    .querySelector(c.ProductsFetcherPaginate)) == null
                    ? void 0
                    : t.innerHTML) != null
                  ? e
                  : "";
            this.innerHTML !== d && (this.innerHTML = d);
          } catch (s) {
            console.error(s);
          }
        });
      }
      mount() {
        const { xoType: t } = this.props,
          e = ut(this);
        !e ||
          (t === "bundle"
            ? (this.unsubscribe = g.subscribe("xo-bundle-products", (s) => {
                var a;
                const n = (a = s[e]) != null ? a : [];
                this.setState({ ids: n });
              }))
            : (this.unsubscribe = g.subscribe(`xo-${t}-products`, (s) => {
                this.setState({ ids: s });
              })));
      }
      stateUpdate() {
        this.renderContent();
      }
      unmount() {
        this.unsubscribe();
      }
    }),
    o(Pi, "propTypes", { xoType: "string" }),
    o(Pi, "defaultProps", {}),
    Pi);
  (ea = X([U(c.ProductsFetcherPaginate)], ea)), uu();
  function gu() {
    document.addEventListener("keydown", async (r) => {
      const i = r.key === "Enter" || r.key === " ",
        t = r.target;
      if (t) {
        const e =
            x.get(t, "data-button") || t.getAttribute("role") === "button",
          s =
            t.tagName.toLowerCase() === c.CarouselSlide &&
            t.closest(c.CarouselThumbnail);
        e && i && (await T(), t.click()), s && t.click();
        const n = t.getAttribute("xb-href");
        n &&
          i &&
          (r.ctrlKey || r.metaKey
            ? window.open(n, "_blank")
            : (window.location.href = n));
      }
    });
  }
  function bu() {
    var t;
    const r =
        "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.js",
      i = document.querySelector("dotlottie-player");
    (t = i == null ? void 0 : i.getAttribute("src")) != null &&
      t.endsWith(".lottie") &&
      (Oi({ id: "dotlottie-player", file: r }),
      nl({
        id: "dotlottie-player",
        content:
          "dotlottie-player { width: 100% !important; height: auto !important }",
      }));
  }
  function yu() {
    document.querySelectorAll("a").forEach((i) => {
      const t = i.getAttribute("href");
      t && i.setAttribute("href", Ri(t));
    });
  }
  async function vu() {
    var r, i;
    if (location.pathname.startsWith("/products/"))
      if ((i = (r = window.meta) == null ? void 0 : r.product) != null && i.id)
        xo("viewed", window.meta.product.id.toString());
      else {
        const t = document.querySelector(
            `${c.Product}[xo-product-information]`
          ),
          e = t == null ? void 0 : t.getAttribute("xo-product-id");
        e && xo("viewed", e);
      }
  }
  ne(() => {
    gu(), yu(), bu(), vu();
  });
  const Mp = "";
  console.log("WC V1.3.34"),
    (V.CircleBar = we),
    (V.cartFormSubscribe = Fs),
    (V.cartSubscribe = ro),
    (V.fieldSignal = pt),
    (V.getCartFormState = Wt),
    (V.getCartState = hr),
    (V.xoCarousel = ac),
    (V.xoCircleBar = Ee),
    (V.xoCollapse = Se),
    (V.xoFilters = Zi),
    (V.xoGroup = Dr),
    (V.xoModal = Ht),
    (V.xoPopover = ce),
    (V.xoProductQuickView = Ir),
    (V.xoSticky = Qi),
    (V.xoStore = g),
    (V.xoTabs = Bn),
    (V.xoToast = Ce),
    Object.defineProperties(V, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: "Module" },
    });
});
