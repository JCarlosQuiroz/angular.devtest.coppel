import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class SessionInteractorAdapter {

    constructor() { }

    get(key: string) {
        const decrypt = this.decipher('secret');
        let decryptKey;
        const item = localStorage.getItem(key);
        if (item !== null) {
            if (typeof item === 'string') {
                decryptKey = JSON.parse(decrypt(item));
            } else {
                decryptKey = JSON.parse(item);
            }
        } else {
            decryptKey = null;
        }
        return decryptKey;
    }


    set(key: string, value: any) {
        const encrypt = this.cipher('secret')
        const userEncrypt = encrypt(JSON.stringify(value));
        localStorage.setItem(key, userEncrypt);
    }

    destroyAll() {
        localStorage.clear();
    }

    destroy(key: string) {
        localStorage.removeItem(key);
    }

    private cipher = (salt: any) => {
        let textToChars = (text: any) => text.split('').map((c: any) => c.charCodeAt(0))
        let byteHex = (n: any) => ("0" + Number(n).toString(16)).substr(-2)
        let applySaltToChar = (code: any) => textToChars(salt).reduce((a: any, b: any) => a ^ b, code)

        return (text: any) => text.split('')
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join('')
    }

    private decipher = (salt: any) => {
        let textToChars = (text: any) => text.split('').map((c: any) => c.charCodeAt(0))
        let saltChars = textToChars(salt)
        let applySaltToChar = (code: any) => textToChars(salt).reduce((a: any, b: any) => a ^ b, code)
        return (encoded: any) => encoded.match(/.{1,2}/g)
            .map((hex: any) => parseInt(hex, 16))
            .map(applySaltToChar)
            .map((charCode: any) => String.fromCharCode(charCode))
            .join('')
    }
}