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

  class templateTableFirstSelectedRowChangeChain16 extends ActionChain {

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
      const { $page, $flow, $application, $constants, $variables, $eq } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'TimeRite_Ords_Service/getEQPRite_TemplateLinesDetails',
        uriParams: {
          'p_template_id': rowData.template_id,
        },
      });


      $variables.templateEqpAdp.data = response.body.items;
    }
  }

  return templateTableFirstSelectedRowChangeChain16;
});
