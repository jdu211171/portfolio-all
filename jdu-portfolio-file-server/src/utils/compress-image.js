const fs = require("fs");
const Sharp = require('sharp')
const compressImages = require('compress-images')

let RESIZE_WIDTH = 1000;
const compression = 97;

process.on("message", (payload) => {
    const { inputPath, outputPath, tempPath, url, resize } = payload;

    const endProcess = (endPayload) => {
        const { statusCode, msg } = endPayload;
        fs.unlink(inputPath, (err) => {
            if (err) {
                process.send({ statusCode: 500, msg: err.message, url: null });
            }
        });
        process.send({ statusCode, msg });
        process.exit();
    };

    Sharp(inputPath)
        .metadata()
        .then(metadata => {
            const { width } = metadata
            RESIZE_WIDTH = resize ? Math.min(RESIZE_WIDTH, width) : width
        }).then(() => {
            Sharp(inputPath)
                .resize({ width: RESIZE_WIDTH })
                .toFile(tempPath, (err, info) => {
                    try {
                        if (err) {
                            endProcess({ statusCode: 409, msg: { error: true, message: "Somethink went wrong", url: null } })
                        }
                        compressImages(tempPath, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
                            { jpg: { engine: "mozjpeg", command: ["-quality", compression] } },
                            { png: { engine: "pngquant", command: ["--quality=" + compression + "-" + compression, "-o"] } },
                            { svg: { engine: "svgo", command: "--multipass" } },
                            { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
                            async function (error, completed, statistic) {
                                if (error) {
                                    throw { statusCode: 500, msg: err?.message || 'Somethink went wrong', url: null }
                                }
                                fs.unlink(tempPath, function (error) {
                                    if (error) throw { statusCode: 500, msg: err?.message || 'Somethink went wrong', url: null }
                                })
                                endProcess({ statusCode: 201, msg: { error: false, message: 'Image successful compressed and save', url } })
                            }
                        )
                    } catch (e) {
                        endProcess({ statusCode: 409, msg: { error: true, message: "Somethink went wrong", url: null } })
                    }

                })
        })
});