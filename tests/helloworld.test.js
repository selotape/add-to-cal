// Unit tests for Chrome extension calendar functionality

// Import functions from calendarUtils.js
import {
  parseStructuredText,
  createGoogleCalendarUrl,
  formatDateTimeForCalendar
} from '../calendarUtils.js';

describe('Chrome Extension Calendar Tests', () => {
  test('should verify Chrome API mocks exist', () => {
    expect(chrome).toBeDefined();
    expect(chrome.contextMenus).toBeDefined();
    expect(chrome.tabs).toBeDefined();
  });

  describe('parseStructuredText', () => {
    test('should parse valid structured text with title, date, and time', () => {
      const text = 'Title: Team Meeting\nDate: 12/25/2024\nTime: 14:30';
      const result = parseStructuredText(text);

      expect(result.title).toBe('Team Meeting');
      expect(result.startTime).toBeInstanceOf(Date);
      expect(result.endTime).toBe(null);
    });

    test('should use default title when no title provided', () => {
      const text = 'Date: 12/25/2024\nTime: 14:30';
      const result = parseStructuredText(text);

      expect(result.title).toBe('Meeting');
    });

    test('should handle missing date and time', () => {
      const text = 'Title: Important Event';
      const result = parseStructuredText(text);

      expect(result.title).toBe('Important Event');
      expect(result.startTime).toBe(null);
    });
  });

  describe('formatDateTimeForCalendar', () => {
    test('should format start time with 1-hour default duration', () => {
      const startTime = new Date('2024-12-25T14:30:00Z');
      const result = formatDateTimeForCalendar(startTime, null);

      expect(result).toContain('20241225T143000Z/');
      expect(result).toContain('20241225T153000Z');
    });

    test('should format both start and end times when provided', () => {
      const startTime = new Date('2024-12-25T14:30:00Z');
      const endTime = new Date('2024-12-25T16:00:00Z');
      const result = formatDateTimeForCalendar(startTime, endTime);

      expect(result).toBe('20241225T143000Z/20241225T160000Z');
    });

    test('should return empty string when no times provided', () => {
      const result = formatDateTimeForCalendar(null, null);

      expect(result).toBe('');
    });
  });

  describe('createGoogleCalendarUrl', () => {
    test('should create valid Google Calendar URL with all parameters', () => {
      const title = 'Team Meeting';
      const startTime = new Date('2024-12-25T14:30:00Z');
      const endTime = null;

      const result = createGoogleCalendarUrl(title, startTime, endTime);

      expect(result).toContain('https://calendar.google.com/calendar/render');
      expect(result).toContain('action=TEMPLATE');
      expect(result).toContain('text=Team+Meeting');
      expect(result).toContain('dates=');
    });

    test('should use default title when none provided', () => {
      const startTime = new Date('2024-12-25T14:30:00Z');

      const result = createGoogleCalendarUrl(null, startTime, null);

      expect(result).toContain('text=Meeting');
    });
  });
});
