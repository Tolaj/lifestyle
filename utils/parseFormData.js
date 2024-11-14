import formidable from 'formidable';

const parseFormData = (req) => {
    const form = formidable({
        multiples: true, // Allows multiple file uploads
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err); // Return reject to exit early on error
            // Convert fields to JSON, handling arrays and potential parsing errors
            const formattedFields = Object.fromEntries(
                Object.entries(fields).map(([key, value]) => {
                    // Check if value is an array and process it
                    if (Array.isArray(value)) {
                        try {
                            // Attempt to parse the first element if it's JSON
                            const parsedValue = JSON.parse(value[0]);
                            return [key, parsedValue];
                        } catch (error) {
                            // If parsing fails, return the first element as is
                            return [key, value.length > 1 ? value : value[0]];
                        }
                    }
                    // If value is not an array, return it directly
                    return [key, value];
                })
            );

            resolve({ fields: formattedFields, files });
        });
    });
};

export default parseFormData;
