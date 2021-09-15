import React, { Fragment, useState, useEffect, useRef } from 'react';
import { HiDocumentDuplicate, HiCheck, HiChevronDoubleLeft, HiSave, HiExclamation } from 'react-icons/hi';
import route from 'ziggy';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, Head, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../components/admin/layout';

const Edit = ({ gallery, galleryTitle, success }) => {

    const { errors, general } = usePage().props

    const [values, setValues] = useState({
        galleryname: null,
    });

    const gallerynameRef = useRef();
    const activeRef = useRef();

    useEffect(() => {
        gallerynameRef.current.value = gallery.galleryname;
        activeRef.current.checked = gallery.active;
    }, [])

    const updateCategory = (e) => {
        e.preventDefault();
        const galleryname = gallerynameRef.current.value;
        const active = activeRef.current.checked;
        Inertia.put(route('galeria.update', gallery.id_gallery), { galleryname, active });
    };

    return (
        <Fragment>
            <Layout>
                <Head gallery={ general.title + ' - ' + galleryTitle} />
                <div className="rounded py-2 px-4 text-gray-900 bg-gray-100 shadow">

                    <div className="p-2 mt-2 flex bg-gray-200 rounded-t-md border border-gray-300">
                        <h1 className="text-2xl text-gray-600 flex items-center">
                            <HiDocumentDuplicate /> Categorias
                        </h1>
                    </div>

                    {success &&
                        <div className="flex items-center mt-2 p-2 bg-green-200 border border-green-300 text-gray-600 rounded-md">
                            <span className="mt-1 text-xl"><HiCheck /></span>{success}
                        </div>
                    }

                    <div className="py-4 flex border-b border-gray-300">
                        <InertiaLink
                            as="button"
                            type="button"
                            href={route('galeria.index')}
                            className="flex items-center mb-2 md:mb-0 bg-blue-500 hover:bg-blue-700 px-5 py-2 text-sm shadow-sm border-2 border-white text-gray-100 rounded-lg hover:shadow-lg">
                            <HiChevronDoubleLeft className="text-xl" /> Voltar
                        </InertiaLink>
                    </div>

                    <form onSubmit={updateCategory} className="py-4" autoComplete="off">

                        <div className="w-8/12 pb-0">
                            <label><span className="text-gray-500">Nome da galeria</span></label>
                            <input
                                ref={gallerynameRef}
                                type="text"
                                className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="galleryname"
                                placeholder=""
                            />
                            {errors.galleryname && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.galleryname}</div>}
                        </div>

                        <div className="w-8/12 pt-2">
                            <div className="flex items-center">
                                <input
                                    ref={activeRef}
                                    type="checkbox"
                                    className="form-checkbox text-gray-500 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    id="active"
                                />
                                <label htmlFor=""><span className="text-gray-500 pl-2">Tornar galeria disponível em galerias</span></label>
                            </div>
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

export default Edit;
