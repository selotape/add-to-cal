chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "parseAndCreateEvent") {
    const eventData = parseStructuredText(message.text);

    chrome.runtime.sendMessage({
      action: "openCalendar",
      eventData: eventData
    });
  }
});

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