import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';


export default function ServiceRequestChart( { Skeleton }) {

const transactions = {
  success: 1200,
  failed: 300,
};

const totalTransactions = transactions.success + transactions.failed;

const normalize = (value, total) => (value / total) * 100;

// Create the formatted data
const transactionData = [
  {
    label: 'Success',
    value: normalize(transactions.success, totalTransactions),
  },
  {
    label: 'Failed',
    value: normalize(transactions.failed, totalTransactions),
  },
];

const valueFormatter = (item) => `${item.value.toFixed(2)}%`;

  return (
    <Skeleton height={210} sx={{padding: "3%"}} fontSiz>
    <Box sx={{ width: '100%' }}>
      <Typography mb={1}>
        Service Request Overview
      </Typography>
      <PieChart
        height={150}
        series={[
          {
            data: transactionData,
            innerRadius: 50,
            arcLabelMinAngle: 30,
            labelKey: 'label',
            valueFormatter,
          },
        ]}
      />
    </Box>
    </Skeleton>
  );
}