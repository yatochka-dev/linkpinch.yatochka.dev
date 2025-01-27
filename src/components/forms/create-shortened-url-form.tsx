'use client'
import React, { useActionState, useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import PendingButton from '@/components/ui/pending-button'
import Action_CreateShortenedURL from '@/server/actions/create-shortened-url'
import { CustomAliasInput } from '@/components/ui/dashboard/custom-alias-input'
import PendingTextfield from '@/components/ui/pending-textfield'
import { parseWithZod } from '@conform-to/zod'
import { useForm } from '@conform-to/react'
import { createShortenedURLSchema } from '@/server/actions/schemas/create-shortened-url-schema'

export default function CreateShortenedURLForm() {
    const [lastResult, dispatch] = useActionState(
        Action_CreateShortenedURL,
        undefined,
    )

    const [form, fields] = useForm({
        // Sync the result of last submission
        lastResult,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: createShortenedURLSchema })
        },

        // Validate the form on blur event triggered
        shouldValidate: 'onInput',
    })

    const [alias, setAlias] = useState('')
    const [pending, setPending] = useState(false)
    const [aliasIsOk, setAliasIsOk] = useState(true)
    const [urlValue, setUrlValue] = useState('')
    const [clearAliasField, setClearAliasField] = useState(0)
    // const { register, reset, setValue } = useForm<{ url: string }>({})

    useEffect(() => {
        setClearAliasField((prev) => prev + 1)
        setUrlValue('')
    }, [lastResult])

    return (
        <Box>
            <Paper
                sx={{
                    minHeight: '300px',
                    width: '100%',
                    p: 4,
                }}
            >
                <Typography variant={'h4'}>Shorten a URL</Typography>
                <Box
                    component={'form'}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        mt: 2,
                    }}
                    action={dispatch}
                    id={form.id}
                    onSubmit={form.onSubmit}
                    noValidate
                >
                    <PendingTextfield
                        fullWidth
                        label={'Custom Title (optional)'}
                        variant={'outlined'}
                        helperText={
                            !!fields.title.errors
                                ? fields.title.errors
                                : 'Enter the URL you want to shorten'
                        }
                        error={!!fields.title.errors}
                        name={fields.title.name}
                    />

                    <PendingTextfield
                        fullWidth
                        label={'URL'}
                        variant={'outlined'}
                        helperText={
                            !!fields.url.errors
                                ? fields.url.errors
                                : 'Enter the URL you want to shorten'
                        }
                        value={urlValue}
                        onChange={(e) => setUrlValue(e.target.value)}
                        error={!!fields.url.errors}
                        required
                        name={fields.url.name}
                    />

                    <CustomAliasInput
                        onChange={(e) => {
                            setAlias(e.v)
                            setAliasIsOk(e.ok)
                            setPending(e.p)
                        }}
                        onClear={clearAliasField}
                        TextInputProps={{
                            name: fields.alias.name,
                            error: !!fields.alias.errors,
                        }}
                    />

                    <PendingButton
                        type={'submit'}
                        disabled={alias === '' ? false : !aliasIsOk || pending}
                    >
                        Save
                    </PendingButton>
                </Box>
            </Paper>
        </Box>
    )
}
