import { converImgToBase64 } from "./utils.js";
import AsciiEffect from "./ascIII.js";

const main_canvas = document.getElementById("main_canvas");
const file_input = document.getElementById("file_input");

const ctx = main_canvas.getContext("2d");
const image_One = new Image(400, 400);
let newAsciiEffect;

file_input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  converImgToBase64(file)
    .then((data) => {
      addImageToCanvas(data);
    })
    .catch((err) => console.log(err));
});

function addImageToCanvas(data) {
  image_One.src = data;
  image_One.onload = drawActualImage;
}

function drawActualImage() {
  //   main_canvas.width = this.naturalWidth;
  //   main_canvas.height = this.naturalHeight;
  //   ctx.drawImage(this, 0, 0);
  main_canvas.width = this.width;
  main_canvas.height = this.height;
  newAsciiEffect = new AsciiEffect(
    ctx,
    image_One.width,
    image_One.height,
    image_One
  );
  console.log(newAsciiEffect);
}
