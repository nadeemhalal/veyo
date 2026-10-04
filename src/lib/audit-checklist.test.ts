import { describe, expect, it } from "vitest";
import { allItemIds, checklistMax, checklistSections, scoreBand, scoreChecklist, sectionLevel } from "./audit-checklist";

describe("checklist data", () => {
  it("has 60 unique items across 7 sections with the documented section sizes", () => {
    expect(checklistMax).toBe(60);
    expect(checklistSections.map((s) => s.items.length)).toEqual([10, 9, 7, 12, 10, 6, 6]);
    expect(allItemIds.size).toBe(60);
  });
});

describe("scoreChecklist", () => {
  it("scores nothing ticked as 0 with tracking to fix first", () => {
    const r = scoreChecklist([]);
    expect(r.total).toBe(0);
    expect(r.fixFirst.id).toBe("tracking");
    expect(r.band.label).toBe("Back to basics");
  });

  it("scores everything ticked as 60", () => {
    const r = scoreChecklist(allItemIds);
    expect(r.total).toBe(60);
    expect(r.sections.every((s) => s.level === "Scaling" && s.missing.length === 0)).toBe(true);
  });

  it("ignores unknown and duplicate ids", () => {
    expect(scoreChecklist(["t1", "t1", "hack", "x99"]).total).toBe(1);
  });

  it("picks the lowest-percentage section to fix first", () => {
    const allButCreative = [...allItemIds].filter((id) => !id.startsWith("c"));
    const r = scoreChecklist(allButCreative);
    expect(r.fixFirst.id).toBe("creative");
    expect(r.fixFirst.missing).toHaveLength(12);
  });
});

describe("bands and levels", () => {
  it("matches the checklist's score bands", () => {
    expect(scoreBand(60).label).toBe("Solid account");
    expect(scoreBand(50).label).toBe("Solid account");
    expect(scoreBand(49).label).toBe("A few leaks");
    expect(scoreBand(35).label).toBe("A few leaks");
    expect(scoreBand(34).label).toBe("Back to basics");
  });

  it("levels sections by percentage", () => {
    expect(sectionLevel(80)).toBe("Scaling");
    expect(sectionLevel(79)).toBe("Steady");
    expect(sectionLevel(50)).toBe("Steady");
    expect(sectionLevel(49)).toBe("Leaky");
  });
});
