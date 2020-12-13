import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import 'flexboxgrid';
import { SnakeHead } from './components/snakeElements/snakeHead';
import { SnakeApple } from './components/snakeElements/snakeApple';

const App = () => {

  const [snakeHead, setSnakeHead] = useState([
    [0, 0],
    [2, 0],
    [4, 0]
  ]);
  const [snakeApples, setSnakeApples] = useState([
    { id: 0, xApple: 12, yApple: 0, eaten: false },
    { id: 0, xApple: 14, yApple: 0, eaten: false },
    { id: 0, xApple: 16, yApple: 0, eaten: false },
    { id: 0, xApple: 18, yApple: 0, eaten: false },
    { id: 1, xApple: 22, yApple: 56, eaten: false },
    { id: 2, xApple: 16, yApple: 16, eaten: false },
    { id: 3, xApple: 32, yApple: 78, eaten: false },
  ]);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [input, setInput] = useState('ArrowRight');
  const handleKeyPress = (event: { key: string; }) => {
    setInput(event.key);
  };

  document.body.addEventListener('keydown', handleKeyPress);

  const moveSnake = () => {
    const dots = [...snakeHead];
    const snakeStart = dots.length - 1;
    switch (input) {
      case 'ArrowRight':
        snakeHead[snakeStart] = [snakeHead[snakeStart][0] + 2,
          snakeHead[snakeStart][1] + 0];
        break;
      case 'ArrowLeft':
        snakeHead[snakeStart] = [snakeHead[snakeStart][0] - 2,
          snakeHead[snakeStart][1] + 0];
        break;
      case 'ArrowUp':
        snakeHead[snakeStart] = [snakeHead[snakeStart][0] + 0,
          snakeHead[snakeStart][1] - 2];
        break;
      case 'ArrowDown':
        snakeHead[snakeStart] = [snakeHead[snakeStart][0] + 0,
          snakeHead[snakeStart][1] + 2];
        break;
    }
    dots.push(snakeHead[snakeStart]);
    dots.shift();
    setSnakeHead(dots);
    snakeApples.map(({ xApple, yApple }, index) => {
      if (snakeHead[snakeStart][0] === xApple &&
         snakeHead[snakeStart][1] === yApple) {
        dots.push(snakeHead[snakeStart]);
        snakeApples[index].eaten = !snakeApples[index].eaten;
        setSnakeApples(snakeApples);
      }
      if (snakeHead[0][0] === xApple && snakeHead[0][1] === yApple) {
        snakeApples.splice(index, 1);

        setSnakeApples(snakeApples);
      }
      if (snakeHead[snakeStart][0] > 100 || snakeHead[snakeStart][0] < 0 ||
        snakeHead[snakeStart][1] > 100 || snakeHead[snakeStart][1] < 0) {
        setIsActive(false);
        setResult('You Lose!');
      }
      if (snakeApples.length === 0) {
        setIsActive(false);
        setResult('You Won!');
      }
      // if (snakeHead[snakeStart][0] === snakeHead[snakeStart-1][0] && snakeHead[snakeStart][1] === snakeHead[snakeStart-1][1]){

      // }
      // if (dots[snakeStart]=== dots[snakeStart-1].find(item => dots[snakeStart] )){
      //   console.log('Crash');
      // }
      console.log(dots[snakeStart]);


    });
  };

  const reset = () => {
    setSeconds(0);
    setIsActive(!isActive);
  };

  let setId: string;
  useEffect(() => {
    setId = uuidv4();
    let interval = 0;
    if (isActive) {
      moveSnake();
      // @ts-ignore
      interval = setTimeout(() => {
        let count = seconds;
        setSeconds(count += 1);

      }, 100);
    } else if (!isActive && seconds !== 0) {
      clearTimeout(interval);
    }
    return () => clearTimeout(interval);
  }, [isActive, seconds]);


  return (
    <div className='container'>
      <div className="row center-xs">
        <div className="col-xs-6">
          <h2>{seconds/10}</h2>
          <h3>{result}</h3>

          <button type='button' onClick={() => reset()}>Pause</button>
          <div className="game--area">
            {snakeHead.map((item, index) =>
              <div key={setId}>
                <SnakeHead
                  x={item[0]}
                  y={item[1]}
                />
              </div>
            )}
            {snakeApples.map(({ id, xApple, yApple, eaten }) =>
              <div key={setId}>
                <SnakeApple
                  xApple={xApple}
                  yApple={yApple}
                  eaten={eaten}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
