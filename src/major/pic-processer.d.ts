declare namespace PicProcesserTypes {
    export type MIMETypes=
        'image/jpeg'|
        'image/png'|
        'image/gif'|
        'image/bmp'

    export interface CompressOptions {
        ratio: number
        mime: MIMETypes
        maxWidth?: number|null
    }
}

declare class PicProcesserClass{
    constructor()
    getDataURL(file: File|Blob): Promise<string>
    dataURLtoFile(fileName: string, dataURL: string): File
    compress(file: File|Blob, options?: PicProcesserTypes.CompressOptions): Promise<string>
}

declare module 'pic-processer' {
    export { PicProcesserClass as default }
}