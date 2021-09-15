import React, { Fragment, useRef, useState } from 'react';
import { InertiaLink, Head, usePage } from '@inertiajs/inertia-react';
import route from 'ziggy';
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiLightBulb, HiOutlineCheck, HiPencilAlt, HiTrash, HiX, HiDocumentDuplicate, HiCheck, HiPlus, HiSearch, HiRefresh } from 'react-icons/hi';
import Layout from '../../../components/admin/layout';
import Pagination from '../../../components/admin/pagination';
import { Inertia } from '@inertiajs/inertia';
import { compareAsc, format } from 'date-fns'
import ModalPage from '../../../components/admin/modal/page';

const PageAdmin = ({ pages, success, reload, pageTitle }) => {

    const searchRef = useRef();

    const { general } = usePage().props;

    const searchData = (e) => {
        e.preventDefault();
        const search = searchRef.current.value;
        Inertia.post(route('pagina.search'), { search });
    };

    const verifyPages = () => {
        if (pages.data.length == 0) {
            return <tr><td colSpan="7"><div className="flex justify-left bg-red-200 text-red-700 text-md p-2"><HiLightBulb className="text-2xl text-yellow-600" /> Não há páginas a serem mostradas no momento. Clique no botão criar página para adicionar.</div></td></tr>;
        }
    };

    const dataFormatada = (dataRaw) => {
        return format(new Date(dataRaw), 'dd/MM/yyyy')
    }

    const [idPage, setIdPage] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);

    const reloadBtn = () => {
        if (reload == true) {
            return (
                <InertiaLink
                    as="button"
                    type="button"
                    href={route('pagina.index')}
                    className="flex items-center mb-2 md:mb-0 px-5 py-2 text-sm shadow-sm border-2 border-white text-gray-500 rounded-lg">
                    <HiRefresh className="text-xl text-green-600" />
                </InertiaLink>
            )
        } else {
            return false;
        }
    };

    return (
        <Fragment>
            <Layout>
                <Head title={general.title + ' - ' + pageTitle} />
                <div className="rounded py-2 px-4 text-gray-900 bg-gray-100 shadow">

                    <div className="p-2 mt-2 flex bg-gray-200 rounded-t-md border border-gray-300">
                        <h1 className="text-2xl text-gray-600 flex items-center">
                            <HiDocumentDuplicate /> Páginas
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
                                href={route('pagina.create')} className="flex items-center mb-2 md:mb-0 bg-blue-500 hover:bg-blue-700 px-5 py-2 text-sm shadow-sm border-2 border-white text-gray-100 rounded-lg hover:shadow-lg">
                                <HiPlus className="text-xl" /> Página
                            </InertiaLink>
                        </div>

                        <div className="relative">
                            {reloadBtn()}
                        </div>

                        <div className="relative">
                            <form onSubmit={searchData} autoComplete="off">
                                <input
                                    ref={searchRef}
                                    type="text"
                                    id="search"
                                    className="w-full py-2 pr-10 pl-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    placeholder="Pesquisar por título"
                                    required={true}
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <button>
                                        <HiSearch className="w-5 h-5 text-gray-400" />
                                    </button>
                                </span>
                            </form>
                        </div>

                    </div>

                    <div className="overflow-x-auto px-0 py-4 flex justify-center">
                        <table className="min-w-full text-md text-gray-600 bg-white shadow-sm rounded mb-4 p-0">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-2">ID</th>
                                    <th className="text-left p-2">Título</th>
                                    <th className="text-left p-2">Resumo</th>
                                    <th className="text-left p-2">Data Criação</th>
                                    <th className="text-left p-2">Social</th>
                                    <th className="text-left p-2">Ativar</th>
                                    <th className="w-20 text-left p-2">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pages.data.map((page, index) => (
                                    <tr key={index} className="border-b hover:bg-orange-100 bg-gray-100">
                                        <td className="p-1">{page.id_post}</td>
                                        <td className="p-1">{page.title}</td>
                                        <td className="p-1">{page.summary}</td>
                                        <td className="p-1">{dataFormatada(page.created_at)}</td>
                                        <td className="p-1">{page.social == 1 ? <HiOutlineCheck className="text-2xl text-green-600" /> : <HiX className="text-2xl text-red-600" />}</td>
                                        <td className="p-1">{page.active == 1 ? <HiOutlineCheck className="text-2xl text-green-600" /> : <HiX className="text-2xl text-red-600" />}</td>
                                        <td className="p-1 flex justify-end">
                                            <InertiaLink
                                                method="get"
                                                as="button"
                                                type="button"
                                                href={route('pagina.edit', page.id_post)}
                                                className="flex items-center mb-2 md:mb-0 bg-blue-500 hover:bg-blue-700 px-5 py-2 text-sm shadow-sm border-2 border-white text-gray-100 rounded-lg hover:shadow-lg">
                                                <HiPencilAlt className="text-xl" />Editar
                                            </InertiaLink>
                                            <button
                                                //method="delete"
                                                // as="button"
                                                // type="button"
                                                // href={"#"}
                                                //href={route('pagina.destroy', page.id_post)}
                                                onClick={(e) => { setIsModalVisible(true); setIdPage(page.id_post) }}
                                                className="flex items-center mb-2 md:mb-0 bg-red-500 hover:bg-red-700 px-5 py-2 text-sm shadow-sm tracking-wider border-2 border-white text-gray-100 rounded-lg hover:shadow-lg">
                                                <HiTrash className="text-xl" />Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {verifyPages &&
                                    verifyPages()
                                }
                            </tbody>
                        </table>
                        {isModalVisible ?
                            <ModalPage onClose={() => setIsModalVisible(false)} onIdPage={idPage}>
                                {/* <!--body--> */}
                                <div className="text-center p-5 flex-auto justify-center">
                                    <HiTrash className="w-16 h-16 flex items-center text-red-500 mx-auto" />
                                    <h3 className="text-xl font-bold py-4 ">Tem certeza?</h3>
                                    <p className="text-sm text-gray-500 px-8">
                                        Tem certeza de que deseja deletar esta página? Este processo não pode ser desfeito!
                                    </p>
                                </div>

                            </ModalPage>
                            : null}
                    </div>
                    <Pagination data={pages} />

                </div>

            </Layout>
        </Fragment>
    )
};

export default PageAdmin;
