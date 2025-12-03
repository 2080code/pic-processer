function getDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            resolve(reader === null || reader === void 0 ? void 0 : reader.result);
        }, false);
        reader.addEventListener('loadend', () => {
            console.log('loadend', reader);
            resolve(reader === null || reader === void 0 ? void 0 : reader.result);
        });
        reader.addEventListener('error', () => {
            reject(new Error('getDataURL error!'));
        });
        reader.addEventListener('abort', () => {
            reject(new Error('getDataURL abort!'));
        });
        if (file && [Blob, File].some(type => file instanceof type)) {
            reader.readAsDataURL(file);
        }
        else {
            reject(new Error('Unspecified file!'));
        }
    });
}
function compress(file, ratio = 0.5, maxWidth = null, mime = 'image/jpeg') {
    return new Promise((resolve, reject) => {
        let dataURL = '';
        const img = new Image();
        if (maxWidth && maxWidth < 2) {
            reject(new Error('maxWidth must be greater than 1!'));
        }
        img.addEventListener('loadstart', () => {
        });
        img.addEventListener('load', () => {
            const canvas = document.createElement('canvas');
            let scaleRatio = 1;
            if (maxWidth && img.width > maxWidth) {
                scaleRatio = maxWidth / img.width;
            }
            const width = img.width * scaleRatio;
            const height = img.height * scaleRatio;
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);
            dataURL = canvas.toDataURL(mime, +ratio);
            resolve(dataURL);
        }, false);
        img.addEventListener('loadend', () => {
            resolve(dataURL);
        });
        img.addEventListener('error', () => {
            reject(new Error('compress error!'));
        });
        img.addEventListener('abort', () => {
            reject(new Error('compress abort!'));
        });
        if (file && [Blob, File].some(type => file instanceof type)) {
            this.getDataURL(file).then(res => {
                img.src = res;
            }).catch(error => {
                reject(error);
            });
        }
        else {
            reject(new Error('no file!'));
        }
    });
}
function dataURLtoFile(fileName, dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = window.atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
}
class PicProcesser {
    constructor() {
        this.compress = compress;
        this.getDataURL = getDataURL;
        this.dataURLtoFile = dataURLtoFile;
    }
}

export { PicProcesser as default };
