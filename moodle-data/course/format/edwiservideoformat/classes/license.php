<?php
// This file is part of Edwiser Video Format Moodle Course Format Plugin.
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
 * License management page
 *
 * @package   format_edwiservideoformat
 * @copyright Copyright (c) 2024 WisdmLabs. (http://www.wisdmlabs.com)
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once('../../../../config.php');
require_once($CFG->libdir . '/adminlib.php');
require_once('license_controller.php');

global $PAGE, $CFG, $OUTPUT, $DB;
admin_externalpage_setup('format_edwiservideoformat_licensestatus');

$systemcontext = context_system::instance();
$PAGE->set_context($systemcontext);
$PAGE->set_pagelayout('admin');
$title = get_string('licensestatus', 'format_edwiservideoformat');
$PAGE->set_title($title);
$PAGE->set_heading(get_string('licensestatus', 'format_edwiservideoformat'));
$PAGE->set_url($CFG->wwwroot."/course/format/edwiservideoformat/classes/license.php");

if (!is_siteadmin()) {
    return false;
}

ob_start();
$pluginslug = 'edwiser-video-course-format';
$lcontroller = new \format_edwiservideoformat\edwiservideoformat_license_controller();
$lcontroller->add_data();
$licensekey = $DB->get_field_select(
    'config_plugins',
    'value',
    'name = :name',
    array('name' => 'edd_' . $pluginslug .'_license_key'),
    IGNORE_MISSING
);

// Get License Status.
$lastaction = optional_param('lastaction',  false,  PARAM_ALPHA);
$status = $DB->get_field_select(
    'config_plugins',
    'value',
    'name = :name',
    array('name' => 'edd_' . $pluginslug . '_license_status'),
    IGNORE_MISSING
);

// Get renew link.
$renewlink = $DB->get_field_select(
    'config_plugins',
    'value',
    'name = :name',
    array('name' => 'wdm_'.$pluginslug.'_product_site'),
    IGNORE_MISSING
);

$cfglicensekey = get_config('format_edwiservideoformat', 'licensekey');
$licensekeyactivate = get_config('format_edwiservideoformat', 'licensekeyactivate');
$licensekeydeactivate = get_config('format_edwiservideoformat', 'licensekeydeactivate');

// Show proper reponse to user on license activation/deactivation.
if ($cfglicensekey == 'empty') {
    // If empty, show error message.
    echo '<div class="alert alert-danger">
       <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
       <h4><i class="icon fa fa-ban"></i> Error</h4>'.get_string("enterlicensekey", "format_edwiservideoformat").'
    </div>';
}
if ($lastaction !== false && $lastaction == 'valid' && optional_param('licensekeyactivate',  false,  PARAM_ALPHA) != false) {
    // Valid license key.
    echo '<div class="alert alert-success">
       <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
       <h4><i class="icon fa fa-check"></i> Success</h4>'.get_string("licensekeyactivated", "format_edwiservideoformat").'
    </div>';
} else if ($lastaction !== false && $lastaction == 'expired') {
    // Expired license key.
    echo '<div class="alert alert-danger">
   <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
   <h4><i class="icon fa fa-ban"></i> Alert!</h4>'.get_string("licensekeyhasexpired", "format_edwiservideoformat").'
</div>';
} else if ($lastaction !== false && $lastaction == 'disabled') {
    // Disabled license key.
        echo '<div class="alert alert-danger">
           <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
           <h4><i class="icon fa fa-ban"></i> Alert!</h4>'.get_string("licensekeyisdisabled", "format_edwiservideoformat").'
        </div>';
} else if ($lastaction == 'invalid') {
    // Invalid license key.
    echo '<div class="alert alert-danger">
   <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
   <h4><i class="icon fa fa-ban"></i> Alert!</h4>'.get_string("entervalidlicensekey", "format_edwiservideoformat").'
</div>';
} else if ($lastaction == 'site_inactive') {
    // Site is inactive.
    echo '<div class="alert alert-danger">
          <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
          <h4><i class="icon fa fa-ban"></i> Alert!</h4>'.get_string("siteinactive", "format_edwiservideoformat").'
        </div>';
} else if ($lastaction == 'deactivated') {
    // Site is inactive.
        echo '<div class="alert alert-danger">
   <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
   <h4><i class="icon fa fa-ban"></i> Alert!</h4>'.get_string("licensekeydeactivated", "format_edwiservideoformat").'
   </div>';
} else if ($lastaction == 'no_response' ||
    (optional_param('licensekeydeactivate',  false,  PARAM_ALPHA) != false && $lastaction == 'valid')
) {
    // Site is inactive.
    echo '<div class="alert alert-danger">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <h4><i class="icon fa fa-ban"></i> Alert!</h4>'.get_string("noresponsereceived", "format_edwiservideoformat").'
        </div>';
}

// Remove config vars.
unset_config('licensekey', 'format_edwiservideoformat');
unset_config('licensekeyactivate', 'format_edwiservideoformat');
unset_config('licensekeydeactivate', 'format_edwiservideoformat');
?>
<form method="POST">
    <div class="license-box box box-warning">
        <input type="hidden" name="sesskey" value="<?php echo sesskey(); ?>">
        <div class="box-header with-border">
          <h3 class="box-title"><?php echo get_string('edwiservideoformatlicenseactivation', 'format_edwiservideoformat') ?></h3>
        </div>

        <!-- /.box-header -->
        <div class="panel-body">
            <input type="hidden" name="activetab" value="format_edwiservideoformat_license_status">
            <?php
            if ($status == "valid") {
                ?>
                <div class="form-group has-success">
                    <label class="control-label text-black col-sm-3">
                        <?php echo get_string('licensekey', 'format_edwiservideoformat') ?>:</label>
                    <div class="col-sm-9">
                    <?php echo "<input id='edd_{$pluginslug}_license_key'
                    class='form-control' name='edd_{$pluginslug}_license_key'
                    type='text' class='regular-text' value='{$licensekey}'
                    placeholder='Enter license key...' readonly/>";
                    ?>
                    </div>
                </div>
            <?php
            } else if ($status == "expired") {
                ?>
                <div class="form-group has-error">
                    <label class="control-label text-black col-sm-3">
                        <?php echo get_string('licensekey', 'format_edwiservideoformat') ?>
                    :</label>
                    <div class="col-sm-9">
                    <?php echo "<input id='edd_{$pluginslug}_license_key'
                    class='form-control' name='edd_{$pluginslug}_license_key'
                    type='text' class='regular-text' value='{$licensekey}'
                    placeholder='Enter license key...' readonly/>";
                    ?>
                    </div>
                </div>
            <?php
            } else {
                ?>
                <div class="form-group has-error">
                    <label class="control-label text-black col-sm-3">
                        <?php echo get_string('licensekey', 'format_edwiservideoformat') ?>
                    :</label>
                    <div class="col-sm-9">
                    <?php echo "<input id='edd_{$pluginslug}_license_key'
                    class='form-control'  name='edd_{$pluginslug}_license_key'
                    type='text' class='regular-text' value='{$licensekey}'
                    placeholder='Enter license key...' />";
                    ?>
                    </div>
                </div>
            <?php
            } ?>
            <div class="form-group">
                <?php
                    echo '<label class="control-label col-sm-3">'.get_string('licensestatus', 'format_edwiservideoformat').':</label>';
                    echo '<div class="col-sm-9">';
                    $statustextactive = get_string('active', 'format_edwiservideoformat');
                    $statustextactivetext = "<p style='color:green;'>{$statustextactive}</p>";
                    $statustextinactive = get_string('notactive', 'format_edwiservideoformat');
                    $statustextinactivetext = "<p style='color:red;'>{$statustextinactive}</p>";
                    $statustextexpired = get_string('expired', 'format_edwiservideoformat');
                    $statustextexpiredtext = "<p style='color:red;'>{$statustextexpired}</p>";
                if ($status !== false && $status == 'valid') {
                    echo $statustextactivetext;
                } else if ($status == 'site_inactive') {
                    echo $statustextinactivetext;
                } else if ($status == 'expired') {
                    echo $statustextexpiredtext;
                } else if ($status == 'invalid') {
                    echo $statustextinactivetext;
                } else {
                    echo $statustextinactivetext;
                }
                    echo '</div>';
                ?>
            </div>
            <div class="form-group">
                <?php
                    $activatelicensetext = get_string('activatelicense', 'format_edwiservideoformat');
                    $deactivatelicensetext = get_string('deactivatelicense', 'format_edwiservideoformat');
                    $renewlicensetext = get_string('renewlicense', 'format_edwiservideoformat');
                    echo '<div class="col-sm-9">';
                    // Hidden field to cehck if on license tab.
                    echo "<input type='hidden' id='onEdwiserVideoFormatLicensePage' name='onEdwiserVideoFormatLicensePage' value='1'/>";
                if ($status !== false && $status == 'valid') {
                    echo "<input type='submit' class='btn btn-primary text-white'
                     style='color:white;' name='edd_{$pluginslug}_license_deactivate' value='{$deactivatelicensetext}'/>";
                } else if ($status == 'expired') {
                    echo "<input type='submit' class='btn btn-primary'
                    style='color:white;' name='edd_{$pluginslug}_license_deactivate' value='{$deactivatelicensetext}'/>&nbsp&nbsp";
                    echo '<input type="button" class="btn btn-primary"
                    style="color:white;" name="edd_'.$pluginslug.'_license_renew"
                    value="'.$renewlicensetext.'" onclick="window.open(\''.$renewlink.'\');">';
                } else {
                    echo "<input type='submit' class='btn btn-primary'
                    style='color:white;' name='edd_{$pluginslug}_license_activate'
                    value='{$activatelicensetext}'/>";
                }
                echo '</div>';
                ?>
            </div>
        </div>
        <!-- /.box-body -->
    </div>
</form>
<?php
$out = ob_get_clean();
if (isset($_POST['onEdwiserVideoFormatLicensePage']) && $_POST['onEdwiserVideoFormatLicensePage']) {
    $url = new moodle_url('/course/format/edwiservideoformat/classes/license.php', array('lastaction' => $status,
        'licensekeyactivate' => $licensekeyactivate,
        'licensekeydeactivate' => $licensekeydeactivate)
        );
    redirect($url->out());
}
echo $OUTPUT->header();
?>
<style>
/* Override deprecated form-group styles in Moodle 5.0 */
.form-group::before {
    content: none !important;

}
/* Remove the deprecated warning styles */
body.themedesignermode .form-group, body.themedesignermode.form-group {
    outline: unset !important;
    background-color: unset !important;
}
/* Remove the deprecated warning styles */
.form-group::before,
.form-group::after {
    content: none !important;
    display: none !important;
}
</style>
<?php
echo $out;
echo $OUTPUT->footer();
