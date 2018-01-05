/*
    UX Aspects Expanding TextArea plugin
    Version: 0.0.1
*/

(function() {

    function ExpandingTextarea(element, options) {
        var _this = this;

        //store the original non-jquery element
        this.element = element.get(0);

        //ensure this is a textarea or else throw error
        if (this.element.tagName.toLowerCase() !== 'textarea')
            throw 'Expanding Textarea - Expected <textarea> but got <' + this.element.tagName.toLowerCase() + '> instead.';

        //store options
        this.options = options;

        //store original dimension
        this.originalHeight = this.element.offsetHeight;

        //set initial height
        this.element.style.height = this.originalHeight + 'px';

        //make the line height an integer
        var style = window.getComputedStyle(this.element);

        var lineHeight = Math.ceil(parseFloat(style.getPropertyValue('line-height')));

        this.element.style.lineHeight = lineHeight + 'px';

        //add event listeners - ensure they retain context
        this.element.addEventListener('input', function(event) {
            _this.resize.apply(_this, [event, true]);
        });

        //watch for paste event
        this.element.addEventListener('paste', function(event) {
            setTimeout(function() {
                _this.resize.apply(_this, [event, true]);
            }, 0);
        });

        this.element.addEventListener('keypress', function(event) {
            if (event.keyCode == 13 && options.disableReturn)
                event.preventDefault();
        });

        var onResize = function(event) {
            _this.resize.apply(_this, [event, false]);
        };
        window.addEventListener('resize', onResize);

        element.on("remove", function() {
            window.removeEventListener('resize', onResize);
        });

        //perform initial resize
        this.resize();
    }

    ExpandingTextarea.prototype.resize = function(event, retainScroll) {

        //get computed style of element
        var style = window.getComputedStyle(this.element);

        //store current scroll position as it can move when resizing
        var scrollOffset = $(window).scrollTop();

        //get the current height
        var currentHeight = this.element.offsetHeight;

        //if element is not visible we can stop here
        if (currentHeight === 0) return;

        //hide scrollbars when sizing
        this.element.style.overflowY = 'hidden';

        //reset element height to get accurate scrollheight
        this.element.style.height = 'auto';

        //get calculated heights
        var paddingTop = parseFloat(style.getPropertyValue('padding-top'));
        var paddingBottom = parseFloat(style.getPropertyValue('padding-bottom'));

        var height = this.element.scrollHeight;

        var lineHeight = parseFloat(style.getPropertyValue('line-height'));
        var lineCount = (this.element.scrollHeight - (paddingTop + paddingBottom)) / lineHeight;

        //providing we do not exceed the line count then grow the textbox
        if (this.options.maxVisibleLines === 0 || lineCount <= this.options.maxVisibleLines) {
            //set height to new calculated height
            this.element.style.height = height + 'px';
        } else {
            this.element.style.overflowY = 'auto';
            this.element.style.height = currentHeight + 'px';
        }

        //reset scroll position after sizing
        if (retainScroll) $(window).scrollTop(scrollOffset);
    };

    $.fn.expandingTextarea = function(options) {

        var defaultOptions = {
            disableReturn: false,
            maxVisibleLines: 0
        };

        //extend options with default options
        options = $.extend(defaultOptions, options);

        //create a new instance of an expanding textarea and store in element data
        this.data('aspects.expanding-textarea', (data = new ExpandingTextarea(this, options)));
    };


})();
