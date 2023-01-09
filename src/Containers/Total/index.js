import React, {useState, useMemo, useContext, useRef, useEffect} from 'react';
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
    Ball,
    ContentChangeColor,
    ContentGraph,
    TitleChangeColor,
    GraphContent,
    ContentAnchor,
    ContentIcon,
    ContentLogo
} from './styles'

import {ContextReducer} from "../../reducer/AdminReducer";

import {ReactComponent as CNNLogo} from '../../assets/cnn_red.svg';
import {ReactComponent as CNNLogoWhite} from '../../assets/cnn.svg';
import {ReactComponent as GloboNewsLogo} from '../../assets/globonews.svg';
import {ReactComponent as RecordNewsLogo} from '../../assets/recordnews.svg';
import {ReactComponent as RecordNewsLogoDark} from '../../assets/recordnews_dark.svg';
import {ReactComponent as JPNewsLogo} from '../../assets/jp.svg';
import {ReactComponent as BandNewsLogo} from '../../assets/bandnews.svg';
import {ReactComponent as SunLight} from '../../assets/sun_light.svg';
import {ReactComponent as MoonLight} from '../../assets/moon_light.svg';
import {ReactComponent as SunDark} from '../../assets/sun_dark.svg';
import {ReactComponent as MoonDark} from '../../assets/moon_dark.svg';
import {ReactComponent as Youtube} from '../../assets/youtube.svg';
import {ReactComponent as YoutubeDark} from '../../assets/youtube_dark.svg';
import {ReactComponent as Ibope} from '../../assets/ibope.svg';
import {ReactComponent as IbopeDark} from '../../assets/ibope_dark.svg';
import {ReactComponent as IcoGraph} from '../../assets/ico-graph.svg';
import {ReactComponent as IcoInfo} from '../../assets/ico-info.svg';
import { Chart } from "react-google-charts";
import {getTotal} from '../../actions/ReviewsAction.js'

export default props => {
    const { state, dispatch } = useContext(ContextReducer);

    const [ball, setBall] = useState(false)
    const [theme, setTheme] = useState('light')
    const [mobile, setMobile] = useState(false)
    const [activeGraph, setActiveGraph] = useState(false)
    const [activeInfo, setActiveInfo] = useState(false)

    useEffect(() => {
        useEffect(() => {
            getTotal(dispatch)
    
            setInterval(() => {
                getTotal(dispatch)
            }, 60000)
        }, [])
    }, [state.graph])

    useEffect(() => {
        renderMobile()
    }, [])

    const handleAnchorGraph = () => {
        setActiveGraph(true)
        setActiveInfo(false)

        document.querySelector('#graph').scrollIntoView({ behavior: 'smooth' });
    }

    const handleAnchorInfo = () => {
        setActiveGraph(false)
        setActiveInfo(true)

        document.querySelector('#infos').scrollIntoView({ behavior: 'smooth' });
    }

    const handleBall = () => {
        setBall(!ball)
        
        if(ball) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }

    const renderMobile = () => {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            setMobile(true)
        }
    }
    
    const renderOptions = () => {
        var options = {
            legend: 'none',
            curveType: "function",
            backgroundColor:'transparent',
            lineWidth: 5,
            chartArea: {
                width:"90%",
                top: 40,
                bottom: 40,
                left: 40,
                right: 40
            },
            vAxis: {    
                format: 'short',
                textStyle : {
                    fontSize : 18,
                    color: ball ? '#fff' : '#464646',
                }
            },
            hAxis: {
                showTextEvery: 20,
                textStyle : {
                    fontSize : 18,
                    color: ball ? '#fff' : '#464646',
                }
            },
            series: {
                0: { color: '#CC0000' },
                1: { color: '#1770C6' },
                2: { color: '#489624' },
                3: { color: '#8C8C8C' },
                4: { color: '#FFB800' },
          }
        };

        return options
    }
    

    return (
        <>
            <Container themes={theme}>
                <Header>
                    <Grid>
                        <ContentChangeColor>
                            <TitleChangeColor>{ball ? 'Modo Escuro' : 'Modo Claro'}</TitleChangeColor>
                            <CheckBoxContent mobile>
                                <LightIcon>
                                {ball ? <SunDark /> : <SunLight />}
                                </LightIcon>
                                <CheckBox themes={theme} mobile>
                                    <input type="checkbox" onChange={handleBall} />
                                    <label for="checkbox">
                                        <Ball trans={ball} mobile />
                                    </label>
                                </CheckBox>
                                <DarkIcon>
                                    {ball ? <MoonDark /> : <MoonLight />}
                                </DarkIcon>
                            </CheckBoxContent>
                        </ContentChangeColor>
                        <Content>
                            <ContentLogo>
                                <CNNLogo />
                            </ContentLogo>
                            <Title>Audiência em tempo real.</Title>
                            <ContentAnchor mbl={mobile}>
                                <ContentIcon act={activeGraph} onClick={handleAnchorGraph}>
                                    <IcoGraph  />
                                </ContentIcon>
                                <ContentIcon act={activeInfo} onClick={handleAnchorInfo}>
                                    <IcoInfo />
                                </ContentIcon>
                            </ContentAnchor>
                        </Content>
                        <Content type='marcas'>
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
                    <ContentGraph id='graph'>
                        <Graph>
                            <SubTitle>Gráfico de Usuários únicos (UV) • Horário do acesso (H)</SubTitle>
                            <GraphContent>
                                <Chart
                                    chartType="LineChart"
                                    data={state.graph}
                                    width={mobile ? '1200px' : '100%'}
                                    height="760px"
                                    options={renderOptions()} 
                                    />
                                </GraphContent>
                        </Graph>
                    </ContentGraph>
                    <Infos id='infos'>
                        <SubTitle margin>Audiência em tempo real</SubTitle>
                        <Info>
                            <InfoLogo>
                                {ball ? <CNNLogo /> : <CNNLogoWhite />}
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
                                {ball ? <RecordNewsLogoDark /> : <RecordNewsLogo />}
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
