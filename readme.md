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
    authUrl: "http://localhost:8083",
    services: {
      payment: "http://localhost:8083"
    }
  };

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

**Authication**

```javascript
import React from 'react'
import {Auth} from 'backend-hook'

function LoginForm(props){
    const handleSubmit = data =>{
        return data;
    }

    React.useEffet(()=> {

        props.setValidation({demo: {required: 'requied message', email: 'Message for valid email}})

    })
    <input type="text" errors={props.errors} onChange={props.handleInput} name="demo">
    <button onClick={props.handleSumit(handleSubmit)}>
}
function Login (props){

    const onSuccess  = data => {
        //do after login successful
    }

    return (<Auth url="/login" onSuccess={onSuccess}><LoginForm></Auth>)
}
```

**Input Field Specification**

For error messages on input
if input name is email to get the error you must get error this way

props.error is an object with array errors message.

```javascript
props.errors['email'] and the output is array
```

**Forms**

```javascript
import React from 'react';
import {Form} from 'backend-hook'
import gql from 'graphql-tab';

const ADD = gql``;
const UDATE = gql``;
function FormChild(props) => {

    const onSubmit = data => {
        return data;
    }

    React.useEffect(()=> {
        if(props.location.state){
            props.setInput(props.location.state, ["email])
            //For updating purpose alone
        }

        props.setValidation({
            email: {required: 'required message', email: 'Email message'},
            passwor: {required: 'required message'},
            confirmPasswor: {password: 'passwordname|password message'}
        })
    })

    return (
        <React.Fragment>
            <Input type="text" onChange={props.handleInput} errors={props.errors}>
            <Input type="password" onChange={handleInput} errors={props.errors} name="passwordname">
            <Input type="password" onChange={handleInput} errors={props.errors} name="confirmPasswor">
            <Button onClick={onSubmit}>Submit</Button>
        </React.Fragment>
    )
}

function ThatForm ( props ) {

    const onSuccess = data =>{

        //success data
    }

    return (<Form onSuccess={onSuccess} mutation={props.location.state?UPDATE:ADD}>
                <FormChild></FormChild>
            </Form>
            )
}
```

**Mutation**
Mutation is for making alteration in database like delete, update, and insert

```javascript
import React from 'react'
import {Mutation} from 'backend-hook'
import gql from 'graphql-tag';


const INSERT = gql``

function MutationChild(props) {

    const onClick = event => {
        props.runMutation(event)
    }

    return <button onClick={onClick}><button>
}

function ViewMutation (props){

    const onSuccessCallback = data =>{
        //statement
    }
    const beforeSendCallback = data => {
        //statement
    }
    return <Mutation onSuccess={onSuccessCallback} beforeSend={beforeSendCallback} mutation={INSERT}></Mutation>
}
```

**Query backend**

```javascript
import React from 'react'
import {Query} from 'backend-hook'
import gql from 'graphql-tag'

cont GET = gql``

function Fetch(props){

    return (<React.Fragment>
        {props.data.space && props.data.space.map()}
    </React.Fragment>)
}

function SpacePage(props){

    return (<Query query={GET} onSuccess={onSuccessCallback} beforeSend={beforeSendCallback} variables={{id: 3}}>
        <Fetch></Fetch>
    </Query>)
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
}
```

For global app loading

```javascript
options.appLoading; //boolean default is false
setCache({ appLoading: true / false }); //to show or hide loading bar. and this also apply to any form of global state
```
