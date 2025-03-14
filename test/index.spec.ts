import { describe, expect, test } from "vitest";
import { print } from "../src/index";

describe("print function tests", () => {
  test("should return Hello World!", () => {
    expect(print("Hello World!")).toBe("Hello World!");
  });
});
