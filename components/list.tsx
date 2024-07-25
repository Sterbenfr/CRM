import React, { useEffect, useState } from 'react'
import Line from './line'
import FunctionBlock from './functionBlock'
import style from '../styles/components.module.css'
import Excel from './Excel'

interface ListProps {
    value1?: string
    value2?: string
    value3?: string
    value4?: string
    value5?: string
    value6?: string
    value7?: string
}

interface Attribut {
    att1?: string
    att2?: string
    att3?: string
    att4?: string
    att5?: string
}

interface FunctionProps {
    fonc1?: React.MouseEventHandler<HTMLButtonElement>
    url?: string
}

interface PageInfo {
    page: number
    itemsPerPage: number
    totalItems: number
    setTotal: (total: number) => void
}

const List: React.FC<{
    items: ListProps[]
    functions: FunctionProps
    attribut?: Attribut
    searchItems?: ListProps[]
    pageInfos?: PageInfo
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataExcel?: any[]
}> = ({ items, functions, attribut, searchItems, pageInfos, dataExcel }) => {
    const [selectedItems, setSelectedItems] = useState<ListProps[]>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [lineCheckbox, setLineCheckbox] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState('')

    const handleLineCheckboxChange = (param: string) => {
        const value = !isNaN(parseInt(param)) ? parseInt(param) : param
        if (!lineCheckbox.includes(value)) {
            setLineCheckbox([...lineCheckbox, value])
        } else {
            setLineCheckbox(lineCheckbox.filter(item => item !== value))
        }
    }

    const deleteFunction = async () => {
        if (!functions.url?.includes('type')) {
            lineCheckbox.map(async item => {
                await fetch(`${functions.url}/${item}`, {
                    method: 'DELETE',
                })
            })
        } else {
            const res = await fetch(functions.url, {
                method: 'DELETE',
                body: JSON.stringify(lineCheckbox),
            })
            if (!res.ok) {
                throw new Error('Failed to delete data')
            }
        }
        setTimeout(() => {
            window.location.reload()
        }, 400)
    }

    const searchFunction = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            value: string
        }
        const search = target.value
        setSearchValue(search)
        if (searchItems && search.length >= 3) {
            const searchedItems = searchItems.filter(item => {
                return (
                    item.value1?.toLowerCase().includes(search.toLowerCase()) ||
                    item.value2?.toLowerCase().includes(search.toLowerCase()) ||
                    item.value3?.toLowerCase().includes(search.toLowerCase()) ||
                    item.value4?.toLowerCase().includes(search.toLowerCase()) ||
                    item.value5?.toLowerCase().includes(search.toLowerCase()) ||
                    item.value6?.toLowerCase().includes(search.toLowerCase()) ||
                    item.value7?.toLowerCase().includes(search.toLowerCase())
                )
            })
            setSelectedItems(searchedItems)
            if (pageInfos) pageInfos.setTotal(searchedItems.length)
        } else {
            if (pageInfos && searchItems) pageInfos.setTotal(searchItems.length)
        }
    }

    const exportToExcel = () => {
        const dataToExport = dataExcel?.filter(item => {
            if (
                lineCheckbox.includes(
                    parseInt(item[Object.keys(item)[0]] as string),
                )
            ) {
                return item
            }
            if (lineCheckbox.length === 0) {
                return item
            }
        })

        if (dataToExport) {
            Excel({
                data: dataToExport,
                fileName: 'DATATEST',
            })
        }
    }

    useEffect(() => {
        if (searchValue.length < 3) {
            setSelectedItems(undefined)
        }
    }, [items, searchValue])

    const attributeCount = attribut
        ? Object.keys(attribut).filter(
              key => attribut[key as keyof Attribut] !== undefined,
          ).length
        : 0
    let padding = ''
    switch (attributeCount) {
        case 2:
            padding = style.padding0
            break
        case 3:
            padding = style.padding1
            break
        case 4:
            padding = style.padding2
            break
        case 5:
            padding = style.padding3
            break
    }

    return (
        <>
            <FunctionBlock
                fonc1={functions.fonc1}
                fonc2={deleteFunction}
                fonc3={searchFunction}
                fonc4={exportToExcel}
            />
            <div className={`${style.colName} ${padding}`}>
                <div className={style.lineContainer}>
                    {attribut?.att1 ? (
                        <div>
                            <h2 className={style.nameR}>{attribut?.att1}</h2>
                        </div>
                    ) : (
                        ''
                    )}
                    {attribut?.att2 ? (
                        <div>
                            <h2 className={style.nameR}>{attribut?.att2}</h2>
                        </div>
                    ) : (
                        ''
                    )}
                    {attribut?.att3 ? (
                        <div>
                            <h2 className={style.nameR}>{attribut?.att3}</h2>
                        </div>
                    ) : (
                        ''
                    )}
                    {attribut?.att4 ? (
                        <div>
                            <h2 className={style.nameR}>{attribut?.att4}</h2>
                        </div>
                    ) : (
                        ''
                    )}
                    {attribut?.att5 ? (
                        <div>
                            <h2 className={style.nameR}>{attribut?.att5}</h2>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <div className={style.list_line}>
                {items.length !== 0 ? (
                    pageInfos && selectedItems ? (
                        selectedItems
                            .slice(
                                (pageInfos.page - 1) * pageInfos.itemsPerPage,
                                pageInfos.page * pageInfos.itemsPerPage <
                                    pageInfos.totalItems
                                    ? pageInfos.page * pageInfos.itemsPerPage
                                    : pageInfos.totalItems,
                            )
                            .map(item => (
                                // Wrap Line component with a div and add onClick event
                                <div key={item.value1}>
                                    <Line
                                        deleteFunction={
                                            handleLineCheckboxChange
                                        }
                                        param1={
                                            item.value1 == null
                                                ? ''
                                                : item.value1
                                        }
                                        param2={
                                            item.value2 == null
                                                ? ''
                                                : item.value2
                                        }
                                        param3={
                                            item.value3 == null
                                                ? ''
                                                : item.value3
                                        }
                                        param4={
                                            item.value4 == null
                                                ? ''
                                                : item.value4
                                        }
                                        param5={
                                            item.value5 == null
                                                ? ''
                                                : item.value5
                                        }
                                        param6={
                                            item.value6 == null
                                                ? ''
                                                : item.value6
                                        }
                                        paramColor={
                                            item.value7 == null
                                                ? ''
                                                : item.value7
                                        }
                                    />
                                </div>
                            ))
                    ) : (
                        items.map(item => (
                            // Wrap Line component with a div and add onClick event
                            <div key={item.value1}>
                                <Line
                                    deleteFunction={handleLineCheckboxChange}
                                    param1={
                                        item.value1 == null ? '' : item.value1
                                    }
                                    param2={
                                        item.value2 == null ? '' : item.value2
                                    }
                                    param3={
                                        item.value3 == null ? '' : item.value3
                                    }
                                    param4={
                                        item.value4 == null ? '' : item.value4
                                    }
                                    param5={
                                        item.value5 == null ? '' : item.value5
                                    }
                                    param6={
                                        item.value6 == null ? '' : item.value6
                                    }
                                    paramColor={
                                        item.value7 == null ? '' : item.value7
                                    }
                                />
                            </div>
                        ))
                    )
                ) : (
                    <div>
                        <p>Pas de données</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default List
