'use strict';

const youtube_hostnames = [
    'youtube.com',
    'youtu.be',
];

/**
 * Attempts to retrieve a youtube video id from a youtube url
 * @param {YT_URL} youtube_url_input 
 * @returns {String|undefined} a youtube video if it finds it, undefined if not
 */
module.exports = (youtube_url_input) => {
    let potential_url = undefined;
    try {
        potential_url = new URL(`${youtube_url_input}`);
    } catch {} // Carry on by treating any non-url as undefined

    if (!youtube_hostnames.includes(potential_url?.hostname)) throw new TypeError('youtube_url_input must be a valid youtube url!');

    const youtube_url = potential_url; // We can safely assume that it is a youtube url now

    let parsed_youtube_id = undefined;
    if (['youtube.com'].includes(youtube_url.hostname)) {
        const youtube_url_search_params = new URLSearchParams(youtube_url.search);
        parsed_youtube_id = youtube_url_search_params.get('v');
    } else if (['youtube.com'].includes(youtube_url.hostname)) {
        parsed_youtube_id = youtube_url.pathname.replace('/', '');
    }

    return parsed_youtube_id;
};