import React, { useReducer, useEffect } from "react";
import "./styles.css";
import Paddle from "./components/Paddle";

const initialState = {
  paddle1: {
    y: 0
  },
  paddle2: {
    y: 0
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE_1":
      return { ...state, paddle1: action.payload };
    case "MOVE_PADDLE_2":
      return { ...state, paddle2: action.payload };
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleKey(e) {
    const char = e.key.toLowerCase();
    if (char === "w" || char === "s") {
      dispatch({
        type: "MOVE_PADDLE_1",
        payload: {
          y: state.paddle1.y + (char === "w" ? -10 : 10)
        }
      });
    }
    if (char === "o" || char === "l") {
      dispatch({
        type: "MOVE_PADDLE_2",
        payload: {
          y: state.paddle2.y + (char === "o" ? -10 : 10)
        }
      });
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [state]);
  return (
    <div className="container">
      <Paddle paddleY={state.paddle1.y} />
      <Paddle isPlayerTwo paddleY={state.paddle2.y} />
    </div>
  );
}

// export default function App() {
//   const [p1PaddleY, setP1PaddleY] = useState(0);
//   const [p2PaddleY, setP2PaddleY] = useState(0);

//   function handleKey(e) {
//     const char = e.key.toLowerCase();
//     if (char === "w" || char === "s") {
//       setP1PaddleY(p1PaddleY + (char === "w" ? -10 : 10));
//     }
//     if (char === "o" || char === "l") {
//       setP2PaddleY(p2PaddleY + (char === "o" ? -10 : 10));
//     }
//   }
//   useEffect(() => {
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [p1PaddleY, p2PaddleY]);
//   return (
//     <div className="container">
//       <Paddle paddleY={p1PaddleY} />
//       <Paddle isPlayerTwo paddleY={p2PaddleY} />
//       <Ball />
//     </div>
//   );
// }
