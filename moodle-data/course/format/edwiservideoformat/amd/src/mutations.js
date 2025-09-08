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
 * Mutations for the Edwiser Video Format.
 *
 * @module     format_edwiservideoformat/mutations
 * @copyright  2024 Edwiser
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {getCurrentCourseEditor} from 'core_courseformat/courseeditor';
import DefaultMutations from 'core_courseformat/local/courseeditor/mutations';
import CourseActions from 'core_courseformat/local/content/actions';

export default class Component extends DefaultMutations {

    /**
     * Highlight sections.
     *
     * It is important to note this mutation method is declared as a class attribute,
     * See the class jsdoc for more details on why.
     *
     * @param {StateManager} stateManager the current state manager
     * @param {array} sectionIds the list of section ids
     */
    async highlightSection(stateManager, sectionIds) {
        const logEntry = this._getLoggerEntry(
            stateManager,
            'section_highlight',
            sectionIds,
            {component: 'format_edwiservideoformat'}
        );
        const course = stateManager.get('course');
        this.sectionLock(stateManager, sectionIds, true);
        const updates = await this._callEditWebservice('section_highlight', course.id, sectionIds);
        stateManager.processUpdates(updates);
        this.sectionLock(stateManager, sectionIds, false);
        stateManager.addLoggerEntry(await logEntry);
    }

    /**
     * Unhighlight sections.
     *
     * It is important to note this mutation method is declared as a class attribute,
     * See the class jsdoc for more details on why.
     *
     * @param {StateManager} stateManager the current state manager
     * @param {array} sectionIds the list of section ids
     */
    async unhighlightSection(stateManager, sectionIds) {
        const logEntry = this._getLoggerEntry(
            stateManager,
            'section_unhighlight',
            sectionIds,
            {component: 'format_edwiservideoformat'}
        );
        const course = stateManager.get('course');
        this.sectionLock(stateManager, sectionIds, true);
        const updates = await this._callEditWebservice('section_unhighlight', course.id, sectionIds);
        stateManager.processUpdates(updates);
        this.sectionLock(stateManager, sectionIds, false);
        stateManager.addLoggerEntry(await logEntry);
    }
}

export const init = () => {
    const courseEditor = getCurrentCourseEditor();
    // Some plugin (activity or block) may have their own mutations already registered.
    // This is why we use addMutations instead of setMutations here.
    courseEditor.addMutations(new Component());
    // Add direct mutation content actions.
    CourseActions.addActions({
        sectionHighlight: 'sectionHighlight',
        sectionUnhighlight: 'sectionUnhighlight',
    });
};
