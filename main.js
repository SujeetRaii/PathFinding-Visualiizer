// /**********************
//  * GLOBAL SETUP
//  **********************/
// const gridElement = document.getElementById("grid");

// const ROWS = 20;
// const COLS = 40;

// const START = { row: 5, col: 5 };
// const END   = { row: 15, col: 35 };

// let grid = [];
// let mouseDown = false;
// let drawMode = "wall"; // wall | weight
// let visitedCounter = 0;

// /**********************
//  * UI HELPERS
//  **********************/
// function runSelectedAlgo() {
//   const algo = document.getElementById("algoSelect").value;

//   if (algo === "bfs") runBFS();
//   else if (algo === "dfs") runDFS();
//   else if (algo === "dijkstra") runDijkstra();
//   else if (algo === "astar") runAStar();
// }

// function setMode(mode) {
//   drawMode = mode;
// }

// function toggleTheme() {
//   document.body.classList.toggle("dark");
// }

// /**********************
//  * GRID CREATION
//  **********************/
// function createGrid() {
//   gridElement.innerHTML = "";
//   grid = [];

//   for (let r = 0; r < ROWS; r++) {
//     let row = [];
//     for (let c = 0; c < COLS; c++) {
//       const node = {
//         row: r,
//         col: c,
//         isWall: false,
//         weight: 1,
//         visited: false,
//         distance: Infinity,
//         previous: null,
//         element: document.createElement("div")
//       };

//       node.element.className = "node";

//       // 🔥 REQUIRED for touch-drag mapping
//       node.element.dataset.row = r;
//       node.element.dataset.col = c;

//       if (r === START.row && c === START.col)
//         node.element.classList.add("start");

//       if (r === END.row && c === END.col)
//         node.element.classList.add("end");

//       /* DESKTOP SUPPORT */
//       node.element.addEventListener("mousedown", (e) => {
//         e.preventDefault();
//         mouseDown = true;
//         applyDraw(node);
//       });

//       node.element.addEventListener("mouseenter", () => {
//         if (mouseDown) applyDraw(node);
//       });

//       /* MOBILE SUPPORT */
//       node.element.addEventListener("touchstart", (e) => {
//         e.preventDefault();
//         mouseDown = true;
//         applyDraw(node);
//       });

//       row.push(node);
//       gridElement.appendChild(node.element);
//     }
//     grid.push(row);
//   }
// }

// /**********************
//  * TOUCH DRAG (GLOBAL)
//  **********************/
// gridElement.addEventListener("touchmove", (e) => {
//   e.preventDefault();
//   if (!mouseDown) return;

//   const touch = e.touches[0];
//   const el = document.elementFromPoint(
//     touch.clientX,
//     touch.clientY
//   );

//   if (!el || !el.classList.contains("node")) return;

//   const r = el.dataset.row;
//   const c = el.dataset.col;

//   applyDraw(grid[r][c]);
// });

// /**********************
//  * STOP DRAWING
//  **********************/
// document.body.addEventListener("mouseup", () => {
//   mouseDown = false;
// });

// document.body.addEventListener("touchend", () => {
//   mouseDown = false;
// });

// /**********************
//  * DRAW LOGIC
//  **********************/
// function applyDraw(node) {
//   if (
//     node.element.classList.contains("start") ||
//     node.element.classList.contains("end")
//   ) return;

//   if (drawMode === "wall") {
//     node.isWall = !node.isWall;
//     node.weight = 1;
//     node.element.classList.toggle("wall");
//     node.element.classList.remove("weight");
//   }

//   if (drawMode === "weight") {
//     node.isWall = false;
//     node.weight = node.weight === 1 ? 5 : 1;
//     node.element.classList.toggle("weight");
//     node.element.classList.remove("wall");
//   }
// }

// /**********************
//  * HELPERS
//  **********************/
// function getNeighbors(node) {
//   const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
//   let res = [];

//   for (let [dr, dc] of dirs) {
//     const r = node.row + dr;
//     const c = node.col + dc;
//     if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
//       res.push(grid[r][c]);
//     }
//   }
//   return res;
// }

// function sleep(ms) {
//   return new Promise(res => setTimeout(res, ms));
// }

// function resetNodes() {
//   visitedCounter = 0;
//   document.getElementById("visitedCount").innerText = 0;
//   document.getElementById("timeTaken").innerText = 0;

