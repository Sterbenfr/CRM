import * as XLSX from 'xlsx'

interface ListProps {
    value1?: string
    value2?: string
    value3?: string
    value4?: string
    value5?: string
    value6?: string
    value7?: string
    value8?: string
    value9?: string
    value10?: string
    value11?: string
    value12?: string
    value13?: string
    value14?: string
    value15?: string
    value16?: string
    value17?: string
    value18?: string
}

interface ExcelProps {
    data: ListProps[]
    fileName: string
}

const Excel = ({ data, fileName }: ExcelProps) => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName)
    XLSX.writeFile(workbook, `${fileName}.xlsx`)
}

export default Excel
