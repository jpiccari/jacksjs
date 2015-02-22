/*
 * Copyright (c) 2015 Joshua Piccari, All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

function jacks(url, settings) {
	var resolveHandlers = [],
		rejectHandlers = [];

	function done(isResolved) {
		var handlers = isResolved ? resolveHandlers : rejectHandlers,
			args = Array.apply(0, arguments).slice(1),
			fn;

		while ((fn = handlers.shift())) {
			fn.apply(0, args);
		}

		// Clean up memory
		resolveHandlers.length = 0;
		rejectHandlers.length = 0;
	}


	if (typeof url === 'object') {
		settings = url;
		url = undefined;
	}



	return {
		'then': function(resolve, reject) {
			if (typeof resolve === 'function') {
				resolveHandlers.push(resolve);
			}
			if (typeof reject === 'function') {
				rejectHandlers.push(reject);
			}

			return this;
		},
		'catch': function(reject) {
			return this.then(0, reject);
		}
	};
}