/**
 * Created by david on 7/11/16.
 */

function normalizeToHidden(element){
    if(!element)
        return;
    if(element.classList.contains("hidden"))
        element.classList.remove("hidden");
    var elementStyle = getComputedStyle(element);
    if(elementStyle.visibility == "hidden")
        elementStyle.visibility = "visible";
    element.style.display = "none";
}

function normalizeToVisible(element){
    if(!element)
        return;
    normalizeToHidden(element);
    element.style.display = "block";
}

function hideCollection(collection){
    var collectionElements = document.getElementsByClassName(collection);
    for(i=0; i<collectionElements.length; i++){
        normalizeToHidden(collectionElements[i]);
    }
}

function changeActiveStatus(caller, collection, parent) {
    var listeners = document.getElementsByClassName('visibilitor');
    var visibleFound = false;
    for (i = 0; i < listeners.length; i++) {
        var root = (parent === undefined) ? listeners[i] : listeners[i].parentNode;
        if(collection !== undefined && listeners[i].getAttribute('data-collection') == collection) {console.log(root);
            if (root.classList.contains('active')) {
                visibleFound = true;
                root.classList.remove('active');
            }
        }
    }
    if (!visibleFound && parent === undefined) {
        changeActiveStatus(caller, collection, true);
        return;
    }
    if(parent === undefined)
        caller.classList.add('active');
    else
        caller.parentNode.classList.add('active');
}

function changeVisibility(element){
    var caller = element.target;
    //Can we change visibility of something?
    if(!caller.hasAttribute('data-key')){
        if(caller.parentNode.hasAttribute('data-key'))
            caller = caller.parentNode;
        else
            return;
    }
    //Does the element exist?
    var target = document.getElementById(caller.getAttribute('data-key'));
    if(!target){
        return;
    }
    //Is the element visible?
    var isVisible = !(target.classList.contains("hidden") || getComputedStyle(target).display == "hidden" || getComputedStyle(target).display == "none" || getComputedStyle(target).visibility == "hidden");

    //Are we in a collection?
    var isCollection = (caller.hasAttribute('data-collection') && document.getElementsByClassName(caller.getAttribute('data-collection')).length > 0);
    var collectionName = (isCollection) ? caller.getAttribute('data-collection') : "";

    //Do we have special instruction
    var instructions = (caller.hasAttribute('data-visibilitor')) ? caller.getAttribute('data-visibilitor') : "";

    //Process instructions
    switch (instructions) {
        case 'tab':
            if (!isVisible) {
                changeActiveStatus(caller, collectionName);
                hideCollection(collectionName);
                normalizeToVisible(target);
            }
            break;
        case 'menu':
        //Default behavior
        default:
            //Changing status
            if (isVisible) {
                normalizeToHidden(target);
            }
            else {
                if (isCollection) {
                    hideCollection(collectionName);
                }
                normalizeToVisible(target);
            }
            break;
    }
}

window.onload = function() {
    var listenerClassList = document.getElementsByClassName('visibilitor');
    for(i=0; i<listenerClassList.length; i++){
        listenerClassList[i].addEventListener("click", changeVisibility)
    }
};
