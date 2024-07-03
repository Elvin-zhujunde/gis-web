var t,i,e,s,h,n,l,o,a,r,c,u,f,d,p,w,g,v,S,_,m,b,y,W,A,O,F,E,k,T,z,M,x,C,R,D,L,G,U,j,N,I,H,P,B,$,q,V,X,Y,J,K,Q,Z,tt,it,et,st=Object.defineProperty,ht=(t,i,e)=>(((t,i,e)=>{i in t?st(t,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[i]=e})(t,"symbol"!=typeof i?i+"":i,e),e),nt=(t,i,e)=>{if(!i.has(t))throw TypeError("Cannot "+e)},lt=(t,i,e)=>(nt(t,i,"read from private field"),e?e.call(t):i.get(t)),ot=(t,i,e)=>{if(i.has(t))throw TypeError("Cannot add the same private member more than once");i instanceof WeakSet?i.add(t):i.set(t,e)},at=(t,i,e,s)=>(nt(t,i,"write to private field"),s?s.call(t,e):i.set(t,e),e),rt=(t,i,e,s)=>({set _(s){at(t,i,s,e)},get _(){return lt(t,i,s)}}),ct=(t,i,e)=>(nt(t,i,"access private method"),e);const ut="object"==typeof performance&&performance&&"function"==typeof performance.now?performance:Date,ft=new Set,dt="object"==typeof process&&process?process:{},pt=(t,i,e,s)=>{"function"==typeof dt.emitWarning?dt.emitWarning(t,i,e,s):console.error(`[${e}] ${i}: ${t}`)};let wt=globalThis.AbortController,gt=globalThis.AbortSignal;if(void 0===wt){gt=class{constructor(){ht(this,"onabort"),ht(this,"_onabort",[]),ht(this,"reason"),ht(this,"aborted",!1)}addEventListener(t,i){this._onabort.push(i)}},wt=class{constructor(){ht(this,"signal",new gt),e()}abort(t){var i,e;if(!this.signal.aborted){this.signal.reason=t,this.signal.aborted=!0;for(const i of this.signal._onabort)i(t);null==(e=(i=this.signal).onabort)||e.call(i,t)}}};let i="1"!==(null==(t=dt.env)?void 0:t.LRU_CACHE_IGNORE_AC_WARNING);const e=()=>{i&&(i=!1,pt("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.","NO_ABORT_CONTROLLER","ENOTSUP",e))}}const vt=t=>t&&t===Math.floor(t)&&t>0&&isFinite(t),St=t=>vt(t)?t<=Math.pow(2,8)?Uint8Array:t<=Math.pow(2,16)?Uint16Array:t<=Math.pow(2,32)?Uint32Array:t<=Number.MAX_SAFE_INTEGER?_t:null:null;class _t extends Array{constructor(t){super(t),this.fill(0)}}const mt=class t{constructor(e,s){if(ht(this,"heap"),ht(this,"length"),!lt(t,i))throw new TypeError("instantiate Stack using Stack.create(n)");this.heap=new s(e),this.length=0}static create(e){const s=St(e);if(!s)return[];at(t,i,!0);const h=new t(e,s);return at(t,i,!1),h}push(t){this.heap[this.length++]=t}pop(){return this.heap[--this.length]}};i=new WeakMap,ot(mt,i,!1);let bt=mt;const yt=class t{constructor(i){ot(this,O),ot(this,M),ot(this,L),ot(this,U),ot(this,N),ot(this,P),ot(this,$),ot(this,V),ot(this,Y),ot(this,K),ot(this,Z),ot(this,it),ot(this,e,void 0),ot(this,s,void 0),ot(this,h,void 0),ot(this,n,void 0),ot(this,l,void 0),ot(this,o,void 0),ht(this,"ttl"),ht(this,"ttlResolution"),ht(this,"ttlAutopurge"),ht(this,"updateAgeOnGet"),ht(this,"updateAgeOnHas"),ht(this,"allowStale"),ht(this,"noDisposeOnSet"),ht(this,"noUpdateTTL"),ht(this,"maxEntrySize"),ht(this,"sizeCalculation"),ht(this,"noDeleteOnFetchRejection"),ht(this,"noDeleteOnStaleGet"),ht(this,"allowStaleOnFetchAbort"),ht(this,"allowStaleOnFetchRejection"),ht(this,"ignoreFetchAbort"),ot(this,a,void 0),ot(this,r,void 0),ot(this,c,void 0),ot(this,u,void 0),ot(this,f,void 0),ot(this,d,void 0),ot(this,p,void 0),ot(this,w,void 0),ot(this,g,void 0),ot(this,v,void 0),ot(this,S,void 0),ot(this,_,void 0),ot(this,m,void 0),ot(this,b,void 0),ot(this,y,void 0),ot(this,W,void 0),ot(this,A,void 0),ot(this,E,(()=>{})),ot(this,k,(()=>{})),ot(this,T,(()=>{})),ot(this,z,(()=>!1)),ot(this,C,(t=>{})),ot(this,R,((t,i,e)=>{})),ot(this,D,((t,i,e,s)=>{if(e||s)throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");return 0})),ht(this,H,"LRUCache");const{max:G=0,ttl:j,ttlResolution:I=1,ttlAutopurge:B,updateAgeOnGet:q,updateAgeOnHas:X,allowStale:J,dispose:Q,disposeAfter:tt,noDisposeOnSet:et,noUpdateTTL:st,maxSize:nt=0,maxEntrySize:rt=0,sizeCalculation:ut,fetchMethod:dt,memoMethod:wt,noDeleteOnFetchRejection:gt,noDeleteOnStaleGet:_t,allowStaleOnFetchRejection:mt,allowStaleOnFetchAbort:yt,ignoreFetchAbort:Wt}=i;if(0!==G&&!vt(G))throw new TypeError("max option must be a nonnegative integer");const At=G?St(G):Array;if(!At)throw new Error("invalid max value: "+G);if(at(this,e,G),at(this,s,nt),this.maxEntrySize=rt||lt(this,s),this.sizeCalculation=ut,this.sizeCalculation){if(!lt(this,s)&&!this.maxEntrySize)throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");if("function"!=typeof this.sizeCalculation)throw new TypeError("sizeCalculation set to non-function")}if(void 0!==wt&&"function"!=typeof wt)throw new TypeError("memoMethod must be a function if defined");if(at(this,o,wt),void 0!==dt&&"function"!=typeof dt)throw new TypeError("fetchMethod must be a function if specified");if(at(this,l,dt),at(this,W,!!dt),at(this,c,new Map),at(this,u,new Array(G).fill(void 0)),at(this,f,new Array(G).fill(void 0)),at(this,d,new At(G)),at(this,p,new At(G)),at(this,w,0),at(this,g,0),at(this,v,bt.create(G)),at(this,a,0),at(this,r,0),"function"==typeof Q&&at(this,h,Q),"function"==typeof tt?(at(this,n,tt),at(this,S,[])):(at(this,n,void 0),at(this,S,void 0)),at(this,y,!!lt(this,h)),at(this,A,!!lt(this,n)),this.noDisposeOnSet=!!et,this.noUpdateTTL=!!st,this.noDeleteOnFetchRejection=!!gt,this.allowStaleOnFetchRejection=!!mt,this.allowStaleOnFetchAbort=!!yt,this.ignoreFetchAbort=!!Wt,0!==this.maxEntrySize){if(0!==lt(this,s)&&!vt(lt(this,s)))throw new TypeError("maxSize must be a positive integer if specified");if(!vt(this.maxEntrySize))throw new TypeError("maxEntrySize must be a positive integer if specified");ct(this,M,x).call(this)}if(this.allowStale=!!J,this.noDeleteOnStaleGet=!!_t,this.updateAgeOnGet=!!q,this.updateAgeOnHas=!!X,this.ttlResolution=vt(I)||0===I?I:1,this.ttlAutopurge=!!B,this.ttl=j||0,this.ttl){if(!vt(this.ttl))throw new TypeError("ttl must be a positive integer if specified");ct(this,O,F).call(this)}if(0===lt(this,e)&&0===this.ttl&&0===lt(this,s))throw new TypeError("At least one of max, maxSize, or ttl is required");if(!this.ttlAutopurge&&!lt(this,e)&&!lt(this,s)){const i="LRU_CACHE_UNBOUNDED";if((t=>!ft.has(t))(i)){ft.add(i);pt("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.","UnboundedCacheWarning",i,t)}}}static unsafeExposeInternals(t){return{starts:lt(t,m),ttls:lt(t,b),sizes:lt(t,_),keyMap:lt(t,c),keyList:lt(t,u),valList:lt(t,f),next:lt(t,d),prev:lt(t,p),get head(){return lt(t,w)},get tail(){return lt(t,g)},free:lt(t,v),isBackgroundFetch:i=>{var e;return ct(e=t,V,X).call(e,i)},backgroundFetch:(i,e,s,h)=>{var n;return ct(n=t,$,q).call(n,i,e,s,h)},moveToTail:i=>{var e;return ct(e=t,K,Q).call(e,i)},indexes:i=>{var e;return ct(e=t,L,G).call(e,i)},rindexes:i=>{var e;return ct(e=t,U,j).call(e,i)},isStale:i=>{var e;return lt(e=t,z).call(e,i)}}}get max(){return lt(this,e)}get maxSize(){return lt(this,s)}get calculatedSize(){return lt(this,r)}get size(){return lt(this,a)}get fetchMethod(){return lt(this,l)}get memoMethod(){return lt(this,o)}get dispose(){return lt(this,h)}get disposeAfter(){return lt(this,n)}getRemainingTTL(t){return lt(this,c).has(t)?Infinity:0}*entries(){for(const t of ct(this,L,G).call(this))void 0===lt(this,f)[t]||void 0===lt(this,u)[t]||ct(this,V,X).call(this,lt(this,f)[t])||(yield[lt(this,u)[t],lt(this,f)[t]])}*rentries(){for(const t of ct(this,U,j).call(this))void 0===lt(this,f)[t]||void 0===lt(this,u)[t]||ct(this,V,X).call(this,lt(this,f)[t])||(yield[lt(this,u)[t],lt(this,f)[t]])}*keys(){for(const t of ct(this,L,G).call(this)){const i=lt(this,u)[t];void 0===i||ct(this,V,X).call(this,lt(this,f)[t])||(yield i)}}*rkeys(){for(const t of ct(this,U,j).call(this)){const i=lt(this,u)[t];void 0===i||ct(this,V,X).call(this,lt(this,f)[t])||(yield i)}}*values(){for(const t of ct(this,L,G).call(this)){void 0===lt(this,f)[t]||ct(this,V,X).call(this,lt(this,f)[t])||(yield lt(this,f)[t])}}*rvalues(){for(const t of ct(this,U,j).call(this)){void 0===lt(this,f)[t]||ct(this,V,X).call(this,lt(this,f)[t])||(yield lt(this,f)[t])}}[Symbol.iterator](){return this.entries()}find(t,i={}){for(const e of ct(this,L,G).call(this)){const s=lt(this,f)[e],h=ct(this,V,X).call(this,s)?s.__staleWhileFetching:s;if(void 0!==h&&t(h,lt(this,u)[e],this))return this.get(lt(this,u)[e],i)}}forEach(t,i=this){for(const e of ct(this,L,G).call(this)){const s=lt(this,f)[e],h=ct(this,V,X).call(this,s)?s.__staleWhileFetching:s;void 0!==h&&t.call(i,h,lt(this,u)[e],this)}}rforEach(t,i=this){for(const e of ct(this,U,j).call(this)){const s=lt(this,f)[e],h=ct(this,V,X).call(this,s)?s.__staleWhileFetching:s;void 0!==h&&t.call(i,h,lt(this,u)[e],this)}}purgeStale(){let t=!1;for(const i of ct(this,U,j).call(this,{allowStale:!0}))lt(this,z).call(this,i)&&(ct(this,Z,tt).call(this,lt(this,u)[i],"expire"),t=!0);return t}info(t){const i=lt(this,c).get(t);if(void 0===i)return;const e=lt(this,f)[i],s=ct(this,V,X).call(this,e)?e.__staleWhileFetching:e;if(void 0===s)return;const h={value:s};if(lt(this,b)&&lt(this,m)){const t=lt(this,b)[i],e=lt(this,m)[i];if(t&&e){const i=t-(ut.now()-e);h.ttl=i,h.start=Date.now()}}return lt(this,_)&&(h.size=lt(this,_)[i]),h}dump(){const t=[];for(const i of ct(this,L,G).call(this,{allowStale:!0})){const e=lt(this,u)[i],s=lt(this,f)[i],h=ct(this,V,X).call(this,s)?s.__staleWhileFetching:s;if(void 0===h||void 0===e)continue;const n={value:h};if(lt(this,b)&&lt(this,m)){n.ttl=lt(this,b)[i];const t=ut.now()-lt(this,m)[i];n.start=Math.floor(Date.now()-t)}lt(this,_)&&(n.size=lt(this,_)[i]),t.unshift([e,n])}return t}load(t){this.clear();for(const[i,e]of t){if(e.start){const t=Date.now()-e.start;e.start=ut.now()-t}this.set(i,e.value,e)}}set(t,i,s={}){var l,o,r,w,_;if(void 0===i)return this.delete(t),this;const{ttl:m=this.ttl,start:E,noDisposeOnSet:z=this.noDisposeOnSet,sizeCalculation:M=this.sizeCalculation,status:x}=s;let{noUpdateTTL:L=this.noUpdateTTL}=s;const G=lt(this,D).call(this,t,i,s.size||0,M);if(this.maxEntrySize&&G>this.maxEntrySize)return x&&(x.set="miss",x.maxEntrySizeExceeded=!0),ct(this,Z,tt).call(this,t,"set"),this;let U=0===lt(this,a)?void 0:lt(this,c).get(t);if(void 0===U)U=0===lt(this,a)?lt(this,g):0!==lt(this,v).length?lt(this,v).pop():lt(this,a)===lt(this,e)?ct(this,P,B).call(this,!1):lt(this,a),lt(this,u)[U]=t,lt(this,f)[U]=i,lt(this,c).set(t,U),lt(this,d)[lt(this,g)]=U,lt(this,p)[U]=lt(this,g),at(this,g,U),rt(this,a)._++,lt(this,R).call(this,U,G,x),x&&(x.set="add"),L=!1;else{ct(this,K,Q).call(this,U);const e=lt(this,f)[U];if(i!==e){if(lt(this,W)&&ct(this,V,X).call(this,e)){e.__abortController.abort(new Error("replaced"));const{__staleWhileFetching:i}=e;void 0===i||z||(lt(this,y)&&(null==(l=lt(this,h))||l.call(this,i,t,"set")),lt(this,A)&&(null==(o=lt(this,S))||o.push([i,t,"set"])))}else z||(lt(this,y)&&(null==(r=lt(this,h))||r.call(this,e,t,"set")),lt(this,A)&&(null==(w=lt(this,S))||w.push([e,t,"set"])));if(lt(this,C).call(this,U),lt(this,R).call(this,U,G,x),lt(this,f)[U]=i,x){x.set="replace";const t=e&&ct(this,V,X).call(this,e)?e.__staleWhileFetching:e;void 0!==t&&(x.oldValue=t)}}else x&&(x.set="update")}if(0===m||lt(this,b)||ct(this,O,F).call(this),lt(this,b)&&(L||lt(this,T).call(this,U,m,E),x&&lt(this,k).call(this,x,U)),!z&&lt(this,A)&&lt(this,S)){const t=lt(this,S);let i;for(;i=null==t?void 0:t.shift();)null==(_=lt(this,n))||_.call(this,...i)}return this}pop(){var t;try{for(;lt(this,a);){const t=lt(this,f)[lt(this,w)];if(ct(this,P,B).call(this,!0),ct(this,V,X).call(this,t)){if(t.__staleWhileFetching)return t.__staleWhileFetching}else if(void 0!==t)return t}}finally{if(lt(this,A)&&lt(this,S)){const i=lt(this,S);let e;for(;e=null==i?void 0:i.shift();)null==(t=lt(this,n))||t.call(this,...e)}}}has(t,i={}){const{updateAgeOnHas:e=this.updateAgeOnHas,status:s}=i,h=lt(this,c).get(t);if(void 0!==h){const t=lt(this,f)[h];if(ct(this,V,X).call(this,t)&&void 0===t.__staleWhileFetching)return!1;if(!lt(this,z).call(this,h))return e&&lt(this,E).call(this,h),s&&(s.has="hit",lt(this,k).call(this,s,h)),!0;s&&(s.has="stale",lt(this,k).call(this,s,h))}else s&&(s.has="miss");return!1}peek(t,i={}){const{allowStale:e=this.allowStale}=i,s=lt(this,c).get(t);if(void 0===s||!e&&lt(this,z).call(this,s))return;const h=lt(this,f)[s];return ct(this,V,X).call(this,h)?h.__staleWhileFetching:h}async fetch(t,i={}){const{allowStale:e=this.allowStale,updateAgeOnGet:s=this.updateAgeOnGet,noDeleteOnStaleGet:h=this.noDeleteOnStaleGet,ttl:n=this.ttl,noDisposeOnSet:l=this.noDisposeOnSet,size:o=0,sizeCalculation:a=this.sizeCalculation,noUpdateTTL:r=this.noUpdateTTL,noDeleteOnFetchRejection:u=this.noDeleteOnFetchRejection,allowStaleOnFetchRejection:d=this.allowStaleOnFetchRejection,ignoreFetchAbort:p=this.ignoreFetchAbort,allowStaleOnFetchAbort:w=this.allowStaleOnFetchAbort,context:g,forceRefresh:v=!1,status:S,signal:_}=i;if(!lt(this,W))return S&&(S.fetch="get"),this.get(t,{allowStale:e,updateAgeOnGet:s,noDeleteOnStaleGet:h,status:S});const m={allowStale:e,updateAgeOnGet:s,noDeleteOnStaleGet:h,ttl:n,noDisposeOnSet:l,size:o,sizeCalculation:a,noUpdateTTL:r,noDeleteOnFetchRejection:u,allowStaleOnFetchRejection:d,allowStaleOnFetchAbort:w,ignoreFetchAbort:p,status:S,signal:_};let b=lt(this,c).get(t);if(void 0===b){S&&(S.fetch="miss");const i=ct(this,$,q).call(this,t,b,m,g);return i.__returned=i}{const i=lt(this,f)[b];if(ct(this,V,X).call(this,i)){const t=e&&void 0!==i.__staleWhileFetching;return S&&(S.fetch="inflight",t&&(S.returnedStale=!0)),t?i.__staleWhileFetching:i.__returned=i}const h=lt(this,z).call(this,b);if(!v&&!h)return S&&(S.fetch="hit"),ct(this,K,Q).call(this,b),s&&lt(this,E).call(this,b),S&&lt(this,k).call(this,S,b),i;const n=ct(this,$,q).call(this,t,b,m,g),l=void 0!==n.__staleWhileFetching&&e;return S&&(S.fetch=h?"stale":"refresh",l&&h&&(S.returnedStale=!0)),l?n.__staleWhileFetching:n.__returned=n}}async forceFetch(t,i={}){const e=await this.fetch(t,i);if(void 0===e)throw new Error("fetch() returned undefined");return e}memo(t,i={}){const e=lt(this,o);if(!e)throw new Error("no memoMethod provided to constructor");const{context:s,forceRefresh:h,...n}=i,l=this.get(t,n);if(!h&&void 0!==l)return l;const a=e(t,l,{options:n,context:s});return this.set(t,a,n),a}get(t,i={}){const{allowStale:e=this.allowStale,updateAgeOnGet:s=this.updateAgeOnGet,noDeleteOnStaleGet:h=this.noDeleteOnStaleGet,status:n}=i,l=lt(this,c).get(t);if(void 0!==l){const i=lt(this,f)[l],o=ct(this,V,X).call(this,i);return n&&lt(this,k).call(this,n,l),lt(this,z).call(this,l)?(n&&(n.get="stale"),o?(n&&e&&void 0!==i.__staleWhileFetching&&(n.returnedStale=!0),e?i.__staleWhileFetching:void 0):(h||ct(this,Z,tt).call(this,t,"expire"),n&&e&&(n.returnedStale=!0),e?i:void 0)):(n&&(n.get="hit"),o?i.__staleWhileFetching:(ct(this,K,Q).call(this,l),s&&lt(this,E).call(this,l),i))}n&&(n.get="miss")}delete(t){return ct(this,Z,tt).call(this,t,"delete")}clear(){return ct(this,it,et).call(this,"delete")}};H=Symbol.toStringTag,e=new WeakMap,s=new WeakMap,h=new WeakMap,n=new WeakMap,l=new WeakMap,o=new WeakMap,a=new WeakMap,r=new WeakMap,c=new WeakMap,u=new WeakMap,f=new WeakMap,d=new WeakMap,p=new WeakMap,w=new WeakMap,g=new WeakMap,v=new WeakMap,S=new WeakMap,_=new WeakMap,m=new WeakMap,b=new WeakMap,y=new WeakMap,W=new WeakMap,A=new WeakMap,O=new WeakSet,F=function(){const t=new _t(lt(this,e)),i=new _t(lt(this,e));at(this,b,t),at(this,m,i),at(this,T,((e,s,h=ut.now())=>{if(i[e]=0!==s?h:0,t[e]=s,0!==s&&this.ttlAutopurge){const t=setTimeout((()=>{lt(this,z).call(this,e)&&ct(this,Z,tt).call(this,lt(this,u)[e],"expire")}),s+1);t.unref&&t.unref()}})),at(this,E,(e=>{i[e]=0!==t[e]?ut.now():0})),at(this,k,((e,n)=>{if(t[n]){const l=t[n],o=i[n];if(!l||!o)return;e.ttl=l,e.start=o,e.now=s||h();const a=e.now-o;e.remainingTTL=l-a}}));let s=0;const h=()=>{const t=ut.now();if(this.ttlResolution>0){s=t;const i=setTimeout((()=>s=0),this.ttlResolution);i.unref&&i.unref()}return t};this.getRemainingTTL=e=>{const n=lt(this,c).get(e);if(void 0===n)return 0;const l=t[n],o=i[n];if(!l||!o)return Infinity;return l-((s||h())-o)},at(this,z,(e=>{const n=i[e],l=t[e];return!!l&&!!n&&(s||h())-n>l}))},E=new WeakMap,k=new WeakMap,T=new WeakMap,z=new WeakMap,M=new WeakSet,x=function(){const t=new _t(lt(this,e));at(this,r,0),at(this,_,t),at(this,C,(i=>{at(this,r,lt(this,r)-t[i]),t[i]=0})),at(this,D,((t,i,e,s)=>{if(ct(this,V,X).call(this,i))return 0;if(!vt(e)){if(!s)throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");if("function"!=typeof s)throw new TypeError("sizeCalculation must be a function");if(e=s(i,t),!vt(e))throw new TypeError("sizeCalculation return invalid (expect positive integer)")}return e})),at(this,R,((i,e,h)=>{if(t[i]=e,lt(this,s)){const e=lt(this,s)-t[i];for(;lt(this,r)>e;)ct(this,P,B).call(this,!0)}at(this,r,lt(this,r)+t[i]),h&&(h.entrySize=e,h.totalCalculatedSize=lt(this,r))}))},C=new WeakMap,R=new WeakMap,D=new WeakMap,L=new WeakSet,G=function*({allowStale:t=this.allowStale}={}){if(lt(this,a))for(let i=lt(this,g);ct(this,N,I).call(this,i)&&(!t&&lt(this,z).call(this,i)||(yield i),i!==lt(this,w));)i=lt(this,p)[i]},U=new WeakSet,j=function*({allowStale:t=this.allowStale}={}){if(lt(this,a))for(let i=lt(this,w);ct(this,N,I).call(this,i)&&(!t&&lt(this,z).call(this,i)||(yield i),i!==lt(this,g));)i=lt(this,d)[i]},N=new WeakSet,I=function(t){return void 0!==t&&lt(this,c).get(lt(this,u)[t])===t},P=new WeakSet,B=function(t){var i,e;const s=lt(this,w),n=lt(this,u)[s],l=lt(this,f)[s];return lt(this,W)&&ct(this,V,X).call(this,l)?l.__abortController.abort(new Error("evicted")):(lt(this,y)||lt(this,A))&&(lt(this,y)&&(null==(i=lt(this,h))||i.call(this,l,n,"evict")),lt(this,A)&&(null==(e=lt(this,S))||e.push([l,n,"evict"]))),lt(this,C).call(this,s),t&&(lt(this,u)[s]=void 0,lt(this,f)[s]=void 0,lt(this,v).push(s)),1===lt(this,a)?(at(this,w,at(this,g,0)),lt(this,v).length=0):at(this,w,lt(this,d)[s]),lt(this,c).delete(n),rt(this,a)._--,s},$=new WeakSet,q=function(t,i,e,s){const h=void 0===i?void 0:lt(this,f)[i];if(ct(this,V,X).call(this,h))return h;const n=new wt,{signal:o}=e;null==o||o.addEventListener("abort",(()=>n.abort(o.reason)),{signal:n.signal});const a={signal:n.signal,options:e,context:s},r=(s,h=!1)=>{const{aborted:l}=n.signal,o=e.ignoreFetchAbort&&void 0!==s;if(e.status&&(l&&!h?(e.status.fetchAborted=!0,e.status.fetchError=n.signal.reason,o&&(e.status.fetchAbortIgnored=!0)):e.status.fetchResolved=!0),l&&!o&&!h)return u(n.signal.reason);const r=d;return lt(this,f)[i]===d&&(void 0===s?r.__staleWhileFetching?lt(this,f)[i]=r.__staleWhileFetching:ct(this,Z,tt).call(this,t,"fetch"):(e.status&&(e.status.fetchUpdated=!0),this.set(t,s,a.options))),s},u=s=>{const{aborted:h}=n.signal,l=h&&e.allowStaleOnFetchAbort,o=l||e.allowStaleOnFetchRejection,a=o||e.noDeleteOnFetchRejection,r=d;if(lt(this,f)[i]===d){!a||void 0===r.__staleWhileFetching?ct(this,Z,tt).call(this,t,"fetch"):l||(lt(this,f)[i]=r.__staleWhileFetching)}if(o)return e.status&&void 0!==r.__staleWhileFetching&&(e.status.returnedStale=!0),r.__staleWhileFetching;if(r.__returned===r)throw s};e.status&&(e.status.fetchDispatched=!0);const d=new Promise(((i,s)=>{var o;const c=null==(o=lt(this,l))?void 0:o.call(this,t,h,a);c&&c instanceof Promise&&c.then((t=>i(void 0===t?void 0:t)),s),n.signal.addEventListener("abort",(()=>{e.ignoreFetchAbort&&!e.allowStaleOnFetchAbort||(i(void 0),e.allowStaleOnFetchAbort&&(i=t=>r(t,!0)))}))})).then(r,(t=>(e.status&&(e.status.fetchRejected=!0,e.status.fetchError=t),u(t)))),p=Object.assign(d,{__abortController:n,__staleWhileFetching:h,__returned:void 0});return void 0===i?(this.set(t,p,{...a.options,status:void 0}),i=lt(this,c).get(t)):lt(this,f)[i]=p,p},V=new WeakSet,X=function(t){if(!lt(this,W))return!1;const i=t;return!!i&&i instanceof Promise&&i.hasOwnProperty("__staleWhileFetching")&&i.__abortController instanceof wt},Y=new WeakSet,J=function(t,i){lt(this,p)[i]=t,lt(this,d)[t]=i},K=new WeakSet,Q=function(t){t!==lt(this,g)&&(t===lt(this,w)?at(this,w,lt(this,d)[t]):ct(this,Y,J).call(this,lt(this,p)[t],lt(this,d)[t]),ct(this,Y,J).call(this,lt(this,g),t),at(this,g,t))},Z=new WeakSet,tt=function(t,i){var e,s,l,o;let r=!1;if(0!==lt(this,a)){const n=lt(this,c).get(t);if(void 0!==n)if(r=!0,1===lt(this,a))ct(this,it,et).call(this,i);else{lt(this,C).call(this,n);const l=lt(this,f)[n];if(ct(this,V,X).call(this,l)?l.__abortController.abort(new Error("deleted")):(lt(this,y)||lt(this,A))&&(lt(this,y)&&(null==(e=lt(this,h))||e.call(this,l,t,i)),lt(this,A)&&(null==(s=lt(this,S))||s.push([l,t,i]))),lt(this,c).delete(t),lt(this,u)[n]=void 0,lt(this,f)[n]=void 0,n===lt(this,g))at(this,g,lt(this,p)[n]);else if(n===lt(this,w))at(this,w,lt(this,d)[n]);else{const t=lt(this,p)[n];lt(this,d)[t]=lt(this,d)[n];const i=lt(this,d)[n];lt(this,p)[i]=lt(this,p)[n]}rt(this,a)._--,lt(this,v).push(n)}}if(lt(this,A)&&(null==(l=lt(this,S))?void 0:l.length)){const t=lt(this,S);let i;for(;i=null==t?void 0:t.shift();)null==(o=lt(this,n))||o.call(this,...i)}return r},it=new WeakSet,et=function(t){var i,e,s;for(const n of ct(this,U,j).call(this,{allowStale:!0})){const s=lt(this,f)[n];if(ct(this,V,X).call(this,s))s.__abortController.abort(new Error("deleted"));else{const l=lt(this,u)[n];lt(this,y)&&(null==(i=lt(this,h))||i.call(this,s,l,t)),lt(this,A)&&(null==(e=lt(this,S))||e.push([s,l,t]))}}if(lt(this,c).clear(),lt(this,f).fill(void 0),lt(this,u).fill(void 0),lt(this,b)&&lt(this,m)&&(lt(this,b).fill(0),lt(this,m).fill(0)),lt(this,_)&&lt(this,_).fill(0),at(this,w,0),at(this,g,0),lt(this,v).length=0,at(this,r,0),at(this,a,0),lt(this,A)&&lt(this,S)){const t=lt(this,S);let i;for(;i=null==t?void 0:t.shift();)null==(s=lt(this,n))||s.call(this,...i)}};let Wt=yt;export{Wt as L};
