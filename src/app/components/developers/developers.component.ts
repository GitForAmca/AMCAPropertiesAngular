import { Component } from '@angular/core';
import { DevelopersService } from '../../service/developers.service';
import { Router, RouterLink } from '@angular/router';
import { IActiveDeveloper } from '../../model/interface/IActiveDeveloper';
import { ActiveDeveloper } from '../../model/class/ActiveDeveloper';
import { CommonModule } from '@angular/common';
import { SkeletonloaderComponent } from '../../reusableComponent/skeletonloader/skeletonloader.component';

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [CommonModule, RouterLink, SkeletonloaderComponent],
  templateUrl: './developers.component.html',
  styleUrl: './developers.component.scss',
})
export class DevelopersComponent {
  ngOnInit(): void {
    this.GetAtiveDevelopersList();
  }
  skeletonArray = Array(6);
  constructor(
    private developersList: DevelopersService,
    private router: Router
  ) {}

  activeDeveloper: IActiveDeveloper[] = [];
  activeDeveloperobj: ActiveDeveloper = new ActiveDeveloper();
  isLoading: boolean = true;

  GetAtiveDevelopersList() {
    this.developersList
      .GetActiveDevelopers(this.activeDeveloperobj)
      .subscribe((result: any) => {
        this.activeDeveloper = result;
        this.isLoading = false;
      });
  }

  FilterPropertiesByDeveloper(developerId: number) {
    this.router.navigate(['/property-list'], { queryParams: { developerId } });
  }

  faqs = [
    {
      question: 'Are foreigners allowed to buy property in Dubai?',
      answer: `<p class="text-muted mb-4">
                       Yes. Dubai permits foreign nationals to own freehold property in designated zones. Since 2002, this policy has attracted global investors seeking a tax-efficient, fast-growing real estate market. Popular freehold communities include Dubai Marina, Downtown Dubai, and Palm Jumeirah. 
                    </p>`,
      open: false,
    },
    {
      question: 'What are freehold areas in Dubai?',
      answer: `<p class="text-muted mb-4">
                       Freehold areas are specific districts where non-UAE nationals have full ownership rights over the property and the land. Buyers can sell, lease, or pass on the asset without major restrictions. This appeals to those wanting complete control and long-term security for their investment. 
                    </p>`,
      open: false,
    },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
