// Create right-click context menu when extension is installed
// Only shows when text is selected on any webpage
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "create-calendar-event",
    title: "Create Calendar Event",
    contexts: ["selection"]
  });
});

// Handle context menu clicks and send selected text to content script for parsing
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "create-calendar-event") {
    const selectedText = info.selectionText;

    chrome.tabs.sendMessage(tab.id, {
      action: "parseAndCreateEvent",
      text: selectedText
    });
  }
});

// Receive parsed event data from content script and open Google Calendar
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openCalendar") {
    const { title, startTime, endTime } = message.eventData;

    const calendarUrl = createGoogleCalendarUrl(title, startTime, endTime);

    chrome.tabs.create({ url: calendarUrl });
  }
});

// Build Google Calendar URL with event details
function createGoogleCalendarUrl(title, startTime, endTime) {
  const baseUrl = "https://calendar.google.com/calendar/render";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title || "Meeting",
    dates: formatDateTimeForCalendar(startTime, endTime)
  });

  return `${baseUrl}?${params.toString()}`;
}

// Convert JavaScript dates to Google Calendar format (YYYYMMDDTHHMMSSZ)
// Defaults to 1-hour duration if no end time provided
function formatDateTimeForCalendar(startTime, endTime) {
  const start = startTime ? new Date(startTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '';
  const end = endTime ? new Date(endTime).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '';

  if (start && end) {
    return `${start}/${end}`;
  } else if (start) {
    const defaultEnd = new Date(new Date(startTime).getTime() + 60 * 60 * 1000);
    const endFormatted = defaultEnd.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    return `${start}/${endFormatted}`;
  }

  return '';
}