<?php  // Moodle configuration file

unset($CFG);
global $CFG;
$CFG = new stdClass();

// Environment-based configuration
$CFG->dbtype    = 'mariadb';
$CFG->dblibrary = 'native';
$CFG->dbhost    = getenv('DB_HOST') ?: 'db';
$CFG->dbname    = getenv('DB_NAME') ?: 'moodle';
$CFG->dbuser    = getenv('DB_USER') ?: 'moodleuser';
$CFG->dbpass    = getenv('DB_PASS') ?: 'moodle_password_123';
$CFG->prefix    = 'mdl_';
$CFG->dboptions = array (
  'dbpersist' => 0,
  'dbport' => '',
  'dbsocket' => '',
  'dbcollation' => 'utf8mb4_unicode_ci',
);

// Use environment variable for URL
$CFG->wwwroot   = getenv('MOODLE_URL') ?: 'http://localhost';
$CFG->dataroot  = getenv('MOODLE_DATAROOT') ?: '/var/www/moodledata';
$CFG->admin     = 'admin';

$CFG->directorypermissions = 0777;
$CFG->slasharguments = false;

require_once(__DIR__ . '/lib/setup.php');

// There is no php closing tag in this file,
// it is intentional because it prevents trailing whitespace problems!
