import * as XLSX from 'xlsx'

interface ExcelProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[]
    fileName: string
}

const Excel = ({ data, fileName }: ExcelProps) => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName)
    XLSX.writeFile(workbook, `${fileName}.xlsx`)
}

export default Excel
