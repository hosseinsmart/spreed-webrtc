/*
 * Spreed WebRTC.
 * Copyright (C) 2013-2014 struktur AG
 *
 * This file is part of Spreed WebRTC.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/* global Promise */
"use strict";
define(['webrtc.adapter'], function() {

	// mediaDevices
	return ["$window", function($window) {

		var mediaDevices = $window.navigator.mediaDevices || {};
		var getUserMedia = (function() {
			// Implement a Promise based wrapper around getUserMedia.
			if (mediaDevices.getUserMedia) {
				// mediaDevices calls return Promise native.
				return mediaDevices.getUserMedia.bind(mediaDevices);
			} else {
				return function getUserMedia(constraints) {
					return new Promise(function(resolve, reject) {
						var onSuccess = function(stream) {
							resolve(stream)
						};
						var onError = function(error) {
							reject(error);
						};
						try {
							$window.getUserMedia(constraints, onSuccess, onError);
						} catch(err) {
							onError(err);
						}
					});
				}
			}
		})();

		// Public api.
		return {
			shim: mediaDevices.getUserMedia ? false : true,
			getUserMedia: getUserMedia
		}

	}];

});