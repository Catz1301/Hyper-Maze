class GenerateMaze {
  static GenerateNewMaze(currentCell = undefined, recursive_call = false) {
		//cells.length = 0;
    if (!(cells.length > 0)) {
			try
			{
				throw new Error("You need to initialize GenerateMaze with 'GenerateMaze.init()' first!");
			} catch (e) {
				console.error(e);
			}
			return;
		}
		let current;
		if (currentCell == undefined)
			current = cells[0];
		else
			current = currentCell;
		//console.dir(current);
		current.visited = true;
		/**** STEP 1 ****/
		let next = current.checkNeighbors();
		if (next) {
			next.visited = true;
			/**** STEP 2 ****/
			stack.push(current);
			/**** STEP 3 ****/
			GenerateMaze.removeWall(current, next, true);
			/**** STEP 4 ****/
			current = next;
			//redraw();
			GenerateMaze.GenerateNewMaze(current);
		} else if (stack.length > 0) {
			current = stack.pop();
			GenerateMaze.GenerateNewMaze(current, true);
		} else {
			console.log("done");
		}
  }
	
  static removeWall(curr, nxt) {
    let removing = {
			currentCell: -1,
			nextCell: -1
		};
		let x = curr.x - nxt.x;
		if (x === 1) {
			removing.currentCell = 1;
			removing.nextCell = 3;
		} else if (x === -1) {
			removing.currentCell = 3;
			removing.nextCell = 1;
		}
		let y = curr.y - nxt.y;
		if (y === 1) {
			removing.currentCell = 2;
			removing.nextCell = 0;
		} else if (y === -1) {
			removing.currentCell = 0;
			removing.nextCell = 2;
		}
		
		curr.removeWall(removing.currentCell)
		nxt.removeWall(removing.nextCell);
		
		/*
		if (activeScene instanceof MazeScene) {
			activeScene.maze.removeWall(currentCellWall.id);
			activeScene.maze.removeWall(nextCellWall.id);
		}
		*/
  }
	
	static init() {
		cells.length = 0;
		//console.log(GlobalConstants.Extras.mazeExtras)
		for (let j = 0; j < GlobalConstants.Extras.mazeExtras.rows; j++) {
			for (let i = 0; i < GlobalConstants.Extras.mazeExtras.cols; i++) {
				if (DEBUG)
					console.log("i: " + i + ", j: " + j);
				let cell = new Cell(i, j);
				if (DEBUG)
					console.dir(cell);
				cells.push(cell);
			}
		}
	}
}