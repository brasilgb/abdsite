import { InertiaLink } from '@inertiajs/inertia-react'
import React, { Fragment } from 'react'
import Layout from '../../../components/site/layout'
const postSite = ({ post_content }) => {

    return (
        <Fragment>
            <Layout>

                <section className="border-b border-white" style={{
                    backgroundImage: `url('/storage/post/${post_content.featured}')`,
                    backgroundPosition: 'right',
                    backgroundColor: '#F59E0B',
                    backgroundSize: '60%',
                    backgroundRepeat: 'no-repeat'
                }}>

                    <div className="container mx-auto">
                        <div className="h-40 md:h-96 items-center lg:flex">
                            <div className="h-full md:h-96 flex items-center justify-left w-full bg-gradient-to-r from-yellow-500 to-yellow-400 lg:w-7/12">
                                <div className="max-w-lg lg:max-w-lg p-2">
                                    <h1 className="md:text-2xl text-md font-semibold text-gray-200 uppercase dark:text-white lg:text-3xl">{post_content.title}</h1>
                                    <p className="mt-2 text-sm md:text-2xl text-gray-100">{post_content.summary}</p>

                                </div>
                            </div>
                            <div className="h-96 flex items-center justify-rigth w-full mt-6 lg:mt-0 lg:w-5/12">
                            </div>
                        </div>
                    </div>
                </section>

               {post_content.type == 1 &&
                    <section className="mx-auto container px-4 py-2 my-4 bg-gray-100 rounded border border-white">
                        <h1 className="pt-4 text-lg md:text-xl uppercase font-Confortaa font-semibold text-gray-700 border-b border-gray-400">{post_content.title}</h1>
                        <div className="py-4">
                            <p className="font-Confortaa text-gray-600" dangerouslySetInnerHTML={{ __html: post_content.content }} />
                        </div>

                    </section>
                }

            </Layout>
        </Fragment>
    )
}

export default postSite
