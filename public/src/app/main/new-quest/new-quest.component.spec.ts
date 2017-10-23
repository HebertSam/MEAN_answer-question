import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuestComponent } from './new-quest.component';

describe('NewQuestComponent', () => {
  let component: NewQuestComponent;
  let fixture: ComponentFixture<NewQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
