import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/of';

@Injectable()
export class AudioService {

    private _audioBuffer: AudioBuffer;
    private _audioBufferSource: AudioBufferSourceNode;
    private _audioContext: AudioContext;
    private _gainNode: GainNode;
    private _analyserNode: AnalyserNode;

    constructor(private _http: Http) { }

    getAudioFileMetadata(mediaElement: HTMLMediaElement): Observable<AudioMetadata> {
        return Observable.create((observer: Observer<AudioMetadata>) => {
            this._http.request(mediaElement.src, { responseType: ResponseContentType.Blob }).subscribe(response => {

                let filename = mediaElement.src.substring(mediaElement.src.lastIndexOf('/') + 1);
                let extension = mediaElement.src.substring(mediaElement.src.lastIndexOf('.') + 1).toLowerCase();
                let blob = response.blob();
                let description;

                switch (extension) {
                    case 'mp3':
                        description = 'MPEG audio layer 3 file';
                        break;

                    case 'wma':
                        description = 'Windows media audio file';
                        break;

                    case 'wav':
                        description = 'WAVE audio file';
                        break;

                    case 'ogg':
                        description = 'Ogg Vorbis file';
                        break;

                    case 'aac':
                        description = 'Advanced audio coding file';
                        break;

                    case 'midi':
                        description = 'Musical instrument digital interface file';
                        break;

                    default:
                        description = 'Audio file';
                        break;
                }

                observer.next({
                    filename: filename,
                    extension: extension,
                    description: description,
                    size: blob.size
                });
            });
        });
    }

    getWaveformFromUrl(url: string): Observable<Float32Array[]> {

        // if audio context is not support return a stream of empty data
        if (!(<any>window).AudioContext) {
            return Observable.of<Float32Array[]>([new Float32Array(0)]);
        }

        this._audioContext = new AudioContext();
        this.createVolumeNode();
        this.createAnalyserNode();

        return Observable.create((observer: Observer<Float32Array[]>) => {

            // load the media from the URL provided
            this._http.request(url, { responseType: ResponseContentType.ArrayBuffer }).subscribe(response => {
                this.getAudioBuffer(response.arrayBuffer()).subscribe(audioBuffer => {

                    // create the buffer source
                    this.createBufferSource(audioBuffer);

                    let dataPoints: Float32Array[] = [];
                    let channels = this._audioBuffer.numberOfChannels;

                    // extract the data from each channel
                    for (let channelIdx = 0; channelIdx < channels; channelIdx++) {
                        dataPoints[channelIdx] = this._audioBuffer.getChannelData(channelIdx);
                    }

                    observer.next(dataPoints);
                    observer.complete();

                    // cleanup after ourselves
                    dataPoints = null;
                }, (error) => observer.error(error));
            }, (error) => observer.error(error));
        });
    }

    getWaveformPoints(channels: Float32Array[] = [], skip: number = 1000): WaveformPoint[] {

        let waveform: WaveformPoint[] = [];
        let duration = channels.length > 0 ? channels[0].length : 0;

        // convert each channel data to a series of waveform points
        for (let idx = 0; idx < duration; idx += skip) {

            // get all the channel data for a specific point
            let points = channels.map(channel => channel[idx]);

            // find the minimum point and maximum points at each position across all channels
            waveform.push({
                min: points.reduce((previous, current) => current < previous ? current : previous),
                max: points.reduce((previous, current) => current > previous ? current : previous)
            });
        }

        return waveform;
    }

    private getAudioBuffer(arrayBuffer: ArrayBuffer): Observable<AudioBuffer> {
        return Observable.create((observer: Observer<AudioBuffer>) => {
            this.getOfflineAudioContext().decodeAudioData(arrayBuffer, (audioBuffer: AudioBuffer) => {
                observer.next(audioBuffer);
                observer.complete();
            }, (error) => observer.error(error));
        });
    }

    private getOfflineAudioContext(): OfflineAudioContext {
        return new OfflineAudioContext(1, 2, this._audioContext.sampleRate || 44100);
    }

    private createBufferSource(audioBuffer: AudioBuffer): void {
        this.disconnectSource();

        this._audioBuffer = audioBuffer;
        this._audioBufferSource = this._audioContext.createBufferSource();
        this._audioBufferSource.buffer = this._audioBuffer;
        this._audioBufferSource.connect(this._analyserNode);
    }

    private createVolumeNode(): void {
        this._gainNode = this._audioContext.createGain();
        this._gainNode.connect(this._audioContext.destination);
    }

    private createAnalyserNode(): void {
        this._analyserNode = this._audioContext.createAnalyser();
        this._analyserNode.connect(this._gainNode);
    }

    private disconnectSource(): void {
        if (this._audioBufferSource) {
            this._audioBufferSource.disconnect();
        }
    }
}

export interface WaveformPoint {
    min: number;
    max: number;
}

export interface AudioMetadata {
    filename: string;
    extension: string;
    description: string;
    size: number;
}