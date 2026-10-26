let video;
let gridSize = 8; // Controls the spacing of the dots
let brightnessOffset = 0; // Adjust brightness (-255 to 255)
let contrastFactor = 1;   // Adjust contrast (0 to any positive number, 1 means no change)

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width / gridSize, height / gridSize); // Resize video to match grid size
  video.hide();
  noStroke();
  
  // Slider for brightness adjustment
  createP('Brightness');
  brightnessSlider = createSlider(-255, 255, 0); // Range: -255 (darken) to +255 (brighten)
  
  // Slider for contrast adjustment
  createP('Contrast');
  contrastSlider = createSlider(0, 3, 1, 0.1); // Range: 0 (flat contrast) to 3 (high contrast)
}

function draw() {
  background(255);
  
  // Update brightness and contrast values from sliders
  brightnessOffset = brightnessSlider.value();
  contrastFactor = contrastSlider.value();
  
  video.loadPixels();
  
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      
      // Get pixel color values
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      
      // Convert pixel to grayscale
      let grayscale = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Apply brightness adjustment
      grayscale = grayscale + brightnessOffset;
      grayscale = constrain(grayscale, 0, 255); // Ensure the value stays within 0-255
      
      // Apply contrast adjustment
      grayscale = map(grayscale, 0, 255, 128 - 128 * contrastFactor, 128 + 128 * contrastFactor);
      
      // Map grayscale to dot size (smaller for lighter, larger for darker)
      
      // play with this constraint to further adjust point sizing
      // grayscale = constrain(grayscale, 0, 255); // Ensure the value stays within 0-255
      
      // Binary threshold for 2-color halftone (if grayscale < 128, it becomes black; otherwise white)
      let isDark = grayscale < 128;
      let fillA = color(0,0,0) //black
      let fillB = color(255,255,255) //white
      // let fillA = color(255,0,0) //red
      // let fillB = color(0,255,0) //green
      let fillColor = isDark ? fillA : fillB;
 // Black for dark, white for light
      
      let dotSize = map(grayscale, 0, 255, gridSize, 0.125); // Larger dots for darker areas
      
      // Set fill to either black or white
      fill(fillColor);
      
      // Draw a circle at the position of the pixel
      ellipse(x * gridSize, y * gridSize, dotSize, dotSize);
    }
  }
}

function keyPressed() {
  if (key === 's') {
    saveGif('halftone', 3);
  }
}
