<div>
    <div id="vvveb-builder">
        <input type="hidden" name="epb_get_blk_url" id="epb_get_blk_url" value="<?php echo get_block_content_url(); ?>" />
        <input type="hidden" name="epb_get_blk_id" id="epb_get_blk_id" value="<?php echo get_block_id(); ?>" />

        <div id="top-panel">
            <div class="btn-group" role="group">
                <span title="Toggle left column" id="toggle-left-column-btn" data-vvveb-action="toggleLeftColumn" data-bs-toggle="button" aria-pressed="false">
                    <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Menu.svg" />
                </span>
            </div>
            <div class="btn-group header-right-controls" role="group" aria-label="Page Builder Header Menu">
                <span title="Undo (Ctrl/Cmd + Z)" id="undo-btn" data-vvveb-action="undo" data-vvveb-shortcut="ctrl+z">
                    <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Undo.svg" />
                </span>

                <span title="Redo (Ctrl/Cmd + Y)" id="redo-btn" data-vvveb-action="redo" data-vvveb-shortcut="ctrl+y">
                    <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Redo.svg" />
                </span>

                <span title="Reset" id="reset-btn" data-vvveb-action="resetpage">
                    <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Reset.svg" />
                </span>

                <span class="divider"></span>

                <span title="Preview" id="preview-btn" type="button" data-bs-toggle="button" aria-pressed="false" data-vvveb-action="preview">
                    <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Preview.svg" />
                </span>

                <span title="Fullscreen (F11)" id="fullscreen-btn" data-bs-toggle="button" aria-pressed="false" data-vvveb-action="fullscreen">
                    <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Fullscreen.svg" />
                </span>

                <span class="divider"></span>

                <button type="button" class="btn btn-primary rounded-1" id="save-btn">
                    <i class="fa fa-save" data-v-gettext></i>
                    Save changes
                </button>
                <a class="closeeditor" href="<?php echo get_block_content_return_url(); ?>" aria-label="Close" data-vvveb-action="close">
                    <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Close.svg" />
                </a>
            </div>
        </div>

        <div id="content-panel" class="showleftpanel">
            <div id="left-panel">
            <ul class="nav nav-tabs edw-tabs m-0 p-0" id="elements-tabs" role="tablist">
                        <li class="nav-item sections-tab" role="presentation">
                            <a class="nav-link flex-column active" id="sections-tab" data-bs-toggle="tab" href="#sections" role="tab" aria-controls="sections" aria-selected="true" title="Sections">
                                <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Navigator.svg" />
                                <span class="small-text">Navigator</span>
                            </a>
                        </li>
                        <li class="nav-item component-tab" role="presentation">
                            <a class="nav-link" id="components-tab" data-bs-toggle="tab" href="#components-tabs" role="tab" aria-controls="components" aria-selected="false" title="Components" tabindex="-1">
                                <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Component.svg" />
                                <span class="small-text">Components</span>
                            </a>
                        </li>
                        <li class="nav-item component-properties-tab" role="presentation">
                            <a class="nav-link" id="properties-tab" data-bs-toggle="tab" href="#properties" role="tab" aria-controls="properties" aria-selected="false" title="Properties" tabindex="-1">
                                <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Settings.svg" />
                                <span class="small-text">Settings</span>
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content">


                        <div class="tab-pane sections active show" id="sections" role="tabpanel" aria-labelledby="sections-tab">
                            <div class="drag-elements-sidepane sidepane">
                                <div class="sections-container">

                                    <div class="section-item" draggable="true">
                                        <div class="controls">
                                            <div class="handle"></div>
                                            <div class="info">
                                                <div class="name">&nbsp;
                                                    <div class="type">&nbsp;</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="section-item" draggable="true">
                                        <div class="controls">
                                            <div class="handle"></div>
                                            <div class="info">
                                                <div class="name">&nbsp;
                                                    <div class="type">&nbsp;</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="section-item" draggable="true">
                                        <div class="controls">
                                            <div class="handle"></div>
                                            <div class="info">
                                                <div class="name">&nbsp;
                                                    <div class="type">&nbsp;</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="components-tabs" role="tabpanel" aria-labelledby="components-tab">
                            <div id="components">

                                <div class="search">
                                    <!-- <div class="expand">
                                        <button class="text-sm" title="Expand All" data-vvveb-action="expand"><i class="la la-plus"></i></button>
                                        <button title="Collapse all" data-vvveb-action="collapse"><i class="la la-minus"></i></button>
                                    </div> -->

                                    <input class="form-control component-search" placeholder="Search components" type="text" data-vvveb-action="search" data-vvveb-on="keyup">
                                    <button class="clear-backspace" data-vvveb-action="clearSearch">
                                        <i class="la la-times"></i>
                                    </button>
                                </div>

                                <div class="drag-elements-sidepane sidepane">
                                    <ul class="components-list clearfix" data-type="leftpanel">
                                        <li class="header" data-section="Base" data-search="">
                                            <label class="header" for="leftpanel_comphead_Base1">
                                                Base<div class="header-arrow"></div>
                                            </label>
                                            <input class="header_check" type="checkbox" checked="true" id="leftpanel_comphead_Base1">
                                            <ol>
                                                <li data-section="Base" data-drag-type="component" data-type="html/heading" data-search="heading" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/heading.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Heading</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/image" data-search="image" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/image.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Image</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/hr" data-search="horizontal rule" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/hr.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Horizontal Rule</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/form" data-search="form" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/form.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Form</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/textinput" data-search="input" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/text_input.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Input</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/textareainput" data-search="text area" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/text_area.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Text Area</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/selectinput" data-search="select input" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/select_input.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Select Input</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/fileinput" data-search="input group" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/text_input.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Input group</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/checkbox" data-search="checkbox" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/checkbox.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Checkbox</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/radiobutton" data-search="radio button" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/radio.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Radio Button</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/link" data-search="link" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/link.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Link</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/video" data-search="video" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/video.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Video</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/button" data-search="html button" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/button.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Html Button</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/paragraph" data-search="paragraph" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/paragraph.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Paragraph</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/blockquote" data-search="blockquote" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/blockquote.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Blockquote</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/list" data-search="list" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/list.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">List</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/table" data-search="table" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/table.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Table</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/preformatted" data-search="preformatted" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/paragraph.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Preformatted</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/audio" data-search="audio" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/audio.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Audio</a>
                                                </li>
                                                <li data-section="Base" data-drag-type="component" data-type="html/video" data-search="video" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/video.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Video</a>
                                                </li>
                                            </ol>
                                        </li>
                                        <li class="header" data-section="Elements" data-search="">
                                            <label class="header" for="leftpanel_comphead_Elements1">
                                                Elements<div class="header-arrow"></div>
                                            </label>
                                            <input class="header_check" type="checkbox" checked="true" id="leftpanel_comphead_Elements1">
                                            <ol>
                                                <li data-section="Elements" data-drag-type="component" data-type="elements/section" data-search="section" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/stream-solid.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Section</a>
                                                </li>
                                                <li data-section="Elements" data-drag-type="component" data-type="elements/footer" data-search="footer" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/stream-solid.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Footer</a>
                                                </li>
                                                <li data-section="Elements" data-drag-type="component" data-type="elements/header" data-search="header" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/stream-solid.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Header</a>
                                                </li>
                                                <li data-section="Elements" data-drag-type="component" data-type="elements/svg-icon" data-search="svg icon" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/star.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Svg Icon</a>
                                                </li>
                                                <li data-section="Elements" data-drag-type="component" data-type="elements/gallery" data-search="gallery" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/images.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Gallery</a>
                                                </li>
                                            </ol>
                                        </li>
                                        <li class="header" data-section="Bootstrap 5" data-search="">
                                            <label class="header" for="leftpanel_comphead_Bootstrap 51">
                                                Bootstrap 5<div class="header-arrow"></div>
                                            </label>
                                            <input class="header_check" type="checkbox" checked="true" id="leftpanel_comphead_Bootstrap 51">
                                            <ol>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/container" data-search="container" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/container.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Container</a>
                                                </li>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/gridrow" data-search="grid row" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/grid_row.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Grid Row</a>
                                                </li>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/btn" data-search="button" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/button.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Button</a>
                                                </li>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/buttongroup" data-search="button group" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/button_group.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Button Group</a>
                                                </li>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/buttontoolbar" data-search="button toolbar" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/button_toolbar.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Button Toolbar</a>
                                                </li>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/alert" data-search="alert" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/alert.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Alert</a>
                                                </li>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/card" data-search="card" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/panel.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Card</a>
                                                </li>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/listgroup" data-search="list group" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/list_group.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">List Group</a>
                                                </li>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/badge" data-search="badge" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/badge.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Badge</a>
                                                </li>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/progress" data-search="progress bar" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/progressbar.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Progress Bar</a>
                                                </li>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/navbar" data-search="nav bar" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/navbar.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Nav Bar</a>
                                                </li>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/breadcrumbs" data-search="breadcrumbs" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/breadcrumbs.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Breadcrumbs</a>
                                                </li>
                                                <li data-section="Bootstrap 5" data-drag-type="component" data-type="html/pagination" data-search="pagination" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/pagination.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Pagination</a>
                                                </li>
                                            </ol>
                                        </li>
                                        <li class="header" data-section="Widgets" data-search="">
                                            <label class="header" for="leftpanel_comphead_Widgets1">
                                                Widgets<div class="header-arrow"></div>
                                            </label>
                                            <input class="header_check" type="checkbox" checked="true" id="leftpanel_comphead_Widgets1">
                                            <ol>
                                                <li data-section="Widgets" data-drag-type="component" data-type="widgets/googlemaps" data-search="google maps" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/map.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Google Maps</a>
                                                </li>
                                                <li data-section="Widgets" data-drag-type="component" data-type="widgets/embed-video" data-search="embed video" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/youtube.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Embed Video</a>
                                                </li>
                                                <li data-section="Widgets" data-drag-type="component" data-type="widgets/chartjs" data-search="chart.js" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/chart.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Chart.js</a>
                                                </li>
                                                <li data-section="Widgets" data-drag-type="component" data-type="widgets/paypal" data-search="paypal" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/paypal.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Paypal</a>
                                                </li>
                                                <li data-section="Widgets" data-drag-type="component" data-type="widgets/twitter" data-search="twitter" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/twitter.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Twitter</a>
                                                </li>
                                                <li data-section="Widgets" data-drag-type="component" data-type="widgets/openstreetmap" data-search="open street map" style="background-image: url(&quot;http://remui.local/vvveb/libs/builder/icons/map.svg&quot;); background-repeat: no-repeat;">
                                                    <a href="#">Open Street Map</a>
                                                </li>
                                            </ol>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="properties" role="tabpanel" aria-labelledby="properties-tab">
                            <div class="component-properties-sidepane">
                                <div class="component-properties">
                                    <ul class="nav nav-tabs nav-fill" id="properties-tabs" role="tablist">
                                        <li class="nav-item content-tab" role="presentation">
                                            <a class="nav-link content-tab active" data-bs-toggle="tab" href="#content-left-panel-tab" role="tab" aria-controls="components" aria-selected="true">
                                                <img src="../edwiserpagebuilder/js/libs/builder/edw_icons/Content.svg" alt="">
                                                <span>Content</span>
                                            </a>
                                        </li>
                                        <li class="nav-item style-tab" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#style-left-panel-tab" role="tab" aria-controls="style" aria-selected="false" tabindex="-1">
                                                <img src="../edwiserpagebuilder/js/libs/builder/edw_icons/Style.svg" alt="">
                                                <span>Style</span>
                                            </a>
                                        </li>
                                        <li class="nav-item advanced-tab" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#advanced-left-panel-tab" role="tab" aria-controls="advanced" aria-selected="false" tabindex="-1">
                                                <img src="../edwiserpagebuilder/js/libs/builder/edw_icons/Advance.svg" alt="">
                                                <span>Advanced</span>
                                            </a>
                                        </li>
                                    </ul>

                                    <div class="tab-content">
                                        <div class="tab-pane show active" id="content-left-panel-tab" data-section="content" role="tabpanel" aria-labelledby="content-tab">
                                            <div class="alert alert-dismissible fade show alert-light m-3" role="alert" style="">
                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                <strong>No selected element!</strong><br> Click on an element to edit.
                                            </div>
                                        </div>

                                        <div class="tab-pane show" id="style-left-panel-tab" data-section="style" role="tabpanel" aria-labelledby="style-tab">
                                        </div>

                                        <div class="tab-pane show" id="advanced-left-panel-tab" data-section="advanced" role="tabpanel" aria-labelledby="advanced-tab">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div id="right-panel">
                <div class="p-0" id="canvas">
                    <div id="iframe-wrapper">
                        <div id="iframe-layer">
                            <div class="loading-message active">
                                <img src="../edwiserpagebuilder/js/libs/builder/icons/siteinnerloader.svg" />
                            </div>
                            <div id="highlight-box">
                            <div id="highlight-name">
                                <span class="name"></span>
                                <span class="type"></span>
                            </div>

                                <div id="section-actions">
                                    <a id="add-section-btn" href="#" title="Add element"><i class="la la-plus"></i></a>
                                </div>
                            </div>
                            <div id="select-box">
                                <div id="wysiwyg-editor" class="default-editor">
                                    <a id="bold-btn" class="hint" href="" title="Bold" aria-label="Bold">
                                        <svg height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6,4h8a4,4,0,0,1,4,4h0a4,4,0,0,1-4,4H6Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                                            <path d="M6,12h9a4,4,0,0,1,4,4h0a4,4,0,0,1-4,4H6Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                                        </svg>
                                    </a>
                                    <a id="italic-btn" class="hint" href="" title="Italic" aria-label="Italic">
                                        <svg height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="19" x2="10" y1="4" y2="4" />
                                            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14" x2="5" y1="20" y2="20" />
                                            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="15" x2="9" y1="4" y2="20" />
                                        </svg>
                                    </a>
                                    <a id="underline-btn" class="hint" href="" title="Underline" aria-label="Underline">
                                        <svg height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6,4v7a6,6,0,0,0,6,6h0a6,6,0,0,0,6-6V4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" y1="2" y2="2" />
                                            <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="4" x2="20" y1="22" y2="22" />
                                        </svg>
                                    </a>

                                    <a id="strike-btn" class="hint" href="" title="Strikeout" aria-label="Strikeout">
                                        <del>S</del>
                                    </a>

                                    <div class="dropdown">
                                        <a class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <span class="hint" aria-label="Text align"><i class="la la-align-left"></i></span>
                                        </a>

                                        <div id="justify-btn" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href="#" data-value="Left"><i class="la la-lg la-align-left"></i>
                                                Align Left</a>
                                            <a class="dropdown-item" href="#" data-value="Center"><i class="la la-lg la-align-center"></i>
                                                Align Center</a>
                                            <a class="dropdown-item" href="#" data-value="Right"><i class="la la-lg la-align-right"></i>
                                                Align Right</a>
                                            <a class="dropdown-item" href="#" data-value="Full"><i class="la la-lg la-align-justify"></i>
                                                Align Justify</a>
                                        </div>
                                    </div>

                                    <div class="separator"></div>

                                    <a id="link-btn" class="hint" href="" title="Create link" aria-label="Create link">
                                        <i class="la la-link"> </i></a>

                                    <div class="separator"></div>

                                    <input id="fore-color" name="color" type="color" aria-label="Text color" pattern="#[a-f0-9]{6}" class="form-control form-control-color hint" />
                                    <input id="back-color" name="background-color" type="color" aria-label="Background color" pattern="#[a-f0-9]{6}" class="form-control form-control-color hint" />

                                    <div class="separator"></div>

                                    <select id="font-size" class="form-select" aria-label="Font size">
                                        <option value="">- Font size -</option>
                                        <option value="8px">8 px</option>
                                        <option value="9px">9 px</option>
                                        <option value="10px">10 px</option>
                                        <option value="11px">11 px</option>
                                        <option value="12px">12 px</option>
                                        <option value="13px">13 px</option>
                                        <option value="14px">14 px</option>
                                        <option value="15px">15 px</option>
                                        <option value="16px">16 px</option>
                                        <option value="17px">17 px</option>
                                        <option value="18px">18 px</option>
                                        <option value="19px">19 px</option>
                                        <option value="20px">20 px</option>
                                        <option value="21px">21 px</option>
                                        <option value="22px">22 px</option>
                                        <option value="23px">23 px</option>
                                        <option value="24px">24 px</option>
                                        <option value="25px">25 px</option>
                                        <option value="26px">26 px</option>
                                        <option value="27px">27 px</option>
                                        <option value="28px">28 px</option>
                                    </select>

                                    <div class="separator"></div>

                                    <select id="font-family" class="form-select" title="Font family">
                                        <option value="">
                                            - Font family -
                                        </option>
                                        <optgroup label="System default">
                                            <option value="Arial, Helvetica, sans-serif">
                                                Arial
                                            </option>
                                            <option value="'Lucida Sans Unicode', 'Lucida Grande', sans-serif">
                                                Lucida Grande
                                            </option>
                                            <option value="'Palatino Linotype', 'Book Antiqua', Palatino, serif">
                                                Palatino Linotype
                                            </option>
                                            <option value="'Times New Roman', Times, serif">
                                                Times New Roman
                                            </option>
                                            <option value="Georgia, serif">
                                                Georgia, serif
                                            </option>
                                            <option value="Tahoma, Geneva, sans-serif">
                                                Tahoma
                                            </option>
                                            <option value="'Comic Sans MS', cursive, sans-serif">
                                                Comic Sans
                                            </option>
                                            <option value="Verdana, Geneva, sans-serif">
                                                Verdana
                                            </option>
                                            <option value="Impact, Charcoal, sans-serif">
                                                Impact
                                            </option>
                                            <option value="'Arial Black', Gadget, sans-serif">
                                                Arial Black
                                            </option>
                                            <option value="'Trebuchet MS', Helvetica, sans-serif">
                                                Trebuchet
                                            </option>
                                            <option value="'Courier New', Courier, monospace">
                                                Courier New
                                            </option>
                                            <option value="'Brush Script MT', sans-serif">
                                                Brush Script
                                            </option>
                                        </optgroup>
                                    </select>
                                </div>

                                <div id="select-actions">
                                    <a id="drag-btn" href="" title="Drag element"><i class="la la-arrows-alt"></i></a>
                                    <a id="parent-btn" href="" title="Select parent" class="la-rotate-180"><i class="la la-level-up-alt"></i></a>

                                    <a id="up-btn" href="" title="Move element up"><i class="la la-arrow-up"></i></a>
                                    <a id="down-btn" href="" title="Move element down"><i class="la la-arrow-down"></i></a>
                                    <a id="clone-btn" href="" title="Clone element"><i class="la la-copy"></i></a>
                                    <a id="delete-btn" href="" title="Remove element"><i class="la la-trash"></i></a>
                                </div>
                                <div class="resize">
                                    <!-- top -->
                                    <div class="top-left"></div>
                                    <div class="top-center"></div>
                                    <div class="top-right"></div>
                                    <!-- center -->
                                    <div class="center-left"></div>
                                    <div class="center-right"></div>
                                    <!-- bottom -->
                                    <div class="bottom-left"></div>
                                    <div class="bottom-center"></div>
                                    <div class="bottom-right"></div>
                                </div>
                            </div>

                            <!-- add section box -->
                            <div id="add-section-box" class="drag-elements">
                                <div class="header">
                                    <ul class="nav nav-tabs" id="box-elements-tabs" role="tablist">
                                        <li class="nav-item component-tab">
                                            <a class="nav-link active" id="box-components-tab" data-bs-toggle="tab" href="#box-components" role="tab" aria-controls="components" aria-selected="true">
                                                <i class="la la-lg la-cube"></i>
                                                <div>
                                                    <small> Components </small>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="nav-item sections-tab">
                                            <a class="nav-link" id="box-sections-tab" data-bs-toggle="tab" href="#box-blocks" role="tab" aria-controls="blocks" aria-selected="false">
                                                <i class="la la-lg la-image"></i>
                                                <div>
                                                    <small> Blocks </small>
                                                </div>
                                            </a>
                                        </li>

                                        <!-- <li class="nav-item component-properties-tab" style="display:none">
                                            <a class="nav-link" id="box-properties-tab" data-bs-toggle="tab" href="#box-properties" role="tab" aria-controls="properties" aria-selected="false">
                                                <i class="la la-lg la-cog"></i>
                                                <div>
                                                    <small>Properties</small>
                                                </div>
                                            </a>
                                        </li> -->
                                    </ul>

                                    <div class="section-box-actions">
                                        <div id="close-section-btn" class="btn btn-light btn-sm bg-white btn-sm float-end">
                                            <i class="la la-times la-lg"></i>
                                        </div>

                                        <div class="mt-2 me-3 float-end">
                                            <div class="form-check d-inline-block me-1">
                                                <input type="radio" id="add-section-insert-mode-after" value="after" name="add-section-insert-mode" class="form-check-input" />
                                                <label class="form-check-label small" for="add-section-insert-mode-after">
                                                    After
                                                </label>
                                            </div>

                                            <div class="form-check d-inline-block">
                                                <input type="radio" id="add-section-insert-mode-inside" value="inside" checked="checked" name="add-section-insert-mode" class="form-check-input" />
                                                <label class="form-check-label small" for="add-section-insert-mode-inside">
                                                    Inside
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-content">
                                        <div class="tab-pane show active" id="box-components" role="tabpanel" aria-labelledby="components-tab">
                                            <div class="search">
                                                <div class="searchfield">
                                                    <input class="form-control component-search" placeholder="Search components" type="text" data-vvveb-action="search" data-vvveb-on="keyup" />
                                                    <button class="clear-backspace" data-vvveb-action="clearSearch">
                                                        <i class="la la-times"> </i>
                                                    </button>
                                                </div>
                                                <div class="expand">
                                                    <button class="text-sm" title="Expand All" data-vvveb-action="expand">
                                                        <i class="la la-plus">
                                                        </i>
                                                    </button>
                                                    <button title="Collapse all" data-vvveb-action="collapse">
                                                        <i class="la la-minus">
                                                        </i>
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <div>
                                                    <ul class="components-list clearfix" data-type="addbox"></ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane" id="box-blocks" role="tabpanel" aria-labelledby="blocks-tab">
                                            <div class="search">
                                                <div class="searchfield">
                                                    <input class="form-control component-search" placeholder="Search components" type="text" data-vvveb-action="search" data-vvveb-on="keyup" />
                                                    <button class="clear-backspace" data-vvveb-action="clearSearch">
                                                        <i class="la la-times"> </i>
                                                    </button>
                                                </div>
                                                <div class="expand">
                                                    <button class="text-sm" title="Expand All" data-vvveb-action="expand">
                                                        <i class="la la-plus">
                                                        </i>
                                                    </button>
                                                    <button title="Collapse all" data-vvveb-action="collapse">
                                                        <i class="la la-minus">
                                                        </i>
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <div>
                                                    <ul class="blocks-list clearfix" data-type="addbox"></ul>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- <div class="tab-pane" id="box-properties" role="tabpanel" aria-labelledby="blocks-tab">
                                            <div class="component-properties-sidepane">
                                                <div>
                                                    <div class="component-properties">
                                                        <div class="mt-4 text-center">Click on an element to edit.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                            <div id="drop-highlight-box"></div>
                        </div>
                        <iframe src="" id="iframe1" class="epb-editor-iframe">
                        </iframe>
                        <div class="edw-rowcreator">
                            <div class="rowcontainer rowselectorbtn">
                                <div class="clickable-layer"></div>
                                <div class="icon-container">
                                    <span class="edw-icon la la-plus"></span>
                                </div>
                                <label>Add a row</label>
                            </div>
                            <div class="rowcontainer rowselection" style="display: none;">
                                <img class="close" src="../../local/edwiserpagebuilder/js/libs/builder/edw_icons/Close.svg">
                                <label>Select Grid</label>
                                <div class="columns">
                                    <div class="drow row-1" data-rows="1">
                                        <div></div>
                                    </div>
                                    <div class="drow row-2" data-rows="2">
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div class="drow row-3" data-rows="3">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div class="drow row-4" data-rows="4">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="previewstatus">Preview on</div>
        </div>
        <div id="bottom-panel">
            <div id="bottom-left-panel">
                <div class="btn-group footer-left-controls" role="group" aria-label="Left Menu Footer Controls">
                    <span title="Styles CSS button" id="styles-btn" data-vvveb-action="styles" data-toggle="modal" data-target="#edwiser-styles-modal" data-backdrop="false" data-draggable="true">
                        <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/CSS.svg" />
                    </span>

                    <span title="Script button" id="script-btn" data-vvveb-action="script" data-toggle="modal" data-target="#edwiser-script-modal" data-backdrop="false" data-draggable="true">
                        <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Script.svg" />
                    </span>

                    <span class="divider"></span>

                    <span id="desktop-view" data-view="desktop" title="Desktop view" data-vvveb-action="viewport">
                        <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Desktop.svg" />
                    </span>

                    <span id="tablet-view" data-view="tablet" title="Tablet view" data-vvveb-action="viewport">
                        <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Tab.svg" />
                    </span>

                    <span id="mobile-view" data-view="mobile" title="Mobile view" data-vvveb-action="viewport">
                        <img class="edw-icon" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Mobile.svg" />
                    </span>
                </div>
            </div>
            <div id="bottom-right-panel">
                <div class="btn-group footer-right-controls" role="group" aria-label="Right Menu Footer Controls">
                    <button id="code-editor-btn" data-view="mobile" title="Code editor" data-vvveb-action="toggleEditor" data-target="#code-editor-close-btn">
                        Code editor
                    </button>
                    <button id="code-editor-close-btn" class="btn btn-danger rounded" data-view="mobile" title="Code editor" data-vvveb-action="toggleEditor" data-target="#code-editor-btn" style="display: none;">
                        Close
                    </button>
                </div>
                <div id="vvveb-code-editor">
                    <textarea class="form-control" style="display: none;"></textarea>
                    <div></div>
                </div>
            </div>
        </div>
        <!-- <div id="left-panel" style="display: none;">
            <div class="component-properties">
               <ul class="nav nav-tabs nav-justified sticky-top" id="properties-tabs" role="tablist">
                   <li class="nav-item content-tab">
                     <a class="nav-link" data-bs-toggle="tab" href="#block-style-tab" role="tab" aria-controls="components" aria-selected="false" title="CSS" >
                         <i class="fa fa-paint-brush"></i>
                     </a>
                   </li>
                   <li class="nav-item style-tab">
                       <a class="nav-link" data-toggle="tab" href="#script-tab" role="tab" aria-controls="blocks"
                           aria-selected="true" title="Script" >
                           <i class="fa fa-code"></i>
                       </a>
                   </li>
               </ul>
               <div class="tab-content" style="max-height: 200px;">
                   <div id='block-style-tab' class="mx-1 tab-pane fade show active">
                       <textarea id='edwiser-block-style-editor' class="w-100" cols="30" rows="10"
                           placeholder='Start adding Block style here.'></textarea>
                   </div>
                   <div id='script-tab' class="mx-1 tab-pane fade show">
                       <textarea id='edwiser-block-script-editor' class="w-100" cols="30" rows="10"
                           placeholder='Start adding Block script here.'></textarea>
                   </div>
               </div>
            </div>

            <div class="drag-elements">

                <div class="header">
                    <ul class="nav nav-tabs  nav-fill" id="elements-tabs" role="tablist">
                      <li class="nav-item sections-tab">
                        <a class="nav-link active" id="sections-tab" data-bs-toggle="tab" href="#sections" role="tab" aria-controls="sections" aria-selected="true" title="Sections">
                            <i class="la la-stream"></i>
                        </a>
                      </li>
                      <li class="nav-item component-tab">
                        <a class="nav-link" id="components-tab" data-bs-toggle="tab" href="#components-tabs" role="tab" aria-controls="components" aria-selected="false" title="Components">
                            <i class="la la-box"></i>
                        </a>
                      </li>
                      <li class="nav-item component-properties-tab">
                        <a class="nav-link" id="properties-tab" data-bs-toggle="tab" href="#properties" role="tab" aria-controls="properties" aria-selected="false" title="Properties">
                            <i class="la la-cog"></i>
                        </a>
                      </li>
                      <li class="nav-item component-configuration-tab">
                        <a class="nav-link" id="configuration-tab" data-bs-toggle="tab" href="#configuration" role="tab" aria-controls="configuration" aria-selected="false" title="Configuration">
                            <i class="la la-tools"></i>
                        </a>
                      </li>
                    </ul>

                    <div class="tab-content">
                        <div class="tab-pane show active sections" id="sections" role="tabpanel" aria-labelledby="sections-tab">

                                    <ul class="nav nav-tabs nav-fill sections-tabs" id="properties-tabs" role="tablist">
                                    <li class="nav-item content-tab">
                                        <a class="nav-link active" data-bs-toggle="tab" href="#sections-new-tab" role="tab" aria-controls="components" aria-selected="false">
                                            <i class="la la-plus"></i> <div><span>Add section</span></div></a>
                                    </li>
                                    <li class="nav-item style-tab">
                                        <a class="nav-link" data-bs-toggle="tab" href="#sections-list" role="tab" aria-controls="sections" aria-selected="true">
                                            <i class="la la-th-list"></i> <div><span>Page Sections</span></div></a>
                                    </li>
                                    </ul>

                                    <div class="tab-content">

                                        <div class="tab-pane" id="sections-list" data-section="style" role="tabpanel" aria-labelledby="style-tab">
                                            <div class="drag-elements-sidepane sidepane">
                                            <div>
                                                <div class="sections-container p-4">
                                                        <div class="section-item" draggable="true">
                                                            <div class="controls">
                                                                <div class="handle"></div>
                                                                <div class="info">
                                                                    <div class="name">&nbsp;
                                                                        <div class="type">&nbsp;</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="section-item" draggable="true">
                                                            <div class="controls">
                                                                <div class="handle"></div>
                                                                <div class="info">
                                                                    <div class="name">&nbsp;
                                                                        <div class="type">&nbsp;</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="section-item" draggable="true">
                                                            <div class="controls">
                                                                <div class="handle"></div>
                                                                <div class="info">
                                                                    <div class="name">&nbsp;
                                                                        <div class="type">&nbsp;</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="tab-pane show active" id="sections-new-tab" data-section="content" role="tabpanel" aria-labelledby="content-tab">


                                                <div class="search">
                                                        <div class="expand">
                                                            <button class="text-sm" title="Expand All" data-vvveb-action="expand"><i class="la la-plus"></i></button>
                                                            <button title="Collapse all" data-vvveb-action="collapse"><i class="la la-minus"></i></button>
                                                        </div>

                                                        <input class="form-control section-search" placeholder="Search sections" type="text" data-vvveb-action="search" data-vvveb-on="keyup">
                                                        <button class="clear-backspace"  data-vvveb-action="clearSearch" title="Clear search">
                                                            <i class="la la-times"></i>
                                                        </button>
                                                    </div>


                                                    <div class="drag-elements-sidepane sidepane">
                                                        <div class="block-preview"><img src="" style="display:none"></div>
                                                        <div>

                                                            <ul class="sections-list clearfix" data-type="leftpanel">
                                                            </ul>

                                                        </div>
                                                    </div>

                                        </div>

                                    </div>

                        </div>

                        <div class="tab-pane show" id="components-tabs" role="tabpanel" aria-labelledby="components-tab">


                                <ul class="nav nav-tabs nav-fill sections-tabs" role="tablist">
                                  <li class="nav-item components-tab">
                                    <a class="nav-link active" data-bs-toggle="tab" href="#components" role="tab" aria-controls="components" aria-selected="true">
                                        <i class="la la-box"></i> <div><span>Components</span></div></a>
                                  </li>
                                  <li class="nav-item blocks-tab">
                                    <a class="nav-link" data-bs-toggle="tab" href="#blocks" role="tab" aria-controls="components" aria-selected="false">
                                        <i class="la la-copy"></i> <div><span>Blocks</span></div></a>
                                  </li>
                                </ul>

                                <div class="tab-content">

                                     <div class="tab-pane show active components" id="components" data-section="components" role="tabpanel" aria-labelledby="components-tab">

                                           <div class="search">
                                                  <div class="expand">
                                                          <button class="text-sm" title="Expand All" data-vvveb-action="expand"><i class="la la-plus"></i></button>
                                                          <button title="Collapse all" data-vvveb-action="collapse"><i class="la la-minus"></i></button>
                                                  </div>

                                                  <input class="form-control component-search" placeholder="Search components" type="text" data-vvveb-action="search" data-vvveb-on="keyup">
                                                  <button class="clear-backspace" data-vvveb-action="clearSearch">
                                                      <i class="la la-times"></i>
                                                    </button>
                                            </div>

                                            <div class="drag-elements-sidepane sidepane">
                                                 <div>

                                                <ul class="components-list clearfix" data-type="leftpanel">
                                                </ul>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="tab-pane show active blocks" id="blocks" data-section="content" role="tabpanel" aria-labelledby="content-tab">

                                               <div class="search">
                                                      <div class="expand">
                                                          <button class="text-sm" title="Expand All" data-vvveb-action="expand"><i class="la la-plus"></i></button>
                                                          <button title="Collapse all" data-vvveb-action="collapse"><i class="la la-minus"></i></button>
                                                      </div>

                                                      <input class="form-control block-search" placeholder="Search blocks" type="text" data-vvveb-action="search" data-vvveb-on="keyup">
                                                      <button class="clear-backspace" data-vvveb-action="clearSearch">
                                                          <i class="la la-times"></i>
                                                      </button>
                                                </div>


                                                <div class="drag-elements-sidepane sidepane">
                                                      <div class="block-preview"><img src=""></div>
                                                      <div>
                                                        <ul class="blocks-list clearfix" data-type="leftpanel">
                                                        </ul>

                                                      </div>
                                                </div>
                                    </div>

                                </div>
                        </div>

                        <div class="tab-pane" id="properties" role="tabpanel" aria-labelledby="properties-tab">
                            <div class="component-properties-sidepane">
                                <div>
                                    <div class="component-properties">
                                        <ul class="nav nav-tabs nav-fill" id="properties-tabs" role="tablist">
                                            <li class="nav-item content-tab">
                                            <a class="nav-link content-tab active" data-bs-toggle="tab" href="#content-left-panel-tab" role="tab" aria-controls="components" aria-selected="true">
                                                <i class="la la-lg la-sliders-h"></i> <div><span>Content</span></div>
                                            </a>
                                            </li>
                                            <li class="nav-item style-tab">
                                            <a class="nav-link" data-bs-toggle="tab" href="#style-left-panel-tab" role="tab" aria-controls="style" aria-selected="false">
                                                <i class="la la-lg la-paint-brush"></i> <div><span>Style</span></div></a>
                                            </li>
                                            <li class="nav-item advanced-tab">
                                            <a class="nav-link" data-bs-toggle="tab" href="#advanced-left-panel-tab" role="tab" aria-controls="advanced" aria-selected="false">
                                                <i class="la la-lg la-tools"></i> <div><span>Advanced</span></div></a>
                                            </li>
                                        </ul>

                                        <div class="tab-content">
                                                <div class="tab-pane show active" id="content-left-panel-tab" data-section="content" role="tabpanel" aria-labelledby="content-tab">
                                                <div class="alert alert-dismissible fade show alert-light m-3" role="alert" style="">
                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    <strong>No selected element!</strong><br> Click on an element to edit.
                                                </div>
                                            </div>

                                                <div class="tab-pane show" id="style-left-panel-tab" data-section="style" role="tabpanel" aria-labelledby="style-tab">
                                                </div>

                                                <div class="tab-pane show" id="advanced-left-panel-tab" data-section="advanced"  role="tabpanel" aria-labelledby="advanced-tab">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="configuration" role="tabpanel" aria-labelledby="configuration-tab">

                            <div class="drag-elements-sidepane sidepane">
                            <div>
                                <div class="component-properties">
                                    <input class="header_check" type="checkbox" checked="true" id="header_pallette">
                                    <div class="tab-pane section px-0" data-section="content">

                                        <div class="mb-3  col-sm-6  inline " data-key="background-color">
                                            <label class=" form-label" for="input-model">Background Color</label>
                                            <div class=" input">
                                                <div>
                                                    <input name="background-color" type="color" pattern="#[a-f0-9]{6}" class="form-control form-control-color">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-3  col-sm-6  inline " data-key="background-color">
                                            <label class=" form-label" for="input-model">Background Color</label>
                                            <div class=" input">
                                                <div>
                                                    <input name="background-color" type="color" pattern="#[a-f0-9]{6}" class="form-control form-control-color">
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </div> -->

        <!-- <div id="bottom-panel" style="display: none">
            <div>
                <div class="breadcrumb-navigator px-2" style="--bs-breadcrumb-divider: '>'">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">body</a></li>
                        <li class="breadcrumb-item"><a href="#">section</a></li>
                        <li class="breadcrumb-item"><a href="#">img</a></li>
                    </ol>
                </div>

                <div class="btn-group" role="group">
                    <div id="toggleEditorJsExecute" class="form-check mt-1" style="display: none">
                        <input type="checkbox" class="form-check-input" id="runjs" name="runjs"
                               data-vvveb-action="toggleEditorJsExecute" />
                        <label class="form-check-label" for="runjs"><small>Run javascript code on
                                edit</small></label>&ensp;
                    </div>
                    <button id="code-editor-btn" data-view="mobile" class="btn btn-sm btn-light btn-sm"
                            title="Code editor" data-vvveb-action="toggleEditor">
                        <i class="la la-code"></i> Code editor
                    </button>
                </div>
            </div>
            <div id="vvveb-code-editor">
                <textarea class="form-control"></textarea>
                <div></div>
            </div>
        </div> -->
        <!-- <div class="col-md-3 p-0" id="right-panel" style="display: none">
            <div class="component-properties eb-block-settings">
                <ul class="nav nav-tabs nav-justified sticky-top" id="properties-tabs" role="tablist">
                    <li class="nav-item content-tab">
                        <a class="nav-link active" data-toggle="tab" href="#content-tab" role="tab"
                           aria-controls="components" aria-selected="false">
                            <i class="fa fa-sliders"></i>
                            <div><span>Content</span></div>
                        </a>
                    </li>
                    <li class="nav-item style-tab">
                        <a class="nav-link" data-toggle="tab" href="#style-tab" role="tab" aria-controls="blocks"
                           aria-selected="true">
                            <i class="fa fa-paint-brush"></i>
                            <div><span>Style</span></div>
                        </a>
                    </li>
                    <li class="nav-item advanced-tab">
                        <a class="nav-link" data-toggle="tab" href="#advanced-tab" role="tab" aria-controls="blocks"
                           aria-selected="false">
                            <i class="fa fa-wrench"></i>
                            <div><span>Advanced</span></div>
                        </a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="content-tab" data-section="content" role="tabpanel"
                         aria-labelledby="content-tab">
                        <div class="alert alert-dismissible fade show alert-light m-3" role="alert">
                            <strong>No selected element!</strong><br />
                            Click on an element to edit.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div class="tab-pane fade show" id="style-tab" data-section="style" role="tabpanel"
                         aria-labelledby="style-tab"></div>
                    <div class="tab-pane fade show" id="advanced-tab" data-section="advanced" role="tabpanel"
                         aria-labelledby="advanced-tab">
                        <div class="alert alert-dismissible fade show alert-info m-3" role="alert">
                            <strong>No advanced properties!</strong><br />
                            This component does not have advanced properties.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</div>

