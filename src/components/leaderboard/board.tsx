import { Divider, Paper, Stack, Typography } from "@mui/material";
import { Record } from "./leaderboard";

interface BoardProps {
  records: Array<Record>
}

export default function Board({ records }: BoardProps) {
  return (
    <Paper elevation={10} sx={{m: 1, p: 1, maxWidth: 500, mx: 'auto'}}>
      <Typography variant="h4" align="center">Лучшие саперы</Typography>
      <Stack divider={<Divider />}>
      {records.map((record, index) => (
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Typography>{index + 1}.{record.name} : </Typography>
          <Typography>{record.time} сек</Typography>
        </Stack>
      ))}
      </Stack>
    </Paper>
  )
}