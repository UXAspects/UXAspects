affixElement.$inject = ['$window'];

export default function affixElement($window) {
    return {
        restrict: 'A',
        scope: {
            scrolloffset: '=affixPosition'
        },
        link: function(scope, element) {
            var win = angular.element($window);
            var scrolloffset = (typeof scope.scrolloffset !== "undefined") ? scope.scrolloffset : 0; // Default value is zero.
            var affixElement = new AffixedElement(element, scrolloffset);
            var body = angular.element('body');

            //Added this code to hide the menu button when there is a condensed toolbar
            //Menu button should only appear in the top header.
            //If there is a better solution this should be removed in the future.

            if (element.parent().hasClass('toolbar')) {
                body.addClass('hide-navbar-toolbar');
            } else {
                body.removeClass('hide-navbar-toolbar');
            }

            if (!element.hasClass('condensed')) {
                body.removeClass('condensed-panel');
            }

            //Affix is set on scrolling.
            var affixOnScrollEventHandler = function() {
                affixElement.currentScrollPosition = win.scrollTop();
            };

            win.on('scroll.affix', undefined, affixOnScrollEventHandler);

            var updateAffix = function() {
                affixElement.update(scope, body);
            };

            window.addEventListener('scroll', updateAffix);

            scope.$on("$destroy", function() {
                win.off("scroll.affix", undefined, affixOnScrollEventHandler);
                window.removeEventListener('scroll', updateAffix);
            });
        }
    };
}

function AffixedElement(element, offset) {

    //element to make stick
    this.element = element;
    this.nativeElement = this.element.get(0);
    this.nativeElement.classList.add("affix-element");
    this.nativeElement.classList.add("affix-clone");
    //scroll position at which to trigger the stick
    this.trigger = this.element.offset().top;
    this.initialTop = this.element.css('top');
    //offset at which to position the fixed element from the top
    //this will normally be 0 but on the off chance teams want something custom.
    this.offset = offset;
    //whether the element is affixed or not.
    this.affixed = false;
    this.headerHeight = null;

    //previous values
    //we must keep track of previous values as if they change we must update UI elements
    //previous scrollPosition
    this.previousScrollPosition = 0;
    //current scrollPosition - will be updated by event handler outside this object
    this.currentScrollPosition = 0;
}
/*
 * # Creates the clone element
 * creates the clone element and prepends it to parent
 * also then updates the clone elements height to the current height of element
 */
AffixedElement.prototype.createClone = function() {
    //remove any existing clone associated with this element.
    this.height = this.element.height();

    if (this.height !== this.element.parent().children().first().height()) {

        this.element.parent().children().first().remove();
        this.clone = this.element.clone(false, false).addClass("affix-clone invisible").removeClass("affix-element affix");
        this.element.parent().prepend(this.clone);

        //update the current clone height
        this.currentElementHeight = this.element.outerHeight(true);
        this.updateTrigger();
    }
    if (!this.clone) {
        this.clone = this.element.clone(false, false).addClass("affix-clone invisible").removeClass("affix-element affix");
        this.element.parent().prepend(this.clone);

        //update the current clone height
        this.currentElementHeight = this.element.outerHeight(true);
        this.updateTrigger();
    }
};

/*
 * # Updates the trigger for when to become "stuck"
 * have to use the clone as it should always be at the original position
 * if clone doesnt exist use the element
 */
AffixedElement.prototype.updateTrigger = function() {
    this.trigger = this.clone ? this.clone.offset().top : this.element.offset().top;
};

/*
 * # Updates the element
 * decides whether the object should be stuck or not
 * will only execute if the scroll position has changed.
 */
AffixedElement.prototype.updateElement = function(scope, body) {

    if (this.element.height() !== this.height) {
        this.createClone();
        this.element.get(0).classList.remove('affix-clone');
    }

    if (this.headerHeight === null) {
        this.headerHeight = this.element[0].scrollHeight;
    } else if (this.headerHeight < this.element[0].scrollHeight) {
        this.headerHeight = this.element[0].scrollHeight;
    }

    if (this.currentScrollPosition !== this.previousScrollPosition) {
        var tabs = body[0].getElementsByClassName("navbar-tabs").length !== 0 ?
            body[0].getElementsByClassName("navbar-tabs")[0].getElementsByClassName("nav-tabs")[0] : null;

        var updateAffixScrollCondition;

        if (document.getElementsByClassName('affix-toolbar').length === 0) {
            updateAffixScrollCondition = this.offset > 0 ? 0 : this.trigger;
        } else if (document.getElementsByClassName('navbar-tabs').length !== 0) {
            updateAffixScrollCondition = body[0].getElementsByClassName("navbar-static-top")[0].scrollHeight / 2;
        } else {
            updateAffixScrollCondition = this.offset > 0 ? 0 : this.headerHeight;
        }

        if (this.currentScrollPosition > updateAffixScrollCondition && !this.affixed) {

            this.element.addClass("affix").css('top', this.offset + 'px');
            this.element.parent().addClass("child-affix");

            if (document.getElementsByClassName('affix-toolbar').length === 0) {
                this.wrapperclone = "<div class='wrapper-content-clone invisible'></div>";
                angular.element('.wrapper-content').append(angular.element(this.wrapperclone));
                angular.element('.wrapper-content-clone').height(this.headerHeight / 2 + 'px');
                angular.element('.wrapper-content').css('margin-top', '-' + this.headerHeight / 2 + 'px');
            }

            if (tabs) {
                angular.element(tabs).addClass('hidden');
            }

            body.addClass('condensed-panel');
            this.affixed = true;

        } else if (this.currentScrollPosition <= updateAffixScrollCondition && this.affixed) {

            this.element.removeClass("affix");
            this.element.parent().removeClass("child-affix");

            if (!this.element.hasClass('condensed')) {

                if (document.getElementsByClassName('affix-toolbar').length === 0) {
                    angular.element('.wrapper-content').css('margin-top', 0);
                    angular.element('.wrapper-content-clone').remove();
                }
                body.removeClass('condensed-panel');
            }

            if (tabs) {
                angular.element(tabs).removeClass('hidden');
            }

            this.affixed = false;

            if (this.offset > 0) {
                //removing affix, put element back where it was (relevant when there are 2 affix elements one beneath
                //each other, like a condensed toolbar under a condensed header, and then we want to bottom
                //element to return to its origin place.
                this.element.css('top', this.initialTop);
            }
        }
        this.previousScrollPosition = this.currentScrollPosition;
    }
};

/*
 * # Updates everything
 * This updates whether the item should be "stuck" and also clone details
 */
AffixedElement.prototype.update = function(scope, body) {
    this.updateTrigger();
    this.updateElement(scope, body);
};