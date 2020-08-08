const tapWord = async word => {
  const letters = word.toUpperCase().split("");
  for (let i = 0; i < letters.length; i++) {
    await element(by.id(`scrambledLetter-${letters[i]}`))
      .atIndex(0)
      .tap();
  }
};

describe("Definitions", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("allows user to play definitions game mode", async () => {
    await expect(element(by.text("What would you like to train?"))).toBeVisible();
    await element(by.text("Definitions")).tap();
    await expect(element(by.text("Select a difficulty"))).toBeVisible();
    await element(by.text("Journeyman")).tap();

    await tapWord("monkey");
    await element(by.id("skip-button")).tap();
    await element(by.id("skip-button")).tap();
    await tapWord("arid");
    await tapWord("pristine");

    await expect(element(by.id("definitions-post-game-praise"))).toBeVisible();
  });
});
