import { TagInputEvent } from './tag-input-event';
import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef, ChangeDetectorRef, TemplateRef } from '@angular/core';

@Component({
    selector: 'ux-tag-input',
    templateUrl: 'tag-input.component.html',
    host: {
        '[class.focus]': 'hasFocus()'
    }
})
export class TagInputComponent implements OnInit {

    @Input('tags') private _tags: any[] = [];
    get tags() {
        return this._tags;
    }
    set tags(value: any[]) {
        this._tags = value;
        this.tagsChange.emit(value);
    }

    @Output() tagsChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    @Input('input') private _input: string = '';
    get input() {
        return this._input;
    }
    set input(value: string) {
        this._input = value;
        this.inputChange.emit(value);
    }

    @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();

    @Input() displayProperty: string = null;
    @Input() tagTemplate: TemplateRef<any>;
    @Input('createTag') createTagHandler: (value: string) => any;
    @Input('validateTag') validateTagHandler: (value: string) => string;
    @Input() tagDelimiters: string = '';
    @Input() addOnPaste: boolean = true;
    @Input() maxTags: number = Number.MAX_VALUE;
    @Input() placeholder: string = '';

    @Output() tagAdding: EventEmitter<TagInputEvent> = new EventEmitter<TagInputEvent>();
    @Output() tagAdded: EventEmitter<TagInputEvent> = new EventEmitter<TagInputEvent>();
    @Output() tagInvalidated: EventEmitter<TagInputEvent> = new EventEmitter<TagInputEvent>();
    @Output() tagRemoving: EventEmitter<TagInputEvent> = new EventEmitter<TagInputEvent>();
    @Output() tagRemoved: EventEmitter<TagInputEvent> = new EventEmitter<TagInputEvent>();
    @Output() tagClick: EventEmitter<TagInputEvent> = new EventEmitter<TagInputEvent>();

    @ViewChild('tagInput') tagInput: ElementRef;
    @ViewChild('defaultTagTemplate') defaultTagTemplate: TemplateRef<any>;

    selectedIndex: number = -1;

    tagApi: TagApi = {
        getTagDisplay: this.getTagDisplay.bind(this),
        removeTagAt: this.removeTagAt.bind(this)
    };

    constructor(private element: ElementRef, private changeDetector: ChangeDetectorRef) {}

    ngOnInit() {
        if (!this.tagTemplate) {
            this.tagTemplate = this.defaultTagTemplate;
        }
    }

    @HostListener('keydown', ['$event'])
    keyHandler(event: KeyboardEvent) {
        const inputCursorPos = this.tagInput.nativeElement.selectionStart;
        const hasSelection = this.tagInput.nativeElement.selectionStart !== this.tagInput.nativeElement.selectionEnd;
        const inputLength = this.input ? this.input.length : 0;
        const canNavigateLeft = this.isValidTagIndex(this.selectedIndex) || (inputCursorPos <= 0 && !hasSelection);
        const canNavigateRight = this.isValidTagIndex(this.selectedIndex) || (inputCursorPos >= inputLength && !hasSelection);
        switch (event.key) {
            case 'Enter':
                this.commitInput();
                event.stopPropagation();
                break;
            case 'Backspace':
                if (canNavigateLeft) {
                    this.backspace();
                    event.stopPropagation();
                    event.preventDefault();
                }
                break;
            case 'ArrowLeft':
                if (canNavigateLeft) {
                    this.moveSelection(-1);
                    event.stopPropagation();
                    event.preventDefault();
                }
                break;
            case 'ArrowRight':
                if (canNavigateRight) {
                    this.moveSelection(1);
                    event.stopPropagation();
                    event.preventDefault();
                }
                break;
        }

        if (this.tagDelimiters && this.tagDelimiters.indexOf(event.key) >= 0) {
            this.commitInput();
            event.stopPropagation();
            event.preventDefault();
        }
    }

    @HostListener('focusout', ['$event'])
    focusOutHandler(event: FocusEvent) {
        if (!this.element.nativeElement.contains(event.relatedTarget)) {
            this.selectedIndex = -1;
        }
    }

    tagClickHandler(event: MouseEvent, tag: any) {
        const tagClickEvent = new TagInputEvent(tag);
        this.tagClick.emit(tagClickEvent);
        if (tagClickEvent.defaultPrevented) {
            event.preventDefault();
        }
    }

