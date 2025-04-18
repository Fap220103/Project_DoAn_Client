﻿var swfobject = (function () {
  function u() {
    if (!s) {
      try {
        var a = d.getElementsByTagName('body')[0].appendChild(d.createElement('span'));
        a.parentNode.removeChild(a);
      } catch (b) {
        return;
      }
      s = !0;
      for (var a = x.length, c = 0; c < a; c++) x[c]();
    }
  }
  function L(a) {
    s ? a() : (x[x.length] = a);
  }
  function M(a) {
    if (typeof m.addEventListener != i) m.addEventListener('load', a, !1);
    else if (typeof d.addEventListener != i) d.addEventListener('load', a, !1);
    else if (typeof m.attachEvent != i) U(m, 'onload', a);
    else if ('function' == typeof m.onload) {
      var b = m.onload;
      m.onload = function () {
        b();
        a();
      };
    } else m.onload = a;
  }
  function V() {
    var a = d.getElementsByTagName('body')[0],
      b = d.createElement(r);
    b.setAttribute('type', y);
    var c = a.appendChild(b);
    if (c) {
      var f = 0;
      (function () {
        if (typeof c.GetVariable != i) {
          var g = c.GetVariable('$version');
          g &&
            ((g = g.split(' ')[1].split(',')),
            (e.pv = [parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10)]));
        } else if (10 > f) {
          f++;
          setTimeout(arguments.callee, 10);
          return;
        }
        a.removeChild(b);
        c = null;
        D();
      })();
    } else D();
  }
  function D() {
    var a = p.length;
    if (0 < a)
      for (var b = 0; b < a; b++) {
        var c = p[b].id,
          f = p[b].callbackFn,
          g = { success: !1, id: c };
        if (0 < e.pv[0]) {
          var d = n(c);
          if (d)
            if (z(p[b].swfVersion) && !(e.wk && 312 > e.wk))
              t(c, !0), f && ((g.success = !0), (g.ref = E(c)), f(g));
            else if (p[b].expressInstall && F()) {
              g = {};
              g.data = p[b].expressInstall;
              g.width = d.getAttribute('width') || '0';
              g.height = d.getAttribute('height') || '0';
              d.getAttribute('class') && (g.styleclass = d.getAttribute('class'));
              d.getAttribute('align') && (g.align = d.getAttribute('align'));
              for (var h = {}, d = d.getElementsByTagName('param'), j = d.length, k = 0; k < j; k++)
                'movie' != d[k].getAttribute('name').toLowerCase() &&
                  (h[d[k].getAttribute('name')] = d[k].getAttribute('value'));
              G(g, h, c, f);
            } else W(d), f && f(g);
        } else if ((t(c, !0), f)) {
          if ((c = E(c)) && typeof c.SetVariable != i) (g.success = !0), (g.ref = c);
          f(g);
        }
      }
  }
  function E(a) {
    var b = null;
    if ((a = n(a)) && 'OBJECT' == a.nodeName)
      typeof a.SetVariable != i ? (b = a) : (a = a.getElementsByTagName(r)[0]) && (b = a);
    return b;
  }
  function F() {
    return !A && z('6.0.65') && (e.win || e.mac) && !(e.wk && 312 > e.wk);
  }
  function G(a, b, c, f) {
    A = !0;
    H = f || null;
    N = { success: !1, id: c };
    var g = n(c);
    if (g) {
      'OBJECT' == g.nodeName ? ((w = I(g)), (B = null)) : ((w = g), (B = c));
      a.id = O;
      if (typeof a.width == i || (!/%$/.test(a.width) && 310 > parseInt(a.width, 10)))
        a.width = '310';
      if (typeof a.height == i || (!/%$/.test(a.height) && 137 > parseInt(a.height, 10)))
        a.height = '137';
      d.title = d.title.slice(0, 47) + ' - Flash Player Installation';
      f = e.ie && e.win ? 'ActiveX' : 'PlugIn';
      f =
        'MMredirectURL=' +
        m.location.toString().replace(/&/g, '%26') +
        '&MMplayerType=' +
        f +
        '&MMdoctitle=' +
        d.title;
      b.flashvars = typeof b.flashvars != i ? b.flashvars + ('&' + f) : f;
      e.ie &&
        e.win &&
        4 != g.readyState &&
        ((f = d.createElement('div')),
        (c += 'SWFObjectNew'),
        f.setAttribute('id', c),
        g.parentNode.insertBefore(f, g),
        (g.style.display = 'none'),
        (function () {
          g.readyState == 4 ? g.parentNode.removeChild(g) : setTimeout(arguments.callee, 10);
        })());
      J(a, b, c);
    }
  }
  function W(a) {
    if (e.ie && e.win && 4 != a.readyState) {
      var b = d.createElement('div');
      a.parentNode.insertBefore(b, a);
      b.parentNode.replaceChild(I(a), b);
      a.style.display = 'none';
      (function () {
        4 == a.readyState ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10);
      })();
    } else a.parentNode.replaceChild(I(a), a);
  }
  function I(a) {
    var b = d.createElement('div');
    if (e.win && e.ie) b.innerHTML = a.innerHTML;
    else if ((a = a.getElementsByTagName(r)[0]))
      if ((a = a.childNodes))
        for (var c = a.length, f = 0; f < c; f++)
          !(1 == a[f].nodeType && 'PARAM' == a[f].nodeName) &&
            8 != a[f].nodeType &&
            b.appendChild(a[f].cloneNode(!0));
    return b;
  }
  function J(a, b, c) {
    var f,
      g = n(c);
    if (e.wk && 312 > e.wk) return f;
    if (g)
      if ((typeof a.id == i && (a.id = c), e.ie && e.win)) {
        var o = '',
          h;
        for (h in a)
          a[h] != Object.prototype[h] &&
            ('data' == h.toLowerCase()
              ? (b.movie = a[h])
              : 'styleclass' == h.toLowerCase()
                ? (o += ' class="' + a[h] + '"')
                : 'classid' != h.toLowerCase() && (o += ' ' + h + '="' + a[h] + '"'));
        h = '';
        for (var j in b)
          b[j] != Object.prototype[j] && (h += '<param name="' + j + '" value="' + b[j] + '" />');
        g.outerHTML =
          '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
          o +
          '>' +
          h +
          '</object>';
        C[C.length] = a.id;
        f = n(a.id);
      } else {
        j = d.createElement(r);
        j.setAttribute('type', y);
        for (var k in a)
          a[k] != Object.prototype[k] &&
            ('styleclass' == k.toLowerCase()
              ? j.setAttribute('class', a[k])
              : 'classid' != k.toLowerCase() && j.setAttribute(k, a[k]));
        for (o in b)
          b[o] != Object.prototype[o] &&
            'movie' != o.toLowerCase() &&
            ((a = j),
            (h = o),
            (k = b[o]),
            (c = d.createElement('param')),
            c.setAttribute('name', h),
            c.setAttribute('value', k),
            a.appendChild(c));
        g.parentNode.replaceChild(j, g);
        f = j;
      }
    return f;
  }
  function P(a) {
    var b = n(a);
    b &&
      'OBJECT' == b.nodeName &&
      (e.ie && e.win
        ? ((b.style.display = 'none'),
          (function () {
            if (4 == b.readyState) {
              var c = n(a);
              if (c) {
                for (var f in c) 'function' == typeof c[f] && (c[f] = null);
                c.parentNode.removeChild(c);
              }
            } else setTimeout(arguments.callee, 10);
          })())
        : b.parentNode.removeChild(b));
  }
  function n(a) {
    var b = null;
    try {
      b = d.getElementById(a);
    } catch (c) {}
    return b;
  }
  function U(a, b, c) {
    a.attachEvent(b, c);
    v[v.length] = [a, b, c];
  }
  function z(a) {
    var b = e.pv,
      a = a.split('.');
    a[0] = parseInt(a[0], 10);
    a[1] = parseInt(a[1], 10) || 0;
    a[2] = parseInt(a[2], 10) || 0;
    return b[0] > a[0] ||
      (b[0] == a[0] && b[1] > a[1]) ||
      (b[0] == a[0] && b[1] == a[1] && b[2] >= a[2])
      ? !0
      : !1;
  }
  function Q(a, b, c, f) {
    if (!e.ie || !e.mac) {
      var g = d.getElementsByTagName('head')[0];
      if (g) {
        c = c && 'string' == typeof c ? c : 'screen';
        f && (K = l = null);
        if (!l || K != c)
          (f = d.createElement('style')),
            f.setAttribute('type', 'text/css'),
            f.setAttribute('media', c),
            (l = g.appendChild(f)),
            e.ie &&
              e.win &&
              typeof d.styleSheets != i &&
              0 < d.styleSheets.length &&
              (l = d.styleSheets[d.styleSheets.length - 1]),
            (K = c);
        e.ie && e.win
          ? l && typeof l.addRule == r && l.addRule(a, b)
          : l &&
            typeof d.createTextNode != i &&
            l.appendChild(d.createTextNode(a + ' {' + b + '}'));
      }
    }
  }
  function t(a, b) {
    if (R) {
      var c = b ? 'visible' : 'hidden';
      s && n(a) ? (n(a).style.visibility = c) : Q('#' + a, 'visibility:' + c);
    }
  }
  function S(a) {
    return null != /[\\\"<>\.;]/.exec(a) && typeof encodeURIComponent != i
      ? encodeURIComponent(a)
      : a;
  }
  var i = 'undefined',
    r = 'object',
    y = 'application/x-shockwave-flash',
    O = 'SWFObjectExprInst',
    m = window,
    d = document,
    q = navigator,
    T = !1,
    x = [
      function () {
        T ? V() : D();
      }
    ],
    p = [],
    C = [],
    v = [],
    w,
    B,
    H,
    N,
    s = !1,
    A = !1,
    l,
    K,
    R = !0,
    e = (function () {
      var a =
          typeof d.getElementById != i &&
          typeof d.getElementsByTagName != i &&
          typeof d.createElement != i,
        b = q.userAgent.toLowerCase(),
        c = q.platform.toLowerCase(),
        f = c ? /win/.test(c) : /win/.test(b),
        c = c ? /mac/.test(c) : /mac/.test(b),
        b = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, '$1')) : !1,
        g = !+'\v1',
        e = [0, 0, 0],
        h = null;
      if (typeof q.plugins != i && typeof q.plugins['Shockwave Flash'] == r) {
        if (
          (h = q.plugins['Shockwave Flash'].description) &&
          !(typeof q.mimeTypes != i && q.mimeTypes[y] && !q.mimeTypes[y].enabledPlugin)
        )
          (T = !0),
            (g = !1),
            (h = h.replace(/^.*\s+(\S+\s+\S+$)/, '$1')),
            (e[0] = parseInt(h.replace(/^(.*)\..*$/, '$1'), 10)),
            (e[1] = parseInt(h.replace(/^.*\.(.*)\s.*$/, '$1'), 10)),
            (e[2] = /[a-zA-Z]/.test(h) ? parseInt(h.replace(/^.*[a-zA-Z]+(.*)$/, '$1'), 10) : 0);
      } else if (typeof m.ActiveXObject != i)
        try {
          var j = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
          if (j && (h = j.GetVariable('$version')))
            (g = !0),
              (h = h.split(' ')[1].split(',')),
              (e = [parseInt(h[0], 10), parseInt(h[1], 10), parseInt(h[2], 10)]);
        } catch (k) {}
      return { w3: a, pv: e, wk: b, ie: g, win: f, mac: c };
    })();
  (function () {
    e.w3 &&
      (((typeof d.readyState != i && 'complete' == d.readyState) ||
        (typeof d.readyState == i && (d.getElementsByTagName('body')[0] || d.body))) &&
        u(),
      s ||
        (typeof d.addEventListener != i && d.addEventListener('DOMContentLoaded', u, !1),
        e.ie &&
          e.win &&
          (d.attachEvent('onreadystatechange', function () {
            'complete' == d.readyState &&
              (d.detachEvent('onreadystatechange', arguments.callee), u());
          }),
          m == top &&
            (function () {
              if (!s) {
                try {
                  d.documentElement.doScroll('left');
                } catch (a) {
                  setTimeout(arguments.callee, 0);
                  return;
                }
                u();
              }
            })()),
        e.wk &&
          (function () {
            s || (/loaded|complete/.test(d.readyState) ? u() : setTimeout(arguments.callee, 0));
          })(),
        M(u)));
  })();
  (function () {
    e.ie &&
      e.win &&
      window.attachEvent('onunload', function () {
        for (var a = v.length, b = 0; b < a; b++) v[b][0].detachEvent(v[b][1], v[b][2]);
        a = C.length;
        for (b = 0; b < a; b++) P(C[b]);
        for (var c in e) e[c] = null;
        e = null;
        for (var f in swfobject) swfobject[f] = null;
        swfobject = null;
      });
  })();
  return {
    registerObject: function (a, b, c, f) {
      if (e.w3 && a && b) {
        var d = {};
        d.id = a;
        d.swfVersion = b;
        d.expressInstall = c;
        d.callbackFn = f;
        p[p.length] = d;
        t(a, !1);
      } else f && f({ success: !1, id: a });
    },
    getObjectById: function (a) {
      if (e.w3) return E(a);
    },
    embedSWF: function (a, b, c, d, g, o, h, j, k, m) {
      var n = { success: !1, id: b };
      e.w3 && !(e.wk && 312 > e.wk) && a && b && c && d && g
        ? (t(b, !1),
          L(function () {
            c += '';
            d += '';
            var e = {};
            if (k && typeof k === r) for (var l in k) e[l] = k[l];
            e.data = a;
            e.width = c;
            e.height = d;
            l = {};
            if (j && typeof j === r) for (var p in j) l[p] = j[p];
            if (h && typeof h === r)
              for (var q in h)
                l.flashvars =
                  typeof l.flashvars != i ? l.flashvars + ('&' + q + '=' + h[q]) : q + '=' + h[q];
            if (z(g)) (p = J(e, l, b)), e.id == b && t(b, !0), (n.success = !0), (n.ref = p);
            else {
              if (o && F()) {
                e.data = o;
                G(e, l, b, m);
                return;
              }
              t(b, !0);
            }
            m && m(n);
          }))
        : m && m(n);
    },
    switchOffAutoHideShow: function () {
      R = !1;
    },
    ua: e,
    getFlashPlayerVersion: function () {
      return { major: e.pv[0], minor: e.pv[1], release: e.pv[2] };
    },
    hasFlashPlayerVersion: z,
    createSWF: function (a, b, c) {
      if (e.w3) return J(a, b, c);
    },
    showExpressInstall: function (a, b, c, d) {
      e.w3 && F() && G(a, b, c, d);
    },
    removeSWF: function (a) {
      e.w3 && P(a);
    },
    createCSS: function (a, b, c, d) {
      e.w3 && Q(a, b, c, d);
    },
    addDomLoadEvent: L,
    addLoadEvent: M,
    getQueryParamValue: function (a) {
      var b = d.location.search || d.location.hash;
      if (b) {
        /\?/.test(b) && (b = b.split('?')[1]);
        if (null == a) return S(b);
        for (var b = b.split('&'), c = 0; c < b.length; c++)
          if (b[c].substring(0, b[c].indexOf('=')) == a)
            return S(b[c].substring(b[c].indexOf('=') + 1));
      }
      return '';
    },
    expressInstallCallback: function () {
      if (A) {
        var a = n(O);
        a &&
          w &&
          (a.parentNode.replaceChild(w, a),
          B && (t(B, !0), e.ie && e.win && (w.style.display = 'block')),
          H && H(N));
        A = !1;
      }
    }
  };
})();
