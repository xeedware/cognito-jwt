// https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32

const JwtDecode = require('jwt-decode');

export interface AccessTokenJwtPayload {

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
export class AccessToken {

    protected jwtToken: string;
    protected payload: AccessTokenJwtPayload;

    /**
     * @returns {object} the token's payload.
     */
    private decodePayload(): object {
        return JwtDecode(this.jwtToken);
    }

    /**
     * Constructs a new CognitoJwtToken object
     * @param {string} token The JWT token.
     */
    constructor(token: string) {
        // Assign object
        this.jwtToken = token || '';
        this.payload = (!token || token === '') ? {} : this.decodePayload();
    }

    /**
     * @returns {string} the record's token.
     */
    getJwtToken(): string {
        return this.jwtToken;
    }

    /**
     * Get the JWT payload
     * @returns {Object}
     */
    getPayload(): object {
        return this.payload;
    }

    /**
     * Get the issuer.
     * @returns {string}
     */
    get iss(): string {
        return this.payload.iss;
    }

    /**
     * Get the subject.
     * @returns {string}
     */
    get sub(): string {
        return this.payload.sub;
    }

    /**
     * Get the intended audience.
     * @returns {string}
     */
    get aud(): string {
        return this.payload.aud;
    }

    /**
     * Get the expiration datetime (seconds since the Epoch).
     * @returns {number}
     */
    get exp(): number {
        return this.payload.exp;
    }

    /**
     * Get the datetime this access token should not be used until (seconds since the Epoch).
     * @returns {number}
     */
    get nbf(): number {
        return this.payload.nbf;
    }

    /**
     * Get the datetime the token was issued (seconds since the Epoch).
     * @returns {number}
     */
    get iat(): number {
        return this.payload.iat;
    }

    /**
     * Get the JWT ID.
     * @returns {string}
     */
    get jti(): string {
        return this.payload.jti;
    }

}
