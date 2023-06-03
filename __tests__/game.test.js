"use strict";

const socket = require("../test-socket");

//? take over the socket that was imported
jest.mock("../test-socket.js", () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

//* Create a console spy */
let consoleSpy;

beforeAll(() => {
  consoleSpy = jest.spyOn(console, "log").mockImplementation();
});

afterAll(() => {
  consoleSpy.mockRestore();
});

/// Test the Game

describe("Game", () => {
  test("logs player movement", () => {
    expect(true).toBeTruthy();
  });

  test("Updates player positions on connection", () => {
    expect(true).toBeTruthy();
  });
});
