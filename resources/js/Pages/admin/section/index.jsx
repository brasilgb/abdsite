import React, { Fragment, useEffect, useRef } from 'react';
import { HiDocumentDuplicate, HiCheck, HiSave } from 'react-icons/hi';
import route from 'ziggy';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../components/admin/layout';

const Seccoes = ({ success, section, categories_section, galleries_section, sectionTitle }) => {

    const { general } = usePage().props

    const section1Ref = useRef();
    const section2Ref = useRef();
    const section3Ref = useRef();
    const section4Ref = useRef();
    const section5Ref = useRef();

    useEffect(() => {
        section1Ref.current.value = section.section1;
        section2Ref.current.value = section.section2;
        section3Ref.current.value = section.section3;
        section4Ref.current.value = section.section4;
        section5Ref.current.value = section.section5;
    }, [])

    const updateSection = (e) => {
        e.preventDefault();
        const section1 = section1Ref.current.value;
        const section2 = section2Ref.current.value;
        const section3 = section3Ref.current.value;
        const section4 = section4Ref.current.value;
        const section5 = section5Ref.current.value;

        Inertia.post(route('seccao.alterar', section.id_section), { _method: 'put', section1, section2, section3, section4, section5 });
    };

    return (
        <Fragment>
            <Layout>
                <Head title={general.title + " - " + sectionTitle} />
                <div className="rounded py-2 px-4 text-gray-900 bg-gray-100 shadow">

                    <div className="p-2 mt-2 flex bg-gray-200 rounded-t-md border border-gray-300">
                        <h1 className="text-2xl text-gray-600 flex items-center">
                            <HiDocumentDuplicate /> Secções
                        </h1>
                    </div>

                    {success &&
                        <div className="flex items-center mt-2 p-2 bg-green-200 border border-green-300 text-gray-600 rounded-md">
                            <span className="mt-1 text-xl"><HiCheck /></span>{success}
                        </div>
                    }

                    <div className="py-4 flex border-b border-gray-300">
                    <p>Defina aqui o conteúdo da página inicial. O conteúdo é definido pelas secções 1, 2, 4 e 5 que serão de categorias e 4 que será galeria de imagens.</p>
                    </div>

                    <form onSubmit={updateSection} className="py-4" autoComplete="off">

                    <div className="pt-2 sm:w-1/2 md:w-1/3 lg:w-8/12">
                            <label htmlFor=""><span className="text-gray-500">Secção 1</span></label>

                            <select
                                ref={section1Ref}
                                className="form-input text-gray-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="section1"
                            >
                                <option value="0">Selecione a categoria para a secção 1</option>
                                {categories_section.map((category, index) => (
                                    <option key={index} value={category.id_category}>{category.categoryname}</option>
                                ))}
                            </select>
                        </div>

                        <div className="pt-2 sm:w-1/2 md:w-1/3 lg:w-8/12">
                            <label htmlFor=""><span className="text-gray-500">Secção 2</span></label>

                            <select
                                ref={section2Ref}
                                className="form-input text-gray-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="section2"
                            >
                                <option value="0">Selecione a categoria para a secção 2</option>
                                {categories_section.map((category, index) => (
                                    <option key={index} value={category.id_category}>{category.categoryname}</option>
                                ))}
                            </select>
                        </div>

                        <div className="pt-2 sm:w-1/2 md:w-1/3 lg:w-8/12">
                            <label htmlFor=""><span className="text-gray-500">Secção 3</span></label>

                            <select
                                ref={section3Ref}
                                className="form-input text-gray-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="section3"
                            >
                                <option value="0">Selecione a galeria pa a secção 3</option>
                                {galleries_section.map((gallery, index) => (
                                    <option key={index} value={gallery.id_gallery}>{gallery.galleryname}</option>
                                ))}
                            </select>
                        </div>

                        <div className="pt-2 sm:w-1/2 md:w-1/3 lg:w-8/12">
                            <label htmlFor=""><span className="text-gray-500">Secção 4</span></label>

                            <select
                                ref={section4Ref}
                                className="form-input text-gray-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="section4"
                            >
                                <option value="0">Selecione a categoria pa a secção 4</option>
                                {categories_section.map((category, index) => (
                                    <option key={index} value={category.id_category}>{category.categoryname}</option>
                                ))}
                            </select>
                        </div>

                        <div className="pt-2 sm:w-1/2 md:w-1/3 lg:w-8/12">
                            <label htmlFor=""><span className="text-gray-500">Secção 5</span></label>

                            <select
                                ref={section5Ref}
                                className="form-input text-gray-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="section5"
                            >
                                <option value="0">Selecione a categoria pa a secção 4</option>
                                {categories_section.map((category, index) => (
                                    <option key={index} value={category.id_category}>{category.categoryname}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center w-full border-t border-gray-300 pt-4 mt-4">
                            <button
                                className="flex items-center md:mb-0 bg-blue-500 hover:bg-blue-700 px-5 py-2 text-sm shadow-sm border-2 border-white text-gray-100 rounded-lg hover:shadow-lg">
                                <HiSave className="text-xl" /> Salvar
                            </button>
                        </div>

                    </form>

                </div>
            </Layout>
        </Fragment>
    )
}

export default Seccoes
