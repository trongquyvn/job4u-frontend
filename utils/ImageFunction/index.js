import slug from 'slug';

export const getImageFromS3 = (name) => {
    const filename = slug(name.replace(/[*+~.()'"!:@&|]/g, '').trim(), { lower: true });
    return process.env.NEXT_PUBLIC_IMAGE_URL + '/' + filename + '.png';
};

export const getCoverFromS3 = (name) => {
    let filename = slug(name.replace(/[*+~.()'"!:@&|]/g, '').trim(), { lower: true });
    return process.env.NEXT_PUBLIC_IMAGE_URL + '/' + filename + '_cover.jpg';
};
