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

        setLogin(dispatch, {
            email: e.target[0].value,
            pass: e.target[1].value
        })

        if(!state.login.credential) {
            setError(true)
        } else {
            setError(false)
        }
    }

    console.log('log 2 ', localStorage.getItem('isLogged'))

    if(localStorage.getItem('isLogged') === 'true') {
        return <Navigate to={'/total'} />
    } else {
        return (
            <Wrapper>
                <Content>
                    <CNNLogo />
                    <h1>DASHBOARD</h1>
                    <h3>ytib.cnnbrasil.com.br</h3>
                    <form onSubmit={handleSubmit}>
                        {error && <p>Login inválido</p>}
                        <input type="text" placeholder='Email: ' />
                        <input type="password" placeholder='Senha: ' />
                        <input type="submit" value="Entrar" />
                    </form>
                </Content>
            </Wrapper>
        )
    }
}