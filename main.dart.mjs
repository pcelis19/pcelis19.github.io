
// `modulePromise` is a promise to the `WebAssembly.module` object to be
//   instantiated.
// `importObjectPromise` is a promise to an object that contains any additional
//   imports needed by the module that aren't provided by the standard runtime.
//   The fields on this object will be merged into the importObject with which
//   the module will be instantiated.
// This function returns a promise to the instantiated module.
export const instantiate = async (modulePromise, importObjectPromise) => {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
      const exports = dartInstance.exports;
      const read = exports.$listRead;
      const length = exports.$listLength(list);
      const array = new constructor(length);
      for (let i = 0; i < length; i++) {
        array[i] = read(list, i);
      }
      return array;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {

_1: (x0,x1,x2) => x0.set(x1,x2),
_2: (x0,x1,x2) => x0.set(x1,x2),
_6: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._6(f,arguments.length,x0) }),
_7: x0 => new window.FinalizationRegistry(x0),
_8: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
_9: (x0,x1) => x0.unregister(x1),
_10: (x0,x1,x2) => x0.slice(x1,x2),
_11: (x0,x1) => x0.decode(x1),
_12: (x0,x1) => x0.segment(x1),
_13: () => new TextDecoder(),
_14: x0 => x0.buffer,
_15: x0 => x0.wasmMemory,
_16: () => globalThis.window._flutter_skwasmInstance,
_17: x0 => x0.rasterStartMilliseconds,
_18: x0 => x0.rasterEndMilliseconds,
_19: x0 => x0.imageBitmaps,
_167: x0 => x0.select(),
_168: (x0,x1) => x0.append(x1),
_169: x0 => x0.remove(),
_172: x0 => x0.unlock(),
_177: x0 => x0.getReader(),
_189: x0 => new MutationObserver(x0),
_208: (x0,x1,x2) => x0.addEventListener(x1,x2),
_209: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_212: x0 => new ResizeObserver(x0),
_215: (x0,x1) => new Intl.Segmenter(x0,x1),
_216: x0 => x0.next(),
_217: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
_302: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._302(f,arguments.length,x0) }),
_303: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._303(f,arguments.length,x0) }),
_304: (x0,x1) => ({addView: x0,removeView: x1}),
_305: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._305(f,arguments.length,x0) }),
_306: f => finalizeWrapper(f, function() { return dartInstance.exports._306(f,arguments.length) }),
_307: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
_308: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._308(f,arguments.length,x0) }),
_309: x0 => ({runApp: x0}),
_310: x0 => new Uint8Array(x0),
_312: x0 => x0.preventDefault(),
_313: x0 => x0.stopPropagation(),
_314: (x0,x1) => x0.addListener(x1),
_315: (x0,x1) => x0.removeListener(x1),
_316: (x0,x1) => x0.prepend(x1),
_317: x0 => x0.remove(),
_318: x0 => x0.disconnect(),
_319: (x0,x1) => x0.addListener(x1),
_320: (x0,x1) => x0.removeListener(x1),
_322: (x0,x1) => x0.append(x1),
_323: x0 => x0.remove(),
_324: x0 => x0.stopPropagation(),
_328: x0 => x0.preventDefault(),
_329: (x0,x1) => x0.append(x1),
_330: x0 => x0.remove(),
_331: x0 => x0.preventDefault(),
_336: (x0,x1) => x0.appendChild(x1),
_337: (x0,x1,x2) => x0.insertBefore(x1,x2),
_338: (x0,x1) => x0.removeChild(x1),
_339: (x0,x1) => x0.appendChild(x1),
_340: (x0,x1) => x0.transferFromImageBitmap(x1),
_341: (x0,x1) => x0.append(x1),
_342: (x0,x1) => x0.append(x1),
_343: (x0,x1) => x0.append(x1),
_344: x0 => x0.remove(),
_345: x0 => x0.remove(),
_346: x0 => x0.remove(),
_347: (x0,x1) => x0.appendChild(x1),
_348: (x0,x1) => x0.appendChild(x1),
_349: x0 => x0.remove(),
_350: (x0,x1) => x0.append(x1),
_351: (x0,x1) => x0.append(x1),
_352: x0 => x0.remove(),
_353: (x0,x1) => x0.append(x1),
_354: (x0,x1) => x0.append(x1),
_355: (x0,x1,x2) => x0.insertBefore(x1,x2),
_356: (x0,x1) => x0.append(x1),
_357: (x0,x1,x2) => x0.insertBefore(x1,x2),
_358: x0 => x0.remove(),
_359: x0 => x0.remove(),
_360: (x0,x1) => x0.append(x1),
_361: x0 => x0.remove(),
_362: (x0,x1) => x0.append(x1),
_363: x0 => x0.remove(),
_364: x0 => x0.remove(),
_365: x0 => x0.getBoundingClientRect(),
_366: x0 => x0.remove(),
_367: x0 => x0.blur(),
_368: x0 => x0.remove(),
_369: x0 => x0.blur(),
_370: x0 => x0.remove(),
_383: (x0,x1) => x0.append(x1),
_384: x0 => x0.remove(),
_385: (x0,x1) => x0.append(x1),
_386: (x0,x1,x2) => x0.insertBefore(x1,x2),
_387: x0 => x0.preventDefault(),
_388: x0 => x0.preventDefault(),
_389: x0 => x0.preventDefault(),
_390: x0 => x0.preventDefault(),
_391: x0 => x0.remove(),
_392: (x0,x1) => x0.observe(x1),
_393: x0 => x0.disconnect(),
_394: (x0,x1) => x0.appendChild(x1),
_395: (x0,x1) => x0.appendChild(x1),
_396: (x0,x1) => x0.appendChild(x1),
_397: (x0,x1) => x0.append(x1),
_398: x0 => x0.remove(),
_399: (x0,x1) => x0.append(x1),
_401: (x0,x1) => x0.appendChild(x1),
_402: (x0,x1) => x0.append(x1),
_403: x0 => x0.remove(),
_404: (x0,x1) => x0.append(x1),
_408: (x0,x1) => x0.appendChild(x1),
_409: x0 => x0.remove(),
_969: () => globalThis.window.flutterConfiguration,
_970: x0 => x0.assetBase,
_975: x0 => x0.debugShowSemanticsNodes,
_976: x0 => x0.hostElement,
_977: x0 => x0.multiViewEnabled,
_978: x0 => x0.nonce,
_980: x0 => x0.fontFallbackBaseUrl,
_981: x0 => x0.useColorEmoji,
_985: x0 => x0.console,
_986: x0 => x0.devicePixelRatio,
_987: x0 => x0.document,
_988: x0 => x0.history,
_989: x0 => x0.innerHeight,
_990: x0 => x0.innerWidth,
_991: x0 => x0.location,
_992: x0 => x0.navigator,
_993: x0 => x0.visualViewport,
_994: x0 => x0.performance,
_995: (x0,x1) => x0.fetch(x1),
_1000: (x0,x1) => x0.dispatchEvent(x1),
_1001: (x0,x1) => x0.matchMedia(x1),
_1002: (x0,x1) => x0.getComputedStyle(x1),
_1004: x0 => x0.screen,
_1005: (x0,x1) => x0.requestAnimationFrame(x1),
_1006: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1006(f,arguments.length,x0) }),
_1010: (x0,x1) => x0.warn(x1),
_1013: () => globalThis.window,
_1014: () => globalThis.Intl,
_1015: () => globalThis.Symbol,
_1018: x0 => x0.clipboard,
_1019: x0 => x0.maxTouchPoints,
_1020: x0 => x0.vendor,
_1021: x0 => x0.language,
_1022: x0 => x0.platform,
_1023: x0 => x0.userAgent,
_1024: x0 => x0.languages,
_1025: x0 => x0.documentElement,
_1026: (x0,x1) => x0.querySelector(x1),
_1029: (x0,x1) => x0.createElement(x1),
_1031: (x0,x1) => x0.execCommand(x1),
_1035: (x0,x1) => x0.createTextNode(x1),
_1036: (x0,x1) => x0.createEvent(x1),
_1040: x0 => x0.head,
_1041: x0 => x0.body,
_1042: (x0,x1) => x0.title = x1,
_1045: x0 => x0.activeElement,
_1047: x0 => x0.visibilityState,
_1048: () => globalThis.document,
_1049: (x0,x1,x2) => x0.addEventListener(x1,x2),
_1050: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1051: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_1052: (x0,x1,x2) => x0.removeEventListener(x1,x2),
_1055: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1055(f,arguments.length,x0) }),
_1056: x0 => x0.target,
_1058: x0 => x0.timeStamp,
_1059: x0 => x0.type,
_1061: x0 => x0.preventDefault(),
_1065: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
_1070: x0 => x0.firstChild,
_1076: x0 => x0.parentElement,
_1078: x0 => x0.parentNode,
_1081: (x0,x1) => x0.removeChild(x1),
_1082: (x0,x1) => x0.removeChild(x1),
_1083: x0 => x0.isConnected,
_1084: (x0,x1) => x0.textContent = x1,
_1087: (x0,x1) => x0.contains(x1),
_1092: x0 => x0.firstElementChild,
_1094: x0 => x0.nextElementSibling,
_1095: x0 => x0.clientHeight,
_1096: x0 => x0.clientWidth,
_1097: x0 => x0.offsetHeight,
_1098: x0 => x0.offsetWidth,
_1099: x0 => x0.id,
_1100: (x0,x1) => x0.id = x1,
_1103: (x0,x1) => x0.spellcheck = x1,
_1104: x0 => x0.tagName,
_1105: x0 => x0.style,
_1107: (x0,x1) => x0.append(x1),
_1108: (x0,x1) => x0.getAttribute(x1),
_1109: x0 => x0.getBoundingClientRect(),
_1112: (x0,x1) => x0.closest(x1),
_1114: (x0,x1) => x0.querySelectorAll(x1),
_1115: x0 => x0.remove(),
_1116: (x0,x1,x2) => x0.setAttribute(x1,x2),
_1118: (x0,x1) => x0.removeAttribute(x1),
_1119: (x0,x1) => x0.tabIndex = x1,
_1121: (x0,x1) => x0.focus(x1),
_1122: x0 => x0.scrollTop,
_1123: (x0,x1) => x0.scrollTop = x1,
_1124: x0 => x0.scrollLeft,
_1125: (x0,x1) => x0.scrollLeft = x1,
_1126: x0 => x0.classList,
_1127: (x0,x1) => x0.className = x1,
_1131: (x0,x1) => x0.getElementsByClassName(x1),
_1132: x0 => x0.click(),
_1133: (x0,x1) => x0.hasAttribute(x1),
_1136: (x0,x1) => x0.attachShadow(x1),
_1140: (x0,x1) => x0.getPropertyValue(x1),
_1142: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
_1144: (x0,x1) => x0.removeProperty(x1),
_1146: x0 => x0.offsetLeft,
_1147: x0 => x0.offsetTop,
_1148: x0 => x0.offsetParent,
_1150: (x0,x1) => x0.name = x1,
_1151: x0 => x0.content,
_1152: (x0,x1) => x0.content = x1,
_1165: (x0,x1) => x0.nonce = x1,
_1170: x0 => x0.now(),
_1172: (x0,x1) => x0.width = x1,
_1174: (x0,x1) => x0.height = x1,
_1178: (x0,x1) => x0.getContext(x1),
_1256: x0 => x0.status,
_1258: x0 => x0.body,
_1259: x0 => x0.arrayBuffer(),
_1264: x0 => x0.read(),
_1265: x0 => x0.value,
_1266: x0 => x0.done,
_1269: x0 => x0.x,
_1270: x0 => x0.y,
_1273: x0 => x0.top,
_1274: x0 => x0.right,
_1275: x0 => x0.bottom,
_1276: x0 => x0.left,
_1285: x0 => x0.height,
_1286: x0 => x0.width,
_1287: (x0,x1) => x0.value = x1,
_1289: (x0,x1) => x0.placeholder = x1,
_1290: (x0,x1) => x0.name = x1,
_1291: x0 => x0.selectionDirection,
_1292: x0 => x0.selectionStart,
_1293: x0 => x0.selectionEnd,
_1296: x0 => x0.value,
_1298: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1303: x0 => x0.readText(),
_1304: (x0,x1) => x0.writeText(x1),
_1305: x0 => x0.altKey,
_1306: x0 => x0.code,
_1307: x0 => x0.ctrlKey,
_1308: x0 => x0.key,
_1309: x0 => x0.keyCode,
_1310: x0 => x0.location,
_1311: x0 => x0.metaKey,
_1312: x0 => x0.repeat,
_1313: x0 => x0.shiftKey,
_1314: x0 => x0.isComposing,
_1315: (x0,x1) => x0.getModifierState(x1),
_1316: x0 => x0.state,
_1319: (x0,x1) => x0.go(x1),
_1320: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
_1321: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
_1322: x0 => x0.pathname,
_1323: x0 => x0.search,
_1324: x0 => x0.hash,
_1327: x0 => x0.state,
_1333: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1333(f,arguments.length,x0,x1) }),
_1335: (x0,x1,x2) => x0.observe(x1,x2),
_1338: x0 => x0.attributeName,
_1339: x0 => x0.type,
_1340: x0 => x0.matches,
_1344: x0 => x0.matches,
_1345: x0 => x0.relatedTarget,
_1346: x0 => x0.clientX,
_1347: x0 => x0.clientY,
_1348: x0 => x0.offsetX,
_1349: x0 => x0.offsetY,
_1352: x0 => x0.button,
_1353: x0 => x0.buttons,
_1354: x0 => x0.ctrlKey,
_1355: (x0,x1) => x0.getModifierState(x1),
_1356: x0 => x0.pointerId,
_1357: x0 => x0.pointerType,
_1358: x0 => x0.pressure,
_1359: x0 => x0.tiltX,
_1360: x0 => x0.tiltY,
_1361: x0 => x0.getCoalescedEvents(),
_1362: x0 => x0.deltaX,
_1363: x0 => x0.deltaY,
_1364: x0 => x0.wheelDeltaX,
_1365: x0 => x0.wheelDeltaY,
_1366: x0 => x0.deltaMode,
_1371: x0 => x0.changedTouches,
_1373: x0 => x0.clientX,
_1374: x0 => x0.clientY,
_1375: x0 => x0.data,
_1376: (x0,x1) => x0.type = x1,
_1377: (x0,x1) => x0.max = x1,
_1378: (x0,x1) => x0.min = x1,
_1379: (x0,x1) => x0.value = x1,
_1380: x0 => x0.value,
_1381: x0 => x0.disabled,
_1382: (x0,x1) => x0.disabled = x1,
_1383: (x0,x1) => x0.placeholder = x1,
_1384: (x0,x1) => x0.name = x1,
_1385: (x0,x1) => x0.autocomplete = x1,
_1386: x0 => x0.selectionDirection,
_1387: x0 => x0.selectionStart,
_1388: x0 => x0.selectionEnd,
_1392: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
_1399: (x0,x1) => x0.add(x1),
_1402: (x0,x1) => x0.noValidate = x1,
_1403: (x0,x1) => x0.method = x1,
_1404: (x0,x1) => x0.action = x1,
_1431: x0 => x0.orientation,
_1432: x0 => x0.width,
_1433: x0 => x0.height,
_1434: (x0,x1) => x0.lock(x1),
_1451: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1451(f,arguments.length,x0,x1) }),
_1461: x0 => x0.length,
_1462: (x0,x1) => x0.item(x1),
_1463: x0 => x0.length,
_1464: (x0,x1) => x0.item(x1),
_1465: x0 => x0.iterator,
_1466: x0 => x0.Segmenter,
_1467: x0 => x0.v8BreakIterator,
_1470: x0 => x0.done,
_1471: x0 => x0.value,
_1472: x0 => x0.index,
_1476: (x0,x1) => x0.adoptText(x1),
_1478: x0 => x0.first(),
_1479: x0 => x0.next(),
_1480: x0 => x0.current(),
_1493: x0 => x0.hostElement,
_1494: x0 => x0.viewConstraints,
_1496: x0 => x0.maxHeight,
_1497: x0 => x0.maxWidth,
_1498: x0 => x0.minHeight,
_1499: x0 => x0.minWidth,
_1500: x0 => x0.loader,
_1501: () => globalThis._flutter,
_1502: (x0,x1) => x0.didCreateEngineInitializer(x1),
_1503: (x0,x1,x2) => x0.call(x1,x2),
_1504: () => globalThis.Promise,
_1505: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1505(f,arguments.length,x0,x1) }),
_1508: x0 => x0.length,
_1584: (x0,x1,x2,x3,x4,x5,x6,x7) => ({apiKey: x0,authDomain: x1,databaseURL: x2,projectId: x3,storageBucket: x4,messagingSenderId: x5,measurementId: x6,appId: x7}),
_1585: (x0,x1) => globalThis.firebase_core.initializeApp(x0,x1),
_1586: x0 => globalThis.firebase_core.getApp(x0),
_1587: () => globalThis.firebase_core.getApp(),
_1590: () => globalThis.firebase_core.SDK_VERSION,
_1597: x0 => x0.apiKey,
_1599: x0 => x0.authDomain,
_1601: x0 => x0.databaseURL,
_1603: x0 => x0.projectId,
_1605: x0 => x0.storageBucket,
_1607: x0 => x0.messagingSenderId,
_1609: x0 => x0.measurementId,
_1611: x0 => x0.appId,
_1613: x0 => x0.name,
_1614: x0 => x0.options,
_1615: (x0,x1,x2) => ({errorMap: x0,persistence: x1,popupRedirectResolver: x2}),
_1631: x0 => globalThis.firebase_auth.OAuthProvider.credentialFromResult(x0),
_1632: x0 => globalThis.firebase_auth.OAuthProvider.credentialFromError(x0),
_1654: (x0,x1) => globalThis.firebase_auth.initializeAuth(x0,x1),
_1655: () => globalThis.firebase_auth.debugErrorMap,
_1659: () => globalThis.firebase_auth.browserSessionPersistence,
_1661: () => globalThis.firebase_auth.browserLocalPersistence,
_1663: () => globalThis.firebase_auth.indexedDBLocalPersistence,
_1667: (x0,x1) => globalThis.firebase_auth.connectAuthEmulator(x0,x1),
_1670: x0 => globalThis.firebase_auth.getAdditionalUserInfo(x0),
_1680: (x0,x1,x2) => globalThis.firebase_auth.signInWithEmailAndPassword(x0,x1,x2),
_1702: x0 => globalThis.firebase_auth.multiFactor(x0),
_1703: (x0,x1) => globalThis.firebase_auth.getMultiFactorResolver(x0,x1),
_1705: x0 => x0.currentUser,
_1713: x0 => x0.signOut(),
_1720: x0 => x0.displayName,
_1721: x0 => x0.email,
_1722: x0 => x0.phoneNumber,
_1723: x0 => x0.photoURL,
_1724: x0 => x0.providerId,
_1725: x0 => x0.uid,
_1726: x0 => x0.emailVerified,
_1727: x0 => x0.isAnonymous,
_1728: x0 => x0.providerData,
_1729: x0 => x0.refreshToken,
_1730: x0 => x0.tenantId,
_1731: x0 => x0.metadata,
_1736: x0 => x0.toJSON(),
_1738: x0 => x0.providerId,
_1739: x0 => x0.signInMethod,
_1740: x0 => x0.accessToken,
_1741: x0 => x0.idToken,
_1742: x0 => x0.secret,
_1769: x0 => x0.creationTime,
_1770: x0 => x0.lastSignInTime,
_1775: x0 => x0.code,
_1777: x0 => x0.message,
_1789: x0 => x0.email,
_1790: x0 => x0.phoneNumber,
_1791: x0 => x0.tenantId,
_1812: x0 => x0.user,
_1815: x0 => x0.providerId,
_1816: x0 => x0.profile,
_1817: x0 => x0.username,
_1818: x0 => x0.isNewUser,
_1821: () => globalThis.firebase_auth.browserPopupRedirectResolver,
_1827: x0 => x0.displayName,
_1828: x0 => x0.enrollmentTime,
_1829: x0 => x0.factorId,
_1830: x0 => x0.uid,
_1832: x0 => x0.hints,
_1833: x0 => x0.session,
_1835: x0 => x0.phoneNumber,
_1847: (x0,x1) => x0.getItem(x1),
_1854: (x0,x1) => x0.createElement(x1),
_1861: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1861(f,arguments.length,x0) }),
_1862: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1862(f,arguments.length,x0) }),
_1863: (x0,x1,x2) => x0.onAuthStateChanged(x1,x2),
_1864: x0 => x0.call(),
_1865: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1865(f,arguments.length,x0) }),
_1866: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1866(f,arguments.length,x0) }),
_1867: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1867(f,arguments.length,x0) }),
_1868: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1868(f,arguments.length,x0) }),
_1869: (x0,x1,x2) => x0.onIdTokenChanged(x1,x2),
_1875: (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6,x7,x8,x9),
_1876: (x0,x1) => new firebase_firestore.GeoPoint(x0,x1),
_1878: x0 => globalThis.firebase_firestore.Bytes.fromUint8Array(x0),
_1881: x0 => globalThis.firebase_firestore.Timestamp.fromMillis(x0),
_1888: (x0,x1) => ({includeMetadataChanges: x0,source: x1}),
_1889: x0 => ({source: x0}),
_1891: x0 => ({serverTimestamps: x0}),
_1892: (x0,x1) => globalThis.firebase_firestore.getFirestore(x0,x1),
_1893: (x0,x1,x2) => globalThis.firebase_firestore.initializeFirestore(x0,x1,x2),
_1901: (x0,x1) => globalThis.firebase_firestore.collection(x0,x1),
_1907: (x0,x1) => globalThis.firebase_firestore.doc(x0,x1),
_1908: () => globalThis.firebase_firestore.documentId(),
_1912: x0 => globalThis.firebase_firestore.getDoc(x0),
_1913: x0 => globalThis.firebase_firestore.getDocFromCache(x0),
_1914: x0 => globalThis.firebase_firestore.getDocFromServer(x0),
_1915: x0 => globalThis.firebase_firestore.getDocs(x0),
_1916: x0 => globalThis.firebase_firestore.getDocsFromCache(x0),
_1917: x0 => globalThis.firebase_firestore.getDocsFromServer(x0),
_1919: x0 => globalThis.firebase_firestore.limit(x0),
_1920: x0 => globalThis.firebase_firestore.limitToLast(x0),
_1923: (x0,x1,x2,x3) => globalThis.firebase_firestore.onSnapshot(x0,x1,x2,x3),
_1925: (x0,x1) => globalThis.firebase_firestore.orderBy(x0,x1),
_1926: x0 => globalThis.firebase_firestore.memoryLocalCache(x0),
_1929: x0 => globalThis.firebase_firestore.persistentLocalCache(x0),
_1932: (x0,x1) => globalThis.firebase_firestore.query(x0,x1),
_1943: (x0,x1,x2) => globalThis.firebase_firestore.where(x0,x1,x2),
_1944: () => globalThis.firebase_firestore.or,
_1945: () => globalThis.firebase_firestore.and,
_1955: x0 => x0.path,
_1958: () => globalThis.firebase_firestore.GeoPoint,
_1959: x0 => x0.latitude,
_1960: x0 => x0.longitude,
_1962: () => globalThis.firebase_firestore.Bytes,
_1964: x0 => x0.toUint8Array(),
_1966: x0 => x0.type,
_1968: x0 => x0.doc,
_1970: x0 => x0.oldIndex,
_1972: x0 => x0.newIndex,
_1974: () => globalThis.firebase_firestore.DocumentReference,
_1978: x0 => x0.path,
_1989: x0 => x0.metadata,
_1990: x0 => x0.ref,
_1991: (x0,x1) => x0.data(x1),
_1999: x0 => x0.docs,
_2001: x0 => x0.metadata,
_2010: () => globalThis.firebase_firestore.Timestamp,
_2011: x0 => x0.seconds,
_2012: x0 => x0.nanoseconds,
_2049: x0 => x0.hasPendingWrites,
_2051: x0 => x0.fromCache,
_2058: x0 => x0.source,
_2063: () => globalThis.firebase_firestore.startAfter,
_2064: () => globalThis.firebase_firestore.startAt,
_2065: () => globalThis.firebase_firestore.endBefore,
_2066: () => globalThis.firebase_firestore.endAt,
_2083: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2083(f,arguments.length,x0) }),
_2084: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2084(f,arguments.length,x0) }),
_2085: (x0,x1,x2) => globalThis.firebase_firestore.onSnapshot(x0,x1,x2),
_2086: (x0,x1) => globalThis.firebase_firestore.setDoc(x0,x1),
_2087: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2087(f,arguments.length,x0) }),
_2088: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2088(f,arguments.length,x0) }),
_2090: x0 => globalThis.firebase_firestore.doc(x0),
_2091: x0 => x0.docChanges(),
_2095: () => globalThis.firebase_firestore.getFirestore(),
_2096: x0 => ({cacheSizeBytes: x0}),
_2098: (x0,x1,x2,x3) => ({ignoreUndefinedProperties: x0,experimentalForceLongPolling: x1,experimentalAutoDetectLongPolling: x2,localCache: x3}),
_2101: x0 => new firebase_firestore.FieldPath(x0),
_2102: (x0,x1) => new firebase_firestore.FieldPath(x0,x1),
_2103: (x0,x1,x2) => new firebase_firestore.FieldPath(x0,x1,x2),
_2104: (x0,x1,x2,x3) => new firebase_firestore.FieldPath(x0,x1,x2,x3),
_2105: (x0,x1,x2,x3,x4) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4),
_2106: (x0,x1,x2,x3,x4,x5) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5),
_2107: (x0,x1,x2,x3,x4,x5,x6) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6),
_2108: (x0,x1,x2,x3,x4,x5,x6,x7) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6,x7),
_2109: (x0,x1,x2,x3,x4,x5,x6,x7,x8) => new firebase_firestore.FieldPath(x0,x1,x2,x3,x4,x5,x6,x7,x8),
_2110: f => finalizeWrapper(f, function() { return dartInstance.exports._2110(f,arguments.length) }),
_2111: (x0,x1) => x0.debug(x1),
_2112: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2112(f,arguments.length,x0) }),
_2113: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._2113(f,arguments.length,x0,x1) }),
_2114: (x0,x1) => ({createScript: x0,createScriptURL: x1}),
_2115: (x0,x1,x2) => x0.createPolicy(x1,x2),
_2116: (x0,x1) => x0.createScriptURL(x1),
_2117: (x0,x1,x2) => x0.createScript(x1,x2),
_2118: (x0,x1) => x0.appendChild(x1),
_2119: (x0,x1) => x0.appendChild(x1),
_2120: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2120(f,arguments.length,x0) }),
_2131: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
_2140: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
_2143: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_2169: x0 => new Array(x0),
_2172: (o, c) => o instanceof c,
_2176: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2176(f,arguments.length,x0) }),
_2177: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2177(f,arguments.length,x0) }),
_2202: (decoder, codeUnits) => decoder.decode(codeUnits),
_2203: () => new TextDecoder("utf-8", {fatal: true}),
_2204: () => new TextDecoder("utf-8", {fatal: false}),
_2205: v => v.toString(),
_2206: (d, digits) => d.toFixed(digits),
_2210: x0 => new WeakRef(x0),
_2211: x0 => x0.deref(),
_2217: Date.now,
_2219: s => new Date(s * 1000).getTimezoneOffset() * 60 ,
_2220: s => {
      if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
        return NaN;
      }
      return parseFloat(s);
    },
