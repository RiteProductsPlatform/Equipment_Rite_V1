define([], () => {
  'use strict';

  class PageModule {
    getDateFormate(data){
        return data.split('T')[0];
      }
    processFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const fileContent = e.target.result;
          const fileName = file.name;
          const fileType = file.type;

          resolve({
            fileName: fileName,
            fileType: fileType,
            fileContent: fileContent
          });
        };

        reader.onerror = function (error) {
          console.log('isnode error');
          reject(error);
        };
      });
    }
  }
  
  return PageModule;
});
