import React, { Fragment, useState, useEffect, useRef } from 'react';
import { HiDocumentDuplicate, HiCheck, HiChevronDoubleLeft, HiSave, HiExclamation, HiTrash } from 'react-icons/hi';
import route from 'ziggy';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, Head, usePage } from '@inertiajs/inertia-react';
import Layout from '../../../components/admin/layout';
import ModalAudio from '../../../components/admin/modal/audio';

const General = ({ general, generalTitle, success, errimg, erraudio }) => {

    const { errors } = usePage().props

    const titleRef = useRef();
    const descriptionRef = useRef();
    const addressRef = useRef();
    const mapsRef = useRef();
    const contactsRef = useRef();
    const logoRef = useRef();
    const audioRef = useRef();
    const [imageFile, setImageFile] = useState();
    const [idAudio, setIdAudio] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const loadImageFile = (filefield) => {
        if (filefield.type == 'image/jpg' || filefield.type == 'image/jpeg' || filefield.type == 'image/png') {
            return <img className="w-100 border-4 border-gray-100 shadow-md rounded-md" src={URL.createObjectURL(filefield)} alt="" />;
        } else {
            return <div className="border-4 border-gray-100 shadow-md rounded-md bg-red-400 text-white p-4 text-center flex justify-center"><HiExclamation className="text-2xl pt-1" /> Carregue somente imagens JPG, JPEG e PNG</div>;
        }
    };

    useEffect(() => {
        titleRef.current.value = general.title ? general.title : '';
        descriptionRef.current.value = general.description ? general.description : '';
        addressRef.current.value = general.address ? general.address : '';
        mapsRef.current.value = general.maps ? general.maps : '';
        contactsRef.current.value = general.contacts ? general.contacts : '';
    }, [])

    const updateGeneral = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const address = addressRef.current.value;
        const maps = mapsRef.current.value;
        const contacts = contactsRef.current.value;
        const logo = logoRef.current.files[0];
        const audio = audioRef.current.files[0];
        Inertia.post(route('geral.alterar', general.id_general), { _method: 'put', title, description, logo, audio, address, maps, contacts });
    };

    return (
        <Fragment>
            <Layout>
                <Head title={ general.title + ' - ' + generalTitle} />
                <div className="rounded py-2 px-4 text-gray-900 bg-gray-100 shadow">

                    <div className="p-2 mt-2 flex bg-gray-200 rounded-t-md border border-gray-300">
                        <h1 className="text-2xl text-gray-600 flex items-center">
                            <HiDocumentDuplicate /> Configurações gerais
                        </h1>
                    </div>

                    {success &&
                        <div className="flex items-center mt-2 p-2 bg-green-200 border border-green-300 text-gray-600 rounded-md">
                            <span className="mt-1 text-xl"><HiCheck /></span>{success}
                        </div>
                    }

                    <div className="py-4 flex border-b border-gray-300">

                    </div>

                    <form onSubmit={updateGeneral} className="py-4" autoComplete="off">

                        <div className="flex flex-wrap">
                            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-8/12">

                                <div className="pt-2">
                                    <label><span className="text-gray-500">Título do site</span></label>
                                    <input
                                        ref={titleRef}
                                        type="text"
                                        className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        id="title"
                                        placeholder=""
                                    />
                                    {errors.title && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.title}</div>}
                                </div>

                                <div className="pt-2">
                                    <label><span className="text-gray-500">Descrição do site</span></label>
                                    <textarea
                                        ref={descriptionRef}
                                        type="text"
                                        className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        id="description"
                                        placeholder=""
                                    ></textarea>
                                    {errors.description && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.description}</div>}
                                </div>

                                <div className="pt-2">
                                    <label><span className="text-gray-500">Endereço</span></label>
                                    <textarea
                                        ref={addressRef}
                                        rows="3"
                                        className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        id="address"
                                        placeholder=""
                                    ></textarea>
                                    {errors.address && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.address}</div>}
                                </div>

                                <div className="pt-2">
                                    <label><span className="text-gray-500">Contatos</span></label>
                                    <textarea
                                        ref={contactsRef}
                                        rows="3"
                                        className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        id="contacts"
                                        placeholder=""
                                    ></textarea>
                                    {errors.contacts && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.contacts}</div>}
                                </div>

                                <div className="pt-2">
                                    <label><span className="text-gray-500">Mapa (código Google Maps)</span></label>
                                    <textarea
                                        ref={mapsRef}
                                        rows="3"
                                        className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        id="maps"
                                        placeholder=""
                                    ></textarea>
                                    {errors.maps && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" /> {errors.maps}</div>}
                                </div>

                                <div className="pt-2">
                                    <label><span className="text-gray-500">Logo</span></label>
                                    <input
                                        ref={logoRef}
                                        onChange={(e) => { setImageFile(loadImageFile(e.target.files[0])) }}
                                        type="file"
                                        className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        id="logo"
                                        placeholder=""
                                    />
                                    {errors.logo && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" />{errors.logo}</div>}
                                    </div>

                                <div className="pt-2">
                                    <label><span className="text-gray-500">Áudio página inicial</span></label>
                                    <input
                                        ref={audioRef}
                                        type="file"
                                        className="form-input text-gray-500 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        id="audio"
                                        placeholder=""
                                    />
                                    {errors.audio && <div className="p-2 border border-t-0 border-red-200 text-sm flex items-center w-full bg-yellow-100 text-red-500"><HiExclamation className="text-md mt-1" />{errors.audio}</div>}
                                </div>

                            </div>
                            <div className="w-full text-center sm:w-1/2 md:w-1/3 lg:w-4/12 p-8">

                                {
                                    imageFile
                                        ?
                                        <div>
                                            {imageFile}
                                        </div>
                                        :
                                        <div className="flex justify-center">
                                            <img className="border-4 border-gray-100 shadow-md rounded-md" src={general.logo ? '/storage/images/' + general.logo : '/storage/images/default.jpg'} />
                                        </div>
                                }
                                {
                                    general.audio &&
                                    <div className="mt-4 px-16">
                                        <div className="flex justify-center border-4 border-gray-100 shadow-md rounded-md">
                                            <div className="">
                                                <audio controls>
                                                    <source src={'/storage/audio/' + general.audio} type="audio/mpeg" />
                                                </audio>
                                            </div>
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={(e) => { setIsModalVisible(true); setIdAudio(general.id_general) }}
                                                    className="">
                                                    <HiTrash className="text-md text-red-500 hover:text-red-700" />
                                                </button>
                                            </div>
                                        </div>
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
                    {isModalVisible ?
                        <ModalAudio onClose={() => setIsModalVisible(false)} onIdAudio={idAudio}>

                            <div className="text-center p-5 flex-auto justify-center">
                                <HiTrash className="w-16 h-16 flex items-center text-red-500 mx-auto" />
                                <h3 className="text-xl font-bold py-4 ">Tem certeza?</h3>
                                <p className="text-sm text-gray-500 px-8">
                                    Tem certeza de que deseja deletar este audio? Este processo não pode ser desfeito!
                                </p>
                            </div>

                        </ModalAudio>
                        : null}
                </div>
            </Layout>
        </Fragment>
    )
}

export default General;
