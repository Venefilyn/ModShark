import IAuthentication from "./IAuthentication";

export default class LocalAuthentication extends IAuthentication {
    /**
     * @inheritdoc
     */
    getAccessToken() {
        return this.vm.$store.state.accessToken.toString();
    }
}
