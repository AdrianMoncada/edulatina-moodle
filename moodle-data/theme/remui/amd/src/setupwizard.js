/* eslint-disable no-console */
/* eslint-disable jsdoc/require-jsdoc*/
/* eslint-disable jsdoc/require-jsdoc*/
/* eslint-disable jsdoc/require-jsdoc*/
/* eslint-disable no-loop-func*/
/* eslint-disable no-unused-vars */

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * TODO describe module setupwizard
 *
 * @module     theme_remui/setupwizard
 * @copyright  2024 YOUR NAME <your@email.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


define(['jquery', 'core/templates', 'core/ajax', 'core/notification', 'core/str', 'theme_remui/feedbackcollection'], function($, Templates, Ajax, Notification, Str, feedbackcollection) {

    const SELECTORS = {
        'SETUPMAIN_WRAPPER': '#setupmain-wrapper',
        'NEXT_PAGE': '.setup-navigation .next-page',
        'SETUP_ERROR': '.setupwizard-error-msg',
        'SETUP_SUCCESS': '.setupwizard-success-msg',
        'CHECKING_HEADING': '.check-requirements .checking',
        'CONTINUESETUPBTN': '.continuesetup-btn',
        'SETUPWIZARD_MODAL': '.setupwizard-modal',
        "LICENSEKEYINPUT": '#licensekey-input',
        "LICENSESUBMITBTN": '.license-submit-btn',
        "LICENSEACKMSG": '.license-ack-msg',
        'USERINFORMATION_FORM': '#user-information-form',
        'USERINFORMATION_SUBMIT_BTN': '#user-information-form .btn[type="submit"]',
        'PLUGIN_INSTALLER': '#edwiser-plugin-installer-wrapper',
        'INSTALLABLE_PLUGINS_WRAPPER': '.installable-plugins-wrapper',
        'RESUMESETUPBTN':'#resume-setup',
        'RETRYYOURSETUPBTN':'.sitesetup-retry .btn',
        'SITESETUP_FEEDBACK':'#setupmain-wrapper .sitesetup-feedback',
        'ACTIVATEREMUIBTN':'#activate-remui-btn',
        'CLOSECURRENTWINDOW':'.close-current-window',
        'SITESETUPLOADER':'.sitesetup-loader-container',
        'SKIPSERVERCHECKBTN':'.skip-server-check',
    };

    const STEPSNAME = {
        'SERVER_CHECK': 'servercheck',
        'USER_INFORMATION': 'userinformation',
        'LICENSE_ACTIVATION': 'licenseactivation',
        'SITESETUP': 'sitesetup',
        'FINAL': 'final',
        'FINISHED': 'finished',
    };

    let setupwizardContext = null;
    let installationQueue = [];
    let installedPluginList = [];
    const pluginProgressStatusTemplate = "theme_remui/setupwizard/setup_plugin_progress_status";
    let allPluginInstallSuccess = true;
    let modalInitialized = false;
    let progressInterval = null;

    // ****** IMPORTANT ******
    // Do not change the sequence.
    // If you want to add new strings here, add it at the bottom.
    // Do not remove any string from the array.
    // There is no way we can revert back if sequence is changed.
    // ****** IMPORTANT ******
    const strings = [
        {key: 'checkingdone', component: 'theme_remui'},
        {key: 'downloadsuccessmsg', component: 'theme_remui'},
        {key: 'installsuccessmsg', component: 'theme_remui'},
        {key: 'setratingreviewoncourse', component: 'theme_remui'},
        {key: 'courseformatsetmsg', component: 'theme_remui'},
        {key: 'setashomepage', component: 'theme_remui'},
        {key: 'enablesuccessmsg', component: 'theme_remui'},
        {key: 'ratingreviewaddedallcoursesmsg', component: 'theme_remui'},
        {key: 'otherpagenotice', component: 'theme_remui'},
        {key: 'downloadfailed', component: 'theme_remui'},
        {key: 'tryagain', component: 'theme_remui'},
        {key: 'somthingwentwrong', component: 'theme_remui'},
    ];

    var LANGS; // Gloabl variable to store languages.

    // Functionality to fetch strings.
    const fetchLanguages = () => {
        Str.get_strings(strings).then(function(results) {
            LANGS = results;
            return results;
        });
    };

    /**
     * Asynchronously retrieves the setup wizard context from the server.
     *
     * @returns {Promise<Object>} The setup wizard context, or null if an error occurs.
     */
    const get_setupwizard_context = async () => {
        return new Promise((resolve) => {
            Ajax.call([{
                methodname: 'theme_remui_do_setup_action',
                args: {
                    action: "get_setupwizard_context",
                    config: JSON.stringify({})
                },
                done: function(response) {
                    setupwizardContext = JSON.parse(response);
                    resolve(setupwizardContext);
                },
                fail: function(ex) {
                    Notification.exception(ex);
                    resolve(null);
                }
            }]);
        });
    };

    /**
     * Appends the rendered template to the specified parent selector.
     *
     * @param {string} parentSelector The CSS selector for the parent element to append the template to.
     * @param {string} template The name of the template to render.
     * @param {Object} context The context object to pass to the template renderer.
     * @returns {Promise<void>} A promise that resolves when the template has been appended.
     */
    function append_template(parentSelector, template, context) {
        return Templates.render(template, {
            config: M.cfg,
            ...context
        }).done(function(html, js) {
            Templates.appendNodeContents($(parentSelector), html, js);
        });
    }

    function handle_add_retry_button() {
        append_template(
            SELECTORS.SETUPMAIN_WRAPPER + " .sitesetup-retry",
            pluginProgressStatusTemplate,
            {
                setupbtn: true,
                btnclass: "install-try-again btn btn-primary ml-auto",
                text: LANGS[10],
            }
        );
        installationQueue = [];
        installedPluginList = [];
    }

    function set_setup_status(step) {
        return Ajax.call([{
            methodname: 'theme_remui_do_setup_action',
            args: {
                action: "set_setup_status",
                config: JSON.stringify({
                    "status": step
                })
            }
        }])[0];
    }


    async function send_usersiteinfo_to_edwiser(formData) {
        return Ajax.call([{
            methodname: 'theme_remui_do_setup_action',
            args: {
                action: "send_usersiteinfo_to_edwiser",
                config: JSON.stringify({
                    'usersiteinfo': formData
                })
            }
        }])[0];
    }


    // ******************** PLUGIN INSTALLER EVENTSs start ******************* ***************************************



    /**
     * Handles the installation exception error for a plugin.
     *
     * @param {string} plugin The plugin identifier.
     * @param {Error} ex The exception that occurred during installation.
     * @returns {void}
     */
    function install_exception_error(plugin, ex) {
        append_template(
            SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .installation-status",
            pluginProgressStatusTemplate,
            {
                exception: true,
                id: plugin + "-exception",
                message: "something went wrong",
                exceptionmsg: ex.stack || ex.message || ex || "Unknown error occurred"
            }
        );
        $(SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .inprogress").remove();
    }
    /**
     * Sets the default course format for the site.
     *
     * @param {string} plugin The plugin identifier.
     * @returns {Promise<Object>} A promise that resolves with the response from the server, or null if an error occurs.
     */
    function setDefaultCourseFormat(plugin) {
        return new Promise((resolve) => {
            Ajax.call([{
                methodname: 'theme_remui_do_setup_action',
                args: {
                    action: "set_default_course_format",
                    config: JSON.stringify({ })
                },
                done: function(response) {
                    append_template(
                        SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .installation-status",
                        pluginProgressStatusTemplate,
                        {
                            success: true,
                            message: LANGS[4]
                        }
                    );
                    resolve(JSON.parse(response));
                },
                fail: function(ex) {
                    Notification.exception(ex);
                    resolve(null);
                }
            }]);
        });
    }

    /**
     * Sets the pagebuilder for the homepage.
     *
     * @param {string} plugin The plugin identifier.
     * @returns {Promise<Object>} A promise that resolves with the response from the server, or null if an error occurs.
     */
    function setPagebuilderForHomepage(plugin) {
        return new Promise((resolve) => {
            Ajax.call([{
                methodname: 'theme_remui_do_setup_action',
                args: {
                    action: "set_pagebuilder_for_homepage",
                    config: JSON.stringify({ })
                },
                done: function(response) {
                    append_template(
                        SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .installation-status",
                        pluginProgressStatusTemplate,
                        {
                            success: true,
                            message: LANGS[5]
                        }
                    );
                    resolve(JSON.parse(response));
                },
                fail: function(ex) {
                    Notification.exception(ex);
                    resolve(null);
                }
            }]);
        });
    }

    /**
     * Enables Edwiser Page Builder filter plugin.
     *
     * @param {string} plugin The plugin identifier.
     * @returns {Promise<Object>} A promise that resolves with the response from the server, or null if an error occurs.
     */
    function enableFilterplugin(plugin) {
        return new Promise((resolve) => {
            Ajax.call([{
                methodname: 'theme_remui_do_setup_action',
                args: {
                    action: "enable_filterplugin",
                    config: JSON.stringify({ })
                },
                done: function(response) {
                    append_template(
                        SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .installation-status",
                        pluginProgressStatusTemplate,
                        {
                            success: true,
                            message: LANGS[6]
                        }
                    );
                    resolve(JSON.parse(response));
                },
                fail: function(ex) {
                    Notification.exception(ex);
                    resolve(null);
                }
            }]);
        });
    }

    /**
     * Sets the Edwiser Rating and Review plugin to all courses.
     *
     * This function adds the Edwiser Rating and Review plugin to all courses on the site.
     * It first adds a loading class to the setup button
     * If the AJAX call is successful, it removes the setup button and appends a success message
     */
    function set_ratingreview_to_allcourses() {
        let setupbtn = $(this);
        setupbtn.addClass("loading");
        setTimeout(() => {
            Ajax.call([{
                methodname: 'block_edwiserratingreview_add_plugin_to_course',
                args: { userdeniedvalue: "true" },
                done: function () {
                    setupbtn.remove();
                    append_template(
                        SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #block_edwiserratingreview" + " .installation-status",
                        pluginProgressStatusTemplate,
                        {
                            success: true,
                            message: LANGS[7]
                        }
                    );
                },
                fail: function (ex) {
                    console.log(ex);
                }
            }]);
        }, 500);
    }

    /**
     * Performs setup tasks after the installation of plugins.
     *
     * This function is called after the installation of plugins. It performs the following tasks:
     * - For the "block_edwiserratingreview" plugin, it appends a template with a "Set Edwiser Rating and Review" button.
     * - For the "format_remuiformat" plugin, it sets the default course format.
     * - For the "local_edwiserpagebuilder" plugin, it sets the page builder for the homepage.
     * - For the "filter_edwiserpbf" plugin, it enables the filter plugin.
     * - It removes the "inprogress" class from the installation status elements for each installed plugin.
     *
     * @param {Object} $data - The data returned from the plugin installation process.
     */
    function plugins_setup_after_installation($data) {

        return new Promise((resolve) => {
            installedPluginList.forEach(async (plugin) => {
                if (plugin === "block_edwiserratingreview") {
                    if (Number(setupwizardContext.isratingreviewaddedtocourses)) {
                        append_template(
                            SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .installation-status",
                            pluginProgressStatusTemplate,
                            {
                                success: true,
                                message: LANGS[7]
                            }
                        );
                    } else {
                        append_template(
                            SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .installation-status",
                            pluginProgressStatusTemplate,
                            {
                                setupbtn: true,
                                btnclass: "set-edwiserratingreview btn btn-secondary btn-sm",
                                text: LANGS[3],
                            }
                        );
                    }
                }

                if (plugin === "format_remuiformat") {
                    await setDefaultCourseFormat(plugin);
                }

                if (plugin === "local_edwiserpagebuilder" ) {
                    await setPagebuilderForHomepage(plugin);
                }

                if (plugin === "filter_edwiserpbf" ) {
                    await enableFilterplugin(plugin);
                }

                $(SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .inprogress").remove();

            });
            resolve(null);
        });
    }

    function remove_downloaded_zip_and_purge_cache(purgecache = true) {
        return Ajax.call([{
            methodname: 'theme_remui_do_setup_action',
            args: {
                action: "remove_downloaded_zip_and_purge_cache",
                config: JSON.stringify({
                    purgecache: purgecache
                })
            }
        }])[0];
    }


    function downloadPlugins(retryCount = 1) {
        return new Promise((resolve, reject) => {
            Ajax.call([{
                methodname: 'theme_remui_do_setup_action',
                args: {
                    action: "plugin_download_handler",
                    config: JSON.stringify({
                        plugins: setupwizardContext.pluginslist,
                    })
                },
                done: function(updateResponse) {
                    resolve(updateResponse);
                },
                fail: function(ex) {
                    if (ex.errorcode === "upgraderunning" && retryCount < 6) {
                        setTimeout(() => {
                            downloadPlugins(retryCount + 1).then(resolve).catch(reject);
                        },360000 * retryCount); // Wait 360 seconds before retrying
                    }
                    else if (retryCount < 4) {
                        setTimeout(() => {
                            downloadPlugins(retryCount + 1).then(resolve).catch(reject);
                        }, 360000 * retryCount); // Wait 360 seconds before retrying
                    } else {
                        resolve([]);
                    }
                },
            }]);
        });
    }

    function get_installableplugin_list() {
        return Ajax.call([{
            methodname: 'theme_remui_do_setup_action',
            args: {
                action: "get_installableplugin_list",
                config: JSON.stringify({})
            }
        }])[0];
    }

    function save_newplugin_settings(retryCount = 0) {

        return new Promise((resolve, reject) => {
            Ajax.call([{
                methodname: 'theme_remui_do_setup_action',
                args: {
                    action: "save_newplugin_settings",
                    config: JSON.stringify({})
                },
                done: function(updateResponse) {
                    resolve("true");
                },
                fail: function(ex) {
                    if (ex.errorcode === "upgraderunning" && retryCount < 30) {
                        setTimeout(() => {
                            save_newplugin_settings(retryCount + 1).then(resolve).catch(reject); // Forward any errors
                        }, 60000);  // Wait 60 seconds before retrying
                    } else if (retryCount < 2) {
                        save_newplugin_settings(retryCount + 1).then(resolve).catch(reject); // Forward any errors
                    } else {
                        resolve(null);
                    }
                }
            }]);
        });
    }

    /**
     * Updates the database for the specified plugin.
     *
     * This function makes an AJAX call to the 'theme_remui_do_setup_action' method with the 'plugin_database_upgrader_handler' action.
     * It will retry the database update up to 30 times if the site is being upgraded, and up to 3 times for other errors.
     * If the database update is successful, it will append a success message to the plugin's installation status element and add the plugin to the installedPluginList.
     * If there is an exception, it will call the install_exception_error function.
     *
     * @param {string} plugin - The name of the plugin to update the database for.
     * @param {number} [retryCount=0] - The number of times the database update has been retried.
     * @returns {Promise<any>} - A Promise that resolves with the database update response data.
     */
    async function updateDatabase(plugin, retryCount = 0) {
        return new Promise((resolve, reject) => {
            Ajax.call([{
                methodname: 'theme_remui_do_setup_action',
                args: {
                    action: "plugin_database_upgrader_handler",
                    config: JSON.stringify({})
                },
                done: function(updateResponse) {
                    const updateData = JSON.parse(updateResponse);

                    append_template(
                        SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .installation-status",
                        pluginProgressStatusTemplate,
                        {
                            success: true,
                            message: LANGS[2]
                        }
                    );

                    const progressValue = parseInt($(SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .inprogress .inprogress-value").text());
                    if(progressValue < 45) {
                        $(SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .inprogress .inprogress-value").text(generateRandomNumber(45, 55));
                    }


                    installedPluginList.push(plugin);

                    resolve(updateData);
                },
                fail: function(ex) {
                    if (ex.errorcode === "upgraderunning" && retryCount < 30) {
                        setTimeout(() => {
                            updateDatabase(plugin, retryCount + 1).then(resolve).catch(reject);
                        }, 60000); // Wait 60 seconds before retrying
                    } else if (retryCount < 3) {
                        setTimeout(() => {
                            updateDatabase(plugin, retryCount + 1).then(resolve).catch(reject);
                        }, 30000); // Wait 30 seconds before retrying
                    } else {
                        install_exception_error(plugin, ex);
                    }
                },
                timeout: 3600000
            }]);
        });
    }

    /**
     * Handles the installation of a plugin.
     *
     * @param {string} plugin - The name of the plugin to install.
     * @param {string} url - The URL of the plugin zip file.
     * @returns {Promise<any>} - A Promise that resolves with the installation response data.
     */
    function handlePluginInstallation(plugin, url) {
        epb_blocks_setup_info_handler(plugin);
        return new Promise((resolve, reject) => {
            Ajax.call([{
                methodname: 'theme_remui_do_setup_action',
                args: {
                    action: "plugin_install_handler",
                    config: JSON.stringify({ zipfile: url })
                },
                done: async function(installResponse) {
                    const response = JSON.parse(installResponse);

                    if (response.success) {
                        await updateDatabase(plugin);
                        epb_blocks_setup_info_handler(plugin, true);
                    } else if (response.error || response.info) {
                        append_template(
                            SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .installation-status",
                            pluginProgressStatusTemplate,
                            {
                                error: response.error,
                                info: response.info,
                                message: response.message
                            }
                        );
                    }

                    if(response.error) {
                        $(SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .inprogress").remove();
                        epb_blocks_setup_info_handler(plugin, true);
                    }

                    if (response.info) {
                        const progressValue = parseInt($(SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .inprogress .inprogress-value").text());
                        if(progressValue < 45) {
                            $(SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .inprogress .inprogress-value").text(generateRandomNumber(45, 55));
                        }
                        installedPluginList.push(plugin);
                        epb_blocks_setup_info_handler(plugin, true);
                    }

                    resolve(response);
                },
                fail: function(ex) {
                    install_exception_error(plugin, ex);
                    resolve(null);
                }
            }]);
        });
    }


    function queueInstallation(plugin, url) {
        return new Promise((resolve) => {
            installationQueue.push(() => handlePluginInstallation(plugin, url).then(resolve));
            if (installationQueue.length === 1) {
                processQueue();
            }
        });
    }

    async function processQueue() {
        while (installationQueue.length > 0) {
            await installationQueue[0]();
            installationQueue.shift();
        }
    }

    function generateRandomNumber(min = 1, max = 10) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function installation_progress_value_handler(min = null) {
        // Clear any existing interval first
        if (progressInterval) {
            clearInterval(progressInterval);
        }

        const progressValues = $(".inprogress .inprogress-value");

        if (progressValues.length > 0) {
            // Run first iteration immediately
            setTimeout(updateProgressValues, 2000);

            // Then run every 30 seconds
            progressInterval = setInterval(updateProgressValues, 15000);
        }

        function updateProgressValues() {
            progressValues.each(function() {
                const progressValue = parseInt($(this).text());

                if (progressValue && progressValue < 85) {

                    let nextValue = min ? Math.max(min, progressValue) : progressValue;
                    $(this).text(generateRandomNumber(nextValue, nextValue + 5));

                } else if (!progressValue) {

                    $(this).text(generateRandomNumber(1, 5));
                    $(this).siblings('.percentage-icon').removeClass("d-none");

                }
            });
        }
    }

    function epb_blocks_setup_info_handler(plugin, shouldremove = false) {
        const epb_blocks_setup_info = $(SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " ." + plugin + "_setup-info");
        console.log({epb_blocks_setup_info});
        if(epb_blocks_setup_info.length) {
            if (shouldremove) {
                epb_blocks_setup_info.addClass("d-none");
            } else {
                epb_blocks_setup_info.removeClass("d-none");
            }
        }
    }

    /**
     * Handles the installation of plugins for the setup wizard.
     *
     * This function first downloads the available plugins, then iterates through them and queues the installation of each plugin.
     * After all plugins have been installed, it calls the `plugins_setup_after_installation` function.
     *
     * @async
     * @returns {Promise<void>} A promise that resolves when the plugin installation process is complete.
     */
    async function sitesetuphandler() {
        try {
            await remove_downloaded_zip_and_purge_cache(false);
            const response = await downloadPlugins();
            const data = JSON.parse(response);

            // checking all pluigns has installed or not and accroding to it setting the status
            if(Object.entries(data).length) {
                for (const [plugin, url] of Object.entries(setupwizardContext.pluginslist)) {
                    if (plugin in data) {
                        await append_template(
                            SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .installation-status",
                            pluginProgressStatusTemplate,
                            {
                                success: true,
                                message: LANGS[1]
                            }
                        );


                    } else {
                        await append_template(
                            SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .installation-status",
                            pluginProgressStatusTemplate,
                            {
                                error: true,
                                message: LANGS[9],
                            }
                        );
                        $(SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + " #" + plugin + " .inprogress").remove();
                        allPluginInstallSuccess = false;
                    }
                }
            }


            if (Object.entries(data).length === 0 || Object.entries(setupwizardContext.pluginslist).length === 0) {

                $(SELECTORS.INSTALLABLE_PLUGINS_WRAPPER).empty();
                await append_template(
                    SELECTORS.INSTALLABLE_PLUGINS_WRAPPER,
                    pluginProgressStatusTemplate,
                    {
                        error: true,
                        message: LANGS[11],
                    }
                );
                handle_add_retry_button();

            } else {

                installation_progress_value_handler(25);

                for (const [plugin, url] of Object.entries(data)) {
                    await queueInstallation(plugin, url);
                }

                let save_newplugin_settings_response = await save_newplugin_settings();

                await plugins_setup_after_installation(data);

                $(SELECTORS.SITESETUPLOADER).removeClass("d-none").addClass('d-flex');

                if (progressInterval) {
                    clearInterval(progressInterval);
                }

                if (Object.keys(setupwizardContext.pluginslist).length === installedPluginList.length && allPluginInstallSuccess) {
                    await site_initial_theme_setup();
                    $(SELECTORS.SETUPMAIN_WRAPPER + ' .setup-navigation').removeClass("d-none").addClass("d-flex");
                } else {
                    $(SELECTORS.SITESETUPLOADER).removeClass("d-flex").addClass('d-none');
                    handle_add_retry_button();
                }

            }

        } catch (ex) {
            Notification.exception(ex);
        }
    }

    // ******************** PLUGIN INSTALLER EVENTSs END ********************


    // ******************** SERVER CHECK START ********************
    /**
     * Handles the server check step of the setup wizard.
     *
     * This function is responsible for rendering the server check step of the setup wizard. It performs a server check.
     * If all checks pass, it enables the "Next" button to allow the user to proceed to the next step.
     */
    function setup_servercheck() {
        let template = 'theme_remui/setupwizard/setup_' + STEPSNAME.SERVER_CHECK;
        $(SELECTORS.SETUPMAIN_WRAPPER).empty();

        append_template(
            SELECTORS.SETUPMAIN_WRAPPER,
            template,
            setupwizardContext
        ).then(() => {
            sessionStorage.setItem('setup_step', STEPSNAME.SERVER_CHECK);

            setTimeout(() => {
                Ajax.call([{
                    methodname: 'theme_remui_do_setup_action',
                    args: {
                        action: "system_server_check",
                        config: JSON.stringify({})
                    },
                    done: function(response) {
                        response = JSON.parse(response);

                        $(SELECTORS.CHECKING_HEADING).text(LANGS[0]);

                        Object.entries(response.requirechecks).forEach(([key, value]) => {
                            $("." + key + " .loader").addClass("d-none");

                            if (value) {
                                $("." + key + " " + SELECTORS.SETUP_SUCCESS).removeClass("d-none").addClass("d-flex");
                            } else {
                                if(key == 'writeaccesscheck') {
                                    $("." + key + " " + SELECTORS.SETUP_ERROR+ ' span').text(response.nonwriteablepluginsmsg);
                                }
                                $("." + key + " " + SELECTORS.SETUP_ERROR).removeClass("d-none").addClass("d-flex");
                            }
                        });

                        if (response.allchecks) {
                            $(SELECTORS.NEXT_PAGE).removeClass("disabled");
                        }
                    },
                    fail: function(ex) {
                        Notification.exception(ex);
                    }
                }]);
            }, 800);
        });
    }
    // ******************** SERVER CHECK END ********************



    // ******************** USER INFORMATION START ********************

    function setup_userinformation() {
        let template = 'theme_remui/setupwizard/setup_' + STEPSNAME.USER_INFORMATION;
        $(SELECTORS.SETUPMAIN_WRAPPER).empty();

        append_template(
            SELECTORS.SETUPMAIN_WRAPPER,
            template,
            setupwizardContext
        ).then(() => {
            sessionStorage.setItem('setup_step', STEPSNAME.USER_INFORMATION);
        });
    }

    /**
     * Submits the user information form and saves the user's responses to the server.
     *
     * It collects the checked radio button values from the form,
     * creates an array of question-answer pairs,
     * and sends the data to the server using an AJAX call.
     *
     * After the data is saved, the function calls the `current_step_handler` function to move to the
     * next step in the setup wizard.
     *
     * @param {Event} e - The submit event object.
     */
    async function submitUserInformation(e) {
        e.preventDefault();

        let formData = [];

        const checkedInputs = $(SELECTORS.USERINFORMATION_FORM + ' input[type="radio"]:checked');
        for (const input of checkedInputs) {
            const name = $(input).attr('name');
            const question = $('.info-question[data-questionfor="' + name + '"]').data('value');
            let ans = $(input).val();

            formData.push({
                question: question,
                answer: ans
            });
        }

        Ajax.call([{
            methodname: 'theme_remui_do_setup_action',
            args: {
                action: "save_setup_info",
                config: JSON.stringify({
                    'usersiteinfo': formData
                })
            },
            done: function(response) {
                response = JSON.parse(response);
            },
            fail: function(ex) {
                Notification.exception(ex);
            }
        }]);

        await send_usersiteinfo_to_edwiser(formData);

        const nextStep = $(SELECTORS.USERINFORMATION_SUBMIT_BTN).data('nextstep');
        nextPageHandler("", nextStep);
    }

    /**
     * Checks if all questions in the user information form have been answered.
     * If all questions have been answered, it removes the 'disabled' class from the submit button.
     */
    function checkAllQuestionsAnswered() {
        const totalQuestions = $(SELECTORS.USERINFORMATION_FORM).find('.info-question').length;
        const answeredQuestions = $(SELECTORS.USERINFORMATION_FORM).find('input[type="radio"]:checked').length;

        if (answeredQuestions === totalQuestions) {
            $(SELECTORS.USERINFORMATION_SUBMIT_BTN).removeClass('disabled');
        } else if (!$(SELECTORS.USERINFORMATION_SUBMIT_BTN).hasClass('disabled')) {
            $(SELECTORS.USERINFORMATION_SUBMIT_BTN).addClass('disabled');
        }
    }

    /**
     * Handles the event when a custom answer input field is changed.
     *
     * This function checks the value of the custom answer input field and updates the corresponding radio button in the user information form accordingly.
     *
     * After updating the radio button, the function calls `checkAllQuestionsAnswered()` to check if all questions in the user information form have been answered.
     */
    function checkCustomAnswerInput() {
        let textInput = $(this);
        let targetQuestionId = "#" + $(this).data('inputfor');
        let targetQuestion = $(SELECTORS.USERINFORMATION_FORM + ' input[type="radio"]' + targetQuestionId);

        if (textInput.val().length > 0) {
            targetQuestion.prop('checked', true);
            targetQuestion.val(textInput.val());
        } else {
            targetQuestion.prop('checked', false);
        }
        checkAllQuestionsAnswered();
    }
    // ******************** USER INFORMATION END ********************



    async function setup_licenseactivation() {
        let template = 'theme_remui/setupwizard/setup_' + STEPSNAME.LICENSE_ACTIVATION;

        await save_newplugin_settings();

        $(SELECTORS.SETUPMAIN_WRAPPER).empty();

        append_template(
            SELECTORS.SETUPMAIN_WRAPPER,
            template,
            setupwizardContext
        ).then(() => {
            if(setupwizardContext.licensekey){
                licenseActivationHandler(setupwizardContext.licensekey,);
            }
            sessionStorage.setItem('setup_step', STEPSNAME.LICENSE_ACTIVATION);
        });
    }

    async function setup_sitesetup() {
        let template = 'theme_remui/setupwizard/setup_' + STEPSNAME.SITESETUP;
        $(SELECTORS.SETUPMAIN_WRAPPER).empty();

        let plugincontext = await get_installableplugin_list();
        plugincontext = JSON.parse(plugincontext);
        setupwizardContext.pluginslist = plugincontext?.pluginslist || [];
        setupwizardContext.structuredpluginlist = plugincontext?.structuredpluginlist;

        append_template(
            SELECTORS.SETUPMAIN_WRAPPER,
            template,
            setupwizardContext
        ).then(() => {
            sessionStorage.setItem('setup_step', STEPSNAME.SITESETUP);
            installation_progress_value_handler();
            sitesetuphandler();
        });
    }

    function setup_final() {
        let template = 'theme_remui/setupwizard/setup_' + STEPSNAME.FINAL;
        $(SELECTORS.SETUPMAIN_WRAPPER).empty();

        append_template(
            SELECTORS.SETUPMAIN_WRAPPER,
            template,
            setupwizardContext
        ).then(async () => {
            sessionStorage.setItem('setup_step', STEPSNAME.FINAL);

            await remove_downloaded_zip_and_purge_cache();
        });
    }

    function setup_sitesetup_feedback(e) {
        feedbackcollection.submit_feedback_handler(e);
        set_setup_status(STEPSNAME.FINISHED);
        window.location = M.cfg.wwwroot;
    }

    // ******************** IF RemUI didn't active then append this ********************
    function add_activateremui_step(e) {
        $(SELECTORS.SETUPMAIN_WRAPPER + " .setup-container.loading-container").remove();
        $(SELECTORS.SETUPMAIN_WRAPPER + " .setup-container").removeClass("d-none");
    }

    // ******************** PAGE STEPS HANDLERS START ********************

    /**
     * Handles the current step of the setup wizard.
     *
     * This function is responsible for rendering the appropriate setup wizard step based on the provided `nextstep` parameter.
     *
     * @param {string} nextstep - The identifier of the next step to be displayed in the setup wizard.
     */
    function current_step_handler(nextstep) {

        switch (nextstep) {
            case STEPSNAME.SERVER_CHECK:
                setup_servercheck();
                break;
            case STEPSNAME.USER_INFORMATION:
                setup_userinformation();
                break;
            case STEPSNAME.LICENSE_ACTIVATION:
                setup_licenseactivation();
                break;
            case STEPSNAME.SITESETUP:
                setup_sitesetup();
                break;
            case STEPSNAME.FINAL:
                setup_final();
                break;
            default:
                setup_licenseactivation();
                break;
        }
    }

    function nextPageHandler(e, nextstep = "") {
        if(!nextstep) {
            nextstep = $(this).data('nextstep');
        }
        set_setup_status(nextstep);
        current_step_handler(nextstep);
    }

    /**
     * Initializes the setup wizard by handling the current step.
     *
     * This function is responsible for setting the initial step of the setup wizard based on the stored setup step in the session storage.
     * If no setup step is stored, it defaults to the 'SITESETUP' step.
     */
    function initializeWizard() {
        let currentstep = sessionStorage.getItem('setup_step');
        if (setupwizardContext.resumestep === STEPSNAME.FINAL || setupwizardContext.resumestep === STEPSNAME.FINISHED) {
            current_step_handler(STEPSNAME.FINAL);
        } else if (!currentstep && setupwizardContext.resumestep) {
            if ( setupwizardContext.resumestep === STEPSNAME.SITESETUP) {
                current_step_handler(STEPSNAME.SERVER_CHECK);
            } else {
                current_step_handler(setupwizardContext.resumestep);
            }
        } else {
            current_step_handler(currentstep);
        }
    }

    // ******************** PAGE STEPs HANDLERS END ********************


    /**
     * Handles the license activation process for the RemUI theme.
     *
     * This function is called when the user enters a license key and submits it for activation on setup wizard.
     *
     * @param {string} $licensekey - The license key entered by the user.
     * @param {string} action - Opeartion associated with the method.
     */
    function licenseActivationHandler($licensekey, action = "check") {
        Ajax.call([{
            methodname: 'theme_remui_do_setup_action',
            args: {
                action: "license_check",
                config: JSON.stringify({
                    'licensekey': $licensekey,
                    'operation': action
                })
            },
            done: function(response) {
                response = JSON.parse(response);
                var textinfoclass = "sucessinfo";
                if($(SELECTORS.LICENSEKEYINPUT)){
                    $(SELECTORS.LICENSESUBMITBTN).removeClass("disabled");
                    $(SELECTORS.LICENSEKEYINPUT).removeClass("is-checking");
                }
                if(response['licensestatus'] == "Active"){
                    $(SELECTORS.LICENSEKEYINPUT).addClass("is-valid").removeClass("is-invalid");
                    $(SELECTORS.LICENSESUBMITBTN).addClass("d-none");
                    $(SELECTORS.NEXT_PAGE).removeClass("d-none");
                }else{
                    $(SELECTORS.LICENSEKEYINPUT).addClass("is-invalid").removeClass("is-valid");
                    textinfoclass = "failureinfo";
                }
                if (response['alert']) {
                    $(SELECTORS.LICENSEACKMSG).removeClass("d-none").removeClass("sucessinfo failureinfo").addClass(textinfoclass).html(response['alert']['text']);
                } else if (response['licensestatus'] == "Active") {
                    $(SELECTORS.LICENSEACKMSG).removeClass("d-none").removeClass("failureinfo").addClass("sucessinfo").text(response['licensestatus']);
                } else {
                    $(SELECTORS.LICENSEACKMSG).removeClass("d-none").removeClass("failureinfo").addClass("failureinfo").text(response['licensestatus']);
                }
            },
            fail: function(ex) {
                Notification.exception(ex);
            }
        }]);
    }

    /**
     * Performs the initial setup for the RemUI theme, including setting up the homepage and custom pages.
     *
     * This function is responsible for the following tasks:
     * - Calls the 'theme_remui_do_setup_action' AJAX method to perform the basic theme setup.
     * - Checks if the Edwiser Page Builder plugin is installed and enabled.
     * - If the Edwiser Page Builder plugin is available, it retrieves the layout information for the homepage and custom pages.
     * - Sets the homepage layout using the 'local_edwiserpagebuilder_add_adv_block_layout' AJAX method.
     * - Creates and publishes the custom pages using the 'local_edwiserpagebuilder_do_page_action' AJAX method.
     * - Sets the page links in the footer using the 'set_pagelinks_in_footer' function.
     * - Renders the page cards for the homepage and custom pages using the 'theme_remui/setupwizard/page_course_card' template.
     *
     * This function is called as part of the setup wizard initialization process.
     */
    function site_initial_theme_setup(){
        return new Promise(function(resolve, reject) {
            Ajax.call([{
                methodname: 'theme_remui_do_setup_action',
                args: {
                    action: "basic_theme_setup",
                    config: JSON.stringify({})
                },
                done: async function(response) {

                    var data = JSON.parse(response);

                    var pageinfo = "";

                    var templatecontext = [];
                    // Initialize the arrays first
                    templatecontext["homepage"] = [];
                    templatecontext["otherpage"] = [];

                    var notices = [];
                    notices["homepage"] = false;
                    notices["otherpage"] = false;

                    $(".site-setup-elem-wraper").removeClass("d-none");

                    for (const [key, value] of Object.entries(data["pluginsetup"])) {
                        setTimeout(() => {
                            $(SELECTORS.SITESETUPLOADER).removeClass("d-flex").addClass('d-none');
                            $(".site-setup-elem-wraper").append(value);
                        }, 1500);
                    }

                    setTimeout(async () => {
                        if(data["edwiserpagebuilderexist"]){

                            var pageinfo = await get_layout_info(setupwizardContext["layouts"]);

                            pageinfo = JSON.parse(pageinfo);

                            for (const [key, value] of Object.entries(pageinfo)) {
                                if(key == "homepage"){
                                    await set_home_page(value["layout"]);
                                    templatecontext["homepage"].push(value);
                                } else {

                                    var pagedraftid = await set_custom_pages(value);
                                    pagedraftid = JSON.parse(pagedraftid);

                                    if(pagedraftid){
                                       var pageid =  await publish_custom_pages(pagedraftid);
                                       var pageurl =  M.cfg.wwwroot + '/local/edwiserpagebuilder/page.php?id=' + JSON.parse(pageid);
                                       pageinfo[key]["publishedpage"] = pageurl;
                                    }
                                    templatecontext["otherpage"].push(pageinfo[key]);
                                    notices["otherpage"] = LANGS[8];
                                }
                            }


                            await set_pagelinks_in_footer(templatecontext["otherpage"]);

                            for (const [key, value] of Object.entries(templatecontext)){
                                let template = 'theme_remui/setupwizard/page_course_card';
                                let parentSelector = '.configuration-wrapper.'+key+"setup .content";
                                $(parentSelector).empty();

                                var context = [];
                                context['pagecards'] = value;
                                context["notice"] = notices[key];
                                await append_template(parentSelector, template, context);
                            }

                        } else {
                            $('.configuration-wrapper.homepagesetup').remove();
                            $('.configuration-wrapper.otherpagesetup').remove();
                        }

                        if(data["edwisersiteimporterexist"]){

                        }

                        resolve(null);
                    }, 2000);
                },
                fail: function(ex) {
                    Notification.exception(ex);
                    resolve(null);
                }
            }]);
        });

    }

    /**
     * Retrieves layout information based on the provided configuration.
     *
     * @param {Object} $config - The configuration object containing the layouts.
     * @returns {Promise<Object>} - The layout information.
     */
    async function get_layout_info($config){
        const request = {
            methodname: 'theme_remui_do_setup_action',
            args: {
                action: "get_layout_info",
                config: JSON.stringify($config)
            },
        };
        return Ajax.call([request])[0];
    }
    /**
     * Sets the home page layout.
     *
     * @param {Object} blocklayout - The block layout configuration.
     * @returns {Promise<Object>} - The result of the AJAX call.
     */
    async function set_home_page(blocklayout){
        const request = {
            methodname: 'local_edwiserpagebuilder_add_adv_block_layout',
            args: {
                layout: blocklayout,
                pagetype: "site-index",
                region: "full-width-top",
                subpagetypepattern: null,
                courseid: M.cfg.courseId,
                contextinstanceid: M.cfg.contextInstanceId
            },
        };
        return Ajax.call([request])[0];
    }
    /**
     * Adds a new page with the specified layout configuration.
     *
     * @param {Object} config - The configuration object for the new page.
     * @returns {Promise<Object>} - The result of the AJAX call.
     */
    async function set_custom_pages(config) {
        const request = {
            methodname: 'local_edwiserpagebuilder_do_page_action',
            args: {
                action: "add_new_page_with_layoutid",
                config: JSON.stringify(config)
            },
        };
        return Ajax.call([request])[0];
    }

    /**
     * Publishes a custom page with the specified layout configuration.
     *
     * @param {number} id - The ID of the page to publish.
     * @returns {Promise<Object>} - The result of the AJAX call.
     */
    async function publish_custom_pages(id){
        const request = {
            methodname: 'local_edwiserpagebuilder_do_page_action',
            args: {
                action: 'publish_page_with_layouts',
                config: JSON.stringify({
                    "id": id
                })
            },
        };
        return Ajax.call([request])[0];
    }

    /**
     * Sets the page links in the footer of the theme.
     *
     * @param {Object} templatecontext - The context object containing the page link configuration.
     * @returns {Promise<Object>} - The result of the AJAX call.
     */
    async function set_pagelinks_in_footer(templatecontext){
        const request = {
            methodname: 'theme_remui_do_setup_action',
            args: {
                action: 'set_pagelinks_in_footer',
                config: JSON.stringify(templatecontext)
            },
        };
        return Ajax.call([request])[0];
    }
    // function create_demo_courses(){
    //     Ajax.call([{
    //         methodname: 'local_edwiserreports_create_demo_courses',
    //         args: {
    //             action: "create_demo_courses",
    //             config: JSON.stringify({})
    //         },
    //         done: function(response) {
    //             var data = JSON.parse(response);
    //             console.log(data);
    //         },
    //         fail: function(ex) {
    //             Notification.exception(ex);
    //         }
    //     }]);
    // }

    function close_current_window () {
        window.close();
    }

    function activate_remui() {
        Ajax.call([{
            methodname: 'theme_remui_do_setup_action',
            args: {
                action: "set_theme",
                config: JSON.stringify({})
            },
            done: function(response) {
                response = JSON.parse(response);

                if (response == 'success') {
                    window.location.reload();
                }
            },
            fail: function(ex) {
                Notification.exception(ex);
            }
        }]);
    }

    /**
     * Handles the continuation of the setup process for the RemUI theme.
     * This function is called when the user clicks the "Continue Setup" button on modal.
     */
    function continueSetupHandler() {
        Ajax.call([{
            methodname: 'theme_remui_do_setup_action',
            args: {
                action: "set_theme",
                config: JSON.stringify({})
            },
            done: function(response) {
                response = JSON.parse(response);

                if(response == 'success'){

                    $("body .setupwizard-modal").hide();
                    $("body .modal-backdrop").hide();
                    $("body .setupwizard-modal").remove();

                    var url =  M.cfg.wwwroot + '/theme/remui/setup.php';

                    window.open(url, '_blank');
                }
            },
            fail: function(ex) {
                Notification.exception(ex);
            }
        }]);
    }

    function skipSetupHanlder() {
        const request = {
            methodname: 'theme_remui_do_setup_action',
            args: {
                action: 'skipsetup_from_modal',
                config: JSON.stringify({})
            },
        };
        return Ajax.call([request])[0];
    }

    /**
     * Renders the setup wizard modal template and appends it to the body.
     *
     * @returns {Promise} A promise that resolves when the modal has been rendered and appended to the DOM.
     */
    function initSetupModal() {
        // Check if modal is already initialized
        if (modalInitialized) {
            return;
        }

        let templateName = 'theme_remui/setupwizard/setupwizard_modal';
        let isremui = M.cfg.theme === "remui";

        if($('.setupwizard-modal').length > 0){
            $('.setupwizard-modal').remove();
        }

        modalInitialized = true; // Set flag after initialization

        return Templates.render(templateName, {
            config: M.cfg,
            isremui: isremui
        }).done(function(html, js) {
            Templates.appendNodeContents($('body'), html, js);
        });
    }

    // *********COMMON EVENTS which is available on settings page during RemUI installation ***********
    const registerCommonEvents = (showmodal) =>{

        if (showmodal) {
            initSetupModal();
        }

        $(document).on("click", SELECTORS.NEXT_PAGE, nextPageHandler);

        $(document).off("click", SELECTORS.CONTINUESETUPBTN).on("click", SELECTORS.CONTINUESETUPBTN, function(){
            $(SELECTORS.SETUPWIZARD_MODAL).modal('hide');
            let $questioname = "setupmodal_continuesetupbtnstate_info";
            let $submittedata = {
                question: "User clicked on  the continue setup button",
                answer: "Yes",
            };
            feedbackcollection.submit_feedback($questioname,$submittedata);
            continueSetupHandler();
        });

        $(document).on("click", SELECTORS.SETUPWIZARD_MODAL + " .btn-close", function(){
            $(SELECTORS.SETUPWIZARD_MODAL).modal('hide');
            let $questioname = "setupmodal_close_info";
            let $submittedata = {
                question: "User closed the setup wizard modal",
                answer: "Yes",
            };
            feedbackcollection.submit_feedback($questioname,$submittedata);
            skipSetupHanlder();
        });

        $(document).on("click", "#remui-setup-checkbox", function(){
            if ($(this).is(":checked")) {
                $(SELECTORS.CONTINUESETUPBTN).removeClass("disabled");
            } else {
                $(SELECTORS.CONTINUESETUPBTN).addClass("disabled");
            }
        });

        $(document).on("keyup", SELECTORS.LICENSEKEYINPUT, function(){
            if($(this).val().length > 0) {
                $(SELECTORS.LICENSESUBMITBTN).removeClass("disabled");
            } else {
                $(SELECTORS.LICENSESUBMITBTN).addClass("disabled");
            }
        });

        $(document).on("click", SELECTORS.LICENSESUBMITBTN, function(){
            $(this).addClass("disabled");
            $(SELECTORS.LICENSEKEYINPUT).addClass("is-checking");
            licenseActivationHandler($(SELECTORS.LICENSEKEYINPUT).val(),"activate");
        });
        $(document).on("click", SELECTORS.RESUMESETUPBTN, function(e){
            e.preventDefault();

            let $questioname = "resume_setup_wizard";
            let $submittedata = {
                question: "User clicked on the resume setup button",
                answer: "Yes",
            };
            feedbackcollection.submit_feedback($questioname,$submittedata);
            if($(this).attr("data-action") == ""){
                initSetupModal();
            }else{
                var pageurl = $(this).attr("href");
                window.open(pageurl, '_blank');
            }
        });
        $(document).on("click", SELECTORS.SKIPSERVERCHECKBTN, function(e){
            let $questioname = "skip_server_check_info";
            let $submittedata = {
                question: "User skipped the server permission check step",
                answer: "Yes",
            };
            feedbackcollection.submit_feedback($questioname,$submittedata);
            window.location = M.cfg.wwwroot+ "/my/";
        });
    };

    function init(isremui = false) {
        $(document).ready(async function(){
            await get_setupwizard_context();

            fetchLanguages();

            if(isremui){
                initializeWizard();
            } else {
                add_activateremui_step();
            }

            registerCommonEvents(false);

            $(document).off('submit', SELECTORS.USERINFORMATION_FORM).on('submit', SELECTORS.USERINFORMATION_FORM, submitUserInformation);

            $(document).on('change', SELECTORS.USERINFORMATION_FORM + ' input[type="radio"]', checkAllQuestionsAnswered);

            $(document).on('input focus', SELECTORS.USERINFORMATION_FORM + ' input[type="text"]', checkCustomAnswerInput);

            $(document).on('click', SELECTORS.INSTALLABLE_PLUGINS_WRAPPER + ' .set-edwiserratingreview', set_ratingreview_to_allcourses);

            $(document).on('click', SELECTORS.RETRYYOURSETUPBTN, () => window.location.reload());

            $(document).on('submit', SELECTORS.SITESETUP_FEEDBACK, setup_sitesetup_feedback);

            $(document).on('click', SELECTORS.ACTIVATEREMUIBTN, activate_remui);

            $(document).on('click', SELECTORS.CLOSECURRENTWINDOW, close_current_window);

            window.addEventListener('beforeunload', function(e) {
                if ($(".installable-plugins-wrapper").lenght > 0) {
                    e.preventDefault();
                    return "";
                }
            });

        });
    }


    return {
        init: init,
        registerModalEvents: function(showmodal) {
            $(document).ready(async function(){
                registerCommonEvents(showmodal);
            });
        }
    };
});
