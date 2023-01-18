import React, {useState, useContext} from 'react';
import {Navigate} from 'react-router-dom';
import config from '../../config/config'
import { ContextReducer } from '../../reducer/AdminReducer';
import { Wrapper, Content } from './styles';
import {ReactComponent as CNNLogo} from '../../assets/cnn_red.svg';
import {setLogin} from '../../actions/ReviewsAction'
const {isLogged} = config;

export default props => {
    const {state, dispatch} = useContext(ContextReducer)
    const [error, setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();

        if(e.target[0].value === 'Fpvw0y463q') {
            setLogin(dispatch, true)
        } else {
            setError(true)
        }
    }

    if(state.isLogged || localStorage.getItem('isLogged')) {
        return <Navigate to={'/total'} />
    } else {
        return (
            <Wrapper>
                <Content>
                    <CNNLogo />
                    <h1>DASHBOARD</h1>
                    <h3>ytib.cnnbrasil.com.br</h3>
                    <form onSubmit={handleSubmit}>
                        {error && <p>Token inválido</p>}
                        <input type="text" placeholder='Digite seu token' />
                        <input type="submit" value="Entrar" />
                    </form>
                </Content>
            </Wrapper>
        )
    }
}