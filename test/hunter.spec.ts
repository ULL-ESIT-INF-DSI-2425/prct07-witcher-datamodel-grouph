import { describe, expect, test } from "vitest";
import { Hunter, Race } from "../src/hunter";

describe("Hunter class", () => {
  test("should create a Hunter instance correctly", () => {
    const hunter = new Hunter(
      "H-001",
      "Geralt of Rivia",
      "Human",
      "Kaer Morhen",
    );
    expect(hunter.id).toBe("H-001");
    expect(hunter.name).toBe("Geralt of Rivia");
    expect(hunter.race).toBe("Human");
    expect(hunter.location).toBe("Kaer Morhen");
  });

  test("should create a Hunter instance with a prefixed ID", () => {
    const hunter = Hunter.createHunter(
      1,
      "Geralt of Rivia",
      "Human",
      "Kaer Morhen",
    );
    expect(hunter.id).toBe("H-1");
    expect(hunter.name).toBe("Geralt of Rivia");
    expect(hunter.race).toBe("Human");
    expect(hunter.location).toBe("Kaer Morhen");
  });

  test("should allow modifying properties using setters", () => {
    const hunter = new Hunter("H-002", "Yennefer", "Elf", "Vengerberg");
    hunter.id = "H-003";
    hunter.name = "Ciri";
    hunter.race = "Half-Elf";
    hunter.location = "Novigrad";

    expect(hunter.id).toBe("H-003");
    expect(hunter.name).toBe("Ciri");
    expect(hunter.race).toBe("Half-Elf");
    expect(hunter.location).toBe("Novigrad");
  });

  test("should create a Hunter using static method with prefixed ID", () => {
    const hunter = Hunter.createHunter(10, "Lambert", "Dwarf", "Kaedwen");
    expect(hunter.id).toBe("H-10");
    expect(hunter.name).toBe("Lambert");
    expect(hunter.race).toBe("Dwarf");
    expect(hunter.location).toBe("Kaedwen");
  });

  test("should not allow setting invalid race", () => {
    const hunter = new Hunter("H-004", "Eskel", "Human", "Kaer Morhen");

    expect(() => {
      // @ts-expect-error: Testing invalid type
      hunter.race = "Dragon";
    }).toThrow();
  });

  test("should maintain unique ID format when creating new hunters", () => {
    const hunter1 = Hunter.createHunter(
      20,
      "Vesemir",
      "Lycanthropic",
      "Kaer Morhen",
    );
    const hunter2 = Hunter.createHunter(21, "Ciri", "Half-Elf", "Cintra");

    expect(hunter1.id).toBe("H-20");
    expect(hunter2.id).toBe("H-21");
  });

  test("should correctly update location independently", () => {
    const hunter = new Hunter("H-005", "Regis", "Spectral Cat", "Toussaint");
    hunter.location = "Beauclair";

    expect(hunter.location).toBe("Beauclair");
  });

  test("should not allow empty id", () => {
    expect(() => new Hunter("", "Letho", "Vran", "Nilfgaard")).toThrow();
  });

  test("should not allow empty name", () => {
    expect(() => new Hunter("H-006", "", "Dryad", "Brokilon")).toThrow();
  });

  test("should not allow empty location", () => {
    expect(() => new Hunter("H-007", "Iorveth", "Elf", "")).toThrow();
  });

  test("should correctly return properties using getters", () => {
    const hunter = new Hunter("H-008", "Serrit", "Warlock", "Redania");
    expect(hunter.id).toBe("H-008");
    expect(hunter.name).toBe("Serrit");
    expect(hunter.race).toBe("Warlock");
    expect(hunter.location).toBe("Redania");
  });
});
