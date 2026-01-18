export async function race_functions<T, U>(f: () => Promise<T>, g: () => Promise<U>): Promise<T | U> {
    return (await Promise.race([
        new Promise<T>((res, _) => {
            f().then((result) => res(result));
        }),
        new Promise<U>((res, _) => {
            g().then((result) => res(result));
        })
    ]));
}

export async function await_for<T>(f: () => Promise<T>, timeout: number): Promise<T|null> {
    return race_functions<T, null>(f, async () => {
        return await (new Promise((res, _) => { setTimeout(() => { res(null); }, timeout) }));
    })
}

export async function await_for_with_default<T, U>(f: () => Promise<T>, timeout: number, def: U): Promise<T|U> {
    return (await await_for(async () => {
        try {
            return await f();
        }
        catch(_) {
            return def;
        }
    }, timeout)) ?? def;
}

export async function delay(timeout: number) {
        return await (new Promise((res, _) => {
                setTimeout(() => {
                        res(null);
                }, timeout);
        }));
}
