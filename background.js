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
  if (info.menuItemId == "delete-element") {
    browser.tabs.sendMessage(tab.id, {action: 'remove'})
  }
})

/**
 *  Listens for custom keyboard shortcuts
 *  If shortcut is 'undo'
 *  Finds current tab the webpage is in and sends undo message
 */

browser.commands.onCommand.addListener((command) => {
  if (command === "undo") {
    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then(tab => {
      browser.tabs.sendMessage(tab[0].id, {action: 'undo'})
    })
  }
})