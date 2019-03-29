import * as snoowrap from 'snoowrap';

export const USER_AGENT = process.env.VUE_APP_USER_AGENT;
export const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
export const REDIRECT_URL = process.env.VUE_APP_REDIRECT_URL;

export default {
  /** @member {snoowrap|null} _redditInstance */
  _redditInstance: null,

  /** @returns {snoowrap|null} */
  instance() {
    return this._redditInstance;
  },

  /** @param reddit A snoowrap Reddit instance. */
  setReddit(reddit) {
    if (!(reddit instanceof snoowrap)) {
      throw new TypeError('Parameter must be a snoowrap instance.')
    }
    reddit.config({ proxies: false });
    // noinspection JSValidateTypes
    this._redditInstance = reddit;
  }
}
