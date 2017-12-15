import {Injectable} from '@angular/core';
import {CategoriesInterface} from '../interfaces/categorias.interface';

@Injectable()
export class CategoriasService {

    categoriasServicio:CategoriesInterface[]=[];

    constructor() {
    }

    getCategoriasServicio(){
        this.categoriasServicio=[{
            nombreServicio:'Plomería',
            img:'../../assets/images/plomero.png',
            id:'plomero123',
            color:'#2574A9'
        },
        {
            nombreServicio:'Herrería',
            img:'../../assets/images/herrero.png',
            id:'herrero123',
            color:'#BDC3C7'
        },
        {
            nombreServicio:'Carpintería',
            img:'../../assets/images/carpintero.png',
            id:'carpinteria',
            color:'#FABE58'
        },
        {
            nombreServicio:'Jardinería',
            img:'../../assets/images/jardinero.png',
            id:'albañiñ123',
            color:'#26A65B'
        },
        {
            nombreServicio:'Electricista',
            img:'../../assets/images/electricista.png',
            id:'electrisista123',
            color:'#E67E22'
        },
        {
            nombreServicio:'Costura',
            img:'../../assets/images/costurero.png',
            id:'niñera123',
            color:'#c369ff'
        },
            {
                nombreServicio: 'Albañilería',
                img: '../../assets/images/albañil.png',
                id: 'niñera123',
                color: '#ff541c'
            },
            {
                nombreServicio:'Limpieza',
                img:'../../assets/images/limpieza.png',
                id:'niñera123',
                color:'#538cff'
            }


        ]

        return this.categoriasServicio;
    }

}
