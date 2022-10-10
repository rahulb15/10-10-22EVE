import React, { useState,useEffect } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
import axios from "axios";
import moment from "moment";
// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import imgRegister from "../../images/verify.png";
import imgSignOut from "../../images/arrow.png";
import industryIcon from "../../images/icon-factory.png";
import TechnologyIcon from "../../images/icon-technology.png";
import FeatureIcon from "../../images/icon-feature.png";
import PortfolioIcon from "../../images/portfolio.png";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Tooltip } from "@mui/material";
import { CSVLink, CSVDownload } from "react-csv";
import CountUp from 'react-countup';

// const mainChartData = getMainChartData();


function GroupAvatars() {
  return (
    <AvatarGroup total={24}>
    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
  </AvatarGroup>
  );
}




const PieChartData = [
  { name: "Active", value: 900, color: "primary" },
  { name: "Inactive", value: 100, color: "secondary" },
  { name: "Idle", value: 50, color: "warning" },
  { name: "Busy", value: 200, color: "success" },
];

export default function Dashboard(props) {
  const [siteMember, setSiteMember] = useState(0);
  const [industry, setIndustry] = useState(0);
  const [technology, setTechnology] = useState(0);
  const [feature, setFeature] = useState(0);
  const [portfolio, setPortfolio] = useState(0);
  var classes = useStyles();
  var theme = useTheme();


useEffect(() => {
    const user = axios
        .get("http://localhost:3002/api/user?page=1&limit=1", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      industry = axios
        .get("http://localhost:3002/api/industry?page=1&limit=1", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      technology = axios
        .get("http://localhost:3002/api/technology?page=1&limit=1", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      feature = axios
        .get("http://localhost:3002/api/features?page=1&limit=1", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }),
      portfolio = axios
        .get("http://localhost:3002/api/portfolio?page=1&limit=1", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

    Promise.all([user, industry, technology, feature, portfolio]).then(
      axios.spread((...responses) => {
        const responseUser = responses[0];
        const responseIndustry = responses[1];
        const responseTechnology = responses[2];
        const responseFeature = responses[3];
        const responsePortfolio = responses[4];
        console.log(responseUser.data.meta.totalDocs);
        setSiteMember(responseUser.data.meta.totalDocs);
        setIndustry(responseIndustry.data.meta.totalDocs);
        setTechnology(responseTechnology.data.meta.totalDocs);
        setFeature(responseFeature.data.meta.totalDocs);
        setPortfolio(responsePortfolio.data.meta.totalDocs);
        setSiteMember(responseUser.data.meta.totalDocs);
        setIndustry(responseIndustry.data.meta.totalDocs);
        setTechnology(responseTechnology.data.meta.totalDocs);
        setFeature(responseFeature.data.meta.totalDocs);
        setPortfolio(responsePortfolio.data.meta.totalDocs);
      })
    );
  }
  , []);


  var [mainChartState, setMainChartState] = useState("monthly");
  console.log("mainChartState", mainChartState);

  return (
    <>
      <PageTitle title="Dashboard" button="Latest Reports" />
      <Grid container spacing={4}>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Site Members"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >

<div className={classes.visitsNumberContainer}>
              
              <Typography size="xl" weight="medium">
                <img src={imgRegister} alt="register" width="50" height="50" />
                <span style={{marginLeft:"150px"}}>{
                  siteMember
                }</span>
                
                
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Industry"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
          
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                <img src={industryIcon} alt="signout" width="50" height="50" />
                {/* <span style={{marginLeft:"150px"}}>{industry.length}</span> */}
                <span style={{marginLeft:"150px"}}>{industry}</span>

              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Technology"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                <img src={TechnologyIcon} alt="signout" width="50" height="50" />
                {/* <span style={{marginLeft:"150px"}}>{technology.length}</span> */}
                <span style={{marginLeft:"150px"}}>{technology}</span>

              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Features"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                <img src={FeatureIcon} alt="signout" width="50" height="50" />
                {/* <span style={{marginLeft:"150px"}}>{feature.length}</span> */}
                <span style={{marginLeft:"150px"}}>{feature}</span>

              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <Widget
            title="Portfolio"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                <img src={PortfolioIcon} alt="signout" width="50" height="50" />
                {/* <span style={{marginLeft:"150px"}}>{portfolio.length}</span> */}
                <span style={{marginLeft:"150px"}}>{portfolio}</span>

              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget
            bodyClass={classes.mainChartBody}
            header={
              <div className={classes.mainChartHeader}>
                <Typography
                  variant="h5"
                  color="text"
                  colorBrightness="secondary"
                >
                  Daily Line Chart
                </Typography>
                <div className={classes.mainChartHeaderLabels}>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="success" />
                    <Typography className={classes.mainChartLegentElement}>
                      Site Members
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Industry
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="warning" />
                    <Typography className={classes.mainChartLegentElement}>
                      Technology
                    </Typography>
                  </div>
                  <div className={classes.mainChartHeaderLabel}>
                    <Dot color="secondary" />
                    <Typography className={classes.mainChartLegentElement}>
                      Features
                    </Typography>
                    </div>
                    <div className={classes.mainChartHeaderLabel}>
                    <Dot color="info" />
                    <Typography className={classes.mainChartLegentElement}>
                      Portfolio
                    </Typography>
                    </div>
                </div>
                <Select
                  value={mainChartState}
                  onChange={e => setMainChartState(e.target.value)}
                  input={
                    <OutlinedInput
                      labelWidth={0}
                      classes={{
                        notchedOutline: classes.mainChartSelectRoot,
                        input: classes.mainChartSelect,
                      }}
                    />
                  }
                  autoWidth
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </div>
            }
          >
            
            <ResponsiveContainer width="100%" minWidth={500} height={350}>
              <ComposedChart
                margin={{ top: 0, right: -15, left: -15, bottom: 0 }}
                data={dataSwitcher(mainChartState)}
              >
                <YAxis
                  ticks={[0, 2500, 5000, 7500]}
                  tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                  stroke={theme.palette.text.hint + "80"}
                  tickLine={false}
                />
                
                {mainChartState === "monthly" ? (
                  <XAxis
                    dataKey="date"
                    tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    stroke={theme.palette.text.hint + "80"}
                    tickLine={false}
                    tickFormatter={date => moment(date).format("MMM D")}
                  />
                ) : mainChartState === "weekly" ? (
                  <XAxis
                    dataKey="date"
                    tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    stroke={theme.palette.text.hint + "80"}
                    tickLine={false}
                    // tickFormatter={date => moment(date).format("MMM D")}
                    //tickFormat for weekly
                  />
                ) : (
                  <XAxis
                    dataKey="date"
                    tick={{ fill: theme.palette.text.hint + "80", fontSize: 14 }}
                    stroke={theme.palette.text.hint + "80"}
                    tickLine={false}
                    tickFormatter={date => moment(date).format("MMM D")}
                  />
                )}
                <Tooltip
                  wrapperStyle={{
                    backgroundColor: theme.palette.primary.main,
                    border: "none",
                    boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.1)",
                    borderRadius: 10,
                  }}
                  contentStyle={{
                    backgroundColor: "transparent",
                    padding: 0,
                    margin: 0,
                  }}
                  labelStyle={{
                    fontWeight: "bold",
                    color: theme.palette.text.hint,
                  }}
                  cursor={false}
                  labelFormatter={date => moment(date).format("MMM D")}
                  formatter={(value, name) => [value, name]}
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.warning.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.warning.main} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.info.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.info.main} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.palette.success.main} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={theme.palette.success.main} stopOpacity={0} />
                  </linearGradient>
                </defs>

                <Area
                  type="monotone"
                  dataKey="siteMember"
                  fill={theme.palette.success.main}
                  stroke={theme.palette.success.main}
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                  fillOpacity={0.2}
                />
                <Line
                  type="monotone"
                  dataKey="industry"
                  stroke={theme.palette.primary.main}
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                />
                <Area
                  type="monotone"
                  dataKey="technology"
                  fill={theme.palette.warning.main}
                  stroke={theme.palette.warning.main}
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                  fillOpacity={0.2}
                />
                <Line
                  type="monotone"
                  dataKey="feature"
                  stroke={theme.palette.secondary.main}
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  fill={theme.palette.info.main}
                  stroke={theme.palette.info.main}
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                  fillOpacity={0.2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}


// #######################################################################
function getData() {
  return [
    {
      date: "2019-01-01",
      siteMember: 4000,
      industry: 2400,
      technology: 2400,
      feature: 5400,
      portfolio: 2400,
    },
    {
      date: "2019-01-02",
      siteMember: 3000,
      industry: 1398,
      technology: 2210,
      feature: 6210,
      portfolio: 2210,
    },
    {
      date: "2019-01-03",
      siteMember: 2000,
      industry: 9800,
      technology: 4290,
      feature: 2290,
      portfolio: 2290,
    },
    {
      date: "2019-01-04",
      siteMember: 2780,
      industry: 3908,
      technology: 2000,
      feature: 2000,
      portfolio: 2000,
    },
    {
      date: "2019-01-05",
      siteMember: 1890,
      industry: 4800,
      technology: 2181,
      feature: 2181,
      portfolio: 2181,
    },
    {
      date: "2019-01-06",
      siteMember: 2390,
      industry: 3800,
      technology: 2500,
      feature: 2500,
      portfolio: 2500,
    },
    {
      date: "2019-01-07",
      siteMember: 3490,
      industry: 4300,
      technology: 2100,
      feature: 2100,
      portfolio: 2100,
    },
  ];
}

//get data for weekly, monthly, daily
const getWeeklyData = () => {
  return [
    {
      date: "2019-01-01",
      siteMember: 3000,
      industry: 2400,
      technology: 8400,
      feature: 6400,
      portfolio: 1400,
    },
    {
      date: "2019-01-02",
      siteMember: 4000,
      industry: 9398,
      technology: 2210,
      feature: 6210,
      portfolio: 9210,
    },
    {
      date: "2019-01-03",
      siteMember: 2000,
      industry: 9800,
      technology: 4290,
      feature: 2290,
      portfolio: 2290,
    },
    {
      date: "2019-01-04",
      siteMember: 2780,
      industry: 3908,
      technology: 2000,
      feature: 2000,
      portfolio: 2000,
    },
    {
      date: "2019-01-05",
      siteMember: 1890,
      industry: 4800,
      technology: 2181,
      feature: 2181,
      portfolio: 2181,
    },
    {
      date: "2019-01-06",
      siteMember: 2390,
      industry: 3800,
      technology: 2500,
      feature: 2500,
      portfolio: 2500,
    },
    {
      date: "2019-01-07",
      siteMember: 3490,
      industry: 4300,
      technology: 2100,
      feature: 2100,
      portfolio: 2100,
    },
  ];
}

const getMonthlyData = () => {
  return [
    {
      date: "2019-01-01",
      siteMember: 4000,
      industry: 2400,
      technology: 2400,
      feature: 5400,
      portfolio: 2400,
    },
    {
      date: "2019-01-02",
      siteMember: 3000,
      industry: 1398,
      technology: 2210,
      feature: 6210,
      portfolio: 2210,
    },
    {
      date: "2019-01-03",
      siteMember: 2000,
      industry: 9800,
      technology: 4290,
      feature: 2290,
      portfolio: 2290,
    },
    {
      date: "2019-01-04",
      siteMember: 2780,
      industry: 3908,
      technology: 2000,
      feature: 2000,
      portfolio: 2000,
    },
    {
      date: "2019-01-05",
      siteMember: 1890,
      industry: 4800,
      technology: 2181,
      feature: 2181,
      portfolio: 2181,
    },
    {
      date: "2019-01-06",
      siteMember: 2390,
      industry: 3800,
      technology: 2500,
      feature: 2500,
      portfolio: 2500,
    },
    {
      date: "2019-01-07",
      siteMember: 3490,
      industry: 4300,
      technology: 2100,
      feature: 2100,
      portfolio: 2100,
    },
  ];
}

const getDailyData = () => {
  return [
    {
      date: "2019-01-01",
      siteMember: 4000,
      industry: 2400,
      technology: 2400,
      feature: 5400,
      portfolio: 2400,
    },
    {
      date: "2019-01-02",
      siteMember: 3000,
      industry: 1398,
      technology: 2210,
      feature: 6210,
      portfolio: 2210,
    },
    {
      date: "2019-01-03",
      siteMember: 2000,
      industry: 9800,
      technology: 4290,
      feature: 2290,
      portfolio: 2290,
    },
    {
      date: "2019-01-04",
      siteMember: 2780,
      industry: 3908,
      technology: 2000,
      feature: 2000,
      portfolio: 2000,
    },
    {
      date: "2019-01-05",
      siteMember: 1890,
      industry: 4800,
      technology: 2181,
      feature: 2181,
      portfolio: 2181,
    },
    {
      date: "2019-01-06",
      siteMember: 2390,
      industry: 3800,
      technology: 2500,
      feature: 2500,
      portfolio: 2500,
    },
    {
      date: "2019-01-07",
      siteMember: 3490,
      industry: 4300,
      technology: 2100,
      feature: 2100,
      portfolio: 2100,
    },
  ];
}

//data switcher for weekly, monthly, daily
const dataSwitcher = (data) => {
  switch (data) {
    case "weekly":
      return getWeeklyData();
    case "monthly":
      return getMonthlyData();
    case "daily":
      return getDailyData();
    default:
      return getData();
  }
}