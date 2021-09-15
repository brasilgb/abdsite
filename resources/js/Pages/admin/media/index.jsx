import React, { Fragment, useEffect, useRef, useState } from 'react';
import { InertiaLink, Head, usePage } from '@inertiajs/inertia-react';
import route from 'ziggy';
import { HiDocumentDuplicate, HiCheck, HiPlus, HiChevronDoubleLeft, HiChevronDoubleRight, HiLightBulb, HiOutlineCheck, HiPencilAlt, HiTrash, HiX } from 'react-icons/hi';
import Layout from '../../../components/admin/layout';
import Pagination from '../../../components/admin/pagination';
import { compareAsc, format } from 'date-fns'
import ModalMedia from '../../../components/admin/modal/media';
import { Inertia } from '@inertiajs/inertia';

const MediaAdmin = ({ galleryid, galleryname, media, success, mediaTitle }) => {

    const { general } = usePage().props;

    const verifyMedia = () => {
        if (media.data.length == 0) {
            return <div className="flex w-full bg-red-200 text-red-700 text-md p-2"><HiLightBulb className="text-2xl text-yellow-600" /> Não há imagens a serem mostradas no momento. Clique no botão adicionar imagens para adicionar à galeria.</div>;
        }
    };

    const [idMedia, setIdMedia] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const galleryRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();

    const updateMedia = (gallery,media,title,description) => {
        // const title = titleRef.current.value;
        // const gallery = galleryRef.current.value
        // const description = descriptionRef.current.value;
        Inertia.post(route('midia.alterar', media), { _method: 'put', title, gallery, description });
    };

    return (
        <Fragment>
            <Layout>
                <Head title={ general.title + ' - ' + mediaTitle} />
                <div className="rounded py-2 px-4 text-gray-900 bg-gray-100 shadow">

                    <div className="p-2 mt-2 flex bg-gray-200 rounded-t-md border border-gray-300">
                        <h1 className="text-2xl text-gray-600 flex items-center">
                            <HiDocumentDuplicate /> Galeria <span className="ml-4 pt-1 text-md italic text-gray-400">({galleryname})</span>
                        </h1>
                    </div>

                    {success &&
                        <div className="flex items-center p-2 mt-2 bg-green-200 border border-green-300 text-gray-600 rounded-md">
                            <span className="mt-1 text-xl"><HiCheck /></span>{success}
                        </div>
                    }

                    <div className=" flex items-center justify-between py-4 border-b border-gray-300">
                        <div className="relative">
                            <InertiaLink
                                as="button"
                                type="button"
                                href={route('galeria.index')} className="flex items-center mb-2 md:mb-0 bg-blue-500 hover:bg-blue-700 px-5 py-2 text-sm shadow-sm border-2 border-white text-gray-100 rounded-lg hover:shadow-lg">
                                <HiChevronDoubleLeft className="text-xl" /> Voltar a galerias
                            </InertiaLink>
                        </div>

                        <div className="relative">

                        </div>

                        <div className="relative">
                            <InertiaLink
                                method="get"
                                as="button"
                                type="button"
                                href={route('midia.inserir', galleryid)}
                                className="flex items-center mb-2 md:mb-0 bg-blue-500 hover:bg-blue-700 px-5 py-2 text-sm shadow-sm border-2 border-white text-gray-100 rounded-lg hover:shadow-lg">
                                <HiPlus className="text-xl" /> Adicionar imagens
                            </InertiaLink>
                        </div>

                    </div>

                    <div className="px-0 py-4">
                {verifyMedia &&
                    verifyMedia()
                }
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                    {media.data.map((media, index) => (

                        <div key={index} className="border-4 border-white rounded shadow bg-white">
                            <img className="w-full rounded-t-sm" src={media.media ? '/storage/gallery/' + media.media : '/storage/default.jpg'} alt="" />

                            <div className="flex justify-left pt-1 mt-1 bg-gray-200">
                                <button
                                    onClick={(e) => { setIsModalVisible(true); setIdMedia(media.id_media) }}
                                    className="px-2 py-2">
                                    <HiTrash className="text-md text-red-500 hover:text-red-700" />
                                </button>
                                <div className="w-full text-center">
                                    <input
                                        defaultValue={media.title}
                                        ref={titleRef}
                                        onBlur={(e) => { updateMedia(media.gallery_id,media.id_media,e.target.value,media.description) }}
                                        type="text"
                                        className="w-full px-1 mt-1 text-md font-medium bg-gray-200 text-gray-500 rounded-sm"
                                        placeholder="Digite um título"
                                    />
                                </div>
                            </div>
                            <div className="w-full m-0">
                                <textarea
                                    defaultValue={media.description}
                                    ref={descriptionRef}
                                    onBlur={(e) => { updateMedia(media.gallery_id,media.id_media,media.title,e.target.value) }}
                                    className="w-full px-1 mt-1 text-md font-medium bg-gray-200 text-gray-500 rounded-sm"
                                    placeholder="Digite aqui a descrição"
                                >
                                </textarea>
                            </div>
                        </div>
                    ))}
                </div>

                {isModalVisible ?
                    <ModalMedia onClose={() => setIsModalVisible(false)} onIdMedia={idMedia}>

                        <div className="text-center p-5 flex-auto justify-center">
                            <HiTrash className="w-16 h-16 flex items-center text-red-500 mx-auto" />
                            <h3 className="text-xl font-bold py-4 ">Tem certeza?</h3>
                            <p className="text-sm text-gray-500 px-8">
                                Tem certeza de que deseja deletar esta imagem? Este processo não pode ser desfeito!
                            </p>
                        </div>

                    </ModalMedia>
                    : null}
            </div>

                    <Pagination data={media} />
                </div>

            </Layout>
        </Fragment>
    )
};

export default MediaAdmin;
