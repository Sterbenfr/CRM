export async function streamToString(
    stream: ReadableStream<Uint8Array> | null,
): Promise<string> {
    if (!stream) {
        return Promise.reject(new Error('No stream provided'))
    }

    const reader = stream.getReader()
    let result = ''

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const { done, value } = await reader.read()

        if (done) {
            break
        }

        result += new TextDecoder().decode(value)
    }

    return result
}
