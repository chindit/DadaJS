/**
 * VERSION 1.0.0
 * 
 * Created by Chindit on 9/11/16.
 * This code is distributed under aGPL v3.0 licence.
 * You can find a copy of the licence in this repository.
 * If not, you can find a version on the GNU website: https://www.gnu.org/licenses/agpl-3.0.html 
 * 
 * Thanks for using DadaJS
 */
// - - - - - - - - - - - - - - - - - - - - -
// VISIBILITOR COMPONENT
// - - - - - - - - - - - - - - - - - - - - -
var Visibilitor = {
    init: function(){
        var listenerClassList = document.getElementsByClassName('visibilitor');
        for (var i = 0; i < listenerClassList.length; i++) {
            listenerClassList[i].addEventListener('click', Visibilitor.changeVisibility);
        }
    },
    normalizeToHidden: function(element) {
        if (!element)
            return;
        if (element.classList.contains("hidden"))
            element.classList.remove("hidden");
        var elementStyle = getComputedStyle(element);
        if (elementStyle.visibility == "hidden")
            elementStyle.visibility = "visible";
        element.style.display = "none";
    },

    normalizeToVisible: function(element) {
        if (!element)
            return;
        Visibilitor.normalizeToHidden(element);
        element.style.display = "block";
    },

    hideCollection: function(collection) {
        var collectionElements = document.getElementsByClassName(collection);
        for (i = 0; i < collectionElements.length; i++) {
            Visibilitor.normalizeToHidden(collectionElements[i]);
        }
    },

    changeActiveStatus: function(caller, collection, parent) {
        var listeners = document.getElementsByClassName('visibilitor');
        var visibleFound = false;
        for (i = 0; i < listeners.length; i++) {
            var root = (parent === undefined) ? listeners[i] : listeners[i].parentNode;
            if (collection !== undefined && listeners[i].getAttribute('data-collection') == collection) {
                console.log(root);
                if (root.classList.contains('active')) {
                    visibleFound = true;
                    root.classList.remove('active');
                }
            }
        }
        if (!visibleFound && parent === undefined) {
            Visibilitor.changeActiveStatus(caller, collection, true);
            return;
        }
        if (parent === undefined)
            caller.classList.add('active');
        else
            caller.parentNode.classList.add('active');
    },

    changeVisibility: function(element) {
        var caller = element.target;console.log(caller);
        //Can we change visibility of something?
        if (!caller.hasAttribute('data-key')) {
            if (caller.parentNode.hasAttribute('data-key'))
                caller = caller.parentNode;
            else
                return;
        }
        //Does the element exist?
        var target = document.getElementById(caller.getAttribute('data-key'));
        if (!target) {
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
                    Visibilitor.changeActiveStatus(caller, collectionName);
                    Visibilitor.hideCollection(collectionName);
                    Visibilitor.normalizeToVisible(target);
                }
                break;
            case 'menu':
            //Default behavior
            default:
                //Changing status
                if (isVisible) {
                    Visibilitor.normalizeToHidden(target);
                }
                else {
                    if (isCollection) {
                        Visibilitor.hideCollection(collectionName);
                    }
                    Visibilitor.normalizeToVisible(target);
                }
                break;
        }
    },
};

// - - - - - - - - - - - - - - - - - - - - -
// AJAX COMPONENT
// - - - - - - - - - - - - - - - - - - - - -
var Ajaxer = {
    init: function(){
        //Nothing to do here
    },
    get: function(target, callback){
        var req = new XMLHttpRequest();
        req.open('GET', target, true);
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200)
                    callback((typeof req.response === "string") ? JSON.parse(req.response) : req.response);
                else
                    console.log("Erreur pendant le chargement de la page.\n");
            }
        };
        req.send(null);
    },
    post: function(target, arguments, callback){
        var req = new XMLHttpRequest();
        var data = new FormData();
        for(var key in arguments){
            data.append(key, arguments[key]);
        }
        req.open('POST', target, true);
        req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if(req.status == 200)
                    callback((typeof req.response === "string") ? JSON.parse(req.response) : req.response);
                else
                    console.log("Erreur pendant le chargement de la page.\n");
            }
        };
        req.send(data);
    },
};

// - - - - - - - - - - - - - - - - - - - - -
// MAIN COMPONENT
// - - - - - - - - - - - - - - - - - - - - -
var DadaJS = {
    //- - - - - - - - - - - - - - - - - - - - - - - - -
    // INIT
    //- - - - - - - - - - - - - - - - - - - - - - - - -
    initList: [],
    init: function() {
        this.initList.push(Visibilitor.init);
        this.initList.push(Ajaxer.init);
        for(var j=0; j<this.initList.length; j++){
            this.initList[j]();
        }
    },

    //- - - - - - - - - - - - - - - - - - - - - - - - -
    // SHOW/HIDE (Require Visibilitor)
    //- - - - - - - - - - - - - - - - - - - - - - - - -
    hide: function(target){
        var trustedTarget = (target.target === undefined) ? target : target.target;
        Visibilitor.normalizeToHidden(trustedTarget);
    },
    show: function(target){
        var trustedTarget = (target.target === undefined) ? target : target.target;
        Visibilitor.normalizeToVisible(trustedTarget);
    },
    remove: function(target){
        var trustedTarget = (target.target === undefined) ? target : target.target;
        trustedTarget.parentNode.removeChild(trustedTarget);
    },

    //- - - - - - - - - - - - - - - - - - - - - - - - -
    // AJAX (Require Ajaxer)
    //- - - - - - - - - - - - - - - - - - - - - - - - -
    ajax: {
        get: function(target, callback){
            Ajaxer.get(target, callback);
        },
        post: function(target, arguments, callback){
            Ajaxer.post(target, arguments, callback);
        }
    },

    //- - - - - - - - - - - - - - - - - - - - - - - - -
    // LISTENERS
    //- - - - - - - - - - - - - - - - - - - - - - - - -
    listenClass: function(className, event, target){
        var classList = document.getElementsByClassName(className);
        if(!this.checkFunction(target))
            return;
        for(i=0; i<classList.length; i++){
            classList[i].addEventListener(event, target);
        }
    },
    listenId: function(id, event, target){
        var elem = document.getElementById(id);
        if(!elem || !this.checkFunction(target))
            return;
        elem.addEventListener(event, target);
    },
    listenCSSSelector: function(selector, event, target){
        var selectorList = document.querySelectorAll(selector);
        if(!this.checkFunction(target))
            return;
        for(i=0; i<selectorList.length; i++){
            selectorList[i].addEventListener(event, target);
        }
    },
    listenObject: function(object, event, target){
        if(!this.checkFunction(target) || typeof object != "object")
            return;
        object.addEventListener(event, target);
    },
    checkFunction: function(functionName){
        return (typeof functionName === 'function');
    },
    addLoadEvent: function(func) {
        this.initList.push(func);
    },
    //Listener cleaner
    getTarget: function(target){
        return (target.target === undefined) ? target : target.target;
    },
};
