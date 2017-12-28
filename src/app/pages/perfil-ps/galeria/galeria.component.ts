import {Component, OnInit} from '@angular/core';
import {userProviderService} from "../../../services/userProvider.service";
import {photoGalleryInterface} from "../../../interfaces/galeria.interface";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GalleryComponent} from "../../../modals/gallery/gallery.component";
import {ModalMultimediaService} from "../../../services/modal-multimedia.service";


@Component({
    selector: 'app-galeria',
    templateUrl: './galeria.component.html',
    styleUrls: ['./galeria.component.scss']
})


export class GaleriaComponent implements OnInit {
    uid:string;
    galeriaFotos:any [];
    // galeriaFotos: photoGalleryInterface[] = [];

    constructor(private psService: userProviderService,
                private modalService: NgbModal,
                private multimediaService: ModalMultimediaService,
                private _userProviderService:userProviderService) {

        this.uid = sessionStorage.getItem('uid');

    }




    ngOnInit() {

        this._userProviderService.getJobPhotos(this.uid).subscribe((response:any)=>{
            this.galeriaFotos = response;
        })
        // this.galeriaFotos = this.psService.getGalleryPhotos();

    }

    open(index: number) {
        let arrayImages = this.multimediaService.getMultimediaFromArray(this.galeriaFotos);
        //mandando un input a GalleryComponent
        const modalRef = this.modalService.open(GalleryComponent);
        modalRef.componentInstance.index = index;
        modalRef.componentInstance.arrayImages = arrayImages;
    }

}
