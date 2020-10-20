import React, {useState} from "react";
import "./App.css";
import { ThemeProvider } from "@chakra-ui/core";
import customTheme from "./theme";
import { Provider } from "react-redux";
import { ApplicationState } from "./store";
import { Store } from "redux";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import CartComponent from "./components/Cart";
import {User} from "./models/User";
import Auth from "./components/authorization/Auth";
import Registration from "./components/authorization/Regestration";
import { Redirect } from "react-router-dom";
import Main from "./components/Main";
import ProductDetail from "./components/ProductDetail/"

interface MainProps {
  store: Store<ApplicationState>;
  history: History;
}

const users: User[] = [
    {
        id: 1,
        name: "Dina",
        email: "dina@com",
        password: "dina",
    }
];

const App: React.FC<MainProps> = ({ store, history }) => {
    const [errors, setErrors] = useState('');
    const [redirctTo, setRedirctTo] = useState(false);

  return (
    <Provider store={store}>
      <ThemeProvider theme={customTheme}>
        <ConnectedRouter history={history}>
            <Navbar/>
            <Switch>
                <Route exact path='/'><HomePage /></Route>
                <Route exact path='/cart'><CartComponent /></Route>
                <Route exact path='/auth'><Auth login={authenticateUser} cancel={show}/></Route>
                <Route exact path='/register'><Registration registrate={createNewUser} cancel={show} validateUser={validate}/></Route>
                <Route exact path='/main'><Main /></Route>
                <Route exact path='/items/:id'><ProductDetail /></Route>
            </Switch>
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  );

    function createNewUser(user: User) {
        if (users && user) {
            const checker = users.find((u) => u.email === user.email);
            if (checker) {
                return;
            }
            user.id = users.length + 1;
            users.push(user);
            setRedirctTo(true);
            if (redirctTo) {
                return <Redirect to="/"/>
            } else {
                return (
                    <h3>incorrect</h3>
                );
            }
        }
    }

    function authenticateUser(user: User) {
        if (users && user) {
            console.log(user);
            const checker = users.find(
                (u) => u.email === user.email && u.password === user.password
            );
            if (checker) {
                setRedirctTo(true);
            }
            if (redirctTo) {
                return <Redirect to="/"/>
            } else {
                return (
                    <h3>incorrect</h3>
                );
            }
        }
    }

    function validate(user: User){

        let str = ''

        console.log(users)
        if(!user.name){
            str += 'Name is required '
        }


        if(!user.email.includes('@') || !user.email){
            str += 'Invalid email '
        }

        if(user.password.length === 0 && user.password.length < 8){
            str += 'Password must contain at least 8 symbols '
        }

        if(str){
            setErrors(str)
            return false
        }

        return true

    }

    function show(){
        return <Redirect to="/"/>
    }


};

export default App;
