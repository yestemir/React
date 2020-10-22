import React, {ReactElement} from 'react'
import {Link} from "react-router-dom";
import {User} from "../../models/User";
import Field from "../../shared/Field";
import './index.css'

interface Props {
    login: (user: User) => void;
    cancel: () => void;
}

export default function Auth({ login, cancel }: Props): ReactElement {
    let user: User = { email: "", id: 0, password: "", name: "" };

    return (
        <main className='backg'>
        <div className='container'>
            <h1>Login</h1>
            <p>Please fill in this form to login.</p>
            <Field
                type="email"
                label="Email"
                onChange={(e) => {
                    user.email = e.target.value;
                }}
                required
            />
            <Field
                type="password"
                label="Password"
                onChange={(e) => {
                    user.password = e.target.value;
                }}
                required
            />

            {/*<div className="buttons">*/}
            {/*    <Link to='/'><button onClick={cancel}>Back to the main page</button></Link>*/}
            {/*    <button onClick={() => login(user)}>Submit</button>*/}
            {/*</div>*/}

            <Link to='/main'><button className="registerbtn" onClick={() => login(user)}>Submit</button></Link>
            <div className="container signin">
                <Link to='/'><button className="cancelbtn" onClick={cancel}>Back to the main page</button></Link>
            </div>
        </div>
        </main>
    );


}
