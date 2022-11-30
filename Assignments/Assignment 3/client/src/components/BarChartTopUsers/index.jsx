import { Typography, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";

const BarChartTopUsers = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const parsedData = [];
  const uniqueUsers = [];

  // Filter each unique endpoint
  data.forEach(log => {
    if (!parsedData.some(e => e.Endpoint === log.pathName))
      parsedData.push({"Endpoint": log.pathName});
  })

  // Find all unique users
  data.forEach(log => {
    if (!uniqueUsers.some(e => e === log.requestee))
      uniqueUsers.push(log.requestee);
  })

  // Find the count of all Endpoints by Users
  parsedData.forEach( (endpoint) => (uniqueUsers.forEach( (user) => {
    endpoint[user] = data.filter((log) => log.requestee === user && endpoint.Endpoint === log.pathName).length;
  })))

  return (
    <div
      style={{
        height: 500,
        width: 550,
        position: "relative",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">Top User For Each Endpoint</Typography>
      <ResponsiveBar
        data={parsedData}
        keys={uniqueUsers}
        indexBy="Endpoint"
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100]
              },
            },
            legend: {
              text: {
                fill: colors.grey[100]
              }
            },
            ticks: {
              line: {
                stroke: colors.grey[100]
              },
              text: {
                fill: colors.grey[100]
              }
            }
          },
          legends: {
            text: {
              fontSize: 8,
              fill: colors.grey[100]
            }
          },
          tooltip: {
            container: {
              color: "black",
            }
          }
        }}
        margin={{ top: 30, right: 110, bottom: 100, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -60,
          legend: "Endpoint",
          legendPosition: "middle",
          legendOffset: 20,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "# API Calls",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 8,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return (
            e.id + ": " + e.formattedValue + " in country: " + e.indexValue
          );
        }}
      />
    </div>
  );
};

export default BarChartTopUsers;
