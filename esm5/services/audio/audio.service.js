/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
var AudioService = (function () {
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
            _this._http.request(mediaElement.src, { responseType: ResponseContentType.Blob }).subscribe(function (response) {
                var /** @type {?} */ filename = mediaElement.src.substring(mediaElement.src.lastIndexOf('/') + 1);
                var /** @type {?} */ extension = mediaElement.src.substring(mediaElement.src.lastIndexOf('.') + 1).toLowerCase();
                var /** @type {?} */ blob = response.blob();
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
                    size: blob.size
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
            _this._http.request(url, { responseType: ResponseContentType.ArrayBuffer }).subscribe(function (response) {
                _this.getAudioBuffer(response.arrayBuffer()).subscribe(function (audioBuffer) {
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
        { type: Injectable },
    ];
    /** @nocollapse */
    AudioService.ctorParameters = function () { return [
        { type: Http, },
    ]; };
    return AudioService;
}());
export { AudioService };
function AudioService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AudioService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AudioService.ctorParameters;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hdWRpby9hdWRpby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7SUFZcEMsc0JBQW9CLEtBQVc7UUFBWCxVQUFLLEdBQUwsS0FBSyxDQUFNO0tBQUs7Ozs7O0lBRXBDLDJDQUFvQjs7OztJQUFwQixVQUFxQixZQUE4QjtRQUFuRCxpQkErQ0M7UUE5Q0csTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFpQztZQUN2RCxLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsUUFBUTtnQkFFL0YscUJBQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuRixxQkFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2xHLHFCQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzdC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QUd2Qyx1Q0FBZ0I7Ozs7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDeEM7OztnQkExSlIsVUFBVTs7OztnQkFMRixJQUFJOzt1QkFEYjs7U0FPYSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2VDb250ZW50VHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBvZiB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZS9vZic7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvT2JzZXJ2ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXVkaW9TZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgX2F1ZGlvQnVmZmVyOiBBdWRpb0J1ZmZlcjtcbiAgICBwcml2YXRlIF9hdWRpb0J1ZmZlclNvdXJjZTogQXVkaW9CdWZmZXJTb3VyY2VOb2RlO1xuICAgIHByaXZhdGUgX2F1ZGlvQ29udGV4dDogQXVkaW9Db250ZXh0O1xuICAgIHByaXZhdGUgX2dhaW5Ob2RlOiBHYWluTm9kZTtcbiAgICBwcml2YXRlIF9hbmFseXNlck5vZGU6IEFuYWx5c2VyTm9kZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHApIHsgfVxuXG4gICAgZ2V0QXVkaW9GaWxlTWV0YWRhdGEobWVkaWFFbGVtZW50OiBIVE1MTWVkaWFFbGVtZW50KTogT2JzZXJ2YWJsZTxBdWRpb01ldGFkYXRhPiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEF1ZGlvTWV0YWRhdGE+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9odHRwLnJlcXVlc3QobWVkaWFFbGVtZW50LnNyYywgeyByZXNwb25zZVR5cGU6IFJlc3BvbnNlQ29udGVudFR5cGUuQmxvYiB9KS5zdWJzY3JpYmUocmVzcG9uc2UgPT4ge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBtZWRpYUVsZW1lbnQuc3JjLnN1YnN0cmluZyhtZWRpYUVsZW1lbnQuc3JjLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSBtZWRpYUVsZW1lbnQuc3JjLnN1YnN0cmluZyhtZWRpYUVsZW1lbnQuc3JjLmxhc3RJbmRleE9mKCcuJykgKyAxKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2IgPSByZXNwb25zZS5ibG9iKCk7XG4gICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChleHRlbnNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbXAzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gJ01QRUcgYXVkaW8gbGF5ZXIgMyBmaWxlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dtYSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9ICdXaW5kb3dzIG1lZGlhIGF1ZGlvIGZpbGUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnd2F2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gJ1dBVkUgYXVkaW8gZmlsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdvZ2cnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb24gPSAnT2dnIFZvcmJpcyBmaWxlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2FhYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9ICdBZHZhbmNlZCBhdWRpbyBjb2RpbmcgZmlsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdtaWRpJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uID0gJ011c2ljYWwgaW5zdHJ1bWVudCBkaWdpdGFsIGludGVyZmFjZSBmaWxlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiA9ICdBdWRpbyBmaWxlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQoe1xuICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogZmlsZW5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuc2lvbjogZXh0ZW5zaW9uLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IGJsb2Iuc2l6ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFdhdmVmb3JtRnJvbVVybCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8RmxvYXQzMkFycmF5W10+IHtcblxuICAgICAgICAvLyBpZiBhdWRpbyBjb250ZXh0IGlzIG5vdCBzdXBwb3J0IHJldHVybiBhIHN0cmVhbSBvZiBlbXB0eSBkYXRhXG4gICAgICAgIGlmICghKDxhbnk+d2luZG93KS5BdWRpb0NvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBvZjxGbG9hdDMyQXJyYXlbXT4oW25ldyBGbG9hdDMyQXJyYXkoMCldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2F1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVWb2x1bWVOb2RlKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQW5hbHlzZXJOb2RlKCk7XG5cbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8RmxvYXQzMkFycmF5W10+KSA9PiB7XG5cbiAgICAgICAgICAgIC8vIGxvYWQgdGhlIG1lZGlhIGZyb20gdGhlIFVSTCBwcm92aWRlZFxuICAgICAgICAgICAgdGhpcy5faHR0cC5yZXF1ZXN0KHVybCwgeyByZXNwb25zZVR5cGU6IFJlc3BvbnNlQ29udGVudFR5cGUuQXJyYXlCdWZmZXIgfSkuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldEF1ZGlvQnVmZmVyKHJlc3BvbnNlLmFycmF5QnVmZmVyKCkpLnN1YnNjcmliZShhdWRpb0J1ZmZlciA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBidWZmZXIgc291cmNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQnVmZmVyU291cmNlKGF1ZGlvQnVmZmVyKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YVBvaW50czogRmxvYXQzMkFycmF5W10gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hhbm5lbHMgPSB0aGlzLl9hdWRpb0J1ZmZlci5udW1iZXJPZkNoYW5uZWxzO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGV4dHJhY3QgdGhlIGRhdGEgZnJvbSBlYWNoIGNoYW5uZWxcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY2hhbm5lbElkeCA9IDA7IGNoYW5uZWxJZHggPCBjaGFubmVsczsgY2hhbm5lbElkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhUG9pbnRzW2NoYW5uZWxJZHhdID0gdGhpcy5fYXVkaW9CdWZmZXIuZ2V0Q2hhbm5lbERhdGEoY2hhbm5lbElkeCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KGRhdGFQb2ludHMpO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgYWZ0ZXIgb3Vyc2VsdmVzXG4gICAgICAgICAgICAgICAgICAgIGRhdGFQb2ludHMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0V2F2ZWZvcm1Qb2ludHMoY2hhbm5lbHM6IEZsb2F0MzJBcnJheVtdID0gW10sIHNraXA6IG51bWJlciA9IDEwMDApOiBXYXZlZm9ybVBvaW50W10ge1xuXG4gICAgICAgIGNvbnN0IHdhdmVmb3JtOiBXYXZlZm9ybVBvaW50W10gPSBbXTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBjaGFubmVscy5sZW5ndGggPiAwID8gY2hhbm5lbHNbMF0ubGVuZ3RoIDogMDtcblxuICAgICAgICAvLyBjb252ZXJ0IGVhY2ggY2hhbm5lbCBkYXRhIHRvIGEgc2VyaWVzIG9mIHdhdmVmb3JtIHBvaW50c1xuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBkdXJhdGlvbjsgaWR4ICs9IHNraXApIHtcblxuICAgICAgICAgICAgLy8gZ2V0IGFsbCB0aGUgY2hhbm5lbCBkYXRhIGZvciBhIHNwZWNpZmljIHBvaW50XG4gICAgICAgICAgICBjb25zdCBwb2ludHMgPSBjaGFubmVscy5tYXAoY2hhbm5lbCA9PiBjaGFubmVsW2lkeF0pO1xuXG4gICAgICAgICAgICAvLyBmaW5kIHRoZSBtaW5pbXVtIHBvaW50IGFuZCBtYXhpbXVtIHBvaW50cyBhdCBlYWNoIHBvc2l0aW9uIGFjcm9zcyBhbGwgY2hhbm5lbHNcbiAgICAgICAgICAgIHdhdmVmb3JtLnB1c2goe1xuICAgICAgICAgICAgICAgIG1pbjogcG9pbnRzLnJlZHVjZSgocHJldmlvdXMsIGN1cnJlbnQpID0+IGN1cnJlbnQgPCBwcmV2aW91cyA/IGN1cnJlbnQgOiBwcmV2aW91cyksXG4gICAgICAgICAgICAgICAgbWF4OiBwb2ludHMucmVkdWNlKChwcmV2aW91cywgY3VycmVudCkgPT4gY3VycmVudCA+IHByZXZpb3VzID8gY3VycmVudCA6IHByZXZpb3VzKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd2F2ZWZvcm07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRBdWRpb0J1ZmZlcihhcnJheUJ1ZmZlcjogQXJyYXlCdWZmZXIpOiBPYnNlcnZhYmxlPEF1ZGlvQnVmZmVyPiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXI6IE9ic2VydmVyPEF1ZGlvQnVmZmVyPikgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRPZmZsaW5lQXVkaW9Db250ZXh0KCkuZGVjb2RlQXVkaW9EYXRhKGFycmF5QnVmZmVyLCAoYXVkaW9CdWZmZXI6IEF1ZGlvQnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChhdWRpb0J1ZmZlcik7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4gb2JzZXJ2ZXIuZXJyb3IoZXJyb3IpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPZmZsaW5lQXVkaW9Db250ZXh0KCk6IE9mZmxpbmVBdWRpb0NvbnRleHQge1xuICAgICAgICByZXR1cm4gbmV3IE9mZmxpbmVBdWRpb0NvbnRleHQoMSwgMiwgdGhpcy5fYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUgfHwgNDQxMDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQnVmZmVyU291cmNlKGF1ZGlvQnVmZmVyOiBBdWRpb0J1ZmZlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RTb3VyY2UoKTtcblxuICAgICAgICB0aGlzLl9hdWRpb0J1ZmZlciA9IGF1ZGlvQnVmZmVyO1xuICAgICAgICB0aGlzLl9hdWRpb0J1ZmZlclNvdXJjZSA9IHRoaXMuX2F1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgdGhpcy5fYXVkaW9CdWZmZXJTb3VyY2UuYnVmZmVyID0gdGhpcy5fYXVkaW9CdWZmZXI7XG4gICAgICAgIHRoaXMuX2F1ZGlvQnVmZmVyU291cmNlLmNvbm5lY3QodGhpcy5fYW5hbHlzZXJOb2RlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVZvbHVtZU5vZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2dhaW5Ob2RlID0gdGhpcy5fYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgdGhpcy5fZ2Fpbk5vZGUuY29ubmVjdCh0aGlzLl9hdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlQW5hbHlzZXJOb2RlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hbmFseXNlck5vZGUgPSB0aGlzLl9hdWRpb0NvbnRleHQuY3JlYXRlQW5hbHlzZXIoKTtcbiAgICAgICAgdGhpcy5fYW5hbHlzZXJOb2RlLmNvbm5lY3QodGhpcy5fZ2Fpbk5vZGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGlzY29ubmVjdFNvdXJjZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2F1ZGlvQnVmZmVyU291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9hdWRpb0J1ZmZlclNvdXJjZS5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2F2ZWZvcm1Qb2ludCB7XG4gICAgbWluOiBudW1iZXI7XG4gICAgbWF4OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXVkaW9NZXRhZGF0YSB7XG4gICAgZmlsZW5hbWU6IHN0cmluZztcbiAgICBleHRlbnNpb246IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIHNpemU6IG51bWJlcjtcbn0iXX0=