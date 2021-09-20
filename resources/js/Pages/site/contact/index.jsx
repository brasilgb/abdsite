import { Inertia } from '@inertiajs/inertia'
import { Head, usePage } from '@inertiajs/inertia-react'
import React, { Fragment, useRef } from 'react'
import { HiLocationMarker, HiPhone, HiExclamation, HiExclamationCircle, HiCheck } from 'react-icons/hi'
import { IoLogoWhatsapp } from 'react-icons/io'
import { GiFeather } from 'react-icons/gi'
import Layout from '../../../components/site/layout'
import route from 'ziggy'

const Contact = ({ error, success }) => {

    const { errors, general } = usePage().props;

    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    const sendMessage = (e) => {

        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const message = messageRef.current.value;
        Inertia.post(route('enviar'), { name, email, message });
        e.target.reset();
    };

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
                                    <HiLocationMarker />
                                    <span className="mt-2 text-sm">{general.address}</span>
                                </div>

                                <div className="flex flex-col items-center px-2 py-3 text-gray-700 dark:text-gray-200">
                                    <HiPhone />
                                    <span className="mt-2 text-sm">{general.phone}</span>
                                </div>

                                <div className="flex flex-col items-center px-2 py-3 text-gray-700 dark:text-gray-200">
                                    <IoLogoWhatsapp />

                                    <span className="mt-2 text-sm">{general.whatsapp}</span>
                                </div>
                            </div>

                            <form onSubmit={sendMessage} autoComplete="off">
                                <div className="mt-6 ">
                                    <div className="items-center -mx-2 md:flex">
                                        <div className="w-full mx-2">
                                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Nome</label>
                                            <input
                                                ref={nameRef}
                                                type="text"
                                                className={`block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring
                                                ${errors.name ? 'rounded-t-md border-red-200' : 'rounded-md border-gray-300'}`}
                                                id="name"
                                            />
                                            {errors.name && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.name}</div>}
                                        </div>

                                        <div className="w-full mx-2 mt-4 md:mt-0">
                                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">E-mail</label>
                                            <input
                                                ref={emailRef}
                                                type="email"
                                                className={`block w-full px-4 py-2 text-gray-700 bg-white border dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" +
                                            ${errors.email ? 'rounded-t-md border-red-200' : 'rounded-md border-gray-300'}`}
                                                id="email"
                                            />
                                            {errors.email && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.email}</div>}
                                        </div>
                                    </div>

                                    <div className="w-full mt-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Mensagem</label>
                                        <textarea
                                            ref={messageRef}
                                            className={`block w-full h-40 px-4 py-2 text-gray-700 bg-white border dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring
                                            ${errors.message ? 'rounded-t-md border-red-200' : 'rounded-md border-gray-300'}`}
                                            id="message"
                                        ></textarea>
                                        {errors.message && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.message}</div>}
                                    </div>

                                    <div className="flex justify-center mt-6">
                                        <button
                                            className="flex items-center justify-center px-4 py-2 text-white transition-colors duration-200 transform bg-ars-700 rounded-md hover:bg-ars-600 focus:outline-none focus:bg-ars-600"
                                        >
                                            <GiFeather className="mr-2 text-lg" /><span>{sendMessage ? "Enviar": "enviando.."}</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div>
                                {error &&
                                    <div className="flex items-center mt-2 p-2 bg-yellow-100 border border-red-100 text-red-400 rounded-md">
                                        <span className="text-lg"><HiExclamationCircle /> </span> {error}
                                    </div>
                                }
                                {success &&
                                    <div className="flex items-center mt-2 p-2 bg-green-200 border border-green-300 text-gray-600 rounded-md">
                                        <span className="text-lg"><HiCheck /> </span> {success}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                </section>

            </Layout>
        </Fragment>
    )
}

export default Contact
