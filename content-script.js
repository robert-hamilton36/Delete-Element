// Keeps track of last element right clicked
let element = null

// Keeps track of the elements that have been hidden, and what the original display was
// Array of objects
let savedChanges = []

/**
 * Every time the context menu is opened, (using right click), 
 * the html element the mouse was on is saved, preparing for if delete element is selected from context menu
 */

document.addEventListener('contextmenu', (e) => {
  element = e.target
})

/**
 * Creates listener thats recieves any messages from the background script
 * Gets sent via context menu action
 * 
 */

 browser.runtime.onMessage.addListener(async (request) => {

  /**
   * If the action is remove; 
   *    adds target element and its original display style to array of savedChanges, 
   *    set display to none to hide the content,
   * 
   *    some sites disable scrolling when a popup is displayed,
   *    add check to reenable scrolling on the body element
   */
  if(request.action === 'remove') {
    try {
      savedChanges.push({
        previousElement: element, 
        display: element.style.display
      })

      element.style.display = "none"
      element = null
      if (document.body.style.overflow === 'hidden') {
        document.body.style.setProperty('overflow', 'auto', 'important')
      }
    } 
    catch (error) {
      console.log("Error at Action: Remove")
      console.log(error)
    }
  }
  /**
   * If the action is undo; 
   *    removes last element hidden from savedChanges and sets that elements display to what it previously was
   */
  
  if(request.action === 'undo') {
    try {
      const { previousElement, display } = savedChanges.pop()
      previousElement.style.display = display
    }
    catch (error) {
      console.log("Error at Action: Undo")
      console.log(error)
    }
  }
})

