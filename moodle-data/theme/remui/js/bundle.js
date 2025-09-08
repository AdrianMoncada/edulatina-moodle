/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 2105:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AR": () => (/* binding */ Mode),
/* harmony export */   "S": () => (/* binding */ S),
/* harmony export */   "aw": () => (/* binding */ DarkThemes),
/* harmony export */   "eI": () => (/* binding */ Strings)
/* harmony export */ });
/* unused harmony exports Results, Colors */
const Strings = {
  EMPTY: '',
  TRUE: 't',
  FALSE: 'f',
  OK: '0',
  ERROR: '1',
  NOT_EXISTS: '-2147483648',
  UNDEF: 'undefined'
};
const S = {
  EDGE_LIMITATION_DATE: new Date(2019, 6, 1),
  // - January - index 0 - second parameter
  NOT_EXISTS: -2147483648,
  EXISTS: -2147483647,
  page: null,
  page_cpanel: null,
  mobile: false,
  PAGE_URL: '',
  PAGE_PROTOCOL: '',
  PAGE_HOSTNAME: '',
  IFRAME: '',
  IMAGE_PROCESSING_ENABLED: false,
  URL: '',
  isInitialConvertedCounter: 0,
  IMPORT_CSS_INDEX_LAST_POSITION: 1000 //BIG NUMBER - need to be last element in the DOM order

};
const Results = {
  OK: '0',
  ERROR: '1'
};
const Colors = {
  WHITE: '#fff',
  LIGHT_RED: '#ffd7d7',
  RED: '#f00',
  GRAY128: '#808080',
  GRAY242: '#f2f2f2'
};
const Mode = {
  DARK: 1,
  NORMAL: 2
};
const DarkThemes = {
  THEME_0: 0,
  THEME_1: 1,
  THEME_2: 2
};


/***/ }),

/***/ 3939:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ LRUCache)
/* harmony export */ });
class NodeCache {
  constructor(key, value) {
    this.key = key;
    this.val = value;
    this.newer = null;
    this.older = null;
  }

}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.length = 0;
    this.map = new Map(); // save the head and tail so we can update it easily

    this.head = null;
    this.tail = null;
  }

  node(key, value) {
    return new NodeCache(key, value);
  }

  get(key) {
    if (this.map.has(key)) {
      this.updateKey(key);
      return this.map.get(key).val;
    } else {
      return -1;
    }
  }

  updateKey(key) {
    var node = this.map.get(key); // break the chain and reconnect with newer and older

    if (node.newer) {
      node.newer.older = node.older;
    } else {
      this.head = node.older;
    }

    if (node.older) {
      node.older.newer = node.newer;
    } else {
      this.tail = node.newer;
    } // replace the node into head - newest


    node.older = this.head;
    node.newer = null;

    if (this.head) {
      this.head.newer = node;
    }

    this.head = node; // if no items in the bucket, set the tail to node too.

    if (!this.tail) {
      this.tail = node;
    }
  }

  set(key, value) {
    var node = this.node(key, value); // update the value for exist entries

    if (this.map.has(key)) {
      this.map.get(key).val = value;
      this.updateKey(key);
      return;
    }

    if (this.length >= this.capacity) {
      // remove the least recently used item
      var dKey = this.tail.key;
      this.tail = this.tail.newer;

      if (this.tail) {
        this.tail.older = null;
      }

      var dNodeCache = this.map.get(dKey);

      if (dNodeCache !== undefined) {
        this.length -= dNodeCache.val.length;
        this.map.delete(dKey);
      } //this.length --

    } // insert node into the head


    node.older = this.head; // if have head, we need re-connect node with other nodes older than head

    if (this.head) {
      this.head.newer = node;
    }

    this.head = node; // if no tail which means first insert, set the tail to node too

    if (!this.tail) {
      this.tail = node;
    }

    this.map.set(key, node);
    this.length += node.val.length;
  }

}

/***/ }),

/***/ 9267:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ StyleApplyCache)
/* harmony export */ });
const TYPE_TRANSITION = 1;
const TYPE_WEBGL_IMAGE = 2;
const TYPE_WEBGL_BACKGROUND_SIZE = 3;
class StyleApplyCache {
  constructor() {
    this.timeout = null;
    this.timeout_interval;
    this.cache = [];
    this.apply = this.apply.bind(this);
  }

  onFinish() {
    this.timeout = null;
    this.timeout_interval = 1000;
    this.cache = [];
  }

  clearTimeout() {
    if (this.timeout !== null) clearTimeout(this.timeout);
  }

  addTransitionItem(css_rule, transition_duration) {
    this.clearTimeout();
    this.cache.push([TYPE_TRANSITION, css_rule, transition_duration]);
    this.setTimeout(1000);
  }

  addWebGlImageItem(css_rule, response, priority) {
    this.clearTimeout();
    this.cache.push([TYPE_WEBGL_IMAGE, css_rule, response, priority]);
    this.setTimeout(500);
  }

  addWebGlBackgroundSizeItem(css_rule, imageBackgroundSize, imageBackgroundSizePriority) {
    this.clearTimeout();
    this.cache.push([TYPE_WEBGL_BACKGROUND_SIZE, css_rule, imageBackgroundSize, imageBackgroundSizePriority]);
    this.setTimeout(500);
  }

  setTimeout(max_interval) {
    this.timeout_interval = Math.min(this.timeout_interval, max_interval);
    this.timeout = setTimeout(this.apply, this.timeout_interval);
  }

  apply() {
    for (var i = this.cache.length; i-- > 0;) {
      const item = this.cache[i];

      switch (item[0]) {
        case TYPE_TRANSITION:
          if (item[1].style.transitionDuration === '0s') //someonce has modified it before us
            item[1].style.transitionDuration = item[2];
          break;

        case TYPE_WEBGL_IMAGE:
          item[1].style.setProperty(item[2].property, item[2].css_text, item[3]);
          break;

        case TYPE_WEBGL_BACKGROUND_SIZE:
          item[1].style.setProperty('background-size', item[2], item[3]);
          break;
      }
    }

    this.onFinish();
  }

}

/***/ }),

/***/ 6150:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export Core */
/* harmony import */ var _utilities_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7584);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2172);
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2105);
/* harmony import */ var _style_converter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(559);
/* harmony import */ var _mutation_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4128);

window.PLATFORM = 'chrome';

class Core {
  constructor() {
    this.enabled = true;
    this.local_settings = null;
    this.mode = -1;
    this.state = new _state__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z();
    this.styleConverter = new _style_converter__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z(this.local_settings);
    this.mutationManager = new _mutation_manager__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(this);
  }

  start() {
    if (document.documentElement.hasAttribute('data-reactroot')) {
      var timer = setInterval(() => {
        if (document.readyState === 'complete') {
          clearInterval(timer);
          this.startConverting();
        }
      }, 100);
    } else {
      this.startConverting();
    }
  }

  startConverting() {
    setTimeout(() => {
      //on next iteration of event loop to prevent some site error stops our script
      // if (this.mode === Mode.DARK) {
      this.state.initAndShowLoading(true);
      this.styleConverter.init();
      this.styleConverter.convert();
      this.mutationManager.init(); //}
      this.addDefaultCSS();
    }, 0);
  }

  reinitDomElements() {
    this.mode = parseInt(localStorage.getItem(_utilities_utilities__WEBPACK_IMPORTED_MODULE_0__/* ["default"].LOCAL_STORAGE.MODE */ .Z.LOCAL_STORAGE.MODE));

    if (this.mode !== _constants_constants__WEBPACK_IMPORTED_MODULE_2__/* .Mode.DARK */ .AR.DARK) {
      //not NORMAL mode
      this.addDefaultCSS();
    }

    if (this.mode === _constants_constants__WEBPACK_IMPORTED_MODULE_2__/* .Mode.DARK */ .AR.DARK) {
      //Dark Mode
      this.styleConverter.convertProcedure(true);
    }
  }

  addDefaultCSS() {
    var container = document.head === null ? document.documentElement : document.head; //these styles will be parsed

    var style_n = document.createElement('style');
    style_n.id = 'nighteyedefaultcss'; //        style_n.tgIgnore = true;
    //        style_n.tgParsed = true; // add these and change colors

    style_n.innerHTML = 'html {\
        color:#000;\
        background-image:none !important;\
        background:#fff !important;\
    }\
    body {\
        background-color:#fff;\
        background-image:none !important;\
    }\
    #page {\
      background-color:#090909 !important;\
      background-image:none !important;\
    }\
    input, select, textarea, button {\
        color:#000;\
        background-color:#fff;\
    }\
    font {\
        color:#000;\
    }';
    container.insertBefore(style_n, container.childNodes[0]); //these styles will not be parsed

    style_n = _utilities_utilities__WEBPACK_IMPORTED_MODULE_0__/* ["default"].makeParsedStyleNode */ .Z.makeParsedStyleNode(); //style_n.id = 'nighteyedefaultcss2';

    style_n.innerHTML = 'a {\
                            color:rgb(140,140,250);\
                        }\
                        *::-webkit-scrollbar-track-piece {\
                            background-color:rgba(255, 255, 255, 0.2) !important;\
                        }\
                        *::-webkit-scrollbar-track {\
                            background-color:rgba(255, 255, 255, 0.3) !important;\
                        }\
                        *::-webkit-scrollbar-thumb {\
                            background-color:rgba(255, 255, 255, 0.5) !important;\
                        }\
                        embed[type="application/pdf"] {\
                            filter:invert(1);\
                        }';
    container.insertBefore(style_n, container.childNodes[0]);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Core);


/***/ }),

/***/ 4128:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2105);


class MutationManager {
  constructor(core) {
    this.observer = null;
    this.config = {
      'childList': true,
      'attributes': true,
      'subtree': true,
      'attributeFilter': ['style', 'fill', 'src', 'bgcolor', 'ne']
    };
    this.repeatedElementsMap = [];
    this.running = false;
    this.core = core;
    this.styleConverter = core.styleConverter;
    this.styleConverter.startObserver = this.start.bind(this);
    this.styleConverter.stopObserver = this.stop.bind(this);
  }

  init() {
    this.observer = new MutationObserver(mutations => {
      this.onMutations(mutations);
    });
    this.start();
  }

  onMutations(mutations) {
    if (this.running === false) return;
    setTimeout(() => {
      ++_constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.isInitialConvertedCounter;
      this.process(mutations);
      --_constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.isInitialConvertedCounter;
    }, 0);
  }

  start() {
    this.running = true;
    this.observer.observe(document.documentElement, this.config);
  }

  stop() {
    this.running = false;
    this.observer.disconnect();
  }

  process(mutations) {
    for (var i = mutations.length; i-- > 0;) {
      var mutation = mutations[i];

      if (mutation.target.nodeName === 'HEAD') {
        this.onNodesRemoved(mutation.removedNodes);
      }

      this.onAttributeChange(mutation);
      this.onNodesAdded(mutation.addedNodes);

      if (mutation.target.tagName === 'STYLE') {
        this.styleConverter.convertStyleNodes();
      }
    }
  }

  onNodesRemoved(child_list) {
    for (var i = child_list.length; i-- > 0;) {
      var node = child_list[i];

      if (node.id === 'nighteyedefaultcss') {
        this.reinitContentScripts();
      }
    }
  }

  onNodesAdded(child_list) {
    for (var i = child_list.length; i-- > 0;) {
      var node = child_list[i];
      this.onNodeAdded(node);

      if (typeof node.querySelectorAll !== 'undefined') {
        var inner_nodes = node.querySelectorAll('*');

        for (var j = inner_nodes.length; j-- > 0;) this.onNodeAdded(inner_nodes[j]);
      }
    }
  }

  onNodeAdded(node) {
    if (node.tgIgnore) {
      node.tgIgnore = false;
      return;
    }

    switch (node.tagName) {
      case 'VIDEO':
      case 'CANVAS':
      case 'SCRIPT':
        break;

      case 'LINK':
        if ('import' === node.rel) {
          this.styleConverter.convertLinkImports();
          break;
        }

        if ('stylesheet' !== node.rel) break;
        var currentMedia = node.media;
        node.addEventListener('load', () => {
          var needDownload = currentMedia !== node.media; //when someone add link with media='x only' and then change media to all -> changing media reset file

          this.styleConverter.convertStyleSheetFromMutator(node.sheet, false, needDownload);
        });
      // falls through - no need for break in order ot parse styles if it is already loaded

      case 'STYLE':
        this.styleConverter.convertStyleNodes();
        break;

      case 'IMG':
        this.styleConverter.convertImgNode(node);
      // falls through - no need for break in order ot parse style attribute

      default:
        if (typeof node.getAttribute === 'undefined') return;

        if (node.fileUrl !== undefined) {
          //Edge loop problem - huffingtonpost.com
          return;
        }

        this.styleConverter.convertInlineStyle(node);
        break;
    }
  }

  onAttributeChange(mutation) {
    if (mutation.type !== 'attributes') return;
    if (mutation.target.getAttribute === undefined) return;

    if (mutation.target.tgIgnore) {
      mutation.target.tgIgnore = false;
      return;
    }

    if (mutation.attributeName === 'ne') {
      //night eye attribute
      mutation.target.removeAttribute('ne');
      mutation.target.tgIgnore = false;
      return;
    }

    if (mutation.target.tgIgnoreVariableCounter > 0) {
      --mutation.target.tgIgnoreVariableCounter;
      return;
    }

    if (typeof mutation.target.invokeCounter === 'undefined') {
      mutation.target.invokeCounter = 0;
    } //Different animations, svg, video players - change Class or Attribute in a loop, so mutator invoke indefinitely


    if (++mutation.target.invokeCounter > 50) {
      return;
    }

    switch (mutation.target.tagName) {
      case 'VIDEO':
      case 'CANVAS':
      case 'SCRIPT':
      case 'LINK':
      case 'STYLE':
        break;

      case 'IFRAME':
        this.styleConverter.convertIFrame(mutation.target);
        break;

      case 'IMG':
        this.styleConverter.convertImgNode(mutation.target);
      // falls through - no need for break in order ot parse style attribute

      default:
        this.styleConverter.convertInlineStyle(mutation.target);
        break;
    }
  }

  reinitContentScripts() {
    //Should be uncommented
    this.core.reinitDomElements();
    this.core.state.addCustomStyles();
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MutationManager);

/***/ }),

/***/ 2172:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2105);


class State {
  constructor() {
    this.loading_added = false;
    this.isReady = false;
    this.emergencyCheckCounter = 0;
  }

  initAndShowLoading(isDarkMode) {
    if (this.loading_added === true || this.isReady) return;
    this.loading_added = true;

    if (isDarkMode) {
      //Filter mode
      this.checkDocumentState(isDarkMode); //Emergency - too long browser loading of some stupped script

      setTimeout(() => {
        this.onReady(isDarkMode);
      }, 6000); //========

      return;
    }

    this.onReady(false);
  }

  onReady(isDarkMode) {
    if (this.isReady) {
      return;
    }

    if (isDarkMode) {
      document.documentElement.setAttribute('nighteyeplgn', 'active'); //SLOW
      document.querySelectorAll('.nav-darkmode').forEach(element => {
        element.classList.add("enabled");
      });

      if (window.self === window.top) {//Insert custom styles only in main document, not in inframes
        // this.modifyCustomSites();
      }
    } else {
      document.documentElement.setAttribute('nighteyeplgn', 'disabled'); //SLOW
      document.querySelectorAll('.nav-darkmode').forEach(element => {
        element.classList.remove("enabled");
      });
    }

    this.isReady = true;
  }

  checkDocumentState(isDarkMode) {
    var bodyTimer = setInterval(() => {
      if (document.body === null) {
        return;
      }

      clearInterval(bodyTimer);
      this.checkCSSParsedFinished(isDarkMode);
      var timer = setInterval(() => {
        // console.log("LOOP");
        if (this.checkCSSParsedFinished(isDarkMode) || ++this.emergencyCheckCounter >= 70) {
          //7 seconds
          clearInterval(timer);
        }
      }, 100);
    }, 100);
  }

  checkCSSParsedFinished(isDarkMode) {
    var links = document.documentElement.querySelectorAll('link[rel="stylesheet"]');
    var queryLinksCount = links.length;
    var styleSheetLinksCount = 0;

    for (var i = 0; i < document.styleSheets.length; ++i) {
      if (document.styleSheets[i].ownerNode.nodeName === 'LINK') {
        ++styleSheetLinksCount;
      }

      if (!document.styleSheets[i].ownerNode.tgParsed) {
        return false;
      }
    }

    if (queryLinksCount > styleSheetLinksCount) {
      //this is very important - when <link> is at the bottom of the page, it is not in document.styleSheets on first parse
      return false;
    }

    if (_constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.isInitialConvertedCounter === 0) {
      this.onReady(isDarkMode); // console.log("READY");

      return true;
    }

    return false;
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (State);

/***/ }),

/***/ 559:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export StyleConverter */
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2105);
/* harmony import */ var _utilities_color_color__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(784);
/* harmony import */ var _utilities_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7584);
/* harmony import */ var _libs_lru_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3939);
/* harmony import */ var _utilities_color_color_processor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6866);
/* harmony import */ var _libs_style_apply_cache__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9267);
/* harmony import */ var _webgl_processor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(896);


class StyleConverter {
  constructor(local_settings) {
    this.colorProcessor = new _utilities_color_color_processor__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z();
    this.local_settings = local_settings;
    this.converted = false;
    this.cache_bg = new _libs_lru_cache__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(1 << 22);
    this.cache_fr = new _libs_lru_cache__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z(1 << 22);
    this.startObserver = null;
    this.stopObserver = null;
    this.convertBackground = this.colorProcessor.convertBackgroundColorString.bind(this.colorProcessor);
    this.convertForeground = this.colorProcessor.convertForegroundColorString.bind(this.colorProcessor);
    this.style_apply_cache = new _libs_style_apply_cache__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z();
    this.googleDocsNodeMaps = [];
  }

  init() {
    for (var i = StyleConverter.BACKGROUND_PROPERTIES.length; i-- > 0;) StyleConverter.BACKGROUND_PROPERTIES_SET.add(StyleConverter.BACKGROUND_PROPERTIES[i]);

    for (var j = StyleConverter.FOREGROUND_PROPERTIES.length; j-- > 0;) StyleConverter.FOREGROUND_PROPERTIES_SET.add(StyleConverter.FOREGROUND_PROPERTIES[j]);
  }

  convert() {
    if (this.converted === true) {
      console.error('StyleConverted.convert() must be invoked only once. All other invoked must go through MutationObserver for specific node');
      return;
    }

    this.converted = true;

    if (navigator.userAgent.indexOf('Firefox') === -1) {
      // This breaks docs.google.com
      this.convertProcedure(false);
    } // setTimeout(() => {
    //     console.error("START PROCEDURE");
    //     this.convertProcedure(false);
    // }, 5000);
    // return;
    //This is very important - never remove it


    var timerCounter1 = 0;
    var timer1 = setInterval(() => {
      this.convertProcedure();

      if (document.readyState === 'complete') {
        clearInterval(timer1);
        this.checkForDynamicChanges();

        if (_constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.URL === 'bugs.chromium.org') {
          // Dom Shadow website
          this.checkAndConvertDomShadowElements(document.body);
          setTimeout(() => {
            //There is ajax elements to be loaded
            this.checkAndConvertDomShadowElements(document.body);
          }, 2000);
        }
      }

      if (++timerCounter1 > 50) {
        //emergency, when some website cannot load completely
        clearInterval(timer1);
        this.checkForDynamicChanges();
      }
    }, 300);
  }

  checkForDynamicChanges() {
    // Styled Component - dynamic add classes before use it --> ex: add .Link class with JS to DOM and then append to some popup window
    setInterval(() => {
      this.convertStyleNodes(false);
    }, 1000);
  }

  convertProcedure(isReInit) {
    this.convertStyleNodes(isReInit);
    this.convertIFrames();
    this.convertLinkImports();
    this.convertInlineStyles();
    this.convertImgNodes();
  }

  convertStyleNodes(isReInit) {
    var style_nodes = document.styleSheets;

    for (var i = 0; i < style_nodes.length; ++i) {
      if (style_nodes[i].ownerNode !== null) {
        if (isReInit) {
          style_nodes[i].ownerNode.tgParsed = false;
        }

        if (style_nodes[i].ownerNode.getAttribute('rel') === 'alternate stylesheet') continue;
      }

      this.convertStyleSheet(style_nodes[i], false);
    }
  }

  convertStyleSheetFromMutator(style_sheet, forced, download) {
    this.convertStyleSheet(style_sheet, forced);
    var owner_node = style_sheet.ownerNode;

    if (download) {
      this.downloadCSS(owner_node.href, owner_node, owner_node.media, 0);
    }
  }

  convertIFrames() {
    var iframes_n = document.querySelectorAll('iframe:not([src])');

    for (var i = iframes_n.length; i-- > 0;) this.convertIFrame(iframes_n[i]);

    iframes_n = document.querySelectorAll('iframe[src^="javascript"]');

    for (var j = iframes_n.length; j-- > 0;) this.convertIFrame(iframes_n[j]);
  }

  convertStyleSheets(sheets) {
    for (var j = sheets.length; j-- > 0;) {
      this.convertStyleSheet(sheets[j], false);
    }
  }

  convertLinkImports() {
    var nodes = document.querySelectorAll('link[rel="import"]');

    for (var i = nodes.length; i-- > 0;) {
      var node = nodes[i];
      var importedDocument = node.import;

      if (importedDocument == null) {
        this.addEventListenerLinkImportNode(node);
        continue;
      }

      if (importedDocument.readyState === 'complete') {
        this.convertStyleSheets(importedDocument.styleSheets);
      } else {
        this.addEventListenerLinkImportNode(node);
      }
    }
  }

  addEventListenerLinkImportNode(node) {
    node.addEventListener('load', () => {
      this.convertStyleSheets(node.import.styleSheets);
    });
  }

  convertInlineStyles() {
    var nodes = document.querySelectorAll('[style],[fill],[stroke],[bgcolor]');

    for (var i = nodes.length; i-- > 0;) this.convertInlineStyle(nodes[i]);
  }

  convertImgNodes() {
    var nodes = document.querySelectorAll('img');

    for (var i = nodes.length; i-- > 0;) this.convertImgNode(nodes[i]);
  }

  convertStyleSheet(style_sheet, forced) {
    var owner_node = style_sheet.ownerNode;

    if (owner_node === undefined) {
      return;
    }

    try {
      var parsed_rules_length = owner_node.tg_parsed_rules;

      if (parsed_rules_length !== undefined) {
        if (parseInt(parsed_rules_length) !== style_sheet.cssRules.length) {
          owner_node.tgParsed = false;
        }
      }
    } catch (e) {}

    if (forced === false && owner_node.tgParsed) return; // no idea why, but sometimes styles nodes still do not have innerHTML

    if (owner_node.tagName === 'STYLE' && owner_node.innerHTML.length === 0 && owner_node.cssRules === null) return;
    owner_node.tgParsed = true;

    try {
      owner_node.tg_parsed_rules = style_sheet.cssRules.length;
    } catch (e) {}

    if (owner_node.tagName === 'LINK') {
      var href_css_values = 'data:text/css';

      if (owner_node.href.substring(0, href_css_values.length) === href_css_values) {
        try {
          //Sometimes .cssRules could not be access. This is in try->catch block in order to prevent other logic from breaking
          if (style_sheet.cssRules !== null) //sometimes these values are null, no idea why
            this.processCSSRules(style_sheet.cssRules, owner_node);
        } catch (e) {}
      } else {
        var fontsWebsites = ['https://fonts.go', '.woff'];

        for (var i = 0; i < fontsWebsites.length; ++i) {
          if (owner_node.href.indexOf(fontsWebsites[i]) !== -1) {
            return;
          }
        }

        try {
          if (owner_node.hasAttribute('ng-href')) {
            //AngularJS property in LINK - it refresh the element after some delay and overrides our first parse
            this.downloadCSS(owner_node.href, owner_node, owner_node.media, 0); //download sheet

            return;
          }

          this.processCSSRules(style_sheet.cssRules, owner_node);
        } catch (e) {
          this.downloadCSS(owner_node.href, owner_node, owner_node.media, 0); //download sheet
        }
      }
    } else {
      if (owner_node.hasAttribute('data-styled')) {
        // react library
        this.duplicateAndParseStyleElement(owner_node, owner_node.media, style_sheet.cssRules);
        return;
      }

      this.processCSSRules(style_sheet.cssRules, owner_node);
    }
  }

  convertInlineStyle(node) {
    if (typeof node.getAttribute === 'undefined') return;
    var style_string = node.getAttribute('style');

    if (style_string !== null) {
      var background_properties = [],
          foreground_properties = [];
      var properties = style_string.split(';');

      for (var i = properties.length; i-- > 0;) {
        var dots_index = properties[i].indexOf(':');
        if (dots_index === -1) continue;
        var pair = [properties[i].substring(0, dots_index), properties[i].substring(dots_index + 1)];
        var target_property_name = pair[0].trim();
        if (StyleConverter.BACKGROUND_PROPERTIES_SET.has(target_property_name) === true) background_properties.push(target_property_name);else if (StyleConverter.FOREGROUND_PROPERTIES_SET.has(target_property_name) === true) foreground_properties.push(target_property_name);
      }

      if (_constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.URL === 'docs.google.com') {
        //Google Document - Word
        if (node.className === 'kix-wordhtmlgenerator-word-node') {
          this.parseCSSRule(node, foreground_properties, background_properties);

          if (this.googleDocsNodeMaps[style_string] == null) {
            this.googleDocsNodeMaps[style_string] = 1;
            this.convertGoogleDocsNode(node, style_string);
          }
        } // Google Sheet
        else if (node.className.indexOf('color') > -1) {//docs-material-colorpalette-colorswatch
          //do not convert color pallette
        } else if (node.nodeName === 'SPAN' && node.parentNode !== null && node.parentNode.className !== undefined && node.parentNode.className.indexOf('editable') > -1) {//do not convert colors in edit box
        } else {
          this.parseCSSRule(node, foreground_properties, background_properties);
        }
      } else {
        this.parseCSSRule(node, foreground_properties, background_properties);
      }
    }

    var foreground_attributes = ['text', 'link', 'vlink', 'alink'];

    for (var j = foreground_attributes.length; j-- > 0;) node.removeAttribute(foreground_attributes[j]);

    var fill_string = node.getAttribute('fill');

    if (fill_string !== null) {
      node.tgIgnore = true;
      node.setAttribute('fill', this.colorProcessor.convertBackgroundColorString(fill_string)); //SLOW
    }

    var stroke_string = node.getAttribute('stroke');

    if (stroke_string !== null) {
      node.tgIgnore = true;
      node.setAttribute('stroke', this.colorProcessor.convertForegroundColorString(stroke_string)); //SLOW
    }

    var bgcolor_string = node.getAttribute('bgcolor');

    if (bgcolor_string !== null) {
      node.tgIgnore = true;
      var newBGColor = this.colorProcessor.convertBackgroundColorString(bgcolor_string); //SLOW MAY NOT BE SLOW, MUST BE CHECKED;

      if (bgcolor_string === newBGColor) {
        newBGColor = '#1a1a1a';
      }

      node.style.backgroundColor = newBGColor;
    }
  }

  convertImgNode(node) {//To do: convert svg image in src tag
  }

  convertIFrame(node) {
    var src = node.getAttribute('src');
    if (src !== null && src.indexOf('javascript') !== 0) return;

    try {
      node.contentWindow.document.body.style.backgroundColor = '#292929';
      node.contentWindow.document.body.style.color = '#cecece';
    } catch (e) {}
  }

  downloadCSS(href, owner_node, media, importCSSIndex) {
    if (href === '') return;
    ++_constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.isInitialConvertedCounter;
    href = _utilities_utilities__WEBPACK_IMPORTED_MODULE_1__/* ["default"].makeURL */ .Z.makeURL(href);
    this.executeDownloadCSS(href).then(data => {
      this.processResponseDownloadCSS(data, owner_node, media, href, importCSSIndex);
    }).catch(error => {
      --_constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.isInitialConvertedCounter;
      console.warn('Implement fetch from background - ', error);
    });
  } //Using promise to cath error like crossorign


  executeDownloadCSS(href) {
    return new Promise((resolve, reject) => {
      var ajax = new XMLHttpRequest();
      ajax.open('get', href, true);

      ajax.onerror = (errorV, errorV1) => {
        //ajax.status = 0
        //ajax.readyState = 4
        reject();
        console.clear();
      };

      ajax.onreadystatechange = () => {
        if (ajax.readyState !== 4) return;

        if (ajax.status === 200) {
          resolve(ajax.responseText);
        } else {
          reject();
        }
      };

      ajax.send();
    });
  }

  processResponseDownloadCSS(responseText, owner_node, media, href, importCSSIndex) {
    var isRemovingImports = importCSSIndex === _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.IMPORT_CSS_INDEX_LAST_POSITION;
    var url_parsed_css_text = this.convertImportUrls(responseText, isRemovingImports);

    if (PLATFORM === 'safari') {
      //Fix for baseURI for style
      url_parsed_css_text = this.convertRelativeUrlsToAbsolute(url_parsed_css_text, href);
    }

    var style_n = this.addStyleNodeWithCSSText(href, url_parsed_css_text, owner_node, media, importCSSIndex);
    setTimeout(() => {
      //because of firefox
      this.convertStyleSheet(style_n.sheet, false);
    }, 0);
    --_constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.isInitialConvertedCounter;
  }

  duplicateAndParseStyleElement(owner_node, media, css_rules) {
    var style_n = this.addStyleNodeWithCSSText('', '', owner_node, media, 0);
    var styleSheet = style_n.sheet;

    for (var i = 0; i < css_rules.length; i++) {
      var rule = css_rules[i];
      styleSheet.insertRule(rule.cssText, styleSheet.cssRules.length);
    }

    setTimeout(() => {
      //because of firefox
      this.convertStyleSheet(style_n.sheet, false);
    }, 0);
  }

  checkAndParseImportURL(css_import_rule) {
    var parentHref = css_import_rule.parentStyleSheet.href;
    var parentNodeHref = css_import_rule.parentStyleSheet.ownerNode.href;
    var href = css_import_rule.href;
    var rootPath = '';

    if (href.indexOf('://') > -1) {
      return href;
    } else if (href[0] === '/' && href[1] === '/') {
      return href;
    } else if (href[0] === '/') {
      return _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_PROTOCOL + '//' + _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_HOSTNAME + href;
    } else if (parentHref !== null) {
      rootPath = parentHref.substring(0, parentHref.lastIndexOf('/') + 1);
      return rootPath + href;
    } else if (parentNodeHref !== null) {
      if (parentNodeHref === undefined) {
        return _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_PROTOCOL + '//' + _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_HOSTNAME + '/' + href; //parent node is STYLE, not LINK
      }

      rootPath = parentNodeHref.substring(0, parentNodeHref.lastIndexOf('/') + 1);
      return rootPath + href;
    }

    return _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_URL + '/' + href;
  }

