import { Fullscreen, FullscreenExit, Settings, VolumeOff, VolumeUp } from "@mui/icons-material";
import { ButtonGroup, IconButton, Paper, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useRef, useState } from "react";
import { isGameOpened as gameOpened, mute, isMuted as muted, openSettings, unmute } from "./containerSlice";
import Minesweeper from "../minesweeper/minesweeper";
import GameSettings from "../settings/gameSettings";

export default function GameContainer() {
  const isMuted = useAppSelector(muted);
  const isGameOpened = useAppSelector(gameOpened);
  const conteiner = useRef(null);
  const dispatch = useAppDispatch();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleMute = () => {
    if (isMuted) {
      dispatch(unmute());
    } else {
      dispatch(mute());
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const box = conteiner.current as unknown as HTMLElement;
      box.requestFullscreen().then(() => setIsFullscreen(true));
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  return (
    <Paper elevation={10} sx={{pb: '5px', height: '100%'}} ref={conteiner}>
      <Stack height='100%'>
        <ButtonGroup sx={{ml: 'auto'}}>
          {isGameOpened && <IconButton onClick={() => dispatch(openSettings())}>
            <Settings />
          </IconButton>}
          <IconButton onClick={toggleMute}>
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
          <IconButton onClick={toggleFullscreen}>
            {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
        </ButtonGroup>
        <Stack justifyContent='center' height='100%' overflow='auto'>
          {isGameOpened ? <Minesweeper /> : <GameSettings />}
        </Stack>
      </Stack>
    </Paper>
  );
}