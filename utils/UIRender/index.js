import StarIcon from '@material-ui/icons/Star';

const iconStar1 = {
    color: 'rgb(255, 169, 27)',
};
const iconStar2 = {
    color: '#ccc',
};
const star1 = (
    <span>
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar2} />
        <StarIcon style={iconStar2} />
        <StarIcon style={iconStar2} />
        <StarIcon style={iconStar2} />
    </span>
);
const star2 = (
    <span>
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar2} />
        <StarIcon style={iconStar2} />
        <StarIcon style={iconStar2} />
    </span>
);
const star3 = (
    <span>
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar2} />
        <StarIcon style={iconStar2} />
    </span>
);
const star4 = (
    <span>
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar2} />
    </span>
);
const star5 = (
    <span>
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar1} />
        <StarIcon style={iconStar1} />
    </span>
);

export const renderStarList = () => {
    const star = {
        1: star1,
        2: star2,
        3: star3,
        4: star4,
        5: star5,
    };
    return star;
};