<div id="device-failure">
    <div class="modal">
        <div class="modal-header">
            <h3 class="m-0 p-0">Device not supported</h3>
        </div>
        <div class="modal-body">Current device does not support editing</div>
    </div>
</div>

<div id="epbtaostwrap" aria-live="polite" aria-atomic="true" style="">
    <div style="position: absolute; top: 10px; left: 50%; transform: translate(-50%);">
        <div id="epb-toast-message" class="alert d-none" role="alert" aria-live="assertive" aria-atomic="true" style="width:fit-content;max-width:500px">
            <div class="toast-msg"></div>
            <button type="button" class="close ml-1" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</div>


<div id="edwiser-styles-modal" class="modal moodle-has-zindex epb_custom_modal" data-region="modal-container" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable" role="document" data-region="modal" aria-labelledby="2-modal-title" tabindex="0" id="yui_3_17_2_1_1686902079914_586">
        <div class="modal-content">
            <div class="modal-header " data-region="header">
                <h5 class="modal-title" data-region="title">Styles</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="edw-icon edw-icon-Cancel small"></span>
                </button>
            </div>
            <div class="modal-body" data-region="body">
                <textarea id='edwiser-block-style-editor' class="w-100" cols="30" rows="10" placeholder='Start adding Block style here.'></textarea>
            </div>
        </div>
    </div>
