import { HighlightOptions } from "./types";
import playerjs from "player.js";

const DEVELOPMENTBASEURL = "https://origin-embed.dev.lvn.org";

const PRODUCTIONBASEURL = "https://origin-embed.lvn.org";

export class HighlightPlayer {
  player: playerjs.Player;
  isPlaying: boolean;
  isInitialized: boolean;
  iframe: HTMLIFrameElement;

  constructor(id: string, highlightId: number, options?: HighlightOptions) {
    const rootElement = window.document.getElementById(id);
    if (rootElement) {
      this.isPlaying = false;
      this.isInitialized = false;

      // Set values for embed
      let srcBase = "";
      if (options?.src) {
        srcBase = options?.src;
      } else if (options?.environment == "dev") {
        srcBase = DEVELOPMENTBASEURL;
      } else {
        srcBase = PRODUCTIONBASEURL;
      }
      const highlightParam = `hid=${highlightId}`;
      const fontSizeParam = options?.fontSize
        ? `&fsz=${encodeURIComponent(options?.fontSize)}`
        : "";
      const fontWeightParam = options?.fontWeight
        ? `&fwt=${encodeURIComponent(options?.fontWeight)}`
        : "";
      const highlightColorParam = options?.highlightColor
        ? `&hic=${encodeURIComponent(options?.highlightColor)}`
        : "";
      const typeParam = options?.type === "minimal" ? `&type=minimal` : "";

      // Create Iframe
      const iframe = document.createElement("iframe");
      iframe.src = `${srcBase}/?${highlightParam}${typeParam}${fontSizeParam}${fontWeightParam}${highlightColorParam}`;
      iframe.width = options?.width ?? "100%";
      iframe.height = options?.height ?? "100%";

      // Enforce no scrolling and no border on the highlight
      iframe.setAttribute("scrolling", "no");
      iframe.setAttribute("frameBoarder", "0");
      iframe.style.border = "none";
      iframe.style.overflow = "hidden";

      // Inject iframe into DOM
      iframe.allow = "autoplay";
      iframe.onload = (e) => this.onLoad(e);
      this.iframe = iframe;
      rootElement.replaceChildren(iframe);
    } else {
      console.error(`The element with id, ${id}, was not fond`);
    }
  }

  onLoad(e) {
    try {
      const player = new playerjs.Player(e.target);
      player.on("ready", () => {
        this.isInitialized = true;
      });
      this.player = player;
    } catch (err) {
      console.error(err);
      console.error("This iframe is not ccompatible with playerjs");
    }
  }

  play() {
    this.player.play();
    this.isPlaying = true;
  }
  pause() {
    this.player.pause();
    this.isPlaying = false;
  }
  getPaused() {
    return this.player.getPaused();
  }
  mute() {
    this.player.mute();
  }
  unmute() {
    this.player.unmute();
  }
  getMuted() {
    return this.player.getMuted();
  }
  setVolume(value: number) {
    this.player.setVolume(value);
  }
  getVolume() {
    return this.player.getVolume();
  }
  getDuration() {
    return this.player.getDuration();
  }
  setCurrentTime(value: number) {
    this.player.setCurrentTime(value);
  }
  getCurrentTime() {
    return this.player.getCurrentTime();
  }
  setLoop(value: boolean) {
    this.player.setLoop(value);
  }
  getLoop() {
    return this.player.getLoop();
  }
  removeEventListener() {
    this.player.removeEventListener();
  }
  addEventListener() {
    this.player.addEventListener();
  }
  getIsPlaying() {
    return this.isPlaying;
  }
}