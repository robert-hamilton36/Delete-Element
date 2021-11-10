/**
 * Creates context menu item
 */

browser.contextMenus.create({
  id: "delete-element",
  title: "Delete Element",
  contexts: ["all"],
});

/**
 * Listens for the correct context menu selection and sends message to content script
 */

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "remove-element") {
    browser.tabs.sendMessage(tab.id, {action: 'remove'})
  }
})