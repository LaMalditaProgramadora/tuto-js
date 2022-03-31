export const getArrayWithId = (array) => {
  array.forEach((row, index) => {
    row.id = index + 1;
  });
  return array;
};
