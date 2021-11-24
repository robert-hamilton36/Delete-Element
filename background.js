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

/**
 *  Sets listener for messages from content script,
 *  messages are sent when there are no longer any changes saved so context menu is disabled
 */

 browser.runtime.onMessage.addListener((request, messangeInfo) => {
  if (request.saved === false) {
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