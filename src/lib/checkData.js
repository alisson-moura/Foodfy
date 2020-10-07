module.exports = {
  objectIsValid(items) {
    const keys = Object.keys(items);
    for (const key of keys) {
      if (!items[key]) {
        return false;
      } else {
        return true;
      }
    }
  }
}