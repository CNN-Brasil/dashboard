import React, { useState, useMemo, useContext, useRef, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { Container, Content, Header, Title, Types, TypesSpan, Graph, Grid, Body, Infos, Info, SubTitle, InfoLogo, InfoNumbers, InfoGeral, CheckBoxContent, CheckBox, LightIcon, DarkIcon, Ball, ContentChangeColor, ContentGraph, TitleChangeColor, GraphContent, ContentAnchor, ContentIcon } from './styles';
import { ContextReducer } from "../../reducer/AdminReducer";
import { ReactComponent as CNNLogo } from '../../assets/cnn_red.svg';
import { ReactComponent as CNNLogoWhite } from '../../assets/cnn.svg';
import { ReactComponent as GloboNewsLogo } from '../../assets/globonews.svg';
import { ReactComponent as RecordNewsLogo } from '../../assets/recordnews.svg';
import { ReactComponent as RecordNewsLogoDark } from '../../assets/recordnews_dark.svg';
import { ReactComponent as JPNewsLogo } from '../../assets/jp.svg';
import { ReactComponent as BandNewsLogo } from '../../assets/bandnews.svg';
import { ReactComponent as SunLight } from '../../assets/sun_light.svg';
import { ReactComponent as MoonLight } from '../../assets/moon_light.svg';
import { ReactComponent as SunDark } from '../../assets/sun_dark.svg';
import { ReactComponent as MoonDark } from '../../assets/moon_dark.svg';
import { ReactComponent as Youtube } from '../../assets/youtube.svg';
import { ReactComponent as YoutubeDark } from '../../assets/youtube_dark.svg';
import { ReactComponent as Ibope } from '../../assets/ibope.svg';
import { ReactComponent as IbopeDark } from '../../assets/ibope_dark.svg';
import { ReactComponent as IcoGraph } from '../../assets/ico-graph.svg';
import { ReactComponent as IcoInfo } from '../../assets/ico-info.svg';
import { Chart } from "react-google-charts";
export default (props => {
  const {
    state,
    dispatch
  } = useContext(ContextReducer);
  const [ball, setBall] = useState(false);
  const [theme, setTheme] = useState('light');
  const [mobile, setMobile] = useState(false);
  const [activeGraph, setActiveGraph] = useState(false);
  const [activeInfo, setActiveInfo] = useState(false);
  useEffect(() => {
    console.log('state ', state.graph);
  }, [state.graph]);
  useEffect(() => {
    renderMobile();
  }, []);
  const handleAnchorGraph = () => {
    setActiveGraph(true);
    setActiveInfo(false);
    document.querySelector('#graph').scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleAnchorInfo = () => {
    setActiveGraph(false);
    setActiveInfo(true);
    document.querySelector('#infos').scrollIntoView({
      behavior: 'smooth'
    });
  };
  const handleBall = () => {
    setBall(!ball);
    if (ball) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };
  const renderMobile = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setMobile(true);
    }
  };
  const renderData = () => {
    const data = [["Horário", "CNN Brasil", "Globo News", "Record News", "Jovem Pan News", "Band News"], ['09:20', 37.8, 80.8, 41.8, 100, 150], ['09:21', 30.9, 69.5, 32.4, 150, 150], ['09:22', 25.4, 57, 25.7, 200, 150], ['09:23', 11.7, 18.8, 10.5, 300, 150], ['09:24', 11.9, 17.6, 10.4, 400, 150], ['09:25', 8.8, 13.6, 7.7, 500, 150], ['09:26', 7.6, 12.3, 9.6, 600, 150]];
    return data;
  };
  const renderOptions = () => {
    var options = {
      legend: 'none',
      curveType: "function",
      backgroundColor: ball ? 'transparent' : '#fff',
      chartArea: {
        width: "90%",
        left: 80,
        right: 50,
        top: 50,
        bottom: 50
      },
      vAxis: {
        format: 'short',
        textStyle: {
          fontSize: 18,
          color: ball ? '#fff' : '#464646'
        }
      },
      hAxis: {
        format: 'date',
        textStyle: {
          fontSize: 18,
          color: ball ? '#fff' : '#464646'
        }
      },
      series: {
        0: {
          color: '#CC0000'
        },
        1: {
          color: '#1770C6'
        },
        2: {
          color: '#489624'
        },
        3: {
          color: '#8C8C8C'
        },
        4: {
          color: '#FFB800'
        }
      }
    };
    return options;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Container, {
    themes: theme
  }, /*#__PURE__*/React.createElement(Header, null, /*#__PURE__*/React.createElement(Grid, null, /*#__PURE__*/React.createElement(ContentChangeColor, null, /*#__PURE__*/React.createElement(TitleChangeColor, null, ball ? 'Modo Escuro' : 'Modo Claro'), /*#__PURE__*/React.createElement(CheckBoxContent, {
    mobile: true
  }, /*#__PURE__*/React.createElement(LightIcon, null, ball ? /*#__PURE__*/React.createElement(SunDark, null) : /*#__PURE__*/React.createElement(SunLight, null)), /*#__PURE__*/React.createElement(CheckBox, {
    themes: theme,
    mobile: true
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    onChange: handleBall
  }), /*#__PURE__*/React.createElement("label", {
    for: "checkbox"
  }, /*#__PURE__*/React.createElement(Ball, {
    trans: ball,
    mobile: true
  }))), /*#__PURE__*/React.createElement(DarkIcon, null, ball ? /*#__PURE__*/React.createElement(MoonDark, null) : /*#__PURE__*/React.createElement(MoonLight, null)))), /*#__PURE__*/React.createElement(Content, null, /*#__PURE__*/React.createElement(CNNLogo, null), /*#__PURE__*/React.createElement(Title, null, "Audi\xEAncia em tempo real."), /*#__PURE__*/React.createElement(ContentAnchor, {
    mbl: mobile
  }, /*#__PURE__*/React.createElement(ContentIcon, {
    act: activeGraph,
    onClick: handleAnchorGraph
  }, /*#__PURE__*/React.createElement(IcoGraph, null)), /*#__PURE__*/React.createElement(ContentIcon, {
    act: activeInfo,
    onClick: handleAnchorInfo
  }, /*#__PURE__*/React.createElement(IcoInfo, null)))), /*#__PURE__*/React.createElement(Content, {
    type: "marcas"
  }, /*#__PURE__*/React.createElement(Types, {
    bg: "#CC0000"
  }, /*#__PURE__*/React.createElement("strong", null), /*#__PURE__*/React.createElement(TypesSpan, null, "CNN Brasil")), /*#__PURE__*/React.createElement(Types, {
    bg: "#1770C6"
  }, /*#__PURE__*/React.createElement("strong", null), /*#__PURE__*/React.createElement(TypesSpan, null, "Globo News")), /*#__PURE__*/React.createElement(Types, {
    bg: "#489624"
  }, /*#__PURE__*/React.createElement("strong", null), /*#__PURE__*/React.createElement(TypesSpan, null, "Record News")), /*#__PURE__*/React.createElement(Types, {
    bg: "#8C8C8C"
  }, /*#__PURE__*/React.createElement("strong", null), /*#__PURE__*/React.createElement(TypesSpan, null, "Jovem Pan News")), /*#__PURE__*/React.createElement(Types, {
    bg: "#FFB800"
  }, /*#__PURE__*/React.createElement("strong", null), /*#__PURE__*/React.createElement(TypesSpan, null, "Band News"))), /*#__PURE__*/React.createElement(Content, null, /*#__PURE__*/React.createElement(CheckBoxContent, null, /*#__PURE__*/React.createElement(LightIcon, null, ball ? /*#__PURE__*/React.createElement(SunDark, null) : /*#__PURE__*/React.createElement(SunLight, null)), /*#__PURE__*/React.createElement(CheckBox, {
    themes: theme
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    onChange: handleBall
  }), /*#__PURE__*/React.createElement("label", {
    for: "checkbox"
  }, /*#__PURE__*/React.createElement(Ball, {
    trans: ball
  }))), /*#__PURE__*/React.createElement(DarkIcon, null, ball ? /*#__PURE__*/React.createElement(MoonDark, null) : /*#__PURE__*/React.createElement(MoonLight, null)))))), /*#__PURE__*/React.createElement(Body, null, /*#__PURE__*/React.createElement(Grid, null, /*#__PURE__*/React.createElement(ContentGraph, {
    id: "graph"
  }, /*#__PURE__*/React.createElement(Graph, null, /*#__PURE__*/React.createElement(SubTitle, null, ball ? /*#__PURE__*/React.createElement(IbopeDark, null) : /*#__PURE__*/React.createElement(Ibope, null), " Gr\xE1fico de Usu\xE1rios \xFAnicos (UV) \u2022 Hor\xE1rio do acesso (H)"), /*#__PURE__*/React.createElement(GraphContent, null, /*#__PURE__*/React.createElement(Chart, {
    chartType: "LineChart",
    data: state.graph,
    width: mobile ? '1200px' : '100%',
    height: "400px",
    options: renderOptions()
  }))), /*#__PURE__*/React.createElement(Graph, null, /*#__PURE__*/React.createElement(SubTitle, null, ball ? /*#__PURE__*/React.createElement(YoutubeDark, null) : /*#__PURE__*/React.createElement(Youtube, null), "Gr\xE1fico de Usu\xE1rios \xFAnicos (UV) \u2022 Hor\xE1rio do acesso (H)"), /*#__PURE__*/React.createElement(GraphContent, null, /*#__PURE__*/React.createElement(Chart, {
    chartType: "LineChart",
    data: state.graph,
    width: mobile ? '1200px' : '100%',
    height: "400px",
    options: renderOptions()
  })))), /*#__PURE__*/React.createElement(Infos, {
    id: "infos"
  }, /*#__PURE__*/React.createElement(SubTitle, null, "Audi\xEAncia em tempo real"), /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(InfoLogo, null, ball ? /*#__PURE__*/React.createElement(CNNLogo, null) : /*#__PURE__*/React.createElement(CNNLogoWhite, null)), /*#__PURE__*/React.createElement(InfoGeral, null, /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Youtube 955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Ibope 5.955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, null, /*#__PURE__*/React.createElement("strong", null, "Total 15.955.989 UV")))), /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(InfoLogo, null, /*#__PURE__*/React.createElement(GloboNewsLogo, null)), /*#__PURE__*/React.createElement(InfoGeral, null, /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Youtube 955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Ibope 5.955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, null, /*#__PURE__*/React.createElement("strong", null, "Total 15.955.989 UV")))), /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(InfoLogo, null, ball ? /*#__PURE__*/React.createElement(RecordNewsLogoDark, null) : /*#__PURE__*/React.createElement(RecordNewsLogo, null)), /*#__PURE__*/React.createElement(InfoGeral, null, /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Youtube 955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Ibope 5.955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, null, /*#__PURE__*/React.createElement("strong", null, "Total 15.955.989 UV")))), /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(InfoLogo, null, /*#__PURE__*/React.createElement(JPNewsLogo, null)), /*#__PURE__*/React.createElement(InfoGeral, null, /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Youtube 955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Ibope 5.955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, null, /*#__PURE__*/React.createElement("strong", null, "Total 15.955.989 UV")))), /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(InfoLogo, null, /*#__PURE__*/React.createElement(BandNewsLogo, null)), /*#__PURE__*/React.createElement(InfoGeral, null, /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Youtube 955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Ibope 5.955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, null, /*#__PURE__*/React.createElement("strong", null, "Total 15.955.989 UV")))))))));
});