_2221: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_2222: () => typeof dartUseDateNowForTicks !== "undefined",
_2223: () => 1000 * performance.now(),
_2224: () => Date.now(),
_2225: () => {
      // On browsers return `globalThis.location.href`
      if (globalThis.location != null) {
        return globalThis.location.href;
      }
      return null;
    },
_2226: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
_2227: () => new WeakMap(),
_2228: (map, o) => map.get(o),
_2229: (map, o, v) => map.set(o, v),
_2230: () => globalThis.WeakRef,
_2241: s => JSON.stringify(s),
_2242: s => printToConsole(s),
_2243: a => a.join(''),
_2244: (o, a, b) => o.replace(a, b),
_2246: (s, t) => s.split(t),
_2247: s => s.toLowerCase(),
_2248: s => s.toUpperCase(),
_2249: s => s.trim(),
_2250: s => s.trimLeft(),
_2251: s => s.trimRight(),
_2253: (s, p, i) => s.indexOf(p, i),
_2254: (s, p, i) => s.lastIndexOf(p, i),
_2255: (s) => s.replace(/\$/g, "$$$$"),
_2256: Object.is,
_2257: s => s.toUpperCase(),
_2258: s => s.toLowerCase(),
_2259: (a, i) => a.push(i),
_2263: a => a.pop(),
_2264: (a, i) => a.splice(i, 1),
_2266: (a, s) => a.join(s),
_2267: (a, s, e) => a.slice(s, e),
_2269: (a, b) => a == b ? 0 : (a > b ? 1 : -1),
_2270: a => a.length,
_2272: (a, i) => a[i],
_2273: (a, i, v) => a[i] = v,
_2275: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_2276: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_2277: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_2278: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_2279: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_2280: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_2281: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_2282: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_2284: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
_2285: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_2286: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_2287: (t, s) => t.set(s),
_2289: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_2291: o => o.buffer,
_2292: o => o.byteOffset,
_2293: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_2294: (b, o) => new DataView(b, o),
_2295: (b, o, l) => new DataView(b, o, l),
_2296: Function.prototype.call.bind(DataView.prototype.getUint8),
_2297: Function.prototype.call.bind(DataView.prototype.setUint8),
_2298: Function.prototype.call.bind(DataView.prototype.getInt8),
_2299: Function.prototype.call.bind(DataView.prototype.setInt8),
_2300: Function.prototype.call.bind(DataView.prototype.getUint16),
_2301: Function.prototype.call.bind(DataView.prototype.setUint16),
_2302: Function.prototype.call.bind(DataView.prototype.getInt16),
_2303: Function.prototype.call.bind(DataView.prototype.setInt16),
_2304: Function.prototype.call.bind(DataView.prototype.getUint32),
_2305: Function.prototype.call.bind(DataView.prototype.setUint32),
_2306: Function.prototype.call.bind(DataView.prototype.getInt32),
_2307: Function.prototype.call.bind(DataView.prototype.setInt32),
_2310: Function.prototype.call.bind(DataView.prototype.getBigInt64),
_2311: Function.prototype.call.bind(DataView.prototype.setBigInt64),
_2312: Function.prototype.call.bind(DataView.prototype.getFloat32),
_2313: Function.prototype.call.bind(DataView.prototype.setFloat32),
_2314: Function.prototype.call.bind(DataView.prototype.getFloat64),
_2315: Function.prototype.call.bind(DataView.prototype.setFloat64),
_2316: (x0,x1) => x0.getRandomValues(x1),
_2317: x0 => new Uint8Array(x0),
_2318: () => globalThis.crypto,
_2329: (o, t) => o instanceof t,
_2331: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2331(f,arguments.length,x0) }),
_2332: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2332(f,arguments.length,x0) }),
_2333: o => Object.keys(o),
_2334: (ms, c) =>
              setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
