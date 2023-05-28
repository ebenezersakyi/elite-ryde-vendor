export const validators = {
  checkText: (n) => {
    if (n.trim() == "") {
      return true;
    }
    return false;
  },
  checkNumberPlate: () => {
    const regex = /^[a-zA-Z]{2}-\d{1,4}-\d{2}$/;

    if (regex.test(input)) {
      return true
    } 
    return false
  },
};
