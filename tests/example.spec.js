// filepath: c:\Users\pc\Desktop\rk doc\Todo list app\tests\example.spec.js
import { test, expect } from "@playwright/test";

test.describe("Todo List App", () => {
  test.beforeEach(async ({ page }) => {
    console.log("Navigating to the app...");
    await page.goto("/");
    console.log("Navigation complete.");
  });

  test("should add a new todo item", async ({ page }) => {
    console.log("Filling in the new todo item...");
    await page.fill('input[name="itemName"]', "Test Item");
    await page.fill('input[name="itemDueDate"]', "2025-12-31");
    await page.click('button[name="addButton"]');
    console.log("New todo item added.");

    const todoItem = await page.locator(".todo-item").last();
    console.log("Checking the last todo item...");
    await expect(todoItem).toContainText("Test Item");
    await expect(todoItem).toContainText("2025-12-31");
  });

  test("should delete a todo item", async ({ page }) => {
    console.log("Adding a new todo item...");
    await page.fill('input[name="itemName"]', "Test Item");
    await page.fill('input[name="itemDueDate"]', "2025-12-31");
    await page.click('button[name="addButton"]');
    console.log("New todo item added.");

    // adding another item
    console.log("Adding a new todo item2...");
    await page.fill('input[name="itemName"]', "go to gym");
    await page.fill('input[name="itemDueDate"]', "2025-12-31");
    await page.click('button[name="addButton"]');
    console.log("New todo item 2 added.");

    console.log("Deleting the todo item...");
    const deleteButton = await page
      .locator(".todo-item")
      .first()
      .locator('button[name="delete"]');
    await deleteButton.click();
    console.log("Delete button clicked.");
    
    const todoItems = await page.locator(".todo-item");
    console.log("Checking that the todo item is deleted...");
    const itemCount = await todoItems.count();
    console.log(`Number of todo items found: ${itemCount}`);
    await expect(todoItems).not.toContainText("Test Item");
  });

  test("should show welcome message when there are no todo items", async ({
    page,
  }) => {
    console.log("Checking for welcome message...");
    const welcomeMessage = await page.locator(".welcome");
    console.log("Locator for welcome message found.");
    await expect(welcomeMessage).toBeVisible();
    console.log("Welcome message is visible.");
    await expect(welcomeMessage).toContainText("Enjoy Your Day");
    console.log("Welcome message contains the correct text.");
  });
});