  convertImportUrls(styles, isRemovingImports) {
    var result = '';

    for (var start = 0;;) {
      var import_start_index = styles.indexOf('@import', start);

      if (import_start_index === -1) {
        result += styles.substring(start);
        break;
      }

      var import_end_index = styles.indexOf(';', import_start_index);

      if (import_end_index === -1) {
        result += styles.substring(start);
        break;
      }

      ++import_end_index;
      result += styles.substring(start, import_start_index);
      start = import_end_index;

      if (isRemovingImports) {
        continue;
      }

      var start_offset = 7;

      for (; import_start_index + start_offset < import_end_index; ++start_offset) {
        if (styles[import_start_index + start_offset] !== ' ') break;
      }

      if (styles.substr(import_start_index + start_offset, 4) !== 'url(') {
        var closing_symbol_start_index = import_start_index + start_offset;
        var closing_symbol = styles[closing_symbol_start_index];
        var closing_symbol_end_index = styles.indexOf(closing_symbol, closing_symbol_start_index + 1);

        if (closing_symbol_end_index !== -1) {
          result += '@import url(' + closing_symbol + styles.substring(closing_symbol_start_index + 1, closing_symbol_end_index) + closing_symbol + ')';
          result += styles.substring(closing_symbol_end_index + 1, import_end_index);
          continue;
        }
      }

      result += styles.substring(import_start_index, import_end_index);
    }

    return result;
  }

  convertRelativeUrlsToAbsolute(styles, url) {
    var result = '';
    var urlStub = document.createElement('a');
    urlStub.href = url;
    var baseURL = urlStub.protocol + '//' + urlStub.host + urlStub.pathname.split('/').slice(0, -1).join('/');
    var startPattern = 'url(';
    var start_offset = startPattern.length;
    var endPattern = ')';

    for (var start = 0;;) {
      var import_start_index = styles.indexOf(startPattern, start);

      if (import_start_index === -1) {
        result += styles.substring(start);
        break;
      }

      var import_end_index = styles.indexOf(endPattern, import_start_index + start_offset);

      if (import_end_index === -1) {
        result += styles.substring(start);
        break;
      }

      ++import_end_index;
      result += styles.substring(start, import_start_index);
      start = import_end_index;

      if (styles.substr(import_start_index + start_offset + 1, 1) === '.') {
        var startIndexURL = import_start_index + start_offset;
        var startCharacter = styles.substr(startIndexURL, 1);

        if (startCharacter === '\'' || startCharacter === '"') {
          startIndexURL += 1;
        }

        var endIndexURL = import_end_index - 2;
        var endCharacter = styles.substr(endIndexURL, 1);

        if (endCharacter !== '\'' && endCharacter !== '"') {
          endIndexURL = import_end_index - 1;
        }

        var urlImage = styles.substring(startIndexURL, endIndexURL);
        var absoluteImage = 'url("' + baseURL + '/' + urlImage + '")';
        result += absoluteImage;
        continue;
      }

      result += styles.substring(import_start_index, import_end_index);
    }

    return result;
  }

  convertURLs(styles, parentHref, checkForImportUrls) {
    if (typeof parentHref === 'undefined' || parentHref === null) {
      parentHref = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_URL;
    }

    var locationHref = parentHref.substring(0, parentHref.lastIndexOf('/') + 1);
    var result = '';

    if (checkForImportUrls) {
      //it is not invoked
      for (var start = 0;;) {
        var import_start_index = styles.indexOf('@import', start);

        if (import_start_index === -1) {
          result += styles.substring(start);
          break;
        }

        var import_end_index = styles.indexOf(';', import_start_index);

        if (import_end_index === -1) {
          result += styles.substring(start);
          break;
        }

        ++import_end_index;
        result += styles.substring(start, import_start_index);
        start = import_end_index;

        if (styles.substr(import_start_index + 8, 4) !== 'url(') {
          var closing_symbol_start_index = import_start_index + 8;
          var closing_symbol = styles[closing_symbol_start_index];
          var closing_symbol_end_index = styles.indexOf(closing_symbol, closing_symbol_start_index + 1);

          if (closing_symbol_end_index !== -1) {
            result += '@import url(' + closing_symbol + styles.substring(closing_symbol_start_index + 1, closing_symbol_end_index) + closing_symbol + ')';
            result += styles.substring(closing_symbol_end_index + 1, import_end_index);
            continue;
          }
        }

        result += styles.substring(import_start_index, import_end_index);
      }

      styles = result;
    }

    result = '';

    for (let start = 0;;) {
      var url_start_index = styles.indexOf('url(', start);

      if (url_start_index === -1) {
        result += styles.substring(start);
        break;
      }

      var url_end_index = styles.indexOf(')', url_start_index);

      if (url_end_index === -1) {
        result += styles.substring(start);
        break;
      }

      ++url_end_index;
      result += styles.substring(start, url_start_index);
      start = url_end_index;
      var start_content = url_start_index + 4;
      if (styles[start_content] === '\'' || styles[start_content] === '"') ++start_content;
      var end_content = url_end_index - 2;
      if (styles[end_content] === '\'' || styles[end_content] === '"') --end_content;
      var content = styles.substring(start_content, end_content + 1);

      if (content[0] === '#') {
        result += styles.substring(url_start_index, url_end_index);
        continue;
      }

      if (content.length > 5 && content[0] === 'd' && content[1] === 'a' && content[2] === 't' && content[3] === 'a' && content[4] === ':') {
        result += styles.substring(url_start_index, url_end_index);
        continue;
      }

      if (content.indexOf('://') !== -1) {
        result += styles.substring(url_start_index, url_end_index);
        continue;
      }

      if (content.length <= 2 || content[0] != '/' || content[1] != '/') {
        if (content[0] === '/') {
          var first_slash_index = locationHref.indexOf('/', locationHref.indexOf('://') + 3);
          var domain = first_slash_index === -1 ? locationHref : locationHref.substr(0, first_slash_index);
          content = domain + content;
        } else content = locationHref + content;
      }

      content = content.replace(/ /g, '%20');
      result += 'url(' + content + ')';
    }

    return result;
  }

  addStyleNodeWithCSSText(href, css_text, owner_node, media, importCSSIndex) {
    var style_n = document.createElement('style');
    style_n.tgParsed = false;
    style_n.tgIgnore = true;

    if (media !== '') {
      style_n.media = media;
    }

    if (window.navigator.userAgent.indexOf('Edge') > -1) {
      if (media === 'only x') {
        style_n.media = 'all';
      }
    }

    if (href !== '') {
      style_n.href = href;
    }

    style_n.innerHTML = css_text;
    style_n.tgImportCSSIndex = importCSSIndex;
    var previousNode = owner_node;
    var nextNode = previousNode;

    for (;;) {
      nextNode = nextNode.nextSibling;

      if (nextNode === null || nextNode.tgImportCSSIndex === undefined) {
        break;
      }

      if (importCSSIndex < nextNode.tgImportCSSIndex) {
        break;
      }

      previousNode = nextNode;
    }

    _utilities_utilities__WEBPACK_IMPORTED_MODULE_1__/* ["default"].insertAfter */ .Z.insertAfter(style_n, previousNode);
    return style_n;
  }

  processCSSRules(css_rules, owner_node) {
    var hasImports = false;

    for (var i = 0; i < css_rules.length; ++i) {
      switch (css_rules[i].type) {
        case CSSRule.STYLE_RULE:
          this.parseCSSRule(css_rules[i]);
          break;

        case CSSRule.MEDIA_RULE:
        case CSSRule.SUPPORTS_RULE:
          this.processCSSRules(css_rules[i].cssRules, owner_node);
          break;

        case CSSRule.IMPORT_RULE:
          hasImports = true;
          var href = this.checkAndParseImportURL(css_rules[i]);
          owner_node.tgImportCSSCounter = owner_node.tgImportCSSCounter === undefined ? 1 : ++owner_node.tgImportCSSCounter;
          this.downloadCSS(href, owner_node, css_rules[i].media.mediaText === '' ? owner_node.media : css_rules[i].media.mediaText, owner_node.tgImportCSSCounter);
          break;
      }
    }

    if (hasImports && owner_node.nodeName === 'LINK') {
      this.downloadCSS(owner_node.href, owner_node, owner_node.media, _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.IMPORT_CSS_INDEX_LAST_POSITION);
    }
  }

  parseCSSRule(css_rule, foreground_properties, background_properties) {
    const trasition_duration = css_rule.style.transitionDuration;
    const control_duration = trasition_duration !== '';
    if (control_duration === true) css_rule.style.transitionDuration = '0s'; //SLOW

    if (foreground_properties === undefined) foreground_properties = StyleConverter.FOREGROUND_PROPERTIES;
    if (background_properties === undefined) background_properties = StyleConverter.BACKGROUND_PROPERTIES; //parseCSSVariables - have to be rewrite to executed for every style and after that to executed parse function, because
    // when this.parse - changes variables with _night_eye - those variables don't exists and browsers discard this property

    this.parseCSSVariables(css_rule);
    this.parse(css_rule, background_properties, this.convertBackground, this.cache_bg);
    this.parse(css_rule, foreground_properties, this.convertForeground, this.cache_fr);

    if (control_duration === true) {
      this.style_apply_cache.addTransitionItem(css_rule, trasition_duration); // setTimeout(() => {
      //     css_rule.style.transitionDuration = trasition_duration; //SLOW
      // });
    }
  }
  /* sub function of parseCSSRule */


  parseCSSVariables(css_rule) {
    if (typeof css_rule.tgIgnoreVariableCounter === 'undefined') {
      css_rule.tgIgnoreVariableCounter = 0;
    }

    var variable_names_indices = [];

    for (var style_name, j = css_rule.style.length; j-- > 0;) {
      style_name = css_rule.style[j];

      if (style_name.length > 2 && style_name[0] === '-' && style_name[1] === '-') {
        variable_names_indices.push(j);
      }
    }

    for (var value = '', variable_name = '', i = variable_names_indices.length; i-- > 0;) {
      variable_name = css_rule.style[variable_names_indices[i]];
      if (variable_name === undefined) continue;

      if (variable_name.indexOf('-night-eye') !== -1) {
        continue;
      }

      value = this.extractCSSVariable(css_rule, variable_name);
      var firstChar = value.charAt(0);

      if (firstChar >= '0' && firstChar <= '9' && value.indexOf(',') > -1) {
        // 255,255,255 - https://openai.com/
        value = 'rgb(' + value + ')';
      }

      var fgValue = this.colorProcessor.convertForegroundColorString(value);
      var bgValue = this.colorProcessor.convertBackgroundColorString(value);

      try {
        ++css_rule.tgIgnoreVariableCounter;
        css_rule.style.setProperty(variable_name, fgValue);
        ++css_rule.tgIgnoreVariableCounter;
        css_rule.style.setProperty(variable_name + '-night-eye', bgValue); //
      } catch (e) {
        console.warn(e);
      }
    }
  }
  /* sub function of parseCSSRule */


  extractCSSVariable(css_rule, variable_name) {
    var value;
    var tempValue = css_rule.style.getPropertyValue(variable_name);

    if (tempValue.indexOf('var(--') !== -1) {
      //nested variable - recursion
      value = this.parseCSSVariable(tempValue, css_rule);
    } else {
      value = tempValue;
    }

    return value.trim();
  }
  /* sub function of parseCSSRule */


  parseCSSVariable(content, cssRule) {
    var result = '';
    var startPattern = 'var(';
    var start_offset = startPattern.length;
    var endPattern = ')';
    var alternativeEndPattern = ',';

    for (var start = 0;;) {
      var import_start_index = content.indexOf(startPattern, start);

      if (import_start_index === -1) {
        result += content.substring(start);
        break;
      }

      var import_end_index = content.indexOf(endPattern, import_start_index + start_offset);

      if (import_end_index === -1) {
        result += content.substring(start);
        break;
      }

      var alternativeEndIndex = content.indexOf(alternativeEndPattern, import_start_index + start_offset);

      if (alternativeEndIndex !== -1) {
        if (import_end_index > alternativeEndIndex) {
          import_end_index = alternativeEndIndex;
        }
      }

      result += content.substring(start, import_start_index);
      start = import_end_index;
      var startIndexURL = import_start_index + start_offset;
      var endIndexURL = import_end_index;
      var variableName = content.substring(startIndexURL, endIndexURL);
      var tempValue = cssRule.style.getPropertyValue(variableName);
      var afterIndex = content.substring(endIndexURL, endIndexURL + 1);

      if (tempValue === '' && afterIndex === ',') {
        return content;
      }

      if (tempValue.indexOf('var(--') !== -1) {
        result += this.parseCSSVariable(tempValue, cssRule);
      } else {
        result += tempValue;
      }
    }

    return result;
  }
  /* sub function of parseCSSRule */


  markCSSVariable(content, cssRule, converter, isBackgroundParsing) {
    var result = '';
    var startPattern = 'var(';
    var startOffset = startPattern.length;
    var endPattern = ')';
    var alternativeEndPattern = ',';

    for (var start = 0;;) {
      var varStartIndex = content.indexOf(startPattern, start);

      if (varStartIndex === -1) {
        result += content.substring(start);
        break;
      }

      var varEndIndex = content.indexOf(endPattern, varStartIndex + startOffset);

      if (varEndIndex === -1) {
        result += content.substring(start);
        break;
      }

      let endIndexPattern = start;
      var alternativeEndIndex = content.indexOf(alternativeEndPattern, varStartIndex + startOffset);

      if (alternativeEndIndex !== -1) {
        if (varEndIndex > alternativeEndIndex) {
          //Have default value - we have to convert it
          endIndexPattern = alternativeEndIndex;
        } else {
          endIndexPattern = varEndIndex;
        }
      } else {
        endIndexPattern = varEndIndex;
      }

      result += content.substring(start, varStartIndex);
      start = varEndIndex;
      let startIndexVar = varStartIndex + startOffset;
      let endIndexVar = endIndexPattern;
      var variableName = content.substring(startIndexVar, endIndexVar);
      var variableNightEye = isBackgroundParsing ? variableName + '-night-eye' : variableName;
      result += startPattern + variableNightEye;

      if (alternativeEndIndex !== -1) {
        if (varEndIndex > alternativeEndIndex) {
          var defaultValue = content.substring(alternativeEndIndex + 1, varEndIndex);

          if (defaultValue.indexOf('var(--') === -1) {
            var defaultValues = defaultValue.split(',');

            if (defaultValues.length === 3) {
              // => RGB - 255,255,255
              defaultValue = 'rgb(' + defaultValue + ')';
            }

            let convertDefaultValue = converter(defaultValue);

            if (defaultValues.length === 3) {
              // => RGB - 255,255,255. This works only for rgb - https://app.slack.com
              let HSL_values = convertDefaultValue.substring(5, convertDefaultValue.length - 1).split(','); //hsla( === 5 symbols

              let parsedHSLValues = [];

              for (let t = 0; t < HSL_values.length; ++t) {
                parsedHSLValues.push(parseFloat(HSL_values[t]));
              }

              _utilities_color_color__WEBPACK_IMPORTED_MODULE_6__/* ["default"].HSLtoRGB */ .Z.HSLtoRGB(parsedHSLValues);
              let RGB_values = parsedHSLValues;
              result += ',' + RGB_values[0] + ',' + RGB_values[1] + ',' + RGB_values[2];
            } else {
              result += ',' + convertDefaultValue;
            }
          } else {
            this.markCSSVariable(defaultValue, cssRule, converter, isBackgroundParsing);
          }
        }
      }
    }

    return result;
  }
  /* sub function of parseCSSRule */


  extractStyles(css_text) {
    const result = new Map();

    if (css_text !== undefined) {
      const start = css_text.indexOf('{');
      const end = css_text.indexOf('}');

      if (start !== -1 && end !== -1) {
        css_text = css_text.substring(start + 1, end);
        const rules = css_text.split(';');

        for (var i = rules.length; i-- > 0;) {
          const pair = rules[i].split(':');
          if (pair.length !== 2) continue;
          pair[0] = pair[0].trim();
          pair[1] = pair[1].trim();
          result.set(pair[0], pair[1]);
        }
      }
    }

    return result;
  }
  /* sub function of parseCSSRule */


  parse(css_rule, properties, convert, cache) {
    if (css_rule.selectorText !== undefined && css_rule.selectorText.indexOf('html[nighteyeplgn="active"]') === 0) {
      return;
    }

    var isBackgroundParsing = this.convertBackground === convert;
    var is_body_or_html = this.isCSSRuleBodyOrHTML(css_rule);
    var filtered_properties = new Map();
    var custom_properties = this.extractStyles(css_rule.cssText);

    for (let value, i = properties.length; i-- > 0;) {
      value = css_rule.style.getPropertyValue(properties[i]);

      if (value === '') {
        value = custom_properties.get(properties[i]);

        if (value === undefined) {
          continue;
        }
      }

      filtered_properties.set(properties[i], value);
    }

    if (filtered_properties.has('background') === true) {
      filtered_properties.delete('background-image');
      filtered_properties.delete('background-color');
    }

    if (filtered_properties.has('border') === true) {
      filtered_properties.delete('border-color');
      filtered_properties.delete('border-left');
      filtered_properties.delete('border-left-color');
      filtered_properties.delete('border-right');
      filtered_properties.delete('border-right-color');
      filtered_properties.delete('border-top');
      filtered_properties.delete('border-top-color');
      filtered_properties.delete('border-bottom');
      filtered_properties.delete('border-bottom-color');
    }

    if (filtered_properties.has('border-color') === true) {
      filtered_properties.delete('border-left-color');
      filtered_properties.delete('border-right-color');
      filtered_properties.delete('border-top-color');
      filtered_properties.delete('border-bottom-color');
    }

    if (filtered_properties.has('border-left') === true) filtered_properties.delete('border-left-color');
    if (filtered_properties.has('border-right') === true) filtered_properties.delete('border-right-color');
    if (filtered_properties.has('border-top') === true) filtered_properties.delete('border-top-color');
    if (filtered_properties.has('border-bottom') === true) filtered_properties.delete('border-bottom-color');
    var cached_key, cached, priority;
    filtered_properties.forEach((value, property) => {
      cached_key = value;
      if (value === '') return;
      priority = css_rule.style.getPropertyPriority(property);
      cached = cache.get(value);

      if (cached !== -1) {
        this.applyNewColor(css_rule, property, cached, priority, true);
        return;
      }

      var startVariableIndex = value.indexOf('var(--');

      if (startVariableIndex !== -1) {
        //variable -  RGBA(var(--primary-bg--alt),1)
        //var(--yt-main-app-background-tmp)
        var valueWithDarkBG = this.markCSSVariable(value, css_rule, convert, isBackgroundParsing);

        if (this.applyNewColor(css_rule, property, valueWithDarkBG, priority, false)) {
          cache.set(cached_key, valueWithDarkBG);
          return;
        }
      }

      if (isBackgroundParsing) {
        if (value.indexOf('url') !== -1) {
          if (window.location.href.indexOf('photos.google.com') > -1 || value.indexOf('/cleardot.gif') > -1) {
            // Google Photos do not invert them || google books(layer)
            return;
          }

          if (property === 'background') {
            if (value.lastIndexOf('fancybox/blank.gif') > -1) {
              //jQuery fancybox gallery extension
              return;
            }

            if (is_body_or_html) {
              //Very important, but test it without it
              var beforeValue = value;
              value = convert(value);

              if (value === beforeValue) {
                value = '#1f1f1f';
              }
            } else {
              value = convert(value);
            }
          } else if (property === 'background-image') {
            //if (value.indexOf('ssl.gstatic.com') > -1) {
            if (value.indexOf('gstatic.com') > -1) {
              property = 'filter';
              value = 'invert(85%)';
            }
          }

          var hrefLocation = null;

          if (typeof css_rule.parentStyleSheet !== 'undefined') {
            if (css_rule.parentStyleSheet.href === null) {
              hrefLocation = css_rule.parentStyleSheet.ownerNode.href;
            } else {
              hrefLocation = css_rule.parentStyleSheet.href;
            }
          }

          value = this.convertURLs(value, hrefLocation, false);
          this.applyNewColor(css_rule, property, value, priority, false);

          if (_constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.IFRAME === false && _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.IMAGE_PROCESSING_ENABLED === true) {
            if (value.indexOf('svg') === -1) {
              if (window.location.href.indexOf('app.asana.com') > -1 || window.location.href.indexOf('feedly.com') > -1 || window.location.href.indexOf('google.com') > -1 || window.location.href.indexOf('wikidot.com') > -1) {
                return;
              }

              let isRepeated = css_rule.style.background.indexOf('repeat') > -1 && css_rule.style.backgroundRepeat.indexOf('repeat') > -1;
              let imageBackgroundSize = null;
              let imageBackgroundSizePriority = ''; // if (window.image_processing_started === undefined)
              //     window.image_processing_started = new Date().getTime();

              _webgl_processor__WEBPACK_IMPORTED_MODULE_3__/* ["default"].processBackgroundCSSString */ .Z.processBackgroundCSSString({
                value: value,
                PAGE_PROTOCOL: _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_PROTOCOL,
                PAGE_HOSTNAME: _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_HOSTNAME,
                PAGE_URL: _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_URL,
                property: property
              }, response => {
                // console.log(`Total converting time ${new Date().getTime() - window.image_processing_started}`);
                if (response.css_text !== null) {
                  var is_node = css_rule.tagName !== undefined;

                  if (is_node) {
                    css_rule.tgIgnore = true;
                    this.style_apply_cache.addWebGlImageItem(css_rule, response, priority); // css_rule.style.setProperty(response.property, response.css_text, priority); //SLOW
                  } else {
                    css_rule.tgIgnore = true;
                    this.style_apply_cache.addWebGlImageItem(css_rule, response, priority); // css_rule.style.setProperty(response.property, response.css_text, priority); //SLOW
                  }
                }

                if (imageBackgroundSize !== null) {
                  css_rule.tgIgnore = true;
                  this.style_apply_cache.addWebGlBackgroundSizeItem(css_rule, imageBackgroundSize, imageBackgroundSizePriority); // css_rule.style.setProperty('background-size', imageBackgroundSize, imageBackgroundSizePriority); //SLOW
                }
              }, () => {
                if (isRepeated === false) return;
                imageBackgroundSize = css_rule.style.backgroundSize;
                imageBackgroundSizePriority = css_rule.style.getPropertyPriority('background-size');

                if (imageBackgroundSize === '0px 0px' && imageBackgroundSizePriority === 'important') {
                  imageBackgroundSize = null;
                  imageBackgroundSizePriority = '';
                  return;
                }

                css_rule.tgIgnore = true;
                css_rule.style.setProperty('background-size', '0 0', 'important');
              });
            } else if (is_body_or_html === false) {
              if (window.location.hostname.indexOf('google') > -1) {
                css_rule.tgIgnore = true;
                css_rule.style.filter = 'invert(100%)';
                css_rule.style.backgroundBlendMode = 'luminosity';
              }
            }
          }
        } else {
          value = convert(value);

          if (this.applyNewColor(css_rule, property, value, priority, false)) {
            cache.set(cached_key, value);
          }
        }
      } else {
        value = convert(value);

        if (this.applyNewColor(css_rule, property, value, priority, false)) {
          cache.set(cached_key, value);
        }
      }
    });
  }
  /* sub function of parseCSSRule */


  applyNewColor(css_rule, property, value, priority, force) {
    var oldValue = css_rule['eye-' + property];

    if (oldValue === value && !force) {
      return false;
    }

    css_rule['eye-' + property] = value;
    css_rule.tgIgnore = true;
    css_rule.style.setProperty(property, value, priority);

    if (typeof css_rule.setAttribute !== 'undefined') {
      css_rule.setAttribute('ne', Math.random());
    }

    return true;
  }
  /* sub function of parseCSSRule */


  isCSSRuleBodyOrHTML(css_rule) {
    if (css_rule === document.body || css_rule === document.documentElement) {
      return true;
    }

    if (css_rule.selectorText === undefined) return false;
    var html_index = css_rule.selectorText.indexOf('html');
    var body_index = css_rule.selectorText.indexOf('body');

    if (html_index === 0) {
      if (css_rule.selectorText.trim() !== 'html') html_index = -1;
    } else if (html_index > 0) {
      if (css_rule.selectorText.length > 5) {
        //5 html + next symbol, because next symbol can be [ or . - There are allowed
        if (css_rule.selectorText.indexOf('.', 5) > 0) html_index = -1;else if (css_rule.selectorText.indexOf(' ', 5) > 0) html_index = -1;
      }
    }

    if (body_index === 0) {
      if (css_rule.selectorText.trim() !== 'body') body_index = -1;
    } else if (body_index > 0) {
      var missingBodySelector = true;
      var selectors = css_rule.selectorText.split(' ');

      for (var i = 0; i < selectors.length; ++i) {
        var selector = selectors[i];

        if (selector.indexOf('body') === 0) {
          if (i + 1 === selectors.length) {
            //it has to be last element
            missingBodySelector = false;
            break;
          }
        }
      }

      if (missingBodySelector) {
        body_index = -1;
      } // let previous_char = css_rule.selectorText[body_index - 1].toLowerCase();
      // if (previous_char === '.' || previous_char === '_' || previous_char === '-' || previous_char === ',') body_index = -1;
      // else if (previous_char >= 'a' && previous_char <= 'z') body_index = -1;
      // else if (previous_char >= '0' && previous_char <= '9') body_index = -1;

    } // if (html_index !== -1 || body_index !== -1) {
    //     console.log("RESULT: ", html_index, body_index, css_rule.selectorText);
    // }


    return html_index !== -1 || body_index !== -1;
  }

  checkAndConvertDomShadowElements(parentNode) {
    //https://bugs.chromium.org/p/chromium/issues/detail?id=941910
    var nodes = parentNode.children;

    for (var i = 0; i < nodes.length; ++i) {
      var node = nodes[i];

      if (node.nodeName === 'SCRIPT') {
        continue;
      }

      if (node.nodeName === 'STYLE') {
        this.convertStyleSheet(node.sheet);
      }

      var computedStyle = null;

      if (node.shadowRoot) {
        this.checkAndConvertDomShadowElements(node.shadowRoot);
        computedStyle = window.getComputedStyle(node, ':host');
      } else {
        computedStyle = window.getComputedStyle(node);
      }

      var bgColor = computedStyle.getPropertyValue('background-color');
      var frColor = computedStyle.getPropertyValue('color');
      var newBGcolor = this.convertBackground(bgColor);
      var newFRcolor = this.convertForeground(frColor); // var sheet = new CSSStyleSheet();
      // sheet.replaceSync(`a:-webkit-any-link { color: red }`)
      // node.adoptedStyleSheets = [sheet];

      node.style.backgroundColor = newBGcolor;
      node.style.color = newFRcolor;
      this.checkAndConvertDomShadowElements(node);
    }
  } //==============================


}

StyleConverter.BACKGROUND_PROPERTIES = ['background', 'background-image', 'background-color', 'border', 'border-color', 'border-left', 'border-left-color', 'border-right', 'border-right-color', 'border-top', 'border-top-color', 'border-bottom', 'border-top-color', 'text-shadow', 'box-shadow'];
StyleConverter.FOREGROUND_PROPERTIES = ['fill', 'color', 'text-decoration', 'outline', 'column-rule', 'caret'];
StyleConverter.BACKGROUND_PROPERTIES_SET = new Set();
StyleConverter.FOREGROUND_PROPERTIES_SET = new Set();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StyleConverter);


/***/ }),

/***/ 896:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ WebGLProcessor)
/* harmony export */ });
/* harmony import */ var _utilities_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7584);
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2105);


var debug = false;
window.PLATFORM = 'chrome';
class WebGLProcessor {
  static processBackgroundCSSString(data, callback, hide_callback) {
    var start_index = 0;
    var css = data.value;

    for (;;) {
      start_index = css.indexOf('url(', start_index);
      if (start_index === -1) break;
      start_index += 4;
      var string_symbol = css[start_index];
      if (string_symbol !== '"' && string_symbol !== '\'') string_symbol = '';else ++start_index;
      var end_index = css.indexOf(string_symbol + ')', start_index);
      if (end_index === -1) return;
      var url = css.substring(start_index, end_index);
      var replace_url = url;

      if (url.slice(0, 5) === 'blob:') {
        callback({
          'css_text': null,
          'property': data.property
        });
        continue;
      }

      if (url.slice(0, 10) !== 'data:image') {
        const question_mark_index = url.lastIndexOf('?');
        if (question_mark_index !== -1) url = url.substring(0, question_mark_index);
        url = _utilities_utilities__WEBPACK_IMPORTED_MODULE_0__/* ["default"].makeURL */ .Z.makeURL(url, _constants_constants__WEBPACK_IMPORTED_MODULE_1__.S.PAGE_PROTOCOL, _constants_constants__WEBPACK_IMPORTED_MODULE_1__.S.PAGE_HOSTNAME, _constants_constants__WEBPACK_IMPORTED_MODULE_1__.S.PAGE_PORT, _constants_constants__WEBPACK_IMPORTED_MODULE_1__.S.PAGE_URL);
        const blob_url = this.images_cache.get(url);

        if (blob_url !== undefined) {
          const result = blob_url !== null ? css.replace(replace_url, blob_url) : null;
          callback({
            'css_text': result,
            'property': data.property
          });
          continue;
        }
      }

      hide_callback();
      WebGLProcessor.images_queue.push(new QueueStruct(css, url, replace_url, data.property, callback));
    }

    WebGLProcessor.signalImage();
  }

  static signalImage() {
    if (WebGLProcessor.images_queue.length === 0) return;

    if (WebGLProcessor.webgl_contexts_size < WebGLProcessor.WEBGL_MAX_CONTEXT_SIZE) {
      WebGLProcessor.webgl_free_contexts_queue.push(new NightEyeWebGLContext());
      ++WebGLProcessor.webgl_contexts_size;
    }

    if (WebGLProcessor.webgl_free_contexts_queue.length === 0) return;

    for (var queue_struct, i = WebGLProcessor.images_queue.length; i-- > 0;) {
      queue_struct = WebGLProcessor.images_queue[i];

      if (WebGLProcessor.images_processing.has(queue_struct.url) === false) {
        var webgl_context = WebGLProcessor.webgl_free_contexts_queue.pop();
        WebGLProcessor.images_queue.splice(i, 1);
        webgl_context.process(queue_struct);
        break;
      }
    }
  }

}
WebGLProcessor.images_queue = [];
WebGLProcessor.images_cache = new Map();
WebGLProcessor.webgl_contexts_size = 0;
WebGLProcessor.webgl_free_contexts_queue = [];
WebGLProcessor.images_processing = new Set();
WebGLProcessor.WEBGL_MAX_CONTEXT_SIZE = 12;
WebGLProcessor.AVERAGE_TEXTURE_SIZE = 1;
WebGLProcessor.URL_BLOB = PLATFORM !== 'safari' && PLATFORM !== 'firefox';
WebGLProcessor.EDGE = PLATFORM === 'edge'; //private

class QueueStruct {
  constructor(css_, url_, replace_url_, property_, callback_) {
    this.css = css_;
    this.url = url_;
    this.replace_url = replace_url_;
    this.property = property_;
    this.callback = callback_;
  }

}

