import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
    ahora = new Date()
    maniana = new Date()
    semana = new Date()
    proximos = new Date()

    ngOnInit() {
        this.maniana.setDate(this.ahora.getDate() + 1)
        this.semana.setDate(this.ahora.getDate() + 7)
        this.proximos.setDate(this.ahora.getDate() + 730)
    }

}
