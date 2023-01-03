import styled, {css} from 'styled-components';

export const Container = styled.div `
    width: 100%;
    height: 100%;
    background-color: #FAFAFA;

    ${props => props.themes === 'dark' && css`
        background-color: #282828;

        ${Header},
        ${Types},
        ${Info} {
            background-color: #282828;
        }
        ${Title}, 
        ${TypesSpan},
        ${InfoNumbers},
        ${SubTitle} {
            color: #fff;
        }
    `}
`

export const Grid = styled.div`
    display: flex;
    max-width: 1920px;
    width: 100%;
    align-items: center;
    justify-content: center;

    @media(min-width: 1920px) {
        max-width: 2500px;
        margin: auto;
        justify-content: space-between;
    }
`

export const Header = styled.div`
    padding: 30px;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #E6E6E6;
    background-color: #fff;
    position: relative;
    overflow: hidden;
    max-height: 110px;
    box-sizing: border-box;
    margin-bottom: 40px;

`

export const Content = styled.div`
    display: flex;
    align-items: center;
`

export const Title = styled.h2`

    dispay: block;
    margin-left: 30px;
    font-weight: 700;
    font-size: 24px;
    color: #464646;
    margin-right: 40px;

`

export const Types = styled.div`
    border: 1px solid #D0D0D0;
    background: #fff;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    margin-right: 20px;

    strong {
        width: 20px;
        height: 20px;
        display: block;
        margin-right: 10px;
        background-color: ${props => props.bg};
    }
`

export const TypesSpan = styled.span`
    font-weight: 700;
    font-size: 20px;
    color: #464646;
`

export const Graph = styled.div`
    width: 75%;
    height: 760px;
` 

export const Body = styled.div`
    width: 100%;
    min-width: 1920px;
    position: relative;
    display: flex;
    justify-content: space-between;
    
` 

export const Infos = styled.div`
    width: 20%;
`

export const SubTitle = styled.h4`
    color: #464646;
    font-size: 16px;
    font-weight: 700;
    display: block;
    margin-bottom: 25px;
`

export const Info = styled.div`
    width: 100%;
    height: 140px;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 5px;
    display: flex;
    border: 1px solid #E6E6E6;
    border-radius: 5px;
`

export const InfoGeral = styled.div`
    position: relative;
`

export const InfoLogo = styled.div`
    width: 100%;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const InfoNumbers = styled.div`
    width: 325px;
    height: 45px;
    font-size: 16px;
    font-weight: 400;
    line-height: 45px;

    ${props => props.border && css`
        border-bottom: 1px solid #E6E6E6;
    `}
`

export const CheckBoxContent = styled.div`
    width: 110px;
    height: 30px;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;
`


export const CheckBox = styled.div`

    input[type='checkbox'] {
        opacity: 0;
        position: absolute;
        z-index: 99;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        cursor: pointer;
    }

    label[for='checkbox'] {
        width: 40px;
        height: 21px;
        background-color:#464646;
        display: flex;
        border-radius:50px;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
        margin: 0 15px;
        position: relative;
        transform: scale(1.5);
        cursor: pointer;

        ${props => props.themes === 'dark' && css`
            background-color: #D0D0D0 !important;
        `}
    }
`

export const Ball = styled.div`
    width: 17px;
    height: 17px;
    background-color: #fafafa;
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 50%;
    transition: transform 0.2s linear;

    ${props => props.trans && css`
        transform: translateX(20px);
    `}
`

export const LightIcon = styled.div`
    width: 23px;
    height: 23px;
`

export const DarkIcon = styled.div`
    width: 11px;
    height: 16px;
`