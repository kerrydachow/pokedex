import React from "react";
import { Typography, useTheme } from "@mui/material";
import { ResponsiveCalendar } from "@nivo/calendar";
import { tokens } from "../../theme";

const CalendarChartUniqueUsers = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const parsedData = [];

  data.forEach(log => {
    if (!parsedData.some(e => e.day === new Date(log.date).toLocaleDateString('fr-CA').split('T')[0]))
      parsedData.push({"day": new Date(log.date).toLocaleDateString('fr-CA').split('T')[0]});
  })

  // Find unique users
  parsedData.forEach( (day) => {
    const loggedUsers = [];
    let uniqueUserCount = 0;
    data.forEach( (log) => {
      if (day.day === new Date(log.date).toLocaleDateString('fr-CA').split('T')[0]) {
        if (!loggedUsers.includes(log.requestee)) {
          loggedUsers.push(log.requestee);
          uniqueUserCount++;
        }
      }
    })
    day.value = uniqueUserCount;
  })
  
  return (
    <div
      style={{
        height: 500,
        position: "relative",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">Unique Users of 2022</Typography>
      <ResponsiveCalendar
        data={parsedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fontSize: 8,
              fill: colors.grey[100],
            },
          },
          tooltip: {
            container: {
              color: "black",
            },
          },
          labels: {
            text: {
              fill: colors.grey[100]
            }
          }
        }}
        from="2022-01-02"
        to="2022-12-31"
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: -150, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      />
    </div>
  );
};

export default CalendarChartUniqueUsers;
