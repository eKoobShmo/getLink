import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CargaComponent} from '../../../modals/carga/carga.component';
import {FileItem} from '../../../models/fileItem';
import {CargaMultimediaService} from '../../../services/carga-archivos.service.';
import {alertService} from '../../../services/alert.service';
import {userProviderService} from '../../../services/userProvider.service';

@Component({
    selector: 'app-load-images',
    templateUrl: './load-images.component.html',
    styleUrls: ['./load-images.component.scss']
})
export class LoadImagesComponent implements OnInit {

    myJobsImages: FileItem [] = [];
    uid:string;
    jobsImages : any [] = [];
    constructor(private _modalService: NgbModal,
                private _cargaMultimediaService: CargaMultimediaService,
                private _alertService:alertService,
                private _userProviderService:userProviderService) {
        this.uid = sessionStorage.getItem('uid');
    }

    ngOnInit() {

        this._userProviderService.getJobPhotos(this.uid).subscribe((result:any)=>{
            this.jobsImages = result;
        })

    }

    openLoadImagesModal() {
        this._modalService.open(CargaComponent).result.then((result) => {
            this.myJobsImages = result;
        }, (error) => {

        })
    }

    uploadImages(){
        this._cargaMultimediaService.cargarImagenesTrabajosFirebase(this.myJobsImages,this.uid);
        this.myJobsImages = [];
        this._alertService.successMessage("Tus Trabajos Se Han Subido Con Éxito","")

    }

    borrarImagen(index: number) {
        this.myJobsImages.splice(index, 1);
    }

}
