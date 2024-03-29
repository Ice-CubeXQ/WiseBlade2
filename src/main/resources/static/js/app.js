(() => {
  "use strict";
  class e {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        this.config.init)
      ) {
        const e = document.querySelectorAll("[data-prlx-mouse]");
        e.length
          ? (this.paralaxMouseInit(e),
            this.setLogging(`Проснулся, слежу за объектами: (${e.length})`))
          : this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
      }
    }
    paralaxMouseInit(e) {
      e.forEach((e) => {
        const t = e.closest("[data-prlx-mouse-wrapper]"),
          r = e.dataset.prlxCx ? +e.dataset.prlxCx : 100,
          o = e.dataset.prlxCy ? +e.dataset.prlxCy : 100,
          n = e.hasAttribute("data-prlx-dxr") ? -1 : 1,
          s = e.hasAttribute("data-prlx-dyr") ? -1 : 1,
          a = e.dataset.prlxA ? +e.dataset.prlxA : 50;
        let l = 0,
          c = 0,
          i = 0,
          d = 0;
        function h(t = window) {
          t.addEventListener("mousemove", function (t) {
            const r = e.getBoundingClientRect().top + window.scrollY;
            if (r >= window.scrollY || r + e.offsetHeight >= window.scrollY) {
              const e = window.innerWidth,
                r = window.innerHeight,
                o = t.clientX - e / 2,
                n = t.clientY - r / 2;
              (i = (o / e) * 100), (d = (n / r) * 100);
            }
          });
        }
        !(function t() {
          (l += ((i - l) * a) / 1e3),
            (c += ((d - c) * a) / 1e3),
            (e.style.cssText = `transform: translate3D(${(n * l) / (r / 10)}%,${
              (s * c) / (o / 10)
            }%,0);`),
            requestAnimationFrame(t);
        })(),
          t ? h(t) : h();
      });
    }
    setLogging(e) {
      this.config.logging && s(`[PRLX Mouse]: ${e}`);
    }
  }
  let t = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
      );
    },
  };
  let r = !0,
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (r) {
        let o = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < o.length; e++) {
            o[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (r = !1),
          setTimeout(function () {
            r = !0;
          }, e);
      }
    },
    n = (e = 500) => {
      let t = document.querySelector("body");
      if (r) {
        let o = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < o.length; e++) {
          o[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (r = !1),
          setTimeout(function () {
            r = !0;
          }, e);
      }
    };
  function s(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function a(e) {
    return e.filter(function (e, t, r) {
      return r.indexOf(e) === t;
    });
  }
  const l = { inputMaskModule: null, selectModule: null };
  let c = {
    getErrors(e) {
      let t = 0,
        r = e.querySelectorAll("*[data-required]");
      return (
        r.length &&
          r.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`,
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error"),
          );
    },
    formClean(e) {
      e.reset(),
        setTimeout(() => {
          let t = e.querySelectorAll("input,textarea");
          for (let e = 0; e < t.length; e++) {
            const r = t[e];
            r.parentElement.classList.remove("_form-focus"),
              r.classList.remove("_form-focus"),
              c.removeError(r),
              (r.value = r.dataset.placeholder);
          }
          let r = e.querySelectorAll(".checkbox__input");
          if (r.length > 0)
            for (let e = 0; e < r.length; e++) {
              r[e].checked = !1;
            }
          if (l.selectModule) {
            let t = e.querySelectorAll(".select");
            if (t.length)
              for (let e = 0; e < t.length; e++) {
                const r = t[e].querySelector("select");
                l.selectModule.selectBuild(r);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  class i {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]"),
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${e.length})...`,
        ),
          a(
            Array.from(e).map(function (e) {
              return `${e.dataset.watchRoot ? e.dataset.watchRoot : null}|${
                e.dataset.watchMargin ? e.dataset.watchMargin : "0px"
              }|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            }),
          ).forEach((t) => {
            let r = t.split("|"),
              o = { root: r[0], margin: r[1], threshold: r[2] },
              n = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  r = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  n = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === o.root &&
                  String(r) === o.margin &&
                  String(n) === o.threshold
                )
                  return e;
              }),
              s = this.getScrollWatcherConfig(o);
            this.scrollWatcherInit(n, s);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${e.root} нет на странице`,
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %",
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${t.classList}, добавил класс _watcher-view`,
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${t.classList}, убрал класс _watcher-view`,
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging && s(`[Наблюдатель]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const r = e.target;
      this.scrollWatcherIntersecting(e, r),
        r.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(r, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } }),
        );
    }
  }
  let d = !1;
  if (
    (setTimeout(() => {
      if (d) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0),
    window.addEventListener("load", function (e) {
      document.body.insertAdjacentHTML(
        "beforeend",
        '<div class="main-bg"></div>',
      );
    }),
    "Вход" === document.title || "Регистрация" === document.title)
  ) {
    const e = document.querySelectorAll(".menu__list .menu__item");
    e[e.length - 1].style.cssText = "display: none;";
  }
  (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    t.any() && document.documentElement.classList.add("touch"),
    window.addEventListener("load", function () {
      setTimeout(function () {
        document.documentElement.classList.add("loaded");
      }, 0);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          r &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? o(e) : n(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      if (document.querySelectorAll("[data-fullscreen]").length && t.any()) {
        function e() {
          let e = 0.01 * window.innerHeight;
          document.documentElement.style.setProperty("--vh", `${e}px`);
        }
        window.addEventListener("resize", e), e();
      }
    })(),
    new e({}),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]",
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            c.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && c.validateInput(t));
        });
    })(),
    new i({}),
    (function () {
      d = !0;
      const e = document.querySelector("header.header"),
        t = e.hasAttribute("data-scroll-show"),
        r = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
        o = e.dataset.scroll ? e.dataset.scroll : 1;
      let n,
        s = 0;
      document.addEventListener("windowScroll", function (a) {
        const l = window.scrollY;
        clearTimeout(n),
          l >= o
            ? (!e.classList.contains("_header-scroll") &&
                e.classList.add("_header-scroll"),
              t &&
                (l > s
                  ? e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")
                  : !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show"),
                (n = setTimeout(() => {
                  !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show");
                }, r))))
            : (e.classList.contains("_header-scroll") &&
                e.classList.remove("_header-scroll"),
              t &&
                e.classList.contains("_header-show") &&
                e.classList.remove("_header-show")),
          (s = l <= 0 ? 0 : l);
      });
    })();
})();
