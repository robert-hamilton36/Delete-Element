/**
 * Creates delete element context menu item
 */

browser.contextMenus.create({
  id: "delete-element",
  title: "Delete Element",
  contexts: ["all"],
  icons: {
    "16": "icons/delete_element_16.png"
  }
})

/**
 * Listens for context menu selections and sends message to content script on which selection:
 *    On delete-element. sends remove message.
 */

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "delete-element") {
    browser.tabs.sendMessage(tab.id, {action: 'remove'})
  }
})