const baseUrl = 'https://wifi-iot.com/p/'

const contentScriptAllowedPages = ['esp32', 'esp8266', 'esp8266rtos']

const getAllowedPages = (): string[] => contentScriptAllowedPages.map(p => `${baseUrl}${p}/`)

export {getAllowedPages}
