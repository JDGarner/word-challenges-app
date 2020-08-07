describe("Example", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should have Step One section", async () => {
    await expect(element(by.text("Hello World"))).toBeVisible();
  });
  // it("should show world screen after tap", async () => {
  //   await element(by.id("world_button")).tap();
  //   await expect(element(by.text("World!!!"))).toBeVisible();
  // });
});
