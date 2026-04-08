import { useEffect, useRef } from "react";

export type BackgroundMode = "home" | "career" | "education" | "blog";

type AnimatedBackgroundProps = {
  mode: BackgroundMode;
};

type Dot = {
  x: number;
  y: number;
  speed: number;
  radius: number;
  hue: number;
  segment: "top" | "bottom";
};

const DOT_COUNT = 120;

export function AnimatedBackground({ mode }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let phase = 0;

    const topBand = () => ({ start: 0, end: height * 0.37 });
    const bottomBand = () => ({ start: height * 0.64, end: height });

    const randomInBand = (segment: "top" | "bottom") => {
      const band = segment === "top" ? topBand() : bottomBand();
      return band.start + Math.random() * Math.max(20, band.end - band.start);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const dots: Dot[] = Array.from({ length: DOT_COUNT }, (_, index) => {
      const segment: Dot["segment"] = index % 2 === 0 ? "top" : "bottom";
      return {
        x: width * (0.445 + Math.random() * 0.14),
        y: randomInBand(segment),
        speed: 0.28 + Math.random() * 0.75,
        radius: 1 + Math.random() * 6,
        hue: 190 + Math.random() * 35,
        segment,
      };
    });

    const drawHome = () => {
      context.clearRect(0, 0, width, height);

      for (const dot of dots) {
        const band = dot.segment === "top" ? topBand() : bottomBand();

        dot.y += dot.speed;
        dot.x += Math.sin(dot.y * 0.009 + phase + (dot.segment === "top" ? 0 : 1.3)) * 0.23;

        if (dot.y > band.end + 16) {
          dot.y = band.start - 16;
          dot.x = width * (0.445 + Math.random() * 0.14);
        }

        const cyanWeight = dot.segment === "bottom" ? 0.72 : 0.5;
        const alpha = dot.segment === "bottom" ? 0.86 : 0.8;
        const hue = dot.hue * (1 - cyanWeight) + 227 * cyanWeight;

        context.beginPath();
        context.arc(dot.x, dot.y, dot.radius * 0.56, 0, Math.PI * 2);
        context.fillStyle = `hsla(${hue}, 84%, 55%, ${alpha})`;
        context.fill();
      }
    };

    const drawCareer = () => {
      context.clearRect(0, 0, width, height);
      const drawRibbon = (
        baseY: number,
        amplitude: number,
        lineCount: number,
        hue: number,
        alphaBase: number
      ) => {
        for (let i = 0; i < lineCount; i += 1) {
          const offset = i * 11;
          const alpha = alphaBase + (i / lineCount) * 0.45;
          context.beginPath();

          for (let x = -20; x <= width + 20; x += 10) {
            const nx = x / width;
            const y =
              baseY +
              offset +
              Math.sin(nx * 5.6 + phase * 1.8 + i * 0.11) * amplitude +
              Math.cos(nx * 2.9 + phase * 1.2 + i * 0.09) * (amplitude * 0.45);

            if (x <= -20) {
              context.moveTo(x, y);
            } else {
              context.lineTo(x, y);
            }
          }

          context.lineWidth = 1.8;
          context.strokeStyle = `hsla(${hue}, 95%, 52%, ${alpha})`;
          context.stroke();
        }
      };

      // Soft glow behind ribbons.
      const glow = context.createRadialGradient(
        width * 0.64,
        height * 0.66,
        20,
        width * 0.64,
        height * 0.66,
        width * 0.42
      );
      glow.addColorStop(0, "rgba(21, 149, 255, 0.16)");
      glow.addColorStop(1, "rgba(21, 149, 255, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      drawRibbon(height * 0.14, 34, 12, 198, 0.12);
      drawRibbon(height * 0.62, 38, 15, 200, 0.14);

      // Accent orbs to keep the field lively.
      for (let i = 0; i < 6; i += 1) {
        const orbX = width * (0.18 + i * 0.13) + Math.sin(phase * 1.3 + i) * 20;
        const orbY = height * (0.47 + Math.cos(phase * 0.9 + i * 0.7) * 0.08);
        const radius = 12 + i * 2;
        const orbGradient = context.createRadialGradient(
          orbX,
          orbY,
          0,
          orbX,
          orbY,
          radius
        );
        orbGradient.addColorStop(0, "rgba(37, 169, 255, 0.22)");
        orbGradient.addColorStop(1, "rgba(37, 169, 255, 0)");
        context.fillStyle = orbGradient;
        context.beginPath();
        context.arc(orbX, orbY, radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const drawEducation = () => {
      context.clearRect(0, 0, width, height);
      const baseGlow = context.createLinearGradient(0, 0, width, height);
      baseGlow.addColorStop(0, "rgba(255, 84, 209, 0.1)");
      baseGlow.addColorStop(0.38, "rgba(121, 82, 249, 0.16)");
      baseGlow.addColorStop(0.68, "rgba(44, 173, 255, 0.14)");
      baseGlow.addColorStop(1, "rgba(255, 84, 209, 0.1)");
      context.fillStyle = baseGlow;
      context.fillRect(0, 0, width, height);

      const loops = 4;
      for (let ring = 0; ring < loops; ring += 1) {
        const cx = width * (0.46 + ring * 0.1) + Math.sin(phase * 0.35 + ring) * 18;
        const cy = height * (0.25 + ring * 0.22) + Math.cos(phase * 0.3 + ring * 0.8) * 14;
        const gradient = context.createLinearGradient(
          cx - width * 0.45,
          cy - height * 0.3,
          cx + width * 0.45,
          cy + height * 0.3
        );
        const alphaA = 0.48 - ring * 0.06;
        const alphaB = 0.5 - ring * 0.06;
        const alphaC = 0.46 - ring * 0.06;
        gradient.addColorStop(0, `rgba(248, 62, 198, ${alphaA})`);
        gradient.addColorStop(0.52, `rgba(88, 90, 255, ${alphaB})`);
        gradient.addColorStop(1, `rgba(44, 188, 255, ${alphaC})`);

        context.beginPath();
        const points = 380;
        for (let i = 0; i <= points; i += 1) {
          const t = (i / points) * Math.PI * 2;
          const x =
            cx +
            Math.cos(t) * width * (0.38 - ring * 0.04) +
            Math.cos(t * 2.5 + phase * 0.7 + ring * 0.4) * (14 - ring * 2);
          const y =
            cy +
            Math.sin(t) * height * (0.3 - ring * 0.03) +
            Math.sin(t * 1.9 + phase * 0.85 + ring * 0.35) * (10 - ring * 1.5);

          if (i === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        }

        context.lineWidth = Math.max(7, width * (0.0052 - ring * 0.0007));
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = gradient;
        context.stroke();
      }

      // Fast accent streaks add visual energy.
      const streaks = 5;
      for (let i = 0; i < streaks; i += 1) {
        const px = width * (0.25 + i * 0.26) + Math.sin(phase * 1.7 + i) * 60;
        const py = height * (0.28 + i * 0.2) + Math.cos(phase * 1.45 + i * 0.5) * 36;
        const streak = context.createLinearGradient(px - 92, py - 34, px + 92, py + 34);
        streak.addColorStop(0, "rgba(255, 255, 255, 0)");
        streak.addColorStop(0.45, "rgba(255, 255, 255, 0.28)");
        streak.addColorStop(0.55, "rgba(255, 255, 255, 0.28)");
        streak.addColorStop(1, "rgba(255, 255, 255, 0)");
        context.strokeStyle = streak;
        context.lineWidth = 2.4;
        context.beginPath();
        context.moveTo(px - 90, py - 26);
        context.lineTo(px + 90, py + 26);
        context.stroke();
      }

      // Bright floating sparks for extra pop.
      const sparks = 16;
      for (let i = 0; i < sparks; i += 1) {
        const x = width * ((i + 1) / (sparks + 1)) + Math.sin(phase * 1.6 + i) * 26;
        const y = height * (0.16 + ((i * 37) % 70) / 100) + Math.cos(phase * 1.9 + i) * 18;
        const r = 1.8 + ((i * 13) % 10) / 10;
        const hue = 300 - ((i * 37) % 120);
        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.fillStyle = `hsla(${hue}, 96%, 65%, 0.6)`;
        context.fill();
      }
    };

    const drawBlog = () => {
      context.clearRect(0, 0, width, height);
      const x = width * 0.53 + Math.sin(phase * 0.8) * 24;
      const y = height * 0.54 + Math.cos(phase * 0.6) * 16;
      const rx = width * 0.47;
      const ry = height * 0.36;

      const gradient = context.createLinearGradient(x - rx, y - ry, x + rx, y + ry);
      gradient.addColorStop(0, "rgba(247, 169, 38, 0.65)");
      gradient.addColorStop(1, "rgba(244, 59, 147, 0.62)");

      context.beginPath();
      context.ellipse(x, y, rx, ry, Math.sin(phase * 0.3) * 0.08, 0, Math.PI * 2);
      context.fillStyle = gradient;
      context.fill();
    };

    const draw = () => {
      phase += mode === "career" ? 0.015 : mode === "education" ? 0.018 : 0.01;

      if (mode === "home") {
        drawHome();
      } else if (mode === "career") {
        drawCareer();
      } else if (mode === "education") {
        drawEducation();
      } else {
        drawBlog();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [mode]);

  return <canvas className={`bg-canvas bg-${mode}`} aria-hidden="true" ref={canvasRef} />;
}
