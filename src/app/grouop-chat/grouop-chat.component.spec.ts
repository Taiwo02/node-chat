import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrouopChatComponent } from './grouop-chat.component';

describe('GrouopChatComponent', () => {
  let component: GrouopChatComponent;
  let fixture: ComponentFixture<GrouopChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouopChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrouopChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
