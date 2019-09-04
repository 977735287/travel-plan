
const remove = (array, val) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == val) {
      array.splice(i, 1);
      return 1;
    }
  }
  return -1;
}

const batchRemove = (array, removeArray) => {
  let count = 0;
  removeArray.forEach(val => {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == val) {
        array.splice(i, 1);
        count++;
      }
    }
  })
  return count;
}

const contains = (array, val) => {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == val) {
      return true;
    }
  }
  return false;
}

module.exports = {
  remove: remove,
  batchRemove: batchRemove,
  contains: contains
}