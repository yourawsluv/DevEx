import { mkdir, writeFile } from "node:fs/promises";
import puppeteer from "puppeteer-core";

const OUT = process.argv[2] ?? "promo/out";
const CHROME =
  process.env.CHROME_PATH ?? "/usr/bin/google-chrome-stable";

const BASE = `
  @import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Onest', sans-serif;
    background: #000;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }
  .canvas { position: relative; overflow: hidden; width: 100%; height: 100vh; display: flex; flex-direction: column; }
  .glow { position: absolute; border-radius: 50%; background: #00FFFF; filter: blur(160px); opacity: .18; }
  .logo { display: flex; align-items: center; gap: 14px; }
  .logo i { display: grid; place-items: center; background: #00FFFF; color: #000; font-weight: 800; font-style: normal; }
  .cyan { color: #00FFFF; }
  .muted { color: rgba(255,255,255,.55); }
  .chip { display: inline-flex; align-items: center; gap: 10px; border: 1px solid rgba(255,255,255,.16); border-radius: 999px; }
  .cta { display: inline-block; background: #00FFFF; color: #000; font-weight: 700; border-radius: 999px; }
  .kpi { border: 1px solid rgba(255,255,255,.14); border-radius: 20px; }
  .kpi b { display: block; color: #00FFFF; font-weight: 800; }
  .hair { height: 1px; background: rgba(255,255,255,.12); }
  .row { display: flex; align-items: center; justify-content: space-between; }
`;

const logo = (size = 56, font = 30, text = 34) => `
  <div class="logo">
    <i style="width:${size}px;height:${size}px;border-radius:${Math.round(size / 3.6)}px;font-size:${font}px">G</i>
    <span style="font-size:${text}px;font-weight:600;letter-spacing:-.02em">Goulash<span class="cyan">.tech</span></span>
  </div>`;

