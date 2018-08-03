/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
var AudioService = /** @class */ (function () {
    function AudioService(_http) {
        this._http = _http;
    }
    /**
     * @param {?} mediaElement
     * @return {?}
     */
    AudioService.prototype.getAudioFileMetadata = /**
     * @param {?} mediaElement
     * @return {?}
     */
    function (mediaElement) {
        var _this = this;
        return Observable.create(function (observer) {
            _this._http.get(mediaElement.src, { responseType: 'blob' }).subscribe(function (response) {
                var /** @type {?} */ filename = mediaElement.src.substring(mediaElement.src.lastIndexOf('/') + 1);
                var /** @type {?} */ extension = mediaElement.src.substring(mediaElement.src.lastIndexOf('.') + 1).toLowerCase();
                var /** @type {?} */ description;
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
    };
    /**
     * @param {?} url
     * @return {?}
     */
    AudioService.prototype.getWaveformFromUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var _this = this;
        // if audio context is not support return a stream of empty data
        if (!(/** @type {?} */ (window)).AudioContext) {
            return of([new Float32Array(0)]);
        }
        this._audioContext = new AudioContext();
        this.createVolumeNode();
        this.createAnalyserNode();
        return Observable.create(function (observer) {
            // load the media from the URL provided
            // load the media from the URL provided
            _this._http.get(url, { responseType: 'arraybuffer' }).subscribe(function (response) {
                _this.getAudioBuffer(response).subscribe(function (audioBuffer) {
                    // create the buffer source
                    // create the buffer source
                    _this.createBufferSource(audioBuffer);
                    var /** @type {?} */ dataPoints = [];
                    var /** @type {?} */ channels = _this._audioBuffer.numberOfChannels;
                    // extract the data from each channel
                    for (var /** @type {?} */ channelIdx = 0; channelIdx < channels; channelIdx++) {
                        dataPoints[channelIdx] = _this._audioBuffer.getChannelData(channelIdx);
                    }
                    observer.next(dataPoints);
                    observer.complete();
                    // cleanup after ourselves
                    dataPoints = null;
                }, function (error) { return observer.error(error); });
            }, function (error) { return observer.error(error); });
        });
    };
    /**
     * @param {?=} channels
     * @param {?=} skip
     * @return {?}
     */
    AudioService.prototype.getWaveformPoints = /**
     * @param {?=} channels
     * @param {?=} skip
     * @return {?}
     */
    function (channels, skip) {
        if (channels === void 0) { channels = []; }
        if (skip === void 0) { skip = 1000; }
        var /** @type {?} */ waveform = [];
        var /** @type {?} */ duration = channels.length > 0 ? channels[0].length : 0;
        var _loop_1 = function (idx) {
            // get all the channel data for a specific point
            var /** @type {?} */ points = channels.map(function (channel) { return channel[idx]; });
            // find the minimum point and maximum points at each position across all channels
            waveform.push({
                min: points.reduce(function (previous, current) { return current < previous ? current : previous; }),
                max: points.reduce(function (previous, current) { return current > previous ? current : previous; })
            });
        };
        // convert each channel data to a series of waveform points
        for (var /** @type {?} */ idx = 0; idx < duration; idx += skip) {
            _loop_1(idx);
        }
        return waveform;
    };
    /**
     * @param {?} arrayBuffer
     * @return {?}
     */
    AudioService.prototype.getAudioBuffer = /**
     * @param {?} arrayBuffer
     * @return {?}
     */
    function (arrayBuffer) {
        var _this = this;
        return Observable.create(function (observer) {
            _this.getOfflineAudioContext().decodeAudioData(arrayBuffer, function (audioBuffer) {
                observer.next(audioBuffer);
                observer.complete();
            }, function (error) { return observer.error(error); });
        });
    };
    /**
     * @return {?}
     */
    AudioService.prototype.getOfflineAudioContext = /**
     * @return {?}
     */
    function () {
        return new OfflineAudioContext(1, 2, this._audioContext.sampleRate || 44100);
    };
    /**
     * @param {?} audioBuffer
     * @return {?}
     */
    AudioService.prototype.createBufferSource = /**
     * @param {?} audioBuffer
     * @return {?}
     */
    function (audioBuffer) {
        this.disconnectSource();
        this._audioBuffer = audioBuffer;
        this._audioBufferSource = this._audioContext.createBufferSource();
        this._audioBufferSource.buffer = this._audioBuffer;
        this._audioBufferSource.connect(this._analyserNode);
    };
    /**
     * @return {?}
     */
    AudioService.prototype.createVolumeNode = /**
     * @return {?}
     */
    function () {
        this._gainNode = this._audioContext.createGain();
        this._gainNode.connect(this._audioContext.destination);
    };
    /**
     * @return {?}
     */
    AudioService.prototype.createAnalyserNode = /**
     * @return {?}
     */
    function () {
        this._analyserNode = this._audioContext.createAnalyser();
        this._analyserNode.connect(this._gainNode);
    };
    /**
     * @return {?}
     */
    AudioService.prototype.disconnectSource = /**
     * @return {?}
     */
    function () {
        if (this._audioBufferSource) {
            this._audioBufferSource.disconnect();
        }
    };
    AudioService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AudioService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    return AudioService;
}());
export { AudioService };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hdWRpby9hdWRpby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztJQVlwQyxzQkFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtLQUFLOzs7OztJQUUxQywyQ0FBb0I7Ozs7SUFBcEIsVUFBcUIsWUFBOEI7UUFBbkQsaUJBK0NDO1FBOUNHLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBaUM7WUFDdkQsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLFFBQVE7Z0JBRXpFLHFCQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkYscUJBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUVsRyxxQkFBSSxXQUFXLENBQUM7Z0JBRWhCLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLEtB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LElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3hDOzs7Z0JBMUpSLFVBQVU7Ozs7Z0JBTkYsVUFBVTs7dUJBQW5COztTQU9hLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9vZic7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXVkaW9TZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgX2F1ZGlvQnVmZmVyOiBBdWRpb0J1ZmZlcjtcbiAgICBwcml2YXRlIF9hdWRpb0J1ZmZlclNvdXJjZTogQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xuICAgIHByaXZhdGUgX2F1ZGlvQ29udGV4dDogQXVkaW9Db250ZXh0O1xuICAgIHByaXZhdGUgX2dhaW5Ob2RlOiBHYWluTm9kZTtcbiAgICBwcml2YXRlIF9hbmFseXNlck5vZGU6IEFuYWx5c2VyTm9kZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQpIHsgfVxuXG4gICAgZ2V0QXVkaW9GaWxlTWV0YWRhdGEobWVkaWFFbGVtZW50OiBIVE1MTWVkaWFFbGVtZW50KTogT2JzZXJ2YWJsZTxBdWRpb01ldGFkYXRhPiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEF1ZGlvTWV0YWRhdGE+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9odHRwLmdldChtZWRpYUVsZW1lbnQuc3JjLCB7IHJlc3BvbnNlVHlwZTogJ2Jsb2InIH0pLnN1YnNjcmliZShyZXNwb25zZSA9PiB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlbmFtZSA9IG1lZGlhRWxlbWVudC5zcmMuc3Vic3RyaW5nKG1lZGlhRWxlbWVudC5zcmMubGFzdEluZGV4T2YoJy8nKSArIDEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IG1lZGlhRWxlbWVudC5zcmMuc3Vic3RyaW5nKG1lZGlhRWxlbWVudC5zcmMubGFzdEluZGV4T2YoJy4nKSArIDEpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVzY3JpcHRpb247XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGV4dGVuc2lvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtcDMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSAnTVBFRyBhdWRpbyBsYXllciAzIGZpbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnd21hJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gJ1dpbmRvd3MgbWVkaWEgYXVkaW8gZmlsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICd3YXYnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSAnV0FWRSBhdWRpbyBmaWxlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ29nZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9ICdPZ2cgVm9yYmlzIGZpbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYWFjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gJ0FkdmFuY2VkIGF1ZGlvIGNvZGluZyBmaWxlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21pZGknOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSAnTXVzaWNhbCBpbnN0cnVtZW50IGRpZ2l0YWwgaW50ZXJmYWNlIGZpbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gJ0F1ZGlvIGZpbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCh7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9uOiBleHRlbnNpb24sXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogcmVzcG9uc2Uuc2l6ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFdhdmVmb3JtRnJvbVVybCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8RmxvYXQzMkFycmF5W10+IHtcblxuICAgICAgICAvLyBpZiBhdWRpbyBjb250ZXh0IGlzIG5vdCBzdXBwb3J0IHJldHVybiBhIHN0cmVhbSBvZiBlbXB0eSBkYXRhXG4gICAgICAgIGlmICghKDxhbnk+d2luZG93KS5BdWRpb0NvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBvZjxGbG9hdDMyQXJyYXlbXT4oW25ldyBGbG9hdDMyQXJyYXkoMCldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2F1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVWb2x1bWVOb2RlKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQW5hbHlzZXJOb2RlKCk7XG5cbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8RmxvYXQzMkFycmF5W10+KSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGxvYWQgdGhlIG1lZGlhIGZyb20gdGhlIFVSTCBwcm92aWRlZFxuICAgICAgICAgICAgdGhpcy5faHR0cC5nZXQodXJsLCB7IHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyB9KS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0QXVkaW9CdWZmZXIocmVzcG9uc2UpLnN1YnNjcmliZShhdWRpb0J1ZmZlciA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBidWZmZXIgc291cmNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQnVmZmVyU291cmNlKGF1ZGlvQnVmZmVyKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YVBvaW50czogRmxvYXQzMkFycmF5W10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbm5lbHMgPSB0aGlzLl9hdWRpb0J1ZmZlci5udW1iZXJPZkNoYW5uZWxzO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dHJhY3QgdGhlIGRhdGEgZnJvbSBlYWNoIGNoYW5uZWxcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY2hhbm5lbElkeCA9IDA7IGNoYW5uZWxJZHggPCBjaGFubmVsczsgY2hhbm5lbElkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhUG9pbnRzW2NoYW5uZWxJZHhdID0gdGhpcy5fYXVkaW9CdWZmZXIuZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbElkeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGRhdGFQb2ludHMpO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgYWZ0ZXIgb3Vyc2VsdmVzXG4gICAgICAgICAgICAgICAgICAgIGRhdGFQb2ludHMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0V2F2ZWZvcm1Qb2ludHMoY2hhbm5lbHM6IEZsb2F0MzJBcnJheVtdID0gW10sIHNraXA6IG51bWJlciA9IDEwMDApOiBXYXZlZm9ybVBvaW50W10ge1xuXG4gICAgICAgIGNvbnN0IHdhdmVmb3JtOiBXYXZlZm9ybVBvaW50W10gPSBbXTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBjaGFubmVscy5sZW5ndGggPiAwID8gY2hhbm5lbHNbMF0ubGVuZ3RoIDogMDtcblxuICAgICAgICAvLyBjb252ZXJ0IGVhY2ggY2hhbm5lbCBkYXRhIHRvIGEgc2VyaWVzIG9mIHdhdmVmb3JtIHBvaW50c1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBkdXJhdGlvbjsgaWR4ICs9IHNraXApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGFsbCB0aGUgY2hhbm5lbCBkYXRhIGZvciBhIHNwZWNpZmljIHBvaW50XG4gICAgICAgICAgICBjb25zdCBwb2ludHMgPSBjaGFubmVscy5tYXAoY2hhbm5lbCA9PiBjaGFubmVsW2lkeF0pO1xuXG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBtaW5pbXVtIHBvaW50IGFuZCBtYXhpbXVtIHBvaW50cyBhdCBlYWNoIHBvc2l0aW9uIGFjcm9zcyBhbGwgY2hhbm5lbHNcbiAgICAgICAgICAgIHdhdmVmb3JtLnB1c2goe1xuICAgICAgICAgICAgICAgIG1pbjogcG9pbnRzLnJlZHVjZSgocHJldmlvdXMsIGN1cnJlbnQpID0+IGN1cnJlbnQgPCBwcmV2aW91cyA/IGN1cnJlbnQgOiBwcmV2aW91cyksXG4gICAgICAgICAgICAgICAgbWF4OiBwb2ludHMucmVkdWNlKChwcmV2aW91cywgY3VycmVudCkgPT4gY3VycmVudCA+IHByZXZpb3VzID8gY3VycmVudCA6IHByZXZpb3VzKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd2F2ZWZvcm07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRBdWRpb0J1ZmZlcihhcnJheUJ1ZmZlcjogQXJyYXlCdWZmZXIpOiBPYnNlcnZhYmxlPEF1ZGlvQnVmZmVyPiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEF1ZGlvQnVmZmVyPikgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRPZmZsaW5lQXVkaW9Db250ZXh0KCkuZGVjb2RlQXVkaW9EYXRhKGFycmF5QnVmZmVyLCAoYXVkaW9CdWZmZXI6IEF1ZGlvQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChhdWRpb0J1ZmZlcik7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPZmZsaW5lQXVkaW9Db250ZXh0KCk6IE9mZmxpbmVBdWRpb0NvbnRleHQge1xuICAgICAgICByZXR1cm4gbmV3IE9mZmxpbmVBdWRpb0NvbnRleHQoMSwgMiwgdGhpcy5fYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUgfHwgNDQxMDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQnVmZmVyU291cmNlKGF1ZGlvQnVmZmVyOiBBdWRpb0J1ZmZlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RTb3VyY2UoKTtcblxuICAgICAgICB0aGlzLl9hdWRpb0J1ZmZlciA9IGF1ZGlvQnVmZmVyO1xuICAgICAgICB0aGlzLl9hdWRpb0J1ZmZlclNvdXJjZSA9IHRoaXMuX2F1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgdGhpcy5fYXVkaW9CdWZmZXJTb3VyY2UuYnVmZmVyID0gdGhpcy5fYXVkaW9CdWZmZXI7XG4gICAgICAgIHRoaXMuX2F1ZGlvQnVmZmVyU291cmNlLmNvbm5lY3QodGhpcy5fYW5hbHlzZXJOb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVZvbHVtZU5vZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2dhaW5Ob2RlID0gdGhpcy5fYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgdGhpcy5fZ2Fpbk5vZGUuY29ubmVjdCh0aGlzLl9hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQW5hbHlzZXJOb2RlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hbmFseXNlck5vZGUgPSB0aGlzLl9hdWRpb0NvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcbiAgICAgICAgdGhpcy5fYW5hbHlzZXJOb2RlLmNvbm5lY3QodGhpcy5fZ2Fpbk5vZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzY29ubmVjdFNvdXJjZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2F1ZGlvQnVmZmVyU291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9hdWRpb0J1ZmZlclNvdXJjZS5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2F2ZWZvcm1Qb2ludCB7XG4gICAgbWluOiBudW1iZXI7XG4gICAgbWF4OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXVkaW9NZXRhZGF0YSB7XG4gICAgZmlsZW5hbWU6IHN0cmluZztcbiAgICBleHRlbnNpb246IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHNpemU6IG51bWJlcjtcbn0iXX0=