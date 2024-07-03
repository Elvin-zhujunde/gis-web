import{g as t}from"../@amap/@amap.09f500c0.js";var i=function t(i,r){var e,s=i&&i.type;if("FeatureCollection"===s)for(e=0;e<i.features.length;e++)t(i.features[e],r);else if("GeometryCollection"===s)for(e=0;e<i.geometries.length;e++)t(i.geometries[e],r);else if("Feature"===s)t(i.geometry,r);else if("Polygon"===s)n(i.coordinates,r);else if("MultiPolygon"===s)for(e=0;e<i.coordinates.length;e++)n(i.coordinates[e],r);return i};function n(t,i){if(0!==t.length){r(t[0],i);for(var n=1;n<t.length;n++)r(t[n],!i)}}function r(t,i){for(var n=0,r=0,e=0,s=t.length,a=s-1;e<s;a=e++){var h=(t[e][0]-t[a][0])*(t[a][1]+t[e][1]),o=n+h;r+=Math.abs(n)>=Math.abs(h)?n-o+h:h-o+n,n=o}n+r>=0!=!!i&&t.reverse()}const e=t(i);var s=a;function a(t,i){this.x=t,this.y=i}a.prototype={clone:function(){return new a(this.x,this.y)},add:function(t){return this.clone()._add(t)},sub:function(t){return this.clone()._sub(t)},multByPoint:function(t){return this.clone()._multByPoint(t)},divByPoint:function(t){return this.clone()._divByPoint(t)},mult:function(t){return this.clone()._mult(t)},div:function(t){return this.clone()._div(t)},rotate:function(t){return this.clone()._rotate(t)},rotateAround:function(t,i){return this.clone()._rotateAround(t,i)},matMult:function(t){return this.clone()._matMult(t)},unit:function(){return this.clone()._unit()},perp:function(){return this.clone()._perp()},round:function(){return this.clone()._round()},mag:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},equals:function(t){return this.x===t.x&&this.y===t.y},dist:function(t){return Math.sqrt(this.distSqr(t))},distSqr:function(t){var i=t.x-this.x,n=t.y-this.y;return i*i+n*n},angle:function(){return Math.atan2(this.y,this.x)},angleTo:function(t){return Math.atan2(this.y-t.y,this.x-t.x)},angleWith:function(t){return this.angleWithSep(t.x,t.y)},angleWithSep:function(t,i){return Math.atan2(this.x*i-this.y*t,this.x*t+this.y*i)},_matMult:function(t){var i=t[0]*this.x+t[1]*this.y,n=t[2]*this.x+t[3]*this.y;return this.x=i,this.y=n,this},_add:function(t){return this.x+=t.x,this.y+=t.y,this},_sub:function(t){return this.x-=t.x,this.y-=t.y,this},_mult:function(t){return this.x*=t,this.y*=t,this},_div:function(t){return this.x/=t,this.y/=t,this},_multByPoint:function(t){return this.x*=t.x,this.y*=t.y,this},_divByPoint:function(t){return this.x/=t.x,this.y/=t.y,this},_unit:function(){return this._div(this.mag()),this},_perp:function(){var t=this.y;return this.y=this.x,this.x=-t,this},_rotate:function(t){var i=Math.cos(t),n=Math.sin(t),r=i*this.x-n*this.y,e=n*this.x+i*this.y;return this.x=r,this.y=e,this},_rotateAround:function(t,i){var n=Math.cos(t),r=Math.sin(t),e=i.x+n*(this.x-i.x)-r*(this.y-i.y),s=i.y+r*(this.x-i.x)+n*(this.y-i.y);return this.x=e,this.y=s,this},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}},a.convert=function(t){return t instanceof a?t:Array.isArray(t)?new a(t[0],t[1]):t};var h=s,o=u;function u(t,i,n,r,e){this.properties={},this.extent=n,this.type=0,this._pbf=t,this._geometry=-1,this._keys=r,this._values=e,t.readFields(f,this,i)}function f(t,i,n){1==t?i.id=n.readVarint():2==t?function(t,i){var n=t.readVarint()+t.pos;for(;t.pos<n;){var r=i._keys[t.readVarint()],e=i._values[t.readVarint()];i.properties[r]=e}}(n,i):3==t?i.type=n.readVarint():4==t&&(i._geometry=n.pos)}function c(t){for(var i,n,r=0,e=0,s=t.length,a=s-1;e<s;a=e++)i=t[e],r+=((n=t[a]).x-i.x)*(i.y+n.y);return r}u.types=["Unknown","Point","LineString","Polygon"],u.prototype.loadGeometry=function(){var t=this._pbf;t.pos=this._geometry;for(var i,n=t.readVarint()+t.pos,r=1,e=0,s=0,a=0,o=[];t.pos<n;){if(e<=0){var u=t.readVarint();r=7&u,e=u>>3}if(e--,1===r||2===r)s+=t.readSVarint(),a+=t.readSVarint(),1===r&&(i&&o.push(i),i=[]),i.push(new h(s,a));else{if(7!==r)throw new Error("unknown command "+r);i&&i.push(i[0].clone())}}return i&&o.push(i),o},u.prototype.bbox=function(){var t=this._pbf;t.pos=this._geometry;for(var i=t.readVarint()+t.pos,n=1,r=0,e=0,s=0,a=Infinity,h=-Infinity,o=Infinity,u=-Infinity;t.pos<i;){if(r<=0){var f=t.readVarint();n=7&f,r=f>>3}if(r--,1===n||2===n)(e+=t.readSVarint())<a&&(a=e),e>h&&(h=e),(s+=t.readSVarint())<o&&(o=s),s>u&&(u=s);else if(7!==n)throw new Error("unknown command "+n)}return[a,o,h,u]},u.prototype.toGeoJSON=function(t,i,n){var r,e,s=this.extent*Math.pow(2,n),a=this.extent*t,h=this.extent*i,o=this.loadGeometry(),f=u.types[this.type];function l(t){for(var i=0;i<t.length;i++){var n=t[i],r=180-360*(n.y+h)/s;t[i]=[360*(n.x+a)/s-180,360/Math.PI*Math.atan(Math.exp(r*Math.PI/180))-90]}}switch(this.type){case 1:var d=[];for(r=0;r<o.length;r++)d[r]=o[r][0];l(o=d);break;case 2:for(r=0;r<o.length;r++)l(o[r]);break;case 3:for(o=function(t){var i=t.length;if(i<=1)return[t];for(var n,r,e=[],s=0;s<i;s++){var a=c(t[s]);0!==a&&(void 0===r&&(r=a<0),r===a<0?(n&&e.push(n),n=[t[s]]):n.push(t[s]))}n&&e.push(n);return e}(o),r=0;r<o.length;r++)for(e=0;e<o[r].length;e++)l(o[r][e])}1===o.length?o=o[0]:f="Multi"+f;var y={type:"Feature",geometry:{type:f,coordinates:o},properties:this.properties};return"id"in this&&(y.id=this.id),y};var l=o,d=y;function y(t,i){this.version=1,this.name=null,this.extent=4096,this.length=0,this._pbf=t,this._keys=[],this._values=[],this._features=[],t.readFields(p,this,i),this.length=this._features.length}function p(t,i,n){15===t?i.version=n.readVarint():1===t?i.name=n.readString():5===t?i.extent=n.readVarint():2===t?i._features.push(n.pos):3===t?i._keys.push(n.readString()):4===t&&i._values.push(function(t){var i=null,n=t.readVarint()+t.pos;for(;t.pos<n;){var r=t.readVarint()>>3;i=1===r?t.readString():2===r?t.readFloat():3===r?t.readDouble():4===r?t.readVarint64():5===r?t.readVarint():6===r?t.readSVarint():7===r?t.readBoolean():null}return i}(n))}y.prototype.feature=function(t){if(t<0||t>=this._features.length)throw new Error("feature index out of bounds");this._pbf.pos=this._features[t];var i=this._pbf.readVarint()+this._pbf.pos;return new l(this._pbf,i,this.extent,this._keys,this._values)};var x=d;function v(t,i,n){if(3===t){var r=new x(n,n.readVarint()+n.pos);r.length&&(i[r.name]=r)}}var g=function(t,i){this.layers=t.readFields(v,{},i)},_={exports:{}};_.exports=M,_.exports.default=M;var m=1e20;function M(t,i,n,r,e,s){this.fontSize=t||24,this.buffer=void 0===i?3:i,this.cutoff=r||.25,this.fontFamily=e||"sans-serif",this.fontWeight=s||"normal",this.radius=n||8;var a=this.size=this.fontSize+2*this.buffer,h=a+2*this.buffer;this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=a,this.ctx=this.canvas.getContext("2d"),this.ctx.font=this.fontWeight+" "+this.fontSize+"px "+this.fontFamily,this.ctx.textAlign="left",this.ctx.fillStyle="black",this.gridOuter=new Float64Array(h*h),this.gridInner=new Float64Array(h*h),this.f=new Float64Array(h),this.z=new Float64Array(h+1),this.v=new Uint16Array(h),this.useMetrics=void 0!==this.ctx.measureText("A").actualBoundingBoxLeft,this.middle=Math.round(a/2*(navigator.userAgent.indexOf("Gecko/")>=0?1.2:1))}function w(t,i,n,r,e,s){for(var a=0;a<i;a++)b(t,a,i,n,r,e,s);for(var h=0;h<n;h++)b(t,h*i,1,i,r,e,s)}function b(t,i,n,r,e,s,a){var h,o,u,f;for(s[0]=0,a[0]=-m,a[1]=m,h=0;h<r;h++)e[h]=t[i+h*n];for(h=1,o=0,u=0;h<r;h++){do{f=s[o],u=(e[h]-e[f]+h*h-f*f)/(h-f)/2}while(u<=a[o]&&--o>-1);s[++o]=h,a[o]=u,a[o+1]=m}for(h=0,o=0;h<r;h++){for(;a[o+1]<h;)o++;f=s[o],t[i+h*n]=e[f]+(h-f)*(h-f)}}M.prototype._draw=function(t,i){var n,r,e,s,a,h,o,u,f,c=this.ctx.measureText(t),l=c.width,d=2*this.buffer;i&&this.useMetrics?(a=Math.floor(c.actualBoundingBoxAscent),u=this.buffer+Math.ceil(c.actualBoundingBoxAscent),h=this.buffer,o=this.buffer,n=(r=Math.min(this.size,Math.ceil(c.actualBoundingBoxRight-c.actualBoundingBoxLeft)))+d,e=(s=Math.min(this.size-h,Math.ceil(c.actualBoundingBoxAscent+c.actualBoundingBoxDescent)))+d,this.ctx.textBaseline="alphabetic"):(n=r=this.size,e=s=this.size,a=19*this.fontSize/24,h=o=0,u=this.middle,this.ctx.textBaseline="middle"),r&&s&&(this.ctx.clearRect(o,h,r,s),this.ctx.fillText(t,this.buffer,u),f=this.ctx.getImageData(o,h,r,s));var y=new Uint8ClampedArray(n*e);return function(t,i,n,r,e,s,a){s.fill(m,0,i*n),a.fill(0,0,i*n);for(var h=(i-r)/2,o=0;o<e;o++)for(var u=0;u<r;u++){var f=(o+h)*i+u+h,c=t.data[4*(o*r+u)+3]/255;if(1===c)s[f]=0,a[f]=m;else if(0===c)s[f]=m,a[f]=0;else{var l=Math.max(0,.5-c),d=Math.max(0,c-.5);s[f]=l*l,a[f]=d*d}}}(f,n,e,r,s,this.gridOuter,this.gridInner),w(this.gridOuter,n,e,this.f,this.v,this.z),w(this.gridInner,n,e,this.f,this.v,this.z),function(t,i,n,r,e,s,a){for(var h=0;h<i*n;h++){var o=Math.sqrt(r[h])-Math.sqrt(e[h]);t[h]=Math.round(255-255*(o/s+a))}}(y,n,e,this.gridOuter,this.gridInner,this.radius,this.cutoff),{data:y,metrics:{width:r,height:s,sdfWidth:n,sdfHeight:e,top:a,left:0,advance:l}}},M.prototype.draw=function(t){return this._draw(t,!1).data},M.prototype.drawWithMetrics=function(t){return this._draw(t,!0)};const B=t(_.exports);export{B as T,g as V,e as r};
