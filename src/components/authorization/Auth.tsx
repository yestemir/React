import React, {ReactElement} from 'react'
import {Link} from "react-router-dom";
import {User} from "../../models/User";
import Field from "../../shared/Field";

interface Props {
    login: (user: User) => void;
    cancel: () => void;
}

export default function Auth({ login, cancel }: Props): ReactElement {
    let user: User = { email: "", id: 0, password: "", name: "" };

    return (
        <main className='backg'>
        <div className='container modal-content animate'>
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

            <div className="container">
                <Link to='/main'><button onClick={() => login(user)}>Submit</button></Link>
                <Link to='/'><button className="cancelbtn" onClick={cancel}>Back to the main page</button></Link>
            </div>
        </div>
        </main>
    );


}
