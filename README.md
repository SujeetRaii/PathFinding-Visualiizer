# Pathfinding Visualizer

An interactive web application that visualizes popular pathfinding algorithms on a grid.  
The project helps in understanding how different algorithms explore nodes and find paths under various conditions.

---

## 🔗 Live Demo
👉 https://pathviz-dsa.netlify.app/

---

## 🚀 Features

- Visualizes multiple pathfinding algorithms
- Supports **walls** and **weighted nodes**
- Real-time step-by-step traversal animation
- Displays **visited node count** and **execution time**
- Mobile-friendly (touch + drag support)
- Dark mode UI
- Controls are disabled while an algorithm is running to avoid inconsistent states

---

## 🧠 Algorithms Implemented

- **Breadth-First Search (BFS)**  
  - Finds the shortest path in unweighted grids

- **Depth-First Search (DFS)**  
  - Explores deeply, does not guarantee shortest path

- **Dijkstra’s Algorithm**  
  - Finds the minimum-cost path in weighted grids

- **A\***  
  - Optimized version of Dijkstra using heuristics for faster search

---

## ⚙️ How It Works

1. Select an algorithm from the dropdown.
2. Draw walls or weighted nodes on the grid.
3. Click **Run** to start visualization.
4. During execution, all controls are disabled.
5. The algorithm explores nodes step by step.
6. The highlighted path shows the final result.

---

## 📊 What This Project Demonstrates

- Difference between unweighted and weighted pathfinding
- Why BFS fails on weighted graphs
- How Dijkstra and A* correctly minimize total path cost
- Performance comparison using time and visited nodes
- Importance of heuristics in reducing search space

---

## 🛠️ Tech Stack

- **HTML**
- **CSS**
- **JavaScript (Vanilla)**

No frameworks were used to keep algorithm logic transparent and easy to understand.

---

## 📱 Mobile Support

- Tap to place walls or weights
- Touch and drag to draw continuously
- Scroll disabled on grid during interaction for better UX


