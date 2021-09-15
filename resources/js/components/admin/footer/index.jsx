import { usePage } from "@inertiajs/inertia-react";
import React, { Fragment } from "react";

const FooterAdmin = () => {

    const { general } = usePage().props

    let dataAtual = new Date()
    let anoAtual = dataAtual.getFullYear()
    return (
        <Fragment>
            <footer className="px-6 py-4 sm:flex-row bg-yellow-900">
                <p className="text-center py-2 text-yellow-500 dark:text-white sm:py-0">
                    <span>&copy;{anoAtual} {general.title}. Todos os direitos reservados.
                        <a className="text-gray-500 hover:text-gray-700" href="https://abrasildigital.com.br/"> ABDigital</a></span>
                </p>
            </footer>
        </Fragment>
    );
}

export default FooterAdmin;
