import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule here
import { TranslationService } from '../../services/translation.service';  // Adjusted import
import { ModalComponent } from '../modal/modal.component';


@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ModalComponent],  // Include HttpClientModule in imports
  providers: [TranslationService],  // Add TranslationService as a provider
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css'],
})
export class TranslationComponent {
  translations: any[] = [];
  translationsPrefix: any[] = [];
  columns: any[] = [];
  paginations: any[] = [];
  newTranslation = { key: '', values: {} };
  search: string = '';

  selected_prefix: string = 'default';
  newPrefix: string = '';  
  newLang: string = '';
  newKey: string = '';
  selectedTranslation: any = null; 




  constructor(private translationService: TranslationService) {}

  isOpen = false;
  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  modalState: { [key: string]: boolean } = {};  // Store modal states

  ngOnInit(): void {
    this.loadTranslations();
    this.loadTranslationPrefix();
  }

  loadTranslations(): void {
    this.translationService.getTranslations(this.selected_prefix, this.search).subscribe((response : any) => {
      this.translations = response.data.translations.data;
      this.columns = [...Object.keys(this.translations[0]).filter(key => key !== 'id' && key !== 'key')];
      this.paginations = response.data.translations;
    });
  }

  loadTranslationPrefix(): void {
    this.translationService.getTransalationPrefix().subscribe((response : any) => {
      this.translationsPrefix = response.data.translations_prefix;
    });
  }

  onSearch(): void {
    this.loadTranslations();
  }
  

  selectPrefix(prefix: string): void {
    if(this.selected_prefix === prefix) return;
    this.selected_prefix = prefix;
    this.loadTranslations();
  }

  deleteTranslation(id: number): void {
    this.translationService.deleteTranslation(id).subscribe(() => {
      this.loadTranslations();
    });
  }

  openModal(modalName: string, translation: any = null): void {
    if (modalName === 'addKey') {
      this.newKey = this.selected_prefix == 'default' ? '' : this.selected_prefix + '.'; 
    }
    if (modalName === 'viewTranslation') {
      // console.log(translation);
      // this.selectedTranslation = { ...translation }; 
      this.selectedTranslation = translation;

    }
    this.modalState[modalName] = true; 
  }

  closeModal(modalName: string): void {
    if (modalName === 'viewTranslation') {
      this.selectedTranslation = {}; 
    }
    this.modalState[modalName] = false;
  }


  addPrefix(): void {
    if (!this.newPrefix.trim()) return;
  
    this.translationService.addPrefix({ prefix: this.newPrefix }).subscribe(
      () => {
        this.loadTranslationPrefix(); 
        this.newPrefix = ''; 
        this.modalState['addPrefix'] = false; 
      },
      (error) => {
        console.error('Error adding prefix:', error);
      }
    );
  }

  addLang(): void {
    if (!this.newLang.trim()) return;
  
    this.translationService.addLang({ language_code: this.newLang }).subscribe(
      () => {
        this.loadTranslations(); 
        this.newLang = ''; 
        this.modalState['addLang'] = false; 
      },
      (error) => {
        console.error('Error adding language:', error);
      }
    );
  }

  addKey(): void {
    if (!this.newKey.trim()) return;
  
    this.translationService.addKey({ key: this.newKey }).subscribe(
      () => {
        this.loadTranslations(); 
        this.newKey = ''; 
        this.modalState['addKey'] = false; 
      },
      (error) => {
        console.error('Error adding translation key:', error);
      }
    );
  }

  updateTranslation(event: Event): void {
    event.preventDefault();
  
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
  
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    this.translationService.updateTranslation(data).subscribe(
      () => {
        this.loadTranslations();
        this.selectedTranslation = {};
        this.modalState['viewTranslation'] = false;
      },
      (error) => {
        console.error('Error updating translation:', error);
      }
    );
  }

  // public function update(Request $request)
  //   {
  //       $data = $request->all();
  //       $id = $data['id'];

  //       $translation = Translation::findOrFail($id);
  //       $translation->update($data);
  //       return $this->success('Translation updated successfully');
  //   }
  
}
