/* eslint-disable no-undef*/
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
 * Typeform Handler functionality for Edwiser Video Format.
 *
 * @module     format_edwiservideoformat/typeform_handler
 * @copyright  Edwiser
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery'], function($) {

    const SELECTORS = {
        TYPEFORM_BUTTON: '.evf-typeform-init-button'
    };

    const CONFIG = {
        TRIGGER_TIME: 120000, // 2 minutes in milliseconds - MODIFY THIS VALUE
        CHECK_INTERVAL: 1000, // Check every 1 second
        STORAGE_KEY: 'typeform_timer_data'
    };

    // State variables
    let startTime = null;
    let timerInterval = null;
    let isTriggered = false;

    /**
     * Get stored timer data from localStorage
     * @returns {object|null} Stored timer data or null
     */
    const getStoredTimerData = () => {
        try {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            return null;
        }
    };

    /**
     * Store timer data to localStorage
     * @param {object} data Timer data to store
     */
    const storeTimerData = (data) => {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            // Silently fail if localStorage is not available
        }
    };

    /**
     * Clear stored timer data
     */
    const clearStoredTimerData = () => {
        try {
            localStorage.removeItem(CONFIG.STORAGE_KEY);
        } catch (error) {
            // Silently fail if localStorage is not available
        }
    };

    /**
     * Initialize timer with stored data or new start time
     */
    const initializeTimer = () => {
        const storedData = getStoredTimerData();

        if (storedData && !storedData.isTriggered) {
            // Resume from stored time
            startTime = storedData.startTime;
            isTriggered = storedData.isTriggered;
        } else {
            // Start fresh timer
            startTime = Date.now();
            isTriggered = false;
        }

        // Store initial data
        storeTimerData({
            startTime: startTime,
            isTriggered: isTriggered
        });
    };

    /**
     * Start the timer
     */
    const startTimer = () => {
        timerInterval = setInterval(() => {
            checkTime();
        }, CONFIG.CHECK_INTERVAL);
    };

    /**
     * Check if enough time has passed
     */
    const checkTime = () => {
        if (isTriggered) {
            return; // Already triggered
        }

        const currentTime = Date.now();
        const timeSpent = currentTime - startTime;

        // Update stored data
        storeTimerData({
            startTime: startTime,
            isTriggered: isTriggered
        });

        // Check if enough time has passed
        if (timeSpent >= CONFIG.TRIGGER_TIME) {
            triggerTypeform();
        }
    };

    /**
     * Trigger the typeform
     */
    const triggerTypeform = () => {
        isTriggered = true;

        // Update stored data
        storeTimerData({
            startTime: startTime,
            isTriggered: isTriggered
        });

        // Find the typeform button
        const typeformButton = $(SELECTORS.TYPEFORM_BUTTON);

        if (typeformButton.length > 0) {
            // Trigger click on the typeform button
            typeformButton.trigger('click');

            // Stop the timer
            stopTimer();
        }
    };

    /**
     * Stop the timer
     */
    const stopTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    };

    /**
     * Get current time spent
     * @returns {number} Time spent in milliseconds
     */
    const getTimeSpent = () => {
        return Date.now() - startTime;
    };

    /**
     * Reset the timer (for testing or manual reset)
     */
    const resetTimer = () => {
        stopTimer();
        clearStoredTimerData();
        startTime = Date.now();
        isTriggered = false;
        storeTimerData({
            startTime: startTime,
            isTriggered: isTriggered
        });
        startTimer();
    };

    /**
     * Init method
     */
    function init() {
        $(document).ready(function() {
            initializeTimer();
            startTimer();
        });
    }


    // Must return the init function.
    return {
        init: init,
        getTimeSpent: getTimeSpent,
        resetTimer: resetTimer,
        trigger: triggerTypeform
    };
});