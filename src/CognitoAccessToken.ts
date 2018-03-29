// https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32

import {AccessToken, AccessTokenJwtPayload} from './AccessToken';

// tslint:disable:max-line-length
export interface CognitoAccessTokenJwtPayload extends AccessTokenJwtPayload {

    // Attributes added by Cognito
    auth_time?: number;
    client_id?: string; // Client app ID
    email?: string; // End-User's preferred e-mail address. Its value MUST conform to the RFC 5322 [RFC5322] addr-spec syntax. The RP MUST NOT rely upon this value being unique, as discussed in Section 5.7.
    email_verified?: boolean; // True if the End-User's e-mail address has been verified; otherwise false. When this Claim Value is true, this means that the OP took affirmative steps to ensure that this e-mail address was controlled by the End-User at the time the verification was performed. The means by which an e-mail address is verified is context-specific, and dependent upon the trust framework or contractual agreements within which the parties are operating.
    scope?: string; // Scope for the access token
    token_use?: string; // Intended token use
    username?: string;  // username

}

/** @class */
export class CognitoAccessToken extends AccessToken {

    /**
     * Constructs a new CognitoAccessToken object
     * @param {string} token The JWT token.
     */
    constructor(token: string) {
        super(token);
    }

    get auth_time(): number {
        return (<CognitoAccessTokenJwtPayload>this.payload).auth_time;
    }

    get client_id(): string {
        return (<CognitoAccessTokenJwtPayload>this.payload).client_id;
    }

    get email(): string {
        return (<CognitoAccessTokenJwtPayload>this.payload).email;
    }

    get email_verified(): boolean {
        return (<CognitoAccessTokenJwtPayload>this.payload).email_verified;
    }

    get scope(): string {
        return (<CognitoAccessTokenJwtPayload>this.payload).scope;
    }

    get tokenUse(): string {
        return (<CognitoAccessTokenJwtPayload>this.payload).token_use;
    }

    get username(): string {
        return (<CognitoAccessTokenJwtPayload>this.payload).username;
    }

}