_2335: (handle) => clearTimeout(handle),
_2336: (ms, c) =>
          setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
_2337: (handle) => clearInterval(handle),
_2338: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_2339: () => Date.now(),
_2364: x0 => x0.getReader(),
_2368: (x0,x1) => x0.cancel(x1),
_2369: x0 => x0.read(),
_2372: x0 => x0.value,
_2374: x0 => x0.done,
_2377: (x0,x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11) => ({method: x0,headers: x1,body: x2,mode: x3,credentials: x4,cache: x5,redirect: x6,referrer: x7,referrerPolicy: x8,integrity: x9,keepalive: x10,signal: x11}),
_2379: (x0,x1) => x0.method = x1,
_2392: (x0,x1) => x0.redirect = x1,
_2405: (x0,x1) => globalThis.fetch(x0,x1),
_2406: () => new AbortController(),
_2407: x0 => x0.abort(),
_2408: (x0,x1) => x0.get(x1),
_2409: (x0,x1) => x0.get(x1),
_2410: (x0,x1) => x0.get(x1),
_2434: x0 => new Headers(x0),
_2437: x0 => x0.entries(),
_2456: x0 => x0.body,
_2458: x0 => x0.headers,
_2460: x0 => x0.redirected,
_2461: x0 => x0.status,
_2462: x0 => x0.statusText,
_2463: x0 => x0.type,
_2464: x0 => x0.url,
_2478: () => new XMLHttpRequest(),
_2479: (x0,x1,x2,x3) => x0.open(x1,x2,x3),
_2480: (x0,x1,x2) => x0.setRequestHeader(x1,x2),
_2481: (x0,x1) => x0.send(x1),
_2482: x0 => x0.abort(),
_2483: x0 => x0.getAllResponseHeaders(),
_2490: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2490(f,arguments.length,x0) }),
_2491: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._2491(f,arguments.length,x0) }),
_2506: x0 => x0.signal,
_2508: x0 => x0.trustedTypes,
_2510: (x0,x1) => x0.text = x1,
_2527: (s, m) => {
          try {
            return new RegExp(s, m);
          } catch (e) {
            return String(e);
          }
        },
