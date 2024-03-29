export interface HighlightOptions {
    width?: string;
    height?: string;
    type?: "minimal" | "lvn";
    fontWeight?: string;
    fontSize?: string;
    fontFamily?: FontFamlily;
    italics?: boolean;
    highlightColor?: string;
    textColor?: string;
    backgroundColor?: string;
    scrolling?: boolean;
    audioControls?: boolean;
    environment?: "dev" | "prod";
    src?: string;
    secret?: string;
}
declare type FontFamlily = "Lato" | "Merriweather" | "Montserrat" | "Open Sans" | "Oswald" | "Roboto" | "Signika";
export declare type playerjsEVENTS = "ready" | "play" | "pause" | "ended" | "timeupdate" | "progress" | "error";
export {};
