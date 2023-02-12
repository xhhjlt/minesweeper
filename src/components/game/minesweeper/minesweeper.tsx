import { Box, Typography, IconButton, Stack, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Cell, changeFlag, fillField, flagsNumber, gameField, minesNumber, openAround, openCell } from "./minesweeperSlice";
import { Mood } from "@mui/icons-material";
import { isGameActive } from "../container/containerSlice";
import { numberColor } from "./constants";
import { useEffect, useState } from "react";

export default function Minesweeper() {
  const theme = useTheme();
  const field = useAppSelector(gameField);
  const mines = useAppSelector(minesNumber);
  const flags = useAppSelector(flagsNumber);
  const isActive = useAppSelector(isGameActive);
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(0);
  const [firstClick, setFirstClick] = useState(true);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTime((t) => t + 1);
    }, 1000);
  }, [time]);

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

  const menuHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cell: Cell) => {
    e.nativeEvent.preventDefault();
    if (!isActive) return;
    dispatch(changeFlag({ ...cell }));
  }

  return (
    <Box m="auto">
      <Stack direction="row" justifyContent="space-evenly" alignItems="center" maxWidth="100vw" m="auto">
        <Typography variant="h6">{mines - flags}</Typography>
        <IconButton>
          <Mood />
        </IconButton>
        <Typography variant="h6">{time}</Typography>
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
                <Typography textAlign="center" fontWeight={1000} color={numberColor[cell.value]} sx={{userSelect: "none"}}>
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