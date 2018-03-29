import {IdToken, IdTokenJwtPayload} from '../../src';
import {expect, assert} from 'chai';

// tslint:disable:max-line-length
// tslint:disable:no-unused-expression

describe('IdToken class', () => {

    describe('IdToken instantiated with an empty string.', () => {
        it('All property values should be undefined.', () => {
            const jwtString = '';
            const iut = new IdToken(jwtString);
            expect(iut.getJwtToken()).equal(jwtString);
            expect(iut.address).to.be.undefined;
            expect(iut.birthdate).to.be.undefined;
            expect(iut.email).to.be.undefined;
            expect(iut.email_verified).to.be.undefined;
            expect(iut.family_name).to.be.undefined;
            expect(iut.gender).to.be.undefined;
            expect(iut.given_name).to.be.undefined;
            expect(iut.locale).to.be.undefined;
            expect(iut.middle_name).to.be.undefined;
            expect(iut.name).to.be.undefined;
            expect(iut.nickname).to.be.undefined;
            expect(iut.phone_number).to.be.undefined;
            expect(iut.phone_number_verified).to.be.undefined;
            expect(iut.picture).to.be.undefined;
            expect(iut.preferred_username).to.be.undefined;
            expect(iut.profile).to.be.undefined;
            expect(iut.sub).to.be.undefined;
            expect(iut.updated_at).to.be.undefined;
            expect(iut.website).to.be.undefined;
            expect(iut.zoneinfo).to.be.undefined;
        })
    });

    describe('IdToken instantiated with an bogus token string.', () => {
        it('Should throw an error.', () => {
            const jwtString = 'A1234BogusTokenString';
            try {
                new IdToken(jwtString);
                assert.fail();
            } catch (error) {
                // Constructor threw error as expected.
            }
        });
    });

    describe('AccessToken instantiated with a valid token string.', () => {
        it('All property values should have expected values.', () => {

            const jwtString = 'eyJraWQiOiI5eW0xRm9FSWNNbEh5S2thWWZCd2NHbklTeXZyYXdJbmRxVWZiTnQ4SGVNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwNTE2NjEzMy1iMzFhLTRjYjQtOTQyNC0yMjAwNWJiM2EyMTYiLCJhdWQiOiIycnNrbmx0ZXV0ZGVzMnN0aWhjZTNrZDVtYyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUxMDIxMTUzOCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfejZtMUpJRnc0IiwiY29nbml0bzp1c2VybmFtZSI6ImFsb3B0aW1hIiwiZXhwIjoxNTEwMjE1MTM4LCJnaXZlbl9uYW1lIjoiQWwiLCJpYXQiOjE1MTAyMTE1MzgsImZhbWlseV9uYW1lIjoiVGFiYXlveW9uIiwiZW1haWwiOiJhbEBvcHRpbWFkZW50YWwuY29tIn0.EHiXAkmRAXj_PAjAY4Q3yfy2wwWyUvolWPYbPyrOY6U_fjMPmWrqtOTuUJHaTLWF4G2XninlRijHeerTSEvFrRqkxI8QmI-OMg-Pa12AnGsfl79XTgpiV7CbTMsuiBGMzgUQsvqP8jtL6psHim626XlWBIfXVl0YW4vFoOpyQI5J3WHxeGvB8dGvknNy5GQfC3hrhj7bFv9hmix4niw6lUvmv7dVKsaz-mXhmIiuTz47uEb12WtE4SOt2yMvLDmBF64yxg49hFfYhbDSiM1MctK1PnPulF8teZCl_b0jZlBH12n4azpW2GykwQ-6tX_JCnIHMRA4MFxoqSozQq5RVQ';
            const iut = new IdToken(jwtString);
            const expectedJwtPayloadValues: IdTokenJwtPayload = {
                'sub': '05166133-b31a-4cb4-9424-22005bb3a216',
                'email_verified': true,
                'given_name': 'Al',
                'family_name': 'Tabayoyon',
                'email': 'al@optimadental.com'
            };
            console.log(JSON.stringify(iut.getPayload()));
            expect(iut.getJwtToken()).equal(jwtString);
            expect(iut.address).to.be.undefined;
            expect(iut.birthdate).to.be.undefined;
            expect(iut.email).equal(expectedJwtPayloadValues.email);
            expect(iut.email_verified).equal(expectedJwtPayloadValues.email_verified);
            expect(iut.family_name).equal(expectedJwtPayloadValues.family_name);
            expect(iut.gender).to.be.undefined;
            expect(iut.given_name).equal(expectedJwtPayloadValues.given_name);
            expect(iut.locale).to.be.undefined;
            expect(iut.middle_name).to.be.undefined;
            expect(iut.name).to.be.undefined;
            expect(iut.nickname).to.be.undefined;
            expect(iut.phone_number).to.be.undefined;
            expect(iut.phone_number_verified).to.be.undefined;
            expect(iut.picture).to.be.undefined;
            expect(iut.preferred_username).to.be.undefined;
            expect(iut.profile).to.be.undefined;
            expect(iut.sub).equal(expectedJwtPayloadValues.sub);
            expect(iut.updated_at).to.be.undefined;
            expect(iut.website).to.be.undefined;
            expect(iut.zoneinfo).to.be.undefined;

        });
    });

});

