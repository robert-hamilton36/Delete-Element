let element = null
let previousElement = null
let previousDisplayStyle = null

/**
 * Every time the context menu is opened, (using right click), the html element the mouse was on is saved
 */

document.addEventListener('contextmenu', (e) => {
  element = e.target
})

/**
 * Creates listener thats recieves any messages from the background script
 * If the action is remove, save target element display style and save target element, set display to none to hide the content
 * 
 * If the action is undo, set elements display to what it previously was
 */

browser.runtime.onMessage.addListener(async (request) => {
  if(request.action === 'remove') {
    try {
      previousElement = element
      previousDisplayStyle = element.style.display
      element.style.display = "none"
 
      element = null
    } 
    catch (error) {
      console.log(error)
    }
  }
  if(request.action === 'undo') {
    try {
      previousElement.style.display = previousDisplayStyle
      previousElement = null
      previousDisplayStyle = null
    }
    catch (error) {
      console.log(error)
    }
  }
})

