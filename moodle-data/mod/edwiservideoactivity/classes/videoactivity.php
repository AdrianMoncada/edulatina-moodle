<?php

namespace mod_edwiservideoactivity;

defined('MOODLE_INTERNAL') || die();

/**
 * Class representing a single Edwiser Video Activity.
 */
class videoactivity
{

    /** @var int Activity ID */
    private int $id;

    /** @var int Course module ID */
    private int $cmid;

    /** @var \stdClass Activity DB record */
    private \stdClass $record;

    /**
     * Constructor.
     *
     * @param int $id ID from edwiservideoactivity table.
     * @throws \dml_exception
     */
    public function __construct(int $id)
    {
        global $DB;

        $this->id     = $id;
        $this->record = $DB->get_record('edwiservideoactivity', ['id' => $id], '*', MUST_EXIST);

        // Fetch course module ID using cm_info.
        $cm         = get_coursemodule_from_instance('edwiservideoactivity', $id, $this->record->course, false, MUST_EXIST);
        $this->cmid = $cm->id;
    }

    public function get_record(): \stdClass
    {
        return $this->record;
    }

    public function get_name(): string
    {
        return $this->record->name;
    }

    public function get_media_data(): array
    {
        return [
            'sourcetype' => $this->record->sourcetype,
            'sourcepath' => $this->record->sourcepath,
        ];
    }

    public function get_overview_data(): array
    {
        return [
            'intro'       => $this->record->intro,
            'introformat' => $this->record->introformat,
        ];
    }

    public function has_resources(): bool
    {
        return (bool) $this->record->hasresources;
    }

    public function has_transcript(): bool
    {
        return (bool) $this->record->hastranscript;
    }

    public function get_timestamps(): array
    {
        return [
            'created'  => $this->record->timecreated,
            'modified' => $this->record->timemodified,
        ];
    }

    /**
     * Get context data for rendering resources (multiple files).
     *
     * @return array
     */
    public function get_resource_context(): array
    {
        global $OUTPUT;
        $context = \context_module::instance($this->cmid);
        $fs      = get_file_storage();

        $files     = $fs->get_area_files($context->id, 'mod_edwiservideoactivity', 'resources', 0, 'itemid, filepath, filename', false);
        $resources = [];

        foreach ($files as $file) {
            if (! $file->is_directory()) {
                $url = \moodle_url::make_pluginfile_url(
                    $file->get_contextid(),
                    $file->get_component(),
                    $file->get_filearea(),
                    $file->get_itemid(),
                    $file->get_filepath(),
                    $file->get_filename()
                );

                $resources[] = [
                    'url'          => $url->out(),
                    'filename'     => $file->get_filename(),
                    'filesize'     => display_size($file->get_filesize()),
                    'mimetype'     => $file->get_mimetype(),
                    'timemodified' => userdate($file->get_timemodified()),
                    'icon'         => $OUTPUT->image_url(file_file_icon([
                        'filename' => $file->get_filename(),
                        'mimetype' => $file->get_mimetype(),
                    ]))->out(),
                    'downloadurl' => $url->out(false)
                ];
            }
        }

        return ['resources' => $resources];
    }

    /**
     * Get context data for rendering transcript (single file).
     *
     * @return array|null
     */
    public function get_transcript_context(): ?array
    {
        global $OUTPUT;
        $context = \context_module::instance($this->cmid);
        $fs      = get_file_storage();

        $files = $fs->get_area_files($context->id, 'mod_edwiservideoactivity', 'transcript', 0, 'itemid, filepath, filename', false);

        foreach ($files as $file) {
            if (! $file->is_directory()) {
                $url = \moodle_url::make_pluginfile_url(
                    $file->get_contextid(),
                    $file->get_component(),
                    $file->get_filearea(),
                    $file->get_itemid(),
                    $file->get_filepath(),
                    $file->get_filename()
                );

                return [
                    'transcript' => [
                        'url'          => $url->out(),
                        'filename'     => $file->get_filename(),
                        'filesize'     => display_size($file->get_filesize()),
                        'mimetype'     => $file->get_mimetype(),
                        'timemodified' => userdate($file->get_timemodified()),
                        'content'      => $file->get_content(),
                        'icon'         => $OUTPUT->image_url(file_file_icon([
                            'filename' => $file->get_filename(),
                            'mimetype' => $file->get_mimetype(),
                        ]))->out(),
                    ],
                ];
            }
        }

        return null;
    }

}
