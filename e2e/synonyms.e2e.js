describe("Synonyms", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("allows user to play synonyms game mode", async () => {
    await expect(element(by.text("What would you like to train?"))).toBeVisible();
    await element(by.text("Synonyms")).tap();
    await expect(element(by.text("Select a difficulty"))).toBeVisible();
    await element(by.text("Master")).tap();

    await element(by.text("Acknowledgement")).tap();
    await element(by.text("Respectable")).tap();
    await element(by.text("Irreproachableness")).tap();

    await element(by.text("Wary")).tap();
    await element(by.text("Cautious")).tap();
    await element(by.text("Circumspect")).tap();

    await element(by.text("Splendid")).tap();
    await element(by.text("Magnificent")).tap();
    await element(by.text("Brilliant")).tap();

    await expect(element(by.id("synonyms-post-game-praise"))).toBeVisible();
  });
});
