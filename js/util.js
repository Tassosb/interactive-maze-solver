export const Util = {
  equalArrays(arr1, arr2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  },

  includesArray(outerArray, targetArray) {
    for (var i = 0; i < outerArray.length; i++) {
      if (Util.equalArrays(outerArray[i], targetArray)) {
        return true;
      }
    }

    return false;
  }
};
