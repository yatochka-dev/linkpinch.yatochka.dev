// A hook that stores the current state in the URL
//
// import {useState, useEffect} from 'react';
// import {useRouter, useSearchParams} from "next/navigation";
//
//
// export default function useURLState<T>(key: string, defaultValue: T) {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [state, setState] = useState<T>(() => {
//         const value = searchParams.get(key);
//         if (value) {
//             return JSON.parse(value) as T;
//         }
//         return defaultValue;
//     });
//
//     useEffect(() => {
//
//         const url = new URL(router.);
//         if (state === defaultValue) {
//             url.searchParams.delete(key);
//         } else {
//             url.searchParams.set(key, JSON.stringify(state));
//         }
//
//     }, [key, state]);
//
//     return [state, setState] as const;
// }