//   for (let row of grid) {
//     for (let node of row) {
//       node.visited = false;
//       node.distance = Infinity;
//       node.previous = null;
//       node.element.classList.remove("visited", "path");
//     }
//   }
// }

// function clearGrid() {
//   createGrid();
// }

// /**********************
//  * PATH DRAW
//  **********************/
// async function drawPath(end) {
//   let cur = end.previous;
//   while (cur) {
//     cur.element.classList.add("path");
//     cur = cur.previous;
//     await sleep(20);
//   }
// }

// /**********************
//  * BFS
//  **********************/
// async function runBFS() {
//   resetNodes();
//   const t0 = performance.now();

//   const start = grid[START.row][START.col];
//   const end = grid[END.row][END.col];

//   let q = [start];
//   start.visited = true;

//   while (q.length) {
//     const node = q.shift();
//     node.element.classList.add("visited");
//     visitedCounter++;
//     document.getElementById("visitedCount").innerText = visitedCounter;

//     if (node === end) break;

//     for (let n of getNeighbors(node)) {
//       if (!n.visited && !n.isWall) {
//         n.visited = true;
//         n.previous = node;
//         q.push(n);
//       }
//     }
//     await sleep(15);
//   }

//   document.getElementById("timeTaken").innerText =
//     (performance.now() - t0).toFixed(2);

//   if (end.previous) drawPath(end);
// }

// /**********************
//  * DFS
//  **********************/
// async function runDFS() {
//   resetNodes();
//   const t0 = performance.now();

//   const start = grid[START.row][START.col];
//   const end = grid[END.row][END.col];

//   let stack = [start];

//   while (stack.length) {
//     const node = stack.pop();
//     if (node.visited || node.isWall) continue;

//     node.visited = true;
//     node.element.classList.add("visited");
//     visitedCounter++;
//     document.getElementById("visitedCount").innerText = visitedCounter;

//     if (node === end) break;

//     for (let n of getNeighbors(node)) {
//       if (!n.visited) {
//         n.previous = node;
//         stack.push(n);
//       }
//     }
//     await sleep(15);
//   }

//   document.getElementById("timeTaken").innerText =
//     (performance.now() - t0).toFixed(2);

//   if (end.previous) drawPath(end);
// }

// /**********************
//  * DIJKSTRA
//  **********************/
// async function runDijkstra() {
//   resetNodes();
//   const t0 = performance.now();

//   const start = grid[START.row][START.col];
//   const end = grid[END.row][END.col];

//   start.distance = 0;
//   let unvisited = grid.flat();

//   while (unvisited.length) {
//     unvisited.sort((a,b) => a.distance - b.distance);
//     const node = unvisited.shift();

//     if (node.isWall || node.distance === Infinity) break;

//     node.visited = true;
//     node.element.classList.add("visited");
//     visitedCounter++;
//     document.getElementById("visitedCount").innerText = visitedCounter;

//     if (node === end) break;

//     for (let n of getNeighbors(node)) {
//       const d = node.distance + n.weight;
//       if (d < n.distance) {
//         n.distance = d;
//         n.previous = node;
//       }
//     }
//     await sleep(15);
//   }

//   document.getElementById("timeTaken").innerText =
//     (performance.now() - t0).toFixed(2);

//   if (end.previous) drawPath(end);
// }

// /**********************
//  * A*
//  **********************/
// function heuristic(a, b) {
//   return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
// }

// async function runAStar() {
//   resetNodes();
//   const t0 = performance.now();

//   const start = grid[START.row][START.col];
//   const end = grid[END.row][END.col];

//   start.distance = 0;
//   let open = [start];

//   while (open.length) {
//     open.sort((a,b) =>
//       (a.distance + heuristic(a,end)) -
//       (b.distance + heuristic(b,end))
//     );

//     const node = open.shift();
//     node.visited = true;
//     node.element.classList.add("visited");
//     visitedCounter++;
//     document.getElementById("visitedCount").innerText = visitedCounter;

//     if (node === end) break;

//     for (let n of getNeighbors(node)) {
//       if (n.isWall || n.visited) continue;

//       const d = node.distance + n.weight;
//       if (d < n.distance) {
//         n.distance = d;
//         n.previous = node;
//         open.push(n);
//       }
//     }
//     await sleep(15);
//   }

//   document.getElementById("timeTaken").innerText =
//     (performance.now() - t0).toFixed(2);

