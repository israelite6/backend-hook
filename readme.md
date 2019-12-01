# Hasura backend hook

> Library created for our team

## Get Started

**Installation**

yarn add backend-hook
or
npm install backend-hook --save

**USAGE**

In App.js which is the entrying point for the app

````javascript
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
    }
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


**Input Field Specification**

For error messages on input
if input name is email to get the error you must get error this way

props.error is an object with array errors message.

```javascript
props.errors['email'] and the output is array
````

**Forms**

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
    onError: err => {}
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

For Redirect

```javascript

import React from 'react'
import {Redirect, ReloadPage} from 'backend-hook'

funtion redirect (props) {

    React.useEffect(()=> {
        Redirect({to: '/to/page', history: props.history, params: {}})
    }, [])
}
```
