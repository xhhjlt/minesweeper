import { Stack, Typography } from "@mui/material";
import Board from "./board";
import { useAppSelector } from "app/hooks";
import { beginnerLeaders, expertLeaders, intermediateLeaders } from "./leaderboardSlice";

export default function Leaderboard() {
  const beginner = useAppSelector(beginnerLeaders);
  const intermediate = useAppSelector(intermediateLeaders);
  const expert = useAppSelector(expertLeaders);
  return (
    <>
    <Typography variant="h4" align="center" mb="10px">Лучшие саперы</Typography>
    <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center">
      <Board records={beginner} title="Просто" />
      <Board records={intermediate} title="Средне" />
      <Board records={expert} title="Сложно" />
    </Stack>
    </>
  )
}