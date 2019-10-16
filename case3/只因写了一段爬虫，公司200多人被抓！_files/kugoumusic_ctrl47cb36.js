define("sougou/a_tpl.html.js",[],function(){
return'<h3 class="rich_media_area_title">相关文章</h3>\n<ul class="relate_article_list">\n    <# for(var i in list){#>\n    <li class="relate_article_item">\n        <a class="relate_article_link sg_link" href="<#=list[i].url#>" target="_blank"><#=list[i].title#></a>\n    </li>\n    <#}#>\n</ul>\n';
});define("appmsg/emotion/emotion.js",["appmsg/emotion/dom.js","appmsg/emotion/slide.js","appmsg/emotion/common.js","appmsg/emotion/nav.js","appmsg/emotion/textarea.js","biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js","biz_common/dom/class.js"],function(t,n){
"use strict";
function e(){
v.WIDTH=y=_("#js_article").width()||_("#js_cmt_mine").width(),v.pageCount=k=i(),
o(),a(),s();
}
function i(){
u=y-2*P,S=parseInt(u/W),M=3*S-1;
var t=parseInt(R/M);
return R%M!==0&&t++,t;
}
function o(){
var t=_("#js_slide_wrapper"),n=v.wrapperWidth=k*y;
t.css({
width:n+"px"
});
}
function a(){
for(var t=_("#js_slide_wrapper").el[0],n=(y-S*W)/2,e=0,i=k;i>e;e++){
var o=document.createElement("ul");
o.setAttribute("class","emotion_list"),t.appendChild(o),_(o).css({
width:y+"px",
"float":"left",
"padding-left":n+"px",
"padding-right":"0"
}),c(o,e,n);
}
}
function s(){
for(var t=_("#js_navbar"),n=0,e=k;e>n;n++){
var i=_(_.el("li"));
i.attr("class","emotion_nav js_emotion_nav"),D.push(i),t.append(i);
}
v.navs=D;
}
function c(t,n,e){
for(var i=0,o=M;o>i;i++){
var a=document.createElement("li");
if(A++,A>R)break;
a=r(A),_(t).append(a);
}
var s=m(e);
_(t).append(s);
}
function r(t){
var n=_(_.el("li")),e=_(_.el("i")),i=0;
e.attr("class","icon_emotion icon"+t),e.css({
"background-position":"0px "+((1-t)*Z-i)+"px"
}),n.attr("class","emotion_item js_emotion_item"),n.attr("data-index",t);
var o=W+"px";
return n.css({
width:o,
height:o
}),n.append(e),n;
}
function m(t){
var n=_(_.el("li")),e=_(_.el("i"));
n.attr("class","emotion_item del js_emotion_item"),n.attr("data-index",-1),e.attr("class","icon_emotion del");
var i=W+"px";
return n.css({
width:i,
height:i,
right:t+"px"
}),n.append(e),n;
}
function l(){
function t(){
o.show(),w.show(),i.blur(),_.later(function(){
i.blur();
});
}
function n(){
o.hide(),w.hide(),i.focus(),_.later(function(){
i.focus();
});
}
w=_("#js_emotion_panel");
var e=_("#js_cmt_input"),i=e.el[0],o=_("#js_emotion_panel_arrow_wrp"),a=document.getElementById("js_emotion_switch"),s="emotion_switch_current";
w.hide(),_("#js_emotion_switch").on("tap",function(e){
console.log("emotion click"),e.preventDefault(),e.stopPropagation(),g=!g,g?(t(),
E.addClass(a,s)):(n(),E.removeClass(a,s));
}),e.on("tap",function(){
w.hide(),g=!1;
});
}
function p(){
function t(t){
if(!v.isMoved){
var n=_(t.currentTarget),e=+n.attr("data-index");
h.inputEmotion(e);
}
}
_("li.js_emotion_item").on("click",t),_("li.js_emotion_item").on("touchend",t);
}
function d(t){
for(var n=[],e=0;e<x.length;e++){
var i=x[e];
if(i.cn){
var o=new RegExp(i.cn.replace("[","\\[").replace("]","\\]"),"g"),a=t.match(o);
a&&(n=n.concat(a));
}
if(i.emoji){
var o=new RegExp(i.emoji,"g"),a=t.match(o);
a&&(n=n.concat(a));
}
}
return _.each(n,function(n){
if(void 0!==O[n]){
var e=O[n],i=z[e],o='<i class="icon_emotion_single '+i+'"></i>';
t=t.replace(n,o);
}
}),t;
}
for(var u,_=t("appmsg/emotion/dom.js"),f=t("appmsg/emotion/slide.js"),v=t("appmsg/emotion/common.js"),j=t("appmsg/emotion/nav.js"),h=t("appmsg/emotion/textarea.js"),n=(_.each,
{}),g=!1,w=null,x=t("biz_common/utils/emoji_data.js"),b=t("biz_common/utils/emoji_panel_data.js"),E=t("biz_common/dom/class.js"),I={},O={},z=[],T=0;T<x.length;T++){
var C=x[T];
I[C.id]=C;
}
for(var T=0;T<b.length;T++){
var N=b[T],C=I[N];
O[C.cn]=T,C.emoji&&(O[C.emoji]=T),z.push(C.style);
}
var k,M,S,y,D=[],P=15,R=v.EMOTIONS_COUNT,W=v.EMOTION_LI_SIZE,Z=v.EMOTION_SIZE;
n.init=function(){
l(),e(),f.init(),j.activeNav(0),p(),h.init();
};
var A=0;
return n.encode=function(t){
t=d(t);
var n=/\/([\u4e00-\u9fa5\w]{1,4})/g,e=t.match(n);
return e?(_.each(e,function(n){
var e=n.replace("/",""),i=[e.slice(0,4),e.slice(0,3),e.slice(0,2),e.slice(0,1)];
_.each(i,function(n){
if(void 0!==O["["+n+"]"]){
var e=O["["+n+"]"],i=z[e],o='<i class="icon_emotion_single '+i+'"></i>';
t=t.replace("/"+n,o);
}
});
}),t):t;
},n.hidePannel=function(){
w.hide();
},n;
});define("biz_common/utils/report.js",[],function(){
"use strict";
return function(n){
var e=new Image;
e.src=n;
};
});define("appmsg/articleReport.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/mmversion.js"],function(i){
"use strict";
function n(i){
i.dom&&(i.dom.style.display="",t.tap(i.dom,function(){
var n=["https://mp.weixin.qq.com/mp/infringement?url=",encodeURIComponent(i.link.htmlDecode()),"&title=",encodeURIComponent(i.title),"&__biz=",window.biz].join("");
return location.href=n+"#wechat_redirect",!1;
}));
}
i("biz_common/utils/string/html.js");
{
var t=i("biz_common/dom/event.js"),e=i("biz_wap/utils/mmversion.js");
({
not_in_mm:!e.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger")
});
}
return{
init:n
};
});define("biz_wap/jsapi/leaveReport.js",["biz_wap/jsapi/core.js","biz_common/utils/url/parse.js"],function(e){
"use strict";
function n(e){
var n={};
return"undefined"!=typeof uin&&(n.uin=uin),"undefined"!=typeof key&&(n.key=key),
"undefined"!=typeof pass_ticket&&(n.pass_ticket=pass_ticket),"undefined"!=typeof wxtoken&&(n.wxtoken=wxtoken),
"undefined"!=typeof window.devicetype&&(n.devicetype=window.devicetype),"undefined"!=typeof window.clientversion&&(n.clientversion=window.clientversion),
"undefined"!=typeof appmsg_token?n.appmsg_token=appmsg_token:e.indexOf("advertisement_report")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=68064_13_1&r="+Math.random()),
n.x5=a?"1":"0",n.f="json",p.join(e,n);
}
function t(e,n){
if(e instanceof Object&&n instanceof Object)for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t]);
}
function o(e){
"function"==typeof e?s.push(e):data instanceof Object&&c.push(e);
}
function i(e,n){
f[e]||(f[e]=[]),f[e].push(n);
}
var r=e("biz_wap/jsapi/core.js"),p=e("biz_common/utils/url/parse.js"),a=-1!=navigator.userAgent.indexOf("TBS/"),s=[],c=[],f=[];
return r.on("reportOnLeaveForMP",function(){
var e={};
for(var o in f){
e[o]||(e[o]={});
for(var i=0;i<f[o].length;i++){
var r=f[o][i];
"function"==typeof r?t(e[o],r()):p instanceof Object&&t(e[o],r);
}
}
for(var i=0;i<s.length;i++){
var p=s[i]();
p instanceof Object&&c.push(p);
}
for(var i=0;i<c.length;i++)c[i].reportUrl&&(c[i].reportUrl=n(c[i].reportUrl));
return e.data={
requestList:c
},e;
}),{
addReport:o,
addSpecificReport:i
};
});define("biz_wap/utils/hand_up_state.js",["biz_common/dom/event.js"],function(n){
"use strict";
function e(){
if("hidden"in document)return"hidden";
for(var n=["webkit","moz","ms","o"],e=0;e<n.length;e++)return n[e]+"Hidden"in document,
n[e]+"Hidden";
return null;
}
function i(){
var n=e();
return n?document[n]:!1;
}
function t(){
return r;
}
var d=n("biz_common/dom/event.js"),o=e(),r=0,u=0;
if(o){
var m=o.replace(/[H|h]idden/,"")+"visibilitychange";
d.on(document,m,function(){
i()?u=(new Date).getTime():r+=(new Date).getTime()-u;
},!1);
}
return{
getHandUpTime:t,
isHidden:i
};
});define("biz_wap/utils/storage.js",[],function(){
"use strict";
function t(t){
if(!t)throw"require function name.";
this.key=t,this.init();
}
var e="__WXLS__",n=window.localStorage||{
getItem:function(){},
setItem:function(){},
removeItem:function(){},
key:function(){},
length:0
};
return t.getItem=function(t){
return t=e+t,n.getItem(t);
},t.setItem=function(i,r){
i=e+i;
for(var a=3;a--;)try{
n.setItem(i,r);
break;
}catch(o){
t.clear();
}
},t.clear=function(){
var t,i;
for(t=n.length-1;t>=0;t--)i=n.key(t),0==i.indexOf(e)&&n.removeItem(i);
},t.prototype={
constructor:t,
init:function(){
this.check();
},
getData:function(){
var e=t.getItem(this.key)||"{}";
try{
e=JSON.parse(e);
}catch(n){
e={};
}
return e;
},
check:function(){
var e,n,i=this.getData(),r={},a=+new Date;
for(e in i)n=i[e],+n.exp>a&&(r[e]=n);
t.setItem(this.key,JSON.stringify(r));
},
set:function(e,n,i){
var r=this.getData();
r[e]={
val:n,
exp:i||+new Date
},t.setItem(this.key,JSON.stringify(r));
},
get:function(t){
var e=this.getData();
return e=e[t],e?e.val||null:null;
},
remove:function(e){
var n=this.getData();
n[e]&&delete n[e],t.setItem(this.key,JSON.stringify(n));
}
},t;
});define("biz_common/utils/http.js",[],function(){
"use strict";
function t(){
var t=document.getElementsByTagName("html");
if(t&&1==!!t.length){
t=t[0].innerHTML;
var e=t.replace(/[\x00-\xff]/g,""),n=t.replace(/[^\x00-\xff]/g,"");
return 1*n.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
return 0;
}
return{
htmlSize:t()
};
});define("biz_common/utils/cookie.js",[],function(){
"use strict";
var e={
get:function(e){
if(""==e)return"";
var t=new RegExp(e+"=([^;]*)"),n=document.cookie.match(t);
return n&&n[1]||"";
},
set:function(e,t,n){
var o=new Date;
return o.setDate(o.getDate()+(n||1)),n=o.toGMTString(),document.cookie=e+"="+t+";expires="+n,
!0;
}
};
return e;
});define("appmsg/topic_tpl.html.js",[],function(){
return'<span class="db topic_wrp">\n    <span class="topic_thumb" style="background-image:url({img_url});"></span>\n    <span class="topic_content">\n        <strong class="topic_title">{title}</strong>\n        <span class="topic_desc">{author}</span>\n        <span class="topic_info">\n            <span class="topic_info_extra"><span class="icon_topic"></span>话题</span>\n            <span class="topic_info_primary">相关文章{msg_num}篇</span>\n        </span>\n    </span>\n</span>\n';
});define("question_answer/appmsg_tpl.html.js",[],function(){
return'<#if(type==1){#>\n<div class="qa__card qa__show_detail_js" data-key="<#=dataKey#>">\n  <#if(dataStatus==3||dataStatus==4){#>\n    <section class="qa__card-empty">\n      <#if(dataStatus==4){#>\n      该问答内容已被删除      <#}else{#>\n      问答内容加载失败      <#}#>\n    </section>\n  <#}else if(dataStatus==2){#>\n    <div class="qa__card-hd"><span><#=biz_nickname#></span>回答了提问</div>\n    <div class="qa__card-bd">\n      <#if(question.question_info.question){#>\n      <div class="qa__card-desc">\n        <#==questionTitle#>\n      </div>\n      <#}#>\n    </div>\n    <div class="qa__card-ft">\n      <span><#=like_num#>有用</span>\n      <span><#=elected_comment_num#>评论</span>\n    </div>\n  <#}#>\n</div>\n<#}else if(type==2){#>\n<div class="qa__card qa__card_v2 qa__show_theme_js" data-key="<#=dataKey#>">\n  <div class="weui-btn weui-btn_primary qa__btn"><i class="qa__icon-qa"></i>向我提问</div>\n  <div class="qa__card-hd"><span><#=biz_nickname#></span>发布了一个主题</div>\n  <div class="qa__card-bd">\n    <div class="qa__card-theme"><#=topicName#></div>\n  </div>\n  <div class="qa__card-ft">\n    <span><#=useful_num#>有用</span>\n    <span><#=elected_comment_num#>评论</span>\n  </div>\n</div>\n<#}else if(type==3){#>\n<div class="qa__card qa__card_v3 qa__show_profile_js" data-key="<#=dataKey#>">\n  <div class="weui-btn weui-btn_primary qa__btn"><i class="qa__icon-qa"></i>向我提问</div>\n  <div class="qa__card-bd">\n    <div class="qa__card-content">\n      <div class="qa__card-avatar">\n        <img src="<#=biz_headimg#>" alt="">\n      </div>\n      <div class="qa__card-main">\n        <div class="qa__card-main-name"><#=biz_nickname#></div>\n        <div class="qa__card-main-info"><span><#=total_num#>个回答</span><br><span><#=useful_num#>次有用</span></div>\n      </div>\n    </div>\n  </div>\n</div>\n<#}#>';
});define("pages/weapp_tpl.html.js",[],function(){
return'<!-- <span class="weapp_card flex_context">\n    <span class="weapp_card_hd">\n        <span class="radius_avatar weapp_card_avatar">\n            <img src="<#=avatar#>">\n        </span>\n    </span>\n    <span class="weapp_card_bd flex_bd">\n        <strong class="weapp_card_nickname"><#=nickname#></strong>\n        <span class="weapp_card_logo"><img class="icon_weapp_logo_mini" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAb1BMVEUAAAB4it11h9x2h9x2h9x2htx8j+R8i+B1h9x2h9x3h92Snv91htt2h9x1h9x4h9x1h9x1h9x2idx1h9t2h9t1htt1h9x1h9x1htx2h9x1h912h9x4h913iN17juOOjuN1iNx2h9t4h958i+B1htvejBiPAAAAJHRSTlMALPLcxKcVEOXXUgXtspU498sx69DPu5+Yc2JeRDwbCYuIRiGBtoolAAAA3ElEQVQoz62S1xKDIBBFWYiFYImm2DWF///G7DJEROOb58U79zi4O8iOo8zuCRfV8EdFgbYE49qFQs8ksJInajOA1wWfYvLcGSueU/oUGBtPpti09uNS68KTMcrQ5jce4kmN/HKn9XVPAo702JEdx9hTUrWUqVrI3KwUmM1NhIWMKdwiGvpGMWZOAj1PZuzAxHwhVSplrajoseBnbyDHAwvrtvKKhdqTtFBkL8wO5ijcsS3G1JMNvQ5mdW7fc0x0+ZcnlJlZiflAomdEyFaM7qeK2JahEjy5ZyU7jC/q/Rz/DgqEuAAAAABJRU5ErkJggg==" alt="">小程序</span>\n    </span>\n</span> -->\n<span class="weapp_card app_context appmsg_card_context">\n    <span class="weapp_card_bd">\n        <span class="weapp_card_profile flex_context">\n            <span class="radius_avatar weapp_card_avatar">\n                <img src="<#=avatar#>">\n            </span>\n            <span class="weapp_card_nickname flex_bd"><#=nickname#></span>\n        </span>\n        <span class="weapp_card_info">\n            <span class="weapp_card_title"><#=title#></span>\n            <span class="weapp_card_thumb_wrp" style="background-image:url(<#=imageUrl#>);"></span>\n        </span>\n    </span>\n    <span class="weapp_card_ft">\n        <span class="weapp_card_logo"><img class="icon_weapp_logo_mini" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAb1BMVEUAAAB4it11h9x2h9x2h9x2htx8j+R8i+B1h9x2h9x3h92Snv91htt2h9x1h9x4h9x1h9x1h9x2idx1h9t2h9t1htt1h9x1h9x1htx2h9x1h912h9x4h913iN17juOOjuN1iNx2h9t4h958i+B1htvejBiPAAAAJHRSTlMALPLcxKcVEOXXUgXtspU498sx69DPu5+Yc2JeRDwbCYuIRiGBtoolAAAA3ElEQVQoz62S1xKDIBBFWYiFYImm2DWF///G7DJEROOb58U79zi4O8iOo8zuCRfV8EdFgbYE49qFQs8ksJInajOA1wWfYvLcGSueU/oUGBtPpti09uNS68KTMcrQ5jce4kmN/HKn9XVPAo702JEdx9hTUrWUqVrI3KwUmM1NhIWMKdwiGvpGMWZOAj1PZuzAxHwhVSplrajoseBnbyDHAwvrtvKKhdqTtFBkL8wO5ijcsS3G1JMNvQ5mdW7fc0x0+ZcnlJlZiflAomdEyFaM7qeK2JahEjy5ZyU7jC/q/Rz/DgqEuAAAAABJRU5ErkJggg==" alt="">小程序</span>\n    </span>\n</span>\n';
});define("biz_common/utils/monitor.js",[],function(){
"use strict";
var n=[],t={};
return t.setAvg=function(e,i,r){
return n.push(e+"_"+i+"_"+r),n.push(e+"_"+(i-1)+"_1"),t;
},t.setSum=function(e,i,r){
return n.push(e+"_"+i+"_"+r),t;
},t.send=function(){
if(0!=n.length){
var t=[];
for(t.push(n.splice(0,60));n.length>0;)t.push(n.splice(0,60));
n=[];
for(var e=0,i=t.length;i>e;e++){
var r=new Image;
r.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+t[e].join(";")+"&t="+Math.random();
}
}
},t;
});define("pages/voice_tpl.html.js",[],function(){
return'<span class="js_audio_frame db">\n    <#if(show_not_support===true){#>\n    <span class="db">当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放</span>\n    <#}#>\n    <span aria-labelledby="语音" id="voice_main_<#=voiceid#>_<#=posIndex#>" class="share_audio_context flex_context pages_reset" <#if(!musicSupport){#>style="display:none;"<#}#>>\n        <span id="voice_play_<#=voiceid#>_<#=posIndex#>" aria-labelledby="播放开关" class="db share_audio_switch"><em class="icon_share_audio_switch" role="button"></em></span>\n        <span id="voice_detail_<#=voiceid#>_<#=posIndex#>" class="share_audio_info flex_bd db">\n            <strong id="voice_title_<#=voiceid#>_<#=posIndex#>" class="share_audio_title" aria-describedby="语音标题" role="link"><#=title#></strong>\n            <#if(!!nickname){#>\n            <span id="voice_author_<#=voiceid#>_<#=posIndex#>" class="share_audio_tips db">来自<#=nickname#></span>\n            <#}#>\n            <span id="voice_seekRange_<#=voiceid#>_<#=posIndex#>" class="db share_audio_progress_wrp">\n                <span class="db share_audio_progress">\n                    <span id="voice_progress_<#=voiceid#>_<#=posIndex#>" style="width:0%" class="share_audio_progress_inner"></span>\n                    <span id="voice_buffer_<#=voiceid#>_<#=posIndex#>" class="share_audio_progress_buffer" style="width:0%;"></span>\n                    <span id="voice_loading_<#=voiceid#>_<#=posIndex#>" class="share_audio_progress_loading" style="display:none;">\n                        <span class="share_audio_progress_loading_inner"></span>\n                    </span>\n                </span>\n                <span id="voice_playdot_<#=voiceid#>_<#=posIndex#>" class="share_audio_progress_handle" style="display:none;left:0%;"></span>\n            </span>\n            <span class="share_audio_desc db" aria-labelledby="时长">\n                <em id="voice_playtime_<#=voiceid#>_<#=posIndex#>" class="share_audio_length_current" aria-hidden="true">00:00</em>\n                <em id="voice_duration_<#=voiceid#>_<#=posIndex#>" class="share_audio_length_total"><#=duration_str#></em>\n            </span>\n        </span>\n    </span>\n</span>\n';
});define("pages/kugoumusic_ctrl.js",["biz_common/utils/monitor.js","biz_wap/utils/ajax.js","pages/musicUrlReport.js"],function(e){
"use strict";
function r(e,r){
for(var t,a=[/^http(s)?:\/\/singerimg\.kugou\.com([\/?].*)*$/i,/^http(s)?:\/\/imge\.kugou\.com([\/?].*)*$/i],o=!1,s=0;t=a[s++];)if(t.test(e.albumurl)){
o=!0;
break;
}
return o||(e.albumurl=""),e.detailUrl="https://m3ws.kugou.com/kgsong/"+e.jumpurlkey+".html?fromweixin=",
e.webUrl=e.detailUrl,e.musicIcon=n.musicIcon,e.media_id=e.musicid,e.type=1*r.scene===0?5:1*r.scene===1?6:9,
e;
}
function t(e,r){
var t=e,a=t.otherid+(t.albumid||""),s=n.cache[a];
return s&&"function"==typeof r.callback?void r.callback(s):void(n.submiting[a]!==!0&&(n.submiting[a]=!0,
o({
jumpurlkey:t.jumpurlkey,
songId:t.songId,
akey:t.otherid,
albumid:t.albumid||"",
onSuc:function(e){
n.submiting[a]=!1,n.cache[a]=e,"function"==typeof r.callback&&r.callback(e);
},
onError:function(){
n.submiting[a]=!1,"function"==typeof r.callback&&r.callback({
canplay:!1,
msg:"系统繁忙，请稍后再试。返回码：-1",
status:-1,
play_url:"",
duration:0
});
}
})));
}
function a(e){
var r=!0,t="";
switch(1*e){
case 0:
r=!0;
break;

case 1:
r=!1,t="该歌曲版权已过期，无法播放。";
break;

case 1002:
r=!1,t="系统错误，请稍后再试。";
break;

case 1001:
r=!1,t="系统错误，请稍后再试。";
break;

default:
r=!1,t="系统错误，请稍后再试。";
}
return t&&(t+="错误码："+e),{
canplay:r,
msg:t
};
}
function o(e){
u.setSum(n.reportId,87,1),u.send();
var r=+new Date,t="/mp/getkugousong?params=#params#",o=[{
akey:e.akey,
albumid:e.albumid||""
}],m=encodeURIComponent(JSON.stringify(o));
t=t.replace("#params#",m),c({
url:t,
type:"GET",
dataType:"json",
success:function(t){
var o=+new Date-r;
if(setTimeout(function(){
i.reportRespData({
type:2,
songid:e.songId,
musicid:e.akey,
jumpurlkey:e.jumpurlkey,
responseData:JSON.stringify(t||{}),
kugouParams:m
});
},0),!t||"undefined"==typeof t.errcode){
var u=1;
return s({
type:"error",
time:o,
code:u
}),void("function"==typeof e.onError&&e.onError({
errcode:u
}));
}
var c=0,n="";
0==t.errcode?t.data&&t.data[0]&&t.data[0].url?(c=0,n=t.data[0].url):c=1001:c=1==t.errcode?1:1002,
s({
type:"success",
time:o,
code:c
});
var d=a(c);
e.onSuc({
canplay:d.canplay,
msg:d.msg,
errcode:c,
play_url:n
});
},
error:function(){
var t=+new Date-r,a=2;
s({
type:"error",
time:t,
code:a
}),"function"==typeof e.onError&&e.onError({
errcode:a
});
}
});
}
function s(e){
var r=Math.max(e.time,0);
if(r=Math.min(r,1e4),r>=0&&500>r?u.setSum(n.reportId,98,1):r>=500&&1e3>r?u.setSum(n.reportId,99,1):r>=1e3&&2e3>r?u.setSum(n.reportId,100,1):r>=2e3&&5e3>r?u.setSum(n.reportId,101,1):r>=5e3&&1e4>=r&&u.setSum(n.reportId,102,1),
"error"==e.type){
switch(1*e.code){
case 1:
u.setSum(n.reportId,94,1);
break;

case 2:
u.setSum(n.reportId,91,1);
break;

case 3:
u.setSum(n.reportId,92,1);
break;

case 4:
u.setSum(n.reportId,93,1);
}
u.setSum(n.reportId,88,1);
}else if("success"==e.type){
switch(1*e.code){
case 1:
u.setSum(n.reportId,95,1);
break;

case 0:
u.setSum(n.reportId,97,1);
break;

case 1002:
u.setSum(n.reportId,96,1);
break;

case 1001:
u.setSum(n.reportId,103,1);
}
u.setSum(n.reportId,89,1);
}
u.send();
}
var u=e("biz_common/utils/monitor.js"),c=e("biz_wap/utils/ajax.js"),i=e("pages/musicUrlReport.js"),n={
reportId:"28306",
musicIcon:window.icon_kugou_source||"",
cache:{},
submiting:{}
};
return{
initData:r,
getPlayUrl:t
};
});