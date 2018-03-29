// Open ID Connect specification: http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims

// tslint:disable:max-line-length
import {IdToken, IdTokenJwtPayload} from './IdToken';

export interface CognitoIdTokenJwtPayload extends IdTokenJwtPayload {
    // Additional attributes set in Cognito IdentityId
    aud?: string;    // Audience
    auth_time?: number;
    'cognito:username'?: string;
    exp?: number;   // Expiration Time (number of seconds since the Epoch)
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
     */
    constructor(token: string) {
        super(token);
    }


    /**
     * Audience
     * @returns {string}
     */
    get aud(): string {
        return (<CognitoIdTokenJwtPayload>this.payload).aud;
    }

    /**
     * Authorization Time
     * @returns {number}
     */
    get auth_time(): number {
        return (<CognitoIdTokenJwtPayload>this.payload).auth_time;
    }

    /**
     * Cognito user pool username
     * @returns {string}
     */
    get cognito_username(): string {
        return (<CognitoIdTokenJwtPayload>this.payload)['cognito:username'];
    }

    /**
     * Expiration (in number of seconds since the Epoch).
     * @returns {number}
     */
    get exp(): number {
        return (<CognitoIdTokenJwtPayload>this.payload).exp;
    }

    /**
     * Issuer
     * @returns {string}
     */
    get iss(): string {
        return (<CognitoIdTokenJwtPayload>this.payload).iss;
    }

    /**
     * Issued At (in number of seconds since the Epoch).
     * @returns {number}
     */
    get iat(): number {
        return (<CognitoIdTokenJwtPayload>this.payload).iat;
    }

    /**
     * Intended scope.
     * @returns {string}
     */
    get scope(): string {
        return (<CognitoIdTokenJwtPayload>this.payload).scope;
    }

    /**
     * Intended token use.
     * @returns {string}
     */
    get tokenUse(): string {
        return (<CognitoIdTokenJwtPayload>this.payload).token_use;
    }

}