const creatives = [
  {
    name: "vk-post-1080x1080",
    width: 1080,
    height: 1080,
    title: "VK Реклама / ОК — лента, 1080×1080",
    html: `
      <div class="canvas" style="padding:76px">
        <div class="glow" style="width:820px;height:560px;top:-260px;right:-220px"></div>
        <div class="row">
          ${logo()}
          <span class="chip muted" style="padding:14px 26px;font-size:26px">Смена 18:40</span>
        </div>
        <div style="margin-top:auto">
          <p class="muted" style="font-size:38px;font-weight:500">12 заказов. 5 курьеров.</p>
          <h1 style="margin-top:18px;font-size:118px;line-height:.94;font-weight:800;letter-spacing:-.035em">
            Кто едет?<br /><span class="cyan">Гуляш решает<br />это сам</span>
          </h1>
          <div style="display:flex;gap:20px;margin-top:52px">
            <div class="kpi" style="padding:26px 32px;flex:1">
              <b style="font-size:56px">−12 мин</b>
              <span class="muted" style="font-size:24px">на заказ в час-пик</span>
            </div>
            <div class="kpi" style="padding:26px 32px;flex:1">
              <b style="font-size:56px">0</b>
              <span class="muted" style="font-size:24px">заказов без курьера</span>
            </div>
          </div>
        </div>
        <div class="hair" style="margin:56px 0 36px"></div>
        <div class="row">
          <span class="cta" style="padding:26px 46px;font-size:30px">Разобрать смену</span>
          <span class="muted" style="font-size:26px">Демо смены — по ссылке</span>
        </div>
      </div>`,
  },
  {
    name: "vk-clip-1080x1920",
    width: 1080,
    height: 1920,
    title: "VK Клипы / вертикаль — первый кадр, 1080×1920",
    html: `
      <div class="canvas" style="padding:96px 76px">
        <div class="glow" style="width:900px;height:700px;top:-300px;left:-260px"></div>
        ${logo(62, 34, 38)}
        <h1 style="margin-top:96px;font-size:104px;line-height:.96;font-weight:800;letter-spacing:-.035em">
          Одна смена.<br />Три роли.<br /><span class="cyan">Один экран.</span>
        </h1>
        <div style="margin-top:88px;display:flex;flex-direction:column;gap:28px">
          ${[
            ["Курьер", "Адрес уже в приложении. Мне не звонят"],
            ["Кухня", "Вижу, что готовить сейчас, а что через 20 минут"],
            ["Администратор", "Не переспрашиваю адрес и не ищу свободного курьера"],
          ]
            .map(
              ([role, line]) => `
              <div class="kpi" style="padding:34px 38px">
                <b style="font-size:38px;letter-spacing:.04em;text-transform:uppercase">${role}</b>
                <span style="display:block;margin-top:12px;font-size:36px;line-height:1.25">${line}</span>
              </div>`,
            )
            .join("")}
        </div>
        <div style="display:flex;gap:22px;margin-top:56px">
          ${[
            ["−12 мин", "на заказ в час-пик"],
            ["21 день", "переход на систему"],
          ]
            .map(
              ([v, l]) => `
              <div class="kpi" style="padding:30px 34px;flex:1">
                <b style="font-size:54px">${v}</b>
                <span class="muted" style="font-size:26px">${l}</span>
              </div>`,
            )
            .join("")}
        </div>
        <div style="margin-top:auto">
          <p class="muted" style="font-size:34px">Своя курьерка и 150–400 заказов в день?</p>
          <p style="margin-top:20px;font-size:58px;font-weight:700">Подключайтесь</p>
          <div class="row" style="margin-top:44px">
            <span class="cta" style="padding:30px 52px;font-size:34px">Разобрать смену</span>
          </div>
        </div>
      </div>`,
  },
  {
    name: "yandex-rsya-1080x607",
    width: 1080,
    height: 607,
    title: "Яндекс Директ / РСЯ — 1080×607",
    html: `
      <div class="canvas" style="padding:58px 64px">
        <div class="glow" style="width:640px;height:420px;top:-200px;right:-160px"></div>
        <div class="row">
          ${logo(46, 26, 28)}
          <span class="chip muted" style="padding:10px 22px;font-size:20px">Переход 21 день</span>
        </div>
        <h1 style="margin-top:auto;font-size:76px;line-height:1;font-weight:800;letter-spacing:-.03em">
          Вся смена доставки —<br /><span class="cyan">в одном экране</span>
        </h1>
        <p class="muted" style="margin-top:22px;font-size:27px;max-width:760px">
          Приём заказа, кухня и автомаршрутизация курьеров вместо пяти сервисов и звонков диспетчера
        </p>
        <div class="row" style="margin-top:auto">
          <span class="cta" style="padding:20px 38px;font-size:25px">Разобрать смену</span>
          <span class="muted" style="font-size:22px">900+ точек · 150+ городов</span>
        </div>
      </div>`,
  },
  {
    name: "telegram-post-1280x720",
    width: 1280,
    height: 720,
    title: "Telegram — пост в HoReCa-канале, 1280×720",
    html: `
      <div class="canvas" style="padding:0">
        <div class="glow" style="width:700px;height:500px;top:-240px;left:-180px"></div>
        <div style="display:flex;height:100%">
          <div style="flex:1;padding:56px 48px;display:flex;flex-direction:column">
            ${logo(46, 26, 28)}
            <h1 style="margin-top:auto;font-size:62px;line-height:1.02;font-weight:800;letter-spacing:-.03em">
              Вечер без<br />пожаров<br /><span class="cyan">на смене</span>
            </h1>
            <p class="muted" style="margin-top:22px;font-size:24px;max-width:420px">
              Заказы распределяются сами, кухня видит слоты, курьер получает адрес пушем
            </p>
            <div class="row" style="margin-top:auto">
              <span class="cta" style="padding:18px 34px;font-size:23px">Смотреть демо смены</span>
            </div>
          </div>
          <div style="width:560px;border-left:1px solid rgba(255,255,255,.12);padding:44px 40px;background:#0b0d0e">
            <div class="row">
              <span style="font-size:22px;font-weight:600">Смена 18:40</span>
              <span class="cyan" style="font-size:20px">на Гуляше</span>
            </div>
            <div style="display:flex;gap:14px;margin-top:22px">
              ${[
                ["38 мин", "доставка"],
                ["0", "без курьера"],
                ["8%", "опоздания"],
              ]
                .map(
                  ([v, l]) => `
                  <div class="kpi" style="padding:16px 18px;flex:1">
                    <b style="font-size:32px">${v}</b>
                    <span class="muted" style="font-size:17px">${l}</span>
                  </div>`,
                )
                .join("")}
            </div>
            <div style="margin-top:24px;display:flex;flex-direction:column;gap:12px">
              ${[
                ["№4181", "Мира, 42", "Егор · пеший", "22 мин"],
                ["№4183", "Весны, 15", "Данил · авто", "31 мин"],
                ["№4187", "Копылова, 19", "Артём · вело", "27 мин"],
                ["№4192", "Батурина, 30", "Марат · авто", "36 мин"],
              ]
                .map(
                  ([id, addr, courier, eta]) => `
                  <div style="border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between">
                    <span style="font-size:19px">
                      <b style="font-weight:600">${id}</b>
                      <span class="muted"> · ${addr}</span>
                      <span style="display:block;font-size:17px;color:rgba(255,255,255,.45);margin-top:4px">${courier}</span>
                    </span>
                    <span class="cyan" style="font-size:19px;font-weight:600">${eta}</span>
                  </div>`,
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>`,
  },
  {
    name: "ok-tizer-600x600",
    width: 600,
    height: 600,
    title: "Одноклассники / VK Реклама — тизер, 600×600",
    html: `
      <div class="canvas" style="padding:44px">
        <div class="glow" style="width:420px;height:320px;bottom:-160px;right:-120px"></div>
        ${logo(38, 21, 22)}
        <h1 style="margin-top:auto;font-size:52px;line-height:1.02;font-weight:800;letter-spacing:-.03em">
          Автоматизация<br />доставки<br /><span class="cyan">за 21 день</span>
        </h1>
        <div class="kpi" style="margin-top:26px;padding:18px 22px">
          <b style="font-size:30px">40 000 ₽ / мес</b>
          <span class="muted" style="font-size:17px">при обороте до 4 млн ₽ · интеграция 20 000 ₽</span>
        </div>
        <div class="row" style="margin-top:auto">
          <span class="cta" style="padding:16px 28px;font-size:20px">Узнать цену</span>
          <span class="muted" style="font-size:17px">партнёр в вашем городе</span>
        </div>
      </div>`,
  },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--font-render-hinting=none"],
});

await mkdir(OUT, { recursive: true });

for (const creative of creatives) {
  const page = await browser.newPage();
  await page.setViewport({
    width: creative.width,
    height: creative.height,
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<!doctype html><html lang="ru"><head><meta charset="utf-8"><style>${BASE}</style></head><body>${creative.html}</body></html>`,
    { waitUntil: "networkidle0" },
  );
  await page.evaluate(() => document.fonts.ready);
  const file = `${OUT}/${creative.name}.png`;
  await page.screenshot({ path: file, type: "png" });
  await page.close();
  console.log(`${file} — ${creative.title}`);
}

await browser.close();
await writeFile(
  `${OUT}/.rendered.json`,
  JSON.stringify(
    creatives.map((c) => ({ name: c.name, width: c.width, height: c.height, title: c.title })),
    null,
    2,
  ),
);