</div>

<div id="edwiser-script-modal" class="modal moodle-has-zindex epb_custom_modal" data-region="modal-container" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable" role="document" data-region="modal" aria-labelledby="2-modal-title" tabindex="0" id="yui_3_17_2_1_1686902079914_586">
        <div class="modal-content">
            <div class="modal-header " data-region="header">
                <h5 class="modal-title" data-region="title">Scripts</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="edw-icon edw-icon-Cancel small"></span>
                </button>
            </div>
            <div class="modal-body" data-region="body">
                <textarea id='edwiser-block-script-editor' class="w-100" cols="30" rows="10" placeholder='Start adding Block script here.'></textarea>
            </div>
        </div>
    </div>
</div>

<div id="edwiser-page-builder-fp" class="modal fade modal-static" tabindex="-1" role="modal" aria-labelledby="my-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xs">
        <div class="modal-content">
            <div class="modal-header d-block border-0 p-0">
                <div class="d-flex mx-4 mt-4">
                    <h4 class="">
                        <?php echo get_string('mediaselpopuptite', 'local_edwiserpagebuilder'); ?>
                    </h4>
                    <button type="button" class="close ml-auto" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="edw-icon edw-icon-Cancel small"></span>
                    </button>

                </div>
                <ul class="nav nav-tabs" id="file-piker-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#edwiser-tab-file-upload" role="tab" aria-controls="blocks" aria-selected="true">
                            <span>
                                <?php echo get_string('mediaselpopuptab1tite', 'local_edwiserpagebuilder'); ?>
                            </span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#edwiser-tab-file-selector" role="tab" aria-controls="components" aria-selected="false">
                            <span>
                                <?php echo get_string('mediaselpopuptab2tite', 'local_edwiserpagebuilder'); ?>
                            </span></a>
                    </li>
                </ul>
            </div>
            <div class="modal-body d-flex p-0">
                <div class="flex-grow-1 tab-content">
                    <div id="epbfm-savefile" class="alert d-none" role="alert"></div>
                    <div id="edwiser-tab-file-upload" class="tab-pane fade p-4 flex-grow-1" role="tabpanel" aria-labelledby="edwiser-tab-file-select"></div>
                    <div id="edwiser-tab-file-selector" class="tab-pane fade show active flex-grow-1" role="tabpanel" aria-labelledby="edwiser-tab-file-upload">
                        <div class="d-flex flex- justify-content-between pl-4 w-100">
                            <div id="epb_media_list_wrap"></div>
                            <div id="epb_media_list_empty">
                                <?php echo get_string('nomediafile', 'local_edwiserpagebuilder'); ?>
                            </div>
                            <input type="hidden" name="file_list_fromlimit" id="file_list_fromlimit" value="0" />
                            <div class="border bg-grey-200 media-details-wrap">
                                <div class="media-details d-none p-3" id="media-details">
                                    <h5 class="text-uppercase bold text-black-50">
                                        <?php echo get_string('mediaselpopuplbldetials', 'local_edwiserpagebuilder'); ?>
                                    </h5>
                                    <div id="epbfm-deletefile" class="d-none alert" role="alert"></div>
                                    <div class="details">
                                        <img class="epb-selected-file" id="epb-selected-file" src="" alt="" width="200" height="auto" />
                                        <div class="bold" id="epbmd-name"></div>
                                        <div id="epbmd-time"></div>
                                        <div id="epbmd-size"></div>
                                        <div id="epbmd-dimensions"></div>
                                        <input type="hidden" name="epbfm-file-name" id="epbfm-file-name" value="" />
                                        <input type="hidden" name="epbfm-file-path" id="epbfm-file-path" value="" />
                                        <input type="hidden" name="epbfm-file-id" id="epbfm-file-id" value="" />
                                        <input type="hidden" name="epbfm-media-id" id="epbfm-media-id" value="" />
                                        <button type="button" id="epbmd-btn-delete-file" class="p-0 btn btn-link text-danger">
                                            <?php echo get_string('mediadeletebtn', 'local_edwiserpagebuilder'); ?>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-primary ml-auto d-none mt-2" id="epb-save-popup-media">
                    <?php echo get_string('mediasavebtn', 'local_edwiserpagebuilder'); ?>
                </button>
                <button class="btn btn-primary ml-auto epb-btn-setfile disabled" id="epb-btn-setfile" data-dismiss="modal" aria-label="Close">
                    <?php echo get_string('mediaselectbtn', 'local_edwiserpagebuilder'); ?>
                </button>
            </div>
        </div>
    </div>
