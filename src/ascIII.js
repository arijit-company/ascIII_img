class AsciiEffect {
  #imageCellArray = [];
  #symbols = [];
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

  #scanImage(cellSize) {
    this.#imageCellArray = [];
    for (let y = 0; y < this.#height; y += cellSize) {
      for (let x = 0; x < this.#width; x += cellSize) {}
    }
  }
}

export default AsciiEffect;
