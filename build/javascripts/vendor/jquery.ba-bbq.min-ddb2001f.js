/*
 * jQuery BBQ: Back Button & Query Library - v1.0.3 - 12/2/2009
 * https://benalman.com/projects/jquery-bbq-plugin/
 *
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * https://benalman.com/about/license/
 */
!(function(t, n) {
  function e(t) {
    return "string" == typeof t;
  }
  function r(t) {
    var n = v.call(arguments, 1);
    return function() {
      return t.apply(this, n.concat(v.call(arguments)));
    };
  }
  function o(t) {
    return t.replace(/^[^#]*#?(.*)$/, "$1");
  }
  function a(t) {
    return t.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1");
  }
  function i(n, r, o, a, i) {
    var u, c, s, p, h;
    return (
      a !== f
        ? ((s = o.match(n ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/)),
          (h = s[3] || ""),
          2 === i && e(a)
            ? (c = a.replace(n ? U : D, ""))
            : ((p = l(s[2])),
              (a = e(a) ? l[n ? j : w](a) : a),
              (c = 2 === i ? a : 1 === i ? t.extend({}, a, p) : t.extend({}, p, a)),
              (c = b(c))),
          (u = s[1] + (n ? "#" : c || !s[1] ? "?" : "") + c + h))
        : (u = r(o !== f ? o : g[x])),
      u
    );
  }
  function u(t, n, r) {
    return (
      n === f || "boolean" == typeof n ? ((r = n), (n = b[t ? j : w]())) : (n = e(n) ? n.replace(t ? U : D, "") : n),
      l(n, r)
    );
  }
  function c(n, r, o, a) {
    return (
      e(o) || "object" == typeof o || ((a = o), (o = r), (r = f)),
      this.each(function() {
        var e = t(this),
          i = r || d()[(this.nodeName || "").toLowerCase()] || "",
          u = (i && e.attr(i)) || "";
        e.attr(i, b[n](u, o, a));
      })
    );
  }
  var f,
    s,
    l,
    p,
    h,
    d,
    m,
    g = n.location,
    v = Array.prototype.slice,
    y = decodeURIComponent,
    b = t.param,
    $ = (t.bbq = t.bbq || {}),
    N = "hashchange",
    w = "querystring",
    j = "fragment",
    q = "elemUrlAttr",
    x = "href",
    A = "src",
    S = t.browser,
    T = S.msie && S.version < 8,
    C = "on" + N in n && !T,
    D = /^.*\?|#.*$/g,
    U = /^.*\#/,
    k = {};
  (b[w] = r(i, 0, a)),
    (b[j] = s = r(i, 1, o)),
    (t.deparam = l = function(n, e) {
      var r = {},
        o = { true: !0, false: !1, null: null };
      return (
        t.each(n.replace(/\+/g, " ").split("&"), function(n, a) {
          var i,
            u = a.split("="),
            c = y(u[0]),
            s = r,
            l = 0,
            p = c.split("]["),
            h = p.length - 1;
          if (
            (/\[/.test(p[0]) && /\]$/.test(p[h])
              ? ((p[h] = p[h].replace(/\]$/, "")), (p = p.shift().split("[").concat(p)), (h = p.length - 1))
              : (h = 0),
            2 === u.length)
          )
            if (((i = y(u[1])), e && (i = i && !isNaN(i) ? +i : "undefined" === i ? f : o[i] !== f ? o[i] : i), h))
              for (; h >= l; l++)
                (c = "" === p[l] ? s.length : p[l]),
                  (s = s[c] = h > l ? s[c] || (p[l + 1] && isNaN(p[l + 1]) ? {} : []) : i);
            else t.isArray(r[c]) ? r[c].push(i) : (r[c] = r[c] !== f ? [r[c], i] : i);
          else c && (r[c] = e ? f : "");
        }),
        r
      );
    }),
    (l[w] = r(u, 0)),
    (l[j] = p = r(u, 1)),
    t[q] ||
      (t[q] = function(n) {
        return t.extend(k, n);
      })({ a: x, base: x, iframe: A, img: A, input: A, form: "action", link: x, script: A }),
    (d = t[q]),
    (t.fn[w] = r(c, w)),
    (t.fn[j] = r(c, j)),
    ($.pushState = h = function(t, n) {
      e(t) && /^#/.test(t) && n === f && (n = 2);
      var r = t !== f,
        o = s(g[x], r ? t : {}, r ? n : 2);
      g[x] = o + (/#/.test(o) ? "" : "#");
    }),
    ($.getState = function(t, n) {
      return t === f || "boolean" == typeof t ? p(t) : p(n)[t];
    }),
    ($.pollDelay = 100),
    (t.event.special[N] = {
      setup: function() {
        return C ? !1 : void m.start();
      },
      teardown: function() {
        return C ? !1 : void m.stop();
      },
      add: function(t) {
        return function(n) {
          var e = (n[j] = s());
          (n.getState = function(t, n) {
            return t === f || "boolean" == typeof t ? l(e, t) : l(e, n)[t];
          }),
            t.apply(this, arguments);
        };
      },
    }),
    (m = (function() {
      function e() {
        (i = u = function(t) {
          return t;
        }),
          T &&
            ((a = t('<iframe src="javascript:0"/>').hide().appendTo("body")[0].contentWindow),
            (u = function() {
              return o(a.document.location[x]);
            }),
            (i = function(t, n) {
              if (t !== n) {
                var e = a.document;
                e.open().close(), (e.location.hash = "#" + t);
              }
            })(s()));
      }
      var r,
        a,
        i,
        u,
        c = {};
      return (
        (c.start = function() {
          if (!r) {
            var o = s();
            i || e(),
              (function a() {
                var e = s(),
                  c = u(o);
                e !== o ? (i((o = e), c), t(n).trigger(N)) : c !== o && h("#" + c), (r = setTimeout(a, $.pollDelay));
              })();
          }
        }),
        (c.stop = function() {
          a || (r && clearTimeout(r), (r = 0));
        }),
        c
      );
    })());
})(jQuery, this);
