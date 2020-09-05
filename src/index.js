/**
 * @class ExampleComponent
 */

import { AppProvider } from "./provider/AppProvider";
import useForm from "./hooks/useForm";
import useFetch from "./hooks/useFetch";
import useStorage from "./hooks/useStorage";
import useLogout from "./hooks/useLogout";
import useLogin from "./hooks/useLogin";
import useStore from "./hooks/useStore";
import useGraphql from "./hooks/useGraphql";
import useUpload from "./hooks/useUpload";
import useCookie from "./hooks/useCookie";
import useState from "./hooks/useState";
import useSubscription from "./hooks/useSubscription";
import usePagination from "./hooks/usePagination";
import CurrencyFormat from "./utils/CurrencyFormat";

import md5 from "./utils/md5";
import { setVariable, getVariable } from "./utils/SetterGetter";
import { getSetCache as setCache, setTempCache } from "./utils/Cache";

export {
  AppProvider,
  useForm,
  useFetch,
  useStorage,
  useLogout,
  useLogin,
  usePagination,
  CurrencyFormat,
  useStore,
  useGraphql,
  useUpload,
  useCookie,
  md5,
  useState,
  setVariable,
  getVariable,
  setCache,
  useSubscription,
  setTempCache,
};
