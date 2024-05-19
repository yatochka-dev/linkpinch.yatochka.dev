'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Paper, TextField, Typography } from '@mui/material'
import FormLoadingButton from '@/components/ui/FormLoadingButton'
import debounce from '@/utils/helpers/debounce'
import { useFormState } from 'react-dom'
import Action_ShortenUrl from '@/server/actions/shortenUrl'
import { CustomAliasInput } from '@/components/ui/CustomAliasInput'
import FormDisablingTextField from '@/components/ui/FormDisablingTextField'

export default function CreateShortenedURLForm() {
    const initialState = {
        error: {
            url: '',
            alias: '',
        },
    }
    const [alias, setAlias] = useState('')
    const [pending, setPending] = useState(false)
    const [aliasIsOk, setAliasIsOk] = useState(true)
    const [form, dispatch] = useFormState(Action_ShortenUrl, initialState)
    const URLFieldRef = useRef<HTMLDivElement | null>(null)

    console.log(form)

    useEffect(() => {
        if (!!form.error.url || !!form.error.alias) return

        setAlias('')

        // clear url field
        const input = URLFieldRef.current?.querySelector('input')
        if (input) {
            input.value = ''
        }
    }, [form])

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
                >
                    <FormDisablingTextField
                        fullWidth
                        label={'URL'}
                        variant={'outlined'}
                        name={'url'}
                        helperText={'Enter the URL you want to shorten'}
                        required
                        ref={URLFieldRef}
                    />

                    <CustomAliasInput
                        onChange={(e) => {
                            setAlias(e.v)
                            setAliasIsOk(e.ok)
                            setPending(e.p)
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
