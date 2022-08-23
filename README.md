# Delete-Element
Firefox Web Extension to click and delete elements off a web page

[Install branch 2](https://github.com/robert-hamilton36/Delete-Element/releases/download/v0.pre1/ac0ae3f26ea440f28343-0.1pre.xpi)
  
The different numbered branches contains different features for the extension.

- [1.Simple](https://github.com/robert-hamilton36/Delete-Element/tree/1.Simple):  
Just a delete button from context menu

- [2.UndoShortcut](https://github.com/robert-hamilton36/Delete-Element/tree/2.UndoShortcut):  
Adds an undo function only with a shortcut 'Ctrl + Alt + Z'

- [3.UndoContextMenu](https://github.com/robert-hamilton36/Delete-Element/tree/3.UndoContextMenu):  
Adds an undo button to the context menu. Along with the shortcut 'Ctrl + Alt + Z'
This can make deleting cumbersome as you have to go through a sub-contextmenu to delete an element

- [4.BrowserAction](https://github.com/robert-hamilton36/Delete-Element/tree/4.BrowserAction):  
Adds a browser action, an icon in toolbar that provides another undo button and a checkbox to choose whether a context menu for undo is shown

- [5.ExtensionOption](https://github.com/robert-hamilton36/Delete-Element/tree/5.ExtensionOptions):  
Adds a preferences tab in extension (add-on) menu, that has a checkbox to choose whether an undo context menu is shown

# To get started

1.Clone Repo
`git clone https://github.com/robert-hamilton36/Delete-Element.git`

2. Checkout selected branch
3. e.g. `git checkout 3.UndoContextMenu`
4. In firefox browser enter 
`about:debugging`
5. Select This firefox in side menu
6. Click load Temporary Add-On...
7. Point file selector towards the manifest.json
