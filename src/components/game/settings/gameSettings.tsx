import { Button, FormControl, FormControlLabel, Input, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "app/hooks";
import { openGame, startGame } from "../container/containerSlice";
import { useState } from "react";

export default function GameSettings() {
  const dispatch = useAppDispatch();
  const [difficulty, setDifficulty] = useState('beginner');
  const [cols, setCols] = useState(5);
  const [rows, setRows] = useState(5);
  const [mines, setMines] = useState(10);

  const start = () => {
    dispatch(startGame());
    dispatch(openGame());
  };

  return (
    <>
      <FormControl sx={{mx: 'auto'}}>
        <Typography >Уровень сложности</Typography>
        <RadioGroup
          name="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          sx={{mx: 'auto'}}
  >
          <FormControlLabel value="beginner" control={<Radio />} label="Простой 8x8" />
          <FormControlLabel value="intermediate" control={<Radio />} label="Средний 16x16" />
          <FormControlLabel value="expert" control={<Radio />} label="Сложный 32x16" />
          <FormControlLabel value="custom" control={<Radio />} label="Особый" />
        </RadioGroup>
        <Stack height={difficulty === 'custom' ? 'auto' : 0} overflow={'hidden'}>
          Ширина: 
          <Input type="number" value={cols} onChange={(e) => {
            const numb = parseInt(e.target.value);
            const value = numb < 5 ? 5 : numb > 50 ? 50 : numb;
            const maxMines = rows * value;
            setCols(value);
            if (mines > maxMines) setMines(maxMines);
          }} />
          Высота: 
          <Input type="number" value={rows} onChange={(e) => {
            const numb = parseInt(e.target.value);
            const value = numb < 5 ? 5 : numb > 50 ? 50 : numb;
            const maxMines = cols * value;
            setRows(value);
            if (mines > maxMines) setMines(maxMines);
          }} />
          Мины: 
          <Input type="number" value={mines} onChange={(e) => {
            const numb = parseInt(e.target.value);
            const value = numb < 5 ? 5 : numb > cols * rows ? cols * rows : numb;
            setMines(value)
          }} />
        </Stack>
      </FormControl>
      <Button onClick={start}>Начать игру</Button>
    </>
  )
}