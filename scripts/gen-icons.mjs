import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

// Zero-dependency icon generator: draws a die face (purple rounded tile + five
// white pips) and encodes a PNG. Supersampled 4x then box-downsampled for clean
// anti-aliased edges. Produces the PWA + apple-touch icons to match favicon.svg.

const PURPLE = [109, 40, 217];
const WHITE = [255, 255, 255];
const SS = 4; // supersampling factor

function insideRoundedRect(x, y, x0, y0, x1, y1, r) {
  const rx0 = x0 + r,
    ry0 = y0 + r,
    rx1 = x1 - r,
    ry1 = y1 - r;
  let dx = 0,
    dy = 0;
  if (x < rx0) dx = rx0 - x;
  else if (x > rx1) dx = x - rx1;
  if (y < ry0) dy = ry0 - y;
  else if (y > ry1) dy = y - ry1;
  return dx * dx + dy * dy <= r * r;
}

// bleed: fill the whole square (for maskable + apple-touch, which get masked).
// Otherwise draw a rounded tile with transparent corners.
function renderIcon(size, bleed) {
  const N = size * SS;
  const hi = new Uint8ClampedArray(N * N * 4);

  const margin = bleed ? 0 : N * 0.05;
  const radius = bleed ? 0 : N * 0.2;
  const x0 = margin,
    y0 = margin,
    x1 = N - margin,
    y1 = N - margin;
  const w = x1 - x0,
    h = y1 - y0;
  const pipR = w * 0.085;
  const pips = [
    [0.28, 0.28],
    [0.72, 0.28],
    [0.5, 0.5],
    [0.28, 0.72],
    [0.72, 0.72],
  ];

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const i = (y * N + x) * 4;
      const inTile =
        radius <= 0
          ? x >= x0 && x < x1 && y >= y0 && y < y1
          : insideRoundedRect(x, y, x0, y0, x1, y1, radius);
      if (inTile) {
        hi[i] = PURPLE[0];
        hi[i + 1] = PURPLE[1];
        hi[i + 2] = PURPLE[2];
        hi[i + 3] = 255;
      }
      for (const [fx, fy] of pips) {
        const dx = x - (x0 + fx * w);
        const dy = y - (y0 + fy * h);
        if (dx * dx + dy * dy <= pipR * pipR) {
          hi[i] = WHITE[0];
          hi[i + 1] = WHITE[1];
          hi[i + 2] = WHITE[2];
          hi[i + 3] = 255;
          break;
        }
      }
    }
  }

  // Downsample with alpha-weighted averaging for clean edges.
  const out = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const i = ((y * SS + sy) * N + (x * SS + sx)) * 4;
          const aa = hi[i + 3];
          r += hi[i] * aa;
          g += hi[i + 1] * aa;
          b += hi[i + 2] * aa;
          a += aa;
        }
      }
      const o = (y * size + x) * 4;
      if (a > 0) {
        out[o] = Math.round(r / a);
        out[o + 1] = Math.round(g / a);
        out[o + 2] = Math.round(b / a);
      }
      out[o + 3] = Math.round(a / (SS * SS));
    }
  }
  return out;
}

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}
function encodePng(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0; // no filter
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const out = process.argv[2];
const write = (name, size, bleed) =>
  writeFileSync(`${out}/${name}`, encodePng(size, renderIcon(size, bleed)));
write("pwa-192x192.png", 192, false);
write("pwa-512x512.png", 512, false);
write("pwa-maskable-512x512.png", 512, true);
write("apple-touch-icon.png", 180, true);
console.log("die-face icons written to", out);
