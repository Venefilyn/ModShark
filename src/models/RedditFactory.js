import * as snoowrap from "snoowrap";

export default class RedditFactory {
    /** @member {snoowrap|null} _redditInstance */
    static _redditInstance = null;

    constructor() {
        throw TypeError("Use instance()");
    }

    /**
     * @returns {snoowrap|null}
     */
    static instance() {
        return this._redditInstance;
    }
    
    /** 
     * @param reddit - A snoowrap Reddit instance.
     */
    static setReddit(reddit) {
        if (!(reddit instanceof snoowrap)) {
            throw new TypeError("Parameter must be a snoowrap instance.")
        }
        // noinspection JSValidateTypes
        this._redditInstance = reddit;
    }
}