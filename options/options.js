const checkbox = document.getElementById('undoMenu')

/**
 * Save and retrieve settings
 */

 const saveOptions = (boolean) => {
  browser.storage.sync.set({
    checkStatus: boolean
  })
}

const restoreOptions = () => {
  browser.storage.sync.get('checkStatus')
  .then(data => {
    console.log(data)
    checkbox.checked = data.checkStatus
  })
}

/**
 * Sends message to background script, will add or remove undo context menu:
 *    If checkbox is checked the menu is shown,
 *    so the removeMenu message is false. The opposite.
 */

const removeUndoContextMenu = (checkBoxIsChecked) => {
  browser.runtime.sendMessage({removeMenu: !checkBoxIsChecked})
}

/**
 * Listens for clicks on checkbox:
 *    Saves the new checkbox status
 *    Sends message to background script, to add or remove context menu
 */

 checkbox.addEventListener('click', (e) => {
  checkbox.checked = e.target.checked
  saveOptions(e.target.checked)
  removeUndoContextMenu(e.target.checked)
})

/**
 * Listens for when the popup is opened:
 *    gets saved options
 */

document.addEventListener("DOMContentLoaded", restoreOptions)