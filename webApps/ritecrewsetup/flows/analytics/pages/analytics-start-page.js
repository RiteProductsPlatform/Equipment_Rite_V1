define(["ojs/ojarraytreedataprovider", "flatter"], (ArrayTreeDataProvider, FlattenedTreeDataProviderView) => {
  'use strict';

  let monthData=[];
  class PageModule {

    formatDate(inputDate) {
      const date = new Date(inputDate);
      const options = { year: 'numeric', month: 'short', day: '2-digit' };
      const formattedDate = date.toLocaleDateString('en-US', options);
      return formattedDate;
    }


    date(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = date.toLocaleString('en-US', { month: 'short' });
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }


  columnsheaderGenerator(myrestdata) {
  let restdata = JSON.parse(myrestdata);

  function formatHeaderText(field) {
    return field
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  if (Array.isArray(restdata)) {
    if (restdata.length > 0 && typeof restdata[0] === 'object') {
      const headers = Object.keys(restdata[0]);

      const validColumns = headers.filter(field => {
        // ✅ Always include date fields
        if (field === "effective_start_date" || field === "effective_end_date") {
          return true;
        }

        // ✅ Normal fields: include if ANY value is present
        return restdata.some(item => item[field] !== null && item[field] !== "") &&
          field !== 'report_name' &&
          field !== 'equipment_id';
      });

      const columns = validColumns.map(field => {
        const column = {
          headerText: formatHeaderText(field),
          field: field
        };

        // ✅ Add template for date fields (even if null)
        if (field === "effective_start_date" || field === "effective_end_date") {
          column.template = "date";
        }

        return column;
      });

      return columns;
    } else {
      throw new Error("Array elements are not objects.");
    }
  } 
  else if (typeof restdata === 'object') {
    const headers = Object.keys(restdata);

    const validColumns = headers.filter(field => {
      if (field === "effective_start_date" || field === "effective_end_date") {
        return true;
      }

      return restdata[field] !== null && restdata[field] !== "" &&
        field !== 'report_name' &&
        field !== 'equipment_id';
    });

    const columns = validColumns.map(field => ({
      headerText: formatHeaderText(field),
      field: field,
      ...(field === "effective_start_date" || field === "effective_end_date"
        ? { template: "date" }
        : {})
    }));

    return columns;
  } 
  else {
    throw new Error("Expected data to be an object or array of objects.");
  }
}



    csvdownload(mydata, filename) {
      let data = JSON.parse(mydata)

      let keys = Object.keys(data[0]);


      let headers = keys.map(function (key) {

        return key.replace(/_/g, ' ').replace(/\b\w/g, function (char) {
          return char.toUpperCase();
        });
      });
      let result = '';
      result += headers.join(',');
      result += '\n';
      data.forEach(function (item) {
        keys.forEach(function (key) {
          result += item[key] + ',';
        });
        result += '\n';
      });
      let csv = 'data:text/csv;charset=utf-8,' + result;
      let excel = encodeURI(csv);
      let link = document.createElement('a');
      link.setAttribute('href', excel);
      link.setAttribute('download', filename + '.csv');
      link.click();
    }
  getUtilChartData(item) {
      if(item){
      const result = [];
      let idx = 0;
      Object.keys(item).forEach(key => {
        if (key.endsWith("Utilized %")) {
          const seriesName = key.replace("Utilized %", "");
          result.push({
            id: idx++,
            series: seriesName,
            group: item.Component,
            value: Number(item[key].replace("%", ""))
          });
        }
      });
      return result;
      }
    };


    getUtilChartDataPageload(data) {
      if(data){
        debugger;
      const result = [];
      let idx = 0;
      data.forEach(item => {
        Object.keys(item).forEach(key => {
          if (key.endsWith("Utilized %")) {
            result.push({
              id: idx++,
              series: key.replace("Utilized %", ""),
              group: item.Component,
              value: Number(item[key].replace("%", ""))
            });
          }
        });
      });
      return result;
      }
    };



    pieChartData(mydata) {
      let equipmentArray = JSON.parse(mydata);
      let equipmentCount = {};

      equipmentArray.forEach(item => {
        const equipmentClass = item.equipment_class;
        const equipmentName = item.equipment_name;


        const key = equipmentClass || equipmentName;


        if (equipmentCount[key]) {
          equipmentCount[key]++;
        } else {
          equipmentCount[key] = 1;
        }
      });
      let items = [];
      let newID = 1;
      for (let key in equipmentCount) {
        items.push({
          id: newID++,
          group: 'Equipment',
          series: key,
          value: equipmentCount[key]
        });
      }

      return items;
    }
   

//   getMonthsData(data, childdata) {
//   if (!data) return [];

//   let monthsData = [];
//   let idCounter = 1;

//   const formatDate = (isoDate) => {
//     const d = new Date(isoDate);
//     return d.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric'
//     }); // Jan 1
//   };

//   data.forEach(item => {

//     const obj = {
//       Component: item.month_label,
//       id: idCounter++,
//       children: []
//     };

//     if (item.business_unit) {
//       const safeKey = item.business_unit.replace(/\s+/g, '_');

//       obj[`${safeKey}_Total`] = String(item.total_equipment);
//       obj[`${safeKey}_Units`] = item.util_percent + '%';
//     }

//     // Attach children rows
//     if (childdata && childdata.length) {
//       obj.children = childdata
//         .filter(c => c.month_label === item.month_label)
//         .map(c => {
//           const safeBU = c.business_unit.replace(/\s+/g, '_');

//           const childObj = {
//             id: idCounter++,
//             Component: formatDate(c.day_date)
//           };

//           childObj[`${safeBU}_Total`] = String(c.total_equipment);
//           childObj[`${safeBU}_Units`] = c.util_percent + '%';

//           return childObj;
//         });
//     }

//     monthsData.push(obj);
//   });

//   return monthsData;
// };
removeNullfromData(data){
  if(data){
    let monData=[];
    data.forEach((itm)=>{
      if(itm.business_unit){
        monData.push(itm)
      }
    });
    return monData;
  }
};

getMonthsData(data, childdata, flag = 'day') {
  if (!data) return [];

  let monthsData = [];
  let idCounter = 1;

  const normalizeMonth = m =>
    m ? m.replace(/[\s-]/g, '').toUpperCase() : '';

  const formatDate = isoDate => {
    const d = new Date(isoDate);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const utilField =
    flag === 'hour'
      ? 'hour_util_percent'
      : 'day_util_percent';

  const percent = v => (v == null ? 0 : v) + '%';
  const numberVal = v => (v == null ? '0' : String(v));

  data.forEach(item => {

    const obj = {
      Component: item.month_label,
      id: idCounter++,
      children: []
    };

    const bu = item.business_unit;

    const equipCol = `${bu} Equipment Count`;
    const hoursCol = `${bu} Utilized Hours`;
    const utilCol = `${bu} Utilized %`;

    // ---- Parent row ----
    obj[equipCol] =
      numberVal(item.total_equipment);

    obj[hoursCol] =
      numberVal(item.month_used_hours);

    obj[utilCol] =
      percent(item[utilField]);

    const parentMonth =
      normalizeMonth(item.month_label);

    const dayMap = {};

    if (childdata && childdata.length) {
      childdata.forEach(c => {

        if (
          normalizeMonth(c.month_label) !== parentMonth ||
          c.business_unit !== item.business_unit
        ) return;

        const dayLabel =
          formatDate(c.day_date);

        if (!dayMap[dayLabel]) {
          dayMap[dayLabel] = {
            id: idCounter++,
            Component: dayLabel
          };
        }

        // Child rows order
        dayMap[dayLabel][equipCol] =
          numberVal(c.total_equipment);

        dayMap[dayLabel][hoursCol] =
          numberVal(c.total_used_hours);

        dayMap[dayLabel][utilCol] =
          percent(c[utilField]);
      });

      obj.children = Object.values(dayMap);
    }

    monthsData.push(obj);
  });

  return monthsData;
};









  getMonthColumns(data) {
    debugger;
  if (!data || !data.length) return [];

  const columnSet = new Set();

  data.forEach(row => {
    Object.keys(row).forEach(key => {
      if (key !== 'children' && key !== 'id') {
        columnSet.add(key);
      }
    });
  });

  const columns = Array.from(columnSet);

  return columns.map((col, index) => ({
    headerText: col.replaceAll('_', ' '),
    field: col,
    template: index === 0 ? 'treeCellTemplate' : 'cellTemplate'
  }));
};





    getFilterTreeDataProvider(data) {
      if (data) {
        let arrayTreeDataProvider = new ArrayTreeDataProvider(data, {
          keyAttributes: "id"
        });
        return new FlattenedTreeDataProviderView(arrayTreeDataProvider);
      }
    }

 getData() {
    const emp = [
      {
        "component": "DEC 24",
        "OIIABOT": 846,
        "OIIABOU": "45.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "45.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "45.51%",
        "OIICANT": 846,
        "OIICABU": "45.51%",
        "id": 100,
        "children": [
          {
            "component": "DEC 1",
            "OIIABOT": 846,
            "OIIABOU": "45.51%",
            "OIIAUHT": 846,
            "OIIAUHU": "45.51%",
            "OIIBAKT": 846,
            "OIIBAKU": "45.51%",
            "OIICANT": 846,
            "OIICABU": "45.51%",
            "id": 555
          },
          {
            "component": "DEC 2",
            "OIIABOT": 846,
            "OIIABOU": "45.51%",
            "OIIAUHT": 846,
            "OIIAUHU": "45.51%",
            "OIIBAKT": 846,
            "OIIBAKU": "45.51%",
            "OIICANT": 846,
            "OIICABU": "45.51%",
            "id": 556
          },
          {
            "component": "DEC 3",
            "OIIABOT": 846,
            "OIIABOU": "45.51%",
            "OIIAUHT": 846,
            "OIIAUHU": "45.51%",
            "OIIBAKT": 846,
            "OIIBAKU": "45.51%",
            "OIICANT": 846,
            "OIICABU": "45.51%",
            "id": 557
          },
          {
            "component": "DEC 4",
            "OIIABOT": 846,
            "OIIABOU": "45.51%",
            "OIIAUHT": 846,
            "OIIAUHU": "45.51%",
            "OIIBAKT": 846,
            "OIIBAKU": "45.51%",
            "OIICANT": 846,
            "OIICABU": "45.51%",
            "id": 558
          },
          {
            "component": "DEC 5",
            "OIIABOT": 846,
            "OIIABOU": "45.51%",
            "OIIAUHT": 846,
            "OIIAUHU": "45.51%",
            "OIIBAKT": 846,
            "OIIBAKU": "45.51%",
            "OIICANT": 846,
            "OIICABU": "45.51%",
            "id": 559
          }

        ]
      },
      {
        "component": "JAN 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 101,        
        "children": [

        ]
      },
      {
        "component": "FEB 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 102,       
        "children": [

        ]
      },
      {
        "component": "MAR 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 103,
        "children": [

        ]
      },
      {
        "component": "APR 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 104,
        "children": [

        ]
      },
      {
        "component": "MAY 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 105,
        "children": [

        ]
      },
      {
        "component": "JUN 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 105,
        "children": [

        ]
      },
      {
        "component": "JUL 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 106,
        "children": [

        ]
      },
      {
        "component": "AUG 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 107,
        "children": [

        ]
      },
      {
        "component": "SEP 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 108,
        "children": [

        ]
      },
      {
        "component": "OCT 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 109,
        "children": [

        ]
      },
      {
        "component": "NOV 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 110,
        "children": [

        ]
      },
      {
        "component": "DEC 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 111,
        "children": [

        ]
      },
      {
        "component": "JAN 25",
        "OIIABOT": 846,
        "OIIABOU": "3.51%",
        "OIIAUHT": 846,
        "OIIAUHU": "48.51%",
        "OIIBAKT": 846,
        "OIIBAKU": "33.51%",
        "OIICANT": 846,
        "OIICABU": "31.51%",
        "id": 112,
        "children": [

        ]
      }





    ];
    // let tree = this.convertArrayIntoTree(emp);
    let arrayTreeDataProvider = new ArrayTreeDataProvider(emp, {
      keyAttributes: "id"
    });
    return new FlattenedTreeDataProviderView(arrayTreeDataProvider);


  };





  }

  return PageModule;
});