    paste(event: ClipboardEvent) {
        if (this.addOnPaste) {
            let input: string = null;
            if (event.clipboardData) {
                input = event.clipboardData.getData('text/plain');
            } else if ((<any>window).clipboardData) {
                // Internet Explorer only
                input = (<any>window).clipboardData.getData('Text');
            }

            if (this.commit(input)) {
                this.selectInput();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }

    commitInput() {
        if (this.commit(this.input)) {
            this.selectInput();
            this.input = '';
        }
    }

    commit(input: string): boolean {
        if (input) {
            const newTags = this.splitTagInput(input);
            let allValid = true;
            for (let newTag of newTags) {
                const valid = this.validateTag(newTag);
                if (!valid) {
                    allValid = false;
                }
            }

            if (allValid) {
                for (let newTag of newTags) {
                    this.addTag(newTag);
                }

                return true;
            }
        }

        return false;
    }

    backspace() {
        if (!this.isValidTagIndex(this.selectedIndex)) {
            this.selectTagAt(this.tags.length - 1);
        } else {
            this.removeTagAt(this.selectedIndex);
        }
    }

    moveSelection(d: number) {
        if (this.isValidSelectIndex(this.selectedIndex)) {
            this.selectedIndex += d;

            // Do wrapping of selection when out of bounds
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.tags.length;
            } else if (this.selectedIndex > this.tags.length) {
                this.selectedIndex = 0;
            }
        }
    }

    getTagDisplay(tag: any): string {
        return this.displayProperty ? tag[this.displayProperty] : tag;
    }

    isSelected(index: number): boolean {
        return index === this.selectedIndex;
    }

    selectTagAt(tagIndex: number) {
        if (this.isValidTagIndex(tagIndex)) {
            this.selectedIndex = tagIndex;
        }
    }

    selectInput() {
        this.selectedIndex = this.tags.length;
    }

    removeTagAt(tagIndex: number) {
        if (this.isValidTagIndex(tagIndex)) {
            const tag = this.tags[tagIndex];
            const tagRemovingEvent = new TagInputEvent(tag);
            this.tagRemoving.emit(tagRemovingEvent);
            if (!tagRemovingEvent.defaultPrevented()) {
                this.tags.splice(tagIndex, 1);
                this.changeDetector.detectChanges();
                this.selectInput();
                this.tagRemoved.emit(new TagInputEvent(tag));
            }
        }
    }

    hasFocus(): boolean {
        return this.isValidSelectIndex(this.selectedIndex);
    }

    private validateTag(tagValue: string): boolean {
        let validationResult: string = null;
        if (this.validateTagHandler && typeof this.validateTagHandler === 'function') {
            validationResult = this.validateTagHandler(tagValue);
        }
        if (typeof validationResult === 'string') {
            // TODO: add validation error
            console.warn(`Invalid tag "${tagValue}": ${validationResult}`);
            this.tagInvalidated.emit(new TagInputEvent(tagValue));
        }

        return (validationResult === null);
    }

    private addTag(tagValue: string) {
        let newTag = null;
        if (this.createTagHandler && typeof this.createTagHandler === 'function') {
            newTag = this.createTagHandler(tagValue);
        } else if (this.displayProperty) {
            newTag = {};
            newTag[this.displayProperty] = tagValue;
        } else {
            newTag = tagValue;
        }

        if (newTag) {
            // Verify that the new tag can be displayed
            const displayValue = this.getTagDisplay(newTag);
            if (displayValue && typeof displayValue === 'string' && displayValue.length > 0) {
                const tagAddingEvent = new TagInputEvent(newTag);
                this.tagAdding.emit(tagAddingEvent);
                if (!tagAddingEvent.defaultPrevented()) {
                    this.tags.push(newTag);
                    this.tagAdded.emit(new TagInputEvent(newTag));
                }
            }
        }
    }

    private isValidTagIndex(tagIndex: number): boolean {
        return tagIndex >= 0 && tagIndex < this.tags.length;
    }

    private isValidSelectIndex(index: number): boolean {
        return index >= 0 && index <= this.tags.length;
    }

    private splitTagInput(input: string): string[] {
        let tagValues = [input];
        if (this.tagDelimiters && typeof this.tagDelimiters === 'string') {
            const escapedDelimiters = this.tagDelimiters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const delimiterRegex = new RegExp(`[${escapedDelimiters}]`, 'g');
            tagValues = input.split(delimiterRegex).filter((s) => s.length > 0);
        }
        return tagValues;
    }
}

export interface TagApi {
    getTagDisplay: (tag: any) => string;
    removeTagAt: (index: number) => void;
}
