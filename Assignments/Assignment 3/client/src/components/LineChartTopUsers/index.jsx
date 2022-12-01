import { Typography, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../../theme";

const LineChartTopUsers = ({ data }) => {

  // Credits to: https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
  Date.prototype.minusDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
  }

  // Credits to: https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
  function getDates(numberOfPreviousDays) {
    var dateArray = new Array();
    var currentDate = new Date();
    var previousDate = new Date().minusDays(numberOfPreviousDays);
    while (currentDate > previousDate) {
        dateArray.push(new Date(currentDate).toLocaleDateString('default', {month: 'short', day: 'numeric'}));
        currentDate = currentDate.minusDays(1);
    }
    return dateArray.reverse();
  }

  const previousDays = getDates(7);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Sort data by date
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Find all unique users
  const parsedData = [];
  data.forEach(log => {
    if (!parsedData.some(e => e.id === log.requestee))
      parsedData.push({"id": log.requestee, data: previousDays.map(day => ({x: day, y: 0}))});
  })

  // Find the unique days that all APIs are logged for each user
  parsedData.forEach(user => (data.filter((log) => log.requestee === user.id)).forEach( (uniqueUserApiLog) => {
    var timestamp = new Date(uniqueUserApiLog.date).toLocaleDateString('default', {month: 'short', day: 'numeric'})
    // Check the current data is the timestamp data
    if (user.data.some(e => e.x === timestamp))
      user.data[user.data.findIndex(timeData => timeData.x === timestamp)] = {x: timestamp, y: (data.filter((log) => log.requestee === user.id)).filter((uniqueUserApiLog2) => new Date(uniqueUserApiLog2.date).toLocaleDateString('default', {month: 'short', day: 'numeric'}) === timestamp).length};
  }))

  return (
    <div style={{ height: 500, position: "relative", textAlign: "center"}}>
      <Typography variant="h3">Top API Users by ID</Typography>
      <ResponsiveLine
        data={parsedData}
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
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "0",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Date",
          legendOffset: 40,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "# API Calls",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "dark2" }}
        lineWidth={3}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        enableArea={true}
        areaOpacity={0.35}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 7,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default LineChartTopUsers;
