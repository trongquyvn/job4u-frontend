import 'styles/globals.scss';
import classes from './app.module.scss';
const APP_NAME = 'Right Person, Right Job | Job4U';

const MyApp = ({ Component, pageProps }) => {
    return (
        <>
            <div className={classes.layoutWrapper}>
                <div>{APP_NAME}</div>
                <div className={classes.layoutMain}>
                    <Component {...pageProps} />
                </div>
            </div>
        </>
    );
};

export default MyApp;
