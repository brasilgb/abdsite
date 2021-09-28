import { InertiaLink, Head, usePage } from '@inertiajs/inertia-react'
import React, { Fragment } from 'react'
import { HiLightBulb } from 'react-icons/hi'
import Layout from '../../../components/site/layout'

const gallerySite = ({ galleries_images }) => {

    const { general } = usePage().props
    return (
        <Fragment>

            <Layout>

                <Head title={general.title + ' : ' + galleries_images[0].galleryname} />

                <div className="w-full">

                    <div>
                        {galleries_images.map((gallery, index) => (

                            <div key={index}>
                                {galleries_images.length > 0 ?
                                    <div>
                                        <section className="border-b border-white" style={{
                                            backgroundImage: `url('/storage/gallery/${galleries_images[0].cover}')`,
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
                                            <div className="gap-4">
                                                <section className="gap-4 w-full mx-auto container" style={{columnWidth: "200px", columnCount: "6"}}>
                                                    {gallery.medias.map((media, mIndex) => (
                                                        <div key={mIndex}>
                                                            <div className="mb-4 bg-gray-100 border-2 border-white shadow hover:shadow-md rounded" style={{breakInside: "avoid-column"}}>
                                                                <img className="border-b-2 border-white rounded-t" src={"/storage/gallery/" + media.media} alt={media.title} />
                                                                {media.description &&
                                                                    <div className="px-6 py-4">
                                                                        <p className="text-center text-lg md:text-md text-gray-700">{media.title}</p>
                                                                        <p className="text-center text-sm md:text-md text-ars-700">{media.description}</p>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    ))}
                                                </section>
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
