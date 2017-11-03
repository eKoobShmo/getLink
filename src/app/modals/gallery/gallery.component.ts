import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
    @Input() index;
    @Input() arrayImages;

    constructor(public activeModal: NgbActiveModal) {


    }

    ngOnInit() {


    }

    closeModal() {
        this.activeModal.dismiss();
    }

    nextAttached(){
        if(this.index == this.arrayImages.length - 1){
            this.index = 0;
        }else{
            this.index++;
        }
    }

    previousAttached(){
        if(this.index == 0){
            this.index = this.arrayImages.length - 1;
        }else{
            this.index--;
        }
    }


}
