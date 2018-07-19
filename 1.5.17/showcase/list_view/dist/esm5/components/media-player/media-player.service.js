/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { Subject } from 'rxjs/Subject';
import { FrameExtractionService } from '../../services/frame-extraction/index';
var MediaPlayerService = (function () {
    function MediaPlayerService(_frameExtractionService) {
        var _this = this;
        this._frameExtractionService = _frameExtractionService;
        this.type = 'video';
        this.loaded = false;
        /*
                Create observables for media player events
            */
        this.playing = new BehaviorSubject(false);
        this.initEvent = new BehaviorSubject(false);
        this.abortEvent = new Subject();
        this.canPlayEvent = new BehaviorSubject(false);
        this.canPlayThroughEvent = new BehaviorSubject(false);
        this.durationChangeEvent = new Subject();
        this.endedEvent = new Subject();
        this.errorEvent = new Subject();
        this.loadedDataEvent = new Subject();
        this.loadedMetadataEvent = new Subject();
        this.loadStartEvent = new Subject();
        this.pauseEvent = new Subject();
        this.playEvent = new Subject();
        this.playingEvent = new Subject();
        this.rateChangeEvent = new Subject();
        this.seekedEvent = new Subject();
        this.seekingEvent = new Subject();
        this.stalledEvent = new Subject();
        this.suspendEvent = new Subject();
        this.timeUpdateEvent = new Subject();
        this.volumeChangeEvent = new Subject();
        this.waitingEvent = new Subject();
        this.mediaClickEvent = new Subject();
        this.fullscreenEvent = new BehaviorSubject(false);
        this.quietModeEvent = new BehaviorSubject(false);
        this.progressEvent = Observable.create(function (observer) {
            // repeat until the whole video has fully loaded
            var /** @type {?} */ interval = setInterval(function () {
                var /** @type {?} */ buffered = /** @type {?} */ (_this._mediaPlayer.buffered);
                observer.next(buffered);
                if (buffered.length === 1 && buffered.start(0) === 0 && buffered.end(0) === _this.duration) {
                    observer.complete();
                    clearInterval(interval);
                }
            }, 1000);
        });
        this._fullscreen = false;
    }
    Object.defineProperty(MediaPlayerService.prototype, "mediaPlayer", {
        /*
            Create all the getters and setters the can be used by media player extensions
        */
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "quietMode", {
        get: /**
         * @return {?}
         */
        function () {
            return this._quietMode;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // quiet mode cannot be enabled on audio player
            if (this.type === 'audio') {
                value = false;
            }
            this._quietMode = value;
            this.quietModeEvent.next(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "mediaPlayerWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.offsetWidth : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "mediaPlayerHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.offsetHeight : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "audioTracks", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.audioTracks : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "autoplay", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.autoplay : false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.autoplay = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "buffered", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.buffered : new TimeRanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "crossOrigin", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.crossOrigin : null;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.crossOrigin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "currentSrc", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.currentSrc : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "currentTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.currentTime : 0;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.currentTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "defaultMuted", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.defaultMuted : false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.defaultMuted = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "defaultPlaybackRate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.defaultPlaybackRate : 1;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.defaultPlaybackRate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "duration", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.duration : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "ended", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.ended : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "loop", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.loop : false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.loop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "muted", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.muted : false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.muted = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "networkState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer.networkState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "paused", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.paused : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "playbackRate", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.playbackRate : 1;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.playbackRate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "played", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.played : new TimeRanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "preload", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.preload : 'auto';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.preload = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "readyState", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.readyState : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "seekable", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.seekable : new TimeRanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "seeking", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.seeking : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "src", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.src : '';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.src = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "textTracks", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.textTracks : new TextTrackList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "videoTracks", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.videoTracks : new VideoTrackList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "volume", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._mediaPlayer.volume : 1;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._mediaPlayer.volume = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "fullscreen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? this._fullscreen : false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._fullscreen = value;
            this.fullscreenEvent.next(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} hostElement
     * @param {?} mediaPlayer
     * @return {?}
     */
    MediaPlayerService.prototype.setMediaPlayer = /**
     * @param {?} hostElement
     * @param {?} mediaPlayer
     * @return {?}
     */
    function (hostElement, mediaPlayer) {
        this._hostElement = hostElement;
        this._mediaPlayer = mediaPlayer;
        this.initEvent.next(true);
    };
    /**
     * Toggle playing state
     */
    /**
     * Toggle playing state
     * @return {?}
     */
    MediaPlayerService.prototype.togglePlay = /**
     * Toggle playing state
     * @return {?}
     */
    function () {
        // prevent any action is not loaded
        if (this.loaded === false) {
            return;
        }
        if (this.paused) {
            this.play();
        }
        else {
            this.pause();
        }
    };
    /**
     * Starts playing the audio/video
     */
    /**
     * Starts playing the audio/video
     * @return {?}
     */
    MediaPlayerService.prototype.play = /**
     * Starts playing the audio/video
     * @return {?}
     */
    function () {
        this._mediaPlayer.play();
    };
    /**
     * Pauses the currently playing audio/video
     */
    /**
     * Pauses the currently playing audio/video
     * @return {?}
     */
    MediaPlayerService.prototype.pause = /**
     * Pauses the currently playing audio/video
     * @return {?}
     */
    function () {
        this._mediaPlayer.pause();
    };
    /**
     * Re-loads the audio/video element
     */
    /**
     * Re-loads the audio/video element
     * @return {?}
     */
    MediaPlayerService.prototype.load = /**
     * Re-loads the audio/video element
     * @return {?}
     */
    function () {
        this._mediaPlayer.load();
    };
    /**
     * Checks if the browser can play the specified audio/video type
     */
    /**
     * Checks if the browser can play the specified audio/video type
     * @param {?} type
     * @return {?}
     */
    MediaPlayerService.prototype.canPlayType = /**
     * Checks if the browser can play the specified audio/video type
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this._mediaPlayer.canPlayType(type);
    };
    /**
     * Adds a new text track to the audio/video
     */
    /**
     * Adds a new text track to the audio/video
     * @param {?} kind
     * @param {?} label
     * @param {?} language
     * @return {?}
     */
    MediaPlayerService.prototype.addTextTrack = /**
     * Adds a new text track to the audio/video
     * @param {?} kind
     * @param {?} label
     * @param {?} language
     * @return {?}
     */
    function (kind, label, language) {
        return this._mediaPlayer.addTextTrack(kind, label, language);
    };
    /**
     * Attempt to display media in fullscreen mode
     */
    /**
     * Attempt to display media in fullscreen mode
     * @return {?}
     */
    MediaPlayerService.prototype.requestFullscreen = /**
     * Attempt to display media in fullscreen mode
     * @return {?}
     */
    function () {
        if (this._hostElement.requestFullscreen) {
            this._hostElement.requestFullscreen();
        }
        else if (this._hostElement.webkitRequestFullscreen) {
            this._hostElement.webkitRequestFullscreen();
        }
        else if ((/** @type {?} */ (this._hostElement)).msRequestFullscreen) {
            (/** @type {?} */ (this._hostElement)).msRequestFullscreen();
        }
        else if ((/** @type {?} */ (this._hostElement)).mozRequestFullScreen) {
            (/** @type {?} */ (this._hostElement)).mozRequestFullScreen();
        }
    };
    /**
     * Exit full screen mode
     */
    /**
     * Exit full screen mode
     * @return {?}
     */
    MediaPlayerService.prototype.exitFullscreen = /**
     * Exit full screen mode
     * @return {?}
     */
    function () {
        if ((/** @type {?} */ (this._hostElement)).exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if ((/** @type {?} */ (document)).msExitFullscreen) {
            (/** @type {?} */ (document)).msExitFullscreen();
        }
        else if ((/** @type {?} */ (document)).mozCancelFullScreen) {
            (/** @type {?} */ (document)).mozCancelFullScreen();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MediaPlayerService.prototype.fullscreenChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.fullscreen = (/** @type {?} */ (document)).fullscreen || document.webkitIsFullScreen || (/** @type {?} */ (document)).mozFullScreen || (/** @type {?} */ (document)).msFullscreenElement !== null && (/** @type {?} */ (document)).msFullscreenElement !== undefined;
        this.fullscreenEvent.next(this.fullscreen);
    };
    /**
     * Toggle Fullscreen State
     */
    /**
     * Toggle Fullscreen State
     * @return {?}
     */
    MediaPlayerService.prototype.toggleFullscreen = /**
     * Toggle Fullscreen State
     * @return {?}
     */
    function () {
        if (this.fullscreen) {
            this.exitFullscreen();
        }
        else {
            this.requestFullscreen();
        }
    };
    /**
     * Extract the frames from the video
     */
    /**
     * Extract the frames from the video
     * @param {?} width
     * @param {?} height
     * @param {?} skip
     * @return {?}
     */
    MediaPlayerService.prototype.getFrames = /**
     * Extract the frames from the video
     * @param {?} width
     * @param {?} height
     * @param {?} skip
     * @return {?}
     */
    function (width, height, skip) {
        if (this.type === 'video') {
            return this._frameExtractionService.getFrameThumbnails(this.source, width, height, 0, this.duration, 10);
        }
        return from([]);
    };
    MediaPlayerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    MediaPlayerService.ctorParameters = function () { return [
        { type: FrameExtractionService, },
    ]; };
    return MediaPlayerService;
}());
export { MediaPlayerService };
function MediaPlayerService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MediaPlayerService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MediaPlayerService.ctorParameters;
    /** @type {?} */
    MediaPlayerService.prototype.source;
    /** @type {?} */
    MediaPlayerService.prototype.type;
    /** @type {?} */
    MediaPlayerService.prototype.loaded;
    /** @type {?} */
    MediaPlayerService.prototype.playing;
    /** @type {?} */
    MediaPlayerService.prototype.initEvent;
    /** @type {?} */
    MediaPlayerService.prototype.abortEvent;
    /** @type {?} */
    MediaPlayerService.prototype.canPlayEvent;
    /** @type {?} */
    MediaPlayerService.prototype.canPlayThroughEvent;
    /** @type {?} */
    MediaPlayerService.prototype.durationChangeEvent;
    /** @type {?} */
    MediaPlayerService.prototype.endedEvent;
    /** @type {?} */
    MediaPlayerService.prototype.errorEvent;
    /** @type {?} */
    MediaPlayerService.prototype.loadedDataEvent;
    /** @type {?} */
    MediaPlayerService.prototype.loadedMetadataEvent;
    /** @type {?} */
    MediaPlayerService.prototype.loadStartEvent;
    /** @type {?} */
    MediaPlayerService.prototype.pauseEvent;
    /** @type {?} */
    MediaPlayerService.prototype.playEvent;
    /** @type {?} */
    MediaPlayerService.prototype.playingEvent;
    /** @type {?} */
    MediaPlayerService.prototype.rateChangeEvent;
    /** @type {?} */
    MediaPlayerService.prototype.seekedEvent;
    /** @type {?} */
    MediaPlayerService.prototype.seekingEvent;
    /** @type {?} */
    MediaPlayerService.prototype.stalledEvent;
    /** @type {?} */
    MediaPlayerService.prototype.suspendEvent;
    /** @type {?} */
    MediaPlayerService.prototype.timeUpdateEvent;
    /** @type {?} */
    MediaPlayerService.prototype.volumeChangeEvent;
    /** @type {?} */
    MediaPlayerService.prototype.waitingEvent;
    /** @type {?} */
    MediaPlayerService.prototype.mediaClickEvent;
    /** @type {?} */
    MediaPlayerService.prototype.fullscreenEvent;
    /** @type {?} */
    MediaPlayerService.prototype.quietModeEvent;
    /** @type {?} */
    MediaPlayerService.prototype.progressEvent;
    /** @type {?} */
    MediaPlayerService.prototype._mediaPlayer;
    /** @type {?} */
    MediaPlayerService.prototype._hostElement;
    /** @type {?} */
    MediaPlayerService.prototype._fullscreen;
    /** @type {?} */
    MediaPlayerService.prototype._quietMode;
    /** @type {?} */
    MediaPlayerService.prototype._frameExtractionService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGxheWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9tZWRpYS1wbGF5ZXIvbWVkaWEtcGxheWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFNUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQWtCLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7O0lBMEQzRiw0QkFBb0IsdUJBQStDO1FBQW5FLGlCQUF1RTtRQUFuRCw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXdCO29CQW5EM0MsT0FBTztzQkFDYixLQUFLOzs7O3VCQUthLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzt5QkFDakMsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOzBCQUM3QyxJQUFJLE9BQU8sRUFBUTs0QkFDTixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7bUNBQzVCLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzttQ0FDNUMsSUFBSSxPQUFPLEVBQVU7MEJBQ2hDLElBQUksT0FBTyxFQUFROzBCQUNwQixJQUFJLE9BQU8sRUFBTzsrQkFDYixJQUFJLE9BQU8sRUFBTzttQ0FDZCxJQUFJLE9BQU8sRUFBTzs4QkFDdEIsSUFBSSxPQUFPLEVBQVE7MEJBQ3ZCLElBQUksT0FBTyxFQUFRO3lCQUNwQixJQUFJLE9BQU8sRUFBUTs0QkFDYixJQUFJLE9BQU8sRUFBVzsrQkFDcEIsSUFBSSxPQUFPLEVBQVU7MkJBQ3pC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bUIsS0FBSyxJQUFJLElBQUksbUJBQU0sUUFBUSxFQUFDLENBQUMsbUJBQW1CLEtBQUssU0FBUyxDQUFDO1FBQ2xOLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM5QztJQUVEOztPQUVHOzs7OztJQUNILDZDQUFnQjs7OztJQUFoQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7S0FDSjtJQUVEOztPQUVHOzs7Ozs7OztJQUNILHNDQUFTOzs7Ozs7O0lBQVQsVUFBVSxLQUFhLEVBQUUsTUFBYyxFQUFFLElBQVk7UUFFakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzVHO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNuQjs7Z0JBclZKLFVBQVU7Ozs7Z0JBSGMsc0JBQXNCOzs2QkFOL0M7O1NBVWEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb20nO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgRXh0cmFjdGVkRnJhbWUsIEZyYW1lRXh0cmFjdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mcmFtZS1leHRyYWN0aW9uL2luZGV4JztcbmltcG9ydCB7IE1lZGlhUGxheWVyVHlwZSB9IGZyb20gJy4vbWVkaWEtcGxheWVyLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZWRpYVBsYXllclNlcnZpY2Uge1xuXG4gICAgc291cmNlOiBzdHJpbmc7XG4gICAgdHlwZTogTWVkaWFQbGF5ZXJUeXBlID0gJ3ZpZGVvJztcbiAgICBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qXG4gICAgICAgIENyZWF0ZSBvYnNlcnZhYmxlcyBmb3IgbWVkaWEgcGxheWVyIGV2ZW50c1xuICAgICovXG4gICAgcGxheWluZzogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgaW5pdEV2ZW50OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBhYm9ydEV2ZW50OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBjYW5QbGF5RXZlbnQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGNhblBsYXlUaHJvdWdoRXZlbnQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIGR1cmF0aW9uQ2hhbmdlRXZlbnQ6IFN1YmplY3Q8bnVtYmVyPiA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgICBlbmRlZEV2ZW50OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBlcnJvckV2ZW50OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgbG9hZGVkRGF0YUV2ZW50OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgbG9hZGVkTWV0YWRhdGFFdmVudDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIGxvYWRTdGFydEV2ZW50OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBwYXVzZUV2ZW50OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICBwbGF5RXZlbnQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIHBsYXlpbmdFdmVudDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gICAgcmF0ZUNoYW5nZUV2ZW50OiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgc2Vla2VkRXZlbnQ6IFN1YmplY3Q8bnVtYmVyPiA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgICBzZWVraW5nRXZlbnQ6IFN1YmplY3Q8bnVtYmVyPiA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgICBzdGFsbGVkRXZlbnQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIHN1c3BlbmRFdmVudDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgdGltZVVwZGF0ZUV2ZW50OiBTdWJqZWN0PG51bWJlcj4gPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gICAgdm9sdW1lQ2hhbmdlRXZlbnQ6IFN1YmplY3Q8bnVtYmVyPiA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgICB3YWl0aW5nRXZlbnQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIG1lZGlhQ2xpY2tFdmVudDogU3ViamVjdDxNb3VzZUV2ZW50PiA9IG5ldyBTdWJqZWN0PE1vdXNlRXZlbnQ+KCk7XG4gICAgZnVsbHNjcmVlbkV2ZW50OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBxdWlldE1vZGVFdmVudDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgcHJvZ3Jlc3NFdmVudDogT2JzZXJ2YWJsZTxUaW1lUmFuZ2VzPiA9IE9ic2VydmFibGUuY3JlYXRlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VGltZVJhbmdlcz4pID0+IHtcblxuICAgICAgICAvLyByZXBlYXQgdW50aWwgdGhlIHdob2xlIHZpZGVvIGhhcyBmdWxseSBsb2FkZWRcbiAgICAgICAgbGV0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXG4gICAgICAgICAgICBsZXQgYnVmZmVyZWQgPSB0aGlzLl9tZWRpYVBsYXllci5idWZmZXJlZCBhcyBUaW1lUmFuZ2VzO1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChidWZmZXJlZCk7XG5cbiAgICAgICAgICAgIGlmIChidWZmZXJlZC5sZW5ndGggPT09IDEgJiYgYnVmZmVyZWQuc3RhcnQoMCkgPT09IDAgJiYgYnVmZmVyZWQuZW5kKDApID09PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG5cbiAgICBwcml2YXRlIF9tZWRpYVBsYXllcjogSFRNTE1lZGlhRWxlbWVudDtcbiAgICBwcml2YXRlIF9ob3N0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfZnVsbHNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3F1aWV0TW9kZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZyYW1lRXh0cmFjdGlvblNlcnZpY2U6IEZyYW1lRXh0cmFjdGlvblNlcnZpY2UpIHt9XG5cbiAgICAvKlxuICAgICAgICBDcmVhdGUgYWxsIHRoZSBnZXR0ZXJzIGFuZCBzZXR0ZXJzIHRoZSBjYW4gYmUgdXNlZCBieSBtZWRpYSBwbGF5ZXIgZXh0ZW5zaW9uc1xuICAgICovXG4gICAgZ2V0IG1lZGlhUGxheWVyKCk6IEhUTUxNZWRpYUVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXI7XG4gICAgfVxuXG4gICAgZ2V0IHF1aWV0TW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1aWV0TW9kZTtcbiAgICB9XG5cbiAgICBzZXQgcXVpZXRNb2RlKHZhbHVlOiBib29sZWFuKSB7XG5cbiAgICAgICAgLy8gcXVpZXQgbW9kZSBjYW5ub3QgYmUgZW5hYmxlZCBvbiBhdWRpbyBwbGF5ZXJcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgdmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3F1aWV0TW9kZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnF1aWV0TW9kZUV2ZW50Lm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIGdldCBtZWRpYVBsYXllcldpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLm9mZnNldFdpZHRoIDogMDtcbiAgICB9XG5cbiAgICBnZXQgbWVkaWFQbGF5ZXJIZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIub2Zmc2V0SGVpZ2h0IDogMDtcbiAgICB9XG5cbiAgICBnZXQgYXVkaW9UcmFja3MoKTogQXVkaW9UcmFja0xpc3Qge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5hdWRpb1RyYWNrcyA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IGF1dG9wbGF5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5hdXRvcGxheSA6IGZhbHNlO1xuICAgIH1cbiAgICBzZXQgYXV0b3BsYXkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIuYXV0b3BsYXkgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgYnVmZmVyZWQoKTogVGltZVJhbmdlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmJ1ZmZlcmVkIDogbmV3IFRpbWVSYW5nZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgY3Jvc3NPcmlnaW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuY3Jvc3NPcmlnaW4gOiBudWxsO1xuICAgIH1cbiAgICBzZXQgY3Jvc3NPcmlnaW4odmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5jcm9zc09yaWdpbiA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50U3JjKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmN1cnJlbnRTcmMgOiBudWxsO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50VGltZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5jdXJyZW50VGltZSA6IDA7XG4gICAgfVxuICAgIHNldCBjdXJyZW50VGltZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLmN1cnJlbnRUaW1lID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRNdXRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuZGVmYXVsdE11dGVkIDogZmFsc2U7XG4gICAgfVxuICAgIHNldCBkZWZhdWx0TXV0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIuZGVmYXVsdE11dGVkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRQbGF5YmFja1JhdGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuZGVmYXVsdFBsYXliYWNrUmF0ZSA6IDE7XG4gICAgfVxuICAgIHNldCBkZWZhdWx0UGxheWJhY2tSYXRlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIuZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBkdXJhdGlvbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5kdXJhdGlvbiA6IDA7XG4gICAgfVxuXG4gICAgZ2V0IGVuZGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5lbmRlZCA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBsb29wKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5sb29wIDogZmFsc2U7XG4gICAgfVxuICAgIHNldCBsb29wKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLmxvb3AgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbXV0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLm11dGVkIDogZmFsc2U7XG4gICAgfVxuICAgIHNldCBtdXRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5tdXRlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBuZXR3b3JrU3RhdGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyLm5ldHdvcmtTdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgcGF1c2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5wYXVzZWQgOiB0cnVlO1xuICAgIH1cblxuICAgIGdldCBwbGF5YmFja1JhdGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIucGxheWJhY2tSYXRlIDogMTtcbiAgICB9XG4gICAgc2V0IHBsYXliYWNrUmF0ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLnBsYXliYWNrUmF0ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBwbGF5ZWQoKTogVGltZVJhbmdlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnBsYXllZCA6IG5ldyBUaW1lUmFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZ2V0IHByZWxvYWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIucHJlbG9hZCA6ICdhdXRvJztcbiAgICB9XG4gICAgc2V0IHByZWxvYWQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5wcmVsb2FkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHJlYWR5U3RhdGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIucmVhZHlTdGF0ZSA6IDA7XG4gICAgfVxuXG4gICAgZ2V0IHNlZWthYmxlKCk6IFRpbWVSYW5nZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5zZWVrYWJsZSA6IG5ldyBUaW1lUmFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZ2V0IHNlZWtpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnNlZWtpbmcgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgc3JjKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnNyYyA6ICcnO1xuICAgIH1cbiAgICBzZXQgc3JjKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIuc3JjID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHRleHRUcmFja3MoKTogVGV4dFRyYWNrTGlzdCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnRleHRUcmFja3MgOiBuZXcgVGV4dFRyYWNrTGlzdCgpO1xuICAgIH1cblxuICAgIGdldCB2aWRlb1RyYWNrcygpOiBWaWRlb1RyYWNrTGlzdCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnZpZGVvVHJhY2tzIDogbmV3IFZpZGVvVHJhY2tMaXN0KCk7XG4gICAgfVxuXG4gICAgZ2V0IHZvbHVtZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci52b2x1bWUgOiAxO1xuICAgIH1cbiAgICBzZXQgdm9sdW1lKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIudm9sdW1lID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGZ1bGxzY3JlZW4oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX2Z1bGxzY3JlZW4gOiBmYWxzZTtcbiAgICB9XG4gICAgc2V0IGZ1bGxzY3JlZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZnVsbHNjcmVlbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLmZ1bGxzY3JlZW5FdmVudC5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBzZXRNZWRpYVBsYXllcihob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsIG1lZGlhUGxheWVyOiBIVE1MTWVkaWFFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2hvc3RFbGVtZW50ID0gaG9zdEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyID0gbWVkaWFQbGF5ZXI7XG5cbiAgICAgICAgdGhpcy5pbml0RXZlbnQubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgcGxheWluZyBzdGF0ZVxuICAgICAqL1xuICAgIHRvZ2dsZVBsYXkoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gcHJldmVudCBhbnkgYWN0aW9uIGlzIG5vdCBsb2FkZWRcbiAgICAgICAgaWYgKHRoaXMubG9hZGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBwbGF5aW5nIHRoZSBhdWRpby92aWRlb1xuICAgICAqL1xuICAgIHBsYXkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLnBsYXkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXVzZXMgdGhlIGN1cnJlbnRseSBwbGF5aW5nIGF1ZGlvL3ZpZGVvXG4gICAgICovXG4gICAgcGF1c2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmUtbG9hZHMgdGhlIGF1ZGlvL3ZpZGVvIGVsZW1lbnRcbiAgICAgKi9cbiAgICBsb2FkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5sb2FkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBicm93c2VyIGNhbiBwbGF5IHRoZSBzcGVjaWZpZWQgYXVkaW8vdmlkZW8gdHlwZVxuICAgICAqL1xuICAgIGNhblBsYXlUeXBlKHR5cGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllci5jYW5QbGF5VHlwZSh0eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbmV3IHRleHQgdHJhY2sgdG8gdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICovXG4gICAgYWRkVGV4dFRyYWNrKGtpbmQ6IHN0cmluZywgbGFiZWw6IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZyk6IFRleHRUcmFjayB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllci5hZGRUZXh0VHJhY2soa2luZCwgbGFiZWwsIGxhbmd1YWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0IHRvIGRpc3BsYXkgbWVkaWEgaW4gZnVsbHNjcmVlbiBtb2RlXG4gICAgICovXG4gICAgcmVxdWVzdEZ1bGxzY3JlZW4oKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2hvc3RFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9ob3N0RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hvc3RFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9ob3N0RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCg8YW55PnRoaXMuX2hvc3RFbGVtZW50KS5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAoPGFueT50aGlzLl9ob3N0RWxlbWVudCkubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCg8YW55PnRoaXMuX2hvc3RFbGVtZW50KS5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgKDxhbnk+dGhpcy5faG9zdEVsZW1lbnQpLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGl0IGZ1bGwgc2NyZWVuIG1vZGVcbiAgICAgKi9cbiAgICBleGl0RnVsbHNjcmVlbigpOiB2b2lkIHtcblxuICAgICAgICBpZiAoKDxhbnk+dGhpcy5faG9zdEVsZW1lbnQpLmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCg8YW55PmRvY3VtZW50KS5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAoPGFueT5kb2N1bWVudCkubXNFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCg8YW55PmRvY3VtZW50KS5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAoPGFueT5kb2N1bWVudCkubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVsbHNjcmVlbkNoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mdWxsc2NyZWVuID0gKDxhbnk+ZG9jdW1lbnQpLmZ1bGxzY3JlZW4gfHwgZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuIHx8ICg8YW55PmRvY3VtZW50KS5tb3pGdWxsU2NyZWVuIHx8ICg8YW55PmRvY3VtZW50KS5tc0Z1bGxzY3JlZW5FbGVtZW50ICE9PSBudWxsICYmICg8YW55PmRvY3VtZW50KS5tc0Z1bGxzY3JlZW5FbGVtZW50ICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZnVsbHNjcmVlbkV2ZW50Lm5leHQodGhpcy5mdWxsc2NyZWVuKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgRnVsbHNjcmVlbiBTdGF0ZVxuICAgICAqL1xuICAgIHRvZ2dsZUZ1bGxzY3JlZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4dHJhY3QgdGhlIGZyYW1lcyBmcm9tIHRoZSB2aWRlb1xuICAgICAqL1xuICAgIGdldEZyYW1lcyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgc2tpcDogbnVtYmVyKTogT2JzZXJ2YWJsZTxFeHRyYWN0ZWRGcmFtZT4ge1xuXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mcmFtZUV4dHJhY3Rpb25TZXJ2aWNlLmdldEZyYW1lVGh1bWJuYWlscyh0aGlzLnNvdXJjZSwgd2lkdGgsIGhlaWdodCwgMCwgdGhpcy5kdXJhdGlvbiwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyb20oW10pO1xuICAgIH1cbn0iXX0=