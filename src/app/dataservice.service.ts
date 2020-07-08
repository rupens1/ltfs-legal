import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { Http, HttpModule } from '@angular/http';
import { Headers } from '@angular/http';
import { Md5 } from 'ts-md5/dist/md5';
import { catchError } from 'rxjs/operators';
import { of, TimeoutError } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64';


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  baseurl: string;
  public pdfDoc: any;
  public name: any;
  constructor(private _http: HttpClient, private router: Router, private __http: Http) {
    // this.baseurl = environment.base_url;

  }



  AdLogin_prev_working(user_id, password) {
    //var _producturl = this.baseurl + 'Ad_Login?user_id='+this.Emcyption(user_id)+'&password='+this.Emcyption(password);
    var payload = {
      "psNo": user_id,
      "password": password
    };
    var encypt = user_id + '|' + password;
    let datas = JSON.stringify(payload);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //headers.append('hashed', this.hashpayload(datas));
    //headers.append('token', localStorage.token);
    //var _producturl = this.baseurl + 'Ad_LoginEnc?data='+Base64.encode(this.Emcyption(encypt));
    var _producturl = this.baseurl + 'loginAuth?data=' + Base64.encode(this.Emcyption(encypt));
    //var _producturl = this.baseurl + 'loginAuth';
    console.log(this.hashpayload(datas));
    var Encrypted = this.Emcyption(datas);
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.__http.post(_producturl, options).pipe(map(res => {
      console.log("before send res text:- " + res.text());
      // var  test = this.Decryption(res); 
      //return JSON.parse(test);
      return res.text();
    }));
  }


  AdLogin(user_id, password): Observable<any> {

    let headers = new Headers();
    var dates = {
      "psNo": user_id,
      "password": password
    };
    var Payload = JSON.stringify(dates);

    headers.append('Content-Type', 'application/json');
    headers.append('hashed', this.hashpayload(Payload));
    var Encrypted = this.Emcyption(Payload);
    var url = this.baseurl + 'loginAuth';
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.__http.post(url, Encrypted, options).pipe(map(res => {
      var test = this.Decryption(res.text());

      return JSON.parse(test);

    }
    ))
  }




  checkdob(selected_data, lanid): Observable<any> {
    let headers = new Headers();
    var dates = {
      "userName": lanid,
      "password": selected_data
    }

    var Payload = JSON.stringify(dates);
    var url = this.baseurl + 'submitForm';
    headers.append('Content-Type', 'application/json');
    headers.append('hashed', this.hashpayload(Payload));

    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    console.log("I reached out here");

    return this._http.post(url, dates).pipe(res => {
      //alert(JSON.stringify(res));
      //var response = JSON.stringify(res);
      return res;
    }
    );  //Modified above code for timeout error





  }


  //hashing
  hashpayload(payload): string {
    const md5 = new Md5();
    return md5.appendStr(payload + 'SOULMORTAL').end().toString();
  }


	/*downloadpdf() : Observable <any>
	{
		let headers = new Headers();
		var dates = {
			"userName": "username",
			"password": ""
			}
		 var Payload = JSON.stringify(dates);
		  var url = this.baseurl + 'downloadPDF';
		  headers.append('Content-Type', 'application/json');
		  headers.append('hashed', this.hashpayload(Payload));
   		
   		let options = new RequestOptions({
			method: RequestMethod.Post,
			headers: headers
		});
   		console.log("I reached out here");
		return this._http.get(url).pipe(res=>
    		{
    			//alert(JSON.stringify(res));
    			//var response = JSON.stringify(res);
    			return res;
    		}
    		);
	}*/


  downloadPDF(lanid, docid, docname): Observable<any> {
    console.log("I reached out here");
    let headers = new Headers();
    var dates = {
      "lanId": lanid,
      "docId": docid,
      "docName": docname
    }
    var Payload = JSON.stringify(dates);
    var url = this.baseurl + 'downloadDoc';
    headers.append('Content-Type', 'application/json');
    headers.append('hashed', this.hashpayload(Payload));

    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });



    return this._http.post(url, dates, { responseType: 'arraybuffer' }).pipe(res => {


      return res;
    }
    );

  }






  SecurUplaod(formData) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //  headers.append('hashed', this.hashpayload(Payload));
    let url = this.baseurl + 'submitLatest';
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this._http.post(url, formData).pipe(res => {
      //console.log(JSON.stringify(res, null, 4));
      return res;
    }
    );
  }


  checkData(input1, input2): Observable<any> {
    let headers = new Headers();
    var dates = {
      "input1": input1,
      "input2": input2
    }
    var Payload = JSON.stringify(dates);
    var url = this.baseurl + 'checkData';
    headers.append('Content-Type', 'application/json');
    headers.append('hashed', this.hashpayload(Payload));

    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    console.log("I reached out here");

    return this._http.post(url, dates).pipe(res => {
      //console.log("res"+res);
      //var response = JSON.stringify(res);
      return res;
    }
    );  //Modified above code for timeout error
  }


  SecurUplaodCSV_prev_working(formData) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //  headers.append('hashed', this.hashpayload(Payload));
    let url = this.baseurl + 'uploadcsv';
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.__http.post(url, formData).pipe(map(res => {
      //alert("res :- " + res);
      //console.log(JSON.stringify(res, null, 4));
      //return res;
      var test = res.text();

      return JSON.parse(test);
    }
    ));
  }

  SecurUplaodCSV(formData, server_url): Observable<any> {
    let headers = new Headers();
    headers.append('token', localStorage.token);
    headers.append('username', this.Emcyption(localStorage.psno));



    let url = this.baseurl + server_url;
    // headers.append('Content-Type', null);
    // headers.append('Accept', 'multipart/form-data');
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.__http.post(url, formData, options).pipe(map(res => {
      //alert("res :- " + res);
      //console.log(JSON.stringify(res, null, 4));
      //return res;
      /* var  test = res.text(); 

   return JSON.parse(test);*/

      var test = this.Decryption(res.text());

      return JSON.parse(test);
    }
    ));
  }


  SecurUplaodCSV_11(psno, type_of_notices, formData) {
    let headers = new Headers();
    var dates = {
      "psNo": psno,
      "password": type_of_notices
    };
    var Payload = JSON.stringify(dates);

    headers.append('Content-Type', 'application/json');
    headers.append('hashed', this.hashpayload(Payload));
    var Encrypted = this.Emcyption(Payload);
    // var url = this.baseurl + 'loginAuth';
    let url = this.baseurl + 'uploadcsv';
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.__http.post(url, formData, options).pipe(map(res => {
      //alert("res :- " + res);
      //console.log(JSON.stringify(res, null, 4));
      //return res;
      var test = res.text();

      return JSON.parse(test);
    }
    ));
  }


  DownloadReport(doc_type, to_date, from_date) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //  headers.append('hashed', this.hashpayload(Payload));
    let url = this.baseurl + 'reports';
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    /* return this.__http.post(url, formData).pipe(map(res=>
     {
      
           var  test = res.text(); 

       return JSON.parse(test);
     }  
       ));*/

    window.location.href = url + "?doc_type=" + doc_type + "&to_date=" + to_date + "&from_date=" + from_date;
    return this._http.post(url, doc_type).pipe();
    //return;
  }

  SecureShowDocument_actual_one(agreementid, type) {
    let headers = new Headers();

    var dates = {
      "type": type,
      "agreementid": agreementid
    }
    var Payload = JSON.stringify(dates);
    if (type == "lrn") {
      var url = this.baseurl + 'downloadLRNPdf?agreementid=' + agreementid;

    }
    if (type == "dunning") {
      var url = this.baseurl + 'downloadDunningPdf?agreementid=' + agreementid;


    }


    headers.append('Content-Type', 'application/json');
    // headers.append('hashed', this.hashpayload(Payload));

    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    console.log("I reached out here");

    return this._http.get(url).pipe(map(res => {

      return res;
      // var response = JSON.stringify(res);
      // console.log("response = "+response);
      //  var objjson = JSON.parse(response);
      //  let pdfWindow = window.open("");
      // pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + objjson.pdfDoc+"'></iframe>")

    }
    ));  //Modified above code for timeout error


  }


  SecureShowDocument_prev_working(agreementid, type) {
    let headers = new Headers();

    let formdata: FormData = new FormData();
    //formdata.append('file',file.files[0]);
    formdata.append('agreementid', agreementid);
    // formdata.append('type',type);
    //        formdata.append('input2',input2.value);


    var dates = {
      "type": type,
      "agreementid": agreementid
    }
    var Payload = JSON.stringify(dates);
    if (type == "lrn") {
      //var url = this.baseurl + 'downloadLRNPdf?agreementid='+ agreementid;
      var url = this.baseurl + 'downloadLRNPdf';

    }
    if (type == "dunning") {
      //var url = this.baseurl + 'downloadDunningPdf?agreementid='+ agreementid;
      var url = this.baseurl + 'downloadDunningPdf';


    }


    headers.append('Content-Type', 'application/json');
    // headers.append('hashed', this.hashpayload(Payload));

    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    console.log("I reached out here");

    return this._http.post(url, formdata).pipe(map(res => {

      return res;

    }
    ));  //Modified above code for timeout error


  }


  SecureShowDocument_00(agreementid, type) {
    let headers = new Headers();

    let formdata: FormData = new FormData();
    //formdata.append('file',file.files[0]);
    formdata.append('agreementid', this.Emcyption(agreementid));

    var dates = {

      "password": agreementid
    }
    var Payload = JSON.stringify(dates);
    if (type == "lrn") {
      //var url = this.baseurl + 'downloadLRNPdf?agreementid='+ agreementid;
      var url = this.baseurl + 'downloadLRNPdf';

    }
    if (type == "dunning") {
      //var url = this.baseurl + 'downloadDunningPdf?agreementid='+ agreementid;
      var url = this.baseurl + 'downloadDunningPdf';


    }
    headers.append('Content-Type', 'application/json');
    headers.append('hashed', this.hashpayload(Payload));
    var Encrypted = this.Emcyption(Payload);
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    console.log("I reached out here");

    return this.__http.post(url, formdata).pipe(map(res => {
      var test = this.Decryption(res.text());

      //   return res;
      return JSON.parse(test);

    }
    ));  //Modified above code for timeout error


  }


  SecureShowDocument(agreementid, type): Observable<any> {

    let formdata: FormData = new FormData();
    //formdata.append('file',file.files[0]);
    formdata.append('agreementid', this.Emcyption(agreementid));
    let headers = new Headers();
    var dates = {
      "agreementid": agreementid,
      "type": type
    };
    var Payload = JSON.stringify(dates);

    headers.append('token', localStorage.token);
    headers.append('username', this.Emcyption(localStorage.psno));
    var Encrypted = this.Emcyption(Payload);
    if (type == "lrn") {
      //var url = this.baseurl + 'downloadLRNPdf?agreementid='+ agreementid;
      var url = this.baseurl + 'downloadLRNPdf';

    }
    if (type == "dunning") {
      //var url = this.baseurl + 'downloadDunningPdf?agreementid='+ agreementid;
      var url = this.baseurl + 'downloadDunningPdf';


    }
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    return this.__http.post(url, formdata, options).pipe(map(res => {
      var test = this.Decryption(res.text());

      return JSON.parse(test);

    }
    ))
  }


  logout() {
    let headers = new Headers();
    var dates = {
      "psNo": localStorage.psno,
      "password": ""
    }
    var Payload = JSON.stringify(dates);
    headers.append('Content-Type', 'application/json');
    headers.append('hashed', this.hashpayload(Payload));
    headers.append('token', localStorage.token);
    headers.append('username', this.Emcyption(localStorage.psno));
    var Encrypted = this.Emcyption(Payload);
    console.log(Encrypted)
    var url = this.baseurl + 'logout';
    let options = new RequestOptions({
      method: RequestMethod.Post,
      headers: headers
    });
    this.__http.post(url, Encrypted, options).pipe().subscribe(res => {
      var test = this.Decryption(res.text());
      console.log(test)
      if (JSON.parse(test).errorCode == '200' || JSON.parse(test).statusCode == '403') {

        alert("Logged Out Successfully")
        this.router.navigate(['/ad-login']);
      }
    })
  }



  //Encrption
  Emcyption(Payload) {
    var key = CryptoJS.enc.Utf8.parse("ytxQz6HJQgHv7Eei");
    // var iv = CryptoJS.enc.Utf8.parse("ytxQz6HJQgHv7Eei");
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(Payload), key, {
      keySize: 128 / 8,
      //  iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }
  //Decryption
  Decryption(decypt) {
    var key = CryptoJS.enc.Utf8.parse("ytxQz6HJQgHv7Eei");
    // var iv = CryptoJS.enc.Utf8.parse("ytxQz6HJQgHv7Eei");
    var decrypted = CryptoJS.AES.decrypt(decypt, key, {
      keySize: 128 / 8,
      // iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
