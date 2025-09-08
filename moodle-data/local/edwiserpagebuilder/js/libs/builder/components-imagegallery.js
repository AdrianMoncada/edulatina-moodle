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
define('local_edwiserpagebuilder/components-imagegallery', ['local_edwiserpagebuilder/jquery', 'core/ajax'], function (jQuery, Ajax) {

    function addBlocks(blocks) {
        Vvveb.ComponentsGroup['Edwiser Image Sliders'] = blocks;
        var SETTINGTITLES = {
            TITLE: 'Title',
            TITLECOLOR: 'Title color',
            DESCRIPTION: 'Description',
            DESCRIPTIONCOLOR: 'Description Color',
            IMAGE: 'Image',
            Icon: 'Icon',
            IMAEGEDESKTOP: 'Image (Desktop)',
            IMAGETAB: 'Image (Tab)',
            IMAGEMOB: 'Image (Mobile)',
            BACKGROUNDIMG: 'Background Image',
            BUTTONTEXT: 'Button text',
            LINK: 'Link',
            BUTTONBACKGROUNDCOLOR: 'Button background color',
            BUTTONBORDERCOLOR: 'Button border color',
            BUTTONTEXTCOLOR: 'Button text color',
            SHOWNAVIGATIONBUTTONS: 'Show navigation arrows',
            SHOWNAVIGATIONBULLETS: 'Show navigation bullets',
            SHOWNAVIGATIONBUTTONSDESKANDTAB: 'Show navigation arrows(Desktop and Tablet only)',
            SHOWNAVIGATIONBUTTONSDESKTOP: 'Show navigation arrows(Desktop only)',
            SHOWNAVIGATIONBULLETSMOB: 'Show navigation bullets(Mobile only)',
            AUTOPLAYSLIDES: 'Autoplay slides',
            PAUSESLIDESONHOVER: 'Pause slides on hover',
            SLIDEINTERVAL: 'Slide interval',
            SWITCHTITLE: 'Title',
            TABTITLE: 'Tab Title',
            CONTENT: 'Content',
            ARROWASSETCOLOR:'Navigation arrows,border & bullets',
            ARROWONLYCOLOR:'Navigation arrows and border',
            ARROWSHOVER:'Navigation arrows hover',
            ARROWSANDBULLETS:'Navigation arrows & bullets',
            ARROWASSETCOLORINFO:'Show navigation arrows  setting must be enabled',
        };
        // Slider 2 --> Image slider
        var sliderhtml2 = `<div class="edw_slider_unqreplaceid_ edw_adv_slider edw-adv-slider-2 overflow-hidden"><div class="slider-container edw-carousel" data-url="${Vvveb.serverurl}/CDN/slidernewdesign2/slider2bgimg.png" style="background:url(${Vvveb.serverurl}/CDN/slidernewdesign2/slider2bgimg.png)" data-ride="carousel" data-interval="3000" data-pause="hover" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover"><div class="slider-content edw-slider-inner-container"><div class="slider-single edw-slider-item preactive"><img class="slider-single-image desktop edw-img-desktop" src="${Vvveb.serverurl}/CDN/slidernewdesign2/sliderimage1.png" alt="1"> <img class="slider-single-image tab edw-img-tab" src="${Vvveb.serverurl}/CDN/slidernewdesign2/sliderimage1tab.png" alt="1"> <img class="slider-single-image mob edw-img-mob" src="${Vvveb.serverurl}/CDN/slidernewdesign2/sliderimage1mob.png" alt="1"></div><div class="slider-single edw-slider-item active"><img class="slider-single-image desktop edw-img-desktop" src="${Vvveb.serverurl}/CDN/slidernewdesign2/sliderimage2.png" alt="1"> <img class="slider-single-image tab edw-img-tab" src="${Vvveb.serverurl}/CDN/slidernewdesign2/sliderimage2tab.png" alt="1"> <img class="slider-single-image mob edw-img-mob" src="${Vvveb.serverurl}/CDN/slidernewdesign2/sliderimage2mob.png" alt="1"></div><div class="slider-single edw-slider-item proactive"><img class="slider-single-image desktop edw-img-desktop" src="${Vvveb.serverurl}/CDN/slidernewdesign2/sliderimage3.png" alt="1"> <img class="slider-single-image tab edw-img-tab" src="${Vvveb.serverurl}/CDN/slidernewdesign2/sliderimage3tab.png" alt="1"> <img class="slider-single-image mob edw-img-mob" src="${Vvveb.serverurl}/CDN/slidernewdesign2/sliderimage3mob.png" alt="1"></div></div><a class="slider-left edw-control-prev edw-slide-control d-none"><i class="fa fa-light fa-angle-right"></i></a><a class="slider-right edw-control-next edw-slide-control d-none"><i class="fa fa-light fa-angle-left"></i></a><div class="bullet-container edw-carousel-indicators"></div><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></div></div>`;
        var slidercss2 = `.edw_slider_unqreplaceid_ {overflow: hidden;direction: ltr;}.edw_slider_unqreplaceid_ .slider-container {position: relative;margin: 0 auto;height: 668px;background-repeat: no-repeat !important;background-size: cover !important;}.edw_slider_unqreplaceid_ .slider-container .bullet-container {position: absolute;bottom: 10px;width: 100%;display: none;align-items: center;justify-content: center;}.edw_slider_unqreplaceid_ .slider-container .bullet-container .bullet {margin-right: 14px;height: 20px;width: 20px;border-radius: 50%;background-color: white;opacity: 0.5;}.edw_slider_unqreplaceid_ .slider-container .bullet-container .bullet:last-child {margin-right: 0px;}.edw_slider_unqreplaceid_ .slider-container .bullet-container .bullet.active {opacity: 1;}.edw_slider_unqreplaceid_ .slider-container .slider-content {position: relative;left: 50%;top: 50%;width: 70%;height: 100%;transform: translate(-50%, -50%);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single {position: absolute;z-index: 0;left: 50%;top: 50%;width: 100%;height: 100%;max-height: 525px;transform: translate(-50%, -50%);transition: z-index 0ms 250ms;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image {position: relative;left: 0;top: 0;width: 100%;height: 100%;object-fit: cover;box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.2);transition: 500ms cubic-bezier(0.17, 0.67, 0.55, 1.43);transform: scale(0);opacity: 0;border-radius: 10px;overflow: hidden;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.tab {display: none;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.mob {display: none;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.preactivede .slider-single-image {transform: translateX(-50%) scale(0);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.preactive {z-index: 1;left: -18%;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.preactive .slider-single-image {opacity: 0.3;transform: translateX(-25%) scale(0.8);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.preactive .slider-single-download {transform: translateX(-150px);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.preactive .slider-single-title {transform: translateX(-150px);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.preactive .slider-single-likes {transform: translateX(-150px);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactive {z-index: 1;left: 118%;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactive .slider-single-image {opacity: 0.3;transform: translateX(25%) scale(0.8);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactive .slider-single-download {transform: translateX(150px);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactive .slider-single-title {transform: translateX(150px);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactive .slider-single-likes {transform: translateX(150px);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactivede .slider-single-image {transform: translateX(50%) scale(0);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.active {z-index: 2;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.active .slider-single-image {opacity: 1;transform: translateX(0%) scale(1);border: 1px solid #fff;}.edw_slider_unqreplaceid_ .slider-container .slider-left, .edw_slider_unqreplaceid_ .slider-container .slider-right {position: absolute;z-index: 3;display: block;left: 50%;top: 95%;background-color: #fff;color: #0051f9;font-size: 24px;transform: translateY(-50%);text-decoration: none;display: flex;align-items: center;justify-content: center;margin-right: -2px;margin-left: 25px;width: 46px;height: 46px;border-radius: 100%;border: 1px solid #0051f9;background-repeat: no-repeat;background-position: center;cursor: pointer;}.edw_slider_unqreplaceid_ .slider-container .slider-right {left: unset;right: 50%;margin-left: -2px;margin-right: 25px;}.edw_slider_unqreplaceid_ .slider-container .slider-left:hover, .edw_slider_unqreplaceid_ .slider-container .slider-right:hover {background-color: #0051f9;color: #fff;}.edw_slider_unqreplaceid_ .slider-container .not-visible {display: none !important;}@media (max-width: 769px) {.edw_slider_unqreplaceid_ .slider-content .slider-single .slider-single-image.desktop {display: none !important;}.edw_slider_unqreplaceid_ .slider-content .slider-single .slider-single-image.mob {display: none !important;}.edw_slider_unqreplaceid_ .slider-content .slider-single .slider-single-image.tab {display: block !important;}}@media (max-width: 425px) {.edw_slider_unqreplaceid_ .slider-container .slider-content {width: 85%;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single {max-width: 327px;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.tab {display: none !important;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.desktop {display: none !important;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.mob {display: block !important;}}.edw-rtl-block .edw_slider_unqreplaceid_ .slider-container .slider-left .fa, .edw-rtl-block .edw_slider_unqreplaceid_ .slider-container .slider-right .fa {transform: rotate(0deg);}`;
        var sliderjs2 = `document.addEventListener("DOMContentLoaded",function(){var e,s=!1,a=!1,i=!1;document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel").hasAttribute("data-ride")&&(s=document.querySelector(".edw-carousel[data-ride]").getAttribute("data-ride")),document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel").hasAttribute("data-pause")&&(a=document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel[data-pause]").getAttribute("data-pause")),document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel").hasAttribute("data-interval")&&(i=document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel[data-interval]").getAttribute("data-interval"));var t=document.querySelector(".edw_slider_unqreplaceid_ .slider-container"),r=document.querySelectorAll(".edw_slider_unqreplaceid_ .slider-single"),c=r.length-1,l=-1,v="";function d(){document.querySelector(".edw_slider_unqreplaceid_ .bullet-container").querySelectorAll(".bullet").forEach((e,s)=>{e.classList.remove("active"),s===l&&e.classList.add("active")})}function o(){l===r.length-1?(r[0].classList.add("not-visible"),r[r.length-1].classList.remove("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-right").classList.add("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-left").classList.remove("not-visible")):0===l?(r[r.length-1].classList.add("not-visible"),r[0].classList.remove("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-left").classList.add("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-right").classList.remove("not-visible")):(r[r.length-1].classList.remove("not-visible"),r[0].classList.remove("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-left").classList.remove("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-right").classList.remove("not-visible"))}function L(){if(l<c?l++:l=0,l>0)var e=r[l-1];else var e=r[c];var s=r[l];if(l<c)var a=r[l+1];else var a=r[0];1==r.length&&(s=r[0]),r.forEach(e=>{var s=e;s.classList.contains("preactivede")&&(s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.add("proactivede")),s.classList.contains("preactive")&&(s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("preactivede"))}),e.classList.remove("preactivede"),e.classList.remove("active"),e.classList.remove("proactive"),e.classList.remove("proactivede"),e.classList.add("preactive"),s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("active"),a.classList.remove("preactivede"),a.classList.remove("preactive"),a.classList.remove("active"),a.classList.remove("proactivede"),a.classList.add("proactive"),d()}function n(){if(l>0?l--:l=c,l<c)var e=r[l+1];else var e=r[0];var s=r[l];if(l>0)var a=r[l-1];else var a=r[c];r.forEach(e=>{var s=e;s.classList.contains("proactive")&&(s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.add("proactivede")),s.classList.contains("proactivede")&&(s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("preactivede"))}),a.classList.remove("preactivede"),a.classList.remove("active"),a.classList.remove("proactive"),a.classList.remove("proactivede"),a.classList.add("preactive"),s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("active"),e.classList.remove("preactivede"),e.classList.remove("preactive"),e.classList.remove("active"),e.classList.remove("proactivede"),e.classList.add("proactive"),d()}function p(){v=setInterval(function(){L()},i)}function m(){clearInterval(v)}1==r.length?(r[0].classList.remove("proactive"),r[0].classList.remove("preactive"),r[0].classList.add("active")):((e=document.querySelector(".edw_slider_unqreplaceid_ .bullet-container")).innerHTML="",r.forEach((t,r)=>{var c=document.createElement("div");c.classList.add("bullet"),c.id="bullet-index-"+r,c.addEventListener("click",()=>{(function e(s){for(var a=l>s?()=>L():()=>n();l!==s;)a()})(r),"false"!=i&&"false"!=s&&(m(),p())}),e.appendChild(c),t.classList.add("proactivede"),!1!=a&&(t.addEventListener("mouseover",()=>{m()}),t.addEventListener("mouseout",()=>{"false"!=i&&"false"!=s&&p()}))}),t.appendChild(e),document.querySelector(".edw_slider_unqreplaceid_ .slider-left").addEventListener("click",()=>{n(),"false"!=i&&"false"!=s&&(m(),p())}),document.querySelector(".edw_slider_unqreplaceid_ .slider-right").addEventListener("click",()=>{L(),"false"!=i&&"false"!=s&&(m(),p())}),setTimeout(function(){(function e(){if(l<c?l++:l=0,l>0)var s=r[l-1];else var s=r[c];var a=r[l];if(l<c)var i=r[l+1];else var i=r[0];1==r.length&&(a=r[0]),r.forEach(e=>{var s=e;s.classList.contains("preactivede")&&(s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.add("proactivede")),s.classList.contains("preactive")&&(s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("preactivede"))}),s.classList.remove("preactivede"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("preactive"),a.classList.remove("preactivede"),a.classList.remove("preactive"),a.classList.remove("proactive"),a.classList.remove("proactivede"),a.classList.add("active"),i.classList.remove("preactivede"),i.classList.remove("preactive"),i.classList.remove("active"),i.classList.remove("proactivede"),i.classList.add("proactive"),d()})()},500),"false"!=i&&"false"!=s&&p())});`;
        var appendnode2 = ` <div class="slider-single edw-slider-item"> <img class="slider-single-image desktop edw-img-desktop" src="${Vvveb.serverurl}/CDN/slidernewdesign2/slideimage1.png" alt="1" /> <img class="slider-single-image tab edw-img-tab" src="${Vvveb.serverurl}/CDN/slidernewdesign2/sliderimage1tab.png" alt="1" /> <img class="slider-single-image mob edw-img-mob" src="${Vvveb.serverurl}/CDN/slidernewdesign2/sliderimage1mob.png" alt="1" /> </div>`;
        Vvveb.Components.extend("_base", "html/slider2", {
            name: "Image slider",
            attributes: ['data-ebpb-slider2'],
            image: "icons/slider2.svg",
            classes: ['edwiser-pb-slider2'],
            html: (() => {
                return `<div class="edwiser-pb-slider2" data-vvveb-disabled-area contenteditable="false">${sliderhtml2}<style>${slidercss2}</style><script>${sliderjs2}</script></div>`;
            })(),
            beforeInit: function (node) {
                properties = [];
                var i = 0;
                var slideno = 0;
                var id = generateUniqueID();
                node.innerHTML = node.innerHTML.replaceAll("_unqreplaceid_", id);;
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
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Slide " + slideno,
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
                                Vvveb.Components.render("html/slider2");
                                return node;
                            },
                        },
                        {
                            name: SETTINGTITLES.IMAEGEDESKTOP,
                            key: "sliderimage" + i + "desktop",
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .edw-img-desktop`,

                        },
                        {
                            name: SETTINGTITLES.IMAGETAB,
                            key: "sliderimage" + i + "tab",
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .edw-img-tab`,
                        },
                        {
                            name: SETTINGTITLES.IMAGEMOB,
                            key: "sliderimage" + i + "mob",
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .edw-img-mob`,
                        }
                    );
                });
                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().removeClass("proactive preactive").addClass('active');
                }

                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("color") === -1;
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
                        $(node).parent().find('.edw-slider-inner-container').append(appendnode2);
                        Vvveb.Components.render("html/slider2");

                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.BACKGROUNDIMG,
                    key: "slidebackgroundimage",
                    htmlAttr: 'data-url',
                    inputtype: ImageInput,
                    edwclasses: "edwfilefield",
                    child: '.slider-container.edw-carousel',
                    onChange: function (node, value, input) {
                        $(node).parent().find(this.child).css("background-image", "url(" + value + ")");
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.SHOWNAVIGATIONBUTTONS,
                    key: "navigationbutton",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-slider-navigationbutton',
                    onChange: function (node, value, input) {
                        if (value == true) {
                            $(node).parent().find('.edw-control-prev').removeClass('d-none');
                            $(node).parent().find('.edw-control-next').removeClass('d-none');
                        } else {
                            $(node).parent().find('.edw-control-prev').addClass('d-none');
                            $(node).parent().find('.edw-control-next').addClass('d-none');
                        }
                        return node;
                    }
                },
                // {
                //     name: SETTINGTITLES.SHOWNAVIGATIONBULLETS,
                //     key: "navigationbullets",
                //     htmlAttr: "checked",
                //     col:12,
                //     inline:true,
                //     inputtype: CheckboxInput,
                //     edwclasses: "edwcheckfield",
                //     child:'.edw-slider-navigationbullets',
                //     onChange: function (node, value, input) {
                //         if(value == true){
                //             $(node).parent().find('.edw-carousel-indicators').removeClass('d-none');
                //         }else{
                //             $(node).parent().find('.edw-carousel-indicators').addClass('d-none');
                //         }
                //         return node;
                //     }
                // },
                {
                    name: SETTINGTITLES.AUTOPLAYSLIDES,
                    key: "autoplayslides",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-slider-autoplay',
                    onChange: function (node, value, input) {
                        var slideintervalfield = $(input).closest('section').find('[data-key="slideinterval"]');
                        if (value == true) {
                            $(node).parent().attr('data-ride', 'carousel');
                            $(node).parent().attr('data-interval', '3000');
                            $(node).parent().attr('data-bs-ride', 'carousel');
                            $(node).parent().attr('data-bs-interval', '3000');
                            slideintervalfield.find('input[name="slideinterval"]').val('3000');
                        } else {
                            $(node).parent().attr('data-ride', 'false');
                            $(node).parent().attr('data-interval', '0');
                            $(node).parent().attr('data-bs-ride', 'false');
                            $(node).parent().attr('data-bs-interval', '0');
                            slideintervalfield.find('input[name="slideinterval"]').val('0');
                        }
                        slideIntervalfielddisabler(node);
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.PAUSESLIDESONHOVER,
                    key: "pauseslides",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-slider-pauseonhover',
                    onChange: function (node, value, input) {
                        if (value == true) {
                            $(node).parent().attr('data-pause', 'hover');
                            $(node).parent().attr('data-bs-pause', 'hover');
                        } else {
                            $(node).parent().removeAttr('data-pause');
                            $(node).parent().removeAttr('data-bs-pause');
                        }
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.SLIDEINTERVAL,
                    key: "slideinterval",
                    htmlAttr: "data-interval",
                    inputtype: TextInput,
                    edwclasses: "edwinputfield",
                    child: `.edw-carousel`,
                    onChange: function (node, value, input) {

                        $(node).attr('data-interval', value);
                        $(node).attr('data-bs-interval', value);

                        return node;
                    }
                }
            ]
        });

        // Slider 4 --> Image slider with indicators
        var sliderhtml4 = `<div class="edw_slider_unqreplaceid_ edw_adv_slider edw-adv-slider-4 overflow-hidden"><div class="slider-container edw-carousel" data-url="${Vvveb.serverurl}/CDN/slidernewdesign4/slider2bgimg.png" style="background:url(${Vvveb.serverurl}/CDN/slidernewdesign4/slider2bgimg.png)" data-ride="carousel" data-interval="3000" data-pause="hover"><div class="slider-content edw-slider-inner-container"><div class="slider-single edw-slider-item active"><img class="slider-single-image desktop edw-img-desktop" src="${Vvveb.serverurl}/CDN/slidernewdesign4/sliderimage2.png" alt="1"> <img class="slider-single-image tab edw-img-tab" src="${Vvveb.serverurl}/CDN/slidernewdesign4/sliderimage2tab.png" alt="1"> <img class="slider-single-image mob edw-img-mob" src="${Vvveb.serverurl}/CDN/slidernewdesign4/sliderimage2mob.png" alt="1"></div><div class="slider-single edw-slider-item"><img class="slider-single-image desktop edw-img-desktop" src="${Vvveb.serverurl}/CDN/slidernewdesign4/sliderimage1.png" alt="1"> <img class="slider-single-image tab edw-img-tab" src="${Vvveb.serverurl}/CDN/slidernewdesign4/sliderimage1tab.png" alt="1"> <img class="slider-single-image mob edw-img-mob" src="${Vvveb.serverurl}/CDN/slidernewdesign4/sliderimage1mob.png" alt="1"></div><div class="slider-single edw-slider-item"><img class="slider-single-image desktop edw-img-desktop" src="${Vvveb.serverurl}/CDN/slidernewdesign4/sliderimage3.png" alt="1"> <img class="slider-single-image tab edw-img-tab" src="${Vvveb.serverurl}/CDN/slidernewdesign4/sliderimage3tab.png" alt="1"> <img class="slider-single-image mob edw-img-mob" src="${Vvveb.serverurl}/CDN/slidernewdesign4/sliderimage3mob.png" alt="1"></div></div><a class="slider-left edw-control-prev edw-slide-control"><i class="fa fa-light fa-angle-right"></i></a><a class="slider-right edw-control-next edw-slide-control"><i class="fa fa-light fa-angle-left"></i></a><div class="bullet-container edw-carousel-indicators"><div class="bullet active" id="bullet-index-0"></div><div class="bullet" id="bullet-index-1"></div><div class="bullet" id="bullet-index-2"></div></div><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></div></div>`;
        var slidercss4 = `.edw_slider_unqreplaceid_ {overflow: hidden;direction: ltr;}.edw_slider_unqreplaceid_ .slider-container {position: relative;margin: 0 auto;height: 668px;background-repeat: no-repeat !important;background-size: cover !important;}.edw_slider_unqreplaceid_ .slider-container .bullet-container {position: absolute !important;bottom: 20px;width: 100%;display: flex;align-items: center;justify-content: center;}.edw_slider_unqreplaceid_ .slider-container .bullet-container .bullet {margin-right: 14px;height: 8px;width: 8px;border-radius: 50%;background-color: #647390;opacity: 1;}.edw_slider_unqreplaceid_ .slider-container .bullet-container .bullet:last-child {margin-right: 0px;}.edw_slider_unqreplaceid_ .slider-container .bullet-container .bullet:hover {cursor: pointer;}.edw_slider_unqreplaceid_ .slider-container .bullet-container .bullet.active {opacity: 1;background-color: white !important;}.edw_slider_unqreplaceid_ .slider-container .slider-content {position: relative;left: 50%;top: 50%;width: 70%;height: 80%;transform: translate(-50%, -50%);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single {position: absolute !important;border-radius: 10px;border: 1px solid #fff;z-index: 0;left: 0;top: 0;width: 100%;height: 100%;overflow: hidden;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .bg-overlay {height: 40%;width: 100%;position: absolute !important;left: 0px;top: 60%;border: 38px;border-radius: 0px 10px 10px 0px;background: linear-gradient(0deg, #fff 25.37%, rgba(255, 255, 255, 0) 100%);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image {position: relative;left: 0;top: 0;width: 100%;height: 100%;transition: 500ms cubic-bezier(0.17, 0.67, 0.55, 1);transform: scale(0);opacity: 0;object-fit: cover;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.tab {display: none;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.mob {display: none;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.active {z-index: 2;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.active .slider-single-image {opacity: 1;transform: translateX(0%) scale(1);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.preactivede .slider-single-image {transform: translateX(-50%) scale(0);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.preactive {z-index: 1;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.preactive .slider-single-image {opacity: 0.3;transform: translateX(-25%) scale(0.8);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactive {z-index: 1;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactive .slider-single-image {opacity: 0.3;transform: translateX(25%) scale(0.8);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactive .slider-single-download {transform: translateX(150px);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactive .slider-single-title {transform: translateX(150px);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactive .slider-single-likes {transform: translateX(150px);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactivede .slider-single-image {transform: translateX(50%) scale(0);}.edw_slider_unqreplaceid_ .slider-container .slider-left, .edw_slider_unqreplaceid_ .slider-container .slider-right {position: absolute !important;z-index: 3;display: block;left: 90%;top: 50%;background-color: #fff;color: #0051f9;font-size: 24px;transform: translateY(-50%);width: 46px;height: 46px;border-radius: 10px;border: 1px solid #0051f9;cursor: pointer;text-decoration: none;display: flex;align-items: center;justify-content: center;}.edw_slider_unqreplaceid_ .slider-container .slider-right {left: unset;right: 90%;}.edw_slider_unqreplaceid_ .slider-container .slider-left:hover, .edw_slider_unqreplaceid_ .slider-container .slider-right:hover {background-color: #0051f9;color: #fff;}.edw_slider_unqreplaceid_ .slider-container .not-visible {display: none !important;}@media (max-width: 769px) {.edw_slider_unqreplaceid_ .slider-container .slider-left, .edw_slider_unqreplaceid_ .slider-container .slider-right {display: none;}.edw_slider_unqreplaceid_ .slider-container .slider-content {width: 95%;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.desktop {display: none !important;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.mob {display: none !important;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.tab {display: block !important;}}@media (max-width: 425px) {.edw_slider_unqreplaceid_ .slider-container .slider-content {width: 90%;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.tab {display: none !important;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.desktop {display: none !important;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.mob {display: block !important;}.edw_slider_unqreplaceid_ .slider-container .slider-right {display: none;}.edw_slider_unqreplaceid_ .slider-container .slider-left {display: none;}}.edw-rtl-block .edw_slider_unqreplaceid_ .slider-container .slider-left .fa, .edw-rtl-block .edw_slider_unqreplaceid_ .slider-container .slider-right .fa {transform: rotate(0deg);}`;
        var sliderjs4 = `document.addEventListener("DOMContentLoaded",function(){var e,s=!1,a=!1,i=!1;document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel").hasAttribute("data-ride")&&(s=document.querySelector(".edw-carousel[data-ride]").getAttribute("data-ride")),document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel").hasAttribute("data-pause")&&(a=document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel[data-pause]").getAttribute("data-pause")),document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel").hasAttribute("data-interval")&&(i=document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel[data-interval]").getAttribute("data-interval"));var t=document.querySelector(".edw_slider_unqreplaceid_ .slider-container"),r=document.querySelectorAll(".edw_slider_unqreplaceid_ .slider-single"),c=r.length-1,l=-1,v="";function d(){document.querySelector(".edw_slider_unqreplaceid_ .bullet-container").querySelectorAll(".bullet").forEach((e,s)=>{e.classList.remove("active"),s===l&&e.classList.add("active")})}function o(){l===r.length-1?(r[0].classList.add("not-visible"),r[r.length-1].classList.remove("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-right").classList.add("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-left").classList.remove("not-visible")):0===l?(r[r.length-1].classList.add("not-visible"),r[0].classList.remove("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-left").classList.add("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-right").classList.remove("not-visible")):(r[r.length-1].classList.remove("not-visible"),r[0].classList.remove("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-left").classList.remove("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-right").classList.remove("not-visible"))}function L(){if(l<c?l++:l=0,l>0)var e=r[l-1];else var e=r[c];var s=r[l];if(l<c)var a=r[l+1];else var a=r[0];1==r.length&&(s=r[0]),r.forEach(e=>{var s=e;s.classList.contains("preactivede")&&(s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.add("proactivede")),s.classList.contains("preactive")&&(s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("preactivede"))}),e.classList.remove("preactivede"),e.classList.remove("active"),e.classList.remove("proactive"),e.classList.remove("proactivede"),e.classList.add("preactive"),s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("active"),a.classList.remove("preactivede"),a.classList.remove("preactive"),a.classList.remove("active"),a.classList.remove("proactivede"),a.classList.add("proactive"),d()}function n(){if(l>0?l--:l=c,l<c)var e=r[l+1];else var e=r[0];var s=r[l];if(l>0)var a=r[l-1];else var a=r[c];r.forEach(e=>{var s=e;s.classList.contains("proactive")&&(s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.add("proactivede")),s.classList.contains("proactivede")&&(s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("preactivede"))}),a.classList.remove("preactivede"),a.classList.remove("active"),a.classList.remove("proactive"),a.classList.remove("proactivede"),a.classList.add("preactive"),s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("active"),e.classList.remove("preactivede"),e.classList.remove("preactive"),e.classList.remove("active"),e.classList.remove("proactivede"),e.classList.add("proactive"),d()}function p(){v=setInterval(function(){L()},i)}function m(){clearInterval(v)}1==r.length?(r[0].classList.remove("proactive"),r[0].classList.remove("preactive"),r[0].classList.add("active")):((e=document.querySelector(".edw_slider_unqreplaceid_ .bullet-container")).innerHTML="",r.forEach((t,r)=>{var c=document.createElement("div");c.classList.add("bullet"),c.id="bullet-index-"+r,c.addEventListener("click",()=>{(function e(s){for(var a=l>s?()=>L():()=>n();l!==s;)a()})(r),"false"!=i&&"false"!=s&&(m(),p())}),e.appendChild(c),t.classList.add("proactivede"),!1!=a&&(t.addEventListener("mouseover",()=>{m()}),t.addEventListener("mouseout",()=>{"false"!=i&&"false"!=s&&p()}))}),t.appendChild(e),document.querySelector(".edw_slider_unqreplaceid_ .slider-left").addEventListener("click",()=>{n(),"false"!=i&&"false"!=s&&(m(),p())}),document.querySelector(".edw_slider_unqreplaceid_ .slider-right").addEventListener("click",()=>{L(),"false"!=i&&"false"!=s&&(m(),p())}),setTimeout(function(){(function e(){if(l<c?l++:l=0,l>0)var s=r[l-1];else var s=r[c];var a=r[l];if(l<c)var i=r[l+1];else var i=r[0];1==r.length&&(a=r[0]),r.forEach(e=>{var s=e;s.classList.contains("preactivede")&&(s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.add("proactivede")),s.classList.contains("preactive")&&(s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("preactivede"))}),s.classList.remove("preactivede"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("preactive"),a.classList.remove("preactivede"),a.classList.remove("preactive"),a.classList.remove("proactive"),a.classList.remove("proactivede"),a.classList.add("active"),i.classList.remove("preactivede"),i.classList.remove("preactive"),i.classList.remove("active"),i.classList.remove("proactivede"),i.classList.add("proactive"),d()})()},500),"false"!=i&&"false"!=s&&p())});`;
        var appendnode4 = ` <div class="slider-single edw-slider-item"> <img class="slider-single-image desktop edw-img-desktop" src="${Vvveb.serverurl}/CDN/slidernewdesign4/sliderimage1.png" alt="1"/> <img class="slider-single-image tab edw-img-tab" src="${Vvveb.serverurl}/CDN/slidernewdesign4/sliderimage1tab.png" alt="1"/> <img class="slider-single-image mob edw-img-mob" src="${Vvveb.serverurl}/CDN/slidernewdesign4/sliderimage1mob.png" alt="1"/> </div>`;
        Vvveb.Components.extend("_base", "html/slider4", {
            name: "Image slider with indicators",
            attributes: ['data-ebpb-slider4'],
            image: "icons/slider4.svg",
            classes: ['edwiser-pb-slider4'],
            html: (() => {
                return `<div class="edwiser-pb-slider4" data-vvveb-disabled-area contenteditable="false">${sliderhtml4}<style>${slidercss4}</style><script>${sliderjs4}</script></div>`;
            })(),
            beforeInit: function (node) {
                properties = [];
                var i = 0;
                var slideno = 0;
                var id = generateUniqueID();
                // var js = `<script>${sliderjs4}</script>`;
                // if(!$(node).find("script").length >0){
                //     node.innerHTML = node.innerHTML+js;
                // }
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
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Slide " + slideno,
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
                                Vvveb.Components.render("html/slider4");
                                return node;
                            },
                        },
                        {
                            name: SETTINGTITLES.IMAEGEDESKTOP,
                            key: "sliderimage" + i + "desktop",
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .edw-img-desktop`,

                        },
                        {
                            name: SETTINGTITLES.IMAGETAB,
                            key: "sliderimage" + i + "tab",
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .edw-img-tab`,
                        },
                        {
                            name: SETTINGTITLES.IMAGEMOB,
                            key: "sliderimage" + i + "mob",
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .edw-img-mob`,
                        }
                    );
                });
                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().removeClass("proactive preactive").addClass('active');
                }
                updateIndicators(node, i);
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("color") === -1;
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
                        $(node).parent().find('.edw-slider-inner-container').append(appendnode4);
                        Vvveb.Components.render("html/slider4");

                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.BACKGROUNDIMG,
                    key: "slidebackgroundimage",
                    htmlAttr: 'data-url',
                    inputtype: ImageInput,
                    edwclasses: "edwfilefield",
                    child: '.slider-container.edw-carousel',
                    onChange: function (node, value, input) {
                        $(node).parent().find(this.child).css("background-image", "url(" + value + ")");
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.SHOWNAVIGATIONBUTTONSDESKTOP,
                    key: "navigationbutton",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-slider-navigationbutton',
                    onChange: function (node, value, input) {
                        if (value == true) {
                            $(node).parent().find('.edw-control-prev').removeClass('d-none');
                            $(node).parent().find('.edw-control-next').removeClass('d-none');
                        } else {
                            $(node).parent().find('.edw-control-prev').addClass('d-none');
                            $(node).parent().find('.edw-control-next').addClass('d-none');
                        }
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.SHOWNAVIGATIONBULLETS,
                    key: "navigationbullets",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-slider-navigationbullets',
                    onChange: function (node, value, input) {
                        if (value == true) {
                            $(node).parent().find('.edw-carousel-indicators').removeClass('d-none');
                        } else {
                            $(node).parent().find('.edw-carousel-indicators').addClass('d-none');
                        }
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.AUTOPLAYSLIDES,
                    key: "autoplayslides",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-slider-autoplay',
                    onChange: function (node, value, input) {
                        var slideintervalfield = $(input).closest('section').find('[data-key="slideinterval"]');
                        if (value == true) {
                            $(node).parent().attr('data-ride', 'carousel');
                            $(node).parent().attr('data-interval', '3000');
                            slideintervalfield.find('input[name="slideinterval"]').val('3000');
                        } else {
                            $(node).parent().attr('data-ride', 'false');
                            $(node).parent().attr('data-interval', '0');
                            slideintervalfield.find('input[name="slideinterval"]').val('0');
                        }
                        slideIntervalfielddisabler(node);
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.PAUSESLIDESONHOVER,
                    key: "pauseslides",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-slider-pauseonhover',
                    onChange: function (node, value, input) {
                        if (value == true) {
                            $(node).parent().attr('data-pause', 'hover');
                        } else {
                            $(node).parent().removeAttr('data-pause');
                        }
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.SLIDEINTERVAL,
                    key: "slideinterval",
                    htmlAttr: "data-interval",
                    inputtype: TextInput,
                    edwclasses: "edwinputfield",
                    child: `.edw-carousel`,
                }
            ]
        });

        // Slider 5 --> Image slider with caption
        var sliderhtml5 = `<div class="edw_slider_unqreplaceid_ edw_adv_slider edw-adv-slider-5 overflow-hidden"><div class="slider-container edw-carousel" data-url="${Vvveb.serverurl}/CDN/slidernewdesign5/slider2bgimg.png" style="background:url(${Vvveb.serverurl}/CDN/slidernewdesign5/slider2bgimg.png)" data-ride="carousel" data-interval="3000" data-pause="hover"><div class="slider-content edw-slider-inner-container"><div class="slider-single edw-slider-item active"><img class="slider-single-image desktop edw-img-desktop" src="${Vvveb.serverurl}/CDN/slidernewdesign5/sliderimage2.png" alt="1"> <img class="slider-single-image tab edw-img-tab" src="${Vvveb.serverurl}/CDN/slidernewdesign5/sliderimage2tab.png" alt="1"> <img class="slider-single-image mob edw-img-mob" src="${Vvveb.serverurl}/CDN/slidernewdesign5/sliderimage2mob.png" alt="1"><div class="bg-overlay"></div><div class="slider-caption"><h5 class="m-0 slider-caption-heading edw-carousel-content-heading">Let's design your future!</h5><p class="m-0 slider-caption-para edw-carousel-content-para">Edwiser School inspires a love of learning in children</p></div></div><div class="slider-single edw-slider-item"><img class="slider-single-image desktop edw-img-desktop" src="${Vvveb.serverurl}/CDN/slidernewdesign5/sliderimage1.png" alt="1"> <img class="slider-single-image tab edw-img-tab" src="${Vvveb.serverurl}/CDN/slidernewdesign5/sliderimage1tab.png" alt="1"> <img class="slider-single-image mob edw-img-mob" src="${Vvveb.serverurl}/CDN/slidernewdesign5/sliderimage1mob.png" alt="1"><div class="bg-overlay"></div><div class="slider-caption"><h5 class="m-0 slider-caption-heading edw-carousel-content-heading">Let's design your future!</h5><p class="m-0 slider-caption-para edw-carousel-content-para">Edwiser School inspires a love of learning in children</p></div></div><div class="slider-single edw-slider-item"><img class="slider-single-image desktop edw-img-desktop" src="${Vvveb.serverurl}/CDN/slidernewdesign5/sliderimage3.png" alt="1"> <img class="slider-single-image tab edw-img-tab" src="${Vvveb.serverurl}/CDN/slidernewdesign5/sliderimage3tab.png" alt="1"> <img class="slider-single-image mob edw-img-mob" src="${Vvveb.serverurl}/CDN/slidernewdesign5/sliderimage3mob.png" alt="1"><div class="bg-overlay"></div><div class="slider-caption"><h5 class="m-0 slider-caption-heading edw-carousel-content-heading">Let's design your future!</h5><p class="m-0 slider-caption-para edw-carousel-content-para">Edwiser School inspires a love of learning in children</p></div></div></div><a class="slider-left edw-control-prev edw-slide-control" style="--arrowassetcolor: rgba(0, 81, 249, 1);"><i class="fa fa-light fa-angle-right"></i></a><a class="slider-right edw-control-next edw-slide-control" style="--arrowassetcolor: rgba(0, 81, 249, 1);"><i class="fa fa-light fa-angle-left"></i></a><div class="bullet-container edw-carousel-indicators"><div class="bullet active" id="bullet-index-0"></div><div class="bullet" id="bullet-index-1"></div><div class="bullet" id="bullet-index-2"></div></div><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></div></div>`;
        var slidercss5 = `.edw_slider_unqreplaceid_ {--arrowassetcolor: rgba(0, 81, 249, 1);overflow: hidden;direction: ltr;}.edw_slider_unqreplaceid_ .slider-container {position: relative;margin: 0 auto;height: 668px;background-repeat: no-repeat !important;background-size: cover !important;}.edw_slider_unqreplaceid_ .slider-container .bullet-container {position: absolute !important;bottom: 20px;width: 100%;display: flex;align-items: center;justify-content: center;}.edw_slider_unqreplaceid_ .slider-container .bullet-container .bullet {margin-right: 14px;height: 8px;width: 8px;border-radius: 50%;background-color: #647390;opacity: 1;}.edw_slider_unqreplaceid_ .slider-container .bullet-container .bullet:last-child {margin-right: 0px;}.edw_slider_unqreplaceid_ .slider-container .bullet-container .bullet.active {opacity: 1;background-color: white !important;}.edw_slider_unqreplaceid_ .slider-container .bullet-container .bullet:hover {cursor: pointer;}.edw_slider_unqreplaceid_ .slider-container .slider-content {position: relative;left: 50%;top: 50%;width: 70%;height: 80%;transform: translate(-50%, -50%);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single {position: absolute !important;border-radius: 10px;border: 1px solid #fff;z-index: 0;left: 0;top: 0;width: 100%;height: 100%;transition: z-index 0ms 250ms;overflow: hidden;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .bg-overlay {height: 40%;width: 100%;position: absolute !important;left: 0px;top: 60%;border: 38px;border-radius: 0px 10px 10px 0px;background: linear-gradient(0deg, #fff 25.37%, rgba(255, 255, 255, 0) 100%);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-caption {position: absolute !important;bottom: 3px;left: 50%;width: 98%;text-align: center;transform: translate(-50%, -50%);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-caption .slider-caption-heading {font-size: 48px;font-style: normal;font-weight: 700;line-height: 56px;margin: 0px;color: #313848;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-caption .slider-caption-para {font-size: 18px;font-style: normal;font-weight: 400;line-height: 26px;margin: 0px;color: #4c5a73;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image {position: relative;left: 0;top: 0;width: 100%;height: 100%;transition: 500ms cubic-bezier(0.17, 0.67, 0.55, 1);transform: scale(0);opacity: 1;object-fit: cover;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.tab, .edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.mob {display: none;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.active {z-index: 2;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.active .slider-single-image {opacity: 1;transform: translateX(0%) scale(1);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.preactivede .slider-single-image {transform: translateX(-50%) scale(0);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.preactive {z-index: 1;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.preactive .slider-single-image {opacity: 0.3;transform: translateX(-25%) scale(0.8);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactive {z-index: 1;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactive .slider-single-image {opacity: 0.3;transform: translateX(25%) scale(0.8);}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single.proactivede .slider-single-image {transform: translateX(50%) scale(0);}.edw_slider_unqreplaceid_ .slider-container .slider-left, .edw_slider_unqreplaceid_ .slider-container .slider-right {position: absolute !important;z-index: 3;display: block;left: 90%;top: 50%;transform: translateY(-50%);background-repeat: no-repeat;border-radius: 2px;border: 1px solid var(--arrowassetcolor);background-color: #fff;color: var(--arrowassetcolor);font-size: 24px;width: 46px;height: 46px;cursor: pointer;text-decoration: none;display: flex;align-items: center;justify-content: center;}.edw_slider_unqreplaceid_ .slider-container .slider-right {left: unset;right: 90%;}.edw_slider_unqreplaceid_ .slider-container .slider-left:hover, .edw_slider_unqreplaceid_ .slider-container .slider-right:hover {background-color: var(--arrowassetcolor);color: #fff;}.edw_slider_unqreplaceid_ .slider-container .not-visible {display: none !important;}@media (max-width: 769px) {.edw_slider_unqreplaceid_ .slider-container .slider-left, .edw_slider_unqreplaceid_ .slider-container .slider-right {display: none;}.edw_slider_unqreplaceid_ .slider-container .slider-content {width: 95%;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.desktop {display: none !important;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.mob {display: none !important;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.tab {display: block !important;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-caption .slider-caption-heading {font-size: 34px;font-style: normal;font-weight: 700;line-height: 42px;}}@media (max-width: 426px) {.edw_slider_unqreplaceid_ .slider-container .slider-content {width: 90%;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.tab {display: none !important;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.desktop {display: none !important;}.edw_slider_unqreplaceid_ .slider-container .slider-content .slider-single .slider-single-image.mob {display: block !important;}}.edw-rtl-block .edw_slider_unqreplaceid_ .slider-container .slider-left .fa, .edw-rtl-block .edw_slider_unqreplaceid_ .slider-container .slider-right .fa {transform: rotate(0deg);}`;
        var sliderjs5 = `document.addEventListener("DOMContentLoaded",function(){var e,s=!1,a=!1,i=!1;document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel").hasAttribute("data-ride")&&(s=document.querySelector(".edw-carousel[data-ride]").getAttribute("data-ride")),document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel").hasAttribute("data-pause")&&(a=document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel[data-pause]").getAttribute("data-pause")),document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel").hasAttribute("data-interval")&&(i=document.querySelector(".edw_slider_unqreplaceid_ .edw-carousel[data-interval]").getAttribute("data-interval"));var t=document.querySelector(".edw_slider_unqreplaceid_ .slider-container"),r=document.querySelectorAll(".edw_slider_unqreplaceid_ .slider-single"),c=r.length-1,l=-1,v="";function d(){document.querySelector(".edw_slider_unqreplaceid_ .bullet-container").querySelectorAll(".bullet").forEach((e,s)=>{e.classList.remove("active"),s===l&&e.classList.add("active")})}function o(){l===r.length-1?(r[0].classList.add("not-visible"),r[r.length-1].classList.remove("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-right").classList.add("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-left").classList.remove("not-visible")):0===l?(r[r.length-1].classList.add("not-visible"),r[0].classList.remove("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-left").classList.add("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-right").classList.remove("not-visible")):(r[r.length-1].classList.remove("not-visible"),r[0].classList.remove("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-left").classList.remove("not-visible"),document.querySelector(".edw_slider_unqreplaceid_ .slider-right").classList.remove("not-visible"))}function L(){if(l<c?l++:l=0,l>0)var e=r[l-1];else var e=r[c];var s=r[l];if(l<c)var a=r[l+1];else var a=r[0];1==r.length&&(s=r[0]),r.forEach(e=>{var s=e;s.classList.contains("preactivede")&&(s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.add("proactivede")),s.classList.contains("preactive")&&(s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("preactivede"))}),e.classList.remove("preactivede"),e.classList.remove("active"),e.classList.remove("proactive"),e.classList.remove("proactivede"),e.classList.add("preactive"),s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("active"),a.classList.remove("preactivede"),a.classList.remove("preactive"),a.classList.remove("active"),a.classList.remove("proactivede"),a.classList.add("proactive"),d()}function n(){if(l>0?l--:l=c,l<c)var e=r[l+1];else var e=r[0];var s=r[l];if(l>0)var a=r[l-1];else var a=r[c];r.forEach(e=>{var s=e;s.classList.contains("proactive")&&(s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.add("proactivede")),s.classList.contains("proactivede")&&(s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("preactivede"))}),a.classList.remove("preactivede"),a.classList.remove("active"),a.classList.remove("proactive"),a.classList.remove("proactivede"),a.classList.add("preactive"),s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("active"),e.classList.remove("preactivede"),e.classList.remove("preactive"),e.classList.remove("active"),e.classList.remove("proactivede"),e.classList.add("proactive"),d()}function p(){v=setInterval(function(){L()},i)}function m(){clearInterval(v)}1==r.length?(r[0].classList.remove("proactive"),r[0].classList.remove("preactive"),r[0].classList.add("active")):((e=document.querySelector(".edw_slider_unqreplaceid_ .bullet-container")).innerHTML="",r.forEach((t,r)=>{var c=document.createElement("div");c.classList.add("bullet"),c.id="bullet-index-"+r,c.addEventListener("click",()=>{(function e(s){for(var a=l>s?()=>L():()=>n();l!==s;)a()})(r),"false"!=i&&"false"!=s&&(m(),p())}),e.appendChild(c),t.classList.add("proactivede"),!1!=a&&(t.addEventListener("mouseover",()=>{m()}),t.addEventListener("mouseout",()=>{"false"!=i&&"false"!=s&&p()}))}),t.appendChild(e),document.querySelector(".edw_slider_unqreplaceid_ .slider-left").addEventListener("click",()=>{n(),"false"!=i&&"false"!=s&&(m(),p())}),document.querySelector(".edw_slider_unqreplaceid_ .slider-right").addEventListener("click",()=>{L(),"false"!=i&&"false"!=s&&(m(),p())}),setTimeout(function(){(function e(){if(l<c?l++:l=0,l>0)var s=r[l-1];else var s=r[c];var a=r[l];if(l<c)var i=r[l+1];else var i=r[0];1==r.length&&(a=r[0]),r.forEach(e=>{var s=e;s.classList.contains("preactivede")&&(s.classList.remove("preactivede"),s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.add("proactivede")),s.classList.contains("preactive")&&(s.classList.remove("preactive"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("preactivede"))}),s.classList.remove("preactivede"),s.classList.remove("active"),s.classList.remove("proactive"),s.classList.remove("proactivede"),s.classList.add("preactive"),a.classList.remove("preactivede"),a.classList.remove("preactive"),a.classList.remove("proactive"),a.classList.remove("proactivede"),a.classList.add("active"),i.classList.remove("preactivede"),i.classList.remove("preactive"),i.classList.remove("active"),i.classList.remove("proactivede"),i.classList.add("proactive"),d()})()},500),"false"!=i&&"false"!=s&&p())});`;
        var appendnode5 = ` <div class="slider-single edw-slider-item"> <img class="slider-single-image desktop edw-img-desktop" src="${Vvveb.serverurl}/CDN/slidernewdesign5/sliderimage1.png" alt="1"/> <img class="slider-single-image tab edw-img-tab" src="${Vvveb.serverurl}/CDN/slidernewdesign5/sliderimage1tab.png" alt="1"/> <img class="slider-single-image mob edw-img-mob" src="${Vvveb.serverurl}/CDN/slidernewdesign5/sliderimage1mob.png" alt="1"/> <div class="bg-overlay"></div><div class="slider-caption"> <h5 class="m-0 slider-caption-heading edw-carousel-content-heading">Let’s design your future!</h5> <p class="m-0 slider-caption-para edw-carousel-content-para">Edwiser School inspires a love of learning in children</p></div></div>`;
        Vvveb.Components.extend("_base", "html/slider5", {
            name: "Image slider with caption",
            attributes: ['data-ebpb-slider5'],
            image: "icons/slider5.svg",
            classes: ['edwiser-pb-slider5'],
            html: (() => {
                return `<div  class="edwiser-pb-slider5" data-vvveb-disabled-area contenteditable="false">${sliderhtml5}<style>${slidercss5}</style><script>${sliderjs5}</script></div>`;
            })(),
            beforeInit: function (node) {
                properties = [];
                var i = 0;
                var slideno = 0;
                var id = generateUniqueID();
                // var js = `<script>${sliderjs5}</script>`;
                // if(!$(node).find("script").length >0){
                //     node.innerHTML = node.innerHTML+js;
                // }
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
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Slide " + slideno,
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
                                Vvveb.Components.render("html/slider5");
                                return node;
                            },
                        },
                        {
                            name: SETTINGTITLES.TITLE,
                            key: "slidertitle" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .edw-carousel-content-heading`,
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
                            name: SETTINGTITLES.TITLECOLOR,
                            key: "color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-content-heading`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-content-heading').css('color', value);
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.DESCRIPTION,
                            key: "sliderdescription" + i,
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
                            name: SETTINGTITLES.DESCRIPTIONCOLOR,
                            key: "color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i}  .edw-carousel-content-para`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-content-para').css('color', value);
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.IMAEGEDESKTOP,
                            key: "sliderimage" + i + "desktop",
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .edw-img-desktop`,

                        },
                        {
                            name: SETTINGTITLES.IMAGETAB,
                            key: "sliderimage" + i + "tab",
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .edw-img-tab`,
                        },
                        {
                            name: SETTINGTITLES.IMAGEMOB,
                            key: "sliderimage" + i + "mob",
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .edw-img-mob`,
                        }
                    );
                });
                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().removeClass("proactive preactive").addClass('active');
                }
                updateIndicators(node, i);
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("color") === -1;
                });
                if($(node).find('.edw-control-prev .fa').length>0){
                    this.properties.splice(1, 0,
                        {
                            name: SETTINGTITLES.ARROWONLYCOLOR,
                            key: "border-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield arrowassetcolor ignoreproperty",
                            child: `.edw-slide-control`,
                            onChange: function (node, value, input) {
                                if(!$(node).hasClass("d-none")){
                                    $(node).css('border', `1px solid ${value}`);
                                    $(node).css('--arrowassetcolor', value);
                                }
                                // $(node).siblings('.edw-control-next').css('border', `1px solid ${value}`);
                                // $(node).siblings('.edw-control-next').css('--arrowassetcolor', value);
                                return node;
                            }
                        }
                    );
                }
                this.properties = properties.concat(this.properties);
                slideIntervalfielddisabler(node);
                slidearrowcolorsettingstatushandler($(node),arrow=true, arrowandbullet = false, title = SETTINGTITLES.ARROWASSETCOLORINFO);
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
                        $(node).parent().find('.edw-slider-inner-container').append(appendnode5);
                        Vvveb.Components.render("html/slider5");

                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.BACKGROUNDIMG,
                    key: "slidebackgroundimage",
                    htmlAttr: 'data-url',
                    inputtype: ImageInput,
                    edwclasses: "edwfilefield",
                    child: '.slider-container.edw-carousel',
                    onChange: function (node, value, input) {
                        $(node).parent().find(this.child).css("background-image", "url(" + value + ")");
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.SHOWNAVIGATIONBUTTONSDESKTOP,
                    key: "navigationbutton",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-slider-navigationbutton',
                    onChange: function (node, value, input) {
                        if (value == true) {
                            $(node).parent().find('.edw-control-prev').removeClass('d-none');
                            $(node).parent().find('.edw-control-next').removeClass('d-none');
                        } else {
                            $(node).parent().find('.edw-control-prev').addClass('d-none');
                            $(node).parent().find('.edw-control-next').addClass('d-none');
                        }
                        var tempnode = $(node).closest('.edw-carousel')
                        slidearrowcolorsettingstatushandler(tempnode,arrow=true, arrowandbullet = false, title = SETTINGTITLES.ARROWASSETCOLORINFO);
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.SHOWNAVIGATIONBULLETS,
                    key: "navigationbullets",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-slider-navigationbullets',
                    onChange: function (node, value, input) {
                        if (value == true) {
                            $(node).parent().find('.edw-carousel-indicators').removeClass('d-none');
                        } else {
                            $(node).parent().find('.edw-carousel-indicators').addClass('d-none');
                        }
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.AUTOPLAYSLIDES,
                    key: "autoplayslides",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-slider-autoplay',
                    onChange: function (node, value, input) {
                        var slideintervalfield = $(input).closest('section').find('[data-key="slideinterval"]');
                        if (value == true) {
                            $(node).parent().attr('data-ride', 'carousel');
                            $(node).parent().attr('data-interval', '3000');
                            slideintervalfield.find('input[name="slideinterval"]').val('3000');
                        } else {
                            $(node).parent().attr('data-ride', 'false');
                            $(node).parent().attr('data-interval', '0');
                            slideintervalfield.find('input[name="slideinterval"]').val('0');
                        }
                        slideIntervalfielddisabler(node);
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.PAUSESLIDESONHOVER,
                    key: "pauseslides",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-slider-pauseonhover',
                    onChange: function (node, value, input) {
                        if (value == true) {
                            $(node).parent().attr('data-pause', 'hover');
                        } else {
                            $(node).parent().removeAttr('data-pause');
                        }
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.SLIDEINTERVAL,
                    key: "slideinterval",
                    htmlAttr: "data-interval",
                    inputtype: TextInput,
                    edwclasses: "edwinputfield",
                    child: `.edw-carousel`,
                }
            ]
        });

        // Slider 10 --> Image slider with Text
        var sliderhtml10 = `<section class="gallery-with-text edw_gallery__unqreplaceid_ overflow-hidden"><div class="section-container wrapper"><div class="right-section"><div class="nav buttons-wrapper edw-nav-wrapper" id="v-pills-tab" role="tablist"><button class="btn-tab edw-tab-btn active" id="storytelling-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#storytelling" data-bs-target="#storytelling" type="button" role="tab" aria-controls="storytelling" aria-selected="true">Compelling storytelling</button><button class="btn-tab edw-tab-btn" id="thinking-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#thinking" data-bs-target="#thinking" type="button" role="tab" aria-controls="thinking" aria-selected="false">Design thinking</button><button class="btn-tab edw-tab-btn" id="results-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#results" data-bs-target="#results" type="button" role="tab" aria-controls="results" aria-selected="false">Measurable results</button><button class="btn-tab edw-tab-btn" id="processes-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#processes" data-bs-target="#processes" type="button" role="tab" aria-controls="processes" aria-selected="false">Continuous processes</button></div><div class="tab-content edw-slider-inner-container" id="v-pills-tabContent"><div class="tab-pane edw-slider-item active" id="storytelling" role="tabpanel" aria-labelledby="storytelling-tab"><div class="img-box"><img src="${Vvveb.serverurl}/CDN/slidernewdesign10/images/card-images/image-1.png" alt="image-1"></div></div><div class="tab-pane edw-slider-item" id="thinking" role="tabpanel" aria-labelledby="thinking-tab"><div class="img-box"><img src="${Vvveb.serverurl}/CDN/slidernewdesign10/images/card-images/image-2.png" alt="image-1"></div></div><div class="tab-pane edw-slider-item" id="results" role="tabpanel" aria-labelledby="results-tab"><div class="img-box"><img src="${Vvveb.serverurl}/CDN/slidernewdesign10/images/card-images/image-3.png" alt="image-1"></div></div><div class="tab-pane edw-slider-item" id="processes" role="tabpanel" aria-labelledby="processes-tab"><div class="img-box"><img src="${Vvveb.serverurl}/CDN/slidernewdesign10/images/card-images/image-4.png" alt="image-1"></div></div></div></div></div></section>`;
        var slidercss10 = ` .gallery-with-text {padding: 50px 24px;}.gallery-with-text .section-container {max-width: 1320px;margin: 0 auto;}.gallery-with-text .right-section {position: relative;padding-left: 250px;}.gallery-with-text .buttons-wrapper {position: absolute !important;top: 50%;left: 15px;transform: translateY(-50%);z-index: 1;display: flex;flex-direction: column;gap: 3px;border-radius: 4px;border: 1px solid #D9D9D9;background: #FFF;box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.1);padding: 15px 0;}.gallery-with-text .btn-tab {padding: 27px 50px;background-color: #fff;border: 0;display: flex;justify-content: left;text-align: left;word-break: break-word;color: var(--font-headings, #313848);font-size: 18px;font-weight: 500;line-height: 26px;max-width: 370px;}.gallery-with-text .btn-tab.active {padding: 27px 65px;max-width: 400px;margin-left: -15px;margin-right: -15px;background: linear-gradient(90deg, #5A60F5 0%, #12162E 121.17%);color: #fff;border-radius: 4px;}.gallery-with-text .tab-content .img-box {width: 100%;height: 490px;}.gallery-with-text .tab-content .img-box img {width: 100%;height: 100%;object-fit: cover;border-radius: 4px 100px 4px 4px;overflow: hidden;}.gallery-with-text .tab-pane.active {animation: toLeft 0.3s ease-in forwards;}@keyframes toLeft {0% {transform: translateX(100%);}100% {transform: translateX(0%);}}@media screen and (max-width: 1200px) {.gallery-with-text .left-section {max-width: 250px;}}@media screen and (max-width: 1024px) {.gallery-with-text .right-section {padding-left: 0;}.gallery-with-text .btn-tab, .gallery-with-text .btn-tab.active {max-width: 250px;}}@media screen and (max-width: 1024px) and (min-width: 768px) {.gallery-with-text .section-container {max-width: 820px;}.gallery-with-text .buttons-wrapper {transform: unset;flex-direction: row;flex-wrap: no-wrap;position: static !important;margin: 0 0 20px;padding: 10px;box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.1);justify-content: space-between;}.gallery-with-text .btn-tab {font-size: 14px;padding: 10px;}.gallery-with-text .btn-tab.active {margin: 0;padding: 10px 12px;border-radius: 4px;}}@media screen and (max-width: 767px) {.gallery-with-text {padding-left: 0;padding-right: 0;}.gallery-with-text .right-section {margin-bottom: 270px;}.gallery-with-text .buttons-wrapper {position: absolute !important;top: unset;left: 50%;bottom: 0;transform: translate(-50%, 270px);min-width: 350px;max-width: 90%;}.gallery-with-text .btn-tab, .gallery-with-text .btn-tab.active {max-width: 100%;}.gallery-with-text .btn-tab.active {max-width: calc(100% + 30px);}}@media screen and (max-width: 450px) {.gallery-with-text .buttons-wrapper {min-width: 80%;max-width: 80%;}.gallery-with-text .btn-tab {font-size: 18px;padding: 25px;}.gallery-with-text .btn-tab.active {padding: 25px 40px;}}@media screen and (max-width: 1024px) {.main-wrapper {display: block;}.left-section {max-width: 820px;margin: 0 auto;text-align: center;padding: 50px 24px 0;}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .main-wrapper {display: block;}.edw-limitedwidth-block .left-section {max-width: 820px;margin: 0 auto;text-align: center;padding: 50px 24px 0;}.edw-limitedwidth-block .gallery-with-text .right-section {padding-left: 0;}.edw-limitedwidth-block .gallery-with-text .section-container {max-width: 820px;}.edw-limitedwidth-block .gallery-with-text .buttons-wrapper {transform: unset;flex-direction: row;flex-wrap: no-wrap;position: static !important;margin: 0 0 20px;padding: 10px;box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.1);justify-content: space-between;}.edw-limitedwidth-block .gallery-with-text .btn-tab {font-size: 14px;padding: 10px;}.edw-limitedwidth-block .gallery-with-text .btn-tab.active {margin: 0;padding: 10px 12px;border-radius: 4px;}}`;
        var sliderjs10 = ``;
        var appendnode10 = `<div class="tab-pane edw-slider-item" id="storytelling" role="tabpanel" aria-labelledby="storytelling-tab"><div class="img-box"><img src="${Vvveb.serverurl}/CDN/slidernewdesign10/images/card-images/image-1.png" alt="image-1"></div></div>`;
        var appendswithchbutton10 = `<button class="btn-tab edw-tab-btn" id="storytelling-tab" data-toggle="pill"  data-bs-toggle="pill" data-target="#storytelling"  data-bs-target="#storytelling" type="button" role="tab" aria-controls="storytelling" aria-selected="true">New tab</button>`;
        Vvveb.Components.extend("_base", "html/slider10", {
            name: "Image slider with Text",
            attributes: ['data-ebpb-slider10'],
            image: "icons/slider10.png",
            classes: ['edwiser-pb-slider10'],
            html: (() => {
                return `<div  class="edwiser-pb-slider10" data-vvveb-disabled-area contenteditable="false">${sliderhtml10}<style>${slidercss10}</style><script>${sliderjs10}</script></div>`;
            })(),
            beforeInit: function (node) {
                properties = [];
                var i = 0;
                var slideno = 0;
                var id = generateUniqueID();
                node.innerHTML = node.innerHTML.replaceAll("_unqreplaceid_", id);
                var tabswitch = getTabButtons(node);
                $(node).find(".edw-slider-item").each(function (e) {
                    i = generateUniqueID();
                    slideno++;

                    var regex = /edw-slider-item-\d+/;
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
                    $(this).addClass("edw-slider-item-" + i);

                    var matchedtabswitchclass = '';
                    var switchclassregex = /edw-tab-btn-\d+/;
                    var hasMatchingSwitchClass = $(tabswitch[slideno - 1]).filter(function () {
                        var classNames = $(this).attr('class').split(' ');
                        return classNames.some(function (className) {
                            if (regex.test(className)) {
                                matchedtabswitchclass = className;
                                return true;
                            }
                            return false;
                        });
                    }).length > 0;
                    var tabid = "edw-slider-item-" + slideno;
                    $(this).attr('id', tabid);
                    $(tabswitch[slideno - 1]).attr('data-target', "#" + tabid);
                    $(tabswitch[slideno - 1]).attr('data-bs-target', "#" + tabid);
                    $(tabswitch[slideno - 1]).addClass("edw-tab-btn-" + i);
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Slide " + slideno,
                                extraclass: "edwslideheading m-0",
                                type: "h6",
                                style: ""
                            }
                        },
                        {
                            name: "",
                            key: "deleteslideritem",
                            inputtype: EdwbuttonInput,
                            child: `.edw-slider-item-${i}`,
                            edwclasses: "edwslidedelbtn",
                            data: { text: "", icon: "la-trash", extraclasses: "btn btn-outline-danger" },
                            onChange: function (node, value, input) {
                                $(node).remove();
                                $navdatatarget = "#" + $(node).attr('id');
                                $(tabswitch).each(function () {
                                    if ($(this).attr('data-target') == $navdatatarget) {
                                        $(this).remove();
                                    }
                                });
                                Vvveb.Components.render("html/slider10");
                                return node;
                            },
                        },
                        {
                            name: SETTINGTITLES.SWITCHTITLE,
                            key: "sliderdescription" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-tab-btn-${i}`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },
                        {
                            name: SETTINGTITLES.IMAGE,
                            key: "slidernavtabimage",
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-slider-item-${i} .img-box img`,

                        },
                    );
                });

                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
                }

                if (!$(node).find('.edw-nav-wrapper').children('.edw-tab-btn').hasClass('active')) {
                    $(node).find('.edw-tab-btn').first().addClass('active');
                }

                properties = removeDeleteButton(node, properties);
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                this.properties = properties.concat(this.properties);
                this.properties = disableaddnewslidebutton(node,this.properties, 4);
                return node;
            },
            properties: [
                {
                    name: "",
                    key: "tabswarning",
                    inputtype: EdwheaderInput,
                    edwclasses: "edwgroupheader",
                    data: {
                        header: "Only 4 tabs are allowed",
                        extraclass: "edwslideheading m-0 p-3 border-0 alert alert-warning",
                        type: "h6",
                        style: ""
                    }
                },
                {
                    name: "",
                    key: "addNewSlide",
                    inputtype: EdwbuttonInput,
                    edwclasses: "edwnewslidebtn",
                    data: { text: "Add new slide", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                    onChange: function (node) {
                        //render component properties again to include the new column inputs
                        $(node).parent().find('.edw-slider-inner-container').append(appendnode10);
                        $(node).parent().find('.edw-nav-wrapper').append(appendswithchbutton10);
                        Vvveb.Components.render("html/slider10");
                        return node;
                    }
                },
                // {
                //     name: SETTINGTITLES.TITLE,
                //     key: "slidesectionhead",
                //     htmlAttr: "innerHTML",
                //     child: `.edw-section-heading`,
                //     inputtype: TextInput,
                //     edwclasses: "edwinputfield",
                // },
                // {
                //     name: SETTINGTITLES.DESCRIPTION,
                //     key: "slidesectiondesc",
                //     htmlAttr: "innerHTML",
                //     child: `.edw-section-desc`,
                //     inputtype: TextInput,
                //     edwclasses: "edwinputfield",
                // },
            ]
        });

        // Slider 15 --> Image slider with text 2
        var sliderhtml15 = `<section class="testimonial-design-9 testimonial_unqreplaceid_ edw_adv_slider"><div class="section-container wrapper"><div class="img-slider-wrapper"><img class="pattern" src="${Vvveb.serverurl}/CDN/slidernewdesign15/images/pattern.png" alt="pattern"><div class="carousel holderCircle"><div class="slider dotCircle"><span class="slide itemDot active itemDot1" data-value="1"><img src="${Vvveb.serverurl}/CDN/slidernewdesign15/images/card-images/card1.png" alt="card-1"></span><span class="slide next itemDot itemDot2" data-value="2"><img src="${Vvveb.serverurl}/CDN/slidernewdesign15/images/card-images/card2.png" alt="card-1"></span><span class="slide prev itemDot itemDot3" data-value="3"><img src="${Vvveb.serverurl}/CDN/slidernewdesign15/images/card-images/card3.png" alt="card-1"></span><span class="slide itemDot itemDot4" data-value="4"><img src="${Vvveb.serverurl}/CDN/slidernewdesign15/images/card-images/card4.png" alt="card-1"></span></div></div></div><div class="carousel card-carousel edw-carousel" data-ride="carousel"><div class="slider card-slider edw-slider-inner-container"><div class="slide edw-slider-item active" data-value="1"><div class="icon-box"><img src="${Vvveb.serverurl}/CDN/slidernewdesign15/images/card-icons/icon-1.svg" alt="icon-1"></div><div class="slide-content"><p class="heading">Moodle LMS</p><p class="desc">Create engaging, secure, and easily accessible online learning environments to captivate and empower your learners.</p></div></div><div class="slide edw-slider-item" data-value="2"><div class="icon-box"><img src="${Vvveb.serverurl}/CDN/slidernewdesign15/images/card-icons/icon-2.svg" alt="icon-2"></div><div class="slide-content"><p class="heading">Moodle workplace</p><p class="desc">Streamline employee onboarding, compliance, and training with ease using the cloud-hosted, user-friendly Moodle Workplace platform.</p></div></div><div class="slide edw-slider-item" data-value="3"><div class="icon-box"><img src="${Vvveb.serverurl}/CDN/slidernewdesign15/images/card-icons/icon-3.svg" alt="icon-3"></div><div class="slide-content"><p class="heading">Personalized learning</p><p class="desc">We offer a comprehensive range of Moodle training and courses to help you get the most out of your learning platform.</p></div></div><div class="slide edw-slider-item" data-value="4"><div class="icon-box"><img src="${Vvveb.serverurl}/CDN/slidernewdesign15/images/card-icons/icon-4.svg" alt="icon-4"></div><div class="slide-content"><p class="heading">Optimized hosting</p><p class="desc">Experience scalability, reliability, & security with our hosting services, ensuring a seamless environment for your Moodle sites.</p></div></div></div><div class="indicators edw-carousel-indicators"><span class="indicator-btn active" data-value="1"></span><span class="indicator-btn" data-value="2"></span><span class="indicator-btn" data-value="3"></span><span class="indicator-btn" data-value="4"></span></div></div></div></section>`;
        var slidercss15 = ` .testimonial_unqreplaceid_ {padding: 20px 24px 40px;overflow: hidden;}.testimonial_unqreplaceid_ .section-container {max-width: 1320px;margin: 0 auto;}.testimonial_unqreplaceid_ .wrapper {display: grid;grid-template-columns: 1fr 1fr;align-items: center;justify-content: space-between;}.testimonial_unqreplaceid_ .card-slider {display: flex;flex-direction: column;gap: 24px;}.testimonial_unqreplaceid_ .card-slider .slide {padding: 30px;display: flex;gap: 16px;background-color: #dad2d2;cursor: pointer;transition: box-shadow 0.3s ease;border-radius: 6px;border: 1px solid #f1f0f5;background: #fff;}.testimonial_unqreplaceid_ .card-slider .slide .icon-box {height: fit-content;margin: auto;background-color: transparent;}.testimonial_unqreplaceid_ .card-slider .slide .icon-box img {height: 50px;width: 50px;object-fit: contain;}.testimonial_unqreplaceid_ .card-slider .slide .slide-content {border-left: 1px solid #e2e0eb;padding-left: 16px;}.testimonial_unqreplaceid_ .card-slider .slide .slide-content .heading {color: #483e79;font-size: 16px;font-style: normal;font-weight: 700;line-height: normal;margin: 0;}.testimonial_unqreplaceid_ .card-slider .slide .slide-content .desc {color: #645b8f;font-size: 16px;font-style: normal;font-weight: 400;line-height: 24px;margin: 0;}.testimonial_unqreplaceid_ .card-slider .slide.active, .testimonial_unqreplaceid_ .card-slider .slide:hover {box-shadow: 10px 10px 30px 0px rgba(109, 74, 255, 0.2);}.testimonial_unqreplaceid_ .img-slider-wrapper {position: relative;height: 610px;max-width: 550px;overflow: hidden;}.testimonial_unqreplaceid_ .img-slider-wrapper .holderCircle {margin-right: 230px;margin-top: 65px;margin-bottom: 65px;width: 480px;height: 480px;border-radius: 100%;position: absolute !important;top: 0;right: 0px;}.testimonial_unqreplaceid_ .img-slider-wrapper .pattern {position: absolute;top: 100px;left: 0;height: 414px;object-fit: contain;}.testimonial_unqreplaceid_ .dotCircle {width: 100%;height: 100%;position: relative;margin: auto;top: 0;left: 0;right: 0;bottom: 0;border-radius: 100%;z-index: 2;border: 1px solid #d9d9d9;}.testimonial_unqreplaceid_ .dotCircle .itemDot {display: block;width: 220px;height: 124px;position: absolute;border-radius: 6px;z-index: 1;transition: width 0.3s ease, height 0.3s ease;}.testimonial_unqreplaceid_ .dotCircle .itemDot img {width: 100%;height: 100%;object-fit: cover;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .itemDot1 {right: 0%;top: 50%;transform: translate(50%, -50%);}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .itemDot2 {left: 50%;top: unset;bottom: 0;transform: translate(-50%, 50%);}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .active {width: 373px;height: 240px;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .active img {object-fit: contain;filter: drop-shadow(10px 10px 30px rgba(109, 74, 255, 0.2));}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(3)) .itemDot2 {left: -40px;top: unset;bottom: -40px;transform: unset;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(3)) .itemDot3 {left: -40px;top: -40px;transform: unset;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(4)) .itemDot2 {left: 50%;top: unset;bottom: 0;transform: translate(-50%, 50%);}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(4)) .itemDot3 {left: 0%;bottom: unset;top: 50%;transform: translate(-50%, -50%);}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(4)) .itemDot4 {left: 50%;top: 0%;transform: translate(-50%, -50%);}.testimonial_unqreplaceid_ .dotCircle .active {width: 373px;height: 240px;}.testimonial_unqreplaceid_ .dotCircle .active img {object-fit: contain;}.testimonial_unqreplaceid_ .indicators {display: none;gap: 7px;margin: 26px auto 0;width: fit-content;}.testimonial_unqreplaceid_ .indicators .indicator-btn {width: 6px;height: 6px;border-radius: 100%;background-color: #d9d9d9;cursor: pointer;}.testimonial_unqreplaceid_ .indicators .indicator-btn.active {background-color: #1b1440;}@media screen and (max-width: 1024px) {.testimonial_unqreplaceid_ {padding-top: 0;}.testimonial_unqreplaceid_ .wrapper {display: block;}.testimonial_unqreplaceid_ .pattern {display: none;}.testimonial_unqreplaceid_ .img-slider-wrapper {height: 320px;max-width: unset;}.testimonial_unqreplaceid_ .img-slider-wrapper .holderCircle {width: 100%;height: 100%;margin: 0;overflow: hidden;border-radius: unset;padding: 20px 0 40px;}.testimonial_unqreplaceid_ .dotCircle {height: 260px;position: relative;border-radius: unset;border: unset;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide {width: 50%;height: 100%;position: absolute;left: -76%;top: 50%;transform: translateY(-50%);transition: left 0.5s ease-in, height 0.5s ease-in;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide.next, .testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide.prev {left: -76%;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide:not(.active) {height: 70%;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide.active {left: 25%;height: 100%;z-index: 2;filter: drop-shadow(10px 10px 30px rgba(109, 74, 255, 0.2));}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide.active img {object-fit: contain;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(3)) .slide.next {left: 60%;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(3)) .slide.prev {left: 0;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(3)) .slide:not(.active) {height: 70%;}@keyframes toRightForCurrentActive {0% {left: 25%;}100% {left: 114%;}}@keyframes toLeftForActive {0% {left: 114%;}100% {left: 25%;}}@keyframes toRightForNextImg {0% {left: 114%;}100% {left: 114%;}}@keyframes toLeftForNextSiblingImg {0% {left: 114%;}100% {left: 60%;}}.testimonial_unqreplaceid_ .card-carousel {display: block;width: 100%;min-height: 130px;padding: 0 40px;overflow: hidden;}.testimonial_unqreplaceid_ .card-carousel .card-slider {height: 150px;position: relative;}.testimonial_unqreplaceid_ .card-carousel .card-slider .slide {width: 100%;position: absolute;left: -120%;top: 0;cursor: unset;transition: left 0.5s ease-in;}.testimonial_unqreplaceid_ .card-carousel .card-slider .slide.active {left: 0;top: 0;z-index: 2;}@keyframes toRightForNext {0% {left: 0;}100% {left: 110%;}}@keyframes toLeftForNextSibling {0% {left: 110%;}100% {left: 0%;}}.testimonial_unqreplaceid_ .indicators {display: flex;}}@media screen and (max-width: 1024px) and (min-width: 767px) {.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide.active img {position: absolute;top: 0;left: 50%;height: 100%;width: max-content;transform: translateX(-50%) !important;}}@media screen and (max-width: 767px) {.testimonial_unqreplaceid_ {padding-left: 0;padding-right: 0;}.testimonial_unqreplaceid_ .img-slider-wrapper .holderCircle {padding: 20px 24px 40px;}.testimonial_unqreplaceid_ .dotCircle {border-radius: unset;border: unset;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide {width: 100%;left: -110%;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide.next {left: 110%;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide.prev {left: -110%;}.testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide.active {left: 0%;}.testimonial_unqreplaceid_ .card-carousel {padding: 0 24px;overflow: hidden;}.testimonial_unqreplaceid_ .card-slider .slide {padding: 30px 20px;flex-direction: column;}.testimonial_unqreplaceid_ .card-slider .slide .icon-box {margin: 0;}.testimonial_unqreplaceid_ .card-slider .slide .slide-content {border-top: 1px solid #e2e0eb;border-left: unset;padding-left: 0;padding-top: 16px;}@keyframes toRightForNextImg {0% {left: 60%;}100% {left: 114%;}}@keyframes toLeftForNextSiblingImg {0% {left: 114%;}100% {left: 60%;}}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .testimonial_unqreplaceid_ {padding-top: 0;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .wrapper {display: block;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .pattern {display: none;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .img-slider-wrapper {height: 320px;max-width: unset;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .img-slider-wrapper .holderCircle {width: 100%;height: 100%;margin: 0;overflow: hidden;border-radius: unset;padding: 20px 0 40px;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .dotCircle {height: 260px;position: relative;border-radius: unset;border: unset;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide {width: 50%;height: 100%;position: absolute;left: -76%;top: 50%;transform: translateY(-50%);transition: left 0.5s ease-in, height 0.5s ease-in;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide.next, .edw-limitedwidth-block .testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide.prev {left: -76%;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide:not(.active) {height: 70%;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide.active {left: 25%;height: 100%;z-index: 2;filter: drop-shadow(10px 10px 30px rgba(109, 74, 255, 0.2));}.edw-limitedwidth-block .testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(1)) .slide.active img {object-fit: contain;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(3)) .slide.next {left: 60%;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(3)) .slide.prev {left: 0;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .dotCircle:has(.itemDot:nth-child(3)) .slide:not(.active) {height: 70%;}@keyframes toRightForCurrentActive {0% {left: 25%;}100% {left: 114%;}}@keyframes toLeftForActive {0% {left: 114%;}100% {left: 25%;}}@keyframes toRightForNextImg {0% {left: 114%;}100% {left: 114%;}}@keyframes toLeftForNextSiblingImg {0% {left: 114%;}100% {left: 60%;}}.edw-limitedwidth-block .testimonial_unqreplaceid_ .card-carousel {display: block;width: 100%;min-height: 130px;padding: 0 40px;overflow: hidden;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .card-carousel .card-slider {height: 150px;position: relative;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .card-carousel .card-slider .slide {width: 100%;position: absolute;left: -120%;top: 0;cursor: unset;transition: left 0.5s ease-in;}.edw-limitedwidth-block .testimonial_unqreplaceid_ .card-carousel .card-slider .slide.active {left: 0;top: 0;z-index: 2;}@keyframes toRightForNext {0% {left: 0;}100% {left: 110%;}}@keyframes toLeftForNextSibling {0% {left: 110%;}100% {left: 0%;}}.edw-limitedwidth-block .testimonial_unqreplaceid_ .indicators {display: flex;}}`;
        var sliderjs15 = `class Testimonial_unqreplaceid_{constructor(){this.testimonial9SEL=".testimonial_unqreplaceid_",this.testimonial=document.querySelector(this.testimonial9SEL),this.itemDots=this.testimonial.querySelectorAll(".itemDot"),this.cardSlides=this.testimonial.querySelectorAll(".card-slider .slide"),this.dotCircle=this.testimonial.querySelector(".holderCircle .dotCircle"),this.indicators=this.testimonial.querySelectorAll(".indicators .indicator-btn"),this.carousel=this.testimonial.querySelector(".card-carousel"),this.resizeTimer,this.initialExecution=!0,this.isTouchStart=!1,this.startX=0,this.distance=0,this.touchTimeout=null,this.isHover=!1,this.cardClicked=this.cardClicked.bind(this),this.windowResizeHandler=this.windowResizeHandler.bind(this),this.indicatorClick=this.indicatorClick.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchStop=this.touchStop.bind(this),this.initializeEventListeners()}initializeEventListeners(){window.addEventListener("resize",this.windowResizeHandler),window.addEventListener("load",this.windowResizeHandler),this.windowResizeHandler()}windowResizeHandler(){let t=document.querySelector(".edw-limitedwidth-block "+this.testimonial9SEL);console.log(t),window.innerWidth>=1024&&!t?(this.initializeCards(),this.cardSlides.forEach(t=>{t.addEventListener("click",this.cardClicked)}),this.cardClicked("",this.testimonial.querySelector(".card-slider .slide.active"))):(this.initializeSlide(),this.indicators.forEach(t=>{t.addEventListener("click",this.indicatorClick)}),this.carousel.addEventListener("touchstart",this.touchStart),this.carousel.addEventListener("touchmove",this.touchMove),this.carousel.addEventListener("touchend",this.touchStop))}initializeimageSlide(t="",i=""){let e=this.itemDots.length,s=t.getAttribute("data-value"),l=this.testimonial.querySelector('.dotCircle .slide[data-value="'+s+'"]'),r=this.testimonial.querySelector(".dotCircle .slide.active"),a=this.testimonial.querySelector(".dotCircle .slide.prev"),o=this.testimonial.querySelector(".dotCircle .slide.next");e>2&&"left"===i&&o&&(o.style.animation="toRightForNextImg 0.5s ease-in forwards"),r.classList.remove("active"),o&&o.classList.remove("next"),a&&a.classList.remove("prev");let c=l.nextElementSibling,n=l.previousElementSibling;c||(c=this.testimonial.querySelector(".dotCircle .slide:first-child")),n||(n=this.testimonial.querySelector(".dotCircle .slide:last-child")),l.classList.add("active"),e>2?(c.classList.add("next"),n.classList.add("prev")):("left"===i&&(r.style.animation="toRightForCurrentActive 0.5s ease-in forwards"),"right"===i&&(l.style.animation="toLeftForActive 0.5s ease-in forwards")),e>2&&"right"===i&&(c.style.animation="toLeftForNextSiblingImg 0.5s ease-in forwards"),setTimeout(()=>{o&&(o.style.animation=""),c&&(c.style.animation=""),r&&(r.style.animation=""),l&&(l.style.animation="")},500)}initializeSlide(t="",i=""){let e;if(this.dotCircle.style.transform="",this.dotCircle.style.transition="",this.itemDots.forEach(function(t){t.querySelector("img").style.transform="",t.querySelector("img").style.transition=""}),t){e=t;let s=this.testimonial.querySelector(".card-slider .slide.active");s.classList.remove("active");let l=e.nextElementSibling,r=e.previousElementSibling;l||(l=this.testimonial.querySelector(".dotCircle .slide:first-child")),r||(r=this.testimonial.querySelector(".dotCircle .slide:last-child")),"left"===i&&(s.style.animation="toRightForNext 0.5s ease-in forwards"),t.classList.add("active"),"right"===i&&(t.style.animation="toLeftForNextSibling 0.5s ease-in forwards"),setTimeout(()=>{s.style.animation="",t.style.animation=""},500)}else e=this.testimonial.querySelector(".card-slider .slide.active");this.testimonial.querySelector(".card-slider").style.height=e.offsetHeight+"px",this.initializeimageSlide(e,i),this.setIndicator(e.getAttribute("data-value"))}initializeCards(){this.dotCircle.style.transform="rotate(360deg)",this.testimonial.querySelector(".card-slider").style.height=""}leftClick(){let t=this.testimonial.querySelector(".card-slider .slide.active").previousElementSibling;t||(t=this.testimonial.querySelector(".card-slider .slide:last-child")),this.initializeSlide(t,"left")}rightClick(){let t=this.testimonial.querySelector(".card-slider .slide.active").nextElementSibling;t||(t=this.testimonial.querySelector(".card-slider .slide:first-child")),this.initializeSlide(t,"right")}setIndicator(t){this.indicators.forEach(i=>{i.classList.remove("active"),i.getAttribute("data-value")==t&&i.classList.add("active")})}indicatorClick(t){let i=t.currentTarget.getAttribute("data-value"),e=this.testimonial.querySelector(".indicators .indicator-btn.active").getAttribute("data-value"),s=this.testimonial.querySelector(".card-slider [data-value='"+i+"']"),l="left";for(let r=0;r<this.indicators.length;r++){let a=this.indicators[r];if(i==a.getAttribute("data-value"))break;if(e==a.getAttribute("data-value")){l="right";break}}this.initializeSlide(s,l)}cardClicked(t,i=""){let e=document.querySelector(".edw-limitedwidth-block "+this.testimonial9SEL);if(window.innerWidth>=1024&&!e){let s=!i;i||(i=t.currentTarget);let l=i.getAttribute("data-value");this.testimonial.querySelector(".card-slider .slide.active").classList.remove("active"),i.classList.add("active");let r=this.itemDots.length,a=90;3==r&&(a=120),this.itemDots.forEach(function(t){t.classList.remove("active")}),this.testimonial.querySelector(".itemDot"+l).classList.add("active");let o=l;this.dotCircle.style.transform="rotate("+(360-(o-1)*a)+"deg)",s?this.dotCircle.style.transition="all 0.8s ease":this.dotCircle.style.transition="",this.itemDots.forEach(function(t){t.querySelector("img").style.transform="rotate("+(o-1)*a+"deg)",s?t.querySelector("img").style.transition="all 0.8s ease":t.querySelector("img").style.transition=""})}}touchStart(t){this.isHover=!0,this.isTouchStart=!0,this.startX=t.touches[0].clientX}touchMove(t){this.isHover=!0,this.isTouchStart&&(this.distance=t.touches[0].clientX-this.startX)}touchStop(){clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>{this.isHover=!1},1e4),this.distance>100?this.leftClick():this.distance<-100&&this.rightClick(),this.isTouchStart=!1,this.startX=0,this.distance=0,this.touchTimeout=null}}var testimonial_unqreplaceid_=new Testimonial_unqreplaceid_;`;
        var appendnode15 = `<div class="slide edw-slider-item" data-value="4"><div class="icon-box"><img src="${Vvveb.serverurl}/CDN/slidernewdesign15/images/card-icons/icon-4.svg" alt="icon-4"></div><div class="slide-content"><p class="heading">Optimized hosting</p><p class="desc">Experience scalability, reliability, & security with our hosting services, ensuring a seamless environment for your Moodle sites.</p></div></div>`;
        var appendnode15imghtml = `<span class="slide itemDot itemDot4" data-value="4"><img src="${Vvveb.serverurl}/CDN/slidernewdesign15/images/card-images/card4.png" alt="card-1"></span>`;
        Vvveb.Components.extend("_base", "html/slider15", {
            name: "Image slider with text 2",
            attributes: ['data-ebpb-slider15'],
            image: "icons/Imagesliderwithtext2.svg",
            classes: ['data-ebpb-slider15'],
            html: (() => {
                return `<div  class="data-ebpb-slider15" data-vvveb-disabled-area contenteditable="false">${sliderhtml15}<style>${slidercss15}</style><script>${sliderjs15}</script></div>`;
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
                    $(this).attr("data-value", slideno);

                    testimonail15ImageWrapperAttributesHandler(node);

                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Slide " + slideno,
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

                                var parentnode = $(node).closest('.edw_adv_slider');
                                var datatarget = $(node).attr('data-value');

                                $(parentnode).find(`.img-slider-wrapper .itemDot[data-value="${datatarget}"]`).remove();

                                $(node).remove();
                                Vvveb.Components.render("html/slider15");
                                return node;
                            },
                        },
                        {
                            name: SETTINGTITLES.IMAGE,
                            key: "sliderimage" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwinputfield",
                            child: `.img-slider-wrapper .itemDot${slideno} img`,
                        },
                        {
                            name: SETTINGTITLES.TITLE,
                            key: "slidertitle" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .slide-content .heading`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },
                        {
                            name: SETTINGTITLES.CONTENT,
                            key: "slidertitle" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .slide-content .desc`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },
                        {
                            name: SETTINGTITLES.Icon,
                            key: "sliderimage" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .icon-box img`,
                        },
                    );
                });

                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
                    $(node).find('.img-slider-wrapper .dotCircle .slide').removeClass('active');
                    $(node).find('.img-slider-wrapper .dotCircle .slide').first().addClass('active');
                }

                Indicatordesign2(node, i);
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });

                this.properties = properties.concat(this.properties);
                this.properties = disableaddnewslidebutton(node,this.properties, 4);
                slideIntervalfielddisabler(node);
                return node;
            },
            properties: [
                {
                    name: "",
                    key: "tabswarning",
                    inputtype: EdwheaderInput,
                    edwclasses: "edwgroupheader",
                    data: {
                        header: "Only 4 tabs are allowed",
                        extraclass: "edwslideheading m-0 p-3 border-0 alert alert-warning",
                        type: "h6",
                        style: ""
                    }
                },
                {
                    name: "",
                    key: "addNewSlide",
                    inputtype: EdwbuttonInput,
                    edwclasses: "edwnewslidebtn",
                    data: { text: "Add new slide", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                    onChange: function (node) {
                        //render component properties again to include the new column inputs
                        $(node).parent().find('.edw-slider-inner-container').append(appendnode15);
                        $(node).find('.img-slider-wrapper .dotCircle ').append(appendnode15imghtml);
                        Vvveb.Components.render("html/slider15");
                        return node;
                    }
                },
            ]
        });
    }

    function updateIndicators(node, i) {
        // carousel indicator handler
        $(node).find(".edw-carousel-indicators").empty();
        var id = $(node).find('.edw-carousel').attr('id');
        var x = 0;
        $(node).find(".edw-slider-item").each(function (e) {
            $(node).find(".edw-carousel-indicators").append(`<div class="bullet " id="bullet-index-${x}"></div>`);
            if ($(this).hasClass('active')) {
                $(node).find(`.edw-carousel-indicators #bullet-index-${x}`).addClass('active');
            }
            x++;
        });
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

    function removeDeleteButton(node, properties) {
        var numberOfChildren = $(node).find(".edw-slider-item").length;
        if (numberOfChildren == 1) {
            properties = properties.map(function (item) {
                if (item.key == 'deleteslideritem') {
                    item.data['extraclasses'] = item.data['extraclasses'] + ' disabled';
                }
                return item;
            });
        }
        return properties;
    }

    function disableaddnewslidebutton(node, properties, limit) {
        var numberOfChildren = $(node).find(".edw-slider-item").length;
        if (numberOfChildren == limit) {
            properties = properties.map(function (item) {
                if (item.key == 'addNewSlide') {
                    item.data['extraclasses'] = item.data['extraclasses'] + ' disabled';
                }
                return item;
            });

            properties = properties.map(function (item) {
                if (item.key == 'tabswarning') {
                    item.edwclasses  = item.edwclasses + ' d-none';

                    var $tempElement = $('<div>').addClass(item.edwclasses);
                    // Remove the 'disabled' class using jQuery
                    $tempElement.removeClass('d-none');

                    // Get the modified string without 'disabled' class
                    item.edwclasses = $tempElement.attr('class');
                }
                return item;
            });
        }else{
            properties = properties.map(function (item) {
                if (item.key == 'addNewSlide') {
                    item.data['extraclasses'] = item.data['extraclasses'] + ' disabled';

                    var $tempElement = $('<div>').addClass(item.data['extraclasses']);
                    // Remove the 'disabled' class using jQuery
                    $tempElement.removeClass('disabled');

                    // Get the modified string without 'disabled' class
                    item.data['extraclasses'] = $tempElement.attr('class');
                }
                return item;
            });

            properties = properties.map(function (item) {
                if (item.key == 'tabswarning') {
                    item.edwclasses = item.edwclasses + ' d-none';
                }
                return item;
            });
        }
        return properties;
    }
    function removeSettingsOnSingleSlide(node) {
        var numberOfChildren = $(node).find(".edw-slider-item").length;
        var navbuttonstatus = $(node).find('.edw-slider-navigationbutton').attr('checked');
        var navbulletstatus = $(node).find('.edw-slider-navigationbullets').attr('checked');
        if (numberOfChildren == 1) {
            if (navbuttonstatus == 'checked') {
                $(node).parent().find('.edw-control-prev').addClass('d-none');
                $(node).parent().find('.edw-control-next').addClass('d-none');
                // $(node).find('.edw-slider-navigationbutton').removeAttr('checked');
            }
            if (navbulletstatus == 'checked') {
                $(node).parent().find('.edw-carousel-indicators').addClass('d-none');
                // $(node).find('.edw-slider-navigationbullets').removeAttr('checked');
            }

        } else {
            if (navbuttonstatus == 'checked') {
                $(node).parent().find('.edw-control-prev').removeClass('d-none');
                $(node).parent().find('.edw-control-next').removeClass('d-none');
                $(node).find('.edw-slider-navigationbutton').attr('checked', 'checked');
            }
            if (navbulletstatus == 'checked') {
                $(node).parent().find('.edw-carousel-indicators').removeClass('d-none');
                $(node).find('.edw-slider-navigationbullets').attr('checked', 'checked');
            }
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

    function slidearrowcolorsettingstatushandler(node, arrow=false, arrowandbullet = false, title ='') {
        $(document).ready(function () {
            var navigationbulletscheckedstatus = $(document).find('[name="navigationbullets"]').is(":checked");
            var navigationarrowcheckedstatus = $(document).find('[name="navigationbutton"]').is(":checked");
            if(node.find('.edw-slide-control').hasClass("d-none")){
                navigationarrowcheckedstatus = false;
            }

            if(node.find('.edw-carousel-indicators').hasClass("d-none")){
                navigationbulletscheckedstatus = false;
            }
            var arrowassetcolor = "#left-panel .arrowassetcolor";
            if(arrowandbullet){
                if (navigationarrowcheckedstatus && navigationbulletscheckedstatus) {
                    $(document).find(`${arrowassetcolor} input`).removeAttr('disabled');
                    $(document).find(`${arrowassetcolor}`).removeAttr('title');
                } else {
                    $(document).find(`${arrowassetcolor} input`).attr('disabled', 'disabled');
                    $(document).find(`${arrowassetcolor}`).attr('title', title);
                }
            }
            if(arrow){
                if (navigationarrowcheckedstatus ) {
                    $(document).find(`${arrowassetcolor} input`).removeAttr('disabled');
                    $(document).find(`${arrowassetcolor}`).removeAttr('title');
                } else {
                    $(document).find(`${arrowassetcolor} input`).attr('disabled', 'disabled');
                    $(document).find(`${arrowassetcolor}`).attr('title', title);
                }
            }
        });
    }
    function getTabButtons(node) {
        $tabbuttons = $(node).find('.edw-tab-btn');
        return $tabbuttons;
    }

    function testimonail15ImageWrapperAttributesHandler(node){
        var imagewrapper = $(node).find(".img-slider-wrapper .dotCircle");
        var count = 0;
        var regex = /itemDot\d+/;
        var matchedClass = "";
        imagewrapper.find(".slide").each(function (e){
            count++;
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
            if(count == 1){
                $(this).addClass("active").removeClass("next prev");
            }
            if(count == 2){
                $(this).addClass("next").removeClass("active prev");
            }
            if(count == 3){
                $(this).addClass("prev").removeClass("active next");
            }
            $(this).addClass("itemDot" + count);
            $(this).addClass("itemDot");
            $(this).attr("data-value", count);
        });
    }

    function disableaddnewslidebutton(node, properties, limit) {
        var numberOfChildren = $(node).find(".edw-slider-item").length;
        if (numberOfChildren == limit) {
            properties = properties.map(function (item) {
                if (item.key == 'addNewSlide') {
                    item.data['extraclasses'] = item.data['extraclasses'] + ' disabled';
                }
                return item;
            });

            properties = properties.map(function (item) {
                if (item.key == 'tabswarning') {
                    item.edwclasses  = item.edwclasses + ' d-none';

                    var $tempElement = $('<div>').addClass(item.edwclasses);
                    // Remove the 'disabled' class using jQuery
                    $tempElement.removeClass('d-none');

                    // Get the modified string without 'disabled' class
                    item.edwclasses = $tempElement.attr('class');
                }
                return item;
            });
        }else{
            properties = properties.map(function (item) {
                if (item.key == 'addNewSlide') {
                    item.data['extraclasses'] = item.data['extraclasses'] + ' disabled';

                    var $tempElement = $('<div>').addClass(item.data['extraclasses']);
                    // Remove the 'disabled' class using jQuery
                    $tempElement.removeClass('disabled');

                    // Get the modified string without 'disabled' class
                    item.data['extraclasses'] = $tempElement.attr('class');
                }
                return item;
            });

            properties = properties.map(function (item) {
                if (item.key == 'tabswarning') {
                    item.edwclasses = item.edwclasses + ' d-none';
                }
                return item;
            });
        }
        return properties;
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
    return {
        init: function () {
            var blocks = ["html/slider2", "html/slider4", "html/slider5", "html/slider10","html/slider15"];
            addBlocks(blocks);
        }
    }

});
