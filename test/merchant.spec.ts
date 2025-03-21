import { describe, expect, test } from "vitest";
import { Merchant, Profession } from "../src/merchant"; // Ajusta la ruta según tu estructura de proyecto

describe("Merchant class", () => {
  test("should create a Merchant instance correctly", () => {
    const merchant = new Merchant("M-001", "Hattori", "Blacksmith", "Novigrad");
    expect(merchant.id).toBe("M-001");
    expect(merchant.name).toBe("Hattori");
    expect(merchant.profession).toBe("Blacksmith");
    expect(merchant.location).toBe("Novigrad");
  });

  test("should allow modifying properties using setters", () => {
    const merchant = new Merchant("M-002", "Keira", "Alchemist", "Velen");
    merchant.id = "M-003";
    merchant.name = "Ramis";
    merchant.profession = "General Merchant";
    merchant.location = "Oxenfurt";
    
    expect(merchant.id).toBe("M-003");
    expect(merchant.name).toBe("Ramis");
    expect(merchant.profession).toBe("General Merchant");
    expect(merchant.location).toBe("Oxenfurt");
  });

  test("should create a Merchant using static method with prefixed ID", () => {
    const merchant = Merchant.createMerchant(10, "Otto", "Butcher", "Novigrad");
    expect(merchant.id).toBe("M-10");
    expect(merchant.name).toBe("Otto");
    expect(merchant.profession).toBe("Butcher");
    expect(merchant.location).toBe("Novigrad");
  });

  test("should maintain unique ID format when creating new merchants", () => {
    const merchant1 = Merchant.createMerchant(20, "Fergus", "Blacksmith", "Velen");
    const merchant2 = Merchant.createMerchant(21, "Rissa", "Druid", "Skellige");
    
    expect(merchant1.id).toBe("M-20");
    expect(merchant2.id).toBe("M-21");
  });

  test("should not allow empty id", () => {
    expect(() => new Merchant("", "Bruno", "Smuggler", "Toussaint")).toThrow();
  });

  test("should not allow empty name", () => {
    expect(() => new Merchant("M-004", "", "Druid", "Kaer Morhen")).toThrow();
  });

  test("should not allow empty location", () => {
    expect(() => new Merchant("M-005", "Zed", "General Merchant", "")).toThrow();
  });

  test("should correctly return properties using getters", () => {
    const merchant = new Merchant("M-006", "Kurt", "Smuggler", "Cintra");
    expect(merchant.id).toBe("M-006");
    expect(merchant.name).toBe("Kurt");
    expect(merchant.profession).toBe("Smuggler");
    expect(merchant.location).toBe("Cintra");
  });
});
