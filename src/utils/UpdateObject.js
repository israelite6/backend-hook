export default function UpdateObject(prevData, newData) {
  if (typeof newData === "object") {
    Object.keys(newData).map(dataMapKey => {
      if (!prevData.hasOwnProperty(dataMapKey)) {
        if (typeof newData[dataMapKey] === "object") {
          prevData[dataMapKey] = {};
        } else {
          prevData[dataMapKey] = "";
        }
      }
      if (typeof newData[dataMapKey] != "object") {
        prevData = { ...prevData, [dataMapKey]: newData[dataMapKey] };
      } else {
        prevData[dataMapKey] = UpdateObject(
          prevData[dataMapKey],
          newData[dataMapKey]
        );
      }
    });
  }
  return prevData;
}
