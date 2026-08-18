class FuzzyText {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.text = options.text ?? "404";

    this.fontSize = options.fontSize ?? "clamp(5rem, 20vw, 15rem)";
    this.fontWeight = options.fontWeight ?? 900;
    this.fontFamily = options.fontFamily ?? "Arial, sans-serif";

    this.color = options.color ?? "#daa520";

    // نفس القيم التي طلبتها
    this.baseIntensity = options.baseIntensity ?? 0.4;
    this.hoverIntensity = options.hoverIntensity ?? 2;

    this.enableHover = options.enableHover ?? true;

    this.fuzzRange = options.fuzzRange ?? 30;
    this.fps = options.fps ?? 60;

    this.direction = options.direction ?? "horizontal";

    this.isHovering = false;

    this.currentIntensity = this.baseIntensity;

    this.lastFrame = 0;

    this.init();
  }

  async init() {

    await document.fonts.ready;

    this.createTextCanvas();

    this.resize();

    this.addEvents();

    requestAnimationFrame(this.animate.bind(this));
  }

  createTextCanvas() {

    this.textCanvas = document.createElement("canvas");

    this.textCtx = this.textCanvas.getContext("2d");

    const fontSize = this.getFontSize();

    this.textCtx.font =
      `${this.fontWeight} ${fontSize}px ${this.fontFamily}`;

    this.textCtx.textBaseline = "top";

    const metrics =
      this.textCtx.measureText(this.text);

    const width =
      Math.ceil(metrics.width) + 20;

    const height =
      Math.ceil(fontSize * 1.2);

    this.textCanvas.width = width;
    this.textCanvas.height = height;

    this.textCtx.font =
      `${this.fontWeight} ${fontSize}px ${this.fontFamily}`;

    this.textCtx.textBaseline = "top";

    this.textCtx.fillStyle = this.color;

    this.textCtx.fillText(
      this.text,
      10,
      0
    );
  }

  getFontSize() {

    const width = window.innerWidth;

    if (width < 500) {
      return 90;
    }

    if (width < 800) {
      return 140;
    }

    return 220;
  }

  resize() {

    this.createTextCanvas();

    this.canvas.width =
      this.textCanvas.width + this.fuzzRange * 2;

    this.canvas.height =
      this.textCanvas.height + this.fuzzRange * 2;
  }

  addEvents() {

    window.addEventListener(
      "resize",
      () => this.resize()
    );

    if (!this.enableHover) return;

    this.canvas.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          this.canvas.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const centerX =
          this.canvas.width / 2;

        const centerY =
          this.canvas.height / 2;

        const textWidth =
          this.textCanvas.width;

        const textHeight =
          this.textCanvas.height;

        const left =
          centerX - textWidth / 2;

        const top =
          centerY - textHeight / 2;

        this.isHovering =
          x >= left &&
          x <= left + textWidth &&
          y >= top &&
          y <= top + textHeight;
      }
    );

    this.canvas.addEventListener(
      "mouseleave",
      () => {
        this.isHovering = false;
      }
    );
  }

  animate(timestamp) {

    const frameTime =
      1000 / this.fps;

    if (
      timestamp - this.lastFrame <
      frameTime
    ) {
      requestAnimationFrame(
        this.animate.bind(this)
      );

      return;
    }

    this.lastFrame = timestamp;

    this.draw();

    requestAnimationFrame(
      this.animate.bind(this)
    );
  }

  draw() {

    const ctx = this.ctx;

    ctx.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    const targetIntensity =
      this.isHovering
        ? this.hoverIntensity
        : this.baseIntensity;

    this.currentIntensity +=
      (
        targetIntensity -
        this.currentIntensity
      ) * 0.15;

    const offsetX =
      (
        this.canvas.width -
        this.textCanvas.width
      ) / 2;

    const offsetY =
      (
        this.canvas.height -
        this.textCanvas.height
      ) / 2;

    if (this.direction === "horizontal") {

      for (
        let y = 0;
        y < this.textCanvas.height;
        y++
      ) {

        const intensity =
          this.currentIntensity;

        const offset =
          Math.floor(
            (Math.random() - 0.5) *
            this.fuzzRange *
            intensity
          );

        ctx.drawImage(
          this.textCanvas,

          0,
          y,
          this.textCanvas.width,
          1,

          offsetX + offset,
          offsetY + y,
          this.textCanvas.width,
          1
        );
      }

    } else if (this.direction === "vertical") {

      for (
        let x = 0;
        x < this.textCanvas.width;
        x++
      ) {

        const offset =
          Math.floor(
            (Math.random() - 0.5) *
            this.fuzzRange *
            this.currentIntensity
          );

        ctx.drawImage(
          this.textCanvas,

          x,
          0,
          1,
          this.textCanvas.height,

          offsetX + x,
          offsetY + offset,
          1,
          this.textCanvas.height
        );
      }

    } else {

      for (
        let y = 0;
        y < this.textCanvas.height;
        y++
      ) {

        const offsetXRandom =
          Math.floor(
            (Math.random() - 0.5) *
            this.fuzzRange *
            this.currentIntensity
          );

        const offsetYRandom =
          Math.floor(
            (Math.random() - 0.5) *
            this.fuzzRange *
            this.currentIntensity
          );

        ctx.drawImage(
          this.textCanvas,

          0,
          y,
          this.textCanvas.width,
          1,

          offsetX + offsetXRandom,
          offsetY + y + offsetYRandom,
          this.textCanvas.width,
          1
        );
      }
    }
  }
}
const fuzzy = new FuzzyText(
  document.getElementById("fuzzyText"),
  {
    text: "404",

    baseIntensity: 0.4,
    hoverIntensity: 2,

    enableHover: true
  }
);