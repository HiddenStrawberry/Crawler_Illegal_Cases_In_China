define("cps/tpl/card_tpl.html.js",[],function(){
return'<!--卡片类型-->\n<# if(cps_isready == true){ #> <!--cps 数据ready-->\n    <# if(cps_state == \'no_cps\'){ #>\n        <!--违规-->\n        <section class="cps_inner cps_inner_card cps_inner_empty js_product_err_container js_banner_container">\n            <p>此内容因违规，暂无法查看</p>\n        </section>\n    \n    <# } else {#>\n        <!--正常-->\n        <section class="cps_inner cps_inner_card js_product_container js_banner_container">\n            <div class="cps_inner_wrp js_product_loop_content">\n                <div class="cps_inner_content">\n                    <figure class="cps_inner_image_container">\n                        <span width="100%" class="js_cover cps_inner_image" style="background: url(<#=img_url#>) no-repeat center; background-size:cover;"></span>\n                        <# if(is_ad == 1){ #>\n                        <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                        <# } #>\n                        <div class="cps_inner_info_from">\n                            <span class="cps_inner_ic_from" style="background: url(<#=source_logo_url#>) no-repeat center;\n                            background-size: contain;"></span><#=source_name#>\n                        </div>\n                    </figure>\n                    <div class="cps_inner_info">\n                        <div class="cps_inner_info_hd">\n                            <h2 class="cps_inner_info_title <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>line2<# } #>"><#=title#></h2> <!--通用模版带金额，title 可以显示2行-->\n                        </div>\n                        <div class="cps_inner_info_ft">\n                            <span class="cps_inner_btn_cps_info <# if(is_ad == 1){ #>buy<# } #>"><!--<i class="cps_inner_ic_miniapp"></i><# if(is_ad == 1){ #>购买<# } else { #>详情<# } #>--></span>\n                            <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>\n                            <p class="cps_inner_info_desc"><span class="price_sign">¥</span><#=price#></p>\n                            <# } #>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n    \n    <# } #>\n<# }else{ #>\n    <section class="cps_inner cps_inner_card cps_inner_placeholder">\n        <div class="cps_inner_wrp">\n            <!-- 数据加载成功模板 -->\n            <div class="cps_inner_content">\n                <figure class="cps_inner_image_container">\n                    <span class="cps_inner_image"></span>\n                </figure>\n                <div class="cps_inner_info">\n                    <div class="cps_inner_info_hd">\n                        <h2 class="cps_inner_info_title"></h2>\n                    </div>\n                    <div class="cps_inner_info_ft"></div>\n                </div>\n            </div>\n        </div>\n    </section>\n<# } #>\n';
});define("cps/tpl/banner_tpl.html.js",[],function(){
return'<# if(cps_isready == true){ #> <!--cps 数据ready-->\n    <# if(cps_state == \'no_cps\'){ #>\n        <!--违规-->\n        <section class="cps_inner cps_inner_banner cps_inner_empty js_product_err_container js_banner_container">\n            <p>此内容因违规，暂无法查看</p>\n        </section>\n    \n    <# } else {#>\n        <!--正常-->\n        <section class="cps_inner cps_inner_banner js_product_container js_banner_container">\n            <div class="cps_inner_wrp js_product_loop_content">\n                <div class="cps_inner_content">\n                    <figure class="cps_inner_image_container">\n                        <span width="100%" class="js_cover cps_inner_image" style="background: url(<#=img_url#>) no-repeat center; background-size: cover;"></span>\n                    </figure>\n                    <# if(is_ad == 1){ #>\n                    <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                    <# } #>\n                    <div class="cps_inner_info">\n                        <div class="cps_inner_info_hd">\n                            <h2 class="cps_inner_info_title"><#=title#></h2>\n                            <p class="cps_inner_info_desc"><#=desc#></p>\n                        </div>\n                        <div class="cps_inner_info_ft">\n                            <div class="cps_inner_info_from">\n                                <span class="cps_inner_ic_from" style="background: url(<#=source_logo_url#>) no-repeat center;\n                                background-size: contain;"></span><#=source_name#>\n                            </div>\n                            <span class="cps_inner_btn_cps_info <# if(is_ad == 1){ #>buy<# } #>"><!--<i class="cps_inner_ic_miniapp"></i><# if(is_ad == 1){ #>购买<# } else { #>详情<# } #>--></span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n    \n    <# } #>\n<# }else{ #>\n    <section class="cps_inner cps_inner_banner cps_inner_placeholder">\n        <div class="cps_inner_wrp">\n            <!-- 数据加载成功模板 -->\n            <div class="cps_inner_content">\n                <figure class="cps_inner_image_container">\n                    <span width="100%" class="cps_inner_image"></span>\n                </figure>\n                <div class="cps_inner_info">\n                    <div class="cps_inner_info_hd">\n                        <h2 class="cps_inner_info_title"></h2>\n                        <p class="cps_inner_info_desc"></p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n<# } #>\n';
});define("biz_common/tmpl.js",[],function(){
"use strict";
function n(n,e){
var r="";
return r=n.replace(/[\r\t\n]/g," ").split("<#").join("	").replace(/((^|#>)[^\t]*)'/g,"$1\r"),
r=e?r.replace(/\t==(.*?)#>/g,"',$1,'").replace(/\t=(.*?)#>/g,"', String($1).replace(/&/g,'&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') ,'"):r.replace(/\t=(.*?)#>/g,"',$1,'"),
r=r.split("	").join("');").split("#>").join("p.push('").split("\r").join("\\'");
}
var e=function(e,r,t){
var p=n(e,t),i=function(){};
try{
i=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+p+"');}return p.join('');");
}catch(c){
e=e.replace(/\'/g,"&#39;").replace(/'/g,"&#39;"),p=n(e,t),i=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+p+"');}return p.join('');");
}
return i(r);
},r=function(n,r,t){
var p=document.getElementById(n);
return p?e(p.innerHTML,r,t):"";
};
return{
render:r,
tmpl:e
};
});define("appmsg/index.js",["biz_common/tmpl.js","cps/tpl/banner_tpl.html.js","cps/tpl/card_tpl.html.js","cps/tpl/list_tpl.html.js","biz_common/utils/string/html.js","appmsg/weapp_common.js","biz_wap/utils/device.js","biz_common/dom/class.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_common/dom/attr.js","appmsg/max_age.js","biz_wap/utils/mmversion.js","appmsg/test.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/moment.js","appmsg/appmsg_report.js","biz_common/utils/url/parse.js","a/mpAdAsync.js","biz_wap/utils/wapsdk.js","common/utils.js","complain/localstorage.js","appmsg/popup_report.js","page/appmsg_new/combo.css","page/appmsg_new/not_in_mm.css","appmsg/finance_communicate.js","appmsg/cdn_img_lib.js","appmsg/share.js","biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/copyright_report.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/product.js","question_answer/utils.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/autoread.js","appmsg/voicemsg.js","appmsg/weproduct.js","appmsg/weapp.js","question_answer/appmsg.js","appmsg/wxtopic.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","appmsg/report.js","appmsg/fereport_without_localstorage.js","appmsg/fereport.js","biz_wap/safe/mutation_observer_report.js","sougou/index.js"],function(e,t,o,n){
"use strict";
function i(e){
for(var t=window.location.search,o=t.substring(1,t.length).split("&"),n=0;n<o.length;n++){
var i=o[n].split("=");
if(i[0].toUpperCase()===e.toUpperCase())return i[1];
}
return"";
}
function a(){
function t(e){
if(e&&0!=e.length){
for(var t={
batch_no:I.getQuery("batch_no")||"",
bizuin:window.biz||"",
biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
total:e.length
},o=0;o<e.length;o++){
var n=e[o],i=o+1;
for(var a in n)n.hasOwnProperty(a)&&(t[a+""+i]=n[a]);
}
g({
url:"/mp/productreport?",
type:"POST",
data:t,
dataType:"json",
async:!0
});
}
}
function o(){
Q&&clearTimeout(Q),Q=setTimeout(function(){
try{
Q=null;
for(var e=0;e<L.length;e++){
var o=L[e],n=_.attr(o,"data-showed");
if("no"==n){
var i=o.getElementsByClassName("js_product_loop_content");
if(i.length>0){
i=i[0];
var a=i.getBoundingClientRect(),r=a.height||a.bottom-a.top;
if(r>0&&a.top<k.getInnerHeight()&&a.bottom>0){
o.setAttribute("data-showed","yes");
var s=i.getAttribute("data-pid");
s&&t([{
wxa_appid:i.getAttribute("data-wxaappid"),
pid:s,
type:3,
absolute_order:e+1,
appid:i.getAttribute("data-appid")||"",
templateid:i.getAttribute("data-templateid")||"",
relative_order:1*i.getAttribute("data-order"),
packid:i.getAttribute("data-packid")||""
}]);
}
}
}
}
}catch(d){}
},100);
}
function a(e){
try{
for(var n=window.pageYOffset||document.documentElement.scrollTop,a=0;a<L.length;a+=N){
var m=L[a];
if(!(m.offsetTop>n+k.getInnerHeight()+100)){
var l=_.attr(m,"data-cpsstatus");
if("hide"==l){
m.setAttribute("data-cpsstatus","loading");
for(var w=""+a,u=1,f=a+1;f<L.length&&a+N>f;f++)w=w+"%2c"+f,u++;
var h=Math.ceil(1e7*Math.random());
if(""!==i("mockcps"))var v="/mp/cps_product_info?biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&cpslist="+w+"&sn="+window.sn+"&mockcps="+i("mockcps");else var v="/mp/cps_product_info?biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&cpslist="+w+"&sn="+window.sn+"&istempurl="+(window.is_temp_url||0)+"&random="+h;
!function(e,n,i){
g({
url:n,
type:"GET",
dataType:"json",
async:!0,
error:function(){
try{
window.__addIdKeyReport("64469","18",i);
}catch(e){}
},
success:function(e){
try{
window.__addIdKeyReport("64469","16",e.product_list.length),e.product_list.length<i&&window.__addIdKeyReport("64469","18",i-e.product_list.length);
for(var n=0;n<e.product_list.length;n++){
e.product_list[n].data.cps_isready=!0,e.product_list[n].data.pid_type=e.product_list[n].data.pid_type||e.product_list[n].attr.pid_type;
var a=L[e.product_list[n].index],m=e.product_list[n].template_id;
"list"==m?a.innerHTML=r.tmpl(p,e.product_list[n].data):"banner"==m?a.innerHTML=r.tmpl(s,e.product_list[n].data):"card"==m&&(a.innerHTML=r.tmpl(d,e.product_list[n].data)),
e.product_list[n].weapp_username&&(e.product_list[n].attr.weapp_username=e.product_list[n].weapp_username),
e.product_list[n].weapp_version&&(e.product_list[n].attr.weapp_version=e.product_list[n].weapp_version),
a.setAttribute("data-cpsstatus","complete");
for(var l=a.getElementsByClassName("js_product_loop_content"),w=0;w<l.length;w++)for(var g in e.product_list[n].attr)l[w].setAttribute("data-"+g,e.product_list[n].attr[g]);
for(var u=a.getElementsByTagName("img"),w=0;w<u.length;w++)u[w].src=_.attr(u[w],"data-src");
!function(e,o){
y.on(e,"tap",".js_product_loop_content",function(e){
try{
var n=e.delegatedTarget,i=n.getAttribute("data-wxaappid"),a=n.getAttribute("data-wxapath"),r=n.getAttribute("data-pid"),s=n.getAttribute("data-appid"),d=n.getAttribute("data-cpspackage"),p=Math.floor((new Date).getTime()/1e3)+5184e3,m=n.getAttribute("data-weapp_username"),l=n.getAttribute("data-weapp_version");
c.jumpUrl({
cps_weapp_username:m,
cps_weapp_version:l,
privateExtraData:{
cookies:"cps_package="+encodeURIComponent(d)+"; expires="+p+"; busid=mmbiz_ad_cps; domain=*; spread=*"
},
sourceAppId:s,
appid:i,
path:a,
scene:1091,
sceneNote:encodeURIComponent(location.href)+":"+encodeURIComponent(r),
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(e){
"openWeApp:ok"===e.err_msg&&r&&t([{
wxa_appid:i,
pid:r,
type:4,
absolute_order:o+1,
appid:n.getAttribute("data-appid")||"",
templateid:n.getAttribute("data-templateid")||"",
relative_order:1*n.getAttribute("data-order"),
packid:n.getAttribute("data-packid")||""
}]);
}
});
}catch(e){}
return!1;
});
}(a,e.product_list[n].index);
}
o();
}catch(f){
window.__addIdKeyReport("64469","18",e.product_list.length);
}
}
});
}(w,v,u);
}
}
}
}catch(e){
console.log(e);
}
}
function B(e){
try{
V&&clearTimeout(V),V=setTimeout(function(){
a(e);
},300);
}catch(e){}
}
function T(){
var e=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
e>=40&&!D?(D=!0,window.show_top_bar&&window.user_name&&window.topbarEnable?(b.invoke("currentMpInfoShow",function(){}),
g({
url:"/mp/appmsgreport?action=topbarevent",
data:{
__biz:biz,
mid:mid,
idx:idx,
scene:source,
subscene:subscene,
sessionid:sessionid,
enterid:enterid,
screen:Math.ceil((window.pageYOffset||document.documentElement.scrollTop)/k.getInnerHeight()),
event:"show"
},
type:"POST",
dataType:"json",
async:!0
})):document.title=window.title):40>e&&D&&(D=!1,window.show_top_bar&&window.user_name&&window.topbarEnable?(b.invoke("currentMpInfoHide",function(){}),
g({
url:"/mp/appmsgreport?action=topbarevent",
data:{
__biz:biz,
mid:mid,
idx:idx,
scene:source,
subscene:subscene,
sessionid:sessionid,
enterid:enterid,
screen:Math.ceil((window.pageYOffset||document.documentElement.scrollTop)/k.getInnerHeight()),
event:"hide"
},
type:"POST",
dataType:"json",
async:!0
})):document.title="");
}
function M(e,t){
var o={
lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
},n=new Image;
n.onload=function(){
var o=n.width>0&&n.height>0;
t(e,o);
},n.onerror=function(){
t(e,!1);
},n.src="data:image/webp;base64,"+o[e];
}
function K(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e.timing){
var t=e.timing;
w("[Appmsg] dns:"+(t.domainLookupEnd-t.domainLookupStart)+"^^^ ssl:"+(0==t.secureConnectionStart?0:t.connectEnd-t.secureConnectionStart)+"^^^ tcp:"+(t.connectEnd-t.connectStart)+"^^^ request:"+(t.responseStart-t.requestStart)+"^^^ getPackageTime:"+(t.responseEnd-t.responseStart)+"^^^ domCententLoaded:"+(t.domContentLoadedEventStart-t.domLoading)+"^^^ domComplete:"+(t.domComplete-t.domLoading)+"^^^ firstViewTime:"+(real_show_page_time-t.navigationStart)+"^^^ interactiveTime:"+(page_endtime-t.navigationStart))+"^^^ ua:"+window.navigator.userAgent,
setTimeout(function(){
t.loadEventEnd&&w("[Appmsg] onload:"+(t.loadEventEnd-t.loadEventStart));
},100);
}
"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){
return this.replace(/^\s+|\s+$/g,"");
}),""==document.getElementById("js_content").innerHTML.trim()&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_94_1");
var o=Math.random();
.001>o&&document.getElementById("js_read_area3")&&document.getElementById("js_read_area3").innerText&&document.getElementById("js_read_area3").innerText.indexOf("Pageview")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_95_1"),
window.__wxjs_is_wkwebview&&window.__addIdKeyReport("28307",67);
}
try{
var L=document.getElementsByTagName("mpcps");
window.__addIdKeyReport("64469","15",L.length);
for(var P=0;P<L.length;P++){
L[P].setAttribute("data-cpsstatus","hide"),L[P].setAttribute("data-showed","no");
var W={
cps_isready:!1,
cps_state:"",
pid_type:"",
img_url:"",
title:"",
desc:"",
source_name:"",
source_logo_url:"",
is_ad:1
},H=_.attr(L[P],"data-templateid");
"list"==H?L[P].innerHTML=r.tmpl(p,W):"banner"==H?L[P].innerHTML=r.tmpl(s,W):"card"==H&&(L[P].innerHTML=r.tmpl(d,W));
}
}catch(U){
console.log(U);
}
var V,Q=null;
o(),y.on(window,"scroll",o),a(),y.on(window,"scroll",B),b.on("topbar:click",function(){
g({
url:"/mp/appmsgreport?action=topbarevent",
data:{
__biz:biz,
mid:mid,
idx:idx,
scene:source,
subscene:subscene,
sessionid:sessionid,
enterid:enterid,
screen:Math.ceil((window.pageYOffset||document.documentElement.scrollTop)/k.getInnerHeight()),
event:"click"
},
type:"POST",
dataType:"json",
async:!0
});
}),window.is_new_msg&&-1!=navigator.userAgent.indexOf("MicroMessenger")&&(window.title&&(window.title=window.title.replace(/&#39;/g,"'").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&")),
window.msg_title&&(window.msg_title=window.msg_title.replace(/&#39;/g,"'").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&")),
hd_head_img||E.jsmonitor({
id:115849,
key:26,
value:1
}),b.invoke("currentMpInfo",{
userName:window.user_name,
brandName:window.title,
title:window.msg_title||"",
brandIcon:hd_head_img.replace(/\/0$/,"/132"),
desc:z.get("currentMpInfoDesc"+biz)||""
},function(){}),b.invoke("createWebViewForFastLoad",{
scene:1
},function(e){
console.log(e);
}),y.on(window,"load",function(){
b.invoke("checkJsApi",{
jsApiList:["currentMpInfoShow"]
},function(e){
try{
e.err_msg.indexOf("ok")>-1&&(/(Android)/i.test(navigator.userAgent)&&1==JSON.parse(e.checkResult).currentMpInfoShow||1==e.checkResult.currentMpInfoShow)&&(window.topbarEnable=!0);
}catch(t){}
document.title="",D=!1,T(),window.onscroll=T,window.addEventListener("pageshow",T);
});
}));
var F=document.getElementsByTagName("body");
if(!F||!F[0])return!1;
F=F[0],h.isInMiniProgram&&(document.getElementById("js_name")&&l.addClass(document.getElementById("js_name"),"tips_global_primary"),
document.getElementsByClassName("account_nickname_inner").length&&l.addClass(document.getElementsByClassName("account_nickname_inner")[0],"tips_global_primary"),
document.getElementById("js_share_author")&&l.addClass(document.getElementById("js_share_author"),"tips_global_primary")),
function(){
function e(){
if(n.length)for(var e=document.documentElement.scrollTop||document.body.scrollTop,t=0;t<n.length;t++)if(1!=n[t].getAttribute("hasload")){
var o=n[t].getBoundingClientRect();
(o.top<d+e&&o.top>e||o.top+o.height>e&&o.top+o.height<d+e)&&n[t].getAttribute("href").length>0&&(n[t].setAttribute("hasload",1),
b.invoke("downloadPageDataForFastLoad",{
itemList:[{
item_show_type:n[t].getAttribute("data-itemshowtype"),
url:n[t].getAttribute("href")
}]
},function(e){
console.log(e);
}),n.splice(t,1),t--);
}
}
function t(){
for(var e=0;e<r.length;e++){
var t=r[e],o=t.getBoundingClientRect();
(o.top<=0&&o.top+o.height>=0||o.top>0&&o.top<d)&&(r.splice(e,1),e--,R.report([1,R.getRedirectType(t.parentNode.getAttribute("href")),"",img_popup?1:0,window.source,R.getUrlData(t.parentNode.getAttribute("href"))]));
}
for(var e=0;e<s.length;e++){
var t=s[e],o=t.getBoundingClientRect();
(o.top<=0&&o.top+o.height>=0||o.top>0&&o.top<d)&&(s.splice(e,1),e--,R.report([1,1,"",img_popup?1:0,window.source,t.getAttribute("data-miniprogram-appid")]));
}
}
function o(){
e(),t();
}
for(var n=[],i=document.getElementById("js_content").getElementsByTagName("a"),a=0;a<i.length;a++)null!==i[a].getAttribute("data-itemshowtype")&&n.push(i[a]);
var r=[];
Array.prototype.map.call(document.getElementById("js_content").getElementsByClassName("h5_image_link"),function(e){
e.parentNode.getAttribute("href")&&e.parentNode.getAttribute("href").length>0&&r.push(e);
});
var s=[];
Array.prototype.map.call(document.getElementById("js_content").getElementsByClassName("weapp_image_link"),function(e){
s.push(e);
});
var d=window.innerHeight||document.documentElement.clientHeight;
y.on(window,"scroll",o),o();
}(),function(){
var e=document.getElementById("js_hotspot_area"),t=0===window.hotspotInfoList.length,o=function n(o){
if(!t){
var i=k.getInnerHeight()+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop);
e.offsetTop<i?(t=!0,y.off(window,"scroll",n),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=59977_15_1",
j.hotspotReport({
hotspotjson:JSON.stringify({
hotspotinfolist:window.hotspotInfoList
})
})):"function"==typeof o&&o();
}
};
o(function(){
y.on(window,"scroll",o);
});
}();
var J=/^http(s)?:\/\/mp\.weixin\.qq\.com\//g;
try{
if(top!=window&&(!top||top&&location.href&&J.test(location.href))&&!window.isSg)throw new Error("in iframe");
}catch(U){
var G="",Y=new Image;
Y.src=("http://mp.weixin.qq.com/mp/jsreport?key=4&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key4]"+G+"&r="+Math.random()).substr(0,1024);
}
if(window.isInWeixinApp()&&/#rd$/.test(location.href)&&!window.isWeixinCached&&!window.__second_open__){
var $=-1!=location.href.indexOf("?")?"&":"?";
location.replace(location.href.replace(/#rd$/,$+"rd2werd=1#wechat_redirect"));
}
var X=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
{
var Z=!h.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger");
-1!=navigator.userAgent.indexOf("WindowsWechat");
}
e("appmsg/share.js");
var et=A(1e3*parseInt(window.modify_time)),tt=et.format("YYYY-MM-DD"),ot=document.getElementById("js_modify_time");
if(ot&&(ot.innerHTML=tt),window.isSg||"mp.weixin.qq.com"==location.host){
var nt=e("biz_common/log/jserr.js");
nt({
key:0,
reporturl:"http://mp.weixin.qq.com/mp/jsreport?1=1",
replaceStr:/http(s)?:(.*?)js\//g
});
}
window.logs.webplog={
lossy:0,
lossless:0,
alpha:0,
animation:0,
total:0
};
var it=-1!=navigator.userAgent.indexOf("TBS/"),at=function(e,t){
M(e,function(e,o){
if(window.logs.webplog[e]=o?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var n=window.logs.webplog,i=Math.random();
it&&1>=i&&(n.lossy=n.lossless=n.alpha=1,window.logs.webplog=n);
var a=n.lossy&n.lossless&n.alpha;
t(!!a);
}
});
},rt=function(e){
for(var t=document.getElementsByTagName("img"),o=!1,n=!1,i=0,a=t.length;a>i;i++){
var r=t[i].getAttribute("data-src");
r&&r.canHevc()&&(o=!0),r&&r.isGif()&&(n=!0);
}
var s=h.gtVersion("6.5.13",!0)&&n,d=h.gtVersion("6.8.0",!0)&&o,p=!1;
try{
{
top.window.document;
}
}catch(c){
p=!0;
}
(C||navigator.userAgent.indexOf("Br_trunk")>-1)&&h.isIOS&&(s||d)&&!p?(console.info("[HEVC代理] 当前版本可以启用HEVC代理"),
b.invoke("imageProxyInit",{},function(t){
t.err_msg.indexOf(":ok")>-1?(S=t.serverUrl,window.__addIdKeyReport("28307",117)):t.err_msg.indexOf(":fail")>-1&&window.__addIdKeyReport("28307",118),
e();
})):e();
},st=function(e){
at("lossy",e),at("lossless",e),at("alpha",e),at("animation",e);
};
window.webp=!1,rt(function(){
st(function(t){
function o(e){
e.width<40||e.height<40||-1==e.className.indexOf("img_loading")&&(e.className+=" img_loading");
}
function n(e){
if(!(e.width<40||e.height<40)){
var t=e.src;
if(e.className=e.className.replace("img_loading",""),-1==e.className.indexOf("img_loadederror")){
e.className+=" img_loadederror",e.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
window.__addIdKeyReport("28307",51);
var n=function(){
window.__addIdKeyReport("28307",66),i(e),o(e);
var n=e.__retryload;
return n=0,t=t.https2http(),e.__retryload=n,e.src=X.addParam(t,"retryload",n,!0),
!1;
};
y.on(e,"click",n);
}
}
}
function i(e){
e.className=e.className.replace("img_loading",""),e.className=e.className.replace("img_loadederror","");
}
window.webp=t,t&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var a=document.getElementById("js_cover");
if(a){
var r=a.getAttribute("data-src");
r&&(r.isCDN()&&(r=r.imgChange640(),t&&(r=X.addParam(r,"tp","webp",!0)),r=X.addParam(r,"wxfrom","5",!0),
is_https_res||O?r=r.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(r=r.https2http())),
setTimeout(function(){
a.onload=function(){
u(a,"height","auto","important"),u(a,"visibility","visible","important");
},a.setAttribute("src",r);
},0),window.logs.img.read[r]=!0,window.logs.img.load[r]=!0,a.removeAttribute("data-src"));
}
var s=e("biz_wap/ui/lazyload_img.js"),d=2;
window.logs.outer_pic=0;
for(var p=document.getElementsByTagName("img"),c=0,m=p.length;m>c;c++){
{
var g=p[c].getAttribute("data-src");
p[c].getAttribute("src");
}
g&&g.isGif()&&p[c].className.indexOf("__bg_gif")<0&&(p[c].className+=" __bg_gif");
}
for(var _=document.getElementsByClassName("__bg_gif"),c=0,m=_.length;m>c;++c)_[c].setAttribute("data-order",c);
var f=function(e){
try{
var t=e,o=t.getAttribute("data-src");
if(!/^https?\:\/\/mmbiz\.qpic\.cn/.test(o))return;
var n=t.parentNode,i=!1;
l.hasClass(n,"js_jump_icon")&&(i=!0);
for(var a=!1;n.tagName&&"body"!=n.tagName.toLowerCase();){
if("a"==n.tagName.toLowerCase()){
var r=n.getAttribute("href")||"";
null!=r.match(/^http/)&&(a=!0);
break;
}
n=n.parentNode;
}
if(i&&!a){
var s=t.parentNode,d=s.parentNode;
if(d){
for(var p=document.createDocumentFragment();s.firstChild;)p.appendChild(s.firstChild);
d.insertBefore(p,s),d.removeChild(s);
}
}else if(!i&&a){
var c=document.createElement("span"),m=getComputedStyle(t);
"static"!=m.positon&&(c.style.position=m.positon),c.style.left=m.left,c.style.top=m.top,
c.style.right=m.right,c.style.bottom=m.bottom,c.style.margin=m.margin,l.addClass(c,"js_jump_icon"),
l.addClass(c,"h5_image_link"),t.style.position="static",t.style.margin="0px",t.parentNode.insertBefore(c,t),
c.appendChild(t),window.__addIdKeyReport("111535",0);
}
}catch(w){}
},v=function z(e){
try{
var t=e.childNodes,o=getComputedStyle(e);
(o.backgroundImage.match(/https\:\/\/mmbiz\.qpic\.cn/)||o.backgroundImage.match(/http\:\/\/mmbiz\.qpic\.cn/))&&window.__addIdKeyReport("111535",2);
for(var n=0;n<t.length;n++)"a"!=t[n].tagName.toLowerCase()&&z(t[n]);
}catch(i){}
};
try{
for(var b=document.getElementsByTagName("a"),A=0;A<b.length;A++){
var j=b.item(A),I=j.getAttribute("href")||"";
null!=I.match(/^http/)&&v(j);
}
}catch(x){}
var k=!1;
new s({
attrKey:"data-src",
imgOccupied:!0,
crossOrigin:!0,
lazyloadHeightWhenWifi:function(){
var e,t=1,o=1;
e=window.svr_time?new Date(1e3*window.svr_time):new Date;
var n=e.getHours();
return n>=20&&23>n&&(t=.5,o=0),{
bottom:t,
top:o
};
},
inImgRead:function(e){
e&&(window.logs.img.read[e]=!0);
},
changeSrc:function(e,t){
if(!t)return"";
var o=t;
if(t.isCDN()){
o=o.imgChange640();
var n,i=window.navigator.userAgent,a=/TBS\/([\d\.]+)/i,r=i.match(a);
r&&r[1]&&(n=parseInt(r[1]));
var s,d=/XWEB\/([\d\.]+)/i,p=i.match(d);
p&&p[1]&&(s=parseInt(p[1]));
var c=1e3,m=window.user_uin||0,l=0!==m&&Math.floor(m/100)%1e3<c,g=(n>=43305||s>=16)&&o.isGif(),_=0!==m&&Math.floor(m/100)%1e3<=100,u=s>=564&&o.canHevc()&&h.gtVersion("6.8.0",!0)&&_;
l&&44206!=n&&(g||u)?(o=X.addParam(o,"tp","wxpic",!0),window.__addIdKeyReport("28307",91)):window.webp&&(o=X.addParam(o,"tp","webp",!0),
window.__addIdKeyReport("28307",84)),o=X.addParam(o,"wxfrom","5",!0),is_https_res||O?(o=o.http2https(),
window.__addIdKeyReport("28307",77)):("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(o=o.https2http(),
window.__addIdKeyReport("28307",70));
}else try{
var a=new RegExp("^http(s)?://((mmbiz.qpic.cn/.*)|(m.qpic.cn/.*)|(mmsns.qpic.cn/.*)|(shp.qpic.cn/.*)|(wx.qlogo.cn/.*)|(mmbiz.qlogo.cn/.*)|((a|b)[0-9]*.photo.store.qq.com/.*)|(mp.weixin.qq.com/.*)|(res.wx.qq.com/.*))");
a.test(t)||(window.__addIdKeyReport("28307",9),window.logs.outer_pic++);
}catch(f){}
var v=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
o=o.replace(v,"http://m.qpic.cn"),/^http(s)?:\/\/m\.qpic\.cn([\/?].*)*$/i.test(o)&&!window.webp&&(o=X.addParam(o,"t","",!0)),
o=X.addParam(o,"wx_lazy","1",!0);
var y=h.gtVersion("6.5.13",!0)&&o.isGif(),b=h.gtVersion("6.8.0",!0)&&o.canHevc();
return S&&(y||b)&&(window.__addIdKeyReport("28307",106),o=X.addParam(o,"tp","wxpic",!0),
o=S+"hevc?url="+encodeURIComponent(o)+"&type="+o.getOriginImgType()),"anonymous"==e.crossOrigin&&(o=X.addParam(o,"wx_co","1",!0)),
window.logs.img.load[o]=!0,w("[Appmsg] image_load_event_change_src. originsrc:"+t+"  ^^^ newsrc : "+o),
e.start_load_time=+new Date,o;
},
onerror:function(e,t){
var o=t?t.__retryload||0:0;
if(2==o&&n(t),e&&!(o>d)){
if(!e.isCDN()){
if(!S)return;
if(-1==e.indexOf(S))return;
}
var i=0==e.indexOf("https://")?7:0;
if(window.__addIdKeyReport("28307",72+i),1>=o&&window.__addIdKeyReport("28307",75+1*o+i),
e.isWxpic()?(window.__addIdKeyReport("28307",93),1>=o&&window.__addIdKeyReport("28307",96+1*o)):e.isWebp()&&(window.__addIdKeyReport("28307",86),
1>=o&&window.__addIdKeyReport("28307",89+1*o)),S&&e.indexOf(S)>-1&&window.__addIdKeyReport("28307",108),
d>o){
if(o++,t.__retryload=o,1==o&&e.indexOf("http://")>-1?(e=e.http2https(),window.__addIdKeyReport("28307",60),
window.__addIdKeyReport("28307",77)):1==o&&e.indexOf("https://")>-1?(window.__addIdKeyReport("28307",61),
window.__addIdKeyReport("28307",77)):2==o&&e.indexOf("mmbiz.qpic.cn")>-1&&(e=e.replace("mmbiz.qpic.cn","mmbiz.qlogo.cn"),
e.indexOf(!1)&&(e=e.http2https())),S&&e.indexOf(S)>-1){
var a=e.split("hevc?url=")[1];
a=a.split("&type")[0],a=decodeURIComponent(a),a=a.replace("tp=wxpic",""),e=a.https2http();
}
t.start_load_time=+new Date,t.src=X.addParam(e,"retryload",o,!0);
}
window.__has_imgfailed||(window.__has_imgfailed=!0,window.__addIdKeyReport("28307",65)),
w("[Appmsg] image_load_event_on_error. src:"+e),t.setAttribute("data-fail",1);
try{
if("[object Array]"==Object.prototype.toString.call(t.lazyLoadOnerror))for(var r=0,s=t.lazyLoadOnerror.length;s>r;r++)"function"==typeof t.lazyLoadOnerror[r]&&t.lazyLoadOnerror[r].call(t);
}catch(p){}
var c=10;
/tp\=webp/.test(e)&&(c=11);
var m=new Image;
m.src="http://mp.weixin.qq.com/mp/jsreport?key="+c+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
onload:function(e,t){
if(!window.__second_open__&&!k){
var o=window.performance||window.msPerformance||window.webkitPerformance;
if(!o||!o.timing)return;
var n=window.location.protocol;
E.saveSpeeds({
uin:uin,
pid:"https:"==n?462:417,
speeds:{
sid:35,
time:Date.now()-window.performance.timing.navigationStart
}
}),E.send(),k=!0;
}
i(t),t.gray&&!t.loadGif&&((t.width||t.naturalWidth)<120||(t.height||t.naturalHeight)<120?t.autoTap&&t.autoTap():t.span&&t.span.children&&t.span.children.item(0)&&(t.span.children.item(0).style.display=""));
var a=t?t.__retryload||0:0;
if(!(a>d)){
w("[Appmsg] image_load_event_onload_image. src:"+e+"  ^^^  retryloadtimes: "+a),
t.setAttribute("data-fail",0),f(t);
try{
if("[object Array]"==Object.prototype.toString.call(t.lazyLoadOnload))for(var r=0,s=t.lazyLoadOnload.length;s>r;r++)"function"==typeof t.lazyLoadOnload[r]&&t.lazyLoadOnload[r].call(t);
}catch(p){}
var c=0==e.indexOf("https://")?7:0;
window.__addIdKeyReport("28307",71+c),1>=a&&window.__addIdKeyReport("28307",73+1*a+c),
e.isWxpic()?(window.__addIdKeyReport("28307",92),1>=a&&window.__addIdKeyReport("28307",94+1*a)):e.isWebp()&&(window.__addIdKeyReport("28307",85),
1>=a&&window.__addIdKeyReport("28307",87+1*a)),S&&e.indexOf(S)>-1&&window.__addIdKeyReport("28307",107),
window.__has_imgsucceed||(window.__has_imgsucceed=!0,window.__addIdKeyReport("28307",64)),
1==a&&e.indexOf("http://")>-1&&window.__addIdKeyReport("28307",50),1==a&&e.indexOf("https://")>-1&&window.__addIdKeyReport("28307",52);
var m=Math.random(),l=+new Date-t.start_load_time;
l&&0==e.indexOf("https://")&&.5>m?(window.__addIdKeyReport("27822",121,l),window.__addIdKeyReport("27822",122)):l&&5e-4>m&&(window.__addIdKeyReport("27822",124,l),
window.__addIdKeyReport("27822",125)),"none"!=getComputedStyle(t).filter&&(t.style.transform="translateZ(0)",
t.style.webkitTransform="translateZ(0)");
}
},
detect:function(e){
if(e&&e.time&&e.loadList){
var t=e.time,o=e.loadList;
window.logs.img.download[t]=o;
}
},
container:document.getElementById("page-content")
});
});
}),e("appmsg/async.js"),!window.isSg;
var dt=e("appmsg/copyright_report.js");
!function(){
var e=document.getElementById("profileBt"),t=document.getElementById("copyright_info"),o=[];
if(h.isInMiniProgram&&t&&l.addClass(t,"disabled"),e){
var n="57";
"26"==window.source&&(n="95"),"28"==window.source&&(n="96"),"29"==window.source&&(n="39"),
"15"==window.source&&(n="121"),o.push({
dom:e,
username:user_name_new||user_name,
profileReportInfo:window.profileReportInfo||"",
scene:n
});
}
t&&source_encode_biz&&o.push({
dom:t,
source_encode_biz:source_encode_biz,
scene:"161"
});
var i=document.getElementById("js_share_headimg");
i&&o.push({
dom:i,
username:source_username,
scene:0
});
var a=document.getElementById("js_share_author");
a&&o.push({
dom:a,
username:source_username,
scene:"0"
});
for(var r=0,s=o.length;s>r;r++)!function(e){
y.on(e.dom,"click",function(){
if("copyright_info"==e.dom.id&&source_encode_biz){
if(h.isInMiniProgram)return!1;
dt.card_click_report({
scene:"0"
});
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene="+e.scene+"#wechat_redirect";
-1!=navigator.userAgent.indexOf("WindowsWechat")?location.href=t:b.invoke("profile",{
username:source_username,
scene:e.scene+""
});
}else{
if(w("[Appmsg] profile_click_before_loadprofile: username:"+e.username+", scene:"+e.scene),
j.profileReport({
hotspotjson:JSON.stringify({
hotspotinfolist:window.hotspotInfoList
})
}),profileReportInfo){
var o=String(profileReportInfo).split("_");
3==o.length&&g({
url:"/mp/ad_biz_info?action=report&__biz="+window.biz+"&report_type=2&aid="+o[1]+"&tid="+o[2],
type:"GET",
dataType:"json",
async:!0,
success:function(){}
});
}
h.isInMiniProgram||(1==isprofileblock?b.invoke("openUrlWithExtraWebview",{
url:"https://mp.weixin.qq.com/mp/profileblock?__biz="+window.biz+"#wechat_redirect",
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href="https://mp.weixin.qq.com/mp/profileblock?__biz="+window.biz+"#wechat_redirect");
}):b.invoke("profile",{
username:e.username,
profileReportInfo:e.profileReportInfo||"",
scene:e.scene+""
},function(t){
window.__addIdKeyReport("28307","1"),w("[Appmsg] profile_click_after_loadprofile: username:"+e.username+", scene:"+e.scene+", profileReportInfo:"+e.profileReportInfo+", res.err_msg:"+t.err_msg);
}));
}
return!1;
}),h.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(o[r]);
}(),function(){
h.isIOS&&location.href.match(/fontScale=\d+/)&&b.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
l.addClass(document.getElementsByTagName("body").item(0),"appmsg_skin_fontscale_"+e.fontSize);
});
}(),function(){
function e(){
if("hidden"in document)return"hidden";
for(var e=["webkit","moz","ms","o"],t=0;t<e.length;t++)return e[t]+"Hidden"in document,
e[t]+"Hidden";
return null;
}
function t(){
var t=e();
return t?document[t]:!1;
}
function o(){
if(t())for(var e=0;e<window.parent.originalVideoAdFrames.length;e++)window.parent.originalVideoAdFrames[e].contentWindow.postMessage({
action:"pauseAd",
value:""
},"*");else window.originalVideoAdCurrentFrame&&window.originalVideoAdCurrentFrame.contentWindow.postMessage({
action:"playAd"
},"*");
}
document.webkitVisibilityState?document.addEventListener("webkitvisibilitychange",o,!1):document.msVisibilityState?document.addEventListener("msvisibilitychange",o,!1):document.visibilityState&&document.addEventListener("visibilitychange",o,!1);
}();
try{
var pt=document.getElementById("js_author_name");
if(pt){
var ct="";
y.on(pt,"click",function(){
return l.hasClass(pt,"rich_media_meta_link")?window.is_temp_url?(n("预览状态下不能操作"),
!1):pt.getAttribute("data-rewardsn")?1!=pt.getAttribute("data-canreward")?!1:(ct="https://mp.weixin.qq.com/mp/author?action=show&author_id="+author_id+"&rewardsn="+pt.getAttribute("data-rewardsn")+"&timestamp="+pt.getAttribute("data-timestamp")+"&__biz="+window.biz+"&appmsgid="+window.appmsgid+"&idx="+window.idx+"&scene=142&rscene=129#wechat_redirect",
h.isInMiniProgram?!1:(-1!=navigator.userAgent.indexOf("MicroMessenger")&&(h.isIOS||h.isAndroid||h.isWp)?(window.__addIdKeyReport("110809","1"),
b.invoke("openUrlWithExtraWebview",{
url:ct,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=ct);
})):location.href=ct,!1)):!1:!1;
});
}
}catch(U){}
var mt=e("appmsg/outer_link.js");
if(new mt({
container:document.getElementById("js_content"),
changeHref:function(e,t){
if(!e||0!=e.indexOf("http://mp.weixin.qq.com/")&&0!=e.indexOf("https://mp.weixin.qq.com/")){
if(18==ban_scene)return"/mp/ban?action=check&__biz="+biz+"&mid="+mid+"&idx="+idx+"&scene="+ban_scene+"#wechat_redirect";
if(0!=e.indexOf("http://mp.weixinbridge.com/mp/wapredirect"))return"http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+t+"&scene=0";
}else{
e=e.replace(/#rd\s*$/,""),e=e.replace(/#wechat_redirect\s*$/,""),e=e.replace(/[\?&]scene=21/,"");
var o="&";
-1==e.indexOf("?")&&(o="?"),e+=o+"scene=21#wechat_redirect";
}
return e;
}
}),!Z){
var lt=e("appmsg/review_image.js"),wt=document.getElementById("js_cover"),gt=[];
wt&&gt.push(wt),new lt({
container:document.getElementById("js_content"),
is_https_res:is_https_res,
imgs:gt
});
}
e("appmsg/product.js"),function(){
try{
var t=e("question_answer/utils.js"),o=document.getElementById("js_content");
if(!o||!o.querySelectorAll)return;
for(var n=o.querySelectorAll("*"),i="rich_pages,blockquote_info,blockquote_biz,blockquote_other,blockquote_article,js_jump_icon,h5_image_link,js_banner_container,js_list_container,js_cover,js_tx_video_container,js_product_err_container,js_product_loop_content,js_product_container,img_loading,list-paddingleft-1,list-paddingleft-2,list-paddingleft-3,selectTdClass,noBorderTable,ue-table-interlace-color-single,ue-table-interlace-color-double,__bg_gif,weapp_text_link,weapp_image_link,js_img_loading,wx_video_context,db,wx_video_thumb_primary,wx_video_play_btn,wx_video_mask".split(","),a=[new RegExp("^cps_inner"),new RegExp("^bizsvr_"),new RegExp("^code-snippet"),new RegExp("^"+t.classPrefix),new RegExp("^wx-edui-")],r=function(e){
var t=e.getAttribute("class");
if(t){
for(var o=t.split(/\s+/),n=[],r=0,s=o.length;s>r;++r){
var d=o[r];
if(d&&-1!=i.indexOf(d))n.push(d);else for(var p=0,c=a.length;c>p;p++)if(a[p].test(d)){
n.push(d);
break;
}
}
e.setAttribute("class",n.join(" "));
}
},s=0,d=n.length;d>s;++s){
var p=n[s];
p&&p.tagName&&"iframe"!=p.tagName.toLowerCase()?r(p):p&&p.tagName&&"iframe"==p.tagName.toLowerCase()&&"video_ad_iframe"===p.getAttribute("class")&&p.setAttribute("class","");
}
}catch(c){}
}(),function(){
window.originalVideoAdFrames=[],window.originalVideoAdCurrentFrame=null,window.originalVideoAdFramesUnsetList=[],
window.addEventListener("message",function(e){
var t="",o=document.getElementsByTagName("iframe");
if(e.data&&"originalVideoAdNeedData"==e.data.action&&e.data.vid)if(window.originalVideoAdFramesAdData){
window.originalVideoAdFramesAdData&&window.originalVideoAdFramesAdData[e.data.vid]&&(t=window.originalVideoAdFramesAdData[e.data.vid]);
for(var n=0;n<o.length;n++)o[n].dataset&&o[n].dataset.mpvid==e.data.vid&&o[n].contentWindow.postMessage({
action:"receiveOriginalVideoData",
vid:e.data.vid,
adData:t
},"*");
}else console.log(e.data.vid," has no ad data yet"),window.originalVideoAdFramesUnsetList.push(e.data.vid);
});
}(),window.fromWeixinCached||e("appmsg/iframe.js"),x.getAdData(window.reportVid),
e("appmsg/qqmusic.js"),e("appmsg/voice.js"),window.__appmsgCgiData&&1==window.__appmsgCgiData.show_msg_voice&&e("appmsg/autoread.js"),
"1"==window.show_msg_voice&&(console.log("load voicemsg"),e("appmsg/voicemsg.js")),
!window.__appmsgCgiData||1!=window.__appmsgCgiData.wxa_product&&1!=window.__appmsgCgiData.wxa_cps||e("appmsg/weproduct.js"),
e("appmsg/weapp.js"),e("question_answer/appmsg.js"),e("appmsg/wxtopic.js"),e("appmsg/cdn_speed_report.js");
var _t=e("appmsg/page_pos.js");
_t.init({
hasSpAd:!0
}),setTimeout(function(){
window.article_improve_combo_css;
},0),setTimeout(function(){
y.tap(document.getElementById("copyright_logo"),function(){
var e="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
window.__second_open__?b.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
-1==t.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e;
}),f(),v(),y.tap(document.getElementById("js_hotspot_area"),function(e){
if(l.hasClass(e.target,"js_hotspot")){
var t=e.target.dataset.id;
if(!t)return;
t="https://search.weixin.qq.com/cgi-bin/searchweb/clientjump?scene=306&tag=mp_topic&topic_id="+t+"#wechat_redirect",
-1!=navigator.userAgent.indexOf("MicroMessenger")&&(h.isIOS||h.isAndroid||h.isWp)?b.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}):location.href=t;
}
}),e("appmsg/report_and_source.js"),function(){
if(Z){
document.title=window.msg_title.htmlDecode(),l.addClass(F,"not_in_mm");
var e=document.getElementById("js_pc_qr_code_img");
if(e){
var t=10000004,o=document.referrer;
if(0==o.indexOf("http://weixin.sogou.com")?t=10000001:0==o.indexOf("https://wx.qq.com")&&(t=10000003),
window.isSg)e.setAttribute("src",sg_qr_code.htmlDecode());else{
e.setAttribute("src","/mp/qrcode?scene="+t+"&size=102&__biz="+biz+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&send_time="+send_time);
var n=new Image;
n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+t+"&r="+Math.random();
}
document.getElementById("js_pc_qr_code").style.display="block";
}
var i=document.getElementById("js_profile_qrcode"),a=document.getElementById("js_profile_arrow_wrp"),r=document.getElementById("profileBt");
if(i&&r&&a){
var s=function(){
var e=10000005,t=document.referrer;
0==t.indexOf("http://weixin.sogou.com")?e=10000006:0==t.indexOf("https://wx.qq.com")&&(e=10000007);
var o=document.getElementById("js_profile_qrcode_img");
if(o)if(window.isSg)o.setAttribute("src",sg_qr_code.htmlDecode());else{
o.setAttribute("src","/mp/qrcode?scene="+e+"&size=102&__biz="+biz+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&send_time="+send_time);
var n=new Image;
n.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+e+"&r="+Math.random();
}
return i.style.display="block",a.style.left=r.offsetWidth/2-8+"px",!1;
};
y.on(r,"click",s),y.on(i,"click",s),y.on(document,"click",function(e){
var t=e.target||e.srcElement;
t!=r&&t!=i&&(i.style.display="none");
});
}
}else{
var d=document.getElementById("js_report_article3");
!!d&&(d.style.display="");
}
}(),function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=document.getElementById("img-content");
if(e&&t&&t.getBoundingClientRect){
var o=t.getBoundingClientRect().height;
window.scrollTo(0,o);
}
}(),e("appmsg/report.js");
for(var t=document.getElementsByTagName("map"),o=0,n=t.length;n>o;++o)t[o].parentNode.removeChild(t[o]);
if(dt.card_pv_report(),Math.random()<.01)try{
var i="https://js.aq.qq.com/js/aq_common.js",a=document.createElement("script");
a.src=i;
var r=document.getElementsByTagName("head")[0];
r.appendChild(a);
}catch(s){}
var d=document.getElementById("js_close_temp");
y.on(d,"click",function(){
d.parentNode.parentNode.removeChild(d.parentNode),l.removeClass(document.getElementById("js_article"),"preview_appmsg");
});
},1e3),function(){
if(m.os.ios&&"onorientationchange"in window){
var e=[],t="onorientationchange"in window?"orientationchange":"resize",o=function(){
return 90===Math.abs(window.orientation)?1:2;
};
e.push({
ori:o(),
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
var n=(new Date).getHours();
y.on(window,t,function(){
var t=e.length-2,i=o();
if(q=+new Date,t>=0){
{
var a=e[t];
a.ori;
}
e[e.length-1].istouchmove||(n>=11&&17>=n&&window.__report(63),setTimeout(function(){
window.scrollTo(0,a.scroll);
},100));
}
e.push({
ori:i,
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
});
var i=document.getElementById("js_hotspot_area"),a=0===i.children.length;
y.on(window,"scroll",function(){
var t=e.length-1,n=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,r=+new Date;
if(-1!=q){
if(console.log("[横屏滚动检测]",r-q),500>r-q)return void(q=-1);
}else q=-1;
if(e[t].ori==o()&&(e[t].scroll=n,e[t].istouchmove=!0,!a)){
var s=k.getInnerHeight()+n;
i.offsetTop<s&&(a=!0,(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=59977_15_1");
}
});
}
}(),w("[Appmsg] href:"+location.href+"^^^ ua:"+window.navigator.userAgent),window.addEventListener?window.addEventListener("load",K,!1):window.attachEvent&&window.attachEvent("onload",K),
e(window.moon&&moon.clearSample?"appmsg/fereport_without_localstorage.js":"appmsg/fereport.js"),
function(){
window.addEventListener&&document.getElementsByTagName("body")[0].addEventListener("copy",function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_18_1",
h.isIOS&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_19_1"),
h.isAndroid&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_20_1");
},!1);
}(),function(){
window.__observer&&window.__observer_data&&e("biz_wap/safe/mutation_observer_report.js");
}(),"undefined"!=typeof isSg&&e("sougou/index.js"),setTimeout(function(){
for(var e=function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_49_1&lc=1&log0=[28307_49_appmsg_fe_filter]"+encodeURIComponent(location.href);
},t=(window.appmsg_fe_filter||"").split(","),o=function(t,o){
try{
if(!t)return;
if(t.querySelectorAll){
var n=t.querySelectorAll("*["+o+"]");
if(n&&n.length>0){
e();
for(var i=0;i<n.length;++i)n[i]&&n[i].removeAttribute&&n[i].removeAttribute(o);
}
return;
}
var a=t.childNodes;
if(t.hasAttribute&&t.hasAttribute(o)&&e(),t.removeAttribute&&t.removeAttribute(o),
a&&a.length)for(var i=0;i<a.length;++i)filterContenteditable(a[i]);
}catch(r){}
},n=document.getElementById("js_content"),i=0;i<t.length;++i)t[i]&&o(n,t[i]);
},0),setTimeout(function(){
var e=999,t=636,o="http://mmbiz.qpic.cn/mmbiz_png/7lG1x2vpicdic0p5bBthpD9lsJcINicsSzd6uKQQJyoj5oTl8lFIs9K0fIibgxCzms0enDLTRxTHLpDPCLpSvIExiag/0",n=(new Date).getHours();
if(!(11>n||n>16||Math.random()<.99)){
var i=new Image;
i.onload=function(){
var o=i.naturalWidth||i.width,n=i.naturalHeight||i.height;
(o!=e||n!=t)&&window.__addIdKeyReport("28307","wifi"===window.networkType?120:123),
window.__addIdKeyReport("28307","wifi"===window.networkType?121:124);
},i.src=o;
var a=new Image;
a.onload=function(){
var o=a.naturalWidth||a.width,n=a.naturalHeight||a.height;
(o!=e||n!=t)&&window.__addIdKeyReport("28307",126),window.__addIdKeyReport("28307",127);
},a.src="https://mmbiz.qpic.cn/mmbiz_png/7lG1x2vpicdic0p5bBthpD9lsJcINicsSzd6uKQQJyoj5oTl8lFIs9K0fIibgxCzms0enDLTRxTHLpDPCLpSvIExiag/0";
}
},3e3);
var ut=Math.random();
if(2e-4>ut)try{
for(var ft=document.getElementsByTagName("img"),ht=window.screen.height,vt=window.screen.width,yt=0,bt=window.devicePixelRatio,yt="",P=0,At=ft.length;At>P;P++){
var jt=ft[P].getAttribute("data-src");
if(jt){
var It=ft[P].getBoundingClientRect();
yt+=vt+"|"+ht+"|"+It.left.toFixed(2)+"|"+(vt-It.right).toFixed(2)+"|"+It.width.toFixed(2)+"|"+bt.toFixed(2)+"|"+jt+";";
}
}
g({
url:"/mp/wapreport?action=img_display_report",
data:{
key:yt
},
type:"POST",
dataType:"json",
async:!0
});
}catch(U){}
}
var r=e("biz_common/tmpl.js"),s=e("cps/tpl/banner_tpl.html.js"),d=e("cps/tpl/card_tpl.html.js"),p=e("cps/tpl/list_tpl.html.js");
e("biz_common/utils/string/html.js");
var c=e("appmsg/weapp_common.js"),m=e("biz_wap/utils/device.js"),l=e("biz_common/dom/class.js"),w=e("appmsg/log.js"),g=e("biz_wap/utils/ajax.js"),_=e("biz_common/dom/attr.js"),u=_.setProperty,f=e("appmsg/max_age.js"),h=e("biz_wap/utils/mmversion.js"),v=e("appmsg/test.js"),y=e("biz_common/dom/event.js"),b=e("biz_wap/jsapi/core.js"),A=e("biz_common/moment.js"),j=e("appmsg/appmsg_report.js"),I=e("biz_common/utils/url/parse.js"),x=e("a/mpAdAsync.js"),E=e("biz_wap/utils/wapsdk.js"),k=e("common/utils.js"),z=e("complain/localstorage.js"),R=e("appmsg/popup_report.js"),q=-1;
window.new_appmsg&&(e("page/appmsg_new/combo.css"),e("page/appmsg_new/not_in_mm.css")),
e("appmsg/finance_communicate.js");
var B=window.user_uin||0,T=Math.floor(B/100)%1e3,O=0!==B&&1001>T,C=!0,S="",N=5;
if(window.logs.pagetime.jsapi_ready_time=+new Date,window.logs.idkeys={},console.info("[图文信息] 三元组:",window.biz,window.mid,window.idx),
console.info("[用户信息] 设备信息: 是否安卓",m.os.android,"是否IOS",m.os.ios,"是否秒开场景",window.__second_open__,"系统版本",m.os.version,"用户uin",window.user_uin),
w("[Appmsg] start run index.js init"),function(){
var e=(new Date).getHours(),t=function(e,t){
t=t||"",window.isSg?(t=["uin:sougou","resp:"+t].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+t+"&r="+Math.random()+"&from=sougou"):(t=["uin:"+window.user_uin,"resp:"+t].join("|"),
(new Image).src="/mp/jsreport?key="+e+"&content="+t+"&r="+Math.random());
},o=function(e,t,o){
var n=e+"_"+t;
o=o||1,window.logs.idkeys[n]||(window.logs.idkeys[n]={
val:0
}),window.logs.idkeys[n].val+=o;
},n=e>=11&&17>=e&&Math.random()<1,i=function(e,o){
n&&t(e,o);
};
window.__report=t,window.__commonVideoReport=i,window.__addIdKeyReport=o;
}(),a(),!window.__second_open__){
var M=window.performance||window.msPerformance||window.webkitPerformance;
if(!M||!M.timing)return;
var K=window.location.protocol;
E.saveSpeeds({
uin:uin,
pid:"https:"==K?462:417,
speeds:{
sid:34,
time:Date.now()-window.performance.timing.navigationStart
}
}),E.send();
}
var D=!1;
});