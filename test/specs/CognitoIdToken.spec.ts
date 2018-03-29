import {CognitoIdToken, CognitoIdTokenJwtPayload} from '../../src';
import {expect} from 'chai';

// tslint:disable:max-line-length
// tslint:disable:no-unused-expression
it('IdToken', () => {

    // tslint:disable-next-line:max-line-length
    const jwtString = 'eyJraWQiOiI5eW0xRm9FSWNNbEh5S2thWWZCd2NHbklTeXZyYXdJbmRxVWZiTnQ4SGVNPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwNTE2NjEzMy1iMzFhLTRjYjQtOTQyNC0yMjAwNWJiM2EyMTYiLCJhdWQiOiIycnNrbmx0ZXV0ZGVzMnN0aWhjZTNrZDVtYyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUxMDIxMTUzOCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfejZtMUpJRnc0IiwiY29nbml0bzp1c2VybmFtZSI6ImFsb3B0aW1hIiwiZXhwIjoxNTEwMjE1MTM4LCJnaXZlbl9uYW1lIjoiQWwiLCJpYXQiOjE1MTAyMTE1MzgsImZhbWlseV9uYW1lIjoiVGFiYXlveW9uIiwiZW1haWwiOiJhbEBvcHRpbWFkZW50YWwuY29tIn0.EHiXAkmRAXj_PAjAY4Q3yfy2wwWyUvolWPYbPyrOY6U_fjMPmWrqtOTuUJHaTLWF4G2XninlRijHeerTSEvFrRqkxI8QmI-OMg-Pa12AnGsfl79XTgpiV7CbTMsuiBGMzgUQsvqP8jtL6psHim626XlWBIfXVl0YW4vFoOpyQI5J3WHxeGvB8dGvknNy5GQfC3hrhj7bFv9hmix4niw6lUvmv7dVKsaz-mXhmIiuTz47uEb12WtE4SOt2yMvLDmBF64yxg49hFfYhbDSiM1MctK1PnPulF8teZCl_b0jZlBH12n4azpW2GykwQ-6tX_JCnIHMRA4MFxoqSozQq5RVQ';
    const expectedJwtPayload: CognitoIdTokenJwtPayload = {
        'sub': '05166133-b31a-4cb4-9424-22005bb3a216',
        'aud': '2rsknlteutdes2stihce3kd5mc',
        'email_verified': true,
        'token_use': 'id',
        'auth_time': 1510211538,  // Wed Nov 08 2017 23:12:18 GMT-0800 (PST)
        'iss': 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_z6m1JIFw4',
        'cognito:username': 'aloptima',
        'exp': 1510215138,  // Thu Nov 09 2017 00:12:18 GMT-0800 (PST)
        'given_name': 'Al',
        'iat': 1510211538,  // Wed Nov 08 2017 23:12:18 GMT-0800 (PST)
        'family_name': 'Tabayoyon',
        'email': 'al@optimadental.com'
    };
    const iut = new CognitoIdToken(jwtString);
    const expectedCognitoJwtPayload = JSON.parse('{"sub":"05166133-b31a-4cb4-9424-22005bb3a216","aud":"2rsknlteutdes2stihce3kd5mc","email_verified":true,"token_use":"id","auth_time":1510211538,"iss":"https://cognito-idp.us-west-2.amazonaws.com/us-west-2_z6m1JIFw4","cognito:username":"aloptima","exp":1510215138,"given_name":"Al","iat":1510211538,"family_name":"Tabayoyon","email":"al@optimadental.com"}');
    expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoJwtPayload));

    // CognitoIdToken added attributes
    expect(iut.aud).equal(expectedJwtPayload.aud);
    expect(iut.auth_time).equal(expectedJwtPayload.auth_time);
    expect(iut.cognito_username).equal(expectedJwtPayload['cognito:username']);
    expect(iut.exp).equal(expectedJwtPayload.exp);
    expect(iut.iss).equal(expectedJwtPayload.iss);
    expect(iut.iat).equal(expectedJwtPayload.iat);
    expect(iut.scope).equal(expectedJwtPayload.scope);
    expect(iut.tokenUse).equal(expectedJwtPayload.token_use);

    // IETF attributes
    expect(iut.address).to.be.undefined;
    expect(iut.birthdate).to.be.undefined;
    expect(iut.email).equal(expectedJwtPayload.email);
    expect(iut.email_verified).equal(expectedJwtPayload.email_verified);
    expect(iut.family_name).equal(expectedJwtPayload.family_name);
    expect(iut.gender).to.be.undefined;
    expect(iut.given_name).equal(expectedJwtPayload.given_name);
    expect(iut.locale).to.be.undefined;
    expect(iut.middle_name).to.be.undefined;
    expect(iut.name).to.be.undefined;
    expect(iut.nickname).to.be.undefined;
    expect(iut.phone_number).to.be.undefined;
    expect(iut.phone_number_verified).to.be.undefined;
    expect(iut.picture).to.be.undefined;
    expect(iut.preferred_username).to.be.undefined;
    expect(iut.profile).to.be.undefined;
    expect(iut.sub).equal(expectedJwtPayload.sub);
    expect(iut.updated_at).to.be.undefined;
    expect(iut.website).to.be.undefined;
    expect(iut.zoneinfo).to.be.undefined;

});
