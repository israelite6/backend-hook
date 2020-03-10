export default function UpdateObject(prevData, newData) {
  if (typeof newData === "object") {
    Object.keys(newData).map(dataMapKey => {
      if (!prevData.hasOwnProperty(dataMapKey)) {
        prevData[dataMapKey] = newData[dataMapKey];
      } else {
        if (typeof newData[dataMapKey] !== "object") {
          if (newData[dataMapKey] === "emptyObject") {
            prevData = {
              ...prevData,
              [dataMapKey]: {}
            };
          } else {
            prevData = {
              ...prevData,
              [dataMapKey]: newData[dataMapKey]
            };
          }
        } else {
          if (Array.isArray(newData[dataMapKey])) {
            prevData[dataMapKey] = newData[dataMapKey];
          } else {
            if (newData[dataMapKey] === null) {
              delete prevData[dataMapKey];
            } else {
              prevData[dataMapKey] = UpdateObject(
                prevData[dataMapKey],
                newData[dataMapKey]
              );
            }
          }
        }
      }
    });
  }
  return prevData;
}
