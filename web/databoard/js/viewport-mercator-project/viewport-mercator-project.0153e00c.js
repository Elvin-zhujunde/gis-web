import{e as t,f as i,g as e,h as r,i as n,j as a,k as o}from"../@babel/@babel.59141994.js";import{t as h,C as s,z as u,A as l,u as c,B as p,D as v,E as d,F as g,G as M,m as f,i as b,b as m,H as x}from"../gl-matrix/gl-matrix.30ed328e.js";function j(t,i){var e=h([],i,t);return s(e,e,1/e[3]),e}function P(t,i){if(!t)throw new Error(i||"viewport-mercator-project: assertion failed.")}var w=Math.PI,F=w/4,N=w/180,y=180/w,k=4003e4,Z=1.5;function z(t){return Math.pow(2,t)}function L(i,e){var r=t(i,2),n=r[0],a=r[1];P(Number.isFinite(n)&&Number.isFinite(e)),P(Number.isFinite(a)&&a>=-90&&a<=90,"invalid latitude");var o=a*N;return[(e*=512)*(n*N+w)/(2*w),e*(w-Math.log(Math.tan(F+.5*o)))/(2*w)]}function B(i,e){var r=t(i,2),n=r[0],a=r[1],o=n/(e*=512)*(2*w)-w,h=2*(Math.atan(Math.exp(w-a/e*(2*w)))-F);return[o*y,h*y]}function D(t){var i=t.width,e=t.height,r=t.pitch,n=function(t){var i=t.width,e=t.height,r=t.altitude,n=void 0===r?Z:r,a=t.pitch,o=void 0===a?0:a,h=t.nearZMultiplier,s=void 0===h?1:h,u=t.farZMultiplier,l=void 0===u?1:u,c=o*N,p=Math.atan(.5/n),v=Math.sin(p)*n/Math.sin(Math.PI/2-c-p),d=Math.cos(Math.PI/2-c)*v+n;return{fov:2*Math.atan(e/2/n),aspect:i/e,focalDistance:n,near:s,far:d*l}}({width:i,height:e,altitude:t.altitude,pitch:r,nearZMultiplier:t.nearZMultiplier,farZMultiplier:t.farZMultiplier}),a=n.fov,o=n.aspect,h=n.near,s=n.far;return d([],a,o,h,s)}function E(i,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=t(i,3),a=n[0],o=n[1],h=n[2];if(P(Number.isFinite(a)&&Number.isFinite(o),"invalid pixel coordinate"),Number.isFinite(h))return j(e,[a,o,h,1]);var s=j(e,[a,o,0,1]),u=j(e,[a,o,1,1]),l=s[2],c=u[2];return g([],s,u,l===c?0:((r||0)-l)/(c-l))}var q=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],C=function(){function r(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.width,n=t.height,a=t.viewMatrix,o=void 0===a?q:a,h=t.projectionMatrix,s=void 0===h?q:h;e(this,r),this.width=i||1,this.height=n||1,this.scale=1,this.pixelsPerMeter=1,this.viewMatrix=o,this.projectionMatrix=s;var c=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];f(c,c,this.projectionMatrix),f(c,c,this.viewMatrix),this.viewProjectionMatrix=c;var p=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];l(p,p,[this.width/2,-this.height/2,1]),u(p,p,[1,-1,0]),f(p,p,this.viewProjectionMatrix);var v=b([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],p);if(!v)throw new Error("Pixel project matrix not invertible");this.pixelProjectionMatrix=p,this.pixelUnprojectionMatrix=v,this.equals=this.equals.bind(this),this.project=this.project.bind(this),this.unproject=this.unproject.bind(this),this.projectPosition=this.projectPosition.bind(this),this.unprojectPosition=this.unprojectPosition.bind(this),this.projectFlat=this.projectFlat.bind(this),this.unprojectFlat=this.unprojectFlat.bind(this)}return i(r,[{key:"equals",value:function(t){return t instanceof r&&(t.width===this.width&&t.height===this.height&&M(t.projectionMatrix,this.projectionMatrix)&&M(t.viewMatrix,this.viewMatrix))}},{key:"project",value:function(i){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).topLeft,r=void 0===e||e,n=function(i,e){var r=t(i,3),n=r[0],a=r[1],o=r[2],h=void 0===o?0:o;return P(Number.isFinite(n)&&Number.isFinite(a)&&Number.isFinite(h)),j(e,[n,a,h,1])}(this.projectPosition(i),this.pixelProjectionMatrix),a=t(n,2),o=a[0],h=a[1],s=r?h:this.height-h;return 2===i.length?[o,s]:[o,s,n[2]]}},{key:"unproject",value:function(i){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=e.topLeft,n=void 0===r||r,a=e.targetZ,o=t(i,3),h=o[0],s=o[1],u=o[2],l=n?s:this.height-s,c=a&&a*this.pixelsPerMeter,p=E([h,l,u],this.pixelUnprojectionMatrix,c),v=this.unprojectPosition(p),d=t(v,3),g=d[0],M=d[1],f=d[2];return Number.isFinite(u)?[g,M,f]:Number.isFinite(a)?[g,M,a]:[g,M]}},{key:"projectPosition",value:function(i){var e=this.projectFlat(i),r=t(e,2);return[r[0],r[1],(i[2]||0)*this.pixelsPerMeter]}},{key:"unprojectPosition",value:function(i){var e=this.unprojectFlat(i),r=t(e,2);return[r[0],r[1],(i[2]||0)/this.pixelsPerMeter]}},{key:"projectFlat",value:function(t){return arguments.length>1&&void 0!==arguments[1]||this.scale,t}},{key:"unprojectFlat",value:function(t){return arguments.length>1&&void 0!==arguments[1]||this.scale,t}}]),r}();var I=function(h){function s(){var t,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=i.width,h=i.height,d=i.latitude,g=void 0===d?0:d,M=i.longitude,f=void 0===M?0:M,b=i.zoom,m=void 0===b?0:b,x=i.pitch,j=void 0===x?0:x,w=i.bearing,F=void 0===w?0:w,y=i.altitude,Z=void 0===y?1.5:y,B=i.nearZMultiplier,E=i.farZMultiplier;e(this,s),r=r||1,h=h||1;var q=z(m);Z=Math.max(.75,Z);var C=L([f,g],q);C[2]=0;var I=D({width:r,height:h,pitch:j,bearing:F,altitude:Z,nearZMultiplier:B||1/h,farZMultiplier:E||1.01}),U=function(t){var i=t.height,e=t.pitch,r=t.bearing,n=t.altitude,a=t.center,o=void 0===a?null:a,h=t.flipY,s=void 0!==h&&h,d=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];return u(d,d,[0,0,-n]),l(d,d,[1,1,1/i]),c(d,d,-e*N),p(d,d,r*N),s&&l(d,d,[1,-1,1]),o&&u(d,d,v([],o)),d}({height:h,center:C,pitch:j,bearing:F,altitude:Z,flipY:!0});return(t=n(this,a(s).call(this,{width:r,height:h,viewMatrix:U,projectionMatrix:I}))).latitude=g,t.longitude=f,t.zoom=m,t.pitch=j,t.bearing=F,t.altitude=Z,t.scale=q,t.center=C,t.pixelsPerMeter=function(t){var i=t.latitude,e=t.longitude,r=t.zoom,n=t.scale,a=t.highPrecision,o=void 0!==a&&a;n=void 0!==n?n:z(r),P(Number.isFinite(i)&&Number.isFinite(e)&&Number.isFinite(n));var h={},s=512*n,u=Math.cos(i*N),l=s/360,c=l/u,p=s/k/u;if(h.pixelsPerMeter=[p,-p,p],h.metersPerPixel=[1/p,-1/p,1/p],h.pixelsPerDegree=[l,-c,p],h.degreesPerPixel=[1/l,-1/c,1/p],o){var v=N*Math.tan(i*N)/u,d=l*v/2,g=s/k*v,M=g/c*p;h.pixelsPerDegree2=[0,-d,g],h.pixelsPerMeter2=[M,0,M]}return h}(o(o(t))).pixelsPerMeter[2],Object.freeze(o(o(t))),t}return r(s,C),i(s,[{key:"projectFlat",value:function(t){return L(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.scale)}},{key:"unprojectFlat",value:function(t){return B(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.scale)}},{key:"getMapCenterByLngLatPosition",value:function(t){var i=t.lngLat,e=E(t.pos,this.pixelUnprojectionMatrix),r=L(i,this.scale),n=m([],r,x([],e));return B(m([],this.center,n),this.scale)}},{key:"getLocationAtPoint",value:function(t){var i=t.lngLat,e=t.pos;return this.getMapCenterByLngLatPosition({lngLat:i,pos:e})}},{key:"fitBounds",value:function(i){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=this.width,n=this.height,a=function(i){var e=i.width,r=i.height,n=i.bounds,a=i.minExtent,o=void 0===a?0:a,h=i.maxZoom,s=void 0===h?24:h,u=i.padding,l=void 0===u?0:u,c=i.offset,p=void 0===c?[0,0]:c,v=t(n,2),d=t(v[0],2),g=d[0],M=d[1],f=t(v[1],2),b=f[0],m=f[1];Number.isFinite(l)?l={top:l,bottom:l,left:l,right:l}:P(Number.isFinite(l.top)&&Number.isFinite(l.bottom)&&Number.isFinite(l.left)&&Number.isFinite(l.right));var x=new I({width:e,height:r,longitude:0,latitude:0,zoom:0}),j=x.project([g,m]),w=x.project([b,M]),F=[Math.max(Math.abs(w[0]-j[0]),o),Math.max(Math.abs(w[1]-j[1]),o)],N=[e-l.left-l.right-2*Math.abs(p[0]),r-l.top-l.bottom-2*Math.abs(p[1])];P(N[0]>0&&N[1]>0);var y=N[0]/F[0],k=N[1]/F[1],Z=(l.right-l.left)/2/y,z=(l.bottom-l.top)/2/k,L=[(w[0]+j[0])/2+Z,(w[1]+j[1])/2+z],B=x.unproject(L),D=x.zoom+Math.log2(Math.abs(Math.min(y,k)));return{longitude:B[0],latitude:B[1],zoom:Math.min(D,s)}}(Object.assign({width:r,height:n,bounds:i},e));return new s({width:r,height:n,longitude:a.longitude,latitude:a.latitude,zoom:a.zoom})}}]),s}();export{I as W};