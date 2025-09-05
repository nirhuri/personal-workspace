export const processAPIError = (error: Error | unknown, entity: string) => {
    if (error instanceof Error) {
        console.error(`Error processing request for entity ${entity}: ${error.message}`);
    } else {
        console.error(`Unknown error: ${error}`)
    }
}