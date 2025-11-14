# Add to Cal - Chrome Extension

A Chrome extension that creates Google Calendar events from selected text.

## Features

- Right-click on selected text to create a calendar event
- Automatically parses structured text to extract event details
- Opens Google Calendar with pre-filled event information

## Installation

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

Select text in the following format, right-click, and choose "Add to Calendar":

```
Title: Team Meeting
Date: 12/25/2024
Time: 14:30
```

You can also try these example texts:

```
Title: Project Review
Date: 1/15/2025
Time: 10:00
```

```
Title: Lunch with Client
Date: 3/20/2025
Time: 12:30
```

The extension will:
- Extract the title, date, and time from the selected text
- Create a 1-hour event starting at the specified time
- Open Google Calendar with the event details pre-filled

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Format Requirements

- **Title**: `Title: <event name>` (case-insensitive)
- **Date**: `Date: MM/DD/YYYY` format
- **Time**: `Time: HH:MM` format (24-hour)

If no title is provided, defaults to "Meeting".
