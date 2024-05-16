function searchByStringInPerson(str, array) {
  const regex = new RegExp(str, 'i');
  if (array.length) {
    const filteredArray = array.filter((item => {
      if (regex.test(item.name) || regex.test(item.surname)
        || regex.test(item.name_companion) || regex.test(item.surname_companion)) {
        return item
      }
    }));
    return filteredArray;
  }
}

export { searchByStringInPerson };