import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import React, { Fragment } from "react";

let dataAtual = new Date()
let anoAtual = dataAtual.getFullYear()

const FooterSite = () => {

    const { categories, pages } = usePage().props;

    return (
        <Fragment>
            <div className="h-8 bg-gradient-to-t from-gray-100 to-gray-200 shadow border-t border-b border-white"></div>
            <div className="bg-gradient-to-b from-gray-100 to-gray-200 px-4 md:px-8 lg:px-80 py-10 pt-2">

                <nav className="text-3xl font-Rouge">
                    <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                        <InertiaLink
                        href={route('home')}
                        className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
                        >
                        Home
                        </InertiaLink>
                        {pages.map((page, indexb) => (
                            (page.active == 1 &&
                                <InertiaLink
                                    key={indexb}
                                    href={route('pagina', page.slug)}
                                    className="border-b-2 border-transparent hover:text-yellow-500 dark:hover:text-gray-200 hover:border-yellow-500 mx-1.5 sm:mx-6">
                                    {page.title}
                                </InertiaLink>
                            )
                        ))}
                        {categories.map((category, indexc) => (
                            (category.active == 1 &&
                                <InertiaLink
                                    key={indexc}
                                    href={route('categoria', category.slug)}
                                    className="border-b-2 border-transparent hover:text-yellow-500 dark:hover:text-gray-200 hover:border-yellow-500 mx-1.5 sm:mx-6">
                                    {category.categoryname}
                                </InertiaLink>
                            )
                        ))}
                        <InertiaLink
                        href={route('contato')}
                        className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
                        >Contato
                        </InertiaLink>
                    </div>
                </nav>
            </div>

            <footer className="px-6 py-4 bg-black">
                <p className="text-center py-2 text-yellow-600 py-0">
                    <span className="text-yellow-500">&copy;{anoAtual} ARS - Arte Sacra. Todos os direitos reservados.
                        <a className="text-gray-500 hover:text-gray-700" href="https://abrasildigital.com.br/"> ABDigital</a></span>
                </p>
            </footer>
        </Fragment>
    );
}

export default FooterSite;
