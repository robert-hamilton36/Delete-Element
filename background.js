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

browser.commands.onCommand.addListener((command) => {
  console.log(command)
  if (command === "undo") {
    console.log('UNDOOOOO Background!!!!')
    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then(tab => {
      console.log(tab)
      browser.tabs.sendMessage(tab[0].id, {action: 'undo'})
    })
  }
})