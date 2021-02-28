import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

import { FormControl, FormGroup, Validators } from '@angular/forms'; // Add the 'Validators' to the import
import { forbiddenNameValidator } from '../forbidden-name.validator';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero = { name: '' } as Hero;

  heroForm: FormGroup = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      forbiddenNameValidator(/bob/i),
    ]),
  });

  // Exposes the 'id' FormControl as a property
  get id() {
    return this.heroForm.get('id');
  }

  // Exposes 'name'
  get name() {
    return this.heroForm.get('name');
  }

  get hasNameErrors() {
    const { name } = this;
    if (this.submitted || name.touched || name.dirty) {
      return name.invalid;
    }
    return false;
  }

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id') || 0;
    if (id > 0) {
      // do not subscribe if no number provided
      this.heroService
        .getHeroNo404(id)
        .subscribe((hero) => this.heroForm.patchValue(hero));
    }
  }

  goBack(): void {
    this.location.back();
  }

  private submitted = false;

  save(): void {
    this.submitted = true;
    if (this.heroForm.invalid) {
      return; // Do not submit an invalid form
    }

    const onComplete = () => this.goBack();
    // Converts the group to a raw object the 'shape' of a hero
    const hero = this.heroForm.value as Hero;

    if (hero.id > 0) {
      this.heroService.updateHero(hero).subscribe(onComplete);
    } else {
      // add new hero id fix.
      hero.id = null;
      this.heroService.addHero(hero).subscribe(onComplete);
    }
  }
}
