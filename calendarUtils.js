// Pure utility functions for calendar event parsing and URL generation

// Parse selected text to extract meeting details
function parseStructuredText(text) {
  const titleMatch = text.match(/title:\s*([^\n\r]+)/i);
  const dateMatch = text.match(/date:\s*(\d{1,2}\/\d{1,2}\/\d{4})/i);
  const timeMatch = text.match(/time:\s*(\d{1,2}:\d{2})/i);

  const title = titleMatch ? titleMatch[1].trim() : 'Meeting';
  const date = dateMatch ? dateMatch[1] : null;
  const time = timeMatch ? timeMatch[1] : null;

  let startTime = null;
  if (date && time) {
    startTime = new Date(`${date} ${time}`);
  }

  return {
    title,
    startTime,
    endTime: null
  };
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

// Export functions (works for both CommonJS/Jest and as fallback)
export { parseStructuredText, createGoogleCalendarUrl, formatDateTimeForCalendar };
