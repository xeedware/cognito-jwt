// Open ID Connect specification: http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims

// tslint:disable:max-line-length
import {IdToken, IdTokenPayload} from './IdToken';
import {VerifyOptions} from 'jsonwebtoken';

export interface CognitoIdTokenPayload extends IdTokenPayload {
    // Additional attributes set in Cognito IdentityId
    aud?: string;    // Audience
    auth_time?: number;
    'cognito:groups'?: string[];
    'cognito:username'?: string;
    exp?: number;   // Expiration Time (number of seconds since the Epoch)
    event_id?: string;
    iss?: string;   // Issuer
    iat?: number;   // Issued At (number of seconds since the Epoch)
    scope?: string;
    token_use?: string;
}

/** @class */
export class CognitoIdToken extends IdToken {


    /**
     * Constructs a new CognitoJwtToken object
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
     * @returns {CognitoIdTokenPayload}
     */
    getCognitoIdTokenPayload(): CognitoIdTokenPayload {
        return super.getJwtPayload<CognitoIdTokenPayload>();
    }

    /**
     * Audience
     * @returns {string}
     */
    get aud(): string {
        return this.getCognitoIdTokenPayload().aud;
    }

    /**
     * Authorization Time
     * @returns {number}
     */
    get auth_time(): number {
        return this.getCognitoIdTokenPayload().auth_time;
    }

    /**
     * Cognito user pool groups to which authenticated user belongs.
     * @returns {string[]}
     */
    get cognito_groups(): string[] {
        return this.getCognitoIdTokenPayload()['cognito:groups'];
    }

    /**
     * Cognito user pool username
     * @returns {string}
     */
    get cognito_username(): string {
        return this.getCognitoIdTokenPayload()['cognito:username'];
    }

    /**
     * Event ID
     * @returns {string}
     */
    get event_id(): string {
        return this.getCognitoIdTokenPayload().event_id;
    }

    /**
     * Expiration (in number of seconds since the Epoch).
     * @returns {number}
     */
    get exp(): number {
        return this.getCognitoIdTokenPayload().exp;
    }

    /**
     * Issuer
     * @returns {string}
     */
    get iss(): string {
        return this.getCognitoIdTokenPayload().iss;
    }

    /**
     * Issued At (in number of seconds since the Epoch).
     * @returns {number}
     */
    get iat(): number {
        return this.getCognitoIdTokenPayload().iat;
    }

    /**
     * Intended scope.
     * @returns {string}
     */
    get scope(): string {
        return this.getCognitoIdTokenPayload().scope;
    }

    /**
     * Intended token use.
     * @returns {string}
     */
    get tokenUse(): string {
        return this.getCognitoIdTokenPayload().token_use;
    }

}
