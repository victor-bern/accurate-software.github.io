export default (type: string) => {
    const allowedFormats = [
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (!allowedFormats.includes(type)) {
        throw new Error("Invalid Format");
    }
} 