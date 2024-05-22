'use client'
import React, { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import { parseWithZod } from '@conform-to/zod'
import { useForm } from '@conform-to/react'
import { useFormState } from 'react-dom'
import Action_LogError from '@/server/actions/log-error'
import { logErrorSchema } from '@/server/actions/schemas/log-error-schema'

interface LogErrorProps {
    error: Error & { digest?: string }
}

export default function LogError({ error }: { error: Error }) {
    const formRef = useRef<HTMLFormElement>(null)
    const errorToJSON = JSON.stringify(error, Object.getOwnPropertyNames(error))

    const [lastResult, dispatch] = useFormState(Action_LogError, undefined)
    const [form, fields] = useForm({
        // Sync the result of last submission
        lastResult,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: logErrorSchema })
        },

        // Validate the form on blur event triggered
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    })

    useEffect(() => {
        if (formRef.current) {
            formRef.current.requestSubmit()
        }
    }, [])

    return (
        <Box
            sx={{
                display: 'none',
            }}
            component={'form'}
            ref={formRef}
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate
            action={dispatch}
        >
            <input
                type={'hidden'}
                value={errorToJSON}
                name={fields.error.name}
                key={fields.error.key}
            />
        </Box>
    )
}
