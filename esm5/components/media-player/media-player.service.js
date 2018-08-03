/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { FrameExtractionService } from '../../services/frame-extraction/index';
var MediaPlayerService = /** @class */ (function () {
    function MediaPlayerService(_frameExtractionService) {
        var _this = this;
        this._frameExtractionService = _frameExtractionService;
        this.type = 'video';
        this.loaded = false;
        /*
                Create observables for media player events
            */
        this.playing = new BehaviorSubject(false);
        this.initEvent = new ReplaySubject();
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
            return this._mediaPlayer ? this._mediaPlayer.audioTracks : [];
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
            return this._mediaPlayer ? Array.from(this._mediaPlayer.textTracks) : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaPlayerService.prototype, "videoTracks", {
        get: /**
         * @return {?}
         */
        function () {
            return this._mediaPlayer ? Array.from(this._mediaPlayer.videoTracks) : [];
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
            if (this._mediaPlayer) {
                this._mediaPlayer.volume = value;
            }
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
     * @return {?}
     */
    MediaPlayerService.prototype.fullscreenChange = /**
     * @return {?}
     */
    function () {
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
    /**
     * @return {?}
     */
    MediaPlayerService.prototype.hideSubtitleTracks = /**
     * @return {?}
     */
    function () {
        for (var /** @type {?} */ index = 0; index < this.textTracks.length; index++) {
            this.textTracks[index].mode = 'hidden';
        }
    };
    MediaPlayerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MediaPlayerService.ctorParameters = function () { return [
        { type: FrameExtractionService }
    ]; };
    return MediaPlayerService;
}());
export { MediaPlayerService };
function MediaPlayerService_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtcGxheWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9tZWRpYS1wbGF5ZXIvbWVkaWEtcGxheWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFrQixzQkFBc0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOztJQTBEM0YsNEJBQW9CLHVCQUErQztRQUFuRSxpQkFBd0U7UUFBcEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF3QjtvQkFuRDNDLE9BQU87c0JBQ2IsS0FBSzs7Ozt1QkFLYSxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7eUJBQ25DLElBQUksYUFBYSxFQUFXOzBCQUNwQyxJQUFJLE9BQU8sRUFBUTs0QkFDTixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7bUNBQzVCLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzttQ0FDNUMsSUFBSSxPQUFPLEVBQVU7MEJBQ2hDLElBQUksT0FBTyxFQUFROzBCQUNwQixJQUFJLE9BQU8sRUFBTzsrQkFDYixJQUFJLE9BQU8sRUFBTzttQ0FDZCxJQUFJLE9BQU8sRUFBTzs4QkFDdEIsSUFBSSxPQUFPLEVBQVE7MEJBQ3ZCLElBQUksT0FBTyxFQUFRO3lCQUNwQixJQUFJLE9BQU8sRUFBUTs0QkFDYixJQUFJLE9BQU8sRUFBVzsrQkFDcEIsSUFBSSxPQUFPLEVBQVU7MkJBQ3pCLElBQUksT0FBTyxFQUFVOzRCQUNwQixJQUFJLE9BQU8sRUFBVTs0QkFDdkIsSUFBSSxPQUFPLEVBQVE7NEJBQ25CLElBQUksT0FBTyxFQUFROytCQUNkLElBQUksT0FBTyxFQUFVO2lDQUNuQixJQUFJLE9BQU8sRUFBVTs0QkFDNUIsSUFBSSxPQUFPLEVBQVE7K0JBQ1YsSUFBSSxPQUFPLEVBQWM7K0JBQ3BCLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzs4QkFDcEMsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDOzZCQUN0QyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQUMsUUFBOEI7O1lBR3JGLHFCQUFNLFFBQVEsR0FBRyxXQUFXLENBQUM7Z0JBRXpCLHFCQUFNLFFBQVEscUJBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFzQixDQUFBLENBQUM7Z0JBQzFELFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXhCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ3hGLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDcEIsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMzQjthQUNKLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDWixDQUFDOzJCQUk2QixLQUFLO0tBR29DO0lBS3hFLHNCQUFJLDJDQUFXO1FBSGY7O1VBRUU7Ozs7UUFDRjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVCOzs7T0FBQTtJQUVELHNCQUFJLHlDQUFTOzs7O1FBQWI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUMxQjs7Ozs7UUFFRCxVQUFjLEtBQWM7O1lBR3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUNqQjtZQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DOzs7T0FYQTtJQWFELHNCQUFJLGdEQUFnQjs7OztRQUFwQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hFOzs7T0FBQTtJQUVELHNCQUFJLGlEQUFpQjs7OztRQUFyQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pFOzs7T0FBQTtJQUVELHNCQUFJLDJDQUFXOzs7O1FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNqRTs7O09BQUE7SUFFRCxzQkFBSSx3Q0FBUTs7OztRQUFaO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDakU7Ozs7O1FBQ0QsVUFBYSxLQUFjO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN0Qzs7O09BSEE7SUFLRCxzQkFBSSx3Q0FBUTs7OztRQUFaO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDO1NBQzVFOzs7T0FBQTtJQUVELHNCQUFJLDJDQUFXOzs7O1FBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztTQUNuRTs7Ozs7UUFDRCxVQUFnQixLQUFhO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUN6Qzs7O09BSEE7SUFLRCxzQkFBSSwwQ0FBVTs7OztRQUFkO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDbEU7OztPQUFBO0lBRUQsc0JBQUksMkNBQVc7Ozs7UUFBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hFOzs7OztRQUNELFVBQWdCLEtBQWE7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQ3pDOzs7T0FIQTtJQUtELHNCQUFJLDRDQUFZOzs7O1FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDckU7Ozs7O1FBQ0QsVUFBaUIsS0FBYztZQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDMUM7OztPQUhBO0lBS0Qsc0JBQUksbURBQW1COzs7O1FBQXZCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4RTs7Ozs7UUFDRCxVQUF3QixLQUFhO1lBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1NBQ2pEOzs7T0FIQTtJQUtELHNCQUFJLHdDQUFROzs7O1FBQVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3RDs7O09BQUE7SUFFRCxzQkFBSSxxQ0FBSzs7OztRQUFUO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDOUQ7OztPQUFBO0lBRUQsc0JBQUksb0NBQUk7Ozs7UUFBUjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQzdEOzs7OztRQUNELFVBQVMsS0FBYztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7U0FDbEM7OztPQUhBO0lBS0Qsc0JBQUkscUNBQUs7Ozs7UUFBVDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQzlEOzs7OztRQUNELFVBQVUsS0FBYztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDbkM7OztPQUhBO0lBS0Qsc0JBQUksNENBQVk7Ozs7UUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7U0FDekM7OztPQUFBO0lBRUQsc0JBQUksc0NBQU07Ozs7UUFBVjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQzlEOzs7T0FBQTtJQUVELHNCQUFJLDRDQUFZOzs7O1FBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakU7Ozs7O1FBQ0QsVUFBaUIsS0FBYTtZQUMxQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7U0FDMUM7OztPQUhBO0lBS0Qsc0JBQUksc0NBQU07Ozs7UUFBVjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQztTQUMxRTs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBTzs7OztRQUFYO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7U0FDakU7Ozs7O1FBQ0QsVUFBWSxLQUFhO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNyQzs7O09BSEE7SUFLRCxzQkFBSSwwQ0FBVTs7OztRQUFkO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0Q7OztPQUFBO0lBRUQsc0JBQUksd0NBQVE7Ozs7UUFBWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLEVBQUUsQ0FBQztTQUM1RTs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBTzs7OztRQUFYO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDaEU7OztPQUFBO0lBRUQsc0JBQUksbUNBQUc7Ozs7UUFBUDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3pEOzs7OztRQUNELFVBQVEsS0FBYTtZQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDakM7OztPQUhBO0lBS0Qsc0JBQUksMENBQVU7Ozs7UUFBZDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUM1RTs7O09BQUE7SUFFRCxzQkFBSSwyQ0FBVzs7OztRQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQzdFOzs7T0FBQTtJQUVELHNCQUFJLHNDQUFNOzs7O1FBQVY7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzRDs7Ozs7UUFDRCxVQUFXLEtBQWE7WUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNwQztTQUNKOzs7T0FMQTtJQU9ELHNCQUFJLDBDQUFVOzs7O1FBQWQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3ZEOzs7OztRQUNELFVBQWUsS0FBYztZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQzs7O09BSkE7Ozs7OztJQU1ELDJDQUFjOzs7OztJQUFkLFVBQWUsV0FBd0IsRUFBRSxXQUE2QjtRQUNsRSxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztRQUVoQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3QjtJQUVEOztPQUVHOzs7OztJQUNILHVDQUFVOzs7O0lBQVY7O1FBR0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQztTQUNWO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO0tBQ0o7SUFFRDs7T0FFRzs7Ozs7SUFDSCxpQ0FBSTs7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUM1QjtJQUVEOztPQUVHOzs7OztJQUNILGtDQUFLOzs7O0lBQUw7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQzdCO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsaUNBQUk7Ozs7SUFBSjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDNUI7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsd0NBQVc7Ozs7O0lBQVgsVUFBWSxJQUFZO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM5QztJQUVEOztPQUVHOzs7Ozs7OztJQUNILHlDQUFZOzs7Ozs7O0lBQVosVUFBYSxJQUF5RSxFQUFFLEtBQWEsRUFBRSxRQUFnQjtRQUNuSCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNoRTtJQUVEOztPQUVHOzs7OztJQUNILDhDQUFpQjs7OztJQUFqQjtRQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUN6QztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLENBQUM7U0FDL0M7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsbUJBQU0sSUFBSSxDQUFDLFlBQVksRUFBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUN0RCxtQkFBTSxJQUFJLENBQUMsWUFBWSxFQUFDLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUNsRDtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxtQkFBTSxJQUFJLENBQUMsWUFBWSxFQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELG1CQUFNLElBQUksQ0FBQyxZQUFZLEVBQUMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQ25EO0tBQ0o7SUFFRDs7T0FFRzs7Ozs7SUFDSCwyQ0FBYzs7OztJQUFkO1FBRUksRUFBRSxDQUFDLENBQUMsbUJBQU0sSUFBSSxDQUFDLFlBQVksRUFBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzdCO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFDdkMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDbkM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsbUJBQU0sUUFBUSxFQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzFDLG1CQUFNLFFBQVEsRUFBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDdEM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsbUJBQU0sUUFBUSxFQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQzdDLG1CQUFNLFFBQVEsRUFBQyxDQUFDLG1CQUFtQixFQUFFLENBQUM7U0FDekM7S0FDSjs7OztJQUVELDZDQUFnQjs7O0lBQWhCO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxtQkFBTSxRQUFRLEVBQUMsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLGtCQUFrQixJQUFJLG1CQUFNLFFBQVEsRUFBQyxDQUFDLGFBQWEsSUFBSSxtQkFBTSxRQUFRLEVBQUMsQ0FBQyxtQkFBbUIsS0FBSyxJQUFJLElBQUksbUJBQU0sUUFBUSxFQUFDLENBQUMsbUJBQW1CLEtBQUssU0FBUyxDQUFDO1FBQ2xOLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM5QztJQUVEOztPQUVHOzs7OztJQUNILDZDQUFnQjs7OztJQUFoQjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDNUI7S0FDSjtJQUVEOztPQUVHOzs7Ozs7OztJQUNILHNDQUFTOzs7Ozs7O0lBQVQsVUFBVSxLQUFhLEVBQUUsTUFBYyxFQUFFLElBQVk7UUFFakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzVHO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNuQjs7OztJQUVELCtDQUFrQjs7O0lBQWxCO1FBQ0ksR0FBRyxDQUFDLENBQUMscUJBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUMxRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7U0FDMUM7S0FDSjs7Z0JBN1ZKLFVBQVU7Ozs7Z0JBSGMsc0JBQXNCOzs2QkFQL0M7O1NBV2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBmcm9tIH0gZnJvbSAncnhqcy9vYnNlcnZhYmxlL2Zyb20nO1xuaW1wb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzL09ic2VydmVyJztcbmltcG9ydCB7IFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzL1JlcGxheVN1YmplY3QnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBFeHRyYWN0ZWRGcmFtZSwgRnJhbWVFeHRyYWN0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZyYW1lLWV4dHJhY3Rpb24vaW5kZXgnO1xuaW1wb3J0IHsgTWVkaWFQbGF5ZXJUeXBlIH0gZnJvbSAnLi9tZWRpYS1wbGF5ZXIuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lZGlhUGxheWVyU2VydmljZSB7XG5cbiAgICBzb3VyY2U6IHN0cmluZztcbiAgICB0eXBlOiBNZWRpYVBsYXllclR5cGUgPSAndmlkZW8nO1xuICAgIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLypcbiAgICAgICAgQ3JlYXRlIG9ic2VydmFibGVzIGZvciBtZWRpYSBwbGF5ZXIgZXZlbnRzXG4gICAgKi9cbiAgICBwbGF5aW5nOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBpbml0RXZlbnQ6IFJlcGxheVN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgUmVwbGF5U3ViamVjdDxib29sZWFuPigpO1xuICAgIGFib3J0RXZlbnQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIGNhblBsYXlFdmVudDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgY2FuUGxheVRocm91Z2hFdmVudDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgZHVyYXRpb25DaGFuZ2VFdmVudDogU3ViamVjdDxudW1iZXI+ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICAgIGVuZGVkRXZlbnQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIGVycm9yRXZlbnQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICBsb2FkZWREYXRhRXZlbnQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICBsb2FkZWRNZXRhZGF0YUV2ZW50OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgbG9hZFN0YXJ0RXZlbnQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIHBhdXNlRXZlbnQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICAgIHBsYXlFdmVudDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgcGxheWluZ0V2ZW50OiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgICByYXRlQ2hhbmdlRXZlbnQ6IFN1YmplY3Q8bnVtYmVyPiA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgICBzZWVrZWRFdmVudDogU3ViamVjdDxudW1iZXI+ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICAgIHNlZWtpbmdFdmVudDogU3ViamVjdDxudW1iZXI+ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICAgIHN0YWxsZWRFdmVudDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgc3VzcGVuZEV2ZW50OiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgICB0aW1lVXBkYXRlRXZlbnQ6IFN1YmplY3Q8bnVtYmVyPiA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgICB2b2x1bWVDaGFuZ2VFdmVudDogU3ViamVjdDxudW1iZXI+ID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICAgIHdhaXRpbmdFdmVudDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gICAgbWVkaWFDbGlja0V2ZW50OiBTdWJqZWN0PE1vdXNlRXZlbnQ+ID0gbmV3IFN1YmplY3Q8TW91c2VFdmVudD4oKTtcbiAgICBmdWxsc2NyZWVuRXZlbnQ6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICAgIHF1aWV0TW9kZUV2ZW50OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBwcm9ncmVzc0V2ZW50OiBPYnNlcnZhYmxlPFRpbWVSYW5nZXM+ID0gT2JzZXJ2YWJsZS5jcmVhdGUoKG9ic2VydmVyOiBPYnNlcnZlcjxUaW1lUmFuZ2VzPikgPT4ge1xuXG4gICAgICAgIC8vIHJlcGVhdCB1bnRpbCB0aGUgd2hvbGUgdmlkZW8gaGFzIGZ1bGx5IGxvYWRlZFxuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgYnVmZmVyZWQgPSB0aGlzLl9tZWRpYVBsYXllci5idWZmZXJlZCBhcyBUaW1lUmFuZ2VzO1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChidWZmZXJlZCk7XG5cbiAgICAgICAgICAgIGlmIChidWZmZXJlZC5sZW5ndGggPT09IDEgJiYgYnVmZmVyZWQuc3RhcnQoMCkgPT09IDAgJiYgYnVmZmVyZWQuZW5kKDApID09PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG5cbiAgICBwcml2YXRlIF9tZWRpYVBsYXllcjogSFRNTE1lZGlhRWxlbWVudDtcbiAgICBwcml2YXRlIF9ob3N0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfZnVsbHNjcmVlbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3F1aWV0TW9kZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZyYW1lRXh0cmFjdGlvblNlcnZpY2U6IEZyYW1lRXh0cmFjdGlvblNlcnZpY2UpIHsgfVxuXG4gICAgLypcbiAgICAgICAgQ3JlYXRlIGFsbCB0aGUgZ2V0dGVycyBhbmQgc2V0dGVycyB0aGUgY2FuIGJlIHVzZWQgYnkgbWVkaWEgcGxheWVyIGV4dGVuc2lvbnNcbiAgICAqL1xuICAgIGdldCBtZWRpYVBsYXllcigpOiBIVE1MTWVkaWFFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyO1xuICAgIH1cblxuICAgIGdldCBxdWlldE1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWlldE1vZGU7XG4gICAgfVxuXG4gICAgc2V0IHF1aWV0TW9kZSh2YWx1ZTogYm9vbGVhbikge1xuXG4gICAgICAgIC8vIHF1aWV0IG1vZGUgY2Fubm90IGJlIGVuYWJsZWQgb24gYXVkaW8gcGxheWVyXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgIHZhbHVlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9xdWlldE1vZGUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5xdWlldE1vZGVFdmVudC5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgbWVkaWFQbGF5ZXJXaWR0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5vZmZzZXRXaWR0aCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0IG1lZGlhUGxheWVySGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLm9mZnNldEhlaWdodCA6IDA7XG4gICAgfVxuXG4gICAgZ2V0IGF1ZGlvVHJhY2tzKCk6IEF1ZGlvVHJhY2tMaXN0IHwgQXJyYXk8YW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmF1ZGlvVHJhY2tzIDogW107XG4gICAgfVxuXG4gICAgZ2V0IGF1dG9wbGF5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5hdXRvcGxheSA6IGZhbHNlO1xuICAgIH1cbiAgICBzZXQgYXV0b3BsYXkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIuYXV0b3BsYXkgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgYnVmZmVyZWQoKTogVGltZVJhbmdlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmJ1ZmZlcmVkIDogbmV3IFRpbWVSYW5nZXMoKTtcbiAgICB9XG5cbiAgICBnZXQgY3Jvc3NPcmlnaW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuY3Jvc3NPcmlnaW4gOiBudWxsO1xuICAgIH1cbiAgICBzZXQgY3Jvc3NPcmlnaW4odmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5jcm9zc09yaWdpbiA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50U3JjKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLmN1cnJlbnRTcmMgOiBudWxsO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50VGltZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5jdXJyZW50VGltZSA6IDA7XG4gICAgfVxuICAgIHNldCBjdXJyZW50VGltZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLmN1cnJlbnRUaW1lID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRNdXRlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuZGVmYXVsdE11dGVkIDogZmFsc2U7XG4gICAgfVxuICAgIHNldCBkZWZhdWx0TXV0ZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIuZGVmYXVsdE11dGVkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGRlZmF1bHRQbGF5YmFja1JhdGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIuZGVmYXVsdFBsYXliYWNrUmF0ZSA6IDE7XG4gICAgfVxuICAgIHNldCBkZWZhdWx0UGxheWJhY2tSYXRlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIuZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBkdXJhdGlvbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5kdXJhdGlvbiA6IDA7XG4gICAgfVxuXG4gICAgZ2V0IGVuZGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5lbmRlZCA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBsb29wKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5sb29wIDogZmFsc2U7XG4gICAgfVxuICAgIHNldCBsb29wKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLmxvb3AgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgbXV0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLm11dGVkIDogZmFsc2U7XG4gICAgfVxuICAgIHNldCBtdXRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5tdXRlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBuZXR3b3JrU3RhdGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyLm5ldHdvcmtTdGF0ZTtcbiAgICB9XG5cbiAgICBnZXQgcGF1c2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5wYXVzZWQgOiB0cnVlO1xuICAgIH1cblxuICAgIGdldCBwbGF5YmFja1JhdGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIucGxheWJhY2tSYXRlIDogMTtcbiAgICB9XG4gICAgc2V0IHBsYXliYWNrUmF0ZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLnBsYXliYWNrUmF0ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBwbGF5ZWQoKTogVGltZVJhbmdlcyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnBsYXllZCA6IG5ldyBUaW1lUmFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZ2V0IHByZWxvYWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIucHJlbG9hZCA6ICdhdXRvJztcbiAgICB9XG4gICAgc2V0IHByZWxvYWQodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9tZWRpYVBsYXllci5wcmVsb2FkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHJlYWR5U3RhdGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIucmVhZHlTdGF0ZSA6IDA7XG4gICAgfVxuXG4gICAgZ2V0IHNlZWthYmxlKCk6IFRpbWVSYW5nZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyB0aGlzLl9tZWRpYVBsYXllci5zZWVrYWJsZSA6IG5ldyBUaW1lUmFuZ2VzKCk7XG4gICAgfVxuXG4gICAgZ2V0IHNlZWtpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnNlZWtpbmcgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgc3JjKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IHRoaXMuX21lZGlhUGxheWVyLnNyYyA6ICcnO1xuICAgIH1cbiAgICBzZXQgc3JjKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIuc3JjID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHRleHRUcmFja3MoKTogQXJyYXk8VGV4dFRyYWNrPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllciA/IEFycmF5LmZyb20odGhpcy5fbWVkaWFQbGF5ZXIudGV4dFRyYWNrcykgOiBbXTtcbiAgICB9XG5cbiAgICBnZXQgdmlkZW9UcmFja3MoKTogQXJyYXk8VmlkZW9UcmFjaz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVkaWFQbGF5ZXIgPyBBcnJheS5mcm9tKHRoaXMuX21lZGlhUGxheWVyLnZpZGVvVHJhY2tzKSA6IFtdO1xuICAgIH1cblxuICAgIGdldCB2b2x1bWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fbWVkaWFQbGF5ZXIudm9sdW1lIDogMTtcbiAgICB9XG4gICAgc2V0IHZvbHVtZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9tZWRpYVBsYXllcikge1xuICAgICAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIudm9sdW1lID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZnVsbHNjcmVlbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyID8gdGhpcy5fZnVsbHNjcmVlbiA6IGZhbHNlO1xuICAgIH1cbiAgICBzZXQgZnVsbHNjcmVlbih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9mdWxsc2NyZWVuID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZnVsbHNjcmVlbkV2ZW50Lm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIHNldE1lZGlhUGxheWVyKGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgbWVkaWFQbGF5ZXI6IEhUTUxNZWRpYUVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faG9zdEVsZW1lbnQgPSBob3N0RWxlbWVudDtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIgPSBtZWRpYVBsYXllcjtcblxuICAgICAgICB0aGlzLmluaXRFdmVudC5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBwbGF5aW5nIHN0YXRlXG4gICAgICovXG4gICAgdG9nZ2xlUGxheSgpOiB2b2lkIHtcblxuICAgICAgICAvLyBwcmV2ZW50IGFueSBhY3Rpb24gaXMgbm90IGxvYWRlZFxuICAgICAgICBpZiAodGhpcy5sb2FkZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIHBsYXlpbmcgdGhlIGF1ZGlvL3ZpZGVvXG4gICAgICovXG4gICAgcGxheSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIucGxheSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBhdXNlcyB0aGUgY3VycmVudGx5IHBsYXlpbmcgYXVkaW8vdmlkZW9cbiAgICAgKi9cbiAgICBwYXVzZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbWVkaWFQbGF5ZXIucGF1c2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZS1sb2FkcyB0aGUgYXVkaW8vdmlkZW8gZWxlbWVudFxuICAgICAqL1xuICAgIGxvYWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX21lZGlhUGxheWVyLmxvYWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGJyb3dzZXIgY2FuIHBsYXkgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlbyB0eXBlXG4gICAgICovXG4gICAgY2FuUGxheVR5cGUodHlwZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lZGlhUGxheWVyLmNhblBsYXlUeXBlKHR5cGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcgdGV4dCB0cmFjayB0byB0aGUgYXVkaW8vdmlkZW9cbiAgICAgKi9cbiAgICBhZGRUZXh0VHJhY2soa2luZDogJ3N1YnRpdGxlcycgfCAnY2FwdGlvbnMnIHwgJ2Rlc2NyaXB0aW9ucycgfCAnY2hhcHRlcnMnIHwgJ21ldGFkYXRhJywgbGFiZWw6IHN0cmluZywgbGFuZ3VhZ2U6IHN0cmluZyk6IFRleHRUcmFjayB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZWRpYVBsYXllci5hZGRUZXh0VHJhY2soa2luZCwgbGFiZWwsIGxhbmd1YWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRlbXB0IHRvIGRpc3BsYXkgbWVkaWEgaW4gZnVsbHNjcmVlbiBtb2RlXG4gICAgICovXG4gICAgcmVxdWVzdEZ1bGxzY3JlZW4oKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2hvc3RFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9ob3N0RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hvc3RFbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9ob3N0RWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCg8YW55PnRoaXMuX2hvc3RFbGVtZW50KS5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAoPGFueT50aGlzLl9ob3N0RWxlbWVudCkubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCg8YW55PnRoaXMuX2hvc3RFbGVtZW50KS5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgKDxhbnk+dGhpcy5faG9zdEVsZW1lbnQpLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGl0IGZ1bGwgc2NyZWVuIG1vZGVcbiAgICAgKi9cbiAgICBleGl0RnVsbHNjcmVlbigpOiB2b2lkIHtcblxuICAgICAgICBpZiAoKDxhbnk+dGhpcy5faG9zdEVsZW1lbnQpLmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCg8YW55PmRvY3VtZW50KS5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAoPGFueT5kb2N1bWVudCkubXNFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCg8YW55PmRvY3VtZW50KS5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAoPGFueT5kb2N1bWVudCkubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVsbHNjcmVlbkNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5mdWxsc2NyZWVuID0gKDxhbnk+ZG9jdW1lbnQpLmZ1bGxzY3JlZW4gfHwgZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuIHx8ICg8YW55PmRvY3VtZW50KS5tb3pGdWxsU2NyZWVuIHx8ICg8YW55PmRvY3VtZW50KS5tc0Z1bGxzY3JlZW5FbGVtZW50ICE9PSBudWxsICYmICg8YW55PmRvY3VtZW50KS5tc0Z1bGxzY3JlZW5FbGVtZW50ICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZnVsbHNjcmVlbkV2ZW50Lm5leHQodGhpcy5mdWxsc2NyZWVuKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgRnVsbHNjcmVlbiBTdGF0ZVxuICAgICAqL1xuICAgIHRvZ2dsZUZ1bGxzY3JlZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4dHJhY3QgdGhlIGZyYW1lcyBmcm9tIHRoZSB2aWRlb1xuICAgICAqL1xuICAgIGdldEZyYW1lcyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgc2tpcDogbnVtYmVyKTogT2JzZXJ2YWJsZTxFeHRyYWN0ZWRGcmFtZT4ge1xuXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mcmFtZUV4dHJhY3Rpb25TZXJ2aWNlLmdldEZyYW1lVGh1bWJuYWlscyh0aGlzLnNvdXJjZSwgd2lkdGgsIGhlaWdodCwgMCwgdGhpcy5kdXJhdGlvbiwgMTApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZyb20oW10pO1xuICAgIH1cblxuICAgIGhpZGVTdWJ0aXRsZVRyYWNrcygpOiB2b2lkIHtcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMudGV4dFRyYWNrcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgIHRoaXMudGV4dFRyYWNrc1tpbmRleF0ubW9kZSA9ICdoaWRkZW4nO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==