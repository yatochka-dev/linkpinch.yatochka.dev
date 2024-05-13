export type ActionT = ((formData: FormData) => Promise<void>);
export type ActionStateT<STATE> =  ((initialState: STATE, formData: FormData) => Promise<void>);