let file: File
let file2: File
const setFile = (item: File) => {
    file = item
}
const setFile2 = (item: File) => {
    file2 = item
}

const fileUpload = async (fileUrl?: string, fileUrl2?: string) => {
    const filePaths = [null, null]
    if (file && fileUrl) {
        const formData = new FormData()
        formData.append('image', file as unknown as Blob)
        const response = await fetch(fileUrl, {
            method: 'POST',
            body: formData,
        })
        const data = await response.json()
        filePaths[0] = data.filePath
    }
    if (file2 && fileUrl2) {
        const formData = new FormData()
        formData.append('image', file2 as unknown as Blob)
        const response = await fetch(fileUrl2, {
            method: 'POST',
            body: formData,
        })
        const data = await response.json()
        filePaths[1] = data.filePath
    }
    return filePaths
}

export default fileUpload
export { setFile, setFile2 }
