let element = null
let previousElement = null
let previousParentNode = null

/**
 * Every time the context menu is opened, (using right click), the html element the mouse was on is saved
 */

document.addEventListener('contextmenu', (e) => {
  element = e.target
})

/**
 * Creates listener thats recieves any messages from the background script
 * If the action is remove, try to delete the element previously selected
 */

browser.runtime.onMessage.addListener(async (request) => {
  if(request.action === 'remove') {
    try {
      previousElement = element
      previousParentNode = element.parentNode
      element.parentNode.removeChild(element)
      element = null
    } 
    catch (error) {
      console.log(error)
    }
  }
  if(request.action === 'undo') {
    try {
      previousParentNode.parentNode.appendChild(previousElement)
      previousElement = null
      previousParentNode = null
    }
    catch (error) {
      console.log(error)
    }
  }
})

