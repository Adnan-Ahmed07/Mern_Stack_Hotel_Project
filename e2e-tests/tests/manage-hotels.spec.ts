// e2e-tests/tests/manage-hotels.spec.ts
import { test, expect, Page } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

async function signIn(page: Page, email: string, password: string) {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.fill('[name="email"]', email);
  await page.fill('[name="password"]', password);

  await Promise.all([
    page.waitForResponse((resp) =>
      resp.url().endsWith("/api/auth/login") && resp.status() === 200
    ),
    page
      .getByRole("heading", { name: "Sign In" })
      .waitFor({ state: "hidden", timeout: 10_000 }),
    page.getByRole("button", { name: "Login" }).click(),
  ]);
}

test.beforeEach(async ({ page }) => {
  await signIn(page, "1@1.com", "password123");
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);
  await expect(
    page.getByRole("heading", { name: "Add Hotel" })
  ).toBeVisible();

  // Fill out the text fields
  await page.fill('[name="name"]', "Test Hotel");
  await page.fill('[name="city"]', "Test City");
  await page.fill('[name="country"]', "Test Country");
  await page.fill(
    '[name="description"]',
    "This is a description for the Test Hotel"
  );
  await page.fill('[name="pricePerNight"]', "100");
  await page.selectOption('select[name="starRating"]', "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();
  await page.fill('[name="adultCount"]', "2");
  await page.fill('[name="childCount"]', "4");

  
  const fileInputSelector = 'input[type="file"][name="imageFiles"]';
  
  await expect(page.locator(fileInputSelector)).toHaveCount(1, {
    timeout: 5_000,
  });


  const file1 = path.resolve(__dirname, "files", "1.png");
  const file2 = path.resolve(__dirname, "files", "2.png");

 
  await page.setInputFiles(fileInputSelector, [file1, file2]);

  await Promise.all([
    page.waitForResponse((resp) =>
      resp.url().endsWith("/api/my-hotels") && resp.status() === 201
    ),
    page.getByRole("button", { name: "Save" }).click(),
  ]);

  await expect(page.getByText("Hotel Saved!")).toBeVisible({
    timeout: 10_000,
  });
});
