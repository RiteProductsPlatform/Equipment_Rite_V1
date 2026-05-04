define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class vbEnterListener extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      //   }
       const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_DashboardCount',
        });

        if (response.ok) {

          $variables.dashboardAdp.data = response.body.items;
       }

      //       const msalConfig = {
      //   auth: {
      //     clientId: "2a24551b-432a-4699-8592-9bbe80313651", // from Azure AD
      //     authority:  "https://login.microsoftonline.com/97525e9a-595d-472c-8248-0dc58f852d61",
      //     redirectUri: "https://equipritedev.oceaneering.com" // must match Azure redirect URI
      //   },
      //   cache: {
      //     cacheLocation: "sessionStorage",
      //     storeAuthStateInCookie: false
      //   }
      // };

      // const msalInstance =  new window.msal.PublicClientApplication(msalConfig);

      //   try {
      //     // ---- Login Popup ---- //
      //     const loginResponse = await msalInstance.loginPopup({
      //       scopes: ["openid", "profile", "email", "User.Read"] // adjust scopes
      //     });

      //     // ---- Tokens ---- //
      //     const idToken = loginResponse.idToken;
      //     const accessToken = loginResponse.accessToken;

      //     console.log("ID Token:", idToken);
      //     console.log("Access Token:", accessToken);

      //     // ---- Decode ID Token ---- //
      //     const decoded = parseJwt(idToken);

      //     $application.variables.user = decoded.email;
      //     // $application.user.username =  decoded.email;
      //     // ---- ASSIGN VARIABLE ---- //
      //     console.log("Decoded User Claims:", $application.variables.user);

      //     // ---- Store in VBCS variable ---- //
      //     // $variables.jwttoken = idToken;
      //     // $variables.loggedInUser = decoded; // contains email, name, etc.

      //   } catch (err) {
      //     console.error("Login failed:", err);

      //    await $application.functions.getUsernameFromJwt($application.variables.jwt);

      //   // const response1 = await Actions.callRest(context, {
      //   //   endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_USERS_JOB_ROLES1_0UsersJobRoles',
      //   //   uriParams: {
      //   //     'p_username': $application.variables.user,
      //   //   },
      //   // });

      //    const response1 = await Actions.callRest(context, {
      //     endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_USERS_JOB_ROLES1_0UsersJobRoles',
      //     uriParams: {
      //       'p_username': 'DNeredu@oceaneering.com',
      //     },
      //   });

      //         const navigationContent = await $application.functions.getNavigationContent(response1.body.items);
      //         $application.variables.restrictednavTree =navigationContent ;
      //   // ---- Helper function to decode JWT ---- //
      //   function parseJwt(token) {
      //     const base64Url = token.split('.')[1];
      //     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      //     return JSON.parse(window.atob(base64));
      //   }
      // }
    }
  }

  return vbEnterListener;
});
