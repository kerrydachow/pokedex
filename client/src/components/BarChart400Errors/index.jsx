import { Typography, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";

const BarChart400Errors = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const parsedData = [];
  const statusCodes = [];

  // Filter each unique endpoint
  data.forEach(log => {
    if (!parsedData.some(e => e.Endpoint === log.pathName))
      parsedData.push({"Endpoint": log.pathName});
  })

  // Find all unique users
  data.forEach(log => {
    if (!statusCodes.some(e => e === log.statusCode))
    statusCodes.push(log.statusCode);
  })

  // Find the count of all Endpoints by Users
  parsedData.forEach( (endpoint) => (statusCodes.forEach( (status) => {
    endpoint[status] = data.filter((log) => log.statusCode === status && endpoint.Endpoint === log.pathName).length;
  })))

  return (
    <div
      style={{
        height: 500,
        position: "relative",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">4xx Errors by Endpoint</Typography>
      <ResponsiveBar
        data={parsedData}
        keys={statusCodes}
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
        colors={{ scheme: "accent" }}
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
              id: 404,
            },
            id: "dots",
          },
          {
            match: {
              id: 400,
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
          tickRotation: -55,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "# Errors",
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

export default BarChart400Errors;
