import{g as n}from"../@amap/@amap.09f500c0.js";var e={exports:{}};function t(n,e,t){t=t||2;var x,u,v,f,o,y,h,s=e&&e.length,c=s?e[0]*t:n.length,Z=r(n,0,c,t,!0),g=[];if(!Z||Z.next===Z.prev)return g;if(s&&(Z=function(n,e,t,x){var i,u,v,f=[];for(i=0,u=e.length;i<u;i++)(v=r(n,e[i]*x,i<u-1?e[i+1]*x:n.length,x,!1))===v.next&&(v.steiner=!0),f.push(l(v));for(f.sort(a),i=0;i<f.length;i++)t=p(f[i],t);return t}(n,e,Z,t)),n.length>80*t){x=v=n[0],u=f=n[1];for(var d=t;d<c;d+=t)(o=n[d])<x&&(x=o),(y=n[d+1])<u&&(u=y),o>v&&(v=o),y>f&&(f=y);h=0!==(h=Math.max(v-x,f-u))?32767/h:0}return i(Z,g,t,x,u,h,0),g}function r(n,e,t,r,x){var i,u;if(x===j(n,e,t,r)>0)for(i=e;i<t;i+=r)u=b(i,n[i],n[i+1],u);else for(i=t-r;i>=e;i-=r)u=b(i,n[i],n[i+1],u);return u&&g(u,u.next)&&(k(u),u=u.next),u}function x(n,e){if(!n)return n;e||(e=n);var t,r=n;do{if(t=!1,r.steiner||!g(r,r.next)&&0!==Z(r.prev,r,r.next))r=r.next;else{if(k(r),(r=e=r.prev)===r.next)break;t=!0}}while(t||r!==e);return e}function i(n,e,t,r,a,p,y){if(n){!y&&p&&function(n,e,t,r){var x=n;do{0===x.z&&(x.z=h(x.x,x.y,e,t,r)),x.prevZ=x.prev,x.nextZ=x.next,x=x.next}while(x!==n);x.prevZ.nextZ=null,x.prevZ=null,function(n){var e,t,r,x,i,u,v,f,o=1;do{for(t=n,n=null,i=null,u=0;t;){for(u++,r=t,v=0,e=0;e<o&&(v++,r=r.nextZ);e++);for(f=o;v>0||f>0&&r;)0!==v&&(0===f||!r||t.z<=r.z)?(x=t,t=t.nextZ,v--):(x=r,r=r.nextZ,f--),i?i.nextZ=x:n=x,x.prevZ=i,i=x;t=r}i.nextZ=null,o*=2}while(u>1)}(x)}(n,r,a,p);for(var l,s,c=n;n.prev!==n.next;)if(l=n.prev,s=n.next,p?v(n,r,a,p):u(n))e.push(l.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),k(n),n=s.next,c=s.next;else if((n=s)===c){y?1===y?i(n=f(x(n),e,t),e,t,r,a,p,2):2===y&&o(n,e,t,r,a,p):i(x(n),e,t,r,a,p,1);break}}}function u(n){var e=n.prev,t=n,r=n.next;if(Z(e,t,r)>=0)return!1;for(var x=e.x,i=t.x,u=r.x,v=e.y,f=t.y,o=r.y,a=x<i?x<u?x:u:i<u?i:u,p=v<f?v<o?v:o:f<o?f:o,y=x>i?x>u?x:u:i>u?i:u,h=v>f?v>o?v:o:f>o?f:o,l=r.next;l!==e;){if(l.x>=a&&l.x<=y&&l.y>=p&&l.y<=h&&s(x,v,i,f,u,o,l.x,l.y)&&Z(l.prev,l,l.next)>=0)return!1;l=l.next}return!0}function v(n,e,t,r){var x=n.prev,i=n,u=n.next;if(Z(x,i,u)>=0)return!1;for(var v=x.x,f=i.x,o=u.x,a=x.y,p=i.y,y=u.y,l=v<f?v<o?v:o:f<o?f:o,c=a<p?a<y?a:y:p<y?p:y,g=v>f?v>o?v:o:f>o?f:o,d=a>p?a>y?a:y:p>y?p:y,w=h(l,c,e,t,r),m=h(g,d,e,t,r),M=n.prevZ,z=n.nextZ;M&&M.z>=w&&z&&z.z<=m;){if(M.x>=l&&M.x<=g&&M.y>=c&&M.y<=d&&M!==x&&M!==u&&s(v,a,f,p,o,y,M.x,M.y)&&Z(M.prev,M,M.next)>=0)return!1;if(M=M.prevZ,z.x>=l&&z.x<=g&&z.y>=c&&z.y<=d&&z!==x&&z!==u&&s(v,a,f,p,o,y,z.x,z.y)&&Z(z.prev,z,z.next)>=0)return!1;z=z.nextZ}for(;M&&M.z>=w;){if(M.x>=l&&M.x<=g&&M.y>=c&&M.y<=d&&M!==x&&M!==u&&s(v,a,f,p,o,y,M.x,M.y)&&Z(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;z&&z.z<=m;){if(z.x>=l&&z.x<=g&&z.y>=c&&z.y<=d&&z!==x&&z!==u&&s(v,a,f,p,o,y,z.x,z.y)&&Z(z.prev,z,z.next)>=0)return!1;z=z.nextZ}return!0}function f(n,e,t){var r=n;do{var i=r.prev,u=r.next.next;!g(i,u)&&d(i,r,r.next,u)&&M(i,u)&&M(u,i)&&(e.push(i.i/t|0),e.push(r.i/t|0),e.push(u.i/t|0),k(r),k(r.next),r=n=u),r=r.next}while(r!==n);return x(r)}function o(n,e,t,r,u,v){var f=n;do{for(var o=f.next.next;o!==f.prev;){if(f.i!==o.i&&c(f,o)){var a=z(f,o);return f=x(f,f.next),a=x(a,a.next),i(f,e,t,r,u,v,0),void i(a,e,t,r,u,v,0)}o=o.next}f=f.next}while(f!==n)}function a(n,e){return n.x-e.x}function p(n,e){var t=function(n,e){var t,r=e,x=n.x,i=n.y,u=-Infinity;do{if(i<=r.y&&i>=r.next.y&&r.next.y!==r.y){var v=r.x+(i-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(v<=x&&v>u&&(u=v,t=r.x<r.next.x?r:r.next,v===x))return t}r=r.next}while(r!==e);if(!t)return null;var f,o=t,a=t.x,p=t.y,h=Infinity;r=t;do{x>=r.x&&r.x>=a&&x!==r.x&&s(i<p?x:u,i,a,p,i<p?u:x,i,r.x,r.y)&&(f=Math.abs(i-r.y)/(x-r.x),M(r,n)&&(f<h||f===h&&(r.x>t.x||r.x===t.x&&y(t,r)))&&(t=r,h=f)),r=r.next}while(r!==o);return t}(n,e);if(!t)return e;var r=z(t,n);return x(r,r.next),x(t,t.next)}function y(n,e){return Z(n.prev,n,e.prev)<0&&Z(e.next,n,n.next)<0}function h(n,e,t,r,x){return(n=1431655765&((n=858993459&((n=252645135&((n=16711935&((n=(n-t)*x|0)|n<<8))|n<<4))|n<<2))|n<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-r)*x|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function l(n){var e=n,t=n;do{(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next}while(e!==n);return t}function s(n,e,t,r,x,i,u,v){return(x-u)*(e-v)>=(n-u)*(i-v)&&(n-u)*(r-v)>=(t-u)*(e-v)&&(t-u)*(i-v)>=(x-u)*(r-v)}function c(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!function(n,e){var t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&d(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}(n,e)&&(M(n,e)&&M(e,n)&&function(n,e){var t=n,r=!1,x=(n.x+e.x)/2,i=(n.y+e.y)/2;do{t.y>i!=t.next.y>i&&t.next.y!==t.y&&x<(t.next.x-t.x)*(i-t.y)/(t.next.y-t.y)+t.x&&(r=!r),t=t.next}while(t!==n);return r}(n,e)&&(Z(n.prev,n,e.prev)||Z(n,e.prev,e))||g(n,e)&&Z(n.prev,n,n.next)>0&&Z(e.prev,e,e.next)>0)}function Z(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function g(n,e){return n.x===e.x&&n.y===e.y}function d(n,e,t,r){var x=m(Z(n,e,t)),i=m(Z(n,e,r)),u=m(Z(t,r,n)),v=m(Z(t,r,e));return x!==i&&u!==v||(!(0!==x||!w(n,t,e))||(!(0!==i||!w(n,r,e))||(!(0!==u||!w(t,n,r))||!(0!==v||!w(t,e,r)))))}function w(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function m(n){return n>0?1:n<0?-1:0}function M(n,e){return Z(n.prev,n,n.next)<0?Z(n,e,n.next)>=0&&Z(n,n.prev,e)>=0:Z(n,e,n.prev)<0||Z(n,n.next,e)<0}function z(n,e){var t=new I(n.i,n.x,n.y),r=new I(e.i,e.x,e.y),x=n.next,i=e.prev;return n.next=e,e.prev=n,t.next=x,x.prev=t,r.next=t,t.prev=r,i.next=r,r.prev=i,r}function b(n,e,t,r){var x=new I(n,e,t);return r?(x.next=r.next,x.prev=r,r.next.prev=x,r.next=x):(x.prev=x,x.next=x),x}function k(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function I(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function j(n,e,t,r){for(var x=0,i=e,u=t-r;i<t;i+=r)x+=(n[u]-n[i])*(n[i+1]+n[u+1]),u=i;return x}e.exports=t,e.exports.default=t,t.deviation=function(n,e,t,r){var x=e&&e.length,i=x?e[0]*t:n.length,u=Math.abs(j(n,0,i,t));if(x)for(var v=0,f=e.length;v<f;v++){var o=e[v]*t,a=v<f-1?e[v+1]*t:n.length;u-=Math.abs(j(n,o,a,t))}var p=0;for(v=0;v<r.length;v+=3){var y=r[v]*t,h=r[v+1]*t,l=r[v+2]*t;p+=Math.abs((n[y]-n[l])*(n[h+1]-n[y+1])-(n[y]-n[h])*(n[l+1]-n[y+1]))}return 0===u&&0===p?0:Math.abs((p-u)/u)},t.flatten=function(n){for(var e=n[0][0].length,t={vertices:[],holes:[],dimensions:e},r=0,x=0;x<n.length;x++){for(var i=0;i<n[x].length;i++)for(var u=0;u<e;u++)t.vertices.push(n[x][i][u]);x>0&&(r+=n[x-1].length,t.holes.push(r))}return t};const q=n(e.exports);export{q as e};
