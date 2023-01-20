import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core'

@Component({
  selector: 'app-image-showcase',
  templateUrl: './image-showcase.component.html',
  styleUrls: ['./image-showcase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageShowcaseComponent {
  @Input() images: string[] = []
  selectedIndex = 0

  constructor (private changeDetectorRef: ChangeDetectorRef) {}

  selectImage(index: number) {
    this.selectedIndex = index
    this.changeDetectorRef.detectChanges()
  }

  trackByFn(index: number) {
    return index
  }
}
