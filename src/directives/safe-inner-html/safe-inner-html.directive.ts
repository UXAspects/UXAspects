import { Directive, HostBinding, Input, SecurityContext, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
  standalone: true,
  selector: '[uxSafeInnerHtml]',
})
export class SafeInnerHtmlDirective {
  private readonly _sanitizer = inject(DomSanitizer);

  @HostBinding('innerHtml')
  protected safeHtml?: SafeHtml;

  @Input('uxSafeInnerHtml') set safeInnerHtml(value: string) {
    // Angular's DomSanitizer allows anchor tags, however it does remove any dangerous attributes. That being said
    // we still want to escape any anchor tags regardless.
    value = value.replace(/<a/g, '&lt;a').replace(/<\/a>/g, '&lt;/a&gt;');

    this.safeHtml = this._sanitizer.sanitize(SecurityContext.HTML, value);
  }
}
