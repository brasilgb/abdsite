import { Head, usePage } from '@inertiajs/inertia-react'
import React, { Fragment } from 'react'
import Layout from '../../../components/site/layout'

const Contact = () => {

    const { general } = usePage().props
    return (
        <Fragment>
            <Layout>
                <Head title={general.title + ' : Contato'}/>

                

            </Layout>
        </Fragment>
    )
}

export default Contact
