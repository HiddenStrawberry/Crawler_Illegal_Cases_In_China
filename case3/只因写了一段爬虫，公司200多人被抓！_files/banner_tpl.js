define("new_video/plugin/util.js",["biz_wap/utils/storage.js"],function(e){
"use strict";
var t=e("biz_wap/utils/storage.js"),n=new t("player"),r=function(e,t,n){
var r=!1;
return e&&t&&n&&(t-e)/1e3/3600>n&&(r=!0),r;
},i=function(e){
var t=[0,10,100,1e3,1e4,1e5],r=(""+parseInt(e,10)).length;
n.set("clickPlay",{
time:(new Date).getTime(),
flow:5>=r?t[r]:1e5
},+new Date+864e5);
},a=function(){
var e=!1,t=n.get("clickPlay");
if(t){
var i=t.time;
r(i,(new Date).getTime(),24)||(e=!0);
}
return e;
},u=function(e){
var t=["2g","3g","4g","2g/3g"];
return e?t.indexOf(e)>-1:!1;
},l=function(e){
if(!e||""===e||0===e||10>=e)return!1;
var t=n.get("clickPlay");
if(t){
var r=t.flow;
if(r>=e||1e5===r)return!1;
}
return!0;
},o=function(e,t){
var n=Object.getOwnPropertyNames(e),r=Object.getOwnPropertyNames(t);
if(n.length!==r.length)return!1;
for(var i=0;i<n.length;i++){
var a=n[i],u=e[a],l=t[a];
if(u!==l)return!1;
}
return!0;
},c=function(e){
return"no"===e||"none"===e;
};
return{
setUserClickPlay:i,
isUserClickPlay:a,
isNetworkUnWifi:u,
isVideoNeedFlowNotice:l,
isObjectValueEqual:o,
isNoneNetwork:c
};
});define("pages/iframe_communicate.js",["biz_common/dom/event.js","biz_common/dom/attr.js","pages/video_ctrl.js"],function(e){
"use strict";
function t(){
window.addEventListener("message",o,!1);
}
function o(e){
var t;
if(e.origin?t=e.origin:e.originalEvent&&(t=e.originalEvent.origin),/^http(s)?\:\/\/mp\.weixin\.qq\.com$/.test(t)&&e.source){
var o=e.data;
if(o&&o.type){
if(!/^mpvideo_/.test(o.type))return;
for(var s=o.type.replace(/^mpvideo_/,""),a=p.postMessageEvt[s]||[],i=0;i<a.length;i++)a[i].func(o.data);
}
}
}
function s(e){
var t=e.type;
/^mpvideo_/.test(t)||(t="mpvideo_"+t);
var o={
data:e.data,
type:t
};
window.parent.postMessage(o,document.location.protocol+"//mp.weixin.qq.com");
}
function a(e){
var t=e.type;
/^broadcast_/.test(t)||(t="broadcast_"+t),s({
type:t,
data:e.data
});
}
function i(e){
var t=e.type;
/^mpvideo_/.test(t)&&(t=t.replace(/^mpvideo_/,"")),p.postMessageEvt[t]||(p.postMessageEvt[t]=[]),
p.postMessageEvt[t].push({
func:e.func
});
}
function n(e){
var t=e.type;
/^mpvideo_/.test(t)&&(t=t.replace(/^mpvideo_/,""));
for(var o=p.postMessageEvt[t]||[],s=0;s<o.length;s++)o[s].func===e.func&&(o.splice(s,1),
s--);
}
var r=(e("biz_common/dom/event.js"),e("biz_common/dom/attr.js")),p=(e("pages/video_ctrl.js"),
r.setProperty,{
postMessageEvt:{}
});
return t(),{
broadcastMessage:a,
postMessage:s,
addListener:i,
removeListener:n
};
});define("new_video/player.html.js",[],function(){
return'<div id="js_mpvedio_<#=id#>" class="js_mpvedio">\n<div class="js_page_video page_video ratio_primary <#if(ratio==(4/3)){#>video_skin_primary<#}#>" style="width:<#=width#>px;height:<#=height#>px;display:<#=display#>;">\n    <!--ps: @拉风\n        1.全屏body添加扩展类： full_screen_mv\n        2.全屏是竖屏播放的情况：需要给page_video这个div加一个margin-left,margin-top\n        这两个值是page_video设置的高度和宽度的一半的负数；\n        3.如果是横屏的话(横屏默认为全屏)，page_video上设置的宽度和高度去掉即可。\n    -->\n\n<!--     <div class="wrp_loading js_loading">\n        <div class="wrp_svg">\n            <svg  class="rotate_svg" width="64" height="64" xmlns="http://www.w3.org/2000/svg">\n                <circle cx="50%" cy="50%" r="40%" stroke-width="4"/>\n                <path fill="#fff" stroke="#f00" stroke-width="4" fill-opacity="0" d="M4.5 35\n               A 26 26, 0,0,0, 27 56" transform="rotate(330.191 30 30)">\n             <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 30 30" to="360 30 30" dur="5s" repeatCount="indefinite"></animateTransform>\n\n          </path>\n            </svg>\n            <svg class="loader_bg" xmlns="http://www.w3.org/2000/svg" width="64" height="64">\n                <circle cx="50%" cy="50%" r="40%" style="fill:#a5a4a2;stroke:#a5a4a2;stroke-width:4;fill-opacity:0;"></circle>\n            </svg>\n        </div>\n    </div>     -->\n    <!--下载腾讯视频-->\n    <div id="ing_download_<#=id#>" class="app_download_container" style="display:none;">\n        <# if (window.cgiData) { #>\n        <img class="app_thumb" src="<#=window.cgiData.appImg||""#>">\n        <# } else { #>\n        <img class="app_thumb" src="">\n        <# } #>\n        <span class="btn_app_download_wrp js_download_btn">\n            <span class="btn_app_download js_download_text">下载</span>\n        </span>\n        <span class="btn_app_download_wrp js_progress_main" style="display:none;">\n            <span class="btn_app_download progress_text js_progress_text"></span>\n            <span class="app_download_progress js_progress" style="width:0%;"></span>\n        </span>\n        <div class="app_download_info">\n            <strong class="app_download_title">提升3倍流畅度</strong>\n            <p class="app_download_desc"><span class="js_installStatus"></span>腾讯视频客户端</p>\n        </div>\n    </div>\n\n    <!-- 视频加载失败 -->\n    <!--\n    <div class="wx_video_error_box">\n        <div class="wx_video_error_msg">\n            <p>视频加载失败，请刷新重试</p>\n            <a class="wx_video_error_msg_btn" href="javascript:;">刷新</a>\n        </div>\n        <img class="wx_video_error_loading" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAMAAAC7xnO3AAAAY1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+aRQ2gAAAAIXRSTlMAOx20pMJbzBQNTDGTh2ohLCZmeUF2hEmXCFdxUquef4yHE17nAAACnklEQVRIx9WW2xqiIBSFRc1AUATJU1a+/1MOm0NYKvnNXM260ZLftRcbqCQinOLI0yiY/iXKuUZPjx5Fk+6RhF1yHiVF0wC6IZfr9fqIkpRqdNyQ9AoiUU8g+YZ8Xn96YmNKvkhkLMskKgEo/yJzaxkXeZsGsjeWKEIFU/FBZgA+D5yEwGtTgR0J18lYUvdcLZ1YkUjLf+a0saYYSG/J3Hury+WSkTCjCETtF6Mvd8QGJMZSWIfsAlKhWGRl5zQ1ZNBDgy/zzvvFavWUK7SyTRs+rsiUZS/4LHIHyo8VgBx7vDkKx2WhPS7dD1Q6cNlu2dTa0gMys4bz/vJR6ph8ADgcVcSVUkfnhzJTc6gRj8fbCOHk30UI2KC+V4gKjskJQqC5frFHli0kafogFIfFkAXVCSqdAFVR8pmtVCWiXCtaarbWpGtQAYx7sjf2GCbfjFRQpH7lTLucveSMBE7+Z6VqViT2/PVs0d7hPk9TUcTaUuVaT8k/f/v6SXOgyG7InZaSvM8vj/309LrbvpSAORDH2/kWGyHhm/u5AYUc8qdFBRRrsV749bRv6I5x1OY50GZUUxQz9aGplAXZcOQ1DL3vwsTyvHQ2YWgjZV2rDTmxYRjUuoBvcQDr7QRLBiiNzJ4BawG3FLtTmEMGBigTRyC2oIKht1vbwLWrKmXKBZal+yApDGhm4q5JCVdNdrZeQBe8B44WnE2NGmxrR1bCvMugHdkhSwMWI9wjIGeosnPlJmNrst6PQrpeFkBSyAmkdD016DYqAVC6HHcNtnCPgazcuytAd5IqB/qYtq4bkP7vnEaL3W4KH9/HhKBAKl8XFUlMIWYIek4hZgh6UtjHBLVA4pPkCKRf9jOQ5Kwp1UvPDyb3qkPJaRG8Ln7f8Q8Bki/Kj5IYnQAAAABJRU5ErkJggg==">\n    </div>\n    -->\n    <!--菊花-->\n    <div class="wrp_loading js_loading start_loading"  style="display:none;">\n        <div class="mid_opr">\n            <div class="spinner" role="progressbar"\n                style="position: absolute; width: 0px; z-index: 2000000000; left: 50%; top: 50%;backface-visibility:hidden; -webkit-backface-visibility:hidden;">\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-0-12 1.25s linear infinite;-webkit-animation: opacity-60-25-0-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(0deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(0deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-1-12 1.25s linear infinite;-webkit-animation: opacity-60-25-1-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(30deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(30deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-2-12 1.25s linear infinite;-webkit-animation: opacity-60-25-2-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(60deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(60deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-3-12 1.25s linear infinite;-webkit-animation: opacity-60-25-3-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(90deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(90deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-4-12 1.25s linear infinite;-webkit-animation: opacity-60-25-4-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(120deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(120deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-5-12 1.25s linear infinite;-webkit-animation: opacity-60-25-5-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(150deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(150deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-6-12 1.25s linear infinite;-webkit-animation: opacity-60-25-6-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(180deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(180deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-7-12 1.25s linear infinite;-webkit-animation: opacity-60-25-7-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(210deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(210deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-8-12 1.25s linear infinite;-webkit-animation: opacity-60-25-8-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(240deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(240deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-9-12 1.25s linear infinite;-webkit-animation: opacity-60-25-9-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(270deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(270deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-10-12 1.25s linear infinite;-webkit-animation: opacity-60-25-10-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(300deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(300deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n                <div style="position: absolute; top: -1px; opacity: 0.25; animation: opacity-60-25-11-12 1.25s linear infinite;-webkit-animation: opacity-60-25-11-12 1.25s linear infinite;">\n                    <div\n                        style="position: absolute; width: 9.68px; height: 3.08px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 1px; transform-origin: left 50% 0px; transform: rotate(330deg) translate(9.24px, 0px);-webkit-transform-origin: left 50% 0px; -webkit-transform: rotate(330deg) translate(9.24px, 0px); border-radius: 1px; background: rgb(253, 253, 253);"></div>\n                </div>\n            </div>\n        </div>\n        <!--\n        <svg version="1.1" class="svg_loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n        width="60px" height="60px" viewBox="0 0 60 60" enable-background="new 0 0 60 60" xml:space="preserve">\n\n        <circle cx="30" cy="30" r="26" style="fill:#a5a4a2;stroke:#a5a4a2;stroke-width:4;fill-opacity:0" />\n        <path  fill="#fff" stroke="#fff"  stroke-width="4"  fill-opacity="0" d="M4.5 35A 26 26, 0,0,0, 27 56" style="stroke-linecap:round;">\n        <animateTransform attributeType="xml"\n        attributeName="transform"\n        type="rotate"\n        from="0 30 30"\n        to="360 30 30"\n        dur="0.5s"\n        repeatCount="indefinite"/>\n        </path>\n        </svg>\n        -->\n    </div>\n\n    <!-- 播放按钮 z-index:12 -->\n    <div class="video_pause_controll js_video_pause_controll">\n        <a class="btn_pause js_btn_pause">\n            <i class="icon_pause"></i>\n        </a>\n    </div>\n\n    <!-- 互选视频广告 静音btn 静音状态className:muting -->\n    <# if(ad_muted_btn){ #>\n    <span class="js_muted_btn video_muted_btn muting">静音</span>\n    <# } #>\n\n    <!-- 视频广告 z-index:13 -->\n    <div class="video_ad js_ad_controll" style="display:none;">\n        <span class="button_left_time video_ad_time_meta mpad_more_innervideo_container js_ad_opt_list_btn">广告            <!--投诉入口 begin-->\n            <div href="javascript:;" class="mpad_more js_ad_opt_list_btn" style="<# if(!parseInt(parent.window.can_see_complaint)){ #>display: none<# } #>">\n                <ul class="mpad_more_list js_ad_opt_list" style="display:none;">\n                    <li class="mpad_more_list_ele">\n                        <a class="mpad_more_list_ele_container js_complain_btn" href="javascript:;">投诉</a>\n                    </li>\n                </ul>\n            </div>\n            <!--投诉入口 end-->\n            <span class="button_left_time_num js_play_time"></span></span>\n        <a href="javascript:;" class="btn_close js_btn_can_close_ad video_ad_time_meta" style="display:none;">可在<span class="js_can_close_time">(5s)</span>后关闭</a>\n        <a href="javascript:;" class="btn_close js_btn_close_ad video_ad_time_meta" style="display:none;">关闭<i></i></a>\n\n    </div>\n    <!-- 视频广告详情入口 -->\n    <div class="video_ad_detail js_ad_detail" style="display:none;">\n        <!--带小程序logo时，className 去掉with_arrow，加className with_weapp-->\n        <a href="javascript:;" class="btn btn_ad_detail with_arrow js_btn_ad_detail">\n            <!-- 小程序图标 -->\n            <span class="icon26_weapp_white js_video_post_weapp_icon" style="display:none;"></span>了解详情        </a>\n    </div>\n    <!--带小程序icon-->\n    <!-- <div class="video_ad_detail js_ad_detail" style="display:none;">\n        <a href="javascript:;" class="btn btn_ad_detail with_weapp js_btn_ad_detail">\n            <span class="icon26_weapp_white js_video_post_weapp_icon"></span>\n            了解详情\n        </a>\n    </div> -->\n\n    <div class="video_ad_detail js_ad_app" style="display:none;">\n        <a href="javascript:;" class="btn btn_ad_detail with_arrow js_btn_ad_app">下载应用</a>\n    </div>\n\n     <!--最后的视频推荐 z-index:11-->\n    <div class="js_end_dom continue_play none">\n        <!--\n        <div class="continue_inner">\n            <div class="hd_opr"><a href="#" class="btn_replay"><i class="icon_replay"></i>重新播放</a></div>\n            <div class="tit_desc">以下视频将跳到腾讯视频播放</div>\n            <ul class="video_list">\n               <li class="video_item">\n                   <a href="#" class="inner_item">\n                       <img  class="cover" src="<%@GetResFullName($images_path$pages/default_avator.png)%>"/>\n                       <div class="desc">\n                        这里是video的标题啊标题京东覅是\n                       </div>\n                   </a>\n               </li>\n            </ul>\n        </div>\n        -->\n    </div>\n\n    <!-- 无障碍按钮 -->\n    <em data-status="0" role="button" class="js_btn_play_aria btn_pause_accessibility"></em>\n\n    <!--封面-->\n    <!-- 跟播放器相同比例是style加上：\n        -webkit-background-size:cover;background-size:cover;  -->\n    <#if(cover){#>\n    <div class="js_poster_cover poster_cover" style="background-image:url(<#=cover#>)">\n        <!-- <img aria-labelledby="封面" alt="封面" src="<#=cover#>">\n        <div class="poster_cover_mask"></div> -->\n    </div>\n    <#}#>\n    <!--大播放-->\n    <div style="display:none;" class="full_screen_opr js_video_play_controll">\n        <div class="mid_play_box js_btn_play">\n            <i class="icon_mid_play"></i>\n            <p class="js_video_length video_length" style="display:none;"></p>\n        </div>\n    </div>\n\n    <!--流量提示-->\n    <div class="full_screen_opr flex_screen_hide flex_screen js_video_flow" style="display: none">\n        <div class="wx_video_flow_wrap">\n          <p class="wx_video_flow_tips js_flow_notice" style="display: none">正在使用流量播放,本视频约              <span class="js_video_flow_num"></span>\n          </p>\n          <button class="wx_video_flow_btn js_flow_play_btn" style="display:none">仍然播放</button>\n          <button class="wx_video_flow_btn js_flow_pause_btn" style="display: none">继续播放</button>\n        </div>\n    </div>\n\n    <!--mask,暂停状态下，提醒状态等的半透明蒙层-->\n    <div class="video_mask none"></div>\n\n    <!--快进。后退 操作 快进：next,快退，pre-->\n    <div  class="mid_opr fast_pre_next none js_forward">\n        <p class="video_length">\n            <span class="played_time js_forward_play_time">03:30</span>\n            <em>/</em>\n            <span class="total_time">03:30</span>\n        </p>\n        <div class="video_processor_bar">\n            <div class="processor_bar_inner js_forward_bar" style="width:30%;"></div>\n        </div>\n    </div>\n\n   <!--播放条-->\n    <!--消失opr_fade_out  出现opr_fade_in-->\n    <!--消失opr_fade_out  出现opr_fade_in-->\n    <div class="js_controll video_opr" style="display:none">\n         <div class="opr_inner">\n            <div class="opr_inner_fl">\n                <div class="js_switch switch switch_on"><!--switch_off 关闭，switch on开启-->\n                     <a href="javascript:;" class="btn_opr">on/off</a>\n                 </div>\n                <div class="played_time js_now_play_time">\n                      00:00\n                </div>\n            </div>\n\n             <div class="wrp_play_bar">\n                <div class="js_progress_bar wrp_progress" style="display:none;">\n                    <div class="progress_bar">\n                        <div class="js_played_bar played_bar" style="width:0%"></div>\n                        <div class="js_buffer_bar buffer_bar" style="width:0%"></div><!--缓冲条-->\n                        <div class="js_played_speed_cnt wrp_speed_dot"><i class="speed_dot" style="left:0%"></i></div>\n                    </div>\n                </div>\n             </div>\n\n            <!-- <div class="wrp_pop_play"><a href="#" class="pop_play">小窗</a></div> -->\n            <!--清晰度选择-->\n           <!--  <div class="play_mode">\n                 <a href="#" class="btn_mode current">超清</a>\n                 <div class="pop_mode_select">\n                     <ul class="clarity">\n                         <li class="clarity_item current">超清</li>\n                         <li class="clarity_item">标清</li>\n                         <li class="clarity_item">流畅</li>\n                     </ul>\n                 </div>\n            </div> -->\n            <div class="opr_inner_fr">\n                <div class="total_time js_total_time" style="display:none;"></div>\n                <# if (!_mustHideFullScreen) { #><div class="js_full_screen_control screenSize_control full"><i class="icon_control"></i></div>  <!--全屏className：full,小窗className：small-->\n<# } #>\n            </div>\n         </div>\n    </div>\n    <!--视频-->\n    <div class="js_inner inner not_fullscreen">\n        <div class="js_video_poster video_poster" style="display:none;">\n            <div class="video_mask"></div>\n             <video class="<#if(videoFit){#>video_fill<#}#>"  webkit-playsinline playsinline>\n                  您的浏览器不支持 video 标签             </video>\n        </div>\n    </div>\n\n</div>\n\n    <!--全屏遮罩-->\n<div class="js_full_mask full_mask" style=""></div>\n\n<!--\n11 菊花\n10 最后的视频推荐\n9封面上边的控制按钮\n8  以后的广告浮层\n7 封面\n6 视频+控制条 （在里边控制条z-index>视频） -->\n\n</div>\n';
});define("biz_wap/zepto/touch.js",["biz_wap/zepto/zepto.js"],function(e){
"use strict";
e("biz_wap/zepto/zepto.js"),function(e){
function t(e,t,o,n){
return Math.abs(e-t)>=Math.abs(o-n)?e-t>0?"Left":"Right":o-n>0?"Up":"Down";
}
function o(){
p=null,g.last&&(g.el&&"function"==typeof g.el.trigger&&g.el.trigger("longTap"),g={});
}
function n(){
p&&clearTimeout(p),p=null;
}
function i(){
a&&clearTimeout(a),l&&clearTimeout(l),c&&clearTimeout(c),p&&clearTimeout(p),a=l=c=p=null,
g={};
}
function r(e){
return("touch"==e.pointerType||e.pointerType==e.MSPOINTER_TYPE_TOUCH)&&e.isPrimary;
}
function u(e,t){
return e.type=="pointer"+t||e.type.toLowerCase()=="mspointer"+t;
}
var a,l,c,p,s,g={},f=750;
e(document).ready(function(){
var w,y,T,h,d=0,m=0;
"MSGesture"in window&&(s=new MSGesture,s.target=document.body),e(document).bind("MSGestureEnd",function(e){
var t=e.velocityX>1?"Right":e.velocityX<-1?"Left":e.velocityY>1?"Down":e.velocityY<-1?"Up":null;
t&&g.el&&"function"==typeof g.el.trigger&&(g.el.trigger("swipe"),g.el.trigger("swipe"+t));
}).on("touchstart MSPointerDown pointerdown",function(t){
(!(h=u(t,"down"))||r(t))&&(T=h?t:t.touches[0],t.touches&&1===t.touches.length&&g.x2&&(g.x2=void 0,
g.y2=void 0),w=Date.now(),y=w-(g.last||w),g.el=e("tagName"in T.target?T.target:T.target.parentNode),
a&&clearTimeout(a),g.x1=T.pageX,g.y1=T.pageY,y>0&&250>=y&&(g.isDoubleTap=!0),g.last=w,
p=setTimeout(o,f),s&&h&&s.addPointer(t.pointerId));
}).on("touchmove MSPointerMove pointermove",function(e){
(!(h=u(e,"move"))||r(e))&&(T=h?e:e.touches[0],n(),g.x2=T.pageX,g.y2=T.pageY,d+=Math.abs(g.x1-g.x2),
m+=Math.abs(g.y1-g.y2));
}).on("touchend MSPointerUp pointerup",function(o){
(!(h=u(o,"up"))||r(o))&&(n(),g.x2&&Math.abs(g.x1-g.x2)>30||g.y2&&Math.abs(g.y1-g.y2)>30?c=setTimeout(function(){
g.el&&"function"==typeof g.el.trigger&&(g.el.trigger("swipe"),g.el.trigger("swipe"+t(g.x1,g.x2,g.y1,g.y2))),
g={};
},0):"last"in g&&(30>d&&30>m?l=setTimeout(function(){
var t=e.Event("tap");
t.cancelTouch=i,g.el&&"function"==typeof g.el.trigger&&g.el.trigger(t),g.isDoubleTap?(g.el&&g.el.trigger("doubleTap"),
g={}):a=setTimeout(function(){
a=null,g.el&&g.el.trigger("singleTap"),g={};
},250);
},0):g={}),d=m=0);
}).on("touchcancel MSPointerCancel pointercancel",i),e(window).on("scroll",i);
}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(t){
e.fn[t]=function(e){
return this.on(t,e);
};
});
}(Zepto);
});define("biz_wap/zepto/event.js",["biz_wap/zepto/zepto.js"],function(e){
"use strict";
e("biz_wap/zepto/zepto.js"),function(e){
function n(e){
return e._zid||(e._zid=d++);
}
function t(e,t,o,u){
if(t=r(t),t.ns)var a=i(t.ns);
return(g[n(e)]||[]).filter(function(e){
return!(!e||t.e&&e.e!=t.e||t.ns&&!a.test(e.ns)||o&&n(e.fn)!==n(o)||u&&e.sel!=u);
});
}
function r(e){
var n=(""+e).split(".");
return{
e:n[0],
ns:n.slice(1).sort().join(" ")
};
}
function i(e){
return new RegExp("(?:^| )"+e.replace(" "," .* ?")+"(?: |$)");
}
function o(e,n){
return e.del&&!y&&e.e in E||!!n;
}
function u(e){
return b[e]||y&&E[e]||e;
}
function a(t,i,a,s,f,d,l){
var v=n(t),h=g[v]||(g[v]=[]);
i.split(/\s/).forEach(function(n){
if("ready"==n)return e(document).ready(a);
var i=r(n);
i.fn=a,i.sel=f,i.e in b&&(a=function(n){
var t=n.relatedTarget;
return!t||t!==this&&!e.contains(this,t)?i.fn.apply(this,arguments):void 0;
}),i.del=d;
var v=d||a;
i.proxy=function(e){
if(e=c(e),!e.isImmediatePropagationStopped()){
e.customData=s;
var n=v.apply(t,e._args==p?[e]:[e].concat(e._args));
return n===!1&&(e.preventDefault(),e.stopPropagation()),n;
}
},i.i=h.length,h.push(i),"addEventListener"in t&&t.addEventListener(u(i.e),i.proxy,o(i,l));
});
}
function s(e,r,i,a,s){
var c=n(e);
(r||"").split(/\s/).forEach(function(n){
t(e,n,i,a).forEach(function(n){
delete g[c][n.i],"removeEventListener"in e&&e.removeEventListener(u(n.e),n.proxy,o(n,s));
});
});
}
function c(n,t){
return(t||!n.isDefaultPrevented)&&(t||(t=n),e.each(_,function(e,r){
var i=t[e];
n[e]=function(){
return this[r]=P,i&&i.apply(t,arguments);
},n[r]=z;
}),(t.defaultPrevented!==p?t.defaultPrevented:"returnValue"in t?t.returnValue===!1:t.getPreventDefault&&t.getPreventDefault())&&(n.isDefaultPrevented=P)),
n;
}
function f(e){
var n,t={
originalEvent:e
};
for(n in e)w.test(n)||e[n]===p||(t[n]=e[n]);
return c(t,e);
}
var p,d=(e.zepto.qsa,1),l=Array.prototype.slice,v=e.isFunction,h=function(e){
return"string"==typeof e;
},g={},m={},y="onfocusin"in window,E={
focus:"focusin",
blur:"focusout"
},b={
mouseenter:"mouseover",
mouseleave:"mouseout"
};
m.click=m.mousedown=m.mouseup=m.mousemove="MouseEvents",e.event={
add:a,
remove:s
},e.proxy=function(t,r){
if(v(t)){
var i=function(){
return t.apply(r,arguments);
};
return i._zid=n(t),i;
}
if(h(r))return e.proxy(t[r],t);
throw new TypeError("expected function");
},e.fn.bind=function(e,n,t){
return this.on(e,n,t);
},e.fn.unbind=function(e,n){
return this.off(e,n);
},e.fn.one=function(e,n,t,r){
return this.on(e,n,t,r,1);
};
var P=function(){
return!0;
},z=function(){
return!1;
},w=/^([A-Z]|returnValue$|layer[XY]$)/,_={
preventDefault:"isDefaultPrevented",
stopImmediatePropagation:"isImmediatePropagationStopped",
stopPropagation:"isPropagationStopped"
};
e.fn.delegate=function(e,n,t){
return this.on(n,e,t);
},e.fn.undelegate=function(e,n,t){
return this.off(n,e,t);
},e.fn.live=function(n,t){
return e(document.body).delegate(this.selector,n,t),this;
},e.fn.die=function(n,t){
return e(document.body).undelegate(this.selector,n,t),this;
},e.fn.on=function(n,t,r,i,o){
var u,c,d=this;
return n&&!h(n)?(e.each(n,function(e,n){
d.on(e,t,r,n,o);
}),d):(h(t)||v(i)||i===!1||(i=r,r=t,t=p),(v(r)||r===!1)&&(i=r,r=p),i===!1&&(i=z),
d.each(function(p,d){
o&&(u=function(e){
return s(d,e.type,i),i.apply(this,arguments);
}),t&&(c=function(n){
var r,o=e(n.target).closest(t,d).get(0);
return o&&o!==d?(r=e.extend(f(n),{
currentTarget:o,
liveFired:d
}),(u||i).apply(o,[r].concat(l.call(arguments,1)))):void 0;
}),a(d,n,i,r,t,c||u);
}));
},e.fn.off=function(n,t,r){
var i=this;
return n&&!h(n)?(e.each(n,function(e,n){
i.off(e,t,n);
}),i):(h(t)||v(r)||r===!1||(r=t,t=p),r===!1&&(r=z),i.each(function(){
s(this,n,r,t);
}));
},e.fn.trigger=function(n,t){
return n=h(n)||e.isPlainObject(n)?e.Event(n):c(n),n._args=t,this.each(function(){
"dispatchEvent"in this?this.dispatchEvent(n):e(this).triggerHandler(n,t);
});
},e.fn.triggerHandler=function(n,r){
var i,o;
return this.each(function(u,a){
i=f(h(n)?e.Event(n):n),i._args=r,i.target=a,e.each(t(a,n.type||n),function(e,n){
return o=n.proxy(i),i.isImmediatePropagationStopped()?!1:void 0;
});
}),o;
},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(n){
e.fn[n]=function(e){
return e?this.bind(n,e):this.trigger(n);
};
}),["focus","blur"].forEach(function(n){
e.fn[n]=function(e){
return e?this.bind(n,e):this.each(function(){
try{
this[n]();
}catch(e){}
}),this;
};
}),e.Event=function(e,n){
h(e)||(n=e,e=n.type);
var t=document.createEvent(m[e]||"Events"),r=!0;
if(n)for(var i in n)"bubbles"==i?r=!!n[i]:t[i]=n[i];
return t.initEvent(e,r,!0),c(t);
};
}(Zepto);
});define("biz_wap/zepto/zepto.js",[],function(){
"use strict";
var t=function(){
function t(t){
return null==t?String(t):J[W.call(t)]||"object";
}
function n(n){
return"function"==t(n);
}
function e(t){
return null!=t&&t==t.window;
}
function i(t){
return null!=t&&t.nodeType==t.DOCUMENT_NODE;
}
function r(n){
return"object"==t(n);
}
function o(t){
return r(t)&&!e(t)&&Object.getPrototypeOf(t)==Object.prototype;
}
function s(t){
return t instanceof Array;
}
function u(t){
return"number"==typeof t.length;
}
function c(t){
return P.call(t,function(t){
return null!=t;
});
}
function a(t){
return t.length>0?C.fn.concat.apply([],t):t;
}
function l(t){
return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase();
}
function f(t){
return t in M?M[t]:M[t]=new RegExp("(^|\\s)"+t+"(\\s|$)");
}
function h(t,n){
return"number"!=typeof n||z[l(t)]?n:n+"px";
}
function p(t){
var n,e;
return j[t]||(n=L.createElement(t),L.body.appendChild(n),e=getComputedStyle(n,"").getPropertyValue("display"),
n.parentNode.removeChild(n),"none"==e&&(e="block"),j[t]=e),j[t];
}
function d(t){
return"children"in t?$.call(t.children):C.map(t.childNodes,function(t){
return 1==t.nodeType?t:void 0;
});
}
function g(t,n,e){
for(E in n)e&&(o(n[E])||s(n[E]))?(o(n[E])&&!o(t[E])&&(t[E]={}),s(n[E])&&!s(t[E])&&(t[E]=[]),
g(t[E],n[E],e)):n[E]!==x&&(t[E]=n[E]);
}
function m(t,n){
return null==n?C(t):C(t).filter(n);
}
function v(t,e,i,r){
return n(e)?e.call(t,i,r):e;
}
function y(t,n,e){
null==e?t.removeAttribute(n):t.setAttribute(n,e);
}
function b(t,n){
var e=t.className,i=e&&e.baseVal!==x;
return n===x?i?e.baseVal:e:void(i?e.baseVal=n:t.className=n);
}
function w(t){
var n;
try{
return t?"true"==t||("false"==t?!1:"null"==t?null:/^0/.test(t)||isNaN(n=Number(t))?/^[\[\{]/.test(t)?C.parseJSON(t):t:n):t;
}catch(e){
return t;
}
}
function N(t,n){
n(t);
for(var e in t.childNodes)N(t.childNodes[e],n);
}
var x,E,C,O,T,S,A=[],$=A.slice,P=A.filter,L=window.document,j={},M={},z={
"column-count":1,
columns:1,
"font-weight":1,
"line-height":1,
opacity:1,
"z-index":1,
zoom:1
},Z=/^\s*<(\w+|!)[^>]*>/,q=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,B=/^(?:body|html)$/i,R=/([A-Z])/g,V=["val","css","html","text","data","width","height","offset"],F=["after","prepend","before","append"],H=L.createElement("table"),I=L.createElement("tr"),U={
tr:L.createElement("tbody"),
tbody:H,
thead:H,
tfoot:H,
td:I,
th:I,
"*":L.createElement("div")
},_=/complete|loaded|interactive/,D=/^[\w-]*$/,J={},W=J.toString,X={},Y=L.createElement("div"),G={
tabindex:"tabIndex",
readonly:"readOnly",
"for":"htmlFor",
"class":"className",
maxlength:"maxLength",
cellspacing:"cellSpacing",
cellpadding:"cellPadding",
rowspan:"rowSpan",
colspan:"colSpan",
usemap:"useMap",
frameborder:"frameBorder",
contenteditable:"contentEditable"
};
X.matches=function(t,n){
if(!n||!t||1!==t.nodeType)return!1;
var e=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;
if(e)return e.call(t,n);
var i,r=t.parentNode,o=!r;
return o&&(r=Y).appendChild(t),i=~X.qsa(r,n).indexOf(t),o&&Y.removeChild(t),i;
},T=function(t){
return t.replace(/-+(.)?/g,function(t,n){
return n?n.toUpperCase():"";
});
},S=function(t){
return P.call(t,function(n,e){
return t.indexOf(n)==e;
});
},X.fragment=function(t,n,e){
var i,r,s;
return q.test(t)&&(i=C(L.createElement(RegExp.$1))),i||(t.replace&&(t=t.replace(k,"<$1></$2>")),
n===x&&(n=Z.test(t)&&RegExp.$1),n in U||(n="*"),s=U[n],s.innerHTML=""+t,i=C.each($.call(s.childNodes),function(){
s.removeChild(this);
})),o(e)&&(r=C(i),C.each(e,function(t,n){
V.indexOf(t)>-1?r[t](n):r.attr(t,n);
})),i;
},X.Z=function(t,n){
t=t||[];
for(var e in C.fn)t[e]=C.fn[e];
return t.selector=n||"",t;
},X.isZ=function(t){
return t instanceof X.Z;
},X.init=function(t,e){
var i;
if(!t)return X.Z();
if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&Z.test(t))i=X.fragment(t,RegExp.$1,e),
t=null;else{
if(e!==x)return C(e).find(t);
i=X.qsa(L,t);
}else{
if(n(t))return C(L).ready(t);
if(X.isZ(t))return t;
if(s(t))i=c(t);else if(r(t))i=[t],t=null;else if(Z.test(t))i=X.fragment(t.trim(),RegExp.$1,e),
t=null;else{
if(e!==x)return C(e).find(t);
i=X.qsa(L,t);
}
}
return X.Z(i,t);
},C=function(t,n){
return X.init(t,n);
},C.extend=function(t){
var n,e=$.call(arguments,1);
return"boolean"==typeof t&&(n=t,t=e.shift()),e.forEach(function(e){
g(t,e,n);
}),t;
},X.qsa=function(t,n){
var e,r="#"==n[0],o=!r&&"."==n[0],s=r||o?n.slice(1):n,u=D.test(s);
return i(t)&&u&&r?(e=t.getElementById(s))?[e]:[]:1!==t.nodeType&&9!==t.nodeType?[]:$.call(u&&!r?o?t.getElementsByClassName(s):t.getElementsByTagName(n):t.querySelectorAll(n));
},C.contains=function(t,n){
return t!==n&&t.contains(n);
},C.type=t,C.isFunction=n,C.isWindow=e,C.isArray=s,C.isPlainObject=o,C.isEmptyObject=function(t){
var n;
for(n in t)return!1;
return!0;
},C.inArray=function(t,n,e){
return A.indexOf.call(n,t,e);
},C.camelCase=T,C.trim=function(t){
return null==t?"":String.prototype.trim.call(t);
},C.uuid=0,C.support={},C.expr={},C.map=function(t,n){
var e,i,r,o=[];
if(u(t))for(i=0;i<t.length;i++)e=n(t[i],i),null!=e&&o.push(e);else for(r in t)e=n(t[r],r),
null!=e&&o.push(e);
return a(o);
},C.each=function(t,n){
var e,i;
if(u(t)){
for(e=0;e<t.length;e++)if(n.call(t[e],e,t[e])===!1)return t;
}else for(i in t)if(n.call(t[i],i,t[i])===!1)return t;
return t;
},C.grep=function(t,n){
return P.call(t,n);
},window.JSON&&(C.parseJSON=JSON.parse),C.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,n){
J["[object "+n+"]"]=n.toLowerCase();
}),C.fn={
forEach:A.forEach,
reduce:A.reduce,
push:A.push,
sort:A.sort,
indexOf:A.indexOf,
concat:A.concat,
map:function(t){
return C(C.map(this,function(n,e){
return t.call(n,e,n);
}));
},
slice:function(){
return C($.apply(this,arguments));
},
ready:function(t){
return _.test(L.readyState)&&L.body?t(C):L.addEventListener("DOMContentLoaded",function(){
t(C);
},!1),this;
},
get:function(t){
return t===x?$.call(this):this[t>=0?t:t+this.length];
},
toArray:function(){
return this.get();
},
size:function(){
return this.length;
},
remove:function(){
return this.each(function(){
null!=this.parentNode&&this.parentNode.removeChild(this);
});
},
each:function(t){
return A.every.call(this,function(n,e){
return t.call(n,e,n)!==!1;
}),this;
},
filter:function(t){
return n(t)?this.not(this.not(t)):C(P.call(this,function(n){
return X.matches(n,t);
}));
},
add:function(t,n){
return C(S(this.concat(C(t,n))));
},
is:function(t){
return this.length>0&&X.matches(this[0],t);
},
not:function(t){
var e=[];
if(n(t)&&t.call!==x)this.each(function(n){
t.call(this,n)||e.push(this);
});else{
var i="string"==typeof t?this.filter(t):u(t)&&n(t.item)?$.call(t):C(t);
this.forEach(function(t){
i.indexOf(t)<0&&e.push(t);
});
}
return C(e);
},
has:function(t){
return this.filter(function(){
return r(t)?C.contains(this,t):C(this).find(t).size();
});
},
eq:function(t){
return-1===t?this.slice(t):this.slice(t,+t+1);
},
first:function(){
var t=this[0];
return t&&!r(t)?t:C(t);
},
last:function(){
var t=this[this.length-1];
return t&&!r(t)?t:C(t);
},
find:function(t){
var n,e=this;
return n="object"==typeof t?C(t).filter(function(){
var t=this;
return A.some.call(e,function(n){
return C.contains(n,t);
});
}):1==this.length?C(X.qsa(this[0],t)):this.map(function(){
return X.qsa(this,t);
});
},
closest:function(t,n){
var e=this[0],r=!1;
for("object"==typeof t&&(r=C(t));e&&!(r?r.indexOf(e)>=0:X.matches(e,t));)e=e!==n&&!i(e)&&e.parentNode;
return C(e);
},
parents:function(t){
for(var n=[],e=this;e.length>0;)e=C.map(e,function(t){
return(t=t.parentNode)&&!i(t)&&n.indexOf(t)<0?(n.push(t),t):void 0;
});
return m(n,t);
},
parent:function(t){
return m(S(this.pluck("parentNode")),t);
},
children:function(t){
return m(this.map(function(){
return d(this);
}),t);
},
contents:function(){
return this.map(function(){
return $.call(this.childNodes);
});
},
siblings:function(t){
return m(this.map(function(t,n){
return P.call(d(n.parentNode),function(t){
return t!==n;
});
}),t);
},
empty:function(){
return this.each(function(){
this.innerHTML="";
});
},
pluck:function(t){
return C.map(this,function(n){
return n[t];
});
},
show:function(){
return this.each(function(){
"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=p(this.nodeName));
});
},
replaceWith:function(t){
return this.before(t).remove();
},
wrap:function(t){
var e=n(t);
if(this[0]&&!e)var i=C(t).get(0),r=i.parentNode||this.length>1;
return this.each(function(n){
C(this).wrapAll(e?t.call(this,n):r?i.cloneNode(!0):i);
});
},
wrapAll:function(t){
if(this[0]){
C(this[0]).before(t=C(t));
for(var n;(n=t.children()).length;)t=n.first();
C(t).append(this);
}
return this;
},
wrapInner:function(t){
var e=n(t);
return this.each(function(n){
var i=C(this),r=i.contents(),o=e?t.call(this,n):t;
r.length?r.wrapAll(o):i.append(o);
});
},
unwrap:function(){
return this.parent().each(function(){
C(this).replaceWith(C(this).children());
}),this;
},
clone:function(){
return this.map(function(){
return this.cloneNode(!0);
});
},
hide:function(){
return this.css("display","none");
},
toggle:function(t){
return this.each(function(){
var n=C(this);
(t===x?"none"==n.css("display"):t)?n.show():n.hide();
});
},
prev:function(t){
return C(this.pluck("previousElementSibling")).filter(t||"*");
},
next:function(t){
return C(this.pluck("nextElementSibling")).filter(t||"*");
},
html:function(t){
return 0===arguments.length?this.length>0?this[0].innerHTML:null:this.each(function(n){
var e=this.innerHTML;
C(this).empty().append(v(this,t,n,e));
});
},
text:function(t){
return 0===arguments.length?this.length>0?this[0].textContent:null:this.each(function(){
this.textContent=t===x?"":""+t;
});
},
attr:function(t,n){
var e;
return"string"==typeof t&&n===x?0==this.length||1!==this[0].nodeType?x:"value"==t&&"INPUT"==this[0].nodeName?this.val():!(e=this[0].getAttribute(t))&&t in this[0]?this[0][t]:e:this.each(function(e){
if(1===this.nodeType)if(r(t))for(E in t)y(this,E,t[E]);else y(this,t,v(this,n,e,this.getAttribute(t)));
});
},
removeAttr:function(t){
return this.each(function(){
1===this.nodeType&&y(this,t);
});
},
prop:function(t,n){
return t=G[t]||t,n===x?this[0]&&this[0][t]:this.each(function(e){
this[t]=v(this,n,e,this[t]);
});
},
data:function(t,n){
var e=this.attr("data-"+t.replace(R,"-$1").toLowerCase(),n);
return null!==e?w(e):x;
},
val:function(t){
return 0===arguments.length?this[0]&&(this[0].multiple?C(this[0]).find("option").filter(function(){
return this.selected;
}).pluck("value"):this[0].value):this.each(function(n){
this.value=v(this,t,n,this.value);
});
},
offset:function(t){
if(t)return this.each(function(n){
var e=C(this),i=v(this,t,n,e.offset()),r=e.offsetParent().offset(),o={
top:i.top-r.top,
left:i.left-r.left
};
"static"==e.css("position")&&(o.position="relative"),e.css(o);
});
if(0==this.length)return null;
var n=this[0].getBoundingClientRect();
return{
left:n.left+window.pageXOffset,
top:n.top+window.pageYOffset,
width:Math.round(n.width),
height:Math.round(n.height)
};
},
css:function(n,e){
if(arguments.length<2){
var i=this[0],r=getComputedStyle(i,"");
if(!i)return;
if("string"==typeof n)return i.style[T(n)]||r.getPropertyValue(n);
if(s(n)){
var o={};
return C.each(s(n)?n:[n],function(t,n){
o[n]=i.style[T(n)]||r.getPropertyValue(n);
}),o;
}
}
var u="";
if("string"==t(n))e||0===e?u=l(n)+":"+h(n,e):this.each(function(){
this.style.removeProperty(l(n));
});else for(E in n)n[E]||0===n[E]?u+=l(E)+":"+h(E,n[E])+";":this.each(function(){
this.style.removeProperty(l(E));
});
return this.each(function(){
this.style.cssText+=";"+u;
});
},
index:function(t){
return t?this.indexOf(C(t)[0]):this.parent().children().indexOf(this[0]);
},
hasClass:function(t){
return t?A.some.call(this,function(t){
return this.test(b(t));
},f(t)):!1;
},
addClass:function(t){
return t?this.each(function(n){
O=[];
var e=b(this),i=v(this,t,n,e);
i.split(/\s+/g).forEach(function(t){
C(this).hasClass(t)||O.push(t);
},this),O.length&&b(this,e+(e?" ":"")+O.join(" "));
}):this;
},
removeClass:function(t){
return this.each(function(n){
return t===x?b(this,""):(O=b(this),v(this,t,n,O).split(/\s+/g).forEach(function(t){
O=O.replace(f(t)," ");
}),void b(this,O.trim()));
});
},
toggleClass:function(t,n){
return t?this.each(function(e){
var i=C(this),r=v(this,t,e,b(this));
r.split(/\s+/g).forEach(function(t){
(n===x?!i.hasClass(t):n)?i.addClass(t):i.removeClass(t);
});
}):this;
},
scrollTop:function(t){
if(this.length){
var n="scrollTop"in this[0];
return t===x?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){
this.scrollTop=t;
}:function(){
this.scrollTo(this.scrollX,t);
});
}
},
scrollLeft:function(t){
if(this.length){
var n="scrollLeft"in this[0];
return t===x?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){
this.scrollLeft=t;
}:function(){
this.scrollTo(t,this.scrollY);
});
}
},
position:function(){
if(this.length){
var t=this[0],n=this.offsetParent(),e=this.offset(),i=B.test(n[0].nodeName)?{
top:0,
left:0
}:n.offset();
return e.top-=parseFloat(C(t).css("margin-top"))||0,e.left-=parseFloat(C(t).css("margin-left"))||0,
i.top+=parseFloat(C(n[0]).css("border-top-width"))||0,i.left+=parseFloat(C(n[0]).css("border-left-width"))||0,
{
top:e.top-i.top,
left:e.left-i.left
};
}
},
offsetParent:function(){
return this.map(function(){
for(var t=this.offsetParent||L.body;t&&!B.test(t.nodeName)&&"static"==C(t).css("position");)t=t.offsetParent;
return t;
});
}
},C.fn.detach=C.fn.remove,["width","height"].forEach(function(t){
var n=t.replace(/./,function(t){
return t[0].toUpperCase();
});
C.fn[t]=function(r){
var o,s=this[0];
return r===x?e(s)?s["inner"+n]:i(s)?s.documentElement["scroll"+n]:(o=this.offset())&&o[t]:this.each(function(n){
s=C(this),s.css(t,v(this,r,n,s[t]()));
});
};
}),F.forEach(function(n,e){
var i=e%2;
C.fn[n]=function(){
var n,r,o=C.map(arguments,function(e){
return n=t(e),"object"==n||"array"==n||null==e?e:X.fragment(e);
}),s=this.length>1;
return o.length<1?this:this.each(function(t,n){
r=i?n:n.parentNode,n=0==e?n.nextSibling:1==e?n.firstChild:2==e?n:null,o.forEach(function(t){
if(s)t=t.cloneNode(!0);else if(!r)return C(t).remove();
N(r.insertBefore(t,n),function(t){
null==t.nodeName||"SCRIPT"!==t.nodeName.toUpperCase()||t.type&&"text/javascript"!==t.type||t.src||window.eval.call(window,t.innerHTML);
});
});
});
},C.fn[i?n+"To":"insert"+(e?"Before":"After")]=function(t){
return C(t)[n](this),this;
};
});
for(var K in C.fn)X.Z[K]=C.fn[K];
return X.uniq=S,X.deserializeValue=w,C.zepto=X,C;
}();
window.Zepto=t,void 0===window.$&&(window.$=t);
});;define('page/pages/video.css', [], function(require, exports, module) {
	return ".mpad_more{display:inline-block;vertical-align:middle;margin-left:6px;position:relative;top:-1px;width:16px;height:12px;left:0}.mpad_more:before{content:' ';display:block;width:12px;height:6px;background:url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAANCAYAAACzbK7QAAAAAXNSR0IArs4c6QAAALlJREFUOBFjXLRoETczM3NTdHR0MQMVwdKlS3v\/\/v1bxwQy88+fP5FAgT3UMh9kFshMkHmMIALki\/\/\/\/99mYWG5BvSJC0iMXAA1XIuRkVE1Li7uK9gCkGHUsATdcJC5cAsotQSb4RgWkGsJLsOxWkCqJfgMx2kBsZYQMhyvBYQsIcZwghbgsoRYw4myAN0SEB+YieDpHMTHB1CSKT6FoHwCzDwvgBkSpEwClInwqSdLbt68eaIgTIpmALM0rc2QYhZLAAAAAElFTkSuQmCC) no-repeat center;background-size:cover;position:absolute;top:50%;margin-top:-3px;left:0}.mpad_more_list{background-color:#fff;position:absolute;right:-13px;top:17px;z-index:11;min-width:74px;list-style-type:none;max-width:initial!important}.mpad_more_list:before{content:\" \";position:absolute;top:0;left:0;right:0;border:1px solid #e1e1e1;width:200%;height:200%;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-webkit-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:0 0;transform-origin:0 0;z-index:-1}.mpad_more_list_ele{position:relative}.mpad_more_list_ele:last-child .mpad_more_list_ele_container:after{display:none}.mpad_more_list_ele:last-child:before{display:none}.mpad_more_list_ele_container{cursor:auto;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;display:block;height:30px;line-height:30px;width:100%;text-align:center;z-index:2;font-size:14px;box-sizing:content-box}.mpad_more_list_ele_container:active{background-color:#ececec}.mpad_more_list_ele_container:after{display:block;content:\" \";position:absolute;bottom:0;left:10px;right:10px;border-bottom:1px solid #e1e1e1;height:0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5);-webkit-transform-origin:0 0;transform-origin:0 0}[class^=\"weui-icon-\"],[class*=\" weui-icon-\"]{display:inline-block;vertical-align:middle;width:24px;height:24px;-webkit-mask-position:50% 50%;mask-position:50% 50%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100%;mask-size:100%;background-color:currentColor}.weui-icon-circle{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%221000%22%20height%3D%221000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M500%20916.667C269.881%20916.667%2083.333%20730.119%2083.333%20500%2083.333%20269.881%20269.881%2083.333%20500%2083.333c230.119%200%20416.667%20186.548%20416.667%20416.667%200%20230.119-186.548%20416.667-416.667%20416.667zm0-50c202.504%200%20366.667-164.163%20366.667-366.667%200-202.504-164.163-366.667-366.667-366.667-202.504%200-366.667%20164.163-366.667%20366.667%200%20202.504%20164.163%20366.667%20366.667%20366.667z%22%20fill-rule%3D%22evenodd%22%20fill-opacity%3D%22.9%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%221000%22%20height%3D%221000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M500%20916.667C269.881%20916.667%2083.333%20730.119%2083.333%20500%2083.333%20269.881%20269.881%2083.333%20500%2083.333c230.119%200%20416.667%20186.548%20416.667%20416.667%200%20230.119-186.548%20416.667-416.667%20416.667zm0-50c202.504%200%20366.667-164.163%20366.667-366.667%200-202.504-164.163-366.667-366.667-366.667-202.504%200-366.667%20164.163-366.667%20366.667%200%20202.504%20164.163%20366.667%20366.667%20366.667z%22%20fill-rule%3D%22evenodd%22%20fill-opacity%3D%22.9%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-download{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M11.25%2012.04l-1.72-1.72-1.06%201.06%202.828%202.83a1%201%200%20001.414-.001l2.828-2.828-1.06-1.061-1.73%201.73V7h-1.5v5.04zm0-5.04V2h1.5v5h6.251c.55%200%20.999.446.999.996v13.008a.998.998%200%2001-.996.996H4.996A.998.998%200%20014%2021.004V7.996A1%201%200%20014.999%207h6.251z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M11.25%2012.04l-1.72-1.72-1.06%201.06%202.828%202.83a1%201%200%20001.414-.001l2.828-2.828-1.06-1.061-1.73%201.73V7h-1.5v5.04zm0-5.04V2h1.5v5h6.251c.55%200%20.999.446.999.996v13.008a.998.998%200%2001-.996.996H4.996A.998.998%200%20014%2021.004V7.996A1%201%200%20014.999%207h6.251z%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-info{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-.75-12v7h1.5v-7h-1.5zM12%209a1%201%200%20100-2%201%201%200%20000%202z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-.75-12v7h1.5v-7h-1.5zM12%209a1%201%200%20100-2%201%201%200%20000%202z%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-safe-success{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201000%201000%22%3E%3Cpath%20d%3D%22M500.9%204.6C315.5%2046.7%20180.4%2093.1%2057.6%20132c0%20129.3.2%20231.7.2%20339.7%200%20304.2%20248.3%20471.6%20443.1%20523.7C695.7%20943.3%20944%20775.9%20944%20471.7c0-108%20.2-210.4.2-339.7C821.4%2093.1%20686.3%2046.7%20500.9%204.6zm248.3%20349.1l-299.7%20295c-2.1%202-5.3%202-7.4-.1L304.4%20506.1c-2-2.1-2.3-5.7-.6-8l18.3-24.9c1.7-2.3%205-2.8%207.2-1l112.2%2086c2.3%201.8%206%201.7%208.1-.1l274.7-228.9c2.2-1.8%205.7-1.7%207.7.3l17%2016.8c2.2%202.1%202.2%205.3.2%207.4z%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23070202%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201000%201000%22%3E%3Cpath%20d%3D%22M500.9%204.6C315.5%2046.7%20180.4%2093.1%2057.6%20132c0%20129.3.2%20231.7.2%20339.7%200%20304.2%20248.3%20471.6%20443.1%20523.7C695.7%20943.3%20944%20775.9%20944%20471.7c0-108%20.2-210.4.2-339.7C821.4%2093.1%20686.3%2046.7%20500.9%204.6zm248.3%20349.1l-299.7%20295c-2.1%202-5.3%202-7.4-.1L304.4%20506.1c-2-2.1-2.3-5.7-.6-8l18.3-24.9c1.7-2.3%205-2.8%207.2-1l112.2%2086c2.3%201.8%206%201.7%208.1-.1l274.7-228.9c2.2-1.8%205.7-1.7%207.7.3l17%2016.8c2.2%202.1%202.2%205.3.2%207.4z%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23070202%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-safe-warn{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201000%201000%22%3E%3Cpath%20d%3D%22M500.9%204.5c-185.4%2042-320.4%2088.4-443.2%20127.3%200%20129.3.2%20231.7.2%20339.6%200%20304.1%20248.2%20471.4%20443%20523.6%20194.7-52.2%20443-219.5%20443-523.6%200-107.9.2-210.3.2-339.6C821.3%2092.9%20686.2%2046.5%20500.9%204.5zm-26.1%20271.1h52.1c5.8%200%2010.3%204.7%2010.1%2010.4l-11.6%20313.8c-.1%202.8-2.5%205.2-5.4%205.2h-38.2c-2.9%200-5.3-2.3-5.4-5.2L464.8%20286c-.2-5.8%204.3-10.4%2010-10.4zm26.1%20448.3c-20.2%200-36.5-16.3-36.5-36.5s16.3-36.5%2036.5-36.5%2036.5%2016.3%2036.5%2036.5-16.4%2036.5-36.5%2036.5z%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23020202%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201000%201000%22%3E%3Cpath%20d%3D%22M500.9%204.5c-185.4%2042-320.4%2088.4-443.2%20127.3%200%20129.3.2%20231.7.2%20339.6%200%20304.1%20248.2%20471.4%20443%20523.6%20194.7-52.2%20443-219.5%20443-523.6%200-107.9.2-210.3.2-339.6C821.3%2092.9%20686.2%2046.5%20500.9%204.5zm-26.1%20271.1h52.1c5.8%200%2010.3%204.7%2010.1%2010.4l-11.6%20313.8c-.1%202.8-2.5%205.2-5.4%205.2h-38.2c-2.9%200-5.3-2.3-5.4-5.2L464.8%20286c-.2-5.8%204.3-10.4%2010-10.4zm26.1%20448.3c-20.2%200-36.5-16.3-36.5-36.5s16.3-36.5%2036.5-36.5%2036.5%2016.3%2036.5%2036.5-16.4%2036.5-36.5%2036.5z%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20fill%3D%22%23020202%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-success{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-1.177-7.86l-2.765-2.767L7%2012.431l3.119%203.121a1%201%200%20001.414%200l5.952-5.95-1.062-1.062-5.6%205.6z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-1.177-7.86l-2.765-2.767L7%2012.431l3.119%203.121a1%201%200%20001.414%200l5.952-5.95-1.062-1.062-5.6%205.6z%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-success-circle{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm0-1.2a8.8%208.8%200%20100-17.6%208.8%208.8%200%20000%2017.6zm-1.172-6.242l5.809-5.808.848.849-5.95%205.95a1%201%200%2001-1.414%200L7%2012.426l.849-.849%202.98%202.98z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm0-1.2a8.8%208.8%200%20100-17.6%208.8%208.8%200%20000%2017.6zm-1.172-6.242l5.809-5.808.848.849-5.95%205.95a1%201%200%2001-1.414%200L7%2012.426l.849-.849%202.98%202.98z%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-success-no-circle{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8.657%2018.435L3%2012.778l1.414-1.414%204.95%204.95L20.678%205l1.414%201.414-12.02%2012.021a1%201%200%2001-1.415%200z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8.657%2018.435L3%2012.778l1.414-1.414%204.95%204.95L20.678%205l1.414%201.414-12.02%2012.021a1%201%200%2001-1.415%200z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-waiting{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.75%2011.38V6h-1.5v6l4.243%204.243%201.06-1.06-3.803-3.804zM12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.75%2011.38V6h-1.5v6l4.243%204.243%201.06-1.06-3.803-3.804zM12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-waiting-circle{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.6%2011.503l3.891%203.891-.848.849L11.4%2012V6h1.2v5.503zM12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm0-1.2a8.8%208.8%200%20100-17.6%208.8%208.8%200%20000%2017.6z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.6%2011.503l3.891%203.891-.848.849L11.4%2012V6h1.2v5.503zM12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm0-1.2a8.8%208.8%200%20100-17.6%208.8%208.8%200%20000%2017.6z%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-warn{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-.763-15.864l.11%207.596h1.305l.11-7.596h-1.525zm.759%2010.967c.512%200%20.902-.383.902-.882%200-.5-.39-.882-.902-.882a.878.878%200%2000-.896.882c0%20.499.396.882.896.882z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm-.763-15.864l.11%207.596h1.305l.11-7.596h-1.525zm.759%2010.967c.512%200%20.902-.383.902-.882%200-.5-.39-.882-.902-.882a.878.878%200%2000-.896.882c0%20.499.396.882.896.882z%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-info-circle{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm0-1.2a8.8%208.8%200%20100-17.6%208.8%208.8%200%20000%2017.6zM11.4%2010h1.2v7h-1.2v-7zm.6-1a1%201%200%20110-2%201%201%200%20010%202z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm0-1.2a8.8%208.8%200%20100-17.6%208.8%208.8%200%20000%2017.6zM11.4%2010h1.2v7h-1.2v-7zm.6-1a1%201%200%20110-2%201%201%200%20010%202z%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-cancel{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm0-1.2a8.8%208.8%200%20100-17.6%208.8%208.8%200%20000%2017.6z%22%20fill-rule%3D%22nonzero%22%2F%3E%3Cpath%20d%3D%22M12.849%2012l3.11%203.111-.848.849L12%2012.849l-3.111%203.11-.849-.848L11.151%2012l-3.11-3.111.848-.849L12%2011.151l3.111-3.11.849.848L12.849%2012z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm0-1.2a8.8%208.8%200%20100-17.6%208.8%208.8%200%20000%2017.6z%22%20fill-rule%3D%22nonzero%22%2F%3E%3Cpath%20d%3D%22M12.849%2012l3.11%203.111-.848.849L12%2012.849l-3.111%203.11-.849-.848L11.151%2012l-3.11-3.111.848-.849L12%2011.151l3.111-3.11.849.848L12.849%2012z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E)}.weui-icon-search{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M16.31%2015.561l4.114%204.115-.848.848-4.123-4.123a7%207%200%2011.857-.84zM16.8%2011a5.8%205.8%200%2010-11.6%200%205.8%205.8%200%200011.6%200z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M16.31%2015.561l4.114%204.115-.848.848-4.123-4.123a7%207%200%2011.857-.84zM16.8%2011a5.8%205.8%200%2010-11.6%200%205.8%205.8%200%200011.6%200z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-clear{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M13.06%2012l3.006-3.005-1.06-1.06L12%2010.938%208.995%207.934l-1.06%201.06L10.938%2012l-3.005%203.005%201.06%201.06L12%2013.062l3.005%203.005%201.06-1.06L13.062%2012zM12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M13.06%2012l3.006-3.005-1.06-1.06L12%2010.938%208.995%207.934l-1.06%201.06L10.938%2012l-3.005%203.005%201.06%201.06L12%2013.062l3.005%203.005%201.06-1.06L13.062%2012zM12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010z%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-back{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm1.999-6.563L10.68%2012%2014%208.562%2012.953%207.5%209.29%2011.277a1.045%201.045%200%20000%201.446l3.663%203.777L14%2015.437z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm1.999-6.563L10.68%2012%2014%208.562%2012.953%207.5%209.29%2011.277a1.045%201.045%200%20000%201.446l3.663%203.777L14%2015.437z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-delete{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6.774%206.4l.812%2013.648a.8.8%200%2000.798.752h7.232a.8.8%200%2000.798-.752L17.226%206.4H6.774zm11.655%200l-.817%2013.719A2%202%200%200115.616%2022H8.384a2%202%200%2001-1.996-1.881L5.571%206.4H3.5v-.7a.5.5%200%2001.5-.5h16a.5.5%200%2001.5.5v.7h-2.071zM14%203a.5.5%200%2001.5.5v.7h-5v-.7A.5.5%200%200110%203h4zM9.5%209h1.2l.5%209H10l-.5-9zm3.8%200h1.2l-.5%209h-1.2l.5-9z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6.774%206.4l.812%2013.648a.8.8%200%2000.798.752h7.232a.8.8%200%2000.798-.752L17.226%206.4H6.774zm11.655%200l-.817%2013.719A2%202%200%200115.616%2022H8.384a2%202%200%2001-1.996-1.881L5.571%206.4H3.5v-.7a.5.5%200%2001.5-.5h16a.5.5%200%2001.5.5v.7h-2.071zM14%203a.5.5%200%2001.5.5v.7h-5v-.7A.5.5%200%200110%203h4zM9.5%209h1.2l.5%209H10l-.5-9zm3.8%200h1.2l-.5%209h-1.2l.5-9z%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-success-no-circle-thin{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8.864%2016.617l-5.303-5.303-1.061%201.06%205.657%205.657a1%201%200%20001.414%200L21.238%206.364l-1.06-1.06L8.864%2016.616z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8.864%2016.617l-5.303-5.303-1.061%201.06%205.657%205.657a1%201%200%20001.414%200L21.238%206.364l-1.06-1.06L8.864%2016.616z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-arrow{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.454%206.58l1.06-1.06%205.78%205.779a.996.996%200%20010%201.413l-5.78%205.779-1.06-1.061%205.425-5.425-5.425-5.424z%22%20fill%3D%22%23B2B2B2%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.454%206.58l1.06-1.06%205.78%205.779a.996.996%200%20010%201.413l-5.78%205.779-1.06-1.061%205.425-5.425-5.425-5.424z%22%20fill%3D%22%23B2B2B2%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-arrow-bold{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20height%3D%2224%22%20width%3D%2212%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10.157%2012.711L4.5%2018.368l-1.414-1.414%204.95-4.95-4.95-4.95L4.5%205.64l5.657%205.657a1%201%200%20010%201.414z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20height%3D%2224%22%20width%3D%2212%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10.157%2012.711L4.5%2018.368l-1.414-1.414%204.95-4.95-4.95-4.95L4.5%205.64l5.657%205.657a1%201%200%20010%201.414z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-back-arrow{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M3.343%2012l7.071%207.071L9%2020.485l-7.778-7.778a1%201%200%20010-1.414L9%203.515l1.414%201.414L3.344%2012z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M3.343%2012l7.071%207.071L9%2020.485l-7.778-7.778a1%201%200%20010-1.414L9%203.515l1.414%201.414L3.344%2012z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-back-arrow-thin{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%2019.438L8.955%2020.5l-7.666-7.79a1.02%201.02%200%20010-1.42L8.955%203.5%2010%204.563%202.682%2012%2010%2019.438z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M10%2019.438L8.955%2020.5l-7.666-7.79a1.02%201.02%200%20010-1.42L8.955%203.5%2010%204.563%202.682%2012%2010%2019.438z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-close{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2010.586l5.657-5.657%201.414%201.414L13.414%2012l5.657%205.657-1.414%201.414L12%2013.414l-5.657%205.657-1.414-1.414L10.586%2012%204.929%206.343%206.343%204.93%2012%2010.586z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2010.586l5.657-5.657%201.414%201.414L13.414%2012l5.657%205.657-1.414%201.414L12%2013.414l-5.657%205.657-1.414-1.414L10.586%2012%204.929%206.343%206.343%204.93%2012%2010.586z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-close-thin{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.25%2010.693L6.057%204.5%205%205.557l6.193%206.193L5%2017.943%206.057%2019l6.193-6.193L18.443%2019l1.057-1.057-6.193-6.193L19.5%205.557%2018.443%204.5z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.25%2010.693L6.057%204.5%205%205.557l6.193%206.193L5%2017.943%206.057%2019l6.193-6.193L18.443%2019l1.057-1.057-6.193-6.193L19.5%205.557%2018.443%204.5z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-back-circle{-webkit-mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm0-1.2a8.8%208.8%200%20100-17.6%208.8%208.8%200%20000%2017.6zm1.999-5.363L12.953%2016.5%209.29%2012.723a1.045%201.045%200%20010-1.446L12.953%207.5%2014%208.563%2010.68%2012%2014%2015.438z%22%2F%3E%3C%2Fsvg%3E);mask-image:url(data:image\/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12%2022C6.477%2022%202%2017.523%202%2012S6.477%202%2012%202s10%204.477%2010%2010-4.477%2010-10%2010zm0-1.2a8.8%208.8%200%20100-17.6%208.8%208.8%200%20000%2017.6zm1.999-5.363L12.953%2016.5%209.29%2012.723a1.045%201.045%200%20010-1.446L12.953%207.5%2014%208.563%2010.68%2012%2014%2015.438z%22%2F%3E%3C%2Fsvg%3E)}.weui-icon-success{color:#07c160}.weui-icon-waiting{color:#10aeff}.weui-icon-warn{color:#fa5151}.weui-icon-info{color:#10aeff}.weui-icon-success-circle{color:#07c160}.weui-icon-success-no-circle,.weui-icon-success-no-circle-thin{color:#07c160}.weui-icon-waiting-circle{color:#10aeff}.weui-icon-circle{color:rgba(0,0,0,0.3)}.weui-icon-download{color:#07c160}.weui-icon-info-circle{color:rgba(0,0,0,0.3)}.weui-icon-safe-success{color:#07c160}.weui-icon-safe-warn{color:#ffbe00}.weui-icon-cancel{color:#fa5151}.weui-icon-search{color:rgba(0,0,0,0.5)}.weui-icon-clear{color:rgba(0,0,0,0.3)}.weui-icon-clear:active{color:rgba(0,0,0,0.5)}.weui-icon-delete.weui-icon_gallery-delete{color:#fff}.weui-icon-arrow,.weui-icon-arrow-bold,.weui-icon-back-arrow,.weui-icon-back-arrow-thin{width:12px}.weui-icon-arrow,.weui-icon-arrow-bold{color:rgba(0,0,0,0.3)}.weui-icon-back-arrow,.weui-icon-back-arrow-thin{color:rgba(0,0,0,0.9)}.weui-icon-back,.weui-icon-back-circle{color:rgba(0,0,0,0.9)}.weui-icon_msg{width:64px;height:64px}.weui-icon_msg.weui-icon-warn{color:#fa5151}.weui-icon_msg-primary{width:64px;height:64px}.weui-icon_msg-primary.weui-icon-warn{color:#ffc300}.weui-textarea{-webkit-tap-highlight-color:rgba(0,0,0,0);background-color:transparent;display:block;border:0;resize:none;width:100%;color:inherit;font-size:1em;line-height:inherit;outline:0}.weui-flex{display:-webkit-box;display:-webkit-flex;display:flex}.weui-flex__item{-webkit-box-flex:1;-webkit-flex:1;flex:1}.weui-btn{position:relative;display:block;width:184px;margin-left:auto;margin-right:auto;padding:8px 24px;box-sizing:border-box;font-weight:700;font-size:17px;text-align:center;text-decoration:none;color:#fff;line-height:1.41176471;border-radius:4px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden}.weui-btn_block{width:auto}.weui-btn_inline{display:inline-block}.weui-btn_default{color:#06ae56;background-color:#f2f2f2}.weui-btn_default:not(.weui-btn_disabled):visited{color:#06ae56}.weui-btn_default:not(.weui-btn_disabled):active{color:#06ae56;background-color:#d9d9d9}.weui-btn_primary{background-color:#07c160}.weui-btn_primary:not(.weui-btn_disabled):visited{color:#fff}.weui-btn_primary:not(.weui-btn_disabled):active{color:#fff;background-color:#06ad56}.weui-btn_warn{color:#fa5151;background-color:#f2f2f2}.weui-btn_warn:not(.weui-btn_disabled):visited{color:#fa5151}.weui-btn_warn:not(.weui-btn_disabled):active{color:#fa5151;background-color:#d9d9d9}.weui-btn_disabled{color:rgba(0,0,0,0.18);background-color:#fafafa}.weui-btn_loading .weui-loading{margin:-0.2em .34em 0 0}.weui-btn_loading.weui-btn_primary{color:#fff}.weui-btn_loading.weui-btn_default{background-color:#d9d9d9}.weui-btn_loading.weui-btn_primary{background-color:#06ad56}.weui-btn_loading.weui-btn_warn{background-color:#d9d9d9}.weui-btn_plain-primary{color:#07c160;border:1px solid #1aad19}.weui-btn_plain-primary:not(.weui-btn_plain-disabled):active{color:#06ae56;border-color:#179c16;background-color:rgba(0,0,0,0.1)}.weui-btn_plain-primary:after{border-width:0}.weui-btn_plain-default{color:#353535;border:1px solid #353535}.weui-btn_plain-default:not(.weui-btn_plain-disabled):active{color:#323232;border-color:#323232;background-color:rgba(0,0,0,0.1)}.weui-btn_plain-default:after{border-width:0}.weui-btn_plain-disabled{color:rgba(0,0,0,0.2);border-color:rgba(0,0,0,0.2)}.weui-btn_cell{position:relative;display:block;margin-left:auto;margin-right:auto;box-sizing:border-box;font-weight:700;font-size:17px;text-align:center;text-decoration:none;color:#fff;line-height:1.41176471;padding:16px;-webkit-tap-highlight-color:rgba(0,0,0,0);overflow:hidden;background-color:#fff}.weui-btn_cell+.weui-btn_cell{margin-top:16px}.weui-btn_cell:active{background-color:#ececec}.weui-btn_cell__icon{display:inline-block;vertical-align:middle;width:24px;height:24px;margin:-0.2em .34em 0 0}.weui-btn_cell-default{color:rgba(0,0,0,0.9)}.weui-btn_cell-primary{color:#576b95}.weui-btn_cell-warn{color:#fa5151}button.weui-btn,input.weui-btn{border-width:0;outline:0;-webkit-appearance:none}button.weui-btn:focus,input.weui-btn:focus{outline:0}button.weui-btn_inline,input.weui-btn_inline,button.weui-btn_mini,input.weui-btn_mini{width:auto}button.weui-btn_plain-primary,input.weui-btn_plain-primary,button.weui-btn_plain-default,input.weui-btn_plain-default{border-width:1px;background-color:transparent}.weui-btn_mini{display:inline-block;width:auto;padding:0 .75em;line-height:2;font-size:16px}.weui-btn+.weui-btn{margin-top:16px}.weui-btn.weui-btn_inline+.weui-btn.weui-btn_inline{margin-top:auto;margin-left:16px}html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{line-height:1.6;font-family:-apple-system-font,BlinkMacSystemFont,\"Helvetica Neue\",\"PingFang SC\",\"Hiragino Sans GB\",\"Microsoft YaHei UI\",\"Microsoft YaHei\",Arial,sans-serif;font-size:16px}body,h1,h2,h3,h4,h5,p,ul,ol,dl,dd,fieldset,textarea{margin:0}.page_video ul,.page_video ol{padding-left:0;list-style-type:none}.page_video fieldset,.page_video legend,.page_video textarea,.page_video input,.page_video button{padding:0}.page_video button,.page_video input,.page_video select,.page_video textarea{font-family:inherit;font-size:100%;margin:0;*font-family:-apple-system-font,BlinkMacSystemFont,\"Helvetica Neue\",\"PingFang SC\",\"Hiragino Sans GB\",\"Microsoft YaHei UI\",\"Microsoft YaHei\",Arial,sans-serif}.page_video a img,.page_video fieldset{border:0}.page_video a{text-decoration:none}a{color:#576b95;text-decoration:none}.tips_global{color:#888}.tc{text-align:center}.tr{text-align:right}.line_wrp{line-height:58px;color:#576b95}body,html{-webkit-appearance:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.none{display:none}.clearfix:after{content:\" \";display:block;clear:both;height:0}.clearfix{zoom:1}.wrp_pop_tips{width:100%;height:100%;background-color:#000;position:absolute;left:0;top:0;z-index:20;line-height:100%;text-align:center}.wrp_pop_tips .pop_tips{position:absolute;top:50%;left:0;margin-top:-36px;display:inline-block;padding:15px 0;text-align:center;color:#fff;width:100%}.wrp_pop_tips .pop_tips .error_code{display:block;font-style:normal;font-size:12px;color:#888;margin-top:10px}.wrp_load_failed{width:100%;height:100%;background-color:#000;position:absolute;left:0;top:0;z-index:20;line-height:100%;text-align:center}.wrp_load_failed .wrp_icon_info{width:60px;height:60px;border-radius:100%;-moz-border-radius:100%;-webkit-border-radius:100%;border:1px solid #fff;position:absolute;left:50%;top:50%;display:block;margin-left:-30px;margin-top:-50px}.wrp_load_failed .wrp_icon_info:after{content:\"\";position:absolute;left:50%;top:50%;display:block;width:50px;height:50px;margin-left:-25px;margin-top:-25px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/video\/icon_load_faild42f400.png) no-repeat 0 0;background-size:100% auto}.wrp_load_failed p{width:100%;height:60px;position:absolute;top:50%;display:block;margin-top:30px;color:#fff}.page_video{max-height:100%;position:relative;background-color:#000}.page_video .wrp_loading{width:100%;height:100%;position:absolute;left:0;top:0;z-index:8}.page_video .wrp_loading .svg_loader{position:absolute;left:50%;top:50%;margin-left:-30px;margin-top:-30px}.page_video .wrp_loading.start_loading .mid_opr{width:100%;height:100%;top:0;left:0;bottom:0;right:0;margin:0}.page_video .mid_opr{width:52px;height:52px;position:absolute;left:50%;top:50%;margin-left:-26px;margin-top:-26px;z-index:10;background-color:rgba(0,0,0,0.5);text-align:center;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;color:#fff}.page_video .mid_opr .spinner{transform:scale(0.7);-webkit-transform:scale(0.7);-moz-transform:scale(0.7);-ms-transform:scale(0.7)}.page_video .mid_opr .icon_mid_play{display:inline-block;width:0;height:0;margin-top:25px;margin-left:25px;border-width:14px 25px;overflow:hidden;border-color:transparent transparent transparent #fff;border-style:dotted dotted dotted solid}.page_video .mid_opr .icon_mid_speed_play{display:inline-block;width:35px;height:20px;margin-top:27px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/video\/icon_speed_play42f400.png) no-repeat 0 0;background-size:100% auto}.page_video .mid_opr .video_length{color:#cbcbcb;font-size:12px}.page_video .mid_opr .video_length .played_time{color:#fff;font-weight:400}.page_video .mid_opr .video_length em{margin:0 2px}.page_video .mid_opr.fast_pre_next{width:132px;height:52px;border-radius:3px;margin-left:-66px;margin-top:-26px;background-color:rgba(0,0,0,0.5)}.page_video .mid_opr.fast_pre_next .video_length{padding-top:10px;padding-bottom:7px;font-weight:300}.page_video .mid_opr .video_processor_bar{position:relative;margin:0 auto;width:106px;height:3px;border-radius:2px;background-color:rgba(0,0,0,0.4);text-align:left}.page_video .mid_opr .processor_bar_inner{position:absolute;display:inline-block;width:106px;height:3px;border-radius:2px;background-color:#09bb07;opacity:.9}.page_video .mid_opr.next .icon_mid_speed_play{transform:rotate(180deg);-webkit-transform:rotate(180deg)}.page_video .full_screen_opr{z-index:12;text-align:center;position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(0,0,0,0.5)}.page_video .full_screen_opr .icon_mid_play{display:inline-block;width:0;height:0;margin-top:25px;margin-left:25px;border-width:14px 25px;overflow:hidden;border-color:transparent transparent transparent #fff;border-style:dotted dotted dotted solid}.page_video .full_screen_opr .video_length{color:#fefefe;font-size:12px}.page_video .full_screen_opr .video_length .played_time{color:#fff;font-weight:400}.page_video .full_screen_opr .video_length em{margin:0 2px}.page_video .full_screen_opr .mid_play_box{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%)}.page_video .full_screen_opr .mid_play_box .video_length{font-size:14px;font-weight:300}.page_video .full_screen_opr .mid_play_box .video_length:before{content:\"\u603b\u65f6\u957f\";position:absolute;left:-9999em}.page_video .poster_cover{text-align:center;position:absolute;overflow:hidden;left:0;top:0;z-index:7;width:100%;height:100%;background-size:contain;background-position:50% 50%;background-repeat:no-repeat}.page_video .poster_cover img{height:100%;width:100%;position:absolute;left:0;top:50%;transform:translateY(-50%);-webkit-transform:translateY(-50%)}.page_video .poster_cover_mask{position:absolute;top:0;bottom:0;left:0;right:0;background-color:rgba(0,0,0,0.35)}.page_video .continue_play{position:absolute;left:0;top:0;right:0;bottom:0;z-index:11;color:#fff;font-size:14px;background-color:#000}.page_video .continue_play .continue_opr{position:absolute;text-align:right;bottom:15px;right:4%;z-index:2}.page_video .continue_play .continue_opr .btn_replay{color:#fff}.page_video .continue_play .continue_opr .icon_replay{display:inline-block;width:12px;height:13px;margin-right:5px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/video\/icon_replay42f400.png) no-repeat 0 0;background-size:100% auto;vertical-align:middle}.page_video .continue_play .continue_nav{position:absolute;z-index:3;bottom:15px;left:50%;margin-left:-20px;width:40px}.page_video .continue_play .continue_nav .nav_dot{width:4px;height:4px;font-size:0;text-indent:-999em;display:inline-block;border-radius:100%;-moz-border-radius:100%;-webkit-border-radius:100%;border:1px solid #949494;margin-right:3px}.page_video .continue_play .continue_nav .nav_dot.current{background-color:#fff;border-color:#fff}.page_video .continue_play .tit_desc{width:94%;position:absolute;height:150px;top:50%;margin-top:-98px;left:50%;margin-left:-47%;color:#959494;text-align:left}.page_video .continue_play .tit_desc span{display:block;border-bottom:1px solid #2c2c2c;padding-bottom:8px}.page_video .continue_play .wrp_video_continue{position:relative;height:100%;left:0;top:0}.page_video .continue_play .dl_video_continue{position:absolute;height:100%;left:0;right:0;top:0;z-index:1}.page_video .continue_play .dd_continue_inner{width:100%;position:relative;top:50%;height:150px;margin-top:-68px;text-align:center;z-index:0}.page_video .continue_play .dd_continue_inner .video_list{display:table;width:94%;text-align:left;margin:15px auto 0;font-size:12px}.page_video .continue_play .dd_continue_inner .video_list .video_item{height:35px;margin-bottom:15px}.page_video .continue_play .dd_continue_inner .video_list .video_item .inner_item{display:block;position:relative;color:#fff}.page_video .continue_play .dd_continue_inner .video_list .video_item .inner_item .cover{width:60px;height:35px;position:absolute;left:0;top:0}.page_video .continue_play .dd_continue_inner .video_list .video_item .inner_item .desc{padding-left:70px;margin-top:-5px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;box-sizing:border-box;-webkit-box-sizing:border-box}.page_video .continue_play .dd_continue_inner .video_list .video_item:last-child{margin-bottom:0}.page_video .video_mask{width:100%;height:100%;background-color:rgba(0,0,0,0.5);position:absolute;left:0;top:0;z-index:1}.page_video .inner{position:relative;width:100%;height:100%;z-index:6;overflow:hidden}.page_video .inner .video_poster{width:100%;height:100%}.page_video .inner .video_poster video{width:100%;height:100%;vertical-align:middle;position:relative;z-index:1;padding:0;top:0}.page_video .inner .video_poster .video_mask{width:100%;height:100%;vertical-align:middle;position:absolute;z-index:2;background-color:transparent}.page_video .video_opr{color:#fff;z-index:9;position:absolute;left:0;right:0;bottom:0;color:#cbcbcb;height:50px;font-size:14px;background-image:-o-linear-gradient(top,rgba(0,0,0,0) 0,rgba(0,0,0,0.5) 100%);background-color:rgba(0,0,0,0.3);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,rgba(0,0,0,0)),to(rgba(0,0,0,0.5)));background-image:linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,0.5) 100%)}.page_video .video_opr .opr_inner{padding:0 15px;position:relative;overflow:hidden}.page_video .video_opr .opr_inner .opr_inner_fl{position:absolute;left:15px;top:0}.page_video .video_opr .opr_inner .opr_inner_fr{position:absolute;right:15px;top:0}.page_video .video_opr .opr_inner .wrp_play_bar{padding:24px 90px 23px 82px;box-sizing:border-box;-webkit-box-sizing:border-box}.page_video .video_opr .opr_inner_fl .switch{display:inline-block;vertical-align:middle;padding:16px 12px 12px 0;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-appearance:none}.page_video .video_opr .opr_inner_fl .switch .btn_opr{width:15px;height:18px;display:inline-block;text-indent:-999em}.page_video .video_opr .opr_inner_fl .switch.switch_on .btn_opr{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/video\/icon_play_small42f400.png) no-repeat 0 0;background-size:100% auto}.page_video .video_opr .opr_inner_fl .switch.switch_off .btn_opr{background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAkCAYAAACe0YppAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw\/eHBhY2tldCBiZWdpbj0i77u\/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTg1RjJGODBGQTBBMTFFNEI2QUJCQjU2OEZFMTFENzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTg1RjJGODFGQTBBMTFFNEI2QUJCQjU2OEZFMTFENzYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxODVGMkY3RUZBMEExMUU0QjZBQkJCNTY4RkUxMUQ3NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxODVGMkY3RkZBMEExMUU0QjZBQkJCNTY4RkUxMUQ3NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI\/PmECzPoAAABRSURBVHja7NgxDgAgCEPRYjye1\/V8qIOjii4uvwkTKW\/H3F2L1D5jWXSXUM828FzYJRzqJX0KMDAwMDAwMDAwMDAwMDCwlA8vBXu4Geo1AQYA08wNr4Eto7IAAAAASUVORK5CYII=) no-repeat 0 0;background-size:100% auto}.page_video .video_opr .opr_inner_fl .played_time{display:inline-block;vertical-align:middle;color:#fff;font-size:12px;padding:14px 0;font-weight:300}.page_video .video_opr .wrp_play_bar .wrp_progress{position:relative;-webkit-appearance:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.page_video .video_opr .wrp_play_bar .wrp_progress .progress_bar{height:3px;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px;background-color:#454545;position:relative}.page_video .video_opr .wrp_play_bar .wrp_progress .progress_bar .played_bar{position:absolute;height:3px;left:0;top:0;background-color:#fff;z-index:4;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px}.page_video .video_opr .wrp_play_bar .wrp_progress .progress_bar .buffer_bar{position:absolute;height:3px;left:0;top:0;background-color:#a2a2a2;z-index:3;border-radius:10px;-moz-border-radius:10px;-webkit-border-radius:10px}.page_video .video_opr .wrp_play_bar .wrp_progress .progress_bar .wrp_speed_dot{position:absolute;left:-1px;top:50%;margin-top:-10px;width:20px;height:20px;line-height:15px;z-index:5}.page_video .video_opr .wrp_play_bar .wrp_progress .progress_bar .wrp_speed_dot .speed_dot{width:12px;height:12px;position:absolute;top:50%;margin-top:-6px;background-color:#fff;border-radius:100%;-moz-border-radius:100%;-webkit-border-radius:100%;margin-left:-1px}.page_video .video_opr .opr_inner_fr .total_time{color:#fff;font-size:12px;display:inline-block;padding:14px 0;top:-1px;position:relative;font-weight:300}.page_video .video_opr .opr_inner_fr .screenSize_control{display:inline-block;vertical-align:middle;padding:14px 0 14px 8px;-webkit-appearance:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.page_video .video_opr .opr_inner_fr .screenSize_control .icon_control{width:18px;height:18px;display:inline-block;text-indent:-999em;background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAYVJREFUWAnt2DtOwzAYB\/DmsaGoGwdAygHyYunOAkdAnIudjZkuSHCAJkuy0gvAxkgUKXz\/CEskcRLbdWwGLEVuP79+tVvb6mbzx5IDT1EU723bnsvYHMfZp2l6I9NGpK6LSrIYkY5V6\/jDhvTJPwl4lWXZYVhm4n03Q2ygH8yW8uc8zy9Z3GTeA2FmbKN6ICyTbVQPhKWxjRqBbKO4IJuoSZAt1CzIBmoRZBolBDKJ6kC0Ge7xYOC5xNsSqqq6mGsjW9ad9rKNcKzgeKFNdOt53l0cxw+yfUzVVwKhM8xM0zS7IAgewzD8mhrgP657BpSXjAcpy\/Ksrutb13VfkiQ58uosxYR\/9ksdoRwYyu7py16o3qe0gnzff1W5T9Gd\/gkPPpRWUBRFbyr3KWpzjUc7CB3yNk+Z5dM6QwAhnYJaBXQKajWQKmpVkApqdZAsyghIBmUMJIoyCppCIc6ScRAGHu5TDIN89O\/H70LV1ziX2FEw1wfVGRVbmaGRggJ0KH\/w4tZj37PhT+ObZtthAAAAAElFTkSuQmCC) no-repeat 0 0;background-size:18px 18px}.full_mask{position:fixed;bottom:0;top:0;left:0;right:0;z-index:1;background-color:#000;display:none}.full_screen_mv .page_video{position:absolute;left:50%;top:50%;margin-left:-150px;margin-top:-100px;background-color:#000;z-index:10}.full_screen_mv .page_video .inner{overflow:visible;position:absolute;left:0;top:0}.full_screen_mv .page_video .inner .video_poster video{background-color:#000;max-height:100%;max-width:100%;display:inline-block}.full_screen_mv .page_video .video_opr{position:fixed;bottom:0}.full_screen_mv .page_video .video_opr .screenSize_control .icon_control{background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/video\/icon_rebackplay@2x42f400.png) no-repeat 0 0;background-size:100% auto}.full_screen_mv .page_content{height:100%;overflow:hidden}.full_screen_mv .full_mask{display:block}@media all and (orientation:portrait){.full_screen_mv .opr_fade_out{-webkit-animation:opr_fade_out .4s ease-in-out 1}.full_screen_mv .opr_fade_in{-webkit-animation:opr_fade_in .4s ease-in-out 1}@-webkit-keyframes opr_fade_out{0%{filter:alpha(opacity = 100);-moz-opacity:1;-khtml-opacity:1;opacity:1}100%{filter:alpha(opacity = 0);-moz-opacity:0;-khtml-opacity:0;opacity:0}}@-webkit-keyframes opr_fade_in{0%{filter:alpha(opacity = 0);-moz-opacity:0;-khtml-opacity:0;opacity:0}100%{bottom:0;filter:alpha(opacity = 100);-moz-opacity:1;-khtml-opacity:1;opacity:1}}}@media all and (orientation:landscape){.full_screen_mv .page_video .video_opr .opr_inner{padding:0 25px}.full_screen_mv .page_video .video_opr .opr_inner .opr_inner_fl{left:25px}.full_screen_mv .page_video .video_opr .opr_inner .opr_inner_fr{right:25px}}.interact_video{text-align:right;background-color:#f7f7f7;line-height:2.5;overflow:hidden;font-size:11px;padding:0 10px;font-size:14px;position:relative;border-bottom-left-radius:2px;-moz-border-radius-bottomleft:2px;-webkit-border-bottom-left-radius:2px;border-bottom-right-radius:2px;-moz-border-radius-bottomright:2px;-webkit-border-bottom-right-radius:2px}.interact_video:before{display:none;content:\" \";position:absolute;top:0;left:0;border:1px solid #e6e6e6;border-bottom-left-radius:4px;-moz-border-radius-bottomleft:4px;-webkit-border-bottom-left-radius:4px;border-bottom-right-radius:4px;-moz-border-radius-bottomright:4px;-webkit-border-bottom-right-radius:4px;border-top:0;width:200%;height:200%;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-webkit-transform:scale(0.5);transform:scale(0.5);-webkit-transform-origin:0 0;transform-origin:0 0}.interact_video .access_original{-webkit-tap-highlight-color:rgba(0,0,0,0);color:#959494;position:absolute;left:0;right:0;top:0;bottom:0;text-align:left;padding:0 10px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.interact_video .access_original:after{content:\" \";display:inline-block;height:7px;width:7px;border-width:1px 1px 0 0;border-color:#c8c7cd;border-style:solid;transform:matrix(0.71,0.71,-0.71,0.71,0,0);-ms-transform:matrix(0.71,0.71,-0.71,0.71,0,0);-webkit-transform:matrix(0.71,0.71,-0.71,0.71,0,0);position:relative;top:-2px;top:-1px;margin-left:.3em;display:none}.interact_video .video_original{text-align:left;padding-left:15px;padding-right:25px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.interact_video .video_original:after{position:absolute;top:50%;margin-top:-4px;right:15px}.interact_video .video_resource{float:left;color:#959494}.interact_video .inter_opr{float:left;color:#607fa6}.interact_video .inter_opr .praise_area{padding-left:10px;float:right}.interact_video .inter_opr .btn_detail{display:inline-block;text-align:center;position:relative}.interact_video .inter_opr .love_num{font-size:13px;line-height:13px}.interact_video .inter_opr .icon_love{width:12px;height:12px;vertical-align:middle;display:inline-block;vertical-align:0;position:relative;top:1px;background:transparent url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x42f400.png) no-repeat 0 0;background-size:12px auto}.interact_video .inter_opr .loved .icon_love{background-image:url(\/mmbizwap\/zh_CN\/htmledition\/images\/icon\/appmsg\/qqmusic\/icon_love_mini_sprite.2x42f400.png);background-position:0 -17px}.pages_common_area{overflow:hidden}.tc{text-align:center}.tr{text-align:right}.tips_global{color:#888}.video_info_area{margin-top:1em}.video_info_area.empty_data .praise_access_wrp{float:none}.video_info_area.empty_data .praise_user_list{padding:0}.video_info_area.empty_data .praise_access_wrp,.video_info_area.empty_data .comment_access_wrp{text-align:center}.video_info_area.empty_data .discuss_container{margin-right:15px;padding-right:0}.video_info_hd{overflow:hidden;font-size:14px;line-height:2.2em;padding:0 15px;position:relative}.video_info_hd:before{content:\" \";position:absolute;left:0;bottom:0;right:0;height:1px;border-bottom:1px solid #dfdfdd;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.video_info_bd{padding:0 0 0 15px}.video_extend_inner{padding-right:15px}.no_in_mm{padding-top:2em}.video_abstract{position:relative;margin-top:10px;font-size:14px;padding:15px}.video_abstract .video_title{font-size:16px;font-weight:400;font-style:normal}.video_abstract .inner_abstract{padding-top:10px;color:#8c8c8c;line-height:1.6;max-height:4.7em;overflow:hidden;margin-bottom:.5em;word-wrap:break-word;word-break:break-all;-webkit-transition:max-height .3s ease-in}.video_abstract .inner_abstract.hide{position:absolute;left:15px;right:15px;visibility:hidden;z-index:-1;max-height:none}.opr_fade_out{-webkit-animation:opr_fade_out .7s ease-in-out 1}.opr_fade_in{-webkit-animation:opr_fade_in .7s ease-in-out 1}@-webkit-keyframes opr_fade_out{0%{filter:alpha(opacity = 100);-moz-opacity:1;-khtml-opacity:1;opacity:1}100%{filter:alpha(opacity = 0);-moz-opacity:0;-khtml-opacity:0;opacity:0}}@-webkit-keyframes opr_fade_in{0%{filter:alpha(opacity = 0);-moz-opacity:0;-khtml-opacity:0;opacity:0}100%{filter:alpha(opacity = 100);-moz-opacity:1;-khtml-opacity:1;opacity:1}}.video_pause_controll{position:absolute;z-index:12;left:0;top:0;width:100%;height:100%;display:none;background-color:rgba(0,0,0,0.5)}.video_pause_controll .btn_pause{position:absolute;left:50%;top:50%;z-index:10;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);text-align:center;border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;color:#fff}.video_pause_controll .btn_pause .icon_pause{display:inline-block;font-size:0;width:0;height:0;margin-top:25px;margin-left:25px;margin-bottom:25px;border-width:14px 25px;overflow:hidden;border-color:transparent transparent transparent #fff;border-style:dotted dotted dotted solid}.btn_pause_accessibility{position:absolute;left:0;top:0;width:3px;height:3px;z-index:10000;overflow:hidden;color:transparent}.btn_pause_accessibility:before{content:\"\u64ad\u653e\u89c6\u9891\"}.btn_pause_accessibility.video_playing:before{content:\"\u6682\u505c\u64ad\u653e\"}.video_ad{position:absolute;z-index:13;right:0;top:0;width:100%;height:54px;text-align:right;padding-top:4px;padding-right:10px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,rgba(51,51,51,0.43)),to(rgba(255,255,255,0)));background-image:linear-gradient(to bottom,rgba(51,51,51,0.43) 0,rgba(255,255,255,0) 100%)}.video_ad_detail{position:absolute;z-index:14;right:0;bottom:0;width:100%;height:30px}.video_ad_detail .btn_ad_detail{position:absolute;right:10px;bottom:10px;background-color:rgba(37,37,37,0.7);padding:2px 10px;border-radius:4px;font-size:12px;color:#fff}.video_ad_detail .btn_ad_detail.primary{color:#09ba07;border:1px solid #09ba07;overflow:hidden}.video_ad_detail .btn_ad_detail.with_arrow{background-color:rgba(45,45,45,0.7);padding:0;line-height:2.3;min-width:98px;text-align:center}.video_ad_detail .btn_ad_detail.with_arrow:after{content:\" \";display:inline-block;height:7px;width:7px;border-width:1px 1px 0 0;border-color:#fff;border-style:solid;transform:matrix(0.71,0.71,-0.71,0.71,0,0);-ms-transform:matrix(0.71,0.71,-0.71,0.71,0,0);-webkit-transform:matrix(0.71,0.71,-0.71,0.71,0,0);position:relative;top:-2px;top:0;margin-top:-2px;margin-left:4px;vertical-align:middle}.video_ad_detail .btn_ad_detail.with_weapp{padding:0 10px;min-width:auto}.icon26_weapp_white{display:inline-block;width:14px;height:14px;background-image:url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAY1BMVEVHcEz\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/80LMUcAAAAIHRSTlMAfBg4AeNjmS\/2\/PDnrcyG1Qt1az8ys4MhUcLc6UWcl7QkidAAAADFSURBVHhetdFJqsMwEEVRWZ0luYm79E5y97\/Kz6cQQXaATPJGDw4UpZL6OuN8a+O9vuzFOACIk91IiORUpdgB6Pz13EAyBT0A\/1+0g66gCnppHtaCXvCUyQvEgmqopR1g+Ei2SnBQkuNs3hR6oNXynBMknWl0QBNEGsCNmTRwEtEt0If3wGU6qrwNqbLFhjlD3mZPERZpT3gVtIKX1m8P3oHTcjh4FGQSNOer74Bh84MVOTGoMnaKIs6oXS71Pa63eVS\/zR\/btROXGlgZggAAAABJRU5ErkJggg==);background-size:cover;background-repeat:no-repeat;vertical-align:middle;margin-right:4px}.video_ad_time_meta{font-size:12px;margin-left:.7em;padding-left:.7em;color:#fff;position:relative}.video_ad_time_meta:before{content:\" \";width:1px;height:10px;background-color:#fff;position:absolute;left:-2px;top:50%;margin-top:-5px}.video_ad_time_meta:first-child:before{display:none}.btn_close .left_time{color:#fcd037;position:relative;margin-right:10px;font-weight:400;font-style:normal}.imgad_cover{text-align:center;position:absolute;overflow:hidden;left:0;top:0;z-index:7;width:100%;height:100%;background-size:contain;background-position:50% 50%;background-repeat:no-repeat}.imgad_cover img{height:100%;width:100%}.imgad_cover_border{border:1px solid #d8d8d8;position:absolute;left:-1px;top:-1px;right:-1px;bottom:-1px}@media(min-device-width:480px){.page_video .continue_play .continue_inner .video_list{margin-top:20px}.page_video .continue_play .continue_inner .video_list .video_item{margin-bottom:20px}.page_video .continue_play .continue_inner{height:210px;margin-top:-105px}}@media(min-device-width:360px){.video_ad_time_meta{font-size:13px}.video_ad_detail .btn_ad_detail{font-size:14px}}@media only screen and (min-width:375px){.page_video .continue_play .tit_desc{margin-top:-120px}.page_video .continue_play .dd_continue_inner{margin-top:-88px}.page_video .continue_play .dd_continue_inner .video_list{font-size:14px}.page_video .continue_play .dd_continue_inner .video_list .video_item{height:50px}.page_video .continue_play .dd_continue_inner .video_list .video_item .inner_item .cover{width:80px;height:50px}.page_video .continue_play .dd_continue_inner .video_list .video_item .inner_item .desc{padding-left:95px}}@media only screen and (min-device-width:375px) and (max-device-width:667px) and (-webkit-min-device-pixel-ratio:2){.page_video .continue_play .continue_inner .video_list{margin-top:20px}.page_video .continue_play .continue_inner .video_list .video_item{margin-bottom:20px}.page_video .continue_play .continue_inner{height:210px;margin-top:-105px}}@media only screen and (min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){.page_video .continue_play .continue_inner .video_list{margin-top:20px}.page_video .continue_play .continue_inner .video_list .video_item{margin-bottom:20px}.page_video .continue_play .continue_inner{height:210px;margin-top:-105px}.page_video .continue_play .dd_continue_inner .video_list .video_item .inner_item .desc{font-size:14px}}@-webkit-keyframes opacity-60-25-0-12{0%{opacity:.25}0.01%{opacity:.25}0.02%{opacity:1}60.01%{opacity:.25}100%{opacity:.25}}@-webkit-keyframes opacity-60-25-1-12{0%{opacity:.25}8.34333%{opacity:.25}8.35333%{opacity:1}68.3433%{opacity:.25}100%{opacity:.25}}@-webkit-keyframes opacity-60-25-2-12{0%{opacity:.25}16.6767%{opacity:.25}16.6867%{opacity:1}76.6767%{opacity:.25}100%{opacity:.25}}@-webkit-keyframes opacity-60-25-3-12{0%{opacity:.25}25.01%{opacity:.25}25.02%{opacity:1}85.01%{opacity:.25}100%{opacity:.25}}@-webkit-keyframes opacity-60-25-4-12{0%{opacity:.25}33.3433%{opacity:.25}33.3533%{opacity:1}93.3433%{opacity:.25}100%{opacity:.25}}@-webkit-keyframes opacity-60-25-5-12{0%{opacity:.270958333333333}41.6767%{opacity:.25}41.6867%{opacity:1}1.67667%{opacity:.25}100%{opacity:.270958333333333}}@-webkit-keyframes opacity-60-25-6-12{0%{opacity:.375125}50.01%{opacity:.25}50.02%{opacity:1}10.01%{opacity:.25}100%{opacity:.375125}}@-webkit-keyframes opacity-60-25-7-12{0%{opacity:.479291666666667}58.3433%{opacity:.25}58.3533%{opacity:1}18.3433%{opacity:.25}100%{opacity:.479291666666667}}@-webkit-keyframes opacity-60-25-8-12{0%{opacity:.583458333333333}66.6767%{opacity:.25}66.6867%{opacity:1}26.6767%{opacity:.25}100%{opacity:.583458333333333}}@-webkit-keyframes opacity-60-25-9-12{0%{opacity:.687625}75.01%{opacity:.25}75.02%{opacity:1}35.01%{opacity:.25}100%{opacity:.687625}}@-webkit-keyframes opacity-60-25-10-12{0%{opacity:.791791666666667}83.3433%{opacity:.25}83.3533%{opacity:1}43.3433%{opacity:.25}100%{opacity:.791791666666667}}@-webkit-keyframes opacity-60-25-11-12{0%{opacity:.895958333333333}91.6767%{opacity:.25}91.6867%{opacity:1}51.6767%{opacity:.25}100%{opacity:.895958333333333}}.app_download_container{overflow:hidden;padding:10px 12px;color:#fff;background-color:rgba(0,0,0,0.65);position:absolute;left:0;right:0;bottom:0;z-index:13}.app_download_container .app_thumb{float:left;width:45px;height:45px}.app_download_container .btn_app_download_wrp{float:right;position:relative;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;overflow:hidden;font-size:0;margin-top:10px}.app_download_container .btn_app_download{display:inline-block;border:1px solid #09ba07;text-align:center;width:3.2em;box-sizing:border-box;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;font-size:14px;color:#09ba07;line-height:1.75;position:relative;z-index:1}.app_download_container .btn_app_download.progress_text{color:#fff}.app_download_container .app_download_progress{position:absolute;top:0;bottom:0;left:0;background-color:rgba(9,186,7,0.75)}.app_download_container .app_download_info{overflow:hidden;padding:0 10px;word-wrap:break-word;word-break:break-all}.app_download_container .app_download_title{display:block;font-weight:400;font-size:17px;width:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;margin-bottom:-3px}.app_download_container .app_download_desc{font-size:15px}.inner_app_download_container{position:absolute;left:0;right:0;bottom:0;z-index:5;text-align:center;color:#fff}.inner_app_download_container .inner_app_download_bd{background-color:#459aea;display:table-cell;padding:0 20px;vertical-align:middle;word-wrap:break-word;word-break:break-all;width:2000px;height:45px}.inner_app_download_container .inner_app_download_bd.success{background-color:#09ba07}.inner_app_download_container .app_download_progress_wrp{background-color:#398bd7;height:3px;position:relative;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;overflow:hidden;margin-top:5px;margin-bottom:3px}.inner_app_download_container .app_download_progress{position:absolute;left:0;top:0;bottom:0;background-color:#fff;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px}.wx_video_msg_primary{text-align:center;font-size:0;background-color:#f6f8f9;position:relative}.wx_video_msg_primary:after{content:\" \";display:inline-block;vertical-align:middle;width:0;height:100%;overflow:hidden}.wx_video_msg_primary .weui-icon_msg{color:#ccd1d5;width:40px;height:40px}.wx_video_msg_primary_inner{display:inline-block;vertical-align:middle;font-size:12px;color:rgba(0,0,0,0.3)}.wx_video_msg_primary_text{padding-top:1em}.wx_video_error_box{position:relative;z-index:25;background-color:#262626;text-align:center;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.wx_video_error_msg{color:#fff}.wx_video_error_msg_btn{display:inline-block;padding:0 1.34em;line-height:1.7;color:#fff;margin-top:2em;-webkit-tap-highlight-color:rgba(0,0,0,0)}.wx_video_error_loading{width:26px;margin-top:-0.2em;vertical-align:middle;-webkit-animation:loading 1000ms steps(13,end) 0ms infinite;animation:loading 1000ms steps(13,end) 0ms infinite}.wx_video_error_refresh{width:17px;margin:-0.2em .34em 0 0;vertical-align:middle}.wx_video_error_code{display:block;font-style:normal;font-size:12px;color:#888;margin-top:10px}@-webkit-keyframes loading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}@keyframes loading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}.not_fullscreen .video_fill{-o-object-fit:fill;object-fit:fill}.not_fullscreen video::-webkit-media-controls-start-playback-button{display:none!important;-webkit-appearance:none}.not_fullscreen video::-webkit-media-controls{display:none!important}.video_muted_btn{position:absolute;left:5px;bottom:3px;z-index:13;line-height:300px;overflow:hidden;border-width:12px 10px;border-style:solid;border-color:transparent;background:transparent url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABCCAMAAAAYE8oxAAABRFBMVEUAAAABAQEAAAABAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEGBgb\/\/\/\/+\/v4ICAj+\/v7+\/v7\/\/\/\/+\/v78\/Pz6+vqCgoL5+fn4+Pjy8vL4+Pjv7+\/e3t7w8PDHx8evr69DQ0M7OzspKSlTU1P+\/v7+\/v79\/f319fX29vbu7u729vbc3Nzn5+fU1NTb29vr6+vk5OTX19e+vr7b29vHx8fz8\/O6urqBgYHc3NxjY2OGhob7+\/v19fX7+\/vx8fH7+\/vu7u7y8vL4+Pjs7Ozr6+vS0tLR0dHHx8fo6OiysrLY2Njb29uHh4ft7e16enpnZ2cxMTHPz89YWFjExMRlZWWTk5MoKCiEhITn5+f7+\/vi4uLq6urm5ub4+Pjj4+Pw8PCwsLDa2trNzc2fn5+MjIzf399zc3NcXFydnZ2xsbH\/\/\/9PhljfAAAAa3RSTlMABQcLDhoXER0TJzIhJfvsLPXv9+no3zTjxsW1rpqDbEouJyAR+fLg0Mu3jo6MioN2dGhkWVJRIiAcGxba2NHMyr+yoZaPgH96aF1ORkU\/PDo6NDItKyopDr+4r6yclol4bmFhYFRQSUA0LriWdMcAAAObSURBVFjD7ZdXd9swDIVLUaIkV44dZ+\/Ymc1q9t6r2Xt178n\/\/14ANB8kubGGTx96ipfkCvGnCwKwlCf\/4+8GY6Ostjy2Iw1WQ6Dx0CElN1jtgCttUkqTs5oBF9YlhBsmMrZ0xhIAb4YkhuBGKDWfyy0xFhd41SgV0TSCqW64\/IozFg94UpAqrBCRn+D1yVjny\/hsg\/wz0d6D6\/VXnMUAHtbJR4hu3zAk1qPPFeMfEPWIR+e0HjKHEU0yxkfl40RTeBOQGeo3WBSewXdkmEhDOM+YNlnMQWqqwqgCIBC8v0MGiXoI687IFNxUeGOQWvXvE6VktdBE9vAOfm9cUEhuW9eDoI99RLpXNCKtJA38pjo6MOl0gewwQfqbFp1oztWpudYmL0A3LPMA0Y1M5Kb1HFXjijbptYP85Ft6vBzDo\/DWUHZrk84+qE5\/2YZpRSXSyc2gLCxypu5wjiNp84REOrnssNRDiCfmNIG6S0wkRI\/U\/aWyR0BNQzYx0bSKA1L3l8GHccjHoexkRDJJ7ZWzvHywaLkzFdF2aIB2y2WLXhDP3KRE+nNB3d4GW2S5BUSrSE7UrmSbq4j2LYhcOiK5ks2iTOwDUS+4kZxIDIJQs5USZipiS5mo9vIWhZWO2EtVayLycymJnyUODBI1vzUlkeZxRBOnEZ+O6NLOvNW9fo87k67Xi\/Q1PlMmutu41yLVzkyjbii5iiiaQPWIVHvdhnrLoS00+E9ULW4a4izpfbjAcHimQDQhPvn34yrKQhF7oR13WsmJBp8kOeaUj\/Gujo4RskmfM8fU6FxRF70HaqAEjUn6dL0pkJrQFhcHcdj9x0gPo0z+aSAuXwaI5Il3k9jIWqbq9DjKI0j6ibZwshl\/5PNPX1ciunPN0NoLbXEZLTd70KXAm5TtCssfjpfJd1Ug2s5918CRJ8iUoSy\/oKIDSM5NX9i2sLL5iTDRhHKuPRoWUL\/wFFvvkV\/9jZTblpc\/8L\/ZUzlQjbA5Nbp\/EzMHdATVgtFnvfzHBh8RKFgNR6B+UR\/Oqr5UZ1KFmS8FHxFvhTyq+Rs9HE7JYqRQyK9NwW8zCPq50khtUV2Kg\/zeqonBduIgtWdVlyIjcfh\/rFUmmqLUlTt3RKz\/5ZkByOzlRphIKcsrOYKWJx4SBnOLHvGhM3GFcAkYD4mDmXkjBQ8SmRok6FN8pHCc3fCIqLVAYHyk6Qar8w1SEiRXa1KroD0x0gPD5f0r8RsZhZXDnmumggAAAABJRU5ErkJggg==) no-repeat 0 0;width:27px;height:22px;vertical-align:middle;display:inline-block;background-size:27px auto}.video_muted_btn.muting{background-image:url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABCCAMAAAAYE8oxAAABTVBMVEUAAAAAAAAAAAABAQEAAAAAAAAFBQXq6uoAAAD\/\/\/8AAAAAAAABAQEWFhba2tr4+PgWFhYAAABLS0sBAQH+\/v719fX+\/v7\/\/\/\/9\/f3y8vJJSUliYmJBQUElJSX+\/v77+\/v7+\/v6+vr19fXy8vLt7e3v7+\/g4ODp6enW1tbQ0NDIyMiBgYEVFRU0NDT+\/v78\/Pz5+fn39\/fs7Ozh4eHs7Ozn5+fw8PDz8\/Otra2AgIDCwsIAAABoaGgcHBzc3NyMjIxoaGj6+vr19fX7+\/v29vbu7u7q6urm5ub6+vr4+Pj7+\/vr6+vOzs61tbXo6OjX19fAwMC6urrd3d3R0dHHx8fb29vt7e12dnZQUFBpaWmZmZktLS2+vr6EhIT7+\/v7+\/vb29vy8vL19fXBwcHk5OSfn5+MjIygoKAeHh7V1dU5OTmSkpJRUVGysrL\/\/\/+xlHuyAAAAbnRSTlMABxkLDgQSuiD7FSMTLGSxLicNMvXM6\/jvsywaER\/y6OHR0cS3rZyOiIFsNCga6OPguJWIeXVbUUpGMC0rJBwcCdvYxsXAv62ooZGFeWpoaGJZWFBNRj89PDgvKCMO0riPjX58cWBUPjs3LSomIUfhR2IAAAQqSURBVFjD7djXe9MwEABwzpJM4hhKShJCEkahbCi0FEoLbdl777330P\/\/yJ1s92rJRojvgyf0Qs\/Cv550Z0fpmv\/jHw919U9uOn75tKqZOn1Fgwr14HhTj1WT8GJaawGBIoFaj41DxdTyOZySQoWlKC5rXU3Cj5c0k1aIaulhfYoi3VxJKljYbiYS6f6uuV5vSdWKyeKkQxL4ZUqbETkivMXLr4SqW3UaHVzrkAoebNU1ohIPaOuP1ZAKZNJYZ5MK7m7S9WK8B693FoBJaz6ySQU3m\/oXYrplB05McF\/5SCVmDVifYzTfwZmbQv0WqUC8Ya+yMjJq7MWZw6O6JKFEivErulJUS3NqJYWvvZriKAU4hEyjVkEOx3SVqGCu33yY4VTN1zh1RoKTXX5Xc31CJDOOqF5cxZ+nnkOR5IC6656dJAjtIwsRnvcoODcO+XPR2E0LkmCXRDMZEVkvynum\/rMmKwVx9ATjTUOhrMbSPpLFaC9FU8OVJHdiuJ57Mt9gbZEbmHTE1lkKrwmV7+Q+jHZJS4y0h2QRk7pB4dZlyO99RC0ZC2WJXpLEfOdaXYrf50mmjW0YPXVEP0liTuyneFpCvuxJ2kgJlughWaT\/Pdiki\/pSeBSjPbEt+kgWKUkqr74rICsrpbwr30gWvSQ\/1xBnDTSTLzs5gUE39YlMuqKMbtOFzZQWpXwAg+2JR2TSFU1WnJaIT2HQ84tMuqLJSh\/JEIi3YNDJp1n0k3yLQIOQ1WLTEf3klpVbANfJaYE85c3RJbkQmfiJLhwuRNqDniv6ybERFOIdiidyMT5Bta4RPeQ45OJRCncW4i0qvCMGkFjraYp2J4JCYfxdjhhAKnGoT8HtJO\/wzfRcO\/3oI1d\/jstb5vIgzcSE3mb7HTGAFPF5+mlHZIoP8ilFB9IA0SJH8X1N43rRPMcw2Ia8JQaQhybon\/4zUxhFGVNhnPdjAHlGm0o38m381qRtjGSY6B4N+k+KRc\/Q+3zAheFPVx+ZJFGDyX2NvHeW6ZQyydu48p5vn9xojc8Xy2QSp0zuOIgbhwaIaxTe4UXzwbHVLo91JzdeskTJh8ELiwkZCoY9elNiwmCdpPD32wPT3l3+5BICyeJNdIgMELNmC3jRfBYVsjzimCqxt3xqBiL5TaSUWOjQe+cZL5pNBdYwCa17hySLKiP56RlNmF43jeQddDd+H7lR\/vZROliP5B5TpRan6DGFTBrtD\/1VokXepxV05k2KAeTHbSxaZDPrTE7RTwKR80dYtEgcO9um0AFkGrUfn2XRJvuPsl4MI1uPuyxa5IXs4QkiBZIbLrLIJLd60Mh68OCl0jd24L7sDkVAinx71JihFnHJ7neqSzgp0yTlv3zwwie7A96MMFJIydvF5OIgSvl62GbiUBWZc+rhpnIvAWXuB8Mz\/8vjJ5ndr64kqpVrAAAAAElFTkSuQmCC)}.page_video.ratio_primary .continue_play{white-space:nowrap;font-size:0}.page_video.ratio_primary .continue_play .wrp_video_continue{position:static;display:inline-block;vertical-align:middle;height:auto;width:100%;top:auto;left:auto;white-space:normal;font-size:13px;padding:10px 15px;box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box}.page_video.ratio_primary .continue_play .wrp_video_continue .tit_desc{position:static;width:auto;height:auto;margin:0}.page_video.ratio_primary .continue_play .wrp_video_continue .tit_desc span{padding-bottom:5px;border-bottom:0}.page_video.ratio_primary .continue_play .wrp_video_continue_inner{overflow:hidden}.page_video.ratio_primary .continue_play .dl_video_continue{height:auto;position:relative}.page_video.ratio_primary .continue_play .dd_continue_inner{height:auto;margin:0;top:auto}.page_video.ratio_primary .continue_play .dd_continue_inner .video_list{display:block;width:auto;margin:0}.page_video.ratio_primary .continue_play .dd_continue_inner .video_list .video_item{height:auto;margin:7px 0 0}.page_video.ratio_primary .continue_play .dd_continue_inner .video_list .video_item .inner_item{overflow:hidden}.page_video.ratio_primary .continue_play .dd_continue_inner .video_list .video_item .inner_item .cover{width:75px;height:42.1875px;position:static;float:left;margin-right:10px}.page_video.ratio_primary .continue_play .dd_continue_inner .video_list .video_item .inner_item .desc{margin:0;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;padding-left:0;font-size:14px;line-height:1.4}.page_video.ratio_primary .continue_play .continue_nav,.page_video.ratio_primary .continue_play .continue_opr{bottom:10px}.page_video.video_skin_primary .wrp_video_continue_inner{padding-top:15px}.mpad_more_innervideo_container .mpad_more{margin-left:1px}.mpad_more_innervideo_container .mpad_more_list{right:-7px}.flex_screen_hide{display:none}.flex_screen{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.wx_video_flow_wrap{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);width:100%}.wx_video_flow_tips{font-size:15px;line-height:1.4;color:#fff;margin-bottom:24px}.full_screen_opr .wx_video_flow_btn{border:0;outline:0;background-color:rgba(255,255,255,0.5);border-radius:4px;line-height:1.4;font-size:16px;font-weight:700;letter-spacing:1px;color:#fff;padding:4.800000000000001px 12px}.full_screen_opr .wx_video_flow_btn:active{background-color:rgba(0,0,0,0.061)}@media(max-device-width:413px){.page_video.ratio_primary .continue_play .wrp_video_continue{padding:7px 10px;font-size:12px}.page_video.ratio_primary .continue_play .wrp_video_continue .tit_desc span{padding-bottom:4px}.page_video.ratio_primary .continue_play .dd_continue_inner .video_list .video_item{margin:6px 0 0}.page_video.ratio_primary .continue_play .dd_continue_inner .video_list .video_item .inner_item .cover{width:68px;height:38.25px;margin-right:10px}.page_video.ratio_primary .continue_play .dd_continue_inner .video_list .video_item .inner_item .desc{font-size:14px}}@media(max-device-width:360px){.page_video.ratio_primary .continue_play .wrp_video_continue{padding:6px 10px;font-size:11px}.page_video.ratio_primary .continue_play .wrp_video_continue .tit_desc span{padding-bottom:0}.page_video.ratio_primary .continue_play .dd_continue_inner .video_list .video_item{margin:5px 0 0}.page_video.ratio_primary .continue_play .dd_continue_inner .video_list .video_item .inner_item .cover{width:56px;height:31.5px;margin-right:7px}.page_video.ratio_primary .continue_play .dd_continue_inner .video_list .video_item .inner_item .desc{font-size:12px}.page_video.ratio_primary .continue_play .continue_nav,.page_video.ratio_primary .continue_play .continue_opr{bottom:8px}.video_skin_primary .continue_play .wrp_video_continue .tit_desc span{padding-bottom:4px}}";
});define("a/tpl/smallbanner_msg_tpl.html.js",[],function(){
return'<div class="mpad_smallbanner_msg">\n    <div class="mpad_smallbanner_msg_inner js_ad_main_area js_material_<#=pos_type#>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <div class="mpad_smallbanner_msg_hd" style="background: url(<#=banner#>) no-repeat left center; background-size: cover;">\n        </div>\n        <div class="mpad_smallbanner_msg_ft">\n            <div class="mpad_smallbanner_msg_ft_hd">\n                <strong class="mpad_smallbanner_msg_title"><#=title#></strong>\n                <div class="mpad_smallbanner_msg_tags_container">\n                    <# tags && tags.forEach(function (value, idx) { #>\n                    <span class="mpad_smallbanner_msg_tag"><span class="mpad_smallbanner_msg_tag_inner"><#=value#></span></span>\n                    <# }); #>\n                </div>\n            </div>\n            <span class="mpad_smallbanner_info_btn <# if(dest_type==6){ #>with_icon<# } #> js_ad_action_<#=pos_type#>">\n                <# if (is_wx_app) { #><img class="ic ic_weapp" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxNXB4IiB2aWV3Qm94PSIwIDAgMTUgMTUiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjMgKDUxMTY3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5TbGljZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSIyMDE4LzAyLzIzLeWkmuaooeadv+WwneivleeovyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTTEwLjc1LDEgQzkuOTIzMjUsMSA5LjE1MzUsMS4yMjc4ODg4OSA4LjUsMS42MTU0ODE0OCBDNy4zMDEyNSwyLjMyNjg4ODg5IDYuNSwzLjU4NDI5NjMgNi41LDUuMDE4NTE4NTIgTDYuNSwxMC45ODE0ODE1IEM2LjUsMTIuMDU1MzMzMyA1LjQ5MjUsMTIuOTI1OTI1OSA0LjI1LDEyLjkyNTkyNTkgQzMuMDA3MjUsMTIuOTI1OTI1OSAyLDEyLjA1NTMzMzMgMiwxMC45ODE0ODE1IEMyLDEwLjIxNzE4NTIgMi41MTE1LDkuNTU3ODg4ODkgMy4yNTM3NSw5LjI0MDAzNzA0IEMzLjMwNzI1LDkuMjE3MjIyMjIgMy4zNjE1LDkuMTk1NDQ0NDQgMy40MTcyNSw5LjE3NjI1OTI2IEMzLjg4NDUsOC45ODE4MTQ4MSA0LjI4NTI1LDguNjE2Nzc3NzggNC40MzQsOC4xOTI4ODg4OSBDNC42NTM3NSw3LjU2NzAzNzA0IDQuMjQ0NzUsNy4wNTk5MjU5MyAzLjUyMDc1LDcuMDU5OTI1OTMgQzMuMzQwMjUsNy4wNTk5MjU5MyAzLjE1NzI1LDcuMDkxNTU1NTYgMi45ODA3NSw3LjE0ODU5MjU5IEMyLjk4LDcuMTQ4ODUxODUgMi45NzkyNSw3LjE0OTExMTExIDIuOTc4MjUsNy4xNDkzNzAzNyBDMS45MzE1LDcuNDYxIDEuMDU3NzUsOC4xNDQ0MDc0MSAwLjUzMzI1LDkuMDM3MDM3MDQgQzAuMTk0NSw5LjYxMzg4ODg5IDAsMTAuMjc2Mjk2MyAwLDEwLjk4MTQ4MTUgQzAsMTMuMTk3MzcwNCAxLjkwNjUsMTUgNC4yNSwxNSBDNS4wNzY3NSwxNSA1Ljg0NjUsMTQuNzcyMTExMSA2LjUsMTQuMzg0NTE4NSBDNy42OTg3NSwxMy42NzMxMTExIDguNSwxMi40MTU3MDM3IDguNSwxMC45ODE0ODE1IEw4LjUsNS4wMTg1MTg1MiBDOC41LDMuOTQ0NjY2NjcgOS41MDcyNSwzLjA3NDA3NDA3IDEwLjc1LDMuMDc0MDc0MDcgQzExLjk5MjUsMy4wNzQwNzQwNyAxMywzLjk0NDY2NjY3IDEzLDUuMDE4NTE4NTIgQzEzLDUuODE1NDgxNDggMTIuNDQ1MjUsNi41MDA0NDQ0NCAxMS42NTEsNi44MDA2NjY2NyBDMTEuMTM4NzUsNi45Nzg3Nzc3OCAxMC43MTksNy4zNjMyNTkyNiAxMC41NTksNy44MTg3Nzc3OCBDMTAuMzQwNSw4LjQ0MTUxODUyIDEwLjc0NzUsOC45NDY1NTU1NiAxMS40NjgyNSw4Ljk0NjU1NTU2IEMxMS42MzE1LDguOTQ2NTU1NTYgMTEuNzk2NSw4LjkxNzUxODUyIDExLjk1NzI1LDguODcwMzMzMzMgQzExLjk4MzUsOC44NjI4MTQ4MSAxMi4wMDk1LDguODU0NTE4NTIgMTIuMDM1NSw4Ljg0NjQ4MTQ4IEMxMy4wNzYsOC41MzMwMzcwNCAxMy45NDQ1LDcuODUxNzAzNyAxNC40NjY1LDYuOTYyOTYyOTYgQzE0LjgwNTUsNi4zODYzNzAzNyAxNSw1LjcyMzcwMzcgMTUsNS4wMTg1MTg1MiBDMTUsMi44MDI2Mjk2MyAxMy4wOTM1LDEgMTAuNzUsMSIgaWQ9IlBhZ2UtMSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=" alt="小程序"><# } #><div class="mpad_smallbanner_info_btn_inner"><#=btn_text#></div>\n            </span>\n        </div>\n    </div>\n</div>';
});define("a/tpl/smallbanner_info_tpl.html.js",[],function(){
return'<!--小banner信息广告-->\n<div class="mpad_smallbanner_info">\n    <div class="mpad_smallbanner_info_inner js_ad_main_area js_material_<#=pos_type#>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <div class="mpad_smallbanner_info_hd">\n            <img class="mpad_smallbanner_info_banner js_alazy_img js_mpad_smallbanner_info_banner" data-src="<#=banner#>" alt="">\n        </div>\n        <div class="mpad_smallbanner_info_ft">\n            <!--<span class="mpad_smallbanner_info_avatar"><img data-src="<#=avatar#>" alt="" class="<# if(!!isApp){ #>mpad_smallbanner_info_avatar<# }else{ #>mpad_smallbanner_info_avatar_round<# } #>" /></span>-->\n            <span class="mpad_smallbanner_info_avatar<# if(!isApp){ #> mpad_smallbanner_info_avatar_round<# } #>" style="background: url(<#=avatar#>) no-repeat center; background-size: cover;"></span>\n            <strong class="mpad_smallbanner_info_title"><#=title#></strong>\n\n            <# if(isDownload) {#>\n            <!--下载按钮 目前不会有小程序-->\n            <a href="javascript:void(0);" class="mpad_smallbanner_info_btn mpad_smallbanner_info_download_btn js_ad_action_<#=pos_type#>">\n                <div class="btn_download_outside js_download_outside"><#=btn_text#></div>\n                <div class="btn_progress js_download_percent" style="width: 0%"> \n                    <div class="btn_download_inner js_download_inner"><#=btn_text#></div>\n                </div>\n            </a>\n\n            <!--用新的下载 delay-->\n            <!--未下载-->\n            <!--下载中-->\n            <!--更新这个百分比-->\n            <!--暂停下载-->\n            <!--<a class="mpad_smallbanner_info_btn js_ad_action_<#=pos_type#>" href="javascript:;"><#=btn_text#></a>\n            \n            <a href="javascript:void(0);" class="mpad_smallbanner_info_btn mpad_smallbanner_info_download_btn js_ad_action_<#=pos_type#>">\n                <div class="btn_progress js_download_percent" style="width: 0%"></div>\n                <span class="btn_download_cancel"></span> \n            </a>-->\n\n            <# }else{ #>\n            <!--非下载按钮-->\n            <!--<a href="javascript:void(0);" class="mpad_cpc_btn js_ad_action_<#=pos_type#>">\n                <# if(!!is_wx_app){ #><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt=""><# } #><#=btn_text#>\n            </a>-->\n            <a class="mpad_smallbanner_info_btn js_ad_action_<#=pos_type#>" href="javascript:;"><#=btn_text#></a>\n            <# } #>\n            \n        </div>\n    </div>\n</div>';
});define("a/tpl/banner_info_tpl.html.js",[],function(){
return'<!--banner信息广告-->\n<div class="mpad_banner_info">\n    <div class="mpad_banner_info_inner js_ad_main_area js_material_<#=pos_type#>" style="background: url(<#=banner#>) no-repeat center; background-size: cover;" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <# if(desc || suply_desc || size){ #>\n        <div class="mpad_banner_info_bd" >\n            <# if(desc || suply_desc){ #>\n            <div class="mpad_banner_info_bd_inner">\n                <# if(desc){ #>\n                <p class="mpad_banner_info_bd_hd"><#=desc#></p>\n                <# } #>\n                <# if(suply_desc){ #>\n                <p class="mpad_banner_info_bd_desc"><#=suply_desc#></p>\n                <# } #>\n            </div>\n            <# } #>\n            <# if(size){ #>\n            <p class="mpad_banner_info_bd_ft"><#=size#>&nbsp;<# if(product_type == 19){ #>来自App Store<# } #><# if(product_type == 12){ #>来自腾讯应用宝<# } #></p>\n            <# } #>\n        </div>\n        <# } #>\n        <div class="mpad_banner_info_msg">\n            <div class="mpad_banner_info_msg_inner">\n                <img data-src="<#=avatar#>" alt="" class="mpad_banner_info_avatar js_alazy_img">\n                <strong class="mpad_banner_info_title"><#=title#></strong>\n\n                <# if(isDownload) {#>\n                <!--下载按钮 目前不会有小程序-->\n                <a href="javascript:void(0);" class="mpad_banner_info_btn mpad_banner_info_download_btn js_ad_action_<#=pos_type#>">\n                    <div class="btn_download_outside js_download_outside"><#=btn_text#></div>\n                    <div class="btn_progress js_download_percent" style="width: 0%"> <!--更新这个百分比-->\n                        <div class="btn_download_inner js_download_inner"><#=btn_text#></div>\n                    </div>\n                </a>\n    \n                <# }else{ #>\n                <!--非下载按钮-->\n                <a class="mpad_banner_info_btn js_ad_action_<#=pos_type#>"><#=btn_text#></a>\n                <# } #>\n            </div>\n        </div>\n    </div>\n</div>';
});define("a/tpl/promote_tpl.html.js",[],function(){
return'<!--信息推广 广告-->\n<div class="mpad_promote">\n    <div class="mpad_promote_inner js_ad_main_area js_material_<#=pos_type#>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <div class="mpad_promote_info">\n            <img data-src="<#=avatar#>" alt="" class="mpad_promote_avatar js_alazy_img">\n            <div class="mpad_promote_desc">\n                    <strong class="mpad_promote_desc_title"><#=title#></strong>\n                    <div class="mpad_promote_desc_desc"><#=desc#></div>\n            </div>\n        </div>\n        <i class="mpad_promote_promotion_tag"><# if(!!is_wx_app){ #><span class="icon26_weapp_white"></span><# } #><#=watermark_text#></i>\n    </div>\n</div>';
});define("a/tpl/smallcard_tpl.html.js",[],function(){
return'<!--preview_group preview_card preview_shop_card -->\n<div class="mpad_smallcard">\n    <!--preview_group_inner shop_card_inner -->\n    <div class="mpad_smallcard_inner js_ad_main_area js_material_<#=pos_type#>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <!--preview_group_info -->\n        <div class="mpad_smallcard_info"> \n            <!--preview_shop_card_title -->\n            <strong class="mpad_smallcard_title"><#=title#></strong>\n            <!--preview_shop_card_desc -->\n            <div class="mpad_smallcard_desc">\n                <div class="mpad_smallcard_desc_hd">\n                    <!--preview_card_desc_meta preview_shop_card_oldprice -->\n                    <# if(typeof priceBefore !== \'undefined\'){ #>\n                    <span class="mpad_smallcard_oldprice">¥<#=priceBefore#></span>\n                    <# } #>\n                    <!--preview_card_desc_meta preview_shop_card_price -->\n                    <# if(typeof price !== \'undefined\'){ #>\n                    <span class="mpad_smallcard_price">¥<#=price#></span>\n                    <# } #>\n                </div>\n                <div class="mpad_smallcard_desc_ft">\n                    <!--preview_card_desc_meta btn_plain_primary preview_shop_card_btn_buy -->\n                    <span class="mpad_smallcard_btn js_ad_action_<#=pos_type#>"><#=btn_text#></span>\n                </div>\n                \n            </div>\n            <!--preview_card_avatar -->\n            <img alt="" class="mpad_smallcard_avatar js_alazy_img" data-src="<#=avatar#>">\n        </div>\n    </div>\n</div>';
});define("a/tpl/info_tpl.html.js",[],function(){
return'<div class="mpad_info">\n    <div class="mpad_info_inner js_ad_main_area js_material_<#=pos_type#>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <span class="mpad_info_hd">\n            <span style="background: url(<#=avatar#>) no-repeat center; background-size: cover;" class="<# if(!!isApp){ #>mpad_info_avatar<# }else{ #>mpad_info_avatar_round<# } #>"></span>\n            <div class="mpad_info_msg">\n                <p class="mpad_info_title"><#=title#></p>\n                <p class="mpad_info_desc"><#=desc#></p>\n            </div>\n        </span>\n        \n        <div class="mpad_info_ft">\n            <a href="javascript:void(0);" class="mpad_info_btn js_ad_action_<#=pos_type#>">\n                <# if(!!isWxapp){ #><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt=""><# } #><#=btn_text#>\n            </a>\n        </div>\n    </div>\n</div>';
});define("a/tpl/cardticket_tpl.html.js",[],function(){
return'<!--卡券-->\n<div class="mpad_cardticket">\n    <div class="mpad_cardticket_inner js_ad_main_area js_material_<#=pos_type#>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n        <div class="mpad_cardticket_info">\n            <div class="mpad_cardticket_info_hd">\n                <span style="background: url(<#=avatar#>) no-repeat center; background-size: cover;" class="mpad_cardticket_avatar_round"></span>\n                <div class="mpad_cardticket_info_hd_info">\n                    <p class="mpad_cardticket_title"><#=title#></p>\n                </div>\n            </div>\n            <div class="mpad_cardticket_info_ft">\n                <a class="mpad_cardticket_btn js_ad_action_<#=pos_type#>"><#=btn_text#></a>\n            </div>\n        </div>\n        <div class="mpad_cardticket_desc">\n            <div class="mpad_cardticket_theme"></div>\n            <#=desc#>\n        </div>\n    </div>\n</div>';
});define("a/tpl/banner_tpl.html.js",[],function(){
return'<!--大banner广告-->\n<div class="mpad_banner js_ad_main_area js_material_<#=pos_type#>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n    <div class="mpad_banner_inner">\n        <img class="mpad_banner_img js_alazy_img js_mpad_banner_img" data-src="<#=banner#>" />\n        <!--尾标-->\n        <# if (aid !== \'157480986\') { #><i class="mpad_banner_promotion_tag"><# if(!!is_wx_app){ #><span class="icon26_weapp_white"></span><# } #><span class="watermark_text js_watermark_text"><#=watermark_text#></span></i><# } #>\n    </div>\n</div>';
});