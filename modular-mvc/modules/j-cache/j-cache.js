'use strict';

/**
 * Add $window, $document, $doc and $body to the global scope
 * @module jCache
 */

import $ from 'jquery';

// ----------------------------------------------------

let descriptor = Object.create(null),
    $body      = null;

// ----------------------------------------------------

window.$window   = $(window);
window.$html     = $(document.documentElement);
window.$document = $(document);
window.$doc      = $document;

// ----------------------------------------------------

descriptor.get = () =>{
    if(!$body)
        console.warn('$body is empty. Get it on document ready.');

    return $body;
};

Object.defineProperty(window, '$body', descriptor);

// ----------------------------------------------------

$(() => $body = $(document.body));