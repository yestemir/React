import React, {Component} from 'react'

interface Props {

}

interface State {

}

export default class Main extends Component<Props, State> {
    state = {};

    render() {
        return(
            <main className="main">
                <h1 className='text'>Главное - здоровье!</h1>
            </main>
        );
    }
}