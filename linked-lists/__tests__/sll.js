import { LinkedList } from "../sll";

describe("sll", () => {
  let sll;

  beforeEach(() => {
    sll = new LinkedList();
  });

  describe("push()", () => {
    test("should add a node to the end of the list", () => {
      sll.push("apple");
      expect(sll.find("apple")).toBeTruthy();
    });

    test("should add multiple nodes to the end of the list", () => {
      sll.push("apple");
      sll.push("banana");
      sll.push("cherry");
      expect(sll.find("apple")).toBeTruthy();
      expect(sll.find("banana")).toBeTruthy();
      expect(sll.find("cherry")).toBeTruthy();
    });
  });

  describe("remove()", () => {
    test("should remove the first occurrence of a value", () => {
      sll.push("apple");
      sll.push("banana");
      sll.push("cherry");
      sll.remove("banana");
      expect(sll.find("banana")).toBeFalsy();
    });

    test("should not remove anything if value does not exist", () => {
      sll.push("apple");
      sll.remove("banana");
      expect(sll.find("apple")).toBeTruthy();
    });

    test("should remove the only node in the list", () => {
      sll.push("apple");
      sll.remove("apple");
      expect(sll.find("apple")).toBeFalsy();
    });

    test("should remove the head node and update the head", () => {
      sll.push("apple");
      sll.push("banana");
      sll.remove("apple");
      expect(sll.find("apple")).toBeFalsy();
      expect(sll.find("banana")).toBeTruthy();
    });

    test("should handle multiple nodes with the same value", () => {
      sll.push("apple");
      sll.push("banana");
      sll.push("apple");
      sll.remove("apple");
      expect(sll.find("apple")).toBeTruthy();
    });
  });

  describe("find()", () => {
    test("should return the node if value exists", () => {
      sll.push("apple");
      const node = sll.find("apple");
      expect(node).toBeTruthy();
      expect(node.value).toBe("apple");
    });

    test("should return null if value does not exist", () => {
      sll.push("apple");
      const node = sll.find("banana");
      expect(node).toBeNull();
    });

    test("should find a value in the middle of the list", () => {
      sll.push("apple");
      sll.push("banana");
      sll.push("cherry");
      const node = sll.find("banana");
      expect(node).toBeTruthy();
      expect(node.value).toBe("banana");
    });
  });

  describe("Edge cases", () => {
    test("should handle removal from an empty list", () => {
      expect(() => sll.remove("apple")).not.toThrow();
    });

    test("should handle finding in an empty list", () => {
      expect(sll.find("apple")).toBeNull();
    });

    test("should handle multiple sequential operations", () => {
      sll.push("apple");
      sll.push("banana");
      sll.push("cherry");
      sll.remove("banana");
      sll.push("date");
      expect(sll.find("apple")).toBeTruthy();
      expect(sll.find("banana")).toBeFalsy();
      expect(sll.find("cherry")).toBeTruthy();
      expect(sll.find("date")).toBeTruthy();
    });
  });
});
