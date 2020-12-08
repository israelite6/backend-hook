export default function UpdateObject(prevData, newData) {
  let replace = false;
  if (!Array.isArray(newData) && typeof newData === "object") {
    if (newData.replace === true) {
      replace = true;
      console.log(replace, "========== replace is  true", newData);
      delete newData.replace;
      return newData;
    }
  }
  if (typeof newData === "object") {
    Object.keys(newData).map((dataMapKey) => {
      if (!prevData || prevData === false) {
        if (newData[dataMapKey] === "emptyObject") {
          prevData[dataMapKey] = {};
        } else {
          prevData[dataMapKey] = newData[dataMapKey];
        }
      } else if (
        !prevData.hasOwnProperty(dataMapKey) ||
        prevData.hasOwnProperty(dataMapKey) === false ||
        replace === true
      ) {
        if (newData[dataMapKey] === "emptyObject") {
          prevData[dataMapKey] = {};
        } else {
          prevData[dataMapKey] = newData[dataMapKey];
        }
      } else {
        if (typeof newData[dataMapKey] !== "object") {
          if (newData[dataMapKey] === "emptyObject") {
            prevData = {
              ...prevData,
              [dataMapKey]: {},
            };
          } else {
            prevData = {
              ...prevData,
              [dataMapKey]: newData[dataMapKey],
            };
          }
        } else {
          if (Array.isArray(newData[dataMapKey])) {
            prevData[dataMapKey] = newData[dataMapKey];
          } else {
            if (newData[dataMapKey] === null) {
              delete prevData[dataMapKey];
            } else {
              if (
                !prevData[dataMapKey] ||
                prevData[dataMapKey] === false ||
                replace === true
              ) {
                prevData[dataMapKey] = newData[dataMapKey];
              } else {
                prevData[dataMapKey] = UpdateObject(
                  prevData[dataMapKey],
                  newData[dataMapKey]
                );
              }
            }
          }
        }
      }
    });
  }
  return prevData;
}
