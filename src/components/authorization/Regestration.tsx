import React, {ReactElement} from 'react'
import {Link} from "react-router-dom";
import {User} from "../../models/User";
import Field from "../../shared/Field";
import './index.css'

interface Props {
    registrate: (user: User) => void;
    cancel: () => void;
    validateUser: (user: User) => void
}


export default function Registration({
                                         registrate,
                                         cancel,
                                         validateUser,
                                     }: Props): ReactElement {
    let user: User = { email: "", id: 0, password: "", name: "" };

    return (
        <main className='backg'>
        <div className='container'>
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <Field
                type="text"
                label="Name"
                onChange={(e) => {
                    user.name = e.target.value;
                }}
                required
            />
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

            <button className="registerbtn" onClick={() => registrate(user)} onSubmit={() => validateUser(user)}>Submit</button>
            <div className="container signin">
                <Link to='/'><button className="cancelbtn" onClick={cancel}>Back to the main page</button></Link>
            </div>
        </div>
        </main>
    );
}
