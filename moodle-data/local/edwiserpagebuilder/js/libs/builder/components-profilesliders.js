/* eslint-disable no-unused-vars */
/*
Copyright 2017 Ziadin Givan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

https://github.com/givanz/Vvvebjs
*/
define('local_edwiserpagebuilder/components-profilesliders', ['local_edwiserpagebuilder/jquery', 'core/ajax'], function (jQuery, Ajax) {

    function addBlocks(blocks) {
        Vvveb.ComponentsGroup['Edwiser Profile Sliders'] = blocks;
        var SETTINGTITLES = {
            TESTIMONIAL: 'Text',
            NAME: 'Name',
            IMAGE: 'Image',
            DESIGNATION: 'Designation',
            PROFILEIMG: 'Image',
            SLIDEBGCOLOR: 'Slide bg color',
            PROFILENAMECOLOR: 'Profile name color',
            PROFILEDESGCOLOR: 'Profile designation color',
            PROFILEDESCRIPTONCOLOR: 'Profile description color',
            SHOWNAVIGATIONBUTTONS: 'Show navigation buttons',
            SHOWNAVIGATIONBULLETS: 'Show navigation bullets',
            AUTOPLAYSLIDES: 'Autoplay slides',
            PAUSESLIDESONHOVER: 'Pause slides on hover',
            SLIDEINTERVAL: 'Slide interval'
        };

        // Profile Slider 1  --> Team Design - 9
        var profilesliderhtml1 = `<section class="section-teamdesign-9 edw_teamdesign_unqreplaceid_ edw_adv_slider" id="teamdesign9_unqreplaceid_"><div class="section-container carousel-container"><div class="slider edw-carousel"><div class="slider-inner edw-slider-inner-container"><div class="slide edw-slider-item"><div class="staff-card"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider1/images/card-images/image-1.png" alt="card-1"></div><div class="slide-footer"><p class="name testimonial-user-name">Paul Floyed</p><p class="desc edw-carousel-content-para">Computer Science - This is a extra long desc for testing</p></div></div></div><div class="slide edw-slider-item active"><div class="staff-card"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider1/images/card-images/image-2.png" alt="card-1"></div><div class="slide-footer"><p class="name testimonial-user-name">Stephanie Rychel</p><p class="desc edw-carousel-content-para">Psychology</p></div></div></div><div class="slide edw-slider-item"><div class="staff-card"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider1/images/card-images/image-3.png" alt="card-1"></div><div class="slide-footer"><p class="name testimonial-user-name">Rebecca Irby</p><p class="desc edw-carousel-content-para">Biology</p></div></div></div></div></div><div class="action-wrapper"><button class="carousel-control-prev edw-control-prev edw-slide-control" type="button"><i class="fa fa-light fa-angle-left"></i></button><button class="carousel-control-next edw-control-next edw-slide-control" type="button"><i class="fa fa-light fa-angle-right"></i></button></div></div></section>`;
        var profileslidercss1 = ` .edw_teamdesign_unqreplaceid_ {padding: 40px 24px;direction: ltr;}.edw_teamdesign_unqreplaceid_ .section-container {max-width: 1320px;margin: 0 auto;}.edw_teamdesign_unqreplaceid_ .slider {padding: 4px 4px 35px;overflow: hidden;}.edw_teamdesign_unqreplaceid_ .slider-inner {position: relative;min-height: 500px;}.edw_teamdesign_unqreplaceid_ .slide {border-radius: 6px;border: 1px solid #d9d9d9;background-color: #fff;height: calc(100% - 100px);min-height: fit-content;backface-visibility: hidden;margin: 50px 0;transform-origin: center center;width: calc(33.33% - 8px);position: absolute !important;left: -40%;top: 0;transition: left 0.5s ease-in, transform 0.5s, box-shadow 0.5s;}.edw_teamdesign_unqreplaceid_ .slide .img-box {width: 100%;height: 310px;border-top-left-radius: 6px;border-top-right-radius: 6px;overflow: hidden;}.edw_teamdesign_unqreplaceid_ .slide .img-box img {height: 100%;width: 100%;object-fit: cover;object-position: top center;}.edw_teamdesign_unqreplaceid_ .slide-footer {padding: 16px 28px;}.edw_teamdesign_unqreplaceid_ .slide .name {color: #0934ba;font-size: 18px;font-weight: 400;line-height: 30px;margin: 0;}.edw_teamdesign_unqreplaceid_ .slide .desc {color: #4c5a73;font-size: 16px;font-weight: 400;margin: 0;line-height: 20px;}.edw_teamdesign_unqreplaceid_ .slide.prev {left: 0;}.edw_teamdesign_unqreplaceid_ .slide.next {left: calc(66.66% + 8px);width: calc(33.33% - 8px);}.edw_teamdesign_unqreplaceid_ .action-wrapper {display: flex;align-items: center;justify-content: center;margin: 0 auto;gap: 32px;}.edw_teamdesign_unqreplaceid_ .carousel-control-prev, .edw_teamdesign_unqreplaceid_ .carousel-control-next {position: static;width: 41px;height: 41px;background-color: white;border: 2px solid #0934ba;font-size: 20px;color: #0934ba;border-radius: 50%;opacity: 1;transition: all 0.3s ease;margin: auto 0;display: flex;justify-content: center;align-items: center;}.edw_teamdesign_unqreplaceid_ .carousel-control-prev:hover, .edw_teamdesign_unqreplaceid_ .carousel-control-next:hover {background-color: #0934ba;color: #fff;}.edw_teamdesign_unqreplaceid_ .animatetoright {animation: toright 0.5s ease-in;}@keyframes toright {0% {left: calc(66.66% + 8px);}100% {left: 100%;}}.edw_teamdesign_unqreplaceid_ .animatetoleft {animation: toleft 0.5s ease-in;}@keyframes toleft {0% {left: 110%;}100% {left: calc(66.66% + 8px);}}@media screen and (min-width: 1024px) {.edw_teamdesign_unqreplaceid_ .slide.active {left: 33.33%;z-index: 1;transform: scale(1.2);margin-right: auto;box-shadow: 0px 8px 22px 0px rgba(0, 0, 0, 0.12);}}@media screen and (max-width: 1024px) {.edw_teamdesign_unqreplaceid_ .section-container {max-width: 820px;}.edw_teamdesign_unqreplaceid_ .slider-inner {min-height: 400px;}.edw_teamdesign_unqreplaceid_ .slide {width: calc(50% - 12px);height: calc(100%);left: -60%;margin: 0;}.edw_teamdesign_unqreplaceid_ .slide.next {width: calc(50% - 12px);}.edw_teamdesign_unqreplaceid_ .slide.active {left: calc(50% + 12px);width: calc(50% - 12px);margin-left: 0;z-index: 1;transform: scale(1);box-shadow: unset;}.edw_teamdesign_unqreplaceid_ .slide.next {left: 110%;}.edw_teamdesign_unqreplaceid_ .slide.prev {left: 0%;}.edw_teamdesign_unqreplaceid_ .animatetoright {animation: torighttab 0.5s ease-in;}@keyframes torighttab {0% {left: 110%;}100% {left: 100%;}}.edw_teamdesign_unqreplaceid_ .animatetoleft {animation: tolefttab 0.5s ease-in;}@keyframes tolefttab {0% {left: 110%;}100% {left: 110%;}}}@media screen and (max-width: 767px) {.edw_teamdesign_unqreplaceid_ .section-container {max-width: 600px;}.edw_teamdesign_unqreplaceid_ .slide {width: 100%;left: -110%;}.edw_teamdesign_unqreplaceid_ .slide.active {width: 100%;left: 0;}.edw_teamdesign_unqreplaceid_ .slide.next {left: 110%;width: 100%;}.edw_teamdesign_unqreplaceid_ .slide.prev {left: -110%;}.edw_teamdesign_unqreplaceid_ .animatetoright {animation: torightmob 0.5s ease-in;}@keyframes torightmob {0% {left: 110%;}100% {left: 110%;}}.edw_teamdesign_unqreplaceid_ .animatetoleft {animation: toleftmob 0.5s ease-in;}@keyframes toleftmob {0% {left: 110%;}100% {left: 0;}}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .edw_teamdesign_unqreplaceid_ .slider-inner {min-height: 400px;}.edw-limitedwidth-block .edw_teamdesign_unqreplaceid_ .slide {width: calc(50% - 12px);height: calc(100%);left: -60%;margin: 0;}.edw-limitedwidth-block .edw_teamdesign_unqreplaceid_ .slide.next {width: calc(50% - 12px);}.edw-limitedwidth-block .edw_teamdesign_unqreplaceid_ .slide.active {left: 0;width: calc(50% - 12px);margin-left: 0;z-index: 1;transform: scale(1);box-shadow: unset;}.edw-limitedwidth-block .edw_teamdesign_unqreplaceid_ .slide.next {left: calc(50% + 12px);}.edw-limitedwidth-block .edw_teamdesign_unqreplaceid_ .slide.prev {left: -100%;}.edw-limitedwidth-block .edw_teamdesign_unqreplaceid_ .animatetoright {animation: torighttab 0.5s ease-in;}@keyframes torighttab {0% {left: calc(50% + 12px);}100% {left: 100%;}}.edw-limitedwidth-block .edw_teamdesign_unqreplaceid_ .animatetoleft {animation: tolefttab 0.5s ease-in;}@keyframes tolefttab {0% {left: 110%;}100% {left: calc(50% + 12px);}}}.edw-rtl-block .edw_teamdesign_unqreplaceid_ .carousel-control-next, .edw-rtl-block .edw_teamdesign_unqreplaceid_ .carousel-control-prev {transform: rotate(180deg);}`;
       var profilesliderjs1 = `class TeamDesign9_unqreplaceid_{constructor(){this.teamdesign9SEL="#teamdesign9_unqreplaceid_",this.teamdesign=document.querySelector(this.teamdesign9SEL),this.slider=this.teamdesign.querySelector(".slider-inner"),this.leftBtn=this.teamdesign.querySelector(".carousel-control-prev"),this.rightBtn=this.teamdesign.querySelector(".carousel-control-next"),this.isTouchStart=!1,this.startX=0,this.distance=0,this.initializeSlide=this.initializeSlide.bind(this),this.leftClick=this.leftClick.bind(this),this.rightClick=this.rightClick.bind(this),this.setSliderHeight=this.setSliderHeight.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchStop=this.touchStop.bind(this),this.initializeEventListeners()}initializeEventListeners(){window.addEventListener("load",()=>{this.setSliderHeight(),setTimeout(()=>this.setSliderHeight(),200)}),window.addEventListener("resize",()=>{this.setSliderHeight(),setTimeout(()=>this.setSliderHeight(),200)}),this.leftBtn.addEventListener("click",this.leftClick),this.rightBtn.addEventListener("click",this.rightClick),this.slider.addEventListener("touchstart",this.touchStart),this.slider.addEventListener("touchmove",this.touchMove),this.slider.addEventListener("touchend",this.touchStop)}setSliderHeight(){let t=document.querySelector(".edw-limitedwidth-block "+this.teamdesign9SEL),e=this.teamdesign.querySelectorAll(".staff-card"),i=0;e.forEach(t=>{i=Math.max(i,t.offsetHeight),t.classList.remove("prev"),t.classList.remove("next")}),window.innerWidth>1024&&!t?this.slider.style.height=i+100+"px":this.slider.style.height=i+"px",this.initilaization()}initilaization(t="",e=""){let i=document.querySelector(".edw-limitedwidth-block "+this.teamdesign9SEL),s=t||this.teamdesign.querySelector(".slide.active");if(window.innerWidth>1024&&!i){let l=1+100/s.clientHeight;s.style.transform="scale("+l+")"}else s.style.transform="";let h=s.nextElementSibling,r=s.previousElementSibling;h||(h=this.teamdesign.querySelector(".slider .slide:first-child")),r||(r=this.teamdesign.querySelector(".slider .slide:last-child")),"left"==e&&h&&h.classList.add("animatetoleft"),(this.slider.childElementCount>2||""==t)&&(h.classList.add("next"),r.classList.remove("next"),r.classList.add("prev")),setTimeout(()=>{h&&h.classList.remove("animatetoleft")},500)}initializeSlide(t="",e=""){let i=this.teamdesign.querySelector(".slide.prev"),s=this.teamdesign.querySelector(".slide.next"),l=this.teamdesign.querySelector(".slide.active");2==this.slider.childElementCount&&(i&&(t=i,l.classList.add("next")),s&&(t=s,l.classList.add("prev"))),i&&i.classList.remove("prev"),s&&s.classList.remove("next"),l.classList.remove("active"),l.style.transform="",t.classList.add("active"),"right"==e&&s&&s.classList.add("animatetoright"),this.initilaization(t,e),setTimeout(()=>{s&&s.classList.remove("animatetoright")},500)}leftClick(){console.log("left clicked");let t=this.teamdesign.querySelector(".slider .slide.active").previousElementSibling;t||(t=this.teamdesign.querySelector(".slider .slide:last-child")),this.initializeSlide(t,"right")}rightClick(){let t=this.teamdesign.querySelector(".slider .slide.active").nextElementSibling;t||(t=this.teamdesign.querySelector(".slider .slide:first-child")),this.initializeSlide(t,"left")}touchStart(t){this.isTouchStart=!0,this.startX=t.touches[0].clientX}touchMove(t){this.isTouchStart&&(this.distance=t.touches[0].clientX-this.startX)}touchStop(){this.isTouchStart=!1,this.distance>100?this.leftClick():this.distance<-100&&this.rightClick()}}let teamdesign9_unqreplaceid_=new TeamDesign9_unqreplaceid_;`;
        var profilesliderappendnode1 = `<div class="slide edw-slider-item"><div class="staff-card"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider1/images/card-images/image-1.png" alt="card-1"></div><div class="slide-footer"><p class="name testimonial-user-name">Paul Floyed</p><p class="desc edw-carousel-content-para">Computer Science - This is a extra long desc for testing</p></div></div></div>`;
        Vvveb.Components.extend("_base", "html/profileslider1", {
            name: "Profile slider 1",
            attributes: ['data-ebpb-profileslider1'],
            image: "icons/profileslider1.png",
            classes: ['edwiser-pb-profileslider1'],
            html: (() => {
                return `<div class="edwiser-pb-profileslider1" data-vvveb-disabled-area contenteditable="false">${profilesliderhtml1}<style>${profileslidercss1}</style><script>${profilesliderjs1}</script></div>`;
            })(),
            beforeInit: function (node) {
                properties = [];
                var i = 0;
                var slideno = 0;
                var id = generateUniqueID();
                node.innerHTML = node.innerHTML.replaceAll("_unqreplaceid_", id);
                $(node).find(".edw-slider-item").each(function (e) {
                    i = generateUniqueID();
                    slideno++;
                    var regex = /edw-carousel-item-\d+/;
                    var matchedClass = "";
                    var hasMatchingClass = $(this).filter(function () {
                        var classNames = $(this).attr('class').split(' ');
                        return classNames.some(function (className) {
                            if (regex.test(className)) {
                                matchedClass = className;
                                return true;
                            }
                            return false;
                        });
                    }).length > 0;
                    $(this).removeClass(matchedClass);
                    $(this).addClass("edw-carousel-item-" + i);
                    // applyTextColorsBeforeInit(node, '.slide .card');
                    // profileDesignIndicatorHandlder(node,i);
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Member " + slideno,
                                extraclass: "edwslideheading m-0",
                                type: "h6",
                                style: ""
                            }
                        },
                        {
                            name: "",
                            key: "deleteslideritem",
                            inputtype: EdwbuttonInput,
                            child: `.edw-carousel-item-${i}`,
                            edwclasses: "edwslidedelbtn",
                            data: { text: "", icon: "la-trash", extraclasses: "btn btn-outline-danger" },
                            onChange: function (node, value, input) {
                                $(node).remove();
                                Vvveb.Components.render("html/profileslider1");
                                return node;
                            },
                        },
                        {
                            name: SETTINGTITLES.NAME,
                            key: "slidername" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .testimonial-user-name`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                            onChange: function (node, value, input) {
                                if (value == "") {
                                    $(node).hide();
                                } else {
                                    $(node).show().text(value);
                                }
                            }
                        },
                        {
                            name: SETTINGTITLES.TESTIMONIAL,
                            key: "slidertestimonial" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .edw-carousel-content-para`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                            onChange: function (node, value, input) {
                                if (value == "") {
                                    $(node).hide();
                                } else {
                                    $(node).show().text(value);
                                }
                            }
                        },
                        {
                            name: SETTINGTITLES.PROFILEIMG,
                            key: "sliderprofile" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .edw-profile-img`,
                            // onChange: function (node, value, input) {
                            //     $(node).parent().find(this.child).css("background-image", "url(" + value + ")");
                            //     return node;
                            // }
                        }
                    );
                });
                properties = removeDeleteButton(node, properties, 3);
                hideNavigatorsOnSingleSlide(node);

                if ($(node).find('.edw-slider-inner-container').children('.edw-slider-item').length >= 3) {
                    $(node).find('.edw-slider-item').first().addClass('prev').removeClass('active').removeClass('next').removeAttr('style');
                    $(node).find('.edw-slider-item.prev').next().addClass('active').removeClass('prev').removeClass('next').css('transform' , 'scale(1.23474)');
                    $(node).find('.edw-slider-item.active').next().addClass('next').removeClass('prev').removeClass('active').removeAttr('style');
                }
                if ($(node).find('.edw-slider-inner-container').children('.edw-slider-item').length == 2) {
                    $(node).find('.edw-slider-item').first().addClass('prev').removeClass('active').removeClass('next').removeAttr('style');;
                    $(node).find('.edw-slider-item.prev').next().addClass('active').removeClass('prev').removeClass('next').css('transform' , 'scale(1.23474)');
                }
                if ($(node).find('.edw-slider-inner-container').children('.edw-slider-item').length == 1) {
                    $(node).find('.edw-slider-item').first().addClass('active').removeClass('prev').removeClass('next').css('transform' , 'scale(1.23474)');
                }

                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                this.properties = properties.concat(this.properties);
                slideIntervalfielddisabler(node);
                return node;
            },
            properties: [
                {
                    name: "",
                    key: "addNewSlide",
                    inputtype: EdwbuttonInput,
                    edwclasses: "edwnewslidebtn",
                    data: { text: "Add new slide", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                    onChange: function (node) {
                        //render component properties again to include the new column inputs
                        $(node).parent().find('.edw-slider-inner-container').append(profilesliderappendnode1);
                        Vvveb.Components.render("html/profileslider1");

                        return node;
                    }
                },
            ]
        });

        // Profile Slider 2  --> Team Design - 10
        var profilesliderhtml2 = `<section class="section-boardmembers sec-bm_unqreplaceid_" id="teamdesign10_unqreplaceid_"><div class="section-container carousel-container"><div class="slider edw-carousel"><div class="slider-inner edw-slider-inner-container"><div class="slide edw-slider-item active" data-value="1"><div class="member-card"><div class="box"><div class="card-header"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider2/images/card-images/image-1.png" alt="card-1"></div></div></div><div class="member-card-footer"><p class="name testimonial-user-name">Brad Gore</p><p class="desc testimonial-user-desg">Phycology</p></div></div></div><div class="slide edw-slider-item next-1" data-value="2"><div class="member-card"><div class="box"><div class="card-header"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider2/images/card-images/image-2.png" alt="card-1"></div></div></div><div class="member-card-footer"><p class="name testimonial-user-name">Paul Floyed</p><p class="desc testimonial-user-desg">Sports</p></div></div></div><div class="slide edw-slider-item next-2" data-value="3"><div class="member-card"><div class="box"><div class="card-header"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider2/images/card-images/image-3.png" alt="card-1"></div></div></div><div class="member-card-footer"><p class="name testimonial-user-name">Stephanie Rychel</p><p class="desc testimonial-user-desg">Mathematics</p></div></div></div><div class="slide edw-slider-item next-3" data-value="4"><div class="member-card"><div class="box"><div class="card-header"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider2/images/card-images/image-4.png" alt="card-1"></div></div></div><div class="member-card-footer"><p class="name testimonial-user-name">Rebecca Irby</p><p class="desc testimonial-user-desg">Biology</p></div></div></div><div class="slide edw-slider-item" data-value="5"><div class="member-card"><div class="box"><div class="card-header"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider2/images/card-images/image-1.png" alt="card-1"></div></div></div><div class="member-card-footer"><p class="name testimonial-user-name">Brad Gore</p><p class="desc testimonial-user-desg">Phycology</p></div></div></div><div class="slide edw-slider-item" data-value="6"><div class="member-card"><div class="box"><div class="card-header"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider2/images/card-images/image-2.png" alt="card-1"></div></div></div><div class="member-card-footer"><p class="name testimonial-user-name">Paul Floyed</p><p class="desc testimonial-user-desg">Sports</p></div></div></div></div></div><div class="action-wrapper"><button class="carousel-control-prev edw-control-prev edw-slide-control" type="button"><i class="fa fa-light fa-angle-left"></i></button><ol class="carousel-indicators edw-carousel-indicators"><li class="active" data-value="1"></li><li data-value="2"></li><li data-value="3"></li><li data-value="4"></li><li data-value="5"></li><li data-value="6"></li></ol><button class="carousel-control-next edw-control-next edw-slide-control" type="button"><i class="fa fa-light fa-angle-right"></i></button></div></div></section>`;
        var profileslidercss2 = ` .sec-bm_unqreplaceid_ {padding: 0px 0px 50px;direction: ltr;}.sec-bm_unqreplaceid_ .section-container {max-width: 1320px;margin: 0 auto;}.sec-bm_unqreplaceid_ .slider {overflow: hidden;padding: 40px 24px 40px;}.sec-bm_unqreplaceid_ .slider-inner {position: relative;min-height: 350px;}.sec-bm_unqreplaceid_ .member-card {transform-origin: center center;transition: transform 0.5s;}.sec-bm_unqreplaceid_ .member-card .box {content: "";display: block;padding-top: 100%;position: relative;}.sec-bm_unqreplaceid_ .member-card .card-header {position: absolute !important;top: 0;left: 0;width: 100%;height: 100%;margin: 0 auto;border-radius: 100%;overflow: hidden;padding: 20px;background-color: #fff;border: 1px solid #d5ddea;transition: filter 0.3s ease;}.sec-bm_unqreplaceid_ .member-card .img-box {border-radius: 100%;overflow: hidden;height: 100%;width: 100%;}.sec-bm_unqreplaceid_ .member-card .img-box img {height: 100%;width: 100%;object-fit: cover;object-position: top center;}.sec-bm_unqreplaceid_ .member-card .card-header:hover {filter: drop-shadow(0px 8px 22px rgba(0, 0, 0, 0.1));}.sec-bm_unqreplaceid_ .member-card-footer {padding: 16px 28px 0;text-align: center;}.sec-bm_unqreplaceid_ .member-card .name {color: #313848;font-size: 16px;font-weight: 500;line-height: normal;margin: 0;}.sec-bm_unqreplaceid_ .member-card .desc {margin: 0;line-height: 28px;font-size: 16px;}.sec-bm_unqreplaceid_ .slide {position: absolute !important;top: 0;left: -30%;width: calc(25% - 18px);transition: left 0.5s ease-in;}.sec-bm_unqreplaceid_ .slide.next-3 {left: calc(75% + 18px);}.sec-bm_unqreplaceid_ .slide.next-2 {left: calc(50% + 12px);}.sec-bm_unqreplaceid_ .slide.next-1 {left: calc(25% + 6px);}.sec-bm_unqreplaceid_ .slide.active {left: 0;}.sec-bm_unqreplaceid_ .action-wrapper {display: flex;align-items: center;justify-content: center;margin: 0 auto;gap: 30px;}.sec-bm_unqreplaceid_ .carousel-control-prev, .sec-bm_unqreplaceid_ .carousel-control-next {position: static;width: 56px;height: 56px;background-color: white;border: 1px solid #9a3cdf;color: #9a3cdf;font-size: 24px;border-radius: 50%;opacity: 1;transition: all 0.3s ease;margin: auto 0;display: flex;justify-content: center;align-items: center;}.sec-bm_unqreplaceid_ .carousel-control-prev:hover, .sec-bm_unqreplaceid_ .carousel-control-next:hover {background-color: #9a3cdf;color: #fff;}.sec-bm_unqreplaceid_ .carousel-indicators {display: none;position: static;gap: 11px;width: fit-content;margin: auto 0;}.sec-bm_unqreplaceid_ .carousel-indicators li {opacity: 1;background-color: #d5ddea !important;width: 8px;height: 8px;border-radius: 50%;margin: 0;cursor: pointer;}.sec-bm_unqreplaceid_ .carousel-indicators li button {display: none;}.sec-bm_unqreplaceid_ .carousel-indicators li.active {background-color: #9a3cdf !important;}.sec-bm_unqreplaceid_ .animatetoright {animation: toright 0.5s ease-in;}@keyframes toright {0% {left: calc(75% + 24px);}100% {left: 110%;}}.sec-bm_unqreplaceid_ .animatetoleft {animation: toleft 0.5s ease-in;}@keyframes toleft {0% {left: 110%;}100% {left: calc(75% + 24px);}}@media screen and (min-width: 1200px) {.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(5))) .slider {padding-bottom: 0;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(5))) .action-wrapper {display: none;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(5))) .slider-inner {display: flex;gap: 24px;justify-content: center;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(5))) .slide {position: static !important;}}@media screen and (max-width: 1200px) {.sec-bm_unqreplaceid_ .slide {left: -40%;width: calc(33% - 16px);}.sec-bm_unqreplaceid_ .slide.next-3 {left: 110%;}.sec-bm_unqreplaceid_ .slide.next-2 {left: calc(66.66% + 16px);}.sec-bm_unqreplaceid_ .slide.next-1 {left: calc(33% + 8px);}.sec-bm_unqreplaceid_ .animatetoright {animation: torightsmscreen 0.5s ease-in;}@keyframes torightsmscreen {0% {left: 110%;}100% {left: 110%;}}.sec-bm_unqreplaceid_ .animatetoleft {animation: toleftsmscreen 0.5s ease-in;}@keyframes toleftsmscreen {0% {left: 110%;}100% {left: 110%;}}}@media screen and (max-width: 1200px) and (min-width: 1024px) {.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(4))) .slider {padding-bottom: 0;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(4))) .action-wrapper {display: none;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(4))) .slider-inner {display: flex;gap: 24px;justify-content: center;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(4))) .slide {position: static !important;}}@media screen and (max-width: 1024px) {.sec-bm_unqreplaceid_ .section-container {max-width: 820px;}.sec-bm_unqreplaceid_ .slide {left: -60%;width: calc(50% - 12px);}.sec-bm_unqreplaceid_ .slide.next-3 {left: 110%;}.sec-bm_unqreplaceid_ .slide.next-2 {left: 110%;}.sec-bm_unqreplaceid_ .slide.next-1 {left: calc(50% + 12px);}}@media screen and (max-width: 1024px) and (min-width: 767px) {.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(3))) .slider {padding-bottom: 0;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(3))) .action-wrapper {display: none;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(3))) .slider-inner {display: flex;gap: 24px;justify-content: center;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(3))) .slide {position: static !important;}}@media screen and (max-width: 767px) {.sec-bm_unqreplaceid_ .section-container {max-width: 600px;}.sec-bm_unqreplaceid_ .slide {left: -110%;width: 100%;}.sec-bm_unqreplaceid_ .slide.next-3 {left: 110%;}.sec-bm_unqreplaceid_ .slide.next-2 {left: 110%;}.sec-bm_unqreplaceid_ .slide.next-1 {left: 110%;}.sec-bm_unqreplaceid_ h2 {font-size: 36px;}.sec-bm_unqreplaceid_ .carousel-indicators:has(li:nth-child(6)) {display: none;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(2))) .slider {padding-bottom: 0;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(2))) .action-wrapper {display: none;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(2))) .slider-inner {display: flex;gap: 24px;justify-content: center;}.sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(2))) .slide {position: static !important;}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .sec-bm_unqreplaceid_ .slide {left: -60%;width: calc(50% - 12px);}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .slide.next-3 {left: 110%;}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .slide.next-2 {left: 110%;}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .slide.next-1 {left: calc(50% + 12px);}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .slide.active {left: 0;}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .animatetoright {animation: torighttab 0.5s ease-in;}@keyframes torighttab {0% {left: 110%;}100% {left: 110%;}}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .animatetoleft {animation: tolefttab 0.5s ease-in;}@keyframes tolefttab {0% {left: 110%;}100% {left: 110%;}}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .carousel-container:has(.slide:nth-child(3)) .action-wrapper {display: flex;}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .carousel-container:has(.slide:nth-child(3)) .slider-inner {display: flex;gap: 24px;justify-content: center;}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .carousel-container:has(.slide:nth-child(3)) .slide {position: absolute !important;}}@media screen and (min-width: 767px) {.edw-limitedwidth-block .sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(3))) .slider {padding-bottom: 0;}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(3))) .action-wrapper {display: none;}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(3))) .slider-inner {display: flex;gap: 24px;justify-content: center;}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .carousel-container:not(:has(.slide:nth-child(3))) .slide {position: static !important;}}.edw-rtl-block .sec-bm_unqreplaceid_ .carousel-control-next, .edw-rtl-block .sec-bm_unqreplaceid_ .carousel-control-prev {transform: rotate(180deg);}`;
       var profilesliderjs2 = `class TeamDesign10_unqreplaceid_{constructor(){this.teamdesign=document.querySelector("#teamdesign10_unqreplaceid_"),this.slider=this.teamdesign.querySelector(".slider-inner"),this.leftBtn=this.teamdesign.querySelector(".carousel-control-prev"),this.rightBtn=this.teamdesign.querySelector(".carousel-control-next"),this.indicators=this.teamdesign.querySelectorAll(".carousel-indicators li"),this.isTouchStart=!1,this.startX=0,this.distance=0,this.initializeSlide=this.initializeSlide.bind(this),this.leftClick=this.leftClick.bind(this),this.rightClick=this.rightClick.bind(this),this.indicatorClicked=this.indicatorClicked.bind(this),this.setSliderHeight=this.setSliderHeight.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchStop=this.touchStop.bind(this),this.initializeEventListeners()}initializeEventListeners(){window.addEventListener("load",()=>{this.setSliderHeight(),setTimeout(()=>this.setSliderHeight(),300)}),window.addEventListener("resize",()=>{this.setSliderHeight(),setTimeout(()=>this.setSliderHeight(),300)}),this.leftBtn.addEventListener("click",this.leftClick),this.rightBtn.addEventListener("click",this.rightClick),this.indicators.forEach(t=>{t.addEventListener("click",this.indicatorClicked)}),this.slider.addEventListener("touchstart",this.touchStart),this.slider.addEventListener("touchmove",this.touchMove),this.slider.addEventListener("touchend",this.touchStop)}setSliderHeight(){let t=this.teamdesign.querySelectorAll(".member-card"),i=0;t.forEach(t=>{i=Math.max(i,t.offsetHeight),t.classList.remove("next-1","next-2","next-3","next-4")}),this.slider.style.height=i+10+"px",this.initilaization()}initilaization(t="",i=""){let e=t||this.teamdesign.querySelector(".slide.active"),s=e.nextElementSibling;s||(s=this.teamdesign.querySelector(".slider .slide:first-child"));for(let l=1;l<4;l++){s.classList.add("next-"+l);let r=s.nextElementSibling;if(r||(r=this.teamdesign.querySelector(".slider .slide:first-child")),(3==l||r==e)&&t)"left"==i&&s&&s.classList.add("animatetoleft");else{if(r==e)break;s=r}}this.setCurrentIndicatorActive(e.getAttribute("data-value")),setTimeout(()=>{s&&s.classList.remove("animatetoleft")},500)}initializeSlide(t="",i=""){let e=this.teamdesign.querySelector(".slide.next-1"),s=this.teamdesign.querySelector(".slide.next-2"),l=this.teamdesign.querySelector(".slide.next-3"),r=this.teamdesign.querySelector(".slide.active");e&&e.classList.remove("next-1"),s&&s.classList.remove("next-2"),l&&l.classList.remove("next-3"),r.classList.remove("active"),t.classList.add("active"),"right"==i&&l&&l.classList.add("animatetoright"),this.initilaization(t,i),setTimeout(()=>{l&&l.classList.remove("animatetoright")},500)}leftClick(){console.log("left clicked");let t=this.teamdesign.querySelector(".slider .slide.active").previousElementSibling;t||(t=this.teamdesign.querySelector(".slider .slide:last-child")),this.initializeSlide(t,"right")}rightClick(){let t=this.teamdesign.querySelector(".slider .slide.active").nextElementSibling;t||(t=this.teamdesign.querySelector(".slider .slide:first-child")),this.initializeSlide(t,"left")}setCurrentIndicatorActive(t){let i=this.teamdesign.querySelector(".carousel-indicators li.active"),e=this.teamdesign.querySelector('.carousel-indicators li[data-value="'+t+'"]');i.classList.remove("active"),e.classList.add("active")}indicatorClicked(t){let i=this.teamdesign.querySelector(".carousel-indicators li.active"),e=t.currentTarget.getAttribute("data-value"),s=this.teamdesign.querySelector('.slider .slide[data-value="'+e+'"]'),l="left";for(let r=0;r<this.indicators.length;r++){let a=this.indicators[r];if(a===i)break;a==t.currentTarget&&(l="right")}this.setCurrentIndicatorActive(e),this.initializeSlide(s,l)}touchStart(t){this.isTouchStart=!0,this.startX=t.touches[0].clientX}touchMove(t){this.isTouchStart&&(this.distance=t.touches[0].clientX-this.startX)}touchStop(){this.isTouchStart=!1,this.distance>100?this.leftClick():this.distance<-100&&this.rightClick()}}let teamdesign10_unqreplaceid_=new TeamDesign10_unqreplaceid_;`;
        var profilesliderappendnode2 = `<div class="slide edw-slider-item" data-value="5"><div class="member-card"><div class="box"><div class="card-header"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider2/images/card-images/image-1.png" alt="card-1"></div></div></div><div class="member-card-footer"><p class="name testimonial-user-name">Brad Gore</p><p class="desc testimonial-user-desg">Phycology</p></div></div></div>`;
        Vvveb.Components.extend("_base", "html/profileslider2", {
            name: "Profile slider 2",
            attributes: ['data-ebpb-profileslider2'],
            image: "icons/profileslider2.png",
            classes: ['edwiser-pb-profileslider2'],
            html: (() => {
                return `<div class="edwiser-pb-profileslider2" data-vvveb-disabled-area contenteditable="false">${profilesliderhtml2}<style>${profileslidercss2}</style><script>${profilesliderjs2}</script></div>`;
            })(),
            beforeInit: function (node) {
                properties = [];
                var i = 0;
                var slideno = 0;
                var id = generateUniqueID();
                node.innerHTML = node.innerHTML.replaceAll("_unqreplaceid_", id);
                $(node).find(".edw-slider-item").each(function (e) {
                    i = generateUniqueID();
                    slideno++;
                    var regex = /edw-carousel-item-\d+/;
                    var matchedClass = "";
                    var hasMatchingClass = $(this).filter(function () {
                        var classNames = $(this).attr('class').split(' ');
                        return classNames.some(function (className) {
                            if (regex.test(className)) {
                                matchedClass = className;
                                return true;
                            }
                            return false;
                        });
                    }).length > 0;
                    $(this).removeClass(matchedClass);
                    $(this).addClass("edw-carousel-item-" + i);
                    $(this).attr('data-value', slideno);
                    // profileDesignIndicatorHandlder(node,i);
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Profile " + slideno,
                                extraclass: "edwslideheading m-0",
                                type: "h6",
                                style: ""
                            }
                        },
                        {
                            name: "",
                            key: "deleteslideritem",
                            inputtype: EdwbuttonInput,
                            child: `.edw-carousel-item-${i}`,
                            edwclasses: "edwslidedelbtn",
                            data: { text: "", icon: "la-trash", extraclasses: "btn btn-outline-danger" },
                            onChange: function (node, value, input) {
                                $(node).remove();
                                Vvveb.Components.render("html/profileslider2");
                                return node;
                            },
                        },
                        {
                            name: SETTINGTITLES.NAME,
                            key: "sliderprofilename" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .testimonial-user-name`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                            onChange: function (node, value, input) {
                                if (value == "") {
                                    $(node).hide();
                                } else {
                                    $(node).show().text(value);
                                }
                            }
                        },
                        {
                            name: SETTINGTITLES.DESIGNATION,
                            key: "sliderdesignation" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .testimonial-user-desg`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                            onChange: function (node, value, input) {
                                if (value == "") {
                                    $(node).hide();
                                } else {
                                    $(node).show().text(value);
                                }
                            }
                        },
                        {
                            name: SETTINGTITLES.IMAGE,
                            key: "sliderimage" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .edw-profile-img`,
                        }
                    );
                });
                properties = removeDeleteButton(node, properties, 2);
                hideNavigatorsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
                }
                if (!$(node).find('.edw-carousel-indicators').children('li').hasClass('active')) {
                    $(node).find('.edw-carousel-indicators li').first().addClass('active');
                }

                var cardCount = $(node).find('.edw-slider-inner-container').children('.edw-slider-item').length;

                $(node).find('.edw-slider-item').removeClass("active next-1 next-2 next-3");

                // Add classes based on the number of cards
                if (cardCount >= 1) {
                    $(node).find(".edw-slider-item:eq(0)").addClass("active");
                }
                if (cardCount >= 2) {
                    $(node).find(".edw-slider-item:eq(1)").addClass("next-1");
                }
                if (cardCount >= 3) {
                    $(node).find(".edw-slider-item:eq(2)").addClass("next-2");
                }
                if (cardCount >= 4) {
                    $(node).find(".edw-slider-item:eq(3)").addClass("next-3");
                }

                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                this.properties = properties.concat(this.properties);
                // slideIntervalfielddisabler(node);
                return node;
            },
            properties: [
                {
                    name: "",
                    key: "addNewSlide",
                    inputtype: EdwbuttonInput,
                    edwclasses: "edwnewslidebtn",
                    data: { text: "Add new slide", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                    onChange: function (node) {
                        //render component properties again to include the new column inputs
                        $(node).parent().find('.edw-slider-inner-container').append(profilesliderappendnode2);
                        Vvveb.Components.render("html/profileslider2");

                        return node;
                    }
                },
            ]
        });



        // Profile Slider 2  --> Team Design - 10
        var profilesliderhtml3 = `<section class="section-boardmembers sec-bm_unqreplaceid_" id="teamdesign11_unqreplaceid_"><div class="section-container carousel-container"><div class="slider edw-carousel"><div class="slider-inner edw-slider-inner-container"><div class="slide edw-slider-item active" data-value="1"><div class="member-card"><div class="box"><div class="card-header"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider3/images/card-images/image-1.png" alt="card-1"></div></div></div><div class="member-card-footer"><p class="name testimonial-user-name">Henry Jones</p><p class="card-desc testimonial-user-desg">Founder</p></div></div></div><div class="slide edw-slider-item" data-value="2"><div class="member-card"><div class="box"><div class="card-header"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider3/images/card-images/image-2.png" alt="card-1"></div></div></div><div class="member-card-footer"><p class="name testimonial-user-name">John Smith</p><p class="card-desc testimonial-user-desg">CEO</p></div></div></div><div class="slide edw-slider-item" data-value="3"><div class="member-card"><div class="box"><div class="card-header"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider3/images/card-images/image-3.png" alt="card-1"></div></div></div><div class="member-card-footer"><p class="name testimonial-user-name">Emily Johnson</p><p class="card-desc testimonial-user-desg">Product Manager</p></div></div></div><div class="slide edw-slider-item" data-value="4"><div class="member-card"><div class="box"><div class="card-header"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider3/images/card-images/image-4.png" alt="card-1"></div></div></div><div class="member-card-footer"><p class="name testimonial-user-name">James Davis</p><p class="card-desc testimonial-user-desg">Sales Manager</p></div></div></div></div></div><div class="action-wrapper"><ol class="carousel-indicators edw-carousel-indicators"><li class="active" data-value="1"></li><li data-value="2"></li><li data-value="3"></li><li data-value="4"></li></ol></div></div></section>`;
        var profileslidercss3 = ` .sec-bm_unqreplaceid_ {padding: 40px 0px 50px;}.sec-bm_unqreplaceid_ .section-container {max-width: 1320px;margin: 0 auto;}.sec-bm_unqreplaceid_ .slider {overflow: hidden;padding: 4px 24px 4px;}.sec-bm_unqreplaceid_ .slider-inner {position: relative;min-height: 350px;display: flex;flex-wrap: wrap;gap: 46px;justify-content: center;}.sec-bm_unqreplaceid_ .slider-inner:has(.slide:nth-child(5)) {justify-content: left;}.sec-bm_unqreplaceid_ .member-card {transform-origin: center center;transition: transform 0.5s;}.sec-bm_unqreplaceid_ .member-card .box {content: "";display: block;padding-top: 100%;position: relative;}.sec-bm_unqreplaceid_ .member-card .card-header {position: absolute !important;top: 0;left: 0;width: 100%;height: 100%;margin: 0 auto;border-radius: 100%;overflow: hidden;padding: 20px;background-color: #fff;border: 1px solid #3E86F5;transition: filter 0.3s ease;}.sec-bm_unqreplaceid_ .member-card .img-box {border-radius: 100%;overflow: hidden;height: 100%;width: 100%;}.sec-bm_unqreplaceid_ .member-card .img-box img {height: 100%;width: 100%;object-fit: cover;object-position: top center;}.sec-bm_unqreplaceid_ .member-card-footer {padding: 16px 28px 0;text-align: center;}.sec-bm_unqreplaceid_ .member-card .name {color: #444;text-align: center;font-size: 16px;font-weight: 700;line-height: 22px;margin: 0;}.sec-bm_unqreplaceid_ .member-card .card-desc {color: #555;text-align: center;font-size: 20px;font-weight: 400;line-height: normal;margin: 8px 0 0;}.sec-bm_unqreplaceid_ .slide {width: calc(25% - 35px);}.sec-bm_unqreplaceid_ .action-wrapper {display: flex;align-items: center;justify-content: center;margin: 0 auto;gap: 30px;}.sec-bm_unqreplaceid_ .carousel-indicators {display: none;position: static;gap: 12px;width: fit-content;margin: auto 0;}.sec-bm_unqreplaceid_ .carousel-indicators li {opacity: 1;background-color: #D5DDEA !important;width: 11px;height: 11px;border-radius: 50%;margin: 0;cursor: pointer;}.sec-bm_unqreplaceid_ .carousel-indicators li button {display: none;}.sec-bm_unqreplaceid_ .carousel-indicators li.active {background-color: #3E86F5 !important;}@media screen and (max-width: 1024px) {.sec-bm_unqreplaceid_ .section-container {max-width: 820px;}.sec-bm_unqreplaceid_ .slider-inner:has(.slide:nth-child(3)) {justify-content: left;}.sec-bm_unqreplaceid_ .slide {width: calc(50% - 23px);}.sec-bm_unqreplaceid_ .member-card {max-width: 273px;margin: 0 auto;}}@media screen and (max-width: 767px) {.sec-bm_unqreplaceid_ .section-container {max-width: 600px;}.sec-bm_unqreplaceid_ .carousel-indicators {display: flex;}.sec-bm_unqreplaceid_ .slider {overflow: hidden;padding: 4px 24px 40px;}.sec-bm_unqreplaceid_ .slide {position: absolute !important;top: 0;left: -110%;width: 100%;transition: left 0.5s ease-in;}.sec-bm_unqreplaceid_ .slide.active {left: 0;}@keyframes toRight {0% {left: 0%;}100% {left: 110%;}}@keyframes toLeft {0% {left: 110%;}100% {left: 0%;}}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .sec-bm_unqreplaceid_ .slider-inner:has(.slide:nth-child(3)) {justify-content: left;}.edw-limitedwidth-block .sec-bm_unqreplaceid_ .slide {width: calc(50% - 23px);}}`;
       var profilesliderjs3 = ` class TeamDesign11_unqreplaceid_{constructor(){this.teamdesign=document.querySelector("#teamdesign11_unqreplaceid_"),this.slider=this.teamdesign.querySelector(".slider-inner"),this.indicators=this.teamdesign.querySelectorAll(".carousel-indicators li"),this.isTouchStart=!1,this.startX=0,this.distance=0,this.initializeSlide=this.initializeSlide.bind(this),this.leftClick=this.leftClick.bind(this),this.rightClick=this.rightClick.bind(this),this.indicatorClicked=this.indicatorClicked.bind(this),this.setSliderHeight=this.setSliderHeight.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchStop=this.touchStop.bind(this),this.initializeEventListeners()}initializeEventListeners(){window.addEventListener("load",(()=>{this.setSliderHeight(),setTimeout((()=>this.setSliderHeight()),300)})),window.addEventListener("resize",(()=>{this.setSliderHeight(),setTimeout((()=>this.setSliderHeight()),300)})),this.indicators.forEach((t=>{t.addEventListener("click",this.indicatorClicked)})),this.slider.addEventListener("touchstart",this.touchStart),this.slider.addEventListener("touchmove",this.touchMove),this.slider.addEventListener("touchend",this.touchStop)}setSliderHeight(){if(window.innerWidth<768){let t=this.teamdesign.querySelectorAll(".member-card"),i=0;t.forEach((t=>{i=Math.max(i,t.offsetHeight)})),this.slider.style.height=i+10+"px"}else this.slider.style.height=""}initializeSlide(t="",i=""){let e=this.teamdesign.querySelector(".slide.active");e.classList.remove("active"),t.classList.add("active"),"right"==i?e.style.animation="toRight 0.5s ease-in forwards":t.style.animation="toLeft 0.5s ease-in forwards",this.setCurrentIndicatorActive(t.getAttribute("data-value")),setTimeout((()=>{e.style.animation="",t.style.animation=""}),500)}leftClick(){let t=this.teamdesign.querySelector(".slider .slide.active").previousElementSibling;t||(t=this.teamdesign.querySelector(".slider .slide:last-child")),this.initializeSlide(t,"right")}rightClick(){let t=this.teamdesign.querySelector(".slider .slide.active").nextElementSibling;t||(t=this.teamdesign.querySelector(".slider .slide:first-child")),this.initializeSlide(t,"left")}setCurrentIndicatorActive(t){let i=this.teamdesign.querySelector(".carousel-indicators li.active"),e=this.teamdesign.querySelector('.carousel-indicators li[data-value="'+t+'"]');i.classList.remove("active"),e.classList.add("active")}indicatorClicked(t){let i=this.teamdesign.querySelector(".carousel-indicators li.active"),e=t.currentTarget.getAttribute("data-value"),s=this.teamdesign.querySelector('.slider .slide[data-value="'+e+'"]'),r="left";for(let e=0;e<this.indicators.length;e++){const s=this.indicators[e];if(s===i)break;s==t.currentTarget&&(r="right")}this.setCurrentIndicatorActive(e),this.initializeSlide(s,r)}touchStart(t){this.isTouchStart=!0,this.startX=t.touches[0].clientX}touchMove(t){this.isTouchStart&&(this.distance=t.touches[0].clientX-this.startX)}touchStop(){this.isTouchStart=!1,this.distance>100?this.leftClick():this.distance<-100&&this.rightClick()}}let teamdesign11_unqreplaceid_=new TeamDesign11_unqreplaceid_;`;
        var profilesliderappendnode3 = `<div class="slide edw-slider-item" data-value="3"><div class="member-card"><div class="box"><div class="card-header"><div class="img-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/profileslider3/images/card-images/image-3.png" alt="card-1"></div></div></div><div class="member-card-footer"><p class="name testimonial-user-name">Emily Johnson</p><p class="card-desc testimonial-user-desg">Product Manager</p></div></div></div>`;
        Vvveb.Components.extend("_base", "html/profileslider3", {
            name: "Profile slider 3",
            attributes: ['data-ebpb-profileslider3'],
            image: "icons/profileslider3.svg",
            classes: ['edwiser-pb-profileslider3'],
            html: (() => {
                return `<div class="edwiser-pb-profileslider3" data-vvveb-disabled-area contenteditable="false">${profilesliderhtml3}<style>${profileslidercss3}</style><script>${profilesliderjs3}</script></div>`;
            })(),
            beforeInit: function (node) {
                properties = [];
                var i = 0;
                var slideno = 0;
                var id = generateUniqueID();
                node.innerHTML = node.innerHTML.replaceAll("_unqreplaceid_", id);
                $(node).find(".edw-slider-item").each(function (e) {
                    i = generateUniqueID();
                    slideno++;
                    var regex = /edw-carousel-item-\d+/;
                    var matchedClass = "";
                    var hasMatchingClass = $(this).filter(function () {
                        var classNames = $(this).attr('class').split(' ');
                        return classNames.some(function (className) {
                            if (regex.test(className)) {
                                matchedClass = className;
                                return true;
                            }
                            return false;
                        });
                    }).length > 0;
                    $(this).removeClass(matchedClass);
                    $(this).addClass("edw-carousel-item-" + i);
                    $(this).attr('data-value', slideno);
                    profileDesignIndicatorHandlder(node,i);
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Profile " + slideno,
                                extraclass: "edwslideheading m-0",
                                type: "h6",
                                style: ""
                            }
                        },
                        {
                            name: "",
                            key: "deleteslideritem",
                            inputtype: EdwbuttonInput,
                            child: `.edw-carousel-item-${i}`,
                            edwclasses: "edwslidedelbtn",
                            data: { text: "", icon: "la-trash", extraclasses: "btn btn-outline-danger" },
                            onChange: function (node, value, input) {
                                $(node).remove();
                                Vvveb.Components.render("html/profileslider3");
                                return node;
                            },
                        },
                        {
                            name: SETTINGTITLES.NAME,
                            key: "sliderprofilename" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .testimonial-user-name`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                            onChange: function (node, value, input) {
                                if (value == "") {
                                    $(node).hide();
                                } else {
                                    $(node).show().text(value);
                                }
                            }
                        },
                        {
                            name: SETTINGTITLES.DESIGNATION,
                            key: "sliderdesignation" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .testimonial-user-desg`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                            onChange: function (node, value, input) {
                                if (value == "") {
                                    $(node).hide();
                                } else {
                                    $(node).show().text(value);
                                }
                            }
                        },
                        {
                            name: SETTINGTITLES.IMAGE,
                            key: "sliderimage" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .edw-profile-img`,
                        }
                    );
                });
                properties = removeDeleteButton(node, properties, 2);
                // hideNavigatorsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
                }

                if (!$(node).find('.edw-carousel-indicators').children('li').hasClass('active')) {
                    $(node).find('.edw-carousel-indicators li').first().addClass('active');
                }
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                this.properties = properties.concat(this.properties);
                // slideIntervalfielddisabler(node);
                return node;
            },
            properties: [
                {
                    name: "",
                    key: "addNewSlide",
                    inputtype: EdwbuttonInput,
                    edwclasses: "edwnewslidebtn",
                    data: { text: "Add new slide", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                    onChange: function (node) {
                        //render component properties again to include the new column inputs
                        $(node).parent().find('.edw-slider-inner-container').append(profilesliderappendnode3);
                        Vvveb.Components.render("html/profileslider3");

                        return node;
                    }
                },
            ]
        });
    }
    function profileDesignIndicatorHandlder(node, i) {
        $(node).find(".edw-carousel-indicators").empty();
        var id = $(node).find('.edw-carousel').attr('id');
        var x = 1;
        $(node).find(".edw-slider-item").each(function (e) {
            $(node).find(".edw-carousel-indicators").append(`<li data-value="${$(this).attr("data-value")}" data-slide-to="${x}"></li>`);
            if ($(this).hasClass('active')) {
                $(node).find(`.edw-carousel-indicators li[data-slide-to='${x}']`).addClass('active');
            }
            x++;
        });
    }
    function Indicatordesign2(node, i) {
        $(node).find(".edw-carousel-indicators").empty();
        var id = $(node).find('.edw-carousel').attr('id');
        var x = 0;
        $(node).find(".edw-slider-item").each(function (e) {
            $(node).find(".edw-carousel-indicators").append(` <span class="indicator-btn" data-value="${$(this).attr('data-value')}"></span>`);
            if ($(this).hasClass('active')) {
                $(node).find(`.edw-carousel-indicators span[data-value="${$(this).attr('data-value')}"]`).addClass('active');
            }
            x++;
        });
    }
    function generatesinglecarouselfooteritem(node, carouselitem, i) {
        $profileimgurl = $(carouselitem).find('.edw-profile-img').attr('src');
        if ($(node).parent().find(`.edw-carousel .carousel-footer .footer-image-box div[data-value= "${i}"]`).length == 0) {
            $(node).parent().find('.edw-carousel .carousel-footer .footer-image-box').append(
                `<div class="profile-image-box " data-value="${i}">
                    <div>
                        <div>
                            <img src="${$profileimgurl}"
                                alt="profile-1" />
                        </div>
                    </div>
                </div>`
            );
        }
    }
    function deletecarouselfooterboxitem(node) {
        var data = $(node).attr('data-value');
        if ($(node).closest('.edw-carousel').find(`.carousel-footer .footer-image-box div[data-value= "${data}"]`).length > 0) {
            $(node).closest('.edw-carousel').find(`.carousel-footer .footer-image-box div[data-value= "${data}"]`).remove();
            console.log("footer box deleted sucessfully");
        }
    }
    function applyTextColorsBeforeInit(node, sliderbgclass) {
        var value = $(node).parent().find(`${sliderbgclass}:first-child`).css('background-color');
        var slideusernamecolor = $(node).parent().find('.testimonial-user-name:first-child').css('color');
        var slideuserdesgcolor = $(node).parent().find('.testimonial-user-desg:last-child').css('color');
        var slideuserdesccolor = $(node).parent().find('.edw-carousel-content-para:first-child').css('color');
        if (slideuserdesccolor == undefined) {
            slideuserdesccolor = $(node).parent().find('.edw-carousel-content-para:last-child').css('color');
        }
        $(node).parent().find(`${sliderbgclass}`).css('background-color', value);
        $(node).parent().find('.testimonial-user-name').css('color', slideusernamecolor);
        $(node).parent().find('.testimonial-user-desg').css('color', slideuserdesgcolor);
        $(node).parent().find('.edw-carousel-content-para').css('color', slideuserdesccolor);
    }
    function generateUniqueID() {
        // Get the current timestamp (milliseconds since Unix Epoch)
        var timestamp = new Date().getTime();

        // Generate a random number (0-99999)
        var randomNum = Math.floor(Math.random() * 100);

        // Concatenate the timestamp and random number to create the unique ID
        var uniqueID = timestamp + randomNum;

        return uniqueID;
    }
    function removeDeleteButton(node, properties, i) {
        var numberOfChildren = $(node).find(".edw-slider-item").length;
        if (numberOfChildren <= i) {
            properties = properties.map(function (item) {
                if (item.key == 'deleteslideritem') {
                    item.data['extraclasses'] = item.data['extraclasses'] + ' disabled';
                }
                return item;
            });
        }
        return properties;
    }


    function hideNavigatorsOnSingleSlide(node) {
        var numberOfChildren = $(node).find(".edw-slider-item").length;
        if (numberOfChildren == 1) {
                $(node).parent().find('.edw-control-prev').addClass('d-none');
                $(node).parent().find('.edw-control-next').addClass('d-none');
                $(node).parent().find('.edw-carousel-indicators').addClass('d-none');
        } else {
                $(node).parent().find('.edw-control-prev').removeClass('d-none');
                $(node).parent().find('.edw-control-next').removeClass('d-none');
                $(node).parent().find('.edw-carousel-indicators').removeClass('d-none');
        }
    }
    function slideIntervalfielddisabler(node) {
        $(document).ready(function () {
            // var autoplaycheckedstatus = $(node).parent().find('.edw-slider-autoplay').attr('checked');
            var autoplaycheckedstatus = $(document).find('[name="autoplayslides"]').is(":checked");
            console.log(autoplaycheckedstatus);
            if (!autoplaycheckedstatus) {
                $(document).find('#left-panel .edwinputfield[data-key="slideinterval"] input').attr('disabled', 'disabled');
            } else {
                $(document).find('#left-panel .edwinputfield[data-key="slideinterval"] input').removeAttr('disabled');
            }
        });
    }
    return {
        init: function () {
            var blocks = ["html/profileslider1", "html/profileslider2", "html/profileslider3"];
            addBlocks(blocks);
        }
    }

});
