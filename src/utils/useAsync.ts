import { useCallback, useReducer, useState } from "react"
import { useMountedRef } from "utils"

interface State<D> {
    error: Error | null,
    data: D | null,
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaltConfig = {
    throwError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef();
    return useCallback((...args: T[]) =>
        (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaltConfig) => {
    const config = { ...defaltConfig, initialConfig }
    const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
        ...defaultInitialState,
        ...initialState
    })
    const safeDispatch = useSafeDispatch(dispatch);
    const [retry, setRetry] = useState(() => () => {

    })

    const setData = useCallback((data: D) => safeDispatch({
        data,
        stat: 'success',
        error: null
    }), [])

    const setError = useCallback((error: Error) => safeDispatch({
        data: null,
        stat: 'error',
        error,
    }), [])
    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error("请传入Promise类型数据");
            }
            safeDispatch({ stat: 'loading' });
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig);
                }
            })
            return promise.then((data) => {
                setData(data)
                return data
            }).catch((error) => {
                //catch会消化异常，如果不主动抛出，外面是接受不到异常的
                setError(error)
                if (config.throwError)
                    return Promise.reject(error);
                return error;
            })
        }
        , [config.throwError, safeDispatch, setData, setError])
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state,
        retry,
        setRetry
    }
}