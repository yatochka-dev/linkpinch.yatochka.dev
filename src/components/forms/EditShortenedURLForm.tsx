'use client'

import { type ShortenedURL } from '@prisma/client'
import React, { useState } from 'react'
import { Box, TextField } from '@mui/material'
import { CustomAliasInput } from '@/components/ui/CustomAliasInput'
import FormDisablingTextField from '@/components/ui/FormDisablingTextField'
import FormLoadingButton from '@/components/ui/FormLoadingButton'
// import { GoBackToDashboard } from '@/components/ui/GoBackToDashboard'
import dynamic from 'next/dynamic'
import Action_EditShortenedUrl from '@/server/actions/editShortenedUrl'
import { useFormState } from 'react-dom'
import { useForm } from '@conform-to/react'
import { editShortenedURLSchema } from '@/server/actions/schemas/edit-shortened-url'
import { parseWithZod } from '@conform-to/zod'

const GoBackToDashboard = dynamic(
    () => import('@/components/ui/GoBackToDashboard'),
)

interface EditShortenedURLFormProps {
    page: boolean
    data: ShortenedURL & {
        _count: {
            clicks: number
        }
    }
}

export default function EditShortenedURLForm({
    page,
    data,
}: EditShortenedURLFormProps) {
    const [alias, setAlias] = useState(data.path)
    const [pending, setPending] = useState(false)
    const [aliasIsOk, setAliasIsOk] = useState(true)

    const [lastResult, dispatch] = useFormState(
        Action_EditShortenedUrl,
        undefined,
    )
    const [form, fields] = useForm({
        // Sync the result of last submission
        lastResult,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: editShortenedURLSchema })
        },

        // Validate the form on blur event triggered
        shouldValidate: 'onBlur',
    })
    return (
        <Box
            sx={
                page
                    ? {
                          minHeight: 'calc(100vh - 200px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                      }
                    : {}
            }
        >
            <Box
                component={'form'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
                id={form.id}
                onSubmit={form.onSubmit}
                action={dispatch}
                noValidate
            >
                {page && <GoBackToDashboard />}
                <FormDisablingTextField
                    fullWidth
                    label={'Title'}
                    variant={'outlined'}
                    error={!!fields.title.errors}
                    helperText={
                        !!fields.title.errors
                            ? fields.title.errors
                            : 'Enter the URL you want to shorten'
                    }
                    required
                    name={fields.title.name}
                    defaultValue={data.title ?? ''}
                />
                <FormDisablingTextField
                    fullWidth
                    label={'URL'}
                    variant={'outlined'}
                    error={!!fields.url.errors}
                    helperText={
                        !!fields.url.errors
                            ? fields.url.errors
                            : 'Enter the URL you want to shorten'
                    }
                    required
                    name={fields.url.name}
                    defaultValue={data.originalURL}
                />

                <CustomAliasInput
                    onChange={(value) => {
                        setAliasIsOk(value.ok)
                        setAlias(value.v)
                        setPending(value.p)
                    }}
                    defaultAlias={data.path}
                    ignoreID={data.id}
                    TextInputProps={{
                        name: fields.alias.name,
                    }}
                />

                <TextField
                    type={'hidden'}
                    name={fields.id.name}
                    value={data.id}
                    sx={{ display: 'none' }}
                ></TextField>

                <FormLoadingButton
                    type={'submit'}
                    disabled={alias === '' ? false : !aliasIsOk || pending}
                >
                    Save
                </FormLoadingButton>
            </Box>
        </Box>
    )
}
