define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils'
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class ButtonActionChain extends ActionChain {

    async run(context) {
      const { $variables } = context;

      // ---- MSAL Config ---- //
      const msalConfig = {
        auth: {
          clientId: "b77dfd12-44df-4b54-a0d7-790b055e3043", // from Azure AD
          authority:  "https://login.microsoftonline.com/f4d4b2b3-ca12-4c29-8cff-136685f7f51d",
          redirectUri: "https://etao-dev20ldr1u9-demoservices001-phx.developer.ocp.oraclecloud.com/etao-dev20ldr1u9-demoservices001-phx/uiext/vbdt/index.html?root=application&application=etao-dev20ldr1u9-demoservices001-phx_ocean-equip_128489_1-1.0&artifact=webApps_-_ritecrewsetup_-_flows_-_dashboard_-_pages_-_dashboard-start-page&section=actions&actionChain=ButtonActionChain&actionChainSection=code&organizationId=etao-dev20ldr1u9-demoservices001-phx&restUrl=s2%2Fetao-dev20ldr1u9-demoservices001-phx_ocean-equip_128489%2Fvbdt%2F&serverRoot=%2F" // must match Azure redirect URI
        },
        cache: {
          cacheLocation: "sessionStorage",
          storeAuthStateInCookie: false
        }
      };

      const msalInstance =  new window.msal.PublicClientApplication(msalConfig);

      try {
        // ---- Login Popup ---- //
        const loginResponse = await msalInstance.loginPopup({
          scopes: ["openid", "profile", "email", "User.Read"] // adjust scopes
        });

        // ---- Tokens ---- //
        const idToken = loginResponse.idToken;
        const accessToken = loginResponse.accessToken;

        console.log("ID Token:", idToken);
        console.log("Access Token:", accessToken);

        // ---- Decode ID Token ---- //
        const decoded = parseJwt(idToken);
        console.log("Decoded User Claims:", decoded.email);

        // ---- Store in VBCS variable ---- //
        // $variables.jwttoken = idToken;
        // $variables.loggedInUser = decoded; // contains email, name, etc.

      } catch (err) {
        console.error("Login failed:", err);
      }

      // ---- Helper function to decode JWT ---- //
      function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
      }
    }
  }

  return ButtonActionChain;
});
