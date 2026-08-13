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

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorServiceModule, colorSets } from '../../services/color';
import { MediaPlayerModule } from './media-player.module';

@Component({
  selector: 'ux-media-player-audio',
  template:
    '<ux-media-player class="media-player" type="audio" [filename]="filename" [source]="audioSource"></ux-media-player>',
  imports: [MediaPlayerModule],
})
export class MediaPlayerAudioComponent {
  filename: string = null;
  audioSource = '';
}

describe('Media Player Component - Audio', () => {
  let component: MediaPlayerAudioComponent;
  let fixture: ComponentFixture<MediaPlayerAudioComponent>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MediaPlayerModule,
        ColorServiceModule.forRoot(colorSets.keppel),
        MediaPlayerAudioComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPlayerAudioComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should initialise correctly', () => {
    expect(component).toBeTruthy();
  });

  it('should not display any title when a base64 file type is used', () => {
    component.audioSource =
      'data:audio/mpeg;base64,/+MYxAAAAANIAAAAAExBTUUzLjk4LjIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    component.filename = '';
    fixture.detectChanges();
    expect(getTitle()).toBe('');
  });

  it('should display Display Name when one is added to the mark up', () => {
    component.filename = 'Display Name';
    fixture.detectChanges();
    expect(getTitle()).toBe('Display Name');
  });

  it('should display the filename when a file is used', (done: DoneFn) => {
    component.filename = '';
    component.audioSource = 'https://uxaspects.github.io/UXAspects/assets/Ocean-Waves.mp3';
    fixture.detectChanges();

    setTimeout(() => {
      fixture.detectChanges();
      expect(getTitle()).toBe('Ocean-Waves.mp3');
      done();
    }, 2000);
  });

  function getTitle(): string {
    return nativeElement.querySelector<HTMLParagraphElement>(
      '.player-container .audio-player .audio-file-name'
    ).innerText;
  }
});
