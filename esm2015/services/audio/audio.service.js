/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
export class AudioService {
    /**
     * @param {?} _http
     */
    constructor(_http) {
        this._http = _http;
    }
    /**
     * @param {?} mediaElement
     * @return {?}
     */
    getAudioFileMetadata(mediaElement) {
        return Observable.create((observer) => {
            this._http.get(mediaElement.src, { responseType: 'blob' }).subscribe(response => {
                const /** @type {?} */ filename = mediaElement.src.substring(mediaElement.src.lastIndexOf('/') + 1);
                const /** @type {?} */ extension = mediaElement.src.substring(mediaElement.src.lastIndexOf('.') + 1).toLowerCase();
                let /** @type {?} */ description;
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
                    size: response.size
                });
            });
        });
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getWaveformFromUrl(url) {
        // if audio context is not support return a stream of empty data
        if (!(/** @type {?} */ (window)).AudioContext) {
            return of([new Float32Array(0)]);
        }
        this._audioContext = new AudioContext();
        this.createVolumeNode();
        this.createAnalyserNode();
        return Observable.create((observer) => {
            // load the media from the URL provided
            this._http.get(url, { responseType: 'arraybuffer' }).subscribe(response => {
                this.getAudioBuffer(response).subscribe(audioBuffer => {
                    // create the buffer source
                    this.createBufferSource(audioBuffer);
                    let /** @type {?} */ dataPoints = [];
                    const /** @type {?} */ channels = this._audioBuffer.numberOfChannels;
                    // extract the data from each channel
                    for (let /** @type {?} */ channelIdx = 0; channelIdx < channels; channelIdx++) {
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
    /**
     * @param {?=} channels
     * @param {?=} skip
     * @return {?}
     */
    getWaveformPoints(channels = [], skip = 1000) {
        const /** @type {?} */ waveform = [];
        const /** @type {?} */ duration = channels.length > 0 ? channels[0].length : 0;
        // convert each channel data to a series of waveform points
        for (let /** @type {?} */ idx = 0; idx < duration; idx += skip) {
            // get all the channel data for a specific point
            const /** @type {?} */ points = channels.map(channel => channel[idx]);
            // find the minimum point and maximum points at each position across all channels
            waveform.push({
                min: points.reduce((previous, current) => current < previous ? current : previous),
                max: points.reduce((previous, current) => current > previous ? current : previous)
            });
        }
        return waveform;
    }
    /**
     * @param {?} arrayBuffer
     * @return {?}
     */
    getAudioBuffer(arrayBuffer) {
        return Observable.create((observer) => {
            this.getOfflineAudioContext().decodeAudioData(arrayBuffer, (audioBuffer) => {
                observer.next(audioBuffer);
                observer.complete();
            }, (error) => observer.error(error));
        });
    }
    /**
     * @return {?}
     */
    getOfflineAudioContext() {
        return new OfflineAudioContext(1, 2, this._audioContext.sampleRate || 44100);
    }
    /**
     * @param {?} audioBuffer
     * @return {?}
     */
    createBufferSource(audioBuffer) {
        this.disconnectSource();
        this._audioBuffer = audioBuffer;
        this._audioBufferSource = this._audioContext.createBufferSource();
        this._audioBufferSource.buffer = this._audioBuffer;
        this._audioBufferSource.connect(this._analyserNode);
    }
    /**
     * @return {?}
     */
    createVolumeNode() {
        this._gainNode = this._audioContext.createGain();
        this._gainNode.connect(this._audioContext.destination);
    }
    /**
     * @return {?}
     */
    createAnalyserNode() {
        this._analyserNode = this._audioContext.createAnalyser();
        this._analyserNode.connect(this._gainNode);
    }
    /**
     * @return {?}
     */
    disconnectSource() {
        if (this._audioBufferSource) {
            this._audioBufferSource.disconnect();
        }
    }
}
AudioService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AudioService.ctorParameters = () => [
    { type: HttpClient }
];
function AudioService_tsickle_Closure_declarations() {
    /** @type {?} */
    AudioService.prototype._audioBuffer;
    /** @type {?} */
    AudioService.prototype._audioBufferSource;
    /** @type {?} */
    AudioService.prototype._audioContext;
    /** @type {?} */
    AudioService.prototype._gainNode;
    /** @type {?} */
    AudioService.prototype._analyserNode;
    /** @type {?} */
    AudioService.prototype._http;
}
/**
 * @record
 */
export function WaveformPoint() { }
function WaveformPoint_tsickle_Closure_declarations() {
    /** @type {?} */
    WaveformPoint.prototype.min;
    /** @type {?} */
    WaveformPoint.prototype.max;
}
/**
 * @record
 */
export function AudioMetadata() { }
function AudioMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    AudioMetadata.prototype.filename;
    /** @type {?} */
    AudioMetadata.prototype.extension;
    /** @type {?} */
    AudioMetadata.prototype.description;
    /** @type {?} */
    AudioMetadata.prototype.size;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hdWRpby9hdWRpby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBSXhDLE1BQU07Ozs7SUFRRixZQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO0tBQUs7Ozs7O0lBRTFDLG9CQUFvQixDQUFDLFlBQThCO1FBQy9DLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBaUMsRUFBRSxFQUFFO1lBQzNELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBRTVFLHVCQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkYsdUJBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUVsRyxxQkFBSSxXQUFXLENBQUM7Z0JBRWhCLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hC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Q2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9vZic7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXVkaW9TZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgX2F1ZGlvQnVmZmVyOiBBdWRpb0J1ZmZlcjtcbiAgICBwcml2YXRlIF9hdWRpb0J1ZmZlclNvdXJjZTogQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xuICAgIHByaXZhdGUgX2F1ZGlvQ29udGV4dDogQXVkaW9Db250ZXh0O1xuICAgIHByaXZhdGUgX2dhaW5Ob2RlOiBHYWluTm9kZTtcbiAgICBwcml2YXRlIF9hbmFseXNlck5vZGU6IEFuYWx5c2VyTm9kZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQpIHsgfVxuXG4gICAgZ2V0QXVkaW9GaWxlTWV0YWRhdGEobWVkaWFFbGVtZW50OiBIVE1MTWVkaWFFbGVtZW50KTogT2JzZXJ2YWJsZTxBdWRpb01ldGFkYXRhPiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEF1ZGlvTWV0YWRhdGE+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9odHRwLmdldChtZWRpYUVsZW1lbnQuc3JjLCB7IHJlc3BvbnNlVHlwZTogJ2Jsb2InIH0pLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IG1lZGlhRWxlbWVudC5zcmMuc3Vic3RyaW5nKG1lZGlhRWxlbWVudC5zcmMubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IG1lZGlhRWxlbWVudC5zcmMuc3Vic3RyaW5nKG1lZGlhRWxlbWVudC5zcmMubGFzdEluZGV4T2YoJy4nKSArIDEpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVzY3JpcHRpb247XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV4dGVuc2lvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtcDMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSAnTVBFRyBhdWRpbyBsYXllciAzIGZpbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnd21hJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gJ1dpbmRvd3MgbWVkaWEgYXVkaW8gZmlsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICd3YXYnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSAnV0FWRSBhdWRpbyBmaWxlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ29nZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9ICdPZ2cgVm9yYmlzIGZpbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWFjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gJ0FkdmFuY2VkIGF1ZGlvIGNvZGluZyBmaWxlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21pZGknOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSAnTXVzaWNhbCBpbnN0cnVtZW50IGRpZ2l0YWwgaW50ZXJmYWNlIGZpbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gJ0F1ZGlvIGZpbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uOiBleHRlbnNpb24sXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogcmVzcG9uc2Uuc2l6ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFdhdmVmb3JtRnJvbVVybCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8RmxvYXQzMkFycmF5W10+IHtcblxuICAgICAgICAvLyBpZiBhdWRpbyBjb250ZXh0IGlzIG5vdCBzdXBwb3J0IHJldHVybiBhIHN0cmVhbSBvZiBlbXB0eSBkYXRhXG4gICAgICAgIGlmICghKDxhbnk+d2luZG93KS5BdWRpb0NvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBvZjxGbG9hdDMyQXJyYXlbXT4oW25ldyBGbG9hdDMyQXJyYXkoMCldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2F1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVWb2x1bWVOb2RlKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQW5hbHlzZXJOb2RlKCk7XG5cbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8RmxvYXQzMkFycmF5W10+KSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGxvYWQgdGhlIG1lZGlhIGZyb20gdGhlIFVSTCBwcm92aWRlZFxuICAgICAgICAgICAgdGhpcy5faHR0cC5nZXQodXJsLCB7IHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyB9KS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QXVkaW9CdWZmZXIocmVzcG9uc2UpLnN1YnNjcmliZShhdWRpb0J1ZmZlciA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBidWZmZXIgc291cmNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQnVmZmVyU291cmNlKGF1ZGlvQnVmZmVyKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YVBvaW50czogRmxvYXQzMkFycmF5W10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbm5lbHMgPSB0aGlzLl9hdWRpb0J1ZmZlci5udW1iZXJPZkNoYW5uZWxzO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dHJhY3QgdGhlIGRhdGEgZnJvbSBlYWNoIGNoYW5uZWxcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY2hhbm5lbElkeCA9IDA7IGNoYW5uZWxJZHggPCBjaGFubmVsczsgY2hhbm5lbElkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhUG9pbnRzW2NoYW5uZWxJZHhdID0gdGhpcy5fYXVkaW9CdWZmZXIuZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbElkeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGRhdGFQb2ludHMpO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgYWZ0ZXIgb3Vyc2VsdmVzXG4gICAgICAgICAgICAgICAgICAgIGRhdGFQb2ludHMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0V2F2ZWZvcm1Qb2ludHMoY2hhbm5lbHM6IEZsb2F0MzJBcnJheVtdID0gW10sIHNraXA6IG51bWJlciA9IDEwMDApOiBXYXZlZm9ybVBvaW50W10ge1xuXG4gICAgICAgIGNvbnN0IHdhdmVmb3JtOiBXYXZlZm9ybVBvaW50W10gPSBbXTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBjaGFubmVscy5sZW5ndGggPiAwID8gY2hhbm5lbHNbMF0ubGVuZ3RoIDogMDtcblxuICAgICAgICAvLyBjb252ZXJ0IGVhY2ggY2hhbm5lbCBkYXRhIHRvIGEgc2VyaWVzIG9mIHdhdmVmb3JtIHBvaW50c1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBkdXJhdGlvbjsgaWR4ICs9IHNraXApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGFsbCB0aGUgY2hhbm5lbCBkYXRhIGZvciBhIHNwZWNpZmljIHBvaW50XG4gICAgICAgICAgICBjb25zdCBwb2ludHMgPSBjaGFubmVscy5tYXAoY2hhbm5lbCA9PiBjaGFubmVsW2lkeF0pO1xuXG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBtaW5pbXVtIHBvaW50IGFuZCBtYXhpbXVtIHBvaW50cyBhdCBlYWNoIHBvc2l0aW9uIGFjcm9zcyBhbGwgY2hhbm5lbHNcbiAgICAgICAgICAgIHdhdmVmb3JtLnB1c2goe1xuICAgICAgICAgICAgICAgIG1pbjogcG9pbnRzLnJlZHVjZSgocHJldmlvdXMsIGN1cnJlbnQpID0+IGN1cnJlbnQgPCBwcmV2aW91cyA/IGN1cnJlbnQgOiBwcmV2aW91cyksXG4gICAgICAgICAgICAgICAgbWF4OiBwb2ludHMucmVkdWNlKChwcmV2aW91cywgY3VycmVudCkgPT4gY3VycmVudCA+IHByZXZpb3VzID8gY3VycmVudCA6IHByZXZpb3VzKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd2F2ZWZvcm07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRBdWRpb0J1ZmZlcihhcnJheUJ1ZmZlcjogQXJyYXlCdWZmZXIpOiBPYnNlcnZhYmxlPEF1ZGlvQnVmZmVyPiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEF1ZGlvQnVmZmVyPikgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRPZmZsaW5lQXVkaW9Db250ZXh0KCkuZGVjb2RlQXVkaW9EYXRhKGFycmF5QnVmZmVyLCAoYXVkaW9CdWZmZXI6IEF1ZGlvQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChhdWRpb0J1ZmZlcik7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPZmZsaW5lQXVkaW9Db250ZXh0KCk6IE9mZmxpbmVBdWRpb0NvbnRleHQge1xuICAgICAgICByZXR1cm4gbmV3IE9mZmxpbmVBdWRpb0NvbnRleHQoMSwgMiwgdGhpcy5fYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUgfHwgNDQxMDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQnVmZmVyU291cmNlKGF1ZGlvQnVmZmVyOiBBdWRpb0J1ZmZlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RTb3VyY2UoKTtcblxuICAgICAgICB0aGlzLl9hdWRpb0J1ZmZlciA9IGF1ZGlvQnVmZmVyO1xuICAgICAgICB0aGlzLl9hdWRpb0J1ZmZlclNvdXJjZSA9IHRoaXMuX2F1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgdGhpcy5fYXVkaW9CdWZmZXJTb3VyY2UuYnVmZmVyID0gdGhpcy5fYXVkaW9CdWZmZXI7XG4gICAgICAgIHRoaXMuX2F1ZGlvQnVmZmVyU291cmNlLmNvbm5lY3QodGhpcy5fYW5hbHlzZXJOb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVZvbHVtZU5vZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2dhaW5Ob2RlID0gdGhpcy5fYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgdGhpcy5fZ2Fpbk5vZGUuY29ubmVjdCh0aGlzLl9hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQW5hbHlzZXJOb2RlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hbmFseXNlck5vZGUgPSB0aGlzLl9hdWRpb0NvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcbiAgICAgICAgdGhpcy5fYW5hbHlzZXJOb2RlLmNvbm5lY3QodGhpcy5fZ2Fpbk5vZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzY29ubmVjdFNvdXJjZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2F1ZGlvQnVmZmVyU291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9hdWRpb0J1ZmZlclNvdXJjZS5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2F2ZWZvcm1Qb2ludCB7XG4gICAgbWluOiBudW1iZXI7XG4gICAgbWF4OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXVkaW9NZXRhZGF0YSB7XG4gICAgZmlsZW5hbWU6IHN0cmluZztcbiAgICBleHRlbnNpb246IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHNpemU6IG51bWJlcjtcbn0iXX0=