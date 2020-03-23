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
    expect(iut.cognito_groups).to.be.undefined;
    expect(iut.email).equal(expectedJwtPayload.email);
    expect(iut.email_verified).equal(expectedJwtPayload.email_verified);
    expect(iut.event_id).to.be.undefined;
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
it('CognitoIdToken has cognito:groups and event_id', () => {

    const jwtString = 'eyJraWQiOiJJU1hCS3BTZE1GS1RyWjVLSTFxcDlZZXM1U3NDNTEyOXU0TGlDY2dGUVVnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4ZjIzYzJhOS1mZjAzLTQ0ZDctOGFhMi1kOTViOTlmZGQ2YTEiLCJ3ZWJzaXRlIjoiaHR0cHM6XC9cL3hlZHdhcmVcL2FsdCIsInpvbmVpbmZvIjoiQW1lcmljYVwvTG9zX0FuZ2VsZXMiLCJjb2duaXRvOmdyb3VwcyI6WyJhZG1pbi1zdXBlciJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYmlydGhkYXRlIjoiMTk3Mi0wMS0wMSIsImdlbmRlciI6Im1haWwiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl8wQWVYY1Vxa0giLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJTdXBlckFkbWluIiwiZ2l2ZW5fbmFtZSI6IlN1cGVyIiwibG9jYWxlIjoiZW4iLCJtaWRkbGVfbmFtZSI6Ik1pZGRsZSIsInBpY3R1cmUiOiJodHRwczpcL1wvcy5ncmF2YXRhci5jb21cL2F2YXRhclwvZjQzOGIyMTMzNWRmYjNhNWZlYTIyNmNmNDFlZDYwNTU_cz04MCIsImF1ZCI6ImtjcTZua25ncnZpajJucjMyYzRrNTMzN2kiLCJldmVudF9pZCI6IjQ1NGUzODUzLTUxNDItNDI2YS04Y2NiLTAyOTA3OGVjMjMwMCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTg0OTQyOTMyLCJuaWNrbmFtZSI6Ik5pY2siLCJwaG9uZV9udW1iZXIiOiIrMTUwMzMzMDg0MDIiLCJleHAiOjE1ODQ5NDY1MzMsImlhdCI6MTU4NDk0MjkzMywiZmFtaWx5X25hbWUiOiJBZG1pbiIsImVtYWlsIjoiYWx0QHhlZHdhcmUuY29tIn0.kk0rRYZ14VqZ30ja96W3qmfWYQBqPVi8B47MMTVbdxQ-wDWh_FiWMA_CTidHk2Spun08b2fhgXq1rrTAkfJI91JdZrOwP4ojqqm6mGRgwLn7QgAB9rUBwKWqo7cWFJzkT4tHCFRaJHhkBITEX46EHoilPxWFL65dsAB99mIsFvpDBpTLpJnYGXBz9FWwt50PMTujLgqLSYm8PiCYRl1I4d2ZNMDdSkYO5dUvVi_OXW1iLRK1ic5gHUhOYyEmVDc7-qIXrrVFegjn2GJeJsmspI2VowDflUYZPeIQg8yUbg1pE7zTvDcUDcXObWQqgGofQ7MASd_0pLhC5boysolHiQ.eyJzdWIiOiIwNTE2NjEzMy1iMzFhLTRjYjQtOTQyNC0yMjAwNWJiM2EyMTYiLCJhdWQiOiIycnNrbmx0ZXV0ZGVzMnN0aWhjZTNrZDVtYyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTUxMDIxMTUzOCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tXC91cy13ZXN0LTJfejZtMUpJRnc0IiwiY29nbml0bzp1c2VybmFtZSI6ImFsb3B0aW1hIiwiZXhwIjoxNTEwMjE1MTM4LCJnaXZlbl9uYW1lIjoiQWwiLCJpYXQiOjE1MTAyMTE1MzgsImZhbWlseV9uYW1lIjoiVGFiYXlveW9uIiwiZW1haWwiOiJhbEBvcHRpbWFkZW50YWwuY29tIn0.EHiXAkmRAXj_PAjAY4Q3yfy2wwWyUvolWPYbPyrOY6U_fjMPmWrqtOTuUJHaTLWF4G2XninlRijHeerTSEvFrRqkxI8QmI-OMg-Pa12AnGsfl79XTgpiV7CbTMsuiBGMzgUQsvqP8jtL6psHim626XlWBIfXVl0YW4vFoOpyQI5J3WHxeGvB8dGvknNy5GQfC3hrhj7bFv9hmix4niw6lUvmv7dVKsaz-mXhmIiuTz47uEb12WtE4SOt2yMvLDmBF64yxg49hFfYhbDSiM1MctK1PnPulF8teZCl_b0jZlBH12n4azpW2GykwQ-6tX_JCnIHMRA4MFxoqSozQq5RVQ';
    const expectedJwtPayload: CognitoIdTokenJwtPayload = {
        'sub': '8f23c2a9-ff03-44d7-8aa2-d95b99fdd6a1',
        'website': 'https://xedware/alt',
        'zoneinfo': 'America/Los_Angeles',
        'cognito:groups': [
            'admin-super'
        ],
        'email_verified': true,
        'birthdate': '1972-01-01',
        'gender': 'mail',
        'iss': 'https://cognito-idp.us-west-2.amazonaws.com/us-west-2_0AeXcUqkH',
        'phone_number_verified': true,
        'cognito:username': 'SuperAdmin',
        'given_name': 'Super',
        'locale': 'en',
        'middle_name': 'Middle',
        'picture': 'https://s.gravatar.com/avatar/f438b21335dfb3a5fea226cf41ed6055?s=80',
        'aud': 'kcq6nkngrvij2nr32c4k5337i',
        'event_id': '454e3853-5142-426a-8ccb-029078ec2300',
        'token_use': 'id',
        'auth_time': 1584942932,
        'nickname': 'Nick',
        'phone_number': '+15033308402',
        'exp': 1584946533,
        'iat': 1584942933,
        'family_name': 'Admin',
        'email': 'alt@xedware.com'
    };
    const iut = new CognitoIdToken(jwtString);
    const expectedCognitoJwtPayload = JSON.parse('{"sub":"8f23c2a9-ff03-44d7-8aa2-d95b99fdd6a1","website":"https://xedware/alt","zoneinfo":"America/Los_Angeles","cognito:groups":["admin-super"],"email_verified":true,"birthdate":"1972-01-01","gender":"mail","iss":"https://cognito-idp.us-west-2.amazonaws.com/us-west-2_0AeXcUqkH","phone_number_verified":true,"cognito:username":"SuperAdmin","given_name":"Super","locale":"en","middle_name":"Middle","picture":"https://s.gravatar.com/avatar/f438b21335dfb3a5fea226cf41ed6055?s=80","aud":"kcq6nkngrvij2nr32c4k5337i","event_id":"454e3853-5142-426a-8ccb-029078ec2300","token_use":"id","auth_time":1584942932,"nickname":"Nick","phone_number":"+15033308402","exp":1584946533,"iat":1584942933,"family_name":"Admin","email":"alt@xedware.com"}');
    expect(JSON.stringify(iut.getPayload())).equal(JSON.stringify(expectedCognitoJwtPayload));

    // CognitoIdToken added attributes
    expect(iut.aud).equal(expectedJwtPayload.aud);
    expect(iut.auth_time).equal(expectedJwtPayload.auth_time);
    expect(iut.cognito_groups.length).equal(expectedJwtPayload['cognito:groups'].length);
    expect(iut.cognito_groups[0]).equal(expectedJwtPayload['cognito:groups'][0]);
    expect(iut.cognito_username).equal(expectedJwtPayload['cognito:username']);
    expect(iut.exp).equal(expectedJwtPayload.exp);
    expect(iut.event_id).equal(expectedJwtPayload.event_id);
    expect(iut.iss).equal(expectedJwtPayload.iss);
    expect(iut.iat).equal(expectedJwtPayload.iat);
    expect(iut.scope).equal(expectedJwtPayload.scope);
    expect(iut.tokenUse).equal(expectedJwtPayload.token_use);

    // IETF attributes
    expect(iut.address).to.be.undefined;
    expect(iut.birthdate).equal(expectedCognitoJwtPayload.birthdate);
    expect(iut.email).equal(expectedJwtPayload.email);
    expect(iut.email_verified).equal(expectedJwtPayload.email_verified);
    expect(iut.family_name).equal(expectedJwtPayload.family_name);
    expect(iut.gender).equal(expectedCognitoJwtPayload.gender);
    expect(iut.given_name).equal(expectedJwtPayload.given_name);
    expect(iut.locale).equal(expectedCognitoJwtPayload.locale);
    expect(iut.middle_name).equal(expectedCognitoJwtPayload.middle_name);
    expect(iut.name).to.be.undefined;
    expect(iut.nickname).equal(expectedCognitoJwtPayload.nickname);
    expect(iut.phone_number).equal(expectedCognitoJwtPayload.phone_number);
    expect(iut.phone_number_verified).equal(expectedCognitoJwtPayload.phone_number_verified);
    expect(iut.picture).equal(expectedCognitoJwtPayload.picture);
    expect(iut.preferred_username).to.be.undefined;
    expect(iut.profile).to.be.undefined;
    expect(iut.sub).equal(expectedJwtPayload.sub);
    expect(iut.updated_at).to.be.undefined;
    expect(iut.website).equal(expectedCognitoJwtPayload.website);
    expect(iut.zoneinfo).equal(expectedCognitoJwtPayload.zoneinfo);

});