class NightEyeWebGLContext {
  constructor() {
    this.canvas = null;
    this.avg_pixel = new Uint8Array(4);
    this.vertices = new Float32Array([-1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0]);
    this.textures = new Float32Array([0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0]);
    this.indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    this.gl = null;
    this.gl_flags = 0;
    this.gl_frame_buffer = 0;
    this.gl_texture_real = 0;
    this.gl_rendered_texture = 0;
    this.gl_depth_buffer = 0;
    this.state_struct = null;
    this.state_url = '';
    this.working_timer = null;
    this.onBlobReady = this.onBlobReady.bind(this);
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.gl = this.canvas.getContext('webgl', {
      'antialias': true,
      'depth': false,
      'alpha': true,
      'preserveDrawingBuffer': true
    });
    this.gl.enable(this.gl.BLEND);
    this.gl.enable(this.gl.DITHER);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
    const vert_shader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(vert_shader, fragment_shader);
    this.gl.compileShader(vert_shader); // if (!this.gl.getShaderParameter(vert_shader, this.gl.COMPILE_STATUS)) {
    //     var info = this.gl.getShaderInfoLog(vert_shader);
    //     throw new Error('Could not compile WebGL program. \n\n' + info);
    // }

    const frag_shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(frag_shader, pixel_shader);
    this.gl.compileShader(frag_shader); // if (!this.gl.getShaderParameter(frag_shader, this.gl.COMPILE_STATUS)) {
    //     let info = this.gl.getShaderInfoLog(frag_shader);
    //     throw new Error('Could not compile WebGL program. \n\n' + info);
    // }

    var shader_program = this.gl.createProgram();
    this.gl.attachShader(shader_program, vert_shader);
    this.gl.attachShader(shader_program, frag_shader);
    this.gl.linkProgram(shader_program); // if (!this.gl.getProgramParameter(shader_program, this.gl.LINK_STATUS)) {
    //     let info = this.gl.getProgramInfoLog(shader_program);
    //     throw new Error('Could not compile WebGL program. \n\n' + info);
    // }

    this.gl.useProgram(shader_program);
    const vertex_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vertices, this.gl.STATIC_DRAW);
    const coord = this.gl.getAttribLocation(shader_program, 'a_coordinates');
    this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(coord);
    const tex_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, tex_buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, this.textures, this.gl.STATIC_DRAW);
    const tex_coord = this.gl.getAttribLocation(shader_program, 'a_texcoord');
    this.gl.vertexAttribPointer(tex_coord, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(tex_coord); // Create a texture.

    const textur_location = this.gl.getUniformLocation(shader_program, 'u_texture');
    this.gl.uniform1i(textur_location, 0);
    this.gl_texture_real = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.gl_texture_real);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl_rendered_texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.gl_rendered_texture);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl_flags = this.gl.getUniformLocation(shader_program, 'u_flags');
    const index_buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indices, this.gl.STATIC_DRAW);
    this.gl_frame_buffer = this.gl.createFramebuffer();
    this.gl_depth_buffer = this.gl.createRenderbuffer();

    if (WebGLProcessor.EDGE === true) {
      var small_canvas = document.createElement('canvas');
      small_canvas.setAttribute('width', WebGLProcessor.AVERAGE_TEXTURE_SIZE);
      small_canvas.setAttribute('height', WebGLProcessor.AVERAGE_TEXTURE_SIZE);
      this.small_canvas_ctx = small_canvas.getContext('2d');
    }
  }

  process(queue_struct) {
    WebGLProcessor.images_processing.add(queue_struct.url);
    this.state_struct = queue_struct;
    this.state_url = queue_struct.url;
    const blob_url = WebGLProcessor.images_cache.get(this.state_url);

    if (blob_url !== undefined) {
      this.finish(blob_url);
      return;
    }

    var headers = new Headers();
    var options = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      // this is the correct value, do not change it to : no-cors
      cache: 'default',
      credentials: 'include'
    };
    var request = new Request(this.state_url); //This function (FETCH) supports location redirect with header interception -  Image.src - not supported  header interception, when request is redirected

    fetch(request, options).then(response => {
      response.arrayBuffer().then(buffer => {
        var base64Flag = 'data:image/jpeg;base64,';
        var imageStr = this.arrayBufferToBase64(buffer);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onerror = this.onError.bind(this);
        img.onload = this.onLoad.bind(this, img);
        img.src = base64Flag + imageStr;
        if (debug === true) console.log('request', this.state_url, WebGLProcessor.images_cache.get(this.state_url));
      });
    });
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach(b => binary += String.fromCharCode(b));
    return window.btoa(binary);
  }

  onError() {
    if (debug === true) console.log('on error', this.state_url);
    WebGLProcessor.images_cache.set(this.state_url, null);
    this.finish(null);
  }

  onLoad(img) {
    if (debug === true) console.log('on load', this.state_url);
    if (this.working_timer !== null) clearTimeout(this.working_timer);
    if (this.canvas === null) this.init(); //make power of 2 texture

    var w = Math.min(512, NightEyeWebGLContext.gbp(img.width));
    var h = Math.min(512, NightEyeWebGLContext.gbp(img.height));
    var s = Math.min(w, h); //making power of 2 texture

    this.canvas.setAttribute('width', s);
    this.canvas.setAttribute('height', s);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.uniform3f(this.gl_flags, 1., 0., 0.); //rendered texture

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.gl_frame_buffer);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.gl_rendered_texture);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, s, s, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array(512 * 512 * 4));
    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.gl_rendered_texture, 0); //real texture

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.gl_texture_real);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img); //render depth buffer

    this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.gl_depth_buffer);
    this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, s, s);
    this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.gl_depth_buffer);
    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0); //rendered texture ix upside-down, but.. we do not really care, because we are going to find average value, so orintation does not matter at att
    //render 1x1

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.gl_rendered_texture);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.canvas.setAttribute('width', WebGLProcessor.AVERAGE_TEXTURE_SIZE);
    this.canvas.setAttribute('height', WebGLProcessor.AVERAGE_TEXTURE_SIZE);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);

    if (WebGLProcessor.EDGE === true) {
      var c_img = new Image();

      c_img.onload = () => {
        this.small_canvas_ctx.drawImage(c_img, 0, 0);
        this.avg_pixel = this.small_canvas_ctx.getImageData(0, 0, WebGLProcessor.AVERAGE_TEXTURE_SIZE, WebGLProcessor.AVERAGE_TEXTURE_SIZE).data;
        this.onAverageFound(img);
      };

      c_img.src = this.canvas.toDataURL();
    } else {
      this.gl.readPixels(0, 0, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.avg_pixel);
      this.onAverageFound(img);
    }
  }

  onAverageFound(img) {
    if (debug === true) console.log('average for', this.state_url, this.avg_pixel);

    if (this.avg_pixel[3] < 90) {
      WebGLProcessor.images_cache.set(this.state_url, null);
      this.finish(null);
    } else {
      this.canvas.setAttribute('width', img.width);
      this.canvas.setAttribute('height', img.height);
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.gl_texture_real);
      const gray = Math.abs(this.avg_pixel[0] - this.avg_pixel[1]) < 2 && Math.abs(this.avg_pixel[0] - this.avg_pixel[2]) < 2 && Math.abs(this.avg_pixel[1] - this.avg_pixel[2]) < 2;
      const quite_light = this.avg_pixel[0] > 235 && this.avg_pixel[1] > 235 && this.avg_pixel[2] > 235;

      if (gray === false && quite_light === false) {
        //Dim
        const avg_pixel = (this.avg_pixel[0] + this.avg_pixel[1] + this.avg_pixel[2]) / 3;
        const dim = avg_pixel < 210 ? 0.8 : 0.0004074074 * avg_pixel * avg_pixel - 0.2040556 * avg_pixel + 25.63093;

        if (debug === true) {
          console.log('total average', this.state_url, avg_pixel);
          console.log('dim', this.state_url, 0.0004074074 * avg_pixel * avg_pixel - 0.2040556 * avg_pixel + 25.63093);
        }

        this.gl.uniform3f(this.gl_flags, 0., 0., dim);
      } else {
        //Convert
        this.gl.uniform3f(this.gl_flags, 0., 1., 0.);
      }

      this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0);

      if (WebGLProcessor.URL_BLOB === true) {
        this.canvas.toBlob(this.onBlobReady);
      } else {
        this.onBase64URL();
      }
    }

    this.working_timer = setTimeout(this.cleanup.bind(this), 8000);
  }

  onBlobReady(blob) {
    const blob_url = URL.createObjectURL(blob);
    this.onResult(blob_url);
  }

  onBase64URL() {
    const base64 = this.canvas.toDataURL();
    this.onResult(base64);
  }

  onResult(blob_url) {
    if (debug === true) console.log('setting cache', this.state_url);
    WebGLProcessor.images_cache.set(this.state_url, blob_url);
    this.finish(blob_url);
  }

  finish(blob_url) {
    const result = blob_url !== null ? this.state_struct.css.replace(this.state_struct.replace_url, blob_url) : null;
    this.state_struct.callback({
      'css_text': result,
      'property': this.state_struct.property
    });
    WebGLProcessor.webgl_free_contexts_queue.push(this);
    WebGLProcessor.images_processing.delete(this.state_struct.url);
    WebGLProcessor.signalImage();
  }

  cleanup() {
    //remove only webgl conponnets which are initialized in init() but not the state once, because they could be used async
    if (this.canvas === null) return;
    this.gl.getExtension('WEBGL_lose_context').loseContext();
    this.canvas = null;
    this.gl = null;
    this.gl_flags = 0;
    this.gl_frame_buffer = 0;
    this.gl_texture_real = 0;
    this.gl_rendered_texture = 0;
    this.gl_depth_buffer = 0;
  }

}

NightEyeWebGLContext.gbp = n => {
  var m = n;
  m = m | m >> 1;
  m = m | m >> 2;
  m = m | m >> 4;
  m = m | m >> 8;
  m = m | m >> 16;
  m = m & (~m >> 1 ^ 0x80000000);
  return m;
};
/* Edge only */


if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback) {
      const base64 = this.toDataURL();
      const binary = atob(base64.substring(base64.indexOf(',') + 1));
      const size = binary.length;
      const buffer = new Uint8Array(size);

      for (var i = binary.length; i-- > 0;) buffer[i] = binary.charCodeAt(i);

      callback(new Blob([buffer]));
    }
  });
}

var fragment_shader = "\n    attribute vec3 a_coordinates;\n    attribute vec2 a_texcoord;\n\n    varying vec2 v_texcoord;\n\n    void main() {\n        v_texcoord = a_texcoord;\n        gl_Position = vec4(a_coordinates, 1.0);\n    }\n";
var pixel_shader = "\n    precision mediump float;\n\n    uniform vec3 u_flags;\n    uniform sampler2D u_texture;\n\n    varying vec2 v_texcoord;\n\n    vec3 rgb2hsl(vec3 color) {\n        vec3 hsl; // init to 0 to avoid warnings ? (and reverse if + remove first part)\n\n        float fmin = min(min(color.r, color.g), color.b); //Min. value of RGB\n        float fmax = max(max(color.r, color.g), color.b); //Max. value of RGB\n        float delta = fmax - fmin; //Delta RGB value\n\n        hsl.z = (fmax + fmin) / 2.0; // Luminance\n\n        if (delta == 0.0) //This is a gray, no chroma...\n        {\n            hsl.x = 0.0; // Hue\n            hsl.y = 0.0; // Saturation\n        } else //Chromatic data...\n        {\n            if (hsl.z < 0.5)\n                hsl.y = delta / (fmax + fmin); // Saturation\n            else\n                hsl.y = delta / (2.0 - fmax - fmin); // Saturation\n\n            float deltaR = (((fmax - color.r) / 6.0) + (delta / 2.0)) / delta;\n            float deltaG = (((fmax - color.g) / 6.0) + (delta / 2.0)) / delta;\n            float deltaB = (((fmax - color.b) / 6.0) + (delta / 2.0)) / delta;\n\n            if (color.r == fmax)\n                hsl.x = deltaB - deltaG; // Hue\n            else if (color.g == fmax)\n                hsl.x = (1.0 / 3.0) + deltaR - deltaB; // Hue\n            else if (color.b == fmax)\n                hsl.x = (2.0 / 3.0) + deltaG - deltaR; // Hue\n\n            if (hsl.x < 0.0)\n                hsl.x += 1.0; // Hue\n            else if (hsl.x > 1.0)\n                hsl.x -= 1.0; // Hue\n        }\n\n        return hsl;\n    }\n\n\n    float hue2rgb(float f1, float f2, float hue) {\n        if (hue < 0.0)\n            hue += 1.0;\n        else if (hue > 1.0)\n            hue -= 1.0;\n        float res;\n        if ((6.0 * hue) < 1.0)\n            res = f1 + (f2 - f1) * 6.0 * hue;\n        else if ((2.0 * hue) < 1.0)\n            res = f2;\n        else if ((3.0 * hue) < 2.0)\n            res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;\n        else\n            res = f1;\n        return res;\n    }\n\n    vec3 hsl2rgb(vec3 hsl) {\n        vec3 rgb;\n\n        if (hsl.y == 0.0) {\n            rgb = vec3(hsl.z); // Luminance\n        } else {\n            float f2;\n\n            if (hsl.z < 0.5)\n                f2 = hsl.z * (1.0 + hsl.y);\n            else\n                f2 = hsl.z + hsl.y - hsl.y * hsl.z;\n\n            float f1 = 2.0 * hsl.z - f2;\n\n            rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));\n            rgb.g = hue2rgb(f1, f2, hsl.x);\n            rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));\n        }\n        return rgb;\n    }\n\n    vec3 darken(vec3 hsl) {\n        if (hsl.x > (30.0 / 360.0) && hsl.x < (90.0 / 360.0) && hsl.y > (40.0 / 100.0) && hsl.z < (70.0 / 100.0)) {\n            hsl.x = (219.0 / 360.0);\n            hsl.y = (63.0 / 100.0);\n            hsl.z = (41.0 / 100.0);\n        }\n\n        if (hsl.y > (60.0 / 100.0)) {\n            hsl.y = (60.0 / 100.0);\n        }\n\n        if (hsl.z > (60.0 / 100.0)) {\n            hsl.z = 0.1 + (1.0 - hsl.z);\n        }\n\n        return hsl;\n    }\n\n    void main() {\n        vec4 color_rgba = texture2D(u_texture, v_texcoord);\n        vec3 color_hsl = rgb2hsl(color_rgba.xyz);\n        vec3 color_rgb = hsl2rgb(darken(color_hsl));\n        gl_FragColor = u_flags.y * vec4(color_rgb, color_rgba.w) + u_flags.x * color_rgba + vec4(u_flags.z, u_flags.z, u_flags.z, 1) * color_rgba;\n    }\n";

/***/ }),

/***/ 5308:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(784);


class ColorMapProcessor {
  static lowerBound(source, target) {
    let result = -1;
    let l = 0;
    let r = source.length - 1;

    while (l < r) {
      const m = l + r >> 1;

      if (m === l || m === r) {
        if (target <= source[l]) {
          result = l;
        } else {
          result = target <= source[r] ? r : r + 1;
        }

        break;
      }

      if (source[m] < target) {
        l = m;
      } else {
        r = m;
      }
    }

    return result;
  }

  static getColorIndex(rgb) {
    const indices = ColorMapProcessor.colorKeys.map((k, i) => {
      return ColorMapProcessor.lowerBound(k, rgb[i]);
    });

    for (let i = indices.length; i-- > 0;) {
      const index = indices[i];
      const currentOffset = ColorMapProcessor.colorKeys[i][index] - rgb[i];
      const previousOffset = rgb[i] - ColorMapProcessor.colorKeys[i][index - 1];

      if (previousOffset < currentOffset) {
        --indices[i];
      }
    }

    const keys = indices.map((k, i) => {
      return ColorMapProcessor.colorKeys[i][k];
    });
    return ColorMapProcessor.getLabel(ColorMapProcessor.colorMap[keys[0]][keys[1]][keys[2]]);
  }

  static getCustomColor(colorsHSL, customColors) {
    const colors = [...colorsHSL];
    _color__WEBPACK_IMPORTED_MODULE_0__/* ["default"].HSLtoRGB */ .Z.HSLtoRGB(colors);
    const rgb = [colors[0], colors[1], colors[2]];
    const mainColorIndexLabel = ColorMapProcessor.getColorIndex(rgb);
    const newColorValue = customColors[mainColorIndexLabel];

    if (mainColorIndexLabel === newColorValue) {
      return null;
    }

    return newColorValue;
  }

  static getLabel(index) {
    switch (index) {
      case 1:
        return 'red';

      case 2:
        return 'blue';

      case 3:
        return 'green';

      case 4:
        return 'yellow';

      case 5:
        return 'pink';

      case 6:
        return 'purple';

      case 7:
        return 'orange';

      case 8:
        return 'brown';

      case 9:
        return 'grey';

      case 10:
        return 'black';

      case 11:
        return 'white';

      default:
        return '-';
    }
  }

}

ColorMapProcessor.colorMap = {
  "0": {
    "0": {
      "0": 10,
      "32": 10,
      "64": 2,
      "96": 2,
      "128": 2,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "32": {
      "0": 3,
      "32": 10,
      "64": 2,
      "96": 2,
      "128": 2,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "64": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 2,
      "128": 2,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "96": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 9,
      "128": 2,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "128": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 9,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "160": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "192": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 9,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "224": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 3,
      "192": 3,
      "224": 11,
      "255": 2
    },
    "255": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 3,
      "192": 11,
      "224": 2,
      "255": 2
    }
  },
  "32": {
    "0": {
      "0": 8,
      "32": 6,
      "64": 2,
      "96": 2,
      "128": 2,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "32": {
      "0": 10,
      "32": 10,
      "64": 2,
      "96": 2,
      "128": 2,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "64": {
      "0": 3,
      "32": 3,
      "64": 9,
      "96": 2,
      "128": 2,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "96": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 9,
      "128": 2,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "128": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 2,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "160": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "192": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 3,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "224": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 3,
      "192": 11,
      "224": 2,
      "255": 2
    },
    "255": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 11,
      "192": 11,
      "224": 2,
      "255": 2
    }
  },
  "64": {
    "0": {
      "0": 8,
      "32": 6,
      "64": 6,
      "96": 6,
      "128": 6,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "32": {
      "0": 8,
      "32": 8,
      "64": 6,
      "96": 6,
      "128": 6,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "64": {
      "0": 8,
      "32": 8,
      "64": 9,
      "96": 9,
      "128": 2,
      "160": 6,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "96": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 9,
      "128": 2,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "128": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 9,
      "160": 9,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "160": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 9,
      "128": 3,
      "160": 3,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "192": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 3,
      "192": 9,
      "224": 2,
      "255": 2
    },
    "224": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 3,
      "192": 11,
      "224": 2,
      "255": 2
    },
    "255": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 3,
      "192": 3,
      "224": 3,
      "255": 2
    }
  },
  "96": {
    "0": {
      "0": 8,
      "32": 1,
      "64": 6,
      "96": 6,
      "128": 6,
      "160": 6,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "32": {
      "0": 8,
      "32": 8,
      "64": 6,
      "96": 6,
      "128": 6,
      "160": 6,
      "192": 2,
      "224": 6,
      "255": 2
    },
    "64": {
      "0": 8,
      "32": 8,
      "64": 8,
      "96": 6,
      "128": 6,
      "160": 6,
      "192": 6,
      "224": 2,
      "255": 2
    },
    "96": {
      "0": 8,
      "32": 8,
      "64": 3,
      "96": 9,
      "128": 9,
      "160": 6,
      "192": 6,
      "224": 6,
      "255": 2
    },
    "128": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 9,
      "128": 9,
      "160": 2,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "160": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 9,
      "160": 9,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "192": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 9,
      "160": 9,
      "192": 2,
      "224": 2,
      "255": 2
    },
    "224": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 3,
      "192": 3,
      "224": 11,
      "255": 2
    },
    "255": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 11,
      "192": 11,
      "224": 11,
      "255": 2
    }
  },
  "128": {
    "0": {
      "0": 1,
      "32": 1,
      "64": 1,
      "96": 6,
      "128": 6,
      "160": 6,
      "192": 6,
      "224": 6,
      "255": 6
    },
    "32": {
      "0": 8,
      "32": 8,
      "64": 1,
      "96": 6,
      "128": 6,
      "160": 6,
      "192": 6,
      "224": 6,
      "255": 6
    },
    "64": {
      "0": 8,
      "32": 8,
      "64": 8,
      "96": 5,
      "128": 6,
      "160": 6,
      "192": 6,
      "224": 6,
      "255": 6
    },
    "96": {
      "0": 8,
      "32": 8,
      "64": 8,
      "96": 8,
      "128": 6,
      "160": 6,
      "192": 6,
      "224": 6,
      "255": 6
    },
    "128": {
      "0": 3,
      "32": 3,
      "64": 8,
      "96": 9,
      "128": 9,
      "160": 9,
      "192": 6,
      "224": 2,
      "255": 6
    },
    "160": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 9,
      "160": 9,
      "192": 9,
      "224": 2,
      "255": 2
    },
    "192": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 9,
      "192": 9,
      "224": 11,
      "255": 2
    },
    "224": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 3,
      "192": 3,
      "224": 2,
      "255": 2
    },
    "255": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 3,
      "192": 3,
      "224": 11,
      "255": 2
    }
  },
  "160": {
    "0": {
      "0": 1,
      "32": 1,
      "64": 1,
      "96": 6,
      "128": 6,
      "160": 6,
      "192": 6,
      "224": 6,
      "255": 6
    },
    "32": {
      "0": 1,
      "32": 1,
      "64": 1,
      "96": 6,
      "128": 6,
      "160": 6,
      "192": 6,
      "224": 6,
      "255": 6
    },
    "64": {
      "0": 8,
      "32": 8,
      "64": 1,
      "96": 5,
      "128": 6,
      "160": 6,
      "192": 6,
      "224": 6,
      "255": 6
    },
    "96": {
      "0": 7,
      "32": 8,
      "64": 8,
      "96": 5,
      "128": 6,
      "160": 6,
      "192": 6,
      "224": 6,
      "255": 6
    },
    "128": {
      "0": 8,
      "32": 8,
      "64": 8,
      "96": 8,
      "128": 9,
      "160": 6,
      "192": 6,
      "224": 6,
      "255": 6
    },
    "160": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 8,
      "128": 9,
      "160": 9,
      "192": 9,
      "224": 6,
      "255": 6
    },
    "192": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 9,
      "160": 9,
      "192": 9,
      "224": 9,
      "255": 2
    },
    "224": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 3,
      "128": 3,
      "160": 11,
      "192": 3,
      "224": 2,
      "255": 11
    },
    "255": {
      "0": 3,
      "32": 3,
      "64": 3,
      "96": 4,
      "128": 3,
      "160": 11,
      "192": 11,
      "224": 11,
      "255": 11
    }
  },
  "192": {
    "0": {
      "0": 1,
      "32": 1,
      "64": 1,
      "96": 5,
      "128": 6,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 6
    },
    "32": {
      "0": 1,
      "32": 1,
      "64": 1,
      "96": 1,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 6,
      "255": 6
    },
    "64": {
      "0": 7,
      "32": 7,
      "64": 1,
      "96": 1,
      "128": 5,
      "160": 5,
      "192": 6,
      "224": 6,
      "255": 6
    },
    "96": {
      "0": 7,
      "32": 7,
      "64": 7,
      "96": 5,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 6,
      "255": 6
    },
    "128": {
      "0": 7,
      "32": 7,
      "64": 8,
      "96": 8,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 6
    },
    "160": {
      "0": 7,
      "32": 7,
      "64": 8,
      "96": 8,
      "128": 8,
      "160": 5,
      "192": 5,
      "224": 6,
      "255": 6
    },
    "192": {
      "0": 4,
      "32": 3,
      "64": 4,
      "96": 8,
      "128": 4,
      "160": 9,
      "192": 9,
      "224": 5,
      "255": 11
    },
    "224": {
      "0": 3,
      "32": 3,
      "64": 4,
      "96": 4,
      "128": 4,
      "160": 3,
      "192": 11,
      "224": 11,
      "255": 11
    },
    "255": {
      "0": 4,
      "32": 3,
      "64": 4,
      "96": 4,
      "128": 4,
      "160": 4,
      "192": 11,
      "224": 11,
      "255": 11
    }
  },
  "224": {
    "0": {
      "0": 1,
      "32": 1,
      "64": 1,
      "96": 1,
      "128": 6,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 6
    },
    "32": {
      "0": 1,
      "32": 1,
      "64": 1,
      "96": 5,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 5
    },
    "64": {
      "0": 7,
      "32": 1,
      "64": 1,
      "96": 1,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 6,
      "255": 6
    },
    "96": {
      "0": 7,
      "32": 7,
      "64": 7,
      "96": 1,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 5
    },
    "128": {
      "0": 7,
      "32": 7,
      "64": 7,
      "96": 7,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 6
    },
    "160": {
      "0": 7,
      "32": 7,
      "64": 7,
      "96": 8,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 5
    },
    "192": {
      "0": 4,
      "32": 4,
      "64": 7,
      "96": 4,
      "128": 4,
      "160": 11,
      "192": 5,
      "224": 5,
      "255": 6
    },
    "224": {
      "0": 4,
      "32": 4,
      "64": 4,
      "96": 4,
      "128": 4,
      "160": 4,
      "192": 11,
      "224": 9,
      "255": 11
    },
    "255": {
      "0": 4,
      "32": 4,
      "64": 4,
      "96": 4,
      "128": 4,
      "160": 4,
      "192": 4,
      "224": 11,
      "255": 11
    }
  },
  "255": {
    "0": {
      "0": 1,
      "32": 1,
      "64": 1,
      "96": 1,
      "128": 6,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 5
    },
    "32": {
      "0": 1,
      "32": 1,
      "64": 1,
      "96": 5,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 5
    },
    "64": {
      "0": 1,
      "32": 1,
      "64": 1,
      "96": 1,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 5
    },
    "96": {
      "0": 7,
      "32": 7,
      "64": 7,
      "96": 1,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 5
    },
    "128": {
      "0": 7,
      "32": 7,
      "64": 7,
      "96": 5,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 5
    },
    "160": {
      "0": 7,
      "32": 7,
      "64": 7,
      "96": 7,
      "128": 5,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 5
    },
    "192": {
      "0": 7,
      "32": 7,
      "64": 7,
      "96": 7,
      "128": 7,
      "160": 5,
      "192": 5,
      "224": 5,
      "255": 5
    },
    "224": {
      "0": 4,
      "32": 4,
      "64": 4,
      "96": 4,
      "128": 4,
      "160": 4,
      "192": 11,
      "224": 5,
      "255": 5
    },
    "255": {
      "0": 4,
      "32": 4,
      "64": 4,
      "96": 4,
      "128": 4,
      "160": 4,
      "192": 4,
      "224": 11,
      "255": 11
    }
  }
};
ColorMapProcessor.colorKeys = [[-1, 0, 32, 64, 96, 128, 160, 192, 224, 255], [-1, 0, 32, 64, 96, 128, 160, 192, 224, 255], [-1, 0, 32, 64, 96, 128, 160, 192, 224, 255]];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorMapProcessor);

/***/ }),

/***/ 3377:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2105);
 //Private utilities

class ColorProcessorUtilities {
  static processBackgroundHSLColorArray(colors) {
    var success = false;

    if (colors[1] > 60) {
      colors[1] = 60;
      success = true;
    }

    if (colors[2] > 60) {
      colors[2] = 10 + (100 - colors[2]);
      success = true;
    } // converting dark colors - convert to brigter one


    if (colors[2] < 20) {
      colors[2] += ColorProcessorUtilities.getLightValueBasedOnDarkTheme();
      success = true;
    } // converting yellow color


    if (colors[0] > 40 && colors[0] <= 60 && colors[1] > 40 && colors[2] < 70) {
      colors[0] = 44;
      colors[1] = 100;
      colors[2] = 20; // colors[3] = 0.66;

      success = true;
    }

    return success;
  }

  static processForegroundHSLColorArray(colors) {
    var success = false;

    if (colors[1] > 60) {
      colors[1] = 60;
      success = true;
    }

    if (colors[2] < 75) {
      colors[2] = 75;
      success = true;
    }

    return success;
  }

  static makeHSLAString(colors) {
    return 'hsla(' + colors[0] + ',' + colors[1] + '%,' + colors[2] + '%,' + colors[3] + ')';
  }

  static getLightValueBasedOnDarkTheme() {
    if (window.nightEyeProOptions === undefined) {
      return 0;
    }

    switch (parseInt(window.nightEyeProOptions.darkTheme)) {
      case _constants_constants__WEBPACK_IMPORTED_MODULE_0__/* .DarkThemes.THEME_0 */ .aw.THEME_0:
        return 0;

      case _constants_constants__WEBPACK_IMPORTED_MODULE_0__/* .DarkThemes.THEME_1 */ .aw.THEME_1:
        return 7;

      case _constants_constants__WEBPACK_IMPORTED_MODULE_0__/* .DarkThemes.THEME_2 */ .aw.THEME_2:
        return 15;

      default:
        return 7;
      //Default DarkThemes.THEME_1
    }
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorProcessorUtilities);

/***/ }),

/***/ 6866:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export ColorProcessor */
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(784);
/* harmony import */ var _mode_background__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4255);
/* harmony import */ var _mode_foreground__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3092);




class ColorProcessor {
  constructor() {
    this.mode_background = new _mode_background__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z(this);
    this.mode_foreground = new _mode_foreground__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(this);
    this.out = {
      'style_string': '',
      'jump_size': 0,
      colors: null
    };
  }

  convertBackgroundColorString(style_string) {
    return this.convertColorString(style_string, this.mode_background);
  }

  convertForegroundColorString(style_string) {
    return this.convertColorString(style_string, this.mode_foreground);
  }

  convertColorString(style_string, mode) {
    var start_index = style_string.indexOf(':');
    if (start_index === -1) start_index = 0;
    var result = style_string.substring(0, start_index);

    for (var i = start_index; i < style_string.length;) {
      this.convertHEX(style_string, i, mode);

      if (this.out.jump_size !== 0) {
        result += this.out.style_string;
        i += this.out.jump_size + 1;
        continue;
      }

      this.convertRGB(style_string, i, mode);

      if (this.out.jump_size !== 0) {
        result += this.out.style_string;
        i += this.out.jump_size + 1;
        continue;
      }

      this.convertName(style_string, i, mode);

      if (this.out.jump_size !== 0) {
        result += this.out.style_string;
        i += this.out.jump_size + 1;
        continue;
      }

      result += style_string[i++];
    }

    return result;
  }