</div>

<!-- templates -->

<script id="vvveb-input-textinput" type="text/html">
    <div>
        <input name="{%=key%}" type="text" class="form-control" />
    </div>
</script>

<script id="vvveb-input-textareainput" type="text/html">
    <div>
        <textarea name="{%=key%}" rows="3" class="form-control" />
    </div>
</script>

<script id="vvveb-input-checkboxinput" type="text/html">
    <div class="form-check{% if (typeof className !== 'undefined') { %} {%=className%}{% } %}">
        <input name="{%=key%}" class="form-check-input" type="checkbox" id="{%=key%}_check" />
        <label class="form-check-label" for="{%=key%}_check">{% if (typeof text !== 'undefined') { %} {%=text%} {% } %}</label>
    </div>
</script>

<script id="vvveb-input-radioinput" type="text/html">
    <div>
        {% for ( var i = 0; i < options.length; i++ ) { %}
        <label class="form-check-input  {% if (typeof inline !== 'undefined' && inline == true) { %}custom-control-inline{% } %}" title="{%=options[i].title%}">
            <input name="{%=key%}" class="form-check-input" type="radio" value="{%=options[i].value%}" id="{%=key%}{%=i%}" {%if
                (options[i].checked)
                {
                %}checked="{%=options[i].checked%}" {%
                }
                %} />
            <label class="form-check-label" for="{%=key%}{%=i%}">{%=options[i].text%}</label>
        </label>

        {% } %}
    </div>
