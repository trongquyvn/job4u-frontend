import Head from 'next/head';
import 'styles/globals.scss';
const APP_NAME = 'Right Person, Right Job | Job4U';
const MyApp = ({ Component, pageProps }) => {
    // const mapAPIKey = process.env.NEXT_PUBLIC_GEO_MAPS_API_KEY;
    const freshPage = Component.freshPage;

    return (
        <>
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
                <div>
                    <div>{APP_NAME}</div>
                    <div>
                        <Component {...pageProps} />
                    </div>
                </div>
            )}
        </>
    );
};

export default MyApp;

// export function reportWebVitals(metric) {
//     console.log(metric);
// }
