define([], () => {
  'use strict';

  class PageModule {


    filtercheckedData(mydata) {
      let data = JSON.parse(JSON.stringify(mydata)); // Deep clone to avoid mutating original
      let filtered = data.filter(item => item.inspection_value != null && item.inspection_value !== '');
      return filtered;
    }


    addInspection(myrow, data) {

      let row = JSON.parse(JSON.stringify(myrow));
      row.inspection = data;
      // console.log(row);
      return row;
    }

    addfileDetails(myrow, data, file) {

      let row = JSON.parse(JSON.stringify(myrow));
      row.file_content = data;
      row.file_type = file.type;
      row.file_name = file.name;
      return row;
    }

    groupChecklistsBySection(checklists) {
      // debugger;
      return checklists.reduce((acc, item) => {
        const { section } = item;
        if (!acc[section]) {
          acc[section] = [];
        }
        acc[section].push(item);
        return acc;
      }, {});
    }
    groupChecklistsBySection1(checklists) {
      const grouped = checklists.reduce((acc, item) => {
        const { section } = item;
        if (!acc[section]) {
          acc[section] = [];
        }
        acc[section].push(item);
        return acc;
      }, {});

      let groupeddate = Object.entries(grouped).map(([section, items]) => ({
        section,
        items
      }));

      return groupeddate;

    }


    addnotes(myrow, data) {
      // debugger;
      let row = JSON.parse(JSON.stringify(myrow));
      row.notes = data;
      return row;
    }

    convertMultipleFilesToBase64(files) {
      const fileArray = Array.from(files);

      const promises = fileArray.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      });

      return Promise.all(promises);
    }


    removeDuplicatesByEquipmentClass(array) {
      const seen = new Set();
      return array.filter(item => {
        if (seen.has(item.equipment_class)) {
          return false;
        }
        seen.add(item.equipment_class);
        return true;
      });
    }


    addUniqId(data) {
      let uniqIdResult = [];
      if (data) {
        data.forEach((item, index) => {
          item.uid = index; // Start from 0
          uniqIdResult.push(item);
        });
        return uniqIdResult;
      }
    }

    // updateItemData(item, newData) {
    //   item.data = newData;
    //   return item;
    // }

    //      formatDate(inputDate) {
    //   // Split the input date
    //   const [month, day, year] = inputDate.split('/');

    //   // Convert short year to full year
    //   const fullYear = parseInt(year) < 100 ? 2000 + parseInt(year) : parseInt(year);

    //   // Month names array
    //   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //   // Format the date
    //   const formattedDate = `${monthNames[parseInt(month) - 1]}-${day}-${fullYear}`;
    //   return formattedDate;
    // };

     fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]); // Base64 only
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }


  formatDate(isoDate) {
    const date = new Date(isoDate);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = String(date.getDate()).padStart(2, '0');
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }
}
  return PageModule;
});
