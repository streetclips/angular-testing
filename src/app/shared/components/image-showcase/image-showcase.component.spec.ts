import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageShowcaseComponent } from './image-showcase.component';

describe('ImageShowcaseComponent', () => {
  let component: ImageShowcaseComponent;
  let fixture: ComponentFixture<ImageShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageShowcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change index', () => {
    component.images = ['image1', 'image2']
    fixture.detectChanges()
    expect(component.selectedIndex).toBe(0)

    component.selectImage(1)
    expect(component.selectedIndex).toBe(1)
  });
});
