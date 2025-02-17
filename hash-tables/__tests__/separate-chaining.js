import { HashTable } from "../separate-chaining";

describe("HashTable (Without Keys)", () => {
  let hashTable;

  beforeEach(() => {
    hashTable = new HashTable();
  });

  describe("insert()", () => {
    test("should insert a value", () => {
      hashTable.insert("apple");
      expect(hashTable.has("apple")).toBe(true);
    });

    test("should handle duplicate values correctly", () => {
      hashTable.insert("banana");
      hashTable.insert("banana");
      expect(hashTable.has("banana")).toBe(true);
    });

    test("should allow multiple values", () => {
      hashTable.insert("apple");
      hashTable.insert("banana");
      hashTable.insert("cherry");
      expect(hashTable.has("apple")).toBe(true);
      expect(hashTable.has("banana")).toBe(true);
      expect(hashTable.has("cherry")).toBe(true);
    });
  });

  describe("remove()", () => {
    test("should remove a value", () => {
      hashTable.insert("apple");
      hashTable.remove("apple");
      expect(hashTable.has("apple")).toBe(false);
    });

    test("should not affect other values", () => {
      hashTable.insert("apple");
      hashTable.insert("banana");
      hashTable.remove("apple");
      expect(hashTable.has("apple")).toBe(false);
      expect(hashTable.has("banana")).toBe(true);
    });

    test("should not throw an error when removing a non-existent value", () => {
      expect(() => hashTable.remove("nonexistent")).not.toThrow();
    });
  });

  describe("has()", () => {
    test("should return true if a value exists", () => {
      hashTable.insert("grape");
      expect(hashTable.has("grape")).toBe(true);
    });

    test("should return false if a value does not exist", () => {
      expect(hashTable.has("nonexistent")).toBe(false);
    });

    test("should return false after a value is removed", () => {
      hashTable.insert("grape");
      hashTable.remove("grape");
      expect(hashTable.has("grape")).toBe(false);
    });
  });

  describe("Edge cases", () => {
    test("should handle undefined or null values", () => {
      expect(() => hashTable.insert(undefined)).toThrow();
      expect(() => hashTable.insert(null)).toThrow();
    });

    test("should handle large number of values", () => {
      for (let i = 0; i < 1000; i++) {
        hashTable.insert(`value${i}`);
      }
      for (let i = 0; i < 1000; i++) {
        expect(hashTable.has(`value${i}`)).toBe(true);
      }
    });
  });
});
