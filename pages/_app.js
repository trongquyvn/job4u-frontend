import Head from 'next/head';
import dynamic from 'next/dynamic';

import { Provider } from 'react-redux';
import store from 'redux/store';

import Amplify from 'aws-amplify';
import awsconfig from 'config/aws-exports';

import 'styles/globals.scss';
import classes from './app.module.scss';

Amplify.configure(awsconfig);
const Layout = dynamic(() => import('layout'), { loading: () => 'Loading' });
const APP_NAME = 'Right Person, Right Job | Job4U';
const MyApp = ({ Component, pageProps }) => {
    const mapAPIKey = process.env.NEXT_PUBLIC_GEO_MAPS_API_KEY;
    const freshPage = Component.freshPage;

    return (
        <>
            <Provider store={store}>
                <Head>
                    <title>{APP_NAME}</title>
                    {/* <script
                        type="text/javascript"
                        src={'https://maps.google.com/maps/api/js?key=' + mapAPIKey + '&libraries=places'}
                    ></script> */}
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/leaflet.css" rel="stylesheet" />
                </Head>
                {freshPage ? (
                    <Component {...pageProps} />
                ) : (
                    <div className={classes.layoutWrapper}>
                        <div>{APP_NAME}</div>
                        <div className={classes.layoutMain}>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </div>
                    </div>
                )}
            </Provider>
        </>
    );
};

export default MyApp;

// export function reportWebVitals(metric) {
//     console.log(metric);
// }
