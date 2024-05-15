'use client'
import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
    useTransition,
} from 'react'
import {
    Box,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from '@mui/material'
import FormLoadingButton from '@/components/ui/FormLoadingButton'
import FormDisablingTextField from '@/components/ui/FormDisablingTextField'
import debounce from '@/utils/helpers/debounce'
import { useFormState } from 'react-dom'
import Action_ShortenUrl from '@/server/actions/shortenUrl'
import { env } from '@/env'

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

    const debouncedCheckAlias = useMemo(() => {
        return debounce(async (a: string) => {
            setPending(true)
            const url = '/api/check-alias?alias=' + encodeURIComponent(a)
            const res = await fetch(url)
            const json = (await res.json()) as {
                ok: boolean
            }
            setPending(false)
            setAliasIsOk(json.ok)
        }, 350)
    }, [])
    useEffect(() => {
        void debouncedCheckAlias(alias)
    }, [alias, debouncedCheckAlias])

    const [form, dispatch] = useFormState(Action_ShortenUrl, initialState)
    const URLFieldRef = useRef<HTMLDivElement | null>(null)

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
                    <TextField
                        fullWidth
                        label={'URL'}
                        variant={'outlined'}
                        name={'url'}
                        helperText={'Enter the URL you want to shorten'}
                        required
                        ref={URLFieldRef}
                    />

                    <FormDisablingTextField
                        fullWidth
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        label={'Custom Alias'}
                        variant={'outlined'}
                        name={'alias'}
                        helperText={
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    '--alias-checker-color': (theme) =>
                                        pending
                                            ? theme.palette.text.secondary
                                            : aliasIsOk
                                              ? theme.palette.success.main
                                              : theme.palette.error.main,
                                }}
                                component={'span'}
                            >
                                <span>
                                    If you {"don't"} provide a custom alias, one
                                    will be generated for you.
                                </span>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                    }}
                                    component={'span'}
                                />
                                {!!alias && (
                                    <span
                                        style={{
                                            color: 'var(--alias-checker-color)',
                                        }}
                                    >
                                        {pending
                                            ? 'Checking...'
                                            : aliasIsOk
                                              ? 'Alias is available'
                                              : 'Alias is taken or invalid'}
                                    </span>
                                )}
                            </Box>
                        }
                        placeholder={'my-custom-alias'}
                        sx={{
                            color: (theme) => theme.palette.text.secondary,
                        }}
                        inputProps={{
                            minLength: 3,
                            maxLength: 30,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {env.NEXT_PUBLIC_BASE_URL + '/'}
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormLoadingButton
                        type={'submit'}
                        disabled={!aliasIsOk || pending}
                    >
                        Save
                    </FormLoadingButton>
                </Box>
            </Paper>
        </Box>
    )
}
