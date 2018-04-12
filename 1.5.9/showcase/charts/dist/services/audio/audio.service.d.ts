import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
export declare class AudioService {
    private _http;
    private _audioBuffer;
    private _audioBufferSource;
    private _audioContext;
    private _gainNode;
    private _analyserNode;
    constructor(_http: Http);
    getAudioFileMetadata(mediaElement: HTMLMediaElement): Observable<AudioMetadata>;
    getWaveformFromUrl(url: string): Observable<Float32Array[]>;
    getWaveformPoints(channels?: Float32Array[], skip?: number): WaveformPoint[];
    private getAudioBuffer(arrayBuffer);
    private getOfflineAudioContext();
    private createBufferSource(audioBuffer);
    private createVolumeNode();
    private createAnalyserNode();
    private disconnectSource();
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
