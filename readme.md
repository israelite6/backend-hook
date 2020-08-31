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
    services: {
      //payment: "http://localhost:8083",
      app: "http://localhost:8083",
    },
    Loader: () => (
      <React.Fragment>
        <div style={{ textAlign: "center" }}>
          <img src="/assets/img/loader.svg" width="100" />
        </div>
      </React.Fragment>
    ),
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
    onSuccess: (res) => {
      //statement
    },
    onError: (err) => {
      //statement
    },
  });

  React.useEffect(() => {
    runFetch({
      service: "auth",
      uri: "/login",
      data: { name: "israel" },
      method: "GET",
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
    onSuccess: (res) => {
      //statement
    },
    onError: (err) => {
      //statement
    },
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

const INSERT = ``;

function mutation(props) {
  const { runMutation, data, loading, error } = useMutation({
    mutation: INSERT,
    onSuccess: (res) => {},
    onError: (err) => {},
    hideSuccessMessage: boolean,
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

cont GET = ``

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
import { setCache } from "backend-hook";

function state(props) {
  setCache({ league: "football" });

  setCache({ match: "fulltime" });

  //props.cache to access all cach value
}
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
  const { runLogout } = useLogout({
    onSuccess: (res) => {},
    onError: (err) => {},
  });
}
```

**Upload**

Upload component

```javascript
import { useUpload } from "backend-hook";

function UploadPage() {
  const { progress, loading, runUpload, success, error } = useUpload({
    onSuccess: (res) => {},
    onError: (err) => {},
  });

  const handleUpload = (event) => {
    runUpload({ file: event.target.files[0], resize });
  };
  return <input type="file" onChange={handleUpload} />;
}
```

resize: {
width: int,
height: int,
fit: cover, contain, fill, inside or outside (default: cover),
}

**Pagination**

```javascript
import React from "react";
import { usePagination } from "backend-hook";

function Page(props) {
  const { runPagination } = usePagination();

  runPagination({
    total: data.total.aggregate.count /*total number of rows*/ß,
    currentPage: page,
    perPage,
  });
}
```

**Subscription**

```javascript
import React from "react";
import { useSubscription } from "backend-hook";

function Page(props) {
  const { runSubscription, webSocket, onMessage(data), onError(data), onConnected(), onConnectionStatus() } = useSubscription({option, url});

  runSubscription({
    query, id, operationName
  });

  //operationName optional
  //url: ws://graphql url
}
```
