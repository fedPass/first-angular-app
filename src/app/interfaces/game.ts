//interfaccia creata nella prima parte dell'esercizio "statico"
// export interface Game {
//     imgSrc?:string,
//     imgAltText:string,
//     title:string,
//     icons?:string[],
//     date:string
// }

import { Genre } from "./genre";
import { Platform } from "./platform";
import { ShortScreenshot } from "./short-screenshot";

export interface Game {
    id:string,
    background_image:string,
    description:string,
    name:string,
    platforms:Platform[],
    released:string,
    reviews_count:number;
    slug:string;
    rating:number;
    rating_top:number;
    dominant_color:string;
    genres:Genre[];
    screenshots:ShortScreenshot[];
    //trailers: 
}
