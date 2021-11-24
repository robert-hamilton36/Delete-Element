// Keeps track of whether contextMenu should be enabled, if there are changes made on current tab or not
let contextMenuEnabled = false

// Keeps track of tabs with changes saved, the key is the tab id, value is a boolean tabId: boolean
let tabsSaved = {
  
}

/**
 * Creates context menu items
 */

 browser.contextMenus.create({
  id: "delete-element",
  title: "Delete Element",
  contexts: ["all"],
  icons: {
    "16": "icons/delete-element-16.png"
  }
});

browser.contextMenus.create({
  id: "undo-deletion",
  title: "Undo",
  enabled: contextMenuEnabled,
  contexts: ["all"],
  icons: {
    "16": "icons/undo-element-16.png"
  }
});

/**
 *  Function that updates undo context menus enabled status
 *  and changes contextMenuEnabled status
 *  to use whenever contextMenuEnabled is changed
 */
 const updateUndoContextMenuEnableStatus = (boolean) => {
  contextMenuEnabled = boolean
  browser.contextMenus.update("undo-deletion", {enabled: contextMenuEnabled})
}

/**
 *  Sets listener on tab change,
 *  checks whether active tab has changes saved in tabSaved object and changes contextMenuEnabled accordingly
 */

browser.tabs.onActivated.addListener((info) => {
  if (tabsSaved[info.tabId]) {
    updateUndoContextMenuEnableStatus(true)
  } else {
    updateUndoContextMenuEnableStatus(false)
  }

})

/**
 *  Sets listener for messages from content script,
 *    request.saved false, remove tab from list of tabs with saved changes. From content-script
 *    messages are sent when there are no longer any changes saved so context menu is disabled
 */

 browser.runtime.onMessage.addListener((request, messangeInfo) => {
  if (request.saved === false) {
    tabsSaved[messangeInfo.tab.id] = false
    updateUndoContextMenuEnableStatus(false)
  }
})

/**
 * Listens for context menu selections and sends message to content script on which selection:
 *    on delete element. sends remove message, adds current tab to object of tabs saved. Enables the undo button.
 * 
 *    on undo. sends undo message
 */

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "delete-element") {
    browser.tabs.sendMessage(tab.id, {action: 'remove'})
    tabsSaved[tab.id] = true
    updateUndoContextMenuEnableStatus(true)
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