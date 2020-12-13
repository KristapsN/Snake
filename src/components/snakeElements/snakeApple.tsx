import React from 'react';
import style from './snake.module.scss';

type Props = {
  xApple: number
  yApple: number
  eaten: boolean
};

export const SnakeApple = ({ xApple, yApple, eaten }: Props) => {

  return (
    <>
      {!eaten ? (
        <span className={style.apple} style={{ top: `${yApple}%`, left: `${xApple}%` }} />
      ) : (
        <span className={style.appleEaten} style={{ top: `${yApple}%`, left: `${xApple}%` }} />
      )}
    </>

  );
};