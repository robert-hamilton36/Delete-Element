let element = null

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

browser.runtime.onMessage.addListener(request => {
  if(request.action === 'remove') {
    try {
      element.parentNode.removeChild(element)
    } 
    catch (error) {
      console.log(error)
    }
  }
})

