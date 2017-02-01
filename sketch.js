var cols, rows;
var w = 30;
var grid = [];
var step = 0;
var current;
var stack = [];

function setup() {
    createCanvas(600,600);
    background(51);
    cols = floor(width/w);
    rows = floor(height/w);

    //frameRate(5);

    for(var i = 0; i < rows; i++){
        for (var j = 0; j < cols; j++){
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }

    current = grid[0];
}

function draw() {
    //background(51);
    if (step < 100000){
        if(current == grid[0] || step % 1000 == 0){
            background(51);
            for(var i = 0; i < grid.length; i++){
                grid[i].show();
            }
        }
        
        current.visited = true;

        //current.highlight();
        //Шаг 1
        var next = current.checkNeighbors();
        if (next) {
            next.visited = true;
            //2
            stack.push(current);

            // 3
            removeWalls(current, next);

            //Шаг 4
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        }
        step++;
    }
    if(step == 300){
    }
}

function index (i, j){
    if (i < 0 || j < 0 || j > cols-1 || i > rows - 1){
        return -1;
    }
    return j + i * cols;
}

function removeWalls(a, b){
    var y = a.j - b.j;
    if (y == 1){
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y == -1){
        a.walls[2] = false;
        b.walls[0] = false;
    }
    var x = a.i - b.i;
    if (x == 1){
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x == -1){
        a.walls[1] = false;
        b.walls[3] = false;
    }

}

function Cell(i, j){
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true]; // top right, bottom, left
    this.visited = false;

    this.checkWallNeighbors = function(){
        var neighbors = [];
        var top = grid[index(i-1, j)];
        var right = grid[index(i, j+1)];
        var bottom = grid[index(i+1, j)];
        var left = grid[index(i, j-1)];
        if(top && top.walls[2] == this.walls[0]){
            neighbors.push(top);
        }
        if(right && right.walls[3] == this.walls[1]){
            neighbors.push(right);
        }
        if(bottom && bottom.walls[0] == this.walls[2]){
            neighbors.push(bottom);
        }
        if(left && left.walls[1] == this.walls[3]){
            neighbors.push(left);
        }
        console.log(this);
        console.log(neighbors);
        if (neighbors.length > 0){
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.checkNeighbors = function(){
        var neighbors = [];

        var top = grid[index(i-1, j)];
        var right = grid[index(i, j+1)];
        var bottom = grid[index(i+1, j)];
        var left = grid[index(i, j-1)];
        if(top && !top.visited){
            neighbors.push(top);
        }
        if(right && !right.visited){
            neighbors.push(right);
        }
        if(bottom && !bottom.visited){
            neighbors.push(bottom);
        }
        if(left && !left.visited){
            neighbors.push(left);
        }
        if (neighbors.length > 0){
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    this.highlight = function(){
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(243, 52, 3, 500);
        rect(x, y, w, w);
    }

    this.show = function(){
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);
        if (this.walls[0]){
            line(x, y, x + w, y);
        }
        if (this.walls[1]){
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]){
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]){
            line(x, y + w, x, y);
        }

        if(this.visited){
            noStroke();
            fill(43, 130, 16, 100);
            rect(x, y, w, w);
        }
    }
}