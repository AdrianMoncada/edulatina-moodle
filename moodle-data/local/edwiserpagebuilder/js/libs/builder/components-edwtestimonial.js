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
define('local_edwiserpagebuilder/components-edwtestimonial', ['local_edwiserpagebuilder/jquery', 'core/ajax'], function (jQuery, Ajax) {

    function addBlocks(blocks) {
        Vvveb.ComponentsGroup['Edwiser Testimonials'] = blocks;
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
            SHOWNAVIGATIONBUTTONS: 'Show navigation arrows',
            SHOWNAVIGATIONBULLETS: 'Show navigation bullets',
            AUTOPLAYSLIDES: 'Autoplay slides',
            PAUSESLIDESONHOVER: 'Pause slides on hover',
            SLIDEINTERVAL: 'Slide interval',
            TESTIMONIALHEADING: 'Heading',
            VIDEO: 'Video',
            TITLE: 'Title',
            ARROWASSETCOLOR:'Navigation arrows,border & bullets',
            ARROWONLYCOLOR:'Navigation arrows and border',
            ARROWSHOVER:'Navigation arrows hover',
            ARROWSANDBULLETS:'Navigation arrows & bullets',
            ARROWASSETCOLORINFO:'Show navigation arrows and bullet settings must be enabled',
        };
        //Testimonial 1
        var testimonialhtml1 = ` <section class="section-testimonial-design_unqreplaceid_ edw_adv_slider" data-url="${Vvveb.serverurl}/CDN/testimonialdesign1/images/bg-image.png"><div id="edw_testimonial_unqreplaceid_" class="carousel carousel-dark slide edw-carousel" data-ride="carousel" data-interval="3000" data-pause="hover" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover"><div class="carousel-inner edw-slider-inner-container" id="carousel_container"><div class="carousel-item edw-slider-item active"><div class="item-container"><div class="content-box"><p class="desc edw-carousel-content-para">Learning software has transformed my educational journey. With its intuitive interface and comprehensive features, I've gained a deeper understanding of complex subjects. The interactive exercises and quizzes have helped me reinforce my knowledge and track my progress effectively. The flexibility of accessing the software from any device has made learning convenient and accessible, fitting seamlessly into my busy schedule.</p><div class="profile"><div class="profile-image-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign1/images/profile-images/profile-1.png" alt="profile-1"></div><div class="profile-desc-box"><p class="testimonial-user-name">John Doe,</p><p class="testimonial-user-desg">Manager, Learnupon</p></div></div></div></div></div><div class="carousel-item edw-slider-item"><div class="item-container"><div class="content-box"><p class="desc edw-carousel-content-para">Absolutely impressed with Product. It has exceeded my expectations with its impeccable performance and user-friendly interface. This product has streamlined our tasks and boosted our productivity, all while maintaining top-notch quality. Its innovative features have truly set it apart in the market. Product is a must-have for anyone looking to enhance their efficiency effortlessly.</p><div class="profile"><div class="profile-image-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign1/images/profile-images/profile_2.png" alt="profile-1"></div><div class="profile-desc-box"><p class="testimonial-user-name">Olivia Miller,</p><p class="testimonial-user-desg">Chief Executive, NexTech</p></div></div></div></div></div></div><button class="carousel-control-prev position-absolute edw-slide-control edw-control-prev" type="button" data-target="#edw_testimonial_unqreplaceid_" data-slide="prev" data-bs-target="#edw_testimonial_unqreplaceid_" data-bs-slide="prev"><span class="carousel-control-prev-icon fa fa-light fa-angle-left" aria-hidden="true"></span></button><button class="carousel-control-next position-absolute edw-slide-control edw-control-next" type="button" data-target="#edw_testimonial_unqreplaceid_" data-slide="next" data-bs-target="#edw_testimonial_unqreplaceid_" data-bs-slide="next"><span class="carousel-control-prev-icon fa fa-light fa-angle-right" aria-hidden="true"></span></button><div class="carousel-indicators edw-carousel-indicators position-absolute"><li data-target="#edw_testimonial_unqreplaceid_" data-slide-to="0" data-bs-target="#edw_testimonial_unqreplaceid_" data-bs-slide-to="0" class="active"></li><li data-target="#edw_testimonial_unqreplaceid_" data-slide-to="1" data-bs-target="#edw_testimonial_unqreplaceid_" data-bs-slide-to="1" class=""></li></div><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"><div class="property-controller" data-slidebgcolor="#1C376F" data-usrnamecolor="#FFF" data-usrdesgcolor="#FFF" style="display:none!important"></div></div></section>`;
        var testimonialcss1 = `.section-testimonial-design_unqreplaceid_ {padding: 0px 0px 50px;background-repeat: no-repeat !important;background-size: cover !important;background-position: 25% center !important;}.section-testimonial-design_unqreplaceid_ h3 {color: #313848;text-align: center;font-size: 34px;font-weight: 700;line-height: 42px;letter-spacing: -1px;margin: 0;}.section-testimonial-design_unqreplaceid_ .desc {color: #4C5A73;text-align: center;font-size: 18px;font-weight: 400;line-height: 26px;margin: 6px auto 0;max-width: 873px;}.section-testimonial-design_unqreplaceid_ .carousel {max-width: 1440px;margin: 0 auto;}.section-testimonial-design_unqreplaceid_ .item-container {max-width: 1173px;margin: 0 auto 36px;padding: 0 150px;}.section-testimonial-design_unqreplaceid_ .item-container .content-box {padding: 50px;border-radius: 6px;border: 1px solid #909BB1;background: #1C376F;box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.12);margin-top: 40px;}.section-testimonial-design_unqreplaceid_ .item-container .content-box .desc {color: #FFF;margin: 0;text-align: left;}.section-testimonial-design_unqreplaceid_ .item-container .profile {display: flex;align-items: center;gap: 17px;align-self: stretch;margin-top: 23px;}.section-testimonial-design_unqreplaceid_ .item-container .profile .profile-image-box {width: 56px;height: 56px;border-radius: 100%;overflow: hidden;}.section-testimonial-design_unqreplaceid_ .item-container .profile .profile-image-box img {width: 100%;height: 100%;object-fit: cover;}.section-testimonial-design_unqreplaceid_ .item-container .profile .profile-desc-box p:first-child {color: #FFF;font-size: 20px;font-weight: 700;line-height: 28px;margin: 0;}.section-testimonial-design_unqreplaceid_ .item-container .profile .profile-desc-box p:last-child {color: #EBF0F9;font-size: 14px;font-weight: 400;line-height: 22px;margin: 0;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev, .section-testimonial-design_unqreplaceid_ .carousel-control-next {width: 46px;height: 46px;background-color: white;border: 1px solid #0051f9;border-radius: 50%;font-size: 24px;color: #0051f9;opacity: 1;transition: all 0.3s ease-out;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev {left: 12%;right: unset;margin: auto 0;}.section-testimonial-design_unqreplaceid_ .carousel-control-next {right: 12%;left: unset;margin: auto 0;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev-icon, .section-testimonial-design_unqreplaceid_ .carousel-control-next-icon {filter: unset;font-size: 26px;width: 24px;height: 24px;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev:hover, .section-testimonial-design_unqreplaceid_ .carousel-control-next:hover, .section-testimonial-design_unqreplaceid_ .carousel-control-prev:focus, .section-testimonial-design_unqreplaceid_ .carousel-control-next:focus {background-color: white;color: #0051f9;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev:hover, .section-testimonial-design_unqreplaceid_ .carousel-control-next:hover {filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.12));}.section-testimonial-design_unqreplaceid_ .carousel-indicators {margin-bottom: 0px;gap: 8px;}.section-testimonial-design_unqreplaceid_ .carousel-indicators li {list-style-type: none;opacity: 1;background-color: #d5ddea;border: 1px solid #d5ddea;width: 5px;height: 5px;border-radius: 50%;margin: 0;cursor: pointer;}.section-testimonial-design_unqreplaceid_ .carousel-indicators .active {background-color: #7590c2;border: 1px solid #7590c2;}@media screen and (min-width: 1440px) {.section-testimonial-design_unqreplaceid_ .carousel-control-prev {left: 8%;}.section-testimonial-design_unqreplaceid_ .carousel-control-next {right: 8%;}}@media screen and (max-width: 1440px) {.section-testimonial-design_unqreplaceid_ .carousel-control-prev {left: 5%;}.section-testimonial-design_unqreplaceid_ .carousel-control-next {right: 5%;}}@media screen and (max-width: 820px) {.section-testimonial-design_unqreplaceid_ .desc {margin: 6px 24px 0;}.section-testimonial-design_unqreplaceid_ .item-container {padding: 0 24px;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev, .section-testimonial-design_unqreplaceid_ .carousel-control-next {display: none;}}@media screen and (max-width: 600px) {.section-testimonial-design_unqreplaceid_ .item-container .content-box {padding: 50px 25px;}}.edw-rtl-block .section-testimonial-design_unqreplaceid_ .carousel-control-prev, .edw-rtl-block .section-testimonial-design_unqreplaceid_ .carousel-control-next {transform: rotate(180deg);}`;
        var testimonialjs1 = ``;
        var appendnode1 = ` <div class="carousel-item edw-slider-item"> <div class="item-container"> <div class="content-box"> <p class="desc edw-carousel-content-para">Learning software has transformed my educational journey. With its intuitive interface and comprehensive features, I've gained a deeper understanding of complex subjects. The interactive exercises and quizzes have helped me reinforce my knowledge and track my progress effectively. The flexibility of accessing the software from any device has made learning convenient and accessible, fitting seamlessly into my busy schedule. </p><div class="profile"> <div class="profile-image-box "> <img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign1/images/profile-images/profile-1.png" alt="profile-1"/> </div><div class="profile-desc-box"> <p class="testimonial-user-name">John Doe,</p><p class="testimonial-user-desg">Manager, Learnupon</p></div></div></div></div></div>`;
        Vvveb.Components.extend("_base", "html/testimonial1", {
            name: "Testimonial Design 1 ",
            attributes: ['data-ebpb-testimonail1'],
            image: "icons/testimonial1.svg",
            classes: ['edwiser-testimonial1'],
            html: (() => {
                return `<div class="edwiser-testimonial1" data-vvveb-disabled-area contenteditable="false">${testimonialhtml1}<style>${testimonialcss1}</style><script>${testimonialjs1}</script></div>`;
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
                    applyTextColorsBeforeInit(node, '.content-box');
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Testimonial " + slideno,
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
                                Vvveb.Components.render("html/testimonial1");
                                return node;
                            },
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
                            name: SETTINGTITLES.PROFILEIMG,
                            key: "sliderprofileimage" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwinputfield",
                            child: `.edw-carousel-item-${i} .edw-profile-img`,
                            // onChange: function (node, value, input) {
                            //     $(node).parent().find(this.child).css("background-image", "url(" + value + ")");
                            //     return node;
                            // }
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
                this.properties = this.properties.filter(function (item) {
                    if(item.edwclasses){
                        return item.edwclasses.indexOf("arrowassetcolor") === -1;
                    }
                    return true;
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
                                    $(node).closest('.edw-carousel').find('.edw-slide-control .fa').css('color', value);
                                    $(node).closest('.edw-carousel').find('.edw-slide-control').css('border-color', value);
                                    $(node).closest('.edw-carousel').find('.edw-carousel-indicators').css('--arrowassetcolor', value);
                                }

                                return node;
                            }
                        }
                    );
                }
                this.properties = properties.concat(this.properties);
                slideIntervalfielddisabler(node);
                slidearrowcolorsettingstatushandler($(node),arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFO);
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
                        $(node).parent().find('.edw-slider-inner-container').append(appendnode1);
                        Vvveb.Components.render("html/testimonial1");

                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.SLIDEBGCOLOR,
                    key: "background-color",
                    inline: true,
                    htmlAttr: "style",
                    col: 12,
                    inputtype: ColorInput,
                    edwclasses: "edwcolorfield",
                    child: ' .content-box',
                    onChange: function (node, value, input) {
                        $(node).css('background-color', value);
                    }
                },
                {
                    name: SETTINGTITLES.PROFILENAMECOLOR,
                    key: "color",
                    inline: true,
                    htmlAttr: "style",
                    col: 12,
                    inputtype: ColorInput,
                    edwclasses: "edwcolorfield",
                    child: '.testimonial-user-name',
                    onChange: function (node, value, input) {
                        $(node).parent().find('.testimonial-user-name').css('color', value);
                    }
                },
                {
                    name: SETTINGTITLES.PROFILEDESGCOLOR,
                    key: "color",
                    inline: true,
                    htmlAttr: "style",
                    col: 12,
                    inputtype: ColorInput,
                    edwclasses: "edwcolorfield",
                    child: '.testimonial-user-desg',
                    onChange: function (node, value, input) {
                        $(node).parent().find('.testimonial-user-desg').css('color', value);
                    }
                },
                {
                    name: SETTINGTITLES.PROFILEDESCRIPTONCOLOR,
                    key: "color",
                    inline: true,
                    htmlAttr: "style",
                    col: 12,
                    inputtype: ColorInput,
                    edwclasses: "edwcolorfield",
                    child: '.edw-carousel-content-para',
                    onChange: function (node, value, input) {
                        $(node).parent().find('.edw-carousel-content-para').css('color', value);
                    }
                },

                // {
                //     name: "Testimonial title",
                //     key: "testimonialtitle",
                //     htmlAttr: "innerHTML",
                //     child: `.edw-testimonial-heading`,
                //     inputtype: TextInput,
                //     onChange: function (node, value, input) {
                //         if (value == "") {
                //             $(node).hide();
                //         } else {
                //             $(node).show().text(value);
                //         }
                //     }
                // },
                // {
                //     name: "Testimonial Description",
                //     key: "testimonialdescription",
                //     htmlAttr: "innerHTML",
                //     child: `.edw-testimonial-desc`,
                //     inputtype: TextInput,
                //     onChange: function (node, value, input) {
                //         if (value == "") {
                //             $(node).hide();
                //         } else {
                //             $(node).show().text(value);
                //         }
                //     }
                // },
                // {
                //     name: "Testimonial Background Image",
                //     key: "Testimonialbgimage",
                //     htmlAttr: 'data-url',
                //     inputtype: ImageInput,
                //     child: `.edw_adv_slider`,
                //     onChange: function (node, value, input) {
                //         $(node).parent().find(this.child).css("background-image", "url(" + value + ")");
                //         return node;
                //     }
                // },
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
                        slidearrowcolorsettingstatushandler(tempnode, arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFO);
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
                        slidearrowcolorsettingstatushandler(tempnode, arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFO);
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

        //Testimonial 2
        var testimonialhtml2 = `<section class="section-testimonial-design_unqreplaceid_ edw_adv_slider" data-url="${Vvveb.serverurl}/CDN/testimonialdesign2/images/bg-image.png"><div id="edw_testimonial_unqreplaceid_" class="carousel carousel-dark slide edw-carousel" data-ride="carousel" data-interval="3000" data-pause="hover" data-touch="true" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover" data-bs-touch="true"><div class="carousel-inner edw-slider-inner-container" id="carousel_container"><div class="carousel-item edw-slider-item active" data-value="0"><div class="item-container"><div class="content-box"><div class="profile"><div class="profile-image-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign2/images/profile-images/profile-1.png" alt="profile-1"></div><div class="profile-desc-box"><p class="testimonial-user-name">John Doe,</p><p class="testimonial-user-desg">Manager, Learnupon</p></div></div><p class="desc edw-carousel-content-para">Learning software has transformed my educational journey. With its intuitive interface and comprehensive features, I've gained a deeper understanding of complex subjects. The interactive exercises helped me reinforce my knowledge and track my progress effectively.</p></div></div></div><div class="carousel-item edw-slider-item" data-value="0"><div class="item-container"><div class="content-box"><div class="profile"><div class="profile-image-box"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign2/images/profile-images/profile_2.png" alt="profile-1"></div><div class="profile-desc-box"><p class="testimonial-user-name">Olivia Miller</p><p class="testimonial-user-desg">Chief Executive, NexTech</p></div></div><p class="desc edw-carousel-content-para">Absolutely impressed with Product. It has exceeded my expectations with its impeccable performance and user-friendly interface. This product has streamlined our tasks and boosted our productivity, all while maintaining top-notch quality.</p></div></div></div></div><button class="carousel-control-prev position-absolute edw-slide-control edw-control-prev" type="button" data-target="#edw_testimonial_unqreplaceid_" data-slide="prev" data-bs-target="#edw_testimonial_unqreplaceid_" data-bs-slide="prev"><span class="carousel-control-prev-icon fa fa-light fa-angle-left" aria-hidden="true"></span></button><button class="carousel-control-next position-absolute edw-slide-control edw-control-next" type="button" data-target="#edw_testimonial_unqreplaceid_" data-slide="next" data-bs-target="#edw_testimonial_unqreplaceid_" data-bs-slide="next"><span class="carousel-control-prev-icon fa fa-light fa-angle-right" aria-hidden="true"></span></button><ol class="carousel-indicators edw-carousel-indicators position-absolute"><li data-target="#edw_testimonial_unqreplaceid_" data-slide-to="0" data-bs-target="#edw_testimonial_unqreplaceid_" data-bs-slide-to="0" class="active"></li><li data-target="#edw_testimonial_unqreplaceid_" data-slide-to="1" data-bs-target="#edw_testimonial_unqreplaceid_" data-bs-slide-to="1" class=""></li></ol><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></div></section>`;
        var testimonialcss2 = `.section-testimonial-design_unqreplaceid_ {padding: 0px 0px 50px;background-repeat: no-repeat !important;background-size: cover !important;background-position: 25% center !important;}.section-testimonial-design_unqreplaceid_ h3 {color: #313848;text-align: center;font-size: 34px;font-weight: 700;line-height: 42px;letter-spacing: -1px;margin: 0;}.section-testimonial-design_unqreplaceid_ .desc {color: #4C5A73;text-align: center;font-size: 18px;font-weight: 400;line-height: 26px;margin: 0;}.section-testimonial-design_unqreplaceid_ .carousel {max-width: 1440px;margin: 0 auto;}.section-testimonial-design_unqreplaceid_ .item-container {max-width: 1173px;margin: 0 auto 36px;padding: 0 150px;}.section-testimonial-design_unqreplaceid_ .item-container .content-box {border-radius: 6px;border: 1px solid #909BB1;background-color: #FFF;box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.12);padding: 50px;margin-top: 40px;text-align: center;}.section-testimonial-design_unqreplaceid_ .item-container .content-box .desc {margin: 23px 0 0;}.section-testimonial-design_unqreplaceid_ .item-container .profile {display: flex;flex-direction: column;align-items: center;gap: 17px;align-self: stretch;}.section-testimonial-design_unqreplaceid_ .item-container .profile .profile-image-box {border-radius: 100%;overflow: hidden;width: 90.067px;height: 88.59px;border: 1px solid #D5DDEA;box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.4);}.section-testimonial-design_unqreplaceid_ .item-container .profile .profile-image-box img {width: 100%;height: 100%;object-fit: cover;}.section-testimonial-design_unqreplaceid_ .item-container .profile .profile-desc-box p:first-child {color: #313848;text-align: center;font-size: 20px;font-weight: 700;line-height: 28px;margin: 0;}.section-testimonial-design_unqreplaceid_ .item-container .profile .profile-desc-box p:last-child {color: #4C5A73;text-align: center;font-size: 14px;font-weight: 400;line-height: 22px;margin: 0;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev, .section-testimonial-design_unqreplaceid_ .carousel-control-next {width: 46px;height: 46px;background-color: white;border: 1px solid #0051f9;border-radius: 50%;font-size: 24px;color: #0051f9;opacity: 1;transition: all 0.3s ease-out;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev {left: 12%;right: unset;margin: auto 0;}.section-testimonial-design_unqreplaceid_ .carousel-control-next {right: 12%;left: unset;margin: auto 0;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev-icon, .section-testimonial-design_unqreplaceid_ .carousel-control-next-icon {font-size: 26px;width: 24px;height: 24px; filter: unset;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev:hover, .section-testimonial-design_unqreplaceid_ .carousel-control-next:hover, .section-testimonial-design_unqreplaceid_ .carousel-control-prev:focus, .section-testimonial-design_unqreplaceid_ .carousel-control-next:focus {background-color: white;color: #0051f9;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev:hover, .section-testimonial-design_unqreplaceid_ .carousel-control-next:hover {filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.12));}.section-testimonial-design_unqreplaceid_ .carousel-indicators {margin-bottom: 0px;gap: 8px;}.section-testimonial-design_unqreplaceid_ .carousel-indicators li { list-style-type: none; opacity: 1;background-color: #d5ddea;border: 1px solid #d5ddea;width: 5px;height: 5px;border-radius: 50%;margin: 0;cursor: pointer;}.section-testimonial-design_unqreplaceid_ .carousel-indicators .active {background-color: #7590c2;border: 1px solid #7590c2;}@media screen and (min-width: 1440px) {.section-testimonial-design_unqreplaceid_ .carousel-control-prev {left: 8%;}.section-testimonial-design_unqreplaceid_ .carousel-control-next {right: 8%;}}@media screen and (max-width: 1440px) {.section-testimonial-design_unqreplaceid_ .carousel-control-prev {left: 5%;}.section-testimonial-design_unqreplaceid_ .carousel-control-next {right: 5%;}}@media screen and (max-width: 1200px) {.section-testimonial-design_unqreplaceid_ .carousel-control-prev {left: 5%;}.section-testimonial-design_unqreplaceid_ .carousel-control-next {right: 5%;}}@media screen and (max-width: 820px) {.section-testimonial-design_unqreplaceid_ .carousel {max-width: 820px;}.section-testimonial-design_unqreplaceid_ .desc {margin: 6px 24px 0;}.section-testimonial-design_unqreplaceid_ .item-container {padding: 0 24px;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev, .section-testimonial-design_unqreplaceid_ .carousel-control-next {display: none;}}@media screen and (max-width: 768px) {.section-testimonial-design_unqreplaceid_ .item-container .content-box {padding: 50px 25px;}}.edw-rtl-block .section-testimonial-design_unqreplaceid_ .carousel-control-prev, .edw-rtl-block .section-testimonial-design_unqreplaceid_ .carousel-control-next {transform: rotate(180deg);}`;
        var testimonialjs2 = ``;
        var appendnode2 = ` <div class="carousel-item edw-slider-item" data-value="0"> <div class="item-container"> <div class="content-box"> <div class="profile"> <div class="profile-image-box"> <img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign2/images/profile-images/profile-1.png" alt="profile-1"/> </div><div class="profile-desc-box"> <p class="testimonial-user-name">John Doe,</p><p class="testimonial-user-desg">Manager, Learnupon</p></div></div><p class="desc edw-carousel-content-para">Learning software has transformed my educational journey. With its intuitive interface and comprehensive features, I've gained a deeper understanding of complex subjects. The interactive exercises and quizzes have helped me reinforce my knowledge and track my progress effectively. The flexibility of accessing the software from any device has made learning convenient and accessible, fitting seamlessly into my busy schedule.</p></div></div></div>`;
        Vvveb.Components.extend("_base", "html/testimonial2", {
            name: "Testimonial Design 2 ",
            attributes: ['data-ebpb-testimonail2'],
            image: "icons/testimonial2.svg",
            classes: ['edwiser-testimonial2'],
            html: (() => {
                return `<div class="edwiser-testimonial2" data-vvveb-disabled-area contenteditable="false">${testimonialhtml2}<style>${testimonialcss2}</style><script>${testimonialjs2}</script></div>`;
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
                    applyTextColorsBeforeInit(node, '.content-box');
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Testimonial " + slideno,
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
                                Vvveb.Components.render("html/testimonial2");
                                return node;
                            },
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
                            name: SETTINGTITLES.PROFILEIMG,
                            key: "sliderprofileimage" + i,
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
                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);
                if (!$(node).find('.carousel-item').hasClass('.active').length > 0) {
                    $(node).find('.carousel-item').first().addClass('active');
                }
                removeDuplicateIndicators(node, i);
                //remove all option properties
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                this.properties = this.properties.filter(function (item) {
                    if(item.edwclasses){
                        return item.edwclasses.indexOf("arrowassetcolor") === -1;
                    }
                    return true;
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
                                    $(node).closest('.edw-carousel').find('.edw-slide-control .fa').css('color', value);
                                    $(node).closest('.edw-carousel').find('.edw-slide-control').css('border-color', value);
                                    $(node).closest('.edw-carousel').find('.edw-carousel-indicators').css('--arrowassetcolor', value);
                                }

                                return node;
                            }
                        }
                    );
                }
                this.properties = properties.concat(this.properties);
                slideIntervalfielddisabler(node);
                slidearrowcolorsettingstatushandler($(node),arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFO);
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
                        Vvveb.Components.render("html/testimonial2");

                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.SLIDEBGCOLOR,
                    key: "background-color",
                    inline: true,
                    htmlAttr: "style",
                    col: 12,
                    inputtype: ColorInput,
                    edwclasses: "edwcolorfield",
                    child: '.carousel-item .content-box',
                    onChange: function (node, value, input) {
                        $(node).css('background-color', value);
                    }
                },
                {
                    name: SETTINGTITLES.PROFILENAMECOLOR,
                    key: "color",
                    inline: true,
                    htmlAttr: "style",
                    col: 12,
                    inputtype: ColorInput,
                    edwclasses: "edwcolorfield",
                    child: '.carousel-item .testimonial-user-name',
                    onChange: function (node, value, input) {
                        $(node).parent().find('.testimonial-user-name').css('color', value);
                    }
                },
                {
                    name: SETTINGTITLES.PROFILEDESGCOLOR,
                    key: "color",
                    inline: true,
                    htmlAttr: "style",
                    col: 12,
                    inputtype: ColorInput,
                    edwclasses: "edwcolorfield",
                    child: '.carousel-item .testimonial-user-desg',
                    onChange: function (node, value, input) {
                        $(node).parent().find('.testimonial-user-desg').css('color', value);
                    }
                },
                {
                    name: SETTINGTITLES.PROFILEDESCRIPTONCOLOR,
                    key: "color",
                    inline: true,
                    htmlAttr: "style",
                    col: 12,
                    inputtype: ColorInput,
                    edwclasses: "edwcolorfield",
                    child: '.carousel-item .edw-carousel-content-para',
                    onChange: function (node, value, input) {
                        $(node).parent().find('.edw-carousel-content-para').css('color', value);
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
                        var tempnode = $(node).closest('.edw-carousel');
                        slidearrowcolorsettingstatushandler(tempnode, arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFO);
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
                        var tempnode = $(node).closest('.edw-carousel');
                        slidearrowcolorsettingstatushandler(tempnode, arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFO);
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

        //Testimonial 3
        var testimonialhtml3 = `<section class="edw_testimonial_unqreplaceid_ edw_adv_slider edw-testimonial-3"><div id="testimonial_unqreplaceid_" class="carousel edw-carousel" data-ride="carousel" data-interval="3000" data-pause="hover"><div class="slider edw-slider-inner-container"><div class="slide edw-slider-item active"><div class="card"><div class="card-icon"><img src="${Vvveb.serverurl}/CDN/testimonialdesign3/images/slider-image/card-icon.svg" alt="card icon"> <img src="${Vvveb.serverurl}/CDN/testimonialdesign3/images/slider-image/card-icon-active.svg" alt="card icon"></div><div class="card-head"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign3/images/slider-image/image-1.png" alt="image 1"><p class="testimonial-user-name">Gladys Andino</p></div><div class="card-body"><p class="card-desc desc edw-carousel-content-para">I must say I am very impressed after my visit to The Edwiser School. Most importantly the interaction between children and teachers felt warm and caring. I must say I am very impressed after my visit to The Edwiser School.</p></div></div></div><div class="slide edw-slider-item"><div class="card"><div class="card-icon"><img src="${Vvveb.serverurl}/CDN/testimonialdesign3/images/slider-image/card-icon.svg" alt="card icon"> <img src="${Vvveb.serverurl}/CDN/testimonialdesign3/images/slider-image/card-icon-active.svg" alt="card icon"></div><div class="card-head"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign3/images/slider-image/image-2.png" alt="image 1"><p class="testimonial-user-name">Suzan Maccan</p></div><div class="card-body"><p class="card-desc desc edw-carousel-content-para">Edwiser School, for third time carried forth this banner of peace and friendship across to Singapore in the form of the 3rd Student Exchange Programme Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></div></div></div><div class="slide edw-slider-item"><div class="card"><div class="card-icon"><img src="${Vvveb.serverurl}/CDN/testimonialdesign3/images/slider-image/card-icon.svg" alt="card icon"> <img src="${Vvveb.serverurl}/CDN/testimonialdesign3/images/slider-image/card-icon-active.svg" alt="card icon"></div><div class="card-head"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign3/images/slider-image/image-3.png" alt="image 1"><p class="testimonial-user-name">Jeny Morgan</p></div><div class="card-body"><p class="card-desc desc edw-carousel-content-para">What I really like most about The Edwiser School is the Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum</p></div></div></div></div><div class="slider-arrow"><button class="left edw-slide-control edw-control-prev"><span class="fa fa-light fa-angle-left" aria-hidden="true"></span></button><button class="right edw-slide-control edw-control-next"><span class="fa fa-light fa-angle-right" aria-hidden="true"></span></button></div><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></div></section>`;
        var testimonialcss3 = `.edw_testimonial_unqreplaceid_ {padding: 0px 0 50px;background: #fff;}.edw_testimonial_unqreplaceid_ h2 {color: #444;text-align: center;font-size: 40px;font-weight: 400;margin: 0;}.edw_testimonial_unqreplaceid_ .carousel {max-width: 1320px;margin: 40px auto 0;}.edw_testimonial_unqreplaceid_ .slider {width: 100%;position: relative;overflow: hidden;min-height: 342px;}.edw_testimonial_unqreplaceid_ .slider .slide {width: 30%;height: calc(100% - 42px);min-height: 300px;position: absolute;left: -31%;transition: left 0.5s ease-in, right 0.5s ease-in;margin-top: 40px;border: 1px solid #D5DDEA;}.edw_testimonial_unqreplaceid_ .slider .slide .card {position: relative;padding: 50px 0px 0;background: #FFF;border: none;}.edw_testimonial_unqreplaceid_ .slider .slide .card .card-icon {width: 87.502px;height: 68px;position: absolute;top: -34.001px;right: 0;}.edw_testimonial_unqreplaceid_ .slider .slide .card .card-icon img {width: 100%;height: 100%;object-fit: cover;}.edw_testimonial_unqreplaceid_ .slider .slide .card .card-icon img:last-child {display: none;}.edw_testimonial_unqreplaceid_ .slider .slide .card .card-head {position: relative;padding: 10px 0 10px 114px;margin-left: -1px;margin-right: -1px;opacity: 0.6;}.edw_testimonial_unqreplaceid_ .slider .slide .card .card-head img {width: 68px;height: 68px;border-radius: 100%;object-fit: cover;border: 1px solid #9A3CDF;position: absolute;top: 50%;left: 30px;transform: translateY(-50%);}.edw_testimonial_unqreplaceid_ .slider .slide .card .card-head p {color: #444;font-size: 18px;font-weight: 400;margin: 0;}.edw_testimonial_unqreplaceid_ .slider .slide .card .card-body {padding: 26px 30px 26px;}.edw_testimonial_unqreplaceid_ .slider .slide .card .card-body .card-desc {color: #4c5a73;font-size: 18px;font-style: italic;font-weight: 400;line-height: 32px;opacity: 0.6;margin: 0;}.edw_testimonial_unqreplaceid_ .slider .slide.next {right: 4%;left: unset;top: 0;}.edw_testimonial_unqreplaceid_ .slider .slide.prev {left: 4%;top: 0;}.edw_testimonial_unqreplaceid_ .slider .slide.active {left: 35%;top: 0;}.edw_testimonial_unqreplaceid_ .slider .slide.active .card .card-icon img:first-child {display: none;}.edw_testimonial_unqreplaceid_ .slider .slide.active .card .card-icon img:last-child {display: block;}.edw_testimonial_unqreplaceid_ .slider .slide.active .card .card-head {background-color: #9A3CDF;opacity: 1;}.edw_testimonial_unqreplaceid_ .slider .slide.active .card .card-head p {color: #FFF;}.edw_testimonial_unqreplaceid_ .slider .slide.active .card .card-body .card-desc {opacity: 1;}@keyframes toRightForActive {from {left: 35%;}to {left: 66%;}}@keyframes toRightForPrev {from {left: 4%;}to {left: 35%;}}@keyframes toRightForNext {from {left: unset;right: 4%;}to {left: unset;right: -31%;}}@keyframes toLeftForActive {from {left: 35%;}to {left: 4%;}}@keyframes toLeftForPrev {from {left: 4%;}to {left: -31%;}}@keyframes toLeftForNext {from {left: unset;right: 4%;}to {left: unset;right: 35%;}}@keyframes toLeftForNextSibling {from {left: unset;right: -31%;}to {left: unset;right: 4%;}}.edw_testimonial_unqreplaceid_ .slider.dragging {cursor: grab;}.edw_testimonial_unqreplaceid_ .slider-arrow {display: flex;gap: 29px;width: fit-content;margin: 40px auto 0;}.edw_testimonial_unqreplaceid_ .slider-arrow .left, .edw_testimonial_unqreplaceid_ .slider-arrow .right {width: 56px;height: 56px;border: 1px solid #ebebeb;border-radius: 100%;background: #FFF;filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.12));cursor: pointer;display: flex;justify-content: center;align-items: center;color: #9A3CDF;font-size: 24px;}.edw_testimonial_unqreplaceid_ .slider-arrow .left:hover, .edw_testimonial_unqreplaceid_ .slider-arrow .right:hover {border: 1px solid #EBEBEB;background: #9A3CDF;color: #EBEBEB;}@media screen and (max-width: 1024px) {.edw_testimonial_unqreplaceid_ .slider .slide {width: 56%;left: -94%;}.edw_testimonial_unqreplaceid_ .slider .slide.next {right: -36%;left: unset;}.edw_testimonial_unqreplaceid_ .slider .slide.prev {left: -36%;}.edw_testimonial_unqreplaceid_ .slider .slide.active {left: 22%;}@keyframes toRightForActive {from {left: 22%;}to {left: 80%;}}@keyframes toRightForPrev {from {left: -36%;}to {left: 22%;}}@keyframes toRightForNext {from {left: unset;right: -36%;}to {left: unset;right: -94%;}}@keyframes toLeftForActive {from {left: 22%;}to {left: -36%;}}@keyframes toLeftForPrev {from {left: -36%;}to {left: -94%;}}@keyframes toLeftForNext {from {left: unset;right: -36%;}to {left: unset;right: 22%;}}@keyframes toLeftForNextSibling {from {left: unset;right: -94%;}to {left: unset;right: -36%;}}}@media screen and (max-width: 767px) {.edw_testimonial_unqreplaceid_ {padding: 0px 24px 50px;}.edw_testimonial_unqreplaceid_ .carousel {max-width: 500px;}.edw_testimonial_unqreplaceid_ .slider .slide {position: static;width: 100%;margin-top: 72px;}.edw_testimonial_unqreplaceid_ .slider .slide .card .card-head {margin-left: 0px;margin-right: 0px;opacity: 1;}.edw_testimonial_unqreplaceid_ .slider .slide .card .card-body .card-desc {opacity: 1;}.edw_testimonial_unqreplaceid_ .slider .slide.active .card .card-icon img:first-child {display: block;}.edw_testimonial_unqreplaceid_ .slider .slide.active .card .card-icon img:last-child {display: none;}.edw_testimonial_unqreplaceid_ .slider .slide.active .card .card-head {background-color: #fff;}.edw_testimonial_unqreplaceid_ .slider .slide.active .card .card-head p {color: #444;}.edw_testimonial_unqreplaceid_ .slider-arrow {display: none !important;}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .edw_testimonial_unqreplaceid_ .slider .slide {width: 56%;left: -94%;}.edw-limitedwidth-block .edw_testimonial_unqreplaceid_ .slider .slide.next {right: -36%;left: unset;}.edw-limitedwidth-block .edw_testimonial_unqreplaceid_ .slider .slide.prev {left: -36%;}.edw-limitedwidth-block .edw_testimonial_unqreplaceid_ .slider .slide.active {left: 22%;}@keyframes toRightForActiveLimited {from {left: 22%;}to {left: 80%;}}@keyframes toRightForPrevLimited {from {left: -36%;}to {left: 22%;}}@keyframes toRightForNextLimited {from {left: unset;right: -36%;}to {left: unset;right: -94%;}}@keyframes toLeftForActiveLimited {from {left: 22%;}to {left: -36%;}}@keyframes toLeftForPrevLimited {from {left: -36%;}to {left: -94%;}}@keyframes toLeftForNextLimited {from {left: unset;right: -36%;}to {left: unset;right: 22%;}}@keyframes toLeftForNextSiblingLimited {from {left: unset;right: -94%;}to {left: unset;right: -36%;}}}.edw-rtl-block .edw_testimonial_unqreplaceid_ .slider-arrow {flex-direction: row-reverse;}.edw-rtl-block .edw_testimonial_unqreplaceid_ .slider-arrow .left, .edw-rtl-block .edw_testimonial_unqreplaceid_ .slider-arrow .right {transform: rotate(180deg);}`;
        var testimonialjs3 = `new class i{constructor(){this.testimonial=document.querySelector(".edw_testimonial_unqreplaceid_"),this.leftArrow=this.testimonial.querySelector(".slider-arrow .left"),this.rightArrow=this.testimonial.querySelector(".slider-arrow .right"),this.carousel=this.testimonial.querySelector(".carousel"),this.slider=this.testimonial.querySelector(".slider"),this.noOfSlides=this.slider.childElementCount,this.resizeTimer,this.initialExecution=!0,this.isTouchStart=!1,this.startX=0,this.distance=0,this.isHover=!1,this.leftClick=this.leftClick.bind(this),this.rightClick=this.rightClick.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchStop=this.touchStop.bind(this),this.hoverStart=this.hoverStart.bind(this),this.hoverEnd=this.hoverEnd.bind(this),this.handleScreenResize=this.handleScreenResize.bind(this),this.initialize=this.initialize.bind(this),window.addEventListener("load",this.initialize())}initialize(){this.slider.querySelectorAll(".slide").forEach(i=>{i.style.animation="",i.classList.remove("next"),i.classList.remove("prev")}),this.testimonial.querySelector(".slider .slide.active")||this.testimonial.querySelector(".slider .slide").classList.add("active"),this.noOfSlides>1?(this.autoSlide(),this.testimonial.querySelector(".slider-arrow").style.display="flex"):this.testimonial.querySelector(".slider-arrow").style.display="none",this.leftArrow.addEventListener("click",this.leftClick),this.rightArrow.addEventListener("click",this.rightClick),this.slider.addEventListener("touchstart",this.touchStart),this.slider.addEventListener("touchmove",this.touchMove),this.slider.addEventListener("touchend",this.touchStop),this.carousel.addEventListener("mouseenter",this.hoverStart),this.carousel.addEventListener("mouseleave",this.hoverEnd),window.addEventListener("resize",this.handleScreenResize),this.handleScreenResize(),this.initializeSlide(),setTimeout(()=>{console.log("triggered"),this.handleScreenResize()},500)}handleScreenResize(){let i=this.slider.querySelectorAll(".slide .card");if(window.innerWidth<=766)this.slider.style.height="";else{let t=0;i.forEach(i=>{i.offsetHeight>t&&(t=i.offsetHeight)}),this.slider.style.height=t+70+"px"}}initializeSlide(i="",t=""){let e,s=document.querySelector(".edw-limitedwidth-block .edw_testimonial_unqreplaceid_")?"Limited":"";if(i){e=i;let l=this.testimonial.querySelector(".slider .slide.active"),r=this.testimonial.querySelector(".slider .slide.prev"),h=this.testimonial.querySelector(".slider .slide.next");"right"===t&&(l.style.animation="toLeftForActive"+s+" 0.5s ease-in forwards",r&&(r.style.animation="toLeftForPrev"+s+" 0.5s ease-in forwards"),h&&(h.style.animation="toLeftForNext"+s+" 0.5s ease-in forwards")),"left"===t&&(l.style.animation="toRightForActive"+s+" 0.5s ease-in forwards",r&&(r.style.animation="toRightForPrev"+s+" 0.5s ease-in forwards"),h&&(h.style.animation="toRightForNext"+s+" 0.5s ease-in forwards")),l.classList.remove("active"),h&&h.classList.remove("next"),r&&r.classList.remove("prev");let o=e.nextElementSibling,a=e.previousElementSibling;this.noOfSlides>2&&(o||(o=this.testimonial.querySelector(".slider .slide:first-child")),a||(a=this.testimonial.querySelector(".slider .slide:last-child"))),e.classList.add("active"),o&&o.classList.add("next"),a&&a.classList.add("prev"),"right"===t&&o&&(o.style.animation="toLeftForNextSibling"+s+" 0.5s ease-in forwards"),setTimeout(()=>{l&&(l.style.animation=""),r&&(r.style.animation=""),h&&(h.style.animation=""),o&&(o.style.animation="")},500)}else if(this.noOfSlides>1){let n=(e=this.testimonial.querySelector(".slider .slide.active")).nextElementSibling,d=e.previousElementSibling;n||(n=this.testimonial.querySelector(".slider .slide:first-child")),d||(d=this.testimonial.querySelector(".slider .slide:last-child")),n.classList.add("next"),d.classList.add("prev")}}leftClick(){let i=this.testimonial.querySelector(".slider .slide.active").previousElementSibling;i||(i=this.testimonial.querySelector(".slider .slide:last-child")),this.initializeSlide(i,"left")}rightClick(){let i=this.testimonial.querySelector(".slider .slide.active").nextElementSibling;i||(i=this.testimonial.querySelector(".slider .slide:first-child")),this.initializeSlide(i,"right")}hoverStart(){this.isHover=!0}hoverEnd(){this.isHover=!1}autoSlide(){let i=this.carousel.getAttribute("data-interval"),t="hover"===this.carousel.getAttribute("data-pause");"carousel"===this.carousel.getAttribute("data-ride")&&setInterval(()=>{this.isHover&&t||this.rightClick()},i)}touchStart(i){this.isTouchStart=!0,this.startX=i.touches[0].clientX}touchMove(i){this.isTouchStart&&(this.distance=i.touches[0].clientX-this.startX)}touchStop(){this.isTouchStart=!1,this.distance>100?this.leftClick():this.distance<-100&&this.rightClick()}};`;
        var appendnode3 = ` <div class="slide edw-slider-item"> <div class="card"> <div class="card-icon"> <img src="${Vvveb.serverurl}/CDN/testimonialdesign3/images/slider-image/card-icon.svg" alt="card icon"/> <img src="${Vvveb.serverurl}/CDN/testimonialdesign3/images/slider-image/card-icon-active.svg" alt="card icon"/> </div><div class="card-head"> <img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign3/images/slider-image/image-2.png" alt="image 1"> <p class="testimonial-user-name">Gladys Andino</p></div><div class="card-body"> <p class="card-desc desc edw-carousel-content-para">I must say I am very impressed after my visit to The Edwiser School. Most importantly the interaction between children and teachers felt warm and caring. I must say I am very impressed after my visit to The Edwiser School. </p></div></div></div>`;
        Vvveb.Components.extend("_base", "html/testimonial3", {
            name: "Testimonial Design 3 ",
            attributes: ['data-ebpb-testimonail3'],
            image: "icons/testimonial3.svg",
            classes: ['edwiser-testimonial3'],
            html: (() => {
                return `<div class="edwiser-testimonial3" data-vvveb-disabled-area contenteditable="false">${testimonialhtml3}<style>${testimonialcss3}</style><script>${testimonialjs3}</script></div>`;
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
                    applyTextColorsBeforeInit(node, '.slide .card');
                    // removeDuplicateIndicators(node,i);
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Testimonial " + slideno,
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
                                Vvveb.Components.render("html/testimonial3");
                                return node;
                            },
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
                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
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
                        $(node).parent().find('.edw-slider-inner-container').append(appendnode3);
                        Vvveb.Components.render("html/testimonial3");

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
                            $(node).parent().removeAttr('data-ride');
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
                            $(node).parent().attr('data-pause', 'false');
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
                }
            ]
        });

        //Testimonial 4
        var testimonialhtml4 = `<section class="edw_testimonial_unqreplaceid_ edw_adv_slider edw-testimonial-4"><div id="testimonial_unqreplaceid_" class="carousel edw-carousel" data-ride="carousel" data-interval="3000" data-pause="hover"><div class="slider edw-slider-inner-container"><div class="slide active edw-slider-item" data-value="0"><div class="card"><div class="card-left"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign4/images/slider-image/image-1.png" alt="image-1"></div><div class="card-right"><p class="desc edw-carousel-content-para">I have taken their Trade & Stock training course and I loved how they deliver the course with well detailed curriculum. They have highly qualified and experienced trainers. I love it.</p><p class="profile"><span class="testimonial-user-name">Jennifer Lawrence</span><br><label class="testimonial-user-desg">Max Pvt. ltd.</label></p></div></div><div class="backdrop"></div></div><div class="slide edw-slider-item" data-value="1"><div class="card"><div class="card-left"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign4/images/slider-image/image-2.png" alt="image-1"></div><div class="card-right"><p class="desc edw-carousel-content-para">I have taken their Trade & Stock training course and I loved how they deliver the course with well detailed curriculum. They have highly qualified and experienced trainers. I love it.</p><p class="profile"><span class="testimonial-user-name">Jennifer Lawrence</span><br><label class="testimonial-user-desg">Max Pvt. ltd.</label></p></div></div><div class="backdrop"></div></div><div class="slide edw-slider-item" data-value="2"><div class="card"><div class="card-left"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign4/images/slider-image/image-3.png" alt="image-1"></div><div class="card-right"><p class="desc edw-carousel-content-para">I have taken their Trade & Stock training course and I loved how they deliver the course with well detailed curriculum. They have highly qualified and experienced trainers. I love it.</p><p class="profile"><span class="testimonial-user-name">Jennifer Lawrence</span><br><label class="testimonial-user-desg">Max Pvt. ltd.</label></p></div></div><div class="backdrop"></div></div></div><span class="right-arrow  edw-slide-control edw-control-prev"><i class="fa fa-thin fa-arrow-right-long"></i></span><div class="indicators edw-carousel-indicators"><span class="indicator-btn active" data-value="0"></span><span class="indicator-btn" data-value="1"></span><span class="indicator-btn" data-value="2"></span></div><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></div></section>`;
        var testimonialcss4 = ` .edw_testimonial_unqreplaceid_ {padding: 0px 0 50px;background-color: #fff;}.edw_testimonial_unqreplaceid_ h2 {color: #243645;font-size: 40px;font-weight: 400;text-align: center;margin: 0 24px;}.edw_testimonial_unqreplaceid_ .carousel {position: relative;padding: 40px 0 0;overflow: hidden;max-width: 1320px;margin: 0 auto;}.edw_testimonial_unqreplaceid_ .carousel .right-arrow {position: absolute;top: 50%;right: 4%;transform: translateY(-50%);z-index: 10;cursor: pointer;display: flex;justify-content: center;align-items: center;width: 48px;height: 48px;border: 1px solid #FF4F18;background-color: #fff;color: #FF4F18;border-radius: 100%;font-size: 24px;}.edw_testimonial_unqreplaceid_ .carousel .right-arrow:hover {background-color: #FF4F18;color: #fff;}.edw_testimonial_unqreplaceid_ .carousel .indicators {display: flex;gap: 13px;margin: 0 auto;width: fit-content;margin-top: 40px;}.edw_testimonial_unqreplaceid_ .carousel .indicators .indicator-btn {width: 7.061px;height: 7.061px;border-radius: 100%;background-color: #5A60F5;cursor: pointer;}.edw_testimonial_unqreplaceid_ .carousel .indicators .indicator-btn.active {background: linear-gradient(270deg, #FF4F18 0%, #FA9816 100%);}.edw_testimonial_unqreplaceid_ .slider {width: 100%;position: relative;}.edw_testimonial_unqreplaceid_ .slider .slide {width: 76%;height: 100%;overflow: hidden;position: absolute;top: 50%;transform: translateY(-50%);transition-duration: 0.8s;animation-duration: 1s;animation-timing-function: ease-in;border-radius: 4px 137px 4px 4px;overflow: hidden;box-shadow: 0px 6px 18px 0px rgba(0, 0, 0, 0.08);}.edw_testimonial_unqreplaceid_ .slider .slide .card {display: flex;flex-direction: row;height: 100%;border-radius: 0px 137px 4px 0px;border: 1px solid #E4E4E4;background: #FFF;overflow: hidden;}.edw_testimonial_unqreplaceid_ .slider .slide .card-left {width: 36%;position: relative;}.edw_testimonial_unqreplaceid_ .slider .slide .card-left img {position: absolute;left: 0;top: 0;width: 100%;height: 100%;object-fit: cover;object-position: top center;}.edw_testimonial_unqreplaceid_ .slider .slide .card-right {width: 64%;height: fit-content;padding: 60px 87px;display: flex;flex-direction: column;align-items: flex-start;justify-content: center;gap: 17px;}.edw_testimonial_unqreplaceid_ .slider .slide .card-right .desc {color: #666;font-size: 18px;font-style: italic;font-weight: 400;line-height: 28px;margin: 0;}.edw_testimonial_unqreplaceid_ .slider .slide .card-right .profile {color: #9A9A9A;font-size: 18px;font-style: normal;font-weight: 400;line-height: 24px;margin: 0;}.edw_testimonial_unqreplaceid_ .slider .slide .card-right .profile span {font-weight: 700;background: linear-gradient(270deg, #FF4F18 0%, #FA9816 100%);background-clip: text;-webkit-background-clip: text;-webkit-text-fill-color: transparent;}.edw_testimonial_unqreplaceid_ .slider .slide .backdrop {width: 100%;height: 100%;position: absolute;top: 0;left: 0;border-radius: 4px;background: rgba(198, 198, 198, 0.6);transition: opacity 1s ease;}.edw_testimonial_unqreplaceid_ .slider .slide.active {left: 12%;width: 76%;z-index: 10;}.edw_testimonial_unqreplaceid_ .slider .slide.active .backdrop {opacity: 0;}.edw_testimonial_unqreplaceid_ .slider .slide:not(.active) {width: 40%;}@keyframes prev1 {from {left: 12%;z-index: 12;height: 100%;width: 76%;}to {left: 100%;z-index: 12;height: 100%;width: 76%;}}@keyframes prev2 {from {left: 9%;height: calc(100% - 24px);width: 76%;}to {left: 12%;height: 100%;width: 76%;}}@keyframes next1 {from {left: 12%;height: 100%;width: 76%;}to {left: 9%;height: calc(100% - 24px);width: 76%;}}@keyframes next2 {from {left: 100%;height: 100%;width: 76%;z-index: 12;}to {left: 12%;height: 100%;width: 76%;z-index: 12;}}.edw_testimonial_unqreplaceid_ .slider.dragging {cursor: grab;}@media screen and (min-width: 768px) {.edw_testimonial_unqreplaceid_ .slider .slide .card-right {min-height: 357px;}}@media screen and (max-width: 1024px) {.edw_testimonial_unqreplaceid_ .slider .slide .card-right {padding: 50px 60px 50px 50px;}}@media screen and (max-width: 767px) {.edw_testimonial_unqreplaceid_ .right-arrow {display: none !important;}.edw_testimonial_unqreplaceid_ .slider .slide {border-radius: 4px 4px 137px 4px;}.edw_testimonial_unqreplaceid_ .slider .slide .card {flex-wrap: wrap;height: unset;border-radius: 4px 4px 137px 4px;}.edw_testimonial_unqreplaceid_ .slider .slide .card-left {width: 100%;}.edw_testimonial_unqreplaceid_ .slider .slide .card-left img {position: unset;}.edw_testimonial_unqreplaceid_ .slider .slide .card-right {border-radius: 0 0 137px 4px;width: 100%;padding: 50px;}.edw_testimonial_unqreplaceid_ .slider .slide.active {width: 80%;left: 10%;z-index: unset;}.edw_testimonial_unqreplaceid_ .slider .slide:not(.active) {width: 40%;left: -100%;z-index: unset;}@keyframes prev1 {from {left: 10%;width: 80%;}to {left: 100%;width: 80%;}}@keyframes prev2 {from {left: -100%;width: 80%;}to {left: 10%;width: 80%;}}@keyframes next1 {from {left: 10%;width: 80%;}to {left: -100%;width: 80%;}}@keyframes next2 {from {left: 100%;width: 80%;}to {left: 10%;width: 80%;}}}@media screen and (max-width: 450px) {.edw_testimonial_unqreplaceid_ .slide .card-right {padding: 30px 20px !important;gap: 23px !important;}}.edw-rtl-block .edw_testimonial_unqreplaceid_ .carousel .indicators {flex-direction: row-reverse;}`;
        var testimonialjs4 = `new class t{constructor(){this.testimonial=document.querySelector(".edw_testimonial_unqreplaceid_"),this.rightArrow=this.testimonial.querySelector(".right-arrow"),this.indicators=this.testimonial.querySelectorAll(".indicators .indicator-btn"),this.carousel=this.testimonial.querySelector(".carousel"),this.slider=this.testimonial.querySelector(".slider"),this.sliderLength=this.slider.querySelectorAll(".slide").length,this.isDragging=!1,this.isTouchStart=!1,this.startX=0,this.distance=0,this.isHover=!1,this.rightClick=this.rightClick.bind(this),this.indicatorClick=this.indicatorClick.bind(this),this.dragStart=this.dragStart.bind(this),this.dragging=this.dragging.bind(this),this.dragStop=this.dragStop.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchStop=this.touchStop.bind(this),this.hoverStart=this.hoverStart.bind(this),this.hoverEnd=this.hoverEnd.bind(this),this.handleScreenResize=this.handleScreenResize.bind(this),this.initializeEvent(),this.initializeSlides(),this.setCarouselHeight(),this.handleScreenResize(),this.autoSlide()}initializeEvent(){this.rightArrow.addEventListener("click",this.rightClick),this.indicators.forEach(t=>{t.addEventListener("click",this.indicatorClick)}),this.slider.addEventListener("mousedown",this.dragStart),this.slider.addEventListener("mousemove",this.dragging),this.slider.addEventListener("mouseup",this.dragStop),this.slider.addEventListener("touchstart",this.touchStart),this.slider.addEventListener("touchmove",this.touchMove),this.slider.addEventListener("touchend",this.touchStop),this.carousel.addEventListener("mouseenter",this.hoverStart),this.carousel.addEventListener("mouseleave",this.hoverEnd),window.addEventListener("resize",this.handleScreenResize)}initializeSlides(){let t=window.innerWidth,i=this.testimonial.querySelector(".slider .slide.active"),e=i.getAttribute("data-value");if(this.setIndicator(e),t>=767){i.style.zIndex="10",i.style.height="",i.style.left="";let s=i.nextElementSibling,r=3;for(;s;)s.style.height="calc(100% - "+8*r+"px)",s.style.left=12-r+"%",s.style.zIndex=10-r/3,s=s.nextElementSibling,r+=3;for(s=this.slider.firstElementChild;s&&s.getAttribute("data-value")!==e;)s.style.height="calc(100% - "+8*r+"px)",s.style.left=12-r+"%",s.style.zIndex=10-r/3,s=s.nextElementSibling,r+=3}}setCarouselHeight(){let t;t=window.innerWidth<=767?this.testimonial.querySelector(".slider .slide.active .card").offsetHeight:this.testimonial.querySelector(".slider .slide.active .card .card-right").offsetHeight,this.slider.style.height=t+"px"}handleScreenResize(){window.innerWidth<=767?this.testimonial.querySelectorAll(".slider .slide").forEach(t=>{t.style.height="",t.style.left="",t.style.zIndex=""}):this.initializeSlides(),this.setCarouselHeight()}removeAnimationStyle(){this.testimonial.querySelectorAll(".slider .slide").forEach(t=>{t.style.animation=""})}rightClick(t="",i=""){if(this.sliderLength>1){let e=this.testimonial.querySelector(".slider .slide.active"),s;if(s=""===i?e.nextElementSibling:t,e.style.animation="prev1 0.5s ease-in forwards",e.classList.remove("active"),s)s.style.animation="prev2 0.5s ease-in forwards",s.classList.add("active");else{let r=this.slider.firstElementChild;r.style.animation="prev2 0.5s ease-in forwards",r.classList.add("active")}this.setCarouselHeight(),this.initializeSlides(),setTimeout(()=>{this.removeAnimationStyle()},600)}}leftClick(t="",i=""){if(this.sliderLength>1){let e=this.testimonial.querySelector(".slider .slide.active"),s;if(s=""===i?e.previousElementSibling:t,e.style.animation="next1 0.5s ease-in forwards",e.classList.remove("active"),s)s.style.animation="next2 0.5s ease-in forwards",s.classList.add("active");else{let r=this.slider.lastElementChild;r.style.animation="next2 0.5s ease-in forwards",r.classList.add("active")}this.setCarouselHeight(),this.initializeSlides(),setTimeout(()=>{this.removeAnimationStyle()},600)}}setIndicator(t){this.testimonial.querySelectorAll(".indicators .indicator-btn").forEach(i=>{i.classList.remove("active"),i.getAttribute("data-value")==t&&i.classList.add("active")})}indicatorClick(t){let i=this.testimonial.querySelector(".slider .slide.active").getAttribute("data-value"),e=t.target.getAttribute("data-value"),s=this.testimonial.querySelector('.slider [data-value="'+e+'"]'),r=!1,a=this.testimonial.querySelectorAll(".indicators .indicator-btn");for(let l of a){if(l.getAttribute("data-value")===i)break;if(l.getAttribute("data-value")===e){r=!0;break}}i!=e&&(r?this.leftClick(s,e):this.rightClick(s,e))}hoverStart(){this.isHover=!0,console.log(this.isHover)}hoverEnd(){this.isHover=!1,console.log(this.isHover)}autoSlide(){let t=this.carousel.getAttribute("data-interval")||3e3,i="hover"===this.carousel.getAttribute("data-pause");"carousel"===this.carousel.getAttribute("data-ride")&&setInterval(()=>{this.isHover&&i||this.rightClick()},t)}dragStart(t){this.isDragging=!0,this.slider.classList.add("dragging"),this.startX=t.pageX}dragging(t){this.isDragging&&(this.distance=t.pageX-this.startX)}dragStop(){this.isDragging=!1,this.slider.classList.remove("dragging"),this.distance>100?this.rightClick():this.distance<-100&&this.leftClick()}touchStart(t){this.isTouchStart=!0,this.startX=t.touches[0].clientX}touchMove(t){this.isTouchStart&&(this.distance=t.touches[0].clientX-this.startX)}touchStop(){this.isTouchStart=!1,this.distance>100?this.rightClick():this.distance<-100&&this.leftClick()}};`;
        var appendnode4 = ` <div class="slide edw-slider-item" data-value="[[csldatavalue]]"> <div class="card"> <div class="card-left"> <img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign4/images/slider-image/image-1.png" alt="image-1"/> </div><div class="card-right"> <p class="desc edw-carousel-content-para">I have taken their Trade & Stock training course and I loved how they deliver the course with well detailed curriculum. They have highly qualified and experienced trainers. I love it. </p><p class="profile"> <span class="testimonial-user-name" >Jennifer Lawrence</span><br><label class="testimonial-user-desg">Max Pvt. ltd.</label> </p></div></div><div class="backdrop"></div></div>`;
        Vvveb.ComponentsGroup['Edwiser Testimonials'] = blocks;
        Vvveb.Components.extend("_base", "html/testimonial4", {
            name: "Testimonial Design 4 ",
            attributes: ['data-ebpb-testimonail4'],
            image: "icons/testimonial4.svg",
            classes: ['edwiser-testimonial4'],
            html: (() => {
                return `<div  class="edwiser-testimonial4" data-vvveb-disabled-area contenteditable="false">${testimonialhtml4}<style>${testimonialcss4}</style><script>${testimonialjs4}</script></div>`;
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
                    $(this).attr('data-value', i - 1);
                    // removeDuplicateIndicators(node,i);
                    applyTextColorsBeforeInit(node, '.slide .card-right');
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Testimonial " + slideno,
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
                                Vvveb.Components.render("html/testimonial4");
                                return node;
                            },
                        },
                        {
                            name: SETTINGTITLES.TESTIMONIAL,
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
                            // onChange: function (node, value, input) {
                            // $(node).parent().find(this.child).css("background-image", "url(" + value + ")");
                            // var datavalue = $(node).closest('.carousel-item').attr('data-value');
                            // $(node).closest('.edw-carousel').find(`.carousel-footer div[data-value=${datavalue}]`).find(`img`).attr('src',value);
                            // return node;
                            // }
                        }
                    );
                });
                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);
                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
                }
                Indicatordesign2(node, i)
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
                        $(node).parent().find('.edw-slider-inner-container').append(appendnode4);
                        Vvveb.Components.render("html/testimonial4");

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
                            $(node).parent().removeAttr('data-ride');
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
                            $(node).parent().attr('data-pause', 'false');
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
                }
            ]



        });


        //Testimonial 5
        var testimonialhtml5 = `<section class="edw_testimonial_unqreplaceid_ edw_adv_slider edw-testimonial-5"><div id="testimonial-carousel-5_unqreplaceid_" class="carousel carousel-dark slide edw-carousel" data-ride="carousel" data-interval="3000" data-pause="hover" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover"><div class="carousel-inner edw-slider-inner-container" id="carousel_container_unqreplaceid_"><div class="carousel-item edw-slider-item active" data-value="0"><div class="item-container"><div class="content-box"><div class="profile-image-box"><div><div><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign5/images/profile-images/profile-1.svg" alt="profile-1"></div></div></div><div class="card-icon"><img src="${Vvveb.serverurl}/CDN/testimonialdesign5/images/card-icon.svg" alt="card icon"></div><p class="profile-desc"><span class="testimonial-user-name">BERND KRAUSE</span>,<label class="testimonial-user-desg">Sumega GmbH</label></p><p class="card-desc-box ellipsis"><span class="card-desc edw-carousel-content-para">Edwiser RemUI instantly elevates the look-and-feel of Moodle for everyone - teachers, admins and students alike. I like how the course format plugin functions on the front page. The course formats and the simple navigation help a great deal because my students have a good understanding of my offerings and the overall course structure. They are clear about what to do and where to go on the site, making learning easier. Edwiser RemUI beautifully handholds them through the process.</span><span class="readMoreBtn">read more</span><span class="readLessBtn">read less</span></p></div></div></div><div class="carousel-item edw-slider-item" data-value="1"><div class="item-container"><div class="content-box"><div class="profile-image-box"><div><div><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign5/images/profile-images/profile-2.svg" alt="profile-1"></div></div></div><div class="card-icon"><img src="${Vvveb.serverurl}/CDN/testimonialdesign5/images/card-icon.svg" alt="card icon"></div><p class="profile-desc"><span class="testimonial-user-name">BERND KRAUSE</span>,<label class="testimonial-user-desg">Sumega GmbH</label></p><p class="card-desc-box ellipsis"><span class="card-desc edw-carousel-content-para">Edwiser RemUI instantly elevates the look-and-feel of Moodle for everyone - teachers, admins and students alike. I like how the course format plugin functions on the front page. The course formats and the simple navigation help a great deal because my students have a good understanding of my offerings and the overall course structure. They are clear about what to do and where to go on the site, making learning easier. Edwiser RemUI beautifully handholds them through the process.</span><span class="readMoreBtn">read more</span><span class="readLessBtn">read less</span></p></div></div></div><div class="carousel-item edw-slider-item" data-value="2"><div class="item-container"><div class="content-box"><div class="profile-image-box"><div><div><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign5/images/profile-images/profile-3.png" alt="profile-1"></div></div></div><div class="card-icon"><img src="${Vvveb.serverurl}/CDN/testimonialdesign5/images/card-icon.svg" alt="card icon"></div><p class="profile-desc"><span class="testimonial-user-name">BERND KRAUSE</span>,<label class="testimonial-user-desg">Sumega GmbH</label></p><p class="card-desc-box ellipsis"><span class="card-desc edw-carousel-content-para">Edwiser RemUI instantly elevates the look-and-feel of Moodle for everyone - teachers, admins and students alike. I like how the course format plugin functions on the front page. The course formats and the simple navigation help a great deal because my students have a good understanding of my offerings and the overall course structure. They are clear about what to do and where to go on the site, making learning easier. Edwiser RemUI beautifully handholds them through the process.</span><span class="readMoreBtn">read more</span><span class="readLessBtn">read less</span></p></div></div></div></div><button class="carousel-control-prev position-absolute edw-slide-control edw-control-prev border-0 bg-transparent" style="--arrowassetcolor:#3E86F5" type="button" data-target="#testimonial-carousel-5_unqreplaceid_" data-slide="prev" data-bs-target="#testimonial-carousel-5_unqreplaceid_" data-bs-slide="prev"><span class="carousel-control-prev-icon fa fa-light fa-angle-left" aria-hidden="true"></span></button><button class="carousel-control-next position-absolute edw-slide-control edw-control-next border-0 bg-transparent" style="--arrowassetcolor:#3E86F5" type="button" data-target="#testimonial-carousel-5_unqreplaceid_" data-slide="next" data-bs-target="#testimonial-carousel-5_unqreplaceid_" data-bs-slide="next"><span class="carousel-control-next-icon fa fa-light fa-angle-right" aria-hidden="true"></span></button><ol class="carousel-indicators edw-carousel-indicators position-absolute"><li data-target="#testimonial-carousel-5_unqreplaceid_" data-slide-to="0" data-bs-target="#testimonial-carousel-5_unqreplaceid_" data-bs-slide-to="0" class="active"></li><li data-target="#testimonial-carousel-5_unqreplaceid_" data-slide-to="1" data-bs-target="#testimonial-carousel-5_unqreplaceid_" data-bs-slide-to="1"></li><li data-target="#testimonial-carousel-5_unqreplaceid_" data-slide-to="2" data-bs-target="#testimonial-carousel-5_unqreplaceid_" data-bs-slide-to="2"></li></ol><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></div></section>`;
        var testimonialcss5 = `h2.testimonial-title {color: #444;text-align: center;font-size: 35px;font-style: normal;font-weight: 700;line-height: normal;margin-bottom: 12px;}.edw_testimonial_unqreplaceid_ {--arrowassetcolor: #3e86f5;background: transparent;padding: 0px 0px 50px;}.edw_testimonial_unqreplaceid_ h3 {color: #444;text-align: center;font-size: 35px;font-weight: 700;margin: 0;}.edw_testimonial_unqreplaceid_ .desc {color: #555;text-align: center;font-size: 20px;font-weight: 400;margin: 12px 24px 0;}.edw_testimonial_unqreplaceid_ .profile-image-box {width: 209px;height: 209px;border: 1px solid #f1f7ff;border-radius: 100%;display: flex;justify-content: center;align-items: center;position: absolute;top: 0;left: 50%;transform: translate(-50%, -50%);}.edw_testimonial_unqreplaceid_ .profile-image-box div {width: 179px;height: 179px;flex-shrink: 0;border-radius: 100%;background-color: #F1F7FF;display: flex;justify-content: center;align-items: center;}.edw_testimonial_unqreplaceid_ .profile-image-box div div {width: 142.404px;height: 142.404px;border: 1px solid #3E86F5;border-radius: 100%;overflow: hidden;}.edw_testimonial_unqreplaceid_ .profile-image-box div div img {width: 100%;height: 100%;object-fit: cover;}.edw_testimonial_unqreplaceid_ .item-container {max-width: 1032px;margin: 0 auto;padding: 147px 80px 0;}.edw_testimonial_unqreplaceid_ .item-container .content-box {padding: 120px 40px 60px 40px;border-radius: 8px;border: 1px solid #F0F0F0;background: #FFF;box-shadow: 0px 15px 60px 0px rgba(0, 0, 0, 0.06);position: relative;}.edw_testimonial_unqreplaceid_ .item-container .content-box .profile-desc {color: #4c5a73;text-align: center;font-size: 18px;font-weight: 400;}.edw_testimonial_unqreplaceid_ .item-container .content-box .profile-desc span {color: #313848;text-transform: uppercase;font-weight: 600;}.edw_testimonial_unqreplaceid_ .item-container .content-box .card-desc-box {color: #4c5a73;font-size: 18px;font-style: italic;font-weight: 400;line-height: 32px;margin: 12px 0 0;}.edw_testimonial_unqreplaceid_ .item-container .content-box .card-desc-box .readMoreBtn, .edw_testimonial_unqreplaceid_ .item-container .content-box .card-desc-box .readLessBtn {font-weight: 700;cursor: pointer;display: none;}.edw_testimonial_unqreplaceid_ .item-container .card-icon {position: absolute;top: 0;right: 0;width: 134.545px;height: 111px;}.edw_testimonial_unqreplaceid_ .item-container .card-icon img {width: 100%;height: 100%;object-fit: cover;}.edw_testimonial_unqreplaceid_ .carousel-inner {padding-bottom: 50px;}@keyframes toRightAnimation {from {left: unset;right: 0;}to {left: unset;right: -120px;}}@keyframes fromRightAnimation {from {left: unset;right: -120px;}to {left: unset;right: 0;}}.edw_testimonial_unqreplaceid_ .carousel-control-prev, .edw_testimonial_unqreplaceid_ .carousel-control-next {width: 46px;height: 46px;margin: auto 0;color: var(--arrowassetcolor);opacity: 1;transition: all 0.3s ease-out;font-size: 24px;}.edw_testimonial_unqreplaceid_ .carousel-control-prev {right: unset;left: 8%;}.edw_testimonial_unqreplaceid_ .carousel-control-next {left: unset;right: 8%;}.edw_testimonial_unqreplaceid_ .carousel-control-prev-icon, .edw_testimonial_unqreplaceid_ .carousel-control-next-icon {font-size: 24px;filter: unset;}.edw_testimonial_unqreplaceid_ .carousel-control-prev:hover .carousel-control-prev-icon::before {filter: brightness(85%);}.edw_testimonial_unqreplaceid_ .carousel-control-next:hover .carousel-control-next-icon::before {filter: brightness(85%);}.edw_testimonial_unqreplaceid_ .carousel-indicators {margin-bottom: 5px;gap: 11px;}.edw_testimonial_unqreplaceid_ .carousel-indicators li {list-style-type: none;opacity: 1;background-color: #D9D9D9 !important;border: 1px solid #d9d9d9;width: 6px;height: 6px;border-radius: 50%;margin: 0;cursor: pointer;}.edw_testimonial_unqreplaceid_ .carousel-indicators .active {background-color: var(--arrowassetcolor) !important;border: 1px solid var(--arrowassetcolor);}@media screen and (max-width: 1440px) {.edw_testimonial_unqreplaceid_ .carousel-control-prev {left: 3%;}.edw_testimonial_unqreplaceid_ .carousel-control-next {right: 3%;}}@media screen and (max-width: 820px) {.edw_testimonial_unqreplaceid_ .item-container {padding: 147px 24px 0;}.edw_testimonial_unqreplaceid_ .carousel-control-prev, .edw_testimonial_unqreplaceid_ .carousel-control-next {display: none;}}@media screen and (max-width: 600px) {.edw_testimonial_unqreplaceid_ .carousel-control-prev, .edw_testimonial_unqreplaceid_ .carousel-control-next {display: none;}.edw_testimonial_unqreplaceid_ .item-container .card-icon {width: 63.544px;height: 52.425px;}.edw_testimonial_unqreplaceid_ .carousel-footer {width: 370px;}.edw_testimonial_unqreplaceid_ .carousel-indicators {margin-bottom: 16px;}}@media screen and (min-width: 501px) {.edw_testimonial_unqreplaceid_ .item-container .content-box .card-desc-box .readMoreBtn, .edw_testimonial_unqreplaceid_ .item-container .content-box .card-desc-box .readLessBtn {display: none !important;}}@media screen and (max-width: 500px) {.edw_testimonial_unqreplaceid_ .item-container .content-box {padding: 120px 20px 40px;}.edw_testimonial_unqreplaceid_ .item-container .content-box .card-desc-box .readMoreBtn {display: inline;}.edw_testimonial_unqreplaceid_ .item-container .content-box .card-desc-box .hiddenText {display: none;}.edw_testimonial_unqreplaceid_ .item-container .content-box .ellipsis .card-desc {overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 5;-webkit-box-orient: vertical;}.edw_testimonial_unqreplaceid_ .carousel-footer {width: 234px;height: 70px;}.edw_testimonial_unqreplaceid_ .carousel-footer .footer-image-box {height: 112px;width: 234px;}.edw_testimonial_unqreplaceid_ .carousel-footer .footer-image-box .profile-image-box {width: 70px;height: 70px;}.edw_testimonial_unqreplaceid_ .carousel-footer .footer-image-box .profile-image-box div {width: 60.29px;height: 60.29px;}.edw_testimonial_unqreplaceid_ .carousel-footer .footer-image-box .profile-image-box div div {width: 47.964px;height: 47.964px;}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .edw_testimonial_unqreplaceid_ .carousel-control-prev {left: 3%;}.edw-limitedwidth-block .edw_testimonial_unqreplaceid_ .carousel-control-next {right: 3%;}}.edw-rtl-block .edw_testimonial_unqreplaceid_ .carousel-control-prev, .edw-rtl-block .edw_testimonial_unqreplaceid_ .carousel-control-next {transform: rotate(180deg);}`;
        var testimonialjs5 = `document.addEventListener("DOMContentLoaded",function(){new class e{constructor(){this.testimonial=document.querySelector(".edw_testimonial_unqreplaceid_"),this.carousel=this.testimonial.querySelector("#testimonial-carousel-5_unqreplaceid_"),this.readMoreBtn=this.testimonial.querySelectorAll(".content-box .readMoreBtn"),this.readLessBtn=this.testimonial.querySelectorAll(".content-box .readLessBtn"),this.readMoreTrigger=this.readMoreTrigger.bind(this),this.readLessTrigger=this.readLessTrigger.bind(this),this.initializeEventListeners()}initializeEventListeners(){this.readMoreBtn.forEach(e=>{e.addEventListener("click",this.readMoreTrigger)}),this.readLessBtn.forEach(e=>{e.addEventListener("click",this.readLessTrigger)})}readMoreTrigger(e){let t=e.target,i=t.nextElementSibling;t.parentNode.classList.remove("ellipsis"),t.style.display="none",i.style.display="inline"}readLessTrigger(e){let t=e.target,i=t.previousElementSibling;i.parentNode.classList.add("ellipsis"),i.style.display="inline",t.style.display="none"}}});`;
        var appendnode5 = `<div class="carousel-item edw-slider-item" data-value="[[csldatavalue]]"> <div class="item-container"> <div class="content-box"> <div class="profile-image-box"> <div> <div> <img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign5/images/profile-images/profile-2.svg" alt="profile-1"/> </div></div></div><div class="card-icon"> <img src="${Vvveb.serverurl}/CDN/testimonialdesign5/images/card-icon.svg" alt="card icon"/> </div><p class="profile-desc"> <span class="testimonial-user-name">BERND KRAUSE</span> , <label class="testimonial-user-desg">Sumega GmbH</label> </p><p class="card-desc-box ellipsis"> <span class="card-desc edw-carousel-content-para">Edwiser RemUI instantly elevates the look-and-feel of Moodle for everyone - teachers, admins and students alike. I like how the course format plugin functions on the front page. The course formats and the simple navigation help a great deal because my students have a good understanding of my offerings and the overall course structure. They are clear about what to do and where to go on the site, making learning easier. Edwiser RemUI beautifully handholds them through the process. </span> <span class="readMoreBtn">read more</span> <span class="readLessBtn">read less</span> </p></div></div></div>`;
        Vvveb.ComponentsGroup['Edwiser Testimonials'] = blocks;
        Vvveb.Components.extend("_base", "html/testimonial5", {
            name: "Testimonial Design 5 ",
            attributes: ['data-ebpb-testimonail5'],
            image: "icons/testimonial5.svg",
            classes: ['edwiser-testimonial5'],
            html: (() => {
                return `<div  class="edwiser-testimonial5" data-vvveb-disabled-area contenteditable="false">${testimonialhtml5}<style>${testimonialcss5}</style><script>${testimonialjs5}</script></div>`;
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
                    $(this).attr('data-value', i - 1);
                    applyTextColorsBeforeInit(node, '.content-box');
                    // generatesinglecarouselfooteritem(node,this,i-1)
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Testimonial " + slideno,
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
                                // deletecarouselfooterboxitem(node);
                                $(node).remove();
                                Vvveb.Components.render("html/testimonial5");
                                return node;
                            },
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
                            onChange: function (node, value, input) {
                                // $(node).parent().find(this.child).css("background-image", "url(" + value + ")");
                                var datavalue = $(node).closest('.carousel-item').attr('data-value');
                                $(node).closest('.edw-carousel').find(`.carousel-footer div[data-value=${datavalue}]`).find(`img`).attr('src', value);
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
                this.properties = this.properties.filter(function (item) {
                    if(item.edwclasses){
                        return item.edwclasses.indexOf("arrowassetcolor") === -1;
                    }
                    return true;

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
                                    $(node).closest('.edw-carousel').find('.edw-slide-control .fa').css('color', value);
                                    $(node).closest('.edw-carousel').find('.edw-carousel-indicators').css('--arrowassetcolor', value);
                                    // $(node).closest('.edw-carousel').find('.edw-slide-control').css('border-color', value);
                                }

                                return node;
                            }
                        }
                    );
                }
                this.properties = properties.concat(this.properties);
                slidearrowcolorsettingstatushandler($(node),arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFO);
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
                        $(node).parent().find('.edw-slider-inner-container').append(appendnode5);
                        Vvveb.Components.render("html/testimonial5");

                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.PROFILENAMECOLOR,
                    key: "color",
                    inline: true,
                    htmlAttr: "style",
                    col: 12,
                    inputtype: ColorInput,
                    edwclasses: "edwcolorfield",
                    child: '.testimonial-user-name',
                    onChange: function (node, value, input) {
                        $(node).parent().find('.testimonial-user-name').css('color', value);
                    }
                },
                {
                    name: SETTINGTITLES.PROFILEDESGCOLOR,
                    key: "color",
                    inline: true,
                    htmlAttr: "style",
                    col: 12,
                    inputtype: ColorInput,
                    edwclasses: "edwcolorfield",
                    child: ' .testimonial-user-desg',
                    onChange: function (node, value, input) {
                        $(node).parent().find('.testimonial-user-desg').css('color', value);
                    }
                },
                {
                    name: SETTINGTITLES.PROFILEDESCRIPTONCOLOR,
                    key: "color",
                    inline: true,
                    htmlAttr: "style",
                    col: 12,
                    inputtype: ColorInput,
                    edwclasses: "edwcolorfield",
                    child: '.edw-carousel-content-para',
                    onChange: function (node, value, input) {
                        $(node).parent().find('.edw-carousel-content-para').css('color', value);
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
                            $(node).parent().find('.carousel-footer').removeClass('d-none');
                        } else {
                            $(node).parent().find('.edw-control-prev').addClass('d-none');
                            $(node).parent().find('.edw-control-next').addClass('d-none');
                            $(node).parent().find('.carousel-footer').addClass('d-none');
                        }
                        var tempnode = $(node).closest('.edw-carousel')
                        slidearrowcolorsettingstatushandler(tempnode, arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFO);
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
                        slidearrowcolorsettingstatushandler(tempnode, arrow=false, arrowandbullet = true, title = SETTINGTITLES.ARROWASSETCOLORINFO);
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

        //Testimonial 6 --> Video Testimonial 1
        var testimonialhtml6 = `<section class="section-testimonial-design_unqreplaceid_"><div class="carousel wrapper edw-carousel" data-interval="0" data-pause="hover"><div class="slider edw-slider-inner-container"><div class="slide edw-slider-item" data-value="0"><div class="card"><video playsinline="playsinline" controls class="vjs-tech card-video" tabindex="-1" role="application"><source src="${Vvveb.serverurl}/CDN/testimonialdesign6/videos/user1.mp4" type="video/mp4"></video><div class="card-footer"><div class="user-profile"><img src="${Vvveb.serverurl}/CDN/testimonialdesign6/images/users-images/user-1.png" alt="user-1"><div class="user-context"><p class="user-name">Robert Garcia</p><p class="user-role">Manager - Tech Solution</p></div></div></div></div></div><div class="slide edw-slider-item active" data-value="1"><div class="card"><video playsinline="playsinline" controls class="vjs-tech card-video" tabindex="-1" role="application"><source src="${Vvveb.serverurl}/CDN/testimonialdesign6/videos/user2.mp4" type="video/mp4"></video><div class="card-footer"><div class="user-profile"><img src="${Vvveb.serverurl}/CDN/testimonialdesign6/images/users-images/user-2.png" alt="user-2"><div class="user-context"><p class="user-name">Jeana Amber</p><p class="user-role">Manager - Craft Ltd</p></div></div></div></div></div><div class="slide edw-slider-item" data-value="2"><div class="card"><video playsinline="playsinline" controls class="vjs-tech card-video" tabindex="-1" role="application"><source src="${Vvveb.serverurl}/CDN/testimonialdesign6/videos/user3.mp4" type="video/mp4"></video><div class="card-footer"><div class="user-profile"><img src="${Vvveb.serverurl}/CDN/testimonialdesign6/images/users-images/user-3.png" alt="user-2"><div class="user-context"><p class="user-name">JohnDoe</p><p class="user-role">CEO - XYX Solution</p></div></div></div></div></div><div class="slide edw-slider-item" data-value="3"><div class="card"><video playsinline="playsinline" controls class="vjs-tech card-video" tabindex="-1" role="application"><source src="${Vvveb.serverurl}/CDN/testimonialdesign6/videos/user4.mp4" type="video/mp4"></video><div class="card-footer"><div class="user-profile"><img src="${Vvveb.serverurl}/CDN/testimonialdesign6/images/users-images/user-4.png" alt="user-1"><div class="user-context"><p class="user-name">Catherin mole</p><p class="user-role">Founder - Max studio</p></div></div></div></div></div><div class="slide edw-slider-item" data-value="4"><div class="card"><video playsinline="playsinline" controls class="vjs-tech card-video" tabindex="-1" role="application"><source src="${Vvveb.serverurl}/CDN/testimonialdesign6/videos/user2.mp4" type="video/mp4"></video><div class="card-footer"><div class="user-profile"><img src="${Vvveb.serverurl}/CDN/testimonialdesign6/images/users-images/user-2.png" alt="user-2"><div class="user-context"><p class="user-name">Jeana Amber</p><p class="user-role">Manager - Craft Ltd</p></div></div></div></div></div></div><div class="indicators edw-carousel-indicators"><span class="indicator-btn active" data-value="0"></span><span class="indicator-btn" data-value="1"></span><span class="indicator-btn" data-value="2"></span><span class="indicator-btn" data-value="3"></span><span class="indicator-btn" data-value="4"></span></div><div class="slider-arrow"><button class="left edw-slide-control edw-control-prev"><i class="fa fa-light fa-angle-left" aria-hidden="true"></i></button><button class="right edw-slide-control edw-control-next"><i class="fa fa-light fa-angle-right" aria-hidden="true"></i></button></div></div><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></section>`;
        var testimonialcss6 = `.section-testimonial-design_unqreplaceid_ {padding: 20px 0 50px;background: #fff;}.section-testimonial-design_unqreplaceid_ p {margin: 0;}.section-testimonial-design_unqreplaceid_ .wrapper {max-width: 1440px;margin: 0 auto;}.section-testimonial-design_unqreplaceid_ .slider {width: 100%;height: 460px;position: relative;overflow: hidden;}.section-testimonial-design_unqreplaceid_ .slider .slide {width: calc(50% - 16px);height: 100%;position: absolute;left: -76%;top: 50%;transform: translateY(-50%);transition: left 0.5s ease-in, height 0.5s ease-in;}.section-testimonial-design_unqreplaceid_ .slider .card {height: 100%;border-radius: 6px;position: relative;overflow: hidden;background-color: black;}.section-testimonial-design_unqreplaceid_ .slider .card .card-video {width: 100%;height: 100%;}.section-testimonial-design_unqreplaceid_ .slider .card > *:not(.card-footer) {width: 100%;height: calc(100% - 65px);}.section-testimonial-design_unqreplaceid_ .slider .card video {object-fit: cover;}.section-testimonial-design_unqreplaceid_ .slider .card .card-footer {z-index: 2;width: 100%;height: 68px;margin-top: -3px;padding: 10px 30px;background-image: linear-gradient(268.56deg, rgba(101, 65, 204, 0.9) 2.78%, rgba(255, 122, 122, 0.9) 228.38%), linear-gradient(270deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 64.08%);}.section-testimonial-design_unqreplaceid_ .slider .card .card-footer .user-profile {display: flex;gap: 10px;align-items: center;}.section-testimonial-design_unqreplaceid_ .slider .card .card-footer .user-profile img {border-radius: 100%;width: 46px;height: 46px;border: 1px solid #fff;object-fit: cover;}.section-testimonial-design_unqreplaceid_ .slider .card .card-footer .user-profile .user-context {font-size: 16px;line-height: 24px;font-weight: 400;color: #fff;}.section-testimonial-design_unqreplaceid_ .slider .card .card-footer .user-profile .user-context .user-name {font-weight: 700;}.section-testimonial-design_unqreplaceid_ .slider .slide.next {left: calc(75% + 24px);}.section-testimonial-design_unqreplaceid_ .slider .slide.prev {left: calc(-25%);}.section-testimonial-design_unqreplaceid_ .slider .slide:not(.active) {height: 80%;}.section-testimonial-design_unqreplaceid_ .slider .slide:not(.active):after {content: "";position: absolute;top: 0;left: 0;width: 100%;height: 100%;background-image: linear-gradient(0deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 100%);}.section-testimonial-design_unqreplaceid_ .slider .slide.active {left: calc(25% + 16px);height: 100%;}.section-testimonial-design_unqreplaceid_ .slider .slide.active .card .card-icon img:first-child {display: none;}.section-testimonial-design_unqreplaceid_ .slider .slide.active .card .card-icon img:last-child {display: block;}.section-testimonial-design_unqreplaceid_ .slider .slide.active .card .card-header {background-color: #9A3CDF;opacity: 1;}.section-testimonial-design_unqreplaceid_ .slider .slide.active .card .card-header p {color: #FFF;}.section-testimonial-design_unqreplaceid_ .slider .slide.active .card .card-body .card-desc {opacity: 1;}@keyframes toLeftForNext {from {left: calc(75% + 24px);}to {left: 126%;}}@keyframes toLeftForNextSibling {from {left: 126%;}to {left: calc(75% + 24px);}}.section-testimonial-design_unqreplaceid_ .slider.dragging {cursor: grab;}.section-testimonial-design_unqreplaceid_ .indicators {display: flex;gap: 7px;margin: 0 auto;width: fit-content;margin-top: 20px;}.section-testimonial-design_unqreplaceid_ .indicators .indicator-btn {width: 6px;height: 6px;border-radius: 100%;background-color: #D9D9D9;cursor: pointer;}.section-testimonial-design_unqreplaceid_ .indicators .indicator-btn.active {background-color: #1B1440;}.section-testimonial-design_unqreplaceid_ .slider-arrow {display: flex;gap: 29px;width: fit-content;margin: 20px auto 0;}.section-testimonial-design_unqreplaceid_ .slider-arrow .left, .section-testimonial-design_unqreplaceid_ .slider-arrow .right {width: 56px;height: 56px;border: 1px solid #ebebeb;border-radius: 100%;background: #FFF;color: #9A3CDF;filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.12));cursor: pointer;display: flex;justify-content: center;align-items: center;font-size: 24px;}.section-testimonial-design_unqreplaceid_ .slider-arrow .left:hover, .section-testimonial-design_unqreplaceid_ .slider-arrow .right:hover {border: 1px solid #EBEBEB;background: #9A3CDF;color: #fff;}@media screen and (max-width: 1024px) {.section-testimonial-design_unqreplaceid_ {padding-left: 24px;padding-right: 24px;}.section-testimonial-design_unqreplaceid_ .wrapper {max-width: 820px;}.section-testimonial-design_unqreplaceid_ .slider-arrow {display: none;}.section-testimonial-design_unqreplaceid_ .slider .slide, .section-testimonial-design_unqreplaceid_ .slider .slide.prev {width: 100%;left: -104%;}.section-testimonial-design_unqreplaceid_ .slider .slide.next {left: 104%;}.section-testimonial-design_unqreplaceid_ .slider .slide.active {left: 0%;}@keyframes toLeftForNext {from {left: 104%;}to {left: 126%;}}@keyframes toLeftForNextSibling {from {left: 104%;}to {left: 104%;}}}@media screen and (max-width: 768px) {.section-testimonial-design_unqreplaceid_ .wrapper {max-width: 600px;}.section-testimonial-design_unqreplaceid_ .slider {height: 300px;}}.section-testimonial-design_unqreplaceid_ .mediaplugin {margin: 0px !important;height: 100% !important;}.section-testimonial-design_unqreplaceid_ .mediaplugin div {max-width: unset !important;}.section-testimonial-design_unqreplaceid_ .mediaplugin > *:first-child {height: 100%;}.section-testimonial-design_unqreplaceid_ .mediaplugin .vjs-big-play-button {width: 50px;height: 50px;border-radius: 100%;border: 1px solid #6541CC;top: 50%;left: 50%;right: unset;transform: translate(-50%, -50%);margin-top: unset;margin-left: unset;background-color: rgba(255, 255, 255, 0.8);}.section-testimonial-design_unqreplaceid_ .mediaplugin .vjs-big-play-button .vjs-icon-placeholder:before {color: #6541CC !important;}.section-testimonial-design_unqreplaceid_ .mediaplugin .vjs-fluid:not(.vjs-audio-only-mode) {padding-top: unset !important;}.edw-rtl-block .section-testimonial-design_unqreplaceid_ .indicators {flex-direction: row-reverse;}.edw-rtl-block .section-testimonial-design_unqreplaceid_ .slider-arrow {flex-direction: row-reverse;}.edw-rtl-block .section-testimonial-design_unqreplaceid_ .slider-arrow .left, .edw-rtl-block .section-testimonial-design_unqreplaceid_ .slider-arrow .right {transform: rotate(180deg);}`;
        var testimonialjs6 = `class TestimonialDesign3_unqreplaceid_{constructor(){this.testimonial=document.querySelector(".section-testimonial-design_unqreplaceid_"),this.leftArrow=this.testimonial.querySelector(".slider-arrow .left"),this.rightArrow=this.testimonial.querySelector(".slider-arrow .right"),this.indicators=this.testimonial.querySelectorAll(".indicators .indicator-btn"),this.carousel=this.testimonial.querySelector(".carousel"),this.slider=this.testimonial.querySelector(".slider"),this.resizeTimer,this.initialExecution=!0,this.isTouchStart=!1,this.startX=0,this.distance=0,this.touchTimeout=null,this.isHover=!1,this.leftClick=this.leftClick.bind(this),this.rightClick=this.rightClick.bind(this),this.indicatorClick=this.indicatorClick.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchStop=this.touchStop.bind(this),this.hoverStart=this.hoverStart.bind(this),this.hoverEnd=this.hoverEnd.bind(this),this.initializeEventListeners(),this.initializeSlide(),this.carousel.querySelectorAll(".mediaplugin")&&this.carousel.querySelectorAll(".mediaplugin div").forEach(t=>{t.style.maxWidth="unset"})}initializeEventListeners(){this.leftArrow.addEventListener("click",this.leftClick),this.rightArrow.addEventListener("click",this.rightClick),this.indicators.forEach(t=>{t.addEventListener("click",this.indicatorClick)}),this.carousel.addEventListener("touchstart",this.touchStart),this.carousel.addEventListener("touchmove",this.touchMove),this.carousel.addEventListener("touchend",this.touchStop),this.carousel.addEventListener("mouseenter",this.hoverStart),this.carousel.addEventListener("mouseleave",this.hoverEnd),window.addEventListener("resize",this.handleScreenResize)}initializeSlide(t="",i=""){let e;if(t){e=t;let s=this.testimonial.querySelector(".slider .slide.active");this.resetSlideVideo(s);let l=this.testimonial.querySelector(".slider .slide.prev"),r=this.testimonial.querySelector(".slider .slide.next");"left"===i&&(r.style.animation="toLeftForNext 0.5s ease-in forwards"),s.classList.remove("active"),r.classList.remove("next"),l.classList.remove("prev");let a=e.nextElementSibling,o=e.previousElementSibling;a||(a=this.testimonial.querySelector(".slider .slide:first-child")),o||(o=this.testimonial.querySelector(".slider .slide:last-child")),e.classList.add("active"),a.classList.add("next"),o.classList.add("prev"),"right"===i&&(a.style.animation="toLeftForNextSibling 0.5s ease-in forwards"),setTimeout(()=>{r.style.animation="",a.style.animation=""},500)}else{e=this.testimonial.querySelector(".slider .slide.active");let h=this.testimonial.querySelector(".slider .slide.prev"),n=this.testimonial.querySelector(".slider .slide.next");h&&h.classList.remove("prev"),n&&n.classList.remove("prev");let c=e.nextElementSibling,d=e.previousElementSibling;c||(c=this.testimonial.querySelector(".slider .slide:first-child")),d||(d=this.testimonial.querySelector(".slider .slide:last-child")),c.classList.add("next"),d.classList.add("prev");let u=this.testimonial.querySelectorAll(".slide");for(let v=0;v<u.length;v++){let S=u[v];this.resetSlideVideo(S)}}this.setIndicator(e.getAttribute("data-value"))}resetSlideVideo(t){let i=t.querySelector("video");i&&(i.pause(),i.currentTime=0)}leftClick(){let t=this.testimonial.querySelector(".slider .slide.active").previousElementSibling;t||(t=this.testimonial.querySelector(".slider .slide:last-child")),this.initializeSlide(t,"left")}rightClick(){let t=this.testimonial.querySelector(".slider .slide.active").nextElementSibling;t||(t=this.testimonial.querySelector(".slider .slide:first-child")),this.initializeSlide(t,"right")}setIndicator(t){this.indicators.forEach(i=>{i.classList.remove("active"),i.getAttribute("data-value")==t&&i.classList.add("active")})}indicatorClick(t){let i=t.target.getAttribute("data-value"),e=this.testimonial.querySelector(".indicators .indicator-btn.active").getAttribute("data-value"),s=this.testimonial.querySelector('.slider [data-value="'+i+'"]'),l="left";for(let r=0;r<this.indicators.length;r++){let a=this.indicators[r];if(i==a.getAttribute("data-value"))break;if(e==a.getAttribute("data-value")){l="right";break}}this.initializeSlide(s,l)}hoverStart(){this.isHover=!0}hoverEnd(){this.isHover=!1}autoSlide(){let t=this.carousel.getAttribute("data-interval")||3e3,i="hover"===this.carousel.getAttribute("data-pause");"carousel"===this.carousel.getAttribute("data-ride")&&setInterval(()=>{i&&this.isHover||this.rightClick()},t)}touchStart(t){this.isHover=!0,this.isTouchStart=!0,this.startX=t.touches[0].clientX}touchMove(t){this.isHover=!0,this.isTouchStart&&(this.distance=t.touches[0].clientX-this.startX)}touchStop(){clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>{this.isHover=!1},1e4),this.distance>100?this.leftClick():this.distance<-100&&this.rightClick(),this.isTouchStart=!1,this.startX=0,this.distance=0,this.touchTimeout=null}}const testimonialDesign3_unqreplaceid_=new TestimonialDesign3_unqreplaceid_;`;
        var appendnode6 = `<div class="slide edw-slider-item" data-value="3"><div class="card"><video playsinline="playsinline" controls class="vjs-tech card-video"  tabindex="-1" role="application"><source src="${Vvveb.serverurl}/CDN/testimonialdesign6/videos/user4.mp4" type="video/mp4"></video><div class="card-footer"><div class="user-profile"><img src="${Vvveb.serverurl}/CDN/testimonialdesign6/images/users-images/user-4.png" alt="user-1"><div class="user-context"><p class="user-name">Catherin mole</p><p class="user-role">Founder - Max studio</p></div></div></div></div></div>`;
        Vvveb.Components.extend("_base", "html/testimonial6", {
            name: "Video Testimonial  1 ",
            attributes: ['data-ebpb-testimonail6'],
            image: "icons/testimonial6.svg",
            classes: ['edwiser-testimonial6'],
            html: (() => {
                return `<div class="edwiser-testimonial6" data-vvveb-disabled-area contenteditable="false">${testimonialhtml6}<style>${testimonialcss6}</style><script>${testimonialjs6}</script></div>`;
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
                    applyTextColorsBeforeInit(node, '.content-box');
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Testimonial " + slideno,
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
                                Vvveb.Components.render("html/testimonial6");
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

                                $parentnode = $(node).closest(".edwiser-testimonial6");
                                setTimeout(function () {
                                    $parentnode.click();;
                                }, 100);

                                return node;
                            },
                        },
                        {
                            name: SETTINGTITLES.TITLE,
                            key: "slidertestimonial" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .card-footer .user-name`,
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
                            child: `.edw-carousel-item-${i} .card-footer .user-role`,
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
                            key: "sliderprofileimage" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwinputfield",
                            child: `.edw-carousel-item-${i} .user-profile img`,
                        },
                    );
                });
                properties = removeDeleteButton(node, properties);
                removeSettingsOnSingleSlide(node);

                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('active');
                }

                if($(node).find('.edw-slider-inner-container').children('.edw-slider-item').length > 1){
                    $(node).find('.edw-slider-item').removeClass('active');
                    $(node).find('.edw-slider-item').eq(1).addClass('active');
                }

                $(node).find('.edw-slider-item.active').prev('.edw-slider-item').addClass('prev');
                $(node).find('.edw-slider-item.active').next('.edw-slider-item').addClass('next');
                Indicatordesign2(node, i);
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
                        $(node).parent().find('.edw-slider-inner-container').append(appendnode6);
                        Vvveb.Components.render("html/testimonial6");

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

                // {
                //     name: SETTINGTITLES.PAUSESLIDESONHOVER,
                //     key: "pauseslides",
                //     htmlAttr: "checked",
                //     col: 12,
                //     inline: true,
                //     inputtype: CheckboxInput,
                //     edwclasses: "edwcheckfield",
                //     child: '.edw-slider-pauseonhover',
                //     onChange: function (node, value, input) {
                //         if (value == true) {
                //             $(node).parent().attr('data-pause', 'hover');
                //             $(node).parent().attr('data-bs-pause', 'hover');
                //         } else {
                //             $(node).parent().attr('data-pause', 'false');
                //             $(node).parent().attr('data-bs-pause', 'false');
                //         }
                //         return node;
                //     }
                // },
            ]
        });

        //Testimonial 7 -- Testimonial Design 6
        var testimonialhtml7 = `<section class="section-testimonial-design_unqreplaceid_ edw_adv_slider"><div class="section-container"><ol class="user-img-wrapper"><li data-target="#edw_testimonial_unqreplaceid_" data-bs-target="#edw_testimonial_unqreplaceid_" data-slide-to="0" data-bs-slide-to="0" class="active"><img src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user1.png" alt="user1" data-target="0"></li><li data-target="#edw_testimonial_unqreplaceid_" data-bs-target="#edw_testimonial_unqreplaceid_" data-slide-to="1" data-bs-slide-to="1"><img src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user2.png" alt="user2" data-target="1"></li><li data-target="#edw_testimonial_unqreplaceid_" data-bs-target="#edw_testimonial_unqreplaceid_" data-slide-to="2" data-bs-slide-to="2"><img src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user3.png" alt="user3" data-target="2"></li><li data-target="#edw_testimonial_unqreplaceid_" data-bs-target="#edw_testimonial_unqreplaceid_" data-slide-to="3" data-bs-slide-to="3"><img src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user4.png" alt="user4" data-target="3"></li><li data-target="#edw_testimonial_unqreplaceid_" data-bs-target="#edw_testimonial_unqreplaceid_" data-slide-to="4" data-bs-slide-to="4"><img src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user5.png" alt="user5" data-target="4"></li><li data-target="#edw_testimonial_unqreplaceid_" data-bs-target="#edw_testimonial_unqreplaceid_" data-slide-to="5" data-bs-slide-to="5"><img src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user6.png" alt="user6" data-target="5"></li><li data-target="#edw_testimonial_unqreplaceid_" data-bs-target="#edw_testimonial_unqreplaceid_" data-slide-to="6" data-bs-slide-to="6"><img src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user7.png" alt="user7" data-target="6"></li><li data-target="#edw_testimonial_unqreplaceid_" data-bs-target="#edw_testimonial_unqreplaceid_" data-slide-to="7" data-bs-slide-to="7"><img src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user8.png" alt="user8" data-target="7"></li><li data-target="#edw_testimonial_unqreplaceid_" data-bs-target="#edw_testimonial_unqreplaceid_" data-slide-to="8" data-bs-slide-to="8"><img src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user9.png" alt="user9" data-target="8"></li><li data-target="#edw_testimonial_unqreplaceid_" data-bs-target="#edw_testimonial_unqreplaceid_" data-slide-to="9" data-bs-slide-to="9"><img src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user10.png" alt="user10" data-target="9"></li></ol><div id="edw_testimonial_unqreplaceid_" class="carousel carousel-dark slide edw-carousel" data-ride="carousel" data-interval="3000" data-pause="hover" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="hover"><div class="carousel-inner edw-slider-inner-container" id="carousel_container"><div class="carousel-item edw-slider-item active" data-value="0" data-target="0"><div class="item-container ellipsis"><p class="item-heading">Learning a language is enjoyable and efficient with his engaging methods</p><div class="desc-box"><p class="item-desc">Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a><div class="item-footer"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user1.png" alt="user1"><div><p class="name testimonial-user-name">John Carter</p><p class="role testimonial-user-desg">German student</p></div></div></div></div><div class="carousel-item edw-slider-item" data-target="1"><div class="item-container ellipsis"><p class="item-heading">Learning a language is enjoyable and efficient with his engaging methods</p><div class="desc-box"><p class="item-desc">Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global .</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a><div class="item-footer"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user2.png" alt="user2"><div><p class="name testimonial-user-name">John Carter</p><p class="role testimonial-user-desg">German student</p></div></div></div></div><div class="carousel-item edw-slider-item" data-target="2"><div class="item-container ellipsis"><p class="item-heading">Learning a language is enjoyable and efficient with his engaging methods</p><div class="desc-box"><p class="item-desc">Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a><div class="item-footer"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user3.png" alt="user3"><div><p class="name testimonial-user-name">John Carter</p><p class="role testimonial-user-desg">German student</p></div></div></div></div><div class="carousel-item edw-slider-item" data-target="3"><div class="item-container ellipsis"><p class="item-heading">Learning a language is enjoyable and efficient with his engaging methods</p><div class="desc-box"><p class="item-desc">Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a><div class="item-footer"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user4.png" alt="user3"><div><p class="name testimonial-user-name">John Carter</p><p class="role testimonial-user-desg">German student</p></div></div></div></div><div class="carousel-item edw-slider-item" data-target="4"><div class="item-container ellipsis"><p class="item-heading">Learning a language is enjoyable and efficient with his engaging methods</p><div class="desc-box"><p class="item-desc">Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a><div class="item-footer"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user5.png" alt="user4"><div><p class="name testimonial-user-name">John Carter</p><p class="role testimonial-user-desg">German student</p></div></div></div></div><div class="carousel-item edw-slider-item" data-target="5"><div class="item-container ellipsis"><p class="item-heading">Learning a language is enjoyable and efficient with his engaging methods</p><div class="desc-box"><p class="item-desc">Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a><div class="item-footer"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user6.png" alt="user5"><div><p class="name testimonial-user-name">John Carter</p><p class="role testimonial-user-desg">German student</p></div></div></div></div><div class="carousel-item edw-slider-item" data-target="6"><div class="item-container ellipsis"><p class="item-heading">Learning a language is enjoyable and efficient with his engaging methods</p><div class="desc-box"><p class="item-desc">Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a><div class="item-footer"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user7.png" alt="user1"><div><p class="name testimonial-user-name">John Carter</p><p class="role testimonial-user-desg">German student</p></div></div></div></div><div class="carousel-item edw-slider-item" data-target="7"><div class="item-container ellipsis"><p class="item-heading">Learning a language is enjoyable and efficient with his engaging methods</p><div class="desc-box"><p class="item-desc">Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a><div class="item-footer"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user8.png" alt="user8"><div><p class="name testimonial-user-name">John Carter</p><p class="role testimonial-user-desg">German student</p></div></div></div></div><div class="carousel-item edw-slider-item" data-target="8"><div class="item-container ellipsis"><p class="item-heading">Learning a language is enjoyable and efficient with his engaging methods</p><div class="desc-box"><p class="item-desc">Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a><div class="item-footer"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user9.png" alt="user9"><div><p class="name testimonial-user-name">John Carter</p><p class="role testimonial-user-desg">German student</p></div></div></div></div><div class="carousel-item edw-slider-item" data-target="9"><div class="item-container ellipsis"><p class="item-heading">Learning a language is enjoyable and efficient with his engaging methods</p><div class="desc-box"><p class="item-desc">Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global communication lifelong love for better language.Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive.</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a><div class="item-footer"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user10.png" alt="user1"><div><p class="name testimonial-user-name">John Carter</p><p class="role testimonial-user-desg">German student</p></div></div></div></div></div><div class="action-wrapper"><button class="carousel-control-prev position-absolute edw-slide-control edw-control-prev" type="button" data-target="#edw_testimonial_unqreplaceid_" data-slide="prev" data-bs-target="#edw_testimonial_unqreplaceid_" data-bs-slide="prev"><span class="fa fa-light fa-angle-left" aria-hidden="true"></span></button><button class="carousel-control-next position-absolute edw-slide-control edw-control-next" type="button" data-target="#edw_testimonial_unqreplaceid_" data-slide="next" data-bs-target="#edw_testimonial_unqreplaceid_" data-bs-slide="next"><span class="fa fa-light fa-angle-right" aria-hidden="true"></span></button></div></div></div><input name="navigationbutton" class="form-check-input edw-slider-navigationbutton" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-navigationbullets" type="checkbox" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-autoplay" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-slider-pauseonhover" type="checkbox" checked="checked" style="display:none!important"></section>`;
        var testimonialcss7 = `.section-testimonial-design_unqreplaceid_ {background-color: #07141F;padding: 40px 24px 10px;}.section-testimonial-design_unqreplaceid_:has(.carousel-item.active[data-target="0"]) .user-img-wrapper img[data-target="0"] {filter: brightness(1) saturate(1);}.section-testimonial-design_unqreplaceid_:has(.carousel-item.active[data-target="1"]) .user-img-wrapper img[data-target="1"] {filter: brightness(1) saturate(1);}.section-testimonial-design_unqreplaceid_:has(.carousel-item.active[data-target="2"]) .user-img-wrapper img[data-target="2"] {filter: brightness(1) saturate(1);}.section-testimonial-design_unqreplaceid_:has(.carousel-item.active[data-target="3"]) .user-img-wrapper img[data-target="3"] {filter: brightness(1) saturate(1);}.section-testimonial-design_unqreplaceid_:has(.carousel-item.active[data-target="4"]) .user-img-wrapper img[data-target="4"] {filter: brightness(1) saturate(1);}.section-testimonial-design_unqreplaceid_:has(.carousel-item.active[data-target="5"]) .user-img-wrapper img[data-target="5"] {filter: brightness(1) saturate(1);}.section-testimonial-design_unqreplaceid_:has(.carousel-item.active[data-target="6"]) .user-img-wrapper img[data-target="6"] {filter: brightness(1) saturate(1);}.section-testimonial-design_unqreplaceid_:has(.carousel-item.active[data-target="7"]) .user-img-wrapper img[data-target="7"] {filter: brightness(1) saturate(1);}.section-testimonial-design_unqreplaceid_:has(.carousel-item.active[data-target="8"]) .user-img-wrapper img[data-target="8"] {filter: brightness(1) saturate(1);}.section-testimonial-design_unqreplaceid_:has(.carousel-item.active[data-target="9"]) .user-img-wrapper img[data-target="9"] {filter: brightness(1) saturate(1);}.section-testimonial-design_unqreplaceid_ .section-container {max-width: 1320px;margin: 0 auto;}.section-testimonial-design_unqreplaceid_ .user-img-wrapper {position: relative;display: flex;justify-content: center;grid-gap: 25px;flex-wrap: wrap-reverse;width: calc(100% + 1px);margin: 0;padding: 0;}.section-testimonial-design_unqreplaceid_ .user-img-wrapper li {width: calc(20% - 20px);height: 192px;margin: 0;padding: 0;cursor: pointer;list-style: none;}.section-testimonial-design_unqreplaceid_ .user-img-wrapper img {width: 100%;height: 100%;object-fit: cover;object-position: top;border-radius: 12px;filter: brightness(0.5) saturate(0.5);}.section-testimonial-design_unqreplaceid_ .carousel {margin-top: -30px;}.section-testimonial-design_unqreplaceid_ .carousel-inner {padding-bottom: 30px;display: flex;}.section-testimonial-design_unqreplaceid_ .carousel-item {margin-right: -100%;margin-left: unset;}.section-testimonial-design_unqreplaceid_ .item-container {display: flex;flex-direction: column;max-width: 884px;margin: 0 auto;padding: 40px;border-radius: 10px;background-image: linear-gradient(180deg, #006455 0%, rgba(0, 100, 85, 0) 100%), url("${Vvveb.serverurl}/CDN/testimonialdesign7/images/pattern.png");background-position: top right;background-repeat: no-repeat;box-shadow: 0px 35px 50px 0px rgba(0, 0, 0, 0.4);backdrop-filter: blur(20px);}.section-testimonial-design_unqreplaceid_ .item-container p {margin: 0;}.section-testimonial-design_unqreplaceid_ .item-container .item-heading {color: #FFF;font-size: 16px;font-style: normal;font-weight: 700;line-height: normal;}.section-testimonial-design_unqreplaceid_ .item-container .desc-box {max-height: 170px;overflow-y: auto;margin-top: 10px;}.section-testimonial-design_unqreplaceid_ .item-container .item-desc {color: #FFF;font-size: 14px;font-style: normal;font-weight: 400;line-height: 26px;}.section-testimonial-design_unqreplaceid_ .item-container.ellipsis .item-desc {overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 4;-webkit-box-orient: vertical;}.section-testimonial-design_unqreplaceid_ .item-container .item-footer {margin-bottom: 30px;display: flex;gap: 14px;align-items: center;}.section-testimonial-design_unqreplaceid_ .item-container .item-footer img {height: 60px;width: 60px;border-radius: 100%;object-fit: cover;object-position: top;}.section-testimonial-design_unqreplaceid_ .item-container .item-footer .name, .section-testimonial-design_unqreplaceid_ .item-container .item-footer .role {color: #FFF;font-size: 16px;font-style: normal;font-weight: 700;line-height: normal;}.section-testimonial-design_unqreplaceid_ .item-container .item-footer .role {color: #e2e2e2;font-weight: 300;}.section-testimonial-design_unqreplaceid_ .action-wrapper {position: unset !important;}.section-testimonial-design_unqreplaceid_ .readmore-btn, .section-testimonial-design_unqreplaceid_ .readless-btn {display: none;color: #5CFF85;font-size: 14px;font-style: normal;font-weight: 400;line-height: 26px;margin-top: 11px;margin-left: auto;cursor: pointer;}.section-testimonial-design_unqreplaceid_ .ellipsis-active.ellipsis .readmore-btn {display: inline-block;}.section-testimonial-design_unqreplaceid_ .ellipsis-active:not(.ellipsis) .readless-btn {display: inline-block;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev-icon, .section-testimonial-design_unqreplaceid_ .carousel-control-next-icon {font-size: 24px;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev, .section-testimonial-design_unqreplaceid_ .carousel-control-next {width: 50px;height: 50px;background-color: #0B1926;border: 1px solid #5CFF85;border-radius: 50%;font-size: 28px;color: #5CFF85;opacity: 1;transition: all 0.3s ease-out;left: 8%;margin: auto 0;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev:focus, .section-testimonial-design_unqreplaceid_ .carousel-control-next:focus {background-color: #0B1926;color: #5CFF85;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev:hover, .section-testimonial-design_unqreplaceid_ .carousel-control-next:hover {background-color: #5CFF85;color: #0B1926;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev {left: 8%;right: unset;}.section-testimonial-design_unqreplaceid_ .carousel-control-next {left: unset;right: 8%;}@media screen and (max-width: 1440px) {.section-testimonial-design_unqreplaceid_ {overflow: hidden;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev {left: 3%;}.section-testimonial-design_unqreplaceid_ .carousel-control-next {right: 3%;}}@media screen and (max-width: 1200px) {.section-testimonial-design_unqreplaceid_ .carousel-inner {width: 80%;margin-left: auto;margin-right: auto;}.section-testimonial-design_unqreplaceid_ .carousel-control-prev {left: 0%;}.section-testimonial-design_unqreplaceid_ .carousel-control-next {right: 0%;}}@media screen and (max-width: 1024px) {.section-testimonial-design_unqreplaceid_ .section-container {max-width: 820px;}.section-testimonial-design_unqreplaceid_ .carousel-inner {overflow: unset;}.section-testimonial-design_unqreplaceid_ .carousel {margin-top: -20px;}.section-testimonial-design_unqreplaceid_ .item-container {max-width: unset;margin-left: 28px;margin-right: 28px;}.section-testimonial-design_unqreplaceid_ .action-wrapper {position: relative !important;height: 50px;width: 124px;margin: 0 auto 30px;}.section-testimonial-design_unqreplaceid_ .user-img-wrapper {gap: 10px;}.section-testimonial-design_unqreplaceid_ .user-img-wrapper li {width: calc(20% - 8px);height: 150px;}}@media screen and (max-width: 767px) {.section-testimonial-design_unqreplaceid_ .section-container {max-width: 600px;}.section-testimonial-design_unqreplaceid_ .carousel {margin-top: -10px;}.section-testimonial-design_unqreplaceid_ .item-container {padding: 24px;max-width: unset;margin-left: 0px;margin-right: 0px;}.section-testimonial-design_unqreplaceid_ .item-container .item-desc {font-size: 16px;}.section-testimonial-design_unqreplaceid_ .user-img-wrapper li {height: 85px;}.section-testimonial-design_unqreplaceid_ .user-img-wrapper img {border-radius: 4px;}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .section-testimonial-design_unqreplaceid_ .carousel {margin-top: -20px;}.edw-limitedwidth-block .section-testimonial-design_unqreplaceid_ .item-container {max-width: unset;margin-left: 28px;margin-right: 28px;}.edw-limitedwidth-block .section-testimonial-design_unqreplaceid_ .action-wrapper {position: relative;height: 50px;width: 124px;margin: 30px auto 0;}.edw-limitedwidth-block .section-testimonial-design_unqreplaceid_ .user-img-wrapper {gap: 10px;}.edw-limitedwidth-block .section-testimonial-design_unqreplaceid_ .user-img-wrapper li {width: calc(20% - 8px);height: 150px;}.edw-limitedwidth-block .section-testimonial-design_unqreplaceid_ .action-wrapper {position: relative;height: 50px;width: 124px;margin: 30px auto 0;}.edw-limitedwidth-block .section-testimonial-design_unqreplaceid_ .carousel-control-prev {left: 0%;}.edw-limitedwidth-block .section-testimonial-design_unqreplaceid_ .carousel-control-next {right: 0%;}}.edw-rtl-block .section-testimonial-design_unqreplaceid_ .carousel-item {margin-left: -100%;margin-right: unset;}.edw-rtl-block .section-testimonial-design_unqreplaceid_ .carousel-control-prev, .edw-rtl-block .section-testimonial-design_unqreplaceid_ .carousel-control-next {transform: rotate(180deg);}`;
        var testimonialjs7 = `document.addEventListener("DOMContentLoaded",(function(){new class{constructor(){this.testimonial=document.querySelector(".section-testimonial-design_unqreplaceid_"),this.readmorebtns=this.testimonial.querySelectorAll(".readmore-btn"),this.readlessbtns=this.testimonial.querySelectorAll(".readless-btn"),this.readmoreclicked=this.readmoreclicked.bind(this),this.readlessclicked=this.readlessclicked.bind(this),this.initializeEventListeners()}initializeEventListeners(){window.addEventListener("load",(()=>{this.handleEllipsis()})),window.addEventListener("resize",(()=>{this.handleEllipsis()})),this.readmorebtns.forEach((e=>{e.addEventListener("click",this.readmoreclicked)})),this.readlessbtns.forEach((e=>{e.addEventListener("click",this.readlessclicked)})),this.handleEllipsis()}handleEllipsis(){this.testimonial.querySelectorAll(".carousel-item").forEach((function(e){e.style.display="block";let s=e.querySelector(".item-desc"),i=e.querySelector(".item-container");i.classList.contains("ellipsis")||i.classList.add("ellipsis"),s.scrollHeight>s.clientHeight?i.classList.add("ellipsis-active"):i.classList.remove("ellipsis-active"),e.style.display=""}))}readmoreclicked(e){e.target.parentNode.classList.remove("ellipsis")}readlessclicked(e){e.target.parentNode.classList.add("ellipsis")}}}));`;
        var appendnode7 = `<div class="carousel-item edw-slider-item" data-value="1" data-target="1"><div class="item-container ellipsis"><p class="item-heading">Learning a language is enjoyable and efficient with his engaging methods</p><div class="desc-box"><p class="item-desc">Devid Doe's teaching is truly transformative. His engaging methods and personalized approach make learning a new language both enjoyable and efficient. Devid's passion for languages and cultural insights create an immersive. students under his guidance often find themselves not only mastering the language but also gaining a profound appreciation for that transcends traditional language learning. the rich tapestry of global .</p></div><a class="readmore-btn">Read More</a><a class="readless-btn">Read Less</a><div class="item-footer"><img class="edw-profile-img" src="${Vvveb.serverurl}/CDN/testimonialdesign7/images/profile-images/user2.png" alt="user2"><div><p class="name testimonial-user-name">John Carter</p><p class="role testimonial-user-desg">German student</p></div></div></div></div>`;
        Vvveb.Components.extend("_base", "html/testimonial7", {
            name: "Testimonial Design 6 ",
            attributes: ['data-ebpb-testimonail7'],
            image: "icons/testimonial7.svg",
            classes: ['edwiser-testimonial7'],
            html: (() => {
                return `<div class="edwiser-testimonial7" data-vvveb-disabled-area contenteditable="false">${testimonialhtml7}<style>${testimonialcss7}</style><script>${testimonialjs7}</script></div>`;
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
                    $(this).attr("data-target", slideno);
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
                    // applyTextColorsBeforeInit(node, '.content-box');
                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "Testimonial " + slideno,
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
                                Vvveb.Components.render("html/testimonial7");
                                return node;
                            },
                        },
                        {
                            name: SETTINGTITLES.TESTIMONIALHEADING,
                            key: "slidertestimonial" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-carousel-item-${i} .item-container .item-heading`,
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
                            child: `.edw-carousel-item-${i} .item-container .item-desc`,
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
                            name: SETTINGTITLES.PROFILEIMG,
                            key: "sliderprofileimage" + i,
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwinputfield",
                            child: `.edw-carousel-item-${i} .edw-profile-img`,
                            onChange: function (node, value, input) {

                                var parentnode = $(node).closest('.edw_adv_slider');
                                var datatarget = $(node).closest('.edw-slider-item').attr('data-target');

                                $(parentnode).find('.user-img-wrapper').find(`[data-target="${datatarget}"]`).attr('src',value);

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

                createBgImagehtmlT7(node);

                // removeDuplicateIndicators(node, i);
                //remove all option properties

                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                this.properties = properties.concat(this.properties);
                this.properties = disableaddnewslidebutton(node,this.properties, 10);
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
                        header: "Only 10 testimonials are allowed",
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
                        $(node).parent().find('.edw-slider-inner-container').append(appendnode7);
                        Vvveb.Components.render("html/testimonial7");

                        return node;
                    }
                },
                // {
                //     name: SETTINGTITLES.SLIDEBGCOLOR,
                //     key: "background-color",
                //     inline: true,
                //     htmlAttr: "style",
                //     col: 12,
                //     inputtype: ColorInput,
                //     edwclasses: "edwcolorfield",
                //     child: ' .content-box',
                //     onChange: function (node, value, input) {
                //         $(node).css('background-color', value);
                //     }
                // },
                // {
                //     name: SETTINGTITLES.PROFILENAMECOLOR,
                //     key: "color",
                //     inline: true,
                //     htmlAttr: "style",
                //     col: 12,
                //     inputtype: ColorInput,
                //     edwclasses: "edwcolorfield",
                //     child: '.testimonial-user-name',
                //     onChange: function (node, value, input) {
                //         $(node).parent().find('.testimonial-user-name').css('color', value);
                //     }
                // },
                // {
                //     name: SETTINGTITLES.PROFILEDESGCOLOR,
                //     key: "color",
                //     inline: true,
                //     htmlAttr: "style",
                //     col: 12,
                //     inputtype: ColorInput,
                //     edwclasses: "edwcolorfield",
                //     child: '.testimonial-user-desg',
                //     onChange: function (node, value, input) {
                //         $(node).parent().find('.testimonial-user-desg').css('color', value);
                //     }
                // },
                // {
                //     name: SETTINGTITLES.PROFILEDESCRIPTONCOLOR,
                //     key: "color",
                //     inline: true,
                //     htmlAttr: "style",
                //     col: 12,
                //     inputtype: ColorInput,
                //     edwclasses: "edwcolorfield",
                //     child: '.edw-carousel-content-para',
                //     onChange: function (node, value, input) {
                //         $(node).parent().find('.edw-carousel-content-para').css('color', value);
                //     }
                // },

                // {
                //     name: "Testimonial title",
                //     key: "testimonialtitle",
                //     htmlAttr: "innerHTML",
                //     child: `.edw-testimonial-heading`,
                //     inputtype: TextInput,
                //     onChange: function (node, value, input) {
                //         if (value == "") {
                //             $(node).hide();
                //         } else {
                //             $(node).show().text(value);
                //         }
                //     }
                // },
                // {
                //     name: "Testimonial Description",
                //     key: "testimonialdescription",
                //     htmlAttr: "innerHTML",
                //     child: `.edw-testimonial-desc`,
                //     inputtype: TextInput,
                //     onChange: function (node, value, input) {
                //         if (value == "") {
                //             $(node).hide();
                //         } else {
                //             $(node).show().text(value);
                //         }
                //     }
                // },
                // {
                //     name: "Testimonial Background Image",
                //     key: "Testimonialbgimage",
                //     htmlAttr: 'data-url',
                //     inputtype: ImageInput,
                //     child: `.edw_adv_slider`,
                //     onChange: function (node, value, input) {
                //         $(node).parent().find(this.child).css("background-image", "url(" + value + ")");
                //         return node;
                //     }
                // },
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
                //     col: 12,
                //     inline: true,
                //     inputtype: CheckboxInput,
                //     edwclasses: "edwcheckfield",
                //     child: '.edw-slider-navigationbullets',
                //     onChange: function (node, value, input) {
                //         if (value == true) {
                //             $(node).parent().find('.edw-carousel-indicators').removeClass('d-none');
                //         } else {
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
    }
    function removeDuplicateIndicators(node, i) {
        $(node).find(".edw-carousel-indicators").empty();
        var id = $(node).find('.edw-carousel').attr('id');
        var x = 0;
        $(node).find(".edw-slider-item").each(function (e) {
            $(node).find(".carousel-indicators").append(`<li data-target="#${id}" data-slide-to="${x}"  data-bs-target="#${id}" data-bs-slide-to="${x}"></li>`);
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

    // This method will create images present in background of Testimonial 7
    function createBgImagehtmlT7(node){
        var html = "";
        // find src links of all the images inside the footer image class and create image html
        $(node).find('.edw-slider-item').each(function () {
            var src  = $(this).find('.item-footer img').attr('src');
            var dataTarget  = $(this).attr('data-target');
            var nodeId = $(this).closest('.edw-carousel').attr('id');
            if(dataTarget == 0){
               html +=  `<li data-target="#${nodeId}" data-slide-to='${dataTarget}'  data-bs-target="#${nodeId}" data-bs-slide-to='${dataTarget}' class="active">
                            <img src="${src}" alt="Image-${dataTarget}" data-target='${dataTarget}'>
                        </li>`
            }
            else{
                html += `<li data-target="#${nodeId}" data-slide-to='${dataTarget}'  data-bs-target="#${nodeId}" data-bs-slide-to='${dataTarget}' class="">
                            <img src="${src}" alt="Image-${dataTarget}" data-target='${dataTarget}'>
                        </li>`;
            }

        });

        $(node).find('.user-img-wrapper').empty().append(html);
    }
    return {
        init: function () {
            var blocks = ["html/testimonial1", "html/testimonial2", , "html/testimonial3", "html/testimonial4", "html/testimonial5","html/testimonial6","html/testimonial7"];
            addBlocks(blocks);
        }
    }

});
