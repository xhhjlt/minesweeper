/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography, IconButton, Stack, useTheme, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Cell, changeFlag, clearGameStats, difficulty, fillField, flagsNumber, gameField, generateField, isLose, isWin, openAround, openCell } from "./minesweeperSlice";
import { Mood, MoodBad, SentimentSatisfiedAlt } from "@mui/icons-material";
import { finishGame, isGameActive, isMuted, startGame } from "../container/containerSlice";
import { numberColor } from "./constants";
import { useEffect, useState } from "react";
import useSound from 'use-sound';
import { addNewRecord, checkTime, isModalOpened } from "components/leaderboard/leaderboardSlice";

export default function Minesweeper() {
  const theme = useTheme();
  const field = useAppSelector(gameField);
  const currentDifficulty = useAppSelector(difficulty)
  const flags = useAppSelector(flagsNumber);
  const isActive = useAppSelector(isGameActive);
  const lose = useAppSelector(isLose);
  const win = useAppSelector(isWin);
  const muted = useAppSelector(isMuted);
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(0);
  const [firstClick, setFirstClick] = useState(true);
  const [playerName, setPlayerName] = useState('');
  const openModal = useAppSelector(isModalOpened);
  const [playAudioWin] = useSound(`${process.env.PUBLIC_URL}/win.mp3`, { volume: 0.4 });
  const [playAudioLose] = useSound(`${process.env.PUBLIC_URL}/lose.wav`, { volume: 0.4 });
  const [timer, setTimer] = useState<NodeJS.Timer>();

  useEffect(() => {
    if (win && !lose && !firstClick) {
      dispatch(checkTime({ difficulty: currentDifficulty.difficulty, time }));
      if (!muted) playAudioWin();
      dispatch(finishGame());
      clearInterval(timer);
    }
    if (lose) {
      if (!muted && !win) playAudioLose();
      dispatch(finishGame());
      clearInterval(timer);
    }
  }, [win, lose])

  const clickHandler = (e: React.PointerEvent<HTMLDivElement>, cell: Cell) => {
    if (!isActive) return;
    if (e.button === 0) {
      if (firstClick) {
        setFirstClick(false);
        dispatch(fillField({ ...cell }));
        setTimer(setInterval(() => setTime((time) => time = time + 1), 1000));
      }
      dispatch(openCell({ ...cell }));
    } else if (e.button === 1) {
      dispatch(openAround({ ...cell }));
    }
  };

  const handleCloseModal = () => {
    dispatch(addNewRecord({ difficulty: currentDifficulty.difficulty, name: playerName, time }));
  };

  const restart = () => {
    setTime(0);
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
          {win && !lose ? <Mood color="success" /> : lose ? <MoodBad color="error" /> : <SentimentSatisfiedAlt color="primary" />}
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
                  {cell.value < 9 ? cell.value : '????'}
                </Typography>
                ) : (
                <Typography textAlign="center" fontWeight={1000} color="GrayText" sx={{userSelect: "none"}}>
                  {(lose && cell.value === 9 && cell.flag !== '????') ? '????' : (win && cell.value === 9) ? '????' : cell.flag }
                </Typography>)}
              </Box>
            ))}
          </Stack>
        ))}
      </Stack>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>???? ?????????????????? ?????????? ????????????!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ?????????????? ???????? ??????:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="??????"
            type="name"
            fullWidth
            variant="standard"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}