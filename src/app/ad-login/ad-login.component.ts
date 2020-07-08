import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { FormValidator, FormValidatorModel } from '@syncfusion/ej2-inputs';
import { Router } from "@angular/router";
import { environment} from "../../environments/environment";
import { DataserviceService } from "../dataservice.service";
import {HttpClient} from '@angular/common/http';
import {Http,HttpModule} from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import * as FileSaver from 'file-saver';
import { Md5 } from 'ts-md5/dist/md5';
import * as CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64';

@Component({
  selector: 'app-ad-login',
  templateUrl: './ad-login.component.html',
  styleUrls: ['./ad-login.component.css']
})
export class AdLoginComponent implements OnInit {
	public errordesc : any;

  constructor(private router:Router,  private serve:DataserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    var output = this.serve.Decryption("Kn/Z7OgYAk3jsa8BfekzxV4tMCMLJFiEq8eWDz8FOXsF8NU1XCrKyfflZ2OpY23Jfp0fC7s9GWF7YB5aiWSpdQ==");
    console.log(output + "this is the one");
  	 if(localStorage.islogged == "true")
          {
          	alert("You are already logged in.");
            this.router.navigate(['/upload-csv']);
            return;
          }
  }



  submitform()
  {
  

    //var file = document.getElementById("fileupload") as HTMLInputElement;
    var input1 = document.getElementById("input1") as HTMLInputElement;

        var input2 = document.getElementById("input2") as HTMLInputElement;

        if(input1.value=="")
        {
        	this.errordesc = "Please enter Username";
        	return ;
        }
        if(input2.value=="")
        {
        	this.errordesc = "Please enter Password";
        	return ;
        }


    $("body").show().css({"opacity": "0.5"});
    document.getElementById("myloader").className = "loader";

     let formdata:FormData = new FormData();
      //formdata.append('file',file.files[0]);
    //  formdata.append('file',this.selectedFile);
          formdata.append('input1',input1.value);
                    formdata.append('input2',input2.value);

        
        $("#input1").val();           
        $("#input2").val();
        $("#fileupload").val();
    // console.log(input1.value + "="+input2.value+"="+file.files[0].path);
  
       
     $("body").show().css({"opacity": "0.5"});
    document.getElementById("myloader").className = "loader";

      this.serve.AdLogin(input1.value, input2.value).subscribe(data=>{
       console.log("object="+data);
       if(data.errorCode=="200")
       {
          document.getElementById("myloader").className = "myloader1";
     $("body").show().css({"opacity": "1"});

       		localStorage.islogged = true;
       		localStorage.psno = input1.value;
           localStorage.token = data.token;
       		this.router.navigate(['/upload-csv']);
       }
       else
       {
         document.getElementById("myloader").className = "myloader1";
     $("body").show().css({"opacity": "1"});

       		localStorage.islogged = false;
       		this.errordesc = data.errorDesc; 
       }
        
      });

  }

 	



}
