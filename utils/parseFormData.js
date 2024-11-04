import formidable from 'formidable';

const parseFormData = (req) => {
    const form = formidable({
        multiples: true, // Allows multiple file uploads
    });
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err); // Return reject to exit early on error
            // Convert fields to strings if they are arrays
            const formattedFields = Object.fromEntries(
                Object.entries(fields).map(([key, value]) => {
                    return [key, Array.isArray(value) ? value[0] : value];
                })
            );
            resolve({ fields: formattedFields, files });
        });
    });
};

export default parseFormData;
