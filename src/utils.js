function namedObjArrayToKeyVals(array) {
  return array.reduce((acc, item) => ({
    ...acc,
    [item.name]: item
  }), {});
}

export {
  namedObjArrayToKeyVals
}
