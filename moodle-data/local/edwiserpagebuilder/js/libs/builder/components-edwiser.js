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
define('local_edwiserpagebuilder/components-edwiser', ['local_edwiserpagebuilder/jquery', 'core/ajax'], function (jQuery, Ajax) {

    function addBlocks(blocks, edwiserfrompreview) {
        Vvveb.ComponentsGroup['Edwiser Functional Blocks'] = blocks;

        Vvveb.Components.extend("_base", "html/edwiserform", {
            name: "Edwiser Form",
            image: "icons/form.svg",
            classes: ['edwiser-pb-form-wrap'],
            html: `<div class="edwiser-pb-form-wrap" data-edwiser-dynamic="" data-shortcode="edwiser-form" data-formid="0" data-vvveb-disabled-area="">Form Content</div>`,
            beforeInit: function (node) {
                properties = this.properties[0];
                formoptions = [];
                Ajax.call([{
                    methodname: 'edwiserform_get_forms',
                    args: {
                        search: "",
                        start: 0,
                        length: 0,
                        order: { 'column': 0, 'dir': "" }
                    }
                }])[0].done(function (responce) {
                    $.each(responce.data, function (index, formdata) {
                        id = formdata.shortcode.replace('[edwiser-form id="', '').replace('"]', '');
                        if (!$.inArray(id, properties.validValues)) {
                            properties.validValues.push(id);
                        }
                        formoptions.push({ value: id, text: formdata.title });
                    });
                    this.properties.inputtype.updateOptions(formoptions);
                });
                this.properties[0].inputtype.updateOptions(formoptions);
                return node;
            },
            properties: [
                {
                    name: "Select Form",
                    key: "formid",
                    attributes: ['data-formid'],
                    htmlAttr: 'data-formid',
                    inputtype: SelectInput,
                    validValues: [0],
                    data: { options: [{ value: 0, text: "Select Form" }] },
                    onChange: function (node, value, input) {
                        Ajax.call([{
                            methodname: 'local_edwiserpagebuilder_get_shortcode_parsered_html',
                            args: {
                                shortcode: `[edwiser-form id='${value}']`,
                            }
                        }])[0].done(function (responce) {
                            $(node).empty();
                            $(node).append(responce);
                            edwiserfrompreview.render_form(node);
                        });
                        return node;
                    }
                }
            ]
        });

        Vvveb.Components.extend("_base", "html/modal", {
            name: "Modal",
            attributes: ['data-ebpb-dialog'],
            image: "icons/modal.svg",
            classes: ['edwiser-pb-dialog'],
            html: (()=> {
                return '<div class="edwiser-pb-dialog" data-ebpb-dialog><button type="button" class="btn btn-primary ebbp-mdl-trigger" data-toggle="modal" data-target="#epb-modal-[[int]]-[[inst]]">Launch modal</button><div class="modal fade" id="epb-modal-[[int]]-[[inst]]" tabindex="-1" role="dialog" aria-labelledby="epb-modal-[[int]]-[[inst]] Title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="epb-modal-title-[[int]]-[[inst]]">Modal title</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">...</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div></div><script>var modaltrigger = document.querySelector("section.page-aside .block-content .edwiser-pb-dialog .ebbp-mdl-trigger");modaltrigger.addEventListener("click",function(e){var bodyEle = document.querySelector("body");var modalEle = document.querySelector("section.page-aside .block-content .edwiser-pb-dialog .modal.fade");if (modalEle) {bodyEle.append(modalEle.parentElement.removeChild(modalEle));}},false);</script>';
            })(),
            beforeInit: function (node) {
                var id = Math.floor(Math.random() * (30 - 1) + 1);
                node.innerHTML = node.innerHTML.replaceAll("[[int]]", id);
                return node;
            },
            properties: [

                {
                    name: "Show Modal Content",
                    key: "showmodal",
                    htmlAttr: "class",
                    child: ".modal",
                    validValues: ["", "ebpb-show-edit"],
                    inputtype: ToggleInput,
                    data: {
                        on: "ebpb-show-edit",
                        off: ""
                    }
                },
                {
                    name: "Target",
                    key: "target",
                    htmlAttr: "data-target",
                    child: '.ebbp-mdl-trigger',
                    inputtype: TextInput,
                    onChange: function (node, value, input) {
                        if (value.charAt(0) === '#') {
                            value = value.substring(1);
                        }
                        $(node).parent().find('.modal').attr('id', value);
                        return node;
                    }
                }
            ]
        });
        var courseProperty1;
        var courseProperty2;
        Vvveb.Components.extend("_base", "html/courses", {
            name: "Courses",
            image: "icons/courses.png",
            classes: ['edwiser-courses'],
            html: `<div class="edwiser-courses" data-edwiser-dynamic data-shortcode="edwiser-courses" data-vvveb-disabled-area data-catid="0" data-layout="cldefault" contenteditable="false">[edwiser-courses catid="all" layout="cldefault"]</div>`,
            beforeInit: function (node) {
                var catid = $(node).attr('data-catid');
                var layoutid = $(node).attr('data-layout');

                property1 = courseProperty1 = this.properties[0];
                property2 = courseProperty2 = this.properties[1];
                catoptions = [];
                layouts = [];
                var promises = Ajax.call([
                    {
                        methodname: 'local_edwiserpagebuilder_course_get_categories',
                        args: {}
                    },
                    {
                        methodname: 'local_edwiserpagebuilder_get_cards_list',
                        args: { belongsto: "courses" }
                    }
                ]);

                promises[0].done(function (response) {
                    catid = catid.split(",");
                    $.each(response, function (index, data) {
                        if (!$.inArray(data.id, property1.validValues)) {
                            property1.validValues.push(data.id);
                        }
                        var checked = false;
                        if (catid.includes("all")) {
                            $('#catselector option[value="0"]').attr("selected", true);
                        }
                        checked = (catid.includes(""+data.id))? true: false;
                        catoptions.push({ value: data.id, text: data.name, checked:checked });
                    });
                    this.property1.inputtype.updateOptions(catoptions);
                }).fail(function (ex) {
                    // do something with the exception
                });

                promises[1].done(function (response) {
                    $.each(response, function (index, data) {
                        if (!$.inArray(data.id, property2.validValues)) {
                            property2.validValues.push(data.id);
                        }
                        var checked = (layoutid == data.id || layoutid == data.title)? true: false;

                        layouts.push(
                            {
                                value: data.id,
                                img: data.thumbnail,
                                text: "",
                                title: data.title,
                                checked: checked,
                            }
                        );
                    });

                    this.property2.inputtype.updateOptions(layouts);

                }).fail(function (ex) {
                    // do something with the exception
                });
                var shortcode = `[edwiser-courses catid='${catid}' layout='${layoutid}']`;
                return updateCardView(shortcode, node);
            },
            properties: [
                {
                    name: "Select Category",
                    key: "catid",
                    inputtype: MultiSelectInput,
                    validValues: [],
                    data: { eleid: "catselector", options: [{ value: 0, text: "All", checked: true }] },
                    onChange: function (node, value, input) {
                        var selected = $("#catselector").val();
                        $(node).attr('data-catid', selected);
                        var layoutid = $(node).attr('data-layout');
                        var shortcode = `[edwiser-courses catid='${selected}' layout='${layoutid}']`;
                        return updateCardView(shortcode, node);
                    }
                },
                {
                    name: 'Select layout',
                    key: 'selcourselayout',
                    inputtype: LayoutSelectorInput,
                    validValues: [],
                    data: {
                        extraclass: '',
                        options: []
                    },
                    onChange: function (node, value, input) {
                        var layoutid = value;
                        $(node).attr('data-layout', layoutid);
                        var catid = $(node).attr('data-catid');
                        var shortcode = `[edwiser-courses catid='${catid}' layout='${layoutid}']`;
                        return updateCardView(shortcode, node);
                    }
                },
                {
                    name: "Update Layouts",
                    key: "updateLayouts",
                    inputtype: LinkButton,
                    data: { text: "Update Layouts", icon: "fa fa-refresh", className: "text-primary refresh-layout" },
                    onChange: function (node) {
                        updateLayouts(courseProperty2, "courses", node);
                        var catid = $(node).attr('data-catid');
                        var layoutid = $(node).attr('data-layout');
                        var shortcode = `[edwiser-courses catid='${catid}' layout='${layoutid}']`;
                        return updateCardView(shortcode, node);
                    }
                }
            ]
        });
        var categoryProperty1;
        Vvveb.Components.extend("_base", "html/categories", {
            name: "Categories",
            image: "icons/categories.svg",
            classes: ['edwiser-categories'],
            html: `<div class="edwiser-categories" data-edwiser-dynamic data-shortcode="edwiser-categories" data-vvveb-disabled-area data-layout="clcategory" data-btnlabel="Explore" data-count="on" contenteditable="false">[edwiser-categories layout="clcategory" btnlabel="Explore" count="on"]</div>`,
            beforeInit: function (node) {
                var layoutid = $(node).attr('data-layout');
                var btnlabel = $(node).attr('data-btnlabel');
                var count = $(node).attr('data-count');

                property1 = categoryProperty1 = this.properties[0];

                // Little hack to show the default value for toggle switch
                if (count == "on") {
                    setTimeout(function() {
                      $('.toggle input[type="checkbox"]').click();
                    }, 10);

                }

                catoptions = [];
                layouts = [];
                var promises = Ajax.call([
                    {
                        methodname: 'local_edwiserpagebuilder_get_cards_list',
                        args: { belongsto: "categories" }
                    }
                ]);

                promises[0].done(function (response) {
                    $.each(response, function (index, data) {
                        if (!$.inArray(data.id, property1.validValues)) {
                            property1.validValues.push(data.id);
                        }

                        var checked = (layoutid == data.id || layoutid == data.title)? true: false;
                        layouts.push(
                            {
                                value: data.id,
                                img: data.thumbnail,
                                text: "",
                                title: data.title,
                                checked: checked,
                            }
                        );
                    });
                    this.property1.inputtype.updateOptions(layouts);
                }).fail(function (ex) {
                    // do something with the exception
                });

                var shortcode = `[edwiser-categories layout='${layoutid}' btnlabel='${btnlabel}' count='${count}']`;
                return updateCardView(shortcode, node);
            },
            properties: [
                {
                    name: 'Select layout',
                    key: 'selcourselayout',
                    inputtype: LayoutSelectorInput,
                    validValues: [],
                    data: {
                        extraclass: '',
                        options: []
                    },
                    onChange: function (node, value, input) {
                        $(node).attr('data-layout', value);

                        var btnlabel = $(node).attr('data-btnlabel');
                        var count = $(node).attr('data-count');
                        var shortcode = `[edwiser-categories layout='${value}' btnlabel='${btnlabel}' count='${count}']`;
                        return updateCardView(shortcode, node);
                    }
                },
                {
                    name: "Update Layouts",
                    key: "updateLayouts",
                    inputtype: LinkButton,
                    data: { text: "Update Layouts", icon: "fa fa-refresh", className: "text-primary refresh-layout" },
                    onChange: function (node) {
                        updateLayouts(categoryProperty1, "categories", node);
                        var layoutid = $(node).attr('data-layout');
                        var btnlabel = $(node).attr('data-btnlabel');
                        var count = $(node).attr('data-count');
                        var shortcode = `[edwiser-categories layout='${layoutid}' btnlabel='${btnlabel}' count='${count}']`;
                        return updateCardView(shortcode, node);
                    }
                },
                {
                    name: "Button Label (One word)",
                    key: "buttonlabel",
                    htmlAttr: "data-btnlabel",
                    inputtype: TextInput,
                    onChange: function (node, value, input) {
                        var layoutid = $(node).attr('data-layout');
                        var count = $(node).attr('data-count');
                        var shortcode = `[edwiser-categories layout='${layoutid}' btnlabel='${value}' count='${count}']`;
                        return updateCardView(shortcode, node);
                        // return node;
                    }
                },
                {
                    name: "Show Course Count",
                    key: "showcount",
                    attributes: ['data-count'],
                    htmlAttr: "data-count",
                    inputtype: ToggleInput,
                    validValues: ["on", "off"],
                    data: {
                        on: "on",
                        off: "off"
                    },
                    onChange: function (node, value, input) {
                        var layoutid = $(node).attr('data-layout');
                        var btnlabel = $(node).attr('data-btnlabel');
                        if (btnlabel == "") {
                            btnlabel = "Show Courses";
                        }
                        var shortcode = `[edwiser-categories layout='${layoutid}' btnlabel='${btnlabel}' count='${value}']`;
                        return updateCardView(shortcode, node);
                        return node;
                    }
                }
            ]
        });
        var edwsiercncjs  = ``;
        Vvveb.Components.extend("_base", "html/edwisercnc", {
            name: "Courses & Categories",
            image: "icons/coursesncategory.svg",
            classes: ['edwiser-cnc'],
            html: `<div class="edwiser-cnc" data-edwiser-dynamic data-shortcode="edwiser-cnc" data-vvveb-disabled-area data-layout="coursesncategories" data-show="courses" data-catid="all" data-date="all" data-btnlabel="Explore" contenteditable="false">[edwiser-cnc layout="coursesncategories" show="courses" catid="all" date="all"]</div>`,
            beforeInit: function(node) {
                var catid = $(node).attr('data-catid');
                var layoutid = $(node).attr('data-layout');
                var show = $(node).attr('data-show');
                property1 = courseProperty1 = this.properties[0];
                catoptions = [];
                var promises = Ajax.call([
                    {
                        methodname: 'local_edwiserpagebuilder_course_get_categories',
                        args: {}
                    },
                ]);

                promises[0].done(function (response) {
                    catid = catid.split(",");
                    $.each(response, function (index, data) {
                        if (!$.inArray(data.id, property1.validValues)) {
                            property1.validValues.push(data.id);
                        }
                        var checked = false;
                        if (catid.includes("all")) {
                            $('#catselector option[value="0"]').attr("selected", true);
                        }
                        checked = (catid.includes(""+data.id))? true: false;
                        catoptions.push({ value: data.id, text: data.name, checked:checked });
                    });
                    this.property1.inputtype.updateOptions(catoptions);
                }).fail(function (ex) {
                    // do something with the exception
                });
                var shortcode = `[edwiser-cnc layout="coursesncategories" show="${show}" catid="${catid}" date="all"]`;

                node =   updateCardView(shortcode, node);

                return node;
            },
            properties: [
                {
                    name: "Select Category",
                    key: "data-catid",
                    inputtype: MultiSelectInput,
                    validValues: [],
                    data: { eleid: "catselector", options: [{ value: 0, text: "All", checked: true }] },
                    onChange: function (node, value, input) {
                        var selected = $("#catselector").val();
                        $(node).attr('data-catid',selected);
                        var show = $(node).attr('data-show');
                        if(selected == 0){
                            var shortcode = `[edwiser-cnc layout="coursesncategories" show='${show}' catid='all' date="all"]`;
                        }else{
                            var shortcode = `[edwiser-cnc layout="coursesncategories" show='${show}' catid='${selected}' date="all"]`;}
                        node =   updateCardView(shortcode, node);

                        return node;
                    }
                },
                {
                    name: "Show",
                    key: "data-show",
                    htmlAttr: "data-show",
                    col:12,
                    inline:false,
                    inputtype: SelectInput,
                    data: {
                        options: [{
                            value: "courses",
                            text: "Courses",
                        }, {
                            value: "categories",
                            text: "Categories"
                        }, {
                            value: "courseandcategories",
                            text: "Courses and Categories"
                        }],
                    },
                    onChange: function (node, value, input) {
                        var selected = $(node).attr('data-catid');
                        if(selected == 'all'){
                            selected = 0;
                        }
                        $(node).attr('data-show', value);
                        var shortcode = `[edwiser-cnc layout="coursesncategories" show='${value}' catid='${selected}' date="all"]`;
                        // var shortcode = `[edwiser-courses catid='${selected}' layout='${layoutid}']`;
                        node =   updateCardView(shortcode, node);

                        return node;
                    }
                }
            ]
        });

        var initialhtml = ``;
        Vvveb.Components.extend("_base", "html/edwiserfc", {
            name: "Featured Courses",
            image: "icons/fccourses.svg",
            classes: ['edwiser-fc'],
            html: `<div class="edwiser-fc" data-edwiser-dynamic data-shortcode="edwiser-fc" data-vvveb-disabled-area data-layout="coursesncategories" data-block=fetured-courses data-show="courses" data-courseid="0" data-date="all" data-btnlabel="Explore" contenteditable="false">[edwiser-fc layout="coursesncategories" show="courses" courseid="0" date="all"]</div>`,
            beforeInit: function(node) {

                properties = [];


                //Fetching all the properties defined in this component
                property1 = courseProperty1 = this.properties[0];

                // All the couresids which are already selected, it will be comma separated strings
                var courseids = $(node).attr('data-courseid');

                //This shortcode will be used for generating dynamic content from filter plugins
                var shortcode = `[edwiser-fc layout="coursesncategories" show="courses" courseid="${courseids}" date="all"]`;

                //Updating the html content of the node with the dynamic content
                node =   updateCardView(shortcode, node);

                var componentoptionshtml = '';

                var applybuttonhtml = ``;

                var selectedCourseIdArray = [];

                // var checkedCourses = [];

                if (courseids && courseids !== '0') {
                    // converting the courseids into array
                    selectedCourseIdArray = courseids.split(',').map(id => id.trim());
                }

                // Maximum allowed featured courses
                var maxAllowedChecked = 12;
                var  isLimitExceeded = selectedCourseIdArray.length >= maxAllowedChecked;
                // Total courses added into the featured courses
                var totalcourses = $(node).find('div[data-totalcourses]').attr('data-totalcourses');

                // Fetching all the courses from the database
                getcourselistresponse(this).then(response => {
                    response = JSON.parse(response);

                    $searchfieldhtml = `<div class="edwcustomdropdownexternal-wrapper">
                                            <div class="edwcustomdropdown-wrapper">
                                                <img src="./js/libs/builder/icons/edwsearchicon.svg"/>
                                                <input class="form-control edwcustomdropdowncustomsearch" placeholder="Search for Courses" data-searchtag=".dropdown-menu li" data-texttag="span" type="text"  id="myInput">
                                            </div>
                                        </div>`;
                    applybuttonhtml =`<div class="custom-apply-button">
                                        <input type="checkbox" class="customapplybtn" data-action="applycourse" name="customapplybtn" id="cb">
                                        <label for="cb">Add courses</label>
                                    </div>`;


                    //Generating all courses list dropdown options
                    Object.entries(response).forEach(([key, course], index) => {

                        let isChecked = selectedCourseIdArray.includes(course.id.toString()) ? 'checked' : '';
                        // let isDisabled = isLimitExceeded && !isChecked  ? 'disabled' : '';

                        // if(totalcourses < maxAllowedChecked){
                        //     isDisabled = ''
                        // }

                        let isDisabled = (isLimitExceeded && !isChecked && totalcourses >= maxAllowedChecked) ? 'disabled' : '';

                        componentoptionshtml += `<li class="course-list-item ${isDisabled}">
                                                    <input name="featuredcourses" class="form-check-input" type="checkbox"
                                                        value="${course.id}" data-courseid="${course.id}" ${isChecked} ${isDisabled}>
                                                    <span class="text ellips ellips-2">${course.fullname}</span>
                                                    </li>`;
                    });

                    //Updating options in the dropdown menu
                    property1.inputtype.updateOptions($searchfieldhtml+componentoptionshtml+applybuttonhtml);

                }).catch(error => {
                    // Handle any errors that occurred during the Promise resolution
                    console.error(error);
                });


                // It will remove the old properties when the component is recreated
                this.properties = this.properties.filter(function (item) {
                    return item.key.indexOf("slider") === -1;
                });

                var courseno = 0;

                // This loop will generate the new properties for the component according to the selected courses
                selectedCourseIdArray.forEach(courseid => {
                    var coursenode = $(node).find(`.slick-carousel-item[data-courseid='${courseid}']`).first();
                    if(coursenode.length != 0){
                        var coursename = coursenode.find(".coursename").text();
                        courseno++;
                        properties.push(
                            {
                                name: "",
                                key: "deleteslideritem",
                                inputtype: Edwbuttonwithtext,
                                edwclasses: "edwcoursedelbtn",
                                data: { text:"", icon: "la-trash", wrapperclasses:"d-flex justify-content-between edwbtntexttitle-wrapper", extraclasses: "btn btn-outline-danger d-flex iconbutton",value: `${courseid}`,titletext:`${courseno}.${coursename}`},
                                onChange: function (node, value, input) {
                                    var coursecheckbox = $(document).find('[name="featuredcourses"][value="' + this.data.value + '"]');
                                    if (coursecheckbox.attr('checked')) {
                                        coursecheckbox.removeAttr('checked');
                                    }
                                    var courseids = [];

                                        $('[name="featuredcourses"]:checked').each(function () {
                                            courseids.push($(this).val());
                                        });
                                        var courseids = courseids.join(',');

                                        if (courseids == '') {
                                            courseids = 0;
                                        }

                                        $(node).attr('data-courseid', courseids);

                                        var shortcode = `[edwiser-fc layout="coursesncategories" show="courses" courseid="${courseids}" date="all"]`;

                                        node =   updateCardView(shortcode, node);

                                        Vvveb.Components.render("html/edwiserfc");

                                        return node;
                                },
                            }
                        );
                    }
                });

                if(courseno >= maxAllowedChecked){
                    properties.unshift(
                        {
                            name: "",
                            key: "slidertabswarning",
                            inputtype: EdwheaderInput,
                            edwclasses: "edwcoursewarningheading",
                            data: {
                                header: "You’ve reached the max limit of 12 to add courses",
                                extraclass: "  p-3 border-0 alert alert-warning",
                                type: "h6",
                                style: ""
                            }
                        },
                    );
                }
                // Adding the above created properties before all other properties.
                this.properties.splice(1, 0, ...properties);
                // this.properties = properties.concat(this.properties);

                return node;
            },
            // Select course setting for the component
            properties: [
                {
                    name: "Select course",
                    key: "featuredcourses",
                    inputtype: edwcustomdropdown,
                    data: { eleid: "courseselectordropdown",buttontext: "Select", initialhtml: "", edwclasses:`edwcustomdropdown`,options: []},
                    onChange: function (node, value, input) {

                        var coursecheckbox = $(document).find('li [name="featuredcourses"][value="' + value + '"]');
                        if (coursecheckbox.attr('checked')) {
                            coursecheckbox.removeAttr('checked');
                        } else {
                            coursecheckbox.attr('checked', 'checked');
                        }

                        let checkedCourses = $('li [name="featuredcourses"]:checked');
                        if (checkedCourses.length >= 12) {
                            $('li:has([name="featuredcourses"]:not(:checked))')
                            .addClass('disabled')
                            .find('[name="featuredcourses"]')
                            .prop('disabled', true)
                            .prop('checked', false);
                        } else {
                            $('li:has([name="featuredcourses"])')
                            .removeClass('disabled')
                            .find('[name="featuredcourses"]')
                            .prop('disabled', false);
                        }

                        var courseids = [];

                        if($(input).attr('data-action') == "applycourse") {
                            $('[name="featuredcourses"]:checked').each(function () {
                                courseids.push($(this).val());
                            });

                            var courseids = courseids.join(',');

                            if (courseids == '') {
                                courseids = 0;
                            }

                            $(node).attr('data-courseid', courseids);

                            var shortcode = `[edwiser-fc layout="coursesncategories" show="courses" courseid="${courseids}" date="all"]`;
                            // node =   updateCardView(shortcode, node);

                            // setTimeout(() => {
                            //     $(node).click();
                            // }, 500);

                            Ajax.call([{
                                methodname: 'local_edwiserpagebuilder_get_shortcode_parsered_html',
                                args: {
                                    shortcode: shortcode,
                                }
                            }])[0].done(function (response) {
                                $(node).empty();
                                $(node).append(response);

                                Vvveb.Components.render("html/edwiserfc");
                            });

                            // Vvveb.Components.render("html/edwiserfc");
                            // Vvveb.Components.render("html/edwiserfc");

                            // return node;

                        }
                    }
                },
            ]
        });

        //addnotes component
        Vvveb.Components.extend("_base", "html/edwiseraddnotes", {
            name: "Add Notes",
            image: "icons/addnotes.svg",
            classes: ['edwiser-addnotes'],
            html: `<div class="edwiser-addnotes" data-edwiser-dynamic data-shortcode="edwiser-addnotes" data-vvveb-disabled-area contenteditable="false">[edwiser-remuiblck-addnotes layout="addnotes"]</div>`,
            beforeInit: function(node) {

                var shortcode = `[edwiser-remuiblck-addnotes layout="addnotes" editorpage="true"]`;
                node =    updateblockscontent(shortcode, node);
                return node;
            }
        });

        //courseanalytics component
        Vvveb.Components.extend("_base", "html/courseanalytics", {
            name: "Course Analytics",
            image: "icons/courseanalytics.svg",
            classes: ['edwiser-courseanalytics'],
            html: `<div class="edwiser-courseanalytics" data-edwiser-dynamic data-shortcode="edwiser-courseanalytics" data-vvveb-disabled-area contenteditable="false">[edwiser-remuiblck-courseanalytics layout="courseanalytics"]</div>`,
            beforeInit: function(node) {

                var shortcode = `[edwiser-remuiblck-courseanalytics layout="courseanalytics" editorpage="true"]`;
                node =    updateblockscontent(shortcode, node);
                return node;
            }
        });

        //courseprogress component
        Vvveb.Components.extend("_base", "html/courseprogress", {
            name: "Course Progress",
            image: "icons/courseprogress.svg",
            classes: ['edwiser-courseprogress'],
            html: `<div class="edwiser-courseprogress" data-edwiser-dynamic data-shortcode="edwiser-courseprogress" data-vvveb-disabled-area contenteditable="false">[edwiser-remuiblck-courseprogress layout="courseprogress"]</div>`,
            beforeInit: function(node) {

                var shortcode = `[edwiser-remuiblck-courseprogress layout="courseprogress" editorpage="true"]`;
                node =    updateblockscontent(shortcode, node);
                return node;
            }
        });

        //enrolledusers component
        Vvveb.Components.extend("_base", "html/enrolledusers", {
            name: "Enrolled Users",
            image: "icons/enrolledusers.svg",
            classes: ['edwiser-enrolledusers'],
            html: `<div class="edwiser-enrolledusers" data-edwiser-dynamic data-shortcode="edwiser-enrolledusers" data-vvveb-disabled-area contenteditable="false">[edwiser-remuiblck-enrolledusers layout="enrolledusers"]</div>`,
            beforeInit: function(node) {

                var shortcode = `[edwiser-remuiblck-enrolledusers layout="enrolledusers" editorpage="true"]`;
                node =    updateblockscontent(shortcode, node);
                return node;
            }
        });

        //latestmembers component
        Vvveb.Components.extend("_base", "html/latestmembers", {
            name: "Latest Members",
            image: "icons/latestmembers.svg",
            classes: ['edwiser-latestmembers'],
            html: `<div class="edwiser-latestmembers" data-edwiser-dynamic data-shortcode="edwiser-latestmembers" data-vvveb-disabled-area contenteditable="false">[edwiser-remuiblck-latestmembers layout="latestmembers"]</div>`,
            beforeInit: function(node) {

                var shortcode = `[edwiser-remuiblck-latestmembers layout="latestmembers" editorpage="true"]`;
                node =    updateblockscontent(shortcode, node);
                return node;
            }
        });

        //quizattempts component
        Vvveb.Components.extend("_base", "html/quizattempts", {
            name: "Quiz Attempts",
            image: "icons/quizattempts.svg",
            classes: ['edwiser-quizattempts'],
            html: `<div class="edwiser-quizattempts" data-edwiser-dynamic data-shortcode="edwiser-quizattempts" data-vvveb-disabled-area contenteditable="false">[edwiser-remuiblck-quizattempts layout="quizattempts"]</div>`,
            beforeInit: function(node) {

                var shortcode = `[edwiser-remuiblck-quizattempts layout="quizattempts" editorpage="true"]`;
                node =    updateblockscontent(shortcode, node);
                return node;
            }
        });

        //recentfeedback component
        Vvveb.Components.extend("_base", "html/recentfeedback", {
            name: "Recent Feedback",
            image: "icons/recentfeedback.svg",
            classes: ['edwiser-recentfeedback'],
            html: `<div class="edwiser-recentfeedback" data-edwiser-dynamic data-shortcode="edwiser-recentfeedback" data-vvveb-disabled-area contenteditable="false">[edwiser-remuiblck-recentfeedback layout="recentfeedback"]</div>`,
            beforeInit: function(node) {

                var shortcode = `[edwiser-remuiblck-recentfeedback layout="recentfeedback" editorpage="true"]`;
                node =    updateblockscontent(shortcode, node);
                return node;
            }
        });

        //recentforums component
        Vvveb.Components.extend("_base", "html/recentforums", {
            name: "Recent Forums",
            image: "icons/recentforums.svg",
            classes: ['edwiser-recentforums'],
            html: `<div class="edwiser-recentforums" data-edwiser-dynamic data-shortcode="edwiser-recentforums" data-vvveb-disabled-area contenteditable="false">[edwiser-remuiblck-recentforums layout="recentforums"]</div>`,
            beforeInit: function(node) {

                var shortcode = `[edwiser-remuiblck-recentforums layout="recentforums" editorpage="true"]`;
                node =    updateblockscontent(shortcode, node);
                return node;
            }
        });

        //todolist component
        Vvveb.Components.extend("_base", "html/todolist", {
            name: "To Do List",
            image: "icons/todolist.svg",
            classes: ['edwiser-todolist'],
            html: `<div class="edwiser-todolist" data-edwiser-dynamic data-shortcode="edwiser-todolist" data-vvveb-disabled-area contenteditable="false">[edwiser-remuiblck-todolist layout="todolist"]</div>`,
            beforeInit: function(node) {

                var shortcode = `[edwiser-remuiblck-todolist layout="todolist" editorpage="true"]`;
                node =    updateblockscontent(shortcode, node);
                return node;
            }
        });
    }

    function updateCardView(shortcode, node,appendjs = '',js='') {

        Ajax.call([{
            methodname: 'local_edwiserpagebuilder_get_shortcode_parsered_html',
            args: {
                shortcode: shortcode,
            }
        }])[0].done(function (response) {
            $(node).empty();
            $(node).append(response);
            // if(appendjs == 'course' || appendjs == 'category'){
            //     var containerid = $(response).find('.slider').attr('id');
            //     var match = containerid.match(/\d+/);
            //     appendjs = js.replaceAll("{{instid}}",match[0])
            //     checknavigation(node)
            //     $(node).append(appendjs)
            // }
            // edwiserfrompreview.render_form(node);
        });
        return node;
    }

    //This method will handle the content of some functional blocks

    function updateblockscontent(shortcode, node) {

        Ajax.call([{
            methodname: 'local_edwiserpagebuilder_get_shortcode_parsered_html',
            args: {
                shortcode: shortcode,
            }
        }])[0].done(function (response) {
            $(node).empty();
            $(node).append(response);
        });
        return node;
    }

    function updateLayouts(selectedProperty, belongsto, node) {
        if (confirm("Updating the content of layouts which will affect every new and existing added component. Confirm?")) {
            var layoutid = $(node).attr('data-layout');
            Ajax.call([{
                methodname: 'local_edwiserpagebuilder_get_cards_list',
                args: {belongsto: belongsto, updatefirst: true}
            }])[0].done(function (response) {

                selectedProperty.validValues = [];
                selectedProperty.inputtype.emptyOptions();

                layouts = [];
                $.each(response, function (index, data) {

                    if (!$.inArray(data.id, selectedProperty.validValues)) {
                        selectedProperty.validValues.push(data.id);
                    }
                    var checked = (layoutid == data.id)? true: false;

                    layouts.push(
                        {
                            value: data.id,
                            img: data.thumbnail,
                            text: "",
                            title: "",
                            checked: checked,
                        }
                    );
                });
                selectedProperty.inputtype.updateOptions(layouts);
            });
        }
    }

    function checknavigation(node){
        if($(node).find('.navbar-carousel').length >=1){
            var navinnerwidth = $(node).find('.navbar-inner').innerWidth();
            var navitemcontainerwidth =  $(node).find('.navbar-item-container').innerWidth();
            if(navinnerwidth < navitemcontainerwidth){
                $(node).find('.nav-left-arrow').removeClass('d-none');
                $(node).find('.nav-right-arrow').removeClass('d-none');;
            }else{
                $(node).find('.nav-left-arrow').addClass('d-none');
                $(node).find('.nav-right-arrow').addClass('d-none');;
            }
        }else{
            return;
        }
    }

    /**
     * Asynchronously retrieves a list of courses.
     *
     * @returns {Promise<Object>} A promise that resolves to an object containing the course list.
     */
    const getcourselist = async () => {
        const request = {
            methodname: 'local_edwiserpagebuilder_get_courselist',
            args: {
                config:"all"
            }
        };

        return Ajax.call([request])[0];
    };

    /**
     * Asynchronously retrieves a list of courses.
     *
     * @returns {Promise<Object>} A promise that resolves to an object containing the course list.
     */

    const getcourselistresponse = async()=>{
        return response = await getcourselist();
    }

    return {
        init: function (formavailable) {
            if (formavailable) {
                require(['local_edwiserpagebuilder/edwiserfrompreview'], function(edwiserfrompreview){
                    var blocks = ["html/modal", "html/courses", "html/categories", "html/edwiserform", "html/edwisercnc","html/edwiseraddnotes", "html/courseanalytics", "html/courseprogress", "html/enrolledusers", "html/latestmembers", "html/quizattempts", "html/recentfeedback", "html/recentforums", "html/todolist","html/edwiserfc"];
                    addBlocks(blocks, edwiserfrompreview);
                });
            } else {
                var blocks = ["html/modal", "html/courses", "html/categories", "html/edwisercnc", "html/edwiseraddnotes", "html/courseanalytics", "html/courseprogress", "html/enrolledusers", "html/latestmembers", "html/quizattempts", "html/recentfeedback", "html/recentforums", "html/todolist","html/edwiserfc"];
                addBlocks(blocks);
            }
        }
    }

});
