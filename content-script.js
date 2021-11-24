// Keeps track of last element right clicked
let element = null

/**
 * Every time the context menu is opened, (using right click), 
 * the html element the mouse was on is saved, preparing for if delete element is selected from context menu
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
      if (document.body.style.overflow === 'hidden') {
        document.body.style.setProperty('overflow', 'auto', 'important')
      }
    } 
    catch (error) {
      console.log(error)
    }
  }
})

