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
      uploadUrl: "",
    },
  };
  const defaltCache = {};

  return (
    <AppProvider options={options}>
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

const ADD = ``;
const UDATE = ``;

function form(props) {

    const {handleInput, onSubmit, setInput, getInput, data, errors, setValidation, reset} = useForm()

    const send = data => {

    }
    //reset() to reset form
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
  const { runFetch, data, error, success } = useFetch({
    onSuccess: (res) => {
      //statement
    },
    onError: (err) => {
      //statement
    },
    cache: "cache_key",
    persist: "true/false", //to save the data to localstorage
    query: "mutation or query",
    fetchMode: "once/always", //default is always
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

**useGraphql**
Mutation is for making alteration in database like delete, update, and insert

```javascript
import React from "react";
import { useGraphql } from "backend-hook";

const INSERT = ``;

function mutation(props) {
  const { runGraphql, data, loading, error, refetch } = useGraphql({
    query: INSERT,
    onSuccess: (res) => {},
    onError: (err) => {},
    cache: "cache_key",
    persist: "boolean", //save cache to localstorage
  });

  React.useEffect(() => {
    runGraphql({ objects: data });
  });
}
```

**GLOBAL STATE MANAGEMENT**

```javascript
import React from "react";
import { setCache, setTempCache } from "backend-hook";

function state(props) {
  setCache({ league: "football" });

  setCache({ match: "fulltime" });

  //props.cache to access all cach value
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
