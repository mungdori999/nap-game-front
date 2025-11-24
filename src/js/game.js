import {
  AnimatedSprite,
  Application,
  Assets,
  Texture,
  Rectangle,
  Sprite,
} from "pixi.js";

async function createApp(width = 600, height = 500) {
  const app = new Application();
  await app.init({
    width: width,
    height: height,
    background: 0x4169e1,
  });
  app.canvas.id = "app-canvas";
  document.getElementById("game-container").appendChild(app.canvas);
  return app;
}

async function loadBackground(app, url) {
  const bgTexture = await Assets.load(url);
  const bg = new Sprite(bgTexture);
  bg.width = app.screen.width;
  bg.height = app.screen.height;
  app.stage.addChild(bg);
}

async function loadCharacter(app, url, x, y, scale = 2, speed = 0.2) {
  const charTexture = await Assets.load(url);

  const frames = Array.from(
    { length: 4 },
    (_, i) =>
      new Texture({
        source: charTexture,
        frame: new Rectangle(i * 32, 0, 32, 32),
      })
  );

  const character = new AnimatedSprite(frames);
  character.anchor.set(0.5);
  character.x = x;
  character.y = y;
  character.scale.set(scale);
  character.animationSpeed = speed;
  character.play();

  app.stage.addChild(character);
  return character;
}

function setupKeyboardMovement(app, character, speed = 1.5) {
  const keys = {};
  window.addEventListener("keydown", (e) => (keys[e.key] = true));
  window.addEventListener("keyup", (e) => (keys[e.key] = false));

  app.ticker.add(() => {
    let newX = character.x;
    let newY = character.y;

    if (keys["ArrowLeft"] || keys["a"]) newX -= speed;
    if (keys["ArrowRight"] || keys["d"]) newX += speed;
    if (keys["ArrowUp"] || keys["w"]) newY -= speed;
    if (keys["ArrowDown"] || keys["s"]) newY += speed;

    // 화면 밖으로 못 나가게 제한
    character.x = Math.max(
      character.width / 2,
      Math.min(app.screen.width - character.width / 2, newX)
    );
    character.y = Math.max(
      character.height / 2,
      Math.min(app.screen.height - character.height / 2, newY)
    );
  });
}

export async function loadGame() {
  const app = await createApp(700, 600);

  await loadBackground(app, "/images/background.png");

  const character = await loadCharacter(
    app,
    "/images/Attack.png",
    app.screen.width / 2,
    app.screen.height
  );
  //   drawObstacles(app);
  setupKeyboardMovement(app, character);
}
