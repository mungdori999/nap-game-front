import "./style.css";
import {
  AnimatedSprite,
  Application,
  Assets,
  Texture,
  Rectangle,
  Sprite,
} from "pixi.js";

export async function main() {
  const app = new Application();

  await app.init({
    background: "royalblue",
    resizeTo: window,
  });

  app.canvas.id = "app-canvas";
  document.body.appendChild(app.canvas);

  const bgTexture = await Assets.load("/images/background.png");
  const bg = new Sprite(bgTexture);
  bg.width = app.screen.width;
  bg.height = app.screen.height;
  app.stage.addChild(bg);

  const texture = await Assets.load("/images/Attack.png");
  const frames = [
    new Texture({ source: texture, frame: new Rectangle(0, 0, 32, 32) }),
    new Texture({ source: texture, frame: new Rectangle(32, 0, 32, 32) }),
    new Texture({ source: texture, frame: new Rectangle(64, 0, 32, 32) }),
    new Texture({ source: texture, frame: new Rectangle(96, 0, 32, 32) }),
  ];
  const character = new AnimatedSprite(frames);
  character.anchor.set(0.5);
  character.x = app.screen.width / 2;
  character.y = app.screen.height / 2;
  character.animationSpeed = 0.2;
  character.play();
  app.stage.addChild(character);

  // 3) 키보드 입력
  const keys = {};
  window.addEventListener("keydown", (e) => (keys[e.key] = true));
  window.addEventListener("keyup", (e) => (keys[e.key] = false));

  const speed = 5;

  // 4) 매 프레임마다 캐릭터 이동
  app.ticker.add(() => {
    if (keys["ArrowLeft"] || keys["a"]) character.x -= speed;
    if (keys["ArrowRight"] || keys["d"]) character.x += speed;
    if (keys["ArrowUp"] || keys["w"]) character.y -= speed;
    if (keys["ArrowDown"] || keys["s"]) character.y += speed;

    // 화면 밖으로 못 나가게 제한
    character.x = Math.max(
      character.width / 2,
      Math.min(app.screen.width - character.width / 2, character.x)
    );
    character.y = Math.max(
      character.height / 2,
      Math.min(app.screen.height - character.height / 2, character.y)
    );
  });
}
