# DadaJS
Thanks for using *DadaJS*.

DadaJS is a very lightweight JavaScript framework.

## Getting started
First of all, download the version you want (*DadaJS.js* or its minified counterpart *DadaJS.min.js*).
Just import it normally with `<script scr="DadaJS.js"></script>`.
Then, start *DadaJS* with the `onload` event:
```javascript
window.onload = function () {
    DadaJS.init()
};
```
`init()` function **must** be called!  If you don't do so, all listeners will **NOT** be set properly and a subcomponent like
*Visibilitor* will **NOT** work.

It's recommended to put this function **at the very end** of your code, so you're sure everything runs smoothly.

### Where to put your code?
It's recommended to put your code in a single function which you add to the init list of *DadaJS*, just the way you would to with jQuery, but with a custom function.
Example:
```javascript
function myCustomInitFunction(){
    //My code
};
//Adding your function to DadaJS
DadaJS.addLoadEvent(myCustomInitFunction);
//«addLoadEvent» MUST be set BEFORE starting DadaJS
//Starting DadaJS here
window.onload = function () {
    DadaJS.init()
};
```

### Using listeners
One of the most frequent things you will do in JavaScript is using listeners.
So, *DadaJS* can help you doing that.  It provides 4 built-in functions:

* listenId
* listenClass
* listenObject
* listenCSSSelector

Each of these functions takes the exact same parameters: the element (id, object, class, selector), the event to listen, and a callback function.
Example:
```javascript
DadaJS.listenId(document.getElementByID('my-id', 'click', function(e){ //My code when 'my-id' is clicked'; });
```
**NOTE** The argument passed to callback function is the **event** clicked, **NOT** the element clicked.  If you want to get the clicked element, just call `getTarget` function.
Example:
```javascript
DadaJS.listenClass(document.getElementsByClassName('my-class', 'click', function(e){
    var clickedElement = DadaJS.getTarget(e);
    //More stuff
});
```

**REMEMBER** : this code should be in an *init* function.
Example:
```javascript
function myInitFunction(){
    DadaJS.listenCSSSelector('ul li', 'click' function(e){
        var clickedElement = DadaJS.getTarget(e);
        //My beautiful code
    });
}
DadaJS.addLoadEvent(myInitFunction);
window.onload = function(){
    DadaJS.init();
}
```

Now, let's look into the two other main components of *DadaJS* : *Visiblitor* and *Ajaxer*

## Visibility (Visibilitor component)
With *DadaJS*, you can show/hide elements very easily.
The most basic way to do such, just call `show` or `hide` method with the node you want to show/hide in argument.
Example:
```javascript
DadaJS.hide(document.getElementByID('my-id'));
DadaJS.show(document.getElementsByClassName('my-class')[0]);
```

### Advanced uses
The *visibilitor* component of *DadaJS* is also very useful for showing/hiding one element of a collection.
For example, a menu with submenus is a collection.  You want to see one submenu at the time, not twice.  When you click on the 
main menu, you see it's related submenu.  And when you click on an other item of the main menu, you see an other submenu and the
first one disappears.
This is really easy to do with *DadaJS*.

#### Using submenus
The *caller* (aka the button or the item clicked) needs to implement class *visibilitor* and **must** have `data-key` attribute.
`data-key` contains the **id** of the element which will be shown/hidden when clicking on the caller.

You can also work with a collection of objects.  In this case, only one element of the collection will be visible when clicking.
If an other element of the collection is currently visible, it will be hidden and new element will be shown instead.

Sub-elements **must** be linked to caller via their **id**.

You can find a working example of this small library on JSFiddle: [Visiblitor in action](https://jsfiddle.net/chindit/bwcw6top/)

Basically, you just have to import the library and use an HTML like this:
```html
<!--<ul> is not required.  You can use wathever you want-->
<ul>
    <!--Only thing required is «data-key» which MUST be identical as the ID to show-->
    <li class="visibilitor" data-key="menu-1" data-collection="coll"><a href="#">Menu 1</a></li>
    <li><a href="#" class="visibilitor" data-key="menu-2" data-collection="coll">Menu 2</a></li>
</ul>

<!--This code is the element you want to show.  It is hidden by default.  You can hide it in a CSS file (my «.hidden» class).  «display:none;» is recommended-->
<p id="menu-1" class="hidden coll">
Hey!  I'm menu 1 and I'm hidden
</p>
<!-- «coll» is the name of the collection.  It is NOT mandatory-->
<p id="menu-2" class="hidden coll">
I'me menu 2 and I'm hidden too!
</p>
```

#### Using «tab» mode instead of «menu»
By default, _visibilitor_ consider your collection as a menu.  So, 0 to 1 elements can be visible at the same time.
In the case of a tab content, you may want at least one tab to remain visible at all time.  You may also want to see which
tab you are currently in.  To do so, just add `data-visibilitor="tab"` to your caller.  _visibilitor_ will prevent all tabs from
being closed simultaneously and will also add and remove a «.active» class to the caller (or its parent).

Example:
```html
<ul>
    <li class="visibilitor" data-key="menu-1" data-collection="coll" data-visibilitor="tab"><a href="#">Menu 1</a></li>
</ul>
```

## AJAX component
*DadaJS* can also help you when your working with AJAX.
You can use `DadaJS.ajax.get` and `DadaJS.ajax.post` for respectively GET and POST usage.
For any of these two functions, any error issued by the server will simply be logged into the console.

### GET 
GET component is really easy to use.  Just send your URL as first parameter and a callback function as second parameter.
Example:
```javascript
DadaJS.ajax.GET('http://www.mywebsite.com/api/dadajs?arg1=1&arg2=2', callback);
```
Or
```javascript
DadaJS.ajax.GET('http://www.mywebsite.com/api/something', function(data){ //Do something with data });
```

### POST
POST component is also really easy to use.
It takes the URL as first param, an array with all the parameters you want to send as the second parameter and, finally, the callback function as third parameter.
Example:
```javascript
DadaJS.ajax.post('http://www.mywebsite.com/api/post', {'param1':'value1','param2':'value2'}, callback);
```


I hope you like *DadaJS*.

Feel free to submit any bug you may encounter.

Chindit
