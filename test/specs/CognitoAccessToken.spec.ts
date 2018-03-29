import {CognitoAccessToken, CognitoAccessTokenJwtPayload} from '../../src';
import {expect} from 'chai';

// tslint:disable:max-line-length

it('CognitoAccessToken', () => {

    const jwtString = 'eyJraWQiOiI2aXF3QlVwM3lzNkJWdGNqVEY5TG80Sjk4Qmd3aVZ4UEU4MlJkd3YrTEVFPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwNTE2NjEzMy1iMzFhLTRjYjQtOTQyNC0yMjAwNWJiM2EyMTYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfejZtMUpJRnc0IiwiZXhwIjoxNTEwMjE1MTM4LCJpYXQiOjE1MTAyMTE1MzgsImp0aSI6IjdhN2M5ZDkwLWUwZWItNDBjMS05ODUzLWVjZTA1YTYwZTNjNCIsImNsaWVudF9pZCI6IjJyc2tubHRldXRkZXMyc3RpaGNlM2tkNW1jIiwidXNlcm5hbWUiOiJhbG9wdGltYSJ9.eA-qcenfIqnOakv1vZlfTNnLfH4TRb8_-yW4i7oL1SBFDXPR700Q-4pG7tJyTKr2_RjiEEOPtrWGwUcsLPbRMrTQELLzWdRp_X8dsT8-WE5X16dES5Uixpa5yMMvRVwCHZZD7ti-Ko2EAcO0ziz0G_R1wCKT2oVgQejsHwDJOT1PmDvawGufxLnuSVsqVNDBZxE52n45103bfzP7KtM7tay2Tc_NxZrfcL_8wep-_IMY59Z8aoerM2aaJprxOlN-XqfB43Tec9wFuDOEEPdx7XVIpcRRwz4POJYrhbrtD6GfBXztlwv5Ud_c5m4lWy-j1r7mCeDKBZmjI1WkBILyXA';
    const expectedJwtPayload: CognitoAccessTokenJwtPayload = {
        'sub': '05166133-b31a-4cb4-9424-22005bb3a216',
        'token_use': 'access',
        'scope': 'aws.cognito.signin.user.admin',
        'iss': 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_z6m1JIFw4',
        'exp': 1510215138,  // Thu Nov 09 2017 00:12:18 GMT-0800 (PST)
        'iat': 1510211538,  // Wed Nov 08 2017 23:12:18 GMT-0800 (PST)
        'jti': '7a7c9d90-e0eb-40c1-9853-ece05a60e3c4',
        'client_id': '2rsknlteutdes2stihce3kd5mc',
        'username': 'aloptima'
    };
    const expectedCognitoJwtPayload = JSON.parse('{"sub":"05166133-b31a-4cb4-9424-22005bb3a216","token_use":"access","scope":"aws.cognito.signin.user.admin","iss":"https://cognito-idp.us-west-2.amazonaws.com/us-west-2_z6m1JIFw4","exp":1510215138,"iat":1510211538,"jti":"7a7c9d90-e0eb-40c1-9853-ece05a60e3c4","client_id":"2rsknlteutdes2stihce3kd5mc","username":"aloptima"}');
    const iut = new CognitoAccessToken(jwtString);
    expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoJwtPayload));

    // CognitoAccessToken added attributes
    expect(iut.auth_time).equal(expectedJwtPayload.auth_time);
    expect(iut.client_id).equal(expectedJwtPayload.client_id);
    expect(iut.email).equal(expectedJwtPayload.email);
    expect(iut.email_verified).equal(expectedJwtPayload.email_verified);
    expect(iut.scope).equal(expectedJwtPayload.scope);
    expect(iut.tokenUse).equal(expectedJwtPayload.token_use);
    expect(iut.username).equal(expectedJwtPayload.username);

    // IETF attributes
    expect(iut.aud).equal(expectedJwtPayload.aud);
    expect(iut.exp).equal(expectedJwtPayload.exp);
    expect(iut.iat).equal(expectedJwtPayload.iat);
    expect(iut.iss).equal(expectedJwtPayload.iss);
    expect(iut.jti).equal(expectedJwtPayload.jti);
    expect(iut.nbf).equal(expectedJwtPayload.nbf);
    expect(iut.sub).equal(expectedJwtPayload.sub);

});