  convertHEX(style_string, i, mode) {
    var valid, c, j;
    this.out.jump_size = 0;
    if (style_string[i] !== '#') return; //search for next 6

    if (i + 6 < style_string.length) {
      valid = true;

      for (j = 1; j <= 6; ++j) {
        c = style_string[i + j].toLowerCase();
        if (c >= 'a' && c <= 'f' || c >= '0' && c <= '9') continue;
        valid = false;
        break;
      }

      if (valid) {
        var colors = [parseInt(style_string[i + 1] + style_string[i + 2], 16), parseInt(style_string[i + 3] + style_string[i + 4], 16), parseInt(style_string[i + 5] + style_string[i + 6], 16), 1]; //if (mode.isApplicable(colors)) {

        this.out.style_string = mode.applyToRGBColorsAsString(colors);
        this.out.jump_size = 6; //}

        return;
      }

      if (j >= 4) {
        //optimization, if fail at 4th sign => it is 3 digit hex
        let colors = [parseInt(style_string[i + 1] + style_string[i + 1], 16), parseInt(style_string[i + 2] + style_string[i + 2], 16), parseInt(style_string[i + 3] + style_string[i + 3], 16), 1]; //if (mode.isApplicable(colors)) {

        this.out.style_string = mode.applyToRGBColorsAsString(colors);
        this.out.jump_size = 3; //}

        return;
      }
    } //search for next 3


    if (i + 3 < style_string.length) {
      valid = true;

      for (j = 1; j <= 3; ++j) {
        c = style_string[i + j].toLowerCase();
        if (c >= 'a' && c <= 'f' || c >= '0' && c <= '9') continue;
        valid = false;
        break;
      }

      if (valid) {
        let colors = [parseInt(style_string[i + 1] + style_string[i + 1], 16), parseInt(style_string[i + 2] + style_string[i + 2], 16), parseInt(style_string[i + 3] + style_string[i + 3], 16), 1]; //if (mode.isApplicable(colors)) {

        this.out.style_string = mode.applyToRGBColorsAsString(colors);
        this.out.jump_size = 3; //}

        return;
      }
    }
  }

  convertRGB(style_string, i, mode) {
    this.parseColorsToHSL(style_string, i);
    if (this.out.jump_size === 0) return;
    /*if (mode.isApplicable(out.colors) === false) {
     out.jump_size = 0;
     return;
     }*/
    //ColorProcessor.colors[Color.makeColorKeyFromArray(this.out.colors)] = null;

    this.out.style_string = mode.applyToHSLColorsAsString(this.out.colors);
  }

  convertName(style_string, i, mode) {
    var j,
        match = null,
        parent_map = ColorProcessor.text_colors;
    this.out.jump_size = 0;

    for (j = i; j < style_string.length; ++j) {
      let map = parent_map[style_string[j]];
      if (typeof map === 'undefined') break;

      if (typeof map.colors !== 'undefined') {
        if (j + 1 === style_string.length) match = map.colors;else {
          var c = style_string[j + 1];
          if (c === ';' || c === ' ' || c === '!') match = map.colors;
        }
      }

      parent_map = map;
    }

    if (match !== null) {
      if (match[0] === -1) //initial color
        return; //match = mode.initial;
      //if (mode.isApplicable(match) === true) {

      this.out.style_string = mode.applyToRGBColorsAsString(match.slice());
      this.out.jump_size = j - i - 1; //}
    }
  }

  parseColorsToHSL(style_string, i) {
    this.out.jump_size = 0;
    if (i + 2 >= style_string.length) return null;
    var hsl = false;

    if (style_string[i] !== 'r' || style_string[i + 1] !== 'g' || style_string[i + 2] !== 'b') {
      if (style_string[i] !== 'h' || style_string[i + 1] !== 's' || style_string[i + 2] !== 'l') return null;
      hsl = true;
    }

    var c,
        commas = 0; // dots = 0;

    var j,
        open_bracket = -1,
        close_bracket = -1;

    for (j = i + 3; j < style_string.length; ++j) {
      c = style_string[j];

      if (c === '(') {
        open_bracket = j;
        continue;
      }

      if (open_bracket === -1) continue;

      if (c === ')') {
        close_bracket = j;
        break;
      }

      if (c >= '0' && c <= '9') continue;
      if (c === ' ' || c === '.' || c === '%') continue;

      if (c === ',') {
        ++commas;
        continue;
      }

      break;
    }

    if (open_bracket === -1 || close_bracket === -1) return null;
    if (commas < 2 || commas > 3) return null;
    var colors = [0, 0, 0, 1];
    var colors_index = 0; //alpha_divider = 1; - this is not used

    var float_divider = 1;

    for (j = open_bracket + 1; j < close_bracket; ++j) {
      c = style_string[j];

      if (c >= '0' && c <= '9') {
        if (float_divider === 1) {
          colors[colors_index] *= 10;
          colors[colors_index] += parseInt(c);
        } else {
          colors[colors_index] += parseInt(c) / float_divider;
          float_divider *= 10;
        }
      } else if (c === '.') {
        float_divider = 10;
      } else if (c === ',') {
        ++colors_index;
        float_divider = 1;
        if (colors_index === 3) colors[colors_index] = 0;
      }
    }

    if (hsl === false) _color__WEBPACK_IMPORTED_MODULE_2__/* ["default"].RGBtoHSL */ .Z.RGBtoHSL(colors);
    this.out.jump_size = close_bracket - i;
    return this.out.colors = colors;
  }

}

