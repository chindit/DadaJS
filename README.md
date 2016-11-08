# visibilitor
A (very) small JS library to show/hide some elements

# How to use
_visibilitor_ is based on the concept of clicking an element to show a related element of a group.
For example, clicking on a button will make appear the related submenu.

The *caller* (aka the button) needs to implement class _visibilitor_ and **must** have `data-key` attribute.
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

## Using «tab» mode instead of «menu»
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
