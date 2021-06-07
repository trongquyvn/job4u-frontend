import Head from 'next/head';
import dynamic from 'next/dynamic';

import { Provider } from 'react-redux';
import store from 'redux/store';

import 'styles/globals.scss';
import classes from './app.module.scss';

const Layout = dynamic(() => import('layout'), { loading: () => 'Loading' });
const APP_NAME = 'Right Person, Right Job | Job4U';
const MyApp = ({ Component, pageProps }) => {
    const mapAPIKey = process.env.NEXT_PUBLIC_GEO_MAPS_API_KEY;
    return (
        <>
            <Provider store={store}>
                <Head>
                    <title>{APP_NAME}</title>
                    <script
                        type="text/javascript"
                        src={'https://maps.google.com/maps/api/js?key=' + mapAPIKey + '&libraries=places'}
                    ></script>
                </Head>
                <div className={classes.layoutWrapper}>
                    <div>{APP_NAME}</div>
                    <div className={classes.layoutMain}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </div>
                </div>
            </Provider>
        </>
    );
};

export default MyApp;

// export function reportWebVitals(metric) {
//     console.log(metric);
// }
