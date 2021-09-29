import { InertiaLink, Head, usePage } from '@inertiajs/inertia-react'
import route from 'ziggy'
import React, { Fragment } from 'react'
import { HiLightBulb } from 'react-icons/hi'
import { GoArrowSmallRight } from 'react-icons/go'
import Layout from '../../../components/site/layout'

const gallerySite = ({ galleries }) => {

    const { general } = usePage().props
    return (
        <Fragment>

            <Layout>

                <Head title={general.title + ' : ' + galleries[0].galleryname} />

                <div className="w-full">

                    <div>
                        {galleries.map((gallery, index) => (

                            <div key={index}>
                                {galleries.length > 0 ?
                                    <div>
                                        <section className="border-b border-white" style={{
                                            backgroundImage: `url('/storage/gallery/${galleries[0].cover}')`,
                                            backgroundPosition: 'right',
                                            backgroundColor: '#B45309',
                                            backgroundSize: '50%',
                                            backgroundRepeat: 'no-repeat'
                                        }}>

                                            <div className="container py-0 mx-auto">
                                                <div className="h-40 md:h-96 items-center lg:flex">
                                                    <div className="h-full md:h-96 border-r-4 border-white flex items-center justify-left w-full bg-gradient-to-r from-yellow-700 to-yellow-600 lg:w-6/12">
                                                        <div className="max-w-lg lg:max-w-lg p-2">
                                                            <h1 className="md:text-2xl text-md font-semibold text-gray-200 uppercase dark:text-white lg:text-3xl">Nossos trabalhos</h1>
                                                            <p className="mt-2 md:text-xl text-sm text-gray-100 dark:text-gray-400">Aprecie nossos trabalhos</p>
                                                        </div>
                                                    </div>
                                                    <div className="h-96 flex items-center justify-rigth w-full mt-6 lg:mt-0 lg:w-5/12"></div>
                                                </div>
                                            </div>

                                        </section>
                                        <div className="bg-gray-200 p-4 md:px-8 lg:px-80 py-10">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                                <section className="mx-auto container">
                                                    {galleries.map((gallery, pIndex) => (
                                                        <div key={pIndex}>

                                                            <div className="mb-4 bg-gray-100 border-2 border-white shadow hover:shadow-md rounded">
                                                                <img className="w-full h-48" src={"/storage/gallery/" + gallery.cover} alt="" />

                                                                <div className="px-6 py-4">
                                                                    <p className="text-center text-sm md:text-sm font-Confortaa font-semibold text-gray-700 uppercase">{gallery.galleryname}</p>
                                                                    <p className="text-center text-sm md:text-sm font-Confortaa text-ars-700 break-words">{gallery.description}</p>
                                                                </div>

                                                                <div className="mb-0 pt-1 flex flex-auto items-center justify-end border-t border-gray-200">
                                                                    <InertiaLink
                                                                        href={route('media', gallery.slug)}
                                                                        className="flex items-center text-sm  font-Confortaa text-yellow-600 hover:text-yellow-500"
                                                                    >
                                                                        <span>Ver imagens</span><GoArrowSmallRight className="pt-1 text-4xl" />
                                                                    </InertiaLink>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    ))} </section>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="container flex justify-center mx-auto rounded-lg mt-10 p-10 bg-yellow-200 border border-red-300">
                                        <HiLightBulb className="text-2xl text-red-500" /> <p className="text-lg text-red-500">Não há dados a serem mostrados para esta categoria!!</p>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>

        </Fragment>

    )
}

export default gallerySite
