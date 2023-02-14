import { Divider, Paper, Stack, Typography } from "@mui/material";
import { Record } from "./leaderboardSlice";

interface BoardProps {
  records: Array<Record>,
  title: string,
}

export default function Board({ records, title }: BoardProps) {

  return (
    <Stack justifyContent="center" height="100%">
    <Paper elevation={10} sx={{m: 1, p: 1, mx: 'auto'}}>
      <Typography variant="h5" align="center" mb="10px">{title}</Typography>
      <Stack divider={<Divider />}>
      {records.map((record, index) => (
        <Stack key={`${record.name}${record.time}${index}`} direction="row" justifyContent="space-between" spacing={1}>
          <Typography>{index + 1}.{record.name} : </Typography>
          <Typography>{(record.time - record.time % 60) / 60} мин {record.time % 60} сек</Typography>
        </Stack>
      ))}
      </Stack>
    </Paper>
    </Stack>
  )
}