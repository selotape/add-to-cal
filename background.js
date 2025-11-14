// Import calendar utility functions
import { parseStructuredText, createGoogleCalendarUrl } from './calendarUtils.js';

// Create right-click context menu when extension is installed
// Only shows when text is selected on any webpage
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "create-calendar-event",
    title: "Create Calendar Event",
    contexts: ["selection"]
  });
});

// Handle context menu clicks and parse text directly
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "create-calendar-event") {
    const selectedText = info.selectionText;
    const eventData = parseStructuredText(selectedText);

    const calendarUrl = createGoogleCalendarUrl(eventData.title, eventData.startTime, eventData.endTime);
    chrome.tabs.create({ url: calendarUrl });
  }
});