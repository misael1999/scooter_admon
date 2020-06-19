import { MatPaginatorIntl } from '@angular/material/paginator';


export function getPaginatorTranslate() {
    const paginatorIntl = new MatPaginatorIntl();

    paginatorIntl.itemsPerPageLabel = 'Elementos por pagina:';
    paginatorIntl.nextPageLabel = 'Siguiente pagina';
    paginatorIntl.previousPageLabel = 'Anterior pagina';

    return paginatorIntl;
}

