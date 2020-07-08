import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { RequestOptions, RequestMethod, ResponseContentType, Headers } from '@angular/http';
import * as CryptoJS from 'crypto-js'
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  private encryptionKey = 'ytxQz6HJQgHv7Eei'
  private baseUrl: string = `${environment.base_url}/LegalDocSrvc`
  // Encryption
  encryptRequest(payload: any) {
    const key = this.getEncyptionKey(this.encryptionKey);
    const encrypted = CryptoJS.AES.encrypt(this.getEncyptionKey(payload), key, {
      keySize: 128 / 8,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  getEncyptionKey(key: string) {
    return CryptoJS.enc.Utf8.parse(key);
  }

  // Decryption
  decryptRequest(decypt: any) {
    const key = this.getEncyptionKey(this.encryptionKey);
    const decrypted = CryptoJS.AES.decrypt(decypt, key, {
      keySize: 128 / 8,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  //hashing
  hashpayload(payload): string {
    const md5 = new Md5();
    return md5.appendStr(payload + 'SOULMORTAL').end().toString();
  }

  makeRequest(requestPayload, requestOptions = {}, type: string): Observable<any> {

    let headers: Headers = new Headers();
    const payload = JSON.stringify(requestPayload);

    headers.set('Content-Type', 'application/json');
    headers.set('hashed', this.hashpayload(payload));
    // const encryptedPayload = this.encryptRequest(payload);
    const url = `${this.baseUrl}/loginAuth`;
    let options = new RequestOptions({
      method: RequestMethod.Get,
      headers: headers,
      ...requestOptions,
    });
    return this.http[type](url, requestPayload, options)
  }
}
