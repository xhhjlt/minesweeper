import { Button } from "@mui/material";
import { useAppDispatch } from "app/hooks";
import { openGame, startGame } from "../container/containerSlice";

export default function GameSettings() {
  const dispatch = useAppDispatch();

  const start = () => {
    dispatch(startGame());
    dispatch(openGame());
  };

  return (
    <>
      Settings
      <Button onClick={start}>Начать игру</Button>
    </>
  )
}