_2528: (x0,x1) => x0.exec(x1),
_2529: (x0,x1) => x0.test(x1),
_2530: (x0,x1) => x0.exec(x1),
_2531: (x0,x1) => x0.exec(x1),
_2532: x0 => x0.pop(),
_2536: (x0,x1,x2) => x0[x1] = x2,
_2538: o => o === undefined,
_2539: o => typeof o === 'boolean',
_2540: o => typeof o === 'number',
_2542: o => typeof o === 'string',
_2545: o => o instanceof Int8Array,
_2546: o => o instanceof Uint8Array,
_2547: o => o instanceof Uint8ClampedArray,
_2548: o => o instanceof Int16Array,
_2549: o => o instanceof Uint16Array,
_2550: o => o instanceof Int32Array,
_2551: o => o instanceof Uint32Array,
_2552: o => o instanceof Float32Array,
_2553: o => o instanceof Float64Array,
_2554: o => o instanceof ArrayBuffer,
_2555: o => o instanceof DataView,
_2556: o => o instanceof Array,
_2557: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_2559: o => {
            const proto = Object.getPrototypeOf(o);
            return proto === Object.prototype || proto === null;
          },
_2560: o => o instanceof RegExp,
_2561: (l, r) => l === r,
_2562: o => o,
_2563: o => o,
_2564: o => o,
_2565: b => !!b,
_2566: o => o.length,
_2569: (o, i) => o[i],
_2570: f => f.dartFunction,
_2571: l => arrayFromDartList(Int8Array, l),
_2572: (data, length) => {
          const jsBytes = new Uint8Array(length);
          const getByte = dartInstance.exports.$uint8ListGet;
          for (let i = 0; i < length; i++) {
            jsBytes[i] = getByte(data, i);
          }
          return jsBytes;
        },
