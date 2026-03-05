export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { messages} = body

    const lastMessage = messages[messages.length - 1]

    return {
        role: 'assistant',
        content: `(server) You said: ${lastMessage.content}`,
    }
})