// Keeps track of whether contextMenu should be enabled, if there are changes made on current tab or not
let contextMenuEnabled = false

// Keeps track of tabs with changes saved, the key is the tab id, value is a boolean tabId: boolean
let tabsSaved = {
  
}

/**
 *  Functions that add and remove the undo button from the context menu
 */

 const addUndoContextMenu = () => {
  browser.contextMenus.create({
    id: "undo-deletion",
    title: "Undo",
    enabled: contextMenuEnabled,
    contexts: ["all"],
    icons: {
      "16": "icons/undo-element-16.png"
    }
  })
}

const removeContextMenu = () => {
  browser.contextMenus.remove("undo-deletion")
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
/**
 * Makes default setting undo shown in context menu
 */
addUndoContextMenu()

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
 *  Listener on tab change,
 *  checks whether active tab has changes saved in tabSaved object and changes contextMenuEnabled accordingly
 */

const controlContextMenuOnTabSwitch = (info) => {
  if (tabsSaved[info.tabId]) {
    updateUndoContextMenuEnableStatus(true)
  } else {
    updateUndoContextMenuEnableStatus(false)
  }

}

/**
 *  Functions that add and removes the tab change listener
 *    to use on recieving change setting message from pop up.
 */

 const removeContextMenuListeners = () => {
  browser.tabs.onActivated.removeListener(controlContextMenuOnTabSwitch)
}

const addContextMenuListeners = () => {
  browser.tabs.onActivated.addListener(controlContextMenuOnTabSwitch)
}

/**
 *  Function that gets the info of the active tab, and sends it an undo message
 */

 const sendUndoMessage = () => {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(tab => {
    browser.tabs.sendMessage(tab[0].id, {action: 'undo'})
  })
}


/**
 *  Sets listener for messages from content script,
 *    request.saved false, remove tab from list of tabs with saved changes. From content-script
 *      messages are sent when there are no longer any changes saved so context menu is disabled
 * 
 *    request.removeMenu removeContextMenu and tab change Listener. From pop-up
 *      messages are sent when pop-up checkbox is changed
 * 
 *    request.removeMenu false addContextMenu and tab change Listener. From pop-up
 *      messages are sent when pop-up checkbox is changed
 */

 browser.runtime.onMessage.addListener((request, messangeInfo) => {
  if (request.saved === false) {
    tabsSaved[messangeInfo.tab.id] = false
    updateUndoContextMenuEnableStatus(false)
  }

  if (request.removeMenu) {
    removeContextMenuListeners()
    removeContextMenu()
  }

  if (request.removeMenu === false) {
    addContextMenuListeners()
    addUndoContextMenu()
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
  sendUndoMessage()
})