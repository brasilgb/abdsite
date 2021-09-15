import React, { Fragment } from "react";

let dataAtual = new Date()
let anoAtual = dataAtual.getFullYear()

const FooterSite = () => {
    return (
        <Fragment>
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
