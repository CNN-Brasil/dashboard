import styled, {css} from 'styled-components';

export const Container = styled.div `
    width: 100%;
    height: 100%;
    background-color: #FAFAFA;

    ${props => props.themes === 'dark' && css`
        background-color: #0C0C0C;
        
        ${Header} {
            background-color: #282828;
        }


        ${Types},
        ${Info},
        ${ContentChangeColor},
        ${ContentGraph},
        ${Infos},
        ${GraphContent},
        ${Body} {
            background-color: #0C0C0C;
        }
        ${Title}, 
        ${TypesSpan},
        ${InfoNumbers},
        ${SubTitle},
        ${TitleChangeColor} {
            color: #fff;
        }

        ${Clock} {
            p {
                color: #fff;
            }

            svg {
                path {
                    stroke: #fff;
                }
            }
        }
    `}
`

export const ContentGraph = styled.div`
    display: flex;
    flex-flow: column;
    width: 820px;
    
    @media(min-width: 1920px) {
        width: 75%;
    }

    @media(max-width: 768px) {
        width: 100%;
    }
    
`

export const Grid = styled.div`
    display: flex;
    max-width: 1280px;
    padding: 0 20px;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;

    ${props => props.align === 'start' && css`
        align-items: self-start;
    `}

    @media(min-width: 1920px) {
        max-width: 2500px;
        margin: auto;
        
    }

    @media(max-width: 768px) {
        flex-flow: column;
        max-width: 100%;
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

    @media(max-width: 768px) {
        max-height: inherit;
        overflow: inherit;
        padding: 0;
    }

`

export const Content = styled.div`
    display: flex;
    align-items: center;

    @media(max-width: 768px) {
        width: 100%;
        padding: 10px 20px;
    }

    ${props => props.type === 'marcas' && css `
        @media(max-width: 768px) {
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            margin-top: 10px;
        }
    `}
`

export const ContentChangeColor = styled.div`
    display: none;
    width: 100%;
    background-color: #FAFAFA;
    border-bottom: 1px solid #D0D0D0;
    margin-bottom: 15px;
    padding: 10px 20px;
    justify-content: space-between;


    @media(max-width: 768px) {
        display: flex;
        align-items: center;
    }
`

export const TitleChangeColor = styled.p`
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    color: #464646;

    ${props => props.themes === 'dark' && css`
        color: #fff !important;
    `}
`

export const Title = styled.h2`

    dispay: block;
    margin-left: 30px;
    font-weight: 700;
    font-size: 16px;
    color: #464646;
    margin-right: 40px;

    @media(min-width: 1920px) {
        font-size: 24px;
    }

    @media(max-width: 768px) {
        font-size: 16px;
        margin-right: 0;
        margin-left: 20px;
    }

`

export const ContentLogo = styled.div`
    width: 52px;
    height: 52px;
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

    @media(max-width: 768px) {
        padding: 5px 10px;
    }

    strong {
        width: 20px;
        height: 20px;
        display: block;
        margin-right: 10px;
        background-color: ${props => props.bg};

        @media(max-width: 768px) {
            width: 10px;
            height: 10px;
        }
    }
`

export const TypesSpan = styled.span`
    font-weight: 700;
    font-size: 16px;
    color: #464646;
    white-space: nowrap;

    @media(min-width: 1920px) {
        font-size: 20px;
    }

    @media(max-width: 768px) {
        font-size: 16px;
    }
`

export const Graph = styled.div`
    width: 100%;
` 

export const Body = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    min-width: inherit;
    
` 

export const Infos = styled.div`
    width: 370px;

    @media(min-width: 1920px) {
        width: 20%;
    }

    @media(max-width: 768px) {
        width: 100%;
        padding: 0;
    }
`

export const SubTitle = styled.h4`
    color: #464646;
    font-size: 16px;
    font-weight: 700;
    display: block;
    display: flex;
    align-items: center;


    ${props => props.margin && css`
        margin-bottom: 40px;
        justify-content: center;
    `}

    svg {
        margin-right: 20px;
    }

    @media(max-width: 768px) {
        font-size: 12px;
        padding: 0 20px;
        flex-flow: column;
        align-items: flex-start;

        svg {
            margin-bottom: 10px;
        }
    }
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

    @media (max-width: 768px) {
        flex-flow: column;
        height: auto;
        margin-bottom: 15px;
    }
`

export const InfoGeral = styled.div`
    position: relative;

    @media(min-width: 1920px) {
        min-width: 70%;
    }
`

export const InfoLogo = styled.div`
    min-width: 110px;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #E6E6E6;

    @media(min-width: 1920px) {
        min-width: 30%;
    }

    @media (max-width: 768px) {
        height: 70px;
        border-right: none;
        border-bottom: 1px solid #E6E6E6;
    }
`

export const GraphContent = styled.div`
    border: 1px solid #E6E6E6;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    margin: 40px 0;

    @media(max-width: 768px) {
        overflow-x: auto;
        overflow-y: hidden;
    }
`

export const InfoNumbers = styled.div`
    width: 100%;
    height: 45px;
    font-size: 16px;
    font-weight: 400;
    line-height: 45px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${props => props.border && css`
        border-bottom: 1px solid #E6E6E6;
    `}

    @media(max-width: 768px) {
        font-size: 14px;
    }
`

export const CheckBoxContent = styled.div`
    width: 110px;
    height: 30px;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    
    @media(max-width: 768px) {
        display: none;
    }

    ${props => props.mobile && css`

        @media(max-width: 768px) {
            display: flex;
        }
    `}
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

        ${props => props.mobile && css`
            width: 30px;
            height: 15px;
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

    ${props => props.mobile && css`
        width: 11px;
        height: 11px;

        ${props => props.trans && css`
            transform: translateX(14px) !important;
        `}
    `}

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

export const ContentAnchor = styled.div`
    position: relative;
    padding-right: 20px;
    margin-left: 20px;
    border-left: 1px solid #E6E6E6;
    max-width: 120px;
    width: 100%;
    display: none;
    height: 50px;
    align-items: center;
    justify-content: center;

    ${props => props.mbl && css`
        display: flex;
    `}
`

export const ContentIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all ease .25s;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    ${props => props.act && css`
        background-color: #E6E6E6;
    `}
`

export const Porcentage = styled.div`
    border: 1px solid #E6E6E6;
    font-size: 12px;
    font-weight: 700;
    height: 20px;
    line-height: 20px;
    margin-right: 20px;
    padding: 0 5px;
    display: flex;
    align-items: center;

    ${props => props.porcentange === 'positive' && css `
        &:before {
            content: '';
            width: 0; 
            height: 0; 
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 5px solid #489624;
            margin-right: 5px;
        }
    `}

    ${props => props.porcentange === 'negative' && css `
        &:before {
            content: '';
            width: 0; 
            height: 0; 
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid #CC0000;
            margin-right: 5px;
        }
    `}
`

export const Clock = styled.div`
    display: none;
    border: 1px solid #D0D0D0;
    border-radius: 5px;
    align-items: center;
    padding: 5px 10px;
    margin-right: 25px;

    p {
        font-size: 16px;
        font-weight: 500;
    }

    svg {
        margin-right: 10px;
    }

    @media (min-width: 1920px) {
        display: flex;
    }
`