import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a success type', () => {
    fixture.componentInstance.type = 'success'
    fixture.detectChanges()
    expect(fixture.nativeElement.querySelector('.bg-green-500')).toBeTruthy()
  })

  it('should have a warning type', () => {
    fixture.componentInstance.type = 'warning'
    fixture.detectChanges()
    expect(fixture.nativeElement.querySelector('.bg-yellow-500')).toBeTruthy()
  })

  it('should have a error type', () => {
    fixture.componentInstance.type = 'error'
    fixture.detectChanges()
    expect(fixture.nativeElement.querySelector('.bg-red-500')).toBeTruthy()
  })

  it('should have a info type', () => {
    component.type = 'info'
    fixture.detectChanges()
    expect(fixture.nativeElement.querySelector('.bg-blue-500')).toBeTruthy()
  })
});
