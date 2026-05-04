define([], () => {
  'use strict';

  var PageModule=function PageModule(){ };


  PageModule.prototype.exportCSV=function(data){
    var result='';
    result+='PARTY ID,PARTY NUMBER,PARTY NAME,STATUS,EMAIL ADDRESS,PRIMARY PHONE NUMBER,CONTRACT ID,CONTRACT NUMBER,MAJOR VERSION,START DATE,END DATE,STS CODE,CURRENCY CODE,DATE APPROVED,CONTRACT AMOUNT,PROJECT ID,PROJECT NUMBER,PROJECT NAME,PROJECT STATUS CODE,ORGANIZATION NAME,DESCRIPTION,CONTRACT TYPE,PROJECT TYPE,COMPLETION DATE,CLOSED DATE,TASK ID,TASK NUMBER,TASK NAME,TEAM MEMBER NUMBER,TEAM MEMBER NAME,PROJECT UNIT ID,EXPENDITURE TYPE ID,EXPENDITURE TYPE NAME';
    result+='\n';

    data.forEach(function(item) {

      result+= '"' +item['party_id']+'","'
                +item['party_number']+'","'
                +item['party_name']+'","'
                +item['status']+'","'
                +item['email_address']+'","'
                +item['primary_phone_number']+'","'
                +item['contract_id']+'","'
                +item['contract_number']+'","'
                +item['major_version']+'","'
                +item['start_date']+'","'
                +item['end_date']+'","'
                +item['sts_code']+'","'
                +item['currency_code']+'","'
                +item['date_approved']+'","'
                +item['contract_amount']+'","'
                +item['project_id']+'","'
                +item['project_number']+'","'
                +item['project_name']+'","'
                +item['project_status_code']+'","'
                +item['organization_name']+'","'
                +item['description']+'","'
                +item['contract_type']+'","'
                +item['project_type']+'","'
                +item['completion_date']+'","'
                +item['closed_date']+'","'
                +item['task_id']+'","'
                +item['task_number']+'","'
                +item['task_name']+'","'
                +item['team_member_number']+'","'
                +item['team_member_name']+'","'
                +item['project_unit_id']+'","'
                +item['expenditure_type_id']+'","'
                +item['expenditure_type_name']+'"';
                
      result = result.replace(/null/g, '');
      result += '\n';
      
    });
    var csv = 'data:text/csv;charset=utf-8,' + result;
    var excel = encodeURI(csv);
    var link = document.createElement('a');
    link.setAttribute('href', excel);
    link.setAttribute('download', 'Master.csv');
    link.click();

  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  PageModule.prototype.consoleLogFunc = function (arg1) {
    console.log("Test123",arg1);
  };
  
  return PageModule;
});
