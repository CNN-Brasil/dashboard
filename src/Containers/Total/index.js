import React, {useState, useMemo, useContext, useRef} from 'react';
import {Navigate} from "react-router-dom";

import {
    Container,
    Content,
    Header,
    Title,
    Types,
    TypesSpan,
    Graph,
    Grid,
    Body,
    Infos,
    Info,
    SubTitle,
    InfoLogo,
    InfoNumbers,
    InfoGeral,
    CheckBoxContent,
    CheckBox,
    LightIcon,
    DarkIcon,
    Ball
} from './styles'

import {ContextReducer} from "../../reducer/AdminReducer";

import {ReactComponent as CNNLogo} from '../../assets/cnn_red.svg';
import {ReactComponent as CNNLogoWhite} from '../../assets/cnn.svg';
import {ReactComponent as GloboNewsLogo} from '../../assets/globonews.svg';
import {ReactComponent as RecordNewsLogo} from '../../assets/recordnews.svg';
import {ReactComponent as JPNewsLogo} from '../../assets/jp.svg';
import {ReactComponent as BandNewsLogo} from '../../assets/bandnews.svg';
import {ReactComponent as SunLight} from '../../assets/sun_light.svg';
import {ReactComponent as MoonLight} from '../../assets/moon_light.svg';
import {ReactComponent as SunDark} from '../../assets/sun_dark.svg';
import {ReactComponent as MoonDark} from '../../assets/moon_dark.svg';
import { Chart } from "react-google-charts";


export default props => {
    const { state, dispatch } = useContext(ContextReducer);

    const [ball, setBall] = useState(false)
    const [theme, setTheme] = useState('light');

    const handleBall = () => {
        setBall(!ball)
        
        if(ball) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    const renderData = () => {
        const data = [
            [
              "Horário",
              "CNN Brasil",
              "Globo News",
              "Record News",
              "Jovem Pan News",
              "Band News"
            ],
            ['09:20', 37.8, 80.8, 41.8, 100, 150],
            ['09:21', 30.9, 69.5, 32.4, 150, 150],
            ['09:22', 25.4, 57, 25.7, 200, 150],
            ['09:23', 11.7, 18.8, 10.5, 300, 150],
            ['09:24', 11.9, 17.6, 10.4, 400, 150],
            ['09:25', 8.8, 13.6, 7.7, 500, 150],
            ['09:26', 7.6, 12.3, 9.6, 600, 150],
            ['09:27', 12.3, 29.2, 10.6, 800, 150],
            ['09:28', 16.9, 42.9, 14.8, 2000, 150],
            ['09:29', 12.8, 30.9, 11.6, 500, 150],
            ['09:30', 5.3, 7.9, 4.7, 800, 150],
            ['09:31', 6.6, 8.4, 5.2, 400, 150],
            ['09:32', 4.8, 6.3, 3.6, 300, 150],
            ['09:33', 4.2, 6.2, 3.4, 200, 150],
        ];

        return data
    }

    const renderOptions = () => {
        var options = {
            legend: 'none',
            curveType: "function",
            backgroundColor: 'transparent',
            chartArea: {
                width:"90%",
                height:"90%",
                left: 50
            },
            vAxis: {
                format: 'short',
            },
            hAxis: {
                format: 'date'
            }
        };

        return options
    }

    return (
        <>
            <Container themes={theme}>
                <Header>
                    <Grid>
                        <Content>
                            <CNNLogo />
                            <Title>Audiência em tempo real.</Title>
                        </Content>
                        <Content>
                            <Types bg='#CC0000'>
                                <strong></strong>
                                <TypesSpan>CNN Brasil</TypesSpan>                                
                            </Types>
                            <Types bg='#1770C6'>
                                <strong></strong>
                                <TypesSpan>Globo News</TypesSpan>                                
                            </Types>
                            <Types bg='#489624'>
                                <strong></strong>
                                <TypesSpan>Record News</TypesSpan>                                
                            </Types>
                            <Types bg='#8C8C8C'>
                                <strong></strong>
                                <TypesSpan>Jovem Pan News</TypesSpan>                                
                            </Types>
                            <Types bg='#FFB800'>
                                <strong></strong>
                                <TypesSpan>Band News</TypesSpan>                                
                            </Types>
                        </Content>
                        <Content>
                            <CheckBoxContent>
                                <LightIcon>
                                {ball ? <SunDark /> : <SunLight />}
                                </LightIcon>
                                <CheckBox themes={theme}>
                                    <input type="checkbox" onChange={handleBall} />
                                    <label for="checkbox">
                                        <Ball trans={ball} />
                                    </label>
                                </CheckBox>
                                <DarkIcon>
                                    {ball ? <MoonDark /> : <MoonLight />}
                                </DarkIcon>
                            </CheckBoxContent>
                        </Content>
                    </Grid>
                </Header>
                <Body>
                    <Grid>
                    <Graph>
                        <SubTitle>Gráfico de Usuários únicos (UV) • Horário do acesso (H)</SubTitle>
                        <Chart
                            chartType="LineChart"
                            data={renderData()}
                            width="100%"
                            height="760px"
                            options={renderOptions()} 
                            />
                    </Graph>
                    <Infos>
                        <SubTitle>Audiência em tempo real</SubTitle>
                        <Info>
                            <InfoLogo>
                                <CNNLogoWhite />
                            </InfoLogo>
                            <InfoGeral>
                                <InfoNumbers border>Youtube 955.989 UV</InfoNumbers>
                                <InfoNumbers border>Ibope 5.955.989 UV</InfoNumbers>
                                <InfoNumbers><strong>Total 15.955.989 UV</strong></InfoNumbers>
                            </InfoGeral>
                        </Info>

                        <Info>
                            <InfoLogo>
                                <GloboNewsLogo />
                            </InfoLogo>
                            <InfoGeral>
                                <InfoNumbers border>Youtube 955.989 UV</InfoNumbers>
                                <InfoNumbers border>Ibope 5.955.989 UV</InfoNumbers>
                                <InfoNumbers><strong>Total 15.955.989 UV</strong></InfoNumbers>
                            </InfoGeral>
                        </Info>

                        <Info>
                            <InfoLogo>
                                <RecordNewsLogo />
                            </InfoLogo>
                            <InfoGeral>
                                <InfoNumbers border>Youtube 955.989 UV</InfoNumbers>
                                <InfoNumbers border>Ibope 5.955.989 UV</InfoNumbers>
                                <InfoNumbers><strong>Total 15.955.989 UV</strong></InfoNumbers>
                            </InfoGeral>
                        </Info>

                        <Info>
                            <InfoLogo>
                                <JPNewsLogo />
                            </InfoLogo>
                            <InfoGeral>
                                <InfoNumbers border>Youtube 955.989 UV</InfoNumbers>
                                <InfoNumbers border>Ibope 5.955.989 UV</InfoNumbers>
                                <InfoNumbers><strong>Total 15.955.989 UV</strong></InfoNumbers>
                            </InfoGeral>
                        </Info>

                        <Info>
                            <InfoLogo>
                                <BandNewsLogo />
                            </InfoLogo>
                            <InfoGeral>
                                <InfoNumbers border>Youtube 955.989 UV</InfoNumbers>
                                <InfoNumbers border>Ibope 5.955.989 UV</InfoNumbers>
                                <InfoNumbers><strong>Total 15.955.989 UV</strong></InfoNumbers>
                            </InfoGeral>
                        </Info>
                    </Infos>
                    </Grid>
                </Body>
            </Container>
        </>
    )

}
