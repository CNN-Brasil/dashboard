import React, { useState, useMemo, useContext, useRef } from 'react';
import { Navigate } from "react-router-dom";
import { Container, Content, Header, Title, Types, TypesSpan, Graph, Grid, Body, Infos, Info, SubTitle, InfoLogo, InfoNumbers, InfoGeral, CheckBoxContent, CheckBox, LightIcon, DarkIcon, Ball } from './styles';
import { ContextReducer } from "../../reducer/AdminReducer";
import { ReactComponent as CNNLogo } from '../../assets/cnn_red.svg';
import { ReactComponent as CNNLogoWhite } from '../../assets/cnn.svg';
import { ReactComponent as GloboNewsLogo } from '../../assets/globonews.svg';
import { ReactComponent as RecordNewsLogo } from '../../assets/recordnews.svg';
import { ReactComponent as JPNewsLogo } from '../../assets/jp.svg';
import { ReactComponent as BandNewsLogo } from '../../assets/bandnews.svg';
import { ReactComponent as SunLight } from '../../assets/sun_light.svg';
import { ReactComponent as MoonLight } from '../../assets/moon_light.svg';
import { ReactComponent as SunDark } from '../../assets/sun_dark.svg';
import { ReactComponent as MoonDark } from '../../assets/moon_dark.svg';
import { Chart } from "react-google-charts";
export default (props => {
  const {
    state,
    dispatch
  } = useContext(ContextReducer);
  const [ball, setBall] = useState(false);
  const [theme, setTheme] = useState('light');
  const handleBall = () => {
    setBall(!ball);
    if (ball) {
      setTheme('light');
    } else {
      setTheme('dark');
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
      backgroundColor: 'transparent',
      chartArea: {
        width: "90%",
        height: "90%",
        left: 50,
        right: 0
      },
      vAxis: {
        baseline: 1,
        baseLineColor: '#000',
        format: 'short',
        textStyle: {
          fontSize: 18,
          color: ball ? '#fff' : '#464646'
        }
      },
      hAxis: {
        baseline: 1,
        baselineColor: 'blue',
        format: 'date',
        textStyle: {
          fontSize: 18,
          color: ball ? '#fff' : '#464646'
        }
      }
    };
    return options;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Container, {
    themes: theme
  }, /*#__PURE__*/React.createElement(Header, null, /*#__PURE__*/React.createElement(Grid, null, /*#__PURE__*/React.createElement(Content, null, /*#__PURE__*/React.createElement(CNNLogo, null), /*#__PURE__*/React.createElement(Title, null, "Audi\xEAncia em tempo real.")), /*#__PURE__*/React.createElement(Content, null, /*#__PURE__*/React.createElement(Types, {
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
  }))), /*#__PURE__*/React.createElement(DarkIcon, null, ball ? /*#__PURE__*/React.createElement(MoonDark, null) : /*#__PURE__*/React.createElement(MoonLight, null)))))), /*#__PURE__*/React.createElement(Body, null, /*#__PURE__*/React.createElement(Grid, null, /*#__PURE__*/React.createElement(Graph, null, /*#__PURE__*/React.createElement(SubTitle, null, "Gr\xE1fico de Usu\xE1rios \xFAnicos (UV) \u2022 Hor\xE1rio do acesso (H)"), /*#__PURE__*/React.createElement(Chart, {
    chartType: "LineChart",
    data: renderData(),
    width: "100%",
    height: "760px",
    options: renderOptions()
  })), /*#__PURE__*/React.createElement(Infos, null, /*#__PURE__*/React.createElement(SubTitle, null, "Audi\xEAncia em tempo real"), /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(InfoLogo, null, /*#__PURE__*/React.createElement(CNNLogoWhite, null)), /*#__PURE__*/React.createElement(InfoGeral, null, /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Youtube 955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Ibope 5.955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, null, /*#__PURE__*/React.createElement("strong", null, "Total 15.955.989 UV")))), /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(InfoLogo, null, /*#__PURE__*/React.createElement(GloboNewsLogo, null)), /*#__PURE__*/React.createElement(InfoGeral, null, /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Youtube 955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, {
    border: true
  }, "Ibope 5.955.989 UV"), /*#__PURE__*/React.createElement(InfoNumbers, null, /*#__PURE__*/React.createElement("strong", null, "Total 15.955.989 UV")))), /*#__PURE__*/React.createElement(Info, null, /*#__PURE__*/React.createElement(InfoLogo, null, /*#__PURE__*/React.createElement(RecordNewsLogo, null)), /*#__PURE__*/React.createElement(InfoGeral, null, /*#__PURE__*/React.createElement(InfoNumbers, {
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