'use client'

import { type ShortenedURL } from '@prisma/client'
import React, { useActionState, useState } from 'react'
import { Box, TextField } from '@mui/material'
import { CustomAliasInput } from '@/components/ui/dashboard/custom-alias-input'
import PendingTextfield from '@/components/ui/pending-textfield'
import PendingButton from '@/components/ui/pending-button'
// import { GoBackToDashboardButton } from '@/components/ui/GoBackToDashboardButton'
import dynamic from 'next/dynamic'
import Action_EditShortenedUrl from '@/server/actions/edit-shortened-url'
import { useForm } from '@conform-to/react'
import { editShortenedURLSchema } from '@/server/actions/schemas/edit-shortened-url-schema'
import { parseWithZod } from '@conform-to/zod'

const GoBackToDashboard = dynamic(
    () => import('@/components/ui/dashboard/go-back-to-dashboard-button'),
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

    const [lastResult, dispatch] = useActionState(
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
                    py: 1,
                }}
                id={form.id}
                onSubmit={form.onSubmit}
                action={dispatch}
                noValidate
            >
                {page && <GoBackToDashboard />}
                <PendingTextfield
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
                <PendingTextfield
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

                <PendingButton
                    type={'submit'}
                    disabled={alias === '' ? false : !aliasIsOk || pending}
                >
                    Save
                </PendingButton>
            </Box>
        </Box>
    )
}
