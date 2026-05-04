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

  class SearchBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const validateGroup = await $application.functions.validateGroup('searchgroup');

      if (validateGroup === 'valid') {

        if($variables.searchObj.report==='Equipment Ocean Utilization'){

          const response2 = await Actions.callRest(context, {
            endpoint: 'TimeRite_Ords_Service/getMonthUtilization',
          });

          if(response2.ok){
            const monData = await $functions.removeNullfromData(response2.body.items);            
            const response3 = await Actions.callRest(context, {
              endpoint: 'TimeRite_Ords_Service/getDayUtilization',
            });

          const monthData = await $functions.getMonthsData(monData, response3.body.items, $variables.isHoursDays);
          const monthCols = await $functions.getMonthColumns(monthData);
          $variables.dynamicCols = monthCols;
           const chartData= await $functions.getUtilChartDataPageload(monthData);
           $variables.utilsChartADP.data = chartData;    
          const treeData =await $functions.getFilterTreeDataProvider(monthData); 
          $variables.treeDP = treeData;
          $variables.isRowExist=true;
          }



         
        }
        else{
        $variables.isRowExist=false;
        await Actions.resetVariables(context, {
          variables: [
            '$page.variables.EquipmentTblADP.data',
          ],
        });

        const response = await Actions.callRest(context, {
          endpoint: 'TimeRite_Ords_Service/EqpUtilizationReport',
          uriParams: {
            'p_equipment_resource_class': $variables.searchObj.class ? $variables.searchObj.class : "",
            'p_from_date': $variables.searchObj.from_date ?$functions.date($variables.searchObj.from_date):"",
            'p_to_date': $variables.searchObj.to_date?$functions.date($variables.searchObj.to_date):"",
            'p_report_name': $variables.searchObj.report,
            'p_equipment_name': $variables.searchObj.name ? $variables.searchObj.name : "",
          },
        });


        if (response.ok) {
          if (response.body.items.length > 0) {
            const columnsheaderGenerator = await $functions.columnsheaderGenerator(JSON.stringify(response.body.items));
            const pieChartData = await $functions.pieChartData(JSON.stringify(response.body.items));
            $variables.columns = columnsheaderGenerator;
            $variables.EquipmentTblADP.data = response.body.items;
            $variables.chartArray = pieChartData;
          } else {
            await Actions.resetVariables(context, {
              variables: [
                '$page.variables.EquipmentTblADP.data',
              ],
            });
            await Actions.fireNotificationEvent(context, {
              summary: 'No Data found for selected report',
              displayMode: 'transient',
              type: 'info',
            });

          }
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Failed to fetch Report',
            displayMode: 'transient',
          });
        }
      }

      }

    }
  }

  return SearchBtnAction;
});
