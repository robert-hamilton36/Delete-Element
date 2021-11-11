// Keeps track of whether there are any saved changes
let saved = false

/**
 * Creates context menu item
 */

browser.contextMenus.create({
  id: "delete-element",
  title: "Delete Element",
  contexts: ["all"],
});

/**
 * Listens for messages from content-script
 * 
 * If the message is {saved: true}, add a context menu for undo
 * If {saved: false}, remove the undo context menu
 * 
 * 
 */

browser.runtime.onMessage.addListener((request) => {
  if (request.saved) {
    browser.contextMenus.create({
      id: "undo-deletion",
      title: "Undo",
      enabled: true,
      contexts: ["all"],
    });
  } else if (!request.saved) {
    browser.contextMenus.remove("undo-deletion")
  }
})

/**
 * Listens for the correct context menu selection and sends message to content script
 */

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "delete-element") {
    browser.tabs.sendMessage(tab.id, {action: 'remove'})
  } 

  if (info.menuItemId == "undo-deletion") {
    browser.tabs.sendMessage(tab.id, {action: 'undo'})
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