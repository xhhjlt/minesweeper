/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography, IconButton, Stack, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Cell, changeFlag, clearGameStats, difficulty, fillField, flagsNumber, gameField, generateField, isLose, isWin, openAround, openCell } from "./minesweeperSlice";
import { Mood, MoodBad, SentimentSatisfiedAlt } from "@mui/icons-material";
import { finishGame, isGameActive, startGame } from "../container/containerSlice";
import { numberColor } from "./constants";
import { useEffect, useState } from "react";

export default function Minesweeper() {
  const theme = useTheme();
  const field = useAppSelector(gameField);
  const currentDifficulty = useAppSelector(difficulty)
  const flags = useAppSelector(flagsNumber);
  const isActive = useAppSelector(isGameActive);
  const lose = useAppSelector(isLose);
  const win = useAppSelector(isWin);
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [firstClick, setFirstClick] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (isActive) setTime(Math.trunc((Date.now() - startTime)/1000));
    }, 1000);
  }, [time, isActive, startTime]);

  useEffect(() => {
    if (lose) dispatch(finishGame());
  }, [lose])

  useEffect(() => {
    if (win) dispatch(finishGame());
  }, [win])

  const clickHandler = (e: React.PointerEvent<HTMLDivElement>, cell: Cell) => {
    if (!isActive) return;
    if (e.button === 0) {
      if (firstClick) {
        setFirstClick(false);
        dispatch(fillField({ ...cell }));
      }
      dispatch(openCell({ ...cell }));
    } else if (e.button === 1) {
      dispatch(openAround({ ...cell }));
    }
  };

  const restart = () => {
    setTime(0);
    setStartTime(Date.now());
    dispatch(clearGameStats())
    dispatch(generateField(currentDifficulty));
    setFirstClick(true);
    dispatch(startGame());
  };

  const menuHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cell: Cell) => {
    e.nativeEvent.preventDefault();
    if (!isActive || cell.opened) return;
    dispatch(changeFlag({ ...cell }));
  }

  return (
    <Box m="auto">
      <Stack direction="row" justifyContent="space-evenly" alignItems="center" maxWidth="100vw" m="auto">
        <Typography textAlign="left" minWidth={35} variant="h6">{currentDifficulty.mines - flags}</Typography>
        <IconButton onClick={restart}>
          {win ? <Mood color="success" /> : lose ? <MoodBad color="error" /> : <SentimentSatisfiedAlt color="primary" />}
        </IconButton>
        <Typography textAlign="right" minWidth={35} variant="h6">{time}</Typography>
      </Stack>
      <Stack border="grey solid 1px">
        {field.map((row, i) => (
          <Stack key={i} direction="row">
            {row.map((cell) => (
              <Box
                  key={`${cell.x}${cell.y}!`} width={24} height={24} border={cell.opened ? 'grey dotted 1px' : ''}
                  onPointerUp={(e) => clickHandler(e, cell)}
                  onContextMenu={(e) => menuHandler(e, cell)}
                  boxShadow={cell.opened ? '' : 'inset 2px 2px gray, inset -2px -2px black'}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[900],
                  }}
              >
                {cell.opened ? (
                <Typography textAlign="center" fontWeight={1000} bgcolor={cell.value === 9 ? 'red' : 'inherit'} color={numberColor[cell.value]} sx={{userSelect: "none"}}>
                  {cell.value < 9 ? cell.value : '💣'}
                </Typography>
                ) : (
                <Typography textAlign="center" fontWeight={1000} color="GrayText" sx={{userSelect: "none"}}>
                  {cell.flag}
                </Typography>)}
              </Box>
            ))}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}