</script>

<script id="vvveb-input-radioinput" type="text/html">
    <div>
        {% for ( var i = 0; i < options.length; i++ ) { %}

        <label class="form-check-input  {% if (typeof inline !== 'undefined' && inline == true) { %}custom-control-inline{% } %}" title="{%=options[i].title%}">
            <input name="{%=key%}" class="form-check-input" type="radio" value="{%=options[i].value%}" id="{%=key%}{%=i%}" {%if
                (options[i].checked)
                {
                %}checked="{%=options[i].checked%}" {%
                }
                %} />
            <label class="form-check-label" for="{%=key%}{%=i%}">{%=options[i].text%}</label>
        </label>

        {% } %}
    </div>
</script>

<script id="vvveb-input-radiobuttoninput" type="text/html">
    <div class="btn-group {%if (extraclass) { %}{%=extraclass%}{% } %} clearfix" role="group">
        {% var namespace = 'rb-' + Math.floor(Math.random() * 100); %} {% for (
        var i = 0; i < options.length; i++ ) { %}

        <input name="{%=key%}" class="btn-check" type="radio" value="{%=options[i].value%}" id="{%=namespace%}{%=key%}{%=i%}" {%if
            (options[i].checked)
            {
            %}checked="{%=options[i].checked%}" {%
            }
            %} autocomplete="off" />
        <label class="btn btn-outline-primary {%if (options[i].extraclass) { %}{%=options[i].extraclass%}{% } %}" for="{%=namespace%}{%=key%}{%=i%}" title="{%=options[i].title%}">
            {%if (options[i].icon) { %}<i class="{%=options[i].icon%}"></i>{% }
            %} {%=options[i].text%}
        </label>

        {% } %}
    </div>
