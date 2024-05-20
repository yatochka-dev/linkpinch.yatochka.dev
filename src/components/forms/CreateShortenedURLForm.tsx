'use client'
import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import FormLoadingButton from '@/components/ui/FormLoadingButton'
import { useFormState } from 'react-dom'
import Action_ShortenUrl from '@/server/actions/shortenUrl'
import { CustomAliasInput } from '@/components/ui/CustomAliasInput'
import FormDisablingTextField from '@/components/ui/FormDisablingTextField'
import { parseWithZod } from '@conform-to/zod'
import { useForm } from '@conform-to/react'
import { shortenUrlSchema } from '@/server/actions/schemas/shorten-url'

export default function CreateShortenedURLForm() {
    const [lastResult, dispatch] = useFormState(Action_ShortenUrl, undefined)

    const [form, fields] = useForm({
        // Sync the result of last submission
        lastResult,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: shortenUrlSchema })
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
                    <FormDisablingTextField
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

                    <FormLoadingButton
                        type={'submit'}
                        disabled={alias === '' ? false : !aliasIsOk || pending}
                    >
                        Save
                    </FormLoadingButton>
                </Box>
            </Paper>
        </Box>
    )
}
