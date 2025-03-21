import { describe, expect, test } from "vitest";
import { Armor, Weapon, Potion, ArmorMaterial, WeaponMaterial, PotionMaterial, Effect } from "../src/item"; // Ajusta la ruta según tu estructura de proyecto

describe("Armor class", () => {
  test("should create an Armor instance correctly", () => {
    const armor = new Armor("A-001", "Dragon Scale Armor", "Strong and durable", "Dragon Scales", 15, 500);
    expect(armor.id).toBe("A-001");
    expect(armor.name).toBe("Dragon Scale Armor");
    expect(armor.description).toBe("Strong and durable");
    expect(armor.material).toBe("Dragon Scales");
    expect(armor.weight).toBe(15);
    expect(armor.price).toBe(500);
  });

  test("should update Armor properties correctly", () => {
    const armor = new Armor("A-002", "Leather Armor", "Light and flexible", "Leather", 5, 100);
    armor.name = "Reinforced Leather Armor";
    armor.material = "Hardened Leather";
    armor.weight = 7;
    armor.price = 150;
    expect(armor.name).toBe("Reinforced Leather Armor");
    expect(armor.material).toBe("Hardened Leather");
    expect(armor.weight).toBe(7);
    expect(armor.price).toBe(150);
  });

  test("should not allow negative weight", () => {
    expect(() => new Armor("A-003", "Cursed Armor", "Very heavy", "Steel Mesh", -5, 200)).toThrow();
  });
});

describe("Weapon class", () => {
  test("should create a Weapon instance correctly", () => {
    const weapon = new Weapon("W-001", "Silver Sword", "Effective against monsters", "Silver", 8, 300);
    expect(weapon.id).toBe("W-001");
    expect(weapon.name).toBe("Silver Sword");
    expect(weapon.description).toBe("Effective against monsters");
    expect(weapon.material).toBe("Silver");
    expect(weapon.weight).toBe(8);
    expect(weapon.price).toBe(300);
  });

  test("should update Weapon properties correctly", () => {
    const weapon = new Weapon("W-002", "Steel Dagger", "Small but deadly", "Steel", 3, 80);
    weapon.name = "Elven Steel Dagger";
    weapon.material = "Elven Steel";
    weapon.weight = 2.5;
    weapon.price = 120;
    expect(weapon.name).toBe("Elven Steel Dagger");
    expect(weapon.material).toBe("Elven Steel");
    expect(weapon.weight).toBe(2.5);
    expect(weapon.price).toBe(120);
  });

  test("should not allow zero price", () => {
    expect(() => new Weapon("W-003", "Rusty Sword", "Barely usable", "Steel", 4, 0)).toThrow();
  });
});

describe("Potion class", () => {
  test("should create a Potion instance correctly", () => {
    const potion = new Potion("P-001", "Swallow", "Restores vitality", "Celandine Flower", 0.5, 50, "Vitality Regeneration");
    expect(potion.id).toBe("P-001");
    expect(potion.name).toBe("Swallow");
    expect(potion.description).toBe("Restores vitality");
    expect(potion.material).toBe("Celandine Flower");
    expect(potion.weight).toBe(0.5);
    expect(potion.price).toBe(50);
    expect(potion.effect).toBe("Vitality Regeneration");
  });

  test("should update Potion properties correctly", () => {
    const potion = new Potion("P-002", "Cat", "Enhances night vision", "Mandrake", 0.3, 40, "Night Vision");
    potion.name = "Enhanced Cat";
    potion.material = "Vervain";
    potion.weight = 0.4;
    potion.price = 60;
    potion.effect = "Invisible Creature Detection";
    expect(potion.name).toBe("Enhanced Cat");
    expect(potion.material).toBe("Vervain");
    expect(potion.weight).toBe(0.4);
    expect(potion.price).toBe(60);
    expect(potion.effect).toBe("Invisible Creature Detection");
  });

  test("should not allow invalid effect", () => {
    expect(() => new Potion("P-003", "Fake Potion", "Does nothing", "Mandrake", 0.2, 10, "Unknown Effect" as Effect)).toThrow();
  });
});
