import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { LatestunitsComponent } from "../latestunits/latestunits.component";
import { AreaguidehighlightsComponent } from "../areaguidehighlights/areaguidehighlights.component";
import { FeatureddevelopersComponent } from "../featureddevelopers/featureddevelopers.component";
import { TestimonialComponent } from "../testimonial/testimonial.component";
import { BlogsComponent } from "../blogs/blogs.component";
import { YoutubeshortsComponent } from "../youtubeshorts/youtubeshorts.component";
import { HomepageaboutusfaqComponent } from "../homepageaboutusfaq/homepageaboutusfaq.component";
import { OffplanlatestprojctsComponent } from "../offplanlatestprojcts/offplanlatestprojcts.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HomeComponent, AreaguidehighlightsComponent, FeatureddevelopersComponent, TestimonialComponent, BlogsComponent,
    HomepageaboutusfaqComponent, OffplanlatestprojctsComponent, YoutubeshortsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
