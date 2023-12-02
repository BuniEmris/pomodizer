const googleResp = {
  idToken:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6ImU4NDdkOTk0OGU4NTQ1OTQ4ZmE4MTU3YjczZTkxNWM1NjczMDJkNGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MTQ4MDY0MDA3Nzcta2JzM24zaTZtbGF1ZzBwYnZtYmltYjlrbmlqZTdramIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MTQ4MDY0MDA3NzctcmZ2ZjhjdG82bzIyZzF2b3ZnZHIxaGI2ZXNwajFzcTguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ1Mjc0MTI3NTMzMzcyODUwNjYiLCJlbWFpbCI6Im9pZG10cnVrQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVkJkYXlPTTUxM0xpNGw4a05EdGJVZyIsIm5vbmNlIjoiMnhPamZqbTVBUW9qNnE4Z3REVl9YZlpuTEgyQ0V2TGJSMmxvd3lFX21QcyIsIm5hbWUiOiJPbGVnIERteXRydWsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FGZFp1Y3BCNnM3bXlhci1kSXUtalRHMjY0UUp2YVRvNFNaLTFLRE5Sa056PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik9sZWciLCJmYW1pbHlfbmFtZSI6IkRteXRydWsiLCJsb2NhbGUiOiJydSIsImlhdCI6MTY2MjExMDU0MiwiZXhwIjoxNjYyMTE0MTQyfQ.Rf5WOprDiuWG8UtPQK1vjUV13ugWHs4lLVdpqSmyUgD2lnF-yzI4FF2rRZXKPv7RldtFQ8W4Gf_vuhjxDIdFE1v9KeZYS3VyOHH4HpBo0Rbm_kpJmeNHlO4BsyPIHNTaVBRaUq_2DTf2W21P61Ez85lP_Dm5S9VOLZtcW3Eq5S82PhST2qpB0xRSfF0wXHt9QcGuP0OWzKV4EZhikrYQCxcRjlwWjb04UxUgQ9fxxbZrxOIjQjnCzQ62WvYhXcPC4d0MZR-2fynCpUPJbOqPwJ7mtwflEDcgj8J5q9vr_USnucPiiQiWo8Ww2n9h6BV0KsbmkRCOgDhE40VFDtDq8Q',
  serverAuthCode:
    '4/0AdQt8qj5ALSet3zuq-w7cEi3PbjyfqON2yNZdBH652jwYNiTGE6gfris7OYA8efvASD0SA',
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  user: {
    photo:
      'https://lh3.googleusercontent.com/a-/AFdZucpB6s7myar-dIu-jTG264QJvaTo4SZ-1KDNRkNz=s120',
    givenName: 'Oleg',
    familyName: 'Dmytruk',
    name: 'Oleg Dmytruk',
    email: 'oidmtruk@gmail.com',
    id: '104527412753337285066',
  },
}

const appleResp = {
  user: '000098.60a1d655514c44c99a134a13d77463a7.2024',
  email: 'o.dmytruk@icloud.com',
  authorizedScopes: [],
  fullName: {
    namePrefix: null,
    givenName: 'Oleg',
    familyName: 'Dmytruk',
    nickname: null,
    middleName: null,
    nameSuffix: null,
  },
  identityToken:
    'eyJraWQiOiJZdXlYb1kiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLm9pZG10cnVrLnBvbW9kaXplciIsImV4cCI6MTY2MjIwNjAwMSwiaWF0IjoxNjYyMTE5NjAxLCJzdWIiOiIwMDAwOTguNjBhMWQ2NTU1MTRjNDRjOTlhMTM0YTEzZDc3NDYzYTcuMjAyNCIsIm5vbmNlIjoiY2ZmYjNmYjY2ODMyOWFiYzgzYzgxMTVkZTZmZDc1MzA0N2EwMmY5Y2E4M2M2OTcxMTM4MDI5MDQyZDE2NzU0OSIsImNfaGFzaCI6Im9jUV8xWnByblhOMWhFcWdvR0RZaVEiLCJlbWFpbCI6Im8uZG15dHJ1a0BpY2xvdWQuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJ0cnVlIiwiYXV0aF90aW1lIjoxNjYyMTE5NjAxLCJub25jZV9zdXBwb3J0ZWQiOnRydWUsInJlYWxfdXNlcl9zdGF0dXMiOjJ9.uNym6hPiNyidicvNMzzpeFqet9nkTXEZ6Zwdi3470yLt4wxLyePLKMSnnF_RX0UG3PEfmVwNReBDcjQeOyobx_HFlR5zSf39lX5LJeJV6utubevZuJug3k9z0v9HQ_EpYw6D8bRhu_CipqhQ9P3jcfpXe97HmJmgQ7SVxKkxXVZOGIBZQGPZZrSgTPpdILbPTMSaJQDfUBTdj6BSwSkAcxNbEea1P6ZukSpMY5q2gDraL6ZI1EwB4JsJ5CAuphUiUD6eMg9V3biWlbTLuunqFwo2ZQ9EmKFoRBHitXg2jn0bY7yZ4esf3ZuG1wOgFsmU3jdMfiKZ-bNzp68TEfzCZA',
  authorizationCode:
    'c8cb1b4ab36cb4478b0851a0dd524631a.0.rzy.xViyIIzH1GVHY601aiGnFg',
  realUserStatus: 2,
  state: null,
  nonce: 'oCmXct2XJcnOVkUREx_FiKNBH_Q.urXA',
}