</script>

<script id="vvveb-input-toggle" type="text/html">
    <div class="toggle">
        <input type="checkbox" name="{%=key%}" value="{%=on%}" {%if
            (off)
            {
            %} data-value-off="{%=off%}" {%
            }
            %} {%if
            (on)
            {
            %} data-value-on="{%=on%}" {%
            }
            %} class="toggle-checkbox" id="{%=key%}" />
        <label class="toggle-label" for="{%=key%}">
            <span class="toggle-inner"></span>
            <span class="toggle-switch"></span>
        </label>
    </div>
</script>

<script id="vvveb-input-header" type="text/html">
    <h6 class="header">{%=header%}</h6>
</script>

<script id="vvveb-input-edwheader" type="text/html">
    <{%=type%} class="header {%=extraclass%}" {% if (style != "") {  %}
                style="{%=style%}"
                {% } %} >{%=header%}</{%=type%}>
</script>


<script id="vvveb-input-select" type="text/html">
    <div>
		<select class="form-select" name="{%=key%}">
			{% var optgroup = false; for ( var i = 0; i < options.length; i++ ) { %}
				{% if (options[i].optgroup) {  %}
					{% if (optgroup) {  %}
						</optgroup>
					{% } %}
					<optgroup label="{%=options[i].optgroup%}">
				{% optgroup = true; } else { %}
			<option value="{%=options[i].value%}"
				{%
					for (attr in options[i]) {
							if (attr != "value" && attr != "text") {
						 %}
							{%=attr%}={%=options[i][attr]%}
						{% }
					} %}>
			{%=options[i].text%}</option>
			{% } } %}
		</select>
    </div>
</script>

<script id="vvveb-input-icon-select" type="text/html">
    <div class="input-list-select">
        <div class="elements">
            <div class="row row-cols-4">
                {% for ( var i = 0; i < options.length; i++ ) { %}
                <div class="col">
                    <div class="element">
                        {%=options[i].value%}
                        <label>{%=options[i].text%}</label>
                    </div>
                </div>
                {% } %}
            </div>
        </div>
    </div>
</script>

<script id="vvveb-input-html-list-select" type="text/html">
    <div class="input-html-list-select">

        <div class="current-element">

        </div>

        <div class="popup">
            <select class="form-select">
                {% var optgroup = false; for ( var i = 0; i < options.length; i++ ) { %}
                {% if (options[i].optgroup) {  %}
                {% if (optgroup) {  %}
                </optgroup>
                {% } %}
                <optgroup label="{%=options[i].optgroup%}">
                    {% optgroup = true; } else { %}
                    <option value="{%=options[i].value%}">{%=options[i].text%}</option>
                    {% } } %}
            </select>

            <div class="search">
                <input class="form-control search" placeholder="Search elements" type="text">
                <button class="clear-backspace">
                    <i class="la la-times"></i>
                </button>
            </div>

            <div class="elements">
                {%=elements%}
            </div>
        </div>
    </div>
    </div>
</script>

<script id="vvveb-input-html-list-dropdown" type="text/html">
    <div class="input-html-list-select" {% if (typeof id !== "undefined") { %} id={%=id%} {% } %}>

        <div class="current-element">

        </div>

        <div class="popup">
            <select class="form-select">
                {% var optgroup = false; for ( var i = 0; i < options.length; i++ ) { %}
                {% if (options[i].optgroup) {  %}
                {% if (optgroup) {  %}
                </optgroup>
                {% } %}
                <optgroup label="{%=options[i].optgroup%}">
                    {% optgroup = true; } else { %}
                    <option value="{%=options[i].value%}">{%=options[i].text%}</option>
                    {% } } %}
            </select>

            <div class="search">
                <input class="form-control search" placeholder="Search elements" type="text">
                <button class="clear-backspace">
                    <i class="la la-times"></i>
                </button>
            </div>

            <div class="elements">
                {%=elements%}
            </div>
        </div>
    </div>
    </div>
</script>

<script id="vvveb-input-dateinput" type="text/html">
    <div>
        <input name="{%=key%}" type="date" class="form-control" {% if (typeof
        min_date === 'undefined') { %} min="{%=min_date%}" {% } %} {% if (typeof
        max_date === 'undefined') { %} max="{%=max_date%}" {% } %} />
    </div>
</script>

<script id="vvveb-input-listinput" type="text/html">
    <div class="row">
        {% for ( var i = 0; i < options.length; i++ ) { %}
        <div class="col-6">
            <div class="input-group">
                <input name="{%=key%}_{%=i%}" type="text" class="form-control" value="{%=options[i].text%}" />
                <div class="input-group-append">
                    <button class="input-group-text btn btn-sm btn-danger">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
            <br />
        </div>
        {% } %} {% if (typeof hide_remove === 'undefined') { %}
        <div class="col-12">
            <button class="btn btn-sm btn-outline-primary">
                <i class="fa fa-trash"></i> Add new
            </button>
        </div>
        {% } %}
    </div>
</script>

<script id="vvveb-input-grid" type="text/html">
    <div class="row">
        <div class="col-6 mb-2">
            <label>Flexbox</label>
            <select class="form-select" name="col">

                <option value="">None</option>
                {% for ( var i = 1; i <= 12; i++ ) { %}
                <option value="{%=i%}" {% if ((typeof col !== 'undefined') && col == i) { %} selected {% } %}>{%=i%}
                </option>
                {% } %}
            </select>
        </div>
        <div class="col-6 mb-2">
            <label>Extra small</label>
            <select class="form-select" name="col-xs">
                <option value="">None</option>
                {% for ( var i = 1; i <= 12; i++ ) { %}
                <option value="{%=i%}" {% if ((typeof col_xs !== 'undefined') && col_xs == i) { %} selected {% } %}>{%=i%}
                </option>
                {% } %}
            </select>
        </div>
        <div class="col-6 mb-2">
            <label>Medium</label>
            <select class="form-select" name="col-md">
                <option value="">None</option>
                {% for ( var i = 1; i <= 12; i++ ) { %}
                <option value="{%=i%}" {% if ((typeof col_md !== 'undefined') && col_md == i) { %} selected {% } %}>{%=i%}
                </option>
                {% } %}
            </select>
        </div>
        <div class="col-6 mb-2">
            <label>Large</label>
            <select class="form-select" name="col-lg">
                <option value="">None</option>
                {% for ( var i = 1; i <= 12; i++ ) { %}
                <option value="{%=i%}" {% if ((typeof col_lg !== 'undefined') && col_lg == i) { %} selected {% } %}>{%=i%}
                </option>
                {% } %}
            </select>
        </div>
        <div class="col-6 mb-2">
            <label>Extra large </label>
            <select class="form-select" name="col-xl">
                <option value="">None</option>
                {% for ( var i = 1; i <= 12; i++ ) { %}
                <option value="{%=i%}" {% if ((typeof col_lg !== 'undefined') && col_lg == i) { %} selected {% } %}>{%=i%}
                </option>
                {% } %}
            </select>
        </div>
        <div class="col-6 mb-2">
            <label>Extra extra large</label>
            <select class="form-select" name="col-xxl">
                <option value="">None</option>
                {% for ( var i = 1; i <= 12; i++ ) { %}
                <option value="{%=i%}" {% if ((typeof col_lg !== 'undefined') && col_lg == i) { %} selected {% } %}>{%=i%}
                </option>
                {% } %}
            </select>
        </div>
        {% if (typeof hide_remove === 'undefined') { %}
        <div class="col-12">
            <button class="btn btn-sm btn-outline-light text-danger">
                <i class="fa fa-trash"></i> Remove
            </button>
        </div>
        {% } %}
    </div>
</script>

<script id="vvveb-input-textvalue" type="text/html">
    <div class="row">
        <div class="col-6 mb-1">
            <label>Value</label>
            <input name="value" type="text" value="{%=value%}" class="form-control" autocomplete="off" />
        </div>

        <div class="col-6 mb-1">
            <label>Text</label>
            <input name="text" type="text" value="{%=text%}" class="form-control" autocomplete="off" />
        </div>

        {% if (typeof hide_remove === 'undefined') { %}
        <div class="col-12">
            <button class="btn btn-sm btn-outline-light text-danger">
                <i class="la la-trash la-lg"></i> Remove
            </button>
        </div>
        {% } %}
    </div>
</script>

