const enterWord = async (word) => {
  await element(by.id("answer-input")).typeText(word);
  await element(by.id("answer-input")).tapReturnKey();
};

describe("Rhymes", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("allows user to play rhymes game mode", async () => {
    await expect(element(by.text("What would you like to train?"))).toBeVisible();
    await element(by.text("Rhymes")).tap();
    await expect(element(by.text("Select a difficulty"))).toBeVisible();
    await element(by.text("Novice")).tap();

    await waitFor(element(by.id("answer-input")))
      .toBeVisible()
      .withTimeout(7000);

    await enterWord("sack");
    await enterWord("whack");
    await enterWord("hack");
    await enterWord("crack");

    await expect(element(by.id("rhyme-post-game-praise"))).toBeVisible();
  });
});
