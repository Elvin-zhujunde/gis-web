var e=new Date,t=new Date;function n(r,u,o,i){function a(e){return r(e=0===arguments.length?new Date:new Date(+e)),e}return a.floor=function(e){return r(e=new Date(+e)),e},a.ceil=function(e){return r(e=new Date(e-1)),u(e,1),r(e),e},a.round=function(e){var t=a(e),n=a.ceil(e);return e-t<n-e?t:n},a.offset=function(e,t){return u(e=new Date(+e),null==t?1:Math.floor(t)),e},a.range=function(e,t,n){var o,i=[];if(e=a.ceil(e),n=null==n?1:Math.floor(n),!(e<t&&n>0))return i;do{i.push(o=new Date(+e)),u(e,n),r(e)}while(o<e&&e<t);return i},a.filter=function(e){return n((function(t){if(t>=t)for(;r(t),!e(t);)t.setTime(t-1)}),(function(t,n){if(t>=t)if(n<0)for(;++n<=0;)for(;u(t,-1),!e(t););else for(;--n>=0;)for(;u(t,1),!e(t););}))},o&&(a.count=function(n,u){return e.setTime(+n),t.setTime(+u),r(e),r(t),Math.floor(o(e,t))},a.every=function(e){return e=Math.floor(e),isFinite(e)&&e>0?e>1?a.filter(i?function(t){return i(t)%e==0}:function(t){return a.count(0,t)%e==0}):a:null}),a}var r=n((function(){}),(function(e,t){e.setTime(+e+t)}),(function(e,t){return t-e}));r.every=function(e){return e=Math.floor(e),isFinite(e)&&e>0?e>1?n((function(t){t.setTime(Math.floor(t/e)*e)}),(function(t,n){t.setTime(+t+n*e)}),(function(t,n){return(n-t)/e})):r:null};const u=r;r.range;var o=1e3,i=6e4,a=36e5,f=864e5,s=6048e5,c=n((function(e){e.setTime(e-e.getMilliseconds())}),(function(e,t){e.setTime(+e+t*o)}),(function(e,t){return(t-e)/o}),(function(e){return e.getUTCSeconds()}));const l=c;c.range;var g=n((function(e){e.setTime(e-e.getMilliseconds()-e.getSeconds()*o)}),(function(e,t){e.setTime(+e+t*i)}),(function(e,t){return(t-e)/i}),(function(e){return e.getMinutes()}));const T=g;g.range;var D=n((function(e){e.setTime(e-e.getMilliseconds()-e.getSeconds()*o-e.getMinutes()*i)}),(function(e,t){e.setTime(+e+t*a)}),(function(e,t){return(t-e)/a}),(function(e){return e.getHours()}));const C=D;D.range;var F=n((function(e){e.setHours(0,0,0,0)}),(function(e,t){e.setDate(e.getDate()+t)}),(function(e,t){return(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*i)/f}),(function(e){return e.getDate()-1}));const M=F;function U(e){return n((function(t){t.setDate(t.getDate()-(t.getDay()+7-e)%7),t.setHours(0,0,0,0)}),(function(e,t){e.setDate(e.getDate()+7*t)}),(function(e,t){return(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*i)/s}))}F.range;var h=U(0),Y=U(1),v=U(2),m=U(3),H=U(4),d=U(5),w=U(6);h.range,Y.range,v.range,m.range,H.range,d.range,w.range;var y=n((function(e){e.setDate(1),e.setHours(0,0,0,0)}),(function(e,t){e.setMonth(e.getMonth()+t)}),(function(e,t){return t.getMonth()-e.getMonth()+12*(t.getFullYear()-e.getFullYear())}),(function(e){return e.getMonth()}));const z=y;y.range;var O=n((function(e){e.setMonth(0,1),e.setHours(0,0,0,0)}),(function(e,t){e.setFullYear(e.getFullYear()+t)}),(function(e,t){return t.getFullYear()-e.getFullYear()}),(function(e){return e.getFullYear()}));O.every=function(e){return isFinite(e=Math.floor(e))&&e>0?n((function(t){t.setFullYear(Math.floor(t.getFullYear()/e)*e),t.setMonth(0,1),t.setHours(0,0,0,0)}),(function(t,n){t.setFullYear(t.getFullYear()+n*e)})):null};const S=O;O.range;var p=n((function(e){e.setUTCHours(0,0,0,0)}),(function(e,t){e.setUTCDate(e.getUTCDate()+t)}),(function(e,t){return(t-e)/f}),(function(e){return e.getUTCDate()-1}));const b=p;function j(e){return n((function(t){t.setUTCDate(t.getUTCDate()-(t.getUTCDay()+7-e)%7),t.setUTCHours(0,0,0,0)}),(function(e,t){e.setUTCDate(e.getUTCDate()+7*t)}),(function(e,t){return(t-e)/s}))}p.range;var k=j(0),x=j(1),q=j(2),A=j(3),B=j(4),E=j(5),G=j(6);k.range,x.range,q.range,A.range,B.range,E.range,G.range;var I=n((function(e){e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)}),(function(e,t){e.setUTCFullYear(e.getUTCFullYear()+t)}),(function(e,t){return t.getUTCFullYear()-e.getUTCFullYear()}),(function(e){return e.getUTCFullYear()}));I.every=function(e){return isFinite(e=Math.floor(e))&&e>0?n((function(t){t.setUTCFullYear(Math.floor(t.getUTCFullYear()/e)*e),t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)}),(function(t,n){t.setUTCFullYear(t.getUTCFullYear()+n*e)})):null};const J=I;I.range;export{l as a,C as b,M as c,z as d,S as e,x as f,b as g,H as h,J as i,k as j,B as k,Y as m,h as s,T as t,u};
