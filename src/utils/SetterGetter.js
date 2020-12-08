let Variables = { collect: {}, config: {}, db: {}, dbConfig: {} };

export function Store(key) {
  const clear = () => {
    Object.keys(Variables.db).map((key) => {
      Variables.db[key] = [];
    });
  };
  const set = (value) => {
    Variables[key] = value;
    return Store(key);
  };

  const get = () => {
    return Variables[key];
  };

  const init = (options) => {
    Variables.dbConfig[key] = options || {};
    Variables.db[key] = [];
    return Store(key);
  };

  const checkInit = () => {
    if (!key) {
      throw `please specify does not exist`;
    }
    if (!Variables.db[key]) {
      throw `please initialize ${key} before usage`;
    }
  };

  const insert = (data) => {
    checkInit();

    const run = (dat) => {
      if (Variables.dbConfig[key].unique) {
        let duplicate = Variables.db[key].filter(
          (ds) =>
            String(ds[Variables.dbConfig[key].unique]).toLowerCase() ===
            String(dat[Variables.dbConfig[key].unique]).toLowerCase()
        );

        if (duplicate.length === 0) {
          Variables.db[key].push(dat);
          return true;
        }
        return false;
      } else {
        Variables.db[key].push(dat);
        return true;
      }
    };
    if (Array.isArray(data)) {
      data.map((dat) => {
        run(dat);
      });
    } else {
      run(data);
    }

    return Store(key);
  };

  const upsert = (data) => {
    checkInit();

    const run = (dat) => {
      if (Variables.dbConfig[key].upsert) {
        let duplicate = Variables.db[key].filter((ds) => {
          let status = true;
          Variables.dbConfig[key].upsert.map((column) => {
            if (
              String(ds[column]).toLowerCase() !==
              String(dat[column]).toLowerCase()
            ) {
              status = false;
            }
          });
          return status;
        });

        if (duplicate.length === 0) {
          Variables.db[key].push(dat);
          return false;
        } else {
          Variables.db[key][Variables.db[key].indexOf(duplicate[0])] = {
            ...Variables.db[key][Variables.db[key].indexOf(duplicate[0])],
            ...dat,
          };
          return true;
        }
      } else {
        Variables.db[key].push(dat);
        return false;
      }
    };

    if (Array.isArray(data)) {
      data.map((dat) => {
        run(dat);
      });
    } else if (typeof data === "object") {
      run(data);
    }
    return Store(key);
  };

  const filter = (condition) => {
    return Variables.db[key].filter((ds) => {
      let status = true;
      Object.keys(condition).map((column) => {
        if (
          String(ds[column]).toLowerCase() !==
          String(condition[column]).toLowerCase()
        ) {
          status = false;
        }
      });
      return status;
    });
  };

  const update = (condition, data) => {
    checkInit();

    let filted = filter(condition);
    if (filted.length > 0) {
      filted.map((duplicate) => {
        Variables.db[key][Variables.db[key].indexOf(duplicate)] = {
          ...Variables.db[key][Variables.db[key].indexOf(duplicate)],
          ...data,
        };
      });
    }
    return Store(key);
  };

  const remove = (condition) => {
    checkInit();

    const run = (condi) => {
      let filted = filter(condi);
      if (filted.length > 0) {
        filted.map((duplicate) => {
          Variables.db[key].splice(Variables.db[key].indexOf(duplicate), 1);
        });
        return true;
      }
    };

    if (Array.isArray(condition)) {
      condition.map((condi) => {
        run(condi);
      });
    } else {
      run(condition);
    }
    return Store(key);
  };
  const removeAll = () => {
    Variables.db[key] = [];
    return Store(key);
  };
  const select = (condition) => {
    if (condition) {
      return filter(condition);
    } else {
      return Variables.db[key];
    }
  };

  return {
    set,
    get,
    init,
    insert,
    upsert,
    update,
    remove,
    select,
    removeAll,
    clear,
  };
}

export function Sort(data, key) {
  return data.sort(function (a, b) {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
}
export function SortDesc(data, key) {
  return data.sort(function (a, b) {
    if (a[key] > b[key]) return -1;
    if (a[key] < b[key]) return 1;
    return 0;
  });
}
