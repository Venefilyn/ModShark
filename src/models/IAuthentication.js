/**
 * Interface class for the authentication of Access Token. Its purpose is to provide an access token through
 * {@link IAuthentication.getAccessToken}. It integrates with VueJS and requires a Vue component as a constructor
 * argument.
 */
export default class IAuthentication {
    /**
     * Create a new authentication class.
     * @param {Vue} vm Vue component called from.
     */
    constructor(vm) {
        this.vm = vm;
    }

    // noinspection JSUnusedGlobalSymbols
    // noinspection JSMethodCanBeStatic
    /**
     * Returns the access token used to authenticate with Reddit API. Throws Error if function is not implemented.
     * @return {string} access token
     */
    getAccessToken() {
        throw new Error("Not implemented")
    }

    /**
     * @return {Vue} Vue component
     */
    get vm() {
        return this._vm;
    }

    /**
     * @param {Vue} value Vue component.
     */
    set vm(value) {
        if (!value['_isVue']) {
            throw new Error("Not a Vue component")
        }
        this._vm = value;
    }
}