<script id="vvveb-input-rangeinput" type="text/html">
    <div class="input-range">
        <input name="{%=key%}" type="range" min="{%=min%}" max="{%=max%}" step="{%=step%}" class="form-range" data-input-value />
        <input name="{%=key%}" type="number" min="{%=min%}" max="{%=max%}" step="{%=step%}" class="form-control" data-input-value />
    </div>
</script>

<script id="vvveb-input-imageinput" type="text/html">
    <div class="d-flex filepicker">
        <input name="{%=key%}" type="text" class="form-control epbe-file-url-in" />
            <!-- <input name="file" type="file" class="form-control"/> -->
        <button class="btn btn-outline-secondary edwiser-select-file m-0" data-backdrop="false" data-toggle="modal" data-target="#edwiser-page-builder-fp">
            <i class="fa fa-upload"></i>
        </button>
    </div>
</script>

<script id="vvveb-input-videoinput" type="text/html">
    <div class="d-flex filepicker">
        <input name="{%=key%}" type="text" class="form-control epbe-file-url-in" />
            <!-- <input name="file" type="file" class="form-control"/> -->
        <button class="btn btn-outline-secondary edwiser-select-file m-0" data-backdrop="false" data-toggle="modal" data-target="#edwiser-page-builder-fp">
            <i class="fa fa-upload"></i>
        </button>
    </div>
</script>

<script id="vvveb-input-imageinput-gallery" type="text/html">
    <div>
        <img id="thumb-{%=key%}" class="img-thumbnail p-0" data-target-input="#input-{%=key%}" data-target-thumb="#thumb-{%=key%}" style="cursor:pointer" src="" width="225" height="225" />
        <input name="{%=key%}" type="text" class="form-control mt-1" id="input-{%=key%}" />
        <button name="button" class="btn btn-primary btn-sm btn-icon mt-2" data-target-input="#input-{%=key%}" data-target-thumb="#thumb-{%=key%}">
            <i class="la la-image la-lg"></i>&ensp;Set image
        </button>
    </div>
</script>

<script id="vvveb-input-colorinput" type="text/html">
    <div>
        <input name="{%=key%}" type="color" {% if (typeof value !== 'undefined'
        && value != false) { %} value="{%=value%}" {% } %} pattern="#[a-f0-9]{6}" class="form-control form-control-color" />
    </div>
</script>

<script id="vvveb-input-bootstrap-color-picker-input" type="text/html">
    <div>
        <div id="cp2" class="input-group" title="Using input value">
            <input name="{%=key%}" type="text" {% if (typeof value !==
            'undefined' && value != false) { %} value="{%=value%}" {% } %} class="form-control" />
            <span class="input-group-append">
                <span class="input-group-text colorpicker-input-addon"><i></i></span>
            </span>
        </div>
    </div>
</script>

<script id="vvveb-input-numberinput" type="text/html">
    <div>
        <input name="{%=key%}" type="number" value="{%=value%}" {% if (typeof
        min !== 'undefined' && min != false) { %}min="{%=min%}" {% } %} {% if
        (typeof max !== 'undefined' && max != false) { %}max="{%=max%}" {% } %} {% if (typeof step !== 'undefined' && step != false) {
        %}step="{%=step%}" {% } %} class="form-control" />
    </div>
</script>

<script id="vvveb-input-button" type="text/html">
    <div>
        <button class="btn btn-sm btn-primary">
            <i class="fa  {% if (typeof icon !== 'undefined') { %} {%=icon%} {% } else { %} fa-plus {% } %}"></i>
            {%=text%}
        </button>
    </div>
</script>

<script id="vvveb-input-edwbutton" type="text/html">
    <div>
        <button class="{%if (typeof extraclasses !== undefined) { %}{%=extraclasses%} {% } %}">
            <i class="fa  {% if (typeof icon !== 'undefined') { %} {%=icon%} {% } else { %} fa-plus {% } %}"></i>
            {%=text%}
        </button>
    </div>
</script>

<script id="vvveb-input-edwbuttonwithtext" type="text/html">
    <div class="{%if (typeof wrapperclasses !== undefined) { %}{%=wrapperclasses%} {% } %}">
        <div class="titletext ellips ellips-2">{%=titletext%}</div>
        <button class="{%if (typeof extraclasses !== undefined) { %}{%=extraclasses%} {% } %}">
            <i class="fa  {% if (typeof icon !== 'undefined') { %} {%=icon%} {% } else { %} fa-plus {% } %}"></i>
            {%=text%}
        </button>
    </div>
</script>

<script id="vvveb-input-linkbutton" type="text/html">
    <div>
        <button class="btn btn-sm btn-outline-light {% if (typeof className !== 'undefined') { %} {%=className%} {% } else { %} text-danger {% } %}">
            <i class="fa  {% if (typeof icon !== 'undefined') { %} {%=icon%} {% } else { %} fa-trash {% } %}"></i>
            {%=text%}
        </button>
    </div>
</script>

<script id="vvveb-input-cssunitinput" type="text/html">
    <div class="input-group css-unit" id="cssunit-{%=key%}">
        <input name="number" type="number" {% if (typeof value !== 'undefined'
        && value != false) { %} value="{%=value%}" {% } %} {% if (typeof min !==
        'undefined' && min != false) { %}min="{%=min%}" {% } %} {% if (typeof max
        !== 'undefined' && max != false) { %}max="{%=max%}" {% } %} {% if (typeof
        step !== 'undefined' && step != false) { %}step="{%=step%}" {% } %} class="form-control" />
        <div class="input-group-append">
            <select class="form-select small-arrow" name="unit">
                <option value="em">em</option>
                <option value="rem">rem</option>
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="vw">vw</option>
                <option value="vh">vh</option>
                <option value="ex">ex</option>
                <option value="ch">ch</option>
                <option value="cm">cm</option>
                <option value="mm">mm</option>
                <option value="in">in</option>
                <option value="pt">pt</option>
                <option value="auto">auto</option>
            </select>
        </div>
    </div>
</script>

<script id="vvveb-filemanager-folder" type="text/html">
    <li data-folder="{%=folder%}" class="folder">
        <label for="{%=folder%}"><span>{%=folderTitle%}</span></label>
        <input type="checkbox" id="{%=folder%}" />
        <ol></ol>
    </li>
</script>

<script id="vvveb-filemanager-page" type="text/html">
    <li data-url="{%=url%}" data-file="{%=file%}" data-page="{%=name%}" class="file{% if (typeof className !== 'undefined') { %} {%=className%}{% } %}">
        <label for="{%=name%}" {% if (typeof description !== 'undefined') { %} title="{%=description%}" {% } %}>
            <span>{%=title%}</span>
            <div class="file-actions">
                <button href="#" class="delete btn btn-outline-danger" title="Delete"><i class="la la-trash"></i></button>
                <button href="#" class="rename btn btn-outline-primary" title="Rename"><i class="la la-pen"></i></button>
                <button href="#" class="duplicate btn btn-outline-primary" title="Clone"><i class="la la-copy"></i></button>
            </div>
        </label> <input type="checkbox" id="{%=name%}" />
        <!-- <ol></ol> -->
    </li>
</script>

<script id="vvveb-filemanager-component" type="text/html">
    <li data-url="{%=url%}" data-component="{%=name%}" class="component">
        <a href="{%=url%}"><span>{%=title%}</span></a>
    </li>
</script>

<script id="vvveb-breadcrumb-navigaton-item" type="text/html">
    <li class="breadcrumb-item"><a href="#">{%=name%}</a></li>
</script>

<script id="vvveb-input-sectioninput" type="text/html">
    <label class="header" data-header="{%=key%}" for="header_{%=key%}" >
        <span>{%=header%}</span>
        <img src="../edwiserpagebuilder/js/libs/builder/edw_icons/DownArrow.svg" alt="">
        <!-- <div class="header-arrow"></div> -->
    </label>
    <input class="header_check" type="checkbox" {% if (typeof expanded !==
    'undefined' && expanded == false) { %} {% } else { %}checked="true" {% } %} id="header_{%=key%}">
    <div class="section row m-0" data-section="{%=key%}"></div>
</script>

<script id="vvveb-property" type="text/html">
    <div class="m-0 p-0 {% if(typeof edwclasses !== 'undefined' && edwclasses!=false) { %} {%=edwclasses%} {%}%} {% if (typeof col !== 'undefined' && col != false) { %} col-sm-{%=col%} {% } else { %}row{% } %} {% if (typeof inline !== 'undefined' && inline == true) { %}inline{% } %} " data-key="{%=key%}" {% if (typeof group !== 'undefined' && group != null) { %}data-group="{%=group%}" {% } %}>
        {% if (typeof name !== 'undefined' && name != false) { %}<label class="{% if (typeof inline === 'undefined' ) { %}col-sm-4{% } %} form-label" for="input-model">{%=name%}</label>{% } %}
        <div class="{% if (typeof inline === 'undefined') { %}col-sm-{% if (typeof name !== 'undefined' && name != false) { %}8{% } else { %}12{% } } %} input">
        </div>
    </div>
</script>

<script id="vvveb-input-autocompletelist" type="text/html">
    <div>
        <input name="{%=key%}" type="text" class="form-control" />
        <div class="form-control autocomplete-list" style="min-height: 150px; overflow: auto;"></div>
    </div>
</script>

<script id="vvveb-input-tagsinput" type="text/html">
    <div>
        <div class="form-control tags-input" style="height:auto;">
            <input name="{%=key%}" type="text" class="form-control" style="border:none;min-width:60px;" />
        </div>
    </div>
</script>

