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
    const initialState = {
        error: {
            url: '',
            alias: '',
        },
    }
    const [alias, setAlias] = useState(data.path)
    const [pending, setPending] = useState(false)
    const [aliasIsOk, setAliasIsOk] = useState(true)

    const [form, dispatch] = useFormState(Action_EditShortenedUrl, initialState)

    return (
        <Box
            sx={
                page
                    ? {
                          minHeight: 'calc(100vh - 64px)',
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
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    minWidth: '40vw',
                }}
                action={dispatch}
            >
                {page && <GoBackToDashboard />}

                <FormDisablingTextField
                    fullWidth
                    label={'URL'}
                    variant={'outlined'}
                    name={'url'}
                    helperText={'Enter the URL you want to shorten'}
                    required
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
                />

                <TextField
                    type={'hidden'}
                    name={'id'}
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
