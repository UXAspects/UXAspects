export class DisplayPanelService {

/**
 * @param {ng.ICompileService} $compile
 * @param {ng.ITimeoutService} $timeout
 * @param {ng.IDocumentService} $document
 */
  constructor($compile, $timeout, $document) {

    this.$compile = $compile;
    this.$timeout = $timeout;
    this.$document = $document;

    /** @type {boolean} */
    this.isOpen = false;

    /** @type {boolean} */
    this.isHidden = false;

    /** @type {JQuery} */
    this.current = null;

    /** @type {JQuery} */
    this.element = null;

    /** @type {ng.IScope} */
    this.scope = null;

    /** @type {*} */
    this.content = null;
  }

  /**
   * Open a Display Panel
   * @param {JQuery} element
   * @param {DisplayPanelOptions} options
   * @param {boolean} shadow
   * @param {boolean} previous
   * @param {boolean} next
   */
  open(element, options, shadow, isFirst, isLast) {

    if (!this.isOpen) {
      // create item display panel if one dosnt exist
      this.scope = options.scope.$new();
      this.scope.modalOpt = options;
      this.scope.shadow = shadow;
      this.scope.previousBtnStatus = isFirst;
      this.scope.nextBtnStatus = isLast;
      this.element = this.$compile('<div display-panel class="displayPanel"></div>')(this.scope);
      this.$document.find('body').append(this.element);
      this.isOpen = true;
    } else if (this.isHidden) {
      // add scope
      this.scope = options.scope.$new();
      this.scope.modalOpt = options;
      this.scope.shadow = shadow;
      this.scope.previousBtnStatus = isFirst;
      this.scope.nextBtnStatus = isLast;
      this.element = this.$compile(this.element)(this.scope);

      // show display panel again if its hidden (only applies to animate)
      this.scope.modalOpt = options;
      this.content.style.transform = 'translate(110%)';
      this.content.classList.add('display-panel-animate');
      this.$timeout(() => this.content.style.transform = 'translate(0)');
      this.isHidden = false;
    }
    else if (element !== this.current) {
      // update if display panel exists
      this.scope.modalOpt = options;
      this.scope.previousBtnStatus = isFirst;
      this.scope.nextBtnStatus = isLast;
    }
    this.current = element;
  }

  /**
   * Close a display panel
   * @param {DisplayPanelOptions} options
   */
  close(options) {
    if (options.animate) {
      //only hide if animate is true to avoid iddues with transitions then destroy scope
      this.content = this.element[0].querySelector('.display-panel');
      this.content.style.transform = 'translate(110%)';
      this.isHidden = true;
      this.scope.$destroy();
    } else {
      //remove item display panel
      this.element.remove();
      this.isOpen = false;
      this.scope.$destroy();
    }
  }

  /**
   * Determine if a display panel is open
   * @returns {boolean}
   */
  panelOpen() {
    return this.isOpen;
  }

  /**
   * Determine if a display panel is hidden
   * @returns {boolean}
   */
  panelHidden() {
    return this.isHidden;
  }

  /**
   * Get the current panel element
   * @returns {JQuery}
   */
  getCurrentPanel() {
    return this.current;
  }

  /**
   * Move to the previous display panel item
   * @param {string} selector
   */
  movePrev(selector) {
    if (this.current && this.current.length) {
      var prev = this.current.prevAll(selector).first();
      if (prev.length > 0) {
        prev.focus();
        this.current = prev;
      }
    }
  }

  /**
   * Move to the next display panel item
   * @param {string} selector
   */
  moveNext(selector) {
    if (this.current && this.current.length) {
      var next = this.current.nextAll(selector).first();
      if (next.length > 0) {
        next.focus();
        this.current = next;
      }
    }
  }
}

DisplayPanelService.$inject = ['$compile', '$timeout', '$document'];

/**
 * @typedef DisplayPanelOptions
 * @type {Object}
 * @property {string} title - Defines the Header title of the item display panel.
 * @property {string} main - Provides a path to a template representing item display panel content.
 * @property {string} footer - Provides a path to a template representing item display panel footer content.
 * @property {string} modalColumns - Classes defining the number of columns as per the grid system for a responsive item display panel or a class with a preset width.
 * @property {number} top - Defines the initial top position of the modal with respect to standard header, condensed header or toolbar.
 * @property {string} reference - Element id or class, item display panel is displayed in reference to this element after scroll.
 * @property {ng.IScope} scope - A scope instance to be used for the modal's main content.
 * @property {boolean} animate - A boolean value to set the panel to animate in and out of the screen.
 * @property {boolean} outsideClick - A boolean value to indicate whether or not clicking outside of the panel should close it.
 */