import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const images = [
    { url: "https://as.com/meristation/imagenes/2021/01/18/mexico/1610944753_187605_1610981923_noticia_normal.jpg" },
    { url: "https://revistamorcego.com/wp-content/uploads/2020/10/apex-legends-5.jpg" },
    { url: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2019/02/apex_0.jpg?itok=eYHgavL2" },
    { url: "https://media.vandal.net/master/70202/apex-legends-201924211770_1.jpg" },
];

export const HomeSliders = () => {

    const {width} = useWindowDimensions()

    return (
        <SimpleImageSlider
            width={width}
            height={width / 3}
            images={images}
            showBullets
            showNavs            
        />
    )
}