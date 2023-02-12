import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "app/hooks";
import { openGame, startGame } from "../container/containerSlice";
import { useState } from "react";
import { generateField } from "../minesweeper/minesweeperSlice";
import { DifficultyLevels, levels } from "./constants";

export default function GameSettings() {
  const dispatch = useAppDispatch();
  const [difficulty, setDifficulty] = useState(DifficultyLevels.beginner);
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [mines, setMines] = useState(10);

  const start = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (difficulty === DifficultyLevels.custom) {
      dispatch(generateField({ height, width, mines }));
    } else {
      dispatch(generateField(levels[difficulty]));
    }
    dispatch(startGame());
    dispatch(openGame());
  };

  return (
    <Box component="form" onSubmit={start} flexDirection="column" mx="auto">
      <FormControl>
        <Typography >Уровень сложности</Typography>
        <RadioGroup
          name="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as DifficultyLevels)}
          sx={{mx: 'auto'}}
        >
          <FormControlLabel value={DifficultyLevels.beginner} control={<Radio />} label="Простой: 8x8, 10 мин" />
          <FormControlLabel value={DifficultyLevels.intermediate} control={<Radio />} label="Средний: 16x16, 40 мин" />
          <FormControlLabel value={DifficultyLevels.expert} control={<Radio />} label="Сложный: 32x16, 100 мин" />
          <FormControlLabel value={DifficultyLevels.custom} control={<Radio />} label="Особый" />
        </RadioGroup>
        <Stack height={difficulty === 'custom' ? 'auto' : 0} overflow={'hidden'}>
          Ширина: 
          <input type="number" value={width} min={5} max={50} onChange={(e) => {
            const value = parseInt(e.target.value);
            const maxMines = height * value;
            setWidth(value);
            if (mines > maxMines) setMines(maxMines);
          }} />
          Высота: 
          <input type="number" value={height} min={5} max={50} onChange={(e) => {
            const value = parseInt(e.target.value);
            const maxMines = width * value;
            setHeight(value);
            if (mines > maxMines) setMines(maxMines);
          }} />
          Мины: 
          <input type="number" value={mines} min={1} max={width*height} onChange={(e) => {
            const value = parseInt(e.target.value);
            setMines(value)
          }} />
        </Stack>
      <Button type="submit">Начать игру</Button>
      </FormControl>
    </Box>
  )
}