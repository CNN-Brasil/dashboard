import styled, {css} from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
`

export const Content = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    svg {
        width: 200px;
        height: 200px;
    }

    h1 {
        font-size: 36px;
        margin: 40px 0 10px 0;
    }

    h3 {
        font-size: 22px;
        margin-bottom: 40px;
    }

    input[type="text"] {
        height: 50px;
        width: 400px;
        font-size: 22px;
        padding: 0 20px;
        margin-bottom: 20px;

    }

    input[type="submit"] {
        font-size: 22px;
        font-weight: bold;
        color: #fff;
        height: 50px;
        width: 150px;
        tex-align: center;
        border-radius: 5px;
        background-color: #CC0000;
        border-color: transparent;
        margin-top: 40px;
        cursor: pointer;
    }
 
    form {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;

        p {
            font-size: 22px;
            color: #CC0000;
            text-transform: uppercase;
            margin-bottom: 10px;
        }
    }
`