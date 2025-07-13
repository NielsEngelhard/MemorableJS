import { StreakFinder } from "@/features/score/streak-finder";

describe("streak finder", () => {
  it("should find single streak if the entire array is one long streak", () => {
    const input: number[] = [3, 4, 5, 6];
    const minStreakLength: number = 3;

    const streaks = StreakFinder.findStreaks(input, minStreakLength);

    expect(streaks).toEqual([[3, 4, 5, 6]]);
  });

  it("should find multiple streaks if there are separate streaks in the list", () => {
    const input: number[] = [1, 2, 3, 10, 11, 12, 30];
    const streaks = StreakFinder.findStreaks(input, 3);

    expect(streaks).toEqual([[1, 2, 3], [10, 11, 12]]);
  });

  it("should find streaks if the array is not ordered", () => {
    const input: number[] = [6, 4, 3, 5];
    const streaks = StreakFinder.findStreaks(input, 3);

    expect(streaks).toEqual([[3, 4, 5, 6]]);
  });

  it("should not find streaks if there is none", () => {
    const input: number[] = [1, 3, 5, 7];
    const streaks = StreakFinder.findStreaks(input, 3);

    expect(streaks).toEqual([]);
  });
});
