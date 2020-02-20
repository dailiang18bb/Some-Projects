import { Component, OnInit } from '@angular/core';
import { GetJsonDataService } from '../get-json-data.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { WordModelPage } from '../word-model/word-model.page';
import {Vibration } from '@ionic-native/vibration/ngx';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {


  readonly more_base_url: string = 'https://www.merriam-webster.com/dictionary/';

  word: string;
  _subscription: any;
  wordsPredict: string[] = [];
  flag:boolean = false;


  constructor(private JSONService: GetJsonDataService,
     private nativeAudio: NativeAudio, 
     private alertController: AlertController, 
     private modalController: ModalController,
     private vibration:Vibration) { }

  ngOnInit() {

  }

  async getData(inputWord) {
    this._subscription = this.JSONService.getRemoteData(inputWord).subscribe(data => {
      console.log(data);
      // console.log(data === null);
      // console.log(data.length == 0);
      if(data.length == 0){
        this.showEmpty();
      } else if (this.checkWordInTheDictionary(data)) {
        this.performWord(data);
      } else {
        this.flag = true;
        this.performListPredictWords(data);
      }

    }, err => {
      console.log(err);
    });
  }



  async play(audioURL) {
    this.nativeAudio.preloadSimple('id1', audioURL).then(onSuccess => {
      console.log('playing');
      console.log(onSuccess);
      this.nativeAudio.play('id1');
    }, onError => {
      console.log(onError);
    });
  }


  // request(w) {
  //   console.log(this.JSONService.getWordRequestURL(w));
  // }

  submit() {
    if (this.word == null || this.word == '') {
      console.log('err');
      this.showNoWordAlert();
    } else if (this.isNumeric(this.word)) {
      this.showNumberAlert();
    } else if (this.isSpeacial(this.word)) {
      this.showSpecialCharacterAlert();
    } else {
      console.log(this.word);
      this.getData(this.word);
    }
    // console.log(document.getElementById('myInput'));
    (<HTMLInputElement>document.getElementById('myInput')).value = '';
    this.vibration.vibrate(1000);
  }

  wordsPredictLink(predictWord){
    this.word = predictWord;
    this.submit();
    this.flag=false;
  }



  // If the word not exist in the dictionary give user other words
  performListPredictWords(data: any) {
    var wordsArrays: string[] = [];
    for (let x of data) {
      console.log(x);
      wordsArrays.push(x);
    }
    this.wordsPredict = wordsArrays;
    console.log(wordsArrays);
    console.log(typeof wordsArrays);
    console.log(this.wordsPredict);
    console.log(typeof this.wordsPredict);
    console.log(typeof data);
  }

  async performWord(data) {

    var sentData = {
      detail: data
    };

    console.log(data);

    const modalPage = await this.modalController.create({
      component: WordModelPage,
      componentProps: { values: sentData }
    });

    return await modalPage.present();
  }










  // Helper function
  async showNoWordAlert() {
    let alert = await this.alertController.create({
      header: 'No word found',
      message: 'Feed me with words, please!!!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showNumberAlert() {
    let alert = await this.alertController.create({
      header: 'Number found',
      message: 'Feed me only with the English word, please!!!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showSpecialCharacterAlert() {
    let alert = await this.alertController.create({
      header: 'Special Character found',
      message: 'Feed me only with the English word, please!!!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async showEmpty() {
    let alert = await this.alertController.create({
      header: 'Empty call back found',
      message: 'Feed me only with the English word, please!!!',
      buttons: ['OK']
    });
    await alert.present();
  }

  isNumeric(n): boolean {
    let regex = /\d+/g;
    let res = n.match(regex);
    if (res != null) {
      return true;
    } else {
      return false;
    }
  }

  isSpeacial(n): boolean {
    let regex = /[.,\/#!$%\^&\*;:{}=\-_`~()@+++[\]|\\'"<>?]+/g;
    let res = n.match(regex);
    if (res != null) {
      return true;
    } else {
      return false;
    }
  }


  getMoreInfo(w): string {
    return this.more_base_url + w;
  }

  // true => object
  // flase => string
  checkWordInTheDictionary(data: JSON): boolean {
    if (typeof data[0] == 'string') {
      console.log("data checking :::::: string");
      return false;
    } else {
      console.log("data checking :::::: object");
      return true;
    }
  }


}
