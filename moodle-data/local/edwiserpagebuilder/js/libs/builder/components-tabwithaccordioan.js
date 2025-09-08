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
define('local_edwiserpagebuilder/components-tabwithaccordioan', ['local_edwiserpagebuilder/jquery', 'core/ajax'], function (jQuery, Ajax) {

    function addBlocks(blocks) {
        Vvveb.ComponentsGroup['Edwiser Accordions'] = blocks;
        var SETTINGTITLES = {
            TITLE: 'Title',
            TITLECOLOR: 'Title color',
            DESCRIPTION: 'Description',
            DESCRIPTIONCOLOR: 'Description Color',
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
            SHOWNAVIGATIONBUTTONS: 'Show navigation buttons',
            SHOWNAVIGATIONBULLETS: 'Show navigation bullets',
            SHOWNAVIGATIONBUTTONSDESKANDTAB: 'Show navigation buttons(Desktop and Tablet only)',
            SHOWNAVIGATIONBUTTONSDESKTOP: 'Show navigation buttons(Desktop only)',
            SHOWNAVIGATIONBULLETSMOB: 'Show navigation bullets(Mobile only)',
            AUTOPLAYSLIDES: 'Autoplay slides',
            PAUSESLIDESONHOVER: 'Pause slides on hover',
            SLIDEINTERVAL: 'Slide interval',
            SWITCHTITLE: 'Nav Title',
            TABTITLE: 'Tab Title',
            FAQTITLE:'FAQ title',
            FAQDESCRIPTION:'FAQ description',
            FAQSHOWHIDESEARCHFIELDTITLE:'Show/Hide searchfield',
            FAQPAGINATESETTINGTITLE:'Paginate FAQ',
            FAQPAGINATEPERPAGESETTINGTITLE:"FAQ Per Page"

        };

        // Tabhtml1 --> FAQ design only for dev purpose
        var tabhtml1 = `<section class="section-faq-design edw-tab_unqreplaceid_"><div class="section-container"><div class="main-container"><div class="nav buttons-wrapper edw-nav-wrapper" id="v-pills-tab" role="tablist"><button class="btn-tab edw-tab-btn active" id="activates-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#activates_unqreplaceid_" data-bs-target="#activates_unqreplaceid_" type="button" role="tab" aria-controls="activates" aria-selected="true"><img class="edw-nav-icon-img" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/activates.svg" alt="activates"><span class="edw-nav-tab-text">Activates</span></button><button class="btn-tab edw-tab-btn" id="guidance-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#guidance_unqreplaceid_" data-bs-target="#guidance_unqreplaceid_" type="button" role="tab" aria-controls="guidance" aria-selected="false"><img class="edw-nav-icon-img" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/guidance.svg" alt="guidance"><span class="edw-nav-tab-text">Guidance</span></button><button class="btn-tab edw-tab-btn" id="summary-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#summary_unqreplaceid_" data-bs-target="#summary_unqreplaceid_" type="button" role="tab" aria-controls="summary" aria-selected="false"><img class="edw-nav-icon-img" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/summary.svg" alt="summary"><span class="edw-nav-tab-text">Summary</span></button><button class="btn-tab edw-tab-btn" id="policy-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#policy_unqreplaceid_" data-bs-target="#policy_unqreplaceid_" type="button" role="tab" aria-controls="policy" aria-selected="false"><img class="edw-nav-icon-img" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/policy.svg" alt="policy"><span class="edw-nav-tab-text">Policy</span></button><button class="btn-tab edw-tab-btn" id="rules-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#rules_unqreplaceid_" data-bs-target="#rules_unqreplaceid_" type="button" role="tab" aria-controls="rules" aria-selected="false"><img class="edw-nav-icon-img" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/rules.svg" alt="rules"><span class="edw-nav-tab-text">Rules</span></button></div><div class="tab-content edw-slider-inner-container" id="v-pills-tabContent"><div class="tab-pane edw-slider-item fade show active" id="activates_unqreplaceid_" role="tabpanel" aria-labelledby="activates-tab"><div class="accordion accordion-box" id="accordionExample"><div class="faq-card"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><span>Safe School Environments</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne" class="collapse show"><div class="faq-card-body"><ul><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li><li>Implement measures to ensure physical and emotional safety.<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li></ul></div></div></div><div class="faq-card"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><span>Social Emotional and Behavioural Support</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseTwo" class="collapse"><div class="faq-card-body"><ul><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li></ul></div></div></div><div class="faq-card"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><span>Returning To School</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseThree" class="collapse"><div class="faq-card-body"><ul><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li></ul></div></div></div><div class="faq-card"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"><span>School annual function</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseFour" class="collapse"><div class="faq-card-body"><ul><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li></ul></div></div></div></div></div><div class="tab-pane edw-slider-item fade" id="guidance_unqreplaceid_" role="tabpanel" aria-labelledby="guidance-tab"><div class="accordion accordion-box" id="accordionExample2"><div class="faq-card"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne2" aria-expanded="true" aria-controls="collapseOne2"><span>Safe School Environments</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne2" class="collapse show"><div class="faq-card-body"><ul><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li><li>Implement measures to ensure physical and emotional safety.<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li></ul></div></div></div></div></div><div class="tab-pane edw-slider-item fade" id="summary_unqreplaceid_" role="tabpanel" aria-labelledby="summary-tab"><div class="accordion accordion-box" id="accordionExample3"><div class="faq-card"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne3" aria-expanded="true" aria-controls="collapseOne3"><span>Safe School Environments</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne3" class="collapse show"><div class="faq-card-body"><ul><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li><li>Implement measures to ensure physical and emotional safety.<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li></ul></div></div></div></div></div><div class="tab-pane edw-slider-item fade" id="policy_unqreplaceid_" role="tabpanel" aria-labelledby="policy-tab"><div class="accordion accordion-box" id="accordionExample4"><div class="faq-card"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne4" aria-expanded="true" aria-controls="collapseOne4"><span>Safe School Environments</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne4" class="collapse show"><div class="faq-card-body"><ul><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li><li>Implement measures to ensure physical and emotional safety.<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li></ul></div></div></div></div></div><div class="tab-pane edw-slider-item fade" id="rules_unqreplaceid_" role="tabpanel" aria-labelledby="rules-tab"><div class="accordion accordion-box" id="accordionExample5"><div class="faq-card"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne5" aria-expanded="true" aria-controls="collapseOne5"><span>Safe School Environments</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne5" class="collapse show"><div class="faq-card-body"><ul><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li><li>Implement measures to ensure physical and emotional safety.<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li></ul></div></div></div></div></div></div></div></div></section>`;
        var tabcss1 = `.section-faq-design {padding: 50px 24px;background-color: #fff;}.section-faq-design .section-container {max-width: 1320px;margin: 0 auto;}.section-faq-design .main-container {display: grid;grid-template-columns: 25% calc(75% - 24px);gap: 24px;}.section-faq-design .buttons-wrapper {display: flex;flex-direction: column;align-items: top;gap: 20px;}.section-faq-design .btn-tab {display: flex;padding: 12px 20px;align-items: center;justify-content: left;gap: 10px;border: 0;cursor: pointer;background-color: #fff;color: #4C5A73;font-size: 18px;font-weight: 400;line-height: normal;}.section-faq-design .btn-tab img {max-height: 33px;}.section-faq-design .btn-tab:focus {outline: 0;}.section-faq-design .btn-tab.active {color: #9A3CDF;}.section-faq-design .btn-tab.active img {filter: invert(66%) sepia(89%) saturate(7489%) hue-rotate(261deg) brightness(91%) contrast(92%);}.section-faq-design .btn-tab:hover {background-color: #F4F0F8;color: #9A3CDF;}.section-faq-design .btn-tab:hover img {filter: invert(66%) sepia(89%) saturate(7489%) hue-rotate(261deg) brightness(91%) contrast(92%);}.section-faq-design .accordion-box {display: flex;flex-direction: column;gap: 24px;}.section-faq-design .faq-card {border: 1px solid #D5DDEA;background-color: #FFF;transition: background-color 0.3s;}.section-faq-design .card-heading {width: 100%;color: #313848;font-size: 16px;font-style: normal;font-weight: 700;line-height: 24px;padding: 20px;cursor: pointer;display: flex;justify-content: space-between;align-items: center;}.section-faq-design .collaps-icon {display: none;}.section-faq-design .faq-card:not(:has(.collapsed)) {background: #F4F0F8;border: 0;}.section-faq-design .faq-card:not(:has(.collapsed)) .collaps-icon {display: block;}.section-faq-design .faq-card:not(:has(.collapsed)) .expande-icon {display: none;}.section-faq-design .faq-card-body {padding-bottom: 20px;}.section-faq-design .faq-card-body ul {display: flex;flex-direction: column;gap: 16px;margin-left: 10px;padding: 0 20px 0px;}.section-faq-design .faq-card-body ul li {color: #4C5A73;font-size: 16px;font-weight: 400;line-height: 24px;display: flex;align-items: self-start;gap: 8px;}.section-faq-design .faq-card-body ul li img {margin-top: 3px;margin-bottom: 4px;}.section-faq-design .faq-card-body ul li::before {content: '\\2022';color: #4C5A73;font-size: 1.5em;transform: translateY(-2px);}@media screen and (max-width: 1024px) {.section-faq-design .section-container {max-width: 820px;}.section-faq-design .main-container {display: block;}.section-faq-design .buttons-wrapper {flex-direction: row;flex-wrap: wrap;gap: 20px;row-gap: 30px;}.section-faq-design .btn-tab {width: fit-content;padding: 5px 10px;}.section-faq-design .tab-content {margin-top: 24px;}}@media screen and (max-width: 767px) {.section-faq-design .section-container {max-width: 600px;}.section-faq-design .card-heading {font-size: 18px;}.section-faq-design .faq-card-body {padding-bottom: 20px;}.section-faq-design .faq-card-body ul li {font-size: 18px;}}@media screen and (max-width: 420px) {.section-faq-design .btn-tab {width: 100%;}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .section-faq-design .main-container {display: block;}.edw-limitedwidth-block .section-faq-design .buttons-wrapper {flex-direction: row;flex-wrap: wrap;gap: 20px;row-gap: 30px;}.edw-limitedwidth-block .section-faq-design .btn-tab {width: fit-content;padding: 5px 10px;}.edw-limitedwidth-block .section-faq-design .tab-content {margin-top: 24px;}}`;
        var tabjs1 = ``;
        var appendtabswitchbutton1 = `<button class="btn-tab edw-tab-btn" id="rules-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#rules_unqreplaceid_" data-bs-target="#rules_unqreplaceid_" type="button" role="tab" aria-controls="rules" aria-selected="false"><img class="edw-nav-icon-img" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/rules.svg" alt="rules"><span class="edw-nav-tab-text">Rules</span></button>`;
        var appendtabnode1 = `<div class="tab-pane edw-slider-item fade" id="rules_unqreplaceid_" role="tabpanel" aria-labelledby="rules-tab"><div class="accordion  accordion-box" id="accordionExample5"><div class="faq-card"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne5" aria-expanded="true" aria-controls="collapseOne5"><span>Safe School Environments</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne5" class="collapse show" ><div class="faq-card-body"><ul><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li><li>Implement measures to ensure physical and emotional safety.<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li></ul></div></div></div></div></div>`;
        var appendfaq1 = `<div class="faq-card"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseOne5" aria-expanded="false" aria-controls="collapseOne5"><span>Safe School Environments</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne5" class="collapse" ><div class="faq-card-body"><ul><li>Foster an atmosphere of acceptance and belonging for all<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li><li>Implement measures to ensure physical and emotional safety.<a href="#"><img src="${Vvveb.serverurl}/CDN/tabaccordioan1/images/icons/link-icon.svg" alt="link"></a></li></ul></div></div></div>`;
        Vvveb.Components.extend("_base", "html/tab1", {
            name: "Accordion set 1 with tab ",
            attributes: ['data-ebpb-tab1'],
            image: "icons/tab1.png",
            classes: ['edwiser-pb-tab1'],
            html: (() => {
                return `<div class="edwiser-pb-tab1" data-vvveb-disabled-area contenteditable="false">${tabhtml1}<style>${tabcss1}</style><script>${tabjs1}</script></div>`;
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
                            edwclasses: "edwgroupheader edwcustomtabwithaccordiontitle",
                            data: {
                                header: "Tab " + slideno,
                                extraclass: "edwslideheading m-0 border-0",
                                type: "h5",
                                style: ""
                            }
                        },
                        {
                            name: "",
                            key: "deleteslideritem",
                            inputtype: EdwbuttonInput,
                            child: `.edw-slider-item-${i}`,
                            edwclasses: "edwslidedelbtn customtabdeletebutton",
                            data: { text: "", icon: "la-trash", extraclasses: "btn btn-outline-danger" },
                            onChange: function (node, value, input) {
                                $(node).remove();
                                $navdatatarget = "#" + $(node).attr('id');
                                $(tabswitch).each(function () {
                                    if ($(this).attr('data-target') == $navdatatarget) {
                                        $(this).remove();
                                    }
                                });
                                Vvveb.Components.render("html/tab1");
                                return node;
                            },
                        },
                        {
                            name:  `Tab title`,
                            key: "sliderdescription" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-tab-btn-${i} .edw-nav-tab-text`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },
                        {
                            name: `Tab icon`,
                            key: "slidernavtabimage",
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-tab-btn-${i} .edw-nav-icon-img`,

                        },

                    );
                    var count = 1 ;
                    $(this).find('.faq-card').each(function (e) {
                        var regex = /faq-card-\d+/;
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
                        $(this).addClass("faq-card-" + count);
                        var accordionid = generateUniqueID();
                        $(this).find(`.card-heading`).attr('data-target', `#faqcardid${accordionid}`);
                        $(this).find(`.card-heading`).attr('data-bs-target', `#faqcardid${accordionid}`);
                        $(this).find(`.collapse`).attr('id', `faqcardid${accordionid}`);
                        properties.push(

                            {
                                name: "",
                                key: "slidergrouptitle" + count,
                                inputtype: EdwheaderInput,
                                edwclasses: "edwgroupheader accordiontabtitle accordiontabsetting",
                                data: {
                                    header: "Accordion " + count,
                                    extraclass: "edwslideheading m-0 border-0",
                                    type: "h6",
                                    style: ""
                                }
                            },
                            {
                                name: "",
                                key: "deletesliderinneritem"+i,
                                inputtype: EdwbuttonInput,
                                child: `.edw-slider-item-${i} .faq-card-${count}`,
                                edwclasses: "edwslidedelbtn accordiontabsetting customaccordiondeletebutton",
                                data: { text: "", icon: "la-trash", extraclasses: "btn btn-outline-danger" },
                                onChange: function (node, value, input) {
                                    $(node).remove();
                                    Vvveb.Components.render("html/tab1");
                                    return node;
                                },
                            },
                            {
                                name: SETTINGTITLES.TITLE,
                                key: "sliderdescription" + count,
                                htmlAttr: "innerHTML",
                                child: `.edw-slider-item-${i} .faq-card-${count}  .card-heading span`,
                                inputtype: TextInput,
                                edwclasses: "edwinputfield accordiontabsetting",

                            },
                            {
                                name: `Content`,
                                key: "sliderdescription" + count,
                                htmlAttr: "innerHTML",
                                child: `.edw-slider-item-${i} .faq-card-${count} .faq-card-body`,
                                inputtype: TextareaInput,
                                edwclasses: "edwinputfield accordiontabsetting",
                                data: {
                                    rows: 40,
                                }
                            }
                        );
                        properties = removeTabWithAccordionInnerDeleteButton($(this).closest('.edw-slider-item'),properties,i);
                        count++;
                    });
                    properties.push(
                        {
                            name: "",
                            key: "slideraddnewtab",
                            inputtype: EdwbuttonInput,
                            edwclasses: "edwnewslidebtn accordiontabaddtabbtn",
                            child: `.edw-slider-item-${i} .accordion`,
                            data: { text: "Add new accordion", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                            onChange: function (node) {
                                //render component properties again to include the new column inputs
                                $(node).append(appendfaq1);
                                Vvveb.Components.render("html/tab1");
                                return node;
                            }
                        },
                        {
                            name: "",
                            key: "slidergrouptitle",
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader rowseprator",
                            data: {
                                header: "",
                                extraclass: "edwslideheading m-0 p-0",
                                type: "h5",
                                style: ""
                            }
                        },
                    );
                });

                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('show active');
                }

                if (!$(node).find('.edw-nav-wrapper').children('.edw-tab-btn').hasClass('active')) {
                    $(node).find('.edw-tab-btn').first().addClass('active');
                }

                properties = removeDeleteButton(node, properties);
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                this.properties = properties.concat(this.properties);
                return node;
            },
            properties: [
                {
                    name: "",
                    key: "addNewSlide",
                    inputtype: EdwbuttonInput,
                    edwclasses: "edwnewslidebtn",
                    data: { text: "Add new tab", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                    onChange: function (node) {
                        //render component properties again to include the new column inputs
                        $(node).parent().find('.edw-slider-inner-container').append(appendtabnode1);
                        $(node).parent().find('.edw-nav-wrapper').append(appendtabswitchbutton1);
                        Vvveb.Components.render("html/tab1");
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

        // Tabhtml2 --> FAQ design only for dev purpose
        var tabhtml2 = `<section class="section-faq-design edw-tab_unqreplaceid_"><div class="section-container"><div class="main-container"><div class="navbar-carousel"><button class="nav-left-arrow"><img src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/indicator.svg" alt="nav indicator"></button><div class="navbar-inner"><div class="nav buttons-wrapper edw-nav-wrapper" id="v-pills-tab" role="tablist"><button class="btn-tab edw-tab-btn active" id="activates-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#activates_unqreplaceid_" data-bs-target="#activates_unqreplaceid_" type="button" role="tab" aria-controls="activates" aria-selected="true"><img class="edw-nav-icon-img" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/academic.svg" alt="activates"><span class="edw-nav-tab-text">Academic</span></button><button class="btn-tab edw-tab-btn" id="guidance-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#guidance_unqreplaceid_" data-bs-target="#guidance_unqreplaceid_" type="button" role="tab" aria-controls="guidance" aria-selected="false"><img class="edw-nav-icon-img" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/admissions.svg" alt="guidance"><span class="edw-nav-tab-text">Admissions</span></button><button class="btn-tab edw-tab-btn" id="summary-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#summary_unqreplaceid_" data-bs-target="#summary_unqreplaceid_" type="button" role="tab" aria-controls="summary" aria-selected="false"><img class="edw-nav-icon-img" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/campus.svg" alt="summary"><span class="edw-nav-tab-text">Campus</span></button><button class="btn-tab edw-tab-btn" id="policy-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#policy_unqreplaceid_" data-bs-target="#policy_unqreplaceid_" type="button" role="tab" aria-controls="policy" aria-selected="false"><img class="edw-nav-icon-img" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/faculty.svg" alt="policy"><span class="edw-nav-tab-text">Faculty</span></button><button class="btn-tab edw-tab-btn" id="rules-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#rules_unqreplaceid_" data-bs-target="#rules_unqreplaceid_" type="button" role="tab" aria-controls="rules" aria-selected="false"><img class="edw-nav-icon-img" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/policies.svg" alt="rules"><span class="edw-nav-tab-text">Policies</span></button></div></div><button class="nav-right-arrow"><img src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/indicator.svg" alt="nav indicator"></button></div><div class="tab-content edw-slider-inner-container" id="v-pills-tabContent"><div class="tab-pane edw-slider-item fade show active" id="activates_unqreplaceid_" role="tabpanel" aria-labelledby="activates-tab"><p class="pane-heading">Academic</p><div class="accordion accordion-box" id="accordionExample"><div class="faq-card"><div class="faq-card-sub-wrapper"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><ul><li>What is the application process for admission to University?</li></ul><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne" class="collapse show"><div class="faq-card-body"><p class="m-0">The application process for admission to a university typically involves three main steps. First, aspiring students need to research the university's admission requirements and deadlines, ensuring they meet the academic criteria and gather all necessary documents. Second, they must complete the application form, providing personal information, academic records, and any additional materials, such as recommendation letters or essays.</p></div></div></div></div><div class="faq-card"><div class="faq-card-sub-wrapper"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><ul><li>What are the minimum admission requirements for University?</li></ul><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseTwo" class="collapse"><div class="faq-card-body"><p class="m-0">The application process for admission to a university typically involves three main steps. First, aspiring students need to research the university's admission requirements and deadlines, ensuring they meet the academic criteria and gather all necessary documents. Second, they must complete the application form, providing personal information, academic records, and any additional materials, such as recommendation letters or essays.</p></div></div></div></div><div class="faq-card"><div class="faq-card-sub-wrapper"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><ul><li>What financial aid options are available for students at University?</li></ul><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseThree" class="collapse"><div class="faq-card-body"><p class="m-0">The application process for admission to a university typically involves three main steps. First, aspiring students need to research the university's admission requirements and deadlines, ensuring they meet the academic criteria and gather all necessary documents. Second, they must complete the application form, providing personal information, academic records, and any additional materials, such as recommendation letters or essays.</p></div></div></div></div><div class="faq-card"><div class="faq-card-sub-wrapper"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"><ul><li>Is there a specific application deadline for the upcoming academic year?</li></ul><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseFour" class="collapse"><div class="faq-card-body"><p class="m-0">The application process for admission to a university typically involves three main steps. First, aspiring students need to research the university's admission requirements and deadlines, ensuring they meet the academic criteria and gather all necessary documents. Second, they must complete the application form, providing personal information, academic records, and any additional materials, such as recommendation letters or essays.</p></div></div></div></div></div></div><div class="tab-pane edw-slider-item fade" id="guidance_unqreplaceid_" role="tabpanel" aria-labelledby="guidance-tab"><p class="pane-heading">Admissions</p><div class="accordion accordion-box"><div class="faq-card"><div class="faq-card-sub-wrapper"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne2" aria-expanded="true" aria-controls="collapseOne2"><ul><li>Can I apply to multiple programs at the university simultaneously?</li></ul><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne2" class="collapse show"><div class="faq-card-body"><p class="m-0">The application process for admission to a university typically involves three main steps. First, aspiring students need to research the university's admission requirements and deadlines, ensuring they meet the academic criteria and gather all necessary documents. Second, they must complete the application form, providing personal information, academic records, and any additional materials, such as recommendation letters or essays.</p></div></div></div></div><div class="faq-card"><div class="faq-card-sub-wrapper"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo2"><ul><li>Is there an application fee, and are there any fee waiver options available?</li></ul><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseTwo2" class="collapse"><div class="faq-card-body"><p class="m-0">The application process for admission to a university typically involves three main steps. First, aspiring students need to research the university's admission requirements and deadlines, ensuring they meet the academic criteria and gather all necessary documents. Second, they must complete the application form, providing personal information, academic records, and any additional materials, such as recommendation letters or essays.</p></div></div></div></div></div></div><div class="tab-pane edw-slider-item fade" id="summary_unqreplaceid_" role="tabpanel" aria-labelledby="summary-tab"><p class="pane-heading">Campus</p><div class="accordion accordion-box" id="accordionExample3"><div class="faq-card"><div class="faq-card-sub-wrapper"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne3" aria-expanded="true" aria-controls="collapseOne3"><ul><li>Are there any scholarships aid opportunities available for incoming students?</li></ul><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne3" class="collapse show"><div class="faq-card-body"><p class="m-0">The application process for admission to a university typically involves three main steps. First, aspiring students need to research the university's admission requirements and deadlines, ensuring they meet the academic criteria and gather all necessary documents. Second, they must complete the application form, providing personal information, academic records, and any additional materials, such as recommendation letters or essays.</p></div></div></div></div></div></div><div class="tab-pane edw-slider-item fade" id="policy_unqreplaceid_" role="tabpanel" aria-labelledby="policy-tab"><p class="pane-heading">Faculty</p><div class="accordion accordion-box" id="accordionExample4"><div class="faq-card"><div class="faq-card-sub-wrapper"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne4" aria-expanded="true" aria-controls="collapseOne4"><ul><li>Are there any scholarships aid opportunities available for incoming students?</li></ul><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne4" class="collapse show"><div class="faq-card-body"><p class="m-0">The application process for admission to a university typically involves three main steps. First, aspiring students need to research the university's admission requirements and deadlines, ensuring they meet the academic criteria and gather all necessary documents. Second, they must complete the application form, providing personal information, academic records, and any additional materials, such as recommendation letters or essays.</p></div></div></div></div></div></div><div class="tab-pane edw-slider-item fade" id="rules_unqreplaceid_" role="tabpanel" aria-labelledby="rules-tab"><p class="pane-heading">Policies</p><div class="accordion accordion-box" id="accordionExample5"><div class="faq-card"><div class="faq-card-sub-wrapper"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne5" aria-expanded="true" aria-controls="collapseOne5"><ul><li>Are there any scholarships aid opportunities available for incoming students?</li></ul><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne5" class="collapse show"><div class="faq-card-body"><p class="m-0">The application process for admission to a university typically involves three main steps. First, aspiring students need to research the university's admission requirements and deadlines, ensuring they meet the academic criteria and gather all necessary documents. Second, they must complete the application form, providing personal information, academic records, and any additional materials, such as recommendation letters or essays.</p></div></div></div></div></div></div></div></div></div></section>`;
        var tabcss2 = `.edw-tab_unqreplaceid_ {padding: 10px 40px 50px;background-color: #fff;}.edw-tab_unqreplaceid_ .section-container {max-width: 1320px;margin: 0 auto;}.edw-tab_unqreplaceid_ .main-container {display: flex;flex-direction: column;row-gap: 20px;}.edw-tab_unqreplaceid_ .navbar-carousel {width: 100%;height: 200px;display: flex;align-items: center;position: relative;gap: 24px;}.edw-tab_unqreplaceid_ .nav-left-arrow, .edw-tab_unqreplaceid_ .nav-right-arrow {height: fit-content;width: fit-content;background-color: transparent;border: 0;cursor: pointer;position: absolute;top: 50%;transform: translateY(-50%);left: -30px;}.edw-tab_unqreplaceid_ .nav-left-arrow:focus, .edw-tab_unqreplaceid_ .nav-right-arrow:focus {border: 0;outline: 0;}.edw-tab_unqreplaceid_ .nav-right-arrow {left: unset;right: -30px;}.edw-tab_unqreplaceid_ .nav-right-arrow img {transform: rotate(180deg);}.edw-tab_unqreplaceid_ .navbar-inner {position: relative;height: 100%;width: 100%;overflow-x: hidden;}.edw-tab_unqreplaceid_ .buttons-wrapper {position: absolute;top: 50%;transform: translateY(-50%);left: 0;width: max-content;display: flex;gap: 24px;transition: left 0.5s ease;}.edw-tab_unqreplaceid_ .btn-tab {display: flex;flex-direction: column;padding: 24px 20px;align-items: center;gap: 10px;border: 1px solid #D5DDEA;cursor: pointer;background-color: #fff;color: #4C5A73;font-size: 16px;font-weight: 400;line-height: 18px;min-width: 220px;}.edw-tab_unqreplaceid_ .btn-tab img {max-height: 33px;}.edw-tab_unqreplaceid_ .btn-tab:focus {outline: 0;}.edw-tab_unqreplaceid_ .btn-tab.active, .edw-tab_unqreplaceid_ .btn-tab:hover {color: #0934BA;border-color: #0934BA;font-weight: 700;box-shadow: 0px 8px 22px 0px rgba(0, 0, 0, 0.12);}.edw-tab_unqreplaceid_ .btn-tab.active img, .edw-tab_unqreplaceid_ .btn-tab:hover img {filter: invert(14%) sepia(98%) saturate(4313%) hue-rotate(229deg) brightness(76%) contrast(96%);}.edw-tab_unqreplaceid_ .pane-heading {font-size: 36px;font-weight: 400;line-height: 24px;color: #0934BA;text-align: center;margin-bottom: 10px;}.edw-tab_unqreplaceid_ .accordion-box {display: flex;flex-direction: column;}.edw-tab_unqreplaceid_ .faq-card {background-color: #FFF;transition: background-color 0.3s;}.edw-tab_unqreplaceid_ .faq-card-sub-wrapper {margin: 20px 0;}.edw-tab_unqreplaceid_ .faq-card:not(:last-child) {border-bottom: 1px solid #D0D4DD;}.edw-tab_unqreplaceid_ .card-heading {width: 100%;color: #313848;font-size: 18px;font-style: normal;font-weight: 700;line-height: 24px;padding: 10px 0;cursor: pointer;display: flex;justify-content: space-between;align-items: center;}.edw-tab_unqreplaceid_ .card-heading ul {margin-bottom: 0;padding-left: 24px;}.edw-tab_unqreplaceid_ .collaps-icon {display: none;}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) .collaps-icon {display: block;}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) .expande-icon {display: none;}.edw-tab_unqreplaceid_ .faq-card-body {padding-bottom: 10px;padding-left: 24px;}.edw-tab_unqreplaceid_ .faq-card-body p {font-size: 16px;line-height: 32px;font-weight: 400;}@media screen and (max-width: 1024px) {.edw-tab_unqreplaceid_ {padding: 50px 24px;}.edw-tab_unqreplaceid_ .section-container {max-width: 820px;}.edw-tab_unqreplaceid_ .btn-tab {min-width: 140px;}.edw-tab_unqreplaceid_ .nav-left-arrow, .edw-tab_unqreplaceid_ .nav-right-arrow {display: none !important;}}@media screen and (max-width: 767px) {.edw-tab_unqreplaceid_ .section-container {max-width: 600px;}}`;
        var tabjs2 = `class AllCoursesCategory_unqreplaceid_{constructor(){this.AllCoursesCategory=document.querySelector(".edw-tab_unqreplaceid_"),this.navbarCarousel=this.AllCoursesCategory.querySelector(".navbar-carousel"),this.navbarInner=this.AllCoursesCategory.querySelector(".navbar-inner"),this.navItemContainer=this.AllCoursesCategory.querySelector(".navbar-inner .buttons-wrapper"),this.navItems=this.AllCoursesCategory.querySelectorAll(".buttons-wrapper .btn-tab"),this.navLeftArrow=this.AllCoursesCategory.querySelector(".nav-left-arrow"),this.navRightArrow=this.AllCoursesCategory.querySelector(".nav-right-arrow"),this.leftValue=0,this.maxNavItemWidth=0,this.isTouchStart=!1,this.startX=0,this.distance=0,this.touchTimeout=null,this.isHover=!1,this.leftClicked=this.leftClicked.bind(this),this.rightClicked=this.rightClicked.bind(this),this.handleResize=this.handleResize.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchStop=this.touchStop.bind(this),this.initializeEventListeners(),this.initialize(),this.handleResize()}initializeEventListeners(){this.navLeftArrow.addEventListener("click",this.leftClicked),this.navRightArrow.addEventListener("click",this.rightClicked),this.navbarInner.addEventListener("touchstart",this.touchStart),this.navbarInner.addEventListener("touchmove",this.touchMove),this.navbarInner.addEventListener("touchend",this.touchStop),window.addEventListener("resize",this.handleResize)}initialize(){this.leftValue=0,this.navLeftArrow.style.display="none",this.calculateMaxNavItemWidth()}calculateMaxNavItemWidth(){this.navItems.forEach(t=>{this.maxNavItemWidth=Math.max(this.maxNavItemWidth,t.offsetWidth)})}handleResize(t){let e=this.navbarInner.offsetWidth,i=this.navItemContainer.offsetWidth;window.innerWidth,this.calculateMaxNavItemWidth(),i+this.leftValue<=e?(this.leftValue=e-i,this.leftValue>=0&&(this.leftValue=0,this.navLeftArrow.style.display="none"),this.navRightArrow.style.display="none",this.navItemContainer.style.left=this.leftValue+"px"):this.navRightArrow.style.display="flex"}leftClicked(){this.navRightArrow.style.display="flex",this.leftValue+=this.maxNavItemWidth+24,this.leftValue>=0&&(this.leftValue=0,this.navLeftArrow.style.display="none"),this.navItemContainer.style.left=this.leftValue+"px"}rightClicked(){this.navLeftArrow.style.display="flex";let t=this.navbarInner.offsetWidth,e=this.navItemContainer.offsetWidth;this.leftValue-=this.maxNavItemWidth+24,e+this.leftValue<=t&&(this.leftValue=t-e,this.navRightArrow.style.display="none"),this.navItemContainer.style.left=this.leftValue+"px"}touchStart(t){this.isHover=!0,this.isTouchStart=!0,this.startX=t.touches[0].clientX}touchMove(t){this.isHover=!0,this.isTouchStart&&(this.distance=t.touches[0].clientX-this.startX)}touchStop(){clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>{this.isHover=!1},1e4),this.distance>100?this.leftClicked():this.distance<-100&&this.rightClicked(),this.isTouchStart=!1,this.startX=0,this.distance=0,this.touchTimeout=null}}const allCoursesCategory_unqreplaceid_=new AllCoursesCategory_unqreplaceid_;`;
        var appendtabswitchbutton2 = `<button class="btn-tab edw-tab-btn" id="rules-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#rules_unqreplaceid_"  data-bs-target="#rules_unqreplaceid_" type="button" role="tab" aria-controls="rules" aria-selected="false"><img class="edw-nav-icon-img" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/policies.svg" alt="rules"><span class="edw-nav-tab-text">Policies</span></button>`;
        var appendtabnode2 = `<div class="tab-pane edw-slider-item fade" id="rules_unqreplaceid_" role="tabpanel" aria-labelledby="rules-tab"><p class="pane-heading">Policies</p><div class="accordion accordion-box" id="accordionExample5"><div class="faq-card"><div class="faq-card-sub-wrapper"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne5" aria-expanded="true" aria-controls="collapseOne5"><ul><li>Are there any scholarships aid opportunities available for incoming students?</li></ul><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne5" class="collapse show"><div class="faq-card-body"><p class="m-0">The application process for admission to a university typically involves three main steps. First, aspiring students need to research the university's admission requirements and deadlines, ensuring they meet the academic criteria and gather all necessary documents. Second, they must complete the application form, providing personal information, academic records, and any additional materials, such as recommendation letters or essays.</p></div></div></div></div></div></div>`;
        var appendtabfaq2 = `<div class="faq-card"><div class="faq-card-sub-wrapper"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><ul><li>What are the minimum admission requirements for University?</li></ul><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseTwo" class="collapse"><div class="faq-card-body"><p class="m-0">The application process for admission to a university typically involves three main steps. First, aspiring students need to research the university's admission requirements and deadlines, ensuring they meet the academic criteria and gather all necessary documents. Second, they must complete the application form, providing personal information, academic records, and any additional materials, such as recommendation letters or essays.</p></div></div></div></div>`;
        Vvveb.Components.extend("_base", "html/tab2", {
            name: "Accordion set 2 with tab",
            attributes: ['data-ebpb-tab1'],
            image: "icons/tab2.svg",
            classes: ['edwiser-pb-tab2'],
            html: (() => {
                return `<div class="edwiser-pb-tab2" data-vvveb-disabled-area contenteditable="false">${tabhtml2}<style>${tabcss2}</style><script>${tabjs2}</script></div>`;
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
                            edwclasses: "edwgroupheader edwcustomtabwithaccordiontitle",
                            data: {
                                header: "Tab " + slideno,
                                extraclass: "edwslideheading m-0 border-0",
                                type: "h5",
                                style: ""
                            }
                        },
                        {
                            name: "",
                            key: "deleteslideritem",
                            inputtype: EdwbuttonInput,
                            child: `.edw-slider-item-${i}`,
                            edwclasses: "edwslidedelbtn customtabdeletebutton",
                            data: { text: "", icon: "la-trash", extraclasses: "btn btn-outline-danger" },
                            onChange: function (node, value, input) {
                                $(node).remove();
                                $navdatatarget = "#" + $(node).attr('id');
                                $(tabswitch).each(function () {
                                    if ($(this).attr('data-target') == $navdatatarget) {
                                        $(this).remove();
                                    }
                                });
                                Vvveb.Components.render("html/tab2");
                                return node;
                            },
                        },
                        {
                            name:  `Tab title`,
                            key: "sliderdescription" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-tab-btn-${i} .edw-nav-tab-text`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                            onChange: function (node, value, input) {

                                var tabid = $(node).closest('.edw-tab-btn').attr('data-target');
                                $(node).closest('.main-container').find(`${tabid} .pane-heading`).text(value);
                                return node;

                            },
                        },
                        {
                            name: `Tab icon`,
                            key: "slidernavtabimage",
                            htmlAttr: 'src',
                            inputtype: ImageInput,
                            edwclasses: "edwfilefield",
                            child: `.edw-tab-btn-${i} .edw-nav-icon-img`,

                        },

                    );
                    var count = 1 ;
                    $(this).find('.faq-card').each(function (e) {
                        var regex = /faq-card-\d+/;
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
                        $(this).addClass("faq-card-" + count);
                        var accordionid = generateUniqueID();
                        $(this).find(`.card-heading`).attr('data-target', `#faqcardid${accordionid}`);
                        $(this).find(`.card-heading`).attr('data-bs-target', `#faqcardid${accordionid}`);
                        $(this).find(`.collapse`).attr('id', `faqcardid${accordionid}`);
                        properties.push(

                            {
                                name: "",
                                key: "slidergrouptitle" + count,
                                inputtype: EdwheaderInput,
                                edwclasses: "edwgroupheader accordiontabtitle accordiontabsetting",
                                data: {
                                    header: "Accordion " + count,
                                    extraclass: "edwslideheading m-0 border-0",
                                    type: "h6",
                                    style: ""
                                }
                            },
                            {
                                name: "",
                                key: "deletesliderinneritem"+i,
                                inputtype: EdwbuttonInput,
                                child: `.edw-slider-item-${i} .faq-card-${count}`,
                                edwclasses: "edwslidedelbtn accordiontabsetting customaccordiondeletebutton",
                                data: { text: "", icon: "la-trash", extraclasses: "btn btn-outline-danger" },
                                onChange: function (node, value, input) {
                                    $(node).remove();
                                    Vvveb.Components.render("html/tab2");
                                    return node;
                                },
                            },
                            {
                                name: SETTINGTITLES.TITLE,
                                key: "sliderdescription" + count,
                                htmlAttr: "innerHTML",
                                child: `.edw-slider-item-${i} .faq-card-${count}  .card-heading ul li`,
                                inputtype: TextInput,
                                edwclasses: "edwinputfield accordiontabsetting",

                            },
                            {
                                name: `Content`,
                                key: "sliderdescription" + count,
                                htmlAttr: "innerHTML",
                                child: `.edw-slider-item-${i} .faq-card-${count} .faq-card-body p`,
                                inputtype: TextareaInput,
                                edwclasses: "edwinputfield accordiontabsetting",
                                data: {
                                    rows: 40,
                                }
                            }
                        );
                        properties = removeTabWithAccordionInnerDeleteButton($(this).closest('.edw-slider-item'),properties,i);
                        count++;
                    });
                    properties.push(
                        {
                            name: "",
                            key: "slideraddnewtab",
                            inputtype: EdwbuttonInput,
                            edwclasses: "edwnewslidebtn accordiontabaddtabbtn",
                            child: `.edw-slider-item-${i} .accordion`,
                            data: { text: "Add new accordion", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                            onChange: function (node) {
                                //render component properties again to include the new column inputs
                                $(node).append(appendtabfaq2);
                                Vvveb.Components.render("html/tab2");
                                return node;
                            }
                        },
                        {
                            name: "",
                            key: "slidergrouptitle",
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader rowseprator",
                            data: {
                                header: "",
                                extraclass: "edwslideheading m-0 p-0",
                                type: "h5",
                                style: ""
                            }
                        },
                    );
                });

                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('show active');
                }

                if (!$(node).find('.edw-nav-wrapper').children('.edw-tab-btn').hasClass('active')) {
                    $(node).find('.edw-tab-btn').first().addClass('active');
                }

                properties = removeDeleteButton(node, properties);
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                this.properties = properties.concat(this.properties);

                return node;
            },
            properties: [
                {
                    name: "",
                    key: "addNewSlide",
                    inputtype: EdwbuttonInput,
                    edwclasses: "edwnewslidebtn",
                    data: { text: "Add new tab", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                    onChange: function (node) {
                        //render component properties again to include the new column inputs
                        $(node).parent().find('.edw-slider-inner-container').append(appendtabnode2);
                        $(node).parent().find('.edw-nav-wrapper').append(appendtabswitchbutton2);
                        Vvveb.Components.render("html/tab2");
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

        // Tabhtml3 --> FAQ design only for dev purpose
        var tabhtml3 = `<section class="section-faq-design edw-tab_unqreplaceid_"><div class="section-container"><div class="main-container"><div class="navbar-carousel"><div class="navbar-inner"><div class="nav buttons-wrapper edw-nav-wrapper" id="v-pills-tab" role="tablist"><button class="btn-tab edw-tab-btn active" id="activates-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#activates_unqreplaceid_" data-bs-target="#activates_unqreplaceid_" type="button" role="tab" aria-controls="activates" aria-selected="true"><ul><li class="edw-nav-tab-text">Admissions</li></ul></button><button class="btn-tab edw-tab-btn" id="guidance-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#guidance_unqreplaceid_" data-bs-target="#guidance_unqreplaceid_" type="button" role="tab" aria-controls="guidance" aria-selected="false"><ul><li class="edw-nav-tab-text">Tuition and Fees</li></ul></button><button class="btn-tab edw-tab-btn" id="summary-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#summary_unqreplaceid_" data-bs-target="#summary_unqreplaceid_" type="button" role="tab" aria-controls="summary" aria-selected="false"><ul><li class="edw-nav-tab-text">Curriculum</li></ul></button><button class="btn-tab edw-tab-btn" id="policy-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#policy_unqreplaceid_" data-bs-target="#policy_unqreplaceid_" type="button" role="tab" aria-controls="policy" aria-selected="false"><ul><li class="edw-nav-tab-text">Resources</li></ul></button><button class="btn-tab edw-tab-btn" id="rules-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#rules_unqreplaceid_" data-bs-target="#rules_unqreplaceid_" type="button" role="tab" aria-controls="rules" aria-selected="false"><ul><li class="edw-nav-tab-text">Faculty & Staff</li></ul></button></div></div></div><div class="tab-content edw-slider-inner-container" id="v-pills-tabContent"><div class="tab-pane edw-slider-item fade show active" id="activates_unqreplaceid_" role="tabpanel" aria-labelledby="activates-tab"><div class="accordion accordion-box" id="accordionExample"><div class="faq-card"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><span>What documents are typically required for the school admission process</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne" class="collapse show"><div class="faq-card-body"><p class="m-0">The specific documents may vary depending on the school but commonly required documents include</p><ul><li>Completed application form</li><li>Birth certificate or age proof</li><li>Previous academic records and report cards</li><li>Transfer certificate (if applicable)</li></ul></div></div></div><div class="faq-card"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><span>What factors do schools consider during the admission selection process?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseTwo" class="collapse"><div class="faq-card-body"><p class="m-0">The specific documents may vary depending on the school but commonly required documents include</p><ul><li>Completed application form</li><li>Birth certificate or age proof</li></ul></div></div></div><div class="faq-card"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><span>Is there an age limit for admission to specific grades?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseThree" class="collapse"><div class="faq-card-body"><p class="m-0">The specific documents may vary depending on the school but commonly required documents include</p><ul><li>Completed application form</li><li>Birth certificate or age proof</li></ul></div></div></div><div class="faq-card"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"><span>Can I apply for admission if I have recently moved to the area and do not have local residential proof?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseFour" class="collapse"><div class="faq-card-body"><p class="m-0">The specific documents may vary depending on the school but commonly required documents include</p><ul><li>Completed application form</li><li>Birth certificate or age proof</li></ul></div></div></div></div></div><div class="tab-pane edw-slider-item fade" id="guidance_unqreplaceid_" role="tabpanel" aria-labelledby="guidance-tab"><div class="accordion accordion-box"><div class="faq-card"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne2" aria-expanded="true" aria-controls="collapseOne2"><span>When does the school admission process usually begin?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne2" class="collapse show"><div class="faq-card-body"><p class="m-0">The specific documents may vary depending on the school but commonly required documents include</p><ul><li>Completed application form</li><li>Birth certificate or age proof</li></ul></div></div></div><div class="faq-card"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo2"><span>When does the school admission process usually begin?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseTwo2" class="collapse"><div class="faq-card-body"><p class="m-0">The specific documents may vary depending on the school but commonly required documents include</p><ul><li>Completed application form</li><li>Birth certificate or age proof</li></ul></div></div></div><div class="faq-card"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseThree2" aria-expanded="false" aria-controls="collapseThree2"><span>When does the school admission process usually begin?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseThree2" class="collapse"><div class="faq-card-body"><p class="m-0">The specific documents may vary depending on the school but commonly required documents include</p><ul><li>Completed application form</li><li>Birth certificate or age proof</li></ul></div></div></div></div></div><div class="tab-pane edw-slider-item fade" id="summary_unqreplaceid_" role="tabpanel" aria-labelledby="summary-tab"><div class="accordion accordion-box" id="accordionExample3"><div class="faq-card"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne3" aria-expanded="true" aria-controls="collapseOne3"><span>When does the school admission process usually begin?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne3" class="collapse show"><div class="faq-card-body"><p class="m-0">The specific documents may vary depending on the school but commonly required documents include</p><ul><li>Completed application form</li><li>Birth certificate or age proof</li></ul></div></div></div></div></div><div class="tab-pane edw-slider-item fade" id="policy_unqreplaceid_" role="tabpanel" aria-labelledby="policy-tab"><div class="accordion accordion-box" id="accordionExample4"><div class="faq-card"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne4" aria-expanded="true" aria-controls="collapseOne4"><span>When does the school admission process usually begin?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne4" class="collapse show"><div class="faq-card-body"><p class="m-0">The specific documents may vary depending on the school but commonly required documents include</p><ul><li>Completed application form</li><li>Birth certificate or age proof</li></ul></div></div></div></div></div><div class="tab-pane edw-slider-item fade" id="rules_unqreplaceid_" role="tabpanel" aria-labelledby="rules-tab"><div class="accordion accordion-box" id="accordionExample5"><div class="faq-card"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne5" aria-expanded="true" aria-controls="collapseOne5"><span>When does the school admission process usually begin?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne5" class="collapse show"><div class="faq-card-body"><p class="m-0">The specific documents may vary depending on the school but commonly required documents include</p><ul><li>Completed application form</li><li>Birth certificate or age proof</li></ul></div></div></div></div></div></div></div></div></section>`;
        var tabcss3 = ` .section-faq-design {padding: 50px 24px;background-color: #fff;}.section-faq-design .section-container {max-width: 1320px;margin: 0 auto;}.section-faq-design .main-container {display: grid;grid-template-columns: 25% calc(75% - 24px);gap: 24px;}.section-faq-design .buttons-wrapper {display: flex;flex-direction: column;align-items: top;gap: 20px;}.section-faq-design .btn-tab {display: flex;padding: 16px 20px;align-items: center;justify-content: left;gap: 10px;border: 0;cursor: pointer;background-color: #fff;color: #4C5A73;font-size: 18px;font-weight: 400;line-height: normal;}.section-faq-design .btn-tab img {max-height: 33px;}.section-faq-design .btn-tab ul {padding-left: 20px;margin-bottom: 0 !important;}.section-faq-design .btn-tab:focus {outline: 0;}.section-faq-design .btn-tab:hover, .section-faq-design .btn-tab.active {background-color: #F4F0F8;color: #9A3CDF;font-weight: 700;}.section-faq-design .btn-tab:hover img, .section-faq-design .btn-tab.active img {filter: invert(66%) sepia(89%) saturate(7489%) hue-rotate(261deg) brightness(91%) contrast(92%);}.section-faq-design .accordion-box {display: flex;flex-direction: column;gap: 32px;}.section-faq-design .faq-card {border: 1px solid #D5DDEA;background-color: #FFF;transition: background-color 0.3s;}.section-faq-design .card-heading {width: 100%;color: #313848;font-size: 16px;font-style: normal;font-weight: 700;line-height: 24px;padding: 30px 40px;cursor: pointer;display: flex;justify-content: space-between;align-items: center;transition: padding 0.5s ease;}.section-faq-design .expande-icon, .section-faq-design .collaps-icon {max-height: 20px;}.section-faq-design .collaps-icon {display: none;}.section-faq-design .faq-card-body {padding: 0 40px 30px;}.section-faq-design .faq-card-body p {font-size: 16px;line-height: 27px;font-weight: 400;}.section-faq-design .faq-card-body ul {margin: 8px 0 0 0px;padding: 0 0px 0px 24px;}.section-faq-design .faq-card-body ul li {color: #4C5A73;font-size: 16px;font-weight: 400;line-height: 27px;}.section-faq-design .faq-card:not(:has(.collapsed)) .card-heading {padding-bottom: 16px;color: #9A3CDF;}.section-faq-design .faq-card:not(:has(.collapsed)) .collaps-icon {display: block;}.section-faq-design .faq-card:not(:has(.collapsed)) .expande-icon {display: none;}@media screen and (max-width: 1024px) {.section-faq-design .section-container {max-width: 820px;}.section-faq-design .main-container {display: block;}.section-faq-design .navbar-carousel {width: 100%;height: 60px;display: flex;align-items: center;position: relative;gap: 24px;}.section-faq-design .navbar-inner {position: relative;height: 100%;width: 100%;overflow: hidden;}.section-faq-design .buttons-wrapper {position: absolute;top: 0;left: 0;transition: left 0.5s ease;width: max-content;flex-direction: row;flex-wrap: wrap;gap: 20px;row-gap: 30px;}.section-faq-design .btn-tab {width: fit-content;}.section-faq-design .tab-content {margin-top: 24px;}}@media screen and (max-width: 767px) {.section-faq-design .section-container {max-width: 600px;}.section-faq-design .card-heading {font-size: 18px;padding-left: 24px;padding-right: 20px;}.section-faq-design .faq-card-body {padding-bottom: 20px;padding-left: 24px;padding-right: 24px;}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .section-faq-design .main-container {display: block;}.edw-limitedwidth-block .section-faq-design .navbar-carousel {width: 100%;height: 60px;display: flex;align-items: center;position: relative;gap: 24px;}.edw-limitedwidth-block .section-faq-design .navbar-inner {position: relative;height: 100%;width: 100%;overflow: hidden;}.edw-limitedwidth-block .section-faq-design .buttons-wrapper {position: absolute;top: 0;left: 0;transition: left 0.5s ease;width: max-content;flex-direction: row;flex-wrap: wrap;gap: 20px;row-gap: 30px;}.edw-limitedwidth-block .section-faq-design .btn-tab {width: fit-content;}.edw-limitedwidth-block .section-faq-design .tab-content {margin-top: 24px;}}`;
        var tabjs3 = `class AllCoursesCategory_unqreplaceid_{constructor(){this.AllCoursesCategory=document.querySelector(".edw-tab_unqreplaceid_"),this.navbarCarousel=this.AllCoursesCategory.querySelector(".navbar-carousel"),this.navbarInner=this.AllCoursesCategory.querySelector(".navbar-inner"),this.navItemContainer=this.AllCoursesCategory.querySelector(".navbar-inner .buttons-wrapper"),this.navItems=this.AllCoursesCategory.querySelectorAll(".buttons-wrapper .btn-tab"),this.leftValue=0,this.maxNavItemWidth=0,this.isTouchStart=!1,this.startX=0,this.distance=0,this.touchTimeout=null,this.isHover=!1,this.handleResize=this.handleResize.bind(this),this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchStop=this.touchStop.bind(this),this.initializeEventListeners(),this.initialize(),this.handleResize()}initializeEventListeners(){this.navbarInner.addEventListener("touchstart",this.touchStart),this.navbarInner.addEventListener("touchmove",this.touchMove),this.navbarInner.addEventListener("touchend",this.touchStop),window.addEventListener("resize",this.handleResize)}initialize(){this.leftValue=0,this.calculateMaxNavItemWidth()}calculateMaxNavItemWidth(){this.navItems.forEach(t=>{this.maxNavItemWidth=Math.max(this.maxNavItemWidth,t.offsetWidth)})}handleResize(t){let e=this.navbarInner.offsetWidth,i=this.navItemContainer.offsetWidth;window.innerWidth,this.calculateMaxNavItemWidth(),i+this.leftValue<=e&&(this.leftValue=e-i,this.leftValue>=0&&(this.leftValue=0),this.navItemContainer.style.left=this.leftValue+"px")}leftClicked(){this.leftValue+=this.maxNavItemWidth+24,this.leftValue>=0&&(this.leftValue=0),this.navItemContainer.style.left=this.leftValue+"px"}rightClicked(){let t=this.navbarInner.offsetWidth,e=this.navItemContainer.offsetWidth;this.leftValue-=this.maxNavItemWidth+24,e+this.leftValue<=t&&(this.leftValue=t-e),this.navItemContainer.style.left=this.leftValue+"px"}touchStart(t){this.isHover=!0,this.isTouchStart=!0,this.startX=t.touches[0].clientX}touchMove(t){this.isHover=!0,this.isTouchStart&&(this.distance=t.touches[0].clientX-this.startX)}touchStop(){clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>{this.isHover=!1},1e4),this.distance>100?this.leftClicked():this.distance<-100&&this.rightClicked(),this.isTouchStart=!1,this.startX=0,this.distance=0,this.touchTimeout=null}}const allCoursesCategory_unqreplaceid_=new AllCoursesCategory_unqreplaceid_;`;
        var appendtabswitchbutton3 = `<button class="btn-tab edw-tab-btn" id="rules-tab" data-toggle="pill" data-bs-toggle="pill" data-target="#rules_unqreplaceid_" data-bs-target="#rules_unqreplaceid_" type="button" role="tab" aria-controls="rules" aria-selected="false"><ul><li class="edw-nav-tab-text">Faculty & Staff</li></ul></button>`;
        var appendtabnode3 = `<div class="tab-pane edw-slider-item fade" id="rules_unqreplaceid_" role="tabpanel" aria-labelledby="rules-tab"><div class="accordion accordion-box" id="accordionExample5"><div class="faq-card"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne5" aria-expanded="true" aria-controls="collapseOne5"><span>When does the school admission process usually begin?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne5" class="collapse show"><div class="faq-card-body"><p class="m-0">The specific documents may vary depending on the school but commonly required documents include</p><ul><li>Completed application form</li><li>Birth certificate or age proof</li></ul></div></div></div></div></div>`;
        var appendtabfaq3 = `<div class="faq-card"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><span>What factors do schools consider during the admission selection process?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/tabaccordioan3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseTwo" class="collapse"><div class="faq-card-body"><p class="m-0">The specific documents may vary depending on the school but commonly required documents include</p><ul><li>Completed application form</li><li>Birth certificate or age proof</li></ul></div></div></div>`;
        Vvveb.Components.extend("_base", "html/tab3", {
            name: "Accordion set 3 with tab",
            attributes: ['data-ebpb-tab3'],
            image: "icons/tab3.svg",
            classes: ['edwiser-pb-tab3'],
            html: (() => {
                return `<div class="edwiser-pb-tab3" data-vvveb-disabled-area contenteditable="false">${tabhtml3}<style>${tabcss3}</style><script>${tabjs3}</script></div>`;
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
                            edwclasses: "edwgroupheader edwcustomtabwithaccordiontitle",
                            data: {
                                header: "Tab " + slideno,
                                extraclass: "edwslideheading m-0 border-0",
                                type: "h5",
                                style: ""
                            }
                        },
                        {
                            name: "",
                            key: "deleteslideritem",
                            inputtype: EdwbuttonInput,
                            child: `.edw-slider-item-${i}`,
                            edwclasses: "edwslidedelbtn customtabdeletebutton",
                            data: { text: "", icon: "la-trash", extraclasses: "btn btn-outline-danger" },
                            onChange: function (node, value, input) {
                                $(node).remove();
                                $navdatatarget = "#" + $(node).attr('id');
                                $(tabswitch).each(function () {
                                    if ($(this).attr('data-target') == $navdatatarget) {
                                        $(this).remove();
                                    }
                                });
                                Vvveb.Components.render("html/tab3");
                                return node;
                            },
                        },
                        {
                            name:  `Tab title`,
                            key: "sliderdescription" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-tab-btn-${i} .edw-nav-tab-text`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },

                    );
                    var count = 1 ;
                    $(this).find('.faq-card').each(function (e) {
                        var regex = /faq-card-\d+/;
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
                        $(this).addClass("faq-card-" + count);
                        var accordionid = generateUniqueID();
                        $(this).find(`.card-heading`).attr('data-target', `#faqcardid${accordionid}`);
                        $(this).find(`.card-heading`).attr('data-bs-target', `#faqcardid${accordionid}`);
                        $(this).find(`.collapse`).attr('id', `faqcardid${accordionid}`);
                        properties.push(

                            {
                                name: "",
                                key: "slidergrouptitle" + count,
                                inputtype: EdwheaderInput,
                                edwclasses: "edwgroupheader accordiontabtitle accordiontabsetting",
                                data: {
                                    header: "Accordion " + count,
                                    extraclass: "edwslideheading m-0 border-0",
                                    type: "h6",
                                    style: ""
                                }
                            },
                            {
                                name: "",
                                key: "deletesliderinneritem"+i,
                                inputtype: EdwbuttonInput,
                                child: `.edw-slider-item-${i} .faq-card-${count}`,
                                edwclasses: "edwslidedelbtn accordiontabsetting customaccordiondeletebutton",
                                data: { text: "", icon: "la-trash", extraclasses: "btn btn-outline-danger" },
                                onChange: function (node, value, input) {
                                    $(node).remove();
                                    Vvveb.Components.render("html/tab3");
                                    return node;
                                },
                            },
                            {
                                name: SETTINGTITLES.TITLE,
                                key: "sliderdescription" + count,
                                htmlAttr: "innerHTML",
                                child: `.edw-slider-item-${i} .faq-card-${count}  .card-heading span`,
                                inputtype: TextInput,
                                edwclasses: "edwinputfield accordiontabsetting",

                            },
                            {
                                name: `Content`,
                                key: "sliderdescription" + count,
                                htmlAttr: "innerHTML",
                                child: `.edw-slider-item-${i} .faq-card-${count} .faq-card-body`,
                                inputtype: TextareaInput,
                                edwclasses: "edwinputfield accordiontabsetting",
                                data: {
                                    rows: 40,
                                }
                            }
                        );
                        properties = removeTabWithAccordionInnerDeleteButton($(this).closest('.edw-slider-item'),properties,i);
                        count++;
                    });
                    properties.push(
                        {
                            name: "",
                            key: "slideraddnewtab",
                            inputtype: EdwbuttonInput,
                            edwclasses: "edwnewslidebtn accordiontabaddtabbtn",
                            child: `.edw-slider-item-${i} .accordion`,
                            data: { text: "Add new accordion", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                            onChange: function (node) {
                                //render component properties again to include the new column inputs
                                $(node).append(appendtabfaq3);
                                Vvveb.Components.render("html/tab3");
                                return node;
                            }
                        },
                        {
                            name: "",
                            key: "slidergrouptitle",
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader rowseprator",
                            data: {
                                header: "",
                                extraclass: "edwslideheading m-0 p-0",
                                type: "h5",
                                style: ""
                            }
                        },
                    );
                });

                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('show active');
                }

                if (!$(node).find('.edw-nav-wrapper').children('.edw-tab-btn').hasClass('active')) {
                    $(node).find('.edw-tab-btn').first().addClass('active');
                }

                properties = removeDeleteButton(node, properties);
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                this.properties = properties.concat(this.properties);

                return node;
            },
            properties: [
                {
                    name: "",
                    key: "addNewSlide",
                    inputtype: EdwbuttonInput,
                    edwclasses: "edwnewslidebtn",
                    data: { text: "Add new tab", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                    onChange: function (node) {
                        //render component properties again to include the new column inputs
                        $(node).parent().find('.edw-slider-inner-container').append(appendtabnode3);
                        $(node).parent().find('.edw-nav-wrapper').append(appendtabswitchbutton3);
                        Vvveb.Components.render("html/tab3");
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

        // faqaccordion1
        var faqaccordionhtml1 = `<section class="section-accordion section-accordion1 edw-tab_unqreplaceid_" data-searchformshow="true" data-noofquestionsshown="5" data-paginationshow="true"><div class="section-container wrapper"><form class="search-form"><div class="input-group"><input style="border-radius: 50px;" type="text" class="form-control" name="searchquestion" placeholder="Ask a question..." value=""><button type="submit" class="btn-submitedit"><img src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/search.svg" alt="search"></button></div></form><div class="accordion accordion-box"><div class="faq-card edw-slider-item"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><span>What does your company do?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne" class="collapse show"><div class="faq-card-body"><p>A WordPress plugin is a bit of code that you can use to extend the features or capabilities of your current WordPress site. For instance, you can add forms, videos, a paywall, or even a learning management system directly into your WordPress site using plugins.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><span>What sets your company apart from competitors?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseTwo" class="collapse"><div class="faq-card-body"><p>A WordPress plugin is a bit of code that you can use to extend the features or capabilities of your current WordPress site. For instance, you can add forms, videos, a paywall, or even a learning management system directly into your WordPress site using plugins.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><span>How can I contact your customer support team?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseThree" class="collapse"><div class="faq-card-body"><p>A WordPress plugin is a bit of code that you can use to extend the features or capabilities of your current WordPress site. For instance, you can add forms, videos, a paywall, or even a learning management system directly into your WordPress site using plugins.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"><span>What payment methods do you accept?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseFour" class="collapse"><div class="faq-card-body"><p>A WordPress plugin is a bit of code that you can use to extend the features or capabilities of your current WordPress site. For instance, you can add forms, videos, a paywall, or even a learning management system directly into your WordPress site using plugins.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive"><span>What is your return and refund policy?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseFive" class="collapse"><div class="faq-card-body"><p>A WordPress plugin is a bit of code that you can use to extend the features or capabilities of your current WordPress site. For instance, you can add forms, videos, a paywall, or even a learning management system directly into your WordPress site using plugins.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix"><span>Are your products/services environmentally friendly?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseSix" class="collapse"><div class="faq-card-body"><p>A WordPress plugin is a bit of code that you can use to extend the features or capabilities of your current WordPress site. For instance, you can add forms, videos, a paywall, or even a learning management system directly into your WordPress site using plugins.</p></div></div></div></div><nav class="pagination-wrapper"><ul class="pagination"></ul></nav></div><input name="navigationbutton" class="form-check-input edw-faq-paginate-input" type="checkbox" checked="checked" style="display:none!important"><input name="navigationbutton" class="form-check-input edw-faq-searchform-disabler" type="checkbox" checked="checked" style="display:none!important"></section>`;
        var faqaccordioncss1 = `.edw-tab_unqreplaceid_ {padding: 40px 24px;background-color: #fff;}.edw-tab_unqreplaceid_ p {margin: 0;}.edw-tab_unqreplaceid_ .section-container {max-width: 1320px;margin: 0 auto;}.edw-tab_unqreplaceid_ .search-form {max-width: 424px;margin: 0 auto;}.edw-tab_unqreplaceid_ .search-form .input-group {position: relative;}.edw-tab_unqreplaceid_ .search-form input {padding: 20px 50px 20px 30px;height: 60px;border-radius: 50px !important;}.edw-tab_unqreplaceid_ .search-form .btn-submitedit {display: flex;align-items: center;padding: 20px 30px 20px 20px;cursor: pointer;background-color: transparent;border: 0;position: absolute;z-index: 5;top: 0;right: 0px;bottom: 0;}.edw-tab_unqreplaceid_ .faq-card {border-radius: 4px;border: 1px solid #D5DDEA;background-color: #FFF;}.edw-tab_unqreplaceid_ .card-heading {width: 100%;color: #313848;font-size: 16px;font-style: normal;font-weight: 600;line-height: 24px;padding: 30px 50px;transition: padding 0.5s ease;cursor: pointer;display: flex;justify-content: space-between;align-items: center;}.edw-tab_unqreplaceid_ .collaps-icon {display: none;}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) {box-shadow: 0px 8px 22px 0px rgba(0, 0, 0, 0.1);}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) .card-heading {padding-bottom: 10px;color: #FF4F18;}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) .collaps-icon {display: block;}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) .expande-icon {display: none;}.edw-tab_unqreplaceid_ .faq-card-body {padding: 0 50px 30px;}.edw-tab_unqreplaceid_ .faq-card-body p {font-size: 16px;font-weight: 400;line-height: 24px;color: #4C5A73;}.edw-tab_unqreplaceid_ .pagination-wrapper {margin-top: 30px;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination {justify-content: center;flex-wrap: wrap;gap: 5px;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination .page-link {font-size: 14px;color: #313848;border: 1px solid #D5DDEA;border-radius: 3px;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination .page-link:hover, .edw-tab_unqreplaceid_ .pagination-wrapper .pagination .page-link.active {background-color: #FF4F18;cursor: pointer;color: #fff;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination .prev, .edw-tab_unqreplaceid_ .pagination-wrapper .pagination .next {border: 0;padding-left: 4px;padding-right: 4px; background-color: unset;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination .prev:hover, .edw-tab_unqreplaceid_ .pagination-wrapper .pagination .next:hover {background-color: #fff;font-weight: 600;color: #333333;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination:has(.page-link:nth-child(2).active) .prev {color: #CCCCCC;pointer-events: none;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination:has(.page-link:nth-last-child(2).active) .next {color: #CCCCCC;pointer-events: none;}.edw-tab_unqreplaceid_ .accordion-box {display: flex;flex-direction: column;gap: 24px;margin-top: 40px;}.edw-tab_unqreplaceid_ .accordion-box .faq-card {display: none;}.edw-tab_unqreplaceid_ .accordion-box .faq-card.visible {display: block;}.edw-tab_unqreplaceid_[data-paginationshow="false"] .faq-card {display: block;}.edw-tab_unqreplaceid_[data-paginationshow="false"] .pagination-wrapper {display: none;}.edw-tab_unqreplaceid_[data-searchformshow="false"] .search-form {display: none;}.edw-tab_unqreplaceid_ input.form-check-input {display: none;}@keyframes blurEffect {0% {opacity: 0.6;}50% {opacity: 0.2;}100% {opacity: 1;}}@media screen and (max-width: 1024px) {.edw-tab_unqreplaceid_ .section-container {max-width: 820px;}}@media screen and (max-width: 767px) {.edw-tab_unqreplaceid_ .section-container {max-width: 600px;}.edw-tab_unqreplaceid_ .card-heading {padding-left: 30px;padding-right: 30px;}.edw-tab_unqreplaceid_ .faq-card-body {padding: 0 30px 30px;}}`;
        var faqaccordionjs1 = `class Accordion1_unqreplaceid_{constructor(){this.accordion1=document.querySelector(".edw-tab_unqreplaceid_"),this.accordion1.hasAttribute("data-noofquestionsshown")||this.accordion1.setAttribute("data-noofquestionsshown","4"),this.noofquestionsshown=this.accordion1.getAttribute("data-noofquestionsshown");let i=this.noofquestionsshown;i.includes(".")?this.noofquestionsshown=Math.round(parseFloat(i)):this.noofquestionsshown=parseInt(i),console.log(this.noofquestionsshown),this.paginationshow=this.accordion1.getAttribute("data-paginationshow"),this.accordionTempBox=this.accordion1.querySelector(".accordion-box"),this.clonedAccordion=this.accordionTempBox.cloneNode(!0),this.accordionTempBox.innerHTML="",this.accordionbox=this.accordion1.querySelector(".accordion-box"),this.searchForm=this.accordion1.querySelector(".search-form"),this.inputField=this.accordion1.querySelector(".search-form input"),this.lastActivePage=1,this.paginationItemClicked=this.paginationItemClicked.bind(this),this.searchFormSubmit=this.searchFormSubmit.bind(this),this.searchinputchange=this.searchinputchanged.bind(this),this.windowsloadhandler=this.windowsloadhandler.bind(this),this.initializeEventListeners(),this.copyFaqToFinalBox()}initializeEventListeners(){"false"!==this.paginationshow&&"page-local-edwiserpagebuilder-editor"!==document.body.id&&(this.initializeQuestions(),this.accordion1.querySelector(".pagination").addEventListener("click",this.paginationItemClicked)),this.searchForm.addEventListener("submit",this.searchFormSubmit),this.inputField.addEventListener("input",this.searchinputchanged),window.addEventListener("load",this.windowsloadhandler)}windowsloadhandler(){"page-local-edwiserpagebuilder-editor"===document.body.id&&(this.accordionTempBox.style.height="70vh",this.accordionTempBox.style.overflowY="auto",this.accordion1.querySelectorAll(".accordion-box .faq-card").forEach(i=>{i.style.display="block"}),this.accordion1.querySelector(".pagination-wrapper").style.display="none")}copyFaqToFinalBox(i=""){let t=this.accordion1.querySelector(".accordion-box");if(t.innerHTML="",i){let e=i.trim().toLowerCase();this.clonedAccordion.querySelectorAll(".faq-card").forEach(i=>{let o=i.querySelector(".card-heading span").textContent.toLowerCase(),a=i.querySelector(".faq-card-body p").textContent.toLowerCase();(o.includes(e)||a.includes(e))&&t.appendChild(i.cloneNode(!0))})}else{let o=this.clonedAccordion.querySelectorAll(".faq-card");o.forEach(i=>{t.appendChild(i.cloneNode(!0))})}"false"!==this.paginationshow&&"page-local-edwiserpagebuilder-editor"!==document.body.id&&this.initializeQuestions()}initializeQuestions(i=0){0!==i&&i!==this.lastActivePage?(this.lastActivePage=i,this.accordionbox.style.animation="blurEffect 0.3s ease",setTimeout(()=>{let t=this.accordion1.querySelectorAll(".faq-card.visible");t.forEach((i,t)=>{i.classList.remove("visible")});let e=this.noofquestionsshown*(i-1)+1,o=this.noofquestionsshown*i;this.accordion1.querySelectorAll(".faq-card:nth-child(n+"+e+"):nth-child(-n+"+o+")").forEach(i=>{i.classList.add("visible")})},100),setTimeout(()=>{this.accordionbox.style.animation=""},300)):0===i&&(this.accordion1.querySelectorAll(".accordion-box .faq-card:nth-child(n+1):nth-child(-n+"+this.noofquestionsshown+")").forEach(i=>{i.classList.add("visible")}),this.accordion1.querySelectorAll(".accordion-box .faq-card").forEach((i,t)=>{0!==t&&(t+1)%this.noofquestionsshown==1&&i.querySelector(".card-heading").click()}),this.createPagination())}createPagination(){let i=Math.ceil(this.accordion1.querySelectorAll(".accordion-box .faq-card").length/this.noofquestionsshown),t=this.accordion1.querySelector(".pagination-wrapper .pagination");if(t.innerHTML="",i>1)for(let e=0;e<=i+1;e++){let o=document.createElement("li");o.classList.add("page-item","page-link"),o.setAttribute("data-value",e),o.textContent=e,0===e?(o.textContent="Prev",o.classList.add("prev")):e==i+1&&(o.textContent="Next",o.classList.add("next")),1===e&&o.classList.add("active"),t.appendChild(o)}}paginationItemClicked(i){if(i.target.classList.contains("page-item")){let t=this.accordion1.querySelector(".pagination .page-link.active"),e=i.target.getAttribute("data-value");i.target.classList.contains("prev")?e=t.getAttribute("data-value")-1:i.target.classList.contains("next")&&(e=Number(t.getAttribute("data-value"))+1),t.classList.remove("active"),this.accordion1.querySelector('.pagination .page-link[data-value="'+e+'"]').classList.add("active"),this.initializeQuestions(e)}}searchFormSubmit(i){i.preventDefault();let t=i.target.querySelector("input").value;this.copyFaqToFinalBox(t)}searchinputchanged=i=>{let t=i.target.value;this.copyFaqToFinalBox(t)}}const accordion1_unqreplaceid_=new Accordion1_unqreplaceid_;`;
        var appendtabfaq1 = `<div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix"><span>Are your products/services environmentally friendly?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion1/images/icons/collaps.svg" alt="collapse"></div><div id="collapseSix" class="collapse"><div class="faq-card-body"><p>A WordPress plugin is a bit of code that you can use to extend the features or capabilities of your current WordPress site. For instance, you can add forms, videos, a paywall, or even a learning management system directly into your WordPress site using plugins.</p></div></div></div>`;
        Vvveb.Components.extend("_base", "html/faqaccordion1", {
            name: "Accordion set 1",
            attributes: ['data-ebpb-faqaccordion1'],
            image: "icons/accordionset1.svg",
            classes: ['edwiser-pb-faqaccordion1'],
            html: (() => {
                return `<div class="edwiser-pb-faqaccordion1" data-vvveb-disabled-area contenteditable="false">${faqaccordionhtml1}<style>${faqaccordioncss1}</style><script>${faqaccordionjs1}</script></div>`;
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

                    var tabid = "edw-slider-item-" + slideno;
                    $(this).find('.collapse').attr('id', tabid);
                    $(this).find('.card-heading').attr('data-target', "#" + tabid);

                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "FAQ " + slideno,
                                extraclass: "edwslideheading m-0",
                                type: "h5",
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

                                var  paginationperpagevalue = $(node).closest('.section-accordion').attr('data-noofquestionsshown');
                                var accordionnode = $(node).closest('.section-accordion');
                                showhidefaqaccordingtosetting(accordionnode,paginationperpagevalue);
                                generatepagination(accordionnode,paginationperpagevalue)

                                $(node).remove();

                                Vvveb.Components.render("html/faqaccordion1");
                                return node;
                            },
                        },
                        {
                            name:  SETTINGTITLES.FAQTITLE,
                            key: "slidertitle" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-slider-item-${i} .card-heading span`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },
                        {
                            name:  SETTINGTITLES.FAQDESCRIPTION,
                            key: "slidertitle" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-slider-item-${i} .faq-card-body p`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },

                    );

                });

                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('show active');
                }

                slideIntervalfielddisabler(node);

                properties = removeDeleteButton(node, properties);
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                this.properties = properties.concat(this.properties);
                // this.properties = disableaddnewslidebutton(node,this.properties, 4);
                return node;
            },
            properties: [
                {
                    name: "",
                    key: "addNewSlide",
                    inputtype: EdwbuttonInput,
                    edwclasses: "edwnewslidebtn",
                    child: ".accordion.accordion-box",
                    data: { text: "Add new FAQ", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                    onChange: function (node) {
                        //render component properties again to include the new column inputs
                        $(node).append(appendtabfaq1);

                        var  paginationperpagevalue = $(node).closest('.section-accordion').attr('data-noofquestionsshown');
                        var accordionnode = $(node).closest('.section-accordion');
                        showhidefaqaccordingtosetting(accordionnode,paginationperpagevalue);
                        generatepagination(accordionnode,paginationperpagevalue)

                        Vvveb.Components.render("html/faqaccordion1");
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.FAQSHOWHIDESEARCHFIELDTITLE,
                    key: "data-searchformshow",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-faq-searchform-disabler',
                    onChange: function (node, value, input) {

                        if (value == true) {
                            $(node).parent().attr('data-searchformshow', 'true');
                            $(node).parent().find('.search-form').removeClass('d-none');
                        } else {
                            $(node).parent().attr('data-searchformshow', 'false');
                            $(node).parent().find('.search-form').addClass('d-none');
                        }
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.FAQPAGINATESETTINGTITLE,
                    key: "data-paginationshow",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-faq-paginate-input',
                    onChange: function (node, value, input) {
                        var slideintervalfield = $(input).closest('section').find('[data-key="paginationperpagevalue"]');
                        if (value == true) {
                            $(node).parent().attr('data-paginationshow', 'true');

                            var  paginationperpagevalue = $(node).closest('.section-accordion').attr('data-noofquestionsshown');
                            var accordionnode = $(node).closest('.section-accordion');
                            showhidefaqaccordingtosetting(accordionnode,paginationperpagevalue);
                            generatepagination(accordionnode,paginationperpagevalue)
                        } else {
                            $(node).parent().attr('data-paginationshow', 'false');
                        }
                        slideIntervalfielddisabler(node);
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.FAQPAGINATEPERPAGESETTINGTITLE,
                    key: "paginationperpagevalue",
                    htmlAttr: "data-noofquestionsshown",
                    inputtype: TextInput,
                    edwclasses: "edwinputfield",
                    child: `.section-accordion`,
                    onChange: function (node, value, input) {

                        if (value.trim() == "") {
                            value = '4';
                        }
                        if (value.indexOf('.') > -1) {
                            value = Math.round(parseFloat(value));
                        }
                        setTimeout(() => {
                            $(node).attr('data-noofquestionsshown', value);
                        }, 300);

                        showhidefaqaccordingtosetting(node,value);
                        generatepagination(node,value)
                        return node;
                    }
                }
            ]
        });

        // faqaccordion2
        var faqaccordionhtml2 = `<section class="section-accordion section-accordion1 edw-tab_unqreplaceid_" data-searchformshow="true" data-noofquestionsshown="5" data-paginationshow="true"><div class="section-container wrapper"><form class="search-form"><div class="input-group"><input style="border-radius: 50px;" type="text" class="form-control" name="searchquestion" placeholder="Ask a question..." value=""><button type="submit" class="btn-submitedit"><img src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/search.svg" alt="search"></button></div></form><div class="accordion accordion-box"><div class="faq-card edw-slider-item"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><span>How do I get started with the webpage builder</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne" class="collapse show"><div class="faq-card-body"><p>Yes. Magic Spoon is perfect for anyone on a ketogenic or low carb diet. Each serving has 4g net carbs, and 0.5-1.5g saturated fats from a blend of high-oleic sunflower oil and avocado oil.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><span>Can I customize the design and layout of my webpage?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseTwo" class="collapse"><div class="faq-card-body"><p>Yes. Magic Spoon is perfect for anyone on a ketogenic or low carb diet. Each serving has 4g net carbs, and 0.5-1.5g saturated fats from a blend of high-oleic sunflower oil and avocado oil.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><span>Is the webpage builder suitable for both beginners and advanced users?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseThree" class="collapse"><div class="faq-card-body"><p>Yes. Magic Spoon is perfect for anyone on a ketogenic or low carb diet. Each serving has 4g net carbs, and 0.5-1.5g saturated fats from a blend of high-oleic sunflower oil and avocado oil.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"><span>What kind of templates and themes are available?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseFour" class="collapse"><div class="faq-card-body"><p>Yes. Magic Spoon is perfect for anyone on a ketogenic or low carb diet. Each serving has 4g net carbs, and 0.5-1.5g saturated fats from a blend of high-oleic sunflower oil and avocado oil.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive"><span>Does the webpage builder support mobile responsiveness?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseFive" class="collapse"><div class="faq-card-body"><p>Yes. Magic Spoon is perfect for anyone on a ketogenic or low carb diet. Each serving has 4g net carbs, and 0.5-1.5g saturated fats from a blend of high-oleic sunflower oil and avocado oil.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix"><span>Can I add interactive elements like forms and buttons to my webpage?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseSix" class="collapse"><div class="faq-card-body"><p>Yes. Magic Spoon is perfect for anyone on a ketogenic or low carb diet. Each serving has 4g net carbs, and 0.5-1.5g saturated fats from a blend of high-oleic sunflower oil and avocado oil.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven"><span>Can I add interactive elements like forms and buttons to my webpage?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseSeven" class="collapse"><div class="faq-card-body"><p>Yes. Magic Spoon is perfect for anyone on a ketogenic or low carb diet. Each serving has 4g net carbs, and 0.5-1.5g saturated fats from a blend of high-oleic sunflower oil and avocado oil.</p></div></div></div></div><nav class="pagination-wrapper"><ul class="pagination"></ul></nav></div><input name="navigationbutton" class="form-check-input edw-faq-paginate-input" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-faq-searchform-disabler" type="checkbox" checked="checked" style="display:none!important"></section>`;
        var faqaccordioncss2 = `.edw-tab_unqreplaceid_ {padding: 40px 24px;background-color: #fff;}.edw-tab_unqreplaceid_ p {margin: 0;}.edw-tab_unqreplaceid_ .section-container {max-width: 1320px;margin: 0 auto;}.edw-tab_unqreplaceid_ .search-form {max-width: 424px;margin: 0 auto;}.edw-tab_unqreplaceid_ .search-form .input-group {position: relative;}.edw-tab_unqreplaceid_ .search-form input {padding: 20px 50px 20px 30px;height: 60px;border-radius: 50px !important;border: 1px solid #4C5A73;}.edw-tab_unqreplaceid_ .search-form .btn-submitedit {display: flex;align-items: center;padding: 20px 30px 20px 20px;cursor: pointer;background-color: transparent;border: 0;position: absolute;z-index: 5;top: 0;right: 0px;bottom: 0;}.edw-tab_unqreplaceid_ .search-form .btn-submitedit:focus {outline: 0;}.edw-tab_unqreplaceid_ .faq-card {border-bottom: 1px solid #D5DDEA;background-color: #FFF;}.edw-tab_unqreplaceid_ .card-heading {width: 100%;color: #313848;font-size: 16px;font-style: normal;font-weight: 600;line-height: 24px;padding: 30px 0px;transition: padding 0.5s ease;cursor: pointer;display: flex;justify-content: space-between;align-items: center;}.edw-tab_unqreplaceid_ .collaps-icon {display: none;}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) .card-heading {padding-bottom: 5px;}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) .collaps-icon {display: block;}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) .expande-icon {display: none;}.edw-tab_unqreplaceid_ .faq-card-body {padding: 0 0px 30px;}.edw-tab_unqreplaceid_ .faq-card-body p {font-size: 16px;font-weight: 400;line-height: 24px;color: #4C5A73;}.edw-tab_unqreplaceid_ .pagination-wrapper {margin-top: 30px;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination {justify-content: center;flex-wrap: wrap;gap: 5px;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination .page-link {font-size: 14px;color: #313848;border: 1px solid #D5DDEA;border-radius: 3px;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination .page-link:hover, .edw-tab_unqreplaceid_ .pagination-wrapper .pagination .page-link.active {background-color: #3E86F5;cursor: pointer;color: #fff;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination .prev, .edw-tab_unqreplaceid_ .pagination-wrapper .pagination .next {border: 0;padding-left: 4px;padding-right: 4px; background-color: unset;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination .prev:hover, .edw-tab_unqreplaceid_ .pagination-wrapper .pagination .next:hover {background-color: #fff;font-weight: 600;color: #333333;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination:has(.page-link:nth-child(2).active) .prev {color: #CCCCCC;pointer-events: none;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination:has(.page-link:nth-last-child(2).active) .next {color: #CCCCCC;pointer-events: none;}.edw-tab_unqreplaceid_ .accordion-box {display: flex;flex-direction: column;margin-top: 40px;}.edw-tab_unqreplaceid_ .accordion-box .faq-card {display: none;}.edw-tab_unqreplaceid_ .accordion-box .faq-card.visible {display: block;}.edw-tab_unqreplaceid_[data-paginationshow="false"] .faq-card {display: block;}.edw-tab_unqreplaceid_[data-paginationshow="false"] .pagination-wrapper {display: none;}@keyframes blurEffect {0% {opacity: 0.6;}50% {opacity: 0.2;}100% {opacity: 1;}}@media screen and (max-width: 1024px) and (min-width: 768px) {.edw-tab_unqreplaceid_ .section-container {max-width: 820px;}.edw-tab_unqreplaceid_ .accordion-box {padding-left: 24px;padding-right: 24px;}}@media screen and (max-width: 767px) {.edw-tab_unqreplaceid_ .section-container {max-width: 600px;}}@media screen and (min-width: 1024px) {.edw-limitedwidth-block .edw-tab_unqreplaceid_ .accordion-box {padding-left: 24px;padding-right: 24px;}}`;
        var faqaccordionjs2 = `class Accordion1_unqreplaceid_{constructor(){this.accordion1=document.querySelector(".edw-tab_unqreplaceid_"),this.accordion1.hasAttribute("data-noofquestionsshown")||this.accordion1.setAttribute("data-noofquestionsshown","4"),this.noofquestionsshown=this.accordion1.getAttribute("data-noofquestionsshown");let i=this.noofquestionsshown;i.includes(".")?this.noofquestionsshown=Math.round(parseFloat(i)):this.noofquestionsshown=parseInt(i),this.paginationshow=this.accordion1.getAttribute("data-paginationshow"),this.accordionTempBox=this.accordion1.querySelector(".accordion-box"),this.clonedAccordion=this.accordionTempBox.cloneNode(!0),this.accordionTempBox.innerHTML="",this.accordionbox=this.accordion1.querySelector(".accordion-box"),this.searchForm=this.accordion1.querySelector(".search-form"),this.inputField=this.accordion1.querySelector(".search-form input"),this.lastActivePage=1,this.paginationItemClicked=this.paginationItemClicked.bind(this),this.searchFormSubmit=this.searchFormSubmit.bind(this),this.searchinputchange=this.searchinputchanged.bind(this),this.windowsloadhandler=this.windowsloadhandler.bind(this),this.initializeEventListeners(),this.copyFaqToFinalBox()}initializeEventListeners(){"false"!==this.paginationshow&&"page-local-edwiserpagebuilder-editor"!==document.body.id&&(this.initializeQuestions(),this.accordion1.querySelector(".pagination").addEventListener("click",this.paginationItemClicked)),this.searchForm.addEventListener("submit",this.searchFormSubmit),this.inputField.addEventListener("input",this.searchinputchanged),window.addEventListener("load",this.windowsloadhandler)}windowsloadhandler(){"page-local-edwiserpagebuilder-editor"===document.body.id&&(this.accordionTempBox.style.height="70vh",this.accordionTempBox.style.overflowY="auto",this.accordion1.querySelectorAll(".accordion-box .faq-card").forEach(i=>{i.style.display="block"}),this.accordion1.querySelector(".pagination-wrapper").style.display="none")}copyFaqToFinalBox(i=""){let t=this.accordion1.querySelector(".accordion-box");if(t.innerHTML="",i){let e=i.trim().toLowerCase();this.clonedAccordion.querySelectorAll(".faq-card").forEach(i=>{let o=i.querySelector(".card-heading span").textContent.toLowerCase(),a=i.querySelector(".faq-card-body p").textContent.toLowerCase();(o.includes(e)||a.includes(e))&&t.appendChild(i.cloneNode(!0))})}else{let o=this.clonedAccordion.querySelectorAll(".faq-card");o.forEach(i=>{t.appendChild(i.cloneNode(!0))})}"false"!==this.paginationshow&&"page-local-edwiserpagebuilder-editor"!==document.body.id&&this.initializeQuestions()}initializeQuestions(i=0){0!==i&&i!==this.lastActivePage?(this.lastActivePage=i,this.accordionbox.style.animation="blurEffect 0.3s ease",setTimeout(()=>{let t=this.accordion1.querySelectorAll(".faq-card.visible");t.forEach((i,t)=>{i.classList.remove("visible")});let e=this.noofquestionsshown*(i-1)+1,o=this.noofquestionsshown*i;this.accordion1.querySelectorAll(".faq-card:nth-child(n+"+e+"):nth-child(-n+"+o+")").forEach(i=>{i.classList.add("visible")})},100),setTimeout(()=>{this.accordionbox.style.animation=""},300)):0===i&&(this.accordion1.querySelectorAll(".accordion-box .faq-card:nth-child(n+1):nth-child(-n+"+this.noofquestionsshown+")").forEach(i=>{i.classList.add("visible")}),this.accordion1.querySelectorAll(".accordion-box .faq-card").forEach((i,t)=>{0!==t&&(t+1)%this.noofquestionsshown==1&&i.querySelector(".card-heading").click()}),this.createPagination())}createPagination(){let i=Math.ceil(this.accordion1.querySelectorAll(".accordion-box .faq-card").length/this.noofquestionsshown),t=this.accordion1.querySelector(".pagination-wrapper .pagination");if(t.innerHTML="",i>1)for(let e=0;e<=i+1;e++){let o=document.createElement("li");o.classList.add("page-item","page-link"),o.setAttribute("data-value",e),o.textContent=e,0===e?(o.textContent="Prev",o.classList.add("prev")):e==i+1&&(o.textContent="Next",o.classList.add("next")),1===e&&o.classList.add("active"),t.appendChild(o)}}paginationItemClicked(i){if(i.target.classList.contains("page-item")){let t=this.accordion1.querySelector(".pagination .page-link.active"),e=i.target.getAttribute("data-value");i.target.classList.contains("prev")?e=t.getAttribute("data-value")-1:i.target.classList.contains("next")&&(e=Number(t.getAttribute("data-value"))+1),t.classList.remove("active"),this.accordion1.querySelector('.pagination .page-link[data-value="'+e+'"]').classList.add("active"),this.initializeQuestions(e)}}searchFormSubmit(i){i.preventDefault();let t=i.target.querySelector("input").value;this.copyFaqToFinalBox(t)}searchinputchanged=i=>{let t=i.target.value;this.copyFaqToFinalBox(t)}}const accordion1_unqreplaceid_=new Accordion1_unqreplaceid_;`;
        var appendfaq2 = `<div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne"><span>How do I get started with the webpage builder</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion2/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne" class="collapse"><div class="faq-card-body"><p>Yes. Magic Spoon is perfect for anyone on a ketogenic or low carb diet. Each serving has 4g net carbs, and 0.5-1.5g saturated fats from a blend of high-oleic sunflower oil and avocado oil.</p></div></div></div>`;
        Vvveb.Components.extend("_base", "html/faqaccordion2", {
            name: "Accordion set 2",
            attributes: ['data-ebpb-faqaccordion2'],
            image: "icons/accordionset2.svg",
            classes: ['edwiser-pb-faqaccordion2'],
            html: (() => {
                return `<div class="edwiser-pb-faqaccordion2" data-vvveb-disabled-area contenteditable="false">${faqaccordionhtml2}<style>${faqaccordioncss2}</style><script>${faqaccordionjs2}</script></div>`;
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

                    var tabid = "edw-slider-item-" + slideno;
                    $(this).find('.collapse').attr('id', tabid);
                    $(this).find('.card-heading').attr('data-target', "#" + tabid);

                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "FAQ " + slideno,
                                extraclass: "edwslideheading m-0",
                                type: "h5",
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

                                var  paginationperpagevalue = $(node).closest('.section-accordion').attr('data-noofquestionsshown');
                                var accordionnode = $(node).closest('.section-accordion');
                                showhidefaqaccordingtosetting(accordionnode,paginationperpagevalue);
                                generatepagination(accordionnode,paginationperpagevalue)

                                $(node).remove();
                                Vvveb.Components.render("html/faqaccordion2");
                                return node;
                            },
                        },
                        {
                            name:  SETTINGTITLES.FAQTITLE,
                            key: "slidertitle" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-slider-item-${i} .card-heading span`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },
                        {
                            name:  SETTINGTITLES.FAQDESCRIPTION,
                            key: "slidertitle" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-slider-item-${i} .faq-card-body p`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },

                    );

                });

                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('show active');
                }

                slideIntervalfielddisabler(node);

                properties = removeDeleteButton(node, properties);
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                this.properties = properties.concat(this.properties);
                // this.properties = disableaddnewslidebutton(node,this.properties, 4);
                return node;
            },
            properties: [
                {
                    name: "",
                    key: "addNewSlide",
                    inputtype: EdwbuttonInput,
                    edwclasses: "edwnewslidebtn",
                    child: ".accordion.accordion-box",
                    data: { text: "Add new FAQ", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                    onChange: function (node) {
                        //render component properties again to include the new column inputs
                        $(node).append(appendfaq2);

                        var  paginationperpagevalue = $(node).closest('.section-accordion').attr('data-noofquestionsshown');
                        var accordionnode = $(node).closest('.section-accordion');
                        showhidefaqaccordingtosetting(accordionnode,paginationperpagevalue);
                        generatepagination(accordionnode,paginationperpagevalue)

                        Vvveb.Components.render("html/faqaccordion2");
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.FAQSHOWHIDESEARCHFIELDTITLE,
                    key: "data-searchformshow",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-faq-searchform-disabler',
                    onChange: function (node, value, input) {

                        if (value == true) {
                            $(node).parent().attr('data-searchformshow', 'true');
                            $(node).parent().find('.search-form').removeClass('d-none');
                        } else {
                            $(node).parent().attr('data-searchformshow', 'false');
                            $(node).parent().find('.search-form').addClass('d-none');
                        }
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.FAQPAGINATESETTINGTITLE,
                    key: "data-paginationshow",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-faq-paginate-input',
                    onChange: function (node, value, input) {
                        var slideintervalfield = $(input).closest('section').find('[data-key="paginationperpagevalue"]');
                        if (value == true) {
                            $(node).parent().attr('data-paginationshow', 'true');

                            var  paginationperpagevalue = $(node).closest('.section-accordion').attr('data-noofquestionsshown');
                            var accordionnode = $(node).closest('.section-accordion');
                            showhidefaqaccordingtosetting(accordionnode,paginationperpagevalue);
                            generatepagination(accordionnode,paginationperpagevalue)
                        } else {
                            $(node).parent().attr('data-paginationshow', 'false');
                        }
                        slideIntervalfielddisabler(node);
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.FAQPAGINATEPERPAGESETTINGTITLE,
                    key: "paginationperpagevalue",
                    htmlAttr: "data-noofquestionsshown",
                    inputtype: TextInput,
                    edwclasses: "edwinputfield",
                    child: `.section-accordion`,
                    onChange: function (node, value, input) {

                        if (value.trim() == '') {
                            value = 4;
                        }

                        if (value.indexOf('.') > -1) {
                            value = Math.round(parseFloat(value));
                        }
                        setTimeout(() => {
                            $(node).attr('data-noofquestionsshown', value);
                        }, 300);

                        showhidefaqaccordingtosetting(node,value);
                        generatepagination(node,value)
                        return node;
                    }
                }
            ]
        });

        // faqaccordion3
        var faqaccordionhtml3 = `<section class="section-accordion section-accordion1 edw-tab_unqreplaceid_" data-searchformshow="true" data-noofquestionsshown="4" data-paginationshow="true"><div class="section-container wrapper"><form class="search-form"><div class="input-group"><input style="border-radius: 50px;" type="text" class="form-control" name="searchquestion" placeholder="Ask a question..." value=""><button type="submit" class="btn-submitedit"><img src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/search.svg" alt="search"></button></div></form><div class="accordion accordion-box"><div class="faq-card edw-slider-item"><div class="card-heading" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"><span>What is a payment gateway?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseOne" class="collapse show"><div class="faq-card-body"><p>A payment gateway is an ecommerce service that processes online payments for online as well as offline businesses. Payment gateways help accept payments by transferring key information from their merchant websites to issuing banks, card associations and online wallet players.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><span>What languages are offered for online coaching?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseTwo" class="collapse"><div class="faq-card-body"><p>A payment gateway is an ecommerce service that processes online payments for online as well as offline businesses. Payment gateways help accept payments by transferring key information from their merchant websites to issuing banks, card associations and online wallet players.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><span>How are the lessons structured and customized for individual needs?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseThree" class="collapse"><div class="faq-card-body"><p>A payment gateway is an ecommerce service that processes online payments for online as well as offline businesses. Payment gateways help accept payments by transferring key information from their merchant websites to issuing banks, card associations and online wallet players.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"><span>What is the duration and frequency of coaching sessions?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseFour" class="collapse"><div class="faq-card-body"><p>A payment gateway is an ecommerce service that processes online payments for online as well as offline businesses. Payment gateways help accept payments by transferring key information from their merchant websites to issuing banks, card associations and online wallet players.</p></div></div></div><div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive"><span>Can I choose the specific focus of my language learning, such as business or travel?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseFive" class="collapse"><div class="faq-card-body"><p>A payment gateway is an ecommerce service that processes online payments for online as well as offline businesses. Payment gateways help accept payments by transferring key information from their merchant websites to issuing banks, card associations and online wallet players.</p></div></div></div></div><nav class="pagination-wrapper"><ul class="pagination"></ul></nav></div><input name="navigationbutton" class="form-check-input edw-faq-paginate-input" type="checkbox" checked="checked" style="display:none!important"> <input name="navigationbutton" class="form-check-input edw-faq-searchform-disabler" type="checkbox" checked="checked" style="display:none!important"></section>`;
        var faqaccordioncss3 = `.edw-tab_unqreplaceid_ {padding: 40px 24px;background-color: #07141F;}.edw-tab_unqreplaceid_ p {margin: 0;}.edw-tab_unqreplaceid_ .section-container {max-width: 1320px;margin: 0 auto;}.edw-tab_unqreplaceid_ .search-form {max-width: 424px;margin: 0 auto;}.edw-tab_unqreplaceid_ .search-form .input-group {position: relative;}.edw-tab_unqreplaceid_ .search-form input {padding: 20px 50px 20px 30px;height: 60px;border: 1px solid #4C5A73;color: #fff;border-radius: 50px !important;background-color: #132231;}.edw-tab_unqreplaceid_ .search-form input::placeholder {color: #fff;}.edw-tab_unqreplaceid_ .search-form .btn-submitedit {display: flex;align-items: center;padding: 20px 30px 20px 20px;cursor: pointer;background-color: transparent;border: 0;position: absolute;z-index: 5;top: 0;right: 0px;bottom: 0;}.edw-tab_unqreplaceid_ .faq-card {border-radius: 10px;border: 1px solid #006455;}.edw-tab_unqreplaceid_ .card-heading {width: 100%;color: #FFF;font-size: 16px;font-style: normal;font-weight: 400;line-height: 28px;padding: 24px 50px;transition: padding 0.5s ease;cursor: pointer;display: flex;justify-content: space-between;align-items: center;}.edw-tab_unqreplaceid_ .collaps-icon {display: none;}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) {background-color: #132231;}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) .card-heading {font-weight: 700;padding-bottom: 10px;}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) .collaps-icon {display: block;}.edw-tab_unqreplaceid_ .faq-card:not(:has(.collapsed)) .expande-icon {display: none;}.edw-tab_unqreplaceid_ .faq-card-body {padding: 0 50px 24px;}.edw-tab_unqreplaceid_ .faq-card-body p {font-size: 14px;font-weight: 400;line-height: 26px;color: #9BCAC3;}.edw-tab_unqreplaceid_ .pagination-wrapper {margin-top: 30px;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination {justify-content: center;flex-wrap: wrap;gap: 5px;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination .page-link {font-size: 14px;color: #fff;border: 1px solid #006455;border-radius: 3px;background-color: unset;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination .page-link:hover, .edw-tab_unqreplaceid_ .pagination-wrapper .pagination .page-link.active {background-color: #5CFF85;cursor: pointer;color: #313848;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination .prev, .edw-tab_unqreplaceid_ .pagination-wrapper .pagination .next {border: 0;padding-left: 4px;padding-right: 4px; background-color: unset;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination .prev:hover, .edw-tab_unqreplaceid_ .pagination-wrapper .pagination .next:hover {background-color: unset;font-weight: 600;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination:has(.page-link:nth-child(2).active) .prev {color: #CCCCCC;opacity: 0.6;pointer-events: none;}.edw-tab_unqreplaceid_ .pagination-wrapper .pagination:has(.page-link:nth-last-child(2).active) .next {color: #CCCCCC;pointer-events: none;}.edw-tab_unqreplaceid_ .accordion-box {display: flex;flex-direction: column;gap: 24px;margin-top: 40px;}.edw-tab_unqreplaceid_ .accordion-box .faq-card {display: none;}.edw-tab_unqreplaceid_ .accordion-box .faq-card.visible {display: block;}.edw-tab_unqreplaceid_[data-paginationshow="false"] .faq-card {display: block;}.edw-tab_unqreplaceid_[data-paginationshow="false"] .pagination-wrapper {display: none;}@keyframes blurEffect {0% {opacity: 0.6;}50% {opacity: 0.2;}100% {opacity: 1;}}@media screen and (max-width: 1024px) {.edw-tab_unqreplaceid_ .section-container {max-width: 820px;}}@media screen and (max-width: 767px) {.edw-tab_unqreplaceid_ .section-container {max-width: 600px;}.edw-tab_unqreplaceid_ .card-heading {padding-left: 30px;padding-right: 30px;}.edw-tab_unqreplaceid_ .faq-card-body {padding: 0 30px 30px;}}`;
        var faqaccordionjs3 = `class Accordion1_unqreplaceid_{constructor(){this.accordion1=document.querySelector(".edw-tab_unqreplaceid_"),this.accordion1.hasAttribute("data-noofquestionsshown")||this.accordion1.setAttribute("data-noofquestionsshown","4"),this.noofquestionsshown=this.accordion1.getAttribute("data-noofquestionsshown");let i=this.noofquestionsshown;i.includes(".")?this.noofquestionsshown=Math.round(parseFloat(i)):this.noofquestionsshown=parseInt(i),this.paginationshow=this.accordion1.getAttribute("data-paginationshow"),this.accordionTempBox=this.accordion1.querySelector(".accordion-box"),this.clonedAccordion=this.accordionTempBox.cloneNode(!0),this.accordionTempBox.innerHTML="",this.accordionbox=this.accordion1.querySelector(".accordion-box"),this.searchForm=this.accordion1.querySelector(".search-form"),this.inputField=this.accordion1.querySelector(".search-form input"),this.lastActivePage=1,this.paginationItemClicked=this.paginationItemClicked.bind(this),this.searchFormSubmit=this.searchFormSubmit.bind(this),this.searchinputchange=this.searchinputchanged.bind(this),this.windowsloadhandler=this.windowsloadhandler.bind(this),this.initializeEventListeners(),this.copyFaqToFinalBox()}initializeEventListeners(){"false"!==this.paginationshow&&"page-local-edwiserpagebuilder-editor"!==document.body.id&&(this.initializeQuestions(),this.accordion1.querySelector(".pagination").addEventListener("click",this.paginationItemClicked)),this.searchForm.addEventListener("submit",this.searchFormSubmit),this.inputField.addEventListener("input",this.searchinputchanged),window.addEventListener("load",this.windowsloadhandler)}windowsloadhandler(){"page-local-edwiserpagebuilder-editor"===document.body.id&&(this.accordionTempBox.style.height="70vh",this.accordionTempBox.style.overflowY="auto",this.accordion1.querySelectorAll(".accordion-box .faq-card").forEach(i=>{i.style.display="block"}),this.accordion1.querySelector(".pagination-wrapper").style.display="none")}copyFaqToFinalBox(i=""){let t=this.accordion1.querySelector(".accordion-box");if(t.innerHTML="",i){let e=i.trim().toLowerCase();this.clonedAccordion.querySelectorAll(".faq-card").forEach(i=>{let o=i.querySelector(".card-heading span").textContent.toLowerCase(),a=i.querySelector(".faq-card-body p").textContent.toLowerCase();(o.includes(e)||a.includes(e))&&t.appendChild(i.cloneNode(!0))})}else{let o=this.clonedAccordion.querySelectorAll(".faq-card");o.forEach(i=>{t.appendChild(i.cloneNode(!0))})}"false"!==this.paginationshow&&"page-local-edwiserpagebuilder-editor"!==document.body.id&&this.initializeQuestions()}initializeQuestions(i=0){0!==i&&i!==this.lastActivePage?(this.lastActivePage=i,this.accordionbox.style.animation="blurEffect 0.3s ease",setTimeout(()=>{let t=this.accordion1.querySelectorAll(".faq-card.visible");t.forEach((i,t)=>{i.classList.remove("visible")});let e=this.noofquestionsshown*(i-1)+1,o=this.noofquestionsshown*i;this.accordion1.querySelectorAll(".faq-card:nth-child(n+"+e+"):nth-child(-n+"+o+")").forEach(i=>{i.classList.add("visible")})},100),setTimeout(()=>{this.accordionbox.style.animation=""},300)):0===i&&(this.accordion1.querySelectorAll(".accordion-box .faq-card:nth-child(n+1):nth-child(-n+"+this.noofquestionsshown+")").forEach(i=>{i.classList.add("visible")}),this.accordion1.querySelectorAll(".accordion-box .faq-card").forEach((i,t)=>{0!==t&&(t+1)%this.noofquestionsshown==1&&i.querySelector(".card-heading").click()}),this.createPagination())}createPagination(){let i=Math.ceil(this.accordion1.querySelectorAll(".accordion-box .faq-card").length/this.noofquestionsshown),t=this.accordion1.querySelector(".pagination-wrapper .pagination");if(t.innerHTML="",i>1)for(let e=0;e<=i+1;e++){let o=document.createElement("li");o.classList.add("page-item","page-link"),o.setAttribute("data-value",e),o.textContent=e,0===e?(o.textContent="Prev",o.classList.add("prev")):e==i+1&&(o.textContent="Next",o.classList.add("next")),1===e&&o.classList.add("active"),t.appendChild(o)}}paginationItemClicked(i){if(i.target.classList.contains("page-item")){let t=this.accordion1.querySelector(".pagination .page-link.active"),e=i.target.getAttribute("data-value");i.target.classList.contains("prev")?e=t.getAttribute("data-value")-1:i.target.classList.contains("next")&&(e=Number(t.getAttribute("data-value"))+1),t.classList.remove("active"),this.accordion1.querySelector('.pagination .page-link[data-value="'+e+'"]').classList.add("active"),this.initializeQuestions(e)}}searchFormSubmit(i){i.preventDefault();let t=i.target.querySelector("input").value;this.copyFaqToFinalBox(t)}searchinputchanged=i=>{let t=i.target.value;this.copyFaqToFinalBox(t)}}const accordion1_unqreplaceid_=new Accordion1_unqreplaceid_;`;
        var appendfaq3 = `<div class="faq-card edw-slider-item"><div class="card-heading collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><span>What languages are offered for online coaching?</span><img class="expande-icon" src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/expande.svg" alt="expand"> <img class="collaps-icon" src="${Vvveb.serverurl}/CDN/faqaccordion3/images/icons/collaps.svg" alt="collapse"></div><div id="collapseTwo" class="collapse"><div class="faq-card-body"><p>A payment gateway is an ecommerce service that processes online payments for online as well as offline businesses. Payment gateways help accept payments by transferring key information from their merchant websites to issuing banks, card associations and online wallet players.</p></div></div></div>`;
        Vvveb.Components.extend("_base", "html/faqaccordion3", {
            name: "Accordion set 3",
            attributes: ['data-ebpb-faqaccordion3'],
            image: "icons/accordionset1.svg",
            classes: ['edwiser-pb-faqaccordion3'],
            html: (() => {
                return `<div class="edwiser-pb-faqaccordion3" data-vvveb-disabled-area contenteditable="false">${faqaccordionhtml3}<style>${faqaccordioncss3}</style><script>${faqaccordionjs3}</script></div>`;
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

                    var tabid = "edw-slider-item-" + slideno;
                    $(this).find('.collapse').attr('id', tabid);
                    $(this).find('.card-heading').attr('data-target', "#" + tabid);

                    properties.push(
                        {
                            name: "",
                            key: "slidergrouptitle" + slideno,
                            inputtype: EdwheaderInput,
                            edwclasses: "edwgroupheader",
                            data: {
                                header: "FAQ " + slideno,
                                extraclass: "edwslideheading m-0",
                                type: "h5",
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

                                var  paginationperpagevalue = $(node).closest('.section-accordion').attr('data-noofquestionsshown');
                                var accordionnode = $(node).closest('.section-accordion');
                                showhidefaqaccordingtosetting(accordionnode,paginationperpagevalue);
                                generatepagination(accordionnode,paginationperpagevalue)

                                $(node).remove();
                                Vvveb.Components.render("html/faqaccordion3");
                                return node;
                            },
                        },
                        {
                            name:  SETTINGTITLES.FAQTITLE,
                            key: "slidertitle" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-slider-item-${i} .card-heading span`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },
                        {
                            name:  SETTINGTITLES.FAQDESCRIPTION,
                            key: "slidertitle" + i,
                            htmlAttr: "innerHTML",
                            child: `.edw-slider-item-${i} .faq-card-body p`,
                            inputtype: TextInput,
                            edwclasses: "edwinputfield",
                        },

                    );

                });

                if (!$(node).find('.edw-slider-inner-container').children('.edw-slider-item').hasClass('active')) {
                    $(node).find('.edw-slider-item').first().addClass('show active');
                }

                slideIntervalfielddisabler(node);

                properties = removeDeleteButton(node, properties);
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });
                this.properties = properties.concat(this.properties);
                // this.properties = disableaddnewslidebutton(node,this.properties, 4);
                return node;
            },
            properties: [
                {
                    name: "",
                    key: "addNewSlide",
                    inputtype: EdwbuttonInput,
                    edwclasses: "edwnewslidebtn",
                    child: ".accordion.accordion-box",
                    data: { text: "Add new FAQ", icon: "la-plus", extraclasses: "btn btn-outline-primary" },
                    onChange: function (node) {
                        //render component properties again to include the new column inputs
                        $(node).append(appendfaq3);

                        var  paginationperpagevalue = $(node).closest('.section-accordion').attr('data-noofquestionsshown');
                        var accordionnode = $(node).closest('.section-accordion');
                        showhidefaqaccordingtosetting(accordionnode,paginationperpagevalue);
                        generatepagination(accordionnode,paginationperpagevalue)

                        Vvveb.Components.render("html/faqaccordion3");
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.FAQSHOWHIDESEARCHFIELDTITLE,
                    key: "data-searchformshow",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-faq-searchform-disabler',
                    onChange: function (node, value, input) {

                        if (value == true) {
                            $(node).parent().attr('data-searchformshow', 'true');
                            $(node).parent().find('.search-form').removeClass('d-none');
                        } else {
                            $(node).parent().attr('data-searchformshow', 'false');
                            $(node).parent().find('.search-form').addClass('d-none');
                        }
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.FAQPAGINATESETTINGTITLE,
                    key: "data-paginationshow",
                    htmlAttr: "checked",
                    col: 12,
                    inline: true,
                    inputtype: CheckboxInput,
                    edwclasses: "edwcheckfield",
                    child: '.edw-faq-paginate-input',
                    onChange: function (node, value, input) {
                        var slideintervalfield = $(input).closest('section').find('[data-key="paginationperpagevalue"]');
                        if (value == true) {
                            $(node).parent().attr('data-paginationshow', 'true');

                            var  paginationperpagevalue = $(node).closest('.section-accordion').attr('data-noofquestionsshown');
                            var accordionnode = $(node).closest('.section-accordion');
                            showhidefaqaccordingtosetting(accordionnode,paginationperpagevalue);
                            generatepagination(accordionnode,paginationperpagevalue)
                        } else {
                            $(node).parent().attr('data-paginationshow', 'false');
                        }
                        slideIntervalfielddisabler(node);
                        return node;
                    }
                },
                {
                    name: SETTINGTITLES.FAQPAGINATEPERPAGESETTINGTITLE,
                    key: "paginationperpagevalue",
                    htmlAttr: "data-noofquestionsshown",
                    inputtype: TextInput,
                    edwclasses: "edwinputfield",
                    child: `.section-accordion`,
                    onChange: function (node, value, input) {

                        if (value.trim() == '') {
                            value = 4;
                        }
                        if (value.indexOf('.') > -1) {
                            value = Math.round(parseFloat(value));
                        }
                        setTimeout(() => {
                            $(node).attr('data-noofquestionsshown', value);
                        }, 300);

                        showhidefaqaccordingtosetting(node,value);
                        generatepagination(node,value)
                        return node;
                    }
                }
            ]
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

    function removeTabWithAccordionInnerDeleteButton(node, properties,i) {
        var numberOfChildren = $(node).find(".faq-card").length;
        console.log($(node));
        console.log(numberOfChildren);
        console.log(properties);
        if (numberOfChildren == 1) {
            properties = properties.map(function (item) {
                if (item.key == "deletesliderinneritem"+i) {
                    item.data['extraclasses'] = item.data['extraclasses'] + ' disabled';
                }
                return item;
            });
        }
        return properties;
    }

    function getTabButtons(node) {
        $tabbuttons = $(node).find('.edw-tab-btn');
        return $tabbuttons;
    }

    function showhidefaqaccordingtosetting(node, input){

        var faqlength = $(node).find('.edw-slider-item').length;
        if(faqlength > input){
            $(node).find('.edw-slider-item').removeClass('visible'); // Remove visible class from all items
            $(node).find('.edw-slider-item').slice(0, input).addClass('visible');
        }else{
            $(node).find('.edw-slider-item').addClass('visible');
        }
    }

    //It will generate dummy pagination for the editor page
    function generatepagination(node, input) {
        var faqlength = $(node).find('.edw-slider-item').length;
        var totalPages = Math.ceil(faqlength / input);

        if(totalPages > 1){

            $(node).find('.pagination-wrapper .pagination').empty();

            var paginationhtml = '<li class="page-item page-link prev" data-value="0">Prev</li>';

            for (var i = 0; i < totalPages; i++) {
                if(i == 0){
                    paginationhtml += '<li class="page-item page-link active" data-value="' + (i + 1) + '">' + (i + 1) + '</li>';
                }else{
                    paginationhtml += '<li class="page-item page-link " data-value="' + (i + 1) + '">' + (i + 1) + '</li>';
                }
            }
            paginationhtml += '<li class="page-item page-link next" data-value="3">Next</li>';
        }else{
            $(node).find('.pagination-wrapper .page-item').addClass('d-none');
        }

        $(node).find('.pagination-wrapper .pagination').empty().append(paginationhtml);
    }

    function slideIntervalfielddisabler(node) {
        $(document).ready(function () {
            // var autoplaycheckedstatus = $(node).parent().find('.edw-slider-autoplay').attr('checked');
            var autoplaycheckedstatus = $(document).find('[name="data-paginationshow"]').is(":checked");

            if (!autoplaycheckedstatus) {
                $(document).find('#left-panel .edwinputfield[data-key="paginationperpagevalue"] input').attr('disabled', 'disabled');
            } else {
                $(document).find('#left-panel .edwinputfield[data-key="paginationperpagevalue"] input').removeAttr('disabled');
            }
        });
    }
    return {
        init: function () {
            var blocks = ["html/tab1","html/tab2","html/tab3","html/faqaccordion1","html/faqaccordion2","html/faqaccordion3"];
            addBlocks(blocks);
        }
    }

});
