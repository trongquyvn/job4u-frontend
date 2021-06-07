import classes from './JobRecently.module.scss';
import Link from 'next/link';
import moment from 'moment';

const JobRecentlyList = (props) => {
    const { jobs } = props;
    return jobs.map((e, i) => {
        let baseSalary = 'Negotiable';
        const { requisitionId, customAttributes } = e;
        if (typeof customAttributes !== 'undefined') {
            baseSalary =
                typeof customAttributes.baseSalary !== 'undefined'
                    ? customAttributes.baseSalary.stringValues
                    : 'Negotiable';
        }

        return (
            <Link key={i} href={`/jobs/${requisitionId}`}>
                <div className={classes.jobTags}>
                    <div className={classes.jobTagsTitle}>
                        <span className={classes.distance}>{e.title}</span>
                        {e.promotionValue ? <span className={classes.hot}>Hot</span> : ''}
                    </div>
                    <div className={classes.jobTagsTitle}>
                        <span className={classes.address}>{baseSalary}</span>
                        <span className={classes.address}>{moment(e.postingUpdateTime).format('YYYY-MM-DD')}</span>
                    </div>
                </div>
            </Link>
        );
    });
};

const JobRecently = (props) => {
    const { className, data } = props;
    if (!data.length) return '';

    return (
        <div className={classes.gridBorder + ' ' + className}>
            <div className={classes.titleInfo}>
                Recently <span className="danger-color">{data.length} jobs</span>
            </div>
            <div className={classes.jobRecently}>
                <JobRecentlyList jobs={data} />
            </div>
        </div>
    );
};

export default JobRecently;
