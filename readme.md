# Hasura backend hook

> Library created for our team

## Get Started

**Installation**

yarn add backend-hook
or
npm install backend-hook --save

**USAGE**

In App.js which is the entrying point for the app

```javascript
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AppProvider } from "backend-hook";

function App() {
  const options = {
    name: "tellit",
    graphqlUrl: "http://localhost:8081/v1/graphql",

    services: {
      //payment: "http://localhost:8083",
      auth: "http://localhost:8083"
    },
    loadingBarColor: "#f11946",
    ErrorBoard: ErrorBoard,
    Loader: () => (
      <React.Fragment>
        <div style={{ textAlign: "center" }}>
          <img src="/assets/img/loader.svg" width="100" />
        </div>
      </React.Fragment>
    )
  };
  const defaltCache = {};

  return (
    <AppProvider options={options} default={defaultCache}>
      <BrowserRouter>
        <Switch>
          <Route path="/home" exact component={HomePage}></Route>
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
```

**Input Field Specification**

For error messages on input
if input name is email to get the error you must get error this way

props.error is an object with array errors message.

**Form**

```javascript
import React from 'react';
import {useForm} from 'backend-hook'
import gql from 'graphql-tab';

const ADD = gql``;
const UDATE = gql``;

function form(props) {

    const {handleInput, onSubmit, setInput, getInput, data: {errors, data}, setValidation} = useForm()

    const send = data => {

    }

    React.useEffect(()=> {
        setValidation({name: {
            required: 'required message',
            email: 'required email'
        }})
        props.location.state?setInput(props.location.state, ['rest', 'description']):''
    }, [])

    return (<React.Fragment>
        <input type="text" onChange={handleInput} value={getInput('rest')} name="rest" error={errors}>
        <button onClick={onSubmit(send)}>send</button>
    </React.Fragment>)

}
```

**Fetch**

```javascript
import React from "react";
import { useFetch } from "backend-hook";

function fetch(props) {
  const { runFetch, data } = useFetch({
    onSuccess: res => {
      //statement
    },
    onError: err => {
      //statement
    }
  });

  React.useEffect(() => {
    runFetch({
      service: "auth",
      uri: "/login",
      data: { name: "israel" },
      method: "GET"
    });
  }, []);
}
```

**FetchContainer**
This component wrappes the component that render fetched Item to display loading, error, and fetchted items

```javascript
import React from "react";
import { FetchContainer, useFetch } from "backend-hook";

function fetch(props) {
  const { runFetch, data, loading, error, reload } = useFetch({
    onSuccess: res => {
      //statement
    },
    onError: err => {
      //statement
    }
  });

  return (
    <React.Fragment>
      <FetchContainer
        loading={loading}
        error={error}
        retry={reload}
        emptyIcon={/*path to the image */}
        emptyLabel="empty something"
        data={data}
      >
        {...items}
      </FetchContainer>
    </React.Fragment>
  );
}
```

**Mutation**
Mutation is for making alteration in database like delete, update, and insert

```javascript
import React from "react";
import { useMutation } from "backend-hook";
import gql from "graphql-tag";

const INSERT = gql``;

function mutation(props) {
  const { runMutation, data, loading, error } = useMutation({
    mutation: INSERT,
    onSuccess: res => {},
    onError: err => {},
    hideSuccessMessage: boolean
  });

  React.useEffect(() => {
    runMutation({ objects: data });
  });
}
```

**Query backend**

```javascript
import React from 'react'
import {useQuery} from 'backend-hook'
import gql from 'graphql-tag'

cont GET = gql``

function query(props){

   const {runQuery, data} = useQuery ({query: GET, variables: {}, onSuccess: res => {

   }, onError: err => {

   }})

   React.useStat(()=> {
       runQuery()
   }, [])
}

```

**GLOBAL STATE MANAGEMENT**

```javascript
import React from "react";
import { AppContext } from "backend-hook";

function state(props) {
  const { cache, setCache, options, setOptions, resetCache } = React.useContext(
    AppContext
  );

  setCache({ league: "football" });

  setCache({ match: "fulltime" });
}
```

For global app loading

```javascript
options.appLoading; //boolean default is false
setOptions({ appLoading: true / false }); //to show or hide loading bar. and this also apply to any form of global state
```

**For Redirect**

```javascript

import React from 'react'
import {Redirect, ReloadPage} from 'backend-hook'

funtion redirect (props) {

    React.useEffect(()=> {
        Redirect({to: '/to/page', history: props.history, params: {}})
        ReloadPage({history: props.history, location: props.location})
    }, [])
}
```

**Login**

```javascript
import { useLogin } from "backend-hook";

function LoginPage() {
  const { runLogin, isLoggedIn, runUpdateLogin } = useLogin();

  runLogin({ user_id, role, features, token }); // to set data for login;
  isLoggedIn(); //check if the is logged in.
  showLoginDialog(); //It return true when user have not login  and show dialog box with cache property anonymousDialog
  runUpdateLogin();
}
```

**Logout**

```javascript
import { useLogout } from "backend-hook";

function LoginPage() {
  const { runLogout } = useLogout({ onSuccess: res => {}, onError: err => {} });
}
```

**Upload**

Upload component

```javascript
import { Upload } from "backend-hook";

const handleSuccess = res => {};
const handleProgress = progress => {
  //progress is int
};
const handleChange = file => {
  //file.target.files[0]
};
function UploadPage() {
  return (
    <Upload
      onSuccess={handleSuccess}
      onProgress={handleProgress}
      onChange={handleChange}
      hideProgress={"boolean"}
      lable={"component or text"}
      accept={"image/* or others"}
      progressBarColor="secondary"
      callbacks={[
        {
          mutation: "string",
          variable: JSON.stringify({
            upload_id: "id of uploaded will fill automatically"
          })
        }
      ]}
    />
  );
}
```

**Pagination**

```javascript
import React from "react";
import { usePagination } from "backend-hook";

function Page(props) {
  const { runPagination } = usePagination();

  runPagination({
    total: data.total.aggregate.count,
    currentPage: page,
    perPage
  });
}
```
