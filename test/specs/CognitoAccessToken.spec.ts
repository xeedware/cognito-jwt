import {CognitoAccessToken, CognitoAccessTokenPayload} from '../../src';
import {assert, expect} from 'chai';
import {VerifyOptions} from 'jsonwebtoken';

const jwkToPem = require('jwk-to-pem');

// tslint:disable:max-line-length
// tslint:disable:no-unused-expression

describe('CognitoAccessToken class', () => {

    const pem = jwkToPem({
        'alg': 'RS256',
        'e': 'AQAB',
        'kid': 'aj5k1/ckHiUul+ytVeCpWX39O89yFeGUmstJEhA3y7s=',
        'kty': 'RSA',
        'n': 'sSvMFsjDuF7btvgC_LN4zec1j5iCKtRNlWbOb0wBuUERXLVxdkExHk2wXz-_GhU9WpFPoLLR1n-D7w1QJZDkVdf4NmrObwAd1ABjtxXDn_ImwYyEj9LOcUUZEsEjcFYhNbiVkBY5R5IaiItFlvQwaoYoh12c1IsTigCHnAgWnLmj0S1HXLDUDFh6pYqZImgHKS3Fyih6SdcUUCgIQoXGI3GqR1OX1B7aKAuQFX0pfOyLzRaTgi9tqX43XL533M-m0OGN_1zYHPe92O_gbuHy_lZYyL2dCxasiUU2yuoDP36FH2fFiT3_tNJ8_Jph--UJHev4xzhIhrbxumFbK_aQAQ',
        'use': 'sig'
    });

    describe('jwt with invalid signature', () => {

        const jwtString = 'eyJraWQiOiI2aXF3QlVwM3lzNkJWdGNqVEY5TG80Sjk4Qmd3aVZ4UEU4MlJkd3YrTEVFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwNTE2NjEzMy1iMzFhLTRjYjQtOTQyNC0yMjAwNWJiM2EyMTYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfejZtMUpJRnc0IiwiZXhwIjoxNTEwMjE1MTM4LCJpYXQiOjE1MTAyMTE1MzgsImp0aSI6IjdhN2M5ZDkwLWUwZWItNDBjMS05ODUzLWVjZTA1YTYwZTNjNCIsImNsaWVudF9pZCI6IjJyc2tubHRldXRkZXMyc3RpaGNlM2tkNW1jIiwidXNlcm5hbWUiOiJhbG9wdGltYSJ9.eA-qcenfIqnOakv1vZlfTNnLfH4TRb8_-yW4i7oL1SBFDXPR700Q-4pG7tJyTKr2_RjiEEOPtrWGwUcsLPbRMrTQELLzWdRp_X8dsT8-WE5X16dES5Uixpa5yMMvRVwCHZZD7ti-Ko2EAcO0ziz0G_R1wCKT2oVgQejsHwDJOT1PmDvawGufxLnuSVsqVNDBZxE52n45103bfzP7KtM7tay2Tc_NxZrfcL_8wep-_IMY59Z8aoerM2aaJprxOlN-XqfB43Tec9wFuDOEEPdx7XVIpcRRwz4POJYrhbrtD6GfBXztlwv5Ud_c5m4lWy-j1r7mCeDKBZmjI1WkBILyXA';
        const expectedCognitoAccessTokenPayload: CognitoAccessTokenPayload = {
            'sub': '05166133-b31a-4cb4-9424-22005bb3a216',
            'token_use': 'access',
            'scope': 'aws.cognito.signin.user.admin',
            'iss': 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_z6m1JIFw4',
            'exp': 1510215138,
            'iat': 1510211538,
            'jti': '7a7c9d90-e0eb-40c1-9853-ece05a60e3c4',
            'client_id': '2rsknlteutdes2stihce3kd5mc',
            'username': 'aloptima'
        };

        describe('instantiation without PEM', () => {

            it('should succeed.', () => {
                const iut = new CognitoAccessToken(jwtString);
                expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoAccessTokenPayload));
                expect(JSON.stringify(iut.getCognitoAccessTokenPayload())).equal(JSON.stringify(expectedCognitoAccessTokenPayload));
                expect(iut.getPropertyValue('sub')).equal(expectedCognitoAccessTokenPayload.sub);
                expect(iut.getPropertyValue('bogus')).to.be.undefined;
                // Deprecated methods
                expect(iut.tokenUse).equal(expectedCognitoAccessTokenPayload.token_use);
                // CognitoAccessToken added attributes
                expect(iut.auth_time).equal(expectedCognitoAccessTokenPayload.auth_time);
                expect(iut.client_id).equal(expectedCognitoAccessTokenPayload.client_id);
                expect(iut.cognito_groups).equal(expectedCognitoAccessTokenPayload['cognito:groups']);
                expect(iut.device_key).equal(expectedCognitoAccessTokenPayload.device_key);
                expect(iut.email).equal(expectedCognitoAccessTokenPayload.email);
                expect(iut.email_verified).equal(expectedCognitoAccessTokenPayload.email_verified);
                expect(iut.event_id).equal(expectedCognitoAccessTokenPayload.event_id);
                expect(iut.scope).equal(expectedCognitoAccessTokenPayload.scope);
                expect(iut.tokenUse).equal(expectedCognitoAccessTokenPayload.token_use);
                expect(iut.username).equal(expectedCognitoAccessTokenPayload.username);
                // IETF attributes
                expect(iut.aud).equal(expectedCognitoAccessTokenPayload.aud);
                expect(iut.exp).equal(expectedCognitoAccessTokenPayload.exp);
                expect(iut.iat).equal(expectedCognitoAccessTokenPayload.iat);
                expect(iut.iss).equal(expectedCognitoAccessTokenPayload.iss);
                expect(iut.jti).equal(expectedCognitoAccessTokenPayload.jti);
                expect(iut.nbf).equal(expectedCognitoAccessTokenPayload.nbf);
                expect(iut.sub).equal(expectedCognitoAccessTokenPayload.sub);
                // Header and Signature
                expect(JSON.stringify(iut.getHeader())).equal('{"kid":"6iqwBUp3ys6BVtcjTF9Lo4J98BgwiVxPE82Rdwv+LEE=","alg":"RS256"}');
                expect(iut.getSignature()).equal('eA-qcenfIqnOakv1vZlfTNnLfH4TRb8_-yW4i7oL1SBFDXPR700Q-4pG7tJyTKr2_RjiEEOPtrWGwUcsLPbRMrTQELLzWdRp_X8dsT8-WE5X16dES5Uixpa5yMMvRVwCHZZD7ti-Ko2EAcO0ziz0G_R1wCKT2oVgQejsHwDJOT1PmDvawGufxLnuSVsqVNDBZxE52n45103bfzP7KtM7tay2Tc_NxZrfcL_8wep-_IMY59Z8aoerM2aaJprxOlN-XqfB43Tec9wFuDOEEPdx7XVIpcRRwz4POJYrhbrtD6GfBXztlwv5Ud_c5m4lWy-j1r7mCeDKBZmjI1WkBILyXA');
            });

        });

        describe('instantiation with PEM', () => {

            it('should throw JsonWebTokenError - invalid signature.', () => {
                try {
                    new CognitoAccessToken(jwtString, pem);
                    assert.fail('Failed to throw JsonWebTokenError - invalid signature');
                } catch (error) {
                    expect(error instanceof Error).to.be.true;
                    expect(error.name).equal('JsonWebTokenError');
                    expect(error.message).equal('invalid signature');
                }
            });

        });
    });

    describe('expired jwt without groups and event_id', () => {

        const jwtString = 'eyJraWQiOiJhajVrMVwvY2tIaVV1bCt5dFZlQ3BXWDM5Tzg5eUZlR1Vtc3RKRWhBM3k3cz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwMDI0YTYyMi00MzE0LTRkZjYtYjlkZC02ODBhMWYwYTIwYjUiLCJldmVudF9pZCI6ImU3MTIzNzU4LTRhZGEtNDdhOC1iYzczLWFhZDI3MmMxNmM3MiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1ODUxNzc2MTMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1hSc1VHa3d5VSIsImV4cCI6MTU4NTE4MTIxMywiaWF0IjoxNTg1MTc3NjEzLCJqdGkiOiIxZDIwMzM3YS0zNDdhLTRiY2EtOWRhYS0wMDE5YjNhOTZmYjMiLCJjbGllbnRfaWQiOiI0dGc3ZmhpZGI1YWRyNWpjMWJuYTRtZTJpNiIsInVzZXJuYW1lIjoiQmFzaWNVc2VyIn0.Swb2BF0JYALgYUpmv1t17aIB_aDsWre2Ak18Kal40NNMpZkY_iPiH9jMOOQat-BI7_3QBUZVK3N_N9GnxeETJd-r-Kw2QjP7jCZ8jVp9svRo1u6uqJAIoaHI_DoooA7BTeH4B2o3XbZyvCfunsjU1oaTHmS5ZraSOd9mpU1N9xZF4rQE6CDx3f8dT_awkNN6qdox7hE2xD7V7spKSzWIdGJozFPrtFGQZIugKtGRd6Jgwy5gyKDSzA83k499gPiR6Z_VJBwHIm5c2JliP0HL5UboV8VVwzaVsfGnkjjCY6i5fnsGNY4VHbMb73DENoff3HHY93Q3klmvaqGwquZfbg';
        const expectedCognitoAccessTokenPayload: CognitoAccessTokenPayload = {
            'sub': '0024a622-4314-4df6-b9dd-680a1f0a20b5',
            'event_id': 'e7123758-4ada-47a8-bc73-aad272c16c72',
            'token_use': 'access',
            'scope': 'aws.cognito.signin.user.admin',
            'auth_time': 1585177613,
            'iss': 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_XRsUGkwyU',
            'exp': 1585181213,
            'iat': 1585177613,
            'jti': '1d20337a-347a-4bca-9daa-0019b3a96fb3',
            'client_id': '4tg7fhidb5adr5jc1bna4me2i6',
            'username': 'BasicUser'
        };

        describe('instantiation without PEM', () => {

            it('should succeed', () => {
                const iut = new CognitoAccessToken(jwtString);
                expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoAccessTokenPayload));
                expect(JSON.stringify(iut.getCognitoAccessTokenPayload())).equal(JSON.stringify(expectedCognitoAccessTokenPayload));
                expect(iut.getPropertyValue('sub')).equal(expectedCognitoAccessTokenPayload.sub);
                expect(iut.getPropertyValue('bogus')).to.be.undefined;
                // Deprecated methods
                expect(iut.tokenUse).equal(expectedCognitoAccessTokenPayload.token_use);
                // CognitoAccessToken added attributes
                expect(iut.auth_time).equal(expectedCognitoAccessTokenPayload.auth_time);
                expect(iut.client_id).equal(expectedCognitoAccessTokenPayload.client_id);
                expect(iut.cognito_groups).equal(expectedCognitoAccessTokenPayload['cognito:groups']);
                expect(iut.device_key).equal(expectedCognitoAccessTokenPayload.device_key);
                expect(iut.email).equal(expectedCognitoAccessTokenPayload.email);
                expect(iut.email_verified).equal(expectedCognitoAccessTokenPayload.email_verified);
                expect(iut.event_id).equal(expectedCognitoAccessTokenPayload.event_id);
                expect(iut.scope).equal(expectedCognitoAccessTokenPayload.scope);
                expect(iut.token_use).equal(expectedCognitoAccessTokenPayload.token_use);
                expect(iut.username).equal(expectedCognitoAccessTokenPayload.username);
                // IETF attributes
                expect(iut.aud).equal(expectedCognitoAccessTokenPayload.aud);
                expect(iut.exp).equal(expectedCognitoAccessTokenPayload.exp);
                expect(iut.iat).equal(expectedCognitoAccessTokenPayload.iat);
                expect(iut.iss).equal(expectedCognitoAccessTokenPayload.iss);
                expect(iut.jti).equal(expectedCognitoAccessTokenPayload.jti);
                expect(iut.nbf).equal(expectedCognitoAccessTokenPayload.nbf);
                expect(iut.sub).equal(expectedCognitoAccessTokenPayload.sub);
                // Header and Signature
                expect(JSON.stringify(iut.getHeader())).equal('{"kid":"aj5k1/ckHiUul+ytVeCpWX39O89yFeGUmstJEhA3y7s=","alg":"RS256"}');
                expect(iut.getSignature()).equal('Swb2BF0JYALgYUpmv1t17aIB_aDsWre2Ak18Kal40NNMpZkY_iPiH9jMOOQat-BI7_3QBUZVK3N_N9GnxeETJd-r-Kw2QjP7jCZ8jVp9svRo1u6uqJAIoaHI_DoooA7BTeH4B2o3XbZyvCfunsjU1oaTHmS5ZraSOd9mpU1N9xZF4rQE6CDx3f8dT_awkNN6qdox7hE2xD7V7spKSzWIdGJozFPrtFGQZIugKtGRd6Jgwy5gyKDSzA83k499gPiR6Z_VJBwHIm5c2JliP0HL5UboV8VVwzaVsfGnkjjCY6i5fnsGNY4VHbMb73DENoff3HHY93Q3klmvaqGwquZfbg');
            });

        });
        describe('instantiation with PEM', () => {

            describe('without ignoreExpiration option', () => {

                it('should throw TokenExpiredError', () => {
                    try {
                        new CognitoAccessToken(jwtString, pem);
                        assert.fail('Failed to throw TokenExpiredError');
                    } catch (error) {
                        expect(error instanceof Error).to.be.true;
                        expect(error.name).equal('TokenExpiredError');
                        expect(error.message).equal('jwt expired');
                    }

                });

            });

            describe('with ignoreExpiration option', () => {

                const options: VerifyOptions = {
                    ignoreExpiration: true,
                };

                it(' should succeed without groups', () => {
                    const iut = new CognitoAccessToken(jwtString, pem, options);
                    expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoAccessTokenPayload));
                    expect(JSON.stringify(iut.getCognitoAccessTokenPayload())).equal(JSON.stringify(expectedCognitoAccessTokenPayload));
                    expect(iut.getPropertyValue('sub')).equal(expectedCognitoAccessTokenPayload.sub);
                    expect(iut.getPropertyValue('bogus')).to.be.undefined;
                    // Deprecated methods
                    expect(iut.tokenUse).equal(expectedCognitoAccessTokenPayload.token_use);
                    // CognitoAccessToken added attributes
                    expect(iut.auth_time).equal(expectedCognitoAccessTokenPayload.auth_time);
                    expect(iut.client_id).equal(expectedCognitoAccessTokenPayload.client_id);
                    expect(iut.cognito_groups).equal(expectedCognitoAccessTokenPayload['cognito:groups']);
                    expect(iut.device_key).equal(expectedCognitoAccessTokenPayload.device_key);
                    expect(iut.email).equal(expectedCognitoAccessTokenPayload.email);
                    expect(iut.email_verified).equal(expectedCognitoAccessTokenPayload.email_verified);
                    expect(iut.event_id).equal(expectedCognitoAccessTokenPayload.event_id);
                    expect(iut.scope).equal(expectedCognitoAccessTokenPayload.scope);
                    expect(iut.token_use).equal(expectedCognitoAccessTokenPayload.token_use);
                    expect(iut.username).equal(expectedCognitoAccessTokenPayload.username);
                    // IETF attributes
                    expect(iut.aud).equal(expectedCognitoAccessTokenPayload.aud);
                    expect(iut.exp).equal(expectedCognitoAccessTokenPayload.exp);
                    expect(iut.iat).equal(expectedCognitoAccessTokenPayload.iat);
                    expect(iut.iss).equal(expectedCognitoAccessTokenPayload.iss);
                    expect(iut.jti).equal(expectedCognitoAccessTokenPayload.jti);
                    expect(iut.nbf).equal(expectedCognitoAccessTokenPayload.nbf);
                    expect(iut.sub).equal(expectedCognitoAccessTokenPayload.sub);
                    // Header and Signature
                    expect(JSON.stringify(iut.getHeader())).equal('{"kid":"aj5k1/ckHiUul+ytVeCpWX39O89yFeGUmstJEhA3y7s=","alg":"RS256"}');
                    expect(iut.getSignature()).equal('Swb2BF0JYALgYUpmv1t17aIB_aDsWre2Ak18Kal40NNMpZkY_iPiH9jMOOQat-BI7_3QBUZVK3N_N9GnxeETJd-r-Kw2QjP7jCZ8jVp9svRo1u6uqJAIoaHI_DoooA7BTeH4B2o3XbZyvCfunsjU1oaTHmS5ZraSOd9mpU1N9xZF4rQE6CDx3f8dT_awkNN6qdox7hE2xD7V7spKSzWIdGJozFPrtFGQZIugKtGRd6Jgwy5gyKDSzA83k499gPiR6Z_VJBwHIm5c2JliP0HL5UboV8VVwzaVsfGnkjjCY6i5fnsGNY4VHbMb73DENoff3HHY93Q3klmvaqGwquZfbg');
                });

            });

        });

    });

    describe('expired jwt with groups', () => {

        const jwtString = 'eyJraWQiOiJhajVrMVwvY2tIaVV1bCt5dFZlQ3BXWDM5Tzg5eUZlR1Vtc3RKRWhBM3k3cz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkZjBjNDU2ZS0wNWVkLTQ1MTctOTEyZC0yZGZkN2E4ZDEyZWYiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbi10ZWNoc3VwcG9ydCJdLCJldmVudF9pZCI6IjRhN2JjYTM4LWI3MWMtNDlhMi1hYTg2LTNiOTNhMjU5YzIxYyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1ODUxMDQyMzksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1hSc1VHa3d5VSIsImV4cCI6MTU4NTEwNzgzOSwiaWF0IjoxNTg1MTA0MjM5LCJqdGkiOiI3MGMxMTYzNS04ZmVkLTRkYmItOWY3NS0xYWEwNmQ0OGZjZGMiLCJjbGllbnRfaWQiOiI0dGc3ZmhpZGI1YWRyNWpjMWJuYTRtZTJpNiIsInVzZXJuYW1lIjoiVGVjaFN1cHBvcnRVc2VyIn0.XXFHr-B-1m3o5aIJ6SASYpsIH6Gqtny9yS1rFvuNTSVnqZxAuCva-dnH5aTNNhYoVE_ZAAhYsbVW6YqY5agobQ-AfyeYZxuwEsnTgefMH1TE9GyCkZXhgOzqqTirU_eBebRe3tQwfUgNWz52CX3Hp55FMiugA85Mk5W2Fp5nSJ4HvPStBFUXYYRnB8m-q5406ECCcyKqJTbMzYCWYFYQNCHcsHrv1Eobe92Fs48PiOWKyjaJkyX3wQblmls6P-s55hc9Y5j4cx8O_A1aI10vTKwBzQVYBnq0C4261w3ogKkf_VWRuqUOpZmBl6VBhyddLVhp60HogktDTEoNjIf-Bw';
        const expectedCognitoAccessTokenPayload: CognitoAccessTokenPayload = {
            'sub': 'df0c456e-05ed-4517-912d-2dfd7a8d12ef',
            'cognito:groups': [
                'admin-techsupport'
            ],
            'event_id': '4a7bca38-b71c-49a2-aa86-3b93a259c21c',
            'token_use': 'access',
            'scope': 'aws.cognito.signin.user.admin',
            'auth_time': 1585104239,
            'iss': 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_XRsUGkwyU',
            'exp': 1585107839,
            'iat': 1585104239,
            'jti': '70c11635-8fed-4dbb-9f75-1aa06d48fcdc',
            'client_id': '4tg7fhidb5adr5jc1bna4me2i6',
            'username': 'TechSupportUser'
        };

        describe('instantiation without PEM', () => {

            it(' should succeed with cognito:groups and event_id', () => {
                const iut = new CognitoAccessToken(jwtString);
                expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoAccessTokenPayload));
                expect(JSON.stringify(iut.getCognitoAccessTokenPayload())).equal(JSON.stringify(expectedCognitoAccessTokenPayload));
                expect(iut.getPropertyValue('sub')).equal(expectedCognitoAccessTokenPayload.sub);
                expect(iut.getPropertyValue('bogus')).to.be.undefined;
                // Deprecated methods
                expect(iut.tokenUse).equal(expectedCognitoAccessTokenPayload.token_use);
                // CognitoAccessToken added attributes
                expect(iut.auth_time).equal(expectedCognitoAccessTokenPayload.auth_time);
                expect(iut.client_id).equal(expectedCognitoAccessTokenPayload.client_id);
                expect(iut.cognito_groups.length).equal(expectedCognitoAccessTokenPayload['cognito:groups'].length);
                expect(iut.cognito_groups[0]).equal(expectedCognitoAccessTokenPayload['cognito:groups'][0]);
                expect(iut.device_key).equal(expectedCognitoAccessTokenPayload.device_key);
                expect(iut.email).equal(expectedCognitoAccessTokenPayload.email);
                expect(iut.email_verified).equal(expectedCognitoAccessTokenPayload.email_verified);
                expect(iut.event_id).equal(expectedCognitoAccessTokenPayload.event_id);
                expect(iut.scope).equal(expectedCognitoAccessTokenPayload.scope);
                expect(iut.token_use).equal(expectedCognitoAccessTokenPayload.token_use);
                expect(iut.username).equal(expectedCognitoAccessTokenPayload.username);
                // IETF attributes
                expect(iut.aud).equal(expectedCognitoAccessTokenPayload.aud);
                expect(iut.exp).equal(expectedCognitoAccessTokenPayload.exp);
                expect(iut.iat).equal(expectedCognitoAccessTokenPayload.iat);
                expect(iut.iss).equal(expectedCognitoAccessTokenPayload.iss);
                expect(iut.jti).equal(expectedCognitoAccessTokenPayload.jti);
                expect(iut.nbf).equal(expectedCognitoAccessTokenPayload.nbf);
                expect(iut.sub).equal(expectedCognitoAccessTokenPayload.sub);
                // Header and Signature
                expect(JSON.stringify(iut.getHeader())).equal('{"kid":"aj5k1/ckHiUul+ytVeCpWX39O89yFeGUmstJEhA3y7s=","alg":"RS256"}');
                expect(iut.getSignature()).equal('XXFHr-B-1m3o5aIJ6SASYpsIH6Gqtny9yS1rFvuNTSVnqZxAuCva-dnH5aTNNhYoVE_ZAAhYsbVW6YqY5agobQ-AfyeYZxuwEsnTgefMH1TE9GyCkZXhgOzqqTirU_eBebRe3tQwfUgNWz52CX3Hp55FMiugA85Mk5W2Fp5nSJ4HvPStBFUXYYRnB8m-q5406ECCcyKqJTbMzYCWYFYQNCHcsHrv1Eobe92Fs48PiOWKyjaJkyX3wQblmls6P-s55hc9Y5j4cx8O_A1aI10vTKwBzQVYBnq0C4261w3ogKkf_VWRuqUOpZmBl6VBhyddLVhp60HogktDTEoNjIf-Bw');
            });

        });

        describe('instantiation with PEM', () => {

            describe('without ignoreExpiration option', () => {
                it('should be expired', () => {
                    try {
                        new CognitoAccessToken(jwtString, pem);
                        assert.fail('Failed to throw TokenExpiredError');
                    } catch (error) {
                        expect(error instanceof Error).to.be.true;
                        expect(error.name).equal('TokenExpiredError');
                        expect(error.message).equal('jwt expired');
                    }

                });
            });

            describe('with ignoreExpiration option', () => {
                const options: VerifyOptions = {
                    ignoreExpiration: true,
                };
                it(' should succeed with cognito:groups and event_id', () => {
                    const iut = new CognitoAccessToken(jwtString, pem, options);
                    expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoAccessTokenPayload));
                    expect(JSON.stringify(iut.getCognitoAccessTokenPayload())).equal(JSON.stringify(expectedCognitoAccessTokenPayload));
                    expect(iut.getPropertyValue('sub')).equal(expectedCognitoAccessTokenPayload.sub);
                    expect(iut.getPropertyValue('bogus')).to.be.undefined;
                    // Deprecated methods
                    expect(iut.getJwtToken()).equal(jwtString);
                    // CognitoAccessToken added attributes
                    expect(iut.auth_time).equal(expectedCognitoAccessTokenPayload.auth_time);
                    expect(iut.client_id).equal(expectedCognitoAccessTokenPayload.client_id);
                    expect(iut.cognito_groups.length).equal(expectedCognitoAccessTokenPayload['cognito:groups'].length);
                    expect(iut.cognito_groups[0]).equal(expectedCognitoAccessTokenPayload['cognito:groups'][0]);
                    expect(iut.device_key).equal(expectedCognitoAccessTokenPayload.device_key);
                    expect(iut.email).equal(expectedCognitoAccessTokenPayload.email);
                    expect(iut.email_verified).equal(expectedCognitoAccessTokenPayload.email_verified);
                    expect(iut.event_id).equal(expectedCognitoAccessTokenPayload.event_id);
                    expect(iut.scope).equal(expectedCognitoAccessTokenPayload.scope);
                    expect(iut.token_use).equal(expectedCognitoAccessTokenPayload.token_use);
                    expect(iut.username).equal(expectedCognitoAccessTokenPayload.username);
                    // IETF attributes
                    expect(iut.aud).equal(expectedCognitoAccessTokenPayload.aud);
                    expect(iut.exp).equal(expectedCognitoAccessTokenPayload.exp);
                    expect(iut.iat).equal(expectedCognitoAccessTokenPayload.iat);
                    expect(iut.iss).equal(expectedCognitoAccessTokenPayload.iss);
                    expect(iut.jti).equal(expectedCognitoAccessTokenPayload.jti);
                    expect(iut.nbf).equal(expectedCognitoAccessTokenPayload.nbf);
                    expect(iut.sub).equal(expectedCognitoAccessTokenPayload.sub);
                    // Header and Signature
                    expect(JSON.stringify(iut.getHeader())).equal('{"kid":"aj5k1/ckHiUul+ytVeCpWX39O89yFeGUmstJEhA3y7s=","alg":"RS256"}');
                    expect(iut.getSignature()).equal('XXFHr-B-1m3o5aIJ6SASYpsIH6Gqtny9yS1rFvuNTSVnqZxAuCva-dnH5aTNNhYoVE_ZAAhYsbVW6YqY5agobQ-AfyeYZxuwEsnTgefMH1TE9GyCkZXhgOzqqTirU_eBebRe3tQwfUgNWz52CX3Hp55FMiugA85Mk5W2Fp5nSJ4HvPStBFUXYYRnB8m-q5406ECCcyKqJTbMzYCWYFYQNCHcsHrv1Eobe92Fs48PiOWKyjaJkyX3wQblmls6P-s55hc9Y5j4cx8O_A1aI10vTKwBzQVYBnq0C4261w3ogKkf_VWRuqUOpZmBl6VBhyddLVhp60HogktDTEoNjIf-Bw');
                });

            });

        });

    });

});
