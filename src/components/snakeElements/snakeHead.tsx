import React from 'react';
import style from './snake.module.scss';

type Props = {
  x: number
  y: number
};

export const SnakeHead = ({ x, y }: Props) => {

  return (
    <>
      <span className={style.snake} style={{ top: `${y}%`, left: `${x}%` }} />
    </>

  );
};