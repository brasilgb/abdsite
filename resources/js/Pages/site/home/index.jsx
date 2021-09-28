import React, { Fragment, useEffect } from 'react'
import { HiOutlineColorSwatch, HiOutlineLibrary, HiOutlineLightBulb, HiOutlinePuzzle, HiOutlineUsers } from 'react-icons/hi';
import { BiChurch } from "react-icons/bi";
import Layout from '../../../components/site/layout';
import SliderHome from '../../../components/site/sliderhome';
import route from 'ziggy'
import Aos from 'aos';
import "aos/dist/aos.css"
import { InertiaLink } from '@inertiajs/inertia-react';

const HomeSite = ({ section1, section2, section3, section4, section5 }) => {

    const iconSevices = (index) => {

        switch (index) {
            case 0: return <HiOutlineLightBulb />
            case 1: return <HiOutlineColorSwatch />
            case 2: return <HiOutlinePuzzle />
            case 3: return <HiOutlineLibrary />
        }

    };

    const iconClientes = (index) => {

        switch (index) {
            case 0: return <BiChurch />
            case 1: return <HiOutlineLibrary />
            case 2: return <HiOutlineUsers />
        }

    };

    useEffect(() => {
        Aos.init({});
    }, [])

    return (
        <Fragment>
            <Layout>
                {section1 &&
                    <div>
                        {section1.map((section, indexa) => (
                            <div key={indexa}>
                                <section className="bg-gradient-to-r from-yellow-900 to-yellow-700 border-b border-white" style={{ backgroundImage: "url('/storage/images/hero_ars.jpg')" }}>
                                    <div className="container px-6 py-16 mx-auto">
                                        <div className="items-center lg:flex">
                                            <div className="w-full lg:w-1/2">
                                                <div className="lg:max-w-lg font-Confortaa">
                                                    <h1 className="text-2xl font-semibold text-ars-400 uppercase dark:text-white lg:text-3xl">{section.categoryname}</h1>
                                                    <p className="mt-2 text-gray-500 dark:text-gray-400">{section.descricao}</p>
                                                    <button className="w-full btn px-3 py-2 mt-6 text-xs font-medium text-white bg-ars-700 rounded-md lg:w-auto hover:bg-ars-600 border border-ars-700">
                                                        Ver mais
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                                                <img className="w-full h-full lg:max-w-2xl shadow-lg border-2 border-white" src={"/storage/post/" + section.posts[0].featured} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        ))}
                    </div>
                }

                {section2 &&
                    <div className="px-4 md:px-8 lg:px-80 py-20 pt-2 bg-gray-100">
                        {section2.map((sec2, index2) => (
                            <div key={index2}>
                                <div className="py-8 font-Confortaa">
                                    <h1 className="text-3xl text-center text-shadow text-red-900">{sec2.categorytitle}</h1>
                                    <p className="text-xl text-center py-4">{sec2.descricao}</p>
                                </div>
                                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {sec2.posts.map((post2, pIndex2) => (
                                        <div key={pIndex2}>
                                            <div data-aos="fade-up" data-aos-duration="1500" className="shadow bg-white transition duration-600 ease-in-out hover:shadow-lg hover:bg-white confortaa">
                                                <div className="pb-1 bg-gradient-to-r from-yellow-800 to-yellow-600">
                                                    <img className="h-44 w-full" src={"/storage/post/" + post2.featured} alt="" />
                                                </div>
                                                <div className="flex justify-center pt-4">
                                                    <h1 className="text-6xl ">{iconSevices(pIndex2)}</h1>
                                                </div>
                                                <h1 className="mt-2 text-2xl uppercase text-center">{post2.title}</h1>
                                                <div className="flex justify-end py-3 px-4">
                                                    <InertiaLink
                                                        href={route('postagem', post2.slug)}
                                                        className="text-sm text-gray-600 hover:text-gray-500">
                                                        + Veja Mais
                                                    </InertiaLink>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            </div>
                        ))
                        }
                    </div>
                }

                {section3 &&
                    <section className="bg-gray-200 px-4 md:px-8 lg:px-80 py-20 pt-2">
                        {section3.map((sec3, mIndex3) => (
                            <div key={mIndex3}>
                                <div className="py-8">
                                    <h1 className="text-3xl text-center text-gray-700 text-shadow font-Confortaa">{sec3.galleryname}</h1>
                                </div>
                                <SliderHome galleryData={sec3} />
                            </div>
                        ))}
                    </section>
                }

                {section4 &&
                    <div className="p-4 md:px-8 lg:px-80 py-20 pt-2 bg-gray-100">

                        {section4.map((sec4, index4) => (
                            <div key={index4}>
                                <div className="py-8 font-Confortaa">
                                    <h1 className="text-3xl text-red-900 text-center text-shadow">{sec4.categorytitle}</h1>
                                    <p className="text-xl text-center py-4">{sec4.descricao}</p>
                                </div>
                                <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
                                    {sec4.posts.map((post4, pIndex4) => (
                                        <div key={pIndex4}>
                                            <div data-aos="fade-up" data-aos-duration="1500" className="p-2 border border-white shadow hover:shadow-lg" style={{ backgroundImage: "url(/storage/post/" + post4.featured + ")", backgroundSize: "100%" }}>
                                                <InertiaLink
                                                    href={route('postagem', post4.slug)}
                                                >
                                                    <div className="p-4 rounded border border-white bg-white bg-opacity-80 hover:bg-opacity-70">
                                                        <div className="text-center text-gray-700">
                                                            <div className="flex justify-center">
                                                                <h1 className="text-8xl text-gray-800">{iconClientes(pIndex4)}</h1>
                                                            </div>
                                                            <h1 className="text-xl uppercase text-center pt-4">{post4.title}</h1>
                                                        </div>
                                                    </div>
                                                </InertiaLink>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            </div>
                        ))
                        }
                    </div>
                }

                {section5 &&
                    <div className="bg-yellow-700 bg-opacity-20 px-4 md:px-8 lg:px-80 py-20 pt-2"
                        style={{ backgroundImage: "url('/storage/images/bottom_ars3.jpg')", backgroundSize: "100%" }}
                    >
                        {section5.map((sec5, index5) => (
                            <div key={index5}>
                                <div className="py-8 font-Confortaa">
                                    <h1 className="text-3xl text-center text-gray-100 text-shadow">{sec5.categorytitle}</h1>
                                    <p className="text-xl text-center py-4 text-gray-200">{sec5.descricao}</p>
                                </div>
                                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {sec5.posts.map((post5, pIndex5) => (
                                        <div key={pIndex5}>
                                            <div data-aos="fade-up" className="h-full flex flex-col p-0 shadow bg-white transition duration-600 ease-in-out hover:shadow-lg hover:bg-white" style={{ fontFamily: "'Comfortaa', cursive" }}>
                                                <div className="pb-1 pr-0 bg-gradient-to-r from-yellow-800 to-yellow-600">
                                                    <img className="h-44 w-full" src={"/storage/post/" + post5.featured} alt="" />
                                                </div>
                                                <h1 className="mt-4 text-2xl uppercase text-center">{post5.title}</h1>
                                                <p className="text-center text-gray-500 text-sm">{post5.summary}</p>
                                                <div className="relative py-6 flex-grow">
                                                    <InertiaLink
                                                        href={route('postagem', post5.slug)}
                                                        className="absolute bottom-3 right-4 text-sm text-gray-600 hover:text-gray-500"
                                                    >
                                                        + Veja Mais
                                                    </InertiaLink>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            </div>
                        ))
                        }

                    </div>
                }
            </Layout>
        </Fragment>

    )
}

export default HomeSite

