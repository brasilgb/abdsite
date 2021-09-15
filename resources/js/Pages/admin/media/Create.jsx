import React, { Fragment, useEffect, useRef, useState } from 'react';
import { HiDocumentDuplicate, HiCheck, HiChevronDoubleLeft, HiSave, HiExclamation } from 'react-icons/hi';
import route from 'ziggy';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, Head, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../components/admin/layout';

const Create = ({ galleryid, success, galleryTitle, error }) => {

    const { errors, general } = usePage().props

    const [values, setValues] = useState({
        media: null,
    })
    const mediaRef = useRef();
    const galleryRef = useRef();

    //const [imageFile, setImageFile] = useState();

    useEffect(() => {
        galleryRef.current.value = galleryid;
    }, [])

    // const loadImageFile = (filefield) => {
    //     if (filefield.type == 'image/jpg' || filefield.type == 'image/jpeg' || filefield.type == 'image/png') {
    //         return <div className="border-4 border-gray-100 shadow-md rounded-md"><img src={URL.createObjectURL(filefield)} alt="" /></div>;
    //     } else {
    //         return <div className="border-4 border-gray-100 shadow-md rounded-md bg-red-400 text-white p-4 text-center flex justify-center"><HiExclamation className="text-2xl pt-1" /> Carregue somente imagens JPG, JPEG e PNG</div>;
    //     }
    // };

    const saveData = (e) => {
        e.preventDefault();

        const media = mediaRef.current.files;
        const gallery = galleryRef.current.value;

        Inertia.post(route('midia.store'), { gallery, media });
    };

    return (
        <Fragment>
            <Layout>
                <Head gallery={ general.title + ' - ' + galleryTitle} />
                <div className="rounded py-2 px-4 text-gray-900 bg-gray-100 shadow">

                    <div className="p-2 mt-2 flex bg-gray-200 rounded-t-md border border-gray-300">
                        <h1 className="text-2xl text-gray-600 flex items-center">
                            <HiDocumentDuplicate /> Galerias
                        </h1>
                    </div>

                    {success &&
                        <div className="flex items-center p-2 mt-2 bg-red-200 border border-red-300 text-red-600 rounded-md">
                            <span className="mt-1 text-xl"><HiExclamation className="text-2xl text-yellow-600" /></span>{success}
                        </div>
                    }

                    <div className="py-4 flex border-b border-gray-300">
                        <InertiaLink
                            as="button"
                            type="button"
                            href={route('galeria.index')}
                            className="flex items-center mb-2 md:mb-0 bg-blue-500 hover:bg-blue-700 px-5 py-2 text-sm shadow-sm border-2 border-white text-gray-100 rounded-lg hover:shadow-lg">
                            <HiChevronDoubleLeft className="text-xl" /> Voltar à galerias
                        </InertiaLink>
                    </div>

                    <form onSubmit={saveData} className="py-4" autoComplete="off" >

                        <input type="hidden" ref={galleryRef} />
                        <div className="pt-2">
                            <label htmlFor=""><span className="text-gray-500">Média</span></label>
                            <input
                                type="file"
                                //onChange={(e) => { setImageFile(loadImageFile(e.target.files)) }}
                                ref={mediaRef}
                                className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                id="media"
                                multiple
                            />
                            {error && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" />{error}</div>}
                            {errors.media && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" />{errors.media}</div>}
                        </div>

                        <div className="flex items-center w-full border-t border-gray-300 pt-4 mt-4">
                            <button
                                className="flex items-center md:mb-0 bg-blue-500 hover:bg-blue-700 px-5 py-2 text-sm shadow-sm border-2 border-white text-gray-100 rounded-lg hover:shadow-lg">
                                <HiSave className="text-xl" /> Salvar
                            </button>
                        </div>
                    </form>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-4/12 p-8">
                        {/* {imageFile &&
                            <div>
                                {imageFile}
                            </div>
                        } */}
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

export default Create;