_2573: l => arrayFromDartList(Uint8ClampedArray, l),
_2574: l => arrayFromDartList(Int16Array, l),
_2575: l => arrayFromDartList(Uint16Array, l),
_2576: l => arrayFromDartList(Int32Array, l),
_2577: l => arrayFromDartList(Uint32Array, l),
_2578: l => arrayFromDartList(Float32Array, l),
_2579: l => arrayFromDartList(Float64Array, l),
_2580: (data, length) => {
          const read = dartInstance.exports.$byteDataGetUint8;
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, read(data, i));
          }
          return view;
        },
_2581: l => arrayFromDartList(Array, l),
_2582:       (s, length) => {
        if (length == 0) return '';

        const read = dartInstance.exports.$stringRead1;
        let result = '';
        let index = 0;
        const chunkLength = Math.min(length - index, 500);
        let array = new Array(chunkLength);
        while (index < length) {
          const newChunkLength = Math.min(length - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(s, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      }
      ,
_2583:     (s, length) => {
      if (length == 0) return '';

      const read = dartInstance.exports.$stringRead2;
      let result = '';
      let index = 0;
      const chunkLength = Math.min(length - index, 500);
      let array = new Array(chunkLength);
      while (index < length) {
        const newChunkLength = Math.min(length - index, 500);
        for (let i = 0; i < newChunkLength; i++) {
          array[i] = read(s, index++);
        }
        if (newChunkLength < chunkLength) {
          array = array.slice(0, newChunkLength);
        }
        result += String.fromCharCode(...array);
      }
      return result;
    }
    ,
_2584:     (s) => {
      let length = s.length;
      let range = 0;
      for (let i = 0; i < length; i++) {
        range |= s.codePointAt(i);
      }
      const exports = dartInstance.exports;
      if (range < 256) {
        if (length <= 10) {
          if (length == 1) {
            return exports.$stringAllocate1_1(s.codePointAt(0));
          }
          if (length == 2) {
            return exports.$stringAllocate1_2(s.codePointAt(0), s.codePointAt(1));
          }
          if (length == 3) {
            return exports.$stringAllocate1_3(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2));
          }
          if (length == 4) {
            return exports.$stringAllocate1_4(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3));
          }
          if (length == 5) {
            return exports.$stringAllocate1_5(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4));
          }
          if (length == 6) {
            return exports.$stringAllocate1_6(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5));
          }
          if (length == 7) {
            return exports.$stringAllocate1_7(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6));
          }
          if (length == 8) {
            return exports.$stringAllocate1_8(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7));
          }
          if (length == 9) {
            return exports.$stringAllocate1_9(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8));
          }
          if (length == 10) {
            return exports.$stringAllocate1_10(s.codePointAt(0), s.codePointAt(1), s.codePointAt(2), s.codePointAt(3), s.codePointAt(4), s.codePointAt(5), s.codePointAt(6), s.codePointAt(7), s.codePointAt(8), s.codePointAt(9));
          }
        }
        const dartString = exports.$stringAllocate1(length);
        const write = exports.$stringWrite1;
        for (let i = 0; i < length; i++) {
          write(dartString, i, s.codePointAt(i));
        }
        return dartString;
      } else {
        const dartString = exports.$stringAllocate2(length);
        const write = exports.$stringWrite2;
        for (let i = 0; i < length; i++) {
          write(dartString, i, s.charCodeAt(i));
        }
        return dartString;
      }
    }
    ,