ColorProcessor.colors = {};
ColorProcessor.colorsWithKey = {};
ColorProcessor.text_colors = {
  "i": {
    "n": {
      "i": {
        "t": {
          "i": {
            "a": {
              "l": {
                "colors": [0, 0, 0, 1]
              }
            }
          }
        }
      },
      "d": {
        "i": {
          "a": {
            "n": {
              "r": {
                "e": {
                  "d": {
                    "colors": [205, 92, 92, 1]
                  }
                }
              }
            }
          },
          "g": {
            "o": {
              "colors": [75, 0, 130, 1]
            }
          }
        }
      }
    },
    "v": {
      "o": {
        "r": {
          "y": {
            "colors": [255, 255, 240, 1]
          }
        }
      }
    }
  },
  "-": {
    "w": {
      "e": {
        "b": {
          "k": {
            "i": {
              "t": {
                "-": {
                  "l": {
                    "i": {
                      "n": {
                        "k": {
                          "colors": [0, 0, 238, 1]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "w": {
    "i": {
      "n": {
        "d": {
          "o": {
            "w": {
              "colors": [255, 255, 255, 1],
              "t": {
                "e": {
                  "x": {
                    "t": {
                      "colors": [0, 0, 0, 1]
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "h": {
      "i": {
        "t": {
          "e": {
            "colors": [255, 255, 255, 1],
            "s": {
              "m": {
                "o": {
                  "k": {
                    "e": {
                      "colors": [245, 245, 245, 1]
                    }
                  }
                }
              }
            }
          }
        }
      },
      "e": {
        "a": {
          "t": {
            "colors": [245, 222, 179, 1]
          }
        }
      }
    }
  },
  "l": {
    "i": {
      "g": {
        "h": {
          "t": {
            "y": {
              "e": {
                "l": {
                  "l": {
                    "o": {
                      "w": {
                        "colors": [255, 255, 224, 1]
                      }
                    }
                  }
                }
              }
            },
            "p": {
              "i": {
                "n": {
                  "k": {
                    "colors": [255, 182, 193, 1]
                  }
                }
              }
            },
            "s": {
              "a": {
                "l": {
                  "m": {
                    "o": {
                      "n": {
                        "colors": [255, 160, 122, 1]
                      }
                    }
                  }
                }
              },
              "t": {
                "e": {
                  "e": {
                    "l": {
                      "b": {
                        "l": {
                          "u": {
                            "e": {
                              "colors": [176, 196, 222, 1]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "k": {
                "y": {
                  "b": {
                    "l": {
                      "u": {
                        "e": {
                          "colors": [135, 206, 250, 1]
                        }
                      }
                    }
                  }
                }
              },
              "l": {
                "a": {
                  "t": {
                    "e": {
                      "g": {
                        "r": {
                          "e": {
                            "y": {
                              "colors": [119, 136, 153, 1]
                            }
                          },
                          "a": {
                            "y": {
                              "colors": [119, 136, 153, 1]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "e": {
                "a": {
                  "g": {
                    "r": {
                      "e": {
                        "e": {
                          "n": {
                            "colors": [32, 178, 170, 1]
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "g": {
              "o": {
                "l": {
                  "d": {
                    "e": {
                      "n": {
                        "r": {
                          "o": {
                            "d": {
                              "y": {
                                "e": {
                                  "l": {
                                    "l": {
                                      "o": {
                                        "w": {
                                          "colors": [250, 250, 210, 1]
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "r": {
                "e": {
                  "y": {
                    "colors": [211, 211, 211, 1]
                  },
                  "e": {
                    "n": {
                      "colors": [144, 238, 144, 1]
                    }
                  }
                },
                "a": {
                  "y": {
                    "colors": [211, 211, 211, 1]
                  }
                }
              }
            },
            "c": {
              "o": {
                "r": {
                  "a": {
                    "l": {
                      "colors": [240, 128, 128, 1]
                    }
                  }
                }
              },
              "y": {
                "a": {
                  "n": {
                    "colors": [224, 255, 255, 1]
                  }
                }
              }
            },
            "b": {
              "l": {
                "u": {
                  "e": {
                    "colors": [173, 216, 230, 1]
                  }
                }
              }
            }
          }
        }
      },
      "n": {
        "e": {
          "n": {
            "colors": [250, 240, 230, 1]
          }
        }
      },
      "m": {
        "e": {
          "g": {
            "r": {
              "e": {
                "e": {
                  "n": {
                    "colors": [50, 205, 50, 1]
                  }
                }
              }
            }
          },
          "colors": [0, 255, 0, 1]
        }
      }
    },
    "e": {
      "m": {
        "o": {
          "n": {
            "c": {
              "h": {
                "i": {
                  "f": {
                    "f": {
                      "o": {
                        "n": {
                          "colors": [255, 250, 205, 1]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "a": {
      "v": {
        "e": {
          "n": {
            "d": {
              "e": {
                "r": {
                  "b": {
                    "l": {
                      "u": {
                        "s": {
                          "h": {
                            "colors": [255, 240, 245, 1]
                          }
                        }
                      }
                    }
                  },
                  "colors": [230, 230, 250, 1]
                }
              }
            }
          }
        }
      },
      "w": {
        "n": {
          "g": {
            "r": {
              "e": {
                "e": {
                  "n": {
                    "colors": [124, 252, 0, 1]
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "y": {
    "e": {
      "l": {
        "l": {
          "o": {
            "w": {
              "colors": [255, 255, 0, 1],
              "g": {
                "r": {
                  "e": {
                    "e": {
                      "n": {
                        "colors": [154, 205, 50, 1]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "s": {
    "n": {
      "o": {
        "w": {
          "colors": [255, 250, 250, 1]
        }
      }
    },
    "e": {
      "a": {
        "s": {
          "h": {
            "e": {
              "l": {
                "l": {
                  "colors": [255, 245, 238, 1]
                }
              }
            }
          }
        },
        "g": {
          "r": {
            "e": {
              "e": {
                "n": {
                  "colors": [46, 139, 87, 1]
                }
              }
            }
          }
        }
      }
    },
    "a": {
      "l": {
        "m": {
          "o": {
            "n": {
              "colors": [250, 128, 114, 1]
            }
          }
        }
      },
      "n": {
        "d": {
          "y": {
            "b": {
              "r": {
                "o": {
                  "w": {
                    "n": {
                      "colors": [244, 164, 96, 1]
                    }
                  }
                }
              }
            }
          }
        }
      },
      "d": {
        "d": {
          "l": {
            "e": {
              "b": {
                "r": {
                  "o": {
                    "w": {
                      "n": {
                        "colors": [139, 69, 19, 1]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "i": {
      "l": {
        "v": {
          "e": {
            "r": {
              "colors": [192, 192, 192, 1]
            }
          }
        }
      },
      "e": {
        "n": {
          "n": {
            "a": {
              "colors": [160, 82, 45, 1]
            }
          }
        }
      }
    },
    "k": {
      "y": {
        "b": {
          "l": {
            "u": {
              "e": {
                "colors": [135, 206, 235, 1]
              }
            }
          }
        }
      }
    },
    "l": {
      "a": {
        "t": {
          "e": {
            "g": {
              "r": {
                "e": {
                  "y": {
                    "colors": [112, 128, 144, 1]
                  }
                },
                "a": {
                  "y": {
                    "colors": [112, 128, 144, 1]
                  }
                }
              }
            },
            "b": {
              "l": {
                "u": {
                  "e": {
                    "colors": [106, 90, 205, 1]
                  }
                }
              }
            }
          }
        }
      }
    },
    "t": {
      "e": {
        "e": {
          "l": {
            "b": {
              "l": {
                "u": {
                  "e": {
                    "colors": [70, 130, 180, 1]
                  }
                }
              }
            }
          }
        }
      }
    },
    "p": {
      "r": {
        "i": {
          "n": {
            "g": {
              "g": {
                "r": {
                  "e": {
                    "e": {
                      "n": {
                        "colors": [0, 255, 127, 1]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "f": {
    "l": {
      "o": {
        "r": {
          "a": {
            "l": {
              "w": {
                "h": {
                  "i": {
                    "t": {
                      "e": {
                        "colors": [255, 250, 240, 1]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "u": {
      "c": {
        "h": {
          "s": {
            "i": {
              "a": {
                "colors": [255, 0, 255, 1]
              }
            }
          }
        }
      }
    },
    "i": {
      "r": {
        "e": {
          "b": {
            "r": {
              "i": {
                "c": {
                  "k": {
                    "colors": [178, 34, 34, 1]
                  }
                }
              }
            }
          }
        }
      }
    },
    "o": {
      "r": {
        "e": {
          "s": {
            "t": {
              "g": {
                "r": {
                  "e": {
                    "e": {
                      "n": {
                        "colors": [34, 139, 34, 1]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "c": {
    "o": {
      "r": {
        "n": {
          "s": {
            "i": {
              "l": {
                "k": {
                  "colors": [255, 248, 220, 1]
                }
              }
            }
          },
          "f": {
            "l": {
              "o": {
                "w": {
                  "e": {
                    "r": {
                      "b": {
                        "l": {
                          "u": {
                            "e": {
                              "colors": [100, 149, 237, 1]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "a": {
          "l": {
            "colors": [255, 127, 80, 1]
          }
        }
      }
    },
    "r": {
      "i": {
        "m": {
          "s": {
            "o": {
              "n": {
                "colors": [220, 20, 60, 1]
              }
            }
          }
        }
      }
    },
    "h": {
      "o": {
        "c": {
          "o": {
            "l": {
              "a": {
                "t": {
                  "e": {
                    "colors": [210, 105, 30, 1]
                  }
                }
              }
            }
          }
        }
      },
      "a": {
        "r": {
          "t": {
            "r": {
              "e": {
                "u": {
                  "s": {
                    "e": {
                      "colors": [127, 255, 0, 1]
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "a": {
      "d": {
        "e": {
          "t": {
            "b": {
              "l": {
                "u": {
                  "e": {
                    "colors": [95, 158, 160, 1]
                  }
                }
              }
            }
          }
        }
      }
    },
    "y": {
      "a": {
        "n": {
          "colors": [0, 255, 255, 1]
        }
      }
    }
  },
  "p": {
    "a": {
      "p": {
        "a": {
          "y": {
            "a": {
              "w": {
                "h": {
                  "i": {
                    "p": {
                      "colors": [255, 239, 213, 1]
                    }
                  }
                }
              }
            }
          }
        }
      },
      "l": {
        "e": {
          "g": {
            "o": {
              "l": {
                "d": {
                  "e": {
                    "n": {
                      "r": {
                        "o": {
                          "d": {
                            "colors": [238, 232, 170, 1]
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "r": {
              "e": {
                "e": {
                  "n": {
                    "colors": [152, 251, 152, 1]
                  }
                }
              }
            }
          },
          "v": {
            "i": {
              "o": {
                "l": {
                  "e": {
                    "t": {
                      "r": {
                        "e": {
                          "d": {
                            "colors": [219, 112, 147, 1]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "t": {
            "u": {
              "r": {
                "q": {
                  "u": {
                    "o": {
                      "i": {
                        "s": {
                          "e": {
                            "colors": [175, 238, 238, 1]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "e": {
      "a": {
        "c": {
          "h": {
            "p": {
              "u": {
                "f": {
                  "f": {
                    "colors": [255, 218, 185, 1]
                  }
                }
              }
            }
          }
        }
      },
      "r": {
        "u": {
          "colors": [205, 133, 63, 1]
        }
      }
    },
    "i": {
      "n": {
        "k": {
          "colors": [255, 192, 203, 1]
        }
      }
    },
    "l": {
      "u": {
        "m": {
          "colors": [221, 160, 221, 1]
        }
      }
    },
    "o": {
      "w": {
        "d": {
          "e": {
            "r": {
              "b": {
                "l": {
                  "u": {
                    "e": {
                      "colors": [176, 224, 230, 1]
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "u": {
      "r": {
        "p": {
          "l": {
            "e": {
              "colors": [128, 0, 128, 1]
            }
          }
        }
      }
    }
  },
  "b": {
    "l": {
      "a": {
        "n": {
          "c": {
            "h": {
              "e": {
                "d": {
                  "a": {
                    "l": {
                      "m": {
                        "o": {
                          "n": {
                            "d": {
                              "colors": [255, 235, 205, 1]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "c": {
          "k": {
            "colors": [0, 0, 0, 1]
          }
        }
      },
      "u": {
        "e": {
          "v": {
            "i": {
              "o": {
                "l": {
                  "e": {
                    "t": {
                      "colors": [138, 43, 226, 1]
                    }
                  }
                }
              }
            }
          },
          "colors": [0, 0, 255, 1]
        }
      }
    },
    "i": {
      "s": {
        "q": {
          "u": {
            "e": {
              "colors": [255, 228, 196, 1]
            }
          }
        }
      }
    },
    "e": {
      "i": {
        "g": {
          "e": {
            "colors": [245, 245, 220, 1]
          }
        }
      }
    },
    "u": {
      "r": {
        "l": {
          "y": {
            "w": {
              "o": {
                "o": {
                  "d": {
                    "colors": [222, 184, 135, 1]
                  }
                }
              }
            }
          }
        }
      }
    },
    "r": {
      "o": {
        "w": {
          "n": {
            "colors": [165, 42, 42, 1]
          }
        }
      }
    }
  },
  "m": {
    "i": {
      "s": {
        "t": {
          "y": {
            "r": {
              "o": {
                "s": {
                  "e": {
                    "colors": [255, 228, 225, 1]
                  }
                }
              }
            }
          }
        }
      },
      "n": {
        "t": {
          "c": {
            "r": {
              "e": {
                "a": {
                  "m": {
                    "colors": [245, 255, 250, 1]
                  }
                }
              }
            }
          }
        }
      },
      "d": {
        "n": {
          "i": {
            "g": {
              "h": {
                "t": {
                  "b": {
                    "l": {
                      "u": {
                        "e": {
                          "colors": [25, 25, 112, 1]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "o": {
      "c": {
        "c": {
          "a": {
            "s": {
              "i": {
                "n": {
                  "colors": [255, 228, 181, 1]
                }
              }
            }
          }
        }
      }
    },
    "a": {
      "g": {
        "e": {
          "n": {
            "t": {
              "a": {
                "colors": [255, 0, 255, 1]
              }
            }
          }
        }
      },
      "r": {
        "o": {
          "o": {
            "n": {
              "colors": [128, 0, 0, 1]
            }
          }
        }
      }
    },
    "e": {
      "d": {
        "i": {
          "u": {
            "m": {
              "v": {
                "i": {
                  "o": {
                    "l": {
                      "e": {
                        "t": {
                          "r": {
                            "e": {
                              "d": {
                                "colors": [199, 21, 133, 1]
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "o": {
                "r": {
                  "c": {
                    "h": {
                      "i": {
                        "d": {
                          "colors": [186, 85, 211, 1]
                        }
                      }
                    }
                  }
                }
              },
              "p": {
                "u": {
                  "r": {
                    "p": {
                      "l": {
                        "e": {
                          "colors": [147, 112, 219, 1]
                        }
                      }
                    }
                  }
                }
              },
              "s": {
                "l": {
                  "a": {
                    "t": {
                      "e": {
                        "b": {
                          "l": {
                            "u": {
                              "e": {
                                "colors": [123, 104, 238, 1]
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "e": {
                  "a": {
                    "g": {
                      "r": {
                        "e": {
                          "e": {
                            "n": {
                              "colors": [60, 179, 113, 1]
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "p": {
                  "r": {
                    "i": {
                      "n": {
                        "g": {
                          "g": {
                            "r": {
                              "e": {
                                "e": {
                                  "n": {
                                    "colors": [0, 250, 154, 1]
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "a": {
                "q": {
                  "u": {
                    "a": {
                      "m": {
                        "a": {
                          "r": {
                            "i": {
                              "n": {
                                "e": {
                                  "colors": [102, 205, 170, 1]
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "t": {
                "u": {
                  "r": {
                    "q": {
                      "u": {
                        "o": {
                          "i": {
                            "s": {
                              "e": {
                                "colors": [72, 209, 204, 1]
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "b": {
                "l": {
                  "u": {
                    "e": {
                      "colors": [0, 0, 205, 1]
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "n": {
    "a": {
      "v": {
        "a": {
          "j": {
            "o": {
              "w": {
                "h": {
                  "i": {
                    "t": {
                      "e": {
                        "colors": [255, 222, 173, 1]
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "y": {
          "colors": [0, 0, 128, 1]
        }
      }
    }
  },
  "g": {
    "o": {
      "l": {
        "d": {
          "colors": [255, 215, 0, 1],
          "e": {
            "n": {
              "r": {
                "o": {
                  "d": {
                    "colors": [218, 165, 32, 1]
                  }
                }
              }
            }
          }
        }
      }
    },
    "h": {
      "o": {
        "s": {
          "t": {
            "w": {
              "h": {
                "i": {
                  "t": {
                    "e": {
                      "colors": [248, 248, 255, 1]
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "a": {
      "i": {
        "n": {
          "s": {
            "b": {
              "o": {
                "r": {
                  "o": {
                    "colors": [220, 220, 220, 1]
                  }
                }
              }
            }
          }
        }
      }
    },
    "r": {
      "e": {
        "e": {
          "n": {
            "y": {
              "e": {
                "l": {
                  "l": {
                    "o": {
                      "w": {
                        "colors": [173, 255, 47, 1]
                      }
                    }
                  }
                }
              }
            },
            "colors": [0, 128, 0, 1]
          }
        },
        "y": {
          "colors": [128, 128, 128, 1]
        }
      },
      "a": {
        "y": {
          "colors": [128, 128, 128, 1]
        }
      }
    }
  },
  "o": {
    "r": {
      "a": {
        "n": {
          "g": {
            "e": {
              "colors": [255, 165, 0, 1],
              "r": {
                "e": {
                  "d": {
                    "colors": [255, 69, 0, 1]
                  }
                }
              }
            }
          }
        }
      },
      "c": {
        "h": {
          "i": {
            "d": {
              "colors": [218, 112, 214, 1]
            }
          }
        }
      }
    },
    "l": {
      "d": {
        "l": {
          "a": {
            "c": {
              "e": {
                "colors": [253, 245, 230, 1]
              }
            }
          }
        }
      },
      "i": {
        "v": {
          "e": {
            "colors": [128, 128, 0, 1],
            "d": {
              "r": {
                "a": {
                  "b": {
                    "colors": [107, 142, 35, 1]
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "d": {
    "a": {
      "r": {
        "k": {
          "o": {
            "r": {
              "a": {
                "n": {
                  "g": {
                    "e": {
                      "colors": [255, 140, 0, 1]
                    }
                  }
                }
              },
              "c": {
                "h": {
                  "i": {
                    "d": {
                      "colors": [153, 50, 204, 1]
                    }
                  }
                }
              }
            },
            "l": {
              "i": {
                "v": {
                  "e": {
                    "g": {
                      "r": {
                        "e": {
                          "e": {
                            "n": {
                              "colors": [85, 107, 47, 1]
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "s": {
            "a": {
              "l": {
                "m": {
                  "o": {
                    "n": {
                      "colors": [233, 150, 122, 1]
                    }
                  }
                }
              }
            },
            "e": {
              "a": {
                "g": {
                  "r": {
                    "e": {
                      "e": {
                        "n": {
                          "colors": [143, 188, 143, 1]
                        }
                      }
                    }
                  }
                }
              }
            },
            "l": {
              "a": {
                "t": {
                  "e": {
                    "b": {
                      "l": {
                        "u": {
                          "e": {
                            "colors": [72, 61, 139, 1]
                          }
                        }
                      }
                    },
                    "g": {
                      "r": {
                        "e": {
                          "y": {
                            "colors": [47, 79, 79, 1]
                          }
                        },
                        "a": {
                          "y": {
                            "colors": [47, 79, 79, 1]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "k": {
            "h": {
              "a": {
                "k": {
                  "i": {
                    "colors": [189, 183, 107, 1]
                  }
                }
              }
            }
          },
          "g": {
            "o": {
              "l": {
                "d": {
                  "e": {
                    "n": {
                      "r": {
                        "o": {
                          "d": {
                            "colors": [184, 134, 11, 1]
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "r": {
              "e": {
                "y": {
                  "colors": [169, 169, 169, 1]
                },
                "e": {
                  "n": {
                    "colors": [0, 100, 0, 1]
                  }
                }
              },
              "a": {
                "y": {
                  "colors": [169, 169, 169, 1]
                }
              }
            }
          },
          "v": {
            "i": {
              "o": {
                "l": {
                  "e": {
                    "t": {
                      "colors": [148, 0, 211, 1]
                    }
                  }
                }
              }
            }
          },
          "m": {
            "a": {
              "g": {
                "e": {
                  "n": {
                    "t": {
                      "a": {
                        "colors": [139, 0, 139, 1]
                      }
                    }
                  }
                }
              }
            }
          },
          "r": {
            "e": {
              "d": {
                "colors": [139, 0, 0, 1]
              }
            }
          },
          "t": {
            "u": {
              "r": {
                "q": {
                  "u": {
                    "o": {
                      "i": {
                        "s": {
                          "e": {
                            "colors": [0, 206, 209, 1]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "c": {
            "y": {
              "a": {
                "n": {
                  "colors": [0, 139, 139, 1]
                }
              }
            }
          },
          "b": {
            "l": {
              "u": {
                "e": {
                  "colors": [0, 0, 139, 1]
                }
              }
            }
          }
        }
      }
    },
    "e": {
      "e": {
        "p": {
          "p": {
            "i": {
              "n": {
                "k": {
                  "colors": [255, 20, 147, 1]
                }
              }
            }
          },
          "s": {
            "k": {
              "y": {
                "b": {
                  "l": {
                    "u": {
                      "e": {
                        "colors": [0, 191, 255, 1]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "i": {
      "m": {
        "g": {
          "r": {
            "e": {
              "y": {
                "colors": [105, 105, 105, 1]
              }
            },
            "a": {
              "y": {
                "colors": [105, 105, 105, 1]
              }
            }
          }
        }
      }
    },
    "o": {
      "d": {
        "g": {
          "e": {
            "r": {
              "b": {
                "l": {
                  "u": {
                    "e": {
                      "colors": [30, 144, 255, 1]
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "h": {
    "o": {
      "t": {
        "p": {
          "i": {
            "n": {
              "k": {
                "colors": [255, 105, 180, 1]
              }
            }
          }
        }
      },
      "n": {
        "e": {
          "y": {
            "d": {
              "e": {
                "w": {
                  "colors": [240, 255, 240, 1]
                }
              }
            }
          }
        }
      }
    }
  },
  "t": {
    "o": {
      "m": {
        "a": {
          "t": {
            "o": {
              "colors": [255, 99, 71, 1]
            }
          }
        }
      }
    },
    "h": {
      "i": {
        "s": {
          "t": {
            "l": {
              "e": {
                "colors": [216, 191, 216, 1]
              }
            }
          }
        }
      }
    },
    "a": {
      "n": {
        "colors": [210, 180, 140, 1]
      }
    },
    "u": {
      "r": {
        "q": {
          "u": {
            "o": {
              "i": {
                "s": {
                  "e": {
                    "colors": [64, 224, 208, 1]
                  }
                }
              }
            }
          }
        }
      }
    },
    "e": {
      "a": {
        "l": {
          "colors": [0, 128, 128, 1]
        }
      }
    }
  },
  "r": {
    "e": {
      "d": {
        "colors": [255, 0, 0, 1]
      },
      "b": {
        "e": {
          "c": {
            "c": {
              "a": {
                "p": {
                  "u": {
                    "r": {
                      "p": {
                        "l": {
                          "e": {
                            "colors": [102, 51, 153, 1]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "o": {
      "s": {
        "y": {
          "b": {
            "r": {
              "o": {
                "w": {
                  "n": {
                    "colors": [188, 143, 143, 1]
                  }
                }
              }
            }
          }
        }
      },
      "y": {
        "a": {
          "l": {
            "b": {
              "l": {
                "u": {
                  "e": {
                    "colors": [65, 105, 225, 1]
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "a": {
    "n": {
      "t": {
        "i": {
          "q": {
            "u": {
              "e": {
                "w": {
                  "h": {
                    "i": {
                      "t": {
                        "e": {
                          "colors": [250, 235, 215, 1]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "z": {
      "u": {
        "r": {
          "e": {
            "colors": [240, 255, 255, 1]
          }
        }
      }
    },
    "l": {
      "i": {
        "c": {
          "e": {
            "b": {
              "l": {
                "u": {
                  "e": {
                    "colors": [240, 248, 255, 1]
                  }
                }
              }
            }
          }
        }
      }
    },
    "q": {
      "u": {
        "a": {
          "m": {
            "a": {
              "r": {
                "i": {
                  "n": {
                    "e": {
                      "colors": [127, 255, 212, 1]
                    }
                  }
                }
              }
            }
          },
          "colors": [0, 255, 255, 1]
        }
      }
    }
  },
  "k": {
    "h": {
      "a": {
        "k": {
          "i": {
            "colors": [240, 230, 140, 1]
          }
        }
      }
    }
  },
  "v": {
    "i": {
      "o": {
        "l": {
          "e": {
            "t": {
              "colors": [238, 130, 238, 1]
            }
          }
        }
      }
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorProcessor);
 // console.log(RGBtoHSL([0, 0, 0]));
// console.log(RGBtoHSL([255, 255, 255]));
// console.log(RGBtoHSL([255, 0, 0]));
// console.log(RGBtoHSL([0, 255, 0]));
// console.log(RGBtoHSL([0, 0, 255]));
// console.log(RGBtoHSL([255, 255, 0]));
// console.log(RGBtoHSL([205, 170, 153]));
// var hsl = RGBtoHSL([255, 227, 150]);
// console.log(hsl);
// HSLtoRGB(hsl);
// console.log(hsl);
//console.log(parseColorsToHSL('rgba(0,0,0, 0.15)', 0));

/***/ }),

/***/ 784:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Color {
  static makeHSLColorString(colors) {
    return 'hsl(' + colors[0] + ',' + colors[1] + '%,' + colors[2] + '%)';
  }

  static makeColorKeyFromArray(colors) {
    return colors[0] << 16 | colors[1] << 8 | colors[2];
  }

  static makeHSLColorArrayFromKey(color_key) {
    return [color_key >> 16 & 0xFF, color_key >> 8 & 0xFF, color_key & 0xFF];
  }

  static RGBtoHSL(colors) {
    var r = colors[0] / 255;
    var g = colors[1] / 255;
    var b = colors[2] / 255;
    var hue, sat, light;
    var c_max = Math.max(r, Math.max(g, b));
    var c_min = Math.min(r, Math.min(g, b));
    var d = c_max - c_min;
    light = (c_max + c_min) * 0.5;

    if (d === 0) {
      hue = 0;
      sat = 0;
    } else {
      if (c_max === r) {
        hue = 60 * Color.modFloat((g - b) / d, 6);
      } else if (c_max === g) {
        hue = 60 * ((b - r) / d + 2);
      } else hue = 60 * ((r - g) / d + 4);

      sat = d / (1 - Math.abs(2 * light - 1));
    }

    colors[0] = Math.round(hue);
    colors[1] = Math.round(sat * 100);
    colors[2] = Math.round(light * 100);
  }

  static HSLtoRGB(colors) {
    colors[0] %= 360;
    var S = colors[1] * 0.01;
    var L = colors[2] * 0.01;
    var C = (1 - Math.abs(2 * L - 1)) * S;
    var X = C * (1 - Math.abs(Color.modFloat(colors[0] / 60, 2) - 1));
    var m = L - C * 0.5;

    if (colors[0] < 180) {
      if (colors[0] < 60) {
        colors[0] = C;
        colors[1] = X;
        colors[2] = 0;
      } else if (colors[0] < 120) {
        colors[0] = X;
        colors[1] = C;
        colors[2] = 0;
      } else {
        colors[0] = 0;
        colors[1] = C;
        colors[2] = X;
      }
    } else {
      if (colors[0] < 240) {
        colors[0] = 0;
        colors[1] = X;
        colors[2] = C;
      } else if (colors[0] < 300) {
        colors[0] = X;
        colors[1] = 0;
        colors[2] = C;
      } else {
        colors[0] = C;
        colors[1] = 0;
        colors[2] = X;
      }
    }

    colors[0] = Math.round((colors[0] + m) * 255);
    colors[1] = Math.round((colors[1] + m) * 255);
    colors[2] = Math.round((colors[2] + m) * 255);
  }

  static modFloat(v, base) {
    var a = v / base;
    a -= Math.floor(a);
    return a * base;
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Color);

/***/ }),

/***/ 4255:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _color_processor_utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3377);
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(784);
/* harmony import */ var _color_processor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6866);
/* harmony import */ var _color_map_processor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5308);





class ModeBackground {
  constructor(colorProcessor) {
    this.initial = [0, 0, 0, 0];
    this.colorProcessor = colorProcessor;
  }

  applyToHSLColorsAsString(colors) {
    _color_processor_utility__WEBPACK_IMPORTED_MODULE_0__/* ["default"].processBackgroundHSLColorArray */ .Z.processBackgroundHSLColorArray(colors);
    var key = _color__WEBPACK_IMPORTED_MODULE_3__/* ["default"].makeColorKeyFromArray */ .Z.makeColorKeyFromArray(colors);
    _color_processor__WEBPACK_IMPORTED_MODULE_1__/* ["default"].colorsWithKey */ .Z.colorsWithKey[key] = colors;
    _color_processor__WEBPACK_IMPORTED_MODULE_1__/* ["default"].colors */ .Z.colors[key] = null; //===================== CUSTOM COLORS ==================

    if (window.nightEyeProOptions !== undefined) {
      const newColorValue = _color_map_processor__WEBPACK_IMPORTED_MODULE_2__/* ["default"].getCustomColor */ .Z.getCustomColor(colors, window.nightEyeProOptions.colorsBackground);

      if (newColorValue !== null) {
        return newColorValue;
      }
    } //=======================================================


    return _color_processor_utility__WEBPACK_IMPORTED_MODULE_0__/* ["default"].makeHSLAString */ .Z.makeHSLAString(colors);
  }

  applyToRGBColorsAsString(colors) {
    _color__WEBPACK_IMPORTED_MODULE_3__/* ["default"].RGBtoHSL */ .Z.RGBtoHSL(colors);
    return this.applyToHSLColorsAsString(colors);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModeBackground);

/***/ }),

/***/ 3092:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _color_processor_utility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3377);
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(784);
/* harmony import */ var _color_processor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6866);
/* harmony import */ var _color_map_processor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5308);





class ModeForeground {
  constructor(colorProcessor) {
    this.initial = [0, 0, 0, 1];
    this.colorProcessor = colorProcessor;
  }

  applyToHSLColorsAsString(colors) {
    _color_processor_utility__WEBPACK_IMPORTED_MODULE_0__/* ["default"].processForegroundHSLColorArray */ .Z.processForegroundHSLColorArray(colors);
    _color_processor__WEBPACK_IMPORTED_MODULE_1__/* ["default"].colors */ .Z.colors[_color__WEBPACK_IMPORTED_MODULE_3__/* ["default"].makeColorKeyFromArray */ .Z.makeColorKeyFromArray(colors)] = null; //===================== CUSTOM COLORS ==================

    if (window.nightEyeProOptions !== undefined) {
      const newColorValue = _color_map_processor__WEBPACK_IMPORTED_MODULE_2__/* ["default"].getCustomColor */ .Z.getCustomColor(colors, window.nightEyeProOptions.colorsForeground);

      if (newColorValue !== null) {
        return newColorValue;
      }
    } //=======================================================


    return _color_processor_utility__WEBPACK_IMPORTED_MODULE_0__/* ["default"].makeHSLAString */ .Z.makeHSLAString(colors);
  }

  applyToRGBColorsAsString(colors) {
    _color__WEBPACK_IMPORTED_MODULE_3__/* ["default"].RGBtoHSL */ .Z.RGBtoHSL(colors);
    return this.applyToHSLColorsAsString(colors);
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModeForeground);

/***/ }),

/***/ 7584:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Utilities)
/* harmony export */ });
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2105);

class Utilities {
  static makeURL(url, PAGE_PROTOCOL, PAGE_HOSTNAME, PAGE_PORT, PAGE_URL) {
    if (PAGE_PROTOCOL === undefined) {
      PAGE_PROTOCOL = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_PROTOCOL;
      PAGE_HOSTNAME = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_HOSTNAME;
      PAGE_PORT = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_PORT;
      PAGE_URL = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_URL;
    }

    if (PAGE_PORT !== '') {
      PAGE_PORT = ':' + PAGE_PORT;
    }

    var pos = url.lastIndexOf('/%20/'); //import css urls

    if (pos > -1) {
      return PAGE_PROTOCOL + '//' + PAGE_HOSTNAME + PAGE_PORT + url.substring(pos + 4);
    }

    if (url.slice(0, 2) === '//') return PAGE_PROTOCOL + url;
    if (url[0] === '/') return PAGE_PROTOCOL + '//' + PAGE_HOSTNAME + PAGE_PORT + url;
    if (url.slice(0, 8).lastIndexOf('://') !== -1) return url;
    return PAGE_URL + url;
  }

  static parseURL(url) {
    url = url.replace('www.', _constants_constants__WEBPACK_IMPORTED_MODULE_0__/* .Strings.EMPTY */ .eI.EMPTY);
    var index = url.indexOf('://');

    if (index !== -1) {
      url = url.substring(index + 3);
      index = url.indexOf('/');
      if (index !== -1) url = url.substring(0, index);
    }

    return url;
  }

  static insertAfter(new_node, ref_node) {
    if (ref_node.nextSibling !== null) ref_node.parentNode.insertBefore(new_node, ref_node.nextSibling);else (ref_node.parentNode === null ? document.documentElement : ref_node.parentNode).appendChild(new_node);
  }

  static insertBefore(new_node, ref_node) {
    ref_node.parentNode.insertBefore(new_node, ref_node);
  }

  static makeParsedStyleNode() {
    var style_n = document.createElement('style');
    style_n.tgParsed = true;
    style_n.tgIgnore = true;
    return style_n;
  }

  static makeParsedLinkNode(href) {
    var link_n = document.createElement('link');
    link_n.tgParsed = true;
    link_n.tgIgnore = true;
    link_n.rel = 'stylesheet';
    link_n.href = href;
    return link_n;
  }

}

/***/ }),

/***/ 5034:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AR": () => (/* binding */ Mode),
/* harmony export */   "Jr": () => (/* binding */ LOCAL_STORAGE_KEY),
/* harmony export */   "Jw": () => (/* binding */ WidgetScreenPosition),
/* harmony export */   "S": () => (/* binding */ S),
/* harmony export */   "eI": () => (/* binding */ Strings),
/* harmony export */   "qx": () => (/* binding */ CookieNames)
/* harmony export */ });
/* unused harmony exports Results, Colors */
const Strings = {
  EMPTY: '',
  TRUE: 't',
  FALSE: 'f',
  OK: '0',
  ERROR: '1',
  NOT_EXISTS: '-2147483648',
  UNDEF: 'undefined'
};
const S = {
  NOT_EXISTS: -2147483648,
  EXISTS: -2147483647,
  page: null,
  page_cpanel: null,
  mobile: false,
  PAGE_URL: '',
  PAGE_PROTOCOL: '',
  PAGE_HOSTNAME: '',
  IFRAME: '',
  IMAGE_PROCESSING_ENABLED: false,
  URL: '',
  isInitialConvertedCounter: 0,
  IMPORT_CSS_INDEX_LAST_POSITION: 1000 //BIG NUMBER - need to be last element in the DOM order

};
const Results = {
  OK: '0',
  ERROR: '1'
};
const Colors = {
  WHITE: '#fff',
  LIGHT_RED: '#ffd7d7',
  RED: '#f00',
  GRAY128: '#808080',
  GRAY242: '#f2f2f2'
};
const LOCAL_STORAGE_KEY = {
  STATE: 'nighteyewState',
  USER_EXPLICITY_CHANGED: 'nighteyeuschedts'
};
const CookieNames = {
  MODE: 'ne_pl_m'
};
const Mode = {
  DARK: 1,
  NORMAL: 2
};
const WidgetScreenPosition = {
  BOTTOM_LEFT: 0,
  TOP_LEFT: 1,
  TOP_RIGHT: 2,
  BOTTOM_RIGHT: 3
};


/***/ }),

/***/ 5590:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
// /* harmony import */ var _widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(359);
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5034);
/* harmony import */ var _utilities_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6021);
/* harmony import */ var NightEyeCore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6150);
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5034);
/* harmony import */ var _utilities_cookies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6568);

class NightEyeStart {
  constructor(options) {
    this.options = options;
    this.isDarkMode = false;
  }

  init() {

    this.isDarkMode = parseInt(localStorage.getItem(_constants_constants__WEBPACK_IMPORTED_MODULE_1__/* .LOCAL_STORAGE_KEY.STATE */ .Jr.STATE)) === _constants_constants__WEBPACK_IMPORTED_MODULE_1__/* .Mode.DARK */ .AR.DARK;

    if (this.isDarkMode) {
      var core = new NightEyeCore__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z();
      core.start();
      this.enableDMTrigger();
      return;
    }

    this.enableDMTrigger();
    document.documentElement.setAttribute('nighteyeplgn', 'disabled');
  }

  enableDMTrigger() {
    var _this = this;
    this.iconButton = document.querySelectorAll('.dm-toggle');
    var mode = !this.isDarkMode ? _constants_constants__WEBPACK_IMPORTED_MODULE_0__/* .Mode.DARK */ .AR.DARK : _constants_constants__WEBPACK_IMPORTED_MODULE_0__/* .Mode.NORMAL */ .AR.NORMAL;

    // loop through each button and add a click event listener
    this.iconButton.forEach(function(button) {
      button.addEventListener("click", function() {
        _this.changeMode(mode);
      });
    });
  }

  changeMode(mode) {
    var currentTS = new Date().getTime();
    localStorage.setItem(_constants_constants__WEBPACK_IMPORTED_MODULE_0__/* .LOCAL_STORAGE_KEY.STATE */ .Jr.STATE, mode);
    localStorage.setItem(_constants_constants__WEBPACK_IMPORTED_MODULE_0__/* .LOCAL_STORAGE_KEY.USER_EXPLICITY_CHANGED */ .Jr.USER_EXPLICITY_CHANGED, currentTS);
    _utilities_cookies__WEBPACK_IMPORTED_MODULE_1__/* ["default"].set */ .Z.set(_constants_constants__WEBPACK_IMPORTED_MODULE_0__/* .CookieNames.MODE */ .qx.MODE, mode);
    window.location.reload();
  }

}

window.nightEyeOptions = {
  status: '0',
  desktopPosition: '0',
  mobilePosition: '0',
  position: '0'
};

var nighteyeStart = new NightEyeStart(window.nightEyeOptions);
nighteyeStart.init();

/***/ }),

/***/ 6568:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Cookies)
/* harmony export */ });
class Cookies {
  static set(name, value) {
    var expire = new Date();
    expire.setFullYear(expire.getFullYear() + 10);
    document.cookie = name + '=' + value + "; expires=" + expire.toGMTString() + ";path=/";
  }

  static getValue(cookie_name) {
    var cookie,
        cookies = document.cookie.split(';');

    for (var i = cookies.length - 1; i >= 0; --i) {
      cookie = cookies[i].split('=');
      if (cookie[0].trim() === cookie_name) return cookie[1];
    }

    return null;
  }

  static delete(name) {
    var expire = new Date();
    expire.setFullYear(expire.getFullYear() - 10);
    document.cookie = name + "=1; expires=" + expire.toGMTString() + "; path=/";
  }

}

/***/ }),

/***/ 6021:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Utilities)
/* harmony export */ });
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5034);

class Utilities {
  static makeURL(url, PAGE_PROTOCOL, PAGE_HOSTNAME, PAGE_PORT, PAGE_URL) {
    if (PAGE_PROTOCOL === undefined) {
      PAGE_PROTOCOL = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_PROTOCOL;
      PAGE_HOSTNAME = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_HOSTNAME;
      PAGE_PORT = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_PORT;
      PAGE_URL = _constants_constants__WEBPACK_IMPORTED_MODULE_0__.S.PAGE_URL;
    }

    if (PAGE_PORT !== '') {
      PAGE_PORT = ':' + PAGE_PORT;
    }

    var pos = url.lastIndexOf('/%20/'); //import css urls

    if (pos > -1) {
      return PAGE_PROTOCOL + '//' + PAGE_HOSTNAME + PAGE_PORT + url.substring(pos + 4);
    }

    if (url.slice(0, 2) === '//') return PAGE_PROTOCOL + url;
    if (url[0] === '/') return PAGE_PROTOCOL + '//' + PAGE_HOSTNAME + PAGE_PORT + url;
    if (url.slice(0, 8).lastIndexOf('://') !== -1) return url;
    return PAGE_URL + url;
  }

  static parseURL(url) {
    url = url.replace('www.', _constants_constants__WEBPACK_IMPORTED_MODULE_0__/* .Strings.EMPTY */ .eI.EMPTY);
    var index = url.indexOf('://');

    if (index !== -1) {
      url = url.substring(index + 3);
      index = url.indexOf('/');
      if (index !== -1) url = url.substring(0, index);
    }

    return url;
  }

  static insertAfter(new_node, ref_node) {
    if (ref_node.nextSibling !== null) ref_node.parentNode.insertBefore(new_node, ref_node.nextSibling);else (ref_node.parentNode === null ? document.documentElement : ref_node.parentNode).appendChild(new_node);
  }

  static insertBefore(new_node, ref_node) {
    ref_node.parentNode.insertBefore(new_node, ref_node);
  }

  static makeParsedStyleNode() {
    var style_n = document.createElement('style');
    style_n.tgParsed = true;
    style_n.tgIgnore = true;
    return style_n;
  }

  static makeParsedLinkNode(href) {
    var link_n = document.createElement('link');
    link_n.tgParsed = true;
    link_n.tgIgnore = true;
    link_n.rel = 'stylesheet';
    link_n.href = href;
    return link_n;
  }

  static isInTimerInterval(startHourData, endHourData) {
    var currentDate = new Date();
    var currentHours = currentDate.getHours();
    var currentMinutes = currentDate.getMinutes();
    var startTimeData = startHourData.split(':');
    var endTimeData = endHourData.split(':');
    var startHours = parseInt(startTimeData[0]);
    var startHoursMinutes = parseInt(startTimeData[1]);
    var endHours = parseInt(endTimeData[0]);
    var endHoursMinutes = parseInt(endTimeData[1]);

    if (startHours <= currentHours || currentHours <= endHours) {
      if (startHours == currentHours && startHoursMinutes > currentMinutes) {
        return false;
      }

      if (endHours == currentHours && endHoursMinutes < currentMinutes) {
        return false;
      }

      return true;
    }

    return false;
  }

  static isMobile() {
    var check = false;

    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);

    return check;
  }

}

/***/ }),

/***/ 1926:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(2526);
__webpack_require__(2443);
__webpack_require__(1817);
__webpack_require__(2401);
__webpack_require__(8722);
__webpack_require__(2165);
__webpack_require__(9007);
__webpack_require__(3510);
__webpack_require__(1840);
__webpack_require__(6982);
__webpack_require__(2159);
__webpack_require__(6649);
__webpack_require__(9341);
__webpack_require__(543);
__webpack_require__(9601);
__webpack_require__(8011);
__webpack_require__(9070);
__webpack_require__(3321);
__webpack_require__(9720);
__webpack_require__(3371);
__webpack_require__(8559);
__webpack_require__(8880);
__webpack_require__(9337);
__webpack_require__(6210);
__webpack_require__(489);
__webpack_require__(3304);
__webpack_require__(1825);
__webpack_require__(8410);
__webpack_require__(2200);
__webpack_require__(7941);
__webpack_require__(7227);
__webpack_require__(514);
__webpack_require__(8304);
__webpack_require__(6833);
__webpack_require__(1539);
__webpack_require__(9595);
__webpack_require__(5500);
__webpack_require__(4869);
__webpack_require__(3952);
__webpack_require__(4812);
__webpack_require__(8309);
__webpack_require__(4855);
__webpack_require__(1038);
__webpack_require__(9753);
__webpack_require__(6572);
__webpack_require__(2222);
__webpack_require__(545);
__webpack_require__(6541);
__webpack_require__(3290);
__webpack_require__(7327);
__webpack_require__(9826);
__webpack_require__(4553);
__webpack_require__(4944);
__webpack_require__(6535);
__webpack_require__(9554);
__webpack_require__(6699);
__webpack_require__(2772);
__webpack_require__(9600);
__webpack_require__(4986);
__webpack_require__(1249);
__webpack_require__(5827);
__webpack_require__(6644);
__webpack_require__(5069);
__webpack_require__(7042);
__webpack_require__(5212);
__webpack_require__(2707);
__webpack_require__(561);
__webpack_require__(8706);
__webpack_require__(3792);
__webpack_require__(9244);
__webpack_require__(6992);
__webpack_require__(4953);
__webpack_require__(8992);
__webpack_require__(9841);
__webpack_require__(7852);
__webpack_require__(2023);
__webpack_require__(4723);
__webpack_require__(6528);
__webpack_require__(3112);
__webpack_require__(2481);
__webpack_require__(5306);
__webpack_require__(4765);
__webpack_require__(3123);
__webpack_require__(6755);
__webpack_require__(3210);
__webpack_require__(5674);
__webpack_require__(8702);
__webpack_require__(8783);
__webpack_require__(5218);
__webpack_require__(4475);
__webpack_require__(7929);
__webpack_require__(915);
__webpack_require__(9253);
__webpack_require__(2125);
__webpack_require__(8830);
__webpack_require__(8734);
__webpack_require__(9254);
__webpack_require__(7268);
__webpack_require__(7397);
__webpack_require__(86);
__webpack_require__(623);
__webpack_require__(4603);
__webpack_require__(4916);
__webpack_require__(2087);
__webpack_require__(9714);
__webpack_require__(1058);
__webpack_require__(4678);
__webpack_require__(9653);
__webpack_require__(3299);
__webpack_require__(5192);
__webpack_require__(3161);
__webpack_require__(4048);
__webpack_require__(8285);
__webpack_require__(4363);
__webpack_require__(5994);
__webpack_require__(1874);
__webpack_require__(9494);
__webpack_require__(6977);
__webpack_require__(5147);
__webpack_require__(9752);
__webpack_require__(2376);
__webpack_require__(3181);
__webpack_require__(3484);
__webpack_require__(2388);
__webpack_require__(8621);
__webpack_require__(403);
__webpack_require__(4755);
__webpack_require__(5438);
__webpack_require__(332);
__webpack_require__(658);
__webpack_require__(197);
__webpack_require__(4914);
__webpack_require__(2420);
__webpack_require__(160);
__webpack_require__(970);
__webpack_require__(2703);
__webpack_require__(3689);
__webpack_require__(3843);
__webpack_require__(5735);
__webpack_require__(5268);
__webpack_require__(3710);
__webpack_require__(6078);
__webpack_require__(3706);
__webpack_require__(8674);
__webpack_require__(7727);
__webpack_require__(1532);
__webpack_require__(189);
__webpack_require__(4129);
__webpack_require__(8478);
__webpack_require__(8264);
__webpack_require__(6938);
__webpack_require__(9575);
__webpack_require__(6716);
__webpack_require__(7145);
__webpack_require__(2472);
__webpack_require__(9743);
__webpack_require__(5109);
__webpack_require__(8255);
__webpack_require__(5125);
__webpack_require__(9135);
__webpack_require__(4197);
__webpack_require__(6495);
__webpack_require__(8145);
__webpack_require__(5206);
__webpack_require__(2990);
__webpack_require__(8927);
__webpack_require__(3105);
__webpack_require__(5035);
__webpack_require__(4345);
__webpack_require__(7174);
__webpack_require__(2846);
__webpack_require__(4731);
__webpack_require__(7209);
__webpack_require__(6319);
__webpack_require__(8867);
__webpack_require__(7789);
__webpack_require__(3739);
__webpack_require__(9368);
__webpack_require__(4483);
__webpack_require__(2056);
__webpack_require__(3462);
__webpack_require__(678);
__webpack_require__(7462);
__webpack_require__(3824);
__webpack_require__(5021);
__webpack_require__(2974);
__webpack_require__(5016);
__webpack_require__(224);
__webpack_require__(2419);
__webpack_require__(9596);
__webpack_require__(2586);
__webpack_require__(4819);
__webpack_require__(5683);
__webpack_require__(9361);
__webpack_require__(1037);
__webpack_require__(5898);
__webpack_require__(7556);
__webpack_require__(4361);
__webpack_require__(3593);
__webpack_require__(9532);

/* unused reexport */ __webpack_require__(857);


/***/ }),

/***/ 3099:
/***/ ((module) => {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ 1223:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var UNSCOPABLES = __webpack_require__(5112)('unscopables');
var create = __webpack_require__(30);
var hide = __webpack_require__(5185);
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  hide(ArrayPrototype, UNSCOPABLES, create(null));
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ 1530:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var codePointAt = __webpack_require__(5866);

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? codePointAt(S, index, true).length : 1);
};


/***/ }),

/***/ 5787:
/***/ ((module) => {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ 9670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ 260:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);
var has = __webpack_require__(6656);
var classof = __webpack_require__(648);
var hide = __webpack_require__(5185);
var redefine = __webpack_require__(1320);
var defineProperty = (__webpack_require__(3070).f);
var getPrototypeOf = __webpack_require__(9518);
var setPrototypeOf = __webpack_require__(7674);
var TO_STRING_TAG = __webpack_require__(5112)('toStringTag');
var TYPED_ARRAY_TAG = __webpack_require__(9711)('TYPED_ARRAY_TAG');

var DataView = global.DataView;
var DataViewPrototype = DataView && DataView.prototype;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;

var NATIVE_ARRAY_BUFFER = !!(global.ArrayBuffer && global.DataView);
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf;
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var isView = function isView(it) {
  var klass = classof(it);
  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (setPrototypeOf) {
    if (isPrototypeOf.call(TypedArray, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
      return C;
    }
  } throw TypeError('Target is not a typed array constructor');
};

var exportProto = function (KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
      delete TypedArrayConstructor.prototype[KEY];
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportStatic = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
        delete TypedArrayConstructor[KEY];
      }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  if (!global[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !has(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    hide(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

// WebKit bug - the same parent prototype for typed arrays and data view
if (NATIVE_ARRAY_BUFFER && setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
  setPrototypeOf(DataViewPrototype, ObjectPrototype);
}

module.exports = {
  NATIVE_ARRAY_BUFFER: NATIVE_ARRAY_BUFFER,
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportProto: exportProto,
  exportStatic: exportStatic,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ 3331:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(7854);
var DESCRIPTORS = __webpack_require__(9781);
var NATIVE_ARRAY_BUFFER = (__webpack_require__(260).NATIVE_ARRAY_BUFFER);
var hide = __webpack_require__(5185);
var redefineAll = __webpack_require__(2248);
var fails = __webpack_require__(7293);
var anInstance = __webpack_require__(5787);
var toInteger = __webpack_require__(9958);
var toLength = __webpack_require__(7466);
var toIndex = __webpack_require__(7067);
var getOwnPropertyNames = (__webpack_require__(8006).f);
var defineProperty = (__webpack_require__(3070).f);
var arrayFill = __webpack_require__(1285);
var setToStringTag = __webpack_require__(8003);
var InternalStateModule = __webpack_require__(9909);
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = 1 / 0;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpackIEEE754 = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new NativeArrayBuffer(); // eslint-disable-line no-new
    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, NativeArrayBuffer[key]);
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var nativeSetInt8 = $DataView[PROTOTYPE].setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),

/***/ 1048:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(7908);
var toAbsoluteIndex = __webpack_require__(1400);
var toLength = __webpack_require__(7466);

// `Array.prototype.copyWithin` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ 1285:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(7908);
var toAbsoluteIndex = __webpack_require__(1400);
var toLength = __webpack_require__(7466);

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ 8533:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var nativeForEach = [].forEach;
var internalForEach = __webpack_require__(7550)(0);

var SLOPPY_METHOD = __webpack_require__(6637)('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = SLOPPY_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return internalForEach(this, callbackfn, arguments[1]);
} : nativeForEach;


/***/ }),

/***/ 8457:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var bind = __webpack_require__(244);
var toObject = __webpack_require__(7908);
var callWithSafeIterationClosing = __webpack_require__(3411);
var isArrayIteratorMethod = __webpack_require__(7659);
var toLength = __webpack_require__(7466);
var createProperty = __webpack_require__(6135);
var getIteratorMethod = __webpack_require__(1246);

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var index = 0;
  var iteratorMethod = getIteratorMethod(O);
  var length, result, step, iterator;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    result = new C();
    for (;!(step = iterator.next()).done; index++) {
      createProperty(result, index, mapping
        ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
        : step.value
      );
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ 1318:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(5656);
var toLength = __webpack_require__(7466);
var toAbsoluteIndex = __webpack_require__(1400);

// `Array.prototype.{ indexOf, includes }` methods implementation
// false -> Array#indexOf
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
// true  -> Array#includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ 6583:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(5656);
var toInteger = __webpack_require__(9958);
var toLength = __webpack_require__(7466);
var nativeLastIndexOf = [].lastIndexOf;

var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var SLOPPY_METHOD = __webpack_require__(6637)('lastIndexOf');

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
module.exports = (NEGATIVE_ZERO || SLOPPY_METHOD) ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
  return -1;
} : nativeLastIndexOf;


/***/ }),

/***/ 1194:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var SPECIES = __webpack_require__(5112)('species');

module.exports = function (METHOD_NAME) {
  return !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ 7550:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var bind = __webpack_require__(244);
var IndexedObject = __webpack_require__(8361);
var toObject = __webpack_require__(7908);
var toLength = __webpack_require__(7466);
var arraySpeciesCreate = __webpack_require__(5417);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
// 0 -> Array#forEach
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
// 1 -> Array#map
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// 2 -> Array#filter
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// 3 -> Array#some
// https://tc39.github.io/ecma262/#sec-array.prototype.some
// 4 -> Array#every
// https://tc39.github.io/ecma262/#sec-array.prototype.every
// 5 -> Array#find
// https://tc39.github.io/ecma262/#sec-array.prototype.find
// 6 -> Array#findIndex
// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
module.exports = function (TYPE, specificCreate) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = specificCreate || arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: target.push(value);       // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};


/***/ }),

/***/ 3671:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aFunction = __webpack_require__(3099);
var toObject = __webpack_require__(7908);
var IndexedObject = __webpack_require__(8361);
var toLength = __webpack_require__(7466);

// `Array.prototype.{ reduce, reduceRight }` methods implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
// https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
module.exports = function (that, callbackfn, argumentsLength, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IndexedObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (argumentsLength < 2) while (true) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),

/***/ 5417:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var isArray = __webpack_require__(3157);
var SPECIES = __webpack_require__(5112)('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ 244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aFunction = __webpack_require__(3099);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 3411:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ 7072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ITERATOR = __webpack_require__(5112)('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ 4326:
/***/ ((module) => {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 648:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classofRaw = __webpack_require__(4326);
var TO_STRING_TAG = __webpack_require__(5112)('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ 5631:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var defineProperty = (__webpack_require__(3070).f);
var create = __webpack_require__(30);
var redefineAll = __webpack_require__(2248);
var bind = __webpack_require__(244);
var anInstance = __webpack_require__(5787);
var iterate = __webpack_require__(408);
var defineIterator = __webpack_require__(654);
var setSpecies = __webpack_require__(6340);
var DESCRIPTORS = __webpack_require__(9781);
var fastKey = (__webpack_require__(2423).fastKey);
var InternalStateModule = __webpack_require__(9909);
var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),

/***/ 9320:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var redefineAll = __webpack_require__(2248);
var getWeakData = (__webpack_require__(2423).getWeakData);
var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);
var anInstance = __webpack_require__(5787);
var iterate = __webpack_require__(408);
var createArrayMethod = __webpack_require__(7550);
var $has = __webpack_require__(6656);
var InternalStateModule = __webpack_require__(9909);
var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};


/***/ }),

/***/ 7710:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(7854);
var isForced = __webpack_require__(4705);
var $export = __webpack_require__(2109);
var redefine = __webpack_require__(1320);
var InternalMetadataModule = __webpack_require__(2423);
var iterate = __webpack_require__(408);
var anInstance = __webpack_require__(5787);
var isObject = __webpack_require__(111);
var fails = __webpack_require__(7293);
var checkCorrectnessOfIteration = __webpack_require__(7072);
var setToStringTag = __webpack_require__(8003);
var inheritIfRequired = __webpack_require__(9587);

module.exports = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var ADDER = IS_MAP ? 'set' : 'add';
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(a) {
        nativeMethod.call(this, a === 0 ? 0 : a);
        return this;
      } : KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : nativeMethod.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : nativeMethod.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : nativeMethod.call(this, a === 0 ? 0 : a);
      } : function set(a, b) {
        nativeMethod.call(this, a === 0 ? 0 : a, b);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (target, iterable) {
        anInstance(target, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), target, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $export({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),

/***/ 9920:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(6656);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ 4964:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var MATCH = __webpack_require__(5112)('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),

/***/ 8544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = !__webpack_require__(7293)(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 4230:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(4488);
var quot = /"/g;

// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
// https://tc39.github.io/ecma262/#sec-createhtml
module.exports = function (string, tag, attribute, value) {
  var S = String(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};


/***/ }),

/***/ 4994:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var IteratorPrototype = (__webpack_require__(3383).IteratorPrototype);
var create = __webpack_require__(30);
var createPropertyDescriptor = __webpack_require__(9114);
var setToStringTag = __webpack_require__(8003);
var Iterators = __webpack_require__(7497);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ 9114:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 6135:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toPrimitive = __webpack_require__(7593);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ 5573:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(7293);
var prototype = Date.prototype;
var getTime = prototype.getTime;
var nativeDateToISOString = prototype.toISOString;

var leadingZero = function (number) {
  return number > 9 ? number : '0' + number;
};

// `Date.prototype.toISOString` method implementation
// https://tc39.github.io/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit fails here:
module.exports = (fails(function () {
  return nativeDateToISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  nativeDateToISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var date = this;
  var year = date.getUTCFullYear();
  var milliseconds = date.getUTCMilliseconds();
  var sign = year < 0 ? '-' : year > 9999 ? '+' : '';
  return sign + ('00000' + Math.abs(year)).slice(sign ? -6 : -4) +
    '-' + leadingZero(date.getUTCMonth() + 1) +
    '-' + leadingZero(date.getUTCDate()) +
    'T' + leadingZero(date.getUTCHours()) +
    ':' + leadingZero(date.getUTCMinutes()) +
    ':' + leadingZero(date.getUTCSeconds()) +
    '.' + (milliseconds > 99 ? milliseconds : '0' + leadingZero(milliseconds)) +
    'Z';
} : nativeDateToISOString;


/***/ }),

/***/ 8709:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(9670);
var toPrimitive = __webpack_require__(7593);

module.exports = function (hint) {
  if (hint !== 'string' && hint !== 'number' && hint !== 'default') {
    throw TypeError('Incorrect hint');
  } return toPrimitive(anObject(this), hint !== 'number');
};


/***/ }),

/***/ 654:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $export = __webpack_require__(2109);
var createIteratorConstructor = __webpack_require__(4994);
var getPrototypeOf = __webpack_require__(9518);
var setPrototypeOf = __webpack_require__(7674);
var setToStringTag = __webpack_require__(8003);
var hide = __webpack_require__(5185);
var redefine = __webpack_require__(1320);
var IS_PURE = __webpack_require__(1913);
var ITERATOR = __webpack_require__(5112)('iterator');
var Iterators = __webpack_require__(7497);
var IteratorsCore = __webpack_require__(3383);
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          hide(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    hide(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ 7235:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(857);
var has = __webpack_require__(6656);
var wrappedWellKnownSymbolModule = __webpack_require__(6805);
var defineProperty = (__webpack_require__(3070).f);

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ 9781:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(7293)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 317:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var document = (__webpack_require__(7854).document);
// typeof document.createElement is 'object' in old IE
var exist = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return exist ? document.createElement(it) : {};
};


/***/ }),

/***/ 748:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 6294:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var objectKeys = __webpack_require__(1956);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var propertyIsEnumerableModule = __webpack_require__(5296);

// all enumerable object keys, includes symbols
module.exports = function (it) {
  var result = objectKeys(it);
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  if (getOwnPropertySymbols) {
    var symbols = getOwnPropertySymbols(it);
    var propertyIsEnumerable = propertyIsEnumerableModule.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (propertyIsEnumerable.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ 2109:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var hide = __webpack_require__(5185);
var redefine = __webpack_require__(1320);
var setGlobal = __webpack_require__(3505);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 7007:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var hide = __webpack_require__(5185);
var redefine = __webpack_require__(1320);
var fails = __webpack_require__(7293);
var wellKnownSymbol = __webpack_require__(5112);
var regexpExec = __webpack_require__(2261);

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };

    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
    if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);
  }
};


/***/ }),

/***/ 6790:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isArray = __webpack_require__(3157);
var toLength = __webpack_require__(7466);
var bind = __webpack_require__(244);

// `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
  var element;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};

module.exports = flattenIntoArray;


/***/ }),

/***/ 1301:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// Forced replacement object prototype accessors methods
module.exports = __webpack_require__(1913) || !__webpack_require__(7293)(function () {
  var key = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, key, function () { /* empty */ });
  delete __webpack_require__(7854)[key];
});


/***/ }),

/***/ 2098:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
module.exports = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};


/***/ }),

/***/ 8711:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var whitespaces = __webpack_require__(1361);
var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ 6677:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = !__webpack_require__(7293)(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),

/***/ 7065:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aFunction = __webpack_require__(3099);
var isObject = __webpack_require__(111);
var arraySlice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};


/***/ }),

/***/ 2521:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(2309)('native-function-to-string', Function.toString);


/***/ }),

/***/ 5005:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var path = __webpack_require__(857);
var global = __webpack_require__(7854);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 1246:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(648);
var ITERATOR = __webpack_require__(5112)('iterator');
var Iterators = __webpack_require__(7497);

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ 7854:
/***/ ((module) => {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports = typeof window == 'object' && window && window.Math == Math ? window
  : typeof self == 'object' && self && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();


/***/ }),

/***/ 6656:
/***/ ((module) => {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ 3501:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 5185:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = __webpack_require__(9781) ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 842:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ 490:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var document = (__webpack_require__(7854).document);

module.exports = document && document.documentElement;


/***/ }),

/***/ 4664:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(9781) && !__webpack_require__(7293)(function () {
  return Object.defineProperty(__webpack_require__(317)('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);
var split = ''.split;

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ 9587:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ 2423:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var METADATA = __webpack_require__(9711)('meta');
var FREEZING = __webpack_require__(6677);
var isObject = __webpack_require__(111);
var has = __webpack_require__(6656);
var defineProperty = (__webpack_require__(3070).f);
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

__webpack_require__(3501)[METADATA] = true;


/***/ }),

/***/ 9909:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var isObject = __webpack_require__(111);
var hide = __webpack_require__(5185);
var objectHas = __webpack_require__(6656);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);
var WeakMap = (__webpack_require__(7854).WeakMap);
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 7659:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// check on default Array iterator
var Iterators = __webpack_require__(7497);
var ITERATOR = __webpack_require__(5112)('iterator');
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 3157:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4326);

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ 4705:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(7293);
var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 8730:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var floor = Math.floor;

// `Number.isInteger` method implementation
// https://tc39.github.io/ecma262/#sec-number.isinteger
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),

/***/ 111:
/***/ ((module) => {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 1913:
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ 7850:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var classof = __webpack_require__(4326);
var MATCH = __webpack_require__(5112)('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ 408:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var isArrayIteratorMethod = __webpack_require__(7659);
var toLength = __webpack_require__(7466);
var bind = __webpack_require__(244);
var getIteratorMethod = __webpack_require__(1246);
var callWithSafeIterationClosing = __webpack_require__(3411);
var BREAK = {};

var exports = module.exports = function (iterable, fn, that, ENTRIES, ITERATOR) {
  var boundFunction = bind(fn, that, ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, step;

  if (ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
        if (result === BREAK) return BREAK;
      } return;
    }
    iterator = iterFn.call(iterable);
  }

  while (!(step = iterator.next()).done) {
    if (callWithSafeIterationClosing(iterator, boundFunction, step.value, ENTRIES) === BREAK) return BREAK;
  }
};

exports.BREAK = BREAK;


/***/ }),

/***/ 3383:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getPrototypeOf = __webpack_require__(9518);
var hide = __webpack_require__(5185);
var has = __webpack_require__(6656);
var IS_PURE = __webpack_require__(1913);
var ITERATOR = __webpack_require__(5112)('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 7497:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 6736:
/***/ ((module) => {

var nativeExpm1 = Math.expm1;

// `Math.expm1` method implementation
// https://tc39.github.io/ecma262/#sec-math.expm1
module.exports = (!nativeExpm1
  // Old FF bug
  || nativeExpm1(10) > 22025.465794806719 || nativeExpm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || nativeExpm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : nativeExpm1;


/***/ }),

/***/ 6130:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var sign = __webpack_require__(4310);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

// `Math.fround` method implementation
// https://tc39.github.io/ecma262/#sec-math.fround
module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),

/***/ 6513:
/***/ ((module) => {

// `Math.log1p` method implementation
// https://tc39.github.io/ecma262/#sec-math.log1p
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),

/***/ 4310:
/***/ ((module) => {

// `Math.sign` method implementation
// https://tc39.github.io/ecma262/#sec-math.sign
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),

/***/ 5948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var classof = __webpack_require__(4326);
var macrotask = (__webpack_require__(261).set);
var userAgent = __webpack_require__(227);
var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !/(iPhone|iPod|iPad).*AppleWebKit/i.test(userAgent)) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ 133:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Chrome 38 Symbol has incorrect toString conversion
module.exports = !__webpack_require__(7293)(function () {
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ 8536:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeFunctionToString = __webpack_require__(2521);
var WeakMap = (__webpack_require__(7854).WeakMap);

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));


/***/ }),

/***/ 8523:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(3099);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ 7023:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var globalIsFinite = (__webpack_require__(7854).isFinite);

// `Number.isFinite` method
// https://tc39.github.io/ecma262/#sec-number.isfinite
module.exports = Number.isFinite || function isFinite(it) {
  return typeof it == 'number' && globalIsFinite(it);
};


/***/ }),

/***/ 1574:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var objectKeys = __webpack_require__(1956);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var propertyIsEnumerableModule = __webpack_require__(5296);
var toObject = __webpack_require__(7908);
var IndexedObject = __webpack_require__(8361);
var nativeAssign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !nativeAssign || __webpack_require__(7293)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (propertyIsEnumerable.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : nativeAssign;


/***/ }),

/***/ 30:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(9670);
var defineProperties = __webpack_require__(6048);
var enumBugKeys = __webpack_require__(748);
var html = __webpack_require__(490);
var documentCreateElement = __webpack_require__(317);
var IE_PROTO = __webpack_require__(6200)('IE_PROTO');
var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

__webpack_require__(3501)[IE_PROTO] = true;


/***/ }),

/***/ 6048:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var anObject = __webpack_require__(9670);
var objectKeys = __webpack_require__(1956);

module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var key;
  while (length > i) definePropertyModule.f(O, key = keys[i++], Properties[key]);
  return O;
};


/***/ }),

/***/ 3070:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var anObject = __webpack_require__(9670);
var toPrimitive = __webpack_require__(7593);
var nativeDefineProperty = Object.defineProperty;

exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPrimitive = __webpack_require__(7593);
var has = __webpack_require__(6656);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ 1156:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIndexedObject = __webpack_require__(5656);
var nativeGetOwnPropertyNames = (__webpack_require__(8006).f);
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ 8006:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var internalObjectKeys = __webpack_require__(6324);
var hiddenKeys = (__webpack_require__(748).concat)('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ ((__unused_webpack_module, exports) => {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 9518:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(6656);
var toObject = __webpack_require__(7908);
var IE_PROTO = __webpack_require__(6200)('IE_PROTO');
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);
var ObjectPrototype = Object.prototype;

module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 6324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(6656);
var toIndexedObject = __webpack_require__(5656);
var arrayIndexOf = __webpack_require__(1318)(false);
var hiddenKeys = __webpack_require__(3501);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 1956:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 5296:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = nativeGetOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = nativeGetOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var validateSetPrototypeOfArguments = __webpack_require__(9475);

module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var correctSetter = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    correctSetter = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    validateSetPrototypeOfArguments(O, proto);
    if (correctSetter) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 4699:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var objectKeys = __webpack_require__(1956);
var toIndexedObject = __webpack_require__(5656);
var propertyIsEnumerable = (__webpack_require__(5296).f);

// TO_ENTRIES: true  -> Object.entries
// TO_ENTRIES: false -> Object.values
module.exports = function (it, TO_ENTRIES) {
  var O = toIndexedObject(it);
  var keys = objectKeys(O);
  var length = keys.length;
  var i = 0;
  var result = [];
  var key;
  while (length > i) if (propertyIsEnumerable.call(O, key = keys[i++])) {
    result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
  } return result;
};


/***/ }),

/***/ 288:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classof = __webpack_require__(648);
var TO_STRING_TAG = __webpack_require__(5112)('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = String(test) !== '[object z]' ? function toString() {
  return '[object ' + classof(this) + ']';
} : test.toString;


/***/ }),

/***/ 3887:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);
var Reflect = (__webpack_require__(7854).Reflect);

// all object keys, includes non-enumerable and symbols
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 3677:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeParseFloat = (__webpack_require__(7854).parseFloat);
var internalStringTrim = __webpack_require__(3111);
var whitespaces = __webpack_require__(1361);
var FORCED = 1 / nativeParseFloat(whitespaces + '-0') !== -Infinity;

module.exports = FORCED ? function parseFloat(str) {
  var string = internalStringTrim(String(str), 3);
  var result = nativeParseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : nativeParseFloat;


/***/ }),

/***/ 8620:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var nativeParseInt = (__webpack_require__(7854).parseInt);
var internalStringTrim = __webpack_require__(3111);
var whitespaces = __webpack_require__(1361);
var hex = /^[-+]?0[xX]/;
var FORCED = nativeParseInt(whitespaces + '08') !== 8 || nativeParseInt(whitespaces + '0x16') !== 22;

module.exports = FORCED ? function parseInt(str, radix) {
  var string = internalStringTrim(String(str), 3);
  return nativeParseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : nativeParseInt;


/***/ }),

/***/ 857:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(7854);


/***/ }),

/***/ 2534:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ 9478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);
var newPromiseCapability = __webpack_require__(8523);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ 2248:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var redefine = __webpack_require__(1320);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ 1320:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var hide = __webpack_require__(5185);
var has = __webpack_require__(6656);
var setGlobal = __webpack_require__(3505);
var nativeFunctionToString = __webpack_require__(2521);
var InternalStateModule = __webpack_require__(9909);
var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');

__webpack_require__(2309)('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});


/***/ }),

/***/ 7651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4326);
var regexpExec = __webpack_require__(2261);

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ 2261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var regexpFlags = __webpack_require__(7066);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ 7066:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(9670);

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ 4488:
/***/ ((module) => {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 1150:
/***/ ((module) => {

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ 3505:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var hide = __webpack_require__(5185);

module.exports = function (key, value) {
  try {
    hide(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 6340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(5005);
var definePropertyModule = __webpack_require__(3070);
var DESCRIPTORS = __webpack_require__(9781);
var SPECIES = __webpack_require__(5112)('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var C = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;
  if (DESCRIPTORS && C && !C[SPECIES]) defineProperty(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ 8003:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = (__webpack_require__(3070).f);
var has = __webpack_require__(6656);
var TO_STRING_TAG = __webpack_require__(5112)('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ 6200:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(2309)('keys');
var uid = __webpack_require__(9711);

module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ 2309:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var setGlobal = __webpack_require__(3505);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.0.1',
  mode: __webpack_require__(1913) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 6637:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(7293);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ 6707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var aFunction = __webpack_require__(3099);
var SPECIES = __webpack_require__(5112)('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ 5866:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(9958);
var requireObjectCoercible = __webpack_require__(4488);
// CONVERT_TO_STRING: true  -> String#at
// CONVERT_TO_STRING: false -> String#codePointAt
module.exports = function (that, pos, CONVERT_TO_STRING) {
  var S = String(requireObjectCoercible(that));
  var position = toInteger(pos);
  var size = S.length;
  var first, second;
  if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
  first = S.charCodeAt(position);
  return first < 0xD800 || first > 0xDBFF || position + 1 === size
    || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
      ? CONVERT_TO_STRING ? S.charAt(position) : first
      : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
};


/***/ }),

/***/ 6650:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(7466);
var repeat = __webpack_require__(8415);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(requireObjectCoercible(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  var fillLen, stringFiller;
  if (intMaxLength <= stringLength || fillStr == '') return S;
  fillLen = intMaxLength - stringLength;
  stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),

/***/ 8415:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toInteger = __webpack_require__(9958);
var requireObjectCoercible = __webpack_require__(4488);

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
module.exports = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ 3111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(4488);
var whitespace = '[' + __webpack_require__(1361) + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// 1 -> String#trimStart
// 2 -> String#trimEnd
// 3 -> String#trim
module.exports = function (string, TYPE) {
  string = String(requireObjectCoercible(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};


/***/ }),

/***/ 261:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var classof = __webpack_require__(4326);
var bind = __webpack_require__(244);
var html = __webpack_require__(490);
var createElement = __webpack_require__(317);
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var listener = function (event) {
  run.call(event.data);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(bind(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(bind(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(bind(run, id, 1), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ 863:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4326);

// `thisNumberValue` abstract operation
// https://tc39.github.io/ecma262/#sec-thisnumbervalue
module.exports = function (value) {
  if (typeof value != 'number' && classof(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};


/***/ }),

/***/ 1400:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(9958);
var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 7067:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(9958);
var toLength = __webpack_require__(7466);

// `ToIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};


/***/ }),

/***/ 5656:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9958:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ 7466:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(9958);
var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var requireObjectCoercible = __webpack_require__(4488);

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 4590:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(9958);

module.exports = function (it, BYTES) {
  var offset = toInteger(it);
  if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};


/***/ }),

/***/ 7593:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(111);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 9843:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (__webpack_require__(9781)) {
  var global = __webpack_require__(7854);
  var $export = __webpack_require__(2109);
  var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(6500);
  var ArrayBufferViewCore = __webpack_require__(260);
  var ArrayBufferModule = __webpack_require__(3331);
  var anInstance = __webpack_require__(5787);
  var createPropertyDescriptor = __webpack_require__(9114);
  var hide = __webpack_require__(5185);
  var toLength = __webpack_require__(7466);
  var toIndex = __webpack_require__(7067);
  var toOffset = __webpack_require__(4590);
  var toPrimitive = __webpack_require__(7593);
  var has = __webpack_require__(6656);
  var classof = __webpack_require__(648);
  var isObject = __webpack_require__(111);
  var create = __webpack_require__(30);
  var setPrototypeOf = __webpack_require__(7674);
  var getOwnPropertyNames = (__webpack_require__(8006).f);
  var typedArrayFrom = __webpack_require__(7321);
  var arrayForEach = __webpack_require__(7550)(0);
  var setSpecies = __webpack_require__(6340);
  var definePropertyModule = __webpack_require__(3070);
  var getOwnPropertyDescriptorModule = __webpack_require__(1236);
  var InternalStateModule = __webpack_require__(9909);
  var getInternalState = InternalStateModule.get;
  var setInternalState = InternalStateModule.set;
  var nativeDefineProperty = definePropertyModule.f;
  var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  var RangeError = global.RangeError;
  var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
  var DataView = ArrayBufferModule.DataView;
  var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
  var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
  var TypedArray = ArrayBufferViewCore.TypedArray;
  var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
  var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
  var isTypedArray = ArrayBufferViewCore.isTypedArray;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var WRONG_LENGTH = 'Wrong length';

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = new (aTypedArrayConstructor(C))(length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key) {
    nativeDefineProperty(it, key, { get: function () {
      return getInternalState(this)[key];
    } });
  };

  var isArrayBuffer = function (it) {
    var klass;
    return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
  };

  var isTypedArrayIndex = function (target, key) {
    return isTypedArray(target)
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };

  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
    return isTypedArrayIndex(target, key = toPrimitive(key, true))
      ? createPropertyDescriptor(2, target[key])
      : nativeGetOwnPropertyDescriptor(target, key);
  };

  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
    if (isTypedArrayIndex(target, key = toPrimitive(key, true))
      && isObject(descriptor)
      && has(descriptor, 'value')
      && !has(descriptor, 'get')
      && !has(descriptor, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !descriptor.configurable
      && (!has(descriptor, 'writable') || descriptor.writable)
      && (!has(descriptor, 'enumerable') || descriptor.enumerable)
    ) {
      target[key] = descriptor.value;
      return target;
    } return nativeDefineProperty(target, key, descriptor);
  };

  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $export({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  // eslint-disable-next-line max-statements
  module.exports = function (TYPE, BYTES, wrapper, CLAMPED) {
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (that, data, typedArrayOffset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
        if (isArrayBuffer(data)) return $length !== undefined
          ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
          : typedArrayOffset !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
            : new NativeTypedArrayConstructor(data);
        if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
        return typedArrayFrom.call(TypedArrayConstructor, data);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      arrayForEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) hide(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      hide(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) hide(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $export({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      hide(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      hide(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ 7321:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toObject = __webpack_require__(7908);
var toLength = __webpack_require__(7466);
var getIteratorMethod = __webpack_require__(1246);
var isArrayIteratorMethod = __webpack_require__(7659);
var bind = __webpack_require__(244);
var aTypedArrayConstructor = (__webpack_require__(260).aTypedArrayConstructor);

module.exports = function from(source /* , mapfn, thisArg */) {
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    O = [];
    while (!(step = iterator.next()).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2], 2);
  }
  length = toLength(O.length);
  result = new (aTypedArrayConstructor(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};


/***/ }),

/***/ 6500:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-new */
var global = __webpack_require__(7854);
var fails = __webpack_require__(7293);
var checkCorrectnessOfIteration = __webpack_require__(7072);
var NATIVE_ARRAY_BUFFER_VIEWS = (__webpack_require__(260).NATIVE_ARRAY_BUFFER_VIEWS);
var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari 11 bug
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});


/***/ }),

/***/ 9711:
/***/ ((module) => {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));
};


/***/ }),

/***/ 227:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7854);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ 9475:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var anObject = __webpack_require__(9670);

module.exports = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) {
    throw TypeError("Can't set " + String(proto) + ' as a prototype');
  }
};


/***/ }),

/***/ 8468:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(7850);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) {
    throw TypeError('String.prototype.' + NAME + " doesn't accept regex");
  } return String(requireObjectCoercible(that));
};


/***/ }),

/***/ 7428:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// https://github.com/zloirock/core-js/issues/280
var userAgent = __webpack_require__(227);

// eslint-disable-next-line unicorn/no-unsafe-regex
module.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);


/***/ }),

/***/ 5112:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var store = __webpack_require__(2309)('wks');
var uid = __webpack_require__(9711);
var Symbol = (__webpack_require__(7854).Symbol);
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = function (name) {
  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]
    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};


/***/ }),

/***/ 1361:
/***/ ((module) => {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ 6805:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

exports.f = __webpack_require__(5112);


/***/ }),

/***/ 8264:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ARRAY_BUFFER = 'ArrayBuffer';
var ArrayBuffer = __webpack_require__(3331)[ARRAY_BUFFER];
var NativeArrayBuffer = __webpack_require__(7854)[ARRAY_BUFFER];

// `ArrayBuffer` constructor
// https://tc39.github.io/ecma262/#sec-arraybuffer-constructor
__webpack_require__(2109)({ global: true, forced: NativeArrayBuffer !== ArrayBuffer }, {
  ArrayBuffer: ArrayBuffer
});

__webpack_require__(6340)(ARRAY_BUFFER);


/***/ }),

/***/ 6938:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var ArrayBufferViewCore = __webpack_require__(260);
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

// `ArrayBuffer.isView` method
// https://tc39.github.io/ecma262/#sec-arraybuffer.isview
__webpack_require__(2109)({ target: 'ArrayBuffer', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
  isView: ArrayBufferViewCore.isView
});


/***/ }),

/***/ 9575:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferModule = __webpack_require__(3331);
var anObject = __webpack_require__(9670);
var toAbsoluteIndex = __webpack_require__(1400);
var toLength = __webpack_require__(7466);
var speciesConstructor = __webpack_require__(6707);
var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
var DataView = ArrayBufferModule.DataView;
var nativeArrayBufferSlice = ArrayBuffer.prototype.slice;

var INCORRECT_SLICE = __webpack_require__(7293)(function () {
  return !new ArrayBuffer(2).slice(1, undefined).byteLength;
});

// `ArrayBuffer.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-arraybuffer.prototype.slice
__webpack_require__(2109)({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice(start, end) {
    if (nativeArrayBufferSlice !== undefined && end === undefined) {
      return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
    }
    var length = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first));
    var viewSource = new DataView(this);
    var viewTarget = new DataView(result);
    var index = 0;
    while (first < fin) {
      viewTarget.setUint8(index++, viewSource.getUint8(first++));
    } return result;
  }
});


/***/ }),

/***/ 2222:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isArray = __webpack_require__(3157);
var isObject = __webpack_require__(111);
var toObject = __webpack_require__(7908);
var toLength = __webpack_require__(7466);
var createProperty = __webpack_require__(6135);
var arraySpeciesCreate = __webpack_require__(5417);
var IS_CONCAT_SPREADABLE = __webpack_require__(5112)('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

var IS_CONCAT_SPREADABLE_SUPPORT = !__webpack_require__(7293)(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = __webpack_require__(1194)('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
__webpack_require__(2109)({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ 545:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Array.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
__webpack_require__(2109)({ target: 'Array', proto: true }, {
  copyWithin: __webpack_require__(1048)
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
__webpack_require__(1223)('copyWithin');


/***/ }),

/***/ 6541:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalEvery = __webpack_require__(7550)(4);

var SLOPPY_METHOD = __webpack_require__(6637)('every');

// `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every
__webpack_require__(2109)({ target: 'Array', proto: true, forced: SLOPPY_METHOD }, {
  every: function every(callbackfn /* , thisArg */) {
    return internalEvery(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 3290:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Array.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
__webpack_require__(2109)({ target: 'Array', proto: true }, { fill: __webpack_require__(1285) });

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
__webpack_require__(1223)('fill');


/***/ }),

/***/ 7327:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalFilter = __webpack_require__(7550)(2);

var SPECIES_SUPPORT = __webpack_require__(1194)('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
__webpack_require__(2109)({ target: 'Array', proto: true, forced: !SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return internalFilter(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 4553:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalFindIndex = __webpack_require__(7550)(6);
var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
__webpack_require__(2109)({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return internalFindIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
__webpack_require__(1223)(FIND_INDEX);


/***/ }),

/***/ 9826:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalFind = __webpack_require__(7550)(5);
var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
__webpack_require__(2109)({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return internalFind(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
__webpack_require__(1223)(FIND);


/***/ }),

/***/ 6535:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var flattenIntoArray = __webpack_require__(6790);
var toObject = __webpack_require__(7908);
var toLength = __webpack_require__(7466);
var aFunction = __webpack_require__(3099);
var arraySpeciesCreate = __webpack_require__(5417);

// `Array.prototype.flatMap` method
// https://github.com/tc39/proposal-flatMap
__webpack_require__(2109)({ target: 'Array', proto: true }, {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A;
    aFunction(callbackfn);
    A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});


/***/ }),

/***/ 4944:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var flattenIntoArray = __webpack_require__(6790);
var toObject = __webpack_require__(7908);
var toLength = __webpack_require__(7466);
var toInteger = __webpack_require__(9958);
var arraySpeciesCreate = __webpack_require__(5417);

// `Array.prototype.flat` method
// https://github.com/tc39/proposal-flatMap
__webpack_require__(2109)({ target: 'Array', proto: true }, {
  flat: function flat(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});


/***/ }),

/***/ 9554:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var forEach = __webpack_require__(8533);

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
__webpack_require__(2109)({ target: 'Array', proto: true, forced: [].forEach != forEach }, { forEach: forEach });


/***/ }),

/***/ 1038:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var INCORRECT_ITERATION = !__webpack_require__(7072)(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
__webpack_require__(2109)({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: __webpack_require__(8457)
});


/***/ }),

/***/ 6699:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalIncludes = __webpack_require__(1318)(true);

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
__webpack_require__(2109)({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return internalIncludes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
__webpack_require__(1223)('includes');


/***/ }),

/***/ 2772:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalIndexOf = __webpack_require__(1318)(false);
var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var SLOPPY_METHOD = __webpack_require__(6637)('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
__webpack_require__(2109)({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : internalIndexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),

/***/ 9753:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
__webpack_require__(2109)({ target: 'Array', stat: true }, { isArray: __webpack_require__(3157) });


/***/ }),

/***/ 6992:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(5656);
var addToUnscopables = __webpack_require__(1223);
var Iterators = __webpack_require__(7497);
var InternalStateModule = __webpack_require__(9909);
var defineIterator = __webpack_require__(654);
var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ 9600:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toIndexedObject = __webpack_require__(5656);
var nativeJoin = [].join;

var ES3_STRINGS = __webpack_require__(8361) != Object;
var SLOPPY_METHOD = __webpack_require__(6637)('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
__webpack_require__(2109)({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ 4986:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var arrayLastIndexOf = __webpack_require__(6583);

// `Array.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
__webpack_require__(2109)({ target: 'Array', proto: true, forced: arrayLastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: arrayLastIndexOf
});


/***/ }),

/***/ 1249:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalMap = __webpack_require__(7550)(1);

var SPECIES_SUPPORT = __webpack_require__(1194)('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
__webpack_require__(2109)({ target: 'Array', proto: true, forced: !SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return internalMap(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 6572:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createProperty = __webpack_require__(6135);

var ISNT_GENERIC = __webpack_require__(7293)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
});

// `Array.of` method
// https://tc39.github.io/ecma262/#sec-array.of
// WebKit Array.of isn't generic
__webpack_require__(2109)({ target: 'Array', stat: true, forced: ISNT_GENERIC }, {
  of: function of(/* ...args */) {
    var index = 0;
    var argumentsLength = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(argumentsLength);
    while (argumentsLength > index) createProperty(result, index, arguments[index++]);
    result.length = argumentsLength;
    return result;
  }
});


/***/ }),

/***/ 6644:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalReduceRight = __webpack_require__(3671);

var SLOPPY_METHOD = __webpack_require__(6637)('reduceRight');

// `Array.prototype.reduceRight` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
__webpack_require__(2109)({ target: 'Array', proto: true, forced: SLOPPY_METHOD }, {
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return internalReduceRight(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),

/***/ 5827:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalReduce = __webpack_require__(3671);

var SLOPPY_METHOD = __webpack_require__(6637)('reduce');

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
__webpack_require__(2109)({ target: 'Array', proto: true, forced: SLOPPY_METHOD }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return internalReduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),

/***/ 5069:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isArray = __webpack_require__(3157);
var nativeReverse = [].reverse;
var test = [1, 2];

// `Array.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794
__webpack_require__(2109)({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    if (isArray(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
});


/***/ }),

/***/ 7042:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(111);
var isArray = __webpack_require__(3157);
var toAbsoluteIndex = __webpack_require__(1400);
var toLength = __webpack_require__(7466);
var toIndexedObject = __webpack_require__(5656);
var createProperty = __webpack_require__(6135);
var SPECIES = __webpack_require__(5112)('species');
var nativeSlice = [].slice;
var max = Math.max;

var SPECIES_SUPPORT = __webpack_require__(1194)('slice');

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
__webpack_require__(2109)({ target: 'Array', proto: true, forced: !SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ 5212:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalSome = __webpack_require__(7550)(3);

var SLOPPY_METHOD = __webpack_require__(6637)('some');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
__webpack_require__(2109)({ target: 'Array', proto: true, forced: SLOPPY_METHOD }, {
  some: function some(callbackfn /* , thisArg */) {
    return internalSome(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ 2707:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var aFunction = __webpack_require__(3099);
var toObject = __webpack_require__(7908);
var fails = __webpack_require__(7293);
var nativeSort = [].sort;
var test = [1, 2, 3];

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var SLOPPY_METHOD = __webpack_require__(6637)('sort');

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
__webpack_require__(2109)({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ 8706:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Array[@@species]` getter
// https://tc39.github.io/ecma262/#sec-get-array-@@species
__webpack_require__(6340)('Array');


/***/ }),

/***/ 561:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toAbsoluteIndex = __webpack_require__(1400);
var toInteger = __webpack_require__(9958);
var toLength = __webpack_require__(7466);
var toObject = __webpack_require__(7908);
var arraySpeciesCreate = __webpack_require__(5417);
var createProperty = __webpack_require__(6135);
var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

var SPECIES_SUPPORT = __webpack_require__(1194)('splice');

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
__webpack_require__(2109)({ target: 'Array', proto: true, forced: !SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ 9244:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
__webpack_require__(1223)('flatMap');


/***/ }),

/***/ 3792:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
__webpack_require__(1223)('flat');


/***/ }),

/***/ 6716:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_ARRAY_BUFFER = (__webpack_require__(260).NATIVE_ARRAY_BUFFER);

// `DataView` constructor
// https://tc39.github.io/ecma262/#sec-dataview-constructor
__webpack_require__(2109)({ global: true, forced: !NATIVE_ARRAY_BUFFER }, {
  DataView: (__webpack_require__(3331).DataView)
});


/***/ }),

/***/ 3843:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Date.now` method
// https://tc39.github.io/ecma262/#sec-date.now
__webpack_require__(2109)({ target: 'Date', stat: true }, {
  now: function now() {
    return new Date().getTime();
  }
});


/***/ }),

/***/ 5268:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var toISOString = __webpack_require__(5573);

// `Date.prototype.toISOString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.toisostring
// PhantomJS / old WebKit has a broken implementations
__webpack_require__(2109)({ target: 'Date', proto: true, forced: Date.prototype.toISOString !== toISOString }, {
  toISOString: toISOString
});


/***/ }),

/***/ 5735:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(7908);
var toPrimitive = __webpack_require__(7593);

var FORCED = __webpack_require__(7293)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
});

// `Date.prototype.toJSON` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tojson
__webpack_require__(2109)({ target: 'Date', proto: true, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),

/***/ 6078:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var hide = __webpack_require__(5185);
var TO_PRIMITIVE = __webpack_require__(5112)('toPrimitive');
var dateToPrimitive = __webpack_require__(8709);
var DatePrototype = Date.prototype;

// `Date.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-date.prototype-@@toprimitive
if (!(TO_PRIMITIVE in DatePrototype)) hide(DatePrototype, TO_PRIMITIVE, dateToPrimitive);


/***/ }),

/***/ 3710:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(1320)(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ 4812:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
__webpack_require__(2109)({ target: 'Function', proto: true }, {
  bind: __webpack_require__(7065)
});


/***/ }),

/***/ 4855:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var isObject = __webpack_require__(111);
var definePropertyModule = __webpack_require__(3070);
var getPrototypeOf = __webpack_require__(9518);
var HAS_INSTANCE = __webpack_require__(5112)('hasInstance');
var FunctionPrototype = Function.prototype;

// `Function.prototype[@@hasInstance]` method
// https://tc39.github.io/ecma262/#sec-function.prototype-@@hasinstance
if (!(HAS_INSTANCE in FunctionPrototype)) {
  definePropertyModule.f(FunctionPrototype, HAS_INSTANCE, { value: function (O) {
    if (typeof this != 'function' || !isObject(O)) return false;
    if (!isObject(this.prototype)) return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
    return false;
  } });
}


/***/ }),

/***/ 8309:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var defineProperty = (__webpack_require__(3070).f);
var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ 3706:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// JSON[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-json-@@tostringtag
__webpack_require__(8003)((__webpack_require__(7854).JSON), 'JSON', true);


/***/ }),

/***/ 1532:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// `Map` constructor
// https://tc39.github.io/ecma262/#sec-map-objects
module.exports = __webpack_require__(7710)('Map', function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, __webpack_require__(5631), true);


/***/ }),

/***/ 9752:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var log1p = __webpack_require__(6513);
var nativeAcosh = Math.acosh;
var log = Math.log;
var sqrt = Math.sqrt;
var LN2 = Math.LN2;

var FORCED = !nativeAcosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  || Math.floor(nativeAcosh(Number.MAX_VALUE)) != 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  || nativeAcosh(Infinity) != Infinity;

// `Math.acosh` method
// https://tc39.github.io/ecma262/#sec-math.acosh
__webpack_require__(2109)({ target: 'Math', stat: true, forced: FORCED }, {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? log(x) + LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),

/***/ 2376:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var nativeAsinh = Math.asinh;
var log = Math.log;
var sqrt = Math.sqrt;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
}

// `Math.asinh` method
// https://tc39.github.io/ecma262/#sec-math.asinh
// Tor Browser bug: Math.asinh(0) -> -0
__webpack_require__(2109)({ target: 'Math', stat: true, forced: !(nativeAsinh && 1 / nativeAsinh(0) > 0) }, {
  asinh: asinh
});


/***/ }),

/***/ 3181:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var nativeAtanh = Math.atanh;
var log = Math.log;

// `Math.atanh` method
// https://tc39.github.io/ecma262/#sec-math.atanh
// Tor Browser bug: Math.atanh(-0) -> 0
__webpack_require__(2109)({ target: 'Math', stat: true, forced: !(nativeAtanh && 1 / nativeAtanh(-0) < 0) }, {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),

/***/ 3484:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var sign = __webpack_require__(4310);
var abs = Math.abs;
var pow = Math.pow;

// `Math.cbrt` method
// https://tc39.github.io/ecma262/#sec-math.cbrt
__webpack_require__(2109)({ target: 'Math', stat: true }, {
  cbrt: function cbrt(x) {
    return sign(x = +x) * pow(abs(x), 1 / 3);
  }
});


/***/ }),

/***/ 2388:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var floor = Math.floor;
var log = Math.log;
var LOG2E = Math.LOG2E;

// `Math.clz32` method
// https://tc39.github.io/ecma262/#sec-math.clz32
__webpack_require__(2109)({ target: 'Math', stat: true }, {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - floor(log(x + 0.5) * LOG2E) : 32;
  }
});


/***/ }),

/***/ 8621:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var expm1 = __webpack_require__(6736);
var nativeCosh = Math.cosh;
var abs = Math.abs;
var E = Math.E;

// `Math.cosh` method
// https://tc39.github.io/ecma262/#sec-math.cosh
__webpack_require__(2109)({ target: 'Math', stat: true, forced: !nativeCosh || nativeCosh(710) === Infinity }, {
  cosh: function cosh(x) {
    var t = expm1(abs(x) - 1) + 1;
    return (t + 1 / (t * E * E)) * (E / 2);
  }
});


/***/ }),

/***/ 403:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var expm1Implementation = __webpack_require__(6736);

// `Math.expm1` method
// https://tc39.github.io/ecma262/#sec-math.expm1
__webpack_require__(2109)({ target: 'Math', stat: true, forced: expm1Implementation != Math.expm1 }, {
  expm1: expm1Implementation
});


/***/ }),

/***/ 4755:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Math.fround` method
// https://tc39.github.io/ecma262/#sec-math.fround
__webpack_require__(2109)({ target: 'Math', stat: true }, { fround: __webpack_require__(6130) });


/***/ }),

/***/ 5438:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var abs = Math.abs;
var sqrt = Math.sqrt;

// `Math.hypot` method
// https://tc39.github.io/ecma262/#sec-math.hypot
__webpack_require__(2109)({ target: 'Math', stat: true }, {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * sqrt(sum);
  }
});


/***/ }),

/***/ 332:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var nativeImul = Math.imul;

var FORCED = __webpack_require__(7293)(function () {
  return nativeImul(0xFFFFFFFF, 5) != -5 || nativeImul.length != 2;
});

// `Math.imul` method
// https://tc39.github.io/ecma262/#sec-math.imul
// some WebKit versions fails with big numbers, some has wrong arity
__webpack_require__(2109)({ target: 'Math', stat: true, forced: FORCED }, {
  imul: function imul(x, y) {
    var UINT16 = 0xFFFF;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),

/***/ 658:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var log = Math.log;
var LOG10E = Math.LOG10E;

// `Math.log10` method
// https://tc39.github.io/ecma262/#sec-math.log10
__webpack_require__(2109)({ target: 'Math', stat: true }, {
  log10: function log10(x) {
    return log(x) * LOG10E;
  }
});


/***/ }),

/***/ 197:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Math.log1p` method
// https://tc39.github.io/ecma262/#sec-math.log1p
__webpack_require__(2109)({ target: 'Math', stat: true }, { log1p: __webpack_require__(6513) });


/***/ }),

/***/ 4914:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var log = Math.log;
var LN2 = Math.LN2;

// `Math.log2` method
// https://tc39.github.io/ecma262/#sec-math.log2
__webpack_require__(2109)({ target: 'Math', stat: true }, {
  log2: function log2(x) {
    return log(x) / LN2;
  }
});


/***/ }),

/***/ 2420:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Math.sign` method
// https://tc39.github.io/ecma262/#sec-math.sign
__webpack_require__(2109)({ target: 'Math', stat: true }, { sign: __webpack_require__(4310) });


/***/ }),

/***/ 160:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var expm1 = __webpack_require__(6736);
var abs = Math.abs;
var exp = Math.exp;
var E = Math.E;

var FORCED = __webpack_require__(7293)(function () {
  return Math.sinh(-2e-17) != -2e-17;
});

// `Math.sinh` method
// https://tc39.github.io/ecma262/#sec-math.sinh
// V8 near Chromium 38 has a problem with very small numbers
__webpack_require__(2109)({ target: 'Math', stat: true, forced: FORCED }, {
  sinh: function sinh(x) {
    return abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
  }
});


/***/ }),

/***/ 970:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var expm1 = __webpack_require__(6736);
var exp = Math.exp;

// `Math.tanh` method
// https://tc39.github.io/ecma262/#sec-math.tanh
__webpack_require__(2109)({ target: 'Math', stat: true }, {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),

/***/ 2703:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// Math[@@toStringTag] property
// https://tc39.github.io/ecma262/#sec-math-@@tostringtag
__webpack_require__(8003)(Math, 'Math', true);


/***/ }),

/***/ 3689:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.github.io/ecma262/#sec-math.trunc
__webpack_require__(2109)({ target: 'Math', stat: true }, {
  trunc: function trunc(it) {
    return (it > 0 ? floor : ceil)(it);
  }
});


/***/ }),

/***/ 9653:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(7854);
var isForced = __webpack_require__(4705);
var has = __webpack_require__(6656);
var classof = __webpack_require__(4326);
var inheritIfRequired = __webpack_require__(9587);
var toPrimitive = __webpack_require__(7593);
var fails = __webpack_require__(7293);
var getOwnPropertyNames = (__webpack_require__(8006).f);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var defineProperty = (__webpack_require__(3070).f);
var internalStringTrim = __webpack_require__(3111);
var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(__webpack_require__(30)(NumberPrototype)) == NUMBER;
var NATIVE_TRIM = 'trim' in String.prototype;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, i, code;
  if (typeof it == 'string' && it.length > 2) {
    it = NATIVE_TRIM ? it.trim() : internalStringTrim(it, 3);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (i = 0; i < length; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(that); }) : classof(that) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), that, NumberWrapper) : toNumber(it);
  };
  for (var keys = __webpack_require__(9781) ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  __webpack_require__(1320)(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ 3299:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Number.EPSILON` constant
// https://tc39.github.io/ecma262/#sec-number.epsilon
__webpack_require__(2109)({ target: 'Number', stat: true }, { EPSILON: Math.pow(2, -52) });


/***/ }),

/***/ 5192:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Number.isFinite` method
// https://tc39.github.io/ecma262/#sec-number.isfinite
__webpack_require__(2109)({ target: 'Number', stat: true }, {
  isFinite: __webpack_require__(7023)
});


/***/ }),

/***/ 3161:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Number.isInteger` method
// https://tc39.github.io/ecma262/#sec-number.isinteger
__webpack_require__(2109)({ target: 'Number', stat: true }, {
  isInteger: __webpack_require__(8730)
});


/***/ }),

/***/ 4048:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Number.isNaN` method
// https://tc39.github.io/ecma262/#sec-number.isnan
__webpack_require__(2109)({ target: 'Number', stat: true }, {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),

/***/ 8285:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var isInteger = __webpack_require__(8730);
var abs = Math.abs;

// `Number.isSafeInteger` method
// https://tc39.github.io/ecma262/#sec-number.issafeinteger
__webpack_require__(2109)({ target: 'Number', stat: true }, {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1FFFFFFFFFFFFF;
  }
});


/***/ }),

/***/ 4363:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Number.MAX_SAFE_INTEGER` constant
// https://tc39.github.io/ecma262/#sec-number.max_safe_integer
__webpack_require__(2109)({ target: 'Number', stat: true }, { MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF });


/***/ }),

/***/ 5994:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Number.MIN_SAFE_INTEGER` constant
// https://tc39.github.io/ecma262/#sec-number.min_safe_integer
__webpack_require__(2109)({ target: 'Number', stat: true }, { MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF });


/***/ }),

/***/ 1874:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var parseFloat = __webpack_require__(3677);

// `Number.parseFloat` method
// https://tc39.github.io/ecma262/#sec-number.parseFloat
__webpack_require__(2109)({ target: 'Number', stat: true, forced: Number.parseFloat != parseFloat }, {
  parseFloat: parseFloat
});


/***/ }),

/***/ 9494:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var parseInt = __webpack_require__(8620);

// `Number.parseInt` method
// https://tc39.github.io/ecma262/#sec-number.parseint
__webpack_require__(2109)({ target: 'Number', stat: true, forced: Number.parseInt != parseInt }, {
  parseInt: parseInt
});


/***/ }),

/***/ 6977:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toInteger = __webpack_require__(9958);
var thisNumberValue = __webpack_require__(863);
var repeat = __webpack_require__(8415);
var nativeToFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};

var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
    }
  } return s;
};

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

// `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
__webpack_require__(2109)({ target: 'Number', proto: true, forced: nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(7293)(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
}) }, {
  toFixed: function toFixed(fractionDigits) {
    var x = thisNumberValue(this);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = '0';
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call('0', f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call('0', f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),

/***/ 5147:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(7293);
var thisNumberValue = __webpack_require__(863);
var nativeToPrecision = 1.0.toPrecision;

// `Number.prototype.toPrecision` method
// https://tc39.github.io/ecma262/#sec-number.prototype.toprecision
__webpack_require__(2109)({ target: 'Number', proto: true, forced: fails(function () {
  // IE7-
  return nativeToPrecision.call(1, undefined) !== '1';
}) || !fails(function () {
  // V8 ~ Android 4.3-
  nativeToPrecision.call({});
}) }, {
  toPrecision: function toPrecision(precision) {
    return precision === undefined
      ? nativeToPrecision.call(thisNumberValue(this))
      : nativeToPrecision.call(thisNumberValue(this), precision);
  }
});


/***/ }),

/***/ 9601:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var assign = __webpack_require__(1574);

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
__webpack_require__(2109)({ target: 'Object', stat: true, forced: Object.assign !== assign }, { assign: assign });


/***/ }),

/***/ 8011:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
__webpack_require__(2109)({
  target: 'Object', stat: true, sham: !__webpack_require__(9781)
}, { create: __webpack_require__(30) });


/***/ }),

/***/ 9595:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(7908);
var aFunction = __webpack_require__(3099);
var definePropertyModule = __webpack_require__(3070);
var FORCED = __webpack_require__(1301);

// `Object.prototype.__defineGetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
if (__webpack_require__(9781)) {
  __webpack_require__(2109)({ target: 'Object', proto: true, forced: FORCED }, {
    __defineGetter__: function __defineGetter__(P, getter) {
      definePropertyModule.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
    }
  });
}


/***/ }),

/***/ 3321:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
__webpack_require__(2109)({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperties: __webpack_require__(6048)
});


/***/ }),

/***/ 9070:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
__webpack_require__(2109)({ target: 'Object', stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
  defineProperty: (__webpack_require__(3070).f)
});


/***/ }),

/***/ 5500:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(7908);
var aFunction = __webpack_require__(3099);
var definePropertyModule = __webpack_require__(3070);
var FORCED = __webpack_require__(1301);

// `Object.prototype.__defineSetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__defineSetter__
if (__webpack_require__(9781)) {
  __webpack_require__(2109)({ target: 'Object', proto: true, forced: FORCED }, {
    __defineSetter__: function __defineSetter__(P, setter) {
      definePropertyModule.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
    }
  });
}


/***/ }),

/***/ 9720:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var objectToArray = __webpack_require__(4699);

// `Object.entries` method
// https://tc39.github.io/ecma262/#sec-object.entries
__webpack_require__(2109)({ target: 'Object', stat: true }, {
  entries: function entries(O) {
    return objectToArray(O, true);
  }
});


/***/ }),

/***/ 3371:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var onFreeze = (__webpack_require__(2423).onFreeze);
var nativeFreeze = Object.freeze;
var FREEZING = __webpack_require__(6677);
var FAILS_ON_PRIMITIVES = __webpack_require__(7293)(function () { nativeFreeze(1); });

// `Object.freeze` method
// https://tc39.github.io/ecma262/#sec-object.freeze
__webpack_require__(2109)({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  freeze: function freeze(it) {
    return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
  }
});


/***/ }),

/***/ 8559:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var iterate = __webpack_require__(408);
var createProperty = __webpack_require__(6135);

// `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries
__webpack_require__(2109)({ target: 'Object', stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, undefined, true);
    return obj;
  }
});


/***/ }),

/***/ 8880:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(5656);
var nativeGetOwnPropertyDescriptor = (__webpack_require__(1236).f);
var DESCRIPTORS = __webpack_require__(9781);
var FAILS_ON_PRIMITIVES = __webpack_require__(7293)(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
__webpack_require__(2109)({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ 9337:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var ownKeys = __webpack_require__(3887);
var toIndexedObject = __webpack_require__(5656);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var createProperty = __webpack_require__(6135);

// `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
__webpack_require__(2109)({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, descriptor;
    while (keys.length > i) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[i++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ 6210:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var nativeGetOwnPropertyNames = (__webpack_require__(1156).f);
var FAILS_ON_PRIMITIVES = __webpack_require__(7293)(function () { Object.getOwnPropertyNames(1); });

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
__webpack_require__(2109)({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  getOwnPropertyNames: nativeGetOwnPropertyNames
});


/***/ }),

/***/ 489:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var toObject = __webpack_require__(7908);
var nativeGetPrototypeOf = __webpack_require__(9518);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);
var FAILS_ON_PRIMITIVES = __webpack_require__(7293)(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
__webpack_require__(2109)({
  target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER
}, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),

/***/ 1825:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var nativeIsExtensible = Object.isExtensible;
var FAILS_ON_PRIMITIVES = __webpack_require__(7293)(function () { nativeIsExtensible(1); });

// `Object.isExtensible` method
// https://tc39.github.io/ecma262/#sec-object.isextensible
__webpack_require__(2109)({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  isExtensible: function isExtensible(it) {
    return isObject(it) ? nativeIsExtensible ? nativeIsExtensible(it) : true : false;
  }
});


/***/ }),

/***/ 8410:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var nativeIsFrozen = Object.isFrozen;
var FAILS_ON_PRIMITIVES = __webpack_require__(7293)(function () { nativeIsFrozen(1); });

// `Object.isFrozen` method
// https://tc39.github.io/ecma262/#sec-object.isfrozen
__webpack_require__(2109)({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  isFrozen: function isFrozen(it) {
    return isObject(it) ? nativeIsFrozen ? nativeIsFrozen(it) : false : true;
  }
});


/***/ }),

/***/ 2200:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var nativeIsSealed = Object.isSealed;
var FAILS_ON_PRIMITIVES = __webpack_require__(7293)(function () { nativeIsSealed(1); });

// `Object.isSealed` method
// https://tc39.github.io/ecma262/#sec-object.issealed
__webpack_require__(2109)({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  isSealed: function isSealed(it) {
    return isObject(it) ? nativeIsSealed ? nativeIsSealed(it) : false : true;
  }
});


/***/ }),

/***/ 3304:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Object.is` method
// https://tc39.github.io/ecma262/#sec-object.is
__webpack_require__(2109)({ target: 'Object', stat: true }, { is: __webpack_require__(1150) });


/***/ }),

/***/ 7941:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var toObject = __webpack_require__(7908);
var nativeKeys = __webpack_require__(1956);
var FAILS_ON_PRIMITIVES = __webpack_require__(7293)(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
__webpack_require__(2109)({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ 4869:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(7908);
var toPrimitive = __webpack_require__(7593);
var getPrototypeOf = __webpack_require__(9518);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var FORCED = __webpack_require__(1301);

// `Object.prototype.__lookupGetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__lookupGetter__
if (__webpack_require__(9781)) {
  __webpack_require__(2109)({ target: 'Object', proto: true, forced: FORCED }, {
    __lookupGetter__: function __lookupGetter__(P) {
      var O = toObject(this);
      var key = toPrimitive(P, true);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor(O, key)) return desc.get;
      } while (O = getPrototypeOf(O));
    }
  });
}


/***/ }),

/***/ 3952:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toObject = __webpack_require__(7908);
var toPrimitive = __webpack_require__(7593);
var getPrototypeOf = __webpack_require__(9518);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var FORCED = __webpack_require__(1301);

// `Object.prototype.__lookupSetter__` method
// https://tc39.github.io/ecma262/#sec-object.prototype.__lookupSetter__
if (__webpack_require__(9781)) {
  __webpack_require__(2109)({ target: 'Object', proto: true, forced: FORCED }, {
    __lookupSetter__: function __lookupSetter__(P) {
      var O = toObject(this);
      var key = toPrimitive(P, true);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor(O, key)) return desc.set;
      } while (O = getPrototypeOf(O));
    }
  });
}


/***/ }),

/***/ 7227:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var onFreeze = (__webpack_require__(2423).onFreeze);
var nativePreventExtensions = Object.preventExtensions;
var FREEZING = __webpack_require__(6677);
var FAILS_ON_PRIMITIVES = __webpack_require__(7293)(function () { nativePreventExtensions(1); });

// `Object.preventExtensions` method
// https://tc39.github.io/ecma262/#sec-object.preventextensions
__webpack_require__(2109)({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(it) {
    return nativePreventExtensions && isObject(it) ? nativePreventExtensions(onFreeze(it)) : it;
  }
});


/***/ }),

/***/ 514:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(111);
var onFreeze = (__webpack_require__(2423).onFreeze);
var nativeSeal = Object.seal;
var FREEZING = __webpack_require__(6677);
var FAILS_ON_PRIMITIVES = __webpack_require__(7293)(function () { nativeSeal(1); });

// `Object.seal` method
// https://tc39.github.io/ecma262/#sec-object.seal
__webpack_require__(2109)({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  seal: function seal(it) {
    return nativeSeal && isObject(it) ? nativeSeal(onFreeze(it)) : it;
  }
});


/***/ }),

/***/ 8304:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
__webpack_require__(2109)({ target: 'Object', stat: true }, {
  setPrototypeOf: __webpack_require__(7674)
});


/***/ }),

/***/ 1539:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var toString = __webpack_require__(288);
var ObjectPrototype = Object.prototype;

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (toString !== ObjectPrototype.toString) {
  __webpack_require__(1320)(ObjectPrototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ 6833:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var objectToArray = __webpack_require__(4699);

// `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values
__webpack_require__(2109)({ target: 'Object', stat: true }, {
  values: function values(O) {
    return objectToArray(O);
  }
});


/***/ }),

/***/ 4678:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var parseFloatImplementation = __webpack_require__(3677);

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
__webpack_require__(2109)({ global: true, forced: parseFloat != parseFloatImplementation }, {
  parseFloat: parseFloatImplementation
});


/***/ }),

/***/ 1058:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var parseIntImplementation = __webpack_require__(8620);

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
__webpack_require__(2109)({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});


/***/ }),

/***/ 7727:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var getBuiltIn = __webpack_require__(5005);
var speciesConstructor = __webpack_require__(6707);
var promiseResolve = __webpack_require__(9478);

// `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
__webpack_require__(2109)({ target: 'Promise', proto: true, real: true }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});


/***/ }),

/***/ 8674:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var PROMISE = 'Promise';
var IS_PURE = __webpack_require__(1913);
var global = __webpack_require__(7854);
var $export = __webpack_require__(2109);
var isObject = __webpack_require__(111);
var aFunction = __webpack_require__(3099);
var anInstance = __webpack_require__(5787);
var classof = __webpack_require__(4326);
var iterate = __webpack_require__(408);
var checkCorrectnessOfIteration = __webpack_require__(7072);
var speciesConstructor = __webpack_require__(6707);
var task = (__webpack_require__(261).set);
var microtask = __webpack_require__(5948);
var promiseResolve = __webpack_require__(9478);
var hostReportErrors = __webpack_require__(842);
var newPromiseCapabilityModule = __webpack_require__(8523);
var perform = __webpack_require__(2534);
var userAgent = __webpack_require__(227);
var SPECIES = __webpack_require__(5112)('species');
var InternalStateModule = __webpack_require__(9909);
var isForced = __webpack_require__(4705);
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = global[PROMISE];
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = global.fetch;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper;

var FORCED = isForced(PROMISE, function () {
  // correct subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var empty = function () { /* empty */ };
  var FakePromise = (promise.constructor = {})[SPECIES] = function (exec) {
    exec(empty, empty);
  };
  // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !((IS_NODE || typeof PromiseRejectionEvent == 'function')
    && (!IS_PURE || promise['finally'])
    && promise.then(empty) instanceof FakePromise
    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    && v8.indexOf('6.6') !== 0
    && userAgent.indexOf('Chrome/66') === -1);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = __webpack_require__(2248)(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  // wrap fetch result
  if (!IS_PURE && typeof $fetch == 'function') $export({ global: true, enumerable: true, forced: true }, {
    // eslint-disable-next-line no-unused-vars
    fetch: function fetch(input) {
      return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
    }
  });
}

$export({ global: true, wrap: true, forced: FORCED }, { Promise: PromiseConstructor });

__webpack_require__(8003)(PromiseConstructor, PROMISE, false, true);
__webpack_require__(6340)(PROMISE);

PromiseWrapper = __webpack_require__(857)[PROMISE];

// statics
$export({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$export({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      iterate(iterable, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ 224:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var aFunction = __webpack_require__(3099);
var anObject = __webpack_require__(9670);
var nativeApply = ((__webpack_require__(7854).Reflect) || {}).apply;
var functionApply = Function.apply;

// MS Edge argumentsList argument is optional
var OPTIONAL_ARGUMENTS_LIST = !__webpack_require__(7293)(function () {
  nativeApply(function () { /* empty */ });
});

// `Reflect.apply` method
// https://tc39.github.io/ecma262/#sec-reflect.apply
__webpack_require__(2109)({ target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
  apply: function apply(target, thisArgument, argumentsList) {
    aFunction(target);
    anObject(argumentsList);
    return nativeApply
      ? nativeApply(target, thisArgument, argumentsList)
      : functionApply.call(target, thisArgument, argumentsList);
  }
});


/***/ }),

/***/ 2419:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var create = __webpack_require__(30);
var aFunction = __webpack_require__(3099);
var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);
var fails = __webpack_require__(7293);
var bind = __webpack_require__(7065);
var nativeConstruct = ((__webpack_require__(7854).Reflect) || {}).construct;

// `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;

__webpack_require__(2109)({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ 9596:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var definePropertyModule = __webpack_require__(3070);
var anObject = __webpack_require__(9670);
var toPrimitive = __webpack_require__(7593);
var DESCRIPTORS = __webpack_require__(9781);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
var ERROR_INSTEAD_OF_FALSE = __webpack_require__(7293)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(definePropertyModule.f({}, 1, { value: 1 }), 1, { value: 2 });
});

// `Reflect.defineProperty` method
// https://tc39.github.io/ecma262/#sec-reflect.defineproperty
__webpack_require__(2109)({ target: 'Reflect', stat: true, forced: ERROR_INSTEAD_OF_FALSE, sham: !DESCRIPTORS }, {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      definePropertyModule.f(target, propertyKey, attributes);
      return true;
    } catch (error) {
      return false;
    }
  }
});


/***/ }),

/***/ 2586:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var anObject = __webpack_require__(9670);

// `Reflect.deleteProperty` method
// https://tc39.github.io/ecma262/#sec-reflect.deleteproperty
__webpack_require__(2109)({ target: 'Reflect', stat: true }, {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var descriptor = getOwnPropertyDescriptor(anObject(target), propertyKey);
    return descriptor && !descriptor.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),

/***/ 5683:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var anObject = __webpack_require__(9670);
var DESCRIPTORS = __webpack_require__(9781);

// `Reflect.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-reflect.getownpropertydescriptor
__webpack_require__(2109)({ target: 'Reflect', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  }
});


/***/ }),

/***/ 9361:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var objectGetPrototypeOf = __webpack_require__(9518);
var anObject = __webpack_require__(9670);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

// `Reflect.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-reflect.getprototypeof
__webpack_require__(2109)({ target: 'Reflect', stat: true, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(target) {
    return objectGetPrototypeOf(anObject(target));
  }
});


/***/ }),

/***/ 4819:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var getPrototypeOf = __webpack_require__(9518);
var has = __webpack_require__(6656);
var isObject = __webpack_require__(111);
var anObject = __webpack_require__(9670);

// `Reflect.get` method
// https://tc39.github.io/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  if (descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)) return has(descriptor, 'value')
    ? descriptor.value
    : descriptor.get === undefined
      ? undefined
      : descriptor.get.call(receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

__webpack_require__(2109)({ target: 'Reflect', stat: true }, { get: get });


/***/ }),

/***/ 1037:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Reflect.has` method
// https://tc39.github.io/ecma262/#sec-reflect.has
__webpack_require__(2109)({ target: 'Reflect', stat: true }, {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),

/***/ 5898:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(9670);
var objectIsExtensible = Object.isExtensible;

// `Reflect.isExtensible` method
// https://tc39.github.io/ecma262/#sec-reflect.isextensible
__webpack_require__(2109)({ target: 'Reflect', stat: true }, {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return objectIsExtensible ? objectIsExtensible(target) : true;
  }
});


/***/ }),

/***/ 7556:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Reflect.ownKeys` method
// https://tc39.github.io/ecma262/#sec-reflect.ownkeys
__webpack_require__(2109)({ target: 'Reflect', stat: true }, { ownKeys: __webpack_require__(3887) });


/***/ }),

/***/ 4361:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5005);
var anObject = __webpack_require__(9670);
var FREEZING = __webpack_require__(6677);

// `Reflect.preventExtensions` method
// https://tc39.github.io/ecma262/#sec-reflect.preventextensions
__webpack_require__(2109)({ target: 'Reflect', stat: true, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      var objectPreventExtensions = getBuiltIn('Object', 'preventExtensions');
      if (objectPreventExtensions) objectPreventExtensions(target);
      return true;
    } catch (error) {
      return false;
    }
  }
});


/***/ }),

/***/ 9532:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var objectSetPrototypeOf = __webpack_require__(7674);
var validateSetPrototypeOfArguments = __webpack_require__(9475);

// `Reflect.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-reflect.setprototypeof
if (objectSetPrototypeOf) __webpack_require__(2109)({ target: 'Reflect', stat: true }, {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    validateSetPrototypeOfArguments(target, proto);
    try {
      objectSetPrototypeOf(target, proto);
      return true;
    } catch (error) {
      return false;
    }
  }
});


/***/ }),

/***/ 3593:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var definePropertyModule = __webpack_require__(3070);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var getPrototypeOf = __webpack_require__(9518);
var has = __webpack_require__(6656);
var createPropertyDescriptor = __webpack_require__(9114);
var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);

// `Reflect.set` method
// https://tc39.github.io/ecma262/#sec-reflect.set
function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDescriptor = getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  var existingDescriptor, prototype;
  if (!ownDescriptor) {
    if (isObject(prototype = getPrototypeOf(target))) {
      return set(prototype, propertyKey, V, receiver);
    }
    ownDescriptor = createPropertyDescriptor(0);
  }
  if (has(ownDescriptor, 'value')) {
    if (ownDescriptor.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = getOwnPropertyDescriptorModule.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      definePropertyModule.f(receiver, propertyKey, existingDescriptor);
    } else definePropertyModule.f(receiver, propertyKey, createPropertyDescriptor(0, V));
    return true;
  }
  return ownDescriptor.set === undefined ? false : (ownDescriptor.set.call(receiver, V), true);
}

__webpack_require__(2109)({ target: 'Reflect', stat: true }, { set: set });


/***/ }),

/***/ 4603:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(9781);
var MATCH = __webpack_require__(5112)('match');
var global = __webpack_require__(7854);
var isForced = __webpack_require__(4705);
var inheritIfRequired = __webpack_require__(9587);
var defineProperty = (__webpack_require__(3070).f);
var getOwnPropertyNames = (__webpack_require__(8006).f);
var isRegExp = __webpack_require__(7850);
var getFlags = __webpack_require__(7066);
var redefine = __webpack_require__(1320);
var fails = __webpack_require__(7293);
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var FORCED = isForced('RegExp', DESCRIPTORS && (!CORRECT_NEW || fails(function () {
  re2[MATCH] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    return !thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined ? pattern
      : inheritIfRequired(CORRECT_NEW
        ? new NativeRegExp(patternIsRegExp && !flagsAreUndefined ? pattern.source : pattern, flags)
        : NativeRegExp((patternIsRegExp = pattern instanceof RegExpWrapper)
          ? pattern.source
          : pattern, patternIsRegExp && flagsAreUndefined ? getFlags.call(pattern) : flags)
      , thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var i = 0;
  while (i < keys.length) proxy(keys[i++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
__webpack_require__(6340)('RegExp');


/***/ }),

/***/ 4916:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var regexpExec = __webpack_require__(2261);

__webpack_require__(2109)({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
  exec: regexpExec
});


/***/ }),

/***/ 2087:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `RegExp.prototype.flags` getter
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
if (__webpack_require__(9781) && /./g.flags != 'g') {
  (__webpack_require__(3070).f)(RegExp.prototype, 'flags', {
    configurable: true,
    get: __webpack_require__(7066)
  });
}


/***/ }),

/***/ 9714:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var anObject = __webpack_require__(9670);
var fails = __webpack_require__(7293);
var flags = __webpack_require__(7066);
var DESCRIPTORS = __webpack_require__(9781);
var TO_STRING = 'toString';
var nativeToString = /./[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  __webpack_require__(1320)(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? flags.call(R) : undefined);
  }, { unsafe: true });
}


/***/ }),

/***/ 189:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
module.exports = __webpack_require__(7710)('Set', function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, __webpack_require__(5631));


/***/ }),

/***/ 5218:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('anchor');

// `String.prototype.anchor` method
// https://tc39.github.io/ecma262/#sec-string.prototype.anchor
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  anchor: function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  }
});


/***/ }),

/***/ 4475:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('big');

// `String.prototype.big` method
// https://tc39.github.io/ecma262/#sec-string.prototype.big
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  big: function big() {
    return createHTML(this, 'big', '', '');
  }
});


/***/ }),

/***/ 7929:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('blink');

// `String.prototype.blink` method
// https://tc39.github.io/ecma262/#sec-string.prototype.blink
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  blink: function blink() {
    return createHTML(this, 'blink', '', '');
  }
});


/***/ }),

/***/ 915:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('bold');

// `String.prototype.bold` method
// https://tc39.github.io/ecma262/#sec-string.prototype.bold
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  bold: function bold() {
    return createHTML(this, 'b', '', '');
  }
});


/***/ }),

/***/ 9841:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalCodePointAt = __webpack_require__(5866);

// `String.prototype.codePointAt` method
// https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
__webpack_require__(2109)({ target: 'String', proto: true }, {
  codePointAt: function codePointAt(pos) {
    return internalCodePointAt(this, pos);
  }
});


/***/ }),

/***/ 7852:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toLength = __webpack_require__(7466);
var validateArguments = __webpack_require__(8468);
var ENDS_WITH = 'endsWith';
var nativeEndsWith = ''[ENDS_WITH];
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = __webpack_require__(4964)(ENDS_WITH);

// `String.prototype.endsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.endswith
__webpack_require__(2109)({ target: 'String', proto: true, forced: !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = validateArguments(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = String(searchString);
    return nativeEndsWith
      ? nativeEndsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),

/***/ 9253:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('fixed');

// `String.prototype.fixed` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fixed
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  fixed: function fixed() {
    return createHTML(this, 'tt', '', '');
  }
});


/***/ }),

/***/ 2125:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('fontcolor');

// `String.prototype.fontcolor` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fontcolor
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  fontcolor: function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  }
});


/***/ }),

/***/ 8830:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('fontsize');

// `String.prototype.fontsize` method
// https://tc39.github.io/ecma262/#sec-string.prototype.fontsize
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  fontsize: function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  }
});


/***/ }),

/***/ 4953:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var toAbsoluteIndex = __webpack_require__(1400);
var fromCharCode = String.fromCharCode;
var nativeFromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
var INCORRECT_LENGTH = !!nativeFromCodePoint && nativeFromCodePoint.length != 1;

// `String.fromCodePoint` method
// https://tc39.github.io/ecma262/#sec-string.fromcodepoint
__webpack_require__(2109)({ target: 'String', stat: true, forced: INCORRECT_LENGTH }, {
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var elements = [];
    var length = arguments.length;
    var i = 0;
    var code;
    while (length > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw RangeError(code + ' is not a valid code point');
      elements.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00)
      );
    } return elements.join('');
  }
});


/***/ }),

/***/ 2023:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var validateArguments = __webpack_require__(8468);
var INCLUDES = 'includes';

var CORRECT_IS_REGEXP_LOGIC = __webpack_require__(4964)(INCLUDES);

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
__webpack_require__(2109)({ target: 'String', proto: true, forced: !CORRECT_IS_REGEXP_LOGIC }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~validateArguments(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ 8734:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('italics');

// `String.prototype.italics` method
// https://tc39.github.io/ecma262/#sec-string.prototype.italics
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  italics: function italics() {
    return createHTML(this, 'i', '', '');
  }
});


/***/ }),

/***/ 8783:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var codePointAt = __webpack_require__(5866);
var InternalStateModule = __webpack_require__(9909);
var defineIterator = __webpack_require__(654);
var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = codePointAt(string, index, true);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 9254:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('link');

// `String.prototype.link` method
// https://tc39.github.io/ecma262/#sec-string.prototype.link
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  link: function link(url) {
    return createHTML(this, 'a', 'href', url);
  }
});


/***/ }),

/***/ 4723:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var anObject = __webpack_require__(9670);
var toLength = __webpack_require__(7466);
var requireObjectCoercible = __webpack_require__(4488);
var advanceStringIndex = __webpack_require__(1530);
var regExpExec = __webpack_require__(7651);

// @@match logic
__webpack_require__(7007)(
  'match',
  1,
  function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = regexp == undefined ? undefined : regexp[MATCH];
        return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
      function (regexp) {
        var res = maybeCallNative(nativeMatch, regexp, this);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        if (!rx.global) return regExpExec(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  }
);


/***/ }),

/***/ 6528:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalStringPad = __webpack_require__(6650);
var WEBKIT_BUG = __webpack_require__(7428);

// `String.prototype.padEnd` method
// https://tc39.github.io/ecma262/#sec-string.prototype.padend
__webpack_require__(2109)({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return internalStringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),

/***/ 3112:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalStringPad = __webpack_require__(6650);
var WEBKIT_BUG = __webpack_require__(7428);

// `String.prototype.padStart` method
// https://tc39.github.io/ecma262/#sec-string.prototype.padstart
__webpack_require__(2109)({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return internalStringPad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),

/***/ 8992:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(5656);
var toLength = __webpack_require__(7466);

// `String.raw` method
// https://tc39.github.io/ecma262/#sec-string.raw
__webpack_require__(2109)({ target: 'String', stat: true }, {
  raw: function raw(template) {
    var rawTemplate = toIndexedObject(template.raw);
    var literalSegments = toLength(rawTemplate.length);
    var argumentsLength = arguments.length;
    var elements = [];
    var i = 0;
    while (literalSegments > i) {
      elements.push(String(rawTemplate[i++]));
      if (i < argumentsLength) elements.push(String(arguments[i]));
    } return elements.join('');
  }
});


/***/ }),

/***/ 2481:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `String.prototype.repeat` method
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
__webpack_require__(2109)({ target: 'String', proto: true }, {
  repeat: __webpack_require__(8415)
});


/***/ }),

/***/ 5306:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var anObject = __webpack_require__(9670);
var toObject = __webpack_require__(7908);
var toLength = __webpack_require__(7466);
var toInteger = __webpack_require__(9958);
var requireObjectCoercible = __webpack_require__(4488);
var advanceStringIndex = __webpack_require__(1530);
var regExpExec = __webpack_require__(7651);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(7007)(
  'replace',
  2,
  function (REPLACE, nativeReplace, maybeCallNative) {
    return [
      // `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec(rx, S);
          if (result === null) break;

          results.push(result);
          if (!global) break;

          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = String(result[0]);
          var position = max(min(toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return nativeReplace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return match;
            if (n > m) {
              var f = floor(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    }
  }
);


/***/ }),

/***/ 4765:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var anObject = __webpack_require__(9670);
var requireObjectCoercible = __webpack_require__(4488);
var sameValue = __webpack_require__(1150);
var regExpExec = __webpack_require__(7651);

// @@search logic
__webpack_require__(7007)(
  'search',
  1,
  function (SEARCH, nativeSearch, maybeCallNative) {
    return [
      // `String.prototype.search` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.search
      function search(regexp) {
        var O = requireObjectCoercible(this);
        var searcher = regexp == undefined ? undefined : regexp[SEARCH];
        return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
      },
      // `RegExp.prototype[@@search]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
      function (regexp) {
        var res = maybeCallNative(nativeSearch, regexp, this);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        var previousLastIndex = rx.lastIndex;
        if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
        var result = regExpExec(rx, S);
        if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
        return result === null ? -1 : result.index;
      }
    ];
  }
);


/***/ }),

/***/ 7268:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('small');

// `String.prototype.small` method
// https://tc39.github.io/ecma262/#sec-string.prototype.small
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  small: function small() {
    return createHTML(this, 'small', '', '');
  }
});


/***/ }),

/***/ 3123:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isRegExp = __webpack_require__(7850);
var anObject = __webpack_require__(9670);
var requireObjectCoercible = __webpack_require__(4488);
var speciesConstructor = __webpack_require__(6707);
var advanceStringIndex = __webpack_require__(1530);
var toLength = __webpack_require__(7466);
var callRegExpExec = __webpack_require__(7651);
var regexpExec = __webpack_require__(2261);
var fails = __webpack_require__(7293);
var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(7007)(
  'split',
  2,
  function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(requireObjectCoercible(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegExp(separator)) {
          return nativeSplit.call(string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output.length > lim ? output.slice(0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this);
        var splitter = separator == undefined ? undefined : separator[SPLIT];
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (regexp, limit) {
        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);
        var C = speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (SUPPORTS_Y ? 'y' : 'g');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = SUPPORTS_Y ? q : 0;
          var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
          var e;
          if (
            z === null ||
            (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  },
  !SUPPORTS_Y
);


/***/ }),

/***/ 6755:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toLength = __webpack_require__(7466);
var validateArguments = __webpack_require__(8468);
var STARTS_WITH = 'startsWith';
var CORRECT_IS_REGEXP_LOGIC = __webpack_require__(4964)(STARTS_WITH);
var nativeStartsWith = ''[STARTS_WITH];

// `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
__webpack_require__(2109)({ target: 'String', proto: true, forced: !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = validateArguments(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return nativeStartsWith
      ? nativeStartsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ 7397:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('strike');

// `String.prototype.strike` method
// https://tc39.github.io/ecma262/#sec-string.prototype.strike
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  strike: function strike() {
    return createHTML(this, 'strike', '', '');
  }
});


/***/ }),

/***/ 86:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('sub');

// `String.prototype.sub` method
// https://tc39.github.io/ecma262/#sec-string.prototype.sub
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  sub: function sub() {
    return createHTML(this, 'sub', '', '');
  }
});


/***/ }),

/***/ 623:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var createHTML = __webpack_require__(4230);
var FORCED = __webpack_require__(2098)('sup');

// `String.prototype.sup` method
// https://tc39.github.io/ecma262/#sec-string.prototype.sup
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  sup: function sup() {
    return createHTML(this, 'sup', '', '');
  }
});


/***/ }),

/***/ 8702:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalStringTrim = __webpack_require__(3111);
var FORCED = __webpack_require__(8711)('trimEnd');

var trimEnd = FORCED ? function trimEnd() {
  return internalStringTrim(this, 2);
} : ''.trimEnd;

// `String.prototype.{ trimEnd, trimRight }` methods
// https://github.com/tc39/ecmascript-string-left-right-trim
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  trimEnd: trimEnd,
  trimRight: trimEnd
});


/***/ }),

/***/ 5674:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalStringTrim = __webpack_require__(3111);
var FORCED = __webpack_require__(8711)('trimStart');

var trimStart = FORCED ? function trimStart() {
  return internalStringTrim(this, 1);
} : ''.trimStart;

// `String.prototype.{ trimStart, trimLeft }` methods
// https://github.com/tc39/ecmascript-string-left-right-trim
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  trimStart: trimStart,
  trimLeft: trimStart
});


/***/ }),

/***/ 3210:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var internalStringTrim = __webpack_require__(3111);
var FORCED = __webpack_require__(8711)('trim');

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
__webpack_require__(2109)({ target: 'String', proto: true, forced: FORCED }, {
  trim: function trim() {
    return internalStringTrim(this, 3);
  }
});


/***/ }),

/***/ 2443:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.asyncIterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.asynciterator
__webpack_require__(7235)('asyncIterator');


/***/ }),

/***/ 1817:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var DESCRIPTORS = __webpack_require__(9781);
var has = __webpack_require__(6656);
var isObject = __webpack_require__(111);
var defineProperty = (__webpack_require__(3070).f);
var copyConstructorProperties = __webpack_require__(9920);
var NativeSymbol = (__webpack_require__(7854).Symbol);

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  __webpack_require__(2109)({ global: true, forced: true }, { Symbol: SymbolWrapper });
}


/***/ }),

/***/ 2401:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.hasInstance` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.hasinstance
__webpack_require__(7235)('hasInstance');


/***/ }),

/***/ 8722:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable
__webpack_require__(7235)('isConcatSpreadable');


/***/ }),

/***/ 2165:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
__webpack_require__(7235)('iterator');


/***/ }),

/***/ 2526:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(7854);
var has = __webpack_require__(6656);
var DESCRIPTORS = __webpack_require__(9781);
var IS_PURE = __webpack_require__(1913);
var $export = __webpack_require__(2109);
var redefine = __webpack_require__(1320);
var hiddenKeys = __webpack_require__(3501);
var fails = __webpack_require__(7293);
var shared = __webpack_require__(2309);
var setToStringTag = __webpack_require__(8003);
var uid = __webpack_require__(9711);
var wellKnownSymbol = __webpack_require__(5112);
var wrappedWellKnownSymbolModule = __webpack_require__(6805);
var defineWellKnownSymbol = __webpack_require__(7235);
var enumKeys = __webpack_require__(6294);
var isArray = __webpack_require__(3157);
var anObject = __webpack_require__(9670);
var isObject = __webpack_require__(111);
var toIndexedObject = __webpack_require__(5656);
var toPrimitive = __webpack_require__(7593);
var createPropertyDescriptor = __webpack_require__(9114);
var nativeObjectCreate = __webpack_require__(30);
var getOwnPropertyNamesExternal = __webpack_require__(1156);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);
var propertyIsEnumerableModule = __webpack_require__(5296);
var hide = __webpack_require__(5185);
var objectKeys = __webpack_require__(1956);
var HIDDEN = __webpack_require__(6200)('hidden');
var InternalStateModule = __webpack_require__(9909);
var SYMBOL = 'Symbol';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var $Symbol = global.Symbol;
var JSON = global.JSON;
var nativeJSONStringify = JSON && JSON.stringify;
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var WellKnownSymbolsStore = shared('wks');
var ObjectPrototype = Object[PROTOTYPE];
var QObject = global.QObject;
var NATIVE_SYMBOL = __webpack_require__(133);
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, key);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[key];
  nativeDefineProperty(it, key, D);
  if (ObjectPrototypeDescriptor && it !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, key, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = NATIVE_SYMBOL && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) nativeDefineProperty(it, HIDDEN, createPropertyDescriptor(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = nativeObjectCreate(D, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(it, key, D);
  } return nativeDefineProperty(it, key, D);
};

var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIndexedObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};

var $create = function create(it, P) {
  return P === undefined ? nativeObjectCreate(it) : $defineProperties(nativeObjectCreate(it), P);
};

var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = nativePropertyIsEnumerable.call(this, key = toPrimitive(key, true));
  if (this === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIndexedObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var D = nativeGetOwnPropertyDescriptor(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};

var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && !has(hiddenKeys, key)) result.push(key);
  } return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OP ? ObjectPrototypeSymbols : toIndexedObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectPrototype, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  (__webpack_require__(8006).f) = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  (__webpack_require__(5181).f) = $getOwnPropertySymbols;

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };
}

$export({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, { Symbol: $Symbol });

for (var wellKnownSymbols = objectKeys(WellKnownSymbolsStore), k = 0; wellKnownSymbols.length > k;) {
  defineWellKnownSymbol(wellKnownSymbols[k++]);
}

$export({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$export({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$export({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
JSON && $export({ target: 'JSON', stat: true, forced: !NATIVE_SYMBOL || fails(function () {
  var symbol = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  return nativeJSONStringify([symbol]) != '[null]'
    // WebKit converts symbol values to JSON as null
    || nativeJSONStringify({ a: symbol }) != '{}'
    // V8 throws on boxed symbols
    || nativeJSONStringify(Object(symbol)) != '{}';
}) }, {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return nativeJSONStringify.apply(JSON, args);
  }
});

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) hide($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ 9007:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.match` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.match
__webpack_require__(7235)('match');


/***/ }),

/***/ 3510:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.replace` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.replace
__webpack_require__(7235)('replace');


/***/ }),

/***/ 1840:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.search` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.search
__webpack_require__(7235)('search');


/***/ }),

/***/ 6982:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.species` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.species
__webpack_require__(7235)('species');


/***/ }),

/***/ 2159:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.split` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.split
__webpack_require__(7235)('split');


/***/ }),

/***/ 6649:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.toPrimitive` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.toprimitive
__webpack_require__(7235)('toPrimitive');


/***/ }),

/***/ 9341:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.toStringTag` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.tostringtag
__webpack_require__(7235)('toStringTag');


/***/ }),

/***/ 543:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Symbol.unscopables` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.unscopables
__webpack_require__(7235)('unscopables');


/***/ }),

/***/ 2990:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arrayCopyWithin = __webpack_require__(1048);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

// `%TypedArray%.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin
ArrayBufferViewCore.exportProto('copyWithin', function copyWithin(target, start /* , end */) {
  return arrayCopyWithin.call(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
});


/***/ }),

/***/ 8927:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arrayEvery = __webpack_require__(7550)(4);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

// `%TypedArray%.prototype.every` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every
ArrayBufferViewCore.exportProto('every', function every(callbackfn /* , thisArg */) {
  return arrayEvery(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 3105:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arrayFill = __webpack_require__(1285);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

// `%TypedArray%.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
// eslint-disable-next-line no-unused-vars
ArrayBufferViewCore.exportProto('fill', function fill(value /* , start, end */) {
  return arrayFill.apply(aTypedArray(this), arguments);
});


/***/ }),

/***/ 5035:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var speciesConstructor = __webpack_require__(6707);
var ArrayBufferViewCore = __webpack_require__(260);
var arrayFilter = __webpack_require__(7550)(2);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;

// `%TypedArray%.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter
ArrayBufferViewCore.exportProto('filter', function filter(callbackfn /* , thisArg */) {
  var list = arrayFilter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
});


/***/ }),

/***/ 7174:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arrayFindIndex = __webpack_require__(7550)(6);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

// `%TypedArray%.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex
ArrayBufferViewCore.exportProto('findIndex', function findIndex(predicate /* , thisArg */) {
  return arrayFindIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 4345:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arrayFind = __webpack_require__(7550)(5);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

// `%TypedArray%.prototype.find` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find
ArrayBufferViewCore.exportProto('find', function find(predicate /* , thisArg */) {
  return arrayFind(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 4197:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Float32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(9843)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 6495:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Float64Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(9843)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 2846:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arrayForEach = __webpack_require__(7550)(0);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

// `%TypedArray%.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach
ArrayBufferViewCore.exportProto('forEach', function forEach(callbackfn /* , thisArg */) {
  arrayForEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 8145:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(6500);
var ArrayBufferViewCore = __webpack_require__(260);
var typedArrayFrom = __webpack_require__(7321);

// `%TypedArray%.from` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.from
ArrayBufferViewCore.exportStatic('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);


/***/ }),

/***/ 4731:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arrayIncludes = __webpack_require__(1318)(true);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

// `%TypedArray%.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes
ArrayBufferViewCore.exportProto('includes', function includes(searchElement /* , fromIndex */) {
  return arrayIncludes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 7209:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arrayIndexOf = __webpack_require__(1318)(false);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

// `%TypedArray%.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof
ArrayBufferViewCore.exportProto('indexOf', function indexOf(searchElement /* , fromIndex */) {
  return arrayIndexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 5109:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Int16Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(9843)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 5125:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Int32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(9843)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 7145:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Int8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(9843)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 6319:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayIterators = __webpack_require__(6992);
var Uint8Array = (__webpack_require__(7854).Uint8Array);
var ArrayBufferViewCore = __webpack_require__(260);
var ITERATOR = __webpack_require__(5112)('iterator');
var arrayValues = ArrayIterators.values;
var arrayKeys = ArrayIterators.keys;
var arrayEntries = ArrayIterators.entries;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportProto = ArrayBufferViewCore.exportProto;
var nativeTypedArrayIterator = Uint8Array && Uint8Array.prototype[ITERATOR];

var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

var typedArrayValues = function values() {
  return arrayValues.call(aTypedArray(this));
};

// `%TypedArray%.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries
exportProto('entries', function entries() {
  return arrayEntries.call(aTypedArray(this));
});
// `%TypedArray%.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys
exportProto('keys', function keys() {
  return arrayKeys.call(aTypedArray(this));
});
// `%TypedArray%.prototype.values` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values
exportProto('values', typedArrayValues, !CORRECT_ITER_NAME);
// `%TypedArray%.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator
exportProto(ITERATOR, typedArrayValues, !CORRECT_ITER_NAME);


/***/ }),

/***/ 8867:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var arrayJoin = [].join;

// `%TypedArray%.prototype.join` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
// eslint-disable-next-line no-unused-vars
ArrayBufferViewCore.exportProto('join', function join(separator) {
  return arrayJoin.apply(aTypedArray(this), arguments);
});


/***/ }),

/***/ 7789:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arrayLastIndexOf = __webpack_require__(6583);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

// `%TypedArray%.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
// eslint-disable-next-line no-unused-vars
ArrayBufferViewCore.exportProto('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
  return arrayLastIndexOf.apply(aTypedArray(this), arguments);
});


/***/ }),

/***/ 3739:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var speciesConstructor = __webpack_require__(6707);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;

var internalTypedArrayMap = __webpack_require__(7550)(1, function (O, length) {
  return new (aTypedArrayConstructor(speciesConstructor(O, O.constructor)))(length);
});

// `%TypedArray%.prototype.map` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map
ArrayBufferViewCore.exportProto('map', function map(mapfn /* , thisArg */) {
  return internalTypedArrayMap(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 5206:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(6500);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;

// `%TypedArray%.of` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.of
ArrayBufferViewCore.exportStatic('of', function of(/* ...items */) {
  var index = 0;
  var length = arguments.length;
  var result = new (aTypedArrayConstructor(this))(length);
  while (length > index) result[index] = arguments[index++];
  return result;
}, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);


/***/ }),

/***/ 4483:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var arrayReduceRight = [].reduceRight;

// `%TypedArray%.prototype.reduceRicht` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright
// eslint-disable-next-line no-unused-vars
ArrayBufferViewCore.exportProto('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
  return arrayReduceRight.apply(aTypedArray(this), arguments);
});


/***/ }),

/***/ 9368:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var arrayReduce = [].reduce;

// `%TypedArray%.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce
// eslint-disable-next-line no-unused-vars
ArrayBufferViewCore.exportProto('reduce', function reduce(callbackfn /* , initialValue */) {
  return arrayReduce.apply(aTypedArray(this), arguments);
});


/***/ }),

/***/ 2056:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

// `%TypedArray%.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse
ArrayBufferViewCore.exportProto('reverse', function reverse() {
  var that = this;
  var length = aTypedArray(that).length;
  var middle = Math.floor(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  } return that;
});


/***/ }),

/***/ 3462:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toLength = __webpack_require__(7466);
var toOffset = __webpack_require__(4590);
var toObject = __webpack_require__(7908);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

var FORCED = __webpack_require__(7293)(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).set({});
});

// `%TypedArray%.prototype.set` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
ArrayBufferViewCore.exportProto('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments[1], 1);
  var length = this.length;
  var src = toObject(arrayLike);
  var len = toLength(src.length);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, FORCED);


/***/ }),

/***/ 678:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var speciesConstructor = __webpack_require__(6707);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
var arraySlice = [].slice;

var FORCED = __webpack_require__(7293)(function () {
  // eslint-disable-next-line no-undef
  new Int8Array(1).slice();
});

// `%TypedArray%.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
ArrayBufferViewCore.exportProto('slice', function slice(start, end) {
  var list = arraySlice.call(aTypedArray(this), start, end);
  var C = speciesConstructor(this, this.constructor);
  var index = 0;
  var length = list.length;
  var result = new (aTypedArrayConstructor(C))(length);
  while (length > index) result[index] = list[index++];
  return result;
}, FORCED);


/***/ }),

/***/ 7462:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var arraySome = __webpack_require__(7550)(3);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

// `%TypedArray%.prototype.some` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some
ArrayBufferViewCore.exportProto('some', function some(callbackfn /* , thisArg */) {
  return arraySome(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 3824:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var arraySort = [].sort;

// `%TypedArray%.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
ArrayBufferViewCore.exportProto('sort', function sort(comparefn) {
  return arraySort.call(aTypedArray(this), comparefn);
});


/***/ }),

/***/ 5021:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var toLength = __webpack_require__(7466);
var toAbsoluteIndex = __webpack_require__(1400);
var speciesConstructor = __webpack_require__(6707);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;

// `%TypedArray%.prototype.subarray` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray
ArrayBufferViewCore.exportProto('subarray', function subarray(begin, end) {
  var O = aTypedArray(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  return new (speciesConstructor(O, O.constructor))(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});


/***/ }),

/***/ 2974:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var Int8Array = (__webpack_require__(7854).Int8Array);
var fails = __webpack_require__(7293);
var ArrayBufferViewCore = __webpack_require__(260);
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var arrayToLocaleString = [].toLocaleString;
var arraySlice = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_BUG = !!Int8Array && fails(function () {
  arrayToLocaleString.call(new Int8Array(1));
});
var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
ArrayBufferViewCore.exportProto('toLocaleString', function toLocaleString() {
  return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(aTypedArray(this)) : aTypedArray(this), arguments);
}, FORCED);


/***/ }),

/***/ 5016:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var Uint8Array = (__webpack_require__(7854).Uint8Array);
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype;
var ArrayBufferViewCore = __webpack_require__(260);
var arrayToString = [].toString;
var arrayJoin = [].join;

if (__webpack_require__(7293)(function () { arrayToString.call({}); })) {
  arrayToString = function toString() {
    return arrayJoin.call(this);
  };
}

// `%TypedArray%.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring
ArrayBufferViewCore.exportProto('toString', arrayToString, (Uint8ArrayPrototype || {}).toString != arrayToString);


/***/ }),

/***/ 8255:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Uint16Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(9843)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 9135:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Uint32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(9843)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 2472:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Uint8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(9843)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ 9743:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// `Uint8ClampedArray` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(9843)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),

/***/ 4129:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(7854);
var redefineAll = __webpack_require__(2248);
var InternalMetadataModule = __webpack_require__(2423);
var weak = __webpack_require__(9320);
var isObject = __webpack_require__(111);
var enforceIternalState = (__webpack_require__(9909).enforce);
var NATIVE_WEAK_MAP = __webpack_require__(8536);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = __webpack_require__(7710)('WeakMap', wrapper, weak, true, true);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = weak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}


/***/ }),

/***/ 8478:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// `WeakSet` constructor
// https://tc39.github.io/ecma262/#sec-weakset-constructor
__webpack_require__(7710)('WeakSet', function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, __webpack_require__(9320), false, true);


/***/ }),

/***/ 5666:
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/************************************************************************/
/******/
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	__webpack_require__(1926);
/******/ 	__webpack_require__(5666);
/******/ 	var __webpack_exports__ = __webpack_require__(5590);
/******/
/******/ })()
;
//# sourceMappingURL=bundle.js.map
