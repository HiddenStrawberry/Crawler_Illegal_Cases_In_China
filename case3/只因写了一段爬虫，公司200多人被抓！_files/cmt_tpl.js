define("biz_common/dom/offset.js",[],function(){
"use strict";
function f(f){
if(!f)return{};
for(var t=0,e=0,o=parseInt(document.body.style.marginTop,10)||0;f.offsetParent;)t+=f.offsetTop,
e+=f.offsetLeft,f=f.offsetParent;
return{
offsetTop:t>o?t-o:t,
offsetLeft:e
};
}
return{
getOffset:f
};
});define("a/video.js",["biz_common/dom/event.js","biz_common/utils/report.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","a/a_report.js","biz_common/utils/url/parse.js","new_video/player.js","biz_wap/utils/ajax.js","biz_wap/utils/device.js","common/utils.js"],function(e){
"use strict";
function t(e,t){
d("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t);
}
function o(){
l({
url:" /mp/ad_video_report?action=video_play_report",
data:window.__video_report_data,
type:"POST"
});
}
function i(e,t,o){
var i;
return function(){
var r=this,a=arguments,d=function(){
i=null,o||e.apply(r,a);
},n=o&&!i;
clearTimeout(i),i=setTimeout(d,t),n&&e.apply(r,a);
};
}
function r(e){
var r=document.getElementById("js_video_container");
e.videoContainer&&(r=e.videoContainer);
var d=null,_=e.rl||"",l="";
if(_){
_=_.split("?"),_=_.length>1?_[1]:"";
var f=new RegExp("(^|&)viewid=([^&]*)(&|$)","i"),v=_.match(f);
v&&(l=unescape(v[2]));
}
window.__video_report_data={
aid:e.aid,
traceid:e.traceid,
user_uin:window.user_uin,
appmsg_id:mid,
item_idx:idx,
viewid:l,
__biz:biz,
report_type:0,
play_type:0,
play_duration:0,
video_duration:0,
auto_play:1
};
var y=null,g=!0,h=!1;
if(n.isAndroid&&n.gtVersion("6.6.6",!0)&&(h=!0),r){
d=new p({
container:r,
cover:e.video_info.thumbUrl,
width:r.offsetWidth,
height:r.offsetWidth*parseInt(e.video_info.displayHeight)/parseInt(e.video_info.displayWidth),
muted:g,
ad_muted_btn:g,
always_hide_loading:!0,
src:e.video_info.videoUrl,
pt:e.pt,
autoHide:!0,
blockTouchVideo:!0,
notPauseOtherVideoWhenPlay:!0,
onError:function(o){
console.log("播放出错",o),t(129,e.report_param),r.innerHTML='<span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url('+e.video_info.thumbUrl+"); height:"+s.clientWidth/1.77+'px;"></span>',
window.__video_report_data.play_type=3;
},
onEnd:function(){
t(130,e.report_param),window.__video_report_data.play_type=1,window.__video_report_data.play_duration=window.__video_report_data.video_duration,
window.__video_report_data.report_type=2,d.replay(),o();
},
onTimeupdate:function(e,t){
2==window.__video_report_data.report_type&&(window.__video_report_data.report_type=3,
o()),window.__video_report_data.play_type=2,window.__video_report_data.play_duration=1e3*t.currentTime,
window.__video_report_data.video_duration=1e3*d.__getDuration(),u||(window.__video_report_data.report_type=3,
o(),u=1);
}
}),d._showPlayer(),d.setSrc(e.video_info.videoUrl,"auto");
var j=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,b=i(function(){
if(3==window.__video_report_data.play_type)return void a.off(window,"scroll",b);
if(0!=window.__video_report_data.auto_play||0!=window.__video_report_data.play_type){
j=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
var o=m.getInnerHeight();
if(d.isPlay()&&(s.offsetTop>j+o-s.offsetHeight/2||s.offsetTop+s.offsetHeight/2<j))d.pause4outer();else if((!c||c&&c>9)&&!d.isPlay()&&w.canSupportAutoPlay&&!(s.offsetTop>j+o+s.offsetHeight/2||s.offsetTop+s.offsetHeight<j-s.offsetHeight/2)){
if(n.isAndroid&&!h)return;
if(window.no_vedio_ad&&1==window.no_vedio_ad)return;
0==window.__video_report_data.play_type&&1==window.__video_report_data.auto_play?(t(131,e.report_param),
n.isIOS&&d.triggerMuted(g),d._trigger("beginPlay")):d.play4outer();
}
}
},500);
a.on(window,"scroll",b),b(),y=function(){
window.setTimeout(function(){
d.triggerMuted(g);
},1e3);
},this.adPlayer=d;
}
a.on(document.getElementById("js_video_container"),"tap",function(o){
if(o.target.className.indexOf("js_muted_btn")>-1)"true"==d.video.getAttribute("muted")?(d.triggerMuted(!1),
g=!1):(d.triggerMuted(!0),g=!0),t(132,e.report_param);else if(!d.isPlay())return d.__beginPlayHandler(),
d.triggerMuted(!0),t(133,e.report_param),void(window.__video_report_data.play_type=2);
}),a.on(window,"resize",function(){
setTimeout(function(){
var t=(s.clientWidth,r.offsetWidth),o=r.offsetWidth*parseInt(e.video_info.displayHeight)/parseInt(e.video_info.displayWidth);
d.setHeight(o),d.setWidth(t),s.style.width=t,s.style.height=o;
},0);
});
}
var a=e("biz_common/dom/event.js"),d=e("biz_common/utils/report.js"),n=(e("biz_wap/jsapi/core.js"),
e("biz_wap/utils/mmversion.js")),_=e("a/a_report.js"),p=(e("biz_common/utils/url/parse.js"),
e("new_video/player.js")),s=(_.AdClickReport,e("biz_common/utils/url/parse.js"),
document.getElementById("js_bottom_ad_area")),l=e("biz_wap/utils/ajax.js"),u=!1,w=e("biz_wap/utils/device.js"),m=e("common/utils.js"),c=m.getIosMainVersion();
return r;
});define("a/tpl/crt_tpl_manager.js",["a/tpl/crt_size_map.js","biz_common/tmpl.js","a/tpl/mpda_bottom_tpl.html.js","a/a_config.js","biz_wap/jsapi/core.js"],function(t){
"use strict";
function r(t,r,a,e){
this.crtSize=t,this.data=r,this.crtData=i(t,r),this.wrapper=a,this.extra=e,this.isInitAppStatus=!1,
this.updateData=function(t){
this.data=t,this.extra&&this.extra.customUpdataFunc?this.extra.customUpdataFunc(this.wrapper,this.data):o(this.crtSize,this.data,this.wrapper);
},this.getData=function(){
return this.data;
},this.getCrtData=function(){
return this.crtData;
},this.getWrapperElm=function(){
return this.wrapper;
};
var n=o(this.crtSize,this.data,this.wrapper);
this.extra&&this.extra.afterRenderFunc&&this.extra.afterRenderFunc(this.wrapper,this.data),
p[t]&&p[t].afterRender&&p[t].afterRender(n,this.wrapper);
}
function a(t,r){
var a,e,i;
if(!p[t])return console.error("[广告渲染失败]发现未见过的crt_size:",t),!1;
if(p[t].multiLogic)for(var n=0;n<p[t].multiLogic.length;n++)if(e=p[t].multiLogic[n],
e.selection){
i=!0;
for(var s in e.selection)e.selection[s]!=r[s]&&(i=!1);
if(i){
a=e;
break;
}
}else console.error("crt multiLogic need a selection param"),a=!1;else a=p[t];
return a;
}
function e(t,r){
var e=!1,i=a(t,r);
return i&&i.tpl&&(e=i.tpl),e;
}
function i(t,r){
var e={},i=a(t,r);
return i&&i.renderData&&(e=i.renderData),e;
}
function n(t,r,e){
var i=a(t,r);
if(i&&i.paramsAlias)for(var n in i.paramsAlias)e[n]=e[i.paramsAlias[n]];
return e;
}
function s(t,r,e){
var i=a(t,r);
return i&&i.paramsPreHandler&&(e=i.paramsPreHandler(e)),e;
}
function o(t,r,a){
var o=e(t,r),p=c(r,i(t,r)),f="";
if(p=n(t,r,p),p=s(t,r,p),console.log("crt final render data",p),!o)return console.error("[广告渲染失败] 模版找不到",t),
"";
try{
f=l.tmpl(o,p);
}catch(m){
console.error("[广告渲染失败] 编译模版失败",t,r,p,o),console.log(m);
}
return p.pos_type==h.AD_POS.POS_BOTTOM&&(f=l.tmpl(u,{
adTpl:f
})),console.log("[广告渲染完成] crtSize: ",t,"渲染数据：",p),a.innerHTML=f,p;
}
function c(t,r){
for(var a in r)t[a]=r[a];
return t;
}
{
var p=t("a/tpl/crt_size_map.js"),l=t("biz_common/tmpl.js"),u=t("a/tpl/mpda_bottom_tpl.html.js"),h=t("a/a_config.js");
t("biz_wap/jsapi/core.js");
}
return{
renderAdData:o,
createCrtObject:r,
CRT_CONF:p
};
});define("a/cpc_a_tpl.html.js",[],function(){
return'<!--有title “广告”，去掉 class appmsg_card_context。没有title “广告”，加class appmsg_card_context-->\n<div id="js_cpc_area"  class="js_ad_link  <# if(exp_obj.icon_pos != \'left\' && exp_obj.icon_pos != \'right\'){ #> appmsg_card_context <# } #> appmsg_card_active mpda_cpc_context pages_reset" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n    <!--有文字 "广告"-->\n    <# if(exp_obj.icon_pos == \'left\'){ #>\n    <div class="appmsg_card_hd mpda_cpc_hd">\n      <!--"广告" 居左-->\n      <div class="mpda_cpc_title mpda_cpc_title_left mpad_more_cps_left_container js_ad_opt_list_btn_<#=pos_type#>">广告\n        <!--投诉入口 begin-->\n        <div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>>\n                <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                    </ul>\n        </div>\n        <!--投诉入口 end-->\n        </div>\n    </div>\n    <# } else if(exp_obj.icon_pos == \'right\'){ #>\n    <div class="appmsg_card_hd mpda_cpc_hd">\n      <!--"广告" 居右-->\n      <div class="mpda_cpc_title mpda_cpc_title_right mpad_more_cps_right_container js_ad_opt_list_btn_<#=pos_type#>">广告\n        <!--投诉入口 begin-->\n        <div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>>\n                <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                    </ul>\n        </div>\n        \n        <!--投诉入口 end-->\n      </div>\n    </div>\n    <# } #>\n    <div class="mpda_cpc_inner">\n      <div class="appmsg_card_bd mpda_cpc_bd" style="background-image:url(<#=image_url#>)"></div>\n\n      <div class="appmsg_card_ft mpda_cpc_ft <# if(!exp_obj.price){ #> single<# } #>" style="z-index: 2;">\n          <# if(exp_obj.icon_pos == \'left\' || exp_obj.icon_pos == \'right\'){ #>\n\n          <# } else { #>\n          <span class="dropdown_opr_tips mpad_more_innertips_container js_ad_opt_list_btn_<#=pos_type#>">\n              广告\n                <!--投诉入口 begin-->\n                <div href="javascript:;" class="mpad_more js_mpad_more" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>>\n                    <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                    </ul>\n                </div>\n                <!--投诉入口 end-->\n              <!--<span class="dropdown_opr_popover"></span>-->\n          </span>\n          <# } #>\n          <!--title 金额-->\n\n          <# if(!!exp_obj.sale_text){ #>\n          <span class="appmsg_card_msg">\n              <span class="appmsg_card_msg_title">\n                  <#=exp_obj.sale_text#>\n              </span>\n              <# if(!!exp_obj.price){ #>\n              <span class="appmsg_card_msg_supp price">\n                  ¥<#=exp_obj.price#>\n              </span>\n              <# } #>\n          </span>\n          <# } #>\n\n          <# if(dest_type == 9){ #>\n            <a href="javascript:void(0);" class="appmsg_card_btn wx_min_plain_btn ba_btn btn_progress">\n                <!-- 新广告协议逻辑跳转canvas不带id -->\n                <#=exp_obj.btn_text#>\n            </a>  \n          <# }else if(dest_type == 6){#>\n            <a href="javascript:void(0);" class="appmsg_card_btn">\n              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt="">\n              <#=exp_obj.btn_text#>\n            </a>\n          <# }else{ #>\n            <a href="javascript:void(0);" class="appmsg_card_btn wx_min_plain_btn ba_btn btn_progress" id="js_ad_btn_<#=pos_type#>">\n                  <!-- 新广告协议逻辑 -->\n                  <#=exp_obj.btn_text#>\n              </a> \n          <# } #>\n        </div>\n    </div>\n</div>';
});define("a/sponsor_a_tpl.html.js",[],function(){
return'<!--sponsor广告-->\n<div class="ct_mpda_area mpda_sponsor <#if(window.new_appmsg){#>appmsg_card_context<# } #>" id="js_ad_area">\n    <div class="ct_mpda_placeholder">\n        <p class="ct_mpda_tips">广告，也可以是生活的一部分</p>\n    </div>\n    <div class="ct_mpda_inner js_ad_link" id="js_ad_inner" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>" data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <div class="ct_mpda_hd">\n            <# if(pt==108 || pt==109 || pt==110){ #>\n            <span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url(<#=image_url#>)"></span>\n            <# }else if(pt==116 || pt==117){ #>\n            <div id="js_video_container"></div>\n            <# }else{ #>\n            <span class="ct_mpda_main_img img_bg_cover" id="js_main_img" style="background-image:url(<#=image_url#>)"></span>\n            <# } #>\n        </div>\n        <div class="ct_mpda_bd" id="js_ad_message">\n            <span class="ct_mpda_logo img_bg_cover" style="background-image:url(<#=biz_info.head_img#>)"></span>\n            <div class="ct_mpda_desc_box">\n                <p class="ct_mpda_title"><#=biz_info.nick_name#></p>\n                <div class="ct_mpda_details mpad_more_innerdetail_container" id="js_ad_detail">提供的广告                    <!--<a class="ct_mpda_btn_about" id="js_btn_about">关于广告</a>\n                    <a class="ct_mpda_btn_about" id="js_btn_complain">投诉</a>-->\n                    <ul id="js_sponsor_opt_list" class="mpad_more_list" style="display: none">\n                        <li class="mpad_more_list_ele" id="js_btn_about">\n                            <a class="mpad_more_list_ele_container js_opt_item">关于广告</a>\n                        </li>\n                        <li class="mpad_more_list_ele" id="js_btn_complain" style="display: none">\n                            <a class="mpad_more_list_ele_container js_opt_item">投诉</a>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <# if(dest_type==6){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">\n                <i class="icon26_weapp_blue"></i>\n                <# if(product_type==46) {#>\n                    进入小游戏                <# }else{ #>\n                    查看详情                <# } #>\n            </a>\n            <# }else if(dest_type==9){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">查看详情</a>\n            <# }else if(product_type==46){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">进入小游戏</a>\n            <# }else if(pt== 108||pt==116){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">查看详情</a>\n            <# }else if(pt==109){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">下载应用</a>\n            <# }else if(pt==110||pt==117){ #>\n            <a class="ct_mpda_btn_more mpda_sponsor_btn" id="js_ad_more">了解公众号</a>\n            <# } #>\n            \n        </div>\n    </div>\n</div>\n';
});define("a/a_tpl.html.js",[],function(){
return'<div class="rich_media_extra" id="gdt_area">\n    <# if(pos_type==0){ #>\n        <#if(window.new_appmsg){#>\n        <div class="weui-loadmore weui-loadmore_line mod_title_context_primary mpad_more_container">\n            <span class="weui-loadmore__tips js_ad_opt_list_btn_<#=pos_type#>">广告                <!--投诉入口 begin-->\n                <div class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="display:none"<#}#>>\n                    <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                            <li class="mpad_more_list_ele">\n                                <a class="mpad_more_list_ele_container  js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                            </li>\n                    </ul>\n                </div>\n                <!--投诉入口 end-->\n            </span>\n        </div>\n        <#}else{#>\n        <div class="rich_tips with_line title_tips mpad_more_center_container">\n            <span class="tips js_ad_opt_list_btn_<#=pos_type#>">广告</span>\n            <!--投诉入口 begin-->\n            <div class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(window.can_see_complaint)){ #>style="visibility:hidden"<#}#>">\n                <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                </ul>\n            </div>\n            <!--投诉入口 end-->\n        </div>\n        <# } #>\n    <# } #>\n    <div class="js_ad_link extra_link <# if(pt==107){ #>preview_img_primary<# } #>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <# if(!use_new_protocol){ #>\n            <# if(pt==1){ #>\n                <#=hint_txt#>\n                <img class="icon_arrow_gray" src="<%@GetResFullName($images_path$icon/common/icon_arrow_gray.png)%>">\n                <img class="icon_loading_white icon_after" style="display:none;" id="loading_<#=traceid#>" src="<%@GetResFullName($images_path$icon/common/icon_loading_white.gif)%>">\n            <!-- 以下几个都是底部图片广告 -->\n            <# } else if (pt === 2 || pt === 107 || pt === 119 || pt === 139) { #>\n                <!--第三方logo-->\n                <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n                    <div class="brand_logo"><img data-src="<#=logo#>" alt="logo图片" class="js_alazy_img"></div>\n                <# } #>\n                <img class="appmsg_banner js_alazy_img" data-src="<#=image_url#>">\n                <# if(watermark_type!=0){ #>\n                    <i class="promotion_tag" id="js_promotion_tag">\n                    <# if(pt==119){ #>\n                    <span class="icon26_weapp_white"></span>\n                    <# } #>\n\n                    <# if(watermark_type==1){ #>\n                        商品推广\n                    <# }else if (watermark_type==2){ #>\n                        活动推广\n                    <# }else if (watermark_type==3){ #>\n                        <#=longAppBtnText#>\n                    <# }else if (watermark_type==7){ #>\n                        小游戏推广\n                    <# }else if (watermark_type==8){ #>\n                        进入小游戏\n                    <# } #>\n                    </i>\n                <# } #>\n            <# }else if(pt==7||pt==120){ #>\n            <!-- 图文 -->\n            <div class="preview_group preview_card">\n                <div class="preview_group_inner card_inner">\n                    <div class="preview_group_info">\n                        <strong class="preview_group_title2"><#=hint_txt#></strong>\n                        <div class="preview_group_desc"><#=ad_desc#></div>\n                        <img data-src="<#=image_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                    <i class="promotion_tag">\n                        <# if(pt==120){ #>\n                        <span class="icon26_weapp_white"></span>\n                        <# } #>\n\n                        <# if (watermark_type==7){ #>\n                            小游戏推广\n                        <# }else if (watermark_type==8){ #>\n                            进入小游戏\n                        <# }else{ #>\n                            活动推广\n                        <# } #>\n                    </i>\n                </div>\n            </div>\n            <# }else if(pt==115){ #>\n            <div class="preview_group mod_follow_with_img">\n                <div class="wx_flex_layout">\n                    <div class="wx_flex_bd">\n                        <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                    </div>\n                    <div class="wx_flex_ft">\n                        <span class="radius_avatar"><img data-src="<#=biz_info.head_img#>" alt="" class="js_alazy_img"></span>\n                        <strong class="fwi_nickname"><#=biz_info.nick_name#></strong>\n                        <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn">查看</a>\n                        <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="wx_min_plain_btn primary js_ad_btn" style="z-index: 2;">关注</a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==100){ #>\n            <div class="preview_group follow <# if(!!biz_info.show_comm_attention_num){ #>with_tips<# } #>">\n                <div class="preview_group_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=biz_info.nick_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <# if(!!biz_info.show_comm_attention_num){ #>\n                        <div class="preview_group_desc weak_tips">有<#=biz_info.comm_attention_num#>个好友关注</div>\n                        <# } #>\n                        <# if(!!biz_info.head_img){ #>\n                        <img data-src="<#=biz_info.head_img#>" alt="" class="preview_group_avatar br_radius js_alazy_img" >\n                        <# }else{ #>\n                        <img class="preview_group_avatar br_radius" src="http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0" alt="<#=biz_info.nick_name#>" >\n                        <# } #>\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_view_profile_<#=pos_type#>" <# if(biz_info.is_subscribed == 0){ #>style="display:none"<# } #> class="btn btn_inline btn_primary btn_line js_ad_btn">查看</a>\n                        <a id="js_add_contact_<#=pos_type#>" data-url="<#=url#>" data-type="<#=type#>" data-tid="<#=traceid#>" data-rl="<#=rl#>" <# if(biz_info.is_subscribed ==1){ #>style="display:none"<# } #> class="btn btn_inline btn_line  btn_primary js_ad_btn">关注</a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==102){ #>\n            <div class="preview_group">\n                <div class="preview_group_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <img data-src="<#=app_info.icon_url#>" alt="" class="preview_group_avatar br_radius js_alazy_img">\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn btn_download"><#=shortAppBtnText#></a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==101){ #>\n            <div class="preview_group preview_card">\n                <div class="preview_group_inner card_inner">\n                    <div class="preview_group_info append_btn">\n                        <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                        <div class="preview_group_desc"><#=hint_txt#></div>\n                        <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                    <div class="preview_group_opr">\n                        <a id="js_app_action_<#=pos_type#>" class="btn btn_inline btn_primary js_ad_btn"><#=shortAppBtnText#></a>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==103||pt==104){ #>\n            <div class="preview_group obvious_app">\n                <div class="preview_group_inner">\n                    <div class="pic_app">\n                        <img data-src="<#=image_url#>" alt="" class="js_alazy_img">\n                    </div>\n                    <div class="info_app">\n                        <p class="name_app"><#=app_info.app_name#></p>\n                        <# if(pt==103){ #>\n                        <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._category#></span><em>|</em><span class="compacity"><#=app_info._app_size#></span></p>\n                        <# } else if(pt==104){ #>\n                        <p class="profile_app" style="display:none;"><span class="fun_exp"><#=app_info._app_size#></span><em>|</em><span class="compacity"><#=app_info._down_count#></span></p>\n                        <# } #>\n                        <!--星级评分-->\n                        <p class="grade_app" id="js_app_rating_<#=pos_type#>">\n                            <!--\n                                半星：star_half\n                                一星：star_one\n                                一星半：star_one_half\n                                二星：star_two\n                                三星：star_three\n                                四星：star_four\n                                五星：star_five\n                            -->\n                            <span class="js_stars stars" style="display:none;"></span>\n                            <!--暂无评分\n                            <span class="scores">3.5</span>\n                            -->\n                            <span class="js_scores scores"></span>\n                        </p>\n                        <div class="dm_app">\n                            <a id="js_appdetail_action_<#=pos_type#>" class="ad_btn btn_download js_ad_btn"><#=shortAppBtnText#></a>\n                            <p class="extra_info">来自<# if(pt==103){ #>App Store<# }else{ #>腾讯应用宝<# } #></p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==105){ #>\n            <div class="mpda_card cardticket">\n                <div class="cardticket_hd cell">\n                    <div class="cell_hd">\n                        <span class="radius_avatar">\n                            <img class="avatar js_alazy_img" data-src="<#=card_info.card_logo_url#>" >\n                        </span>\n                    </div>\n                    <div class="cell_bd cell_primary"><#=card_info.card_title#></div>\n                    <div class="cell_ft">\n                        <a class="btn btn_plain_primary btn_inline js_ad_btn" id="js_card_action_<#=pos_type#>">领券</a>\n                    </div>\n                </div>\n                <div class="cardticket_ft">\n                    <div class="cardticket_theme"></div>\n                    <p class="cardticket_source tips_global"><#=card_info.card_brand_name#></p>\n                </div>\n            </div>\n            <# }else if(pt==106){ #>\n            <!-- 小店广告 -->\n            <div class="preview_group preview_card preview_shop_card">\n                <div class="preview_group_inner shop_card_inner">\n                    <div class="preview_group_info">\n                        <strong class="preview_shop_card_title"><#=mp_shop_info.name#></strong>\n                        <div class="preview_shop_card_desc">\n                            <span class="preview_card_desc_meta btn_plain_primary preview_shop_card_btn_buy js_ad_btn" id="js_shop_action_<#=pos_type#>">购买</span>\n                            <span class="preview_card_desc_meta preview_shop_card_oldprice">&yen;<#=mp_shop_info.ori_price/100#></span>\n                            <span class="preview_card_desc_meta preview_shop_card_price">&yen;<#=mp_shop_info.cur_price/100#></span>\n                        </div>\n                        <img data-src="<#=mp_shop_info.img#>" alt="" class="preview_card_avatar js_alazy_img">\n                    </div>\n                </div>\n            </div>\n            <# }else if(pt==111||pt==113||pt==112||pt==114){ #>\n            <!-- 背景高斯模糊带描述文字、带背景图的app下载 -->\n            <div class="preview_group download_app_with_desc js_download_app_card">\n                <div class="preview_group_inner" style="background-image:url(<#=image_url#>)">\n                    <div class="preview_group_hd">\n                        <div class="preview_group_hd_inner">\n                            <img data-src="<#=app_info.icon_url#>" alt="" class="preview_card_avatar js_alazy_img">\n                            <strong class="preview_group_title"><#=app_info.app_name#></strong>\n                            <a id="js_appdetail_action_<#=pos_type#>" class="preview_group_btn js_ad_btn"><#=shortAppBtnText#></a>\n                            <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">继续</a>\n                            <a id="js_app_action_<#=pos_type#>" class="preview_group_btn">打开</a> -->\n                            <!-- <a id="js_app_action_<#=pos_type#>" class="preview_group_btn with_processor"><i class="btn_processor" style="width:35%;"></i><span class="btn_processor_value">35%</span></a> -->\n                        </div>\n                    </div>\n                    <# if(pt==111||pt==113){ #>\n                    <div class="preview_group_bd">\n                        <div class="preview_group_desc"><#=hint_txt.split(\'|\')[0]#></div>\n                        <div class="preview_group_desc"><#=hint_txt.split(\'|\')[1] || ""#></div>\n                    </div>\n                    <div class="preview_group_ft"><div class="preview_group_download_info"><span class="download_size" ><#=app_info.app_size#></span>&nbsp;来自<# if(pt==111){ #>App Store<# }else{ #>腾讯应用宝<# } #></div></div>\n                    <# } #>\n                </div>\n            </div>\n            <# }else if(pt==122||pt==121){ #>\n            <!-- app下载类广告 -->\n            <!--117 新卡片 begin -->\n            <div class="preview_group mod_method117">\n                <div class="wx_flex_layout">\n                    <div class="wx_flex_bd">\n                        <img class="fwi_thumb js_alazy_img" data-src="<#=image_url#>" alt="">\n                    </div>\n                    <div class="wx_flex_ft">\n                        <span class="radius_avatar"><img data-src="<#=app_info.icon_url#>" alt="" class="js_alazy_img"></span>\n                        <strong class="fwi_nickname"><#=app_info.app_name#></strong>\n                        <a id="js_appdetail_action_<#=pos_type#>" class="wx_min_plain_btn primary js_ad_btn"><#=shortAppBtnText#></a>\n                        <!-- <a href="#" class="wx_min_plain_btn primary btn_progress">\n                            <span class="btn_progress_inner" style="width:37%;">\n                                <span class="btn_progress_bd" style="width:57px;">暂停</span>\n                            </span>\n                            暂停\n                        </a> -->\n                    </div>\n                </div>\n            </div>\n            <!--117 end-->\n            <!--互选广告 begin-->\n            <# } else if (pt === 125) { #>\n            <div class="da_area">\n              <div class="da_inner">\n                <!--广告头部-->\n                <div class="da_hd">\n                  <div class="da_video_area">\n                    <!--放视频-->\n                    <div id="js_video_container"></div>\n                  </div>\n                </div>\n                <!--广告信息-->\n                <div class="da_bd">\n                  <div class="da_brand_info">\n                    <span class="da_brand_info_hd" style="background-image:url(<#=biz_info.head_img#>)"></span>\n                    <div class="da_brand_info_content">\n                      <p class="da_brand_info_title"><#=biz_info.nick_name#></p>\n                    </div>\n                  </div>\n                  <a class="da_btn_more">\n                    <# if(dest_type==6){ #><span class="icon26_weapp_blue"></span><# } #>\n                    \n                    <# if (dest_type==9){ #>\n                        查看详情\n                    <# }else if (watermark_type==7){ #>\n                        小游戏推广\n                    <# }else if (watermark_type==8){ #>\n                        进入小游戏\n                    <# }else if (product_type==46){ #>\n                        进入小游戏\n                    <# }else{ #>\n                        查看详情\n                    <# } #>\n                </a>\n                </div>\n              </div>\n            </div>\n            <!--互选广告 end-->\n            <# } else if (pt === 140) { #>\n            <!--小banner信息广告-->\n            <div class="mpad_smallbanner_msg">\n                <div class="mpad_smallbanner_msg_inner">\n                    <div class="mpad_smallbanner_msg_hd" style="background: url(<#=shopImage.image_url#>) no-repeat left center; background-size: cover;">\n                    </div>\n                    <div class="mpad_smallbanner_msg_ft">\n                        <div class="mpad_smallbanner_msg_ft_hd">\n                            <strong class="mpad_smallbanner_msg_title"><#=hint_txt#></strong>\n                            <div class="mpad_smallbanner_msg_tags_container">\n                                <# shopImage.mp_tags && shopImage.mp_tags.forEach(function (value, idx) { #>\n                                <span class="mpad_smallbanner_msg_tag"><span class="mpad_smallbanner_msg_tag_inner"><#=value#></span></span>\n                                <# }); #>\n                            </div>\n                        </div>\n                        <span class="mpad_smallbanner_info_btn <# if(dest_type==6){ #>with_icon<# } #>" id="js_ad_btn_<#=pos_type#>">\n                            <# if (dest_type === 6) { #><img class="ic ic_weapp" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTUgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjMgKDUxMTY3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TbGljZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSIyMDE4LzAyLzIzLeWkmuaooeadv+WwneivleeovyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTEwLjc1LDEgQzkuOTIzMjUsMSA5LjE1MzUsMS4yMjc4ODg4OSA4LjUsMS42MTU0ODE0OCBDNy4zMDEyNSwyLjMyNjg4ODg5IDYuNSwzLjU4NDI5NjMgNi41LDUuMDE4NTE4NTIgTDYuNSwxMC45ODE0ODE1IEM2LjUsMTIuMDU1MzMzMyA1LjQ5MjUsMTIuOTI1OTI1OSA0LjI1LDEyLjkyNTkyNTkgQzMuMDA3MjUsMTIuOTI1OTI1OSAyLDEyLjA1NTMzMzMgMiwxMC45ODE0ODE1IEMyLDEwLjIxNzE4NTIgMi41MTE1LDkuNTU3ODg4ODkgMy4yNTM3NSw5LjI0MDAzNzA0IEMzLjMwNzI1LDkuMjE3MjIyMjIgMy4zNjE1LDkuMTk1NDQ0NDQgMy40MTcyNSw5LjE3NjI1OTI2IEMzLjg4NDUsOC45ODE4MTQ4MSA0LjI4NTI1LDguNjE2Nzc3NzggNC40MzQsOC4xOTI4ODg4OSBDNC42NTM3NSw3LjU2NzAzNzA0IDQuMjQ0NzUsNy4wNTk5MjU5MyAzLjUyMDc1LDcuMDU5OTI1OTMgQzMuMzQwMjUsNy4wNTk5MjU5MyAzLjE1NzI1LDcuMDkxNTU1NTYgMi45ODA3NSw3LjE0ODU5MjU5IEMyLjk4LDcuMTQ4ODUxODUgMi45NzkyNSw3LjE0OTExMTExIDIuOTc4MjUsNy4xNDkzNzAzNyBDMS45MzE1LDcuNDYxIDEuMDU3NzUsOC4xNDQ0MDc0MSAwLjUzMzI1LDkuMDM3MDM3MDQgQzAuMTk0NSw5LjYxMzg4ODg5IDAsMTAuMjc2Mjk2MyAwLDEwLjk4MTQ4MTUgQzAsMTMuMTk3MzcwNCAxLjkwNjUsMTUgNC4yNSwxNSBDNS4wNzY3NSwxNSA1Ljg0NjUsMTQuNzcyMTExMSA2LjUsMTQuMzg0NTE4NSBDNy42OTg3NSwxMy42NzMxMTExIDguNSwxMi40MTU3MDM3IDguNSwxMC45ODE0ODE1IEw4LjUsNS4wMTg1MTg1MiBDOC41LDMuOTQ0NjY2NjcgOS41MDcyNSwzLjA3NDA3NDA3IDEwLjc1LDMuMDc0MDc0MDcgQzExLjk5MjUsMy4wNzQwNzQwNyAxMywzLjk0NDY2NjY3IDEzLDUuMDE4NTE4NTIgQzEzLDUuODE1NDgxNDggMTIuNDQ1MjUsNi41MDA0NDQ0NCAxMS42NTEsNi44MDA2NjY2NyBDMTEuMTM4NzUsNi45Nzg3Nzc3OCAxMC43MTksNy4zNjMyNTkyNiAxMC41NTksNy44MTg3Nzc3OCBDMTAuMzQwNSw4LjQ0MTUxODUyIDEwLjc0NzUsOC45NDY1NTU1NiAxMS40NjgyNSw4Ljk0NjU1NTU2IEMxMS42MzE1LDguOTQ2NTU1NTYgMTEuNzk2NSw4LjkxNzUxODUyIDExLjk1NzI1LDguODcwMzMzMzMgQzExLjk4MzUsOC44NjI4MTQ4MSAxMi4wMDk1LDguODU0NTE4NTIgMTIuMDM1NSw4Ljg0NjQ4MTQ4IEMxMy4wNzYsOC41MzMwMzcwNCAxMy45NDQ1LDcuODUxNzAzNyAxNC40NjY1LDYuOTYyOTYyOTYgQzE0LjgwNTUsNi4zODYzNzAzNyAxNSw1LjcyMzcwMzcgMTUsNS4wMTg1MTg1MiBDMTUsMi44MDI2Mjk2MyAxMy4wOTM1LDEgMTAuNzUsMSIgaWQ9IlBhZ2UtMSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=" alt="小程序"><# } #><div class="mpad_smallbanner_info_btn_inner">去逛逛</div>\n                        </span>\n                        <!--hardcode 显示icon 用<span class="mpad_smallbanner_info_btn with_icon" id="js_ad_btn_<#=pos_type#>">\n                            <img class="ic ic_weapp" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTUgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjMgKDUxMTY3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TbGljZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSIyMDE4LzAyLzIzLeWkmuaooeadv+WwneivleeovyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTEwLjc1LDEgQzkuOTIzMjUsMSA5LjE1MzUsMS4yMjc4ODg4OSA4LjUsMS42MTU0ODE0OCBDNy4zMDEyNSwyLjMyNjg4ODg5IDYuNSwzLjU4NDI5NjMgNi41LDUuMDE4NTE4NTIgTDYuNSwxMC45ODE0ODE1IEM2LjUsMTIuMDU1MzMzMyA1LjQ5MjUsMTIuOTI1OTI1OSA0LjI1LDEyLjkyNTkyNTkgQzMuMDA3MjUsMTIuOTI1OTI1OSAyLDEyLjA1NTMzMzMgMiwxMC45ODE0ODE1IEMyLDEwLjIxNzE4NTIgMi41MTE1LDkuNTU3ODg4ODkgMy4yNTM3NSw5LjI0MDAzNzA0IEMzLjMwNzI1LDkuMjE3MjIyMjIgMy4zNjE1LDkuMTk1NDQ0NDQgMy40MTcyNSw5LjE3NjI1OTI2IEMzLjg4NDUsOC45ODE4MTQ4MSA0LjI4NTI1LDguNjE2Nzc3NzggNC40MzQsOC4xOTI4ODg4OSBDNC42NTM3NSw3LjU2NzAzNzA0IDQuMjQ0NzUsNy4wNTk5MjU5MyAzLjUyMDc1LDcuMDU5OTI1OTMgQzMuMzQwMjUsNy4wNTk5MjU5MyAzLjE1NzI1LDcuMDkxNTU1NTYgMi45ODA3NSw3LjE0ODU5MjU5IEMyLjk4LDcuMTQ4ODUxODUgMi45NzkyNSw3LjE0OTExMTExIDIuOTc4MjUsNy4xNDkzNzAzNyBDMS45MzE1LDcuNDYxIDEuMDU3NzUsOC4xNDQ0MDc0MSAwLjUzMzI1LDkuMDM3MDM3MDQgQzAuMTk0NSw5LjYxMzg4ODg5IDAsMTAuMjc2Mjk2MyAwLDEwLjk4MTQ4MTUgQzAsMTMuMTk3MzcwNCAxLjkwNjUsMTUgNC4yNSwxNSBDNS4wNzY3NSwxNSA1Ljg0NjUsMTQuNzcyMTExMSA2LjUsMTQuMzg0NTE4NSBDNy42OTg3NSwxMy42NzMxMTExIDguNSwxMi40MTU3MDM3IDguNSwxMC45ODE0ODE1IEw4LjUsNS4wMTg1MTg1MiBDOC41LDMuOTQ0NjY2NjcgOS41MDcyNSwzLjA3NDA3NDA3IDEwLjc1LDMuMDc0MDc0MDcgQzExLjk5MjUsMy4wNzQwNzQwNyAxMywzLjk0NDY2NjY3IDEzLDUuMDE4NTE4NTIgQzEzLDUuODE1NDgxNDggMTIuNDQ1MjUsNi41MDA0NDQ0NCAxMS42NTEsNi44MDA2NjY2NyBDMTEuMTM4NzUsNi45Nzg3Nzc3OCAxMC43MTksNy4zNjMyNTkyNiAxMC41NTksNy44MTg3Nzc3OCBDMTAuMzQwNSw4LjQ0MTUxODUyIDEwLjc0NzUsOC45NDY1NTU1NiAxMS40NjgyNSw4Ljk0NjU1NTU2IEMxMS42MzE1LDguOTQ2NTU1NTYgMTEuNzk2NSw4LjkxNzUxODUyIDExLjk1NzI1LDguODcwMzMzMzMgQzExLjk4MzUsOC44NjI4MTQ4MSAxMi4wMDk1LDguODU0NTE4NTIgMTIuMDM1NSw4Ljg0NjQ4MTQ4IEMxMy4wNzYsOC41MzMwMzcwNCAxMy45NDQ1LDcuODUxNzAzNyAxNC40NjY1LDYuOTYyOTYyOTYgQzE0LjgwNTUsNi4zODYzNzAzNyAxNSw1LjcyMzcwMzcgMTUsNS4wMTg1MTg1MiBDMTUsMi44MDI2Mjk2MyAxMy4wOTM1LDEgMTAuNzUsMSIgaWQ9IlBhZ2UtMSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=" alt="小程序"><div class="mpad_smallbanner_info_btn_inner">去逛逛</div>\n                        </span>-->\n                    </div>\n                </div>\n            </div>\n            <# } #>\n        <# }else{ #>\n            <!--新协议-->\n            <# if(material_type == 9){ #>\n            <!--视频-->\n            <div class="da_area">\n              <div class="da_inner">\n                <!--广告头部-->\n                <div class="da_hd">\n                  <div class="da_video_area">\n                    <!--放视频-->\n                    <div id="js_video_container"></div>\n                  </div>\n                </div>\n                <!--广告信息-->\n                <div class="da_bd">\n                  <div class="da_brand_info">\n                    <span class="da_brand_info_hd" style="background-image:url(<#=biz_info.head_img#>)"></span>\n                    <div class="da_brand_info_content">\n                      <p class="da_brand_info_title"><#=biz_info.nick_name#></p>\n                    </div>\n                  </div>\n                  <# if (product_type==12 || product_type==19){ #>\n                  <!--<a id="js_ad_btn_<#=pos_type#>" class="da_btn_more wx_min_plain_btn ba_btn btn_progress">立即下载</a>-->\n                  <a id="js_ad_btn_<#=pos_type#>" class="appmsg_card_btn wx_min_plain_btn ba_btn btn_progress"><#=longAppBtnText#></a>\n                  <# }else{ #>\n                  <a class="da_btn_more">查看详情</a>\n                  <# } #>\n                </div>\n              </div>\n            </div>\n            <# }else if(material_type == 2){ #>\n            <!--图片-->\n                <# if (logo.indexOf("http://mmsns.qpic.cn/") == 0){ #>\n                    <div class="brand_logo"><img data-src="<#=logo#>" alt="logo图片" class="js_alazy_img"></div>\n                <# } #>\n                    <img class="appmsg_banner js_alazy_img" data-src="<#=image_url#>">\n                    <i class="promotion_tag" id="js_promotion_tag">\n                    <# if(dest_type==6){ #>\n                    <span class="icon26_weapp_white"></span>\n                    <# } #>\n\n                    <# if (product_type==12 || product_type==19){ #>\n                        <#=longAppBtnText#>\n                    <# } #>\n                    </i>\n            <# } #>\n        <# } #>\n    </div>\n</div>';
});define("a/mpshop.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","biz_wap/utils/openUrl.js"],function(t){
"use strict";
function e(t,e){
s("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+t+e.report_param);
}
function i(t){
var i=t.adData,s=t.pos_type||0,a=i.tid,l=i.type,m=(i.adid,i.outer_id),c=i.url,j=i.rl,u={};
t.report_param=t.report_param||"";
var d=t.btn;
if(d){
o.on(d,"click",function(i){
if(!u[a]){
u[a]=!0;
var o,d,b,z,f=!!i&&i.target;
f&&(o=p.getX(f,"js_ad_link")+i.offsetX,d=p.getY(f,"js_ad_link")+i.offsetY,b=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
z=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
n({
type:l,
report_type:2,
click_pos:0,
url:encodeURIComponent(c),
tid:a,
rl:encodeURIComponent(j),
__biz:biz,
pos_type:s,
pt:106,
pos_x:o,
pos_y:d,
ad_w:b||0,
ad_h:z||0
},function(){
u[a]=!1,e(61,t),_(r.join(c,{
outer_id:m
}));
});
}
return!1;
});
}
}
var o=t("biz_common/dom/event.js"),s=t("biz_common/utils/report.js"),a=t("a/a_report.js"),n=a.AdClickReport,p=(t("biz_wap/utils/ajax.js"),
t("biz_wap/utils/position.js")),r=(t("biz_wap/jsapi/core.js"),t("biz_common/utils/url/parse.js")),_=t("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
return i;
});define("a/wxopen_card.js",["biz_wap/jsapi/core.js","biz_common/utils/report.js","biz_wap/utils/mmversion.js","biz_common/utils/monitor.js","biz_wap/utils/openUrl.js"],function(e){
"use strict";
function i(e,i){
c("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+i);
}
function t(e){
var t=e.url||"";
t=t.replace(/&amp;/g,"&");
var n=t.indexOf("?"),c=0;
(119==e.pt||120==e.pt)&&(c=2),e.report_param="&tid="+e.traceid+"&ticket="+e.ticket+"&aid="+e.aid,
t.indexOf("?")>=0?t=t.slice(0,n)+".html"+t.slice(n):t+=".html";
var _="",l="";
if(document.getElementsByTagName("mpcpc")[0]&&document.getElementsByTagName("mpcpc")[0].dataset&&(_=document.getElementsByTagName("mpcpc")[0].dataset.category_id_list),
"undefined"==typeof w){
var w;
w=window.cgiData&&window.cgiData.__biz?window.cgiData.__biz:window.parent.biz;
}
l=e.traceid+":"+_+":"+w+":"+e.aid+":"+e.pos_type,console.log("sceneNote",l);
var g={
scene:1067,
sceneNote:l,
userName:e.weapp_info.original_id+"@app",
relativeURL:t,
appVersion:1
},f=!1,v=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(v){
var b=Number(v[1]),j=Number(v[2]),z=Number(v[3]);
b>6?f=!0:6===b&&j>5?f=!0:6===b&&5===j&&z>=3&&(f=!0);
}
return console.log("canJumpOnTap : ",f,e.weapp_info.original_id,navigator.userAgent),
f?(u.setSum(110696,0,1),o?u.setSum(110696,3,1):(o=!0,a=+new Date),r?+new Date-r<2e3&&(u.setSum(110696,4,1),
setTimeout(function(){
r=0;
},2e3)):r=+new Date,p?+new Date-p<3e3&&(u.setSum(110696,5,1),setTimeout(function(){
p=0;
},3e3)):p=+new Date,s?+new Date-s<4e3&&(u.setSum(110696,6,1),setTimeout(function(){
s=0;
},4e3)):s=+new Date,void m.invoke("openWeApp",g,function(t){
var n=+new Date-a;
"openWeApp:ok"===t.err_msg&&i(125+c,e.report_param),"system:function_not_exist"===t.err_msg&&(d("https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect"),
i(126+c,e.report_param)),u.setAvg(110696,2,n).send(),o=!1;
})):(d("https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect"),
void i(126+c,e.report_param));
}
function n(e){
m.invoke("preloadMiniProgramContacts",{
userNames:[e.weapp_info.original_id+"@app"]
},function(){}),m.invoke("preloadMiniProgramEnv",{
userNames:[e.weapp_info.original_id+"@app"]
},function(){});
}
var o,a,r,p,s,m=e("biz_wap/jsapi/core.js"),c=e("biz_common/utils/report.js"),u=(e("biz_wap/utils/mmversion.js"),
e("biz_common/utils/monitor.js")),d=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
return{
openWxopen:t,
startConnect:n
};
});define("a/card.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","biz_wap/jsapi/core.js","biz_wap/jsapi/cardticket.js"],function(e,t,a,i){
"use strict";
function o(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function s(e){
var t=e.adData,a=e.pos_type||0,i=t.tid,r=t.type,p=t.url,d=t.rl,l={};
e.report_param=e.report_param||"";
var m=e.btn;
if(m){
n.on(m,"click",function(n){
if(!l[i]){
l[i]=!0;
var m,j,u,f,b=!!n&&n.target;
b&&(m=_.getX(b,"js_ad_link")+n.offsetX,j=_.getY(b,"js_ad_link")+n.offsetY,u=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
f=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
c({
type:r,
report_type:2,
click_pos:0,
url:encodeURIComponent(p),
tid:i,
rl:encodeURIComponent(d),
__biz:biz,
pos_type:a,
pt:105,
pos_x:m,
pos_y:j,
ad_w:u||0,
ad_h:f||0
},function(){
l[i]=!1,o(37,e),s.openCardDetail(t.card_id,t.card_ext,e);
});
}
return!1;
});
}
}
var n=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),p=e("a/a_report.js"),c=p.AdClickReport,_=(e("biz_wap/utils/ajax.js"),
e("biz_wap/utils/position.js")),d=(e("biz_wap/jsapi/core.js"),e("biz_wap/jsapi/cardticket.js"));
return s.openCardDetail=function(e,t,a){
d.openCardDetail({
card_id:e,
card_ext:t,
success:function(){
!!a&&o(38,a);
},
error:function(){
!!a&&o(39,a),i("调起卡券错误");
},
access_denied:function(){
!!a&&o(40,a),i("异常错误[access_denied]");
}
});
},s;
});define("biz_wap/utils/position.js",[],function(){
"use strict";
function e(t,f){
var s=t.offsetLeft;
if(t.offsetParent&&t.offsetParent.className){
var a=t.offsetParent.className;
-1==a.indexOf(f)&&(s+=e(t.offsetParent,f));
}
return s;
}
function t(e,f){
var s=e.offsetTop;
if(e.offsetParent&&e.offsetParent.className){
var a=e.offsetParent.className;
-1==a.indexOf(f)&&(s+=t(e.offsetParent,f));
}
return s;
}
return{
getX:e,
getY:t
};
});define("a/a_report.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","appmsg/log.js","a/a_sign.js","a/a_utils.js"],function(e){
"use strict";
function t(e,t){
var a="https:"==location.protocol?1500:1200,c=window.__report,u="/mp/advertisement_report?r="+Math.random()+"&ascene="+encodeURIComponent(window.ascene||-1)+"&",l=[],m=!1,w=!1;
for(var j in e)e.hasOwnProperty(j)&&l.push(j+"="+e[j]);
var f=2;
1==window.__ad_has_exposure&&(f=1),l.push("has_exposure="+f),u+=l.join("&");
var g="trace_id="+e.tid+"&product_type="+e.pt+"&jump_url="+e.url+"&logtype=3&url="+encodeURIComponent(location.href)+"&rl="+e.rl;
e.tid&&n.gtVersion("6.3.22",!0)&&s.invoke("adDataReport",{
ad_info:g,
need_record_page_operation:1
},function(){}),p("[Ad report] url="+u),2==f&&window.__addIdKeyReport("68064",0),
window.__ad_test_exposure||window.__addIdKeyReport("68064",7),d.createSign(e,function(r,s,n,d,l){
var j=u;
u+="&ad_sign_data="+r+"&ad_sign_k1="+s+"&ad_sign_k2="+n+"&ad_sign_md5="+d,p("[Ad click real report] url="+u),
c&&c(123),o({
url:u,
mayAbort:!0,
type:"GET",
success:function(e){
c&&c(56+i),p("[Ad report suc]"+e),w=!0;
},
error:function(e){
c&&c(57+i),p("[Ad report error]"+e.status+":"+e.responseText);
},
complete:function(){
m||(m=!0,!!t&&t()),p("[Ad report complete]");
},
async:!0
}),setTimeout(function(){
m||(m=!0,window.__ajaxtest="1",c&&c(112),!!t&&t(),p("[Ad report timeout complete]"));
},a),setTimeout(function(){
w||o({
url:u,
type:"GET",
success:function(e){
c&&c(113+i),p("[Ad report suc retry]"+e);
},
error:function(e,t){
c&&c(114+i),p("[Ad report error retry]"+e.status+":"+e.responseText),1==t.type?c&&c(115+i):2==t.type?c&&c(116+i):3==t.type&&c&&c(117+i),
p("[Ad report error detail]"+t.toString());
}
});
},2e3),_.reportUrlLength(r,s,n,d,l,e,j);
}),r(e);
}
function r(e){
var t={
biz_click_add:[{
clktime:parseInt(+new Date/1e3),
aid:parseInt(e.aid),
pos_type:parseInt(e.pos_type),
traceid:e.tid
}]
};
t=JSON.stringify(t),o({
url:"/mp/advertisement_report?action=extra_report&extra_data="+t+"&__biz="+biz,
type:"GET",
timeout:2e3,
success:function(e){
console.log(e);
}
});
}
var o=e("biz_wap/utils/ajax.js"),a=location.protocol,i="https:"==a?5:0,s=e("biz_wap/jsapi/core.js"),n=e("biz_wap/utils/mmversion.js"),p=e("appmsg/log.js"),d=e("a/a_sign.js"),_=e("a/a_utils.js");
return{
AdClickReport:t
};
});define("biz_wap/utils/show_time.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js"],function(t){
"use strict";
function i(){
try{
return JSON.parse(localStorage.getItem(d));
}catch(t){
return{};
}
}
function e(){
try{
localStorage.removeItem(d);
}catch(t){}
}
function n(t,e){
var n=i()||{};
n[t]={
traceid:l[t].info.traceid,
aid:+t,
staytime:e,
pos_type:l[t].info.pos_type
};
try{
localStorage.setItem(d,JSON.stringify(n));
}catch(o){}
}
function o(t){
var e=i()||{};
return e[t]?e[t].staytime:0;
}
function r(t,i){
var e=t.id||t.aid;
if(l[e]){
if(l[e].intervalId)return;
}else l[e]={};
l[e].intervalId=setInterval(function(){
var t=o(e);
n(e,t+f);
},f),i||(l[e].inViewport=!0,l[e].info=t);
}
function a(t,i){
l[t]&&l[t].intervalId&&(clearInterval(l[t].intervalId),l[t].intervalId=null,i||(l[t].inViewport=!1));
}
function s(){
window.__ajaxtest="2";
var t=i(),n={
biz_ad_exposure_time:[]
};
if(t&&!window.__second_open__){
for(var o in t)n.biz_ad_exposure_time.push(t[o]);
n.biz_ad_exposure_time.length&&(n=JSON.stringify(n),u({
url:"/mp/advertisement_report?action=extra_report&extra_data="+n+"&__biz="+biz,
type:"GET",
mayAbort:!0,
async:!1,
timeout:2e3,
success:function(){
e();
}
}));
}
}
function _(){
c.bindVisibilityChangeEvt(function(t){
for(var i in l)t?l[i].inViewport&&r({
id:i
},!0):a(i,!0);
}),c.on(window,"unload",s),c.on(window,"load",s);
}
var c=t("biz_common/dom/event.js"),u=t("biz_wap/utils/ajax.js"),d="__WXLS__AD_SHOW_TIME",l={},f=100;
return _(),{
startShow:r,
stopShow:a
};
});define("biz_common/utils/get_para_list.js",[],function(){
"use strict";
function r(r){
if(!r||1!==r.nodeType)return!1;
for(var n=0;n<r.children.length;n++)if(-1!==t.indexOf(r.children[n].tagName))return!0;
}
function n(r){
for(var n=0;n<a.length;n++)if(r.className.indexOf(a[n])>-1)return!0;
}
function e(t,a){
var u=t.children;
if(!u.length)return u;
for(var c,f=[],o=0;o<u.length;o++)c=u[o],i.indexOf(c.tagName)>-1||(r(c)&&!n(c)?(f=f.concat(e(c,a)),
a&&(c.isWrapper=!0,f.push(c))):f.push(c));
return f;
}
var t=["P","DIV","SECTION","LI","H1","H2","H3","H4","H5","H6","TABLE"],a=["js_product_container","js_blockquote_wrap"],i=["MPCHECKTEXT"];
return e.paragraphStartIdx=1e6,e;
});define("biz_wap/utils/openUrl.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
function r(e){
var r=document.createElement("a");
return r.href=e,{
source:e,
protocol:r.protocol.replace(":",""),
host:r.hostname,
port:r.port,
query:r.search,
params:function(){
for(var e,t={},a=r.search.replace(/^\?/,"").split("&"),o=a.length,n=0;o>n;n++)a[n]&&(e=a[n].split("="),
t[e[0]]=e[1]);
return t;
}(),
file:(r.pathname.match(/([^\/?#]+)$/i)||[,""])[1],
hash:r.hash.replace("#",""),
path:r.pathname.replace(/^([^\/])/,"/$1"),
relative:(r.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],
segments:r.pathname.replace(/^\//,"").split("/")
};
}
function t(e,t){
var o;
t=t||1,0==e.indexOf("/")&&(o=r(location.href),e=o.protocol+"://"+o.host+e,console.log("openUrlWithExtraWebview with relative path:",e)),
e=e.replace(/(#[^#]*)+/,function(e,r){
return r;
}),a.invoke("openUrlWithExtraWebview",{
url:e,
openType:t
},function(r){
-1==r.err_msg.indexOf("ok")&&(location.href=e);
});
}
var a=e("biz_wap/jsapi/core.js");
return{
openUrlWithExtraWebview:t
};
});define("a/a_sign.js",["biz_wap/jsapi/core.js","biz_common/jquery.md5.js"],function(e){
"use strict";
function n(e,n){
var o="";
if(e.beforeSign)o=e.beforeSign;else{
return n(0,0,0,0,{});
var t,r,a;
}
r=window.md5(o),i.invoke("calRqt",{
rqt:r
},function(e){
var i,o,c;
e.data&&e.k1&&e.k2?(i=encodeURIComponent(e.data),o=e.k1,c=e.k2,!t&&n(i,o,c,r,a)):!t&&n(0,0,0,r,a),
t=!0;
}),setTimeout(function(){
!t&&n(0,0,0,r,a),t=!0;
},e.timeout||500);
}
var i=e("biz_wap/jsapi/core.js");
return e("biz_common/jquery.md5.js"),{
createSign:n
};
});define("appmsg/my_comment_tpl.html.js",[],function(){
return'<!-- 发表留言 -->\n<#if(window.new_appmsg){#>\n  <div id="js_cmt_mine" class="discuss_container_wrp" style="display:none;">\n    <div class="discuss_container editing access">\n        <div class="discuss_container_inner">\n          <div class="discuss_container_hd">\n            <h2 class="rich_media_title"><#=window.msg_title.html(1)#></h2><!-- 标题要转义 -->\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                            <img class="pic_default_primary" src="<#=window.icon_emotion_switch_primary#>" alt="">\n                            <img class="pic_active_primary" src="<#=window.icon_emotion_switch_active_primary#>" alt="">\n                        </span>\n                    </div>\n                </span>\n            </div>\n            <div class="emotion_panel" id="js_emotion_panel">\n                <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                    <i class="emotion_panel_arrow arrow_out"></i>\n                    <i class="emotion_panel_arrow arrow_in"></i>\n                </span>\n                <div class="emotion_list_wrp" id="js_slide_wrapper">\n                    <!--<ul class="emotion_list"></ul>-->\n                    <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                </div>\n                <ul class="emotion_navs" id="js_navbar">\n                    <!--<li class="emotion_nav"></li>-->\n                </ul>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n          </div>\n          <div class="discuss_container_bd">\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="mod_title_context">\n                    <strong class="mod_title">我的留言</strong>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="weui-loadmore" id="js_mycmt_loading">\n                <i class="weui-loading"></i>\n                <span class="weui-loadmore__tips">正在加载</span>\n            </div>\n            <div id="js_cmt_toast" style="display: none;">\n                <div class="weui-mask_transparent"></div>\n                <div class="weui-toast">\n                    <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n                    <p class="weui-toast__content">已留言</p>\n                </div>\n            </div>\n            <div class="weui-dialog__wrp weui-transition_opacity-hide" id="js_delete_panel_mobile">\n                <div class="weui-mask"></div>\n                <div class="weui-dialog">\n                    <div class="weui-dialog__bd">删除该留言吗？</div>\n                    <div class="weui-dialog__ft">\n                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" id="js_delete_cancel_mobile">取消</a>\n                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" id="js_delete_confirm_mobile">删除</a>\n                    </div>\n                </div>\n            </div>\n          </div>\n        </div>\n    </div>\n  </div>\n<#}else{#>\n    <div id="js_cmt_mine" class="discuss_container editing access" style="display:none;">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title.html(1)#></h2><!-- 标题要转义 -->\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言对朋友可见，被公众号筛选后，将对所有人可见。"></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="留言将由公众号筛选后显示，对所有人可见。"></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">留言</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="rich_tips with_line title_tips discuss_title_line">\n                    <span class="tips">我的留言</span>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="rich_tips tips_global loading_tips" id="js_mycmt_loading">\n                <img src="<#=window.icon_loading_white#>" class="rich_icon icon_loading_white" alt="">\n                <span class="tips">加载中</span>\n            </div>\n            <div class="wx_poptips" id="js_cmt_toast" style="display:none;">\n                <img alt="" class="icon_toast" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAYAAABUIcSXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMTUxMzkxZS1jYWVhLTRmZTMtYTY2NS0xNTRkNDJiOGQyMWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTA3QzM2RTg3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA3QzM2RTc3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWMyOGVjZTMtNzllZS00ODlhLWIxZTYtYzNmM2RjNzg2YjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIxNTEzOTFlLWNhZWEtNGZlMy1hNjY1LTE1NGQ0MmI4ZDIxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmvxj1gAAAVrSURBVHja7J15rF1TFMbXk74q1ZKHGlMkJVIhIgg1FH+YEpEQJCKmGBpThRoSs5jVVNrSQUvEEENIhGiiNf9BiERICCFIRbUiDa2qvudbOetF3Tzv7XWGffa55/uS7593977n3vO7e5+199p7v56BgQGh0tcmvAUERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERVAUQVEERVAUQbVYk+HdvZVG8b5F0xj4RvhouB+eCy8KrdzDJc1RtAX8ILxvx98V1GyCSkN98Cx4z/95/Wn4fj6j6tUEeN4wkFSnw1MJqj5NhBfAuwaUHREUg4lqNMmePVsHll/HFhVfe1t3FwpJI8DXCCquDrCWNN4B6Tb4M3Z98aTPmTvh0YHl18PXw29yZiKejoPvcUD6E74yFBJbVDk6Bb7K8aP/Hb4c/tRzEYIqprPhSxzlf4Uvhb/0Xoig8qnHAJ3lqPMzfDH8XZ4LEpRf2sVdA5/sqPO9Qfop70UJyn+/boaPddT5yrq7VUUvTIVJI7q74MMddXR8NB1eXcYvhBpZm0s2w72/o86HFoKvLau/pYaXzjLMdUJ6y0LwtWV9CIIaXtvA8+G9HHV03u5q+K+yH47U0NoRngPv7KjzHDwTLj0bS1BDazfJJlcnOOostC6ysnCT+q80G/sIvFVgeW09D8FPVT0uoP7VfvAD8NjA8pqmuAN+OcYAjso0RbIZ8DGB5TVNcRO8JMaHY9SXSdfa3eeANJimWBLrA7JFiZwIXye+NMUV8CcxP2SRFjXefok7NRjSGZJlWUPvw2/wtNiQirSoXWyMsR28wR7AzzYM0oXw+Y7yK+CLJGeaoqjyrJSdZJD6Ov4+z5y6NJc0Az7NUecHydIUy+v60KNyQHoM3nKI1y7YCFiq0i7uBvgER52vDdKqWn9djhY1Dn4G3n6Ecqm2rF74dvgoR53S0hQxW9RJAZAGW5bSn58QJA27dQ7uIEedjywEX5NKVxCqsY6y+qA+LxFI4+yZ6oH0trWkNan80jygtIUsc5SflgAsDXgehfdx1KkkTRE76tN+Xue2jnTU0Ru1oIbvpt30bBtKhOp5yaaRkts0lic8V1i6dPcIRx2d/l8Y8XtNNEg7OOo8bl1kmmOKnDsO88CaYzejau0hWZqiL7C83oCH4SeTHvwV2BqqsHRVztSEYOmWF80NeXZT6Hd4KflResE9vCnBOlCyGfDNAstHTVPUDWoQ1t3iW+9WNizvlhfd4aerXd+ThqiMfNR6+9LvOOro5OY5JX2H4+F7HZD+kGzlamMgldWiirQsjcwWFbjmqZJteekJLK9pisvgL6RhKvuciZiwzrWWGapfrPy30kBVcSBIrw0aD3PU0XB6cehntq7rTMf7/2iQlktDVdXJLXlg6VjmiYBn6rWSTRCH6hvJ0hQrpcGq8oidsmHpTP8t8DGO9/vcWt9qabiqPgup1yKyQwvC2tSefZ73SSpNkUJ4PlLorlHZ+446nc8f3fIyywlJhwrTuwVSjBa1ccvSxN0hjjoK5xVrYZMd9V6XbFfgBukixTwGLg8sDam3dZR/wZ6L/dJlin1en8LS+bgpFbz3Ygvzu1J1HKxYNqxGpCmaCEo12rrBorD6LRp8UbpcdR5VWhTW35KlKd6QFqjuM2XzwlpnMxTvSkuUwuG/Xlg6NtPjbT6WFimF/VG6LEvXgn8QGDjMbBukVECFwhpoS+CQatfX2Q1q6H7wENHdrfCr0lKleEB9JyxNneus+VJpsVL9TwI6W65LovWIGl3KtVJaLv7LBwYTFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFFWq/hFgADUMN4RzT6/OAAAAAElFTkSuQmCC">\n                <p class="toast_content">已留言</p>\n            </div>\n        </div>\n    </div>\n<#}#>\n<div class="weui-webview-nav" style="display:none;" id="js_fake_bar">\n    <button class="weui-webview-nav__btn_goback" id="js_cmt_goback">goback</button>\n    <button class="weui-webview-nav__btn_forward weui-webview-nav__btn_disabled" disabled="disabled">forward</button>\n</div>\n';
});define("appmsg/cmt_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" data-elected="<#=report_elected#>" data-friend="<#=report_friend#>" data-content_id="<#=content_id#>">\n    <div class="discuss_item_hd">\n      <# if(is_elected == 1){ #>\n      <div class="discuss_opr">\n          <span class="media_tool_meta meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>">\n              <i class="icon_praise_gray"></i>\n              <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n          </span>\n      </div>\n      <# } #>\n      <div class="user_info">\n          <div class="nickname_wrp">\n          <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_appmsg_tag">置顶</span><# } #>\n            <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n          </div>\n          <img class="avatar" src="<#=logo_url#>">\n      </div>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <# if (is_from_me == 1) { #>\n    <p class="discuss_extra_info">\n        <!-- <#=time#> -->               \n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n    </p>\n    <# } #>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n          <div class="discuss_item_hd">\n            <div class="discuss_opr">\n              <span class="media_tool_meta meta_praise js_reply_praise <# if(reply.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply.reply_list[0].reply_id#>\' data-scene="<#=scene#>">\n                <i class="icon_praise_gray"></i>\n                <span class="praise_num"><# if(reply.reply_list[0].reply_like_num_format !== 0){ #><#=reply.reply_list[0].reply_like_num_format#> <# } #></span>\n              </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname_wrp">\n              <div class="nickname">作者</div>\n            </div>\n            <#}else{#>\n            <div class="nickname_wrp">\n              <div class="nickname">作者回复</div>\n            </div>\n            <# } #>\n          </div>\n          <div class="discuss_message">\n              <div class="discuss_message_content"><#=reply.reply_list[0].content#></div>\n          </div>\n            <!-- <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p> -->\n        </div>\n    <# } #>\n        \n</li>\n<#}else{#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" data-elected="<#=report_elected#>" data-friend="<#=report_friend#>" data-content_id="<#=content_id#>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta tips_global meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>">\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(朋友)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_discuss_top">置顶</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <p class="discuss_extra_info">\n        <#=time#>               \n        <# if (is_from_me == 1) { #>\n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>\n        <# } #>\n    </p>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta tips_global meta_praise js_reply_praise <# if(reply.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply.reply_list[0].reply_id#>\' data-scene="<#=scene#>">\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"><# if(reply.reply_list[0].reply_like_num_format !== 0){ #><#=reply.reply_list[0].reply_like_num_format#> <# } #></span>\n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">作者</div>\n            <#}else{#>\n            <div class="nickname">作者回复</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply.reply_list[0].content#></div>\n            </div>\n            <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p>\n        </div>\n    <# } #>\n        \n</li>\n<#}#>\n';
});