_2585: () => ({}),
_2586: () => [],
_2587: l => new Array(l),
_2588: () => globalThis,
_2589: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_2590: (o, p) => p in o,
_2591: (o, p) => o[p],
_2592: (o, p, v) => o[p] = v,
_2593: (o, m, a) => o[m].apply(o, a),
_2595: o => String(o),
_2596: (p, s, f) => p.then(s, f),
_2597: s => {
      if (/[[\]{}()*+?.\\^$|]/.test(s)) {
          s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
      }
      return s;
    },
_2600: x0 => x0.index,
_2601: x0 => x0.groups,
_2602: x0 => x0.length,
_2604: (x0,x1) => x0[x1],
_2605: (x0,x1) => x0.exec(x1),
_2607: x0 => x0.flags,
_2608: x0 => x0.multiline,
_2609: x0 => x0.ignoreCase,
_2610: x0 => x0.unicode,
_2611: x0 => x0.dotAll,
_2612: (x0,x1) => x0.lastIndex = x1,
_2614: (o, p) => o[p],
_2615: (o, p, v) => o[p] = v,
_2616: (o, p) => delete o[p],
_2620: (x0,x1) => x0.bind(x1),
_2623: x0 => x0.next,
_2630: (x0,x1) => x0.call(x1),
_2631: (x0,x1,x2) => x0.call(x1,x2),
_2641: x0 => x0.done,
_2643: x0 => x0.value,
_2757: (x0,x1) => x0.withCredentials = x1,
_2759: x0 => x0.responseURL,
_2760: x0 => x0.status,
_2761: x0 => x0.statusText,
_2763: (x0,x1) => x0.responseType = x1,
_2764: x0 => x0.response,
_4091: (x0,x1) => x0.type = x1,
_4099: (x0,x1) => x0.crossOrigin = x1,
_4101: (x0,x1) => x0.text = x1,
_4576: () => globalThis.window,
_4619: x0 => x0.document,
_4622: x0 => x0.location,
_4641: x0 => x0.navigator,
_4903: x0 => x0.trustedTypes,
_4904: x0 => x0.sessionStorage,
_4920: x0 => x0.hostname,
_5019: x0 => x0.maxTouchPoints,
_5025: x0 => x0.deviceMemory,
_5026: x0 => x0.appCodeName,
_5027: x0 => x0.appName,
_5028: x0 => x0.appVersion,
_5029: x0 => x0.platform,
_5030: x0 => x0.product,
_5031: x0 => x0.productSub,
_5032: x0 => x0.userAgent,
_5033: x0 => x0.vendor,
_5034: x0 => x0.vendorSub,
_5036: x0 => x0.language,
_5037: x0 => x0.languages,
_5043: x0 => x0.hardwareConcurrency,
_7341: x0 => x0.baseURI,
_7358: () => globalThis.document,
_7453: x0 => x0.head,
_14307: () => globalThis.console,
_14338: x0 => x0.name,
_14339: x0 => x0.message,
_14340: x0 => x0.code,
_14342: x0 => x0.customData
    };

    const baseImports = {
        dart2wasm: dart2wasm,


        Math: Math,
        Date: Date,
        Object: Object,
        Array: Array,
        Reflect: Reflect,
    };

    const jsStringPolyfill = {
        "charCodeAt": (s, i) => s.charCodeAt(i),
        "compare": (s1, s2) => {
            if (s1 < s2) return -1;
            if (s1 > s2) return 1;
            return 0;
        },
        "concat": (s1, s2) => s1 + s2,
        "equals": (s1, s2) => s1 === s2,
        "fromCharCode": (i) => String.fromCharCode(i),
        "length": (s) => s.length,
        "substring": (s, a, b) => s.substring(a, b),
    };

    dartInstance = await WebAssembly.instantiate(await modulePromise, {
        ...baseImports,
        ...(await importObjectPromise),
        "wasm:js-string": jsStringPolyfill,
    });

    return dartInstance;
}

// Call the main function for the instantiated module
// `moduleInstance` is the instantiated dart2wasm module
// `args` are any arguments that should be passed into the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

