import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common'
import * as converter from 'number-to-words';


import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe]
})
export class AppComponent {
  selectedDate=''
  myDate:any = new Date();
  constructor(private datePipe: DatePipe){
      this.myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
  }  
  Class = '6th'
  Duration = '2022-23'
  StudentName = 'Shaik Mohammed Sayeed';
  FatherName = 'Shaik Irshad'
  date=new Date();
  Date_Birth='21/10/2011';
  AdmissionNumber = 4001;
  Date_Numbers = 'TWO ONE, ONE ZERO, TWO ZERO ONE ONE'
  @ViewChild('invoice') invoiceElement!: ElementRef;
  public generatePDF(): void {

    html2canvas(this.invoiceElement.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 300;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', -44, 30 , fileWidth, generatedImageHeight,'NONE');
      PDF.html(this.invoiceElement.nativeElement.innerHTML)
      PDF.save(this.StudentName+'.pdf');
    });
  }
  onClickSubmit(result:any) {
  this.Class = result.Class
  this.Duration = result.Duration
  this.StudentName = result.StudentName;
  this.FatherName = result.FatherName
  this.date=new Date();
  this.Date_Birth=result.DOB;
  this.AdmissionNumber = result.Admission;
  this.Date_Numbers =  this.number_string(this.Date_Birth)
 }
 number_string(x:string){
 var final_result = ''
  var y: number = +x;
  let number_words= ''
//dd
y = +x[0]
number_words = converter.toWords(y)
final_result = final_result.concat(number_words,' ')
y = +x[1]
number_words = converter.toWords(y)
final_result = final_result.concat(number_words,', ')
//mm
y = +x[3]
number_words = converter.toWords(y)
final_result = final_result.concat(number_words,' ')
y = +x[4]
number_words = converter.toWords(y)
final_result = final_result.concat(number_words,', ')
//yyyy
y = +x[6]
number_words = converter.toWords(y)
final_result = final_result.concat(number_words,' ')
y = +x[7]
number_words = converter.toWords(y)
final_result = final_result.concat(number_words,' ')
y = +x[8]
number_words = converter.toWords(y)
final_result = final_result.concat(number_words,' ')
y = +x[9]
number_words = converter.toWords(y)
final_result = final_result.concat(number_words)

return final_result;
 }
}
