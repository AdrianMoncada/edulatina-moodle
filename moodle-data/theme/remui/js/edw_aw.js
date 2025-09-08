/* eslint-disable space-before-function-paren */
/* eslint-disable spaced-comment */
/* eslint-disable no-sequences */
/* eslint-disable no-empty */
/* eslint-disable new-cap */
/* eslint-disable block-scoped-var */
/* eslint-disable camelcase */
/* eslint-disable array-bracket-spacing */
/* eslint-disable no-invalid-this */
/* eslint-disable curly */
/* eslint-disable no-eq-null */
/* eslint-disable no-nested-ternary */
/* eslint-disable complexity */
/* eslint-disable no-unused-expressions */
/*!
 * Sienna Accessibility Widget v1.1
 * (c) 2024 Benny Luk
 * License: GNU
 * Home Page : https://accessibility-widget.pages.dev/
 * Repository: git+https://github.com/bennyluk/Sienna-Accessibility-Widget.git
 *
 */

(() => {
    "use strict";
    var t = function () {
        return (
            (t =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                    return t;
                }),
            t.apply(this, arguments)
        );
    },
        e = {},
        i = "asw";

    function n(i) {
        var n = t(t({}, e), {
            states: t(t({}, e.states), i)
        });
        return a(n), n;
    }

    function a(n) {
        (e = t(t({}, e), n)), (function (t, e, i) {
            var n = new Date();
            n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3);
            var a = "expires=" + n.toUTCString();
            document.cookie = t + "=" + e + ";" + a + ";path=/";
        })(i, JSON.stringify(e));
    }

    function o(t) {
        var i;
        return null === (i = null == e ? void 0 : e.states) || void 0 === i ? void 0 : i[t];
    }

    function s(t) {
        if ((void 0 === t && (t = !0), t)) return e;
        var n = (function (t) {
            for (var e = t + "=", i = decodeURIComponent(document.cookie).split(";"), n = 0; n < i.length; n++) {
                for (var a = i[n];
                    " " == a.charAt(0);) a = a.substring(1);
                if (0 == a.indexOf(e)) return a.substring(e.length, a.length);
            }
            return "";
        })(i);
        return n && (e = JSON.parse(n)), e;
    }

    function r(t) {
        void 0 === t && (t = 1),
            document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,dl,dt,li,ol,th,td,span,blockquote,.asw-text").forEach(function (e) {
                var i;
                if (!e.classList.contains("material-icons") && !e.classList.contains("fa")) {
                    var n = Number(null !== (i = e.getAttribute("data-asw-orgFontSize")) && void 0 !== i ? i : 0);
                    n || ((n = parseInt(window.getComputedStyle(e).getPropertyValue("font-size"))), e.setAttribute("data-asw-orgFontSize", String(n)));
                    var a = n * t;
                    e.style["font-size"] = a + "px";
                }
            });
        var e = document.querySelector(".asw-amount");
        e && (e.innerText = "".concat((100 * t).toFixed(0), "%"));
    }

    function l(t) {
        var e = t.id,
            i = t.css;
        if (i) {
            var n = document.getElementById(e || "") || document.createElement("style");
            (n.innerHTML = i), n.id || ((n.id = e), document.head.appendChild(n));
        }
    }
    var c = ["-o-", "-ms-", "-moz-", "-webkit-", ""],
        g = ["filter"];

    function u(t) {
        var e,
            i = "";
        return (
            t &&
            ((i += (function (t) {
                var e = "";
                if (t) {
                    var i = function (i) {
                        (g.includes(i) ? c : [""]).forEach(function (n) {
                            e += "".concat(n).concat(i, ":").concat(t[i], " !important;");
                        });
                    };
                    for (var n in t) i(n);
                }
                return e;
            })(t.styles)).length &&
                t.selector &&
                (i = (function (t) {
                    var e = t.selector,
                        i = t.childrenSelector,
                        n = void 0 === i ? [""] : i,
                        a = t.css,
                        o = "";
                    return (
                        n.forEach(function (t) {
                            o += "".concat(e, " ").concat(t, "{").concat(a, "}");
                        }),
                        o
                    );
                })({
                    selector: t.selector,
                    childrenSelector: t.childrenSelector,
                    css: i
                })), (i += null !== (e = t.css) && void 0 !== e ? e : "")),
            i
        );
    }

    function d(t) {
        var e,
            i = t.id,
            n = void 0 === i ? "" : i,
            a = t.enable,
            o = void 0 !== a && a,
            s = "asw-".concat(n);
        o ? l({
            css: u(t),
            id: s
        }) : null === (e = document.getElementById(s)) || void 0 === e || e.remove();
        document.documentElement.classList.toggle(s, o);
    }
    var h = function (t, e, i) {
        if (i || 2 === arguments.length)
            for (var n, a = 0, o = e.length; a < o; a++)(!n && a in e) || (n || (n = Array.prototype.slice.call(e, 0, a)), (n[a] = e[a]));
        return t.concat(n || Array.prototype.slice.call(e));
    },
        p = ["", "*:not(.material-icons, .icon, .edw-icon,.asw-menu,.asw-menu *, button.emoji-button, .info-about-box-wrapper p)"],
        m = ["h1", "h2", "h3", "h4", "h5", "h6", ".wsite-headline", ".wsite-content-title"],
        v = h(h([], m, !0), ["img", "p:not(.info-about-box-wrapper p)", "i:not(.fa,.edw-icon,.icon)", "svg", "a", "button:not(.asw-btn, .fa)", "label", "li", "ol"], !1),
        contrastselectors_m = ["h1", "h2:not(.single-card.dark h2.sectionname)", "h3", "h4:not(.wd-camp-text)", "h5", "h6", ".wsite-headline", ".wsite-content-title"],
        contrastselectors = h(h([], contrastselectors_m, !0), ["img:not(.expande-icon,,.collaps-icon,.questionflagimage,.activityicon, .qtype img, .choicelist .option-icon img,.navbar-brand-logo,.icon, .btn-icon img, .slider img.slide, .card-icon img, .icon-card img, .icon-box img, .icon img, .slider-sec-1 img, .btn-submitedit img, .edw-nav-icon-img, [class^='section-footer'] img, [class^='pattern'], .logo-box img,.epb-img-icon)", "p:not(.section-feature-design-8 .name, .single-card.dark p, .section-team-design-5 p.name, .section-team-design-5 p.desc)", "i:not(.fa,.edw-icon,.icon)", "button .fa", "a .edw-icon", "a span:not(.thispageholder)", "a .fa", "svg:not(:has(image))", ".social-icons-container.box-icon img", "a:not(.edw-container .link-ref,.view-course-url,.blockurl,.aabtn,:empty, .edw-slide-control, :has(img), .single-card.dark a.align-middle, .single-card.dark .wdm-section-summary a.autolink)", "button:not(.asw-btn, :has(image), :has(img), .subscribe-btn, .course-section-header .toggle-icon)", "button .edw-icon", ".asw-menu-btn .edw-icon", ".btn-floating-text", ".region-name-text", "label:not(label[for^='item_qtype'])", "li:not(.section, .section-summary, .subsection, .carousel-indicators li)", "ol:not(.edw-carousel-indicators, .carousel-indicators)", "ul:not(.course-content ul)", ".recent-forums a div.text_to_html", ".activity-availability div.expanded-content", "td:not(.qtype)", "tr", "tr th", "tr th span", ".lesson-date-wrapper *", "span.categoryname", "span.feedback-text", "span.availability-excerpt", ".categoryfilter span", "#feedback-highlighter span", ".breadcrumb-item span", ".testimonial-user-name", ".toast-wrapper *", ".stat-block .inner span", ".popover-region-toggle", ".popover-region-toggle .icon", ".que .state", ".que .grade", "label span.typename", ".edw-nav-tab-text", ".edw-card-content-head", ".faq-card .card-heading span"], !1),
        b = {
            "dark-contrast": {
                styles: {
                    color: "#FFF",
                    fill: "#FFF",
                    "background-color": "#000"
                },
                childrenSelector: contrastselectors
            },
            "light-contrast": {
                styles: {
                    color: "#000",
                    fill: "#000",
                    "background-color": "#FFF"
                },
                childrenSelector: contrastselectors
            },
            "high-contrast": {
                styles: {
                    filter: "contrast(125%)"
                }
            },
            "high-saturation": {
                styles: {
                    filter: "saturate(200%)"
                }
            },
            "low-saturation": {
                styles: {
                    filter: "saturate(50%)"
                }
            },
            monochrome: {
                styles: {
                    filter: "grayscale(100%)"
                }
            },
        };
    var S = function () {
        return (
            (S =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                    return t;
                }),
            S.apply(this, arguments)
        );
    };

    function w() {
        var t = s().states.contrast,
            e = "",
            i = b[t];
        i && (e = u(S(S({}, i), {
            selector: "html.aws-filter"
        }))), l({
            css: e,
            id: "asw-filter-style"
        }), document.documentElement.classList.toggle("aws-filter", Boolean(t));
    }
    var y = function () {
        return (
            (y =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                    return t;
                }),
            y.apply(this, arguments)
        );
    },
        f = {
            id: "stop-animations",
            selector: "html",
            childrenSelector: ["*", "*::before", "*::after"],
            styles: {
                transition: "none",
                "animation-fill-mode": "forwards",
                "animation-iteration-count": "1",
                "animation-duration": ".01s"
            }
        };
    var k = function () {
        return (
            (k =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                    return t;
                }),
            k.apply(this, arguments)
        );
    },
        A = {
            id: "readable-font",
            selector: "html",
            childrenSelector: (function (t, e, i) {
                if (i || 2 === arguments.length)
                    for (var n, a = 0, o = e.length; a < o; a++)(!n && a in e) || (n || (n = Array.prototype.slice.call(e, 0, a)), (n[a] = e[a]));
                return t.concat(n || Array.prototype.slice.call(e));
            })(["",
                "strong,.user-desc-lastseen-wrapper,.progress-data-wrapper,.progressbar-text-wrapper", ".profile-info-item-wrapper",
                "*:not(.material-icons,.fa,fa-*,.edw-icon)", "span:not(.material-icons,.fa,.edw-icon, .icon, [class^='vjs'])", "td", "tr", "#course-stats", ".edw-stats-wrapper", "span.categoryname", ".edwiser-categories *:not(i.fa)", ".edwiser-courses *:not(i.fa)", ".review-approval-container", ".lesson-date-wrapper",
                ".modal-dialog", ".toast-message", '.popover-region-content'], v, !0),
            styles: {
                "font-family": "OpenDyslexic3,Comic Sans MS,Arial,Helvetica,sans-serif"
            },
            css: '@font-face {font-family: OpenDyslexic3;src: url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.woff") format("woff"), url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.ttf") format("truetype");}',
        };
    var C = function () {
        return (
            (C =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                    return t;
                }),
            C.apply(this, arguments)
        );
    },
        L = {
            id: "big-cursor",
            selector: "body",
            childrenSelector: ["*"],
            styles: {
                cursor: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='98px' height='98px' viewBox='0 0 48 48'%3E%3Cpath fill='%23E0E0E0' d='M27.8 39.7c-.1 0-.2 0-.4-.1s-.4-.3-.6-.5l-3.7-8.6-4.5 4.2c-.1.2-.3.3-.6.3-.1 0-.3 0-.4-.1-.3-.1-.6-.5-.6-.9V12c0-.4.2-.8.6-.9.1-.1.3-.1.4-.1.2 0 .5.1.7.3l16 15c.3.3.4.7.3 1.1-.1.4-.5.6-.9.7l-6.3.6 3.9 8.5c.1.2.1.5 0 .8-.1.2-.3.5-.5.6l-2.9 1.3c-.2-.2-.4-.2-.5-.2z'/%3E%3Cpath fill='%23212121' d='m18 12 16 15-7.7.7 4.5 9.8-2.9 1.3-4.3-9.9L18 34V12m0-2c-.3 0-.5.1-.8.2-.7.3-1.2 1-1.2 1.8v22c0 .8.5 1.5 1.2 1.8.3.2.6.2.8.2.5 0 1-.2 1.4-.5l3.4-3.2 3.1 7.3c.2.5.6.9 1.1 1.1.2.1.5.1.7.1.3 0 .5-.1.8-.2l2.9-1.3c.5-.2.9-.6 1.1-1.1.2-.5.2-1.1 0-1.5l-3.3-7.2 4.9-.4c.8-.1 1.5-.6 1.7-1.3.3-.7.1-1.6-.5-2.1l-16-15c-.3-.5-.8-.7-1.3-.7z'/%3E%3C/svg%3E\") 40 15, auto",
            },
        };
    var F = function () {
        return (
            (F =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                    return t;
                }),
            F.apply(this, arguments)
        );
    },
        x = {
            id: "highlight-title",
            selector: "html",
            childrenSelector: m,
            styles: {
                outline: "2px solid #0048ff",
                "outline-offset": "2px"
            }
        };
    const H =
        '<style>.asw-rg{position:fixed;top:0;left:0;right:0;width:100%;height:0;pointer-events:none;background-color:rgba(0,0,0,.8);z-index:1000000}</style> <div class="asw-rg asw-rg-top"></div> <div class="asw-rg asw-rg-bottom" style="top:auto;bottom:0"></div>';
    var z = function () {
        return (
            (z =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                    return t;
                }),
            z.apply(this, arguments)
        );
    },
        j = {
            id: "highlight-links",
            selector: "html",
            childrenSelector: ["a[href]"],
            styles: {
                outline: "2px solid #0048ff",
                "outline-offset": "2px"
            }
        };
    var M = function () {
        return (
            (M =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                    return t;
                }),
            M.apply(this, arguments)
        );
    },
        D = {
            id: "letter-spacing",
            selector: "html",
            childrenSelector: p,
            styles: {
                "letter-spacing": "2px"
            }
        };
    var R = function () {
        return (
            (R =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                    return t;
                }),
            R.apply(this, arguments)
        );
    },
        O = {
            id: "line-height",
            selector: "html",
            childrenSelector: p,
            styles: {
                "line-height": "3"
            }
        };
    var T = function () {
        return (
            (T =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                    return t;
                }),
            T.apply(this, arguments)
        );
    },
        B = {
            id: "font-weight",
            selector: "html",
            childrenSelector: p,
            styles: {
                "font-weight": "700"
            }
        };

    function P() {
        var t,
            e = s().states;
        void 0 === (t = e["highlight-title"]) && (t = !1),
            d(F(F({}, x), {
                enable: t
            })), (function (t) {
                void 0 === t && (t = !1), d(z(z({}, j), {
                    enable: t
                }));
            })(e["highlight-links"]), (function (t) {
                void 0 === t && (t = !1), d(M(M({}, D), {
                    enable: t
                }));
            })(e["letter-spacing"]), (function (t) {
                void 0 === t && (t = !1), d(R(R({}, O), {
                    enable: t
                }));
            })(e["line-height"]), (function (t) {
                void 0 === t && (t = !1), d(T(T({}, B), {
                    enable: t
                }));
            })(e["font-weight"]), (function (t) {
                void 0 === t && (t = !1), d(k(k({}, A), {
                    enable: t
                }));
            })(e["readable-font"]), (function (t) {
                void 0 === t && (t = !1);
                var e = document.querySelector(".asw-rg-container");
                if (t) {
                    if (!e) {
                        (e = document.createElement("div")).setAttribute("class", "asw-rg-container"), (e.innerHTML = H);
                        var i = e.querySelector(".asw-rg-top"),
                            n = e.querySelector(".asw-rg-bottom");
                        (window.__asw__onScrollReadableGuide = function (t) {
                            (i.style.height = t.clientY - 20 + "px"), (n.style.height = window.innerHeight - t.clientY - 40 + "px");
                        }),
                            document.addEventListener("mousemove", window.__asw__onScrollReadableGuide, {
                                passive: !1
                            }),
                            document.body.appendChild(e);
                    }
                } else e && e.remove(), window.__asw__onScrollReadableGuide && (document.removeEventListener("mousemove", window.__asw__onScrollReadableGuide), delete window.__asw__onScrollReadableGuide);
            })(e["readable-guide"]), (function (t) {
                void 0 === t && (t = !1), d(y(y({}, f), {
                    enable: t
                }));
            })(e["stop-animations"]), (function (t) {
                void 0 === t && (t = !1), d(C(C({}, L), {
                    enable: t
                }));
            })(e["big-cursor"]);
    }

    function V() {
        var t = s().states;
        r((null == t ? void 0 : t.fontSize) || 1), P(), w();
    }
    const I =
        '<style>.asw-menu,.asw-widget{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:400;-webkit-font-smoothing:antialiased}.asw-menu *,.asw-widget *{box-sizing:border-box!important}.asw-menu-btn{position:fixed;z-index:500000;left:30px;bottom:30px;box-shadow:0 5px 15px 0 rgb(37 44 97 / 15%),0 2px 4px 0 rgb(93 100 148 / 20%);transition:transform .2s ease;border-radius:50%;align-items:center;justify-content:center;width:58px;height:58px;display:flex;cursor:pointer;text-decoration:none!important;}.asw-menu-btn svg{width:36px;height:36px;min-height:36px;min-width:36px;max-width:36px;max-height:36px;background:0 0!important}.asw-menu-btn:hover{transform:scale(1.05)}@media only screen and (max-width:768px){.asw-menu-btn{width:42px;height:42px}.asw-menu-btn svg{width:26px;height:26px;min-height:26px;min-width:26px;max-width:26px;max-height:26px}}</style> <div class="asw-widget"> <a href="https://accessibility-widget.pages.dev" target="_blank" class="asw-menu-btn" title="Open Accessibility Menu" role="button" aria-expanded="false"> <span class="edw-icon edw-icon-Accessibility" ></span> </a> </div>';

    function N(t, e) {
        t.style.display = void 0 === e ? ("none" === t.style.display ? "block" : "none") : 1 == e ? "block" : "none";
    }
    const G =
        '<style>.asw-menu{position:fixed;left:0;top:0;box-shadow:0 0 20px #00000080;opacity:1;transition:.3s;z-index:500000;overflow:hidden;background:#eff1f5;width:500px;line-height:1;font-size:16px;height:100%;letter-spacing:.015em}.asw-menu *{color:#000;font-family:inherit;padding:0;margin:0;line-height:1!important;letter-spacing:normal!important}.asw-menu-header{display:flex;align-items:center;justify-content:space-between;padding-left:18px;padding-right:18px;}.asw-menu-title{font-size:16px!important;color:#fff!important}.asw-menu-header svg{fill:#0848ca!important;width:24px!important;height:24px!important;min-width:24px!important;min-height:24px!important;max-width:24px!important;max-height:24px!important}.asw-menu-header>div{display:flex}.asw-menu-header div[role=button]{padding:5px;cursor:pointer;border-radius:50%;transition:opacity .3s ease}.asw-menu-header div[role=button]:hover{opacity:.8}.asw-card{margin:0 15px 20px}.asw-card-title{font-size:14px!important;padding:15px 0;font-weight:600!important;opacity:.8}.asw-menu .asw-select{width:100%!important;border:none!important;min-height:45px!important;max-height:45px!important;height:45px!important;color:inherit!important}.asw-items{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.asw-btn{aspect-ratio:6/5;border-radius:12px;padding:0 15px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;color:#333;font-size:16px!important;background:#fff!important;border:2px solid transparent!important;transition:border-color .2s ease;cursor:pointer;word-break:break-word;gap:10px;position:relative;width:auto!important;height:auto!important}.asw-adjust-font .asw-label div,.asw-btn .asw-translate{font-size:14px!important;font-weight:600!important}.asw-minus,.asw-plus{background-color:#eff1f5!important;border:2px solid transparent;transition:border .2s ease}.asw-minus:hover,.asw-plus:hover{border-color:#0848ca!important}.asw-amount{font-size:18px!important;font-weight:600!important}.asw-adjust-font svg{width:24px!important;height:24px!important;min-width:24px!important;min-height:24px!important;max-width:24px!important;max-height:24px!important}.asw-btn svg{width:34px!important;height:34px!important;min-width:34px!important;min-height:34px!important;max-width:34px!important;max-height:34px!important}.asw-btn.asw-selected,.asw-btn:hover{border-color:#0848ca!important}.asw-btn.asw-selected span,.asw-btn.asw-selected svg{fill:#0848ca!important;color:#0848ca;}.asw-btn.asw-selected:after{content:"✓";position:absolute;top:10px;right:10px;background-color:#0848ca!important;color:#fff;padding:6px;font-size:10px;width:18px;height:18px;border-radius:100%;line-height:6px}.asw-footer{position:absolute;bottom:0;left:0;right:0;background:#fff;padding:20px;text-align:center;border-top:2px solid #eff1f5}.asw-footer a{font-size:16px!important;text-decoration:none!important;color:#000!important;background:0 0!important;font-weight:600!important}.asw-footer a:hover,.asw-footer a:hover span{color:#0848ca!important}.asw-menu-content{overflow:scroll;max-height:calc(100% - 80px);padding:30px 0 15px}.asw-adjust-font{background:#fff;padding:20px;margin-bottom:20px}.asw-adjust-font .asw-label{display:flex;justify-content:flex-start}.asw-adjust-font>div{display:flex;justify-content:space-between;margin-top:20px;align-items:center;font-size:15px}.asw-adjust-font .asw-label div{font-size:15px!important}.asw-adjust-font div[role=button]{background:#eff1f5!important;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer}.asw-overlay{position:fixed;top:0;left:0;width:100%;height:100%;z-index:10000}@media only screen and (max-width:560px){.asw-menu{width:100%}}@media only screen and (max-width:420px){.asw-items{grid-template-columns:repeat(2,minmax(0,1fr));gap:.5rem}}</style> <div class="asw-menu"> <div class="asw-menu-header"> <div class="asw-menu-title asw-translate"> Accessibility Menu </div> <div style="gap:15px">        <div class="asw-menu-setting dropleft"><span class="edw-icon edw-icon-Setting" id="aw_settingsDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span><div class="dropdown-menu" aria-labelledby="aw_settingsDropdown"><a class="dropdown-item adminsettingurl asw-translate" data-translate="Global settings" href="#">Global settings</a><a class="dropdown-item prefsettingurl asw-translate" data-translate="My preferences" href="#">My preferences</a></div></div>       <div role="button" class="asw-menu-reset" title="Reset settings"> <span class="edw-icon edw-icon-reset" ></span> </div> <div role="button" class="asw-menu-close" title="Close"> <span class="edw-icon edw-icon-Cancel" ></span> </div> </div> </div> <div class="asw-menu-content"> <div class="asw-card"> <select id="asw-language" title="Language" class="asw-select"></select> </div> <div class="asw-card"> <div class="asw-card-title"> Content Adjustments </div> <div class="asw-adjust-font"> <div class="asw-label" style="margin:0"> <span class="edw-icon edw-icon-font-size" ></span> <div class="asw-translate"> Adjust Font Size </div> </div> <div> <div class="asw-minus" data-key="font-size" role="button" aria-pressed="false" title="Decrease Font Size" tabindex="0"> <span class="edw-icon edw-icon-Minus" ></span> </div> <div class="asw-amount"> 100% </div> <div class="asw-plus" data-key="font-size" role="button" aria-pressed="false" title="Increase Font Size" tabindex="0"> <span class="edw-icon edw-icon-Plus_24" ></span> </div> </div> </div> <div class="asw-items content"> </div> </div> <div class="asw-card"> <div class="asw-card-title"> Color Adjustments </div> <div class="asw-items contrast"> </div> </div> <div class="asw-card"> <div class="asw-card-title"> Tools </div> <div class="asw-items tools"> </div> </div> </div>        <div class="asw-footer d-none"><form id="aw_feedbackcollection-form" class="aw_feedbackcollection-wrapper position-relative"><div class="feedback-input-wrapper flex-gap-2 align-items-center"><input type="text" class="form-control" placeholder="Any thoughts or feedback?" name="feedback" maxlength="100"><div class="d-flex flex-gap-2"><button type="submit" class="btn btn-sm btn-submit aw-feedback-submit" data-type="submit">Submit</button><div class="btn btn-close aw-feedback-close"><span class="edw-icon edw-icon-Cancel"></span></div></div></div><div class="feedback-question-wrapper d-flex align-items-center justify-content-center flex-gap-4"><p class="feedback-heading m-0">How’s your experience with the tool?</p><input type="hidden" value="How’s your experience with the tool?" name="question"> <input type="hidden" value="aw_tool_question" name="questionname"><div class="feedbacks d-flex flex-gap-4"><label class="feedback-item" for="feedback-easy"><img class="feedback-item-icon" src="https://staticcdn.edwiser.org/theme_remuiassets/images/feedbacks_assets/feedback_easy.svg"><div class="d-none"><input type="radio" id="feedback-easy" name="answer" value="Easy"></div></label><label class="feedback-item" for="feedback-hard"><img class="feedback-item-icon" src="https://staticcdn.edwiser.org/theme_remuiassets/images/feedbacks_assets/feedback_hard.svg"><div class="d-none"><input type="radio" id="feedback-hard" name="answer" value="Hard"></div></label></div></div></form></div>          </div> <div class="asw-overlay"> </div>',
        E = [{
            label: "Monochrome",
            key: "monochrome",
            icon: '<span class="edw-icon edw-icon-Monochrome" ></span>',
        }, {
            label: "Low Saturation",
            key: "low-saturation",
            icon: '<span class="edw-icon edw-icon-Low-saturation" ></span>',
        }, {
            label: "High Saturation",
            key: "high-saturation",
            icon: '<span class="edw-icon edw-icon-High-saturation" ></span>',
        }, {
            label: "High Contrast",
            key: "high-contrast",
            icon: '<span class="edw-icon edw-icon-High-contrast" ></span>',
        }, {
            label: "Light Contrast",
            key: "light-contrast",
            icon: '<span class="edw-icon edw-icon-Light-contrast" ></span>',
        }, {
            label: "Dark Contrast",
            key: "dark-contrast",
            icon: '<span class="edw-icon edw-icon-Dark-contrast" ></span>'
        }, ],
        J = [{
            label: "Font Weight",
            key: "font-weight",
            icon: '<span class="edw-icon edw-icon-Bold" ></span>',
        }, {
            label: "Line Height",
            key: "line-height",
            icon: '<span class="edw-icon edw-icon-Line-spacing" ></span>',
        }, {
            label: "Letter Spacing",
            key: "letter-spacing",
            icon: '<span class="edw-icon edw-icon-Letter-spacing" ></span>',
        }, {
            label: "Dyslexia Font",
            key: "readable-font",
            icon: '<span class="edw-icon edw-icon-Dyslexia-font" ></span>',
        }, {
            label: "Highlight Links",
            key: "highlight-links",
            icon: '<span class="edw-icon edw-icon-link" ></span>',
        }, {
            label: "Highlight Title",
            key: "highlight-title",
            icon: '<span class="edw-icon edw-icon-Title" ></span>'
        }, ],
        Z = [{
            label: "Big Cursor",
            key: "big-cursor",
            icon: '<span class="edw-icon edw-icon-Cursor" ></span>',
        }, {
            label: "Stop Animations",
            key: "stop-animations",
            icon: '<span class="edw-icon edw-icon-Stop" ></span>',
        }, {
            label: "Reading Guide",
            key: "readable-guide",
            icon: '<span class="edw-icon edw-icon-Book-guide" ></span>',
        }, ];

    function W(t, e) {
        for (var i = "", n = t.length; n--;) {
            var a = t[n];
            i += '<button class="asw-btn '
                .concat(e || "", '" type="button" data-key="')
                .concat(a.key, '" title="')
                .concat(a.label, '">')
                .concat(a.icon, '<span class="asw-translate">')
                .concat(a.label, "</span></button>");
        }
        return i;
    }
    var K = {
        ar: JSON.parse(
            '{"Accessibility Menu":"قائمة إمكانية الوصول","Reset settings":"إعادة تعيين الإعدادات","Close":"إغلاق","Content Adjustments":"تعديلات المحتوى","Adjust Font Size":"تعديل حجم الخط","Highlight Title":"تسليط الضوء على العنوان","Highlight Links":"تسليط الضوء على الروابط","Readable Font":"خط سهل القراءة","Color Adjustments":"تعديلات الألوان","Dark Contrast":"تباين داكن","Light Contrast":"تباين فاتح","High Contrast":"تباين عالي","High Saturation":"تشبع عالي","Low Saturation":"تشبع منخفض","Monochrome":"أحادي اللون","Tools":"أدوات","Reading Guide":"دليل القراءة","Stop Animations":"إيقاف الرسوم المتحركة","Big Cursor":"مؤشر كبير","Increase Font Size":"زيادة حجم الخط","Decrease Font Size":"تقليل حجم الخط","Letter Spacing":"تباعد الحروف","Line Height":"ارتفاع السطر","Font Weight":"سمك الخط","Dyslexia Font":"خط القراءة لمن يعانون من عسر القراءة","Language":"اللغة","Open Accessibility Menu":"افتح قائمة الوصول","Global settings":"الإعدادات العامة","My preferences":"تفضيلاتي"}'
        ),
        bg: JSON.parse(
            '{"Accessibility Menu":"Меню за достъпност","Reset settings":"Нулиране на настройките","Close":"Затвори","Content Adjustments":"Настройки на съдържанието","Adjust Font Size":"Регулиране на размера на шрифта","Highlight Title":"Открояване на заглавието","Highlight Links":"Открояване на връзките","Readable Font":"Четлив шрифт","Color Adjustments":"Настройки на цветовете","Dark Contrast":"Тъмен контраст","Light Contrast":"Светъл контраст","High Contrast":"Висок контраст","High Saturation":"Висока наситеност","Low Saturation":"Ниска наситеност","Monochrome":"Монохромен","Tools":"Инструменти","Reading Guide":"Ръководство за четене","Stop Animations":"Спиране на анимациите","Big Cursor":"Голям курсор","Increase Font Size":"Увеличаване на размера на шрифта","Decrease Font Size":"Намаляване на размера на шрифта","Letter Spacing":"Разстояние между буквите","Line Height":"Височина на реда","Font Weight":"Дебелина на шрифта","Dyslexia Font":"Шрифт за дислексия","Language":"Език","Open Accessibility Menu":"Отворете менюто за достъпност","Global settings":"Глобални настройки","My preferences":"Моите предпочитания"}'
        ),
        bn: JSON.parse(
            '{"Accessibility Menu":"অভিগম্যতা মেনু","Reset settings":"নির্ধারণ পুনরায় সেট করুন","Close":"বন্ধ করুন","Content Adjustments":"কন্টেন্ট সংশোধন","Adjust Font Size":"ফন্ট সাইজ সংশোধন","Highlight Title":"শিরোনাম উজ্জ্বল করুন","Highlight Links":"লিংকগুলি উজ্জ্বল করুন","Readable Font":"পঠনযোগ্য ফন্ট","Color Adjustments":"রঙ সংশোধন","Dark Contrast":"অন্ধকার প্রতিবিম্ব","Light Contrast":"আলোকিত প্রতিবিম্ব","High Contrast":"উচ্চ প্রতিবিম্ব","High Saturation":"উচ্চ সম্পৃক্তি","Low Saturation":"নিম্ন সম্পৃক্তি","Monochrome":"একরঙা","Tools":"সরঞ্জাম","Reading Guide":"পড়ার গাইড","Stop Animations":"অ্যানিমেশন বন্ধ করুন","Big Cursor":"বড় কার্সর","Increase Font Size":"ফন্ট সাইজ বাড়ান","Decrease Font Size":"ফন্ট সাইজ কমান","Letter Spacing":"অক্ষর বিরতি","Line Height":"লাইন উচ্চতা","Font Weight":"ফন্ট ওজন","Dyslexia Font":"ডিসলেক্সিয়া ফন্ট","Language":"ভাষা","Open Accessibility Menu":"অভিগম্যতা মেনু খুলুন","Global settings":"গ্লোবাল সেটিংস","My preferences":"আমার পছন্দসমূহ"}'
        ),
        cs: JSON.parse(
            '{"Accessibility Menu":"Přístupnostní menu","Reset settings":"Obnovit nastavení","Close":"Zavřít","Content Adjustments":"Úpravy obsahu","Adjust Font Size":"Nastavit velikost písma","Highlight Title":"Zvýraznit nadpis","Highlight Links":"Zvýraznit odkazy","Readable Font":"Čitelný font","Color Adjustments":"Nastavení barev","Dark Contrast":"Tmavý kontrast","Light Contrast":"Světlý kontrast","High Contrast":"Vysoký kontrast","High Saturation":"Vysoká saturace","Low Saturation":"Nízká saturace","Monochrome":"Monochromatický","Tools":"Nástroje","Reading Guide":"Průvodce čtením","Stop Animations":"Zastavit animace","Big Cursor":"Velký kurzor","Increase Font Size":"Zvětšit velikost písma","Decrease Font Size":"Zmenšit velikost písma","Letter Spacing":"Mezery mezi písmeny","Line Height":"Výška řádku","Font Weight":"Tloušťka písma","Dyslexia Font":"Dyslexický font","Language":"Jazyk","Open Accessibility Menu":"Otevřít přístupnostní menu","Global settings":"Globální nastavení","My preferences":"Moje preference"}'
        ),
        de: JSON.parse(
            '{"Accessibility Menu":"Barrierefreiheit","Reset settings":"Einstellungen zurücksetzen","Close":"Schließen","Content Adjustments":"Inhaltsanpassungen","Adjust Font Size":"Schriftgröße anpassen","Highlight Title":"Titel hervorheben","Highlight Links":"Links hervorheben","Readable Font":"Lesbare Schrift","Color Adjustments":"Farbanpassungen","Dark Contrast":"Dunkler Kontrast","Light Contrast":"Heller Kontrast","High Contrast":"Hoher Kontrast","High Saturation":"Hohe Farbsättigung","Low Saturation":"Niedrige Farbsättigung","Monochrome":"Monochrom","Tools":"Werkzeuge","Reading Guide":"Lesehilfe","Stop Animations":"Animationen stoppen","Big Cursor":"Großer Cursor","Increase Font Size":"Schriftgröße vergrößern","Decrease Font Size":"Schriftgröße verkleinern","Letter Spacing":"Zeichenabstand","Line Height":"Zeilenhöhe","Font Weight":"Schriftstärke","Dyslexia Font":"Dyslexie-Schrift","Language":"Sprache","Open Accessibility Menu":"Barrierefreiheitsmenü öffnen","Global settings":"Globale Einstellungen","My preferences":"Meine Präferenzen"}'
        ),
        el: JSON.parse(
            '{"Accessibility Menu":"Μενού προσβασιμότητας","Reset settings":"Επαναφορά ρυθμίσεων","Close":"Κλείσιμο","Content Adjustments":"Προσαρμογές περιεχομένου","Adjust Font Size":"Προσαρμογή μεγέθους γραμματοσειράς","Highlight Title":"Επισήμανση τίτλου","Highlight Links":"Επισήμανση συνδέσμων","Readable Font":"Ευανάγνωστη γραμματοσειρά","Color Adjustments":"Προσαρμογές χρωμάτων","Dark Contrast":"Σκοτεινή αντίθεση","Light Contrast":"Φωτεινή αντίθεση","High Contrast":"Υψηλή αντίθεση","High Saturation":"Υψηλός κορεσμός","Low Saturation":"Χαμηλός κορεσμός","Monochrome":"Μονόχρωμο","Tools":"Εργαλεία","Reading Guide":"Οδηγός ανάγνωσης","Stop Animations":"Απενεργοποίηση κινούμενων εικόνων","Big Cursor":"Μεγάλος δείκτης","Global settings":"Γενικές ρυθμίσεις","My preferences":"Οι προτιμήσεις μου"}'
        ),
        en: JSON.parse(
            '{"Accessibility Menu":"Accessibility Menu","Reset settings":"Reset settings","Close":"Close","Content Adjustments":"Content Adjustments","Adjust Font Size":"Adjust Font Size","Highlight Title":"Highlight Title","Highlight Links":"Highlight Links","Readable Font":"Readable Font","Color Adjustments":"Color Adjustments","Dark Contrast":"Dark Contrast","Light Contrast":"Light Contrast","High Contrast":"High Contrast","High Saturation":"High Saturation","Low Saturation":"Low Saturation","Monochrome":"Monochrome","Tools":"Tools","Reading Guide":"Reading Guide","Stop Animations":"Stop Animations","Big Cursor":"Big Cursor","Increase Font Size":"Increase Font Size","Decrease Font Size":"Decrease Font Size","Letter Spacing":"Letter Spacing","Line Height":"Line Height","Font Weight":"Font Weight","Dyslexia Font":"Dyslexia Font","Language":"Language","Open Accessibility Menu":"Open Accessibility Menu","Global settings":"Global settings","My preferences":"My preferences"}'
        ),
        es: JSON.parse(
            '{"Accessibility Menu":"Menú de accesibilidad","Reset settings":"Restablecer configuración","Close":"Cerrar","Content Adjustments":"Ajustes de contenido","Adjust Font Size":"Ajustar el tamaño de fuente","Highlight Title":"Destacar título","Highlight Links":"Destacar enlaces","Readable Font":"Fuente legible","Color Adjustments":"Ajustes de color","Dark Contrast":"Contraste oscuro","Light Contrast":"Contraste claro","High Contrast":"Alto contraste","High Saturation":"Alta saturación","Low Saturation":"Baja saturación","Monochrome":"Monocromo","Tools":"Herramientas","Reading Guide":"Guía de lectura","Stop Animations":"Detener animaciones","Big Cursor":"Cursor grande","Increase Font Size":"Aumentar tamaño de fuente","Decrease Font Size":"Reducir tamaño de fuente","Letter Spacing":"Espaciado entre letras","Line Height":"Altura de línea","Font Weight":"Grosor de fuente","Dyslexia Font":"Fuente para dislexia","Language":"Idioma","Open Accessibility Menu":"Abrir menú de accesibilidad","Global settings":"Configuración global","My preferences":"Mis preferencias"}'
        ),
        fi: JSON.parse(
            '{"Accessibility Menu":"Saavutettavuusvalikko","Reset settings":"Palauta asetukset","Close":"Sulje","Content Adjustments":"Sisällön säädöt","Adjust Font Size":"Säädä fonttikokoa","Highlight Title":"Korosta otsikko","Highlight Links":"Korosta linkit","Readable Font":"Helposti luettava fontti","Color Adjustments":"Värien säädöt","Dark Contrast":"Tumma kontrasti","Light Contrast":"Vaalea kontrasti","High Contrast":"Korkea kontrasti","High Saturation":"Korkea kylläisyys","Low Saturation":"Matala kylläisyys","Monochrome":"Yksivärinen","Tools":"Työkalut","Reading Guide":"Lukemisopas","Stop Animations":"Pysäytä animaatiot","Big Cursor":"Iso kohdistin","Increase Font Size":"Suurenna fonttikokoa","Decrease Font Size":"Pienennä fonttikokoa","Letter Spacing":"Kirjainten välistys","Line Height":"Rivin korkeus","Font Weight":"Fontin paksuus","Dyslexia Font":"Dysleksiafontti","Language":"Kieli","Open Accessibility Menu":"Avaa saavutettavuusvalikko","Global settings":"Globaalit asetukset","My preferences":"Omat asetukset"}'
        ),
        fr: JSON.parse(
            '{"Accessibility Menu":"Menu d\'accessibilité","Reset settings":"Réinitialiser les paramètres","Close":"Fermer","Content Adjustments":"Ajustements de contenu","Adjust Font Size":"Ajuster la taille de police","Highlight Title":"Surligner le titre","Highlight Links":"Surligner les liens","Readable Font":"Police lisible","Color Adjustments":"Ajustements de couleur","Dark Contrast":"Contraste foncé","Light Contrast":"Contraste clair","High Contrast":"Contraste élevé","High Saturation":"Saturation élevée","Low Saturation":"Saturation faible","Monochrome":"Monochrome","Tools":"Outils","Reading Guide":"Guide de lecture","Stop Animations":"Arrêter les animations","Big Cursor":"Gros curseur","Increase Font Size":"Augmenter la taille de police","Decrease Font Size":"Réduire la taille de police","Letter Spacing":"Espacement des lettres","Line Height":"Hauteur de ligne","Font Weight":"Poids de la police","Dyslexia Font":"Police dyslexie","Language":"Langue","Open Accessibility Menu":"Ouvrir le menu d\'accessibilité","Global settings":"Paramètres globaux","My preferences":"Mes préférences"}'
        ),
        he: JSON.parse(
            '{"Accessibility Menu":"תפריט נגישות","Reset settings":"איפוס הגדרות","Close":"סגור","Content Adjustments":"התאמות תוכן","Adjust Font Size":"התאם גודל פונט","Highlight Title":"הדגש כותרת","Highlight Links":"הדגש קישורים","Readable Font":"פונט קריא","Color Adjustments":"התאמות צבע","Dark Contrast":"ניגודיות כהה","Light Contrast":"ניגודיות בהירה","High Contrast":"ניגודיות גבוהה","High Saturation":"רווי צבע גבוה","Low Saturation":"רווי צבע נמוך","Monochrome":"מונוכרום","Tools":"כלים","Reading Guide":"מדריך קריאה","Stop Animations":"עצירת אנימציות","Big Cursor":"סמן גדול","Increase Font Size":"הגדל גודל פונט","Decrease Font Size":"הקטן גודל פונט","Letter Spacing":"מרווח בין אותיות","Line Height":"גובה שורה","Font Weight":"משקל הפונט","Dyslexia Font":"פונט לדיסלקטים","Language":"שפה","Open Accessibility Menu":"פתח תפריט נגישות","Global settings":"הגדרות כלליות","My preferences":"העדפות שלי"}'
        ),
        hi: JSON.parse(
            '{"Accessibility Menu":"सुलभता मेनू","Reset settings":"सेटिंग्स रीसेट करें","Close":"बंद करें","Content Adjustments":"सामग्री समायोजन","Adjust Font Size":"फ़ॉन्ट आकार समायोजित करें","Highlight Title":"शीर्षक को हाइलाइट करें","Highlight Links":"लिंक को हाइलाइट करें","Readable Font":"पढ़ने योग्य फ़ॉन्ट","Color Adjustments":"रंग समायोजन","Dark Contrast":"गहरा कंट्रास्ट","Light Contrast":"हल्का कंट्रास्ट","High Contrast":"उच्च कंट्रास्ट","High Saturation":"उच्च संतृप्ति","Low Saturation":"निम्न संतृप्ति","Monochrome":"एकरंगी","Tools":"उपकरण","Reading Guide":"पढ़ाई गाइड","Stop Animations":"एनिमेशन रोकें","Big Cursor":"बड़ा कर्सर","Increase Font Size":"फ़ॉन्ट आकार बढ़ाएँ","Decrease Font Size":"फ़ॉन्ट आकार घटाएँ","Letter Spacing":"अक्षर अंतर","Line Height":"लाइन ऊँचाई","Font Weight":"फ़ॉन्ट वज़न","Dyslexia Font":"डिस्लेक्सिया फ़ॉन्ट","Language":"भाषा","Open Accessibility Menu":"सुलभता मेनू खोलें","Global settings":"वैश्विक सेटिंग्स","My preferences":"मेरी प्राथमिकताएँ"}'
        ),
        hr: JSON.parse(
            '{"Accessibility Menu":"Izbornik Pristupačnosti","Reset settings":"Resetiraj postavke","Close":"Zatvori","Content Adjustments":"Prilagodbe Sadržaja","Adjust Font Size":"Prilagodi Veličinu Fonta","Highlight Title":"Istakni Naslove","Highlight Links":"Istakni Poveznice","Readable Font":"Čitljiv Font","Color Adjustments":"Prilagodbe Boja","Dark Contrast":"Tamni Kontrast","Light Contrast":"Svijetli Kontrast","High Contrast":"Visoki Kontrast","High Saturation":"Visoka Zasićenost","Low Saturation":"Niska Zasićenost","Monochrome":"Jednobojno","Tools":"Alati","Reading Guide":"Vodič Za Čitanje","Stop Animations":"Zaustavi Animacije","Big Cursor":"Veliki Kursor","Increase Font Size":"Povećaj Veličinu Fonta","Decrease Font Size":"Smanji Veličinu Fonta","Letter Spacing":"Razmak Između Slova","Line Height":"Visina Linije","Font Weight":"Debljina Fonta","Dyslexia Font":"Font Za Disleksiju","Language":"Jezik","Open Accessibility Menu":"Otvori Izbornik Pristupačnosti","Global settings":"Globalne postavke","My preferences":"Moje postavke"}'
        ),
        hu: JSON.parse(
            '{"Accessibility Menu":"Hozzáférhetőségi menü","Reset settings":"Beállítások visszaállítása","Close":"Bezárás","Content Adjustments":"Tartalom beállításai","Adjust Font Size":"Betűméret beállítása","Highlight Title":"Cím kiemelése","Highlight Links":"Linkek kiemelése","Readable Font":"Olvasható betűtípus","Color Adjustments":"Színbeállítások","Dark Contrast":"Sötét kontraszt","Light Contrast":"Világos kontraszt","High Contrast":"Magas kontraszt","High Saturation":"Magas telítettség","Low Saturation":"Alacsony telítettség","Monochrome":"Monokróm","Tools":"Eszközök","Reading Guide":"Olvasási útmutató","Stop Animations":"Animációk leállítása","Big Cursor":"Nagy kurzor","Increase Font Size":"Betűméret növelése","Decrease Font Size":"Betűméret csökkentése","Letter Spacing":"Betűtávolság","Line Height":"Sor magasság","Font Weight":"Betűtípus vastagsága","Dyslexia Font":"Dyslexia betűtípus","Language":"Nyelv","Open Accessibility Menu":"Hozzáférhetőségi menü megnyitása","Global settings":"Globális beállítások","My preferences":"Saját beállításaim"}'
        ),
        id: JSON.parse(
            '{"Accessibility Menu":"Menu Aksesibilitas","Reset settings":"Atur Ulang Pengaturan","Close":"Tutup","Content Adjustments":"Penyesuaian Konten","Adjust Font Size":"Sesuaikan Ukuran Font","Highlight Title":"Sorot Judul","Highlight Links":"Sorot Tautan","Readable Font":"Font Mudah Dibaca","Color Adjustments":"Penyesuaian Warna","Dark Contrast":"Kontras Gelap","Light Contrast":"Kontras Terang","High Contrast":"Kontras Tinggi","High Saturation":"Saturasi Tinggi","Low Saturation":"Saturasi Rendah","Monochrome":"Monokrom","Tools":"Alat","Reading Guide":"Panduan Membaca","Stop Animations":"Hentikan Animasi","Big Cursor":"Kursor Besar","Increase Font Size":"Perbesar Ukuran Font","Decrease Font Size":"Perkecil Ukuran Font","Letter Spacing":"Jarak Huruf","Line Height":"Tinggi Baris","Font Weight":"Ketebalan Font","Dyslexia Font":"Font Disleksia","Language":"Bahasa","Open Accessibility Menu":"Buka menu aksesibilitas","Global settings":"Pengaturan global","My preferences":"Preferensi saya"}'
        ),
        it: JSON.parse(
            '{"Accessibility Menu":"Menu di accessibilità","Reset settings":"Ripristina impostazioni","Close":"Chiudi","Content Adjustments":"Regolazioni del contenuto","Adjust Font Size":"Regola la dimensione del carattere","Highlight Title":"Evidenzia il titolo","Highlight Links":"Evidenzia i collegamenti","Readable Font":"Carattere leggibile","Color Adjustments":"Regolazioni del colore","Dark Contrast":"Contrasto scuro","Light Contrast":"Contrasto chiaro","High Contrast":"Alto contrasto","High Saturation":"Alta saturazione","Low Saturation":"Bassa saturazione","Monochrome":"Monocromatico","Tools":"Strumenti","Reading Guide":"Guida alla lettura","Stop Animations":"Arresta le animazioni","Big Cursor":"Cursore grande","Increase Font Size":"Aumenta la dimensione del carattere","Decrease Font Size":"Diminuisci la dimensione del carattere","Letter Spacing":"Spaziatura delle lettere","Line Height":"Altezza della linea","Font Weight":"Peso del carattere","Dyslexia Font":"Carattere per dislessia","Language":"Lingua","Open Accessibility Menu":"Apri il menu di accessibilità","Global settings":"Impostazioni globali","My preferences":"Le mie preferenze"}'
        ),
        ja: JSON.parse(
            '{"Accessibility Menu":"アクセシビリティメニュー","Reset settings":"設定をリセット","Close":"閉じる","Content Adjustments":"コンテンツ調整","Adjust Font Size":"フォントサイズを調整","Highlight Title":"タイトルを強調表示","Highlight Links":"リンクを強調表示","Readable Font":"読みやすいフォント","Color Adjustments":"色の調整","Dark Contrast":"ダークコントラスト","Light Contrast":"ライトコントラスト","High Contrast":"高いコントラスト","High Saturation":"彩度が高い","Low Saturation":"彩度が低い","Monochrome":"モノクロ","Tools":"ツール","Reading Guide":"読み上げガイド","Stop Animations":"アニメーションを停止","Big Cursor":"大きなカーソル","Increase Font Size":"フォントサイズを大きくする","Decrease Font Size":"フォントサイズを小さくする","Letter Spacing":"文字間隔","Line Height":"行の高さ","Font Weight":"フォントの太さ","Dyslexia Font":"ディスレクシア用フォント","Language":"言語","Open Accessibility Menu":"アクセシビリティメニューを開く","Global settings":"グローバル設定","My preferences":"私の設定"}'
        ),
        ka: JSON.parse(
            '{"Accessibility Menu":"წვდომადობის მენიუ","Reset settings":"პარამეტრების განულება","Close":"დახურვა","Content Adjustments":"შიგთავსის მორგება","Adjust Font Size":"ფონტის ზომის მორგება","Highlight Title":"სათაურის გამოკვეთა","Highlight Links":"ბმულების გამოკვეთა","Readable Font":"წაკითხვადი ტექსტი","Color Adjustments":"ფერების მორგება","Dark Contrast":"მუქი კონტრასტი","Light Contrast":"ნათელი კონტრასტი","High Contrast":"მაღალი კონტრასტი","High Saturation":"მაღალი გაჯერება","Low Saturation":"დაბალი გაჯერება","Monochrome":"ერთფეროვანი","Tools":"ხელსაწყოები","Reading Guide":"კითხვის დამხმარე","Stop Animations":"ანიმაციების გაჩერება","Big Cursor":"დიდი კურსორი","Increase Font Size":"ფონტის ზომის გაზრდა","Decrease Font Size":"ფონტის ზომის შემცირება","Letter Spacing":"ასოების დაშორება","Line Height":"ხაზის სიმაღლე","Font Weight":"ფონტის სისქე","Dyslexia Font":"დისლექსიის ფონტი","Language":"ენა","Open Accessibility Menu":"წვდომადობის მენიუს გახსნა","Global settings":"გლობალური პარამეტრები","My preferences":"ჩემი პარამეტრები"}'
        ),
        ko: JSON.parse(
            '{"Accessibility Menu":"접근성 메뉴","Reset settings":"설정 초기화","Close":"닫기","Content Adjustments":"콘텐츠 조정","Adjust Font Size":"글꼴 크기 조정","Highlight Title":"제목 강조","Highlight Links":"링크 강조","Readable Font":"읽기 쉬운 글꼴","Color Adjustments":"색상 조정","Dark Contrast":"어두운 대비","Light Contrast":"밝은 대비","High Contrast":"높은 대비","High Saturation":"높은 채도","Low Saturation":"낮은 채도","Monochrome":"단색","Tools":"도구","Reading Guide":"읽기 가이드","Stop Animations":"애니메이션 중지","Big Cursor":"큰 커서","Increase Font Size":"글꼴 크기 증가","Decrease Font Size":"글꼴 크기 감소","Letter Spacing":"자간","Line Height":"줄 간격","Font Weight":"글꼴 두께","Dyslexia Font":"난독증 글꼴","Language":"언어","Open Accessibility Menu":"접근성 메뉴 열기","Global settings":"전역 설정","My preferences":"내 기본 설정"}'
        ),
        ms: JSON.parse(
            '{"Accessibility Menu":"Menu Aksesibiliti","Reset settings":"Tetapkan semula tetapan","Close":"Tutup","Content Adjustments":"Penyesuaian Kandungan","Adjust Font Size":"Laraskan Saiz Fon","Highlight Title":"Serlahkan Tajuk","Highlight Links":"Serlahkan Pautan","Readable Font":"Fon Mudah Baca","Color Adjustments":"Penyesuaian Warna","Dark Contrast":"Kontras Gelap","Light Contrast":"Kontras Terang","High Contrast":"Kontras Tinggi","High Saturation":"Saturasi Tinggi","Low Saturation":"Saturasi Rendah","Monochrome":"Monokrom","Tools":"Peralatan","Reading Guide":"Panduan Membaca","Stop Animations":"Hentikan Animasi","Big Cursor":"Kursor Besar","Increase Font Size":"Besarkan Saiz Fon","Decrease Font Size":"Kecilkan Saiz Fon","Letter Spacing":"Ruangan Huruf","Line Height":"Ketinggian Garis","Font Weight":"Ketebalan Fon","Dyslexia Font":"Fon Dyslexia","Language":"Bahasa","Open Accessibility Menu":"Buka menu kebolehcapaian","Global settings":"Tetapan global","My preferences":"Keutamaan saya"}'
        ),
        nl: JSON.parse(
            '{"Accessibility Menu":"Toegankelijkheidsmenu","Reset settings":"Instellingen resetten","Close":"Sluiten","Content Adjustments":"Inhoudsaanpassingen","Adjust Font Size":"Lettergrootte aanpassen","Highlight Title":"Titel markeren","Highlight Links":"Links markeren","Readable Font":"Leesbaar lettertype","Color Adjustments":"Kleur aanpassingen","Dark Contrast":"Donker contrast","Light Contrast":"Licht contrast","High Contrast":"Hoog contrast","High Saturation":"Hoge verzadiging","Low Saturation":"Lage verzadiging","Monochrome":"Monochroom","Tools":"Gereedschappen","Reading Guide":"Leesgids","Stop Animations":"Animaties stoppen","Big Cursor":"Grote cursor","Increase Font Size":"Lettergrootte vergroten","Decrease Font Size":"Lettergrootte verkleinen","Letter Spacing":"Letterafstand","Line Height":"Regelhoogte","Font Weight":"Letterdikte","Dyslexia Font":"Dyslexie lettertype","Language":"Taal","Open Accessibility Menu":"Toegankelijkheidsmenu openen","Global settings":"Globale instellingen","My preferences":"Mijn voorkeuren"}'
        ),
        no: JSON.parse(
            '{"Accessibility Menu":"Tilgjengelighetsmeny","Reset settings":"Tilbakestill innstillinger","Close":"Lukk","Content Adjustments":"Innholdstilpasninger","Adjust Font Size":"Juster skriftstørrelse","Highlight Title":"Fremhev tittel","Highlight Links":"Fremhev lenker","Readable Font":"Lesbar skrifttype","Color Adjustments":"Fargejusteringer","Dark Contrast":"Mørk kontrast","Light Contrast":"Lys kontrast","High Contrast":"Høy kontrast","High Saturation":"Høy metning","Low Saturation":"Lav metning","Monochrome":"Monokrom","Tools":"Verktøy","Reading Guide":"Leseguide","Stop Animations":"Stopp animasjoner","Big Cursor":"Stor peker","Increase Font Size":"Øk skriftstørrelsen","Decrease Font Size":"Reduser skriftstørrelsen","Letter Spacing":"Bokstavavstand","Line Height":"Linjehøyde","Font Weight":"Skriftvekt","Dyslexia Font":"Dysleksisk skrifttype","Language":"Språk","Open Accessibility Menu":"Åpne tilgjengelighetsmeny","Global settings":"Globale innstillinger","My preferences":"Mine preferanser"}'
        ),
        fa: JSON.parse(
            '{"Accessibility Menu":"منوی دسترسی","Reset settings":"بازنشانی تنظیمات","Close":"بستن","Content Adjustments":"تنظیمات محتوا","Adjust Font Size":"تنظیم اندازه فونت","Highlight Title":"برجسته کردن عنوان","Highlight Links":"برجسته کردن لینک‌ها","Readable Font":"فونت خوانا","Color Adjustments":"تنظیمات رنگ","Dark Contrast":"کنتراست تیره","Light Contrast":"کنتراست روشن","High Contrast":"کنتراست بالا","High Saturation":"اشباع بالا","Low Saturation":"اشباع پایین","Monochrome":"تک‌رنگ","Tools":"ابزارها","Reading Guide":"راهنمای خواندن","Stop Animations":"توقف انیمیشن‌ها","Big Cursor":"مؤشر بزرگ","Increase Font Size":"افزایش اندازه فونت","Decrease Font Size":"کاهش اندازه فونت","Letter Spacing":"فاصله بین حروف","Line Height":"ارتفاع خط","Font Weight":"وزن فونت","Dyslexia Font":"فونت دیسلکسی","Language":"زبان","Open Accessibility Menu":"بازکردن منوی دسترسی","Global settings":"تنظیمات جهانی","My preferences":"تنظیمات من"}'
        ),
        pl: JSON.parse(
            '{"Accessibility Menu":"Menu dostępności","Reset settings":"Reset ustawień","Close":"Zamknij","Content Adjustments":"Dostosowanie zawartości","Adjust Font Size":"Dostosuj rozmiar czcionki","Highlight Title":"Podświetl tytuły","Highlight Links":"Podświetl linki","Readable Font":"Czytelna czcionka","Color Adjustments":"Dostosowanie kolorów","Dark Contrast":"Ciemny kontrast","Light Contrast":"Jasny kontrast","High Contrast":"Wysoki kontrast","High Saturation":"Wysoka saturacja","Low Saturation":"Niska saturacja","Monochrome":"Monochromatyczność","Tools":"Narzędzia","Reading Guide":"Pomocnik czytania","Stop Animations":"Wstrzymaj animacje","Big Cursor":"Duży kursor","Increase Font Size":"Zwiększ rozmiar czcionki","Decrease Font Size":"Zmniejsz rozmiar czcionki","Letter Spacing":"Odstępy między literami","Line Height":"Wysokość wierszy","Font Weight":"Pogrubiona czcionka","Dyslexia Font":"Czcionka dla dyslektyków","Language":"Język","Open Accessibility Menu":"Otwórz menu dostępności","Global settings":"Ustawienia globalne","My preferences":"Moje preferencje"}'
        ),
        pt: JSON.parse(
            '{"Accessibility Menu":"Menu de Acessibilidade","Reset settings":"Redefinir configurações","Close":"Fechar","Content Adjustments":"Ajustes de Conteúdo","Adjust Font Size":"Ajustar Tamanho da Fonte","Highlight Title":"Destacar Título","Highlight Links":"Destacar Links","Readable Font":"Fonte Legível","Color Adjustments":"Ajustes de Cor","Dark Contrast":"Contraste Escuro","Light Contrast":"Contraste Claro","High Contrast":"Alto Contraste","High Saturation":"Saturação Alta","Low Saturation":"Saturação Baixa","Monochrome":"Monocromático","Tools":"Ferramentas","Reading Guide":"Guia de Leitura","Stop Animations":"Parar Animações","Big Cursor":"Cursor Grande","Increase Font Size":"Aumentar Tamanho da Fonte","Decrease Font Size":"Diminuir Tamanho da Fonte","Letter Spacing":"Espaçamento entre Letras","Line Height":"Altura da Linha","Font Weight":"Espessura da Fonte","Dyslexia Font":"Fonte para Dislexia","Language":"Idioma","Open Accessibility Menu":"Abrir menu de acessibilidade","Global settings":"Configurações globais","My preferences":"Minhas preferências"}'
        ),
        ro: JSON.parse(
            '{"Accessibility Menu":"Meniu de accesibilitate","Reset settings":"Resetează setările","Close":"Închide","Content Adjustments":"Ajustări conținut","Adjust Font Size":"Ajustează dimensiunea fontului","Highlight Title":"Evidențiază titlul","Highlight Links":"Evidențiază legăturile","Readable Font":"Font lizibil","Color Adjustments":"Ajustări de culoare","Dark Contrast":"Contrast întunecat","Light Contrast":"Contrast luminos","High Contrast":"Contrast ridicat","High Saturation":"Saturație ridicată","Low Saturation":"Saturație redusă","Monochrome":"Monocrom","Tools":"Instrumente","Reading Guide":"Ghid de lectură","Stop Animations":"Opriți animațiile","Big Cursor":"Cursor mare","Increase Font Size":"Mărește dimensiunea fontului","Decrease Font Size":"Micșorează dimensiunea fontului","Letter Spacing":"Spațierea literelor","Line Height":"Înălțimea liniei","Font Weight":"Grosimea fontului","Dyslexia Font":"Font pentru dislexie","Language":"Limbă","Open Accessibility Menu":"Deschideți meniul de accesibilitate","Global settings":"Setări globale","My preferences":"Preferințele mele"}'
        ),
        ru: JSON.parse(
            '{"Accessibility Menu":"Меню специальных возможностей","Reset settings":"Сброс настроек","Close":"Закрыть","Content Adjustments":"Корректировка контента","Adjust Font Size":"Настройка размера шрифта","Highlight Title":"Выделить заголовки","Highlight Links":"Выделить ссылки","Readable Font":"Читаемый шрифт","Color Adjustments":"Коррекция цвета","Dark Contrast":"Темный контраст","Light Contrast":"Светлый контраст","High Contrast":"Высокий контраст","High Saturation":"Высокая насыщенность","Low Saturation":"Низкая насыщенность","Monochrome":"Монохромный цвет","Tools":"Инструменты","Reading Guide":"Руководство по чтению","Stop Animations":"Остановить анимацию","Big Cursor":"Большой курсор","Increase Font Size":"Увеличить размер шрифта","Decrease Font Size":"Уменьшить размер шрифта","Letter Spacing":"Межбуквенное расстояние","Line Height":"Высота линии","Font Weight":"Вес шрифта","Dyslexia Font":"Шрифт Дислексия","Language":"Язык","Open Accessibility Menu":"Открыть меню специальных возможностей","Global settings":"Глобальные настройки","My preferences":"Мои предпочтения"}'
        ),
        sl: JSON.parse(
            '{"Accessibility Menu":"Meni dostopnosti","Reset settings":"Ponastavi nastavitve","Close":"Zapri","Content Adjustments":"Prilagoditve vsebine","Adjust Font Size":"Prilagodi velikost pisave","Highlight Title":"Označi naslov","Highlight Links":"Označi povezave","Readable Font":"Bralna pisava","Color Adjustments":"Prilagoditve barv","Dark Contrast":"Temni kontrast","Light Contrast":"Svetli kontrast","High Contrast":"Visoki kontrast","High Saturation":"Visoka nasičenost","Low Saturation":"Nizka nasičenost","Monochrome":"Monokromno","Tools":"Orodja","Reading Guide":"Bralni vodnik","Stop Animations":"Ustavi animacije","Big Cursor":"Velik kazalec","Increase Font Size":"Povečaj velikost pisave","Decrease Font Size":"Zmanjšaj velikost pisave","Letter Spacing":"Razmik med črkami","Line Height":"Višina vrstice","Font Weight":"Debelina pisave","Dyslexia Font":"Pisava za disleksijo","Language":"Jezik","Open Accessibility Menu":"Odpri meni dostopnosti","Global settings":"Globalne nastavitve","My preferences":"Moje nastavitve"}'
        ),
        sk: JSON.parse(
            '{"Accessibility Menu":"Menu prístupnosti","Reset settings":"Obnoviť nastavenia","Close":"Zavrieť","Content Adjustments":"Nastavenia obsahu","Adjust Font Size":"Prispôsobiť veľkosť písma","Highlight Title":"Zvýrazniť nadpis","Highlight Links":"Zvýrazniť odkazy","Readable Font":"Čitateľné písmo","Color Adjustments":"Nastavenia farieb","Dark Contrast":"Tmavý kontrast","Light Contrast":"Svetlý kontrast","High Contrast":"Vysoký kontrast","High Saturation":"Vysoká saturácia","Low Saturation":"Nízka saturácia","Monochrome":"Monochromatické","Tools":"Nástroje","Reading Guide":"Sprievodca čítaním","Stop Animations":"Zastaviť animácie","Big Cursor":"Veľký kurzor","Increase Font Size":"Zväčšiť veľkosť písma","Decrease Font Size":"Zmenšiť veľkosť písma","Letter Spacing":"Rozostup písmen","Line Height":"Výška riadku","Font Weight":"Tlak písma","Dyslexia Font":"Písmo pre dyslexiu","Language":"Jazyk","Open Accessibility Menu":"Otvoriť menu prístupnosti","Global settings":"Globálne nastavenia","My preferences":"Moje preferencie"}'
        ),
        sr: JSON.parse(
            '{"Accessibility Menu":"Meni za pristupačnost","Reset settings":"Resetuj postavke","Close":"Zatvori","Content Adjustments":"Podešavanje sadržaja","Adjust Font Size":"Podešavanje veličine fonta","Highlight Title":"Označi naslove","Highlight Links":"Označi veze","Readable Font":"Čitljiviji font","Color Adjustments":"Podešavanje boja","Dark Contrast":"Tamni kontrast","Light Contrast":"Svetli kontrast","High Contrast":"Visoki kontrast","High Saturation":"Visoka zasićenost","Low Saturation":"Niska zasićenost","Monochrome":"Jednobojni","Tools":"Alati","Reading Guide":"Vodič za čitanje","Stop Animations":"Zaustavi animacije","Big Cursor":"Veliki kursor","Increase Font Size":"Povećaj veličinu fonta","Decrease Font Size":"Smanji veličinu fonta","Letter Spacing":"Razmak slova","Line Height":"Visina linije","Font Weight":"Debljina fonta","Dyslexia Font":"Font za disleksičare","Language":"Jezik","Open Accessibility Menu":"Otvori meni za pristupačnost","Global settings":"Globalna podešavanja","My preferences":"Moje postavke"}'
        ),
        "sr-SP": JSON.parse(
            '{"Accessibility Menu":"Мени За Приступачност","Reset settings":"Ресетуј поставке","Close":"Затвори","Content Adjustments":"Подешавање Садржаја","Adjust Font Size":"Подешавање Величине Фонта","Highlight Title":"Означи Наслове","Highlight Links":"Означи Везе","Readable Font":"Читљивији Фонт","Color Adjustments":"Подешавање Боја","Dark Contrast":"Тамни Контраст","Light Contrast":"Светли Контраст","High Contrast":"Високи Контраст","High Saturation":"Велика Засиченост","Low Saturation":"Ниска Засиченост","Monochrome":"Једнобојни","Tools":"Алати","Reading Guide":"Водич За Читање","Stop Animations":"Заустави Анимације","Big Cursor":"Велики Курсор","Increase Font Size":"Повећај Величину Фонта","Decrease Font Size":"Смањи Величину Фонта","Letter Spacing":"Размак Слова","Line Height":"Висина Линије","Font Weight":"Дебљина Фонта","Dyslexia Font":"Фонт За Дислексичаре","Language":"Језик","Open Accessibility Menu":"Отвори Мени За Приступачност","Global settings":"Глобална подешавања","My preferences":"Моје преференције"}'
        ),
        ta: JSON.parse(
            '{"Accessibility Menu":"முகவர்திறன் மெனு","Reset settings":"அமைப்புகளை மீட்டமை","Close":"மூடு","Content Adjustments":"உள்ளடக்க சரிசெய்தல்","Adjust Font Size":"எழுத்தளவை சரிசெய்","Highlight Title":"தலைப்பை சிறப்பிக்க","Highlight Links":"இணைப்புகளை சிறப்பிக்க","Readable Font":"படிக்க ஏதுவான எழுத்து","Color Adjustments":"நிறம் சரிசெய்தல்","Dark Contrast":"இருண்ட முரண்பாடு","Light Contrast":"ஒளிரும் முரண்பாடு","High Contrast":"உயர் முரண்பாடு","High Saturation":"உயர் நிறமாற்றம்","Low Saturation":"குறைந்த நிறமாற்றம்","Monochrome":"ஒரே நிறம்","Tools":"கருவிகள்","Reading Guide":"வாசிப்பு வழிகாட்டி","Stop Animations":"அசைவுகளை நிறுத்து","Big Cursor":"பெரிய குறிவைக்கை","Increase Font Size":"எழுத்தளவை அதிகரிக்க","Decrease Font Size":"எழுத்தளவை குறைக்க","Letter Spacing":"எழுத்து இடைவெளி","Line Height":"வரி உயரம்","Font Weight":"எழுத்து தடிமன்","Dyslexia Font":"முகவர்திறன் எழுத்து","Language":"மொழி","Open Accessibility Menu":"முகவர்திறன் மெனுவை திற","Global settings":"உலகளாவிய அமைப்புகள்","My preferences":"என் விருப்பங்கள்"}'
        ),
        tr: JSON.parse(
            '{"Accessibility Menu":"Erişilebilirlik Menüsü","Reset settings":"Ayarları Sıfırla","Close":"Kapat","Content Adjustments":"İçerik Ayarları","Adjust Font Size":"Yazı Tipi Boyutunu Ayarla","Highlight Title":"Başlığı Vurgula","Highlight Links":"Bağlantıları Vurgula","Readable Font":"Okunaklı Yazı Tipi","Color Adjustments":"Renk Ayarları","Dark Contrast":"Koyu Kontrast","Light Contrast":"Açık Kontrast","High Contrast":"Yüksek Kontrast","High Saturation":"Yüksek Doygunluk","Low Saturation":"Düşük Doygunluk","Monochrome":"Tek Renkli","Tools":"Araçlar","Reading Guide":"Okuma Rehberi","Stop Animations":"Animasyonları Durdur","Big Cursor":"Büyük İmleç","Increase Font Size":"Yazı Tipi Boyutunu Artır","Decrease Font Size":"Yazı Tipi Boyutunu Azalt","Letter Spacing":"Harf Aralığı","Line Height":"Satır Yüksekliği","Font Weight":"Yazı Tipi Kalınlığı","Dyslexia Font":"Disleksi Yazı Tipi","Language":"Dil","Open Accessibility Menu":"Erişilebilirlik menüsünü aç","Global settings":"Genel ayarlar","My preferences":"Benim tercihlerim"}'
        ),
        zh_Hans: JSON.parse(
            '{"Accessibility Menu":"辅助功能菜单","Reset settings":"重置设置","Close":"关闭","Content Adjustments":"内容调整","Adjust Font Size":"调整字体大小","Highlight Title":"标题高亮","Highlight Links":"链接高亮","Readable Font":"易读字体","Color Adjustments":"颜色调整","Dark Contrast":"高对比度（黑色）","Light Contrast":"高对比度（白色）","High Contrast":"高对比度","High Saturation":"高饱和度","Low Saturation":"低饱和度","Monochrome":"单色","Tools":"更多设置","Reading Guide":"阅读尺","Stop Animations":"停止闪动","Big Cursor":"放大鼠标","Increase Font Size":"增加字体大小","Decrease Font Size":"减小字体大小","Letter Spacing":"字母间距","Line Height":"行距","Font Weight":"字重","Dyslexia Font":"阅读障碍字体","Language":"语言","Open Accessibility Menu":"打开辅助功能菜单","Global settings":"全局设置","My preferences":"我的偏好"}'
        ),
        zh_Hant: JSON.parse(
            '{"Accessibility Menu":"輔助功能選單","Reset settings":"重置設定","Close":"關閉","Content Adjustments":"內容調整","Adjust Font Size":"調整字體大小","Highlight Title":"標題高亮","Highlight Links":"連結高亮","Readable Font":"易讀字體","Color Adjustments":"顏色調整","Dark Contrast":"高對比度（黑色）","Light Contrast":"高對比度（白色）","High Contrast":"高對比度","High Saturation":"高飽和度","Low Saturation":"低飽和度","Monochrome":"單色","Tools":"更多設置","Reading Guide":"閱讀尺","Stop Animations":"停止動畫","Big Cursor":"放大游標","Increase Font Size":"增加字體大小","Decrease Font Size":"減小字體大小","Letter Spacing":"字母間距","Line Height":"行距","Font Weight":"字重","Dyslexia Font":"閱讀障礙字體","Language":"語言","Open Accessibility Menu":"打開輔助功能選單","Global settings":"全局設置","My preferences":"我的偏好"}'
        ),
        vi: JSON.parse(
            '{"Accessibility Menu":"Menu Truy cập","Reset settings":"Đặt lại cài đặt","Close":"Đóng","Content Adjustments":"Điều chỉnh Nội dung","Adjust Font Size":"Điều chỉnh Kích thước Font chữ","Highlight Title":"Đánh dấu Tiêu đề","Highlight Links":"Đánh dấu Liên kết","Readable Font":"Font chữ Dễ đọc","Color Adjustments":"Điều chỉnh Màu sắc","Dark Contrast":"Tương phản Tối","Light Contrast":"Tương phản Sáng","High Contrast":"Tương phản Cao","High Saturation":"Bão hòa Cao","Low Saturation":"Bão hòa Thấp","Monochrome":"Đơn sắc","Tools":"Công cụ","Reading Guide":"Hướng dẫn Đọc","Stop Animations":"Dừng Hoạt hình","Big Cursor":"Con trỏ Lớn","Increase Font Size":"Tăng Kích thước Font chữ","Decrease Font Size":"Giảm Kích thước Font chữ","Letter Spacing":"Khoảng cách Chữ","Line Height":"Độ Cao dòng","Font Weight":"Độ Đậm của Font chữ","Dyslexia Font":"Font chữ Cho người có Khuyết tật đọc hiểu","Language":"Ngôn ngữ","Open Accessibility Menu":"Mở Menu Truy cập","Global settings":"Cài đặt chung","My preferences":"Tùy chọn của tôi"}'
        ),
    },
    _ = [{
        code: "ar",
        label: "العربية (Arabic)"
    }, {
        code: "bg",
        label: "български (Bulgarian)"
    }, {
        code: "bn",
        label: "বাংলা (Bengali)"
    }, {
        code: "cs",
        label: "čeština (Czech)"
    }, {
        code: "de",
        label: "Deutsch (German)"
    }, {
        code: "el",
        label: "Ελληνικά (Greek)"
    }, {
        code: "en",
        label: "English (English)"
    }, {
        code: "es",
        label: "Español (Spanish)"
    }, {
        code: "fi",
        label: "suomi (Finnish)"
    }, {
        code: "fr",
        label: "Français (French)"
    }, {
        code: "he",
        label: "עברית (Hebrew)"
    }, {
        code: "hi",
        label: "हिन्दी (Hindi)"
    }, {
        code: "hr",
        label: "Hrvatski (Croatian)"
    }, {
        code: "hu",
        label: "Magyar (Hungarian)"
    }, {
        code: "id",
        label: "Bahasa Indonesia (Indonesian)"
    }, {
        code: "it",
        label: "Italiano (Italian)"
    }, {
        code: "ja",
        label: "日本語 (Japanese)"
    }, {
        code: "ka",
        label: "ქართული (Georgian)"
    }, {
        code: "ko",
        label: "한국어 (Korean)"
    }, {
        code: "ms",
        label: "Bahasa Malaysia (Malay)"
    }, {
        code: "nl",
        label: "Nederlands (Dutch)"
    }, {
        code: "no",
        label: "Norsk (Norwegian)"
    }, {
        code: "fa",
        label: "فارسی (Persian)"
    }, {
        code: "pl",
        label: "Polski (Polish)"
    }, {
        code: "pt",
        label: "Português (Portuguese)"
    }, {
        code: "ro",
        label: "Română (Romanian)"
    }, {
        code: "ru",
        label: "Русский (Russian)"
    }, {
        code: "sl",
        label: "slovenščina (Slovenian)"
    }, {
        code: "sk",
        label: "slovenčina (Slovak)"
    }, {
        code: "sr",
        label: "Srpski (Serbian)"
    }, {
        code: "sr-SP",
        label: "Српски (Serbian Cyrillic)"
    }, {
        code: "ta",
        label: "தமிழ் (Tamil)"
    }, {
        code: "tr",
        label: "Türkçe (Turkish)"
    }, {
        code: "zh_Hans",
        label: "简体中文 (Simplified Chinese)"
    }, {
        code: "zh_Hant",
        label: "繁體中文 (Traditional Chinese)"
    }, {
        code: "vi",
        label: "Tiếng Việt (Vietnamese)"
    }];


    function q(t, e) {
        var i = t.getAttribute("data-translate");
        return (!i && e && ((i = e), t.setAttribute("data-translate", i)), (function (t) {
            var e = s().lang;
            return (K[e] || K.en)[t] || t;
        })(i));
    }

    function Y(t) {
        t.querySelectorAll(".asw-card-title, .asw-translate").forEach(function (t) {
            t.innerText = q(t, String(t.innerText || "").trim());
        }),
            t.querySelectorAll("[title]").forEach(function (t) {
                t.setAttribute("title", q(t, t.getAttribute("title")));
            });
    }
    var U = function (t, e) {
        var i = {};
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
        if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (n = Object.getOwnPropertySymbols(t); a < n.length; a++) e.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[a]) && (i[n[a]] = t[n[a]]);
        }
        return i;
    };

    function Q(t) {
        var e,
            i,
            l,
            c,
            g = t.container,
            u = t.position,
            d = U(t, ["container", "position"]),
            h = document.createElement("div");
        h.innerHTML = G;
        var p = h.querySelector(".asw-menu");
        (null == u ? void 0 : u.includes("right")) && ((p.style.right = "0px"), (p.style.left = "auto")), (p.querySelector(".content").innerHTML = W(J)), (p.querySelector(".tools").innerHTML = W(Z, "asw-tools")), (p.querySelector(".contrast").innerHTML = W(E, "asw-filter")),
            h.querySelectorAll(".asw-menu-close, .asw-overlay").forEach(function (t) {
                t.addEventListener("click", function () {
                    N(h, !1);
                });
            }),
            p.querySelectorAll(".asw-adjust-font div[role='button']").forEach(function (t) {
                t.addEventListener("click", function () {
                    var e,
                        i = null !== (e = o("fontSize")) && void 0 !== e ? e : 1;
                    t.classList.contains("asw-minus") ? (i -= 0.1) : (i += 0.1), (i = Math.max(i, 0.1)), (i = Math.min(i, 2)), r((i = Number(i.toFixed(2))) || 1), n({
                        fontSize: i
                    });
                });
            }),
            p.querySelectorAll(".asw-btn").forEach(function (t) {
                t.addEventListener("click", function () {
                    var e,
                        i = t.dataset.key,
                        a = !t.classList.contains("asw-selected");
                    t.classList.contains("asw-filter") ? (p.querySelectorAll(".asw-filter").forEach(function (t) {
                        t.classList.remove("asw-selected");
                    }),
                        n({
                            contrast: !!a && i
                        }),
                        a && t.classList.add("asw-selected"),
                        w()) : (t.classList.toggle("asw-selected", a), n((((e = {})[i] = a), e)), P());
                });
            }),
            null === (e = p.querySelector(".asw-menu-reset")) ||
            void 0 === e ||
            e.addEventListener("click", function () {
                !(function () {
                    var t;
                    a({
                        states: {}
                    }),
                        V(),
                        null === (t = null === document || void 0 === document ? void 0 : document.querySelectorAll(".asw-selected")) ||
                        void 0 === t ||
                        t.forEach(function (t) {
                            var e;
                            return null === (e = null == t ? void 0 : t.classList) || void 0 === e ? void 0 : e.remove("asw-selected");
                        });
                })();
            });
        var m = s(),
            v = Number(null === (i = null == m ? void 0 : m.states) || void 0 === i ? void 0 : i.fontSize) || 1;
        1 != v && (p.querySelector(".asw-amount").innerHTML = "".concat(100 * v, "%"));
        var b = p.querySelector("#asw-language");
        if (
            ((b.innerHTML = _.map(function (t) {
                return '<option value="'.concat(t.code, '">').concat(t.label, "</option>");
            }).join("")),
                m.lang !== d.lang && a({
                    lang: d.lang
                }), (b.value = (null == d ? void 0 : d.lang) || "en"),
                null == b ||
                b.addEventListener("change", function () {
                    a({
                        lang: b.value
                    }), Y(g);
                }),
                Y(p),
                m.states)
        )
            for (var S in m.states)
                if (m.states[S] && "fontSize" !== S) {
                    var y = "contrast" === S ? m.states[S] : S;
                    null === (c = null === (l = p.querySelector('.asw-btn[data-key="'.concat(y, '"]'))) || void 0 === l ? void 0 : l.classList) || void 0 === c || c.add("asw-selected");
                }
        return g.appendChild(h), h;
    }
    var X = function () {
        return (
            (X =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                    return t;
                }),
            X.apply(this, arguments)
        );
    };
    var $ = function () {
        return (
            ($ =
                Object.assign ||
                function (t) {
                    for (var e, i = 1, n = arguments.length; i < n; i++)
                        for (var a in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
                    return t;
                }),
            $.apply(this, arguments)
        );
    },
        tt = {
            lang: "en",
            position: "bottom-left"
        };

    function et(t) {
        var e = $({}, tt);
        try {
            var i = s(!1);
            (e = $($({}, e), i)), V();
        } catch (t) { }
        a((e = $($({}, e), t))), (function (t) {
            var e,
                i,
                n,
                a,
                o,
                s,
                r = t.position,
                l = void 0 === r ? "bottom-left" : r,
                c = t.offset,
                g = void 0 === c ? [20, 20] : c,
                u = document.createElement("div");
            (u.innerHTML = I), u.classList.add("asw-container");
            var d,
                h = u.querySelector(".asw-menu-btn"),
                p = null !== (e = null == g ? void 0 : g[0]) && void 0 !== e ? e : 20,
                m = null !== (i = null == g ? void 0 : g[1]) && void 0 !== i ? i : 25,
                v = {
                    left: "".concat(p, "px"),
                    bottom: "".concat(m, "px")
                };
            "bottom-right" === l
                ?
                (v = X(X({}, v), {
                    right: "".concat(p, "px"),
                    left: "auto"
                })) : "top-left" === l ? (v = X(X({}, v), {
                    top: "".concat(m, "px"),
                    bottom: "auto"
                })) : "center-left" === l ? (v = X(X({}, v), {
                    bottom: "calc(50% - (55px / 2) - ".concat(null !== (n = null == g ? void 0 : g[1]) && void 0 !== n ? n : 0, "px)")
                })) : "top-right" === l ? (v = {
                    top: "".concat(m, "px"),
                    bottom: "auto",
                    right: "".concat(p, "px"),
                    left: "auto"
                }) : "center-right" === l ? (v = {
                    right: "".concat(p, "px"),
                    left: "auto",
                    bottom: "calc(50% - (55px / 2) - ".concat(null !== (a = null == g ? void 0 : g[1]) && void 0 !== a ? a : 0, "px)")
                }) : "bottom-center" === l ? (v = X(X({}, v), {

                    bottom: "auto", left: "calc(50% - (55px / 2) - ".concat(null !== (o = null == g ? void 0 : g[0]) && void 0 !== o ? o : 0, "px)")
                })) : "top-center" === l && (v = {
                    top: "".concat(m, "px"),
                    left: "calc(50% - (55px / 2) - ".concat(null !== (s = null == g ? void 0 : g[0]) && void 0 !== s ? s : 0, "px)")
                }),
                Object.assign(h.style, v),
                null == h ||
                h.addEventListener("click", function (e) {
                    e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), d ? N(d) : (d = Q(X(X({}, t), {
                        container: u
                    })));
                }),
                Y(u),
                document.querySelector(".floating-buttons-wrapper").querySelector('#gotop').after(u);

        })(e);
    }

    function it(t) {
        var e;
        return (t = "data-asw-".concat(t)), null === (e = null === document || void 0 === document ? void 0 : document.querySelector("[".concat(t, "]"))) || void 0 === e ? void 0 : e.getAttribute(t);
    }
    document.addEventListener("readystatechange", function t() {
        // Modified by Edwiser
        try {
            // Check if the script is running inside an iframe
            if (window.self !== window.top) {
                // Get the parent page URL (only if same-origin)
                var parentUrl = document.referrer; // Refers to the parent page

                // Check if the parent URL contains 'remui/customizer.php'
                if (parentUrl.includes("remui/customizer.php")) {
                    console.log("Customizer detected, script will not execute.");
                    document.removeEventListener("readystatechange", t);
                    return; // Exit the function
                }
            }
        } catch (error) {
            console.warn("Unable to access parent URL:", error);
        }
        var e, i, n, a, o;
        ("complete" !== document.readyState && "interactive" !== document.readyState) ||
            ((n = it("lang")), (a = it("position")), (o = it("offset")),
                n || (n = null === (i = null === (e = null === document || void 0 === document ? void 0 : document.querySelector("html")) || void 0 === e ? void 0 : e.getAttribute("lang")) || void 0 === i ? void 0 : i.replace(/[_-].*/, "")), !n && "undefined" != typeof navigator && (null === navigator || void 0 === navigator ? void 0 : navigator.language) && (n = null === navigator || void 0 === navigator ? void 0 : navigator.language),
                o &&
                (o = o.split(",").map(function (t) {
                    return parseInt(t);
                })),
                et({
                    lang: n,
                    position: a,
                    offset: o
                }),
                document.removeEventListener("readystatechange", t));
    });
})();
