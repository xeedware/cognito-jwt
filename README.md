# cognito-jwt

[![Build Status](https://travis-ci.org/xeedware-aws/cognito-jwt.svg?branch=master)](https://travis-ci.org/xeedware-aws/cognito-jwt)
[![codecov](https://codecov.io/gh/xeedware-aws/cognito-jwt/branch/master/graph/badge.svg)](https://codecov.io/gh/xeedware-aws/cognito-jwt)

Typescript friendly AWS Cognito AccessToken and IdToken classes.

Nothing spectacular but convenient classes to encapsulate
AWS Cognito's ID and access tokens; classes we found useful in various projects.

## Overview

This cognito-jwt package provides four convenience classes to access
token claims:
* **AccessToken** \
  Provides access to registered claims as specified by the IETF
  for an access token: \
  https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32
* **IdToken** \
  Provides access to registered claims as specified by Open ID Connect
  for an id token: \
  http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
* **CognitoAccessToken** \
  An extension of the AccessToken class that provides access to
  the registered claims found in AccessToken 
  and public/private claims added by Cognito.
* **CognitoIdToken** \
  An extension of the IdToken class that provides access to
  the registered claims found in IdToken 
  and public/private claims added by Cognito.

## Install
```
$ npm install @xeedware/cognito-jwt --save-dev
```

## Usage

Simply create an instance of CognitoAccessToken and/or
CognitoAccessToken with an access or id jwt string respectively
to access token claims as instance properties.

Typescript:
```
import {CognitoAccessToken, CognitoIdToken} from 'cognito-jwt';

const cognitoAccessTokenString = '<access token string from Cognito>';
const cognitoAccessToken = new CognitoAccessToken(cognitoAccessTokenString);
console.log(cognitoAccessToken.username);
console.log(cognitoAccessToken.exp);

const cognitoIdTokenString = '<id token string from Cognito>';
const cognitoIdToken = new CognitoIdToken(cognitoIdTokenString);
console.log(cognitoIdToken.exp);
console.log(cognitoIdToken.email);

```

## Claims

Claims are statements and additional metadata about an entity
(a user in the case of access and id tokens).
There are three types of claims:
* **Registered claims** \
  A predefined set of recommended claims for the particular
  type of token (e.g. access vs id tokens).
* **Public claims** \
  Custom claims agreed upon to be shared between parties
  that can be found registered with the
  [IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml).
* **Private claims** \
  Custom claims created to be shared between parties that are neither
  _registered_ or _public_ claims.
  
### AccessToken

The AccessToken contains registered claims as specified by the IETF
for an access token: \
https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32

Note claims are optional, therefore returned value may be `undefined`.

Claims are:
* **aud** \
  Audience: Identifies the recipients to whom this JWT is intended.
* **exp** \
  Expiration Time: The time on or after which the JWT _MUST NOT_ be accepted
  for processing.\
  The number of seconds from 1970-01-01T0:0:0Z as measured in UTC.
* **iat** \
  Issued At: The time at which the JWT was issued.\
  The number of seconds from 1970-01-01T0:0:0Z as measured in UTC.
* **iss** \
  Issuer: Identifies the principle who issued the JWT.
* **jti** \
  JWT ID: Unique identifier (GUID) for the JWT.
* **nbf** \
  Not Before: The time before which the JWT _MUST NOT_ be accepted for processing.\
  The number of seconds from 1970-01-01T0:0:0Z as measured in UTC.
* **sub** \
  Subject: A GUID that identifies the principle who is the subject of the JWT.

### CognitoAccessToken
The CognitoAccessToken extends AccessToken containing public and private
claims added to the registered claims available in the AccessToken.

Added claims are:
* **auth_time** \
  Authentication Time: Time when the authentication occurred.\
  The number of seconds from 1970-01-01T0:0:0Z as measured in UTC.
* **client_id** \
  Client ID: The AWS Cognito User Pool Application Client ID the token was issued to.
* **email** \
  Email: Preferred email address of the authenticated user.
* **email_verified** \
  Email Verified: A true or false value indicating if the user's
	email address has been verified.
* **scope** \
  String containing a space-separated list of scopes associated with this token.
* **token_use** \
  Token Use: `access` or `id`.
* **username** \
  The username of the authenticated AWS Cognito User Pool user.


### IdToken
The IdToken contains registered claims as specified by Open ID Connect
for an id token: \
http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims

Note claims are optional, therefore returned value may be `undefined`.

The claims are (descriptions from Open ID Connect specification):
* **address** \
  End-User's preferred postal address. \
  The value of the address member is a JSON [RFC4627] structure 
  containing some or all of the members defined in Section 5.1.1.
* **birthdate** \
  End-User's birthday, represented as an ISO 8601:2004 [ISO8601‑2004] YYYY-MM-DD format. \
  The year MAY be 0000, indicating that it is omitted. 
  To represent only the year, YYYY format is allowed. 
  Note that depending on the underlying platform's date related function, 
  providing just year can result in varying month and day, so the implementers 
  need to take this factor into account to correctly process the dates.
* **email** \
  End-User's preferred e-mail address.\
  Its value MUST conform to the RFC 5322 [RFC5322] addr-spec syntax. 
  Relying Party (RP) _MUST NOT_ rely upon this value being unique, as discussed in Section 5.7.
* **email_verified** \
  True if the End-User's e-mail address has been verified; otherwise false.\
  When this Claim Value is true, this means that authentication provider 
  took affirmative steps to ensure that this e-mail address was controlled by the 
  End-User at the time the verification was performed. 
  The means by which an e-mail address is verified is context-specific, and 
  dependent upon the trust framework or contractual agreements within which the parties are operating.
* **family_name** \
  Surname(s) or last name(s) of the End-User. \
  Note that in some cultures, people can have multiple family names or no family name; 
  all can be present, with the names being separated by space characters.
* **gender** \
  End-User's gender. \
  Values defined by this specification are `female` and `male`. 
  Other values MAY be used when neither of the defined values are applicable.
* **given_name** \
  Given name(s) or first name(s) of the End-User. \
  Note that in some cultures, people can have multiple given names; 
  all can be present, with the names being separated by space characters.
* locale \
  End-User's locale, represented as a BCP47 [RFC5646] language tag.\ 
  This is typically an ISO 639-1 Alpha-2 [ISO639‑1] language code in lowercase 
  and an ISO 3166-1 Alpha-2 [ISO3166‑1] country code in uppercase, separated by a dash. 
  For example, en-US or fr-CA. 
  As a compatibility note, some implementations have used an underscore as the separator rather than a dash, 
  for example, en_US; Relying Parties _MAY_ choose to accept this locale syntax as well.
* **middle_name** \
  Middle name(s) of the End-User. \
  Note that in some cultures, people can have multiple middle names; 
  all can be present, with the names being separated by space characters. 
  Also note that in some cultures, middle names are not used.
* **name** \
  End-User's full name in displayable form including all name parts, 
  possibly including titles and suffixes, 
  ordered according to the End-User's locale and preferences.
* **nickname** \
  Casual name of the End-User that may or may not be the same as the given_name. 
  For instance, a nickname value of `Mike` might be returned alongside a given_name value of `Michael`.
* **phone_number** \
  End-User's preferred telephone number. E.164 [E.164] is RECOMMENDED as the format of this Claim, 
  for example, `+1 (425) 555-1212` or `+56 (2) 687 2400`. 
  If the phone number contains an extension, it is RECOMMENDED that the extension be represented 
  using the RFC 3966 [RFC3966] extension syntax, for example, `+1 (604) 555-1234;ext=5678`.
* **phone_number_verified** \
  True if the End-User's phone number has been verified; otherwise false.\ 
  When this Claim Value is true, this means that the OP took affirmative steps to ensure that 
  this phone number was controlled by the End-User at the time the verification was performed. 
  The means by which a phone number is verified is context-specific, and dependent upon the 
  trust framework or contractual agreements within which the parties are operating. 
  When true, the phone_number Claim _MUST_ be in E.164 format and any extensions _MUST_ 
  be represented in RFC 3966 format.
* **picture** \
  URL of the End-User's profile picture. \
  This URL MUST refer to an image file (for example, a PNG, JPEG, or GIF image file), 
  rather than to a Web page containing an image. 
  Note that this URL _SHOULD_ specifically reference a profile photo of the End-User suitable for displaying 
  when describing the End-User, rather than an arbitrary photo taken by the End-User.
* **preferred_username** \
  Shorthand name by which the End-User wishes to be referred to at the Relying Party, such as janedoe or j.doe. \
  This value MAY be any valid JSON string including special characters such as @, /, or whitespace. 
  The Relying Party MUST NOT rely upon this value being unique, as discussed in Section 5.7.
* **profile** \
  URL of the End-User's profile page. \
  The contents of this Web page _SHOULD_ be about the End-User.
* **sub** \
  Subject - Identifier for the End-User at the Issuer.
* **updated_at** \
  Time the End-User's information was last updated. \
  The number of seconds from 1970-01-01T0:0:0Z  s measured in UTC.
* **website** \
  URL of the End-User's Web page or blog. \
  This Web page _SHOULD_ contain information published by the End-User or an organization 
  that the End-User is affiliated with.
* **zoneinfo** \
  String from zoneinfo [zoneinfo] time zone database representing the End-User's time zone. 
  For example, Europe/Paris or America/Los_Angeles.

### CognitoIdToken
The CognitoIdToken extends IdToken containing public and private
claims added to the registered claims available in the AccessToken.
Note that some of the same claims can be found in an AccessToken.

Added claims are:
* **aud** \
  Audience: Identifies the recipients to whom this JWT is intended.
* **auth_time** \
  Authentication Time: Time when the authentication occurred.\
  The number of seconds from 1970-01-01T0:0:0Z  as measured in UTC.
* **cognito_username** \
  Stored in the JwtPayload as `cognito:username` property,
  this is the username of the authenticated AWS Cognito User Pool user.
* **exp** \
  Expiration Time: The time on or after which the JWT _MUST NOT_ be accepted
  for processing.\
  The number of seconds from 1970-01-01T0:0:0Z as measured in UTC.
* **iss** \
  Issuer: Identifies the principle who issued the JWT.
* **iat** \
  Issued At: The time at which the JWT was issued.\
  The number of seconds from 1970-01-01T0:0:0Z  as measured in UTC.
* **scope** \
  String containing a space-separated list of scopes associated with this token.
* **token_use** \
  Token Use: `access` or `id`.


# References
* [JSON Web Token (JWT)](https://tools.ietf.org/html/draft-ietf-oauth-json-web-token-32)
* [RFC7519 JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519)
* [JWT Introduction](https://jwt.io/introduction/)

# License
[MIT](http://vjpr.mit-license.org)
