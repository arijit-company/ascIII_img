class Cell {
  constructor(x, y, symbol, color) {
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillText(this.symbol, this.x, this.y);
  }
}

class AsciiEffect {
  #imageCellArray = [];
  // #symbols = [];
  #pixels = {};
  #ctx;
  #width;
  #height;
  #image;

  constructor(ctx, width, height, image) {
    this.#ctx = ctx;
    this.#width = width;
    this.#height = height;
    this.#image = image;
    this.#ctx.drawImage(this.#image, 0, 0, this.#width, this.#height);
    this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
  }

  #convertToSymbol(avgCol) {
    if (avgCol > 250) return "@";
    else if (avgCol < 240) return "*";
    else if (avgCol < 220) return "+";
    else if (avgCol < 200) return "#";
    else if (avgCol < 180) return "%";
    else if (avgCol < 160) return "2";
    else if (avgCol < 140) return "_";
    else if (avgCol < 120) return "$";
    else if (avgCol < 100) return "^";
    else if (avgCol < 80) return "~";
    else if (avgCol < 60) return "-";
    else if (avgCol < 40) return "X";
    else if (avgCol < 20) return "W";
    else return "";
  }

  #scanImage(cellSize) {
    this.#imageCellArray = [];
    for (let y = 0; y < this.#pixels.height; y += cellSize) {
      for (let x = 0; x < this.#pixels.width; x += cellSize) {
        const posX = x * 4;
        const posY = y * 4;
        const currentPos = posY * this.#pixels.width + posX;
        if (this.#pixels.data[currentPos + 3] > 128) {
          const red = this.#pixels.data[currentPos];
          const greeen = this.#pixels.data[currentPos + 1];
          const blue = this.#pixels.data[currentPos + 2];

          const total = red + greeen + blue;

          const averageColorvalue = total / 3;

          const color = `rgb(${red}, ${greeen}, ${blue})`;

          const symbol = this.#convertToSymbol(averageColorvalue);

          if (total > 200) {
            this.#imageCellArray.push(new Cell(x, y, symbol, color));
          }
        }
      }
    }

    console.log(this.#imageCellArray);
  }

  draw(cellSize) {
    this.#scanImage(cellSize);
    this.#drawSymbolAscii();
  }

  #drawSymbolAscii() {
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    for (let i = 0; i < this.#imageCellArray.length; i++) {
      this.#imageCellArray[i].draw(this.#ctx);
    }
  }
}

export default AsciiEffect;
