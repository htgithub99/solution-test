import logo from "./logo.svg";
import "./App.css";

function App() {
  function solution(scores) {
    const n = scores.length;
    const sum = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      sum[i] = scores[i][0] + scores[i][1];
    }

    const sortedIndices = [...Array(n).keys()].sort((a, b) => {
      return sum[b] - sum[a];
    });

    // remove employees with low scores in both categories
    let i = 0;
    while (i < sortedIndices.length - 1) {
      const idx = sortedIndices[i];
      const nextIdx = sortedIndices[i + 1];
      if (
        scores[idx][0] < scores[nextIdx][0] &&
        scores[idx][1] < scores[nextIdx][1]
      ) {
        sortedIndices.splice(i, 1);
      } else {
        i++;
      }
    }

    const ranks = new Array(n).fill(-1);
    let rank = 1;
    for (let i = 0; i < sortedIndices.length; i++) {
      const idx = sortedIndices[i];
      if (i === 0 || sum[idx] < sum[sortedIndices[i - 1]]) {
        rank = i + 1;
      }
      ranks[idx] = rank;
    }

    // find IU's rank
    let iuRank = -1;
    for (let i = 0; i < n; i++) {
      if (sum[i] > sum[scores.length - 1]) {
        iuRank = ranks[i];
        break;
      }
    }

    return iuRank;
  }

  alert(
    solution([
      [2, 2],
      [1, 4],
      [3, 2],
      [3, 2],
      [2, 1],
    ])
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
