import React, {ReactElement} from 'react'
import {Link} from "react-router-dom";
import {User} from "../../models/User";
import Field from "../../shared/Field";

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
        <div className='container modal-content animate'>
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

            <div className="buttons">
                <button onClick={() => registrate(user)} onSubmit={() => validateUser(user)}>Submit</button>
                <Link to='/'><button className="cancelbtn" onClick={cancel}>Back to the main page</button></Link>
            </div>
        </div>
        </main>
    );
}
