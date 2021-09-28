import { InertiaLink } from "@inertiajs/inertia-react";
import React from "react";
import Slider from "react-slick";
import route from 'ziggy'

const SliderHome = ({ galleryData }) => {

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div>

            <Slider {...settings}>
                {galleryData.medias.map((media, index) => (
                    <div key={index}>
                        <article className=" my-4 h-80 p-1 mx-4 shadow bg-white transition duration-600 ease-in-out hover:shadow-lg hover:bg-white" style={{ fontFamily: "'Comfortaa', cursive" }}>
                            <div data-aos="fade-up" data-aos-duration="1500" className="pb-1 bg-gradient-to-r from-red-900 to-red-600">
                                <InertiaLink href={route('galerias')}><img className="w-full h-48" src={"storage/gallery/" + media.media} alt="" /></InertiaLink>
                            </div>
                            <h1 className="mt-2 text-sm text-gray-500 text-center">{media.description}</h1>
                        </article>
                    </div>
                ))
                }

            </Slider>
        </div>
    );
}

export default SliderHome;
