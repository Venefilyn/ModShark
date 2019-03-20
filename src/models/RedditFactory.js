import * as snoowrap from 'snoowrap';

export const USER_AGENT = process.env.VUE_APP_USER_AGENT;
export const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
export const REDIRECT_URL = process.env.VUE_APP_REDIRECT_URL;

export default class RedditFactory {
  /** @member {snoowrap|null} _redditInstance */
  static _redditInstance = null;

  constructor() {
    throw TypeError('Use instance()');
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
      throw new TypeError('Parameter must be a snoowrap instance.')
    }
    reddit.config({ proxies: false });
    // noinspection JSValidateTypes
    this._redditInstance = reddit;
  }
}
