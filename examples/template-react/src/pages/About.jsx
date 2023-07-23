import { addAndMultiply } from '../add'
import { multiplyAndAdd } from '../multiply'
import { $fetch } from 'ofetch'
import useSWR from 'swr'

import { useEffect, useCallback, useState } from 'react'
let getData = async () => {
    let res1 = await $fetch('http://127.0.0.1:5200/api/test/list')
    let res2 = await $fetch('http://127.0.0.1:5200/api/test/list')
    let res3 = await $fetch('http://127.0.0.1:5200/api/test/list')
    console.log(res3)
}

export const loader = async () => {
    console.log('22222222222')
}

export default function About() {
    let dataddd = { data: 123123213, name: '22222222222222222222222222222222' }
    const { data, error } = useSWR(
        'ddd',
        async () => {
            let res = await $fetch('http://127.0.0.1:5200/api/test/list')
            console.log('服务器渲染')
            return res
        },
        dataddd
    )
    // $fetch("http://127.0.0.1:5200/api/test/list").then(res => {
    //     console.log(res)
    // })
    // $fetch("http://127.0.0.1:5200/api/test/list").then(res => {
    //     console.log(res)
    // })
    // $fetch("http://127.0.0.1:5200/api/test/list").then(res => {
    //     console.log(res)
    // })

    console.log(data)
    return (
        <>
            <h1>About</h1>
            <div>{addAndMultiply(1, 2, 3)}</div>
            <div>{multiplyAndAdd(1, 2, 3)}</div>
        </>
    )
}
