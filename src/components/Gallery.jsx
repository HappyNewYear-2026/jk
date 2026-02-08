import { useEffect, useRef } from "react";
import "../styles.css";

export default function Gallery3D() {
  const dragRef = useRef(null);
  const spinRef = useRef(null);

  useEffect(() => {
    const radius = 240;
    const autoRotate = true;
    const rotateSpeed = -60;
    const imgWidth = 120;
    const imgHeight = 170;

    const dragContainer = dragRef.current;
    const spinContainer = spinRef.current;

    const images = spinContainer.querySelectorAll("img, video");
    const length = images.length;

    images.forEach((el, i) => {
      el.style.transform = `rotateY(${i * (360 / length)}deg) translateZ(${radius}px)`;
      el.style.transition = "transform 1s";
      el.style.transitionDelay = `${(length - i) / 4}s`;
    });

    if (autoRotate) {
      spinContainer.style.animation = `spin ${Math.abs(rotateSpeed)}s infinite linear`;
    }

    let tX = 0, tY = 10;
    let desX = 0, desY = 0;

    document.onpointerdown = (e) => {
      clearInterval(dragContainer.timer);
      let sX = e.clientX;
      let sY = e.clientY;

      document.onpointermove = (e) => {
        desX = e.clientX - sX;
        desY = e.clientY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        dragContainer.style.transform =
          `rotateX(${-tY}deg) rotateY(${tX}deg)`;
        sX = e.clientX;
        sY = e.clientY;
      };

      document.onpointerup = () => {
        dragContainer.timer = setInterval(() => {
          desX *= 0.95;
          desY *= 0.95;
          tX += desX * 0.1;
          tY += desY * 0.1;
          dragContainer.style.transform =
            `rotateX(${-tY}deg) rotateY(${tX}deg)`;
          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            clearInterval(dragContainer.timer);
          }
        }, 17);
        document.onpointermove = null;
        document.onpointerup = null;
      };
    };
  }, []);

  return (
    <>
      <div id="drag-container" ref={dragRef}>
        <div id="spin-container" ref={spinRef}>

          {/* Replace images/videos here */}
          <img src="/img/1.jpg" alt="" />
          <img src="/img/2.jpg" alt="" />
          <img src="/img/3.jpg" alt="" />
          <img src="/img/4.jpg" alt="" />
          <img src="/img/5.jpg" alt="" />

          <p>💖 Forever & Always 💖</p>
        </div>
      </div>

      <div id="ground"></div>

      <div id="ReplyBtn">
        <a href="#">
          Reply <span className="twinkle-emoji">✨</span>
        </a>
      </div>

      <audio id="music-container" src="/music.mp3" autoPlay loop />
    </>
  );
}
