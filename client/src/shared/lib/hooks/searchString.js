
function searchByStringInPerson(str, array) {
  console.log('filter string', str.value);
  const regex = new RegExp(str, 'i');
  const filteredArray = array.filter((item => {
    if (regex.test(item.name) || regex.test(item.surname)) {
      return item
    }
  }));
  return filteredArray;
}

export { searchByStringInPerson };