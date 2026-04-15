const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

function getCurrentTime() {
  return new Date().toLocaleString("cs-CZ", {
    timeZone: "Europe/Prague",
  });
}

app.get("/", (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="cs">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Aktuální čas</title>
        <style>
          body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            font-family: sans-serif;
            background: linear-gradient(120deg, #f7f7f7, #e6f0ff);
            color: #1f2937;
          }
          .card {
            padding: 2rem;
            border-radius: 14px;
            background: #ffffff;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
            text-align: center;
          }
          h1 {
            margin-top: 0;
            font-size: 1.5rem;
          }
          #time {
            font-size: 1.75rem;
            font-weight: 700;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Aktuální čas</h1>
          <div id="time">${getCurrentTime()}</div>
        </div>

        <script>
          async function refreshTime() {
            const response = await fetch('/time');
            const data = await response.json();
            document.getElementById('time').textContent = data.time;
          }

          setInterval(refreshTime, 1000);
        </script>
      </body>
    </html>
  `);
});

app.get("/time", (req, res) => {
  res.json({ time: getCurrentTime() });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
