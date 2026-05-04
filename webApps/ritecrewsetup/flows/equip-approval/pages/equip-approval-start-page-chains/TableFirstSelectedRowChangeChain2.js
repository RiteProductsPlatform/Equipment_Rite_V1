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

  class TableFirstSelectedRowChangeChain2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object} params.previousValue
     * @param {object} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.rowKey
     * @param {any} params.rowData
     * @param {any} params.firstSelectedRow
     */
    async run(context, { event, previousValue, value, updatedFrom, rowKey, rowData, firstSelectedRow }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      debugger;

      await Actions.resetVariables(context, {
        variables: [
    '$variables.assetsTableAdp.data',
  ],
      });

      $variables.eqpRow = rowData;
      $variables.avaliable_staus = rowData.avaliable_staus;

      if (rowData.equipment_number) {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const response = await Actions.callRest(context, {
          endpoint: 'EQUIPMENT_RITE_OIC/getEQUIPMENT_RITEEQP_ASSETMAINTENANCE1_0GetAssets',
          uriParams: {
            'p_asset_number': rowData.equipment_number,
          },
        });

        if (response.ok) {
          if (response.body !== "" && response.body!== undefined && response.body!== "Unable to parse response as JSON, content type application/json : SyntaxError: Failed to execute 'json' on 'Response': Unexpected end of JSON input" ) {
            


            const loadingDialogClose2 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            if (response.body.items.length>=1) {
              

              $variables.assetsTableAdp.data = response.body.items;
            }else{
              
              const loadingDialogClose = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'close',
              });

              await Actions.fireNotificationEvent(context, {
                summary: 'No child Assets available for selected Parent Equipment',
                displayMode: 'transient',
                type: 'info',
              });
            }
          }else{
            const loadingDialogClose4 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'No child Assets available for selected Parent Equipment',
              type: 'info',
              displayMode: 'transient',
            });
            
          }
        }else{
          const loadingDialogClose3 = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });

          await Actions.fireNotificationEvent(context, {
            summary: 'Failed To Fetch Asset Details',
            type: 'error',
            displayMode: 'transient',
          });
          
        }
      }
    }
  }

  return TableFirstSelectedRowChangeChain2;
});
