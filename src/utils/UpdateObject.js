export default function UpdateObject(prevData, newData) {
  if (typeof newData === "object") {
    Object.keys(newData).map(dataMapKey => {
      if (!prevData.hasOwnProperty(dataMapKey)) {
        prevData[dataMapKey] = newData[dataMapKey];
      } else {
        if (typeof newData[dataMapKey] !== "object") {
          prevData = { ...prevData, [dataMapKey]: newData[dataMapKey] };
        } else {
          if (Array.isArray(newData[dataMapKey])) {
            prevData[dataMapKey] = newData[dataMapKey];
          } else {
            prevData[dataMapKey] = UpdateObject(
              prevData[dataMapKey],
              newData[dataMapKey]
            );
          }
        }
      }
    });
  }
  return prevData;
}
