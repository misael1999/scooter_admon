import { Component, OnInit, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
declare var $;

// just an interface for type safety.
export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-wizard-profile',
  templateUrl: './wizard-profile.component.html',
  styleUrls: ['./wizard-profile.component.scss']
})
export class WizardProfileComponent implements OnInit, AfterContentInit {

  addressForm: FormGroup;

  steps = [
    {
      id: 1,
      text: 'General',
      icon: 'ti-camera',
      component: 'div-general',
      form: null
    },
    {
      id: 2,
      text: 'Tarifas',
      icon: 'ti-money',
      component: 'div-categories',
      form: this.addressForm
    },
    {
      id: 3,
      text: 'Dirección',
      icon: 'ti-map',
      component: 'div-map',
      form: null
    },
    {
      id: 4,
      text: 'Configuración',
      icon: 'ti-settings',
      component: 'div-config',
      form: null

    },
  ];

  iconsWizardLength = 0;
  currentIndex = 0;
  listOfElementLi: NodeListOf<HTMLElement>;
  previousLi: HTMLElement;
  previousDiv: HTMLElement;
  hasNext: boolean;
  hasPrevious: boolean;

  // ======= STEP ONE ========
  binaryString;
  imageTemp;
  @ViewChild('myInput')
  myInputVariable: ElementRef;

  // STEP 2
  // google maps zoom level
  zoom = 15;

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  ngAfterContentInit() {
    this.initWizard();
    this.listenEventCheckBox();
  }

  initWizard() {
    setTimeout(() => {
      // Get all elements
      this.listOfElementLi = document.querySelectorAll('.li-wizard');
      // Number of elements li
      this.iconsWizardLength = this.listOfElementLi.length;
      // Update progress bar
      const progress = document.getElementById('progress-wizard');
      progress.style.width = `${(100 / this.iconsWizardLength) - 5}%`;

      // Get Ul for get the first element
      const ulWizard = document.querySelector('.ul-wizard');
      // Add class active and checked the first element li
      const firstStep = ulWizard.querySelector('li');


      // Get index
      this.currentIndex = Number(firstStep.getAttribute('data-index'));
      // Show component of first li
      const component = String(firstStep.getAttribute('data-component'));

      // Hide previous div
      this.previousDiv = document.getElementById(component);
      this.previousDiv.classList.toggle('content-tab');

      // Assign previous li
      this.previousLi = firstStep;
      this.previousLi.classList.add('active');
      this.previousLi.querySelector('.icon-wizard').classList.add('checked');
      this.showAndHideButtons();
    }, 200);

  }

  onNext(element: HTMLElement = null) {

    if (element) {
      /*  const index = element.getAttribute('data-index');
       if (!(this.validPreviousSteps(index))) {
         return;
       } */
      this.selectStep(element);
    } else {
      /*       if (!(this.validateStepByIndex(this.currentIndex))) {
              return;
            } */
      this.currentIndex += 1;
      this.showAndHideButtons();
      this.selectStep(this.listOfElementLi[this.currentIndex - 1]);

    }

  }

  // Verify that the previous steps are valid
  // If the return value is False it is because some previous step is not valid
  // Recursive function
  validPreviousSteps(index): boolean {
    if ((index - 1) === 0) {
      return true;
    }

    const valid = this.validateStepByIndex(index - 1);
    if (!valid) {
      return false;
    }

    return this.validPreviousSteps(index - 1);

  }

  onPrevious() {
    this.currentIndex -= 1;
    this.showAndHideButtons();
    this.selectStep(this.listOfElementLi[this.currentIndex - 1]);

  }

  showAndHideButtons() {
    this.hasNext = true;
    this.hasPrevious = false;
    if (this.currentIndex === this.listOfElementLi.length) {
      this.hasNext = false;
    }
    if (this.currentIndex > 1) {
      this.hasPrevious = true;
    }
  }

  selectStep(element: HTMLElement) {
    // Index of selected step
    const index = Number(element.getAttribute('data-index'));
    if (this.previousLi) {
      this.previousLi.classList.remove('active');
    }
    if (this.previousDiv) {
      // For show or hidden content
      this.previousDiv.classList.toggle('content-tab');
    }

    // Show component
    const component = String(element.getAttribute('data-component'));
    this.previousDiv = document.getElementById(component);
    this.previousDiv.classList.toggle('content-tab');

    // The selected step we add the class
    element.classList.add('active');
    element.querySelector('.icon-wizard').classList.add('checked');

    // We put the index of the selected step as the current index
    this.currentIndex = index;
    this.updateProgress(this.currentIndex);
    this.previousLi = element;
    this.showAndHideButtons();
  }

  updateProgress(index) {
    const progress = document.getElementById('progress-wizard');
    let moveDistance = 100 / this.iconsWizardLength;
    moveDistance = (moveDistance * (index) - 10);
    progress.style.width = `${moveDistance}%`;
  }

  // ======= FUNCTIONS FOR STEP ONE ========

  onFileSelected(evt: any) {
    const file = evt.target.files[0];

    if (!file) {
      this.imageTemp = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {

      this.myInputVariable.nativeElement.value = '';
      this.showMessageError('El archivo seleccionado no es una imagen');
      this.binaryString = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }

  handleReaderLoaded(e) {
    this.binaryString = 'data:image/png;base64,' + btoa(e.target.result);
  }

  // ======= END FUNCTIONS FOR STEP ONE ========

  validateStepByIndex(index): boolean {
    switch (index) {
      case 1:
        return this.validateStepImage();
      case 2:
        return this.validateStepAddress();
      case 3:
        return this.validateStepCategories();
      case 4:
        return this.validateStepConfig();
      default:
        return false;
    }
  }

  validateStepImage(): boolean {
    if (!this.binaryString) {
      this.showMessageInfo('Por favor elige una imagen');
      return false;
    }
    return true;
  }

  validateStepAddress(): boolean {
    return false;
  }

  validateStepCategories(): boolean {
    return false;
  }

  validateStepConfig(): boolean {
    return false;
  }

  listenEventCheckBox() {
    $('[data-toggle="wizard-checkbox"]').click(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).find('[type="checkbox"]').removeAttr('checked');
      } else {
        $(this).addClass('active');
        $(this).find('[type="checkbox"]').attr('checked', 'true');
      }
    });
  }

  showMessageError(message) {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor: '#e74a3b',

    });
  }

  showMessageInfo(message) {
    Swal.fire({
      type: 'info',
      title: 'Oops...',
      text: message,
      confirmButtonColor: '#4e73df',

    });
  }


}
