define("appmsg/fereport_without_localstorage.js",["biz_wap/utils/wapsdk.js","biz_common/utils/http.js","appmsg/log.js","biz_common/base64.js"],function(e){
"use strict";
function i(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e&&e.timing){
var i,a=e.timing,m=0,w=0,p=window.location.protocol,u=Math.random(),r=1>2*u,_=1>25*u,c=1>100*u,l=1>250*u,g=1>1e3*u,f=1>1e4*u,S=!0;
"https:"==p?(m=462,w=464,S=!1):"http:"==p&&(m=417,w=463);
var B=window.__wxgspeeds||{};
if(B&&B.moonloadtime&&B.moonloadedtime){
var v=B.moonloadedtime-B.moonloadtime;
i=localStorage&&JSON.parse(localStorage.getItem("__WXLS__moonarg"))&&"fromls"==JSON.parse(localStorage.getItem("__WXLS__moonarg")).method?21:22,
o.saveSpeeds({
sample:21==i||22==i&&g?1:0,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:i,
time:v
},
user_define:t
});
}
B&&B.mod_downloadtime&&o.saveSpeeds({
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:24,
time:B.mod_downloadtime
},
user_define:t
});
var I=a.domContentLoadedEventStart-a.navigationStart;
if(I>3e3&&(o.setBasicTime({
sample:c&&S||_&&!S?1:0,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:w
}),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_28_1&lc=1&log0="+encodeURIComponent(location.href)),
0==window.optimizing_flag?o.setBasicTime({
sample:g,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:473
}):1==window.optimizing_flag?o.setBasicTime({
sample:c,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:474
}):2==window.optimizing_flag&&o.setBasicTime({
sample:c,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:475
}),o.setBasicTime({
sample:l&&S||c&&!S?1:0,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m
}),n.htmlSize){
var R=n.htmlSize/(a.responseEnd-a.connectStart);
o.saveSpeeds({
sample:g,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:25,
time:Math.round(R)
},
user_define:t
});
}
if(B&&B.combo_times)for(var h=1;h<B.combo_times.length;h++)o.saveSpeeds({
sample:l,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:26,
time:B.combo_times[h]-B.combo_times[h-1]
},
user_define:t
});
if(B&&B.mod_num){
var C=B.hit_num/B.mod_num;
o.saveSpeeds({
sample:l,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:[{
sid:27,
time:Math.round(100*C)
},{
sid:28,
time:Math.round(1e3*C)
}],
user_define:t
});
}
var U=window.logs.pagetime.jsapi_ready_time-a.navigationStart;
o.saveSpeeds(156==m||155==m?{
sample:r,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:31,
time:U
},
user_define:t
}:{
sample:g,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:31,
time:U
},
user_define:t
}),o.send(),window.setTimeout(function(){
window.__moonclientlog&&s("[moon] "+window.__moonclientlog.join(" ^^^ "));
},250),window.setTimeout(function(){
window.onBridgeReadyTime&&(i=window.WeixinJSBridge&&window.WeixinJSBridge._createdByScriptTag?33:32,
o.saveSpeeds({
sample:f,
uin:window.encodeURIComponent(d.toBase64(window.user_uin))||uin,
pid:m,
speeds:{
sid:i,
time:window.onBridgeReadyTime-a.navigationStart
},
user_define:t
}),o.send());
},5e3);
}
}
var o=e("biz_wap/utils/wapsdk.js"),n=e("biz_common/utils/http.js"),s=e("appmsg/log.js"),d=e("biz_common/base64.js"),t=d.toBase64(JSON.stringify({
scene:window.source,
sessionid:window.sessionid
}));
i();
});define("appmsg/report.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js","common/utils.js","appmsg/cdn_img_lib.js","biz_wap/utils/mmversion.js","biz_common/utils/report.js","biz_common/utils/monitor.js"],function(e){
"use strict";
function t(){
var t=(e("biz_wap/utils/mmversion.js"),e("biz_common/utils/report.js"),e("biz_common/utils/monitor.js")),r=!1,s=window.performance||window.msPerformance||window.webkitPerformance;
return function(){
return;
}(),s&&s.timing&&s.timing.navigationStart?(r=s.timing.navigationStart,function(){
return;
}(),function(){
function e(){
if(-1==i.indexOf("NetType/"))return!1;
for(var e=["2G","cmwap","cmnet","uninet","uniwap","ctwap","ctnet"],t=0,n=e.length;n>t;++t)if(-1!=i.indexOf(e[t]))return!0;
return!1;
}
var n=window.performance&&window.performance.timing,a=write_sceen_time-r,s=first_sceen__time-r,d=page_endtime-r,m=(window.onload_endtime||+new Date)-r;
-1!=navigator.userAgent.indexOf("MicroMessenger")&&(a=real_show_page_time-r,s=real_show_page_time-r);
var g=window.logs.jsapi_ready_time?window.logs.jsapi_ready_time-r:void 0,w=window.logs.a8key_ready_time?window.logs.a8key_ready_time-r:void 0,p=n&&n.connectEnd-n.connectStart,c=n&&n.secureConnectionStart&&n.connectEnd-n.secureConnectionStart,u=n&&n.domainLookupEnd&&n.domainLookupStart&&n.domainLookupEnd-n.domainLookupStart;
if(window.logs.pagetime.wtime=a,window.logs.pagetime.ftime=s,window.logs.pagetime.ptime=d,
window.logs.pagetime.onload_time=m,window.logs.pagetime.jsapi_ready_time=g,window.logs.pagetime.a8key_ready_time=w,
need_report_cost?o({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["1|1|"+d,"1|2|"+s,"1|3|"+m,"1|4|"+g,"1|5|"+w,"1|6|"+p,"1|7|"+c,"1|8|"+u].join(";")
}
}):Math.random()<.01&&o({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["#1|1|"+d,"1|2|"+s,"1|3|"+m,"1|4|"+g,"1|5|"+w,"1|6|"+p,"1|7|"+c,"1|8|"+u].join(";")
}
}),need_report_cost&&s>3e3){
var l=new Image,_=(new Date).getTime();
l.onload=function(){
var e=(new Date).getTime()-_,t=(new Date).getTime(),n=new Image;
n.onload=function(){
var n=(new Date).getTime()-t;
o({
url:"/mp/report_cost",
type:"post",
data:{
id_key_list:["^2|1|"+e,"2|2|"+n].join(";")
}
});
},n.src="http://ugc.qpic.cn/adapt/0/7d8963bb-aace-df23-0569-f8a4e388eacb/100?r="+Math.random();
},l.src="http://ugc.qpic.cn/adapt/0/7d8963bb-aace-df23-0569-f8a4e388eacb/100?r="+Math.random();
}
if(!(Math.random()>.2||0>m||0>a||0>s||0>d)){
if(g&&t.setAvg(27822,15,g),w&&t.setAvg(27822,17,w),d>=15e3)return t.setAvg(27822,29,d),
void t.send();
t.setAvg(27822,1,d).setAvg(27822,3,m).setAvg(27822,5,s),window.isWeixinCached&&t.setAvg(27822,19,d),
e()?(t.setAvg(27822,9,d),window.isWeixinCached&&t.setAvg(27822,23,d)):"wifi"==networkType?(t.setAvg(27822,7,d),
window.isWeixinCached&&t.setAvg(27822,21,d)):"2g/3g"==networkType?(t.setAvg(27822,11,d),
window.isWeixinCached&&t.setAvg(27822,25,d)):"4g"==networkType?(t.setAvg(27822,14,d),
window.isWeixinCached&&t.setAvg(27822,26,d)):(t.setAvg(27822,13,d),window.isWeixinCached&&t.setAvg(27822,28,d)),
window.moon&&moon.clearSample&&(t.setAvg(27822,71,d),e()?t.setAvg(27822,73,d):"wifi"==networkType?t.setAvg(27822,75,d):"2g/3g"==networkType?t.setAvg(27822,77,d):"4g"==networkType?t.setAvg(27822,78,d):t.setAvg(27822,79,d)),
p&&t.setAvg(27822,65,p),c&&t.setAvg(27822,67,c),u&&t.setAvg(27822,69,u),t.send();
}
}(),function(){
window.logs.jsapi_ready_fail&&(t.setSum(24729,55,window.logs.jsapi_ready_fail),t.send());
}(),function(){
var e=document.getElementById("js_toobar3"),t=document.getElementById("page-content");
if(t&&!(Math.random()>.1)){
var i=function o(){
var i=window.pageYOffset||document.documentElement.scrollTop,r=e.offsetTop;
if(i+a.getInnerHeight()>=r){
for(var d,m,g=t.getElementsByTagName("img"),w={},p=[],c=0,u=0,l=0,_=0,f=g.length;f>_;++_){
var v=g[_];
d=v.getAttribute("data-src")||v.getAttribute("src"),m=v.getAttribute("src"),d&&(d.isCDN()?u++:l++,
c++,w[m]={});
}
if(p.push("1="+1e3*c),p.push("2="+1e3*u),p.push("3="+1e3*l),s.getEntries){
var y=s.getEntries(),h=window.logs.img.download,k=[0,0,0],A=[0,0,0];
c=u=0;
for(var _=0,T=y.length;T>_;++_){
var j=y[_],b=j.name;
b&&"img"==j.initiatorType&&w[b]&&(b.isCDN()&&(A[0]+=j.duration,u++),k[0]+=j.duration,
c++,w[b]={
startTime:j.startTime,
responseEnd:j.responseEnd
});
}
k[0]>0&&c>0&&(k[2]=k[0]/c),A[0]>0&&u>0&&(A[2]=A[0]/u);
for(var _ in h)if(h.hasOwnProperty(_)){
for(var M=h[_],x=0,E=0,C=0,z=0,S=0,f=M.length;f>S;++S){
var d=M[S];
if(w[d]&&w[d].startTime&&w[d].responseEnd){
var D=w[d].startTime,I=w[d].responseEnd;
x=Math.max(x,I),E=E?Math.min(E,D):D,d.isCDN()&&(C=Math.max(x,I),z=E?Math.min(E,D):D);
}
}
k[1]+=Math.round(x-E),A[1]+=Math.round(C-z);
}
for(var W=4,N=7,_=0;3>_;_++)k[_]=Math.round(k[_]),A[_]=Math.round(A[_]),k[_]>0&&(p.push(W+_+"="+k[_]),
"wifi"==networkType?p.push(W+_+6+"="+k[_]):("2g/3g"==networkType||"4g"==networkType)&&p.push(W+_+12+"="+k[_])),
A[_]>0&&(p.push(N+_+"="+A[_]),"wifi"==networkType?p.push(N+_+6+"="+A[_]):("2g/3g"==networkType||"4g"==networkType)&&p.push(N+_+12+"="+A[_]));
}
n.off(window,"scroll",o,!1);
}
};
n.on(window,"scroll",i,!1);
}
}(),void function(){
if(!(Math.random()>.001)){
var e=document.createElement("iframe"),t=[600,800,1e3,1200,1500,2e3,3e3,5e3,1e4,18e3],n=Math.ceil(10*Math.random())-1,i=uin+mid+idx+Math.ceil(1e3*Math.random())+(new Date).getTime();
e.style.display="none",e.id="js_ajax",e.setAttribute("data-time",n),e.src="/mp/iframetest?action=page&traceid="+i+"&devicetype="+devicetype+"&timeout="+t[n];
var o=document.getElementById("js_article");
o.appendChild(e);
}
}()):!1;
}
var n=e("biz_common/dom/event.js"),i=navigator.userAgent,o=e("biz_wap/utils/ajax.js"),a=e("common/utils.js");
e("appmsg/cdn_img_lib.js"),n.on(window,"load",function(){
if(""==networkType&&window.isInWeixinApp()){
var e={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
JSAPI.invoke("getNetworkType",{},function(n){
networkType=e[n.err_msg],("network_type:edge"==n.err_msg||"network_type:wwan"==n.err_msg)&&(n.detailtype&&"4g"==n.detailtype||n.subtype&&"4g"==n.subtype)&&(networkType="4g"),
t();
});
}else t();
},!1);
});define("appmsg/report_and_source.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","appmsg/articleReport.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","appmsg/open_url_with_webview.js","biz_wap/jsapi/core.js"],function(e,i,o,n){
"use strict";
function t(){
var e=window.location.protocol+"//",i=l.indexOf("://")<0?e+l:l;
if(-1!=i.indexOf("mp.weixin.qq.com/s")||-1!=i.indexOf("mp.weixin.qq.com/mp/appmsg/show")||-1!=i.indexOf("mp.weixin.qq.com/mp/homepage")){
var o=i.split("#");
i=s.addParam(o[0],"scene",25,!0)+(o[1]?"#"+o[1]:""),i=i.replace(/#rd$/g,"#wechat_redirect");
}else i=e+"mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(l);
try{
if("mp.weixin.qq.com"!=top.window.location.host)return window.top.open(i,"_blank"),
!1;
}catch(n){}
var t=location.search.replace("wx_header","del_wx_header"),r={
url:"/mp/advertisement_report"+t+"&report_type=3&action_type=0&url="+encodeURIComponent(l)+"&ascene="+encodeURIComponent(window.ascene||-1)+"&__biz="+biz+"&r="+Math.random(),
type:"GET",
mayAbort:!0,
async:!1
},m=p.isInMiniProgram?0:1;
return r.timeout=2e3,r.complete=function(){
_(i,{
sample:m,
scene:60,
user_name:user_name,
reject:function(){
location.href=i;
}
});
},a(r),!1;
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),s=e("biz_common/utils/url/parse.js"),m=e("appmsg/articleReport.js"),a=e("biz_wap/utils/ajax.js"),p=e("biz_wap/utils/mmversion.js"),c=msg_title.htmlDecode(),l=msg_source_url.htmlDecode(),_=e("appmsg/open_url_with_webview.js"),d=e("biz_wap/jsapi/core.js");
m.init({
dom:document.getElementById("js_report_article3"),
title:c,
link:window.msg_link
});
var u=document.getElementById("js_view_source");
r.on(u,"click",function(){
return t(),!1;
});
});define("appmsg/page_pos.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/cookie.js","biz_common/utils/http.js","appmsg/cdn_img_lib.js","biz_wap/utils/storage.js","biz_wap/utils/hand_up_state.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_wap/jsapi/leaveReport.js","biz_wap/utils/wapsdk.js","common/utils.js","appmsg/log.js","biz_common/utils/url/parse.js"],function(e){
"use strict";
function t(e){
window.logs||(window.logs={}),j.js_content=e.js_content||document.getElementById("js_content");
var t=e.js_toobar3||document.getElementById("js_toobar3");
j.pageEndTop=t?t.offsetTop:0,j.imgs=j.js_content?j.js_content.getElementsByTagName("img")||[]:[],
j.media=e.media||document.getElementById("media"),j.title=e.title||(window.msg_title||"").htmlDecode(),
j.video_cnt=e.video_cnt||window.logs.video_cnt||0,j.js_cmt_area=e.js_cmt_area||document.getElementById("js_cmt_area"),
j.item_show_type=e.item_show_type||window.item_show_type||0,c=document.getElementsByTagName("html"),
c&&1==!!c.length&&p&&(c=c[0].innerHTML,I.content_length=p.htmlSize),window.logs.pageinfo=I,
function(){
if(window.localStorage&&!localStorage.getItem("clear_page_pos")){
for(var e=localStorage.length-1;e>=0;){
var t=localStorage.key(e);
t.match(/^\d+$/)?localStorage.removeItem(t):t.match(/^adinfo_/)&&localStorage.removeItem(t),
e--;
}
localStorage.setItem("clear_page_pos","true");
}
}(),window.localStorage&&(w.on(window,"load",function(){
if(B=1*T.get(N),!window.__second_open__){
var t=location.href.indexOf("scrolltodown")>-1,o=j.js_cmt_area;
if(t&&o&&o.offsetTop){
var i=o.offsetTop;
window.scrollTo(0,i-25);
}else window.scrollTo(0,B),v.saveSpeeds({
uin:uin,
pid:"https:"==S?462:417,
speeds:{
sid:36,
time:Math.ceil(B/b.getInnerHeight())
}
}),v.send();
}
if(window.__wxjs_is_wkwebview||window.__second_open__){
if(q)return;
var n=z.getData(),m=localStorage.getItem("hand_up_id");
for(var w in n)w!=m&&n[w]&&(s(n[w].val),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_59_1&r="+Math.random(),
z.remove(w));
window.setInterval(function(){
var e=a();
z.set(M,e,+new Date+864e7);
},1e3);
}
var p=x.getData("spad");
p&&p.spad&&r(p.spad.val),e.hasSpAd&&window.setInterval(function(){
d();
var e=_();
x.set("spad",e,+new Date+864e7);
},1e3),window.setTimeout(function(){
l({
url:"/mp/appmsgreport?action=page_time_5s&__biz="+biz,
type:"POST",
mayAbort:!0,
data:a(),
async:!0,
timeout:2e3
});
},5e3);
}),w.on(window,"unload",function(){
if(!window.__second_open__&&!window.__jsapi_report_has_done__){
localStorage.setItem("hand_up_id",""),window.__ajaxtest="2";
var e=a();
s(e),window.__unload_has_done__=!0;
}
}),window.logs.read_height=0,w.on(window,"scroll",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(D),D=setTimeout(function(){
B=window.pageYOffset,T.set(N,B,+new Date+72e5);
},500);
}),w.on(document,"touchmove",function(){
var e=window.pageYOffset||document.documentElement.scrollTop;
window.logs.read_height=Math.max(window.logs.read_height,e),clearTimeout(D),D=setTimeout(function(){
B=window.pageYOffset,T.set(N,B,+new Date+72e5);
},500);
})),f.addReport(function(){
if(!window.__unload_has_done__){
k=!0,z.remove(M);
var e=a(),t=[];
for(var o in e)e.hasOwnProperty(o)&&t.push(o+"="+encodeURIComponent(e[o]));
var i={
reportUrl:"https://mp.weixin.qq.com/mp/appmsgreport?action=page_time&__biz="+biz,
reportData:t.join("&"),
method:"POST"
};
return window.__jsapi_report_has_done__=!0,y("[Appmsg leaveReport length]: "+JSON.stringify(i).length),
i;
}
}),w.on(document,"visibilitychange",function(){
u.isHidden()?localStorage.setItem("hand_up_id",M):localStorage.setItem("hand_up_id","");
}),m();
}
function o(e,t){
if(e&&!(e.length<=0))for(var o,i,n,a=/http(s)?\:\/\/([^\/\?]*)(\?|\/)?/,s=0,d=e.length;d>s;++s)o=e[s],
o&&(i=o.getAttribute(t),i&&(n=i.match(a),n&&n[2]&&(O[n[2]]=!0)));
}
function i(e){
for(var t=0,o=A.length;o>t;++t)if(A[t]==e)return!0;
return!1;
}
function n(){
O={},o(document.getElementsByTagName("a"),"href"),o(document.getElementsByTagName("link"),"href"),
o(document.getElementsByTagName("iframe"),"src"),o(document.getElementsByTagName("script"),"src"),
o(document.getElementsByTagName("img"),"src");
var e=[];
for(var t in O)O.hasOwnProperty(t)&&(window.networkType&&"wifi"==window.networkType&&!E&&i(t)&&(E=!0),
e.push(t));
return O={},e.join(",");
}
function a(){
{
var e,t=window.pageYOffset||document.documentElement.scrollTop,o=j.js_content,i=b.getInnerHeight(),a=j.screen_width,s=j.scroll_height,d=Math.ceil(s/i),_=Math.ceil((o.scrollHeight||o.offsetHeight)/i),r=(window.logs.read_height||t)+i,m=j.pageEndTop,w=j.imgs,l=Math.ceil(r/i)||1,p=j.media,g=50,h=0,f=0,v=0,y=0,T=r+g>m?1:0;
o.offsetTop+o.scrollHeight;
}
l>d&&(l=d);
var z=function(t){
if(t)for(var o=0,i=t.length;i>o;++o){
var n=t[o];
if(n){
h++;
var a=n.getAttribute("src"),s=n.getAttribute("data-type");
a&&0==a.indexOf("http")&&(f++,a.isCDN()&&(v++,-1!=a.indexOf("tp=webp")&&y++),s&&(e["img_"+s+"_cnt"]=e["img_"+s+"_cnt"]||0,
e["img_"+s+"_cnt"]++));
}
}
e.download_cdn_webp_img_cnt=y||0,e.download_img_cnt=f||0,e.download_cdn_img_cnt=v||0,
e.img_cnt=h||0;
},x=window.appmsgstat||{},O=window.logs.img||{},S=window.logs.pagetime||{},A=O.load||{},k=O.read||{},D=[],B=[],N=0,H=0,M=0;
for(var q in k)q&&0==q.indexOf("http")&&k.hasOwnProperty(q)&&B.push(q);
for(var q in A)q&&0==q.indexOf("http")&&A.hasOwnProperty(q)&&D.push(q);
for(var R=0,P=D.length;P>R;++R){
var G=D[R];
G&&G.isCDN()&&(-1!=G.indexOf("/0")&&N++,-1!=G.indexOf("/640")&&H++,-1!=G.indexOf("/300")&&M++);
}
var e={
report_bizuin:biz,
title:j.title,
mid:mid,
idx:idx,
subscene:window.subscene||1e4,
sessionid:window.sessionid||0,
read_cnt:x.read_num||0,
like_cnt:x.like_num||0,
screen_width:a,
screen_height:b.getInnerHeight(),
screen_num:_,
idkey:"",
copyright_stat:"",
ori_article_type:"",
video_cnt:j.video_cnt,
read_screen_num:l||0,
is_finished_read:T,
scene:source,
content_len:I.content_length||0,
start_time:page_begintime,
end_time:(new Date).getTime(),
handup_time:u.getHandUpTime(),
total_height:m,
exit_height:r>m?m:r,
img_640_cnt:H,
img_0_cnt:N,
img_300_cnt:M,
wtime:S.onload_time||0,
ftime:S.ftime||0,
ptime:S.ptime||0,
onload_time:S.onload_time||0,
reward_heads_total:window.logs.reward_heads_total||0,
reward_heads_fail:window.logs.reward_heads_fail||0,
outer_pic:window.logs.outer_pic||0,
publish_time:window.ct,
item_show_type:j.item_show_type,
page_req_info:JSON.stringify({
startGetAppmsgExtTime:window.startGetAppmsgExtTime,
startGetAppmsgAdTime:window.startGetAppmsgAdTime,
receiveGetAppmsgExt:window.receiveGetAppmsgExt,
receiveGetAppmsgAd:window.receiveGetAppmsgAd,
jsapiReadyTime:window.jsapiReadyTime,
domCompleteTime:window.domCompleteTime
})
};
if(window.networkType&&"wifi"==window.networkType&&(e.wifi_all_imgs_cnt=D.length,
e.wifi_read_imgs_cnt=B.length),window.logs.webplog&&4==window.logs.webplog.total){
var C=window.logs.webplog;
e.webp_total=1,e.webp_lossy=C.lossy,e.webp_lossless=C.lossless,e.webp_alpha=C.alpha,
e.webp_animation=C.animation;
}
if(e.copyright_stat=window._copyright_stat||"",e.ori_article_type=window._ori_article_type||"",
window.__addIdKeyReport&&window.moon&&(moon.hit_num>0&&moon.hit_num<1e3&&window.__addIdKeyReport(27613,30,moon.hit_num),
moon.mod_num>0&&moon.mod_num<1e3&&window.__addIdKeyReport(27613,31,moon.mod_num)),
window.logs.idkeys){
var Y=window.logs.idkeys,J=[];
for(var K in Y)if(Y.hasOwnProperty(K)){
var U=Y[K];
U.val>0&&J.push(K+"_"+U.val);
}
e.idkey=J.join(";");
}
z(!!p&&p.getElementsByTagName("img")),z(w);
var L=(new Date).getDay(),V=n();
return(E||0!==user_uin&&Math.floor(user_uin/100)%7==L)&&(e.domain_list=V),E&&(e.html_content=c),
window.isSg&&(e.from="sougou"),e.source=window.friend_read_source||"",e.req_id=window.req_id||"",
e.recommend_version=window.friend_read_version||"",e.class_id=window.friend_read_class_id||"",
e.ascene=window.ascene||-1,0==e.scene&&56==e.ascene&&(e.scene=90),e.hotspotjson=JSON.stringify({
hotspotinfolist:window.hotspotInfoList||[]
}),e;
}
function s(e){
k||(k=!0,z.remove(M),e.report_time=parseInt(+new Date/1e3),l({
url:"/mp/appmsgreport?action=page_time&__biz="+biz,
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function d(){
T.set(N,B,+new Date+72e5);
}
function _(){
return window.__video_report_data;
}
function r(e){
e&&e.play_type&&(x.remove("spad"),e.report_type=1,l({
url:"/mp/ad_video_report?action=video_play_report",
type:"POST",
mayAbort:!0,
data:e,
async:!1,
timeout:2e3
}));
}
function m(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/geticon?__biz="+biz+"&r="+Math.random();
}
e("biz_common/utils/string/html.js");
var w=e("biz_common/dom/event.js"),l=e("biz_wap/utils/ajax.js"),p=(e("biz_common/utils/cookie.js"),
e("biz_common/utils/http.js"));
e("appmsg/cdn_img_lib.js");
var c,g=e("biz_wap/utils/storage.js"),u=e("biz_wap/utils/hand_up_state.js"),h=e("biz_wap/utils/mmversion.js"),f=(e("biz_wap/jsapi/core.js"),
e("biz_wap/jsapi/leaveReport.js")),v=e("biz_wap/utils/wapsdk.js"),b=e("common/utils.js"),y=e("appmsg/log.js"),j=(e("biz_common/utils/url/parse.js"),
-1!=navigator.userAgent.indexOf("TBS/"),{
js_cmt_area:null,
js_content:null,
screen_height:b.getInnerHeight(),
screen_width:document.documentElement.clientWidth||window.innerWidth,
scroll_height:document.body.scrollHeight||document.body.offsetHeight,
pageEndTop:0,
imgs:[],
media:null,
title:"",
video_cnt:0,
item_show_type:0
}),T=new g("page_pos"),z=new g("time_on_page"),x=new g("spad"),I={},O={},S=window.location.protocol,E=!1,A=["wap.zjtoolbar.10086.cn","125.88.113.247","115.239.136.61","134.224.117.240","hm.baidu.com","c.cnzz.com","w.cnzz.com","124.232.136.164","img.100msh.net","10.233.12.76","wifi.witown.com","211.137.132.89","qiao.baidu.com","baike.baidu.com"],k=!1,D=null,B=0,N=[biz,sn,mid,idx].join("_"),H=Math.random(),M=[biz,sn,mid,idx,H].join("_"),q=h.isAndroid&&h.gtVersion("7.0.4",!0)||h.isIOS&&h.gtVersion("7.0.4",!0);
return{
init:t
};
});define("appmsg/cdn_speed_report.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function t(){
function e(e){
var t=[];
for(var n in e)t.push(n+"="+encodeURIComponent(e[n]||""));
return t.join("&");
}
if(networkType){
var t=window.performance||window.msPerformance||window.webkitPerformance;
if(t&&"undefined"!=typeof t.getEntries){
var n,i,a=100,o=document.getElementsByTagName("img"),p=o.length,s=navigator.userAgent,g=!1;
/micromessenger\/(\d+\.\d+)/i.test(s),i=RegExp.$1;
for(var w=0,m=o.length;m>w;w++)if(n=parseInt(100*Math.random()),!(n>a)){
var d=o[w].getAttribute("src");
if(d&&!(d.indexOf("mp.weixin.qq.com")>=0)){
for(var f,_=t.getEntries(),u=0;u<_.length;u++)if(f=_[u],f.name==d){
var c=o[w].getAttribute("data-fail");
r({
type:"POST",
url:"/mp/appmsgpicreport?__biz="+biz+"#wechat_redirect",
data:e({
rnd:Math.random(),
uin:uin,
version:version,
client_version:i,
device:navigator.userAgent,
time_stamp:parseInt(+new Date/1e3),
url:d,
img_size:o[w].fileSize||0,
user_agent:navigator.userAgent,
net_type:networkType,
appmsg_id:window.appmsgid||"",
sample:p>100?100:p,
delay_time:parseInt(f.duration),
from:window.isSg?"sougou":"",
fail:c
})
}),g=!0;
break;
}
if(g)break;
}
}
}
}
}
var n=e("biz_common/dom/event.js"),i=e("biz_wap/jsapi/core.js"),r=e("biz_wap/utils/ajax.js"),a={
"network_type:fail":"fail",
"network_type:edge":"2g/3g",
"network_type:wwan":"2g/3g",
"network_type:wifi":"wifi"
};
i.invoke("getNetworkType",{},function(e){
networkType=a[e.err_msg],("network_type:edge"==e.err_msg||"network_type:wwan"==e.err_msg)&&(e.detailtype&&"4g"==e.detailtype||e.subtype&&"4g"==e.subtype)&&(networkType="4g"),
t();
}),n.on(window,"load",t,!1);
});define("appmsg/wxtopic.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/dom/event.js","appmsg/topic_tpl.html.js"],function(t){
"use strict";
function e(t){
t.parentNode.removeChild(t);
}
function i(t,e){
var i=c;
e.img_url||(e.img_url=topic_default_img);
for(var o in e){
var a=new RegExp("{"+o+"}","g");
i=i.replace(a,e[o]);
}
var p=document.createElement("span");
p.className="db topic_area",p.innerHTML=i,t.parentNode.insertBefore(p,t),t.parentNode.removeChild(t),
r.tap(p,function(){
var e=location.protocol+"//mp.weixin.qq.com/mp/topic?action=topic_detail_page&topic_id="+t.getAttribute("data-topic-id")+"&topic_type="+t.getAttribute("data-topic-type")+"&sn="+t.getAttribute("data-topic-sn")+"&scene=101#wechat_redirect";
n.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
t&&-1!==t.err_msg.indexOf(":ok")||(location.href=e);
});
});
}
function o(t){
var o={
topic_id:t.getAttribute("data-topic-id"),
topic_type:t.getAttribute("data-topic-type"),
sn:t.getAttribute("data-topic-sn"),
biz:biz
};
p({
url:"/mp/topic?action=get_topic_info",
type:"post",
data:o,
success:function(o){
if(console.log(o),o=JSON.parse(o),0!=o.base_resp.ret)return void e(t);
var a={
title:o.title,
author:o.author||(o.leading_actor?o.leading_actor.replace(/\$\$/g," / "):"-"),
img_url:o.img_url,
msg_num:o.msg_num
};
i(t,a);
},
error:function(){
e(t);
}
});
}
function a(){
var t=document.getElementsByTagName("wxtopic");
t[0]&&o(t[0]);
}
var p=t("biz_wap/utils/ajax.js"),n=t("biz_wap/jsapi/core.js"),r=t("biz_common/dom/event.js"),c=t("appmsg/topic_tpl.html.js");
a();
});define("question_answer/appmsg.js",["biz_common/utils/string/html.js","question_answer/appmsg_tpl.html.js","biz_wap/utils/ajax.js","question_answer/utils.js","biz_common/dom/event.js","appmsg/weapp_common.js","biz_common/tmpl.js","pages/utils.js","biz_wap/utils/mmversion.js"],function(t){
"use strict";
t("biz_common/utils/string/html.js");
var e=t("question_answer/appmsg_tpl.html.js"),a=t("biz_wap/utils/ajax.js"),n=t("question_answer/utils.js"),i=t("biz_common/dom/event.js"),o=t("appmsg/weapp_common.js"),r=t("biz_common/tmpl.js"),p=(t("pages/utils.js"),
t("biz_wap/utils/mmversion.js"),!1),s=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(s){
var d=Number(s[1]),m=Number(s[2]),u=Number(s[3]);
d>6?p=!0:6===d&&m>5?p=!0:6===d&&5===m&&u>=3&&(p=!0);
}
var c={
weapp_username:"gh_f960dd3580ec@app",
detailPath:"pages/detail/index",
profilePath:"pages/list/index",
topicPath:"pages/themes/index",
canJumpOnTap:p,
questionType:[1,2,3,3,2,1],
data:{},
batchGetQuestionParam:null,
retry:1
},l=function(t){
return document.getElementById(t);
},g=function(){
var t=l("js_content");
if(!t)return!1;
for(var e=t.getElementsByTagName("mp-question")||[],a=0,n=e.length;n>a;a++){
var i=e[a],o=window.biz,r=i.getAttribute("data-mid"),p=i.getAttribute("data-idx"),s=i.getAttribute("data-type")||c.questionType[a],d=o+"_"+a;
c.data[d]?c.data[d].invisibleElems.push(i):c.data[d]=1===s?{
invisibleElems:[i],
type:s,
mid:r,
idx:p,
dataStatus:1
}:{
invisibleElems:[i],
type:s,
dataStatus:1
};
}
return 0===e.length?!1:!0;
},_=function(){
if(c.batchGetQuestionParam)return c.batchGetQuestionParam;
var t={
num:0
};
for(var e in c.data)if(Object.prototype.hasOwnProperty.call(c.data,e)){
var a=e.split("_");
t["__biz"+t.num]=a[0],1===c.data[e].type&&(t["mid"+t.num]=c.data[e].mid,t["idx"+t.num]=c.data[e].idx),
t["type"+t.num]=c.data[e].type,2===c.data[e].type&&(t["topic_id"+t.num]=1),t.num++;
}
return c.batchGetQuestionParam=t,c.batchGetQuestionParam;
},b=function(t){
var e="."+n.classPrefix;
i.on(t.dom,"tap",e+"show_detail_js",function(t){
{
var e=t.delegatedTarget,a=e.getAttribute("data-key"),n=(e.getAttribute("data-miniprogram-appid")||"wx3f84c32dc4b1e06b",
e.getAttribute("data-miniprogram-path")||c.detailPath+"?url="+encodeURIComponent(c.data[a].question_page_url)+"&bizNickname="+encodeURIComponent(c.data[a].biz_nickname));
e.getAttribute("data-miniprogram-title")||"";
}
c.canJumpOnTap?o.jumpUrl({
options:{
userName:c.weapp_username,
scene:1058,
sceneNote:encodeURIComponent(location.href),
relativeURL:o.getRelativeURL(n),
openType:2
},
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(t){
"openWeApp:ok"===t.err_msg&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",102);
}
}):console.log("cant jumpOnTap");
}),i.on(t.dom,"tap",e+"show_profile_js",function(t){
{
var e=t.delegatedTarget,a=(e.getAttribute("data-key"),e.getAttribute("data-miniprogram-appid")||"wx3f84c32dc4b1e06b",
e.getAttribute("data-miniprogram-path")||c.profilePath+"?biz="+encodeURIComponent(window.biz));
e.getAttribute("data-miniprogram-title")||"";
}
c.canJumpOnTap?o.jumpUrl({
options:{
userName:c.weapp_username,
scene:1058,
sceneNote:encodeURIComponent(location.href),
relativeURL:o.getRelativeURL(a),
openType:2
},
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(t){
"openWeApp:ok"===t.err_msg&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",102);
}
}):console.log("cant jumpOnTap");
}),i.on(t.dom,"tap",e+"show_theme_js",function(t){
{
var e=t.delegatedTarget,a=e.getAttribute("data-key"),n=(e.getAttribute("data-miniprogram-appid")||"",
e.getAttribute("data-miniprogram-path")||c.topicPath+"?themeId="+encodeURIComponent(c.data[a].themeId)+"&biz="+encodeURIComponent(window.biz));
e.getAttribute("data-miniprogram-title")||"";
}
c.canJumpOnTap?o.jumpUrl({
options:{
userName:c.weapp_username,
scene:1058,
sceneNote:encodeURIComponent(location.href),
relativeURL:o.getRelativeURL(n),
openType:2
},
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(t){
"openWeApp:ok"===t.err_msg&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",102);
}
}):console.log("cant jumpOnTap");
});
},f=function(t){
c.data[t.key]&&c.data[t.key].invisibleElems&&1*c.data[t.key].dataStatus!==1&&!function(){
var a=t.data||{};
a.dataStatus=c.data[t.key].dataStatus;
var n=c.data[t.key].invisibleElems.map(function(t){
var n=document.createElement("div"),i=r.tmpl(e,a,!0);
return n.innerHTML=i.trim(),t.parentNode.insertBefore(n.firstChild,t.nextsibling);
});
c.data[t.key].invisibleElems=null,n.length>0&&1*c.data[t.key].dataStatus===2&&n.forEach(function(e){
b({
dom:e,
allQuestionImg:t.data.allQuestionImg,
allAnswerImg:t.data.allAnswerImg
});
});
}();
},y=function(){},h=function v(){
a({
url:"/mp/qa?action=batch_get_qa_card",
type:"POST",
dataType:"json",
data:_(),
async:!0,
success:function(t){
t&&t.base_resp&&1*t.base_resp.ret===0&&"[object Array]"===Object.prototype.toString.call(t.qa_card_list)?(t.qa_card_list.forEach(function(e,a){
var i=e.biz_encode+"_"+a;
if(c.data[i]&&c.data[i].invisibleElems){
var o=n.formatQuestionInfo(e,t.svr_time,c.data[i].type);
o.dataKey=i;
var r=c.data[i].type;
c.data[i].qa_id=o.qa_id,1===r&&(c.data[i].biz_nickname=o.biz_nickname,c.data[i].question_page_url=o.question_page_url),
2===r&&(c.data[i].themeId=o.topicId),c.data[i].dataStatus=2,f({
data:o,
key:i
});
}
}),y(4)):y(3);
},
error:function(){
c.retry?(c.retry--,v()):y(3);
}
});
},w=function(){
g()&&h();
};
w();
});define("appmsg/weapp.js",["biz_common/utils/string/html.js","pages/weapp_tpl.html.js","biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_common/tmpl.js","biz_common/dom/class.js","appmsg/weapp_common.js","common/utils.js","biz_wap/utils/mmversion.js","biz_common/base64.js","appmsg/popup_report.js"],function(e){
"use strict";
function t(e,t,n){
var o=new Image;
o.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=106&content="+n+",biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(t.toString())+"&r="+Math.random()).substr(0,1024);
}
function n(e,t,n,o,i,a,p){
w({
url:"/mp/appmsgreport?action=appmsg_weapp_report",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
weapp_appid:e||"",
weapp_pos:t||0,
weapp_title:o||0,
weapp_nickname:n||0,
type:i||0,
scene:window.source||-1,
weapp_type:a,
is_confirm:p||0,
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0,
success:function(){}
});
}
function o(e){
var t=e.innerHTML,n=/<img.*src=[\'\"]/,o=/background-image:(\s*)url\(/,i=/background:[^;"']+url\(/;
return n.test(t)||o.test(t)||i.test(t)?!0:!1;
}
function i(e){
var t=e.innerHTML,n=e.style.fontSize;
return 0===t.trim().length||0===parseFloat(n)?!0:!1;
}
function a(){
var e=m("js_content");
if(!e)return!1;
C=e.getElementsByTagName("mp-weapp")||[],x=e.getElementsByTagName("mp-miniprogram")||[],
B=[];
for(var t=e.getElementsByTagName("a"),n=0,o=t.length;o>n;n++){
var i=t[n],a=i.getAttribute("data-miniprogram-appid");
a&&B.push(i);
}
return C.length<=0&&x.length<=0&&0==B.length?!1:R&&0!=R.length?!0:!1;
}
function p(e){
return e=e||"",e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function r(e,t,o,i,a){
n(e,t,o,i,4,a),window.__addIdKeyReport&&window.__addIdKeyReport("28307",103);
}
function d(e,t,o,i,a){
n(e,t,o,i,5,a);
}
function s(){
function e(e){
e.preventDefault();
}
function a(e){
e&&(m=setTimeout(function(){
e.style.display="none",w=-1;
},100));
}
window.reportWeappid=[];
for(var s=0;s<R.length;s++)window.reportWeappid.push(R[s].appid);
var l=function(){};
h.on(document.getElementById("js_minipro_dialog_ok"),"click",function(t){
t.stopPropagation(),t.preventDefault(),document.querySelector("body").removeEventListener("touchmove",e);
var n=document.getElementById("js_minipro_dialog");
l&&l(),document.getElementById("js_minipro_dialog").style.display="none",E.report([4,1,"",img_popup?1:0,window.source,n._appid]);
}),h.on(document.getElementById("js_minipro_dialog_cancel"),"click",function(t){
t.stopPropagation(),t.preventDefault(),document.querySelector("body").removeEventListener("touchmove",e);
var o=document.getElementById("js_minipro_dialog");
o.style.display="none",n(o._appid,o._i,o._nickname,o._title,3,1,1),window.__addIdKeyReport&&window.__addIdKeyReport("28307",116),
E.report([3,1,"",img_popup?1:0,window.source,o._appid]);
}),h.on(document.getElementById("js_weapp_without_auth_dialog_ok"),"click",function(){
document.querySelector("body").removeEventListener("touchmove",e),document.getElementById("js_weapp_without_auth_dialog").style.display="none";
});
var m,w,k=!b.canJumpOnTap||b.isNonWechat,C=document.getElementById("js_pc_weapp_code"),x=document.getElementById("js_pc_weapp_code_img"),B=document.getElementById("js_pc_weapp_code_des");
k&&(h.on(C,"mouseenter",function(){
clearTimeout(m);
}),h.on(C,"mouseleave",function(){
a(C);
})),b.getAppidInfo({
onSuccess:function(T){
console.log("WeappCommon.getAppidInfo onsuccess");
var R=T.data.infoMap;
if(R){
for(s=0;s<z.length;s++)(function(s){
window.__addIdKeyReport("111535",1);
var j=z[s].appid,T=z[s].path,K=z[s].imageUrl,N=z[s].title,L=z[s].elem,S=R[j];
if(S){
var W=L.tagName.toLowerCase(),M=L.firstChild&&1==L.firstChild.nodeType&&"IMG"===L.firstChild.tagName;
if(M=M||L.firstElementChild&&"IMG"===L.firstElementChild.tagName,"a"!=W)L.innerHTML=y.tmpl(f,{
imageUrl:p(K),
title:p(N),
nickname:p(S.nickname),
avatar:p(S.logo_url)
});else{
if(M){
var q=L.firstChild;
q&&v.addClass(L,"weapp_image_link");
}else v.addClass(L,"weapp_text_link");
L.setAttribute("href","");
}
h.on(L,"tap",function(){
if(l=function(){
var e=M?1:"a"==W?2:0;
return b.jumpUrl({
sceneNote:encodeURIComponent(location.href),
appid:j,
path:T,
scene:1058,
beforeNonWechatWarn:function(){
d(j,s,S.nickname,N,e);
},
beforeJumpBackupPage:function(){
r(j,s,S.nickname,N,e);
},
onJsapiCallback:function(e){
"openWeApp:ok"===e.err_msg&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",102),
t(107,new Error(e.err_msg),"");
}
}),window.__addIdKeyReport&&window.__addIdKeyReport("28307",100),n(j,s,S.nickname,N,3,e,M?2:0),
M&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",115),!1;
},I.isInMiniProgram&&-1===A.indexOf(j)&&I.gtVersion("7.0.5",!0)){
document.getElementById("js_weapp_without_auth_dialog_name").innerText="当前小程序无法打开"+S.nickname+"小程序";
var a=document.getElementById("js_weapp_without_auth_dialog");
return a.style.display="block",document.querySelector("body").addEventListener("touchmove",e,{
passive:!1
}),!1;
}
if(M&&E.report([2,1,"",img_popup?1:0,window.source,j]),(M||v.hasClass(L,"weapp_text_link")&&(o(L)||i(L)))&&img_popup){
document.getElementById("js_minipro_dialog_head").innerText="即将打开小程序",document.getElementById("js_minipro_dialog_body").innerText=S.nickname;
var a=document.getElementById("js_minipro_dialog");
return a.style.display="block",document.querySelector("body").addEventListener("touchmove",e,{
passive:!1
}),a._appid=j,a._i=s,a._nickname=S.nickname,a._title=N,n(j,s,S.nickname,N,3,1,0),
b.canJumpOnTap&&window.__addIdKeyReport&&window.__addIdKeyReport("28307",114),!1;
}
return l();
},"a"==W),h.on(L,"click",function(e){
e.preventDefault(),e.stopPropagation();
},"a"==W),k&&(h.on(L,"mouseenter",function(){
function e(e){
function t(){
if(!m&&w===s){
C.style.display="block",m=!0;
var e=C.offsetHeight,t=C.offsetWidth;
"a"!=W||M?n>t?(_(C,"right-center"),C.style.left=n-t-l+"px",C.style.top=o+"px"):(_(C),
C.style.top=o+d-e-l+"px",C.style.left=n+r-t-l+"px"):(C.style.left=i>n+r/2-t/2?i+"px":n+r/2+t/2>i+a?i+a-t+"px":n+r/2-t/2+"px",
p>e?(_(C,"down-center"),C.style.top=o-e-l+"px"):(_(C,"up-center"),C.style.top=o+d-l+"px"));
}
}
if(e){
var n=c(L),o=u(M?L.firstElementChild:L),i=c(L.parentNode),a=L.parentNode.offsetWidth,p=L.getBoundingClientRect().top,r=M?L.firstElementChild.offsetWidth:L.offsetWidth,d=M?L.firstElementChild.offsetHeight:L.offsetHeight,l=8,m=!1;
B.innerText=g(S.nickname,48),x.onload=t,x.src=e,(x.complete||x.width)&&t();
}
}
clearTimeout(m),w!==s&&(C.style.display="none",w=s,b.getAppidCode({
appid:j,
path:T
},e));
}),h.on(L,"mouseleave",function(){
a(C);
}));
}
})(s);
var N=null,L=function(){
N=null;
for(var e=0;e<K.length;e++){
var t=K[e].elem,o=t.tagName.toLowerCase(),i=t.firstChild&&1==t.firstChild.nodeType,a=i?1:"a"==o?2:0,p=K[e].elem.getBoundingClientRect();
p.top<j.getInnerHeight()&&p.bottom>0&&(setTimeout(function(){
window.__addIdKeyReport&&window.__addIdKeyReport("28307",101);
},0),n(K[e].appid,e,R[K[e].appid].nickname,K[e].title,2,a),K.splice(e--,1));
}
};
L(),h.on(window,"scroll",function(){
N||(N=setTimeout(L,100));
});
}
},
onError:function(e){
3==e.code&&t(106,e.catchErr,"parsing weapp info error");
}
});
}
function l(){
for(var e=0;e<x.length+C.length;e++){
var t=e<x.length,n=t?x[e]:C[e-x.length],o=n.getAttribute(t?"data-miniprogram-appid":"data-weapp-appid")||"",i=n.getAttribute(t?"data-miniprogram-path":"data-weapp-path")||"",a=n.getAttribute(t?"data-miniprogram-imageUrl":"data-weapp-imageUrl")||"",p=n.getAttribute(t?"data-miniprogram-title":"data-weapp-title")||"",r=document.createElement("span");
n.setAttribute("class",""),r.setAttribute("class","weapp_display_element js_weapp_display_element"),
z.push({
appid:o,
path:i,
imageUrl:a,
title:p,
elem:r
}),K.push({
appid:o,
elem:r,
title:p
}),n.parentNode.insertBefore(r,n.nextSibling);
}
for(var e=0;e<B.length;e++){
var d=B[e];
z.push({
appid:d.getAttribute("data-miniprogram-appid"),
path:d.getAttribute("data-miniprogram-path")||"",
elem:d
});
}
}
function m(e){
return document.getElementById(e);
}
function c(e){
for(var t=0;e;)t+=e.offsetLeft,e=e.offsetParent;
return t;
}
function u(e){
for(var t=0;e;)t+=e.offsetTop,e=e.offsetParent;
return t;
}
function _(e,t){
for(var n=0;3>n;n++)v.removeClass(e,"weui-desktop-popover_pos-up-"+N[n]),v.removeClass(e,"weui-desktop-popover_pos-down-"+N[n]),
v.removeClass(e,"weui-desktop-popover_pos-left-"+L[n]),v.removeClass(e,"weui-desktop-popover_pos-right-"+L[n]);
v.removeClass(e,"weui-desktop-popover_hide-arrow"),t?v.addClass(e,"weui-desktop-popover_pos-"+t):v.addClass(e,"weui-desktop-popover_hide-arrow");
}
function g(e,t){
var n=/[^\x00-\xff]/g;
if(e.replace(n,"**").length>t)for(var o=Math.floor(t/2),i=o,a=e.length;a>i;i++)if(e.substring(0,i).replace(n,"**").length>=t)return e.substring(0,i)+"...";
return e;
}
e("biz_common/utils/string/html.js");
var f=e("pages/weapp_tpl.html.js"),w=e("biz_wap/utils/ajax.js"),h=e("biz_common/dom/event.js"),y=e("biz_common/tmpl.js"),v=e("biz_common/dom/class.js"),b=e("appmsg/weapp_common.js"),j=e("common/utils.js"),I=e("biz_wap/utils/mmversion.js"),k=e("biz_common/base64.js"),E=e("appmsg/popup_report.js"),C=null,x=null,B=null,T={},z=[],R=b.appidSnInfo,K=[],A=k.fromBase64(appid_list).split(",");
if(a()){
l(),s();
var N=["left","center","right"],L=["top","center","bottom"];
return T;
}
});define("appmsg/weproduct.js",["appmsg/weapp_common.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_common/utils/monitor.js","common/utils.js"],function(t){
"use strict";
function e(){
if(console.log("weproduct init"),"function"==typeof document.getElementsByClassName){
var t=document.getElementsByClassName("js_product_container");
t&&t.length>0&&(a(t),d.getAppidInfo({
onSuccess:function(e){
g.data=e.data,o(t);
}
})),r();
}
}
function a(t){
try{
for(var e=0,a=t.length;a>e;e++){
var o=t[e];
if(o.className.indexOf("js_list_container")>=0){
var i=o.querySelector("img.js_cover");
if(i){
var r=i.parentNode.getBoundingClientRect();
i.style.setProperty("width",r.width+"px","important"),i.style.setProperty("height",r.height+"px","important"),
i.style.setProperty("background-size","unset","important"),"0"==i.getAttribute("data-fail")?n.call(i):i.getAttribute("data-fail")||(i.lazyLoadOnload=i.lazyLoadOnload||[],
i.lazyLoadOnload.push(n));
}
}
}
}catch(p){}
}
function n(){
var t=this.parentNode;
if(t){
var e=document.createElement("span");
e.className=this.className,e.style.background='url("'+this.src+'") no-repeat center',
t.insertBefore(e,this),t.removeChild(this);
}
}
function o(t){
for(var e=0,a=t.length;a>e;e++)!function(t,e){
c.on(t,"tap",".js_product_loop_content",function(t){
var a=t.delegatedTarget,n=a.getAttribute("data-wxaappid"),o=a.getAttribute("data-wxapath"),i=a.getAttribute("data-pid"),r=a.getAttribute("data-appid");
return d.jumpUrl({
privateExtraData:{
cookies:"cps_package=123456; expires=1538286412; busid=mmbiz_ad_cps; domain=*"
},
sourceAppId:r,
appid:n,
path:o,
scene:1091,
sceneNote:encodeURIComponent(location.href)+":"+encodeURIComponent(i),
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(t){
if("openWeApp:ok"===t.err_msg&&i){
var o=a.getAttribute("data-pidtype"),r=2;
2==o&&(r=4),p([{
wxa_appid:n,
pid:i,
type:r,
absolute_order:e+1,
appid:a.getAttribute("data-appid")||"",
templateid:a.getAttribute("data-templateid")||"",
relative_order:1*a.getAttribute("data-order"),
packid:a.getAttribute("data-packid")||""
}]);
}
}
}),!1;
});
}(t[e],e);
var n=document.getElementsByClassName("js_product_loop_content");
if(n&&n.length>0&&m.getInnerHeight()){
for(var e=0;e<n.length;e++)g.pvele.push(n[e]);
i(),c.on(window,"scroll",i);
}
}
function i(){
g.checkInScreenId&&clearTimeout(g.checkInScreenId),g.checkInScreenId=setTimeout(function(){
g.checkInScreenId=null;
for(var t=[],e=0;e<g.pvele.length;e++){
var a=g.pvele[e],n=a.getBoundingClientRect(),o=n.height||n.bottom-n.top;
if(o>0&&n.top<m.getInnerHeight()&&n.bottom>0){
var r=a.getAttribute("data-pid");
if(r){
var d=a.getAttribute("data-pidtype"),s=1;
2==d&&(s=3),t.push({
wxa_appid:a.getAttribute("data-wxaappid"),
pid:r,
type:s,
absolute_order:e+1,
appid:a.getAttribute("data-appid")||"",
templateid:a.getAttribute("data-templateid")||"",
relative_order:1*a.getAttribute("data-order"),
packid:a.getAttribute("data-packid")||""
});
}
g.pvele.splice(e--,1);
}
}
p(t),0==g.pvele.length&&(c.off(window,"scroll",i),i=null);
},100);
}
function r(){
setTimeout(function(){
var t=document.getElementsByClassName("js_product_loop_content").length,e=document.getElementsByClassName("js_product_err_container").length;
u.setSum("64469","15",t+e),u.setSum("64469","16",t),u.setSum("64469","18",e),u.send();
},0);
}
function p(t){
if(t&&0!=t.length){
for(var e={
batch_no:l.getQuery("batch_no")||"",
bizuin:window.biz||"",
biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
total:t.length
},a=0;a<t.length;a++){
var n=t[a],o=a+1;
for(var i in n)n.hasOwnProperty(i)&&(e[i+""+o]=n[i]);
}
s({
url:"/mp/productreport?",
type:"POST",
data:e,
dataType:"json",
async:!0
});
}
}
var d=t("appmsg/weapp_common.js"),c=t("biz_common/dom/event.js"),s=t("biz_wap/utils/ajax.js"),l=t("biz_common/utils/url/parse.js"),u=t("biz_common/utils/monitor.js"),m=t("common/utils.js"),g={
pvele:[],
checkInScreenId:null,
reportRandom:Math.random()
};
e();
});define("appmsg/voicemsg.js",["biz_wap/jsapi/core.js","biz_common/dom/event.js","biz_common/dom/class.js"],function(e){
"use strict";
function o(e){
return document.getElementById(e);
}
function i(){
"1"==window.show_msg_voice&&(s.invoke("getBackgroundAudioState",{},function(e){
console.log("voicemsg getBackgroundAudioState res",e);
var i="waiting"==e.playState||"seeked"==e.playState||"seeking"==e.playState||"play"==e.playState;
e.paused=1*e.paused,e&&!e.paused&&i&&e.src&&e.src.indexOf("/mp/msgvoice?action=get_voice")>=0?a||(o("js_msgvoice_reading").style.display="",
o("js_msgvoice_reading_title").innerHTML=e.title,console.log("hello msgvoice reading"),
n.on(o("js_msgvoice_reading"),"click",function(){
location.href=e.musicbar_url||"https://mp.weixin.qq.com/mp/msgvoice?action=ttspage&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"#wechat_redirect";
}),c.addClass(o("page-content"),"voice"),console.log("add class voice in page-content"),
a=!0):(a=!1,o("js_msgvoice_reading").style.display="none",c.removeClass(o("page-content"),"voice"),
console.log("removeClass done"));
}),console.log("begin to getBackgroundAudioState in show_msg_voice"),setTimeout(function(){
i(),4>=d&&(d++,t+=1e3);
},t)),console.log("show_msg_voice is",window.show_msg_voice);
}
var s=e("biz_wap/jsapi/core.js"),n=e("biz_common/dom/event.js"),c=e("biz_common/dom/class.js"),t=1e3,a=!1,d=0;
i();
});define("appmsg/autoread.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","pages/voice_tpl.html.js","pages/voice_component.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function i(){
var e=d("autoread");
e&&(e.innerHTML='<p><label>朗读类型：</label>                                <select id="autoreadSelect">                                <option selected="true" value="0">女1</option>                                <option value="1">女2</option>                                <option value="2">男1</option>                                <option value="6">男2</option>                                </select></p><p id="autoread_voice"></p>',
r.on(d("autoreadSelect"),"change",function(){
p.player&&(p.player.destory(),p.player=null),p.checkAudioId&&(clearTimeout(p.checkAudioId),
p.checkAudioId=null);
var e=d("autoreadSelect");
d("autoread_voice").innerHTML="",o(e.value);
}),o(0));
}
function o(e){
var i=d("autoread_voice");
p._oMusic={
voiceid:p.voiceid,
duration_str:"",
posIndex:p.posIndex,
title:"文章朗读体验（"+p.voiceType[e||0]+"）",
nickname:window.nickname||"公众号"
},s.renderPlayer(u,p._oMusic,i,!0),d("voice_author_"+p.key).innerHTML="来自"+p._oMusic.nickname+"（创建音频中）",
c(e);
}
function n(e,i){
var o=p._oMusic;
d("voice_author_"+p.key).innerHTML="来自"+o.nickname,d("voice_duration_"+p.key).innerHTML=s.formatTime(1*i),
p.player=s.init({
protocal:"hls",
wxIndex:o.posIndex,
type:2,
songId:e,
src:a("https://mp.weixin.qq.com/mp/msgvoice?action=get_voice&media="+e),
allowPause:!0,
autoPlay:!0,
duration:i,
title:o.title,
singer:o.nickname?o.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:d("voice_main_"+p.key),
playArea:d("voice_play_"+p.key),
progress:d("voice_progress_"+p.key),
fileSize:o.fileSize,
playtimeDom:d("voice_playtime_"+p.key),
bufferDom:d("voice_buffer_"+p.key),
playdotDom:d("voice_playdot_"+p.key),
seekRange:d("voice_seekRange_"+p.key),
seekContainer:d("voice_main_"+p.key),
loadingDom:d("voice_loading_"+p.key)
});
}
function t(e){
p.curNum+=1;
var i=1e3;
p.curNum>p.maxNum&&(i=2e3);
var o=["/mp/msgvoice?action=get_media&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:o,
type:"GET",
dataType:"json",
async:!0,
success:function(o){
o.mediaid&&o.duration?n(o.mediaid,o.duration):p.checkAudioId=setTimeout(function(){
t(e);
},i);
},
error:function(){
p.checkAudioId=setTimeout(function(){
t(e);
},i);
}
});
}
function a(e){
return e+=["&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&uin=",window.uin||"","&key=",window.key||"","&pass_ticket=",window.pass_ticket||"","&clientversion=",window.clientversion||"","&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join("");
}
function c(e){
p.curNum=0;
var i=["/mp/msgvoice?action=tts&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:i,
type:"GET",
dataType:"json",
async:!0,
success:function(i){
i&&i.base_resp&&0==i.base_resp.ret?t(e):d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
},
error:function(){
d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
}
});
}
function d(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var r=e("biz_common/dom/event.js"),u=e("pages/voice_tpl.html.js"),s=e("pages/voice_component.js"),m=e("biz_wap/utils/ajax.js"),p={
checkId:"",
voiceid:"autoread",
posIndex:0,
key:"autoread_0",
voiceType:{
0:"女1",
1:"女2",
2:"男1",
6:"男2"
},
maxNum:5,
curNum:0
};
i();
});define("appmsg/voice.js",["biz_common/utils/string/html.js","pages/voice_tpl.html.js","appmsg/log.js","pages/voice_component.js"],function(e){
"use strict";
function i(){
var e=a("js_content");
return e?(p._oElements=e.getElementsByTagName("mpvoice")||[],p._oElements.length<=0?!1:!0):!1;
}
function o(){
p.musicLen=p._oElements.length;
}
function n(){
for(var e=0,i=0;i<p.musicLen;i++){
var o=p._oElements[i],n={},c=o.getAttribute("voice_encode_fileid")||"";
try{
c=decodeURIComponent(c);
}catch(a){}
n.voiceid=r.encodeStr(c),n.voiceid=n.voiceid.replace(/&#61;/g,"=").replace(/^\s/,"").replace(/\s$/,""),
n.isaac=1*o.getAttribute("isaac2")||0,n.src=p.srcRoot.replace("#meidaid#",n.voiceid),
1===n.isaac&&(n.jsapi2Src=n.src+"&voice_type=1"),n.voiceid&&"undefined"!=n.voiceid&&(t(o,n,e),
e++);
}
}
function t(e,i,o){
i.duration=parseInt((1*e.getAttribute("play_length")||0)/1e3,10),i.duration_str=r.formatTime(i.duration),
i.posIndex=o;
var n=e.getAttribute("name")||"";
try{
n=decodeURIComponent(n);
}catch(t){}
i.title=r.encodeStr(n).replace(/^\s/,"").replace(/\s$/,""),i.fileSize=1*e.getAttribute("high_size")||0,
i.nickname=window.nickname,r.renderPlayer(d,i,e),c(i),p.musicList[i.voiceid+"_"+i.posIndex]=i;
}
function c(e){
var i=e.voiceid+"_"+e.posIndex,o="";
if(window.voice_in_appmsg&&window.voice_in_appmsg[e.voiceid]){
var n=window.voice_in_appmsg[e.voiceid],t=window.biz||"",c=window.mid||"",d=window.idx||"";
n.bizuin&&n.appmsgid&&n.idx&&(t=n.bizuin,c=n.appmsgid,d=n.idx);
var p=window.location.protocol||"https:";
o=p+"//mp.weixin.qq.com/mp/audio?_wxindex_=#_wxindex_#&scene=104&__biz=#biz#&mid=#mid#&idx=#idx#&voice_id=#voice_id#&sn=#sn##wechat_redirect".replace("#_wxindex_#",e.posIndex).replace("#biz#",t).replace("#mid#",c).replace("#idx#",d).replace("#voice_id#",e.voiceid).replace("#sn#",n.sn||"");
}
s("[Voice] init"+o);
var m=r.decodeStr(e.title);
e.player=r.init({
wxIndex:e.posIndex,
type:2,
songId:e.voiceid,
comment_id:"",
src:e.src,
jsapi2Src:e.jsapi2Src,
allowPause:!0,
duration:e.duration,
title:m,
singer:window.nickname?window.nickname+"的语音":"公众号语音",
epname:"来自文章",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:a("voice_main_"+i),
playArea:a("voice_play_"+i),
progress:a("voice_progress_"+i),
fileSize:e.fileSize,
playtimeDom:a("voice_playtime_"+i),
bufferDom:a("voice_buffer_"+i),
playdotDom:a("voice_playdot_"+i),
seekRange:a("voice_seekRange_"+i),
seekContainer:a("voice_main_"+i),
loadingDom:a("voice_loading_"+i),
detailArea:o?a("voice_detail_"+i):"",
detailUrl:o,
webUrl:o
});
}
function a(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var d=e("pages/voice_tpl.html.js"),s=e("appmsg/log.js"),r=e("pages/voice_component.js"),p={
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#"
};
return i()?(o(),n(),p.musicList):void 0;
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","appmsg/log.js","pages/qqmusic_tpl.html.js","pages/voice_component.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e){
"use strict";
function t(){
var e=u("js_content");
return e?(p._oElements=e.getElementsByTagName("qqmusic")||[],p._oElements.length<=0?!1:!0):!1;
}
function i(){
p.musicLen=p._oElements.length;
}
function s(){
for(var e=0,t=0;t<p.musicLen;t++){
var i=p._oElements[t],s={};
s.musicid=l.encodeStr(i.getAttribute("musicid")||"").replace(/^\s/,"").replace(/\s$/,""),
s.musicid&&"undefined"!=s.musicid&&(r(i,s,e),e++);
}
}
function r(e,t,i){
if(t.media_id=l.encodeStr(e.getAttribute("mid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.musictype=parseInt(e.getAttribute("musictype"))||1,t.musictype>2&&(t.musictype=2),
t.albumid=l.encodeStr(e.getAttribute("albumid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.otherid=l.encodeStr(e.getAttribute("otherid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.jumpurlkey=l.encodeStr(e.getAttribute("jumpurlkey")||"").replace(/^\s/,"").replace(/\s$/,""),
t.duration=parseInt(e.getAttribute("play_length")||0,10),t.posIndex=i,t.albumurl=l.encodeStr(e.getAttribute("albumurl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.audiourl=l.encodeStr(e.getAttribute("audiourl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.singer=l.encodeStr(e.getAttribute("singer")||"").replace(/^\s/,"").replace(/\s$/,""),
!t.singer||"undefined"==t.singer){
var s=e.getAttribute("src")||"",r=decodeURIComponent(a.getQuery("singer",s)||"");
t.singer=l.encodeStr(r).replace(/^\s/,"").replace(/\s$/,""),t.singer&&"undefined"!=t.singer||(t.singer="");
}
t.music_name=l.encodeStr(e.getAttribute("music_name")||"").replace(/^\s/,"").replace(/\s$/,""),
p.adapter[t.musictype]&&"function"==typeof p.adapter[t.musictype].initData&&(t=p.adapter[t.musictype].initData(t,{
scene:0
})),l.renderPlayer(m,t,e),n(t),p.musicList[t.musicid+"_"+t.posIndex]=t;
}
function n(e){
var t=e.musicid+"_"+e.posIndex;
c("[Music] init "+e.detailUrl);
var i=l.decodeStr(e.music_name);
e.player=l.init({
allowPause:e.allowPause===!0?!0:!1,
wxIndex:e.posIndex,
type:e.type||0,
comment_id:"",
mid:e.media_id,
otherid:e.otherid,
albumid:e.albumid,
songId:e.musicid,
jumpurlkey:e.jumpurlkey,
duration:e.duration,
title:i,
singer:window.nickname?window.nickname+"推荐的歌":"公众号推荐的歌",
epname:"音乐",
coverImgUrl:e.albumurl,
playingCss:"qqmusic_playing",
pauseCss:e.pauseCss||"",
playCssDom:u("qqmusic_main_"+t),
playArea:u("qqmusic_play_"+t),
detailUrl:e.detailUrl||"",
webUrl:e.webUrl||"",
detailArea:u("qqmusic_home_"+t)
});
}
function u(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var a=e("biz_common/utils/url/parse.js"),c=e("appmsg/log.js"),m=e("pages/qqmusic_tpl.html.js"),l=e("pages/voice_component.js"),p={
adapter:{
1:e("pages/qqmusic_ctrl.js"),
2:e("pages/kugoumusic_ctrl.js")
},
musicList:{},
musicLen:0
};
return t()?(i(),s(),p.musicList):void 0;
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","pages/video_communicate_adaptor.js","biz_wap/utils/mmversion.js","biz_wap/utils/ajax.js","common/utils.js","biz_common/utils/url/parse.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=0;
try{
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var i=e.parentElement;
if(i&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var o=e.contentWindow.document.getElementsByTagName("html");
o&&o.length&&(o[0].style.overflow="hidden");
}
}catch(n){}
}
function i(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=a.video_top.length,n=e+r.getInnerHeight(),d=0,s=0;t>s;s++){
var m=a.video_top[s];
m.reported?d++:n>=m.start&&n<=m.end&&(m.reported=!0,setTimeout(function(e,t,i){
return function(){
var n=o.getVideoInfo(),d="",r="",s=3;
n[e]&&(n[e].hit_bizuin&&(d=n[e].hit_bizuin),n[e].hit_vid&&(r=n[e].hit_vid),n[e].ori_status&&(s=n[e].ori_status)),
c.report({
step:1,
hit_vid:r,
hit_bizuin:d,
ori_status:s,
vid:e,
screen_num:Math.ceil(t/i),
screen_height:i
});
};
}(m.vid,n,r.getInnerHeight()),1e4));
}
d==t&&(l.off(window,"scroll",i),a.video_top=a.video_iframe=i=null);
}
e("biz_common/utils/string/html.js");
{
var o=e("pages/video_communicate_adaptor.js"),n=e("biz_wap/utils/mmversion.js"),d=e("biz_wap/utils/ajax.js"),r=e("common/utils.js"),s=e("biz_common/utils/url/parse.js"),c=e("new_video/ctl.js"),a={
txVideoReg:/^http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
mpVideoReg:/^http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/,
video_iframe:[],
video_top:[]
},m=e("pages/version4video.js"),p=e("biz_common/dom/attr.js"),l=(p.setProperty,e("biz_common/dom/event.js")),u=document.getElementsByTagName("iframe"),_=[];
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var w=Math.ceil(1e4*Math.random()),f=0,v=u.length;v>f;++f)!function(e){
var i=e.getAttribute("data-src")||"",o=e.className||"",r=e.getAttribute("src")||i;
if(!i||"#"==i){
var c=e.getAttribute("data-display-src");
if(c&&(0==c.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==c.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
c=c.replace(/&amp;/g,"&");
for(var p=c.split("&"),l=["/mp/newappmsgvote?action=show"],u=0;u<p.length;u++)(0==p[u].indexOf("__biz=")||0==p[u].indexOf("supervoteid="))&&l.push(p[u]);
l.length>1&&(i=l.join("&")+"#wechat_redirect");
}
}
if(r&&(a.txVideoReg.test(r)||a.mpVideoReg.test(r))){
if(m.isShowMpVideo()||a.mpVideoReg.test(r)){
var f=s.getQuery("vid",i);
if(!f)return;
var v=e.getAttribute("data-vw"),g=e.getAttribute("data-vh"),h=document.domain;
"qq.com"==h&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=139&level=4&from="+window.encodeURIComponent(window.location.host)+"&msg="+window.encodeURIComponent(window.location.href),
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=27302_100_1&lc=1&log0=[beforeD]"+window.encodeURIComponent(window.location.href)),
window.reportVid.push(f),a.video_iframe.push({
dom:e,
vid:f
}),r=["/mp/videoplayer?video_h=",g,"&video_w=",v,"&scene=",window.source,"&random_num=",w,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",f,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||"","&sessionid=",window.sessionid||"","&preview=",window.is_temp_url?1:0].join(""),
uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
setTimeout(function(e,t){
if(t.setAttribute("marginWidth",0),t.setAttribute("marginHeight",0),t.style.top="0",
window.__second_open__)if(n.isIOS){
var i,o,r;
!function(){
var n=function(e,t,i,o){
i&&o&&(e.contentWindow.is_login=t.is_login,e.contentWindow.user_uin=t.user_uin,e.contentWindow.cgiData.ckey=t.ckey,
e.contentWindow.cgiData.ckey_ad=t.ckey_ad,e.contentWindow.seajs.use("pages/video_appmsg.js"));
};
window.__videohook__=1,i=!1,o=!1,r={},t.onload=function(){
console.log("4",Date.now()),i=!0,n(t,r,i,o);
},t.setAttribute("src",e),d({
url:e,
type:"GET",
f:"json",
success:function(d){
o=!0;
try{
r=JSON.parse(d),n(t,r,i,o);
}catch(s){
n(t,r,i,o);
}
window.resp=d,t.setAttribute("data-realsrc",e),t.contentWindow.__iframe_src__=e;
}
});
}();
}else d({
url:e,
type:"GET",
f:"html",
success:function(i){
t.setAttribute("data-realsrc",e),t.contentDocument.open("text/html","replace"),t.contentDocument.write(i),
t.contentDocument.close(),t.contentWindow.__iframe_src__=e,t.contentWindow.history.replaceState(null,null,e);
}
});else t.setAttribute("src",e);
},0,r,e);
}
}else if(i&&(i.indexOf("newappmsgvote")>-1&&o.indexOf("js_editor_vote_card")>=0||0==i.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&o.indexOf("card_iframe")>=0||i.indexOf("appmsgvote")>-1||i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&i.indexOf(window.biz)<0)return void _.push(e);
if(window.__second_open__||(i=i.replace(/^http:/,location.protocol)),o.indexOf("card_iframe")>=0){
var x=i.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(x+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
window.__second_open__?d({
url:x,
type:"GET",
f:"html",
success:function(o){
e.setAttribute("src",x),e.contentWindow.document.open("text/html","replace"),e.contentWindow.document.write(o),
e.contentWindow.document.close(),e.contentWindow.history.replaceState(null,null,x),
-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
});
}
}):(e.setAttribute("src",x),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
}));
}else{
var y=i.indexOf("#wechat_redirect")>-1,b=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?b+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):o.indexOf("vote_iframe")>=0&&(b+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""));
var x=y?i.replace("#wechat_redirect",b):i+b;
window.__second_open__?d({
url:x,
type:"GET",
f:"html",
success:function(o){
e.contentWindow.Ajax=d,e.setAttribute("src",x),e.contentWindow.document.open("text/html","replace"),
e.contentWindow.document.write(o),e.contentWindow.document.close(),e.contentWindow.history.replaceState(null,null,x),
-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
});
}
}):(e.setAttribute("src",x),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
}));
}
e.appmsg_idx=u;
}
if(i&&i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&v>0){
var j=v,k=3*j/4;
e.width=j,e.height=k,e.style.setProperty&&(e.style.setProperty("width",j+"px","important"),
e.style.setProperty("height",k+"px","important"));
}
}(u[f]);
for(var g=0;g<_.length;g++){
var h=_[g];
h.parentNode.removeChild(h);
}
if(window.iframe_reload=function(){
for(var e=0,i=u.length;i>e;++e){
var o=u[e],n=o.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&t(o);
}
},"getElementsByClassName"in document)for(var x,y=document.getElementsByClassName("video_iframe"),f=0;x=y.item(f++);)x.setAttribute("scrolling","no"),
x.style.overflow="hidden";
a.video_iframe.length>0&&setTimeout(function(){
for(var e=a.video_iframe,t=document.getElementById("js_article"),o=0,n=e.length;n>o;o++){
var d=e[o];
if(!d||!d.dom)return;
for(var s=d.dom,c=s.offsetHeight,m=0;s&&t!==s;)m+=s.offsetTop,s=s.offsetParent;
a.video_top.push({
start:m+c/2,
end:m+c/2+r.getInnerHeight(),
reported:!1,
vid:d.vid
});
}
i(),l.on(window,"scroll",i);
});
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("question_answer/utils.js",["biz_common/utils/string/html.js","pages/utils.js","biz_wap/jsapi/core.js","appmsg/log.js","biz_wap/utils/mmversion.js","biz_common/dom/event.js"],function(e){
"use strict";
e("biz_common/utils/string/html.js");
var t=e("pages/utils.js"),i=e("biz_wap/jsapi/core.js"),o=e("appmsg/log.js"),r=e("biz_wap/utils/mmversion.js"),n=e("biz_common/dom/event.js"),a={
classPrefix:"qa__",
previewFlag:!1
},s=function(e,t){
var i=new Date(1e3*e),o=e-t,r=i.getFullYear(),n=1*t,a=new Date(1e3*n);
i.setHours(0),i.setMinutes(0),i.setSeconds(0);
var s=i.getTime()/1e3;
return n>=s?3600>o?Math.ceil(o/60)+"分钟前":"今天":n>=s-86400?"昨天":n>=s-172800?"前天":a.getFullYear()===r?a.getMonth()+1+"月"+a.getDate()+"日":a.getFullYear()+"年"+(a.getMonth()+1)+"月"+a.getDate()+"日";
},l=function(e,i,o){
if(i=i||Math.ceil((new Date).getTime()/1e3),1*o===1&&e.question){
var r=e.question;
e.biz_nickname=r.biz_nickname||"匿名",e.elected_comment_num=r.elected_comment_num||0,
e.like_num=r.like_num||0;
var n=r.question_info;
e.question_page_url=c(r.question_page_url.html(!1)),e.questioner_useruin=n.questioner_useruin,
e.qa_id=n.qa_id,n.question&&(n.question.ask_time_str=s(i,n.question.ask_timestamp),
e.questionTitle=n.question.title.html(!0).replace(/\r/g,"").replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"),
e.questionTitle=t.emojiFormat(n.question.title));
}else if(1*o===2&&e.topic){
var a=e.topic;
e.useful_num=a.useful_num||0,e.elected_comment_num=a.elected_comment_num||0,e.topicName=a.topic&&a.topic.wording||"暂无主题",
e.topicId=a.topic&&a.topic.id||1,e.biz_nickname=a.biz_nickname||"",e.biz_headimg=a.biz_headimg||"https://mmbiz.qpic.cn/mmbiz_png/cVgP5bCElFjtIK2EeF0OjuGhbZVFRYyGRfbFeZ9GibWsibibIWP7XRSKews1ibWFZD5biaSXb7HfMF6dMricUib4naAFw/0";
}else if(1*o===3&&e.list){
var l=e.list;
e.useful_num=l.useful_num||0,e.total_num=l.total_num||0,e.biz_nickname=l.biz_nickname||"",
e.biz_headimg=l.biz_headimg||"https://mmbiz.qpic.cn/mmbiz_png/cVgP5bCElFjtIK2EeF0OjuGhbZVFRYyGRfbFeZ9GibWsibibIWP7XRSKews1ibWFZD5biaSXb7HfMF6dMricUib4naAFw/0";
}
return e;
},u=function(e){
if(!a.previewFlag){
a.previewFlag=!0,"undefined"==typeof window.getComputedStyle&&(window.getComputedStyle=document.body.currentStyle?function(e){
return e.currentStyle;
}:{});
var t={
current:e.curUrl,
urls:e.imgsSrc,
currentInfo:{
url:e.curUrl,
data:""
}
},n=e.dataUrlDom,s="";
if(n){
var l=window.getComputedStyle(n),u=document.createElement("canvas");
u.style.width=l.width,u.style.height=l.height,u.width=parseFloat(l.width),u.height=parseFloat(l.height);
var m=u.getContext("2d");
if(!r.isAndroid)try{
m.drawImage(n,0,0,parseFloat(l.width),parseFloat(l.height)),s=u.toDataURL();
}catch(c){
s="";
}
s&&(t.currentInfo.data=s);
}
var p=null;
if(e.posDom){
var d=window.getComputedStyle(e.posDom),g=e.posDom.getBoundingClientRect();
p={
x:g.left-parseFloat(d.paddingLeft)-parseFloat(d.borderLeftWidth),
y:g.top-parseFloat(d.paddingTop)-parseFloat(d.borderTopWidth),
width:g.width-parseFloat(d.paddingLeft)-parseFloat(d.paddingRight)-parseFloat(d.borderLeftWidth)-parseFloat(d.borderRightWidth),
height:g.height-parseFloat(d.paddingTop)-parseFloat(d.paddingBottom)-parseFloat(d.borderTopWidth)-parseFloat(d.borderBottomWidth)
},t.currentInfo.pos=p;
}
i.invoke("imagePreview",t,function(t){
console.log("imagePreview response",t),window.__addIdKeyReport&&e.reportId&&e.reportKey&&window.__addIdKeyReport(e.reportId,e.reportKey);
}),setTimeout(function(){
a.previewFlag=!1;
},500),o("[questionAnswer] click image, src: "+e.curUrl);
}
},m=function(e){
var t="."+a.classPrefix+"preview_js";
e.container.querySelectorAll(t).forEach(function(t){
!function(i){
n.on(i,"click",function(){
var o=null;
o="img"===i.nodeName.toLocaleLowerCase()&&i.className.indexOf("qa__preview_base64_js")>=0?i:i.querySelector("img.qa__preview_base64_js"),
u({
curUrl:i.getAttribute("data-src"),
dataUrlDom:o,
imgsSrc:e.imgsSrc,
posDom:t,
reportId:e.jsapiReportId,
reportKey:e.jsapiReportKey
});
});
}(t);
});
},c=function(e){
return e.replace("#rd","#wechat_redirect").replace(/^http:\/\//,"https://");
};
return{
formatQuestionInfo:l,
formatCreateTime:s,
classPrefix:a.classPrefix,
bindReviewImageEvent:m,
formatPageUrl:c,
reviewImage:u
};
});define("appmsg/product.js",["biz_common/dom/event.js","common/utils.js"],function(e){
"use strict";
function t(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=0;t<i.length;++t){
var o=i[t];
if(!o.isReport){
var n=o.offsetTop;
n>=e&&e+r.getInnerHeight()>=n&&(o.isReport=!0,(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=1&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+o.product_id+"&order="+o.order+"&r="+Math.random());
}
}
}
var o=e("biz_common/dom/event.js"),r=e("common/utils.js");
if(document.getElementsByClassName){
for(var n=document.getElementsByClassName("js_product_section"),d=document.getElementsByClassName("js_product_a"),i=[],s=0;s<n.length;++s){
var a=n[s];
a.dataset&&a.dataset.product_id&&a.dataset.order&&i.push({
dom:a,
offsetTop:a.offsetTop,
product_id:a.dataset.product_id||"",
order:a.dataset.order||"",
isReport:!1
});
}
i.length>0&&(o.on(window,"scroll",t),t());
for(var s=0;s<d.length;++s)!function(e){
o.on(e,"click",function(){
var t=e.dataset||{};
return(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=2&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+(t.product_id||"")+"&order="+(t.order||"")+"&r="+Math.random(),
t.href?(setTimeout(function(){
location.href="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t.href)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&scene=0";
},300),!1):!1;
},!0);
}(d[s]);
}
});