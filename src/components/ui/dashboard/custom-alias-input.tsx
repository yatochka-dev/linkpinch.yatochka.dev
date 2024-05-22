import PendingTextfield from '@/components/ui/pending-textfield'
import { Box, InputAdornment, type TextFieldProps } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import debounce from '@/utils/functools/debounce'
import getBaseUrl from '@/utils/functools/get-base-url'

export function CustomAliasInput({
    defaultAlias,
    onChange,
    ignoreID = '',
    onClear,
    TextInputProps,
}: {
    onChange: (value: { v: string; ok: boolean; p: boolean }) => void
    defaultAlias?: string
    ignoreID?: string
    onClear?: number
    TextInputProps?: TextFieldProps
}) {
    const [alias, setAlias] = useState(defaultAlias ?? '')
    const [pending, setPending] = useState(false)
    const [aliasIsOk, setAliasIsOk] = useState(true)

    useEffect(() => {
        if (ignoreID) return

        setAlias('')
    }, [ignoreID, onClear])

    const debouncedCheckAlias = useMemo(() => {
        return debounce(async (a: string) => {
            setPending(true)
            const url =
                '/api/check-alias?alias=' +
                encodeURIComponent(a) +
                (!!ignoreID ? '&ignoreID=' + encodeURIComponent(ignoreID) : '')
            const res = await fetch(url, {
                next: {
                    revalidate: 0,
                },
                cache: 'no-store',
            })
            const json = (await res.json()) as {
                ok: boolean
            }
            setPending(false)
            setAliasIsOk(json.ok)
        }, 350)
    }, [ignoreID])

    useEffect(() => {
        void debouncedCheckAlias(alias)
    }, [alias, debouncedCheckAlias])

    useEffect(() => {
        onChange({
            v: alias,
            ok: aliasIsOk,
            p: pending,
        })
    }, [aliasIsOk, onChange, pending, alias])

    return (
        <PendingTextfield
            fullWidth
            value={alias}
            {...TextInputProps}
            onChange={(event) => {
                setAlias(event.target.value)
            }}
            label={'Custom Alias'}
            variant={'outlined'}
            required
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
                        If you {"don't"} provide a custom alias, one will be
                        generated for you.
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
                        {getBaseUrl()}
                    </InputAdornment>
                ),
            }}
        />
    )
}
