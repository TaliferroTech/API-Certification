var le=function(t){let e=[],n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},He=function(t){let e=[],n=0,s=0;for(;n<t.length;){let r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){let i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){let i=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{let i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},ue={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){let i=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,h=i>>2,f=(i&3)<<4|a>>4,E=(a&15)<<2|l>>6,D=l&63;c||(D=64,o||(E=64)),s.push(n[h],n[f],n[E],n[D])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(le(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):He(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();let n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){let i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;let l=r<t.length?n[t.charAt(r)]:64;++r;let f=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||l==null||f==null)throw new R;let E=i<<2|a>>4;if(s.push(E),l!==64){let D=a<<4&240|l>>2;if(s.push(D),f!==64){let $e=l<<6&192|f;s.push($e)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},R=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Fe=function(t){let e=le(t);return ue.encodeByteArray(e,!0)},P=function(t){return Fe(t).replace(/\./g,"")},Ue=function(t){try{return ue.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function je(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Ve=()=>je().__FIREBASE_DEFAULTS__,ze=()=>{if(typeof process>"u"||typeof process.env>"u")return;let t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},We=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=t&&Ue(t[1]);return e&&JSON.parse(e)},fe=()=>{try{return Ve()||ze()||We()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ge=t=>{var e,n;return(n=(e=fe())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},he=t=>{let e=Ge(t);if(!e)return;let n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},$=()=>{var t;return(t=fe())===null||t===void 0?void 0:t.config};var C=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}};function de(){try{return typeof indexedDB=="object"}catch{return!1}}function pe(){return new Promise((t,e)=>{try{let n=!0,s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}var Je="FirebaseError",p=class t extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=Je,Object.setPrototypeOf(this,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,w.prototype.create)}},w=class{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){let s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?qe(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new p(r,a,s)}};function qe(t,e){return t.replace(Ke,(n,s)=>{let r=e[s];return r!=null?String(r):`<${s}?>`})}var Ke=/\{\$([^}]+)}/g;function S(t,e){if(t===e)return!0;let n=Object.keys(t),s=Object.keys(e);for(let r of n){if(!s.includes(r))return!1;let i=t[r],o=e[r];if(ce(i)&&ce(o)){if(!S(i,o))return!1}else if(i!==o)return!1}for(let r of s)if(!n.includes(r))return!1;return!0}function ce(t){return t!==null&&typeof t=="object"}var _n=4*60*60*1e3;function O(t){return t&&t._delegate?t._delegate:t}var m=class{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var y="[DEFAULT]";var H=class{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){let s=new C;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;let s=this.normalizeInstanceIdentifier(e?.identifier),r=(n=e?.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xe(e))try{this.getOrInitializeService({instanceIdentifier:y})}catch{}for(let[n,s]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(n);try{let i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=y){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=y){return this.instances.has(e)}getOptions(e=y){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(let[i,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){var s;let r=this.normalizeInstanceIdentifier(n),i=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;i.add(e),this.onInitCallbacks.set(r,i);let o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){let s=this.onInitCallbacks.get(n);if(s)for(let r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Ye(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=y){return this.component?this.component.multipleInstances?e:y:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Ye(t){return t===y?void 0:t}function Xe(t){return t.instantiationMode==="EAGER"}var T=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let n=new H(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}};var Ze=[],u;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(u||(u={}));var Qe={debug:u.DEBUG,verbose:u.VERBOSE,info:u.INFO,warn:u.WARN,error:u.ERROR,silent:u.SILENT},et=u.INFO,tt={[u.DEBUG]:"log",[u.VERBOSE]:"log",[u.INFO]:"info",[u.WARN]:"warn",[u.ERROR]:"error"},nt=(t,e,...n)=>{if(e<t.logLevel)return;let s=new Date().toISOString(),r=tt[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},x=class{constructor(e){this.name=e,this._logLevel=et,this._logHandler=nt,this._userLogHandler=null,Ze.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in u))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Qe[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,u.DEBUG,...e),this._logHandler(this,u.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,u.VERBOSE,...e),this._logHandler(this,u.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,u.INFO,...e),this._logHandler(this,u.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,u.WARN,...e),this._logHandler(this,u.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,u.ERROR,...e),this._logHandler(this,u.ERROR,...e)}};var rt=(t,e)=>e.some(n=>t instanceof n),me,ge;function st(){return me||(me=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function it(){return ge||(ge=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var be=new WeakMap,U=new WeakMap,_e=new WeakMap,F=new WeakMap,V=new WeakMap;function ot(t){let e=new Promise((n,s)=>{let r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(d(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&be.set(n,t)}).catch(()=>{}),V.set(e,t),e}function at(t){if(U.has(t))return;let e=new Promise((n,s)=>{let r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});U.set(t,e)}var j={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return U.get(t);if(e==="objectStoreNames")return t.objectStoreNames||_e.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return d(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Ee(t){j=t(j)}function ct(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){let s=t.call(N(this),e,...n);return _e.set(s,e.sort?e.sort():[e]),d(s)}:it().includes(t)?function(...e){return t.apply(N(this),e),d(be.get(this))}:function(...e){return d(t.apply(N(this),e))}}function lt(t){return typeof t=="function"?ct(t):(t instanceof IDBTransaction&&at(t),rt(t,st())?new Proxy(t,j):t)}function d(t){if(t instanceof IDBRequest)return ot(t);if(F.has(t))return F.get(t);let e=lt(t);return e!==t&&(F.set(t,e),V.set(e,t)),e}var N=t=>V.get(t);function ve(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){let o=indexedDB.open(t,e),a=d(o);return s&&o.addEventListener("upgradeneeded",c=>{s(d(o.result),c.oldVersion,c.newVersion,d(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var ut=["get","getKey","getAll","getAllKeys","count"],ft=["put","add","delete","clear"],z=new Map;function ye(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(z.get(e))return z.get(e);let n=e.replace(/FromIndex$/,""),s=e!==n,r=ft.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||ut.includes(n)))return;let i=async function(o,...a){let c=this.transaction(o,r?"readwrite":"readonly"),l=c.store;return s&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),r&&c.done]))[0]};return z.set(e,i),i}Ee(t=>({...t,get:(e,n,s)=>ye(e,n)||t.get(e,n,s),has:(e,n)=>!!ye(e,n)||t.has(e,n)}));var G=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ht(n)){let s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}};function ht(t){let e=t.getComponent();return e?.type==="VERSION"}var J="@firebase/app",we="0.9.27";var v=new x("@firebase/app"),dt="@firebase/app-compat",pt="@firebase/analytics-compat",mt="@firebase/analytics",gt="@firebase/app-check-compat",bt="@firebase/app-check",_t="@firebase/auth",Et="@firebase/auth-compat",yt="@firebase/database",vt="@firebase/database-compat",wt="@firebase/functions",It="@firebase/functions-compat",At="@firebase/installations",Dt="@firebase/installations-compat",Ct="@firebase/messaging",St="@firebase/messaging-compat",Ot="@firebase/performance",Tt="@firebase/performance-compat",xt="@firebase/remote-config",Nt="@firebase/remote-config-compat",kt="@firebase/storage",Bt="@firebase/storage-compat",Lt="@firebase/firestore",Mt="@firebase/firestore-compat",Rt="firebase";var q="[DEFAULT]",Pt={[J]:"fire-core",[dt]:"fire-core-compat",[mt]:"fire-analytics",[pt]:"fire-analytics-compat",[bt]:"fire-app-check",[gt]:"fire-app-check-compat",[_t]:"fire-auth",[Et]:"fire-auth-compat",[yt]:"fire-rtdb",[vt]:"fire-rtdb-compat",[wt]:"fire-fn",[It]:"fire-fn-compat",[At]:"fire-iid",[Dt]:"fire-iid-compat",[Ct]:"fire-fcm",[St]:"fire-fcm-compat",[Ot]:"fire-perf",[Tt]:"fire-perf-compat",[xt]:"fire-rc",[Nt]:"fire-rc-compat",[kt]:"fire-gcs",[Bt]:"fire-gcs-compat",[Lt]:"fire-fst",[Mt]:"fire-fst-compat","fire-js":"fire-js",[Rt]:"fire-js-all"};var k=new Map,K=new Map;function $t(t,e){try{t.container.addComponent(e)}catch(n){v.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function I(t){let e=t.name;if(K.has(e))return v.debug(`There were multiple attempts to register component ${e}.`),!1;K.set(e,t);for(let n of k.values())$t(n,t);return!0}function Ce(t,e){let n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}var Ht={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},g=new w("app","Firebase",Ht);var Y=class{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new m("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw g.create("app-deleted",{appName:this._name})}};function Q(t,e={}){let n=t;typeof e!="object"&&(e={name:e});let s=Object.assign({name:q,automaticDataCollectionEnabled:!1},e),r=s.name;if(typeof r!="string"||!r)throw g.create("bad-app-name",{appName:String(r)});if(n||(n=$()),!n)throw g.create("no-options");let i=k.get(r);if(i){if(S(n,i.options)&&S(s,i.config))return i;throw g.create("duplicate-app",{appName:r})}let o=new T(r);for(let c of K.values())o.addComponent(c);let a=new Y(n,s,o);return k.set(r,a),a}function Se(t=q){let e=k.get(t);if(!e&&t===q&&$())return Q();if(!e)throw g.create("no-app",{appName:t});return e}function b(t,e,n){var s;let r=(s=Pt[t])!==null&&s!==void 0?s:t;n&&(r+=`-${n}`);let i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){let a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),v.warn(a.join(" "));return}I(new m(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}var Ft="firebase-heartbeat-database",Ut=1,A="firebase-heartbeat-store",W=null;function Oe(){return W||(W=ve(Ft,Ut,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(A)}catch(n){console.warn(n)}}}}).catch(t=>{throw g.create("idb-open",{originalErrorMessage:t.message})})),W}async function jt(t){try{let n=(await Oe()).transaction(A),s=await n.objectStore(A).get(Te(t));return await n.done,s}catch(e){if(e instanceof p)v.warn(e.message);else{let n=g.create("idb-get",{originalErrorMessage:e?.message});v.warn(n.message)}}}async function Ie(t,e){try{let s=(await Oe()).transaction(A,"readwrite");await s.objectStore(A).put(e,Te(t)),await s.done}catch(n){if(n instanceof p)v.warn(n.message);else{let s=g.create("idb-set",{originalErrorMessage:n?.message});v.warn(s.message)}}}function Te(t){return`${t.name}!${t.options.appId}`}var Vt=1024,zt=30*24*60*60*1e3,X=class{constructor(e){this.container=e,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new Z(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,n;let r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ae();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)))return this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let a=new Date(o.date).valueOf();return Date.now()-a<=zt}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=Ae(),{heartbeatsToSend:s,unsentEntries:r}=Wt(this._heartbeatsCache.heartbeats),i=P(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}};function Ae(){return new Date().toISOString().substring(0,10)}function Wt(t,e=Vt){let n=[],s=t.slice();for(let r of t){let i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),De(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),De(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}var Z=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return de()?pe().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await jt(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){let r=await this.read();return Ie(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){let r=await this.read();return Ie(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function De(t){return P(JSON.stringify({version:2,heartbeats:t})).length}function Gt(t){I(new m("platform-logger",e=>new G(e),"PRIVATE")),I(new m("heartbeat",e=>new X(e),"PRIVATE")),b(J,we,t),b(J,we,"esm2017"),b("fire-js","")}Gt("");var Jt="firebase",qt="10.8.0";b(Jt,qt,"app");var Kt="type.googleapis.com/google.protobuf.Int64Value",Yt="type.googleapis.com/google.protobuf.UInt64Value";function Be(t,e){let n={};for(let s in t)t.hasOwnProperty(s)&&(n[s]=e(t[s]));return n}function ee(t){if(t==null)return null;if(t instanceof Number&&(t=t.valueOf()),typeof t=="number"&&isFinite(t)||t===!0||t===!1||Object.prototype.toString.call(t)==="[object String]")return t;if(t instanceof Date)return t.toISOString();if(Array.isArray(t))return t.map(e=>ee(e));if(typeof t=="function"||typeof t=="object")return Be(t,e=>ee(e));throw new Error("Data cannot be encoded in JSON: "+t)}function B(t){if(t==null)return t;if(t["@type"])switch(t["@type"]){case Kt:case Yt:{let e=Number(t.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+t);return e}default:throw new Error("Data cannot be decoded from JSON: "+t)}return Array.isArray(t)?t.map(e=>B(e)):typeof t=="function"||typeof t=="object"?Be(t,e=>B(e)):t}var se="functions";var xe={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},_=class extends p{constructor(e,n,s){super(`${se}/${e}`,n||""),this.details=s}};function Xt(t){if(t>=200&&t<300)return"ok";switch(t){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Zt(t,e){let n=Xt(t),s=n,r;try{let i=e&&e.error;if(i){let o=i.status;if(typeof o=="string"){if(!xe[o])return new _("internal","internal");n=xe[o],s=o}let a=i.message;typeof a=="string"&&(s=a),r=i.details,r!==void 0&&(r=B(r))}}catch{}return n==="ok"?null:new _(n,s,r)}var te=class{constructor(e,n,s){this.auth=null,this.messaging=null,this.appCheck=null,this.auth=e.getImmediate({optional:!0}),this.messaging=n.getImmediate({optional:!0}),this.auth||e.get().then(r=>this.auth=r,()=>{}),this.messaging||n.get().then(r=>this.messaging=r,()=>{}),this.appCheck||s.get().then(r=>this.appCheck=r,()=>{})}async getAuthToken(){if(this.auth)try{let e=await this.auth.getToken();return e?.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.appCheck){let n=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return n.error?null:n.token}return null}async getContext(e){let n=await this.getAuthToken(),s=await this.getMessagingToken(),r=await this.getAppCheckToken(e);return{authToken:n,messagingToken:s,appCheckToken:r}}};var ne="us-central1";function Qt(t){let e=null;return{promise:new Promise((n,s)=>{e=setTimeout(()=>{s(new _("deadline-exceeded","deadline-exceeded"))},t)}),cancel:()=>{e&&clearTimeout(e)}}}var re=class{constructor(e,n,s,r,i=ne,o){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new te(n,s,r),this.cancelAllRequests=new Promise(a=>{this.deleteService=()=>Promise.resolve(a())});try{let a=new URL(i);this.customDomain=a.origin,this.region=ne}catch{this.customDomain=null,this.region=i}}_delete(){return this.deleteService()}_url(e){let n=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${n}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${n}.cloudfunctions.net/${e}`}};function en(t,e,n){t.emulatorOrigin=`http://${e}:${n}`}function tn(t,e,n){return s=>rn(t,e,s,n||{})}async function nn(t,e,n,s){n["Content-Type"]="application/json";let r;try{r=await s(t,{method:"POST",body:JSON.stringify(e),headers:n})}catch{return{status:0,json:null}}let i=null;try{i=await r.json()}catch{}return{status:r.status,json:i}}function rn(t,e,n,s){let r=t._url(e);return sn(t,r,n,s)}async function sn(t,e,n,s){n=ee(n);let r={data:n},i={},o=await t.contextProvider.getContext(s.limitedUseAppCheckTokens);o.authToken&&(i.Authorization="Bearer "+o.authToken),o.messagingToken&&(i["Firebase-Instance-ID-Token"]=o.messagingToken),o.appCheckToken!==null&&(i["X-Firebase-AppCheck"]=o.appCheckToken);let a=s.timeout||7e4,c=Qt(a),l=await Promise.race([nn(e,r,i,t.fetchImpl),c.promise,t.cancelAllRequests]);if(c.cancel(),!l)throw new _("cancelled","Firebase Functions instance was deleted.");let h=Zt(l.status,l.json);if(h)throw h;if(!l.json)throw new _("internal","Response is not valid JSON object.");let f=l.json.data;if(typeof f>"u"&&(f=l.json.result),typeof f>"u")throw new _("internal","Response is missing data field.");return{data:B(f)}}var Ne="@firebase/functions",ke="0.11.1";var on="auth-internal",an="app-check-internal",cn="messaging-internal";function ln(t,e){let n=(s,{instanceIdentifier:r})=>{let i=s.getProvider("app").getImmediate(),o=s.getProvider(on),a=s.getProvider(cn),c=s.getProvider(an);return new re(i,o,a,c,r,t)};I(new m(se,n,"PUBLIC").setMultipleInstances(!0)),b(Ne,ke,e),b(Ne,ke,"esm2017")}function Le(t=Se(),e=ne){let s=Ce(O(t),se).getImmediate({identifier:e}),r=he("functions");return r&&ie(s,...r),s}function ie(t,e,n){en(O(t),e,n)}function oe(t,e,n){return tn(O(t),e,n)}ln(fetch.bind(self));var un={apiKey:"AIzaSyBBa2iIUnEFhKhVHT3wcepiVEl4BOfOOYA",authDomain:"taliferro-de66f.firebaseapp.com",databaseURL:"https://taliferro-de66f.firebaseio.com",projectId:"taliferro-de66f",storageBucket:"taliferro-de66f.appspot.com",messagingSenderId:"353334442276",appId:"1:353334442276:web:45b043204cc83aa7725bb1",measurementId:"G-ZH2TKFHVZ7"},fn=Q(un),L=Le(fn);(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1")&&(console.log("connecting firebase functions emulator"),ie(L,window.location.hostname,5001));function ae(t){let e=document.cookie.split("; ");for(let n of e){let[s,r]=n.split("=");if(s===t)return r||""}return""}function Me(t,e){document.cookie=`${t}=${e}`}var hn=new URL(window.location.href);function Re(t){let e=[];for(let n of t){let s=new URL(n.href);s.protocol=="https:"&&hn.hostname!=s.hostname&&e.push(n)}return e}var M=window.gtag,Pe=document.getElementById("evaluate_api"),dn=document.getElementById("process"),pn=document.getElementById("wrapped"),mn=document.getElementById("evaluate"),gn=document.getElementById("forward"),bn=document.getElementById("back");document.addEventListener("DOMContentLoaded",()=>{Me("questionnaire_click_progress",0);let t=oe(L,"calculateScore"),e=oe(L,"emailResults");Pe.addEventListener("click",r=>{M("event","start_questionnaire",{event_category:r.type,event_label:Pe.innerText})}),dn.addEventListener("click",async r=>{r.preventDefault();try{let i=new FormData(pn),o={};for(let[h,f]of i.entries())h.toLowerCase().includes("question")&&(o[h]=f);let c=(await t({submission:o})).data,l=await e({email:i.get("email"),score:c.score,company_name:i.get("company_name"),first_name:i.get("first_name"),last_name:i.get("last_name"),message:c.message,subject:"Your API Security Results"});console.log("response (email):",l),l.data.message=="success"&&(document.getElementById("main_container").classList.remove("show_container"),document.getElementsByClassName("layer")[0].classList.remove("layer-is-visible"),document.querySelectorAll(".main_nav").forEach(function(h){var f=h.querySelectorAll(".nav-tabs li a.active");f.forEach(function(E){E.classList.remove("active")})}))}catch(i){console.log("error:",i)}}),gn.addEventListener("click",function(r){let i=parseInt(ae("questionnaire_click_progress"));i++,i==1&&(mn.style.display="none"),M("event","questionnaire_click_progress",{event_category:r.type,event_label:"questionnaire_click_progress",value:i})}),bn.addEventListener("click",r=>{let i=parseInt(ae("questionnaire_click_progress"));i--,M("event","questionnaire_click_progress",{event_category:r.type,event_label:"questionnaire_click_progress",value:i})});let n=document.getElementsByTagName("a"),s=Re(n);for(let r of s)r.rel="noopener noreferrer",r.addEventListener("click",i=>{i.preventDefault(),M("event","anchor_click",{event_category:i.type,event_label:r.innerText,value:r.href}),setTimeout(()=>{window.location.href=r.href},100)})});
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/functions/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/functions/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
