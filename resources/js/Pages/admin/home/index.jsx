import React, { Fragment } from 'react';
import { HiCamera, HiDocumentDuplicate, HiPencilAlt, HiPhotograph, HiViewGrid } from 'react-icons/hi';
import { Head, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../components/admin/layout';


const HomeAdmin = (props) => {

    const { general } = usePage().props;

    return (
    <Fragment>
        <Layout>
        <Head title={ general.title + ' - ' + props.homeTitle} />
            <div className="flex items-center justify-center bg-gray-100 border border-white shadow-md rounded">
                <div className="w-full">
                    <h3 className="text-white p-2 md:text-2xl lg:text-2xl text-md border-b border-gray-300 text-gray-600">Dashboard</h3>
                    <div className="p-2 flex-wrap  flex items-center gap-2 justify-center">
                        <div className="flex justify-left flex-auto w-42 h-42 bg-blue-400 border-2 border-white shadow-md rounded">
                            <div className="p-4 flex-inicial bg-blue-300">
                                <HiDocumentDuplicate className="text-7xl text-blue-700" />
                            </div>
                            <div className="p-2 flex-auto">
                                <h2 className="text-xl text-center text-gray-100">Páginas</h2>
                                <h3 className="text-6xl text-gray-100 text-center">{props.pages.length}</h3>
                            </div>
                        </div>
                        <div className="flex justify-left flex-auto w-42 h-42 bg-red-400 border-2 border-white shadow-md rounded">
                            <div className="p-4 flex-inicial bg-red-300">
                                <HiViewGrid className="text-7xl text-red-700" />
                            </div>
                            <div className="p-2 flex-auto">
                                <h2 className="text-xl text-center text-gray-100">Categorias</h2>
                                <h3 className="text-6xl  text-gray-100  text-center">{props.categories.length}</h3>
                            </div>
                        </div>
                        <div className="flex justify-left flex-auto w-42 h-42 bg-green-400 border-2 border-white shadow-md rounded">
                            <div className="p-4 flex-inicial bg-green-300">
                                <HiPencilAlt className="text-7xl text-green-700" />
                            </div>
                            <div className="p-2 flex-auto">
                                <h2 className="text-xl text-center text-gray-100 capitalize">Postagens</h2>
                                <h3 className="text-6xl text-gray-100 text-center">{props.posts.length}</h3>
                            </div>
                        </div>
                        <div className="flex justify-left flex-auto w-42 h-42 bg-indigo-400 border-2 border-white shadow-md rounded">
                            <div className="p-4 flex-inicial bg-indigo-300">
                                <HiPhotograph className="text-7xl text-indigo-700" />
                            </div>
                            <div className="p-2 flex-auto">
                                <h2 className="text-xl text-center text-gray-100 capitalize">Galerias</h2>
                                <h3 className="text-6xl  text-gray-100 text-center">{props.galleries.length}</h3>
                            </div>
                        </div>
                        <div className="flex justify-left flex-auto w-42 h-42 bg-purple-400 border-2 border-white shadow-md rounded">
                            <div className="p-4 flex-inicial bg-purple-300">
                                <HiCamera className="text-7xl text-purple-700" />
                            </div>
                            <div className="p-2 flex-auto">
                                <h2 className="text-xl text-center text-gray-100 capitalize">Imagens</h2>
                                <h3 className="text-6xl  text-gray-100 text-center">{props.images.length}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    </Fragment>
)};

export default HomeAdmin;
