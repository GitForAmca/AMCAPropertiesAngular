import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { PropertydetailsComponent } from './components/propertydetails/propertydetails.component';
import { PropertieslistComponent } from './components/propertieslist/propertieslist.component';
import { BlogsdetailsComponent } from './components/blogsdetails/blogsdetails.component';
import { DevelopersComponent } from './components/developers/developers.component';
import { ArealistComponent } from './components/arealist/arealist.component';
import { BlogslistComponent } from './components/blogslist/blogslist.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ApartmentsforsaleComponent } from './components/apartmentsforbuy/apartmentsforsale.component';
import { PenthouseforsaleComponent } from './components/penthouseforbuy/penthouseforsale.component';
import { TownhouseforsaleComponent } from './components/townhouseforbuy/townhouseforsale.component';
import { VillasforsaleComponent } from './components/villasforbuy/villasforsale.component';
import { VillasforrentComponent } from './components/villasforrent/villasforrent.component';
import { TownhouseforrentComponent } from './components/townhouseforrent/townhouseforrent.component';
import { PenthouseforrentComponent } from './components/penthouseforrent/penthouseforrent.component';
import { ApartmentsforrentComponent } from './components/apartmentsforrent/apartmentsforrent.component';
import { OffplanapartmentsComponent } from './components/offplanapartments/offplanapartments.component';
import { OffplanvillasComponent } from './components/offplanvillas/offplanvillas.component';
import { BuypropertyservicesComponent } from './components/buypropertyservices/buypropertyservices.component';
import { RentpropertyservicesComponent } from './components/rentpropertyservices/rentpropertyservices.component';
import { PropertymanagementservicesComponent } from './components/propertymanagementservices/propertymanagementservices.component';
import { CommunityComponent } from './components/community/community.component';
import { AreadetailsComponent } from './components/areadetails/areadetails.component';
import { DeveloperdetailsComponent } from './components/developerdetails/developerdetails.component';
import { ProjectlistComponent } from './components/projectlist/projectlist.component';
import { ProjectdetailsComponent } from './components/projectdetails/projectdetails.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';
import { TermsconditionComponent } from './components/termscondition/termscondition.component';
import { CareersComponent } from './components/careers/careers.component';
import { CareerCvFormComponent } from './components/career-cv-form/career-cv-form.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'AMCA Properties – Real Estate in UAE | Buy & Rent Homes',
      description:
        'Discover premium properties in UAE with AMCA Properties. Buy, sell, or rent apartments, villas, and more with trusted real estate experts.',
    },
  },
  {
    path: 'property-list',
    component: PropertieslistComponent,
  },
  {
    path: 'property/:pageURL/:unitId',
    component: PropertydetailsComponent,
  },
  {
    path: 'project-list',
    component: ProjectlistComponent,
  },
  {
    path: 'project/:pageURL/:projectId',
    component: ProjectdetailsComponent,
  },
  {
    path: 'blogs/:blogTitle/:blogId',
    component: BlogsdetailsComponent,
  },
  {
    path: 'developers',
    component: DevelopersComponent,
    data: {
      title: 'Top Real Estate Developers in UAE | AMCA Properties',
      description:
        'Discover the best real estate developers in the UAE. AMCA Properties partners with trusted names to bring you premium off-plan projects and luxury homes.',
    },
  },
  {
    path: 'areas',
    component: ArealistComponent,
    data: {
      title: 'Properties for Sale & Rent in UAE | AMCA Properties',
      description:
        'Explore apartments, villas, and commercial properties across the UAE. AMCA Properties helps you find the right home or investment in prime locations.',
    },
  },
  {
    path: 'blogs',
    component: BlogslistComponent,
  },
  {
    path: 'about-us',
    component: AboutusComponent,
    data: {
      title: 'About AMCA Properties | UAE Real Estate Specialists',
      description:
        'Discover AMCA Properties, your trusted partner in UAE real estate. We offer expert services in buying, selling, and renting properties.',
    },
  },
  {
    path: 'contact-us',
    component: ContactusComponent,
    data: {
      title: 'Contact AMCA Properties | UAE Real Estate Experts',
      description:
        'Reach out to AMCA Properties for buying, selling, or renting properties in the UAE. Our team is here to assist with all your real estate needs.',
    },
  },
  {
    path: 'looking-for-apartments-for-sale-in-dubai',
    component: ApartmentsforsaleComponent,
    data: {
      title: 'Apartments for Sale in UAE | AMCA Properties',
      description:
        'Browse luxury and affordable apartments for sale in UAE. Find your dream home with AMCA Properties’ expert guidance and trusted listings.',
    },
  },
  {
    path: 'penthouse-for-sale-in-dubai',
    component: PenthouseforsaleComponent,
    data: {
      title: 'Penthouses for Sale in UAE | AMCA Properties',
      description:
        'Discover luxury penthouses for sale in UAE with breathtaking views. AMCA Properties brings you elite living spaces in iconic locations.',
    },
  },
  {
    path: 'townhouse-for-sale-in-dubai',
    component: TownhouseforsaleComponent,
    data: {
      title: 'Townhouses for Sale in UAE | AMCA Properties',
      description:
        'Find modern and spacious townhouses for sale in UAE. AMCA Properties offers exclusive listings in prime locations at the best prices.',
    },
  },
  {
    path: 'villas-for-sale-in-dubai',
    component: VillasforsaleComponent,
    data: {
      title: 'Villas for Sale in UAE | AMCA Properties',
      description:
        'Explore stunning villas for sale across UAE. From luxury estates to family homes, AMCA Properties connects you with the perfect villa.',
    },
  },
  {
    path: 'apartments-for-rent-in-dubai',
    component: ApartmentsforrentComponent,
    data: {
      title: 'Apartments for Rent in UAE | AMCA Properties',
      description:
        'Search top apartments for rent in UAE. From affordable rentals to luxury residences, AMCA Properties helps you find the perfect home.',
    },
  },
  {
    path: 'penthouses-for-rent-in-dubai',
    component: PenthouseforrentComponent,
    data: {
      title: 'Luxury Penthouses for Rent in UAE | AMCA Properties',
      description:
        'Rent luxury penthouses in UAE with AMCA Properties.  Enjoy spacious living, premium amenities, and breathtaking city and sea views in Dubai & beyond.',
    },
  },
  {
    path: 'townhouses-in-dubai-for-rent',
    component: TownhouseforrentComponent,
    data: {
      title: 'Townhouses for Rent in UAE | AMCA Properties',
      description:
        'Find townhouses for rent in UAE’s best locations. AMCA Properties ensures quality homes that match your lifestyle and budget.',
    },
  },
  {
    path: 'villas-for-rent-in-dubai',
    component: VillasforrentComponent,
    data: {
      title: 'Villas for Rent in UAE | AMCA Properties',
      description:
        'Rent beautiful villas in UAE with ease. AMCA Properties offers furnished and unfurnished villas in prime residential communities.',
    },
  },
  {
    path: 'off-plan-apartments',
    component: OffplanapartmentsComponent,
    data: {
      title: 'Off-Plan Apartments in UAE | AMCA Properties',
      description:
        'Invest in off-plan apartments across the UAE with strong ROI potential. AMCA Properties connects buyers with top developers and prime projects.',
    },
  },
  {
    path: 'off-plan-villas',
    component: OffplanvillasComponent,
    data: {
      title: 'Off-Plan Villas in UAE | AMCA Properties',
      description:
        'Secure your future with off-plan villas in the UAE. AMCA Properties offers exclusive projects from leading real estate developers at competitive prices.',
    },
  },
  {
    path: 'buying-a-property-in-dubai',
    component: BuypropertyservicesComponent,
    data: {
      title: 'Buy Property in UAE | AMCA Properties',
      description:
        'Buy property in UAE with expert guidance from AMCA Properties. Find apartments, villas, and townhouses in prime locations.',
    },
  },
  {
    path: 'renting-a-property-in-dubai',
    component: RentpropertyservicesComponent,
    data: {
      title: '',
      description: '',
    },
  },
  {
    path: 'property-management',
    component: PropertymanagementservicesComponent,
    data: {
      title: 'Property Management Services in UAE | AMCA Properties',
      description:
        'AMCA Properties offers professional property management in the UAE. From tenant services to maintenance and rental management, we keep your property hassle-free.',
    },
  },
  {
    path: 'communities',
    component: CommunityComponent,
    data: {
      title: '',
      description: '',
    },
  },
  {
    path: 'developer/:URL',
    component: DeveloperdetailsComponent,
  },
  {
    path: 'area/:URL',
    component: AreadetailsComponent,
  },
  {
    path: 'faq',
    component: FaqsComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacypolicyComponent,
  },
  {
    path: 'terms-condition',
    component: TermsconditionComponent,
  },
  {
    path: 'careerCvForm',
    component: CareerCvFormComponent,
  },
  {
    path: 'careers',
    component: CareersComponent,
  },
];
