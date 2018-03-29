import {AccessToken, AccessTokenJwtPayload} from '../../src';
import {expect, assert} from 'chai';

// tslint:disable:no-unused-expression

describe('AccessToken class', () => {

    describe('AccessToken instantiated with an empty string.', () => {
        it('All property values should be undefined.', () => {
            const jwtString = '';
            const iut = new AccessToken(jwtString);
            expect(iut.getJwtToken()).equal(jwtString);
            expect(iut.aud).to.be.undefined;
            expect(iut.exp).to.be.undefined;
            expect(iut.iat).to.be.undefined;
            expect(iut.iss).to.be.undefined;
            expect(iut.jti).to.be.undefined;
            expect(iut.nbf).to.be.undefined;
            expect(iut.sub).to.be.undefined;
        })
    });

    describe('AccessToken instantiated with an bogus token string.', () => {
        it('Should throw an error.', () => {
            const jwtString = 'A1234BogusTokenString';
            try {
                new AccessToken(jwtString);
                assert.fail();
            } catch (error) {
                // Constructor threw error as expected.
            }
        });
    });

    describe('AccessToken instantiated with a valid token string.', () => {
        it('All property values should have expected values.', () => {

            // tslint:disable-next-line:max-line-length
            const jwtString = 'eyJraWQiOiI2aXF3QlVwM3lzNkJWdGNqVEY5TG80Sjk4Qmd3aVZ4UEU4MlJkd3YrTEVFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwNTE2NjEzMy1iMzFhLTRjYjQtOTQyNC0yMjAwNWJiM2EyMTYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfejZtMUpJRnc0IiwiZXhwIjoxNTEwMjE1MTM4LCJpYXQiOjE1MTAyMTE1MzgsImp0aSI6IjdhN2M5ZDkwLWUwZWItNDBjMS05ODUzLWVjZTA1YTYwZTNjNCIsImNsaWVudF9pZCI6IjJyc2tubHRldXRkZXMyc3RpaGNlM2tkNW1jIiwidXNlcm5hbWUiOiJhbG9wdGltYSJ9.eA-qcenfIqnOakv1vZlfTNnLfH4TRb8_-yW4i7oL1SBFDXPR700Q-4pG7tJyTKr2_RjiEEOPtrWGwUcsLPbRMrTQELLzWdRp_X8dsT8-WE5X16dES5Uixpa5yMMvRVwCHZZD7ti-Ko2EAcO0ziz0G_R1wCKT2oVgQejsHwDJOT1PmDvawGufxLnuSVsqVNDBZxE52n45103bfzP7KtM7tay2Tc_NxZrfcL_8wep-_IMY59Z8aoerM2aaJprxOlN-XqfB43Tec9wFuDOEEPdx7XVIpcRRwz4POJYrhbrtD6GfBXztlwv5Ud_c5m4lWy-j1r7mCeDKBZmjI1WkBILyXA';
            const iut = new AccessToken(jwtString);
            const expectedJwtPayloadValues: AccessTokenJwtPayload = {
                'sub': '05166133-b31a-4cb4-9424-22005bb3a216',
                'iss': 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_z6m1JIFw4',
                'exp': 1510215138,  // Thu Nov 09 2017 00:12:18 GMT-0800 (PST)
                'iat': 1510211538,  // Wed Nov 08 2017 23:12:18 GMT-0800 (PST)
                'jti': '7a7c9d90-e0eb-40c1-9853-ece05a60e3c4',
            };

            expect(iut.getJwtToken()).equal(jwtString);
            expect(iut.aud).equal(expectedJwtPayloadValues.aud);
            expect(iut.exp).equal(expectedJwtPayloadValues.exp);
            expect(iut.iat).equal(expectedJwtPayloadValues.iat);
            expect(iut.iss).equal(expectedJwtPayloadValues.iss);
            expect(iut.jti).equal(expectedJwtPayloadValues.jti);
            expect(iut.nbf).equal(expectedJwtPayloadValues.nbf);
            expect(iut.sub).equal(expectedJwtPayloadValues.sub);

        });
    });
});
