import { Head, usePage } from '@inertiajs/inertia-react'
import React, { Fragment } from 'react'
import { HiLocationMarker, HiPhone } from 'react-icons/hi'
import {IoLogoWhatsapp} from 'react-icons/io'
import Layout from '../../../components/site/layout'

const Contact = () => {

    const { general } = usePage().props

    return (
        <Fragment>
            <Layout>
                <Head title={general.title + ' : Contatos'} />

                <section className="text-gray-600 body-font relative">
                    <div className="absolute inset-0 bg-gray-300">

                        <iframe width="100%" height="100%" frameBorder="0" marginHeight="0" marginWidth="0" title="map" scrolling="no" src={general.maps}>

                        </iframe>
                    </div>
                    <div className="container px-5 py-10 mx-auto flex">
                        <div className="lg:w-5/12 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                            <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">Entrar em contato</h2>
                                <p className="mt-3 text-center text-gray-600 dark:text-gray-400">Para tirar suas dúvidas entre em contato, utilize-se uma das formas abaixo..</p>

                                <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3">
                                    <div className="flex flex-col items-center px-2 py-3 text-gray-700 dark:text-gray-200">
                                    <HiLocationMarker/>
                                        <span className="mt-2 text-sm">{general.address}</span>
                                    </div>

                                    <div className="flex flex-col items-center px-2 py-3 text-gray-700 dark:text-gray-200">
                                        <HiPhone/>
                                        <span className="mt-2 text-sm">{general.phone}</span>
                                    </div>

                                    <div className="flex flex-col items-center px-2 py-3 text-gray-700 dark:text-gray-200">
                                        <IoLogoWhatsapp/>

                                        <span className="mt-2 text-sm">{general.whatsapp}</span>
                                    </div>
                                </div>

                                <div className="mt-6 ">
                                    <div className="items-center -mx-2 md:flex">
                                        <div className="w-full mx-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Name</label>

                                            <input className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="text" />
                                        </div>

                                        <div className="w-full mx-2 mt-4 md:mt-0">
                                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">E-mail</label>

                                            <input className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="email" />
                                        </div>
                                    </div>

                                    <div className="w-full mt-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Message</label>

                                        <textarea className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
                                    </div>

                                    <div className="flex justify-center mt-6">
                                        <button className="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Send Message</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                </section>

            </Layout>
        </Fragment>
    )
}

export default Contact
