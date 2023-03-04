import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value;

export const isVoid = (value: unknown) => value === undefined || value === null || value === '';

export const cleanObj = (obj: { [key: string]: any }) => {
    const result = { ...obj }
    Object.keys(result).forEach((key: string) => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key];
        }
    })
    return result;
}

export const subset = <O extends { [key in string]: unknown }, K extends keyof O>(obj: O, keys: K[]) => {
    const filteredEntries = Object.entries(obj).filter(([key]) => keys.includes(key as K))
    return Object.fromEntries(filteredEntries) as Pick<O, K>
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        //依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedvalue, setDebouncedvalue] = useState(value);
    useEffect(() => {
        //每次value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedvalue(value), delay);
        //每次在上一个useEffect处理完以后再运行
        return () => {
            clearTimeout(timeout)
        }
    }, [value, delay]);
    return debouncedvalue;
}

export const useDocumentTitle = (title: string, keepunmount: boolean = true) => {
    //const oldTitle = document.title;
    //页面加载时候：oldTitle === 旧title 'React App'
    //加载后： oldtitle === 新title

    const oldTitle = useRef(document.title).current

    useEffect(() => {
        document.title = title
    }, [title]);

    //闭包
    // useEffect(() => {
    //     return () => {
    //         if (!keepunmount) {
    //             //如果不指定依赖项，读到的title就是旧title
    //             document.title = oldTitle;
    //         }
    //     }
    // }, [])

    useEffect(() => {
        return () => {
            if (!keepunmount) {
                //如果不指定依赖项，读到的title就是旧title
                document.title = oldTitle;
            }
        }
    }, [keepunmount, oldTitle])


}

export const resetRoute = () => {
    window.location.href = window.location.origin;
}


/**
 * 返回组件的挂载状态，如果没有挂载或者已经卸载，返回false，反之，返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        }
    })
    return mountedRef;
}

