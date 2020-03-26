// https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32

import {JsonWebToken} from './JsonWebToken';
import {VerifyOptions} from 'jsonwebtoken';

export interface AccessTokenPayload {

    // Attributes defined by IETF
    aud?: string;    // Audience
    exp?: number;   // Expiration Time (number of seconds since the Epoch)
    iat?: number;   // Issued At (number of seconds since the Epoch)
    iss?: string;   // Issuer
    jti?: string;   // JWT ID
    nbf?: number;   // Not Before (number of seconds since the Epoch)
    sub?: string;   // Subject (GUID)

}

/** @class */
export class AccessToken extends JsonWebToken {


    /**
     * Constructs a new CognitoJwtToken object
     * @param token The JWT token.
     * @param {string} [pem]
     * @param {VerifyOptions} [options]
     */
    constructor(
        token: string,
        pem?: string,
        options?: VerifyOptions,
    ) {
        super(token, pem, options);
    }

    /**
     * Get the JWT payload
     * @returns {AccessTokenPayload}
     */
    getAccessTokenPayload(): AccessTokenPayload {
        return super.getJwtPayload<AccessTokenPayload>();
    }

    /**
     * Get the issuer.
     * @returns {string}
     */
    get iss(): string {
        return this.getAccessTokenPayload().iss;
    }

    /**
     * Get the subject.
     * @returns {string}
     */
    get sub(): string {
        return this.getAccessTokenPayload().sub;
    }

    /**
     * Get the intended audience.
     * @returns {string}
     */
    get aud(): string {
        return this.getAccessTokenPayload().aud;
    }

    /**
     * Get the expiration datetime (seconds since the Epoch).
     * @returns {number}
     */
    get exp(): number {
        return this.getAccessTokenPayload().exp;
    }

    /**
     * Get the datetime this access token should not be used until (seconds since the Epoch).
     * @returns {number}
     */
    get nbf(): number {
        return this.getAccessTokenPayload().nbf;
    }

    /**
     * Get the datetime the token was issued (seconds since the Epoch).
     * @returns {number}
     */
    get iat(): number {
        return this.getAccessTokenPayload().iat;
    }

    /**
     * Get the JWT ID.
     * @returns {string}
     */
    get jti(): string {
        return this.getAccessTokenPayload().jti;
    }

}
