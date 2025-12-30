declare namespace PicProcesserTypes {
    type MIMETypes=
        'image/jpeg'|
        'image/png'|
        'image/gif'|
        'image/bmp'

    interface CompressOptions {
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
