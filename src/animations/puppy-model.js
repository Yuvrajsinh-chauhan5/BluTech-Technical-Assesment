export const BASE_POSE = {
    bodyRot: 0,
    bodyX: 0,
    bodyY: 0,
    stretch: 1,
    headX: 0,
    headY: 0,
    headRot: 0,
    earL: 0,
    earR: 0,
    tail: 0,
    fn: 0,
    ff: 0,
    bn: 0,
    bf: 0,
    sit: 0,
    eyes: 1,
    happy: 0,
    tongue: 0,
    mouth: 0,
    front: 0,
  };
  
  export const POSES = {
    stand: { ...BASE_POSE },
  
    walk: {
      ...BASE_POSE,
      tail: -6,
      tongue: 1,
    },
  
    sit: {
      ...BASE_POSE,
      bodyRot: -24,
      bodyY: -2,
      headX: -10,
      headY: -6,
      tail: 34,
      sit: 1,
      tongue: 1,
    },
  
    peek: {
      ...BASE_POSE,
      headY: 4,
      earL: -6,
      earR: 6,
      tail: -20,
      front: 1,
      tongue: 1,
    },
  
    snug: {
      ...BASE_POSE,
      headY: 9,
      headRot: 4,
      earL: 3,
      earR: -3,
      tail: -20,
      front: 1,
    },
  
    lie: {
      ...BASE_POSE,
      bodyRot: -5,
      bodyY: 22,
      headX: 12,
      headY: 40,
      headRot: 3,
      fn: -84,
      ff: -80,
      sit: 1,
      tail: 58,
    },
  
    sleep: {
      ...BASE_POSE,
      bodyRot: -5,
      bodyY: 22,
      headX: 14,
      headY: 44,
      headRot: -8,
      fn: -84,
      ff: -80,
      sit: 1,
      tail: 64,
      eyes: 0,
      earL: 4,
      earR: -4,
    },
  
    settle: {
      ...BASE_POSE,
      bodyRot: -5,
      bodyY: 22,
      headX: 10,
      headY: 16,
      fn: -84,
      ff: -80,
      sit: 1,
      tail: 40,
      tongue: 1,
    },
  
    hop: {
      ...BASE_POSE,
      bodyRot: -9,
      stretch: 1.06,
      headY: -6,
      fn: -42,
      ff: -32,
      bn: 40,
      bf: 30,
      earL: -26,
      earR: 26,
      tail: -24,
      tongue: 1,
    },
  
    sniff: {
      ...BASE_POSE,
      bodyRot: 7,
      headX: 16,
      headY: 32,
      headRot: 9,
      tail: -14,
      fn: 6,
      ff: 4,
    },
  
    bow: {
      ...BASE_POSE,
      bodyRot: 15,
      bodyY: 2,
      headX: 14,
      headY: 30,
      fn: -58,
      ff: -52,
      tail: -32,
      happy: 1,
      tongue: 1,
    },
  
    beg: {
      ...BASE_POSE,
      bodyRot: -36,
      bodyY: -6,
      headX: -18,
      headY: -18,
      sit: 1,
      fn: -70,
      ff: -64,
      tail: 30,
      happy: 1,
      tongue: 1,
    },
  };
  
  export function interpolatePose(from, to, amount) {
    const result = {};
  
    for (const key of Object.keys(BASE_POSE)) {
      result[key] =
        from[key] + (to[key] - from[key]) * amount;
    }
  
    return result;
  }
  
  export function ellipsePath(
    cx,
    cy,
    rx,
    ry,
    steps,
    bulge,
    rotation = -Math.PI / 2,
    phase = 0
  ) {
    const angle = (phase * Math.PI) / 180;
  
    const point = (theta, offset) => {
      const x = Math.cos(theta) * (rx + offset);
      const y = Math.sin(theta) * (ry + (ry / rx) * offset);
  
      return `${(
        cx +
        x * Math.cos(angle) -
        y * Math.sin(angle)
      ).toFixed(1)} ${(
        cy +
        x * Math.sin(angle) +
        y * Math.cos(angle)
      ).toFixed(1)}`;
    };
  
    let path = "";
  
    for (let i = 0; i < steps; i++) {
      const a = rotation + (i / steps) * Math.PI * 2;
      const b = rotation + ((i + 1) / steps) * Math.PI * 2;
      const mid = (a + b) / 2;
  
      path +=
        `${i === 0 ? `M${point(a, 0)}` : ""}` +
        `Q${point(mid, 2.1 * bulge)} ${point(b, 0)}`;
    }
  
    return `${path}Z`;
  }
  
  export const DOG = {
    body: ellipsePath(140, 170, 64, 36, 15, 3.4, 0.95 * Math.PI),
    chest: ellipsePath(192, 166, 30, 32, 9, 3.2, 0.6 * Math.PI),
    tail: ellipsePath(70, 126, 17, 16, 9, 3.2),
    haunch: ellipsePath(110, 204, 30, 24, 10, 3.2, Math.PI),
    head: ellipsePath(212, 100, 51, 46, 16, 3.6),
    topknot: ellipsePath(212, 52, 17, 12, 8, 2.9, Math.PI),
    earL: ellipsePath(170, 112, 19, 34, 10, 3.2, -Math.PI / 2, 12),
    earR: ellipsePath(254, 112, 19, 34, 10, 3.2, -Math.PI / 2, -12),
  
    tailStem: "M86 152 C80 146 76 140 74 136",
  
    haunchPaw:
      "M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z",
  
    muzzle:
      "M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z",
  
    nose:
      "M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z",
  
    mouth:
      "M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2",
  
    mouthOpen:
      "M203 126 Q212 122 221 126 Q219 138 212 139 Q205 138 203 126 Z",
  
    tongue: "M207.6 127.4 Q212 136.6 216.4 127.4 Z",
  
    collar: "M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z",
  
    tag:
      "M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z",
  
    ledgePaws:
      "M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z",
  
    ledgeToes:
      "M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5",
  };
  
  export const COLORS = {
    blush: "#f9b9a6",
    brown: "#a24a1a",
    caramel: "#f2be6b",
    cream: "#fbe3b4",
    gold: "#e4a352",
    dark: "#2a170e",
    tongue: "#e98c8c",
  };