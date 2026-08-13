///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

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
