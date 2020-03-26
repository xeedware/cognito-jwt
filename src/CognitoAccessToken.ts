// https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32

import {AccessToken, AccessTokenPayload} from './AccessToken';
import {CognitoIdTokenPayload} from './CognitoIdToken';
import {VerifyOptions} from 'jsonwebtoken';

// tslint:disable:max-line-length
export interface CognitoAccessTokenPayload extends AccessTokenPayload {

    // Attributes added by Cognito
    auth_time?: number;
    client_id?: string; // Client app ID
    'cognito:groups'?: string[];  //
    device_key?: string // Key for device on which user is authenticated.
    email?: string; // End-User's preferred e-mail address. Its value MUST conform to the RFC 5322 [RFC5322] addr-spec syntax. The RP MUST NOT rely upon this value being unique, as discussed in Section 5.7.
    email_verified?: boolean; // True if the End-User's e-mail address has been verified; otherwise false. When this Claim Value is true, this means that the OP took affirmative steps to ensure that this e-mail address was controlled by the End-User at the time the verification was performed. The means by which an e-mail address is verified is context-specific, and dependent upon the trust framework or contractual agreements within which the parties are operating.
    event_id?: string;
    scope?: string; // Scope for the access token
    token_use?: string; // Intended token use
    username?: string;  // username

}

/** @class */
export class CognitoAccessToken extends AccessToken {

    /**
     * Constructs a new CognitoAccessToken object
     * @param {string} token The JWT token.
     * @param {string} [pem]
     * @param {VerifyOptions} [options]
     */
    constructor(
        token: string,
        protected pem?: string,
        options?: VerifyOptions,
    ) {
        super(token, pem, options);
    }

    /**
     * Get the JWT payload
     * @returns {CognitoAccessTokenPayload}
     */
    getCognitoAccessTokenPayload(): CognitoAccessTokenPayload {
        return super.getJwtPayload<CognitoAccessTokenPayload>();
    }

    /**
     * Authentication Time: Time when the authentication occurred.
     * The number of seconds from 1970-01-01T0:0:0Z as measured in UTC.
     */
    get auth_time(): number {
        return this.getCognitoAccessTokenPayload().auth_time;
    }

    /**
     * Client ID: The AWS Cognito User Pool Application Client ID the token was issued to.
     */
    get client_id(): string {
        return this.getCognitoAccessTokenPayload().client_id;
    }

    /**
     * Cognito user pool groups to which authenticated user belongs.
     * @returns {string[]}
     */
    get cognito_groups(): string[] {
        return (<CognitoIdTokenPayload>super.getJwtPayload<CognitoAccessTokenPayload>())['cognito:groups'];
    }

    /**
     * Device Key: Key assigned to device being used by the authenticated user.
     */
    get device_key(): string {
        return this.getCognitoAccessTokenPayload().device_key;
    }

    /**
     * Email: Preferred email address of the authenticated user.
     */
    get email(): string {
        return this.getCognitoAccessTokenPayload().email;
    }

    /**
     * Email Verified: A true or false value indicating if the user's
     * email address has been verified.
     */
    get email_verified(): boolean {
        return this.getCognitoAccessTokenPayload().email_verified;
    }

    /**
     * Event ID
     * @returns {string}
     */
    get event_id(): string {
        return (<CognitoIdTokenPayload>super.getJwtPayload<CognitoAccessTokenPayload>()).event_id;
    }

    /**
     * String containing a space-separated list of scopes associated with this token.
     */
    get scope(): string {
        return this.getCognitoAccessTokenPayload().scope;
    }

    /**
     * Token Use: 'access' or 'id'.
     */
    get tokenUse(): string {
        return this.getCognitoAccessTokenPayload().token_use;
    }

    /**
     * The username of the authenticated AWS Cognito User Pool user.
     */
    get username(): string {
        return this.getCognitoAccessTokenPayload().username;
    }

}
