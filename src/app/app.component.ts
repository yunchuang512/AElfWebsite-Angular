import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {LanguageService} from './shared/language.service';
import {FontFamliyService} from './shared/font-famliy.service';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  clicked = false;
  headerActiveCssClass = '';
  public config: PerfectScrollbarConfigInterface = {};

  currentLanguage = '';
  languagesDic: any;
  languageList = [];
  ffArial = '';
  ffCg = '';
  ffCgb = '';
  ffDbb = '';
  ffHnlt = '';
  ffMy = '';
  ffSs = '';
  ffTnri = '';
  constructor( private language: LanguageService, private _cookieService: CookieService, private _fontFamlily: FontFamliyService) {
  }

  OnChange(languageSelection: string) {
    console.log('---------switch language----------' + languageSelection);
    this.language.switchLanguage(this.languagesDic[languageSelection]);
    this.currentLanguage = languageSelection;
    this.ffArial = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-arial');
    this.ffCg = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-cg');
    this.ffCgb = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-cgb');
    this.ffDbb = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-dbb');
    this.ffHnlt = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-hnlt');
    this.ffMy = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-my');
    this.ffSs = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-ss');
    this.ffTnri = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-tnri');
    this._cookieService.put('SelectedLanguage', this.languagesDic[languageSelection]);
  }
  ngOnInit() {
    this.language.getLanguageConfig().subscribe(data => {
      this.languagesDic = data['languagesDic'];
      this.languageList = data['languageOptions'];
      this.currentLanguage = data['languagesDic2'][this.language.getBrowserCultureLanguage()];

      if (this._cookieService.get('SelectedLanguage') !== undefined) {
        this.currentLanguage = data['languagesDic2'][this._cookieService.get('SelectedLanguage')];
      }
      this.ffArial = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-arial');
      this.ffCg = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-cg');
      this.ffCgb = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-cgb');
      this.ffDbb = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-dbb');
      this.ffHnlt = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-hnlt');
      this.ffMy = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-my');
      this.ffSs = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-ss');
      this.ffTnri = this._fontFamlily.getFontFamily(this.currentLanguage, 'ff-tnri');
    });
  }
  ngAfterViewInit() {
    const perfectScrollbarContainer = $('.perfect-scrollbar-container');
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({'border-radius': '6px'});
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css('cssText', 'width: 7px !important');
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({'background-color': 'rgba(255, 255, 255, 0.1)'});
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({'background-color': 'rgba(255, 255, 255, 0.1)'});
    perfectScrollbarContainer.find('.ps__scrollbar-y-rail').css({'opacity': 0.6});
  }
  @HostListener('window:scroll', ['$event'])
  scrollTop(event) {
    // console.log('Scroll Event', window.pageYOffset );
    // console.log('class name: ', $('#dropdown-pagination-menu').attr('class') );
      if (window.pageYOffset !== 0 && !($('#dropdown-pagination-menu').hasClass('active'))) {
        this.headerActiveCssClass = 'active-header';
      } else {
        this.headerActiveCssClass = '';
      }
    // console.log('headerActiveCssClass: ', this.headerActiveCssClass);
  }
  menuClick() {
    if (this.headerActiveCssClass !== '' && !($('#dropdown-pagination-menu').hasClass('active'))) {
      this.headerActiveCssClass = '';
    } else if (this.headerActiveCssClass === '' && $('#dropdown-pagination-menu').hasClass('active') && (window.pageYOffset !== 0)) {
      this.headerActiveCssClass = 'active-header';
    }
  }
}
