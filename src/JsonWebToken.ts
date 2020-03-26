const jwt = require('jsonwebtoken');
import {VerifyOptions} from 'jsonwebtoken';

export abstract class JsonWebToken {

    protected header: object = {};
    protected payload: any = {};
    protected signature = '';

    /**
     * Constructs a new CognitoJwtToken object
     * @param {string} token The JWT token.
     * @param {string} [pem]
     * @param {VerifyOptions} [options]
     */
    constructor(
        protected token: string,
        protected pem?: string,
        protected options: VerifyOptions = {},
    ) {
        options.complete = true;
        let decodedToken: { header: object, payload: object, signature: string };
        if (pem) {
            try {
                decodedToken = jwt.verify(token, pem, options);
            } catch (e) {
                // Convert jsonwebtoken package's JsonWebTokenError, NotBeforeError or TokenExpiredError
                // to a standard Error that has only a name and message properties.
                const error = new Error(e.message);
                error.name = e.name;
                throw error;
            }
        } else {
            // decodedToken = jwt.decode(this.token, {json: true, complete: true});
            decodedToken = jwt.decode(this.token, options);
            if (!decodedToken) {
                throw new Error('Invalid or expired token.');
            }
        }
        this.header = decodedToken.header;
        this.payload = decodedToken.payload;
        this.signature = decodedToken.signature;
    }

    protected getJwtPayload<T>(): T {
        return this.payload as T;
    }

    /**
     * Get the JWT payload
     * @returns {Object}
     */
    public getPayload(): object {
        return this.payload;
    }

    /**
     * Get the encoded JSON Web Token string.
     *
     * @deprecated since version 1.2.0.
     *  Will be deleted in version 2.0.0.
     *  Use getToken() instead.
     *
     * @returns {string} the record's token.
     */
    public getJwtToken(): string {
        return this.token;
    }

    /**
     * Get the encoded JSON Web Token string.
     * @returns {string} the record's token.
     */
    public getToken(): string {
        return this.token;
    }

    /**
     * Get decoded header.
     * @returns {string}
     */
    public getHeader(): object {
        return this.header;
    }

    /**
     * Get decoded signature.
     * @returns {string}
     */
    public getSignature(): string {
        return this.signature;
    }

    public getPropertyValue(propertyName: string) {
        return this.payload[propertyName];
    }

}
