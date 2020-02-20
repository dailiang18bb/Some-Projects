import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordModelPage } from './word-model.page';

describe('WordModelPage', () => {
  let component: WordModelPage;
  let fixture: ComponentFixture<WordModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordModelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
