import React, { Fragment, useState } from "react";
import { HiHome, HiDocumentDuplicate, HiPencilAlt, HiUsers, HiAdjustments, HiPhotograph, HiChevronRight, HiChevronDown, HiChevronUp, HiMenu } from "react-icons/hi";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import route from 'ziggy';

const SideBarAdmin = () => {

    const { general, auth } = usePage().props;

    const logo = general.logo ? general.logo : 'default.jpg';

    const [menuCategoryOpen, setMenuCategoryOpen] = useState(false);
    const [menuConfigurationOpen, setMenuConfigurationOpen] = useState(false);

    return (
        <Fragment>
            <div className="flex flex-col w-64 h-screen py-4 border-r bg-yellow-900">
                <div className="flex flex-col items-center mt-6 -mx-2">
                    <InertiaLink
                    href={route('home')}
                    title="Página inicial do Site"
                    >
                    <img className="h-24 mx-2" src={'/storage/images/' + logo} alt={general.title} alt={general.title} />
                    </InertiaLink>
                    <h4 className="mx-2 mt-2 font-medium text-gray-100 dark:text-gray-200">{auth.user.name}</h4>
                    <p className="pb-2 mx-2 mt-1 text-sm font-medium text-gray-100 dark:text-gray-400 border-b-4 border-gray-200">{auth.user.email}</p>
                </div>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        <InertiaLink
                            className={
                                route().current('admin') ?
                                    "flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 bg-gray-200"
                                    :
                                    "flex items-center px-4 py-2 text-gray-100 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
                            }
                            href={route('admin')}>
                            <HiHome />
                            <span className="mx-4 font-medium">Home</span>
                        </InertiaLink>

                        <InertiaLink
                            className={
                                route().current('pagina.*') ?
                                    "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 bg-gray-200"
                                    :
                                    "flex items-center px-4 py-2 mt-5 text-gray-100 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
                            }
                            href={route('pagina.index')}>
                            <HiDocumentDuplicate />
                            <span className="mx-4 font-medium">Páginas</span>
                        </InertiaLink>

                        {/* Menu postagens */}
                        <div
                            onClick={() => setMenuCategoryOpen(!menuCategoryOpen)}
                            className={
                                route().current('categoria.*') || route().current('postagem.*') ?
                                    "cursor-pointer flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 bg-gray-200"
                                    :
                                    "cursor-pointer flex items-center px-4 py-2 mt-5 text-gray-100 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"

                            }
                        >
                            <HiPencilAlt />
                            <span className="flex-1 mx-4 font-medium">Postagens</span><span className="mt-1 flex-none">{(menuCategoryOpen ? <HiChevronDown /> : <HiChevronUp />)}</span>
                        </div>

                        <div
                            className={"bg-gray-100 " +
                                (menuCategoryOpen ? " block" : " hidden")
                            }
                        >
                            <InertiaLink
                                className={
                                    route().current('categoria.*') ?
                                        "flex items-center pl-6 py-3 mt-0 text-gray-700 transition-colors duration-200 transform dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                        :
                                        "flex items-center pl-6 py-3 mt-0 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                }
                                href={route('categoria.index')}>
                                <HiChevronRight />
                                <span className="mx-3 font-medium">Categorias</span>
                            </InertiaLink>

                            <InertiaLink
                                className={
                                    route().current('postagem.*') ?
                                        "flex items-center pl-6 py-3 mt-0 text-gray-700 transition-colors duration-200 transform dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                        :
                                        "flex items-center pl-6 py-3 mt-0 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                }
                                href={route('postagem.index')}>
                                <HiChevronRight />
                                <span className="mx-3 font-medium">Postagens</span>
                            </InertiaLink>

                        </div>

                        <InertiaLink
                            className={
                                route().current('galeria.*') || route().current('midia.*') ?
                                    "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 bg-gray-200"
                                    :
                                    "flex items-center px-4 py-2 mt-5 text-gray-100 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
                            }
                            href={route('galeria.index')}>
                            <HiPhotograph />
                            <span className="mx-4 font-medium">Galerias</span>
                        </InertiaLink>

                        {/* Menu Configuracoes */}
                        <div
                            onClick={() => setMenuConfigurationOpen(!menuConfigurationOpen)}
                            className={
                                route().current('email.*') || route().current('geral.*') ?
                                    "cursor-pointer flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 bg-gray-200"
                                    :
                                    "cursor-pointer flex items-center px-4 py-2 mt-5 text-gray-100 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"

                            }
                        >
                            <HiAdjustments />
                            <span className="flex-1 mx-4 font-medium">Configurações</span><span className="mt-1 flex-none">{(menuConfigurationOpen ? <HiChevronDown /> : <HiChevronUp />)}</span>
                        </div>

                        <div
                            className={"bg-gray-100" +
                                (menuConfigurationOpen ? " block" : " hidden")
                            }
                        >
                            <InertiaLink
                                className={
                                    route().current('email.*') ?
                                        "flex items-center pl-6 py-3 mt-0 text-gray-700 transition-colors duration-200 transform dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                        :
                                        "flex items-center pl-6 py-3 mt-0 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                }
                                href={route('email.configurar')}>
                                <HiChevronRight />
                                <span className="mx-3 font-medium">E-mail</span>
                            </InertiaLink>

                            <InertiaLink
                                className={
                                    route().current('geral.*') ?
                                        "flex items-center pl-6 py-3 mt-0 text-gray-700 transition-colors duration-200 transform dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                        :
                                        "flex items-center pl-6 py-3 mt-0 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                }
                                href={route('geral.configurar')}>
                                <HiChevronRight />
                                <span className="mx-3 font-medium">Geral</span>
                            </InertiaLink>

                            <InertiaLink
                                className={
                                    route().current('seccao*') ?
                                        "flex items-center pl-6 py-3 mt-0 text-gray-700 transition-colors duration-200 transform dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                        :
                                        "flex items-center pl-6 py-3 mt-0 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 dark:hover:text-gray-200 hover:text-gray-700"
                                }
                                href={route('seccao')}
                            >
                                <HiChevronRight />
                                <span className="mx-4 font-medium"> Layout/Secções</span>
                            </InertiaLink>

                        </div>
                        <InertiaLink
                            className={
                                route().current('usuario.*') ?
                                    "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 bg-gray-200"
                                    :
                                    "flex items-center px-4 py-2 mt-5 text-gray-100 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
                            }
                            href={route('usuario.index')}><HiUsers />
                            <span className="mx-4 font-medium">Usuários</span>
                        </InertiaLink>


                    </nav>
                </div>
            </div>
        </Fragment >
    )
};

export default SideBarAdmin;
