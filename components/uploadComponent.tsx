import React from 'react'
import style from '../styles/components.module.css'

interface FileUploadProps {
    setFile: (value: File | null) => void
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
        }
    }

    return (
        <div className={style.selectF}>
            <input type='file' onChange={handleFileChange} />
        </div>
    )
}

export default FileUpload
