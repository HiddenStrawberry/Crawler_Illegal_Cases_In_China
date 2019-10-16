define("pages/music_player.js",["biz_wap/utils/mmversion.js","pages/report.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","pages/version4video.js","biz_common/utils/monitor.js","appmsg/log.js"],function(t){
"use strict";
function e(){
b.hasInit||(b.hasInit=!0,p(),d(),u());
}
function o(t){
e(),this._o={
plugins:[],
protocal:"",
wxIndex:0,
type:0,
src:"",
jsapi2Src:"",
mid:"",
autoPlay:!1,
duration:0,
needVioceMutex:!0,
title:"",
allowPause:!1,
singer:"",
epname:"",
coverImgUrl:"",
webUrl:"",
musicbar_url:"",
fileSize:0,
onStatusChange:function(){},
onTimeupdate:function(){},
onError:function(){},
onUpdateSeekRange:function(){}
},this._extend(t),this._status=-1,this._g={
mutexKey:"",
jsapiSrcId:"",
hasCheckPlay:!1,
playTimeoutId:null,
stateChangeCallback:{},
_blockPlugin:{},
hasInitH5Event:!1,
h5Event:{},
totalPlayTime:0
},this._initPlugins(),this._fixAndroidSizeLimit(),0!==b.surportType&&(this._initData(),
this._synPlayStatus());
}
function i(t){
S.invoke("musicPlay",{
app_id:"a",
title:"微信公众平台",
singer:"微信公众平台",
epname:"微信公众平台",
coverImgUrl:"http://res.wx.qq.com/mpres/htmledition/images/favicon.ico",
dataUrl:b.ev,
lowbandUrl:b.ev,
webUrl:"http://mp.weixin.qq.com/s?"
},function(e){
"function"==typeof t&&t(e);
});
}
function n(t){
a({
cur:t,
stopCur:!1
});
}
function a(t){
function e(){
if(b.mutexCount==s&&(s=0,b.mutexCount=0,"function"==typeof n)){
var t=0;
1==b.surportType?t=2e3:3==b.surportType&&(t=0),setTimeout(function(){
n();
},t);
}
}
if(0!=b.mutexCount)return void setTimeout(function(){
a(t);
},200);
var o=t.cur,i=t.stopCur===!0?!0:!1,n=t.callback,s=0;
for(var r in b.mutexPlayers)for(var u=0,p=b.mutexPlayers[r].length;p>u;u++)s++;
for(var r in b.mutexPlayers)for(var u=0,p=b.mutexPlayers[r].length;p>u;u++){
var c=b.mutexPlayers[r][u];
if(c&&c!==o){
var l=c.getSurportType(),d="";
2!=l||1!=c._status&&4!=c._status?1!=l&&3!=l||1!=c._status&&2!=c._status&&4!=c._status||(d="stop"):d=c._o.allowPause?"pause":"stop",
d&&"function"==typeof c[d]?c[d](i,function(){
b.mutexCount++,e();
}):(b.mutexCount++,e());
}else b.mutexCount++,e();
}
}
function s(){
return b.surportType;
}
function r(t){
return new o(t);
}
function u(){
b.surportType>0&&b.isAndroidLow&&window.addEventListener("canplay",function(t){
t.target&&"function"==typeof t.target.play&&t.target.play();
},!0);
}
function p(){
b.jsapiGlobalEvent={
error:_,
pause:y,
stop:h,
play:g,
preempted:h,
waiting:f
};
}
function c(t){
return"&"+b.wxtag+"="+t;
}
function l(t,e){
e=e||"info";
var o="[musicplay]"+t+"[location:"+location.href+"]";
A(o,e);
}
function d(){
S.on("onBackgroundAudioStateChange",function(t){
if(!!b.debug&&console.log("onBackgroundAudioStateChange log:"+JSON.stringify(t||{})),
t.src&&t.state){
var e=P(b.wxtag,t.src)||"";
e&&(e=c(e));
var o=b.mutexPlayers[t.src]||b.mutexPlayers2[t.src]||b.mutexPlayers[e];
if(o){
var i;
if(t.srcId)for(var n=0,a=o.length;a>n;n++)o[n]._g.jsapiSrcId==t.srcId&&(i=o[n]);else if(1==o.length)i=o[0];else for(var n=0,a=o.length;a>n;n++)if(-1!=o[n]._status&&0!=o[n]._status&&3!=o[n]._status){
i=o[n];
break;
}
if(i&&i._g.stateChangeCallback){
var s=t.state;
"ended"==s&&(s="stop"),"wait"==s&&(s="waiting");
var r=!1,u=JSON.stringify(t||{});
if("error"==s){
i.jsapiLog("onBackgroundAudioStateChange error;res:"+u);
for(var p in i._g.stateChangeCallback)i._g.stateChangeCallback.hasOwnProperty(p)&&"function"==typeof i._g.stateChangeCallback[p]&&(r=!0,
i._g.stateChangeCallback[p](-1,t.errMsg||""),i._g.stateChangeCallback[p]=null);
}else"function"==typeof i._g.stateChangeCallback[s]&&(b.debug&&console.log("excute stateChangeCallback :"+s),
i.jsapiLog("onBackgroundAudioStateChange "+s+";res:"+u),r=!0,i._g.stateChangeCallback[s](0),
i._g.stateChangeCallback[s]=null);
r||"function"!=typeof b.jsapiGlobalEvent[s]||(i.jsapiLog("onBackgroundAudioStateChange "+s+" unHandle;res:"+u),
b.jsapiGlobalEvent[s](t,i));
}
}
}
});
}
function _(t,e){
e.stop(!1),e._trigger("jsapi2PlayingErr");
}
function h(t,e){
e.stop(!1),e._trigger("jsapi2PlayingStop");
}
function y(t,e){
e.pause(!1,null,!0),e._trigger("jsapi2PlayingPause");
}
function g(t,e){
1!=e._status&&e.resume(!1,null,!0);
}
function f(t,e){
e.onload();
}
function m(){
for(var t in b.mutexPlayers)if(b.mutexPlayers.hasOwnProperty(t))for(var e=0,o=b.mutexPlayers[t].length;o>e;e++){
var i=b.mutexPlayers[t][e];
if(i&&1==i._status&&(1==i._surportType||3==i._surportType)){
i._trigger("unloadPlaying");
break;
}
}
}
function P(t){
var e=arguments[1]||window.location.search,o=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),i=e.substr(e.indexOf("?")+1).match(o);
return null!=i?i[2]:"";
}
function T(t,e,o){
function i(t,e){
for(;b.synPlayStatusArr.length>0;){
var o=b.synPlayStatusArr.shift();
o&&"function"==typeof o[t]&&o[t](e);
}
}
b.synPlayStatusArr.push({
_t:t,
onSuccess:e,
onError:o
}),b.synPlayStatusId&&clearTimeout(b.synPlayStatusId),b.synPlayStatusId=setTimeout(function(){
t._jsapi_getMusicPlayerState({
onSuccess:function(t){
i("onSuccess",t);
},
onError:function(t){
i("onError",t);
}
});
},0);
}
var v=t("biz_wap/utils/mmversion.js"),S=(t("pages/report.js"),t("biz_common/dom/event.js"),
t("biz_wap/jsapi/core.js")),k=t("pages/version4video.js"),A=(t("biz_common/utils/monitor.js"),
t("appmsg/log.js")),b={
hasInit:!1,
synPlayStatusId:null,
synPlayStatusArr:[],
inWechat:!k.device.inWechat||k.device.inWindowWechat||k.device.inMacWechat?!1:!0,
mutexCount:0,
ev:0!=window._empty_v.indexOf(window.location.protocol)?"http:"+window._empty_v:window._empty_v,
debug:location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,
_playtype:1*P("_playtype")||0,
isAndroidLow:/android\s2\.3/i.test(navigator.userAgent),
isAndroid:v.isAndroid,
surportType:"addEventListener"in window?2:0,
mutexPlayers:{},
mutexPlayers2:{},
wxtag:"__wxtag__"
};
return o.prototype._initPlugins=function(){
for(var t=this._o.plugins,e=0,o=t.length;o>e;++e){
var i=t[e];
i.setPlayer(this),!!i.init&&i.init();
}
},o.prototype._trigger=function(t,e){
var o=this._o,i=this._g,n=o.plugins,a=i._blockPlugin[t]||i._blockPlugin.all,s=0;
if(a&&"function"==typeof a.recv&&(s|=a.recv(t,e),1&s))return!1;
for(var r=0,u=n.length;u>r&&(s|=n[r].recv(t,e),!(2&s));++r);
if(!(4&s)){
var p=this["__"+t+"Handler"];
p&&p.call(this,e);
}
8&s||this.__triggerOutside(t,e);
},o.prototype.__triggerOutside=function(){
var t=arguments,e=t[0];
if(e){
e=e.substr(0,1).toUpperCase()+e.substr(1);
var o=this._o["on"+e];
"function"==typeof o&&o.apply(this,t);
}
},o.prototype._setBlockPlugin=function(t,e){
this._g._blockPlugin[t]=e;
},o.prototype._synPlayStatus=function(){
function t(t){
if(a&&clearTimeout(a),n.hasCheckPlay===!0)return void console.log("ios8 synPlayStatusSuccess hasCheckPlay");
if(n.hasCheckPlay=!0,o._surportType=3,b.surportType=3,!!b.debug&&console.log("_synPlayStatus mutexKey:"+n.mutexKey),
t.src&&(i.src==t.src||t.src.indexOf(n.mutexKey)>=0)){
if(t.srcId){
if(t.srcId!=n.jsapiSrcId)return;
}else if(b.mutexPlayers[n.mutexKey].length>1&&b.mutexPlayers[n.mutexKey][0]!==o)return;
o._initJsapiData({
curTime:t.currentTime,
bufferedPercent:t.bufferedPercent,
starTime:+new Date-1e3*t.currentTime
}),o._trigger("jsapi2Begin2Play",t);
var e=o.jsApiData,s="waiting"==t.playState||"seeked"==t.playState||"seeking"==t.playState||"play"==t.playState;
!t.paused||s?(o._onPlay(),o._analogUpdateTime()):(o._onTimeupdate(null,e.curTime),
o._onPause()),o._getMusicPlayerState();
}
}
function e(){
console.log("ios8 synPlayStatusError"),a&&clearTimeout(a),n.hasCheckPlay!==!0&&(n.hasCheckPlay=!0,
o._o.autoPlay&&o.play());
}
var o=this,i=this._o,n=this._g;
if(!b.inWechat||1*b._playtype>0)return n.hasCheckPlay=!0,void(o._o.autoPlay&&o.play());
var a;
T(o,t,e);
var s=+new Date;
console.log("starTime",s,i.syncTimeout),a=setTimeout(function(){
console.log("ios8 timeout error",+new Date-s),e();
},i.syncTimeout||1e4);
},o.prototype._fixAndroidSizeLimit=function(){
if(!(1*b._playtype>0)&&b.isAndroid){
var t=this._o;
!t.fileSize||t.fileSize>300||v.gtVersion("6.3.28",!0)||(this._trigger("androidForceH5"),
this._g._playtype=2);
}
},o.prototype._createAutoAndPlay=function(){
function t(){
e._trigger("h5Begin2Play"),e._h5Audio=document.createElement("audio"),e._initH5Data(!0),
e._H5bindEvent(!0),e._h5Audio.setAttribute("style","height:0;width:0;display:none"),
e._h5Audio.setAttribute("autoplay",""),e._status=0,e._onLoading(),b.isAndroidLow?(e._h5Audio.src=e._o.src,
document.body.appendChild(e._h5Audio),e._h5Audio.load()):(document.body.appendChild(e._h5Audio),
setTimeout(function(){
e._h5Audio.src=e._o.src,e._h5Audio.play();
},0)),e._surportType=2;
}
var e=this;
b.inWechat?this._stopJsapiPlay(!0,function(){
t();
}):t();
},o.prototype._destoryH5Audio=function(){
this._h5Audio&&(-1!=this._status&&"function"==typeof this._h5Audio.pause&&this._h5Audio.pause(),
document.body.removeChild(this._h5Audio),this._h5Audio=null,this._status=-1);
},o.prototype._onLoading=function(t){
this._status=4;
try{
n(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},o.prototype._onPlay=function(t){
this._status=1;
try{
n(this);
}catch(t){}
"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._startCountTime();
},o.prototype._onPause=function(t){
this._status=2,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},o.prototype._onEnd=function(t){
this._status=3,"function"==typeof this._o.onStatusChange&&this._o.onStatusChange.call(this,t||{},this._status),
this._endCountTime();
},o.prototype._onLoadedmetadata=function(t){
"function"==typeof this._o.onLoadedmetadata&&this._o.onLoadedmetadata.call(this,t||{});
},o.prototype._onUpdateSeekRange=function(t){
this.surportSeekRange()&&(t=Math.max(t,0),t=Math.min(t,100),"function"==typeof this._o.onUpdateSeekRange&&this._o.onUpdateSeekRange.call(this,t));
},o.prototype._onTimeupdate=function(t,e){
"function"==typeof this._o.onTimeupdate&&this._o.onTimeupdate.call(this,t||{},e),
e>0&&this._startCountTime();
},o.prototype._onError=function(t,e){
this._status=-1,"function"==typeof this._o.onError&&this._o.onError.call(this,t||{},e);
},o.prototype._initH5Event=function(){
var t=this,e=this._o,o=this._g;
if(!t._g.hasInitH5Event){
t._g.hasInitH5Event=!0;
var i=o.h5Event;
i.canplaythrough=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 canplaythrough"),t._h5Data.firstCanplaythrough=!0,
t._onPlay(e),t._onUpdateSeekRange(t._h5Data.downloadDuration||0));
},i.play=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),t._h5Data.firstCanplaythrough===!0&&(t._onPlay(e),
t._onUpdateSeekRange(t._h5Data.downloadDuration||0)));
},i.ended=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 ended"),t._onUpdateSeekRange(t._h5Data.downloadDuration),
t._onEnd(e));
},i.pause=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 pause"),t._o.allowPause!==!0||0==t._h5Audio.currentTime?t._onEnd(e):t._onPause(e));
},i.waiting=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),(1==t._status||2==t._status||4==t._status)&&t._onLoading(e));
};
var n,a=100;
i.seeking=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 "+e.type),(1==t._status||2==t._status||4==t._status)&&t._onLoading(e),
n=setTimeout(function(){
!!b.debug&&console.log("seek loading Timeout excute"),n=null,t._trigger("seekNeed2Load");
},a));
},i.seeked=function(e){
t._h5Audio&&(!!b.debug&&console.log("h5 seeked"),(1==t._status||2==t._status||4==t._status)&&(t._onPlay(e),
t._h5Audio.play()),n&&(clearTimeout(n),n=null,t._trigger("seekNotNeed2Load")));
},i.error=function(e){
var o=1*e.target.error.code||5;
(1>o||o>5)&&(o=5),t._trigger("h5Error",{
code:o
}),t._onError(e,{
type:1,
code:o
}),t._destoryH5Audio();
},i.timeupdate=function(o){
t._h5Audio&&((1==t._status||4==t._status)&&t._onUpdateSeekRange(t._getH5DownloadDuration()),
1==t._status&&t._onTimeupdate(o,t._h5Audio.currentTime),"undefined"!=typeof e.duration&&1*e.duration>0&&t._h5Audio.currentTime>=e.duration&&t._h5Stop());
},i.loadedmetadata=function(e){
t._h5Audio&&t._onLoadedmetadata(e);
};
}
},o.prototype._H5bindEvent=function(t){
var e=(this._o,this._g),o={
canplaythrough:"canplaythrough",
play:"play",
playing:"play",
ended:"ended",
pause:"pause",
seeking:"seeking",
waiting:"waiting",
seeked:"seeked",
error:"error"
};
try{
for(var i in o)o.hasOwnProperty(i)&&this._h5Audio.removeEventListener(i,e.h5Event[o[i]]);
this._h5Audio.removeEventListener("timeupdate",e.h5Event.timeupdate),this._h5Audio.removeEventListener("loadedmetadata",e.h5Event.loadedmetadata);
}catch(n){}
if(t){
for(var i in o)o.hasOwnProperty(i)&&this._h5Audio.addEventListener(i,e.h5Event[o[i]],!1);
"function"==typeof this._o.onTimeupdate&&this._h5Audio.addEventListener("timeupdate",e.h5Event.timeupdate,!1),
"function"==typeof this._o.onLoadedmetadata&&this._h5Audio.addEventListener("loadedmetadata",e.h5Event.loadedmetadata,!1);
}
},o.prototype._initData=function(){
var t=this._o;
this._createMutexKey(),b.mutexPlayers[this._g.mutexKey]?b.mutexPlayers[this._g.mutexKey].push(this):b.mutexPlayers[this._g.mutexKey]=[this],
t.jsapi2Src&&t.jsapi2Src!=t.src&&(b.mutexPlayers2[t.jsapi2Src]?b.mutexPlayers2[t.jsapi2Src].push(this):b.mutexPlayers2[t.jsapi2Src]=[this]),
this._initH5Event();
},o.prototype._createMutexKey=function(){
var t=this._o.mid||"";
this._o.src?(this._g.mutexKey=this._o.src,this._g.jsapiSrcId=b.wxtag+"_"+this._o.wxIndex):(this._g.mutexKey=c(t),
this._g.jsapiSrcId=this._g.mutexKey+"_"+this._o.wxIndex);
},o.prototype._extend=function(t){
for(var e in t)this._o[e]=t[e];
},o.prototype._initH5Data=function(t){
this._h5Data={
firstCanplaythrough:t===!0?!1:!0,
downloadDuration:0,
lastPlaytime:null
};
},o.prototype._initJsapiData=function(t){
t=t||{},this.jsApiData&&(this.jsApiData.updateTimeoutId&&clearTimeout(this.jsApiData.updateTimeoutId),
this.jsApiData.getStatusId&&clearTimeout(this.jsApiData.getStatusId)),this.jsApiData={
getStatusId:null,
getStatusTime:t.getStatusTime||2500,
updateTimeoutId:null,
seeking:!1,
starTime:t.starTime||+new Date,
curTime:t.curTime||0,
bufferedPercent:t.bufferedPercent||0,
duration:this._o.duration||void 0,
lastPlaytime:null
};
},o.prototype._getMusicPlayerState=function(){
var t=this,e=t._o,o=t.jsApiData;
o&&o.getStatusId&&clearTimeout(o.getStatusId),t._jsapi_getMusicPlayerState({
onSuccess:function(i){
(i.src==e.jsapi2Src||i.src==e.src)&&(o.curTime=i.currentTime,o.starTime=+new Date-1e3*i.currentTime,
o.bufferedPercent=i.bufferedPercent,(1==t._status||2==t._status||4==t._status)&&(o.getStatusId=setTimeout(function(){
t._getMusicPlayerState();
},o.getStatusTime)),t._onUpdateSeekRange(o.bufferedPercent),1==i.paused&&1==t._status?(b.debug&&console.log("_getMusicPlayerState force syn"),
t._pauseJsapiPlay(!1)):0==i.paused&&2==t._status&&(b.debug&&console.log("_getMusicPlayerState force syn"),
t._resumeJsapiPlay(!1))),t._o.onMusicPlayerInfo&&t._o.onMusicPlayerInfo(i);
},
onError:function(){
o.getStatusId=setTimeout(function(){
t._getMusicPlayerState();
},o.getStatusTime);
}
});
},o.prototype._analogUpdateTime=function(){
var t=this,e=t.jsApiData;
if(e){
if(e.updateTimeoutId&&clearTimeout(e.updateTimeoutId),1==t._status||2==t._status){
if(1==t._status&&(e.curTime=1*((+new Date-e.starTime)/1e3).toFixed(2)),e.curTime>=e.duration)return t._stopJsapiPlay(!1),
!0;
t._onTimeupdate(null,e.curTime);
}
return e.updateTimeoutId=setTimeout(function(){
t._analogUpdateTime();
},1e3),!1;
}
},o.prototype._jsapi_getMusicPlayerState=function(t){
var e=this._o;
S.invoke("getBackgroundAudioState",{},function(o){
if(!!b.debug&&console.log("getBackgroundAudioState log:"+JSON.stringify(o||{})),
/:ok$/.test(o.err_msg)){
if(o.paused=1*o.paused,o.currentTime=o.currentTime?(1*o.currentTime).toFixed(2):0,
o.buffered){
var i=Math.floor(o.buffered/e.duration*100);
i=Math.max(i,0),i=Math.min(i,100),o.bufferedPercent=i;
}else o.bufferedPercent=0;
"function"==typeof t.onSuccess&&t.onSuccess(o);
}else"function"==typeof t.onError&&(console.log("get err invoke err",o),t.onError(o));
});
},o.prototype._jsapi_musicPlay=function(t){
if(this._h5Audio&&this._destoryH5Audio(),2==b._playtype)return void("function"==typeof t.onError&&t.onError({}));
var e=this,o=this._o;
this.jsapiLog("jsapi_musicPlay"),S.invoke("musicPlay",{
app_id:"a",
title:o.title,
singer:o.singer,
epname:o.epname,
coverImgUrl:o.coverImgUrl,
dataUrl:o.src,
lowbandUrl:o.src,
webUrl:o.webUrl
},function(i){
!!b.debug&&console.log("playlog:"+JSON.stringify(i||{})),i.err_msg.indexOf("ok")>=0?(e._trigger("jsapi1Begin2Play"),
e._surportType=1,b.surportType=1,e._initJsapiData(),e._onPlay(),"undefined"!=typeof o.duration&&1*o.duration>0&&e._analogUpdateTime(),
e._onUpdateSeekRange(0),"function"==typeof t.onSuccess&&t.onSuccess(i)):"function"==typeof t.onError&&t.onError(i);
});
},o.prototype._jsapi_setBackgroundAudioState=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];
this._h5Audio&&this._destoryH5Audio(),console.log("_playtype",b._playtype);
var e=t.onSuccess,o=t.onError,i=t.needStartMusicUI;
if("function"!=typeof e&&(e=function(){}),"function"!=typeof o&&(o=function(){}),
1*b._playtype>0){
var n={};
return n.err_code=1,void o(n);
}
var a=this,s=this._o,r=a._g;
console.log("invoke set setBackgroundAudioState with param",s),this.jsapiLog("jsapi_setBackgroundAudioState"),
S.invoke("setBackgroundAudioState",{
protocol:s.protocal||"",
src:s.jsapi2Src||s.src,
lowbandUrl:s.jsapi2Src||s.src,
title:s.title,
epname:s.epname,
singer:s.singer,
srcId:r.jsapiSrcId,
coverImgUrl:s.coverImgUrl,
webUrl:s.webUrl,
musicbar_url:s.musicbar_url||"",
needStartMusicUI:1*i>0?1:0
},function(t){
if(!!b.debug&&console.log("setBackgroundAudioState log:"+JSON.stringify(t||{})),
t.err_msg.indexOf("ok")>=0){
var n=1*a._status;
!i||1!==n&&2!==n&&4!==n?(e("waiting"),r.stateChangeCallback.play=function(t,i){
0==t?e("play"):0!=t&&o({
err_code:2,
err_msg:i||""
});
}):e();
}else t=t||{},t.err_code=1,o(t);
});
},o.prototype._jsapi_operateBackgroundAudio=function(t){
var e=this,o=(this._o,e._g),i=1*t.position||0;
this.jsapiLog("jsapi_operateBackgroundAudio;param:"+JSON.stringify(t||{})),S.invoke("operateBackgroundAudio",{
operationType:t.type,
currentTime:i
},function(e){
if(!!b.debug&&console.log("operateBackgroundAudio "+t.type+",position:"+i+", log:"+JSON.stringify(e||{})),
e.err_msg.indexOf("ok")>=0){
var n=t.type;
"seek"==n?(o.stateChangeCallback.seeking=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("seeking",i):0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:o||""
});
},o.stateChangeCallback.seeked=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess("seeked",i):0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:o||""
});
}):o.stateChangeCallback[n]=function(e,o){
0==e&&"function"==typeof t.onSuccess?t.onSuccess():0!=e&&"function"==typeof t.onError&&t.onError({
err_msg:o||""
});
};
}else"function"==typeof t.onError&&t.onError(e);
});
},o.prototype._jsapiPlay=function(){
{
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=this;
this._o;
}
console.log("supporttype",b.surportType);
var o=t.onError,i=t.onSuccess,n=t.needStartMusicUI;
"function"!=typeof o&&(o=function(){}),"function"!=typeof i&&(i=function(){}),1==b.surportType?n?o():this._jsapi_musicPlay({
onError:function(){
e._h5Play();
}
}):this._jsapi_setBackgroundAudioState({
needStartMusicUI:n,
onSuccess:function(t){
"waiting"===t?(e._trigger("jsapi2Begin2Play",t),e._initJsapiData(),e._surportType=3,
b.surportType=3,e._onLoading()):"play"===t&&(e._initJsapiData(),e._onPlay(),e._analogUpdateTime(),
e._getMusicPlayerState(),e._trigger("jsapi2PlaySuccess")),"function"==typeof i&&(i(),
i=null,o=null);
},
onError:function(t){
t&&1==t.err_code&&!n?e._jsapi_musicPlay({
onError:function(){
e._h5Play();
}
}):(n||e._h5Play(),e._trigger("jsapi2Begin2PlayErr")),"function"==typeof o&&(o(),
o=null,i=null);
}
});
},o.prototype._getJsapiDownloadSec=function(){
this._getMusicPlayerState();
var t=Math.floor(this._o.duration*this.jsApiData.bufferedPercent/100);
return!!b.debug&&console.log("downloadSec:"+t),t;
},o.prototype._jsapiSeek=function(t){
function e(){
n.seeking=!1,o._onPlay(),console.log("seek toPlay position is",b.seekingPosition),
n.starTime=+new Date-1e3*b.seekingPosition,o._analogUpdateTime(),o._getMusicPlayerState();
}
var o=this,i=this._g,n=(this._o,this.jsApiData),a=parseInt(t,10);
this._o.duration&&a>=this._o.duration&&(a=this._o.duration-1),n.getStatusId&&clearTimeout(n.getStatusId),
n.updateTimeoutId&&clearTimeout(n.updateTimeoutId),n.seekWaitId&&clearTimeout(n.seekWaitId),
n.seeking=!0;
var s,r,u=100;
b.seekingPosition=a,console.log("begin to seek to",a),this._jsapi_operateBackgroundAudio({
type:"seek",
position:a,
onError:function(){
o._trigger("seekErr"),!!b.debug&&console.log("seek callback fail"),n.seeking=!1,
o._analogUpdateTime(),o._getMusicPlayerState();
},
onSuccess:function(t){
console.log("jsapi seek res is ",t),"seeking"==t?(!!b.debug&&console.log("seeking callback success"),
n.seeking=!0,o._onLoading(),i.stateChangeCallback.play=function(){
!!b.debug&&console.log("seeked to play"),s&&clearTimeout(s),e();
},r=setTimeout(function(){
!!b.debug&&console.log("seek loading Timeout excute"),r=null,o._trigger("seekNeed2Load");
},u)):"seeked"==t&&(!!b.debug&&console.log("seeked callback success"),(2==o._status||4==o._status)&&(s=setTimeout(function(){
!!b.debug&&console.log("setTimeout to play"),i.stateChangeCallback.play=null,n.seeking=!1,
n.curTime=a,o._resumeJsapiPlay(!0);
},1e3)),r&&(clearTimeout(r),r=null,o._trigger("seekNotNeed2Load")));
}
}),o._getMusicPlayerState();
},o.prototype._resumeJsapiPlay=function(t,e){
function o(t){
var e=i.jsApiData;
e.starTime=+new Date-1e3*e.curTime,i._onPlay(),i._analogUpdateTime(),i._getMusicPlayerState(),
"function"==typeof t&&t();
}
var i=this;
1==this._surportType?this._jsapiPlay():3==this._surportType&&(t?this._jsapi_operateBackgroundAudio({
type:"play",
onError:function(){
i._stopJsapiPlay(!1,function(){
i.play();
});
},
onSuccess:function(){
o(e);
}
}):o(e));
},o.prototype._pauseJsapiPlay=function(t,e,o){
function i(t){
var e=n.jsApiData;
n._analogUpdateTime(),n._getMusicPlayerState(),e.updateTimeoutId=null,t===!0&&e&&e.getStatusId&&clearTimeout(e.getStatusId),
1==n._status&&n._onPause();
}
var n=this;
return 2==n._status?(i(e),void("function"==typeof o&&o())):void(1==this._surportType?this._stopJsapiPlay(t,o):3==this._surportType&&(t?this._jsapi_operateBackgroundAudio({
type:"pause",
onSuccess:function(){
i(e),"function"==typeof o&&o();
},
onError:function(){
n._stopJsapiPlay(!0,o);
}
}):(i(e),"function"==typeof o&&o())));
},o.prototype._stopJsapiPlay=function(t,e){
function o(t){
n._onTimeupdate(null,0),n._onUpdateSeekRange(0),n._onEnd(),n._initJsapiData(),"function"==typeof t&&t();
}
{
var n=this;
n.jsApiData;
}
t?1==n._surportType?i(function(){
o(e);
}):n._jsapi_operateBackgroundAudio({
type:"stop",
onSuccess:function(){
o(e);
},
onError:function(){
o(e);
}
}):o(e);
},o.prototype._getH5DownloadSec=function(){
var t=Math.floor(this._o.duration*this._getH5DownloadDuration()/100);
return!!b.debug&&console.log("h5 downloadSec:"+t),t;
},o.prototype._getH5DownloadDuration=function(){
if(!this._h5Audio)return 0;
if(this._h5Data.downloadDuration>=100)return 100;
var t=this._h5Audio.buffered,e=t.end(t.length-1);
return this._h5Data.downloadDuration=parseInt(e/this._o.duration*100,10),this._h5Data.downloadDuration;
},o.prototype._h5Play=function(){
0!==b.surportType&&(this.jsapiLog("h5Play"),this._h5Audio?(this._h5Audio.ended||this._h5Audio.paused)&&(this._trigger("h5Begin2Play"),
this._initH5Data(),this._onLoading(),this._H5bindEvent(!0),this._h5Audio.currentTime=0):this._createAutoAndPlay());
},o.prototype._h5Resume=function(){
this._h5Audio&&this._h5Audio.play();
},o.prototype._h5Stop=function(){
this._h5Audio&&(this._onUpdateSeekRange(0),this._onEnd(),this._H5bindEvent(!1),this._h5Audio.pause(),
this._h5Audio.currentTime=0,this._initH5Data());
},o.prototype._h5Seek=function(t){
if(this._h5Audio){
var e=(this._h5Data,parseInt(t,10));
e=Math.min(e,this._o.duration),!!b.debug&&console.log("h5 seek position:"+e),this._h5Audio.currentTime=e;
}
},o.prototype._startCountTime=function(){
1!=this._surportType&&3!=this._surportType||!this.jsApiData?this._h5Audio&&this._h5Data&&null===this._h5Data.lastPlaytime&&(this._h5Data.lastPlaytime=this._h5Audio.currentTime):null===this.jsApiData.lastPlaytime&&(this.jsApiData.lastPlaytime=this.jsApiData.curTime);
},o.prototype._endCountTime=function(){
if(1!=this._surportType&&3!=this._surportType||!this.jsApiData){
if(this._h5Audio&&this._h5Data){
var t=this._h5Audio,e=this._h5Data;
t.currentTime>0&&t.currentTime>e.lastPlaytime&&null!==e.lastPlaytime&&(this._g.totalPlayTime+=t.currentTime-e.lastPlaytime),
e.lastPlaytime=null;
}
}else{
var o=this.jsApiData;
o.curTime>0&&o.curTime>o.lastPlaytime&&null!==o.lastPlaytime&&(this._g.totalPlayTime+=o.curTime-o.lastPlaytime),
o.lastPlaytime=null;
}
},o.prototype._delMutexPlayers=function(){
var t=this._o,e=this._g.mutexKey,o=b.mutexPlayers[e];
if(o){
for(var i=0,n=o.length;n>i;i++)if(o[i]===this){
o.splice(i,1);
break;
}
if(0==o.length)try{
delete b.mutexPlayers[e];
}catch(a){}
}
if(t.jsapi2Src&&b.mutexPlayers2[t.jsapi2Src]){
for(var s=b.mutexPlayers2[t.jsapi2Src],i=0,n=s.length;n>i;i++)if(s[i]===this){
s.splice(i,1);
break;
}
if(0==s.length)try{
delete b.mutexPlayers2[t.jsapi2Src];
}catch(a){}
}
},o.prototype.resetPlayTotalTime=function(){
this._g.totalPlayTime=0;
},o.prototype.getPlayTotalTime=function(){
return this._endCountTime(),this._g.totalPlayTime;
},o.prototype.surportSeekRange=function(){
return 1==b._playtype?!1:2==this._surportType||3==this._surportType?!0:!1;
},o.prototype.setSrc=function(t){
-1==t.indexOf("?")&&(t+="?"),t+=c(this._o.mid),this._o.src=t,this._delMutexPlayers(),
this._g.mutexKey=this._o.src,b.mutexPlayers[this._g.mutexKey]?b.mutexPlayers[this._g.mutexKey].push(this):b.mutexPlayers[this._g.mutexKey]=[this];
},o.prototype.getSrc=function(){
return this._o.src||"";
},o.prototype.setDuration=function(t){
this._o.duration=t||0;
},o.prototype.getSurportType=function(){
return this._surportType||0;
},o.prototype.getPlayStatus=function(){
return this._status;
},o.prototype.getCurTime=function(){
return 1!=this._surportType&&3!=this._surportType||!this.jsApiData?this._h5Audio?this._h5Audio.currentTime:0:this.jsApiData.curTime||0;
},o.prototype.getDuration=function(){
return this._o.duration||void 0;
},o.prototype.pause=function(t,e,o){
return o===!0||this._o.allowPause?void(1==this._surportType||3==this._surportType?this._pauseJsapiPlay(t===!1?!1:!0,!1,function(){
"function"==typeof e&&e();
},function(){
"function"==typeof e&&e();
}):2==this._surportType&&this._h5Audio&&"function"==typeof this._h5Audio.pause&&(this._h5Audio.pause(),
"function"==typeof e&&e())):void this.stop(t,e);
},o.prototype.stop=function(t,e){
return 1==this._surportType||3==this._surportType?void this._stopJsapiPlay(t===!1?!1:!0,e):(2==this._surportType&&this._h5Audio&&this._h5Stop(),
void("function"==typeof e&&e()));
},o.prototype.destory=function(){
this.stop(),this._h5Audio&&(document.body.removeChild(this._h5Audio),this._h5Audio=null),
this._delMutexPlayers();
},o.prototype.resume=function(t,e,o){
(o===!0||2==this._status&&this._o.allowPause)&&(2==this._surportType&&this._h5Audio?this._h5Resume():b.inWechat&&this._resumeJsapiPlay(t===!1?!1:!0));
},o.prototype.onload=function(){
this._onLoading();
},o.prototype.jsapiLog=function(t,e){
try{
var o=this._o,i={
type:o.type,
src:o.src,
mid:o.mid,
protocal:o.protocal,
webUrl:o.webUrl,
musicbar_url:o.musicbar_url
},n="["+JSON.stringify(i)+"]"+t;
l(n,e);
}catch(a){}
},o.prototype.openStartMusicUI=function(){
var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=t.onError,o=t.onSuccess;
"function"!=typeof e&&(e=function(){}),"function"!=typeof o&&(o=function(){}),v.isWechat&&(v.isIOS||v.isAndroid)&&v.gtVersion("7.0.5",!0)?this._jsapiPlay({
needStartMusicUI:!0,
onError:function(){
e();
},
onSuccess:function(){
o();
}
}):e();
},o.prototype.play=function(){
var t=this,e=this._g;
if(t._o.src)return console.log("before play status is",t._status,e.hasCheckPlay),
2==t._status&&t._o.allowPause?void t.resume():(e.playTimeoutId&&clearTimeout(e.playTimeoutId),
e.hasCheckPlay?void(b.inWechat?(console.log("jsapi play"),this._jsapiPlay()):0!=b.surportType&&this._h5Play()):void(e.playTimeoutId=setTimeout(function(){
t.play();
},1e3)));
},o.prototype.seek=function(t){
{
var e=this;
this._g;
}
return 1!=e._status&&2!=e._status?void console.log("player status is",e._status):(console.log("support type is",this._surportType,t),
3==this._surportType?(this._endCountTime(),void this._jsapiSeek(t)):2==this._surportType&&this._h5Audio?(this._endCountTime(),
void this._h5Seek(t)):void 0);
},o.prototype.getBackgroundAudioState=function(t){
t||(t={}),S.invoke("getBackgroundAudioState",{},function(e){
/:ok$/.test(e.err_msg)?(e.paused=1*e.paused,t.success&&t.success(e)):t.error&&t.error(e);
});
},o.prototype.setOption=function(t){
this._extend(t),t.duration&&this.jsApiData&&(this.jsApiData.duration=t.duration);
},{
init:r,
triggerUnloadPlaying:m,
isAndroid:b.isAndroid,
getSurportType:s,
getQuery:P
};
});!function(e){
var c="object"==typeof window&&window||"object"==typeof self&&self;
"function"==typeof define?define("biz_common/utils/emoji_data.js",[],function(c,o){
"use strict";
return e(o);
}):c&&"undefined"==typeof c.__emojiData&&(c.__emojiData=e({}));
}(function(){
return[{
id:0,
cn:"[微笑]",
hk:"[微笑]",
us:"[Smile]",
code:"/::)",
web_code:"/微笑",
style:"icon_smiley_0"
},{
id:1,
cn:"[撇嘴]",
hk:"[撇嘴]",
us:"[Grimace]",
code:"/::~",
web_code:"/撇嘴",
style:"icon_smiley_1"
},{
id:2,
cn:"[色]",
hk:"[色]",
us:"[Drool]",
code:"/::B",
web_code:"/色",
style:"icon_smiley_2"
},{
id:3,
cn:"[发呆]",
hk:"[發呆]",
us:"[Scowl]",
code:"/::|",
web_code:"/发呆",
style:"icon_smiley_3"
},{
id:4,
cn:"[得意]",
hk:"[得意]",
us:"[CoolGuy]",
code:"/:8-)",
web_code:"/得意",
style:"icon_smiley_4"
},{
id:5,
cn:"[流泪]",
hk:"[流淚]",
us:"[Sob]",
code:"/::<",
web_code:"/流泪",
style:"icon_smiley_5"
},{
id:6,
cn:"[害羞]",
hk:"[害羞]",
us:"[Shy]",
code:"/::$",
web_code:"/害羞",
style:"icon_smiley_6"
},{
id:7,
cn:"[闭嘴]",
hk:"[閉嘴]",
us:"[Silent]",
code:"/::X",
web_code:"/闭嘴",
style:"icon_smiley_7"
},{
id:8,
cn:"[睡]",
hk:"[睡]",
us:"[Sleep]",
code:"/::Z",
web_code:"/睡",
style:"icon_smiley_8"
},{
id:9,
cn:"[大哭]",
hk:"[大哭]",
us:"[Cry]",
code:"/::'(",
web_code:"/大哭",
style:"icon_smiley_9"
},{
id:10,
cn:"[尴尬]",
hk:"[尷尬]",
us:"[Awkward]",
code:"/::-|",
web_code:"/尴尬",
style:"icon_smiley_10"
},{
id:11,
cn:"[发怒]",
hk:"[發怒]",
us:"[Angry]",
code:"/::@",
web_code:"/发怒",
style:"icon_smiley_11"
},{
id:12,
cn:"[调皮]",
hk:"[調皮]",
us:"[Tongue]",
code:"/::P",
web_code:"/调皮",
style:"icon_smiley_12"
},{
id:13,
cn:"[呲牙]",
hk:"[呲牙]",
us:"[Grin]",
code:"/::D",
web_code:"/呲牙",
style:"icon_smiley_13"
},{
id:14,
cn:"[惊讶]",
hk:"[驚訝]",
us:"[Surprise]",
code:"/::O",
web_code:"/惊讶",
style:"icon_smiley_14"
},{
id:15,
cn:"[难过]",
hk:"[難過]",
us:"[Frown]",
code:"/::(",
web_code:"/难过",
style:"icon_smiley_15"
},{
id:16,
cn:"[酷]",
hk:"[酷]",
us:"[Ruthless]",
code:"/::+",
web_code:"/酷",
style:"icon_smiley_16"
},{
id:17,
cn:"[冷汗]",
hk:"[冷汗]",
us:"[Blush]",
code:"/:--b",
web_code:"/冷汗",
style:"icon_smiley_17"
},{
id:18,
cn:"[抓狂]",
hk:"[抓狂]",
us:"[Scream]",
code:"/::Q",
web_code:"/抓狂",
style:"icon_smiley_18"
},{
id:19,
cn:"[吐]",
hk:"[吐]",
us:"[Puke]",
code:"/::T",
web_code:"/吐",
style:"icon_smiley_19"
},{
id:20,
cn:"[偷笑]",
hk:"[偷笑]",
us:"[Chuckle]",
code:"/:,@P",
web_code:"/偷笑",
style:"icon_smiley_20"
},{
id:21,
cn:"[愉快]",
hk:"[愉快]",
us:"[Joyful]",
code:"/:,@-D",
web_code:"/可爱",
style:"icon_smiley_21"
},{
id:22,
cn:"[白眼]",
hk:"[白眼]",
us:"[Slight]",
code:"/::d",
web_code:"/白眼",
style:"icon_smiley_22"
},{
id:23,
cn:"[傲慢]",
hk:"[傲慢]",
us:"[Smug]",
code:"/:,@o",
web_code:"/傲慢",
style:"icon_smiley_23"
},{
id:24,
cn:"[饥饿]",
hk:"[饑餓]",
us:"[Hungry]",
code:"/::g",
web_code:"/饥饿",
style:"icon_smiley_24"
},{
id:25,
cn:"[困]",
hk:"[累]",
us:"[Drowsy]",
code:"/:|-)",
web_code:"/困",
style:"icon_smiley_25"
},{
id:26,
cn:"[惊恐]",
hk:"[驚恐]",
us:"[Panic]",
code:"/::!",
web_code:"/惊恐",
style:"icon_smiley_26"
},{
id:27,
cn:"[流汗]",
hk:"[流汗]",
us:"[Sweat]",
code:"/::L",
web_code:"/流汗",
style:"icon_smiley_27"
},{
id:28,
cn:"[憨笑]",
hk:"[大笑]",
us:"[Laugh]",
code:"/::>",
web_code:"/憨笑",
style:"icon_smiley_28"
},{
id:29,
cn:"[悠闲]",
hk:"[悠閑]",
us:"[Commando]",
code:"/::,@",
web_code:"/大兵",
style:"icon_smiley_29"
},{
id:30,
cn:"[奋斗]",
hk:"[奮鬥]",
us:"[Determined]",
code:"/:,@f",
web_code:"/奋斗",
style:"icon_smiley_30"
},{
id:31,
cn:"[咒骂]",
hk:"[咒罵]",
us:"[Scold]",
code:"/::-S",
web_code:"/咒骂",
style:"icon_smiley_31"
},{
id:32,
cn:"[疑问]",
hk:"[疑問]",
us:"[Shocked]",
code:"/:?",
web_code:"/疑问",
style:"icon_smiley_32"
},{
id:33,
cn:"[嘘]",
hk:"[噓]",
us:"[Shhh]",
code:"/:,@x",
web_code:"/嘘",
style:"icon_smiley_33"
},{
id:34,
cn:"[晕]",
hk:"[暈]",
us:"[Dizzy]",
code:"/:,@@",
web_code:"/晕",
style:"icon_smiley_34"
},{
id:35,
cn:"[疯了]",
hk:"[瘋了]",
us:"[Tormented]",
code:"/::8",
web_code:"/折磨",
style:"icon_smiley_35"
},{
id:36,
cn:"[衰]",
hk:"[衰]",
us:"[Toasted]",
code:"/:,@!",
web_code:"/衰",
style:"icon_smiley_36"
},{
id:37,
cn:"[骷髅]",
hk:"[骷髏頭]",
us:"[Skull]",
code:"/:!!!",
web_code:"/骷髅",
style:"icon_smiley_37"
},{
id:38,
cn:"[敲打]",
hk:"[敲打]",
us:"[Hammer]",
code:"/:xx",
web_code:"/敲打",
style:"icon_smiley_38"
},{
id:39,
cn:"[再见]",
hk:"[再見]",
us:"[Wave]",
code:"/:bye",
web_code:"/再见",
style:"icon_smiley_39"
},{
id:40,
cn:"[擦汗]",
hk:"[擦汗]",
us:"[Speechless]",
code:"/:wipe",
web_code:"/擦汗",
style:"icon_smiley_40"
},{
id:41,
cn:"[抠鼻]",
hk:"[摳鼻]",
us:"[NosePick]",
code:"/:dig",
web_code:"/抠鼻",
style:"icon_smiley_41"
},{
id:42,
cn:"[鼓掌]",
hk:"[鼓掌]",
us:"[Clap]",
code:"/:handclap",
web_code:"/鼓掌",
style:"icon_smiley_42"
},{
id:43,
cn:"[糗大了]",
hk:"[羞辱]",
us:"[Shame]",
code:"/:&-(",
web_code:"/糗大了",
style:"icon_smiley_43"
},{
id:44,
cn:"[坏笑]",
hk:"[壞笑]",
us:"[Trick]",
code:"/:B-)",
web_code:"/坏笑",
style:"icon_smiley_44"
},{
id:45,
cn:"[左哼哼]",
hk:"[左哼哼]",
us:"[Bah！L]",
code:"/:<@",
web_code:"/左哼哼",
style:"icon_smiley_45"
},{
id:46,
cn:"[右哼哼]",
hk:"[右哼哼]",
us:"[Bah！R]",
code:"/:@>",
web_code:"/右哼哼",
style:"icon_smiley_46"
},{
id:47,
cn:"[哈欠]",
hk:"[哈欠]",
us:"[Yawn]",
code:"/::-O",
web_code:"/哈欠",
style:"icon_smiley_47"
},{
id:48,
cn:"[鄙视]",
hk:"[鄙視]",
us:"[Pooh-pooh]",
code:"/:>-|",
web_code:"/鄙视",
style:"icon_smiley_48"
},{
id:49,
cn:"[委屈]",
hk:"[委屈]",
us:"[Shrunken]",
code:"/:P-(",
web_code:"/委屈",
style:"icon_smiley_49"
},{
id:50,
cn:"[快哭了]",
hk:"[快哭了]",
us:"[TearingUp]",
code:"/::'|",
web_code:"/快哭了",
style:"icon_smiley_50"
},{
id:51,
cn:"[阴险]",
hk:"[陰險]",
us:"[Sly]",
code:"/:X-)",
web_code:"/阴险",
style:"icon_smiley_51"
},{
id:52,
cn:"[亲亲]",
hk:"[親親]",
us:"[Kiss]",
code:"/::*",
web_code:"/亲亲",
style:"icon_smiley_52"
},{
id:53,
cn:"[吓]",
hk:"[嚇]",
us:"[Wrath]",
code:"/:@x",
web_code:"/吓",
style:"icon_smiley_53"
},{
id:54,
cn:"[可怜]",
hk:"[可憐]",
us:"[Whimper]",
code:"/:8*",
web_code:"/可怜",
style:"icon_smiley_54"
},{
id:55,
cn:"[菜刀]",
hk:"[菜刀]",
us:"[Cleaver]",
code:"/:pd",
web_code:"/菜刀",
style:"icon_smiley_55"
},{
id:56,
cn:"[西瓜]",
hk:"[西瓜]",
us:"[Watermelon]",
code:"/:<W>",
web_code:"/西瓜",
style:"icon_smiley_56"
},{
id:57,
cn:"[啤酒]",
hk:"[啤酒]",
us:"[Beer]",
code:"/:beer",
web_code:"/啤酒",
style:"icon_smiley_57"
},{
id:58,
cn:"[篮球]",
hk:"[籃球]",
us:"[Basketball]",
code:"/:basketb",
web_code:"/篮球",
style:"icon_smiley_58"
},{
id:59,
cn:"[乒乓]",
hk:"[乒乓]",
us:"[PingPong]",
code:"/:oo",
web_code:"/乒乓",
style:"icon_smiley_59"
},{
id:60,
cn:"[咖啡]",
hk:"[咖啡]",
us:"[Coffee]",
code:"/:coffee",
web_code:"/咖啡",
style:"icon_smiley_60"
},{
id:61,
cn:"[饭]",
hk:"[飯]",
us:"[Rice]",
code:"/:eat",
web_code:"/饭",
style:"icon_smiley_61"
},{
id:62,
cn:"[猪头]",
hk:"[豬頭]",
us:"[Pig]",
code:"/:pig",
web_code:"/猪头",
style:"icon_smiley_62"
},{
id:63,
cn:"[玫瑰]",
hk:"[玫瑰]",
us:"[Rose]",
code:"/:rose",
web_code:"/玫瑰",
style:"icon_smiley_63"
},{
id:64,
cn:"[凋谢]",
hk:"[枯萎]",
us:"[Wilt]",
code:"/:fade",
web_code:"/凋谢",
style:"icon_smiley_64"
},{
id:65,
cn:"[嘴唇]",
hk:"[嘴唇]",
us:"[Lips]",
code:"/:showlove",
web_code:"/示爱",
style:"icon_smiley_65"
},{
id:66,
cn:"[爱心]",
hk:"[愛心]",
us:"[Heart]",
code:"/:heart",
web_code:"/爱心",
style:"icon_smiley_66"
},{
id:67,
cn:"[心碎]",
hk:"[心碎]",
us:"[BrokenHeart]",
code:"/:break",
web_code:"/心碎",
style:"icon_smiley_67"
},{
id:68,
cn:"[蛋糕]",
hk:"[蛋糕]",
us:"[Cake]",
code:"/:cake",
web_code:"/蛋糕",
style:"icon_smiley_68"
},{
id:69,
cn:"[闪电]",
hk:"[閃電]",
us:"[Lightning]",
code:"/:li",
web_code:"/闪电",
style:"icon_smiley_69"
},{
id:70,
cn:"[炸弹]",
hk:"[炸彈]",
us:"[Bomb]",
code:"/:bome",
web_code:"/炸弹",
style:"icon_smiley_70"
},{
id:71,
cn:"[刀]",
hk:"[刀]",
us:"[Dagger]",
code:"/:kn",
web_code:"/刀",
style:"icon_smiley_71"
},{
id:72,
cn:"[足球]",
hk:"[足球]",
us:"[Soccer]",
code:"/:footb",
web_code:"/足球",
style:"icon_smiley_72"
},{
id:73,
cn:"[瓢虫]",
hk:"[甲蟲]",
us:"[Ladybug]",
code:"/:ladybug",
web_code:"/瓢虫",
style:"icon_smiley_73"
},{
id:74,
cn:"[便便]",
hk:"[便便]",
us:"[Poop]",
code:"/:shit",
web_code:"/便便",
style:"icon_smiley_74"
},{
id:75,
cn:"[月亮]",
hk:"[月亮]",
us:"[Moon]",
code:"/:moon",
web_code:"/月亮",
style:"icon_smiley_75"
},{
id:76,
cn:"[太阳]",
hk:"[太陽]",
us:"[Sun]",
code:"/:sun",
web_code:"/太阳",
style:"icon_smiley_76"
},{
id:77,
cn:"[礼物]",
hk:"[禮物]",
us:"[Gift]",
code:"/:gift",
web_code:"/礼物",
style:"icon_smiley_77"
},{
id:78,
cn:"[拥抱]",
hk:"[擁抱]",
us:"[Hug]",
code:"/:hug",
web_code:"/拥抱",
style:"icon_smiley_78"
},{
id:79,
cn:"[强]",
hk:"[強]",
us:"[ThumbsUp]",
code:"/:strong",
web_code:"/强",
style:"icon_smiley_79"
},{
id:80,
cn:"[弱]",
hk:"[弱]",
us:"[ThumbsDown]",
code:"/:weak",
web_code:"/弱",
style:"icon_smiley_80"
},{
id:81,
cn:"[握手]",
hk:"[握手]",
us:"[Shake]",
code:"/:share",
web_code:"/握手",
style:"icon_smiley_81"
},{
id:82,
cn:"[胜利]",
hk:"[勝利]",
us:"[Peace]",
code:"/:v",
web_code:"/胜利",
style:"icon_smiley_82"
},{
id:83,
cn:"[抱拳]",
hk:"[抱拳]",
us:"[Fight]",
code:"/:@)",
web_code:"/抱拳",
style:"icon_smiley_83"
},{
id:84,
cn:"[勾引]",
hk:"[勾引]",
us:"[Beckon]",
code:"/:jj",
web_code:"/勾引",
style:"icon_smiley_84"
},{
id:85,
cn:"[拳头]",
hk:"[拳頭]",
us:"[Fist]",
code:"/:@@",
web_code:"/拳头",
style:"icon_smiley_85"
},{
id:86,
cn:"[差劲]",
hk:"[差勁]",
us:"[Pinky]",
code:"/:bad",
web_code:"/差劲",
style:"icon_smiley_86"
},{
id:87,
cn:"[爱你]",
hk:"[愛你]",
us:"[RockOn]",
code:"/:lvu",
web_code:"/爱你",
style:"icon_smiley_87"
},{
id:88,
cn:"[NO]",
hk:"[NO]",
us:"[Nuh-uh]",
code:"/:no",
web_code:"/NO",
style:"icon_smiley_88"
},{
id:89,
cn:"[OK]",
hk:"[OK]",
us:"[OK]",
code:"/:ok",
web_code:"/OK",
style:"icon_smiley_89"
},{
id:90,
cn:"[爱情]",
hk:"[愛情]",
us:"[InLove]",
code:"/:love",
web_code:"/爱情",
style:"icon_smiley_90"
},{
id:91,
cn:"[飞吻]",
hk:"[飛吻]",
us:"[Blowkiss]",
code:"/:<L>",
web_code:"/飞吻",
style:"icon_smiley_91"
},{
id:92,
cn:"[跳跳]",
hk:"[跳跳]",
us:"[Waddle]",
code:"/:jump",
web_code:"/跳跳",
style:"icon_smiley_92"
},{
id:93,
cn:"[发抖]",
hk:"[發抖]",
us:"[Tremble]",
code:"/:shake",
web_code:"/发抖",
style:"icon_smiley_93"
},{
id:94,
cn:"[怄火]",
hk:"[噴火]",
us:"[Aaagh!]",
code:"/:<O>",
web_code:"/怄火",
style:"icon_smiley_94"
},{
id:95,
cn:"[转圈]",
hk:"[轉圈]",
us:"[Twirl]",
code:"/:circle",
web_code:"/转圈",
style:"icon_smiley_95"
},{
id:96,
cn:"[磕头]",
hk:"[磕頭]",
us:"[Kotow]",
code:"/:kotow",
web_code:"/磕头",
style:"icon_smiley_96"
},{
id:97,
cn:"[回头]",
hk:"[回頭]",
us:"[Dramatic]",
code:"/:turn",
web_code:"/回头",
style:"icon_smiley_97"
},{
id:98,
cn:"[跳绳]",
hk:"[跳繩]",
us:"[JumpRope]",
code:"/:skip",
web_code:"/跳绳",
style:"icon_smiley_98"
},{
id:99,
cn:"[投降]",
hk:"[投降]",
us:"[Surrender]",
code:"/:oY",
web_code:"/挥手",
style:"icon_smiley_99"
},{
id:100,
cn:"[激动]",
hk:"[激動]",
us:"[Hooray]",
code:"/:#-0",
web_code:"/激动",
style:"icon_smiley_100"
},{
id:101,
cn:"[乱舞]",
hk:"[亂舞]",
us:"[Meditate]",
code:"/:hiphot",
web_code:"/街舞",
style:"icon_smiley_101"
},{
id:102,
cn:"[献吻]",
hk:"[獻吻]",
us:"[Smooch]",
code:"/:kiss",
web_code:"/献吻",
style:"icon_smiley_102"
},{
id:103,
cn:"[左太极]",
hk:"[左太極]",
us:"[TaiChi L]",
code:"/:<&",
web_code:"/左太极",
style:"icon_smiley_103"
},{
id:104,
cn:"[右太极]",
hk:"[右太極]",
us:"[TaiChi R]",
code:"/:&>",
web_code:"/右太极",
style:"icon_smiley_104"
},{
id:204,
cn:"[嘿哈]",
hk:"[吼嘿]",
us:"[Hey]",
code:"",
web_code:"",
style:"icon_emoji_wx_4"
},{
id:205,
cn:"[捂脸]",
hk:"[掩面]",
us:"[Facepalm]",
code:"",
web_code:"",
style:"icon_emoji_wx_5"
},{
id:202,
cn:"[奸笑]",
hk:"[奸笑]",
us:"[Smirk]",
code:"",
web_code:"",
style:"icon_emoji_wx_2"
},{
id:206,
cn:"[机智]",
hk:"[機智]",
us:"[Smart]",
code:"",
web_code:"",
style:"icon_emoji_wx_6"
},{
id:212,
cn:"[皱眉]",
hk:"[皺眉]",
us:"[Moue]",
code:"",
web_code:"",
style:"icon_emoji_wx_12"
},{
id:211,
cn:"[耶]",
hk:"[歐耶]",
us:"[Yeah!]",
code:"",
web_code:"",
style:"icon_emoji_wx_11"
},{
id:207,
cn:"[茶]",
hk:"[茶]",
us:"[Tea]",
code:"",
web_code:"",
style:"icon_emoji_wx_7"
},{
id:209,
cn:"[红包]",
hk:"[Packet]",
us:"[Packet]",
code:"",
web_code:"",
style:"icon_emoji_wx_9"
},{
id:210,
cn:"[蜡烛]",
hk:"[蠟燭]",
us:"[Candle]",
code:"",
web_code:"",
style:"icon_emoji_wx_10"
},{
id:215,
cn:"[福]",
hk:"[福]",
us:"[Blessing]",
code:"",
web_code:"",
style:"icon_emoji_wx_15"
},{
id:214,
cn:"[鸡]",
hk:"[小雞]",
us:"[Chick]",
code:"",
web_code:"",
style:"icon_emoji_wx_14"
},{
id:300,
cn:"[笑脸]",
emoji:"😄",
hk:"",
us:"",
code:"\\ue415",
web_code:"",
style:"icon_emoji_ios_0"
},{
id:301,
cn:"[生病]",
emoji:"😷",
hk:"",
us:"",
code:"\\ue40c",
web_code:"",
style:"icon_emoji_ios_1"
},{
id:302,
cn:"[破涕为笑]",
emoji:"😂",
hk:"",
us:"",
code:"\\ue412",
web_code:"",
style:"icon_emoji_ios_2"
},{
id:303,
cn:"[吐舌]",
emoji:"😝",
hk:"",
us:"",
code:"\\ue409",
web_code:"",
style:"icon_emoji_ios_3"
},{
id:304,
cn:"[脸红]",
emoji:"😳",
hk:"",
us:"",
code:"\\ue40d",
web_code:"",
style:"icon_emoji_ios_4"
},{
id:305,
cn:"[恐惧]",
emoji:"😱",
hk:"",
us:"",
code:"\\ue107",
web_code:"",
style:"icon_emoji_ios_5"
},{
id:306,
cn:"[失望]",
emoji:"😔",
hk:"",
us:"",
code:"\\ue403",
web_code:"",
style:"icon_emoji_ios_6"
},{
id:307,
cn:"[无语]",
emoji:"😒",
hk:"",
us:"",
code:"\\ue40e",
web_code:"",
style:"icon_emoji_ios_7"
},{
id:308,
cn:"[鬼魂]",
emoji:"👻",
hk:"",
us:"",
code:"\\ue11b",
web_code:"",
style:"icon_emoji_ios_8"
},{
id:309,
cn:"[合十]",
emoji:"🙏",
hk:"",
us:"",
code:"\\ue41d",
web_code:"",
style:"icon_emoji_ios_9"
},{
id:310,
cn:"[强壮]",
emoji:"💪",
hk:"",
us:"",
code:"\\ue14c",
web_code:"",
style:"icon_emoji_ios_10"
},{
id:311,
cn:"[庆祝]",
emoji:"🎉",
hk:"",
us:"",
code:"\\ue312",
web_code:"",
style:"icon_emoji_ios_11"
},{
id:312,
cn:"[礼物]",
hk:"",
us:"",
code:"\\ue112",
web_code:"",
style:"icon_emoji_ios_12"
},{
id:"17_1",
cn:"[囧]",
hk:"[囧]",
us:"[Blush]",
code:"",
web_code:"",
style:"icon_smiley_17"
},{
id:"39_1",
cn:"[再见]",
hk:"[再見]",
us:"[Bye]",
code:"",
web_code:"",
style:"icon_smiley_39"
},{
id:"83_1",
cn:"[抱拳]",
hk:"[抱拳]",
us:"[Salute]",
code:"",
web_code:"",
style:"icon_smiley_83"
},{
id:"212_1",
cn:"[皱眉]",
hk:"[皺眉]",
us:"[Concerned]",
code:"",
web_code:"",
style:"icon_emoji_wx_12"
}];
});define("appmsg/more_read_tpl.html.js",[],function(){
return'<p class="read-more__desc">你还可以看</p>\n<div class="read-more__article__area">\n  <# list.forEach(function (item) { #>\n    <div class="read-more__article__item">\n      <a href="javascript:;" class="more_read_link"><#=item.title#></a>\n      <# if (item.fans_read_cnt > 0) { #>\n        <p class="read-more__article__extra"><#=item.fans_read_cnt#>位好友读过</p>\n      <# } #>\n    </div>\n  <# }); #>\n</div>';
});define("appmsg/i18n.js",[],function(e,n){
"use strict";
n.dealLikeReadShow_en=function(e){
if(!LANG)return"";
if("en"==LANG){
var n="";
if(parseInt(e)>1e5)n="100k+";else if(parseInt(e)>1e4&&parseInt(e)<=1e5){
var r=""+parseInt(e)/1e3,t=r.indexOf(".");
n=-1===t?r+"k":r.substr(0,t)+"."+r.charAt(t+1)+"k";
}else n=0===parseInt(e)?"":e;
return n;
}
return"";
},n.setLikeRead_en=function(e){
LANG&&"en"==LANG&&(e.innerText="Views");
};
});define("appmsg/retry_ajax.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(require,exports,module,alert){
"use strict";
function Retry_ajax(e){
checkAjaxDo(e),e&&(e.success=function(a){
dealWithSucceed(a,e);
},e.error=function(){
dealWithFailed(e);
}),ajax(e);
}
function checkAjaxDo(e){
var a=isContainExceptLike(e,failedQueue),i=isContainAjax(e,failedQueue);
-1===i&&a>-1&&failedQueue.splice(a,1);
}
function isContainExceptLike(e,a){
var i=-1;
for(var r in a){
var t=a[r];
if(e.url||-1!=e.url.indexOf("&like=")||-1!=t.url.indexOf("&like=")){
if(!(e.url.indexOf("&like=")>-1&&t.url.indexOf("&like=")>-1))continue;
if(removeLikeParam(e.url)!==removeLikeParam(t.url))continue;
}else if(!t.url||t.url!==e.url)continue;
if(e.data&&t.data){
var u=e.data,n=t.data;
if(!isEqualExceptLike(u,n))continue;
}
i=r;
break;
}
return i;
}
function isContainAjax(e,a){
var i=-1;
for(var r in a){
var t=a[r];
if(e.url&&t.url&&e.url==t.url){
if(e.data&&t.data){
var u=e.data,n=t.data;
if(!isEqual(u,n))continue;
}
i=r;
break;
}
}
return i;
}
function removeLikeParam(e){
var a=e.indexOf("&like="),i=e.substring(0,a)+e.substring(a+7);
return i;
}
function isEqualExceptLike(e,a){
var i=Object.getOwnPropertyNames(e),r=Object.getOwnPropertyNames(a);
if(i.length!=r.length)return!1;
for(var t=0;t<i.length;t++){
var u=i[t];
if("like"!==u&&e[u]!==a[u])return!1;
}
return!0;
}
function isEqual(e,a){
var i=Object.getOwnPropertyNames(e),r=Object.getOwnPropertyNames(a);
if(i.length!=r.length)return!1;
for(var t=0;t<i.length;t++){
var u=i[t];
if(e[u]!==a[u])return!1;
}
return!0;
}
function dealWithSucceed(res,obj){
try{
var data=eval("("+res+")");
}catch(e){
var data=!1;
}
if(data&&data.base_resp&&0===data.base_resp.ret){
var findIndex=isContainExceptLike(obj,failedQueue);
findIndex>-1&&failedQueue.splice(findIndex,1);
}else dealWithFailed(obj);
}
function dealWithFailed(e){
var a=isContainExceptLike(e,failedQueue);
if(-1===a){
if(e.failedTimes=1,failedQueue.length>=MAX_QUEUE_LEN)return;
failedQueue.push(e);
}else{
var i=isContainAjax(e,failedQueue);
if(i>-1){
if(failedQueue[a].failedTimes++,e.failedTimes=failedQueue[a].failedTimes,e.failedTimes>MAX_FAILED_TIMES)return void failedQueue.splice(i,1);
}else failedQueue.splice(i,1),e.failedTimes=1,failedQueue.push(e);
}
Retry_ajax(e);
}
var ajax=require("biz_wap/utils/ajax.js"),JSAPI=require("biz_wap/jsapi/core.js"),failedQueue=[],MAX_FAILED_TIMES=2,MAX_QUEUE_LEN=20;
return Retry_ajax;
});define("complain/tips.js",["biz_common/utils/string/html.js","biz_common/dom/event.js"],function(t){
"use strict";
t("biz_common/utils/string/html.js");
var i=t("biz_common/dom/event.js"),o={
tipsTimeoutId:null,
tipsDom:document.getElementById("tips")
},s={
showErrTips:function(t,i){
var s=i||o.tipsDom;
return t===!1?void(s.style.display="none"):(this.resetTips(),s.innerHTML=t.htmlEncode(),
s.style.display="block",clearTimeout(o.tipsTimeoutId),void(o.tipsTimeoutId=setTimeout(function(){
s.style.display="none";
},4e3)));
},
resetTips:function(t){
setTimeout(function(){
var i=t||o.tipsDom;
i&&(i.style.top=document.body.scrollTop+"px");
},0);
}
};
return i.on(window,"scroll",function(){
s.resetTips();
}),s;
});define("pages/loadscript.js",[],function(){
"use strict";
function e(t){
e.counter||(e.counter=1);
var n="number"!=typeof t.retry?1:t.retry,o=t.win||window,r=o.document,a=r.createElement("script"),i=t.type||"JSONP",d=r.head||r.getElementsByTagName("head")[0]||r.documentElement,l=t.callbackName,c="uninitialized",u="undefined"==typeof t.successCode?200:t.successCode,s="undefined"==typeof t.timeoutCode?500:t.timeoutCode,f="undefined"==typeof t.scriptErrorCode?400:t.scriptErrorCode,m=!1,p=null;
"JSONP"!=i&&"JS"!=i&&(i="JSONP");
var y="";
y="JSONP"==i?t.url+"&t="+Math.random():t.url;
var h=function(e){
a&&!m&&(m=!0,p&&(clearTimeout(p),p=null),a.onload=a.onreadystatechange=a.onerror=null,
d&&a.parentNode&&d.removeChild(a),a=null,l&&-1==l.indexOf(".")&&(window[l]=null),
"JS"==i&&e==u&&"loaded"==c&&"function"==typeof t.callback?t.callback():e!=u&&"loaded"!=c&&"function"==typeof t.onerror&&t.onerror(e));
};
if(l&&"function"==typeof t.callback&&"JSONP"==i){
var w=l;
-1==l.indexOf(".")&&(l=window[l]?l+e.counter++:l,window[l]=function(){
c="loaded",t.callback.apply(null,arguments);
}),y=y.replace("="+w,"="+l);
}
a.onload=a.onreadystatechange=function(){
var e=navigator.userAgent.toLowerCase();
(-1!=e.indexOf("opera")||-1==e.indexOf("msie")||/loaded|complete/i.test(this.readyState))&&("JS"==i&&(c="loaded"),
h("loaded"==c?u:f));
},a.onerror=function(){
return n>0?(t.retry=n-1,p&&(clearTimeout(p),p=null),void e(t)):void h(f);
},t.timeout&&(p=setTimeout(function(){
h(s);
},parseInt(t.timeout,10))),c="loading",a.charset="utf-8",setTimeout(function(){
a.src=y;
try{
d.insertBefore(a,d.lastChild);
}catch(e){}
},0);
}
return e;
});define("biz_wap/utils/ajax_load_js.js",["biz_wap/utils/ajax.js","biz_wap/utils/localstorage.js"],function(e){
"use strict";
function n(e){
var n=d(e.url,e.version),o=function(){},i=function(){};
if("function"==typeof e.onSuccess&&(o=e.onSuccess),"function"==typeof e.onError&&(i=e.onError),
c(e.win,n))return void o({
code:1,
queueIndex:0
});
if(e.useCache){
var a=u(e.url,e.version);
if(a&&t({
win:e.win,
funcStr:a,
useCache:!1,
url:e.url,
version:e.version
}),c(e.win,n))return void o({
code:2,
queueIndex:0
});
}
if(S.callbackQueue.push({
options:e,
onSuccess:o,
onError:i
}),"undefined"==typeof S.jsLoadState[n]&&(S.jsLoadState[n]=-1),-1==S.jsLoadState[n]){
var s=e.url;
s+=-1==s.indexOf("?")?"?"+S.customerParam+"="+e.version:"&"+S.customerParam+"="+e.version,
r({
originUrl:e.url,
version:e.version,
url:s,
key:n
});
}
}
function r(e){
S.jsLoadState[e.key]=1,w({
url:e.url,
notJoinUrl:!0,
timeout:1e4,
type:"POST",
dataType:"text",
noXRequestedWidthHeader:!0,
success:function(n){
if(1==S.jsLoadState[e.key]){
S.jsLoadState[e.key]=-1;
var r=!0;
r=n?t({
win:null,
funcStr:n,
useCache:!0,
url:e.originUrl,
version:e.version
}):!1,o(r?{
code:3,
type:"suc",
funcStr:n
}:{
code:51,
type:"err"
});
}
},
error:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:52,
type:"err"
}));
},
complete:function(){
1==S.jsLoadState[e.key]&&(S.jsLoadState[e.key]=-1,o({
code:53,
type:"err"
}));
}
});
}
function t(e){
var n=e.win||window,r=!0;
try{
n.eval(e.funcStr),r=!0;
}catch(t){
r=!1;
}
return r?(s({
url:e.url,
version:e.version,
win:n
}),e.useCache&&a(e.url,e.version,e.funcStr),!0):(l({
url:e.url,
version:e.version,
win:n
}),i(e.url),!1);
}
function o(e){
for(var n=0,r=S.callbackQueue.length;r>n;n++){
var o=S.callbackQueue[n],u=o.options,i=u.win,a=d(u.url,u.version);
"suc"==e.type?(e.funcStr&&!c(i,a)&&t({
win:i,
funcStr:e.funcStr,
useCache:!1,
url:u.url,
version:u.version
}),o.onSuccess({
code:e.code,
queueIndex:n
})):o.onError({
code:e.code,
queueIndex:n
});
}
S.callbackQueue=[];
}
function u(e,n){
var r=f(e),t=y.get(r);
if(!t)return null;
var o;
try{
o=JSON.parse(t);
}catch(u){}
if(o){
var a=+new Date,c=1*o.time;
return a-c>S.lsTimeout||o.version!=n||!o.func?(i(e),null):o.func;
}
}
function i(e){
var n=f(e);
y.remove(n);
}
function a(e,n,r){
var t={
version:n,
func:r,
time:+new Date
},o=f(e);
try{
y.set(o,JSON.stringify(t));
}catch(u){}
}
function c(e,n){
return e=e||window,e[S.winCacheKey]&&e[S.winCacheKey][n]&&e[S.winCacheKey][n].state===!0?!0:!1;
}
function s(e){
var n=d(e.url,e.version),r=e.win||window;
r[S.winCacheKey]||(r[S.winCacheKey]={}),r[S.winCacheKey][n]||(r[S.winCacheKey][n]={}),
r[S.winCacheKey][n].state=!0;
}
function l(e){
var n=d(e.url,e.version),r=e.win||window;
if(r[S.winCacheKey]&&r[S.winCacheKey][n])try{
delete r[S.winCacheKey][n];
}catch(t){}
}
function f(e){
return encodeURIComponent(e);
}
function d(e,n){
return encodeURIComponent(e)+"_"+n||"";
}
function v(e){
l(e),i(e.url);
}
var w=e("biz_wap/utils/ajax.js"),y=e("biz_wap/utils/localstorage.js"),S={
jsLoadState:{},
winCacheKey:"__loadExternalJsStates__",
lsTimeout:1728e5,
customerParam:"wxv",
callbackQueue:[]
};
return{
ClearCache:v,
Load:n
};
});define("appmsg/comment.js",["biz_common/dom/class.js","appmsg/cmt_tpl.html.js","biz_common/utils/wxgspeedsdk.js","appmsg/comment_report.js","biz_wap/utils/device.js","appmsg/retry_ajax.js","biz_common/dom/offset.js","biz_common/utils/url/parse.js","biz_wap/jsapi/core.js","common/utils.js","appmsg/emotion/selection.js","biz_common/utils/monitor.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/fakehash.js","appmsg/log.js","appmsg/comment_tpl.html.js","appmsg/comment_pc_tpl.html.js","appmsg/friend_comment_tpl.html.js","appmsg/my_comment_tpl.html.js","appmsg/emotion/emotion_pc.js","appmsg/emotion/emotion.js","appmsg/emotion/dom.js"],function(e,t,n,o){
"use strict";
function i(e,t){
e&&(e.style.display=t?t:"block");
}
function m(e){
e&&(e.style.display="none");
}
function c(){
bt.mylist.children.length?(i(bt.mylist.parentNode),device_is_pc||S.removeClass(document.body,at)):(m(bt.mylist.parentNode),
device_is_pc||S.addClass(document.body,at));
}
function d(e){
bt.el_alertContent.innerHTML=e,bt.el_alertPanel.style.display="";
}
function l(){
device_is_pc?(S.removeClass(document.getElementById("js_success_panel_pc"),"weui-transition_opacity-hide"),
setTimeout(function(){
S.addClass(document.getElementById("js_success_panel_pc"),"weui-transition_opacity-hide");
},750)):(setTimeout(function(){
i(bt.toast);
},750),setTimeout(function(){
m(bt.toast);
},1500));
}
function s(e){
return e.toString().replace(/^\s+|\s+$/g,"");
}
function a(e,t){
if(!(Math.random()<.999)){
var n=window.location.protocol,o=9;
"https:"==n&&(o=18),F.saveSpeeds({
uin:uin,
pid:o,
speeds:[{
sid:29,
time:e
},{
sid:30,
time:t
}]
}),F.send();
}
}
function r(e,t){
if("undefined"!=typeof e){
var n=new Image;
n.src=dt.idkey?"//mp.weixin.qq.com/mp/jsmonitor?idkey="+(dt.idkey+"_"+e+"_1")+"&t="+Math.random():"http://mp.weixin.qq.com/mp/jsreport?key="+e+"&content="+(t||"")+"&r="+Math.random();
}
}
function _(){
return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
}
function p(){
vt||(vt=!0,new Y({
comment_id:tt,
appmsgid:appmsgid,
idx:idx,
item_show_type:window.item_show_type||0,
biz:biz
}));
}
function u(e){
e=e===!0,e&&(pt=0);
var t=_(),n=document.documentElement.scrollHeight;
if(n<t+$.getInnerHeight()+100&&nt.off(window,"scroll",u),!(gt||-1==pt||pt>0&&n-t-$.getInnerHeight()>500)){
if("number"==typeof window.comment_count&&0==window.comment_count&&!e)return void g({
enabled:1,
elected_comment:[],
friend_comment:[],
elected_comment_total_cnt:0,
my_comment:[],
only_fans_can_comment:window.only_fans_can_comment,
is_fans:window._is_fans,
logo_url:window._logo_url,
nick_name:window._nick_name
});
var o=+new Date;
gt=!0,m(bt.tips),i(bt.loading);
var c="/mp/appmsg_comment?action=getcomment&scene="+dt.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+tt+"&offset="+pt+"&limit="+ut+(window.send_time?"&send_time="+send_time:"");
try{
Bt++,e&&(Et=[]),Bt>1&&!e&&r(dt.moreList,encodeURIComponent(c)),Et.indexOf(c)>-1&&r(dt.repeatList,encodeURIComponent(c)),
Et.push(c);
}catch(d){}
!!G&&console.info("[图文评论] 开始请求评论数据:",c),ct("[Appmsg comment] start get comment data, url:"+c),
ot({
url:c,
type:"get",
success:function(t){
var n=+new Date,i=n-o,m={};
try{
m=window.eval.call(window,"("+t+")");
}catch(d){}
window.test_comment_data&&(m=window.test_comment_data);
var l=m.base_resp&&m.base_resp.ret;
if(0==l){
g(m,e);
var s=+new Date-n;
a(i,s);
}else r(dt.errList,"type:resperr;url:"+encodeURIComponent(c)+";ret="+l);
ct("[Appmsg comment] get comment success"),p(),et||"5"!==window.item_show_type||(V.setAvg(112287,36,Date.now()-window.logs.pagetime.page_begin),
V.send(),et=!0);
},
error:function(){
r(dt.errList,"type:ajaxerr;url:"+encodeURIComponent(c)),ct("[Appmsg comment] get comment ajax error");
},
complete:function(){
gt=!1,m(bt.loading),nt.off(window,"scroll",M);
}
});
}
}
function g(e,t){
var n,o,c=document.createDocumentFragment(),d=document.createDocumentFragment();
r(dt.handleList,encodeURIComponent(JSON.stringify({
comment_id:tt,
offset:pt,
url:location.href
}))),"undefined"!=typeof e.only_fans_can_comment?window.can_fans_comment_only=e.only_fans_can_comment:"undefined"==typeof window.can_fans_comment_only&&(window.can_fans_comment_only=0),
1!=e.enabled?(q&&(q.style.display="none"),O&&m(O),e.elected_comment=[],e.friend_comment=[],
e.elected_comment_total_cnt=0,e.friend_comment_total_cnt=0):(q&&(q.style.display="block"),
O&&i(O)),0==pt?(ft=e.logo_url,yt=e.nick_name,t&&(It=[]),n=e.elected_comment,n&&n.length?(h(n,c,"elected"),
t&&(bt.list.innerHTML=""),bt.list.appendChild(c),i(bt.main),0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans?window.device_is_pc?(i(bt.commentPC),
i(bt.inputPC)):i(document.getElementById("js_cmt_addbtn1")):i(document.getElementById("js_cmt_nofans1"),"block"),
e.elected_comment_total_cnt<=10&&(i(document.getElementById("js_cmt_statement")),
i(document.getElementById("js_cmt_qa")))):(m(bt.main),0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans?window.device_is_pc?(i(bt.commentPC),
i(bt.inputPC)):i(document.getElementById("js_cmt_addbtn2")):i(document.getElementById("js_cmt_nofans2"),"block")),
o=e.friend_comment,h(o,d,"friend"),o&&0==o.length&&m(O),t&&(bt.fdlist.innerHTML=""),
bt.fdlist.appendChild(d),o&&o.length?(i(bt.fdmain),(0==window.can_fans_comment_only||1==window.can_fans_comment_only&&1==e.is_fans)&&(window.device_is_pc||(m(document.getElementById("js_cmt_addbtn1")),
m(document.getElementById("js_cmt_addbtn2")),i(document.getElementById("js_cmt_addbtn3"))))):m(bt.fdmain),
e.friend_comment.length>0||e.elected_comment.length>0,function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=(document.getElementById("img-content"),
document.getElementById("js_cmt_area"));
if(e&&t&&t.offsetTop){
var n=t.offsetTop;
window.scrollTo(0,n-25);
}
}()):(n=e.elected_comment,n&&n.length&&(h(n,c,"elected"),bt.list.appendChild(c))),
0==e.elected_comment_total_cnt?(pt=-1,m(document.getElementById("js_cmt_loading")),
m(document.getElementById("js_cmt_statement")),m(document.getElementById("js_cmt_qa"))):pt+ut>=e.elected_comment_total_cnt?(pt=-1,
m(document.getElementById("js_cmt_loading")),i(document.getElementById("js_cmt_statement")),
i(document.getElementById("js_cmt_qa"))):pt+=e.elected_comment.length;
}
function f(){
_t.log("tag1");
var e;
if(e=window.device_is_pc?s(zt).replace(/<br\/>/g,"").replace(/\n/g,"")||"":s(bt.input.value),
_t.log("tag2"),!S.hasClass(bt.submit,"btn_disabled")&&bt.submit.disabled!==!0){
if(_t.log("tag3"),e.length<1)return d("留言不能为空");
if(_t.log("tag4"),e.length>600)return d("字数不能多于600个");
window.device_is_pc&&(e=zt),_t.log("tag5"),device_is_pc?bt.submit.disabled=!0:S.addClass(bt.submit,"btn_disabled"),
_t.log("tag6");
var t=document.getElementById("activity-name");
_t.log("tag7"),kt!=e&&(Tt=+new Date);
var n=function(t){
{
var n=document.createDocumentFragment();
document.createDocumentFragment();
}
l(),console.log("------------------------",window.friend_comment_enabled),h([{
content:e,
nick_name:yt,
create_time:(new Date).getTime()/1e3|0,
is_elected:0,
logo_url:ft,
like_status:0,
like_num_format:0,
like_num:0,
is_from_friend:0,
is_from_me:1,
my_id:t.my_id,
content_id:t.content_id
}],n,"mine"),bt.mylist.insertBefore(n,bt.mylist.firstChild);
c(),device_is_pc?(bt.input.innerHTML="",bt.inputHolder.style.display=""):bt.input.value="",
x();
};
if(window.test_comment_data)return void n({
my_id:"111"
});
var o="/mp/appmsg_comment?action=addcomment&scene="+dt.scene+"&comment_id="+tt+"&__biz="+biz+"&idx="+idx+"&appmsgid="+appmsgid+"&sn="+sn;
ot({
url:o,
data:{
content:e,
title:t&&s(t.innerText),
head_img:ft,
nickname:yt,
client_id:Tt
},
type:"POST",
success:function(t){
_t.log("tag8"),device_is_pc||rt.hidePannel();
var i={};
try{
i=window.eval.call(window,"("+t+")");
}catch(m){}
switch(+i.ret){
case 0:
n(i);
break;

case-6:
d("你留言的太频繁了，休息一下吧");
break;

case-7:
d("你还未关注该公众号，不能参与留言");
break;

case-10:
d("字数不能多于600个");
break;

case-15:
d("留言已关闭");
break;

default:
kt=e,d("系统错误，请重试");
}
0!=i.ret&&r(dt.addCommentErr,"type:resperr;url:"+encodeURIComponent(o)+";ret="+i.ret);
},
error:function(e){
_t.log("shit;"+e.status+";"+e.statusText),r(dt.addCommentErr,"type:ajaxerr;url:"+encodeURIComponent(o));
},
complete:function(){
""!=bt.input.value&&S.removeClass(bt.submit,"btn_disabled");
}
});
}
}
function y(){
if(c(),0==wt){
var e="/mp/appmsg_comment?action=getmycomment&scene="+dt.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&idx="+idx+"&comment_id="+tt,t=document.getElementById("js_mycmt_loading");
wt=1,i(t),ot({
url:e,
type:"get",
success:function(t){
var n={};
try{
n=window.eval.call(window,"("+t+")");
}catch(o){}
var m=n.base_resp&&n.base_resp.ret;
if(0==m){
var c=n.my_comment,d=document.createDocumentFragment();
c&&c.length&&(window.device_is_pc&&(i(bt.myareaPC),i(bt.mylist),c=w(c)),h(c,d,"mine"),
bt.mylist.appendChild(d)),wt=2;
}else wt=0,r(dt.errComment,"type:resperr;url:"+encodeURIComponent(e)+";ret="+m);
},
error:function(){
wt=0,r(dt.errComment,"type:ajaxerr;url:"+encodeURIComponent(e));
},
complete:function(){
m(t),c();
}
});
}
}
function w(e){
return e.filter(function(e){
return!e.is_elected&&1!=e.is_elected;
});
}
function j(e){
var t=(new Date).getTime(),n=new Date;
n.setDate(n.getDate()+1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n=n.getTime();
var o=t/1e3-e,i=n/1e3-e,m=new Date(n).getFullYear(),c=new Date(1e3*e);
return 3600>o?Math.ceil(o/60)+"分钟前":86400>i?Math.floor(o/60/60)+"小时前":172800>i?"昨天":604800>i?Math.floor(i/24/60/60)+"天前":c.getFullYear()==m?c.getMonth()+1+"月"+c.getDate()+"日":c.getFullYear()+"年"+(c.getMonth()+1)+"月"+c.getDate()+"日";
}
function h(e,t,n){
var o,i="",m=document.createElement("div"),c="http://mmbiz.qpic.cn/mmbiz/ByCS3p9sHiak6fjSeA7cianwo25C0CIt5ib8nAcZjW7QT1ZEmUo4r5iazzAKhuQibEXOReDGmXzj8rNg/0",d="";
"elected"==n?d=0:"friend"==n&&(d=1),Ct={};
for(var l,s=0;l=e[s];++s){
l.time=j(l.create_time),l.status="",l.logo_url=l.logo_url||c,l.logo_url=-1!=l.logo_url.indexOf("wx.qlogo.cn")?l.logo_url.replace(/\/132$/,"/96"):l.logo_url,
l.content=l.content.htmlDecodeLite().htmlEncodeLite(),l.nick_name=l.nick_name.htmlDecodeLite().htmlEncodeLite(),
l.like_num_format=parseInt(l.like_num)>=1e4?(l.like_num/1e4).toFixed(1)+"万":l.like_num,
l.is_from_friend="friend"==n?0:l.is_from_friend||0,l.is_from_me="mine"==n?1:l.is_from_me||0,
l.reply=l.reply||{
reply_list:[]
},l.is_mine=n?!1:!0,l.is_elected="elected"==n||"friend"==n?1:l.is_elected,l.is_top="friend"==n?0:l.is_top,
l.report_elected=l.is_elected||0,l.report_friend=l.is_from_friend||0,l.scene=d,l.reply.reply_list.length>0&&(l.reply.reply_list[0].time=j(l.reply.reply_list[0].create_time),
l.reply.reply_list[0].content=(l.reply.reply_list[0].content||"").htmlEncodeLite(),
l.reply.reply_list[0].reply_like_status=l.reply.reply_list[0].reply_like_status||0,
l.reply.reply_list[0].reply_like_num=l.reply.reply_list[0].reply_like_num||0,l.reply.reply_list[0].reply_like_num_format=parseInt(l.reply.reply_list[0].reply_like_num)>=1e4?(l.reply.reply_list[0].reply_like_num/1e4).toFixed(1)+"万":l.reply.reply_list[0].reply_like_num),
l.new_appmsg=window.new_appmsg,i+=it.tmpl(A,l);
try{
var a=l.nick_name+l.content,_=!1,p=dt.repeatContentID;
Ct[a]&&(_=!0,p=dt.repeatContent),It.indexOf(l.content_id)>-1&&(_=!0,p=dt.repeatContentID),
It.push(l.content_id),Ct[a]=!0,_&&r(p,encodeURIComponent(JSON.stringify({
comment_id:tt,
content_id:l.content_id,
offset:pt,
length:e.length,
url:location.href
})));
}catch(u){}
}
for(m.innerHTML=i,b(m);o=m.children.item(0);)t.appendChild(o);
}
function b(e){
_t.each(e.querySelectorAll("div.discuss_message_content"),function(e){
e.innerHTML=rt.encode(e.innerHTML);
});
}
function v(){
var e="1"===X.getQuery("js_my_comment");
e&&C(!0);
}
function I(){
var e=document.getElementById("activity-name");
return $.isNativePage()?(Z.invoke("handleMPPageAction",{
action:"writeComment",
title:e&&s(e.innerText),
comment_id:tt,
style:"8"===item_show_type||"5"===item_show_type?"black":"white"
}),!0):void 0;
}
function C(e){
lt=_(),m(bt.article),i(bt.mine),bt.deletePanel=document.getElementById("js_delete_panel_mobile"),
bt.deleteConfirm=document.getElementById("js_delete_confirm_mobile"),bt.deleteCancel=document.getElementById("js_delete_cancel_mobile"),
window.__second_open__&&J.os.ios&&i(bt.fakebar),window.scrollTo(0,0),y(),e||_t.later(function(){
bt.input.focus();
});
}
function E(){
m(bt.mine),i(bt.article),bt.deletePanel=document.getElementById("js_delete_panel"),
bt.deleteConfirm=document.getElementById("js_delete_confirm"),bt.deleteCancel=document.getElementById("js_delete_cancel"),
console.log(lt),window.scrollTo(0,lt),bt.input.blur(),S.removeClass(document.body,st),
S.removeClass(document.body,at),$.isNativePage()||"5"!==window.item_show_type||(Z.invoke("setNavigationBarColor",{
color:"#1f1f1f"
}),Z.invoke("setBounceBackground",{
backgroundColor:"#1f1f1f"
}));
}
function B(e){
var t=e.delegatedTarget||e.srcElement,n=null;
if(S.hasClass(t,"js_comment_praise")&&(n=t),n){
for(var o=parseInt(n.dataset.status),i=0==o?1:0,m=n.dataset.contentId,c=n.dataset.scene,d=document.querySelectorAll('.js_comment_praise[data-content-id="'+m+'"]'),l=0;l<d.length;l++)T(d[l]);
if(window.test_comment_data)return;
Q({
url:"/mp/appmsg_comment?action=likecomment",
type:"POST",
data:{
like:i,
__biz:biz,
appmsgid:appmsgid,
comment_id:tt,
content_id:m,
item_show_type:window.item_show_type||0,
scene:c
}
});
}
}
function k(e){
for(var t=e.delegatedTarget,n=parseInt(t.dataset.status),o=n?0:1,i=t.dataset.contentId,m=t.dataset.replyId,c=t.dataset.scene,d=document.querySelectorAll('.js_reply_praise[data-content-id="'+i+'"]'),l=0;l<d.length;l++)T(d[l]);
document.querySelector("meta[name=viewport]"),window.test_comment_data||ot({
url:"/mp/appmsg_comment?action=like_author_reply",
type:"post",
data:{
__biz:biz,
comment_id:tt,
content_id:i,
reply_id:m,
like:o,
scene:c,
item_show_type:window.item_show_type||0
}
});
}
function T(e){
var t=S.hasClass(e,"praised"),n=e.querySelector(".praise_num"),o=n.innerHTML,i=o.indexOf("万"),m=parseInt(o)?parseInt(o):0;
t?(-1==i&&(n.innerHTML=m-1>0?m-1:""),S.removeClass(e,"praised"),e.dataset.status=0):(-1==i&&(n.innerHTML=m+1),
S.addClass(e,"praised"),e.dataset.status=1);
}
function x(){
bt.list.children.length?bt.fdlist.children.length?(i(document.getElementById("js_cmt_addbtn3")),
m(document.getElementById("js_cmt_addbtn1")),m(document.getElementById("js_cmt_addbtn2")),
m(document.getElementById("js_cmt_addbtn4"))):(i(document.getElementById("js_cmt_addbtn1")),
m(document.getElementById("js_cmt_addbtn2")),m(document.getElementById("js_cmt_addbtn3")),
m(document.getElementById("js_cmt_addbtn4"))):bt.fdlist.children.length?(i(document.getElementById("js_cmt_addbtn3")),
m(document.getElementById("js_cmt_addbtn4")),m(document.getElementById("js_cmt_addbtn1")),
m(document.getElementById("js_cmt_addbtn2"))):(i(document.getElementById("js_cmt_addbtn2")),
m(document.getElementById("js_cmt_addbtn3")),m(document.getElementById("js_cmt_addbtn1")),
m(document.getElementById("js_cmt_addbtn4"))),device_is_pc&&(m(document.getElementById("js_cmt_addbtn1")),
m(document.getElementById("js_cmt_addbtn2")),m(document.getElementById("js_cmt_addbtn3")));
}
function P(e,t){
e.parentNode.removeChild(e),S.addClass(bt.deletePanel,"weui-transition_opacity-hide");
for(var n=document.querySelectorAll(".cid"+t),o=0;o<n.length;o++)n[o].parentNode.removeChild(n[o]);
bt.list.children.length?bt.fdlist.children.length||m(bt.fdmain):(m(bt.main),m(document.getElementById("js_cmt_statement")),
m(document.getElementById("js_cmt_qa")),bt.fdlist.children.length||m(bt.fdmain)),
c(),x();
}
function z(e){
function t(e,t){
ot({
url:e,
success:function(e){
var n=i;
try{
e=JSON.parse(e);
}catch(m){
e={};
}
if(0==e.ret){
for(;n&&(n.nodeType!=n.ELEMENT_NODE||"li"!=n.tagName.toLowerCase());)n=n.parentNode;
n&&P(n,t);
}else o("删除失败，请重试");
},
error:function(){
o("网络错误，请重试");
}
});
}
var n,i=e.delegatedTarget,m=i.getAttribute("data-my-id"),c="/mp/appmsg_comment?action=delete&scene="+dt.scene+"&__biz="+biz+"&appmsgid="+appmsgid+"&comment_id="+tt+"&my_id="+m;
S.removeClass(bt.deletePanel,"weui-transition_opacity-hide"),nt.on(bt.deleteConfirm,"click",function(){
n!==m&&(n=m,t(c,m));
}),nt.on(bt.deleteCancel,"click",function(){
n!==m&&(n=m,S.addClass(bt.deletePanel,"weui-transition_opacity-hide"));
});
}
function D(e){
e&&e.preventDefault(),E(),m(bt.fakebar);
}
function M(){
try{
var e=bt.loading.getBoundingClientRect(),t=Math.random()<1;
e.top<$.getInnerHeight()&&gt&&t&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_45_1&lc=1&log0",
nt.off(window,"scroll",M));
}catch(n){}
}
function H(e,t){
if(!I()){
if($.isNativePage()||"5"!==window.item_show_type||(S.addClass(document.body,st),
Z.invoke("setNavigationBarColor",{
color:"#191919"
}),Z.invoke("setBounceBackground",{
backgroundColor:"#191919"
})),t)return!!G&&console.log("FakeHash on comment"),void C();
e.preventDefault(),window.__second_open__&&J.os.ios?C():(!!G&&console.log("push comment"),
mt.push("comment"));
}
}
function L(e){
var t=document.getElementById(e);
t.parentNode.removeChild(t);
}
function N(e){
window.scrollTo(0,window.scrollY+e.getBoundingClientRect().height);
}
function R(e){
return e.getBoundingClientRect().top+e.getBoundingClientRect().height>=$.getInnerHeight()?!0:!1;
}
var S=e("biz_common/dom/class.js"),A=e("appmsg/cmt_tpl.html.js"),q=document.getElementById("js_cmt_area"),O=document.getElementById("js_friend_cmt_area"),U=document.getElementById("js_cmt_container"),F=e("biz_common/utils/wxgspeedsdk.js"),Y=e("appmsg/comment_report.js"),G=location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,J=e("biz_wap/utils/device.js"),Q=e("appmsg/retry_ajax.js"),W=e("biz_common/dom/offset.js"),X=e("biz_common/utils/url/parse.js"),Z=e("biz_wap/jsapi/core.js"),$=e("common/utils.js"),K=e("appmsg/emotion/selection.js"),V=e("biz_common/utils/monitor.js"),et=void 0,tt=0;
if(window._has_comment=!0,"undefined"!=typeof window.comment_id?tt=window.comment_id:window.cgiData&&"undefined"!=typeof window.cgiData.comment_id&&(tt=window.cgiData.comment_id),
!!G&&console.info("[图文评论] 评论ID:",tt),-1!=navigator.userAgent.indexOf("MicroMessenger")||window.test_comment_data||(q&&(q.style.display="none"),
O&&(O.style.display="none"),tt=0,window._has_comment=!1),0==tt)return void(window._has_comment=!1);
var nt=e("biz_common/dom/event.js"),ot=e("biz_wap/utils/ajax.js"),it=(e("biz_common/utils/string/html.js"),
e("biz_common/tmpl.js")),mt=e("biz_wap/utils/fakehash.js"),ct=e("appmsg/log.js"),dt={
scene:0,
idkey:"",
moreList:27,
repeatList:25,
errList:18,
handleList:26,
addCommentErr:19,
errComment:18,
repeatContent:24,
repeatContentID:23
},lt=null,st="comment_editing",at="my_comment_empty_data";
window.__commentReportData&&window.__commentReportData.idkey&&(!!G&&console.log("init reportData"),
dt=window.__commentReportData),function(){
if(q){
var t=e("appmsg/comment_tpl.html.js");
q.innerHTML=it.tmpl(t,{
new_appmsg:window.new_appmsg
});
var n=e("appmsg/comment_pc_tpl.html.js");
U.insertAdjacentHTML("afterbegin",it.tmpl(n,{
new_appmsg:window.new_appmsg
}));
}
if(O){
var o=e("appmsg/friend_comment_tpl.html.js");
O.innerHTML=it.tmpl(o,{
new_appmsg:window.new_appmsg
});
}
}(),function(){
var t=e("appmsg/my_comment_tpl.html.js"),n=document.createElement("div");
n.innerHTML=it.tmpl(t,{
new_appmsg:window.new_appmsg,
friend_comment_enabled:window.friend_comment_enabled,
isIos:J.os.ios
}),document.body.appendChild(n);
}(),window.device_is_pc=!!J.os.pc;
var rt=e(window.device_is_pc?"appmsg/emotion/emotion_pc.js":"appmsg/emotion/emotion.js"),_t=e("appmsg/emotion/dom.js"),pt=(new Image,
0),ut=100,gt=!1,ft="",yt="我",wt=0;
window.device_is_pc?(L("js_cmt_mine"),document.getElementById("js_avatar_pc").src=window._logo_url,
S.addClass(document.body,"pages_skin_pc")):L("js_cmt_addbtn_pc");
var jt=!1,ht=["“”","‘’","（）","《》","〈〉","「」","『』","〔〕","【】","［］","[]","｛｝","{}","()","<>"],bt={
article:document.getElementById("js_article"),
mine:document.getElementById("js_cmt_mine"),
main:document.getElementById("js_cmt_main"),
input:document.getElementById("js_cmt_input"),
submit:document.getElementById("js_cmt_submit"),
goback:document.getElementById("js_cmt_goback"),
addbtn:document.getElementById("js_cmt_addbtn"),
list:document.getElementById("js_cmt_list"),
mylist:document.getElementById("js_cmt_mylist"),
morelist:document.getElementById("js_cmt_morelist"),
toast:document.getElementById("js_cmt_toast"),
tips:document.getElementById("js_cmt_tips"),
loading:document.getElementById("js_cmt_loading"),
fdmain:document.getElementById("js_friend_cmt_main"),
fdlist:document.getElementById("js_friend_cmt_list"),
fdlisthide:document.getElementById("js_friend_cmt_list_hide"),
morefdlist:document.getElementById("js_more_friend_cmt_area"),
morefd:document.getElementById("js_more_friend_cmt"),
fakebar:document.getElementById("js_fake_bar"),
cmtContainer:document.getElementById("js_cmt_container"),
inputPC:document.getElementById("js_cmt_input_pc"),
containerPC:document.getElementById("js_cmt_container_pc"),
commentPC:document.getElementById("js_comment_pc"),
addbtnPC:document.getElementById("js_cmt_addbtn_pc"),
mylistPC:document.getElementById("js_cmt_mylist_pc"),
myareaPC:document.getElementById("js_cmt_myarea_pc"),
emotionSwitchPC:document.getElementById("js_emotion_wrp_pc"),
deletePanel:document.getElementById("js_delete_panel"),
deleteConfirm:document.getElementById("js_delete_confirm"),
deleteCancel:document.getElementById("js_delete_cancel"),
inputHolder:document.getElementById("js_cmt_input_holder"),
el_alertPanel:document.getElementById("js_alert_panel"),
el_alertContent:document.getElementById("js_alert_content"),
el_alertConfirm:document.getElementById("js_alert_confirm")
};
bt.mylist=window.device_is_pc?bt.mylistPC:bt.mylist;
var vt,It=[],Ct={},Et=(new Image,[]),Bt=0,kt=null,Tt=+new Date;
if(window.__second_open__&&J.os.ios&&(bt.mine.style.marginBottom=getComputedStyle(bt.fakebar).height),
function(){
u(),v(),window.device_is_pc&&y(),rt.init();
}(),mt.on("comment",function(){
H(null,!0);
}),mt.on("article",function(){
!!G&&console.log("FakeHash on article"),E();
}),mt.on(function(e){
"comment"==e&&E();
}),nt.on(bt.input,"input",function(e){
if(device_is_pc){
var t=bt.input.innerHTML;
""===t||"<br>"===t?(bt.inputHolder.style.display="",bt.input.innerHTML=""):bt.inputHolder.style.display="none";
}
var n=s(bt.input.value||bt.input.innerHTML);
n.length<1?S.addClass(bt.submit,"btn_disabled"):S.removeClass(bt.submit,"btn_disabled"),
J.os.ios&&e.data&&ht.indexOf(e.data)>-1&&(jt=!0);
}),nt.on(bt.input,"click",function(){
J.os.ios&&jt&&(bt.input.blur(),bt.input.focus(),jt=!1);
}),nt.on(bt.el_alertConfirm,"click",function(){
bt.el_alertPanel.style.display="none";
}),device_is_pc&&nt.on(bt.input,"click",function(){
m(document.getElementById("js_emotion_panel_pc"));
}),nt.on(bt.list,"click",".js_comment_praise",B),nt.on(bt.mylist,"click",".js_comment_praise",B),
nt.on(bt.fdlist,"click",".js_comment_praise",B),nt.on(bt.list,"click",".js_reply_praise",k),
nt.on(bt.fdlist,"click",".js_reply_praise",k),nt.on(bt.list,"click",".js_del",z),
nt.on(bt.mylist,"click",".js_del",z),nt.on(bt.fdlist,"click",".js_del",z),$.listenMpPageAction(function(e){
"deleteComment"===e.action&&P(document.getElementById("cid"+e.personal_comment_id),e.personal_comment_id);
}),nt.on(bt.list,"click",".js_del",function(e){
e.preventDefault();
}),nt.on(bt.mylist,"click",".js_del",function(e){
e.preventDefault();
}),nt.on(bt.fdlist,"click",".js_del",function(e){
e.preventDefault();
}),nt.on(bt.submit,"click",f),nt.on(bt.submit,"click",function(e){
e.preventDefault();
}),bt.goback&&(nt.on(bt.goback,"click",D),nt.on(bt.goback,"click",D)),window.__second_open__&&J.os.ios){
nt.on(bt.input,"click",function(){
m(bt.fakebar);
}),nt.on(bt.input,"blur",function(){
console.log("input blur"),"none"!=bt.mine.style.display&&i(bt.fakebar);
});
var xt=null,Pt=null;
nt.on(window,"orientationchange",function(){
"none"!==bt.fakebar.style.display&&(clearTimeout(xt),xt=setTimeout(function(){
window.innerWidth!==parseFloat(getComputedStyle(bt.fakebar).width)&&(clearTimeout(Pt),
bt.mine.style.height=$.getInnerHeight()+"px",window.scrollBy&&window.scrollBy(0,1),
Pt=setTimeout(function(){
window.scrollBy&&window.scrollBy(0,-1),bt.mine.style.height="";
},100));
},50));
});
}
if(nt.on(window,"scroll",u),nt.on(window,"scroll",M),nt.on(document.getElementById("js_cmt_write1"),"click",function(e){
H(e);
}),nt.on(document.getElementById("js_cmt_write2"),"click",function(e){
H(e);
}),nt.on(document.getElementById("js_cmt_write3"),"click",function(e){
H(e);
}),nt.on(document.getElementById("js_cmt_write4"),"click",function(e){
H(e);
}),nt.on(bt.inputPC,"click",function(){
m(bt.inputPC),i(bt.containerPC),R(bt.containerPC)&&N(bt.containerPC),bt.input.focus();
}),nt.bindVisibilityChangeEvt(function(e){
e&&_()<W.getOffset(bt.cmtContainer).offsetTop-$.getInnerHeight()&&u(!0);
}),device_is_pc){
var zt,Dt,Mt,Ht,Lt,Nt;
!function(){
var e=function(){
var e=document.createElement("div"),t="";
e.innerHTML=bt.input.innerHTML;
for(var n=e.childNodes.length-1;n>=0;n--){
var o=e.childNodes[n];
switch(o.nodeType){
case 1:
if("BR"!==o.nodeName.toUpperCase()){
var i=void 0,m=!1;
if(i="IMG"===o.nodeName.toUpperCase()?o:"",i||(i=o.textContent||o.innerText||"",
m=!0),i){
var c=m?document.createTextNode(i):i;
e.replaceChild(c,o);
}else e.removeChild(o);
}
break;

case 3:
break;

default:
e.removeChild(o);
}
}
return t=e.innerHTML;
},t=function(e){
var t=e.currentTarget,o=t.getAttribute("data-index"),i=Mt[o].name,m='<img src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif"\n            class="icon_emotion_single '+i+'" alt="mo-'+Mt[o].title+'"></img>';
n(m),rt.emotionPanelMove();
},n=function(e){
o();
var t=K.getRange();
if(t){
if(t.createContextualFragment){
e+='<img style="width:1px;height:1px;"></img>';
var n=t.createContextualFragment(e),i=n.lastChild,m=K.getSelection();
t.deleteContents(),t.insertNode(n),t.setStartBefore(i),t.setEndAfter(i),m.removeAllRanges(),
m.addRange(t),document.execCommand("Delete",!1,null);
}else t.pasteHTML&&e&&(t.pasteHTML(e),t.select(),t.collapse&&t.collapse(!1));
c(),r();
}
},o=function(){
bt.input.focus(),bt.input.scrollTop=bt.input.scrollHeight,d();
},c=function(){
Dt=K.getRange();
},d=function(){
var e=Dt;
if(e){
var t=K.getSelection();
if(t.addRange)t.removeAllRanges(),t.addRange(e);else{
var n=K.getRange();
n.setEndPoint&&(n.setEndPoint("EndToEnd",e),n.setEndPoint("StartToStart",e)),n.select();
}
}
},l=function(){
for(var e=bt.input,t=void 0,n=e.childNodes.length-1;n>=0;n--){
var o=e.childNodes[n];
switch(o.nodeType){
case 1:
if("BR"!==o.nodeName.toUpperCase()){
var i=void 0,m=!1;
if(i="IMG"===o.nodeName.toUpperCase()?o:"",i||(i=o.textContent||o.innerText||"",
m=!0),i){
var c=m?document.createTextNode(i):i;
t||(t=c),e.replaceChild(c,o);
}else e.removeChild(o);
}
break;

case 3:
break;

default:
e.removeChild(o);
}
}
K.setCursorToEnd(t);
},a=function(e,t){
var n=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"],o=["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"],i=void 0;
i=t?o:n;
for(var m=0;m<i.length;m+=2)e=e.replace(new RegExp(i[m],"g"),i[m+1]);
return e;
},r=function(){
document.execCommand("AutoUrlDetect",!1,!1);
var t=e();
t=a(t),zt=rt.textFilter(t),_();
},_=function(){
var e=s(zt).replace(/<br\/>/g,"").replace(/\n/g,"").length;
Nt.innerText=e,e>600?(Lt.style.display="",S.addClass(Lt,"comment_primary_counter_warn"),
bt.submit.disabled=!0):1>e?(Lt.style.display="none",S.removeClass(Lt,"comment_primary_counter_warn"),
bt.submit.disabled=!0):(Lt.style.display="none",S.removeClass(Lt,"comment_primary_counter_warn"),
bt.submit.disabled=!1);
},p=function(e,t){
for(;void 0!=e&&null!=e&&null!=e.tagName&&"BODY"!=e.tagName.toUpperCase();){
if(e==t)return!0;
e=e.parentNode;
}
return!1;
};
zt="",Dt=K.getRange(),Mt=rt.edata,Lt=document.getElementById("js_length_notice_pc"),
Nt=document.getElementById("js_word_length_pc"),J.os.Mac&&(window.onblur=function(){
bt.input&&"none"!=bt.input.display&&""!=bt.input.innerHTML&&bt.input.blur();
}),nt.on(bt.input,"keyup",function(){
c(),r();
}),nt.on(bt.input,"keydown",function(e){
return 13===e.keyCode?(n("<br/>"),c(),!1):void 0;
}),nt.on(bt.input,"mouseup",function(){
c(),r();
}),nt.on(bt.input,"paste",function(){
Ht&&clearTimeout(Ht),Ht=setTimeout(function(){
return l(),c(),r(),!1;
},10);
}),nt.on(document,"click",function(e){
var t=e.srcElement||e.delegatedTarget,n=document.getElementById("js_emotion_panel_pc");
if(!p(t,bt.addbtnPC)&&"none"!==bt.containerPC.style.display){
var o=bt.input.innerHTML;
""===s(o)&&(m(bt.containerPC),i(bt.inputPC),m(n));
}
p(t,n)||p(t,bt.emotionSwitchPC)||"none"===n.style.display||m(n);
},!1),_t("li.js_emotion_item").on("click",t);
}();
}
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("appmsg/reward_entry.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","rt/appmsg/getappmsgext.rt.js","biz_wap/utils/mmversion.js","appmsg/appmsgext.js","appmsg/open_url_with_webview.js","common/utils.js"],function(e,t,a,r){
"use strict";
function n(e){
e&&(e.style.display="block");
}
function d(e){
e&&(e.style.display="none");
}
function i(){
v.getData({
biz:biz,
appmsg_type:appmsg_type,
mid:mid,
sn:sn,
idx:idx,
pass_ticket:window.pass_ticket,
scene:k.scene,
title:k.title,
ct:ct,
devicetype:k.devicetype,
version:k.version,
is_need_reward:k.is_need_reward,
reward_uin_count:k.is_need_reward?3*u:0,
send_time:k.send_time||"",
item_show_type:window.item_show_type||"",
rtId:k.appmsgextRtId,
rtKey:k.appmsgextRtKey,
onSuccess:function(e){
e&&(b.rewardLink&&m.off(b.rewardLink,"click",T),b.authorAvatarLink&&m.off(b.authorAvatarLink,"click",z),
console.log("reloadRewardData:",e),B=[],s({
reward_total:e.reward_total_count,
reward_head_imgs:e.reward_head_imgs||[],
can_reward:e.can_reward,
timestamp:e.timestamp,
reward_author_head:e.reward_author_head,
rewardsn:e.rewardsn
}));
},
onError:function(){}
});
}
function o(e,t){
var a=function(){
R.src=t+"&qrcode_timestamp="+1*new Date+"#wechat_redirect";
},n=null;
return function(t){
if("0"==k.user_can_reward)return void r("你已成为该公众号的黑名单用户，暂时无法赞赏。");
if(t.preventDefault(),k.isWindowsWechat){
var d=function(){
var e="js_author_reward_qrcode",t="reward_pop_show",r=document.getElementById(e);
if(r.classList.contains(t))return{
v:void 0
};
a(),n=setInterval(a,12e4),r.classList[b.rewardLink.getBoundingClientRect().top<222?"add":"remove"]("reward_pop_bottom"),
r.classList.add(t);
var d=function i(a){
if(r.classList.contains(t)){
for(var d=a.target;null!==d&&d.id!==e;)d=d.parentNode;
(null===d||d.id!==e)&&(r.classList.remove(t),clearInterval(n),n=null,m.off(window,"click",i));
}
};
setTimeout(function(){
m.on(window,"click",d);
},1);
}();
if("object"===("undefined"==typeof d?"undefined":_typeof(d)))return d.v;
}else-1==e.indexOf("&__tc=1")&&window.__addIdKeyReport?window.__addIdKeyReport(k.likeHeadId,k.likeHeadKey):window.__addIdKeyReport&&window.__addIdKeyReport(k.likeBtnId,k.likeBtnKey),
g.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
t.err_msg.indexOf(":ok")>-1||(location.href=e);
});
};
}
function s(e){
var t=window.innerWidth||document.documentElement.innerWidth,a=(Math.ceil((x.getInnerHeight()-188)/42)+1)*Math.floor((t-15)/42);
p="http://mp.weixin.qq.com/mp/reward?act=getrewardheads&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&offset=0&count="+a+"&source=1#wechat_redirect";
var r="#wechat_redirect",s="";
s="https://mp.weixin.qq.com/mp/author?action=show&__biz="+biz+"&appmsgid="+mid+"&timestamp="+e.timestamp+"&author_id="+k.author_id+"&idx="+idx+"&scene="+k.authorPageScene+"&rscene="+k.authorPageRscene,
e.rewardsn&&(s+="&rewardsn="+e.rewardsn),s+=r,-1==navigator.userAgent.indexOf("Android")||k.author_id||(s="https://mp.weixin.qq.com/bizmall/reward?act=showpage&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&timestamp="+e.timestamp+"&showwxpaytitle=1&rewardsn="+e.rewardsn+r);
var w=b.rewardLink,v=b.authorAvatarLink;
if(w){
g.on("activity:state_change",function(e){
if("onResume"==e.state_change||"onResume"==e.state){
var t=(new Date).valueOf();
if(-1!=navigator.userAgent.indexOf("Android")&&localStorage.getItem("lastOnresumeTime")&&t-parseInt(localStorage.getItem("lastOnresumeTime"))<=j)return;
localStorage.setItem("lastOnresumeTime",t),h.isAndroid&&!k.author_id&&g.invoke("setNavigationBarColor",{
actionCode:"1"
}),i();
}
});
var R="/mp/authorreward?action=getqrcode&author_id="+k.author_id+"&rewardsn="+e.rewardsn+"&timestamp="+e.timestamp+"&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&size=160";
if(T=o(s.replace(r,"&__tc=1"+r),R),z=o(s,R),m.on(w,"click",T),k.author_id&&1==e.can_reward&&v&&m.on(v,"click",z),
1==e.can_reward&&k.author_id&&b.reward){
n(document.getElementById("js_reward_author")),n(b.authorAvatarLink),b.rewardAuthorHead&&b.rewardAuthorHead.setAttribute("src",e.reward_author_head),
b.reward.classList.add("reward_area_primary");
var H=b.rewardLinkText;
H&&(H.innerText="喜欢作者",Math.random()<.05?H.innerText="稀罕作者":Math.random()>.05&&Math.random()<.1&&(H.innerText="钟意作者")),
b.rewardTotalText&&(b.rewardTotalText.innerText="人喜欢"),k.isWindowsWechat&&b.reward.classList.add("reward_area_win");
}
}
I=e.reward_head_imgs;
var A=c();
b.reward&&(k.author_id||h.isAndroid)&&1==e.can_reward?(n(b.reward),m.on(window,"load",function(){
_&&(m.off(window,"scroll",_),m.on(window,"scroll",_));
})):d(b.reward);
var K=document.getElementById("js_reward_inner");
K&&A>0&&n(K);
var S=[].concat(I),M=document.getElementById("js_reward_total");
if(E=16*u,B=[].concat(I),M)if(M.innerText=e.reward_total,k.isWindowsWechat){
var W=M.parentNode;
W.dataset.hasEvent||!function(){
var t=document.getElementById("js_reward_pagination"),a=t.getElementsByClassName("js_reward_pagination_curpage")[0],r=Math.ceil(e.reward_total/E),n=1,d=!0,i=document.getElementById("js_reward_list"),o=function(t,a){
for(var n=(t-1)*E,o=d?3*u:0,s=document.createDocumentFragment(),c=n+o,_=t===r?e.reward_total:t*E;_>c;c++)l(s,a?window.defaultAvatarUrl:B[c]);
return!d&&(i.innerHTML=""),i.appendChild(s),d=!1,a?function(){
for(var e=i.getElementsByClassName("reward_user_avatar"),t=o,a=e.length;a>t;t++)e[t].firstElementChild.src=B[n+t];
}:!1;
};
a.innerHTML=n,t.getElementsByClassName("js_reward_pagination_totalpage")[0].innerHTML=r;
var s="/mp/reward?act=getrewardheads&__biz="+biz+"&appmsgid="+mid+"&idx="+idx+"&sn="+sn+"&count="+E,c=null,_=function(t){
var a=B.length;
e.reward_total>a&&t*E>a?(c=null,c=o(t,!0),f({
url:s+"&offset="+(t-1)*E+"#wechat_redirect",
type:"GET",
success:function(e){
try{
e=JSON.parse(e),e.reward_heads=JSON.parse(e.reward_heads).reward_heads;
}catch(t){
e={};
}
e.base_resp&&0===e.base_resp.ret&&(e.reward_heads.forEach(function(e){
var t=S.indexOf(e);
t>-1?S.splice(t,1):B.push(e);
}),"function"==typeof c&&c());
}
})):o(t);
};
A<e.reward_total&&!function(){
b.reward.classList.add("reward_avatar_overflow");
for(var o=i.children[0];1!==o.nodeType;)o=reward.nextElementSibling;
var s=getComputedStyle(o),l=o.offsetHeight+parseInt(s.marginBottom)+parseInt(s.marginTop);
L=function(t){
i.style.height="fold"===t?3*l+"px":r>n?l*Math.ceil(E/u)+"px":l*Math.ceil(e.reward_total%E/u)+"px";
},L("fold"),m.on(W,"click",function(){
b.reward.classList.contains("reward_avatar_unfold")?(b.reward.classList.remove("reward_avatar_unfold"),
r>1&&(t.style.display="none"),L("fold")):(1===n&&d&&_(n),b.reward.classList.add("reward_avatar_unfold"),
r>1&&(t.style.display=""),L("unfold"));
}),r>1&&m.on(t,"click",function(e){
var t=e.target;
if(t.classList.contains("js_reward_pagination_prev")){
if(n--,a.innerHTML=n,_(n),1===n&&(t.disabled=!0),n===r-1){
for(;t&&!t.classList.contains("js_reward_pagination_next");)t=t.nextElementSibling;
t&&(t.disabled=!1),L("unfold");
}
}else if(t.classList.contains("js_reward_pagination_next")&&(n++,a.innerHTML=n,_(n),
n===r&&(t.disabled=!0,L("unfold")),2===n)){
for(;t&&!t.classList.contains("js_reward_pagination_prev");)t=t.previousElementSibling;
t&&(t.disabled=!1);
}
});
}(),W.dataset.hasEvent=1;
}();
}else M.setAttribute("data-href",p),M.getAttribute("data-hasevent")||(m.on(M,"click",function(){
var e=M.getAttribute("data-href");
return y(e,{
sample:1,
reject:function(){
location.href=e;
}
}),!1;
}),M.setAttribute("data-hasevent",1));
}
function l(e,t){
var a=document.createElement("span");
a.className="reward_user_avatar";
var r=new Image;
return r.onload=function(){
window.logs&&window.logs.reward_heads_total++,r.onload=r.onerror=null;
},r.onerror=function(){
window.logs&&window.logs.reward_heads_total++,window.logs&&window.logs.reward_heads_fail++,
r.onload=r.onerror=null;
},r.src=t,a.appendChild(r),e.appendChild(a),a;
}
function c(e){
var t=B.length?B:I;
if(t.length){
var a=document.getElementById("js_reward_list"),r=0,n=document.createDocumentFragment();
if(a){
var d=b.reward.classList.contains("reward_avatar_unfold");
if("function"==typeof L&&L(d?"unfold":"fold"),!e){
for(var i=0,o=t.length;o>i&&(r++,l(n,t[i]),d||r!==3*u)&&r!==(E||16*u);++i);
r>u&&(a.className+=" tl"),a.innerHTML="",a.appendChild(n);
}
}
return r;
}
}
function _(){
if(b.reward){
var e=window.pageYOffset||document.documentElement.scrollTop;
e+x.getInnerHeight()>b.reward.offsetTop&&(f({
type:"GET",
url:"/bizmall/reward?act=report&__biz="+biz+"&appmsgid="+mid+"&idx="+idx,
async:!0
}),m.off(window,"scroll",_),_=null);
}
}
function w(e){
"undefined"!=typeof e.scene&&(k.scene=e.scene),"undefined"!=typeof e.is_need_reward&&(k.is_need_reward=e.is_need_reward),
"undefined"!=typeof e.title&&(k.title=e.title),"undefined"!=typeof e.author_id&&(k.author_id=e.author_id),
"undefined"!=typeof e.user_can_reward&&(k.user_can_reward=e.user_can_reward),"undefined"!=typeof e.appmsgextRtId&&(k.appmsgextRtId=e.appmsgextRtId),
"undefined"!=typeof e.appmsgextRtKey&&(k.appmsgextRtKey=e.appmsgextRtKey),"undefined"!=typeof e.likeHeadId&&(k.likeHeadId=e.likeHeadId),
"undefined"!=typeof e.likeHeadKey&&(k.likeHeadKey=e.likeHeadKey),"undefined"!=typeof e.likeBtnId&&(k.likeBtnId=e.likeBtnId),
"undefined"!=typeof e.likeBtnKey&&(k.likeBtnKey=e.likeBtnKey),"undefined"!=typeof e.authorPageScene&&(k.authorPageScene=e.authorPageScene),
"undefined"!=typeof e.authorPageRscene&&(k.authorPageRscene=e.authorPageRscene),
"undefined"!=typeof e.devicetype&&(k.devicetype=e.devicetype),"undefined"!=typeof e.version&&(k.version=e.version),
"undefined"!=typeof e.send_time&&(k.send_time=e.send_time);
}
var u,p,m=e("biz_common/dom/event.js"),f=e("biz_wap/utils/ajax.js"),g=e("biz_wap/jsapi/core.js"),h=(e("rt/appmsg/getappmsgext.rt.js"),
e("biz_wap/utils/mmversion.js")),v=e("appmsg/appmsgext.js"),y=e("appmsg/open_url_with_webview.js"),x=e("common/utils.js"),k={
scene:window.source||"",
is_need_reward:!1,
title:window.msg_title||"",
author_id:window.author_id||"",
user_can_reward:!0,
appmsgextRtId:"",
appmsgextRtKey:"",
likeHeadId:"110809",
likeHeadKey:"2",
likeBtnId:"110809",
likeBtnKey:"3",
authorPageScene:"142",
authorPageRscene:"128",
devicetype:window.devicetype||"",
version:window.version||"",
send_time:window.send_time||"",
isWindowsWechat:-1!==window.navigator.userAgent.indexOf("WindowsWechat")
},b={
reward:document.getElementById("js_reward_area"),
rewardLink:document.getElementById("js_reward_link"),
authorAvatarLink:document.getElementById("js_reward_avatar"),
rewardAuthorHead:document.getElementById("js_reward_author_head"),
rewardLinkText:document.getElementById("js_reward_link_text"),
rewardTotalText:document.getElementById("js_reward_total_text")
},I=[],j=500,L=null,E=0,B=[];
window.logs&&(window.logs.reward_heads_total=0,window.logs.reward_heads_fail=0);
var T=function(){},z=function(){},R=document.getElementById("js_author_reward_qrcode_img");
return{
handle:function(e,t){
u=t,w(e),s(e);
},
render:function(e){
u=e,c(!0);
}
};
});define("a/ios.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/utils/openUrl.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function t(e){
"undefined"!=typeof WeixinJSBridge&&WeixinJSBridge.log&&WeixinJSBridge.log(e);
}
function i(e,t){
n("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function o(e){
var o=e.btn;
if(!o)return!1;
var n=e.adData,c=!1,d={};
e.report_param=e.report_param||"";
var s="http://"+location.host+"/mp/ad_redirect?url="+encodeURIComponent(n.appinfo_url)+"&ticket="+(e.ticket||window.ticket)+"#wechat_redirect";
r.on(o,"click",function(){
if(t("click @js_app_action"),c)return t("is_app_installed"),i(n.is_appmsg?17:13,e),
void p(n.app_id+"://");
var o=function(){
t("download"),i(n.is_appmsg?15:11,e),t("go : "+s),p(s);
};
return t("download"),n.rl&&n.traceid?d[n.traceid]||(d[n.traceid]=!0,a({
url:"/mp/advertisement_report?report_type=2&type="+n.type+"&url="+encodeURIComponent(n.appinfo_url)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&tid="+n.traceid+"&rl="+encodeURIComponent(n.rl)+"&pt="+n.pt+e.report_param,
type:"GET",
timeout:1e3,
complete:function(){
t("ready to download"),d[n.traceid]=!1,o();
},
async:!0
})):o(),!1;
});
}
{
var r=e("biz_common/dom/event.js"),n=e("biz_common/utils/report.js"),a=e("biz_wap/utils/ajax.js"),p=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
e("biz_wap/jsapi/core.js");
}
return o;
});define("a/android.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/openUrl.js"],function(n,e,a,t){
"use strict";
function o(n){
"undefined"!=typeof s&&s.log&&s.log(n);
}
function i(n,e){
l("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+n+e.report_param);
}
function d(n){
function e(){
s.invoke("getInstallState",{
packageName:c.pkgname
},function(n){
var e=n.err_msg;
e.indexOf("get_install_state:yes")>-1&&(window.clearInterval(x),k=!0,d.innerHTML=T.installed);
});
}
function a(){
j&&s.invoke("queryDownloadTask",{
download_id:j
},function(e){
if(e&&e.state){
if("download_succ"==e.state){
o("download_succ"),i(c.is_appmsg?18:14,n),window.clearInterval(y),I=!1,b=!0,d.innerHTML=T.downloaded;
var a=document.createEvent("MouseEvents");
a.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),d.dispatchEvent(a);
}
if("downloading"==e.state)return;
("download_fail"==e.state||"default"==e.state)&&(o("fail, download_state : "+e.state),
window.clearInterval(y),I=!1,t("下载失败"),d.innerHTML=T.download);
}
});
}
var d=n.btn;
if(!d)return!1;
var l={},c=n.adData,p="",u="",m=c.androiddownurl;
if(m&&m.match){
var _=/&channelid\=([^&]*)/,w=m.match(_);
w&&w[1]&&(p="&channelid="+w[1],c.androiddownurl=m.replace(_,""));
}
n.via&&(u=["&via=ANDROIDWX.YYB.WX.ADVERTISE",n.via].join("."));
var f=!1,v="com.tencent.android.qqdownloader",g=1060125,k=!1,I=!1,b=!1,j=0,y=null,x=null,T={
download:"下载",
downloading:"下载中",
downloaded:"安装",
installed:"已安装"
};
d.innerHTML=T.download,s.ready(function(){
s.invoke("getInstallState",{
packageName:v
},function(n){
var e=n.err_msg;
o("getInstallState @yingyongbao : "+e);
var a=e.lastIndexOf("_")+1,t=e.substring(a);
1*t>=g&&e.indexOf("get_install_state:yes")>-1&&(f=!0);
}),s.invoke("getInstallState",{
packageName:c.pkgname
},function(n){
var e=n.err_msg;
o("getInstallState @"+c.pkgname+" : "+e);
var a=e.lastIndexOf("_")+1,t=e.substring(a);
1*t>=c.versioncode&&e.indexOf("get_install_state:yes")>-1&&(k=!0,d.innerHTML=T.installed);
}),d.addEventListener("click",function(){
if(o("click @js_app_action"),!I){
if(k)return!1;
if(b)return s.invoke("installDownloadTask",{
download_id:j,
file_md5:c.md5sum
},function(n){
var a=n.err_msg;
o("installDownloadTask : "+a),a.indexOf("install_download_task:ok")>-1?x=setInterval(e,1e3):t("安装失败！");
}),!1;
var m=function(){
return f?(i(c.is_appmsg?16:12,n),void s.invoke("launchApplication",{
schemeUrl:"tmast://download?oplist=1,2&pname="+c.pkgname+p+u
})):void s.invoke("addDownloadTask",{
task_name:c.appname,
task_url:c.androiddownurl,
extInfo:n.task_ext_info,
file_md5:c.md5sum
},function(e){
var l=e.err_msg;
o("addDownloadTask : "+l),l.indexOf("add_download_task:ok")>-1?(i(c.is_appmsg?15:11,n),
I=!0,j=e.download_id,o("download_id : "+j),d.innerHTML=T.downloading,y=setInterval(a,1e3)):t("调用下载器失败！");
});
};
return c.rl&&c.traceid?l[c.traceid]||(l[c.traceid]=!0,r({
url:"/mp/advertisement_report?report_type=2&type="+c.type+"&url="+encodeURIComponent(c.androiddownurl)+"&tid="+c.traceid+"&rl="+encodeURIComponent(c.rl)+"&__biz="+biz+"&ascene="+encodeURIComponent(window.ascene||-1)+"&pt="+c.pt+"&r="+Math.random(),
type:"GET",
timeout:1e3,
complete:function(){
l[c.traceid]=!1,m();
},
async:!0
})):m(),!1;
}
});
});
}
{
var l=(n("biz_common/dom/event.js"),n("biz_common/utils/report.js")),r=n("biz_wap/utils/ajax.js"),s=n("biz_wap/jsapi/core.js");
n("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
}
return d;
});define("a/profile.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_wap/utils/position.js","biz_wap/utils/openUrl.js","biz_wap/jsapi/core.js","biz_common/utils/monitor.js","a/a_utils.js"],function(e){
"use strict";
function t(e,t){
l("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function n(e,t){
if(t&&t.crt_exp_info)try{
var n=JSON.parse(t.crt_exp_info.html());
n.is_new_profile?j.invoke("profile",{
username:n.username
}):(console.log("exp to profile h5"),b(e));
}catch(i){
console.error("decode crt_exp_info error",t),b(e);
}else b(e);
return!1;
}
function i(e){
var t={
708:27,
135:28,
117:29
};
t[e]&&y.report115849(t[e]);
}
function a(e){
var a=e.adData,_=e.pos_type||0,b={},y=e.a_info;
e.report_param=e.report_param||"",function(){
function u(e){
i(a.crt_size);
{
var t=w.dataset;
"https:"==top.location.protocol?1500:1200;
}
if(t.rl&&t.url&&t.type&&t.tid){
var n=t.tid,o=t.type,s=t.url,r=t.rl;
if(!b[n]){
b[n]=!0;
var p,c,d,l,u=!!e&&e.target;
u&&(p=f.getX(u,"js_ad_link")+e.offsetX,c=f.getY(u,"js_ad_link")+e.offsetY,d=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
l=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
m({
type:o,
report_type:2,
click_pos:0,
url:encodeURIComponent(s),
tid:n,
rl:encodeURIComponent(r),
__biz:biz,
pos_type:_,
pt:a.pt,
pos_x:p,
pos_y:c,
ad_w:d||0,
ad_h:l||0
},function(){
b[n]=!1,k();
});
}
}else k();
}
var w=e.btnAddContact,v=e.btnViewProfile;
if(w&&w.dataset){
var z=function C(i,o){
var s=i.err_msg,r=a.is_appmsg?6:1;
-1!=s.indexOf("ok")?(v.style.display="inline-block",w.style.display="none",r=a.is_appmsg?9:4):"add_contact:added"==s?r=a.is_appmsg?7:2:"add_contact:cancel"==s?r=a.is_appmsg?8:3:(--o,
o>=0?j.invoke("addContact",{
scene:scene,
webtype:"1",
username:a.usename
},function(e){
C(e,o);
}):(s="addContact:fail|msg:"+s+"|uin:"+uin+"|biz:"+biz,l("http://mp.weixin.qq.com/mp/jsreport?key=13&content="+s+"&r="+Math.random()),
n(a.url,y))),t(r,e);
},k=function(){
t(a.is_appmsg?10:5,e),g.setSum(110696,7,1),o?g.setSum(110696,10,1):(o=!0,s=+new Date),
r?+new Date-r<2e3&&(g.setSum(110696,11,1),setTimeout(function(){
r=0;
},2e3)):r=+new Date,p?+new Date-p<3e3&&(g.setSum(110696,12,1),setTimeout(function(){
p=0;
},3e3)):p=+new Date,c?+new Date-c<4e3&&(g.setSum(110696,13,1),setTimeout(function(){
c=0;
},4e3)):c=+new Date,j.invoke("addContact",{
scene:scene,
webtype:"1",
username:a.usename
},function(e){
var t=+new Date-s;
g.setAvg(110696,9,t).send(),o=!1,z(e,1);
});
};
d.on(w,"click",u);
}
}(),function(){
var t=e.btnViewProfile;
t&&d.on(t,"click",function(){
i(a.crt_size);
var t=e.btnAddContact.dataset,o={
source:4,
tid:t.tid,
idx:idx,
mid:mid,
appuin:biz,
pt:a.pt,
aid:e.aid,
ad_engine:e.ad_engine,
pos_type:_
},s=u.join(a.url,o);
return n(s,e.a_info),!1;
});
}(),function(){
var o=e.btnProfile;
if(o){
var s=function p(i,o,s){
var r=i.err_msg,c=a.is_appmsg?6:1;
-1!=r.indexOf("ok")?(e.adData.biz_info.is_subscribed=1,console.log(s),s.innerHTML=s.innerHTML.replace("关注","查看"),
c=a.is_appmsg?9:4):"add_contact:added"==r?c=a.is_appmsg?7:2:"add_contact:cancel"==r?c=a.is_appmsg?8:3:(--o,
o>=0?j.invoke("addContact",{
scene:scene,
webtype:"1",
username:a.usename
},function(e){
p(e,o,s);
}):(r="addContact:fail|msg:"+r+"|uin:"+uin+"|biz:"+biz,l("http://mp.weixin.qq.com/mp/jsreport?key=13&content="+r+"&r="+Math.random()),
n(a.url,e.a_info))),t(c,e);
},r=function(n){
t(a.is_appmsg?10:5,e),j.invoke("addContact",{
scene:scene,
webtype:"1",
username:a.usename
},function(e){
s(e,1,n);
});
};
d.on(o,"click",function(t){
if(i(a.crt_size),console.log("has_click",b,e.adData),e.adData.biz_info.is_subscribed){
var o=e.adData;
o.tid=o.traceid;
var s={
source:4,
tid:o.tid,
idx:idx,
mid:mid,
appuin:biz,
pt:a.pt,
aid:e.aid,
ad_engine:e.ad_engine,
pos_type:_
},p=u.join(a.url,s);
n(p,e.a_info);
}else{
{
var o=e.adData;
"https:"==top.location.protocol?1500:1200;
}
if(o.tid=o.traceid,o.rl&&o.url&&o.type&&o.tid){
var c=o.tid,d=o.type,p=o.url,l=o.rl;
if(!b[c]){
console.log("has_click[tid]",b[c]),b[c]=!0;
var j,g,y,w,v=!!t&&t.target;
v&&(j=f.getX(v,"js_ad_link")+t.offsetX,g=f.getY(v,"js_ad_link")+t.offsetY,y=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
w=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
m({
type:d,
report_type:2,
click_pos:0,
url:encodeURIComponent(p),
tid:c,
rl:encodeURIComponent(l),
__biz:biz,
pos_type:_,
pt:a.pt,
pos_x:j,
pos_y:g,
ad_w:y||0,
ad_h:w||0
},function(){
b[c]=!1,r(v);
});
}
}else{
var v=!!t&&t.target;
r(v);
}
}
return!1;
});
}
}();
}
var o,s,r,p,c,d=e("biz_common/dom/event.js"),l=e("biz_common/utils/report.js"),_=e("a/a_report.js"),m=_.AdClickReport,u=(e("biz_wap/utils/ajax.js"),
e("biz_common/utils/url/parse.js")),f=e("biz_wap/utils/position.js"),b=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,j=e("biz_wap/jsapi/core.js"),g=("https:"==top.location.protocol?5:0,
window.__report,e("biz_common/utils/monitor.js")),y=e("a/a_utils.js");
return a;
});define("a/app_card.js",["biz_common/dom/event.js","biz_common/dom/class.js","a/a_report.js","biz_wap/utils/position.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/appdialog_confirm.js","biz_wap/utils/openUrl.js","a/a_utils.js","biz_common/utils/url/parse.js"],function(a,t,e,n){
"use strict";
function o(a){
"undefined"!=typeof c&&c.log&&c.log(a);
}
function s(a){
this.g={
app_status:"download",
btn:null,
download_id:0,
clock:null,
install_clock:null,
data:{},
channelid:"",
via:"",
report_param:"",
appdetail_params:"",
btn_percent:0,
btn_width:0,
btn_height:0
};
var t=this,e=this.g;
if(e.btn=a.btn,!e.btn)return!1;
e.data=a.adData,e.url_scheme=a.url_scheme,e.appdetail_params=a.appdetail_params||"",
e.percentStatus=a.percentStatus;
var s={};
e.channelid=e.data.channel_id||"",e.report_param=a.report_param;
var i=20;
if(("103"==e.data.pt||"104"==e.data.pt)&&t.setAppRating(a),"104"==e.data.pt||"113"==e.data.pt||"114"==e.data.pt||"122"==e.data.pt||e.data.use_new_protocol>0&&12==e.data.product_type){
var l=e.data.androiddownurl;
if(l&&l.match){
var _=/&channelid\=([^&]*)/,g=l.match(_);
g&&g[1]&&(e.channelid=g[1],e.data.androiddownurl=l.replace(_,""));
}
e.channelid&&(e.channelid="&channelid="+e.channelid),a.via&&(e.via=["&via=ANDROIDWX.YYB.WX.ADVERTISE",a.via].join("."));
}
c.ready(function(){
console.log("appcard info",e),("113"==e.data.pt||"114"==e.data.pt||"104"==e.data.pt||"122"==e.data.pt||e.data.use_new_protocol>0&&12==e.data.product_type)&&(c.invoke("getInstallState",{
packageName:b
},function(a){
var t=a.err_msg;
o("getInstallState @yingyongbao : "+t);
var e=t.lastIndexOf("_")+1,n=t.substring(e);
1*n>=v&&t.indexOf("get_install_state:yes")>-1&&(h=!0);
}),c.invoke("getInstallState",{
packageName:e.data.pkgname
},function(a){
var n=a.err_msg;
o("getInstallState @"+e.data.pkgname+" : "+n);
var s=n.lastIndexOf("_")+1,d=n.substring(s);
n.indexOf("get_install_state:yes")>-1&&t.setBtn(1*d>=e.data.versioncode&&e.url_scheme?"gotodetail":"installed");
})),console.log("bind btn",e.btn.id),d.on(e.btn,"click",function(d){
if(console.log("app click",e),console.log(d.target),"installed"==e.app_status)return t.setBtn("installed"),
!1;
if("gotodetail"==e.app_status)return t.report(74),t.gotoDetail(),!1;
if("downloading"==e.app_status)return t.report(71),t.pauseDownload(),!1;
if("paused"==e.app_status)return t.report(72),t.resumeDownload(),!1;
if("downloaded"==e.app_status)return t.report(73),c.invoke("installDownloadTask",{
download_id:e.download_id,
file_md5:e.data.md5sum
},function(a){
var s=a.err_msg;
o("installDownloadTask : "+s),s.indexOf("install_download_task:ok")>-1?e.install_clock=setInterval(t.installStateChange.bind(t),500):n("安装失败！");
}),!1;
var l=function(){
if("103"==e.data.pt||"111"==e.data.pt||"112"==e.data.pt||"121"==e.data.pt||e.data.use_new_protocol>0&&19==e.data.product_type){
t.report(23);
var s=e.data.ticket||window.ticket;
if(e.url_scheme&&u.gtVersion("6.5.6",!0)){
var d=1,l=navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
l&&l[1]&&parseInt(l[1].split("_")[0],10)>=12&&(d=0);
var r={
schemeUrl:e.url_scheme,
messageExt:e.url_scheme,
appID:e.data.app_info.open_platform_appid,
installSchemeUrl:e.data.app_info.appinfo_url,
installAction:d
};
c.invoke("launchApplication",r,function(a){
(-1===a.err_msg.indexOf("ok")||"fail"===a.launchInstallResult)&&w.openWebAppStore(e.data.appinfo_url,s);
});
}else w.openWebAppStore(e.data.appinfo_url,s);
}else{
if(h)return t.report(16),void c.invoke("launchApplication",{
schemeUrl:"tmast://download?oplist=1,2&pname="+e.data.pkgname+e.channelid+e.via
});
t.report(15);
var p=[e.data.adid,e.data.traceid,(e.data.pkgname||"").replace(/\./g,"_"),e.data.source,i,a.engine].join("."),_=function(a,t,e){
console.log("addDownloadTask : "+a.data.appname+","+a.data.androiddownurl+","+t+","+a.data.md5sum),
c.invoke("addDownloadTaskStraight",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},function(n){
var o=n.err_msg;
o.indexOf("ok")>-1?e&&e(n):c.invoke("addDownloadTask",{
task_name:a.data.appname,
task_url:a.data.androiddownurl,
extInfo:t,
file_md5:a.data.md5sum
},e);
}),a.url_scheme&&u.isAndroid&&u.gtVersion("6.5.6",!0)&&c.invoke("writeCommData",{
packageName:a.data.pkgname,
data:a.url_scheme
},function(a){
console.log(a);
});
};
console.log("addDownloadTask : "+e.data.appname+","+e.data.androiddownurl+","+p+","+e.data.md5sum),
_(e,p,function(a){
var s=a.err_msg;
o("addDownloadTask : "+s),s.indexOf("ok")>-1?(e.download_id=a.download_id,y[e.download_id]=t,
o("download_id : "+e.download_id),t.setBtn("downloading"),e.clock=setInterval(t.queryDownloadState.bind(t),500),
e.install_clock=setInterval(t.installStateChange.bind(t),500),t.changeDownloadState()):n("调用下载器失败！");
});
}
},_=function(){
return u.isIOS?void l():void m({
app_name:e.data.appname,
app_img_url:e.data.icon_url,
onOk:function(){
l(),t.report(h?106:100);
},
onCancel:function(){
t.report(h?107:101);
}
});
};
if("download"==e.app_status&&e.data.rl&&e.data.traceid){
if(!s[e.data.traceid]){
s[e.data.traceid]=!0;
var g,f,b,v,k=!!d&&d.target;
k&&(g=p.getX(k,"js_ad_link")+d.offsetX,f=p.getY(k,"js_ad_link")+d.offsetY,b=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
v=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
r({
type:e.data.type,
report_type:2,
click_pos:0,
url:encodeURIComponent(e.data.androiddownurl),
tid:e.data.traceid,
rl:encodeURIComponent(e.data.rl),
__biz:biz,
pos_type:a.pos_type||0,
pt:e.data.pt,
pos_x:g,
pos_y:f,
ad_w:b||0,
ad_h:v||0
},function(){
s[e.data.traceid]=!1,_();
});
}
}else _();
return!1;
});
});
}
var d=a("biz_common/dom/event.js"),i=a("biz_common/dom/class.js"),l=a("a/a_report.js"),r=l.AdClickReport,p=a("biz_wap/utils/position.js"),_=a("biz_common/utils/report.js"),c=a("biz_wap/jsapi/core.js"),u=a("biz_wap/utils/mmversion.js"),m=a("a/appdialog_confirm.js"),g=a("biz_wap/utils/openUrl.js"),w=a("a/a_utils.js"),f={
download:"下载",
downloading:"下载中",
paused:"继续",
downloaded:"安装",
gotodetail:"进入",
installed:"已安装"
},h=!1,b="com.tencent.android.qqdownloader",v=1060125,k=!1,y={},j=g.openUrlWithExtraWebview;
return s.prototype.report=function(a){
var t=this.g;
_("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+a+t.report_param);
},s.prototype.setBtn=function(a,t){
var e=this.g,n=e.data.pt;
if(e.app_status=a,e.percentStatus)return e.percentStatus(a,t),!1;
if("downloading"===a){
t=t||0;
var o="";
if(e.btn_width=e.btn.offsetWidth,e.btn_height=e.btn.offsetHeight,104===n?o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停('+t+"%)</span>":113===n||114===n?e.btn.innerHTML.indexOf("继续")>-1?(o=e.btn.innerHTML,
o=o.replace("继续","暂停")):o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">暂停</span>':122===n?(e.btn.innerHTML.indexOf("继续")>-1?(o=e.btn.innerHTML,
o=o.replace(/继续/g,"暂停")):o='<span class="btn_progress_inner js_btn_process" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+e.btn_width+'px;">暂停</span></span>暂停',
e.btn_percent=t):1===e.data.use_new_protocol?(e.btn_width=e.btn.offsetWidth,e.btn_height=e.btn.offsetHeight,
e.btn.innerHTML.indexOf("继续")>-1?(o=e.btn.innerHTML,o=o.replace(/继续/g,"暂停")):o='<span class="btn_progress_inner js_btn_process" style="width:'+t+'%;"><span id="percent_btn_2" class="btn_progress_bd js_btn_process" style="width:'+e.btn_width+"px; line-height: "+e.btn_height+'px">暂停下载</span></span>暂停下载',
e.btn_percent=t):o='<i class="btn_processor" style="width:'+t+'%;"></i><span class="btn_processor_value js_btn_process">'+t+"%</span>",
!o)return;
e.btn.innerHTML=o,122===n||1===e.data.use_new_protocol?i.addClass(e.btn,"btn_progress"):i.addClass(e.btn,"with_processor");
}else if("paused"===a){
var o="";
104===n||113===n||114===n||122===n||e.data.use_new_protocol>0?(o=e.btn.innerHTML,
o=o.replace(/暂停/g,"继续"),e.btn.innerHTML=o):(i.removeClass(e.btn,"with_processor"),
i.removeClass(e.btn,"btn_progress"),e.btn.innerHTML=f[a]);
}else i.removeClass(e.btn,"with_processor"),i.removeClass(e.btn,"btn_progress"),
e.btn.innerHTML=f[a],e.data.use_new_protocol>0&&"gotodetail"===a&&(e.btn.innerHTML="进入应用");
},s.prototype.setAppRating=function(a){
var t=this.g,e=a.js_app_rating,n=1*t.data.app_rating;
n>5&&(n=5),0>n&&(n=0);
var o=["","one","two","three","four","five"],s="",d=Math.floor(n);
if(s="star_"+o[d],n>d&&(n=d+.5,s+="_half"),e&&n>0){
var l=e.getElementsByClassName("js_stars"),r=e.getElementsByClassName("js_scores");
l&&r&&l[0]&&r[0]&&(l=l[0],r=r[0],l.style.display="inline-block",i.addClass(l,s));
}
},s.prototype.changeDownloadState=function(){
if(!k){
{
this.g;
}
k=!0,c.on("wxdownload:progress_change",function(a){
y[a.download_id]&&y[a.download_id].setBtn("downloading",a.progress);
});
}
},s.prototype.queryDownloadState=function(){
var a=this.g,t=this;
a.download_id&&c.invoke("queryDownloadTask",{
download_id:a.download_id
},function(e){
if(o("queryDownloadTask : "+e.state+"; dowloadid = "+a.download_id),e&&e.state){
if("download_succ"==e.state&&(t.setBtn("downloaded"),window.clearInterval(a.clock)),
"downloading"==e.state)return;
"download_fail"==e.state&&(window.clearInterval(a.clock),window.clearInterval(a.install_clock),
n("下载失败"),t.setBtn("download"));
}
});
},s.prototype.installStateChange=function(){
var a=this.g,t=this;
c.invoke("getInstallState",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(e){
var n=e.err_msg;
n.indexOf("get_install_state:yes")>-1&&(o("getInstallState @app, version : "+n),
window.clearInterval(a.install_clock),t.setBtn(a.url_scheme?"gotodetail":"installed"));
});
},s.prototype.pauseDownload=function(){
var a=this.g,t=this;
c.invoke("pauseDownloadTask",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(a){
a.err_msg.indexOf("pause_download_task:ok")>-1&&t.setBtn("paused");
});
},s.prototype.resumeDownload=function(){
var a=this.g,t=this;
c.invoke("resumeDownloadTask",{
packageName:a.data.pkgname,
download_id:a.download_id
},function(a){
a.err_msg.indexOf("ok")>-1&&t.setBtn("downloading");
});
},s.prototype.gotoDetail=function(){
var t=this.g;
if(104==t.data.pt||113==t.data.pt||114==t.data.pt||122==t.data.pt||t.data.use_new_protocol>0&&12==t.data.product_type&&t.url_scheme)u.gtVersion("6.5.6",!0)?c.invoke("launchApplication",{
schemeUrl:t.url_scheme
},function(a){
-1==a.err_msg.indexOf("ok")&&(location.href=t.url_scheme);
}):location.href=t.url_scheme;else{
var e=t.data.url,n=a("biz_common/utils/url/parse.js");
(!e||0!=e.indexOf("http://mp.weixin.qq.com/tp/")&&0!=e.indexOf("https://mp.weixin.qq.com/tp/"))&&(e="http://mp.weixin.qq.com/mp/ad_app_info?t=ad/app_detail&app_id="+t.data.app_id+(t.appdetail_params||"")+"&channel_id="+t.channelid+"&md5sum="+t.data.md5sum+"#wechat_redirect"),
t.url_scheme&&(e=n.join(e,{
is_installed:"1"
})),j(e);
}
},s;
});define("a/sponsor.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","a/wxopen_card.js","biz_wap/utils/openUrl.js","biz_wap/utils/ajax.js","biz_wap/utils/device.js","common/utils.js"],function(e){
"use strict";
function t(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function o(e,t,o,i){
r("http://mp.weixin.qq.com/mp/ad_complaint?&action=report&type="+e+"&pos_type="+t+"&trace_id="+o+"&aid="+i+"&__biz="+window.biz+"&r="+Math.random());
}
function i(){
w({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST",
success:function(){}
});
}
function a(e,o,i){
o.canvas_info?_.invoke("openADCanvas",{
canvasId:o.canvas_info.canvas_id,
preLoad:0,
noStore:0,
extraData:JSON.stringify({
pos_type:o.pos_type
}),
adInfoXml:o.canvas_info.ad_info_xml
},function(o){
0!=o.ret?(u(e),t(135,i)):t(134,i);
}):u(e);
}
function n(e){
var n=e.adData,r=e.pos_type,_=n.traceid,s=e.a_info.type,w=n.adid,h=n.url,b=e.a_info.rl;
110==n.pt&&(h=h.replace("#","&AdType=80#"));
var j={};
e.report_param=e.report_param||"";
var z=e.adDetailBtn,x=e.adMoreBtn,T=(e.adMessage,e.adAbout),I=e.adComplain,k=e.adImg,W=e.adVideo,H=0,U=document.getElementById("js_sponsor_opt_list"),A={
type:s,
report_type:2,
url:encodeURIComponent(h),
tid:_,
rl:encodeURIComponent(b),
__biz:biz,
pos_type:r,
pt:n.pt,
click_pos:"",
aid:e.a_info.aid
},E=null,b=n.rl||"",M="";
if(b){
b=b.split("?"),b=b.length>1?b[1]:"";
var P=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),q=b.match(P);
q&&(M=unescape(q[2]));
}
window.__video_report_data={
aid:n.adid,
traceid:n.traceid,
user_uin:window.user_uin,
publisher_appid:n.publisher_appid||0,
appmsg_id:mid,
item_idx:idx,
viewid:M,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var O=null,S=!0,C=!1;
if(p.isAndroid&&p.gtVersion("6.6.6",!0)&&(C=!0),console.log("data.videoUrl",n),W&&n.videoUrl){
E=new l({
container:W,
cover:n.thumbUrl,
width:W.offsetWidth,
height:W.offsetWidth*parseInt(n.displayHeight)/parseInt(n.displayWidth),
muted:!0,
ad_muted_btn:!0,
always_hide_loading:!0,
src:n.videoUrl,
autoHide:!0,
blockTouchVideo:!0,
onError:function(o){
console.log("播放出错",o),t(123,e),W.parentNode.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+n.thumbUrl+"); height:"+m.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
t(122,e),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,E.replay(),i();
},
onTimeupdate:function(e,t){
2==window.__video_report_data.report_type&&(window.__video_report_data.report_type=3,
i()),window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*t.currentTime,
window.__video_report_data.video_duration=1e3*E.__getDuration(),y||(window.__video_report_data.report_type=3,
i(),y=1);
}
}),H=29,E._showPlayer(),E.setSrc(n.videoUrl,"auto");
var B=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
if(p.isAndroid)if(m.offsetTop>B&&m.offsetTop<B+g.getInnerHeight())window.__video_report_data.auto_play=0;else{
var D=function R(){
E.__beginPlayHandler(),d.off(window,"touchstart",R),C=!0;
};
d.on(window,"touchstart",D);
}
var N=function V(){
if(3==window.__video_report_data.play_type)return void d.off(window,"scroll",V);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type){
B=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
var o=g.getInnerHeight();
if(E.isPlay()&&(m.offsetTop>B+o||m.offsetTop+m.offsetHeight<B))E.pause();else if(!E.isPlay()&&v.canSupportAutoPlay&&!(m.offsetTop>B+o||m.offsetTop+m.offsetHeight<B)){
if(p.isAndroid&&!C)return;
0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(t(121,e),
p.isIOS&&E.triggerMuted(!0),E.__beginPlayHandler()):E.play();
}
}
};
d.on(window,"scroll",N),N(),O=function(){
window.setTimeout(function(){
E.triggerMuted(!0);
},1e3);
};
}
d.on(window,"touchend",function(e){
console.log(e.target),e.target==T||e.target==z||e.target==I||e.target.className.indexOf("js_opt_item")>=0||(T.style.display="none",
I.style.display="none",U.style.display="none");
}),d.on(document.getElementById("js_ad_inner"),"click",function(o){
if(o.target.className.indexOf("js_muted_btn")>-1)"true"==E.video.getAttribute("muted")?(E.triggerMuted(!1),
S=!1):(E.triggerMuted(!0),S=!0),t(124,e);else{
if(E&&(!E.isPlay()||0==window.__video_report_data.play_type))return E.__beginPlayHandler(),
S||E.triggerMuted(!1),t(121,e),void(window.__video_report_data.play_type=2);
"js_main_img"==o.target.id||o.target.className.indexOf("video_mask")>-1?j[_+"_1"]||(j[_+"_1"]=!0,
A.click_pos=1,f(A,function(){
t(87+H,e),j[_+"_1"]=!1,!!O&&O(),6!=e.a_info.dest_type?a(h,e.a_info,e):c.openWxopen(e.a_info);
})):j[_+"_2"]||(j[_+"_2"]=!0,A.click_pos=2,f(A,function(){
t(88+H,e),j[_+"_2"]=!1,!!O&&O(),6!=e.a_info.dest_type?a(h,e.a_info,e):c.openWxopen(e.a_info);
}));
}
return!1;
}),d.on(x,"click",function(){
return j[_+"_3"]||(j[_+"_3"]=!0,A.click_pos=3,f(A,function(){
t(89+H,e),j[_+"_3"]=!1,!!O&&O(),6!=e.a_info.dest_type?a(h,e.a_info,e):c.openWxopen(e.a_info);
})),!1;
}),d.on(z,"click",function(){
return t(90+H,e),o(0,r,e.a_info.traceid,e.a_info.aid),"none"==window.getComputedStyle(T).display?(T.style.display="initial",
U.style.display="initial",parseInt(window.can_see_complaint)&&(I.style.display="initial")):(T.style.display="none",
I.style.display="none",U.style.display="none"),!1;
}),d.on(T,"click",function(){
t(91+H,e);
var o="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/trade_about.html?aid="+w+"&tid="+_+"#wechat_redirect";
return!!O&&O(),u(o),!1;
}),d.on(I,"click",function(){
var t="https://mp.weixin.qq.com/promotion/res/htmledition/mobile/html/feedback.html?aid="+e.a_info.aid+"&traceid="+e.a_info.traceid+"&source="+r+"&biz="+window.biz;
return!!O&&O(),o(1,r,e.a_info.traceid,e.a_info.aid),u(t),!1;
}),d.on(window,"resize",function(){
setTimeout(function(){
var t=m.clientWidth;
if(k&&2!=e.a_info.use_new_protocol)k.style.height=t/1.77+"px",console.log("do not change height");else{
var o=W.offsetWidth,i=W.offsetWidth*parseInt(n.displayHeight)/parseInt(n.displayWidth);
E.setHeight(i),E.setWidth(o),m.style.width=o,m.style.height=i;
}
},0);
});
}
var d=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),_=e("biz_wap/jsapi/core.js"),p=e("biz_wap/utils/mmversion.js"),s=e("a/a_report.js"),l=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),c=e("a/wxopen_card.js"),u=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,f=s.AdClickReport,m=(e("biz_common/utils/url/parse.js"),
document.getElementById("js_sponsor_ad_area")),w=e("biz_wap/utils/ajax.js"),y=!1,v=e("biz_wap/utils/device.js"),g=e("common/utils.js");
return n;
});define("a/tpl/cpc_tpl.html.js",[],function(){
return'<!--cpc 文中广告-->\n<div id="js_cpc_area" class="js_ad_link mpad_cpc <# if(pos_type == 0 || pos_type == 3){ #> article_bottom<# } #>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n    <!--有文字 "广告"-->\n    <!--<# if(tag_pos == \'left\'){ #>\n    "广告" 居左\n    <div class="mpad_cpc_adTag_left mpad_more_cps_left_container">广告<div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n                <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                    </ul>\n        </div>\n    </div>\n    <# } else if(tag_pos == \'right\'){ #>\n    "广告" 居右\n    <div class="mpad_cpc_adTag_right mpad_more_cps_right_container">广告<div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n            <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                <li class="mpad_more_list_ele">\n                    <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <# } #>-->\n    <div class="mpad_cpc_inner">\n        <# if(isVideo){ #> <!--视频-->\n        <div class="mpad_cpc_bd mpad_cpc_video"></div>\n        \n        <# }else{ #> <!--纯图片-->\n        <div class="mpad_cpc_bd js_ad_main_area js_material_<#=pos_type#>" style="background-image:url(<#=banner#>)" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>"></div>\n        <# } #>\n\n        <div class="mpad_cpc_ft <# if(!price){ #> single<# } #>">\n            <div class="mpad_cpc_ft_hd">\n                <# if(avatar){ #><!--头像-->\n                <span class="<# if(isDownload){ #> mpad_cpc_avatar<# }else{ #> mpad_cpc_avatar_round<# } #>" style="background: url(<#=avatar#>) no-repeat center; background-size: contain;"></span>\n                <# } #>\n                \n                \n                <div class="mpad_cpc_ft_msg">\n                    <!--有title和金额-->\n                    <# if(!!title){ #>\n                        <span class="mpad_cpc_ft_msg_title"><#=title#></span>\n                        <# if(!!price){ #>\n                        <span class="mpad_cpc_ft_msg_price">¥<#=price#></span>\n                        <# } #>\n                    <# } #>\n                    <# if(!(tag_pos == \'left\' || tag_pos == \'right\')){ #><!--广告标在里面-->\n                    <!--当没有title和价格的时候，出广告标，底部广告不会出现没有title的情况，所以底部不会出现广告标-->\n                    <div class="mpad_cpc_adTag_inner mpad_more_innertips_container <# if(!title && !price){ #> single<# } #> js_ad_opt_list_btn_<#=pos_type#>">广告<div href="javascript:;" class="mpad_more js_mpad_more" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n                            <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                                <li class="mpad_more_list_ele">\n                                    <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                    <# } #>\n                </div>\n            </div>\n            <a href="javascript:void(0);" class="mpad_cpc_btn js_ad_btn_<#=pos_type#>" id="js_ad_btn_<#=pos_type#>">\n                <# if(!!is_wx_app){ #><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt=""><# } #><#=btn_text#>\n            </a>\n        </div>\n    </div>\n</div>';
});define("a/appdialog_confirm.js",["widget/wx_profile_dialog_primary.css","a/a_utils.js","common/utils.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","biz_common/tmpl.js","biz_common/dom/event.js","a/appdialog_confirm.html.js"],function(o){
"use strict";
o("widget/wx_profile_dialog_primary.css");
var e=o("a/a_utils.js"),n=o("common/utils.js"),i=o("biz_wap/jsapi/core.js"),a=o("biz_common/utils/url/parse.js"),m=o("biz_common/tmpl.js"),c=o("biz_common/dom/event.js"),s=o("a/appdialog_confirm.html.js"),t=function(o){
if(e.isVideoSharePageOnlyAd()||n.isNativePage()||a.getQuery("get_ad_after_video"))return void i.invoke("confirmDialog",{
title:"是否立即下载该应用",
contentDesc:o.app_name,
confirmText:"下载",
cancelText:"取消",
msgIconUrl:o.app_img_url,
msgIconWidth:50,
msgIconHeight:50
},function(e){
e.err_msg.indexOf("confirmDialog:ok")>-1?o.onOk&&o.onOk():o.onCancel&&o.onCancel();
});
var t=document.createElement("div");
t.innerHTML=m.tmpl(s,o),document.body.appendChild(t),c.on(t.getElementsByClassName("js_ok")[0],"click",function(){
o.onOk&&o.onOk(),document.body.removeChild(t);
}),c.on(t.getElementsByClassName("js_cancel")[0],"click",function(){
o.onCancel&&o.onCancel(),document.body.removeChild(t);
});
};
return t;
});