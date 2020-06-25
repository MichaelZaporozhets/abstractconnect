function namedObjArrayToKeyVals(array) {
  return array.reduce((acc, item) => ({
    ...acc,
    [item.name]: item
  }), {});
}

async function wait(time) {
  return new Promise((resolve, reject) => setTimeout(resolve, time));
}

export {
  namedObjArrayToKeyVals,
  wait
}
