import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaPlayerModule } from './media-player.module';

@Component({
    selector: 'ux-media-player-audio',
    template: `<ux-media-player class="media-player" [type]="'audio'" [filename]="filename" [source]="audioSource"></ux-media-player>
    `
})

export class MediaPlayerAudioComponent {

    filename: string = null;
    audioSource = '';

    constructor() {
    }
}

describe('Media Player Component - Audio', () => {
    let component: MediaPlayerAudioComponent;
    let fixture: ComponentFixture<MediaPlayerAudioComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MediaPlayerModule],
            declarations: [MediaPlayerAudioComponent],
        })
            .compileComponents();
    }));

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
        component.audioSource = 'data:audio/mpeg;base64,/+MYxAAAAANIAAAAAExBTUUzLjk4LjIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
        component.filename = '';
        fixture.detectChanges();
        expect(getTitle()).toBeFalsy();
    });

    it('should display Display Name when one is added to the markup', () => {
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
        return (<HTMLElement>nativeElement.querySelector('.player-container .audio-player .audio-file-name')).innerText;
    }
});