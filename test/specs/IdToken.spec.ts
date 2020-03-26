import {IdToken, IdTokenPayload} from '../../src';
import {expect, assert} from 'chai';
import {VerifyOptions} from 'jsonwebtoken';

const jwkToPem = require('jwk-to-pem');

// tslint:disable:max-line-length
// tslint:disable:no-unused-expression

describe('IdToken class', () => {

    describe('instantiation without PEM', () => {

        describe('with jwt an empty string', () => {
            it('should throw Error.', () => {
                const jwtString = '';
                try {
                    new IdToken(jwtString);
                    assert.fail('Failed to throw Error');
                } catch (error) {
                    expect(error instanceof Error).to.be.true;
                    expect(error.name).equal('Error');
                    expect(error.message).equal('Invalid or expired token.');
                }
            })
        });

        describe('with jwt a bogus token string', () => {
            it('should throw Error.', () => {
                const jwtString = 'A1234BogusTokenString';
                try {
                    new IdToken(jwtString);
                    assert.fail('Failed to throw Error');
                } catch (error) {
                    expect(error instanceof Error).to.be.true;
                    expect(error.name).equal('Error');
                    expect(error.message).equal('Invalid or expired token.');
                }
            });
        });

        describe('instantiated with a valid token string.', () => {

            it('all property values should have expected values.', () => {
                const jwtString = 'eyJraWQiOiI5eW0xRm9FSWNNbEh5S2thWWZCd2NHbklTeXZyYXdJbmRxVWZiTnQ4SGVNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwNTE2NjEzMy1iMzFhLTRjYjQtOTQyNC0yMjAwNWJiM2EyMTYiLCJhdWQiOiIycnNrbmx0ZXV0ZGVzMnN0aWhjZTNrZDVtYyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUxMDIxMTUzOCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfejZtMUpJRnc0IiwiY29nbml0bzp1c2VybmFtZSI6ImFsb3B0aW1hIiwiZXhwIjoxNTEwMjE1MTM4LCJnaXZlbl9uYW1lIjoiQWwiLCJpYXQiOjE1MTAyMTE1MzgsImZhbWlseV9uYW1lIjoiVGFiYXlveW9uIiwiZW1haWwiOiJhbEBvcHRpbWFkZW50YWwuY29tIn0.EHiXAkmRAXj_PAjAY4Q3yfy2wwWyUvolWPYbPyrOY6U_fjMPmWrqtOTuUJHaTLWF4G2XninlRijHeerTSEvFrRqkxI8QmI-OMg-Pa12AnGsfl79XTgpiV7CbTMsuiBGMzgUQsvqP8jtL6psHim626XlWBIfXVl0YW4vFoOpyQI5J3WHxeGvB8dGvknNy5GQfC3hrhj7bFv9hmix4niw6lUvmv7dVKsaz-mXhmIiuTz47uEb12WtE4SOt2yMvLDmBF64yxg49hFfYhbDSiM1MctK1PnPulF8teZCl_b0jZlBH12n4azpW2GykwQ-6tX_JCnIHMRA4MFxoqSozQq5RVQ';
                const expectedIdTokenPayload: IdTokenPayload = {
                    'sub': '05166133-b31a-4cb4-9424-22005bb3a216',
                    'email_verified': true,
                    'given_name': 'Al',
                    'family_name': 'Tabayoyon',
                    'email': 'al@optimadental.com'
                };
                const iut = new IdToken(jwtString);
                expect(iut.getPropertyValue('sub')).equal(expectedIdTokenPayload.sub);
                expect(iut.getPropertyValue('bogus')).to.be.undefined;
                // IETF attributes
                expect(iut.getToken()).equal(jwtString);
                expect(iut.address).equal(expectedIdTokenPayload.address);
                expect(iut.birthdate).equal(expectedIdTokenPayload.birthdate);
                expect(iut.email).equal(expectedIdTokenPayload.email);
                expect(iut.email_verified).equal(expectedIdTokenPayload.email_verified);
                expect(iut.family_name).equal(expectedIdTokenPayload.family_name);
                expect(iut.gender).equal(expectedIdTokenPayload.gender);
                expect(iut.given_name).equal(expectedIdTokenPayload.given_name);
                expect(iut.locale).equal(expectedIdTokenPayload.locale);
                expect(iut.middle_name).equal(expectedIdTokenPayload.middle_name);
                expect(iut.name).equal(expectedIdTokenPayload.name);
                expect(iut.nickname).equal(expectedIdTokenPayload.nickname);
                expect(iut.phone_number).equal(expectedIdTokenPayload.phone_number);
                expect(iut.phone_number_verified).equal(expectedIdTokenPayload.phone_number_verified);
                expect(iut.picture).equal(expectedIdTokenPayload.picture);
                expect(iut.preferred_username).equal(expectedIdTokenPayload.preferred_username);
                expect(iut.profile).equal(expectedIdTokenPayload.profile);
                expect(iut.sub).equal(expectedIdTokenPayload.sub);
                expect(iut.updated_at).equal(expectedIdTokenPayload.updated_at);
                expect(iut.website).equal(expectedIdTokenPayload.website);
                expect(iut.zoneinfo).equal(expectedIdTokenPayload.zoneinfo);
                // Header and Signature
                expect(JSON.stringify(iut.getHeader())).equal('{"kid":"9ym1FoEIcMlHyKkaYfBwcGnISyvrawIndqUfbNt8HeM=","alg":"RS256"}');
                expect(iut.getSignature()).equal('EHiXAkmRAXj_PAjAY4Q3yfy2wwWyUvolWPYbPyrOY6U_fjMPmWrqtOTuUJHaTLWF4G2XninlRijHeerTSEvFrRqkxI8QmI-OMg-Pa12AnGsfl79XTgpiV7CbTMsuiBGMzgUQsvqP8jtL6psHim626XlWBIfXVl0YW4vFoOpyQI5J3WHxeGvB8dGvknNy5GQfC3hrhj7bFv9hmix4niw6lUvmv7dVKsaz-mXhmIiuTz47uEb12WtE4SOt2yMvLDmBF64yxg49hFfYhbDSiM1MctK1PnPulF8teZCl_b0jZlBH12n4azpW2GykwQ-6tX_JCnIHMRA4MFxoqSozQq5RVQ');
            });
        });

    });

    describe('Instantiation with PEM', () => {

        const pem = jwkToPem({
            'alg': 'RS256',
            'e': 'AQAB',
            'kid': 'xPARiky/hZ2tXdGx1z1dCBxpl0FGIRImjC1+FXlnomc=',
            'kty': 'RSA',
            'n': 'kRM-6Tc9ULZU2gbleaRlE6z0onprd4VJb-13iMiQJovazqrOBcxjryBPGsMKBQUYCD1YFpAz6_eWuKlK1jhlzrBmR9BDXhlnpg8pDmHbQoPQDhRoA63jvfYKb3-VrZSf5TtP377wL--P59EOF7FRummDrGQuJfpjGIL_1wFPYhr_FuadgA5sVi6Yf9a9DAr7M6Or99_3EIoRMeBN0o3d3nJwDkJMGJSBjLwelaxBWHKd_Yvsc_rGJbRSuhcJ0YudteC45310Pn2qayYESftA28VjTypBn7fmH_V9-xcodDC3PHcXgqcwEI_qTzIsOBrCbZLCqlnfblktwLoX7jdWBw',
            'use': 'sig'
        });

        describe('jwt with invalid signature', () => {

            const jwtString = 'eyJraWQiOiI5eW0xRm9FSWNNbEh5S2thWWZCd2NHbklTeXZyYXdJbmRxVWZiTnQ4SGVNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwNTE2NjEzMy1iMzFhLTRjYjQtOTQyNC0yMjAwNWJiM2EyMTYiLCJhdWQiOiIycnNrbmx0ZXV0ZGVzMnN0aWhjZTNrZDVtYyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUxMDIxMTUzOCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfejZtMUpJRnc0IiwiY29nbml0bzp1c2VybmFtZSI6ImFsb3B0aW1hIiwiZXhwIjoxNTEwMjE1MTM4LCJnaXZlbl9uYW1lIjoiQWwiLCJpYXQiOjE1MTAyMTE1MzgsImZhbWlseV9uYW1lIjoiVGFiYXlveW9uIiwiZW1haWwiOiJhbEBvcHRpbWFkZW50YWwuY29tIn0.EHiXAkmRAXj_PAjAY4Q3yfy2wwWyUvolWPYbPyrOY6U_fjMPmWrqtOTuUJHaTLWF4G2XninlRijHeerTSEvFrRqkxI8QmI-OMg-Pa12AnGsfl79XTgpiV7CbTMsuiBGMzgUQsvqP8jtL6psHim626XlWBIfXVl0YW4vFoOpyQI5J3WHxeGvB8dGvknNy5GQfC3hrhj7bFv9hmix4niw6lUvmv7dVKsaz-mXhmIiuTz47uEb12WtE4SOt2yMvLDmBF64yxg49hFfYhbDSiM1MctK1PnPulF8teZCl_b0jZlBH12n4azpW2GykwQ-6tX_JCnIHMRA4MFxoqSozQq5RVQ';

            it('should throw a JsonWebTokenError', () => {
                try {
                    new IdToken(jwtString, pem);
                    assert.fail('Failed to throw exception');
                } catch (error) {
                    expect(error instanceof Error).to.be.true;
                    expect(error.name).equal('JsonWebTokenError');
                    expect(error.message).equal('invalid signature');
                }
            });

        });

        describe('with an expired jwt', () => {
            const jwtString = 'eyJraWQiOiJ4UEFSaWt5XC9oWjJ0WGRHeDF6MWRDQnhwbDBGR0lSSW1qQzErRlhsbm9tYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwMDI0YTYyMi00MzE0LTRkZjYtYjlkZC02ODBhMWYwYTIwYjUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfWFJzVUdrd3lVIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoiQmFzaWNVc2VyIiwiZ2l2ZW5fbmFtZSI6IkJhc2ljIiwiYXVkIjoiNHRnN2ZoaWRiNWFkcjVqYzFibmE0bWUyaTYiLCJldmVudF9pZCI6ImU3MTIzNzU4LTRhZGEtNDdhOC1iYzczLWFhZDI3MmMxNmM3MiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTg1MTc3NjEzLCJwaG9uZV9udW1iZXIiOiIrMTUwMzMzMDg0MDIiLCJleHAiOjE1ODUxODEyMTMsImlhdCI6MTU4NTE3NzYxMywiZmFtaWx5X25hbWUiOiJVc2VyIiwiZW1haWwiOiJhbEB0YWJheW95b24ubmV0In0.OxXA1xn1l0hPrdL6dhncc01FZ2fx2aLNqvdyiEgqyfajyGbV5yoawPPInfLPgp8WZst3-7AP9kINzE3n2fsORD_JdF3-28RYn9stz8hVpEnZVWQVQcmUFQ9ahWEGfCrVz_Kk8-5Oe6iGhsRVlIMSUNWUnRQtjMCx2vr-TjUreGUNj07csLdk0dqdpGfMl90zF3N9wJ_4ktFlyGZf8QZr8scN7z-q6aVP2r4Kahv3IPlggaPZDmBMO01BkSWUeMofb6KvUotbA5pMLy7AFhcE87y8R1XJ78RdDszh03s7ylGolZw2xrHVT-q7WkzvW6xYaaUeea8hWnq4F97D7HWKtw';
            // @ts-ignore
            const expectedIdTokenPayload: IdTokenPayload = {'sub': '0024a622-4314-4df6-b9dd-680a1f0a20b5', 'email_verified': true, 'iss': 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_XRsUGkwyU', 'phone_number_verified': true, 'cognito:username': 'BasicUser', 'given_name': 'Basic', 'aud': '4tg7fhidb5adr5jc1bna4me2i6', 'event_id': 'e7123758-4ada-47a8-bc73-aad272c16c72', 'token_use': 'id', 'auth_time': 1585177613, 'phone_number': '+15033308402', 'exp': 1585181213, 'iat': 1585177613, 'family_name': 'User', 'email': 'al@tabayoyon.net'};
            describe('without ignoreExpiration option', () => {

                it('should throw a token expired exception', () => {
                    try {
                        new IdToken(jwtString, pem);
                        assert.fail('Failed to throw exception');
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

                it('should succeed with expected values.', () => {
                    const iut = new IdToken(jwtString, pem, options);
                    expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedIdTokenPayload));
                    expect(iut.getPropertyValue('sub')).equal(expectedIdTokenPayload.sub);
                    expect(iut.getPropertyValue('bogus')).to.be.undefined;
                    // Deprecated methods
                    expect(iut.getJwtToken()).equal(jwtString);
                    // IETF attributes
                    expect(iut.getToken()).equal(jwtString);
                    expect(iut.address).equal(expectedIdTokenPayload.address);
                    expect(iut.birthdate).equal(expectedIdTokenPayload.birthdate);
                    expect(iut.email).equal(expectedIdTokenPayload.email);
                    expect(iut.email_verified).equal(expectedIdTokenPayload.email_verified);
                    expect(iut.family_name).equal(expectedIdTokenPayload.family_name);
                    expect(iut.gender).equal(expectedIdTokenPayload.gender);
                    expect(iut.given_name).equal(expectedIdTokenPayload.given_name);
                    expect(iut.locale).equal(expectedIdTokenPayload.locale);
                    expect(iut.middle_name).equal(expectedIdTokenPayload.middle_name);
                    expect(iut.name).equal(expectedIdTokenPayload.name);
                    expect(iut.nickname).equal(expectedIdTokenPayload.nickname);
                    expect(iut.phone_number).equal(expectedIdTokenPayload.phone_number);
                    expect(iut.phone_number_verified).equal(expectedIdTokenPayload.phone_number_verified);
                    expect(iut.picture).equal(expectedIdTokenPayload.picture);
                    expect(iut.preferred_username).equal(expectedIdTokenPayload.preferred_username);
                    expect(iut.profile).equal(expectedIdTokenPayload.profile);
                    expect(iut.sub).equal(expectedIdTokenPayload.sub);
                    expect(iut.updated_at).equal(expectedIdTokenPayload.updated_at);
                    expect(iut.website).equal(expectedIdTokenPayload.website);
                    expect(iut.zoneinfo).equal(expectedIdTokenPayload.zoneinfo);
                    // Header and Signature
                    expect(JSON.stringify(iut.getHeader())).equal('{"kid":"xPARiky/hZ2tXdGx1z1dCBxpl0FGIRImjC1+FXlnomc=","alg":"RS256"}');
                    expect(iut.getSignature()).equal('OxXA1xn1l0hPrdL6dhncc01FZ2fx2aLNqvdyiEgqyfajyGbV5yoawPPInfLPgp8WZst3-7AP9kINzE3n2fsORD_JdF3-28RYn9stz8hVpEnZVWQVQcmUFQ9ahWEGfCrVz_Kk8-5Oe6iGhsRVlIMSUNWUnRQtjMCx2vr-TjUreGUNj07csLdk0dqdpGfMl90zF3N9wJ_4ktFlyGZf8QZr8scN7z-q6aVP2r4Kahv3IPlggaPZDmBMO01BkSWUeMofb6KvUotbA5pMLy7AFhcE87y8R1XJ78RdDszh03s7ylGolZw2xrHVT-q7WkzvW6xYaaUeea8hWnq4F97D7HWKtw');
                });

            });

        });

    });

});

