// Jest setup file for Chrome extension testing
// Mocks Chrome APIs to allow testing extension code in Node environment

import { jest } from '@jest/globals';

// Mock chrome API object
global.chrome = {
  contextMenus: {
    create: jest.fn(),
    onClicked: {
      addListener: jest.fn()
    }
  },
  tabs: {
    create: jest.fn()
  },
  runtime: {
    onInstalled: {
      addListener: jest.fn()
    }
  }
};