//   if (end.previous) drawPath(end);
// }

// /**********************
//  * INIT
//  **********************/
// createGrid();














/**********************
 * GLOBAL SETUP
 **********************/
const gridElement = document.getElementById("grid");

const ROWS = 20;
const COLS = 40;

const START = { row: 5, col: 5 };
const END   = { row: 15, col: 35 };

let grid = [];
let mouseDown = false;
let drawMode = "wall"; // wall | weight
let visitedCounter = 0;
let isRunning = false;

/**********************
 * UI HELPERS
 **********************/
function setControlsDisabled(disabled) {
  document.querySelectorAll("button, select").forEach(el => {
    el.disabled = disabled;
  });
}

function runSelectedAlgo() {
  if (isRunning) return;

  const algo = document.getElementById("algoSelect").value;

  if (algo === "bfs") runBFS();
  else if (algo === "dfs") runDFS();
  else if (algo === "dijkstra") runDijkstra();
  else if (algo === "astar") runAStar();
}

// function setMode(mode) {
//   if (isRunning) return;
//   drawMode = mode;
// }

function setMode(mode) {
  drawMode = mode;
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}



/**********************
 * GRID CREATION
 **********************/
function createGrid() {
  gridElement.innerHTML = "";
  grid = [];

  for (let r = 0; r < ROWS; r++) {
    let row = [];
    for (let c = 0; c < COLS; c++) {
      const node = {
        row: r,
        col: c,
        isWall: false,
        weight: 1,
        visited: false,
        distance: Infinity,
        previous: null,
        element: document.createElement("div")
      };

      node.element.className = "node";
      node.element.dataset.row = r;
      node.element.dataset.col = c;

      if (r === START.row && c === START.col)
        node.element.classList.add("start");

      if (r === END.row && c === END.col)
        node.element.classList.add("end");

      /* DESKTOP */
      node.element.addEventListener("mousedown", (e) => {
        if (isRunning) return;
        e.preventDefault();
        mouseDown = true;
        applyDraw(node);
      });

      node.element.addEventListener("mouseenter", () => {
        if (mouseDown && !isRunning) applyDraw(node);
      });

      /* MOBILE */
      node.element.addEventListener("touchstart", (e) => {
        if (isRunning) return;
        e.preventDefault();
        mouseDown = true;
        applyDraw(node);
      });

      row.push(node);
      gridElement.appendChild(node.element);
    }
    grid.push(row);
  }
}

/**********************
 * TOUCH DRAG (GLOBAL)
 **********************/
gridElement.addEventListener("touchmove", (e) => {
  if (!mouseDown || isRunning) return;
  e.preventDefault();

  const touch = e.touches[0];
  const el = document.elementFromPoint(touch.clientX, touch.clientY);

  if (!el || !el.classList.contains("node")) return;

  const r = el.dataset.row;
  const c = el.dataset.col;
  applyDraw(grid[r][c]);
});

/**********************
 * STOP DRAWING
 **********************/
document.body.addEventListener("mouseup", () => {
  mouseDown = false;
});
document.body.addEventListener("touchend", () => {
  mouseDown = false;
});

/**********************
 * DRAW LOGIC
 **********************/
function applyDraw(node) {
  if (
    isRunning ||
    node.element.classList.contains("start") ||
    node.element.classList.contains("end")
  ) return;

  if (drawMode === "wall") {
    node.isWall = !node.isWall;
    node.weight = 1;
    node.element.classList.toggle("wall");
    node.element.classList.remove("weight");
  }

  if (drawMode === "weight") {
    node.isWall = false;
    node.weight = node.weight === 1 ? 5 : 1;
    node.element.classList.toggle("weight");
    node.element.classList.remove("wall");
  }
}

/**********************
 * HELPERS
 **********************/
function getNeighbors(node) {
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let res = [];

  for (let [dr, dc] of dirs) {
    const r = node.row + dr;
    const c = node.col + dc;
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
      res.push(grid[r][c]);
    }
  }
  return res;
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

function resetNodes() {
  visitedCounter = 0;
  document.getElementById("visitedCount").innerText = 0;
  document.getElementById("timeTaken").innerText = 0;

  for (let row of grid) {
    for (let node of row) {
      node.visited = false;
      node.distance = Infinity;
      node.previous = null;
      node.element.classList.remove("visited", "path");
    }
  }
}

