import {CognitoIdToken, CognitoIdTokenPayload} from '../../src';
import {assert, expect} from 'chai';
import {VerifyOptions} from 'jsonwebtoken';

const jwkToPem = require('jwk-to-pem');

// tslint:disable:max-line-length
// tslint:disable:no-unused-expression

describe('CognitoIdToken', () => {

    const pem = jwkToPem({
        'alg': 'RS256',
        'e': 'AQAB',
        'kid': 'xPARiky/hZ2tXdGx1z1dCBxpl0FGIRImjC1+FXlnomc=',
        'kty': 'RSA',
        'n': 'kRM-6Tc9ULZU2gbleaRlE6z0onprd4VJb-13iMiQJovazqrOBcxjryBPGsMKBQUYCD1YFpAz6_eWuKlK1jhlzrBmR9BDXhlnpg8pDmHbQoPQDhRoA63jvfYKb3-VrZSf5TtP377wL--P59EOF7FRummDrGQuJfpjGIL_1wFPYhr_FuadgA5sVi6Yf9a9DAr7M6Or99_3EIoRMeBN0o3d3nJwDkJMGJSBjLwelaxBWHKd_Yvsc_rGJbRSuhcJ0YudteC45310Pn2qayYESftA28VjTypBn7fmH_V9-xcodDC3PHcXgqcwEI_qTzIsOBrCbZLCqlnfblktwLoX7jdWBw',
        'use': 'sig'
    });

    describe('jwt with invalid signature', () => {

        const jwtString = 'eyJraWQiOiJJU1hCS3BTZE1GS1RyWjVLSTFxcDlZZXM1U3NDNTEyOXU0TGlDY2dGUVVnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ZjIzYzJhOS1mZjAzLTQ0ZDctOGFhMi1kOTViOTlmZGQ2YTEiLCJ3ZWJzaXRlIjoiaHR0cHM6XC9cL3hlZHdhcmVcL2FsdCIsInpvbmVpbmZvIjoiQW1lcmljYVwvTG9zX0FuZ2VsZXMiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbi1zdXBlciJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYmlydGhkYXRlIjoiMTk3Mi0wMS0wMSIsImdlbmRlciI6Im1haWwiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl8wQWVYY1Vxa0giLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJTdXBlckFkbWluIiwiZ2l2ZW5fbmFtZSI6IlN1cGVyIiwibG9jYWxlIjoiZW4iLCJtaWRkbGVfbmFtZSI6Ik1pZGRsZSIsInBpY3R1cmUiOiJodHRwczpcL1wvcy5ncmF2YXRhci5jb21cL2F2YXRhclwvZjQzOGIyMTMzNWRmYjNhNWZlYTIyNmNmNDFlZDYwNTU_cz04MCIsImF1ZCI6ImtjcTZua25ncnZpajJucjMyYzRrNTMzN2kiLCJldmVudF9pZCI6IjQ1NGUzODUzLTUxNDItNDI2YS04Y2NiLTAyOTA3OGVjMjMwMCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTg0OTQyOTMyLCJuaWNrbmFtZSI6Ik5pY2siLCJwaG9uZV9udW1iZXIiOiIrMTUwMzMzMDg0MDIiLCJleHAiOjE1ODQ5NDY1MzMsImlhdCI6MTU4NDk0MjkzMywiZmFtaWx5X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWx0QHhlZHdhcmUuY29tIn0.kk0rRYZ14VqZ30ja96W3qmfWYQBqPVi8B47MMTVbdxQ-wDWh_FiWMA_CTidHk2Spun08b2fhgXq1rrTAkfJI91JdZrOwP4ojqqm6mGRgwLn7QgAB9rUBwKWqo7cWFJzkT4tHCFRaJHhkBITEX46EHoilPxWFL65dsAB99mIsFvpDBpTLpJnYGXBz9FWwt50PMTujLgqLSYm8PiCYRl1I4d2ZNMDdSkYO5dUvVi_OXW1iLRK1ic5gHUhOYyEmVDc7-qIXrrVFegjn2GJeJsmspI2VowDflUYZPeIQg8yUbg1pE7zTvDcUDcXObWQqgGofQ7MASd_0pLhC5boysolHiQ.eyJzdWIiOiIwNTE2NjEzMy1iMzFhLTRjYjQtOTQyNC0yMjAwNWJiM2EyMTYiLCJhdWQiOiIycnNrbmx0ZXV0ZGVzMnN0aWhjZTNrZDVtYyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUxMDIxMTUzOCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfejZtMUpJRnc0IiwiY29nbml0bzp1c2VybmFtZSI6ImFsb3B0aW1hIiwiZXhwIjoxNTEwMjE1MTM4LCJnaXZlbl9uYW1lIjoiQWwiLCJpYXQiOjE1MTAyMTE1MzgsImZhbWlseV9uYW1lIjoiVGFiYXlveW9uIiwiZW1haWwiOiJhbEBvcHRpbWFkZW50YWwuY29tIn0.EHiXAkmRAXj_PAjAY4Q3yfy2wwWyUvolWPYbPyrOY6U_fjMPmWrqtOTuUJHaTLWF4G2XninlRijHeerTSEvFrRqkxI8QmI-OMg-Pa12AnGsfl79XTgpiV7CbTMsuiBGMzgUQsvqP8jtL6psHim626XlWBIfXVl0YW4vFoOpyQI5J3WHxeGvB8dGvknNy5GQfC3hrhj7bFv9hmix4niw6lUvmv7dVKsaz-mXhmIiuTz47uEb12WtE4SOt2yMvLDmBF64yxg49hFfYhbDSiM1MctK1PnPulF8teZCl_b0jZlBH12n4azpW2GykwQ-6tX_JCnIHMRA4MFxoqSozQq5RVQ';

        describe('instantiation without PEM', () => {

            it('should fail with Error - Invalid or expired token.', () => {
                try {
                    new CognitoIdToken(jwtString);
                    assert.fail('Failed to throw Error');
                } catch (error) {
                    expect(error instanceof Error).to.be.true;
                    expect(error.name).equal('Error');
                    expect(error.message).equal('Invalid or expired token.');
                }
            });

        });

        describe('instantiation without PEM', () => {

            it('should fail with invalid signature', () => {
                try {
                    new CognitoIdToken(jwtString, pem);
                    assert.fail('Failed to throw Error');
                } catch (error) {
                    expect(error instanceof Error).to.be.true;
                    expect(error.name).equal('JsonWebTokenError');
                    expect(error.message).equal('jwt malformed');
                }
            });

        });

    });

    describe('expired jwt without groups and event_id', () => {

        const jwtString = 'eyJraWQiOiJ4UEFSaWt5XC9oWjJ0WGRHeDF6MWRDQnhwbDBGR0lSSW1qQzErRlhsbm9tYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwMDI0YTYyMi00MzE0LTRkZjYtYjlkZC02ODBhMWYwYTIwYjUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfWFJzVUdrd3lVIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoiQmFzaWNVc2VyIiwiZ2l2ZW5fbmFtZSI6IkJhc2ljIiwiYXVkIjoiNHRnN2ZoaWRiNWFkcjVqYzFibmE0bWUyaTYiLCJldmVudF9pZCI6ImU3MTIzNzU4LTRhZGEtNDdhOC1iYzczLWFhZDI3MmMxNmM3MiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTg1MTc3NjEzLCJwaG9uZV9udW1iZXIiOiIrMTUwMzMzMDg0MDIiLCJleHAiOjE1ODUxODEyMTMsImlhdCI6MTU4NTE3NzYxMywiZmFtaWx5X25hbWUiOiJVc2VyIiwiZW1haWwiOiJhbEB0YWJheW95b24ubmV0In0.OxXA1xn1l0hPrdL6dhncc01FZ2fx2aLNqvdyiEgqyfajyGbV5yoawPPInfLPgp8WZst3-7AP9kINzE3n2fsORD_JdF3-28RYn9stz8hVpEnZVWQVQcmUFQ9ahWEGfCrVz_Kk8-5Oe6iGhsRVlIMSUNWUnRQtjMCx2vr-TjUreGUNj07csLdk0dqdpGfMl90zF3N9wJ_4ktFlyGZf8QZr8scN7z-q6aVP2r4Kahv3IPlggaPZDmBMO01BkSWUeMofb6KvUotbA5pMLy7AFhcE87y8R1XJ78RdDszh03s7ylGolZw2xrHVT-q7WkzvW6xYaaUeea8hWnq4F97D7HWKtw';
        const expectedCognitoIdTokenPayload: CognitoIdTokenPayload = {
            'sub': '0024a622-4314-4df6-b9dd-680a1f0a20b5',
            'email_verified': true,
            'iss': 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_XRsUGkwyU',
            'phone_number_verified': true,
            'cognito:username': 'BasicUser',
            'given_name': 'Basic',
            'aud': '4tg7fhidb5adr5jc1bna4me2i6',
            'event_id': 'e7123758-4ada-47a8-bc73-aad272c16c72',
            'token_use': 'id',
            'auth_time': 1585177613,
            'phone_number': '+15033308402',
            'exp': 1585181213,
            'iat': 1585177613,
            'family_name': 'User',
            'email': 'al@tabayoyon.net'
        };

        describe('instantiation without PEM', () => {

            it('should succeed', () => {
                const iut = new CognitoIdToken(jwtString);
                expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoIdTokenPayload));
                expect(JSON.stringify(iut.getCognitoIdTokenPayload())).equal(JSON.stringify(expectedCognitoIdTokenPayload));
                expect(iut.getPropertyValue('sub')).equal(expectedCognitoIdTokenPayload.sub);
                expect(iut.getPropertyValue('bogus')).to.be.undefined;
                // Deprecated methods
                expect(iut.tokenUse).equal(expectedCognitoIdTokenPayload.token_use);
                // CognitoIdToken added attributes
                expect(iut.aud).equal(expectedCognitoIdTokenPayload.aud);
                expect(iut.auth_time).equal(expectedCognitoIdTokenPayload.auth_time);
                expect(iut.cognito_username).equal(expectedCognitoIdTokenPayload['cognito:username']);
                expect(iut.exp).equal(expectedCognitoIdTokenPayload.exp);
                expect(iut.iss).equal(expectedCognitoIdTokenPayload.iss);
                expect(iut.iat).equal(expectedCognitoIdTokenPayload.iat);
                expect(iut.scope).equal(expectedCognitoIdTokenPayload.scope);
                expect(iut.token_use).equal(expectedCognitoIdTokenPayload.token_use);
                // IETF attributes
                expect(iut.getToken()).equal(jwtString);
                expect(iut.address).equal(expectedCognitoIdTokenPayload.address);
                expect(iut.birthdate).equal(expectedCognitoIdTokenPayload.birthdate);
                expect(iut.email).equal(expectedCognitoIdTokenPayload.email);
                expect(iut.email_verified).equal(expectedCognitoIdTokenPayload.email_verified);
                expect(iut.family_name).equal(expectedCognitoIdTokenPayload.family_name);
                expect(iut.gender).equal(expectedCognitoIdTokenPayload.gender);
                expect(iut.given_name).equal(expectedCognitoIdTokenPayload.given_name);
                expect(iut.locale).equal(expectedCognitoIdTokenPayload.locale);
                expect(iut.middle_name).equal(expectedCognitoIdTokenPayload.middle_name);
                expect(iut.name).equal(expectedCognitoIdTokenPayload.name);
                expect(iut.nickname).equal(expectedCognitoIdTokenPayload.nickname);
                expect(iut.phone_number).equal(expectedCognitoIdTokenPayload.phone_number);
                expect(iut.phone_number_verified).equal(expectedCognitoIdTokenPayload.phone_number_verified);
                expect(iut.picture).equal(expectedCognitoIdTokenPayload.picture);
                expect(iut.preferred_username).equal(expectedCognitoIdTokenPayload.preferred_username);
                expect(iut.profile).equal(expectedCognitoIdTokenPayload.profile);
                expect(iut.sub).equal(expectedCognitoIdTokenPayload.sub);
                expect(iut.updated_at).equal(expectedCognitoIdTokenPayload.updated_at);
                expect(iut.website).equal(expectedCognitoIdTokenPayload.website);
                expect(iut.zoneinfo).equal(expectedCognitoIdTokenPayload.zoneinfo);
                // Header and Signature
                expect(JSON.stringify(iut.getHeader())).equal('{"kid":"xPARiky/hZ2tXdGx1z1dCBxpl0FGIRImjC1+FXlnomc=","alg":"RS256"}');
                expect(iut.getSignature()).equal('OxXA1xn1l0hPrdL6dhncc01FZ2fx2aLNqvdyiEgqyfajyGbV5yoawPPInfLPgp8WZst3-7AP9kINzE3n2fsORD_JdF3-28RYn9stz8hVpEnZVWQVQcmUFQ9ahWEGfCrVz_Kk8-5Oe6iGhsRVlIMSUNWUnRQtjMCx2vr-TjUreGUNj07csLdk0dqdpGfMl90zF3N9wJ_4ktFlyGZf8QZr8scN7z-q6aVP2r4Kahv3IPlggaPZDmBMO01BkSWUeMofb6KvUotbA5pMLy7AFhcE87y8R1XJ78RdDszh03s7ylGolZw2xrHVT-q7WkzvW6xYaaUeea8hWnq4F97D7HWKtw');
            });

        });

        describe('instantiation with PEM', () => {

            describe('without ignoreExpiration option', () => {

                it('should throw TokenExpiredError', () => {
                    try {
                        new CognitoIdToken(jwtString, pem);
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

                it('should succeed', () => {
                    const iut = new CognitoIdToken(jwtString, pem, options);
                    expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoIdTokenPayload));
                    expect(JSON.stringify(iut.getCognitoIdTokenPayload())).equal(JSON.stringify(expectedCognitoIdTokenPayload));
                    expect(iut.getPropertyValue('sub')).equal(expectedCognitoIdTokenPayload.sub);
                    expect(iut.getPropertyValue('bogus')).to.be.undefined;
                    // Deprecated methods
                    expect(iut.tokenUse).equal(expectedCognitoIdTokenPayload.token_use);
                    // CognitoIdToken added attributes
                    expect(iut.aud).equal(expectedCognitoIdTokenPayload.aud);
                    expect(iut.auth_time).equal(expectedCognitoIdTokenPayload.auth_time);
                    expect(iut.cognito_username).equal(expectedCognitoIdTokenPayload['cognito:username']);
                    expect(iut.exp).equal(expectedCognitoIdTokenPayload.exp);
                    expect(iut.iss).equal(expectedCognitoIdTokenPayload.iss);
                    expect(iut.iat).equal(expectedCognitoIdTokenPayload.iat);
                    expect(iut.scope).equal(expectedCognitoIdTokenPayload.scope);
                    expect(iut.token_use).equal(expectedCognitoIdTokenPayload.token_use);
                    // IETF attributes
                    expect(iut.getToken()).equal(jwtString);
                    expect(iut.address).equal(expectedCognitoIdTokenPayload.address);
                    expect(iut.birthdate).equal(expectedCognitoIdTokenPayload.birthdate);
                    expect(iut.email).equal(expectedCognitoIdTokenPayload.email);
                    expect(iut.email_verified).equal(expectedCognitoIdTokenPayload.email_verified);
                    expect(iut.family_name).equal(expectedCognitoIdTokenPayload.family_name);
                    expect(iut.gender).equal(expectedCognitoIdTokenPayload.gender);
                    expect(iut.given_name).equal(expectedCognitoIdTokenPayload.given_name);
                    expect(iut.locale).equal(expectedCognitoIdTokenPayload.locale);
                    expect(iut.middle_name).equal(expectedCognitoIdTokenPayload.middle_name);
                    expect(iut.name).equal(expectedCognitoIdTokenPayload.name);
                    expect(iut.nickname).equal(expectedCognitoIdTokenPayload.nickname);
                    expect(iut.phone_number).equal(expectedCognitoIdTokenPayload.phone_number);
                    expect(iut.phone_number_verified).equal(expectedCognitoIdTokenPayload.phone_number_verified);
                    expect(iut.picture).equal(expectedCognitoIdTokenPayload.picture);
                    expect(iut.preferred_username).equal(expectedCognitoIdTokenPayload.preferred_username);
                    expect(iut.profile).equal(expectedCognitoIdTokenPayload.profile);
                    expect(iut.sub).equal(expectedCognitoIdTokenPayload.sub);
                    expect(iut.updated_at).equal(expectedCognitoIdTokenPayload.updated_at);
                    expect(iut.website).equal(expectedCognitoIdTokenPayload.website);
                    expect(iut.zoneinfo).equal(expectedCognitoIdTokenPayload.zoneinfo);
                    // Header and Signature
                    expect(JSON.stringify(iut.getHeader())).equal('{"kid":"xPARiky/hZ2tXdGx1z1dCBxpl0FGIRImjC1+FXlnomc=","alg":"RS256"}');
                    expect(iut.getSignature()).equal('OxXA1xn1l0hPrdL6dhncc01FZ2fx2aLNqvdyiEgqyfajyGbV5yoawPPInfLPgp8WZst3-7AP9kINzE3n2fsORD_JdF3-28RYn9stz8hVpEnZVWQVQcmUFQ9ahWEGfCrVz_Kk8-5Oe6iGhsRVlIMSUNWUnRQtjMCx2vr-TjUreGUNj07csLdk0dqdpGfMl90zF3N9wJ_4ktFlyGZf8QZr8scN7z-q6aVP2r4Kahv3IPlggaPZDmBMO01BkSWUeMofb6KvUotbA5pMLy7AFhcE87y8R1XJ78RdDszh03s7ylGolZw2xrHVT-q7WkzvW6xYaaUeea8hWnq4F97D7HWKtw');
                });

            });

        });

    });

    describe('expired jwt with groups', () => {

        const jwtString = 'eyJraWQiOiJ4UEFSaWt5XC9oWjJ0WGRHeDF6MWRDQnhwbDBGR0lSSW1qQzErRlhsbm9tYz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkZjBjNDU2ZS0wNWVkLTQ1MTctOTEyZC0yZGZkN2E4ZDEyZWYiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbi10ZWNoc3VwcG9ydCJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfWFJzVUdrd3lVIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoiVGVjaFN1cHBvcnRVc2VyIiwiZ2l2ZW5fbmFtZSI6IlRlY2hTdXBwb3J0IiwiYXVkIjoiNHRnN2ZoaWRiNWFkcjVqYzFibmE0bWUyaTYiLCJldmVudF9pZCI6IjRhN2JjYTM4LWI3MWMtNDlhMi1hYTg2LTNiOTNhMjU5YzIxYyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTg1MTA0MjM5LCJwaG9uZV9udW1iZXIiOiIrMTUwMzMzMDg0MDIiLCJleHAiOjE1ODUxMTc0NDIsImlhdCI6MTU4NTExMzg0MiwiZmFtaWx5X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWx0QHhlZHdhcmUuY29tIn0.Pgonu7NVWrlVOMfds8CGnZKbXGX87_EFfoK4SVr45AlbSdt78ENc-KZ3lx06DzQoqEReS4f2xgcT3XsAzfw6Gi7NadV06WdFHq8kQySP5PCTqcF1cRkcKz8rtEJFbG4Xn_ayXV-R02UR2hFTS6aTMInMemMbxLil-qID5Gi08z9k0TLc8lM8YlD2wOScm-peusDOJwkvMcg-qD6izG_FCyLuPWQUrBdG26zZWOUlchPM-mnc5gzb8-isVGYQ98-_TaxjzO3fTsZbrl0tM0i7Tr-buNXVI5-kbBiE5utMqKOjkbIuvMHqemeQtL182fhCUZV4BcW_FZz-UFJb4RGj7A';
        const expectedCognitoIdTokenPayload: CognitoIdTokenPayload = {
            'sub': 'df0c456e-05ed-4517-912d-2dfd7a8d12ef',
            'cognito:groups': [
                'admin-techsupport'
            ],
            'email_verified': true,
            'iss': 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_XRsUGkwyU',
            'phone_number_verified': true,
            'cognito:username': 'TechSupportUser',
            'given_name': 'TechSupport',
            'aud': '4tg7fhidb5adr5jc1bna4me2i6',
            'event_id': '4a7bca38-b71c-49a2-aa86-3b93a259c21c',
            'token_use': 'id',
            'auth_time': 1585104239,
            'phone_number': '+15033308402',
            'exp': 1585117442,
            'iat': 1585113842,
            'family_name': 'Admin',
            'email': 'alt@xedware.com'
        };

        describe('instantiation without PEM', () => {

            it('should succeed.', () => {
                const iut = new CognitoIdToken(jwtString);
                expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoIdTokenPayload));
                expect(JSON.stringify(iut.getCognitoIdTokenPayload())).equal(JSON.stringify(expectedCognitoIdTokenPayload));
                expect(iut.getPropertyValue('sub')).equal(expectedCognitoIdTokenPayload.sub);
                expect(iut.getPropertyValue('bogus')).to.be.undefined;
                // Deprecated methods
                expect(iut.tokenUse).equal(expectedCognitoIdTokenPayload.token_use);
                // CognitoIdToken added attributes
                expect(iut.aud).equal(expectedCognitoIdTokenPayload.aud);
                expect(iut.auth_time).equal(expectedCognitoIdTokenPayload.auth_time);
                expect(iut.cognito_groups.length).equal(expectedCognitoIdTokenPayload['cognito:groups'].length);
                expect(iut.cognito_groups[0]).equal(expectedCognitoIdTokenPayload['cognito:groups'][0]);
                expect(iut.cognito_username).equal(expectedCognitoIdTokenPayload['cognito:username']);
                expect(iut.exp).equal(expectedCognitoIdTokenPayload.exp);
                expect(iut.event_id).equal(expectedCognitoIdTokenPayload.event_id);
                expect(iut.iss).equal(expectedCognitoIdTokenPayload.iss);
                expect(iut.iat).equal(expectedCognitoIdTokenPayload.iat);
                expect(iut.scope).equal(expectedCognitoIdTokenPayload.scope);
                expect(iut.token_use).equal(expectedCognitoIdTokenPayload.token_use);
                // IETF attributes
                expect(iut.getToken()).equal(jwtString);
                expect(iut.address).equal(expectedCognitoIdTokenPayload.address);
                expect(iut.birthdate).equal(expectedCognitoIdTokenPayload.birthdate);
                expect(iut.email).equal(expectedCognitoIdTokenPayload.email);
                expect(iut.email_verified).equal(expectedCognitoIdTokenPayload.email_verified);
                expect(iut.family_name).equal(expectedCognitoIdTokenPayload.family_name);
                expect(iut.gender).equal(expectedCognitoIdTokenPayload.gender);
                expect(iut.given_name).equal(expectedCognitoIdTokenPayload.given_name);
                expect(iut.locale).equal(expectedCognitoIdTokenPayload.locale);
                expect(iut.middle_name).equal(expectedCognitoIdTokenPayload.middle_name);
                expect(iut.name).equal(expectedCognitoIdTokenPayload.name);
                expect(iut.nickname).equal(expectedCognitoIdTokenPayload.nickname);
                expect(iut.phone_number).equal(expectedCognitoIdTokenPayload.phone_number);
                expect(iut.phone_number_verified).equal(expectedCognitoIdTokenPayload.phone_number_verified);
                expect(iut.picture).equal(expectedCognitoIdTokenPayload.picture);
                expect(iut.preferred_username).equal(expectedCognitoIdTokenPayload.preferred_username);
                expect(iut.profile).equal(expectedCognitoIdTokenPayload.profile);
                expect(iut.sub).equal(expectedCognitoIdTokenPayload.sub);
                expect(iut.updated_at).equal(expectedCognitoIdTokenPayload.updated_at);
                expect(iut.website).equal(expectedCognitoIdTokenPayload.website);
                // Header and Signature
                expect(JSON.stringify(iut.getHeader())).equal('{"kid":"xPARiky/hZ2tXdGx1z1dCBxpl0FGIRImjC1+FXlnomc=","alg":"RS256"}');
                expect(iut.getSignature()).equal('Pgonu7NVWrlVOMfds8CGnZKbXGX87_EFfoK4SVr45AlbSdt78ENc-KZ3lx06DzQoqEReS4f2xgcT3XsAzfw6Gi7NadV06WdFHq8kQySP5PCTqcF1cRkcKz8rtEJFbG4Xn_ayXV-R02UR2hFTS6aTMInMemMbxLil-qID5Gi08z9k0TLc8lM8YlD2wOScm-peusDOJwkvMcg-qD6izG_FCyLuPWQUrBdG26zZWOUlchPM-mnc5gzb8-isVGYQ98-_TaxjzO3fTsZbrl0tM0i7Tr-buNXVI5-kbBiE5utMqKOjkbIuvMHqemeQtL182fhCUZV4BcW_FZz-UFJb4RGj7A');
            });

        });

        describe('instantiation with PEM', () => {

            describe('without ignoreExpiration option', () => {

                it('should throw TokenExpiredError', () => {
                    try {
                        new CognitoIdToken(jwtString, pem);
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

                it('should succeed', () => {
                    const iut = new CognitoIdToken(jwtString, pem, options);
                    expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoIdTokenPayload));
                    expect(JSON.stringify(iut.getCognitoIdTokenPayload())).equal(JSON.stringify(expectedCognitoIdTokenPayload));
                    expect(iut.getPropertyValue('sub')).equal(expectedCognitoIdTokenPayload.sub);
                    expect(iut.getPropertyValue('bogus')).to.be.undefined;
                    // Deprecated methods
                    expect(iut.getJwtToken()).equal(jwtString);
                    // CognitoIdToken added attributes
                    expect(iut.aud).equal(expectedCognitoIdTokenPayload.aud);
                    expect(iut.auth_time).equal(expectedCognitoIdTokenPayload.auth_time);
                    expect(iut.cognito_username).equal(expectedCognitoIdTokenPayload['cognito:username']);
                    expect(iut.exp).equal(expectedCognitoIdTokenPayload.exp);
                    expect(iut.iss).equal(expectedCognitoIdTokenPayload.iss);
                    expect(iut.iat).equal(expectedCognitoIdTokenPayload.iat);
                    expect(iut.scope).equal(expectedCognitoIdTokenPayload.scope);
                    expect(iut.token_use).equal(expectedCognitoIdTokenPayload.token_use);
                    // IETF attributes
                    expect(iut.getToken()).equal(jwtString);
                    expect(iut.address).equal(expectedCognitoIdTokenPayload.address);
                    expect(iut.birthdate).equal(expectedCognitoIdTokenPayload.birthdate);
                    expect(iut.email).equal(expectedCognitoIdTokenPayload.email);
                    expect(iut.email_verified).equal(expectedCognitoIdTokenPayload.email_verified);
                    expect(iut.family_name).equal(expectedCognitoIdTokenPayload.family_name);
                    expect(iut.gender).equal(expectedCognitoIdTokenPayload.gender);
                    expect(iut.given_name).equal(expectedCognitoIdTokenPayload.given_name);
                    expect(iut.locale).equal(expectedCognitoIdTokenPayload.locale);
                    expect(iut.middle_name).equal(expectedCognitoIdTokenPayload.middle_name);
                    expect(iut.name).equal(expectedCognitoIdTokenPayload.name);
                    expect(iut.nickname).equal(expectedCognitoIdTokenPayload.nickname);
                    expect(iut.phone_number).equal(expectedCognitoIdTokenPayload.phone_number);
                    expect(iut.phone_number_verified).equal(expectedCognitoIdTokenPayload.phone_number_verified);
                    expect(iut.picture).equal(expectedCognitoIdTokenPayload.picture);
                    expect(iut.preferred_username).equal(expectedCognitoIdTokenPayload.preferred_username);
                    expect(iut.profile).equal(expectedCognitoIdTokenPayload.profile);
                    expect(iut.sub).equal(expectedCognitoIdTokenPayload.sub);
                    expect(iut.updated_at).equal(expectedCognitoIdTokenPayload.updated_at);
                    expect(iut.website).equal(expectedCognitoIdTokenPayload.website);
                    expect(iut.zoneinfo).equal(expectedCognitoIdTokenPayload.zoneinfo);
                    // Header and Signature
                    expect(JSON.stringify(iut.getHeader())).equal('{"kid":"xPARiky/hZ2tXdGx1z1dCBxpl0FGIRImjC1+FXlnomc=","alg":"RS256"}');
                    expect(iut.getSignature()).equal('Pgonu7NVWrlVOMfds8CGnZKbXGX87_EFfoK4SVr45AlbSdt78ENc-KZ3lx06DzQoqEReS4f2xgcT3XsAzfw6Gi7NadV06WdFHq8kQySP5PCTqcF1cRkcKz8rtEJFbG4Xn_ayXV-R02UR2hFTS6aTMInMemMbxLil-qID5Gi08z9k0TLc8lM8YlD2wOScm-peusDOJwkvMcg-qD6izG_FCyLuPWQUrBdG26zZWOUlchPM-mnc5gzb8-isVGYQ98-_TaxjzO3fTsZbrl0tM0i7Tr-buNXVI5-kbBiE5utMqKOjkbIuvMHqemeQtL182fhCUZV4BcW_FZz-UFJb4RGj7A');
                });

            });

        });

    });

});
