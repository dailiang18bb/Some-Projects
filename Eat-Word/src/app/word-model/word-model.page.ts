import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular'
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Component({
  selector: 'app-word-model',
  templateUrl: './word-model.page.html',
  styleUrls: ['./word-model.page.scss'],
})
export class WordModelPage implements OnInit {

  public values: any;

  audio_file_base_url_bix = 'https://media.merriam-webster.com/soundc11/bix/' //if audio begins with "bix", the subdirectory should be "bix",
  audio_file_base_url_gg = 'https://media.merriam-webster.com/soundc11/gg/' //if audio begins with "gg", the subdirectory should be "gg",
  audio_file_base_url_number = 'https://media.merriam-webster.com/soundc11/number/' //if audio begins with a number or punctuation (eg, "_"), the subdirectory should be "number",
  audio_file_base_url_letter = 'https://media.merriam-webster.com/soundc11/' //otherwise, the subdirectory is equal to the first letter of audio.
  more_information_url = '  https://www.merriam-webster.com/dictionary/';

  public headWord: string;
  public pronFlag: boolean;
  public timeoutFlag: boolean = false;
  public pronString: string;

  constructor(private modalController: ModalController, private navParams: NavParams, private nativeAudio: NativeAudio) {
    let hideFooterTimeout = setTimeout(() => {
      // somecode
      this.timeoutFlag = true;
    }, 1618);
  }

  ngOnInit() {
    // get values from home page
    this.values = this.navParams.get('values').detail;
    this.headWord = this.getHead();
    this.pronFlag = Object.keys(this.values[0].hwi).length > 1;
    if (this.pronFlag) {
      this.pronString = this.values[0].hwi.prs[0].mw
    }
    setTimeout( () => {
      // somecode
      this.play();
     }, 1618);
     

    // console.log("Model page::::::")
    // console.log(this.values);
    // console.log("hwi :::: ");
    // console.log(this.values[0].hwi);
    // console.log("fl :::: ");
    // console.log(this.values[0].fl);
    // console.log("def :::: ");
    // console.log(this.values[0].def);
    // console.log(this.values[0].def[0].sseq);
    // console.log("dros :::: ");
    // console.log(this.values[0].dros);
    // console.log("et :::: ");
    // console.log(this.values[0].et);
    // console.log("date :::: ");
    // console.log(this.values[0].date);
    // console.log("shortdef :::: ");
    // console.log(this.values[0].shortdef);

    // console.log("**********************");
    // console.log(typeof this.values[0].hwi.prs[0].mw === 'undefined');
    // console.log(this.values[0].hwi.prs[0].sound.audio);
    // console.log(Object.keys(this.values[0].hwi).length > 1);

  }
  // ionViewDidEnter(){
  // }

  getHead(): string {
    let regex = /^\w+/g;
    return this.values[0].meta.id.match(regex);
  }

  async play() {
    if (this.pronFlag) {
      try {
        try{
          var audioURL = this.getAudioUrl(this.values[0].hwi.prs[0].sound.audio);
        }catch(err){
          console.error(err);
          var audioURL = this.getAudioUrl(this.values[0].hwi.prs[1].sound.audio);
        }
        console.log("audioURL ::::::::");
        console.log(audioURL);
        this.nativeAudio.preloadSimple('id1', audioURL).then(onSuccess => {
          console.log('playing');
          console.log(onSuccess);
          this.nativeAudio.play('id1');
        }, onError => {
          console.log(onError);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  getAudioUrl(audioName): string {
    let result: string;
    let regexArray = [/bix\w*/g, /gg\w*/g, /^[1-9.,\/#!$%\^&\*;:{}=\-_`~()]+/g];

    if (audioName.match(regexArray[0]) != null) {
      //bix
      result = this.audio_file_base_url_bix + audioName + '.wav';
    } else if (audioName.match(regexArray[1]) != null) {
      //gg
      result = this.audio_file_base_url_gg + audioName + '.wav';
    } else if (audioName.match(regexArray[2]) != null) {
      //number
      result = this.audio_file_base_url_number + audioName + '.wav';
    } else {
      //otherwise
      let dirName = audioName.match(/\b\w/g)[0];
      result = this.audio_file_base_url_letter + dirName + '/' + audioName + '.wav';
    }
    return result;
  }


  moreInformation() {
    let url = this.more_information_url + this.headWord;
    window.open(url, '_system', 'location=yes');

  }

  closeModal() {
    //TODO: Implement Close Modal this.viewCtrl.dismiss();
    this.modalController.dismiss();
  }

}
