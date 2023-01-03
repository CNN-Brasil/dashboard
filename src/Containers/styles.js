import styled, { css } from "styled-components";

const getArea = (area) => {
    switch (area) {
        case 'actions':
            return css`
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 30px;

                @media (max-width: 768px) {
                    flex-flow: column;
                }
            `
        case 'actions-insights':
            return css`
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-top: 30px;

                @media (max-width: 768px) {
                    flex-flow: column;
                }
        `
        case 'filter':
            return css`
                margin: 30px auto 20px auto;
            `
        case 'listheader':
            return css`
                display: flex;
                min-height: 60px;
                max-height: 60px;
                border-radius: 5px;
                align-items: center;
                padding: 0 30px;
                justify-content: space-between;
                width: 100%;
                margin-bottom: 10px;
                background-color: #fff;

                @media (max-width: 768px) {
                    display: none;
                }
            `
        case 'listitems':
            return css`
                background-color: #fff;
                display: flex;
                border-radius: 5px;
                align-items: center;
                padding: 30px;
                justify-content: space-between;
                width: 100%;
                margin-bottom: 10px;
                height: 100%;
                transition: all ease .25s;

                ${props => props.active && css`
                    height: auto;
                `}

                @media(max-width: 768px) {
                    flex-wrap: wrap;
                    justify-content: center;
                }
            `
            case 'listanswers':
                return css`
                    background-color: #fff;
                    display: flex;
                    flex-flow: column;
                    border-radius: 5px;
                    justify-content: space-between;
                    width: 100%;
                    max-height: 0;
                    position: relative;
                    overflow: hidden;
                    opacity: 0;
                    transition: all ease-in .25s;
                    padding: 0 30px 30px 30px;
                    margin-top: -10px;

                    ${props => props.active && css`
                        opacity: 1;
                        max-height: inherit;
                        visibility: visible;
                        margin-bottom: 10px;
                    `}
            `

            case 'insights':
                return css`
                    display: flex;
                    flex-flow: row;
                    justify-content: space-between; 
                    width: 100%;
                    overflow: hidden;
                    margin-top: 10px;
            `

            case 'graphics':
                return css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 30px;
                    border-radius: 15px;

                    > div {
                        background-color: #fff;
                        width: 100%;
                        border-radius: 15px;
                    }
            `
    }
}

export const Container = styled.div`
    width: 100%;
    position: relative;
    margin: 0 auto;
    padding: 0 30px;

    ${props => getArea(props.area)}
`
export const ListHeaderItem = styled.div`

    ${props => props.nomobile && css`
        @media (max-width: 768px) {
            display: none;
        }
    `}

    ${props => props.width && css`
        width: ${props => props.width}px;

        @media (max-width: 768px) {
            width: 100%;
        }
    `}
    ${props => (props.width && props.porcentage) && css`
        width: ${props => props.width}%;

        @media (max-width: 768px) {
            width: 100%;
        }
    `}

    ${props => props.align && css`
        text-align: ${props => props.align};
    `}

    ${props => props.type === 'tags' && css`
        display: flex;
        flex-wrap: wrap;
        flex-flow: column;
        justify-content: center;

        @media (max-width: 768px) {
            flex-flow: column;
            align-items: center;
            margin: 15px 0;
        }
    `}

    span {
        color: #000000;
        font-size: 14px;
    }

    ${props => props.fx && css`
        position: fixed;
        top: 50%;
        left: -45px;
        width: 40px !important;
        transform: translateY(-50%);
        transition: all ease .25s;
    `}

    ${props => props.active && css`
        left: 10px;
    `}

    p {
        font-size: 14px;
        color: #000000;
    }
    ${props => getArea(props.area)}
`
