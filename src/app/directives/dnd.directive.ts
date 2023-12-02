import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDnd]',
  standalone: true
})
export class DndDirective {

  @HostBinding('class.animate-shake') fileOver!: boolean

  @Output() filesDropped = new EventEmitter<File[]>

  @HostListener('dragover', ['$event']) onDragOver(event: any){
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = true
  }

  @HostListener('drop', ['$event']) ondrop(event: any){
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = false
    const files = event.dataTransfer.files as File[]
    if (files.length > 0){
      this.filesDropped.emit(files)
    }
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: any){
    event.preventDefault()
    event.stopPropagation()
    this.fileOver = false
  }

}
