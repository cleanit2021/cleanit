(this["webpackJsonpionic-react-conference-app"]=this["webpackJsonpionic-react-conference-app"]||[]).push([[0],{202:function(e,t,n){"use strict";n.r(t),n.d(t,"createSwipeBackGesture",(function(){return c}));var r=n(25),a=(n(41),n(60)),c=function(e,t,n,c,i){var o=e.ownerDocument.defaultView;return Object(a.createGesture)({el:e,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(e){return e.startX<=50&&t()},onStart:n,onMove:function(e){var t=e.deltaX/o.innerWidth;c(t)},onEnd:function(e){var t=e.deltaX,n=o.innerWidth,a=t/n,c=e.velocityX,u=n/2,s=c>=0&&(c>.2||e.deltaX>u),p=(s?1-a:a)*n,f=0;if(p>5){var d=p/Math.abs(c);f=Math.min(d,540)}i(s,a<=0?.01:Object(r.c)(0,a,.9999),f)}})}}}]);
//# sourceMappingURL=0.b01c7302.chunk.js.map