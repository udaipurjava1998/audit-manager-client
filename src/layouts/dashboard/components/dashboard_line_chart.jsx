import { Card } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React from "react"

const DashbaordLineChart = (props) => {
  const uData = [4000, 3000, 2000, 2780, 1890];
  const pData = [2400, 1398, 9800, 3908, 4800];
  const xLabels = [
    'COLOR-NAME',
    'PATTERN',
    'MATERIAL',
    'RELEASE-DATE',
    'STATUS',
  ];
  return (
    <>
      <Card>
        <LineChart
          width={500}
          height={300}
          series={[
            { data: pData, label: 'Attribute Changes' },
            { data: uData, label: 'Object Changes' },
          ]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
        />
      </Card>
    </>
  )
};

export default DashbaordLineChart;
