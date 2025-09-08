/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
/* eslint-disable */

define([
    'local_edwiserpagebuilder/jquery',
    'core/ajax', 'core/templates',
    'core/modal_factory',
    'core/modal_events',
    'core/str',
], function(
    $,
    Ajax,
    Templates,
     ModalFactory,
     ModalEvents,
     Str
     ) {
    var refaddBlockModalUrl = '';
    var blockpagetype = '';
    const load = () => {
        $(document).ready(function() {
            let addblockbutton = "#epbaddblockbutton";
            let epbcustommodal = ".epb_custom_modal.modal";
            let epbclosebutton = epbcustommodal + " .modal-content .close";
            let epbcancelbutton = epbcustommodal + " .modal-content .cancel";
            let epbblockupdatebutton = epbcustommodal + " .modal-content .blocks-list .card-footer .update-content";
            let epbhtmlblockupdatebutton = epbcustommodal + " .modal-content .left-sidebar .card-footer .update-content";
            let epblayoutupdatebutton = epbcustommodal + " .modal-content .layout-list .card-footer .update-content";

            let showLayoutsbutton = epbcustommodal + " .modal-content .show-layouts";
            let showBlocksbutton = epbcustommodal + " .modal-content .show-blocks";
            let layoutContainer = epbcustommodal + " .modal-body .addblock-modal-body.layout-list";
            let blockContainer = epbcustommodal + " .modal-body .addblock-modal-body.blocks-list";

            let categoriesListDesktop = epbcustommodal + " .modal-content .left-sidebar .block-category-list-desktop"
            let categoriesListMob = epbcustommodal + " .modal-content .left-sidebar .block-category-select-mob .dropdown-menu"

            let epbupdateblocklistbtn = epbcustommodal + " .modal-content .action-buttons-modal .updateblocklist";
            let epbupdatelayoutlistbtn = epbcustommodal + " .modal-content .action-buttons-modal .updatelayoutlist";

            let epbdeleteblockbtn = blockContainer + " .card .delete-content";
            let epbdeletecardbtn = layoutContainer + " .card .delete-content";

            let epblayoutcard = layoutContainer + " .islayout";

            let updateinfoalert = '.updateinfoalert';
            let updateinfoalertext ='.updateinfoalert .updateinfotext';
            let edwiseradvancedblocktab ='.edwiseradvancedblocktab';
            let moodleblockstab = '.moodleblockstab';

            $(addblockbutton).on('click', function() {
                $(epbcustommodal).removeClass('d-none');
            });

            $(document).on("click", showLayoutsbutton, function() {
                $("#epb_custom_modal .modal-content").removeClass("blocklist").addClass("layoutlist");
            });
            $(document).on("click", showBlocksbutton, function() {
                $("#epb_custom_modal .modal-content").removeClass("layoutlist").addClass("blocklist");
            });

            $(document).on("click", epblayoutcard + " a", function(e) {
                e.preventDefault();
            });

            $(document).on("click", addblockbutton, function() {
                $(epbcustommodal).removeClass('d-none');
            });

            $(epbclosebutton + "," + epbcancelbutton).on('click', function() {
                $(epbcustommodal).addClass('d-none');
            });
            $(document).on("click", epbblockupdatebutton, function() {
                updateBlockContent(this, false);
            });
            $(document).on("click",  epbhtmlblockupdatebutton, function() {
                updateBlockContent(this, false);
            });
            $(document).on("click", epblayoutupdatebutton, function() {
                updateBlockContent(this, true);
            });

            function updateBlockContent(ele, islayout) {
                $(ele).attr('disabled', true);
                $(ele).find('.edw-icon').addClass(" rotate");

                Ajax.call([{
                    methodname: 'edwiserpagebuilder_update_block_content',
                    args: {blockname: $(ele).attr("data-blockname"), islayout: islayout},
                    done: function(data) {
                        $(ele).find('.edw-icon').removeClass("rotate");
                        if (data.status == false) {
                            updateButton(ele);
                        } else {
                            $(ele).attr('disabled', false);
                        }
                    },
                    fail: function() {
                        $(ele).find('.edw-icon').removeClass("rotate");
                        $(ele).attr('disabled', false);
                        $(updateinfoalertext).text("Something Went Wrong");
                        $(updateinfoalert).removeClass('d-none').removeClass('bg-success').addClass('bg-danger');
                        setTimeout(function(){
                            $(updateinfoalert).addClass('d-none bg-success').removeClass('bg-danger');
                        },1500);
                    }
                }]);
            }

            function checkactivetab(){
                console.log($(edwiseradvancedblocktab).hasClass('active'));
                return $(edwiseradvancedblocktab).hasClass('active');
            }

            $(document).one("click", epbupdateblocklistbtn, function() {
                let _this = this;

                $(_this).attr('disabled', true);
                $(_this).find('.fa').removeClass('fa-download').addClass("rotate");

                var edwpageurl = $(_this).next().val();

                Ajax.call([{
                    methodname: 'edwiserpagebuilder_fetch_blocks_list',
                    args: {
                        edwpageurl: refaddBlockModalUrl,
                        contextid: M.cfg.contextid,
                        blockpage :blockpagetype
                    },
                    done: function(data) {
                        $(_this).find('.fa').removeClass("rotate");
                        if (data.status == true) {

                            // $(blockContainer + ' [data-parentblock="edwiseradvancedblock"]').remove();
                            $(blockContainer + ' .edwblock-content').empty();
                            $(categoriesListDesktop).empty();
                            $(categoriesListMob).empty();

                            $(blockContainer + ' .edwblock-content').html(data.html);
                            $(categoriesListDesktop).html(data.categoriesDesktophtml);
                            $(categoriesListMob).html(data.categoriesMobHtml);
                            // updateButton(_this);

                            applyaddBlockModalFilters();

                            $(_this).removeClass('btn-primary').addClass('btn-success d-none');
                            $(updateinfoalert).removeClass('d-none');

                            setTimeout(function(){
                                $(updateinfoalert).addClass('d-none');
                            },1500);
                            if(!checkactivetab()){
                                $('.advanceblockblocks').addClass('d-none');
                            }
                        } else {
                            $(_this).attr('disabled', false);
                            $(updateinfoalertext).text("Something Went Wrong");
                            $(updateinfoalert).removeClass('d-none');
                        }
                    },
                    fail: function() {
                        $(_this).find('.fa').removeClass("rotate");
                        $(_this).attr('disabled', false);
                    }
                }]);
            });

            $(document).on("click", epbupdatelayoutlistbtn, function() {
                let _this = this;

                $(_this).attr('disabled', true);
                $(_this).find('.fa').removeClass('fa-download').addClass("fa-refresh rotate");

                Ajax.call([{
                    methodname: 'edwiserpagebuilder_fetch_layout_list',
                    args: {},
                    done: function(data) {
                        $(_this).find('.fa').removeClass("rotate");
                        if (data.status == true) {
                             $(layoutContainer + ' .block-cards').empty().prepend(data.html);
                            updateButton(_this);
                        } else {
                            $(_this).attr('disabled', false);
                        }
                    },
                    fail: function() {
                        $(_this).find('.fa').removeClass("rotate");
                        $(_this).attr('disabled', false);
                    }
                }]);
            });

            $(document).on("click", epbdeleteblockbtn, function() {
                var id = $(this).data("blockid");
                delete_content(id, false); // False for block
            });

            $(document).on("click", epbdeletecardbtn, function() {
                var id = $(this).data("blockid");
                delete_content(id, true); // True for layout
            });

            $(document).on('click', '.block-page-layout-btn', function () {
                var blockregion = $(this).attr('data-block-region');
                var blocklayout = $(this).attr('data-block');
                var blockpagetype = $(this).attr('block-pagetypepattern');
                var pagesubtype = '';
                var blockregionvisiblename = blockregion;
                if ( typeof currentpagesubtype !== 'undefined' ) {
                    pagesubtype = currentpagesubtype;
                }
                if ( typeof regionsnamearray !== 'undefined' ) {
                    blockregionvisiblename = regionsnamearray[blockregion];
                }
                ModalFactory.create({
                    type: ModalFactory.types.SAVE_CANCEL,
                    title: Str.get_string('showblocklayoutaddhead', 'local_edwiserpagebuilder'),
                    body: Str.get_string('showblocklayoutaddbody', 'local_edwiserpagebuilder',blockregionvisiblename),
                })
                .done(function (modal) {
                    modal.setSaveButtonText('Yes');
                    var root = modal.getRoot();
                    root.on(ModalEvents.save, function () {
                        addblockLayout(blocklayout,blockpagetype, blockregion,pagesubtype);
                    });
                    modal.show();
                });
            });

            /**
             * @param id
             * @param islayout
             */
            function delete_content(id, islayout) {
                Ajax.call([{
                    methodname: 'local_edwiserpagebuilder_delete_block',
                    args: {id: id, islayout: islayout},
                    done: function(data) {
                        if (islayout) {
                            var element = layoutContainer;
                        } else {
                            var element = blockContainer;
                        }
                        $(element).find('[data-blockid="' + id + '"]').remove();

                        $(updateinfoalertext).text("Successfully deleted!");
                        $(updateinfoalert).removeClass('d-none');
                        setTimeout(function(){
                            $(updateinfoalert).addClass('d-none');
                        },1500);

                    },
                    fail: function(data) {
                        console.log("We are failure");
                        console.log(data);
                        $(updateinfoalertext).text("Deletion failure");
                        $(updateinfoalert).removeClass('d-none').removeClass('bg-success').addClass('bg-danger');
                        setTimeout(function(){
                            $(updateinfoalert).addClass('d-none bg-success').removeClass('bg-danger');
                        },1500);
                    }
                }]);
            }

            /**
             * @param button
             */
            function updateButton(button) {
                // $(button).removeClass('btn-primary').addClass('btn-success');
                $(button).find('.edw-icon').removeClass('edw-icon-Refresh').addClass('edw-icon-Check').css("color", "green");
                // jQuery(button).find('span').html("Updated");
            }

            function addblockLayout(blocklayout,blockpagetype, blockregion,pagesubtype){
                Ajax.call([{
                    methodname: 'local_edwiserpagebuilder_add_adv_block_layout',
                    args: {
                        layout: blocklayout,
                        pagetype: blockpagetype,
                        region:blockregion,
                        subpagetypepattern:pagesubtype,
                        courseid: M.cfg.courseId,
                        contextinstanceid: M.cfg.contextInstanceId
                    },
                    done: function(data) {
                        if(data.status){
                            location.reload(true);
                        }
                        if(!data.status){
                            ModalFactory.create({
                                title: Str.get_string('showblocklayoutaddhead', 'local_edwiserpagebuilder'),
                                body: data.msg,
                            })
                            .done(function (modal) {
                                modal.show();
                            });
                        }
                    },
                    fail: function(data) {
                        console.log("We are failure");
                        console.log(data);
                    }
                }]);
            }

            /**
             * Applies filters to the add block modal based on the selected tab.
             *
             * This function is responsible for showing or hiding the block items in the
             * add block modal based on the selected tab. It determines the active filter
             * category and shows or hides the corresponding block items accordingly.
             */
            function applyaddBlockModalFilters() {
                var selectedtab = $(".edwiser-custom-blocks-nav .nav-link.active");
                var categoryfilter = selectedtab.data('filter');
                var activeFilteredItem = $('.left-sidebar-mid-region .category-list-item.active[data-filter="' + categoryfilter + '"]');
                var target = activeFilteredItem.data('target');
                var categoryselector = target + '-blocks';
                if (target == 'all') {
                    $(`.common-block-wrapper`).addClass('show').removeClass('hide');
                } else {
                    $(`.${categoryselector}`).addClass('show').removeClass('hide').siblings().addClass('hide').removeClass('show');
                }
            }
        });
    };


    return {
        // Init: initialize,
        load: function(addBlockModalUrl, pageType){
            refaddBlockModalUrl = addBlockModalUrl;
            blockpagetype = pageType;
            load();
        }
    };
});
