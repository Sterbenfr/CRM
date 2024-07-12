import React from 'react'

interface FileUploadProps {
    setFile: (value: File | null) => void
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0]
        if (selectedFile) {
            console.log('Selected file:', selectedFile)
            setFile(selectedFile)
        }
    }

    return (
        <div>
            <input type='file' onChange={handleFileChange} />
        </div>
    )
}

export default FileUpload
