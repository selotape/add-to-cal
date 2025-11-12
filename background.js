chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "create-calendar-event",
    title: "Create Calendar Event",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "create-calendar-event") {
    const selectedText = info.selectionText;

    chrome.tabs.sendMessage(tab.id, {
      action: "parseAndCreateEvent",
      text: selectedText
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openCalendar") {
    const { title, startTime, endTime } = message.eventData;

    const calendarUrl = createGoogleCalendarUrl(title, startTime, endTime);

    chrome.tabs.create({ url: calendarUrl });
  }
});

function createGoogleCalendarUrl(title, startTime, endTime) {
  const baseUrl = "https://calendar.google.com/calendar/render";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title || "Meeting",
    dates: formatDateTimeForCalendar(startTime, endTime)
  });

  return `${baseUrl}?${params.toString()}`;
}

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