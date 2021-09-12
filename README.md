# gamely
An open-source light weight game engine for JavaScript game making.
## How to use:
Simply copy the gamely.js, yourCode.js, and index.html to your new game directory. Then, start writing your code in the 'yourCode.js' file!

It's that simple!

## Functions:
This is a list of functions that you, the programmer should be using, from our library:

* addImage()
  * Description: Draws the image specified to the screen when the render() function is called, every frame. (void)
  * Parameters:
    * location: 
      * Type: String
      * Description: The relative path from index.html to the file you want to show on screen to the user
    * x:
      * Type: Integer
      * Description: The X position of the image to be displayed at on the canvas
    * y:
      * Type: Integer
      * Description: The Y position of the image to be displayed at on the canvas
    * width:
      * Type: Integer (optional)
      * Description: The width of the image, distorted if it is a different size to the image being loaded
    * height:
      * Type: Integer (optional)
      * Description: The height of the image, distorted if it is a different size to the image being loaded

* isKeyDown()
  * Description: Returns whether the specified key is pressed down or not. (boolean)
  * Parameters:
    * sKey: 
      * Type: String
      * Description: The key to check if it's being pressed down. Can be upper or lower case.

* isMouseDown()
  * Description: Retruns whether or not the mouse is pressed. (boolean)