export const getStringValJson = (val) => {
    let msg = ''
    for (const [key, value] of Object.entries(val)) {
        value.forEach(message => {
            msg += message
        });
    }

    return msg
}