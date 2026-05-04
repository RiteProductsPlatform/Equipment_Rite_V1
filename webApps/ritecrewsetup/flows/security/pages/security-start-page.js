define([], () => {
  'use strict';

  class PageModule {
    validateGroup(id) {
        var tracker = document.getElementById(id);
        if (tracker.valid === "valid") {
        }
        else if (tracker.valid.startsWith("invalid")) {
          if (tracker.valid === "invalidHidden") {
            tracker.showMessages();
          }
          tracker.focusOn("@firstInvalidShown");
        }
        return tracker.valid;
      };
      getUniqueValues(data){
        if(data){
        let uniqueRoles =[];
        let roles=[];
        data.forEach(itm => {
          if(roles.indexOf(itm.name)==-1){
            roles.push(itm.name);
            uniqueRoles.push(            
              
              {"name":itm.name,
              "roleCommonName":itm.roleCommonName,
              "roleId":itm.roleId,
              "roleName":itm.roleName
              
              }
              
              
              
              );
          }          
        });
        return uniqueRoles;
        
        }
      }
       getUniqueroleNames(data){
        if(data){
          debugger;
        let uniqueRoles =[];
        let roles=[];
        data.forEach(itm => {
          if(roles.indexOf(itm.name)==-1){
            roles.push(itm.name);
            uniqueRoles.push({
              'name':itm.name,
              'rolename':itm.roleCommonName,
              'roleDescription':itm.roleDescription,
              'roleId':itm.roleId          
              
              });
          }          
        });
        return uniqueRoles;
        
        }
      }
      savePayload(user,data,username){
        if(data){
          debugger;
          let saveObj = {
            "p_application_name": "EquipRite",
            "p_user_id": "",
            "p_user_name": user,
            "p_email_address": "",
            "p_role_id": data.roleId,
            "p_role_code": data.rolecode,
            "p_role_name": data.rolename,
            "p_enable_flag": "yes",
            "p_created_by": username
          };
          return saveObj;
        }
      }
  }
  
  return PageModule;
});
