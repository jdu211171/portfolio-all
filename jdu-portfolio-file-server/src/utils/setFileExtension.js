function setFileExtension(fileName, defaultExtension) {
    let [name, extension] = fileName.split('.');
    name?.substring(name.length - 97)
    return extension ? `${name}.${extension}` : `${name}.${defaultExtension}`
}

module.exports = setFileExtension