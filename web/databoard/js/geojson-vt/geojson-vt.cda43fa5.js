function t(n,i,r,o){for(var s,a=o,l=r-i>>1,u=r-i,f=n[i],h=n[i+1],g=n[r],m=n[r+1],p=i+3;p<r;p+=3){var c=e(n[p],n[p+1],f,h,g,m);if(c>a)s=p,a=c;else if(c===a){var v=Math.abs(p-l);v<u&&(s=p,u=v)}}a>o&&(s-i>3&&t(n,i,s,o),n[s+2]=a,r-s>3&&t(n,s,r,o))}function e(t,e,n,i,r,o){var s=r-n,a=o-i;if(0!==s||0!==a){var l=((t-n)*s+(e-i)*a)/(s*s+a*a);l>1?(n=r,i=o):l>0&&(n+=s*l,i+=a*l)}return(s=t-n)*s+(a=e-i)*a}function n(t,e,n,r){var o={id:void 0===t?null:t,type:e,geometry:n,tags:r,minX:Infinity,minY:Infinity,maxX:-Infinity,maxY:-Infinity};return function(t){var e=t.geometry,n=t.type;if("Point"===n||"MultiPoint"===n||"LineString"===n)i(t,e);else if("Polygon"===n||"MultiLineString"===n)for(var r=0;r<e.length;r++)i(t,e[r]);else if("MultiPolygon"===n)for(r=0;r<e.length;r++)for(var o=0;o<e[r].length;o++)i(t,e[r][o])}(o),o}function i(t,e){for(var n=0;n<e.length;n+=3)t.minX=Math.min(t.minX,e[n]),t.minY=Math.min(t.minY,e[n+1]),t.maxX=Math.max(t.maxX,e[n]),t.maxY=Math.max(t.maxY,e[n+1])}function r(t,e,i,l){if(e.geometry){var u=e.geometry.coordinates,f=e.geometry.type,h=Math.pow(i.tolerance/((1<<i.maxZoom)*i.extent),2),g=[],m=e.id;if(i.promoteId?m=e.properties[i.promoteId]:i.generateId&&(m=l||0),"Point"===f)o(u,g);else if("MultiPoint"===f)for(var p=0;p<u.length;p++)o(u[p],g);else if("LineString"===f)s(u,g,h,!1);else if("MultiLineString"===f){if(i.lineMetrics){for(p=0;p<u.length;p++)g=[],s(u[p],g,h,!1),t.push(n(m,"LineString",g,e.properties));return}a(u,g,h,!1)}else if("Polygon"===f)a(u,g,h,!0);else{if("MultiPolygon"!==f){if("GeometryCollection"===f){for(p=0;p<e.geometry.geometries.length;p++)r(t,{id:m,geometry:e.geometry.geometries[p],properties:e.properties},i,l);return}throw new Error("Input data is not a valid GeoJSON object.")}for(p=0;p<u.length;p++){var c=[];a(u[p],c,h,!0),g.push(c)}}t.push(n(m,f,g,e.properties))}}function o(t,e){e.push(l(t[0])),e.push(u(t[1])),e.push(0)}function s(e,n,i,r){for(var o,s,a=0,f=0;f<e.length;f++){var h=l(e[f][0]),g=u(e[f][1]);n.push(h),n.push(g),n.push(0),f>0&&(a+=r?(o*g-h*s)/2:Math.sqrt(Math.pow(h-o,2)+Math.pow(g-s,2))),o=h,s=g}var m=n.length-3;n[2]=1,t(n,0,m,i),n[m+2]=1,n.size=Math.abs(a),n.start=0,n.end=n.size}function a(t,e,n,i){for(var r=0;r<t.length;r++){var o=[];s(t[r],o,n,i),e.push(o)}}function l(t){return t/360+.5}function u(t){var e=Math.sin(t*Math.PI/180),n=.5-.25*Math.log((1+e)/(1-e))/Math.PI;return n<0?0:n>1?1:n}function f(t,e,i,r,o,s,a,l){if(r/=e,s>=(i/=e)&&a<r)return t;if(a<i||s>=r)return null;for(var u=[],f=0;f<t.length;f++){var m=t[f],c=m.geometry,v=m.type,d=0===o?m.minX:m.minY,y=0===o?m.maxX:m.maxY;if(d>=i&&y<r)u.push(m);else if(!(y<i||d>=r)){var x=[];if("Point"===v||"MultiPoint"===v)h(c,x,i,r,o);else if("LineString"===v)g(c,x,i,r,o,!1,l.lineMetrics);else if("MultiLineString"===v)p(c,x,i,r,o,!1);else if("Polygon"===v)p(c,x,i,r,o,!0);else if("MultiPolygon"===v)for(var M=0;M<c.length;M++){var P=[];p(c[M],P,i,r,o,!0),P.length&&x.push(P)}if(x.length){if(l.lineMetrics&&"LineString"===v){for(M=0;M<x.length;M++)u.push(n(m.id,v,x[M],m.tags));continue}"LineString"!==v&&"MultiLineString"!==v||(1===x.length?(v="LineString",x=x[0]):v="MultiLineString"),"Point"!==v&&"MultiPoint"!==v||(v=3===x.length?"Point":"MultiPoint"),u.push(n(m.id,v,x,m.tags))}}}return u.length?u:null}function h(t,e,n,i,r){for(var o=0;o<t.length;o+=3){var s=t[o+r];s>=n&&s<=i&&(e.push(t[o]),e.push(t[o+1]),e.push(t[o+2]))}}function g(t,e,n,i,r,o,s){for(var a,l,u=m(t),f=0===r?v:d,h=t.start,g=0;g<t.length-3;g+=3){var p=t[g],y=t[g+1],x=t[g+2],M=t[g+3],P=t[g+4],S=0===r?p:y,Y=0===r?M:P,X=!1;s&&(a=Math.sqrt(Math.pow(p-M,2)+Math.pow(y-P,2))),S<n?Y>n&&(l=f(u,p,y,M,P,n),s&&(u.start=h+a*l)):S>i?Y<i&&(l=f(u,p,y,M,P,i),s&&(u.start=h+a*l)):c(u,p,y,x),Y<n&&S>=n&&(l=f(u,p,y,M,P,n),X=!0),Y>i&&S<=i&&(l=f(u,p,y,M,P,i),X=!0),!o&&X&&(s&&(u.end=h+a*l),e.push(u),u=m(t)),s&&(h+=a)}var L=t.length-3;p=t[L],y=t[L+1],x=t[L+2],(S=0===r?p:y)>=n&&S<=i&&c(u,p,y,x),L=u.length-3,o&&L>=3&&(u[L]!==u[0]||u[L+1]!==u[1])&&c(u,u[0],u[1],u[2]),u.length&&e.push(u)}function m(t){var e=[];return e.size=t.size,e.start=t.start,e.end=t.end,e}function p(t,e,n,i,r,o){for(var s=0;s<t.length;s++)g(t[s],e,n,i,r,o,!1)}function c(t,e,n,i){t.push(e),t.push(n),t.push(i)}function v(t,e,n,i,r,o){var s=(o-e)/(i-e);return t.push(o),t.push(n+(r-n)*s),t.push(1),s}function d(t,e,n,i,r,o){var s=(o-n)/(r-n);return t.push(e+(i-e)*s),t.push(o),t.push(1),s}function y(t,e){for(var i=[],r=0;r<t.length;r++){var o,s=t[r],a=s.type;if("Point"===a||"MultiPoint"===a||"LineString"===a)o=x(s.geometry,e);else if("MultiLineString"===a||"Polygon"===a){o=[];for(var l=0;l<s.geometry.length;l++)o.push(x(s.geometry[l],e))}else if("MultiPolygon"===a)for(o=[],l=0;l<s.geometry.length;l++){for(var u=[],f=0;f<s.geometry[l].length;f++)u.push(x(s.geometry[l][f],e));o.push(u)}i.push(n(s.id,a,o,s.tags))}return i}function x(t,e){var n=[];n.size=t.size,void 0!==t.start&&(n.start=t.start,n.end=t.end);for(var i=0;i<t.length;i+=3)n.push(t[i]+e,t[i+1],t[i+2]);return n}function M(t,e){if(t.transformed)return t;var n,i,r,o=1<<t.z,s=t.x,a=t.y;for(n=0;n<t.features.length;n++){var l=t.features[n],u=l.geometry,f=l.type;if(l.geometry=[],1===f)for(i=0;i<u.length;i+=2)l.geometry.push(P(u[i],u[i+1],e,o,s,a));else for(i=0;i<u.length;i++){var h=[];for(r=0;r<u[i].length;r+=2)h.push(P(u[i][r],u[i][r+1],e,o,s,a));l.geometry.push(h)}}return t.transformed=!0,t}function P(t,e,n,i,r,o){return[Math.round(n*(t*i-r)),Math.round(n*(e*i-o))]}function S(t,e,n,i,r){for(var o=e===r.maxZoom?0:r.tolerance/((1<<e)*r.extent),s={features:[],numPoints:0,numSimplified:0,numFeatures:0,source:null,x:n,y:i,z:e,transformed:!1,minX:2,minY:1,maxX:-1,maxY:0},a=0;a<t.length;a++){s.numFeatures++,Y(s,t[a],o,r);var l=t[a].minX,u=t[a].minY,f=t[a].maxX,h=t[a].maxY;l<s.minX&&(s.minX=l),u<s.minY&&(s.minY=u),f>s.maxX&&(s.maxX=f),h>s.maxY&&(s.maxY=h)}return s}function Y(t,e,n,i){var r=e.geometry,o=e.type,s=[];if("Point"===o||"MultiPoint"===o)for(var a=0;a<r.length;a+=3)s.push(r[a]),s.push(r[a+1]),t.numPoints++,t.numSimplified++;else if("LineString"===o)X(s,r,t,n,!1,!1);else if("MultiLineString"===o||"Polygon"===o)for(a=0;a<r.length;a++)X(s,r[a],t,n,"Polygon"===o,0===a);else if("MultiPolygon"===o)for(var l=0;l<r.length;l++){var u=r[l];for(a=0;a<u.length;a++)X(s,u[a],t,n,!0,0===a)}if(s.length){var f=e.tags||null;if("LineString"===o&&i.lineMetrics){for(var h in f={},e.tags)f[h]=e.tags[h];f.mapbox_clip_start=r.start/r.size,f.mapbox_clip_end=r.end/r.size}var g={geometry:s,type:"Polygon"===o||"MultiPolygon"===o?3:"LineString"===o||"MultiLineString"===o?2:1,tags:f};null!==e.id&&(g.id=e.id),t.features.push(g)}}function X(t,e,n,i,r,o){var s=i*i;if(i>0&&e.size<(r?s:i))n.numPoints+=e.length/3;else{for(var a=[],l=0;l<e.length;l+=3)(0===i||e[l+2]>s)&&(n.numSimplified++,a.push(e[l]),a.push(e[l+1])),n.numPoints++;r&&function(t,e){for(var n=0,i=0,r=t.length,o=r-2;i<r;o=i,i+=2)n+=(t[i]-t[o])*(t[i+1]+t[o+1]);if(n>0===e)for(i=0,r=t.length;i<r/2;i+=2){var s=t[i],a=t[i+1];t[i]=t[r-2-i],t[i+1]=t[r-1-i],t[r-2-i]=s,t[r-1-i]=a}}(a,o),t.push(a)}}function L(t,e){return new I(t,e)}function I(t,e){var n=(e=this.options=function(t,e){for(var n in e)t[n]=e[n];return t}(Object.create(this.options),e)).debug;if(n&&console.time("preprocess data"),e.maxZoom<0||e.maxZoom>24)throw new Error("maxZoom should be in the 0-24 range");if(e.promoteId&&e.generateId)throw new Error("promoteId and generateId cannot be used together.");var i=function(t,e){var n=[];if("FeatureCollection"===t.type)for(var i=0;i<t.features.length;i++)r(n,t.features[i],e,i);else"Feature"===t.type?r(n,t,e):r(n,{geometry:t},e);return n}(t,e);this.tiles={},this.tileCoords=[],n&&(console.timeEnd("preprocess data"),e.indexMaxZoom,e.indexMaxPoints,console.time("generate tiles"),this.stats={},this.total=0),i=function(t,e){var n=e.buffer/e.extent,i=t,r=f(t,1,-1-n,n,0,-1,2,e),o=f(t,1,1-n,2+n,0,-1,2,e);return(r||o)&&(i=f(t,1,-n,1+n,0,-1,2,e)||[],r&&(i=y(r,1).concat(i)),o&&(i=i.concat(y(o,-1)))),i}(i,e),i.length&&this.splitTile(i,0,0,0),n&&(i.length&&(this.tiles[0].numFeatures,this.tiles[0].numPoints),console.timeEnd("generate tiles"),this.total,JSON.stringify(this.stats))}function b(t,e,n){return 32*((1<<t)*n+e)+t}I.prototype.options={maxZoom:14,indexMaxZoom:5,indexMaxPoints:1e5,tolerance:3,extent:4096,buffer:64,lineMetrics:!1,promoteId:null,generateId:!1,debug:0},I.prototype.splitTile=function(t,e,n,i,r,o,s){for(var a=[t,e,n,i],l=this.options,u=l.debug;a.length;){i=a.pop(),n=a.pop(),e=a.pop(),t=a.pop();var h=1<<e,g=b(e,n,i),m=this.tiles[g];if(!m&&(u>1&&console.time("creation"),m=this.tiles[g]=S(t,e,n,i,l),this.tileCoords.push({z:e,x:n,y:i}),u)){u>1&&(m.numFeatures,m.numPoints,m.numSimplified,console.timeEnd("creation"));var p="z"+e;this.stats[p]=(this.stats[p]||0)+1,this.total++}if(m.source=t,r){if(e===l.maxZoom||e===r)continue;var c=1<<r-e;if(n!==Math.floor(o/c)||i!==Math.floor(s/c))continue}else if(e===l.indexMaxZoom||m.numPoints<=l.indexMaxPoints)continue;if(m.source=null,0!==t.length){u>1&&console.time("clipping");var v,d,y,x,M,P,Y=.5*l.buffer/l.extent,X=.5-Y,L=.5+Y,I=1+Y;v=d=y=x=null,M=f(t,h,n-Y,n+L,0,m.minX,m.maxX,l),P=f(t,h,n+X,n+I,0,m.minX,m.maxX,l),t=null,M&&(v=f(M,h,i-Y,i+L,1,m.minY,m.maxY,l),d=f(M,h,i+X,i+I,1,m.minY,m.maxY,l),M=null),P&&(y=f(P,h,i-Y,i+L,1,m.minY,m.maxY,l),x=f(P,h,i+X,i+I,1,m.minY,m.maxY,l),P=null),u>1&&console.timeEnd("clipping"),a.push(v||[],e+1,2*n,2*i),a.push(d||[],e+1,2*n,2*i+1),a.push(y||[],e+1,2*n+1,2*i),a.push(x||[],e+1,2*n+1,2*i+1)}}},I.prototype.getTile=function(t,e,n){var i=this.options,r=i.extent,o=i.debug;if(t<0||t>24)return null;var s=1<<t,a=b(t,e=(e%s+s)%s,n);if(this.tiles[a])return M(this.tiles[a],r);for(var l,u=t,f=e,h=n;!l&&u>0;)u--,f=Math.floor(f/2),h=Math.floor(h/2),l=this.tiles[b(u,f,h)];return l&&l.source?(o>1&&console.time("drilling down"),this.splitTile(l.source,u,f,h,t,e,n),o>1&&console.timeEnd("drilling down"),this.tiles[a]?M(this.tiles[a],r):null):null};export{L as g};
