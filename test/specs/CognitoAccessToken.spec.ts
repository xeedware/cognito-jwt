import {CognitoAccessToken, CognitoAccessTokenJwtPayload} from '../../src';
import {expect} from 'chai';

// tslint:disable:max-line-length
// tslint:disable:no-unused-expression

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
    expect(iut.cognito_groups).to.be.undefined;
    expect(iut.device_key).to.be.undefined;
    expect(iut.email).equal(expectedJwtPayload.email);
    expect(iut.email_verified).equal(expectedJwtPayload.email_verified);
    expect(iut.event_id).to.be.undefined;
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
it('CognitoAccessToken with cognito:groups and event_id', () => {

    const jwtString = 'eyJraWQiOiJGNFVmbFRidjc5V05kUnAxWEhqbCtGSHUzZHZjT2RIWWJvUEJza0k5QTZBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ZjIzYzJhOS1mZjAzLTQ0ZDctOGFhMi1kOTViOTlmZGQ2YTEiLCJkZXZpY2Vfa2V5IjoidXMtd2VzdC0yXzZiZDViM2FlLTI3NjktNGQ4ZC05YzRjLTZkNjYwZGU1MGJkMyIsImNvZ25pdG86Z3JvdXBzIjpbImFkbWluLXN1cGVyIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yXzBBZVhjVXFrSCIsImNsaWVudF9pZCI6ImtjcTZua25ncnZpajJucjMyYzRrNTMzN2kiLCJldmVudF9pZCI6IjQ1NGUzODUzLTUxNDItNDI2YS04Y2NiLTAyOTA3OGVjMjMwMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1ODQ5NDI5MzIsImV4cCI6MTU4NDk0NjUzMywiaWF0IjoxNTg0OTQyOTMzLCJqdGkiOiI5ZWYzMjgwMi03Yzg4LTQzZTMtYWU2OC0yZDc2MTBmYzM4YzEiLCJ1c2VybmFtZSI6IlN1cGVyQWRtaW4ifQ.eDxI94eiaJ3zHh-w5N1COjpqldPa6QxrkPp_5yfSOTPwIDvBdajUWDu_E2Fq_m8fj8XFW-LCAPKvYR0uOBCoHxNM6r3s7FQ-dUEkeUK-NOiwT0FccsSr12aVQMEhT-_CPZkF2ZFv37Uhpoiw1uEr1kelz3NXBANnXUWqDGl58SOym3GWL93Y6CAwaLEf-IbABu_F3hllMb9x5YalFRjcfJiakL2-nsO8A1bkR917xxzv7VcBHZhDzcaN7D9rkaRZypcwKrrmGVJvB8mKmKXtdJU1EItH1Eb9tWb7zUxx302ZyOrjkDJJbGUBwZVZ0kzE3S8379a8dsWENEF6sFjB9A';
    const expectedJwtPayload: CognitoAccessTokenJwtPayload = {
        'sub': '8f23c2a9-ff03-44d7-8aa2-d95b99fdd6a1',
        'device_key': 'us-west-2_6bd5b3ae-2769-4d8d-9c4c-6d660de50bd3',
        'cognito:groups': [
            'admin-super'
        ],
        'iss': 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_0AeXcUqkH',
        'client_id': 'kcq6nkngrvij2nr32c4k5337i',
        'event_id': '454e3853-5142-426a-8ccb-029078ec2300',
        'token_use': 'access',
        'scope': 'aws.cognito.signin.user.admin',
        'auth_time': 1584942932,
        'exp': 1584946533,
        'iat': 1584942933,
        'jti': '9ef32802-7c88-43e3-ae68-2d7610fc38c1',
        'username': 'SuperAdmin'
    };
    const expectedCognitoJwtPayload = JSON.parse('{"sub":"8f23c2a9-ff03-44d7-8aa2-d95b99fdd6a1","device_key":"us-west-2_6bd5b3ae-2769-4d8d-9c4c-6d660de50bd3","cognito:groups":["admin-super"],"iss":"https://cognito-idp.us-west-2.amazonaws.com/us-west-2_0AeXcUqkH","client_id":"kcq6nkngrvij2nr32c4k5337i","event_id":"454e3853-5142-426a-8ccb-029078ec2300","token_use":"access","scope":"aws.cognito.signin.user.admin","auth_time":1584942932,"exp":1584946533,"iat":1584942933,"jti":"9ef32802-7c88-43e3-ae68-2d7610fc38c1","username":"SuperAdmin"}');
    const iut = new CognitoAccessToken(jwtString);
    expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoJwtPayload));

    // CognitoAccessToken added attributes
    expect(iut.auth_time).equal(expectedJwtPayload.auth_time);
    expect(iut.client_id).equal(expectedJwtPayload.client_id);
    expect(iut.cognito_groups.length).equal(expectedJwtPayload['cognito:groups'].length);
    expect(iut.cognito_groups[0]).equal(expectedJwtPayload['cognito:groups'][0]);
    expect(iut.device_key).equal(expectedJwtPayload.device_key);
    expect(iut.email).equal(expectedJwtPayload.email);
    expect(iut.email_verified).equal(expectedJwtPayload.email_verified);
    expect(iut.event_id).equal(expectedJwtPayload.event_id);
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
