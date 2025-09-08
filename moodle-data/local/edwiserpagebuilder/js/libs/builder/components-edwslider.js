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
define('local_edwiserpagebuilder/components-edwslider', ['local_edwiserpagebuilder/jquery', 'core/ajax'], function (jQuery, Ajax) {

    function addBlocks(blocks) {
        Vvveb.ComponentsGroup['Edwiser Sliders'] = blocks;
        var SETTINGTITLES = {
            TITLE: 'Title',
            TITLECOLOR: 'Title color',
            DESCRIPTION: 'Description',
            DESCRIPTIONTITLE: 'Description title',
            DESCRIPTIONCOLOR: 'Description color',
            DESCRIPTIONTITLECOLOR: 'Description title color',
            IMAGE: 'Image',
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
            YEAR: 'Year',
            CONTENT: 'Content',
            VIDEO: 'Video',
            ARROWASSETCOLOR:'Navigation arrows,border & bullets',
            ARROWONLYCOLOR:'Navigation arrows and border',
            ARROWSHOVER:'Navigation arrows hover and bullets',
            ARROWSANDBULLETS:'Navigation arrows & bullets',
            ARROWASSETCOLORINFOWITHBULLETS:'Show navigation arrows and bullet settings must be enabled',
            ARROWASSETCOLORINFOWITHOUTBULLETS:'Show navigation arrows settings must be enable',
        };

        // Slider 6 --> Slider basic
        var sliderhtml6 = `<div class="adv-slider-wrapper_unqreplaceid_ edw_adv_slider edw-adv-slider-1 overflow-hidden"><div id="edw_slider_unqreplaceid_" class="carousel slide edw-carousel" data-ride="carousel" data-interval="3000" data-pause="hover" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover"><ol class="carousel-indicators edw-carousel-indicators position-absolute"><li data-target="#edw_slider_unqreplaceid_" data-slide-to="0" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="0" class="active"></li><li data-target="#edw_slider_unqreplaceid_" data-slide-to="1" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="1" class=""></li><li data-target="#edw_slider_unqreplaceid_" data-slide-to="2" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="2" class=""></li></ol><div class="carousel-inner edw-slider-inner-container"><div class="carousel-item edw-slider-item active" data-url="${Vvveb.serverurl}/CDN/slidernewdesign6/sliderbgimg.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign6/sliderbgimg.png)"><div class="carousel-caption-wrapper w-100"><div class="carousel-caption"><div class="carousel-text-wrapper"><h5 class="carousel-caption-heading edw-carousel-content-heading m-0">Explore Our Diverse Education Courses</h5><p class="carousel-caption-para edw-carousel-content-para m-0">The set of insights on the definition, structure, and composition of a website header</p></div><a href="#" class="btn btn-primary carousel-trynow-btn edw-carousel-trynow-btn d-none">Try Now</a></div></div></div><div class="carousel-item edw-slider-item" data-url="${Vvveb.serverurl}/CDN/slidernewdesign6/sliderbgimg.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign6/sliderbgimg.png)"><div class="carousel-caption-wrapper w-100"><div class="carousel-caption"><div class="carousel-text-wrapper"><h5 class="carousel-caption-heading edw-carousel-content-heading m-0">Master New Skills Anytime, Anywhere</h5><p class="carousel-caption-para edw-carousel-content-para m-0">Explore a wide range of subjects, from coding to cooking, and take control of your learning journey</p></div><a href="#" class="btn btn-primary carousel-trynow-btn edw-carousel-trynow-btn d-none">Try Now</a></div></div></div><div class="carousel-item edw-slider-item" data-url="${Vvveb.serverurl}/CDN/slidernewdesign6/sliderbgimg.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign6/sliderbgimg.png)"><div class="carousel-caption-wrapper w-100"><div class="carousel-caption"><div class="carousel-text-wrapper"><h5 class="carousel-caption-heading edw-carousel-content-heading m-0">E-learning Courses Making Learning Interactive and Engaging</h5><p class="carousel-caption-para edw-carousel-content-para m-0">Experience a new era of education with e-learning courses that prioritize interactivity and engagement.</p></div><a href="#" class="btn btn-primary carousel-trynow-btn edw-carousel-trynow-btn d-none">Try Now</a></div></div></div></div><a class="carousel-control-prev edw-control-prev edw-slide-control position-absolute" href="#edw_slider_unqreplaceid_" role="button" data-target="#edw_slider_unqreplaceid_" data-bs-target="#edw_slider_unqreplaceid_" data-slide="prev" data-bs-slide="prev"><div class="control-icon-wrapper"><span class="fa fa-light fa-angle-left" aria-hidden="true"></span></div><span class="sr-only">Previous</span></a><a class="carousel-control-next edw-control-next edw-slide-control position-absolute" href="#edw_slider_unqreplaceid_" role="button" data-target="#edw_slider_unqreplaceid_" data-bs-target="#edw_slider_unqreplaceid_" data-slide="next" data-bs-slide="next"><div class="control-icon-wrapper"><span class="fa fa-light fa-angle-right" aria-hidden="true"></span></div><span class="sr-only">Next</span></a><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></div></div>`;
        var slidercss6 = `.adv-slider-wrapper_unqreplaceid_ {direction: ltr;}.adv-slider-wrapper_unqreplaceid_ .carousel-item {background-position: top;background-size: cover;background-repeat: no-repeat;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-heading {color: #313848;font-size: 48px;font-style: normal;font-weight: 700;line-height: 56px;letter-spacing: -2px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-para {color: #4c5a73;font-style: normal;font-weight: 400;font-size: 18px;line-height: 26px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption {position: relative;right: unset;transform: unset;padding: unset;bottom: unset;left: unset;padding: 130px 132px 154px 132px;margin: auto;z-index: 1;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption .carousel-text-wrapper {display: flex;flex-direction: column;gap: 22px;margin-bottom: 40px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption .carousel-trynow-btn {min-width: 145px;text-align: center;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption .carousel-trynow-btn:hover {filter: brightness(90%);}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-wrapper {display: flex;flex-direction: column;justify-content: center;align-items: center;min-height: 489px;}.adv-slider-wrapper_unqreplaceid_ .control-icon-wrapper {width: 46px;height: 46px;background-color: #fff;border: 1px solid #0051f9;border-radius: 50%;font-size: 28px;color: #0051f9;font-size: 24px;transition: all 0.3s ease-out;display: flex;align-items: center;justify-content: center;}.adv-slider-wrapper_unqreplaceid_ .control-icon-wrapper:hover {filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.12));}.adv-slider-wrapper_unqreplaceid_ .carousel-control-next {opacity: 1;position: absolute !important;right: 0;left: unset;}.adv-slider-wrapper_unqreplaceid_ .carousel-control-prev {opacity: 1;position: absolute !important;left: 0;right: unset;}.adv-slider-wrapper_unqreplaceid_ .carousel-indicators {position: absolute !important;margin-bottom: 85px;}.adv-slider-wrapper_unqreplaceid_ .carousel-indicators li {list-style-type: none;width: 8px;height: 8px;border-radius: 50%;background-color: #647390;margin-bottom: 0px;}.adv-slider-wrapper_unqreplaceid_ .carousel-indicators li.active {background-color: #d5ddea;}@media (max-width: 769px) {.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-wrapper {min-height: 402px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption {padding: 43px 117px 90px 117px;}.adv-slider-wrapper_unqreplaceid_ .carousel-indicators {margin-bottom: 20px;}.adv-slider-wrapper_unqreplaceid_ .carousel-control-next {display: none;}.adv-slider-wrapper_unqreplaceid_ .carousel-control-prev {display: none;}}@media (max-width: 425px) {.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-wrapper {min-height: 374px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption {padding: 66px 23px 113px 23px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-heading {font-style: normal;font-size: 34px;font-style: normal;font-weight: 700;line-height: 42px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-indicators {margin-bottom: 66px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-para {color: #4c5a73;font-size: 18px;font-style: normal;font-weight: 400;line-height: 26px;}}.edw-rtl-block .adv-slider-wrapper_unqreplaceid_ .carousel-control-next .fa, .edw-rtl-block .adv-slider-wrapper_unqreplaceid_ .carousel-control-prev .fa {transform: rotate(0deg);}`;
        var sliderjs6 = ``;
        var appendnode6 = `<div class="carousel-item edw-slider-item" data-url="${Vvveb.serverurl}/CDN/slidernewdesign6/sliderbgimg.png" style="background-image:url('${Vvveb.serverurl}/CDN/slidernewdesign6/sliderbgimg.png');"> <div class="carousel-caption-wrapper w-100"> <div class="carousel-caption "> <div class="carousel-text-wrapper"> <h5 class="carousel-caption-heading edw-carousel-content-heading m-0">Unleash Your Learning Potential</h5> <p class="carousel-caption-para edw-carousel-content-para m-0" >Edwiser School inspires a love of learning in children, encouraging creative thinking across all subjects</p></div><a href="#" class="btn btn-primary carousel-trynow-btn edw-carousel-trynow-btn d-none">Try Now</a> </div></div></div>`;
        Vvveb.Components.extend("_base", "html/slider6", {
            name: "Slider basic",
            attributes: ['data-ebpb-slider6'],
            image: "icons/slider6.svg",
            classes: ['data-ebpb-slider6'],
            html: (() => {
                return `<div class="data-ebpb-slider6" data-vvveb-disabled-area contenteditable="false">${sliderhtml6}<style>${slidercss6}</style></div>`;
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
                                Vvveb.Components.render("html/slider6");
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
                            name: SETTINGTITLES.IMAGE,
                            key: "sliderimage" + i,
                            htmlAttr: 'data-url',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i}`,
                            onChange: function (node, value, input) {
                                $(node).parent().find(this.child).css("background-image", "url(" + value + ")");
                                return node;
                            }
                        },
                    );
                });

                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
                }
                removeDuplicateIndicators(node, i);

                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("color") === -1;
                });
                if($(node).find('.control-icon-wrapper').length>0){
                    //remove all option properties
                    this.properties.splice(1, 0,
                        {
                            name: SETTINGTITLES.ARROWONLYCOLOR,
                            key: "border-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield arrowassetcolor ignoreproperty",
                            child: `.control-icon-wrapper `,
                            onChange: function (node, value, input) {
                                if(!$(node).parent(".edw-control-prev").hasClass("d-none")){
                                    $(node).find('.fa').css('color', value);
                                    $(node).css('border-color', value);
                                }
                                return node;
                            }
                        }
                    );
                }
                this.properties = properties.concat(this.properties);
                slideIntervalfielddisabler(node);
                slidearrowcolorsettingstatushandler($(node),arrow=true, arrowandbullet = false, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHOUTBULLETS);
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
                        $(node).parent().find('.carousel-inner').append(appendnode6);
                        Vvveb.Components.render("html/slider6");

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
                        var tempnode = $(node).closest('.edw-carousel')
                        slidearrowcolorsettingstatushandler(tempnode,arrow=true, arrowandbullet = false, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHOUTBULLETS);
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
                            $(node).parent().attr('data-bs-ride', 'carousel');
                            $(node).parent().attr('data-bs-interval', '3000');
                            slideintervalfield.find('input[name="slideinterval"]').val('3000');
                        } else {
                            $(node).parent().removeAttr('data-ride');
                            $(node).parent().attr('data-interval', '0');
                            $(node).parent().removeAttr('data-bs-ride');
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
                            $(node).parent().attr('data-pause', 'false');
                            $(node).parent().attr('data-bs-pause', 'false');
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
                    child: `.carousel`,
                    onChange: function (node, value, input) {

                        $(node).attr('data-interval', value);
                        $(node).attr('data-bs-interval', value);

                        return node;
                    }
                }
            ]
        });

        // Slider 1 --> Slider with CTA
        var sliderhtml1 = `<div class="adv-slider-wrapper_unqreplaceid_ edw_adv_slider edw-adv-slider-1 overflow-hidden"><div id="edw_slider_unqreplaceid_" class="carousel slide edw-carousel" data-ride="carousel" data-interval="3000" data-pause="hover" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover"><ol class="carousel-indicators edw-carousel-indicators position-absolute"><li data-target="#edw_slider_unqreplaceid_" data-slide-to="0" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="0" class="active"></li><li data-target="#edw_slider_unqreplaceid_" data-slide-to="1" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="1" class=""></li><li data-target="#edw_slider_unqreplaceid_" data-slide-to="2" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="2" class=""></li></ol><div class="carousel-inner edw-slider-inner-container"><div class="carousel-item edw-slider-item active" data-url="${Vvveb.serverurl}/CDN/slidernewdesign1/sliderbgimg.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign1/sliderbgimg.png)"><div class="carousel-caption-wrapper w-100"><div class="carousel-caption"><div class="carousel-text-wrapper"><h5 class="carousel-caption-heading edw-carousel-content-heading m-0">Explore Our Diverse Education Courses</h5><p class="carousel-caption-para edw-carousel-content-para m-0">The set of insights on the definition, structure, and composition of a website header</p></div><a href="#" class="btn btn-primary carousel-trynow-btn edw-carousel-trynow-btn">Try Now</a></div></div></div><div class="carousel-item edw-slider-item" data-url="${Vvveb.serverurl}/CDN/slidernewdesign1/sliderbgimg.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign1/sliderbgimg.png)"><div class="carousel-caption-wrapper w-100"><div class="carousel-caption"><div class="carousel-text-wrapper"><h5 class="carousel-caption-heading edw-carousel-content-heading m-0">Master New Skills Anytime, Anywhere</h5><p class="carousel-caption-para edw-carousel-content-para m-0">Explore a wide range of subjects, from coding to cooking, and take control of your learning journey</p></div><a href="#" class="btn btn-primary carousel-trynow-btn edw-carousel-trynow-btn">Try Now</a></div></div></div><div class="carousel-item edw-slider-item" data-url="${Vvveb.serverurl}/CDN/slidernewdesign1/sliderbgimg.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign1/sliderbgimg.png)"><div class="carousel-caption-wrapper w-100"><div class="carousel-caption"><div class="carousel-text-wrapper"><h5 class="carousel-caption-heading edw-carousel-content-heading m-0">E-learning Courses Making Learning Interactive and Engaging</h5><p class="carousel-caption-para edw-carousel-content-para m-0">Experience a new era of education with e-learning courses that prioritize interactivity and engagement.</p></div><a href="#" class="btn btn-primary carousel-trynow-btn edw-carousel-trynow-btn">Try Now</a></div></div></div></div><a class="carousel-control-prev edw-control-prev edw-slide-control position-absolute" href="#edw_slider_unqreplaceid_" role="button" data-target="#edw_slider_unqreplaceid_" data-bs-target="#edw_slider_unqreplaceid_" data-slide="prev" data-bs-slide="prev"><div class="control-icon-wrapper"><span class="fa fa-light fa-angle-left" aria-hidden="true"></span></div><span class="sr-only">Previous</span></a><a class="carousel-control-next edw-control-next edw-slide-control position-absolute" href="#edw_slider_unqreplaceid_" role="button" data-target="#edw_slider_unqreplaceid_" data-bs-target="#edw_slider_unqreplaceid_" data-slide="next" data-bs-slide="next"><div class="control-icon-wrapper"><span class="fa fa-light fa-angle-right" aria-hidden="true"></span></div><span class="sr-only">Next</span></a><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></div></div>`;
        var slidercss1 = `.adv-slider-wrapper_unqreplaceid_ .carousel-item {background-position: top;background-size: cover;background-repeat: no-repeat;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-heading {color: #313848;font-size: 48px;font-style: normal;font-weight: 700;line-height: 56px;letter-spacing: -2px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-para {color: #4c5a73;font-style: normal;font-weight: 400;font-size: 18px;line-height: 26px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption {position: relative;right: unset;transform: unset;padding: unset;bottom: unset;left: unset;padding: 130px 132px 154px 132px;margin: auto;z-index: 1;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption .carousel-text-wrapper {display: flex;flex-direction: column;gap: 22px;margin-bottom: 40px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption .carousel-trynow-btn {min-width: 145px;text-align: center;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption .carousel-trynow-btn:hover {filter: brightness(90%);}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-wrapper {display: flex;flex-direction: column;justify-content: center;align-items: center;min-height: 489px;}.adv-slider-wrapper_unqreplaceid_ .control-icon-wrapper {width: 46px;height: 46px;background-color: #fff;border: 1px solid #0051f9;border-radius: 50%;font-size: 28px;color: #0051f9;font-size: 24px;transition: all 0.3s ease-out;display: flex;align-items: center;justify-content: center;}.adv-slider-wrapper_unqreplaceid_ .control-icon-wrapper:hover {filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.12));}.adv-slider-wrapper_unqreplaceid_ .carousel-control-next {opacity: 1;position: absolute !important;right: 0;left: unset;}.adv-slider-wrapper_unqreplaceid_ .carousel-control-prev {opacity: 1;position: absolute !important;left: 0;right: unset;}.adv-slider-wrapper_unqreplaceid_ .carousel-indicators {position: absolute !important;margin-bottom: 85px;}.adv-slider-wrapper_unqreplaceid_ .carousel-indicators li {list-style-type: none;width: 8px;height: 8px;border-radius: 50%;background-color: #647390;margin-bottom: 0px;}.adv-slider-wrapper_unqreplaceid_ .carousel-indicators li.active {background-color: #d5ddea;}@media (max-width: 769px) {.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-wrapper {min-height: 402px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption {padding: 43px 117px 90px 117px;}.adv-slider-wrapper_unqreplaceid_ .carousel-indicators {margin-bottom: 20px;}.adv-slider-wrapper_unqreplaceid_ .carousel-control-next {display: none;}.adv-slider-wrapper_unqreplaceid_ .carousel-control-prev {display: none;}}@media (max-width: 425px) {.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-wrapper {min-height: 374px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption {padding: 66px 23px 113px 23px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-heading {font-style: normal;font-size: 34px;font-style: normal;font-weight: 700;line-height: 42px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-indicators {margin-bottom: 66px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-para {color: #4c5a73;font-size: 18px;font-style: normal;font-weight: 400;line-height: 26px;}}.edw-rtl-block .adv-slider-wrapper_unqreplaceid_ .carousel-control-prev, .edw-rtl-block .adv-slider-wrapper_unqreplaceid_ .carousel-control-next {transform: rotate(180deg);}.edw-rtl-block .adv-slider-wrapper_unqreplaceid_ .carousel-indicators {flex-direction: row-reverse;}`;
        var sliderjs1 = ``;
        var appendnode1 = `<div class="carousel-item edw-slider-item" data-url="${Vvveb.serverurl}/CDN/slidernewdesign1/sliderbgimg.png" style="background-image:url('${Vvveb.serverurl}/CDN/slidernewdesign1/sliderbgimg.png');"> <div class="carousel-caption-wrapper w-100"> <div class="carousel-caption "> <div class="carousel-text-wrapper"> <h5 class="carousel-caption-heading edw-carousel-content-heading m-0">Explore Our Diverse Education Courses</h5> <p class="carousel-caption-para edw-carousel-content-para m-0" >The set of insights on the definition, structure, and composition of a website header</p></div><a href="#" class="btn btn-primary carousel-trynow-btn edw-carousel-trynow-btn">Try Now</a> </div></div></div>`;
        Vvveb.Components.extend("_base", "html/slider1", {
            name: "Slider with CTA",
            attributes: ['data-ebpb-slider1'],
            image: "icons/slider1.svg",
            classes: ['edwiser-pb-slider1'],
            html: (() => {
                return `<div class="edwiser-pb-slider1" data-vvveb-disabled-area contenteditable="false">${sliderhtml1}<style>${slidercss1}</style></div>`;
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
                                Vvveb.Components.render("html/slider1");
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
                            name: SETTINGTITLES.BUTTONTEXT,
                            key: "sliderbuttontext" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
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
                            name: SETTINGTITLES.LINK,
                            key: "sliderlink" + i,
                            htmlAttr: "href",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },
                        {
                            name: SETTINGTITLES.IMAGE,
                            key: "sliderimage" + i,
                            htmlAttr: 'data-url',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i}`,
                            onChange: function (node, value, input) {
                                $(node).parent().find(this.child).css("background-image", "url(" + value + ")");
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.BUTTONBACKGROUNDCOLOR,
                            key: "background-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-trynow-btn').css('background', value);
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.BUTTONBORDERCOLOR,
                            key: "border-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-trynow-btn').css('border-color', value);
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.BUTTONTEXTCOLOR,
                            key: "color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-trynow-btn').css('color', value);
                                return node;
                            }
                        }

                    );
                });
                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
                }
                removeDuplicateIndicators(node, i);
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("color") === -1;
                });
                if($(node).find('.control-icon-wrapper').length>0){
                    //remove all option properties
                    this.properties.splice(1, 0,
                        {
                            name: SETTINGTITLES.ARROWONLYCOLOR,
                            key: "border-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield arrowassetcolor ignoreproperty",
                            child: `.control-icon-wrapper `,
                            onChange: function (node, value, input) {
                                if(!$(node).parent(".edw-control-prev").hasClass("d-none")){
                                    $(node).find('.fa').css('color', value);
                                    $(node).css('border-color', value);
                                }
                                return node;
                            }
                        }
                    );
                }
                this.properties = properties.concat(this.properties);
                slideIntervalfielddisabler(node);
                slidearrowcolorsettingstatushandler($(node),arrow=true, arrowandbullet = false, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHOUTBULLETS);
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
                        $(node).parent().find('.carousel-inner').append(appendnode1);
                        Vvveb.Components.render("html/slider1");

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
                        var tempnode = $(node).closest('.edw-carousel')
                        slidearrowcolorsettingstatushandler(tempnode,arrow=true, arrowandbullet = false, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHOUTBULLETS);
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
                            $(node).parent().attr('data-bs-ride', 'carousel');
                            $(node).parent().attr('data-bs-interval', '3000');
                            slideintervalfield.find('input[name="slideinterval"]').val('3000');
                        } else {
                            $(node).parent().removeAttr('data-ride');
                            $(node).parent().attr('data-interval', '0');
                            $(node).parent().removeAttr('data-bs-ride');
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
                            $(node).parent().attr('data-pause', 'false');
                            $(node).parent().attr('data-bs-pause', 'false');
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
                    child: `.carousel`,
                    onChange: function (node, value, input) {

                        $(node).attr('data-interval', value);
                        $(node).attr('data-bs-interval', value);

                        return node;
                    }
                }
            ]
        });


        // Slider 7 --> Slider with controls 1
        var sliderhtml7 = `<div class="adv-slider-wrapper_unqreplaceid_ edw_adv_slider edw-adv-slider-7 overflow-hidden"><div id="edw_slider_unqreplaceid_" class="carousel slide edw-carousel" data-ride="carousel" data-interval="3000" data-pause="hover" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover"><ol class="carousel-indicators edw-carousel-indicators position-absolute"><li data-target="#edw_slider_unqreplaceid_" data-slide-to="0" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="0" class="active"></li><li data-target="#edw_slider_unqreplaceid_" data-slide-to="1" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="1" class=""></li><li data-target="#edw_slider_unqreplaceid_" data-slide-to="2" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="2" class=""></li></ol><div class="carousel-inner edw-slider-inner-container"><div class="carousel-item edw-slider-item active"><div class="carousel-caption-wrapper w-100"><div class="carousel-caption"><div class="carousel-text-wrapper"><h5 class="carousel-caption-heading edw-carousel-content-heading m-0">Your Path to Educational Excellence</h5><p class="carousel-caption-para edw-carousel-content-para m-0">Edwiser School inspires a love of learning in children, encouraging creative thinking across all subjects.</p></div><a href="#" class="btn btn-primary carousel-trynow-btn edw-carousel-trynow-btn">Enroll Now</a></div></div><div class="bg-desktop-img position-absolute" data-url="${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school1.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school1.png)"></div><div class="bg-tab-img position-absolute" data-url="${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2tab.png" style="background-image:url(images/slideimages/school1tab.png)"></div><div class="bg-mob-img position-absolute" data-url="${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2mob.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school1mob.png)"></div><div class="bg-overlay position-absolute"></div></div><div class="carousel-item edw-slider-item"><div class="carousel-caption-wrapper w-100"><div class="carousel-caption"><div class="carousel-text-wrapper"><h5 class="carousel-caption-heading edw-carousel-content-heading m-0">EDUCATING LEADERS OF CHARACTER</h5><p class="carousel-caption-para edw-carousel-content-para m-0">Edwiser School inspires a love of learning in children, encouraging creative thinking across all subjects.</p></div><a href="#" class="btn btn-primary carousel-trynow-btn edw-carousel-trynow-btn">Enroll Now</a></div></div><div class="bg-desktop-img position-absolute" data-url="${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2.png)"></div><div class="bg-tab-img position-absolute" data-url="${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2tab.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2tab.png)"></div><div class="bg-mob-img position-absolute" data-url="${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2mob.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2mob.png)"></div><div class="bg-overlay position-absolute"></div></div><div class="carousel-item edw-slider-item"><div class="carousel-caption-wrapper w-100"><div class="carousel-caption"><div class="carousel-text-wrapper"><h5 class="carousel-caption-heading edw-carousel-content-heading m-0">Elevate Your Learning with Us</h5><p class="carousel-caption-para edw-carousel-content-para m-0">Edwiser School inspires a love of learning in children, encouraging creative thinking across all subjects.</p></div><a href="#" class="btn btn-primary carousel-trynow-btn edw-carousel-trynow-btn">Enroll Now</a></div></div><div class="bg-desktop-img position-absolute" data-url="${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school3.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school3.png)"></div><div class="bg-tab-img position-absolute" data-url="${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2tab.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school3tab.png)"></div><div class="bg-mob-img position-absolute" data-url="${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2mob.png" style="background-image:url(${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school3mob.png)"></div><div class="bg-overlay position-absolute"></div></div></div><div class="carousel-button-wrapper"><a class="carousel-control-prev edw-control-prev edw-slide-control" style="--arrowassetcolor:#731db1" href="#edw_slider_unqreplaceid_" role="button" data-target="#edw_slider_unqreplaceid_" data-bs-target="#edw_slider_unqreplaceid_" data-slide="prev" data-bs-slide="prev"><span class="fa fa-light fa-angle-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next edw-control-next edw-slide-control" style="--arrowassetcolor:#731db1" href="#edw_slider_unqreplaceid_" role="button" data-target="#edw_slider_unqreplaceid_" data-bs-target="#edw_slider_unqreplaceid_" data-slide="next" data-bs-slide="next"><span class="fa fa-light fa-angle-right" aria-hidden="true"></span><span class="sr-only">Next</span></a></div></div><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></div>`;
        var slidercss7 = `.adv-slider-wrapper_unqreplaceid_ {--arrowassetcolor: #731db1;direction: ltr;}.adv-slider-wrapper_unqreplaceid_ .carousel-item {position: relative;padding-bottom: 140px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .bg-mob-img {display: none;left: 0px;top: 0px;width: 100%;height: 100%;background-position: top !important;background-size: cover !important;background-repeat: no-repeat !important;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .bg-tab-img {display: none;left: 0px;top: 0px;width: 100%;height: 100%;background-position: top !important;background-size: cover !important;background-repeat: no-repeat !important;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .bg-desktop-img {left: 0px;top: 0px;width: 100%;height: 100%;background-position: top !important;background-size: cover !important;background-repeat: no-repeat !important;display: flex;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .bg-overlay {left: 0px;top: 0px;width: 100%;height: 100%;background: linear-gradient(90deg, #0d2122 0%, rgba(13, 33, 34, 0.1) 59.01%);}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-heading {color: #fff;font-size: 70px;font-style: normal;font-weight: bold;line-height: 85px;letter-spacing: 1.4px;text-transform: uppercase;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-para {color: #fff;font-size: 22px;font-style: normal;font-weight: 400;line-height: 30px;width: 70%;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-wrapper {display: flex;flex-direction: column;justify-content: center;align-items: center;min-height: 618px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption {z-index: 10;position: relative;right: unset;transform: unset;padding: unset;bottom: unset;left: unset;width: 100%;max-width: 900px;text-align: left;margin-right: auto;padding: 62px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption .carousel-text-wrapper {display: flex;flex-direction: column;gap: 22px;margin-bottom: 40px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption .carousel-trynow-btn {background: #9a3cdf;color: #ffffff;font-style: normal;font-weight: 400;font-size: 18px;line-height: 22px;box-sizing: border-box;padding: 15px 38px;border: 1px solid #9a3cdf;border-radius: 0;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption .carousel-trynow-btn:hover {filter: brightness(90%);}.adv-slider-wrapper_unqreplaceid_ .carousel-button-wrapper {position: absolute !important;display: flex;bottom: 100px;width: 100%;justify-content: center;gap: 30px;padding-bottom: 30px;}.adv-slider-wrapper_unqreplaceid_ .carousel-control-next, .adv-slider-wrapper_unqreplaceid_ .carousel-control-prev {opacity: 1;position: relative;width: 50px;height: 50px;background-color: rgba(0, 0, 0, 0.7);color: #fff;border-radius: 100%;font-size: 24px;display: flex;align-items: center;justify-content: center;}.adv-slider-wrapper_unqreplaceid_ .carousel-control-next:hover, .adv-slider-wrapper_unqreplaceid_ .carousel-control-prev:hover {background-color: var(--arrowassetcolor);}.adv-slider-wrapper_unqreplaceid_ .carousel-indicators {margin-bottom: 70px;}.adv-slider-wrapper_unqreplaceid_ .carousel-indicators li {width: 8px;height: 8px;border-radius: 50%;background-color: #d9d9d9;margin-bottom: 0px;display: none;}.adv-slider-wrapper_unqreplaceid_ .carousel-indicators li.active {background-color: #9a3cdf;}@media (max-width: 769px) {.adv-slider-wrapper_unqreplaceid_ .carousel-item {min-height: 500px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .bg-desktop-img {display: none;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .bg-mob-img {display: none;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .bg-tab-img {display: flex;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-wrapper {align-items: start;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption {margin: unset;max-width: 70%;width: 100%;padding: 0px 24px 0px 24px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-heading {font-size: 50px;line-height: 60px;letter-spacing: 1px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-para {color: #fff;font-size: 18px;font-style: normal;font-weight: 400;line-height: 22px;}.adv-slider-wrapper_unqreplaceid_ .carousel-button-wrapper {padding-bottom: unset;}}@media (max-width: 425px) {.adv-slider-wrapper_unqreplaceid_ .carousel-item {min-height: 756px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .bg-desktop-img {display: none;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .bg-tab-img {display: none;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .bg-mob-img {display: flex;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .bg-overlay {background: linear-gradient(360deg, #0d2122 0%, rgba(13, 33, 34, 0) 100%);}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-wrapper {justify-content: flex-end;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption {text-align: center;max-width: 100%;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-heading {font-size: 38px;line-height: 50px;letter-spacing: 0.76px;}.adv-slider-wrapper_unqreplaceid_ .carousel-item .carousel-caption-para {font-size: 20px;font-style: normal;font-weight: 400;line-height: 35px;width: 100%;}.adv-slider-wrapper_unqreplaceid_ .carousel-indicators li {display: block;}.adv-slider-wrapper_unqreplaceid_ .carousel-button-wrapper {display: none;}}.edw-rtl-block .adv-slider-wrapper_unqreplaceid_ .carousel-control-next .fa, .edw-rtl-block .adv-slider-wrapper_unqreplaceid_ .carousel-control-prev .fa {transform: rotate(0deg);}`;
        var sliderjs7 = ``;
        var appendnode7 = ` <div class="carousel-item edw-slider-item "> <div class="carousel-caption-wrapper w-100"> <div class="carousel-caption "> <div class="carousel-text-wrapper"> <h5 class="carousel-caption-heading edw-carousel-content-heading m-0">EDUCATING LEADERS OF CHARACTER</h5> <p class="carousel-caption-para edw-carousel-content-para m-0">Edwiser School inspires a love of learning in children, encouraging creative thinking across all subjects. </p></div><a href="#" class="btn btn-primary carousel-trynow-btn edw-carousel-trynow-btn ">Enroll Now</a> </div></div><div class="bg-desktop-img position-absolute" data-url='${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2.png' style="background-image:url('${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2.png');"></div><div class="bg-tab-img position-absolute" data-url='${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2tab.png' style="background-image:url('${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2tab.png');"></div><div class="bg-mob-img position-absolute" data-url='${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2mob.png' style="background-image:url('${Vvveb.serverurl}/CDN/slidernewdesign7/slideimages/school2mob.png');"></div><div class="bg-overlay position-absolute"></div></div>`;
        Vvveb.Components.extend("_base", "html/slider7", {
            name: "Slider with controls 1",
            attributes: ['data-ebpb-slider7'],
            image: "icons/slider7.svg",
            classes: ['edwiser-pb-slider7'],
            html: (() => {
                return `<div class="edwiser-pb-slider7" data-vvveb-disabled-area contenteditable="false">${sliderhtml7}<style>${slidercss7}</style></div>`;
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
                                Vvveb.Components.render("html/slider7");
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
                            }
                        },
                        {
                            name: SETTINGTITLES.BUTTONTEXT,
                            key: "sliderbuttontext" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
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
                            name: SETTINGTITLES.LINK,
                            key: "sliderlink" + i,
                            htmlAttr: "href",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },
                        {
                            name: SETTINGTITLES.BUTTONBACKGROUNDCOLOR,
                            key: "background-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-trynow-btn').css('background', value);
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.BUTTONBORDERCOLOR,
                            key: "border-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-trynow-btn').css('border-color', value);
                                return node;
                            }

                        },
                        {
                            name: SETTINGTITLES.BUTTONTEXTCOLOR,
                            key: "color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-trynow-btn').css('color', value);
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.IMAEGEDESKTOP,
                            key: "sliderimage" + i,
                            htmlAttr: 'data-url',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .bg-desktop-img`,
                            onChange: function (node, value, input) {
                                $(node).css("background-image", "url(" + value + ")");
                                console.log($(node).parent());
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.IMAGETAB,
                            key: "sliderimage" + i,
                            htmlAttr: 'data-url',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .bg-tab-img`,
                            onChange: function (node, value, input) {
                                $(node).css("background-image", "url(" + value + ")");
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.IMAGEMOB,
                            key: "sliderimage" + i,
                            htmlAttr: 'data-url',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .bg-mob-img`,
                            onChange: function (node, value, input) {
                                $(node).css("background-image", "url(" + value + ")");
                                return node;
                            }
                        }
                    );
                });
                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
                }
                removeDuplicateIndicators(node, i);

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
                            name: SETTINGTITLES.ARROWSHOVER,
                            key: "background-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield arrowassetcolor ignoreproperty",
                            child: `.edw-carousel-indicators .active`,
                            onChange: function (node, value, input) {

                            if(!$(node).closest('.edw-carousel').find('.edw-slide-control').hasClass('d-none')){
                                $(node).closest('.edw-carousel').find('.edw-slide-control').css('--arrowassetcolor', value);

                            }
                                return node;
                            }
                        }
                    );
                }
                this.properties = properties.concat(this.properties);
                slideIntervalfielddisabler(node);
                slidearrowcolorsettingstatushandler($(node),arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHBULLETS);
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
                        $(node).parent().find('.carousel-inner').append(appendnode7);
                        Vvveb.Components.render("html/slider7");

                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.SHOWNAVIGATIONBUTTONSDESKANDTAB,
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
                        slidearrowcolorsettingstatushandler(tempnode,arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHBULLETS);
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.SHOWNAVIGATIONBULLETSMOB,
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
                        var tempnode = $(node).closest('.edw-carousel')
                        slidearrowcolorsettingstatushandler(tempnode,arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHBULLETS);
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
                            $(node).parent().find('.edw-carousel').attr('data-ride', 'carousel');
                            $(node).parent().find('.edw-carousel').attr('data-interval', '3000');
                            $(node).parent().find('.edw-carousel').attr('data-bs-ride', 'carousel');
                            $(node).parent().find('.edw-carousel').attr('data-bs-interval', '3000');
                            slideintervalfield.find('input[name="slideinterval"]').val('3000');
                        } else {
                            $(node).parent().find('.edw-carousel').removeAttr('data-ride');
                            $(node).parent().find('.edw-carousel').attr('data-interval', '0');
                            $(node).parent().find('.edw-carousel').removeAttr('data-bs-ride');
                            $(node).parent().find('.edw-carousel').attr('data-bs-interval', '0');
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
                            $(node).parent().find('.edw-carousel').attr('data-pause', 'hover');
                            $(node).parent().find('.edw-carousel').attr('data-bs-pause', 'hover');
                        } else {
                            $(node).parent().find('.edw-carousel').attr('data-pause', 'false');
                            $(node).parent().find('.edw-carousel').attr('data-bs-pause', 'false');
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
                    child: `.carousel`,
                    onChange: function (node, value, input) {

                        $(node).attr('data-interval', value);
                        $(node).attr('data-bs-interval', value);

                        return node;
                    }
                }
            ]
        });

        // Slider 8 --> Slider with controls 2
        var sliderhtml8 = `<div class="header-design-slider_unqreplaceid_ edw_adv_slider edw-adv-slider-8 overflow-hidden"><div class="html-section-body container-fluid bg-white"><div id="edw_slider_unqreplaceid_" class="carousel slide edw-carousel" data-ride="carousel" data-interval="3000" data-pause="hover" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover"><ol class="carousel-indicators edw-carousel-indicators position-absolute"><li data-target="#edw_slider_unqreplaceid_" data-slide-to="0" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="0" class="active"></li><li data-target="#edw_slider_unqreplaceid_" data-slide-to="1" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="1" class=""></li><li data-target="#edw_slider_unqreplaceid_" data-slide-to="2" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="2" class=""></li></ol><div class="carousel-inner edw-slider-inner-container"><div class="carousel-item edw-slider-item active"><div class="row carousel-item-wrapper"><div class="col-sm slider-sec-1 p-0"><img class="header-slider-bg-image" src="https://staticcdn.edwiser.org/demo/university2/headersliderbgimgtopleft.png" alt="slider image pattern "> <img class="header-slider-bg-image-bottom-left position-absolute" src="https://staticcdn.edwiser.org/demo/university2/headersliderbgimgtopleft.png" alt="slider image pattern "><div class="slider-content-wrapper"><div class="slider-content"><div class="slider-content-heading edw-carousel-content-heading">LET’S DESIGN YOUR FUTURE!</div><p class="slider-content-para edw-carousel-content-para m-0">Edwiser School inspires a love of learning in children, encouraging creative thinking across all subjects.</p></div><a href="#" class="btn btn-primary trynowbutton edw-carousel-trynow-btn">Explore Academics</a></div></div><div class="col-sm slider-sec-2 p-0"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign8/slideimages/universityimg1.png" alt="slider image 1"></div></div></div><div class="carousel-item edw-slider-item"><div class="row carousel-item-wrapper"><div class="col-sm slider-sec-1"><img class="header-slider-bg-image position-absolute" src="https://staticcdn.edwiser.org/demo/university2/headersliderbgimgtopleft.png" alt="slider image pattern "> <img class="header-slider-bg-image-bottom-left position-absolute" src="https://staticcdn.edwiser.org/demo/university2/headersliderbgimgtopleft.png" alt="slider image pattern "><div class="slider-content-wrapper"><div class="slider-content"><div class="slider-content-heading edw-carousel-content-heading">Shaping Leaders of Tomorrow</div><p class="slider-content-para edw-carousel-content-para m-0">Edwiser School inspires a love of learning in children, encouraging creative thinking across all subjects.</p></div><a href="#" class="btn btn-primary trynowbutton edw-carousel-trynow-btn">Explore Academics</a></div></div><div class="col-sm slider-sec-2"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign8/slideimages/universityimg2.png" alt="slider image 1"></div></div></div><div class="carousel-item edw-slider-item"><div class="row carousel-item-wrapper"><div class="col-sm slider-sec-1"><img class="header-slider-bg-image position-absolute" src="https://staticcdn.edwiser.org/demo/university2/headersliderbgimgtopleft.png" alt="slider image pattern "> <img class="header-slider-bg-image-bottom-left position-absolute" src="https://staticcdn.edwiser.org/demo/university2/headersliderbgimgtopleft.png" alt="slider image pattern "><div class="slider-content-wrapper"><div class="slider-content"><div class="slider-content-heading edw-carousel-content-heading">Education for a Bright Future</div><p class="slider-content-para edw-carousel-content-para m-0">Edwiser School inspires a love of learning in children, encouraging creative thinking across all subjects.</p></div><a href="#" class="btn btn-primary trynowbutton edw-carousel-trynow-btn">Explore Academics</a></div></div><div class="col-sm slider-sec-2"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign8/slideimages/universityimg3.png" alt="slider image 1"></div></div></div></div><a class="carousel-control-prev edw-control-prev edw-slide-control position-absolute" style="--arrowassetcolor:#0934ba" href="#edw_slider_unqreplaceid_" role="button" data-target="#edw_slider_unqreplaceid_" data-bs-target="#edw_slider_unqreplaceid_" data-slide="prev" data-bs-slide="prev"><span class="fa fa-angle-left slider-nav-icons" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next edw-control-next edw-slide-control position-absolute" style="--arrowassetcolor:#0934ba" href="#edw_slider_unqreplaceid_" role="button" data-target="#edw_slider_unqreplaceid_" data-bs-target="#edw_slider_unqreplaceid_" data-slide="next" data-bs-slide="next"><span class="fa fa-angle-right slider-nav-icons" aria-hidden="true"></span><span class="sr-only">Next</span></a><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></div></div></div>`;
        var slidercss8 = `.header-design-slider_unqreplaceid_ {--arrowassetcolor: #0934ba;direction: ltr;}.header-design-slider_unqreplaceid_ .html-section-body {background: #ffff;padding: 0px;}.header-design-slider_unqreplaceid_ .html-section-body .carousel-inner {padding: 50px 0px;}.header-design-slider_unqreplaceid_ .carousel-indicators {position: absolute !important;}.header-design-slider_unqreplaceid_ .carousel-indicators [data-target="#edw_slider_unqreplaceid_"] {background: #d9d9d9;width: 8px;height: 8px;border-radius: 50%;border: unset;}.header-design-slider_unqreplaceid_ .carousel-indicators .active {background: var(--arrowassetcolor);}.header-design-slider_unqreplaceid_ .carousel-item-wrapper {padding: 0 10%;}.header-design-slider_unqreplaceid_ .slider-content-heading {font-size: 55px;font-style: normal;font-weight: 700;line-height: 70px;color: #313848;}.header-design-slider_unqreplaceid_ .slider-content-para {font-size: 20px;font-style: normal;font-weight: 400;line-height: 30px;color: #4c5a73;}.header-design-slider_unqreplaceid_ .slider-content-wrapper {display: flex;flex-direction: column;gap: 45px;z-index: 1;}.header-design-slider_unqreplaceid_ .slider-content {display: flex;flex-direction: column;gap: 16px;}.header-design-slider_unqreplaceid_ .slider-sec-1 {padding: unset;display: flex;align-items: center;position: relative;}.header-design-slider_unqreplaceid_ .slider-sec-2 {padding: unset;display: flex;justify-content: center;align-items: center;}.header-design-slider_unqreplaceid_ .trynowbutton {width: fit-content;padding: 14px 34px;font-size: 20px;font-style: normal;font-weight: 400;line-height: 22px;background-color: #0934ba;}.header-design-slider_unqreplaceid_ .trynowbutton:hover {filter: brightness(90%);}.header-design-slider_unqreplaceid_ .header-slider-image {width: 100%;height: auto;}.header-design-slider_unqreplaceid_ .header-slider-bg-image {position: absolute;max-width: 106px;width: 100%;top: 0px;left: 0px;}.header-design-slider_unqreplaceid_ .header-slider-bg-image-bottom-left {position: absolute;max-width: 182px;width: 100%;bottom: 0px;left: 0px;}.header-design-slider_unqreplaceid_ .carousel-control-prev {opacity: 1;width: 8%;position: absolute !important;left: 0;right: unset;}.header-design-slider_unqreplaceid_ .carousel-control-next {opacity: 1;width: 8%;position: absolute !important;right: 0;left: unset;}.header-design-slider_unqreplaceid_ .slider-nav-icons {display: flex;justify-content: center;align-items: center;color: var(--arrowassetcolor);font-size: 30px;height: 57px;width: 57px;border-radius: 50%;border-width: 2px;border-style: solid;border-color: var(--arrowassetcolor);background-color: white;}.header-design-slider_unqreplaceid_ .slider-nav-icons:hover {background-color: var(--arrowassetcolor);color: white;}@media (max-width: 768px) {.header-design-slider_unqreplaceid_ .carousel-item-wrapper {margin: unset;padding-left: 24px;padding-right: 24px;}.header-design-slider_unqreplaceid_ .carousel-control-prev {display: none;}.header-design-slider_unqreplaceid_ .carousel-control-next {display: none;}}@media (max-width: 576px) {.header-design-slider_unqreplaceid_ .html-section-body {padding: 24px;padding-bottom: 60px;}.header-design-slider_unqreplaceid_ .html-section-body .carousel-inner {padding: 0px 0px;}.header-design-slider_unqreplaceid_ .header-slider-bg-image {max-width: 92px;}.header-design-slider_unqreplaceid_ .slider-sec-1 {padding-left: unset;}.header-design-slider_unqreplaceid_ .slider-sec-2 {padding: 0px 15px;}.header-design-slider_unqreplaceid_ .carousel-item-wrapper {padding: unset;gap: 38px;}.header-design-slider_unqreplaceid_ .carousel-item-wrapper.row {margin: unset;}.header-design-slider_unqreplaceid_ .slider-content-wrapper {align-items: center;gap: 30px;}.header-design-slider_unqreplaceid_ .slider-content-heading {font-size: 45px;line-height: 50px;text-align: center;}.header-design-slider_unqreplaceid_ .slider-content-para {font-size: 20px;text-align: center;}.header-design-slider_unqreplaceid_ .slider-content {gap: 32px;}.header-design-slider_unqreplaceid_ .carousel-indicators {bottom: -40px;}.header-design-slider_unqreplaceid_ .header-slider-bg-image-bottom-left {display: none;}}.edw-rtl-block .header-design-slider_unqreplaceid_ .carousel-control-next, .edw-rtl-block .header-design-slider_unqreplaceid_ .carousel-control-prev {transform: rotate(180deg);}.carousel-indicators li {list-style-type: none;}`;
        var sliderjs8 = ``;
        var appendnode8 = ` <div class="carousel-item edw-slider-item"> <div class="row carousel-item-wrapper"> <div class="col-sm slider-sec-1"> <img class="header-slider-bg-image position-absolute" src="https://staticcdn.edwiser.org/demo/university2/headersliderbgimgtopleft.png" alt="slider image pattern "> <img class="header-slider-bg-image-bottom-left position-absolute" src="https://staticcdn.edwiser.org/demo/university2/headersliderbgimgtopleft.png" alt="slider image pattern "> <div class="slider-content-wrapper"> <div class="slider-content"> <div class="slider-content-heading edw-carousel-content-heading"> LET’S DESIGN YOUR FUTURE! </div><p class="slider-content-para edw-carousel-content-para m-0">Edwiser School inspires a love of learning in children, encouraging creative thinking across all subjects.</p></div><a href="#" class="btn btn-primary trynowbutton edw-carousel-trynow-btn">Explore Academics</a> </div></div><div class="col-sm slider-sec-2 "> <img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign8/slideimages/universityimg1.png" alt="slider image 1"> </div></div></div>`;
        Vvveb.Components.extend("_base", "html/slider8", {
            name: "Slider with controls 2",
            attributes: ['data-ebpb-slider8'],
            image: "icons/slider8.svg",
            classes: ['edwiser-pb-slider8'],
            html: (() => {
                return `<div class="edwiser-pb-slider8" data-vvveb-disabled-area contenteditable="false">${sliderhtml8}<style>${slidercss8}</style></div>`;
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
                                Vvveb.Components.render("html/slider8");
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
                            name: SETTINGTITLES.BUTTONTEXT,
                            key: "sliderbuttontext" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
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
                            name: SETTINGTITLES.LINK,
                            key: "sliderlink" + i,
                            htmlAttr: "href",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },
                        {
                            name: SETTINGTITLES.BUTTONBACKGROUNDCOLOR,
                            key: "background-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-trynow-btn').css('background', value);
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.BUTTONBORDERCOLOR,
                            key: "border-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-trynow-btn').css('border-color', value);
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.BUTTONTEXTCOLOR,
                            key: "color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-trynow-btn').css('color', value);
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.IMAGE,
                            key: "sliderimage" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwinputfield",
                            child: `.edw-carousel-item-${i} .header-slider-image`
                        }
                    );
                });
                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
                }
                removeDuplicateIndicators(node, i);
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
                            name: SETTINGTITLES.ARROWASSETCOLOR,
                            key: "background-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield arrowassetcolor ignoreproperty",
                            child: `.edw-carousel-indicators .active`,
                            onChange: function (node, value, input) {

                                if(!$(node).closest('.edw-carousel').find('.edw-slide-control').hasClass('d-none')){

                                    $(node).closest('.edw-carousel').find('.edw-slide-control').css('--arrowassetcolor', value);

                                    $(node).closest('.edw-carousel').find('.edw-slide-control .fa').css('border', `2px solid ${value}`);
                                }

                                return node;
                            }
                        }
                    );
                }
                this.properties = properties.concat(this.properties);
                slideIntervalfielddisabler(node);
                slidearrowcolorsettingstatushandler($(node),arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHBULLETS);
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
                        $(node).parent().find('.carousel-inner').append(appendnode8);
                        Vvveb.Components.render("html/slider8");

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
                        slidearrowcolorsettingstatushandler(tempnode,arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHBULLETS);
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
                        var tempnode = $(node).closest('.edw-carousel')
                        slidearrowcolorsettingstatushandler(tempnode,arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHBULLETS);
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
                            $(node).parent().attr('data-bs-ride', 'carousel');
                            $(node).parent().attr('data-bs-interval', '3000');
                            slideintervalfield.find('input[name="slideinterval"]').val('3000');
                        } else {
                            $(node).parent().removeAttr('data-ride');
                            $(node).parent().attr('data-interval', '0');
                            $(node).parent().removeAttr('data-bs-ride');
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
                            $(node).parent().attr('data-pause', 'false');
                            $(node).parent().attr('data-bs-pause', 'false');
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
                    child: `.carousel`,
                    onChange: function (node, value, input) {

                        $(node).attr('data-interval', value);
                        $(node).attr('data-bs-interval', value);

                        return node;
                    }
                }
            ]
        });

        // Slider 9  --> Slider with controls 3
        var sliderhtml9 = `<div class="header-design-slider_unqreplaceid_ edw_adv_slider edw-adv-slider-9"><div class="html-section-body container-fluid"><div id="edw_slider_unqreplaceid_" class="carousel slide edw-carousel" data-ride="carousel" data-interval="3000" data-pause="hover" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover"><ol class="carousel-indicators edw-carousel-indicators position-absolute"><li data-target="#edw_slider_unqreplaceid_" data-slide-to="0" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="0" class="active"></li><li data-target="#edw_slider_unqreplaceid_" data-slide-to="1" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="1" class=""></li><li data-target="#edw_slider_unqreplaceid_" data-slide-to="2" data-bs-target="#edw_slider_unqreplaceid_" data-bs-slide-to="2" class=""></li></ol><div class="carousel-inner edw-slider-inner-container"><div class="carousel-item edw-slider-item active"><div class="row carousel-item-wrapper"><div class="col-sm slider-sec-1"><img class="header-slider-bg-image position-absolute" src="https://staticcdn.edwiser.org/demo/classic2/sliderbgpattern.png" alt="slider image pattern "><div class="slider-content-wrapper"><div class="slider-content"><div class="slider-content-heading edw-carousel-content-heading">design your dream homepage, in a Snap!</div><p class="slider-content-para edw-carousel-content-para m-0">First-of-its-kind, Edwiser RemUI Homepage Builder to design your dream homepage, in a Snap!</p></div><a href="#" class="btn btn-primary trynowbutton edw-carousel-trynow-btn">Try Now</a></div></div><div class="col-sm slider-sec-2"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign9/slideimages/classicimg2.png" alt="slider image 1"></div></div></div><div class="carousel-item edw-slider-item"><div class="row carousel-item-wrapper"><div class="col-sm slider-sec-1"><img class="header-slider-bg-image position-absolute" src="https://staticcdn.edwiser.org/demo/classic2/sliderbgpattern.png" alt="slider image pattern "><div class="slider-content-wrapper"><div class="slider-content"><div class="slider-content-heading edw-carousel-content-heading">Everything you need to build a home page, all in one place.</div><p class="slider-content-para edw-carousel-content-para m-0">First-of-its-kind, Edwiser RemUI Homepage Builder to design your dream homepage, in a Snap!</p></div><a href="#" class="btn btn-primary trynowbutton edw-carousel-trynow-btn">Try Now</a></div></div><div class="col-sm slider-sec-2"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign9/slideimages/classicimg1.png" alt="slider image 1"></div></div></div><div class="carousel-item edw-slider-item"><div class="row carousel-item-wrapper"><div class="col-sm slider-sec-1"><img class="header-slider-bg-image position-absolute" src="https://staticcdn.edwiser.org/demo/classic2/sliderbgpattern.png" alt="slider image pattern "><div class="slider-content-wrapper"><div class="slider-content"><div class="slider-content-heading edw-carousel-content-heading">Home Page builder that gives you design superpowers.</div><p class="slider-content-para edw-carousel-content-para m-0">First-of-its-kind, Edwiser RemUI Homepage Builder to design your dream homepage, in a Snap!</p></div><a href="#" class="btn btn-primary trynowbutton edw-carousel-trynow-btn">Try Now</a></div></div><div class="col-sm slider-sec-2"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign9/slideimages/classicimg3.png" alt="slider image 1"></div></div></div></div><a class="carousel-control-prev edw-control-prev edw-slide-control position-absolute" style="--arrowassetcolor:#3e86f5" href="#edw_slider_unqreplaceid_" role="button" data-target="#edw_slider_unqreplaceid_" data-bs-target="#edw_slider_unqreplaceid_" data-slide="prev" data-bs-slide="prev"><span class="fa fa-angle-left slider-nav-icons" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next edw-control-next edw-slide-control position-absolute" style="--arrowassetcolor:#3e86f5" href="#edw_slider_unqreplaceid_" role="button" data-target="#edw_slider_unqreplaceid_" data-bs-target="#edw_slider_unqreplaceid_" data-slide="next" data-bs-slide="next"><span class="fa fa-angle-right slider-nav-icons" aria-hidden="true"></span><span class="sr-only">Next</span></a><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></div></div></div>`;
        var slidercss9 = `.header-design-slider_unqreplaceid_ {--arrowassetcolor: #3e86f5;}.header-design-slider_unqreplaceid_ .html-section-body {background: #ffff;padding: 0px;}.header-design-slider_unqreplaceid_ .fa-angle-left:before {font-size: 30px;}.header-design-slider_unqreplaceid_ .fa-angle-right:before {font-size: 30px;}.header-design-slider_unqreplaceid_ .slider-content-heading {font-size: 45px;font-style: normal;font-weight: 700;line-height: 55px;letter-spacing: 0.9px;text-transform: capitalize;color: #313848;}.header-design-slider_unqreplaceid_ .slider-content-para {font-size: 18px;font-style: normal;font-weight: 400;line-height: 30px;letter-spacing: 0.36px;text-transform: capitalize;color: #4c5a73;}.header-design-slider_unqreplaceid_ .slider-content-wrapper {display: flex;flex-direction: column;gap: 45px;padding: 40px 0px;z-index: 1;}.header-design-slider_unqreplaceid_ .slider-content {display: flex;flex-direction: column;gap: 16px;}.header-design-slider_unqreplaceid_ .carousel-indicators {position: absolute !important;display: flex;}.header-design-slider_unqreplaceid_ .carousel-indicators [data-target="#edw_slider_unqreplaceid_"] {background: #d9d9d9;width: 8px;height: 8px;border-radius: 50%;border: unset;}.header-design-slider_unqreplaceid_ .carousel-indicators .active {background: var(--arrowassetcolor);}.header-design-slider_unqreplaceid_ .slider-sec-1 {padding: unset;display: flex;align-items: center;position: relative;padding-left: 10%;}.header-design-slider_unqreplaceid_ .slider-sec-2 {padding: unset;display: flex;align-items: center;}.header-design-slider_unqreplaceid_ .trynowbutton {width: fit-content;font-size: 18px;font-style: normal;font-weight: 400;line-height: 22px;}.header-design-slider_unqreplaceid_ .trynowbutton:hover {filter: brightness(90%);}.header-design-slider_unqreplaceid_ .header-slider-image {width: 100%;height: auto;}.header-design-slider_unqreplaceid_ .header-slider-bg-image {position: absolute;max-width: 388px;width: 100%;top: 0px;left: 0px;}.header-design-slider_unqreplaceid_ .carousel-control-prev {left: 3%;top: 50%;opacity: 1;color: var(--arrowassetcolor);position: absolute !important;height: 45px;width: 45px;transform: translate(0px, -50%);}.header-design-slider_unqreplaceid_ .carousel-control-prev:hover {filter: brightness(90%);}.header-design-slider_unqreplaceid_ .carousel-control-next {right: 3%;top: 50%;opacity: 1;color: var(--arrowassetcolor);position: absolute !important;height: 45px;width: 45px;transform: translate(0px, -50%);}.header-design-slider_unqreplaceid_ .carousel-control-next:hover {filter: brightness(90%);}@media (max-width: 768px) {.header-design-slider_unqreplaceid_ .carousel-control-prev {display: none;}.header-design-slider_unqreplaceid_ .carousel-control-next {display: none;}.header-design-slider_unqreplaceid_ .slider-sec-1 {padding: 0px;}.header-design-slider_unqreplaceid_ .carousel-item-wrapper {margin-left: unset;margin-right: unset;padding: 0px 24px;}.header-design-slider_unqreplaceid_ .slider-content-heading {font-weight: 700;font-size: 26px;line-height: 32px;}.header-design-slider_unqreplaceid_ .slider-content-para {font-weight: 400;font-size: 18px;line-height: 26px;}}@media (max-width: 576px) {.header-design-slider_unqreplaceid_ .html-section-body {padding: 24px 24px 45px 24px;}.header-design-slider_unqreplaceid_ .carousel-inner {padding-bottom: unset;}.header-design-slider_unqreplaceid_ .header-slider-bg-image {display: none;}.header-design-slider_unqreplaceid_ .slider-sec-1 {padding-left: unset;}.header-design-slider_unqreplaceid_ .slider-sec-2 {padding: 0px 15px;}.header-design-slider_unqreplaceid_ .carousel-item-wrapper {gap: 38px;padding: 0px;}.header-design-slider_unqreplaceid_ .slider-content-wrapper {align-items: center;padding: 0px;gap: 29px;}.header-design-slider_unqreplaceid_ .carousel-indicators {bottom: -48px;display: flex;}.header-design-slider_unqreplaceid_ .slider-content-heading {font-weight: 700;font-size: 35px;line-height: 44px;text-align: center;}.header-design-slider_unqreplaceid_ .slider-content-para {font-weight: 400;font-size: 20px;line-height: 30px;text-align: center;}.header-design-slider_unqreplaceid_ .slider-content {gap: 32px;}}.carousel-indicators li {list-style-type: none;}`;
        var sliderjs9 = ``;
        var appendnode9 = ` <div class="carousel-item edw-slider-item"> <div class="row carousel-item-wrapper"> <div class="col-sm slider-sec-1"> <img class="header-slider-bg-image position-absolute" src="https://staticcdn.edwiser.org/demo/classic2/sliderbgpattern.png" alt="slider image pattern "> <div class="slider-content-wrapper"> <div class="slider-content"> <div class="slider-content-heading edw-carousel-content-heading"> design your dream homepage, in a Snap! </div><p class="slider-content-para edw-carousel-content-para m-0">First-of-its-kind, Edwiser RemUI Homepage Builder to design your dream homepage, in a Snap!</p></div><a href="#" class="btn btn-primary trynowbutton edw-carousel-trynow-btn">Try Now</a> </div></div><div class="col-sm slider-sec-2 "> <img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign9/slideimages/classicimg2.png" alt="slider image 1"> </div></div></div>`;
        Vvveb.Components.extend("_base", "html/slider9", {
            name: "Slider with controls 3",
            attributes: ['data-ebpb-slider9'],
            image: "icons/slider9.svg",
            classes: ['edwiser-pb-slider9'],
            html: (() => {
                return `<div class="edwiser-pb-slider9" data-vvveb-disabled-area contenteditable="false">${sliderhtml9}<style>${slidercss9}</style></div>`;
            })(),
            beforeInit: function (node) {
                properties = [];
                var i = 0;
                var slideno = 0;
                var id = generateUniqueID();
                node.innerHTML = node.innerHTML.replaceAll("_unqreplaceid_", id);
                $(node).find(".carousel-item").each(function (e) {
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
                                Vvveb.Components.render("html/slider9");
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
                            name: SETTINGTITLES.BUTTONTEXT,
                            key: "sliderbuttontext" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
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
                            name: SETTINGTITLES.LINK,
                            key: "sliderlink" + i,
                            htmlAttr: "href",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },
                        {
                            name: SETTINGTITLES.BUTTONBACKGROUNDCOLOR,
                            key: "background-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-trynow-btn').css('background', value);
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.BUTTONBORDERCOLOR,
                            key: "border-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-trynow-btn').css('border-color', value);
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.BUTTONTEXTCOLOR,
                            key: "color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield",
                            child: `.edw-carousel-item-${i} .edw-carousel-trynow-btn`,
                            onChange: function (node, value, input) {
                                $(node).parent().find('.edw-carousel-trynow-btn').css('color', value);
                                return node;
                            }
                        },
                        {
                            name: SETTINGTITLES.IMAGE,
                            key: "sliderimage" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .header-slider-image`,
                            // onChange: function (node, value, input) {
                            //     $(node).parent().find(this.child).css("background-image", "url(" + value + ")");
                            //     return node;
                            // }
                        }

                    );
                });

                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
                }
                removeDuplicateIndicators(node, i);

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
                            name: SETTINGTITLES.ARROWSANDBULLETS,
                            key: "background-color",
                            inline: true,
                            htmlAttr: "style",
                            col: 12,
                            inputtype: ColorInput,
                            edwclasses: "edwcolorfield arrowassetcolor ignoreproperty",
                            child: `.edw-carousel-indicators .active`,
                            onChange: function (node, value, input) {

                                if(!$(node).closest('.edw-carousel').find('.edw-slide-control').hasClass('d-none')){
                                    $(node).closest('.edw-carousel').find('.edw-slide-control').css('--arrowassetcolor', value);
                                }

                                return node;
                            }
                        }
                    );
                }
                this.properties = properties.concat(this.properties);
                slideIntervalfielddisabler(node);
                slidearrowcolorsettingstatushandler($(node),arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHBULLETS);
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
                        $(node).parent().find('.carousel-inner').append(appendnode9);
                        Vvveb.Components.render("html/slider9");

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
                        slidearrowcolorsettingstatushandler(tempnode,arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHBULLETS);
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
                        var tempnode = $(node).closest('.edw-carousel')
                        slidearrowcolorsettingstatushandler(tempnode,arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFOWITHBULLETS);
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
                            $(node).parent().attr('data-bs-ride', 'carousel');
                            $(node).parent().attr('data-bs-interval', '3000');
                            slideintervalfield.find('input[name="slideinterval"]').val('3000');
                        } else {
                            $(node).parent().removeAttr('data-ride');
                            $(node).parent().attr('data-interval', '0');
                            $(node).parent().removeAttr('data-bs-ride');
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
                            $(node).parent().attr('data-pause', 'false');
                            $(node).parent().attr('data-bs-pause', 'false');
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
                    child: `.carousel`,
                    onChange: function (node, value, input) {

                        $(node).attr('data-interval', value);
                        $(node).attr('data-bs-interval', value);

                        return node;
                    }
                }
            ]
        });


        // Slider 11  --> vertical slider -1
        var sliderhtml11 = `<section class="vertical-slider-1 edw_slider_unqreplaceid_ edw_adv_slider" id="vertical-slider_unqreplaceid_"><div class="section-container wrapper"><div class="slider edw-carousel"><div class="slider-inner edw-slider-inner-container"><div class="slide edw-slider-item active"><div class="img-box"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign11/images/card-images/image-1.png" alt="image 1"></div><div class="slide-body ellipsis"><h3 class="card-heading edw-carousel-content-heading">2013</h3><div class="card-desc-wrapper"><p class="card-desc"><span class="card-content-head edw-card-content-head">Founding and Launch -</span><span class="edw-carousel-content-para">From humble beginnings to soaring heights, we founded and launched, creating an innovative impact in just 22 words. our vision became a reality</span></p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div><div class="slide edw-slider-item"><div class="img-box"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign11/images/card-images/image-2.png" alt="image 1"></div><div class="slide-body ellipsis"><h3 class="card-heading edw-carousel-content-heading">2018</h3><div class="card-desc-wrapper"><p class="card-desc"><span class="card-content-head edw-card-content-head">Recognized as Microsoft gold partner -</span><span class="edw-carousel-content-para">Trusted experts delivering exceptional solutions and services with unrivalled proficiency and industry recognition.</span></p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div><div class="slide edw-slider-item"><div class="img-box"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign11/images/card-images/image-1.png" alt="image 1"></div><div class="slide-body ellipsis"><h3 class="card-heading edw-carousel-content-heading">2019</h3><div class="card-desc-wrapper"><p class="card-desc"><span class="card-content-head edw-card-content-head">Recognized as Microsoft gold partner -</span><span class="edw-carousel-content-para">Trusted experts delivering exceptional solutions and services with unrivalled proficiency and industry recognition.</span></p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div><div class="slide edw-slider-item"><div class="img-box"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign11/images/card-images/image-1.png" alt="image 1"></div><div class="slide-body ellipsis"><h3 class="card-heading edw-carousel-content-heading">2020</h3><div class="card-desc-wrapper"><p class="card-desc"><span class="card-content-head edw-card-content-head">Recognized as Microsoft gold partner -</span><span class="edw-carousel-content-para">Trusted experts delivering exceptional solutions and services with unrivalled proficiency and industry recognition.</span></p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div><div class="slide edw-slider-item"><div class="img-box"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign11/images/card-images/image-1.png" alt="image 1"></div><div class="slide-body ellipsis"><h3 class="card-heading edw-carousel-content-heading">2021</h3><div class="card-desc-wrapper"><p class="card-desc"><span class="card-content-head edw-card-content-head">Recognized as Microsoft gold partner -</span><span class="edw-carousel-content-para">Trusted experts delivering exceptional solutions and services with unrivalled proficiency and industry recognition.</span></p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div><div class="slide edw-slider-item"><div class="img-box"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign11/images/card-images/image-1.png" alt="image 1"></div><div class="slide-body ellipsis"><h3 class="card-heading edw-carousel-content-heading">2022</h3><div class="card-desc-wrapper"><p class="card-desc"><span class="card-content-head edw-card-content-head">Recognized as Microsoft gold partner -</span><span class="edw-carousel-content-para">Trusted experts delivering exceptional solutions and services with unrivalled proficiency and industry recognition.</span></p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div></div><div class="action-wrapper"><button id="top" class="carousel-control-prev edw-control-prev edw-slide-control disabled" type="button"><i class="fa fa-light fa-arrow-up-long"></i></button><button id="bottom" class="carousel-control-next edw-control-next edw-slide-control" type="button"><i class="fa fa-light fa-arrow-down-long"></i></button></div></div></div></section>`;
        var slidercss11 = `.section-heading {color: #313848;text-align: center;margin: 0;}h2 {font-size: 40px;font-style: normal;font-weight: 400;line-height: normal;letter-spacing: -0.88px;}.desc-wrapper {margin: 0 auto;padding: 40px 24px 0;background-color: #eff3ff;}.desc {color: #4c5a73;text-align: center;font-size: 16px;font-weight: 400;line-height: normal;margin: 12px 0 0;}@media screen and (max-width: 767px) {.desc {font-size: 18px;}}.edw_slider_unqreplaceid_ {padding: 40px 24px 0;background-color: #eff3ff;}.edw_slider_unqreplaceid_ .section-container {max-width: 1320px;margin: 0 auto;}.edw_slider_unqreplaceid_ .wrapper {padding: 0 100px;}.edw_slider_unqreplaceid_ .slider {max-width: 872px;margin: 0 auto;position: relative;}.edw_slider_unqreplaceid_ .slider-inner {display: flex;flex-direction: column;gap: 40px;overflow: hidden;position: relative;min-height: 400px;}.edw_slider_unqreplaceid_ .slide {direction: ltr;display: grid;grid-template-columns: 40% 60%;grid-auto-flow: dense;opacity: 0.5;position: absolute !important;top: 120%;left: 0;width: 100%;height: fit-content;transition: top 0.4s ease-in;}.edw_slider_unqreplaceid_ .img-box {height: 261px;border-radius: 4px;overflow: hidden;}.edw_slider_unqreplaceid_ .img-box img {width: 100%;height: 100%;object-fit: cover;object-position: top center;}.edw_slider_unqreplaceid_ .slide-body {border-radius: 4px 50px 4px 4px;border: 1px solid #D5DDEA;background: #FFF;box-shadow: 0px 8px 22px 0px rgba(0, 0, 0, 0.1);padding: 30px;margin: auto 0 auto -66px;}.edw_slider_unqreplaceid_ .slide-body h3 {font-size: 30px;font-style: normal;font-weight: 600;line-height: 30px;}.edw_slider_unqreplaceid_ .card-heading {color: #313848;margin: 0 0 15px;}.edw_slider_unqreplaceid_ .card-desc {color: #4C5A73;font-size: 18px;font-style: normal;font-weight: 400;line-height: 30px;margin: 0;}.edw_slider_unqreplaceid_ .ellipsis .card-desc {overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;}.edw_slider_unqreplaceid_ .card-desc-wrapper {max-height: 250px;overflow-y: auto;}.edw_slider_unqreplaceid_ .readmore-btn, .edw_slider_unqreplaceid_ .readless-btn {display: none;text-decoration: none;color: #FF4F18;font-size: 14px;font-weight: 500;line-height: normal;margin-top: 15px;cursor: pointer;}.edw_slider_unqreplaceid_ .ellipsis-active.ellipsis .readmore-btn {display: block;}.edw_slider_unqreplaceid_ .ellipsis-active:not(.ellipsis) .readless-btn {display: block;}.edw_slider_unqreplaceid_ span.card-content-head {color: #313848;font-weight: 600;}.edw_slider_unqreplaceid_ .slide:nth-child(2n) {direction: rtl;}.edw_slider_unqreplaceid_ .slide:nth-child(2n) .slide-body {margin-left: 0;margin-right: -88px;direction: ltr;}.edw_slider_unqreplaceid_ .slide.active {opacity: 1;top: 0;z-index: 1;}.edw_slider_unqreplaceid_ .slide.active .card-heading {background: linear-gradient(270deg, #FF4F18 0%, #FA9816 130.28%);background-clip: text;-webkit-background-clip: text;-webkit-text-fill-color: transparent;}.edw_slider_unqreplaceid_ .slide.active .slide-body {border: 1px solid #FF4F18;}@keyframes toTop {from {top: 0;}to {top: -100%;}}@keyframes toBottom {from {top: -100%;}to {top: 0;}}.edw_slider_unqreplaceid_ .action-wrapper {display: flex;align-items: center;justify-content: center;margin: 0 auto;gap: 18px;flex-direction: column;position: absolute !important;top: 77px;right: -100px;}.edw_slider_unqreplaceid_ .carousel-control-prev, .edw_slider_unqreplaceid_ .carousel-control-next {position: static;width: 48px;height: 48px;border: 1px solid #FF4F18;color: #FF4F18;background-color: #FFF;font-size: 20px;border-radius: 50%;opacity: 1;transition: all 0.3s ease;margin: auto 0;display: flex;align-items: center;justify-content: center;}.edw_slider_unqreplaceid_ .carousel-control-prev:hover, .edw_slider_unqreplaceid_ .carousel-control-next:hover {background-color: #FF4F18;color: #fff;}.edw_slider_unqreplaceid_ .carousel-control-prev.disabled, .edw_slider_unqreplaceid_ .carousel-control-next.disabled {cursor: not-allowed;opacity: 0.6;pointer-events: none;border-color: #BABABA !important;background-color: #fff !important;color: #BABABA;}@media screen and (max-width: 1024px) {.edw_slider_unqreplaceid_ .section-container {max-width: 820px;}.edw_slider_unqreplaceid_ .wrapper {padding: 0;}.edw_slider_unqreplaceid_ .action-wrapper {display: none;}}@media screen and (max-width: 767px) {.edw_slider_unqreplaceid_ .section-container {max-width: 600px;}.edw_slider_unqreplaceid_ .slide {display: block;}.edw_slider_unqreplaceid_ .slide-body {position: relative;z-index: 1;margin: -40px 0 0 !important;}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .vertical-slider-1 .wrapper {padding: 0;}.edw-limitedwidth-block .vertical-slider-1 .slider {margin-right: 100px;}.edw-limitedwidth-block .vertical-slider-1 .action-wrapper {right: -100px;}}`;
        var sliderjs11 = `class VerticalSlider1_unqreplaceid_{constructor(){this.verticalSlider=document.querySelector(\"#vertical-slider_unqreplaceid_\"),this.carouselInner=this.verticalSlider.querySelector(\".slider-inner\"),this.topArrow=this.verticalSlider.querySelector(\".carousel-control-prev\"),this.bottomArrow=this.verticalSlider.querySelector(\".carousel-control-next\"),this.readmorebtns=this.verticalSlider.querySelectorAll(\".readmore-btn\"),this.readlessbtns=this.verticalSlider.querySelectorAll(\".readless-btn\"),this.isTouchStart=!1,this.startY=0,this.distance=0,this.scrollTop=this.scrollTop.bind(this),this.scrollBottom=this.scrollBottom.bind(this),this.initializeSlide=this.initializeSlide.bind(this),this.readmoreclicked=this.readmoreclicked.bind(this),this.readlessclicked=this.readlessclicked.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchStop=this.touchStop.bind(this),this.initializeEventListeners()}initializeEventListeners(){window.addEventListener(\"load\",()=>{this.initializeSlide(),this.handleEllipsis(),setTimeout(()=>this.initializeSlide(),100)}),window.addEventListener(\"resize\",()=>{this.initializeSlide(),this.handleEllipsis(),setTimeout(()=>this.initializeSlide(),100)}),this.topArrow.addEventListener(\"click\",this.scrollBottom),this.bottomArrow.addEventListener(\"click\",this.scrollTop),this.readmorebtns.forEach(t=>{t.addEventListener(\"click\",this.readmoreclicked)}),this.readlessbtns.forEach(t=>{t.addEventListener(\"click\",this.readlessclicked)}),this.carouselInner.addEventListener(\"touchstart\",this.touchStart),this.carouselInner.addEventListener(\"touchmove\",this.touchMove),this.carouselInner.addEventListener(\"touchend\",this.touchStop),this.carouselInner.addEventListener(\"touchmove\",t=>{t.preventDefault()}),this.handleEllipsis()}handleEllipsis(){this.carouselInner.querySelectorAll(\".slide-body\").forEach(function(t){var e=t.querySelector(\".card-desc\");t.classList.contains(\"ellipsis\")||t.classList.add(\"ellipsis\"),e.scrollHeight>e.clientHeight?t.classList.add(\"ellipsis-active\"):t.classList.remove(\"ellipsis-active\")})}handleNextSlide(){let t=this.verticalSlider.querySelector(\".slide.active\");this.verticalSlider.querySelector(\".slide.next\").style.top=t.offsetHeight+40+\"px\"}readmoreclicked(t){t.target.parentNode.classList.remove(\"ellipsis\"),this.handleNextSlide()}readlessclicked(t){t.target.parentNode.classList.add(\"ellipsis\"),this.handleNextSlide()}initializeSlide(){let t=this.verticalSlider.querySelector(\".slide.active\");window.innerWidth>1024?this.carouselInner.style.height=1.7*t.offsetHeight+\"px\":this.carouselInner.style.height=1.5*t.offsetHeight+\"px\";this.verticalSlider.querySelectorAll(\".slide.next\").forEach(t=>{t.classList.remove(\"next\"),t.style.top=\"\"});let e=t.nextElementSibling;e.classList.add(\"next\"),e.style.top=t.offsetHeight+40+\"px\"}scrollTop(){if(!this.bottomArrow.classList.contains(\"disabled\")){let t=this.verticalSlider.querySelector(\".slide.active\"),e=t.querySelector(\".slide-body\");console.log(e),e.classList.contains(\"ellipsis\")||e.classList.add(\"ellipsis\");let i=t.nextElementSibling;this.topArrow.classList.remove(\"disabled\"),i.classList.remove(\"next\"),i.style.top=\"\",t.classList.remove(\"active\"),i.classList.add(\"active\"),t.style.animation=\"toTop 0.4s ease-in forwards\";let s=i.nextElementSibling;s?(s.classList.add(\"next\"),s.style.top=t.offsetHeight+40+\"px\",s.style.top=i.offsetHeight+40+\"px\"):this.bottomArrow.classList.add(\"disabled\"),setTimeout(()=>{t.style.animation=\"\"},500)}}scrollBottom(){if(!this.topArrow.classList.contains(\"disabled\")){let t=this.verticalSlider.querySelector(\".slide.active\"),e=t.querySelector(\".slide-body\");console.log(e),e.classList.contains(\"ellipsis\")||e.classList.add(\"ellipsis\");let i=this.verticalSlider.querySelector(\".slide.next\"),s=t.previousElementSibling;this.bottomArrow.classList.remove(\"disabled\"),i&&(i.classList.remove(\"next\"),i.style.top=\"\"),t.classList.remove(\"active\"),t.classList.add(\"next\"),t.style.top=s.offsetHeight+40+\"px\",s.style.animation=\"toBottom 0.4s ease-in forwards\",s.classList.add(\"active\"),s.previousElementSibling||this.topArrow.classList.add(\"disabled\"),setTimeout(()=>{s&&(s.style.animation=\"\")},500)}}touchStart(t){this.isTouchStart=!0,this.startY=t.touches[0].clientY}touchMove(t){this.isTouchStart&&(this.distance=t.touches[0].clientY-this.startY)}touchStop(){this.isTouchStart=!1,this.distance>100?this.scrollBottom():this.distance<-100&&this.scrollTop()}}var verticalSlider1_unqreplaceid_=new VerticalSlider1_unqreplaceid_;`;
        var appendnode11 = `<div class="slide edw-slider-item"><div class="img-box"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign11/images/card-images/image-1.png" alt="image 1"></div><div class="slide-body ellipsis"><h3 class="card-heading edw-carousel-content-heading">2021</h3><div class="card-desc-wrapper"><p class="card-desc" ><span class="card-content-head edw-card-content-head">Recognized as Microsoft gold partner -</span><span class="edw-carousel-content-para">Trusted experts delivering exceptional solutions and services with unrivalled proficiency and industry recognition.</span></p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div>`;
        Vvveb.Components.extend("_base", "html/slider11", {
            name: "vertical-slider-1",
            attributes: ['data-ebpb-slider11'],
            image: "icons/slider11.png",
            classes: ['edwiser-pb-slider11'],
            html: (() => {
                return `<div class="edwiser-pb-slider11" data-vvveb-disabled-area contenteditable="false">${sliderhtml11}<style>${slidercss11}</style><script>${sliderjs11}</script></div>`;
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
                                if ($(node).hasClass('next')) {
                                    if ($(node).next().length > 0) {
                                        $(node).next().addClass('next');
                                        $(node).next().css('top', '301px');
                                    }
                                }
                                $(node).remove();
                                Vvveb.Components.render("html/slider11");
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
                        },
                        {
                            name: SETTINGTITLES.CONTENT,
                            key: "sliderdescription" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .card-desc`,
                            inputtype: TextareaInput,
                            edwclasses: "edwinputfield",
                            data: {
                                rows: 40,
                            }
                        },
                        {
                            name: SETTINGTITLES.IMAGE,
                            key: "sliderimage" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .header-slider-image`,
                        }

                    );
                });

                properties = removeDeleteButton(node, properties);
                hideNavigatorsOnSingleSlide(node)

                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active').removeClass('next').removeAttr('style');
                    if ($(node).find('.edw-slider-inner-container').children('.edw-slider-item').length >= 2) {
                        if ($(node).find('.edw-slider-item.next').length > 0) {
                            $(node).find('.edw-slider-item.next').removeAttr('style');
                            $(node).find('.edw-slider-item.next').removeClass('next');
                        }
                        $(node).find('.edw-slider-item.active').next().addClass('next');
                        $(node).find('.edw-slider-item.next').css('top', '301px');
                    }

                }

                // removeDuplicateIndicators(node, i);

                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("color") === -1;
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
                        // Render component properties again to include the new column inputs
                        if ($(node).find('.edw-slider-item.next').length == 0) {
                            $(node).parent().find('.edw-slider-inner-container').append($(appendnode11).addClass('next').css('top','301px'));
                        } else {
                            $(node).parent().find('.edw-slider-inner-container').append(appendnode11);
                        }
                        Vvveb.Components.render("html/slider11");

                        return node;
                    }
                },
            ]
        });

        // Slider 12  --> vertical slider -2
        var sliderhtml12 = `<section class="vertical-slider-2 edw_adv_slider edw-slider_unqreplaceid_" id="vertical-slider_unqreplaceid_"><div class="section-container wrapper"><div class="slider edw-carousel"><div class="slider-inner edw-slider-inner-container"><div class="slide edw-slider-item active"><div class="img-box"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign12/images/card-images/image-1.png" alt="image 1"></div><div class="slide-body ellipsis"><h3 class="card-heading edw-carousel-content-heading">2010</h3><div class="card-desc-wrapper"><p class="card-desc"><span class="card-content-head edw-card-content-head">Founding -</span><span class="edw-carousel-content-para">Empowering Innovations: A visionary company driving progress through ground breaking solutions and transformative technologies.</span></p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div><div class="slide edw-slider-item"><div class="img-box"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign12/images/card-images/image-2.png" alt="image 2"></div><div class="slide-body ellipsis"><h3 class="card-heading edw-carousel-content-heading">2014</h3><div class="card-desc-wrapper"><p class="card-desc"><span class="card-content-head edw-card-content-head">Recognized gold partner -</span><span class="edw-carousel-content-para">Trusted experts delivering exceptional solutions and services with unrivalled proficiency and industry recognition.</span></p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div><div class="slide edw-slider-item"><div class="img-box"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign12/images/card-images/image-1.png" alt="image 1"></div><div class="slide-body ellipsis"><h3 class="card-heading edw-carousel-content-heading">2019</h3><div class="card-desc-wrapper"><p class="card-desc"><span class="card-content-head edw-card-content-head">Recognized as Microsoft gold partner -</span><span class="edw-carousel-content-para">Trusted experts delivering exceptional solutions and services with unrivalled proficiency and industry recognition.</span></p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div><div class="slide edw-slider-item"><div class="img-box"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign12/images/card-images/image-1.png" alt="image 1"></div><div class="slide-body ellipsis"><h3 class="card-heading edw-carousel-content-heading">2020</h3><div class="card-desc-wrapper"><p class="card-desc"><span class="card-content-head edw-card-content-head">Recognized as Microsoft gold partner -</span><span class="edw-carousel-content-para">Trusted experts delivering exceptional solutions and services with unrivalled proficiency and industry recognition.</span></p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div></div><div class="action-wrapper"><button id="top" class="carousel-control-prev edw-control-prev edw-slide-control disabled" type="button"><i class="fa fa-light fa-arrow-up-long"></i></button><button id="bottom" class="carousel-control-next edw-control-next edw-slide-control" type="button"><i class="fa fa-light fa-arrow-down-long"></i></button></div></div></div></section>`;
        var slidercss12 = `.section-heading {color: #313848;text-align: center;margin: 0;}h2 {font-size: 35px;font-style: normal;font-weight: 700;line-height: normal;letter-spacing: -0.77px;}.desc-wrapper {margin: 0 auto;padding: 40px 24px 0;margin: 0 auto;}.desc {color: #4c5a73;text-align: center;font-size: 16px;font-style: normal;font-weight: 400;line-height: normal;margin: 12px 0 0;}@media screen and (max-width: 767px) {.desc {font-size: 18px;}}.edw-slider_unqreplaceid_ {padding: 50px 24px 0;background-image: linear-gradient(180deg, #FFF 0%, #D8E9FF 100%);}.edw-slider_unqreplaceid_ .section-container {max-width: 1320px;margin: 0 auto;}.edw-slider_unqreplaceid_ .wrapper {padding: 0 100px;}.edw-slider_unqreplaceid_ .slider {max-width: 872px;margin: 0 auto;position: relative;}.edw-slider_unqreplaceid_ .slider-inner {display: flex;flex-direction: column;gap: 40px;overflow: hidden;position: relative;min-height: 400px;}.edw-slider_unqreplaceid_ .slide {direction: ltr;display: grid;grid-template-columns: 40% 60%;grid-auto-flow: dense;opacity: 0.5;position: absolute !important;top: 120%;left: 0;width: 100%;height: fit-content;transition: top 0.4s ease-in;}.edw-slider_unqreplaceid_ .img-box {height: 271px;border-radius: 4px;overflow: hidden;}.edw-slider_unqreplaceid_ .img-box img {width: 100%;height: 100%;object-fit: cover;object-position: top center;}.edw-slider_unqreplaceid_ .slide-body {border-radius: 4px;border: 1px solid #D5DDEA;background: #FFF;box-shadow: 0px 8px 22px 0px rgba(0, 0, 0, 0.1);padding: 30px;margin: auto 0 auto -66px;}.edw-slider_unqreplaceid_ .slide-body h3 {font-size: 30px;font-style: normal;font-weight: 600;line-height: 30px;}.edw-slider_unqreplaceid_ .card-heading {color: #F90;margin: 0 0 15px;}.edw-slider_unqreplaceid_ .card-desc {color: #4C5A73;font-size: 18px;font-style: normal;font-weight: 400;line-height: 30px;margin: 0;}.edw-slider_unqreplaceid_ .ellipsis .card-desc {overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;}.edw-slider_unqreplaceid_ .card-desc-wrapper {max-height: 250px;overflow-y: auto;}.edw-slider_unqreplaceid_ .readmore-btn, .edw-slider_unqreplaceid_ .readless-btn {display: none;text-decoration: none;color: #3E86F5;font-size: 14px;font-weight: 500;line-height: normal;margin-top: 15px;cursor: pointer;}.edw-slider_unqreplaceid_ .ellipsis-active.ellipsis .readmore-btn {display: block;}.edw-slider_unqreplaceid_ .ellipsis-active:not(.ellipsis) .readless-btn {display: block;}.edw-slider_unqreplaceid_ span.card-content-head {color: #313848;font-weight: 600;}.edw-slider_unqreplaceid_ .slide:nth-child(2n) {direction: rtl;}.edw-slider_unqreplaceid_ .slide:nth-child(2n) .slide-body {margin-left: 0;margin-right: -88px;direction: ltr;}.edw-slider_unqreplaceid_ .slide.active {opacity: 1;top: 0;z-index: 1;}.edw-slider_unqreplaceid_ .slide.active .card-heading {color: #3E86F5;}.edw-slider_unqreplaceid_ .slide.active .slide-body {border: 1px solid #3E86F5;}@keyframes toTop {from {top: 0;}to {top: -100%;}}@keyframes toBottom {from {top: -100%;}to {top: 0;}}.edw-slider_unqreplaceid_ .action-wrapper {display: flex;align-items: center;justify-content: center;margin: 0 auto;gap: 18px;flex-direction: column;position: absolute !important;top: 77px;right: -100px;}.edw-slider_unqreplaceid_ .carousel-control-prev, .edw-slider_unqreplaceid_ .carousel-control-next {position: static;width: 48px;height: 48px;border: 1px solid #3E86F5;color: #3E86F5;background: #FFF;font-size: 20px;border-radius: 50%;opacity: 1;transition: all 0.3s ease;margin: auto 0;display: flex;align-items: center;justify-content: center;}.edw-slider_unqreplaceid_ .carousel-control-prev:hover, .edw-slider_unqreplaceid_ .carousel-control-next:hover {background-color: #3E86F5;color: #fff;}.edw-slider_unqreplaceid_ .carousel-control-prev.disabled, .edw-slider_unqreplaceid_ .carousel-control-next.disabled {cursor: not-allowed;opacity: 0.6;pointer-events: none;border-color: #BABABA !important;background-color: #fff !important;color: #BABABA;}@media screen and (max-width: 1024px) {.edw-slider_unqreplaceid_ .section-container {max-width: 820px;}.edw-slider_unqreplaceid_ .wrapper {padding: 0;}.edw-slider_unqreplaceid_ .action-wrapper {display: none;}}@media screen and (max-width: 767px) {.edw-slider_unqreplaceid_ .section-container {max-width: 600px;}.edw-slider_unqreplaceid_ .slide {display: block;}.edw-slider_unqreplaceid_ .slide-body {position: relative;z-index: 1;margin: -40px 0 0 !important;}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .vertical-slider-2 .wrapper {padding: 0;}.edw-limitedwidth-block .vertical-slider-2 .slider {margin-right: 100px;}.edw-limitedwidth-block .vertical-slider-2 .action-wrapper {right: -100px;}}`;
        var sliderjs12 = `class VerticalSlider1_unqreplaceid_{constructor(){this.verticalSlider=document.querySelector("#vertical-slider_unqreplaceid_"),this.carouselInner=this.verticalSlider.querySelector(".slider-inner"),this.topArrow=this.verticalSlider.querySelector(".carousel-control-prev"),this.bottomArrow=this.verticalSlider.querySelector(".carousel-control-next"),this.readmorebtns=this.verticalSlider.querySelectorAll(".readmore-btn"),this.readlessbtns=this.verticalSlider.querySelectorAll(".readless-btn"),this.isTouchStart=!1,this.startY=0,this.distance=0,this.scrollTop=this.scrollTop.bind(this),this.scrollBottom=this.scrollBottom.bind(this),this.initializeSlide=this.initializeSlide.bind(this),this.readmoreclicked=this.readmoreclicked.bind(this),this.readlessclicked=this.readlessclicked.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchStop=this.touchStop.bind(this),this.initializeEventListeners()}initializeEventListeners(){window.addEventListener("load",()=>{this.initializeSlide(),this.handleEllipsis(),setTimeout(()=>this.initializeSlide(),100)}),window.addEventListener("resize",()=>{this.initializeSlide(),this.handleEllipsis(),setTimeout(()=>this.initializeSlide(),100)}),this.topArrow.addEventListener("click",this.scrollBottom),this.bottomArrow.addEventListener("click",this.scrollTop),this.readmorebtns.forEach(t=>{t.addEventListener("click",this.readmoreclicked)}),this.readlessbtns.forEach(t=>{t.addEventListener("click",this.readlessclicked)}),this.carouselInner.addEventListener("touchstart",this.touchStart),this.carouselInner.addEventListener("touchmove",this.touchMove),this.carouselInner.addEventListener("touchend",this.touchStop),this.carouselInner.addEventListener("touchmove",t=>{t.preventDefault()})}handleEllipsis(){this.carouselInner.querySelectorAll(".slide-body").forEach(function(t){var e=t.querySelector(".card-desc");t.classList.contains("ellipsis")||t.classList.add("ellipsis"),e.scrollHeight>e.clientHeight?t.classList.add("ellipsis-active"):t.classList.remove("ellipsis-active")})}handleNextSlide(){let t=this.verticalSlider.querySelector(".slide.active");this.verticalSlider.querySelector(".slide.next").style.top=t.offsetHeight+40+"px"}readmoreclicked(t){t.target.parentNode.classList.remove("ellipsis"),this.handleNextSlide()}readlessclicked(t){t.target.parentNode.classList.add("ellipsis"),this.handleNextSlide()}initializeSlide(){let t=this.verticalSlider.querySelector(".slide.active");window.innerWidth>1024?this.carouselInner.style.height=1.7*t.offsetHeight+"px":this.carouselInner.style.height=1.5*t.offsetHeight+"px";this.verticalSlider.querySelectorAll(".slide.next").forEach(t=>{t.classList.remove("next"),t.style.top=""});let e=t.nextElementSibling;e.classList.add("next"),e.style.top=t.offsetHeight+40+"px"}scrollTop(){if(!this.bottomArrow.classList.contains("disabled")){let t=this.verticalSlider.querySelector(".slide.active"),e=t.querySelector(".slide-body");console.log(e),e.classList.contains("ellipsis")||e.classList.add("ellipsis");let i=t.nextElementSibling;this.topArrow.classList.remove("disabled"),i.classList.remove("next"),i.style.top="",t.classList.remove("active"),i.classList.add("active"),t.style.animation="toTop 0.4s ease-in forwards";let s=i.nextElementSibling;s?(s.classList.add("next"),s.style.top=t.offsetHeight+40+"px",s.style.top=i.offsetHeight+40+"px"):this.bottomArrow.classList.add("disabled"),setTimeout(()=>{t.style.animation=""},500)}}scrollBottom(){if(!this.topArrow.classList.contains("disabled")){let t=this.verticalSlider.querySelector(".slide.active"),e=t.querySelector(".slide-body");console.log(e),e.classList.contains("ellipsis")||e.classList.add("ellipsis");let i=this.verticalSlider.querySelector(".slide.next"),s=t.previousElementSibling;this.bottomArrow.classList.remove("disabled"),i&&(i.classList.remove("next"),i.style.top=""),t.classList.remove("active"),t.classList.add("next"),t.style.top=s.offsetHeight+40+"px",s.style.animation="toBottom 0.4s ease-in forwards",s.classList.add("active"),s.previousElementSibling||this.topArrow.classList.add("disabled"),setTimeout(()=>{s&&(s.style.animation="")},500)}}touchStart(t){this.isTouchStart=!0,this.startY=t.touches[0].clientY}touchMove(t){this.isTouchStart&&(this.distance=t.touches[0].clientY-this.startY)}touchStop(){this.isTouchStart=!1,this.distance>100?this.scrollBottom():this.distance<-100&&this.scrollTop()}}let verticalSlider1_unqreplaceid_=new VerticalSlider1_unqreplaceid_;`;
        var appendnode12 = `<div class="slide edw-slider-item"><div class="img-box"><img class="header-slider-image" src="${Vvveb.serverurl}/CDN/slidernewdesign12/images/card-images/image-1.png" alt="image 1"></div><div class="slide-body ellipsis"><h3 class="card-heading edw-carousel-content-heading">2021</h3><div class="card-desc-wrapper"><p class="card-desc" ><span class="card-content-head edw-card-content-head">Recognized as Microsoft gold partner -</span><span class="edw-carousel-content-para">Trusted experts delivering exceptional solutions and services with unrivalled proficiency and industry recognition.</span></p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div>`;
        Vvveb.Components.extend("_base", "html/slider12", {
            name: "vertical-slider-2",
            attributes: ['data-ebpb-slider12'],
            image: "icons/slider12.png",
            classes: ['edwiser-pb-slider12'],
            html: (() => {
                return `<div class="edwiser-pb-slider12" data-vvveb-disabled-area contenteditable="false">${sliderhtml12}<style>${slidercss12}</style><script>${sliderjs12}</script></div>`;
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
                                if ($(node).hasClass('next')) {
                                    if ($(node).next().length > 0) {
                                        $(node).next().addClass('next');
                                        $(node).next().css('top', '301px');
                                    }
                                }
                                $(node).remove();
                                Vvveb.Components.render("html/slider12");
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
                            name: SETTINGTITLES.CONTENT,
                            key: "sliderdescription" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .card-desc`,
                            inputtype: TextareaInput,
                            edwclasses: "edwinputfield",
                            data: {
                                rows: 40,
                            }
                        },
                        {
                            name: SETTINGTITLES.IMAGE,
                            key: "sliderimage" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .header-slider-image`,
                        }

                    );
                });

                properties = removeDeleteButton(node, properties);
                hideNavigatorsOnSingleSlide(node)

                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active').removeClass('next').removeAttr('style');
                    if ($(node).find('.edw-slider-inner-container').children('.edw-slider-item').length >= 2) {
                        if ($(node).find('.edw-slider-item.next').length > 0) {
                            $(node).find('.edw-slider-item.next').removeAttr('style');
                            $(node).find('.edw-slider-item.next').removeClass('next');
                        }
                        $(node).find('.edw-slider-item.active').next().addClass('next');
                        $(node).find('.edw-slider-item.next').css('top', '301px');
                    }

                }

                // removeDuplicateIndicators(node, i);

                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("color") === -1;
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
                        // Render component properties again to include the new column inputs
                        if ($(node).find('.edw-slider-item.next').length == 0) {
                            $(node).parent().find('.edw-slider-inner-container').append($(appendnode12).addClass('next').css('top','301px'));
                        } else {
                            $(node).parent().find('.edw-slider-inner-container').append(appendnode12);
                        }
                        Vvveb.Components.render("html/slider12");

                        return node;
                    }
                },
            ]
        });

        // Slider 13  --> vertical slider 3
        var sliderhtml13 = `<section class="section-vertical-slider-3 edw_adv_slider edw-slider_unqreplaceid_"><div class="section-container"><div class="carousel edw-carousel" data-ride="carousel" data-interval="3000" data-pause="hover"><div class="slider edw-slider-inner-container"><div class="slide edw-slider-item" data-value="0"><div class="vertical-card"><img src="${Vvveb.serverurl}/CDN/slidernewdesign13/images/logos/logo1.png" class="logo" alt=""><div class="card-context ellipsis"><p class="card-heading">French</p><div class="card-desc-wrapper"><p class="card-desc">French, an influential and romantic language, captures hearts worldwide with its cultural richness and timeless charm. It serves as a linguistic beacon, resonating with a global audience, and stands as a symbol of sophistication and cultural diversity.French, an influential and romantic language, captures hearts worldwide with its cultural richness and timeless charm. It serves as a linguistic beacon, resonating with a global audience, and stands as a symbol of sophistication and cultural diversity.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div></div><div class="slide edw-slider-item active" data-value="1"><div class="vertical-card"><img src="${Vvveb.serverurl}/CDN/slidernewdesign13/images/logos/logo2.png" class="logo" alt=""><div class="card-context ellipsis"><p class="card-heading">Arabic</p><div class="card-desc-wrapper"><p class="card-desc">Arabic widely spoken in the Arab world, known for its rich linguistic cultural significance.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div></div><div class="slide edw-slider-item" data-value="2"><div class="vertical-card"><img src="${Vvveb.serverurl}/CDN/slidernewdesign13/images/logos/logo3.png" class="logo" alt=""><div class="card-context ellipsis"><p class="card-heading">German</p><div class="card-desc-wrapper"><p class="card-desc">Embrace language proficiency with our dynamic courses and experienced instructors. Embrace language proficiency with our dynamic courses and experienced instructors. Embrace language proficiency with our dynamic courses and experienced instructors.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div></div><div class="slide edw-slider-item" data-value="3"><div class="vertical-card"><img src="${Vvveb.serverurl}/CDN/slidernewdesign13/images/logos/logo2.png" class="logo" alt=""><div class="card-context ellipsis"><p class="card-heading">Arabic</p><div class="card-desc-wrapper"><p class="card-desc">Arabic widely spoken in the Arab world, known for its rich linguistic cultural significance. Arabic widely spoken in the Arab world, known for its rich linguistic cultural significance. Arabic widely spoken in the Arab world, known for its rich linguistic cultural significance</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div></div><div class="slide edw-slider-item" data-value="4"><div class="vertical-card"><img src="${Vvveb.serverurl}/CDN/slidernewdesign13/images/logos/logo3.png" class="logo" alt=""><div class="card-context ellipsis"><p class="card-heading">German</p><div class="card-desc-wrapper"><p class="card-desc">Embrace language proficiency with our dynamic courses and experienced instructors. Embrace language proficiency with our dynamic courses and experienced instructors. Embrace language proficiency with our dynamic courses and experienced instructors.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div></div></div><div class="slider-arrow"><button class="left edw-control-prev edw-slide-control"><i class="fa fa-sharp fa-light fa-angle-up"></i></button><button class="right edw-control-next edw-slide-control"><i class="fa fa-sharp fa-light fa-angle-down"></i></button></div></div></div></section>`;
        var slidercss13 = ` .edw-slider_unqreplaceid_ {padding: 40px 24px;background-color: #07141F;direction: ltr;}.edw-slider_unqreplaceid_ p {margin: 0;}.edw-slider_unqreplaceid_ .section-container {max-width: 1440px;margin: 0 auto;}.edw-slider_unqreplaceid_ .carousel {display: flex;align-items: center;gap: 24px;}.edw-slider_unqreplaceid_ .slider {width: calc(100% - 74px);height: 420px;position: relative;overflow: hidden;transition: height 0.3s ease-in;}.edw-slider_unqreplaceid_ .slider .slide {width: calc(100% - 82px);position: absolute;left: 82px;top: -100%;transition: left 0.5s ease-in, top 0.5s ease-in, height 0.5s ease-in;}.edw-slider_unqreplaceid_ .slider .slide .vertical-card {position: relative;height: fit-content;overflow: hidden;padding: 20px 10px 20px 20px;display: flex;align-items: center;gap: 24px;background-image: linear-gradient(90deg, #23303C 0%, #23303C 100%);border-radius: 6px;}.edw-slider_unqreplaceid_ .slider .slide .vertical-card .logo {width: 67px;height: 67px;border: 1px solid #52E279;border-radius: 100%;object-fit: cover;}.edw-slider_unqreplaceid_ .slider .slide .vertical-card .card-context {display: flex;flex-direction: column;gap: 12px;}.edw-slider_unqreplaceid_ .slider .slide .vertical-card .card-context .card-heading {color: #FFF;font-size: 18px;font-style: normal;font-weight: 700;line-height: normal;margin: 0;}.edw-slider_unqreplaceid_ .slider .slide .vertical-card .card-context .card-desc {color: #9BCAC3;font-size: 14px;font-style: normal;font-weight: 400;line-height: normal;margin: 0;}.edw-slider_unqreplaceid_ .slider .slide .vertical-card > * {position: relative;z-index: 1;}.edw-slider_unqreplaceid_ .slider .slide .vertical-card .card-desc-wrapper {max-height: 120px;overflow-y: auto;scrollbar-color: #d5ddea transparent;padding-right: 10px;}.edw-slider_unqreplaceid_ .slider .slide .vertical-card .readmore-btn, .edw-slider_unqreplaceid_ .slider .slide .vertical-card .readless-btn {display: none;text-decoration: none;color: #5CFF85;font-size: 14px;font-weight: 500;line-height: normal;margin-left: auto;cursor: pointer;}.edw-slider_unqreplaceid_ .slider .slide.next {top: calc(75% + 24px);}.edw-slider_unqreplaceid_ .slider .slide.prev {top: 0;}.edw-slider_unqreplaceid_ .slider .slide:not(.active) .vertical-card {opacity: 0.4;}.edw-slider_unqreplaceid_ .slider .slide:not(.active) .vertical-card .card-desc {overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}.edw-slider_unqreplaceid_ .slider .slide.active {left: 0;top: calc(25% + 12px);z-index: 2;width: calc(100% - 62px);}.edw-slider_unqreplaceid_ .slider .slide.active .vertical-card {background-image: linear-gradient(90deg, #006455 0%, #07141F 100%);padding: 20px;opacity: 1;}.edw-slider_unqreplaceid_ .slider .slide.active .vertical-card .logo {width: 80px;height: 80px;}.edw-slider_unqreplaceid_ .slider .slide.active .vertical-card .card-context .card-desc {color: #FFF;line-height: 22px;}.edw-slider_unqreplaceid_ .slider .slide.active .vertical-card .card-desc {text-overflow: initial;}.edw-slider_unqreplaceid_ .slider .slide.active .vertical-card .ellipsis .card-desc {overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;}.edw-slider_unqreplaceid_ .slider .slide.active .vertical-card .ellipsis-active.ellipsis .readmore-btn {display: block;}.edw-slider_unqreplaceid_ .slider .slide.active .vertical-card .ellipsis-active:not(.ellipsis) .readless-btn {display: block;}.edw-slider_unqreplaceid_ .slider .slide.active .vertical-card:before {content: \"\";position: absolute;top: 0;right: 0;z-index: 0;background-image: url(\"${Vvveb.serverurl}/CDN/slidernewdesign13/images/pattern.png\");height: 90%;width: 100%;background-size: contain;background-repeat: no-repeat;background-position: top right;}@keyframes toRightForNext {from {top: 75%;}to {top: 104%;}}@keyframes toLeftForNextSibling {from {top: 104%;}to {top: 75%;}}.edw-slider_unqreplaceid_ .slider-arrow {display: flex;flex-direction: column;gap: 24px;width: 50px;height: 124px;}.edw-slider_unqreplaceid_ .slider-arrow .left, .edw-slider_unqreplaceid_ .slider-arrow .right {width: 50px;height: 50px;border: 1px solid #5CFF85;border-radius: 100%;background-color: #0B1926;color: #5CFF85;cursor: pointer;font-size: 20px;display: flex;justify-content: center;align-items: center;}.edw-slider_unqreplaceid_ .slider-arrow .left:hover, .edw-slider_unqreplaceid_ .slider-arrow .right:hover {border-color: #5CFF85;background-color: #5CFF85;color: #0B1926;}@media screen and (max-width: 767px) {.edw-slider_unqreplaceid_ .section-container {max-width: 600px;}.edw-slider_unqreplaceid_ .carousel {display: flex;flex-direction: column;align-items: center;gap: 24px;}.edw-slider_unqreplaceid_ .slider {width: 100%;}.edw-slider_unqreplaceid_ .slider .slide {left: -104%;}.edw-slider_unqreplaceid_ .slider .slide .vertical-card {flex-direction: column;align-items: unset;}.edw-slider_unqreplaceid_ .slider .slide .vertical-card .card-context .card-desc {font-size: 16px;}.edw-slider_unqreplaceid_ .slider .slide:not(.active) .vertical-card .card-desc {overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;}.edw-slider_unqreplaceid_ .slider .slide.prev {left: -104%;top: unset;}.edw-slider_unqreplaceid_ .slider .slide.next {left: 104%;top: unset;}.edw-slider_unqreplaceid_ .slider .slide.active {left: 0;top: unset;width: 100%;}@keyframes toRightForNext {from {left: 104%;}to {left: 104%;}}@keyframes toLeftForNextSibling {from {top: 104%;}to {top: 104%;}}.edw-slider_unqreplaceid_ .slider-arrow {width: 124px;height: 50px;flex-direction: row;justify-content: space-between;}.edw-slider_unqreplaceid_ .slider-arrow .left, .edw-slider_unqreplaceid_ .slider-arrow .right {transform: rotate(-90deg);}}`;
        var sliderjs13 = `class TestimonialDesign_unqreplaceid_{constructor(){this.verticalSlider=document.querySelector(".edw-slider_unqreplaceid_"),this.leftArrow=this.verticalSlider.querySelector(".slider-arrow .left"),this.rightArrow=this.verticalSlider.querySelector(".slider-arrow .right"),this.carousel=this.verticalSlider.querySelector(".carousel"),this.slider=this.verticalSlider.querySelector(".slider"),this.readmorebtns=this.verticalSlider.querySelectorAll(".readmore-btn"),this.readlessbtns=this.verticalSlider.querySelectorAll(".readless-btn"),this.resizeTimer,this.initialExecution=!0,this.isTouchStart=!1,this.startX=0,this.startY=0,this.distanceX=0,this.distanceY=0,this.touchTimeout=null,this.isHover=!1,this.leftClick=this.leftClick.bind(this),this.rightClick=this.rightClick.bind(this),this.readmoreclicked=this.readmoreclicked.bind(this),this.readlessclicked=this.readlessclicked.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchStop=this.touchStop.bind(this),this.hoverStart=this.hoverStart.bind(this),this.hoverEnd=this.hoverEnd.bind(this),this.initializeEventListeners(),window.addEventListener("load",()=>{this.initializeSlide(),this.handleSlidePosition()})}initializeEventListeners(){window.addEventListener("resize",()=>{this.initializeSlide()}),this.leftArrow.addEventListener("click",this.leftClick),this.rightArrow.addEventListener("click",this.rightClick),this.readmorebtns.forEach(e=>{e.addEventListener("click",this.readmoreclicked)}),this.readlessbtns.forEach(e=>{e.addEventListener("click",this.readlessclicked)}),this.carousel.addEventListener("touchstart",this.touchStart),this.carousel.addEventListener("touchmove",this.touchMove),this.carousel.addEventListener("touchend",this.touchStop),this.carousel.addEventListener("mouseenter",this.hoverStart),this.carousel.addEventListener("mouseleave",this.hoverEnd)}initializeSlide(e="",i=""){let t;if(e){t=e;let s=this.verticalSlider.querySelector(".slider .slide.active"),l=this.verticalSlider.querySelector(".slider .slide.prev"),r=this.verticalSlider.querySelector(".slider .slide.next");"left"===i&&r&&(r.style.animation="toRightForNext 0.5s ease-in forwards"),s.classList.remove("active"),r&&r.classList.remove("next"),l&&l.classList.remove("prev");let h=t.nextElementSibling,d=t.previousElementSibling;h||(h=this.verticalSlider.querySelector(".slider .slide:first-child")),d||(d=this.verticalSlider.querySelector(".slider .slide:last-child")),t.classList.add("active"),d.classList.add("prev"),h!==d&&h.classList.add("next"),"right"===i&&(h.style.animation="toLeftForNextSibling 0.5s ease-in forwards"),setTimeout(()=>{r&&(r.style.animation=""),h.style.animation=""},500)}else{t=this.verticalSlider.querySelector(".slider .slide.active");let c=this.verticalSlider.querySelector(".slider .slide.prev"),a=this.verticalSlider.querySelector(".slider .slide.next");c&&c.classList.remove("prev"),a&&a.classList.remove("prev");let o=t.nextElementSibling,n=t.previousElementSibling;o||(o=this.verticalSlider.querySelector(".slider .slide:first-child")),n||(n=this.verticalSlider.querySelector(".slider .slide:last-child")),n.classList.add("prev"),o!==n&&o.classList.add("next")}this.handleEllipsis(t),this.handleSlidePosition()}handleSlidePosition(){this.verticalSlider.querySelectorAll(".slider .slide").forEach(e=>{e.style.top=""});let e=this.verticalSlider.querySelector(".slider .slide.active"),i=e.nextElementSibling,t=e.previousElementSibling;if(i||(i=this.verticalSlider.querySelector(".slider .slide:first-child")),t||(t=this.verticalSlider.querySelector(".slider .slide:last-child")),window.innerWidth<768)this.slider.style.height=e.offsetHeight+"px";else{let s=this.verticalSlider.querySelector(".slider .slide.prev"),l=this.verticalSlider.querySelector(".slider .slide.next");s||(s=t),l||(l=i),l&&(l.style.top=s.offsetHeight+e.offsetHeight+24+"px"),s.style.top="0px",e.style.top=s.offsetHeight+12+"px",this.slider.style.height=s.offsetHeight+e.offsetHeight+l.offsetHeight+24+"px"}}leftClick(){let e=this.verticalSlider.querySelector(".slider .slide.active").previousElementSibling;e||(e=this.verticalSlider.querySelector(".slider .slide:last-child")),this.initializeSlide(e,"left")}rightClick(){let e=this.verticalSlider.querySelector(".slider .slide.active").nextElementSibling;e||(e=this.verticalSlider.querySelector(".slider .slide:first-child")),this.initializeSlide(e,"right")}handleEllipsis(e=""){e||(e=this.verticalSlider.querySelector(".slider .slide.active"));let i=e.querySelector(".card-context");var t=i.querySelector(".card-desc");i.classList.contains("ellipsis")||i.classList.add("ellipsis"),t.scrollHeight>t.clientHeight?i.classList.add("ellipsis-active"):i.classList.remove("ellipsis-active")}handleSlidePositionAfterExpnand(){let e=this.verticalSlider.querySelector(".slider .slide.active");if(window.innerWidth<768)this.slider.style.height=e.offsetHeight+"px";else{let i=this.verticalSlider.querySelector(".slider .slide.prev"),t=this.verticalSlider.querySelector(".slider .slide.next");t&&(t.style.top=i.offsetHeight+e.offsetHeight+24+"px"),t&&(t.style.transition="unset"),this.slider.style.height=i.offsetHeight+e.offsetHeight+t.offsetHeight+24+"px",setTimeout(()=>{t&&(t.style.transition="")},500)}}readmoreclicked(e){e.target.parentNode.classList.remove("ellipsis"),this.handleSlidePositionAfterExpnand()}readlessclicked(e){e.target.parentNode.classList.add("ellipsis"),this.handleSlidePositionAfterExpnand()}hoverStart(){this.isHover=!0}hoverEnd(){this.isHover=!1}autoSlide(){let e=this.carousel.getAttribute("data-interval")||3e3,i="hover"===this.carousel.getAttribute("data-pause");"carousel"===this.carousel.getAttribute("data-ride")&&setInterval(()=>{i&&this.isHover||this.rightClick()},e)}touchStart(e){this.isHover=!0,this.isTouchStart=!0,this.startX=e.touches[0].clientX,this.startY=e.touches[0].clientY}touchMove(e){this.isHover=!0,this.isTouchStart&&(this.distanceX=e.touches[0].clientX-this.startX,this.distanceY=e.touches[0].clientY-this.startY)}touchStop(){clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>{this.isHover=!1},1e4);let e;(e=window.innerWidth<768?this.distanceX:this.distanceY)>100?this.leftClick():e<-100&&this.rightClick(),this.isTouchStart=!1,this.startX=0,this.startY=0,this.distanceX=0,this.distanceY=0,this.touchTimeout=null}}const testimonialDesign_unqreplaceid_=new TestimonialDesign_unqreplaceid_;`;
        var appendnode13 = `<div class="slide edw-slider-item" data-value="2"><div class="vertical-card"><img src="${Vvveb.serverurl}/CDN/slidernewdesign13/images/logos/logo3.png" class="logo" alt=""><div class="card-context ellipsis"><p class="card-heading">German</p><div class="card-desc-wrapper"><p class="card-desc">Embrace language proficiency with our dynamic courses and experienced instructors. Embrace language proficiency with our dynamic courses and experienced instructors. Embrace language proficiency with our dynamic courses and experienced instructors.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a></div></div></div>`;
        Vvveb.Components.extend("_base", "html/slider13", {
            name: "vertical-slider-3",
            attributes: ['data-ebpb-slider13'],
            image: "icons/slider13.svg",
            classes: ['edwiser-pb-slider13'],
            html: (() => {
                return `<div  class="edwiser-pb-slider13" data-vvveb-disabled-area contenteditable="false">${sliderhtml13}<style>${slidercss13}</style><script>${sliderjs13}</script></div>`;
            })(),
            beforeInit: function (node) {
                properties = [];
                var i = 0;
                var slideno = 0;
                var id = generateUniqueID();
                node.innerHTML = node.innerHTML.replaceAll("_unqreplaceid_", id);
                $(node).find(".edw-slider-item").each(function (e) {
                    i = generateUniqueID();

                    $(this).attr("data-value", slideno);

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
                                // if ($(node).hasClass('next')) {
                                //     if ($(node).next().length > 0) {
                                //         $(node).next().addClass('next');
                                //         $(node).next().css('top', '301px');
                                //     }
                                // }
                                $(node).remove();
                                Vvveb.Components.render("html/slider13");
                                return node;
                            },
                        },
                        {
                            name: SETTINGTITLES.TITLE,
                            key: "slidertitle" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .card-heading`,
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
                            name: SETTINGTITLES.CONTENT,
                            key: "sliderdescription" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .card-desc-wrapper .card-desc`,
                            inputtype: TextareaInput,
                            edwclasses: "edwinputfield",
                            data: {
                                rows: 40,
                            }
                        },
                        {
                            name: SETTINGTITLES.IMAGE,
                            key: "sliderimage" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-carousel-item-${i} .vertical-card .logo`,
                        }

                    );
                });

                properties = removeDeleteButton(node, properties);
                hideNavigatorsOnSingleSlide(node)

                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
                }

                if($(node).find('.edw-slider-inner-container').children('.edw-slider-item').length > 1){
                    $(node).find('.edw-slider-item').removeClass('active');
                    $(node).find('.edw-slider-item').eq(1).addClass('active').removeClass('next').removeClass('prev');
                }

                $(node).find('.edw-slider-item.active').prev('.edw-slider-item').addClass('prev');
                $(node).find('.edw-slider-item.active').next('.edw-slider-item').addClass('next');


                $(node).find('.edw-slider-item.prev').css('top', '0px');


                $(node).find('.edw-slider-item.active').css('top',$(node).find('.edw-slider-item.prev').height() + 12+'px');

                var nextheight = ($(node).find('.edw-slider-item.prev').height() + $(node).find('.edw-slider-item.active').height()) + 24+'px';

                $(node).find('.edw-slider-item.next').css('top',nextheight);

                // removeDuplicateIndicators(node, i);

                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("color") === -1;
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
                        // Render component properties again to include the new column inputs
                        if ($(node).find('.edw-slider-item.next').length == 0) {
                            $(node).parent().find('.edw-slider-inner-container').append($(appendnode13).addClass('next').css('top','301px'));
                        } else {
                            $(node).parent().find('.edw-slider-inner-container').append(appendnode13);
                        }
                        Vvveb.Components.render("html/slider13");

                        return node;
                    }
                },
            ]
        });


       // Slider 14  --> Video Slider 1
       var sliderhtml14 = `<section class="video-slider-1 edw-slider_unqreplaceid_ edw_adv_slider" ><div class="carousel edw-carousel" data-ride="carousel"><div class="slider edw-slider-inner-container"><div class="slide edw-slider-item active" data-value="0"><video playsinline="playsinline" controls class="vjs-tech card-video"  tabindex="-1" role="application"><source src="${Vvveb.serverurl}/CDN/slidernewdesign14/videos/user1.mp4" type="video/mp4"></video><div class="backdrop"></div></div><div class="slide edw-slider-item" data-value="1"><video playsinline="playsinline" controls class="vjs-tech card-video"  tabindex="-1" role="application"><source src="${Vvveb.serverurl}/CDN/slidernewdesign14/videos/user2.mp4" type="video/mp4"></video><div class="backdrop"></div></div><div class="slide edw-slider-item" data-value="2"><video playsinline="playsinline" controls class="vjs-tech card-video"  tabindex="-1" role="application"><source src="${Vvveb.serverurl}/CDN/slidernewdesign14/videos/user3.mp4" type="video/mp4"></video><div class="backdrop"></div></div></div></div></section>`;
       var slidercss14 = ` .edw-slider_unqreplaceid_ {padding: 35px 24px;background-color: #07141f;}.edw-slider_unqreplaceid_ .carousel {position: relative;overflow: hidden;max-width: 1320px;margin: 0 auto;}.edw-slider_unqreplaceid_ .slider {width: 100%;position: relative;height: 450px;}.edw-slider_unqreplaceid_ .slider .slide {width: 60%;height: 100%;overflow: hidden;position: absolute;top: 50%;transform: translateY(-50%);transition-duration: 0.8s;animation-duration: 1s;animation-timing-function: ease-in;border-radius: 12px;overflow: hidden;box-shadow: 0px 6px 18px 0px rgba(0, 0, 0, 0.08);background-color: #fff;transition: left 0.5s ease, bottom 0.5s ease;filter: drop-shadow(-7px 0px 20px rgba(0, 0, 0, 0.8));}.edw-slider_unqreplaceid_ .slider .slide:not(.active) .backdrop {position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: 100;}.edw-slider_unqreplaceid_ .slider .slide:not(.active) .card-video, .edw-slider_unqreplaceid_ .slider .slide:not(.active) video {object-fit: cover;}.edw-slider_unqreplaceid_ .slider .slide .card {height: 100%;}.edw-slider_unqreplaceid_ .slider .slide .card-video, .edw-slider_unqreplaceid_ .slider .slide video {width: 100%;height: 100%;object-fit: cover;}.edw-slider_unqreplaceid_ .slider .slide.active {left: 80px;width: calc(100% - 80px);z-index: 10;}.edw-slider_unqreplaceid_ .slider .slide.active .backdrop {opacity: 0;}@keyframes prev1 {from {left: 80px;z-index: 12;height: 100%;width: calc(100% - 80px);}to {left: 100%;z-index: 12;height: 100%;width: calc(100% - 80px);}}@keyframes prev2 {from {left: 40px;height: calc(100% - 40px);}to {left: 80px;height: 100%;}}@media screen and (max-width: 1024px) {.edw-slider_unqreplaceid_ .carousel {max-width: 820px;}.edw-slider_unqreplaceid_ .slider {height: 350px;}}@media screen and (max-width: 767px) {.edw-slider_unqreplaceid_ .carousel {max-width: 600px;}.edw-slider_unqreplaceid_ .slider {height: 380px;}.edw-slider_unqreplaceid_ .slider .slide {top: unset;left: 50%;height: 60%;bottom: 80px;transform: translateX(-50%);}.edw-slider_unqreplaceid_ .slider .slide.active {width: 100%;height: calc(100% - 80px);left: 50%;}@keyframes prev1 {from {bottom: 80px;z-index: 12;width: 100%;height: calc(100% - 80px);}to {bottom: 104%;z-index: 12;width: 100%;height: calc(100% - 80px);}}@keyframes prev2 {from {bottom: 40px;width: calc(100% - 40px);}to {bottom: 80px;width: 100%;}}}@media screen and (max-width: 450px) {.edw-slider_unqreplaceid_ .slide .card-right {padding: 30px 20px !important;gap: 23px !important;}}.edw-slider_unqreplaceid_ .mediaplugin {margin: 0px !important;height: 100% !important;}.edw-slider_unqreplaceid_ .mediaplugin div {max-width: unset !important;}.edw-slider_unqreplaceid_ .mediaplugin > *:first-child {height: 100%;}.edw-slider_unqreplaceid_ .mediaplugin .vjs-fluid:not(.vjs-audio-only-mode) {padding-top: unset !important;}.edw-slider_unqreplaceid_ .mediaplugin .vjs-big-play-button {width: 50px;height: 50px;border-radius: 100%;border: 1px solid #5cff85;top: unset;left: unset;bottom: 40px;right: 40px;background-color: rgba(11, 25, 38, 0.8);}.edw-slider_unqreplaceid_ .mediaplugin .vjs-big-play-button .vjs-icon-placeholder:before {color: #5cff85 !important;}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .edw-slider_unqreplaceid_ .slider {height: 350px;}}`;
       var sliderjs14 = `class TestimonialDesign_unqreplaceid_{constructor(){this.testimonial=document.querySelector(".edw-slider_unqreplaceid_"),this.carousel=this.testimonial.querySelector(".carousel"),this.slider=this.testimonial.querySelector(".slider"),this.slides=this.testimonial.querySelectorAll(".slider .slide"),this.sliderLength=this.slides.length,this.slideclicked=this.slideclicked.bind(this),this.initializeSlides=this.initializeSlides.bind(this),this.initializeEvent(),this.initializeSlides(),this.carousel.querySelectorAll(".mediaplugin")&&this.carousel.querySelectorAll(".mediaplugin div").forEach(e=>{e.style.maxWidth="unset"})}initializeEvent(){window.addEventListener("resize",this.initializeSlides),this.slides.forEach(e=>{e.addEventListener("click",this.slideclicked),e.addEventListener("touchstart",this.slideclicked)})}resetSlide(e){e.style.height="",e.style.width="",e.style.top="",e.style.left="",e.style.bottom="";var i=e.querySelector("video");i.pause(),i.currentTime=0}initializeSlides(){let e=this.testimonial.querySelector(".slider .slide.active");e.style.zIndex="2",this.resetSlide(e);let i=e.nextElementSibling,t=4,s=window.innerWidth<768;for(;i;)this.resetSlide(i),s?(i.style.width="calc(100% - "+12*t+"px)",i.style.bottom=80-10*t+"px"):(i.style.height="calc(100% - "+12*t+"px)",i.style.left=80-10*t+"px"),i.style.zIndex=2-t/4,i=i.nextElementSibling,t+=4;let l=this.slider.querySelectorAll(".slide");for(let n=0;n<l.length;n++){let r=l[n];if(this.resetSlide(r),r===e)break;s?(r.style.width="calc(100% - "+12*t+"px)",r.style.bottom=80-10*t+"px"):(r.style.height="calc(100% - "+12*t+"px)",r.style.left=80-10*t+"px"),r.style.zIndex=2-t/4,t+=4}}rightClick(e=""){if(this.sliderLength>1){let i="",t=this.testimonial.querySelector(".slider .slide.active"),s;s=""===e?t.previousElementSibling:e,t!==s&&(t.style.animation="prev1 0.5s ease-in forwards",t.classList.remove("active"),s?(s.style.animation="prev2 0.5s ease-in forwards",s.classList.add("active")):((i=this.slider.lastElementChild).style.animation="prev2 0.5s ease-in forwards",i.classList.add("active")),this.initializeSlides(),setTimeout(()=>{t&&(t.style.animation=""),s&&(s.style.animation=""),i&&(i.style.animation="")},600))}}slideclicked=e=>{this.rightClick(e.currentTarget)}}const testimonialDesign_unqreplaceid_=new TestimonialDesign_unqreplaceid_;`;
       var appendnode14 = `<div class="slide edw-slider-item " data-value="0"><video playsinline="playsinline" controls class="vjs-tech card-video"  tabindex="-1" role="application"><source src="${Vvveb.serverurl}/CDN/slidernewdesign14/videos/user1.mp4" type="video/mp4"></video><div class="backdrop"></div></div>`;
       Vvveb.Components.extend("_base", "html/slider14", {
           name: "Video-slider-1",
           attributes: ['data-ebpb-slider14'],
           image: "icons/slider14.svg",
           classes: ['edwiser-pb-slider14'],
           html: (() => {
               return `<div class="edwiser-pb-slider14" data-vvveb-disabled-area contenteditable="false">${sliderhtml14}<style>${slidercss14}</style><script>${sliderjs14}</script></div>`;
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
                               // if ($(node).hasClass('next')) {
                               //     if ($(node).next().length > 0) {
                               //         $(node).next().addClass('next');
                               //         $(node).next().css('top', '301px');
                               //     }
                               // }
                               $(node).remove();
                               Vvveb.Components.render("html/slider14");
                               return node;
                           },
                       },
                       {
                           name: SETTINGTITLES.VIDEO,
                           child:`.edw-carousel-item-${i} video source`,
                           key: "slidervideosrc",
                           htmlAttr: "src",
                           edwclasses: "edwinputfield",
                           inputtype: VideoInput,
                           onChange: function (node, value, input) {

                            $parentnode = $(node).closest(".edwiser-pb-slider14");
                            setTimeout(function () {
                                $parentnode.click();;
                            }, 100);

                            return node;
                        },
                       },
                       // {
                       //     name: SETTINGTITLES.TITLE,
                       //     key: "slidertitle" + i,
                       //     htmlAttr: "innerHTML",
                       //     child: `.edw-carousel-item-${i} .edw-carousel-content-heading`,
                       //     inputtype: TextInput,
                       //     edwclasses: "edwinputfield",
                       //     onChange: function (node, value, input) {
                       //         if (value == "") {
                       //             $(node).hide();
                       //         } else {
                       //             $(node).show().text(value);
                       //         }
                       //     }
                       // },
                       // {
                       //     name: SETTINGTITLES.CONTENT,
                       //     key: "sliderdescription" + i,
                       //     htmlAttr: "innerHTML",
                       //     child: `.edw-carousel-item-${i} .card-desc`,
                       //     inputtype: TextareaInput,
                       //     edwclasses: "edwinputfield",
                       //     data: {
                       //         rows: 40,
                       //     }
                       // },
                       // {
                       //     name: SETTINGTITLES.IMAGE,
                       //     key: "sliderimage" + i,
                       //     htmlAttr: 'src',
                       //     inputtype: ImageInput,
                       //     edwclasses: "edwfilefield",
                       //     child: `.edw-carousel-item-${i} .header-slider-image`,
                       // }

                   );
               });

               properties = removeDeleteButton(node, properties);


               if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                   $(node).find('.edw-slider-item').first().addClass('active').removeAttr('style').css("z-index", "2");
               }

               $(node).find('.edw-slider-inner-container').children('.edw-slider-item').eq(1).css({
                "z-index": "1",
                "height": "calc(100% - 48px)",
                "left": "40px"
            });
               $(node).find('.edw-slider-inner-container').children('.edw-slider-item').eq(2).css({
                "z-index": "0",
                "height": "calc(100% - 96px)",
                "left": "0px"
            });
               // removeDuplicateIndicators(node, i);

               //remove all option properties
               this.properties = this.properties.filter(function (item) {
                   return item.key.indexOf("slider") === -1;
               });
               //remove all option properties
               this.properties = this.properties.filter(function (item) {
                   return item.key.indexOf("color") === -1;
               });
               this.properties = properties.concat(this.properties);
               this.properties = disableaddnewslidebutton(node,this.properties, 3);
               // slideIntervalfielddisabler(node);
               return node;
           },
           properties: [
            {
                name: "",
                key: "tabswarning",
                inputtype: EdwheaderInput,
                edwclasses: "edwgroupheader",
                data: {
                    header: "Only 3 Videos are allowed",
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
                    // Render component properties again to include the new column inputs
                    // if ($(node).find('.edw-slider-item.next').length == 0) {
                    //     $(node).parent().find('.edw-slider-inner-container').append($(appendnode14).addClass('next').css('top','301px'));
                    // } else {
                    //     $(node).parent().find('.edw-slider-inner-container').append(appendnode14);
                    // }
                    $(node).parent().find('.edw-slider-inner-container').append(appendnode14);
                    Vvveb.Components.render("html/slider14");

                    return node;
                }
            },
           ]
       });
    }
    function removeDuplicateIndicators(node, i) {
        $(node).find(".edw-carousel-indicators").empty();
        var id = $(node).find('.edw-carousel').attr('id');
        var x = 0;
        $(node).find(".edw-slider-item").each(function (e) {
            $(node).find(".carousel-indicators").append(`<li data-target="#${id}" data-slide-to="${x}" data-bs-target="#${id}" data-bs-slide-to="${x}"></li>`);
            if ($(this).hasClass('active')) {
                $(node).find(`.edw-carousel-indicators li[data-slide-to='${x}']`).addClass('active');
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


    return {
        init: function () {
            var blocks = ["html/slider6", "html/slider1", "html/slider7", "html/slider8", "html/slider9", "html/slider11", "html/slider12","html/slider13","html/slider14"];
            addBlocks(blocks);
        }
    }

});
