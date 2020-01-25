/**
 * @class ExampleComponent
 */

import { AppProvider } from "./provider/AppProvider";
import { AppContext } from "./provider/AppContext";
import { Redirect, ReloadPage } from "./utils/ReloadPage";
import { useForm } from "./utils/useForm";
import { useFetch } from "./utils/useFetch";
import useStorage from "./utils/useStorage";
import { useMutation } from "./utils/useMutation";
import { useQuery } from "./utils/useQuery";
import { useLogout } from "./utils/useLogout";
import { useLogin } from "./utils/useLogin";
import { useUploadMutation } from "./utils/useUploadMutation";
import FetchContainer from "./components/FetchContainer";
import { usePagination } from "./utils/usePagination";
import gql from "graphql-tag";

export {
    AppContext,
    AppProvider,
    Redirect,
    ReloadPage,
    useForm,
    useFetch,
    useStorage,
    useMutation,
    useQuery,
    useLogout,
    useLogin,
    useUploadMutation,
    FetchContainer,
    usePagination,
    gql
};