<script id="vvveb-input-noticeinput" type="text/html">
    <div>
        <div class="alert alert-dismissible fade show alert-{%=type%}" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <h6><b>{%=title%}</b></h6>
            {%=text%}
        </div>
    </div>
</script>

<script id="vvveb-section" type="text/html">
    {% var suffix = Math.floor(Math.random() * 10000); %}
    <div class="section-item" draggable="true">
        <div class="controls">
            <div class="left">
                <img class="edw-icon handle" src="../edwiserpagebuilder/js/libs/builder/edw_icons/Verticalmenu.svg" />
                <div class="info">
                    <div class="name">
                        {%=name%}
                        <div class="type d-none">{%=type%}</div>
                    </div>
                </div>
            </div>
            <div class="right buttons">
                <a class="delete-btn edw-icon" href="" title="Remove section"><i class="fa fa-trash text-danger"></i></a>
                <a class="properties-btn edw-icon" href="" title="Properties"><i class="fa fa-cog"></i></a>
            </div>
        </div>
        <input class="header_check" type="checkbox" id="section-components-{%=suffix%}" />
        <label for="section-components-{%=suffix%}">
            <div class="fa fa-angle-down"></div>
        </label>
        <div class="tree">
            <ol>
                <li data-component="Products" class="file">
                    <label style="background-image:url(http://demo.givan.ro/js/vvvebjs/icons/products.svg)"><span>Products</span></label>
                    <input type="checkbox" id="idNaN" />
                </li>
                <li data-component="Posts" class="file">
                    <label style="background-image:url(http://demo.givan.ro/js/vvvebjs/icons/posts.svg)"><span>Posts</span></label>
                    <input type="checkbox" id="idNaN" />
                </li>
            </ol>
        </div>
    </div>
</script>

<script id="vvveb-input-layoutselector" type="text/html">
    <div class="layoutselector">
        {% for ( var i = 0; i < options.length; i++ ) { %}
        <label class="epb-ly-sele" title="{%=options[i].title%}">
            <input name="{%=key%}" class="epb-ly-sele-input" type="radio" value="{%=options[i].value%}" id="{%=key%}{%=i%}" {%if
                (options[i].checked)
                {
                %}checked="{%=options[i].checked%}" {%
                }
                %} />
            <img class="epb-ly-sele-img" src="{%=options[i].img%}" alt="{%=options[i].text%}" />
        </label>

        {% } %}
    </div>
</script>

<script id="vvveb-input-multiselect" type="text/html">
    <div>
        <select multiple="multiple" class="form-select multiselect" id="{%=eleid%}">
            {% for ( var i = 0; i < options.length; i++ ) { %}
            <option value="{%=options[i].value%}">{%=options[i].text%}</option>
            {% } %}
        </select>
    </div>
</script>

<script id="vvveb-input-edwcustomdropdown" type="text/html">
    <div class="dropdown {%=edwclasses%} " id="{%=eleid%}">
        <button class="btn  dropdown-toggle" type="button" id="edwcustomdropdownmenutooglebtn" data-bs-toggle="dropdown" aria-expanded="false">
            {%=buttontext%}
            <img src="../edwiserpagebuilder/js/libs/builder/edw_icons/DownArrow.svg" alt="" id="yui_3_18_1_1_1724150271575_75">
        </button>
        <ul class="dropdown-menu" aria-labelledby="edwcustomdropdownmenutooglebtn" id="edwcustomdropdownmenu">
            <!-- Options will be dynamically added here -->
            {%=initialhtml%}
            {% for ( var i = 0; i < options.length; i++ ) { %}
            <li class="course-list-item">
                <input name="{%=key%}" class="form-check-input" type="checkbox" value="{%=options[i].value%}" {%if
                    (options[i].checked)
                    {
                    %}checked="{%=options[i].checked%}" {%
                    }
                    %} />
                <span class="text">{%=options[i].text%}</span>
            </li>

            {% } %}

        </ul>
    </div>
</script>

<script id="vvveb-section-rowcreator" type="text/html">
    <div>
        <section class="row p-2">
            {% for ( var i = 0; i < rows; i++ ) { %}
                <div class="col has-dummy">
                    <div class="add-content" style="margin: 20px;border: 1px dashed #ccc;height: 50px;display: flex;align-items: center;justify-content: center;" data-vvveb-disabled-area contenteditable="false">
                        <img src="../../local/edwiserpagebuilder/js/libs/builder/edw_icons/Add.svg" alt="">
                    </div>
                </div>
            {% } %}
        </section>

    </div>
</script>

<!--// end templates -->
<div class="modal fade" id="textarea-modal" tabindex="-1" role="dialog" aria-labelledby="textarea-modal" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="modal-title text-primary">
                    <i class="la la-lg la-save"></i> Export html
                </p>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <!-- span aria-hidden="true"><small><i class="la la-times"></i></small></span -->
                </button>
            </div>
            <div class="modal-body">
                <textarea rows="25" cols="150" class="form-control"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-lg" data-bs-dismiss="modal">
                    <i class="la la-times"></i> Close
                </button>
            </div>
        </div>
    </div>
</div>
<!-- message modal-->
<div class="modal fade" id="message-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <p class="modal-title text-primary">
                    <i class="fa fa-comment"></i> VvvebJs
                </p>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <!-- span aria-hidden="true"><small><i class="fa fa-times"></i></small></span -->
                </button>
            </div>
            <div class="modal-body">
                <p>Page was successfully saved!.</p>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-primary">Ok</button> -->
                <button type="button" class="btn btn-secondary btn-lg" data-bs-dismiss="modal">
                    <i class="fa fa-times"></i> Close
                </button>
            </div>
        </div>
    </div>
</div>
<!-- new page modal-->
<div class="modal fade" id="new-page-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <form action="save.php">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title text-primary fw-normal">
                        <i class="la la-lg la-file"></i> New page
                    </h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body text">
                    <div class="mb-3 row" data-key="type">
                        <label class="col-sm-3 col-form-label">
                            Template
                            <abbr title="The contents of this template will be used as a start for the new template">
                                <i class="la la-lg la-question-circle text-primary"></i>
                            </abbr>
                        </label>
                        <div class="col-sm-9 input">
                            <div>
                                <select class="form-select" name="startTemplateUrl">
                                    <option value="new-page-blank-template.html">
                                        Blank Template
                                    </option>
                                    <option value="demo/narrow-jumbotron/index.html">
                                        Narrow jumbotron
                                    </option>
                                    <option value="demo/album/index.html">
                                        Album
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3 row" data-key="href">
                        <label class="col-sm-3 col-form-label">Page name</label>
                        <div class="col-sm-9 input">
                            <div>
                                <input name="title" type="text" value="My page" class="form-control" placeholder="My page" required />
                            </div>
                        </div>
                    </div>

                    <div class="mb-3 row" data-key="href">
                        <label class="col-sm-3 col-form-label">File name</label>
                        <div class="col-sm-9 input">
                            <div>
                                <input name="file" type="text" value="my-page.html" class="form-control" placeholder="my-page.html" required />
                            </div>
                        </div>
                    </div>

                    <div class="mb-3 row" data-key="href">
                        <label class="col-sm-3 col-form-label">Save to folder</label>
                        <div class="col-sm-9 input">
                            <div>
                                <input name="folder" type="text" value="my-pages" class="form-control" placeholder="/" required />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-secondary btn-lg" type="reset" data-bs-dismiss="modal">
                        <i class="la la-times"></i> Cancel
                    </button>
                    <button class="btn btn-primary btn-lg" type="submit">
                        <i class="la la-check"></i> Create page
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

<!-- save toast -->
<div class="toast-container position-fixed end-0 bottom-0 me-3 mb-3" id="top-toast">
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header text-white">
            <strong class="me-auto">Page save</strong>
            <!-- <small class="badge bg-success">status</small> -->
            <button type="button" class="btn-close text-white px-2" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            <div class="flex-grow-1">
                <div class="message">
                    Elements saved!
                    <div>Template backup was saved!</div>
                    <div>Template was saved!</div>
                </div>
                <div>
                    <a class="btn btn-success btn-icon btn-sm w-100 mt-2" href="">View page</a>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="js/jquery.min.js"></script>
<script src="js/jquery.hotkeys.js"></script>

<script src="js/beautify.min.js"></script>
<script src="js/beautify-css.min.js"></script>
<!-- <script src="js/beautify-html.min.js"></script> -->

<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/libs/builder/builder.js"></script>

<!-- media gallery -->
<link href="js/libs/media/media.css" rel="stylesheet" />
<script>
    window.mediaPath = "media";
    Vvveb.themeBaseUrl = "demo/landing/";
</script>
<script src="js/libs/media/media.js"></script>
<!-- <script src="js/libs/media/openverse.js"></script> -->
<script src="js/libs/builder/plugin-media.js"></script>

<!-- code mirror - code editor syntax highlight -->
<link href="js/libs/codemirror/lib/codemirror.css" rel="stylesheet" />
<link href="js/libs/codemirror/theme/material.css" rel="stylesheet" />
<script src="js/libs/codemirror/lib/codemirror.js"></script>
<script src="js/libs/codemirror/lib/xml.js"></script>
<script src="js/libs/codemirror/lib/formatting.js"></script>
<script src="js/libs/builder/plugin-codemirror.js"></script>

<script src="js/libs/jszip/jszip.min.js"></script>
<script src="js/libs/jszip/filesaver.min.js"></script>
<script src="js/libs/builder/plugin-jszip.js"></script>

<!-- autocomplete plugin used by autocomplete input-->
<script src="js/libs/autocomplete/jquery.autocomplete.js"></script>