function clearGrid() {
  if (isRunning) return;
  createGrid();
}

/**********************
 * PATH DRAW
 **********************/
async function drawPath(end) {
  let cur = end.previous;
  while (cur) {
    cur.element.classList.add("path");
    cur = cur.previous;
    await sleep(20);
  }
}

/**********************
 * BFS
 **********************/
async function runBFS() {
  isRunning = true;
  setControlsDisabled(true);
  resetNodes();

  const t0 = performance.now();
  const start = grid[START.row][START.col];
  const end = grid[END.row][END.col];

  let q = [start];
  start.visited = true;

  while (q.length) {
    const node = q.shift();
    node.element.classList.add("visited");
    visitedCounter++;
    document.getElementById("visitedCount").innerText = visitedCounter;

    if (node === end) break;

    for (let n of getNeighbors(node)) {
      if (!n.visited && !n.isWall) {
        n.visited = true;
        n.previous = node;
        q.push(n);
      }
    }
    await sleep(15);
  }

  document.getElementById("timeTaken").innerText =
    (performance.now() - t0).toFixed(2);

  if (end.previous) await drawPath(end);

  isRunning = false;
  setControlsDisabled(false);
}

/**********************
 * DFS
 **********************/
async function runDFS() {
  isRunning = true;
  setControlsDisabled(true);
  resetNodes();

  const t0 = performance.now();
  const start = grid[START.row][START.col];
  const end = grid[END.row][END.col];

  let stack = [start];

  while (stack.length) {
    const node = stack.pop();
    if (node.visited || node.isWall) continue;

    node.visited = true;
    node.element.classList.add("visited");
    visitedCounter++;
    document.getElementById("visitedCount").innerText = visitedCounter;

    if (node === end) break;

    for (let n of getNeighbors(node)) {
      if (!n.visited) {
        n.previous = node;
        stack.push(n);
      }
    }
    await sleep(15);
  }

  document.getElementById("timeTaken").innerText =
    (performance.now() - t0).toFixed(2);

  if (end.previous) await drawPath(end);

  isRunning = false;
  setControlsDisabled(false);
}

/**********************
 * DIJKSTRA
 **********************/
async function runDijkstra() {
  isRunning = true;
  setControlsDisabled(true);
  resetNodes();

  const t0 = performance.now();
  const start = grid[START.row][START.col];
  const end = grid[END.row][END.col];

  start.distance = 0;
  let unvisited = grid.flat();

  while (unvisited.length) {
    unvisited.sort((a,b) => a.distance - b.distance);
    const node = unvisited.shift();

    if (node.isWall || node.distance === Infinity) break;

    node.visited = true;
    node.element.classList.add("visited");
    visitedCounter++;
    document.getElementById("visitedCount").innerText = visitedCounter;

    if (node === end) break;

    for (let n of getNeighbors(node)) {
      const d = node.distance + n.weight;
      if (d < n.distance) {
        n.distance = d;
        n.previous = node;
      }
    }
    await sleep(15);
  }

  document.getElementById("timeTaken").innerText =
    (performance.now() - t0).toFixed(2);

  if (end.previous) await drawPath(end);

  isRunning = false;
  setControlsDisabled(false);
}

/**********************
 * A*
 **********************/
function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

async function runAStar() {
  isRunning = true;
  setControlsDisabled(true);
  resetNodes();

  const t0 = performance.now();
  const start = grid[START.row][START.col];
  const end = grid[END.row][END.col];

  start.distance = 0;
  let open = [start];

  while (open.length) {
    open.sort((a,b) =>
      (a.distance + heuristic(a,end)) -
      (b.distance + heuristic(b,end))
    );

    const node = open.shift();
    node.visited = true;
    node.element.classList.add("visited");
    visitedCounter++;
    document.getElementById("visitedCount").innerText = visitedCounter;

    if (node === end) break;

    for (let n of getNeighbors(node)) {
      if (n.isWall || n.visited) continue;
      const d = node.distance + n.weight;
      if (d < n.distance) {
        n.distance = d;
        n.previous = node;
        open.push(n);
      }
    }
    await sleep(15);
  }

  document.getElementById("timeTaken").innerText =
    (performance.now() - t0).toFixed(2);

  if (end.previous) await drawPath(end);

  isRunning = false;
  setControlsDisabled(false);
}

/**********************
 * INIT
 **********************/
createGrid();
