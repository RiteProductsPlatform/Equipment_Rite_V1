define(["knockout",
  "ojs/ojknockout-keyset",
  "ojs/ojarraytreedataprovider", 'oj-sp/spectra-shell/config/config'], function (ko, keySet, ArrayTreeDataProvider) {
    'use strict';

    let navigationMenu = [

      {
        id: "ConfigurationFlow",
        label: "Administration",
        icon: "",
        node: "parent",
        items: [
          {
            id: "dashboard",
            label: "Dashboard",
            icon: ""

          },


          {
            id: "equipmentsettings",
            label: "Configuration Settings",
            icon: ""

          },
          {
            id: "rate-schedule",
            label: "Rate Management",
            icon: ""

          }
        ],
      },
      {
        id: "ProjectManager",
        label: "Project Manager",
        icon: "library",
        node: "parent",
        items: [
          // {
          //   id: "equipment-requisition",
          //   label: "Create Request",
          //   icon: "",
          // },
          {
            id: "equipment-multilevel-requisition",
            label: "Create Request Cart",
            icon: "",
          },
          {
            id: "equipment-reservations",
            label: "Equipment Requests",
            icon: "",
          },
          {
            id: "request-approval",
            label: "Approve Requests",
            icon: "",
          },

          {
            id: "project-expense",
            label: "Project Expense Transactions",
            icon: "",
          },
          {
            id: "project-inventory",
            label: "Project Inventory Transactions",
            icon: "",
          }
        ],
      },

      {
        id: "TransactionFlow",
        label: "Equipment Manager",
        icon: "library",
        node: "parent",
        items: [
          {
            id: "crew-schedule",
            label: "Equipment Schedule",
            icon: "",
          },
          {
            id: "crew_admin",
            label: "Equipment Master",
            icon: ""

          },
          {
            id: "equip-approval",
            label: "Project Request Workbench",
            icon: "",
          },


          {
            id: "customer-workbench",
            label: "Customer Request Workbench",
            icon: "",
          },
          {
            id: "customer-billing-workbench",
            label: "Customer Billing Workbench",
            icon: "",
          }
          // ,
          // {
          //   id: "material-request",
          //   label: "Material Request",
          //   icon: "",
          // }
        ],
      },
      {
        id: "Inspection",
        label: "Inspection and Shipout",
        icon: "library",
        node: "parent",
        items: [
          {
            id: "equip-inspection",
            label: "Equipment inspection and Shipout",
            icon: "",
          },

        ],
      },
      {
        id: "TimeEntry",
        label: "Time Entry",
        icon: "",
        node: "parent",
        items: [
          {
            id: "crew-time-entry",
            label: "Equipment Timesheet",
            icon: "",
          },
          {
            id: "equipment-approver-screen",
            label: "Timesheet Approvals",
            icon: "",
          },
        


          {
            id: "adhoctimesheet",
            //label: "Manual Equipment Timesheet",
            label: "Adhoc Timesheet Entry",
            icon: "",
          }
        ],
      },
      {
        id: "rentalRequest",
        label: "Customer",
        icon: "book",
        node: "parent",
        items: [
          {
            id: "equipment-rental",
            label: "Rental Request",
            icon: "",
          },
          {
            id: "customer-request",
            label: "Customer Request",
            icon: "",
          },
        ]
      },
      // {
      //   id: "Material Request",
      //   label: "Material Management",
      //   icon: "book",
      //   node: "parent",
      //   items: [
      //     {
      //       id: "material-request-details",
      //       label: "Material Details",
      //       icon: "",
      //     }

      //   ],
      // },
       {
        id: "Rental Agreements",
        label: "Rental Agreements",
        icon: "book",
        node: "parent",
        items: [
          {
            id: "create-rental-agreement",
            label: "Create Rental Agreement",
            icon: "",
          },
           {
            id: "create-rental-agreement-approval",
            label: "Rental Agreement Approval",
            icon: "",
          }

        ],
      },
      {
        id: "Analytics",
        label: "Analytics",
        icon: "book",
        node: "parent",
        items: [
          {
            id: "analytics",
            label: "Equipment Analytics",
            icon: "",
          }

        ],
      },
      // {
      //   id: "Security",
      //   label: "Security",
      //   icon: "book",
      //   node: "parent",
      //   items: [
      //     {
      //       id: "security",
      //       label: "Security",
      //       icon: "",
      //     }

      //   ],
      // },
    ];

    class AppModule {


      getSysDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
//
      getFormattedDate() {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, "0");
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const month = monthNames[now.getMonth()];
        const year = now.getFullYear();
        return `${day}-${month}-${year}`;
      }

      constructor() {
        this.metadata = {
          navigationMenu: navigationMenu,
        };
        this.navlistExpanded = new keySet.ObservableKeySet();
      }

      getUtilization(hrs) {
        const fullDayHours = 24;

        if (hrs === null || hrs === "" || hrs === undefined) return 0;

        const parsedHrs = Number(hrs);
        if (isNaN(parsedHrs) || parsedHrs < 0) return 0;

        const utilization = parsedHrs / fullDayHours;
        return utilization; // returns 1 for 100%
      }

      getUsernameFromJwt(token) {
        try {
          if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
              ).join('')
            );
            const payload = JSON.parse(jsonPayload);
            return payload.sub || null;

          }

        } catch (e) {
          console.error("Invalid JWT token", e);
          return null;
        }
      }

      populateDateRangeJS() {
        let currentDate = new Date();

        function getMonthAbbreviation(month) {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return months[month];
        }

        // Set start date to 6 months ago
        let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, 1);
        let dayOfWeek = startDate.getDay();
        let diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        startDate.setDate(diff);

        // Set end date to 6 months from now
        let endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 6, 1);
        endDate.setDate(endDate.getDate() - 1);

        let valueList = [];
        let currentWeekStart = new Date(startDate);

        while (currentWeekStart <= endDate) {
          let currentWeekEnd = new Date(currentWeekStart);
          currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
          let weekRange = `${currentWeekStart.getDate()}-${getMonthAbbreviation(currentWeekStart.getMonth())}-${currentWeekStart.getFullYear()} to ${currentWeekEnd.getDate()}-${getMonthAbbreviation(currentWeekEnd.getMonth())}-${currentWeekEnd.getFullYear()}`;
          valueList.push(weekRange);
          currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        }

        let currentWeekRange;
        let today = currentDate.getDate();
        let currentMonth = getMonthAbbreviation(currentDate.getMonth());
        let currentYear = currentDate.getFullYear();

        for (let i = 0; i < valueList.length; i++) {
          let range = valueList[i];
          let rangeStart = parseInt(range.split('-')[0]);
          let rangeEnd = parseInt(range.split(' to ')[1].split('-')[0]);
          let rangeMonth = range.split('-')[1];
          let rangeYear = parseInt(range.split('-')[2]);

          if (currentMonth === rangeMonth && currentYear === rangeYear) {
            if (today >= rangeStart && today <= rangeEnd) {
              currentWeekRange = range;
              break;
            }
          }
        }

        let finalArray = [];
        for (let i = 0; i < valueList.length; i++) {
          finalArray.push({
            "range": valueList[i]
          });
        }

        let myvaldate = finalArray.reverse();
        return { "dateRange": finalArray.reverse(), "week": currentWeekRange };
      }


      getMetadata(settingsEnabled, rental, approver, timeentry, eqpmanager, projectmanager, analytics) {
        const updatedMetadata = JSON.parse(JSON.stringify(this.metadata));
        if (!settingsEnabled) {
          const configFlow = updatedMetadata.navigationMenu.find(
            (menu) => menu.id === "ConfigurationFlow"
          );
          if (configFlow && Array.isArray(configFlow.items)) {
            configFlow.items = configFlow.items.filter(
              (item) => item.id !== "equipmentsettings"
            );
          }
        }
        if (!approver) {
          const approverFlow = updatedMetadata.navigationMenu.find(
            (menu) => menu.id === "TransactionFlow"
          );
          if (approverFlow && Array.isArray(approverFlow.items)) {
            approverFlow.items = approverFlow.items.filter(
              (item) => item.id !== "equipment-approver-screen"
            );
          }
        }
        if (!rental) {
          updatedMetadata.navigationMenu = updatedMetadata.navigationMenu.filter(
            (menu) => menu.id !== "rentalRequest"
          );

          updatedMetadata.navigationMenu = updatedMetadata.navigationMenu.map((menu) => {
            if (menu.id === "TransactionFlow") {
              return {
                ...menu,
                items: menu.items.filter(
                  (item) =>
                    item.id !== "customer-workbench" &&
                    item.id !== "customer-billing-workbench"
                ),
              };
            }
            return menu;
          });
        }
        if (!timeentry) {
          updatedMetadata.navigationMenu = updatedMetadata.navigationMenu.filter(
            (menu) => menu.id !== "TimeEntry"
          );
        }
        if (!eqpmanager) {
          updatedMetadata.navigationMenu = updatedMetadata.navigationMenu.filter(
            (menu) => menu.id !== "TransactionFlow"
          );
        }
        if (!projectmanager) {
          updatedMetadata.navigationMenu = updatedMetadata.navigationMenu.filter(
            (menu) => menu.id !== "ProjectManager"
          );
        }
        if (!analytics) {
          updatedMetadata.navigationMenu = updatedMetadata.navigationMenu.filter(
            (menu) => menu.id !== "Analytics"
          );
        }


        return updatedMetadata;
      }


      //old Code 07/09/2025 Commented
      // getNavigationContent(metadata) {
      //   if (this.navigationContent === undefined) {
      //     this.navigationContent = ko.observable(
      //       new ArrayTreeDataProvider(
      //         this._getNavigationData(metadata.navigationMenu),
      //         {
      //           keyAttributes: "attr.id",
      //         }
      //       )
      //     );
      //   }
      //   return this.navigationContent;
      // }


      //new code  07/09/2025
      getNavigationContent(rolesData) {
        if (rolesData) {
          if (this.navigationContent === undefined) {
            const filtered = this._filterNavigationByRoles(rolesData);
            const transformed = this._getNavigationData(filtered);
            this.navigationContent = ko.observable(
              new ArrayTreeDataProvider(transformed, {
                keyAttributes: "attr.id"
              })
            );
          }
          return this.navigationContent;
        }
      }

      //old Code 07/09/2025 Commented
      // _getNavigationData(menu) {
      //   let navData = [],
      //     self = this;

      //   for (let i = 0; i < menu.length; i++) {
      //     let menuItem = {};
      //     let origMenuItem = menu[i];
      //     if (typeof origMenuItem === "object") {
      //       menuItem.attr = {
      //         id: origMenuItem.id,
      //         name: origMenuItem.label,
      //         icon: origMenuItem.icon,
      //         badge: origMenuItem.badge,
      //         node: origMenuItem.node,
      //       };
      //     }
      //     if (origMenuItem.items && origMenuItem.items.length > 0)
      //       menuItem.children = this._getNavigationData(origMenuItem.items);
      //     navData.push(menuItem);
      //   }
      //   return navData;
      // }

      //new code  07/09/2025
      _getNavigationData(menu) {
        const navData = [];

        for (let item of menu) {
          const menuItem = {
            attr: {
              id: item.id,
              name: item.label,
              icon: item.icon,
              badge: item.badge,
              node: item.node
            }
          };
          if (item.items && item.items.length > 0) {
            menuItem.children = this._getNavigationData(item.items);
          }
          navData.push(menuItem);
        }

        return navData;
      }

      itemSelectable(context) {
        return context.leaf;
      }


      // New Js Function For Restricting The Pages or Menus By Roles  07/09/2025
      _filterNavigationByRoles(rolesData) {
        if (rolesData) {
          const roleNames = rolesData.map(role => role.role_name.toLowerCase());
          const filteredMap = new Map();

          //if (roleNames.includes("oii equipment administrator jr")) {
          if (roleNames.includes("equipment administrator")) {
            return this.metadata.navigationMenu;
          }

          for (let parent of this.metadata.navigationMenu) {
            const parentLabel = parent.label.toLowerCase();
            let matchedItems = [];
            //
            // Handle Time Entry-related items
            if (parent.label === "Time Entry") {
              if (roleNames.some(r => r.includes("time entry approver"))) {
                matchedItems.push(
                  ...parent.items.filter(item => item.label === "Timesheet Approver")
                );
              }
              if (roleNames.some(r => r.includes("timekeeper"))) {
                matchedItems.push(
                  ...parent.items.filter(item => item.label === "Equipment Timesheet")
                );
              }
            }

            // Show Project Manager menu if user is Equipment Requestor
            if (parent.label === "Project Manager" && roleNames.includes("equipment requestor")) {
              matchedItems.push(...parent.items);
            }

            // Show Equipment  Manager menu if user is Equipment Requestor
            if (parent.label === "Equipment Manager" && roleNames.includes("equipment manager")) {
              matchedItems.push(...parent.items);
            }

            // Show Inspection menu if user has Equipment Inspection role
            if (parent.label === "Inspection and Shipout" && roleNames.includes("equipment inspection")) {
              matchedItems.push(...parent.items);
            }

            // Match full parent label
            if (roleNames.includes(parentLabel)) {
              matchedItems.push(...parent.items);
            }

            // Merge items under the same parent
            if (matchedItems.length > 0) {
              if (filteredMap.has(parent.id)) {
                const existing = filteredMap.get(parent.id);
                const combinedItems = [...existing.items, ...matchedItems];
                const uniqueItems = Array.from(
                  new Map(combinedItems.map(item => [item.id, item])).values()
                );
                filteredMap.set(parent.id, { ...parent, items: uniqueItems });
              } else {
                filteredMap.set(parent.id, { ...parent, items: matchedItems });
              }
            }
          }

          return Array.from(filteredMap.values());
        }
      }


      getSysDate() {
        const currentDate = new Date();
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        return {
          sysdate: currentDate.toISOString(),
          endsysdate: endOfMonth.toISOString()
        };
      }


      getDateDifference(startDate, endDate, cost) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInTime = end - start;
        // const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
        const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Round down
        return differenceInDays * (cost ? cost : 1);
      }

      formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = String(date.getDate()).padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }

      //     getUtilization(hrs) {
      //   const fullDayHours = 24;

      //   if (hrs === null || hrs === "" || hrs === undefined) return 0;

      //   const parsedHrs = Number(hrs);
      //   if (isNaN(parsedHrs) || parsedHrs < 0) return 0;

      //   const utilization = parsedHrs / fullDayHours;
      //   return utilization; // returns 1 for 100%
      // }

      getDateRange(startDay, endDay) {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const currentDate = new Date();
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

        const startDayIndex = dayNames.indexOf(startDay);
        const endDayIndex = dayNames.indexOf(endDay);

        const dateRange = [];

        while (startDate <= endDate) {
          const startDateOfWeek = new Date(startDate);
          const endDateOfWeek = new Date(startDate);

          while (startDateOfWeek.getDay() !== startDayIndex) {
            startDateOfWeek.setDate(startDateOfWeek.getDate() + 1);
          }

          endDateOfWeek.setDate(startDateOfWeek.getDate() + (endDayIndex - startDayIndex));

          // If end date is before start date, adjust it to next week
          if (endDateOfWeek < startDateOfWeek) {
            endDateOfWeek.setDate(endDateOfWeek.getDate() + 7);
          }

          const rangeString = `${startDateOfWeek.getDate()}-${startDateOfWeek.toLocaleString('default', { month: 'short' })}-${startDateOfWeek.getFullYear()} to ${endDateOfWeek.getDate()}-${endDateOfWeek.toLocaleString('default', { month: 'short' })}-${endDateOfWeek.getFullYear()}`;

          dateRange.push({ range: rangeString });

          startDate.setDate(startDate.getDate() + 7);
        }

        return dateRange;
      }

      validateText() {
        return [
          {
            validate: (mytime) => {
              let enteredTime = mytime;
              if (enteredTime === null || String(enteredTime) === "") {
                throw new Error("This is a mandatory field.");
              }
              let validValue = true;
              let pattern = /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/;
              let matchArray1 = enteredTime.match(pattern);

              if (matchArray1 === null) {
                enteredTime = "";
                validValue = false;
                throw new Error("Enter time in (HH:MM) format.");
              }
              let matchArray = enteredTime.split(":");
              let hour = matchArray[0];
              let minute = matchArray[1];

              if (hour < 0 || hour > 24 || hour.toString().length !== 2) {
                enteredTime = "";
                validValue = false;
                throw new Error("Hours should be  between 01 and 24.");
              }
              if (minute < 0 || minute > 59 || minute.toString().length !== 2) {
                enteredTime = "";
                validValue = false;
                throw new Error("Minutes should be  between 00 and 59.");
              }
            },
            getHint: () => "Enter time in HH:mm (24 hours) format only"
          }
        ];
      }

      timeValidator(timeObj) {
        const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        let isValid = true;
        let msg;
        days.forEach(day => {
          const inTime = timeObj[`${day}_in_time`];
          const outTime = timeObj[`${day}_out_time`];
          if (new Date(`1970-01-01T${inTime}`) > new Date(`1970-01-01T${outTime}`)) {
            msg = `Invalid time for ${day}: IN Time is greater than OUT Time`;
            isValid = false;
          }
        });
        return {
          "msg": msg,
          "isValid": isValid
        }
      }

      DownloadFile(data, mimeType, filename) {
        // Decode Base64 string to binary data
        const byteCharacters = atob(data); // Decode the Base64 string to characters
        const byteArrays = [];

        // Convert the characters into a byte array
        for (let offset = 0; offset < byteCharacters.length; offset++) {
          const byteArray = byteCharacters.charCodeAt(offset);
          byteArrays.push(byteArray);
        }

        // Create a Blob from the binary data
        const blob = new Blob([new Uint8Array(byteArrays)], {
          type: mimeType
        });

        // IE/Edge support
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }

        // Create an anchor tag to trigger the download
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename; // Set the filename for download
        link.click(); // Trigger the click event to start the download

        // Firefox: delay revoking the ObjectURL to avoid errors
        setTimeout(function () {
          URL.revokeObjectURL(link.href); // Revoke the ObjectURL created for the blob
        }, 100);
      }

      csvdownload(mydata, filename) {
        let data = JSON.parse(mydata);
        var keys = Object.keys(data[0]);
        var result = '';
        result += keys.join(',');
        result += '\n';
        data.forEach(function (item) {
          keys.forEach(function (key) {
            result += item[key] + ',';
          });
          result += '\n';
        });
        var csv = 'data:text/csv;charset=utf-8,' + result;
        var excel = encodeURI(csv);
        var link = document.createElement('a');
        link.setAttribute('href', excel);
        link.setAttribute('download', filename);
        link.click();
      }

      processFile(fileSet) {
        var reader = new FileReader();
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();
          const XLSX = require('xlsx');
          reader.onloadend = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, { type: 'binary' });
            var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
            var jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
            resolve(jsonArr);
          };
          reader.readAsBinaryString(fileSet[0]);
        });
      };

      populateData(jsonArr) {
        var data = jsonArr;
        var objData = [];
        for (var i = 1; i < data.length; i++) {
          objData[i - 1] = {};
          for (var k = 0; k < data[0].length && k < data[i].length; k++) {
            var key = data[0][k];
            objData[i - 1][key] = data[i][k];
          }
        }
        var Json = objData;
        return Json;
      };

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

      getUniqueDayNamesBetweenDates(startDate, myendDate) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let currentDate = new Date(startDate);
        let endDate = new Date(myendDate);
        const result = {};
        while (currentDate <= endDate) {
          const dayName = daysOfWeek[currentDate.getDay()];
          result[dayName] = true;
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return result;
      }
      pageRefresh() {
        window.location.reload();
      }


    }

    return AppModule;
  });
