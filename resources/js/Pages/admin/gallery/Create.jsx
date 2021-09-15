import React, { Fragment, useRef, useState } from 'react';
import { HiDocumentDuplicate, HiCheck, HiChevronDoubleLeft, HiSave, HiExclamation } from 'react-icons/hi';
import route from 'ziggy';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, Head, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../components/admin/layout';

const Create = ({ success, galleryTitle, error }) => {

    const { errors, general } = usePage().props

    const gallerynameRef = useRef();
    const descriptionRef = useRef();
    const coverRef = useRef();
    const activeRef = useRef();
    const socialRef = useRef();
    const sliderRef = useRef();
    const [imageFile, setImageFile] = useState();

    const loadImageFile = (filefield) => {
        if (filefield.type == 'image/jpg' || filefield.type == 'image/jpeg' || filefield.type == 'image/png') {
            return <div className="border-4 border-gray-100 shadow-md rounded-md"><img src={URL.createObjectURL(filefield)} alt="" /></div>;
        } else {
            return <div className="border-4 border-gray-100 shadow-md rounded-md bg-red-400 text-white p-4 flex justify-center"><HiExclamation className="text-2xl pt-1" /> Carregue somente imagens JPG, JPEG e PNG</div>;
        }
    };

    const saveData = (e) => {
        e.preventDefault();
        const galleryname = gallerynameRef.current.value;
        const description = descriptionRef.current.value;
        const cover = coverRef.current.files[0];
        const active = activeRef.current.checked;
        const social = socialRef.current.checked;
        const slider = sliderRef.current.checked;

        Inertia.post(route('galeria.store'), { galleryname, description, cover, active, social, slider });
    };

    return (
        <Fragment>
            <Layout>
                <Head title={ general.title + ' - ' + galleryTitle} />
                <div className="rounded py-2 px-4 text-gray-900 bg-gray-100 shadow">

                    <div className="p-2 mt-2 flex bg-gray-200 rounded-t-md border border-gray-300">
                        <h1 className="text-2xl text-gray-600 flex items-center">
                            <HiDocumentDuplicate /> Galerias
                        </h1>
                    </div>

                    {success &&
                        <div className="flex items-center p-2 mt-2 bg-green-200 border border-green-300 text-gray-600 rounded-md">
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

                    <form onSubmit={saveData} className="py-4" autoComplete="off">

                        <div className="flex flex-wrap">
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-8/12">

                                <div className="pb-0">
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

                                <div className="pb-0">
                                    <label><span className="text-gray-500">Descrição da galeria</span></label>
                                    <textarea
                                        ref={descriptionRef}
                                        className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        id="description"
                                        placeholder=""
                                    ></textarea>
                                    {errors.description && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.description}</div>}
                                </div>

                                <div className="pt-2">
                                    <label htmlFor=""><span className="text-gray-500">Imagem de capa</span></label>
                                    <input
                                        type="file"
                                        onChange={(e) => { setImageFile(loadImageFile(e.target.files[0])) }}
                                        ref={coverRef}
                                        className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        id="cover"
                                    />
                                    {errors.cover && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" />{errors.cover}</div>}
                                </div>

                                <div className="pt-2">
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

                                <div className="pt-2">
                                    <div className="flex items-center">
                                        <input
                                            ref={socialRef}
                                            type="checkbox"
                                            className="form-checkbox text-gray-500 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            id="social"
                                        />
                                        <label htmlFor=""><span className="text-gray-500 pl-2">Tornar botão compartilar redes sociais visivel em imagens</span></label>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="flex items-center">
                                        <input
                                            ref={sliderRef}
                                            type="checkbox"
                                            className="form-checkbox text-gray-500 mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            id="slider"
                                        />
                                        <label htmlFor=""><span className="text-gray-500 pl-2">Tornar galeria slider na secção 3 da página inicial</span></label>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-4/12 p-8">
                                {imageFile &&
                                    <div>
                                        {imageFile}
                                    </div>
                                }
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

export default Create;


