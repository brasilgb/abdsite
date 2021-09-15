import { Inertia } from "@inertiajs/inertia";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import React, { Fragment, useState } from "react";
import { HiMenu, HiUserCircle } from 'react-icons/hi';
import route from 'ziggy'

const NavBarAdmin = () => {

    const { auth } = usePage().props;

    const setLogout = (e) => {
        e.preventDefault();
        Inertia.post(route('logout'));
    }

    const setUserProfile = (e) => {
        e.preventDefault();
        Inertia.get(route('usuario.show', auth.user.id_user));
    }

    const [menuUserOpen, setMenuUserOpen] = useState(false);

    return (
        <Fragment>
            <nav className="bg-white shadow bg-yellow-900">
                <div className="container mx-auto">
                    <div className="py-2 md:flex md:items-center md:justify-between">
                        <div className="absolute justify-left">
                            <div className="text-xl font-semibold text-gray-700">
                                {/* <a className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300" href="#">Brand</a> */}
                            </div>

                            {/* <!-- Mobile menu button --> */}
                            <div className="flex pt-2 pl-2 md:hidden">

                            </div>
                        </div>

                        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
                        <div className="flex-1 md:flex md:items-center md:justify-between">
                            <div className="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">

                            </div>
                            <div className="flex justify-end mr-2 lg:flex lg:mt-0 lg:-mx-2">
                                <div className="relative">
                                    <button
                                        type="button"
                                        className="relative z-10 block" aria-label="toggle profile dropdown"
                                        onClick={() => setMenuUserOpen(!menuUserOpen)}
                                    >
                                        <div className="overflow-hidden rounded-full">
                                            <HiUserCircle className="text-gray-100 text-3xl" />
                                        </div>

                                    </button>

                                    <div className={"absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800" +
                                        (menuUserOpen ? " block" : " hidden")
                                    }>
                                        <InertiaLink
                                            className="w-full block flex justify-left px-4 py-2 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 hover:text-gray-500 dark:hover:text-white"
                                            as="button"
                                            type="button"
                                            href="#"
                                            onClick={setUserProfile}
                                        >
                                            <span>Seu perfil</span>
                                        </InertiaLink>
                                        <InertiaLink
                                            className="w-full flex justify-left px-4 py-2 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 hover:text-gray-500 dark:hover:text-white"
                                            as="button"
                                            type="button"
                                            href="#"
                                            onClick={setLogout}
                                        >
                                            <span> Sair</span>
                                        </InertiaLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}

export default NavBarAdmin;
